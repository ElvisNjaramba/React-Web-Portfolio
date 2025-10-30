import React from "react";
import { motion } from "framer-motion";
import { useTheme } from "../components/ThemeProvider";
import { Heart } from "lucide-react";

export default function Footer() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <motion.footer
      className={`relative w-full py-8 px-6 border-t transition-colors duration-700 ${
        isDark
          ? "bg-[#050505] border-white/10 text-gray-300"
          : "bg-gradient-to-t from-white to-rose-50 border-black/10 text-gray-700"
      }`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Copyright Text */}
          <motion.p
            className="text-sm font-medium"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400 }}
          >
            © {new Date().getFullYear()} Elvis Njaramba. All rights reserved.
          </motion.p>

          {/* Designed with Love */}
          <motion.div
            className="flex items-center gap-2"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400 }}
          >
            <span className="text-sm font-medium">Designed with</span>
            <motion.div
              animate={{ scale: [1, 1.3, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              <Heart size={16} className="text-rose-500 fill-rose-500" />
            </motion.div>
            <span className="text-sm font-medium">by Elvis Njaramba</span>
          </motion.div>
        </div>

        {/* Subtle theme-aware background glow */}
        <div
          className={`absolute inset-0 -z-10 opacity-50 ${
            isDark
              ? "bg-gradient-to-t from-rose-500/10 via-purple-500/10 to-transparent"
              : "bg-gradient-to-t from-indigo-500/10 to-transparent"
          }`}
        />
      </div>
    </motion.footer>
  );
}
