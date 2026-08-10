import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Send, CheckCircle } from "lucide-react";

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
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const validate = () => {
    const errs = {};
    if (!form.name.trim()) errs.name = "Name is required.";
    if (!form.email.trim()) errs.email = "Email is required.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      errs.email = "Please enter a valid email address.";
    if (!form.subject.trim()) errs.subject = "Subject is required.";
    if (!form.message.trim()) errs.message = "Message is required.";
    return errs;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length === 0) {
      setSubmitted(true);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: "" });
    }
  };

  return (
    <section id="contact" className="py-24 px-6 max-w-7xl mx-auto">
      <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }}>
        <motion.h2 className="section-heading" variants={fadeUp}>
          Let's Work Together
        </motion.h2>
        <motion.p className="section-subheading" variants={fadeUp} custom={1}>
          I'm currently open to opportunities in software development and web development. If you're
          looking for a motivated developer or would like to discuss a project, feel free to reach
          out.
        </motion.p>

        <div className="grid lg:grid-cols-5 gap-8 max-w-5xl mx-auto">
          {/* Info Cards (2 cols) */}
          <motion.div className="lg:col-span-2 space-y-4" variants={fadeUp} custom={2}>
            {contactInfo.map(({ icon: Icon, label, value, href }) => (
              <motion.div
                key={label}
                className="glass-card-hover p-5 flex items-start gap-4"
                whileHover={{ x: 4 }}
              >
                <div className="w-10 h-10 shrink-0 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center">
                  <Icon size={18} className="text-accent" />
                </div>
                <div>
                  <p className="text-sm mb-0.5" style={{ color: "rgb(var(--color-text-muted))" }}>{label}</p>
                  {href ? (
                    <a
                      href={href}
                      className="text-sm font-medium hover:text-accent transition"
                      style={{ color: "rgb(var(--color-text))" }}
                    >
                      {value}
                    </a>
                  ) : (
                    <p className="text-sm font-medium" style={{ color: "rgb(var(--color-text))" }}>{value}</p>
                  )}
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Contact Form (3 cols) */}
          <motion.div className="lg:col-span-3" variants={fadeUp} custom={3}>
            <div className="glass-card p-6 md:p-8">
              {submitted ? (
                <motion.div
                  className="flex flex-col items-center justify-center py-12 text-center"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                >
                  <div className="w-16 h-16 rounded-full bg-green-500/10 border border-green-500/20 flex items-center justify-center mb-4">
                    <CheckCircle size={32} className="text-green-400" />
                  </div>
                  <h3 className="text-xl font-bold mb-2" style={{ color: "rgb(var(--color-text))" }}>Message Sent!</h3>
                  <p className="text-sm" style={{ color: "rgb(var(--color-text-muted))" }}>
                    Thank you for reaching out. I'll get back to you soon.
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="contact-name" className="sr-only">Name</label>
                      <input
                        id="contact-name"
                        type="text"
                        name="name"
                        placeholder="Your Name"
                        value={form.name}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl text-sm transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-accent/30"
                        style={{
                          backgroundColor: "rgb(var(--color-bg) / 0.5)",
                          border: "1px solid rgb(var(--color-border) / 0.15)",
                          color: "rgb(var(--color-text))",
                        }}
                        autoComplete="name"
                      />
                      {errors.name && <p className="text-red-400 text-xs mt-1.5">{errors.name}</p>}
                    </div>
                    <div>
                      <label htmlFor="contact-email" className="sr-only">Email</label>
                      <input
                        id="contact-email"
                        type="email"
                        name="email"
                        placeholder="Your Email"
                        value={form.email}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl text-sm transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-accent/30"
                        style={{
                          backgroundColor: "rgb(var(--color-bg) / 0.5)",
                          border: "1px solid rgb(var(--color-border) / 0.15)",
                          color: "rgb(var(--color-text))",
                        }}
                        autoComplete="email"
                      />
                      {errors.email && <p className="text-red-400 text-xs mt-1.5">{errors.email}</p>}
                    </div>
                  </div>
                  <div>
                    <label htmlFor="contact-subject" className="sr-only">Subject</label>
                    <input
                      id="contact-subject"
                      type="text"
                      name="subject"
                      placeholder="Subject"
                      value={form.subject}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl text-sm transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-accent/30"
                      style={{
                        backgroundColor: "rgb(var(--color-bg) / 0.5)",
                        border: "1px solid rgb(var(--color-border) / 0.15)",
                        color: "rgb(var(--color-text))",
                      }}
                    />
                    {errors.subject && <p className="text-red-400 text-xs mt-1.5">{errors.subject}</p>}
                  </div>
                  <div>
                    <label htmlFor="contact-message" className="sr-only">Message</label>
                    <textarea
                      id="contact-message"
                      name="message"
                      placeholder="Your Message"
                      rows={5}
                      value={form.message}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl text-sm transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-accent/30 resize-none"
                      style={{
                        backgroundColor: "rgb(var(--color-bg) / 0.5)",
                        border: "1px solid rgb(var(--color-border) / 0.15)",
                        color: "rgb(var(--color-text))",
                      }}
                    />
                    {errors.message && <p className="text-red-400 text-xs mt-1.5">{errors.message}</p>}
                  </div>
                  <motion.button
                    type="submit"
                    className="btn-primary w-full"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Send size={16} /> Send Message
                  </motion.button>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
