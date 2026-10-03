import { useCallback, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { apiClient } from '@/services/api';
import { useAuth } from '@/context/AuthContext';
import { canUsePackage } from '@/data/templatePackages';
import { TEMPLATE_THUMBNAILS } from '@/data/templateThumbnails';
import type { ContentType, Template } from '@/types';

type Sort = 'popular' | 'newest';

const PAGE_SIZE = 6;

const SORTS: { value: Sort; label: string }[] = [
  { value: 'popular', label: 'Phổ biến nhất 🔥' },
  { value: 'newest', label: 'Mới nhất ✨' },
];

const TYPES: { value: ContentType | ''; label: string }[] = [
  { value: '', label: 'Tất cả' },
  { value: 'LOVE_STORY', label: 'Love Story 📖' },
  { value: 'LOVE_CARD', label: 'Love Card 💌' },
];

const TYPE_LABEL: Record<string, string> = { LOVE_STORY: 'Love Story', LOVE_CARD: 'Love Card' };

export default function HomeTemplates() {
  const { user } = useAuth();
  const [sort, setSort] = useState<Sort>('popular');
  const [type, setType] = useState<ContentType | ''>('');
  const [search, setSearch] = useState('');
  const [query, setQuery] = useState('');
  const [items, setItems] = useState<Template[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [failed, setFailed] = useState(false);
  const [selected, setSelected] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(() => window.matchMedia('(max-width: 639px)').matches);

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 639px)');
    const onChange = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  const nextPage = useRef(0);
  const requestId = useRef(0);
  const inFlight = useRef(false);
  const sentinel = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => setQuery(search.trim()), 350);
    return () => clearTimeout(timer);
  }, [search]);

  const loadMore = useCallback(async () => {
    if (inFlight.current) return;
    inFlight.current = true;
    const id = requestId.current;
    setLoading(true);
    setFailed(false);
    try {
      const params = new URLSearchParams({ sort, page: String(nextPage.current), size: String(PAGE_SIZE) });
      if (type) params.set('type', type);
      if (query) params.set('q', query);
      const res = await apiClient.get(`/templates/explore?${params}`);
      if (id !== requestId.current) return;
      setItems(prev => [...prev, ...res.items]);
      setHasMore(res.hasMore);
      nextPage.current += 1;
    } catch {
      if (id === requestId.current) setFailed(true);
    } finally {
      if (id === requestId.current) {
        inFlight.current = false;
        setLoading(false);
      }
    }
  }, [sort, type, query]);

  useEffect(() => {
    requestId.current += 1;
    inFlight.current = false;
    nextPage.current = 0;
    setItems([]);
    setHasMore(true);
    loadMore();
  }, [loadMore]);

  useEffect(() => {
    if (items.length === 0) setSelected(null);
    else if (!selected || !items.some(t => t.code === selected)) setSelected(items[0].code);
  }, [items, selected]);

  useEffect(() => {
    const el = sentinel.current;
    if (!el || !hasMore || loading || failed) return;
    const observer = new IntersectionObserver(
      entries => { if (entries[0].isIntersecting) loadMore(); },
      { rootMargin: '300px' },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [hasMore, loading, failed, items.length, loadMore]);

  const chip = (active: boolean) =>
    `px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
      active ? 'bg-[#fff0f4] text-[#ff4d8d] font-semibold' : 'text-[#594046] hover:bg-[#fff5f9]'
    }`;

  return (
    <div className="px-4 md:px-6 pt-6 pb-20 sm:pb-6 max-w-7xl mx-auto">
      <div className="flex items-center gap-1.5 text-xs text-[#8d7076] mb-3">
        <Link to="/home" className="hover:text-[#ff4d8d]">Home</Link>
        <span>›</span>
        <span className="text-[#ff4d8d] font-medium">Mẫu thiết kế</span>
      </div>
      <h1 className="text-2xl md:text-3xl font-bold text-[#2e1220] mb-1">Chọn mẫu cho câu chuyện của bạn ✨</h1>
      <p className="text-sm text-[#594046] max-w-2xl mb-5">
        Chọn một thiết kế lãng mạn cho kỷ niệm, đám cưới hay nhật ký tình yêu của hai bạn. Tùy chỉnh chỉ trong vài phút với những khoảnh khắc yêu thích.
      </p>

      <div className="sm:sticky sm:top-14 z-30 -mx-4 md:-mx-6 px-4 md:px-6 py-2 mb-5 bg-[#faf7f8]/90 backdrop-blur">
        <div className="bg-white/80 backdrop-blur rounded-2xl border border-[#ffd6e6] shadow-[0_4px_20px_rgba(255,77,141,0.08)] p-3 md:p-4 flex flex-col gap-3">
          <div className="flex flex-col sm:flex-row gap-3 sm:items-center">
            <div className="flex-1 flex items-center gap-2 px-3.5 py-2.5 rounded-xl bg-[#faf7f8] border border-[#f0e4e8] focus-within:border-[#ff4d8d]/50">
              <span className="material-symbols-outlined text-[20px] text-[#8d7076]">search</span>
              <input
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Tìm mẫu theo tên hoặc phong cách..."
                className="flex-1 bg-transparent outline-none text-sm text-[#2e1220] placeholder:text-[#8d7076]"
              />
              {search && (
                <button onClick={() => setSearch('')} aria-label="Xóa tìm kiếm" className="text-[#8d7076] hover:text-[#2e1220]">
                  <span className="material-symbols-outlined text-[18px]">close</span>
                </button>
              )}
            </div>
            <label className="flex items-center gap-2 text-sm text-[#594046]">
              <span className="whitespace-nowrap">Sắp xếp:</span>
              <select
                value={sort}
                onChange={e => setSort(e.target.value as Sort)}
                className="flex-1 sm:flex-none px-3 py-2.5 rounded-xl bg-[#faf7f8] border border-[#f0e4e8] text-sm font-medium text-[#2e1220] outline-none cursor-pointer"
              >
                {SORTS.map(s => <option key={s.value} value={s.value}>{s.label}</option>)}
              </select>
            </label>
          </div>
          <div className="flex gap-1 overflow-x-auto no-scrollbar">
            {TYPES.map(t => (
              <button key={t.value} onClick={() => setType(t.value)} className={chip(type === t.value)}>{t.label}</button>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {items.map(t => {
          const image = t.previewImage || TEMPLATE_THUMBNAILS[t.code];
          const locked = !canUsePackage(user?.plan, t.package);
          const isSelected = isMobile && selected === t.code;
          return (
            <div key={t.code} onClick={() => isMobile && setSelected(t.code)} className={`${isSelected ? 'ring-2 ring-[#ff4d8d] ' : ''}group bg-white/70 backdrop-blur rounded-3xl border border-[#ffd6e6] shadow-[0_4px_20px_rgba(255,77,141,0.08)] hover:shadow-[0_8px_28px_rgba(168,85,247,0.15)] transition-shadow p-3 flex flex-col`}>
              <Link to={`/preview/${t.code}`} onClick={e => { if (isMobile) e.preventDefault(); }} className="block">
                <div className="aspect-[4/5] rounded-2xl bg-gradient-to-br from-[#ffe8ef] to-[#ffd6e6] overflow-hidden relative">
                  {image ? (
                    <img src={image} alt={t.name} loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <span className="material-symbols-outlined text-[48px] text-[#ff4d8d]/30">palette</span>
                    </div>
                  )}
                  <span className={`absolute top-3 left-3 inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wide ${
                    t.package === 'FREE' ? 'bg-white/90 text-emerald-600' : 'bg-gradient-to-r from-[#b5179e] to-[#7c3aed] text-white'
                  }`}>
                    {t.package === 'FREE' ? '● FREE' : `✦ ${t.package}`}
                  </span>
                  {isSelected && (
                    <span className="absolute bottom-3 left-3 inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#ff4d8d] text-white text-[11px] font-bold shadow">
                      <span className="material-symbols-outlined text-[14px]">check_circle</span>Đang chọn
                    </span>
                  )}
                  {locked && (
                    <span className="absolute top-3 right-3 w-7 h-7 rounded-full bg-black/45 text-white flex items-center justify-center">
                      <span className="material-symbols-outlined text-[16px]">lock</span>
                    </span>
                  )}
                </div>
              </Link>
              <div className="px-1.5 pt-3 pb-1 flex-1 flex flex-col">
                <div className="flex items-center justify-between text-[10px] font-bold tracking-widest uppercase mb-1">
                  <span className="text-[#7c3aed]">{TYPE_LABEL[t.type] ?? t.type}</span>
                  <span className="inline-flex items-center gap-1 text-[#8d7076] normal-case tracking-normal font-semibold text-xs">
                    <span className="material-symbols-outlined text-[14px]">group</span>
                    {(t.usageCount ?? 0).toLocaleString('vi-VN')}
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-[#2e1220] leading-snug">{t.name}</h3>
                <p className="text-sm text-[#8d7076] line-clamp-2 mt-1 mb-4 min-h-[2.5rem]">{t.description}</p>
                <div className="flex items-center gap-2 mt-auto">
                  <Link to={`/preview/${t.code}`} className="flex-1 inline-flex items-center justify-center gap-1.5 py-3 sm:py-2.5 rounded-full text-sm font-semibold bg-[#fff0f4] text-[#b90a5a] hover:bg-[#ffe0eb] transition-colors">
                    <span className="material-symbols-outlined text-[16px]">visibility</span>Xem trước
                  </Link>
                  {locked ? (
                    <Link to="/home/upgrade" className="flex-1 hidden sm:inline-flex items-center justify-center gap-1.5 py-2.5 rounded-full text-sm font-semibold bg-gradient-to-r from-[#b5179e] to-[#7c3aed] text-white hover:opacity-90 transition-opacity">
                      <span className="material-symbols-outlined text-[16px]">lock</span>Nâng cấp
                    </Link>
                  ) : (
                    <Link to={`/home?applyTemplate=${t.code}`} className="flex-1 hidden sm:inline-flex items-center justify-center gap-1.5 py-2.5 rounded-full text-sm font-semibold bg-gradient-to-r from-[#ff4d8d] to-[#a855f7] text-white shadow-[0_4px_14px_rgba(168,85,247,0.35)] hover:shadow-[0_6px_18px_rgba(168,85,247,0.45)] transition-shadow">
                      Dùng mẫu<span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                    </Link>
                  )}
                </div>
              </div>
            </div>
          );
        })}

        {loading && Array.from({ length: items.length === 0 ? PAGE_SIZE : 3 }).map((_, i) => (
          <div key={`sk-${i}`} className="animate-pulse bg-white rounded-3xl border border-[#f0e4e8] p-3">
            <div className="aspect-[4/5] rounded-2xl bg-[#f3e6ea] mb-3" />
            <div className="h-3 w-1/3 rounded bg-[#f3e6ea] mb-2" />
            <div className="h-4 w-2/3 rounded bg-[#f3e6ea] mb-2" />
            <div className="h-3 w-full rounded bg-[#f3e6ea]" />
          </div>
        ))}
      </div>

      {failed && (
        <div className="text-center py-8 text-sm text-[#594046]">
          Không tải được mẫu.{' '}
          <button onClick={loadMore} className="text-[#ff4d8d] font-semibold hover:underline">Thử lại</button>
        </div>
      )}
      {!loading && !failed && items.length === 0 && (
        <p className="text-center py-12 text-sm text-[#8d7076]">
          {query ? `Không tìm thấy mẫu nào cho "${query}".` : 'Chưa có mẫu nào.'}
        </p>
      )}
      {!hasMore && items.length > 0 && (
        <p className="text-center py-8 text-xs text-[#8d7076]">Bạn đã xem hết các mẫu 💕</p>
      )}
      <div ref={sentinel} className="h-1" />

      {(() => {
        const current = items.find(t => t.code === selected);
        if (!current) return null;
        const locked = !canUsePackage(user?.plan, current.package);
        return (
          <div className="sm:hidden fixed bottom-16 inset-x-0 z-30 px-4 pt-6 pb-2 bg-gradient-to-t from-white via-white/90 to-transparent pointer-events-none [&>*]:pointer-events-auto">
            <Link
              to={locked ? '/home/upgrade' : `/home?applyTemplate=${current.code}`}
              className={`w-full inline-flex items-center justify-center gap-2 py-3.5 rounded-full text-base font-semibold text-white shadow-[0_6px_20px_rgba(168,85,247,0.45)] ${
                locked ? 'bg-gradient-to-r from-[#b5179e] to-[#7c3aed]' : 'bg-gradient-to-r from-[#ff4d8d] to-[#a855f7]'
              }`}
            >
              {locked
                ? <><span className="material-symbols-outlined text-[18px]">lock</span>Nâng cấp để dùng mẫu này</>
                : <>Tiếp tục với mẫu này<span className="material-symbols-outlined text-[18px]">arrow_forward</span></>}
            </Link>
            <p className="text-center text-[11px] text-[#8d7076] mt-1.5">Có thể thay đổi mẫu bất kỳ lúc nào</p>
          </div>
        );
      })()}
    </div>
  );
}
