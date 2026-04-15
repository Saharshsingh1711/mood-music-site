'use client';

import { Music2 } from 'lucide-react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="py-20 border-t border-white/5 bg-black/40 backdrop-blur-3xl px-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-10">
        <div className="flex flex-col items-center md:items-start gap-4">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center shadow-lg">
              <Music2 className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-black tracking-tight text-white">VibeFlow</span>
          </Link>
          <p className="text-white/20 text-sm font-medium text-center md:text-left">
            Crafting personal soundscapes <br /> through the power of AI.
          </p>
        </div>

        <div className="flex items-center gap-12">
           <div className="flex flex-col gap-4 text-center md:text-left">
              <span className="text-[10px] font-black uppercase tracking-widest text-white/40">Product</span>
              <Link href="#about" className="text-sm font-bold text-white/20 hover:text-white transition-colors">About</Link>
              <Link href="#workflow" className="text-sm font-bold text-white/20 hover:text-white transition-colors">Workflow</Link>
           </div>
           <div className="flex flex-col gap-4 text-center md:text-left">
              <span className="text-[10px] font-black uppercase tracking-widest text-white/40">Legal</span>
              <Link href="#" className="text-sm font-bold text-white/20 hover:text-white transition-colors">Privacy</Link>
              <Link href="#" className="text-sm font-bold text-white/20 hover:text-white transition-colors">Terms</Link>
           </div>
        </div>

        <div className="flex flex-col items-center md:items-end gap-2">
            <span className="text-[10px] font-black uppercase tracking-widest text-white/10">© 2026 VibeFlow AI</span>
            <span className="text-[10px] font-black uppercase tracking-widest text-white/10 italic">Design by Antigravity</span>
        </div>
      </div>
    </footer>
  );
}
