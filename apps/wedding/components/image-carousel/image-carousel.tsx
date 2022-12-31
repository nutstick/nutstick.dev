import { Composite } from 'ariakit';
import { useSwipeable } from 'react-swipeable';
import type { ReactNode } from 'react';
import type { ImageCarouselState } from './use-image-carousel-state';

function ImageCarousel({
  state,
  children,
}: {
  state: ImageCarouselState;
  children: ReactNode;
}) {
  const handlers = useSwipeable({
    onSwipedLeft: () => state.select(state.next()),
    onSwipedRight: () => state.select(state.previous()),
    trackMouse: true,
  });

  return (
    <Composite
      className="relative flex aspect-[3/2] w-full max-w-7xl items-center wide:h-full xl:taller-than-854:h-auto"
      state={state}
      {...handlers}
    >
      {children}
    </Composite>
  );
}

export default ImageCarousel;
