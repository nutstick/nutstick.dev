import { useTranslation } from 'next-i18next';
import Heading from 'components/heading';

function ContactUs() {
  const { t } = useTranslation('common');
  return (
    <>
      <Heading>{t('contact.title')}</Heading>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 mt-4">
        <div className="flex flex-col items-center">
          <h4>{t('contact.nut.name')}</h4>
          <div className="flex-1 flex flex-col justify-center p-4">
            <p>
              <b>{t('contact.tel.label')}</b>:{t('contact.nut.tel')}
              <br />
              <b>{t('contact.line.label')}</b>:{t('contact.nut.line')}
              <br />
              <b>{t('contact.telegram.label')}</b>:{t('contact.nut.telegram')}
            </p>
          </div>
        </div>
        <div className="flex flex-col items-center">
          <h4>{t('contact.freda.name')}</h4>
          <div className="flex-1 flex flex-col justify-center p-4">
            <p>
              <b>{t('contact.tel.label')}</b>:{t('contact.freda.tel')}
              <br />
              <b>{t('contact.line.label')}</b>:{t('contact.freda.line')}
              <br />
              <b>{t('contact.telegram.label')}</b>:{t('contact.freda.telegram')}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default ContactUs;
