import { style, globalStyle } from '@vanilla-extract/css';

export const half = style({
  width: '50%',
});

globalStyle(`${half} img`, {
  height: 'auto',
});

export const splitContianer = style({
  display: 'flex',
  alignItems: 'center',
});
