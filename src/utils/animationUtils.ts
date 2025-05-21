
import { Variants } from 'framer-motion';

export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.6 } }
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } }
};

export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.2
    }
  }
};

export const floatingAnimation: Variants = {
  hidden: { y: 0 },
  visible: { 
    y: [0, -10, 0], 
    transition: { 
      repeat: Infinity, 
      repeatType: "reverse", 
      duration: 4, 
      ease: "easeInOut" 
    } 
  }
};

export const pulseAnimation: Variants = {
  hidden: { scale: 1 },
  visible: { 
    scale: [1, 1.05, 1],
    transition: { 
      repeat: Infinity, 
      repeatType: "reverse", 
      duration: 3, 
      ease: "easeInOut" 
    } 
  }
};

export const graphAnimation: Variants = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: { 
    pathLength: 1, 
    opacity: 1,
    transition: { 
      pathLength: { duration: 1.5, ease: "easeInOut" },
      opacity: { duration: 0.3 }
    } 
  }
};
