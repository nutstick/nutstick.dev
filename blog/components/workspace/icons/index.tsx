import React from 'react';
import Image from 'next/image';
import file from './default_file.svg';
import npm from './file_type_npm.svg';
import yarn from './file_type_yarn.svg';
import folderOpened from './default_folder_opened.svg';
import folder from './default_folder.svg';
import folderNodeOpened from './folder_type_node_opened.svg';
import folderNode from './folder_type_node.svg';
import { root } from './style.css';

export type IconName =
  | 'file'
  | 'npm'
  | 'yarn'
  | 'folder-opened'
  | 'folder'
  | 'folder-node-opened'
  | 'folder-node';

const getIcon = (name: IconName) => {
  switch (name) {
    case 'file':
      return file;
    case 'npm':
      return npm;
    case 'yarn':
      return yarn;
    case 'folder':
      return folder;
    case 'folder-opened':
      return folderOpened;
    case 'folder-node':
      return folderNode;
    case 'folder-node-opened':
      return folderNodeOpened;
  }
};

const Icon: React.FC<{ name: IconName }> = ({ name }) => {
  const { src } = getIcon(name);
  return (
    <div className={root}>
      <Image src={src} alt={name} layout="fill" objectFit="contain" />
    </div>
  );
};

export default Icon;
