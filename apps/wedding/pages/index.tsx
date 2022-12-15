import Head from 'next/head';
import Image from 'next/image';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Navbar from 'components/navbar';
import Details from 'components/details';
import ContactUs from 'components/contact-us';
import RSVPForm from 'components/rsvp-form';
import InvitationCard from 'components/invitation-card';
import type { InferGetServerSidePropsType, NextPage } from 'next';

import imgWedding from 'public/wedding.jpeg';
import imgHandwriting from 'public/nut-freda-handwriting.svg';

const Home: NextPage<InferGetServerSidePropsType<typeof getServerSideProps>> = (
  _props
) => {
  const { t } = useTranslation('common');
  return (
    <>
      <Head>
        <title>Nut and Freda</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      <section className="h-[75vh] w-screen relative flex justify-center overflow-hidden">
        <Image
          src={imgWedding}
          alt={t('background.alt')}
          className="h-full object-cover"
        />
        <Image
          src={imgHandwriting}
          alt={t('intro.title')}
          className="absolute bottom-0 w-1/2 translate-x-[7%] translate-y-[-250px] text-center text-primary"
        />
      </section>
      <section className="container flex flex-col items-center justify-center text-center py-12 px-12 mx-auto mt-[-200px]">
        <InvitationCard />
      </section>
      <section
        id="details"
        className="container mx-auto flex flex-col items-center px-4"
      >
        <Details />
      </section>
      <section id="maps" className="w-screen">
        <iframe
          width="100%"
          height="450"
          style={{ border: 0 }}
          loading="lazy"
          allowFullScreen
          referrerPolicy="no-referrer-when-downgrade"
          src="https://www.google.com/maps/embed/v1/place?key=AIzaSyBZ2wy8X__rH-OSvnBX6JBTS9-rSYdYL4w
    &q=S.D.+Avenue+Hotel"
        ></iframe>
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

export const getServerSideProps = async ({ locale }: { locale?: string }) => {
  const res = await fetch('https://api.github.com/repos/vercel/next.js');
  const json = await res.json();
  return {
    props: {
      ...(await serverSideTranslations(locale ?? 'en', [
        'common',
        'nav',
        'invitation',
      ])),
      stars: json.stargazers_count,
    },
  };
};

export default Home;
