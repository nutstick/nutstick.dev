import * as React from 'react'
import styled from '../styles/styled'

const StyledContainer = styled.div`
  position: relative;
  margin-left: auto;
  margin-right: auto;
  width: auto;
  max-width: ${({ theme: { widths, getEmSize } }) => getEmSize(widths.lg)}em;
`

interface ContainerProps {
  className?: string
}

const Container: React.FC<ContainerProps> = ({ children, className }) => (
  <StyledContainer className={className}>{children}</StyledContainer>
)

export default Container
