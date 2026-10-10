import { useState, useEffect } from 'react';

const links = [
  { label: 'Expertise', href: '#expertise' },
  { label: 'Credentials', href: '#credentials' },
  { label: 'Roadmap', href: '#roadmap' },
  { label: 'Results', href: '#results' },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handler);
    return () => window.removeEventListener('scroll', handler);
  }, []);

  return (
    <nav
      className={`relative z-50 transition-all duration-500 ${
        scrolled
          ? 'glass-strong py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between gap-4 overflow-hidden">
        {/* Brand */}
        <a href="#hero" className="flex items-center gap-3 shrink-0 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-gold-400 to-gold-600 flex items-center justify-center font-bold text-[#050505] font-mono-display text-sm shadow-lg group-hover:shadow-gold-400/30 transition-shadow duration-300">
            AS
          </div>
          <div className="hidden sm:flex flex-col">
            <span className="text-white text-sm font-bold tracking-wider leading-tight">
              ABHISHEK SINGH
            </span>
            <span className="text-gold-400 text-[9px] uppercase tracking-[0.2em] font-mono-display leading-tight">
              Growth Architect
            </span>
          </div>
        </a>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-6 lg:gap-8">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="nav-link">
              {l.label}
            </a>
          ))}
          <a
            href="#connect"
            className="gold-btn text-[10px] px-5 py-2 rounded-lg tracking-[0.15em] uppercase whitespace-nowrap"
          >
            Book Strategy Call
          </a>
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-1"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span className={`block w-6 h-px bg-gold-400 transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-2.5' : ''}`} />
          <span className={`block w-6 h-px bg-gold-400 transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
          <span className={`block w-6 h-px bg-gold-400 transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-2.5' : ''}`} />
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden glass-strong px-6 py-4 flex flex-col gap-4 border-t border-gold-800/15">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="nav-link text-sm py-1"
              onClick={() => setMenuOpen(false)}
            >
              {l.label}
            </a>
          ))}
          <a
            href="#connect"
            className="gold-btn text-[10px] px-5 py-2 rounded-lg tracking-[0.15em] uppercase text-center mt-2"
            onClick={() => setMenuOpen(false)}
          >
            Book Strategy Call
          </a>
        </div>
      )}
    </nav>
  );
}
