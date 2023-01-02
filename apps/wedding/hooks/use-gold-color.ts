import { useScroll, useTransform } from 'framer-motion';
import { useWindowSize } from 'hooks/use-window-size';

export function useGoldColor({
  offset = 0.1,
  length = 0.5,
}: { offset?: number; length?: number } = {}) {
  const size = useWindowSize();
  const { scrollY } = useScroll();
  const progress = useTransform(scrollY, (v) => {
    const st = (size.current.height ?? 1000) * offset;
    const len = (size.current.height ?? 1000) * length;
    return Math.min(1, Math.max(0, (v - st) / len));
  });
  const color = useTransform(
    progress,
    [0, 0.44, 0.8, 1],
    ['#ba9051', '#dfbf65', '#ffed93', '#ba9051']
  );

  return color;
}
