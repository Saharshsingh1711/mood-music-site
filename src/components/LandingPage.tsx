'use client';

import { SignInButton } from "@clerk/nextjs";
import { Music2, Play, Sparkles } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="relative isolate min-h-screen overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-purple-600/20 rounded-full blur-[120px] animate-pulse-slow" />
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-indigo-600/20 rounded-full blur-[120px] animate-pulse-slow delay-700" />
      
      <div className="flex flex-col items-center justify-center min-h-screen p-8 text-center relative z-10">
        <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center shadow-[0_0_50px_rgba(157,80,187,0.4)] mb-8 animate-float">
          <Music2 className="w-10 h-10 text-white" />
        </div>
        
        <h1 className="text-6xl md:text-8xl font-black mb-6 tracking-tighter bg-clip-text text-transparent bg-gradient-to-b from-white to-white/40">
          VIBEFLOW
        </h1>
        
        <p className="max-w-xl text-xl text-white/60 mb-12 leading-relaxed">
          Experience music like never before. Curated soundtracks that sync perfectly with your <span className="text-purple-400 font-semibold">emotions</span> and <span className="text-indigo-400 font-semibold">mood</span>.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4">
          <SignInButton mode="modal">
            <button className="px-10 py-4 bg-white text-black font-bold rounded-2xl hover:scale-105 transition-all flex items-center gap-2 shadow-xl shadow-white/5">
              <Play className="w-5 h-5 fill-current" />
              Experience Now
            </button>
          </SignInButton>
          
          <button className="px-10 py-4 glass rounded-2xl font-bold hover:bg-white/10 transition-all flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-purple-400" />
            Learn More
          </button>
        </div>
        
        <div className="mt-24 grid grid-cols-3 gap-12 max-w-3xl w-full">
          {[
            { label: 'Curated Moods', value: '5+' },
            { label: 'Premium Audio', value: 'HD' },
            { label: 'Vibe Match', value: '100%' },
          ].map((stat) => (
            <div key={stat.label}>
              <div className="text-3xl font-black text-white mb-1">{stat.value}</div>
              <div className="text-sm uppercase tracking-widest text-white/30 font-bold">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
