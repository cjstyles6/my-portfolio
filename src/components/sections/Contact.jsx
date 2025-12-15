import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import emailjs from "@emailjs/browser";
import {
  Send,
  Mail,
  MapPin,
  Phone,
  Github,
  Linkedin,
  Twitter,
  Instagram,
  CheckCircle,
  Loader2,
  AlertCircle,
} from "lucide-react";

// EmailJS Configuration
// You need to set up these values from your EmailJS dashboard
const EMAILJS_SERVICE_ID = "service_dkk1asz"; // Replace with your service ID
const EMAILJS_TEMPLATE_ID = "template_ao0p43b"; // Replace with your template ID
const EMAILJS_PUBLIC_KEY = "8uA0tVo63kZOfNo3H"; // Replace with your public key

const socialLinks = [
  {
    name: "GitHub",
    icon: Github,
    href: "https://github.com/cjstyles6",
    color: "#6e5494",
  },
  {
    name: "LinkedIn",
    icon: Linkedin,
    href: "https://www.linkedin.com/in/chijioke-anazodo-b86ab9258/",
    color: "#0077b5",
  },
  {
    name: "Twitter",
    icon: Twitter,
    href: "https://x.com/Cee_Jsxd1",
    color: "#1da1f2",
  },
  {
    name: "Instagram",
    icon: Instagram,
    href: "https://www.instagram.com/cench_jnr/",
    color: "#e4405f",
  },
];

const contactInfo = [
  {
    icon: Mail,
    label: "Email",
    value: "chijiokeanazodo2020@gmail.com",
    href: "mailto:chijiokeanazodo2020@gmail.com",
  },
  {
    icon: Phone,
    label: "Phone",
    value: "+234 708 192 9198",
    href: "tel:+2347081929198",
  },
  {
    icon: MapPin,
    label: "Location",
    value: "Anambra, Nigeria",
    href: "https://maps.app.goo.gl/rX78Z",
  },
];

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState(null);
  const [focusedField, setFocusedField] = useState(null);

  const containerRef = useRef(null);
  const formRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      // Send email using EmailJS
      const result = await emailjs.sendForm(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        formRef.current,
        EMAILJS_PUBLIC_KEY
      );

      if (result.status === 200) {
        setIsSubmitted(true);
        setFormData({ name: "", email: "", subject: "", message: "" });

        // Reset success message after 5 seconds
        setTimeout(() => setIsSubmitted(false), 5000);
      }
    } catch (err) {
      console.error("EmailJS Error:", err);
      setError(
        "Failed to send message. Please try again or email me directly."
      );
      // Reset error after 5 seconds
      setTimeout(() => setError(null), 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClasses = (fieldName) => `
    w-full px-5 py-4 bg-white/5 border rounded-xl text-white placeholder-gray-500
    focus:outline-none transition-all duration-300
    ${
      focusedField === fieldName
        ? "border-[#3ABEFF] shadow-lg shadow-[#3ABEFF]/10"
        : "border-white/10 hover:border-white/20"
    }
  `;

  return (
    <section
      ref={containerRef}
      id="contact"
      className="relative py-20 md:py-32 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-[#050505] to-black" />

      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#3ABEFF]/30 to-transparent" />
      <motion.div
        className="absolute top-1/3 right-0 w-64 md:w-96 h-64 md:h-96 bg-[#3ABEFF]/5 rounded-full blur-3xl"
        animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 10, repeat: Infinity }}
      />
      <motion.div
        className="absolute bottom-1/4 left-0 w-56 md:w-80 h-56 md:h-80 bg-[#00d4ff]/5 rounded-full blur-3xl"
        animate={{ scale: [1.2, 1, 1.2], opacity: [0.2, 0.4, 0.2] }}
        transition={{ duration: 12, repeat: Infinity }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          className="text-center mb-12 md:mb-16"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <motion.span
            className="inline-block px-4 py-2 rounded-full glass text-[#3ABEFF] text-sm font-medium mb-6"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.2 }}
          >
            <Mail size={14} className="inline mr-2" />
            Get In Touch
          </motion.span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            <span className="text-white">Let's Build </span>
            <span className="gradient-text">Something Amazing</span>
          </h2>
          <p className="text-gray-400 text-base md:text-lg max-w-2xl mx-auto">
            Have a project in mind? Let's collaborate and bring your vision to
            life. I'm always open to discussing new opportunities.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 md:gap-12">
          {/* Contact Info */}
          <motion.div
            className="lg:col-span-2 space-y-8"
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            {/* Info Cards */}
            <div className="space-y-4">
              {contactInfo.map((item, index) => {
                const Icon = item.icon;
                return (
                  <motion.a
                    key={item.label}
                    href={item.href}
                    className="flex items-center gap-4 p-5 glass rounded-xl hover:border-[#3ABEFF]/30 transition-all duration-300 group"
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.4 + index * 0.1 }}
                    whileHover={{ x: 5 }}
                  >
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#3ABEFF]/20 to-[#00d4ff]/10 flex items-center justify-center group-hover:from-[#3ABEFF]/30 group-hover:to-[#00d4ff]/20 transition-all">
                      <Icon size={22} className="text-[#3ABEFF]" />
                    </div>
                    <div>
                      <p className="text-gray-500 text-sm">{item.label}</p>
                      <p className="text-white font-medium group-hover:text-[#3ABEFF] transition-colors">
                        {item.value}
                      </p>
                    </div>
                  </motion.a>
                );
              })}
            </div>

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.7 }}
            >
              <h3 className="text-lg font-semibold text-white mb-4">
                Connect with me
              </h3>
              <div className="flex gap-4">
                {socialLinks.map((social, index) => {
                  const Icon = social.icon;
                  return (
                    <motion.a
                      key={social.name}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-12 h-12 glass rounded-xl flex items-center justify-center text-gray-400 hover:text-white transition-all duration-300 group"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={isInView ? { opacity: 1, scale: 1 } : {}}
                      transition={{ delay: 0.8 + index * 0.1 }}
                      whileHover={{
                        y: -5,
                        backgroundColor: `${social.color}20`,
                        borderColor: `${social.color}50`,
                      }}
                    >
                      <Icon
                        size={20}
                        className="group-hover:text-[#3ABEFF] transition-colors"
                      />
                    </motion.a>
                  );
                })}
              </div>
            </motion.div>

            {/* Availability Status */}
            <motion.div
              className="p-5 glass rounded-xl"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.9 }}
            >
              <div className="flex items-center gap-3 mb-2">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                </span>
                <span className="text-green-400 font-medium">
                  Available for work
                </span>
              </div>
              <p className="text-gray-500 text-sm">
                Currently accepting new projects and freelance opportunities.
              </p>
            </motion.div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            className="lg:col-span-3"
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            <form
              ref={formRef}
              onSubmit={handleSubmit}
              className="glass rounded-2xl p-8"
            >
              {/* Error Message */}
              {error && (
                <motion.div
                  className="flex items-center gap-3 p-4 mb-6 rounded-xl bg-red-500/10 border border-red-500/30"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <AlertCircle
                    size={20}
                    className="text-red-500 flex-shrink-0"
                  />
                  <p className="text-red-400 text-sm">{error}</p>
                </motion.div>
              )}

              {isSubmitted ? (
                <motion.div
                  className="flex flex-col items-center justify-center py-12 text-center"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                >
                  <motion.div
                    className="w-20 h-20 rounded-full bg-green-500/20 flex items-center justify-center mb-6"
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 0.5 }}
                  >
                    <CheckCircle size={40} className="text-green-500" />
                  </motion.div>
                  <h3 className="text-2xl font-bold text-white mb-2">
                    Message Sent!
                  </h3>
                  <p className="text-gray-400">
                    Thank you for reaching out. I'll get back to you soon!
                  </p>
                </motion.div>
              ) : (
                <div className="space-y-6">
                  {/* Name & Email Row */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-2">
                        Your Name
                      </label>
                      <motion.input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        onFocus={() => setFocusedField("name")}
                        onBlur={() => setFocusedField(null)}
                        placeholder="John Doe"
                        required
                        className={inputClasses("name")}
                        whileFocus={{ scale: 1.01 }}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-2">
                        Your Email
                      </label>
                      <motion.input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        onFocus={() => setFocusedField("email")}
                        onBlur={() => setFocusedField(null)}
                        placeholder="john@example.com"
                        required
                        className={inputClasses("email")}
                        whileFocus={{ scale: 1.01 }}
                      />
                    </div>
                  </div>

                  {/* Subject */}
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">
                      Subject
                    </label>
                    <motion.input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      onFocus={() => setFocusedField("subject")}
                      onBlur={() => setFocusedField(null)}
                      placeholder="Project Inquiry"
                      required
                      className={inputClasses("subject")}
                      whileFocus={{ scale: 1.01 }}
                    />
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">
                      Message
                    </label>
                    <motion.textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      onFocus={() => setFocusedField("message")}
                      onBlur={() => setFocusedField(null)}
                      placeholder="Tell me about your project..."
                      rows={5}
                      required
                      className={`${inputClasses("message")} resize-none`}
                      whileFocus={{ scale: 1.01 }}
                    />
                  </div>

                  {/* Submit Button */}
                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 bg-gradient-to-r from-[#3ABEFF] to-[#00d4ff] text-black font-semibold rounded-xl hover:shadow-lg hover:shadow-[#3ABEFF]/30 transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                    whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                    whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 size={20} className="animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send size={20} />
                        Send Message
                      </>
                    )}
                  </motion.button>
                </div>
              )}
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
