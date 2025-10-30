'use client';

import React, { useState } from "react";
import { motion } from "framer-motion";
import { useTheme } from "../components/ThemeProvider";
import { Mail, Phone, User, Send, Sparkles } from "lucide-react";

export default function Contact() {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Message sent successfully! 🚀 (You can integrate Formspree or API here)");
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <div
      className={`relative min-h-screen w-full overflow-hidden transition-colors duration-700 ${
        isDark
          ? "bg-[#050505] text-white"
          : "bg-gradient-to-br from-rose-50 via-white to-gray-50 text-gray-900"
      }`}
    >
      {/* optional depth overlay */}
      {isDark && (
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-transparent pointer-events-none" />
      )}

      <section className="relative z-10 flex flex-col items-center justify-center px-6 py-24 sm:py-32 text-center">
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 mb-6 rounded-full border border-rose-500/40 backdrop-blur-md"
            whileHover={{ scale: 1.05 }}
          >
            <Sparkles className="text-rose-400" />
            <span className="font-medium text-sm uppercase tracking-wide text-rose-300">
              Let’s Connect
            </span>
          </motion.div>

          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
            Contact{" "}
            <span className="bg-gradient-to-r from-rose-500 via-purple-500 to-indigo-500 bg-clip-text text-transparent">
              Elvis Njaramba
            </span>
          </h1>
          <p
            className={`max-w-2xl mx-auto text-lg ${
              isDark ? "text-gray-400" : "text-gray-700"
            }`}
          >
            Have a project, idea, or collaboration in mind?  
            Let’s craft something innovative together.
          </p>
        </motion.div>

        {/* Contact Card */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 1 }}
          className={`mt-16 max-w-3xl w-full p-10 rounded-3xl border-2 backdrop-blur-2xl shadow-xl text-left ${
            isDark
              ? "border-white/10 bg-white/10 shadow-rose-500/20"
              : "border-black/10 bg-white/80 shadow-indigo-500/20"
          }`}
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-10">
            <div className="flex-1 space-y-5">
              <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-rose-500 to-purple-500 bg-clip-text text-transparent">
                Contact Details
              </h2>

              <div className="flex items-center gap-3">
                <User className="text-rose-400" />
                <p className="text-lg font-medium">Elvis Njaramba</p>
              </div>

              <div className="flex items-center gap-3">
                <Mail className="text-rose-400" />
                <a
                  href="mailto:elvisnjaramba11@gmail.com"
                  className="text-lg font-medium hover:text-rose-400 transition-colors"
                >
                  elvisnjaramba11@gmail.com
                </a>
              </div>

              <div className="flex items-center gap-3">
                <Phone className="text-rose-400" />
                <a
                  href="tel:+254794719962"
                  className="text-lg font-medium hover:text-rose-400 transition-colors"
                >
                  +254 794 719 962
                </a>
              </div>
            </div>

            {/* Contact Form */}
            <form
              onSubmit={handleSubmit}
              className="flex-1 w-full space-y-6 text-left"
            >
              <div>
                <label className="block mb-2 text-sm font-semibold">Your Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className={`w-full px-4 py-3 rounded-2xl outline-none border transition ${
                    isDark
                      ? "bg-white/10 border-white/10 text-white focus:border-rose-400"
                      : "bg-white border-black/10 text-gray-900 focus:border-indigo-400"
                  }`}
                />
              </div>

              <div>
                <label className="block mb-2 text-sm font-semibold">Your Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className={`w-full px-4 py-3 rounded-2xl outline-none border transition ${
                    isDark
                      ? "bg-white/10 border-white/10 text-white focus:border-rose-400"
                      : "bg-white border-black/10 text-gray-900 focus:border-indigo-400"
                  }`}
                />
              </div>

              <div>
                <label className="block mb-2 text-sm font-semibold">Message</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows="4"
                  required
                  className={`w-full px-4 py-3 rounded-2xl outline-none border resize-none transition ${
                    isDark
                      ? "bg-white/10 border-white/10 text-white focus:border-rose-400"
                      : "bg-white border-black/10 text-gray-900 focus:border-indigo-400"
                  }`}
                ></textarea>
              </div>

              <motion.button
                whileHover={{ scale: 1.05 }}
                type="submit"
                className="w-full px-6 py-4 rounded-2xl text-white font-semibold bg-gradient-to-r from-rose-500 to-purple-600 hover:shadow-rose-500/30 transition-all duration-300 flex items-center justify-center gap-2"
              >
                <Send size={18} /> Send Message
              </motion.button>
            </form>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
