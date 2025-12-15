import { useParams, useNavigate, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import {
  ArrowLeft,
  ExternalLink,
  Github,
  Smartphone,
  Monitor,
  Play,
  X,
  ChevronLeft,
  ChevronRight,
  Calendar,
  User,
  Clock,
  Layers,
  Zap,
} from "lucide-react";
import { getProjectById, projects } from "../data/projects";

// Screenshot Gallery Component
const ScreenshotGallery = ({ screenshots, projectTitle, color }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const openLightbox = (index) => {
    setCurrentIndex(index);
    setSelectedImage(screenshots[index]);
  };

  const closeLightbox = () => {
    setSelectedImage(null);
  };

  const goToPrevious = () => {
    const newIndex =
      currentIndex === 0 ? screenshots.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
    setSelectedImage(screenshots[newIndex]);
  };

  const goToNext = () => {
    const newIndex =
      currentIndex === screenshots.length - 1 ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
    setSelectedImage(screenshots[newIndex]);
  };

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {screenshots.map((screenshot, index) => (
          <motion.div
            key={index}
            className="relative aspect-video rounded-xl overflow-hidden cursor-pointer group"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            onClick={() => openLightbox(index)}
            whileHover={{ scale: 1.02 }}
          >
            <img
              src={screenshot}
              alt={`${projectTitle} screenshot ${index + 1}`}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
              <motion.div
                className="w-12 h-12 rounded-full flex items-center justify-center"
                style={{ backgroundColor: color }}
                whileHover={{ scale: 1.1 }}
              >
                <Zap size={20} className="text-black" />
              </motion.div>
            </div>
            <div
              className="absolute inset-0 border-2 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity"
              style={{ borderColor: color }}
            />
          </motion.div>
        ))}
      </div>

      {/* Lightbox Modal - Using Portal to ensure it renders at document body level */}
      {createPortal(
        <AnimatePresence>
          {selectedImage && (
            <motion.div
              className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/95 p-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeLightbox}
            >
              <motion.button
                className="absolute top-6 right-6 w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-white hover:bg-red-500/80 transition-colors z-[10000]"
                onClick={(e) => {
                  e.stopPropagation();
                  closeLightbox();
                }}
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
              >
                <X size={24} />
              </motion.button>

              {/* Navigation Arrows */}
              <motion.button
                className="absolute left-4 md:left-8 w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/20 transition-colors z-[10000]"
                onClick={(e) => {
                  e.stopPropagation();
                  goToPrevious();
                }}
                whileHover={{ scale: 1.1, x: -5 }}
                whileTap={{ scale: 0.9 }}
              >
                <ChevronLeft size={24} />
              </motion.button>

              <motion.button
                className="absolute right-4 md:right-8 w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/20 transition-colors z-[10000]"
                onClick={(e) => {
                  e.stopPropagation();
                  goToNext();
                }}
                whileHover={{ scale: 1.1, x: 5 }}
                whileTap={{ scale: 0.9 }}
              >
                <ChevronRight size={24} />
              </motion.button>

              {/* Image */}
              <motion.img
                key={currentIndex}
                src={selectedImage}
                alt={`${projectTitle} screenshot`}
                className="max-w-full max-h-[85vh] object-contain rounded-lg"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                onClick={(e) => e.stopPropagation()}
              />

              {/* Dots Indicator */}
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
                {screenshots.map((_, index) => (
                  <button
                    key={index}
                    className={`w-2 h-2 rounded-full transition-all ${
                      index === currentIndex ? "w-8" : "bg-white/50"
                    }`}
                    style={{
                      backgroundColor:
                        index === currentIndex ? color : undefined,
                    }}
                    onClick={(e) => {
                      e.stopPropagation();
                      setCurrentIndex(index);
                      setSelectedImage(screenshots[index]);
                    }}
                  />
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </>
  );
};

// Video Player Component
const VideoPlayer = ({ videoUrl, color }) => {
  const [isPlaying, setIsPlaying] = useState(false);

  if (!videoUrl) return null;

  // Check if it's a local video file or an external embed
  const isLocalVideo =
    videoUrl.endsWith(".webm") ||
    videoUrl.endsWith(".mp4") ||
    videoUrl.endsWith(".ogg");

  return (
    <div className="relative aspect-video rounded-2xl overflow-hidden glass">
      {!isPlaying ? (
        <motion.div
          className="absolute inset-0 flex items-center justify-center cursor-pointer group"
          onClick={() => setIsPlaying(true)}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
          <motion.div
            className="relative z-10 w-20 h-20 rounded-full flex items-center justify-center"
            style={{ backgroundColor: color }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <Play size={32} className="text-black ml-1" />
          </motion.div>
          <div className="absolute bottom-6 left-6 right-6">
            <p className="text-white font-medium">Watch Demo Video</p>
            <p className="text-gray-400 text-sm">See the project in action</p>
          </div>
        </motion.div>
      ) : isLocalVideo ? (
        <video
          src={videoUrl}
          className="w-full h-full object-cover"
          controls
          autoPlay
        />
      ) : (
        <iframe
          src={`${videoUrl}?autoplay=1`}
          title="Demo Video"
          className="w-full h-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      )}
    </div>
  );
};

// Info Card Component
const InfoCard = ({ icon: Icon, label, value, color }) => (
  <motion.div
    className="glass rounded-xl p-4 flex items-center gap-4"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    whileHover={{ y: -5, borderColor: color }}
    transition={{ duration: 0.3 }}
  >
    <div
      className="w-10 h-10 rounded-lg flex items-center justify-center"
      style={{ backgroundColor: `${color}20` }}
    >
      <Icon size={20} style={{ color }} />
    </div>
    <div>
      <p className="text-gray-400 text-xs uppercase tracking-wider">{label}</p>
      <p className="text-white font-medium">{value}</p>
    </div>
  </motion.div>
);

// Related Projects Component
const RelatedProjects = ({ currentId, type }) => {
  const related = projects
    .filter((p) => p.id !== currentId && p.type === type)
    .slice(0, 3);

  if (related.length === 0) return null;

  return (
    <div className="mt-20">
      <motion.h2
        className="text-2xl font-bold text-white mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        Related Projects
      </motion.h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {related.map((project, index) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Link to={`/project/${project.id}`}>
              <motion.div
                className="glass rounded-xl overflow-hidden group cursor-pointer"
                whileHover={{ y: -5 }}
              >
                <div className="relative h-40 overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
                </div>
                <div className="p-4">
                  <h3 className="text-white font-semibold group-hover:text-[#3ABEFF] transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-gray-400 text-sm mt-1 line-clamp-2">
                    {project.description}
                  </p>
                </div>
              </motion.div>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

const ProjectDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const project = getProjectById(id);

  // Scroll to top when component mounts or project id changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!project) {
    return (
      <motion.div
        className="min-h-screen flex items-center justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <div className="text-center">
          <motion.div
            className="w-24 h-24 rounded-full glass mx-auto mb-6 flex items-center justify-center"
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          >
            <Layers size={40} className="text-[#3ABEFF]" />
          </motion.div>
          <h1 className="text-3xl font-bold text-white mb-4">
            Project Not Found
          </h1>
          <p className="text-gray-400 mb-8">
            The project you're looking for doesn't exist or has been moved.
          </p>
          <motion.button
            onClick={() => navigate("/")}
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#3ABEFF] to-[#00d4ff] text-black font-semibold rounded-full"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <ArrowLeft size={18} />
            Go back home
          </motion.button>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      className="min-h-screen pt-24 pb-16"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <motion.button
          onClick={() => {
            navigate("/");
            // Use setTimeout to ensure navigation completes before scrolling
            setTimeout(() => {
              const projectsSection = document.getElementById("projects");
              if (projectsSection) {
                projectsSection.scrollIntoView({ behavior: "smooth" });
              }
            }, 100);
          }}
          className="flex items-center gap-2 text-gray-400 hover:text-white mb-8 transition-colors group"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          whileHover={{ x: -5 }}
        >
          <ArrowLeft
            size={20}
            className="group-hover:text-[#3ABEFF] transition-colors"
          />
          Back to Projects
        </motion.button>

        {/* Hero Section */}
        <motion.div
          className="relative rounded-3xl overflow-hidden mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <div className="relative h-64 md:h-[500px]">
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />

            {/* Category Badge */}
            <motion.div
              className="absolute top-6 left-6"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
            >
              <span
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium backdrop-blur-sm"
                style={{
                  backgroundColor: `${project.color}30`,
                  color: project.color,
                }}
              >
                {project.type === "mobile" ? (
                  <Smartphone size={16} />
                ) : (
                  <Monitor size={16} />
                )}
                {project.category}
              </span>
            </motion.div>

            {/* Title Overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12">
              <motion.h1
                className="text-4xl md:text-6xl font-bold text-white mb-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                {project.title}
              </motion.h1>
              <motion.p
                className="text-gray-300 text-lg md:text-xl max-w-3xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                {project.description}
              </motion.p>
            </div>
          </div>
        </motion.div>

        {/* Quick Info Cards */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <InfoCard
            icon={Calendar}
            label="Year"
            value={project.year}
            color={project.color}
          />
          <InfoCard
            icon={User}
            label="Role"
            value={project.role}
            color={project.color}
          />
          <InfoCard
            icon={Clock}
            label="Duration"
            value={project.duration}
            color={project.color}
          />
          <InfoCard
            icon={Layers}
            label="Type"
            value={project.category}
            color={project.color}
          />
        </motion.div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-16">
          {/* Left Column - Overview & Features */}
          <motion.div
            className="lg:col-span-2 space-y-12"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            {/* Project Overview */}
            <div>
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <span
                  className="w-1 h-8 rounded-full"
                  style={{ backgroundColor: project.color }}
                />
                Project Overview
              </h2>
              <p className="text-gray-300 text-lg leading-relaxed">
                {project.overview || project.longDescription}
              </p>
            </div>

            {/* Key Features */}
            <div>
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <span
                  className="w-1 h-8 rounded-full"
                  style={{ backgroundColor: project.color }}
                />
                Key Features
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {project.features.map((feature, index) => (
                  <motion.div
                    key={feature}
                    className="flex items-start gap-3 p-4 glass rounded-xl"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6 + index * 0.05 }}
                    whileHover={{ x: 5, borderColor: project.color }}
                  >
                    <div
                      className="w-6 h-6 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5"
                      style={{ backgroundColor: `${project.color}20` }}
                    >
                      <Zap size={14} style={{ color: project.color }} />
                    </div>
                    <span className="text-gray-300">{feature}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right Column - Tech Stack & Actions */}
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            {/* Tech Stack */}
            <div className="glass rounded-2xl p-6">
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <Layers size={18} style={{ color: project.color }} />
                Tech Stack
              </h3>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech, index) => (
                  <motion.span
                    key={tech}
                    className="px-4 py-2 rounded-full text-sm font-medium"
                    style={{
                      backgroundColor: `${project.color}15`,
                      color: project.color,
                    }}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.7 + index * 0.05 }}
                    whileHover={{ scale: 1.05 }}
                  >
                    {tech}
                  </motion.span>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="glass rounded-2xl p-6 space-y-4">
              <h3 className="text-lg font-semibold text-white mb-4">
                Project Links
              </h3>
              {(() => {
                const hasLive = project.liveUrl && project.liveUrl !== "#";
                const hasGithub =
                  project.githubUrl && project.githubUrl !== "#";

                if (hasLive && hasGithub) {
                  // Show both buttons
                  return (
                    <>
                      <motion.a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2 w-full py-3 bg-gradient-to-r from-[#3ABEFF] to-[#00d4ff] text-black font-semibold rounded-xl hover:shadow-lg hover:shadow-[#3ABEFF]/30 transition-all"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <ExternalLink size={18} />
                        View Live Demo
                      </motion.a>
                      <motion.a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2 w-full py-3 border border-[#3ABEFF]/50 text-[#3ABEFF] font-semibold rounded-xl hover:bg-[#3ABEFF]/10 transition-all"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <Github size={18} />
                        View Source Code
                      </motion.a>
                    </>
                  );
                } else if (hasLive) {
                  // Show only live demo
                  return (
                    <motion.a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 w-full py-3 bg-gradient-to-r from-[#3ABEFF] to-[#00d4ff] text-black font-semibold rounded-xl hover:shadow-lg hover:shadow-[#3ABEFF]/30 transition-all"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <ExternalLink size={18} />
                      View Live Demo
                    </motion.a>
                  );
                } else if (hasGithub) {
                  // Show only github as primary button
                  return (
                    <motion.a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 w-full py-3 bg-gradient-to-r from-[#3ABEFF] to-[#00d4ff] text-black font-semibold rounded-xl hover:shadow-lg hover:shadow-[#3ABEFF]/30 transition-all"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Github size={18} />
                      View Source Code
                    </motion.a>
                  );
                } else {
                  // Show coming soon
                  return (
                    <div className="text-center py-4">
                      <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 text-gray-400">
                        <Clock size={16} />
                        <span>Coming Soon</span>
                      </div>
                    </div>
                  );
                }
              })()}
            </div>
          </motion.div>
        </div>

        {/* Screenshot Gallery */}
        {project.screenshots && project.screenshots.length > 0 && (
          <motion.div
            className="mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
          >
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
              <span
                className="w-1 h-8 rounded-full"
                style={{ backgroundColor: project.color }}
              />
              Screenshot Gallery
            </h2>
            <ScreenshotGallery
              screenshots={project.screenshots}
              projectTitle={project.title}
              color={project.color}
            />
          </motion.div>
        )}

        {/* Demo Video */}
        {project.demoVideo && (
          <motion.div
            className="mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
          >
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
              <span
                className="w-1 h-8 rounded-full"
                style={{ backgroundColor: project.color }}
              />
              Demo Video
            </h2>
            <VideoPlayer videoUrl={project.demoVideo} color={project.color} />
          </motion.div>
        )}

        {/* Related Projects */}
        <RelatedProjects currentId={project.id} type={project.type} />

        {/* View All Projects CTA */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
        >
          <Link to="/projects">
            <motion.button
              className="inline-flex items-center gap-2 px-8 py-4 border border-[#3ABEFF]/50 text-[#3ABEFF] font-semibold rounded-full hover:bg-[#3ABEFF]/10 transition-all group"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              View All Projects
              <ChevronRight
                size={18}
                className="group-hover:translate-x-1 transition-transform"
              />
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default ProjectDetail;
