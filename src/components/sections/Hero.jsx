import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  ArrowDown,
  Code2,
  Smartphone,
  Layers,
  ChevronRight,
} from "lucide-react";

// Profile Image Component with stylish frame
const ProfileImage = () => {
  return (
    <motion.div
      className="relative mx-auto"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 2.8, duration: 0.8, ease: "easeOut" }}
    >
      {/* Decorative rotating ring */}
      <motion.div
        className="absolute -inset-4 md:-inset-6 rounded-full border-2 border-dashed border-[#3ABEFF]/30"
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      />

      {/* Outer glow */}
      <div className="absolute -inset-2 bg-gradient-to-br from-[#3ABEFF]/20 to-[#00d4ff]/20 rounded-full blur-2xl" />

      {/* Image container */}
      <motion.div
        className="relative w-[280px] h-[350px] sm:w-[320px] sm:h-[400px] md:w-[380px] md:h-[480px] rounded-[2rem] overflow-hidden"
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.3 }}
      >
        {/* Border frame */}
        <div className="absolute inset-0 rounded-[2rem] border-2 border-[#3ABEFF]/50 z-10" />

        {/* Gradient overlay on image */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent z-10" />
        <div className="absolute inset-0 bg-gradient-to-br from-[#3ABEFF]/10 to-transparent z-10" />

        {/* The actual image */}
        <img
          src="/images/hero-profile.jpg"
          alt="Chijioke - Mobile & Web Developer"
          className="w-full h-full object-cover object-top"
        />

        {/* Bottom accent bar */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[#3ABEFF] to-[#00d4ff] z-20"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 3.5, duration: 0.8 }}
        />
      </motion.div>

      {/* Floating badge */}
      <motion.div
        className="absolute -bottom-4 -right-4 md:-right-6 px-4 py-2 glass rounded-full text-sm font-medium text-[#3ABEFF] border border-[#3ABEFF]/30 z-20"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 3.8, duration: 0.5 }}
      >
        <span className="flex items-center gap-2">
          <Code2 size={16} />
          Developer
        </span>
      </motion.div>

      {/* Decorative dots */}
      <motion.div
        className="absolute -top-2 -left-2 md:-top-4 md:-left-4 grid grid-cols-3 gap-1"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3.2 }}
      >
        {[...Array(9)].map((_, i) => (
          <div key={i} className="w-1.5 h-1.5 rounded-full bg-[#3ABEFF]/40" />
        ))}
      </motion.div>
    </motion.div>
  );
};

const Hero = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  const textVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: 2.5 + i * 0.1,
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    }),
  };

  const floatingIcons = [
    { Icon: Code2, position: "top-1/4 left-[5%] md:left-[10%]", delay: 3 },
    {
      Icon: Smartphone,
      position: "top-1/3 right-[5%] md:right-[15%]",
      delay: 3.2,
    },
    {
      Icon: Layers,
      position: "bottom-1/3 left-[8%] md:left-[20%]",
      delay: 3.4,
    },
  ];

  return (
    <section
      ref={containerRef}
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 pb-10"
    >
      {/* Gradient Overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black z-[1]" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-black/50 z-[1]" />

      {/* Animated Grid Lines */}
      <div className="absolute inset-0 z-0 opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `linear-gradient(rgba(58, 190, 255, 0.1) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(58, 190, 255, 0.1) 1px, transparent 1px)`,
            backgroundSize: "50px 50px",
          }}
        />
      </div>

      {/* Floating Icons */}
      {floatingIcons.map(({ Icon, position, delay }, index) => (
        <motion.div
          key={index}
          className={`absolute ${position} z-[2] hidden md:block`}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 0.3, scale: 1 }}
          transition={{ delay, duration: 0.5 }}
        >
          <motion.div
            animate={{
              y: [0, -15, 0],
              rotate: [0, 5, -5, 0],
            }}
            transition={{
              duration: 4 + index,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <Icon size={36} className="text-[#3ABEFF]/40" />
          </motion.div>
        </motion.div>
      ))}

      {/* Main Content */}
      <motion.div
        className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
        style={{ y, opacity }}
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left Side - Text Content */}
          <div className="text-center lg:text-left order-2 lg:order-1">
            {/* Main Heading */}
            <motion.h1
              custom={1}
              variants={textVariants}
              initial="hidden"
              animate="visible"
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-4"
            >
              <span className="block text-white">Hello, I'm</span>
              <span className="block mt-2">
                <span className="gradient-text">Chijioke</span>
              </span>
            </motion.h1>

            {/* Role */}
            <motion.div
              custom={2}
              variants={textVariants}
              initial="hidden"
              animate="visible"
              className="mb-6"
            >
              <p className="text-lg sm:text-xl md:text-2xl text-gray-300 font-light">
                <span className="text-[#3ABEFF]">Mobile App</span> &{" "}
                <span className="text-[#3ABEFF]">Web Developer</span>
              </p>
            </motion.div>

            {/* Availability Badge - New Position */}
            <motion.div
              custom={2.5}
              variants={textVariants}
              initial="hidden"
              animate="visible"
              className="mb-6"
            >
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-sm text-gray-400">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                </span>
                Available for new projects
              </span>
            </motion.div>

            {/* Description */}
            <motion.p
              custom={3}
              variants={textVariants}
              initial="hidden"
              animate="visible"
              className="text-gray-400 text-base sm:text-lg max-w-xl mx-auto lg:mx-0 mb-8 leading-relaxed"
            >
              Creating thoughtful, high-performance experiences across web and
              mobile.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              custom={4}
              variants={textVariants}
              initial="hidden"
              animate="visible"
              className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4"
            >
              <motion.a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  document
                    .querySelector("#contact")
                    ?.scrollIntoView({ behavior: "smooth" });
                }}
                className="group relative px-8 py-4 bg-gradient-to-r from-[#3ABEFF] to-[#00d4ff] text-black font-semibold rounded-full overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-[#3ABEFF]/30 w-full sm:w-auto text-center"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  Hire Me
                  <ChevronRight size={18} />
                </span>
              </motion.a>

              <motion.a
                href="#projects"
                onClick={(e) => {
                  e.preventDefault();
                  document
                    .querySelector("#projects")
                    ?.scrollIntoView({ behavior: "smooth" });
                }}
                className="group px-8 py-4 border border-[#3ABEFF]/50 text-[#3ABEFF] font-semibold rounded-full transition-all duration-300 hover:border-[#3ABEFF] hover:bg-[#3ABEFF]/10 w-full sm:w-auto text-center"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                View Projects
              </motion.a>
            </motion.div>

            {/* Tech Stack Preview */}
            <motion.div
              custom={5}
              variants={textVariants}
              initial="hidden"
              animate="visible"
              className="mt-10 flex items-center justify-center lg:justify-start gap-4 sm:gap-6 flex-wrap"
            >
              <span className="text-gray-500 text-xs sm:text-sm uppercase tracking-widest">
                Tech Stack
              </span>
              <div className="flex items-center gap-4 sm:gap-6">
                {["Flutter", "React", "Tailwind", "Firebase"].map(
                  (tech, index) => (
                    <motion.span
                      key={tech}
                      className="text-gray-400 text-xs sm:text-sm font-medium hover:text-[#3ABEFF] transition-colors cursor-default"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 3.5 + index * 0.1 }}
                    >
                      {tech}
                    </motion.span>
                  )
                )}
              </div>
            </motion.div>
          </div>

          {/* Right Side - Profile Image */}
          <div className="order-1 lg:order-2 flex justify-center lg:justify-end">
            <ProfileImage />
          </div>
        </div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 4, duration: 0.5 }}
      >
        <motion.a
          href="#about"
          onClick={(e) => {
            e.preventDefault();
            document
              .querySelector("#about")
              ?.scrollIntoView({ behavior: "smooth" });
          }}
          className="flex flex-col items-center gap-2 text-gray-500 hover:text-[#3ABEFF] transition-colors"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <span className="text-xs uppercase tracking-widest">Scroll</span>
          <ArrowDown size={20} />
        </motion.a>
      </motion.div>

      {/* Corner Accents - Hidden on mobile */}
      <div className="absolute top-20 left-4 md:left-8 w-12 md:w-20 h-12 md:h-20 border-l-2 border-t-2 border-[#3ABEFF]/20 z-[1] hidden sm:block" />
      <div className="absolute top-20 right-4 md:right-8 w-12 md:w-20 h-12 md:h-20 border-r-2 border-t-2 border-[#3ABEFF]/20 z-[1] hidden sm:block" />
      <div className="absolute bottom-20 left-4 md:left-8 w-12 md:w-20 h-12 md:h-20 border-l-2 border-b-2 border-[#3ABEFF]/20 z-[1] hidden sm:block" />
      <div className="absolute bottom-20 right-4 md:right-8 w-12 md:w-20 h-12 md:h-20 border-r-2 border-b-2 border-[#3ABEFF]/20 z-[1] hidden sm:block" />
    </section>
  );
};

export default Hero;
