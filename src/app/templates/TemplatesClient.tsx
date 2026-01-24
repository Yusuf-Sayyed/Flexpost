"use client";

import Link from "next/link";
import { Twitter, TrendingUp, Linkedin, ArrowRight } from "lucide-react";
import { usePostStore } from "@/store/usePostStore";
import { cn } from "@/lib/utils";
import { GridBackgroundDemo } from "@/components/ui/grid-background-demo";
import { PageHeader } from "@/components/layout/PageHeader";

const templates = [
    {
        title: "X (Twitter) Post",
        description: "Create verified tweets with custom metrics, dark mode, and image support.",
        icon: <Twitter size={32} className="text-white" />,
        href: "/create",
        status: "Ready",
        containerClass: "from-blue-500 to-blue-600",
        shadow: "shadow-blue-500/20",
    },
    {
        title: "Crypto PnL Card",
        description: "Generate viral profit/loss cards with video backgrounds and custom ROI.",
        icon: <TrendingUp size={32} className="text-white" />,
        href: "/templates/axiom",
        status: "New",
        containerClass: "from-green-500 to-emerald-600",
        shadow: "shadow-green-500/20",
    },
    {
        title: "LinkedIn Post",
        description: "Professional post mockups for corporate announcements and hiring.",
        icon: <Linkedin size={32} className="text-white" />,
        href: "#",
        status: "Coming Soon",
        containerClass: "from-blue-700 to-indigo-800",
        shadow: "shadow-blue-700/20",
    },
];

export default function TemplatesClient() {
    const { globalTheme } = usePostStore();
    const isDark = globalTheme === 'dark';

    return (
        <main className={cn(
            "min-h-screen relative isolation-auto transition-colors duration-300 overflow-hidden",
            isDark ? "bg-[#171717]" : "bg-[#EAF2FF]"
        )}>
            {/* Background with Grid */}
            <GridBackgroundDemo isDark={isDark} />

            {/* Navigation Header */}
            <PageHeader title="Templates" backHref="/" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">

                {/* Header Section */}
                <div className="text-center mb-16 space-y-6">

                    <h1 className={cn(
                        "text-5xl md:text-7xl font-extrabold tracking-tight leading-tight transition-colors",
                        isDark ? "text-white" : "text-slate-900"
                    )}>
                        Choose Your Canvas
                    </h1>

                    <p className={cn(
                        "text-lg md:text-xl max-w-2xl mx-auto leading-relaxed transition-colors",
                        isDark ? "text-slate-400" : "text-slate-500"
                    )}>
                        Select a professionally designed template to start creating.
                    </p>
                </div>

                {/* Templates Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {templates.map((t, i) => (
                        <Link
                            key={i}
                            href={t.href}
                            className={cn(
                                "relative group flex flex-col p-8 rounded-3xl border transition-all duration-500",
                                "hover:-translate-y-2 hover:shadow-2xl",
                                t.status === "Coming Soon" ? "pointer-events-none opacity-80 decoration-slice" : "",
                                isDark
                                    ? "bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20 shadow-black/40"
                                    : "bg-white/70 border-white/50 hover:bg-white hover:border-white shadow-xl shadow-blue-900/5 backdrop-blur-xl"
                            )}
                        >
                            {/* Icon Box */}
                            <div className={cn(
                                "w-16 h-16 rounded-2xl flex items-center justify-center mb-8 transition-transform duration-500 group-hover:scale-110 shadow-lg",
                                t.status === "Coming Soon" ? "grayscale opacity-50" : `bg-gradient-to-br ${t.containerClass} ${t.shadow}`
                            )}>
                                {t.icon}
                            </div>

                            {/* Badges */}
                            <div className="absolute top-6 right-6 flex gap-2">
                                {t.status === "New" && (
                                    <span className="px-3 py-1 text-[10px] font-bold uppercase tracking-wider bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-full shadow-lg shadow-green-500/30 animate-pulse">
                                        New
                                    </span>
                                )}
                                {t.status === "Coming Soon" && (
                                    <span className={cn(
                                        "px-3 py-1 text-[10px] font-bold uppercase tracking-wider rounded-full border",
                                        isDark ? "bg-white/5 border-white/10 text-slate-400" : "bg-slate-100 border-slate-200 text-slate-500"
                                    )}>
                                        Soon
                                    </span>
                                )}
                            </div>

                            {/* Content */}
                            <h3 className={cn(
                                "text-2xl font-bold mb-3",
                                isDark ? "text-white" : "text-slate-900"
                            )}>
                                {t.title}
                            </h3>

                            <p className={cn(
                                "text-sm leading-relaxed mb-8 flex-grow",
                                isDark ? "text-slate-400" : "text-slate-500"
                            )}>
                                {t.description}
                            </p>

                            {/* Action */}
                            <div className={cn(
                                "flex items-center font-bold text-sm transition-all duration-300",
                                t.status === "Coming Soon"
                                    ? "text-slate-400 cursor-not-allowed"
                                    : isDark ? "text-blue-400 group-hover:text-blue-300" : "text-blue-600 group-hover:text-blue-500"
                            )}>
                                {t.status === "Coming Soon" ? (
                                    <span>Not Available Yet</span>
                                ) : (
                                    <>
                                        Start Designing
                                        <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
                                    </>
                                )}
                            </div>
                        </Link>
                    ))}
                </div>

                {/* Bottom CTA (Optional) */}
                {!isDark && (
                    <div className="mt-20 text-center">
                        <p className="text-slate-500 text-sm font-medium">
                            More templates are in the works. Stay tuned!
                        </p>
                    </div>
                )}
            </div>
        </main>
    );
}
