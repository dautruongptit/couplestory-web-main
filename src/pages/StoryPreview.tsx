import { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { apiClient } from '@/services/api';
import { toast } from '@/utils/toast';

export default function StoryPreview() {
  const { scenarioId } = useParams();
  const navigate = useNavigate();
  const [device, setDevice] = useState<'desktop' | 'mobile'>('desktop');
  const [publishing, setPublishing] = useState(false);

  const publish = async () => {
    setPublishing(true);
    try {
      await apiClient.post(`/stories/${scenarioId}/publish`, {});
      navigate(`/editor/${scenarioId}/published`, { replace: true });
    } catch (error: any) {
      toast(error?.message || 'Không xuất bản được', 'error');
    } finally {
      setPublishing(false);
    }
  };

  return (
    <div className="h-screen flex flex-col bg-surface-container">
      <header className="h-16 shrink-0 px-4 bg-surface border-b border-outline-variant/30 flex items-center justify-between gap-3">
        <Link
          to={`/editor/${scenarioId}`}
          className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-surface-container text-on-surface font-label-md hover:bg-surface-container-high"
        >
          <span className="material-symbols-outlined text-[18px]">arrow_back</span>
          Quay lại chỉnh sửa
        </Link>

        <div className="flex items-center gap-1 bg-surface-container rounded-full p-1">
          {(['desktop', 'mobile'] as const).map(d => (
            <button
              key={d}
              type="button"
              onClick={() => setDevice(d)}
              className={`px-3 py-1 rounded-full font-label-md flex items-center gap-1 ${device === d ? 'bg-primary text-on-primary' : 'text-on-surface-variant'}`}
            >
              <span className="material-symbols-outlined text-[18px]">{d === 'desktop' ? 'desktop_windows' : 'smartphone'}</span>
              {d === 'desktop' ? 'Máy tính' : 'Điện thoại'}
            </button>
          ))}
        </div>

        <button
          type="button"
          disabled={publishing}
          onClick={publish}
          className="px-5 py-2 rounded-full bg-primary text-on-primary font-label-md shadow-sm hover:bg-primary/90 disabled:opacity-50 flex items-center gap-1"
        >
          <span className="material-symbols-outlined text-[18px]">rocket_launch</span>
          {publishing ? 'Đang xuất bản...' : 'Xuất bản'}
        </button>
      </header>

      <main className="flex-1 min-h-0 flex justify-center p-4">
        <iframe
          title="Xem trước"
          src={`/demo/${scenarioId}`}
          className={`h-full bg-white rounded-xl shadow-lg border border-outline-variant/30 ${device === 'mobile' ? 'w-[390px]' : 'w-full'}`}
        />
      </main>
    </div>
  );
}
