import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";

/**
 * useCountUp — counts from 0 to `end` when the returned ref's element
 * scrolls into view. Uses requestAnimationFrame with an ease-out-cubic
 * easing for a natural deceleration.
 *
 * @param {number} end       Target integer value
 * @param {number} duration  Animation length in seconds (default 1.5)
 * @returns {{ count: number, ref: React.RefObject }}
 */
export function useCountUp(end, duration = 1.5) {
  const ref      = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  const [count, setCount]  = useState(0);
  const rafRef = useRef(null);

  useEffect(() => {
    if (!isInView) return;

    const endVal    = Math.max(0, Math.floor(end));
    const startTime = performance.now();

    const tick = (now) => {
      const progress = Math.min((now - startTime) / (duration * 1000), 1);
      // Ease-out cubic: decelerates toward the end
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * endVal));

      if (progress < 1) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        setCount(endVal);
      }
    };

    rafRef.current = requestAnimationFrame(tick);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [isInView, end, duration]);

  return { count, ref };
}
