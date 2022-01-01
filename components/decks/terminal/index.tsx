import React from 'react';
import { container } from './style.css';

const Terminal: React.FC<{ style: React.CSSProperties }> = ({
  style,
  children,
}) => (
  <div className={container} style={style}>
    {children}
  </div>
);

export default Terminal;
