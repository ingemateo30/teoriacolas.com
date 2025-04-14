
import { mm1 } from './models/mm1';
import { mmc } from './models/mmc';
import { mmck } from './models/mmck';
import { mg1 } from './models/mg1';
import { gm1 } from './models/gm1';
import { gg1 } from './models/gg1';
import { networks } from './models/networks';

export const simulateModel = (modelType: string, params: any) => {
  // Validar parámetros básicos
  validateCommonParameters(params);
  
  // Ejecutar el modelo correspondiente
  switch (modelType) {
    case 'mm1':
      return mm1(params);
    case 'mmc':
      if (!params.servers || params.servers < 1) {
        throw new Error('El número de servidores debe ser al menos 1');
      }
      return mmc(params);
    case 'mmck':
      if (!params.servers || params.servers < 1) {
        throw new Error('El número de servidores debe ser al menos 1');
      }
      if (!params.capacity || params.capacity < params.servers) {
        throw new Error('La capacidad debe ser al menos igual al número de servidores');
      }
      return mmck(params);
    case 'mg1':
      if (!params.serviceDistribution) {
        throw new Error('Se requiere especificar la distribución del tiempo de servicio');
      }
      return mg1(params);
    case 'gm1':
      if (!params.arrivalDistribution) {
        throw new Error('Se requiere especificar la distribución del tiempo entre llegadas');
      }
      return gm1(params);
    case 'gg1':
      if (!params.arrivalDistribution || !params.serviceDistribution) {
        throw new Error('Se requieren las distribuciones de llegadas y servicios');
      }
      return gg1(params);
    case 'networks':
      if (!params.nodes || !Array.isArray(params.nodes) || params.nodes.length === 0) {
        throw new Error('Se requiere especificar al menos un nodo en la red');
      }
      return networks(params);
    default:
      throw new Error(`Modelo "${modelType}" no soportado`);
  }
};

const validateCommonParameters = (params: any) => {
  if (!params.arrivalRate || params.arrivalRate <= 0) {
    throw new Error('La tasa de llegadas debe ser mayor que 0');
  }
  
  if (!params.serviceRate || params.serviceRate <= 0) {
    throw new Error('La tasa de servicio debe ser mayor que 0');
  }
};

export const runSimulation = (modelType: string, params: any, duration: number, seed?: number) => {
  // Esta función se utiliza para las simulaciones por eventos discretos
  // en lugar de cálculos analíticos
  const events = [];
  const metrics = {
    averageQueueLength: 0,
    averageSystemTime: 0,
    utilizationRate: 0,
    throughput: 0
  };
  
  // Implementación de la simulación por eventos discretos...
  
  return {
    events,
    metrics
  };
};