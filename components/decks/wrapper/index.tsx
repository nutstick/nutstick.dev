import React from 'react';
import Deck from 'gatsby-theme-mdx-deck/src/components/deck';
import splitSlides from 'gatsby-theme-mdx-deck/src/split-slides';
import Header from '../header';
import { useTheme } from '../../../hooks/use-theme';
import {
  darkTextPrimary,
  lightTextPrimary,
  darkBackgroundPaper,
  lightBackgroundPaper,
  darkPrimary,
  lightPrimary,
} from '../../../styles/theme/const';

type Props = any;

const Wrapper: React.FC<Props> = (props) => {
  const { title } = props;
  const { mode } = useTheme();
  const slides = splitSlides(props);
  const { components } = props;

  return (
    <div style={{ padding: '1.5em' }}>
      <Deck
        {...props}
        slides={slides}
        theme={{
          components,
          colors: {
            text: mode === 'dark' ? darkTextPrimary : lightTextPrimary,
            background:
              mode === 'dark' ? darkBackgroundPaper : lightBackgroundPaper,
            primary: mode === 'dark' ? darkPrimary : lightPrimary,
          },
          lineHeights: {
            body: 1.5,
            heading: 1.125,
          },
          styles: {
            img: {
              width: '100vw',
              maxWidth: '100%',
              height: '100vh',
              objectFit: 'contain',
            },
            code: {
              fontFamily: 'monospace',
            },
            blockquote: {
              fontSize: '2em',
            },
            pre: {
              fontFamily: 'monospace',
            },
            Header: {
              px: 3,
            },
            Footer: {
              px: 3,
            },
          },
          // fontSizes: [12, 14, 16, 20, 24, 32, 48, 64]
        }}
      />
      <Header title={title} />
    </div>
  );
};

export default Wrapper;
