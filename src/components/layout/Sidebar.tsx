"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from 'react';
import React from 'react';

export default function Sidebar() {
  const pathname = usePathname();

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
      href: "/models",
      submenu: [
        { title: "M/M/1", href: "/models/mm1" },
        { title: "M/M/c", href: "/models/mmc" },
        { title: "M/M/c/K", href: "/models/mmck" },
        { title: "M/G/1", href: "/models/mg1" },
        { title: "Redes de Colas", href: "/models/networks" },
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
        { title: "Fundamentos", href: "/learning/fundamentals" },
        { title: "Conceptos Avanzados", href: "/learning/advanced" },
      ],
    },
    {
      title: "Laboratorio",
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
        </svg>
      ),
      href: "/laboratory",
    },
  ];

  // Estado para controlar cuál submenú está expandido
  const [expandedMenu, setExpandedMenu] = React.useState<string | null>(null);

  const toggleSubmenu = (title: string) => {
    setExpandedMenu(expandedMenu === title ? null : title);
  };

  // Determinar si un elemento de menú está activo
  const isActive = (href: string) => {
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  return (
    <aside className="hidden lg:block w-64 bg-white border-r border-gray-200">
      <div className="h-full px-3 py-4 overflow-y-auto">
        <div className="flex items-center mb-5 px-2">
          <span className="self-center text-xl font-semibold">Teoría de Colas</span>
        </div>
        <ul className="space-y-2">
          {menuItems.map((item, index) => (
            <li key={index}>
              {item.submenu ? (
                <>
                  <button
                    onClick={() => toggleSubmenu(item.title)}
                    className={`flex items-center w-full p-2 text-base font-normal rounded-lg transition duration-75 ${
                      isActive(item.href)
                        ? "bg-primary-100 text-primary-900"
                        : "text-gray-900 hover:bg-gray-100"
                    }`}
                  >
                    {item.icon}
                    <span className="ml-3 flex-1 text-left whitespace-nowrap">{item.title}</span>
                    <svg
                      className={`w-4 h-4 transition-transform ${
                        expandedMenu === item.title ? "transform rotate-180" : ""
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  <ul
                    className={`py-2 space-y-2 ${
                      expandedMenu === item.title ? "block" : "hidden"
                    }`}
                  >
                    {item.submenu.map((subItem, subIndex) => (
                      <li key={subIndex}>
                        <Link
                          href={subItem.href}
                          className={`flex items-center w-full p-2 pl-11 text-sm font-normal rounded-lg transition duration-75 ${
                            isActive(subItem.href)
                              ? "bg-primary-100 text-primary-900"
                              : "text-gray-900 hover:bg-gray-100"
                          }`}
                        >
                          {subItem.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </>
              ) : (
                <Link
                  href={item.href}
                  className={`flex items-center p-2 text-base font-normal rounded-lg ${
                    isActive(item.href)
                      ? "bg-primary-100 text-primary-900"
                      : "text-gray-900 hover:bg-gray-100"
                  }`}
                >
                  {item.icon}
                  <span className="ml-3">{item.title}</span>
                </Link>
              )}
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}
  