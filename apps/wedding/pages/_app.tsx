import { useMemo } from 'react';
import { appWithTranslation } from 'next-i18next';
import { Mulish, Noto_Sans_Thai } from '@next/font/google';
import { PortalContext } from 'ariakit/portal';
import '../styles/global.css';
import type { AppProps } from 'next/app';

const mulish = Mulish({
  weight: ['300', '400'],
  variable: '--font-mulish',
  preload: true,
  subsets: ['latin'],
});

const notoSansThai = Noto_Sans_Thai({
  weight: ['300', '600'],
  variable: '--font-noto-sans-thai',
  preload: true,
  subsets: ['thai'],
});

const MyApp = ({ Component, pageProps }: AppProps) => {
  const container = useMemo(
    () =>
      typeof document !== 'undefined'
        ? document.getElementById('container')
        : null,
    []
  );
  return (
    <div
      id="container"
      className={`${mulish.variable} ${notoSansThai.variable} font-sans`}
    >
      <main>
        <PortalContext.Provider value={container}>
          <Component {...pageProps} />
        </PortalContext.Provider>
      </main>
    </div>
  );
};

export default appWithTranslation(MyApp);
