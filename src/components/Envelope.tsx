import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface EnvelopeProps {
  onOpen: () => void;
  onStartTransition?: () => void;
}

const Envelope: React.FC<EnvelopeProps> = ({ onOpen, onStartTransition }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    if (isOpen) return;
    setIsOpen(true);
    if (onStartTransition) onStartTransition();

    // Wait for flap animation (0.4s) + letter slide (0.4s) + zoom start
    setTimeout(onOpen, 1400);
  };

  return (
    <div className="relative flex justify-center items-center h-[320px] w-full perspective-1000">
      <motion.div
        className="relative w-[320px] h-[220px] bg-rose-900 shadow-2xl cursor-pointer"
        onClick={handleClick}
        initial={{ y: 0, scale: 1 }}
        animate={{
          y: isOpen ? 100 : 0,
          scale: isOpen ? 35 : 1, // Increased scale for deeper immersion
          opacity: isOpen ? 0 : 1,
        }}
        transition={{
          y: { delay: 0.6, duration: 1, ease: "easeIn" },
          scale: { delay: 0.6, duration: 1.5, ease: [0.6, 0.05, -0.01, 0.9] },
          opacity: { delay: 1.8, duration: 0.3 }
        }}
      >
        {/* 1. Envelope Back (Darkest) - Base Layer */}
        <div className="absolute inset-0 bg-rose-950 rounded-sm overflow-hidden border border-rose-900/50">
          <div className="absolute inset-0 bg-black/20 z-0"></div>
        </div>

        {/* 2. The Letter Card (Slides up) */}
        <motion.div
          className="absolute left-4 right-4 bottom-4 h-48 bg-rose-50 rounded-sm shadow-md z-10 flex flex-col p-6 items-center gap-4"
          animate={{
            y: isOpen ? -100 : 0,
          }}
          transition={{
            delay: 0.3,
            duration: 0.6,
            ease: "easeInOut"
          }}
        >
          <div className="w-full h-1 bg-rose-200/50 rounded-full"></div>
          <div className="w-full h-1 bg-rose-200/50 rounded-full"></div>
          <div className="w-2/3 h-1 bg-rose-200/50 rounded-full"></div>
          <div className="mt-auto text-rose-400 text-3xl">♥</div>
        </motion.div>

        {/* 3. Side Folds (Left & Right) */}
        {/* Using borders to create triangles that cover the sides */}
        <div className="absolute inset-0 z-20 pointer-events-none">
          {/* Left Triangle: Pointing to center */}
          <div className="absolute left-0 top-0 
                border-l-[160px] border-l-rose-900 
                border-t-[110px] border-t-transparent 
                border-b-[110px] border-b-transparent"
          />

          {/* Right Triangle: Pointing to center */}
          <div className="absolute right-0 top-0 
                border-r-[160px] border-r-rose-900 
                border-t-[110px] border-t-transparent 
                border-b-[110px] border-b-transparent"
          />
        </div>

        {/* 4. Bottom Fold (Lighter than sides, Taller to cover letter) */}
        {/* Triangle pointing up */}
        <div className="absolute bottom-0 left-0 right-0 z-30 pointer-events-none filter drop-shadow-md">
          <div className="
                border-b-[130px] border-b-rose-800 
                border-l-[160px] border-l-transparent 
                border-r-[160px] border-r-transparent"
          />
        </div>

        {/* 5. Top Flap (Lightest, opens up) */}
        <motion.div
          className="absolute top-0 left-0 right-0 z-40 origin-top pointer-events-none drop-shadow-xl"
          animate={{ rotateX: isOpen ? 180 : 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          style={{ transformStyle: 'preserve-3d' }}
        >
          {/* The Flap Triangle pointing down */}
          <div className="relative
                 border-t-[130px] border-t-rose-700 
                 border-l-[160px] border-l-transparent 
                 border-r-[160px] border-r-transparent"
          >
            {/* Sticker Seal - Positioned at the tip of the triangle */}
            <motion.div
              className="absolute z-50 w-10 h-10 bg-rose-400 rounded-full flex items-center justify-center text-rose-900 shadow-md border border-rose-300/30"
              // Manually positioning based on geometry: 
              // Since border-t sits "above" the content box conceptually in some layouts, but for 0x0 content it extends.
              // We position relative to the container div.
              style={{
                top: '-65px', // Adjusted to sit on the tip of the flap
                left: '-20px' // Center horizontally (width is 40px, so -20px)
              }}
              animate={{ opacity: isOpen ? 0 : 1 }}
              transition={{ duration: 0.2 }}
            >
              <span className="text-sm">♥</span>
            </motion.div>
          </div>
        </motion.div>

      </motion.div>

      {/* Helper Text */}
      {!isOpen && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="absolute bottom-0 text-rose-200/40 font-pixel text-[10px] md:text-xs tracking-widest uppercase pointer-events-none"
        >
          Toca para abrir
        </motion.div>
      )}
    </div>
  );
};

export default Envelope;