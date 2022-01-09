import { useEffect, useRef, useCallback } from 'react';
import { useEventListener } from './use-event-listener';

type MeasureableElement = HTMLElement | SVGElement;

export interface RectReadOnly {
  readonly x: number;
  readonly y: number;
  readonly width: number;
  readonly height: number;
  readonly top: number;
  readonly right: number;
  readonly bottom: number;
  readonly left: number;
  [key: string]: number;
}

export type Options = {
  offsetSize?: boolean;
};

type State = {
  element: MeasureableElement | null;
  resizeObserver: ResizeObserver | null;
  lastBounds: RectReadOnly;
};

const notReadyBounds = {
  left: 0,
  top: 0,
  width: 0,
  height: 0,
  bottom: 0,
  right: 0,
  x: 0,
  y: 0,
};

export function useMeasureCallback(
  { offsetSize }: Options = {
    offsetSize: false,
  },
  callback: (bound: RectReadOnly) => unknown
) {
  const currentCallback = useRef(callback);
  currentCallback.current = callback;
  // keep all state in a ref
  const state = useRef<State>({
    element: null,
    resizeObserver: null,
    lastBounds: notReadyBounds,
  });

  // make sure to update state only as long as the component is truly mounted
  const mounted = useRef(false);
  useEffect(() => {
    mounted.current = true;
    return () => void (mounted.current = false);
  });

  // memoize handlers, so event-listeners know when they should update
  const measure = useCallback(() => {
    if (!state.current.element) return;
    const { left, top, width, height, bottom, right, x, y } =
      state.current.element.getBoundingClientRect() as unknown as RectReadOnly;

    const size = {
      left,
      top,
      width,
      height,
      bottom,
      right,
      x,
      y,
    };

    if (state.current.element instanceof HTMLElement && offsetSize) {
      size.height = state.current.element.offsetHeight;
      size.width = state.current.element.offsetWidth;
    }

    Object.freeze(size);
    if (mounted.current && !areBoundsEqual(state.current.lastBounds, size))
      currentCallback.current((state.current.lastBounds = size));
  }, [offsetSize]);

  // cleanup current observers
  function removeListeners() {
    if (state.current.resizeObserver) {
      state.current.resizeObserver.disconnect();
      state.current.resizeObserver = null;
    }
  }

  // add observers
  const addListeners = useCallback(() => {
    if (!state.current.element) return;
    state.current.resizeObserver = new ResizeObserver(measure);
    state.current.resizeObserver!.observe(state.current.element);
  }, [measure]);

  // the ref we expose to the user
  const ref = (node: MeasureableElement | null) => {
    if (!node || node === state.current.element) return;
    removeListeners();
    state.current.element = node;
    addListeners();
  };

  // add general event listeners
  useEventListener('resize', measure);

  // respond to changes that are relevant for the listeners
  useEffect(() => {
    removeListeners();
    addListeners();
  }, [addListeners]);

  // remove all listeners when the components unmounts
  useEffect(() => removeListeners, []);
  return ref;
}

// Checks if element boundaries are equal
const keys: (keyof RectReadOnly)[] = [
  'x',
  'y',
  'top',
  'bottom',
  'left',
  'right',
  'width',
  'height',
];
const areBoundsEqual = (a: RectReadOnly, b: RectReadOnly): boolean =>
  keys.every((key) => a[key] === b[key]);
