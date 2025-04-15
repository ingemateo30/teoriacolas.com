import React, { useEffect, useRef } from 'react';
import { useSimulation } from '@/hooks/useSimulation';
import { Entity, EntityStatus } from '@/types/simulation';
import { EntityAnimation } from './EntityAnimation';

interface QueueVisualizerProps {
  modelId?: string;
  width?: number;
  height?: number;
}

// Componente adaptador para convertir Entity de la simulación al formato esperado por EntityAnimation
interface AdaptedEntity {
  id: number;
  status: 'waiting' | 'service' | 'completed';
  position: number;
  arrivalTime: number;
  serverIndex?: number;
}

const adaptEntity = (entity: Entity): AdaptedEntity => {
  // Mapear el estado de la simulación al estado esperado por EntityAnimation
  let adaptedStatus: 'waiting' | 'service' | 'completed';
  switch (entity.status) {
    case 'queued':
      adaptedStatus = 'waiting';
      break;
    case 'inService':
      adaptedStatus = 'service';
      break;
    case 'departed':
      adaptedStatus = 'completed';
      break;
    default:
      adaptedStatus = 'waiting';
  }

  return {
    id: parseInt(entity.id, 10), // Convertir id string a número
    status: adaptedStatus,
    position: entity.position,
    arrivalTime: entity.arrivalTime,
    serverIndex: entity.serverId !== null ? entity.serverId : undefined
  };
};

export const QueueVisualizer: React.FC<QueueVisualizerProps> = ({
  modelId,
  width = 800,
  height = 400
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { 
    simulationState, 
    serverCount, 
    queueCapacity, 
    currentEntities 
  } = useSimulation();

  // Cálculo de dimensiones para la visualización
  const serverWidth = 80;
  const serverHeight = 120;
  const entitySize = 30;
  const serverGap = 20;
  const queueWidth = width - (serverCount * (serverWidth + serverGap));
  
  return (
    <div className="relative bg-gray-100 rounded-lg shadow-md overflow-hidden" 
         style={{ width, height, minHeight: '300px' }}
         ref={containerRef}>
      
      <div className="absolute bottom-4 left-4 right-4 flex items-end">
        {/* Área de cola */}
        <div 
          className="relative h-32 border-b-2 border-dashed border-gray-400 flex items-end"
          style={{ width: queueCapacity === Infinity ? queueWidth : queueWidth * 0.7 }}
        >
          <div className="absolute top-0 left-0 text-sm font-medium text-gray-600">
            Cola (Capacidad: {queueCapacity === Infinity ? '∞' : queueCapacity})
          </div>
          
          {currentEntities.filter((entity: Entity) => entity.status === 'queued').map((entity: Entity, index: number) => {
            const adaptedEntity = adaptEntity(entity);
            
            return (
              <EntityAnimation 
                key={entity.id} 
                entity={adaptedEntity}
                isInQueue={true}
                isInService={false}
                position={index} 
                totalEntities={currentEntities.filter((e: Entity) => e.status === 'queued').length}
                containerWidth={queueCapacity === Infinity ? queueWidth : queueWidth * 0.7}
                size={entitySize}
              />
            );
          })}
        </div>
        
        {/* Servidores */}
        <div className="flex ml-4">
          {Array.from({ length: serverCount }).map((_, serverIndex) => {
            const serverEntity = currentEntities.find(
              (entity: Entity) => entity.status === 'inService' && entity.serverId === serverIndex
            );
            
            return (
              <div 
                key={`server-${serverIndex}`}
                className="relative mx-2 bg-white border-2 border-blue-500 rounded-lg flex items-center justify-center"
                style={{ width: serverWidth, height: serverHeight }}
              >
                <div className="absolute -top-6 left-0 right-0 text-center text-sm font-medium text-blue-700">
                  Servidor {serverIndex + 1}
                </div>
                
                {serverEntity && (
                  <EntityAnimation 
                    entity={adaptEntity(serverEntity)}
                    isInQueue={false}
                    isInService={true}
                    size={entitySize * 1.2}
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>
      
      {/* Indicadores de estado */}
      <div className="absolute top-4 left-4 bg-white bg-opacity-80 p-2 rounded text-sm">
        <div>Estado: {simulationState === 'running' ? 'En ejecución' : 'Pausado'}</div>
        <div>Entidades en el sistema: {currentEntities.length}</div>
      </div>
    </div>
  );
};