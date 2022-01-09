import { style } from '@vanilla-extract/css';
import { vars } from '../../../../styles/theme';

export const container = style({
  color: '#d6deeb',
  background: vars.colors.backgrounnd.code,
  minWidth: '100%',
  padding: '1rem',
  borderRadius: '4px',
  overflowX: 'auto',
});

export const diffAdd = style({
  backgroundColor: 'rgb(53, 59, 69)',
  display: 'block',
  marginRight: '-1em',
  marginLeft: '-1em',
  paddingRight: '1em',
  paddingLeft: '0.75em',
  borderLeft: '0.3em solid #a3ef99',
});
export const diffRemove = style({
  backgroundColor: 'rgb(53, 59, 69)',
  display: 'block',
  marginRight: '-1em',
  marginLeft: '-1em',
  paddingRight: '1em',
  paddingLeft: '0.75em',
  borderLeft: '0.3em solid #f99',
  opacity: '0.8',
});
