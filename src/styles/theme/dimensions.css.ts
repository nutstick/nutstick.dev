import { createTheme } from '@vanilla-extract/css'

export const [blog, dimensions] = createTheme({
  fontSize: {
    regular: '16px',
    large: '18px',
  },
  headingSizes: {
    h1: '2.441rem',
    h2: '1.953rem',
    h3: '1.563rem',
    h4: '1.25rem',
  },
  lineHeight: {
    regular: '1.45',
    heading: '1.2',
  },
  containerPadding: '1.5rem',
})

export const deck = createTheme(dimensions, {
  fontSize: {
    regular: '20px',
    large: '24px',
  },
  headingSizes: {
    h1: '2.441rem',
    h2: '1.953rem',
    h3: '1.563rem',
    h4: '1.25rem',
  },
  lineHeight: {
    regular: '1.45',
    heading: '1.2',
  },
  containerPadding: '1.5rem',
})
