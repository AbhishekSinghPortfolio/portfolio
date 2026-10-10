import { useEffect, useRef, useState } from 'react';
import { GlassCard } from './GlassCard';

const categories = [
  {
    label: 'Market Research',
    icon: 'M',
    metrics: [
      { label: 'Competitor Landscape Audits', value: '40+' },
      { label: 'Consumer Demand Analyses', value: '25+' },
      { label: 'Pricing Strategy Models', value: '18' },
      { label: 'Market Sizing Studies', value: '12' },
    ],
  },
  {
    label: 'Product Development',
    icon: 'P',
    metrics: [
      { label: 'Products Engineered End-to-End', value: '100+' },
      { label: 'SKUs Launched Globally', value: '100+' },
      { label: 'Vendor Discovery Cycles', value: '60+' },
      { label: 'Compliance Certifications Secured', value: '30+' },
    ],
  },
  {
    label: 'Launch & Distribution',
    icon: 'L',
    metrics: [
      { label: 'Multi-Channel Launch Campaigns', value: '35+' },
      { label: 'Retail Shelf Placements', value: '20+' },
      { label: 'E-Commerce Listings Live', value: '50+' },
      { label: 'International Market Entries', value: '8' },
    ],
  },
  {
    label: 'Performance & Revenue',
    icon: 'R',
    metrics: [
      { label: 'Sustained ROAS Achieved', value: '7.4x' },
      { label: 'Revenue Multiplier Range', value: '5x–7.8x' },
      { label: 'Pipeline Velocity Increase', value: '+340%' },
      { label: 'Ad Ecosystems Managed', value: 'Multi-Crore' },
    ],
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

export default function NPDMetrics() {
  const { ref, visible } = useInView(0.05);
  const [activeTab, setActiveTab] = useState(0);

  return (
    <section id="npd-metrics" ref={ref} className="py-28 px-6 relative z-10">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-obsidian-900/20 to-transparent pointer-events-none" />

      <div className="max-w-[1600px] mx-auto relative z-10">
        {/* Heading */}
        <div
          className={`text-center mb-16 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
          <p className="text-gold-400 text-xs uppercase tracking-[0.3em] mb-3 font-mono-display">NPD Metrics Matrix</p>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white">
            100+ Products — Full Lifecycle Data
          </h2>
        </div>

        {/* Tab bar */}
        <div
          className={`flex flex-wrap justify-center gap-3 mb-12 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
          style={{ transitionDelay: '150ms' }}
        >
          {categories.map((cat, i) => (
            <button
              key={i}
              onClick={() => setActiveTab(i)}
              className={`px-5 py-3 rounded-xl text-xs tracking-[0.12em] uppercase transition-all duration-300 flex items-center gap-3 ${
                activeTab === i
                  ? 'glass-strong border-gold-600/40 text-gold-300'
                  : 'glass border-white/5 text-white/35 hover:text-white/55'
              }`}
            >
              <span className={`w-7 h-7 rounded-lg flex items-center justify-center font-mono-display font-bold text-[10px] ${
                activeTab === i ? 'bg-gold-400/15 border border-gold-600/30 text-gold-300' : 'bg-white/5 border border-white/10 text-white/40'
              }`}>{cat.icon}</span>
              {cat.label}
            </button>
          ))}
        </div>

        {/* Metric cards */}
        <div
          className={`transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
          style={{ transitionDelay: '300ms' }}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {categories[activeTab].metrics.map((m, j) => (
              <div
                key={`${activeTab}-${j}`}
                className="transition-all duration-500"
                style={{ transitionDelay: `${j * 60}ms`, opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(20px)' }}
              >
                <GlassCard className="p-6 h-full" tiltAmount={4}>
                  <div className="gold-text font-mono-display text-4xl sm:text-5xl font-extrabold mb-2">
                    {m.value}
                  </div>
                  <div className="text-white/40 text-xs uppercase tracking-wider font-medium leading-snug">
                    {m.label}
                  </div>
                </GlassCard>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom summary banner */}
        <div
          className={`mt-10 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
          style={{ transitionDelay: '500ms' }}
        >
          <GlassCard className="p-8" tiltAmount={2}>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 text-center">
              {[
                { v: '100+', l: 'Total Products' },
                { v: '16+', l: 'Certifications' },
                { v: '5x–7.8x', l: 'Revenue Multiplier' },
                { v: '120', l: 'Day Execution Model' },
              ].map((s, i) => (
                <div key={i}>
                  <div className="gold-text font-mono-display text-3xl font-bold mb-1">{s.v}</div>
                  <div className="text-white/30 text-[10px] uppercase tracking-wider">{s.l}</div>
                </div>
              ))}
            </div>
          </GlassCard>
        </div>
      </div>
    </section>
  );
}
