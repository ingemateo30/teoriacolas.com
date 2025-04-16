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

          {/* Sección derecha - Redes sociales */}
          <div className="mt-8 md:mt-0">
            <h2 className={`text-sm font-semibold ${darkMode ? 'text-gray-200' : 'text-gray-700'} tracking-wider uppercase mb-3 text-center md:text-right`}>
              Síguenos
            </h2>
            <div className="flex justify-center md:justify-end space-x-4">
              <a href="#" className={`${darkMode ? 'text-gray-400 hover:text-primary-400' : 'text-gray-400 hover:text-primary-600'} transition-colors duration-200`} aria-label="Twitter">
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </a>
              <a href="#" className={`${darkMode ? 'text-gray-400 hover:text-primary-400' : 'text-gray-400 hover:text-primary-600'} transition-colors duration-200`} aria-label="GitHub">
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                </svg>
              </a>
              <a href="#" className={`${darkMode ? 'text-gray-400 hover:text-primary-400' : 'text-gray-400 hover:text-primary-600'} transition-colors duration-200`} aria-label="LinkedIn">
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
              </a>
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
              <button className={`text-xs ${darkMode ? 'text-gray-400 hover:text-primary-400' : 'text-gray-500 hover:text-primary-600'} transition-colors duration-200`}>
                Español
              </button>
              <button className={`text-xs ${darkMode ? 'text-gray-400 hover:text-primary-400' : 'text-gray-500 hover:text-primary-600'} transition-colors duration-200`}>
                English
              </button>
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