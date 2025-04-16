'use client';
import React from 'react';
import QueueCalculator from '@/components/calculator/QueueCalculator';
import { Card } from '@/components/ui/Card';
import Navbar from '@/components/layout/Navbar';
import Sidebar from '@/components/layout/Sidebar';
import Footer from '@/components/layout/Footer';

export default function CalculatorPage() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-900 text-gray-300">
      <Navbar />
      <div className="flex flex-1 pt-16">
        <Sidebar />
        
        <div className="flex-1 bg-gradient-to-b from-gray-900 to-gray-800 px-4 py-10 md:px-8 lg:px-16 lg:ml-10">
          
          
          <Card className="mb-6 p-6 bg-gray-800 border border-gray-700 shadow-lg">
            <h2 className="text-xl font-semibold mb-2 text-blue-300">¿Qué es la Teoría de Colas?</h2>
            <p className="mb-4">
              La teoría de colas es el estudio matemático de las líneas de espera o colas. Esta teoría
              estudia factores como tiempos de espera, capacidad del sistema y utilización de recursos.
            </p>
            <p>
              Esta calculadora te permite analizar diferentes modelos de colas y calcular sus métricas
              de rendimiento, como tiempo promedio de espera, longitud promedio de la cola y distribución
              de probabilidad de estados.
            </p>
          </Card>
          
          <QueueCalculator />
          
          <Card className="mt-6 p-6 bg-gray-800 border border-gray-700 shadow-lg">
            <h2 className="text-xl font-semibold mb-4 text-blue-300">Guía de notación de modelos</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h3 className="font-medium text-blue-200">Formato: A/B/c/K</h3>
                <ul className="list-disc pl-6 mt-2">
                  <li>A: Distribución del tiempo entre llegadas</li>
                  <li>B: Distribución del tiempo de servicio</li>
                  <li>c: Número de servidores paralelos</li>
                  <li>K: Capacidad máxima del sistema (opcional)</li>
                </ul>
              </div>
              
              <div>
                <h3 className="font-medium text-blue-200">Distribuciones comunes:</h3>
                <ul className="list-disc pl-6 mt-2">
                  <li>M: Markoviana (exponencial)</li>
                  <li>D: Determinística</li>
                  <li>G: General</li>
                  <li>Ek: Erlang-k</li>
                  <li>H: Hiperexponencial</li>
                </ul>
              </div>
            </div>
            
            <div className="mt-4">
              <h3 className="font-medium text-blue-200">Ejemplos:</h3>
              <ul className="list-disc pl-6 mt-2">
                <li>M/M/1: Cola con llegadas y servicios exponenciales, un servidor</li>
                <li>M/G/3: Cola con llegadas exponenciales, servicios de distribución general, 3 servidores</li>
                <li>G/G/1: Cola con distribuciones generales tanto para llegadas como para servicios</li>
                <li>M/M/2/10: Cola con llegadas y servicios exponenciales, 2 servidores y capacidad máxima de 10 clientes</li>
              </ul>
            </div>
          </Card>
        </div>
        
      </div>
      <Footer />
    </div>
  );
}