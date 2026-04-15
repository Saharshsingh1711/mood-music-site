'use client';

import { motion } from 'framer-motion';
import { Sparkles, Brain, Zap, Heart } from 'lucide-react';

export default function About() {
  const features = [
    {
      icon: Brain,
      title: "AI Mood Detection",
      description: "Our advanced NLP engine understands your feelings from just a few words. No more scrolling through endless playlists."
    },
    {
      icon: Zap,
      title: "Instant curation",
      description: "Music that matches your vibe in milliseconds. From high-energy gym sessions to deep-focus work deeply integrated with your flow."
    },
    {
      icon: Heart,
      title: "Personalized Library",
      description: "VibeFlow learns from your likes and builds a soundscape that evolves with you. The more you listen, the better it gets."
    }
  ];

  return (
    <section id="about" className="py-24 relative overflow-hidden px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-purple-400 font-black uppercase tracking-[0.3em] text-xs mb-4"
          >
            What is VibeFlow?
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-black text-white tracking-tight"
          >
            The Soundtrack of Your Life, <br />
            <span className="text-white/20 italic">Redefined.</span>
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -10 }}
              className="glass p-10 rounded-[2.5rem] border border-white/5 bg-white/[0.02] hover:bg-white/[0.05] transition-all group"
            >
              <div className="w-14 h-14 rounded-2xl bg-purple-500/10 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                <feature.icon className="w-8 h-8 text-purple-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-4 uppercase tracking-wider">{feature.title}</h3>
              <p className="text-white/40 leading-relaxed font-medium">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
