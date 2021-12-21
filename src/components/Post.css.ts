import { style } from '@vanilla-extract/css'

export const post = style({
  boxShadow: 'none',
  ':hover': {
    textDecoration: 'none',
  },
})

export const header = style({
  marginTop: '1.414rem',
  marginBottom: '0.5rem',
})
