import { appWithTranslation } from 'next-i18next';
import '../styles/global.css';
import Layout from 'components/layout';
import type { AppProps } from 'next/app';

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <Layout>
      <main>
        <Component {...pageProps} />
      </main>
    </Layout>
  );
};

export default appWithTranslation(MyApp);
