import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, X, ArrowLeft, ArrowRight, Zap } from 'lucide-react';
import type { StoryData } from '@/data/mockScenarios';

const FONTS = `@import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;700&family=Bebas+Neue&display=swap');`;

function NeonParticles() {
  const particles = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 4 + 2,
    color: ['#ff0099', '#00f5ff', '#ffe600', '#7c3aed'][Math.floor(Math.random() * 4)],
    duration: Math.random() * 4 + 3,
    delay: Math.random() * 3,
  }));
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {particles.map(p => (
        <motion.div key={p.id}
          className="absolute rounded-full"
          style={{ left: `${p.x}%`, top: `${p.y}%`, width: p.size, height: p.size, background: p.color, boxShadow: `0 0 ${p.size * 3}px ${p.color}` }}
          animate={{ opacity: [0, 1, 0], scale: [0, 1, 0], y: [0, -30] }}
          transition={{ duration: p.duration, delay: p.delay, repeat: Infinity, ease: 'easeOut' }}
        />
      ))}
    </div>
  );
}

function Countdown({ targetDate }: { targetDate: string }) {
  const [days, setDays] = useState(0);
  useEffect(() => {
    const diff = Math.abs(Date.now() - new Date(targetDate).getTime());
    setDays(Math.floor(diff / 86400000));
  }, [targetDate]);
  return (
    <div className="flex gap-4 justify-center my-8">
      {[{ v: days, l: 'NGÀY' }, { v: new Date().getFullYear() - new Date(targetDate).getFullYear(), l: 'TUỔI' }].map(({ v, l }) => (
        <div key={l} className="text-center">
          <div className="text-5xl font-bold" style={{ fontFamily: '"Bebas Neue", cursive', color: '#ff0099', textShadow: '0 0 20px #ff0099, 0 0 40px #ff009966' }}>{v}</div>
          <div className="text-xs tracking-widest" style={{ color: '#ffffff80' }}>{l}</div>
        </div>
      ))}
    </div>
  );
}

export default function TemplateBirthdayNeonParty({ storyData }: { storyData: StoryData }) {
  const [galleryOpen, setGalleryOpen] = useState<number | null>(null);
  const [playing, setPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const a = storyData.hero_block.partner_a.name;
  const b = storyData.hero_block.partner_b.name;
  const birthday = storyData.hero_block.partner_b.name;
  const banner = storyData.hero_block.banner_images[0] || 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&w=1400&q=85';
  const images = storyData.gallery_block?.images ?? [];
  const events = storyData.timeline_block?.events ?? [];
  const letter = storyData.letter_block;
  const music = storyData.global_config?.background_music_url;

  const toggleAudio = async () => {
    if (!audioRef.current) return;
    if (playing) { audioRef.current.pause(); setPlaying(false); }
    else { try { await audioRef.current.play(); setPlaying(true); } catch { } }
  };

  return (
    <div style={{ background: '#0d0d12', color: '#ffffff', fontFamily: '"Space Grotesk", sans-serif', minHeight: '100vh' }}>
      <style>{FONTS}{`
        .font-bebas { font-family: 'Bebas Neue', cursive; }
        .neon-pink { color: #ff0099; text-shadow: 0 0 20px #ff009980; }
        .neon-cyan { color: #00f5ff; text-shadow: 0 0 20px #00f5ff80; }
        .neon-yellow { color: #ffe600; text-shadow: 0 0 20px #ffe60080; }
        .glass { background: rgba(255,255,255,0.05); backdrop-filter: blur(8px); border: 1px solid rgba(255,255,255,0.1); }
        .no-scrollbar::-webkit-scrollbar { display: none; }
      `}</style>
      {music && <audio ref={audioRef} src={music} loop />}

      {music && (
        <button onClick={toggleAudio} className="fixed top-5 right-5 z-50 flex size-11 items-center justify-center rounded-full" style={{ background: '#ff0099', boxShadow: '0 0 20px #ff009966' }}>
          {playing ? <Pause className="size-4 fill-current" /> : <Play className="ml-0.5 size-4 fill-current" />}
        </button>
      )}

      {/* Hero */}
      <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden px-6 text-center">
        <NeonParticles />
        <div className="absolute inset-0 overflow-hidden">
          <img src={banner} alt="" className="h-full w-full object-cover opacity-20" style={{ filter: 'blur(2px)' }} />
          <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at center, rgba(255,0,153,0.15) 0%, #0d0d12 70%)' }} />
        </div>
        <div className="relative z-10">
          <motion.p initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-2 text-xs tracking-[0.5em] uppercase neon-cyan">Happy Birthday</motion.p>
          <motion.h1 initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2, type: 'spring' }}
            className="font-bebas text-[100px] leading-none neon-pink md:text-[140px]">{birthday}</motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} className="mt-2 text-2xl font-bold">
            <span className="neon-yellow">từ</span> {a}
          </motion.p>
          {storyData.hero_block.short_quote && (
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }} className="mt-6 max-w-md text-base text-white/60">"{storyData.hero_block.short_quote}"</motion.p>
          )}
          {storyData.counter_block?.target_date && <Countdown targetDate={storyData.counter_block.target_date} />}
        </div>
      </section>

      {/* Timeline */}
      {events.length > 0 && (
        <section className="mx-auto max-w-3xl px-6 py-20">
          <h2 className="font-bebas mb-12 text-center text-6xl neon-cyan">{storyData.timeline_block?.section_title || 'MOMENTS'}</h2>
          <div className="grid gap-6 md:grid-cols-2">
            {events.map((e, i) => (
              <motion.div key={e.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="glass rounded-2xl p-5 group hover:border-[#ff0099]/40 transition-colors">
                {e.media_url && <img src={e.media_url} alt={e.title} className="mb-3 w-full rounded-xl object-cover" style={{ aspectRatio: '16/9' }} />}
                <p className="mb-1 text-xs neon-yellow">{e.date}</p>
                <h3 className="mb-2 text-lg font-bold">{e.title}</h3>
                <p className="text-sm text-white/50">{e.description}</p>
              </motion.div>
            ))}
          </div>
        </section>
      )}

      {/* Gallery */}
      {images.length > 0 && (
        <section className="py-16 overflow-hidden">
          <h2 className="font-bebas mb-10 text-center text-6xl neon-yellow">{storyData.gallery_block?.section_title || 'GALLERY'}</h2>
          <div className="flex gap-4 overflow-x-auto px-6 pb-4 no-scrollbar">
            {images.map((img, i) => (
              <button key={i} onClick={() => setGalleryOpen(i)} className="shrink-0 overflow-hidden rounded-xl group" style={{ width: 200, height: 280 }}>
                <img src={img.url} alt={img.caption} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" style={{ filter: 'saturate(1.2) contrast(1.1)' }} />
              </button>
            ))}
          </div>
        </section>
      )}

      {/* Letter */}
      {letter?.is_enabled && letter.content && (
        <section className="mx-auto max-w-2xl px-6 py-16">
          <div className="glass rounded-3xl p-8" style={{ borderColor: 'rgba(255,0,153,0.3)' }}>
            <Zap className="mx-auto mb-4 size-8 neon-pink" />
            <h2 className="font-bebas mb-6 text-center text-5xl neon-pink">{letter.heading || 'LỜI TỪ TRÁI TIM'}</h2>
            <p className="whitespace-pre-wrap text-base leading-relaxed text-white/70">{letter.content}</p>
            {letter.signature && <p className="mt-6 text-right font-bold neon-cyan">{letter.signature}</p>}
          </div>
        </section>
      )}

      <footer className="border-t border-white/10 py-10 text-center">
        <p className="font-bebas text-3xl neon-pink">{b} × {a}</p>
        <p className="mt-2 text-xs tracking-widest text-white/30">BIRTHDAY EDITION · COUPLESTORY</p>
      </footer>

      <AnimatePresence>
        {galleryOpen !== null && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-4"
            onClick={() => setGalleryOpen(null)}>
            <button className="absolute right-4 top-4 text-white/60 hover:text-white" onClick={() => setGalleryOpen(null)}><X className="size-6" /></button>
            <button className="absolute left-4 text-white/60 hover:text-white" onClick={e => { e.stopPropagation(); setGalleryOpen(g => Math.max(0, (g ?? 0) - 1)); }}><ArrowLeft className="size-6" /></button>
            <img src={images[galleryOpen]?.url} alt="" className="max-h-[85vh] max-w-[85vw] rounded-xl object-contain" onClick={e => e.stopPropagation()} />
            <button className="absolute right-4 text-white/60 hover:text-white" onClick={e => { e.stopPropagation(); setGalleryOpen(g => Math.min(images.length - 1, (g ?? 0) + 1)); }}><ArrowRight className="size-6" /></button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
