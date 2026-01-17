'use client';

import Link from 'next/link';
import { usePostStore } from '@/store/usePostStore';
import { cn } from '@/lib/utils';
import { Github, Twitter, Bug, FileText, Shield, Heart } from 'lucide-react';
import { usePathname } from 'next/navigation';

export const Footer = () => {
  const { globalTheme } = usePostStore();
  const isDark = globalTheme === 'dark';
  const pathname = usePathname();

  // Hide footer on the Create page (Canvas needs full height)
  if (pathname === '/create') return null;

  return (
    <footer className={cn(
      "w-full border-t py-12 transition-colors duration-300",
      isDark
        ? "bg-[#171717] border-white/5 text-slate-400"
        : "bg-[#F8FAFC] border-slate-200 text-slate-600"
    )}>
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-10">

        {/* Column 1: Brand */}
        <div className="col-span-1 md:col-span-2 space-y-4">
          <div className="flex items-center gap-2">
            <img src={isDark ? "/dlogo.png" : "/llogo.png"} alt="Logo" className="h-8 w-auto opacity-80" />
            <span className={cn("font-bold text-lg", isDark ? "text-white" : "text-slate-900")}>FlexPost</span>
          </div>
          <p className="text-sm leading-relaxed max-w-xs opacity-80">
            The open-source tool for creating beautiful social media mockups.
            No login required. No watermarks.
          </p>
          <div className="flex items-center gap-4 pt-2">
            <SocialLink href="https://github.com/Yusuf-Sayyed/FlexPost" icon={<Github size={18} />} isDark={isDark} />
            <SocialLink href="https://x.com/yusuf_sdev" icon={<Twitter size={18} />} isDark={isDark} />
          </div>
        </div>

        {/* Column 2: Product */}
        <div className="space-y-4">
          <h4 className={cn("font-semibold text-sm uppercase tracking-wider", isDark ? "text-white" : "text-slate-900")}>Product</h4>
          <ul className="space-y-2 text-sm">
            <li><FooterLink href="/create">Create Mockup</FooterLink></li>
            <li>
                {/* Direct link to Report a Bug page */}
                <Link href="/report" className="flex items-center gap-2 hover:text-blue-500 transition-colors">
                    <Bug size={14} /> Report a Bug
                </Link>
            </li>
            <li>
                <a href="https://github.com/Yusuf-Sayyed/FlexPost/pulls" target="_blank" rel="noreferrer" className="flex items-center gap-2 hover:text-green-500 transition-colors">
                    <Heart size={14} /> Contribute
                </a>
            </li>
          </ul>
        </div>

        {/* Column 3: Legal */}
        <div className="space-y-4">
          <h4 className={cn("font-semibold text-sm uppercase tracking-wider", isDark ? "text-white" : "text-slate-900")}>Legal</h4>
          <ul className="space-y-2 text-sm">
            <li>
                <Link href="/privacy" className="flex items-center gap-2 hover:text-blue-500 transition-colors">
                    <Shield size={14} /> Privacy Policy
                </Link>
            </li>
            <li>
                <Link href="/terms" className="flex items-center gap-2 hover:text-blue-500 transition-colors">
                    <FileText size={14} /> Terms of Service
                </Link>
            </li>
          </ul>
        </div>

      </div>

      <div className="max-w-6xl mx-auto px-6 mt-12 pt-8 border-t border-white/5 text-center text-xs opacity-40">
        © {new Date().getFullYear()} FlexPost. Open Source (MIT License).
      </div>
    </footer>
  );
};

// Helper Components
const SocialLink = ({ href, icon, isDark }: { href: string, icon: any, isDark: boolean }) => (
  <a
    href={href}
    target="_blank"
    rel="noreferrer"
    className={cn(
      "p-2 rounded-full transition-all",
      isDark ? "bg-white/5 hover:bg-white/10 text-white" : "bg-white border hover:bg-slate-50 text-slate-700"
    )}
  >
    {icon}
  </a>
);

const FooterLink = ({ href, children }: { href: string, children: React.ReactNode }) => (
  <Link href={href} className="hover:underline hover:text-blue-500 transition-colors">
    {children}
  </Link>
);