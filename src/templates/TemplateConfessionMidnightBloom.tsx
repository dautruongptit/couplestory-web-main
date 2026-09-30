import { useState, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, X, ArrowLeft, ArrowRight, Heart } from 'lucide-react';
import type { StoryData } from '@/data/mockScenarios';

const FONTS = `@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;1,400;1,600&family=Manrope:wght@300;400;600&display=swap');`;

function Fireflies() {
  const flies = useMemo(() => Array.from({ length: 28 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 3 + 2,
    dur: Math.random() * 5 + 5,
    delay: Math.random() * 4,
    color: ['#c084fc', '#f472b6', '#fde68a'][i % 3],
  })), []);
  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden">
      {flies.map(f => (
        <motion.span key={f.id} className="absolute rounded-full"
          style={{ left: `${f.x}%`, top: `${f.y}%`, width: f.size, height: f.size, background: f.color, boxShadow: `0 0 ${f.size * 4}px ${f.color}` }}
          animate={{ opacity: [0, 0.9, 0], y: [0, -40, -80], x: [0, 15, -10] }}
          transition={{ duration: f.dur, delay: f.delay, repeat: Infinity, ease: 'easeInOut' }} />
      ))}
    </div>
  );
}

export default function TemplateConfessionMidnightBloom({ storyData }: { storyData: StoryData }) {
  const [galleryOpen, setGalleryOpen] = useState<number | null>(null);
  const [answer, setAnswer] = useState<'yes' | null>(null);
  const [playing, setPlaying] = useState(false);
  const [noPos, setNoPos] = useState({ x: 0, y: 0 });
  const audioRef = useRef<HTMLAudioElement>(null);

  const a = storyData.hero_block.partner_a.name;
  const b = storyData.hero_block.partner_b.name;
  const banner = storyData.hero_block.banner_images[0];
  const images = storyData.gallery_block?.images ?? [];
  const events = storyData.timeline_block?.events ?? [];
  const letter = storyData.letter_block;
  const music = storyData.global_config?.background_music_url;

  const toggleAudio = async () => {
    if (!audioRef.current) return;
    if (playing) { audioRef.current.pause(); setPlaying(false); }
    else { try { await audioRef.current.play(); setPlaying(true); } catch { /* autoplay blocked */ } }
  };

  const dodge = () => setNoPos({ x: (Math.random() - 0.5) * 220, y: (Math.random() - 0.5) * 140 });

  return (
    <div style={{ background: 'radial-gradient(ellipse at top, #1e1240 0%, #0d0b16 60%)', color: '#f3e8ff', fontFamily: '"Manrope", sans-serif', minHeight: '100vh' }}>
      <style>{FONTS}{`
        .font-cg { font-family: 'Cormorant Garamond', Georgia, serif; }
        .glow-text { text-shadow: 0 0 24px rgba(192,132,252,0.6); }
        .glass-night { background: rgba(255,255,255,0.05); backdrop-filter: blur(10px); border: 1px solid rgba(192,132,252,0.2); }
      `}</style>
      {music && <audio ref={audioRef} src={music} loop />}
      <Fireflies />

      {music && (
        <button onClick={toggleAudio} className="fixed right-5 top-5 z-50 flex size-10 items-center justify-center rounded-full glass-night text-[#c084fc]">
          {playing ? <Pause className="size-4 fill-current" /> : <Play className="ml-0.5 size-4 fill-current" />}
        </button>
      )}

      <div className="relative z-10">
        {/* Hero */}
        <section className="relative flex min-h-screen flex-col items-center justify-center px-6 text-center">
          {banner && (
            <div className="absolute inset-0 overflow-hidden">
              <img src={banner} alt="" className="h-full w-full object-cover opacity-20" />
              <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, transparent, #0d0b16)' }} />
            </div>
          )}
          <div className="relative">
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="mb-4 text-xs uppercase tracking-[0.5em] text-[#c084fc]">Gửi {b}</motion.p>
            <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 1 }}
              className="font-cg glow-text text-5xl italic leading-tight md:text-7xl">
              {storyData.hero_block.short_quote || 'Có điều này anh muốn nói với em…'}
            </motion.h1>
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }} className="mt-8 text-sm text-white/50">— {a}</motion.p>
          </div>
        </section>

        {/* Letter */}
        {letter?.is_enabled && letter.content && (
          <section className="mx-auto max-w-2xl px-6 py-16">
            <div className="glass-night rounded-3xl p-8 md:p-10">
              <h2 className="font-cg mb-6 text-3xl italic text-[#f472b6]">{letter.heading || `${b} ơi,`}</h2>
              <p className="font-cg whitespace-pre-wrap text-xl italic leading-relaxed text-white/85">{letter.content}</p>
              {letter.signature && <p className="font-cg mt-8 text-right text-xl italic text-[#c084fc]">{letter.signature}</p>}
            </div>
          </section>
        )}

        {/* Timeline */}
        {events.length > 0 && (
          <section className="mx-auto max-w-3xl px-6 py-16">
            <h2 className="font-cg mb-10 text-center text-4xl italic glow-text">{storyData.timeline_block?.section_title || 'Từ ngày quen em'}</h2>
            <div className="space-y-6">
              {events.map((e, i) => (
                <motion.div key={e.id} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                  className="glass-night flex flex-col gap-4 rounded-2xl p-5 md:flex-row">
                  {e.media_url && <img src={e.media_url} alt={e.title} className="h-40 w-full rounded-xl object-cover md:w-48" />}
                  <div>
                    <p className="mb-1 text-xs tracking-widest text-[#f472b6]">{e.date}</p>
                    <h3 className="font-cg mb-1 text-2xl italic">{e.title}</h3>
                    <p className="text-sm leading-relaxed text-white/55">{e.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </section>
        )}

        {/* Gallery */}
        {images.length > 0 && (
          <section className="mx-auto max-w-4xl px-6 py-12">
            <h2 className="font-cg mb-8 text-center text-4xl italic glow-text">{storyData.gallery_block?.section_title || 'Những khoảnh khắc'}</h2>
            <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
              {images.map((img, i) => (
                <button key={i} onClick={() => setGalleryOpen(i)} className="group overflow-hidden rounded-2xl">
                  <img src={img.url} alt={img.caption} className="aspect-square w-full object-cover opacity-80 transition duration-500 group-hover:scale-105 group-hover:opacity-100" />
                </button>
              ))}
            </div>
          </section>
        )}

        {/* The question */}
        <section className="flex min-h-[70vh] flex-col items-center justify-center px-6 text-center">
          <AnimatePresence mode="wait">
            {answer === null ? (
              <motion.div key="ask" exit={{ opacity: 0, scale: 0.9 }}>
                <h2 className="font-cg glow-text mb-10 text-4xl italic md:text-6xl">Em làm người yêu anh nhé?</h2>
                <div className="relative flex items-center justify-center gap-6">
                  <button onClick={() => setAnswer('yes')} className="rounded-full bg-gradient-to-r from-[#c084fc] to-[#f472b6] px-10 py-3 text-lg font-semibold text-white shadow-[0_0_30px_rgba(244,114,182,0.5)] transition hover:scale-105">
                    Đồng ý
                  </button>
                  <motion.button animate={noPos} transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                    onMouseEnter={dodge} onTouchStart={dodge} onClick={dodge}
                    className="glass-night rounded-full px-8 py-3 text-lg text-white/70">
                    Để em nghĩ
                  </motion.button>
                </div>
              </motion.div>
            ) : (
              <motion.div key="yes" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}>
                <Heart className="mx-auto mb-6 size-16 animate-pulse fill-[#f472b6] text-[#f472b6]" />
                <h2 className="font-cg glow-text text-5xl italic md:text-7xl">Yêu em nhiều lắm!</h2>
                <p className="mt-4 text-white/60">{a} & {b}</p>
              </motion.div>
            )}
          </AnimatePresence>
        </section>

        <footer className="py-10 text-center text-xs uppercase tracking-[0.3em] text-white/30">Midnight Bloom · CoupleStory</footer>
      </div>

      <AnimatePresence>
        {galleryOpen !== null && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4" onClick={() => setGalleryOpen(null)}>
            <button className="absolute right-4 top-4 text-white/70 hover:text-white" onClick={() => setGalleryOpen(null)}><X className="size-6" /></button>
            <button className="absolute left-4 text-white/70 hover:text-white" onClick={e => { e.stopPropagation(); setGalleryOpen(g => Math.max(0, (g ?? 0) - 1)); }}><ArrowLeft className="size-6" /></button>
            <img src={images[galleryOpen]?.url} alt="" className="max-h-[85vh] max-w-[85vw] rounded-xl object-contain" onClick={e => e.stopPropagation()} />
            <button className="absolute right-4 text-white/70 hover:text-white" onClick={e => { e.stopPropagation(); setGalleryOpen(g => Math.min(images.length - 1, (g ?? 0) + 1)); }}><ArrowRight className="size-6" /></button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
