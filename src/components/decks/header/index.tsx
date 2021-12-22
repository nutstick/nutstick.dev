/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react'
import { navigate } from 'gatsby'
import Close from '../../../img/close.svg'
import { closeIcon, container, title as titleClassName } from './style.css'

interface Props {
  title: string
}

const Header: React.FC<Props> = ({ title }) => (
  <div className={container}>
    <h3 className={titleClassName}>{title}</h3>
    <img
      className={closeIcon}
      src={Close}
      alt="Close"
      onClick={() => navigate('/')}
    />
  </div>
)

export default Header
