import { useEffect, useMemo, useRef, useState } from 'react';
import { BivariantCallback, SetState } from 'ariakit-utils';
import { GalleryImage } from '../../interface';
import { TabState, TabStateProps, useTabState } from 'ariakit/tab';

type ImageGalleryStateItem = TabState['items'][number] & {
  image: GalleryImage;
};

export interface ImageCarouselStateProps extends TabStateProps {}

export type CarouselTabState = Omit<
  TabState,
  'items' | 'setItems' | 'registerItem'
> & {
  items: ImageGalleryStateItem[];
  setItems: SetState<ImageCarouselState['items']>;
  registerItem: BivariantCallback<(item: ImageGalleryStateItem) => () => void>;
};

export type ImageCarouselState = CarouselTabState & {
  direction: number;
  loaded: boolean;
  setLoaded: SetState<boolean>;
};

export function useImageCarouselState(
  props: ImageCarouselStateProps = {}
): ImageCarouselState {
  const [loaded, setLoaded] = useState(false);
  const [direction, setDirection] = useState(0);
  const tab = useTabState({
    orientation: 'horizontal',
    focusLoop: true,
    virtualFocus: true,
    ...props,
  }) as CarouselTabState;

  const previous = useRef(tab.activeId);

  useEffect(() => {
    if (tab.activeId == null) {
      setDirection(0);
      return;
    }
    if (previous.current !== tab.activeId) {
      const previousIndex = tab.items.findIndex(
        ({ id }) => id === previous.current
      );
      const index = tab.items.findIndex(({ id }) => id === tab.activeId);
      if (index > previousIndex) {
        setDirection(1);
      } else {
        setDirection(-1);
      }
    }

    previous.current = tab.activeId;
  }, [tab.activeId, tab.items]);

  const state = useMemo(() => {
    return {
      ...tab,
      direction,
      loaded,
      setLoaded,
    };
  }, [tab, direction, loaded]);

  return state;
}
