'use client';

import { TwitterPost } from '@/components/templates/TwitterPost';
import { EditorControls } from '@/components/editor/EditorControls';
import { toPng } from 'html-to-image';
import { Download, RefreshCw, Sparkles, ChevronLeft, Layout } from 'lucide-react';
import { usePostStore } from '@/store/usePostStore';
import { cn } from '@/lib/utils';
import Link from 'next/link';

export default function CreatePage() {
  const { reset, globalTheme } = usePostStore();
  const isGlobalDark = globalTheme === 'dark';

  const handleDownload = async () => {
    const node = document.getElementById('tweet-canvas');
    if (!node) return;

    const dataUrl = await toPng(node, { quality: 1.0, pixelRatio: 2 });
    const link = document.createElement('a');
    link.download = 'flexpost-mockup.png';
    link.href = dataUrl;
    link.click();
  };

  return (
    <main
      className={cn(
        // Fix the height to 100vh so the window doesn't scroll (Desktop)
        "h-screen w-full overflow-hidden transition-colors duration-300 ease-in-out selection:bg-blue-500/30 flex flex-col",
        isGlobalDark ? "bg-[#171717]" : "bg-[#EAF2FF]"
      )}
    >

      {/* 1. TOP HEADER (Fixed Height: 64px) */}
      <nav className={cn(
        "h-16 shrink-0 flex items-center justify-between px-6 border-b z-50",
        isGlobalDark ? "bg-[#171717] border-white/5" : "bg-[#EAF2FF] border-blue-100"
      )}>

        <Link
          href="/"
          className={cn(
            "flex items-center gap-2 text-sm font-semibold transition-all hover:opacity-70 group",
            isGlobalDark ? "text-slate-300" : "text-slate-600"
          )}
        >
          <div className={cn(
            "p-1.5 rounded-full transition-colors group-hover:bg-slate-200/20",
            isGlobalDark ? "bg-white/5" : "bg-white border border-slate-200"
          )}>
            <ChevronLeft size={16} />
          </div>
          <span>Back</span>
        </Link>

        <span className={cn("text-sm font-bold tracking-widest uppercase opacity-40 hidden sm:block", isGlobalDark ? "text-white" : "text-slate-900")}>
          Studio
        </span>

        {/* Empty div to balance flex */}
        <div className="w-20" />
      </nav>


      {/* 2. MAIN WORKSPACE (Takes remaining height) */}
      <div className="flex-1 flex overflow-hidden">

        {/* --- LEFT SIDEBAR: SCROLLABLE CONTROLS --- */}
        <aside className={cn(
          "w-full max-w-[400px] h-full overflow-y-auto border-r p-6 custom-scrollbar z-20",
          isGlobalDark ? "border-white/5 bg-[#171717]" : "border-blue-100/50 bg-[#EAF2FF]/50"
        )}>

          <div className="space-y-6 pb-0">
            {/* Header */}
            <div className="space-y-1">
              <div className="flex items-center gap-3 mb-2">
                <div className={cn("p-2 rounded-xl", isGlobalDark ? " text-blue-400" : " text-neutral-900 shadow-lg shadow-blue-500/30")}>
                  <Layout size={20} />
                </div>
                <h1 className={cn("text-xl font-bold tracking-tight", isGlobalDark ? "text-white" : "text-slate-900")}>
                  Settings
                </h1>
              </div>
            </div>

            <div className={cn("h-px w-full", isGlobalDark ? "bg-white/10" : "bg-slate-200/60")} />

            {/* The Actual Controls */}
            <EditorControls />
          </div>
        </aside>


        {/* --- RIGHT CANVAS: CENTERED PREVIEW --- */}
        <div className="flex-1 h-full relative flex flex-col items-center justify-center p-8 overflow-hidden">

          {/* Background Pattern for Canvas Area */}
          <div className={cn(
            "absolute inset-0 pointer-events-none transition-opacity duration-300",
            isGlobalDark
              ? "bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:24px_24px] opacity-[0.03]"
              : "bg-[radial-gradient(#94a3b8_1px,transparent_1px)] [background-size:24px_24px] opacity-[0.15]"
          )} />

          {/* Glow Effect */}
          <div className={cn(
            "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full blur-[100px] pointer-events-none transition-colors duration-500",
            isGlobalDark ? "bg-blue-600/10" : "bg-purple-500/10"
          )} />

          {/* The Tweet - Centered */}
          <div className="relative z-10 scale-[0.85] md:scale-95 xl:scale-100 transition-transform duration-300">
            <TwitterPost id="tweet-canvas" />
          </div>

          {/* Floating Action Bar - Fixed relative to Canvas */}
          <div className={cn(
            "mt-8 flex items-center gap-4 backdrop-blur-xl p-2 pl-4 rounded-full border shadow-2xl transition-all duration-300 hover:scale-105 z-30",
            isGlobalDark
              ? "bg-white/5 border-white/10 text-white shadow-black/40"
              : "bg-white/80 border-white/60 text-slate-700 shadow-xl shadow-blue-900/5 ring-1 ring-white/50"
          )}>
            <button
              onClick={reset}
              className="p-2 rounded-full hover:bg-red-500/10 hover:text-red-500 transition-colors"
              title="Reset Canvas"
            >
              <RefreshCw size={20} />
            </button>

            <div className={cn("w-px h-6 opacity-20", isGlobalDark ? "bg-white" : "bg-black")} />

            <button
              onClick={handleDownload}
              className={cn(
                "flex items-center gap-2 px-6 py-3 text-sm font-bold rounded-full transition-all shadow-lg",
                isGlobalDark
                  ? "bg-white text-black hover:bg-blue-50 shadow-white/5"
                  : "bg-slate-900 text-white hover:bg-black shadow-slate-900/20"
              )}
            >
              <Download size={18} />
              <span>Export PNG</span>
            </button>
          </div>

        </div>

      </div>
    </main>
  );
}