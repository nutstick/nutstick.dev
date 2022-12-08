import React, { useState } from 'react';
import { animated, useSpring } from '@react-spring/web';
import { useInView } from 'react-intersection-observer';
import { useGesture } from '@use-gesture/react';
import { cell } from './style.css';

const Cell: React.FC<{ direction: number; children: React.ReactNode }> = ({
  direction,
  children,
}) => {
  const { ref, inView } = useInView({
    threshold: 0,
  });
  const style = useSpring({
    opacity: +inView,
    transform: inView
      ? 'translateY(0px)'
      : direction >= 0
      ? 'translateY(20px)'
      : 'translateY(-20px)',
  });
  return (
    <animated.div className={cell} ref={ref} style={style}>
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

const VirtualizedList: React.FC<VirtualizedListProps> = ({
  children,
  ...props
}) => {
  const [direction, setDirection] = useState(0);

  useGesture(
    {
      onScroll: ({ direction: [_, dy] }) => {
        if (dy !== direction) {
          setDirection(dy);
        }
      },
    },
    { target: window }
  );

  return (
    <div {...props}>
      {React.Children.map(children, (child, i) => (
        <Cell key={i} direction={direction}>
          {child}
        </Cell>
      ))}
    </div>
  );
};

export default VirtualizedList;
