
import React, { useState, useEffect } from 'react';
import { useSimulation } from '@/hooks/useSimulation';
import { useMetrics } from '@/hooks/useMetrics';
import { Button } from '@/components/ui/Button';
import { Slider } from '@/components/ui/Slider';
import { Select } from '@/components/ui/Select';
import { SimulationControls } from './SimulationControls';
import { 
  getModelDefaultParams, 
  getModelParamLimits, 
  validateModelParams 
} from '@/lib/simulation/utils/validation';
import { SimulationParams, ModelType } from '@/types/simulation';

interface ControlPanelProps {
  modelId?: string;
  onParamsChange?: (params: SimulationParams) => void;
  className?: string;
}

export const ControlPanel: React.FC<ControlPanelProps> = ({
  modelId,
  onParamsChange,
  className = ''
}) => {
  const { 
    startSimulation, 
    pauseSimulation, 
    resetSimulation, 
    changeSimulationSpeed,
    updateParams,
    simulationState,
    simulationSpeed
  } = useSimulation();
  
  const { metrics, clearMetrics } = useMetrics();
  
  // Obtener el tipo de modelo actual basado en modelId o usar MM1 como predeterminado
  const currentModelType: ModelType = modelId as ModelType || 'MM1';
  
  // Obtener parámetros predeterminados para el modelo actual
  const defaultParams = getModelDefaultParams(currentModelType);
  
  // Estado para los parámetros de la simulación
  const [params, setParams] = useState<SimulationParams>(defaultParams);
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  // Límites de parámetros para el modelo actual
  const paramLimits = getModelParamLimits(currentModelType);
  
  // Actualizar parámetros cuando cambia el modelo
  useEffect(() => {
    const newDefaultParams = getModelDefaultParams(currentModelType);
    setParams(newDefaultParams);
    if (onParamsChange) {
      onParamsChange(newDefaultParams);
    }
  }, [currentModelType, onParamsChange]);
  
  // Manejar cambios en los parámetros
  const handleParamChange = (paramName: string, value: number) => {
    const newParams = { ...params, [paramName]: value };
    
    // Validar los nuevos parámetros
    const validationResult = validateModelParams(currentModelType, newParams);
    
    setErrors(validationResult.errors || {});
    setParams(newParams);
    
    if (validationResult.isValid && onParamsChange) {
      onParamsChange(newParams);
      updateParams(newParams);
    }
  };
  
  // Manejar cambios en la velocidad de simulación
  const handleSpeedChange = (value: number) => {
    changeSimulationSpeed(value);
  };
  
  // Reiniciar simulación y métricas
  const handleReset = () => {
    resetSimulation();
    clearMetrics();
  };
  
  // Lista de distribuciones disponibles para seleccionar
  const availableDistributions = [
    { value: 'exponential', label: 'Exponencial' },
    { value: 'constant', label: 'Constante' },
    { value: 'uniform', label: 'Uniforme' },
    { value: 'normal', label: 'Normal' }
  ];
  
  return (
    <div className={`bg-white rounded-lg shadow-md p-4 ${className}`}>
      <h3 className="text-lg font-semibold mb-4">Panel de Control</h3>
      
      <div className="space-y-6">
        {/* Parámetros de Llegada */}
        <div className="border-b pb-4">
          <h4 className="font-medium mb-2">Llegadas</h4>
          
          <div className="space-y-3">
            <div>
              <label className="block text-sm mb-1">Distribución</label>
              <Select 
                options={availableDistributions}
                value={params.arrivalDistribution || 'exponential'}
                onChange={(value) => handleParamChange('arrivalDistribution', value)}
                disabled={simulationState === 'running'}
              />
            </div>
            
            <div>
              <label className="block text-sm mb-1">
                Tasa de llegada (λ)
                <span className="text-gray-500 ml-1 text-xs">
                  {params.arrivalDistribution === 'exponential' ? 'entidades/unidad de tiempo' : ''}
                </span>
              </label>
              <div className="flex items-center">
                <Slider 
                  min={paramLimits.arrivalRate.min}
                  max={paramLimits.arrivalRate.max}
                  step={0.1}
                  value={params.arrivalRate || 1}
                  onChange={(value) => handleParamChange('arrivalRate', value)}
                  disabled={simulationState === 'running'}
                />
                <span className="ml-2 w-12 text-center">{params.arrivalRate?.toFixed(1)}</span>
              </div>
              {errors.arrivalRate && (
                <p className="text-red-500 text-xs mt-1">{errors.arrivalRate}</p>
              )}
            </div>
          </div>
        </div>
        
        {/* Parámetros de Servicio */}
        <div className="border-b pb-4">
          <h4 className="font-medium mb-2">Servicio</h4>
          
          <div className="space-y-3">
            <div>
              <label className="block text-sm mb-1">Distribución</label>
              <Select 
                options={availableDistributions}
                value={params.serviceDistribution || 'exponential'}
                onChange={(value) => handleParamChange('serviceDistribution', value)}
                disabled={simulationState === 'running'}
              />
            </div>
            
            <div>
              <label className="block text-sm mb-1">
                Tasa de servicio (μ)
                <span className="text-gray-500 ml-1 text-xs">
                  {params.serviceDistribution === 'exponential' ? 'entidades/unidad de tiempo' : ''}
                </span>
              </label>
              <div className="flex items-center">
                <Slider 
                  min={paramLimits.serviceRate.min}
                  max={paramLimits.serviceRate.max}
                  step={0.1}
                  value={params.serviceRate || 2}
                  onChange={(value) => handleParamChange('serviceRate', value)}
                  disabled={simulationState === 'running'}
                />
                <span className="ml-2 w-12 text-center">{params.serviceRate?.toFixed(1)}</span>
              </div>
              {errors.serviceRate && (
                <p className="text-red-500 text-xs mt-1">{errors.serviceRate}</p>
              )}
            </div>
          </div>
        </div>
        
        {/* Configuración del Sistema */}
        <div className="border-b pb-4">
          <h4 className="font-medium mb-2">Configuración del Sistema</h4>
          
          <div className="space-y-3">
            <div>
              <label className="block text-sm mb-1">Número de servidores (c)</label>
              <div className="flex items-center">
                <Slider 
                  min={1}
                  max={paramLimits.serverCount?.max || 10}
                  step={1}
                  value={params.serverCount || 1}
                  onChange={(value) => handleParamChange('serverCount', value)}
                  disabled={simulationState === 'running' || !['MMC', 'MMCK', 'GGC'].includes(currentModelType)}
                />
                <span className="ml-2 w-12 text-center">{params.serverCount}</span>
              </div>
            </div>
            
            {['MMCK', 'MGCK', 'GMCK', 'GGCK'].includes(currentModelType) && (
              <div>
                <label className="block text-sm mb-1">Capacidad del sistema (K)</label>
                <div className="flex items-center">
                  <Slider 
                    min={1}
                    max={paramLimits.systemCapacity?.max || 50}
                    step={1}
                    value={params.systemCapacity || 10}
                    onChange={(value) => handleParamChange('systemCapacity', value)}
                    disabled={simulationState === 'running'}
                  />
                  <span className="ml-2 w-12 text-center">
                    {params.systemCapacity === -1 ? '∞' : params.systemCapacity}
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
        
        {/* Velocidad de Simulación */}
        <div className="border-b pb-4">
          <h4 className="font-medium mb-2">Velocidad de Simulación</h4>
          <div className="flex items-center">
            <span className="text-xs mr-2">Lento</span>
            <Slider 
              min={1}
              max={10}
              step={1}
              value={simulationSpeed}
              onChange={handleSpeedChange}
            />
            <span className="text-xs ml-2">Rápido</span>
            <span className="ml-4 text-sm">{simulationSpeed}x</span>
          </div>
        </div>
        
        {/* Controles de Simulación */}
        <SimulationControls 
          onStart={startSimulation}
          onPause={pauseSimulation}
          onReset={handleReset}
          simulationState={simulationState}
        />
      </div>
    </div>
  );
};