import { motion } from "framer-motion";
import { Heart, ArrowUp } from "lucide-react";

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative py-12 border-t border-white/5">
      {/* Background */}
      <div className="absolute inset-0 bg-black" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo & Copyright */}
          <div className="flex flex-col items-center md:items-start gap-2">
            <motion.a
              href="#hero"
              onClick={(e) => {
                e.preventDefault();
                scrollToTop();
              }}
              className="text-xl sm:text-2xl font-bold"
              whileHover={{ scale: 1.05 }}
            >
              <span className="gradient-text">Chiji</span>
              <span className="text-white">oke</span>
            </motion.a>
            <p className="text-gray-500 text-sm flex items-center gap-1">
              Made with{" "}
              <Heart size={14} className="text-red-500 fill-red-500" /> by
              Chijioke
            </p>
          </div>

          {/* Quick Links */}
          <div className="flex items-center gap-8 text-sm">
            {["Home", "About", "Projects", "Contact"].map((item) => (
              <motion.a
                key={item}
                href={`#${item.toLowerCase()}`}
                onClick={(e) => {
                  e.preventDefault();
                  document
                    .querySelector(
                      `#${
                        item.toLowerCase() === "home"
                          ? "hero"
                          : item.toLowerCase()
                      }`
                    )
                    ?.scrollIntoView({ behavior: "smooth" });
                }}
                className="text-gray-500 hover:text-[#3ABEFF] transition-colors"
                whileHover={{ y: -2 }}
              >
                {item}
              </motion.a>
            ))}
          </div>

          {/* Copyright & Back to Top */}
          <div className="flex items-center gap-4">
            <span className="text-gray-500 text-sm">
              © {currentYear} All rights reserved.
            </span>
            <motion.button
              onClick={scrollToTop}
              className="w-10 h-10 rounded-full glass flex items-center justify-center text-[#3ABEFF] hover:bg-[#3ABEFF]/10 transition-colors"
              whileHover={{ y: -3 }}
              whileTap={{ scale: 0.9 }}
            >
              <ArrowUp size={18} />
            </motion.button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
