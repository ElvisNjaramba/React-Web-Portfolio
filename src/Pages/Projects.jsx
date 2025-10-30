'use client';

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useTheme } from "../components/ThemeProvider";
import { Github, Star, GitBranch, Send, Zap, Code2 } from "lucide-react";
import Lottie from "lottie-react";
import projectAnimation from "../assets/animations/projects.json";

const githubUsername = "ElvisNjaramba";

export default function Projects() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRepos = async () => {
      try {
        const res = await fetch(`https://api.github.com/users/${githubUsername}/repos`);
        if (!res.ok) throw new Error("GitHub API request failed");
        const data = await res.json();
        if (!Array.isArray(data)) throw new Error("Unexpected GitHub response");

        const filtered = data.sort((a, b) => new Date(b.pushed_at) - new Date(a.pushed_at));
        setRepos(filtered);
      } catch (err) {
        console.error("Error fetching GitHub repos:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRepos();
  }, []);

  const totalStars = repos.reduce((sum, r) => sum + r.stargazers_count, 0);
  const totalForks = repos.reduce((sum, r) => sum + r.forks_count, 0);

  return (
    <div
      className={`relative min-h-screen w-full overflow-hidden transition-colors duration-700 ${
        isDark
          ? "bg-[#050505] text-white" // Unified dark background
          : "bg-gradient-to-br from-rose-50 via-white to-gray-50 text-gray-900"
      }`}
    >
      {/* Optional soft dark overlay for extra depth */}
      {isDark && (
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-transparent pointer-events-none" />
      )}

      {/* HERO SECTION */}
      <section className="relative z-10 flex flex-col items-center justify-center text-center px-6 py-32 sm:py-40">
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 mb-6 rounded-full border border-rose-500/40 backdrop-blur-md"
            whileHover={{ scale: 1.05 }}
          >
            <Zap className="text-rose-400" />
            <span className="font-medium text-sm uppercase tracking-wide text-rose-300">
              Featured Projects
            </span>
          </motion.div>

          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
            My{" "}
            <span className="bg-gradient-to-r from-rose-500 via-purple-500 to-indigo-500 bg-clip-text text-transparent">
              GitHub Creations
            </span>
          </h1>

          <p className={`max-w-2xl mx-auto text-lg ${isDark ? "text-gray-400" : "text-gray-700"}`}>
            A living collection of code experiments, app prototypes, and passion projects — all
            fueled by curiosity and caffeine ☕.
          </p>
        </motion.div>

        <motion.div
          className="mt-12 w-72 sm:w-96 opacity-90"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          {projectAnimation ? (
            <Lottie animationData={projectAnimation} loop />
          ) : (
            <motion.div
              className="text-5xl mt-10"
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
            >
              💻
            </motion.div>
          )}
        </motion.div>
      </section>

      {/* STATS SECTION */}
      {!loading && !error && (
        <section className="text-center py-16 px-6 border-t border-rose-500/20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="flex flex-wrap justify-center gap-8 sm:gap-20"
          >
            <div className="flex flex-col items-center">
              <Star className="text-rose-400 mb-2" size={30} />
              <span className="text-3xl font-bold">{totalStars}</span>
              <span className="text-gray-400 text-sm">Stars earned</span>
            </div>
            <div className="flex flex-col items-center">
              <GitBranch className="text-purple-400 mb-2" size={30} />
              <span className="text-3xl font-bold">{totalForks}</span>
              <span className="text-gray-400 text-sm">Forks made</span>
            </div>
            <div className="flex flex-col items-center">
              <Code2 className="text-indigo-400 mb-2" size={30} />
              <span className="text-3xl font-bold">{repos.length}</span>
              <span className="text-gray-400 text-sm">Repositories</span>
            </div>
          </motion.div>
        </section>
      )}

      {/* PROJECTS GRID */}
      <section className="relative z-10 py-24 px-6 sm:px-12 max-w-7xl mx-auto">
        {loading && (
          <div className="flex flex-col items-center justify-center h-[40vh] text-lg">
            <motion.div className="w-10 h-10 border-4 border-rose-500 border-t-transparent rounded-full animate-spin mb-4" />
            Loading projects...
          </div>
        )}

        {!loading && error && (
          <div className="text-center text-red-500 py-20">⚠️ {error}</div>
        )}

        {!loading && !error && repos.length > 0 && (
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0, transition: { staggerChildren: 0.1 } },
            }}
          >
            {repos.map((repo, idx) => (
              <motion.a
                key={repo.id}
                href={repo.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className={`group relative p-8 rounded-3xl border-2 shadow-xl backdrop-blur-xl transition-all duration-500 ${
                  isDark
                    ? "border-white/10 bg-gradient-to-br from-white/5 to-black/20 hover:border-rose-500/50 hover:shadow-rose-500/30"
                    : "border-black/10 bg-white/70 hover:bg-white/90"
                }`}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ y: -10, scale: 1.03 }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <Github className="text-rose-500 dark:text-rose-400" size={28} />
                  <h3 className="text-xl font-bold">{repo.name}</h3>
                </div>

                <p className={`text-gray-500 dark:text-gray-300 mb-6 line-clamp-3`}>
                  {repo.description || "No description provided."}
                </p>

                {/* Tech badges */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {repo.language && (
                    <span className="text-xs bg-rose-500/10 border border-rose-500/30 px-2 py-1 rounded-full">
                      {repo.language}
                    </span>
                  )}
                  {repo.topics?.slice(0, 3).map((topic) => (
                    <span
                      key={topic}
                      className="text-xs bg-purple-500/10 border border-purple-500/30 px-2 py-1 rounded-full"
                    >
                      {topic}
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-6 text-sm text-gray-400 dark:text-gray-300">
                  <div className="flex items-center gap-1">
                    <Star size={14} /> {repo.stargazers_count}
                  </div>
                  <div className="flex items-center gap-1">
                    <GitBranch size={14} /> {repo.forks_count}
                  </div>
                  <span>🕒 {new Date(repo.pushed_at).toLocaleDateString()}</span>
                </div>
              </motion.a>
            ))}
          </motion.div>
        )}
      </section>

      {/* CALL TO ACTION */}
      <motion.div
        className="relative z-10 text-center my-32 px-6"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <h2 className="text-3xl sm:text-4xl font-bold mb-6">
          Want to Build Something{" "}
          <span className="text-rose-500 dark:text-rose-400">Next-Level?</span>
        </h2>
        <p className={`text-gray-500 dark:text-gray-300 mb-8 max-w-2xl mx-auto`}>
          I'm always open to collaborations — open-source projects, experimental
          UIs, or futuristic Android concepts. Let’s make ideas come alive.
        </p>
        <motion.a
          href="mailto:elvisnjaramba@gmail.com"
          className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl font-semibold text-white bg-gradient-to-r from-rose-500 to-purple-600 hover:shadow-2xl hover:shadow-rose-500/30 transition-all duration-300"
          whileHover={{ scale: 1.05 }}
        >
          <Send size={20} /> Reach Out
        </motion.a>
      </motion.div>

      {/* Futuristic Divider */}
      <motion.div
        className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-rose-500 to-transparent opacity-70"
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ repeat: Infinity, duration: 3 }}
      />
    </div>
  );
}
