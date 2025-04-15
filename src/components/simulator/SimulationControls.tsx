import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { SimulationState } from '@/types/simulation';

interface SimulationControlsProps {
  onStart: () => void;
  onPause: () => void;
  onReset: () => void;
  simulationState: SimulationState;
}


export const SimulationControls:React.FC<SimulationControlsProps> = ( {
  onStart,
  onPause,
  onReset,
  simulationState,
} ) => {
  

  const [isRunning, setIsRunning] = useState(false);
  const [speed, setSpeed] = useState(1);
  
  const handleToggleSimulation = () => {
    setIsRunning(!isRunning);
    // Lógica para iniciar/pausar la simulación
  };
  
  const handleReset = () => {
    setIsRunning(false);
    // Lógica para reiniciar la simulación
  };
  
  const handleSpeedChange = (newSpeed: number) => {
    setSpeed(newSpeed);
    // Lógica para cambiar la velocidad de simulación
  };
  
  return (
    <div className="simulation-controls">
      <h2>Controles de Simulación</h2>
      
      <div className="controls-wrapper">
        <Button 
          onClick={handleToggleSimulation}
          variant={isRunning ? "secondary" : "primary"}
        >
          {isRunning ? "Pausar" : "Iniciar"}
        </Button>
        
        <Button 
          onClick={handleReset}
          variant="outline"
        >
          Reiniciar
        </Button>
        
        <div className="speed-controls">
          <span>Velocidad:</span>
          <div className="speed-buttons">
            <button 
              className={`speed-button ${speed === 0.5 ? 'active' : ''}`}
              onClick={() => handleSpeedChange(0.5)}
            >
              0.5x
            </button>
            <button 
              className={`speed-button ${speed === 1 ? 'active' : ''}`}
              onClick={() => handleSpeedChange(1)}
            >
              1x
            </button>
            <button 
              className={`speed-button ${speed === 2 ? 'active' : ''}`}
              onClick={() => handleSpeedChange(2)}
            >
              2x
            </button>
            <button 
              className={`speed-button ${speed === 4 ? 'active' : ''}`}
              onClick={() => handleSpeedChange(4)}
            >
              4x
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
