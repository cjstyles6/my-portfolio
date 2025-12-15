import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import {
  Lightbulb,
  BookOpen,
  Rocket,
  Award,
  Zap,
  User,
  ChevronLeft,
  ChevronRight,
  MapPin,
  Calendar,
} from "lucide-react";

const journeySteps = [
  {
    id: 1,
    icon: Lightbulb,
    title: "Curiosity",
    year: "The Beginning",
    description:
      "It all started with a simple question: 'How do softwares work?' That spark of curiosity ignited a passion that would change everything.",
    color: "#3ABEFF",
  },
  {
    id: 2,
    icon: BookOpen,
    title: "Learning",
    year: "The Growth",
    description:
      "Countless tutorials, sleepless nights, and endless documentation. Every bug fixed was a lesson learned, every project a stepping stone.",
    color: "#00d4ff",
  },
  {
    id: 3,
    icon: Rocket,
    title: "Creating",
    year: "The Launch",
    description:
      "Taking ideas from concept to deployment, I’ve built apps and websites that each mark a step forward in my journey.",
    color: "#3ABEFF",
  },
  {
    id: 4,
    icon: Award,
    title: "Mastering",
    year: "The Craft",
    description:
      "Specializing in Flutter and Dart, I honed my skills to deliver exceptional mobile and web experiences that users love.",
    color: "#00d4ff",
  },
  {
    id: 5,
    icon: Zap,
    title: "Innovating",
    year: "The Future",
    description:
      "Now, I push boundaries daily exploring new technologies, solving complex problems, and creating solutions that make a difference.",
    color: "#3ABEFF",
  },
];

// Photo gallery data - your actual journey moments
const photos = [
  {
    id: 1,
    src: "/images/photo1.jpg",
    alt: "Chijioke at Anambra Startup Weekend - 2nd Runner Up",
    caption: "2nd Runner Up at Anambra Startup Weekend",
    location: "Anambra Startup Weekend",
    description: "Pitched, built, and competed — came out as 2nd Runner Up! 🏆",
  },
  {
    id: 2,
    src: "/images/photo2.jpg",
    alt: "Chijioke at The Pivot Conference",
    caption: "Networking with entrepreneurs & tech enthusiasts",
    location: "The Pivot Conference",
    description: "Connecting with like-minded innovators and industry leaders.",
  },
  {
    id: 3,
    src: "/images/photo3.jpg",
    alt: "Chijioke at Anambra Web3 2.0 Conference",
    caption: "Exploring the future of Web3",
    location: "Anambra Web3 2.0 Conference",
    description: "Diving deep into blockchain, crypto, and decentralized tech.",
  },
];

// Photo Gallery Component
const PhotoGallery = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextPhoto = () => {
    setCurrentIndex((prev) => (prev + 1) % photos.length);
  };

  const prevPhoto = () => {
    setCurrentIndex((prev) => (prev - 1 + photos.length) % photos.length);
  };

  return (
    <motion.div
      className="relative"
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
    >
      {/* Main Photo Container */}
      <div className="relative aspect-[4/5] max-w-md mx-auto rounded-3xl overflow-hidden glass p-2">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            className="relative w-full h-full rounded-2xl overflow-hidden"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.5 }}
          >
            <img
              src={photos[currentIndex].src}
              alt={photos[currentIndex].alt}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.src = `https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=500&fit=crop&auto=format`;
              }}
            />

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />

            {/* Caption */}
            <div className="absolute bottom-0 left-0 right-0 p-6">
              <p className="text-white font-bold text-lg md:text-xl mb-2">
                {photos[currentIndex].caption}
              </p>
              <p className="text-gray-300 text-sm mb-2">
                {photos[currentIndex].description}
              </p>
              <div className="flex items-center gap-2 text-[#3ABEFF] text-sm font-medium">
                <MapPin size={14} />
                {photos[currentIndex].location}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation Buttons */}
        <button
          onClick={prevPhoto}
          className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full glass flex items-center justify-center text-white hover:bg-[#3ABEFF]/20 transition-colors z-10"
        >
          <ChevronLeft size={20} />
        </button>
        <button
          onClick={nextPhoto}
          className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full glass flex items-center justify-center text-white hover:bg-[#3ABEFF]/20 transition-colors z-10"
        >
          <ChevronRight size={20} />
        </button>

        {/* Glow Effect */}
        <div className="absolute -inset-4 bg-[#3ABEFF]/10 rounded-3xl blur-2xl -z-10" />
      </div>

      {/* Photo Indicators */}
      <div className="flex justify-center gap-2 mt-6">
        {photos.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === currentIndex
                ? "w-8 bg-[#3ABEFF]"
                : "bg-gray-600 hover:bg-gray-500"
            }`}
          />
        ))}
      </div>

      {/* Thumbnail Preview */}
      <div className="flex justify-center gap-3 mt-4">
        {photos.map((photo, index) => (
          <motion.button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-16 h-16 rounded-xl overflow-hidden border-2 transition-all duration-300 ${
              index === currentIndex
                ? "border-[#3ABEFF] scale-110"
                : "border-transparent opacity-50 hover:opacity-80"
            }`}
            whileHover={{ scale: 1.1 }}
          >
            <img
              src={photo.src}
              alt={photo.alt}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.src = `https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=64&h=64&fit=crop&auto=format`;
              }}
            />
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
};

const About = () => {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  return (
    <section
      ref={containerRef}
      id="about"
      className="relative py-20 md:py-32 overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-[#0a0a0a] to-black" />
      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-64 md:w-96 h-64 md:h-96 bg-[#3ABEFF]/5 rounded-full blur-3xl" />
      <div className="absolute right-0 top-1/3 w-48 md:w-64 h-48 md:h-64 bg-[#00d4ff]/5 rounded-full blur-3xl" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          className="text-center mb-12 md:mb-20"
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
            <User size={14} className="inline mr-2" />
            My Journey
          </motion.span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            <span className="text-white">The Story </span>
            <span className="gradient-text">Behind the Code</span>
          </h2>
          <p className="text-gray-400 text-base md:text-lg max-w-2xl mx-auto">
            Every journey begins somewhere. Mine grew from curiosity into a
            passion for building meaningful digital experiences.
          </p>
        </motion.div>

        {/* Photo Gallery Section */}
        <div className="mb-20 md:mb-32">
          <motion.h3
            className="text-center text-xl md:text-2xl font-semibold text-white mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Moments from my journey
          </motion.h3>
          <PhotoGallery />
        </div>

        {/* Journey Timeline */}
        <div className="relative">
          {/* Timeline Line */}
          <motion.div
            className="absolute left-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-[#3ABEFF]/0 via-[#3ABEFF]/50 to-[#3ABEFF]/0 hidden lg:block"
            initial={{ scaleY: 0 }}
            animate={isInView ? { scaleY: 1 } : {}}
            transition={{ duration: 1.5, delay: 0.5 }}
            style={{ transformOrigin: "top" }}
          />

          {/* Mobile Timeline Line */}
          <motion.div
            className="absolute left-6 top-0 bottom-0 w-[2px] bg-gradient-to-b from-[#3ABEFF]/0 via-[#3ABEFF]/50 to-[#3ABEFF]/0 lg:hidden"
            initial={{ scaleY: 0 }}
            animate={isInView ? { scaleY: 1 } : {}}
            transition={{ duration: 1.5, delay: 0.5 }}
            style={{ transformOrigin: "top" }}
          />

          {/* Timeline Items */}
          <div className="space-y-8 lg:space-y-24">
            {journeySteps.map((step, index) => {
              const isEven = index % 2 === 0;
              const Icon = step.icon;

              return (
                <motion.div
                  key={step.id}
                  className={`relative flex flex-col lg:flex-row items-start lg:items-center gap-4 lg:gap-8 ${
                    isEven ? "lg:flex-row" : "lg:flex-row-reverse"
                  }`}
                  initial={{ opacity: 0, x: isEven ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                >
                  {/* Mobile Icon Node - positioned on the left */}
                  <motion.div
                    className="relative z-10 flex-shrink-0 flex items-center justify-center w-12 h-12 rounded-full glass border-2 border-[#3ABEFF]/50 group lg:hidden ml-0"
                    whileHover={{ scale: 1.2, borderColor: step.color }}
                    transition={{ duration: 0.3 }}
                  >
                    <Icon
                      size={20}
                      className="text-[#3ABEFF] group-hover:text-white transition-colors"
                    />
                  </motion.div>

                  {/* Content Card */}
                  <div
                    className={`flex-1 pl-8 lg:pl-0 ${
                      isEven ? "lg:text-right" : "lg:text-left"
                    }`}
                  >
                    <motion.div
                      className="glass rounded-2xl p-6 md:p-8 hover:border-[#3ABEFF]/30 transition-all duration-500 group"
                      whileHover={{ scale: 1.02, y: -5 }}
                    >
                      <span className="text-[#3ABEFF] text-xs md:text-sm font-medium tracking-wider uppercase">
                        {step.year}
                      </span>
                      <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mt-2 mb-3 md:mb-4 group-hover:text-[#3ABEFF] transition-colors">
                        {step.title}
                      </h3>
                      <p className="text-gray-400 text-sm md:text-base leading-relaxed">
                        {step.description}
                      </p>
                    </motion.div>
                  </div>

                  {/* Desktop Icon Node */}
                  <motion.div
                    className="relative z-10 hidden lg:flex items-center justify-center w-16 h-16 rounded-full glass border-2 border-[#3ABEFF]/50 group"
                    whileHover={{ scale: 1.2, borderColor: step.color }}
                    transition={{ duration: 0.3 }}
                  >
                    <Icon
                      size={28}
                      className="text-[#3ABEFF] group-hover:text-white transition-colors"
                    />
                    {/* Pulse Ring */}
                    <motion.div
                      className="absolute inset-0 rounded-full border border-[#3ABEFF]"
                      animate={{ scale: [1, 1.5, 1.5], opacity: [0.5, 0, 0] }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        delay: index * 0.3,
                      }}
                    />
                  </motion.div>

                  {/* Spacer for layout */}
                  <div className="flex-1 hidden lg:block" />
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Stats Section */}
        <motion.div
          className="mt-20 md:mt-32 grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          {[
            { number: "3+", label: "Years Experience" },
            { number: "20+", label: "Projects Completed" },
            { number: "10+", label: "Technologies Mastered" },
            { number: "∞", label: "Lines of Code" },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              className="text-center p-4 md:p-6 glass rounded-2xl hover:border-[#3ABEFF]/30 transition-all duration-300"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5 }}
            >
              <motion.span
                className="text-3xl sm:text-4xl md:text-5xl font-bold gradient-text"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 + index * 0.1 }}
              >
                {stat.number}
              </motion.span>
              <p className="text-gray-400 mt-2 text-xs md:text-sm">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default About;
