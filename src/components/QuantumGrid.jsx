import { motion } from 'framer-motion';
import { useRef, useEffect } from 'react';

const QuantumGrid = () => {
  const gridRef = useRef(null);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      <motion.div
        ref={gridRef}
        className="grid grid-cols-12 gap-4 w-full h-full opacity-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.2 }}
        transition={{ duration: 2 }}
      >
        {Array.from({ length: 144 }).map((_, i) => (
          <motion.div
            key={i}
            className="bg-gradient-to-br from-red-500/10 to-transparent rounded-lg"
            animate={{
              opacity: [0.1, 0.3, 0.1],
              scale: [1, 1.05, 1],
            }}
            transition={{
              duration: 2 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </motion.div>
      
      {/* Animated particles */}
      {Array.from({ length: 20 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-red-500 rounded-full"
          animate={{
            x: [0, Math.random() * 400 - 200],
            y: [0, Math.random() * 400 - 200],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 5,
          }}
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
        />
      ))}
    </div>
  );
};

export default QuantumGrid;