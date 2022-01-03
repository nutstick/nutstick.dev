import { style } from '@vanilla-extract/css';
import { vars } from '../../styles/theme';

export const container = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  marginBottom: '4em',
});

export const avatar = style({
  borderRadius: '1rem',
  width: '50%',
  maxWidth: '220px',
});

export const name = style({
  '@media': {
    [`(max-width: ${vars.breakpoints.md})`]: {
      // TODO: to EM
      fontSize: vars.dimensions.fontSize.large,
    },
  },
});
