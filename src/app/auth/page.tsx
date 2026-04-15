'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '@/components/AuthContext';
import { Music2, Mail, Lock, User, ArrowRight, Loader2, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useRouter, useSearchParams } from 'next/navigation';

export default function AuthPage() {
  const searchParams = useSearchParams();
  const initialMode = searchParams.get('mode') === 'register' ? 'register' : 'login';
  
  const [isLogin, setIsLogin] = useState(initialMode === 'login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const { login, register, isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated) {
      router.push('/dashboard');
    }
  }, [isAuthenticated, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      if (isLogin) {
        await login({ email, password });
      } else {
        await register({ name, email, password });
        setIsLogin(true);
        setError('Registration successful! Please log in.');
      }
    } catch (err: any) {
      setError(err.message || 'Something went wrong');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4 bg-[#0a0a0a] overflow-hidden relative">
      {/* Dynamic Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-600/20 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-indigo-600/20 rounded-full blur-[120px] animate-pulse [animation-delay:2s]" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md relative z-10"
      >
        {/* Logo Section */}
        <div className="flex flex-col items-center mb-8">
          <motion.div 
            whileHover={{ scale: 1.05, rotate: 5 }}
            className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center shadow-2xl shadow-purple-500/40 mb-4"
          >
            <Music2 className="w-10 h-10 text-white" />
          </motion.div>
          <h1 className="text-3xl font-black tracking-tight text-white mb-2">VibeFlow</h1>
          <p className="text-white/40 font-medium">Your mood, your music, your vibe.</p>
        </div>

        {/* Auth Card */}
        <div className="glass-dark rounded-[2.5rem] p-8 border border-white/5 shadow-2xl backdrop-blur-3xl overflow-hidden relative group">
          <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          
          <div className="flex justify-between mb-8 p-1 bg-white/5 rounded-2xl relative z-10">
            <button
              onClick={() => setIsLogin(true)}
              className={cn(
                "flex-1 py-3 rounded-xl text-sm font-bold transition-all relative",
                isLogin ? "text-white" : "text-white/40 hover:text-white/60"
              )}
            >
              {isLogin && (
                <motion.div 
                  layoutId="activeTab" 
                  className="absolute inset-0 bg-white/10 rounded-xl"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
              <span className="relative z-10">Sign In</span>
            </button>
            <button
              onClick={() => setIsLogin(false)}
              className={cn(
                "flex-1 py-3 rounded-xl text-sm font-bold transition-all relative",
                !isLogin ? "text-white" : "text-white/40 hover:text-white/60"
              )}
            >
              {!isLogin && (
                <motion.div 
                  layoutId="activeTab" 
                  className="absolute inset-0 bg-white/10 rounded-xl"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
              <span className="relative z-10">Create Account</span>
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4 relative z-10">
            <AnimatePresence mode="wait">
              {!isLogin && (
                <motion.div
                  key="name-field"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="relative group"
                >
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/20 group-focus-within:text-purple-400 transition-colors" />
                  <input
                    type="text"
                    required
                    placeholder="Full Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 outline-none focus:border-purple-500/50 focus:bg-white/10 transition-all text-sm backdrop-blur-md text-white placeholder:text-white/20"
                  />
                </motion.div>
              )}
            </AnimatePresence>

            <div className="relative group">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/20 group-focus-within:text-purple-400 transition-colors" />
              <input
                type="email"
                required
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 outline-none focus:border-purple-500/50 focus:bg-white/10 transition-all text-sm backdrop-blur-md text-white placeholder:text-white/20"
              />
            </div>

            <div className="relative group">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/20 group-focus-within:text-purple-400 transition-colors" />
              <input
                type="password"
                required
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 outline-none focus:border-purple-500/50 focus:bg-white/10 transition-all text-sm backdrop-blur-md text-white placeholder:text-white/20"
              />
            </div>

            {error && (
              <motion.p
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className={cn(
                  "text-xs font-bold px-4 py-3 rounded-xl border",
                  error.includes('successful') 
                    ? "bg-green-500/10 border-green-500/30 text-green-400"
                    : "bg-red-500/10 border-red-500/30 text-red-400"
                )}
              >
                {error}
              </motion.p>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white rounded-2xl py-4 font-bold flex items-center justify-center gap-2 shadow-xl shadow-purple-500/20 active:scale-[0.98] transition-all disabled:opacity-50 disabled:scale-100"
            >
              {isLoading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <>
                  {isLogin ? 'Sign In' : 'Create Account'}
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>
          </form>

          <div className="mt-8 flex flex-col items-center gap-4 relative z-10">
            <div className="flex items-center gap-4 w-full text-white/10">
              <div className="h-px bg-current flex-1" />
              <span className="text-[10px] font-black uppercase tracking-widest text-white/20">Secured Access</span>
              <div className="h-px bg-current flex-1" />
            </div>
            
            <p className="text-white/30 text-[10px] uppercase font-black tracking-widest text-center">
              Powered by VibeFlow Intelligence
            </p>
          </div>
        </div>
      </motion.div>

      {/* Floating Sparkles for extra premium feel */}
      <div className="absolute top-1/4 right-1/4 animate-bounce [animation-duration:3s]">
        <Sparkles className="w-4 h-4 text-purple-400/20" />
      </div>
      <div className="absolute bottom-1/4 left-1/4 animate-bounce [animation-duration:4s]">
        <Sparkles className="w-6 h-6 text-indigo-400/10" />
      </div>
    </div>
  );
}
