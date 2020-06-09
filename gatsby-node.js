const path = require('path')

const mdxResolverPassthrough = fieldName => async (
  source,
  args,
  context,
  info
) => {
  const type = info.schema.getType(`Mdx`)
  const mdxNode = context.nodeModel.getNodeById({
    id: source.parent
  })
  const resolver = type.getFields()[fieldName].resolve
  const result = await resolver(mdxNode, args, context, {
    fieldName
  })
  return result
}

const resolveTitle = async (...args) => {
  const headings = await mdxResolverPassthrough('headings')(...args)
  const [first = {}] = headings
  return first.value || ''
}

exports.createSchemaCustomization = ({ actions, schema }) => {
  actions.createTypes(
    schema.buildObjectType({
      name: `Deck`,
      fields: {
        id: { type: `ID!` },
        slug: {
          type: `String!`
        },
        title: {
          type: 'String!',
          resolve: resolveTitle
        },
        body: {
          type: `String!`,
          resolve: mdxResolverPassthrough(`body`)
        }
      },
      interfaces: [`Node`]
    })
  )
}

exports.onCreateNode = ({
  node,
  actions,
  getNode,
  createNodeId,
  createContentDigest
}) => {
  const { createNodeField, createNode, createParentChildLink } = actions

  const toPath = n => {
    const { dir } = path.posix.parse(n.relativePath)
    return path.posix.join('/', dir, n.name)
  }

  switch (node.internal.type) {
    case 'MarkdownRemark': {
      const { permalink, layout } = node.frontmatter
      const { relativePath } = getNode(node.parent)

      let slug = permalink

      if (!slug) {
        slug = `/${relativePath.replace('.md', '')}/`
      }

      // Used to generate URL to view this content.
      createNodeField({
        node,
        name: 'slug',
        value: slug || ''
      })

      // Used to determine a page layout.
      createNodeField({
        node,
        name: 'layout',
        value: layout || ''
      })
      break
    }
    case 'Mdx': {
      const fileNode = getNode(node.parent)
      const source = fileNode.sourceInstanceName

      if (source === `content`) {
        const slug = toPath(fileNode)
        const id = createNodeId(`${node.id} >>> Deck`)

        createNode({
          slug,
          // Required fields.
          id,
          parent: node.id,
          children: [],
          internal: {
            type: `Deck`,
            contentDigest: createContentDigest(node.rawBody),
            content: node.rawBody,
            description: `Slide Decks`
          }
        })
        createParentChildLink({ parent: fileNode, child: getNode(id) })
      }
      break
    }
    default:
  }
}

exports.createPages = async ({ graphql, actions, pathPrefix }) => {
  const { createPage } = actions

  const allMarkdown = await graphql(`
    {
      allMarkdownRemark(limit: 1000) {
        edges {
          node {
            fields {
              layout
              slug
            }
          }
        }
      }
    }
  `)

  if (allMarkdown.errors) {
    console.error(allMarkdown.errors)
    throw new Error(allMarkdown.errors)
  }

  allMarkdown.data.allMarkdownRemark.edges.forEach(({ node }) => {
    const { slug, layout } = node.fields

    createPage({
      path: slug,
      component: path.resolve(`./src/templates/${layout || 'page'}.tsx`),
      context: {
        slug
      }
    })
  })

  const allDeck = await graphql(`
    {
      allDeck {
        edges {
          node {
            id
            slug
            title
          }
        }
      }
    }
  `)

  if (allDeck.errors) {
    console.error(allDeck.errors)
    throw new Error(allDeck.errors)
  }

  const decks = allDeck.data.allDeck.edges

  decks.forEach(({ node }) => {
    const matchPath = [node.slug, '*'].join('/')
    const slug = [pathPrefix, node.slug].filter(Boolean).join('')

    createPage({
      path: node.slug,
      matchPath,
      component: path.resolve(
        `./node_modules/gatsby-theme-mdx-deck/src/templates/deck.js`
      ),
      context: {
        ...node,
        slug
      }
    })
    createPage({
      path: `${slug}/print`,
      component: path.resolve(
        `./node_modules/gatsby-theme-mdx-deck/src/templates/deck.js`
      ),
      context: {
        ...node,
        slug
      }
    })
  })
}
