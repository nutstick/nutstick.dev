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
  backgroundColor: vars.colors.backgrounnd.highlighted,
  display: 'block',
  marginRight: '-1em',
  marginLeft: '-1em',
  paddingRight: '1em',
  paddingLeft: '0.75em',
  borderLeft: `0.3em solid ${vars.colors.success.main}`,
});

export const diffRemove = style({
  backgroundColor: vars.colors.backgrounnd.highlighted,
  display: 'block',
  marginRight: '-1em',
  marginLeft: '-1em',
  paddingRight: '1em',
  paddingLeft: '0.75em',
  borderLeft: `0.3em solid ${vars.colors.warning.main}`,
  opacity: '0.8',
});
