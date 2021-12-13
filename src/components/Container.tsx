import * as React from 'react'
import styled from '@emotion/styled'
import { animated } from 'react-spring'
import type { SpringValue } from 'react-spring'

const StyledContainer = styled(animated.div)`
  position: relative;
  margin-left: auto;
  margin-right: auto;
  width: auto;
  max-width: ${({ theme: { widths, getEmSize } }) => getEmSize(widths.lg)}em;
`

interface ContainerProps {
  className?: string
  style?: {
    opacity: SpringValue<number>
  }
}

const Container: React.FC<ContainerProps> = ({
  children,
  className,
  style,
}) => (
  <StyledContainer className={className} style={style}>
    {children}
  </StyledContainer>
)

export default Container
