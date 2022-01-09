import { globalStyle, style } from '@vanilla-extract/css';
import { vars } from '../../styles/theme';

export const cell = style({
  willChange: ['transform', 'opacity'],
});
