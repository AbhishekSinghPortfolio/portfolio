import { useEffect, useRef, useState } from 'react';
import { Award, CheckCircle2 } from 'lucide-react';
import { GlassCard } from './GlassCard';

const vaults = [
  {
    platform: 'Google Skillshop',
    count: '11',
    unit: 'Master Disciplines',
    accent: 'text-blue-400',
    borderColor: 'border-blue-800/30',
    bgAccent: 'bg-blue-900/20',
    items: [
      'Search Advertising',
      'Display Advertising',
      'Shopping Advertising',
      'Performance Max',
      'Video Advertising',
      'App Campaigns',
      'Measurement & Analytics',
      'AI-Powered Ads',
      'Smart Campaigns',
      'Local Campaigns',
      'Discovery Campaigns',
    ],
  },
  {
    platform: 'Microsoft Advertising',
    count: '5',
    unit: 'Professional Certifications',
    accent: 'text-teal-400',
    borderColor: 'border-teal-800/30',
    bgAccent: 'bg-teal-900/20',
    items: [
      'Search Advertising',
      'Display Advertising',
      'Retail Media',
      'Native & Audience Ads',
      'Fundamentals',
    ],
  },
  {
    platform: 'Semrush',
    count: '3+',
    unit: 'SEO Certifications',
    accent: 'text-orange-400',
    borderColor: 'border-orange-800/30',
    bgAccent: 'bg-orange-900/20',
    items: [
      'SEO Fundamentals',
      'Keyword Research',
      'Competitor Intelligence Architecture',
    ],
  },
  {
    platform: 'LinkedIn Copilot',
    count: '1',
    unit: 'AI Specialist',
    accent: 'text-sky-400',
    borderColor: 'border-sky-800/30',
    bgAccent: 'bg-sky-900/20',
    items: ['AI-Driven Sales & Marketing Workflow Specialist'],
  },
];

function useInView(threshold = 0.05) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);
  return { ref, visible };
}

export default function Credentials() {
  const { ref, visible } = useInView();
  const [activeVault, setActiveVault] = useState(0);

  return (
    <section id="credentials" ref={ref} className="py-28 px-6 relative z-10">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-obsidian-900/30 to-transparent pointer-events-none" />

      <div className="max-w-[1600px] mx-auto relative z-10">
        {/* Heading */}
        <div
          className={`text-center mb-16 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
          <p className="text-gold-400 text-xs uppercase tracking-[0.3em] mb-3 font-mono-display">Verified Credentials Vault</p>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white">
            Certified Enterprise Authority
          </h2>
        </div>

        {/* Total badge */}
        <div
          className={`flex justify-center mb-12 transition-all duration-700 ${visible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}
          style={{ transitionDelay: '200ms' }}
        >
          <div className="glass-strong rounded-full px-8 py-3 flex items-center gap-4">
            <Award size={16} className="text-gold-400" />
            <span className="text-white/50 text-xs tracking-[0.15em]">Total Verified Certifications</span>
            <span className="gold-text font-mono-display text-2xl font-semibold">
              16+
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
          {/* Vault tabs */}
          <div className="lg:col-span-4 flex flex-col gap-3">
            {vaults.map((v, i) => (
              <div
                key={i}
                className={`transition-all duration-700 ${visible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-6'}`}
                style={{ transitionDelay: `${i * 80 + 300}ms` }}
              >
                <button
                  onClick={() => setActiveVault(i)}
                  className={`w-full text-left p-5 rounded-xl border transition-all duration-300 ${
                    activeVault === i
                      ? 'glass-strong border-gold-600/40'
                      : 'glass border-gold-800/15 hover:border-gold-700/25'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className={`text-[10px] tracking-[0.15em] uppercase font-medium mb-0.5 ${v.accent}`}>
                        {v.platform}
                      </div>
                      <div className="text-white/40 text-[11px]">{v.unit}</div>
                    </div>
                    <div className="gold-text font-mono-display text-2xl font-semibold">
                      {v.count}
                    </div>
                  </div>
                </button>
              </div>
            ))}
          </div>

          {/* Detail panel */}
          <div
            className={`lg:col-span-8 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
            style={{ transitionDelay: '500ms' }}
          >
            <GlassCard className="p-8 h-full" tiltAmount={3}>
              <div className="flex items-start justify-between mb-8">
                <div>
                  <h3 className="text-white text-xl font-semibold mb-1">{vaults[activeVault].platform}</h3>
                  <p className={`text-[10px] tracking-[0.15em] uppercase ${vaults[activeVault].accent}`}>
                    {vaults[activeVault].count} {vaults[activeVault].unit}
                  </p>
                </div>
                <div className="flex items-center gap-2 bg-gold-900/20 border border-gold-700/25 rounded-full px-3 py-1.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-gold-400 animate-pulse" />
                  <span className="text-gold-400 text-[9px] tracking-[0.2em] uppercase">Verified</span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {vaults[activeVault].items.map((item, j) => (
                  <div
                    key={j}
                    className="flex items-start gap-3 p-3.5 rounded-lg bg-white/[0.02] border border-gold-800/10 hover:border-gold-700/20 transition-colors duration-200"
                  >
                    <CheckCircle2 size={13} className={`mt-0.5 flex-shrink-0 ${vaults[activeVault].accent}`} />
                    <span className="text-white/60 text-sm leading-snug">{item}</span>
                  </div>
                ))}
              </div>
            </GlassCard>
          </div>
        </div>
      </div>
    </section>
  );
}
