import { style } from '@vanilla-extract/css';
import { height } from '../vars.css';

export const row = style({
  display: 'flex',
  position: 'relative',
  borderRadius: 4,
  cursor: 'pointer',
});

export const rowText = style({
  flex: 1,
  lineHeight: height,
  textOverflow: 'ellipsis',
  overflow: 'hidden',
  whiteSpace: 'nowrap',
});
