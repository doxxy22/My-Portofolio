import { motion } from "framer-motion";
import { skills } from "../data/skills.ts";

const categories = [
  { key: "languages", label: "Programming Languages", icon: "💻", num: "01" },
  { key: "web", label: "Web Development", icon: "🌐", num: "02" },
  { key: "databases", label: "Database", icon: "🗄️", num: "03" },
  { key: "tools", label: "Tools & Frameworks", icon: "🛠️", num: "04" },
  { key: "ml", label: "Data & Machine Learning", icon: "🤖", num: "05" },
  { key: "video", label: "Video Creation & Editing", icon: "🎬", num: "06" },
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.1 },
  }),
};

// Grid span layout: 6 cards across 12-col grid
const spanMap = [
  "md:col-span-7", // 01 — wide
  "md:col-span-5", // 02
  "md:col-span-4", // 03
  "md:col-span-4", // 04
  "md:col-span-4", // 05
  "md:col-span-12", // 06 — full width to highlight Remotion
];

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
            const spanClass = spanMap[idx] ?? "md:col-span-4";
            const isVideo = cat.key === "video";

            return (
              <motion.div
                key={cat.key}
                className={`${spanClass} glass-card-hover p-6 relative overflow-hidden${isVideo ? " border border-accent/20" : ""}`}
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
                  {isVideo && (
                    <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-accent/15 text-accent border border-accent/30">
                      Featured
                    </span>
                  )}
                  <span className="skill-count">{skills[cat.key].length}</span>
                </h3>

                <div className="flex flex-wrap gap-2">
                  {skills[cat.key].map((skill) => (
                    <motion.span
                      key={skill}
                      className={`badge${isVideo && skill === "Remotion" ? " badge-glow ring-1 ring-accent/40" : " badge-glow"}`}
                      whileHover={{ scale: 1.1, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {skill}
                    </motion.span>
                  ))}
                </div>

                {isVideo && (
                  <p className="mt-4 text-xs" style={{ color: "rgb(var(--color-text-muted))" }}>
                    Building programmatic videos with React & Remotion — frame-accurate animations rendered as real video files.
                  </p>
                )}
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </section>
  );
}
