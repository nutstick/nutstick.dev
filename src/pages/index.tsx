import React from 'react'
import { Link, graphql, PageProps } from 'gatsby'
import moment from 'moment'

import Page from '../components/Page'
import Container from '../components/Container'
import IndexLayout from '../layouts'

type Data = {
  site: {
    siteMetadata: {
      title: string
    }
  }
  allMarkdownRemark: {
    edges: {
      node: {
        excerpt: string
        frontmatter: {
          title: string
          date: string
          description: string
        }
        fields: {
          slug: string
        }
      }
    }[]
  }
  allDeck: {
    edges: {
      node: {
        slug: string
        frontmatter: {
          title: string
          date: string
          description: string
        }
      }
    }[]
  }
}

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
    .map<Item>(({ node }) => ({
      type: 'Post',
      date: moment(node.frontmatter.date),
      node
    }))
    .concat(
      decks.map(({ node }) => ({
        type: 'Deck',
        date: moment(node.frontmatter.date),
        node
      }))
    )
    .sort((a: Item, b: Item) => b.date.valueOf() - a.date.valueOf())

  return (
    <IndexLayout>
      <Page>
        <Container>
          {allPosts.map(item => {
            if (item.type === 'Post') {
              const title = item.node.frontmatter.title || item.node.fields.slug
              return (
                <article key={item.node.fields.slug}>
                  <header>
                    <h3>
                      <Link
                        style={{ boxShadow: `none` }}
                        to={item.node.fields.slug}
                      >
                        {title}
                      </Link>
                    </h3>
                    <small>{item.node.frontmatter.date}</small>
                  </header>
                  <section>
                    <p
                      dangerouslySetInnerHTML={{
                        __html:
                          item.node.frontmatter.description || item.node.excerpt
                      }}
                    />
                  </section>
                </article>
              )
            }

            const { title, description } = item.node.frontmatter
            return (
              <article key={item.node.slug}>
                <header>
                  <h3>
                    <Link style={{ boxShadow: `none` }} to={item.node.slug}>
                      {title}
                    </Link>
                  </h3>
                  <small>{item.node.frontmatter.date}</small>
                </header>
                <section>
                  <p
                    dangerouslySetInnerHTML={{
                      __html: description
                    }}
                  />
                </section>
              </article>
            )
          })}
        </Container>
      </Page>
    </IndexLayout>
  )
}

export const pageQuery = graphql`
  query {
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
