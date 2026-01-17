'use client';

import { usePostStore } from '@/store/usePostStore';
import { cn } from '@/lib/utils';
import { Bug, Github, User, Code2, CheckCircle2, XCircle, ArrowRight, ChevronLeft } from 'lucide-react';
import Link from 'next/link';
import { PageHeader } from '@/components/layout/PageHeader';

export default function ReportBugPage() {
  const { globalTheme } = usePostStore();
  const isDark = globalTheme === 'dark';
  // Standardize the variable name for the nav code you provided
  const isGlobalDark = isDark;

  return (
    <main
      className={cn(
        // Updated padding to match your other pages (py-8 mobile, py-24 desktop)
        "min-h-screen w-full transition-colors duration-300 ease-in-out py-8 px-4 pt-0 pb-24 md:px-12 lg:px-24 flex flex-col items-center",
        isDark ? "bg-[#171717] text-slate-300" : "bg-[#EAF2FF] text-slate-600"
      )}
    >

      {/*Top Header*/}
        <PageHeader title='Report a bug' />


      {/* --- 2. HERO CONTENT (Logo & Description) --- */}
      <div className="text-center space-y-4 mb-16 max-w-2xl pt-12 sm:pt-14 ">
        <p className="text-lg opacity-80">
          We appreciate you helping us make FlexPost better. Please choose how you would like to report the issue.
        </p>
      </div>


      {/* --- 3. CHOICE CARDS --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-5xl mb-24">

        {/* OPTION 1: FOR USERS */}
        <div className={cn(
            "relative group overflow-hidden p-8 rounded-3xl border transition-all duration-300 hover:shadow-2xl hover:-translate-y-1",
            isDark ? "bg-[#1F1F1F] border-white/10" : "bg-white border-blue-100"
        )}>
            <div className="flex items-center gap-4 mb-6">
                <div className={cn("p-3 rounded-full", isDark ? "bg-blue-500/20 text-blue-400" : "bg-blue-50 text-blue-600")}>
                    <User size={24} />
                </div>
                <h2 className={cn("text-2xl font-bold", isDark ? "text-white" : "text-slate-900")}>I am a User</h2>
            </div>
            <p className="mb-8 leading-relaxed opacity-80">
                Don't have a GitHub account? No problem. Use our simple form to tell us what went wrong. We'll ask for a screenshot and what you were doing when it happened.
            </p>
            <Link
                // 👇 REPLACE THIS with your actual Google Form or Typeform link
                href="https://forms.google.com/your-form-link"
                target="_blank"
                className={cn(
                    "inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-colors w-full justify-center",
                    isDark ? "bg-white text-black hover:bg-blue-50" : "bg-slate-900 text-white hover:bg-slate-800"
                )}
            >
                Report via Form <ArrowRight size={18} />
            </Link>
        </div>

        {/* OPTION 2: FOR DEVELOPERS */}
        <div className={cn(
            "relative group overflow-hidden p-8 rounded-3xl border transition-all duration-300 hover:shadow-2xl hover:-translate-y-1",
            isDark ? "bg-[#1F1F1F] border-white/10" : "bg-white border-blue-100"
        )}>
             <div className="flex items-center gap-4 mb-6">
                <div className={cn("p-3 rounded-full", isDark ? "bg-purple-500/20 text-purple-400" : "bg-purple-50 text-purple-600")}>
                    <Code2 size={24} />
                </div>
                <h2 className={cn("text-2xl font-bold", isDark ? "text-white" : "text-slate-900")}>I am a Developer</h2>
            </div>
            <p className="mb-8 leading-relaxed opacity-80">
                If you have a GitHub account, please open an Issue. This is the fastest way for us to track and fix bugs directly in the code.
            </p>
            <Link
                href="https://github.com/Yusuf-Sayyed/FlexPost/issues/new"
                target="_blank"
                className={cn(
                    "inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-colors w-full justify-center border",
                    isDark
                        ? "border-white/20 hover:bg-white/5 text-white"
                        : "border-slate-200 hover:bg-slate-50 text-slate-700"
                )}
            >
                Open GitHub Issue <Github size={18} />
            </Link>
        </div>

      </div>


      {/* --- 4. DEVELOPER GUIDANCE SECTION --- */}
      <div className="w-full max-w-4xl space-y-8">
        <div className="flex items-center gap-3 mb-6 border-b pb-4 border-slate-200/20">
            <Code2 className="text-purple-500" size={28} />
            <h3 className={cn("text-2xl font-bold", isDark ? "text-white" : "text-slate-900")}>
                Developer Guide: Writing a Good Issue
            </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {/* DO's */}
            <div className="space-y-4">
                <h4 className="text-green-500 font-bold flex items-center gap-2 uppercase tracking-wide text-sm">
                    <CheckCircle2 size={16} /> Do This
                </h4>
                <div className={cn("p-6 rounded-2xl text-sm space-y-4", isDark ? "bg-green-500/5 border border-green-500/20" : "bg-green-50 border border-green-100")}>
                    <div>
                        <strong className="block mb-1 opacity-100">Clear Title</strong>
                        <span className="opacity-80">"Export fails on Safari Mobile with 'Unknown Error'"</span>
                    </div>
                    <div>
                        <strong className="block mb-1 opacity-100">Steps to Reproduce</strong>
                        <ol className="list-decimal pl-4 opacity-80 space-y-1">
                            <li>Open FlexPost on iPhone (Safari)</li>
                            <li>Upload an avatar</li>
                            <li>Click 'Export PNG'</li>
                        </ol>
                    </div>
                    <div>
                        <strong className="block mb-1 opacity-100">Environment</strong>
                        <span className="opacity-80">iOS 17, Safari, iPhone 13</span>
                    </div>
                </div>
            </div>

            {/* DON'Ts */}
            <div className="space-y-4">
                <h4 className="text-red-500 font-bold flex items-center gap-2 uppercase tracking-wide text-sm">
                    <XCircle size={16} /> Avoid This
                </h4>
                <div className={cn("p-6 rounded-2xl text-sm space-y-4", isDark ? "bg-red-500/5 border border-red-500/20" : "bg-red-50 border border-red-100")}>
                    <div>
                        <strong className="block mb-1 opacity-100">Vague Title</strong>
                        <span className="opacity-80">"It's broken" or "Image download error"</span>
                    </div>
                    <div>
                        <strong className="block mb-1 opacity-100">No Context</strong>
                        <span className="opacity-80">"I clicked the button and nothing happened. Please fix."</span>
                    </div>
                    <div>
                        <strong className="block mb-1 opacity-100">Missing Info</strong>
                        <span className="opacity-80">Not mentioning which browser or device you are using.</span>
                    </div>
                </div>
            </div>
        </div>
      </div>

    </main>
  );
}