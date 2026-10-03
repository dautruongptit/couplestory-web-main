import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { apiClient } from '@/services/api';
import { toast } from '@/utils/toast';
import { useAuth } from '@/context/AuthContext';
import { getStoryDisplayHost, getStoryPublicUrl } from '@/utils/publicStory';
import { downloadQrCard } from '@/utils/qrCard';
import FramedQr from '@/components/FramedQr';
import ShareButtons from '@/components/ShareButtons';

interface StoryInfo {
  id: string;
  slug: string;
  title: string;
  coupleName1: string;
  coupleName2: string;
  status: string;
  expiresAt?: string | null;
}

export default function StoryPublished() {
  const { scenarioId } = useParams();
  const { user } = useAuth();
  const [story, setStory] = useState<StoryInfo | null>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    apiClient.get(`/stories/${scenarioId}`)
      .then(setStory)
      .catch(() => setFailed(true));
  }, [scenarioId]);

  if (failed) return <div className="flex items-center justify-center min-h-[60vh] text-[#594046]">Không tải được thông tin.</div>;
  if (!story) return <div className="flex items-center justify-center min-h-[60vh] text-[#8d7076]">Đang tải...</div>;

  const planCode = user?.plan ?? 'FREE';
  const url = getStoryPublicUrl(story.slug);
  const coupleNames = `${story.coupleName1 || ''} & ${story.coupleName2 || ''}`.trim();
  const expires = story.expiresAt ? new Date(story.expiresAt).toLocaleDateString('vi-VN') : null;

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      toast('Đã sao chép đường dẫn', 'success');
    } catch { toast('Không sao chép được', 'error'); }
  };

  const downloadQr = () => downloadQrCard(
    document.getElementById('published-qr-canvas') as HTMLCanvasElement | null,
    story.slug,
    coupleNames,
  );

  return (
    <div className="px-4 md:px-6 py-5 flex justify-center">
      <div className="w-full max-w-3xl flex flex-col gap-4">
        <div className="flex items-center gap-1.5 text-xs text-[#8d7076]">
          <Link to="/home" className="hover:text-[#ff4d8d]">Story của tôi</Link>
          <span>›</span>
          <span className="text-[#594046] truncate max-w-[200px]">{coupleNames}</span>
          <span>›</span>
          <span className="text-[#ff4d8d] font-medium">Xuất bản thành công</span>
        </div>

        <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#ff4d8d] to-[#a855f7] text-white p-5 md:p-7 flex items-center gap-4 shadow-[0_10px_30px_rgba(168,85,247,0.25)]">
          <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-white/10 blur-2xl pointer-events-none" />
          <div className="absolute -bottom-12 left-1/3 w-40 h-40 rounded-full bg-white/10 blur-2xl pointer-events-none" />
          <div className="relative shrink-0 w-14 h-14 md:w-16 md:h-16 rounded-full bg-white/20 backdrop-blur flex items-center justify-center ring-4 ring-white/20">
            <span className="material-symbols-outlined text-[30px] md:text-[34px]" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
          </div>
          <div className="relative min-w-0">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/20 text-[11px] font-bold tracking-wide mb-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-300" />
              Đang hoạt động
            </span>
            <h1 className="text-xl md:text-2xl font-bold leading-tight">Website đã lên sóng! 🎉</h1>
            <p className="text-sm text-white/90 mt-0.5">
              Câu chuyện của <strong>{coupleNames}</strong> đã sẵn sàng để chia sẻ.
            </p>
          </div>
        </section>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <section className="md:col-span-3 bg-white rounded-3xl border border-[#ffd6e6] shadow-[0_4px_20px_rgba(255,77,141,0.06)] p-5 flex flex-col">
            <p className="text-[11px] font-bold text-[#8d7076] uppercase tracking-wider mb-1.5">Địa chỉ website</p>
            <p className="text-lg md:text-xl font-bold text-[#ff4d8d] break-all leading-snug">{getStoryDisplayHost(story.slug)}</p>
            {expires && (
              <p className="text-xs text-[#8d7076] mt-1.5 flex items-center gap-1">
                <span className="material-symbols-outlined text-[14px]">schedule</span>
                Hoạt động đến {expires}
              </p>
            )}

            <div className="flex flex-col sm:flex-row gap-2 mt-4">
              <a
                href={url}
                target="_blank"
                rel="noreferrer"
                className="flex-1 inline-flex items-center justify-center gap-1.5 py-2.5 rounded-full bg-gradient-to-r from-[#ff4d8d] to-[#a855f7] text-white text-sm font-bold shadow-[0_4px_14px_rgba(168,85,247,0.35)] hover:shadow-[0_6px_18px_rgba(168,85,247,0.45)] transition-shadow"
              >
                <span className="material-symbols-outlined text-[18px]">open_in_new</span>
                Xem website
              </a>
              <button
                onClick={copy}
                className="flex-1 inline-flex items-center justify-center gap-1.5 py-2.5 rounded-full bg-[#fff0f4] text-[#b90a5a] text-sm font-bold hover:bg-[#ffe0eb] transition-colors"
              >
                <span className="material-symbols-outlined text-[18px]">content_copy</span>
                Sao chép link
              </button>
            </div>

            <div className="mt-5 pt-4 border-t border-[#f0e4e8]">
              <p className="text-[11px] font-bold text-[#8d7076] uppercase tracking-wider mb-1">Chia sẻ qua</p>
              <ShareButtons url={url} iconSize={40} />
            </div>
          </section>

          <section className="md:col-span-2 bg-white rounded-3xl border border-[#ffd6e6] shadow-[0_4px_20px_rgba(255,77,141,0.06)] p-5 flex flex-col items-center justify-center text-center">
            <FramedQr url={url} id="published-qr-canvas" size={190} />
            <p className="text-xs text-[#8d7076] mt-3">Quét bằng camera điện thoại để mở ngay website</p>
            <button
              onClick={downloadQr}
              className="mt-3 inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#fff0f4] text-[#b90a5a] text-[13px] font-bold hover:bg-[#ffe0eb] transition-colors"
            >
              <span className="material-symbols-outlined text-[16px]">download</span>
              Tải ảnh QR
            </button>
          </section>
        </div>

        {planCode !== 'PREMIUM' && (
          <div className="rounded-2xl bg-gradient-to-r from-[#fff0f4] to-[#f3e8ff] border border-[#ffe0eb] p-4 flex flex-col sm:flex-row sm:items-center gap-3">
            <span className="material-symbols-outlined text-[#a855f7] text-[22px] hidden sm:block" style={{ fontVariationSettings: "'FILL' 1" }}>bookmark</span>
            <div className="flex-1">
              <p className="text-sm font-semibold text-[#2e1220]">Lưu giữ trang web vĩnh viễn</p>
              <p className="text-xs text-[#594046]">
                {planCode === 'FREE' ? 'Bản miễn phí hết hạn sau 30 ngày. Đừng để ký ức bị gián đoạn.' : 'Nâng cấp để mở thêm tính năng.'}
              </p>
            </div>
            <Link to="/home/upgrade" className="px-4 py-2 rounded-full bg-gradient-to-r from-[#ff4d8d] to-[#a855f7] text-white text-xs font-bold shadow-md hover:shadow-lg transition-shadow whitespace-nowrap text-center">
              Nâng cấp ngay →
            </Link>
          </div>
        )}

        <div className="flex flex-wrap items-center justify-center gap-2">
          <Link to={`/editor/${scenarioId}`} className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white border border-[#f0e4e8] text-xs font-medium text-[#594046] hover:bg-[#fff5f9] hover:text-[#ff4d8d] transition-colors">
            <span className="material-symbols-outlined text-[16px]">tune</span>
            Chỉnh sửa nội dung
          </Link>
          <Link to="/create" className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white border border-[#f0e4e8] text-xs font-medium text-[#594046] hover:bg-[#fff5f9] hover:text-[#ff4d8d] transition-colors">
            <span className="material-symbols-outlined text-[16px]">favorite</span>
            Tạo thêm Story
          </Link>
          <Link to="/home" className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white border border-[#f0e4e8] text-xs font-medium text-[#594046] hover:bg-[#fff5f9] hover:text-[#ff4d8d] transition-colors">
            <span className="material-symbols-outlined text-[16px]">home</span>
            Quay về Home
          </Link>
        </div>
      </div>
    </div>
  );
}
