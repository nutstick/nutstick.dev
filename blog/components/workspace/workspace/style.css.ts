import { style } from '@vanilla-extract/css';
import { vars } from '../../../styles/theme';
import { height, tab } from '../vars.css';

export const workspace = style({
  display: 'flex',
  flexDirection: 'column',
  padding: `${tab} ${height}`,
  marginBottom: height,
});

export const workspaceTitle = style({
  fontSize: 24,
  borderBottom: `1px solid ${vars.colors.primary.main}`,
  margin: `0 calc(${height} * -1 + 16px) 16px`,
  paddingBottom: 16,
});

export const border = style({
  border: `1px solid ${vars.colors.primary.main}`,
  borderRadius: 8,
  overflow: 'hidden',
});
