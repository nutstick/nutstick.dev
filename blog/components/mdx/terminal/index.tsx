import React from 'react';
import { container } from './style.css';

const Terminal = ({
  style,
  children,
}: {
  style: React.CSSProperties;
  children: React.ReactNode;
}) => (
  <div className={container} style={style}>
    {children}
  </div>
);

export default Terminal;
