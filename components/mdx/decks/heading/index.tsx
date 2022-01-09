import React from 'react';
import { h1, h2, h3, h4, p } from './style.css';

export const H1: React.FC = ({ children, ...props }) => (
  <h1 className={h1} {...props}>
    {children}
  </h1>
);

export const H2: React.FC = ({ children, ...props }) => (
  <h2 className={h2} {...props}>
    {children}
  </h2>
);

export const H3: React.FC = ({ children, ...props }) => (
  <h3 className={h3} {...props}>
    {children}
  </h3>
);

export const H4: React.FC = ({ children, ...props }) => (
  <h4 className={h4} {...props}>
    {children}
  </h4>
);

export const P: React.FC = (props) => <p className={p} {...props} />;
