import { QRCodeCanvas } from 'qrcode.react';
import { toast } from '@/utils/toast';
import { getStoryPublicUrl } from '@/utils/publicStory';
import type { StoryResponse } from '@/pages/Dashboard';

interface QrModalProps {
  isOpen: boolean;
  onClose: () => void;
  story: StoryResponse | null;
}

export default function QrModal({ isOpen, onClose, story }: QrModalProps) {
  if (!isOpen || !story) return null;

  const url = getStoryPublicUrl((story as any).slug || story.subdomain || story.id);
  const displayUrl = url.replace(/^https?:\/\//, '').substring(0, 32) + (url.length > 32 ? '...' : '');

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(url);
      toast('Đã sao chép link', 'success');
    } catch {
      toast('Không sao chép được', 'error');
    }
  };

  const downloadPng = () => {
    const canvas = document.getElementById('qr-canvas') as HTMLCanvasElement;
    if (!canvas) return;
    const pngUrl = canvas.toDataURL('image/png');
    const a = document.createElement('a');
    a.download = `couplestory-qr-${(story as any).slug || story.id}.png`;
    a.href = pngUrl;
    a.click();
    toast('Đã tải mã QR', 'success');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-md rounded-[32px] p-8 flex flex-col items-center relative shadow-2xl border-t-[6px] border-[#ff4d8d] overflow-hidden animate-in zoom-in-95 duration-200">
        
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center bg-rose-50 text-rose-500 hover:text-rose-600 rounded-full hover:bg-rose-100 transition-colors"
        >
          <span className="material-symbols-outlined text-[18px]">close</span>
        </button>

        {/* Header */}
        <div className="bg-rose-50 text-rose-500 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider mb-4 mt-2">
          INSTANT LIVE PREVIEW
        </div>
        <h2 className="text-2xl font-bold text-gray-800 text-center mb-2">
          Quét mã xem thử tức thì 📱 ✨
        </h2>
        <p className="text-sm text-gray-500 text-center mb-6 px-4 leading-relaxed">
          Mở camera điện thoại của bạn (iOS Camera hoặc Zalo / QR Scanner) để trải nghiệm website tình yêu của <span className="font-bold text-rose-500">{story.coupleName1} & {story.coupleName2}</span> ngay trên thiết bị thật.
        </p>

        {/* QR Section */}
        <div className="relative p-6 bg-white mb-6">
          {/* Corner Brackets */}
          <div className="absolute top-0 left-0 w-8 h-8 border-t-[3px] border-l-[3px] border-rose-400 rounded-tl-2xl"></div>
          <div className="absolute top-0 right-0 w-8 h-8 border-t-[3px] border-r-[3px] border-rose-400 rounded-tr-2xl"></div>
          <div className="absolute bottom-0 left-0 w-8 h-8 border-b-[3px] border-l-[3px] border-rose-400 rounded-bl-2xl"></div>
          <div className="absolute bottom-0 right-0 w-8 h-8 border-b-[3px] border-r-[3px] border-rose-400 rounded-br-2xl"></div>
          
          <QRCodeCanvas 
            id="qr-canvas"
            value={url} 
            size={180} 
            level="H" 
            bgColor="#ffffff"
            fgColor="#1f2937"
          />
          
          {/* Heart Overlay */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center p-0.5 shadow-sm">
              <div className="w-full h-full bg-rose-400 rounded-full flex items-center justify-center">
                <span className="material-symbols-outlined text-white text-[20px]">favorite</span>
              </div>
            </div>
          </div>
        </div>

        {/* Link Copy */}
        <div className="bg-gray-50 rounded-full py-2.5 px-4 flex items-center justify-between gap-3 w-full border border-gray-200 mb-6 group">
          <div className="flex items-center gap-2 overflow-hidden flex-1">
            <span className="material-symbols-outlined text-rose-400 text-[16px]">lock</span>
            <span className="text-sm text-gray-600 truncate font-medium">{displayUrl}</span>
          </div>
          <button 
            onClick={copyLink}
            className="flex items-center gap-1 text-rose-500 font-bold text-[13px] hover:text-rose-600 shrink-0 bg-white px-3 py-1 rounded-full border border-rose-100 shadow-sm transition-all"
          >
            <span className="material-symbols-outlined text-[14px]">content_copy</span>
            Sao chép link
          </button>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-3 gap-3 w-full mb-8">
          <div className="bg-white border border-gray-100 rounded-2xl p-3 flex flex-col shadow-sm">
            <div className="w-6 h-6 rounded-full bg-yellow-50 text-yellow-500 flex items-center justify-center mb-2">
              <span className="material-symbols-outlined text-[14px]">bolt</span>
            </div>
            <h4 className="font-bold text-[11px] text-gray-800 leading-tight mb-1">Đồng bộ tức thì</h4>
            <p className="text-[9px] text-gray-500 leading-tight">Sửa trên web tự cập nhật điện thoại ngay lập tức.</p>
          </div>
          <div className="bg-white border border-gray-100 rounded-2xl p-3 flex flex-col shadow-sm">
            <div className="w-6 h-6 rounded-full bg-emerald-50 text-emerald-500 flex items-center justify-center mb-2">
              <span className="material-symbols-outlined text-[14px]">shield_check</span>
            </div>
            <h4 className="font-bold text-[11px] text-gray-800 leading-tight mb-1">Riêng tư & Bảo mật</h4>
            <p className="text-[9px] text-gray-500 leading-tight">Link nháp mã hóa, hết hạn an toàn sau 24 giờ.</p>
          </div>
          <div className="bg-white border border-gray-100 rounded-2xl p-3 flex flex-col shadow-sm">
            <div className="w-6 h-6 rounded-full bg-purple-50 text-purple-500 flex items-center justify-center mb-2">
              <span className="material-symbols-outlined text-[14px]">smartphone</span>
            </div>
            <h4 className="font-bold text-[11px] text-gray-800 leading-tight mb-1">Đa nền tảng</h4>
            <p className="text-[9px] text-gray-500 leading-tight">Chuẩn tỉ lệ cho cả iPhone và Android mượt mà.</p>
          </div>
        </div>

        {/* Bottom Actions */}
        <div className="flex w-full gap-2">
          <button 
            onClick={onClose}
            className="px-4 py-3 rounded-full text-gray-600 font-bold text-[13px] bg-gray-100 hover:bg-gray-200 transition-colors whitespace-nowrap"
          >
            Đóng cửa sổ
          </button>
          <button 
            onClick={downloadPng}
            className="flex-1 py-3 rounded-full bg-rose-50 text-rose-500 font-bold text-[13px] flex items-center justify-center gap-1 hover:bg-rose-100 transition-colors border border-rose-100 shadow-sm"
          >
            <span className="material-symbols-outlined text-[16px]">download</span>
            Tải ảnh PNG
          </button>
          <button 
            onClick={() => window.open(`https://zalo.me/share?url=${encodeURIComponent(url)}`, '_blank')}
            className="flex-1 py-3 rounded-full bg-rose-500 text-white font-bold text-[13px] flex items-center justify-center gap-1.5 hover:bg-rose-600 transition-colors shadow-md"
          >
            <span className="material-symbols-outlined text-[16px]">send</span>
            Gửi qua Zalo
          </button>
        </div>
      </div>
    </div>
  );
}
