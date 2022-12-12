import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useRef } from 'react';

interface DigitProps {
  value: number;
  size?: number;
}

function Digit({ value, size }: DigitProps) {
  const height = 56;
  const prevValue = useRef(value);

  useEffect(() => {
    prevValue.current = value;
  }, [value]);

  const length = size ?? String(value).length;

  return (
    <div
      className="relative flex items-center justify-center overflow-hidden text-primary"
      style={{ width: length * 0.8 * height + (length - 1) * 4, height }}
    >
      <AnimatePresence>
        <motion.div
          key={value}
          initial={{
            opacity: 0,
            y: -height,
          }}
          exit={{
            opacity: 0,
            y: height,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            type: 'tween',
          }}
          className="absolute top-0 text-5xl"
        >
          {value}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

export default Digit;
