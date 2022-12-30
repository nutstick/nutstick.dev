import type { DetailedHTMLProps, ButtonHTMLAttributes } from 'react';
import type { ImageCarouselState } from './use-image-carousel-state';

interface RightArrowProps
  extends Omit<
    DetailedHTMLProps<
      ButtonHTMLAttributes<HTMLButtonElement>,
      HTMLButtonElement
    >,
    'onClick'
  > {
  state: ImageCarouselState;
}

function RightArrow({ state, children, ...props }: RightArrowProps) {
  const index = state.items.findIndex((item) => item.id === state.activeId);

  return state.loaded && index < state.items.length - 1 ? (
    <button {...props} onClick={() => state.select(state.next())}>
      {children}
    </button>
  ) : null;
}

export default RightArrow;
