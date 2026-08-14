import { motion } from "framer-motion";
import { Mail, Phone, MapPin } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.1 },
  }),
};

const contactInfo = [
  {
    icon: Mail,
    label: "Email",
    value: "ridoanugrah2209@gmail.com",
    href: "mailto:ridoanugrah2209@gmail.com",
  },
  {
    icon: Phone,
    label: "Phone",
    value: "+6281316887410",
    href: "tel:081316887410",
  },
  {
    icon: MapPin,
    label: "Location",
    value: "Tangerang, Indonesia",
    href: null,
  },
];

export default function Contact() {
  return (
    <section id="contact" className="py-24 px-6 max-w-7xl mx-auto">
      <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }}>
        <motion.h2 className="section-heading" variants={fadeUp}>
          Let's Work Together
        </motion.h2>
        <motion.p className="section-subheading" variants={fadeUp} custom={1}>
          I'm currently open to opportunities in software development and web development. Feel free to reach out directly via email or phone.
        </motion.p>

        <motion.div
          className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto"
          variants={fadeUp}
          custom={2}
        >
          {contactInfo.map(({ icon: Icon, label, value, href }) => (
            <motion.div
              key={label}
              className="glass-card-hover p-6 flex flex-col items-center text-center gap-3"
              whileHover={{ y: -4 }}
            >
              <div className="w-12 h-12 rounded-2xl bg-accent/10 border border-accent/20 flex items-center justify-center mb-1">
                <Icon size={22} className="text-accent" />
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider mb-1" style={{ color: "rgb(var(--color-text-muted))" }}>
                  {label}
                </p>
                {href ? (
                  <a
                    href={href}
                    className="text-sm font-medium hover:text-accent transition break-all"
                    style={{ color: "rgb(var(--color-text))" }}
                  >
                    {value}
                  </a>
                ) : (
                  <p className="text-sm font-medium" style={{ color: "rgb(var(--color-text))" }}>
                    {value}
                  </p>
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
