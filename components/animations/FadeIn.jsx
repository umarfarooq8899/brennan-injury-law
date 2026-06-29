'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

/**
 * FadeIn — scroll-triggered fade + slide wrapper.
 *
 * Props:
 *   children  — content to animate
 *   delay     — seconds to wait before animating (default 0)
 *   direction — 'up' | 'down' | 'left' | 'right' (default 'up')
 *   distance  — px to travel (default 36)
 *   duration  — animation duration in seconds (default 0.7)
 *   once      — only animate on first enter (default true)
 *   className — forwarded to the motion div
 */
export default function FadeIn({
  children,
  delay = 0,
  direction = 'up',
  distance = 36,
  duration = 0.7,
  once = true,
  className = '',
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once, margin: '-80px 0px' });

  const directionMap = {
    up:    { y: distance,   x: 0         },
    down:  { y: -distance,  x: 0         },
    left:  { y: 0,          x: distance  },
    right: { y: 0,          x: -distance },
  };

  const initial = { opacity: 0, ...directionMap[direction] };
  const animate = inView
    ? { opacity: 1, y: 0, x: 0 }
    : initial;

  return (
    <motion.div
      ref={ref}
      initial={initial}
      animate={animate}
      transition={{
        duration,
        delay,
        ease: [0.25, 1, 0.5, 1],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
