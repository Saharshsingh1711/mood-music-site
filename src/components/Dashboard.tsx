'use client';

import { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mood, Song, ApiResponse } from '@/types';
import { MoodPicker } from '@/components/MoodPicker';
import { MusicPlayer } from '@/components/MusicPlayer';
import { Search, Music2, TrendingUp, Compass, Loader2, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';
import { detectMoodFromText, getPhraseMatch } from '@/lib/nlp';

export default function Dashboard() {
  const [selectedMood, setSelectedMood] = useState<Mood | null>(null);
  const [songs, setSongs] = useState<Song[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentSongIndex, setCurrentSongIndex] = useState<number>(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [nlpMatch, setNlpMatch] = useState<Mood | null>(null);
  const [nlpConfidence, setNlpConfidence] = useState(0);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  // Fetch songs from API
  useEffect(() => {
    async function fetchSongs() {
      setLoading(true);
      try {
        const url = selectedMood ? `/api/songs?mood=${selectedMood}` : '/api/songs';
        const res = await fetch(url);
        const data: ApiResponse<Song[]> = await res.json();
        if (data.success && data.songs) {
          setSongs(data.songs);
          setCurrentSongIndex(0);
        }
      } catch (error) {
        console.error('Failed to fetch songs:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchSongs();
  }, [selectedMood]);

  // NLP Search Logic with Debounce
  useEffect(() => {
    const analyzeText = async () => {
      if (searchTerm.length < 3) {
        setNlpMatch(null);
        setNlpConfidence(0);
        return;
      }

      setIsAnalyzing(true);
      try {
        const res = await fetch('/api/nlp/analyze', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ text: searchTerm })
        });
        const data = await res.json();
        
        if (data.success && data.analysis.mood && !data.analysis.isNegated) {
          setNlpMatch(data.analysis.mood);
          setNlpConfidence(data.analysis.confidence);
          
          // Auto-match if confidence is high (> 80%)
          if (data.analysis.confidence > 0.8) {
            setSelectedMood(data.analysis.mood);
            setSearchTerm('');
            setNlpMatch(null);
          }
        } else {
          setNlpMatch(null);
          setNlpConfidence(0);
        }
      } catch (error) {
        console.error('NLP analysis failed:', error);
      } finally {
        setIsAnalyzing(false);
      }
    };

    const debounceTimer = setTimeout(analyzeText, 500);
    return () => clearTimeout(debounceTimer);
  }, [searchTerm]);

  const currentSong = songs[currentSongIndex] || null;

  const handleNext = () => {
    if (songs.length === 0) return;
    setCurrentSongIndex((prev) => (prev + 1) % songs.length);
  };

  const handlePrevious = () => {
    if (songs.length === 0) return;
    setCurrentSongIndex((prev) => (prev - 1 + songs.length) % songs.length);
  };

  const applyNlpMatch = () => {
    if (nlpMatch) {
      setSelectedMood(nlpMatch);
      setSearchTerm('');
      setNlpMatch(null);
      setNlpConfidence(0);
    }
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
        <header className="flex flex-col gap-4 mb-12">
          <div className="relative w-full max-w-xl group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30 group-focus-within:text-purple-400 transition-colors" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="How are you feeling? (e.g., 'need some focus', 'ready for gym')"
              className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 outline-none focus:border-purple-500/50 focus:bg-white/10 transition-all text-sm backdrop-blur-md"
            />
            
            <AnimatePresence>
              {isAnalyzing && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute right-4 top-1/2 -translate-y-1/2"
                >
                  <Loader2 className="w-4 h-4 text-purple-400 animate-spin" />
                </motion.div>
              )}

              {nlpMatch && !isAnalyzing && (
                <motion.button
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  onClick={applyNlpMatch}
                  className="absolute right-2 top-2 bottom-2 px-4 glass-dark rounded-xl flex items-center gap-2 text-xs font-bold text-purple-400 hover:text-white transition-all group overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-indigo-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                  <Sparkles className="w-3 h-3 relative z-10" />
                  <span className="relative z-10">Match: {nlpMatch} ({Math.round(nlpConfidence * 100)}%)</span>
                </motion.button>
              )}
            </AnimatePresence>
          </div>
          <div className="flex items-center gap-2 px-1">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span className="text-[10px] text-white/30 font-bold uppercase tracking-widest">Magic Search Active</span>
          </div>
        </header>

        <section className="mb-12">
          <motion.h2
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-4xl font-bold mb-2 tracking-tight"
          >
            Your Personal Soundscape
          </motion.h2>
          <p className="text-white/40 mb-8">Select a mood or use the NLP search to find your rhythm.</p>
          <MoodPicker currentMood={selectedMood} onMoodSelect={setSelectedMood} />
        </section>

        <section>
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold flex items-center gap-2">
              {selectedMood ? `${selectedMood} Mix` : 'Trending Now'}
              {!loading && <span className="text-sm font-normal text-white/40">({songs.length} tracks)</span>}
            </h3>
          </div>

          {loading ? (
            <div className="flex flex-col items-center justify-center py-24 gap-4">
              <Loader2 className="w-10 h-10 text-purple-500 animate-spin" />
              <p className="text-white/20 font-medium">Syncing your vibes...</p>
            </div>
          ) : songs.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-24 glass rounded-3xl">
              <p className="text-white/40 mb-4 text-center">No tracks found for this mood yet.<br/>Would you like to seed the database?</p>
              <button 
                onClick={() => window.open('/api/seed', '_blank')}
                className="px-6 py-2 bg-white/10 hover:bg-white/20 rounded-full transition-all text-sm font-bold"
              >
                Seed Database
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              <AnimatePresence mode="popLayout">
                {songs.map((song, index) => (
                  <motion.div
                    key={song.id || index}
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
          )}
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
