import React from 'react'
import { graphql, useStaticQuery } from 'gatsby'
import Helmet from 'react-helmet'
import { animated } from 'react-spring'
import { wrapPageElement as App } from 'gatsby-theme-mdx-deck'
import type { WrapPageElementBrowserArgs } from 'gatsby'
import Header from '../components/header'
import LayoutMain from './main'
import AnimationProvider from '../components/transitions/provider'

import 'modern-normalize'
import '../styles/normalize.css'
import { page } from './style.css'

const Layout: React.FC<WrapPageElementBrowserArgs> = ({
  element,
  props,
  ...rest
}) => {
  const data = useStaticQuery<GatsbyTypes.IndexLayoutQueryQuery>(graphql`
    query IndexLayoutQuery {
      allSitePage(filter: { component: { regex: "/deck/" } }) {
        nodes {
          path
        }
      }
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

  const isDeck = data.allSitePage.nodes
    .map(({ path }) => path)
    .includes(props.uri)

  if (isDeck) {
    return <App {...rest} props={props} element={element} />
  }

  return (
    <AnimationProvider location={props.location.key ?? ''}>
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
            ? [
                {
                  name: 'keywords',
                  content: data.site.siteMetadata.keywords,
                },
              ]
            : []),
        ]}
      />
      <Header
        title={data.site?.siteMetadata?.title}
        author={data.site?.siteMetadata?.author}
      />
      <LayoutMain>
        <animated.div className={page}>{element}</animated.div>
      </LayoutMain>
    </AnimationProvider>
  )
}

const wrapPageElement = (props: WrapPageElementBrowserArgs) => (
  <Layout {...props} />
)

export default wrapPageElement
