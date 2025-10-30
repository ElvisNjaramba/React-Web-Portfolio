import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

export default function CycleText() {
  const words = [
    "Crafting Futuristic Interfaces",
    "Innovating with Motion & Code",
    "Designing Intelligent Systems",
    "Building Experiences Beyond Apps",
    "Empowering Digital Creativity",
    
  ];

  const [index, setIndex] = useState(0);
  const total = words.length;

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((current) => (current + 1) % total);
    }, 2500); // slower, cinematic pacing
    return () => clearInterval(interval);
  }, [total]);

  return (
    <div className="font-mono text-center text-lg sm:text-2xl text-gray-300">
      <span className="text-pink-500">{`System.out.println(`}</span>
      <AnimatePresence mode="wait">
        <motion.span
          key={words[index]}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.4 }}
          className="inline-block px-2 text-transparent bg-clip-text bg-gradient-to-r from-rose-500 via-purple-500 to-indigo-400 font-semibold"
        >
          “{words[index]}”
        </motion.span>
      </AnimatePresence>
      <span className="text-pink-500">)</span>
    </div>
  );
}
