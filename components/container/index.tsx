import * as React from 'react';
import cx from 'classnames';
import { container } from './style.css';

interface ContainerProps {
  className?: string;
}

const Container: React.FC<ContainerProps> = ({ children, className }) => (
  <div className={cx(className, container)}>{children}</div>
);

export default Container;
