import { style } from '@vanilla-extract/css';
import { vars } from '../../styles/theme';

export const container = style({
  position: 'relative',
  marginLeft: 'auto',
  marginRight: 'auto',
  width: '100%',
  // TODO: to EM
  maxWidth: vars.widths.lg,
  padding: vars.dimensions.containerPadding,
  marginBottom: '3rem',
});
