import { create } from 'zustand'

interface SettingsState {
  darkMode: boolean
  showAdvanced: boolean
  toggleDarkMode: () => void
  toggleShowAdvanced: () => void
}

export const useSettingsStore = create<SettingsState>((set) => ({
  darkMode: false,
  showAdvanced: false,
  toggleDarkMode: () =>
    set((state) => ({ darkMode: !state.darkMode })),
  toggleShowAdvanced: () =>
    set((state) => ({ showAdvanced: !state.showAdvanced })),
}))
