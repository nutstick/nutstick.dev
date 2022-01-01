import { style } from '@vanilla-extract/css';
import { vars } from '../../styles/theme';

export const container = style({
  display: 'flex',
  flexDirection: 'column',
  minHeight: '100vh',
  color: vars.colors.text.primary,
  backgroundColor: vars.colors.backgrounnd.paper,
});
