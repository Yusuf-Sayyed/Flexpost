'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu, Sparkles, Moon, Sun, X as CloseIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { usePostStore } from '@/store/usePostStore';
import { usePathname } from 'next/navigation';

export const Navbar = () => {
  const pathname = usePathname();
  const { globalTheme, toggleGlobalTheme } = usePostStore();
  const isDark = globalTheme === 'dark';
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  if (pathname === '/create') {
    return null;
  }

  return (
    <nav
      className={cn(
        "fixed top-6 z-50 w-[95%] max-w-4xl left-1/2 -translate-x-1/2 border shadow-lg transition-all duration-300 ease-in-out",
        isMenuOpen ? "rounded-3xl" : "rounded-full",
        isDark
          ? "bg-black/80 border-white/10 shadow-black/20 backdrop-blur-xl"
          : "bg-white/80 border-gray-200/50 shadow-gray-200/10 backdrop-blur-xl"
      )}
    >
      <div className="relative flex h-14 items-center justify-between px-4 sm:px-6">

        {/* --- Left: Logo --- */}
        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center gap-2 group">
            <img
              src={isDark ? "/dlogo.png" : "/llogo.png"}
              alt="FlexPost Logo"
              className="h-8 w-auto object-contain transition-opacity duration-300"
            />
            <span className={cn("font-bold text-lg tracking-tight hidden xs:block", isDark ? "text-white" : "text-slate-900")}>
              FlexPost
            </span>
          </Link>
        </div>

        {/* --- Center: Desktop Navigation (Absolutely Centered) --- */}
        <div className="hidden md:flex items-center gap-6 absolute left-1/2 -translate-x-1/2">
          <NavLink href="#" isDark={isDark}>Templates</NavLink>
          <NavLink href="#" isDark={isDark}>Showcase</NavLink>
          <NavLink href="#" isDark={isDark}>Pricing</NavLink>
        </div>

        {/* --- Right: Actions --- */}
        <div className="flex items-center gap-3">

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

          <div className={cn("h-4 w-px hidden sm:block", isDark ? "bg-white/10" : "bg-gray-200")} />

          {/* X (Twitter) Link */}
          <Link
            href="https://x.com/yusuf_sdev"
            target="_blank"
            className={cn(
              "transition-colors hidden sm:block",
              isDark ? "text-slate-400 hover:text-white" : "text-slate-400 hover:text-slate-900"
            )}
            title="Follow on X"
          >
            <XIcon size={18} />
          </Link>

          {/* Generate Button (Linked to /create) */}
          <Link
            href="/create"
            className="flex items-center gap-2 bg-slate-900 text-white text-xs sm:text-sm font-medium px-3 sm:px-4 py-1.5 sm:py-2 rounded-full hover:bg-slate-800 hover:scale-105 active:scale-95 transition-all shadow-md ring-1 ring-slate-900/10"
          >
            <Sparkles size={14} />
            <span>Create</span>
          </Link>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className={cn("md:hidden ml-1 p-1 rounded-md transition-colors", isDark ? "text-slate-400 hover:bg-white/10" : "text-slate-500 hover:bg-slate-100")}
          >
            {isMenuOpen ? <CloseIcon size={20} /> : <Menu size={20} />}
          </button>
        </div>

      </div>

      {/* 6. Mobile Dropdown Menu */}
      <div
        className={cn(
          "md:hidden overflow-hidden transition-all duration-300 ease-in-out",
          isMenuOpen ? "max-h-[200px] opacity-100 pb-4" : "max-h-0 opacity-0"
        )}
      >
        <div className="flex flex-col gap-4 px-6 pt-2 pb-2">
          <MobileNavLink href="#" isDark={isDark}>Templates</MobileNavLink>
          <MobileNavLink href="#" isDark={isDark}>Showcase</MobileNavLink>
          <MobileNavLink href="#" isDark={isDark}>Pricing</MobileNavLink>
          {/* Mobile X Link */}
          <Link
            href="https://x.com/yusuf_sdev"
            target="_blank"
            className={cn("pt-2 border-t border-white/5 flex items-center gap-2 text-sm", isDark ? "text-slate-500 hover:text-white" : "text-slate-500 hover:text-black")}
          >
             <XIcon size={16} /> <span>Follow on X</span>
          </Link>
        </div>
      </div>

    </nav>
  );
};

// Helper: Custom X (Twitter) Icon
const XIcon = ({ size = 20, className }: { size?: number, className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className} xmlns="http://www.w3.org/2000/svg">
    <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" />
  </svg>
);

// Helper for Desktop Links
const NavLink = ({ href, children, isDark }: { href: string; children: React.ReactNode; isDark: boolean }) => (
  <Link
    href={href}
    className={cn(
      "text-sm font-medium transition-colors hover:scale-105",
      isDark ? "text-slate-400 hover:text-white" : "text-slate-500 hover:text-slate-900"
    )}
  >
    {children}
  </Link>
);

// Helper for Mobile Links
const MobileNavLink = ({ href, children, isDark }: { href: string; children: React.ReactNode; isDark: boolean }) => (
  <Link
    href={href}
    className={cn(
      "text-base font-medium transition-colors block py-1",
      isDark ? "text-slate-300 hover:text-white" : "text-slate-600 hover:text-slate-900"
    )}
  >
    {children}
  </Link>
);