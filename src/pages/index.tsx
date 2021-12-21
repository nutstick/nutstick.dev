import type { PageProps } from 'gatsby'
import { graphql, Link } from 'gatsby'
import moment from 'moment'
import React from 'react'

import Container from '../components/Container'
import Post from '../components/Post'
import Profile from '../components/Profile'

type Data = GatsbyTypes.AllPostsQueryQuery

type Item =
  | {
      type: 'Post'
      date: moment.Moment
      node: Data['allMarkdownRemark']['edges'][0]['node']
    }
  | {
      type: 'Deck'
      date: moment.Moment
      node: Data['allDeck']['edges'][0]['node']
    }

const IndexPage: React.FC<PageProps<Data>> = ({ data }) => {
  const posts = data.allMarkdownRemark.edges
  const decks = data.allDeck.edges
  const allPosts: Item[] = posts
    .map(
      ({ node }): Item => ({
        type: 'Post',
        date: moment(node?.frontmatter?.date),
        node,
      })
    )
    .concat(
      decks.map(
        ({ node }): Item => ({
          type: 'Deck',
          date: moment(node?.frontmatter?.date),
          node,
        })
      )
    )
    .sort((a: Item, b: Item) => b.date.valueOf() - a.date.valueOf())

  return (
    <Container>
      <Profile />
      {allPosts.map((item) => {
        if (item.type === 'Post') {
          return (
            <Post key={item.node.fields?.slug ?? item.type} node={item.node} />
          )
        }

        if (!item.node.frontmatter) {
          return null
        }

        const { title, description } = item.node.frontmatter
        return (
          <article key={item.node.slug}>
            <header>
              <h3>
                <Link style={{ boxShadow: 'none' }} to={item.node.slug}>
                  {title}
                </Link>
              </h3>
              <small>{item.node.frontmatter.date}</small>
            </header>
            <section>
              <p
                dangerouslySetInnerHTML={{
                  __html: description ?? '',
                }}
              />
            </section>
          </article>
        )
      })}
    </Container>
  )
}

export const pageQuery = graphql`
  query AllPostsQuery {
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      edges {
        node {
          excerpt
          fields {
            slug
          }
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            title
            description
          }
        }
      }
    }
    allDeck(sort: { fields: [frontmatter___date], order: DESC }) {
      edges {
        node {
          id
          slug
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            title
            description
          }
        }
      }
    }
  }
`

export default IndexPage
