export function Sidebar() {
    return (
      <aside className="w-64 bg-gray-100 p-4">
        <ul className="space-y-2">
          <li><a href="/" className="block hover:text-blue-600">Inicio</a></li>
          <li><a href="/models" className="block hover:text-blue-600">Modelos</a></li>
          <li><a href="/simulator" className="block hover:text-blue-600">Simulador</a></li>
          <li><a href="/learning" className="block hover:text-blue-600">Aprendizaje</a></li>
          <li><a href="/laboratory" className="block hover:text-blue-600">Laboratorio</a></li>
        </ul>
      </aside>
    )
  }
  