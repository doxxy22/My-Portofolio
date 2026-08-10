import { motion } from "framer-motion";
import { Briefcase, Calendar, MapPin } from "lucide-react";
import { experience } from "../data/experience.ts";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.1 },
  }),
};

export default function Experience() {
  return (
    <section id="experience" className="py-24 px-6 max-w-7xl mx-auto">
      <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }}>
        <motion.h2 className="section-heading" variants={fadeUp}>
          Experience
        </motion.h2>
        <motion.p className="section-subheading" variants={fadeUp} custom={1}>
          My professional journey so far
        </motion.p>

        <div className="max-w-3xl mx-auto space-y-8">
          {experience.map((exp, idx) => (
            <motion.div
              key={exp.id}
              className="relative"
              variants={fadeUp}
              custom={idx + 2}
            >
              {/* Timeline line */}
              <div className="absolute left-6 top-14 bottom-0 w-px bg-gradient-to-b from-accent/50 to-transparent hidden md:block" />

              <div className="glass-card-hover p-6 md:p-8 md:ml-14 relative">
                {/* Timeline dot */}
                <div className="hidden md:flex absolute -left-[3.25rem] top-8 w-4 h-4 rounded-full bg-accent border-4 items-center justify-center" style={{ borderColor: "rgb(var(--color-bg))" }}>
                  <div className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                </div>

                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-4">
                  <div>
                    <h3 className="text-xl font-bold flex items-center gap-2" style={{ color: "rgb(var(--color-text))" }}>
                      <Briefcase size={18} className="text-accent" />
                      {exp.title}
                    </h3>
                    <p className="text-accent font-medium mt-1">{exp.company}</p>
                  </div>
                  <div className="flex flex-wrap gap-3 text-sm" style={{ color: "rgb(var(--color-text-muted))" }}>
                    <span className="flex items-center gap-1">
                      <MapPin size={13} /> {exp.location}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar size={13} /> {exp.year}
                    </span>
                  </div>
                </div>

                {/* Description */}
                <ul className="space-y-2 mb-6">
                  {exp.description.map((d, i) => (
                    <li key={i} className="text-sm flex gap-3" style={{ color: "rgb(var(--color-text-muted))" }}>
                      <span className="text-accent mt-1.5 shrink-0">▸</span>
                      <span>{d}</span>
                    </li>
                  ))}
                </ul>

                {/* Tech badges */}
                <div className="flex flex-wrap gap-2">
                  {exp.tech.map((t) => (
                    <span key={t} className="badge">{t}</span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}