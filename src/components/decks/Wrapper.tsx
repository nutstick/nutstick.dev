/* eslint-disable @typescript-eslint/ban-ts-ignore */
import React from 'react'
// @ts-ignore
import Deck from 'gatsby-theme-mdx-deck/src/components/deck'
// @ts-ignore
import splitSlides from 'gatsby-theme-mdx-deck/src/split-slides'
import { useTheme } from 'emotion-theming'
import { Theme } from '../../styles/theme'

type Props = any

const Wrapper: React.FC<Props> = props => {
  const theme = useTheme<Theme>()
  const slides = splitSlides(props)
  const { components } = props

  return (
    <Deck
      {...props}
      slides={slides}
      theme={{
        components,
        colors: {
          text: theme.colors.text.primary,
          background: theme.colors.backgrounnd.paper,
          primary: theme.colors.primary
        }
        // fontSizes: [12, 14, 16, 20, 24, 32, 48, 64]
      }}
    />
  )
}

export default Wrapper
