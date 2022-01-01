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
  height: '24px',
  width: '24px',
  background: 'rgb(255, 255, 255)',
  display: 'inline-block',
  cursor: 'pointer',
  borderRadius: '50%',
  position: 'absolute',
  top: '2px',
  left: '2px',
  outline: '0px',
  border: '0px',
});
