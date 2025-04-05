"use client";
import { useState, useCallback, memo } from "react";
import { Mail, Phone, MapPin, Send, Github, Linkedin } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: "spring", stiffness: 300, damping: 24 },
  },
};

const socialIconVariants = {
  hidden: { scale: 0 },
  visible: (i) => ({
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 15,
      delay: 0.8 + i * 0.1,
    },
  }),
};

// Memoized contact info item component
const ContactInfoItem = memo(({ icon: Icon, label, value }) => (
  <motion.div className="flex items-center gap-3 group" variants={itemVariants} whileHover={{ x: 5 }}>
    <motion.div
      className="w-10 h-10 rounded-full bg-red-900 bg-opacity-50 flex items-center justify-center group-hover:bg-red-800 transition-colors"
      whileHover={{ scale: 1.1, rotate: 5 }}
      whileTap={{ scale: 0.9 }}
    >
      <Icon className="w-5 h-5 text-red-300" />
    </motion.div>
    <div>
      <p className="text-sm text-gray-400">{label}</p>
      <p className="text-lg group-hover:text-red-300 transition-colors">{value}</p>
    </div>
  </motion.div>
));

// Memoized social icon component
const SocialIcon = memo(({ href, icon: Icon, index, hoverColor, hoverBg }) => (
  <motion.a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center hover:bg-gray-600 transition-colors"
    custom={index}
    variants={socialIconVariants}
    whileHover={{
      scale: 1.2,
      backgroundColor: hoverBg,
      boxShadow: `0 0 10px ${hoverColor}`,
    }}
    whileTap={{ scale: 0.9 }}
  >
    <Icon className="w-5 h-5" />
  </motion.a>
));

// Memoized form input component
const FormInput = memo(({ id, label, type = "text", value, onChange, isFocused, onFocus, onBlur, rows }) => (
  <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: id === "name" ? 0.5 : id === "email" ? 0.6 : 0.7 }}>
    <label htmlFor={id} className="block text-sm font-medium mb-1">
      {label}
    </label>
    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
      {rows ? (
        <textarea
          id={id}
          name={id}
          value={value}
          onChange={onChange}
          onFocus={onFocus}
          onBlur={onBlur}
          required
          rows={rows}
          className={`w-full px-4 py-2 bg-gray-800 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent resize-none transition-all duration-300 ${
            isFocused ? "border-red-500" : "border-gray-600"
          }`}
        />
      ) : (
        <input
          type={type}
          id={id}
          name={id}
          value={value}
          onChange={onChange}
          onFocus={onFocus}
          onBlur={onBlur}
          required
          className={`w-full px-4 py-2 bg-gray-800 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-300 ${
            isFocused ? "border-red-500" : "border-gray-600"
          }`}
        />
      )}
    </motion.div>
  </motion.div>
));

function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [focusedField, setFocusedField] = useState(null);

  // Optimize form change handler with useCallback
  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }, []);

  // Optimize form submit handler with useCallback
  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    const timer = setTimeout(() => {
      setIsSubmitting(false);
      setSubmitStatus("success");

      // Reset form after successful submission
      setFormData({ name: "", email: "", message: "" });

      // Send the email to yourself after submission
      const mailto = `mailto:nickbprogramming@gmail.com?subject=Contact Form Submission&body=Name: ${formData.name}%0D%0AEmail: ${formData.email}%0D%0AMessage: ${formData.message}`;
      window.location.href = mailto;

      // Clear success message after 5 seconds
      const clearTimer = setTimeout(() => {
        setSubmitStatus(null);
      }, 5000);

      return () => clearTimeout(clearTimer);
    }, 1500);

    return () => clearTimeout(timer);
  }, [formData]);

  // Optimize focus handlers with useCallback
  const handleFocus = useCallback((field) => {
    setFocusedField(field);
  }, []);

  const handleBlur = useCallback(() => {
    setFocusedField(null);
  }, []);

  return (
    <motion.div className="text-white" variants={containerVariants} initial="hidden" animate="visible">
      <motion.h2 className="text-3xl font-bold text-red-300 mb-6" variants={itemVariants}>
        Contact Me
      </motion.h2>
      <div className="grid md:grid-cols-2 gap-8">
        <motion.div variants={itemVariants}>
          <motion.p className="text-lg mb-6" variants={itemVariants}>
            I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision. Feel
            free to reach out using the form or through my contact information.
          </motion.p>

          <div className="space-y-4 mb-6">
            <ContactInfoItem icon={Mail} label="Email - Preferred" value="nickbprogramming@gmail.com" />
            <ContactInfoItem icon={Phone} label="Phone" value="+1 (760) 468-4213" />
            <ContactInfoItem icon={MapPin} label="Location" value="Centennial, Colorado" />
          </div>

          <motion.div className="mt-8" variants={itemVariants}>
            <h3 className="text-xl font-semibold text-red-300 mb-4">Connect With Me</h3>
            <div className="flex gap-4">
              <SocialIcon href="https://github.com/NickBProgramming" icon={Github} index={0} hoverBg="#333" hoverColor="rgba(255, 255, 255, 0.3)" />
              <SocialIcon href="https://www.linkedin.com/in/nbprogramming/" icon={Linkedin} index={1} hoverBg="#0077b5" hoverColor="rgba(0, 119, 181, 0.5)" />
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          className="bg-gray-700 bg-opacity-50 p-6 rounded-xl"
          variants={itemVariants}
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.4 }}
        >
          <h3 className="text-xl font-semibold text-red-300 mb-4">Send Me a Message</h3>

          <form onSubmit={handleSubmit} className="space-y-4">
            <FormInput
              id="name"
              label="Name"
              value={formData.name}
              onChange={handleChange}
              isFocused={focusedField === "name"}
              onFocus={() => handleFocus("name")}
              onBlur={handleBlur}
            />

            <FormInput
              id="email"
              label="Email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              isFocused={focusedField === "email"}
              onFocus={() => handleFocus("email")}
              onBlur={handleBlur}
            />

            <FormInput
              id="message"
              label="Message"
              value={formData.message}
              onChange={handleChange}
              isFocused={focusedField === "message"}
              onFocus={() => handleFocus("message")}
              onBlur={handleBlur}
              rows={5}
            />

            <motion.button
              type="submit"
              disabled={isSubmitting}
              className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-red-500 to-red-400 hover:from-red-400 hover:to-red-500 text-white py-2 px-4 rounded-lg transition-all disabled:opacity-50"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {isSubmitting ? "Submitting..." : "Send Message"}
              <Send className="w-5 h-5" />
            </motion.button>
          </form>

          {submitStatus === "success" && (
            <motion.p className="mt-4 text-green-400" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
              Thank you for your message! I'll get back to you soon.
            </motion.p>
          )}
        </motion.div>
      </div>
    </motion.div>
  );
}

export default ContactSection;
