import { useState, useEffect, useRef } from 'react';
import { useSimulationStore } from '@/store/simulationStore';
import { SimulationParameters, SimulationEntity, SimulationState, QueueMetrics } from '@/types/simulation';
import { generateExponential } from '@/lib/simulation/generators/exponential';
import { generatePoisson } from '@/lib/simulation/generators/poisson';
import { calculateMetrics } from '@/lib/simulation/utils/metrics';

export function useSimulation(initialParams: SimulationParameters) {
  const {
    simulationState,
    setSimulationState,
    setEntities,
    setMetrics,
    setCurrentTime,
    resetSimulation
  } = useSimulationStore();
  
  const [params, setParams] = useState<SimulationParameters>(initialParams);
  const animationRef = useRef<number | null>(null);
  const lastUpdateTimeRef = useRef<number>(0);
  const entitiesRef = useRef<SimulationEntity[]>([]);
  const eventsQueueRef = useRef<{ time: number; type: 'arrival' | 'departure'; entityId: number }[]>([]);
  const idCounterRef = useRef<number>(0);
  const metricsIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Reset simulation when parameters change
  useEffect(() => {
    handleReset();
  }, [params]);

  // Clean up on unmount
  useEffect(() => {
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      if (metricsIntervalRef.current) {
        clearInterval(metricsIntervalRef.current);
      }
    };
  }, []);

  const scheduleArrival = () => {
    const arrivalTime = params.arrivalDistribution === 'exponential'
      ? generateExponential(params.arrivalRate)
      : generatePoisson(params.arrivalRate);
    
    const newEntityId = idCounterRef.current++;
    
    eventsQueueRef.current.push({
      time: simulationState.currentTime + arrivalTime,
      type: 'arrival',
      entityId: newEntityId
    });
    
    // Keep events sorted by time
    eventsQueueRef.current.sort((a, b) => a.time - b.time);
  };

  const scheduleDeparture = (entityId: number) => {
    const serviceTime = params.serviceDistribution === 'exponential'
      ? generateExponential(params.serviceRate)
      : generatePoisson(params.serviceRate);
    
    eventsQueueRef.current.push({
      time: simulationState.currentTime + serviceTime,
      type: 'departure',
      entityId
    });
    
    // Keep events sorted by time
    eventsQueueRef.current.sort((a, b) => a.time - b.time);
  };

  const processNextEvent = () => {
    if (eventsQueueRef.current.length === 0) {
      scheduleArrival(); // Always have at least one event
      return;
    }

    const nextEvent = eventsQueueRef.current.shift();
    if (!nextEvent) return;

    // Update current time
    setCurrentTime(nextEvent.time);

    if (nextEvent.type === 'arrival') {
      // Handle arrival event
      const newEntity: SimulationEntity = {
        id: nextEvent.entityId,
        arrivalTime: nextEvent.time,
        status: 'waiting',
        position: { x: 0, y: 0 } // Initial position for animation
      };

      // Add to entities
      const updatedEntities = [...entitiesRef.current, newEntity];
      entitiesRef.current = updatedEntities;
      setEntities(updatedEntities);

      // Check if server is available (depends on model type)
      const serversInUse = updatedEntities.filter(e => e.status === 'processing').length;
      
      if (serversInUse < params.servers) {
        // Server available, start processing immediately
        const entityToProcess = updatedEntities.find(e => e.id === newEntity.id);
        if (entityToProcess) {
          entityToProcess.status = 'processing';
          entityToProcess.serviceStartTime = nextEvent.time;
          scheduleDeparture(entityToProcess.id);
        }
      }

      // Schedule next arrival
      scheduleArrival();
    } else if (nextEvent.type === 'departure') {
      // Handle departure event
      const entityIndex = entitiesRef.current.findIndex(e => e.id === nextEvent.entityId);
      
      if (entityIndex !== -1) {
        // Remove the entity that finished service
        const updatedEntities = [...entitiesRef.current];
        updatedEntities.splice(entityIndex, 1);
        entitiesRef.current = updatedEntities;
        setEntities(updatedEntities);

        // Find next entity to process if any in the queue
        const waitingEntities = updatedEntities
          .filter(e => e.status === 'waiting')
          .sort((a, b) => a.arrivalTime - b.arrivalTime);
        
        if (waitingEntities.length > 0) {
          const nextToProcess = waitingEntities[0];
          nextToProcess.status = 'processing';
          nextToProcess.serviceStartTime = nextEvent.time;
          scheduleDeparture(nextToProcess.id);
        }
      }
    }

    // Update metrics after processing events
    updateMetrics();
  };

  const updateMetrics = () => {
    const currentEntities = entitiesRef.current;
    const waiting = currentEntities.filter(e => e.status === 'waiting').length;
    const processing = currentEntities.filter(e => e.status === 'processing').length;
    
    // Calculate waiting times, etc.
    const metrics = calculateMetrics(
      currentEntities,
      simulationState.currentTime,
      params
    );
    
    setMetrics(metrics);
  };

  const handleStart = () => {
    if (simulationState.state === 'running') return;
    
    setSimulationState('running');
    
    // Schedule initial arrivals if we're starting fresh
    if (eventsQueueRef.current.length === 0) {
      scheduleArrival();
    }
    
    // Start animation loop
    lastUpdateTimeRef.current = performance.now();
    animationStep();
    
    // Set up metrics calculation interval
    metricsIntervalRef.current = setInterval(updateMetrics, 1000);
  };

  const handlePause = () => {
    if (simulationState.state !== 'running') return;
    
    setSimulationState('paused');
    
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
      animationRef.current = null;
    }
    
    if (metricsIntervalRef.current) {
      clearInterval(metricsIntervalRef.current);
      metricsIntervalRef.current = null;
    }
  };

  const handleReset = () => {
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
      animationRef.current = null;
    }
    
    if (metricsIntervalRef.current) {
      clearInterval(metricsIntervalRef.current);
      metricsIntervalRef.current = null;
    }
    
    // Reset all refs and state
    entitiesRef.current = [];
    eventsQueueRef.current = [];
    idCounterRef.current = 0;
    lastUpdateTimeRef.current = 0;
    
    resetSimulation();
  };

  const animationStep = () => {
    const now = performance.now();
    const deltaTime = now - lastUpdateTimeRef.current;
    lastUpdateTimeRef.current = now;
    
    // Process events based on simulation speed
    const eventsToProcess = Math.max(1, Math.floor(params.speed * deltaTime / 1000));
    
    for (let i = 0; i < eventsToProcess; i++) {
      if (simulationState.state === 'running') {
        processNextEvent();
      }
    }
    
    // Update entities positions for animation
    updateEntityPositions(deltaTime);
    
    // Continue animation loop
    if (simulationState.state === 'running') {
      animationRef.current = requestAnimationFrame(animationStep);
    }
  };

  const updateEntityPositions = (deltaTime: number) => {
    // Update positions for animation
    const updatedEntities = entitiesRef.current.map(entity => {
      const newEntity = { ...entity };
      
      // Update position based on status and target positions
      // This is simplified - you'd have more complex animations
      if (entity.status === 'waiting') {
        // Move to queue position
        newEntity.position = {
          x: 100,
          y: 100 + (entitiesRef.current.indexOf(entity) * 30)
        };
      } else if (entity.status === 'processing') {
        // Move to server position
        const processingEntities = entitiesRef.current.filter(e => e.status === 'processing');
        const serverIndex = processingEntities.indexOf(entity);
        newEntity.position = {
          x: 300,
          y: 100 + (serverIndex * 100)
        };
      }
      
      return newEntity;
    });
    
    entitiesRef.current = updatedEntities;
    setEntities(updatedEntities);
  };

  const updateParameters = (newParams: Partial<SimulationParameters>) => {
    setParams(prev => ({ ...prev, ...newParams }));
  };

  return {
    params,
    updateParameters,
    start: handleStart,
    pause: handlePause,
    reset: handleReset,
    state: simulationState.state,
    entities: simulationState.entities,
    metrics: simulationState.metrics,
    currentTime: simulationState.currentTime
  };
}