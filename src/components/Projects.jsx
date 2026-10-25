import { motion } from "framer-motion";
import { Github, ExternalLink, Folder } from "lucide-react";
import { projects } from "../data/projects.ts";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.1 },
  }),
};

export default function Projects() {
  return (
    <section id="projects" className="py-24 px-6 max-w-7xl mx-auto">
      <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }}>
        {/* Section label */}
        <motion.div className="flex items-center gap-4 mb-12" variants={fadeUp}>
          <span className="text-7xl md:text-8xl font-black text-accent/10 leading-none select-none">03</span>
          <div>
            <h2 className="text-3xl md:text-4xl font-bold" style={{ color: "rgb(var(--color-text))" }}>Featured Projects</h2>
            <p className="text-sm mt-1" style={{ color: "rgb(var(--color-text-muted))" }}>A selection of projects I've worked on</p>
          </div>
        </motion.div>

        {/* Alternating large layout */}
        <div className="space-y-6">
          {projects.map((project, index) => {
            const isEven = index % 2 === 0;

            return (
              <motion.article
                key={project.id}
                className="glass-card-hover group overflow-hidden"
                variants={fadeUp}
                custom={index + 2}
                whileHover={{ y: -3, transition: { duration: 0.3 } }}
              >
                <div className={`grid grid-cols-1 lg:grid-cols-12 gap-0`}>
                  {/* Image side */}
                  <div className={`lg:col-span-7 relative overflow-hidden ${!isEven ? "lg:order-2" : ""}`}>
                    <div className="relative h-64 lg:h-full min-h-[280px]">
                      {project.image ? (
                        <img
                          src={project.image}
                          alt={project.title}
                          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                      ) : (
                        <div className="absolute inset-0 bg-gradient-to-br from-accent/10 via-accent/5 to-transparent flex items-center justify-center">
                          <Folder size={64} className="text-accent/30" />
                        </div>
                      )}
                      {/* Number overlay */}
                      <div className={`absolute bottom-4 ${isEven ? "left-5" : "right-5"}`}>
                        <span className="text-7xl md:text-8xl font-black text-white/15 leading-none select-none">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                    </div>
                  </div>

                  {/* Content side */}
                  <div className={`lg:col-span-5 p-7 md:p-9 flex flex-col justify-center ${!isEven ? "lg:order-1" : ""}`}>
                    <p className="text-xs font-semibold text-accent uppercase tracking-widest mb-3">
                      PROJECT {String(index + 1).padStart(2, "0")}
                    </p>
                    <h3
                      className="text-xl md:text-2xl font-bold mb-3 group-hover:text-accent transition-colors duration-300"
                      style={{ color: "rgb(var(--color-text))" }}
                    >
                      {project.title}
                    </h3>
                    <p className="text-sm leading-relaxed mb-5" style={{ color: "rgb(var(--color-text-muted))" }}>
                      {project.description}
                    </p>

                    {/* Tech Badges */}
                    <div className="flex flex-wrap gap-2 mb-6">
                      {project.tech.map((t) => (
                        <span key={t} className="badge !text-[11px]">{t}</span>
                      ))}
                    </div>

                    {/* Links */}
                    <div className="flex gap-4 pt-4" style={{ borderTop: "1px solid rgb(var(--color-border) / 0.08)" }}>
                      {project.github && (
                        <motion.a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 text-sm hover:text-accent transition"
                          style={{ color: "rgb(var(--color-text-muted))" }}
                          whileHover={{ x: 3 }}
                          aria-label={`View ${project.title} on GitHub`}
                        >
                          <Github size={15} /> GitHub
                        </motion.a>
                      )}
                      {project.demo && (
                        <motion.a
                          href={project.demo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 text-sm hover:text-accent transition"
                          style={{ color: "rgb(var(--color-text-muted))" }}
                          whileHover={{ x: 3 }}
                          aria-label={`View ${project.title} live demo`}
                        >
                          <ExternalLink size={15} /> Live Demo
                        </motion.a>
                      )}
                    </div>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>

        {/* And many more */}
        <motion.div
          className="mt-12 text-center"
          variants={fadeUp}
          custom={projects.length + 2}
        >
          <span
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full glass-card border border-accent/20 text-sm font-medium tracking-wider uppercase shadow-sm"
            style={{ color: "rgb(var(--color-text-muted))" }}
          >
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
            And Many More...
          </span>
        </motion.div>
      </motion.div>
    </section>
  );
}
