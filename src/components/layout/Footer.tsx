'use client';

import Link from 'next/link';
import { Github } from 'lucide-react';
import { cn } from '@/lib/utils';
import { usePostStore } from '@/store/usePostStore';
import { usePathname } from 'next/navigation';

export const Footer = () => {
  const pathname = usePathname();
  const { globalTheme } = usePostStore();
  const isDark = globalTheme === 'dark';

  if (pathname === '/create') {
    return null;
  }

  return (
    <footer className={cn(
      "w-full border-t transition-colors duration-300",
      isDark
        ? "bg-[#171717] border-white/5 text-slate-400"
        : "bg-white border-slate-100 text-slate-500"
    )}>
      <div className="max-w-6xl mx-auto px-6 py-12">

        {/* Responsive Layout:
           - Mobile: Vertical stack (flex-col), Centered items, Large gap (gap-16) for the arrow.
           - Desktop: Horizontal row (md:flex-row), Left/Right aligned, Standard gap (md:gap-10).
        */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-16 md:gap-10">

          {/* --- Brand Info --- */}
          <div className="space-y-4 max-w-sm flex flex-col items-center md:items-start text-center md:text-left">
            <Link href="/" className="flex items-center gap-2 group w-fit">
              <img
                src={isDark ? "/dlogo.png" : "/llogo.png"}
                alt="FlexPost Logo"
                className="h-8 w-auto object-contain opacity-90 group-hover:opacity-100 transition-opacity"
              />
              <span className={cn("font-bold text-xl tracking-tight", isDark ? "text-white" : "text-slate-900")}>
                FlexPost
              </span>
            </Link>
            <p className="text-sm leading-relaxed opacity-80">
              The fastest way to create beautiful, verified mockups for social media.
              Designed for creators, developers, and founders.
            </p>
          </div>

          {/* --- Social Actions --- */}
          <div className="flex items-center gap-6 relative">

            {/* 1. Github Button */}
            <Link
              href="https://github.com/Yusuf-Sayyed"
              target="_blank"
              className={cn(
                "group flex items-center gap-2 px-4 py-2 rounded-full border transition-all duration-300",
                isDark
                  ? "border-white/10 hover:bg-white/5 text-white"
                  : "border-slate-200 hover:bg-slate-50 text-slate-700"
              )}
            >
              <Github size={18} />
              <span className="text-sm font-medium">Star on GitHub</span>
            </Link>

            {/* 2. X Button (With Floating Arrow Animation) */}
            <div className="relative group">

              {/* The Floating Label & Arrow */}
              <div className="absolute -top-12 left-2/1 -translate-x-1/2 w-[120px] flex flex-col items-center animate-bounce-slow pointer-events-none">
                 <span className={cn(
                   "text-[10px] font-bold uppercase tracking-wider transform -rotate-6",
                   isDark ? "text-blue-400" : "text-blue-600"
                 )}>
                   Follow Me
                 </span>
                 {/* Custom Curved Arrow SVG */}
                 <svg width="24" height="34" viewBox="0 0 55 52" fill="none" xmlns="http://www.w3.org/2000/svg" className={cn("mt-[-2px] ml-4 transform rotate-40", isDark ? "stroke-blue-400" : "stroke-blue-600")}>
                    <path d="M4.63056 0.44917C16.6356 3.68472 29.5639 9.93229 36.6306 17.4492C44.3806 25.6946 47.925 35.8427 45.1306 45.4492M45.1306 45.4492L36.1306 36.9492M45.1306 45.4492L53.1306 37.9492" strokeWidth="3" strokeLinecap="round"/>
                 </svg>
              </div>

              {/* The Button */}
              <Link
                href="https://x.com/yusuf_sdev"
                target="_blank"
                className={cn(
                  "flex items-center justify-center p-3 rounded-full transition-all duration-300 shadow-lg hover:scale-110",
                  isDark
                    ? "bg-white text-black hover:bg-blue-50"
                    : "bg-black text-white hover:bg-slate-800"
                )}
              >
                <XIcon size={20} />
              </Link>
            </div>

          </div>
        </div>

        {/* --- Bottom: Links --- */}
        <div className={cn(
          "mt-16 pt-8 border-t flex flex-col-reverse md:flex-row justify-between items-center gap-4 text-xs opacity-60 text-center md:text-left",
          isDark ? "border-white/5" : "border-slate-100"
        )}>
          <p>© {new Date().getFullYear()} FlexPost. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="#" className="hover:underline">Privacy Policy</Link>
            <Link href="#" className="hover:underline">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

// Custom X Icon
const XIcon = ({ size = 20, className }: { size?: number, className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className} xmlns="http://www.w3.org/2000/svg">
    <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" />
  </svg>
);