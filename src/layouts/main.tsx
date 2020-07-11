import { graphql, useStaticQuery } from 'gatsby'
import 'modern-normalize'
import React, { useMemo } from 'react'
import Helmet from 'react-helmet'
import { animated, SpringValue } from 'react-spring'
import Header from '../components/Header'
import LayoutMain from '../components/LayoutMain'
import LayoutRoot from '../components/LayoutRoot'
import '../styles/normalize'
import styled from '../styles/styled'

const StyledPage = styled(animated.div)`
  display: block;
  flex: 1;
  position: relative;
  padding: ${({ theme: { dimensions } }) => dimensions.containerPadding}rem;
  margin-bottom: 3rem;
`

interface StaticQueryProps {
  site: {
    siteMetadata: {
      title: string
      description: string
      keywords: string
    }
  }
}

interface Props {
  containerRef?: any
  opacity?: SpringValue
}

const IndexLayout: React.FC<Props> = ({ containerRef, opacity, children }) => {
  const data = useStaticQuery<StaticQueryProps>(graphql`
    query IndexLayoutQuery {
      site {
        siteMetadata {
          title
          description
        }
      }
    }
  `)

  const style = useMemo(() => {
    return { opacity }
  }, [opacity])
  return (
    <LayoutRoot>
      <Helmet
        title={data.site.siteMetadata.title}
        meta={[
          { name: 'description', content: data.site.siteMetadata.description },
          { name: 'keywords', content: data.site.siteMetadata.keywords },
        ]}
      />
      <Header title={data.site.siteMetadata.title} />
      <LayoutMain>
        <StyledPage ref={containerRef} style={style}>
          {children}
        </StyledPage>
      </LayoutMain>
    </LayoutRoot>
  )
}

export default IndexLayout
