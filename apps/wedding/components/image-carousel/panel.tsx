import { AnimatePresence, motion } from 'framer-motion';
import { useMemo } from 'react';
import RemoteImage from 'components/remote-image';
import { ImageCarouselState } from './use-image-carousel-state';

const variants = {
  enter: (direction: number) => {
    return {
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    };
  },
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => {
    return {
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    };
  },
};

function Panel({ state }: { state: ImageCarouselState }) {
  const active = useMemo(
    () => state.items.find((item) => item.id === state.activeId),
    [state.activeId, state.items]
  );

  if (!active) {
    return null;
  }

  const { id: _, ...imageProps } = active.image;

  return (
    <div className="w-full overflow-hidden bg-red-50">
      <div className="relative flex aspect-[3/2] items-center justify-center">
        <AnimatePresence initial={false} custom={state.direction}>
          <motion.div
            key={active.id}
            custom={state.direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            className="absolute"
          >
            <RemoteImage
              {...imageProps}
              alt={imageProps.alt ?? 'Image ' + active.id}
              bucket="images"
              width={1280}
              height={853}
              priority
              onLoadingComplete={() => state.setLoaded(true)}
            />
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

export default Panel;
