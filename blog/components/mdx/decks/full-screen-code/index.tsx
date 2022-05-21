import React from 'react';
import { className } from './style.css';

const FullScreenCode = (
  props: React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  >
) => <div className={className} {...props} />;

export default FullScreenCode;
