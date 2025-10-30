'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Home,
  User,
  FolderGit2,
  Mail,
  Sun,
  Moon,
} from 'lucide-react';
import { useTheme } from './ThemeProvider';

export default function FloatingNavDock() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobile, setIsMobile] = React.useState(false);
  const { theme, toggleTheme } = useTheme();

  React.useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const NAV_ITEMS = [
    { id: 'home', label: 'Home', icon: Home, path: '/' },
    { id: 'about', label: 'About', icon: User, path: '/about' },
    { id: 'projects', label: 'Projects', icon: FolderGit2, path: '/projects' },
    { id: 'contact', label: 'Contact', icon: Mail, path: '/contact' },
  ];

  const containerPos = isMobile
    ? 'bottom-4 left-1/2 -translate-x-1/2'
    : 'top-4 left-1/2 -translate-x-1/2';

  return (
    <div className={`fixed z-50 pointer-events-none ${containerPos} w-full max-w-[95vw] sm:max-w-[600px]`}>
      <div className="pointer-events-auto flex flex-col items-center w-full">
        <motion.nav
          animate={!isMobile ? { y: [0, 4, 0] } : { y: 0 }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          className={`flex items-center justify-between ${
            isMobile ? 'px-3 py-2' : 'p-2 sm:px-4'
          } w-full sm:w-auto
            ${theme === 'dark' ? 'bg-white/10' : 'bg-black/10'}
            backdrop-blur-md rounded-2xl shadow-lg
            ring-1 ${theme === 'dark' ? 'ring-white/10' : 'ring-black/10'}
            flex-wrap sm:flex-nowrap gap-3`}
        >

          {/* Brand / Logo */}
          <motion.span
            className="font-extrabold tracking-tight text-lg sm:text-xl flex-shrink-0"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            whileHover={{ scale: 1.05 }}
            style={{
              textShadow:
                theme === 'dark'
                  ? '0 0 10px rgba(255, 50, 100, 0.8), 0 0 20px rgba(255, 100, 150, 0.5)'
                  : '0 0 8px rgba(255, 120, 120, 0.5)',
            }}
          >
            <span className="text-rose-600">E</span>
            <span className={theme === 'dark' ? 'text-gray-200' : 'text-gray-800'}>
              lvis Njaramba
            </span>
          </motion.span>

          {/* Nav Buttons */}
          <div
            className={`flex items-center justify-center flex-1 gap-2 sm:gap-3 ${
              isMobile ? 'justify-evenly w-full' : ''
            }`}
          >
            {NAV_ITEMS.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <motion.button
                  key={item.id}
                  onClick={() => navigate(item.path)}
                  whileHover={{ y: -4, scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`group flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center
                    rounded-xl transition-all shadow-sm relative
                    ${
                      theme === 'dark'
                        ? isActive
                          ? 'bg-rose-500/20 text-rose-400'
                          : 'bg-white/5 text-white/90 hover:bg-white/10'
                        : isActive
                          ? 'bg-rose-500/10 text-rose-600'
                          : 'bg-black/5 text-black/80 hover:bg-black/10'
                    }`}
                  title={item.label}
                >
                  <item.icon size={20} />
                  {/* glowing active ring */}
                  {isActive && (
                    <motion.span
                      layoutId="activeGlow"
                      className="absolute inset-0 rounded-xl ring-2 ring-rose-500/40"
                      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                    />
                  )}
                </motion.button>
              );
            })}

            {/* Theme Toggle */}
            <motion.button
              onClick={toggleTheme}
              whileHover={{ rotate: 20, scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className={`flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-xl
                transition-all shadow-sm 
                ${
                  theme === 'dark'
                    ? 'bg-white/5 text-yellow-400 hover:bg-white/10'
                    : 'bg-black/5 text-gray-800 hover:bg-black/10'
                }`}
              title="Toggle Theme"
            >
              {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
            </motion.button>
          </div>
        </motion.nav>
      </div>
    </div>
  );
}
