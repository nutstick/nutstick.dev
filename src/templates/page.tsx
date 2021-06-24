import { graphql } from 'gatsby'
import React from 'react'
import { animated } from 'react-spring'
import styled from '@emotion/styled'

import Container from '../components/Container'
import { usePostEntryAnimation } from '../hooks/use-post-entry-animation'
import MainLayout from '../layouts/main'

const Header = styled(animated.h3)`
  pointer-events: none;
  position: absolute;
`

interface PageTemplateProps {
  data: GatsbyTypes.PageTemplateQueryQuery
}

const PageTemplate: React.FC<PageTemplateProps> = ({ data }) => {
  const { ref, containerRef, target, transition, pageOpacity } =
    usePostEntryAnimation()

  const markdownRemark = data?.markdownRemark
  if (markdownRemark && markdownRemark.frontmatter && markdownRemark.html) {
    const { title } = markdownRemark.frontmatter
    return (
      <MainLayout opacity={pageOpacity} containerRef={containerRef}>
        <Header style={transition}>{title}</Header>
        <Container>
          <animated.h1 ref={ref} style={target}>
            {title}
          </animated.h1>
          <div dangerouslySetInnerHTML={{ __html: markdownRemark.html }} />
        </Container>
      </MainLayout>
    )
  }
  return null
}

export default PageTemplate

export const query = graphql`
  query PageTemplateQuery($slug: String!) {
    site {
      siteMetadata {
        title
        description
        author {
          name
          url
        }
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      excerpt
      frontmatter {
        title
      }
    }
  }
`
