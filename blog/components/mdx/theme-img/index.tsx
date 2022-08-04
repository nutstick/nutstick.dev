import React, { CSSProperties } from 'react';
import { useTheme } from '../../../hooks/use-theme';

interface Props extends Omit<React.ImgHTMLAttributes<HTMLImageElement>, 'src'> {
  dark: string;
  light: string;
  darkStyle: CSSProperties;
  lightStyle: CSSProperties;
}

const ThemeImage: React.FC<Props> = ({
  dark,
  darkStyle,
  light,
  lightStyle,
  style,
  ...props
}) => {
  const { mode } = useTheme();
  return (
    <img
      {...props}
      src={mode === 'dark' ? dark : light}
      style={{
        ...style,
        ...(mode === 'dark' ? darkStyle : lightStyle),
      }}
    />
  );
};

export default ThemeImage;
