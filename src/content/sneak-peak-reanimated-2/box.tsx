/** @jsx jsx */
import React from 'react'
import { jsx, css, keyframes } from '@emotion/react'

const smooth = keyframes`
  0% {
    transform: translateX(-200px);
  }
  100% {
    transform: translateX(200px);
  }
`

const lag = keyframes`
  0% {
    transform: translateX(-200px);
  }
  76% {
    transform: translateX(104px);
  }
  77% {
    transform: translateX(104px);
  }
  100% {
    transform: translateX(200px);
  }
`

const Box: React.FC<{ animation: 'smooth' | 'lag' }> = ({ animation }) => (
  <div
    css={css`
      width: 100px;
      height: 100px;
      background-color: #379683;
      animation: ${animation === 'smooth' ? smooth : lag} 2.5s
        ${animation === 'smooth' ? '' : 'steps(15)'} infinite;
      margin: 3em auto;
    `}
  />
)

export default Box
