"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from 'react';
import React from 'react';

/**
 * Componente Sidebar con Modo Oscuro
 * 
 * Un sidebar elegante y responsivo que se integra con el Navbar en modo oscuro
 * con animaciones fluidas y feedback visual para mejorar la experiencia de usuario.
 */
export default function Sidebar() {
  const pathname = usePathname();
  
  // Estado para controlar cuál submenú está expandido
  const [expandedMenu, setExpandedMenu] = useState<string | null>(null);
  
  // Estado para manejar si el sidebar está colapsado (para vista móvil)
  const [isCollapsed, setIsCollapsed] = useState(false);
  
  // Estado para manejar efectos visuales en hover
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  // Efecto para expandir automáticamente el submenú activo al cargar
  useEffect(() => {
    menuItems.forEach(item => {
      if (item.submenu && item.submenu.some(subItem => pathname === subItem.href)) {
        setExpandedMenu(item.title);
      }
    });
  }, [pathname]);

  const menuItems = [
    {
      title: "Inicio",
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
      ),
      href: "/",
    },
    {
      title: "Modelos",
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      ),
      href: "/simulator",
      submenu: [
        { title: "M/M/1", href: "/simulator/mm1", description: "Cola con llegadas y servicios exponenciales, 1 servidor" },
        { title: "M/M/c", href: "/simulator/mmc", description: "Cola con llegadas y servicios exponenciales, c servidores" },
        { title: "M/M/c/K", href: "/simulator/mmck", description: "Cola con capacidad limitada K" },
        { title: "M/G/1", href: "/simulator/mg1", description: "Cola con distribución de servicio general" },
        { title: "Redes de Colas", href: "/simulator/networks", description: "Sistemas interconectados de colas" },
      ],
    },
    {
      title: "Simulador",
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      href: "/simulator",
    },
    {
      title: "Aprendizaje",
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 14l9-5-9-5-9 5 9 5z" />
          <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
        </svg>
      ),
      href: "/learning",
      submenu: [
        { title: "Fundamentos", href: "/learning/fundamentals", description: "Conceptos básicos de teoría de colas" },
        { title: "Conceptos Avanzados", href: "/learning/advanced", description: "Temas avanzados y aplicaciones" },
      ],
    },
    {
      title: "Calculadora",
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
        </svg>
      ),
      href: "/calculator",
    },
  ];

  const toggleSubmenu = (title: string) => {
    setExpandedMenu(expandedMenu === title ? null : title);
  };

  // Determinar si un elemento de menú está activo
  const isActive = (href: string) => {
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  // Maneja el hover de elementos
  const handleItemHover = (title: string | null) => {
    setHoveredItem(title);
  };

  return (
    <aside className={`
      hidden lg:block w-64 bg-gray-900 
      border-r border-gray-700 h-screen pt-16 sticky top-0 
      transition-all duration-300 ease-in-out
      ${isCollapsed ? "lg:w-20" : "lg:w-64"}
    `}>
      {/* Botón de colapsar sidebar */}
      <button 
        className="absolute -right-3 top-20 bg-gray-800 text-gray-300 rounded-full p-1 shadow-md hover:shadow-lg transition-shadow duration-300 z-10"
        onClick={() => setIsCollapsed(!isCollapsed)}
        aria-label={isCollapsed ? "Expandir sidebar" : "Colapsar sidebar"}
      >
        <svg 
          className={`w-4 h-4 transition-transform duration-300 ${isCollapsed ? 'rotate-180' : ''}`} 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24" 
          xmlns="http://www.w3.org/2000/svg"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      <div className="h-full px-3 py-4 overflow-y-auto">
        {/* Lista de menú */}
        <ul className="space-y-2">
          {menuItems.map((item, index) => (
            <li key={index}>
              {item.submenu ? (
                <>
                  <button
                    onClick={() => toggleSubmenu(item.title)}
                    onMouseEnter={() => handleItemHover(item.title)}
                    onMouseLeave={() => handleItemHover(null)}
                    className={`
                      flex items-center w-full p-2 text-base font-normal 
                      rounded-lg transition duration-200 
                      ${isActive(item.href) 
                        ? "bg-gray-800 text-blue-400 shadow-sm" 
                        : hoveredItem === item.title
                          ? "text-blue-300 bg-gray-800"
                          : "text-gray-300 hover:bg-gray-800"
                      }
                      ${isCollapsed ? "justify-center" : "justify-between"}
                    `}
                    aria-expanded={expandedMenu === item.title}
                    aria-controls={`submenu-${item.title}`}
                  >
                    <div className="flex items-center">
                      <div className={`
                        ${isActive(item.href) ? "text-blue-400" : "text-gray-400"}
                        transition-colors duration-200
                        ${hoveredItem === item.title ? "text-blue-300" : ""}
                      `}>
                        {item.icon}
                      </div>
                      <span className={`
                        ml-3 transition-opacity duration-200
                        ${isCollapsed ? "opacity-0 absolute" : "opacity-100"}
                      `}>
                        {item.title}
                      </span>
                    </div>
                    
                    {!isCollapsed && (
                      <svg
                        className={`w-4 h-4 transition-transform duration-200 ${
                          expandedMenu === item.title ? "transform rotate-180" : ""
                        }`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                      </svg>
                    )}
                  </button>
                  
                  {/* Submenú con animación de expansión */}
                  <div
                    id={`submenu-${item.title}`}
                    className={`
                      overflow-hidden transition-all duration-300 ease-in-out
                      ${expandedMenu === item.title ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}
                      ${isCollapsed ? "hidden" : ""}
                    `}
                  >
                    <ul className="py-2 space-y-1 pl-2">
                      {item.submenu.map((subItem, subIndex) => (
                        <li key={subIndex}>
                          <Link
                            href={subItem.href}
                            className={`
                              group flex flex-col w-full p-2 pl-10 text-sm font-normal 
                              rounded-lg transition-all duration-200
                              ${isActive(subItem.href)
                                ? "bg-gray-800 text-blue-400 shadow-sm"
                                : "text-gray-300 hover:bg-gray-800 hover:text-blue-300"}
                            `}
                            title={subItem.description}
                          >
                            <span className="font-medium">{subItem.title}</span>
                            {/* Mini descripción con animación de aparición */}
                            {subItem.description && (
                              <span className="
                                text-xs text-gray-400 mt-1 truncate max-w-full
                                opacity-0 group-hover:opacity-100 transition-opacity duration-300
                              ">
                                {subItem.description}
                              </span>
                            )}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </>
              ) : (
                <Link
                  href={item.href}
                  className={`
                    flex items-center p-2 text-base font-normal rounded-lg 
                    transition-all duration-200
                    ${isActive(item.href)
                      ? "bg-gray-800 text-blue-400 shadow-sm"
                      : "text-gray-300 hover:bg-gray-800 hover:text-blue-300"}
                    ${isCollapsed ? "justify-center" : ""}
                  `}
                  onMouseEnter={() => handleItemHover(item.title)}
                  onMouseLeave={() => handleItemHover(null)}
                >
                  <div className={`
                    ${isActive(item.href) ? "text-blue-400" : "text-gray-400"}
                    transition-colors duration-200
                    ${hoveredItem === item.title ? "text-blue-300" : ""}
                  `}>
                    {item.icon}
                  </div>
                  <span className={`
                    ml-3 transition-opacity duration-200
                    ${isCollapsed ? "opacity-0 absolute" : "opacity-100"}
                  `}>
                    {item.title}
                  </span>
                </Link>
              )}
            </li>
          ))}
        </ul>
        
        {/* Pie del sidebar - Información educativa */}
        <div className={`
          mt-10 pt-4 border-t border-gray-700 text-xs text-gray-400
          transition-opacity duration-300
          ${isCollapsed ? "opacity-0 hidden" : "opacity-80"}
        `}>
          <h4 className="font-medium mb-2 text-blue-400">Notación de Kendall</h4>
          <p className="mb-1">A/B/c/K/N/D donde:</p>
          <ul className="space-y-1 pl-2">
            <li><span className="font-medium">A</span>: Distribución de llegadas</li>
            <li><span className="font-medium">B</span>: Distribución de servicio</li>
            <li><span className="font-medium">c</span>: Número de servidores</li>
            <li><span className="font-medium">K</span>: Capacidad del sistema</li>
            <li><span className="font-medium">N</span>: Tamaño de la población</li>
            <li><span className="font-medium">D</span>: Disciplina de la cola</li>
          </ul>
        </div>
      </div>
    </aside>
  );
}