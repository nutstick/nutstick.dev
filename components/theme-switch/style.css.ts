import { style } from '@vanilla-extract/css';

export const button = style({
  height: '28px',
  width: '56px',
  position: 'relative',
  borderRadius: '14px',
  cursor: 'pointer',
  border: 'none',
  transition: 'background 0.25s ease 0s',
  overflow: 'hidden',
});

export const handle = style({
  display: 'inline-block',
  cursor: 'pointer',
  position: 'absolute',
  top: '2px',
  left: '2px',
  outline: '0px',
  border: '0px',
  margin: '2px',
});
