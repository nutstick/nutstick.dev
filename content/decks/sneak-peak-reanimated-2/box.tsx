import React from 'react'
import { box } from './style.css'

const Box: React.FC<{ animation: 'smooth' | 'lag' }> = ({ animation }) => (
  <div className={box[animation]} />
)

export default Box
