import { useEffect, useRef, useState } from 'react';
import { Lock, ArrowRight, CheckCircle2, Video, Shield, Calendar, ChevronRight } from 'lucide-react';
import { GlassCard } from './GlassCard';

const featureCards = [
  {
    icon: Lock,
    title: 'Direct Strategy Access',
    desc: 'Work directly with Abhishek Singh — no junior consultants, no hand-offs. You get the senior-level growth architect on every call.',
  },
  {
    icon: Video,
    title: 'Video or Voice',
    desc: 'Choose your format — live video deep-dive or a focused voice call. Both options include a post-session summary and action plan.',
  },
  {
    icon: Shield,
    title: 'Zero Obligation',
    desc: 'No pitch, no pressure, no retainer conversation. The session delivers actionable insight whether or not we work together.',
  },
];

const timeSlots: Record<string, string[]> = {
  Monday: ['9:00 AM IST', '11:30 AM IST', '2:00 PM IST', '4:30 PM IST'],
  Tuesday: ['10:00 AM IST', '12:00 PM IST', '3:00 PM IST', '5:00 PM IST'],
  Wednesday: ['9:30 AM IST', '11:00 AM IST', '1:30 PM IST', '4:00 PM IST'],
};
const days = Object.keys(timeSlots);

type Step = 'calendar' | 'contact' | 'scope' | 'requirements' | 'done';
const steps: Step[] = ['calendar', 'contact', 'scope', 'requirements', 'done'];
const stepLabels: Record<Step, string> = {
  calendar: 'Pick a Slot',
  contact: 'Contact Details',
  scope: 'Project Scope',
  requirements: 'Requirements',
  done: 'Confirmed',
};

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

export default function Consultation() {
  const { ref, visible } = useInView();
  const [step, setStep] = useState<Step>('calendar');
  const [selectedDay, setSelectedDay] = useState('');
  const [selectedSlot, setSelectedSlot] = useState('');
  const [form, setForm] = useState({
    name: '', email: '', company: '',
    industry: '', budget: '', timeline: '',
    goals: '', channels: '', notes: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const canAdvance = () => {
    if (step === 'calendar') return selectedDay && selectedSlot;
    if (step === 'contact') return form.name && form.email && form.company;
    if (step === 'scope') return form.industry && form.budget;
    if (step === 'requirements') return form.goals;
    return true;
  };

  const advance = () => {
    const idx = steps.indexOf(step);
    if (idx < steps.length - 1) setStep(steps[idx + 1]);
  };

  const stepIndex = steps.indexOf(step);

  return (
    <section id="connect" ref={ref} className="py-28 px-6 relative z-10">
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] rounded-full bg-gold-600/4 blur-[120px] pointer-events-none" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-24 bg-gradient-to-b from-transparent via-gold-600/40 to-transparent" />

      <div className="max-w-[1200px] mx-auto relative z-10">
        {/* Heading */}
        <div className={`text-center mb-16 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <p className="text-gold-400 text-xs uppercase tracking-[0.3em] mb-3 font-mono-display">Direct Strategy Session Booking Hub</p>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">
            Secure Your Growth Consultation
          </h2>
          <p className="text-white/35 text-sm max-w-lg mx-auto">Pick a time, describe your goals, and get a tailored strategy session — no fluff, no obligation.</p>
        </div>

        {/* Feature cards */}
        <div className={`grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} style={{ transitionDelay: '150ms' }}>
          {featureCards.map((fc, i) => {
            const Icon = fc.icon;
            return (
              <GlassCard key={i} className="p-6" tiltAmount={4}>
                <div className="w-10 h-10 rounded-xl bg-gold-400/10 border border-gold-600/25 flex items-center justify-center mb-4">
                  <Icon size={16} className="text-gold-400" />
                </div>
                <h4 className="text-white text-sm font-semibold mb-2">{fc.title}</h4>
                <p className="text-white/40 text-xs leading-relaxed">{fc.desc}</p>
              </GlassCard>
            );
          })}
        </div>

        {/* Stepper */}
        <div className={`mb-8 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} style={{ transitionDelay: '250ms' }}>
          <div className="flex items-center justify-between gap-2">
            {steps.filter(s => s !== 'done').map((s, i) => (
              <div key={s} className="flex items-center gap-2 flex-1">
                <div className="flex flex-col items-center gap-1">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 ${
                    stepIndex > i ? 'bg-gold-400 text-[#050505]' : stepIndex === i ? 'border-2 border-gold-400 text-gold-400' : 'border border-white/15 text-white/25'
                  }`}>
                    {stepIndex > i ? <CheckCircle2 size={14} /> : i + 1}
                  </div>
                  <span className={`text-[9px] tracking-wider uppercase hidden sm:block transition-colors duration-300 ${stepIndex >= i ? 'text-gold-400' : 'text-white/20'}`}>{stepLabels[s]}</span>
                </div>
                {i < 3 && <div className={`flex-1 h-px transition-all duration-500 ${stepIndex > i ? 'bg-gold-400' : 'bg-white/10'}`} />}
              </div>
            ))}
          </div>
        </div>

        {/* Step panel */}
        <div className={`transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`} style={{ transitionDelay: '350ms' }}>
          <GlassCard className="p-8" tiltAmount={1}>

            {/* STEP 1: Calendar */}
            {step === 'calendar' && (
              <div>
                <div className="flex items-center gap-3 mb-8">
                  <Calendar size={18} className="text-gold-400" />
                  <h3 className="text-white text-lg font-semibold">Pick a Day & Time Slot</h3>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-8">
                  {days.map(day => (
                    <div key={day}>
                      <button
                        onClick={() => { setSelectedDay(day); setSelectedSlot(''); }}
                        className={`w-full py-3 px-4 rounded-xl text-sm font-semibold mb-3 transition-all duration-200 ${
                          selectedDay === day ? 'gold-btn' : 'glass border-white/8 text-white/40 hover:text-white/60'
                        }`}
                      >
                        {day}
                      </button>
                      <div className="space-y-2">
                        {timeSlots[day].map(slot => (
                          <button
                            key={slot}
                            onClick={() => { setSelectedDay(day); setSelectedSlot(slot); }}
                            className={`w-full py-2.5 px-4 rounded-lg text-xs text-left transition-all duration-200 ${
                              selectedSlot === slot && selectedDay === day
                                ? 'glass-strong border-gold-600/40 text-gold-300'
                                : 'glass border-white/5 text-white/35 hover:text-white/55 hover:border-white/10'
                            }`}
                          >
                            {slot}
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
                {selectedSlot && (
                  <div className="p-4 rounded-xl bg-gold-900/15 border border-gold-700/25 mb-6 flex items-center gap-3">
                    <CheckCircle2 size={14} className="text-gold-400 flex-shrink-0" />
                    <span className="text-white/70 text-sm">Selected: <strong className="text-gold-300">{selectedDay} at {selectedSlot}</strong></span>
                  </div>
                )}
              </div>
            )}

            {/* STEP 2: Contact */}
            {step === 'contact' && (
              <div>
                <h3 className="text-white text-lg font-semibold mb-8">Your Contact Details</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-6">
                  {[
                    { name: 'name', label: 'Full Name', placeholder: 'Your full name', type: 'text' },
                    { name: 'email', label: 'Work Email', placeholder: 'you@company.com', type: 'email' },
                  ].map(f => (
                    <div key={f.name}>
                      <label className="block text-white/35 text-[10px] tracking-[0.15em] uppercase mb-2">{f.label}</label>
                      <input type={f.type} name={f.name} value={(form as Record<string, string>)[f.name]} onChange={handleChange}
                        placeholder={f.placeholder} required className="input-field w-full rounded-lg px-4 py-3 text-sm" />
                    </div>
                  ))}
                </div>
                <div>
                  <label className="block text-white/35 text-[10px] tracking-[0.15em] uppercase mb-2">Company Name</label>
                  <input type="text" name="company" value={form.company} onChange={handleChange}
                    placeholder="Your company or brand" required className="input-field w-full rounded-lg px-4 py-3 text-sm" />
                </div>
              </div>
            )}

            {/* STEP 3: Scope */}
            {step === 'scope' && (
              <div>
                <h3 className="text-white text-lg font-semibold mb-8">Project Scope</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-white/35 text-[10px] tracking-[0.15em] uppercase mb-2">Industry / Sector</label>
                    <select name="industry" value={form.industry} onChange={handleChange}
                      className="input-field w-full rounded-lg px-4 py-3 text-sm">
                      <option value="">Select your sector</option>
                      {['SaaS', 'D2C E-Commerce', 'B2B Manufacturing', 'Global Brand', 'Healthcare', 'Fintech', 'Other'].map(o => <option key={o} value={o}>{o}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-white/35 text-[10px] tracking-[0.15em] uppercase mb-2">Monthly Ad Budget</label>
                    <select name="budget" value={form.budget} onChange={handleChange}
                      className="input-field w-full rounded-lg px-4 py-3 text-sm">
                      <option value="">Select range</option>
                      {['< ₹5L/mo', '₹5L–₹20L/mo', '₹20L–₹50L/mo', '₹50L–₹1Cr/mo', '> ₹1Cr/mo'].map(o => <option key={o} value={o}>{o}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-white/35 text-[10px] tracking-[0.15em] uppercase mb-2">Engagement Timeline</label>
                    <select name="timeline" value={form.timeline} onChange={handleChange}
                      className="input-field w-full rounded-lg px-4 py-3 text-sm">
                      <option value="">Select timeline</option>
                      {['Immediate (< 2 weeks)', '1–3 months', '3–6 months', '6–12 months', 'Ongoing retainer'].map(o => <option key={o} value={o}>{o}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-white/35 text-[10px] tracking-[0.15em] uppercase mb-2">Primary Channels</label>
                    <input type="text" name="channels" value={form.channels} onChange={handleChange}
                      placeholder="e.g. Google, Meta, SEO, OOH" className="input-field w-full rounded-lg px-4 py-3 text-sm" />
                  </div>
                </div>
              </div>
            )}

            {/* STEP 4: Requirements */}
            {step === 'requirements' && (
              <div>
                <h3 className="text-white text-lg font-semibold mb-8">Growth Requirements</h3>
                <div className="space-y-5">
                  <div>
                    <label className="block text-white/35 text-[10px] tracking-[0.15em] uppercase mb-2">Primary Growth Objective *</label>
                    <textarea name="goals" value={form.goals} onChange={handleChange} rows={4}
                      placeholder="Describe your revenue goals, scaling targets, and the biggest growth challenge you're trying to solve..."
                      required className="input-field w-full rounded-lg px-4 py-3 text-sm resize-none" />
                  </div>
                  <div>
                    <label className="block text-white/35 text-[10px] tracking-[0.15em] uppercase mb-2">Additional Notes</label>
                    <textarea name="notes" value={form.notes} onChange={handleChange} rows={3}
                      placeholder="Any specific constraints, past agency experience, tools in use, or context that would help..."
                      className="input-field w-full rounded-lg px-4 py-3 text-sm resize-none" />
                  </div>
                </div>
              </div>
            )}

            {/* STEP 5: Done */}
            {step === 'done' && (
              <div className="flex flex-col items-center justify-center py-16 text-center">
                <div className="w-20 h-20 rounded-full bg-gold-900/30 border border-gold-600/40 flex items-center justify-center mb-6"
                  style={{ animation: 'pulseGlow 2s ease-in-out infinite' }}>
                  <CheckCircle2 size={32} className="text-gold-400" />
                </div>
                <h3 className="text-white text-2xl font-bold mb-2">Session Locked In</h3>
                <p className="text-white/40 text-sm max-w-sm leading-relaxed mb-6">
                  Your strategy session is confirmed for <strong className="text-gold-300">{selectedDay} at {selectedSlot}</strong>. Expect a direct confirmation within 24 hours.
                </p>
                <div className="flex flex-wrap gap-3 justify-center text-xs text-white/30">
                  {[
                    `Slot: ${selectedDay}, ${selectedSlot}`,
                    `Contact: ${form.name}`,
                    `Company: ${form.company}`,
                  ].map((detail, i) => (
                    <span key={i} className="px-3 py-1.5 glass rounded-full">{detail}</span>
                  ))}
                </div>
              </div>
            )}

            {/* Navigation */}
            {step !== 'done' && (
              <div className="flex items-center justify-between mt-8 pt-6 border-t border-gold-800/15">
                <button
                  onClick={() => { const idx = steps.indexOf(step); if (idx > 0) setStep(steps[idx - 1]); }}
                  disabled={step === 'calendar'}
                  className="text-white/30 text-xs tracking-[0.15em] uppercase hover:text-white/55 transition-colors disabled:opacity-0"
                >
                  Back
                </button>
                <button
                  onClick={advance}
                  disabled={!canAdvance()}
                  className="gold-btn px-7 py-3 rounded-lg flex items-center gap-2 text-xs tracking-[0.12em] uppercase disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  {step === 'requirements' ? (
                    <><Lock size={12} /> Confirm Booking <ArrowRight size={12} /></>
                  ) : (
                    <>Continue <ChevronRight size={14} /></>
                  )}
                </button>
              </div>
            )}
          </GlassCard>

          <p className="text-center text-white/20 text-[10px] tracking-wide mt-4">
            Your information is kept strictly confidential. No pitch. No pressure.
          </p>
        </div>
      </div>
    </section>
  );
}
