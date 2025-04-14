interface CardProps {
    title: string
    children: React.ReactNode
  }
  
  export function Card({ title, children }: CardProps) {
    return (
      <div className="border rounded-lg shadow p-4 bg-white">
        <h3 className="text-lg font-semibold mb-2">{title}</h3>
        <div>{children}</div>
      </div>
    )
  }
  