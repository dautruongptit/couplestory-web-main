import React, { useEffect, useState, lazy, Suspense } from 'react';
import { useParams, Link } from 'react-router-dom';
import type { StoryData } from '@/data/mockScenarios';
import { getTemplateTheme, type TemplateTheme } from '@/data/templateThemes';
import { apiClient } from '@/services/api';
import { getOccasionTemplate } from './occasionRegistry';

const TemplateRomanticAnniversary = lazy(() => import('./TemplateRomanticAnniversary'));
const TemplateMemoryWall = lazy(() => import('./TemplateMemoryWall'));
const TemplateAnniversaryJourney = lazy(() => import('./TemplateAnniversaryJourney'));

export default function DynamicStoryTemplate({ storyData }: { storyData?: StoryData }) {
  const { scenarioId } = useParams();
  const [fetchedData, setFetchedData] = useState<StoryData | null>(null);
  const [loading, setLoading] = useState(!storyData);

  useEffect(() => {
    if (storyData) {
      setLoading(false);
      return;
    }

    if (scenarioId) {
      const fetchData = async () => {
        try {
          const [storyRes, eventsRes, messagesRes, photosRes] = await Promise.all([
            apiClient.get(`/stories/${scenarioId}`),
            apiClient.get(`/stories/${scenarioId}/events`),
            apiClient.get(`/stories/${scenarioId}/messages`),
            apiClient.get(`/stories/${scenarioId}/photos`)
          ]);

          const loveLetter = messagesRes.find((m: any) => m.type === 'love_letter' || m.type === 'final_message');

          const mappedData: StoryData = {
            id: storyRes.id || scenarioId,
            slug: storyRes.slug || scenarioId,
            template_id: storyRes.templateCode || 'minimal-couple',
            status: storyRes.status || 'published',
            global_config: {
              purpose: storyRes.purpose || 'confession',
              theme_color: storyRes.themeColor || '#ff4d8d',
              background_music_url: storyRes.backgroundMusicUrl || '',
              is_music_autoplay: true,
            },
            hero_block: {
              is_enabled: true,
              title: storyRes.title || 'Our Story',
              partner_a: { name: storyRes.coupleName1 || '', avatar_url: storyRes.avatar1 || 'https://api.dicebear.com/7.x/notionists/svg?seed=A', gender: 'male' },
              partner_b: { name: storyRes.coupleName2 || '', avatar_url: storyRes.avatar2 || 'https://api.dicebear.com/7.x/notionists/svg?seed=B', gender: 'female' },
              banner_images: photosRes.length > 0 ? [photosRes[0].url || photosRes[0]] : ['https://images.unsplash.com/photo-1518199266791-5375a83190b7?auto=format&fit=crop&w=1200&q=80'],
              short_quote: storyRes.shortQuote || '',
            },
            counter_block: {
              is_enabled: !!storyRes.startDate,
              mode: 'count_up',
              target_date: storyRes.startDate || '',
              label_text: 'Chúng mình đã chung đôi được',
            },
            letter_block: {
              is_enabled: !!loveLetter,
              heading: loveLetter?.heading || 'Gửi người yêu thương,',
              content: loveLetter?.content || '',
              signature: loveLetter?.signature || '',
            },
            timeline_block: {
              is_enabled: eventsRes.length > 0,
              section_title: 'Hành trình của chúng mình',
              events: eventsRes.map((e: any) => ({
                id: e.id,
                date: e.date || e.eventDate || '',
                title: e.title || '',
                description: e.description || '',
                media_url: e.imageUrl || e.mediaUrl || '',
              })),
            },
            gallery_block: {
              is_enabled: photosRes.length > 0,
              section_title: 'Khoảnh khắc đáng nhớ',
              images: photosRes.map((p: any) => ({
                url: p.url || p,
                caption: p.caption || '',
              })),
            },
          };
          setFetchedData(mappedData);
        } catch (error) {
          console.error("Failed to fetch story data", error);
        } finally {
          setLoading(false);
        }
      };

      fetchData();
    } else {
      setLoading(false);
    }
  }, [scenarioId, storyData]);

  const data = storyData || fetchedData;

  if (loading) {
    return <div className="p-8 text-center text-xl min-h-screen flex items-center justify-center">Đang tải...</div>;
  }

  if (!data) {
    return <div className="p-8 text-center text-xl">Không tìm thấy dữ liệu mẫu này!</div>;
  }

  if (data.template_id === 'romantic-anniversary') {
    return (
      <Suspense fallback={<div className="p-8 text-center text-xl min-h-screen flex items-center justify-center">Đang tải...</div>}>
        <TemplateRomanticAnniversary storyData={data} />
      </Suspense>
    );
  }

  if (data.template_id === 'memory-wall') {
    return (
      <Suspense fallback={<div className="p-8 text-center text-xl min-h-screen flex items-center justify-center">Đang tải...</div>}>
        <TemplateMemoryWall storyData={data} />
      </Suspense>
    );
  }

  if (data.template_id === 'anniversary-journey') {
    return (
      <Suspense fallback={<div className="p-8 text-center text-xl min-h-screen flex items-center justify-center">Đang tải...</div>}>
        <TemplateAnniversaryJourney storyData={data} />
      </Suspense>
    );
  }

  const occasion = getOccasionTemplate(data.template_id);
  if (occasion) {
    const OccasionComponent = occasion.component;
    return (
      <Suspense fallback={<div className="p-8 text-center text-xl min-h-screen flex items-center justify-center">Đang tải...</div>}>
        <OccasionComponent storyData={data} />
      </Suspense>
    );
  }

  const theme = getTemplateTheme(data.template_id);

  return (
    <div
      className="min-h-screen"
      style={{ background: theme.bg, color: theme.ink }}
    >
      {/* FLOAT BACK BUTTON */}
      <Link to="/templates" className="fixed top-4 left-4 z-50 bg-black/50 backdrop-blur-md text-white p-2 rounded-full hover:bg-black/70 transition-colors">
        <span className="material-symbols-outlined text-[20px] block">arrow_back</span>
      </Link>

      <HeroSection data={data} theme={theme} />
      <SectionDivider theme={theme} />
      {data.counter_block.is_enabled && <CounterSection data={data} theme={theme} />}
      {data.letter_block.is_enabled && <LetterSection data={data} theme={theme} />}
      {data.timeline_block.is_enabled && data.timeline_block.events.length > 0 && (
        <TimelineSection data={data} theme={theme} />
      )}
      {data.gallery_block.is_enabled && data.gallery_block.images.length > 0 && (
        <GallerySection data={data} theme={theme} />
      )}

      {/* FOOTER */}
      <footer className="py-8 text-center" style={{ background: theme.surfaceAlt, borderTop: `1px solid ${theme.accentSoft}` }}>
        <p className="font-body-sm flex items-center justify-center gap-1" style={{ color: theme.inkSoft }}>
          Tạo bởi <span style={{ color: theme.accent }}>CoupleStory.site</span>
        </p>
      </footer>
    </div>
  );
}

// ============================================================
// SHARED PIECES
// ============================================================

function SectionDivider({ theme }: { theme: TemplateTheme }) {
  if (theme.divider === 'none') return null;
  if (theme.divider === 'ornate') {
    return (
      <div className="flex items-center justify-center gap-3 py-6" style={{ background: theme.bg }}>
        <span style={{ color: theme.accent }}>✦</span>
        <div className="w-16 h-px" style={{ background: theme.accentSoft }} />
        <span style={{ color: theme.accent }}>✦</span>
      </div>
    );
  }
  if (theme.divider === 'dots') {
    return (
      <div className="flex items-center justify-center gap-2 py-6" style={{ background: theme.bg }}>
        {[0, 1, 2].map(i => (
          <span key={i} className="w-1.5 h-1.5 rounded-full" style={{ background: theme.accent }} />
        ))}
      </div>
    );
  }
  return <div className="h-px" style={{ background: theme.accentSoft }} />;
}

function Frame({ theme, children, className = '' }: { theme: TemplateTheme; children: React.ReactNode; className?: string }) {
  if (theme.photoFrame === 'polaroid') {
    return (
      <div className={`bg-white p-3 pb-8 shadow-lg rotate-[-1.5deg] hover:rotate-0 transition-transform duration-300 ${className}`}>
        {children}
      </div>
    );
  }
  if (theme.photoFrame === 'arch') {
    return (
      <div className={`overflow-hidden rounded-t-[999px] shadow-md ${className}`}>
        {children}
      </div>
    );
  }
  if (theme.photoFrame === 'ornate') {
    return (
      <div className={`p-2 rounded-lg shadow-md ${className}`} style={{ border: `2px solid ${theme.accent}` }}>
        <div className="p-1" style={{ border: `1px solid ${theme.accentSoft}` }}>
          {children}
        </div>
      </div>
    );
  }
  return <div className={`overflow-hidden rounded-2xl shadow-sm ${className}`}>{children}</div>;
}

// ============================================================
// HERO
// ============================================================

function HeroSection({ data, theme }: { data: StoryData; theme: TemplateTheme }) {
  if (!data.hero_block.is_enabled) return null;
  const headline = `${theme.headlineFont} ${theme.headlineStyle === 'italic' ? 'italic' : ''}`;

  if (theme.heroTreatment === 'gradient') {
    return (
      <section className="relative w-full min-h-[85vh] flex flex-col items-center justify-center overflow-hidden px-4" style={{ background: theme.heroGradient }}>
        <div className="relative z-10 text-center text-white max-w-2xl">
          <h1 className={`${headline} text-headline-xl md:text-[4.5rem] mb-6 drop-shadow-md`}>
            {data.hero_block.title}
          </h1>
          <PartnerRow data={data} ringColor="rgba(255,255,255,0.6)" />
          {data.hero_block.short_quote && (
            <p className="font-body-lg text-body-lg mt-6 italic text-white/90">"{data.hero_block.short_quote}"</p>
          )}
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-24" style={{ background: `linear-gradient(180deg, transparent, ${theme.bg})` }} />
      </section>
    );
  }

  const isDark = theme.heroTreatment === 'photo-dark';
  return (
    <section className="relative w-full h-[80vh] flex flex-col items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img src={data.hero_block.banner_images[0]} className={`w-full h-full object-cover ${isDark ? 'grayscale-[30%]' : ''}`} alt="Banner" />
        <div className="absolute inset-0" style={{
          background: isDark
            ? 'linear-gradient(180deg, rgba(0,0,0,0.55), rgba(0,0,0,0.75))'
            : 'linear-gradient(180deg, rgba(0,0,0,0.15), rgba(0,0,0,0.45))',
        }} />
      </div>
      <div className="relative z-10 text-center text-white px-4 max-w-3xl">
        {theme.divider === 'ornate' && (
          <div className="flex items-center justify-center gap-3 mb-6 opacity-90">
            <span style={{ color: theme.accent }}>✦</span>
            <div className="w-14 h-px" style={{ background: theme.accent }} />
            <span className="font-label-sm text-label-sm uppercase tracking-[0.3em]" style={{ color: theme.accent }}>{theme.label}</span>
            <div className="w-14 h-px" style={{ background: theme.accent }} />
            <span style={{ color: theme.accent }}>✦</span>
          </div>
        )}
        <h1 className={`${headline} text-headline-xl md:text-[5rem] mb-6 drop-shadow-lg`} style={{ color: theme.accent }}>
          {data.hero_block.title}
        </h1>
        <PartnerRow data={data} ringColor="rgba(255,255,255,0.8)" accent={theme.accent} />
        {data.hero_block.short_quote && (
          <p className="font-body-lg text-body-lg md:text-title-md max-w-2xl mx-auto italic text-white/90 mt-6">
            "{data.hero_block.short_quote}"
          </p>
        )}
      </div>
    </section>
  );
}

function PartnerRow({ data, ringColor, accent }: { data: StoryData; ringColor: string; accent?: string }) {
  return (
    <div className="flex items-center justify-center gap-6 mb-2">
      <div className="text-center">
        <img src={data.hero_block.partner_a.avatar_url} className="w-20 h-20 rounded-full shadow-lg mx-auto mb-2 object-cover bg-white" style={{ border: `2px solid ${ringColor}` }} alt={data.hero_block.partner_a.name} />
        <p className="font-title-lg text-title-lg font-bold">{data.hero_block.partner_a.name}</p>
      </div>
      <div className="w-12 h-12 rounded-full backdrop-blur-md flex items-center justify-center animate-pulse" style={{ background: 'rgba(255,255,255,0.2)', color: accent || '#fff' }}>
        <span className="material-symbols-outlined text-[24px]" style={{ fontVariationSettings: '"FILL" 1' }}>favorite</span>
      </div>
      <div className="text-center">
        <img src={data.hero_block.partner_b.avatar_url} className="w-20 h-20 rounded-full shadow-lg mx-auto mb-2 object-cover bg-white" style={{ border: `2px solid ${ringColor}` }} alt={data.hero_block.partner_b.name} />
        <p className="font-title-lg text-title-lg font-bold">{data.hero_block.partner_b.name}</p>
      </div>
    </div>
  );
}

// ============================================================
// COUNTER
// ============================================================

function CounterSection({ data, theme }: { data: StoryData; theme: TemplateTheme }) {
  return (
    <section className="py-14" style={{ background: theme.surface, borderTop: `3px solid ${theme.accent}` }}>
      <div className="max-w-3xl mx-auto text-center px-4">
        <p className="font-label-md text-label-md uppercase tracking-widest mb-4" style={{ color: theme.inkSoft }}>
          {data.counter_block.label_text}
        </p>
        <div className="flex justify-center items-end gap-2">
          <span className={`${theme.headlineFont} text-headline-xl md:text-[6rem] leading-none font-bold`} style={{ color: theme.accent }}>365</span>
          <span className="font-title-lg pb-2" style={{ color: theme.ink }}>Ngày</span>
        </div>
      </div>
    </section>
  );
}

// ============================================================
// LETTER
// ============================================================

function LetterSection({ data, theme }: { data: StoryData; theme: TemplateTheme }) {
  const headline = `${theme.headlineFont} ${theme.headlineStyle === 'italic' ? 'italic' : ''}`;
  return (
    <section className="py-20" style={{ background: theme.surfaceAlt }}>
      <div className="max-w-2xl mx-auto px-6 relative">
        <div className="absolute -top-10 -left-4 text-[8rem] opacity-10 font-serif select-none" style={{ color: theme.accent }}>"</div>
        <h2 className={`${headline} text-headline-lg mb-6 font-semibold relative z-10`} style={{ color: theme.ink }}>
          {data.letter_block.heading}
        </h2>
        <p className="font-body-lg text-body-lg leading-relaxed whitespace-pre-wrap relative z-10" style={{ color: theme.inkSoft }}>
          {data.letter_block.content}
        </p>
        {data.letter_block.signature && (
          <p className={`mt-8 font-title-lg font-bold text-right relative z-10 ${theme.headlineStyle === 'italic' ? 'italic' : ''}`} style={{ color: theme.accent }}>
            {data.letter_block.signature}
          </p>
        )}
      </div>
    </section>
  );
}

// ============================================================
// TIMELINE
// ============================================================

function TimelineSection({ data, theme }: { data: StoryData; theme: TemplateTheme }) {
  return (
    <section className="py-20" style={{ background: theme.bg }}>
      <div className="max-w-4xl mx-auto px-4">
        <h2 className={`${theme.headlineFont} text-headline-lg text-center mb-16`} style={{ color: theme.ink }}>
          {data.timeline_block.section_title}
        </h2>
        <div className="space-y-12 relative">
          <div className="absolute left-5 md:left-1/2 top-0 bottom-0 w-0.5 -translate-x-1/2 md:translate-x-0" style={{ background: theme.accentSoft }} />
          {data.timeline_block.events.map((event, index) => {
            const isEven = index % 2 === 0;
            return (
              <div key={event.id} className={`relative flex items-center justify-between md:justify-normal group ${isEven ? 'md:flex-row-reverse' : ''}`}>
                <div className="absolute left-5 md:left-1/2 w-4 h-4 rounded-full -ml-2 z-10" style={{ background: theme.accent, border: `3px solid ${theme.bg}` }} />
                <div className="w-full md:w-5/12 pl-12 md:pl-0">
                  <div className="p-5 rounded-2xl shadow-sm hover:shadow-md transition-shadow" style={{ background: theme.surface }}>
                    <span className="font-label-sm text-label-sm uppercase tracking-wider mb-2 block" style={{ color: theme.accent }}>
                      {event.date}
                    </span>
                    <h3 className="font-title-lg text-title-lg mb-2" style={{ color: theme.ink }}>{event.title}</h3>
                    <p className="font-body-md mb-4" style={{ color: theme.inkSoft }}>{event.description}</p>
                    {event.media_url && (
                      <Frame theme={theme}>
                        <img src={event.media_url} alt={event.title} className="w-full h-48 object-cover" />
                      </Frame>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ============================================================
// GALLERY
// ============================================================

function GallerySection({ data, theme }: { data: StoryData; theme: TemplateTheme }) {
  return (
    <section className="py-20" style={{ background: theme.surfaceAlt }}>
      <div className="max-w-6xl mx-auto px-4">
        <h2 className={`${theme.headlineFont} text-headline-lg text-center mb-12`} style={{ color: theme.ink }}>
          {data.gallery_block.section_title}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {data.gallery_block.images.map((img, i) => (
            <Frame key={i} theme={theme} className={theme.photoFrame === 'polaroid' && i % 2 === 1 ? 'rotate-[1.5deg]' : ''}>
              <div className="group relative aspect-[4/5]" style={{ background: theme.surface }}>
                <img src={img.url} alt={img.caption} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                {img.caption && (
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                    <p className="text-white font-title-md">{img.caption}</p>
                  </div>
                )}
              </div>
            </Frame>
          ))}
        </div>
      </div>
    </section>
  );
}
