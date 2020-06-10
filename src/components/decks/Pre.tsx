import React from 'react'
import { preToCodeBlock } from 'mdx-utils'
import Code from './Code'

type Props = any

const Pre: React.FC<Props> = props => {
  const preProps = preToCodeBlock(props)
  if (preProps) {
    return <Code {...preProps} />
  }
  return <pre {...props} />
}

export default Pre
