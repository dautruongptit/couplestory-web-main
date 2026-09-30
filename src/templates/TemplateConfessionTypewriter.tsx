import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, X, ArrowLeft, ArrowRight, Mail } from 'lucide-react';
import type { StoryData } from '@/data/mockScenarios';

const FONTS = `@import url('https://fonts.googleapis.com/css2?family=Special+Elite&family=Courier+Prime:ital,wght@0,400;0,700;1,400&display=swap');`;

function Typewriter({ text, speed = 28, started }: { text: string; speed?: number; started: boolean }) {
  const [shown, setShown] = useState('');
  useEffect(() => {
    if (!started) return;
    setShown('');
    let i = 0;
    const id = setInterval(() => {
      i++;
      setShown(text.slice(0, i));
      if (i >= text.length) clearInterval(id);
    }, speed);
    return () => clearInterval(id);
  }, [text, speed, started]);
  return (
    <span>
      {shown}
      {shown.length < text.length && started && <span className="animate-pulse">|</span>}
    </span>
  );
}

export default function TemplateConfessionTypewriter({ storyData }: { storyData: StoryData }) {
  const [galleryOpen, setGalleryOpen] = useState<number | null>(null);
  const [opened, setOpened] = useState(false);
  const [playing, setPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const a = storyData.hero_block.partner_a.name;
  const b = storyData.hero_block.partner_b.name;
  const images = storyData.gallery_block?.images ?? [];
  const events = storyData.timeline_block?.events ?? [];
  const letter = storyData.letter_block;
  const music = storyData.global_config?.background_music_url;
  const body = letter?.content || storyData.hero_block.short_quote || '';

  const toggleAudio = async () => {
    if (!audioRef.current) return;
    if (playing) { audioRef.current.pause(); setPlaying(false); }
    else { try { await audioRef.current.play(); setPlaying(true); } catch { /* autoplay blocked */ } }
  };

  const handleOpen = () => {
    setOpened(true);
    if (music && audioRef.current) {
      audioRef.current.play().then(() => setPlaying(true)).catch(() => { /* autoplay blocked */ });
    }
  };

  return (
    <div style={{ background: '#e9e2d3', color: '#2d1f14', fontFamily: '"Courier Prime", monospace', minHeight: '100vh' }}>
      <style>{FONTS}{`
        .font-elite { font-family: 'Special Elite', 'Courier Prime', monospace; }
        .paper { background: #faf7f0; box-shadow: 0 2px 0 #d8cfbc, 0 8px 30px rgba(45,31,20,0.15); background-image: repeating-linear-gradient(transparent, transparent 31px, rgba(45,31,20,0.06) 32px); }
        .stamp { border: 3px solid #b3261e; color: #b3261e; transform: rotate(-8deg); }
      `}</style>
      {music && <audio ref={audioRef} src={music} loop />}

      {music && opened && (
        <button onClick={toggleAudio} className="fixed right-5 top-5 z-50 flex size-10 items-center justify-center rounded-full border-2 border-[#2d1f14] bg-[#faf7f0]">
          {playing ? <Pause className="size-4 fill-current" /> : <Play className="ml-0.5 size-4 fill-current" />}
        </button>
      )}

      <AnimatePresence mode="wait">
        {!opened ? (
          <motion.section key="envelope" exit={{ opacity: 0, y: -40 }} className="flex min-h-screen flex-col items-center justify-center px-6 text-center">
            <p className="mb-3 text-xs uppercase tracking-[0.3em]">Có một lá thư cho</p>
            <h1 className="font-elite mb-10 text-5xl md:text-7xl">{b}</h1>
            <motion.button onClick={handleOpen} whileHover={{ scale: 1.05, rotate: -1 }} whileTap={{ scale: 0.97 }}
              className="relative flex h-44 w-72 items-center justify-center shadow-xl" style={{ background: '#f3ead5', border: '2px solid #2d1f14' }}>
              <svg className="absolute inset-0 h-full w-full" viewBox="0 0 288 176" preserveAspectRatio="none">
                <path d="M0 0 L144 100 L288 0" fill="none" stroke="#2d1f14" strokeWidth="2" />
              </svg>
              <div className="stamp absolute right-4 top-4 px-2 py-0.5 text-[10px] font-bold uppercase tracking-widest">Bí mật</div>
              <Mail className="relative z-10 mt-8 size-8" />
            </motion.button>
            <p className="mt-8 text-xs tracking-widest opacity-60">— chạm để mở thư —</p>
          </motion.section>
        ) : (
          <motion.main key="letter" initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="mx-auto max-w-2xl px-4 py-16">
            <div className="paper p-8 md:p-12">
              <p className="mb-6 text-right text-xs opacity-60">
                {storyData.counter_block?.target_date ? new Date(storyData.counter_block.target_date).toLocaleDateString('vi-VN') : ''}
              </p>
              <h2 className="font-elite mb-6 text-2xl">{letter?.heading || `Gửi ${b},`}</h2>
              <p className="whitespace-pre-wrap text-base leading-8 md:text-lg">
                <Typewriter text={body} started={opened} />
              </p>
              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: Math.min(body.length * 0.028, 12) }}
                className="font-elite mt-10 text-right text-xl">{letter?.signature || `— ${a}`}</motion.p>
            </div>

            {events.length > 0 && (
              <div className="mt-16">
                <h3 className="font-elite mb-6 text-center text-2xl">{storyData.timeline_block?.section_title || 'Những điều muốn kể'}</h3>
                <div className="space-y-5">
                  {events.map((e, i) => (
                    <motion.div key={e.id} initial={{ opacity: 0, rotate: i % 2 ? 1.5 : -1.5, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="paper p-5">
                      <p className="mb-1 text-xs opacity-60">{e.date}</p>
                      <h4 className="font-elite mb-2 text-lg">{e.title}</h4>
                      <p className="text-sm leading-7">{e.description}</p>
                      {e.media_url && <img src={e.media_url} alt={e.title} className="mt-3 w-full object-cover sepia-[20%]" style={{ aspectRatio: '16/9' }} />}
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {images.length > 0 && (
              <div className="mt-16">
                <h3 className="font-elite mb-6 text-center text-2xl">{storyData.gallery_block?.section_title || 'Ảnh kèm theo thư'}</h3>
                <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
                  {images.map((img, i) => (
                    <button key={i} onClick={() => setGalleryOpen(i)} className="bg-white p-2 pb-8 shadow-md transition-transform hover:scale-105"
                      style={{ transform: `rotate(${(i % 3 - 1) * 2}deg)` }}>
                      <img src={img.url} alt={img.caption} className="aspect-square w-full object-cover sepia-[25%]" />
                    </button>
                  ))}
                </div>
              </div>
            )}

            <p className="mt-16 text-center text-xs uppercase tracking-[0.3em] opacity-50">Gửi bằng cả trái tim · CoupleStory</p>
          </motion.main>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {galleryOpen !== null && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4" onClick={() => setGalleryOpen(null)}>
            <button className="absolute right-4 top-4 text-white/70 hover:text-white" onClick={() => setGalleryOpen(null)}><X className="size-6" /></button>
            <button className="absolute left-4 text-white/70 hover:text-white" onClick={e => { e.stopPropagation(); setGalleryOpen(g => Math.max(0, (g ?? 0) - 1)); }}><ArrowLeft className="size-6" /></button>
            <img src={images[galleryOpen]?.url} alt="" className="max-h-[85vh] max-w-[85vw] object-contain" onClick={e => e.stopPropagation()} />
            <button className="absolute right-4 text-white/70 hover:text-white" onClick={e => { e.stopPropagation(); setGalleryOpen(g => Math.min(images.length - 1, (g ?? 0) + 1)); }}><ArrowRight className="size-6" /></button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
