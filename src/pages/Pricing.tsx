import { useState } from 'react';
import StartOrderButton from '../components/StartOrderButton';
import { usePlans } from '../hooks/usePlans';
import { formatPrice } from '../utils/formatPrice';

export default function Pricing() {
  const { plans } = usePlans();
  const [yearly, setYearly] = useState(false);

  const free = plans.find(p => p.code === 'FREE');
  const plus = plans.find(p => p.code === 'PLUS');
  const couple = plans.find(p => p.code === 'COUPLE');
  const premium = plans.find(p => p.code === 'PREMIUM');

  const price = (plan: typeof free, fallback: number) => {
    const p = plan?.price ?? fallback;
    if (yearly) return formatPrice(Math.round(p * 12 * 0.7));
    return formatPrice(p);
  };
  const period = yearly ? '/năm' : '/tháng';

  const cardData = [
    {
      code: 'FREE',
      badge: 'MIỄN PHÍ MÃI MÃI',
      badgeColor: 'bg-[#fff0f4] text-[#ff4d8d]',
      badgeIcon: '💖',
      name: 'Khởi Đầu Ngọt Ngào',
      desc: 'Trải nghiệm tạo website kỷ niệm đầu tiên và thiệp giản đơn tình yêu.',
      price: '0đ',
      period: '/tháng',
      features: [
        '1 Love Story hoạt động',
        'Tối đa 20 ảnh kỷ niệm tiêu chuẩn',
        '3 mẫu thiệp Love Card cơ bản',
        'Nhạc nền tuyến chọn sẵn (3 bài)',
        'Lưu trữ dữ liệu trong 6 tháng',
      ],
      note: 'Có hiển thị watermark CoupleStory',
      noteType: 'neutral' as const,
      cta: 'Gói Hiện Tại Của Bạn',
      ctaStyle: 'bg-[#f5eef1] text-[#594046]',
      highlight: false,
    },
    {
      code: 'PLUS',
      badge: 'CÁ NHÂN LÃNG MẠN',
      badgeColor: 'bg-[#e8f4ff] text-[#1d4ed8]',
      badgeIcon: '💕',
      name: 'Gắn Kết Yêu Thương',
      desc: 'Dành cho người muốn từ tay chăm chút món quà số đặc biệt cho người yêu.',
      price: price(plus, 39_000),
      period,
      features: [
        '3 Love Stories & không giới hạn thiệp',
        '150 ảnh HD & 3 video kỷ niệm ngắn',
        'Mở khóa 15+ Template nghệ thuật',
        'Tải file nhạc MP3 nền riêng theo ý thích',
        'Xóa hoàn toàn watermark CoupleStory',
        'Mã QR LoveCard thiết kế phong cách',
      ],
      cta: 'Nâng cấp PLUS →',
      ctaStyle: 'bg-[#f5eef1] text-[#594046] hover:bg-[#ffe8ef]',
      highlight: false,
    },
    {
      code: 'COUPLE',
      badge: 'YÊU THÍCH NHẤT',
      badgeColor: 'bg-gradient-to-r from-[#ff4d8d] to-[#e63e7b] text-white',
      badgeIcon: '💑',
      name: 'Gói COUPLE',
      desc: 'Hoàn hảo cho 2 người cùng đồng sở hữu, cùng đăng ảnh và đếm ngày yêu.',
      price: price(couple, 69_000),
      period,
      features: [
        'Đồng sở hữu 2 tài khoản (Chàng & Nàng)',
        'Không giới hạn Stories & Love Cards',
        'Lưu trữ ảnh Full HD & 4K không nén',
        'Hiệu ứng 3D mở phong bì sắp nung cảm xúc',
        'Mật mã bí mật riêng tư cho 2 người',
        'Tên miền riêng lãng mạn (vd: linh-va-nam.love)',
        'Thư viện nhạc bản quyền Lofi, Acoustic',
      ],
      cta: 'Nâng cấp COUPLE Ngay',
      ctaStyle: 'bg-gradient-to-r from-[#ff4d8d] to-[#e63e7b] text-white shadow-[0_4px_20px_rgba(255,77,141,0.4)] hover:shadow-[0_6px_24px_rgba(255,77,141,0.5)]',
      highlight: true,
    },
    {
      code: 'PREMIUM',
      badge: 'BẢO TỒN VĨNH VIÊN',
      badgeColor: 'bg-[#fff7e4] text-[#d97706]',
      badgeIcon: '👑',
      name: 'Gói PREMIUM',
      desc: 'Bảo chứng tình yêu trọn vẹn, hỗ trợ xuất bản sách kỷ niệm thực tế.',
      price: price(premium, 119_000),
      period,
      features: [
        'Tất cả quyền lợi của gói COUPLE',
        'Lưu trữ Cold-Storage bảo mật trọn đời',
        'Xuất file in ấn Photobook Scrapbook 300dpi',
        'Designer hỗ trợ custom hiệu ứng riêng',
        'Voice Note thì thầm chúc ngủ ngon mỗi ngày',
        'Máy chủ VIP ưu tiên tải trang siêu tốc',
      ],
      cta: 'Nâng cấp PREMIUM →',
      ctaStyle: 'bg-[#fff7e4] text-[#92400e] hover:bg-[#fef3c7]',
      highlight: false,
    },
  ];

  return (
    <div className="min-h-screen bg-[#faf7f8]">
      <div className="w-full pt-8 pb-16 lg:pt-12 lg:pb-24">
        {/* Header */}
        <div className="max-w-[1200px] mx-auto px-4 md:px-6 text-center mb-10">
          <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-[#fff0f4] border border-[#ffe0eb] text-xs font-bold text-[#ff4d8d] tracking-wider mb-4">
            <span className="material-symbols-outlined text-[14px]" style={{ fontVariationSettings: "'FILL' 1" }}>favorite</span>
            LỰA CHỌN GÓI BẢO TỒN KỶ NIỆM ✨
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-[#2e1220] mb-2">
            Choose the perfect plan for<br />
            <span className="text-[#ff4d8d] italic">your love story</span>
          </h1>
          <p className="text-sm text-[#594046] max-w-2xl mx-auto mb-6">
            Mỗi khoảnh khắc bên nhau xứng đáng được lưu giữ trọn vẹn, vĩnh viễn và không giới hạn cảm xúc. Hãy để CoupleStory cùng hai bạn viết nên chương kế tiếp.
          </p>

          {/* Toggle */}
          <div className="inline-flex items-center gap-1 p-1 rounded-full bg-[#f5eef1] border border-[#f0e4e8]">
            <button onClick={() => setYearly(false)} className={`px-3 sm:px-4 py-2 rounded-full text-sm font-semibold transition-all ${!yearly ? 'bg-white text-[#2e1220] shadow-sm' : 'text-[#594046]'}`}>
              Theo Quý
            </button>
            <button onClick={() => setYearly(true)} className={`px-3 sm:px-4 py-2 rounded-full text-sm font-semibold transition-all flex items-center gap-1.5 ${yearly ? 'bg-white text-[#2e1220] shadow-sm' : 'text-[#594046]'}`}>
              Theo Năm
              <span className="hidden sm:inline px-1.5 py-0.5 rounded-full bg-emerald-100 text-emerald-700 text-[10px] font-bold">Tiết kiệm 30% 🎁</span>
            </button>
          </div>
        </div>

        {/* Plan cards */}
        <div className="max-w-[1200px] mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 items-stretch">
            {cardData.map(card => (
              <div key={card.code} className={`relative flex flex-col rounded-2xl bg-white p-6 transition-all duration-300 ${
                card.highlight
                  ? 'shadow-[0_16px_40px_rgba(255,77,141,0.18)] border-2 border-[#ff4d8d]/30 lg:-translate-y-2 lg:scale-[1.02] z-10'
                  : 'shadow-sm border border-[#f0e4e8] hover:shadow-md'
              }`}>
                {/* Badge */}
                <div className="flex items-center justify-between mb-4">
                  <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-[11px] font-bold tracking-wider ${card.badgeColor}`}>
                    {card.badge}
                  </span>
                  <span className="text-lg">{card.badgeIcon}</span>
                </div>

                {/* Name & desc */}
                <h3 className="text-lg font-bold text-[#2e1220] mb-1">{card.name}</h3>
                <p className="text-xs text-[#594046] mb-4 min-h-[36px]">{card.desc}</p>

                {/* Price */}
                <div className="flex items-baseline gap-1 mb-5">
                  <span className="text-3xl font-bold text-[#2e1220]">{card.code === 'FREE' ? '0đ' : card.price}</span>
                  <span className="text-sm text-[#8d7076]">{card.code === 'FREE' ? '/tháng' : card.period}</span>
                </div>

                {/* Features */}
                <ul className="flex flex-col gap-2.5 mb-6 flex-1">
                  {card.features.map((f, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-[#2e1220]">
                      <span className={`material-symbols-outlined text-[16px] shrink-0 mt-0.5 ${card.highlight ? 'text-[#ff4d8d]' : card.code === 'PREMIUM' ? 'text-amber-500' : 'text-emerald-500'}`}>check_circle</span>
                      <span>{f}</span>
                    </li>
                  ))}
                  {card.note && (
                    <li className="flex items-start gap-2 text-sm text-[#8d7076]">
                      <span className="material-symbols-outlined text-[16px] shrink-0 mt-0.5 text-[#e1bec5]">radio_button_unchecked</span>
                      <span>{card.note}</span>
                    </li>
                  )}
                </ul>

                {/* CTA */}
                {card.code === 'FREE' ? (
                  <button disabled className={`w-full py-3 rounded-xl text-sm font-semibold ${card.ctaStyle}`}>{card.cta}</button>
                ) : (
                  <StartOrderButton planCode={card.code} className={`w-full py-3 rounded-xl text-sm font-bold transition-all ${card.ctaStyle}`}>
                    {card.cta}
                  </StartOrderButton>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Trust section */}
        <div className="max-w-[1200px] mx-auto px-4 md:px-6 mt-12">
          <div className="rounded-2xl bg-gradient-to-r from-[#fff5f8] to-[#fef0f4] border border-[#ffe0eb] p-6 md:p-8">
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="flex items-center gap-3 flex-1">
                <span className="material-symbols-outlined text-[#ff4d8d] text-[28px]" style={{ fontVariationSettings: "'FILL' 1" }}>shield</span>
                <div>
                  <p className="font-bold text-[#2e1220]">Cam kết bảo tồn ký ức vĩnh cửu</p>
                  <p className="text-xs text-[#594046]">Dữ liệu ảnh, thư tình và giọng nói được mã hóa 2 lớp an toàn tuyệt đối.</p>
                </div>
              </div>
              <div className="flex gap-6 text-center">
                <div>
                  <p className="text-lg font-bold text-[#ff4d8d]">100%</p>
                  <p className="text-[10px] text-[#594046]">Không xóa dữ liệu</p>
                </div>
                <div>
                  <p className="text-lg font-bold text-[#ff4d8d]">256-bit</p>
                  <p className="text-[10px] text-[#594046]">Mã hóa mật mã đôi</p>
                </div>
                <div>
                  <p className="text-lg font-bold text-[#ff4d8d]">Bất kỳ lúc nào</p>
                  <p className="text-[10px] text-[#594046]">Hủy hoặc đổi gói</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ section */}
        <div className="max-w-[800px] mx-auto px-4 md:px-6 mt-16">
          <h2 className="text-2xl font-bold text-[#2e1220] text-center mb-2">Câu hỏi thường gặp</h2>
          <p className="text-sm text-[#594046] text-center mb-8">Mọi thắc mắc của bạn về việc lưu giữ tình yêu cùng CoupleStory</p>

          <div className="flex flex-col gap-3">
            {[
              { q: 'Tính năng 2 người đồng sở hữu hoạt động thế nào?', a: 'Chỉ một người đăng ký và thanh toán. Sau đó nhập email người yêu để mời cùng quản lý. Người thương có tài khoản riêng miễn phí.' },
              { q: 'Nếu hết hạn gói cuộc, website kỷ niệm và ảnh của chúng mình có bị xóa không?', a: 'Không! Dữ liệu luôn được giữ lại. Website chỉ tạm ẩn cho đến khi bạn gia hạn.' },
              { q: 'Hình thức thanh toán hỗ trợ những gì?', a: 'Chuyển khoản ngân hàng. Sắp hỗ trợ thêm MoMo, ZaloPay, VNPay.' },
            ].map((item, i) => (
              <details key={i} className="group bg-white rounded-xl border border-[#f0e4e8] shadow-sm">
                <summary className="flex items-center justify-between px-5 py-4 cursor-pointer font-semibold text-sm text-[#2e1220] list-none">
                  {item.q}
                  <span className="material-symbols-outlined text-[#8d7076] text-[20px] group-open:rotate-180 transition-transform">expand_more</span>
                </summary>
                <div className="px-5 pb-4 text-sm text-[#594046] leading-relaxed">{item.a}</div>
              </details>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
