import { useMemo } from 'react';
import { appWithTranslation } from 'next-i18next';
import { Dancing_Script, Noto_Sans_Thai, Lora } from '@next/font/google';
import { PortalContext } from 'ariakit/portal';
import '../styles/global.css';
import type { AppProps } from 'next/app';

const cormarantGaramond = Dancing_Script({
  weight: '400',
  variable: '--font-cormarant-garamond',
  preload: true,
  subsets: ['latin'],
});

const lora = Lora({
  weight: '400',
  variable: '--font-lora',
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
      className={`${lora.variable} ${notoSansThai.variable} ${cormarantGaramond.variable} font-sans`}
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
