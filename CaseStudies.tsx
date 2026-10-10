import { useEffect, useRef, useState } from 'react';
import { TrendingUp, Zap, Globe, BarChart3 } from 'lucide-react';
import { GlassCard } from './GlassCard';

const cases = [
  {
    icon: TrendingUp,
    category: 'D2C E-Commerce',
    headline: '7.4x ROAS — Sustained',
    metric: '7.4x',
    metricLabel: 'Return on Ad Spend',
    description:
      'Scaled multi-category storefronts to a stable 7.4x ROAS through tightly integrated Google and Meta funnels — turning ad spend into predictable, repeatable revenue.',
    highlights: [
      'Multi-category storefront architecture',
      'Google + Meta unified funnel strategy',
      'Stable, sustained ROAS — not a spike',
    ],
    accentColor: 'text-emerald-400',
    borderAccent: 'border-emerald-700/30',
    bgAccent: 'bg-emerald-900/15',
    barColor: 'bg-emerald-400',
  },
  {
    icon: Zap,
    category: 'B2B Manufacturing',
    headline: '340% Pipeline Velocity',
    metric: '+340%',
    metricLabel: 'Inbound Pipeline Growth',
    description:
      'Automated Salesforce sales funnels to increase inbound pipeline velocity by 340% — transforming a manual, slow-moving B2B process into a self-sustaining acquisition engine.',
    highlights: [
      'Salesforce automation and CRM integration',
      'Full funnel mapping and qualification flows',
      '340% inbound pipeline velocity increase',
    ],
    accentColor: 'text-gold-400',
    borderAccent: 'border-gold-700/30',
    bgAccent: 'bg-gold-900/15',
    barColor: 'bg-gold-400',
  },
  {
    icon: Globe,
    category: 'Global Brand Operations',
    headline: '100+ SKUs to Market',
    metric: '100+',
    metricLabel: 'Products Launched Globally',
    description:
      'Engineered and launched over 100 SKUs across global markets — from initial vendor discovery and price negotiation through compliance sign-off to final international delivery.',
    highlights: [
      'End-to-end product lifecycle ownership',
      'Global vendor discovery and negotiation',
      'Full compliance and delivery execution',
    ],
    accentColor: 'text-sky-400',
    borderAccent: 'border-sky-700/30',
    bgAccent: 'bg-sky-900/15',
    barColor: 'bg-sky-400',
  },
];

const supplyChainMetrics = [
  { label: 'Inventory Sync', value: 95, color: 'bg-emerald-400', textColor: 'text-emerald-400' },
  { label: 'Warehouse Efficiency', value: 88, color: 'bg-gold-400', textColor: 'text-gold-400' },
  { label: 'Pipeline Automation', value: 92, color: 'bg-sky-400', textColor: 'text-sky-400' },
  { label: 'Fulfillment Rate', value: 78, color: 'bg-amber-400', textColor: 'text-amber-400' },
];

const trafficBars = [
  { month: 'Jan', organic: 22, paid: 41 },
  { month: 'Feb', organic: 31, paid: 48 },
  { month: 'Mar', organic: 45, paid: 55 },
  { month: 'Apr', organic: 58, paid: 62 },
  { month: 'May', organic: 72, paid: 70 },
  { month: 'Jun', organic: 89, paid: 78 },
  { month: 'Jul', organic: 100, paid: 85 },
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

function MeterBar({ label, value, color, textColor, visible, delay }: {
  label: string; value: number; color: string; textColor: string; visible: boolean; delay: number;
}) {
  return (
    <div className="space-y-2" style={{ transitionDelay: `${delay}ms` }}>
      <div className="flex items-center justify-between">
        <span className="text-white/50 text-xs">{label}</span>
        <span className={`font-mono-display text-sm font-bold ${textColor}`}>{value}%</span>
      </div>
      <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-1000 ease-out ${color}`}
          style={{ width: visible ? `${value}%` : '0%', transitionDelay: `${delay}ms` }}
        />
      </div>
    </div>
  );
}

export default function CaseStudies() {
  const { ref, visible } = useInView();

  return (
    <section id="results" ref={ref} className="py-28 px-6 relative z-10">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-obsidian-900/30 to-transparent pointer-events-none" />

      <div className="max-w-[1600px] mx-auto relative z-10">
        {/* Heading */}
        <div className={`text-center mb-16 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <p className="text-gold-400 text-xs uppercase tracking-[0.3em] mb-3 font-mono-display">Proven Track Record</p>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white">
            Real-Time Impact & Case Studies Matrix
          </h2>
        </div>

        {/* Case cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-10">
          {cases.map((c, i) => {
            const Icon = c.icon;
            return (
              <div
                key={i}
                className={`transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                style={{ transitionDelay: `${i * 100 + 200}ms` }}
              >
                <GlassCard className="p-7 h-full" tiltAmount={7}>
                  <div className="flex items-center justify-between mb-6">
                    <span className={`text-[9px] tracking-[0.3em] uppercase ${c.accentColor}`}>{c.category}</span>
                    <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${c.bgAccent} border ${c.borderAccent}`}>
                      <Icon size={15} className={c.accentColor} />
                    </div>
                  </div>
                  <div className={`font-mono-display text-5xl font-bold mb-1 ${c.accentColor}`}>{c.metric}</div>
                  <div className="text-white/30 text-[10px] tracking-[0.15em] uppercase mb-5">{c.metricLabel}</div>
                  <h3 className="text-white/90 text-base font-semibold mb-3">{c.headline}</h3>
                  <p className="text-white/40 text-sm leading-relaxed mb-5">{c.description}</p>
                  <div className={`border-t ${c.borderAccent} pt-4 space-y-2`}>
                    {c.highlights.map((h, j) => (
                      <div key={j} className="flex items-start gap-2.5">
                        <span className={`mt-1.5 w-1 h-1 rounded-full flex-shrink-0 ${c.accentColor.replace('text-', 'bg-')}`} />
                        <span className="text-white/45 text-xs leading-snug">{h}</span>
                      </div>
                    ))}
                  </div>
                </GlassCard>
              </div>
            );
          })}
        </div>

        {/* Bottom analytics row */}
        <div className={`grid grid-cols-1 lg:grid-cols-2 gap-6 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} style={{ transitionDelay: '500ms' }}>
          {/* Organic Traffic Chart */}
          <GlassCard className="p-8" tiltAmount={2}>
            <div className="flex items-center gap-3 mb-6">
              <BarChart3 size={16} className="text-gold-400" />
              <div>
                <p className="text-white/70 text-sm font-semibold">Organic Traffic Surge</p>
                <p className="text-white/30 text-[10px] uppercase tracking-wider">7-Month Compounding Growth</p>
              </div>
              <div className="ml-auto flex items-center gap-4 text-[10px]">
                <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-sm bg-gold-400 inline-block" />Organic</span>
                <span className="flex items-center gap-1.5 text-white/30"><span className="w-2.5 h-2.5 rounded-sm bg-white/15 inline-block" />Paid</span>
              </div>
            </div>
            <div className="flex items-end gap-2 h-40">
              {trafficBars.map((bar, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-1">
                  <div className="w-full flex items-end gap-0.5 justify-center" style={{ height: '120px' }}>
                    <div
                      className="flex-1 rounded-t bg-white/10 transition-all duration-700 ease-out"
                      style={{ height: visible ? `${bar.paid}%` : '0%', transitionDelay: `${i * 80 + 600}ms` }}
                    />
                    <div
                      className="flex-1 rounded-t bg-gradient-to-t from-gold-600 to-gold-400 transition-all duration-700 ease-out"
                      style={{ height: visible ? `${bar.organic}%` : '0%', transitionDelay: `${i * 80 + 700}ms` }}
                    />
                  </div>
                  <span className="text-white/25 text-[9px]">{bar.month}</span>
                </div>
              ))}
            </div>
            <div className="mt-4 pt-4 border-t border-gold-800/15 flex items-center justify-between">
              <span className="text-white/30 text-xs">Organic +354% over 7 months</span>
              <span className="gold-text font-mono-display text-sm font-bold">+354%</span>
            </div>
          </GlassCard>

          {/* Supply Chain Efficiency */}
          <GlassCard className="p-8" tiltAmount={2}>
            <div className="mb-6">
              <p className="text-white/70 text-sm font-semibold mb-1">Supply Chain Efficiency</p>
              <p className="text-white/30 text-[10px] uppercase tracking-wider">Enterprise Operations Performance Index</p>
            </div>
            <div className="space-y-6">
              {supplyChainMetrics.map((m, i) => (
                <MeterBar
                  key={i}
                  label={m.label}
                  value={m.value}
                  color={m.color}
                  textColor={m.textColor}
                  visible={visible}
                  delay={i * 120 + 600}
                />
              ))}
            </div>
            <div className="mt-6 pt-5 border-t border-gold-800/15 grid grid-cols-2 gap-4">
              <div className="text-center">
                <div className="gold-text font-mono-display text-2xl font-bold">88.25%</div>
                <div className="text-white/30 text-[10px] uppercase tracking-wider mt-0.5">Avg. Efficiency Score</div>
              </div>
              <div className="text-center">
                <div className="gold-text font-mono-display text-2xl font-bold">100+</div>
                <div className="text-white/30 text-[10px] uppercase tracking-wider mt-0.5">SKUs Synchronized</div>
              </div>
            </div>
          </GlassCard>
        </div>

        {/* Revenue multiplier banner */}
        <div className={`mt-6 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} style={{ transitionDelay: '700ms' }}>
          <GlassCard className="p-10 text-center" tiltAmount={1}>
            <p className="text-white/30 text-[10px] tracking-[0.3em] uppercase mb-4">Documented Revenue Impact</p>
            <div className="gold-text font-mono-display text-5xl md:text-7xl font-bold mb-2">5x — 7.8x</div>
            <p className="text-white/35 text-sm">Sustained revenue multiplier across enterprise client portfolios</p>
          </GlassCard>
        </div>
      </div>
    </section>
  );
}
