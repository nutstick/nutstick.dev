import * as React from 'react'
import styled from '@emotion/styled'
import ThemeProvider from './ThemeProvider'

const StyledLayoutRoot = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`

interface LayoutRootProps {
  className?: string
}

const LayoutRoot: React.FC<LayoutRootProps> = ({ children, className }) => {
  return (
    <ThemeProvider>
      <StyledLayoutRoot className={className}>{children}</StyledLayoutRoot>
    </ThemeProvider>
  )
}

export default LayoutRoot
