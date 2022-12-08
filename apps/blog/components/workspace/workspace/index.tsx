import React from 'react';
import cx from 'classnames';
import { assignInlineVars } from '@vanilla-extract/dynamic';
import * as s from './style.css';
import * as vars from '../vars.css';

const Workspace: React.FC<{
  name?: string;
  border?: boolean;
  height?: number;
  icon?: number;
  tabSize?: number;
  children: React.ReactNode;
}> = ({ name, border, height = 54, icon = 48, tabSize = 18, children }) => {
  return (
    <div
      className={cx(s.workspace, border && s.border)}
      style={assignInlineVars({
        [vars.height]: `${height}px`,
        [vars.icon]: `${icon}px`,
        [vars.tab]: `${tabSize}px`,
      })}
    >
      {name ? <h6 className={cx(s.workspaceTitle)}>{name}</h6> : null}
      {children}
    </div>
  );
};

export default Workspace;
