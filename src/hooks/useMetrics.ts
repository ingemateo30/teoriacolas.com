
import { useState, useEffect, useCallback } from 'react';
import { useSimulationStore } from '@/store/simulationStore';
import { Entity, SimulationState } from '@/types/simulation';
import { calculateUtilization, calculateQueueMetrics } from '@/lib/simulation/utils/metrics';

// Definir tipos para las métricas
interface SimulationMetrics {
  // Métricas generales del sistema
  systemUtilization: number;            // Utilización del sistema (ρ)
  averageEntitiesInSystem: number;      // Número promedio de entidades en el sistema (L)
  averageEntitiesInQueue: number;       // Número promedio de entidades en la cola (Lq)
  averageWaitingTime: number;           // Tiempo promedio de espera en cola (Wq)
  averageTurnaroundTime: number;        // Tiempo promedio total en el sistema (W)
  
  // Métricas estadísticas
  totalArrivals: number;                // Total de llegadas
  totalDepartures: number;              // Total de salidas
  totalRejections: number;              // Total de rechazos (para sistemas con capacidad limitada)
  rejectionRate: number;                // Tasa de rechazo (para sistemas con capacidad limitada)
  
  // Métricas por servidor
  serverUtilization: number[];          // Utilización por servidor
  serverBusyTime: number[];             // Tiempo ocupado por servidor
  
  // Historial temporal para gráficos
  timePoints: number[];                 // Puntos temporales para los gráficos
  queueLengthHistory: number[];         // Historial de longitud de cola
  systemLengthHistory: number[];        // Historial de entidades en el sistema
  utilizationHistory: number[];         // Historial de utilización
  waitTimeHistory: number[];            // Historial de tiempos de espera
}

// Intervalos para la recogida de datos históricos (en unidades de tiempo de simulación)
const HISTORY_INTERVAL = 1;

export function useMetrics() {
  const [metrics, setMetrics] = useState<SimulationMetrics>({
    systemUtilization: 0,
    averageEntitiesInSystem: 0,
    averageEntitiesInQueue: 0,
    averageWaitingTime: 0,
    averageTurnaroundTime: 0,
    
    totalArrivals: 0,
    totalDepartures: 0,
    totalRejections: 0,
    rejectionRate: 0,
    
    serverUtilization: [],
    serverBusyTime: [],
    
    timePoints: [],
    queueLengthHistory: [],
    systemLengthHistory: [],
    utilizationHistory: [],
    waitTimeHistory: []
  });
  
  const [lastCollectionTime, setLastCollectionTime] = useState(0);
  const [collectedEntities, setCollectedEntities] = useState<Entity[]>([]);
  
  const simulationStore = useSimulationStore();
  
  // Función para recopilar métricas actuales
  const collectMetrics = useCallback(() => {
    const { 
      currentTime, 
      entities, 
      serverCount, 
      serversBusy, 
      queueLength, 
      totalSteps,
      params
    } = simulationStore.getState();
    
    if (totalSteps === 0 || currentTime === 0) {
      return;
    }
    
    // Añadir entidades completadas a la colección
    const departedEntities = entities.filter(
      e => e.status === 'departed' && !collectedEntities.some(ce => ce.id === e.id)
    );
    const rejectedEntities = entities.filter(
      e => e.status === 'rejected' && !collectedEntities.some(ce => ce.id === e.id)
    );
    
    const newCollectedEntities = [
      ...collectedEntities,
      ...departedEntities,
      ...rejectedEntities
    ];
    
    setCollectedEntities(newCollectedEntities);
    
    // Calcular métricas
    const allProcessedEntities = newCollectedEntities.filter(e => e.status === 'departed');
    const allRejectedEntities = newCollectedEntities.filter(e => e.status === 'rejected');
    
    // Métricas básicas
    const totalArrivals = allProcessedEntities.length + allRejectedEntities.length;
    const totalDepartures = allProcessedEntities.length;
    const totalRejections = allRejectedEntities.length;
    const rejectionRate = totalArrivals > 0 ? totalRejections / totalArrivals : 0;
    
    // Tiempo promedio en el sistema y en cola
    const totalTurnaroundTime = allProcessedEntities.reduce(
      (sum, entity) => sum + entity.processingTime,
      0
    );
    const totalWaitingTime = allProcessedEntities.reduce(
      (sum, entity) => sum + (entity.waitingTime || 0),
      0
    );
    
    const averageTurnaroundTime = totalDepartures > 0 ? 
      totalTurnaroundTime / totalDepartures : 0;
    const averageWaitingTime = totalDepartures > 0 ? 
      totalWaitingTime / totalDepartures : 0;
    
    // Utilización del sistema
    const systemUtilization = calculateUtilization(
      params.arrivalRate, 
      params.serviceRate, 
      params.serverCount || 1
    );
    
    // Calcular métricas de cola usando fórmulas teóricas
    const queueMetrics = calculateQueueMetrics(
      params.arrivalRate,
      params.serviceRate,
      params.serverCount || 1,
      params.systemCapacity
    );
    
    // Calcular utilización por servidor (empírica)
    const serverUtilization = Array(serverCount).fill(0).map((_, i) => {
      const serverEntities = allProcessedEntities.filter(e => e.serverId === i);
      const totalServiceTime = serverEntities.reduce(
        (sum, entity) => sum + (entity.processingTime - (entity.waitingTime || 0)),
        0
      );
      return currentTime > 0 ? totalServiceTime / currentTime : 0;
    });
    
    // Acumular datos para gráficos históricos
    const shouldCollectHistory = currentTime - lastCollectionTime >= HISTORY_INTERVAL;
    
    let newTimePoints = [...metrics.timePoints];
    let newQueueLengthHistory = [...metrics.queueLengthHistory];
    let newSystemLengthHistory = [...metrics.systemLengthHistory];
    let newUtilizationHistory = [...metrics.utilizationHistory];
    let newWaitTimeHistory = [...metrics.waitTimeHistory];
    
    if (shouldCollectHistory) {
      // Actualizar puntos de tiempo
      newTimePoints.push(currentTime);
      
      // Longitud de cola actual
      newQueueLengthHistory.push(queueLength);
      
      // Entidades actuales en el sistema
      const currentSystemEntities = entities.filter(
        e => e.status === 'queued' || e.status === 'inService'
      ).length;
      newSystemLengthHistory.push(currentSystemEntities);
      
      // Utilización actual
      const currentUtilization = serverCount > 0 ? serversBusy / serverCount : 0;
      newUtilizationHistory.push(currentUtilization);
      
      // Tiempo de espera promedio actual
      const recentDepartures = allProcessedEntities.filter(
        e => e.arrivalTime >= lastCollectionTime && e.arrivalTime < currentTime
      );
      
      const avgWaitTime = recentDepartures.length > 0 ?
        recentDepartures.reduce((sum, e) => sum + (e.waitingTime || 0), 0) / recentDepartures.length : 
        newWaitTimeHistory.length > 0 ? newWaitTimeHistory[newWaitTimeHistory.length - 1] : 0;
      
      newWaitTimeHistory.push(avgWaitTime);
      
      // Actualizar el último tiempo de recolección
      setLastCollectionTime(currentTime);
    }
    
    // Limitar el tamaño de los historiales para evitar problemas de rendimiento
    const MAX_HISTORY_POINTS = 100;
    if (newTimePoints.length > MAX_HISTORY_POINTS) {
      const step = Math.ceil(newTimePoints.length / MAX_HISTORY_POINTS);
      newTimePoints = newTimePoints.filter((_, i) => i % step === 0);
      newQueueLengthHistory = newQueueLengthHistory.filter((_, i) => i % step === 0);
      newSystemLengthHistory = newSystemLengthHistory.filter((_, i) => i % step === 0);
      newUtilizationHistory = newUtilizationHistory.filter((_, i) => i % step === 0);
      newWaitTimeHistory = newWaitTimeHistory.filter((_, i) => i % step === 0);
    }
    
    // Actualizar métricas
    setMetrics({
      systemUtilization,
      averageEntitiesInSystem: queueMetrics.L,
      averageEntitiesInQueue: queueMetrics.Lq,
      averageWaitingTime,
      averageTurnaroundTime,
      
      totalArrivals,
      totalDepartures,
      totalRejections,
      rejectionRate,
      
      serverUtilization,
      serverBusyTime: Array(serverCount).fill(0), // Implementar si es necesario
      
      timePoints: newTimePoints,
      queueLengthHistory: newQueueLengthHistory,
      systemLengthHistory: newSystemLengthHistory,
      utilizationHistory: newUtilizationHistory,
      waitTimeHistory: newWaitTimeHistory
    });
  }, [metrics, collectedEntities, lastCollectionTime, simulationStore]);
  
  // Limpiar métricas
  const clearMetrics = useCallback(() => {
    setMetrics({
      systemUtilization: 0,
      averageEntitiesInSystem: 0,
      averageEntitiesInQueue: 0,
      averageWaitingTime: 0,
      averageTurnaroundTime: 0,
      
      totalArrivals: 0,
      totalDepartures: 0,
      totalRejections: 0,
      rejectionRate: 0,
      
      serverUtilization: [],
      serverBusyTime: [],
      
      timePoints: [],
      queueLengthHistory: [],
      systemLengthHistory: [],
      utilizationHistory: [],
      waitTimeHistory: []
    });
    setCollectedEntities([]);
    setLastCollectionTime(0);
  }, []);
  
  // Efecto para recopilar métricas periódicamente durante la simulación
  useEffect(() => {
    const simulationState = simulationStore.getState().simulationState;
    
    if (simulationState === 'running') {
      const metricsInterval = setInterval(() => {
        collectMetrics();
      }, 500); // Actualizar métricas cada 500ms
      
      return () => clearInterval(metricsInterval);
    }
    
    // Recopilar métricas finales cuando se pausa o reinicia la simulación
    if (simulationState === 'paused') {
      collectMetrics();
    }
  }, [collectMetrics, simulationStore.getState().simulationState]);
  
  return {
    metrics,
    clearMetrics
  };
}