'use client';

import { motion } from 'framer-motion';
import { Music2 } from 'lucide-react';
import Link from 'next/link';
import { useAuth } from '@/components/AuthContext';
import { cn } from '@/lib/utils';
import { useState, useEffect } from 'react';

export default function Navbar() {
  const { isAuthenticated } = useAuth();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Workflow', href: '#workflow' },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 py-4",
        scrolled ? "bg-black/60 backdrop-blur-xl border-b border-white/5" : "bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
            < Music2 className="w-6 h-6 text-white" />
          </div>
          <span className="text-xl font-black tracking-tight text-white">VibeFlow</span>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-sm font-bold text-white/60 hover:text-white transition-colors uppercase tracking-widest"
            >
              {link.name}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <Link
            href={isAuthenticated ? "/dashboard" : "/auth?mode=login"}
            className="px-6 py-2.5 rounded-xl border border-white/10 text-sm font-bold text-white hover:bg-white/5 transition-all"
          >
            {isAuthenticated ? "Dashboard" : "Login"}
          </Link>
          {!isAuthenticated && (
            <Link
              href="/auth?mode=register"
              className="px-6 py-2.5 rounded-xl bg-white text-black text-sm font-bold hover:bg-gray-200 transition-all shadow-xl shadow-white/5"
            >
              Get Started
            </Link>
          )}
        </div>
      </div>
    </motion.nav>
  );
}
