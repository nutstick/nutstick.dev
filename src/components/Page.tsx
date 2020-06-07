import * as React from 'react'
import styled from '../styles/styled'

const StyledPage = styled.div`
  display: block;
  flex: 1;
  position: relative;
  padding: ${({ theme: { dimensions } }) => dimensions.containerPadding}rem;
  margin-bottom: 3rem;
`

interface PageProps {
  className?: string
}

const Page: React.FC<PageProps> = ({ children, className }) => <StyledPage className={className}>{children}</StyledPage>

export default Page
