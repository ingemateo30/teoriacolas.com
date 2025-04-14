interface ModelPageProps {
    params: { modelId: string }
  }
  
  export default function ModelDetailPage({ params }: ModelPageProps) {
    return (
      <div className="p-6">
        <h3 className="text-xl font-bold">Modelo: {params.modelId}</h3>
        <p>Visualización e información del modelo seleccionado.</p>
      </div>
    )
  }
  