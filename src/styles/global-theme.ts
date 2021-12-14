import type { Theme } from '@emotion/react'

export default ({ colors }: Theme) => `
  body {
    color: ${colors.text.primary};
    background-color: ${colors.backgrounnd.paper};
  }

  h1, h2, h3, h4, h5, h6 {
    color: ${colors.text.primary};
  }

  strong {
    color: ${colors.text.primary};
  }

  blockquote {
    color: ${colors.text.secondary};
  }
`
