'use client';

import { usePostStore } from '@/store/usePostStore';
import {
    BadgeCheck,
    Stamp,
    Moon,
    Sun,
    Image as ImageIcon,
    CheckCircle2,
} from 'lucide-react';
import { cn } from '@/lib/utils';

export const LinkedInEditorControls = () => {
    const state = usePostStore();

    // 1. Get Global Theme State
    const isGlobalDark = state.globalTheme === 'dark';
    const isCardDark = state.theme === 'dark'; // Current card state

    return (
        <div
            className={cn(
                "w-full max-w-full rounded-2xl border p-5 shadow-sm transition-all duration-300",
                isGlobalDark
                    ? "bg-[#1F1F1F] border-white/10 shadow-black/20"
                    : "bg-white border-slate-200 shadow-sm"
            )}
        >
            <div className="space-y-6">

                {/* --- SECTION 1: APPEARANCE --- */}
                <div className="space-y-3">
                    <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider px-1">
                        Card Appearance
                    </label>

                    {/* Card Theme Toggle */}
                    <div
                        className={cn(
                            "group flex w-full items-center justify-between rounded-xl border px-4 py-3 text-sm font-medium transition-all shadow-md cursor-default",
                            isCardDark
                                ? isGlobalDark
                                    ? "bg-white/5 border-white/10 text-slate-300"
                                    : "bg-white border-slate-200 text-slate-600"
                                : isGlobalDark
                                    ? "bg-white/5 border-white/10 text-slate-300 hover:border-neutral-700 hover:text-white hover:bg-white/10"
                                    : "bg-white border-slate-200 text-slate-600 hover:border-neutral-100 hover:text-slate-900"
                        )}
                    >
                        <div className="flex items-center gap-3 pointer-events-none">
                            {isCardDark ? <Moon size={18} /> : <Sun size={18} />}
                            <span>{isCardDark ? "Dark Mode" : "Light Mode"}</span>
                        </div>

                        <button
                            type="button"
                            onClick={(e) => {
                                e.stopPropagation();
                                state.toggleTheme();
                            }}
                            className={cn(
                                "h-5 w-9 rounded-full p-0.5 transition-colors duration-300 flex items-center cursor-pointer",
                                isCardDark
                                    ? isGlobalDark ? "bg-blue-500" : "bg-slate-700"
                                    : "bg-neutral-500"
                            )}
                        >
                            <div
                                className={cn(
                                    "h-4 w-4 rounded-full bg-white shadow-sm transition-transform duration-300",
                                    isCardDark ? "translate-x-4" : "translate-x-0"
                                )}
                            />
                        </button>
                    </div>
                </div>

                {/* --- SECTION 2: IDENTITY --- */}
                <div className="space-y-3">
                    <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider px-1">
                        Identity
                    </label>

                    {/* Premium Badge Toggle */}
                    <div className="flex flex-col gap-2">
                        <button
                            onClick={() => state.updateField('linkedinIsVerified', !state.linkedinIsVerified)}
                            className={cn(
                                "group flex w-full items-center justify-between rounded-xl border px-4 py-3 text-sm font-medium transition-all shadow-md",
                                state.linkedinIsVerified
                                    ? "text-blue-500 border-blue-500/30 bg-blue-500/10"
                                    : (isGlobalDark
                                        ? "bg-white/5 border-white/10 text-slate-300 hover:border-neutral-700 hover:text-white hover:bg-white/10"
                                        : "bg-white border-slate-200 text-slate-600 hover:border-neutral-100 hover:text-slate-900")
                            )}
                        >
                            <div className="flex items-center gap-3">
                                <BadgeCheck size={18} className={state.linkedinIsVerified ? "fill-current text-blue-500" : ""} />
                                <span>Premium Badge</span>
                            </div>
                            {state.linkedinIsVerified ? <CheckCircle2 size={18} /> : <div className={cn("h-4 w-4 rounded-full border", isGlobalDark ? "border-slate-600" : "border-slate-300")} />}
                        </button>
                    </div>
                </div>

                {/* --- SECTION 3: MEDIA --- */}
                <div className="space-y-3">
                    <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider px-1">
                        Media
                    </label>

                    {/* Post Image Logic */}
                    <button
                        onClick={() => state.updateField('linkedinShowImage', !state.linkedinShowImage)}
                        className={cn(
                            "flex w-full items-center justify-between rounded-xl border px-4 py-3 text-sm font-medium transition-all shadow-md",
                            state.linkedinShowImage
                                ? "border-blue-500 text-blue-500 bg-blue-500/10"
                                : (isGlobalDark
                                    ? "bg-white/5 border-white/10 text-slate-300 hover:border-neutral-700 hover:text-white hover:bg-white/10"
                                    : "bg-white border-slate-200 text-slate-600 hover:border-neutral-100 hover:text-slate-900")
                        )}
                    >
                        <div className="flex items-center gap-3">
                            <ImageIcon size={18} />
                            <span>Image (Left)</span>
                        </div>

                        {state.linkedinShowImage ? (
                            <CheckCircle2 size={18} className="text-blue-500" />
                        ) : (
                            <div className="flex items-center gap-1 text-slate-400 text-xs font-bold">
                                Add
                            </div>
                        )}
                    </button>

                    {/* Second Image Toggle */}
                    <button
                        onClick={() => state.updateField('linkedinShowImage2', !state.linkedinShowImage2)}
                        className={cn(
                            "flex w-full items-center justify-between rounded-xl border px-4 py-3 text-sm font-medium transition-all shadow-md",
                            state.linkedinShowImage2
                                ? "border-blue-500 text-blue-500 bg-blue-500/10"
                                : (isGlobalDark
                                    ? "bg-white/5 border-white/10 text-slate-300 hover:border-neutral-700 hover:text-white hover:bg-white/10"
                                    : "bg-white border-slate-200 text-slate-600 hover:border-neutral-100 hover:text-slate-900")
                        )}
                    >
                        <div className="flex items-center gap-3">
                            <ImageIcon size={18} />
                            <span>Image (Right)</span>
                        </div>

                        {state.linkedinShowImage2 ? (
                            <CheckCircle2 size={18} className="text-blue-500" />
                        ) : (
                            <div className="flex items-center gap-1 text-slate-400 text-xs font-bold">
                                Add
                            </div>
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
};
