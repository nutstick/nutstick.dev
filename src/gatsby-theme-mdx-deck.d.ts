type Theme = any

const modes = {
  normal: 'NORMAL',
  presenter: 'PRESENTER',
  overview: 'OVERVIEW',
  grid: 'GRID',
  print: 'PRINT',
} as const

interface DeckContextValue {
  slug: string
  length: number
  index: number
  steps: any
  notes: any
  theme: Theme
  preview?: boolean
  index: number
  mode: modes[keyof mode]
}

type Slides = React.ReactElement[] & {
  head: {
    props: any
    children: Ract.ReactNode
  }
}

declare module 'gatsby-theme-mdx-deck' {
  import { WrapPageElementBrowserArgs } from 'gatsby'
  export const wrapPageElement: (
    props: WrapPageElementBrowserArgs
  ) => React.ReactElement
}

declare module 'gatsby-theme-mdx-deck/src/components/deck' {
  declare const Deck: React.FC<{
    slides: Slides
    pageContext: { title: string; slug: string }
    theme: Theme
    themes: Theme[]
  }>
  export default Deck
}

declare module 'gatsby-theme-mdx-deck/src/hooks/use-keyboard' {
  export default function useKeyboard(): void
}

declare module 'gatsby-theme-mdx-deck/src/hooks/use-storage' {
  export default function useStorage(): void
}

declare module 'gatsby-theme-mdx-deck/src/hooks/use-deck' {
  export default function useDeck(): DeckContextValue
}

declare module 'gatsby-theme-mdx-deck/src/constants' {
  export { modes }
}

declare module 'gatsby-theme-mdx-deck/src/split-slides' {
  export default function splitSlides(props: {
    children: React.ReactNodeArray
  }): Slides
}

declare module 'gatsby-theme-mdx-deck/src/context' {
  export { DeckContextValue }

  declare const DeckContext: React.Context<DeckContextValue>
  export default DeckContext
}
