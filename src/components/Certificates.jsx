import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Award, Building2, Calendar, ChevronLeft, ChevronRight, X, Eye } from "lucide-react";
import { certificates } from "../data/certificates.ts";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.1 },
  }),
};

function ImageModal({ isOpen, onClose, certificate }) {
  const [currentIdx, setCurrentIdx] = useState(0);
  const images = certificate?.images || (certificate?.image ? [certificate.image] : []);
  const hasMultiple = images.length > 1;

  const next = (e) => {
    e.stopPropagation();
    setCurrentIdx((prev) => (prev + 1) % images.length);
  };
  const prev = (e) => {
    e.stopPropagation();
    setCurrentIdx((prev) => (prev - 1 + images.length) % images.length);
  };

  if (!isOpen || !certificate) return null;

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
          <div className="absolute inset-0 bg-black/80 backdrop-blur-md" />

          {/* Content */}
          <motion.div
            className="relative z-10 max-w-4xl w-full"
            initial={{ scale: 0.85, opacity: 0, y: 30 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.85, opacity: 0, y: 30 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute -top-12 right-0 p-2 rounded-full text-white/70 hover:text-white hover:bg-white/10 transition-all"
              aria-label="Close modal"
            >
              <X size={24} />
            </button>

            {/* Image */}
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <AnimatePresence mode="wait">
                <motion.img
                  key={currentIdx}
                  src={images[currentIdx]}
                  alt={certificate.title}
                  className="w-full h-auto object-contain rounded-2xl"
                  style={{ maxHeight: "80vh" }}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.25 }}
                />
              </AnimatePresence>

              {/* Navigation arrows */}
              {hasMultiple && (
                <>
                  <button
                    onClick={prev}
                    className="absolute left-3 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-black/50 text-white hover:bg-black/70 transition-all backdrop-blur-sm"
                    aria-label="Previous image"
                  >
                    <ChevronLeft size={20} />
                  </button>
                  <button
                    onClick={next}
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-black/50 text-white hover:bg-black/70 transition-all backdrop-blur-sm"
                    aria-label="Next image"
                  >
                    <ChevronRight size={20} />
                  </button>
                </>
              )}

              {/* Dots indicator */}
              {hasMultiple && (
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                  {images.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={(e) => {
                        e.stopPropagation();
                        setCurrentIdx(idx);
                      }}
                      className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                        idx === currentIdx
                          ? "bg-white w-6"
                          : "bg-white/40 hover:bg-white/60"
                      }`}
                      aria-label={`Go to image ${idx + 1}`}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Caption */}
            <div className="mt-4 text-center">
              <p className="text-white font-semibold text-lg">{certificate.title}</p>
              <p className="text-white/60 text-sm mt-1">
                {certificate.issuer} • {certificate.date}
              </p>
              {hasMultiple && (
                <p className="text-white/40 text-xs mt-2">
                  {currentIdx + 1} / {images.length}
                </p>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default function Certificates() {
  const [selectedCert, setSelectedCert] = useState(null);

  return (
    <>
      <section id="certificates" className="py-24 px-6 max-w-7xl mx-auto">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          <motion.h2 className="section-heading" variants={fadeUp}>
            Certificates
          </motion.h2>
          <motion.p className="section-subheading" variants={fadeUp} custom={1}>
            Professional certifications & achievements
          </motion.p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {certificates.map((cert, idx) => (
              <motion.div
                key={cert.id}
                className="glass-card-hover group cursor-pointer overflow-hidden"
                variants={fadeUp}
                custom={idx + 2}
                onClick={() => setSelectedCert(cert)}
                whileHover={{ y: -4 }}
                transition={{ duration: 0.3 }}
              >
                {/* Certificate Image Preview */}
                <div className="relative overflow-hidden">
                  <div className="aspect-[4/3] overflow-hidden">
                    <img
                      src={cert.image}
                      alt={cert.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>

                  {/* Overlay on hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center">
                    <motion.div
                      className="p-3 rounded-full bg-white/20 backdrop-blur-sm"
                      initial={{ scale: 0 }}
                      whileHover={{ scale: 1.1 }}
                    >
                      <Eye size={24} className="text-white" />
                    </motion.div>
                  </div>

                  {/* Badge count for multiple images */}
                  {cert.images && cert.images.length > 1 && (
                    <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-black/50 backdrop-blur-sm text-white text-xs font-medium">
                      {cert.images.length} certificates
                    </div>
                  )}
                </div>

                {/* Card Content */}
                <div className="p-5 space-y-3">
                  <h3
                    className="text-lg font-bold line-clamp-2 group-hover:text-accent transition-colors duration-300"
                    style={{ color: "rgb(var(--color-text))" }}
                  >
                    {cert.title}
                  </h3>

                  <div className="flex items-center gap-4 text-sm" style={{ color: "rgb(var(--color-text-muted))" }}>
                    <span className="flex items-center gap-1.5">
                      <Building2 size={13} className="text-accent/70" />
                      {cert.issuer}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Calendar size={13} className="text-accent/70" />
                      {cert.date}
                    </span>
                  </div>

                  <p
                    className="text-sm leading-relaxed line-clamp-3"
                    style={{ color: "rgb(var(--color-text-muted))" }}
                  >
                    {cert.description}
                  </p>

                  {/* View button */}
                  <div className="pt-2">
                    <span className="inline-flex items-center gap-1.5 text-xs font-medium text-accent group-hover:gap-2.5 transition-all duration-300">
                      <Award size={14} />
                      View Certificate
                      <ChevronRight size={14} className="transition-transform duration-300 group-hover:translate-x-1" />
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Modal */}
      <ImageModal
        isOpen={!!selectedCert}
        onClose={() => setSelectedCert(null)}
        certificate={selectedCert}
      />
    </>
  );
}
