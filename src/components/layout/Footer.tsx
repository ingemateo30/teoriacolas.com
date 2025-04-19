"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

/**
 * Componente Footer
 * 
 * Un footer elegante y responsivo que proporciona información
 * adicional y enlaces relevantes para la aplicación de Teoría de Colas.
 * Incluye soporte para modo oscuro.
 */
export default function Footer({ darkMode = true }) {
  // Estado para el efecto visual de scroll
  const [isVisible, setIsVisible] = useState(false);

  // Efecto para animación al cargar
  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Año actual para el copyright
  const currentYear = new Date().getFullYear();

  return (
    <footer className={`
      ${darkMode 
        ? 'bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 border-gray-700' 
        : 'bg-gradient-to-r from-gray-50 via-gray-100 to-gray-50 border-gray-200'} 
      border-t mt-auto transition-opacity duration-700
      ${isVisible ? 'opacity-100' : 'opacity-0'}
    `}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-8 md:flex md:items-center md:justify-between">
          {/* Sección izquierda - Logo e información */}
          <div className="mb-6 md:mb-0 flex flex-col items-center md:items-start">
            <div className="flex items-center">
              <span className="text-2xl font-bold bg-gradient-to-r from-primary-400 to-blue-400 bg-clip-text text-transparent">
                QueueSim
              </span>
              <div className={`ml-3 text-xs px-2 py-1 ${darkMode ? 'bg-primary-900 text-primary-300' : 'bg-primary-100 text-primary-800'} rounded-full`}>
                v1.0
              </div>
            </div>
            <p className={`mt-2 text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'} max-w-md text-center md:text-left`}>
              Una herramienta educativa para la simulación y aprendizaje de sistemas de teoría de colas
            </p>
          </div>

          {/* Sección central - Enlaces rápidos */}
          <div className="grid grid-cols-2 gap-8 md:gap-16">
            <div className="mt-4 md:mt-0">
              <h2 className={`text-sm font-semibold ${darkMode ? 'text-gray-200' : 'text-gray-700'} tracking-wider uppercase mb-3`}>
                Recursos
              </h2>
              <ul className="space-y-2">
                <li>
                  <Link href="/learning/fundamentals" className={`text-sm ${darkMode ? 'text-gray-300 hover:text-primary-400' : 'text-gray-600 hover:text-primary-600'} transition-colors duration-200`}>
                    Fundamentos
                  </Link>
                </li>
                <li>
                  <Link href="/models" className={`text-sm ${darkMode ? 'text-gray-300 hover:text-primary-400' : 'text-gray-600 hover:text-primary-600'} transition-colors duration-200`}>
                    Modelos
                  </Link>
                </li>
                <li>
                  <Link href="/simulator" className={`text-sm ${darkMode ? 'text-gray-300 hover:text-primary-400' : 'text-gray-600 hover:text-primary-600'} transition-colors duration-200`}>
                    Simulador
                  </Link>
                </li>
              </ul>
            </div>
            <div className="mt-4 md:mt-0">
              <h2 className={`text-sm font-semibold ${darkMode ? 'text-gray-200' : 'text-gray-700'} tracking-wider uppercase mb-3`}>
                Enlaces
              </h2>
              <ul className="space-y-2">
                <li>
                  <Link href="/about" className={`text-sm ${darkMode ? 'text-gray-300 hover:text-primary-400' : 'text-gray-600 hover:text-primary-600'} transition-colors duration-200`}>
                    Acerca de
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className={`text-sm ${darkMode ? 'text-gray-300 hover:text-primary-400' : 'text-gray-600 hover:text-primary-600'} transition-colors duration-200`}>
                    Contacto
                  </Link>
                </li>
                <li>
                  <Link href="/privacy" className={`text-sm ${darkMode ? 'text-gray-300 hover:text-primary-400' : 'text-gray-600 hover:text-primary-600'} transition-colors duration-200`}>
                    Privacidad
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Línea divisoria */}
        <div className={`border-t ${darkMode ? 'border-gray-700' : 'border-gray-200'} pt-4 pb-6`}>
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              © {currentYear} QueueSim | Simulador de Teoría de Colas
            </p>
            <div className="mt-2 md:mt-0 flex space-x-4">
            
            </div>
          </div>
        </div>
        
        {/* Decoración geométrica */}
        <div className="flex justify-center py-2">
          <div className="flex space-x-1">
            {[...Array(5)].map((_, i) => (
              <div 
                key={i} 
                className={`h-1 w-8 rounded-full ${darkMode ? 'bg-primary-' + (700 - i * 100) : 'bg-primary-' + (300 + i * 100)}`}
                style={{
                  opacity: darkMode ? 0.3 + i * 0.15 : 0.6 + i * 0.1,
                  transform: `scaleX(${0.7 + i * 0.1})`,
                  transition: 'all 0.3s ease'
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}