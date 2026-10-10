import { useState, useEffect } from 'react';

const sections = [
  { id: 'hero', label: 'Intro' },
  { id: 'expertise', label: 'Expertise' },
  { id: 'npd-metrics', label: 'Metrics' },
  { id: 'credentials', label: 'Credentials' },
  { id: 'roadmap', label: 'Roadmap' },
  { id: 'results', label: 'Results' },
  { id: 'blueprints', label: 'Blueprints' },
  { id: 'connect', label: 'Connect' },
];

export default function SideNav() {
  const [active, setActive] = useState('hero');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: '-30% 0px -60% 0px' }
    );
    sections.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <div className="fixed right-6 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col gap-4">
      {sections.map((s) => (
        <a key={s.id} href={`#${s.id}`} className="group flex items-center gap-3 justify-end">
          <span className={`text-[10px] tracking-[0.2em] uppercase transition-all duration-300 ${
            active === s.id ? 'text-gold-400 opacity-100' : 'text-white/30 opacity-0 group-hover:opacity-100'
          }`}>
            {s.label}
          </span>
          <span className={`nav-dot block rounded-full transition-all duration-300 ${
            active === s.id ? 'w-2.5 h-2.5 bg-gold-400 active' : 'w-1.5 h-1.5 bg-white/20 group-hover:bg-gold-500/50'
          }`} />
        </a>
      ))}
    </div>
  );
}
