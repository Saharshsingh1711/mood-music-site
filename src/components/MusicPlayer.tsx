'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Play, Pause, SkipForward, SkipBack, 
  Volume2, VolumeX, Repeat, Shuffle,
  Heart
} from 'lucide-react';
import { Song } from '@/types';
import { formatDuration, cn } from '@/lib/utils';
import { useAuth } from '@/components/AuthContext';

interface MusicPlayerProps {
  currentSong: Song | null;
  onNext: () => void;
  onPrevious: () => void;
}

export function MusicPlayer({ currentSong, onNext, onPrevious }: MusicPlayerProps) {
  const { user, toggleFavorite } = useAuth();
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(0.7);
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const isFavorited = user?.favorites.includes(currentSong?.id || '');

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play().catch(() => setIsPlaying(false));
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying, currentSong]);

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      const current = audioRef.current.currentTime;
      const duration = audioRef.current.duration;
      setProgress((current / duration) * 100);
    }
  };

  const togglePlay = () => setIsPlaying(!isPlaying);

  if (!currentSong) return null;

  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="fixed bottom-0 left-0 right-0 z-50 p-6"
    >
      <div className="max-w-7xl mx-auto glass rounded-[2.5rem] p-4 flex items-center justify-between gap-8 border-t border-white/10 backdrop-blur-3xl shadow-2xl">
        <audio
          ref={audioRef}
          src={currentSong.audioUrl}
          onTimeUpdate={handleTimeUpdate}
          onEnded={onNext}
        />

        {/* Song Info */}
        <div className="flex items-center gap-4 w-1/4">
          <motion.img
            key={currentSong.id}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            src={currentSong.coverUrl}
            alt={currentSong.title}
            className="w-14 h-14 rounded-2xl object-cover shadow-2xl border border-white/5"
          />
          <div className="overflow-hidden">
            <h4 className="font-bold text-white truncate pr-2">{currentSong.title}</h4>
            <p className="text-sm text-white/40 truncate">{currentSong.artist}</p>
          </div>
          <button 
            onClick={() => toggleFavorite(currentSong.id || '')}
            className={cn(
              "ml-2 transition-all p-2 rounded-xl group",
              isFavorited ? "text-red-500" : "text-white/20 hover:text-white"
            )}
          >
            <Heart className={cn("w-5 h-5 transition-transform group-active:scale-75", isFavorited && "fill-current")} />
          </button>
        </div>

        {/* Controls */}
        <div className="flex flex-col items-center gap-2 flex-1 max-w-xl">
          <div className="flex items-center gap-6">
            <button className="text-white/20 hover:text-white transition-colors">
              <Shuffle className="w-4 h-4" />
            </button>
            <button onClick={onPrevious} className="text-white/60 hover:text-white transition-colors">
              <SkipBack className="w-5 h-5 fill-current" />
            </button>
            <button
              onClick={togglePlay}
              className="w-12 h-12 rounded-2xl bg-white text-black flex items-center justify-center hover:scale-110 active:scale-95 transition-all shadow-xl shadow-white/10"
            >
              {isPlaying ? <Pause className="w-5 h-5 fill-current" /> : <Play className="w-5 h-5 fill-current translate-x-0.5" />}
            </button>
            <button onClick={onNext} className="text-white/60 hover:text-white transition-colors">
              <SkipForward className="w-5 h-5 fill-current" />
            </button>
            <button className="text-white/20 hover:text-white transition-colors">
              <Repeat className="w-4 h-4" />
            </button>
          </div>

          <div className="flex items-center gap-4 w-full group">
            <span className="text-[10px] font-black text-white/20 w-10 text-right tabular-nums">
              {formatDuration(audioRef.current?.currentTime || 0)}
            </span>
            <div className="relative h-1.5 flex-1 bg-white/5 rounded-full cursor-pointer overflow-hidden backdrop-blur-md">
              <motion.div
                className="absolute top-0 left-0 h-full bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full"
                style={{ width: `${progress}%` }}
              />
            </div>
            <span className="text-[10px] font-black text-white/20 w-10 tabular-nums">
              {formatDuration(currentSong.duration)}
            </span>
          </div>
        </div>

        {/* Volume */}
        <div className="flex items-center gap-4 w-1/4 justify-end">
          <button onClick={() => setIsMuted(!isMuted)}>
            {isMuted ? <VolumeX className="w-5 h-5 text-red-500/50" /> : <Volume2 className="w-5 h-5 text-white/20 hover:text-white" />}
          </button>
          <div className="w-24 h-1.5 bg-white/5 rounded-full relative overflow-hidden group cursor-pointer backdrop-blur-md">
            <div className="absolute top-0 left-0 h-full bg-white/20 group-hover:bg-purple-500 transition-all" style={{ width: `${volume * 100}%` }} />
          </div>
        </div>
      </div>
    </motion.div>
  );
}
