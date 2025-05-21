
import { motion } from 'framer-motion';
import React from 'react';
import { graphAnimation } from '@/utils/animationUtils';

const GraphAnimation = () => {
  // Dados do gráfico simulados
  const data = [20, 40, 30, 70, 50, 80, 90];
  const maxValue = Math.max(...data);
  const width = 300;
  const height = 200;
  const padding = 30;
  
  // Calcula os pontos do gráfico
  const points = data.map((value, index) => {
    const x = padding + (index * ((width - padding * 2) / (data.length - 1)));
    const y = height - padding - ((value / maxValue) * (height - padding * 2));
    return `${x},${y}`;
  }).join(' ');

  return (
    <div className="relative w-full max-w-md mx-auto h-64 overflow-hidden">
      <svg width="100%" height="100%" viewBox={`0 0 ${width} ${height}`}>
        {/* Eixo Y */}
        <motion.line
          x1={padding} y1={padding} x2={padding} y2={height - padding}
          stroke="#067ADB" strokeWidth="2"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1 }}
        />
        
        {/* Eixo X */}
        <motion.line
          x1={padding} y1={height - padding} x2={width - padding} y2={height - padding}
          stroke="#067ADB" strokeWidth="2"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
        />
        
        {/* Linha do gráfico */}
        <motion.polyline
          points={points}
          fill="none"
          stroke="#0ADBDF"
          strokeWidth="3"
          variants={graphAnimation}
          initial="hidden"
          animate="visible"
        />
        
        {/* Pontos do gráfico */}
        {data.map((value, index) => {
          const x = padding + (index * ((width - padding * 2) / (data.length - 1)));
          const y = height - padding - ((value / maxValue) * (height - padding * 2));
          
          return (
            <motion.circle
              key={index}
              cx={x}
              cy={y}
              r="5"
              fill="white"
              stroke="#0ADBDF"
              strokeWidth="2"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.3, delay: 1 + (index * 0.1) }}
            />
          );
        })}
      </svg>
    </div>
  );
};

export default GraphAnimation;
