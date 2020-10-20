/* eslint-disable @typescript-eslint/ban-ts-ignore */
import React from 'react'
import Deck from 'gatsby-theme-mdx-deck/src/components/deck'
import splitSlides from 'gatsby-theme-mdx-deck/src/split-slides'
import { useTheme } from 'emotion-theming'
import { Theme } from '../../styles/theme'
import Header from './Header'

type Props = any

const Wrapper: React.FC<Props> = props => {
  const { title } = props
  const theme = useTheme<Theme>()
  const slides = splitSlides(props)
  const { components } = props

  return (
    <>
      <Deck
        {...props}
        slides={slides}
        theme={{
          components,
          colors: {
            text: theme.colors.text.primary,
            background: theme.colors.backgrounnd.paper,
            primary: theme.colors.primary,
          },
          lineHeights: {
            body: 1.5,
            heading: 1.125,
          },
          styles: {
            img: {
              width: '100vw',
              maxWidth: '100%',
              height: '100vh',
              objectFit: 'contain',
            },
            code: {
              fontFamily: 'monospace',
            },
            pre: {
              fontFamily: 'monospace',
            },
            Header: {
              px: 3,
            },
            Footer: {
              px: 3,
            },
          },
          // fontSizes: [12, 14, 16, 20, 24, 32, 48, 64]
        }}
      />
      <Header title={title} />
    </>
  )
}

export default Wrapper
