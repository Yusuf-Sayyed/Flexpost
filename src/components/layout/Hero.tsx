'use client';

import { ArrowRight, Sparkles, CheckCircle2 } from 'lucide-react';
import { usePostStore } from '@/store/usePostStore';
import { cn } from '@/lib/utils';
import Link from 'next/link';

export const Hero = () => {
  const { globalTheme } = usePostStore();
  const isDark = globalTheme === 'dark';

  const scrollToEditor = () => {
    const editor = document.getElementById('design-studio');
    if (editor) {
      editor.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-32 overflow-hidden">

      {/* Background Gradients - Adjusted for Dark Mode */}
      <div
        className={cn(
          "absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[500px] blur-[120px] rounded-full pointer-events-none -z-10 transition-colors duration-500",
          isDark ? "bg-blue-500/10" : "bg-blue-400/20"
        )}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">

        {/* Badge */}
        <div className={cn(
          "inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide mb-8 animate-fade-in-up transition-colors",
          isDark
            ? "bg-blue-500/10 border border-blue-500/20 text-blue-400"
            : "bg-blue-50 border border-blue-100 text-blue-600"
        )}>
          <Sparkles size={14} />
          <span>v1.0 Now Live</span>
        </div>

        {/* Headline */}
        <h1 className={cn(
          "text-5xl md:text-7xl font-extrabold tracking-tight mb-6 leading-tight transition-colors",
          isDark ? "text-white" : "text-slate-900"
        )}>
          Create Viral <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-indigo-500">Mockups</span> <br className="hidden md:block" />
          in Seconds.
        </h1>

        {/* Subheadline */}
        <p className={cn(
          "text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed transition-colors",
          isDark ? "text-slate-400" : "text-slate-500"
        )}>
          The fastest way to design beautiful social media posts for your presentations, pitch decks, and marketing materials. No design skills required.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">

          {/* Primary Button */}
          <Link
            href="/create"
            className={cn(
              "flex items-center gap-2 px-8 py-4 text-base font-bold rounded-full transition-all shadow-xl hover:scale-105",
              isDark
                ? "bg-white text-black hover:bg-slate-200 shadow-white/10"
                : "bg-slate-900 text-white hover:bg-black shadow-slate-900/20"
            )}
          >
            Start Creating
            <ArrowRight size={18} />
          </Link>

          {/* Secondary Button */}
          <button className={cn(
            "flex items-center gap-2 px-8 py-4 text-base font-bold border rounded-full transition-all",
            isDark
              ? "bg-white/5 border-white/10 text-white hover:bg-white/10"
              : "bg-white border-slate-200 text-slate-600 hover:bg-slate-50 hover:border-slate-300"
          )}>
            View Templates
          </button>
        </div>

        {/* Social Proof / Features */}
        <div className={cn(
          "flex flex-wrap justify-center gap-x-8 gap-y-4 text-sm font-medium transition-colors",
          isDark ? "text-slate-400" : "text-slate-500"
        )}>
          <div className="flex items-center gap-2">
            <CheckCircle2 size={16} className="text-green-500" />
            <span>No Login Required</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 size={16} className="text-green-500" />
            <span>High-Res Export</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 size={16} className="text-green-500" />
            <span>100% Free</span>
          </div>
        </div>

      </div>
    </section>
  );
};