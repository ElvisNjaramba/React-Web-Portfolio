'use client';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Lottie from 'lottie-react';
import CursorSpark from '../components/CursorSpark';
import CycleText from '../components/CycleText';
import HolographicTerminal from '../components/HolographicTerminal';
import QuantumGrid from '../components/QuantumGrid';
import NeuralNetwork from '../components/NeuralNetwork';
import SkillGlobe from '../components/SkillGlobe';
import { useTheme } from '../components/ThemeProvider';
import { Github, Sparkles, Send, ArrowRight } from 'lucide-react';
import heroAnimation from '../assets/animations/hero.json';
import Elvis from '../assets/elvisN.jpg'

const GITHUB_USERNAME = 'ElvisNjaramba';

export default function Home() {
  const { theme } = useTheme();
  const navigate = useNavigate();
  const [repos, setRepos] = useState([]);
  const [isHover, setIsHover] = useState(false);

  // GitHub fetch
  useEffect(() => {
    fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos`)
      .then(res => res.json())
      .then(data => {
        const filtered = data
          .sort((a, b) => new Date(b.pushed_at) - new Date(a.pushed_at))
          .slice(0, 3);
        setRepos(filtered);
      })
      .catch(console.error);
  }, []);

  // Motion tilt
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-100, 100], [15, -15]);
  const rotateY = useTransform(x, [-100, 100], [-15, 15]);
  const handleMouseMove = e => {
    const rect = e.currentTarget.getBoundingClientRect();
    x.set(e.clientX - rect.left - rect.width / 2);
    y.set(e.clientY - rect.top - rect.height / 2);
  };

  const journey = [
    { year: '2021', title: 'Discovered Programming', text: 'Started exploring coding and quickly fell in love with problem-solving.', icon: '🚀' },
    { year: '2022', title: 'Joined Machakos University', text: 'Began Diploma in ICT — built a strong foundation in software, networking, and systems.', icon: '🎓' },
    { year: '2023', title: 'Built My First Android Apps', text: 'Created interactive apps using Flutter and Kotlin — merging creativity with logic.', icon: '📱' },
    { year: '2024', title: 'Web Projects & Freelance Work', text: 'Designed and developed modern, responsive websites for clients and personal use.', icon: '💻' },
    { year: '2025', title: 'Expanding Horizons', text: 'Now focusing on combining web, mobile, and AI-driven solutions for the future.', icon: '⚡' },
  ];

  const isDark = theme === 'dark';

  return (
    <div
      className={`relative min-h-screen overflow-hidden transition-colors duration-700 ${
        isDark
          ? 'bg-[#050505] text-white'
          : 'bg-gradient-to-br from-blue-50 via-pink-50 to-yellow-100 text-gray-900'
      }`}
    >
      {/* Background layers */}
      <CursorSpark sparkColor={isDark ? '#ff0033' : '#ff66b3'} sparkCount={14} />
      {isDark && (
        <>
          <QuantumGrid />
          <NeuralNetwork />
        </>
      )}

      {/* ========== HERO ========== */}
      <section className="relative z-10 min-h-screen flex flex-col lg:flex-row items-center justify-center px-6 lg:px-20 py-20 overflow-hidden">
        <motion.div
          className="flex-1 text-center lg:text-left space-y-6 z-10"
          initial={{ opacity: 0, x: -60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9 }}
        >
          <div className="max-w-lg mx-auto lg:mx-0">
            <HolographicTerminal />
          </div>

          <CycleText />

          <p
            className={`leading-relaxed max-w-md mx-auto lg:mx-0 ${
              isDark ? 'text-gray-400' : 'text-gray-700'
            }`}
          >
            Crafting digital worlds that merge creativity, technology, and emotion.
          </p>

          <div className="flex justify-center lg:justify-start gap-5">
            <button
              onClick={() => navigate('/projects')}
              className="px-8 py-4 rounded-2xl font-semibold text-white bg-gradient-to-r from-red-600 to-purple-600 hover:shadow-rose-600/30 transition-all duration-300"
            >
              Explore My Work
            </button>
            <button
              onClick={() => navigate('/contact')}
              className={`px-8 py-4 rounded-2xl border ${
                isDark ? 'border-red-500/40 text-white' : 'border-red-500/70 text-gray-800'
              } hover:bg-red-500/10 transition-all duration-300`}
            >
              Contact Me
            </button>
          </div>
        </motion.div>

        <motion.div
          className="flex-1 relative mt-12 lg:mt-0"
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9 }}
        >
          <div className="relative w-full max-w-lg mx-auto rounded-[1.25rem] overflow-hidden">
            <Lottie animationData={heroAnimation} loop autoplay className="w-full h-auto" />
            <div
              className={`absolute inset-0 bg-gradient-to-t ${
                isDark ? 'from-black/50' : 'from-white/30'
              } to-transparent pointer-events-none`}
            />
          </div>
        </motion.div>
      </section>

      {/* ========== ABOUT ========== */}
      <section className="relative z-20 py-20 px-8 text-center">
        <motion.div
          onMouseMove={handleMouseMove}
          onMouseEnter={() => setIsHover(true)}
          onMouseLeave={() => {
            setIsHover(false);
            x.set(0);
            y.set(0);
          }}
          style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
          className={`max-w-5xl mx-auto flex flex-col lg:flex-row items-center gap-10 rounded-[1.25rem] p-10 border backdrop-blur-2xl transition-all duration-500 ${
            isDark
              ? 'border-red-500/30 bg-gradient-to-br from-black/50 to-black/20 shadow-[0_0_80px_rgba(255,0,80,0.18)]'
              : 'border-pink-400/30 bg-white/60 shadow-lg'
          }`}
        >
          <motion.div className="relative flex-shrink-0" whileHover={{ scale: 1.03 }}>
            <img
              src={Elvis}
              alt="Elvis Njaramba portrait"
              className="w-56 h-56 object-cover rounded-full border-4 border-red-500/40 shadow-[0_0_40px_rgba(255,0,80,0.36)]"
            />
            <motion.div
              className="absolute inset-0 rounded-full border-2 border-rose-400/30 animate-pulse"
              animate={{ opacity: [0.35, 1, 0.35] }}
              transition={{ duration: 2.4, repeat: Infinity }}
            />
          </motion.div>

          <div className="flex-1 text-left">
            <Sparkles
              size={36}
              className={`mb-3 ${
                isHover ? 'text-rose-400 scale-110' : isDark ? 'text-red-400' : 'text-pink-500'
              }`}
            />
            <motion.h2
              className="text-4xl sm:text-5xl font-extrabold bg-gradient-to-r from-rose-500 via-purple-500 to-indigo-500 bg-clip-text text-transparent"
              animate={{
                textShadow: isHover ? '0 0 25px rgba(255,0,80,0.65)' : '0 0 0',
              }}
            >
              Elvis Njaramba
            </motion.h2>
            <p
              className={`mt-3 text-lg ${
                isDark ? 'text-gray-400' : 'text-gray-700'
              }`}
            >
              Frontend Architect • Creative Technologist • Visionary Coder
            </p>
            <p
              className={`mt-4 max-w-xl leading-relaxed ${
                isDark ? 'text-gray-500' : 'text-gray-600'
              }`}
            >
              I design futuristic digital interfaces and systems that reflect
              human-computer harmony — blending aesthetics, motion, and
              microinteractions into seamless experiences.
            </p>

            <div className="flex gap-4 mt-8">
              <button
                onClick={() => navigate('/about')}
                className="px-6 py-3 rounded-2xl bg-rose-600 text-white font-semibold"
              >
                Learn More
              </button>
              <button
                onClick={() => navigate('/projects')}
                className={`px-6 py-3 rounded-2xl border ${
                  isDark ? 'border-red-500/30 text-white' : 'border-pink-500/40 text-gray-800'
                }`}
              >
                Projects
              </button>
            </div>
          </div>
        </motion.div>
      </section>

      {/* ========== JOURNEY ========== */}
      <section className="relative py-28 px-6 sm:px-12">
        <div className="pointer-events-none absolute inset-0 -z-10 flex items-center justify-center">
          <div
            className={`w-[2px] h-full bg-gradient-to-b ${
              isDark ? 'from-rose-500 to-purple-600' : 'from-pink-400 to-purple-400'
            } opacity-70 blur-[1px]`}
          />
        </div>

        <motion.h2
          className="text-4xl sm:text-5xl font-bold text-center mb-16 z-10 relative"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          My <span className="text-rose-500">Journey</span>
        </motion.h2>

        <div className="relative max-w-5xl mx-auto">
          <div
            className={`absolute left-1/2 transform -translate-x-1/2 h-full w-[2px] bg-gradient-to-b ${
              isDark ? 'from-rose-500 to-purple-600' : 'from-pink-400 to-purple-400'
            } opacity-90 blur-sm`}
          />

          <div className="space-y-16 relative z-10">
            {journey.map((item, idx) => {
              const isRight = idx % 2 === 0;
              return (
                <motion.div
                  key={idx}
                  className={`flex items-center w-full gap-6 ${
                    isRight ? 'justify-end' : 'justify-start'
                  } sm:flex-row flex-col text-left`}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1, duration: 0.6 }}
                  viewport={{ once: true, amount: 0.4 }}
                >
                  <div
                    className={`relative z-10 p-5 sm:p-6 rounded-2xl border backdrop-blur-md shadow-lg text-left ${
                      isDark
                        ? 'border-rose-500/20 bg-white/5'
                        : 'border-pink-400/20 bg-white/70'
                    } ${isRight ? 'sm:mr-10 sm:w-[45%] w-full' : 'sm:ml-10 sm:w-[45%] w-full'}`}
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-2xl">{item.icon}</span>
                      <span className="text-xs text-rose-400 font-semibold uppercase tracking-wide">
                        {item.year}
                      </span>
                    </div>
                    <h4 className="text-lg sm:text-xl font-bold mb-1">
                      {item.title}
                    </h4>
                    <p
                      className={`text-sm sm:text-base leading-relaxed ${
                        isDark ? 'text-gray-400' : 'text-gray-700'
                      }`}
                    >
                      {item.text}
                    </p>
                  </div>

                  <div
                    className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br ${
                      isDark
                        ? 'from-rose-400 to-purple-500'
                        : 'from-pink-400 to-purple-400'
                    } flex items-center justify-center text-white border border-white/20 shadow-[0_0_20px_rgba(255,0,120,0.3)]`}
                  >
                    <span className="text-sm font-bold">•</span>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ========== SKILL GLOBE ========== */}
      <section className="py-10 text-center">
        <SkillGlobe />
      </section>

      {/* ========== FEATURED PROJECTS ========== */}
      <section className="relative py-20 px-6 sm:px-12 max-w-7xl mx-auto">
        <motion.h2
          className="text-4xl sm:text-5xl font-bold text-center mb-12"
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span className="bg-gradient-to-r from-red-500 via-purple-500 to-indigo-500 bg-clip-text text-transparent">
            Featured Creations
          </span>
        </motion.h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {repos.length === 0 ? (
            <div
              className={`col-span-full text-center ${
                isDark ? 'text-gray-500' : 'text-gray-600'
              }`}
            >
              Loading projects...
            </div>
          ) : (
            repos.map((repo, i) => (
              <motion.a
                key={repo.id}
                href={repo.html_url}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.12 }}
                whileHover={{ scale: 1.03 }}
                className={`p-6 rounded-2xl border backdrop-blur-md hover:shadow-lg transition-all duration-300 ${
                  isDark
                    ? 'border-red-500/20 bg-white/5 hover:bg-white/10'
                    : 'border-pink-300/30 bg-white/70 hover:bg-white'
                }`}
              >
                <div className="flex items-center gap-3 mb-3">
                  <Github className="text-red-400" />
                  <h3 className="font-semibold text-lg">{repo.name}</h3>
                </div>
                <p
                  className={`mb-4 ${
                    isDark ? 'text-gray-400' : 'text-gray-700'
                  }`}
                >
                  {repo.description || 'No description provided.'}
                </p>
                <div
                  className={`flex justify-between text-sm ${
                    isDark ? 'text-gray-500' : 'text-gray-600'
                  }`}
                >
                  <span>★ {repo.stargazers_count}</span>
                  <span>⚙ {repo.language || 'Code'}</span>
                </div>
              </motion.a>
            ))
          )}
        </div>

        <div className="text-center mt-10">
          <button
            onClick={() => navigate('/projects')}
            className="inline-flex items-center gap-3 px-6 py-3 rounded-2xl text-white bg-gradient-to-r from-rose-500 to-purple-600 font-semibold"
          >
            View More Projects <ArrowRight size={16} />
          </button>
        </div>
      </section>

      {/* ========== CTA ========== */}
      <motion.div
        className="relative z-10 text-center py-20"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="text-3xl sm:text-4xl font-bold mb-4">
          Deploy{' '}
          <span className="text-red-500">Collaboration Protocol</span>?
        </h2>
        <p
          className={`mb-6 max-w-2xl mx-auto ${
            isDark ? 'text-gray-400' : 'text-gray-700'
          }`}
        >
          Let's engineer something groundbreaking together.
        </p>
        <motion.button
          onClick={() => navigate('/contact')}
          whileHover={{ scale: 1.03 }}
          className="px-6 py-3 rounded-2xl bg-gradient-to-r from-purple-600 to-red-600 text-white font-semibold"
        >
          <Send className="inline mr-2" size={16} /> Contact Me
        </motion.button>
      </motion.div>
    </div>
  );
}
