'use client';

import { useState, useEffect } from 'react';
import { ArrowRight, Sparkles, CheckCircle2, LayoutTemplate, Star } from 'lucide-react';
import { usePostStore } from '@/store/usePostStore';
import { cn } from '@/lib/utils';
import Link from 'next/link';

export const Hero = () => {
  const { globalTheme } = usePostStore();
  const isDark = globalTheme === 'dark';

  const [userCount, setUserCount] = useState<number>(0);

  useEffect(() => {
    // Fetch the real count from our local file API
    fetch('/api/analytics')
      .then((res) => res.json())
      .then((data) => {
        if (data.clicks !== undefined) setUserCount(data.clicks);
      })
      .catch((err) => console.error('Failed to load count', err));
  }, []);

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
            onClick={() => {
              fetch('/api/analytics', { method: 'POST' }).catch(() => { });
            }}
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

          {/* Secondary Button - Updated to Link */}
          <Link
            href="/templates"
            className={cn(
              "flex items-center gap-3 px-8 py-4 text-base font-bold border rounded-full transition-all hover:scale-105",
              isDark
                ? "bg-white/5 border-white/10 text-white hover:bg-white/10"
                : "bg-white border-slate-200 text-slate-600 hover:bg-slate-50"
            )}
          >
            <LayoutTemplate size={18} />
            <span>Browse Templates</span>
          </Link>
        </div>

        {/* Social Proof / Features */}
        <div className="flex flex-col items-center gap-6 mt-4">
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

          {/* User Counter / Avatar Group */}
          <div className={cn(
            "flex items-center gap-3 sm:gap-4 py-2 px-4 sm:py-2.5 sm:px-6 rounded-full border backdrop-blur-md transition-all duration-300 shadow-xl hover:scale-105 hover:shadow-2xl cursor-default",
            isDark
              ? "bg-slate-900/40 border-white/10 shadow-black/20 hover:bg-slate-900/60"
              : "bg-white/40 border-white/60 shadow-blue-900/5 hover:bg-white/60"
          )}>
            <div className="flex -space-x-2">
              {[
                "https://i.pravatar.cc/100?img=1",
                "https://i.pravatar.cc/100?img=2",
                "https://i.pravatar.cc/100?img=3",
                "https://i.pravatar.cc/100?img=4",
                "https://i.pravatar.cc/100?img=5"
              ].map((src, i) => (
                <img
                  key={i}
                  className="w-7 h-7 sm:w-8 sm:h-8 rounded-full border-2 border-white dark:border-slate-900 object-cover"
                  src={src}
                  alt={`User avatar ${i + 1}`}
                />
              ))}
            </div>
            <div className="flex flex-col items-start">
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((_, i) => (
                  <Star 
                    key={i} 
                    className={cn(
                      "w-3.5 h-3.5 text-yellow-400",
                      i < 4 ? "fill-current" : "fill-transparent opacity-50"
                    )} 
                  />
                ))}
              </div>
              <span className={cn(
                "text-[10px] sm:text-xs font-semibold tabular-nums",
                isDark ? "text-slate-300" : "text-slate-700"
              )}>
                Trusted by {userCount.toLocaleString()}+ creators
              </span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};