import './globals.css'
import { ReactNode } from 'react'

export const metadata = {
  title: 'Simulador de Teoría de Colas',
  description: 'Simulaciones interactivas de modelos de colas',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="es">
      <body className="min-h-screen bg-gray-50 text-gray-900">{children}</body>
    </html>
  )
}
