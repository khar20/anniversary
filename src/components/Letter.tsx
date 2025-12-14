import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Edit3, X, Save } from 'lucide-react';
import { type LetterContent, DEFAULT_LETTER } from '../types.ts';

const Letter: React.FC = () => {
  const [content, setContent] = useState<LetterContent>(DEFAULT_LETTER);
  const [isEditing, setIsEditing] = useState(false);
  const [typingIndex, setTypingIndex] = useState(0);

  // Temporary state for editing
  const [editTitle, setEditTitle] = useState(content.title);
  const [editBody, setEditBody] = useState(content.body);
  const [editSignature, setEditSignature] = useState(content.signature);

  // Simple typing effect logic
  useEffect(() => {
    if (typingIndex < content.body.length) {
      const timeout = setTimeout(() => {
        setTypingIndex((prev) => prev + 1);
      }, 30); // Speed of typing
      return () => clearTimeout(timeout);
    }
  }, [typingIndex, content.body]);

  const openEditor = () => {
    setEditTitle(content.title);
    setEditBody(content.body);
    setEditSignature(content.signature);
    setIsEditing(true);
  };

  const handleSave = () => {
    setContent({
      title: editTitle,
      body: editBody,
      signature: editSignature
    });
    setTypingIndex(0); // Restart typing effect
    setIsEditing(false);
  };

  const displayedBody = content.body.slice(0, typingIndex);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 md:p-8 perspective-1000">
      <motion.div
        // 3D Unfold Animation
        initial={{ rotateX: 90, opacity: 0, y: -50 }}
        animate={{ rotateX: 0, opacity: 1, y: 0 }}
        transition={{
          type: "spring",
          stiffness: 100,
          damping: 20,
          delay: 0.5,
          duration: 1.5
        }}
        style={{ transformOrigin: "top", transformStyle: "preserve-3d" }}
        className="relative z-10 w-full max-w-2xl mx-auto"
      >
        {/* Paper Container */}
        <div className="relative bg-[#1a1a2e]/90 backdrop-blur-xl border border-rose-500/20 rounded-lg shadow-[0_20px_50px_rgba(225,29,72,0.15)] p-8 md:p-12 overflow-hidden transform-style-3d">

          {/* Subtle paper texture/gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none" />

          {/* Decorative Tape */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-8 bg-rose-500/30 rotate-[-2deg] blur-[0.5px] shadow-sm"></div>

          {/* Content */}
          <div className="relative z-10">
            <motion.h1
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 1 }}
              className="font-pixel text-2xl md:text-3xl text-rose-300 mb-8 drop-shadow-md"
            >
              {content.title}
            </motion.h1>

            <div className="font-serif text-lg md:text-2xl text-rose-50/90 leading-relaxed whitespace-pre-line min-h-[300px]">
              {displayedBody}
              <motion.span
                animate={{ opacity: [0, 1, 0] }}
                transition={{ repeat: Infinity, duration: 0.8 }}
                className="inline-block w-2 h-6 bg-rose-400 ml-1 align-middle box-shadow-[0_0_10px_rgba(244,63,94,0.8)]"
              />
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: typingIndex > content.body.length * 0.9 ? 1 : 0 }}
              className="mt-12 text-right"
            >
              <p className="font-pixel text-xl md:text-2xl text-rose-300">
                {content.signature}
              </p>
            </motion.div>
          </div>

          {/* Toolbar */}
          {/*
          <div className="absolute top-4 right-4 flex gap-2">
            <button
              onClick={openEditor}
              className="p-2 rounded-full text-rose-500/50 hover:text-rose-400 hover:bg-rose-500/10 transition-colors"
              title="Edit Letter"
            >
              <Edit3 size={18} />
            </button>
          </div>
          */}
        </div>
      </motion.div>

      {/* Edit Modal */}
      {isEditing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 w-full max-w-md shadow-2xl font-serif">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-rose-200 font-pixel text-lg">Edit Letter</h3>
              <button onClick={() => setIsEditing(false)} className="text-slate-500 hover:text-slate-300">
                <X size={20} />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs uppercase tracking-wider text-slate-500 mb-1 font-pixel">Greeting</label>
                <input
                  type="text"
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 rounded p-2 text-rose-100 focus:border-rose-500 outline-none text-sm"
                />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-wider text-slate-500 mb-1 font-pixel">Body</label>
                <textarea
                  value={editBody}
                  onChange={(e) => setEditBody(e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 rounded p-2 text-rose-100 focus:border-rose-500 outline-none text-sm h-48 custom-scrollbar resize-none font-serif"
                />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-wider text-slate-500 mb-1 font-pixel">Signature</label>
                <input
                  type="text"
                  value={editSignature}
                  onChange={(e) => setEditSignature(e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 rounded p-2 text-rose-100 focus:border-rose-500 outline-none text-sm"
                />
              </div>

              <button
                onClick={handleSave}
                className="w-full bg-rose-600 hover:bg-rose-500 text-white rounded py-2 font-medium transition-colors flex items-center justify-center gap-2 font-pixel text-xs"
              >
                <Save size={16} />
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Letter;