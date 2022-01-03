import React from 'react';
import cx from 'classnames';
import { page } from './style.css';

interface Props {
  id?: string;
  className?: string;
}

const Slide: React.FC<Props> = ({ children, id, className }) => {
  return (
    <div id={id} className={cx(page, className)}>
      {children}
    </div>
  );
};

export default Slide;
