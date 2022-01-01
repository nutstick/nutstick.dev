import { style } from '@vanilla-extract/css'
import { vars } from '../styles/theme'

export const page = style({
  display: 'block',
  flex: '1',
  position: 'relative',
  padding: vars.dimensions.containerPadding,
  marginBottom: '3rem',
})
