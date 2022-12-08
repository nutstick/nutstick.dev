import { style } from '@vanilla-extract/css';
import { vars } from '../../styles/theme';

export const post = style({
  boxShadow: 'none',
  color: vars.colors.primary.main,
  ':hover': {
    textDecoration: 'none',
  },
});

export const header = style({
  marginTop: '1.414rem',
  marginBottom: '0.5rem',
});
