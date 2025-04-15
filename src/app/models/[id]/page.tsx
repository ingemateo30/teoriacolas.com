import { ControlPanel} from '@/components/simulator/ControlPanel';
import { QueueVisualizer } from '@/components/simulator/QueueVisualizer';

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
      <ControlPanel modelId={params.modelId} />
      </div>
    </div>
  )
}