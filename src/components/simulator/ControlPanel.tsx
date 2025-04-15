"use client";

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
import {
  SimulationParams,
  QueueModel,
  DistributionType,
} from '@/types/simulation';

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

  const currentModelType: QueueModel = modelId as QueueModel || 'MM1';

  const defaultParams: SimulationParams = getModelDefaultParams(currentModelType) as unknown as SimulationParams;

  const [params, setParams] = useState<SimulationParams>(defaultParams);
  const [errors, setErrors] = useState<string[]>([]);

  const paramLimits = getModelParamLimits(currentModelType);

  useEffect(() => {
    const newDefaultParams = getModelDefaultParams(currentModelType);
    const simulationParams: SimulationParams = {
      ...newDefaultParams,
      arrivalRate: 0, // default value
      arrivalDistribution: 'normal', // default value
      serviceRate: 0, // default value
      serviceDistribution: 'normal', // default value
    };
    setParams(simulationParams);
    onParamsChange?.(simulationParams);
  }, [currentModelType, onParamsChange]);

  const handleParamChange = (paramName: keyof SimulationParams, value: any) => {
    const newParams = {
      ...params,
      [paramName]: value,
      lambda: params.arrivalRate, // assuming lambda is the same as arrivalRate
      mu: params.serviceRate, // assuming mu is the same as serviceRate
    };

    const validationResult = validateModelParams(currentModelType, newParams);

    setErrors(validationResult.errors);
    setParams(newParams);

    if (validationResult.isValid) {
      onParamsChange?.(newParams);
      updateParams(newParams);
    }
  };

  const handleSpeedChange = (value: number) => {
    changeSimulationSpeed(value);
  };

  const handleReset = () => {
    resetSimulation();
    clearMetrics();
  };

  const availableDistributions: { value: DistributionType; label: string }[] = [
    { value: 'exponential', label: 'Exponencial' },
    { value: 'constant', label: 'Constante' },
    { value: 'uniform', label: 'Uniforme' },
    { value: 'normal', label: 'Normal' }
  ];

  const shouldShowServers = () => {
    return ['MMC', 'MMCK', 'GG1'].includes(currentModelType);
  };

  const shouldShowCapacity = () => {
    return ['MM1K', 'MMCK', 'GG1K'].includes(currentModelType);
  };

  return (
    <div className={`bg-white rounded-lg shadow-md p-4 ${className}`}>
      <h3 className="text-lg font-semibold mb-4">Panel de Control</h3>

      <div className="space-y-6">
        {/* Sección de Llegadas */}
        <div className="border-b pb-4">
          <h4 className="font-medium mb-2">Llegadas</h4>

          <div className="space-y-3">
            <div>
              <label className="block text-sm mb-1">Distribución</label>
              <Select
                options={availableDistributions}
                value={params.arrivalDistribution}
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) => handleParamChange('arrivalDistribution', e.target.value as DistributionType)}
                disabled={simulationState === 'running'}
              />
            </div>

            <div>
              <label className="block text-sm mb-1">
                Tasa de llegada (λ)
                <span className="text-gray-500 ml-1 text-xs">
                  {params.arrivalDistribution === 'exponential' && 'entidades/unidad de tiempo'}
                </span>
              </label>
              <div className="flex items-center">
                <Slider
                  min={paramLimits.lambda?.min ?? 0.1}
                  max={paramLimits.lambda?.max ?? 10}
                  step={0.1}
                  value={params.arrivalRate}
                  onChange={(value: number) => handleParamChange('arrivalRate', value)}
                  disabled={simulationState === 'running'}
                />
                <span className="ml-2 w-12 text-center">
  {typeof params?.arrivalRate === 'number' ? params.arrivalRate.toFixed(1) : '0.0'}
</span>

              </div>
              {errors.includes('arrivalRate') && (
                <p className="text-red-500 text-xs mt-1">Error en tasa de llegada</p>
              )}
            </div>
          </div>
        </div>

        {/* Sección de Servicio */}
        <div className="border-b pb-4">
          <h4 className="font-medium mb-2">Servicio</h4>

          <div className="space-y-3">
            <div>
              <label className="block text-sm mb-1">Distribución</label>
              <Select
                options={availableDistributions}
                value={params.serviceDistribution}
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) => handleParamChange('serviceDistribution', e.target.value as unknown as DistributionType)}
                disabled={simulationState === 'running'}
              />
            </div>

            <div>
              <label className="block text-sm mb-1">
                Tasa de servicio (μ)
                <span className="text-gray-500 ml-1 text-xs">
                  {params.serviceDistribution === 'exponential' && 'entidades/unidad de tiempo'}
                </span>
              </label>
              <div className="flex items-center">
                <Slider
                  min={paramLimits.mu?.min || 0.1}
                  max={paramLimits.mu?.max || 10}
                  step={0.1}
                  value={params.serviceRate}
                  onChange={(value) => handleParamChange('serviceRate', value)}
                  disabled={simulationState === 'running'}
                />
                <span className="ml-2 w-12 text-center">
  {typeof params?.serviceRate === 'number' ? params.serviceRate.toFixed(1) : '0.0'}
</span>

              </div>
              {errors.includes('serviceRate') && (
                <p className="text-red-500 text-xs mt-1">Error en tasa de servicio</p>
              )}
            </div>
          </div>
        </div>

        {/* Configuración del Sistema */}
        <div className="border-b pb-4">
          <h4 className="font-medium mb-2">Configuración del Sistema</h4>

          <div className="space-y-3">
            {shouldShowServers() && (
              <div>
                <label className="block text-sm mb-1">Número de servidores (c)</label>
                <div className="flex items-center">
                  <Slider
                    min={1}
                    max={paramLimits.servers?.max || 10}
                    step={1}
                    value={params.serverCount || 1}
                    onChange={(value) => handleParamChange('serverCount', value)}
                    disabled={simulationState === 'running'}
                  />
                  <span className="ml-2 w-12 text-center">{params.serverCount || 1}</span>
                </div>
              </div>
            )}

            {shouldShowCapacity() && (
              <div>
                <label className="block text-sm mb-1">Capacidad del sistema (K)</label>
                <div className="flex items-center">
                  <Slider
                    min={1}
                    max={paramLimits.capacity?.max || 50}
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

      {/* Mostrar errores generales */}
      {errors.length > 0 && (
        <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
          <h4 className="text-red-600 font-medium mb-2">Errores de configuración:</h4>
          <ul className="list-disc list-inside text-red-500 text-sm">
            {errors.map((error, index) => (
              <li key={index}>{error}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};