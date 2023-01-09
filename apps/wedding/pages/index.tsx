import { createClient } from '@supabase/supabase-js';
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
      <section className="h-[75vh] w-screen relative flex justify-center overflow-hidden">
        <Banner />
      </section>
      <section className="container flex flex-col items-center justify-center text-center py-12 px-4 mx-auto mt-[-200px]">
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

  const supabaseAdmin = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL || '',
    process.env.NEXT_PUBLIC_SUPABASE_KEY || ''
  );

  const { data } = await supabaseAdmin.from('images').select('*').order('id');

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
