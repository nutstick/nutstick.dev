import { useEffect, useRef, useState } from 'react';

export function useWindowHeightState() {
  const [height, setHeight] = useState<number | undefined>(
    typeof window !== 'undefined' ? window.innerHeight : undefined
  );
  useEffect(() => {
    function handleResize() {
      setHeight(window.innerHeight);
    }

    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return height;
}

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
