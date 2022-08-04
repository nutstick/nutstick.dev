import React, { useState } from 'react';
import { useSwipeable } from 'react-swipeable';
import { useRouter } from 'next/router';
import { useEventListener } from '../hooks/use-event-listener';
import Slide from './slide';
import { MDXProvider } from '@mdx-js/react';
import {
  Pre,
  H1,
  H2,
  H3,
  H4,
  P,
  Li,
  Header,
  Split,
  Terminal,
  FullScreenCode,
  Row,
  ThemeImage,
} from '../components/mdx/decks';
import { deck } from './deck.css';
import ThemeProvider from '../components/theme-provider';
import type { Frontmatter } from '../interfaces';

interface Props {
  frontmatter: Frontmatter;
  children: ReadonlyArray<React.ReactElement>;
}

// Index of keyboard keys for navigation
const NEXT = [13, 32, 39];
const PREV = 37;

export const Container: React.FC<{
  children: ReadonlyArray<React.ReactElement>;
}> = ({ children }) => {
  const initialSlide = window.location.hash
    ? parseInt(window.location.hash.replace('#', ''))
    : 0;
  const [currentSlide, setSlide] = useState(initialSlide);
  const router = useRouter();

  let slideCount = 0;

  const navigate = ({ keyCode }: { keyCode: number }) => {
    const slide = parseInt(router.query.slide as string, 10);
    if (keyCode === PREV && currentSlide === 0) {
      if (router.query && router.query.slide) {
        if (slide > 1) {
          router.push(`/slides/${slide - 1}#999`);
        }
      }
      return false;
    }
    if (NEXT.indexOf(keyCode) !== -1 && currentSlide === slideCount) {
      if (router.query && router.query.slide) {
        // Check for max page count
        if (slide < slideCount) {
          router.push(`/slides/${slide + 1}`);
        }
      }
      return false;
    }
    if (NEXT.indexOf(keyCode) !== -1) {
      setSlide((prevState) => {
        window.location.hash = `#${prevState + 1}`;
        return prevState + 1;
      });
    } else if (keyCode === PREV) {
      setSlide((prevState) => {
        window.location.hash = `#${prevState - 1}`;
        return prevState - 1;
      });
    }
  };

  const renderSlide = () => {
    let generatedSlides: React.ReactElement[][] = [];
    let generatorCount = 0;
    // Filter down children by only Slides
    React.Children.map(children, (child) => {
      // Check for <hr> element to separate slides
      const childType =
        child && child.props && (child.props.mdxType || [child.type]);
      if (childType && childType.includes('hr')) {
        generatorCount += 1;
        return;
      }
      // Add slide content to current generated slide
      // If current index doesn't have array, make one to push into
      if (!Array.isArray(generatedSlides[generatorCount])) {
        generatedSlides[generatorCount] = [];
      }
      generatedSlides[generatorCount].push(child);
    });
    // Get total slide count
    slideCount = generatorCount;
    // Change to last slide if we nav'd from a prev page
    if (currentSlide === 999) {
      window.location.hash = `#${slideCount}`;
      setSlide(slideCount);
    }
    // Return current slide
    return <Slide>{generatedSlides[currentSlide]}</Slide>;
  };

  useEventListener('keydown', navigate);
  const handlers = useSwipeable({
    onSwipedLeft: () => {
      navigate({ keyCode: NEXT[0] });
    },
    onSwipedRight: () => {
      navigate({ keyCode: PREV });
    },
  });

  return (
    <div className={deck} {...handlers}>
      {renderSlide()}
    </div>
  );
};

const Layout: React.FC<Props> = ({ frontmatter, children }) => {
  return (
    <ThemeProvider deck={true}>
      <MDXProvider
        components={{
          pre: Pre,
          h1: H1,
          h2: H2,
          h3: H3,
          h4: H4,
          p: P,
          li: Li,
          Split,
          Terminal,
          FullScreenCode,
          Row,
          ThemeImage,
        }}
      >
        <Header title={frontmatter.title} />
        {children}
      </MDXProvider>
    </ThemeProvider>
  );
};

export default Layout;
