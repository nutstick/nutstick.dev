import React from 'react'
import { useSpring, animated } from 'react-spring'
import { useTheme } from '../../hooks/use-theme'
import { button, handle } from './style.css'

const ThemeSwitch: React.FC = () => {
  const { mode, toggleTheme } = useTheme()
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
    <animated.div
      className={button}
      onClick={toggleTheme}
      style={{ background, backgroundImage }}
    >
      <animated.div className={handle} style={{ transform, boxShadow }} />
    </animated.div>
  )
}

export default ThemeSwitch
