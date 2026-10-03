import { useEffect, useRef, useState } from 'react';
import { apiClient } from '@/services/api';
import { getStoryDisplayHost } from '@/utils/publicStory';
import { toSlug, toSlugInput } from '@/utils/slug';

interface SlugCheck {
  slug: string;
  available: boolean;
  reason: string | null;
  suggestions: string[];
}

type Status = 'idle' | 'checking' | 'ok' | 'bad';

interface Props {
  value: string;
  onChange: (slug: string) => void;
  onValidityChange?: (ok: boolean) => void;
  storyId?: string;
  locked?: boolean;
}

export default function SlugField({ value, onChange, onValidityChange, storyId, locked = false }: Props) {
  const [status, setStatus] = useState<Status>('idle');
  const [reason, setReason] = useState<string | null>(null);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const requestId = useRef(0);

  useEffect(() => {
    if (locked) return;
    const slug = toSlug(value);
    if (!slug) {
      setStatus('idle');
      setReason(null);
      setSuggestions([]);
      return;
    }
    setStatus('checking');
    const id = ++requestId.current;
    const timer = setTimeout(async () => {
      try {
        const params = new URLSearchParams({ slug });
        if (storyId) params.set('storyId', storyId);
        const res: SlugCheck = await apiClient.get(`/stories/slug-check?${params}`);
        if (id !== requestId.current) return;
        setStatus(res.available ? 'ok' : 'bad');
        setReason(res.reason);
        setSuggestions(res.suggestions);
      } catch {
        if (id !== requestId.current) return;
        setStatus('bad');
        setReason('Không kiểm tra được link, vui lòng thử lại.');
        setSuggestions([]);
      }
    }, 400);
    return () => clearTimeout(timer);
  }, [value, storyId, locked]);

  useEffect(() => {
    onValidityChange?.(locked || status === 'ok');
  }, [status, locked, onValidityChange]);

  const host = getStoryDisplayHost(toSlug(value) || 'ten-cua-ban');

  if (locked) {
    return (
      <div>
        <div className="px-4 py-2.5 rounded-xl bg-[#faf7f8] border border-[#f0e4e8] text-sm text-[#594046] break-all">{host}</div>
        <p className="mt-1.5 text-xs text-[#8d7076]">Link đã xuất bản nên không thể thay đổi.</p>
      </div>
    );
  }

  const border =
    status === 'ok' ? 'border-emerald-400 focus-within:ring-emerald-200'
    : status === 'bad' ? 'border-red-400 focus-within:ring-red-200'
    : 'border-[#e1bec5] focus-within:border-[#ff4d8d] focus-within:ring-[#ff4d8d]/20';

  return (
    <div>
      <div className={`flex items-center rounded-xl border bg-white focus-within:ring-2 ${border}`}>
        <input
          type="text"
          value={value}
          onChange={e => onChange(toSlugInput(e.target.value))}
          onBlur={() => onChange(toSlug(value))}
          maxLength={63}
          placeholder="ten-cua-ban"
          aria-label="Đường dẫn của Story"
          className="flex-1 min-w-0 px-4 py-2.5 rounded-xl bg-transparent outline-none text-sm"
        />
        <span className="pr-3 flex items-center text-[#8d7076]">
          {status === 'checking' && <span className="material-symbols-outlined text-[18px] animate-spin">progress_activity</span>}
          {status === 'ok' && <span className="material-symbols-outlined text-[18px] text-emerald-500">check_circle</span>}
          {status === 'bad' && <span className="material-symbols-outlined text-[18px] text-red-500">error</span>}
        </span>
      </div>
      <p className="mt-1.5 text-xs text-[#8d7076] break-all">Địa chỉ website của bạn: <span className="font-semibold text-[#ff4d8d]">{host}</span></p>
      {status === 'ok' && <p className="mt-1 text-xs text-emerald-600">Link này còn trống.</p>}
      {status === 'bad' && (
        <div className="mt-1">
          <p className="text-xs text-red-600">{reason}</p>
          {suggestions.length > 0 && (
            <div className="mt-1.5 flex flex-wrap items-center gap-1.5">
              <span className="text-xs text-[#8d7076]">Gợi ý:</span>
              {suggestions.map(s => (
                <button
                  key={s}
                  type="button"
                  onClick={() => onChange(s)}
                  className="px-2.5 py-1 rounded-full bg-[#fff0f4] text-[#b90a5a] text-xs font-medium hover:bg-[#ffe0eb]"
                >
                  {s}
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
