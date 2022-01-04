import { globalStyle, style } from '@vanilla-extract/css';
import { vars } from '../../styles/theme';

export const header = style({
  height: vars.heights.header,
  padding: `0 ${vars.dimensions.containerPadding}`,
  color: vars.colors.text.lightPrimary,
  transition: 'all 0.2s ease-in-out',
});

export const container = style({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  height: '100%',
  maxWidth: '1280px',
});

export const homeLogo = style({
  color: vars.colors.text.primary,
  filter: vars.filter,
  fontSize: '1.5rem',
  fontWeight: '600',
  ':hover': {
    textDecoration: 'none',
  },
  ':focus': {
    textDecoration: 'none',
  },
});

export const rightMenu = style({
  display: 'flex',
  flexDirection: 'row',
});

globalStyle(`${rightMenu} > *`, {
  marginLeft: '1rem',
});
