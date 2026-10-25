import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { GraduationCap, Code2, Globe, Brain, MapPin, Award } from "lucide-react";

const stats = [
  { value: "S.Kom", label: "Degree", isNumber: false },
  { value: 1, label: "Internship", suffix: "+", isNumber: true },
  { value: 5, label: "Projects Built", suffix: "+", isNumber: true },
  { value: 10, label: "Technologies", suffix: "+", isNumber: true },
];

const interests = [
  { icon: GraduationCap, label: "Computer Science" },
  { icon: Code2, label: "Software Development" },
  { icon: Globe, label: "Web Development" },
  { icon: Brain, label: "Machine Learning" },
  { icon: MapPin, label: "Tangerang, Indonesia" },
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.1 },
  }),
};

// Animated counter hook
function useCounter(target, duration = 1500, startCounting = false) {
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    if (!startCounting || typeof target !== "number") return;
    
    let start = 0;
    const increment = target / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    
    return () => clearInterval(timer);
  }, [target, duration, startCounting]);
  
  return count;
}

function StatCard({ stat, index }) {
  const [inView, setInView] = useState(false);
  const ref = useRef(null);
  const count = useCounter(stat.isNumber ? stat.value : 0, 1200, inView);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <motion.div
      ref={ref}
      className="glass-card-hover p-6 text-center"
      variants={fadeUp}
      custom={index + 3}
      whileHover={{ scale: 1.03 }}
    >
      <p className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-accent to-blue-300 bg-clip-text text-transparent">
        {stat.isNumber ? (
          <>{count}{stat.suffix}</>
        ) : (
          <span className="flex items-center justify-center gap-2">
            <Award size={24} className="text-accent" />
            {stat.value}
          </span>
        )}
      </p>
      <p className="text-sm mt-2" style={{ color: "rgb(var(--color-text-muted))" }}>{stat.label}</p>
    </motion.div>
  );
}

export default function About() {
  return (
    <section id="about" className="py-24 px-6 max-w-7xl mx-auto">
      <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }}>
        {/* Section label */}
        <motion.div className="flex items-center gap-4 mb-12" variants={fadeUp}>
          <span className="text-7xl md:text-8xl font-black text-accent/10 leading-none select-none">01</span>
          <div>
            <h2 className="text-3xl md:text-4xl font-bold" style={{ color: "rgb(var(--color-text))" }}>About Me</h2>
            <p className="text-sm mt-1" style={{ color: "rgb(var(--color-text-muted))" }}>Get to know who I am and what drives me</p>
          </div>
        </motion.div>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
          {/* Photo Card — spans 4 cols */}
          <motion.div
            className="md:col-span-4 glass-card-hover p-6 flex flex-col items-center justify-center"
            variants={fadeUp}
            custom={2}
          >
            <motion.div
              className="relative"
              whileHover={{ scale: 1.03 }}
              transition={{ duration: 0.3 }}
            >
              <div
                className="absolute -inset-3 rounded-full blur-xl opacity-40"
                style={{ background: "linear-gradient(135deg, rgb(var(--color-accent)), #60a5fa)" }}
              />
              <div
                className="relative w-40 h-40 md:w-48 md:h-48 rounded-full p-[3px]"
                style={{ background: "linear-gradient(135deg, rgb(var(--color-accent)), #60a5fa, rgb(var(--color-accent)))" }}
              >
                <img
                  src="/assets/me.jpg"
                  alt="Rido Anugrah"
                  className="w-full h-full rounded-full object-cover"
                  style={{ border: "3px solid rgb(var(--color-bg))" }}
                />
              </div>
            </motion.div>
            <h3 className="text-xl font-bold mt-5" style={{ color: "rgb(var(--color-text))" }}>Rido Anugrah</h3>
            <p className="text-sm text-accent font-medium">Fresh Graduate — S.Kom</p>
          </motion.div>

          {/* Bio Card — spans 8 cols */}
          <motion.div
            className="md:col-span-8 glass-card-hover p-8 flex flex-col justify-center"
            variants={fadeUp}
            custom={3}
          >
            <p className="text-xs font-semibold text-accent uppercase tracking-widest mb-4">WHO I AM</p>
            <p className="text-lg leading-relaxed mb-6" style={{ color: "rgb(var(--color-text-secondary))" }}>
              I am a Fresh Graduate in Computer Science
              with a strong
              interest in software development, web development, programming, databases, and machine
              learning. I have gained practical experience through a Web Developer internship and
              various academic projects.
            </p>
            {/* Interest Badges */}
            <div className="flex flex-wrap gap-2">
              {interests.map(({ icon: Icon, label }) => (
                <motion.div
                  key={label}
                  className="flex items-center gap-2 px-3 py-1.5 glass-card-hover !rounded-full text-sm"
                  whileHover={{ scale: 1.05, y: -2 }}
                >
                  <Icon size={14} className="text-accent" />
                  <span style={{ color: "rgb(var(--color-text-secondary))" }}>{label}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Stats Row — 4 equal cards */}
          {stats.map((s, i) => (
            <motion.div key={s.label} className="md:col-span-3" variants={fadeUp} custom={i + 4}>
              <StatCard stat={s} index={i} />
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
