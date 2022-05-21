import * as React from 'react';
import cx from 'classnames';
import { container } from './style.css';

interface ContainerProps
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  > {}

const Container: React.FC<ContainerProps> = ({ children, className }) => (
  <div className={cx(className, container)}>{children}</div>
);

export default Container;
