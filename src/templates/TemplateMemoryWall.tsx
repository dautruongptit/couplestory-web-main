import { useState, useEffect, useMemo, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import type { StoryData } from '@/data/mockScenarios';

// ── Types ──────────────────────────────────────────────────

type MemoryCategory = 'ALL' | 'FIRST_DATE' | 'TRAVEL' | 'BIRTHDAY' | 'ANNIVERSARY' | 'SPECIAL' | 'EVERYDAY';

const CATEGORY_INFO: Record<Exclude<MemoryCategory, 'ALL'>, { label: string; emoji: string }> = {
  FIRST_DATE:  { label: 'First Date',  emoji: '❤️' },
  TRAVEL:      { label: 'Travel',      emoji: '✈️' },
  BIRTHDAY:    { label: 'Birthday',    emoji: '🎂' },
  ANNIVERSARY: { label: 'Anniversary', emoji: '💍' },
  SPECIAL:     { label: 'Special',     emoji: '🌸' },
  EVERYDAY:    { label: 'Everyday',    emoji: '☕' },
};

interface Memory {
  id: string;
  title: string;
  date: string;
  displayDate: string;
  year: number;
  description: string;
  location?: string;
  category: Exclude<MemoryCategory, 'ALL'>;
  coverPhoto: string;
  photos: string[];
  caption: string;
  featured?: boolean;
  layout: {
    rotation: number;
    offsetY: number;
    annotation?: string;
    annotationSide?: 'left' | 'right';
    decorationType: 'tape-h' | 'tape-v' | 'pin' | 'none';
    photoHeight: number;
  };
}

// ── Data conversion ────────────────────────────────────────

const CATEGORY_CYCLE: Exclude<MemoryCategory, 'ALL'>[] = ['SPECIAL', 'EVERYDAY', 'TRAVEL', 'ANNIVERSARY', 'FIRST_DATE', 'BIRTHDAY'];
const DECO_CYCLE: ('tape-h' | 'tape-v' | 'pin' | 'none')[] = ['tape-h', 'pin', 'tape-v', 'none'];
const HEIGHTS = [240, 200, 210, 250, 200, 180, 220, 210, 230, 190];
const ROTATIONS = [-4, 3, -2, 5, -3, 4, -5, 2, -2, 3, 4, -3];
const OFFSETS = [20, 0, 40, 0, 20, 60, 0, 30, 0, 50, 10, 20];

function formatDisplayDate(dateStr: string): string {
  try {
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) return dateStr;
    return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
  } catch {
    return dateStr;
  }
}

function storyDataToMemories(data: StoryData): Memory[] {
  const memories: Memory[] = [];

  if (data.timeline_block.is_enabled) {
    data.timeline_block.events.forEach((ev, i) => {
      const year = ev.date ? new Date(ev.date).getFullYear() : new Date().getFullYear();
      memories.push({
        id: ev.id || `timeline-${i}`,
        title: ev.title,
        date: ev.date,
        displayDate: formatDisplayDate(ev.date),
        year: isNaN(year) ? new Date().getFullYear() : year,
        description: ev.description,
        category: CATEGORY_CYCLE[i % CATEGORY_CYCLE.length],
        coverPhoto: ev.media_url || 'https://images.unsplash.com/photo-1591969851586-adbbd4accf81?w=560&h=720&fit=crop&auto=format&q=80',
        photos: ev.media_url ? [ev.media_url] : [],
        caption: ev.title,
        featured: i === 0 || i === 3,
        layout: {
          rotation: ROTATIONS[i % ROTATIONS.length],
          offsetY: OFFSETS[i % OFFSETS.length],
          annotation: i % 2 === 0 ? ev.title.slice(0, 20) + (ev.title.length > 20 ? '…' : '') + ' ✨' : undefined,
          annotationSide: i % 2 === 0 ? 'right' : 'left',
          decorationType: DECO_CYCLE[i % DECO_CYCLE.length],
          photoHeight: HEIGHTS[i % HEIGHTS.length],
        },
      });
    });
  }

  if (data.gallery_block.is_enabled) {
    data.gallery_block.images.forEach((img, i) => {
      const idx = memories.length;
      memories.push({
        id: `gallery-${i}`,
        title: img.caption || `Khoảnh khắc #${i + 1}`,
        date: '',
        displayDate: '',
        year: new Date().getFullYear(),
        description: img.caption || '',
        category: CATEGORY_CYCLE[(idx) % CATEGORY_CYCLE.length],
        coverPhoto: img.url,
        photos: [img.url],
        caption: img.caption || '💕',
        layout: {
          rotation: ROTATIONS[idx % ROTATIONS.length],
          offsetY: OFFSETS[idx % OFFSETS.length],
          annotation: i % 3 === 0 ? '💕' : undefined,
          annotationSide: i % 2 === 0 ? 'left' : 'right',
          decorationType: DECO_CYCLE[idx % DECO_CYCLE.length],
          photoHeight: HEIGHTS[idx % HEIGHTS.length],
        },
      });
    });
  }

  return memories;
}

function getDaysTogether(targetDate: string): number {
  if (!targetDate) return 0;
  return Math.floor(Math.abs(Date.now() - new Date(targetDate).getTime()) / 86_400_000);
}

function getYearsTogether(targetDate: string): number {
  return Math.floor(getDaysTogether(targetDate) / 365);
}

// ── Scoped CSS ─────────────────────────────────────────────

const SCOPED_CSS = `
@keyframes mw-heartPop {
  0%   { transform: scale(0) rotate(-20deg); opacity: 0; }
  65%  { transform: scale(1.4) rotate(8deg);  opacity: 1; }
  100% { transform: scale(1) rotate(0deg);   opacity: 1; }
}
@keyframes mw-floatParticle {
  0%   { transform: translateY(0) rotate(0deg) scale(1); opacity: 0; }
  8%   { opacity: 0.7; }
  92%  { opacity: 0.2; }
  100% { transform: translateY(-95vh) rotate(540deg) scale(0.4); opacity: 0; }
}
@keyframes mw-overlayIn {
  from { opacity: 0; }
  to   { opacity: 1; }
}
@keyframes mw-detailIn {
  from { opacity: 0; transform: translateY(36px) scale(0.95); }
  to   { opacity: 1; transform: translateY(0) scale(1); }
}
@keyframes mw-photoIn {
  from { opacity: 0; transform: translateX(14px); }
  to   { opacity: 1; transform: translateX(0); }
}
@keyframes mw-gentleFloat {
  0%, 100% { transform: translateY(0px); }
  50%      { transform: translateY(-6px); }
}
@keyframes mw-spin {
  from { transform: rotate(0deg); }
  to   { transform: rotate(360deg); }
}
@keyframes mw-pulseSoft {
  0%, 100% { opacity: 0.6; }
  50%      { opacity: 1; }
}
.mw-heart-pop    { animation: mw-heartPop 0.4s cubic-bezier(0.34,1.56,0.64,1) forwards; }
.mw-overlay-in   { animation: mw-overlayIn 0.28s ease forwards; }
.mw-detail-in    { animation: mw-detailIn 0.42s cubic-bezier(0.34,1.56,0.64,1) forwards; }
.mw-photo-in     { animation: mw-photoIn 0.3s ease forwards; }
.mw-gentle-float { animation: mw-gentleFloat 4s ease-in-out infinite; }
.mw-spin-slow    { animation: mw-spin 3.5s linear infinite; }
.mw-pulse-soft   { animation: mw-pulseSoft 2s ease-in-out infinite; }

.mw-wall-bg {
  min-height: 100vh;
  background-color: #FFF8F2;
  background-image:
    radial-gradient(ellipse 480px 360px at 8% 18%, rgba(248,221,232,0.38) 0%, transparent 70%),
    radial-gradient(ellipse 360px 480px at 88% 12%, rgba(243,182,198,0.22) 0%, transparent 70%),
    radial-gradient(ellipse 420px 320px at 92% 82%, rgba(248,221,232,0.28) 0%, transparent 70%),
    radial-gradient(ellipse 300px 420px at 12% 88%, rgba(169,188,165,0.12) 0%, transparent 70%),
    repeating-linear-gradient(45deg, rgba(125,101,92,0.018) 0px, transparent 1px, transparent 9px),
    repeating-linear-gradient(-45deg, rgba(125,101,92,0.018) 0px, transparent 1px, transparent 9px);
}
.mw-polaroid {
  background: #FFFDF9;
  position: relative;
  user-select: none;
}
.mw-tape {
  position: absolute;
  width: 64px;
  height: 22px;
  background: rgba(255,225,170,0.78);
  border-left: 1px solid rgba(210,165,95,0.18);
  border-right: 1px solid rgba(210,165,95,0.18);
  mix-blend-mode: multiply;
}
.mw-tape::before {
  content: '';
  position: absolute;
  inset: 0;
  background: repeating-linear-gradient(90deg, transparent 0px, transparent 3px, rgba(200,155,85,0.12) 3px, rgba(200,155,85,0.12) 4px);
}
.mw-wall-columns { column-count: 3; column-gap: 0; }
@media (max-width: 800px) { .mw-wall-columns { column-count: 2 !important; } }
@media (max-width: 500px) { .mw-wall-columns { column-count: 1 !important; } }
.mw-music-player {
  backdrop-filter: blur(18px) saturate(160%);
  -webkit-backdrop-filter: blur(18px) saturate(160%);
}
.mw-filter-tab {
  font-family: 'Dancing Script', cursive;
  font-weight: 600;
  transition: all 0.22s ease;
  white-space: nowrap;
}
.mw-scrollbar::-webkit-scrollbar { width: 5px; }
.mw-scrollbar::-webkit-scrollbar-track { background: transparent; }
.mw-scrollbar::-webkit-scrollbar-thumb { background: rgba(233,138,175,0.3); border-radius: 4px; }
.mw-scrollbar::-webkit-scrollbar-thumb:hover { background: rgba(184,92,122,0.5); }
`;

// ── MemoryBackground ───────────────────────────────────────

const SYMBOLS = ['❤️', '🌸', '✨', '💕', '🌷', '💖'];

function MemoryBackground() {
  const particles = useMemo(() =>
    Array.from({ length: 12 }, (_, i) => ({
      id: i,
      x: Math.random() * 96 + 2,
      delay: Math.random() * 20,
      duration: 14 + Math.random() * 10,
      size: 0.7 + Math.random() * 0.9,
      symbol: SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)],
    })),
  []);

  return (
    <div aria-hidden="true" style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0, overflow: 'hidden' }}>
      {particles.map((p) => (
        <span
          key={p.id}
          style={{
            position: 'absolute',
            left: `${p.x}%`,
            bottom: '-60px',
            fontSize: `${p.size}rem`,
            opacity: 0,
            animation: `mw-floatParticle ${p.duration}s ${p.delay}s ease-in-out infinite`,
          }}
        >
          {p.symbol}
        </span>
      ))}
      <svg style={{ position: 'absolute', top: 80, left: 40, opacity: 0.12 }} width="60" height="60" viewBox="0 0 60 60" fill="none">
        <path d="M10 50 Q20 10 50 10" stroke="#B85C7A" strokeWidth="2" strokeLinecap="round" strokeDasharray="4 4" />
      </svg>
      <svg style={{ position: 'absolute', bottom: 160, right: 60, opacity: 0.1 }} width="50" height="50" viewBox="0 0 50 50" fill="none">
        <circle cx="25" cy="25" r="20" stroke="#E98AAF" strokeWidth="1.5" strokeDasharray="3 3" />
      </svg>
      <svg style={{ position: 'absolute', top: '40%', right: 20, opacity: 0.1 }} width="40" height="60" viewBox="0 0 40 60" fill="none">
        <path d="M20 5 C20 5 35 20 20 35 C5 50 20 55 20 55" stroke="#B85C7A" strokeWidth="2" strokeLinecap="round" />
      </svg>
    </div>
  );
}

// ── Tape & PushPin ─────────────────────────────────────────

function Tape({ variant }: { variant: 'tape-h' | 'tape-v' }) {
  if (variant === 'tape-h') {
    return (
      <div className="mw-tape" style={{ position: 'absolute', top: -10, left: '50%', transform: 'translateX(-50%) rotate(-1.5deg)', zIndex: 10 }} />
    );
  }
  return (
    <>
      <div className="mw-tape" style={{ position: 'absolute', top: -8, left: '14px', transform: 'rotate(-12deg)', width: 44, zIndex: 10 }} />
      <div className="mw-tape" style={{ position: 'absolute', top: -8, right: '14px', transform: 'rotate(12deg)', width: 44, zIndex: 10 }} />
    </>
  );
}

function PushPin() {
  return (
    <div style={{ position: 'absolute', top: -14, left: '50%', transform: 'translateX(-50%)', zIndex: 10, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <div style={{ width: 17, height: 17, borderRadius: '50%', background: 'radial-gradient(circle at 38% 35%, #F3B6C6, #B85C7A)', boxShadow: '0 2px 7px rgba(0,0,0,0.28), inset 0 1px 2px rgba(255,255,255,0.35)' }} />
      <div style={{ width: 2, height: 9, background: 'rgba(90,65,55,0.55)', marginTop: -2 }} />
    </div>
  );
}

// ── PolaroidMemory ─────────────────────────────────────────

function PolaroidMemory({ memory, onClick }: { memory: Memory; onClick: () => void }) {
  const [hovered, setHovered] = useState(false);
  const { layout } = memory;

  const cardTransform = hovered
    ? 'rotate(0deg) translateY(-14px) scale(1.045)'
    : `rotate(${layout.rotation}deg) translateY(0px) scale(1)`;
  const cardShadow = hovered
    ? '8px 22px 55px rgba(61,44,44,0.24), 0 6px 18px rgba(184,92,122,0.2)'
    : '3px 5px 16px rgba(61,44,44,0.13), 0 1px 4px rgba(61,44,44,0.07)';

  return (
    <div style={{ position: 'relative', paddingTop: 20, paddingBottom: 10, paddingLeft: layout.annotation ? 24 : 8, paddingRight: layout.annotation ? 24 : 8 }}>
      {layout.decorationType === 'tape-h' && <Tape variant="tape-h" />}
      {layout.decorationType === 'tape-v' && <Tape variant="tape-v" />}
      {layout.decorationType === 'pin' && <PushPin />}

      <div
        className="mw-polaroid"
        onClick={onClick}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{ transform: cardTransform, boxShadow: cardShadow, transition: 'transform 0.36s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.36s ease', cursor: 'pointer', borderRadius: 2 }}
      >
        <div style={{ padding: '9px 9px 0' }}>
          <img src={memory.coverPhoto} alt={memory.title} loading="lazy" style={{ width: '100%', height: layout.photoHeight, objectFit: 'cover', display: 'block', backgroundColor: '#F3B6C6' }} />
        </div>
        <div style={{ padding: '10px 12px 16px' }}>
          <p style={{ fontFamily: "'Dancing Script', cursive", fontSize: '0.92rem', color: '#3D2C2C', margin: 0, lineHeight: 1.35 }}>{memory.caption}</p>
          {memory.displayDate && (
            <p style={{ fontFamily: "'Nunito Sans', sans-serif", fontSize: '0.67rem', color: '#7D655C', margin: '5px 0 0', letterSpacing: '0.04em', opacity: 0.75 }}>{memory.displayDate}</p>
          )}
        </div>
        {hovered && (
          <span className="mw-heart-pop" style={{ position: 'absolute', bottom: -10, right: 14, fontSize: '1.1rem', pointerEvents: 'none' }}>❤️</span>
        )}
      </div>

      {layout.annotation && (
        <span
          style={{
            position: 'absolute',
            [layout.annotationSide === 'right' ? 'right' : 'left']: -4,
            bottom: 28,
            transform: layout.annotationSide === 'right' ? 'rotate(7deg)' : 'rotate(-7deg)',
            fontFamily: "'Parisienne', cursive",
            fontSize: '0.82rem',
            color: '#B85C7A',
            opacity: hovered ? 1 : 0.65,
            transition: 'opacity 0.3s ease',
            whiteSpace: 'nowrap',
            pointerEvents: 'none',
            userSelect: 'none',
            zIndex: 5,
          }}
        >
          {layout.annotation}
        </span>
      )}
    </div>
  );
}

// ── MemoryFilter ───────────────────────────────────────────

function MemoryFilter({ activeCategory, activeYear, onCategoryChange, onYearChange, memories }: {
  activeCategory: MemoryCategory;
  activeYear: number | 'all';
  onCategoryChange: (c: MemoryCategory) => void;
  onYearChange: (y: number | 'all') => void;
  memories: Memory[];
}) {
  const years = [...new Set(memories.map((m) => m.year))].sort();
  const categories: MemoryCategory[] = ['ALL', ...([...new Set(memories.map((m) => m.category))] as MemoryCategory[])];
  const countFor = (cat: MemoryCategory) => cat === 'ALL' ? memories.length : memories.filter((m) => m.category === cat).length;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px', padding: '0 1.5rem 1.5rem' }}>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', justifyContent: 'center' }}>
        {categories.map((cat) => {
          const active = activeCategory === cat;
          const info = cat !== 'ALL' ? CATEGORY_INFO[cat] : null;
          const label = cat === 'ALL' ? 'All Memories' : info!.label;
          const emoji = cat === 'ALL' ? '📸' : info!.emoji;
          return (
            <button
              key={cat}
              onClick={() => onCategoryChange(cat)}
              className="mw-filter-tab"
              style={{
                padding: '6px 16px', borderRadius: 20,
                border: active ? '2px solid #B85C7A' : '1.5px solid rgba(184,92,122,0.25)',
                background: active ? '#B85C7A' : 'rgba(255,255,255,0.55)',
                color: active ? '#FFFDF9' : '#7D655C',
                fontSize: '0.88rem', cursor: 'pointer',
                display: 'flex', alignItems: 'center', gap: '5px',
                boxShadow: active ? '0 2px 12px rgba(184,92,122,0.28)' : 'none',
                backdropFilter: 'blur(6px)', WebkitBackdropFilter: 'blur(6px)',
              }}
            >
              <span style={{ fontSize: '0.82em' }}>{emoji}</span>
              <span>{label}</span>
              <span style={{ fontSize: '0.72rem', opacity: 0.75, marginLeft: 2, fontFamily: "'Nunito Sans', sans-serif", fontWeight: 600 }}>{countFor(cat)}</span>
            </button>
          );
        })}
      </div>
      {years.length > 1 && (
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          <span style={{ fontFamily: "'Nunito Sans', sans-serif", fontSize: '0.72rem', color: '#7D655C', opacity: 0.7, letterSpacing: '0.06em', textTransform: 'uppercase' as const }}>Year</span>
          {(['all', ...years] as (number | 'all')[]).map((y) => {
            const active = activeYear === y;
            return (
              <button
                key={String(y)}
                onClick={() => onYearChange(y)}
                style={{
                  fontFamily: "'Dancing Script', cursive", fontWeight: 600, fontSize: '0.9rem',
                  padding: '3px 12px', borderRadius: 14,
                  border: active ? '1.5px solid #B85C7A' : '1.5px solid rgba(184,92,122,0.2)',
                  background: active ? 'rgba(184,92,122,0.12)' : 'transparent',
                  color: active ? '#B85C7A' : '#7D655C', cursor: 'pointer', transition: 'all 0.2s ease',
                }}
              >
                {y === 'all' ? 'All' : y}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

// ── MemoryDetail ───────────────────────────────────────────

function MemoryDetail({ memories, currentIndex, onClose, onNavigate }: {
  memories: Memory[];
  currentIndex: number;
  onClose: () => void;
  onNavigate: (index: number) => void;
}) {
  const memory = memories[currentIndex];
  const [photoIndex, setPhotoIndex] = useState(0);
  const [photoKey, setPhotoKey] = useState(0);

  useEffect(() => { setPhotoIndex(0); setPhotoKey((k) => k + 1); }, [currentIndex]);

  const handlePhotoChange = (idx: number) => { setPhotoIndex(idx); setPhotoKey((k) => k + 1); };

  const goPrev = useCallback(() => {
    if (currentIndex > 0) onNavigate(currentIndex - 1);
  }, [currentIndex, onNavigate]);

  const goNext = useCallback(() => {
    if (currentIndex < memories.length - 1) onNavigate(currentIndex + 1);
  }, [currentIndex, memories.length, onNavigate]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') goPrev();
      if (e.key === 'ArrowRight') goNext();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose, goPrev, goNext]);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  const catInfo = CATEGORY_INFO[memory.category];
  const allPhotos = memory.photos.length > 0 ? memory.photos : [memory.coverPhoto];

  return (
    <div className="mw-overlay-in" onClick={onClose} style={{ position: 'fixed', inset: 0, zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}>
      <div style={{ position: 'absolute', inset: 0, background: 'rgba(61,44,44,0.62)', backdropFilter: 'blur(8px) saturate(120%)', WebkitBackdropFilter: 'blur(8px) saturate(120%)' }} />

      <div className="mw-detail-in" onClick={(e) => e.stopPropagation()} style={{ position: 'relative', zIndex: 10, background: '#FFFDF9', borderRadius: 4, boxShadow: '0 32px 100px rgba(61,44,44,0.35)', width: '100%', maxWidth: 960, maxHeight: 'calc(100vh - 2rem)', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
        <div className="mw-tape" style={{ position: 'absolute', top: -10, left: '50%', transform: 'translateX(-50%) rotate(-0.5deg)', zIndex: 20 }} />

        <div style={{ display: 'flex', flex: 1, overflow: 'hidden', flexDirection: 'column' }}>
          <div style={{ display: 'flex', flex: 1, overflow: 'hidden', flexWrap: 'wrap' }}>
            {/* Photo section */}
            <div style={{ flex: '1 1 340px', background: 'linear-gradient(135deg, #F8DDE8 0%, #F3E8F0 100%)', display: 'flex', flexDirection: 'column', position: 'relative', minHeight: 320 }}>
              <div style={{ flex: 1, overflow: 'hidden', position: 'relative' }}>
                <img key={photoKey} src={allPhotos[photoIndex]} alt={memory.title} className="mw-photo-in" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', backgroundColor: '#F3B6C6' }} />
                {allPhotos.length > 1 && (
                  <div style={{ position: 'absolute', bottom: 10, right: 12, background: 'rgba(61,44,44,0.55)', color: '#FFFDF9', borderRadius: 20, padding: '2px 10px', fontSize: '0.7rem', fontFamily: "'Nunito Sans', sans-serif", backdropFilter: 'blur(4px)' }}>
                    {photoIndex + 1} / {allPhotos.length}
                  </div>
                )}
              </div>
              {allPhotos.length > 1 && (
                <div style={{ display: 'flex', gap: '6px', padding: '8px', background: 'rgba(255,255,255,0.5)', overflowX: 'auto' }}>
                  {allPhotos.map((photo, idx) => (
                    <button key={idx} onClick={() => handlePhotoChange(idx)} style={{ border: idx === photoIndex ? '2.5px solid #B85C7A' : '2px solid transparent', borderRadius: 2, padding: 0, cursor: 'pointer', flexShrink: 0, overflow: 'hidden', transition: 'border-color 0.2s ease, transform 0.2s ease', transform: idx === photoIndex ? 'scale(1.06)' : 'scale(1)' }}>
                      <img src={photo} alt={`Photo ${idx + 1}`} style={{ width: 56, height: 44, objectFit: 'cover', display: 'block' }} />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Info section */}
            <div style={{ flex: '1 1 280px', padding: '2rem 2rem 1.5rem', display: 'flex', flexDirection: 'column', overflowY: 'auto' }}>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '5px', padding: '4px 12px', borderRadius: 20, background: 'rgba(184,92,122,0.1)', color: '#B85C7A', fontFamily: "'Nunito Sans', sans-serif", fontSize: '0.72rem', fontWeight: 600, letterSpacing: '0.07em', textTransform: 'uppercase' as const, alignSelf: 'flex-start', marginBottom: '1.1rem' }}>
                {catInfo.emoji} {catInfo.label}
              </span>
              {memory.displayDate && (
                <p style={{ fontFamily: "'Dancing Script', cursive", fontSize: '1.05rem', color: '#7D655C', margin: '0 0 0.4rem', letterSpacing: '0.02em' }}>{memory.displayDate}</p>
              )}
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(1.5rem, 3.5vw, 2rem)', fontWeight: 600, color: '#3D2C2C', margin: '0 0 1.2rem', lineHeight: 1.2, fontStyle: 'italic' }}>{memory.title}</h2>
              <p style={{ fontFamily: "'Nunito Sans', sans-serif", fontSize: '0.88rem', color: '#5D4848', lineHeight: 1.75, margin: '0 0 1.4rem' }}>{memory.description}</p>
              {memory.location && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '1rem' }}>
                  <span style={{ fontSize: '0.9rem' }}>📍</span>
                  <span style={{ fontFamily: "'Nunito Sans', sans-serif", fontSize: '0.8rem', color: '#7D655C', fontWeight: 500 }}>{memory.location}</span>
                </div>
              )}
              <div style={{ margin: '0.5rem 0 1.5rem', padding: '10px 14px', borderLeft: '3px solid #F3B6C6', background: 'rgba(248,221,232,0.25)', borderRadius: '0 4px 4px 0' }}>
                <p style={{ fontFamily: "'Parisienne', cursive", fontSize: '1rem', color: '#B85C7A', margin: 0, lineHeight: 1.4 }}>{memory.caption}</p>
              </div>
              <div style={{ flex: 1 }} />
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '1rem', borderTop: '1px solid rgba(184,92,122,0.12)', gap: '8px' }}>
                <button onClick={goPrev} disabled={currentIndex === 0} style={{ fontFamily: "'Dancing Script', cursive", fontSize: '0.9rem', color: currentIndex === 0 ? 'rgba(125,101,92,0.35)' : '#B85C7A', background: 'none', border: 'none', cursor: currentIndex === 0 ? 'default' : 'pointer', padding: '6px 12px', borderRadius: 16, display: 'flex', alignItems: 'center', gap: '4px' }}>← Prev</button>
                <span style={{ fontFamily: "'Nunito Sans', sans-serif", fontSize: '0.72rem', color: '#7D655C', opacity: 0.75, letterSpacing: '0.06em' }}>{currentIndex + 1} / {memories.length}</span>
                <button onClick={goNext} disabled={currentIndex === memories.length - 1} style={{ fontFamily: "'Dancing Script', cursive", fontSize: '0.9rem', color: currentIndex === memories.length - 1 ? 'rgba(125,101,92,0.35)' : '#B85C7A', background: 'none', border: 'none', cursor: currentIndex === memories.length - 1 ? 'default' : 'pointer', padding: '6px 12px', borderRadius: 16, display: 'flex', alignItems: 'center', gap: '4px' }}>Next →</button>
              </div>
            </div>
          </div>
        </div>

        <button
          onClick={onClose}
          aria-label="Close"
          style={{ position: 'absolute', top: 14, right: 14, width: 34, height: 34, borderRadius: '50%', border: 'none', background: 'rgba(255,255,255,0.85)', color: '#7D655C', fontSize: '1.1rem', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 20, boxShadow: '0 2px 8px rgba(0,0,0,0.14)', backdropFilter: 'blur(4px)', transition: 'background 0.2s ease, transform 0.2s ease' }}
          onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.background = '#F8DDE8'; (e.currentTarget as HTMLButtonElement).style.transform = 'scale(1.1)'; }}
          onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.background = 'rgba(255,255,255,0.85)'; (e.currentTarget as HTMLButtonElement).style.transform = 'scale(1)'; }}
        >×</button>
      </div>
    </div>
  );
}

// ── FloatingMusicPlayer ────────────────────────────────────

const TRACK_NAME = 'Our Song';
const TRACK_ARTIST = 'A melody for us';
const TRACK_DURATION = 212;

function FloatingMusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [expanded, setExpanded] = useState(true);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (isPlaying) {
      intervalRef.current = setInterval(() => {
        setProgress((p) => {
          if (p >= TRACK_DURATION) { setIsPlaying(false); return 0; }
          return p + 1;
        });
      }, 1000);
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current);
    }
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [isPlaying]);

  const togglePlay = () => setIsPlaying((p) => !p);
  const progressPct = (progress / TRACK_DURATION) * 100;
  const formatTime = (secs: number) => { const m = Math.floor(secs / 60); const s = secs % 60; return `${m}:${s.toString().padStart(2, '0')}`; };

  return (
    <div
      className="mw-music-player"
      style={{
        position: 'fixed', bottom: 24, right: 24, zIndex: 50,
        background: 'rgba(255,253,249,0.88)', borderRadius: expanded ? 16 : 28,
        boxShadow: '0 8px 32px rgba(61,44,44,0.16), 0 2px 8px rgba(184,92,122,0.12)',
        border: '1px solid rgba(184,92,122,0.18)',
        transition: 'all 0.35s cubic-bezier(0.34,1.56,0.64,1)',
        overflow: 'hidden', maxWidth: expanded ? 260 : 52, width: expanded ? 260 : 52,
      }}
    >
      {!expanded && (
        <button onClick={() => setExpanded(true)} className={isPlaying ? 'mw-pulse-soft' : ''} aria-label="Open music player" style={{ width: 52, height: 52, border: 'none', background: 'transparent', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.4rem' }}>🎵</button>
      )}
      {expanded && (
        <div style={{ padding: '14px 14px 12px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
            <div
              style={{
                width: 38, height: 38, borderRadius: '50%', flexShrink: 0,
                background: 'radial-gradient(circle at 50% 50%, #3D2C2C 0%, #3D2C2C 22%, #B85C7A 22%, #B85C7A 38%, #3D2C2C 38%, #3D2C2C 50%, #E98AAF 50%, #E98AAF 62%, #7D655C 62%)',
                boxShadow: '0 2px 8px rgba(0,0,0,0.22)',
                animation: isPlaying ? 'mw-spin 3.5s linear infinite' : 'none',
              }}
            />
            <div style={{ flex: 1, minWidth: 0 }}>
              <p style={{ fontFamily: "'Parisienne', cursive", fontSize: '0.95rem', color: '#3D2C2C', margin: 0, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{TRACK_NAME}</p>
              <p style={{ fontFamily: "'Nunito Sans', sans-serif", fontSize: '0.63rem', color: '#7D655C', margin: 0, opacity: 0.75 }}>{TRACK_ARTIST}</p>
            </div>
            <button onClick={() => setExpanded(false)} aria-label="Minimize" style={{ border: 'none', background: 'none', cursor: 'pointer', color: 'rgba(125,101,92,0.5)', fontSize: '0.9rem', padding: '2px', lineHeight: 1, flexShrink: 0 }}>−</button>
          </div>
          <div
            style={{ width: '100%', height: 3, background: 'rgba(184,92,122,0.15)', borderRadius: 4, marginBottom: '8px', cursor: 'pointer', position: 'relative' }}
            onClick={(e) => { const rect = e.currentTarget.getBoundingClientRect(); const pct = (e.clientX - rect.left) / rect.width; setProgress(Math.floor(pct * TRACK_DURATION)); }}
          >
            <div style={{ height: '100%', width: `${progressPct}%`, background: 'linear-gradient(90deg, #E98AAF, #B85C7A)', borderRadius: 4, transition: 'width 0.8s linear' }} />
          </div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ fontFamily: "'Nunito Sans', sans-serif", fontSize: '0.63rem', color: '#7D655C', opacity: 0.65 }}>{formatTime(progress)}</span>
            <button
              onClick={togglePlay}
              aria-label={isPlaying ? 'Pause' : 'Play'}
              style={{ width: 34, height: 34, borderRadius: '50%', border: 'none', background: 'linear-gradient(135deg, #E98AAF, #B85C7A)', color: '#FFFDF9', fontSize: '0.85rem', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 3px 12px rgba(184,92,122,0.4)', transition: 'transform 0.2s ease' }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.transform = 'scale(1.1)'; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.transform = 'scale(1)'; }}
            >
              {isPlaying ? '⏸' : '▶'}
            </button>
            <span style={{ fontFamily: "'Nunito Sans', sans-serif", fontSize: '0.63rem', color: '#7D655C', opacity: 0.65 }}>{formatTime(TRACK_DURATION)}</span>
          </div>
        </div>
      )}
    </div>
  );
}

// ── Main Template ──────────────────────────────────────────

export default function TemplateMemoryWall({ storyData }: { storyData: StoryData }) {
  const [activeCategory, setActiveCategory] = useState<MemoryCategory>('ALL');
  const [activeYear, setActiveYear] = useState<number | 'all'>('all');
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const allMemories = useMemo(() => storyDataToMemories(storyData), [storyData]);

  const filtered = useMemo(() => {
    return allMemories.filter((m) => {
      const catMatch = activeCategory === 'ALL' || m.category === activeCategory;
      const yearMatch = activeYear === 'all' || m.year === activeYear;
      return catMatch && yearMatch;
    });
  }, [allMemories, activeCategory, activeYear]);

  const targetDate = storyData.counter_block.target_date;
  const daysTogether = getDaysTogether(targetDate);
  const yearsTogether = getYearsTogether(targetDate);

  return (
    <div className="mw-wall-bg mw-scrollbar" style={{ minHeight: '100vh', position: 'relative' }}>
      <style>{SCOPED_CSS}</style>
      <MemoryBackground />

      {/* Back button */}
      <Link to="/templates" style={{ position: 'fixed', top: 16, left: 16, zIndex: 60, background: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(12px)', color: '#fff', padding: 8, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', textDecoration: 'none', transition: 'background 0.2s ease' }}>
        <span className="material-symbols-outlined" style={{ fontSize: 20, display: 'block' }}>arrow_back</span>
      </Link>

      <div style={{ position: 'relative', zIndex: 1 }}>
        {/* Header */}
        <header style={{ textAlign: 'center', padding: 'clamp(2.5rem, 6vw, 4rem) 2rem 1.5rem' }}>
          <h1 style={{ fontFamily: "'Parisienne', cursive", fontSize: 'clamp(2.8rem, 8vw, 5.5rem)', color: '#3D2C2C', margin: '0 0 0.3rem', lineHeight: 1, textShadow: '0 2px 12px rgba(184,92,122,0.12)' }}>
            Our Memory Wall
          </h1>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px', margin: '0.7rem 0' }}>
            <div style={{ height: 1, width: 80, background: 'linear-gradient(90deg, transparent, rgba(184,92,122,0.3))' }} />
            <span className="mw-gentle-float" style={{ fontSize: '1rem', opacity: 0.75 }}>❤️</span>
            <div style={{ height: 1, width: 80, background: 'linear-gradient(90deg, rgba(184,92,122,0.3), transparent)' }} />
          </div>
          <p style={{ fontFamily: "'Playfair Display', serif", fontStyle: 'italic', fontSize: 'clamp(0.9rem, 2.5vw, 1.15rem)', color: '#7D655C', margin: '0 0 1.4rem', opacity: 0.85 }}>
            Every picture has a story.
          </p>

          {/* Stats pills */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', justifyContent: 'center', marginBottom: '0.5rem' }}>
            {[
              { value: yearsTogether < 1 ? `${daysTogether}` : `${yearsTogether}`, unit: yearsTogether < 1 ? 'days' : yearsTogether === 1 ? 'year' : 'years', label: 'together' },
              { value: String(allMemories.length), unit: '', label: 'memories' },
              { value: String(daysTogether), unit: '', label: 'days' },
              { value: '∞', unit: '', label: 'moments' },
            ].map((stat, i) => (
              <div key={i} style={{ background: 'rgba(255,255,255,0.55)', backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)', border: '1px solid rgba(184,92,122,0.15)', borderRadius: 20, padding: '6px 18px', display: 'flex', flexDirection: 'column', alignItems: 'center', minWidth: 70 }}>
                <span style={{ fontFamily: "'Dancing Script', cursive", fontSize: stat.value === '∞' ? '1.5rem' : '1.25rem', fontWeight: 700, color: '#B85C7A', lineHeight: 1.1 }}>
                  {stat.value}{stat.unit && <span style={{ fontSize: '0.7em', marginLeft: 3 }}>{stat.unit}</span>}
                </span>
                <span style={{ fontFamily: "'Nunito Sans', sans-serif", fontSize: '0.65rem', color: '#7D655C', opacity: 0.7, letterSpacing: '0.05em' }}>{stat.label}</span>
              </div>
            ))}
          </div>
        </header>

        {/* Filter */}
        <MemoryFilter activeCategory={activeCategory} activeYear={activeYear} onCategoryChange={setActiveCategory} onYearChange={setActiveYear} memories={allMemories} />

        {/* Memory Wall Grid */}
        {filtered.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '4rem 2rem', fontFamily: "'Parisienne', cursive", fontSize: '1.6rem', color: '#B85C7A', opacity: 0.6 }}>
            No memories here yet… 🌸
          </div>
        ) : (
          <div className="mw-wall-columns" style={{ padding: '0.5rem clamp(1rem, 4vw, 3.5rem) 6rem' }}>
            {filtered.map((memory, idx) => (
              <div
                key={memory.id}
                style={{ breakInside: 'avoid', paddingTop: idx % 3 === 1 ? '2rem' : '0', marginBottom: `${0.8 + memory.layout.offsetY / 40}rem`, display: 'inline-block', width: '100%' }}
              >
                <PolaroidMemory memory={memory} onClick={() => setSelectedIndex(idx)} />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Love Letter */}
      {storyData.letter_block.is_enabled && storyData.letter_block.content && (
        <section style={{ padding: 'clamp(2rem, 6vw, 4rem) clamp(1rem, 4vw, 3.5rem)', display: 'flex', justifyContent: 'center' }}>
          <div style={{
            maxWidth: 520, width: '100%', background: 'rgba(255,255,255,0.7)', backdropFilter: 'blur(10px)', WebkitBackdropFilter: 'blur(10px)',
            borderRadius: 24, border: '1px solid rgba(184,92,122,0.15)', padding: 'clamp(1.5rem, 4vw, 2.5rem)', textAlign: 'center',
            boxShadow: '0 8px 32px rgba(184,92,122,0.08)',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, marginBottom: '1.2rem' }}>
              <div style={{ height: 1, width: 40, background: 'linear-gradient(90deg, transparent, rgba(184,92,122,0.3))' }} />
              <span style={{ fontSize: '1.4rem' }}>💌</span>
              <div style={{ height: 1, width: 40, background: 'linear-gradient(90deg, rgba(184,92,122,0.3), transparent)' }} />
            </div>
            {storyData.letter_block.heading && (
              <p style={{ fontFamily: "'Dancing Script', cursive", fontSize: 'clamp(1.1rem, 3vw, 1.4rem)', color: '#B85C7A', marginBottom: '1rem', fontWeight: 600 }}>
                {storyData.letter_block.heading}
              </p>
            )}
            <p style={{ fontFamily: "'Nunito Sans', sans-serif", fontSize: 'clamp(0.85rem, 2.2vw, 0.95rem)', color: '#7D655C', lineHeight: 1.8, whiteSpace: 'pre-wrap', marginBottom: '1.2rem' }}>
              {storyData.letter_block.content}
            </p>
            {storyData.letter_block.signature && (
              <p style={{ fontFamily: "'Dancing Script', cursive", fontSize: 'clamp(0.95rem, 2.5vw, 1.15rem)', color: '#B85C7A', fontStyle: 'italic' }}>
                {storyData.letter_block.signature} 💕
              </p>
            )}
          </div>
        </section>
      )}

      {/* Detail Overlay */}
      {selectedIndex !== null && (
        <MemoryDetail memories={filtered} currentIndex={selectedIndex} onClose={() => setSelectedIndex(null)} onNavigate={setSelectedIndex} />
      )}

      {/* Music Player */}
      <FloatingMusicPlayer />
    </div>
  );
}
