"use client";

import Link from 'next/link';
import { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Sidebar from '@/components/layout/Sidebar';
import Footer from '@/components/layout/Footer';

export default function LearningPage() {
  // Estado para animación y efectos de UI
  const [activeTab, setActiveTab] = useState<string>('overview');
  const [expandedSection, setExpandedSection] = useState<string | null>('overview');

  // Cambiar la sección expandida
  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-950">
      {/* Navbar - Fijo en la parte superior */}
      <Navbar />

      {/* Área de contenido principal con sidebar */}
      <div className="flex flex-1 pt-16"> {/* Añadido pt-16 para compensar la altura del navbar fijo */}
        {/* Sidebar - Fijo en la izquierda */}
        <Sidebar />

        {/* Contenido principal - Ocupa el ancho restante */}
        <main className="flex-1 bg-gradient-to-b from-gray-950 to-gray-900 px-4 py-10 md:px-8 lg:px-16 lg:ml-10">
          {/* Encabezado de la sección */}
          <section className="mb-12 text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-blue-300 bg-clip-text text-transparent">
              Aprendizaje de Teoría de Colas
            </h1>

            <p className="text-xl text-gray-300 mb-8 leading-relaxed px-4">
              Explore los conceptos fundamentales y avanzados de la teoría de colas para comprender
              cómo analizar y optimizar los sistemas de espera en diversos entornos.
            </p>

            {/* Pestañas de navegación */}
            <div className="flex flex-wrap justify-center gap-4 mb-10">
              <button
                onClick={() => setActiveTab('overview')}
                className={`px-6 py-3 rounded-md font-medium transition-all duration-300 ${activeTab === 'overview'
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'bg-gray-800 text-gray-300 border border-gray-700 hover:bg-gray-700'
                  }`}
              >
                Visión General
              </button>
              <Link href="/learning/fundamentals" className="px-6 py-3 rounded-md font-medium bg-gray-800 text-gray-300 border border-gray-700 hover:bg-gray-700 transition-all duration-300">
                Fundamentos
              </Link>
              <Link href="/learning/advanced" className="px-6 py-3 rounded-md font-medium bg-gray-800 text-gray-300 border border-gray-700 hover:bg-gray-700 transition-all duration-300">
                Temas Avanzados
              </Link>
            </div>
          </section>

          {/* Sección de Visión General */}
          <section className="mb-16 max-w-6xl mx-auto">
            <div
              className="flex items-center justify-between cursor-pointer mb-6 bg-gray-800 px-4 py-3 rounded-lg shadow-sm hover:shadow transition-all duration-200"
              onClick={() => toggleSection('overview')}
            >
              <h2 className="text-2xl font-semibold text-gray-100">
                ¿Qué es la Teoría de Colas?
              </h2>
              <svg
                className={`w-6 h-6 text-gray-400 transition-transform duration-200 ${expandedSection === 'overview' ? 'transform rotate-180' : ''
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
                ${expandedSection === 'overview' ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'}
              `}
            >
              <div className="bg-gray-800 rounded-xl shadow-md overflow-hidden p-6 md:p-8">
                <div className="flex flex-col md:flex-row gap-8">
                  <div className="flex-1">
                    <p className="text-gray-300 mb-4">
                      La teoría de colas es una rama de las matemáticas que estudia las líneas de espera dentro de los sistemas.
                      Se utiliza para analizar diversos factores como los tiempos de espera, la capacidad del sistema, y la
                      eficiencia de servicio en situaciones donde existe una demanda de recursos limitados.
                    </p>
                    <p className="text-gray-300 mb-4">
                      Este campo de estudio se originó a principios del siglo XX con el trabajo del matemático danés
                      Agner Krarup Erlang, quien desarrolló los primeros modelos para analizar el tráfico telefónico.
                      Desde entonces, la teoría de colas se ha convertido en una herramienta fundamental para la optimización
                      de procesos en diversas industrias.
                    </p>
                    <p className="text-gray-300">
                      Los modelos de colas permiten predecir el comportamiento de sistemas con demanda variable, ayudando
                      a las organizaciones a tomar decisiones informadas sobre la asignación de recursos, la planificación
                      de capacidad y la mejora del servicio al cliente.
                    </p>
                  </div>
                  <div className="flex-1 flex justify-center items-center">
                    <div className="bg-gray-700 rounded-lg p-6 w-full max-w-md">
                      <h3 className="text-lg font-medium text-gray-100 mb-4 text-center">Componentes de un Sistema de Colas</h3>
                      <ul className="space-y-3">
                        <li className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-blue-900 flex items-center justify-center flex-shrink-0">
                            <svg className="w-4 h-4 text-blue-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                            </svg>
                          </div>
                          <span className="text-gray-300">Proceso de llegada de clientes</span>
                        </li>
                        <li className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-blue-900 flex items-center justify-center flex-shrink-0">
                            <svg className="w-4 h-4 text-blue-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                            </svg>
                          </div>
                          <span className="text-gray-300">Cola o línea de espera</span>
                        </li>
                        <li className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-blue-900 flex items-center justify-center flex-shrink-0">
                            <svg className="w-4 h-4 text-blue-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                            </svg>
                          </div>
                          <span className="text-gray-300">Disciplina de la cola</span>
                        </li>
                        <li className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-blue-900 flex items-center justify-center flex-shrink-0">
                            <svg className="w-4 h-4 text-blue-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                            </svg>
                          </div>
                          <span className="text-gray-300">Mecanismo de servicio</span>
                        </li>
                        <li className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-blue-900 flex items-center justify-center flex-shrink-0">
                            <svg className="w-4 h-4 text-blue-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                            </svg>
                          </div>
                          <span className="text-gray-300">Salida del sistema</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Sección de Notación Kendall */}
          <section className="mb-16 max-w-6xl mx-auto">
            <div
              className="flex items-center justify-between cursor-pointer mb-6 bg-gray-800 px-4 py-3 rounded-lg shadow-sm hover:shadow transition-all duration-200"
              onClick={() => toggleSection('kendall')}
            >
              <h2 className="text-2xl font-semibold text-gray-100">
                Notación de Kendall
              </h2>
              <svg
                className={`w-6 h-6 text-gray-400 transition-transform duration-200 ${expandedSection === 'kendall' ? 'transform rotate-180' : ''
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
                ${expandedSection === 'kendall' ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'}
              `}
            >
              <div className="bg-gray-800 rounded-xl shadow-md overflow-hidden">
                <div className="p-6 md:p-8">
                  <p className="text-gray-300 mb-6">
                    La notación de Kendall es un sistema estandarizado para describir y clasificar los modelos de colas.
                    Fue introducida por David G. Kendall en 1953 y ampliada posteriormente por otros investigadores.
                    La forma estándar actual es:
                  </p>

                  <div className="font-mono text-center bg-gray-700 py-4 px-6 rounded-lg border border-gray-600 mb-8 text-2xl shadow-sm text-blue-300">
                    A/B/c/K/N/D
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div className="bg-gray-700 p-5 rounded-lg border border-gray-600">
                      <h3 className="text-lg font-medium text-gray-100 mb-3">Distribuciones comunes (A y B)</h3>
                      <ul className="space-y-2 text-gray-300">
                        <li className="flex"><span className="font-medium w-8">M:</span> Markoviana (exponencial)</li>
                        <li className="flex"><span className="font-medium w-8">D:</span> Determinística</li>
                        <li className="flex"><span className="font-medium w-8">Ek:</span> Erlang-k</li>
                        <li className="flex"><span className="font-medium w-8">G:</span> General (cualquier distribución)</li>
                        <li className="flex"><span className="font-medium w-8">GI:</span> General independiente</li>
                      </ul>
                    </div>

                    <div>
                      <ul className="space-y-4 text-gray-300">
                        <li className="flex items-start">
                          <span className="font-medium w-8">A:</span>
                          <div>
                            <span>Distribución de llegadas</span>
                            <p className="text-sm text-gray-400 mt-1">Describe el patrón estadístico de las llegadas al sistema</p>
                          </div>
                        </li>
                        <li className="flex items-start">
                          <span className="font-medium w-8">B:</span>
                          <div>
                            <span>Distribución de servicio</span>
                            <p className="text-sm text-gray-400 mt-1">Describe la distribución estadística del tiempo de servicio</p>
                          </div>
                        </li>
                        <li className="flex items-start">
                          <span className="font-medium w-8">c:</span>
                          <div>
                            <span>Número de servidores</span>
                            <p className="text-sm text-gray-400 mt-1">Indica cuántos servidores están disponibles en paralelo</p>
                          </div>
                        </li>
                      </ul>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-gray-700 p-5 rounded-lg border border-gray-600 shadow-sm">
                      <h4 className="font-medium text-gray-100 mb-2">K: Capacidad del sistema</h4>
                      <p className="text-gray-400 text-sm">Número máximo de clientes que pueden estar en el sistema (en cola + en servicio). Si se omite, se asume infinito.</p>
                    </div>

                    <div className="bg-gray-700 p-5 rounded-lg border border-gray-600 shadow-sm">
                      <h4 className="font-medium text-gray-100 mb-2">N: Tamaño de la población</h4>
                      <p className="text-gray-400 text-sm">Tamaño total de la población de clientes potenciales. Si se omite, se asume infinito.</p>
                    </div>

                    <div className="bg-gray-700 p-5 rounded-lg border border-gray-600 shadow-sm">
                      <h4 className="font-medium text-gray-100 mb-2">D: Disciplina de la cola</h4>
                      <p className="text-gray-400 text-sm">Regla que determina qué cliente será servido a continuación. Si se omite, se asume FIFO (primero en entrar, primero en salir).</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Sección de Modelos Comunes */}
          <section className="mb-16 max-w-6xl mx-auto">
            <div
              className="flex items-center justify-between cursor-pointer mb-6 bg-gray-800 px-4 py-3 rounded-lg shadow-sm hover:shadow transition-all duration-200"
              onClick={() => toggleSection('models')}
            >
              <h2 className="text-2xl font-semibold text-gray-100">
                Modelos Comunes
              </h2>
              <svg
                className={`w-6 h-6 text-gray-400 transition-transform duration-200 ${expandedSection === 'models' ? 'transform rotate-180' : ''
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
                ${expandedSection === 'models' ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'}
              `}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-800 rounded-lg shadow-md overflow-hidden border border-gray-700">
                  <div className="bg-blue-900 p-4 border-b border-blue-800">
                    <h3 className="text-lg font-medium text-blue-100">M/M/1</h3>
                  </div>
                  <div className="p-5">
                    <p className="text-gray-300 mb-3">
                      El modelo más simple y fundamental. Cuenta con un servidor, llegadas según distribución Poisson y tiempos de servicio exponenciales.
                    </p>
                    <div className="bg-gray-700 p-3 rounded-md text-sm text-gray-300">
                      <strong>Aplicaciones:</strong> Ventanillas únicas, atención telefónica simple, pequeños comercios.
                    </div>
                    <Link href="/learning/fundamentals" className="mt-4 inline-block text-blue-400 hover:text-blue-300 font-medium">
                      Ver detalles →
                    </Link>
                  </div>
                </div>

                <div className="bg-gray-800 rounded-lg shadow-md overflow-hidden border border-gray-700">
                  <div className="bg-blue-900 p-4 border-b border-blue-800">
                    <h3 className="text-lg font-medium text-blue-100">M/M/c</h3>
                  </div>
                  <div className="p-5">
                    <p className="text-gray-300 mb-3">
                      Modelo con múltiples servidores en paralelo, todos atendiendo la misma cola con tasas de servicio idénticas.
                    </p>
                    <div className="bg-gray-700 p-3 rounded-md text-sm text-gray-300">
                      <strong>Aplicaciones:</strong> Centros de atención al cliente, cajas en supermercados, ventanillas bancarias.
                    </div>
                    <Link href="/learning/fundamentals" className="mt-4 inline-block text-blue-400 hover:text-blue-300 font-medium">
                      Ver detalles →
                    </Link>
                  </div>
                </div>

                <div className="bg-gray-800 rounded-lg shadow-md overflow-hidden border border-gray-700">
                  <div className="bg-blue-900 p-4 border-b border-blue-800">
                    <h3 className="text-lg font-medium text-blue-100">M/M/c/K</h3>
                  </div>
                  <div className="p-5">
                    <p className="text-gray-300 mb-3">
                      Extensión del modelo M/M/c con capacidad limitada (K), donde los clientes se rechazan si el sistema está lleno.
                    </p>
                    <div className="bg-gray-700 p-3 rounded-md text-sm text-gray-300">
                      <strong>Aplicaciones:</strong> Salas de espera con capacidad limitada, buffers en redes, centros de llamadas con espera limitada.
                    </div>
                    <Link href="/learning/advanced" className="mt-4 inline-block text-blue-400 hover:text-blue-300 font-medium">
                      Ver detalles →
                    </Link>
                  </div>
                </div>

                <div className="bg-gray-800 rounded-lg shadow-md overflow-hidden border border-gray-700">
                  <div className="bg-blue-900 p-4 border-b border-blue-800">
                    <h3 className="text-lg font-medium text-blue-100">M/G/1</h3>
                  </div>
                  <div className="p-5">
                    <p className="text-gray-300 mb-3">
                      Modelo con un servidor, llegadas según Poisson y tiempos de servicio con distribución general.
                    </p>
                    <div className="bg-gray-700 p-3 rounded-md text-sm text-gray-300">
                      <strong>Aplicaciones:</strong> Procesos con tiempos de servicio variables, como talleres de reparación o consultas médicas.
                    </div>
                    <Link href="/learning/advanced" className="mt-4 inline-block text-blue-400 hover:text-blue-300 font-medium">
                      Ver detalles →
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Sección de Ruta de Aprendizaje */}
          <section className="mb-16 max-w-6xl mx-auto">
            <div
              className="flex items-center justify-between cursor-pointer mb-6 bg-gray-800 px-4 py-3 rounded-lg shadow-sm hover:shadow transition-all duration-200"
              onClick={() => toggleSection('path')}
            >
              <h2 className="text-2xl font-semibold text-gray-100">
                Ruta de Aprendizaje
              </h2>
              <svg
                className={`w-6 h-6 text-gray-400 transition-transform duration-200 ${expandedSection === 'path' ? 'transform rotate-180' : ''}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </div>

            {/* Contenido de la sección */}
            <div
              className={`
      transition-all duration-300 ease-in-out
      ${expandedSection === 'path'
                  ? 'max-h-full opacity-100 visible'
                  : 'max-h-0 opacity-0 invisible overflow-hidden'}
    `}
            >
              <div className="bg-gray-800 rounded-xl shadow-md overflow-hidden">
                <div className="relative">
                  {/* Línea vertical para conectar los elementos */}
                  <div className="absolute left-8 top-0 bottom-0 w-1 bg-blue-900 z-0 ml-3 md:ml-6"></div>

                  <div className="p-6 md:p-8">
                    {/* Paso 1 */}
                    <div className="flex mb-8 relative z-10">
                      <div className="flex-shrink-0 w-16 h-16 md:w-16 md:h-16 rounded-full bg-blue-900 flex items-center justify-center mr-4 md:mr-8 border-4 border-gray-800">
                        <span className="text-blue-100 font-bold text-xl">1</span>
                      </div>
                      <div>
                        <h3 className="text-xl font-medium text-gray-100 mb-2">Fundamentos</h3>
                        <p className="text-gray-300 mb-3">
                          Comience con los conceptos básicos de la teoría de colas, incluyendo:
                        </p>
                        <ul className="list-disc pl-5 text-gray-300 space-y-1">
                          <li>Componentes de un sistema de colas</li>
                          <li>Notación de Kendall</li>
                          <li>Modelos básicos: M/M/1 y M/M/c</li>
                          <li>Parámetros clave: λ, μ, ρ</li>
                        </ul>
                        <Link href="/learning/fundamentals" className="mt-4 inline-flex items-center text-blue-400 hover:text-blue-300 font-medium">
                          Ir a Fundamentos
                          <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                          </svg>
                        </Link>
                      </div>
                    </div>

                    {/* Paso 2 */}
                    <div className="flex mb-8 relative z-10">
                      <div className="flex-shrink-0 w-16 h-16 md:w-16 md:h-16 rounded-full bg-blue-900 flex items-center justify-center mr-4 md:mr-8 border-4 border-gray-800">
                        <span className="text-blue-100 font-bold text-xl">2</span>
                      </div>
                      <div>
                        <h3 className="text-xl font-medium text-gray-100 mb-2">Temas Avanzados</h3>
                        <p className="text-gray-300 mb-3">
                          Profundice con modelos y técnicas más complejos:
                        </p>
                        <ul className="list-disc pl-5 text-gray-300 space-y-1">
                          <li>Modelos avanzados: M/G/1, M/M/c/K</li>
                          <li>Redes de colas</li>
                          <li>Optimización de sistemas</li>
                          <li>Simulación Monte Carlo</li>
                        </ul>
                        <Link href="/learning/advanced" className="mt-4 inline-flex items-center text-blue-400 hover:text-blue-300 font-medium">
                          Ir a Temas Avanzados
                          <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                          </svg>
                        </Link>
                      </div>
                    </div>

                    {/* Paso 3 */}
                    <div className="flex relative z-10">
                      <div className="flex-shrink-0 w-16 h-16 md:w-16 md:h-16 rounded-full bg-blue-900 flex items-center justify-center mr-4 md:mr-8 border-4 border-gray-800">
                        <span className="text-blue-100 font-bold text-xl">3</span>
                      </div>
                      <div>
                        <h3 className="text-xl font-medium text-gray-100 mb-2">Aplicación Práctica</h3>
                        <p className="text-gray-300 mb-3">
                          Ponga en práctica sus conocimientos:
                        </p>
                        <ul className="list-disc pl-5 text-gray-300 space-y-1">
                          <li>Simulador interactivo</li>
                          <li>Estudios de casos prácticos</li>
                          <li>Análisis de resultados</li>
                          <li>Optimización de sistemas reales</li>
                        </ul>
                        <Link href="/simulator" className="mt-4 inline-flex items-center text-blue-400 hover:text-blue-300 font-medium">
                          Ir al Simulador
                          <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                          </svg>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          {/* Sección de Recursos Adicionales */}

        </main>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}