import React from 'react'
import { Global, css } from '@emotion/core'
import { ThemeProvider as EmotionThemeProvider } from 'emotion-theming'
import { useDarkMode } from '../hooks/use-dark-mode'
import { themeLight, themeDark, Theme } from '../styles/theme'
import normalize from '../styles/normalize'
import globalTheme from '../styles/global-theme'

const ThemeProvider: React.FC = ({ children }) => {
  const [mode, toggleTheme, mounted] = useDarkMode()
  const theme = mode === 'light' ? { ...themeLight, toggleTheme } : { ...themeDark, toggleTheme }

  if (!mounted) {
    return null
  }
  return (
    <EmotionThemeProvider theme={theme}>
      <Global<Theme> styles={t => css(normalize(t))} />
      <Global<Theme> styles={t => css(globalTheme(t))} />
      {children}
    </EmotionThemeProvider>
  )
}

export default ThemeProvider
