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
          The Social Mockup
          <br className="hidden md:block" />
          <span> Generator</span>
        </h1>

        {/* Subheadline */}
        <p className={cn(
          "text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed transition-colors",
          isDark ? "text-slate-400" : "text-slate-500"
        )}>
          A free and open-source tool to generate high-quality tweets and posts for your projects, presentations, or social media.
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
<button
  disabled // 👈 1. Best practice: Actually disable the button
  className={cn(
    // 👈 2. Added 'opacity-60' to visually show it's disabled
    "flex items-center gap-3 px-8 py-4 text-base font-bold border rounded-full transition-all cursor-not-allowed opacity-60",
    isDark
      ? "bg-white/5 border-white/10 text-white" // Removed hover effects
      : "bg-white border-slate-200 text-slate-600" // Removed hover effects
  )}
>
  <span>View Templates</span>

  {/* 3. The "Coming Soon" Badge */}
  <span className={cn(
      "text-[10px] uppercase tracking-wider font-extrabold px-2 py-0.5 rounded-full",
      isDark
        ? "bg-yellow-500/10 text-yellow-400 border border-yellow-500/20"
        : "bg-yellow-100 text-yellow-700 border border-yellow-200"
  )}>
      Soon
  </span>
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