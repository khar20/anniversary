import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AppStage } from './types';
import HeartBackground from './components/HeartBackground.tsx';
import Timeline from './components/Timeline.tsx';
import Letter from './components/Letter.tsx';
import Envelope from './components/Envelope.tsx';

const App: React.FC = () => {
  const [stage, setStage] = useState<AppStage>(AppStage.INTRO);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const startExperience = () => {
    setStage(AppStage.TIMELINE);
  };

  const handleTimelineComplete = () => {
    setStage(AppStage.LETTER);
  };

  return (
    <div className="relative min-h-screen w-full bg-slate-950 overflow-hidden text-rose-50 selection:bg-rose-500/30 perspective-1000">
      <style>{`
        .perspective-1000 {
          perspective: 1000px;
        }
        .preserve-3d {
          transform-style: preserve-3d;
        }
      `}</style>

      {/* Background Layer */}
      <HeartBackground />

      {/* Main Content Layer */}
      <AnimatePresence mode="wait">

        {/* Intro Stage */}
        {stage === AppStage.INTRO && (
          <motion.div
            key="intro"
            // The exit animation is now primarily handled by the Envelope component's internal zoom.
            // We just fade out the container gently.
            exit={{ opacity: 0, transition: { duration: 1 } }}
            className="relative z-10 flex flex-col items-center justify-center h-screen w-full px-4 preserve-3d"
          >
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: isTransitioning ? 0 : 1, y: isTransitioning ? -50 : 0 }}
              exit={{ opacity: 0, y: -50 }}
              transition={{ duration: isTransitioning ? 0.8 : 1 }}
              className="text-center mb-12"
            >
              <h1 className="text-4xl md:text-6xl font-pixel text-rose-100 mb-6 drop-shadow-lg leading-tight">
                Para mi amor
              </h1>
              <p className="text-rose-300/80 font-serif italic text-xl md:text-2xl tracking-widest uppercase">
                Por nuestro aniversario
              </p>
            </motion.div>

            <Envelope
              onOpen={startExperience}
              onStartTransition={() => setIsTransitioning(true)}
            />

          </motion.div>
        )}

        {/* Timeline Stage */}
        {stage === AppStage.TIMELINE && (
          <motion.div
            key="timeline"
            className="absolute inset-0 preserve-3d"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.5, filter: "blur(10px)" }}
            transition={{ duration: 1.5 }}
          >
            <Timeline onComplete={handleTimelineComplete} />
          </motion.div>
        )}

        {/* Letter Stage */}
        {stage === AppStage.LETTER && (
          <motion.div
            key="letter"
            className="absolute inset-0 overflow-y-auto custom-scrollbar preserve-3d"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <Letter />
          </motion.div>
        )}

      </AnimatePresence>
    </div>
  );
};

export default App;