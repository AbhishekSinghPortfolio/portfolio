import { useEffect, useRef, useState } from 'react';
import { GlassCard } from './GlassCard';

const pillars = [
  {
    title: 'Performance Ads (Google/Microsoft)',
    icon: '01',
    summary:
      'Master-class execution across Google Ads — Search, Display, Shopping, Performance Max, Video, and App — alongside Microsoft Advertising, all maintained with strict ROAS efficiency.',
    bullets: [
      'Google Ads Search, Display, Shopping, Performance Max, Video & App campaigns',
      'Microsoft Advertising — Search, Display, Retail Media, Native & Audience',
      'ROAS-optimized bid strategies with automated rule-based scaling',
      'Cross-platform budget allocation and real-time performance monitoring',
      'Conversion tracking, attribution modeling, and post-purchase lifecycle optimization',
      'AI-powered Smart Campaigns and Discovery ad formats',
    ],
  },
  {
    title: 'WordPress, GEO & Organic SEO',
    icon: '02',
    summary:
      'Advanced WordPress architecture paired with Answer Engine Optimization and Generative Engine Optimization to turn organic traffic into compounding revenue.',
    bullets: [
      'Advanced WordPress architecture with Core Web Vitals optimization',
      'Answer Engine Optimization (AEO) for voice and AI-powered search',
      'Generative Engine Optimization (GEO) for LLM-driven discovery',
      'Technical SEO — schema markup, crawl optimization, site speed',
      'Keyword research and competitor intelligence via Semrush',
      'Content-to-revenue funnel mapping with organic attribution',
    ],
  },
  {
    title: 'Meta Ads & Social Growth',
    icon: '03',
    summary:
      'High-conversion Facebook and Instagram campaigns combined with full-scale social media management that turn social channels into predictable acquisition funnels.',
    bullets: [
      'Facebook & Instagram ad campaigns with audience segmentation',
      'Creative testing framework — A/B multivariate ad creative rotation',
      'Full-scale social media management and community building',
      'Pixel tracking, CAPI integration, and conversion optimization',
      'Lookalike audience construction from high-LTV seed segments',
      'Retargeting and remarketing funnels across Meta ecosystem',
    ],
  },
  {
    title: 'Influencer & Experiential OOH',
    icon: '04',
    summary:
      'Multi-tier influencer collaborations — barter and paid — integrated with offline brand placements across cinema screens, transit networks, and retail spaces.',
    bullets: [
      'Multi-tier influencer collaborations — barter and paid models',
      'Influencer vetting, negotiation, and contract management',
      'Cinema screen advertising and regional film placements',
      'Transit network campaigns — metro, bus, and airport branding',
      'Retail space activations and in-store experiential displays',
      'Offline-to-online attribution tracking for OOH campaigns',
    ],
  },
  {
    title: 'Product Lifecycle & NPD',
    icon: '05',
    summary:
      'Complete management of 100+ products from concept to shelf — covering market research, vendor discovery, price negotiation, compliance, and launch sequencing.',
    bullets: [
      'End-to-end NPD management for 100+ products from concept to shelf',
      'Market research, consumer demand analysis, and pricing strategy',
      'Vendor discovery, price negotiation, and supplier onboarding',
      'Compliance certification and regulatory sign-off coordination',
      'Launch sequencing — phasing releases across channels and regions',
      'Post-launch performance tracking and product iteration cycles',
    ],
  },
  {
    title: 'Supply Chain & B2B Pipelines',
    icon: '06',
    summary:
      'Robust operational execution with inventory intelligence, warehouse synchronization, and Salesforce B2B sales pipeline management at enterprise scale.',
    bullets: [
      'Inventory intelligence and demand forecasting systems',
      'Warehouse synchronization and multi-location stock management',
      'Salesforce B2B sales pipeline management at enterprise scale',
      'Automated lead qualification, scoring, and routing flows',
      'CRM integration with marketing automation for closed-loop tracking',
      'Supply chain refinement — cost reduction and delivery optimization',
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

export default function Competencies() {
  const { ref, visible } = useInView(0.05);
  const [activePillar, setActivePillar] = useState(0);

  return (
    <section id="expertise" ref={ref} className="py-28 px-6 relative z-10">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-24 bg-gradient-to-b from-transparent via-gold-600/40 to-transparent" />

      <div className="max-w-[1600px] mx-auto">
        {/* Heading */}
        <div
          className={`text-center mb-16 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
          <p className="text-gold-400 text-xs uppercase tracking-[0.3em] mb-3 font-mono-display">Core Competencies Matrix</p>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white">
            Full-Stack Enterprise Growth Architecture
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
          {/* Pillar tabs */}
          <div className="lg:col-span-5 flex flex-col gap-3">
            {pillars.map((p, i) => (
              <div
                key={i}
                className={`transition-all duration-700 ${visible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-6'}`}
                style={{ transitionDelay: `${i * 60 + 200}ms` }}
              >
                <button
                  onClick={() => setActivePillar(i)}
                  className={`w-full text-left p-5 rounded-xl border transition-all duration-300 ${
                    activePillar === i
                      ? 'glass-strong border-gold-600/40'
                      : 'glass border-gold-800/15 hover:border-gold-700/25'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-11 h-11 rounded-xl flex items-center justify-center font-mono-display font-bold text-sm transition-all duration-300 ${
                      activePillar === i
                        ? 'bg-gold-400/15 border border-gold-600/30 text-gold-300'
                        : 'bg-white/5 border border-white/10 text-white/40'
                    }`}>
                      {p.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className={`text-sm font-semibold leading-snug transition-colors duration-300 ${
                        activePillar === i ? 'text-white' : 'text-white/55'
                      }`}>
                        {p.title}
                      </div>
                    </div>
                  </div>
                </button>
              </div>
            ))}
          </div>

          {/* Detail panel */}
          <div
            className={`lg:col-span-7 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
            style={{ transitionDelay: '400ms' }}
          >
            <GlassCard className="p-8 h-full" tiltAmount={3}>
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 rounded-xl bg-gold-400/10 border border-gold-500/30 flex items-center justify-center font-mono-display font-bold text-lg text-gold-400">
                  {pillars[activePillar].icon}
                </div>
                <h3 className="text-xl font-bold text-white leading-tight">
                  {pillars[activePillar].title}
                </h3>
              </div>

              <p className="text-gray-400 text-sm leading-relaxed mb-6">
                {pillars[activePillar].summary}
              </p>

              <div className="border-t border-gold-800/15 pt-6">
                <p className="text-gold-400 text-[10px] tracking-[0.2em] uppercase mb-4 font-mono-display">Key Capabilities</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {pillars[activePillar].bullets.map((b, j) => (
                    <div
                      key={j}
                      className="flex items-start gap-3 p-3.5 rounded-lg bg-white/[0.02] border border-gold-800/10 hover:border-gold-700/20 transition-colors duration-200"
                    >
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-gold-400 flex-shrink-0" />
                      <span className="text-white/60 text-sm leading-snug">{b}</span>
                    </div>
                  ))}
                </div>
              </div>
            </GlassCard>
          </div>
        </div>
      </div>
    </section>
  );
}
