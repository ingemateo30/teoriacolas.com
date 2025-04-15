"use client";

import Link from 'next/link';
import { Card } from '@/components/ui/Card';
import { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Sidebar from '@/components/layout/Sidebar';
import Footer from '@/components/layout/Footer';

// Iconos para cada modelo de cola
const modelIcons = {
  mm1: (
    <svg className="w-10 h-10 mb-3 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
    </svg>
  ),
  mmc: (
    <svg className="w-10 h-10 mb-3 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
    </svg>
  ),
  mmck: (
    <svg className="w-10 h-10 mb-3 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
    </svg>
  ),
  mg1: (
    <svg className="w-10 h-10 mb-3 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
    </svg>
  ),
  gm1: (
    <svg className="w-10 h-10 mb-3 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
    </svg>
  ),
  gg1: (
    <svg className="w-10 h-10 mb-3 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
    </svg>
  ),
  networks: (
    <svg className="w-10 h-10 mb-3 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
    </svg>
  ),
};

const models = [
  {
    id: 'mm1',
    name: 'M/M/1',
    description: 'Cola simple con llegadas Poisson y tiempos de servicio exponenciales con un solo servidor',
    icon: modelIcons.mm1,
  },
  {
    id: 'mmc',
    name: 'M/M/c',
    description: 'Cola con llegadas Poisson, tiempos de servicio exponenciales y c servidores',
    icon: modelIcons.mmc,
  },
  {
    id: 'mmck',
    name: 'M/M/c/K',
    description: 'Cola con llegadas Poisson, tiempos de servicio exponenciales, c servidores y capacidad limitada K',
    icon: modelIcons.mmck,
  },
  {
    id: 'mg1',
    name: 'M/G/1',
    description: 'Cola con llegadas Poisson y distribución general de tiempos de servicio',
    icon: modelIcons.mg1,
  },
  {
    id: 'gm1',
    name: 'G/M/1',
    description: 'Cola con distribución general de llegadas y tiempos de servicio exponenciales',
    icon: modelIcons.gm1,
  },
  {
    id: 'gg1',
    name: 'G/G/1',
    description: 'Cola con distribución general de llegadas y tiempos de servicio',
    icon: modelIcons.gg1,
  },
  {
    id: 'networks',
    name: 'Redes de Colas',
    description: 'Sistemas interconectados de múltiples colas',
    icon: modelIcons.networks,
  },
];

export default function ModelsPage() {
  // Estado para controlar el hover de las tarjetas
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Navbar />
      <div className="flex flex-1 pt-16">
        <Sidebar />
        <div className="max-w-6xl mx-auto px-4 py-10 md:px-8 lg:px-16">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-primary-600 to-blue-600 bg-clip-text text-transparent">
              Modelos de Teoría de Colas
            </h1>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              Selecciona un modelo para aprender más sobre su teoría, fórmulas y aplicaciones en diferentes sistemas de colas.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {models.map((model, index) => (
              <Link
                href={`/models/${model.id}`}
                key={model.id}
                className={`
              bg-white rounded-lg p-6 shadow-md transition-all duration-300 
              hover:shadow-lg border border-gray-100
              transform ${hoveredCard === index ? 'scale-105' : ''}
            `}
                onMouseEnter={() => setHoveredCard(index)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                <div className="flex flex-col items-center text-center">
                  <div className="mb-3 p-3 rounded-full bg-primary-50">{model.icon}</div>
                  <h3 className="text-xl font-medium text-gray-900 mb-2">{model.name}</h3>
                  <p className="text-gray-600">{model.description}</p>

                  <div className="mt-4 w-full">
                    <div className={`
                  py-2 px-4 mt-2 rounded-md text-sm font-medium
                  ${hoveredCard === index ? 'bg-primary-600 text-white' : 'bg-gray-100 text-gray-700'}
                  transition-colors duration-200
                `}>
                      Ver detalles
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Sección de información adicional */}
          <div className="mt-16 bg-gray-50 rounded-xl p-6 border border-gray-200">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">¿Por qué elegir un modelo?</h2>
            <div className="space-y-4">
              <p className="text-gray-700">
                La selección del modelo adecuado te permite:
              </p>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-primary-600 mt-1 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>Evaluar el rendimiento del sistema bajo diferentes condiciones</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-primary-600 mt-1 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>Optimizar el número de servidores y recursos necesarios</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-primary-600 mt-1 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>Predecir tiempos de espera y longitudes de cola para mejorar la experiencia del usuario</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-primary-600 mt-1 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>Realizar análisis de capacidad y planificación de recursos</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>

  );
}