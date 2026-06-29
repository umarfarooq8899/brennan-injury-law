'use client';

import { motion } from 'framer-motion';

/**
 * StaggerContainer — wraps children and staggers their entrance animations.
 *
 * Props:
 *   children      — must be motion.* elements or wrapped children
 *   staggerDelay  — seconds between each child (default 0.1)
 *   initialDelay  — seconds before first child starts (default 0)
 *   className     — forwarded to the wrapper div
 *
 * Usage:
 *   <StaggerContainer>
 *     <StaggerItem>Card 1</StaggerItem>
 *     <StaggerItem>Card 2</StaggerItem>
 *   </StaggerContainer>
 */

export const containerVariants = (staggerDelay = 0.1, initialDelay = 0) => ({
  hidden: {},
  visible: {
    transition: {
      delayChildren: initialDelay,
      staggerChildren: staggerDelay,
    },
  },
});

export const itemVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.65,
      ease: [0.25, 1, 0.5, 1],
    },
  },
};

export function StaggerContainer({
  children,
  staggerDelay = 0.1,
  initialDelay = 0,
  className = '',
}) {
  return (
    <motion.div
      className={className}
      variants={containerVariants(staggerDelay, initialDelay)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-80px 0px' }}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({ children, className = '' }) {
  return (
    <motion.div variants={itemVariants} className={className}>
      {children}
    </motion.div>
  );
}
