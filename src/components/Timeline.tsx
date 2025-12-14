import React, { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, animate } from 'framer-motion';

interface TimelineProps {
  onComplete: () => void;
}

const Timeline: React.FC<TimelineProps> = ({ onComplete }) => {
  const [isFinished, setIsFinished] = useState(false);

  // Dates: 14/12/2024 to 14/12/2025
  const startDate = new Date('2024-12-14').getTime();
  const endDate = new Date('2025-12-15').getTime();

  // Use MotionValue instead of Spring for precise control over the easing curve
  const timeProgress = useMotionValue(startDate);

  // Refs for direct DOM manipulation (better performance for rapid text updates)
  const monthRef = useRef<HTMLSpanElement>(null);
  const dayRef = useRef<HTMLSpanElement>(null);
  const yearRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    // Start the animation after a small delay
    const timeout = setTimeout(() => {
      const controls = animate(timeProgress, endDate, {
        duration: 6, // 6 seconds for the full year transition
        // Custom Bezier: Very slow start -> Extreme acceleration -> Very slow stop
        ease: [0.85, 0, 0.15, 1],
        onUpdate: (latest) => {
          const date = new Date(latest);

          // Update DOM directly
          if (monthRef.current) {
            monthRef.current.innerText = (date.getMonth() + 1).toString().padStart(2, '0');
          }
          if (dayRef.current) {
            dayRef.current.innerText = date.getDate().toString().padStart(2, '0');
          }
          if (yearRef.current) {
            yearRef.current.innerText = date.getFullYear().toString();
          }
        },
        onComplete: () => {
          setIsFinished(true);
          setTimeout(onComplete, 2000); // Wait a bit before exiting
        }
      });

      return () => controls.stop();
    }, 1000);

    return () => clearTimeout(timeout);
  }, [timeProgress, endDate, onComplete]);

  return (
    <div className="relative z-10 flex flex-col items-center justify-center h-screen w-full text-center perspective-1000">

      {/* 3D Container for the Date */}
      <motion.div
        initial={{ rotateX: 20, opacity: 0, z: -200 }}
        animate={{ rotateX: 0, opacity: 1, z: 0 }}
        transition={{ duration: 1 }}
        className="preserve-3d flex flex-col items-center"
      >
        <div className="text-xl md:text-2xl font-serif italic text-rose-200/70 tracking-[0.2em] mb-8 uppercase translate-z-10">
          El tiempo vuela
        </div>

        {/* The Rolling Counter */}
        <motion.div
          className="flex items-center gap-2 md:gap-4 text-3xl md:text-6xl font-pixel text-rose-100 bg-slate-900/50 backdrop-blur-sm p-6 md:p-8 rounded-xl border border-rose-500/10 shadow-[0_0_50px_rgba(244,63,94,0.1)]"
          animate={{
            rotateX: isFinished ? 0 : [10, -10, 10], // Gentle rocking
            scale: isFinished ? 1.1 : 1
          }}
          transition={{
            rotateX: { repeat: Infinity, duration: 3, ease: "easeInOut" },
            scale: { duration: 0.5 }
          }}
          style={{ transformStyle: 'preserve-3d' }}
        >
          {/* Day (DD) */}
          <div className="relative overflow-hidden w-[2.2em] text-center">
            <span ref={dayRef} className="block">14</span>
          </div>

          <span className="text-rose-500/50 font-pixel pb-2 text-2xl md:text-4xl">/</span>

          {/* Month (MM) */}
          <div className="relative overflow-hidden w-[2.2em] text-center">
            <span ref={monthRef} className="block">12</span>
          </div>

          <span className="text-rose-500/50 font-pixel pb-2 text-2xl md:text-4xl">/</span>

          {/* Year (YYYY) */}
          <div className="relative overflow-hidden w-[3.5em] text-center text-rose-200">
            <span ref={yearRef} className="block">2024</span>
          </div>
        </motion.div>

        {/* 3D Reflection/Shadow */}
        <div className="mt-8 h-4 w-64 bg-rose-500/20 blur-xl rounded-[100%] transform rotate-x-[60deg]" />

        {isFinished && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="absolute top-[130%] w-full"
          >
            <h2 className="text-3xl md:text-5xl font-pixel text-rose-100 drop-shadow-lg leading-snug">
              365 días<br />contigo
            </h2>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default Timeline;