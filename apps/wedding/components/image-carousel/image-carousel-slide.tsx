import { Tab, TabProps } from 'ariakit/tab';
import clsx from 'clsx';
import { motion } from 'framer-motion';
import { useCallback } from 'react';
import RemoteImage from 'components/remote-image';
import { GalleryImage } from '../../interface';
import { ImageCarouselState } from './use-image-carousel-state';

type ImageCarouselSlideProps = TabProps & {
  state: ImageCarouselState;
  index: number;
  image: GalleryImage;
};

function ImageCarouselSlide({ state, index, image }: ImageCarouselSlideProps) {
  const { id: _, ...imageProps } = image;
  const id = String(image.id);
  const activeIndex =
    state.items.findIndex(({ id }) => id === state.activeId) ?? -1;
  const active = id === state.activeId;

  const getItem = useCallback<NonNullable<TabProps['getItem']>>(
    (item) => {
      return { ...item, image };
    },
    [image]
  );

  return (
    <Tab
      id={id}
      state={state}
      getItem={getItem}
      as={motion.button}
      initial={{
        width: '0%',
        x: `${Math.max((activeIndex - 1) * -100, 15 * -100)}%`,
      }}
      animate={{
        scale: active ? 1.25 : 1,
        width: '100%',
        x: `${Math.max(activeIndex * -100, 15 * -100)}%`,
      }}
      exit={{ width: '0%' }}
      className={clsx(
        active ? 'z-20 rounded-md shadow shadow-black/50' : 'z-10',
        index === 0 ? 'rounded-l-md' : '',
        index === state.items.length - 1 ? 'rounded-r-md' : '',
        'relative inline-block w-full shrink-0 transform-gpu overflow-hidden focus:outline-none'
      )}
    >
      <RemoteImage
        {...imageProps}
        alt={imageProps.alt ?? 'Image ' + image.id}
        width={180}
        height={120}
        className={clsx(
          'h-full transform object-cover transition',
          active
            ? 'brightness-110 hover:brightness-110'
            : 'brightness-50 contrast-125 hover:brightness-75'
        )}
      />
    </Tab>
  );
}

export default ImageCarouselSlide;
