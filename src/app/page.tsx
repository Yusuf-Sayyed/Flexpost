'use client';

import { Hero } from '@/components/layout/Hero';
import { usePostStore } from '@/store/usePostStore';
import { cn } from '@/lib/utils';
import { Play } from 'lucide-react';

export default function Home() {
  const { globalTheme } = usePostStore();
  const isGlobalDark = globalTheme === 'dark';

  return (
    <main
      className={cn(
        "min-h-screen transition-colors duration-300 ease-in-out selection:bg-blue-500/30",
        isGlobalDark ? "bg-[#171717]" : "bg-[#EAF2FF]"
      )}
    >
      {/* 1. Hero Section */}
      <Hero />

{/* 2. Video Demo Section */}
      <section className="pb-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">

          <div className="text-center mb-12">
            <h2 className={cn("text-3xl font-bold tracking-tight mb-4", isGlobalDark ? "text-white" : "text-slate-900")}>
              See it in Action
            </h2>
            <p className={cn("text-lg", isGlobalDark ? "text-slate-400" : "text-slate-500")}>
              Watch how easy it is to create mockups.
            </p>
          </div>

          {/* Video Container Frame */}
          <div className={cn(
            "relative aspect-video w-full rounded-2xl overflow-hidden border shadow-2xl", // Removed 'cursor-pointer' and 'group'
            isGlobalDark
              ? "bg-slate-900 border-white/10 shadow-black/50"
              : "bg-white border-white/50 shadow-blue-900/10"
          )}>

            {/* YouTube Embed */}
            <iframe
              className="absolute inset-0 w-full h-full"
              src="https://www.youtube.com/embed/6v3Y3gSQsXY"
              title="FlexPost Demo"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            />

          </div>

        </div>
      </section>

      {/* Simple Footer
      <footer className={cn("py-12 border-t text-center text-sm", isGlobalDark ? "border-white/5 text-slate-500" : "border-slate-200/60 text-slate-400")}>
        <p>© 2026 FlexPost. Built for creators.</p>
      </footer> */}

    </main>
  );
}