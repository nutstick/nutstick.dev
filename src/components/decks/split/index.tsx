import React from 'react'
import { half, splitContianer } from './style.css'

interface Props {
  reverse: boolean
  separator?: React.ReactNode
  children: React.ReactNode
}

const Split: React.FC<Props> = ({ reverse, children, separator, ...props }) => {
  const [first, ...rest] = React.Children.toArray(children)
  const splitChildren = reverse
    ? [
        <div key="rest" className={half}>
          {rest}
        </div>,
        separator && (
          <React.Fragment key="separator">{separator}</React.Fragment>
        ),
        <div key="first" className={half}>
          {first}
        </div>,
      ]
    : [
        <div key="first" className={half}>
          {first}
        </div>,
        separator && (
          <React.Fragment key="separator">{separator}</React.Fragment>
        ),
        <div key="rest" className={half}>
          {rest}
        </div>,
      ]

  return (
    <div className={splitContianer} {...props}>
      {splitChildren}
    </div>
  )
}

export default Split
