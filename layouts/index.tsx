import React from 'react';
import { animated } from 'react-spring';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Header from './header';
import LayoutMain from './main';
import ThemeProvider from '../components/theme-provider';

import 'modern-normalize';
import '../styles/normalize.css';
import { page } from './style.css';

const Layout: React.FC = ({ children }) => {
  const router = useRouter();
  // if (isDeck) {
  //   return <App {...rest} props={props} element={element} />
  // }

  return (
    <ThemeProvider>
      <Head>
        <title>nutstick.dev</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="description" content="Personal blog" />
        <meta
          name="keywords"
          content="next.js, javascript, react, react-native, graphql, golang"
        />
      </Head>
      <Header />
      <LayoutMain>
        <animated.div className={page}>{children}</animated.div>
      </LayoutMain>
    </ThemeProvider>
  );
};

export default Layout;
