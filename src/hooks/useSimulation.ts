import { useState, useEffect, useCallback } from 'react';
import { useSimulationStore } from '@/store/simulationStore';
import { runSimulationStep } from '@/lib/simulation/core';
import { 
  SimulationState, 
  Entity, 
  SimulationParams, 
  Event,
  ModelType
} from '@/types/simulation';
import { 
  generateExponentialTime, 
  generateServiceTime 
} from '@/lib/simulation/generators/random';

export function useSimulation() {
  const simulationStore = useSimulationStore();
  const [simulationInterval, setSimulationInterval] = useState<NodeJS.Timeout | null>(null);
  
  // Función para obtener el tiempo para la próxima llegada basada en la distribución
  const getNextArrivalTime = useCallback((currentTime: number, params: SimulationParams) => {
    const { arrivalDistribution, arrivalRate } = params;
    
    switch (arrivalDistribution) {
      case 'exponential':
        return currentTime + generateExponentialTime(arrivalRate);
      case 'constant':
        return currentTime + (1 / arrivalRate);
      case 'uniform':
        // Tiempo aleatorio uniforme alrededor de la media (1/arrivalRate)
        const mean = 1 / arrivalRate;
        return currentTime + (Math.random() * mean * 2);
      case 'normal':
        // Aproximación de distribución normal
        const stdDev = 0.3 / arrivalRate;
        const u1 = Math.random();
        const u2 = Math.random();
        const z = Math.sqrt(-2 * Math.log(u1)) * Math.cos(2 * Math.PI * u2);
        return currentTime + (1 / arrivalRate) + z * stdDev;
      default:
        return currentTime + generateExponentialTime(arrivalRate);
    }
  }, []);
  
  // Procesar eventos en la simulación
  const processEvent = useCallback((event: Event) => {
    const { 
      currentTime, 
      entities, 
      eventQueue, 
      params, 
      serverCount, 
      serversBusy, 
      queueLength, 
      queueCapacity 
    } = simulationStore.getState();
    
    switch (event.type) {
      case 'arrival': {
        // Crear nueva entidad
        const newEntity: Entity = {
          id: `entity-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`,
          arrivalTime: currentTime,
          status: 'arriving',
          processingTime: 0,
          waitingTime: 0,
          serverId: null
        };
        
        // Programar la próxima llegada
        eventQueue.push({
          type: 'arrival',
          time: getNextArrivalTime(currentTime, params),
          entityId: null
        });
        
        // Verificar si hay servidores disponibles
        if (serversBusy < serverCount) {
          // Asignar al primer servidor disponible
          let serverId = 0;
          while (serverId < serverCount) {
            if (!entities.some(e => e.status === 'inService' && e.serverId === serverId)) {
              break;
            }
            serverId++;
          }
          
          // Establecer entidad en servicio
          newEntity.status = 'inService';
          newEntity.serverId = serverId;
          
          // Programar la salida de esta entidad
          const serviceTime = generateServiceTime(params);
          eventQueue.push({
            type: 'departure',
            time: currentTime + serviceTime,
            entityId: newEntity.id,
            serverId: serverId
          });
          
          simulationStore.setState({ 
            entities: [...entities, newEntity],
            serversBusy: serversBusy + 1
          });
        } else if (queueLength < queueCapacity) {
          // Poner en cola si hay espacio
          newEntity.status = 'queued';
          simulationStore.setState({ 
            entities: [...entities, newEntity],
            queueLength: queueLength + 1
          });
        } else {
          // Rechazar si no hay espacio en la cola
          newEntity.status = 'rejected';
          simulationStore.setState({ 
            entities: [...entities, newEntity]
          });
          // Las entidades rechazadas se eliminarán en el siguiente paso
        }
        break;
      }
      
      case 'departure': {
        // Encontrar la entidad que está dejando el servicio
        const departingEntityIndex = entities.findIndex(e => e.id === event.entityId);
        
        if (departingEntityIndex !== -1) {
          const departingEntity = { ...entities[departingEntityIndex] };
          departingEntity.status = 'departed';
          departingEntity.processingTime = currentTime - departingEntity.arrivalTime;
          
          // Liberar el servidor
          const serverId = departingEntity.serverId;
          
          // Actualizar la lista de entidades
          const updatedEntities = [...entities];
          updatedEntities[departingEntityIndex] = departingEntity;
          
          // Verificar si hay entidades en la cola para asignar al servidor libre
          const queuedEntityIndex = updatedEntities.findIndex(e => e.status === 'queued');
          
          if (queuedEntityIndex !== -1) {
            // Mover la primera entidad en cola al servicio
            const queuedEntity = { ...updatedEntities[queuedEntityIndex] };
            queuedEntity.status = 'inService';
            queuedEntity.serverId = serverId;
            queuedEntity.waitingTime = currentTime - queuedEntity.arrivalTime;
            
            updatedEntities[queuedEntityIndex] = queuedEntity;
            
            // Programar la salida de esta entidad
            const serviceTime = generateServiceTime(params);
            eventQueue.push({
              type: 'departure',
              time: currentTime + serviceTime,
              entityId: queuedEntity.id,
              serverId: serverId
            });
            
            simulationStore.setState({ 
              entities: updatedEntities,
              queueLength: queueLength - 1
            });
          } else {
            // No hay entidades en la cola, solo liberar el servidor
            simulationStore.setState({ 
              entities: updatedEntities,
              serversBusy: serversBusy - 1
            });
          }
        }
        break;
      }
      
      default:
        break;
    }
    
    // Ordenar eventos por tiempo
    const sortedEvents = [...eventQueue].sort((a, b) => a.time - b.time);
    simulationStore.setState({ eventQueue: sortedEvents });
    
  }, [getNextArrivalTime]);
  
  // Ejecutar un paso de simulación
  const runStep = useCallback(() => {
    const { 
      currentTime, 
      eventQueue, 
      entities, 
      simulationState
    } = simulationStore.getState();
    
    if (simulationState !== 'running' || eventQueue.length === 0) {
      return;
    }
    
    // Obtener el próximo evento
    const nextEvent = eventQueue[0];
    
    // Avanzar el tiempo
    const newTime = nextEvent.time;
    
    // Eliminar eventos procesados
    const newEventQueue = eventQueue.slice(1);
    
    // Actualizar estado de simulación
    simulationStore.setState({ 
      currentTime: newTime,
      eventQueue: newEventQueue,
      totalSteps: simulationStore.getState().totalSteps + 1
    });
    
    // Procesar el evento
    processEvent(nextEvent);
    
    // Limpiar entidades que ya no están en el sistema
    const currentEntities = entities.filter(e => 
      e.status !== 'departed' && e.status !== 'rejected'
    );
    
    simulationStore.setState({ entities: currentEntities });
    
  }, [processEvent]);
  
  // Iniciar la simulación
  const startSimulation = useCallback(() => {
    if (simulationStore.getState().simulationState === 'running') {
      return;
    }
    
    // Si no hay eventos, programar la primera llegada
    if (simulationStore.getState().eventQueue.length === 0) {
      const params = simulationStore.getState().params;
      const firstArrival = {
        type: 'arrival' as const,
        time: getNextArrivalTime(0, params),
        entityId: null
      };
      
      simulationStore.setState({ 
        eventQueue: [firstArrival],
        currentTime: 0,
        totalSteps: 0,
        entities: [],
        serversBusy: 0,
        queueLength: 0
      });
    }
    
    simulationStore.setState({ simulationState: 'running' });
    
    // Determinar el intervalo basado en la velocidad
    const speed = simulationStore.getState().simulationSpeed;
    const interval = Math.max(50, 500 / speed);
    
    const intervalId = setInterval(() => {
      runStep();
    }, interval);
    
    setSimulationInterval(intervalId);
  }, [getNextArrivalTime, runStep]);
  
  // Pausar la simulación
  const pauseSimulation = useCallback(() => {
    if (simulationInterval) {
      clearInterval(simulationInterval);
      setSimulationInterval(null);
    }
    simulationStore.setState({ simulationState: 'paused' });
  }, [simulationInterval]);
  
  // Reiniciar la simulación
  const resetSimulation = useCallback(() => {
    if (simulationInterval) {
      clearInterval(simulationInterval);
      setSimulationInterval(null);
    }
    
    simulationStore.setState({
      simulationState: 'idle',
      currentTime: 0,
      totalSteps: 0,
      entities: [],
      eventQueue: [],
      serversBusy: 0,
      queueLength: 0
    });
  }, [simulationInterval]);
  
  // Cambiar velocidad de simulación
  const changeSimulationSpeed = useCallback((speed: number) => {
    simulationStore.setState({ simulationSpeed: speed });
    
    // Actualizar intervalo si la simulación está corriendo
    if (simulationStore.getState().simulationState === 'running' && simulationInterval) {
      clearInterval(simulationInterval);
      
      const interval = Math.max(50, 500 / speed);
      const newIntervalId = setInterval(() => {
        runStep();
      }, interval);
      
      setSimulationInterval(newIntervalId);
    }
  }, [runStep, simulationInterval]);
  
  // Actualizar parámetros de simulación
  const updateParams = useCallback((newParams: SimulationParams) => {
    simulationStore.setState({ params: newParams });
    
    // Actualizar contadores basados en los parámetros
    simulationStore.setState({ 
      serverCount: newParams.serverCount || 1,
      queueCapacity: newParams.systemCapacity ? 
        (newParams.systemCapacity - (newParams.serverCount || 1)) : 
        Infinity
    });
  }, []);
  
  // Limpiar intervalo al desmontar
  useEffect(() => {
    return () => {
      if (simulationInterval) {
        clearInterval(simulationInterval);
      }
    };
  }, [simulationInterval]);
  
  // Obtener las entidades actuales en el sistema
  const currentEntities = simulationStore.getState().entities.filter(
    e => e.status !== 'departed' && e.status !== 'rejected'
  );
  
  return {
    simulationState: simulationStore.getState().simulationState,
    currentTime: simulationStore.getState().currentTime,
    entities: simulationStore.getState().entities,
    currentEntities,
    totalSteps: simulationStore.getState().totalSteps,
    serverCount: simulationStore.getState().serverCount,
    queueCapacity: simulationStore.getState().queueCapacity,
    serversBusy: simulationStore.getState().serversBusy,
    queueLength: simulationStore.getState().queueLength,
    simulationSpeed: simulationStore.getState().simulationSpeed,
    params: simulationStore.getState().params,
    startSimulation,
    pauseSimulation,
    resetSimulation,
    changeSimulationSpeed,
    updateParams,
    runStep
  };
}