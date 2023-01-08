import Image from 'next/image';
import Link from 'next/link';
import { useTranslation } from 'next-i18next';
import CountDown from 'components/count-down';
import Heading from 'components/heading';

import icLocation from 'public/wedding-location.svg';
import icRings from 'public/wedding-rings.svg';

function Details({ invitation }: { invitation: null | string }) {
  const { t } = useTranslation('common');
  return (
    <>
      <Heading>{t('details.title')}</Heading>
      <h2 className="mt-8 mb-4">{t('details.subtitle')}</h2>
      <CountDown />
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 py-10 mt-4">
        <div className="flex flex-col items-center">
          <Image
            src={icRings}
            alt={t('details.time.alt')}
            className="w-[58px] h-[58px] m-5"
          />
          <h3 className="uppercase">{t('details.time.title')}</h3>
          <div className="flex-1 flex flex-col justify-center p-4 text-center">
            <p>
              <b>{t('details.time.date')}</b>
              <br />
              {invitation ? (
                <>
                  <b>{t('details.time.wedding.label')}</b>:
                  {t('details.time.wedding.time')}
                  <br />
                </>
              ) : null}
              <b>{t('details.time.bouquet.label')}</b>:
              {t('details.time.bouquet.time')}
            </p>
          </div>
        </div>
        <div className="flex flex-col items-center">
          <Image
            src={icLocation}
            alt={t('details.location.alt')}
            className="w-[58px] h-[58px] m-5"
          />
          <h3 className="uppercase">{t('details.location.title')}</h3>
          <div className="flex-1 flex flex-col justify-center p-4 text-center">
            <p>
              <b>{t('details.location.room')}</b>
              <br />
              <b>{t('details.location.hotel')}</b>
              <br />
              <Link href="https://www.google.com/maps/place/S.D.+Avenue+Hotel/@13.7761166,100.4798982,15z/data=!4m2!3m1!1s0x0:0x11e686801f80c689?sa=X&ved=2ahUKEwjkionsu-X7AhVlyHMBHX64AZ8Q_BJ6BAh8EAc">
                <span
                  dangerouslySetInnerHTML={{
                    __html: t('details.location.address')
                      .split('\n')
                      .join('<br />'),
                  }}
                />
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Details;
