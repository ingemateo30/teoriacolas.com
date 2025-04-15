"use client";

import Link from 'next/link';
import { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Sidebar from '@/components/layout/Sidebar';


export default function Homepage() {
  // State for animation and UI effects
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [expandedSection, setExpandedSection] = useState<string | number | null>(null);

  // Common queue theory models with descriptions
  const queueModels = [
    {
      title: "M/M/1",
      description: "Modelo básico con llegadas Poisson, tiempos de servicio exponenciales y un solo servidor",
      href: "/models/mm1",
      icon: (
        <svg className="w-12 h-12 mb-3 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
        </svg>
      )
    },
    {
      title: "M/M/c",
      description: "Sistema con múltiples servidores en paralelo con distribuciones exponenciales",
      href: "/models/mmc",
      icon: (
        <svg className="w-12 h-12 mb-3 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      )
    },
    {
      title: "M/M/c/K",
      description: "Sistema con capacidad limitada K y c servidores",
      href: "/models/mmck",
      icon: (
        <svg className="w-12 h-12 mb-3 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      )
    },
    {
      title: "M/G/1",
      description: "Modelo con servicio de distribución general y llegadas Poisson",
      href: "/models/mg1",
      icon: (
        <svg className="w-12 h-12 mb-3 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      )
    }
  ];

  // Key concepts with brief descriptions
  const keyConcepts = [
    { title: "Tasa de llegada (λ)", description: "Número promedio de llegadas por unidad de tiempo" },
    { title: "Tasa de servicio (μ)", description: "Número promedio de clientes que pueden ser atendidos por unidad de tiempo" },
    { title: "Factor de utilización (ρ)", description: "Proporción del tiempo que los servidores están ocupados (ρ = λ/cμ)" },
    { title: "Tiempo de espera (Wq)", description: "Tiempo promedio que un cliente espera en la cola antes de ser atendido" },
    { title: "Longitud de cola (Lq)", description: "Número promedio de clientes esperando en la cola" },
    { title: "Tiempo total en el sistema (W)", description: "Tiempo promedio total que un cliente pasa en el sistema" }
  ];

  // Toggle section expansion
  const toggleSection = (section: string | number) => {
    setExpandedSection(expandedSection === section ? null : section);
  };
  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Navbar - Fixed at the top */}
      <Navbar />

      {/* Main content area with sidebar */}
      <div className="flex flex-1 pt-16">
        {/* Sidebar - Fixed on the left */}
        <Sidebar />

        {/* Main content - Takes remaining width */}
        <main className="flex-1 bg-gradient-to-b from-white to-gray-50 px-4 py-8 md:px-8 lg:ml-64">
          {/* Hero Section */}
          <section className="mb-16 text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-primary-600 to-blue-600 bg-clip-text text-transparent">
              Teoría de Colas Interactiva
            </h1>
            
            <p className="text-xl text-gray-700 mb-8 leading-relaxed">
              Explore, aprenda y simule modelos de teoría de colas con esta plataforma educativa interactiva.
              Comprenda los principios fundamentales que subyacen a los sistemas de espera.
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center gap-4 mb-8">
              <Link 
                href="/simulator"
                className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 transition duration-300 shadow-md hover:shadow-lg"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Iniciar Simulación
              </Link>
              
              <Link 
                href="/learning/fundamentals"
                className="inline-flex items-center justify-center px-6 py-3 border border-primary-300 text-base font-medium rounded-md text-primary-700 bg-white hover:bg-primary-50 transition duration-300 shadow-md hover:shadow-lg"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 14l9-5-9-5-9 5 9 5z" />
                  <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
                </svg>
                Aprender Conceptos
              </Link>
            </div>
            
            {/* Animated queue illustration */}
            <div className="relative h-48 bg-gray-100 rounded-lg shadow-inner overflow-hidden mx-auto max-w-2xl">
              <div className="absolute inset-0 flex items-center">
                <div className="h-px w-full bg-gray-300 z-0"></div>
              </div>
              
              {/* Animated dots representing customers in queue */}
              <div className="absolute left-0 top-0 bottom-0 w-1/2 flex items-center justify-evenly">
                {[...Array(5)].map((_, i) => (
                  <div 
                    key={`queue-${i}`} 
                    className="w-6 h-6 rounded-full bg-primary-500 opacity-80 shadow-md"
                    style={{
                      animation: `moveInQueue 8s infinite ${i * 1.5}s ease-in-out`,
                    }}
                  ></div>
                ))}
              </div>
              
              {/* Server */}
              <div className="absolute right-1/4 top-1/2 transform -translate-y-1/2 w-16 h-16 rounded-lg bg-blue-600 flex items-center justify-center shadow-lg">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" />
                </svg>
              </div>
              
              {/* Departed customers */}
              <div className="absolute right-0 top-0 bottom-0 w-1/4 flex items-center justify-evenly">
                {[...Array(3)].map((_, i) => (
                  <div 
                    key={`departed-${i}`} 
                    className="w-6 h-6 rounded-full bg-green-500 opacity-80 shadow-md"
                    style={{
                      animation: `moveOutQueue 8s infinite ${i * 2.6}s ease-in-out`,
                    }}
                  ></div>
                ))}
              </div>
              
              {/* Labels */}
              <div className="absolute bottom-2 left-4 text-xs font-medium text-gray-600">Cola de espera</div>
              <div className="absolute bottom-2 right-10 text-xs font-medium text-gray-600">Servicio completado</div>
              <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 text-xs font-medium text-gray-600">Servidor</div>
            </div>
            
            {/* CSS for animations */}
            <style jsx>{`
              @keyframes moveInQueue {
                0% { transform: translateX(-50px); opacity: 0; }
                20% { transform: translateX(0); opacity: 1; }
                80% { transform: translateX(0); opacity: 1; }
                100% { transform: translateX(200px); opacity: 0; }
              }
              
              @keyframes moveOutQueue {
                0% { transform: translateX(0); opacity: 0; }
                30% { transform: translateX(0); opacity: 1; }
                100% { transform: translateX(50px); opacity: 0; }
              }
            `}</style>
          </section>
          
          {/* Models Section */}
          <section className="mb-16">
            <div 
              className="flex items-center cursor-pointer mb-6"
              onClick={() => toggleSection('models')}
            >
              <h2 className="text-2xl font-semibold text-gray-800">
                Modelos Principales
              </h2>
              <svg
                className={`w-5 h-5 ml-2 transition-transform duration-200 text-gray-600 ${
                  expandedSection === 'models' ? 'transform rotate-180' : ''
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </div>
            
            <div 
              className={`
                grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 
                overflow-hidden transition-all duration-500 ease-in-out
                ${expandedSection === 'models' || expandedSection === null ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'}
              `}
            >
              {queueModels.map((model, index) => (
                <Link 
                  href={model.href} 
                  key={model.title}
                  className={`
                    bg-white rounded-lg p-6 shadow-md transition-all duration-300 
                    hover:shadow-lg border border-gray-100
                    transform ${hoveredCard === index ? 'scale-105' : ''}
                  `}
                  onMouseEnter={() => setHoveredCard(index)}
                  onMouseLeave={() => setHoveredCard(null)}
                >
                  <div className="flex flex-col items-center text-center">
                    <div className="mb-2">{model.icon}</div>
                    <h3 className="text-xl font-medium text-gray-900 mb-2">{model.title}</h3>
                    <p className="text-gray-600 text-sm">{model.description}</p>
                  </div>
                </Link>
              ))}
            </div>
          </section>
          
          {/* Key Concepts Section */}
          <section className="mb-16">
            <div 
              className="flex items-center cursor-pointer mb-6"
              onClick={() => toggleSection('concepts')}
            >
              <h2 className="text-2xl font-semibold text-gray-800">
                Conceptos Clave
              </h2>
              <svg
                className={`w-5 h-5 ml-2 transition-transform duration-200 text-gray-600 ${
                  expandedSection === 'concepts' ? 'transform rotate-180' : ''
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </div>
            
            <div 
              className={`
                grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4
                overflow-hidden transition-all duration-500 ease-in-out
                ${expandedSection === 'concepts' || expandedSection === null ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'}
              `}
            >
              {keyConcepts.map((concept, index) => (
                <div 
                  key={concept.title}
                  className="bg-white rounded-lg p-4 shadow border-l-4 border-primary-500 hover:border-primary-600 transition-all duration-200"
                >
                  <h3 className="text-lg font-medium text-gray-900 mb-1">{concept.title}</h3>
                  <p className="text-gray-600 text-sm">{concept.description}</p>
                </div>
              ))}
            </div>
          </section>
          
          {/* Quick Start Section */}
          <section className="mb-16">
            <div 
              className="flex items-center cursor-pointer mb-6"
              onClick={() => toggleSection('quickstart')}
            >
              <h2 className="text-2xl font-semibold text-gray-800">
                Inicio Rápido
              </h2>
              <svg
                className={`w-5 h-5 ml-2 transition-transform duration-200 text-gray-600 ${
                  expandedSection === 'quickstart' ? 'transform rotate-180' : ''
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </div>
            
            <div 
              className={`
                overflow-hidden transition-all duration-500 ease-in-out
                ${expandedSection === 'quickstart' || expandedSection === null ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'}
              `}
            >
              <div className="flex flex-col md:flex-row justify-between items-center bg-white rounded-xl shadow-md p-6 border border-gray-100">
                <div className="flex-1 mb-6 md:mb-0 md:mr-6">
                  <h3 className="text-xl font-medium text-gray-900 mb-4">En 3 simples pasos:</h3>
                  <ul className="space-y-4">
                    <li className="flex items-start">
                      <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary-100 text-primary-800 mr-3 flex-shrink-0">
                        1
                      </div>
                      <div>
                        <h4 className="font-medium">Selecciona un modelo de cola</h4>
                        <p className="text-sm text-gray-600">Escoge entre varios modelos según tus necesidades</p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary-100 text-primary-800 mr-3 flex-shrink-0">
                        2
                      </div>
                      <div>
                        <h4 className="font-medium">Configura los parámetros</h4>
                        <p className="text-sm text-gray-600">Ajusta tasas de llegada, servicio y otros parámetros</p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary-100 text-primary-800 mr-3 flex-shrink-0">
                        3
                      </div>
                      <div>
                        <h4 className="font-medium">Inicia la simulación</h4>
                        <p className="text-sm text-gray-600">Observa resultados en tiempo real y analiza estadísticas</p>
                      </div>
                    </li>
                  </ul>
                </div>
                
                <div className="bg-gray-50 rounded-lg p-5 flex-1 border border-gray-200">
                  <h4 className="font-medium text-center mb-3 text-gray-700">Notación de Kendall</h4>
                  <div className="font-mono text-center bg-white py-2 px-4 rounded border border-gray-300 mb-3 text-lg">
                    A/S/c/K/N/D
                  </div>
                  <ul className="text-sm space-y-1 text-gray-600">
                    <li><span className="font-medium">A</span>: Distribución de llegadas</li>
                    <li><span className="font-medium">S</span>: Distribución de servicio</li>
                    <li><span className="font-medium">c</span>: Número de servidores</li>
                    <li><span className="font-medium">K</span>: Capacidad del sistema</li>
                    <li><span className="font-medium">N</span>: Tamaño de la población</li>
                    <li><span className="font-medium">D</span>: Disciplina de la cola</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>
          
          {/* Application section */}
          <section className="mb-16">
            <div 
              className="flex items-center cursor-pointer mb-6"
              onClick={() => toggleSection('applications')}
            >
              <h2 className="text-2xl font-semibold text-gray-800">
                Aplicaciones Prácticas
              </h2>
              <svg
                className={`w-5 h-5 ml-2 transition-transform duration-200 text-gray-600 ${
                  expandedSection === 'applications' ? 'transform rotate-180' : ''
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </div>
            
            <div 
              className={`
                overflow-hidden transition-all duration-500 ease-in-out
                ${expandedSection === 'applications' || expandedSection === null ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'}
              `}
            >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-100 flex flex-col">
                  <div className="bg-primary-50 p-4">
                    <h3 className="text-lg font-medium text-primary-900">Centros de Contacto</h3>
                  </div>
                  <div className="p-4 flex-grow">
                    <p className="text-gray-600 text-sm">Optimización de personal y estimación de tiempos de espera para mejorar la satisfacción del cliente.</p>
                  </div>
                </div>
                
                <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-100 flex flex-col">
                  <div className="bg-primary-50 p-4">
                    <h3 className="text-lg font-medium text-primary-900">Redes Informáticas</h3>
                  </div>
                  <div className="p-4 flex-grow">
                    <p className="text-gray-600 text-sm">Análisis de congestión, rendimiento de servidores y planificación de capacidad para redes.</p>
                  </div>
                </div>
                
                <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-100 flex flex-col">
                  <div className="bg-primary-50 p-4">
                    <h3 className="text-lg font-medium text-primary-900">Servicios de Salud</h3>
                  </div>
                  <div className="p-4 flex-grow">
                    <p className="text-gray-600 text-sm">Gestión de pacientes en salas de emergencia, asignación de camas y programación de citas.</p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
