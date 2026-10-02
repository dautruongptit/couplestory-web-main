import { useState } from 'react';
import { Link } from 'react-router-dom';
import { apiClient } from '@/services/api';
import { toast } from '@/utils/toast';
import { useAuth } from '@/context/AuthContext';
import { useTemplates } from '@/hooks/useTemplates';
import { canUsePackage } from '@/data/templatePackages';
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

export default function ChangeTemplateModal({ storyId, storyType, currentCode, onClose, onChanged }: Props) {
  const { user } = useAuth();
  const { templates } = useTemplates();
  const [busy, setBusy] = useState(false);
  const [picked, setPicked] = useState<Template | null>(null);
  const [events, setEvents] = useState<ServerEvent[]>([]);
  const [selected, setSelected] = useState<Set<string>>(new Set());

  const options = templates.filter(t => t.type === storyType);

  const putVisibility = async (ids: string[]): Promise<ServerEvent[]> =>
    apiClient.put(`/stories/${storyId}/events/visibility`, ids);

  const choose = async (t: Template) => {
    setBusy(true);
    try {
      await apiClient.put(`/stories/${storyId}/template`, { templateCode: t.code });
      const list: ServerEvent[] = await apiClient.get(`/stories/${storyId}/events`);

      if (list.length <= t.maxDisplayEvents) {
        // Everything fits: show every existing event, never invent placeholders.
        const updated = await putVisibility(list.map(e => e.id));
        if (list.length < t.recommendedEvents) {
          toast(`Mẫu này đẹp nhất với ${t.recommendedEvents} kỷ niệm, bạn có thể thêm ${t.recommendedEvents - list.length} kỷ niệm nữa.`, 'success');
        } else {
          toast('Đã đổi mẫu', 'success');
        }
        onChanged(t.code, updated);
        return;
      }

      // More events than the template can show: let the user choose which ones; none are deleted.
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

  const apply = async () => {
    if (!picked) return;
    setBusy(true);
    try {
      const ordered = events.filter(e => selected.has(e.id)).map(e => e.id);
      const updated = await putVisibility(ordered);
      toast('Đã đổi mẫu', 'success');
      onChanged(picked.code, updated);
    } catch (error: any) {
      toast(error?.message || 'Không áp dụng được', 'error');
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-surface rounded-3xl shadow-2xl w-full max-w-lg max-h-[85vh] overflow-y-auto">
        <div className="sticky top-0 bg-surface z-10 px-6 pt-6 pb-3 border-b border-outline-variant/30 flex items-start justify-between">
          <div>
            <h2 className="font-headline-md text-on-surface">
              {picked ? 'Chọn kỷ niệm hiển thị' : 'Đổi mẫu giao diện'}
            </h2>
            <p className="font-body-sm text-on-surface-variant mt-1">
              {picked
                ? `Mẫu "${picked.name}" hiển thị tối đa ${picked.maxDisplayEvents} kỷ niệm. Kỷ niệm không chọn vẫn được giữ lại.`
                : 'Dữ liệu của bạn được giữ nguyên, chỉ đổi cách hiển thị.'}
            </p>
          </div>
          {!picked && (
            <button onClick={onClose} className="w-9 h-9 rounded-full bg-surface-container hover:bg-surface-container-high flex items-center justify-center text-on-surface-variant">
              <span className="material-symbols-outlined">close</span>
            </button>
          )}
        </div>

        {!picked && (
          <ul className="p-4 flex flex-col gap-2">
            {options.map(t => {
              const locked = !canUsePackage(user?.plan, t.package);
              const isCurrent = t.code === currentCode;
              return (
                <li key={t.code} className="flex items-center gap-3 p-3 rounded-2xl border border-outline-variant/30 bg-surface-container-lowest">
                  <div className="flex-1 min-w-0">
                    <p className="font-title-md text-on-surface truncate">{t.name}</p>
                    <p className="font-label-sm text-on-surface-variant">
                      Gói {t.package} · {t.recommendedEvents}–{t.maxDisplayEvents} kỷ niệm
                    </p>
                  </div>
                  {isCurrent ? (
                    <span className="px-3 py-1 rounded-full bg-surface-container font-label-sm text-on-surface-variant">Đang dùng</span>
                  ) : locked ? (
                    <Link to="/dashboard/upgrade" className="px-3 py-1.5 rounded-full bg-surface-container font-label-sm text-on-surface-variant flex items-center gap-1">
                      <span className="material-symbols-outlined text-[16px]">lock</span> Nâng cấp
                    </Link>
                  ) : (
                    <button
                      disabled={busy}
                      onClick={() => choose(t)}
                      className="px-4 py-1.5 rounded-full bg-primary text-on-primary font-label-md disabled:opacity-50"
                    >
                      Chọn
                    </button>
                  )}
                </li>
              );
            })}
            {options.length === 0 && <p className="text-center text-on-surface-variant py-6">Đang tải danh sách mẫu...</p>}
          </ul>
        )}

        {picked && (
          <div className="p-6 flex flex-col gap-3">
            {events.map(e => {
              const checked = selected.has(e.id);
              const full = !checked && selected.size >= picked.maxDisplayEvents;
              return (
                <label key={e.id} className={`flex items-center gap-3 p-3 rounded-xl border ${checked ? 'border-primary bg-primary/5' : 'border-outline-variant/30'} ${full ? 'opacity-50' : ''}`}>
                  <input type="checkbox" checked={checked} disabled={full} onChange={() => toggle(e.id)} />
                  <span className="font-body-md text-on-surface truncate">{e.title || '(chưa có tiêu đề)'}</span>
                </label>
              );
            })}
            <p className="font-label-sm text-on-surface-variant">Đã chọn {selected.size}/{picked.maxDisplayEvents}</p>
            <button
              disabled={busy || selected.size === 0}
              onClick={apply}
              className="mt-2 px-6 py-3 rounded-full bg-primary-container text-on-primary font-title-md shadow-md disabled:opacity-40"
            >
              {busy ? 'Đang áp dụng...' : 'Áp dụng'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
