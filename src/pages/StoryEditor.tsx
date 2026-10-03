import { useState, useEffect, useRef } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import type { StoryData } from '@/data/mockScenarios';
import DynamicStoryTemplate from '@/templates/DynamicStoryTemplate';
import TemplateRomanticAnniversary from '@/templates/TemplateRomanticAnniversary';
import TemplateMemoryWall from '@/templates/TemplateMemoryWall';
import { apiClient } from '@/services/api';
import { toast } from '@/utils/toast';
import { useTemplates } from '@/hooks/useTemplates';
import ChangeTemplateModal from '@/components/ChangeTemplateModal';
import { useAuth } from '@/context/AuthContext';
import { usePlans } from '@/hooks/usePlans';

interface MusicTrack {
  id: string;
  title: string;
  artist?: string | null;
  url: string;
}

interface ServerPhoto {
  id: string;
  url: string;
  thumbnailUrl?: string;
  filenameOriginal?: string;
  sortOrder?: number;
}

type SectionTab = 'intro' | 'memories' | 'letter' | 'vibes';
type PreviewDevice = 'mobile' | 'desktop';

export default function StoryEditor() {
  const { scenarioId } = useParams();
  const navigate = useNavigate();
  const [story, setStory] = useState<StoryData | null>(null);
  const [activeSection, setActiveSection] = useState<SectionTab>('memories');
  const [previewDevice, setPreviewDevice] = useState<PreviewDevice>('mobile');
  const [library, setLibrary] = useState<MusicTrack[]>([]);
  const [musicIds, setMusicIds] = useState<string[]>([]);
  const { user } = useAuth();
  const { plans } = usePlans();
  const maxTracks = plans.find(p => p.code === (user?.plan ?? 'FREE'))?.maxMusicTracks ?? 1;
  const [isSaving, setIsSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const [photos, setPhotos] = useState<ServerPhoto[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [storyType, setStoryType] = useState('LOVE_STORY');
  const [showChangeTemplate, setShowChangeTemplate] = useState(false);
  const [expandedEventIdx, setExpandedEventIdx] = useState<number | null>(0);
  const { templates } = useTemplates();
  const currentTemplate = templates.find(t => t.code === story?.template_id);
  const maxVisible = currentTemplate?.maxDisplayEvents ?? 6;
  const minPublish = currentTemplate?.minEventsForPublish ?? 2;
  const visibleCount = story ? story.timeline_block.events.filter(e => e.is_visible !== false).length : 0;

  useEffect(() => {
    if (!scenarioId) return;
    const fetchData = async () => {
      try {
        const [storyRes, eventsRes, messagesRes, photosRes, libraryRes, playlistRes] = await Promise.all([
          apiClient.get(`/stories/${scenarioId}`),
          apiClient.get(`/stories/${scenarioId}/events`),
          apiClient.get(`/stories/${scenarioId}/messages`),
          apiClient.get(`/stories/${scenarioId}/photos`),
          apiClient.get('/music').catch(() => []),
          apiClient.get(`/stories/${scenarioId}/music`).catch(() => []),
        ]);
        setLibrary(libraryRes as MusicTrack[]);
        setMusicIds((playlistRes as MusicTrack[]).map(t => t.id));
        const loveLetter = messagesRes.find((m: any) => m.type === 'love_letter' || m.type === 'final_message');
        const mappedData: StoryData = {
          id: storyRes.id || scenarioId,
          slug: storyRes.slug || scenarioId,
          template_id: storyRes.templateCode || 'dynamic_v1',
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
            heading: loveLetter?.title || loveLetter?.heading || 'Gửi người yêu thương,',
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
              description: e.message || '',
              location: e.location || '',
              is_visible: e.isVisible !== false,
              media_url: e.imageUrl || e.mediaUrl || '',
            })),
          },
          gallery_block: {
            is_enabled: photosRes.length > 0,
            section_title: 'Khoảnh khắc đáng nhớ',
            images: photosRes.map((p: any) => ({ url: p.url || p, caption: p.caption || '' })),
          },
        };
        setStoryType(storyRes.type || 'LOVE_STORY');
        setStory(mappedData);
        setPhotos(photosRes.map((p: any) => ({ id: p.id, url: p.url, thumbnailUrl: p.thumbnailUrl, filenameOriginal: p.filenameOriginal, sortOrder: p.sortOrder })));
      } catch (error) {
        console.error('Failed to fetch story data', error);
      }
    };
    fetchData();
  }, [scenarioId]);

  const handleSave = async (): Promise<boolean> => {
    if (!story || !scenarioId) return false;
    setIsSaving(true);
    try {
      await apiClient.put(`/stories/${scenarioId}`, {
        coupleName1: story.hero_block.partner_a.name,
        coupleName2: story.hero_block.partner_b.name,
        title: story.hero_block.title,
        shortQuote: story.hero_block.short_quote,
        startDate: story.counter_block.target_date,
      });
      if (story.letter_block.is_enabled) {
        await apiClient.post(`/stories/${scenarioId}/messages`, {
          type: 'love_letter',
          heading: story.letter_block.heading,
          title: story.letter_block.heading,
          content: story.letter_block.content,
          signature: story.letter_block.signature,
        });
      }
      const incomplete = story.timeline_block.events.some(e => !e.title.trim() || !e.description.trim());
      if (story.timeline_block.is_enabled && incomplete) {
        toast('Mỗi sự kiện cần có tiêu đề và lời nhắn', 'error');
        return false;
      }
      if (story.timeline_block.is_enabled) {
        const existingEvents = await apiClient.get(`/stories/${scenarioId}/events`);
        const existingIds = new Set((existingEvents as any[]).map((e: any) => e.id));
        const currentIds = new Set(story.timeline_block.events.filter(e => e.id).map(e => e.id));
        for (const existing of existingEvents as any[]) {
          if (!currentIds.has(existing.id)) await apiClient.delete(`/stories/${scenarioId}/events/${existing.id}`);
        }
        for (let i = 0; i < story.timeline_block.events.length; i++) {
          const ev = story.timeline_block.events[i];
          const payload = { title: ev.title, message: ev.description, location: ev.location || undefined, eventDate: ev.date || undefined, order: i };
          if (ev.id && existingIds.has(ev.id)) {
            await apiClient.put(`/stories/${scenarioId}/events/${ev.id}`, payload);
          } else {
            const created = await apiClient.post(`/stories/${scenarioId}/events`, payload);
            story.timeline_block.events[i] = { ...ev, id: (created as any).id };
          }
        }
        const visibleIds = story.timeline_block.events.filter(e => e.is_visible !== false && e.id).map(e => e.id);
        await apiClient.put(`/stories/${scenarioId}/events/visibility`, visibleIds);
      }
      await apiClient.put(`/stories/${scenarioId}/music`, musicIds);
      setLastSaved(new Date());
      toast('Đã lưu thành công ✨', 'success');
      return true;
    } catch (error) {
      toast((error as any)?.message || 'Lỗi khi lưu', 'error');
      return false;
    } finally {
      setIsSaving(false);
    }
  };

  if (!story) {
    return (
      <div className="flex h-screen items-center justify-center bg-[#fdf6f9]">
        <div className="flex flex-col items-center gap-3">
          <span className="material-symbols-outlined text-rose-400 text-4xl animate-spin">progress_activity</span>
          <p className="text-sm text-gray-400">Đang tải story...</p>
        </div>
      </div>
    );
  }

  const openChangeTemplate = () => {
    if (story.timeline_block.events.some(e => !e.id)) {
      toast('Hãy bấm lưu các sự kiện mới trước khi đổi mẫu', 'error');
      return;
    }
    setShowChangeTemplate(true);
  };

  const handleTemplateChanged = (templateCode: string, serverEvents: { id: string; isVisible: boolean }[]) => {
    const visibleById = new Map(serverEvents.map(e => [e.id, e.isVisible]));
    setStory({
      ...story,
      template_id: templateCode,
      timeline_block: {
        ...story.timeline_block,
        events: story.timeline_block.events.map(e => ({ ...e, is_visible: visibleById.get(e.id) ?? e.is_visible })),
      },
    });
    setShowChangeTemplate(false);
  };

  const previewStory: StoryData = {
    ...story,
    timeline_block: {
      ...story.timeline_block,
      events: story.timeline_block.events.filter(e => e.is_visible !== false).slice(0, maxVisible),
    },
  };

  const storyTitle = story.hero_block.title || `${story.hero_block.partner_a.name} & ${story.hero_block.partner_b.name}`;
  const coupleNames = `${story.hero_block.partner_a.name} & ${story.hero_block.partner_b.name}`;
  const totalEvents = story.timeline_block.events.length;
  const draftDoneCount = story.timeline_block.events.filter(e => e.title && e.description).length;

  const SECTION_TABS: { key: SectionTab; label: string }[] = [
    { key: 'intro', label: 'Intro' },
    { key: 'memories', label: 'Memories' },
    { key: 'letter', label: 'Letter' },
    { key: 'vibes', label: 'Vibes' },
  ];

  // Unused var silencer
  void minPublish;
  void user;

  return (
    <div className="flex flex-col h-screen bg-[#fdf6f9] overflow-hidden">
      {/* Change Template Modal */}
      {showChangeTemplate && (
        <ChangeTemplateModal
          storyId={scenarioId!}
          storyType={storyType}
          currentCode={story.template_id}
          onClose={() => setShowChangeTemplate(false)}
          onChanged={handleTemplateChanged}
        />
      )}

      {/* ══ TOP NAVBAR ══ */}
      <header className="h-14 flex-shrink-0 bg-white border-b border-rose-100 flex items-center px-4 gap-3 z-30 shadow-sm">
        <div className="flex items-center gap-2 min-w-0">
          <Link to="/dashboard" className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-rose-50 transition-colors flex-shrink-0">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="#f43f5e">
              <path d="M12 21.593c-5.63-5.539-11-10.297-11-14.402 0-3.791 3.068-5.191 5.281-5.191 1.312 0 4.151.501 5.719 4.457 1.59-3.968 4.464-4.447 5.726-4.447 2.54 0 5.274 1.621 5.274 5.181 0 4.069-5.136 8.625-11 14.402z"/>
            </svg>
          </Link>
          <span className="font-semibold text-gray-800 text-sm truncate max-w-[160px]">{storyTitle}</span>
          <span className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-600 font-medium text-[11px] flex-shrink-0">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            {isSaving ? 'Đang lưu...' : lastSaved ? 'Đã lưu' : 'Draft Saved'}
          </span>
        </div>

        {/* Section tabs */}
        <nav className="flex-1 flex items-center justify-center gap-1">
          {SECTION_TABS.map(tab => (
            <button
              key={tab.key}
              onClick={() => setActiveSection(tab.key)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
                activeSection === tab.key
                  ? 'bg-rose-500 text-white shadow-sm'
                  : 'text-gray-500 hover:text-gray-800 hover:bg-rose-50'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>

        {/* Right actions */}
        <div className="flex items-center gap-2 flex-shrink-0">
          <button onClick={handleSave} disabled={isSaving} className="px-3 py-1.5 rounded-full border border-rose-200 text-rose-500 text-sm font-medium hover:bg-rose-50 disabled:opacity-50 transition-colors">
            {isSaving ? 'Lưu...' : 'Lưu'}
          </button>
          <button
            disabled={isSaving}
            onClick={async () => { if (await handleSave()) navigate(`/editor/${scenarioId}/preview`); }}
            className="flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-rose-500 hover:bg-rose-600 text-white text-sm font-semibold shadow-sm disabled:opacity-50 transition-all"
          >
            <span className="material-symbols-outlined text-[16px]">rocket_launch</span>
            Publish
          </button>
          <div className="w-8 h-8 rounded-full bg-rose-100 flex items-center justify-center text-rose-400 flex-shrink-0">
            <span className="material-symbols-outlined text-[18px]">person</span>
          </div>
        </div>
      </header>

      {/* ══ SUB-BAR ══ */}
      <div className="h-11 flex-shrink-0 bg-white/80 backdrop-blur-sm border-b border-rose-100/60 flex items-center px-4 gap-3 z-20">
        <div className="flex items-center gap-2 min-w-0">
          <div className="w-6 h-6 rounded-md bg-rose-100 flex items-center justify-center flex-shrink-0">
            <span className="material-symbols-outlined text-rose-400 text-[14px]">auto_stories</span>
          </div>
          <span className="font-medium text-gray-700 text-sm truncate">{coupleNames} • Scrapbook</span>
          <span className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-600 text-[10px] font-semibold flex-shrink-0">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            Live Sync
          </span>
          {lastSaved && <span className="text-[11px] text-gray-400 hidden sm:block">• Autosaved just now to cloud</span>}
        </div>
        <div className="ml-auto flex items-center gap-2">
          <button onClick={openChangeTemplate} className="flex items-center gap-1.5 px-3 py-1 rounded-full border border-rose-200 text-rose-500 text-[12px] font-medium hover:bg-rose-50 transition-colors">
            <span className="material-symbols-outlined text-[14px]">palette</span>
            <span className="hidden sm:inline">Candy Pink Theme</span>
          </button>
          <button className="flex items-center gap-1.5 px-3 py-1 rounded-full border border-gray-200 text-gray-600 text-[12px] font-medium hover:bg-gray-50 transition-colors">
            <span className="material-symbols-outlined text-[14px]">link</span>
            <span className="hidden sm:inline">Share Link</span>
          </button>
          <button className="flex items-center gap-1.5 px-3 py-1 rounded-full border border-gray-200 text-gray-600 text-[12px] font-medium hover:bg-gray-50 transition-colors">
            <span className="material-symbols-outlined text-[14px]">favorite</span>
            <span className="hidden sm:inline">Test Hearts</span>
          </button>
        </div>
      </div>

      {/* ══ MAIN: Left editor + Right preview ══ */}
      <div className="flex-1 flex overflow-hidden">

        {/* LEFT: editor panel */}
        <aside className="w-[420px] flex-shrink-0 flex flex-col overflow-hidden border-r border-rose-100 bg-[#fdf6f9]">
          <div className="flex-1 overflow-y-auto">

            {/* MEMORIES */}
            {activeSection === 'memories' && (
              <div className="p-4 flex flex-col gap-4">
                {/* Header Section */}
                <div className="bg-white rounded-2xl p-4 shadow-sm border border-rose-50 flex flex-col gap-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <h2 className="font-bold text-gray-800 text-lg">Dòng thời gian</h2>
                      <span className="px-2 py-0.5 rounded-full bg-rose-100 text-rose-500 text-xs font-bold">
                        {totalEvents}/{maxVisible} kỷ niệm
                      </span>
                    </div>
                    <button
                      onClick={() => {
                        const events = [...story.timeline_block.events, { id: '', date: '', title: '', description: '', location: '', is_visible: visibleCount < maxVisible, media_url: '' }];
                        setStory({ ...story, timeline_block: { ...story.timeline_block, is_enabled: true, events } });
                        setExpandedEventIdx(events.length - 1);
                      }}
                      className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-rose-50 text-rose-500 text-xs font-bold hover:bg-rose-100 transition-colors"
                    >
                      <span className="material-symbols-outlined text-[14px]">swap_vert</span>
                      Tự động sắp xếp
                    </button>
                  </div>
                  
                  {/* Progress Bar Area */}
                  <div className="flex flex-col gap-1.5">
                    <div className="w-full h-1.5 bg-rose-50 rounded-full overflow-hidden flex">
                      <div className="h-full bg-gradient-to-r from-purple-500 to-rose-400" style={{ width: `${Math.min(100, Math.round((draftDoneCount / (totalEvents || 1)) * 100))}%` }}></div>
                    </div>
                    <div className="flex items-center justify-between text-[11px] font-medium">
                      <span className="text-gray-500">Tiến độ hoàn thiện trang: {Math.round((draftDoneCount / (totalEvents || 1)) * 100)}%</span>
                      {totalEvents < maxVisible && (
                        <span className="text-rose-400">Thêm {maxVisible - totalEvents} cột mốc để mở khóa quà ✨</span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Event cards */}
                <div className="flex flex-col gap-3">
                  {story.timeline_block.events.length === 0 && (
                    <div className="text-center py-12 text-gray-400">
                      <span className="material-symbols-outlined text-4xl opacity-30 mb-2 block">event_note</span>
                      <p className="font-medium text-sm">Chưa có kỷ niệm nào</p>
                      <p className="text-xs opacity-70 mt-1">Thêm kỷ niệm đầu tiên của hai bạn</p>
                    </div>
                  )}

                  {story.timeline_block.events.map((ev, idx) => {
                    const isExpanded = expandedEventIdx === idx;
                    const isDone = !!(ev.title && ev.description);
                    return (
                      <div key={ev.id || idx} className={`bg-white rounded-[24px] border transition-all duration-200 overflow-hidden shadow-sm ${isExpanded ? 'border-rose-100 shadow-rose-50' : 'border-transparent hover:border-rose-50'}`}>
                        {!isExpanded ? (
                          <div className="w-full flex items-center gap-3 px-4 py-3">
                            <div className="flex items-center gap-3 flex-1 min-w-0 cursor-pointer" onClick={() => setExpandedEventIdx(idx)}>
                              <span className="material-symbols-outlined text-gray-300 text-[18px] cursor-grab">drag_indicator</span>
                              <div className="w-10 h-10 rounded-full bg-rose-50 flex-shrink-0 overflow-hidden">
                                {ev.media_url
                                  ? <img src={ev.media_url} alt="" className="w-full h-full object-cover" />
                                  : <div className="w-full h-full flex items-center justify-center"><span className="material-symbols-outlined text-rose-200 text-[18px]">photo</span></div>
                                }
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-1.5">
                                  <span className="font-bold text-gray-800 text-sm truncate">{ev.title || 'Kỷ niệm mới'} {isDone ? '✨' : ''}</span>
                                </div>
                                {(ev.date || ev.location) && (
                                  <p className="text-[11px] text-gray-500 mt-0.5 flex items-center gap-1 truncate">
                                    {ev.date && <><span className="material-symbols-outlined text-[12px]">calendar_month</span> {new Date(ev.date).toLocaleDateString('vi-VN')}</>}
                                    {ev.date && ev.location && <span>•</span>}
                                    {ev.location && <><span className="material-symbols-outlined text-[12px] text-rose-400">location_on</span> {ev.location}</>}
                                  </p>
                                )}
                              </div>
                            </div>
                            <div className="flex items-center gap-3 flex-shrink-0">
                              <button
                                onClick={e => {
                                  e.stopPropagation();
                                  const events = [...story.timeline_block.events];
                                  events[idx] = { ...events[idx], is_visible: ev.is_visible === false };
                                  setStory({ ...story, timeline_block: { ...story.timeline_block, events } });
                                }}
                                className={`flex items-center justify-center ${ev.is_visible !== false ? 'text-rose-500' : 'text-gray-300'}`}
                              >
                                <span className="material-symbols-outlined text-[18px]">{ev.is_visible !== false ? 'visibility' : 'visibility_off'}</span>
                              </button>
                              <button onClick={() => setExpandedEventIdx(idx)} className="text-gray-400">
                                <span className="material-symbols-outlined text-[20px]">expand_more</span>
                              </button>
                            </div>
                          </div>
                        ) : (
                          <div className="flex flex-col">
                            {/* Expanded header */}
                            <div className="flex items-center justify-between px-4 pt-4 pb-2 border-b border-gray-50">
                              <div className="flex items-center gap-2">
                                <span className="material-symbols-outlined text-gray-300 text-[18px] cursor-grab">drag_indicator</span>
                                <span className="px-3 py-1 rounded-full bg-rose-500 text-white text-[11px] font-bold">
                                  Đang chỉnh sửa #{idx + 1}
                                </span>
                              </div>
                              <label className="flex items-center gap-2 cursor-pointer">
                                <span className="text-[11px] text-gray-600 font-bold">Hiển thị</span>
                                <div className="relative">
                                  <input type="checkbox" className="sr-only peer" checked={ev.is_visible !== false}
                                    disabled={ev.is_visible === false && visibleCount >= maxVisible}
                                    onChange={e => { const events = [...story.timeline_block.events]; events[idx] = { ...events[idx], is_visible: e.target.checked }; setStory({ ...story, timeline_block: { ...story.timeline_block, events } }); }} />
                                  <div className="w-8 h-4 bg-gray-200 peer-checked:bg-rose-400 rounded-full transition-colors after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:rounded-full after:h-3 after:w-3 after:transition-all peer-checked:after:translate-x-4" />
                                </div>
                              </label>
                            </div>

                            <div className="pt-4">
                              <div className="mx-4 mb-3 rounded-xl overflow-hidden bg-gray-50 border border-gray-100 relative" style={{ aspectRatio: '16/7' }}>
                                {ev.media_url
                                  ? <img src={ev.media_url} alt="" className="w-full h-full object-cover" />
                                  : <div className="w-full h-full flex flex-col items-center justify-center text-gray-300"><span className="material-symbols-outlined text-3xl">add_photo_alternate</span><span className="text-xs mt-1">Thêm ảnh bìa</span></div>
                                }
                                <button className="absolute bottom-2 right-2 flex items-center gap-1 px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-sm text-gray-600 text-xs font-medium shadow-sm border border-gray-200">
                                  <span className="material-symbols-outlined text-[14px]">photo_camera</span>
                                  Đổi ảnh
                                </button>
                              </div>

                              {ev.description && (
                                <p className="mx-4 mb-3 text-rose-400 italic text-xs">"{ev.description.slice(0, 80)}{ev.description.length > 80 ? '...' : ''}"</p>
                              )}

                              <div className="px-4 flex flex-col gap-3">
                                <div>
                                  <label className="text-[11px] text-gray-400 font-semibold uppercase tracking-wider flex items-center gap-1 mb-1.5">💬 What happened?</label>
                                  <input type="text" placeholder="Tên kỷ niệm..." maxLength={100} value={ev.title}
                                    onChange={e => { const events = [...story.timeline_block.events]; events[idx] = { ...events[idx], title: e.target.value }; setStory({ ...story, timeline_block: { ...story.timeline_block, events } }); }}
                                    className="w-full h-9 px-3 rounded-lg bg-gray-50 border border-gray-200 text-sm focus:outline-none focus:border-rose-300 focus:ring-1 focus:ring-rose-200 transition-all" />
                                </div>
                                <textarea rows={3} maxLength={500} placeholder="Kể lại câu chuyện trong kỷ niệm này..."
                                  value={ev.description}
                                  onChange={e => { const events = [...story.timeline_block.events]; events[idx] = { ...events[idx], description: e.target.value }; setStory({ ...story, timeline_block: { ...story.timeline_block, events } }); }}
                                  className="w-full p-3 rounded-lg bg-gray-50 border border-gray-200 text-sm focus:outline-none focus:border-rose-300 focus:ring-1 focus:ring-rose-200 resize-none transition-all" />

                                {/* Location + Date */}
                                <div className="grid grid-cols-2 gap-2">
                                  <div>
                                    <label className="text-[11px] text-gray-400 font-semibold uppercase tracking-wider flex items-center gap-1 mb-1.5">
                                      <span className="material-symbols-outlined text-[12px]">location_on</span> Where was this?
                                    </label>
                                    <div className="relative">
                                      <span className="absolute left-2 top-1/2 -translate-y-1/2 material-symbols-outlined text-gray-300 text-[14px]">location_on</span>
                                      <input type="text" placeholder="Địa điểm..." maxLength={150} value={ev.location || ''}
                                        onChange={e => { const events = [...story.timeline_block.events]; events[idx] = { ...events[idx], location: e.target.value }; setStory({ ...story, timeline_block: { ...story.timeline_block, events } }); }}
                                        className="w-full h-9 pl-6 pr-2 rounded-lg bg-gray-50 border border-gray-200 text-xs focus:outline-none focus:border-rose-300 focus:ring-1 focus:ring-rose-200 transition-all" />
                                    </div>
                                  </div>
                                  <div>
                                    <label className="text-[11px] text-gray-400 font-semibold uppercase tracking-wider flex items-center gap-1 mb-1.5">
                                      <span className="material-symbols-outlined text-[12px]">calendar_month</span> Milestone Date
                                    </label>
                                    <div className="relative">
                                      <span className="absolute left-2 top-1/2 -translate-y-1/2 material-symbols-outlined text-gray-300 text-[14px]">calendar_month</span>
                                      <input type="date" value={ev.date ? ev.date.split('T')[0] : ''}
                                        onChange={e => { const events = [...story.timeline_block.events]; events[idx] = { ...events[idx], date: e.target.value }; setStory({ ...story, timeline_block: { ...story.timeline_block, events } }); }}
                                        className="w-full h-9 pl-6 pr-2 rounded-lg bg-gray-50 border border-gray-200 text-xs focus:outline-none focus:border-rose-300 focus:ring-1 focus:ring-rose-200 transition-all" />
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>

                            {/* Expanded Footer */}
                            <div className="mt-4 px-4 py-3 bg-rose-50/50 border-t border-rose-50 flex items-center justify-between">
                              <button
                                onClick={() => { const events = story.timeline_block.events.filter((_, i) => i !== idx); setStory({ ...story, timeline_block: { ...story.timeline_block, events, is_enabled: events.length > 0 } }); setExpandedEventIdx(null); }}
                                className="flex items-center gap-1.5 text-red-500 hover:text-red-600 text-xs font-bold transition-colors"
                              >
                                <span className="material-symbols-outlined text-[16px]">delete</span>
                                Xoá cột mốc này
                              </button>
                              <button
                                onClick={() => setExpandedEventIdx(null)}
                                className="px-4 py-1.5 rounded-full bg-rose-500 hover:bg-rose-600 text-white text-xs font-bold transition-colors"
                              >
                                Lưu thay đổi ✨
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>

                {/* Add memory */}
                <button
                  onClick={() => { const events = [...story.timeline_block.events, { id: '', date: '', title: '', description: '', location: '', is_visible: visibleCount < maxVisible, media_url: '' }]; setStory({ ...story, timeline_block: { ...story.timeline_block, is_enabled: true, events } }); setExpandedEventIdx(events.length - 1); }}
                  className="flex items-center justify-center gap-2 w-full py-3.5 rounded-2xl bg-white text-rose-500 text-sm font-bold hover:bg-rose-50 transition-all shadow-sm border border-rose-50"
                >
                  <span className="material-symbols-outlined text-[18px]">add_circle</span>
                  Thêm cột mốc mới ✨
                </button>

                {/* Publish CTA */}
                <div className="mt-2 p-4 rounded-2xl bg-white border border-rose-100 shadow-sm">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-xl bg-rose-50 flex items-center justify-center flex-shrink-0">
                      <span className="material-symbols-outlined text-rose-400 text-[20px]">favorite</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-bold text-gray-800 text-sm">Ready to share your love story?</p>
                      <p className="text-xs text-gray-400 mt-0.5">Publish will create a password-protected personal website for your anniversary.</p>
                    </div>
                  </div>
                  <div className="flex gap-2 mt-3">
                    <button onClick={async () => { if (await handleSave()) navigate(`/editor/${scenarioId}/preview`); }} className="flex-1 py-2 rounded-xl border border-gray-200 text-gray-600 text-xs font-medium hover:bg-gray-50 transition-colors">Preview Full Website</button>
                    <button onClick={handleSave} className="flex-1 py-2 rounded-xl bg-rose-500 text-white text-xs font-bold hover:bg-rose-600 transition-colors flex items-center justify-center gap-1">
                      <span className="material-symbols-outlined text-[14px]">rocket_launch</span>
                      Publish Now 🚀
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* INTRO */}
            {activeSection === 'intro' && (
              <div className="p-4 flex flex-col gap-4 animate-in fade-in duration-200">
                <h2 className="font-bold text-gray-800 text-base">Giới thiệu chung</h2>
                <div className="bg-white rounded-2xl border border-gray-100 p-4 flex flex-col gap-3 shadow-sm">
                  <label className="text-[11px] text-gray-400 font-semibold uppercase tracking-wider">Tên cặp đôi</label>
                  <div className="flex gap-2 items-center">
                    <input type="text" value={story.hero_block.partner_a.name} onChange={e => setStory({ ...story, hero_block: { ...story.hero_block, partner_a: { ...story.hero_block.partner_a, name: e.target.value } } })} className="flex-1 h-9 px-3 rounded-lg bg-gray-50 border border-gray-200 text-sm focus:outline-none focus:border-rose-300 focus:ring-1 focus:ring-rose-200" placeholder="Tên bạn..." />
                    <span className="text-rose-300 font-bold">&</span>
                    <input type="text" value={story.hero_block.partner_b.name} onChange={e => setStory({ ...story, hero_block: { ...story.hero_block, partner_b: { ...story.hero_block.partner_b, name: e.target.value } } })} className="flex-1 h-9 px-3 rounded-lg bg-gray-50 border border-gray-200 text-sm focus:outline-none focus:border-rose-300 focus:ring-1 focus:ring-rose-200" placeholder="Tên người ấy..." />
                  </div>
                  <label className="text-[11px] text-gray-400 font-semibold uppercase tracking-wider">Tiêu đề story</label>
                  <input type="text" value={story.hero_block.title} onChange={e => setStory({ ...story, hero_block: { ...story.hero_block, title: e.target.value } })} className="h-9 px-3 rounded-lg bg-gray-50 border border-gray-200 text-sm focus:outline-none focus:border-rose-300 focus:ring-1 focus:ring-rose-200" />
                  <label className="text-[11px] text-gray-400 font-semibold uppercase tracking-wider">Câu trích dẫn</label>
                  <input type="text" value={story.hero_block.short_quote || ''} onChange={e => setStory({ ...story, hero_block: { ...story.hero_block, short_quote: e.target.value } })} className="h-9 px-3 rounded-lg bg-gray-50 border border-gray-200 text-sm focus:outline-none focus:border-rose-300 focus:ring-1 focus:ring-rose-200" placeholder="Câu trích dẫn lãng mạn..." />
                </div>
                <div className="bg-white rounded-2xl border border-gray-100 p-4 flex flex-col gap-3 shadow-sm">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-gray-700 text-sm">Bộ đếm ngày yêu</span>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" checked={story.counter_block.is_enabled} onChange={e => setStory({ ...story, counter_block: { ...story.counter_block, is_enabled: e.target.checked } })} />
                      <div className="w-8 h-4 bg-gray-200 peer-checked:bg-rose-400 rounded-full transition-colors after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:rounded-full after:h-3 after:w-3 after:transition-all peer-checked:after:translate-x-4" />
                    </label>
                  </div>
                  <div className={story.counter_block.is_enabled ? '' : 'opacity-40 pointer-events-none'}>
                    <label className="text-[11px] text-gray-400 font-semibold uppercase tracking-wider mb-1.5 block">Ngày bắt đầu yêu</label>
                    <input type="date" value={story.counter_block.target_date ? story.counter_block.target_date.split('T')[0] : ''} onChange={e => setStory({ ...story, counter_block: { ...story.counter_block, target_date: new Date(e.target.value).toISOString() } })} className="w-full h-9 px-3 rounded-lg bg-gray-50 border border-gray-200 text-sm focus:outline-none focus:border-rose-300 focus:ring-1 focus:ring-rose-200" />
                  </div>
                </div>
              </div>
            )}

            {/* LETTER */}
            {activeSection === 'letter' && (
              <div className="p-4 flex flex-col gap-4 animate-in fade-in duration-200">
                <div className="flex items-center justify-between">
                  <h2 className="font-bold text-gray-800 text-base">Thư tình 💌</h2>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" checked={story.letter_block.is_enabled} onChange={e => setStory({ ...story, letter_block: { ...story.letter_block, is_enabled: e.target.checked } })} />
                    <div className="w-8 h-4 bg-gray-200 peer-checked:bg-rose-400 rounded-full transition-colors after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:rounded-full after:h-3 after:w-3 after:transition-all peer-checked:after:translate-x-4" />
                  </label>
                </div>
                <div className={`bg-white rounded-2xl border border-gray-100 p-4 flex flex-col gap-3 shadow-sm ${story.letter_block.is_enabled ? '' : 'opacity-40 pointer-events-none'}`}>
                  <label className="text-[11px] text-gray-400 font-semibold uppercase tracking-wider">Tiêu đề thư</label>
                  <input type="text" value={story.letter_block.heading || ''} onChange={e => setStory({ ...story, letter_block: { ...story.letter_block, heading: e.target.value } })} className="h-9 px-3 rounded-lg bg-gray-50 border border-gray-200 text-sm focus:outline-none focus:border-rose-300 focus:ring-1 focus:ring-rose-200" placeholder="Gửi em, cô gái tháng 9..." />
                  <label className="text-[11px] text-gray-400 font-semibold uppercase tracking-wider">Nội dung</label>
                  <textarea rows={8} value={story.letter_block.content || ''} onChange={e => setStory({ ...story, letter_block: { ...story.letter_block, content: e.target.value } })} className="w-full p-3 rounded-lg bg-gray-50 border border-gray-200 text-sm focus:outline-none focus:border-rose-300 focus:ring-1 focus:ring-rose-200 resize-none" placeholder="Viết những lời chân thành nhất của bạn..." />
                  <label className="text-[11px] text-gray-400 font-semibold uppercase tracking-wider">Ký tên</label>
                  <input type="text" value={story.letter_block.signature || ''} onChange={e => setStory({ ...story, letter_block: { ...story.letter_block, signature: e.target.value } })} className="h-9 px-3 rounded-lg bg-gray-50 border border-gray-200 text-sm focus:outline-none focus:border-rose-300 focus:ring-1 focus:ring-rose-200" placeholder="Yêu em mãi, ..." />
                </div>
              </div>
            )}

            {/* VIBES */}
            {activeSection === 'vibes' && (
              <div className="p-4 flex flex-col gap-4 animate-in fade-in duration-200">
                <h2 className="font-bold text-gray-800 text-base">Vibes 🎵📸</h2>
                {/* Gallery */}
                <div className="bg-white rounded-2xl border border-gray-100 p-4 flex flex-col gap-3 shadow-sm">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-gray-700 text-sm flex items-center gap-1.5">
                      <span className="material-symbols-outlined text-rose-400 text-[18px]">photo_library</span>
                      Bộ sưu tập ảnh ({photos.length})
                    </span>
                    <button type="button" disabled={isUploading} onClick={() => fileInputRef.current?.click()} className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-rose-500 text-white text-xs font-semibold hover:bg-rose-600 disabled:opacity-50 transition-colors">
                      <span className="material-symbols-outlined text-[14px]">{isUploading ? 'progress_activity' : 'add_photo_alternate'}</span>
                      {isUploading ? 'Đang tải...' : 'Thêm ảnh'}
                    </button>
                    <input ref={fileInputRef} type="file" accept="image/jpeg,image/png,image/gif,image/webp" multiple className="hidden"
                      onChange={async (e) => {
                        const files = e.target.files;
                        if (!files || !scenarioId) return;
                        setIsUploading(true);
                        try {
                          for (const file of Array.from(files)) {
                            const formData = new FormData();
                            formData.append('file', file);
                            const uploaded = await apiClient.postFormData(`/stories/${scenarioId}/photos`, formData) as any;
                            setPhotos(prev => [...prev, { id: uploaded.id, url: uploaded.url, thumbnailUrl: uploaded.thumbnailUrl, filenameOriginal: uploaded.filenameOriginal }]);
                            setStory(prev => { if (!prev) return prev; return { ...prev, gallery_block: { ...prev.gallery_block, is_enabled: true, images: [...prev.gallery_block.images, { url: uploaded.url, caption: '' }] } }; });
                          }
                          toast('Tải ảnh thành công', 'success');
                        } catch { toast('Lỗi khi tải ảnh', 'error'); }
                        finally { setIsUploading(false); e.target.value = ''; }
                      }} />
                  </div>
                  {photos.length === 0
                    ? <div className="text-center py-8 text-gray-400"><span className="material-symbols-outlined text-4xl opacity-30 block mb-1">add_photo_alternate</span><p className="text-xs">Tải lên những khoảnh khắc đẹp nhất</p></div>
                    : <div className="grid grid-cols-3 gap-2">
                        {photos.map(photo => (
                          <div key={photo.id} className="relative group rounded-xl overflow-hidden bg-gray-50 border border-gray-100 aspect-square">
                            <img src={photo.thumbnailUrl || photo.url} alt="" className="w-full h-full object-cover" />
                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                              <button type="button" onClick={async () => { if (!scenarioId) return; try { await apiClient.delete(`/stories/${scenarioId}/photos/${photo.id}`); setPhotos(p => p.filter(x => x.id !== photo.id)); setStory(prev => { if (!prev) return prev; const imgs = prev.gallery_block.images.filter(i => i.url !== photo.url); return { ...prev, gallery_block: { ...prev.gallery_block, images: imgs, is_enabled: imgs.length > 0 } }; }); toast('Đã xóa ảnh', 'success'); } catch { toast('Lỗi khi xóa ảnh', 'error'); } }} className="w-8 h-8 rounded-full bg-red-500/90 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-lg">
                                <span className="material-symbols-outlined text-[16px]">delete</span>
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                  }
                </div>
                {/* Music */}
                <div className="bg-white rounded-2xl border border-gray-100 p-4 flex flex-col gap-3 shadow-sm">
                  <span className="font-semibold text-gray-700 text-sm flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-rose-400 text-[18px]">music_note</span>
                    Nhạc nền ({musicIds.length}/{maxTracks})
                  </span>
                  {musicIds.length > 0 && (
                    <ul className="flex flex-col gap-1.5">
                      {musicIds.map((id, i) => {
                        const t = library.find(x => x.id === id);
                        return (
                          <li key={id} className="flex items-center gap-2 p-2.5 rounded-xl bg-rose-50 border border-rose-100">
                            <span className="material-symbols-outlined text-rose-300 text-[16px]">music_note</span>
                            <span className="flex-1 min-w-0 text-xs text-gray-700 truncate">{i + 1}. {t ? t.title : 'Bài đã bị gỡ'}</span>
                            <button type="button" disabled={i === 0} onClick={() => setMusicIds(ids => { const n = [...ids]; [n[i - 1], n[i]] = [n[i], n[i - 1]]; return n; })} className="w-6 h-6 rounded-full hover:bg-white disabled:opacity-30 flex items-center justify-center"><span className="material-symbols-outlined text-[14px]">arrow_upward</span></button>
                            <button type="button" disabled={i === musicIds.length - 1} onClick={() => setMusicIds(ids => { const n = [...ids]; [n[i + 1], n[i]] = [n[i], n[i + 1]]; return n; })} className="w-6 h-6 rounded-full hover:bg-white disabled:opacity-30 flex items-center justify-center"><span className="material-symbols-outlined text-[14px]">arrow_downward</span></button>
                            <button type="button" onClick={() => setMusicIds(ids => ids.filter(x => x !== id))} className="w-6 h-6 rounded-full hover:bg-red-50 text-gray-300 hover:text-red-400 flex items-center justify-center"><span className="material-symbols-outlined text-[14px]">close</span></button>
                          </li>
                        );
                      })}
                    </ul>
                  )}
                  {library.filter(t => !musicIds.includes(t.id)).length > 0 && <>
                    <p className="text-[11px] text-gray-400 font-semibold uppercase tracking-wider">Thư viện nhạc</p>
                    <ul className="flex flex-col gap-1.5">
                      {library.filter(t => !musicIds.includes(t.id)).map(t => (
                        <li key={t.id} className="flex items-center gap-2 p-2.5 rounded-xl bg-gray-50 border border-gray-100">
                          <span className="flex-1 min-w-0 text-xs text-gray-700 truncate">{t.title}{t.artist ? ` · ${t.artist}` : ''}</span>
                          <button type="button" disabled={musicIds.length >= maxTracks} onClick={() => setMusicIds(ids => [...ids, t.id])} className="px-2.5 py-1 rounded-full bg-rose-500 text-white text-[11px] font-semibold disabled:opacity-40">Thêm</button>
                        </li>
                      ))}
                    </ul>
                  </>}
                  {library.length === 0 && <p className="text-xs text-gray-400">Thư viện nhạc đang trống.</p>}
                </div>
              </div>
            )}
          </div>
        </aside>

        {/* RIGHT: live preview */}
        <main className="flex-1 flex flex-col bg-[#f5eef5] overflow-hidden">
          {/* Preview device toolbar */}
          <div className="flex items-center justify-center gap-2 pt-3 pb-2 flex-shrink-0">
            <div className="flex items-center bg-white rounded-full border border-gray-200 shadow-sm p-1 gap-1">
              <button onClick={() => setPreviewDevice('mobile')} className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold transition-all ${previewDevice === 'mobile' ? 'bg-rose-500 text-white shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}>
                <span className="material-symbols-outlined text-[14px]">smartphone</span>
                iPhone 16
              </button>
              <button onClick={() => setPreviewDevice('desktop')} className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold transition-all ${previewDevice === 'desktop' ? 'bg-rose-500 text-white shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}>
                <span className="material-symbols-outlined text-[14px]">desktop_windows</span>
                Desktop
              </button>
            </div>
            <div className="flex items-center bg-white rounded-full border border-gray-200 shadow-sm px-3 py-1">
              <span className="text-xs text-gray-500 font-medium">100%</span>
            </div>
            <button onClick={async () => { if (await handleSave()) navigate(`/editor/${scenarioId}/preview`); }} className="w-7 h-7 rounded-full bg-white border border-gray-200 shadow-sm flex items-center justify-center text-gray-500 hover:text-gray-700 hover:bg-gray-50 transition-colors">
              <span className="material-symbols-outlined text-[16px]">open_in_full</span>
            </button>
          </div>

          {/* Preview content */}
          <div className="flex-1 flex items-start justify-center overflow-hidden px-4 pb-2">
            {previewDevice === 'mobile' ? (
              <div className="relative flex-shrink-0 h-full" style={{ width: 300, maxHeight: 620 }}>
                <div className="absolute inset-0 bg-gray-900 rounded-[44px] shadow-2xl shadow-gray-900/30" />
                <div className="absolute -left-1 top-24 w-1 h-8 bg-gray-700 rounded-l-full" />
                <div className="absolute -left-1 top-36 w-1 h-10 bg-gray-700 rounded-l-full" />
                <div className="absolute -left-1 top-50 w-1 h-10 bg-gray-700 rounded-l-full" />
                <div className="absolute -right-1 top-32 w-1 h-14 bg-gray-700 rounded-r-full" />
                <div className="absolute inset-[3px] bg-black rounded-[42px] overflow-hidden">
                  <div className="absolute top-2.5 left-1/2 -translate-x-1/2 w-20 h-6 bg-black rounded-full z-10 flex items-center justify-center gap-2 px-3">
                    <span className="text-[9px] text-white/70 font-medium">5:20</span>
                    <span className="text-rose-400 text-[10px]">♥</span>
                    <span className="text-[9px] text-white/60">Lover • Taylor</span>
                  </div>
                  <div className="absolute inset-0 overflow-y-auto no-scrollbar">
                    {story.template_id === 'romantic-anniversary'
                      ? <TemplateRomanticAnniversary storyData={previewStory} />
                      : story.template_id === 'memory-wall'
                      ? <TemplateMemoryWall storyData={previewStory} />
                      : <DynamicStoryTemplate storyData={previewStory} />
                    }
                  </div>
                </div>
                <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-20 h-1 bg-white/30 rounded-full" />
              </div>
            ) : (
              <div className="w-full h-full bg-white rounded-xl border border-gray-200 shadow-lg overflow-hidden flex flex-col">
                <div className="flex items-center gap-2 px-4 py-2 border-b border-gray-100 bg-gray-50 flex-shrink-0">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-400" />
                    <div className="w-3 h-3 rounded-full bg-amber-400" />
                    <div className="w-3 h-3 rounded-full bg-emerald-400" />
                  </div>
                  <div className="flex-1 flex justify-center">
                    <div className="bg-white px-4 py-1 rounded-full text-xs text-gray-400 border border-gray-200 flex items-center gap-1.5 max-w-xs w-full justify-center">
                      <span className="material-symbols-outlined text-[12px]">lock</span>
                      couplestory.site/{story.slug}
                    </div>
                  </div>
                </div>
                <div className="flex-1 overflow-y-auto no-scrollbar">
                  {story.template_id === 'romantic-anniversary'
                    ? <TemplateRomanticAnniversary storyData={previewStory} />
                    : story.template_id === 'memory-wall'
                    ? <TemplateMemoryWall storyData={previewStory} />
                    : <DynamicStoryTemplate storyData={previewStory} />
                  }
                </div>
              </div>
            )}
          </div>

          {/* Live update hint */}
          <div className="flex-shrink-0 pb-3 flex justify-center">
            <span className="flex items-center gap-1.5 text-[11px] text-rose-400 font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-rose-400 animate-pulse" />
              Changes in left editor instantly reflect on mobile screen
            </span>
          </div>
        </main>
      </div>
    </div>
  );
}
