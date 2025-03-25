import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useWindowSize } from 'hooks/use-window-size';
import { useTranslation } from 'next-i18next';

function Banner() {
  const { t } = useTranslation('common');
  const sizeRef = useWindowSize();

  const { scrollY } = useScroll();
  const progress = useTransform(scrollY, (v) => {
    const bannerHeight = (sizeRef.current.height ?? 1000) * 0.75;
    return Math.min(1, Math.max(0, (v - bannerHeight / 5) / bannerHeight));
  });
  const filter = useTransform(progress, (v) => `blur(${v * 8}px)`);
  const transform = useTransform(progress, (v) => `translateY(${v * 64}px)`);

  return (
    <motion.div
      className="relative h-full w-full overflow-hidden"
      style={{ filter, transform }}
    >
      <Image
        className="object-cover"
        src="https://res.cloudinary.com/dbzkbe9cr/image/upload/v1673175014/banner/banner_nk8p8l.png"
        alt={t('background.alt')}
        fill={true}
        priority={true}
      />
    </motion.div>
  );
}

export default Banner;
