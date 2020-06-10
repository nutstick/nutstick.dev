/* eslint-disable @typescript-eslint/ban-ts-ignore */
import React from 'react'
import { graphql } from 'gatsby'
import { MDXRenderer } from 'gatsby-plugin-mdx'
import { preToCodeBlock } from 'mdx-utils'
// @ts-ignore
import Deck from 'gatsby-theme-mdx-deck/src/components/deck'
// @ts-ignore
import splitSlides from 'gatsby-theme-mdx-deck/src/split-slides'

import { useTheme } from 'emotion-theming'
import LayoutRoot from '../components/LayoutRoot'
import { Theme } from '../styles/theme'
import Code from '../components/Code'

interface DeckTemplateProps {
  data: {
    deck: {
      id: string
      body: string
      frontmatter: {
        title: string
      }
    }
  }
}

const wrapper = (props: any) => {
  const theme = useTheme<Theme>()
  const slides = splitSlides(props)
  return (
    <Deck
      {...props}
      slides={slides}
      theme={{
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

const components = {
  wrapper,
  code: (props: any) => {
    return <Code {...props} />
  },
  pre: (props: any) => {
    const preProps = preToCodeBlock(props)
    if (preProps) {
      return <Code {...preProps} />
    }
    return <pre {...props} />
  }
}

const DeckTemplate: React.FC<DeckTemplateProps> = ({
  data: {
    deck: { id, body }
  },
  ...props
}) => {
  return (
    <LayoutRoot>
      <MDXRenderer components={components} {...props}>
        {body}
      </MDXRenderer>
    </LayoutRoot>
  )
}

export default DeckTemplate

export const pageQuery = graphql`
  query DeckTemplateQuery($id: String!) {
    deck: deck(id: { eq: $id }) {
      id
      body
      frontmatter {
        title
      }
    }
  }
`
