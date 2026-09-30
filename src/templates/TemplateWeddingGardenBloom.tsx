import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Leaf, Play, Pause, X, ArrowLeft, ArrowRight, Heart } from 'lucide-react';
import type { StoryData } from '@/data/mockScenarios';

const FONTS = `@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;1,400;1,600&family=Nunito:wght@300;400;600&display=swap');`;

function FloralDivider() {
  return (
    <svg viewBox="0 0 400 60" className="mx-auto my-8 w-full max-w-sm opacity-40" fill="none">
      <path d="M10 30 Q100 10 200 30 Q300 50 390 30" stroke="#7a9e7e" strokeWidth="1" strokeDasharray="4 3" />
      <circle cx="200" cy="30" r="4" fill="#d4a5a0" />
      <circle cx="150" cy="24" r="3" fill="#7a9e7e" />
      <circle cx="250" cy="36" r="3" fill="#7a9e7e" />
      <path d="M196 22 C198 18 202 18 204 22 L200 30Z" fill="#d4a5a0" />
      <path d="M192 26 C188 24 188 28 192 28Z" fill="#d4a5a0" />
      <path d="M208 26 C212 24 212 28 208 28Z" fill="#d4a5a0" />
    </svg>
  );
}

export default function TemplateWeddingGardenBloom({ storyData }: { storyData: StoryData }) {
  const [galleryOpen, setGalleryOpen] = useState<number | null>(null);
  const [playing, setPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const a = storyData.hero_block.partner_a.name;
  const b = storyData.hero_block.partner_b.name;
  const avatarA = storyData.hero_block.partner_a.avatar_url;
  const avatarB = storyData.hero_block.partner_b.avatar_url;
  const banner = storyData.hero_block.banner_images[0] || 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&w=1400&q=85';
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
    <div style={{ background: '#f7f3ee', color: '#3d2e2a', fontFamily: '"Nunito", sans-serif', minHeight: '100vh' }}>
      <style>{FONTS}{`
        .font-playfair { font-family: 'Playfair Display', Georgia, serif; }
        .sage { color: #7a9e7e; }
        .dusty-rose { color: #d4a5a0; }
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .leaf-bg { background-image: radial-gradient(circle at 20% 80%, rgba(122,158,126,0.07) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(212,165,160,0.07) 0%, transparent 50%); }
      `}</style>
      {music && <audio ref={audioRef} src={music} loop />}

      {/* Music */}
      {music && (
        <button onClick={toggleAudio} className="fixed bottom-5 right-5 z-50 flex size-11 items-center justify-center rounded-full shadow-lg" style={{ background: '#7a9e7e', color: 'white' }}>
          {playing ? <Pause className="size-4 fill-current" /> : <Play className="ml-0.5 size-4 fill-current" />}
        </button>
      )}

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="h-[70vh] overflow-hidden">
          <img src={banner} alt="Wedding" className="h-full w-full object-cover" style={{ filter: 'saturate(0.85) brightness(0.9)' }} />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, transparent 40%, #f7f3ee 100%)' }} />
        </div>
        <div className="relative -mt-32 pb-12 text-center">
          <div className="mb-6 flex justify-center gap-4">
            <motion.img src={avatarA} alt={a} className="size-20 rounded-full object-cover ring-4 ring-white shadow-md" initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.3 }} />
            <div className="flex items-center">
              <Heart className="size-6 fill-[#d4a5a0] text-[#d4a5a0]" />
            </div>
            <motion.img src={avatarB} alt={b} className="size-20 rounded-full object-cover ring-4 ring-white shadow-md" initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.3 }} />
          </div>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="font-playfair text-5xl italic md:text-7xl" style={{ color: '#3d2e2a' }}>
            {a} <span style={{ color: '#7a9e7e' }}>&</span> {b}
          </motion.h1>
          {storyData.counter_block?.target_date && (
            <p className="mt-3 text-sm tracking-widest" style={{ color: '#7a9e7e' }}>
              {new Date(storyData.counter_block.target_date).toLocaleDateString('vi-VN', { day: '2-digit', month: 'long', year: 'numeric' })}
            </p>
          )}
          {storyData.hero_block.short_quote && (
            <p className="mx-auto mt-4 max-w-lg font-playfair text-lg italic" style={{ color: '#7a9e7e' }}>"{storyData.hero_block.short_quote}"</p>
          )}
        </div>
      </section>

      <FloralDivider />

      {/* Timeline */}
      {events.length > 0 && (
        <section className="mx-auto max-w-3xl px-6 py-12 leaf-bg">
          <h2 className="font-playfair mb-12 text-center text-4xl italic" style={{ color: '#3d2e2a' }}>
            {storyData.timeline_block?.section_title || 'Câu Chuyện Của Chúng Mình'}
          </h2>
          <div className="relative pl-8">
            <div className="absolute left-2 top-0 h-full w-0.5" style={{ background: 'linear-gradient(to bottom, #d4a5a0, #7a9e7e)' }} />
            {events.map((e, i) => (
              <motion.div key={e.id} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="relative mb-12 last:mb-0">
                <div className="absolute -left-[1.625rem] top-1.5 size-4 rounded-full ring-4 ring-[#f7f3ee]" style={{ background: i % 2 === 0 ? '#d4a5a0' : '#7a9e7e' }} />
                <p className="mb-1 text-xs tracking-widest uppercase" style={{ color: '#7a9e7e' }}>{e.date}</p>
                <h3 className="font-playfair mb-2 text-2xl italic">{e.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: '#7a6e6b' }}>{e.description}</p>
                {e.media_url && (
                  <img src={e.media_url} alt={e.title} className="mt-4 w-full max-w-sm rounded-2xl object-cover shadow-md" style={{ aspectRatio: '4/3', filter: 'saturate(0.8)' }} />
                )}
              </motion.div>
            ))}
          </div>
        </section>
      )}

      <FloralDivider />

      {/* Gallery grid */}
      {images.length > 0 && (
        <section className="mx-auto max-w-4xl px-6 py-12">
          <h2 className="font-playfair mb-10 text-center text-4xl italic">{storyData.gallery_block?.section_title || 'Khoảnh Khắc Đẹp'}</h2>
          <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
            {images.map((img, i) => (
              <button key={i} onClick={() => setGalleryOpen(i)} className="group relative overflow-hidden rounded-2xl">
                <img src={img.url} alt={img.caption} className="aspect-square w-full object-cover transition-all duration-500 group-hover:scale-105 group-hover:saturate-100" style={{ filter: 'saturate(0.8)' }} />
                {img.caption && (
                  <div className="absolute inset-x-0 bottom-0 translate-y-full bg-black/50 p-2 text-xs text-white transition-transform group-hover:translate-y-0">{img.caption}</div>
                )}
              </button>
            ))}
          </div>
        </section>
      )}

      {/* Letter */}
      {letter?.is_enabled && letter.content && (
        <section className="mx-auto max-w-2xl px-6 py-16">
          <div className="rounded-3xl p-8 shadow-sm" style={{ background: 'white', border: '1px solid rgba(122,158,126,0.2)' }}>
            <Leaf className="mx-auto mb-4 size-8" style={{ color: '#7a9e7e' }} />
            <h2 className="font-playfair mb-2 text-center text-3xl italic">{letter.heading || 'Gửi Em Yêu'}</h2>
            <FloralDivider />
            <p className="font-playfair whitespace-pre-wrap text-lg leading-loose italic" style={{ color: '#5c4a46' }}>{letter.content}</p>
            {letter.signature && <p className="mt-6 text-right font-playfair text-xl italic" style={{ color: '#d4a5a0' }}>{letter.signature}</p>}
          </div>
        </section>
      )}

      <footer className="py-10 text-center">
        <p className="font-playfair text-2xl italic" style={{ color: '#7a9e7e' }}>{a} & {b}</p>
        <p className="mt-2 text-xs tracking-widest uppercase" style={{ color: '#b5a099' }}>Mãi bên nhau · CoupleStory</p>
      </footer>

      {/* Lightbox */}
      <AnimatePresence>
        {galleryOpen !== null && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
            onClick={() => setGalleryOpen(null)}>
            <button className="absolute right-4 top-4 text-white/70 hover:text-white" onClick={() => setGalleryOpen(null)}><X className="size-6" /></button>
            <button className="absolute left-4 text-white/70 hover:text-white" onClick={e => { e.stopPropagation(); setGalleryOpen(g => Math.max(0, (g ?? 0) - 1)); }} disabled={galleryOpen === 0}><ArrowLeft className="size-6" /></button>
            <img src={images[galleryOpen]?.url} alt="" className="max-h-[85vh] max-w-[85vw] rounded-xl object-contain" onClick={e => e.stopPropagation()} />
            <button className="absolute right-4 text-white/70 hover:text-white" onClick={e => { e.stopPropagation(); setGalleryOpen(g => Math.min(images.length - 1, (g ?? 0) + 1)); }} disabled={galleryOpen === images.length - 1}><ArrowRight className="size-6" /></button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
