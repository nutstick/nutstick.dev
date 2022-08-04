import React from 'react';
import Row from '../row';
import { IconName } from '../icons';
import * as s from './style.css';

const Folder: React.FC<{
  type?: 'default' | 'node';
  name: string;
  opacity: number;
  children: React.ReactNode;
}> = ({ type, name, opacity, children }) => {
  const closed = React.Children.count(children) === 0;

  const getIcon = (): IconName => {
    switch (type) {
      case 'node':
        return closed ? 'folder-node' : 'folder-node-opened';
      default:
        return closed ? 'folder' : 'folder-opened';
    }
  };

  const icon = getIcon();

  return (
    <div className={s.folder} style={{ opacity }}>
      <Row icon={icon} name={name} />
      {!closed ? <div className={s.children}>{children}</div> : null}
    </div>
  );
};

export default Folder;
