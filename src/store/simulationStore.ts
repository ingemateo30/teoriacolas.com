import { create } from 'zustand';
import { SimulationEntity, QueueMetrics } from '@/types/simulation';

type SimulationStateType = 'idle' | 'running' | 'paused' | 'completed';

interface SimulationStoreState {
  simulationState: {
    state: SimulationStateType;
    entities: SimulationEntity[];
    metrics: QueueMetrics;
    currentTime: number;
    totalProcessed: number;
  };
  setSimulationState: (state: SimulationStateType) => void;
  setEntities: (entities: SimulationEntity[]) => void;
  setMetrics: (metrics: QueueMetrics) => void;
  setCurrentTime: (time: number) => void;
  incrementTotalProcessed: () => void;
  resetSimulation: () => void;
}

const initialMetrics: QueueMetrics = {
  avgWaitingTime: 0,
  avgSystemTime: 0,
  avgQueueLength: 0,
  serverUtilization: 0,
  throughput: 0,
};

export const useSimulationStore = create<SimulationStoreState>((set) => ({
  simulationState: {
    state: 'idle',
    entities: [],
    metrics: initialMetrics,
    currentTime: 0,
    totalProcessed: 0
  },
  setSimulationState: (state) => set((prev) => ({
    simulationState: { ...prev.simulationState, state }
  })),
  setEntities: (entities) => set((prev) => ({
    simulationState: { ...prev.simulationState, entities }
  })),
  setMetrics: (metrics) => set((prev) => ({
    simulationState: { ...prev.simulationState, metrics }
  })),
  setCurrentTime: (currentTime) => set((prev) => ({
    simulationState: { ...prev.simulationState, currentTime }
  })),
  incrementTotalProcessed: () => set((prev) => ({
    simulationState: { 
      ...prev.simulationState, 
      totalProcessed: prev.simulationState.totalProcessed + 1 
    }
  })),
  resetSimulation: () => set({
    simulationState: {
      state: 'idle',
      entities: [],
      metrics: initialMetrics,
      currentTime: 0,
      totalProcessed: 0
    }
  })
}));