import { motion } from "framer-motion";

const LoadingScreen = () => {
  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="relative">
        {/* Animated Logo/Text */}
        <motion.div
          className="text-4xl font-bold tracking-wider"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <span className="gradient-text">CJ</span>
        </motion.div>

        {/* Loading Ring */}
        <motion.div
          className="absolute -inset-8 border-2 border-[#3ABEFF]/30 rounded-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        />

        {/* Animated Dots */}
        <motion.div
          className="absolute -inset-12 border border-[#3ABEFF]/20 rounded-full"
          animate={{ rotate: -360 }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
        />

        {/* Glowing Dot */}
        <motion.div
          className="absolute -top-8 left-1/2 -translate-x-1/2 w-2 h-2 bg-[#3ABEFF] rounded-full"
          animate={{
            boxShadow: [
              "0 0 10px #3ABEFF, 0 0 20px #3ABEFF",
              "0 0 20px #3ABEFF, 0 0 40px #3ABEFF",
              "0 0 10px #3ABEFF, 0 0 20px #3ABEFF",
            ],
          }}
          transition={{ duration: 1.5, repeat: Infinity }}
        />
      </div>

      {/* Loading Text */}
      <motion.p
        className="absolute bottom-20 text-sm text-gray-500 tracking-widest uppercase"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        Loading Experience
      </motion.p>
    </motion.div>
  );
};

export default LoadingScreen;
