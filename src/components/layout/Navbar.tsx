import Link from 'next/link';
import { Twitter, Github, Menu, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';

export const Navbar = () => {
  return (
    // 1. Fixed positioning + Centering + Rounded Full (Pill shape) + Glass Effect
    <nav className="fixed top-6 z-50 w-[95%] max-w-4xl left-1/2 -translate-x-1/2 rounded-full border border-gray-200/50 bg-white/70 backdrop-blur-xl shadow-lg shadow-gray-200/10 transition-all">
      <div className="flex h-14 items-center justify-between px-4 sm:px-6">

        {/* --- Left: Logo --- */}
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="bg-slate-900 text-white p-1.5 rounded-full group-hover:bg-blue-600 transition-colors duration-300">
              <Twitter size={18} fill="currentColor" />
            </div>
            {/* Hidden name on very small phones to save space */}
            <span className="font-bold text-lg tracking-tight text-slate-900 hidden xs:block">
              FlexPost
            </span>
          </Link>

          {/* Badge - Smaller and closer */}
          <span className="hidden sm:inline-flex items-center rounded-full bg-blue-50 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-blue-600 ring-1 ring-inset ring-blue-600/20">
            Beta
          </span>
        </div>

        {/* --- Center: Navigation (Desktop Only) --- */}
        {/* We hide this on mobile (hidden) and show on medium screens (md:flex) */}
        <div className="hidden md:flex items-center gap-6">
          <NavLink href="#">Templates</NavLink>
          <NavLink href="#">Showcase</NavLink>
          <NavLink href="#">Pricing</NavLink>
        </div>

        {/* --- Right: Actions --- */}
        <div className="flex items-center gap-3">
          {/* GitHub - Icon Only */}
          <Link
            href="https://github.com"
            target="_blank"
            className="text-slate-400 hover:text-slate-900 transition-colors hidden sm:block"
          >
            <Github size={20} />
          </Link>

          {/* Separator */}
          <div className="h-4 w-px bg-gray-200 hidden sm:block" />

          {/* CTA Button - Compact on Mobile */}
          <button className="flex items-center gap-2 bg-slate-900 text-white text-xs sm:text-sm font-medium px-3 sm:px-4 py-1.5 sm:py-2 rounded-full hover:bg-slate-800 hover:scale-105 active:scale-95 transition-all shadow-md ring-1 ring-slate-900/10">
            <Sparkles size={14} />
            <span>Follow me</span>
          </button>

          {/* Mobile Menu Toggle - Visible only on mobile */}
          <button className="md:hidden text-slate-500 hover:text-slate-900 ml-1">
            <Menu size={20} />
          </button>
        </div>

      </div>
    </nav>
  );
};

// Helper for Links
const NavLink = ({ href, children }: { href: string; children: React.ReactNode }) => (
  <Link
    href={href}
    className="text-sm font-medium text-slate-500 hover:text-slate-900 transition-colors"
  >
    {children}
  </Link>
);