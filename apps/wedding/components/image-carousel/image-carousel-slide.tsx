import { CompositeItem, CompositeItemProps } from 'ariakit/composite';
import clsx from 'clsx';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useCallback } from 'react';
import type { MouseEvent } from 'react';
import type { CompositeItemOptions } from 'ariakit/composite';
import type { GalleryImage } from '../../interface';
import type { ImageCarouselState } from './use-image-carousel-state';
import { supabaseLoader } from 'components/remote-image';

type ImageCarouselSlideProps = CompositeItemProps<'button'> & {
  state: ImageCarouselState;
  index: number;
  image: GalleryImage;
};

function ImageCarouselSlide({ state, index, image }: ImageCarouselSlideProps) {
  const id = String(image.id);
  const activeIndex =
    state.items.findIndex(({ id }) => id === state.activeId) ?? -1;
  const active = id === state.activeId;

  const onClick = useCallback(
    (event: MouseEvent<HTMLButtonElement>) => {
      if (event.defaultPrevented) return;
      state.move(id);
    },
    [id, state]
  );

  const getItem = useCallback<NonNullable<CompositeItemOptions['getItem']>>(
    (item) => {
      return { ...item, image };
    },
    [image]
  );

  return (
    <CompositeItem
      id={id}
      state={state}
      getItem={getItem}
      onClick={onClick}
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
      <Image
        alt={image.alt ?? 'Image ' + image.id}
        src={image.src}
        loader={supabaseLoader}
        width={180}
        height={120}
        className={clsx(
          'h-full transform object-cover transition',
          active
            ? 'brightness-110 hover:brightness-110'
            : 'brightness-50 contrast-125 hover:brightness-75'
        )}
      />
    </CompositeItem>
  );
}

export default ImageCarouselSlide;
