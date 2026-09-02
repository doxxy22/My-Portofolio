import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Github, Linkedin, Mail, ChevronDown, Terminal, Sparkles } from "lucide-react";
import { useTheme } from "../context/ThemeContext.jsx";

const floatingBadges = [
  { label: "React.js", x: "10%", y: "20%", delay: 0 },
  { label: "Python", x: "85%", y: "15%", delay: 1 },
  { label: "JavaScript", x: "75%", y: "75%", delay: 2 },
  { label: "MySQL", x: "5%", y: "70%", delay: 0.5 },
  { label: "Git", x: "90%", y: "50%", delay: 1.5 },
];

const roles = [
  "Software Developer",
  "Web Developer",
  "Fresh Graduate",
  "Problem Solver",
];

const codeLines = [
  { text: "const developer = {", color: "text-blue-400" },
  { text: '  name: "Rido Anugrah",', color: "text-green-400" },
  { text: '  role: "Fresh Graduate",', color: "text-green-400" },
  { text: '  degree: "S.Kom — Computer Science",', color: "text-yellow-400" },
  { text: '  passion: "Building solutions",', color: "text-green-400" },
  { text: "};", color: "text-blue-400" },
];

export default function Hero() {
  const { dark } = useTheme();
  const [roleIndex, setRoleIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % roles.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background glow */}
      <div
        className="absolute inset-0 transition-opacity duration-500"
        style={{
          background: dark
            ? "radial-gradient(ellipse at 50% 0%, rgba(59, 130, 246, 0.12) 0%, transparent 60%)"
            : "radial-gradient(ellipse at 50% 0%, rgba(59, 130, 246, 0.06) 0%, transparent 60%)",
        }}
      />
      <div
        className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full blur-3xl transition-opacity duration-500"
        style={{
          backgroundColor: dark ? "rgba(59, 130, 246, 0.05)" : "rgba(59, 130, 246, 0.03)",
        }}
      />

      {/* Floating Tech Badges (desktop only) */}
      <div className="hidden lg:block">
        {floatingBadges.map((b) => (
          <motion.span
            key={b.label}
            className="absolute badge !text-[10px] !px-2 !py-1 opacity-30 pointer-events-none"
            style={{ left: b.x, top: b.y }}
            animate={{ y: [0, -12, 0] }}
            transition={{ duration: 5, repeat: Infinity, delay: b.delay, ease: "easeInOut" }}
          >
            {b.label}
          </motion.span>
        ))}
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">
        {/* Left – Text */}
        <div>
          {/* Open to Work Badge */}
          <motion.div
            className="mb-5"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="open-to-work-badge">
              <span className="availability-dot" />
              
            </span>
          </motion.div>

          <motion.p
            className="text-accent font-mono text-sm mb-4 tracking-wider"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.05 }}
          >
            👋 Hello, world!
          </motion.p>

          <motion.h1
            className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight mb-4"
            style={{ color: "rgb(var(--color-text))" }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            I'm{" "}
            <span className="bg-gradient-to-r from-accent to-blue-300 bg-clip-text text-transparent">
              Rido Anugrah
            </span>
          </motion.h1>

          {/* Typing Animation Subtitle */}
          <motion.h2
            className="text-xl sm:text-2xl font-medium mb-6 h-9 flex items-center"
            style={{ color: "rgb(var(--color-text-secondary))" }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <AnimatePresence mode="wait">
              <motion.span
                key={roleIndex}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.4 }}
              >
                {roles[roleIndex]}
              </motion.span>
            </AnimatePresence>
            <span className="typing-cursor" />
          </motion.h2>

          <motion.p
            className="text-lg leading-relaxed mb-8 max-w-lg"
            style={{ color: "rgb(var(--color-text-muted))" }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            Fresh Graduate in Computer Science passionate about building
            reliable, scalable, and user-focused software solutions. Ready to
            contribute and grow through real-world projects with clean code
            and modern web technologies.
          </motion.p>

          {/* Buttons */}
          <motion.div
            className="flex flex-wrap gap-4 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <motion.a
              href="#projects"
              className="btn-primary"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              <Sparkles size={16} />
              View My Projects
            </motion.a>
            <motion.a
              href="/assets/CV2.pdf"
              download
              className="btn-outline"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              Download CV
            </motion.a>
          </motion.div>

          {/* Social Icons */}
          <motion.div
            className="flex gap-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            {[
              { icon: Github, href: "https://github.com/doxxy22", label: "GitHub" },
              { icon: Linkedin, href: "https://www.linkedin.com/in/rido-anugrah-a694ba335/", label: "LinkedIn" },
              { icon: Mail, href: "mailto:ridoanugrah2209@gmail.com", label: "Email" },
            ].map(({ icon: Icon, href, label }) => (
              <motion.a
                key={label}
                href={href}
                target={label !== "Email" ? "_blank" : undefined}
                rel={label !== "Email" ? "noopener noreferrer" : undefined}
                className="p-3 glass-card-hover !rounded-xl hover:!text-accent transition-colors"
                style={{ color: "rgb(var(--color-text-muted))" }}
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
                aria-label={label}
              >
                <Icon size={20} />
              </motion.a>
            ))}
          </motion.div>
        </div>

        {/* Right – Terminal Card */}
        <motion.div
          className="hidden lg:block"
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
        >
          <div className="glass-card p-1 rounded-2xl">
            {/* Title bar */}
            <div className="flex items-center gap-2 px-4 py-3 border-b" style={{ borderColor: "rgb(var(--color-border) / 0.08)" }}>
              <div className="w-3 h-3 rounded-full bg-red-500/80" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
              <div className="w-3 h-3 rounded-full bg-green-500/80" />
              <span className="ml-3 text-xs font-mono flex items-center gap-1" style={{ color: "rgb(var(--color-text-muted))" }}>
                <Terminal size={12} /> developer.js
              </span>
            </div>
            {/* Code content */}
            <div className="p-6 font-mono text-sm space-y-1">
              {codeLines.map((line, i) => (
                <motion.div
                  key={i}
                  className={line.color}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 + i * 0.15 }}
                >
                  {line.text}
                </motion.div>
              ))}
              <motion.div
                className="mt-4"
                style={{ color: "rgb(var(--color-text-muted))" }}
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 1, 0] }}
                transition={{ delay: 1.5, duration: 1.5, repeat: Infinity }}
              >
                █
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.button
        onClick={() => {
          const el = document.getElementById("about");
          if (el) el.scrollIntoView({ behavior: "smooth" });
        }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 hover:text-accent transition"
        style={{ color: "rgb(var(--color-text-muted))" }}
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        aria-label="Scroll down"
      >
        <ChevronDown size={24} />
      </motion.button>
    </section>
  );
}
