import { RecoilRoot } from 'recoil';
import { Suspense } from 'react';
import type { AppProps } from 'next/app';
import styles from '../styles/root.module.css';
import '../styles/globals.css';
import Sidebar from 'components/sidebar';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <RecoilRoot>
      <Suspense fallback={null}>
        <div className={styles.container}>
          <Sidebar />
          <Component {...pageProps} />
        </div>
      </Suspense>
    </RecoilRoot>
  );
}

export default MyApp;
