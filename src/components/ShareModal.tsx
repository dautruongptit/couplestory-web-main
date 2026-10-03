import { QRCodeCanvas } from 'qrcode.react';
import { toast } from '@/utils/toast';
import { getStoryDisplayHost, getStoryPublicUrl } from '@/utils/publicStory';
import { FacebookIcon, InstagramIcon, MessengerIcon, ThreadsIcon, ZaloIcon } from '@/components/SocialIcons';
import type { StoryResponse } from '@/pages/Dashboard';

function loadLogo(): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = '/logo-mark.png';
  });
}

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  story: StoryResponse | null;
}

export default function ShareModal({ isOpen, onClose, story }: ShareModalProps) {
  if (!isOpen || !story) return null;

  const slug = story.slug || story.subdomain || story.id;
  const url = getStoryPublicUrl(slug);
  const encodedUrl = encodeURIComponent(url);

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(url);
      toast('Đã sao chép link', 'success');
    } catch {
      toast('Không sao chép được', 'error');
    }
  };

  const downloadQr = async () => {
    const qr = document.getElementById('share-qr-canvas') as HTMLCanvasElement | null;
    if (!qr) return;
    const logo = await loadLogo().catch(() => null);

    // Framed card: gradient border, white card, title, couple names, large QR and the website address.
    const W = 1200;
    const H = 1640;
    const canvas = document.createElement('canvas');
    canvas.width = W;
    canvas.height = H;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const gradient = ctx.createLinearGradient(0, 0, W, H);
    gradient.addColorStop(0, '#ff4d8d');
    gradient.addColorStop(1, '#a855f7');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, W, H);

    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.roundRect(60, 60, W - 120, H - 120, 56);
    ctx.fill();

    ctx.textAlign = 'center';
    ctx.fillStyle = '#ff4d8d';
    ctx.font = '700 64px sans-serif';
    ctx.fillText('CoupleStory', W / 2, 190);
    ctx.fillStyle = '#594046';
    ctx.font = '400 40px sans-serif';
    ctx.fillText('Quét mã để xem câu chuyện của', W / 2, 270);
    ctx.fillStyle = '#2e1220';
    ctx.font = '700 54px sans-serif';
    ctx.fillText(`${story.coupleName1} & ${story.coupleName2}`, W / 2, 350);

    const qrSize = 880;
    const qx = (W - qrSize) / 2;
    const qy = 440;
    ctx.strokeStyle = '#ff4d8d';
    ctx.lineWidth = 12;
    ctx.beginPath();
    ctx.roundRect(qx - 50, qy - 50, qrSize + 100, qrSize + 100, 40);
    ctx.stroke();
    ctx.imageSmoothingEnabled = false;
    ctx.drawImage(qr, qx, qy, qrSize, qrSize);
    ctx.imageSmoothingEnabled = true;

    if (logo) {
      const logoW = 170;
      const logoH = logoW * (logo.naturalHeight / logo.naturalWidth);
      ctx.drawImage(logo, W / 2 - logoW / 2, qy + qrSize / 2 - logoH / 2, logoW, logoH);
    }

    ctx.fillStyle = '#ff4d8d';
    ctx.font = '600 46px sans-serif';
    ctx.fillText(getStoryDisplayHost(slug), W / 2, qy + qrSize + 150);
    ctx.fillStyle = '#8d7076';
    ctx.font = '400 32px sans-serif';
    ctx.fillText('Mở camera điện thoại và hướng vào mã QR', W / 2, qy + qrSize + 215);

    const a = document.createElement('a');
    a.download = `couplestory-qr-${slug}.png`;
    a.href = canvas.toDataURL('image/png');
    a.click();
    toast('Đã tải mã QR', 'success');
  };

  const platforms = [
    {
      name: 'Facebook',
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      icon: <FacebookIcon size={44} />,
    },
    {
      name: 'Messenger',
      href: `https://www.facebook.com/dialog/send?link=${encodedUrl}&app_id=291494419107518&redirect_uri=${encodedUrl}`,
      icon: <MessengerIcon size={44} />,
    },
    {
      name: 'Zalo',
      href: `https://zalo.me/share?url=${encodedUrl}`,
      icon: <ZaloIcon size={44} />,
    },
    {
      name: 'Instagram',
      href: 'https://www.instagram.com/',
      copyFirst: true,
      icon: <InstagramIcon size={44} />,
    },
    {
      name: 'Threads',
      href: `https://www.threads.net/intent/post?text=${encodedUrl}`,
      icon: <ThreadsIcon size={44} />,
    },
  ];

  const handleShare = async (platform: (typeof platforms)[number]) => {
    if ('copyFirst' in platform && platform.copyFirst) {
      try {
        await navigator.clipboard.writeText(url);
        toast('Đã copy link! Đang mở ' + platform.name, 'success');
      } catch {
        toast('Không sao chép được', 'error');
      }
      setTimeout(() => window.open(platform.href, '_blank'), 800);
    } else {
      window.open(platform.href, '_blank');
    }
  };

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
            <div className="p-1.5 rounded-3xl bg-gradient-to-br from-[#ff4d8d] to-[#a855f7] shadow-md">
              <div className="relative p-4 bg-white rounded-[20px]">
                <QRCodeCanvas
                  id="share-qr-canvas"
                  value={url}
                  size={1000}
                  marginSize={2}
                  level="H"
                  bgColor="#ffffff"
                  fgColor="#1f2937"
                  style={{ width: 280, height: 280, display: 'block' }}
                />
                <span className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <img src="/logo-mark.png" alt="" width={60} className="w-[60px] h-auto drop-shadow-md" />
                </span>
              </div>
            </div>
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
            <div className="grid grid-cols-5 gap-1">
              {platforms.map(p => (
                <button
                  key={p.name}
                  onClick={() => handleShare(p)}
                  className="flex flex-col items-center gap-1.5 py-2 rounded-2xl hover:bg-gray-50 active:bg-gray-100 transition-colors"
                >
                  <span className="w-12 h-12 flex items-center justify-center">{p.icon}</span>
                  <span className="text-[11px] font-semibold text-gray-600">{p.name}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
