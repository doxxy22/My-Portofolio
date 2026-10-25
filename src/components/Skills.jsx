import { motion } from "framer-motion";
import { skills } from "../data/skills.ts";

const categories = [
  { key: "languages", label: "Programming Languages", icon: "💻", num: "01" },
  { key: "web", label: "Web Development", icon: "🌐", num: "02" },
  { key: "databases", label: "Database", icon: "🗄️", num: "03" },
  { key: "tools", label: "Tools & Frameworks", icon: "🛠️", num: "04" },
  { key: "ml", label: "Data & Machine Learning", icon: "🤖", num: "05" },
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
        {/* Section label */}
        <motion.div className="flex items-center gap-4 mb-12" variants={fadeUp}>
          <span className="text-7xl md:text-8xl font-black text-accent/10 leading-none select-none">04</span>
          <div>
            <h2 className="text-3xl md:text-4xl font-bold" style={{ color: "rgb(var(--color-text))" }}>Technical Skills</h2>
            <p className="text-sm mt-1" style={{ color: "rgb(var(--color-text-muted))" }}>Technologies and tools I work with</p>
          </div>
        </motion.div>

        {/* Bento grid — mixed sizes */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
          {categories.map((cat, idx) => {
            // Assign different spans for visual variety
            const spanClass =
              idx === 0 ? "md:col-span-7" :
              idx === 1 ? "md:col-span-5" :
              idx === 2 ? "md:col-span-4" :
              idx === 3 ? "md:col-span-4" :
              "md:col-span-4";

            return (
              <motion.div
                key={cat.key}
                className={`${spanClass} glass-card-hover p-6 relative overflow-hidden`}
                variants={fadeUp}
                custom={idx + 2}
              >
                {/* Background number */}
                <span className="absolute -bottom-3 -right-1 text-6xl font-black text-accent/5 leading-none select-none pointer-events-none">
                  {cat.num}
                </span>

                <h3 className="text-base font-semibold mb-5 flex items-center gap-3" style={{ color: "rgb(var(--color-text))" }}>
                  <span className="text-xl">{cat.icon}</span>
                  <span className="flex-1">{cat.label}</span>
                  <span className="skill-count">{skills[cat.key].length}</span>
                </h3>
                <div className="flex flex-wrap gap-2">
                  {skills[cat.key].map((skill) => (
                    <motion.span
                      key={skill}
                      className="badge badge-glow"
                      whileHover={{ scale: 1.1, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {skill}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </section>
  );
}
