import type { ReactNode, Reducer } from 'react'
import React, {
  useCallback,
  useEffect,
  useMemo,
  useReducer,
  useRef,
} from 'react'
import { animated, useSprings, useSpringRef, useTransition } from 'react-spring'
import { AnimationContext, HeroGroupContext } from '../context'
import ThemeProvider from '../../theme-provider'
import Ghost from '../ghost'
import { className } from './style.css'
import type { AnimationContextValue, Hero, HeroGroupState } from '../context'

interface AnimationProviderProps {
  location: string
  children: React.ReactNode
}

type Action =
  | { type: 'add'; id: string; elementId: string }
  | { type: 'remove'; id: string; elementId: string }

function getRect<T extends HTMLElement>(ref: T) {
  const rect = ref.getBoundingClientRect()
  return {
    left: rect.left,
    right: rect.right,
    bottom: rect.bottom,
    top: rect.top,
    height: rect.height,
  }
}

const reducer: Reducer<HeroGroupState, Action> = (state, action) => {
  switch (action.type) {
    case 'add': {
      if (state[action.id] && state[action.id].includes(action.elementId))
        return state
      return {
        ...state,
        [action.id]: (state[action.id] || []).concat(action.elementId),
      }
    }
    case 'remove': {
      if (state[action.id] == null) return state
      const heros = state[action.id].filter((h) => h !== action.elementId)
      if (heros.length === 0) {
        const { [action.id]: deleted, ...rest } = state
        return rest
      }
      return {
        ...state,
        [action.id]: heros,
      }
    }
    default:
      return state
  }
}

const useHeroGroupManager = () => {
  const [groups, dispatch] = useReducer(reducer, {})
  const heroMap = useRef<Record<string, Hero>>({})

  const heroContextValue = useMemo(() => groups, [groups])
  const animationContextValue: AnimationContextValue = useMemo(
    () => ({
      register: (id, hero) => {
        heroMap.current[hero.id] = hero
        dispatch({
          type: 'add',
          id,
          elementId: hero.id,
        })
      },
      unregister: (id, elementId) => {
        delete heroMap.current[elementId]
        dispatch({
          type: 'remove',
          id,
          elementId,
        })
      },
    }),
    []
  )

  const transitioningGroup = Object.keys(groups)
    .filter((id) => groups[id].length >= 2)
    .map((id) => ({
      id,
      group: groups[id].map((elementId) => heroMap.current[elementId]),
    }))

  const [springs, api] = useSprings(transitioningGroup.length, (index) => {
    const [reference] = transitioningGroup[index].group

    return {
      ...getRect(reference.ref),
      fontSize: reference.fontSize,
      color: reference.color,
    }
  })

  const runAnimation = useCallback(
    () =>
      api.start((index) => {
        const target = transitioningGroup[index].group[1]

        return {
          ...getRect(target.ref),
          fontSize: target.fontSize,
          color: target.color,
        }
      }),
    [api, transitioningGroup]
  )

  const renderTransitionElements = () =>
    springs.map((style, index) => (
      <Ghost
        key={transitioningGroup[index].id}
        group={transitioningGroup[index].group}
        style={style}
      />
    ))

  return {
    heroContextValue,
    animationContextValue,
    transitioningGroup,
    runAnimation,
    renderTransitionElements,
  }
}

const useVisitedRoutes = (location: string, children: ReactNode) => {
  const visitedRoutes = useRef<Record<string, React.ReactNode>>({})
  const exists = Object.hasOwnProperty.call(visitedRoutes.current, location)
  if (!exists) {
    visitedRoutes.current[location] = children
  }

  return visitedRoutes
}

const AnimationProvider: React.FC<AnimationProviderProps> = ({
  location,
  children,
}) => {
  const {
    heroContextValue,
    animationContextValue,
    transitioningGroup,
    runAnimation,
    renderTransitionElements,
  } = useHeroGroupManager()
  const visitedRoutes = useVisitedRoutes(location, children)
  const transitionRef = useSpringRef()
  const transitions = useTransition(location, {
    ref: transitionRef,
    from: {
      opacity: 0.01,
    },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
    unique: true,
  })

  useEffect(() => {
    if (!transitioningGroup.length) {
      transitionRef.start({
        to: { opacity: 1 },
      })
    } else {
      const run = async () => {
        transitionRef.stop()

        await runAnimation()
        transitionRef.start()
      }
      run()
    }
  }, [location, runAnimation, transitionRef, transitioningGroup])

  return (
    <HeroGroupContext.Provider value={heroContextValue}>
      <AnimationContext.Provider value={animationContextValue}>
        <ThemeProvider>
          {transitions((style, item) => (
            <animated.div key={item} className={className} style={style}>
              {item === location
                ? // Entering view
                  children
                : // Exiting view
                  visitedRoutes.current[item]}
            </animated.div>
          ))}
        </ThemeProvider>
        {renderTransitionElements()}
      </AnimationContext.Provider>
    </HeroGroupContext.Provider>
  )
}

export default AnimationProvider
