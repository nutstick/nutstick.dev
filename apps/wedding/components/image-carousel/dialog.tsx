import {
  ChevronLeftIcon,
  ChevronRightIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline';
import { Dialog, DialogDismiss, useDialogState } from 'ariakit/dialog';
import { AnimatePresence, motion, MotionConfig } from 'framer-motion';
import { GalleryImage } from 'interface';
import { useRouter } from 'next/router';
import ImageCarousel from './image-carousel';
import ImageCarouselSlide from './image-carousel-slide';
import LeftArrow from './left-arrow';
import Panel from './panel';
import RightArrow from './right-arrow';
import { useImageCarouselState } from './use-image-carousel-state';

function GalleryDialog({ images }: { images: GalleryImage[] }) {
  const router = useRouter();
  const imageId = Number(router.query.imageId);
  const selectedImageId = Number.isNaN(imageId) ? undefined : imageId;

  const state = useDialogState({
    open: selectedImageId != null,
    setOpen: (value: boolean) => {
      if (!value) {
        router.push(`/`, undefined, { shallow: true, scroll: false });
      }
    },
    animated: true,
  });
  const carousel = useImageCarouselState({
    selectedImageId,
    setSelectedImageId: (imageId) => {
      if (typeof imageId === 'function') {
        const newImageId = imageId(selectedImageId);
        router.push(
          {
            query: { imageId: newImageId },
          },
          `/images/${newImageId}`,
          { shallow: true, scroll: false }
        );
      } else if (imageId != null) {
        router.push(
          {
            query: { imageId },
          },
          `/images/${imageId}`,
          { shallow: true, scroll: false }
        );
      }
    },
  });

  return (
    <Dialog className="dialog" state={state} style={{ zIndex: 50 }}>
      <MotionConfig
        transition={{
          x: { type: 'spring', stiffness: 300, damping: 30 },
          opacity: { duration: 0.2 },
        }}
      >
        <ImageCarousel state={carousel}>
          <Panel state={carousel} />
          <div className="absolute inset-0 mx-auto flex max-w-7xl items-center justify-center">
            <div className="absolute top-0 left-0 flex items-center gap-2 p-3 text-white">
              <DialogDismiss className="rounded-full bg-black/50 p-2 text-white/75 backdrop-blur-lg transition hover:bg-black/75 hover:text-white">
                <XMarkIcon className="h-5 w-5" />
              </DialogDismiss>
            </div>
            <LeftArrow
              state={carousel}
              className="absolute left-3 top-[calc(50%-16px)] rounded-full bg-black/50 p-3 text-white/75 backdrop-blur-lg transition hover:bg-black/75 hover:text-white focus:outline-none"
              style={{ transform: 'translate3d(0, 0, 0)' }}
            >
              <ChevronLeftIcon className="h-6 w-6" />
            </LeftArrow>
            <RightArrow
              state={carousel}
              className="absolute right-3 top-[calc(50%-16px)] rounded-full bg-black/50 p-3 text-white/75 backdrop-blur-lg transition hover:bg-black/75 hover:text-white focus:outline-none"
              style={{ transform: 'translate3d(0, 0, 0)' }}
            >
              <ChevronRightIcon className="h-6 w-6" />
            </RightArrow>
            <div className="fixed inset-x-0 bottom-0 z-40 overflow-hidden bg-gradient-to-b from-black/0 to-black/60">
              <motion.div
                initial={false}
                className="mx-auto mt-6 mb-6 flex aspect-[3/2] h-14"
              >
                <AnimatePresence initial={false}>
                  {images.map((image, index) => (
                    <ImageCarouselSlide
                      key={image.id}
                      state={carousel}
                      index={index}
                      image={image}
                    />
                  ))}
                </AnimatePresence>
              </motion.div>
            </div>
          </div>
        </ImageCarousel>
      </MotionConfig>
    </Dialog>
  );
}

export default GalleryDialog;
