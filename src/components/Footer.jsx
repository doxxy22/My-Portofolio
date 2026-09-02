import { motion } from "framer-motion";
import { Github, Linkedin, Mail, Heart } from "lucide-react";

const socials = [
  { icon: Github, href: "https://github.com/doxxy22", label: "GitHub" },
  { icon: Linkedin, href: "https://www.linkedin.com/in/rido-anugrah-a694ba335/", label: "LinkedIn" },
  { icon: Mail, href: "mailto:ridoanugrah2209@gmail.com", label: "Email" },
];

export default function Footer() {
  return (
    <footer style={{ borderTop: "1px solid rgb(var(--color-border) / 0.08)", backgroundColor: "rgb(var(--color-bg-alt) / 0.5)" }}>
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Left */}
          <div className="text-center md:text-left">
            <p className="text-lg font-bold" style={{ color: "rgb(var(--color-text))" }}>
              Rido<span className="text-accent">.</span>
            </p>
            <p className="text-sm mt-1" style={{ color: "rgb(var(--color-text-muted))" }}>Fresh Graduate | Software Developer</p>
          </div>

          {/* Social icons */}
          <div className="flex gap-3">
            {socials.map(({ icon: Icon, href, label }) => (
              <motion.a
                key={label}
                href={href}
                target={label !== "Email" ? "_blank" : undefined}
                rel={label !== "Email" ? "noopener noreferrer" : undefined}
                className="p-2.5 glass-card-hover !rounded-xl hover:!text-accent transition-colors"
                style={{ color: "rgb(var(--color-text-muted))" }}
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
                aria-label={label}
              >
                <Icon size={18} />
              </motion.a>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-8 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3" style={{ borderTop: "1px solid rgb(var(--color-border) / 0.06)" }}>
          <p className="text-xs" style={{ color: "rgb(var(--color-text-muted))" }}>
            © 2026 Rido Anugrah. All rights reserved.
          </p>
          <p className="text-xs flex items-center gap-1" style={{ color: "rgb(var(--color-text-muted))" }}>
            Built with <Heart size={12} className="text-red-400" /> using React &amp; Tailwind CSS
          </p>
        </div>
      </div>
    </footer>
  );
}
