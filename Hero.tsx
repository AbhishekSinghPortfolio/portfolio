import { useEffect, useRef, useState } from 'react';
import { ArrowDown } from 'lucide-react';

const stats = [
  { value: '100+', label: 'Products Engineered & Launched' },
  { value: 'Multi-Crore', label: 'Ad Ecosystems Managed' },
  { value: '16+', label: 'Global Certifications Verified' },
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

export default function Hero() {
  const { ref, visible } = useInView(0.05);

  return (
    <section
      ref={ref}
      id="hero"
      className="relative min-h-screen flex flex-col justify-center items-center text-center px-6 overflow-hidden"
    >
      {/* Ambient gold glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-gold-600/5 blur-[140px] pointer-events-none" />

      {/* Vignette */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 30%, rgba(5,5,5,0.6) 100%)',
        }}
      />

      <div className="relative z-10 max-w-4xl mx-auto">
        {/* Eyebrow */}
        <div
          className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gold-400/10 border border-gold-500/30 mb-8 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
          style={{ transitionDelay: '100ms' }}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-gold-400 animate-pulse" />
          <span className="text-gold-400 text-[10px] tracking-[0.3em] uppercase font-mono-display">
            MBA Marketing &bull; Elite Growth Architect
          </span>
        </div>

        {/* Headline */}
        <h1
          className={`text-3xl sm:text-5xl lg:text-7xl font-black tracking-tight text-white max-w-5xl mx-auto leading-[1.15] mb-8 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
          style={{ transitionDelay: '250ms' }}
        >
          <span className="text-white font-light">I don't just run campaigns.</span>
          <br className="hidden sm:inline" />
          <span className="block sm:mt-2 font-black" style={{
            background: 'linear-gradient(135deg, #FFFFFF 0%, #f3e5ab 35%, #D4AF37 70%, #aa8c2c 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}>
            I build revenue-generating growth engines.
          </span>
        </h1>

        {/* Sub-headline */}
        <p
          className={`text-base md:text-lg text-white/40 leading-relaxed max-w-2xl mx-auto mb-14 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
          style={{ transitionDelay: '400ms' }}
        >
          Digital growth strategist and product lifecycle architect — bridging clean storytelling
          with hard enterprise revenue for global brands.
        </p>

        {/* CTA */}
        <div
          className={`flex flex-col sm:flex-row items-center justify-center gap-4 mb-20 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
          style={{ transitionDelay: '550ms' }}
        >
          <a
            href="#connect"
            className="gold-btn px-8 py-3.5 rounded-lg text-xs tracking-[0.15em] uppercase"
          >
            Lock In Strategy Session
          </a>
          <a
            href="#expertise"
            className="px-8 py-3.5 rounded-lg text-xs tracking-[0.15em] uppercase border border-gold-700/30 text-gold-400/80 hover:border-gold-500/50 hover:text-gold-300 transition-all duration-300"
          >
            Explore Expertise
          </a>
        </div>

        {/* Stats — glass cards */}
        <div
          className={`grid grid-cols-1 sm:grid-cols-3 gap-4 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
          style={{ transitionDelay: '700ms' }}
        >
          {stats.map((s, i) => (
            <div
              key={i}
              className="glass rounded-xl px-6 py-6 text-center hover:border-gold-600/30 transition-all duration-400"
            >
              <div className="gold-text font-mono-display text-3xl sm:text-4xl font-extrabold mb-1">
                {s.value}
              </div>
              <div className="text-gray-400 text-xs uppercase tracking-wider font-medium">
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll cue */}
      <a
        href="#expertise"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-30 hover:opacity-60 transition-opacity duration-300 z-10"
      >
        <span className="text-[10px] tracking-[0.3em] uppercase text-gold-400">Scroll</span>
        <ArrowDown size={14} className="text-gold-400 animate-bounce" />
      </a>
    </section>
  );
}
