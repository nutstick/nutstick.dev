import React from 'react';
import { className } from './style.css';

type Props = React.DetailedHTMLProps<
  React.LiHTMLAttributes<HTMLLIElement>,
  HTMLLIElement
>;

const Li = (props: Props) => <li className={className} {...props} />;

export default Li;
