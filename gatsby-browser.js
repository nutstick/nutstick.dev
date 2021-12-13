/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/browser-apis/
 */

import Layout from './src/layouts/index'

export const wrapPageElement = (props) => {
  return <Layout {...props} />
}
