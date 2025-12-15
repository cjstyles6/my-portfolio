import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  ExternalLink,
  Github,
  Smartphone,
  Monitor,
  Search,
  Grid3X3,
  LayoutList,
  MousePointerClick,
} from "lucide-react";
import { projects } from "../data/projects";

const ProjectCard = ({ project, index, viewMode }) => {
  const cardRef = useRef(null);
  const isInView = useInView(cardRef, { once: true, margin: "-50px" });
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/project/${project.id}`);
  };

  if (viewMode === "list") {
    return (
      <motion.div
        ref={cardRef}
        className="group"
        initial={{ opacity: 0, x: -50 }}
        animate={isInView ? { opacity: 1, x: 0 } : {}}
        transition={{ delay: index * 0.05, duration: 0.5 }}
      >
        <motion.div
          className="glass rounded-2xl overflow-hidden cursor-pointer flex flex-col md:flex-row"
          onClick={handleClick}
          whileHover={{ x: 10 }}
          transition={{ duration: 0.3 }}
        >
          {/* Image - Fixed height container with object-cover */}
          <div className="relative w-full md:w-72 h-48 flex-shrink-0 overflow-hidden">
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black/50 md:block hidden" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent md:hidden" />

            {/* Category Badge */}
            <div className="absolute top-4 left-4">
              <span
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium backdrop-blur-sm"
                style={{
                  backgroundColor: `${project.color}30`,
                  color: project.color,
                }}
              >
                {project.type === "mobile" ? (
                  <Smartphone size={14} />
                ) : (
                  <Monitor size={14} />
                )}
                {project.category}
              </span>
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 p-6">
            <div className="flex items-start justify-between mb-3">
              <h3 className="text-xl font-bold text-white group-hover:text-[#3ABEFF] transition-colors">
                {project.title}
              </h3>
              <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                {project.githubUrl && project.githubUrl !== "#" && (
                  <a
                    href={project.githubUrl}
                    onClick={(e) => e.stopPropagation()}
                    className="w-8 h-8 rounded-full glass flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/20 transition-colors"
                  >
                    <Github size={16} />
                  </a>
                )}
                {project.liveUrl && project.liveUrl !== "#" && (
                  <a
                    href={project.liveUrl}
                    onClick={(e) => e.stopPropagation()}
                    className="w-8 h-8 rounded-full glass flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/20 transition-colors"
                  >
                    <ExternalLink size={16} />
                  </a>
                )}
              </div>
            </div>
            <p className="text-gray-400 text-sm mb-4 line-clamp-2">
              {project.description}
            </p>
            <div className="flex flex-wrap gap-2">
              {project.technologies.slice(0, 4).map((tech) => (
                <span
                  key={tech}
                  className="px-2 py-1 text-xs rounded-md bg-white/5 text-gray-400"
                >
                  {tech}
                </span>
              ))}
              {project.technologies.length > 4 && (
                <span className="px-2 py-1 text-xs rounded-md bg-white/5 text-gray-400">
                  +{project.technologies.length - 4}
                </span>
              )}
            </div>

            {/* Click hint */}
            <div className="mt-4 flex items-center gap-2 text-[#3ABEFF]/60 text-xs opacity-0 group-hover:opacity-100 transition-opacity">
              <MousePointerClick size={14} />
              <span>Click to view case study</span>
            </div>
          </div>
        </motion.div>
      </motion.div>
    );
  }

  return (
    <motion.div
      ref={cardRef}
      className="group relative"
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.1, duration: 0.6 }}
    >
      <motion.div
        className="relative overflow-hidden rounded-2xl glass cursor-pointer h-full"
        onClick={handleClick}
        whileHover={{ y: -10 }}
        transition={{ duration: 0.3 }}
      >
        {/* Image Container */}
        <div className="relative h-64 overflow-hidden">
          <motion.img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover"
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.6 }}
          />
          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />

          {/* Category Badge */}
          <div className="absolute top-4 left-4">
            <span
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium backdrop-blur-sm"
              style={{
                backgroundColor: `${project.color}30`,
                color: project.color,
              }}
            >
              {project.type === "mobile" ? (
                <Smartphone size={14} />
              ) : (
                <Monitor size={14} />
              )}
              {project.category}
            </span>
          </div>

          {/* Quick Links */}
          <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            {project.githubUrl && project.githubUrl !== "#" && (
              <motion.a
                href={project.githubUrl}
                onClick={(e) => e.stopPropagation()}
                className="w-10 h-10 rounded-full glass flex items-center justify-center text-white hover:bg-white/20 transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Github size={18} />
              </motion.a>
            )}
            {project.liveUrl && project.liveUrl !== "#" && (
              <motion.a
                href={project.liveUrl}
                onClick={(e) => e.stopPropagation()}
                className="w-10 h-10 rounded-full glass flex items-center justify-center text-white hover:bg-white/20 transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <ExternalLink size={18} />
              </motion.a>
            )}
          </div>

          {/* Click hint overlay */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="bg-black/60 backdrop-blur-sm px-4 py-2 rounded-full flex items-center gap-2 text-white text-sm">
              <MousePointerClick size={16} />
              View Case Study
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <h3 className="text-xl font-bold text-white mb-2 group-hover:text-[#3ABEFF] transition-colors">
            {project.title}
          </h3>
          <p className="text-gray-400 text-sm mb-4 line-clamp-2">
            {project.description}
          </p>

          {/* Tech Stack */}
          <div className="flex flex-wrap gap-2">
            {project.technologies.slice(0, 3).map((tech) => (
              <span
                key={tech}
                className="px-2 py-1 text-xs rounded-md bg-white/5 text-gray-400"
              >
                {tech}
              </span>
            ))}
            {project.technologies.length > 3 && (
              <span className="px-2 py-1 text-xs rounded-md bg-white/5 text-gray-400">
                +{project.technologies.length - 3}
              </span>
            )}
          </div>
        </div>

        {/* Hover Border Effect */}
        <motion.div
          className="absolute inset-0 rounded-2xl pointer-events-none"
          style={{ border: `2px solid ${project.color}` }}
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 0.5 }}
          transition={{ duration: 0.3 }}
        />
      </motion.div>
    </motion.div>
  );
};

const AllProjects = () => {
  const [filter, setFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState("grid");
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  const filters = [
    { label: "All Projects", value: "all" },
    { label: "Mobile Apps", value: "mobile" },
    { label: "Web Apps", value: "web" },
  ];

  const filteredProjects = projects.filter((p) => {
    const matchesFilter = filter === "all" || p.type === filter;
    const matchesSearch =
      searchQuery === "" ||
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.technologies.some((tech) =>
        tech.toLowerCase().includes(searchQuery.toLowerCase())
      );
    return matchesFilter && matchesSearch;
  });

  return (
    <motion.div
      ref={containerRef}
      className="min-h-screen pt-24 pb-16"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Background */}
      <div className="fixed inset-0 bg-gradient-to-b from-black via-[#030303] to-black -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-8 transition-colors group"
          >
            <ArrowLeft
              size={20}
              className="group-hover:text-[#3ABEFF] transition-colors group-hover:-translate-x-1"
            />
            Back to Home
          </Link>
        </motion.div>

        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <motion.span
            className="inline-block px-4 py-2 rounded-full glass text-[#3ABEFF] text-sm font-medium mb-6"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.2 }}
          >
            Portfolio
          </motion.span>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6">
            <span className="text-white">All </span>
            <span className="gradient-text">Projects</span>
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Explore my complete collection of projects. Click on any card to
            view the full case study with details, screenshots, and demo videos.
          </p>
        </motion.div>

        {/* Controls */}
        <motion.div
          className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3 }}
        >
          {/* Search */}
          <div className="relative w-full sm:w-80">
            <Search
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
            />
            <input
              type="text"
              placeholder="Search projects..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 glass rounded-full text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#3ABEFF]/50 transition-all"
            />
          </div>

          <div className="flex items-center gap-4">
            {/* Filter Tabs */}
            <div className="inline-flex p-1 glass rounded-full">
              {filters.map((item) => (
                <motion.button
                  key={item.value}
                  onClick={() => setFilter(item.value)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                    filter === item.value
                      ? "bg-gradient-to-r from-[#3ABEFF] to-[#00d4ff] text-black"
                      : "text-gray-400 hover:text-white"
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {item.label}
                </motion.button>
              ))}
            </div>

            {/* View Toggle */}
            <div className="inline-flex p-1 glass rounded-full">
              <motion.button
                onClick={() => setViewMode("grid")}
                className={`p-2 rounded-full transition-all ${
                  viewMode === "grid"
                    ? "bg-[#3ABEFF] text-black"
                    : "text-gray-400 hover:text-white"
                }`}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Grid3X3 size={18} />
              </motion.button>
              <motion.button
                onClick={() => setViewMode("list")}
                className={`p-2 rounded-full transition-all ${
                  viewMode === "list"
                    ? "bg-[#3ABEFF] text-black"
                    : "text-gray-400 hover:text-white"
                }`}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <LayoutList size={18} />
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Results Count */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <p className="text-gray-400 text-sm">
            Showing{" "}
            <span className="text-[#3ABEFF] font-medium">
              {filteredProjects.length}
            </span>{" "}
            project{filteredProjects.length !== 1 ? "s" : ""}
            {filter !== "all" && (
              <span>
                {" "}
                in{" "}
                <span className="text-white">
                  {filters.find((f) => f.value === filter)?.label}
                </span>
              </span>
            )}
            {searchQuery && (
              <span>
                {" "}
                matching "<span className="text-white">{searchQuery}</span>"
              </span>
            )}
          </p>
        </motion.div>

        {/* Projects Grid/List */}
        <AnimatePresence mode="popLayout">
          {filteredProjects.length > 0 ? (
            <motion.div
              className={
                viewMode === "grid"
                  ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                  : "flex flex-col gap-6"
              }
              layout
            >
              {filteredProjects.map((project, index) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  index={index}
                  viewMode={viewMode}
                />
              ))}
            </motion.div>
          ) : (
            <motion.div
              className="text-center py-20"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="w-24 h-24 rounded-full glass mx-auto mb-6 flex items-center justify-center">
                <Search size={40} className="text-gray-400" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">
                No Projects Found
              </h3>
              <p className="text-gray-400 mb-8">
                Try adjusting your search or filter to find what you're looking
                for.
              </p>
              <motion.button
                onClick={() => {
                  setSearchQuery("");
                  setFilter("all");
                }}
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#3ABEFF] to-[#00d4ff] text-black font-semibold rounded-full"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Clear Filters
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Hint Banner */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <div className="inline-flex items-center gap-3 px-6 py-3 glass rounded-full text-gray-400">
            <MousePointerClick size={18} className="text-[#3ABEFF]" />
            <span>Click on any project card to view the full case study</span>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default AllProjects;
