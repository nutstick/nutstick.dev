import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import type { ImageCarouselState } from './use-image-carousel-state';

function PanelArrow({ state }: { state: ImageCarouselState }) {
  const index = state.items.findIndex((item) => item.id === state.activeId);

  return state.loaded ? (
    <div className="relative aspect-[3/2] max-h-full w-full">
      {index > 0 && (
        <button
          className="absolute left-3 top-[calc(50%-16px)] rounded-full bg-black/50 p-3 text-white/75 backdrop-blur-lg transition hover:bg-black/75 hover:text-white focus:outline-none"
          style={{ transform: 'translate3d(0, 0, 0)' }}
          onClick={() => state.select(state.previous())}
        >
          <ChevronLeftIcon className="h-6 w-6" />
        </button>
      )}
      {index + 1 < state.items.length && (
        <button
          className="absolute right-3 top-[calc(50%-16px)] rounded-full bg-black/50 p-3 text-white/75 backdrop-blur-lg transition hover:bg-black/75 hover:text-white focus:outline-none"
          style={{ transform: 'translate3d(0, 0, 0)' }}
          onClick={() => state.select(state.next())}
        >
          <ChevronRightIcon className="h-6 w-6" />
        </button>
      )}
    </div>
  ) : null;
}

export default PanelArrow;
