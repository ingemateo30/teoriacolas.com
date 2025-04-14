"use client";

import Link from 'next/link';
import { Card } from '@/components/ui/Card';
import { ConceptCard } from '@/components/educational/ConceptCard';

export default function LearningPage() {
  return (
    <div className="learning-page">
      <h1>Centro de Aprendizaje</h1>
      <p>
        Explora los fundamentos y conceptos avanzados de la teoría de colas:
      </p>

      <div className="learning-sections">
        <div className="learning-section">
          <h2>Fundamentos</h2>
          <Link href="/learning/fundamentals">
            <Card className="section-card">
              <h3>Conceptos Básicos</h3>
              <p>Introducción a la teoría de colas, notación de Kendall y elementos principales</p>
            </Card>
          </Link>
        </div>

        <div className="learning-section">
          <h2>Conceptos Avanzados</h2>
          <Link href="/learning/advanced">
            <Card className="section-card">
              <h3>Modelos Complejos</h3>
              <p>Redes de colas, teoría de la renovación y procesos estocásticos</p>
            </Card>
          </Link>
        </div>

        <div className="learning-section">
          <h2>Casos Prácticos</h2>
          <div className="concept-cards">
            <ConceptCard 
              title="Optimización de Cajas en Supermercado" 
              description="Análisis de tiempos de espera y número óptimo de servidores" 
            />
            <ConceptCard 
              title="Gestión de Tráfico en Redes" 
              description="Aplicación de teoría de colas en redes de datos" 
            />
          </div>
        </div>
      </div>
    </div>
  );
}
  