import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  Smartphone,
  Globe,
  Wrench,
  Database,
  Cloud,
  Palette,
  Terminal,
  GitBranch,
  Container,
  Flame,
  Zap,
  Target,
  Link,
  Code2,
  Heart,
  Gem,
  Paintbrush,
  Package,
  Monitor,
  Ship,
  Send,
  Star,
  Workflow,
} from "lucide-react";

const skillCategories = [
  {
    title: "Mobile Development",
    icon: Smartphone,
    description: "Building cross-platform mobile experiences",
    skills: [
      { name: "Flutter", icon: Gem, proficiency: "expert" },
      { name: "Dart", icon: Target, proficiency: "expert" },
      { name: "Supabase", icon: Zap, proficiency: "expert" },
      { name: "Firebase", icon: Flame, proficiency: "expert" },
      { name: "REST APIs", icon: Link, proficiency: "expert" },
    ],
  },
  {
    title: "Web Development",
    icon: Globe,
    description: "Creating modern, responsive web applications",
    skills: [
      { name: "React", icon: Code2, proficiency: "intermediate" },
      { name: "JavaScript", icon: Heart, proficiency: "advanced" },
      { name: "Tailwind CSS", icon: Paintbrush, proficiency: "expert" },
    ],
  },
  {
    title: "Tools & Technologies",
    icon: Wrench,
    description: "The arsenal that powers my workflow",
    skills: [
      { name: "Git", icon: Package, proficiency: "expert" },
      { name: "VS Code", icon: Monitor, proficiency: "expert" },
      { name: "Docker", icon: Ship, proficiency: "intermediate" },
      { name: "Figma", icon: Palette, proficiency: "advanced" },
      { name: "Postman", icon: Send, proficiency: "advanced" },
    ],
  },
];

const additionalSkills = [
  { name: "Express JS", icon: Terminal },
  { name: "PostgreSQL", icon: Database },
  { name: "Serverpod", icon: Cloud },
  { name: "UI/UX Design", icon: Palette },
  { name: "Git Workflows", icon: GitBranch },
  { name: "State Management", icon: Workflow },
  { name: "Responsive Design", icon: Flame },
];

// Proficiency indicator with dots instead of percentages
const ProficiencyIndicator = ({ proficiency }) => {
  const levels = {
    beginner: 1,
    intermediate: 2,
    advanced: 3,
    expert: 4,
  };

  const filledDots = levels[proficiency] || 2;
  const totalDots = 4;

  return (
    <div className="flex items-center gap-1">
      {[...Array(totalDots)].map((_, i) => (
        <motion.div
          key={i}
          className={`w-2 h-2 rounded-full ${
            i < filledDots
              ? "bg-gradient-to-r from-[#3ABEFF] to-[#00d4ff]"
              : "bg-gray-700"
          }`}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: i * 0.1 }}
        />
      ))}
      <span className="ml-2 text-xs text-gray-500 capitalize">
        {proficiency}
      </span>
    </div>
  );
};

const SkillItem = ({ skill, index, isInView }) => {
  const Icon = skill.icon;

  return (
    <motion.div
      className="group flex items-center justify-between py-3 px-4 rounded-xl hover:bg-white/5 transition-all duration-300"
      initial={{ opacity: 0, x: -20 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ delay: index * 0.1 }}
    >
      <div className="flex items-center gap-3">
        <motion.div
          className="w-8 h-8 rounded-lg bg-[#3ABEFF]/10 flex items-center justify-center group-hover:bg-[#3ABEFF]/20 transition-colors"
          whileHover={{ rotate: 5 }}
        >
          <Icon size={16} className="text-[#3ABEFF]" />
        </motion.div>
        <span className="text-gray-300 group-hover:text-white transition-colors font-medium">
          {skill.name}
        </span>
      </div>
      <ProficiencyIndicator proficiency={skill.proficiency} />
    </motion.div>
  );
};

const Skills = () => {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  return (
    <section
      ref={containerRef}
      id="skills"
      className="relative py-20 md:py-32 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-[#050505] to-black" />

      {/* Floating Orbs */}
      <motion.div
        className="absolute top-20 right-10 md:right-20 w-48 md:w-72 h-48 md:h-72 bg-[#3ABEFF]/10 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{ duration: 8, repeat: Infinity }}
      />
      <motion.div
        className="absolute bottom-40 left-5 md:left-10 w-64 md:w-96 h-64 md:h-96 bg-[#00d4ff]/5 rounded-full blur-3xl"
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{ duration: 10, repeat: Infinity }}
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
            <Star size={14} className="inline mr-2" />
            Skills & Expertise
          </motion.span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            <span className="text-white">My </span>
            <span className="gradient-text">Tech Arsenal</span>
          </h2>
          <p className="text-gray-400 text-base md:text-lg max-w-2xl mx-auto">
            A carefully curated set of technologies and tools that I use to
            bring ideas to life—from mobile apps to web experiences.
          </p>
        </motion.div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-16 md:mb-20">
          {skillCategories.map((category, categoryIndex) => {
            const Icon = category.icon;
            return (
              <motion.div
                key={category.title}
                className="glass rounded-2xl p-6 md:p-8 hover:border-[#3ABEFF]/30 transition-all duration-500 group"
                initial={{ opacity: 0, y: 50 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: categoryIndex * 0.2 }}
                whileHover={{ y: -10 }}
              >
                {/* Category Header */}
                <div className="flex items-center gap-4 mb-6">
                  <motion.div
                    className="w-12 md:w-14 h-12 md:h-14 rounded-xl bg-gradient-to-br from-[#3ABEFF]/20 to-[#00d4ff]/10 flex items-center justify-center group-hover:from-[#3ABEFF]/30 group-hover:to-[#00d4ff]/20 transition-all duration-300"
                    whileHover={{ rotate: 5, scale: 1.1 }}
                  >
                    <Icon size={24} className="text-[#3ABEFF]" />
                  </motion.div>
                  <div>
                    <h3 className="text-lg md:text-xl font-bold text-white group-hover:text-[#3ABEFF] transition-colors">
                      {category.title}
                    </h3>
                    <p className="text-gray-500 text-xs md:text-sm">
                      {category.description}
                    </p>
                  </div>
                </div>

                {/* Skills List */}
                <div className="space-y-1">
                  {category.skills.map((skill, skillIndex) => (
                    <SkillItem
                      key={skill.name}
                      skill={skill}
                      index={skillIndex}
                      isInView={isInView}
                    />
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Additional Skills */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h3 className="text-lg md:text-xl font-semibold text-gray-300 mb-8">
            Also experienced with
          </h3>
          <div className="flex flex-wrap justify-center gap-3 md:gap-4">
            {additionalSkills.map((skill, index) => {
              const Icon = skill.icon;
              return (
                <motion.div
                  key={skill.name}
                  className="flex items-center gap-2 px-4 md:px-5 py-2 md:py-3 glass rounded-full hover:border-[#3ABEFF]/50 hover:bg-[#3ABEFF]/5 transition-all duration-300 cursor-default group"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ y: -3 }}
                >
                  <Icon
                    size={16}
                    className="text-[#3ABEFF] group-hover:text-[#00d4ff] transition-colors"
                  />
                  <span className="text-gray-400 group-hover:text-white transition-colors text-xs md:text-sm font-medium">
                    {skill.name}
                  </span>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Decorative Elements - Hidden on mobile */}
        <div className="absolute top-1/2 left-0 w-px h-32 bg-gradient-to-b from-transparent via-[#3ABEFF]/30 to-transparent hidden md:block" />
        <div className="absolute top-1/2 right-0 w-px h-32 bg-gradient-to-b from-transparent via-[#3ABEFF]/30 to-transparent hidden md:block" />
      </div>
    </section>
  );
};

export default Skills;
