import { TabList } from 'ariakit/tab';
import { ReactNode } from 'react';
import { useSwipeable } from 'react-swipeable';
import { ImageCarouselState } from './use-image-carousel-state';

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
    <TabList
      state={state}
      className="wide:h-full xl:taller-than-854:h-auto relative flex aspect-[2/3] w-full max-w-7xl items-center md:aspect-[3/2]"
      {...handlers}
    >
      {children}
    </TabList>
  );
}

export default ImageCarousel;
