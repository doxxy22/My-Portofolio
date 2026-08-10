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
        <motion.h2 className="section-heading" variants={fadeUp}>
          Featured Projects
        </motion.h2>
        <motion.p className="section-subheading" variants={fadeUp} custom={1}>
          A selection of projects I've worked on
        </motion.p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <motion.article
              key={project.id}
              className="glass-card group overflow-hidden flex flex-col"
              variants={fadeUp}
              custom={index + 2}
              whileHover={{ y: -6, transition: { duration: 0.3 } }}
            >
              {/* Image area */}
              <div className="relative h-48 bg-gradient-to-br from-accent/10 via-accent/5 to-transparent flex items-center justify-center overflow-hidden">
                {project.image ? (
                  <img
                    src={project.image}
                    alt={project.title}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                ) : (
                  <motion.div
                    className="relative z-10"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Folder size={48} className="text-accent/40" />
                  </motion.div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-[rgb(var(--color-bg))] to-transparent opacity-60" />
                <div className="absolute inset-0 bg-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>

              {/* Content */}
              <div className="p-6 flex flex-col flex-1">
                <h3 className="text-lg font-bold mb-2 group-hover:text-accent transition-colors duration-300" style={{ color: "rgb(var(--color-text))" }}>
                  {project.title}
                </h3>
                <p className="text-sm leading-relaxed mb-4 flex-1" style={{ color: "rgb(var(--color-text-muted))" }}>
                  {project.description}
                </p>

                {/* Tech Badges */}
                <div className="flex flex-wrap gap-2 mb-5">
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
            </motion.article>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
