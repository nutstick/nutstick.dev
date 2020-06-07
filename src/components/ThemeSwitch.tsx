import React from 'react'
import { useTheme } from 'emotion-theming'
import { Theme } from '../styles/theme'

const ThemeSwitch: React.FC = () => {
  const { toggleTheme } = useTheme<Theme>()
  return (
    <button type="button" onClick={toggleTheme}>
      Switch Theme
    </button>
  )
}

export default ThemeSwitch
