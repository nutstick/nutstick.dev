import { useRef, useEffect } from 'react';

export const usePrev = <T>(value: T) => {
  const prev = useRef<T | undefined>(undefined);
  useEffect(() => {
    prev.current = value;
  });
  return prev.current;
};
