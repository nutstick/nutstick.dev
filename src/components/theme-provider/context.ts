import { createContext } from 'use-context-selector'

export interface ThemeContextValue {
  mode: 'light' | 'dark'
  toggleTheme: () => void
}

export const ThemeContext = createContext({
  mode: 'light',
  toggleTheme: () => {},
})
