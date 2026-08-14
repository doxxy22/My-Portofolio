import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Download, MessageSquare, Sun, Moon } from "lucide-react";
import { useTheme } from "../context/ThemeContext.jsx";

const navItems = [
  { label: "Home", to: "home" },
  { label: "About", to: "about" },
  { label: "Experience", to: "experience" },
  { label: "Projects", to: "projects" },
  { label: "Skills", to: "skills" },
  { label: "Education", to: "education" },
  { label: "Contact", to: "contact" },
];

function scrollTo(id) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
}

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("home");
  const { dark, toggleTheme } = useTheme();

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20);
      const sections = navItems.map((n) => document.getElementById(n.to)).filter(Boolean);
      for (let i = sections.length - 1; i >= 0; i--) {
        if (sections[i].getBoundingClientRect().top <= 120) {
          setActive(navItems[i].to);
          break;
        }
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleClick = (id) => {
    scrollTo(id);
    setOpen(false);
  };

  return (
    <motion.header
      className={`sticky top-0 z-50 transition-all duration-500 ${
        scrolled
          ? "shadow-lg backdrop-blur-xl border-b"
          : "bg-transparent"
      }`}
      style={{
        backgroundColor: scrolled ? `rgb(var(--color-bg) / 0.85)` : "transparent",
        borderColor: scrolled ? `rgb(var(--color-border) / 0.1)` : "transparent",
      }}
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
        {/* Logo */}
        <motion.button
          onClick={() => scrollTo("home")}
          className="text-lg font-bold tracking-tight group"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <span className="group-hover:text-accent transition-colors duration-300" style={{ color: "rgb(var(--color-text))" }}>Rido</span>
          <span className="text-accent">.</span>
        </motion.button>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-1" role="navigation" aria-label="Main navigation">
          {navItems.map((item) => (
            <button
              key={item.to}
              onClick={() => handleClick(item.to)}
              className={`relative px-4 py-2 text-sm font-medium rounded-lg transition-all duration-300 ${
                active === item.to
                  ? "text-accent"
                  : "hover:text-accent"
              }`}
              style={{
                color: active === item.to ? undefined : `rgb(var(--color-text-muted))`,
              }}
              aria-label={`Navigate to ${item.label}`}
            >
              {item.label}
              {active === item.to && (
                <motion.div
                  className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 bg-accent rounded-full"
                  layoutId="nav-dot"
                  transition={{ type: "spring", stiffness: 350, damping: 30 }}
                />
              )}
            </button>
          ))}
        </nav>

        {/* Desktop CTA + Theme Toggle */}
        <div className="hidden lg:flex items-center gap-3">
          {/* Theme Toggle */}
          <motion.button
            onClick={toggleTheme}
            className="p-2.5 rounded-xl transition-all duration-300"
            style={{
              backgroundColor: dark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.05)",
              border: `1px solid ${dark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)"}`,
            }}
            whileHover={{ scale: 1.05, rotate: 15 }}
            whileTap={{ scale: 0.95 }}
            aria-label={dark ? "Switch to light theme" : "Switch to dark theme"}
          >
            <AnimatePresence mode="wait" initial={false}>
              {dark ? (
                <motion.div
                  key="sun"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Sun size={16} className="text-yellow-400" />
                </motion.div>
              ) : (
                <motion.div
                  key="moon"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Moon size={16} className="text-blue-500" />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>

          <motion.a
            href="/assets/CV2.pdf"
            download
            className="btn-outline text-sm !px-4 !py-2"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            aria-label="Download CV"
          >
            <Download size={14} /> CV
          </motion.a>
          <motion.button
            onClick={() => scrollTo("contact")}
            className="btn-primary text-sm !px-4 !py-2"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            aria-label="Contact Me"
          >
            <MessageSquare size={14} /> Contact
          </motion.button>
        </div>

        {/* Mobile: Theme Toggle + Hamburger */}
        <div className="lg:hidden flex items-center gap-2">
          <motion.button
            onClick={toggleTheme}
            className="p-2 rounded-lg"
            style={{
              backgroundColor: dark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.05)",
            }}
            whileTap={{ scale: 0.9 }}
            aria-label={dark ? "Switch to light theme" : "Switch to dark theme"}
          >
            {dark ? <Sun size={18} className="text-yellow-400" /> : <Moon size={18} className="text-blue-500" />}
          </motion.button>
          <motion.button
            className="p-2"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
            whileTap={{ scale: 0.9 }}
            style={{ color: "rgb(var(--color-text))" }}
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </motion.button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {open && (
          <motion.nav
            className="lg:hidden backdrop-blur-xl border-t px-6 pb-6"
            style={{
              backgroundColor: `rgb(var(--color-bg) / 0.95)`,
              borderColor: `rgb(var(--color-border) / 0.1)`,
            }}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            role="navigation"
            aria-label="Mobile navigation"
          >
            <div className="space-y-1 py-4">
              {navItems.map((item, i) => (
                <motion.button
                  key={item.to}
                  onClick={() => handleClick(item.to)}
                  className={`block w-full text-left px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                    active === item.to
                      ? "text-accent bg-accent/10"
                      : ""
                  }`}
                  style={{
                    color: active === item.to ? undefined : `rgb(var(--color-text-muted))`,
                  }}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  aria-label={`Navigate to ${item.label}`}
                >
                  {item.label}
                </motion.button>
              ))}
            </div>
            <div className="flex gap-3 pt-4 border-t" style={{ borderColor: `rgb(var(--color-border) / 0.1)` }}>
              <a
                href="/assets/cv.pdf"
                download
                className="btn-outline text-sm flex-1 !py-3"
                aria-label="Download CV"
              >
                <Download size={14} /> Download CV
              </a>
              <button
                onClick={() => handleClick("contact")}
                className="btn-primary text-sm flex-1 !py-3"
                aria-label="Contact Me"
              >
                <MessageSquare size={14} /> Contact
              </button>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
