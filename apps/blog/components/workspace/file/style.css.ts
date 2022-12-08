import { globalStyle, style } from '@vanilla-extract/css';
import { vars } from '../../../styles/theme';
import { height, icon, tab } from '../vars.css';

export const file = style({
  transition: 'all 0.1s ease-in',
  ':hover': {
    backgroundColor: vars.colors.backgrounnd.highlighted,
  },
});
