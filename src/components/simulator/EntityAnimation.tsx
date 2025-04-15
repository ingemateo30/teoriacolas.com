import React, { useEffect, useState } from 'react';

interface EntityProps {
  entity: {
    id: number;
    status: 'waiting' | 'service' | 'completed';
    position: number;
    arrivalTime: number;
    serverIndex?: number;
  };
  isInService?: boolean;
  isInQueue?: boolean;
  position?: number;
  totalEntities?: number;
  containerWidth?: number;
  size?: number;
}

export const EntityAnimation = ({ 
  entity, 
  isInService = false,
  isInQueue = false,
  position,
  totalEntities,
  containerWidth,
  size = 30
}: EntityProps) => {
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
  
  // Calcular estilos y posición basados en props
  const styles: React.CSSProperties = {
    '--entity-position': position || entity.position,
    '--server-index': entity.serverIndex || 0,
    width: `${size}px`,
    height: `${size}px`,
    position: 'absolute',
    // Añadir más estilos según necesites para animaciones
  } as React.CSSProperties;
  
  if (isInQueue && containerWidth && totalEntities) {
    const spacing = Math.min(containerWidth / (totalEntities + 1), 50);
    styles.left = `${spacing * (position || 0) + spacing}px`;
    styles.bottom = '8px';
  }
  
  return (
    <div className={entityClasses} style={styles}>
      <div className="entity-icon" style={{ fontSize: `${size * 0.4}px` }}>
        {entity.id}
      </div>
      {!isInService && (
        <div className="waiting-time" style={{ fontSize: `${size * 0.3}px` }}>
          {Math.max(0, Date.now() / 1000 - entity.arrivalTime).toFixed(1)}s
        </div>
      )}
    </div>
  );
};