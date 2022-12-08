import React from 'react';
import { IconName } from '../icons';
import Row from '../row';
import * as s from './style.css';

const File: React.FC<{
  icon?: IconName;
  name: string;
  opacity: number;
}> = ({ icon = 'file', name, opacity }) => {
  return <Row className={s.file} icon={icon} name={name} style={{ opacity }} />;
};

export default File;
