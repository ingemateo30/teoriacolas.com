"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

/**
 * Componente Navbar
 * 
 * Un navbar responsivo elegante con animaciones sutiles y diseño moderno.
 * Incluye transiciones suaves y efectos visuales en hover para mejorar la experiencia del usuario.
 */
export default function Navbar() {
  // Estado para controlar la apertura/cierre del menú móvil
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  // Estado para manejar la transparencia del navbar al hacer scroll
  const [isScrolled, setIsScrolled] = useState(false);

  // Estado para almacenar la ruta activa
  const [activePath, setActivePath] = useState("/");

  // Efecto para detectar el scroll y cambiar el estilo del navbar
  useEffect(() => {
    // Detectar scroll para cambiar estilos
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    // Detectar la ruta actual para marcar el enlace activo
    setActivePath(window.location.pathname);

    // Añadir el event listener para el scroll
    window.addEventListener("scroll", handleScroll);
    
    // Cleanup: remover el event listener cuando el componente se desmonte
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Función para determinar si un enlace está activo
  const isActive = (path: string) => {
    return activePath === path ? "border-primary-600 text-primary-600" : "border-transparent text-gray-500 hover:text-primary-500 hover:border-primary-300";
  };

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? "bg-white/95 backdrop-blur-sm shadow-md" : "bg-white shadow-sm"}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo y enlaces de navegación para desktop */}
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link href="/" className="text-2xl font-bold bg-gradient-to-r from-primary-600 to-blue-600 bg-clip-text text-transparent transition-transform hover:scale-105">
                QueueSim
              </Link>
            </div>
            
            {/* Enlaces de navegación para desktop */}
            <div className="hidden md:ml-8 md:flex md:space-x-8">
              {[
                { name: "Modelos", path: "/models" },
                { name: "Simulador", path: "/simulator" },
                { name: "Aprendizaje", path: "/learning" },
                { name: "Laboratorio", path: "/laboratory" }
              ].map((item) => (
                <Link 
                  key={item.name}
                  href={item.path} 
                  className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition-all duration-200 ${isActive(item.path)}`}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
          
          {/* Botón de configuración para desktop */}
          <div className="hidden md:ml-6 md:flex md:items-center">
            <button
              type="button"
              className="bg-white p-2 rounded-full text-gray-400 hover:text-primary-500 hover:bg-gray-100 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
              aria-label="Configuración"
            >
              {/* Icono de configuración con animación en hover */}
              <svg className="h-6 w-6 transform transition-transform hover:rotate-45" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </button>
          </div>
          
          {/* Botón de menú para móvil */}
          <div className="-mr-2 flex md:hidden">
            <button
              type="button"
              className="bg-white inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-primary-500 hover:bg-gray-100 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-expanded={isMenuOpen}
              aria-label="Menú principal"
            >
              <span className="sr-only">Abrir menú principal</span>
              {/* Animación suave entre iconos de menú y cerrar */}
              <svg
                className={`transition-opacity duration-200 ${isMenuOpen ? 'opacity-0 absolute' : 'opacity-100'} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
              <svg
                className={`transition-opacity duration-200 ${isMenuOpen ? 'opacity-100' : 'opacity-0 absolute'} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Menú móvil con animación de slide down */}
      <div 
        className={`
          md:hidden 
          transition-all duration-300 ease-in-out 
          overflow-hidden 
          ${isMenuOpen ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0'}
        `}
      >
        <div className="pt-2 pb-3 space-y-1 px-4 bg-white/95 backdrop-blur-sm shadow-inner">
          {[
            { name: "Modelos", path: "/models" },
            { name: "Simulador", path: "/simulator" },
            { name: "Aprendizaje", path: "/learning" },
            { name: "Laboratorio", path: "/laboratory" }
          ].map((item) => (
            <Link 
              key={item.name}
              href={item.path} 
              className={`block pl-3 pr-4 py-2 border-l-4 text-base font-medium transition-all duration-200 ${
                activePath === item.path
                  ? "border-primary-600 text-primary-600 bg-primary-50"
                  : "border-transparent text-gray-600 hover:bg-gray-50 hover:border-primary-300 hover:text-primary-500"
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              {item.name}
            </Link>
          ))}
          
          {/* Botón de configuración en menú móvil */}
          <div className="pt-2 border-t border-gray-200">
            <button
              className="flex items-center pl-3 pr-4 py-2 text-base font-medium text-gray-600 hover:bg-gray-50 hover:text-primary-500 transition-colors duration-200"
            >
              <svg className="mr-3 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              Configuración
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}