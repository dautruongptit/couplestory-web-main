import { getStoryDisplayHost } from '@/utils/publicStory';
import { toast } from '@/utils/toast';

function loadLogo(): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = '/logo-mark.png';
  });
}

/** Downloads a framed card: gradient border, title, couple names, large QR with the logo, and the website address. */
export async function downloadQrCard(qr: HTMLCanvasElement | null, slug: string, coupleNames: string): Promise<void> {
  if (!qr) return;
  const logo = await loadLogo().catch(() => null);

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
  ctx.fillText(coupleNames, W / 2, 350);

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
}
