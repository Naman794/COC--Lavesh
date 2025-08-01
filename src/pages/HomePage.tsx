import React, { useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment } from '@react-three/drei';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ChevronRight, Leaf } from 'lucide-react';
import EcoGlobe from '../components/EcoGlobe';
import LoadingScreen from '../components/LoadingScreen';

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <motion.div
      className="min-h-screen relative overflow-hidden paper-texture"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-green-50 via-blue-50 to-green-100" />
      
      {/* 3D Globe Background */}
      <div className="absolute inset-0 pointer-events-none">
        <Canvas camera={{ position: [0, 0, 5], fov: 60 }}>
          <ambientLight intensity={0.6} />
          <pointLight position={[10, 10, 10]} intensity={1} />
          <EcoGlobe scale={1.5} distort={0.05} speed={0.3} />
          <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.5} />
          <Environment preset="sunset" />
        </Canvas>
      </div>

      {/* Content */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 text-center">
        {/* Semi-transparent overlay for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/20 via-white/10 to-white/20 backdrop-blur-[1px]" />
        
        <motion.div
          className="max-w-4xl mx-auto relative z-10"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          {/* Logo/Brand */}
          <motion.div
            className="flex items-center justify-center mb-8 bg-white/80 backdrop-blur-sm rounded-full px-6 py-3 shadow-lg"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
          >
            <Leaf className="text-green-600 w-8 h-8 mr-2" />
            <span className="text-2xl font-bold text-gray-800">Pudumjee Papers</span>
          </motion.div>

          {/* Main Headline */}
          <motion.h1
            className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight"
            style={{ fontFamily: 'Playfair Display, serif' }}
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            <span className="bg-white/90 backdrop-blur-sm px-4 py-2 rounded-2xl shadow-lg inline-block text-gray-800">
              Discover the Future of
            </span>
            <br />
            <span className="bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent bg-white/90 backdrop-blur-sm px-4 py-2 rounded-2xl shadow-lg inline-block mt-4">
              Sustainable Packaging
            </span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            className="text-lg md:text-xl lg:text-2xl text-gray-800 mb-12 max-w-3xl mx-auto leading-relaxed bg-white/80 backdrop-blur-sm rounded-2xl px-6 py-4 shadow-lg"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.8 }}
          >
            Watch how Pudumjee Papers is revolutionizing the industry with innovative paper-based solutions
          </motion.p>

          {/* CTA Button */}
          <motion.button
            onClick={() => navigate('/video')}
            className="eco-button group bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white px-12 py-4 rounded-full text-xl font-semibold shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300 flex items-center mx-auto border-2 border-white/20"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1, duration: 0.8 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Start Journey
            <ChevronRight className="ml-2 w-6 h-6 group-hover:translate-x-1 transition-transform" />
          </motion.button>

          {/* Floating elements */}
          <motion.div
            className="absolute top-20 left-10 text-green-400 text-4xl opacity-70"
            animate={{
              y: [-10, 10, -10],
              rotate: [0, 5, -5, 0],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            🌿
          </motion.div>

          <motion.div
            className="absolute bottom-32 right-16 text-blue-400 text-3xl opacity-60"
            animate={{
              y: [10, -10, 10],
              rotate: [0, -5, 5, 0],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1
            }}
          >
            ♻️
          </motion.div>

          <motion.div
            className="absolute top-40 right-20 text-green-500 text-2xl opacity-50"
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 10, -10, 0],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 2
            }}
          >
            🍃
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5 }}
        >
          <motion.div
            className="w-6 h-10 border-2 border-green-600 rounded-full flex justify-center"
            animate={{ y: [0, 5, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <motion.div
              className="w-1 h-3 bg-green-600 rounded-full mt-2"
              animate={{ y: [0, 6, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default HomePage;