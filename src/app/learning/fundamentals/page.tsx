"use client";

import Link from 'next/link';
import { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Sidebar from '@/components/layout/Sidebar';
import Footer from '@/components/layout/Footer';

export default function FundamentalsPage() {
  // Estado para animación y efectos de UI
  const [expandedSection, setExpandedSection] = useState<string | null>('basic-concepts');

  // Cambiar la sección expandida
  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section);
  };
  const one = 1;

  return (
    <div className="flex flex-col min-h-screen bg-gray-900 text-gray-200">
      {/* Navbar - Fijo en la parte superior */}
      <Navbar />

      {/* Área de contenido principal con sidebar */}
      <div className="flex flex-1 pt-16"> {/* Añadido pt-16 para compensar la altura del navbar fijo */}
        {/* Sidebar - Fijo en la izquierda */}
        <Sidebar />

        {/* Contenido principal - Ocupa el ancho restante */}
        <main className="flex-1 bg-gradient-to-b from-gray-900 to-gray-950 px-4 py-10 md:px-8 lg:px-16 lg:ml-10 text-gray-300 min-h-screen">
          {/* Encabezado de la sección */}
          <section className="mb-12 text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
              Fundamentos de Teoría de Colas
            </h1>

            <p className="text-xl text-gray-400 mb-8 leading-relaxed px-4">
              Explore los conceptos esenciales que forman la base de la teoría de colas y
              aprenda a analizar sistemas de espera básicos.
            </p>

            {/* Pestañas de navegación */}
            <div className="flex flex-wrap justify-center gap-4 mb-10">
              <Link href="/learning" className="px-6 py-3 rounded-md font-medium bg-gray-800 text-gray-300 border border-gray-700 hover:bg-gray-700 hover:text-blue-300 transition-all duration-300">
                Visión General
              </Link>
              <button className="px-6 py-3 rounded-md font-medium bg-blue-600 text-white shadow-md hover:bg-blue-700 transition-all duration-300">
                Fundamentos
              </button>
              <Link href="/learning/advanced" className="px-6 py-3 rounded-md font-medium bg-gray-800 text-gray-300 border border-gray-700 hover:bg-gray-700 hover:text-blue-300 transition-all duration-300">
                Temas Avanzados
              </Link>
            </div>
          </section>

          {/* Introducción */}
          <section className="mb-16 max-w-6xl mx-auto">
            <div className="bg-gray-800 rounded-xl shadow-lg overflow-hidden p-6 md:p-8 mb-10 border border-gray-700">
              <div className="flex flex-col md:flex-row gap-8">
                <div className="flex-1">
                  <h2 className="text-2xl font-semibold text-gray-200 mb-4">
                    Introducción a los Fundamentos
                  </h2>
                  <p className="text-gray-300 mb-4">
                    Los fundamentos de la teoría de colas son esenciales para entender cómo funcionan los sistemas donde
                    los clientes llegan para recibir un servicio y, posiblemente, deben esperar en una cola. Esta teoría
                    matemática proporciona un marco para el análisis cuantitativo de estos sistemas.
                  </p>
                  <p className="text-gray-300">
                    En esta sección, exploraremos los conceptos básicos, los parámetros clave y los modelos fundamentales
                    que constituyen el núcleo de la teoría de colas. Estos conocimientos servirán como base para comprender
                    aplicaciones más complejas y avanzadas.
                  </p>
                </div>
                <div className="flex-1 flex justify-center items-center">
                  <div className="bg-gray-900 rounded-lg p-6 w-full border border-gray-700">
                    <h3 className="text-lg font-medium text-gray-200 mb-4 text-center">Aplicaciones Comunes</h3>
                    <ul className="space-y-3">
                      <li className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-blue-900 flex items-center justify-center flex-shrink-0">
                          <svg className="w-4 h-4 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                          </svg>
                        </div>
                        <span className="text-gray-300">Atención al cliente y call centers</span>
                      </li>
                      <li className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-blue-900 flex items-center justify-center flex-shrink-0">
                          <svg className="w-4 h-4 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                          </svg>
                        </div>
                        <span className="text-gray-300">Servicios de salud y hospitales</span>
                      </li>
                      <li className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-blue-900 flex items-center justify-center flex-shrink-0">
                          <svg className="w-4 h-4 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                          </svg>
                        </div>
                        <span className="text-gray-300">Tráfico y sistemas de transporte</span>
                      </li>
                      <li className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-blue-900 flex items-center justify-center flex-shrink-0">
                          <svg className="w-4 h-4 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                          </svg>
                        </div>
                        <span className="text-gray-300">Computación y redes</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Sección: Conceptos Básicos */}
          <section className="mb-16 max-w-6xl mx-auto">
            <div
              className="flex items-center justify-between cursor-pointer mb-6 bg-gray-800 px-4 py-3 rounded-lg shadow-md hover:bg-gray-750 border border-gray-700 transition-all duration-200"
              onClick={() => toggleSection('basic-concepts')}
            >
              <h2 className="text-2xl font-semibold text-gray-200">
                Conceptos Básicos
              </h2>
              <svg
                className={`w-6 h-6 text-gray-400 transition-transform duration-200 ${expandedSection === 'basic-concepts' ? 'transform rotate-180' : ''}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </div>

            <div
              className={`
          overflow-hidden transition-all duration-500 ease-in-out
          ${expandedSection === 'basic-concepts' ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'}
        `}
            >
              <div className="bg-gray-800 rounded-xl shadow-lg overflow-hidden border border-gray-700">
                <div className="p-6 md:p-8">
                  <h3 className="text-xl font-medium text-gray-200 mb-4">Componentes de un Sistema de Colas</h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    <div>
                      <div className="mb-6">
                        <h4 className="text-lg font-medium text-gray-300 mb-2">1. Proceso de Llegada</h4>
                        <p className="text-gray-400">
                          Describe cómo los clientes llegan al sistema. Se caracteriza por la distribución de los tiempos entre llegadas consecutivas.
                          La tasa media de llegadas, denotada como λ (lambda), representa el número promedio de llegadas por unidad de tiempo.
                        </p>
                      </div>

                      <div className="mb-6">
                        <h4 className="text-lg font-medium text-gray-300 mb-2">2. Cola o Línea de Espera</h4>
                        <p className="text-gray-400">
                          Donde los clientes esperan antes de ser atendidos. Puede tener una capacidad limitada o ilimitada.
                          La disciplina de la cola determina el orden en que los clientes son seleccionados para recibir el servicio.
                        </p>
                      </div>
                    </div>

                    <div>
                      <div className="mb-6">
                        <h4 className="text-lg font-medium text-gray-300 mb-2">3. Mecanismo de Servicio</h4>
                        <p className="text-gray-400">
                          Define cómo se presta el servicio a los clientes. Se caracteriza por el tiempo de servicio,
                          cuya distribución puede variar. La tasa media de servicio, denotada como μ (mu), representa el
                          número promedio de clientes que pueden ser atendidos por unidad de tiempo.
                        </p>
                      </div>

                      <div className="mb-6">
                        <h4 className="text-lg font-medium text-gray-300 mb-2">4. Número de Servidores</h4>
                        <p className="text-gray-400">
                          Cantidad de estaciones de servicio disponibles en paralelo. Cada sistema puede tener uno o
                          múltiples servidores (canales) operando simultáneamente.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-900 rounded-lg p-6 mb-8 border border-gray-700">
                    <h3 className="text-xl font-medium text-gray-200 mb-4">Disciplinas de Cola</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-medium text-gray-300 mb-2">Tipos Comunes:</h4>
                        <ul className="list-disc pl-5 text-gray-400 space-y-2">
                          <li><strong className="text-gray-200">FIFO (First In, First Out):</strong> El primero en llegar es el primero en ser atendido.</li>
                          <li><strong className="text-gray-200">LIFO (Last In, First Out):</strong> El último en llegar es el primero en ser atendido.</li>
                          <li><strong className="text-gray-200">SIRO (Service In Random Order):</strong> Servicio en orden aleatorio.</li>
                          <li><strong className="text-gray-200">PRI (Priority):</strong> Basado en prioridades asignadas.</li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-300 mb-2">Consideraciones:</h4>
                        <ul className="list-disc pl-5 text-gray-400 space-y-2">
                          <li>La disciplina más común en aplicaciones prácticas es FIFO.</li>
                          <li>Las disciplinas de prioridad pueden ser implementadas con o sin interrupción del servicio.</li>
                          <li>La elección de la disciplina afecta significativamente las medidas de rendimiento del sistema.</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="bg-blue-900/30 rounded-lg p-6 border border-blue-800">
                    <h3 className="text-xl font-medium text-blue-300 mb-3">Parámetros Clave</h3>
                    <div className="overflow-x-auto">
                      <table className="min-w-full border-collapse">
                        <thead>
                          <tr className="bg-blue-900/50">
                            <th className="px-4 py-3 text-left text-blue-200">Parámetro</th>
                            <th className="px-4 py-3 text-left text-blue-200">Símbolo</th>
                            <th className="px-4 py-3 text-left text-blue-200">Descripción</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-blue-800/50">
                          <tr>
                            <td className="px-4 py-3 font-medium text-gray-300">Tasa de llegadas</td>
                            <td className="px-4 py-3 text-gray-300">λ (lambda)</td>
                            <td className="px-4 py-3 text-gray-400">Número promedio de llegadas por unidad de tiempo</td>
                          </tr>
                          <tr>
                            <td className="px-4 py-3 font-medium text-gray-300">Tasa de servicio</td>
                            <td className="px-4 py-3 text-gray-300">μ (mu)</td>
                            <td className="px-4 py-3 text-gray-400">Número promedio de servicios completados por unidad de tiempo</td>
                          </tr>
                          <tr>
                            <td className="px-4 py-3 font-medium text-gray-300">Intensidad de tráfico</td>
                            <td className="px-4 py-3 text-gray-300">ρ (rho) = λ/μ</td>
                            <td className="px-4 py-3 text-gray-400">Fracción del tiempo que el servidor está ocupado</td>
                          </tr>
                          <tr>
                            <td className="px-4 py-3 font-medium text-gray-300">Número de servidores</td>
                            <td className="px-4 py-3 text-gray-300">c</td>
                            <td className="px-4 py-3 text-gray-400">Cantidad de estaciones de servicio paralelas</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Sección: Distribuciones Estadísticas */}
          <section className="mb-16 max-w-6xl mx-auto">
            <div
              className="flex items-center justify-between cursor-pointer mb-6 bg-gray-800 px-4 py-3 rounded-lg shadow-md hover:bg-gray-750 border border-gray-700 transition-all duration-200"
              onClick={() => toggleSection('distributions')}
            >
              <h2 className="text-2xl font-semibold text-gray-200">
                Distribuciones Estadísticas
              </h2>
              <svg
                className={`w-6 h-6 text-gray-400 transition-transform duration-200 ${expandedSection === 'distributions' ? 'transform rotate-180' : ''}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </div>

            <div
              className={`
          overflow-hidden transition-all duration-500 ease-in-out
          ${expandedSection === 'distributions' ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'}
        `}
            >
              <div className="bg-gray-800 rounded-xl shadow-lg overflow-hidden border border-gray-700">
                <div className="p-6 md:p-8">
                  <p className="text-gray-400 mb-6">
                    Las distribuciones estadísticas son fundamentales en la teoría de colas para modelar los tiempos
                    entre llegadas y los tiempos de servicio. Aquí presentamos las distribuciones más relevantes para
                    el análisis de sistemas de colas.
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    {/* Distribución Exponencial */}
                    <div className="bg-gray-800 rounded-lg border border-gray-700 shadow-md overflow-hidden">
                      <div className="bg-blue-900/40 px-4 py-3 border-b border-blue-800/50">
                        <h3 className="text-lg font-medium text-blue-300">Distribución Exponencial</h3>
                      </div>
                      <div className="p-5">
                        <p className="text-gray-400 mb-3">
                          La distribución más utilizada para modelar tiempos entre llegadas y tiempos de servicio
                          en sistemas de colas básicos. Se caracteriza por la propiedad de "falta de memoria".
                        </p>
                        <div className="bg-gray-900 p-3 rounded-md border border-gray-700">
                          <h4 className="text-sm font-medium text-gray-300 mb-2">Función de densidad:</h4>
                          <p className="font-mono text-sm text-blue-300">f(x) = λe^(-λx) para x ≥ 0</p>
                          <h4 className="text-sm font-medium text-gray-300 mt-3 mb-2">Media:</h4>
                          <p className="font-mono text-sm text-blue-300">E[X] = 1/λ</p>
                        </div>
                      </div>
                    </div>

                    {/* Distribución de Poisson */}
                    <div className="bg-gray-800 rounded-lg border border-gray-700 shadow-md overflow-hidden">
                      <div className="bg-green-900/40 px-4 py-3 border-b border-green-800/50">
                        <h3 className="text-lg font-medium text-green-300">Distribución de Poisson</h3>
                      </div>
                      <div className="p-5">
                        <p className="text-gray-400 mb-3">
                          Utilizada para modelar el número de eventos (llegadas) que ocurren en un intervalo fijo de tiempo.
                          Es fundamental para el proceso de llegadas en muchos modelos de colas.
                        </p>
                        <div className="bg-gray-900 p-3 rounded-md border border-gray-700">
                          <h4 className="text-sm font-medium text-gray-300 mb-2">Función de masa de probabilidad:</h4>
                          <p className="font-mono text-sm text-green-300">P(X = k) = (λ^k * e^(-λ)) / k! para k = 0,1,2,...</p>
                          <h4 className="text-sm font-medium text-gray-300 mt-3 mb-2">Media y Varianza:</h4>
                          <p className="font-mono text-sm text-green-300">E[X] = Var[X] = λ</p>
                        </div>
                      </div>
                    </div>

                    {/* Distribución Erlang */}
                    <div className="bg-gray-800 rounded-lg border border-gray-700 shadow-md overflow-hidden">
                      <div className="bg-purple-900/40 px-4 py-3 border-b border-purple-800/50">
                        <h3 className="text-lg font-medium text-purple-300">Distribución Erlang</h3>
                      </div>
                      <div className="p-5">
                        <p className="text-gray-400 mb-3">
                          Utilizada para modelar la suma de variables aleatorias exponenciales independientes.
                          Es útil para tiempos de servicio que consisten en múltiples fases.
                        </p>
                        <div className="bg-gray-900 p-3 rounded-md border border-gray-700">
                          <h4 className="text-sm font-medium text-gray-300 mb-2">Función de densidad:</h4>
                          <p className="font-mono text-sm text-purple-300">f(x) = (λ^k * x^(k-1) * e^(-λx)) / (k-1)! para x ≥ 0</p>
                          <h4 className="text-sm font-medium text-gray-300 mt-3 mb-2">Media:</h4>
                          <p className="font-mono text-sm text-purple-300">E[X] = k/λ</p>
                        </div>
                      </div>
                    </div>

                    {/* Distribución Determinística */}
                    <div className="bg-gray-800 rounded-lg border border-gray-700 shadow-md overflow-hidden">
                      <div className="bg-amber-900/40 px-4 py-3 border-b border-amber-800/50">
                        <h3 className="text-lg font-medium text-amber-300">Distribución Determinística</h3>
                      </div>
                      <div className="p-5">
                        <p className="text-gray-400 mb-3">
                          Representa tiempos constantes, sin variabilidad. Útil para modelar servicios automatizados o
                          altamente estandarizados donde los tiempos son prácticamente invariables.
                        </p>
                        <div className="bg-gray-900 p-3 rounded-md border border-gray-700">
                          <h4 className="text-sm font-medium text-gray-300 mb-2">Características:</h4>
                          <ul className="list-disc pl-5 text-sm text-gray-400">
                            <li>Todos los valores son iguales a una constante</li>
                            <li>Varianza igual a cero</li>
                            <li>Notación: D</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-blue-900/20 p-5 rounded-lg border border-blue-800/40">
                    <h3 className="text-lg font-medium text-blue-300 mb-3">Importancia en la Teoría de Colas</h3>
                    <ul className="list-disc pl-5 text-gray-400 space-y-2">
                      <li>La distribución de los tiempos entre llegadas y de servicio determina el tipo de modelo matemático a utilizar.</li>
                      <li>El proceso de Poisson (llegadas exponenciales) permite el desarrollo de modelos analíticos tratables.</li>
                      <li>La propiedad de "falta de memoria" de la distribución exponencial simplifica significativamente el análisis matemático.</li>
                      <li>Distribuciones no exponenciales generalmente requieren métodos numéricos o de simulación para su análisis.</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </section>


          {/* Sección: Modelos Básicos */}
          <section className="mb-16 max-w-6xl mx-auto">
            <div
              className="flex items-center justify-between cursor-pointer mb-6 bg-gray-800 px-4 py-3 rounded-lg shadow-md hover:shadow-lg transition-all duration-200"
              onClick={() => toggleSection('basic-models')}
            >
              <h2 className="text-2xl font-semibold text-gray-200">
                Modelos Básicos
              </h2>
              <svg
                className={`w-6 h-6 text-gray-300 transition-transform duration-200 ${expandedSection === 'basic-models' ? 'transform rotate-180' : ''}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </div>

            <div
              className={`
      overflow-hidden transition-all duration-500 ease-in-out
      ${expandedSection === 'basic-models' ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'}
    `}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                {/* Modelo M/M/1 */}
                <div className="bg-gray-800 rounded-lg shadow-lg overflow-hidden border border-gray-700">
                  <div className="bg-gray-700 p-4 border-b border-gray-600">
                    <h3 className="text-lg font-medium text-blue-400">Modelo M/M/1</h3>
                    <p className="text-sm text-gray-300 mt-1">Un servidor, llegadas Poisson, tiempos de servicio exponenciales</p>
                  </div>
                  <div className="p-5">
                    <p className="text-gray-300 mb-4">
                      Este es el modelo más simple y fundamental de la teoría de colas. Representa un sistema con un solo servidor,
                      donde tanto las llegadas como los servicios siguen distribuciones exponenciales.
                    </p>

                    <h4 className="font-medium text-gray-200 mb-2">Condición de Estabilidad:</h4>
                    <p className="mb-3">
                      <span className="font-mono bg-gray-700 px-2 py-1 rounded text-blue-300">ρ = λ/μ {'<'} 1</span>
                    </p>

                    <h4 className="font-medium text-gray-200 mb-2">Fórmulas principales:</h4>
                    <div className="bg-gray-700 p-4 rounded-lg space-y-3 mb-4">
                      <div>
                        <p className="text-sm text-gray-300">Número promedio de clientes en el sistema:</p>
                        <p className="font-mono mt-1 text-blue-300">L = ρ/(1-ρ)</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-300">Número promedio de clientes en la cola:</p>
                        <p className="font-mono mt-1 text-blue-300">Lq = ρ²/(1-ρ)</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-300">Tiempo promedio en el sistema:</p>
                        <p className="font-mono mt-1 text-blue-300">W = 1/(μ-λ)</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-300">Tiempo promedio en la cola:</p>
                        <p className="font-mono mt-1 text-blue-300">Wq = ρ/(μ-λ)</p>
                      </div>
                    </div>

                    <div className="bg-gray-900 p-3 rounded-md border border-gray-700">
                      <h4 className="font-medium text-blue-300 mb-1">Aplicaciones típicas:</h4>
                      <ul className="list-disc pl-5 text-gray-300 text-sm">
                        <li>Ventanillas únicas de atención</li>
                        <li>Servicios técnicos con un solo técnico</li>
                        <li>Sistemas de procesamiento de transacciones simples</li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Modelo M/M/c */}
                <div className="bg-gray-800 rounded-lg shadow-lg overflow-hidden border border-gray-700">
                  <div className="bg-gray-700 p-4 border-b border-gray-600">
                    <h3 className="text-lg font-medium text-blue-400">Modelo M/M/c</h3>
                    <p className="text-sm text-gray-300 mt-1">Múltiples servidores, llegadas Poisson, tiempos de servicio exponenciales</p>
                  </div>
                  <div className="p-5">
                    <p className="text-gray-300 mb-4">
                      Extensión del modelo M/M/1 con múltiples servidores idénticos en paralelo. Todos los servidores
                      toman clientes de una única cola y tienen la misma tasa de servicio μ.
                    </p>

                    <h4 className="font-medium text-gray-200 mb-2">Condición de Estabilidad:</h4>
                    <p className="mb-3">
                      <span className="font-mono bg-gray-700 px-2 py-1 rounded text-blue-300">ρ = λ/(c·μ) {'<'} 1 </span>
                    </p>

                    <h4 className="font-medium text-gray-200 mb-2">Fórmulas principales:</h4>
                    <div className="bg-gray-700 p-4 rounded-lg space-y-3 mb-4">
                      <div>
                        <p className="text-sm text-gray-300">Probabilidad de que el sistema esté vacío:</p>
                        <p className="font-mono mt-1 text-blue-300">P₀ = 1/[∑(k=0 to c-1)((λ/μ)^k/k!) + ((λ/μ)^c/c!)·(c·μ/(c·μ-λ))]</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-300">Número promedio de clientes en la cola:</p>
                        <p className="font-mono mt-1 text-blue-300">Lq = (P₀(λ/μ)^c·ρ)/(c!·(1-ρ)²)</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-300">Número promedio de clientes en el sistema:</p>
                        <p className="font-mono mt-1 text-blue-300">L = Lq + λ/μ</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-300">Tiempo promedio en la cola:</p>
                        <p className="font-mono mt-1 text-blue-300">Wq = Lq/λ</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-300">Tiempo promedio en el sistema:</p>
                        <p className="font-mono mt-1 text-blue-300">W = Wq + 1/μ</p>
                      </div>
                    </div>

                    <div className="bg-gray-900 p-3 rounded-md border border-gray-700">
                      <h4 className="font-medium text-blue-300 mb-1">Aplicaciones típicas:</h4>
                      <ul className="list-disc pl-5 text-gray-300 text-sm">
                        <li>Call centers y centros de atención telefónica</li>
                        <li>Ventanillas múltiples de bancos o servicios públicos</li>
                        <li>Cajas de supermercados</li>
                        <li>Estaciones de servicio con múltiples surtidores</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                {/* Modelo M/M/1/K */}
                <div className="bg-gray-800 rounded-lg shadow-lg overflow-hidden border border-gray-700">
                  <div className="bg-gray-700 p-4 border-b border-gray-600">
                    <h3 className="text-lg font-medium text-blue-400">Modelo M/M/1/K</h3>
                    <p className="text-sm text-gray-300 mt-1">Un servidor, capacidad limitada K</p>
                  </div>
                  <div className="p-5">
                    <p className="text-gray-300 mb-4">
                      Variación del modelo M/M/1 donde el sistema tiene una capacidad máxima de K clientes (incluyendo el que está en servicio).
                      Los clientes que llegan cuando el sistema está lleno se rechazan.
                    </p>

                    <h4 className="font-medium text-gray-200 mb-2">Características clave:</h4>
                    <ul className="list-disc pl-5 text-gray-300 mb-4">
                      <li>No requiere condición de estabilidad (ρ puede ser mayor que 1)</li>
                      <li>Tasa de llegadas efectiva: λₑ = λ(1-P_K) donde P_K es la probabilidad de que el sistema esté lleno</li>
                    </ul>

                    <h4 className="font-medium text-gray-200 mb-2">Fórmulas principales:</h4>
                    <div className="bg-gray-700 p-4 rounded-lg space-y-3 mb-4">
                      <div>
                        <p className="text-sm text-gray-300">Probabilidad de que haya n clientes:</p>
                        <p className="font-mono mt-1 text-blue-300">P_n = (ρ^n(1-ρ))/(1-ρ^(K+1)) para ρ≠1</p>
                        <p className="font-mono mt-1 text-blue-300">P_n = 1/(K+1) para ρ=1</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-300">Número promedio de clientes en el sistema:</p>
                        <p className="font-mono mt-1 text-blue-300">L = ρ/(1-ρ) - (K+1)ρ^(K+1)/(1-ρ^(K+1)) para ρ≠1</p>
                        <p className="font-mono mt-1 text-blue-300">L = K/2 para ρ=1</p>
                      </div>
                    </div>

                    <div className="bg-gray-900 p-3 rounded-md border border-gray-700">
                      <h4 className="font-medium text-blue-300 mb-1">Aplicaciones típicas:</h4>
                      <ul className="list-disc pl-5 text-gray-300 text-sm">
                        <li>Sistemas con espacio físico limitado</li>
                        <li>Buffers o memoria en sistemas computacionales</li>
                        <li>Líneas telefónicas con capacidad máxima</li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Modelo M/G/1 */}
                <div className="bg-gray-800 rounded-lg shadow-lg overflow-hidden border border-gray-700">
                  <div className="bg-gray-700 p-4 border-b border-gray-600">
                    <h3 className="text-lg font-medium text-blue-400">Modelo M/G/1</h3>
                    <p className="text-sm text-gray-300 mt-1">Un servidor, llegadas Poisson, tiempo de servicio con distribución general</p>
                  </div>
                  <div className="p-5">
                    <p className="text-gray-300 mb-4">
                      Modelo que generaliza el tiempo de servicio a cualquier distribución. Es útil cuando los tiempos de servicio
                      no siguen una distribución exponencial, lo que es común en muchas aplicaciones prácticas.
                    </p>

                    <h4 className="font-medium text-gray-200 mb-2">Condición de Estabilidad:</h4>
                    <p className="mb-3">
                      <span className="font-mono bg-gray-700 px-2 py-1 rounded text-blue-300">ρ = λE[S] {'<'} 1</span> donde E[S] es el tiempo medio de servicio
                    </p>

                    <h4 className="font-medium text-gray-200 mb-2">Fórmulas de Pollaczek-Khinchin:</h4>
                    <div className="bg-gray-700 p-4 rounded-lg space-y-3 mb-4">
                      <div>
                        <p className="text-sm text-gray-300">Número promedio de clientes en la cola:</p>
                        <p className="font-mono mt-1 text-blue-300">Lq = (λ²E[S²])/(2(1-ρ))</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-300">Tiempo promedio en la cola:</p>
                        <p className="font-mono mt-1 text-blue-300">Wq = Lq/λ = (λE[S²])/(2(1-ρ))</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-300">Tiempo promedio en el sistema:</p>
                        <p className="font-mono mt-1 text-blue-300">W = Wq + E[S]</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-300">Número promedio de clientes en el sistema:</p>
                        <p className="font-mono mt-1 text-blue-300">L = λW</p>
                      </div>
                    </div>

                    <div className="bg-gray-900 p-3 rounded-md border border-gray-700">
                      <h4 className="font-medium text-blue-300 mb-1">Aplicaciones típicas:</h4>
                      <ul className="list-disc pl-5 text-gray-300 text-sm">
                        <li>Servicios con alta variabilidad en el tiempo de atención</li>
                        <li>Procesos de manufactura con tiempos variables</li>
                        <li>Sistemas donde el tiempo de servicio depende del tipo de cliente</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gray-800 rounded-lg shadow-lg p-6 mb-8 border border-gray-700">
                <h3 className="text-xl font-medium text-blue-400 mb-4">Notación de Kendall</h3>
                <p className="text-gray-300 mb-4">
                  La notación de Kendall es una forma estandarizada de describir y clasificar los sistemas de colas.
                  La forma básica es A/B/c/K/N/D donde:
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div className="bg-gray-700 p-4 rounded-lg">
                    <h4 className="font-medium text-blue-300 mb-2">Componentes principales:</h4>
                    <ul className="space-y-2 text-gray-300">
                      <li><strong className="text-blue-300">A:</strong> Distribución de los tiempos entre llegadas</li>
                      <li><strong className="text-blue-300">B:</strong> Distribución de los tiempos de servicio</li>
                      <li><strong className="text-blue-300">c:</strong> Número de servidores</li>
                      <li><strong className="text-blue-300">K:</strong> Capacidad del sistema (opcional)</li>
                      <li><strong className="text-blue-300">N:</strong> Tamaño de la población fuente (opcional)</li>
                      <li><strong className="text-blue-300">D:</strong> Disciplina de la cola (opcional, FIFO por defecto)</li>
                    </ul>
                  </div>

                  <div className="bg-gray-700 p-4 rounded-lg">
                    <h4 className="font-medium text-blue-300 mb-2">Símbolos comunes para A y B:</h4>
                    <ul className="space-y-2 text-gray-300">
                      <li><strong className="text-blue-300">M:</strong> Distribución exponencial (Markoviana)</li>
                      <li><strong className="text-blue-300">D:</strong> Distribución determinística (constante)</li>
                      <li><strong className="text-blue-300">Ek:</strong> Distribución Erlang-k</li>
                      <li><strong className="text-blue-300">G:</strong> Distribución general (cualquiera)</li>
                      <li><strong className="text-blue-300">GI:</strong> Distribución general independiente</li>
                      <li><strong className="text-blue-300">H:</strong> Distribución hiperexponencial</li>
                    </ul>
                  </div>
                </div>

                <div className="bg-gray-900 p-4 rounded-lg border border-gray-700">
                  <h4 className="font-medium text-blue-400 mb-2">Ejemplos de notación:</h4>
                  <ul className="list-disc pl-5 text-gray-300 space-y-2">
                    <li><strong className="text-blue-300">M/M/1:</strong> Llegadas y servicios exponenciales, un servidor, capacidad infinita, población infinita, FIFO</li>
                    <li><strong className="text-blue-300">M/G/1:</strong> Llegadas exponenciales, servicios con distribución general, un servidor, capacidad infinita, población infinita, FIFO</li>
                    <li><strong className="text-blue-300">M/M/c:</strong> Llegadas y servicios exponenciales, c servidores, capacidad infinita, población infinita, FIFO</li>
                    <li><strong className="text-blue-300">M/D/1:</strong> Llegadas exponenciales, tiempo de servicio determinístico, un servidor, capacidad infinita, población infinita, FIFO</li>
                    <li><strong className="text-blue-300">M/M/1/K:</strong> Llegadas y servicios exponenciales, un servidor, capacidad K, población infinita, FIFO</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>


          {/* Sección: Métricas de Rendimiento */}
          <section className="mb-16 max-w-6xl mx-auto">
            <div
              className="flex items-center justify-between cursor-pointer mb-6 bg-gray-800 px-4 py-3 rounded-lg shadow-md hover:bg-gray-750 border border-gray-700 transition-all duration-200"
              onClick={() => toggleSection('performance-metrics')}
            >
              <h2 className="text-2xl font-semibold text-gray-200">
                Métricas de Rendimiento
              </h2>
              <svg
                className={`w-6 h-6 text-gray-400 transition-transform duration-200 ${expandedSection === 'performance-metrics' ? 'transform rotate-180' : ''}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </div>

            <div
              className={`
      overflow-hidden transition-all duration-500 ease-in-out
      ${expandedSection === 'performance-metrics' ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'}
    `}
            >
              <div className="bg-gray-800 rounded-xl shadow-lg overflow-hidden border border-gray-700">
                <div className="p-6 md:p-8">
                  <p className="text-gray-400 mb-6">
                    Las métricas de rendimiento son medidas cuantitativas que permiten evaluar el comportamiento y
                    la eficiencia de un sistema de colas. Estas métricas son clave para la toma de decisiones en
                    el diseño y la gestión de sistemas de servicio.
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    <div className="bg-gray-800 rounded-lg p-5 border border-gray-700">
                      <h3 className="text-xl font-medium text-blue-300 mb-4">Métricas Relacionadas con el Tiempo</h3>
                      <ul className="space-y-4">
                        <li className="bg-gray-900 p-3 rounded shadow-sm border border-gray-700">
                          <h4 className="font-medium text-gray-300 mb-1">Tiempo Medio de Espera en Cola (Wq)</h4>
                          <p className="text-gray-400 text-sm">Tiempo promedio que un cliente pasa esperando en la cola antes de ser atendido.</p>
                        </li>
                        <li className="bg-gray-900 p-3 rounded shadow-sm border border-gray-700">
                          <h4 className="font-medium text-gray-300 mb-1">Tiempo Medio en el Sistema (W)</h4>
                          <p className="text-gray-400 text-sm">Tiempo total promedio que un cliente pasa en el sistema, desde la llegada hasta la salida.</p>
                        </li>
                        <li className="bg-gray-900 p-3 rounded shadow-sm border border-gray-700">
                          <h4 className="font-medium text-gray-300 mb-1">Varianza del Tiempo de Espera</h4>
                          <p className="text-gray-400 text-sm">Medida de la dispersión de los tiempos de espera individuales respecto al promedio.</p>
                        </li>
                        <li className="bg-gray-900 p-3 rounded shadow-sm border border-gray-700">
                          <h4 className="font-medium text-gray-300 mb-1">Percentiles del Tiempo de Espera</h4>
                          <p className="text-gray-400 text-sm">Valores que indican el tiempo de espera por debajo del cual se encuentra un cierto porcentaje de los clientes.</p>
                        </li>
                      </ul>
                    </div>

                    <div className="bg-gray-800 rounded-lg p-5 border border-gray-700">
                      <h3 className="text-xl font-medium text-blue-300 mb-4">Métricas Relacionadas con la Longitud</h3>
                      <ul className="space-y-4">
                        <li className="bg-gray-900 p-3 rounded shadow-sm border border-gray-700">
                          <h4 className="font-medium text-gray-300 mb-1">Longitud Media de la Cola (Lq)</h4>
                          <p className="text-gray-400 text-sm">Número promedio de clientes en la cola esperando ser atendidos.</p>
                        </li>
                        <li className="bg-gray-900 p-3 rounded shadow-sm border border-gray-700">
                          <h4 className="font-medium text-gray-300 mb-1">Número Medio de Clientes en el Sistema (L)</h4>
                          <p className="text-gray-400 text-sm">Número total promedio de clientes presentes en el sistema, incluyendo los que están siendo atendidos.</p>
                        </li>
                        <li className="bg-gray-900 p-3 rounded shadow-sm border border-gray-700">
                          <h4 className="font-medium text-gray-300 mb-1">Distribución de la Longitud de la Cola</h4>
                          <p className="text-gray-400 text-sm">Probabilidad de que haya n clientes en la cola en un momento dado.</p>
                        </li>
                        <li className="bg-gray-900 p-3 rounded shadow-sm border border-gray-700">
                          <h4 className="font-medium text-gray-300 mb-1">Longitud Máxima de la Cola</h4>
                          <p className="text-gray-400 text-sm">Valor máximo que alcanza la longitud de la cola en un período determinado.</p>
                        </li>
                      </ul>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    <div className="bg-gray-800 rounded-lg p-5 border border-gray-700">
                      <h3 className="text-xl font-medium text-blue-300 mb-4">Métricas de Utilización</h3>
                      <ul className="space-y-4">
                        <li className="bg-gray-900 p-3 rounded shadow-sm border border-gray-700">
                          <h4 className="font-medium text-gray-300 mb-1">Factor de Utilización (ρ)</h4>
                          <p className="text-gray-400 text-sm">Fracción del tiempo que los servidores están ocupados. Para un servidor: ρ = λ/μ; para c servidores: ρ = λ/(c·μ).</p>
                        </li>
                        <li className="bg-gray-900 p-3 rounded shadow-sm border border-gray-700">
                          <h4 className="font-medium text-gray-300 mb-1">Probabilidad de Servidor Ocupado</h4>
                          <p className="text-gray-400 text-sm">Probabilidad de que un servidor específico esté atendiendo a un cliente en un momento dado.</p>
                        </li>
                        <li className="bg-gray-900 p-3 rounded shadow-sm border border-gray-700">
                          <h4 className="font-medium text-gray-300 mb-1">Probabilidad de Sistema Vacío (P₀)</h4>
                          <p className="text-gray-400 text-sm">Probabilidad de que no haya ningún cliente en el sistema.</p>
                        </li>
                      </ul>
                    </div>

                    <div className="bg-gray-800 rounded-lg p-5 border border-gray-700">
                      <h3 className="text-xl font-medium text-blue-300 mb-4">Métricas de Calidad de Servicio</h3>
                      <ul className="space-y-4">
                        <li className="bg-gray-900 p-3 rounded shadow-sm border border-gray-700">
                          <h4 className="font-medium text-gray-300 mb-1">Tasa de Abandono</h4>
                          <p className="text-gray-400 text-sm">Proporción de clientes que abandonan el sistema sin ser atendidos debido a largas esperas.</p>
                        </li>
                        <li className="bg-gray-900 p-3 rounded shadow-sm border border-gray-700">
                          <h4 className="font-medium text-gray-300 mb-1">Probabilidad de Espera {'>'} t</h4>
                          <p className="text-gray-400 text-sm">Probabilidad de que un cliente tenga que esperar más de un tiempo t específico.</p>
                        </li>
                        <li className="bg-gray-900 p-3 rounded shadow-sm border border-gray-700">
                          <h4 className="font-medium text-gray-300 mb-1">Tasa de Rechazo</h4>
                          <p className="text-gray-400 text-sm">En sistemas con capacidad limitada, proporción de clientes que no pueden ingresar al sistema por estar lleno.</p>
                        </li>
                        <li className="bg-gray-900 p-3 rounded shadow-sm border border-gray-700">
                          <h4 className="font-medium text-gray-300 mb-1">Nivel de Servicio</h4>
                          <p className="text-gray-400 text-sm">Porcentaje de clientes atendidos dentro de un tiempo objetivo establecido.</p>
                        </li>
                      </ul>
                    </div>
                  </div>

                  <div className="bg-blue-900/20 p-5 rounded-lg border border-blue-800/40">
                    <h3 className="text-lg font-medium text-blue-300 mb-3">Relaciones Fundamentales</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h4 className="font-medium text-gray-300 mb-2">Fórmula de Little</h4>
                        <p className="text-gray-400 mb-2">Relaciona el número de clientes en el sistema con el tiempo promedio en el sistema:</p>
                        <div className="bg-gray-900 p-3 rounded font-mono border border-gray-700">
                          <p className="text-blue-300">L = λ · W</p>
                          <p className="text-blue-300">Lq = λ · Wq</p>
                        </div>
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-300 mb-2">Relación entre W y Wq</h4>
                        <p className="text-gray-400 mb-2">El tiempo en el sistema es la suma del tiempo en la cola más el tiempo de servicio:</p>
                        <div className="bg-gray-900 p-3 rounded font-mono border border-gray-700">
                          <p className="text-blue-300">W = Wq + E[S]</p>
                          <p className="text-blue-300">Donde E[S] = 1/μ para servicios exponenciales</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Sección: Aplicaciones Prácticas */}
          <section className="mb-16 max-w-6xl mx-auto">
            <div
              className="flex items-center justify-between cursor-pointer mb-6 bg-white px-4 py-3 rounded-lg shadow-sm hover:shadow transition-all duration-200"
              onClick={() => toggleSection('practical-applications')}
            >
              <h2 className="text-2xl font-semibold text-gray-800">
                Aplicaciones Prácticas
              </h2>
              <svg
                className={`w-6 h-6 text-gray-600 transition-transform duration-200 ${expandedSection === 'practical-applications' ? 'transform rotate-180' : ''}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </div>

            <div
              className={`
                overflow-hidden transition-all duration-500 ease-in-out
                ${expandedSection === 'practical-applications' ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'}
              `}
            >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                {/* Servicio al Cliente */}
                <div className="bg-white rounded-lg shadow-md overflow-hidden">
                  <div className="h-40 bg-gradient-to-r from-blue-500 to-primary-600 flex items-center justify-center">
                    <svg className="w-20 h-20 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                  <div className="p-5">
                    <h3 className="text-lg font-medium text-gray-900 mb-2">Servicio al Cliente</h3>
                    <p className="text-gray-700 mb-4">
                      Los call centers y centros de atención al cliente utilizan teoría de colas para optimizar la asignación
                      de personal y mejorar los niveles de servicio.
                    </p>
                    <ul className="list-disc pl-5 text-gray-700 space-y-1">
                      <li>Dimensionamiento de personal por franja horaria</li>
                      <li>Establecimiento de SLAs (Acuerdos de Nivel de Servicio)</li>
                      <li>Estrategias de priorización de clientes</li>
                      <li>Diseño de IVR y sistemas de enrutamiento</li>
                    </ul>
                  </div>
                </div>

                {/* Servicios de Salud */}
                <div className="bg-white rounded-lg shadow-md overflow-hidden">
                  <div className="h-40 bg-gradient-to-r from-green-500 to-teal-600 flex items-center justify-center">
                    <svg className="w-20 h-20 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                    </svg>
                  </div>
                  <div className="p-5">
                    <h3 className="text-lg font-medium text-gray-900 mb-2">Servicios de Salud</h3>
                    <p className="text-gray-700 mb-4">
                      Hospitales y clínicas aplican teoría de colas para gestionar citas, planificar recursos y optimizar
                      la atención a pacientes, especialmente en urgencias.
                    </p>
                    <ul className="list-disc pl-5 text-gray-700 space-y-1">
                      <li>Triaje y gestión de urgencias</li>
                      <li>Programación de citas y cirugías</li>
                      <li>Asignación de camas y recursos</li>
                      <li>Planificación de personal médico</li>
                    </ul>
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
};

