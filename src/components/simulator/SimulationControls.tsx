"use client";

import React from 'react';
import { SimulationParameters } from '@/types/simulation';
import { Button } from '@/components/ui/Button';
import { Slider } from '@/components/ui/Slider';
import { Select } from '@/components/ui/Select';

interface SimulationControlsProps {
  parameters: SimulationParameters;
  onParametersChange: (params: Partial<SimulationParameters>) => void;
  onStart: () => void;
  onPause: () => void;
  onReset: () => void;
  simulationState: 'idle' | 'running' | 'paused' | 'completed';
  currentTime: number;
}

const SimulationControls: React.FC<SimulationControlsProps> = ({
  parameters,
  onParametersChange,
  onStart,
  onPause,
  onReset,
  simulationState,
  currentTime
}) => {
  const formatTime = (time: number): string => {
    return time.toFixed(2);
  };

  const queueModels = [
    { value: 'MM1', label: 'M/M/1' },
    { value: 'MMC', label: 'M/M/c' },
    { value: 'MMCK', label: 'M/M/c/K' },
    { value: 'MG1', label: 'M/G/1' },
    { value: 'GM1', label: 'G/M/1' },
    { value: 'GG1', label: 'G/G/1' }
  ];

  const distributions = [
    { value: 'exponential', label: 'Exponencial' },
    { value: 'poisson', label: 'Poisson' },
    { value: 'uniform', label: 'Uniforme' },
    { value: 'normal', label: 'Normal' }
  ];

  return (
    <div className="bg-gray-900 rounded-lg shadow-md border border-gray-800 p-4 mb-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-medium text-blue-400">Controles de Simulación</h3>
        <div className="text-sm text-gray-400">
          Tiempo: <span className="font-medium text-blue-300">{formatTime(currentTime)}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        {/* Model Selection */}
        <div className="flex flex-col">
          <label className="text-sm font-medium mb-1 text-gray-300">Modelo de Cola</label>
          <Select
            value={parameters.model}
            options={queueModels}
            onChange={(value: unknown) => onParametersChange({ model: value as SimulationParameters['model'] })}
            disabled={simulationState !== 'idle'}
            className="bg-gray-800 border-gray-700 text-gray-200"
          />
        </div>

        {/* Arrival Rate */}
        <div className="flex flex-col">
          <label className="text-sm font-medium mb-1 text-gray-300">
            Tasa de Llegada (λ): <span className="text-blue-400">{parameters.arrivalRate.toFixed(2)}</span>
          </label>
          <Slider
            min={0.1}
            max={50}
            step={0.1}
            value={parameters.arrivalRate}
            onChange={(value) => onParametersChange({ arrivalRate: value })}
            disabled={simulationState !== 'idle'}
            className="accent-blue-500"
          />
        </div>

        {/* Service Rate */}
        <div className="flex flex-col">
          <label className="text-sm font-medium mb-1 text-gray-300">
            Tasa de Servicio (μ): <span className="text-emerald-400">{parameters.serviceRate.toFixed(2)}</span>
          </label>
          <Slider
            min={0.1}
            max={50}
            step={0.1}
            value={parameters.serviceRate}
            onChange={(value) => onParametersChange({ serviceRate: value })}
            disabled={simulationState !== 'idle'}
            className="accent-emerald-500"
          />
        </div>

        {/* Servers */}
        <div className="flex flex-col">
          <label className="text-sm font-medium mb-1 text-gray-300">
            Número de Servidores: <span className="text-purple-400">{parameters.servers}</span>
          </label>
          <Slider
            min={1}
            max={10}
            step={1}
            value={parameters.servers}
            onChange={(value) => onParametersChange({ servers: value })}
            disabled={simulationState !== 'idle'}
            className="accent-purple-500"
          />
        </div>

        {/* Capacity (if applicable) */}
        {(parameters.model === 'MMCK') && (
          <div className="flex flex-col">
            <label className="text-sm font-medium mb-1 text-gray-300">
              Capacidad del Sistema (K): <span className="text-amber-400">{parameters.capacity === -1 ? '∞' : parameters.capacity}</span>
            </label>
            <Slider
              min={-1}
              max={50}
              step={1}
              value={parameters.capacity}
              onChange={(value) => onParametersChange({ capacity: value })}
              disabled={simulationState !== 'idle'}
              className="accent-amber-500"
            />
          </div>
        )}

        {/* Arrival Distribution */}
        <div className="flex flex-col">
          <label className="text-sm font-medium mb-1 text-gray-300">Distribución de Llegadas</label>
          <Select
            value={parameters.arrivalDistribution}
            options={distributions}
            onChange={(value: unknown) => onParametersChange({ arrivalDistribution: value as SimulationParameters['arrivalDistribution'] })}
            disabled={simulationState !== 'idle'}
            className="bg-gray-800 border-gray-700 text-gray-200"
          />
        </div>

        {/* Service Distribution */}
        <div className="flex flex-col">
          <label className="text-sm font-medium mb-1 text-gray-300">Distribución de Servicios</label>
          <Select
            value={parameters.serviceDistribution}
            options={distributions}
            onChange={(value: unknown) => onParametersChange({ 
              serviceDistribution: value as SimulationParameters['serviceDistribution']
            })}
            disabled={simulationState !== 'idle'}
            className="bg-gray-800 border-gray-700 text-gray-200"
          />
        </div>

        {/* Simulation Speed */}
        <div className="flex flex-col">
          <label className="text-sm font-medium mb-1 text-gray-300">
            Velocidad de Simulación: <span className="text-cyan-400">x{parameters.speed.toFixed(1)}</span>
          </label>
          <Slider
            min={0.1}
            max={10}
            step={0.1}
            value={parameters.speed}
            onChange={(value) => onParametersChange({ speed: value })}
            className="accent-cyan-500"
          />
        </div>

        {/* Animation Speed */}
        <div className="flex flex-col">
          <label className="text-sm font-medium mb-1 text-gray-300">
            Velocidad de Animación: <span className="text-indigo-400">x{parameters.animationSpeed.toFixed(1)}</span>
          </label>
          <Slider
            min={0.1}
            max={5}
            step={0.1}
            value={parameters.animationSpeed}
            onChange={(value) => onParametersChange({ animationSpeed: value })}
            className="accent-indigo-500"
          />
        </div>
      </div>

      {/* Control Buttons */}
      <div className="flex justify-center gap-4 mt-6">
        {simulationState === 'idle' || simulationState === 'paused' ? (
          <Button onClick={onStart} className="bg-emerald-600 hover:bg-emerald-700 text-white shadow-md transition-all duration-200">
            {simulationState === 'paused' ? 'Continuar' : 'Iniciar'}
          </Button>
        ) : (
          <Button onClick={onPause} className="bg-amber-600 hover:bg-amber-700 text-white shadow-md transition-all duration-200">
            Pausar
          </Button>
        )}
        <Button onClick={onReset} className="bg-red-600 hover:bg-red-700 text-white shadow-md transition-all duration-200">
          Reiniciar
        </Button>
      </div>
    </div>
  );
};

export default SimulationControls;