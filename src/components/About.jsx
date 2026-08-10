import { motion } from "framer-motion";
import { GraduationCap, Code2, Globe, Brain, MapPin } from "lucide-react";

const stats = [
  { value: "2026", label: "Expected Graduation" },
  { value: "1+", label: "Internship Experience" },
  { value: "5+", label: "Academic Projects" },
  { value: "10+", label: "Technologies" },
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

export default function About() {
  return (
    <section id="about" className="py-24 px-6 max-w-7xl mx-auto">
      <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }}>
        <motion.h2 className="section-heading" variants={fadeUp}>
          About Me
        </motion.h2>
        <motion.p className="section-subheading" variants={fadeUp} custom={1}>
          Get to know who I am and what drives me
        </motion.p>

        <div className="grid lg:grid-cols-5 gap-12">
          {/* Left – Photo + Description (3 cols) */}
          <motion.div className="lg:col-span-3 space-y-6" variants={fadeUp} custom={2}>
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-8">
              {/* Profile Photo */}
              <motion.div
                className="relative shrink-0"
                whileHover={{ scale: 1.03 }}
                transition={{ duration: 0.3 }}
              >
                {/* Glow */}
                <div
                  className="absolute -inset-3 rounded-full blur-xl opacity-40"
                  style={{ background: "linear-gradient(135deg, rgb(var(--color-accent)), #60a5fa)" }}
                />
                {/* Gradient Ring */}
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

              {/* Bio Text */}
              <div>
                <p className="text-lg leading-relaxed" style={{ color: "rgb(var(--color-text-secondary))" }}>
                  I am a final-year Computer Science student at{" "}
                  <span className="text-accent font-medium">Universitas Pamulang</span> with a strong
                  interest in software development, web development, programming, databases, and machine
                  learning. I have gained practical experience through a Web Developer internship and
                  various academic projects.
                </p>
              </div>
            </div>

            {/* Interest Badges */}
            <div className="flex flex-wrap gap-3">
              {interests.map(({ icon: Icon, label }) => (
                <motion.div
                  key={label}
                  className="flex items-center gap-2 px-4 py-2 glass-card-hover !rounded-xl text-sm"
                  whileHover={{ scale: 1.05, y: -2 }}
                >
                  <Icon size={16} className="text-accent" />
                  <span style={{ color: "rgb(var(--color-text-secondary))" }}>{label}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right – Stats (2 cols) */}
          <div className="lg:col-span-2 grid grid-cols-2 gap-4">
            {stats.map((s, i) => (
              <motion.div
                key={s.label}
                className="glass-card-hover p-6 text-center"
                variants={fadeUp}
                custom={i + 3}
                whileHover={{ scale: 1.03 }}
              >
                <p className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-accent to-blue-300 bg-clip-text text-transparent">
                  {s.value}
                </p>
                <p className="text-sm mt-2" style={{ color: "rgb(var(--color-text-muted))" }}>{s.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
