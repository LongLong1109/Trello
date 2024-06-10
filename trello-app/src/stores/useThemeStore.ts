import { create } from 'zustand'
import { persist } from 'zustand/middleware'

type ThemeStoreState = {
  checked: boolean
  setChecked: (checked: boolean) => void
}

const INITIAL_THEME_STORE = {
  checked: false,
}
const useThemeStore = create(
  persist<ThemeStoreState>(
    (set) => ({
      ...INITIAL_THEME_STORE,
      setChecked: (checked) => set({ checked }),
    }),
    {
      name: 'theme',
    },
  ),
)

export default useThemeStore
