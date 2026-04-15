'use client';

import { motion } from 'framer-motion';
import { Search, Cpu, Play } from 'lucide-react';

export default function Workflow() {
  const steps = [
    {
      icon: Search,
      label: "Search Your Vibe",
      desc: "Tell us how you're feeling. Be specific or vague—our AI gets it either way."
    },
    {
      icon: Cpu,
      label: "AI Processing",
      desc: "VibeFlow analyzes semantic meaning, intensity, and context in real-time."
    },
    {
      icon: Play,
      label: "Instant Playback",
      desc: "Enjoy a tailored soundscape matched perfectly to your current mood."
    }
  ];

  return (
    <section id="workflow" className="py-24 relative px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-indigo-400 font-black uppercase tracking-[0.3em] text-xs mb-4"
          >
            How it works
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-black text-white tracking-tight"
          >
            From Emotion to <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-500">Audio Experience.</span>
          </motion.h2>
        </div>

        <div className="relative">
          {/* Connector Line */}
          <div className="absolute top-[30px] left-[50px] right-[50px] h-0.5 bg-white/5 hidden md:block" />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative z-10">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="flex flex-col items-center text-center group"
              >
                <div className="w-16 h-16 rounded-2xl bg-[#0a0a0a] border border-white/10 flex items-center justify-center mb-8 shadow-2xl group-hover:border-purple-500/50 transition-all duration-500 relative">
                    <div className="absolute inset-0 bg-purple-500/10 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                    <step.icon className="w-8 h-8 text-white relative z-10" />
                </div>
                <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center text-[10px] font-black mb-4 border border-white/5">0{index + 1}</div>
                <h3 className="text-xl font-bold text-white mb-4 uppercase tracking-tighter">{step.label}</h3>
                <p className="text-white/40 font-medium leading-relaxed px-4">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
