import { useEffect, useRef, useState } from 'react';
import { CheckCircle2 } from 'lucide-react';
import { GlassCard } from './GlassCard';

const sectors = [
  {
    id: 'saas',
    label: 'SaaS',
    description: 'Software-as-a-Service companies scaling ARR through performance and product-led growth.',
    accentColor: 'text-violet-400',
    borderColor: 'border-violet-700/30',
    bgAccent: 'bg-violet-900/15',
    kpis: [
      { label: 'Target MRR Growth', value: '25%+/mo' },
      { label: 'CAC Payback', value: '<6 months' },
      { label: 'LTV:CAC Ratio', value: '3:1+' },
    ],
    checklist: [
      { phase: 'Acquisition', items: ['Google Search for high-intent SaaS keywords (comparison, alternative, pricing)', 'LinkedIn Ads targeting job-title and company-size audiences', 'G2, Capterra, and review site optimization for bottom-funnel capture', 'Product Hunt and community-led launch campaigns'] },
      { phase: 'Activation', items: ['Onboarding email sequences with behavioural trigger logic', 'In-app messaging and contextual upgrade prompts', 'Product analytics integration (Mixpanel / Amplitude) for funnel diagnostics', 'A/B testing on pricing page, trial CTA, and demo request flow'] },
      { phase: 'Retention', items: ['Churn prediction modelling from product usage signals', 'Success manager touchpoint automation at risk-segment thresholds', 'Feature adoption campaigns targeting underutilized high-value modules', 'Annual contract upsell sequences triggered at renewal windows'] },
      { phase: 'Expansion', items: ['Account-based marketing for enterprise tier upgrade', 'Partner and integration marketplace visibility campaigns', 'Referral and affiliate programme for PLG compounding', 'Case study and co-marketing with strategic partner logos'] },
    ],
  },
  {
    id: 'dtc',
    label: 'D2C',
    description: 'Direct-to-consumer brands scaling revenue through unified paid and organic funnels.',
    accentColor: 'text-emerald-400',
    borderColor: 'border-emerald-700/30',
    bgAccent: 'bg-emerald-900/15',
    kpis: [
      { label: 'Target ROAS', value: '5x–7.8x' },
      { label: 'Blended CAC', value: '< AOV/3' },
      { label: 'Repeat Rate', value: '35%+' },
    ],
    checklist: [
      { phase: 'Acquisition', items: ['Google Shopping and Performance Max with optimized product feed', 'Meta Ads with creative testing framework — 12+ variants per product line', 'Influencer barter and paid seeding for top 5 SKUs', 'SEO content clusters targeting high-intent purchase and comparison queries'] },
      { phase: 'Conversion', items: ['Landing page CRO — urgency triggers, social proof, and trust signals', 'Checkout abandonment recovery — email, SMS, and retargeting sequence', 'Bundle and upsell architecture on product and cart pages', 'Review generation system driving UGC and social proof accumulation'] },
      { phase: 'Retention', items: ['Post-purchase email sequence with cross-sell and replenishment triggers', 'Loyalty programme with tiered rewards and referral mechanics', 'VIP segment with early access to new product launches', 'Win-back campaign for 60, 90, and 120-day lapsed customers'] },
      { phase: 'Scale', items: ['New product development launch sequencing — 10+ SKU expansion pipeline', 'International market entry starting with highest-affinity regions', 'Retail and marketplace channel activation alongside DTC', 'Wholesale and B2B distribution pipeline for volume revenue diversification'] },
    ],
  },
  {
    id: 'b2b',
    label: 'B2B',
    description: 'Business-to-business companies building enterprise pipeline and long-cycle revenue.',
    accentColor: 'text-sky-400',
    borderColor: 'border-sky-700/30',
    bgAccent: 'bg-sky-900/15',
    kpis: [
      { label: 'Pipeline Velocity', value: '+340%' },
      { label: 'SQL Conversion', value: '35%+' },
      { label: 'Deal Cycle', value: '–30 days' },
    ],
    checklist: [
      { phase: 'Demand Generation', items: ['Google Search for commercial and navigational enterprise queries', 'LinkedIn Ads targeting decision-maker titles and company firmographics', 'GEO and AEO content strategy for AI-driven B2B discovery', 'Webinar and thought leadership programme for authority compounding'] },
      { phase: 'Pipeline', items: ['Salesforce pipeline architecture — stages, scoring, and SLA mapping', 'Automated lead qualification and routing with enrichment (Clearbit / Apollo)', 'Multi-touch nurture sequences split by persona and deal stage', 'SDR outbound sequences aligned with inbound intent signals'] },
      { phase: 'Closing', items: ['Sales enablement — battle cards, objection guides, and case studies', 'Proposal and pricing page optimization for self-serve enterprise evaluation', 'Legal and procurement acceleration with templated MSA and SOW frameworks', 'Champion and multi-stakeholder engagement strategy for committee deals'] },
      { phase: 'Expansion', items: ['Account health dashboard and QBR automation framework', 'Cross-sell and upsell triggers tied to product usage and contract milestones', 'Executive relationship programme for strategic account retention', 'Reference customer programme driving G2 reviews and co-marketing'] },
    ],
  },
  {
    id: 'manufacturing',
    label: 'Manufacturing',
    description: 'Industrial manufacturers building digital demand and modern supply chain operations.',
    accentColor: 'text-amber-400',
    borderColor: 'border-amber-700/30',
    bgAccent: 'bg-amber-900/15',
    kpis: [
      { label: 'Supply Efficiency', value: '95%' },
      { label: 'Fulfillment Rate', value: '78%→95%' },
      { label: 'New Markets', value: '3+ per yr' },
    ],
    checklist: [
      { phase: 'Digital Presence', items: ['Technical SEO and schema markup for industrial product catalogues', 'Google and Microsoft Search for distributor, wholesale, and OEM queries', 'Trade directory and marketplace visibility (IndiaMART, Alibaba, ThomasNet)', 'Video production — factory tour, process demonstration, and capability showcase'] },
      { phase: 'Supply Chain', items: ['Inventory intelligence and demand forecasting system implementation', 'Multi-location warehouse synchronization and stock level automation', 'Vendor and supplier onboarding for NPD pipeline acceleration', 'Compliance and certification coordination for new product categories'] },
      { phase: 'Sales Activation', items: ['B2B sales pipeline setup in Salesforce or equivalent CRM', 'Trade show and experiential OOH integration with digital overlay', 'Distributor and channel partner portal and communication framework', 'RFQ automation and pricing engine for faster quote-to-order cycles'] },
      { phase: 'Market Expansion', items: ['International market entry roadmap — top 3 target territories with entry strategy', 'Export compliance and logistics partnership framework', 'Regional influencer and OOH campaigns for brand awareness in new markets', 'New product launch sequencing — 20+ SKU expansion pipeline management'] },
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

export default function GrowthBlueprints() {
  const { ref, visible } = useInView();
  const [activeSector, setActiveSector] = useState(0);
  const [activePhase, setActivePhase] = useState(0);
  const sector = sectors[activeSector];

  return (
    <section id="blueprints" ref={ref} className="py-28 px-6 relative z-10">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-24 bg-gradient-to-b from-transparent via-gold-600/40 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-obsidian-900/20 to-transparent pointer-events-none" />

      <div className="max-w-[1600px] mx-auto relative z-10">
        {/* Heading */}
        <div className={`text-center mb-16 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <p className="text-gold-400 text-xs uppercase tracking-[0.3em] mb-3 font-mono-display">Tailored Growth Blueprints</p>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white mb-4">
            Built for Your Sector, Not a Template.
          </h2>
          <p className="text-white/35 text-sm max-w-xl mx-auto">Select your industry to unlock the exact execution framework I deploy for clients in your space.</p>
        </div>

        {/* Sector selector */}
        <div className={`flex flex-wrap justify-center gap-3 mb-12 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} style={{ transitionDelay: '150ms' }}>
          {sectors.map((s, i) => (
            <button
              key={s.id}
              onClick={() => { setActiveSector(i); setActivePhase(0); }}
              className={`px-8 py-3 rounded-xl text-xs tracking-[0.15em] uppercase font-semibold transition-all duration-300 ${
                activeSector === i
                  ? 'gold-btn'
                  : 'glass border-white/8 text-white/40 hover:text-white/60 hover:border-white/15'
              }`}
            >
              {s.label}
            </button>
          ))}
        </div>

        <div className={`grid grid-cols-1 xl:grid-cols-12 gap-6 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`} style={{ transitionDelay: '300ms' }}>
          {/* Left: KPI cards + phase nav */}
          <div className="xl:col-span-3 flex flex-col gap-4">
            <GlassCard className="p-6" tiltAmount={3}>
              <p className={`text-[10px] tracking-[0.2em] uppercase mb-4 font-mono-display ${sector.accentColor}`}>Target KPIs</p>
              <div className="space-y-4">
                {sector.kpis.map((kpi, i) => (
                  <div key={i} className={`p-3.5 rounded-lg border ${sector.borderColor} ${sector.bgAccent}`}>
                    <div className={`font-mono-display text-xl font-bold mb-0.5 ${sector.accentColor}`}>{kpi.value}</div>
                    <div className="text-white/35 text-[10px] uppercase tracking-wider">{kpi.label}</div>
                  </div>
                ))}
              </div>
            </GlassCard>

            <GlassCard className="p-5" tiltAmount={3}>
              <p className="text-[10px] tracking-[0.2em] uppercase text-white/30 mb-3 font-mono-display">Execution Phases</p>
              <div className="space-y-2">
                {sector.checklist.map((ph, i) => (
                  <button
                    key={i}
                    onClick={() => setActivePhase(i)}
                    className={`w-full text-left px-4 py-3 rounded-lg text-xs tracking-[0.08em] uppercase font-medium transition-all duration-200 ${
                      activePhase === i
                        ? `${sector.bgAccent} border ${sector.borderColor} ${sector.accentColor}`
                        : 'text-white/35 hover:text-white/55 hover:bg-white/[0.03]'
                    }`}
                  >
                    <span className="mr-2 font-mono-display text-[9px] opacity-50">{String(i + 1).padStart(2, '0')}</span>
                    {ph.phase}
                  </button>
                ))}
              </div>
            </GlassCard>
          </div>

          {/* Right: checklist panel */}
          <div className="xl:col-span-9">
            <GlassCard className="p-8 h-full" tiltAmount={2}>
              <div className="flex items-start justify-between mb-8">
                <div>
                  <p className={`text-[10px] tracking-[0.2em] uppercase mb-1 font-mono-display ${sector.accentColor}`}>{sector.label} Blueprint</p>
                  <h3 className="text-white text-2xl font-bold">{sector.checklist[activePhase].phase}</h3>
                  <p className="text-white/35 text-sm mt-1">{sector.description}</p>
                </div>
                <div className={`px-3 py-1.5 rounded-full text-[9px] tracking-[0.2em] uppercase border ${sector.borderColor} ${sector.accentColor} ${sector.bgAccent}`}>
                  {sector.checklist[activePhase].items.length} Actions
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {sector.checklist[activePhase].items.map((item, j) => (
                  <div
                    key={j}
                    className="flex items-start gap-3 p-4 rounded-xl bg-white/[0.02] border border-gold-800/10 hover:border-gold-700/20 transition-all duration-200 group"
                  >
                    <CheckCircle2 size={14} className={`mt-0.5 flex-shrink-0 ${sector.accentColor}`} />
                    <span className="text-white/60 text-sm leading-snug group-hover:text-white/75 transition-colors duration-200">{item}</span>
                  </div>
                ))}
              </div>

              <div className="mt-8 pt-6 border-t border-gold-800/15 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <p className="text-white/25 text-xs">This blueprint reflects the exact playbook deployed for enterprise clients in this sector.</p>
                <a href="#connect" className="gold-btn px-6 py-2.5 rounded-lg text-[10px] tracking-[0.15em] uppercase whitespace-nowrap">
                  Get Your Blueprint
                </a>
              </div>
            </GlassCard>
          </div>
        </div>
      </div>
    </section>
  );
}
