import { style } from '@vanilla-extract/css';
import { vars } from '../../styles/theme';

export const container = style({
  display: 'flex',
  flexDirection: 'column',
  minHeight: '100vh',
  color: vars.colors.text.primary,
  backgroundColor: vars.colors.backgrounnd.paper,
  transition: 'background .2s ease-in-out, color .2s ease-in-out',
  willChange: 'auto',
  fontSize: `${vars.dimensions.fontSize.regular} !important`,
  lineHeight: `${vars.dimensions.lineHeight.regular} !important`,
});
