import { globalStyle } from '@vanilla-extract/css'
import { vars } from './theme'

globalStyle('body', {
  color: vars.colors.text.primary,
  backgroundColor: vars.colors.backgrounnd.paper,
})

globalStyle('h1, h2, h3, h4, h5, h6, strong', {
  color: vars.colors.text.primary,
})

globalStyle('blockquote', {
  color: vars.colors.text.secondary,
})
