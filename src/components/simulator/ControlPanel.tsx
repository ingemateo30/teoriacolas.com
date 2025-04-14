'use client'

import React, { useState } from 'react'
import { useSimulationStore } from '@/store/simulationStore'
import { simulateQueue } from '@/lib/simulation/core'
import type { SimulationParams } from '@/types/simulation'

export function ControlPanel() {
    const setParams = useSimulationStore(state => state.setParams)
    const setResult = useSimulationStore(state => state.setResult)
    const setLoading = useSimulationStore(state => state.setLoading)

    const [model, setModel] = useState<'MM1'>('MM1')
    const [arrivalRate, setArrivalRate] = useState(2)
    const [serviceRate, setServiceRate] = useState(4)
    const [duration, setDuration] = useState(100)

    const handleRun = () => {
        setLoading(true)
        const params: SimulationParams = {
            model,
            arrivalRate,
            serviceRate,
            duration,
        }
        setParams(params)
        const result = simulateQueue(params)
        setResult(result)
        setLoading(false)
    }

    return (
        <div className="space-y-4 p-4 border rounded-xl bg-white shadow">
            <h2 className="text-lg font-semibold">Panel de Control</h2>
            <div className="space-y-2">
                <label className="block text-sm">Tasa de llegada (λ)</label>
                <input
                    type="number"
                    className="w-full border px-2 py-1 rounded"
                    value={arrivalRate}
                    onChange={(e) => setArrivalRate(+e.target.value)}
                />
                <label className="block text-sm">Tasa de servicio (μ)</label>
                <input
                    type="number"
                    className="w-full border px-2 py-1 rounded"
                    value={serviceRate}
                    onChange={(e) => setServiceRate(+e.target.value)}
                />
                <label className="block text-sm">Duración</label>
                <input
                    type="number"
                    className="w-full border px-2 py-1 rounded"
                    value={duration}
                    onChange={(e) => setDuration(+e.target.value)}
                />
            </div>
            <button
                onClick={handleRun}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
                Ejecutar Simulación
            </button>
        </div>
    )
}
