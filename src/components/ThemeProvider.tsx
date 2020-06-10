import React from 'react'
import { Global, css } from '@emotion/core'
import { ThemeProvider as EmotionThemeProvider } from 'emotion-theming'
import { useDarkMode } from '../hooks/use-dark-mode'
import {
  themeLight,
  themeDark,
  Theme,
  deckThemeLight,
  deckThemeDark
} from '../styles/theme'
import normalize from '../styles/normalize'
import globalTheme from '../styles/global-theme'

interface Props {
  deck?: boolean
  children: React.ReactNode
}

const ThemeProvider: React.FC<Props> = ({ deck = false, children }) => {
  const [mode, toggleTheme, mounted] = useDarkMode()
  const theme = deck
    ? mode === 'light'
      ? { ...deckThemeLight, toggleTheme }
      : { ...deckThemeDark, toggleTheme }
    : mode === 'light'
    ? { ...themeLight, toggleTheme }
    : { ...themeDark, toggleTheme }

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
