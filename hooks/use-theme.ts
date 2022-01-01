import { useContext } from 'use-context-selector'
import { ThemeContext } from '../components/theme-provider/context'

export const useTheme = () => useContext(ThemeContext)
