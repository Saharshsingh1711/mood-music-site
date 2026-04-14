'use client';

import { motion } from 'framer-motion';
import { Mood } from '@/types';
import { Sparkles, Zap, Brain, CloudRain, Flame } from 'lucide-react';
import { cn } from '@/lib/utils';

const moodConfigs: Record<Mood, { icon: any, color: string, label: string }> = {
  Chill: { icon: Sparkles, color: 'from-blue-400 to-teal-400', label: 'Chill' },
  Energetic: { icon: Zap, color: 'from-yellow-400 to-orange-500', label: 'Energetic' },
  Focus: { icon: Brain, color: 'from-purple-400 to-indigo-500', label: 'Focus' },
  Melancholic: { icon: CloudRain, color: 'from-slate-400 to-blue-600', label: 'Melancholic' },
  Intense: { icon: Flame, color: 'from-red-500 to-purple-600', label: 'Intense' }
};

interface MoodPickerProps {
  currentMood: Mood | null;
  onMoodSelect: (mood: Mood) => void;
}

export function MoodPicker({ currentMood, onMoodSelect }: MoodPickerProps) {
  return (
    <div className="flex flex-wrap justify-center gap-6 p-8">
      {(Object.entries(moodConfigs) as [Mood, typeof moodConfigs['Chill']][]).map(([mood, config]) => {
        const Icon = config.icon;
        const isActive = currentMood === mood;

        return (
          <motion.button
            key={mood}
            whileHover={{ scale: 1.05, y: -5 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onMoodSelect(mood)}
            className={cn(
              "relative flex flex-col items-center gap-3 p-6 rounded-3xl transition-all duration-300",
              "glass w-40 h-40 group",
              isActive ? "ring-2 ring-purple-500 shadow-[0_0_30px_rgba(157,80,187,0.3)]" : "hover:bg-white/5"
            )}
          >
            <div className={cn(
              "w-16 h-16 rounded-2xl flex items-center justify-center bg-gradient-to-br transition-shadow",
              config.color,
              isActive ? "shadow-lg shadow-purple-500/20" : "opacity-80 group-hover:opacity-100"
            )}>
              <Icon className="w-8 h-8 text-white" />
            </div>
            <span className={cn(
              "font-medium text-sm tracking-wide transition-colors",
              isActive ? "text-white" : "text-white/60 group-hover:text-white"
            )}>
              {config.label}
            </span>
            
            {isActive && (
              <motion.div
                layoutId="active-bg"
                className="absolute inset-0 rounded-3xl bg-purple-500/10 -z-10"
                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
              />
            )}
          </motion.button>
        );
      })}
    </div>
  );
}
