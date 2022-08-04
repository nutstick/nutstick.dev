import * as React from 'react';
import cx from 'classnames';
import { container } from './style.css';

interface LayoutMainProps {
  className?: string;
  children: React.ReactNode;
}

const LayoutMain: React.FC<LayoutMainProps> = ({ children, className }) => (
  <main className={cx(className, container)}>{children}</main>
);

export default LayoutMain;
