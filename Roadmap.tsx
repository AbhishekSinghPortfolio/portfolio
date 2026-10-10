import { useEffect, useRef, useState } from 'react';
import { CheckCircle2, TrendingUp, Clock, Layers } from 'lucide-react';
import { GlassCard } from './GlassCard';

const industries = [
  {
    id: 'dtc',
    label: 'D2C E-Commerce',
    description: 'Direct-to-consumer brands scaling through performance ads and organic funnels.',
    phases: [
      {
        number: '01',
        label: 'Foundation',
        span: 'Days 1–30',
        color: 'text-sky-400',
        borderColor: 'border-sky-700/40',
        bgAccent: 'bg-sky-900/15',
        items: [
          'Full Google Shopping & Performance Max audit — feed optimization and wasted-spend purge',
          'Meta Ads account restructure — campaign hierarchy, pixel validation, and CAPI setup',
          'GA4 e-commerce tracking configuration with conversion event verification',
          'Competitor pricing and creative intelligence mapping',
          'Website Core Web Vitals and conversion rate baseline analysis',
        ],
      },
      {
        number: '02',
        label: 'Acceleration',
        span: 'Days 31–75',
        color: 'text-amber-400',
        borderColor: 'border-amber-700/40',
        bgAccent: 'bg-amber-900/15',
        items: [
          'Scaling Google Shopping and Meta retargeting with 3x budget efficiency',
          'A/B creative testing framework — rotation of 12+ ad variants per product line',
          'Influencer barter and paid seeding for top 5 SKUs',
          'Email and SMS automation sequences for abandoned cart recovery',
          'Organic SEO content cluster deployment targeting high-intent purchase keywords',
        ],
      },
      {
        number: '03',
        label: 'Dominance',
        span: 'Days 76–120',
        color: 'text-gold-400',
        borderColor: 'border-gold-700/40',
        bgAccent: 'bg-gold-900/15',
        items: [
          'Sustained 5x–7.8x ROAS with automated bidding rules and dayparting',
          'Full-funnel attribution model locked — first-touch, last-touch, and data-driven blended view',
          'New product launch sequencing for 10+ SKU expansion',
          'Loyalty and post-purchase lifecycle campaigns for repeat revenue',
          'Final growth playbook documentation and team knowledge transfer',
        ],
      },
    ],
  },
  {
    id: 'b2b',
    label: 'B2B Manufacturing',
    description: 'Industrial and manufacturing businesses building enterprise sales pipelines.',
    phases: [
      {
        number: '01',
        label: 'Foundation',
        span: 'Days 1–30',
        color: 'text-sky-400',
        borderColor: 'border-sky-700/40',
        bgAccent: 'bg-sky-900/15',
        items: [
          'Salesforce CRM audit — pipeline hygiene, lead scoring recalibration, and stage mapping',
          'Google Search and Microsoft Advertising restructure targeting B2B decision-maker queries',
          'Website technical SEO audit with structured data and E-E-A-T signal strengthening',
          'Competitor share-of-voice mapping across search and industry directories',
          'ICP (Ideal Customer Profile) matrix and buyer persona documentation',
        ],
      },
      {
        number: '02',
        label: 'Acceleration',
        span: 'Days 31–75',
        color: 'text-amber-400',
        borderColor: 'border-amber-700/40',
        bgAccent: 'bg-amber-900/15',
        items: [
          'LinkedIn Ads and Google Display campaigns targeting procurement and operations titles',
          'Salesforce automation flows — lead qualification, routing, and nurture sequences',
          'Long-form content and GEO strategy for AI-driven B2B discovery',
          'Case study and whitepaper production for mid-funnel authority building',
          'Inbound pipeline velocity optimization — 340% improvement benchmark target',
        ],
      },
      {
        number: '03',
        label: 'Dominance',
        span: 'Days 76–120',
        color: 'text-gold-400',
        borderColor: 'border-gold-700/40',
        bgAccent: 'bg-gold-900/15',
        items: [
          'Full CRM-to-revenue attribution dashboard — marketing ROI visible at deal level',
          'Account-based marketing campaigns for top 20 priority enterprise accounts',
          'Supply chain and operations marketing alignment for new product line launches',
          'Trade show and experiential OOH integration with digital retargeting overlay',
          'SLA-backed pipeline health reporting and quarterly growth strategy handoff',
        ],
      },
    ],
  },
  {
    id: 'global',
    label: 'Global Brands',
    description: 'Multi-market enterprises requiring cross-border growth architecture.',
    phases: [
      {
        number: '01',
        label: 'Foundation',
        span: 'Days 1–30',
        color: 'text-sky-400',
        borderColor: 'border-sky-700/40',
        bgAccent: 'bg-sky-900/15',
        items: [
          'Multi-market SEO and GEO audit — international hreflang, CDN, and crawl efficiency',
          'Global ad account audit across Google, Meta, and Microsoft per region',
          'Vendor and supplier network review — compliance and delivery pipeline mapping',
          'Brand consistency audit — messaging, creative, and visual identity across markets',
          'Market entry readiness scoring for 3 priority expansion territories',
        ],
      },
      {
        number: '02',
        label: 'Acceleration',
        span: 'Days 31–75',
        color: 'text-amber-400',
        borderColor: 'border-amber-700/40',
        bgAccent: 'bg-amber-900/15',
        items: [
          'Regional influencer and experiential OOH campaigns — cinema, transit, and retail activations',
          'NPD rollout sequencing — phased launch of 20+ new SKUs across target markets',
          'Cross-border performance ad campaigns with geo-targeted creative variations',
          'International supply chain synchronization — inventory and warehouse coordination',
          'Localized content and answer engine optimization for regional AI-driven discovery',
        ],
      },
      {
        number: '03',
        label: 'Dominance',
        span: 'Days 76–120',
        color: 'text-gold-400',
        borderColor: 'border-gold-700/40',
        bgAccent: 'bg-gold-900/15',
        items: [
          'Global ROAS consolidation — 5x–7.8x benchmark across all active markets',
          'Unified cross-border attribution model with currency-normalized reporting',
          'Global brand governance framework — creative and messaging playbook for in-market teams',
          'Expansion pipeline report — recommended next 3 markets with entry strategy roadmaps',
          'International growth operations handoff and team enablement documentation',
        ],
      },
    ],
  },
];

const statCards = [
  { icon: TrendingUp, label: 'Projected ROAS', value: '5x – 7.8x', sub: 'Sustained across all industry verticals' },
  { icon: Clock, label: 'Velocity Timeline', value: '120 Days', sub: 'From audit to full-scale market dominance' },
  { icon: Layers, label: 'Channels Integrated', value: '12+', sub: 'Google, Meta, Microsoft, SEO, OOH & more' },
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

export default function Roadmap() {
  const { ref, visible } = useInView();
  const [activeIndustry, setActiveIndustry] = useState(0);
  const [activePhase, setActivePhase] = useState(0);
  const phases = industries[activeIndustry].phases;

  return (
    <section id="roadmap" ref={ref} className="py-28 px-6 relative z-10">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-24 bg-gradient-to-b from-transparent via-gold-600/40 to-transparent" />

      <div className="max-w-[1600px] mx-auto">
        {/* Heading */}
        <div className={`text-center mb-16 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <p className="text-gold-400 text-xs uppercase tracking-[0.3em] mb-3 font-mono-display">120-Day Velocity Calculator</p>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white mb-4">
            Your Industry. Your Growth Engine.
          </h2>
          <p className="text-white/35 text-sm max-w-xl mx-auto">Select your industry to see a fully customized 120-day execution roadmap built around your growth goals.</p>
        </div>

        {/* Industry selector */}
        <div className={`flex flex-col sm:flex-row justify-center gap-3 mb-12 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} style={{ transitionDelay: '150ms' }}>
          {industries.map((ind, i) => (
            <button
              key={ind.id}
              onClick={() => { setActiveIndustry(i); setActivePhase(0); }}
              className={`px-7 py-3.5 rounded-xl text-xs tracking-[0.12em] uppercase transition-all duration-300 font-semibold ${
                activeIndustry === i
                  ? 'gold-btn'
                  : 'glass border-white/8 text-white/40 hover:text-white/60 hover:border-white/15'
              }`}
            >
              {ind.label}
            </button>
          ))}
        </div>

        <div className={`grid grid-cols-1 xl:grid-cols-12 gap-6 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`} style={{ transitionDelay: '300ms' }}>
          {/* Main roadmap panel */}
          <div className="xl:col-span-9">
            {/* Phase tabs */}
            <div className="flex gap-2 mb-5">
              {phases.map((p, i) => (
                <button
                  key={i}
                  onClick={() => setActivePhase(i)}
                  className={`flex-1 py-3 px-4 rounded-xl text-xs tracking-[0.1em] uppercase transition-all duration-300 ${
                    activePhase === i
                      ? 'glass-strong border-gold-600/40 text-gold-300'
                      : 'glass border-white/5 text-white/35 hover:text-white/55'
                  }`}
                >
                  <span className="block font-bold mb-0.5">{p.label}</span>
                  <span className="opacity-60 text-[10px]">{p.span}</span>
                </button>
              ))}
            </div>

            {/* Phase detail */}
            <GlassCard className="overflow-hidden" tiltAmount={1}>
              <div className={`px-8 py-7 border-b border-gold-800/15 ${phases[activePhase].bgAccent}`}>
                <div className="flex items-center gap-5">
                  <div className={`font-mono-display text-6xl font-bold opacity-15 ${phases[activePhase].color} leading-none select-none`}>
                    {phases[activePhase].number}
                  </div>
                  <div>
                    <div className={`text-[10px] tracking-[0.3em] uppercase mb-1 font-mono-display ${phases[activePhase].color}`}>
                      {phases[activePhase].span}
                    </div>
                    <h3 className="text-white text-xl font-semibold">{phases[activePhase].label} — {industries[activeIndustry].label}</h3>
                    <p className="text-white/35 text-xs mt-1">{industries[activeIndustry].description}</p>
                  </div>
                </div>
              </div>

              <div className="p-8 space-y-3">
                {phases[activePhase].items.map((item, j) => (
                  <div key={j} className="flex items-start gap-4 p-4 rounded-lg bg-white/[0.02] border border-gold-800/10 hover:border-gold-700/20 transition-all duration-200 group">
                    <CheckCircle2 size={15} className={`mt-0.5 flex-shrink-0 ${phases[activePhase].color}`} />
                    <p className="text-white/55 text-sm leading-relaxed group-hover:text-white/70 transition-colors duration-200">{item}</p>
                  </div>
                ))}
              </div>

              {/* Progress bar */}
              <div className="px-8 pb-8">
                <div className="flex items-center justify-between text-[10px] text-white/25 mb-2 tracking-wider">
                  <span>Day 1</span>
                  <span className={`font-medium ${phases[activePhase].color}`}>{phases[activePhase].span}</span>
                  <span>Day 120</span>
                </div>
                <div className="w-full h-0.5 bg-white/5 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-gold-600 to-gold-400 rounded-full transition-all duration-700 ease-out"
                    style={{ width: activePhase === 0 ? '25%' : activePhase === 1 ? '62%' : '100%' }}
                  />
                </div>
              </div>
            </GlassCard>
          </div>

          {/* Stat cards column */}
          <div className="xl:col-span-3 flex flex-col gap-4">
            {statCards.map((s, i) => {
              const Icon = s.icon;
              return (
                <GlassCard key={i} className="p-6" tiltAmount={4}>
                  <div className="w-10 h-10 rounded-xl bg-gold-400/10 border border-gold-600/25 flex items-center justify-center mb-4">
                    <Icon size={16} className="text-gold-400" />
                  </div>
                  <div className="text-[10px] tracking-[0.2em] uppercase text-white/30 mb-1 font-mono-display">{s.label}</div>
                  <div className="gold-text font-mono-display text-2xl font-bold mb-1">{s.value}</div>
                  <div className="text-white/30 text-[11px] leading-snug">{s.sub}</div>
                </GlassCard>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
