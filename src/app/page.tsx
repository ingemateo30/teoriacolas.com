"use client";

import Link from 'next/link';
import { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Sidebar from '@/components/layout/Sidebar';
import Footer from '@/components/layout/Footer';
import { useEffect } from 'react';


export default function Homepage() {
  // Estado para animación y efectos de UI
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  const [windowWidth, setWindowWidth] = useState<number | null>(null);
  
  useEffect(() => {
    // Solo ejecutar en el cliente
    setWindowWidth(window.innerWidth);
    
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  // Determinar si estamos en móvil
  const isMobile = windowWidth && windowWidth < 640;

  // Modelos comunes de teoría de colas con descripciones
  const queueModels = [
    {
      title: "M/M/1",
      description: "Modelo básico con llegadas Poisson, tiempos de servicio exponenciales y un solo servidor",
      href: "/models/mm1",
      icon: (
        <svg className="w-10 h-10 mb-3 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
        </svg>
      )
    },
    {
      title: "M/M/c",
      description: "Sistema con múltiples servidores en paralelo con distribuciones exponenciales",
      href: "/models/mmc",
      icon: (
        <svg className="w-10 h-10 mb-3 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      )
    },
    {
      title: "M/M/c/K",
      description: "Sistema con capacidad limitada K y c servidores",
      href: "/models/mmck",
      icon: (
        <svg className="w-10 h-10 mb-3 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      )
    },
    {
      title: "M/G/1",
      description: "Modelo con servicio de distribución general y llegadas Poisson",
      href: "/models/mg1",
      icon: (
        <svg className="w-10 h-10 mb-3 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      )
    }
  ];

  // Conceptos clave con descripciones breves
  const keyConcepts = [
    { title: "Tasa de llegada (λ)", description: "Número promedio de llegadas por unidad de tiempo" },
    { title: "Tasa de servicio (μ)", description: "Número promedio de clientes que pueden ser atendidos por unidad de tiempo" },
    { title: "Factor de utilización (ρ)", description: "Proporción del tiempo que los servidores están ocupados (ρ = λ/cμ)" },
    { title: "Tiempo de espera (Wq)", description: "Tiempo promedio que un cliente espera en la cola antes de ser atendido" },
    { title: "Longitud de cola (Lq)", description: "Número promedio de clientes esperando en la cola" },
    { title: "Tiempo total en el sistema (W)", description: "Tiempo promedio total que un cliente pasa en el sistema" }
  ];

  // Cambiar la sección expandida
  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-900 text-gray-200">
      {/* Navbar - Fijo en la parte superior */}
      <Navbar />

      {/* Área de contenido principal con sidebar */}
      <div className="flex flex-1 pt-16"> {/* Añadido pt-16 para compensar la altura del navbar fijo */}
        {/* Sidebar - Fijo en la izquierda */}
        <Sidebar />

        {/* Contenido principal - Ocupa el ancho restante */}
        <main className="flex-1 bg-gradient-to-b from-gray-900 to-gray-800 px-4 py-10 md:px-8 lg:px-16 lg:ml-10">
          {/* Sección Hero */}
          <section className="mb-16 text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
              Teoría de Colas Interactiva
            </h1>

            <p className="text-xl text-gray-300 mb-8 leading-relaxed px-4">
              Explore, aprenda y simule modelos de teoría de colas con esta plataforma educativa interactiva.
              Comprenda los principios fundamentales que subyacen a los sistemas de espera.
            </p>

            <div className="flex flex-col sm:flex-row justify-center gap-4 mb-12">
              <Link
                href="/simulator"
                className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-black bg-blue-400 hover:bg-blue-500 transition duration-300 shadow-md hover:shadow-lg"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Iniciar Simulación
              </Link>

              <Link
                href="/learning"
                className="inline-flex items-center justify-center px-6 py-3 border border-blue-400 text-base font-medium rounded-md text-blue-400 bg-gray-800 hover:bg-gray-700 transition duration-300 shadow-md hover:shadow-lg"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 14l9-5-9-5-9 5 9 5z" />
                  <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
                </svg>
                Aprender Conceptos
              </Link>
            </div>

            {/* Ilustración animada de cola */}
            <div className="relative h-64 md:h-80 bg-gray-800 rounded-lg shadow-inner overflow-hidden mx-auto max-w-3xl mb-4 border border-gray-700">
      {/* Línea que representa el flujo */}
      <div className="absolute inset-0 flex items-center">
        <div className="h-px w-full bg-gray-600 z-0"></div>
      </div>

      {/* Zona de cola de espera */}
      <div className="absolute left-0 top-0 bottom-0 w-1/3 flex items-center justify-end">
        {[...Array(isMobile ? 3 : 5)].map((_, i) => (
          <div
            key={`queue-${i}`}
            className="w-6 h-6 md:w-8 md:h-8 rounded-full bg-blue-500 opacity-80 shadow-md absolute"
            style={{
              left: isMobile ? `${i * 20}px` : `${i * 40}px`,
              animation: `moveInQueue ${isMobile ? 8 : 10}s infinite ${i * (isMobile ? 1.5 : 2)}s linear`
            }}
          ></div>
        ))}
      </div>

      {/* Servidor - Centrado */}
      <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-12 h-12 md:w-20 md:h-20 rounded-lg bg-indigo-600 flex items-center justify-center shadow-lg z-10">
        <svg className="w-6 h-6 md:w-10 md:h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" />
        </svg>
      </div>

      {/* Cliente siendo atendido (parpadeando) */}
      <div 
        className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-6 h-6 md:w-10 md:h-10 rounded-full bg-yellow-400 shadow-lg opacity-80 z-20"
        style={{ animation: 'blink 1s infinite ease-in-out' }}>
      </div>

      {/* Clientes que salen del sistema */}
      <div className="absolute right-0 top-0 bottom-0 w-1/3 flex items-center">
        {[...Array(isMobile ? 2 : 3)].map((_, i) => (
          <div
            key={`departed-${i}`}
            className="w-6 h-6 md:w-8 md:h-8 rounded-full bg-green-500 opacity-80 shadow-md absolute"
            style={{
              right: isMobile 
                ? `${(1 - i) * 20 + 10}px` 
                : `${(2 - i) * 40 + 20}px`,
              animation: `moveOutQueue ${isMobile ? 8 : 10}s infinite ${i * (isMobile ? 2.5 : 3.3)}s linear`
            }}
          ></div>
        ))}
      </div>

      {/* Etiquetas - Ocultas en móvil o más pequeñas */}
      <div className="absolute bottom-2 md:bottom-4 left-2 md:left-6 text-xs md:text-sm font-medium text-gray-300 bg-gray-700 px-1 md:px-2 py-0.5 md:py-1 rounded shadow-sm">
        Cola
      </div>
      <div className="absolute bottom-2 md:bottom-4 right-2 md:right-6 text-xs md:text-sm font-medium text-gray-300 bg-gray-700 px-1 md:px-2 py-0.5 md:py-1 rounded shadow-sm">
        Completado
      </div>
      <div className="absolute top-2 md:top-4 left-1/2 transform -translate-x-1/2 text-xs md:text-sm font-medium text-gray-300 bg-gray-700 px-1 md:px-2 py-0.5 md:py-1 rounded shadow-sm">
        Servidor
      </div>

      {/* Flechas direccionales para mostrar el flujo FIFO */}
      <div className="absolute top-1/2 left-1/4 transform -translate-y-1/2">
        <svg className="w-4 h-4 md:w-8 md:h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
        </svg>
      </div>
      <div className="absolute top-1/2 right-1/4 transform -translate-y-1/2">
        <svg className="w-4 h-4 md:w-8 md:h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
        </svg>
      </div>

      {/* CSS para animaciones */}
      <style jsx>{`
        @keyframes moveInQueue {
          0% { transform: translateX(${isMobile ? '-40px' : '-80px'}); opacity: 0; }
          10% { transform: translateX(${isMobile ? '-20px' : '-40px'}); opacity: 0.7; }
          50% { transform: translateX(${isMobile ? '60px' : '120px'}); opacity: 1; }
          60% { transform: translateX(${isMobile ? '80px' : '160px'}); opacity: 0.7; }
          70% { transform: translateX(${isMobile ? '100px' : '200px'}); opacity: 0; }
          100% { transform: translateX(${isMobile ? '100px' : '200px'}); opacity: 0; }
        }
        
        @keyframes moveOutQueue {
          0% { transform: translateX(${isMobile ? '-100px' : '-200px'}); opacity: 0; }
          30% { transform: translateX(${isMobile ? '-80px' : '-160px'}); opacity: 0; }
          40% { transform: translateX(${isMobile ? '-60px' : '-120px'}); opacity: 0.7; }
          80% { transform: translateX(0px); opacity: 1; }
          100% { transform: translateX(${isMobile ? '20px' : '40px'}); opacity: 0; }
        }
        
        @keyframes blink {
          0% { opacity: 1; }
          50% { opacity: 0.3; }
          100% { opacity: 1; }
        }
      `}</style>
    </div>
          </section>

          {/* Sección de Modelos */}
          <section className="mb-16 max-w-6xl mx-auto">
            <div
              className="flex items-center justify-between cursor-pointer mb-6 bg-gray-800 px-4 py-3 rounded-lg shadow-sm hover:shadow transition-all duration-200 border border-gray-700"
              onClick={() => toggleSection('models')}
            >
              <h2 className="text-2xl font-semibold text-gray-200">
                Modelos Principales
              </h2>
              <svg
                className={`w-6 h-6 text-gray-400 transition-transform duration-200 ${expandedSection === 'models' ? 'transform rotate-180' : ''}`}
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
                    bg-gray-800 rounded-lg p-6 shadow-md transition-all duration-300 
                    hover:shadow-lg border border-gray-700 hover:border-blue-500
                    transform ${hoveredCard === index ? 'scale-105' : ''}
                  `}
                  onMouseEnter={() => setHoveredCard(index)}
                  onMouseLeave={() => setHoveredCard(null)}
                >
                  <div className="flex flex-col items-center text-center">
                    <div className="mb-3 p-3 rounded-full bg-gray-700">{model.icon}</div>
                    <h3 className="text-xl font-medium text-gray-100 mb-2">{model.title}</h3>
                    <p className="text-gray-400">{model.description}</p>
                  </div>
                </Link>
              ))}
            </div>
          </section>

          {/* Sección de Conceptos Clave */}
          <section className="mb-16 max-w-6xl mx-auto">
            <div
              className="flex items-center justify-between cursor-pointer mb-6 bg-gray-800 px-4 py-3 rounded-lg shadow-sm hover:shadow transition-all duration-200 border border-gray-700"
              onClick={() => toggleSection('concepts')}
            >
              <h2 className="text-2xl font-semibold text-gray-200">
                Conceptos Clave
              </h2>
              <svg
                className={`w-6 h-6 text-gray-400 transition-transform duration-200 ${expandedSection === 'concepts' ? 'transform rotate-180' : ''}`}
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
                grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5
                overflow-hidden transition-all duration-500 ease-in-out
                ${expandedSection === 'concepts' || expandedSection === null ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'}
              `}
            >
              {keyConcepts.map((concept) => (
                <div
                  key={concept.title}
                  className="bg-gray-800 rounded-lg p-5 shadow border-l-4 border-blue-500 hover:border-blue-400 transition-all duration-200"
                >
                  <h3 className="text-lg font-medium text-gray-100 mb-2">{concept.title}</h3>
                  <p className="text-gray-400">{concept.description}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Sección de Inicio Rápido */}
          <section className="mb-16 max-w-6xl mx-auto">
            <div
              className="flex items-center justify-between cursor-pointer mb-6 bg-gray-800 px-4 py-3 rounded-lg shadow-sm hover:shadow transition-all duration-200 border border-gray-700"
              onClick={() => toggleSection('quickstart')}
            >
              <h2 className="text-2xl font-semibold text-gray-200">
                Inicio Rápido
              </h2>
              <svg
                className={`w-6 h-6 text-gray-400 transition-transform duration-200 ${expandedSection === 'quickstart' ? 'transform rotate-180' : ''}`}
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
              <div className="flex flex-col md:flex-row justify-between items-stretch bg-gray-800 rounded-xl shadow-md overflow-hidden border border-gray-700">
                <div className="flex-1 p-6 md:p-8">
                  <h3 className="text-xl font-medium text-gray-100 mb-6">En 3 simples pasos:</h3>
                  <ul className="space-y-6">
                    <li className="flex items-start">
                      <div className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-900 text-blue-300 mr-4 flex-shrink-0 font-semibold">
                        1
                      </div>
                      <div>
                        <h4 className="font-medium text-lg mb-1 text-gray-200">Selecciona un modelo de cola</h4>
                        <p className="text-gray-400">Escoge entre varios modelos según tus necesidades</p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <div className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-900 text-blue-300 mr-4 flex-shrink-0 font-semibold">
                        2
                      </div>
                      <div>
                        <h4 className="font-medium text-lg mb-1 text-gray-200">Configura los parámetros</h4>
                        <p className="text-gray-400">Ajusta tasas de llegada, servicio y otros parámetros</p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <div className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-900 text-blue-300 mr-4 flex-shrink-0 font-semibold">
                        3
                      </div>
                      <div>
                        <h4 className="font-medium text-lg mb-1 text-gray-200">Inicia la simulación</h4>
                        <p className="text-gray-400">Observa resultados en tiempo real y analiza estadísticas</p>
                      </div>
                    </li>
                  </ul>
                </div>

                <div className="bg-gray-850 p-6 md:p-8 flex-1 border-t md:border-t-0 md:border-l border-gray-700">
                  <h4 className="font-medium text-center mb-4 text-lg text-gray-200">Notación de Kendall</h4>
                  <div className="font-mono text-center bg-gray-900 py-3 px-4 rounded-lg border border-gray-600 mb-5 text-xl shadow-sm text-blue-300">
                    A/B/c/K/N/D
                  </div>
                  <ul className="space-y-2 text-gray-300">
                    <li className="flex"><span className="font-medium w-8">A:</span> Distribución de llegadas</li>
                    <li className="flex"><span className="font-medium w-8">B:</span> Distribución de servicio</li>
                    <li className="flex"><span className="font-medium w-8">c:</span> Número de servidores</li>
                    <li className="flex"><span className="font-medium w-8">K:</span> Capacidad del sistema</li>
                    <li className="flex"><span className="font-medium w-8">N:</span> Tamaño de la población</li>
                    <li className="flex"><span className="font-medium w-8">D:</span> Disciplina de la cola</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Sección de Aplicaciones */}
          <section className="mb-16 max-w-6xl mx-auto">
            <div
              className="flex items-center justify-between cursor-pointer mb-6 bg-gray-800 px-4 py-3 rounded-lg shadow-sm hover:shadow transition-all duration-200 border border-gray-700"
              onClick={() => toggleSection('applications')}
            >
              <h2 className="text-2xl font-semibold text-gray-200">
                Aplicaciones Prácticas
              </h2>
              <svg
                className={`w-6 h-6 text-gray-400 transition-transform duration-200 ${expandedSection === 'applications' ? 'transform rotate-180' : ''}`}
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
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-gray-800 rounded-lg shadow-md overflow-hidden border border-gray-700 flex flex-col h-full">
                  <div className="bg-blue-900 p-4 border-b border-blue-800">
                    <h3 className="text-lg font-medium text-blue-100">Centros de Contacto</h3>
                  </div>
                  <div className="p-5 flex-grow">
                    <p className="text-gray-300">Optimización de personal y estimación de tiempos de espera para mejorar la satisfacción del cliente.</p>
                  </div>
                </div>

                <div className="bg-gray-800 rounded-lg shadow-md overflow-hidden border border-gray-700 flex flex-col h-full">
                  <div className="bg-blue-900 p-4 border-b border-blue-800">
                    <h3 className="text-lg font-medium text-blue-100">Redes Informáticas</h3>
                  </div>
                  <div className="p-5 flex-grow">
                    <p className="text-gray-300">Análisis de congestión, rendimiento de servidores y planificación de capacidad para redes.</p>
                  </div>
                </div>

                <div className="bg-gray-800 rounded-lg shadow-md overflow-hidden border border-gray-700 flex flex-col h-full">
                  <div className="bg-blue-900 p-4 border-b border-blue-800">
                    <h3 className="text-lg font-medium text-blue-100">Servicios de Salud</h3>
                  </div>
                  <div className="p-5 flex-grow">
                    <p className="text-gray-300">Gestión de pacientes en salas de emergencia, asignación de camas y programación de citas.</p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>
      <Footer />
    </div>
  );
}