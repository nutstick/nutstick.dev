import { keyframes, style, styleVariants } from '@vanilla-extract/css'

const smooth = keyframes({
  '0%': { transform: 'translateX(-200px)' },
  '100%': { transform: 'translateX(200px)' },
})

const lag = keyframes({
  '0%': { transform: 'translateX(-200px)' },
  '76%': { transform: 'translateX(104px)' },
  '77%': { transform: 'translateX(104px)' },
  '100%': { transform: 'translateX(200px)' },
})

const boxBase = style({
  width: '100px',
  height: '100px',
  backgroundColor: '#379683',
  margin: '3em auto',
})

export const box = styleVariants({
  smooth: [boxBase, { animation: `${smooth} 2.5s infinite` }],
  lag: [boxBase, { animation: `${lag} 2.5s steps(15) infinite` }],
})
