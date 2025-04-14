'use client'

import React from 'react'

export function EntityAnimation() {
  return (
    <div className="w-full h-12 bg-gray-100 flex items-center overflow-hidden rounded">
      <div className="bg-green-500 w-4 h-4 rounded-full animate-bounce mx-2"></div>
      <span className="text-sm text-gray-600">Animación de entidad en la cola (en desarrollo)</span>
    </div>
  )
}
