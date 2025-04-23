
import React from 'react';
import { Card } from '@/components/ui/Card';

interface FormulaDisplayProps {
  model: string;
}

const FormulaDisplay: React.FC<FormulaDisplayProps> = ({ model }) => {
  const formulas: Record<string, React.ReactNode> = {
    'MM1': (
      <div className="space-y-4">
        <h4 className="font-medium text-blue-300">Fórmulas del modelo M/M/1:</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="font-medium text-blue-200">Factor de utilización:</p>
            <p className="text-gray-300">ρ = λ/μ</p>
          </div>
          <div>
            <p className="font-medium text-blue-200">Probabilidad de sistema vacío:</p>
            <p className="text-gray-300">P₀ = 1 - ρ</p>
          </div>
          <div>
            <p className="font-medium text-blue-200">Probabilidad de n clientes:</p>
            <p className="text-gray-300">Pₙ = (1 - ρ) · ρⁿ</p>
          </div>
          <div>
            <p className="font-medium text-blue-200">Número promedio en el sistema:</p>
            <p className="text-gray-300">L = ρ/(1 - ρ)</p>
          </div>
          <div>
            <p className="font-medium text-blue-200">Número promedio en cola:</p>
            <p className="text-gray-300">Lq = ρ²/(1 - ρ)</p>
          </div>
          <div>
            <p className="font-medium text-blue-200">Tiempo promedio en el sistema:</p>
            <p className="text-gray-300">W = 1/(μ - λ)</p>
          </div>
          <div>
            <p className="font-medium text-blue-200">Tiempo promedio en cola:</p>
            <p className="text-gray-300">Wq = ρ/(μ - λ)</p>
          </div>
        </div>
      </div>
    ),
    'MMc': (
      <div className="space-y-4">
        <h4 className="font-medium text-blue-300">Fórmulas del modelo M/M/c:</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="font-medium text-blue-200">Factor de utilización:</p>
            <p className="text-gray-300">ρ = λ/(c·μ)</p>
          </div>
          <div>
            <p className="font-medium text-blue-200">Probabilidad de sistema vacío:</p>
            <p className="text-gray-300">P₀ = 1/[∑ᵏ⁼⁰ᶜ⁻¹(λ/μ)ᵏ/k! + (λ/μ)ᶜ/(c!(1-ρ))]</p>
          </div>
          <div>
            <p className="font-medium text-blue-200">Probabilidad de n clientes (n ≤ c):</p>
            <p className="text-gray-300">Pₙ = (λ/μ)ⁿ/(n!) · P₀</p>
          </div>
          <div>
            <p className="font-medium text-blue-200">Probabilidad de n clientes (n {'>'} c):</p>
            <p className="text-gray-300">Pₙ = (λ/μ)ⁿ/(c!·cⁿ⁻ᶜ) · P₀</p>
          </div>
          <div>
            <p className="font-medium text-blue-200">Número promedio en cola:</p>
            <p className="text-gray-300">Lq = (P₀·(λ/μ)ᶜ·ρ)/(c!·(1-ρ)²)</p>
          </div>
          <div>
            <p className="font-medium text-blue-200">Número promedio en el sistema:</p>
            <p className="text-gray-300">L = Lq + λ/μ</p>
          </div>
          <div>
            <p className="font-medium text-blue-200">Tiempo promedio en cola:</p>
            <p className="text-gray-300">Wq = Lq/λ</p>
          </div>
          <div>
            <p className="font-medium text-blue-200">Tiempo promedio en el sistema:</p>
            <p className="text-gray-300">W = Wq + 1/μ</p>
          </div>
        </div>
      </div>
    ),
    'MMcK': (
      <div className="space-y-4">
        <h4 className="font-medium text-blue-300">Fórmulas del modelo M/M/c/K:</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="font-medium text-blue-200">Factor de utilización:</p>
            <p className="text-gray-300">ρ = λ/(c·μ)</p>
          </div>
          <div>
            <p className="font-medium text-blue-200">Probabilidad de sistema lleno:</p>
            <p className="text-gray-300">Pₖ = (λ/μ)ᵏ·P₀/(c!·cᵏ⁻ᶜ)</p>
          </div>
          <div>
            <p className="font-medium text-blue-200">Tasa efectiva de llegada:</p>
            <p className="text-gray-300">λeff = λ(1 - Pₖ)</p>
          </div>
          <div>
            <p className="font-medium text-blue-200">Número promedio en cola:</p>
            <p className="text-gray-300">Lq = [P₀(λ/μ)ᶜρ/(c!(1-ρ)²)] · [1-ρᵏ⁻ᶜ⁺¹-(K-c+1)ρᵏ⁻ᶜ(1-ρ)]</p>
          </div>
          <div>
            <p className="font-medium text-blue-200">Número promedio en el sistema:</p>
            <p className="text-gray-300">L = Lq + c - (c-λ/μ)Pₒ</p>
          </div>
          <div>
            <p className="font-medium text-blue-200">Tiempo promedio en cola:</p>
            <p className="text-gray-300">Wq = Lq/λeff</p>
          </div>
          <div>
            <p className="font-medium text-blue-200">Tiempo promedio en el sistema:</p>
            <p className="text-gray-300">W = Wq + 1/μ</p>
          </div>
        </div>
      </div>
    ),
    'MG1': (
      <div className="space-y-4">
        <h4 className="font-medium text-blue-300">Fórmulas del modelo M/G/1:</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="font-medium text-blue-200">Factor de utilización:</p>
            <p className="text-gray-300">ρ = λ/μ</p>
          </div>
          <div>
            <p className="font-medium text-blue-200">Probabilidad de sistema vacío:</p>
            <p className="text-gray-300">P₀ = 1 - ρ</p>
          </div>
          <div>
            <p className="font-medium text-blue-200">Número promedio en cola (Pollaczek-Khinchin):</p>
            <p className="text-gray-300">Lq = [λ²σ² + ρ²]/[2(1-ρ)]</p>
            <p className="text-sm text-gray-400">Donde σ² es la varianza del tiempo de servicio</p>
          </div>
          <div>
            <p className="font-medium text-blue-200">Número promedio en el sistema:</p>
            <p className="text-gray-300">L = Lq + ρ</p>
          </div>
          <div>
            <p className="font-medium text-blue-200">Tiempo promedio en cola:</p>
            <p className="text-gray-300">Wq = Lq/λ</p>
          </div>
          <div>
            <p className="font-medium text-blue-200">Tiempo promedio en el sistema:</p>
            <p className="text-gray-300">W = Wq + 1/μ</p>
          </div>
        </div>
      </div>
    ),
    'GM1': (
      <div className="space-y-4">
        <h4 className="font-medium text-blue-300">Fórmulas del modelo G/M/1:</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="font-medium text-blue-200">Factor de utilización:</p>
            <p className="text-gray-300">ρ = λ/μ</p>
          </div>
          <div>
            <p className="font-medium text-blue-200">Probabilidad de sistema vacío:</p>
            <p className="text-gray-300">P₀ = 1 - ρ</p>
          </div>
          <div>
            <p className="font-medium text-blue-200">Número promedio en cola:</p>
            <p className="text-gray-300">Lq = ρ²(1+C²ₐ)/[2(1-ρ)]</p>
            <p className="text-sm text-gray-400">Donde C²ₐ es el coeficiente de variación al cuadrado de los tiempos entre llegadas</p>
          </div>
          <div>
            <p className="font-medium text-blue-200">Número promedio en el sistema:</p>
            <p className="text-gray-300">L = Lq + ρ</p>
          </div>
          <div>
            <p className="font-medium text-blue-200">Tiempo promedio en cola:</p>
            <p className="text-gray-300">Wq = Lq/λ</p>
          </div>
          <div>
            <p className="font-medium text-blue-200">Tiempo promedio en el sistema:</p>
            <p className="text-gray-300">W = Wq + 1/μ</p>
          </div>
        </div>
      </div>
    ),
    'GG1': (
      <div className="space-y-4">
        <h4 className="font-medium text-blue-300">Fórmulas del modelo G/G/1 (Aproximación de Kingman):</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="font-medium text-blue-200">Factor de utilización:</p>
            <p className="text-gray-300">ρ = λ/μ</p>
          </div>
          <div>
            <p className="font-medium text-blue-200">Probabilidad de sistema vacío:</p>
            <p className="text-gray-300">P₀ ≈ 1 - ρ</p>
          </div>
          <div>
            <p className="font-medium text-blue-200">Número promedio en cola:</p>
            <p className="text-gray-300">Lq ≈ [ρ²(C²ₐ+C²ₛ)]/[2(1-ρ)]</p>
            <p className="text-sm text-gray-400">Donde C²ₐ y C²ₛ son los coeficientes de variación de los tiempos entre llegadas y de servicio</p>
          </div>
          <div>
            <p className="font-medium text-blue-200">Número promedio en el sistema:</p>
            <p className="text-gray-300">L = Lq + ρ</p>
          </div>
          <div>
            <p className="font-medium text-blue-200">Tiempo promedio en cola:</p>
            <p className="text-gray-300">Wq = Lq/λ</p>
          </div>
          <div>
            <p className="font-medium text-blue-200">Tiempo promedio en el sistema:</p>
            <p className="text-gray-300">W = Wq + 1/μ</p>
          </div>
        </div>
      </div>
    ),
    'MM1K': (
      <div className="space-y-4">
        <h4 className="font-medium text-blue-300">Fórmulas del modelo M/M/1/K:</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="font-medium text-blue-200">Factor de utilización:</p>
            <p className="text-gray-300">ρ = λ/μ</p>
          </div>
          <div>
            <p className="font-medium text-blue-200">Probabilidad de sistema vacío:</p>
            <p className="text-gray-300">P₀ = (1-ρ)/(1-ρᵏ⁺¹)</p>
          </div>
          <div>
            <p className="font-medium text-blue-200">Probabilidad de sistema lleno:</p>
            <p className="text-gray-300">Pₖ = ρᵏ·P₀</p>
          </div>
          <div>
            <p className="font-medium text-blue-200">Probabilidad de n clientes:</p>
            <p className="text-gray-300">Pₙ = ρⁿ·P₀</p>
          </div>
          <div>
            <p className="font-medium text-blue-200">Número promedio en el sistema:</p>
            <p className="text-gray-300">L = ρ[1-(K+1)ρᵏ+Kρᵏ⁺¹]/[(1-ρ)(1-ρᵏ⁺¹)]</p>
          </div>
          <div>
            <p className="font-medium text-blue-200">Número promedio en cola:</p>
            <p className="text-gray-300">Lq = L - (1-P₀)</p>
          </div>
          <div>
            <p className="font-medium text-blue-200">Tasa efectiva de llegada:</p>
            <p className="text-gray-300">λeff = λ(1-Pₖ)</p>
          </div>
          <div>
            <p className="font-medium text-blue-200">Tiempo promedio en sistema:</p>
            <p className="text-gray-300">W = L/λeff</p>
          </div>
          <div>
            <p className="font-medium text-blue-200">Tiempo promedio en cola:</p>
            <p className="text-gray-300">Wq = Lq/λeff</p>
          </div>
        </div>
      </div>
    ),
    'MGcK': (
      <div className="space-y-4">
        <h4 className="font-medium text-blue-300">Fórmulas del modelo M/G/c/K (Aproximación):</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="font-medium text-blue-200">Factor de utilización:</p>
            <p className="text-gray-300">ρ = λ/(c·μ)</p>
          </div>
          <div>
            <p className="font-medium text-blue-200">Tiempo en cola (aproximación):</p>
            <p className="text-gray-300">Wq(M/G/c/K) ≈ Wq(M/M/c/K) · (1+C²ₛ)/2</p>
            <p className="text-sm text-gray-400">Donde C²ₛ es el coeficiente de variación al cuadrado del tiempo de servicio</p>
          </div>
          <div>
            <p className="font-medium text-blue-200">Probabilidad de sistema lleno:</p>
            <p className="text-gray-300">Similar a M/M/c/K, pero con ajuste por variabilidad</p>
          </div>
          <div>
            <p className="font-medium text-blue-200">Tasa efectiva de llegada:</p>
            <p className="text-gray-300">λeff = λ(1-Pₖ)</p>
          </div>
          <div>
            <p className="font-medium text-blue-200">Tiempo promedio en sistema:</p>
            <p className="text-gray-300">W = Wq + 1/μ</p>
          </div>
        </div>
        <p className="text-sm italic mt-2 text-gray-400">
          Nota: El modelo M/G/c/K usa aproximaciones. Las fórmulas exactas son muy complejas.
        </p>
      </div>
    ),
  };

  return (
    <Card className="p-4 bg-gray-800 border border-gray-700 shadow-lg">
      {formulas[model] || <p className="text-gray-300">Fórmulas no disponibles para este modelo</p>}
    </Card>
  );
};

export default FormulaDisplay;