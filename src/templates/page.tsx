import React, { useState, useRef } from 'react'
import { graphql } from 'gatsby'
import { animated, SpringValue, useSpring } from 'react-spring'
import styled from '@emotion/styled'

import Container from '../components/Container'
import { useEffect } from 'react'

const Header = styled(animated.h3)`
  pointer-events: none;
  position: absolute;
`

interface PageTemplateProps {
  data: GatsbyTypes.PageTemplateQueryQuery
}

const PageTemplate: React.FC<PageTemplateProps> = ({ data }) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const ref = useRef<HTMLHeadingElement>(null)
  const [enter, setEnter] = useState(false)
  const style = useSpring<{
    opacity: SpringValue<number>
  }>({
    to: { opacity: enter ? 1 : 0 },
    config: { duration: 1000 },
  })

  const transition = { opacity: style.opacity.to([0, 1], [1, 0]) }

  useEffect(() => {
    setEnter(true)
  }, [])

  const markdownRemark = data?.markdownRemark
  if (markdownRemark && markdownRemark.frontmatter && markdownRemark.html) {
    const { title } = markdownRemark.frontmatter
    return (
      <>
        <Header style={transition}>{title}</Header>
        <Container style={style}>
          <animated.h1 ref={ref} style={style}>
            {title}
          </animated.h1>
          <div dangerouslySetInnerHTML={{ __html: markdownRemark.html }} />
        </Container>
      </>
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
