interface SimulatorModelProps {
    params: { modelId: string }
  }
  
  export default function SimulatorByModel({ params }: SimulatorModelProps) {
    return (
      <div className="p-6">
        <h2 className="text-2xl font-semibold">Simulando: {params.modelId}</h2>
      </div>
    )
  }
  