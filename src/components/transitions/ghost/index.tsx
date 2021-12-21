import type { ComponentProps } from 'react'
import React, { useRef, useLayoutEffect } from 'react'
import type { AnimatedComponent } from 'react-spring'
import { animated } from 'react-spring'
import cx from 'classnames'
import type { Hero } from '../context'
import { className } from './style.css'

interface GhostProps {
  group: Hero[]
  style: ComponentProps<AnimatedComponent<'div'>>['style']
}

const Ghost: React.FC<GhostProps> = ({ group, style }) => {
  const [reference] = group
  const ref = useRef<HTMLDivElement | null>(null)

  // Clone node
  useLayoutEffect(() => {
    if (reference.ref?.hasChildNodes()) {
      reference.ref?.childNodes.forEach((node) => {
        ref.current?.appendChild(node.cloneNode(true))
      })
    }
  }, [reference.ref])

  return (
    <animated.span
      ref={ref}
      className={cx(className, reference.ref.className)}
      style={style}
    />
  )
}

export default Ghost
