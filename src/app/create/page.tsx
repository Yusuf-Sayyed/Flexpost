'use client';

import { TwitterPost } from '@/components/templates/TwitterPost';
import { EditorControls } from '@/components/editor/EditorControls';
import { toPng } from 'html-to-image';
import { Download, RefreshCw, ChevronLeft, SettingsIcon } from 'lucide-react';
import { usePostStore } from '@/store/usePostStore';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { GridBackgroundDemo } from '@/components/ui/grid-background-demo';
import { toast } from 'sonner';

export default function CreatePage() {
  // 👇 FIX: Added 'showImage' here so the validation below knows the toggle state
  const {
    reset,
    globalTheme,
    avatarUrl,
    displayName,
    username,
    customBadgeUrl,
    showCustomBadge,
    content,
    postImageUrl,
    showImage
  } = usePostStore();

  const isGlobalDark = globalTheme === 'dark';

  const handleDownload = async () => {
    // 1. Validation Checks
    if (!avatarUrl) {
      toast.error("Please upload a profile picture!");
      return;
    }
    if (!displayName) {
      toast.error("Please add a Name!");
      return;
    }
    if (!username) {
      toast.error("Please add a Username!");
      return;
    }
    // 👇 Robust Check for Custom Badge
    // If toggle is ON, ensure URL is a non-empty string
    if (showCustomBadge && (!customBadgeUrl || customBadgeUrl.length === 0)) {
      toast.error("Please upload a custom badge or disable the option!");
      return;
    }
    if (!content) {
      toast.error("The post content cannot be empty!");
      return;
    }

    // 👇 Robust Check for Post Image
    if (showImage && (!postImageUrl || postImageUrl.length === 0)) {
      toast.error("Please upload an image or disable the image option!");
      return;
    }
    const node = document.getElementById('tweet-canvas');
    if (!node) return;

    const toastId = toast.loading("Generating image...");

    try {
      const dataUrl = await toPng(node, { quality: 1.0, pixelRatio: 2 });
      const link = document.createElement('a');
      link.download = 'flexpost-mockup.png';
      link.href = dataUrl;
      link.click();
      toast.success("Image downloaded successfully!", { id: toastId });
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong during export.", { id: toastId });
    }
  };

  return (
    <main
      className={cn(
        "h-screen w-full overflow-hidden transition-colors duration-300 ease-in-out selection:bg-blue-500/30 flex flex-col",
        isGlobalDark ? "bg-[#171717]" : "bg-[#EAF2FF]"
      )}
    >
      {/* HEADER */}
      <nav className={cn(
        "h-16 shrink-0 flex items-center justify-between px-6 border-b z-50",
        isGlobalDark ? "bg-[#171717] border-white/5" : "bg-[#EAF2FF] border-blue-100"
      )}>
        <Link href="/" className={cn("flex items-center gap-2 text-sm font-semibold transition-all hover:opacity-70 group", isGlobalDark ? "text-slate-300" : "text-slate-600")}>
          <div className={cn("p-1.5 rounded-full transition-colors group-hover:bg-slate-200/20", isGlobalDark ? "bg-white/5" : "bg-white border border-slate-200")}>
            <ChevronLeft size={16} />
          </div>
          <span>Back</span>
        </Link>
        <span className={cn("text-sm font-bold tracking-widest uppercase opacity-40 hidden sm:block", isGlobalDark ? "text-white" : "text-slate-900")}>Studio</span>
        <div className="w-20" />
      </nav>

      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
        {/* SIDEBAR */}
        <aside className={cn(
          "w-full max-w-[400px] h-full overflow-y-auto border-r p-6 z-20 shrink-0 scrollbar-hide hidden lg:block",
          isGlobalDark ? "border-white/5 bg-[#171717]" : "border-blue-100/50 bg-[#EAF2FF]/50"
        )}>
          <div className="space-y-6 pb-12">
            <div className="space-y-1">
              <div className="flex items-center gap-3">
                <div className={cn("p-2 rounded-xl", isGlobalDark ? "bg-blue-500/10 text-blue-400" : "bg-blue-500 text-white shadow-lg shadow-blue-500/30")}>
                  <SettingsIcon size={20} />
                </div>
                <h1 className={cn("text-xl font-bold tracking-tight", isGlobalDark ? "text-white" : "text-slate-900")}>Settings</h1>
              </div>
            </div>
            <div className={cn("h-px w-full", isGlobalDark ? "bg-white/10" : "bg-slate-200/60")} />
            <EditorControls />
          </div>
        </aside>

        {/* CANVAS */}
        <div className="flex-1 h-full relative overflow-y-auto scrollbar-hide">
          <GridBackgroundDemo isDark={isGlobalDark} />

          <div className="min-h-full flex flex-col items-center p-2 sm:p-6 lg:p-12 relative z-10 py-8 lg:justify-center">
            {/* Mobile Controls */}
            <div className="lg:hidden w-full max-w-[600px] mb-6 space-y-4 animate-in fade-in slide-in-from-top-10 duration-700 relative z-30">
               <div className="flex items-center gap-2 opacity-70 px-2">
                  <SettingsIcon size={14} className={isGlobalDark ? "text-white" : "text-slate-900"} />
                  <span className={cn("text-[10px] font-bold uppercase tracking-widest", isGlobalDark ? "text-white" : "text-slate-900")}>Editor Settings</span>
               </div>
               <div className={cn("p-1 rounded-3xl shadow-lg", isGlobalDark ? "bg-[#1F1F1F] border border-white/10" : "bg-white border border-white/40")}>
                 <EditorControls />
               </div>
            </div>

            {/* Tweet Card */}
            <div className="relative w-full flex justify-center origin-top transform-gpu scale-[0.5] sm:scale-[0.6] md:scale-[0.85] xl:scale-100 transition-transform duration-300">
              <TwitterPost id="tweet-canvas" />
            </div>

            {/* Action Bar */}
            <div className="flex justify-center w-full z-50 pointer-events-none">
              <div className={cn(
                "mt-[-45px] sm:mt-[-60px] md:mt-8 flex items-center gap-2 sm:gap-3 backdrop-blur-xl p-1 pl-3 sm:p-1.5 sm:pl-4 rounded-2xl border shadow-2xl transition-all duration-300 hover:scale-105 pointer-events-auto",
                isGlobalDark
                  ? "bg-white/5 border-white/10 text-white shadow-black/40"
                  : "bg-white/80 border-white/60 text-slate-700 shadow-xl shadow-blue-900/5 ring-1 ring-white/50"
              )}>
                <button onClick={reset} className="p-1.5 sm:p-2 rounded-full hover:bg-red-500/10 hover:text-red-500 transition-colors" title="Reset Canvas">
                  <RefreshCw size={14} className="sm:w-4 sm:h-4" />
                </button>
                <div className={cn("w-px h-3 sm:h-4 opacity-20", isGlobalDark ? "bg-white" : "bg-black")} />
                <button onClick={handleDownload} className={cn("flex items-center gap-1.5 sm:gap-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full transition-all shadow-lg", isGlobalDark ? "bg-white text-black hover:bg-blue-50 shadow-white/5" : "bg-slate-900 text-white hover:bg-black shadow-slate-900/20")}>
                  <Download size={12} className="sm:w-3.5 sm:h-3.5" />
                  <span className="text-[10px] sm:text-xs font-bold">Export PNG</span>
                </button>
              </div>
            </div>
            <div className="h-24 lg:hidden" />
          </div>
        </div>
      </div>
    </main>
  );
}