import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface Heart {
  id: number;
  x: number;
  z: number; // Depth
  scale: number;
  duration: number;
  delay: number;
}

const HeartBackground: React.FC = () => {
  const [hearts, setHearts] = useState<Heart[]>([]);

  useEffect(() => {
    // Generate random hearts with depth
    const newHearts: Heart[] = Array.from({ length: 30 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100, // percentage
      z: Math.random() * 200 - 100, // Depth between -100 and 100
      scale: 0.5 + Math.random() * 1,
      duration: 15 + Math.random() * 20,
      delay: Math.random() * 10,
    }));
    setHearts(newHearts);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0 preserve-3d">
      {hearts.map((heart) => (
        <motion.div
          key={heart.id}
          className="absolute bottom-[-100px] text-rose-500/10 preserve-3d"
          style={{
            left: `${heart.x}%`,
            fontSize: `${heart.scale * 3}rem`,
            z: heart.z, // Apply CSS perspective depth if supported by motion, else handled by transform
          }}
          animate={{
            y: -1500, // Move up
            x: Math.sin(heart.id) * 30, // Sway
            rotateZ: [0, 10, -10, 0], // Gentle rotation
            opacity: [0, 0.4, 0],
            z: heart.z, // Keep depth constant
          }}
          transition={{
            duration: heart.duration,
            repeat: Infinity,
            delay: heart.delay,
            ease: "linear",
          }}
        >
          ♥
        </motion.div>
      ))}
      {/* Ambient Glow */}
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/50 to-slate-950 z-0" />
    </div>
  );
};

export default HeartBackground;