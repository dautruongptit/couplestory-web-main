import { QRCodeCanvas } from 'qrcode.react';

interface Props {
  url: string;
  /** DOM id of the canvas, used to download the QR image. */
  id: string;
  /** Displayed size in px; the canvas itself is drawn at 1000px so it stays sharp. */
  size?: number;
}

export default function FramedQr({ url, id, size = 240 }: Props) {
  const logoWidth = Math.round(size * 0.215);
  return (
    <div className="p-1.5 rounded-3xl bg-gradient-to-br from-[#ff4d8d] to-[#a855f7] shadow-md">
      <div className="relative p-4 bg-white rounded-[20px]">
        <QRCodeCanvas
          id={id}
          value={url}
          size={1000}
          marginSize={2}
          level="H"
          bgColor="#ffffff"
          fgColor="#1f2937"
          style={{ width: size, height: size, display: 'block' }}
        />
        <span className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <img src="/logo-mark.png" alt="" style={{ width: logoWidth }} className="h-auto drop-shadow-md" />
        </span>
      </div>
    </div>
  );
}
