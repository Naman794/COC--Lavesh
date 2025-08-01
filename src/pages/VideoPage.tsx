import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { X, SkipForward } from 'lucide-react';

const VideoPage: React.FC = () => {
  const navigate = useNavigate();
  const [showSkip, setShowSkip] = useState(false);

  useEffect(() => {
    // Show skip button after 3 seconds
    const timer = setTimeout(() => setShowSkip(true), 3000);
    return () => clearTimeout(timer);
  }, []);

  const handleSkip = () => {
    navigate('/globe');
  };

  return (
    <motion.div
      className="min-h-screen bg-black flex items-center justify-center relative"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Skip Button */}
      <motion.button
        onClick={handleSkip}
        className={`fixed top-6 right-6 z-20 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white px-4 py-2 rounded-full flex items-center space-x-2 transition-all duration-300 ${
          showSkip ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        initial={{ scale: 0 }}
        animate={{ scale: showSkip ? 1 : 0 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <SkipForward className="w-4 h-4" />
        <span className="text-sm font-medium">Skip</span>
      </motion.button>

      {/* Video Container */}
      <motion.div
        className="w-full max-w-6xl mx-auto px-4"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.6 }}
      >
        <div className="video-container rounded-lg overflow-hidden shadow-2xl">
          <div className="sp-embed-player" data-id="cTjVj2nIBJf">
            <script src="https://go.screenpal.com/player/appearance/cTjVj2nIBJf"></script>
            <iframe 
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              scrolling="no" 
              src="https://go.screenpal.com/player/cTjVj2nIBJf?width=100%&height=100%&ff=1&title=0&autoplay=1&muted=1" 
              allowFullScreen
              title="Pudumjee Papers Sustainable Packaging Video"
            />
          </div>
        </div>
      </motion.div>

      {/* Ambient background elements */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute top-20 left-10 w-2 h-2 bg-green-400 rounded-full opacity-60"
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.6, 1, 0.6],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-32 right-16 w-3 h-3 bg-blue-400 rounded-full opacity-40"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.4, 0.8, 0.4],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
        />
        <motion.div
          className="absolute top-1/2 left-8 w-1 h-1 bg-white rounded-full opacity-50"
          animate={{
            scale: [1, 2, 1],
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.5
          }}
        />
      </div>

      {/* Progress indicator */}
      <motion.div
        className="fixed bottom-6 left-1/2 transform -translate-x-1/2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1 }}
      >
        <p className="text-white text-sm">
          Discovering sustainable solutions...
        </p>
      </motion.div>
    </motion.div>
  );
};

export default VideoPage;