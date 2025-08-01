import React, { useRef, useMemo } from 'react';
import { useFrame, useLoader } from '@react-three/fiber';
import { Sphere, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';

interface EcoGlobeProps {
  isInteractive?: boolean;
  scale?: number;
  distort?: number;
  speed?: number;
}

const EcoGlobe: React.FC<EcoGlobeProps> = ({ 
  isInteractive = false, 
  scale = 1, 
  distort = 0.1, 
  speed = 0.5 
}) => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  // Create a simple earth-like texture
  const texture = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 512;
    const context = canvas.getContext('2d');
    
    if (context) {
      // Create gradient background
      const gradient = context.createRadialGradient(256, 256, 0, 256, 256, 256);
      gradient.addColorStop(0, '#4a90e2');
      gradient.addColorStop(0.7, '#2d5aa0');
      gradient.addColorStop(1, '#1e3a5f');
      
      context.fillStyle = gradient;
      context.fillRect(0, 0, 512, 512);
      
      // Add landmasses (simplified)
      context.fillStyle = '#2d5016';
      context.beginPath();
      context.arc(150, 200, 80, 0, Math.PI * 2);
      context.fill();
      
      context.beginPath();
      context.arc(350, 180, 60, 0, Math.PI * 2);
      context.fill();
      
      context.beginPath();
      context.arc(250, 350, 70, 0, Math.PI * 2);
      context.fill();
      
      // Add green patches
      context.fillStyle = '#4a7c59';
      for (let i = 0; i < 20; i++) {
        const x = Math.random() * 512;
        const y = Math.random() * 512;
        const radius = Math.random() * 15 + 5;
        context.beginPath();
        context.arc(x, y, radius, 0, Math.PI * 2);
        context.fill();
      }
    }
    
    return new THREE.CanvasTexture(canvas);
  }, []);

  useFrame((state) => {
    if (meshRef.current) {
      if (!isInteractive) {
        meshRef.current.rotation.y += 0.003;
      }
      // Add subtle floating animation
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
    }
  });

  return (
    <group scale={scale}>
      <Sphere ref={meshRef} args={[1, 64, 64]}>
        <MeshDistortMaterial
          map={texture}
          distort={distort}
          speed={speed}
          roughness={0.4}
          metalness={0.1}
        />
      </Sphere>
      
      {/* Atmosphere glow */}
      <Sphere args={[1.1, 32, 32]}>
        <meshBasicMaterial
          color="#87ceeb"
          transparent
          opacity={0.1}
          side={THREE.BackSide}
        />
      </Sphere>
      
      {/* Particle system for stars/dust */}
      <points>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={1000}
            array={new Float32Array(
              Array.from({ length: 3000 }, () => (Math.random() - 0.5) * 10)
            )}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.02}
          color="#ffffff"
          transparent
          opacity={0.6}
          sizeAttenuation
        />
      </points>
    </group>
  );
};

export default EcoGlobe;