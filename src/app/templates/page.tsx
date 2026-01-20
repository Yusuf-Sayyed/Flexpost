"use client";

import Link from "next/link";
import { Twitter, TrendingUp, Linkedin, ArrowRight, LayoutTemplate } from "lucide-react";
import { usePostStore } from "@/store/usePostStore";
import { cn } from "@/lib/utils";

const templates = [
  {
    title: "X (Twitter) Post",
    description: "Create verified tweets with custom metrics, dark mode, and image support.",
    icon: <Twitter size={32} className="text-blue-400" />,
    href: "/create", // Links to your main editor
    status: "Ready",
    color: "bg-blue-500/10 border-blue-500/20 hover:border-blue-500/40",
  },
  {
    title: "Crypto PnL Card",
    description: "Generate viral profit/loss cards with video backgrounds and custom ROI.",
    icon: <TrendingUp size={32} className="text-green-400" />,
    href: "/templates/axiom", // Links to the PnL page we made
    status: "New",
    color: "bg-green-500/10 border-green-500/20 hover:border-green-500/40",
  },
  {
    title: "LinkedIn Post",
    description: "Professional post mockups for corporate announcements and hiring.",
    icon: <Linkedin size={32} className="text-blue-600" />,
    href: "#",
    status: "Coming Soon",
    color: "bg-slate-500/5 border-slate-500/20 opacity-60 cursor-not-allowed",
  },
];

export default function TemplatesPage() {
  const { globalTheme } = usePostStore();
  const isDark = globalTheme === 'dark';

  return (
    <div className={cn(
      "min-h-screen py-24 px-4 sm:px-6 lg:px-8 transition-colors duration-300",
      isDark ? "bg-slate-950 text-white" : "bg-slate-50 text-slate-900"
    )}>
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="text-center mb-16 space-y-4">
          <div className={cn(
            "inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide",
            isDark ? "bg-white/10 text-slate-300" : "bg-slate-200 text-slate-600"
          )}>
            <LayoutTemplate size={14} />
            <span>Template Gallery</span>
          </div>

          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
            Choose a Template
          </h1>
          <p className={cn(
            "text-lg max-w-2xl mx-auto",
            isDark ? "text-slate-400" : "text-slate-600"
          )}>
            Select a layout to start customizing. All templates are free and run 100% in your browser.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {templates.map((t, i) => (
            <Link
              key={i}
              href={t.href}
              className={cn(
                "relative group flex flex-col p-8 rounded-2xl border transition-all duration-300",
                t.status === "Coming Soon" ? "pointer-events-none" : "hover:-translate-y-1 hover:shadow-2xl",
                t.color,
                isDark ? "bg-slate-900/50" : "bg-white shadow-sm"
              )}
            >
              <div className="flex justify-between items-start mb-6">
                <div className={cn(
                  "p-3 rounded-xl",
                  isDark ? "bg-white/5" : "bg-slate-100"
                )}>
                  {t.icon}
                </div>
                {t.status === "New" && (
                  <span className="px-2 py-1 text-[10px] font-bold uppercase tracking-wider bg-green-500 text-black rounded-full">
                    New
                  </span>
                )}
                {t.status === "Coming Soon" && (
                  <span className="px-2 py-1 text-[10px] font-bold uppercase tracking-wider bg-slate-500/20 text-slate-500 rounded-full">
                    Soon
                  </span>
                )}
              </div>

              <h3 className={cn(
                "text-xl font-bold mb-2",
                isDark ? "text-white" : "text-slate-900"
              )}>
                {t.title}
              </h3>

              <p className={cn(
                "text-sm mb-8 flex-grow",
                isDark ? "text-slate-400" : "text-slate-500"
              )}>
                {t.description}
              </p>

              <div className={cn(
                "flex items-center font-bold text-sm transition-colors",
                t.status === "Coming Soon" ? "hidden" : "text-blue-500 group-hover:text-blue-400"
              )}>
                Start Design <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}