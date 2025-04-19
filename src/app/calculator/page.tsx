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
        
        <div className="flex-1 overflow-y-auto px-4 py-10 md:px-8 lg:px-16 lg:ml-10">

          
          
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
        </div>
        
      </div>
      <Footer />
    </div>
  );
}