import { useEffect, useState } from 'react';

interface EntityProps {
  entity: {
    id: number;
    status: 'waiting' | 'service' | 'completed';
    position: number;
    arrivalTime: number;
    serverIndex?: number;
  };
  isInService?: boolean;
}

export const EntityAnimation = ({ entity, isInService = false }: EntityProps) => {
  const [animationState, setAnimationState] = useState('idle');
  
  useEffect(() => {
    // Iniciar animación cuando cambia el estado de la entidad
    if (entity.status === 'service' && !isInService) {
      setAnimationState('moving');
      setTimeout(() => setAnimationState('idle'), 500);
    } else if (entity.status === 'completed') {
      setAnimationState('exiting');
      setTimeout(() => setAnimationState('done'), 500);
    }
  }, [entity.status, isInService]);
  
  if (animationState === 'done') return null;
  
  const entityClasses = `entity ${animationState} ${isInService ? 'in-service' : ''}`;
  
  return (
    <div 
      className={entityClasses}
      style={{ 
        '--entity-position': entity.position,
        '--server-index': entity.serverIndex || 0
      } as React.CSSProperties}
    >
      <div className="entity-icon">
        {entity.id}
      </div>
      {!isInService && (
        <div className="waiting-time">
          {Math.max(0, Date.now() / 1000 - entity.arrivalTime).toFixed(1)}s
        </div>
      )}
    </div>
  );
};