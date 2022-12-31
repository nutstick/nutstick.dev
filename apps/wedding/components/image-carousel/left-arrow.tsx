import type { DetailedHTMLProps, ButtonHTMLAttributes } from 'react';
import type { ImageCarouselState } from './use-image-carousel-state';

interface LeftArrowProps
  extends Omit<
    DetailedHTMLProps<
      ButtonHTMLAttributes<HTMLButtonElement>,
      HTMLButtonElement
    >,
    'onClick'
  > {
  state: ImageCarouselState;
}

function LeftArrow({ state, children, ...props }: LeftArrowProps) {
  const index = state.items.findIndex((item) => item.id === state.activeId);

  return state.loaded && index > 0 ? (
    <button {...props} onClick={() => state.move(state.previous())}>
      {children}
    </button>
  ) : null;
}

export default LeftArrow;
