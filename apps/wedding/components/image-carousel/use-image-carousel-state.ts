import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useCompositeState } from 'ariakit/composite';
import type { SetState } from 'ariakit-utils';
import type { CompositeState } from 'ariakit/composite';
import {
  useControlledState,
  useLiveRef,
  usePreviousValue,
} from 'ariakit-react-utils';
import type { GalleryImage } from '../../interface';

type ImageGalleryStateItem = CompositeState['items'][number] & {
  image: GalleryImage;
};

export interface ImageCarouselStateProps {
  defaultSelectedImageId?: number | null | undefined;
  selectedImageId?: number | null | undefined;
  setSelectedImageId?: SetState<number | null | undefined>;
}

export type ImageCarouselState = CompositeState<ImageGalleryStateItem> & {
  direction: number;
  selectedImageId: ImageCarouselStateProps['selectedImageId'];
  setSelectedImageId: ImageCarouselStateProps['setSelectedImageId'];
  select: ImageCarouselState['move'];
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

function findEnabledSlideByImageId(
  items: ImageGalleryStateItem[],
  id?: number | undefined | null
) {
  return items.find((item) => item.image.id === id);
}

export function useImageCarouselState(
  props: ImageCarouselStateProps = {}
): ImageCarouselState {
  const [selectedImageId, setSelectedImageId] = useControlledState(
    props.defaultSelectedImageId,
    props.selectedImageId,
    props.setSelectedImageId
  );

  const [loaded, setLoaded] = useState(false);
  const [direction, setDirection] = useState(0);
  const composite = useCompositeState<ImageGalleryStateItem>({
    orientation: 'horizontal',
    focusLoop: true,
    virtualFocus: true,
    ...props,
  });
  const compositeRef = useLiveRef(composite);

  // Selects the active tab when selectOnMove is true. Since we're listening to
  // the moves state, but not the activeId state, this effect will run only when
  // there's a move, which is usually triggered by moving through the tabs using
  // the keyboard.
  useEffect(() => {
    const { activeId, items } = compositeRef.current;
    if (!activeId) return;
    const slide = findEnabledSlideById(items, activeId);
    if (!slide) return;
    setSelectedImageId(slide.image.id);
  }, [composite.moves, compositeRef, setSelectedImageId]);

  // Keep activeId in sync with selectedImageId.
  useEffect(() => {
    if (
      selectedImageId ===
      findEnabledSlideById(
        compositeRef.current.items,
        compositeRef.current.activeId
      )
    )
      return;

    console.log(
      'sync',
      findEnabledSlideByImageId(composite.items, selectedImageId)?.id
    );
    composite.setActiveId(
      findEnabledSlideByImageId(composite.items, selectedImageId)?.id
    );
  }, [composite, compositeRef, selectedImageId]);

  const select: ImageCarouselState['select'] = useCallback(
    (id) => {
      composite.move(id);
      setSelectedImageId(findEnabledSlideById(composite.items, id)?.image.id);
    },
    [composite, setSelectedImageId]
  );

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
      select,
      active,
      direction,
      loaded,
      setLoaded,
    };
  }, [
    composite,
    selectedImageId,
    setSelectedImageId,
    select,
    active,
    direction,
    loaded,
  ]);

  return state;
}
