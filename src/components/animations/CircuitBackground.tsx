
import { motion } from 'framer-motion';
import React from 'react';

const CircuitBackground = () => {
  return (
    <div className="absolute inset-0 overflow-hidden z-0 opacity-20">
      <motion.div 
        className="w-full h-full"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <svg width="100%" height="100%" viewBox="0 0 800 800" xmlns="http://www.w3.org/2000/svg">
          <g fill="none" stroke="#067ADB" strokeWidth="1">
            {/* Circuito horizontal */}
            <motion.path 
              d="M100,200 L300,200 L350,250 L500,250 L550,200 L700,200" 
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 3, delay: 0.5 }}
            />
            
            {/* Circuito vertical */}
            <motion.path 
              d="M200,100 L200,300 L250,350 L250,500 L200,550 L200,700" 
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 3, delay: 1 }}
            />
            
            {/* Pontos de conexão */}
            {[200, 400, 600].map((x, i) => 
              [150, 300, 450, 600].map((y, j) => (
                <motion.circle 
                  key={`${i}-${j}`}
                  cx={x} 
                  cy={y} 
                  r="4" 
                  fill="#0ADBDF"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.1 * (i + j) }}
                />
              ))
            )}
            
            {/* Linhas diagonais */}
            <motion.path 
              d="M100,100 L300,300 M500,400 L700,600 M300,500 L500,700" 
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 2, delay: 1.5 }}
            />
          </g>
        </svg>
      </motion.div>
    </div>
  );
};

export default CircuitBackground;
