import { globalStyle } from '@vanilla-extract/css';
import { vars } from './theme';

globalStyle('html', {
  boxSizing: 'border-box',
});

globalStyle('*, *::berfore, *::after', {
  boxSizing: 'inherit',
});

globalStyle('body', {
  width: '100%',
  overflowX: 'hidden',
  overflowY: 'scroll',
  fontFamily: vars.fonts.sansSerif,
});

globalStyle('a', {
  color: vars.colors.primary.main,
  textDecoration: 'none',
});

globalStyle('a:hover, a:focus', {
  textDecoration: 'underline',
});

globalStyle('img', {
  maxWidth: '100%',
  objectFit: 'contain',
  position: 'relative',
});

globalStyle('figure', {
  margin: '2rem 0',
});

globalStyle('table', {
  width: '100%',
  marginBottom: '1rem',
  border: `1px solid ${vars.colors.primary.contrast}`,
  fontSize: '85%',
  borderCollapse: 'collapse',
});

globalStyle('td, th', {
  padding: '.25rem .5rem',
  border: `1px solid ${vars.colors.primary.contrast}`,
});

globalStyle('th', {
  textAlign: 'left',
});

globalStyle('tbody tr &:nth-of-type(odd) td, tbody tr &:nth-of-type(odd) tr', {
  backgroundColor: vars.colors.primary.whisper,
});

globalStyle('h1, h2, h3, h4, h5, h6', {
  marginTop: '1.414rem',
  marginBottom: '.5rem',
  fontWeight: '600',
  lineHeight: vars.dimensions.lineHeight.heading,
  textRendering: 'optimizeLegibility',
});

globalStyle('h1', {
  marginTop: 0,
  fontSize: vars.dimensions.headingSizes.h1,
});

globalStyle('h2', {
  fontSize: vars.dimensions.headingSizes.h2,
});

globalStyle('h3', {
  fontSize: vars.dimensions.headingSizes.h3,
});

globalStyle('h4, h5, h6', {
  fontSize: vars.dimensions.headingSizes.h4,
});

globalStyle('p', {
  marginTop: '0',
  marginBottom: '1rem',
  fontSize: vars.dimensions.fontSize.regular,
});

globalStyle('ul, ol, dl', {
  marginTop: '0',
  marginBottom: '1rem',
  fontSize: vars.dimensions.fontSize.regular,
});

globalStyle('dt', {
  fontWeight: 'bold',
});

globalStyle('dd', {
  marginBottom: '.5rem',
});

globalStyle('hr', {
  position: 'relative',
  margin: '1.5rem 0',
  border: '0',
  borderTop: `1px solid ${vars.colors.primary.contrast}`,
});

globalStyle('blockquote', {
  margin: '.8rem 0',
  padding: '.5rem 1rem',
  borderLeft: `.25rem solid ${vars.colors.primary.contrast}`,
});

globalStyle('blockquote p:last-child', {
  marginBottom: '0',
});
