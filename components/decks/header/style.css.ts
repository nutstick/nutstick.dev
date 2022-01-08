import { style } from '@vanilla-extract/css';
import { vars } from '../../../styles/theme';

export const container = style({
  position: 'absolute',
  zIndex: '1',
  left: '0',
  top: '0',
  right: '0',
  height: '64px',
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  opacity: 0,
  transition: 'opacity 0.3s cubic-bezier(0.39, 0.58, 0.57, 1)',
  ':hover': {
    opacity: 1,
  },
});

export const closeIcon = style({
  marginLeft: '16px',
  marginRight: '16px',
  cursor: 'pointer',
});

export const title = style({
  paddingLeft: '24px',
  paddingRight: '12px',
});

export const icon = style({
  filter: vars.filter,
});
