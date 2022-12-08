import React from 'react';
import { container } from './style.css';

interface Props {
  gap?: number;
  children: React.ReactNode;
}

const Row = ({ children, gap, ...props }: Props) => {
  return (
    <div className={container} style={{ gap }} {...props}>
      {children}
    </div>
  );
};

export default Row;
