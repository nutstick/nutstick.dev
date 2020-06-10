/* eslint-disable max-len */

const fonts = {
  sansSerif:
    '-apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", Arial, sans-serif',
  serif: 'Georgia, "Times New Roman", Times, serif',
  monospace:
    'Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace, monospace'
}

const breakpoints = {
  xs: 0,
  sm: 576,
  md: 768,
  lg: 992,
  xl: 1200
}

const widths = {
  md: 720,
  lg: 960,
  xl: 1140
}

const dimensions = {
  fontSize: {
    regular: 16,
    large: 18
  },
  headingSizes: {
    h1: 2.441,
    h2: 1.953,
    h3: 1.563,
    h4: 1.25
  },
  lineHeight: {
    regular: 1.45,
    heading: 1.2
  },
  containerPadding: 1.5
}

const theme = {
  colors: {
    primary: {
      whisper: '#fbfafc',
      light: '#92ffc6',
      main: '#5cdb95',
      dark: '#379683',
      contrast: '#000000'
    },
    secondary: {
      main: '#05386b'
    },
    accent: {
      main: '#ffb238'
    },
    success: {
      main: '#37b635'
    },
    warning: {
      main: '#ec1818'
    },
    // ui: {
    //   bright: '#e0d6eb',
    //   light: '#f5f3f7',
    //   whisper: '#fbfafc'
    // },
    // code: '#fcf6f0',
    gray: {
      dark: 'hsla(270, 17.119554496%, 0%, 0.92)',
      copy: 'hsla(270, 15.797828016000002%, 0%, 0.88)',
      calm: 'rgba(0, 0, 0, 0.54)'
    },
    white: '#fff',
    black: '#000'
  },

  fonts,
  breakpoints,
  widths,
  dimensions,
  heights: {
    header: 60
  },

  getEmSize: (size: number) => size / dimensions.fontSize.regular,
  toggleTheme: () => {}
} as const

export const themeLight = {
  ...theme,
  colors: {
    ...theme.colors,
    shadow: 'rgba(166, 224, 220, 0.22)',
    text: {
      primary: 'rgba(27, 32, 62, 0.87)',
      secondary: 'rgba(0, 0, 0, 0.54)',
      disabled: 'rgba(0, 0, 0, 0.38)',
      hint: 'rgba(0, 0, 0, 0.38)',
      icon: 'rgba(0, 0, 0, 0.38)'
    },
    backgrounnd: {
      paper: '#fff',
      default: '#fafafa'
    }
  }
}

export const themeDark = {
  ...theme,
  colors: {
    ...theme.colors,
    shadow: 'rgba(11, 19, 18, 0.22)',
    text: {
      primary: '#fff',
      secondary: 'rgba(255, 255, 255, 0.7)',
      disabled: 'rgba(255, 255, 255, 0.5)',
      hint: 'rgba(255, 255, 255, 0.5)',
      icon: 'rgba(255, 255, 255, 0.5)'
    },
    backgrounnd: {
      paper: '#202931',
      default: '#181f24,'
    }
  }
}

export type Theme = typeof themeDark | typeof themeLight
