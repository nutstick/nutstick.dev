import { useCallback, useState } from 'react';

export function useMeasureNode() {
  const [rect, setRect] = useState<DOMRect>();
  const ref = useCallback(
    (node: HTMLHeadingElement) => {
      if (node !== null && !rect) {
        setRect(node.getBoundingClientRect());
      }
    },
    [rect]
  );
  return { ref, rect };
}
