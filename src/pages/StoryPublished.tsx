import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { QRCodeSVG } from 'qrcode.react';
import { apiClient } from '@/services/api';
import { toast } from '@/utils/toast';
import { useAuth } from '@/context/AuthContext';

import { getStoryPublicUrl } from '@/utils/publicStory';

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
  // const { plans } = usePlans();
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

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      toast('Đã sao chép đường dẫn', 'success');
    } catch { toast('Không sao chép được', 'error'); }
  };

  const shareLinks = [
    { icon: '/icons/facebook.svg', label: 'Facebook', color: 'bg-[#1877f2]/10 text-[#1877f2] hover:bg-[#1877f2]/20', href: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}` },
    { icon: '/icons/messenger.svg', label: 'Messenger', color: 'bg-[#0084ff]/10 text-[#0084ff] hover:bg-[#0084ff]/20', href: `https://www.facebook.com/dialog/send?link=${encodeURIComponent(url)}` },
    { icon: '/icons/zalo.svg', label: 'Zalo', color: 'bg-[#0068ff]/10 text-[#0068ff] hover:bg-[#0068ff]/20', href: `https://zalo.me/share?url=${encodeURIComponent(url)}` },
    { icon: '/icons/instagram.svg', label: 'Instagram', color: 'bg-[#e4405f]/10 text-[#e4405f] hover:bg-[#e4405f]/20', href: '#' },
  ];

  return (
    <div className="px-4 md:px-6 py-6 flex justify-center">
      <div className="w-full max-w-[640px]">
        {/* Breadcrumb */}
        <div className="flex items-center gap-1.5 text-xs text-[#8d7076] mb-6">
          <Link to="/home" className="hover:text-[#ff4d8d]">Story của tôi</Link>
          <span>›</span>
          <span className="text-[#594046] truncate max-w-[200px]">{coupleNames}</span>
          <span>›</span>
          <span className="text-[#ff4d8d] font-medium">● Xuất bản thành công</span>
        </div>

        {/* Main card */}
        <div className="bg-white rounded-2xl border border-[#f0e4e8] shadow-sm p-5 sm:p-8 flex flex-col items-center text-center">
          {/* Success icon */}
          <div className="relative mb-5">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#ff4d8d] to-[#e63e7b] flex items-center justify-center shadow-[0_8px_24px_rgba(255,77,141,0.3)]">
              <span className="material-symbols-outlined text-white text-[32px]" style={{ fontVariationSettings: "'FILL' 1" }}>favorite</span>
            </div>
            <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-emerald-500 flex items-center justify-center border-2 border-white">
              <span className="material-symbols-outlined text-white text-[14px]">check</span>
            </div>
          </div>

          <p className="text-[10px] font-bold text-[#ff4d8d] tracking-widest uppercase mb-1">✨ ĐÃ LÊN SÓNG ✨</p>
          <h1 className="text-2xl font-bold text-[#2e1220] mb-1">Câu chuyện đã xuất bản!</h1>
          <p className="text-sm text-[#594046] mb-6">
            Trang web tình yêu của <strong>{coupleNames}</strong> đã sẵn sàng để gửi trao, kết nối và lưu giữ những khoảnh khắc ngọt ngào nhất.
          </p>

          {/* URL box */}
          <div className="w-full rounded-xl bg-[#faf7f8] border border-[#f0e4e8] p-3 flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-3 mb-5">
            <div className="flex items-center gap-2 flex-1 min-w-0">
              <span className="material-symbols-outlined text-[18px] text-[#8d7076] shrink-0">language</span>
              <div className="text-left min-w-0">
                <p className="text-[10px] text-[#8d7076] font-medium">Đường dẫn Website Tình yêu</p>
                <p className="text-sm text-[#2e1220] font-medium truncate">{url}</p>
              </div>
            </div>
            <div className="flex items-center gap-2 justify-end">
              <span className="text-[10px] text-[#8d7076] font-medium whitespace-nowrap hidden sm:inline">Công khai (Public)</span>
              <button onClick={copy} className="px-3 py-1.5 rounded-lg bg-[#2e1220] text-white text-xs font-semibold hover:bg-[#1a0a12] transition-colors flex items-center gap-1 shrink-0">
                <span className="material-symbols-outlined text-[14px]">content_copy</span>
                Sao chép link
              </button>
            </div>
          </div>

          {/* QR code */}
          <div className="rounded-2xl bg-[#faf7f8] border border-[#f0e4e8] p-6 mb-5 w-full max-w-[340px]">
            <div className="flex flex-col items-center gap-3">
              <div className="bg-white p-3 rounded-xl shadow-sm">
                <QRCodeSVG value={url} size={140} />
              </div>
              <div>
                <p className="font-bold text-sm text-[#2e1220] flex items-center justify-center gap-1">
                  <span className="material-symbols-outlined text-[#ff4d8d] text-[16px]" style={{ fontVariationSettings: "'FILL' 1" }}>favorite</span>
                  Mã QR tình yêu
                </p>
                <p className="text-xs text-[#8d7076] mt-0.5">Quét bằng camera điện thoại để mở ngay album kỷ niệm.</p>
              </div>
              <div className="flex gap-2">
                <button className="px-3 py-1.5 rounded-lg bg-[#fff0f4] text-[#ff4d8d] text-xs font-semibold hover:bg-[#ffe8ef] transition-colors flex items-center gap-1">
                  <span className="material-symbols-outlined text-[14px]">download</span>
                  Tải ảnh PNG
                </button>
                <button className="px-3 py-1.5 rounded-lg bg-[#fff0f4] text-[#ff4d8d] text-xs font-semibold hover:bg-[#ffe8ef] transition-colors flex items-center gap-1">
                  <span className="material-symbols-outlined text-[14px]">print</span>
                  In thiệp
                </button>
              </div>
            </div>
          </div>

          {/* Share buttons */}
          <div className="w-full mb-5">
            <p className="text-[10px] font-bold text-[#8d7076] tracking-widest uppercase mb-3">HOẶC CHIA SẺ NGAY QUA</p>
            <div className="grid grid-cols-4 gap-2">
              {shareLinks.map(s => (
                <a key={s.label} href={s.href} target="_blank" rel="noreferrer" className={`flex flex-col items-center gap-1.5 py-3 rounded-xl text-xs font-semibold transition-colors ${s.color}`}>
                  <span className="text-lg">{s.label === 'Facebook' ? '📘' : s.label === 'Messenger' ? '💬' : s.label === 'Zalo' ? '💎' : '📸'}</span>
                  {s.label}
                </a>
              ))}
            </div>
          </div>

          {/* Upgrade prompt for FREE */}
          {planCode !== 'PREMIUM' && (
            <div className="w-full rounded-xl bg-gradient-to-r from-[#fff0f4] to-[#ffe8ef] border border-[#ffe0eb] p-4 flex flex-col sm:flex-row items-start sm:items-center gap-3 mb-5">
              <span className="material-symbols-outlined text-[#ff4d8d] text-[20px] hidden sm:block" style={{ fontVariationSettings: "'FILL' 1" }}>bookmark</span>
              <div className="flex-1 text-left">
                <p className="text-sm font-semibold text-[#2e1220]">Lưu giữ trang web vĩnh viễn</p>
                <p className="text-xs text-[#594046]">
                  {planCode === 'FREE' ? 'Bản miễn phí hết hạn sau 30 ngày. Đừng để ký ức bị gián đoạn.' : 'Nâng cấp để mở thêm tính năng.'}
                </p>
              </div>
              <Link to="/home/upgrade" className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#ff4d8d] to-[#e63e7b] text-white text-xs font-semibold shadow-md hover:shadow-lg transition-all whitespace-nowrap">
                Nâng cấp ngay →
              </Link>
            </div>
          )}

          {/* Bottom links */}
          <div className="flex items-center justify-center gap-6 text-xs text-[#594046] pt-2">
            <Link to={`/editor/${scenarioId}`} className="flex items-center gap-1 hover:text-[#ff4d8d] transition-colors">
              <span className="material-symbols-outlined text-[14px]">tune</span>
              Chỉnh sửa nội dung
            </Link>
            <span className="text-[#e1bec5]">●</span>
            <Link to="/create" className="flex items-center gap-1 hover:text-[#ff4d8d] transition-colors">
              <span className="material-symbols-outlined text-[14px]">favorite</span>
              Tạo thêm Story
            </Link>
          </div>
        </div>

        {/* View live button */}
        <div className="flex flex-col sm:flex-row justify-center gap-3 mt-4">
          <Link to="/home" className="px-5 py-2.5 rounded-xl bg-white border border-[#f0e4e8] text-sm font-medium text-[#594046] hover:bg-[#fff5f9] transition-colors flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[16px]">arrow_back</span>
            Quay về Home
          </Link>
          <a href={url} target="_blank" rel="noreferrer" className="px-5 py-2.5 rounded-xl bg-white border border-[#f0e4e8] text-sm font-medium text-[#ff4d8d] hover:bg-[#fff5f9] transition-colors flex items-center gap-1.5">
            Xem trực tiếp
            <span className="material-symbols-outlined text-[16px]">open_in_new</span>
          </a>
        </div>
      </div>
    </div>
  );
}

