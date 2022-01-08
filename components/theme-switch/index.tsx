import React from 'react';
import { useSpring, animated } from '@react-spring/web';
import { useTheme } from '../../hooks/use-theme';
import DarkModeSwitch from './dark-mode-switch';
import { button, handle } from './style.css';

const ThemeSwitch: React.FC = () => {
  const { mode, toggleTheme } = useTheme();
  const { background, filter, transform } = useSpring({
    background: mode === 'dark' ? '#231b54' : '#2acbeb',
    filter:
      mode === 'dark'
        ? 'drop-shadow(0px 0px 6px rgba(255, 255, 255, 0.4))'
        : 'drop-shadow(0px 0px 8px rgba(255, 255, 255, 0.2))',
    transform:
      mode === 'dark' ? 'translate3d(0px,0,0)' : 'translate3d(28px,0,0)',
    config: { mass: 5, tension: 500, friction: 80 },
  });

  return (
    <animated.div
      className={button}
      onClick={toggleTheme}
      style={{ background }}
    >
      <DarkModeSwitch
        className={handle}
        style={{ transform, filter }}
        checked={mode === 'dark'}
      />
    </animated.div>
  );
};

export default ThemeSwitch;
