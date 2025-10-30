'use client';
import React, { useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useTheme } from "../components/ThemeProvider";
import { Code, Cpu, Rocket, Sparkles, Star, Zap } from "lucide-react";
import Lottie from "lottie-react";
import devAnimation from "../animations/dev.json";
import QuantumGrid from "../components/QuantumGrid";
import NeuralNetwork from "../components/NeuralNetwork";

// Typing Effect Hook
const useTypingEffect = (words, speed = 100) => {
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [blink, setBlink] = useState(true);
  const [reverse, setReverse] = useState(false);

  useEffect(() => {
    if (index === words.length) return;
    if (subIndex === words[index].length + 1 && !reverse) {
      setTimeout(() => setReverse(true), 1000);
      return;
    }
    if (subIndex === 0 && reverse) {
      setReverse(false);
      setIndex((prev) => (prev + 1) % words.length);
      return;
    }
    const timeout = setTimeout(
      () => setSubIndex((prev) => prev + (reverse ? -1 : 1)),
      reverse ? speed / 2 : speed
    );
    return () => clearTimeout(timeout);
  }, [subIndex, index, reverse, words, speed]);

  useEffect(() => {
    const blinkInterval = setInterval(() => setBlink((v) => !v), 500);
    return () => clearInterval(blinkInterval);
  }, []);

  return `${words[index].substring(0, subIndex)}${blink ? "|" : " "}`;
};

// Data
const skills = [
  {
    icon: <Code size={28} />,
    title: "Web Development",
    desc: "Building responsive and dynamic websites using HTML, CSS, JavaScript, and React.",
    gradient: "from-purple-500 via-pink-500 to-rose-500",
  },
  {
    icon: <Cpu size={28} />,
    title: "Mobile Development",
    desc: "Creating smooth and visually stunning Android apps using Flutter and Kotlin.",
    gradient: "from-blue-500 via-cyan-400 to-teal-400",
  },
  {
    icon: <Rocket size={28} />,
    title: "Backend & Logic",
    desc: "Designing functional systems and REST APIs using Python and Django.",
    gradient: "from-orange-500 via-red-500 to-pink-500",
  },
];

const timeline = [
  { year: "2021", title: "Discovered Programming", text: "Started exploring coding and fell in love with problem-solving.", icon: "🚀" },
  { year: "2022", title: "Joined Machakos University", text: "Began Diploma in ICT and honed my technical foundation.", icon: "🎓" },
  { year: "2023", title: "Built My First Android Apps", text: "Created interactive apps using Flutter and Kotlin.", icon: "📱" },
  { year: "2024", title: "Web Projects & Freelance Work", text: "Designed and developed modern websites for clients.", icon: "💻" },
  { year: "2025", title: "Expanding Horizons", text: "Now combining web, mobile, and AI-driven solutions.", icon: "⚡" },
];

const education = [
  {
    year: "2022 - 2025",
    school: "Machakos University",
    qualification: "Diploma in Information Communication Technology (ICT)",
    details: "Focused on programming, software development, database systems, and project-based learning.",
  },
];

const tools = [
  "HTML5", "CSS3", "JavaScript", "React.js", "Flutter", "Kotlin",
  "Java", "Python", "Django", "Git", "Firebase",
];

const funFacts = [
  "I love building futuristic UI animations 🚀",
  "I enjoy coding with lo-fi beats playing in the background 🎧",
  "I’m passionate about learning new tech and sharing knowledge 💡",
];

export default function About() {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const { scrollYProgress } = useScroll();
  const yHero = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const typedText = useTypingEffect([
    "Android Developer.",
    "Web Developer.",
    "Creative Technologist.",
    "Problem Solver.",
  ]);

  return (
    <div
      className={`relative w-full min-h-screen overflow-hidden transition-all duration-1000 ${
        isDark
          ? "bg-[#050505] text-white"
          : "bg-gradient-to-br from-white via-rose-50 to-gray-100 text-gray-900"
      }`}
    >
      {/* ✅ Unified Quantum + Neural background for dark mode */}
      {isDark && (
        <>
          <QuantumGrid />
          <NeuralNetwork />
        </>
      )}

      {/* Floating radial gradients for subtle motion */}
      <motion.div
        className="absolute inset-0 z-0"
        style={{
          background:
            isDark
              ? "radial-gradient(circle at 30% 50%, rgba(255,0,80,0.05), transparent 70%)"
              : "radial-gradient(circle at 30% 50%, rgba(59,130,246,0.08), transparent 70%)",
        }}
        animate={{ backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"] }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
      />

      {/* HERO SECTION */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6 py-20 text-center">
        <motion.div
          className="space-y-6"
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2 }}
        >
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full border backdrop-blur-sm">
            <Star className="w-4 h-4 text-yellow-400" />
            <span className="text-sm font-semibold">
              Available for Android & Web Projects
            </span>
          </div>

          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold">
            Hi, I’m{" "}
            <span
              className={`bg-gradient-to-r ${
                isDark
                  ? "from-rose-400 via-purple-500 to-indigo-400"
                  : "from-indigo-600 via-pink-500 to-orange-400"
              } bg-clip-text text-transparent`}
            >
              Elvis Njaramba
            </span>
          </h1>

          <p
            className={`text-xl sm:text-3xl font-light ${
              isDark ? "text-rose-200" : "text-indigo-700"
            }`}
          >
            {typedText}
          </p>

          <div className="max-w-md mx-auto mt-12">
            <Lottie animationData={devAnimation} loop />
          </div>
        </motion.div>

        {/* ABOUT ME CARD */}
        <motion.div
          className={`mt-20 max-w-4xl w-full rounded-3xl border-2 p-8 sm:p-12 backdrop-blur-2xl shadow-lg transition-all ${
            isDark
              ? "border-white/10 bg-white/10 shadow-rose-500/20"
              : "border-black/10 bg-white/70 shadow-indigo-500/20"
          }`}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <div className="flex items-center justify-center mb-6">
            <Sparkles className={`${isDark ? "text-rose-400" : "text-indigo-500"}`} />
            <h2 className="text-3xl font-bold ml-3">About Me</h2>
          </div>
          <p className="text-lg sm:text-xl leading-relaxed text-gray-400 mb-4">
            I’m a passionate Android and Web Developer who blends creativity and logic
            to craft futuristic, intuitive applications.
          </p>
          <p className="text-lg sm:text-xl text-gray-400">
            My focus is on building experiences that work beautifully while telling a story through design.
          </p>
        </motion.div>

        {/* SKILLS GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-20 max-w-6xl w-full">
          {skills.map((skill, i) => (
            <motion.div
              key={i}
              className={`relative p-8 rounded-3xl border-2 backdrop-blur-lg transition-all duration-500 group ${
                isDark
                  ? "border-white/10 bg-white/5 hover:border-rose-400/30"
                  : "border-black/10 bg-white/70 hover:border-indigo-400/30"
              }`}
              whileHover={{ y: -10, scale: 1.03 }}
            >
              <div
                className={`absolute inset-0 bg-gradient-to-br ${skill.gradient} opacity-0 group-hover:opacity-20 transition-opacity`}
              />
              <div className="relative z-10">
                <div
                  className={`flex items-center justify-center h-14 w-14 rounded-2xl mb-5 ${
                    isDark
                      ? "bg-white/10 text-rose-400"
                      : "bg-black/10 text-indigo-600"
                  }`}
                >
                  {skill.icon}
                </div>
                <h3 className="text-2xl font-semibold mb-2">{skill.title}</h3>
                <p className="text-gray-400">{skill.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* TIMELINE SECTION */}
        <motion.section
          className="mt-28 w-full max-w-5xl px-4 sm:px-8 mx-auto"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <h3 className="text-3xl sm:text-4xl font-bold mb-16 text-center">
            My <span className="text-rose-500">Journey</span>
          </h3>

          <div className="relative">
            <div
              className={`absolute left-1/2 transform -translate-x-1/2 w-[2px] hidden md:block ${
                isDark
                  ? "bg-gradient-to-b from-rose-500/60 to-purple-500/40"
                  : "bg-gradient-to-b from-indigo-400/60 to-pink-400/40"
              }`}
              style={{ height: "100%" }}
            />
            <div className="flex flex-col gap-20 sm:gap-28">
              {timeline.map((item, i) => (
                <motion.div
                  key={i}
                  className={`flex flex-col md:flex-row items-center ${
                    i % 2 === 0 ? "md:flex-row-reverse" : ""
                  }`}
                  initial={{ opacity: 0, x: i % 2 === 0 ? 60 : -60 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.2, duration: 0.8 }}
                >
                  <div className="relative flex justify-center items-center md:w-1/12 mb-6 md:mb-0">
                    <motion.div
                      className={`absolute md:static w-5 h-5 rounded-full shadow-lg border-4 ${
                        isDark
                          ? "bg-rose-500 border-rose-200 shadow-rose-500/40"
                          : "bg-indigo-500 border-indigo-300 shadow-indigo-400/40"
                      }`}
                      whileHover={{ scale: 1.3 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    />
                  </div>
                  <div
                    className={`relative w-full md:w-5/12 rounded-3xl border-2 p-6 sm:p-8 backdrop-blur-lg shadow-lg ${
                      isDark
                        ? "border-white/10 bg-white/10"
                        : "border-black/10 bg-white/70"
                    }`}
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-2xl">{item.icon}</span>
                      <span
                        className={`text-sm font-semibold uppercase tracking-wide ${
                          isDark ? "text-rose-400" : "text-indigo-500"
                        }`}
                      >
                        {item.year}
                      </span>
                    </div>
                    <h4 className="text-xl font-bold mb-2">{item.title}</h4>
                    <p className="text-gray-400">{item.text}</p>
                  </div>
                  <div className="hidden md:block md:w-5/12" />
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* EDUCATION SECTION */}
        <motion.section
          className="mt-28 w-full max-w-4xl px-4 sm:px-8 mx-auto text-center"
          whileInView={{ opacity: 1, y: 0 }}
          initial={{ opacity: 0, y: 40 }}
          transition={{ duration: 0.8 }}
        >
          <h3 className="text-3xl sm:text-4xl font-bold mb-12">
            Education <span className="text-rose-500">& Learning</span>
          </h3>
          {education.map((edu, i) => (
            <div key={i} className="mb-8">
              <h4 className="text-xl font-semibold">{edu.school}</h4>
              <p className="text-gray-500">{edu.year}</p>
              <p className="mt-2 text-lg">{edu.qualification}</p>
              <p className="text-gray-400 mt-1">{edu.details}</p>
            </div>
          ))}
        </motion.section>

        {/* TOOLS SECTION */}
        <motion.section
          className="mt-20 max-w-4xl mx-auto text-center"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h3 className="text-3xl font-bold mb-10">
            Tech <span className="text-rose-500">Stack</span>
          </h3>
          <div className="flex flex-wrap justify-center gap-3">
            {tools.map((tool, i) => (
              <motion.span
                key={i}
                whileHover={{ scale: 1.1 }}
                className={`px-4 py-2 text-sm font-semibold rounded-full border backdrop-blur-md ${
                  isDark
                    ? "bg-white/10 border-white/10 text-rose-300"
                    : "bg-white border-black/10 text-indigo-600 shadow-md"
                }`}
              >
                {tool}
              </motion.span>
            ))}
          </div>
        </motion.section>

        {/* PHILOSOPHY */}
        <motion.section
          className="mt-28 max-w-5xl mx-auto text-center"
          whileInView={{ opacity: 1 }}
          initial={{ opacity: 0 }}
          transition={{ duration: 1 }}
        >
          <h3 className="text-3xl sm:text-4xl font-bold mb-8">
            My <span className="text-rose-500">Philosophy</span>
          </h3>
          <p className="max-w-3xl mx-auto text-lg text-gray-400 leading-relaxed">
            Technology should be human — intuitive, expressive, and accessible.
            I aim to build systems that simplify life, inspire creativity,
            and bridge design with functionality across all devices.
          </p>
        </motion.section>

        {/* FUN FACTS */}
        <motion.section
          className="mt-28 text-center max-w-4xl mx-auto mb-20"
          whileInView={{ opacity: 1, y: 0 }}
          initial={{ opacity: 0, y: 40 }}
          transition={{ duration: 1 }}
        >
          <h3 className="text-3xl font-bold mb-8">Beyond Code</h3>
          <ul className="space-y-3 text-lg text-gray-400">
            {funFacts.map((fact, i) => (
              <motion.li
                key={i}
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 200 }}
              >
                {fact}
              </motion.li>
            ))}
          </ul>
        </motion.section>

        {/* CONTACT CTA */}
        <motion.section
          className="max-w-3xl mx-auto text-center mb-24"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <h3 className="text-3xl font-bold mb-6">Let’s Collaborate</h3>
          <p className="text-gray-400 mb-6">
            Have an app idea or web concept?
            Let’s bring it to life with creativity and precision.
          </p>
          <motion.a
            href="mailto:elvisnjaramba11@gmail.com"
            className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl font-semibold text-white bg-gradient-to-r from-rose-500 to-purple-600 hover:shadow-2xl hover:shadow-rose-500/30 transition-all duration-300"
            whileHover={{ scale: 1.05 }}
          >
            <Zap size={20} /> Get In Touch
          </motion.a>
        </motion.section>
      </div>
    </div>
  );
}
