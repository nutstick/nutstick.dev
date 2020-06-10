/* eslint-disable @typescript-eslint/ban-ts-ignore */
import React from 'react'
import { graphql } from 'gatsby'
import { MDXRenderer } from 'gatsby-plugin-mdx'

import LayoutRoot from '../components/LayoutRoot'
import { Code, Pre, Wrapper, H1, Li } from '../components/decks'

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

const components = {
  wrapper: Wrapper,
  code: Code,
  pre: Pre,
  h1: H1,
  li: Li
}

const DeckTemplate: React.FC<DeckTemplateProps> = ({
  data: {
    deck: { id, body }
  },
  ...props
}) => {
  return (
    <LayoutRoot deck>
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
