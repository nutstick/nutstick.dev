import InvitationCard from 'components/invitation-card';
import Navbar from 'components/navbar';
import Banner from 'components/sections/banner';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Head from 'next/head';
import type {
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
  NextPage,
} from 'next';
import { lazy, Suspense } from 'react';
import { data } from '../data';

const Sections = lazy(() => import('components/sections').then((m) => m));

const Home: NextPage<
  InferGetServerSidePropsType<typeof getServerSideProps>
> = ({ googleMapKey, images }) => {
  return (
    <>
      <Head>
        <title>Nut and Freda</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      <section className="relative flex h-[75vh] w-screen justify-center overflow-hidden">
        <Banner />
      </section>
      <section className="container mx-auto mt-[-200px] flex flex-col items-center justify-center py-12 px-4 text-center">
        <InvitationCard />
      </section>
      <Suspense fallback={null}>
        <Sections googleMapKey={googleMapKey} images={images} />
      </Suspense>
    </>
  );
};

export const getServerSideProps = async ({
  locale,
  query,
}: GetServerSidePropsContext) => {
  if (query.card != null) {
    return {
      redirect: {
        destination: '/th',
        permanent: false,
      },
    };
  }

  return {
    props: {
      ...(await serverSideTranslations(locale ?? 'en', [
        'common',
        'nav',
        'invitation',
      ])),
      googleMapKey: process.env.GOOGLE_MAP_KEY,
      images: data ?? [],
    },
  };
};

export default Home;
