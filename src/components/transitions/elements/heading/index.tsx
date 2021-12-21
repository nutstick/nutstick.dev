import type { CSSProperties } from 'react'
import React, { useEffect } from 'react'
import { useContextSelector } from 'use-context-selector'
import cx from 'classnames'
import { animated, useSpring, useSpringRef } from 'react-spring'
import { AnimationContext, HeroGroupContext } from '../../context'
import { className as textClassName } from './style.css'
import { useId } from '../../../../hooks/use-id'

interface Props
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  > {
  id: string
  fontSize: CSSProperties['fontSize']
  color: CSSProperties['color']
}

const Heading = ({ id, className, fontSize, color, ...props }: Props) => {
  const elementId: string = useId()
  const register = useContextSelector(
    AnimationContext,
    (state) => state.register
  )
  const unregister = useContextSelector(
    AnimationContext,
    (state) => state.unregister
  )
  const displayed = useContextSelector(HeroGroupContext, (groups) =>
    groups[id] ? groups[id].findIndex((eid) => eid === elementId) === 0 : false
  )

  const springRef = useSpringRef()
  const style = useSpring({
    ref: springRef,
    from: { opacity: +displayed },
    to: { opacity: +!displayed },
    immediate: true,
  })

  useEffect(() => () => unregister(id, elementId), [elementId, id, unregister])

  return (
    <animated.div
      className={cx(className, textClassName)}
      // @ts-expect-error https://github.com/DefinitelyTyped/DefinitelyTyped/issues/35572
      ref={(ref: HTMLDivElement | null) => {
        if (ref) {
          register(id, { ref, springRef, id: elementId, fontSize, color })
        }
      }}
      style={{ ...style, fontSize, color }}
      {...props}
    />
  )
}

export default Heading
