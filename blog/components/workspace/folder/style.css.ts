import { globalStyle, style } from '@vanilla-extract/css';
import { vars } from '../../../styles/theme';
import { height, icon, tab } from '../vars.css';

export const folder = style({
  display: 'flex',
  flexDirection: 'column',
  position: 'relative',
  borderRadius: 4,
  transition: 'all 0.1s ease-in',
  ':hover': {
    backgroundColor: vars.colors.backgrounnd.highlighted,
  },
});

export const children = style({
  position: 'relative',
  paddingLeft: icon,
  '::before': {
    content: '',
    borderLeft: '1px solid grey',
    position: 'absolute',
    height: 'calc(100% - 26px)',
    left: 15,
  },
});

globalStyle(`${children} > *::before`, {
  content: '',
  borderBottom: '1px solid grey',
  width: 24,
  position: 'absolute',
  left: `calc(${icon} * -1)`,
  top: `calc(${height} / 2)`,
  margin: `0px calc(-2px + ${tab})`,
});
