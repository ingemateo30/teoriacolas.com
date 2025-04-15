// lib/simulation/utils/validation.ts

import { z } from 'zod';

import { QueueModel } from '@/types/simulation';

// Tipos y interfaces


export interface ModelParams {
  lambda: number;    // Tasa de llegadas
  mu: number;        // Tasa de servicio
  servers?: number;  // Número de servidores (MMS)
  capacity?: number; // Capacidad máxima (MM1K)
  variance?: number; // Varianza del servicio (MG1)
}

export interface ParamLimits {
  lambda: { min: number; max: number };
  mu: { min: number; max: number };
  servers?: { min: number; max: number };
  capacity?: { min: number; max: number };
  variance?: { min: number; max: number };
}

export interface ValidationResult {
  isValid: boolean;
  errors: string[];
}

// Parámetros por defecto para cada modelo
export function getModelDefaultParams(model: QueueModel): ModelParams {
  const defaults: Record<QueueModel, ModelParams> = {
    MM1: { lambda: 4, mu: 5 },
    MMC: { lambda: 8, mu: 3, servers: 3 },
    MG1: { lambda: 2, mu: 4, variance: 0.5 },
    MMCK: { lambda: 3, mu: 5, capacity: 10 },
    GG1: { lambda: 2, mu: 3 },
    GM1: { lambda: 2, mu: 4, variance: 0.5 },
    GGCK: { lambda: 3, mu: 5, capacity: 10 },
    Network: { lambda: 2, mu: 3 },
    
  };
  return defaults[model];
}

// Límites de parámetros para UI/controles
export function getModelParamLimits(model: QueueModel): ParamLimits {
  const baseLimits = {
    lambda: { min: 0.1, max: 20 },
    mu: { min: 0.1, max: 20 }
  };

  const limits: Record<QueueModel, ParamLimits> = {
    MM1: baseLimits,
    MMC: { ...baseLimits, servers: { min: 1, max: 10 } },
    MG1: { ...baseLimits, variance: { min: 0, max: 5 } },
    MMCK: { ...baseLimits, capacity: { min: 1, max: 50 } },
    GG1: baseLimits,
    GM1: { ...baseLimits, variance: { min: 0, max: 5 } }, // Added
    GGCK: { ...baseLimits, capacity: { min: 1, max: 50 } }, // Added
    Network: baseLimits // Added
  };
  return limits[model];
}

// Esquema de validación base
const baseSchema = z.object({
  lambda: z.number().min(0.1, "λ debe ser mayor a 0"),
  mu: z.number().min(0.1, "μ debe ser mayor a 0")
});

// Validación específica por modelo
export function validateModelParams(model: QueueModel, params: ModelParams): ValidationResult {
  const errors: string[] = [];
  const schema = getModelSchema(model);
  const result = schema.safeParse(params);

  if (!result.success) {
    return {
      isValid: false,
      errors: result.error.errors.map(e => e.message)
    };
  }

  // Validaciones adicionales específicas
  switch (model) {
    case 'MM1':
      if (params.lambda >= params.mu) {
        errors.push("λ debe ser menor que μ en M/M/1");
      }
      break;

    case 'MMC':
      const utilization = params.lambda / ((params.servers || 1) * params.mu);
      if (utilization >= 1) {
        errors.push("El sistema es inestable (ρ ≥ 1)");
      }
      break;

    case 'MMCK':
      if (!params.capacity || params.capacity < 1) {
        errors.push("Capacidad inválida");
      }
      break;

    case 'MG1':
      if (!params.variance || params.variance < 0) {
        errors.push("Varianza inválida");
      }
      break;
  }

  return {
    isValid: errors.length === 0,
    errors
  };
}

// Helpers internos
function getModelSchema(model: QueueModel) {
  switch (model) {
    case 'MMC':
      return baseSchema.extend({
        servers: z.number().int().min(1, "Mínimo 1 servidor")
      });

    case 'MMCK':
      return baseSchema.extend({
        capacity: z.number().int().min(1, "Capacidad mínima: 1")
      });

    case 'MG1':
      return baseSchema.extend({
        variance: z.number().min(0, "Varianza no puede ser negativa")
      });

    default:
      return baseSchema;
  }
}

// Mensajes de error traducibles
export const ERROR_MESSAGES = {
  en: {
    invalid_params: "Invalid parameters",
    unstable_system: "Unstable system",
    // ...
  },
  es: {
    invalid_params: "Parámetros inválidos",
    unstable_system: "Sistema inestable",
    // ...
  }
};