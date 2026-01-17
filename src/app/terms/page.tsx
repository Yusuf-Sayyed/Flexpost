'use client';

import { usePostStore } from '@/store/usePostStore';
import { cn } from '@/lib/utils';
import { Scale, FileText, AlertCircle, ChevronLeft } from 'lucide-react';
import Link from 'next/link';
import { PageHeader } from '@/components/layout/PageHeader';

export default function TermsOfService() {
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
    {/* Top Header */}
        <PageHeader title='Terms of Service' />

      <div className="max-w-4xl mx-auto space-y-12">

        {/* Header */}
        <div className="space-y-4 text-center md:text-left mt-10">
          <p className="text-lg md:text-xl opacity-80 max-w-2xl">
            By using FlexPost, you agree to these terms. As a free and open-source tool, we aim to be as transparent as possible.
          </p>
        </div>

        {/* Detailed Sections */}
        <div className={cn("space-y-10 prose max-w-none", isDark ? "prose-invert" : "prose-slate")}>

          <Section title="1. Acceptance of Terms" isDark={isDark}>
            <p>
              FlexPost ("we," "our," or "us") provides this website and tool to you subject to the following Terms of Service. By accessing or using our Service, you agree to be bound by these Terms. If you disagree with any part of the terms, you may not access the Service.
            </p>
          </Section>

          <Section title="2. Open Source License" isDark={isDark}>
            <div className={cn("p-4 rounded-xl border mb-4", isDark ? "bg-white/5 border-white/10" : "bg-white border-slate-200")}>
                <div className="flex items-center gap-2 font-bold mb-2">
                    <Scale size={18} /> MIT License
                </div>
                <p className="text-sm opacity-80">
                    The FlexPost source code is open-source and licensed under the MIT License. You are free to fork, modify, and distribute the code, provided you include the original copyright license.
                </p>
            </div>
          </Section>

          <Section title="3. Use of Service" isDark={isDark}>
            <p>
              FlexPost is a tool for creating mockups and graphical content. You agree not to use the Service:
            </p>
            <ul className="list-disc pl-6 space-y-2 mt-2">
              <li>To generate content that is illegal, harmful, threatening, or defamatory.</li>
              <li>To impersonate others with malicious intent.</li>
              <li>To violate the intellectual property rights of others.</li>
            </ul>
            <p className="mt-2">
              <strong>Note:</strong> We are not responsible for the content you generate. Since the tool runs locally in your browser, you retain full ownership and responsibility for your creations.
            </p>
          </Section>

          <Section title="4. Disclaimer of Warranties" isDark={isDark}>
            <p>
              The Service is provided on an "AS IS" and "AS AVAILABLE" basis. FlexPost makes no representations or warranties of any kind, whether express or implied, regarding the operation of the Service or the information, content, or materials included.
            </p>
          </Section>

          <Section title="5. Limitation of Liability" isDark={isDark}>
            <p>
              To the fullest extent permitted by law, FlexPost shall not be liable for any damages of any kind arising from the use of this Service, including but not limited to direct, indirect, incidental, punitive, and consequential damages.
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

const Section = ({ title, children, isDark }: { title: string, children: React.ReactNode, isDark: boolean }) => (
  <section className="space-y-3">
    <h2 className={cn("text-2xl font-bold", isDark ? "text-white" : "text-slate-900")}>{title}</h2>
    <div className="text-base leading-relaxed opacity-90">
      {children}
    </div>
  </section>
);