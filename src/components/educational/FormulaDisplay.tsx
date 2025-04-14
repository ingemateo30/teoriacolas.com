interface FormulaDisplayProps {
    formula: string
    description: string
  }
  
  export function FormulaDisplay({ formula, description }: FormulaDisplayProps) {
    return (
      <div className="p-4 border rounded bg-white shadow">
        <p className="font-mono text-lg">{formula}</p>
        <p className="text-sm text-gray-600">{description}</p>
      </div>
    )
  }
  