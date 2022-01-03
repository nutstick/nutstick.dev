import { createThemeContract, createTheme } from '@vanilla-extract/css';

const fonts = {
  sansSerif:
    '-apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", Arial, sans-serif',
  serif: 'Georgia, "Times New Roman", Times, serif',
  monospace:
    'Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace, monospace',
};

const breakpoints = {
  xs: '0px',
  sm: '576px',
  md: '768px',
  lg: '992px',
  xl: '1200px',
};

const widths = {
  md: '720px',
  lg: '960px',
  xl: '1140px',
};

export const colors = createThemeContract({
  colors: {
    primary: {
      whisper: null,
      light: null,
      main: null,
      dark: null,
      contrast: null,
    },
    secondary: {
      main: null,
    },
    accent: {
      main: null,
    },
    success: {
      main: null,
    },
    warning: {
      main: null,
    },
    gray: {
      dark: null,
      copy: null,
      calm: null,
    },
    white: null,
    black: null,
    shadow: null,
    text: {
      primary: null,
      lightPrimary: null,
      secondary: null,
      disabled: null,
      hint: null,
      icon: null,
    },
    backgrounnd: {
      paper: null,
      default: null,
    },
  },
  fonts: {
    sansSerif: null,
    serif: null,
    monospace: null,
  },
  breakpoints,
  widths,
  heights: {
    header: null,
  },
  filter: null,
});

const theme = {
  colors: {
    primary: {
      whisper: '#fbfafc',
      light: '#92ffc6',
      main: '#5cdb95',
      dark: '#379683',
      contrast: '#000000',
    },
    secondary: {
      main: '#05386b',
    },
    accent: {
      main: '#ffb238',
    },
    success: {
      main: '#37b635',
    },
    warning: {
      main: '#ec1818',
    },
    gray: {
      dark: 'hsla(270, 17.119554496%, 0%, 0.92)',
      copy: 'hsla(270, 15.797828016000002%, 0%, 0.88)',
      calm: 'rgba(0, 0, 0, 0.54)',
    },
    white: '#fff',
    black: '#000',
  },

  fonts,
  breakpoints,
  widths,
  heights: {
    header: '72px',
  },
};

export const themeLight = createTheme(colors, {
  ...theme,
  colors: {
    ...theme.colors,
    shadow: 'rgba(166, 224, 220, 0.22)',
    text: {
      primary: 'rgba(27, 32, 62, 0.87)',
      lightPrimary: 'rgba(27, 32, 62, 0.435)',
      secondary: 'rgba(0, 0, 0, 0.54)',
      disabled: 'rgba(0, 0, 0, 0.38)',
      hint: 'rgba(0, 0, 0, 0.38)',
      icon: 'rgba(0, 0, 0, 0.38)',
    },
    backgrounnd: {
      paper: '#fff',
      default: '#fafafa',
    },
  },
  filter: 'invert(0.5) sepia(1) hue-rotate(103deg) saturate(4)',
});

export const themeDark = createTheme(colors, {
  ...theme,
  colors: {
    ...theme.colors,
    primary: {
      ...theme.colors.primary,
      contrast: '#5cdb95',
    },
    shadow: 'rgba(11, 19, 18, 0.22)',
    text: {
      primary: '#fff',
      lightPrimary: 'rgba(255, 255, 255, 0.5)',
      secondary: 'rgba(255, 255, 255, 0.7)',
      disabled: 'rgba(255, 255, 255, 0.5)',
      hint: 'rgba(255, 255, 255, 0.5)',
      icon: 'rgba(255, 255, 255, 0.5)',
    },
    backgrounnd: {
      paper: '#202931',
      default: '#181f24,',
    },
  },
  filter: 'invert(1)',
});
