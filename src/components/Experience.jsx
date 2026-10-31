import { motion } from "framer-motion";
import { Briefcase, Calendar, MapPin, ExternalLink } from "lucide-react";
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
        {/* Section label */}
        <motion.div className="flex items-center gap-4 mb-12" variants={fadeUp}>
          <span className="text-7xl md:text-8xl font-black text-accent/10 leading-none select-none">02</span>
          <div>
            <h2 className="text-3xl md:text-4xl font-bold" style={{ color: "rgb(var(--color-text))" }}>Experience</h2>
            <p className="text-sm mt-1" style={{ color: "rgb(var(--color-text-muted))" }}>My professional journey so far</p>
          </div>
        </motion.div>

        <div className="space-y-6">
          {experience.map((exp, idx) => (
            <motion.div
              key={exp.id}
              className="glass-card-hover overflow-hidden"
              variants={fadeUp}
              custom={idx + 2}
            >
              <div className={`grid grid-cols-1 ${exp.image ? "lg:grid-cols-12" : ""} gap-0`}>
                {/* Image (if available) */}
                {exp.image && (
                  <div className="lg:col-span-5 relative overflow-hidden">
                    <img
                      src={exp.image}
                      alt={exp.title}
                      className="w-full h-full object-cover min-h-[250px] lg:min-h-full transition-transform duration-500 hover:scale-105"
                    />
                    {/* Number overlay */}
                    <div className="absolute bottom-4 left-4">
                      <span className="text-6xl font-black text-white/20 leading-none">
                        {String(idx + 1).padStart(2, "0")}
                      </span>
                    </div>
                  </div>
                )}

                {/* Content */}
                <div className={`${exp.image ? "lg:col-span-7" : ""} p-6 md:p-8 relative`}>
                  {/* Number for non-image cards */}
                  {!exp.image && (
                    <span className="absolute top-4 right-6 text-6xl font-black text-accent/8 leading-none select-none pointer-events-none">
                      {String(idx + 1).padStart(2, "0")}
                    </span>
                  )}

                  {/* Header */}
                  <div className="flex flex-col gap-2 mb-5">
                    <h3 className="text-xl font-bold flex items-center gap-2" style={{ color: "rgb(var(--color-text))" }}>
                      <Briefcase size={18} className="text-accent" />
                      {exp.title}
                    </h3>
                    <div className="flex items-center gap-2">
                      {exp.link ? (
                        <a
                          href={exp.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-accent font-medium hover:underline inline-flex items-center gap-1.5 transition-colors"
                        >
                          {exp.company}
                          <ExternalLink size={14} />
                        </a>
                      ) : (
                        <p className="text-accent font-medium">{exp.company}</p>
                      )}
                    </div>
                    <div className="flex flex-wrap gap-4 text-sm" style={{ color: "rgb(var(--color-text-muted))" }}>
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

                  {/* Article Link (for Community Service) */}
                  {exp.articleLink && (
                    <div className="mb-6">
                      <a
                        href={exp.articleLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs font-semibold text-accent hover:underline px-3 py-1.5 rounded-lg border border-accent/25 bg-accent/5 hover:bg-accent/10 transition-colors"
                      >
                        <ExternalLink size={13} />
                        <span>Read Published Article</span>
                      </a>
                    </div>
                  )}

                  {/* Tech badges */}
                  <div className="flex flex-wrap gap-2">
                    {exp.tech.map((t) => (
                      <span key={t} className="badge">{t}</span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
