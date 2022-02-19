import React from 'react';
import { className } from './style.css';

const Li = (
  props: React.DetailedHTMLProps<
    React.LiHTMLAttributes<HTMLLIElement>,
    HTMLLIElement
  >
) => <li className={className} {...props} />;

export default Li;
