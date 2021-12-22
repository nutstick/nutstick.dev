import * as React from 'react'
import { Link } from 'gatsby'
import { SiMailDotRu } from '@react-icons/all-files/si/SiMailDotRu'
import { SiGithub } from '@react-icons/all-files/si/SiGithub'
import { SiLinkedin } from '@react-icons/all-files/si/SiLinkedin'
import { SiTwitter } from '@react-icons/all-files/si/SiTwitter'
import logo from '../../img/logo.svg'
import { header, container, homeLogo, rightMenu } from './style.css'
import Container from '../container'
import ThemeSwitch from '../theme-switch'
import { useTheme } from '../../hooks/use-theme'
import { darkTextPrimary, lightTextPrimary } from '../../styles/theme/const'

interface HeaderProps {
  title?: null | string
  author: GatsbyTypes.Maybe<
    Pick<
      GatsbyTypes.SiteSiteMetadataAuthor,
      'name' | 'url' | 'github' | 'twitter' | 'linkedin' | 'email'
    >
  >
}

const Header: React.FC<HeaderProps> = ({ title, author }) => {
  const { mode } = useTheme()
  const color = mode === 'dark' ? darkTextPrimary : lightTextPrimary
  const { github, twitter, linkedin, email } = author || {}
  return (
    <header className={header}>
      <Container className={container}>
        <Link to="/">
          <img className={homeLogo} src={logo} alt={title ?? ''} />
        </Link>
        <div className={rightMenu}>
          {email && (
            <a href={`mailto: ${email}`} rel="noreferrer" target="_blank">
              <SiMailDotRu color={color} size={28} />
            </a>
          )}
          {github && (
            <a href={github}>
              <SiGithub color={color} size={28} />
            </a>
          )}
          {twitter && (
            <a href={twitter}>
              <SiTwitter color={color} size={28} />
            </a>
          )}
          {linkedin && (
            <a href={linkedin}>
              <SiLinkedin color={color} size={28} />
            </a>
          )}
          <ThemeSwitch />
        </div>
      </Container>
    </header>
  )
}

export default Header
