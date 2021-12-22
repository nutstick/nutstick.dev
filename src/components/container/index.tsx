import * as React from 'react'
import cx from 'classnames'
import { animated } from 'react-spring'
import type { SpringValue } from 'react-spring'
import { container } from './style.css'

interface ContainerProps {
  className?: string
  style?: {
    opacity: SpringValue<number>
  }
}

const Container: React.FC<ContainerProps> = ({
  children,
  className,
  style,
}) => (
  <animated.div className={cx(className, container)} style={style}>
    {children}
  </animated.div>
)

export default Container
