import { useState, useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import type { StoryData } from '@/data/mockScenarios';
import DynamicStoryTemplate from '@/templates/DynamicStoryTemplate';
import TemplateRomanticAnniversary from '@/templates/TemplateRomanticAnniversary';
import TemplateMemoryWall from '@/templates/TemplateMemoryWall';
import { apiClient } from '@/services/api';
import { toast } from '@/utils/toast';

interface ServerPhoto {
  id: string;
  url: string;
  thumbnailUrl?: string;
  filenameOriginal?: string;
  sortOrder?: number;
}

export default function StoryEditor() {
  const { scenarioId } = useParams();
  const [story, setStory] = useState<StoryData | null>(null);
  const [activeTab, setActiveTab] = useState<'hero' | 'counter' | 'letter' | 'timeline' | 'gallery'>('hero');
  const [isSaving, setIsSaving] = useState(false);
  const [photos, setPhotos] = useState<ServerPhoto[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!scenarioId) return;
    
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
        setStory(mappedData);
        setPhotos(photosRes.map((p: any) => ({ id: p.id, url: p.url, thumbnailUrl: p.thumbnailUrl, filenameOriginal: p.filenameOriginal, sortOrder: p.sortOrder })));
      } catch (error) {
        console.error("Failed to fetch story data", error);
      }
    };
    
    fetchData();
  }, [scenarioId]);

  const handleSave = async () => {
    if (!story || !scenarioId) return;
    setIsSaving(true);
    try {
      // Basic story details
      await apiClient.put(`/stories/${scenarioId}`, {
        coupleName1: story.hero_block.partner_a.name,
        coupleName2: story.hero_block.partner_b.name,
        title: story.hero_block.title,
        shortQuote: story.hero_block.short_quote,
        startDate: story.counter_block.target_date,
      });

      // Love letter message (upsert)
      if (story.letter_block.is_enabled) {
        await apiClient.post(`/stories/${scenarioId}/messages`, {
          type: 'love_letter',
          heading: story.letter_block.heading,
          title: story.letter_block.heading,
          content: story.letter_block.content,
          signature: story.letter_block.signature,
        });
      }

      // Timeline events
      if (story.timeline_block.is_enabled) {
        const existingEvents = await apiClient.get(`/stories/${scenarioId}/events`);
        const existingIds = new Set((existingEvents as any[]).map((e: any) => e.id));
        const currentIds = new Set(story.timeline_block.events.filter(e => e.id).map(e => e.id));

        // Delete removed events
        for (const existing of existingEvents as any[]) {
          if (!currentIds.has(existing.id)) {
            await apiClient.delete(`/stories/${scenarioId}/events/${existing.id}`);
          }
        }

        // Create or update events
        for (let i = 0; i < story.timeline_block.events.length; i++) {
          const ev = story.timeline_block.events[i];
          const payload = { title: ev.title, description: ev.description, eventDate: ev.date, order: i };
          if (ev.id && existingIds.has(ev.id)) {
            await apiClient.put(`/stories/${scenarioId}/events/${ev.id}`, payload);
          } else {
            const created = await apiClient.post(`/stories/${scenarioId}/events`, payload);
            story.timeline_block.events[i] = { ...ev, id: (created as any).id };
          }
        }
      }

      toast('Đã lưu thành công', 'success');
    } catch (error) {
      console.error("Failed to save", error);
      toast('Lỗi khi lưu', 'error');
    } finally {
      setIsSaving(false);
    }
  };

  if (!story) return <div className="flex h-screen items-center justify-center">Đang tải...</div>;

  return (
    <div className="flex h-screen bg-surface overflow-hidden">
      {/* LEFT SIDEBAR - EDITOR PANELS */}
      <aside className="w-[400px] flex-shrink-0 bg-surface-container-lowest border-r border-outline-variant/30 flex flex-col z-20 shadow-xl">
        {/* Editor Header */}
        <div className="h-16 px-4 border-b border-outline-variant/30 flex items-center justify-between bg-surface">
          <div className="flex items-center gap-2">
            <Link to="/dashboard" className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-surface-container transition-colors text-on-surface-variant">
              <span className="material-symbols-outlined text-[20px]">arrow_back</span>
            </Link>
            <span className="font-title-md text-on-surface font-semibold truncate max-w-[200px]">Trình chỉnh sửa</span>
          </div>
          <button 
            onClick={handleSave}
            disabled={isSaving}
            className={`px-4 py-1.5 ${isSaving ? 'bg-primary/50' : 'bg-primary'} text-on-primary rounded-full font-label-md hover:bg-primary/90 transition-colors shadow-sm`}>
            {isSaving ? 'Đang lưu...' : 'Lưu & Xuất bản'}
          </button>
        </div>

        {/* Editor Tabs */}
        <div className="flex px-1 pt-2 border-b border-outline-variant/20 overflow-x-auto no-scrollbar">
          {([['hero', 'view_day', 'Hero'], ['counter', 'timer', 'Đếm'], ['letter', 'mail', 'Thư'], ['timeline', 'timeline', 'Sự kiện'], ['gallery', 'photo_library', 'Ảnh']] as const).map(([key, icon, label]) => (
            <button key={key} onClick={() => setActiveTab(key as any)} className={`flex items-center gap-1 px-2.5 py-2 font-label-sm border-b-2 transition-colors whitespace-nowrap ${activeTab === key ? 'border-primary text-primary' : 'border-transparent text-on-surface-variant hover:text-on-surface hover:bg-surface-container-low rounded-t-lg'}`}>
              <span className="material-symbols-outlined text-[15px]">{icon}</span>
              {label}
            </button>
          ))}
        </div>

        {/* Editor Forms */}
        <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-6">
          {activeTab === 'hero' && (
            <div className="flex flex-col gap-4 animate-in fade-in slide-in-from-left-4 duration-300">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-title-md text-on-surface font-semibold flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary text-[20px]">view_day</span>
                  Khối Tổng quan (Hero)
                </h3>
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="font-label-sm text-on-surface-variant uppercase tracking-wider">Tên cặp đôi</label>
                <div className="flex gap-2">
                  <input type="text" value={story.hero_block.partner_a.name} onChange={e => setStory({ ...story, hero_block: { ...story.hero_block, partner_a: { ...story.hero_block.partner_a, name: e.target.value } } })} className="flex-1 h-10 px-3 rounded-lg bg-surface-container-low border border-outline-variant/50 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary" />
                  <span className="flex items-center text-outline">&amp;</span>
                  <input type="text" value={story.hero_block.partner_b.name} onChange={e => setStory({ ...story, hero_block: { ...story.hero_block, partner_b: { ...story.hero_block.partner_b, name: e.target.value } } })} className="flex-1 h-10 px-3 rounded-lg bg-surface-container-low border border-outline-variant/50 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary" />
                </div>
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="font-label-sm text-on-surface-variant uppercase tracking-wider">Tiêu đề lớn</label>
                <input type="text" value={story.hero_block.title} onChange={e => setStory({ ...story, hero_block: { ...story.hero_block, title: e.target.value } })} className="w-full h-10 px-3 rounded-lg bg-surface-container-low border border-outline-variant/50 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary" />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="font-label-sm text-on-surface-variant uppercase tracking-wider">Câu trích dẫn ngắn</label>
                <input type="text" value={story.hero_block.short_quote || ''} onChange={e => setStory({ ...story, hero_block: { ...story.hero_block, short_quote: e.target.value } })} className="w-full h-10 px-3 rounded-lg bg-surface-container-low border border-outline-variant/50 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary" />
              </div>
            </div>
          )}

          {activeTab === 'counter' && (
            <div className="flex flex-col gap-4 animate-in fade-in slide-in-from-left-4 duration-300">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-title-md text-on-surface font-semibold flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary text-[20px]">timer</span>
                  Khối Bộ đếm
                </h3>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" checked={story.counter_block.is_enabled} onChange={e => setStory({ ...story, counter_block: { ...story.counter_block, is_enabled: e.target.checked } })} />
                  <div className="w-9 h-5 bg-surface-container-high peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-primary"></div>
                </label>
              </div>
              <div className={`flex flex-col gap-4 transition-opacity ${story.counter_block.is_enabled ? 'opacity-100' : 'opacity-40 pointer-events-none'}`}>
                <div className="flex flex-col gap-1.5">
                  <label className="font-label-sm text-on-surface-variant uppercase tracking-wider">Ngày mục tiêu (Đã yêu/Sắp cưới)</label>
                  <input type="date" value={story.counter_block.target_date ? story.counter_block.target_date.split('T')[0] : ''} onChange={e => setStory({ ...story, counter_block: { ...story.counter_block, target_date: new Date(e.target.value).toISOString() } })} className="w-full h-10 px-3 rounded-lg bg-surface-container-low border border-outline-variant/50 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary" />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="font-label-sm text-on-surface-variant uppercase tracking-wider">Dòng chữ hiển thị</label>
                  <input type="text" value={story.counter_block.label_text || ''} onChange={e => setStory({ ...story, counter_block: { ...story.counter_block, label_text: e.target.value } })} className="w-full h-10 px-3 rounded-lg bg-surface-container-low border border-outline-variant/50 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary" placeholder="Vd: Chúng mình đã bên nhau được..." />
                </div>
              </div>
            </div>
          )}

          {activeTab === 'letter' && (
            <div className="flex flex-col gap-4 animate-in fade-in slide-in-from-left-4 duration-300">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-title-md text-on-surface font-semibold flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary text-[20px]">mail</span>
                  Khối Thư tình
                </h3>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" checked={story.letter_block.is_enabled} onChange={e => setStory({ ...story, letter_block: { ...story.letter_block, is_enabled: e.target.checked } })} />
                  <div className="w-9 h-5 bg-surface-container-high peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-primary"></div>
                </label>
              </div>
              <div className={`flex flex-col gap-4 transition-opacity ${story.letter_block.is_enabled ? 'opacity-100' : 'opacity-40 pointer-events-none'}`}>
                <div className="flex flex-col gap-1.5">
                  <label className="font-label-sm text-on-surface-variant uppercase tracking-wider">Tiêu đề thư</label>
                  <input type="text" value={story.letter_block.heading || ''} onChange={e => setStory({ ...story, letter_block: { ...story.letter_block, heading: e.target.value } })} className="w-full h-10 px-3 rounded-lg bg-surface-container-low border border-outline-variant/50 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary" placeholder="Vd: Gửi em, cô gái tháng 9..." />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="font-label-sm text-on-surface-variant uppercase tracking-wider">Nội dung thư</label>
                  <textarea rows={6} value={story.letter_block.content || ''} onChange={e => setStory({ ...story, letter_block: { ...story.letter_block, content: e.target.value } })} className="w-full p-3 rounded-lg bg-surface-container-low border border-outline-variant/50 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary resize-none" placeholder="Viết những lời chân thành nhất của bạn vào đây..." />
                </div>
              </div>
            </div>
          )}

          {activeTab === 'timeline' && (
            <div className="flex flex-col gap-4 animate-in fade-in slide-in-from-left-4 duration-300">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-title-md text-on-surface font-semibold flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary text-[20px]">timeline</span>
                  Dòng thời gian
                </h3>
                <button
                  type="button"
                  onClick={() => {
                    const events = [...story.timeline_block.events, { id: '', date: '', title: '', description: '', media_url: '' }];
                    setStory({ ...story, timeline_block: { ...story.timeline_block, is_enabled: true, events } });
                  }}
                  className="px-3 py-1.5 bg-primary text-on-primary rounded-full font-label-sm hover:bg-primary/90 transition-colors flex items-center gap-1"
                >
                  <span className="material-symbols-outlined text-[16px]">add</span>
                  Thêm sự kiện
                </button>
              </div>

              {story.timeline_block.events.length === 0 && (
                <div className="text-center py-8 text-on-surface-variant">
                  <span className="material-symbols-outlined text-4xl mb-2 block opacity-40">event</span>
                  <p className="font-body-md">Chưa có sự kiện nào</p>
                  <p className="font-body-sm opacity-70">Thêm sự kiện đầu tiên của hai bạn</p>
                </div>
              )}

              {story.timeline_block.events.map((ev, idx) => (
                <div key={ev.id || idx} className="bg-surface-container-low rounded-xl p-4 border border-outline-variant/30 flex flex-col gap-3 relative group">
                  <div className="flex items-center justify-between">
                    <span className="font-label-sm text-primary font-semibold">Sự kiện {idx + 1}</span>
                    <button
                      type="button"
                      onClick={() => {
                        const events = story.timeline_block.events.filter((_, i) => i !== idx);
                        setStory({ ...story, timeline_block: { ...story.timeline_block, events, is_enabled: events.length > 0 } });
                      }}
                      className="w-7 h-7 flex items-center justify-center rounded-full hover:bg-error/10 text-on-surface-variant hover:text-error transition-colors opacity-0 group-hover:opacity-100"
                    >
                      <span className="material-symbols-outlined text-[18px]">delete</span>
                    </button>
                  </div>
                  <input
                    type="text"
                    placeholder="Tiêu đề sự kiện"
                    value={ev.title}
                    onChange={e => {
                      const events = [...story.timeline_block.events];
                      events[idx] = { ...events[idx], title: e.target.value };
                      setStory({ ...story, timeline_block: { ...story.timeline_block, events } });
                    }}
                    className="w-full h-10 px-3 rounded-lg bg-surface border border-outline-variant/50 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                  />
                  <input
                    type="date"
                    value={ev.date ? ev.date.split('T')[0] : ''}
                    onChange={e => {
                      const events = [...story.timeline_block.events];
                      events[idx] = { ...events[idx], date: e.target.value };
                      setStory({ ...story, timeline_block: { ...story.timeline_block, events } });
                    }}
                    className="w-full h-10 px-3 rounded-lg bg-surface border border-outline-variant/50 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                  />
                  <textarea
                    rows={2}
                    placeholder="Mô tả ngắn..."
                    value={ev.description}
                    onChange={e => {
                      const events = [...story.timeline_block.events];
                      events[idx] = { ...events[idx], description: e.target.value };
                      setStory({ ...story, timeline_block: { ...story.timeline_block, events } });
                    }}
                    className="w-full p-3 rounded-lg bg-surface border border-outline-variant/50 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary resize-none"
                  />
                </div>
              ))}
            </div>
          )}

          {activeTab === 'gallery' && (
            <div className="flex flex-col gap-4 animate-in fade-in slide-in-from-left-4 duration-300">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-title-md text-on-surface font-semibold flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary text-[20px]">photo_library</span>
                  Bộ sưu tập ảnh
                </h3>
                <button
                  type="button"
                  disabled={isUploading}
                  onClick={() => fileInputRef.current?.click()}
                  className="px-3 py-1.5 bg-primary text-on-primary rounded-full font-label-sm hover:bg-primary/90 transition-colors flex items-center gap-1 disabled:opacity-50"
                >
                  <span className="material-symbols-outlined text-[16px]">{isUploading ? 'progress_activity' : 'add_photo_alternate'}</span>
                  {isUploading ? 'Đang tải...' : 'Thêm ảnh'}
                </button>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/jpeg,image/png,image/gif,image/webp"
                  multiple
                  className="hidden"
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
                        setStory(prev => {
                          if (!prev) return prev;
                          return {
                            ...prev,
                            gallery_block: {
                              ...prev.gallery_block,
                              is_enabled: true,
                              images: [...prev.gallery_block.images, { url: uploaded.url, caption: '' }],
                            },
                          };
                        });
                      }
                      toast('Tải ảnh thành công', 'success');
                    } catch {
                      toast('Lỗi khi tải ảnh', 'error');
                    } finally {
                      setIsUploading(false);
                      e.target.value = '';
                    }
                  }}
                />
              </div>

              {photos.length === 0 && (
                <div className="text-center py-10 text-on-surface-variant">
                  <span className="material-symbols-outlined text-5xl mb-3 block opacity-30">add_photo_alternate</span>
                  <p className="font-body-md">Chưa có ảnh nào</p>
                  <p className="font-body-sm opacity-70 mt-1">Tải lên những khoảnh khắc đẹp nhất</p>
                </div>
              )}

              <div className="grid grid-cols-2 gap-3">
                {photos.map((photo) => (
                  <div key={photo.id} className="relative group rounded-xl overflow-hidden bg-surface-container-low border border-outline-variant/30 aspect-square">
                    <img
                      src={photo.thumbnailUrl || photo.url}
                      alt={photo.filenameOriginal || ''}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors flex items-center justify-center">
                      <button
                        type="button"
                        onClick={async () => {
                          if (!scenarioId) return;
                          try {
                            await apiClient.delete(`/stories/${scenarioId}/photos/${photo.id}`);
                            setPhotos(prev => prev.filter(p => p.id !== photo.id));
                            setStory(prev => {
                              if (!prev) return prev;
                              const images = prev.gallery_block.images.filter(img => img.url !== photo.url);
                              return { ...prev, gallery_block: { ...prev.gallery_block, images, is_enabled: images.length > 0 } };
                            });
                            toast('Đã xóa ảnh', 'success');
                          } catch {
                            toast('Lỗi khi xóa ảnh', 'error');
                          }
                        }}
                        className="w-9 h-9 rounded-full bg-error/90 text-on-error flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-lg hover:bg-error"
                      >
                        <span className="material-symbols-outlined text-[18px]">delete</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {photos.length > 0 && (
                <p className="font-body-sm text-on-surface-variant text-center opacity-70">
                  {photos.length} ảnh &middot; Di chuột vào ảnh để xóa
                </p>
              )}
            </div>
          )}

          <div className="mt-auto pt-6 border-t border-outline-variant/20">
            <div className="bg-primary/5 border border-primary/20 rounded-xl p-4 flex gap-3">
              <span className="material-symbols-outlined text-primary text-[20px]">tips_and_updates</span>
              <p className="font-body-sm text-on-surface-variant leading-relaxed">
                <strong className="text-primary block mb-1">Mẹo nhỏ:</strong>
                Chỉnh sửa ở form bên trên, màn hình bên phải sẽ <strong className="text-on-surface">tự động cập nhật trực tiếp (Live Update)</strong> để bạn xem trước kết quả!
              </p>
            </div>
          </div>
        </div>
      </aside>

      {/* RIGHT PREVIEW AREA - LIVE TEMPLATE */}
      <main className="flex-1 bg-surface-container-low relative overflow-hidden flex flex-col items-center">
        {/* Fake Browser Topbar */}
        <div className="absolute top-4 left-4 right-4 h-12 bg-surface border border-outline-variant/30 rounded-t-xl z-10 flex items-center px-4 gap-4 shadow-sm">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-400"></div>
            <div className="w-3 h-3 rounded-full bg-amber-400"></div>
            <div className="w-3 h-3 rounded-full bg-emerald-400"></div>
          </div>
          <div className="flex-1 flex justify-center">
            <div className="bg-surface-container px-6 py-1.5 rounded-full font-label-sm text-on-surface-variant flex items-center gap-2">
              <span className="material-symbols-outlined text-[16px]">lock</span>
              couplestory.site/{story.slug}
            </div>
          </div>
        </div>
        
        {/* Iframe-like Preview Wrapper */}
        <div className="absolute top-16 left-4 right-4 bottom-4 bg-surface rounded-b-xl border border-outline-variant/30 border-t-0 shadow-lg overflow-y-auto no-scrollbar relative">
          <div className="pointer-events-none absolute inset-0 z-50 shadow-[inset_0_0_0_1px_rgba(0,0,0,0.05)] rounded-b-xl"></div>
          {/* RENDER DYNAMIC TEMPLATE HERE WITH LIVE DATA */}
          {story.template_id === 'romantic-anniversary'
            ? <TemplateRomanticAnniversary storyData={story} />
            : story.template_id === 'memory-wall'
            ? <TemplateMemoryWall storyData={story} />
            : <DynamicStoryTemplate storyData={story} />
          }
        </div>
      </main>
    </div>
  );
}
