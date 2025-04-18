// src/components/calculator/QueueCalculator.tsx
import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Select } from '@/components/ui/Select';
import { Slider } from '@/components/ui/Slider';
import FormulaDisplay from '@/components/educational/FormulaDisplay';
import PnDistributionChart from '@/components/calculator/PnDistributionChart';
import { calculateQueueMetrics } from '@/lib/math/queueCalculations';

type QueueModel = 'MM1' | 'MMc' | 'MMcK' | 'MG1' | 'GM1' | 'GG1' | 'MM1K' | 'MGcK';

interface QueueParameters {
    lambda: number;        // Tasa de llegada
    mu: number;            // Tasa de servicio
    c: number;             // Número de servidores
    k?: number;            // Capacidad del sistema (si aplica)
    sigma?: number;        // Desviación estándar (para distribuciones generales)
    ca?: number;           // Coeficiente de variación de llegadas (para GG1)
    cs?: number;           // Coeficiente de variación de servicio (para GG1)
}

interface QueueMetrics {
    rho: number;           // Factor de utilización
    l: number;             // Número promedio de clientes en el sistema
    lq: number;            // Número promedio de clientes en cola
    w: number;             // Tiempo promedio en el sistema
    wq: number;            // Tiempo promedio en cola
    p0: number;            // Probabilidad de sistema vacío
    pn?: number[];         // Distribución de probabilidad de n clientes (si aplica)
    pk?: number;           // Probabilidad de sistema lleno (si aplica)
}

const modelLabels: Record<QueueModel, string> = {
    MM1: 'M/M/1 - Cola simple con llegadas y servicios exponenciales',
    MMc: 'M/M/c - Cola con c servidores paralelos',
    MMcK: 'M/M/c/K - Cola con c servidores y capacidad limitada K',
    MG1: 'M/G/1 - Cola con servicio de distribución general',
    GM1: 'G/M/1 - Cola con llegadas de distribución general',
    GG1: 'G/G/1 - Cola con llegadas y servicios de distribución general',
    MM1K: 'M/M/1/K - Cola simple con capacidad limitada K',
    MGcK: 'M/G/c/K - Cola con distribución general de servicio, c servidores y capacidad K'
};

const modelHasGraphPn: Record<QueueModel, boolean> = {
    MM1: true,
    MMc: true,
    MMcK: true,
    MG1: false,
    GM1: true,
    GG1: false,
    MM1K: true,
    MGcK: false
};

export default function QueueCalculator() {
    const [selectedModel, setSelectedModel] = useState<QueueModel>('MM1');
    const [parameters, setParameters] = useState<QueueParameters>({
        lambda: 5,
        mu: 10,
        c: 1,
        k: 10,
        sigma: 0.5,
        ca: 1,
        cs: 1
    });
    const [metrics, setMetrics] = useState<QueueMetrics | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [maxN, setMaxN] = useState<number>(20); // Máximo número de clientes para el gráfico Pn

    // Actualizar métricas cuando cambian los parámetros o el modelo
    useEffect(() => {
        try {
            const calculated = calculateQueueMetrics(selectedModel, parameters, maxN);
            setMetrics(calculated);
            setError(null);
        } catch (err) {
            setError((err as Error).message);
            setMetrics(null);
        }
    }, [selectedModel, parameters, maxN]);

    // Manejar cambios en los parámetros
    const handleParameterChange = (param: keyof QueueParameters, value: number) => {
        setParameters(prev => ({ ...prev, [param]: value }));
    };

    // Determinar qué campos mostrar según el modelo seleccionado
    const showK = ['MMcK', 'MM1K', 'MGcK'].includes(selectedModel);
    const showC = ['MMc', 'MMcK', 'MGcK'].includes(selectedModel);
    const showSigma = ['MG1', 'GG1', 'MGcK'].includes(selectedModel);
    const showCaCs = ['GG1'].includes(selectedModel);

    return (
        <div className="flex flex-col gap-6">
            <Card className="p-6 bg-gray-800 border border-gray-700 shadow-lg">
                <h2 className="text-2xl font-bold mb-4 text-blue-300">Calculadora de Teoría de Colas</h2>

                <div className="mb-6">
                    <label className="block text-sm font-medium mb-1 text-gray-300">Modelo de Cola</label>
                    <Select
                        value={selectedModel}
                        onChange={(e) => setSelectedModel(e.target.value as QueueModel)}
                        className="w-full bg-gray-700 text-gray-200 border-gray-600"
                        options={Object.entries(modelLabels).map(([key, label]) => ({
                            value: key,
                            label: label,
                        }))}
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                    <div>
                        <label className="block text-sm font-medium mb-1 text-blue-200">
                            λ - Tasa de llegada (clientes/hora)
                        </label>
                        <div className="flex items-center gap-2">
                            <Slider
                                min={0.1}
                                max={50}
                                step={0.1}
                                value={parameters.lambda}
                                onChange={(val) => handleParameterChange('lambda', val)}
                                className="slider-dark"
                            />
                            <input
                                type="number"
                                min={0.1}
                                step={0.1}
                                value={parameters.lambda}
                                onChange={(e) => handleParameterChange('lambda', parseFloat(e.target.value) || 0.1)}
                                className="w-20 p-1 border rounded bg-gray-700 text-gray-200 border-gray-600"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1 text-blue-200">
                            μ - Tasa de servicio (clientes/hora)
                        </label>
                        <div className="flex items-center gap-2">
                            <Slider
                                min={0.1}
                                max={50}
                                step={0.1}
                                value={parameters.mu}
                                onChange={(val) => handleParameterChange('mu', val)}
                                className="slider-dark"
                            />
                            <input
                                type="number"
                                min={0.1}
                                step={0.1}
                                value={parameters.mu}
                                onChange={(e) => handleParameterChange('mu', parseFloat(e.target.value) || 0.1)}
                                className="w-20 p-1 border rounded bg-gray-700 text-gray-200 border-gray-600"
                            />
                        </div>
                    </div>

                    {showC && (
                        <div>
                            <label className="block text-sm font-medium mb-1 text-blue-200">
                                c - Número de servidores
                            </label>
                            <div className="flex items-center gap-2">
                                <Slider
                                    min={1}
                                    max={10}
                                    step={1}
                                    value={parameters.c}
                                    onChange={(val) => handleParameterChange('c', val)}
                                    className="slider-dark"
                                />
                                <input
                                    type="number"
                                    min={1}
                                    step={1}
                                    value={parameters.c}
                                    onChange={(e) => handleParameterChange('c', parseInt(e.target.value) || 1)}
                                    className="w-20 p-1 border rounded bg-gray-700 text-gray-200 border-gray-600"
                                />
                            </div>
                        </div>
                    )}

                    {showK && (
                        <div>
                            <label className="block text-sm font-medium mb-1 text-blue-200">
                                K - Capacidad del sistema
                            </label>
                            <div className="flex items-center gap-2">
                                <Slider
                                    min={1}
                                    max={50}
                                    step={1}
                                    value={parameters.k || 10}
                                    onChange={(val) => handleParameterChange('k', val)}
                                    className="slider-dark"
                                />
                                <input
                                    type="number"
                                    min={1}
                                    step={1}
                                    value={parameters.k || 10}
                                    onChange={(e) => handleParameterChange('k', parseInt(e.target.value) || 1)}
                                    className="w-20 p-1 border rounded bg-gray-700 text-gray-200 border-gray-600"
                                />
                            </div>
                        </div>
                    )}

                    {showSigma && (
                        <div>
                            <label className="block text-sm font-medium mb-1 text-blue-200">
                                σ - Desviación estándar del tiempo de servicio
                            </label>
                            <div className="flex items-center gap-2">
                                <Slider
                                    min={0.1}
                                    max={10}
                                    step={0.1}
                                    value={parameters.sigma || 0.5}
                                    onChange={(val) => handleParameterChange('sigma', val)}
                                    className="slider-dark"
                                />
                                <input
                                    type="number"
                                    min={0.1}
                                    step={0.1}
                                    value={parameters.sigma || 0.5}
                                    onChange={(e) => handleParameterChange('sigma', parseFloat(e.target.value) || 0.1)}
                                    className="w-20 p-1 border rounded bg-gray-700 text-gray-200 border-gray-600"
                                />
                            </div>
                        </div>
                    )}

                    {showCaCs && (
                        <>
                            <div>
                                <label className="block text-sm font-medium mb-1 text-blue-200">
                                    Ca - Coeficiente de variación (llegadas)
                                </label>
                                <div className="flex items-center gap-2">
                                    <Slider
                                        min={0.1}
                                        max={5}
                                        step={0.1}
                                        value={parameters.ca || 1}
                                        onChange={(val) => handleParameterChange('ca', val)}
                                        className="slider-dark"
                                    />
                                    <input
                                        type="number"
                                        min={0.1}
                                        step={0.1}
                                        value={parameters.ca || 1}
                                        onChange={(e) => handleParameterChange('ca', parseFloat(e.target.value) || 0.1)}
                                        className="w-20 p-1 border rounded bg-gray-700 text-gray-200 border-gray-600"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-1 text-blue-200">
                                    Cs - Coeficiente de variación (servicio)
                                </label>
                                <div className="flex items-center gap-2">
                                    <Slider
                                        min={0.1}
                                        max={5}
                                        step={0.1}
                                        value={parameters.cs || 1}
                                        onChange={(val) => handleParameterChange('cs', val)}
                                        className="slider-dark"
                                    />
                                    <input
                                        type="number"
                                        min={0.1}
                                        step={0.1}
                                        value={parameters.cs || 1}
                                        onChange={(e) => handleParameterChange('cs', parseFloat(e.target.value) || 0.1)}
                                        className="w-20 p-1 border rounded bg-gray-700 text-gray-200 border-gray-600"
                                    />
                                </div>
                            </div>
                        </>
                    )}

                    {modelHasGraphPn[selectedModel] && (
                        <div>
                            <label className="block text-sm font-medium mb-1 text-blue-200">
                                Número máximo de clientes para gráfico Pn
                            </label>
                            <div className="flex items-center gap-2">
                                <Slider
                                    min={5}
                                    max={50}
                                    step={1}
                                    value={maxN}
                                    onChange={(val) => setMaxN(val)}
                                    className="slider-dark"
                                />
                                <input
                                    type="number"
                                    min={5}
                                    step={1}
                                    value={maxN}
                                    onChange={(e) => setMaxN(parseInt(e.target.value) || 5)}
                                    className="w-20 p-1 border rounded bg-gray-700 text-gray-200 border-gray-600"
                                />
                            </div>
                        </div>
                    )}
                </div>

                {error && (
                    <div className="mb-6 p-4 bg-red-900 text-red-200 rounded-md">
                        {error}
                    </div>
                )}

                <Button onClick={() => {
                    try {
                        const calculated = calculateQueueMetrics(selectedModel, parameters, maxN);
                        setMetrics(calculated);
                        setError(null);
                    } catch (err) {
                        setError((err as Error).message);
                        setMetrics(null);
                    }
                }}
                className="bg-blue-600 hover:bg-blue-700 text-white">
                    Calcular métricas
                </Button>
            </Card>

            {metrics && (
                <>
                    <Card className="p-6 bg-gray-800 border border-gray-700 shadow-lg">
                        <h3 className="text-xl font-bold mb-4 text-blue-300">Resultados del modelo {modelLabels[selectedModel]}</h3>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                            <div className="p-4 bg-gray-700 rounded-md border border-gray-600">
                                <h4 className="font-medium mb-1 text-blue-200">Factor de utilización (ρ)</h4>
                                <p className="text-2xl text-gray-200">{metrics.rho.toFixed(4)}</p>
                                {metrics.rho >= 1 && !['MMcK', 'MM1K', 'MGcK'].includes(selectedModel) && (
                                    <p className="text-red-400 text-sm mt-1">
                                        Sistema inestable: ρ ≥ 1
                                    </p>
                                )}
                            </div>

                            <div className="p-4 bg-gray-700 rounded-md border border-gray-600">
                                <h4 className="font-medium mb-1 text-blue-200">Tiempo promedio en el sistema (W)</h4>
                                <p className="text-2xl text-gray-200">{metrics.w.toFixed(4)}</p>
                            </div>

                            <div className="p-4 bg-gray-700 rounded-md border border-gray-600">
                                <h4 className="font-medium mb-1 text-blue-200">Tiempo promedio en cola (Wq)</h4>
                                <p className="text-2xl text-gray-200">{metrics.wq.toFixed(4)}</p>
                            </div>

                            <div className="p-4 bg-gray-700 rounded-md border border-gray-600">
                                <h4 className="font-medium mb-1 text-blue-200">Número promedio en el sistema (L)</h4>
                                <p className="text-2xl text-gray-200">{metrics.l.toFixed(4)}</p>
                            </div>

                            <div className="p-4 bg-gray-700 rounded-md border border-gray-600">
                                <h4 className="font-medium mb-1 text-blue-200">Número promedio en cola (Lq)</h4>
                                <p className="text-2xl text-gray-200">{metrics.lq.toFixed(4)}</p>
                            </div>

                            <div className="p-4 bg-gray-700 rounded-md border border-gray-600">
                                <h4 className="font-medium mb-1 text-blue-200">Probabilidad de sistema vacío (P0)</h4>
                                <p className="text-2xl text-gray-200">{metrics.p0.toFixed(4)}</p>
                            </div>

                            {showK && metrics.pk !== undefined && (
                                <div className="p-4 bg-gray-700 rounded-md border border-gray-600">
                                    <h4 className="font-medium mb-1 text-blue-200">Probabilidad de sistema lleno (Pk)</h4>
                                    <p className="text-2xl text-gray-200">{metrics.pk.toFixed(4)}</p>
                                </div>
                            )}
                        </div>

                        <FormulaDisplay model={selectedModel}  />
                    </Card>

                    {modelHasGraphPn[selectedModel] && metrics.pn && (
                        <Card className="p-6 bg-gray-800 border border-gray-700 shadow-lg">
                            <h3 className="text-xl font-bold mb-4 text-blue-300">Distribución de probabilidad de estado (Pn)</h3>
                            <PnDistributionChart probabilities={metrics.pn}  />
                        </Card>
                    )}
                </>
            )}
        </div>
    );
}