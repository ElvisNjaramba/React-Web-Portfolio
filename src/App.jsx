import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import About from "./Pages/About";
import Contact from "./Pages/Contact";
import Projects from "./Pages/Projects";

import CursorSpark from "./components/CursorSpark";
import FloatingNavDock from "./components/Nav";
import Footer from "./components/Footer";
import { ThemeProvider, useTheme } from "./components/ThemeProvider";

import QuantumGrid from "./components/QuantumGrid";
import NeuralNetwork from "./components/NeuralNetwork";

import "./App.css";
import { motion } from "framer-motion";

function AppContent() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <div className="relative min-h-screen overflow-hidden transition-colors duration-700">
      {/* ✅ Global Neural + Quantum layers when dark */}
      {isDark && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5 }}
        >
          <QuantumGrid />
          <NeuralNetwork />
        </motion.div>
      )}

      <CursorSpark sparkColor={isDark ? "#ff0033" : "#ffdd00"} sparkCount={14} />
      <FloatingNavDock />

      <div className="relative z-10">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/projects" element={<Projects />} />
        </Routes>
      </div>

      <Footer />
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <Router>
        <AppContent />
      </Router>
    </ThemeProvider>
  );
}

export default App;
