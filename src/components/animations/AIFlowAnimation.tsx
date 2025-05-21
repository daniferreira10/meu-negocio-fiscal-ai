
import { motion } from 'framer-motion';
import React from 'react';

const AIFlowAnimation = () => {
  const neuronCount = 8;
  const connectionCount = 12;
  
  // Gera posições aleatórias para os neurônios
  const neurons = Array.from({ length: neuronCount }).map((_, i) => ({
    id: i,
    x: 100 + Math.random() * 600,
    y: 100 + Math.random() * 400,
    size: 10 + Math.random() * 10
  }));
  
  // Cria algumas conexões entre os neurônios
  const connections = Array.from({ length: connectionCount }).map((_, i) => {
    const from = neurons[Math.floor(Math.random() * neurons.length)];
    const to = neurons[Math.floor(Math.random() * neurons.length)];
    return {
      id: i,
      from,
      to,
      active: Math.random() > 0.5
    };
  });

  return (
    <div className="w-full h-full">
      <svg width="800" height="600" viewBox="0 0 800 600">
        {/* Conexões */}
        {connections.map((conn) => (
          <React.Fragment key={conn.id}>
            <motion.line
              x1={conn.from.x}
              y1={conn.from.y}
              x2={conn.to.x}
              y2={conn.to.y}
              stroke="#067ADB"
              strokeWidth="1"
              strokeOpacity="0.6"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 0.6 }}
              transition={{ duration: 1.5, delay: conn.id * 0.1 }}
            />
            
            {conn.active && (
              <motion.circle
                r="4"
                fill="#0ADBDF"
                initial={{ 
                  cx: conn.from.x, 
                  cy: conn.from.y,
                  opacity: 0 
                }}
                animate={{
                  cx: [conn.from.x, conn.to.x],
                  cy: [conn.from.y, conn.to.y],
                  opacity: [0, 1, 0]
                }}
                transition={{
                  duration: 2,
                  ease: "easeInOut",
                  repeat: Infinity,
                  repeatDelay: Math.random() * 3 + 1
                }}
              />
            )}
          </React.Fragment>
        ))}
        
        {/* Neurônios */}
        {neurons.map((neuron) => (
          <motion.circle
            key={neuron.id}
            cx={neuron.x}
            cy={neuron.y}
            r={neuron.size}
            fill="url(#gradient)"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: neuron.id * 0.1 }}
          />
        ))}
        
        {/* Gradiente para os neurônios */}
        <defs>
          <radialGradient id="gradient" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
            <stop offset="0%" stopColor="#0ADBDF" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#067ADB" stopOpacity="0.3" />
          </radialGradient>
        </defs>
      </svg>
    </div>
  );
};

export default AIFlowAnimation;
