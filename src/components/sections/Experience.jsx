import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import {
  Award,
  Trophy,
  Star,
  Calendar,
  MapPin,
  ExternalLink,
  X,
  Image,
} from "lucide-react";

const experiences = [
  {
    id: 1,
    type: "Intern",
    title: "Mobile App Developer Intern",
    company: "Nnewi Tech Faculty",
    location: "Anambra, Nigeria",
    period: "2024",
    description:
      "Contributed to the development and maintenance of a city focused mobile application using Flutter. Worked on implementing core features, improving UI responsiveness, and integrating backend services. Collaborated with senior developers to fix bugs, optimize performance, and follow industry best practices while gaining hands on experience in real world mobile app development.",
    technologies: [
      "Flutter",
      "Dart",
      "Firebase",
      "Supabase",
      "REST APIs",
      "Git",
      "Figma",
      "State Management",
    ],
  },

  {
    id: 2,
    type: "Intern",
    title: "Senior Mobile Developer Intern",
    company: "ICE Innovation Hub",
    location: "Anambra, Nigeria",
    period: "2025",
    description:
      "Led the development of a company food delivery mobile application, taking ownership of core features, architecture decisions, and overall code quality. Acted as the lead developer on the project while mentoring and tutoring junior interns and students in Flutter and mobile development fundamentals. Worked closely with designers and product stakeholders to translate requirements into scalable, user friendly solutions.",
    technologies: [
      "Flutter",
      "Dart",
      "Firebase",
      "REST APIs",
      "Git",
      "Figma",
      "State Management",
    ],
  },
  {
    id: 3,
    type: "hackathon",
    title: "Mobile App Developer",
    company: "Solution Innovation District",
    location: "Anambra, Nigeria",
    period: "2025",
    description:
      "Participated in a competitive hackathon where our team built 'Well Point', a digital product aimed at solving a real-world problem within a limited timeframe. Served as the mobile app developer, implementing core application features, UI flows, and backend integrations. The project earned 2nd Runner-Up, recognized for innovation, usability, and technical execution.",
    technologies: ["Flutter", "Dart", "Firebase", "REST APIs", "Git"],
  },
];

const achievements = [
  {
    id: 1,
    icon: Trophy,
    title: "Hackathon Winner",
    organization: "Solution Innovation District",
    year: "2025",
    description:
      "2nd Runner Up in a 72 hours competitive hackathon for developing 'Well Point'",
  },
  {
    id: 2,
    icon: Award,
    title: "JavaScript Developer Certification",
    organization: "HackerRank",
    year: "2024",
    description: "Professional certification in JavaScript development",
    certificateImage: "/images/certificate-2.jpg",
  },
  {
    id: 3,
    icon: Star,
    title: "Lead Mobile Developer Recognition",
    organization: "ICE Innovation Hub",
    year: "2025",
    description:
      "Recognized for leading the development of a production-ready food delivery mobile application and mentoring junior interns.",
  },
  {
    id: 4,
    icon: Award,
    title: "React Developer Certification",
    organization: "Testdome",
    year: "2024",
    description: "Foundation certification in core React development skills",
    certificateImage: "/images/certificate-1.jpg",
  },
];

const Experience = () => {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });
  const [selectedCertificate, setSelectedCertificate] = useState(null);

  return (
    <section
      ref={containerRef}
      id="experience"
      className="relative py-20 md:py-32 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-[#0a0a0a] to-black" />

      {/* Decorative Orbs */}
      <motion.div
        className="absolute top-1/4 left-0 w-64 md:w-96 h-64 md:h-96 bg-[#3ABEFF]/5 rounded-full blur-3xl"
        animate={{ x: [0, 50, 0], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 15, repeat: Infinity }}
      />
      <motion.div
        className="absolute bottom-1/4 right-0 w-56 md:w-80 h-56 md:h-80 bg-[#00d4ff]/5 rounded-full blur-3xl"
        animate={{ x: [0, -50, 0], opacity: [0.2, 0.4, 0.2] }}
        transition={{ duration: 12, repeat: Infinity }}
      />

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
            <Award size={14} className="inline mr-2" />
            Experience & Achievements
          </motion.span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            <span className="text-white">Professional </span>
            <span className="gradient-text">Journey</span>
          </h2>
          <p className="text-gray-400 text-base md:text-lg max-w-2xl mx-auto">
            A timeline of my career milestones, certifications, and notable
            achievements that have shaped my expertise.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-16">
          {/* Work Experience */}
          <div>
            <motion.h3
              className="text-2xl font-bold text-white mb-8 flex items-center gap-3"
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.3 }}
            >
              <span className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#3ABEFF]/20 to-[#00d4ff]/10 flex items-center justify-center">
                <Calendar size={20} className="text-[#3ABEFF]" />
              </span>
              Work Experience
            </motion.h3>

            <div className="relative">
              {/* Timeline Line */}
              <div className="absolute left-[19px] top-0 bottom-0 w-[2px] bg-gradient-to-b from-[#3ABEFF] via-[#3ABEFF]/50 to-transparent" />

              {/* Experience Items */}
              <div className="space-y-8">
                {experiences.map((exp, index) => (
                  <motion.div
                    key={exp.id}
                    className="relative pl-12"
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.2 }}
                  >
                    {/* Timeline Dot */}
                    <div className="absolute left-0 w-10 h-10 rounded-full glass border-2 border-[#3ABEFF]/50 flex items-center justify-center bg-black">
                      <div className="w-3 h-3 rounded-full bg-[#3ABEFF]" />
                    </div>

                    {/* Content Card */}
                    <motion.div
                      className="glass rounded-xl p-6 hover:border-[#3ABEFF]/30 transition-all duration-300"
                      whileHover={{ x: 5 }}
                    >
                      <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                        <span className="text-[#3ABEFF] text-sm font-medium">
                          {exp.period}
                        </span>
                        <span className="flex items-center gap-1 text-gray-500 text-xs">
                          <MapPin size={12} />
                          {exp.location}
                        </span>
                      </div>
                      <h4 className="text-xl font-bold text-white mb-1">
                        {exp.title}
                      </h4>
                      <p className="text-gray-400 text-sm mb-3">
                        {exp.company}
                      </p>
                      <p className="text-gray-500 text-sm mb-4">
                        {exp.description}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {exp.technologies.map((tech) => (
                          <span
                            key={tech}
                            className="px-2 py-1 text-xs rounded-md bg-[#3ABEFF]/10 text-[#3ABEFF]"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </motion.div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Achievements */}
          <div>
            <motion.h3
              className="text-2xl font-bold text-white mb-8 flex items-center gap-3"
              initial={{ opacity: 0, x: 20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.3 }}
            >
              <span className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#3ABEFF]/20 to-[#00d4ff]/10 flex items-center justify-center">
                <Trophy size={20} className="text-[#3ABEFF]" />
              </span>
              Achievements & Certifications
            </motion.h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {achievements.map((achievement, index) => {
                const Icon = achievement.icon;
                return (
                  <motion.div
                    key={achievement.id}
                    className="glass rounded-xl p-6 hover:border-[#3ABEFF]/30 transition-all duration-300 group"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.15 }}
                    whileHover={{ y: -5 }}
                  >
                    {/* Icon */}
                    <motion.div
                      className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#3ABEFF]/20 to-[#00d4ff]/10 flex items-center justify-center mb-4 group-hover:from-[#3ABEFF]/30 group-hover:to-[#00d4ff]/20 transition-all"
                      whileHover={{ rotate: 5, scale: 1.1 }}
                    >
                      <Icon size={24} className="text-[#3ABEFF]" />
                    </motion.div>

                    {/* Content */}
                    <span className="text-[#3ABEFF] text-sm font-medium">
                      {achievement.year}
                    </span>
                    <h4 className="text-lg font-bold text-white mt-1 mb-1 group-hover:text-[#3ABEFF] transition-colors">
                      {achievement.title}
                    </h4>
                    <p className="text-gray-400 text-sm mb-2">
                      {achievement.organization}
                    </p>
                    <p className="text-gray-500 text-xs">
                      {achievement.description}
                    </p>

                    {/* Certificate Image Preview */}
                    {achievement.certificateImage && (
                      <motion.button
                        onClick={() => setSelectedCertificate(achievement)}
                        className="mt-4 w-full relative overflow-hidden rounded-lg border border-[#3ABEFF]/20 hover:border-[#3ABEFF]/50 transition-all cursor-pointer group/img"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <img
                          src={achievement.certificateImage}
                          alt={`${achievement.title} certificate`}
                          className="w-full h-24 object-cover opacity-80 group-hover/img:opacity-100 transition-opacity"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end justify-center pb-2">
                          <span className="flex items-center gap-1 text-xs text-white/80">
                            <Image size={12} />
                            View Certificate
                          </span>
                        </div>
                      </motion.button>
                    )}
                  </motion.div>
                );
              })}
            </div>

            {/* Resume CTA */}
            <motion.div
              className="mt-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
            >
              <motion.a
                href="/Chijioke-Anazodo-Resume.pdf"
                download="Chijioke-Anazodo-Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 glass rounded-full text-[#3ABEFF] font-medium hover:bg-[#3ABEFF]/10 transition-all group"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <ExternalLink size={18} />
                Download Full Resume
                <span className="group-hover:translate-x-1 transition-transform">
                  →
                </span>
              </motion.a>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Certificate Modal */}
      <AnimatePresence>
        {selectedCertificate && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedCertificate(null)}
          >
            <motion.div
              className="relative max-w-4xl w-full glass rounded-2xl overflow-hidden"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", damping: 25 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between p-4 border-b border-white/10">
                <div>
                  <h3 className="text-lg font-bold text-white">
                    {selectedCertificate.title}
                  </h3>
                  <p className="text-sm text-gray-400">
                    {selectedCertificate.organization} •{" "}
                    {selectedCertificate.year}
                  </p>
                </div>
                <button
                  onClick={() => setSelectedCertificate(null)}
                  className="w-10 h-10 rounded-full glass flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 transition-all"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Certificate Image */}
              <div className="p-4">
                <img
                  src={selectedCertificate.certificateImage}
                  alt={`${selectedCertificate.title} certificate`}
                  className="w-full h-auto rounded-lg"
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Experience;
