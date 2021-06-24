import React from 'react'
import {
  Global,
  css,
  ThemeProvider as EmotionThemeProvider,
} from '@emotion/react'

import { useDarkMode } from '../hooks/use-dark-mode'
import {
  themeLight,
  themeDark,
  deckThemeLight,
  deckThemeDark,
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
      <Global styles={(t) => css(normalize(t))} />
      <Global styles={(t) => css(globalTheme(t))} />
      {children}
    </EmotionThemeProvider>
  )
}

export default ThemeProvider
