import { style } from '@vanilla-extract/css';
import { vars } from '../../../styles/theme';

export const container = style({
  width: '750px',
  maxWidth: '85%',
  maxHeight: '60%',
  background: vars.colors.backgrounnd.code,
  fontSize: '14px',
  fontFamily: [
    'Fira Mono',
    'Consolas',
    'Menlo',
    'Monaco',
    'Courier New',
    'Courier',
    'monospace',
  ],
  borderRadius: '4px',
  padding: 0,
  paddingTop: '30px',
  paddingLeft: '30px',
  paddingRight: '30px',
  position: 'relative',
  boxSizing: 'border-box',
  ':before': {
    content: '',
    position: 'absolute',
    top: '15px',
    left: '15px',
    display: 'inline-block',
    width: '15px',
    height: '15px',
    borderRadius: '50%',
    background: '#d9515d',
    boxShadow: '25p 0 0 #f4c025 50px 0 0 #3ec930',
  },
});
