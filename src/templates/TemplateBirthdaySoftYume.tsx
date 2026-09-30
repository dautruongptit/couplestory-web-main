import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Play, Pause, X, ArrowLeft, ArrowRight, Cake } from 'lucide-react';
import type { StoryData } from '@/data/mockScenarios';

const FONTS = `@import url('https://fonts.googleapis.com/css2?family=Quicksand:wght@300;400;600;700&family=Pacifico&display=swap');`;

function Stars() {
  const stars = Array.from({ length: 30 }, (_, i) => ({
    id: i, x: Math.random() * 100, y: Math.random() * 100,
    size: Math.random() * 6 + 3,
    color: ['#f9a8d4', '#c4b5fd', '#86efac', '#fde68a'][Math.floor(Math.random() * 4)],
    d: Math.random() * 3 + 2,
    delay: Math.random() * 4,
  }));
  return (
    <div className="pointer-events-none absolute inset-0">
      {stars.map(s => (
        <motion.div key={s.id} className="absolute" style={{ left: `${s.x}%`, top: `${s.y}%` }}
          animate={{ opacity: [0.3, 1, 0.3], scale: [0.8, 1.2, 0.8] }}
          transition={{ duration: s.d, delay: s.delay, repeat: Infinity, ease: 'easeInOut' }}>
          <Star className="fill-current" style={{ color: s.color, width: s.size, height: s.size }} />
        </motion.div>
      ))}
    </div>
  );
}

function AgeCounter({ birthday }: { birthday: string }) {
  const [age, setAge] = useState(0);
  const [days, setDays] = useState(0);
  useEffect(() => {
    const bd = new Date(birthday);
    const now = new Date();
    setAge(now.getFullYear() - bd.getFullYear());
    const nextBd = new Date(now.getFullYear(), bd.getMonth(), bd.getDate());
    if (nextBd < now) nextBd.setFullYear(now.getFullYear() + 1);
    setDays(Math.ceil((nextBd.getTime() - now.getTime()) / 86400000));
  }, [birthday]);
  return (
    <div className="flex flex-wrap justify-center gap-6 my-8">
      {[{ v: age, l: 'Tuổi xinh' }, { v: days, l: 'Ngày tới sinh nhật' }].map(({ v, l }) => (
        <motion.div key={l} className="flex flex-col items-center rounded-2xl px-6 py-4 shadow-sm" style={{ background: 'rgba(255,255,255,0.7)', backdropFilter: 'blur(8px)' }}
          whileHover={{ scale: 1.05 }}>
          <span className="text-4xl font-bold" style={{ fontFamily: '"Pacifico", cursive', color: '#f472b6' }}>{v}</span>
          <span className="mt-1 text-xs" style={{ color: '#9ca3af' }}>{l}</span>
        </motion.div>
      ))}
    </div>
  );
}

export default function TemplateBirthdaySoftYume({ storyData }: { storyData: StoryData }) {
  const [galleryOpen, setGalleryOpen] = useState<number | null>(null);
  const [playing, setPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const a = storyData.hero_block.partner_a.name;
  const b = storyData.hero_block.partner_b.name;
  const avatarB = storyData.hero_block.partner_b.avatar_url;
  const banner = storyData.hero_block.banner_images[0];
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
    <div style={{ background: 'linear-gradient(135deg, #fdf2f8 0%, #f5f3ff 50%, #ecfdf5 100%)', color: '#1f2937', fontFamily: '"Quicksand", sans-serif', minHeight: '100vh' }}>
      <style>{FONTS}{`
        .font-pacifico { font-family: 'Pacifico', cursive; }
        .soft-card { background: rgba(255,255,255,0.6); backdrop-filter: blur(8px); border: 1px solid rgba(249,168,212,0.3); border-radius: 24px; }
        .no-scrollbar::-webkit-scrollbar { display: none; }
      `}</style>
      {music && <audio ref={audioRef} src={music} loop />}

      {music && (
        <button onClick={toggleAudio} className="fixed bottom-5 right-5 z-50 flex size-11 items-center justify-center rounded-full shadow-lg" style={{ background: 'linear-gradient(135deg, #f472b6, #c084fc)', color: 'white' }}>
          {playing ? <Pause className="size-4 fill-current" /> : <Play className="ml-0.5 size-4 fill-current" />}
        </button>
      )}

      {/* Hero */}
      <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 text-center">
        <Stars />
        {banner && <div className="absolute inset-0"><img src={banner} alt="" className="h-full w-full object-cover opacity-10" /></div>}
        <div className="relative z-10 flex flex-col items-center">
          {avatarB && (
            <motion.div initial={{ scale: 0, rotate: -10 }} animate={{ scale: 1, rotate: 0 }} transition={{ type: 'spring', delay: 0.2 }}
              className="mb-6 overflow-hidden rounded-full shadow-xl" style={{ width: 120, height: 120, boxShadow: '0 0 0 4px #f9a8d4' }}>
              <img src={avatarB} alt={b} className="h-full w-full object-cover" />
            </motion.div>
          )}
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="mb-2 text-sm font-semibold tracking-widest" style={{ color: '#c084fc' }}>✨ Happy Birthday ✨</motion.p>
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, type: 'spring' }}
            className="font-pacifico text-6xl md:text-8xl" style={{ color: '#f472b6', textShadow: '2px 4px 0 #fce7f3' }}>{b}</motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }} className="mt-4 text-base font-semibold" style={{ color: '#a78bfa' }}>
            Được yêu thương bởi {a} 💝
          </motion.p>
          {storyData.hero_block.short_quote && (
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }} className="mt-4 max-w-sm rounded-2xl px-5 py-3 text-sm soft-card" style={{ color: '#6b7280' }}>
              "{storyData.hero_block.short_quote}"
            </motion.p>
          )}
          {storyData.counter_block?.target_date && <AgeCounter birthday={storyData.counter_block.target_date} />}
        </div>
      </section>

      {/* Memories */}
      {events.length > 0 && (
        <section className="mx-auto max-w-3xl px-6 py-16">
          <h2 className="font-pacifico mb-10 text-center text-4xl" style={{ color: '#c084fc' }}>
            {storyData.timeline_block?.section_title || 'Kỷ Niệm Của Mình'}
          </h2>
          <div className="space-y-6">
            {events.map((e, i) => (
              <motion.div key={e.id} initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
                className={`soft-card p-5 flex gap-5 ${i % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}>
                {e.media_url && <img src={e.media_url} alt={e.title} className="w-32 h-24 shrink-0 rounded-xl object-cover" />}
                <div>
                  <p className="mb-1 text-xs font-semibold" style={{ color: '#f472b6' }}>{e.date}</p>
                  <h3 className="mb-1 text-lg font-bold" style={{ color: '#1f2937' }}>{e.title}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: '#6b7280' }}>{e.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      )}

      {/* Gallery */}
      {images.length > 0 && (
        <section className="py-12 overflow-hidden">
          <h2 className="font-pacifico mb-8 text-center text-4xl" style={{ color: '#f472b6' }}>
            {storyData.gallery_block?.section_title || 'Album Xinh'}
          </h2>
          <div className="flex gap-4 overflow-x-auto px-6 pb-4 no-scrollbar">
            {images.map((img, i) => (
              <button key={i} onClick={() => setGalleryOpen(i)}
                className="shrink-0 overflow-hidden rounded-2xl transition-all" style={{ width: 200, height: 250, boxShadow: '0 0 0 2px #f9a8d4' }}>
                <img src={img.url} alt={img.caption} className="h-full w-full object-cover transition-transform duration-500 hover:scale-105" />
              </button>
            ))}
          </div>
        </section>
      )}

      {/* Letter */}
      {letter?.is_enabled && letter.content && (
        <section className="mx-auto max-w-xl px-6 py-16">
          <div className="soft-card p-8 text-center shadow-md" style={{ background: 'rgba(255,255,255,0.8)' }}>
            <Cake className="mx-auto mb-3 size-8" style={{ color: '#f472b6' }} />
            <h2 className="font-pacifico mb-4 text-3xl" style={{ color: '#f472b6' }}>{letter.heading || 'Lời Chúc Từ Trái Tim'}</h2>
            <p className="whitespace-pre-wrap text-base leading-relaxed" style={{ color: '#4b5563' }}>{letter.content}</p>
            {letter.signature && <p className="mt-5 font-pacifico text-xl" style={{ color: '#c084fc' }}>{letter.signature}</p>}
          </div>
        </section>
      )}

      <footer className="py-10 text-center">
        <p className="font-pacifico text-3xl" style={{ color: '#f472b6' }}>Happy Birthday {b} ✨</p>
        <p className="mt-2 text-xs tracking-widest uppercase" style={{ color: '#9ca3af' }}>With love · CoupleStory</p>
      </footer>

      <AnimatePresence>
        {galleryOpen !== null && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
            onClick={() => setGalleryOpen(null)}>
            <button className="absolute right-4 top-4 text-white/70 hover:text-white" onClick={() => setGalleryOpen(null)}><X className="size-6" /></button>
            <button className="absolute left-4 text-white/60 hover:text-white" onClick={e => { e.stopPropagation(); setGalleryOpen(g => Math.max(0, (g ?? 0) - 1)); }}><ArrowLeft className="size-6" /></button>
            <img src={images[galleryOpen]?.url} alt="" className="max-h-[85vh] max-w-[85vw] rounded-2xl object-contain" onClick={e => e.stopPropagation()} />
            <button className="absolute right-4 text-white/60 hover:text-white" onClick={e => { e.stopPropagation(); setGalleryOpen(g => Math.min(images.length - 1, (g ?? 0) + 1)); }}><ArrowRight className="size-6" /></button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
