import React from 'react';
import cx from 'classnames';
import { ThemeContext } from './context';
import { useDarkMode } from './use-dark-mode';
import {
  themeLight,
  themeDark,
  deckThemeLight,
  deckThemeDark,
} from '../../styles/theme';

import '../../styles/normalize.css';
import '../../styles/global-theme.css';
import { container } from './style.css';

interface ThemeProviderProps {
  deck?: boolean;
  className?: string;
}

const ThemeProvider: React.FC<ThemeProviderProps> = ({
  deck = false,
  children,
  className,
}) => {
  const [mode, toggleTheme, mounted] = useDarkMode();
  const theme = deck
    ? mode === 'light'
      ? deckThemeLight
      : deckThemeDark
    : mode === 'light'
    ? themeLight
    : themeDark;

  if (!mounted) {
    return null;
  }

  return (
    <ThemeContext.Provider value={{ mode, toggleTheme }}>
      <div className={cx(container, theme, className)}>{children}</div>
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
