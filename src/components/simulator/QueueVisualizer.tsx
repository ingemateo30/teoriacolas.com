"use client";

import React, { useRef, useEffect } from 'react';
import { SimulationEntity } from '@/types/simulation';
import EntityAnimation from './EntityAnimation';

interface QueueVisualizerProps {
  entities: SimulationEntity[];
  servers: number;
  capacity: number;
  width?: number;
  height?: number;
}


const QueueVisualizer: React.FC<QueueVisualizerProps> = ({
  entities,
  servers,
  capacity,
  width = 800,
  height = 400,
}) => {
  const canvasRef = useRef<HTMLDivElement>(null);
 
  // Calcular las entidades en cada estado
  const waitingEntities = entities.filter(e => e.status === 'waiting');
  const processingEntities = entities.filter(e => e.status === 'processing');
 
  
  const queueWidth = width * 0.5;
  const serverWidth = width * 0.4;
  const serverHeight = height / Math.max(servers, 1);
 
  return (
    <div className="relative bg-gray-900 rounded-lg shadow-lg border border-gray-800" style={{ width, height }}>
      
      <div ref={canvasRef} className="absolute top-0 left-0 w-full h-full">
        
        <div className="absolute left-0 top-0 h-full border-r-2 border-dashed border-gray-700 flex flex-col items-center justify-center" style={{ width: queueWidth }}>
          <div className="text-center text-blue-400 font-medium mb-4">Cola de espera ({waitingEntities.length})</div>
          <div className="w-4/5 h-2/3 border-2 border-blue-600 rounded-lg bg-gray-800/70 flex items-center justify-center relative shadow-inner">
            {waitingEntities.map((entity, index) => (
              <EntityAnimation
                key={entity.id}
                entity={entity}
                position={{
                  x: 20 + (index % 5) * 40,
                  y: 30 + Math.floor(index / 5) * 40
                }}
              />
            ))}
          </div>
        </div>
       
       
        <div className="absolute right-0 top-0 h-full flex flex-col" style={{ width: serverWidth }}>
          <div className="text-center text-emerald-400 font-medium my-4">Servidores ({processingEntities.length}/{servers})</div>
          <div className="flex-1 flex flex-col">
            {Array.from({ length: servers }).map((_, i) => {
              const serverEntity = processingEntities[i];
              return (
                <div
                  key={i}
                  className={`flex-1 border-2 m-2 rounded-lg flex items-center justify-center transition-colors duration-300 ${
                    serverEntity ? 'border-emerald-600 bg-gray-800/80 shadow-md shadow-emerald-900/30' : 'border-gray-700 bg-gray-800/50'
                  }`}
                >
                  {serverEntity && (
                    <EntityAnimation
                      entity={serverEntity}
                      position={{ x: serverWidth / 2 - 20, y: serverHeight / 2 - 20 }}
                    />
                  )}
                  <div className="text-sm text-gray-400">Servidor {i + 1}</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
     
     
      <div className="absolute bottom-2 left-2 text-xs text-gray-400">
        Entrada
      </div>
      <div className="absolute bottom-2 right-2 text-xs text-gray-400">
        Salida
      </div>
    </div>
  );
};

export default QueueVisualizer;