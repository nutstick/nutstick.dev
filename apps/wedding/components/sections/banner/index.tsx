import Image, { ImageLoaderProps } from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useWindowHeightState, useWindowSize } from 'hooks/use-window-size';
import { useTranslation } from 'next-i18next';
import { useCallback } from 'react';

function Banner() {
  const { t } = useTranslation('common');
  const size = useWindowSize();
  const height = useWindowHeightState();

  const { scrollY } = useScroll();
  const progress = useTransform(scrollY, (v) => {
    const bannerHeight = (size.current.height ?? 1000) * 0.75;
    return Math.min(1, Math.max(0, (v - bannerHeight / 5) / bannerHeight));
  });
  const filter = useTransform(progress, (v) => `blur(${v * 8}px)`);
  const transform = useTransform(progress, (v) => `translateY(${v * 64}px)`);

  const cloudinaryLoader = useCallback(
    ({ src, width }: ImageLoaderProps) => {
      return `https://res.cloudinary.com/dbzkbe9cr/image/upload/c_fill,w_${width},h_${Math.floor(
        (height ?? 1000) * 0.75
      )}${src}`;
    },
    [height]
  );

  return (
    <motion.div
      className="w-full h-full relative overflow-hidden"
      style={{ filter, transform }}
    >
      <Image
        className="object-cover"
        loader={cloudinaryLoader}
        src="/v1673175014/banner/banner_nk8p8l.png"
        alt={t('background.alt')}
        fill={true}
        priority={true}
      />
    </motion.div>
  );
}

export default Banner;
