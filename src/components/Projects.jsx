import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Github, ExternalLink, Folder, ChevronLeft, ChevronRight, Play, Film, X } from "lucide-react";
import { projects } from "../data/projects.ts";
import { useLanguage } from "../context/LanguageContext.jsx";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.1 },
  }),
};

// Modal for playing Remotion video in full view with audio & controls
function VideoModal({ isOpen, onClose, videos, initialIndex = 0 }) {
  const [currentIdx, setCurrentIdx] = useState(initialIndex);

  if (!isOpen || !videos || videos.length === 0) return null;

  const currentVideo = videos[currentIdx] || videos[0];
  const hasMultiple = videos.length > 1;

  const next = (e) => {
    e.stopPropagation();
    setCurrentIdx((prev) => (prev + 1) % videos.length);
  };

  const prev = (e) => {
    e.stopPropagation();
    setCurrentIdx((prev) => (prev - 1 + videos.length) % videos.length);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[9999] flex items-center justify-center px-4 py-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/85 backdrop-blur-md" />

          {/* Modal Card */}
          <motion.div
            className="relative z-10 max-w-md w-full mx-auto"
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute -top-12 right-0 p-2 rounded-full text-white/70 hover:text-white hover:bg-white/10 transition-all"
              aria-label="Close video"
            >
              <X size={24} />
            </button>

            {/* Video Player (9:16 Vertical Ratio) */}
            <div className="relative rounded-2xl overflow-hidden bg-black border border-white/15 shadow-2xl flex items-center justify-center aspect-[9/16] max-h-[80vh] w-full mx-auto">
              <video
                key={currentVideo.src}
                src={currentVideo.src}
                autoPlay
                controls
                playsInline
                className="w-full h-full object-cover"
              />

              {hasMultiple && (
                <>
                  <button
                    onClick={prev}
                    className="absolute left-2.5 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/60 text-white/80 hover:text-white hover:bg-black/80 backdrop-blur-sm border border-white/10 transition-all shadow-lg"
                    aria-label="Previous video"
                  >
                    <ChevronLeft size={20} />
                  </button>
                  <button
                    onClick={next}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-black/60 text-white/80 hover:text-white hover:bg-black/80 backdrop-blur-sm border border-white/10 transition-all shadow-lg"
                    aria-label="Next video"
                  >
                    <ChevronRight size={20} />
                  </button>
                </>
              )}
            </div>

            {/* Caption & Playlist switcher */}
            <div className="mt-4 flex flex-col items-center text-center gap-2 text-white">
              <div>
                <p className="font-semibold text-base flex items-center justify-center gap-2">
                  <Film size={15} className="text-accent" />
                  <span>{currentVideo.title}</span>
                </p>
                <p className="text-white/60 text-xs mt-0.5">
                  Remotion & React — 9:16 Vertical Motion Graphics
                </p>
              </div>

              {hasMultiple && (
                <div className="flex items-center justify-center gap-1.5 flex-wrap pt-1">
                  {videos.map((v, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrentIdx(i)}
                      className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
                        currentIdx === i
                          ? "bg-accent text-white shadow-md scale-105"
                          : "bg-white/10 text-white/70 hover:bg-white/20 hover:text-white"
                      }`}
                    >
                      {v.title}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default function Projects() {
  const { t, language } = useLanguage();
  const [selectedVideoData, setSelectedVideoData] = useState(null);

  return (
    <>
      <section id="projects" className="py-24 px-6 max-w-7xl mx-auto">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }}>
          {/* Section label */}
          <motion.div className="flex items-center gap-4 mb-12" variants={fadeUp}>
            <span className="text-7xl md:text-8xl font-black text-accent/10 leading-none select-none">
              {t.projects.number}
            </span>
            <div>
              <h2 className="text-3xl md:text-4xl font-bold" style={{ color: "rgb(var(--color-text))" }}>
                {t.projects.title}
              </h2>
              <p className="text-sm mt-1" style={{ color: "rgb(var(--color-text-muted))" }}>
                {t.projects.subtitle}
              </p>
            </div>
          </motion.div>

          {/* Projects List */}
          <div className="space-y-6">
            {projects.map((project, index) => {
              const isEven = index % 2 === 0;
              const localized = t.projects.items.find((p) => p.id === project.id);
              const title = localized?.title || project.title;
              const description = localized?.description || project.description;
              const hasVideos = project.videos && project.videos.length > 0;

              return (
                <motion.article
                  key={project.id}
                  className="glass-card-hover group overflow-hidden"
                  variants={fadeUp}
                  custom={index + 2}
                  whileHover={{ y: -3, transition: { duration: 0.3 } }}
                >
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
                    {/* Media side */}
                    <div className={`lg:col-span-7 relative overflow-hidden ${!isEven ? "lg:order-2" : ""}`}>
                      {hasVideos ? (
                        /* Minimalist 9:16 Grid of Video Boxes */
                        <div className="p-3.5 sm:p-5 h-full flex flex-col justify-center bg-black/20">
                          <div className="grid grid-cols-3 gap-2.5 sm:gap-3.5 max-w-xl mx-auto w-full">
                            {project.videos.map((vid, vIdx) => (
                              <motion.div
                                key={vid.id || vIdx}
                                onClick={() =>
                                  setSelectedVideoData({
                                    videos: project.videos,
                                    index: vIdx,
                                  })
                                }
                                className="group/box relative aspect-[9/16] rounded-xl overflow-hidden cursor-pointer border border-white/10 hover:border-accent/60 transition-all duration-300 bg-black/50 shadow-sm hover:shadow-xl hover:scale-[1.03]"
                                whileHover={{ y: -3 }}
                                whileTap={{ scale: 0.98 }}
                              >
                                {/* Looping video preview (9:16 vertical) */}
                                <video
                                  src={vid.src}
                                  autoPlay
                                  muted
                                  loop
                                  playsInline
                                  preload="metadata"
                                  className="w-full h-full object-cover transition-transform duration-500 group-hover/box:scale-105"
                                />

                                {/* Dark gradient overlay */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent opacity-85 group-hover/box:opacity-60 transition-opacity" />

                                {/* Top index badge */}
                                <div className="absolute top-2 left-2.5">
                                  <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-black/50 backdrop-blur-sm text-white/80 border border-white/10 group-hover/box:text-accent transition-colors">
                                    {String(vIdx + 1).padStart(2, "0")}
                                  </span>
                                </div>

                                {/* Play icon on hover */}
                                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover/box:opacity-100 transition-opacity pointer-events-none">
                                  <span className="p-2.5 rounded-full bg-accent/90 text-white shadow-lg backdrop-blur-sm transform scale-90 group-hover/box:scale-100 transition-transform">
                                    <Play size={14} className="fill-white translate-x-0.5" />
                                  </span>
                                </div>

                                {/* Bottom title */}
                                <div className="absolute bottom-2 left-2 right-2 pointer-events-none">
                                  <span className="text-[11px] sm:text-xs font-semibold text-white line-clamp-2 drop-shadow-sm leading-tight block">
                                    {vid.title}
                                  </span>
                                </div>
                              </motion.div>
                            ))}
                          </div>

                          {/* Minimalist footer hint */}
                          <div
                            className="mt-3.5 flex items-center justify-between px-1 text-[11px]"
                            style={{ color: "rgb(var(--color-text-muted))" }}
                          >
                            <span className="flex items-center gap-1.5 font-medium">
                              <Film size={12} className="text-accent" />
                              <span>
                                {project.videos.length} {language === "id" ? "Video Vertikal (9:16)" : "Vertical Videos (9:16)"}
                              </span>
                            </span>
                            <span className="opacity-75 text-[10px]">
                              {language === "id" ? "Klik kotak untuk putar" : "Click box to play with audio"}
                            </span>
                          </div>
                        </div>
                      ) : project.image ? (
                        /* Standard Single Image Preview */
                        <div className="relative h-64 lg:h-full min-h-[280px]">
                          <img
                            src={project.image}
                            alt={title}
                            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                          />
                          <div className={`absolute bottom-4 ${isEven ? "left-5" : "right-5"} pointer-events-none`}>
                            <span className="text-7xl md:text-8xl font-black text-white/15 leading-none select-none">
                              {String(index + 1).padStart(2, "0")}
                            </span>
                          </div>
                          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent pointer-events-none" />
                        </div>
                      ) : (
                        <div className="relative h-64 lg:h-full min-h-[280px] bg-gradient-to-br from-accent/10 via-accent/5 to-transparent flex items-center justify-center">
                          <Folder size={64} className="text-accent/30" />
                        </div>
                      )}
                    </div>

                    {/* Content side */}
                    <div className={`lg:col-span-5 p-7 md:p-9 flex flex-col justify-center ${!isEven ? "lg:order-1" : ""}`}>
                      <div className="flex items-center gap-3 mb-3">
                        <p className="text-xs font-semibold text-accent uppercase tracking-widest">
                          {t.projects.projectPrefix} {String(index + 1).padStart(2, "0")}
                        </p>
                        {(project.video || hasVideos) && (
                          <span className="text-[10px] font-semibold px-2.5 py-0.5 rounded-full bg-accent/15 text-accent border border-accent/30 uppercase tracking-wider flex items-center gap-1">
                            🎬 Remotion
                            {hasVideos && ` • ${project.videos.length} Videos`}
                          </span>
                        )}
                      </div>

                      <h3
                        className="text-xl md:text-2xl font-bold mb-3 group-hover:text-accent transition-colors duration-300"
                        style={{ color: "rgb(var(--color-text))" }}
                      >
                        {title}
                      </h3>

                      <p className="text-sm leading-relaxed mb-5" style={{ color: "rgb(var(--color-text-muted))" }}>
                        {description}
                      </p>

                      {/* Tech Badges */}
                      <div className="flex flex-wrap gap-2 mb-6">
                        {project.tech.map((t) => (
                          <span key={t} className="badge !text-[11px]">{t}</span>
                        ))}
                      </div>

                      {/* Action Links */}
                      <div className="flex flex-wrap items-center gap-4 pt-4" style={{ borderTop: "1px solid rgb(var(--color-border) / 0.08)" }}>
                        {hasVideos && (
                          <motion.button
                            onClick={() =>
                              setSelectedVideoData({
                                videos: project.videos,
                                index: 0,
                              })
                            }
                            className="btn-outline !py-2 !px-3.5 text-xs font-medium inline-flex items-center gap-1.5"
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.97 }}
                          >
                            <Play size={12} className="fill-current" />
                            <span>{language === "id" ? "Putar Galeri Video" : "Play Video Gallery"}</span>
                          </motion.button>
                        )}

                        {project.github && (
                          <motion.a
                            href={project.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 text-sm hover:text-accent transition"
                            style={{ color: "rgb(var(--color-text-muted))" }}
                            whileHover={{ x: 3 }}
                            aria-label={`View ${title} on GitHub`}
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
                            aria-label={`View ${title} live demo`}
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
              {t.projects.andManyMore}
            </span>
          </motion.div>
        </motion.div>
      </section>

      {/* Video Modal Player */}
      <VideoModal
        isOpen={!!selectedVideoData}
        onClose={() => setSelectedVideoData(null)}
        videos={selectedVideoData?.videos}
        initialIndex={selectedVideoData?.index || 0}
      />
    </>
  );
}
