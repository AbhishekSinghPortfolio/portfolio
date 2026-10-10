export default function Footer() {
  return (
    <footer className="py-10 px-6 border-t border-gold-800/10 relative z-10">
      <div className="max-w-[1600px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-gold-400 to-gold-600 flex items-center justify-center font-bold text-[#050505] text-xs font-mono-display">
            AS
          </div>
          <span className="text-white/70 text-xs font-bold tracking-wider">
            ABHISHEK SINGH &middot; GLOBAL CONSULTANCY
          </span>
        </div>
        <p className="text-white/15 text-xs font-mono-display">
          &copy; {new Date().getFullYear()} Abhishek Singh. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
}
