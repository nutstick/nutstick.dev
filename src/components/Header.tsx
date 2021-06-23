import * as React from 'react'
import { useTheme } from 'emotion-theming'
import { transparentize } from 'polished'
import { Link } from 'gatsby'
import { SiMailDotRu } from '@react-icons/all-files/si/SiMailDotRu'
import { SiGithub } from '@react-icons/all-files/si/SiGithub'
import { SiLinkedin } from '@react-icons/all-files/si/SiLinkedin'
import { SiTwitter } from '@react-icons/all-files/si/SiTwitter'
import styled from '../styles/styled'
import logo from '../img/logo.svg'
import { Theme } from '../styles/theme'

import Container from './Container'
import ThemeSwitch from './ThemeSwitch'

const StyledHeader = styled.header`
  height: ${({ theme: { heights } }) => heights.header}px;
  padding: 0 ${({ theme: { dimensions } }) => dimensions.containerPadding}rem;
  color: ${({ theme: { colors } }) => transparentize(0.5, colors.text.primary)};
  transition: all 0.2s ease-in-out;
`

const HeaderInner = styled(Container)`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  height: 100%;
  max-width: 1280px;
`

const HomepageLogo = styled.img`
  color: ${({ theme: { colors } }) => colors.text.primary};
  filter: ${({ theme: { mode } }) =>
    mode === 'dark'
      ? 'invert(1)'
      : 'invert(0.5) sepia(1) hue-rotate(103deg) saturate(4)'};
  font-size: 1.5rem;
  font-weight: 600;

  &:hover,
  &:focus {
    text-decoration: none;
  }
`

const RightMenu = styled.div`
  display: flex;
  flex-direction: row;
  > * {
    margin-left: 1rem;
  }
`

interface HeaderProps {
  title?: null | string
  author?: null | {
    name: string
    url: string
    github: string | null
    twitter: string | null
    linkedin: string | null
    email: string
  }
}

const Header: React.FC<HeaderProps> = ({ title, author }) => {
  const { github, twitter, linkedin, email } = author || {}
  const { colors } = useTheme<Theme>()
  return (
    <StyledHeader>
      <HeaderInner>
        <Link to="/">
          <HomepageLogo src={logo} alt={title ?? ''} />
        </Link>
        <RightMenu>
          {email && (
            <a href={`mailto: ${email}`} rel="noreferrer" target="_blank">
              <SiMailDotRu color={colors.text.primary} size={28} />
            </a>
          )}
          {github && (
            <Link to={github}>
              <SiGithub color={colors.text.primary} size={28} />
            </Link>
          )}
          {twitter && (
            <Link to={twitter}>
              <SiTwitter color={colors.text.primary} size={28} />
            </Link>
          )}
          {linkedin && (
            <Link to={linkedin}>
              <SiLinkedin color={colors.text.primary} size={28} />
            </Link>
          )}
          <ThemeSwitch />
        </RightMenu>
      </HeaderInner>
    </StyledHeader>
  )
}

export default Header
