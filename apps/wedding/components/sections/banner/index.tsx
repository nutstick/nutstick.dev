import BlurImage from 'components/blur-image';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useWindowSize } from 'hooks/use-window-size';
import { useTranslation } from 'next-i18next';
import { ImageLoaderProps } from 'next/image';

function supabaseLoader({ src, width, quality }: ImageLoaderProps) {
  return `https://nxebvjdlaxautnvwsjzo.supabase.co/storage/v1/object/public/banner/${src}?width=${width}&quality=${
    quality || 75
  }`;
}

function Banner() {
  const { t } = useTranslation('common');
  const size = useWindowSize();

  const { scrollY } = useScroll();
  const progress = useTransform(scrollY, (v) => {
    const bannerHeight = (size.current.height ?? 1000) * 0.75;
    return Math.min(1, Math.max(0, (v - bannerHeight / 2.5) / bannerHeight));
  });
  const filter = useTransform(progress, (v) => `blur(${v * 8}px)`);
  const transform = useTransform(progress, (v) => `translateY(${v * 64}px)`);

  return (
    <motion.div className="w-full h-full" style={{ filter, transform }}>
      <BlurImage
        loader={supabaseLoader}
        src="banner.png"
        alt={t('background.alt')}
        className="h-full"
        quality={100}
        priority={true}
      />
    </motion.div>
  );
}

export default Banner;
