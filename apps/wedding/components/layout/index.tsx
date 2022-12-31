import { Dancing_Script, Lora, Noto_Sans_Thai } from '@next/font/google';
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

const notoSansThai = Noto_Sans_Thai({
  weight: ['300', '600'],
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
