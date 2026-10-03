import { toast } from '@/utils/toast';
import { getStoryDisplayHost, getStoryPublicUrl } from '@/utils/publicStory';
import { downloadQrCard } from '@/utils/qrCard';
import FramedQr from '@/components/FramedQr';
import ShareButtons from '@/components/ShareButtons';
import type { StoryResponse } from '@/pages/Dashboard';

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  story: StoryResponse | null;
}

export default function ShareModal({ isOpen, onClose, story }: ShareModalProps) {
  if (!isOpen || !story) return null;

  const slug = story.slug || story.subdomain || story.id;
  const url = getStoryPublicUrl(slug);

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(url);
      toast('Đã sao chép link', 'success');
    } catch {
      toast('Không sao chép được', 'error');
    }
  };

  const downloadQr = () => downloadQrCard(
    document.getElementById('share-qr-canvas') as HTMLCanvasElement | null,
    slug,
    `${story.coupleName1} & ${story.coupleName2}`,
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm" onClick={onClose}>
      <div
        className="bg-white w-full max-w-4xl max-h-[92vh] overflow-y-auto rounded-[32px] p-6 md:p-8 relative shadow-2xl"
        onClick={e => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          aria-label="Đóng"
          className="absolute top-4 right-4 w-9 h-9 flex items-center justify-center bg-gray-50 text-gray-500 hover:text-gray-800 rounded-full hover:bg-gray-100 transition-colors"
        >
          <span className="material-symbols-outlined text-[18px]">close</span>
        </button>

        <div className="flex flex-col md:flex-row gap-6 md:gap-8">
          <div className="flex flex-col items-center md:w-[340px] shrink-0 pt-6 md:pt-0">
            <FramedQr url={url} id="share-qr-canvas" size={280} />
            <p className="text-sm text-gray-500 mt-3 text-center">Quét bằng camera điện thoại để mở ngay website</p>
            <button
              onClick={downloadQr}
              className="mt-3 inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-rose-50 text-rose-500 font-bold text-[13px] border border-rose-100 hover:bg-rose-100 transition-colors"
            >
              <span className="material-symbols-outlined text-[16px]">download</span>
              Tải ảnh QR
            </button>
          </div>

          <div className="flex-1 min-w-0 flex flex-col md:justify-center">
            <h2 className="text-xl font-bold text-gray-800 mb-1">Chia sẻ câu chuyện 💞</h2>
            <p className="text-sm text-gray-500 mb-5">
              {story.coupleName1} &amp; {story.coupleName2}
            </p>

            <div className="bg-gray-50 rounded-2xl py-3 px-4 w-full border border-gray-100 mb-5">
              <div className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-1.5">Địa chỉ website</div>
              <div className="flex items-center justify-between gap-3">
                <span className="text-[14px] text-gray-700 truncate font-semibold flex-1 select-all">{getStoryDisplayHost(slug)}</span>
                <button
                  onClick={copyLink}
                  className="flex items-center gap-1 text-white font-bold text-[12px] bg-rose-500 hover:bg-rose-600 px-4 py-2 rounded-full shadow-sm transition-all shrink-0"
                >
                  <span className="material-symbols-outlined text-[14px]">content_copy</span>
                  Sao chép
                </button>
              </div>
            </div>

            <div className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-2">Chia sẻ qua</div>
            <ShareButtons url={url} />
          </div>
        </div>
      </div>
    </div>
  );
}
