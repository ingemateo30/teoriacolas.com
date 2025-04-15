import { useState, useEffect, useCallback } from 'react';
import { useSimulationStore } from '@/store/simulationStore';
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

/*************  ✨ Windsurf Command ⭐  *************/
/**
 * Custom hook for managing and running a simulation.
 * 
 * This hook provides functions to control a simulation, including starting,
 * pausing, resetting, and changing simulation speed. It also manages the
 * simulation state, including entities, event queue, and timing.
 * 
 * The simulation uses various distribution types to generate arrival and
 * service times, processes events such as arrivals and departures, and
 * updates the state accordingly.
 * 
 * Returned values include the current simulation state, list of entities,
 * and control functions.
 */

/*******  f413e3ef-c546-4cb8-94ef-84131dea8f1f  *******/
export function useSimulation() {
  const simulationStore = useSimulationStore();
  const [simulationInterval, setSimulationInterval] = useState<NodeJS.Timeout | null>(null);
  const { setState } = simulationStore;
  
  
  
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
    } = simulationStore;
    
    switch (event.type) {
      case 'arrival': {
        // Crear nueva entidad
        const newEntity: Entity = {
          id: `entity-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`,
          arrivalTime: currentTime,
          status: 'arriving',
          processingTime: 0,
          waitingTime: 0,
          serverId: null,
          position: 0 // <--- Add this line
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
          const serviceTime = generateServiceTime(params.serviceRate);
          eventQueue.push({
            type: 'departure',
            time: currentTime + serviceTime,
            entityId: newEntity.id,
            serverId: serverId
          });
          
          if (setState) {
            setState({ 
              entities: [...entities, newEntity],
              serversBusy: serversBusy + 1,
              simulationState: 'inProgress' // or whatever state you want to set
            });
          }
        } else if (queueLength < queueCapacity) {
          // Poner en cola si hay espacio
          newEntity.status = 'queued';
  setState?.({ 
    entities: [...entities, newEntity],
    queueLength: queueLength + 1
          });
        } else {
          // Rechazar si no hay espacio en la cola
          newEntity.status = 'rejected';
          setState?.({ 
            entities: [...entities, newEntity],
            queueLength: queueLength + 1
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
            const serviceTime = generateServiceTime(params.serviceRate);
            eventQueue.push({
              type: 'departure',
              time: currentTime + serviceTime,
              entityId: queuedEntity.id,
              serverId: departingEntity.serverId ?? undefined
            })
            
            setState?.({ 
              entities: updatedEntities,
              queueLength: queueLength - 1
            });
          } else {
            // No hay entidades en la cola, solo liberar el servidor
            setState?.({ 
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
    setState?.({ eventQueue: sortedEvents });
    
  }, [getNextArrivalTime]);
  
  // Ejecutar un paso de simulación
  const runStep = useCallback(() => {
    const { 
      currentTime, 
      eventQueue, 
      entities, 
      simulationState
    } = simulationStore;
    
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
    setState?.({ 
      currentTime: newTime,
      eventQueue: newEventQueue,
      totalSteps: simulationStore.totalSteps + 1
    });
    
    // Procesar el evento
    processEvent(nextEvent);
    
    // Limpiar entidades que ya no están en el sistema
    const currentEntities = entities.filter(e => 
      e.status !== 'departed' && e.status !== 'rejected'
    );
    
    setState?.({ entities: currentEntities });
    
  }, [processEvent]);
  
  // Iniciar la simulación
  const startSimulation = useCallback(() => {
    if (simulationStore.simulationState === 'running') {
      return;
    }
    
    // Si no hay eventos, programar la primera llegada
    if (simulationStore.eventQueue.length === 0) {
      const params = simulationStore.params;
      const firstArrival = {
        type: 'arrival' as const,
        time: getNextArrivalTime(0, params),
        entityId: null
      };
      
      setState?.({ 
        eventQueue: [firstArrival],
        currentTime: 0,
        totalSteps: 0,
        entities: [],
        serversBusy: 0,
        queueLength: 0
      });
    }
    
    setState?.({ simulationState: 'running' });
    
    // Determinar el intervalo basado en la velocidad
    const speed = simulationStore.simulationSpeed;
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
    setState?.({ simulationState: 'paused' });
  }, [simulationInterval]);
  
  // Reiniciar la simulación
  const resetSimulation = useCallback(() => {
    if (simulationInterval) {
      clearInterval(simulationInterval);
      setSimulationInterval(null);
    }
    
    setState?.({
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
    setState?.({ simulationSpeed: speed });
    
    // Actualizar intervalo si la simulación está corriendo
    if (simulationStore.simulationState === 'running' && simulationInterval) {
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
    setState?.({ params: newParams });
    
    // Actualizar contadores basados en los parámetros
    setState?.({ 
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
  const currentEntities = simulationStore.entities.filter(
    e => e.status !== 'departed' && e.status !== 'rejected'
  );
  
  return {
    simulationState: simulationStore.simulationState,
    currentTime: simulationStore.currentTime,
    entities: simulationStore.entities,
    currentEntities,
    totalSteps: simulationStore.totalSteps,
    serverCount: simulationStore.serverCount,
    queueCapacity: simulationStore.queueCapacity,
    serversBusy: simulationStore.serversBusy,
    queueLength: simulationStore.queueLength,
    simulationSpeed: simulationStore.simulationSpeed,
    params: simulationStore.params,
    startSimulation,
    pauseSimulation,
    resetSimulation,
    changeSimulationSpeed,
    updateParams,
    runStep
  };
}