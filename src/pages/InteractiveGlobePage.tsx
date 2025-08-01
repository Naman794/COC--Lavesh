import React, { useState, useRef, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Environment, Text, Float } from '@react-three/drei';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Calculator, ArrowRight } from 'lucide-react';
import { useInView } from 'react-intersection-observer';
import EcoGlobe from '../components/EcoGlobe';

const InteractiveGlobePage: React.FC = () => {
  const navigate = useNavigate();
  const [globeRotation, setGlobeRotation] = useState(0);
  const [showCalculateButton, setShowCalculateButton] = useState(true);
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: false,
  });

  const handleCalculateImpact = () => {
    navigate('/quiz');
  };

  // Scroll-triggered transition to quiz
  useEffect(() => {
    const handleScroll = () => {
      const scrollProgress = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight);
      if (scrollProgress > 0.7) {
        navigate('/quiz');
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [navigate]);

  return (
    <motion.div
      className="min-h-screen relative overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-green-900"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
    >
      {/* Interactive Globe */}
      <div className="absolute inset-0 globe-container">
        <Canvas camera={{ position: [0, 0, 4], fov: 75 }}>
          <ambientLight intensity={0.4} />
          <pointLight position={[10, 10, 10]} intensity={0.8} />
          <pointLight position={[-10, -10, -10]} intensity={0.3} color="#4a90e2" />
          
          <EcoGlobe 
            isInteractive={true} 
            scale={2} 
            distort={0.15} 
            speed={1} 
          />
          
          <OrbitControls 
            enableZoom={true} 
            enablePan={false} 
            autoRotate={false}
            minDistance={3}
            maxDistance={8}
            enableDamping
            dampingFactor={0.05}
          />
          
          <Environment preset="night" />
        </Canvas>
      </div>

      {/* Content Overlay */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4">
        <motion.div
          className="text-center max-w-4xl mx-auto"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          <motion.h1
            className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight"
            style={{ fontFamily: 'Playfair Display, serif' }}
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.5, type: "spring", stiffness: 100 }}
          >
            Explore Our
            <span className="block bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
              Sustainable Impact
            </span>
          </motion.h1>

          <motion.p
            className="text-lg md:text-xl text-gray-300 mb-12 max-w-2xl mx-auto"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.8 }}
          >
            Interact with our planet to discover how sustainable packaging 
            solutions are transforming industries worldwide
          </motion.p>

          {/* Calculate Impact Button */}
          <motion.div
            className="relative"
            initial={{ scale: 0 }}
            animate={{ scale: showCalculateButton ? 1 : 0 }}
            transition={{ delay: 1, type: "spring", stiffness: 200 }}
          >
            <motion.button
              onClick={handleCalculateImpact}
              className="group relative bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white px-8 py-4 rounded-full text-lg font-semibold shadow-lg hover:shadow-xl transform transition-all duration-300 flex items-center mx-auto"
              animate={{
                scale: [1, 1.05, 1],
                boxShadow: [
                  "0 4px 15px rgba(0,0,0,0.2)",
                  "0 8px 25px rgba(59,130,246,0.3)",
                  "0 4px 15px rgba(0,0,0,0.2)"
                ]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
            >
              <Calculator className="mr-3 w-6 h-6" />
              Calculate My Impact
              <ArrowRight className="ml-3 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </motion.button>

            {/* Pulsating ring */}
            <motion.div
              className="absolute inset-0 border-2 border-white/30 rounded-full"
              animate={{
                scale: [1, 1.3, 1],
                opacity: [0.3, 0, 0.3],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeOut"
              }}
            />
          </motion.div>

          {/* Instructions */}
          <motion.div
            className="mt-16 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
          >
            <p className="text-gray-400 text-sm mb-4">
              Drag to rotate • Scroll to zoom • Continue scrolling to proceed
            </p>
            
            {/* Scroll indicators */}
            <motion.div
              className="flex justify-center space-x-2"
              animate={{ y: [0, 5, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <div className="w-2 h-2 bg-white/40 rounded-full" />
              <div className="w-2 h-2 bg-white/60 rounded-full" />
              <div className="w-2 h-2 bg-white/80 rounded-full" />
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      {/* Ambient particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full opacity-30"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              scale: [0.5, 1.5, 0.5],
              opacity: [0.2, 0.8, 0.2],
              y: [-20, 20, -20],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      {/* Scroll trigger area */}
      <div className="h-screen" ref={ref} />
    </motion.div>
  );
};

export default InteractiveGlobePage;