'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mood, Song } from '@/types';
import { MOCK_SONGS } from '@/lib/mockData';
import { MoodPicker } from '@/components/MoodPicker';
import { MusicPlayer } from '@/components/MusicPlayer';
import { Search, Music2, TrendingUp, Compass } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function Dashboard() {
  const [selectedMood, setSelectedMood] = useState<Mood | null>(null);
  const [currentSongIndex, setCurrentSongIndex] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const filteredSongs = useMemo(() => {
    if (!selectedMood) return MOCK_SONGS;
    return MOCK_SONGS.filter(song => song.mood === selectedMood);
  }, [selectedMood]);

  const currentSong = filteredSongs[currentSongIndex] || null;

  const handleNext = () => {
    setCurrentSongIndex((prev) => (prev + 1) % filteredSongs.length);
  };

  const handlePrevious = () => {
    setCurrentSongIndex((prev) => (prev - 1 + filteredSongs.length) % filteredSongs.length);
  };

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-20 lg:w-64 border-r border-white/5 flex flex-col p-6 gap-8 bg-black/20 backdrop-blur-3xl fixed h-full z-40">
        <div className="flex items-center gap-3 px-2">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-purple-500/20">
            <Music2 className="w-6 h-6 text-white" />
          </div>
          <span className="text-xl font-bold tracking-tight hidden lg:block">VibeFlow</span>
        </div>

        <nav className="flex flex-col gap-2 mt-4">
          {[
            { icon: Compass, label: 'Discover', active: true },
            { icon: TrendingUp, label: 'Trending', active: false },
            { icon: Music2, label: 'Library', active: false },
          ].map((item) => (
            <button
              key={item.label}
              className={cn(
                "flex items-center gap-4 p-3 rounded-xl transition-all",
                item.active ? "bg-white/10 text-white" : "text-white/40 hover:text-white hover:bg-white/5"
              )}
            >
              <item.icon className="w-5 h-5" />
              <span className="font-medium hidden lg:block">{item.label}</span>
            </button>
          ))}
        </nav>

      </aside>

      {/* Main Content */}
      <main className="flex-1 ml-20 lg:ml-64 p-8 pb-32">
        <header className="flex items-center justify-between mb-12">
          <div className="relative w-full max-w-md group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30 group-focus-within:text-purple-400 transition-colors" />
            <input
              type="text"
              placeholder="Search artists, songs, or moods..."
              className="w-full bg-white/5 border border-white/10 rounded-2xl py-3 pl-12 pr-4 outline-none focus:border-purple-500/50 focus:bg-white/10 transition-all text-sm"
            />
          </div>
        </header>

        <section className="mb-12">
          <motion.h2
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-4xl font-bold mb-2 tracking-tight"
          >
            How are you feeling today?
          </motion.h2>
          <p className="text-white/40 mb-8">Select a mood to start your personalized flow.</p>
          <MoodPicker currentMood={selectedMood} onMoodSelect={setSelectedMood} />
        </section>

        <section>
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold flex items-center gap-2">
              {selectedMood ? `${selectedMood} Mix` : 'Your Daily Mix'}
              <span className="text-sm font-normal text-white/40">({filteredSongs.length} tracks)</span>
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            <AnimatePresence mode="popLayout">
              {filteredSongs.map((song, index) => (
                <motion.div
                  key={song.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  whileHover={{ y: -8 }}
                  onClick={() => setCurrentSongIndex(index)}
                  className={cn(
                    "glass p-4 rounded-3xl cursor-pointer group transition-all",
                    currentSong?.id === song.id ? "ring-2 ring-purple-500 bg-purple-500/5" : "hover:bg-white/10"
                  )}
                >
                  <div className="relative aspect-square mb-4 rounded-2xl overflow-hidden shadow-2xl">
                    <img
                      src={song.coverUrl}
                      alt={song.title}
                      className="object-cover w-full h-full transform group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className={cn(
                      "absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity",
                      currentSong?.id === song.id && "opacity-100"
                    )}>
                      <div className="w-12 h-12 rounded-full bg-purple-500 flex items-center justify-center shadow-xl">
                        <Music2 className="w-6 h-6 text-white animate-pulse" />
                      </div>
                    </div>
                  </div>
                  <h4 className="font-semibold truncate group-hover:text-purple-400 transition-colors uppercase tracking-wider text-xs mb-1">
                    {song.mood}
                  </h4>
                  <h4 className="font-bold truncate text-lg">{song.title}</h4>
                  <p className="text-sm text-white/40 truncate">{song.artist}</p>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </section>
      </main>

      <MusicPlayer
        currentSong={currentSong}
        onNext={handleNext}
        onPrevious={handlePrevious}
      />
    </div>
  );
}
