import { motion } from "framer-motion";
import { GraduationCap, MapPin, Calendar, BookOpen, FileText } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.1 },
  }),
};

export default function Education() {
  return (
    <section id="education" className="py-24 px-6 max-w-7xl mx-auto">
      <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }}>
        <motion.h2 className="section-heading" variants={fadeUp}>
          Education
        </motion.h2>
        <motion.p className="section-subheading" variants={fadeUp} custom={1}>
          My academic background
        </motion.p>

        <motion.div
          className="max-w-3xl mx-auto glass-card-hover p-8 md:p-10"
          variants={fadeUp}
          custom={2}
        >
          <div className="flex flex-col sm:flex-row gap-6">
            <div className="shrink-0">
              <div className="w-14 h-14 rounded-2xl bg-accent/10 border border-accent/20 flex items-center justify-center">
                <GraduationCap size={28} className="text-accent" />
              </div>
            </div>

            <div className="flex-1 space-y-4">
              <div>
                <h3 className="text-xl font-bold" style={{ color: "rgb(var(--color-text))" }}>Universitas Pamulang</h3>
                <p className="text-accent font-medium">Bachelor of Computer Science</p>
              </div>

              <div className="flex flex-wrap gap-4 text-sm" style={{ color: "rgb(var(--color-text-muted))" }}>
                <span className="flex items-center gap-1.5">
                  <Calendar size={14} className="text-accent/70" /> 2022 – 2026
                </span>
                <span className="flex items-center gap-1.5">
                  <MapPin size={14} className="text-accent/70" /> South Tangerang, Indonesia
                </span>
              </div>

              <div className="flex flex-wrap gap-3">
                <span className="flex items-center gap-2 text-sm" style={{ color: "rgb(var(--color-text-secondary))" }}>
                  <BookOpen size={14} className="text-accent/70" /> Faculty of Computer Science
                </span>
                <span className="flex items-center gap-2 text-sm" style={{ color: "rgb(var(--color-text-secondary))" }}>
                  <BookOpen size={14} className="text-accent/70" /> Computer Science Program
                </span>
              </div>

              <div className="mt-2 p-5 rounded-xl bg-accent/5 border border-accent/15">
                <p className="text-xs text-accent font-semibold uppercase tracking-wider mb-2 flex items-center gap-2">
                  <FileText size={12} /> Final Project / Thesis
                </p>
                <p className="text-sm leading-relaxed" style={{ color: "rgb(var(--color-text-secondary))" }}>
                  Analysis of the Effectiveness of the Cosine Similarity Method for Plagiarism
                  Detection in Academic Documents
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
