'use client';

import { usePostStore } from '@/store/usePostStore';
import { cn } from '@/lib/utils';
import { ShieldCheck, Lock, Database, EyeOff, ChevronLeft } from 'lucide-react';
import Link from 'next/link';
import { PageHeader } from '@/components/layout/PageHeader';

export default function PrivacyPolicy() {
  const { globalTheme } = usePostStore();
  const isDark = globalTheme === 'dark';
  const isGlobalDark = globalTheme === 'dark';


  return (
    <main
      className={cn(
        "min-h-screen w-full transition-colors duration-300 ease-in-out pt-0 pb-24 px-6 md:px-12 lg:px-24",
        isDark ? "bg-[#171717] text-slate-300" : "bg-[#EAF2FF] text-slate-600"
      )}
    >

      {/*Top Header*/}
      <PageHeader title='Privacy policy' />

      <div className="max-w-4xl mx-auto space-y-12">

        {/* Header */}
        <div className="space-y-4 text-center md:text-left mt-10">
          <p className="text-lg md:text-xl opacity-80 max-w-2xl">
            FlexPost is a free, open-source tool designed with your privacy in mind.
            We believe your data belongs to you, which is why we don't touch it.
          </p>
        </div>

        {/* Key Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <PrivacyCard
            icon={<Database size={24} />}
            title="No Server Storage"
            desc="We do not store your images, texts, or profiles on our servers. All processing happens locally in your browser."
            isDark={isDark}
          />
          <PrivacyCard
            icon={<EyeOff size={24} />}
            title="No Tracking"
            desc="We do not use cookies to track your behavior across the web. There are no hidden trackers or analytics scripts."
            isDark={isDark}
          />
        </div>

        {/* Detailed Sections */}
        <div className={cn("space-y-8 prose max-w-none", isDark ? "prose-invert" : "prose-slate")}>

          <Section title="1. Information Collection" isDark={isDark}>
            <p>
              FlexPost operates as a <strong>client-side application</strong>. This means:
            </p>
            <ul className="list-disc pl-6 space-y-2 mt-2">
              <li><strong>Images:</strong> When you upload an avatar or post image, it is processed via your browser's local API. It is never uploaded to a cloud server.</li>
              <li><strong>Text Input:</strong> The tweets you write are stored temporarily in your browser's <code>Local Storage</code> so you don't lose work if you refresh.</li>
            </ul>
          </Section>

          <Section title="2. Local Storage" isDark={isDark}>
            <p>
              We use your browser's Local Storage mechanism to save your preferences (like Dark/Light mode) and your current draft. You can clear this data at any time by clearing your browser cache.
            </p>
          </Section>

          <Section title="3. Third-Party Links" isDark={isDark}>
            <p>
              Our website contains links to external sites (like GitHub or X). If you click on a third-party link, you will be directed to that site. Note that these external sites are not operated by us, and we strongly advise you to review their Privacy Policies.
            </p>
          </Section>

          <Section title="4. Changes to This Policy" isDark={isDark}>
            <p>
              We may update our Privacy Policy from time to time. Since this project is open-source, you can view all changes directly in our GitHub repository history.
            </p>
          </Section>

        </div>

        {/* Footer Note */}
        <div className={cn("pt-10 border-t mt-12", isDark ? "border-white/10" : "border-slate-200")}>
          <p className="text-sm opacity-60">
            Last updated: January 2026
          </p>
        </div>

      </div>
    </main>
  );
}

// Components for styling
const PrivacyCard = ({ icon, title, desc, isDark }: { icon: any, title: string, desc: string, isDark: boolean }) => (
  <div className={cn(
    "p-6 rounded-2xl border transition-all hover:scale-[1.01]",
    isDark ? "bg-white/5 border-white/10 text-slate-200" : "bg-white border-blue-100 text-slate-700 shadow-sm"
  )}>
    <div className={cn("mb-4 p-3 rounded-full w-fit", isDark ? "bg-blue-500/20 text-blue-400" : "bg-blue-50 text-blue-600")}>
      {icon}
    </div>
    <h3 className="text-lg font-bold mb-2">{title}</h3>
    <p className="text-sm opacity-80 leading-relaxed">{desc}</p>
  </div>
);

const Section = ({ title, children, isDark }: { title: string, children: React.ReactNode, isDark: boolean }) => (
  <section className="space-y-3">
    <h2 className={cn("text-2xl font-bold", isDark ? "text-white" : "text-slate-900")}>{title}</h2>
    <div className="text-base leading-relaxed opacity-90">
      {children}
    </div>
  </section>
);