import { Dancing_Script, Lora, Athiti } from '@next/font/google';
import { ReactNode, RefObject, useEffect, useRef, useState } from 'react';
import { PortalContext } from 'ariakit';

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

function LayerProvider({
  children,
  domRef,
}: {
  children: ReactNode;
  domRef: RefObject<HTMLElement | null>;
}) {
  const [rootNode, setRootNode] = useState<null | HTMLElement>(null);

  useEffect(() => {
    if (domRef.current) {
      setRootNode(domRef.current);
    }
  }, [domRef]);

  return (
    <PortalContext.Provider value={rootNode}>{children}</PortalContext.Provider>
  );
}

function Layout({ children }: { children: ReactNode }) {
  const ref = useRef(null);

  return (
    <div
      id="container"
      className={`${lora.variable} ${notoSansThai.variable} ${cormarantGaramond.variable} font-sans`}
      ref={ref}
    >
      <LayerProvider domRef={ref}>{children}</LayerProvider>
    </div>
  );
}

export default Layout;
