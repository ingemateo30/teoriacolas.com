"use client"; 

import { useState, useEffect } from "react";
import { Construction, BookOpen, ArrowRight, Calendar, ChevronRight } from "lucide-react";

export default function AdvancedPage() {
  // Estado para controlar animaciones de entrada
  const [isLoaded, setIsLoaded] = useState(false);
  
  // Temas avanzados que estarán disponibles próximamente
  const upcomingTopics = [
    { 
      title: "Modelos de Colas Avanzados", 
      description: "Profundización en modelos M/G/1, G/M/1, G/G/1 y sus aplicaciones prácticas",
      estimatedDate: "Mayo 2025"
    },
    { 
      title: "Optimización de Sistemas de Colas", 
      description: "Técnicas matemáticas para optimizar parámetros de servicio y minimizar costos",
      estimatedDate: "Junio 2025"
    },
    { 
      title: "Simulación de Monte Carlo", 
      description: "Simulación avanzada de sistemas complejos con métodos estocásticos",
      estimatedDate: "Julio 2025"
    },
    { 
      title: "Aplicaciones en Inteligencia Artificial", 
      description: "Integración de teoría de colas con algoritmos de aprendizaje automático",
      estimatedDate: "Agosto 2025"
    }
  ];

  // Efecto para activar animaciones después de cargar
  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 p-6 md:p-12">
      {/* Encabezado con animación */}
      <div className={`transition-all duration-700 ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-8"}`}>
        <div className="flex items-center gap-3 mb-4">
          <Construction size={32} className="text-indigo-600 animate-pulse" />
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
            Conceptos Avanzados
          </h1>
        </div>
        
        <div className="h-1 w-24 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full mb-6"></div>
      </div>
      
      {/* Mensaje de construcción */}
      <div className={`mb-12 bg-white rounded-xl shadow-lg p-6 border-l-4 border-amber-500 transition-all duration-1000 ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
        <div className="flex flex-col md:flex-row items-center gap-6">
          <div className="bg-amber-100 p-4 rounded-full">
            <Construction size={40} className="text-amber-600" />
          </div>
          <div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">Estamos trabajando en esta sección</h2>
            <p className="text-gray-600 mb-4">
              se esta desarrollando contenido avanzado sobre teoría de colas
              para ofrecerte información de alto nivel académico. ¡Muy pronto estará disponible!
            </p>
            <div className="flex items-center text-sm text-amber-600 font-medium">
              <Calendar size={16} className="mr-1" />
              <span>Lanzamiento estimado: Mayo 2025</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Vista previa de temas */}
      <h3 className={`text-xl md:text-2xl font-semibold text-gray-800 mb-4 transition-all duration-1200 ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}>
        Temas que estarán disponibles próximamente:
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {upcomingTopics.map((topic, index) => (
          <div 
            key={index} 
            className={`bg-white rounded-lg shadow-md p-6 border border-gray-100 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 cursor-pointer transition-all duration-1300 ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-16"}`}
            style={{ transitionDelay: `${index * 150}ms` }}
          >
            <div className="flex justify-between items-start">
              <div>
                <h4 className="text-lg font-semibold text-gray-800 mb-2">{topic.title}</h4>
                <p className="text-gray-600 text-sm mb-4">{topic.description}</p>
                <div className="flex items-center text-xs text-indigo-600 font-medium">
                  <Calendar size={14} className="mr-1" />
                  <span>Disponible: {topic.estimatedDate}</span>
                </div>
              </div>
              <div className="bg-indigo-100 p-2 rounded-full">
                <BookOpen size={20} className="text-indigo-600" />
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* Formulario de notificación */}
      <div className={`mt-12 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl shadow-lg p-6 text-white transition-all duration-1500 ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-20"}`}>
        <h3 className="text-xl font-semibold mb-3">¿Quieres ser notificado cuando esta sección esté lista?</h3>
        <p className="mb-4 text-indigo-100">Déjanos tu correo y te avisaremos cuando publiquemos nuevo contenido avanzado sobre teoría de colas.</p>
        
        <div className="flex flex-col sm:flex-row gap-3">
          <input 
            type="email" 
            placeholder="tucorreo@ejemplo.com" 
            className="px-4 py-2 rounded-lg flex-grow text-gray-800 focus:outline-none focus:ring-2 focus:ring-white"
          />
          <button className="bg-white text-indigo-600 px-4 py-2 rounded-lg font-medium hover:bg-indigo-50 transition-colors flex items-center justify-center">
            Notificarme
            <ArrowRight size={16} className="ml-2" />
          </button>
        </div>
      </div>
      
      {/* Enlaces útiles */}
      <div className={`mt-12 transition-all duration-1700 ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-24"}`}>
        <h3 className="text-lg font-semibold text-gray-800 mb-3">Mientras tanto, explora nuestras secciones disponibles:</h3>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {['Fundamentos', 'Simulador', 'Calculadora'].map((item, index) => (
            <a 
              key={index}
              href={`/${item.toLowerCase()}`}
              className="flex items-center justify-between p-4 bg-white rounded-lg shadow-sm hover:shadow transition-all hover:bg-indigo-50 border border-gray-100"
            >
              <span className="font-medium text-gray-700">{item}</span>
              <ChevronRight size={18} className="text-indigo-500" />
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}