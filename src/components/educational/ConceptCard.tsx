interface ConceptCardProps {
    title: string
    description: string
  }
  
  export function ConceptCard({ title, description }: ConceptCardProps) {
    return (
      <div className="border rounded p-4 bg-white shadow">
        <h3 className="text-lg font-semibold">{title}</h3>
        <p className="text-sm mt-2">{description}</p>
      </div>
    )
  }
  