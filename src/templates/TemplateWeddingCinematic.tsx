import { useState, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { Play, Pause, ChevronDown, X, ArrowLeft, ArrowRight } from 'lucide-react';
import type { StoryData } from '@/data/mockScenarios';

const FONTS = `@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&family=DM+Sans:wght@300;400;500&display=swap');`;

export default function TemplateWeddingCinematic({ storyData }: { storyData: StoryData }) {
  const [galleryOpen, setGalleryOpen] = useState<number | null>(null);
  const [letterOpen, setLetterOpen] = useState(false);
  const [playing, setPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const heroY = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const a = storyData.hero_block.partner_a.name;
  const b = storyData.hero_block.partner_b.name;
  const banner = storyData.hero_block.banner_images[0] || 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1600&q=85';
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
    <div style={{ background: '#111111', color: '#f0ede8', fontFamily: '"DM Sans", sans-serif', minHeight: '100vh' }}>
      <style>{FONTS}{`
        .font-cormorant { font-family: 'Cormorant Garamond', Georgia, serif; }
        .gold { color: #c9a96e; }
        .grain::after { content: ''; position: fixed; inset: 0; background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E"); pointer-events: none; z-index: 100; }
      `}</style>
      {music && <audio ref={audioRef} src={music} loop />}

      {/* Floating audio btn */}
      {music && (
        <button onClick={toggleAudio} className="fixed top-5 right-5 z-50 flex size-10 items-center justify-center rounded-full border border-[#c9a96e]/40 bg-black/60 backdrop-blur-md text-[#c9a96e]">
          {playing ? <Pause className="size-4 fill-current" /> : <Play className="ml-0.5 size-4 fill-current" />}
        </button>
      )}

      {/* Hero */}
      <section ref={heroRef} className="relative h-screen overflow-hidden">
        <motion.div style={{ y: heroY }} className="absolute inset-0">
          <img src={banner} alt="Wedding" className="h-[120%] w-full object-cover" />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, rgba(17,17,17,0.3) 0%, rgba(17,17,17,0.5) 60%, #111111 100%)' }} />
        </motion.div>
        <motion.div style={{ opacity: heroOpacity }} className="relative z-10 flex h-full flex-col items-center justify-center text-center px-6">
          <p className="mb-6 text-[10px] uppercase tracking-[0.4em] text-[#c9a96e]">Wedding</p>
          <h1 className="font-cormorant text-[72px] leading-[1.05] italic md:text-[96px] lg:text-[120px]">
            {a}<br /><span className="text-[#c9a96e]">&</span><br />{b}
          </h1>
          {storyData.counter_block?.target_date && (
            <p className="mt-6 text-[11px] tracking-[0.25em] text-[#c9a96e]/80">
              {new Date(storyData.counter_block.target_date).toLocaleDateString('en-GB', { day: '2-digit', month: 'long', year: 'numeric' })}
            </p>
          )}
          {storyData.hero_block.short_quote && (
            <p className="mt-4 max-w-md font-cormorant text-xl italic text-[#f0ede8]/70">"{storyData.hero_block.short_quote}"</p>
          )}
          <a href="#story" className="mt-10 flex flex-col items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-[#c9a96e]/60">
            <span>Scroll</span>
            <ChevronDown className="size-4 animate-bounce" />
          </a>
        </motion.div>
      </section>

      {/* Our Story */}
      {events.length > 0 && (
        <section id="story" className="mx-auto max-w-4xl px-6 py-24">
          <div className="mb-16 text-center">
            <p className="mb-3 text-[10px] uppercase tracking-[0.3em] text-[#c9a96e]">Our Story</p>
            <h2 className="font-cormorant text-5xl italic">{storyData.timeline_block?.section_title || 'The Journey'}</h2>
          </div>
          <div className="space-y-20">
            {events.map((e, i) => (
              <motion.div key={e.id} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}
                className={`flex flex-col gap-10 md:flex-row md:items-center ${i % 2 === 1 ? 'md:flex-row-reverse' : ''}`}>
                {e.media_url ? (
                  <div className="md:w-1/2">
                    <img src={e.media_url} alt={e.title} className="w-full object-cover" style={{ aspectRatio: '4/3', filter: 'saturate(0.8) contrast(1.1)' }} />
                  </div>
                ) : <div className="hidden md:block md:w-1/2" />}
                <div className="md:w-1/2 space-y-3">
                  <p className="text-[10px] uppercase tracking-[0.3em] text-[#c9a96e]">{e.date}</p>
                  <h3 className="font-cormorant text-4xl italic">{e.title}</h3>
                  <p className="text-sm leading-relaxed text-[#f0ede8]/60">{e.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      )}

      {/* Gallery — Film strip */}
      {images.length > 0 && (
        <section className="py-20 overflow-hidden">
          <div className="mb-10 text-center">
            <p className="text-[10px] uppercase tracking-[0.3em] text-[#c9a96e]">Memories</p>
            <h2 className="font-cormorant mt-2 text-4xl italic">{storyData.gallery_block?.section_title || 'Our Frames'}</h2>
          </div>
          <div className="flex gap-3 overflow-x-auto px-6 pb-4 no-scrollbar">
            {images.map((img, i) => (
              <button key={i} onClick={() => setGalleryOpen(i)} className="shrink-0 overflow-hidden group" style={{ width: 240, height: 320 }}>
                <img src={img.url} alt={img.caption} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" style={{ filter: 'saturate(0.75)' }} />
              </button>
            ))}
          </div>
        </section>
      )}

      {/* Love letter */}
      {letter?.is_enabled && letter.content && (
        <section className="mx-auto max-w-2xl px-6 py-20 text-center">
          <p className="mb-3 text-[10px] uppercase tracking-[0.3em] text-[#c9a96e]">A Vow</p>
          <h2 className="font-cormorant mb-8 text-4xl italic">{letter.heading || 'For you, always.'}</h2>
          <button onClick={() => setLetterOpen(!letterOpen)} className="text-[11px] uppercase tracking-[0.2em] text-[#c9a96e] border-b border-[#c9a96e]/40 pb-0.5">
            {letterOpen ? 'Close' : 'Read our vows'}
          </button>
          <AnimatePresence>
            {letterOpen && (
              <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                <p className="mt-8 font-cormorant text-2xl italic leading-relaxed text-[#f0ede8]/80">{letter.content}</p>
                {letter.signature && <p className="mt-6 text-[#c9a96e] font-cormorant text-xl italic">{letter.signature}</p>}
              </motion.div>
            )}
          </AnimatePresence>
        </section>
      )}

      <footer className="border-t border-[#c9a96e]/20 py-10 text-center">
        <p className="font-cormorant text-2xl italic text-[#c9a96e]">{a} & {b}</p>
        <p className="mt-2 text-[10px] uppercase tracking-[0.3em] text-[#f0ede8]/30">Forever & Always · CoupleStory</p>
      </footer>

      {/* Gallery lightbox */}
      <AnimatePresence>
        {galleryOpen !== null && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm p-4"
            onClick={() => setGalleryOpen(null)}>
            <button className="absolute right-4 top-4 text-white/60 hover:text-white" onClick={() => setGalleryOpen(null)}><X className="size-6" /></button>
            <button className="absolute left-4 text-white/60 hover:text-white" onClick={e => { e.stopPropagation(); setGalleryOpen(g => Math.max(0, (g ?? 0) - 1)); }} disabled={galleryOpen === 0}><ArrowLeft className="size-6" /></button>
            <img src={images[galleryOpen]?.url} alt="" className="max-h-[85vh] max-w-[85vw] object-contain" onClick={e => e.stopPropagation()} />
            <button className="absolute right-4 text-white/60 hover:text-white" onClick={e => { e.stopPropagation(); setGalleryOpen(g => Math.min(images.length - 1, (g ?? 0) + 1)); }} disabled={galleryOpen === images.length - 1}><ArrowRight className="size-6" /></button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
