import React from 'react';
import clsx from 'clsx';
import Button from 'components/button';
import { useTranslation } from 'next-i18next';
import Logo from 'components/logo';
import { motion } from 'framer-motion';
import { useGoldColor } from 'hooks/use-gold-color';

const container = {
  hidden: { y: 60 },
  show: {
    y: 0,
    transition: {
      ease: 'linear',
      staggerChildren: 0.3,
      delayChildren: 0.0,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { ease: 'linear' } },
};

function InvitationCard() {
  const { t } = useTranslation('invitation');
  const color = useGoldColor();
  const nameColor = useGoldColor({ offset: 0.3, length: 0.5 });

  return (
    <motion.div
      className={clsx(
        'z-10 w-full max-w-xl border border-gray-200 bg-white px-8 py-6 shadow-md',
        'flex flex-col items-center gap-8'
      )}
      variants={container}
      initial="hidden"
      animate="show"
    >
      <motion.div variants={item}>
        <Logo color={color} className="h-32 w-32" />
      </motion.div>
      <motion.p variants={item} className="text-bold">
        <span>{t('parents.freda')}</span>
        <br />
        <span>{t('parents.nut')}</span>
      </motion.p>
      <motion.p variants={item}>
        {t('invitation.desc')
          .split('\n')
          .map((child: string, index: number) => (
            <React.Fragment key={index}>
              {index === 0 ? null : <br />}
              {child}
            </React.Fragment>
          ))}
      </motion.p>
      <motion.div variants={item}>
        <motion.h3
          className="text-primary"
          style={{
            fontFamily: 'var(--font-cormarant-garamond)',
            color: nameColor,
          }}
        >
          {t('freda')}
        </motion.h3>
        <div>&</div>
        <motion.h3
          className="text-primary"
          style={{
            fontFamily: 'var(--font-cormarant-garamond)',
            color: nameColor,
          }}
        >
          {t('nut')}
        </motion.h3>
      </motion.div>
      <motion.p variants={item}>
        {t('footer')
          .split('\n')
          .map((child: string, index: number) => (
            <React.Fragment key={index}>
              {index === 0 ? null : <br />}
              {child}
            </React.Fragment>
          ))}
      </motion.p>
      <Button
        onClick={() =>
          window.scrollTo({
            top: document.body.scrollHeight,
            behavior: 'smooth',
          })
        }
      >
        {t('rsvp')}
      </Button>
    </motion.div>
  );
}

export default InvitationCard;
