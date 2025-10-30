import { motion } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';

const HolographicTerminal = () => {
  const [lines, setLines] = useState([]);
  const terminalRef = useRef(null);

  useEffect(() => {
    const commands = [
      "> Initiating Elvis Njaramba Portfolio ...",
      "> Loading creative engine [██████████]",
      "> Importing futuristic UI components ...",
      "> Portfolio system online ✅",
      "> Hello, Welcome...",
    ];

    let currentLine = 0;
    const interval = setInterval(() => {
      if (currentLine < commands.length) {
        setLines(prev => [...prev, commands[currentLine]]);
        currentLine++;
      } else {
        clearInterval(interval);
      }
    }, 400);

    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1 }}
      className="relative p-6 bg-black/50 border border-red-500/40 rounded-xl backdrop-blur-sm overflow-hidden shadow-[0_0_35px_rgba(255,0,51,0.4)]"
    >
      {/* animated glow */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-red-600/10 to-transparent animate-pulse rounded-xl" />

      {/* terminal text */}
      <div ref={terminalRef} className="relative z-10 font-mono text-sm sm:text-base text-green-400 h-40 overflow-hidden">
        {lines.map((line, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.15 }}
            className="mb-1"
          >
            {line}
            {index === lines.length - 1 && (
              <motion.span
                animate={{ opacity: [1, 0] }}
                transition={{ duration: 0.5, repeat: Infinity }}
                className="ml-1 text-red-400"
              >
                █
              </motion.span>
            )}
          </motion.div>
        ))}
      </div>

      {/* subtle scan lines */}
      <div className="absolute inset-0 pointer-events-none opacity-20 mix-blend-overlay">
        {Array.from({ length: 40 }).map((_, i) => (
          <div
            key={i}
            className="h-[1px] bg-gradient-to-r from-transparent via-red-600/50 to-transparent"
            style={{
              marginBottom: "4px",
              animation: "scanline 4s linear infinite",
              animationDelay: `${i * 0.15}s`,
            }}
          />
        ))}
      </div>
    </motion.div>
  );
};

export default HolographicTerminal;
