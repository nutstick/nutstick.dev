import { useEffect, useMemo, useRef, useState } from 'react';
import { useCompositeState } from 'ariakit/composite';
import type { SetState } from 'ariakit-utils';
import type { CompositeState } from 'ariakit/composite';
import type { GalleryImage } from '../../interface';

type ImageGalleryStateItem = CompositeState['items'][number] & {
  image: GalleryImage;
};

export interface ImageCarouselStateProps {
  defaultSelectedImageId?: GalleryImage['id'] | null | undefined;
  selectedImageId?: GalleryImage['id'] | null | undefined;
  setSelectedImageId?: (
    activeId: GalleryImage['id'] | null | undefined
  ) => void;
}

export type ImageCarouselState = CompositeState<ImageGalleryStateItem> & {
  direction: number;
  selectedImageId: ImageCarouselStateProps['selectedImageId'];
  setSelectedImageId: ImageCarouselStateProps['setSelectedImageId'];
  active: ImageGalleryStateItem | undefined;
  loaded: boolean;
  setLoaded: SetState<boolean>;
};

function findEnabledSlideById(
  items: ImageGalleryStateItem[],
  id?: string | null
) {
  return items.find((item) => item.id === id);
}

export function useImageCarouselState({
  defaultSelectedImageId,
  selectedImageId,
  setSelectedImageId,
  ...props
}: ImageCarouselStateProps = {}): ImageCarouselState {
  const [loaded, setLoaded] = useState(false);
  const [direction, setDirection] = useState(0);
  const composite = useCompositeState<ImageGalleryStateItem>({
    orientation: 'horizontal',
    focusLoop: true,
    virtualFocus: true,

    defaultActiveId: String(defaultSelectedImageId),
    activeId: String(selectedImageId),
    setActiveId: setSelectedImageId
      ? (id) => setSelectedImageId(Number(id))
      : undefined,
    ...props,
  });

  const active = useMemo(
    () => findEnabledSlideById(composite.items, composite.activeId),
    [composite.activeId, composite.items]
  );

  const previous = useRef(composite.activeId);
  useEffect(() => {
    if (composite.activeId == null) {
      setDirection(0);
      return;
    }
    if (previous.current !== composite.activeId) {
      const previousIndex = composite.items.findIndex(
        ({ id }) => id === previous.current
      );
      const index = composite.items.findIndex(
        ({ id }) => id === composite.activeId
      );
      if (index > previousIndex) {
        setDirection(1);
      } else {
        setDirection(-1);
      }
    }

    previous.current = composite.activeId;
  }, [composite.activeId, composite.items]);

  const state = useMemo(() => {
    return {
      ...composite,
      selectedImageId,
      setSelectedImageId,
      active,
      direction,
      loaded,
      setLoaded,
    };
  }, [
    composite,
    selectedImageId,
    setSelectedImageId,
    active,
    direction,
    loaded,
  ]);

  return state;
}
