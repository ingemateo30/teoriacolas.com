"use client";

import React, { useEffect, useState } from 'react';
import { SimulationEntity } from '@/types/simulation';

interface EntityAnimationProps {
  entity: SimulationEntity;
  position?: { x: number, y: number };
}


const EntityAnimation: React.FC<EntityAnimationProps> = ({ entity, position }) => {
  const [pos, setPos] = useState(position || entity.position);
 
  
  useEffect(() => {
    if (position) {
      setPos(position);
      return;
    }
   

    const targetPos = entity.position;
    let animationFrame: number;
   
    const animate = () => {
      console.log("Entidades en espera:");
console.log("Entidades en servicio:");

      setPos(currentPos => {
       
        const dx = (targetPos.x - currentPos.x) * 0.1;
        const dy = (targetPos.y - currentPos.y) * 0.1;
       
        const newPos = {
          x: currentPos.x + dx,
          y: currentPos.y + dy
        };
       
       
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
 
 
  const getEntityColor = () => {
    switch (entity.status) {
      case 'waiting': return 'bg-blue-600 shadow-md shadow-blue-500/20';
      case 'processing': return 'bg-emerald-600 shadow-md shadow-emerald-500/20';
      case 'completed': return 'bg-purple-600 shadow-md shadow-purple-500/20';
      default: return 'bg-gray-700 shadow-md shadow-gray-600/20';
    }
  };

  
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