import { useEffect, useState, useRef, useMemo } from 'react';
import BackToTemplatesLink from '@/components/BackToTemplatesLink';
import { motion } from 'framer-motion';
import { Heart, Play, Pause, Music2, MessageCircle, Sparkles, Calendar, Star, Coffee } from 'lucide-react';
import ReactSlick from 'react-slick';
const Slider = (ReactSlick as any).default || ReactSlick;
import type { StoryData } from '@/data/mockScenarios';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

// ── Particle Effects ───────────────────────────────────────────

function FloatingHearts() {
  const hearts = useMemo(() => {
    return Array.from({ length: 15 }, (_, i) => ({
      id: i,
      startX: Math.random() * 100,
      endX: Math.random() * 100,
      scale: Math.random() * 0.5 + 0.3,
      size: Math.random() * 20 + 15,
      duration: Math.random() * 10 + 15,
      delay: Math.random() * 5,
    }));
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {hearts.map((h) => (
        <motion.div
          key={h.id}
          className="absolute"
          style={{ left: `${h.startX}%`, bottom: -50 }}
          initial={{ opacity: 0.3, scale: h.scale }}
          animate={{
            y: [0, -(typeof window !== 'undefined' ? window.innerHeight + 150 : 1200)],
            x: [0, (h.endX - h.startX) * 5],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: h.duration,
            repeat: Infinity,
            delay: h.delay,
            ease: 'linear',
          }}
        >
          <Heart className="fill-pink-300 text-pink-300" size={h.size} />
        </motion.div>
      ))}
    </div>
  );
}

function FallingHearts() {
  const hearts = useMemo(() => {
    return Array.from({ length: 20 }, (_, i) => ({
      id: i,
      startX: Math.random() * 100,
      endX: Math.random() * 100,
      scale: Math.random() * 0.4 + 0.4,
      size: Math.random() * 25 + 12,
      rotate: Math.random() * 360,
      rotateEnd: Math.random() * 360 + 180,
      duration: Math.random() * 8 + 10,
      delay: Math.random() * 8,
    }));
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {hearts.map((h) => (
        <motion.div
          key={h.id}
          className="absolute"
          style={{ left: `${h.startX}%`, top: -50 }}
          initial={{ opacity: 0.4, scale: h.scale, rotate: h.rotate }}
          animate={{
            y: [0, typeof window !== 'undefined' ? window.innerHeight + 100 : 1200],
            x: [0, (h.endX - h.startX) * 5],
            rotate: h.rotateEnd,
            opacity: [0.4, 0.7, 0.4, 0],
          }}
          transition={{
            duration: h.duration,
            repeat: Infinity,
            delay: h.delay,
            ease: 'linear',
          }}
        >
          <Heart className="fill-pink-200 text-pink-200" size={h.size} />
        </motion.div>
      ))}
    </div>
  );
}

// ── Music Player ───────────────────────────────────────────────

function MusicPlayer({ musicUrl }: { musicUrl?: string }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0.3;
    }
  }, []);

  const src = musicUrl || 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="flex flex-col items-center gap-4 py-12"
    >
      <audio ref={audioRef} loop src={src} />

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={togglePlay}
        className="flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-pink-300 to-purple-300 rounded-full shadow-lg hover:shadow-xl transition-shadow"
      >
        {isPlaying ? (
          <Pause className="text-white" size={24} />
        ) : (
          <Play className="text-white" size={24} />
        )}
        <span className="text-white" style={{ fontFamily: "'Dancing Script', cursive" }}>
          {isPlaying ? 'Pause Our Song' : '▶ Play Our Song ❤️'}
        </span>
        <Music2 className="text-white" size={20} />
      </motion.button>

      {isPlaying && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex items-center gap-2 text-pink-400"
        >
          <Music2 size={16} className="animate-pulse" />
          <span className="text-sm" style={{ fontFamily: "'Playfair Display', serif" }}>Now Playing...</span>
        </motion.div>
      )}
    </motion.div>
  );
}

// ── Photo Carousel ─────────────────────────────────────────────

function PhotoCarousel({ images }: { images: { url: string; caption: string }[] }) {
  if (images.length === 0) return null;

  const settings = {
    dots: true,
    infinite: true,
    speed: 800,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 6000,
    pauseOnHover: true,
    fade: true,
    cssEase: 'cubic-bezier(0.4, 0, 0.2, 1)',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="w-full max-w-4xl mx-auto px-4"
    >
      <Slider {...settings}>
        {images.map((photo, index) => (
          <div key={index} className="outline-none">
            <div className="relative group">
              <motion.div
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden rounded-3xl shadow-2xl bg-pink-50"
              >
                <img
                  src={photo.url}
                  alt={photo.caption || `Photo ${index + 1}`}
                  className="w-full h-[280px] sm:h-[400px] md:h-[500px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </motion.div>
              {photo.caption && (
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="text-center mt-6 text-pink-600"
                  style={{ fontFamily: "'Dancing Script', cursive" }}
                >
                  {photo.caption}
                </motion.p>
              )}
            </div>
          </div>
        ))}
      </Slider>
    </motion.div>
  );
}

// ── Timeline ───────────────────────────────────────────────────

const TIMELINE_ICONS = [
  <MessageCircle className="text-blue-400" size={24} />,
  <Sparkles className="text-pink-400" size={24} />,
  <Coffee className="text-orange-400" size={24} />,
  <Star className="text-yellow-400 fill-yellow-400" size={24} />,
  <Heart className="text-red-400 fill-red-400" size={24} />,
  <Calendar className="text-purple-400" size={24} />,
];

function TimelineSection({ events }: { events: { id: string; date: string; title: string; description: string; media_url: string }[] }) {
  const [selectedEvent, setSelectedEvent] = useState<typeof events[0] | null>(null);

  return (
    <div className="w-full max-w-4xl mx-auto px-4">
      <div className="relative">
        <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-pink-200 via-purple-200 to-pink-200" />

        {events.map((event, index) => (
          <motion.div
            key={event.id || index}
            initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className={`relative flex items-center mb-16 ${
              index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
            }`}
          >
            <div className="absolute left-8 md:left-1/2 w-12 h-12 sm:w-16 sm:h-16 -ml-6 sm:-ml-8 bg-white rounded-full border-4 border-pink-200 shadow-lg flex items-center justify-center z-10">
              {TIMELINE_ICONS[index % TIMELINE_ICONS.length]}
            </div>

            <div
              className={`w-full md:w-5/12 pl-20 sm:pl-24 md:pl-0 ${
                index % 2 === 0 ? 'md:pr-16 md:text-right' : 'md:pl-16'
              }`}
            >
              <motion.div
                whileHover={{ scale: 1.02, y: -5 }}
                onClick={() => setSelectedEvent(event)}
                className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-pink-100 cursor-pointer hover:shadow-xl transition-shadow"
              >
                <p className="text-pink-500 mb-2 hover:underline" style={{ fontFamily: "'Dancing Script', cursive" }}>
                  {event.date} 📸
                </p>
                <h3 className="mb-2" style={{ fontFamily: "'Dancing Script', cursive" }}>
                  {event.title}
                </h3>
                <p className="text-gray-600" style={{ fontFamily: "'Playfair Display', serif" }}>
                  {event.description}
                </p>
              </motion.div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Event Detail Modal */}
      {selectedEvent && (
        <div
          className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedEvent(null)}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-3xl p-5 sm:p-8 max-w-2xl w-full max-h-[90vh] overflow-auto shadow-2xl relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedEvent(null)}
              className="absolute top-4 right-4 w-10 h-10 rounded-full bg-pink-100 hover:bg-pink-200 flex items-center justify-center transition-colors"
            >
              ✕
            </button>

            <div className="space-y-6">
              <div className="text-center">
                <h3 className="text-2xl sm:text-3xl text-pink-500 mb-2" style={{ fontFamily: "'Dancing Script', cursive" }}>
                  {selectedEvent.title}
                </h3>
                <p className="text-pink-400" style={{ fontFamily: "'Dancing Script', cursive" }}>
                  {selectedEvent.date}
                </p>
              </div>

              {selectedEvent.media_url && (
                <div className="rounded-2xl overflow-hidden shadow-xl">
                  <img
                    src={selectedEvent.media_url}
                    alt={selectedEvent.title}
                    className="w-full h-auto max-h-[60vh] object-cover"
                  />
                </div>
              )}

              <p className="text-center text-gray-600 text-lg" style={{ fontFamily: "'Playfair Display', serif" }}>
                {selectedEvent.description}
              </p>

              <div className="flex justify-center gap-2">
                {[...Array(5)].map((_, i) => (
                  <Heart key={i} className="w-5 h-5 text-pink-300 fill-pink-300" />
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}

// ── Anniversary Counter ────────────────────────────────────────

function AnniversaryCounter({ targetDate }: { targetDate: string }) {
  const [days, setDays] = useState(0);

  useEffect(() => {
    if (!targetDate) return;
    const startDate = new Date(targetDate);
    const today = new Date();
    const diffTime = Math.abs(today.getTime() - startDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    let current = 0;
    const increment = diffDays / 50;

    const timer = setInterval(() => {
      current += increment;
      if (current >= diffDays) {
        setDays(diffDays);
        clearInterval(timer);
      } else {
        setDays(Math.floor(current));
      }
    }, 30);

    return () => clearInterval(timer);
  }, [targetDate]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8 }}
      className="flex flex-col items-center gap-4 py-12"
    >
      <motion.div
        animate={{
          scale: [1, 1.05, 1],
        }}
        transition={{ duration: 2, repeat: Infinity }}
        className="text-6xl sm:text-8xl md:text-9xl text-transparent bg-gradient-to-r from-pink-400 via-purple-400 to-pink-400 bg-clip-text"
        style={{ fontFamily: "'Dancing Script', cursive" }}
      >
        {days}
      </motion.div>
      <p className="text-3xl text-pink-500" style={{ fontFamily: "'Dancing Script', cursive" }}>
        Days Together ❤️
      </p>
      <p className="text-lg text-gray-500" style={{ fontFamily: "'Playfair Display', serif" }}>
        Và hành trình vẫn tiếp tục...
      </p>
    </motion.div>
  );
}

// ── Reasons Cards ──────────────────────────────────────────────

const DEFAULT_REASONS = [
  'Luôn quan tâm em từng chút một 🌸',
  'Luôn làm em cười mỗi ngày ☺️',
  'Luôn ở bên dù khó khăn 💪',
  'Hiểu em mà không cần nói 💭',
  'Yêu em với tất cả trái tim ❤️',
  'Luôn khiến em cảm thấy đặc biệt ✨',
];

function ReasonsCards({ reasons }: { reasons?: string[] }) {
  const items = reasons && reasons.length > 0 ? reasons : DEFAULT_REASONS;
  const rotations = useMemo(() => items.map(() => Math.random() * 6 - 3), [items]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl mx-auto px-4">
      {items.map((reason, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 30, rotate: rotations[index] }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          whileHover={{ scale: 1.05, rotate: 0, y: -10 }}
          className="relative"
        >
          <div className="bg-gradient-to-br from-pink-100 to-purple-100 p-6 rounded-2xl shadow-lg border-2 border-pink-200 min-h-[150px] flex flex-col items-center justify-center text-center hover:shadow-2xl transition-shadow">
            <Heart className="text-pink-400 fill-pink-400 mb-3" size={28} />
            <p className="text-gray-700" style={{ fontFamily: "'Dancing Script', cursive" }}>
              {reason}
            </p>
          </div>
          <div className="absolute -top-2 -right-2 w-8 h-8 bg-pink-300 rounded-full shadow-md flex items-center justify-center">
            <Heart className="text-white fill-white" size={16} />
          </div>
        </motion.div>
      ))}
    </div>
  );
}

// ── Main Template ──────────────────────────────────────────────

export default function TemplateRomanticAnniversary({ storyData }: { storyData: StoryData }) {
  const data = storyData;

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const heroTitle = data.hero_block.title || `${data.hero_block.partner_a.name} & ${data.hero_block.partner_b.name}`;
  const heroSubtitle = data.hero_block.short_quote || 'Cảm ơn vì đã cùng nhau đi qua từng khoảnh khắc';
  const bannerImage = data.hero_block.banner_images[0] || 'https://images.unsplash.com/photo-1519681393784-d120267933ba?w=1920&h=1080&fit=crop&auto=format';

  return (
    <div className="min-h-screen overflow-x-hidden relative" style={{ background: '#FFF5F8', color: '#4A3B47', fontFamily: "'Playfair Display', serif" }}>
      <FloatingHearts />
      <FallingHearts />

      {/* Back button */}
      <BackToTemplatesLink
        className="fixed top-4 left-4 z-50 bg-black/50 backdrop-blur-md text-white p-2 rounded-full hover:bg-black/70 transition-colors" />

      <div className="relative z-10">
        {/* ── Hero Section ─────────────────────────── */}
        <section className="min-h-screen flex flex-col items-center justify-center relative px-4">
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20"
            style={{ backgroundImage: `url('${bannerImage}')` }}
          />

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-center relative z-10"
          >
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="mb-6"
            >
              <Heart className="w-20 h-20 text-pink-400 fill-pink-400 mx-auto" />
            </motion.div>

            <h1
              className="text-4xl sm:text-6xl md:text-8xl mb-6 text-transparent bg-gradient-to-r from-pink-400 via-purple-400 to-pink-400 bg-clip-text"
              style={{ fontFamily: "'Dancing Script', cursive" }}
            >
              {heroTitle} 💖
            </h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 1 }}
              className="text-xl md:text-2xl text-gray-600 max-w-2xl mx-auto"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              {heroSubtitle}
            </motion.p>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 1 }}
              className="mt-12"
            >
              <div className="flex gap-3 justify-center">
                {[...Array(5)].map((_, i) => (
                  <motion.div
                    key={i}
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.1 }}
                  >
                    <Heart className="w-6 h-6 text-pink-300 fill-pink-300" />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 1 }}
            className="absolute bottom-10 left-1/2 -translate-x-1/2"
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="text-pink-400 text-4xl"
            >
              ↓
            </motion.div>
          </motion.div>
        </section>

        {/* ── Music Player Section ─────────────────── */}
        <section className="py-20 px-4 bg-white/50 backdrop-blur-sm">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-3xl sm:text-4xl md:text-5xl text-center mb-8 text-pink-500"
            style={{ fontFamily: "'Dancing Script', cursive" }}
          >
            Our Song 🎵
          </motion.h2>
          <MusicPlayer musicUrl={data.global_config.background_music_url} />
        </section>

        {/* ── Photo Carousel Section ───────────────── */}
        {data.gallery_block.is_enabled && data.gallery_block.images.length > 0 && (
          <section className="py-20 px-4 bg-white/50 backdrop-blur-sm">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-3xl sm:text-4xl md:text-5xl text-center mb-16 text-pink-500"
              style={{ fontFamily: "'Dancing Script', cursive" }}
            >
              Our Memories 📷
            </motion.h2>
            <PhotoCarousel images={data.gallery_block.images} />
          </section>
        )}

        {/* ── Timeline Section ─────────────────────── */}
        {data.timeline_block.is_enabled && data.timeline_block.events.length > 0 && (
          <section className="py-20 px-4">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-3xl sm:text-4xl md:text-5xl text-center mb-10 sm:mb-16 md:mb-20 text-pink-500"
              style={{ fontFamily: "'Dancing Script', cursive" }}
            >
              Our Love Story 📖
            </motion.h2>
            <TimelineSection events={data.timeline_block.events} />
          </section>
        )}

        {/* ── Counter Section ──────────────────────── */}
        {data.counter_block.is_enabled && (
          <section className="py-20 px-4 bg-gradient-to-br from-pink-50 via-purple-50 to-pink-50">
            <AnniversaryCounter targetDate={data.counter_block.target_date} />
          </section>
        )}

        {/* ── Reasons Section ──────────────────────── */}
        <section className="py-20 px-4">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-3xl sm:text-4xl md:text-5xl text-center mb-16 text-pink-500"
            style={{ fontFamily: "'Dancing Script', cursive" }}
          >
            Reasons I Love You 💌
          </motion.h2>
          <ReasonsCards />
        </section>

        {/* ── Love Letter Section ──────────────────── */}
        {data.letter_block.is_enabled && (
          <section className="py-16 sm:py-24 md:py-32 px-4 bg-gradient-to-br from-pink-100 via-purple-100 to-pink-100 relative">
            <div
              className="absolute inset-0 opacity-10 bg-cover bg-center"
              style={{
                backgroundImage: `url('${bannerImage}')`,
              }}
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="max-w-3xl mx-auto text-center relative z-10 bg-white/80 backdrop-blur-sm p-6 sm:p-8 md:p-12 rounded-3xl shadow-2xl border-2 border-pink-200"
            >
              <Heart className="w-16 h-16 text-pink-400 fill-pink-400 mx-auto mb-8" />

              <p
                className="text-2xl md:text-3xl text-gray-700 leading-relaxed mb-8 whitespace-pre-wrap"
                style={{ fontFamily: "'Dancing Script', cursive" }}
              >
                "{data.letter_block.content}"
              </p>

              {data.letter_block.signature && (
                <p
                  className="text-xl text-pink-500 italic"
                  style={{ fontFamily: "'Dancing Script', cursive" }}
                >
                  {data.letter_block.signature} 💕
                </p>
              )}
            </motion.div>
          </section>
        )}

        {/* ── Footer ───────────────────────────────── */}
        <footer className="py-12 px-4 bg-white/80 backdrop-blur-sm border-t border-pink-200">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-center"
          >
            <p
              className="text-3xl text-pink-500 mb-6"
              style={{ fontFamily: "'Dancing Script', cursive" }}
            >
              Forever & Always ❤️
            </p>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={scrollToTop}
              className="px-8 py-3 bg-gradient-to-r from-pink-400 to-purple-400 text-white rounded-full shadow-lg hover:shadow-xl transition-shadow"
              style={{ fontFamily: "'Dancing Script', cursive" }}
            >
              Replay Memories 🎵
            </motion.button>

            <div className="mt-8 flex justify-center gap-2">
              {[...Array(7)].map((_, i) => (
                <motion.div
                  key={i}
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.1 }}
                >
                  <Heart className="w-4 h-4 text-pink-300 fill-pink-300" />
                </motion.div>
              ))}
            </div>

            <p className="mt-6 text-sm text-gray-400">
              Tạo bởi <span className="text-pink-400">CoupleStory.site</span>
            </p>
          </motion.div>
        </footer>
      </div>

      {/* Scoped carousel styles */}
      <style>{`
        .slick-dots { bottom: -40px !important; }
        .slick-dots li button:before { font-size: 10px !important; color: #E8B4D0 !important; opacity: 0.5 !important; }
        .slick-dots li.slick-active button:before { opacity: 1 !important; color: #E8B4D0 !important; }
        .slick-prev, .slick-next { width: 32px !important; height: 32px !important; z-index: 10 !important; }
        .slick-prev:before, .slick-next:before { font-size: 24px !important; color: #E8B4D0 !important; opacity: 0.7 !important; }
        .slick-prev:hover:before, .slick-next:hover:before { opacity: 1 !important; }
        .slick-prev { left: 8px !important; }
        .slick-next { right: 8px !important; }
        @media (min-width: 640px) {
          .slick-dots { bottom: -50px !important; }
          .slick-dots li button:before { font-size: 12px !important; }
          .slick-prev, .slick-next { width: 50px !important; height: 50px !important; }
          .slick-prev:before, .slick-next:before { font-size: 40px !important; }
          .slick-prev { left: 20px !important; }
          .slick-next { right: 20px !important; }
        }
      `}</style>
    </div>
  );
}
