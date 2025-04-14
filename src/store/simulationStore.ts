import { create } from 'zustand'
import { SimulationParams, SimulationResult } from '@/types/simulation'

interface SimulationState {
  params: SimulationParams | null
  result: SimulationResult | null
  loading: boolean
  setParams: (params: SimulationParams) => void
  setResult: (result: SimulationResult) => void
  setLoading: (value: boolean) => void
  reset: () => void
}

export const useSimulationStore = create<SimulationState>((set) => ({
  params: null,
  result: null,
  loading: false,
  setParams: (params) => set({ params }),
  setResult: (result) => set({ result }),
  setLoading: (value) => set({ loading: value }),
  reset: () => set({ params: null, result: null, loading: false }),
}))
