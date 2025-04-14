import Link from 'next/link';
import { Card } from '@/components/ui/Card';

const models = [
  {
    id: 'mm1',
    name: 'M/M/1',
    description: 'Cola simple con llegadas Poisson y tiempos de servicio exponenciales con un solo servidor',
  },
  {
    id: 'mmc',
    name: 'M/M/c',
    description: 'Cola con llegadas Poisson, tiempos de servicio exponenciales y c servidores',
  },
  {
    id: 'mmck',
    name: 'M/M/c/K',
    description: 'Cola con llegadas Poisson, tiempos de servicio exponenciales, c servidores y capacidad limitada K',
  },
  {
    id: 'mg1',
    name: 'M/G/1',
    description: 'Cola con llegadas Poisson y distribución general de tiempos de servicio',
  },
  {
    id: 'gm1',
    name: 'G/M/1',
    description: 'Cola con distribución general de llegadas y tiempos de servicio exponenciales',
  },
  {
    id: 'gg1',
    name: 'G/G/1',
    description: 'Cola con distribución general de llegadas y tiempos de servicio',
  },
  {
    id: 'networks',
    name: 'Redes de Colas',
    description: 'Sistemas interconectados de múltiples colas',
  },
];

export default function ModelsPage() {
  return (
    <div className="models-page">
      <h1>Modelos de Teoría de Colas</h1>
      <p>
        Selecciona un modelo para aprender más sobre su teoría, fórmulas y aplicaciones:
      </p>

      <div className="models-grid">
        {models.map((model) => (
          <Link href={`/models/${model.id}`} key={model.id}>
            <Card className="model-card">
              <h2>{model.name}</h2>
              <p>{model.description}</p>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}