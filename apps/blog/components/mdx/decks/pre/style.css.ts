import { style } from '@vanilla-extract/css';
import { vars } from '../../../../styles/theme';

export const highlight = style({
  backgroundColor: vars.colors.backgrounnd.highlighted,
  display: 'block',
  marginRight: '-1em',
  marginLeft: '-1em',
  paddingRight: '1em',
  paddingLeft: '0.75em',
});
