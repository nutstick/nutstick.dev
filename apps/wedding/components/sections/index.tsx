import ContactUs from 'components/contact-us';
import Details from 'components/details';
import Gallery from 'components/gallery';
import RSVPForm from 'components/rsvp-form';
import { useRouter } from 'next/router';
import { GalleryImage } from '../../interface';

function queryString(q: string | string[] | undefined) {
  if (Array.isArray(q)) {
    return q[0];
  } else if (q != null) {
    return q;
  }
  return null;
}

function Sections({
  googleMapKey,
  images,
}: {
  googleMapKey: string | undefined;
  images: GalleryImage[];
}) {
  const invitation = queryString(useRouter().query.i);
  return (
    <>
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
}

export default Sections;
