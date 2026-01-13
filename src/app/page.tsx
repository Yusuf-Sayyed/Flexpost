'use client';
import { TwitterPost } from '@/components/templates/TwitterPost';
import { EditorControls } from '@/components/editor/EditorControls';
import { Hero } from '../components/layout/Hero'; // <--- Import Hero
import { toPng } from 'html-to-image';
import { Download, RefreshCw, Sparkles } from 'lucide-react';
import { usePostStore } from '@/store/usePostStore';

export default function Home() {
  const reset = usePostStore((state) => state.reset);

  const handleDownload = async () => {
    const node = document.getElementById('tweet-canvas');
    if (!node) return;

    const dataUrl = await toPng(node, {
      quality: 1.0,
      pixelRatio: 2,
    });

    const link = document.createElement('a');
    link.download = 'flexpost-mockup.png';
    link.href = dataUrl;
    link.click();
  };

  return (
    // Main wrapper
    <main className="min-h-screen bg-slate-50">

      {/* 1. HERO SECTION (Top of page) */}
      <Hero />

      {/* 2. DESIGN STUDIO SECTION */}
      {/* Added id="design-studio" for the scroll anchor */}
      <section id="design-studio" className="py-20 px-4 sm:px-6 lg:px-8 border-t border-slate-200/60 bg-white/50">

        <div className="max-w-[1400px] mx-auto">

          {/* Main Grid Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

            {/* --- LEFT COLUMN: Settings Panel (Sticky) --- */}
            <div className="lg:col-span-4 space-y-6 lg:sticky lg:top-24 z-10">
              <div className="space-y-2 mb-2">
                 <h2 className="text-xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
                   <Sparkles className="text-blue-500" size={20} />
                   Design Studio
                 </h2>
                 <p className="text-sm text-slate-500">Customize appearance and identity.</p>
              </div>

              {/* The Controls Component */}
              <EditorControls />

              <div className="pt-4 text-center lg:text-left">
                 <p className="text-xs text-slate-400 font-medium">
                   FlexPost Beta v1.0
                 </p>
              </div>
            </div>

            {/* --- RIGHT COLUMN: The Canvas --- */}
            <div className="lg:col-span-8">

              {/* The "Canvas" Container */}
              <div className="relative min-h-[600px] w-full bg-white rounded-3xl border border-slate-200 shadow-sm flex flex-col items-center justify-center p-8 lg:p-12 overflow-hidden">

                {/* Dot Pattern Background */}
                <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-60 pointer-events-none" />

                {/* The Tweet Component */}
                <div className="relative z-10 scale-[0.85] sm:scale-100 transition-transform duration-200">
                  <TwitterPost id="tweet-canvas" />
                </div>

                {/* Floating Action Bar */}
                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex items-center gap-3 bg-white/90 backdrop-blur-md p-2 pl-3 rounded-full border border-slate-200 shadow-xl shadow-slate-200/40">

                  <button
                    onClick={reset}
                    className="flex items-center justify-center p-2.5 text-slate-500 hover:text-red-500 hover:bg-red-50 rounded-full transition-colors"
                    title="Reset All"
                  >
                    <RefreshCw size={18} />
                  </button>

                  <div className="w-px h-6 bg-slate-200" />

                  <button
                    onClick={handleDownload}
                    className="flex items-center gap-2 px-5 py-2.5 text-sm font-bold text-white bg-slate-900 rounded-full hover:bg-black hover:scale-105 active:scale-95 transition-all"
                  >
                    <Download size={16} />
                    <span>Download PNG</span>
                  </button>

                </div>

              </div>

              <p className="text-center text-xs text-slate-400 mt-4">
                Mockup preview · Not a real post · Generated with FlexPost
              </p>

            </div>

          </div>
        </div>
      </section>
    </main>
  );
}