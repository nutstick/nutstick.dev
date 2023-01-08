import {
  Dancing_Script,
  Lora,
  Noto_Sans_Thai,
  Athiti,
} from '@next/font/google';
import { ReactNode } from 'react';

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

const notoSansThai = Athiti({
  weight: ['500'],
  variable: '--font-noto-sans-thai',
  preload: true,
  subsets: ['thai'],
});

function Layout({ children }: { children: ReactNode }) {
  return (
    <div
      id="container"
      className={`${lora.variable} ${notoSansThai.variable} ${cormarantGaramond.variable} font-sans`}
    >
      {children}
    </div>
  );
}

export default Layout;
