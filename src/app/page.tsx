import Link from 'next/link';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

export default function Homepage() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      <section className="text-center py-16 px-4 bg-white shadow">
        <h1 className="text-4xl font-bold mb-4">
          Sistema de Simulación de Teoría de Colas
        </h1>
        <p className="text-lg mb-8 max-w-2xl mx-auto">
          Plataforma educativa interactiva para aprender y simular modelos de teoría de colas
        </p>
        <div className="flex justify-center gap-4">
          <Link href="/simulator">
            <Button>Iniciar Simulación</Button>
          </Link>
          <Link href="/learning">
            <Button variant="secondary">Aprender Conceptos</Button>
          </Link>
        </div>
      </section>

      <section className="py-16 px-4">
        <h2 className="text-3xl font-semibold text-center mb-12">
          Características Principales
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          <Card title="Simulador Interactivo">
            <p>
              Visualiza el comportamiento de diferentes modelos de colas en tiempo real con
              parámetros ajustables.
            </p>
          </Card>
          <Card title="Múltiples Modelos">
            <p>
              Incluye modelos M/M/1, M/M/c, M/M/c/K, M/G/1, G/M/1, G/G/1 y redes de colas.
            </p>
          </Card>
          <Card title="Centro de Aprendizaje">
            <p>
              Recursos educativos desde conceptos básicos hasta temas avanzados en teoría de colas.
            </p>
          </Card>
          <Card title="Laboratorio">
            <p>
              Experimenta con configuraciones personalizadas y analiza el rendimiento de los sistemas.
            </p>
          </Card>
        </div>
      </section>

      <section className="bg-blue-50 py-16 px-4">
        <h2 className="text-3xl font-semibold text-center mb-12">Inicio Rápido</h2>
        <div className="flex flex-col md:flex-row justify-center gap-8 max-w-4xl mx-auto">
          <div className="flex flex-col items-center text-center">
            <div className="text-4xl font-bold text-blue-600 mb-2">1</div>
            <p>Selecciona un modelo de cola</p>
          </div>
          <div className="flex flex-col items-center text-center">
            <div className="text-4xl font-bold text-blue-600 mb-2">2</div>
            <p>Configura los parámetros</p>
          </div>
          <div className="flex flex-col items-center text-center">
            <div className="text-4xl font-bold text-blue-600 mb-2">3</div>
            <p>Inicia la simulación y observa los resultados</p>
          </div>
        </div>
      </section>
    </div>
  );
}
