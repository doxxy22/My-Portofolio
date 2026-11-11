import { motion } from "framer-motion";
import { Mail, Phone, Send, MessageCircle } from "lucide-react";
import { useLanguage } from "../context/LanguageContext.jsx";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.1 },
  }),
};

export default function Contact() {
  const { t } = useLanguage();

  const contactInfo = [
    {
      icon: Mail,
      label: t.contact.email,
      value: "ridoanugrah2209@gmail.com",
      href: "mailto:ridoanugrah2209@gmail.com",
    },
    {
      icon: Phone,
      label: t.contact.phone,
      value: "+6281316887410",
      href: "tel:081316887410",
    },
  ];

  return (
    <section id="contact" className="py-24 px-6 max-w-7xl mx-auto">
      <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }}>
        <motion.h2 className="section-heading" variants={fadeUp}>
          {t.contact.title}
        </motion.h2>
        <motion.p className="section-subheading" variants={fadeUp} custom={1}>
          {t.contact.subtitle}
        </motion.p>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto"
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

        {/* CTA Buttons */}
        <motion.div
          className="flex flex-wrap items-center justify-center gap-4 mt-12"
          variants={fadeUp}
          custom={4}
        >
          <motion.a
            href="mailto:ridoanugrah2209@gmail.com"
            className="btn-primary !px-8 !py-3.5 text-base"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            <Send size={18} />
            {t.contact.sendEmail}
          </motion.a>
          <motion.a
            href="https://wa.me/6281316887410"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-outline !px-8 !py-3.5 text-base"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            <MessageCircle size={18} />
            {t.contact.chatWhatsapp}
          </motion.a>
        </motion.div>
      </motion.div>
    </section>
  );
}
