import { useEffect, useRef } from 'react';

export function useWindowSize() {
  const windowSize = useRef<{
    width: number | undefined;
    height: number | undefined;
  }>({
    width: undefined,
    height: undefined,
  });
  useEffect(() => {
    function handleResize() {
      windowSize.current = {
        width: window.innerWidth,
        height: window.innerHeight,
      };
    }

    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowSize;
}
