'use client';

import { useRef, useState } from 'react';
import { motion } from 'framer-motion';

/**
 * MagneticButton — a button that slightly follows the cursor on hover,
 * creating a premium magnetic feel.
 *
 * Props:
 *   children   — button content
 *   strength   — how strongly the button follows the cursor (0–1, default 0.35)
 *   className  — forwarded to the motion.div wrapper
 *   onClick    — click handler
 *   as         — element tag or component (default 'button')
 *   href       — if provided, renders as an <a> tag
 */
export default function MagneticButton({
  children,
  strength = 0.35,
  className = '',
  onClick,
  href,
}) {
  const ref = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  function handleMouseMove(e) {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const deltaX = (e.clientX - centerX) * strength;
    const deltaY = (e.clientY - centerY) * strength;
    setPosition({ x: deltaX, y: deltaY });
  }

  function handleMouseLeave() {
    setPosition({ x: 0, y: 0 });
  }

  const Tag = href ? motion.a : motion.div;

  return (
    <Tag
      ref={ref}
      href={href}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: 'spring', stiffness: 200, damping: 18, mass: 0.5 }}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      className={`inline-block cursor-pointer ${className}`}
    >
      {children}
    </Tag>
  );
}
