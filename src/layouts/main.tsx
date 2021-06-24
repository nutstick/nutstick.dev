import { graphql, useStaticQuery } from 'gatsby'
import 'modern-normalize'
import React, { useMemo } from 'react'
import Helmet from 'react-helmet'
import { animated, SpringValue } from 'react-spring'
import '../styles/normalize'
import styled from '@emotion/styled'
import { IndexLayoutQuery } from './__generated__/IndexLayoutQuery'

import Header from '../components/Header'
import LayoutMain from '../components/LayoutMain'
import LayoutRoot from '../components/LayoutRoot'

const StyledPage = styled(animated.div)`
  display: block;
  flex: 1;
  position: relative;
  padding: ${({ theme: { dimensions } }) => dimensions.containerPadding}rem;
  margin-bottom: 3rem;
`

interface Props {
  containerRef?: any
  opacity?: SpringValue
}

const IndexLayout: React.FC<Props> = ({ containerRef, opacity, children }) => {
  const data = useStaticQuery<IndexLayoutQuery>(graphql`
    query IndexLayoutQuery {
      site {
        siteMetadata {
          title
          description
          keywords
          author {
            name
            url
            github
            twitter
            linkedin
            email
          }
        }
      }
    }
  `)

  const style = useMemo(() => ({ opacity }), [opacity])
  return (
    <LayoutRoot>
      <Helmet
        title={data.site?.siteMetadata?.title ?? undefined}
        meta={[
          ...(data.site?.siteMetadata?.description
            ? [
                {
                  name: 'description',
                  content: data.site.siteMetadata.description,
                },
              ]
            : []),
          ...(data.site?.siteMetadata?.keywords
            ? [{ name: 'keywords', content: data.site.siteMetadata.keywords }]
            : []),
        ]}
      />
      <Header
        title={data.site?.siteMetadata?.title}
        author={data.site?.siteMetadata?.author}
      />
      <LayoutMain>
        <StyledPage ref={containerRef} style={style}>
          {children}
        </StyledPage>
      </LayoutMain>
    </LayoutRoot>
  )
}

export default IndexLayout
