import React from 'react'
import { useSpring, animated } from 'react-spring'
import { useTheme, Theme } from '@emotion/react'
import styled from '@emotion/styled'

const Button = styled(animated.div)`
  height: 28px;
  width: 56px;
  position: relative;
  border-radius: 14px;
  cursor: pointer;
  border: none;
  transition: background 0.25s ease 0s;
  overflow: hidden;
`

const Handle = styled(animated.div)`
  height: 24px;
  width: 24px;
  background: rgb(255, 255, 255);
  display: inline-block;
  cursor: pointer;
  border-radius: 50%;
  position: absolute;
  top: 2px;
  left: 2px;
  outline: 0px;
  border: 0px;
`

const ThemeSwitch: React.FC = () => {
  const { mode, toggleTheme } = useTheme<Theme>()
  const { background, backgroundImage, boxShadow, transform } = useSpring({
    background: mode === 'dark' ? '#231b54' : '#2acbeb',
    backgroundImage:
      mode === 'dark'
        ? 'linear-gradient(to top right, #221e67, #210f38)'
        : 'linear-gradient(to bottom right, #e7fbff, #4cdff7)',
    boxShadow:
      mode === 'dark'
        ? '0px 0px 8px 2px rgba(255, 255, 255, 0.4)'
        : '0px 0px 16px 6px rgba(255, 255, 255, 0.2)',
    transform:
      mode === 'dark' ? 'translate3d(0px,0,0)' : 'translate3d(28px,0,0)',
    config: { mass: 5, tension: 500, friction: 80 },
  })

  return (
    <Button onClick={toggleTheme} style={{ background, backgroundImage }}>
      <Handle style={{ transform, boxShadow }} />
    </Button>
  )
}

export default ThemeSwitch
