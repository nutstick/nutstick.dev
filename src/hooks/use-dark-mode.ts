import { useEffect, useState } from 'react'

export type ThemeMode = 'light' | 'dark'

function isThemeMode(theme: string | null): theme is ThemeMode {
  return theme ? ['light', 'dark'].includes(theme) : false
}

export const useDarkMode = () => {
  const [theme, setTheme] = useState<ThemeMode>('light')
  const [mounted, setComponentMounted] = useState(false)
  const setMode = (mode: ThemeMode) => {
    window.localStorage.setItem('theme', mode)
    setTheme(mode)
  }

  const toggleTheme = () => {
    if (theme === 'light') {
      setMode('dark')
    } else {
      setMode('light')
    }
  }

  useEffect(() => {
    const localTheme = window.localStorage.getItem('theme')
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches && !localTheme) {
      setMode('dark')
    } else if (isThemeMode(localTheme)) {
      setTheme(localTheme)
    } else {
      setMode('light')
    }
    setComponentMounted(true)
  }, [])

  return [theme, toggleTheme, mounted]
}
