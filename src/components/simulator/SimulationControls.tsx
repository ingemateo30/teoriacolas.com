import React from 'react';
import { Button } from '@/components/ui/Button';
import { SimulationState } from '@/types/simulation';

interface SimulationControlsProps {
  onStart: () => void;
  onPause: () => void;
  onReset: () => void;
  simulationState: SimulationState;
}

export const SimulationControls: React.FC<SimulationControlsProps> = ({
  onStart,
  onPause,
  onReset,
  simulationState,
}) => {
  const isRunning = simulationState === 'running';
  
  // Usar las props en lugar de funciones vacías
  const handleToggleSimulation = () => {
    if (isRunning) {
      onPause();
    } else {
      onStart();
    }
  };

  return (
    <div className="simulation-controls">
      <div className="flex space-x-4">
        <Button
          onClick={handleToggleSimulation}
          variant={isRunning ? "secondary" : "primary"}
        >
          {isRunning ? "Pausar" : "Iniciar"}
        </Button>
        
        <Button
          onClick={onReset}
          variant="outline"
        >
          Reiniciar
        </Button>
      </div>
    </div>
  );
};