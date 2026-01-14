'use client';

import Link from 'next/link';
import { Twitter, Github, Menu, Sparkles, Moon, Sun } from 'lucide-react';
import { cn } from '@/lib/utils';
import { usePostStore } from '@/store/usePostStore';
import { usePathname } from 'next/navigation';

export const Navbar = () => {
  const pathname = usePathname();
  const { globalTheme, toggleGlobalTheme } = usePostStore();
  const { theme, toggleTheme } = usePostStore();
  const isDark = globalTheme === 'dark';

  if (pathname === '/create') {
    return null; // Hide Navbar on /create page
  }

  return (
    <nav
      className={cn(
        "fixed top-6 z-50 w-[95%] max-w-4xl left-1/2 -translate-x-1/2 rounded-full border shadow-lg transition-all duration-300",
        isDark
          ? "bg-black/70 border-white/10 shadow-black/20 backdrop-blur-xl"
          : "bg-white/70 border-gray-200/50 shadow-gray-200/10 backdrop-blur-xl"
      )}
    >
      <div className="flex h-14 items-center justify-between px-4 sm:px-6">

        {/* --- Left: Logo --- */}
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="bg-slate-900 text-white p-1.5 rounded-full group-hover:bg-blue-600 transition-colors duration-300">
              <Twitter size={18} fill="currentColor" />
            </div>
            <span className={cn("font-bold text-lg tracking-tight hidden xs:block", isDark ? "text-white" : "text-slate-900")}>
              FlexPost
            </span>
          </Link>

          {/* Badge */}
          <span className="hidden sm:inline-flex items-center rounded-full bg-blue-500/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-blue-500 ring-1 ring-inset ring-blue-500/20">
            Beta
          </span>
        </div>

        {/* --- Center: Navigation --- */}
        <div className="hidden md:flex items-center gap-6">
          <NavLink href="#" isDark={isDark}>Templates</NavLink>
          <NavLink href="#" isDark={isDark}>Showcase</NavLink>
          <NavLink href="#" isDark={isDark}>Pricing</NavLink>
        </div>

        {/* --- Right: Actions --- */}
        <div className="flex items-center gap-3">

          {/* THEME TOGGLE */}
          <button
            onClick={toggleGlobalTheme}
            className={cn(
              "flex items-center justify-center w-8 h-8 rounded-full transition-colors",
              isDark
                ? "text-slate-400 hover:text-white hover:bg-white/10"
                : "text-slate-500 hover:text-slate-900 hover:bg-slate-100"
            )}
            title="Toggle Theme"
          >
            {isDark ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          {/* Separator */}
          <div className={cn("h-4 w-px hidden sm:block", isDark ? "bg-white/10" : "bg-gray-200")} />

          {/* GitHub */}
          <Link
            href="https://github.com"
            target="_blank"
            className={cn(
              "transition-colors hidden sm:block",
              isDark ? "text-slate-400 hover:text-white" : "text-slate-400 hover:text-slate-900"
            )}
          >
            <Github size={20} />
          </Link>

          {/* CTA Button */}
          <button className="flex items-center gap-2 bg-slate-900 text-white text-xs sm:text-sm font-medium px-3 sm:px-4 py-1.5 sm:py-2 rounded-full hover:bg-slate-800 hover:scale-105 active:scale-95 transition-all shadow-md ring-1 ring-slate-900/10">
            <Sparkles size={14} />
            <span>Generate</span>
          </button>

          {/* Mobile Menu Toggle */}
          <button className={cn("md:hidden ml-1", isDark ? "text-slate-400" : "text-slate-500")}>
            <Menu size={20} />
          </button>
        </div>

      </div>
    </nav>
  );
};

// Helper for Links (Updated with Dark Mode logic)
const NavLink = ({ href, children, isDark }: { href: string; children: React.ReactNode; isDark: boolean }) => (
  <Link
    href={href}
    className={cn(
      "text-sm font-medium transition-colors",
      isDark ? "text-slate-400 hover:text-white" : "text-slate-500 hover:text-slate-900"
    )}
  >
    {children}
  </Link>
);