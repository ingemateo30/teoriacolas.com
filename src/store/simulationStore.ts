
import { create } from 'zustand';
import { 
  SimulationState, 
  Entity, 
  Event, 
  SimulationParams,
  ModelType 
} from '@/types/simulation';

interface SimulationStoreState {
  // Estado de la simulación
  simulationState: SimulationState;
  currentTime: number;
  totalSteps: number;
  simulationSpeed: number;
  
  // Configuración del modelo
  modelType: ModelType;
  params: SimulationParams;
  
  // Entidades y eventos
  entities: Entity[];
  eventQueue: Event[];
  
  // Estado del sistema
  serverCount: number;
  serversBusy: number;
  queueLength: number;
  queueCapacity: number;
}

// Estado inicial de la simulación
const initialState: SimulationStoreState = {
  simulationState: 'idle',
  currentTime: 0,
  totalSteps: 0,
  simulationSpeed: 5,
  
  modelType: 'MM1',
  params: {
    arrivalRate: 0,
    serviceRate: 0,
    serverCount: 1,
    systemCapacity: -1, // -1 indica capacidad infinita
    arrivalDistribution: 'exponential',
    serviceDistribution: 'exponential'
  },
  
  entities: [],
  eventQueue: [],
  
  serverCount: 1,
  serversBusy: 0,
  queueLength: 0,
  queueCapacity: Infinity
};

export const useSimulationStore = create<SimulationStoreState>(() => ({
  ...initialState
}));



// Acciones para el store

// Actualizar el estado de la simulación
export const updateSimulationState = (state: SimulationState) => {
  useSimulationStore.setState({ simulationState: state });
};

// Actualizar parámetros del modelo
export const updateModelParams = (params: Partial<SimulationParams>) => {
  const currentParams = useSimulationStore.getState().params;
  useSimulationStore.setState({ 
    params: { ...currentParams, ...params }
  });
  
  // Actualizar contadores dependientes de los parámetros
  let serverCount = params.serverCount ?? currentParams.serverCount ?? 0;
  let systemCapacity = params.systemCapacity ?? currentParams.systemCapacity ?? 0;

  
  
  // Capacidad de la cola = capacidad del sistema - número de servidores
  // Si la capacidad del sistema es -1 (infinita), la cola también es infinita
  const queueCapacity = systemCapacity === -1 ? 
    Infinity : 
    systemCapacity- serverCount;
  
  useSimulationStore.setState({
    serverCount,
    queueCapacity
  });
};

// Cambiar el tipo de modelo
export const changeModelType = (modelType: ModelType) => {
  useSimulationStore.setState({ modelType });
  
  // Restablecer parámetros según el tipo de modelo
  const newParams: SimulationParams = {
    ...initialState.params
  };
  
  switch (modelType) {
    case 'MM1':
      newParams.serverCount = 1;
      newParams.systemCapacity = -1;
      break;
      
    case 'MMC':
      newParams.serverCount = 2;
      newParams.systemCapacity = -1;
      break;
      
    case 'MMCK':
      newParams.serverCount = 2;
      newParams.systemCapacity = 10;
      break;
      
    case 'MG1':
      newParams.serverCount = 1;
      newParams.systemCapacity = -1;
      newParams.serviceDistribution = 'normal';
      break;
      
    case 'GM1':
      newParams.serverCount = 1;
      newParams.systemCapacity = -1;
      newParams.arrivalDistribution = 'normal';
      break;
      
    case 'GG1':
      newParams.serverCount = 1;
      newParams.systemCapacity = -1;
      newParams.arrivalDistribution = 'normal';
      newParams.serviceDistribution = 'normal';
      break;
      
    default:
      break;
  }
  
  updateModelParams(newParams);
};

// Restablecer la simulación
export const resetSimulation = () => {
  useSimulationStore.setState({
    simulationState: 'idle',
    currentTime: 0,
    totalSteps: 0,
    entities: [],
    eventQueue: [],
    serversBusy: 0,
    queueLength: 0
  });
};

// Añadir una entidad al sistema
export const addEntity = (entity: Entity) => {
  const entities = useSimulationStore.getState().entities;
  useSimulationStore.setState({ entities: [...entities, entity] });
};

// Actualizar una entidad existente
export const updateEntity = (entityId: string, updates: Partial<Entity>) => {
  const entities = useSimulationStore.getState().entities;
  const updatedEntities = entities.map(entity => 
    entity.id === entityId ? { ...entity, ...updates } : entity
  );
  useSimulationStore.setState({ entities: updatedEntities });
};

// Añadir un evento a la cola
export const addEvent = (event: Event) => {
  const eventQueue = useSimulationStore.getState().eventQueue;
  const newEventQueue = [...eventQueue, event].sort((a, b) => a.time - b.time);
  useSimulationStore.setState({ eventQueue: newEventQueue });
};

// Actualizar la velocidad de simulación
export const updateSimulationSpeed = (speed: number) => {
  useSimulationStore.setState({ simulationSpeed: speed });
};

// Exportar otras funciones de utilidad si son necesarias