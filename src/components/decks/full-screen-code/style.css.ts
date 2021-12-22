import { style, globalStyle } from '@vanilla-extract/css'

export const className = style({})

globalStyle(`${className} pre`, {
  margin: '0 !important',
  overflow: 'auto',
  fontSize: '14px',
})
