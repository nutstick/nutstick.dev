/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/browser-apis/
 */

import Layout from './src/layouts/index'

export const wrapPageElement = (props) => <Layout {...props} />

export const shouldUpdateScroll = ({
  routerProps: { location },
  getSavedScrollPosition,
}) =>
  // if (location.pathname === '/') {
  //   const currentPosition = getSavedScrollPosition(location)
  //   window.scrollTo(...(currentPosition || [0, 0]))
  // }
  // window.scrollTo([0, 0])
  false
