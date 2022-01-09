import React, { useCallback, useEffect, useState, useRef } from 'react';
import { animated, useSprings } from '@react-spring/web';
import { useMeasureCallback } from '../../hooks/use-measure-callback';
import { usePrev } from '../../hooks/use-prev';
import { useWindowDimensions } from '../../hooks/use-window-dimensions';
import type { AnimatedProps } from '@react-spring/web';
import type { RectReadOnly } from '../../hooks/use-measure-callback';

interface CellProps {
  index: number;
  style: AnimatedProps<
    React.DetailedHTMLProps<
      React.HTMLAttributes<HTMLDivElement>,
      HTMLDivElement
    >
  >['style'];
  onLayout: (index: number, bound: RectReadOnly) => void;
}

const Cell: React.FC<CellProps> = ({ index, style, children, onLayout }) => {
  const ref = useMeasureCallback({}, (bound) => onLayout(index, bound));
  return (
    <animated.div ref={ref} style={{ ...style, willChange: 'transform' }}>
      {children}
    </animated.div>
  );
};

interface VirtualizedListProps
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  > {
  children: ReadonlyArray<React.ReactElement>;
}

type VirtualizeState = Record<number, { y: number; height: number }>;
type FrameState = [first: number, last: number];

const VirtualizedList: React.FC<VirtualizedListProps> = ({
  children,
  ...props
}) => {
  const target = useRef<null | HTMLDivElement>(null);

  const [frameState, setFrameState] = useState<FrameState>([0, 5]);
  const prevFrameState = usePrev(frameState);

  const { height } = useWindowDimensions();
  const scrollState = useRef({ y: window.scrollY, vy: 0 });

  const springs = useSprings(
    children.length,
    children.map((_, i) => {
      const [first, last] = frameState;
      const { vy } = scrollState.current;
      return {
        opacity: i >= first && i <= last ? 1 : 0,
        transform:
          i >= first && i <= last
            ? 'translateY(0px)'
            : vy > 0
            ? 'translateY(-20px)'
            : 'translateY(20px)',
      };
    })
  );
  const virtualizeState = useRef<VirtualizeState>({});

  const onCellLayout = useCallback((index: number, bound: RectReadOnly) => {
    virtualizeState.current[index] = { y: bound.y, height: bound.height };
  }, []);

  const idx = useCallback((y: number) => {
    let i = 0;
    const initializeY = virtualizeState.current[0].y;
    while (
      virtualizeState.current[i] != null &&
      virtualizeState.current[i].y - virtualizeState.current[i].height <
        y - initializeY
    ) {
      i++;
    }
    return i;
  }, []);

  const updateFrameState = useCallback(
    (y, vy) => {
      if (height == null) return;
      scrollState.current = { y, vy };
      const first = idx(y) - 1;
      const last = idx(y + height);
      setFrameState([first, last]);
    },
    [height, idx]
  );

  useEffect(() => {
    updateFrameState(window.scrollY, 0);
    const handleNavigation = (e: Event) => {
      let vy = 0;
      if (scrollState.current.y > window.scrollY) {
        vy = 1;
      } else if (scrollState.current.y < window.scrollY) {
        vy = -1;
      }
      updateFrameState(window.scrollY, vy);
    };
    window.addEventListener('scroll', handleNavigation);
    return () => {
      window.removeEventListener('scroll', handleNavigation);
    };
  }, [updateFrameState]);

  return (
    <div ref={target} {...props}>
      {springs.map((style, i) => (
        <Cell key={i} index={i} style={style} onLayout={onCellLayout}>
          {children[i]}
        </Cell>
      ))}
    </div>
  );
};

export default VirtualizedList;
