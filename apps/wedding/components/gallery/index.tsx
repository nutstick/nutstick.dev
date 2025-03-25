import clsx from 'clsx';
import GalleryDialog from 'components/gallery-dialog';
import RemoteImage from 'components/remote-image';
import { motion, useInView } from 'framer-motion';
import { useTranslation } from 'next-i18next';
import Link from 'next/link';
import { useRef } from 'react';
import { GalleryImage } from '../../interface';
import s from './styles.module.css';

export interface GalleryProps {
  images: GalleryImage[];
}

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { ease: 'linear' } },
};

const MotionLink = motion(Link);

function Gallery({ images }: GalleryProps) {
  const { t } = useTranslation('common');
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });

  const renderImageGrid = () => {
    return (
      <motion.div
        ref={ref}
        className="mx-auto grid w-full max-w-2xl grid-cols-3 gap-2 p-4 md:gap-6 md:p-0"
        variants={container}
        initial="hidden"
        animate={isInView ? 'show' : 'hidden'}
      >
        {images.map(({ id, ...props }) => (
          <MotionLink
            variants={item}
            className="flex flex-row"
            key={id}
            href={`/?imageId=${id}`}
            as={`/images/${id}`}
            id={`image-${id}`}
            scroll={false}
          >
            <RemoteImage
              {...props}
              placeholder="blur"
              alt={props.alt ?? 'Image ' + id}
              width={300}
              height={300}
              className="m-0 aspect-square w-full rounded-lg object-cover"
              loading="lazy"
            />
          </MotionLink>
        ))}
      </motion.div>
    );
  };

  return (
    <>
      <GalleryDialog images={images} />
      <div className={s.us}>
        <RemoteImage
          alt={t('wife.fullname')}
          className={clsx(s.image, s.wife)}
          src="/v1673269883/banner/Z5N_0729_dfr9r8.jpg"
          width={300}
          height={450}
        />
        <div className={clsx(s.wifename, s.text)}>{t('wife.fullname')}</div>
        <div className={s.space} />
        <RemoteImage
          alt={t('husband.fullname')}
          className={clsx(s.image, s.husband)}
          src="/v1673269891/banner/Z5N_0755_jt873a.jpg"
          width={300}
          height={450}
        />
        <div className={clsx(s.husbandname, s.text)}>
          {t('husband.fullname')}
        </div>
      </div>
      {renderImageGrid()}
    </>
  );
}

export default Gallery;
