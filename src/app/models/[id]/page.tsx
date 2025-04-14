import { ControlPanel, QueueVisualizer } from '@/components/simulator';
import { simulateMM1 } from '@/lib/simulation/models/mm1';

export default function SimulatorPage({
  params,
}: {
  params: { modelId: string }
}) {
  return (
    <div className="grid lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2">
        <QueueVisualizer />
      </div>
      <div className="lg:col-span-1">
        <ControlPanel model={params.modelId} />
      </div>
    </div>
  )
}