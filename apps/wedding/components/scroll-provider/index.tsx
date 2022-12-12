import { ReactNode, useMemo, useRef } from 'react';
import { ScrollProviderContext, ScrollProviderContextValue } from './context';

export function useScrollProvider() {
  const ref = useRef<Element | void>(
    typeof document !== 'undefined' ? document.body : undefined
  );
  const value = useMemo(() => {
    return ref.current ? { scrollRef: ref } : { scrollRef: undefined };
  }, []);
  return {
    value,
    ref,
  };
}

export interface ScrollProviderProps {
  value: ScrollProviderContextValue;
  children: ReactNode;
}

export function ScrollProvider({ value, children }: ScrollProviderProps) {
  return (
    <ScrollProviderContext.Provider value={value}>
      {children}
    </ScrollProviderContext.Provider>
  );
}
