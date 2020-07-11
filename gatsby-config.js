/* eslint-disable global-require */
module.exports = {
  siteMetadata: {
    title: 'nutstick.dev',
    description: 'Personal blog',
    keywords:
      'gatsbyjs, gatsby, javascript, react, react-native, graphql, golang',
    siteUrl: 'https://nutstick.dev',
    author: {
      name: 'Nuttapat Kirawittaya',
      url: 'https://github.com/nutstick',
      email: 'nuttapat.kirawittaya@gmail.com'
    }
  },
  plugins: [
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: 'nutstick.dev',
        short_name: 'nutstick.dev',
        start_url: '/',
        display: 'standalone',
        background_color: 'transparent',
        theme_color: '#5cdb95',
        icon: 'src/img/fn.png'
      }
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'content',
        path: `${__dirname}/src/content`
      }
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'img',
        path: `${__dirname}/src/img`
      }
    },
    {
      resolve: 'gatsby-transformer-remark',
      options: {
        plugins: [
          {
            resolve: 'gatsby-remark-responsive-iframe',
            options: {
              wrapperStyle: 'margin-bottom: 1rem'
            }
          },
          {
            resolve: `gatsby-remark-vscode`
          },
          'gatsby-remark-copy-linked-files',
          'gatsby-remark-smartypants',
          {
            resolve: 'gatsby-remark-images',
            options: {
              maxWidth: 590,
              quality: 90,
              linkImagesToOriginal: false
            }
          }
        ]
      }
    },
    'gatsby-transformer-json',
    {
      resolve: 'gatsby-plugin-canonical-urls',
      options: {
        siteUrl: 'https://nutstick.dev'
      }
    },
    {
      resolve: 'gatsby-plugin-transition-link'
    },
    'gatsby-plugin-emotion',
    'gatsby-plugin-typescript',
    'gatsby-plugin-sharp',
    'gatsby-transformer-sharp',
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-codegen',
    {
      resolve: `gatsby-plugin-mdx`,
      options: {
        gatsbyRemarkPlugins: [
          `gatsby-remark-import-code`,
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 590
            }
          },
          `gatsby-remark-embedder`
        ],
        remarkPlugins: [
          require('remark-unwrap-images'),
          require('remark-emoji')
        ]
      }
    }
  ]
}
