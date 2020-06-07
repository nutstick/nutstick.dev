import * as React from 'react'
import { transparentize } from 'polished'
import { Link } from 'gatsby'
import styled from '../styles/styled'

import Container from './Container'
import ThemeSwitch from './ThemeSwitch'

const StyledHeader = styled.header`
  box-shadow: 0 2px 8px ${({ theme }) => theme.colors.shadow};
  height: ${({ theme: { heights } }) => heights.header}px;
  padding: 0 ${({ theme: { dimensions } }) => dimensions.containerPadding}rem;
  background-color: ${({ theme: { colors } }) => colors.backgrounnd.paper};
  color: ${({ theme: { colors } }) => transparentize(0.5, colors.text.primary)};
  transition: all 0.2s ease-in-out;
`

const HeaderInner = styled(Container)`
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 100%;
`

const HomepageLink = styled(Link)`
  color: ${({ theme: { colors } }) => colors.text.primary};
  font-size: 1.5rem;
  font-weight: 600;

  &:hover,
  &:focus {
    text-decoration: none;
  }
`

interface HeaderProps {
  title: string
}

const Header: React.FC<HeaderProps> = ({ title }) => (
  <StyledHeader>
    <HeaderInner>
      <HomepageLink to="/">{title}</HomepageLink>
      <ThemeSwitch />
    </HeaderInner>
  </StyledHeader>
)

export default Header
