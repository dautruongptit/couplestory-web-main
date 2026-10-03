import { useEffect, useMemo, useRef, useState } from 'react';
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from 'framer-motion';
import {
  ArrowDown, ArrowLeft, ArrowRight, Check, ChevronDown,
  Coffee, Flower2, Heart, Home, MapPin, Music2,
  Pause, Plane, Play, Sparkles, Volume2, VolumeX, X,
} from 'lucide-react';
import type { StoryData } from '@/data/mockScenarios';

// ── Types ──────────────────────────────────────────────────────

interface Memory {
  id: string;
  title: string;
  date: string;
  description: string;
  location: string;
  category: string;
  coverPhoto: string;
  photos: string[];
  caption: string;
  featured: boolean;
}

// ── Helpers ────────────────────────────────────────────────────

const dateLabel = (date: string) =>
  new Date(`${date}T12:00:00`).toLocaleDateString('en-GB', {
    day: '2-digit', month: 'long', year: 'numeric',
  });

const categoryIcon = (category: string) =>
  category.toLowerCase().includes('date') || category.toLowerCase().includes('cà phê') ? Coffee
  : category.toLowerCase().includes('trip') || category.toLowerCase().includes('travel') || category.toLowerCase().includes('chuyến') ? Plane
  : category.toLowerCase().includes('anniversary') || category.toLowerCase().includes('kỷ niệm') ? Heart
  : category.toLowerCase().includes('special') || category.toLowerCase().includes('đặc biệt') ? Sparkles
  : Flower2;

function mapStoryDataToMemories(data: StoryData): Memory[] {
  const events = data.timeline_block?.events ?? [];
  const photos = data.gallery_block?.images ?? [];

  if (events.length === 0) return [];

  return events.map((event, index) => ({
    id: event.id || `memory-${index}`,
    title: event.title || 'Một kỷ niệm đẹp',
    date: event.date || '',
    description: event.description || '',
    location: '',
    category: 'Special',
    coverPhoto: event.media_url || photos[index % Math.max(photos.length, 1)]?.url || 'https://images.unsplash.com/photo-1518199266791-5375a83190b7?auto=format&fit=crop&w=900&q=85',
    photos: [
      event.media_url || photos[index % Math.max(photos.length, 1)]?.url || '',
      ...(photos.slice(index * 2, index * 2 + 2).map(p => p.url).filter(Boolean)),
    ].filter(Boolean),
    caption: photos[index]?.caption || event.title || '',
    featured: index === 0 || index === events.length - 1,
  }));
}

// ── Sub-components ─────────────────────────────────────────────

function PaperPhoto({ src, note, className = '', onClick, eager = false }: {
  src: string; note: string; className?: string; onClick?: () => void; eager?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      disabled={!onClick}
      aria-label={`Open memory: ${note}`}
      className={`group relative block bg-card p-2.5 pb-3 shadow-[0_7px_23px_-8px_#795e4c50] transition-transform duration-500 enabled:hover:rotate-0 enabled:hover:scale-[1.035] disabled:cursor-default md:p-3 ${className}`}
    >
      <span aria-hidden="true" className="absolute -top-3 left-1/2 z-10 h-7 w-20 -translate-x-1/2 -rotate-3 bg-[#e9d4af]/60 [clip-path:polygon(3%_0,100%_7%,96%_95%,0_100%)]" />
      <div className="aspect-[1.12] overflow-hidden bg-muted">
        <img src={src} alt={note} loading={eager ? 'eager' : 'lazy'} className="h-full w-full object-cover saturate-[.75] transition-transform duration-700 group-hover:scale-105" />
      </div>
      <span className="mt-3 block text-center font-hand text-[21px] leading-tight text-[#74604e] md:text-2xl">{note}</span>
    </button>
  );
}

function FlowerCluster({ className = '' }: { className?: string }) {
  return (
    <div aria-hidden="true" className={`pointer-events-none h-32 w-28 ${className}`}>
      <div className="absolute bottom-2 left-12 h-22 w-px -rotate-20 bg-[#96aa86]/60" />
      <div className="absolute bottom-2 left-13 h-26 w-px rotate-18 bg-[#96aa86]/60" />
      <span className="absolute bottom-10 left-8 h-3 w-7 -rotate-25 rounded-[100%_0_100%_0] bg-[#a7b893]/60" />
      <span className="absolute bottom-7 left-13 h-3 w-7 rotate-15 rounded-[0_100%_0_100%] bg-[#a7b893]/70" />
      <Flower2 strokeWidth={1} className="absolute left-3 top-6 size-12 -rotate-12 fill-[#f3d1d0]/60 text-[#c78c8c]/60" />
      <Flower2 strokeWidth={1} className="absolute left-13 top-1 size-11 rotate-12 fill-[#efd8c7]/60 text-[#c1a38f]/60" />
      <Flower2 strokeWidth={1} className="absolute left-15 top-13 size-7 fill-[#f5e8cd] text-[#c9b784]/70" />
    </div>
  );
}

function JourneyRoad({ count, mobile = false }: { count: number; mobile?: boolean }) {
  const roadRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: roadRef, offset: ['start 75%', 'end 70%'] });
  const reduced = useReducedMotion();
  const progress = useTransform(scrollYProgress, [0, 1], [0.025, 1]);
  const step = mobile ? 530 : 420;
  const node = mobile ? 323 : 200;
  const height = count * step + 150;
  let path = `M 500 0 C 500 65 500 ${node - 70} 500 ${node}`;
  for (let i = 0; i < count; i++) {
    const y = i * step + node;
    const side = i % 2 === 0 ? 860 : 140;
    if (i < count - 1)
      path += ` C 500 ${y + step * 0.28} ${side} ${y + step * 0.18} ${side} ${y + step * 0.5} C ${side} ${y + step * 0.82} 500 ${y + step * 0.73} 500 ${y + step}`;
    else
      path += ` C 500 ${y + 100} 500 ${y + 170} 500 ${height}`;
  }
  return (
    <div ref={roadRef} className={`pointer-events-none absolute inset-0 ${mobile ? 'md:hidden' : 'hidden md:block'}`}>
      <svg aria-hidden="true" viewBox={`0 0 1000 ${height}`} preserveAspectRatio="none"
        className={`pointer-events-none absolute inset-0 h-full w-full overflow-visible ${mobile ? 'md:hidden' : 'hidden md:block'}`}>
        <defs>
          <filter id={mobile ? 'road-shadow-mobile' : 'road-shadow'} x="-30%" y="-5%" width="160%" height="110%">
            <feDropShadow dx="0" dy="4" stdDeviation="5" floodColor="#c39995" floodOpacity=".12" />
          </filter>
        </defs>
        <path d={path} fill="none" stroke="#f5e4de" strokeWidth="48" strokeLinecap="round" opacity=".75" />
        <motion.path d={path} fill="none" stroke="#eccbc7" strokeWidth={mobile ? 65 : 42} strokeLinecap="round"
          filter={`url(#${mobile ? 'road-shadow-mobile' : 'road-shadow'})`}
          style={{ pathLength: reduced ? 1 : progress }} />
        <path d={path} fill="none" stroke="#fffaf4" strokeWidth="2.3" strokeDasharray="5 10" strokeLinecap="round" />
      </svg>
    </div>
  );
}

const NOTE_LABELS = [
  'where it all began ♡', 'just one more coffee', 'you, me & the sea',
  'our kind of magic', '365 days of choosing you', "let's get lost together", 'my always & forever',
];

function MemoryStop({ memory, index, onOpen, onVisible }: {
  memory: Memory; index: number; onOpen: () => void; onVisible: (i: number) => void;
}) {
  const reversed = index % 2 === 1;
  const Icon = categoryIcon(memory.category);
  const reduced = useReducedMotion();
  return (
    <motion.article
      id={`memory-${memory.id}`}
      initial={reduced ? false : { opacity: 0, y: 24, scale: 0.97 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.35 }}
      onViewportEnter={() => onVisible(index)}
      transition={{ duration: 0.8 }}
      className="relative grid min-h-[480px] grid-cols-2 items-center gap-4 px-4 sm:min-h-[530px] sm:gap-5 sm:px-6 md:min-h-[420px] md:gap-24 md:px-[12%]"
    >
      <div className={`relative z-10 col-span-2 mx-auto w-[190px] self-end sm:w-[230px] md:col-span-1 md:w-full md:max-w-[280px] md:self-center ${reversed ? 'translate-x-4 rotate-[3deg] sm:translate-x-8 md:col-start-2 md:row-start-1 md:translate-x-0' : '-translate-x-4 -rotate-[4deg] sm:-translate-x-8 md:translate-x-0'}`}>
        <PaperPhoto src={memory.coverPhoto} note={NOTE_LABELS[index % 7]} onClick={onOpen} />
        {memory.featured && (
          <span className={`absolute -bottom-2 ${reversed ? '-right-4' : '-left-4'} flex size-10 rotate-12 items-center justify-center rounded-full border border-[#b17b7360] bg-[#e8c1b3] text-[#8e605a] shadow-sm`}>
            <Heart className="size-5 fill-[#8e605a]/20" strokeWidth={1.2} />
          </span>
        )}
      </div>
      <button onClick={onOpen} aria-label={`Read ${memory.title}`}
        className="absolute left-1/2 top-[61%] z-20 flex size-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-[5px] border-background bg-[#b87880] text-white shadow-[0_0_0_1px_#e2b6b0] transition-transform hover:scale-110 md:top-[47.62%] md:size-12">
        <Icon className="size-5" strokeWidth={1.5} />
      </button>
      <div className={`relative z-10 col-span-2 mx-auto mb-6 max-w-[310px] self-end text-center md:col-span-1 md:mb-0 md:self-center md:text-left ${reversed ? 'md:col-start-1 md:row-start-1 md:pr-3' : 'md:pl-3'}`}>
        <p className="mb-3 text-[10px] font-semibold uppercase tracking-[.18em] text-primary">{dateLabel(memory.date)}</p>
        <button onClick={onOpen} className="group text-left">
          <h2 className="font-display text-[26px] leading-[1.15] sm:text-[34px] md:text-[39px]">
            {memory.title}
            <span className="ml-2 inline-block text-primary opacity-0 transition-opacity group-hover:opacity-100">↗</span>
          </h2>
        </button>
        <p className="mt-3 max-w-64 text-[13px] leading-[1.8] text-muted-foreground">{memory.caption}</p>
        <button onClick={onOpen} className="mt-4 inline-flex items-center gap-2 text-[10px] font-medium uppercase tracking-[.1em] text-primary transition-all hover:gap-3">
          Step into this memory <ArrowRight className="size-3.5" />
        </button>
      </div>
      {index % 3 === 0 && (
        <FlowerCluster className={`absolute hidden md:block ${reversed ? '-left-1 bottom-3 rotate-20' : '-right-3 bottom-8 -rotate-15'}`} />
      )}
    </motion.article>
  );
}

function MemoryModal({ items, selected, setSelected, onClose }: {
  items: Memory[]; selected: number; setSelected: (i: number) => void; onClose: () => void;
}) {
  const memory = items[selected];
  const [activePhoto, setActivePhoto] = useState(0);
  const [saved, setSaved] = useState(false);
  const dialogRef = useRef<HTMLDivElement>(null);
  const touchStart = useRef<{ x: number; y: number } | null>(null);
  const Icon = categoryIcon(memory.category);

  const changeMemory = (i: number) => { setSelected(i); setActivePhoto(0); setSaved(false); };

  useEffect(() => {
    const prev = document.activeElement as HTMLElement;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    dialogRef.current?.focus();
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') setActivePhoto(c => (c + 1) % memory.photos.length);
      if (e.key === 'ArrowLeft') setActivePhoto(c => (c - 1 + memory.photos.length) % memory.photos.length);
    };
    window.addEventListener('keydown', handleKey);
    return () => { document.body.style.overflow = prevOverflow; prev?.focus(); window.removeEventListener('keydown', handleKey); };
  }, [onClose, memory.photos.length]);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-end justify-center bg-[#493631]/35 backdrop-blur-md md:items-center md:p-8"
      onClick={onClose}>
      <motion.div ref={dialogRef} role="dialog" aria-modal="true" aria-labelledby="memory-title" tabIndex={-1}
        initial={{ y: 45, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 45, opacity: 0 }}
        transition={{ duration: 0.3 }} onClick={e => e.stopPropagation()}
        className="relative max-h-[96dvh] w-full max-w-[940px] overflow-y-auto rounded-t-3xl bg-background p-5 shadow-2xl outline-none md:rounded-xl md:p-10"
        onTouchStart={e => { touchStart.current = { x: e.touches[0].clientX, y: e.touches[0].clientY }; }}
        onTouchEnd={e => {
          if (!touchStart.current) return;
          const dx = e.changedTouches[0].clientX - touchStart.current.x;
          const dy = e.changedTouches[0].clientY - touchStart.current.y;
          if (dy > 120 && Math.abs(dx) < 70 && dialogRef.current?.scrollTop === 0) onClose();
          else if (Math.abs(dx) > 80 && Math.abs(dy) < 70) changeMemory(Math.max(0, Math.min(items.length - 1, selected + (dx < 0 ? 1 : -1))));
          touchStart.current = null;
        }}>
        <span className="mx-auto mb-5 block h-1 w-10 rounded-full bg-border md:hidden" />
        <button onClick={onClose} aria-label="Close memory" className="absolute right-3 top-3 z-10 flex size-11 items-center justify-center rounded-full bg-background/90 hover:bg-secondary">
          <X className="size-5" />
        </button>
        <div className="grid gap-7 md:grid-cols-[1.1fr_1fr] md:gap-10">
          <div>
            <div className="relative overflow-hidden bg-muted p-2.5 shadow-md">
              <img src={memory.photos[activePhoto] || memory.coverPhoto} alt={`${memory.title}, photo ${activePhoto + 1}`} className="aspect-[4/4.2] w-full object-cover" />
              <span className="absolute bottom-5 right-5 rounded-full bg-black/35 px-3 py-1 text-[11px] text-white">{activePhoto + 1} / {memory.photos.length}</span>
            </div>
            {memory.photos.length > 1 && (
              <div className="mt-4 flex gap-3">
                {memory.photos.map((src, i) => (
                  <button key={i} onClick={() => setActivePhoto(i)} aria-pressed={activePhoto === i}
                    className={`overflow-hidden rounded-sm border-2 p-1 transition-opacity ${activePhoto === i ? 'border-primary' : 'border-transparent opacity-65 hover:opacity-100'}`}>
                    <img src={src} alt={`Thumbnail ${i + 1}`} className="size-16 object-cover md:size-19" />
                  </button>
                ))}
              </div>
            )}
            <p className="mt-3 text-center font-hand text-2xl text-primary">{memory.caption}</p>
          </div>
          <div className="flex flex-col justify-center py-3">
            <span className="mb-5 inline-flex items-center gap-2 self-start rounded-full bg-secondary px-3 py-2 text-[10px] font-semibold uppercase tracking-[.12em] text-primary">
              <Icon className="size-3.5" /> {memory.category}
            </span>
            <p className="text-[11px] uppercase tracking-[.16em] text-muted-foreground">{dateLabel(memory.date)}</p>
            <h2 id="memory-title" className="mt-3 font-display text-3xl leading-[1.1] sm:text-4xl md:text-5xl">{memory.title}</h2>
            <p className="mt-6 text-sm leading-[1.95] text-muted-foreground">{memory.description}</p>
            {memory.location && (
              <p className="mt-6 flex items-center gap-2 text-xs text-primary"><MapPin className="size-4" />{memory.location}</p>
            )}
            <button onClick={() => setSaved(!saved)} aria-pressed={saved} className="mt-6 flex items-center gap-2 self-start text-xs text-primary">
              {saved ? <Check className="size-4" /> : <Heart className="size-4" />}
              {saved ? 'A moment to keep forever' : 'Keep this moment close'}
            </button>
            <div className="mt-9 flex items-center justify-between border-t border-border pt-5">
              <button disabled={selected === 0} onClick={() => changeMemory(selected - 1)} className="flex min-h-11 items-center gap-2 text-xs text-primary disabled:opacity-30">
                <ArrowLeft className="size-4" /> Previous
              </button>
              <span className="text-[10px] text-muted-foreground">{selected + 1} / {items.length}</span>
              <button disabled={selected === items.length - 1} onClick={() => changeMemory(selected + 1)} className="flex min-h-11 items-center gap-2 text-xs text-primary disabled:opacity-30">
                Next <ArrowRight className="size-4" />
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

function MusicPlayer({ musicUrl }: { musicUrl?: string }) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const [time, setTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.25);
  const [expanded, setExpanded] = useState(false);
  const [error, setError] = useState(false);
  const src = musicUrl || '';

  useEffect(() => { if (audioRef.current) audioRef.current.volume = volume; }, [volume]);

  if (!src) return null;

  const toggle = async () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (playing) { audio.pause(); setPlaying(false); }
    else { try { await audio.play(); setPlaying(true); setError(false); } catch { setError(true); } }
  };

  return (
    <div className="fixed bottom-4 left-1/2 z-40 w-[278px] -translate-x-1/2 rounded-xl border border-[#e7dbcf] bg-card/95 p-3 shadow-[0_4px_24px_#7c584518] backdrop-blur-xl md:bottom-6 md:left-auto md:right-7 md:translate-x-0">
      <audio ref={audioRef} src={src} preload="none"
        onTimeUpdate={() => setTime(audioRef.current?.currentTime || 0)}
        onLoadedMetadata={() => setDuration(audioRef.current?.duration || 0)}
        onEnded={() => setPlaying(false)} onError={() => setError(true)} />
      <div className="flex items-center gap-3">
        <div className="flex size-10 items-center justify-center rounded-md bg-secondary text-primary">
          <Music2 className="size-5" />
        </div>
        <div className="flex-1">
          <p className="flex items-center gap-1.5 text-[11px] font-semibold">Our song <Music2 className="size-3 text-primary" /></p>
          <p className="mt-0.5 text-[9px] text-muted-foreground">{error ? 'Audio unavailable.' : 'A melody for two'}</p>
        </div>
        <button onClick={toggle} aria-label={playing ? 'Pause' : 'Play'} className="flex size-9 shrink-0 items-center justify-center rounded-full bg-secondary text-primary hover:bg-[#f0d1dc]">
          {playing ? <Pause className="size-3.5 fill-current" /> : <Play className="ml-0.5 size-3.5 fill-current" />}
        </button>
        <button onClick={() => setExpanded(!expanded)} className="flex size-6 items-center justify-center text-muted-foreground">
          <ChevronDown className={`size-3.5 transition-transform ${expanded ? 'rotate-180' : ''}`} />
        </button>
      </div>
      <input type="range" aria-label="Progress" min="0" max={duration || 1} step=".1" value={time}
        onChange={e => { if (audioRef.current && duration) audioRef.current.currentTime = Number(e.target.value); setTime(Number(e.target.value)); }}
        className="mt-2 block h-1 w-full cursor-pointer accent-[#ac7486]" />
      {expanded && (
        <div className="mt-3 flex items-center gap-3 border-t border-border pt-3">
          <button onClick={() => setVolume(volume ? 0 : 0.25)} aria-label={volume ? 'Mute' : 'Unmute'}>
            {volume ? <Volume2 className="size-4 text-primary" /> : <VolumeX className="size-4 text-primary" />}
          </button>
          <input type="range" min="0" max="1" step=".01" value={volume} onChange={e => setVolume(Number(e.target.value))} className="h-1 w-full accent-[#ac7486]" />
          <span className="text-[9px] text-muted-foreground">{Math.round(volume * 100)}%</span>
        </div>
      )}
    </div>
  );
}

// ── Main Component ─────────────────────────────────────────────

export default function TemplateAnniversaryJourney({ storyData }: { storyData: StoryData }) {
  const items = useMemo(() => mapStoryDataToMemories(storyData).sort((a, b) => a.date.localeCompare(b.date)), [storyData]);
  const [selected, setSelected] = useState<number | null>(null);
  const [seen, setSeen] = useState(0);
  const [letterOpen, setLetterOpen] = useState(false);
  const reduced = useReducedMotion();

  const partnerA = storyData.hero_block.partner_a.name;
  const partnerB = storyData.hero_block.partner_b.name;
  const title = storyData.hero_block.title || `${partnerA} & ${partnerB}`;
  const quote = storyData.hero_block.short_quote || 'a little love. a lot of memories.';
  const startDate = storyData.counter_block?.target_date || items[0]?.date || '';
  const endDate = items[items.length - 1]?.date || '';
  const daysTogether = startDate && endDate
    ? Math.abs(Math.round((new Date(endDate).getTime() - new Date(startDate).getTime()) / 86400000))
    : 0;
  const musicUrl = storyData.global_config?.background_music_url;
  const loveLetter = storyData.letter_block;

  return (
    <div className="relative overflow-x-clip bg-[#fff9f3] text-[#51413e]"
      style={{ fontFamily: '"DM Sans", sans-serif' }}>

      {/* Google Fonts */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,wght@0,400;0,500;0,600;1,400&family=Instrument+Serif:ital@0;1&family=Gochi+Hand&display=swap');
        .font-display { font-family: 'Instrument Serif', Georgia, serif; }
        .font-hand { font-family: 'Gochi Hand', cursive; }
        .text-primary { color: #a95671; }
        .bg-primary { background-color: #a95671; }
        .border-primary { border-color: #a95671; }
        .bg-secondary { background-color: #f8e6e9; }
        .bg-card { background-color: #fffdf9; }
        .bg-background { background-color: #fff9f3; }
        .bg-muted { background-color: #f1e9e1; }
        .text-muted-foreground { color: #81706a; }
        .border-border { border-color: #eaddd4; }
        .bg-secondary\/5 { background-color: rgba(248,230,233,0.05); }
      `}</style>

      {/* Paper grain overlay */}
      <svg className="pointer-events-none fixed inset-0 z-30 h-full w-full opacity-[.035]" aria-hidden="true">
        <filter id="paper-grain">
          <feTurbulence type="fractalNoise" baseFrequency=".8" numOctaves="3" stitchTiles="stitch" />
        </filter>
        <rect width="100%" height="100%" filter="url(#paper-grain)" opacity=".65" />
      </svg>

      {/* Header */}
      <header className="relative z-20 mx-auto flex h-22 max-w-[1280px] items-center justify-between border-b border-[#eaddd4]/65 px-6 md:mx-12 md:px-0 xl:mx-auto">
        <div className="flex items-center gap-2.5">
          <span className="flex size-8 rotate-[-8deg] items-center justify-center rounded-full border border-[#c7898c]/50 text-[#a95671]">
            <Heart className="size-4" strokeWidth={1.5} />
          </span>
          <span className="font-display text-[20px] truncate max-w-[45vw] sm:max-w-none sm:text-[25px]">{title}<span className="text-[#a95671]">.</span></span>
        </div>
        <nav className="flex items-center gap-7 text-[11px] text-[#81706a] md:gap-9">
          <a href="#journey" className="hidden transition-colors hover:text-[#a95671] sm:block">Our journey</a>
          {loveLetter?.is_enabled && (
            <button onClick={() => { setLetterOpen(true); document.getElementById('forever')?.scrollIntoView({ behavior: reduced ? 'instant' : 'smooth' }); }}
              className="hidden transition-colors hover:text-[#a95671] sm:block">A little love note</button>
          )}
          <span className="flex items-center gap-2 rounded-full border border-[#e6d5cd] px-3.5 py-2 text-[10px] text-[#a95671]">
            <Heart className="size-3" strokeWidth={1.5} /> Made of us
          </span>
        </nav>
      </header>

      <main>
        {/* Hero */}
        <section className="relative mx-auto flex min-h-[660px] max-w-[1280px] flex-col items-center px-5 pb-28 pt-15 md:min-h-[595px] md:pt-14">
          <div className="pointer-events-none absolute left-1/2 top-10 h-[440px] w-[700px] max-w-full -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse,#f4e1da55_0%,transparent_67%)]" />
          <motion.div initial={reduced ? false : { opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }} className="relative z-10 text-center">
            <p className="mb-5 flex items-center justify-center gap-3 text-[10px] font-semibold uppercase tracking-[.28em] text-[#a95671]">
              <span className="h-px w-7 bg-[#d8aaa6]" /> Our love story <span className="h-px w-7 bg-[#d8aaa6]" />
            </p>
            <h1 className="font-display text-[clamp(40px,11vw,76px)] leading-[1.03] md:text-[88px] lg:text-[112px]">
              {title.split('&').length > 1 ? (
                <>{title.split('&')[0]}<span className="relative inline-block italic text-[#a95671]">&amp; {title.split('&')[1]}
                  <Heart className="absolute -right-7 -top-1 size-5 rotate-18 text-[#c18184] md:-right-9 md:top-2 md:size-6" strokeWidth={1.2} />
                </span></>
              ) : (
                <span className="relative inline-block italic text-[#a95671]">{title}
                  <Heart className="absolute -right-7 -top-1 size-5 rotate-18 text-[#c18184]" strokeWidth={1.2} />
                </span>
              )}
            </h1>
            <p className="mt-5 px-2 font-hand text-[20px] text-[#a37d66] sm:text-[24px] md:text-[27px]">{quote}</p>
            {startDate && endDate && (
              <p className="mt-6 text-[10px] font-medium tracking-[.18em] text-[#8a7770]">
                {startDate.split('-').reverse().join('.')} <span className="mx-3 text-[#b78d8d]">—</span> {endDate.split('-').reverse().join('.')}
              </p>
            )}
            <a href="#journey" className="mt-7 inline-flex items-center gap-3 rounded-full border border-[#dbb6b3] bg-[#fffdf9]/60 px-5 py-3 text-[11px] text-[#a95671] transition-all hover:bg-[#f8e6e9] hover:shadow-sm">
              Walk down memory lane <ArrowDown className="size-3.5" />
            </a>
          </motion.div>
          {items[0] && (
            <motion.div initial={reduced ? false : { opacity: 0, rotate: -12, y: 20 }} animate={{ opacity: 1, rotate: -9, y: 0 }} transition={{ delay: 0.3, duration: 1 }}
              className="absolute left-2 top-[405px] z-10 w-[110px] sm:left-5 sm:w-[140px] md:left-[2%] md:top-35 md:w-[160px] lg:left-[6%] lg:top-28 lg:w-[206px]">
              <PaperPhoto src={items[0].coverPhoto} note="my favorite person ♡" eager onClick={() => setSelected(0)} />
            </motion.div>
          )}
          {items[2] && (
            <motion.div initial={reduced ? false : { opacity: 0, rotate: 13, y: 20 }} animate={{ opacity: 1, rotate: 9, y: 0 }} transition={{ delay: 0.5, duration: 1 }}
              className="absolute right-2 top-[432px] z-10 w-[105px] sm:right-5 sm:w-[135px] md:right-[2%] md:top-40 md:w-[150px] lg:right-[7%] lg:top-33 lg:w-[195px]">
              <PaperPhoto src={items[Math.min(2, items.length - 1)].coverPhoto} note="our kind of forever" eager onClick={() => setSelected(Math.min(2, items.length - 1))} />
              <Heart aria-hidden="true" className="absolute -left-7 -top-5 size-8 -rotate-25 text-[#bf8b81]/60" strokeWidth={1} />
            </motion.div>
          )}
          <FlowerCluster className="absolute -left-7 bottom-13 hidden -rotate-15 opacity-80 md:block md:left-2" />
        </section>

        {/* Journey */}
        {items.length > 0 && (
          <section id="journey" aria-label="Our love journey" className="relative mx-auto max-w-[1080px] scroll-mt-12">
            <div className="absolute -top-8 left-1/2 z-20 -translate-x-1/2 text-center">
              <span className="mx-auto flex size-10 items-center justify-center rounded-full border-4 border-[#fff9f3] bg-[#b57c7f] text-white">
                <Heart className="size-4 fill-white/25" />
              </span>
              <p className="mt-2 whitespace-nowrap text-[8px] font-semibold tracking-[.2em] text-[#a95671]">OUR STORY BEGINS</p>
            </div>
            <div className="relative pb-[150px]">
              <JourneyRoad count={items.length} />
              <JourneyRoad count={items.length} mobile />
              {items.map((memory, index) => (
                <MemoryStop key={memory.id} memory={memory} index={index}
                  onOpen={() => setSelected(index)}
                  onVisible={i => setSeen(c => Math.max(c, i + 1))} />
              ))}
              <div className="absolute bottom-0 left-1/2 flex size-16 -translate-x-1/2 translate-y-1/2 items-center justify-center rounded-full border-[7px] border-[#fff9f3] bg-[#a9b9a0] text-white shadow-sm">
                <Home strokeWidth={1.3} className="size-6" />
              </div>
            </div>
          </section>
        )}

        {/* Forever */}
        <section id="forever" className="relative mx-auto max-w-[1000px] px-6 pb-24 pt-17 text-center">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,#f6e2e333_0%,transparent_65%)]" />
          <h2 className="relative mt-4 font-display text-3xl sm:text-5xl md:text-6xl">Look how far we've come.</h2>
          <div className="relative mt-7 flex items-center justify-center gap-4 text-[10px] text-[#81706a] sm:gap-7">
            <span>
              <strong className="block font-display text-2xl font-normal text-[#a95671] sm:text-3xl">{daysTogether}</strong>
              <span className="mt-1 block uppercase tracking-[.12em]">Days together</span>
            </span>
            <span className="h-8 w-px bg-[#eaddd4]" />
            <span>
              <strong className="block font-display text-2xl font-normal text-[#a95671] sm:text-3xl">{items.length}</strong>
              <span className="mt-1 block uppercase tracking-[.12em]">Precious memories</span>
            </span>
            <span className="h-8 w-px bg-[#eaddd4]" />
            <span>
              <strong className="block font-display text-2xl font-normal text-[#a95671] sm:text-3xl">∞</strong>
              <span className="mt-1 block uppercase tracking-[.12em]">Still to make</span>
            </span>
          </div>
          <Heart aria-hidden="true" className="relative mx-auto mt-12 size-6 text-[#bf8b91]" strokeWidth={1.2} />
          <p className="relative mt-5 font-display text-[24px] leading-[1.25] italic sm:text-[35px] md:text-[46px]">
            And I still want to walk<br />every road with you.
          </p>
          {loveLetter?.is_enabled && loveLetter.content && (
            <>
              <button onClick={() => setLetterOpen(!letterOpen)} aria-expanded={letterOpen}
                className="relative mt-7 border-b border-[#c9a198] pb-1 text-[11px] text-[#81706a]">
                {letterOpen ? 'Fold our little love note' : 'A little love note, just for you'}
              </button>
              <AnimatePresence>
                {letterOpen && (
                  <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}
                    className="relative mx-auto max-w-md overflow-hidden">
                    <p className="my-7 bg-[#fffdf9] p-7 font-hand text-2xl leading-relaxed text-[#8f6f61] shadow-sm">
                      {loveLetter.content}
                      {loveLetter.signature && <span className="mt-4 block text-[#a95671]">{loveLetter.signature}</span>}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </>
          )}
          <FlowerCluster className="absolute bottom-26 left-2 hidden -rotate-20 md:block" />
          <FlowerCluster className="absolute bottom-26 right-2 hidden rotate-15 md:block" />
        </section>
      </main>

      <footer className="mx-auto flex max-w-[1280px] items-center justify-center border-t border-[#eaddd4] px-6 pb-20 pt-7 text-[10px] text-[#81706a] md:justify-between md:pb-10">
        <span>Made with love. Kept forever.</span>
        <span className="hidden items-center gap-1.5 md:flex">
          Two hearts. One story. <Heart className="size-3 text-[#a95671]" />
        </span>
      </footer>

      {/* Journey progress */}
      {items.length > 0 && (
        <div className="fixed bottom-7 left-8 z-30 hidden items-center gap-3 rounded-full border border-[#eaddd4] bg-[#fff9f3]/90 px-4 py-3 backdrop-blur-md lg:flex">
          <span className="flex size-6 items-center justify-center rounded-full bg-[#f8e6e9]">
            <Heart className="size-3 text-[#a95671]" />
          </span>
          <div>
            <p className="text-[8px] font-semibold uppercase tracking-[.16em] text-[#81706a]">Our journey</p>
            <p className="mt-1 text-[10px] text-[#a95671]">
              {String(seen).padStart(2, '0')} <span className="text-[#81706a]">/ {String(items.length).padStart(2, '0')} memories</span>
            </p>
            <div className="ml-1 flex gap-1.5">
              {items.slice(0, 12).map((memory, i) => (
                <a href={`#memory-${memory.id}`} key={memory.id} aria-label={`Jump to ${memory.title}`}
                  className={`size-1.5 rounded-full transition-colors ${i < seen ? 'bg-[#a95671]' : 'bg-[#dfcfc3]'}`} />
              ))}
            </div>
          </div>
        </div>
      )}

      <MusicPlayer musicUrl={musicUrl} />

      <AnimatePresence>
        {selected !== null && items[selected] && (
          <MemoryModal items={items} selected={selected} setSelected={setSelected} onClose={() => setSelected(null)} />
        )}
      </AnimatePresence>
    </div>
  );
}
