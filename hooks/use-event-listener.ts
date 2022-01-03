import { useRef, useEffect } from 'react';

export function useEventListener(
  eventName: string,
  handler: any,
  element?: HTMLElement
) {
  const windowEl = process.browser ? window : null;
  const eventEl = element ?? windowEl;
  // Create a ref that stores handler
  const savedHandler = useRef<any>();

  // Update ref.current value if handler changes.
  // This allows our effect below to always get latest handler ...
  // ... without us needing to pass it in effect deps array ...
  // ... and potentially cause effect to re-run every render.
  useEffect(() => {
    savedHandler.current = handler;
  }, [handler]);

  useEffect(
    () => {
      // Make sure element supports addEventListener
      // On
      const isSupported = eventEl && eventEl.addEventListener;
      if (!isSupported) return;

      // Create event listener that calls handler function stored in ref
      const eventListener: EventListener = (event) =>
        savedHandler.current(event);

      // Add event listener
      eventEl.addEventListener(eventName, eventListener);

      // Remove event listener on cleanup
      return () => {
        eventEl.removeEventListener(eventName, eventListener);
      };
    },
    [eventName, eventEl] // Re-run if eventName or element changes
  );
}
