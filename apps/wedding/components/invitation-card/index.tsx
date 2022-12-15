import React from 'react';
import clsx from 'clsx';
import Button from 'components/button';
import { useTranslation } from 'next-i18next';

function InvitationCard() {
  const { t } = useTranslation('invitation');
  return (
    <div
      className={clsx(
        'max-w-xl px-6 py-12 bg-white border border-gray-200 shadow-md z-10',
        'flex flex-col gap-8'
      )}
    >
      <p>{t('title')}</p>
      <p className="text-bold">
        <span>{t('parents.freda')}</span>
        <br />
        <span>{t('parents.nut')}</span>
      </p>
      <div>
        <h3
          className="text-primary"
          style={{
            fontFamily: 'var(--font-cormarant-garamond)',
          }}
        >
          {t('freda')}
        </h3>
        <div>&</div>
        <h3
          className="text-primary"
          style={{
            fontFamily: 'var(--font-cormarant-garamond)',
          }}
        >
          {t('nut')}
        </h3>
      </div>
      <p>
        {t('footer')
          .split('\n')
          .map((child: string, index: number) => (
            <React.Fragment key={index}>
              {index === 0 ? null : <br />}
              {child}
            </React.Fragment>
          ))}
      </p>
      <Button>{t('rsvp')}</Button>
    </div>
  );
}

export default InvitationCard;
