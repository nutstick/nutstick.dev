import React from 'react'
import { Link } from 'gatsby'
import Element from './transitions/elements'
import { post, header } from './Post.css'

interface Props {
  node: GatsbyTypes.AllPostsQueryQuery['allMarkdownRemark']['edges'][0]['node']
}

const Post: React.FC<Props> = ({ node: { frontmatter, fields, excerpt } }) => {
  const title = frontmatter?.title || fields?.slug

  return (
    <article>
      <header className={header}>
        <Link className={post} to={fields?.slug ?? '/not-found'}>
          <Element.Heading
            id={`post-${title}`}
            fontSize="1.563rem"
            color="#5cdb95"
          >
            {title}
          </Element.Heading>
        </Link>
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
  )
}

export default Post
