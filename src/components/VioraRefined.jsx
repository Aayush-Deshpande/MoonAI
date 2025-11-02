import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

const COMPANY = {
  name: "Viora",
  tagline: "Where Voice Meets Intelligence.",
  sub: "Viora helps brands automate human communication using emotionally intelligent, multilingual AI voices.",
  calendly: "https://calendly.com/aayushdeshpande532/30min",
  webhook: "https://hook.eu2.make.com/mjft3dyp6gdm37n6fpl28j6pzv1x3cnz",
};

function useWavesCanvas({ ref, voiceLevel = 0 }) {
  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);
    let frame = 0;

    const particles = Array.from({ length: 30 }).map(() => ({
      x: Math.random() * w,
      y: Math.random() * h,
      r: 0.6 + Math.random() * 2.2,
      vx: -0.2 + Math.random() * 0.4,
      vy: -0.1 + Math.random() * 0.2,
      hue: 180 + Math.random() * 120,
      alpha: 0.04 + Math.random() * 0.08,
    }));

    function resize() {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    }

    function drawWave(offset, amp, color, speed) {
      ctx.beginPath();
      ctx.moveTo(0, h / 2);
      for (let x = 0; x <= w; x += 8) {
        const y = h / 2 + Math.sin(x * 0.006 + frame * speed + offset) * amp * (1 + voiceLevel);
        ctx.lineTo(x, y);
      }
      ctx.strokeStyle = color;
      ctx.lineWidth = 1.4;
      ctx.stroke();
    }

    function render() {
      frame += 0.02;
      ctx.clearRect(0, 0, w, h);
      const g = ctx.createLinearGradient(0, 0, w, h);
      g.addColorStop(0, 'rgba(8,18,34,0.6)');
      g.addColorStop(1, 'rgba(2,24,38,0.6)');
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, w, h);

      particles.forEach(p => {
        p.x += p.vx * (1 + voiceLevel);
        p.y += p.vy * (1 + voiceLevel);
        if (p.x < -10) p.x = w + 10;
        if (p.x > w + 10) p.x = -10;
        if (p.y < -10) p.y = h + 10;
        if (p.y > h + 10) p.y = -10;
        ctx.beginPath();
        ctx.fillStyle = `hsla(${p.hue}, 100%, 60%, ${p.alpha})`;
        ctx.arc(p.x, p.y, p.r * (1 + voiceLevel * 0.6), 0, Math.PI * 2);
        ctx.fill();
      });

      drawWave(0.0, 22, 'rgba(0,255,255,0.06)', 0.9);
      drawWave(1.6, 38, 'rgba(157,0,255,0.06)', 0.6);
      drawWave(3.2, 60 + voiceLevel * 40, 'rgba(0,255,255,0.10)', 0.3);

      requestAnimationFrame(render);
    }

    window.addEventListener('resize', resize);
    render();
    return () => window.removeEventListener('resize', resize);
  }, [ref, voiceLevel]);
}

function useCursorTrail(ref) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    function move(e) {
      el.style.transform = `translate3d(${e.clientX - 150}px, ${e.clientY - 75}px, 0)`;
    }
    window.addEventListener('mousemove', move);
    return () => window.removeEventListener('mousemove', move);
  }, [ref]);
}

export default function VioraRefined() {
  const canvasRef = useRef(null);
  const trailRef = useRef(null);
  const [voiceLevel, setVoiceLevel] = useState(0);

  useWavesCanvas({ ref: canvasRef, voiceLevel });
  useCursorTrail(trailRef);

  useEffect(() => {
    let t = 0;
    const id = setInterval(() => {
      t += 0.02;
      setVoiceLevel((Math.sin(t) + 1) * 0.25);
    }, 60);
    return () => clearInterval(id);
  }, []);

  const handleBookDemo = () => {
    // open Calendly in a new tab
    window.open(COMPANY.calendly, "_blank", "noopener,noreferrer");
  };

  async function submitLead(e) {
    e.preventDefault();
    const form = new FormData(e.target);
    const payload = Object.fromEntries(form.entries());
    payload.timestamp = new Date().toISOString();
    payload.source = 'viora-website';
    try {
      const res = await fetch(COMPANY.webhook, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (res.ok) alert('Thanks — we received your request.');
      else alert('There was an issue sending the form.');
    } catch (err) {
      console.error(err);
      alert('Network error — could not send form.');
    }
  }

  return (
    <div className="relative min-h-screen bg-[#0B0C10] text-white font-sans overflow-x-hidden">
      <canvas ref={canvasRef} className="fixed inset-0 w-full h-full -z-10" />
      <div ref={trailRef} aria-hidden className="pointer-events-none fixed -z-5 w-[300px] h-[150px] rounded-full" style={{ mixBlendMode: 'screen' }}>
        <div style={{ width: '100%', height: '100%', background: 'radial-gradient(circle at 30% 30%, rgba(0,255,255,0.08), rgba(157,0,255,0.02))', filter: 'blur(40px)' }} />
      </div>

      <header className="max-w-6xl mx-auto px-6 py-8 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-cyan-300/60 to-violet-400/60 flex items-center justify-center shadow-xl">
            <div className="text-black font-semibold">V</div>
          </div>
          <div>
            <div className="text-sm font-medium tracking-wide">Viora</div>
            <div className="text-xs text-slate-300">Where Voice Meets Intelligence</div>
          </div>
        </div>
        <nav className="hidden md:flex gap-6 items-center text-sm text-slate-200">
          <a href="#problem" className="hover:underline">Problem</a>
          <a href="#solution" className="hover:underline">Solution</a>
          <a href="#features" className="hover:underline">Features</a>
          <a href="#pricing" className="hover:underline">Pricing</a>
          <button onClick={handleBookDemo} className="ml-4 bg-cyan-400/10 border border-cyan-400/30 px-4 py-2 rounded-lg text-cyan-300">Book a Demo</button>
        </nav>
      </header>

      <main className="max-w-6xl mx-auto px-6 pb-24">
        {/* HERO */}
        <section id="hero" className="min-h-[70vh] flex flex-col md:flex-row items-center gap-12 py-12">
          <div className="flex-1 space-y-6">
            <motion.h1 initial={{opacity:0, y:12}} animate={{opacity:1, y:0}} transition={{duration:0.7}} className="text-4xl md:text-6xl font-semibold leading-tight">{COMPANY.tagline}</motion.h1>
            <motion.p initial={{opacity:0}} animate={{opacity:1}} transition={{delay:0.1}} className="text-slate-300 max-w-2xl text-lg leading-relaxed">{COMPANY.sub}</motion.p>

            <div className="mt-8 flex items-center gap-4">
              <button onClick={() => document.getElementById('demos')?.scrollIntoView({ behavior: 'smooth' })} className="inline-flex items-center gap-3 bg-white text-[#071226] px-5 py-3 rounded-2xl font-medium shadow-sm hover:scale-[1.01] transition-transform">🎙️ Try Voice Demo</button>
              <button onClick={handleBookDemo} className="px-5 py-3 rounded-2xl border border-white/10 text-cyan-300">📅 Book a Free Consultation</button>
            </div>

            <div className="mt-8 flex gap-4 items-center text-sm text-slate-300">
              <div className="flex items-center gap-2 bg-white/3 p-2 rounded-full">
                <div className="w-2 h-2 rounded-full bg-cyan-300 animate-pulse" />
                <div>Live demos • Multilingual • Emotion-aware</div>
              </div>
            </div>
          </div>

          <div className="flex-1 flex items-center justify-center">
            <div className="w-[360px] h-[260px] rounded-3xl bg-gradient-to-b from-[#071226]/40 to-[#001f2d]/30 border border-white/6 backdrop-blur-md flex items-center justify-center">
              <div className="w-40 h-40 rounded-full bg-gradient-to-br from-cyan-400 to-violet-400 shadow-2xl flex items-center justify-center text-black font-semibold text-xl">AI</div>
            </div>
          </div>
        </section>

        {/* PROBLEM */}
        <section id="problem" className="py-16">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <h2 className="text-3xl font-semibold">Businesses waste thousands of hours every year managing repetitive calls and messages.</h2>
            <p className="text-slate-300 leading-relaxed">Customer queries, lead follow-ups, recordings — all of it takes human time and energy. Viora automates these moments with natural, emotionally aware voices that never tire.</p>
            <div className="mt-6 flex justify-center">
              <div className="w-[560px] h-36 rounded-2xl bg-gradient-to-r from-red-700/10 to-cyan-700/8 border border-white/6 flex items-center justify-center text-sm text-slate-200">Illustration: phone call loops → replaced by an AI soundwave (replace with SVG/3D)</div>
            </div>
          </div>
        </section>

        {/* SOLUTION */}
        <section id="solution" className="py-16 bg-white/2 rounded-3xl p-8">
          <div className="max-w-5xl mx-auto text-center space-y-6">
            <h2 className="text-3xl font-semibold">Not just a voice. A personality.</h2>
            <p className="text-slate-200 leading-relaxed">Each AI voice is crafted to mirror your brand’s tone, culture, and emotion — so it sounds like you, not a robot.</p>

            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-6 rounded-2xl bg-white/4 border border-white/6">
                <div className="text-sm text-slate-300">Emotionally Tuned</div>
                <div className="font-semibold mt-2">Voices with empathy & nuance</div>
              </div>
              <div className="p-6 rounded-2xl bg-white/4 border border-white/6">
                <div className="text-sm text-slate-300">Multilingual</div>
                <div className="font-semibold mt-2">Hindi, Marathi, English & more</div>
              </div>
              <div className="p-6 rounded-2xl bg-white/4 border border-white/6">
                <div className="text-sm text-slate-300">Seamless Integration</div>
                <div className="font-semibold mt-2">Twilio · OpenAI · ElevenLabs</div>
              </div>
            </div>

          </div>
        </section>

        {/* FEATURES */}
        <section id="features" className="py-16">
          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-3xl font-semibold">The Future Speaks Fluent Human</h3>
              <p className="text-slate-300 leading-relaxed mt-4">AI Receptionists, Voice Personality Design, Multilingual support, Narration & API-first integrations — built for real businesses.</p>

              <ul className="mt-6 space-y-3 text-slate-200">
                <li>🎙️ <strong>AI Receptionists</strong> — Answer calls 24/7 with intent and warmth.</li>
                <li>🧠 <strong>Voice Personality Design</strong> — Custom voices tuned to your brand.</li>
                <li>🌏 <strong>Multilingual Support</strong> — Expand to local & global markets.</li>
                <li>☁️ <strong>API Integrations</strong> — Twilio, OpenAI, ElevenLabs, Whisper.</li>
                <li>🔒 <strong>Secure</strong> — Data encrypted & auditable.</li>
              </ul>
            </div>

            <div>
              <div className="rounded-3xl bg-white/4 p-8 border border-white/6">
                <div className="text-sm text-slate-300">Interactive</div>
                <h4 className="text-xl font-semibold mt-2">Live Wave Visualizer</h4>
                <p className="text-slate-300 mt-2">A sound-reactive visual that syncs with demos or mic input (placeholder — connect WebAudio analyser to make it respond live).</p>
                <div className="mt-6 h-36 rounded-xl bg-gradient-to-b from-[#001025]/30 to-[#00263d]/20 flex items-center justify-center">Wave visual here</div>
              </div>
            </div>
          </div>
        </section>

        {/* USE CASES */}
        <section id="usecases" className="py-16">
          <div className="max-w-6xl mx-auto text-center space-y-6">
            <h3 className="text-3xl font-semibold">Who We Empower</h3>
            <p className="text-slate-300 leading-relaxed">From clinics to creators and enterprises — Viora gives teams a voice that works.</p>

            <div className="mt-8 grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="p-6 rounded-2xl bg-white/4 border border-white/6">🏢 Clinics & Salons</div>
              <div className="p-6 rounded-2xl bg-white/4 border border-white/6">🎧 Creators & Agencies</div>
              <div className="p-6 rounded-2xl bg-white/4 border border-white/6">🚀 Startups</div>
              <div className="p-6 rounded-2xl bg-white/4 border border-white/6">💼 Enterprises</div>
            </div>
          </div>
        </section>

        {/* TECHNOLOGY */}
        <section id="tech" className="py-16 bg-white/2 rounded-3xl p-8">
          <div className="max-w-5xl mx-auto text-center space-y-6">
            <h3 className="text-3xl font-semibold">Built on the Strongest AI Foundations</h3>
            <p className="text-slate-200 leading-relaxed">ElevenLabs · OpenAI Whisper · GPT-4 · Twilio · AWS</p>

            <div className="mt-8 flex justify-center gap-6">
              <div className="h-16 w-32 bg-white/4 rounded-xl flex items-center justify-center">ElevenLabs</div>
              <div className="h-16 w-32 bg-white/4 rounded-xl flex items-center justify-center">OpenAI</div>
              <div className="h-16 w-32 bg-white/4 rounded-xl flex items-center justify-center">Twilio</div>
            </div>
          </div>
        </section>

        {/* TESTIMONIALS */}
        <section id="testimonials" className="py-16">
          <div className="max-w-6xl mx-auto text-center space-y-6">
            <h3 className="text-3xl font-semibold">Voices our clients trust</h3>
            <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-6 rounded-2xl bg-white/4 border border-white/6">“Our AI receptionist handles 90% of calls” — Dr. Meera</div>
              <div className="p-6 rounded-2xl bg-white/4 border border-white/6">“100+ videos in 10 days” — Arjun Media</div>
              <div className="p-6 rounded-2xl bg-white/4 border border-white/6">“Missed appointments dropped 75%” — Sonia</div>
            </div>
          </div>
        </section>

        {/* PRICING */}
        <section id="pricing" className="py-16">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <h3 className="text-3xl font-semibold">Simple, Transparent, Scalable</h3>
            <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-6 rounded-2xl bg-white/4 border border-white/6">
                <div className="text-sm text-slate-300">Starter</div>
                <div className="text-2xl font-semibold mt-2">₹5,000 / mo</div>
                <div className="text-slate-300 mt-2">1 Voice Bot · 24/7 support</div>
                <a href={COMPANY.calendly} className="mt-4 inline-block px-4 py-2 rounded-lg bg-cyan-400 text-black">Book Your Voice Setup Call</a>
              </div>
              <div className="p-6 rounded-2xl bg-white/4 border border-white/6">
                <div className="text-sm text-slate-300">Growth</div>
                <div className="text-2xl font-semibold mt-2">₹15,000 / mo</div>
                <div className="text-slate-300 mt-2">3 Voice Bots · Analytics</div>
                <a href={COMPANY.calendly} className="mt-4 inline-block px-4 py-2 rounded-lg bg-cyan-400 text-black">Book Your Voice Setup Call</a>
              </div>
              <div className="p-6 rounded-2xl bg-white/4 border border-white/6">
                <div className="text-sm text-slate-300">Enterprise</div>
                <div className="text-2xl font-semibold mt-2">Custom</div>
                <div className="text-slate-300 mt-2">Multi-language · Full Automation</div>
                <a href={COMPANY.calendly} className="mt-4 inline-block px-4 py-2 rounded-lg bg-cyan-400 text-black">Contact Sales</a>
              </div>
            </div>
          </div>
        </section>

        {/* FINAL CTA */}
        <section id="cta" className="py-20">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <h3 className="text-3xl font-semibold">Ready to make your brand sound human again?</h3>
            <p className="text-slate-300">Book a demo or request a personalized voice kit.</p>
            <div className="flex justify-center gap-4 mt-6">
              <button onClick={() => document.getElementById('demos')?.scrollIntoView({ behavior: 'smooth' })} className="px-6 py-3 rounded-2xl bg-white text-black">🎧 Try the Voice Demo</button>
              <button onClick={handleBookDemo} className="px-6 py-3 rounded-2xl border border-white/10">📅 Schedule a Consultation</button>
            </div>
          </div>
        </section>

        {/* CONTACT */}
        <section id="contact" className="py-16">
          <div className="max-w-4xl mx-auto">
            <h3 className="text-3xl font-semibold text-center">Get in touch</h3>
            <form onSubmit={submitLead} className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
              <input name="name" placeholder="Your name" className="p-4 rounded-xl bg-white/5 border border-white/6" required />
              <input name="email" placeholder="Email" type="email" className="p-4 rounded-xl bg-white/5 border border-white/6" required />
              <input name="phone" placeholder="Phone" className="p-4 rounded-xl bg-white/5 border border-white/6" />
              <select name="interest" className="p-4 rounded-xl bg-white/5 border border-white/6">
                <option>Business Voice Automation</option>
                <option>Voice Content Studio</option>
                <option>Voice Personality & Brand Design</option>
              </select>
              <textarea name="message" placeholder="Message" rows={4} className="p-4 rounded-xl bg-white/5 border border-white/6 md:col-span-2" />
              <div className="md:col-span-2 flex gap-4">
                <button type="submit" className="px-6 py-3 rounded-2xl bg-cyan-400 text-black">Send & Request Call</button>
                <button type="button" onClick={handleBookDemo} className="px-6 py-3 rounded-2xl border border-white/10">Book via Calendly</button>
              </div>
            </form>
          </div>
        </section>

        {/* FOOTER */}
        <footer className="py-12 text-center text-slate-400 text-sm">
          <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <div className="font-semibold">Viora</div>
              <div>Where Voice Meets Emotion.</div>
            </div>
            <div className="flex gap-6 items-center">
              <a href="#">Home</a>
              <a href="#">Services</a>
              <a href="#">Contact</a>
            </div>
            <div>© {new Date().getFullYear()} Viora Technologies</div>
          </div>
        </footer>
      </main>

      <style>{` :root{ --accent-cyan: #00ffff; --accent-purple: #9d00ff; } @media (prefers-reduced-motion: reduce) { * { animation: none !important; transition: none !important; } } `}</style>
    </div>
  );
}
