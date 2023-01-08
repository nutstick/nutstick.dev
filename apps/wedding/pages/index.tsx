import { createClient } from '@supabase/supabase-js';
import ContactUs from 'components/contact-us';
import Details from 'components/details';
import Gallery from 'components/gallery';
import InvitationCard from 'components/invitation-card';
import Navbar from 'components/navbar';
import RSVPForm from 'components/rsvp-form';
import Banner from 'components/sections/banner';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Head from 'next/head';
import { useRouter } from 'next/router';
import type {
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
  NextPage,
} from 'next';

function queryString(q: string | string[] | undefined) {
  if (Array.isArray(q)) {
    return q[0];
  } else if (q != null) {
    return q;
  }
  return null;
}

const Home: NextPage<
  InferGetServerSidePropsType<typeof getServerSideProps>
> = ({ googleMapKey, images }) => {
  const invitation = queryString(useRouter().query.i);
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
      {process.env.NEXT_PUBLIC_GALLERY ? (
        <section className="flex flex-col gap-12 mb-12">
          <Gallery images={images} />
        </section>
      ) : null}
      <section
        id="details"
        className="container mx-auto flex flex-col items-center px-4"
      >
        <Details invitation={invitation} />
      </section>
      <section id="maps" className="w-screen">
        <iframe
          width="100%"
          height="450"
          style={{ border: 0 }}
          loading="lazy"
          allowFullScreen
          referrerPolicy="no-referrer-when-downgrade"
          src={`https://www.google.com/maps/embed/v1/place?key=${googleMapKey}&q=S.D.+Avenue+Hotel`}
        />
      </section>
      <section id="contact-us" className="flex flex-col items-center px-4 mt-8">
        <ContactUs />
      </section>
      <section
        id="rsvp"
        className="container mx-auto flex flex-col items-center mt-8"
      >
        <RSVPForm />
      </section>
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
