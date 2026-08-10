import { motion } from "framer-motion";
import { ArrowDown, FlaskConical, Database, FileText, BarChart3, AlertTriangle } from "lucide-react";

const pipelineSteps = [
  { label: "Dataset", desc: "PAN-PC-2011 corpus — 500 document pairs", icon: Database },
  { label: "Preprocessing", desc: "Tokenization via NLTK toolkit", icon: FileText },
  { label: "TF-IDF Vectorization", desc: "Statistical weighting with Scikit-Learn", icon: BarChart3 },
  { label: "Cosine Similarity", desc: "Global semantic similarity calculation (VSM)", icon: FlaskConical },
  { label: "Threshold Testing", desc: "Binary classification at varying τ values", icon: AlertTriangle },
  { label: "Classification", desc: "Plagiarism / Not Plagiarism decision", icon: FileText },
  { label: "Evaluation", desc: "Accuracy, Precision, Recall & Confusion Matrix", icon: BarChart3 },
];

const metrics = [
  { label: "Accuracy", value: "94.0%", highlight: true },
  { label: "Precision", value: "100%", highlight: true },
  { label: "Recall", value: "94.0%", highlight: true },
  { label: "Optimal τ", value: "2.0%", highlight: false },
];

const techStack = ["Python", "Jupyter Notebook", "NLTK", "Scikit-Learn", "TF-IDF", "Cosine Similarity"];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.1 },
  }),
};

export default function Research() {
  return (
    <section id="research" className="py-24 px-6 max-w-7xl mx-auto">
      <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }}>
        <motion.h2 className="section-heading" variants={fadeUp}>
          Research
        </motion.h2>
        <motion.p className="section-subheading" variants={fadeUp} custom={1}>
          Analysis of the Effectiveness of the Cosine Similarity Method for Plagiarism Detection in
          Academic Documents
        </motion.p>

        {/* Abstract Card */}
        <motion.div className="glass-card p-6 md:p-8 mb-12 max-w-4xl mx-auto" variants={fadeUp} custom={2}>
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2" style={{ color: "rgb(var(--color-text))" }}>
            <FlaskConical size={20} className="text-accent" />
            Abstract
          </h3>
          <p className="text-sm leading-relaxed mb-4" style={{ color: "rgb(var(--color-text-secondary))" }}>
            Plagiarism in academic documents undermines scientific integrity and diminishes the quality
            of education. This study analyzes the effectiveness of integrating Term Frequency-Inverse
            Document Frequency (TF-IDF) statistical weighting with the Cosine Similarity distance
            metric to detect global semantic similarity at the full document level.
          </p>
          <p className="text-sm leading-relaxed mb-4" style={{ color: "rgb(var(--color-text-secondary))" }}>
            The computational experiment was executed interactively within a Jupyter Notebook environment
            using Python, supported by the NLTK and Scikit-Learn libraries. The test dataset is an
            internationally standardized secondary dataset from the{" "}
            <span className="text-accent font-medium">PAN at CLEF 2011 corpus (PAN-PC-2011 subset)</span>{" "}
            consisting of 500 pairs of suspicious (query) and source documents.
          </p>

          {/* Tech stack badges */}
          <div className="flex flex-wrap gap-2 mt-4">
            {techStack.map((t) => (
              <span key={t} className="badge">{t}</span>
            ))}
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left — Pipeline */}
          <motion.div variants={fadeUp} custom={3}>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center">
                <FlaskConical size={20} className="text-accent" />
              </div>
              <h3 className="text-lg font-semibold" style={{ color: "rgb(var(--color-text))" }}>Research Pipeline</h3>
            </div>

            {pipelineSteps.map((step, idx) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={step.label}
                  className="flex flex-col items-center"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: idx * 0.08 }}
                  viewport={{ once: true }}
                >
                  <motion.div
                    className="w-full py-4 px-5 glass-card-hover flex items-center justify-between gap-3"
                    whileHover={{ x: 4 }}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center shrink-0">
                        <Icon size={14} className="text-accent" />
                      </div>
                      <div>
                        <span className="font-medium text-sm" style={{ color: "rgb(var(--color-text))" }}>{step.label}</span>
                        <p className="text-xs mt-0.5" style={{ color: "rgb(var(--color-text-muted))" }}>{step.desc}</p>
                      </div>
                    </div>
                    <span className="text-xs text-accent font-mono shrink-0">{String(idx + 1).padStart(2, "0")}</span>
                  </motion.div>
                  {idx < pipelineSteps.length - 1 && (
                    <div className="py-1">
                      <ArrowDown size={16} className="text-accent/40" />
                    </div>
                  )}
                </motion.div>
              );
            })}
          </motion.div>

          {/* Right — Metrics + Key Findings */}
          <motion.div className="space-y-6" variants={fadeUp} custom={4}>
            {/* Metric cards */}
            <div>
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2" style={{ color: "rgb(var(--color-text))" }}>
                <BarChart3 size={20} className="text-accent" />
                Performance Metrics
                <span className="text-xs font-normal ml-1" style={{ color: "rgb(var(--color-text-muted))" }}>(at τ = 2.0%)</span>
              </h3>
              <div className="grid grid-cols-2 gap-4">
                {metrics.map((m, i) => (
                  <motion.div
                    key={m.label}
                    className="glass-card-hover p-5 text-center"
                    whileHover={{ scale: 1.03 }}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.3 + i * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <p className="text-xs uppercase tracking-wider mb-1" style={{ color: "rgb(var(--color-text-muted))" }}>{m.label}</p>
                    <p className={`text-3xl font-bold ${m.highlight ? "bg-gradient-to-r from-accent to-blue-300 bg-clip-text text-transparent" : "text-accent"}`}>
                      {m.value}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Key Findings */}
            <div className="glass-card p-6">
              <h3 className="text-base font-semibold mb-3" style={{ color: "rgb(var(--color-text))" }}>Key Findings</h3>
              <ul className="space-y-3">
                <li className="flex gap-3 text-sm" style={{ color: "rgb(var(--color-text-secondary))" }}>
                  <span className="text-accent mt-0.5 shrink-0">▸</span>
                  <span>
                    Optimal detection performance achieved at the lowest threshold of{" "}
                    <span className="text-accent font-semibold">τ = 2.0%</span>, recording 94.0% Accuracy and 94.0% Recall.
                  </span>
                </li>
                <li className="flex gap-3 text-sm" style={{ color: "rgb(var(--color-text-secondary))" }}>
                  <span className="text-accent mt-0.5 shrink-0">▸</span>
                  <span>
                    Precision remained perfectly constant at <span className="text-accent font-semibold">100.0%</span> across
                    thresholds of 2.0% to 70.0% due to the dataset's positive ground truth characteristics.
                  </span>
                </li>
                <li className="flex gap-3 text-sm" style={{ color: "rgb(var(--color-text-secondary))" }}>
                  <span className="text-accent mt-0.5 shrink-0">▸</span>
                  <span>
                    Performance drops sharply above τ = 20.0% and reaches 0.0% at thresholds ≥ 80.0%.
                  </span>
                </li>
                <li className="flex gap-3 text-sm" style={{ color: "rgb(var(--color-text-secondary))" }}>
                  <span className="text-accent mt-0.5 shrink-0">▸</span>
                  <span>
                    Partial plagiarism in long documents tends to "sink" within global cosine calculations
                    of the Vector Space Model (VSM) due to hundreds of other original unique vocabularies —
                    the global similarity tolerance threshold must be set very low{" "}
                    <span className="text-accent font-semibold">(τ ≤ 5.0%)</span> to prevent detection failure.
                  </span>
                </li>
              </ul>
            </div>

            {/* Dataset info */}
            <div className="glass-card p-5 flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center shrink-0">
                <Database size={18} className="text-accent" />
              </div>
              <div>
                <p className="text-sm font-medium" style={{ color: "rgb(var(--color-text))" }}>PAN-PC-2011 Corpus</p>
                <p className="text-xs mt-1" style={{ color: "rgb(var(--color-text-muted))" }}>
                  Internationally standardized secondary dataset — 500 pairs of suspicious and source documents from PAN at CLEF 2011.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
