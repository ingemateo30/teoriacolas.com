interface InteractiveExampleProps {
    exampleTitle: string
    children: React.ReactNode
  }
  
  export function InteractiveExample({ exampleTitle, children }: InteractiveExampleProps) {
    return (
      <div className="p-4 border rounded bg-white shadow">
        <h4 className="font-semibold mb-2">{exampleTitle}</h4>
        {children}
      </div>
    )
  }
  