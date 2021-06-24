import Link from 'gatsby-plugin-transition-link'
import React, { FC } from 'react'
import styled from '@emotion/styled'

import { useMeasureNode } from '../hooks/use-measure-node'

const StyledLink = styled(Link)`
  box-shadow: none;
  :hover {
    text-decoration: none;
  }
`

interface Props {
  node: GatsbyTypes.AllPostsQueryQuery['allMarkdownRemark']['edges'][0]['node']
}

const Post: FC<Props> = ({ node: { frontmatter, fields, excerpt } }) => {
  const { ref: headerRef, rect: headerRect } = useMeasureNode()
  const title = frontmatter?.title || fields?.slug

  return (
    <StyledLink
      to={fields?.slug ?? '/not-found'}
      exit={{
        length: 0,
        state: headerRect,
      }}
      entry={{
        length: 0,
      }}
    >
      <article>
        <header>
          <h3 ref={headerRef}>{title}</h3>
          <small>{frontmatter?.date}</small>
        </header>
        <section>
          <p
            dangerouslySetInnerHTML={{
              __html: frontmatter?.description ?? excerpt ?? '',
            }}
          />
        </section>
      </article>
    </StyledLink>
  )
}

export default Post
