import { createContext, RefObject } from 'react';

export interface ScrollProviderContextValue {
  scrollRef: RefObject<Element> | undefined;
}

export const ScrollProviderContext = createContext<ScrollProviderContextValue>({
  scrollRef: undefined,
});
