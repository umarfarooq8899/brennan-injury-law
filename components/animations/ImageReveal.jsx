'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

/**
 * ImageReveal — reveals an image with a sliding wipe overlay.
 * The dark cover slides away (left or right) exposing the image beneath.
 *
 * Props:
 *   children  — the <Image /> or <img /> element
 *   direction — 'left' | 'right' (direction the cover slides away, default 'right')
 *   delay     — seconds before animation starts (default 0)
 *   duration  — animation duration (default 0.9)
 *   className — forwarded to the outer wrapper div
 */
export default function ImageReveal({
  children,
  direction = 'right',
  delay = 0,
  duration = 0.9,
  className = '',
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px 0px' });

  const initial = direction === 'right' ? { scaleX: 1, originX: 0 } : { scaleX: 1, originX: 1 };
  const animate = inView ? { scaleX: 0 } : initial;

  return (
    <div ref={ref} className={`relative overflow-hidden ${className}`}>
      {/* The actual content (image) — scales in from slightly smaller */}
      <motion.div
        initial={{ scale: 1.08 }}
        animate={inView ? { scale: 1 } : { scale: 1.08 }}
        transition={{ duration: duration + 0.2, delay, ease: [0.25, 1, 0.5, 1] }}
        className="w-full h-full"
      >
        {children}
      </motion.div>

      {/* The sliding cover overlay */}
      <motion.div
        initial={initial}
        animate={animate}
        transition={{ duration, delay, ease: [0.76, 0, 0.24, 1] }}
        className="absolute inset-0 bg-charcoal z-10 origin-left"
        style={{
          transformOrigin: direction === 'right' ? '100% 50%' : '0% 50%',
        }}
      />
    </div>
  );
}
