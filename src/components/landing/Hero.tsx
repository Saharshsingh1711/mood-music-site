'use client';

import { motion } from 'framer-motion';
import { Play, Sparkles, Music2, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
      {/* Background Decor */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-[20%] left-[10%] w-[500px] h-[500px] bg-purple-600/20 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-[20%] right-[10%] w-[500px] h-[500px] bg-indigo-600/20 rounded-full blur-[120px] animate-pulse [animation-delay:2s]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-purple-400 text-xs font-black uppercase tracking-[0.2em] mb-8"
        >
          <Sparkles className="w-4 h-4" />
          Powered by AI Mood Analytics
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-6xl md:text-8xl font-black tracking-tight text-white mb-6 leading-[1.1]"
        >
          Your Mood, <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-500">Your Soundscape.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-xl text-white/40 max-w-2xl mx-auto mb-10 font-medium leading-relaxed"
        >
          VibeFlow uses advanced AI to analyze how you're feeling and curates the perfect soundtrack for every moment. No playlists, just vibes.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link
            href="/auth?mode=register"
            className="w-full sm:w-auto px-8 py-5 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-2xl text-white font-bold flex items-center justify-center gap-3 shadow-2xl shadow-purple-500/20 hover:scale-105 active:scale-95 transition-all group"
          >
            Start Listening Now
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link
            href="#about"
            className="w-full sm:w-auto px-8 py-5 bg-white/5 border border-white/10 rounded-2xl text-white font-bold hover:bg-white/10 transition-all"
          >
            Learn More
          </Link>
        </motion.div>

        {/* Floating Dashboard Preview Card */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="mt-20 relative max-w-4xl mx-auto"
        >
          <div className="absolute inset-0 bg-gradient-to-t from-[#030014] via-transparent to-transparent z-10" />
          <div className="glass-dark rounded-[2.5rem] border border-white/10 p-4 shadow-2xl overflow-hidden aspect-[16/9] flex items-center justify-center">
            <div className="flex flex-col items-center gap-4 text-white/10">
              <div className="w-20 h-20 rounded-full border-4 border-current flex items-center justify-center">
                <Play className="w-10 h-10 ml-2" />
              </div>
              <span className="font-black uppercase tracking-[0.5em] text-sm italic">VibeFlow Interface</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
