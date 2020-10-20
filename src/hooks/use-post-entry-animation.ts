import { useTransitionState } from 'gatsby-plugin-transition-link/hooks'
import { CSSProperties, useEffect, useMemo, useRef } from 'react'
import { useSpring } from 'react-spring'

import { isDOMRect } from '../utils/isDOMRect'
import { useMeasureNode } from './use-measure-node'

type SpringStyle = Pick<
  CSSProperties,
  'opacity' | 'top' | 'left' | 'width' | 'height' | 'fontSize'
> & {
  pageOpacity: CSSProperties['opacity']
  headerOpacity: CSSProperties['opacity']
}

export function usePostEntryAnimation() {
  const { ref, rect } = useMeasureNode()
  const { ref: containerRef, rect: containerRect } = useMeasureNode()
  const transitionState = useTransitionState<{} | DOMRect>()
  const source = isDOMRect(transitionState.exit.state)
    ? transitionState.exit.state
    : null

  const heroAnimationRef = useRef()
  const [{ pageOpacity, headerOpacity, ...transition }, set] = useSpring<
    SpringStyle
  >(
    () => ({
      ref: heroAnimationRef,
      from: {
        pageOpacity: source ? 0 : 1,
        headerOpacity: source ? 0 : 1,

        opacity: source ? 1 : 1,
        top: source?.top,
        left: source?.left,
        width: source?.width,
        height: source?.height,
        fontSize: '1.563rem',
      },
    }),
    [source]
  )

  useEffect(() => {
    async function runAnimation(target: DOMRect, targetContainer: DOMRect) {
      try {
        await set({
          pageOpacity: 1,
          headerOpacity: 0,

          opacity: 1,
          top: target.top - targetContainer.top - 24,
          left: target.left - targetContainer.left,
          width: target.width,
          height: target.height,
          fontSize: '2.441rem',

          immediate: false,
          config: {
            duration: 5000,
          },
        })
        await set({
          pageOpacity: 1,
          headerOpacity: 1,
          opacity: 0,
          immediate: true,
        })
      } catch (err) {
        console.log(err)
      }
    }
    if (rect && containerRect && source) {
      runAnimation(rect, containerRect)
    }
  }, [transitionState.exit.state, rect, containerRect])

  const target = useMemo(() => {
    return { opacity: headerOpacity }
  }, [headerOpacity])

  return { ref, containerRef, target, transition, pageOpacity }
}
