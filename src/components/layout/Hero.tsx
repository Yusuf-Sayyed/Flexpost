'use client';

import { ArrowRight, Sparkles, CheckCircle2 } from 'lucide-react';

export const Hero = () => {

  const scrollToEditor = () => {
    const editor = document.getElementById('design-studio');
    if (editor) {
      editor.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-32 overflow-hidden">

      {/* Background Gradients */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[500px] bg-blue-100/40 blur-[120px] rounded-full pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">

        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-blue-600 text-xs font-bold uppercase tracking-wide mb-8 animate-fade-in-up">
          <Sparkles size={14} />
          <span>v1.0 Now Live</span>
        </div>

        {/* Headline */}
        <h1 className="text-5xl md:text-7xl font-extrabold text-slate-900 tracking-tight mb-6 leading-tight">
          Create Viral <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Mockups</span> <br className="hidden md:block" />
          in Seconds.
        </h1>

        {/* Subheadline */}
        <p className="text-lg md:text-xl text-slate-500 max-w-2xl mx-auto mb-10 leading-relaxed">
          The fastest way to design beautiful social media posts for your presentations, pitch decks, and marketing materials. No design skills required.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
          <button
            onClick={scrollToEditor}
            className="flex items-center gap-2 px-8 py-4 text-base font-bold text-white bg-slate-900 rounded-full hover:bg-black hover:scale-105 transition-all shadow-xl shadow-slate-900/20"
          >
            Start Creating
            <ArrowRight size={18} />
          </button>

          <button className="flex items-center gap-2 px-8 py-4 text-base font-bold text-slate-600 bg-white border border-slate-200 rounded-full hover:bg-slate-50 hover:border-slate-300 transition-all">
            View Templates
          </button>
        </div>

        {/* Social Proof / Features */}
        <div className="flex flex-wrap justify-center gap-x-8 gap-y-4 text-sm font-medium text-slate-500">
          <div className="flex items-center gap-2">
            <CheckCircle2 size={16} className="text-green-500" />
            <span>No Login Required</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 size={16} className="text-green-500" />
            <span>High-Res Export</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 size={16} className="text-green-500" />
            <span>100% Free</span>
          </div>
        </div>

      </div>
    </section>
  );
};