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

  const heroAnimationRef = useRef()
  const [{ pageOpacity, headerOpacity, ...transition }, set] = useSpring<
    SpringStyle
  >(() => ({
    ref: heroAnimationRef,
    from: {
      pageOpacity: 0,
      headerOpacity: 0,

      opacity: 0,
      top: 0,
      left: 0,
      width: 0,
      height: 0,
      fontSize: '1.563rem',
    },
  }))

  useEffect(() => {
    async function runAnimation(
      source: null | DOMRect,
      target: DOMRect,
      targetContainer: DOMRect
    ) {
      if (source == null) {
        await set({ pageOpacity: 1, headerOpacity: 1, opacity: 0 })
        return
      }
      try {
        await set({
          pageOpacity: 0,
          headerOpacity: 0,

          top: source.top,
          left: source.left,
          width: source.width,
          height: source.height,
          opacity: 1,
          fontSize: '1.563rem',

          immediate: true,
        })
        // await new Promise(resolve => setTimeout(resolve, 10000))
        await set({
          pageOpacity: 0,
          headerOpacity: 0,
          immediate: true,
        })
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
    const source = transitionState.exit.state
    if (rect && containerRect) {
      runAnimation(isDOMRect(source) ? source : null, rect, containerRect)
    }
  }, [transitionState.exit.state, rect, containerRect])

  const target = useMemo(() => {
    return { opacity: headerOpacity }
  }, [headerOpacity])

  return { ref, containerRef, target, transition, pageOpacity }
}
