'use client';

import { useRef, useEffect, useState } from 'react';
import { useInView } from 'framer-motion';

/**
 * CountUp — animates a number from 0 to `target` when it enters the viewport.
 *
 * Props:
 *   target   — the final number to count to
 *   prefix   — string prepended (e.g. '$')
 *   suffix   — string appended (e.g. 'M+', ' yrs')
 *   duration — animation duration in seconds (default 1.8)
 *   decimals — decimal places (default 0)
 */
export default function CountUp({
  target,
  prefix = '',
  suffix = '',
  duration = 1.8,
  decimals = 0,
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px 0px' });
  const [count, setCount] = useState(0);
  const started = useRef(false);

  useEffect(() => {
    if (!inView || started.current) return;
    started.current = true;

    const startTime = performance.now();
    const totalMs = duration * 1000;

    function easeOut(t) {
      return 1 - Math.pow(1 - t, 3);
    }

    function step(now) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / totalMs, 1);
      const value = easeOut(progress) * target;
      setCount(value);
      if (progress < 1) requestAnimationFrame(step);
    }

    requestAnimationFrame(step);
  }, [inView, target, duration]);

  const display = count.toFixed(decimals);

  return (
    <span ref={ref}>
      {prefix}{display}{suffix}
    </span>
  );
}
