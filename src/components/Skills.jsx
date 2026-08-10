import { motion } from "framer-motion";
import { skills } from "../data/skills.ts";

const categories = [
  { key: "languages", label: "Programming Languages", icon: "💻" },
  { key: "web", label: "Web Development", icon: "🌐" },
  { key: "databases", label: "Database", icon: "🗄️" },
  { key: "tools", label: "Tools & Frameworks", icon: "🛠️" },
  { key: "ml", label: "Data & Machine Learning", icon: "🤖" },
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.1 },
  }),
};

export default function Skills() {
  return (
    <section id="skills" className="py-24 px-6 max-w-7xl mx-auto">
      <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }}>
        <motion.h2 className="section-heading" variants={fadeUp}>
          Technical Skills
        </motion.h2>
        <motion.p className="section-subheading" variants={fadeUp} custom={1}>
          Technologies and tools I work with
        </motion.p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((cat, idx) => (
            <motion.div
              key={cat.key}
              className="glass-card-hover p-6"
              variants={fadeUp}
              custom={idx + 2}
            >
              <h3 className="text-base font-semibold mb-5 flex items-center gap-3" style={{ color: "rgb(var(--color-text))" }}>
                <span className="text-xl">{cat.icon}</span>
                <span>{cat.label}</span>
              </h3>
              <div className="flex flex-wrap gap-2">
                {skills[cat.key].map((skill) => (
                  <motion.span
                    key={skill}
                    className="badge"
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
