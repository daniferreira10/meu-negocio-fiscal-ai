
import { motion } from 'framer-motion';
import { ReactNode, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { cn } from '@/lib/utils';
import { Variants } from 'framer-motion';

type AnimatedElementProps = {
  children: ReactNode;
  variants: Variants;
  className?: string;
  delay?: number;
  duration?: number;
  threshold?: number;
  once?: boolean;
};

const AnimatedElement = ({
  children,
  variants,
  className,
  delay = 0,
  duration,
  threshold = 0.1,
  once = true
}: AnimatedElementProps) => {
  const [ref, inView] = useInView({
    threshold,
    triggerOnce: once
  });

  const customTransition = duration ? { duration } : undefined;
  
  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={variants}
      transition={{ delay, ...customTransition }}
      className={cn(className)}
    >
      {children}
    </motion.div>
  );
};

export default AnimatedElement;
