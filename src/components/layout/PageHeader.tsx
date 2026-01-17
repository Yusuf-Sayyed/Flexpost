'use client';

import Link from 'next/link';
import { ChevronLeft, Sun, Moon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { usePostStore } from '@/store/usePostStore';

interface PageHeaderProps {
  title: string;
  backHref?: string; // Optional: Default to home '/'
}

export const PageHeader = ({ title, backHref = '/' }: PageHeaderProps) => {
  const { globalTheme, toggleGlobalTheme } = usePostStore();
  const isGlobalDark = globalTheme === 'dark';
  const isDark = globalTheme === 'dark';


  return (
    <nav
      className={cn(
        // 👇 LAYOUT LOGIC:
        // sticky top-0: Stays pinned to the top
        // z-50: Stays above content
        // backdrop-blur-md: Makes content underneath look blurry (Glass effect)
        "sticky top-0 z-50 w-full h-16 shrink-0 flex items-center px-4 sm:px-6 border-b rounded-full transition-all duration-300",

        // 👇 THEME LOGIC (Backgrounds need opacity/alpha for blur to work)
        isGlobalDark
        ? "bg-black/80 border-white/10 shadow-black/20 backdrop-blur-xl"
        : "bg-white/80 border-gray-200/50 shadow-gray-200/10 backdrop-blur-xl"
      )}
    >
{/* 1. Back Button (Left) */}
<div className="z-10 flex items-center gap-2 text-sm font-semibold group">
      <Link
        href={backHref}
        className="z-10 flex items-center gap-2 text-sm font-semibold group"
      >
        <div className={cn(
          "p-1.5 rounded-full transition-colors",
          // 👇 Applied your specific styling here
          isGlobalDark
            ? "text-neutral-500 bg-neutral-800 hover:text-slate-900 hover:bg-indigo-50"
            : "text-neutral-600 bg-slate-200 hover:text-neutral-300 hover:bg-neutral-900"
        )}>
          <ChevronLeft size={18} />
        </div>
      </Link>
      <span className={cn(
          "hidden min-[768px]:inline transition-colors select-none",
          isGlobalDark ? "text-neutral-500" : "text-neutral-600"
        )}>
          Back
        </span>

      </div>

      {/* 2. Page Title (Absolutely Centered) */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <span className={cn(
          "font-bold tracking-widest uppercase  text-xs sm:text-sm",
          isGlobalDark ? "text-neutral-500" : "text-neutral-600"
        )}>
          {title}
        </span>
      </div>

{/* 3. Theme Toggle (Right Side) */}
      <button
        onClick={toggleGlobalTheme}
        className={cn(
          // 👇 'ml-auto' pushes it to the right. 'z-10' ensures it is clickable above the title layer.
          "ml-auto z-10 flex items-center justify-center w-8 h-8 rounded-full transition-colors",
          isGlobalDark
            ? "text-neutral-500 bg-neutral-800 hover:text-slate-900 hover:bg-indigo-50"
            : "text-neutral-600 bg-slate-200 hover:text-neutral-300 hover:bg-neutral-900"
        )}
        title="Toggle Theme"
      >
        {isGlobalDark ? <Sun size={18} /> : <Moon size={18} />}
      </button>
    </nav>
  );
};