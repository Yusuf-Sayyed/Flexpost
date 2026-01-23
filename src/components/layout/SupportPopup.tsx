'use client';

import { useState } from 'react';
import { X as CloseIcon, Coffee, Twitter, Copy, Check, Wallet } from 'lucide-react';
import { cn } from '@/lib/utils';
import { usePostStore } from '@/store/usePostStore';

interface SupportPopupProps {
    isOpen: boolean;
    onClose: () => void;
}

export const SupportPopup = ({ isOpen, onClose }: SupportPopupProps) => {
    const { globalTheme } = usePostStore();
    const isDark = globalTheme === 'dark';
    const [copied, setCopied] = useState(false);
    const solanaAddress = "HzJr3T2qHesCVkQZcQJK8nZWkns1N9qj4Hj4dHi8ZNP8";

    const handleCopy = () => {
        navigator.clipboard.writeText(solanaAddress);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
            <div
                className={cn(
                    "relative w-full max-w-sm rounded-3xl p-6 shadow-2xl scale-100 animate-in zoom-in-95 duration-200",
                    isDark
                        ? "bg-[#1F1F1F] border border-white/10 text-white"
                        : "bg-white border border-slate-100 text-slate-900"
                )}
            >
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className={cn(
                        "absolute top-4 right-4 p-2 rounded-full transition-colors",
                        isDark ? "hover:bg-white/10 text-neutral-400" : "hover:bg-slate-100 text-neutral-500"
                    )}
                >
                    <CloseIcon size={18} />
                </button>

                {/* Header */}
                <div className="text-center mb-6 mt-2">
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-blue-500/10 text-blue-500 mb-4 ring-4 ring-blue-500/10">
                        <span className="text-2xl">🎉</span>
                    </div>
                    <h2 className="text-xl font-bold mb-2">Export Successful!</h2>
                    <p className={cn("text-sm", isDark ? "text-neutral-400" : "text-neutral-500")}>
                        Your image is ready sir. If you enjoyed using FlexPost, please consider supporting the project!
                    </p>
                </div>

                {/* Buttons */}
                <div className="space-y-3">
                    {/* Twitter Follow */}
                    <a
                        href="https://x.com/yusuf_sdev"
                        target="_blank"
                        rel="noopener noreferrer"
                        className={cn(
                            "flex items-center justify-center gap-3 w-full p-3.5 rounded-xl font-medium transition-all transform hover:scale-[1.02] active:scale-[0.98]",
                            isDark
                                ? "bg-white text-black hover:bg-neutral-200"
                                : "bg-black text-white hover:bg-neutral-800"
                        )}
                    >
                        <Twitter size={18} className="fill-current" />
                        <span>Follow on X</span>
                    </a>

                    {/* Buy Me a Coffee */}
                    <a
                        href="https://buymeacoffee.com/sayyedyusuf"
                        target="_blank"
                        rel="noopener noreferrer"
                        className={cn(
                            "flex items-center justify-center gap-3 w-full p-3.5 rounded-xl font-medium border transition-all transform hover:scale-[1.02] active:scale-[0.98]",
                            isDark
                                ? "border-yellow-500/30 bg-yellow-500/10 text-yellow-500 hover:bg-yellow-500/20"
                                : "border-yellow-400 bg-yellow-50 text-yellow-700 hover:bg-yellow-100"
                        )}
                    >
                        <Coffee size={18} />
                        <span>Buy me a coffee</span>
                    </a>

                    {/* Solana Address */}
                    <button
                        onClick={handleCopy}
                        className={cn(
                            "flex items-center justify-between gap-3 w-full p-3.5 rounded-xl font-medium border transition-all transform hover:scale-[1.02] active:scale-[0.98] group",
                            isDark
                                ? "border-purple-500/30 bg-purple-500/10 text-purple-400 hover:bg-purple-500/20"
                                : "border-purple-300 bg-purple-50 text-purple-700 hover:bg-purple-100"
                        )}
                    >
                        <div className="flex items-center gap-3">
                            <Wallet size={18} />
                            <span>Donate SOL</span>
                        </div>
                        <div className={cn(
                            "flex items-center gap-2 text-xs font-mono px-2 py-1 rounded bg-black/5 dark:bg-white/10",
                            copied ? "text-green-500" : "opacity-70"
                        )}>
                            <span>
                                {copied ? "Copied!" : `${solanaAddress.slice(0, 4)}...${solanaAddress.slice(-4)}`}
                            </span>
                            {copied ? <Check size={12} /> : <Copy size={12} />}
                        </div>
                    </button>
                </div>

                {/* Footer */}
                <div className="mt-6 text-center">
                    <button
                        onClick={onClose}
                        className={cn(
                            "text-xs font-semibold hover:underline",
                            isDark ? "text-neutral-500" : "text-neutral-400"
                        )}
                    >
                        Maybe later
                    </button>
                </div>
            </div>
        </div>
    );
};
