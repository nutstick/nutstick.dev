import { createContext } from 'use-context-selector'
import type { SpringRef } from 'react-spring'
import type { CSSProperties } from 'react'

export interface Hero {
  id: string
  ref: HTMLElement
  springRef: SpringRef
  fontSize: CSSProperties['fontSize']
  color: CSSProperties['color']
}

export type HeroGroupState = Record<string, string[]>

export interface AnimationContextValue {
  register: (id: string, hero: Hero) => void
  unregister: (id: string, elementId: string) => void
}

export const HeroGroupContext = createContext<HeroGroupState>({})
export const AnimationContext = createContext<AnimationContextValue>({
  register: () => {},
  unregister: () => {},
})
