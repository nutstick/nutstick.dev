import clsx from 'clsx';
import BlurImage from 'components/blur-image';
import RemoteImage from 'components/remote-image';
import { useTranslation } from 'next-i18next';
import Link from 'next/link';
import { GalleryImage } from '../../interface';
import s from './styles.module.css';

export interface GalleryProps {
  images: GalleryImage[];
}

function Gallery({ images }: GalleryProps) {
  const { t } = useTranslation('common');

  const renderImageGrid = () => {
    return (
      <div className="grid grid-cols-3 gap-2 md:gap-6 mx-auto w-full max-w-2xl p-4 md:p-0">
        {images.map(({ id, alt, src }) => (
          <Link
            className="flex flex-row"
            key={id}
            href={`/?imageId=${id}`}
            as={`/images/${id}`}
            id={`image-${id}`}
          >
            <RemoteImage
              alt={alt ?? 'Image ' + id}
              src={src}
              className="aspect-square w-full rounded-lg m-0"
            />
          </Link>
        ))}
      </div>
    );
  };

  return (
    <>
      <div className={s.us}>
        <BlurImage
          alt={t('wife.fullname')}
          className={clsx(s.image, s.wife)}
          src="/"
        />
        <div className={clsx(s.wifename, s.text)}>{t('wife.fullname')}</div>
        <div className={s.space} />
        <BlurImage
          alt={t('husband.fullname')}
          className={clsx(s.image, s.husband)}
          src="/"
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
