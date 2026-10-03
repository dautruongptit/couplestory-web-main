import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { apiClient } from '@/services/api';
import { toast } from '@/utils/toast';
import { useAuth } from '@/context/AuthContext';
import { useTemplates } from '@/hooks/useTemplates';
import { canUsePackage } from '@/data/templatePackages';
import { TEMPLATE_THEMES, getTemplateTheme } from '@/data/templateThemes';
import type { Template } from '@/types';

interface ServerEvent {
  id: string;
  title: string;
  isVisible: boolean;
  sortOrder: number;
}

interface Props {
  storyId: string;
  storyType: string;
  currentCode: string;
  onClose: () => void;
  onChanged: (templateCode: string, events: ServerEvent[]) => void;
}

type FilterCategory = 'all' | 'minimal' | 'cinematic' | 'vintage' | 'romantic' | 'occasion';

const FILTER_OPTIONS: { key: FilterCategory; label: string; icon: string }[] = [
  { key: 'all', label: 'Tất cả', icon: 'apps' },
  { key: 'minimal', label: 'Tối giản', icon: 'format_align_left' },
  { key: 'cinematic', label: 'Điện ảnh', icon: 'movie' },
  { key: 'vintage', label: 'Vintage', icon: 'photo_camera' },
  { key: 'romantic', label: 'Lãng mạn', icon: 'favorite' },
  { key: 'occasion', label: 'Dịp đặc biệt', icon: 'cake' },
];

/* Simple keyword-based categorization for filter chips */
function categorizeTemplate(t: Template): FilterCategory[] {
  const name = (t.name + ' ' + (t.description || '')).toLowerCase();
  const cats: FilterCategory[] = [];
  if (/minimal|editorial|tối giản|clean/.test(name)) cats.push('minimal');
  if (/cinem|dramatic|film|điện ảnh/.test(name)) cats.push('cinematic');
  if (/vintage|retro|classic|cổ điển|paris|autumn/.test(name)) cats.push('vintage');
  if (/romantic|love|anniversary|lãng mạn|eternal|sunset|memory|polaroid/.test(name)) cats.push('romantic');
  if (/birthday|wedding|confession|sinh nhật|cưới|tỏ tình|neon|bloom/.test(name)) cats.push('occasion');
  return cats.length > 0 ? cats : ['minimal'];
}

function getThemePreviewColors(code: string) {
  const theme = TEMPLATE_THEMES[code];
  if (!theme) return { bg: '#f5f5f5', accent: '#e91e63', ink: '#333' };
  return { bg: theme.bg, accent: theme.accent, ink: theme.ink };
}

export default function ChangeTemplateModal({ storyId, storyType, currentCode, onClose, onChanged }: Props) {
  const { user } = useAuth();
  const { templates } = useTemplates();
  const [busy, setBusy] = useState(false);
  const [filter, setFilter] = useState<FilterCategory>('all');
  const [hoveredCode, setHoveredCode] = useState<string | null>(null);
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null);

  // Step 2: event selection state
  const [picked, setPicked] = useState<Template | null>(null);
  const [events, setEvents] = useState<ServerEvent[]>([]);
  const [selected, setSelected] = useState<Set<string>>(new Set());

  const options = templates.filter(t => t.type === storyType);

  const filteredOptions = useMemo(() => {
    if (filter === 'all') return options;
    return options.filter(t => categorizeTemplate(t).includes(filter));
  }, [options, filter]);

  const previewTemplate = selectedTemplate || options.find(t => t.code === (hoveredCode || currentCode)) || options[0];
  const previewColors = previewTemplate ? getThemePreviewColors(previewTemplate.code) : getThemePreviewColors(currentCode);
  const previewTheme = previewTemplate ? getTemplateTheme(previewTemplate.code) : getTemplateTheme(currentCode);

  const putVisibility = async (ids: string[]): Promise<ServerEvent[]> =>
    apiClient.put(`/stories/${storyId}/events/visibility`, ids);

  const handleApply = async (t: Template) => {
    setBusy(true);
    try {
      await apiClient.put(`/stories/${storyId}/template`, { templateCode: t.code });
      const list: ServerEvent[] = await apiClient.get(`/stories/${storyId}/events`);

      if (list.length <= t.maxDisplayEvents) {
        const updated = await putVisibility(list.map(e => e.id));
        if (list.length < t.recommendedEvents) {
          toast(`Mẫu này đẹp nhất với ${t.recommendedEvents} kỷ niệm, bạn có thể thêm ${t.recommendedEvents - list.length} kỷ niệm nữa.`, 'success');
        } else {
          toast('Đã đổi mẫu thành công! ✨', 'success');
        }
        onChanged(t.code, updated);
        return;
      }

      // More events than template can show → go to step 2
      const visibleFirst = [...list].sort((a, b) => Number(b.isVisible) - Number(a.isVisible) || a.sortOrder - b.sortOrder);
      setSelected(new Set(visibleFirst.slice(0, t.maxDisplayEvents).map(e => e.id)));
      setEvents([...list].sort((a, b) => a.sortOrder - b.sortOrder));
      setPicked(t);
    } catch (error: any) {
      toast(error?.message || 'Không đổi được mẫu', 'error');
    } finally {
      setBusy(false);
    }
  };

  const toggle = (id: string) => {
    setSelected(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else if (picked && next.size < picked.maxDisplayEvents) next.add(id);
      return next;
    });
  };

  const applyWithEvents = async () => {
    if (!picked) return;
    setBusy(true);
    try {
      const ordered = events.filter(e => selected.has(e.id)).map(e => e.id);
      const updated = await putVisibility(ordered);
      toast('Đã đổi mẫu thành công! ✨', 'success');
      onChanged(picked.code, updated);
    } catch (error: any) {
      toast(error?.message || 'Không áp dụng được', 'error');
    } finally {
      setBusy(false);
    }
  };

  // ── Step 2: Event selection ──
  if (picked) {
    return (
      <div className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
        <div className="bg-surface rounded-3xl shadow-2xl w-full max-w-2xl max-h-[85vh] overflow-hidden flex flex-col animate-in fade-in zoom-in-95 duration-300">
          {/* Header */}
          <div className="px-6 pt-6 pb-4 border-b border-outline-variant/30">
            <div className="flex items-center gap-3 mb-2">
              <button
                onClick={() => setPicked(null)}
                className="w-9 h-9 rounded-full bg-surface-container hover:bg-surface-container-high flex items-center justify-center text-on-surface-variant transition-colors"
              >
                <span className="material-symbols-outlined text-[20px]">arrow_back</span>
              </button>
              <div>
                <h2 className="font-headline-md text-on-surface">Chọn kỷ niệm hiển thị</h2>
                <p className="font-body-sm text-on-surface-variant mt-0.5">
                  Mẫu "<span className="text-primary font-medium">{picked.name}</span>" hiển thị tối đa{' '}
                  <span className="font-semibold text-on-surface">{picked.maxDisplayEvents}</span> kỷ niệm
                </p>
              </div>
            </div>
            {/* Progress indicator */}
            <div className="flex items-center gap-2 mt-3">
              <div className="flex-1 h-1.5 rounded-full bg-primary/20">
                <div
                  className="h-full rounded-full bg-primary transition-all duration-500"
                  style={{ width: `${Math.min((selected.size / picked.maxDisplayEvents) * 100, 100)}%` }}
                />
              </div>
              <span className="font-label-md text-primary font-semibold whitespace-nowrap">
                {selected.size}/{picked.maxDisplayEvents}
              </span>
            </div>
          </div>

          {/* Event list */}
          <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-2">
            <div className="bg-tertiary-container/30 border border-tertiary/20 rounded-xl p-3 flex items-start gap-2 mb-2">
              <span className="material-symbols-outlined text-tertiary text-[18px] mt-0.5">info</span>
              <p className="font-body-sm text-on-surface-variant">
                Kỷ niệm không được chọn vẫn <strong className="text-on-surface">được lưu trữ an toàn</strong> trong hệ thống.
                Bạn có thể bật lại bất kỳ lúc nào.
              </p>
            </div>

            {events.map(e => {
              const checked = selected.has(e.id);
              const full = !checked && selected.size >= picked.maxDisplayEvents;
              return (
                <label
                  key={e.id}
                  className={`flex items-center gap-3 p-4 rounded-2xl border-2 transition-all cursor-pointer ${
                    checked
                      ? 'border-primary bg-primary/5 shadow-sm'
                      : full
                      ? 'border-outline-variant/20 opacity-40 cursor-not-allowed'
                      : 'border-outline-variant/30 hover:border-primary/30 hover:bg-surface-container-lowest'
                  }`}
                >
                  <div className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all ${
                    checked ? 'bg-primary border-primary' : 'border-outline-variant'
                  }`}>
                    {checked && <span className="material-symbols-outlined text-on-primary text-[16px]">check</span>}
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="font-body-md text-on-surface block truncate">
                      {e.title || '(chưa có tiêu đề)'}
                    </span>
                  </div>
                  {e.isVisible && (
                    <span className="px-2 py-0.5 rounded-full bg-surface-container font-label-sm text-on-surface-variant text-[11px]">
                      Đang hiện
                    </span>
                  )}
                  <input type="checkbox" checked={checked} disabled={full} onChange={() => toggle(e.id)} className="sr-only" />
                </label>
              );
            })}
          </div>

          {/* Footer */}
          <div className="px-6 py-4 border-t border-outline-variant/30 bg-surface-container-lowest/50 flex items-center justify-between gap-3">
            <button
              onClick={() => setPicked(null)}
              className="px-5 py-2.5 rounded-full font-label-md text-on-surface-variant hover:bg-surface-container transition-colors"
            >
              Quay lại
            </button>
            <button
              disabled={busy || selected.size === 0}
              onClick={applyWithEvents}
              className="px-8 py-2.5 rounded-full bg-primary text-on-primary font-title-md shadow-md hover:shadow-lg disabled:opacity-40 transition-all flex items-center gap-2"
            >
              {busy ? (
                <>
                  <span className="material-symbols-outlined text-[18px] animate-spin">progress_activity</span>
                  Đang áp dụng...
                </>
              ) : (
                <>
                  <span className="material-symbols-outlined text-[18px]">check_circle</span>
                  Áp dụng mẫu
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ── Step 1: Template gallery with preview ──
  return (
    <div className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 md:p-6">
      <div className="bg-surface rounded-3xl shadow-2xl w-full max-w-[1200px] h-[calc(100vh-48px)] md:h-[calc(100vh-96px)] max-h-[800px] overflow-hidden flex flex-col animate-in fade-in zoom-in-95 duration-300">
        {/* ── Top bar ── */}
        <div className="flex items-center justify-between px-6 pt-5 pb-3 border-b border-outline-variant/20">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-primary/10 flex items-center justify-center">
              <span className="material-symbols-outlined text-primary text-[22px]">style</span>
            </div>
            <div>
              <h2 className="font-headline-md text-on-surface leading-tight">Đổi mẫu giao diện</h2>
              <p className="font-body-sm text-on-surface-variant flex items-center gap-1.5">
                Hiển thị mẫu cùng loại:
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-primary/10 text-primary font-label-sm text-[11px] font-semibold">
                  {storyType === 'LOVE_CARD' ? '💌 Love Card' : '❤️ Love Story'}
                </span>
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full bg-surface-container hover:bg-surface-container-high flex items-center justify-center text-on-surface-variant transition-colors"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        {/* ── Main content: Gallery + Preview ── */}
        <div className="flex-1 flex overflow-hidden">
          {/* ── LEFT: Template gallery ── */}
          <div className="w-full md:w-[420px] lg:w-[480px] flex-shrink-0 border-r border-outline-variant/20 flex flex-col bg-surface-container-lowest/50">
            {/* Filter chips */}
            <div className="flex items-center gap-1.5 px-4 py-3 border-b border-outline-variant/10 overflow-x-auto no-scrollbar">
              {FILTER_OPTIONS.map(f => (
                <button
                  key={f.key}
                  onClick={() => setFilter(f.key)}
                  className={`shrink-0 flex items-center gap-1.5 px-3.5 py-1.5 rounded-full font-label-md transition-all ${
                    filter === f.key
                      ? 'bg-primary-container text-on-primary shadow-sm'
                      : 'bg-surface-container-low text-on-surface-variant hover:bg-surface-container hover:text-on-surface'
                  }`}
                >
                  <span className="material-symbols-outlined text-[16px]">{f.icon}</span>
                  {f.label}
                </button>
              ))}
            </div>

            {/* Template grid */}
            <div className="flex-1 overflow-y-auto p-3">
              <div className="grid grid-cols-2 gap-3">
                {filteredOptions.map(t => {
                  const locked = !canUsePackage(user?.plan, t.package);
                  const isCurrent = t.code === currentCode;
                  const isSelected = selectedTemplate?.code === t.code;
                  const colors = getThemePreviewColors(t.code);

                  return (
                    <button
                      key={t.code}
                      onClick={() => !locked && setSelectedTemplate(t)}
                      onMouseEnter={() => setHoveredCode(t.code)}
                      onMouseLeave={() => setHoveredCode(null)}
                      disabled={locked}
                      className={`group relative text-left rounded-2xl overflow-hidden border-2 transition-all duration-200 ${
                        isSelected
                          ? 'border-primary shadow-lg ring-2 ring-primary/20 scale-[1.02]'
                          : isCurrent
                          ? 'border-primary/40 bg-primary/5'
                          : locked
                          ? 'border-outline-variant/20 opacity-60 cursor-not-allowed'
                          : 'border-outline-variant/20 hover:border-primary/30 hover:shadow-md'
                      }`}
                    >
                      {/* Preview thumbnail */}
                      <div
                        className="aspect-[3/4] relative overflow-hidden"
                        style={{ background: colors.bg }}
                      >
                        {/* Simulated template preview */}
                        <div className="absolute inset-0 p-3 flex flex-col items-center justify-center">
                          <div
                            className="w-8 h-1 rounded-full mb-2 opacity-60"
                            style={{ background: colors.accent }}
                          />
                          <div
                            className="text-[10px] font-bold text-center leading-tight opacity-80"
                            style={{ color: colors.ink }}
                          >
                            {t.name}
                          </div>
                          <div
                            className="w-full h-12 rounded-lg mt-2 opacity-30"
                            style={{ background: `linear-gradient(135deg, ${colors.accent}40, ${colors.accent}20)` }}
                          />
                          <div className="flex gap-1 mt-2">
                            {[1, 2, 3].map(i => (
                              <div
                                key={i}
                                className="w-5 h-5 rounded opacity-25"
                                style={{ background: colors.accent }}
                              />
                            ))}
                          </div>
                        </div>

                        {/* Badges overlay */}
                        <div className="absolute top-2 left-2 right-2 flex items-start justify-between">
                          {isCurrent && (
                            <span className="px-2 py-0.5 rounded-full bg-primary text-on-primary font-label-sm text-[10px] shadow-sm flex items-center gap-0.5">
                              <span className="material-symbols-outlined text-[12px]">check_circle</span>
                              Đang dùng
                            </span>
                          )}
                          {locked && (
                            <span className="ml-auto px-2 py-0.5 rounded-full bg-surface/90 backdrop-blur-sm font-label-sm text-[10px] text-on-surface-variant shadow-sm flex items-center gap-0.5">
                              <span className="material-symbols-outlined text-[12px]">lock</span>
                              {t.package}
                            </span>
                          )}
                        </div>

                        {/* Hover overlay */}
                        {!locked && !isCurrent && (
                          <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/10 transition-colors flex items-center justify-center">
                            <span className="material-symbols-outlined text-primary text-[28px] opacity-0 group-hover:opacity-100 transition-opacity drop-shadow-lg">
                              visibility
                            </span>
                          </div>
                        )}
                      </div>

                      {/* Card footer */}
                      <div className="px-2.5 py-2 bg-surface">
                        <p className="font-label-md text-on-surface truncate leading-tight">{t.name}</p>
                        <div className="flex items-center justify-between mt-0.5">
                          <span className="font-label-sm text-on-surface-variant text-[11px]">
                            {t.recommendedEvents}–{t.maxDisplayEvents} kỷ niệm
                          </span>
                          {t.package !== 'FREE' && !locked && (
                            <span
                              className="px-1.5 py-0.5 rounded text-[9px] font-bold uppercase"
                              style={{
                                background: colors.accent + '20',
                                color: colors.accent,
                              }}
                            >
                              {t.package}
                            </span>
                          )}
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>

              {filteredOptions.length === 0 && (
                <div className="flex flex-col items-center justify-center py-12 text-on-surface-variant">
                  <span className="material-symbols-outlined text-4xl opacity-30 mb-2">search_off</span>
                  <p className="font-body-md">Không tìm thấy mẫu phù hợp</p>
                  <button onClick={() => setFilter('all')} className="mt-2 font-label-md text-primary hover:underline">
                    Xem tất cả
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* ── RIGHT: Preview panel ── */}
          <div className="hidden md:flex flex-1 flex-col bg-surface-container-low/30">
            {previewTemplate ? (
              <>
                {/* Preview frame */}
                <div className="flex-1 flex items-center justify-center p-6 overflow-hidden relative">
                  {/* Decorative gradient bg */}
                  <div
                    className="absolute inset-0 opacity-10"
                    style={{
                      background: `radial-gradient(ellipse at center, ${previewColors.accent}40, transparent 70%)`,
                    }}
                  />

                  {/* Phone mockup frame */}
                  <div className="relative w-[280px] h-[560px] bg-black rounded-[40px] p-2 shadow-2xl z-10">
                    {/* Phone notch */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-6 bg-black rounded-b-2xl z-20" />

                    {/* Screen content */}
                    <div
                      className="w-full h-full rounded-[32px] overflow-hidden relative"
                      style={{ background: previewColors.bg }}
                    >
                      {/* Simulated template content */}
                      <div className="w-full h-full flex flex-col">
                        {/* Hero */}
                        <div
                          className="h-[40%] relative overflow-hidden flex items-end p-4"
                          style={{
                            background: previewTheme.heroTreatment === 'photo-dark'
                              ? `linear-gradient(180deg, ${previewColors.bg}00, ${previewColors.bg}cc), ${previewColors.accent}20`
                              : previewTheme.heroGradient || `linear-gradient(180deg, ${previewColors.accent}30, ${previewColors.bg})`,
                          }}
                        >
                          <div className="relative z-10">
                            <div
                              className="text-[11px] font-bold mb-0.5"
                              style={{ color: previewColors.accent }}
                            >
                              ♥ OUR STORY
                            </div>
                            <div
                              className="text-lg font-bold leading-tight"
                              style={{
                                color: previewColors.ink,
                                fontStyle: previewTheme.headlineStyle,
                              }}
                            >
                              Couple Story
                            </div>
                            <div
                              className="text-[9px] mt-1 opacity-70"
                              style={{ color: previewColors.ink }}
                            >
                              Yêu nhau từ lần đầu gặp gỡ...
                            </div>
                          </div>
                        </div>

                        {/* Timeline section */}
                        <div className="flex-1 p-4" style={{ background: previewColors.bg }}>
                          <div
                            className="text-[9px] font-bold uppercase tracking-wider mb-3"
                            style={{ color: previewColors.accent }}
                          >
                            Timeline
                          </div>
                          {[1, 2, 3].map(i => (
                            <div key={i} className="flex gap-2 mb-3">
                              <div className="flex flex-col items-center">
                                <div
                                  className="w-2 h-2 rounded-full"
                                  style={{ background: previewColors.accent }}
                                />
                                {i < 3 && (
                                  <div
                                    className="w-0.5 h-8 opacity-30"
                                    style={{ background: previewColors.accent }}
                                  />
                                )}
                              </div>
                              <div className="flex-1">
                                <div
                                  className="h-2 rounded-full w-3/4 opacity-40"
                                  style={{ background: previewColors.ink }}
                                />
                                <div
                                  className="h-1.5 rounded-full w-1/2 opacity-20 mt-1"
                                  style={{ background: previewColors.ink }}
                                />
                              </div>
                            </div>
                          ))}

                          {/* Gallery hint */}
                          <div className="flex gap-1 mt-3">
                            {[1, 2, 3, 4].map(i => (
                              <div
                                key={i}
                                className="flex-1 aspect-square rounded-lg opacity-20"
                                style={{
                                  background: previewColors.accent,
                                  borderRadius: previewTheme.photoFrame === 'polaroid' ? '2px' : previewTheme.photoFrame === 'arch' ? '999px 999px 4px 4px' : '8px',
                                }}
                              />
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Template info & actions */}
                <div className="px-6 py-4 border-t border-outline-variant/20 bg-surface">
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <h3 className="font-title-lg text-on-surface font-semibold">{previewTemplate.name}</h3>
                        {previewTemplate.code === currentCode && (
                          <span className="px-2 py-0.5 rounded-full bg-primary/10 text-primary font-label-sm text-[11px]">
                            Đang dùng
                          </span>
                        )}
                      </div>
                      <p className="font-body-sm text-on-surface-variant mt-0.5">
                        {previewTemplate.description || `Hiển thị ${previewTemplate.recommendedEvents}–${previewTemplate.maxDisplayEvents} kỷ niệm · Gói ${previewTemplate.package}`}
                      </p>
                    </div>
                    {/* Color palette preview */}
                    <div className="flex gap-1">
                      <div className="w-5 h-5 rounded-full border border-outline-variant/30 shadow-sm" style={{ background: previewColors.bg }} title="Nền" />
                      <div className="w-5 h-5 rounded-full border border-outline-variant/30 shadow-sm" style={{ background: previewColors.accent }} title="Nhấn" />
                      <div className="w-5 h-5 rounded-full border border-outline-variant/30 shadow-sm" style={{ background: previewColors.ink }} title="Chữ" />
                    </div>
                  </div>

                  {/* Data safety notice */}
                  <div className="flex items-center gap-2 mb-3 bg-surface-container-lowest rounded-xl px-3 py-2">
                    <span className="material-symbols-outlined text-primary text-[18px]">shield</span>
                    <p className="font-label-sm text-on-surface-variant">
                      Dữ liệu của bạn được <strong className="text-on-surface">giữ nguyên</strong>, chỉ đổi cách hiển thị.
                    </p>
                  </div>

                  {/* Action buttons */}
                  <div className="flex items-center gap-3">
                    {previewTemplate.code === currentCode ? (
                      <div className="flex-1 py-2.5 rounded-full bg-surface-container text-on-surface-variant font-label-md text-center flex items-center justify-center gap-2">
                        <span className="material-symbols-outlined text-[18px]">check</span>
                        Đây là mẫu bạn đang dùng
                      </div>
                    ) : !canUsePackage(user?.plan, previewTemplate.package) ? (
                      <Link
                        to="/home/upgrade"
                        className="flex-1 py-2.5 rounded-full bg-surface-container text-on-surface-variant font-label-md text-center flex items-center justify-center gap-2 hover:bg-surface-container-high transition-colors"
                      >
                        <span className="material-symbols-outlined text-[18px]">lock</span>
                        Nâng cấp lên gói {previewTemplate.package}
                      </Link>
                    ) : (
                      <>
                        <Link
                          to={`/preview/${previewTemplate.code}`}
                          target="_blank"
                          className="px-5 py-2.5 rounded-full bg-surface-container text-on-surface font-label-md hover:bg-surface-container-high transition-colors flex items-center gap-2"
                        >
                          <span className="material-symbols-outlined text-[18px]">open_in_new</span>
                          Xem demo
                        </Link>
                        <button
                          disabled={busy}
                          onClick={() => handleApply(previewTemplate)}
                          className="flex-1 py-2.5 rounded-full bg-primary text-on-primary font-title-md shadow-md hover:shadow-lg disabled:opacity-50 transition-all flex items-center justify-center gap-2"
                        >
                          {busy ? (
                            <>
                              <span className="material-symbols-outlined text-[18px] animate-spin">progress_activity</span>
                              Đang áp dụng...
                            </>
                          ) : (
                            <>
                              <span className="material-symbols-outlined text-[18px]">auto_awesome</span>
                              Áp dụng mẫu này
                            </>
                          )}
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center text-on-surface-variant">
                <div className="text-center">
                  <span className="material-symbols-outlined text-5xl opacity-20 mb-3 block">touch_app</span>
                  <p className="font-body-lg">Chọn một mẫu để xem trước</p>
                  <p className="font-body-sm opacity-70 mt-1">Click vào mẫu bên trái để xem preview</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

