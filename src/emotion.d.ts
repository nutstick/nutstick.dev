import '@emotion/react'

type InternalTheme = typeof themeDark | typeof themeLight

declare module '@emotion/react' {
  export interface Theme {
    colors: {
      primary: {
        whisper: string
        light: string
        main: string
        dark: string
        contrast: string
      }
      secondary: {
        main: string
      }
      accent: {
        main: string
      }
      success: {
        main: string
      }
      warning: {
        main: string
      }
      // ui: {
      //   bright: string,
      //   light: string,
      //   whisper: string
      // },
      // code: string,
      gray: {
        dark: string
        copy: string
        calm: string
      }
      white: string
      black: string
      shadow: string
      text: {
        primary: string
        secondary: string
        disabled: string
        hint: string
        icon: string
      }
      backgrounnd: {
        paper: string
        default: string
      }
    }

    fonts
    breakpoints
    widths
    dimensions
    heights: {
      header: 72
    }

    getEmSize: (size: number) => number
    toggleTheme: () => void
    mode: 'light' | 'dark'
  }
}
