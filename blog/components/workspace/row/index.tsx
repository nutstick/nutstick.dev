import React, { CSSProperties } from 'react';
import cx from 'classnames';
import Icon, { IconName } from '../icons';
import * as s from './style.css';

const Row: React.FC<{
  className: string;
  icon: IconName;
  name: string;
  style?: CSSProperties;
}> = ({ className, icon, name, style }) => {
  return (
    <div className={cx(s.row, className)} style={style}>
      <Icon name={icon} />
      <div className={s.rowText}>{name}</div>
    </div>
  );
};
export default Row;
