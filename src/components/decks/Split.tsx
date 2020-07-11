import React from 'react'
import styled from '../../styles/styled'

const Half = styled.div`
  width: 50%;
  img {
    height: auto;
  }
`

const SplitContainer = styled.div`
  display: flex;
  align-items: center;
`

interface Props {
  reverse: boolean
  separator?: React.ReactNode
  children: React.ReactNode
}

const Split: React.FC<Props> = ({ reverse, children, separator, ...props }) => {
  const [first, ...rest] = React.Children.toArray(children)
  const splitChildren = reverse
    ? [
        <Half key="rest">{rest}</Half>,
        separator && (
          <React.Fragment key="separator">{separator}</React.Fragment>
        ),
        <Half key="first">{first}</Half>,
      ]
    : [
        <Half key="first">{first}</Half>,
        separator && (
          <React.Fragment key="separator">{separator}</React.Fragment>
        ),
        <Half key="rest">{rest}</Half>,
      ]

  return <SplitContainer {...props}>{splitChildren}</SplitContainer>
}

export default Split
