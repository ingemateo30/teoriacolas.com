"use client";

import React, { useEffect, useState } from 'react';
import { SimulationEntity } from '@/types/simulation';

interface EntityAnimationProps {
  entity: SimulationEntity;
  position?: { x: number, y: number };
}

/**
 * Componente EntityAnimation con Modo Oscuro
 * 
 * Muestra entidades de simulación con diferentes estados visuales
 * Implementa animaciones suaves con colores optimizados para modo oscuro
 * Compatible con el tema oscuro del navbar
 */
const EntityAnimation: React.FC<EntityAnimationProps> = ({ entity, position }) => {
  const [pos, setPos] = useState(position || entity.position);
 
  // Animate to new position when it changes
  useEffect(() => {
    if (position) {
      setPos(position);
      return;
    }
   
    // If no position provided, animate to entity position
    const targetPos = entity.position;
    let animationFrame: number;
   
    const animate = () => {
      console.log("Entidades en espera:");
console.log("Entidades en servicio:");

      setPos(currentPos => {
        // Calculate new position with easing
        const dx = (targetPos.x - currentPos.x) * 0.1;
        const dy = (targetPos.y - currentPos.y) * 0.1;
       
        const newPos = {
          x: currentPos.x + dx,
          y: currentPos.y + dy
        };
       
        // Continue animation if not close enough
        if (Math.abs(dx) > 0.5 || Math.abs(dy) > 0.5) {
          animationFrame = requestAnimationFrame(animate);
        }
       
        return newPos;
      });
    };
   
    animationFrame = requestAnimationFrame(animate);
   
    return () => {
      cancelAnimationFrame(animationFrame);
    };
  }, [entity.position, position]);
 
  // Determine color based on status - Dark mode color palette
  const getEntityColor = () => {
    switch (entity.status) {
      case 'waiting': return 'bg-blue-600 shadow-md shadow-blue-500/20';
      case 'processing': return 'bg-emerald-600 shadow-md shadow-emerald-500/20';
      case 'completed': return 'bg-purple-600 shadow-md shadow-purple-500/20';
      default: return 'bg-gray-700 shadow-md shadow-gray-600/20';
    }
  };

  // Determine text color based on status
  const getTextColor = () => {
    switch (entity.status) {
      case 'waiting': return 'text-blue-100';
      case 'processing': return 'text-emerald-100';
      case 'completed': return 'text-purple-100';
      default: return 'text-gray-300';
    }
  };
 
  return (
    
    <div
    
      className={`absolute rounded-full flex items-center justify-center ${getTextColor()} text-xs font-bold ${getEntityColor()} transition-colors duration-300 hover:scale-105`}
      style={{
        width: 40,
        height: 40,
        transform: `translate(${pos.x}px, ${pos.y}px)`,
        transition: 'transform 0.3s ease-out, box-shadow 0.2s ease'
      }}
    >
      {entity.id % 100}
    </div>
  );
};

export default EntityAnimation;