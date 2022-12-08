import React from 'react';
import Head from 'next/head';
import ThemeProvider from '../components/theme-provider';

import 'modern-normalize';
import '../styles/normalize.css';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
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
      {children}
    </ThemeProvider>
  );
};

export default Layout;
