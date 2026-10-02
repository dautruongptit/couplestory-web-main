import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="min-h-screen bg-[#faf7f8]">
      {/* ── Hero ─────────────────────────────────────────── */}
      <section className="relative overflow-hidden pt-8 pb-16 md:pt-12 md:pb-24">
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-[#ffe0eb]/40 rounded-full blur-3xl pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-16">
            {/* Left */}
            <div className="flex-1 text-center lg:text-left">
              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#fff0f4] border border-[#ffe0eb] text-xs font-bold text-[#ff4d8d] tracking-wider mb-4">
                <span className="material-symbols-outlined text-[14px]" style={{ fontVariationSettings: "'FILL' 1" }}>favorite</span>
                Phiên bản mới 3.0 · Thiệp tương tác &amp; Nhạc nền
              </div>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#2e1220] leading-tight mb-3">
                Xây dựng ngôi nhà số<br />cho <span className="text-[#ff4d8d] italic">Tình Yêu</span> của bạn
              </h1>
              <p className="text-sm md:text-base text-[#594046] max-w-lg mx-auto lg:mx-0 mb-6 leading-relaxed">
                Một không gian riêng tư, tương tác, dành riêng cho câu chuyện của hai bạn. Lưu giữ khoảnh khắc, phát nhạc yêu thương, đếm từng ngày bên nhau và chia sẻ một nơi chốn riêng tư với người mình yêu.
              </p>
              <div className="flex flex-col sm:flex-row items-center gap-3 justify-center lg:justify-start mb-5">
                <Link to="/register" className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-[#ff4d8d] to-[#e63e7b] text-white font-semibold shadow-[0_8px_24px_rgba(255,77,141,0.35)] hover:shadow-[0_12px_32px_rgba(255,77,141,0.45)] hover:scale-[1.02] active:scale-[0.98] transition-all">
                  <span className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>favorite</span>
                  Tạo website miễn phí
                </Link>
                <Link to="/s/eternal" className="inline-flex items-center gap-1.5 px-5 py-3 rounded-full border border-[#e1bec5] text-[#594046] font-medium hover:bg-[#fff5f9] hover:border-[#ff4d8d]/40 transition-all">
                  Xem Demo trực tiếp
                  <span className="material-symbols-outlined text-[16px] text-[#ff4d8d]">arrow_outward</span>
                </Link>
              </div>
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-x-4 gap-y-1 text-xs text-[#8d7076]">
                <span className="flex items-center gap-1"><span className="material-symbols-outlined text-emerald-500 text-[14px]">check_circle</span> Không cần thẻ tín dụng</span>
                <span className="flex items-center gap-1"><span className="material-symbols-outlined text-emerald-500 text-[14px]">check_circle</span> Miễn phí vĩnh viễn</span>
                <span className="flex items-center gap-1"><span className="material-symbols-outlined text-emerald-500 text-[14px]">check_circle</span> Sẵn sàng trong 30 giây</span>
              </div>
            </div>

            {/* Right - Phone mockup */}
            <div className="relative w-64 sm:w-72 lg:w-80 shrink-0">
              <div className="rounded-[2.5rem] bg-white p-3 shadow-[0_24px_48px_-12px_rgba(61,31,45,0.2)] border border-[#f0e4e8]">
                <div className="rounded-[2rem] overflow-hidden bg-gradient-to-br from-[#ffe8ef] to-[#ffd6e6] aspect-[9/16] flex flex-col items-center justify-center p-6 text-center">
                  <span className="material-symbols-outlined text-[48px] text-[#ff4d8d]/50 mb-3" style={{ fontVariationSettings: "'FILL' 1" }}>favorite</span>
                  <p className="text-sm font-bold text-[#2e1220] mb-1">Minh &amp; Linh</p>
                  <p className="text-[10px] text-[#8d7076]">520 ngày bên nhau</p>
                  <div className="mt-4 grid grid-cols-2 gap-2 w-full">
                    <div className="rounded-xl bg-white/70 p-2 text-center">
                      <p className="text-lg font-bold text-[#ff4d8d]">142</p>
                      <p className="text-[9px] text-[#8d7076]">Ảnh</p>
                    </div>
                    <div className="rounded-xl bg-white/70 p-2 text-center">
                      <p className="text-lg font-bold text-[#ff4d8d]">5</p>
                      <p className="text-[9px] text-[#8d7076]">Sự kiện</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Stats bar ────────────────────────────────────── */}
      <section className="py-8 bg-white border-y border-[#f0e4e8]">
        <div className="max-w-5xl mx-auto px-4 md:px-8 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {[
            { value: '5,000+', label: 'Câu chuyện tình yêu', sub: 'Trên khắp 63 tỉnh thành' },
            { value: '4.9 / 5', label: 'Đánh giá từ các cặp đôi', sub: '1,200+ lượt đánh giá' },
            { value: '120K+', label: 'Ảnh & Kỷ niệm', sub: 'Được lưu giữ an toàn' },
            { value: '100%', label: 'Miễn phí vĩnh viễn', sub: 'Không bao giờ phải xóa' },
          ].map(s => (
            <div key={s.label}>
              <p className="text-2xl font-bold text-[#ff4d8d]">{s.value}</p>
              <p className="text-sm font-semibold text-[#2e1220] mt-0.5">{s.label}</p>
              <p className="text-[11px] text-[#8d7076]">{s.sub}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── How it works ─────────────────────────────────── */}
      <section className="py-16 md:py-20">
        <div className="max-w-5xl mx-auto px-4 md:px-8 text-center">
          <p className="text-[10px] font-bold text-[#ff4d8d] tracking-widest uppercase mb-1">● Đơn giản, nhanh chóng &amp; lãng mạn</p>
          <h2 className="text-2xl md:text-3xl font-bold text-[#2e1220] mb-3">Tạo website tình yêu chỉ trong 2 phút</h2>
          <p className="text-sm text-[#594046] max-w-xl mx-auto mb-10">Không cần code, không cần kỹ năng thiết kế. Chỉ cần chọn giao diện, thêm ảnh kỷ niệm và chia sẻ đường link riêng.</p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                step: '01',
                icon: 'palette',
                title: 'Chọn giao diện lãng mạn',
                desc: 'Nhiều mẫu thiết kế từ phong cách polaroid cổ điển, scrapbook kỷ niệm, đến đêm sao lãng mạn.',
                tags: ['Polaroid Wall', 'Sweet Glow', 'Pastel Chic'],
              },
              {
                step: '02',
                icon: 'photo_library',
                title: 'Thêm kỷ niệm yêu thương',
                desc: 'Upload ảnh, viết lời tâm sự kỷ niệm, thêm nhạc yêu thích. Kể lại hành trình từ lần đầu gặp gỡ.',
                tags: ['Drag & drop', 'Tùy chỉnh dễ'],
              },
              {
                step: '03',
                icon: 'share',
                title: 'Chia sẻ đường link riêng',
                desc: 'Nhận đường link riêng hoặc mã QR. Chia sẻ với người yêu hoặc đặt lên bàn tiệc kỷ niệm.',
                tags: ['Passcode lock'],
              },
            ].map(item => (
              <div key={item.step} className="bg-white rounded-2xl p-6 border border-[#f0e4e8] shadow-sm hover:shadow-md transition-shadow text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-[#fff0f4] mb-3">
                  <span className="material-symbols-outlined text-[#ff4d8d] text-[24px]">{item.icon}</span>
                </div>
                <p className="text-[10px] font-bold text-[#ff4d8d] tracking-widest mb-1">{item.step}</p>
                <h3 className="text-base font-bold text-[#2e1220] mb-2">{item.title}</h3>
                <p className="text-xs text-[#594046] leading-relaxed mb-3">{item.desc}</p>
                <div className="flex flex-wrap justify-center gap-1.5">
                  {item.tags.map(t => (
                    <span key={t} className="px-2 py-0.5 rounded-full bg-[#f5eef1] text-[10px] text-[#594046] font-medium">{t}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Features ─────────────────────────────────────── */}
      <section id="features" className="py-16 md:py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 md:px-8">
          <div className="text-center mb-10">
            <p className="text-[10px] font-bold text-[#ff4d8d] tracking-widest uppercase mb-1">● Được tạo ra từ tình yêu</p>
            <h2 className="text-2xl md:text-3xl font-bold text-[#2e1220] mb-2">Mọi tính năng cho câu chuyện tình yêu, trong một nơi chốn</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {[
              {
                icon: 'music_note',
                color: 'from-[#7c3aed] to-[#a855f7]',
                title: 'Nhạc nền phát khi mở trang',
                desc: 'Chào đón người xem bằng bản nhạc yêu thích. Phát tự động với nút nhạc lãng mạn ngay trên trang.',
              },
              {
                icon: 'language',
                color: 'from-[#0ea5e9] to-[#38bdf8]',
                title: 'Tên miền riêng & Mật khẩu bí mật',
                desc: 'Sở hữu đường link riêng như linh-va-nam.couplestory.site hoặc gắn tên miền .love, .com.',
              },
              {
                icon: 'mail',
                color: 'from-[#f43f5e] to-[#fb7185]',
                title: 'Thiệp tình yêu & Phong bì hoạt hình',
                desc: 'Gửi thiệp kỷ niệm với hiệu ứng mở phong bì, trái tim bay và hiệu ứng confetti.',
              },
              {
                icon: 'timer',
                color: 'from-[#f59e0b] to-[#fbbf24]',
                title: 'Đếm ngược & Mốc kỷ niệm',
                desc: 'Theo dõi ngày, giờ, phút bên nhau. Hiển thị countdown đến ngày cưới hoặc kỷ niệm sắp tới.',
              },
            ].map(f => (
              <div key={f.title} className="flex gap-4 p-5 rounded-2xl bg-[#faf7f8] border border-[#f0e4e8] hover:shadow-sm transition-shadow">
                <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${f.color} flex items-center justify-center shrink-0`}>
                  <span className="material-symbols-outlined text-white text-[22px]">{f.icon}</span>
                </div>
                <div>
                  <h3 className="font-bold text-[#2e1220] text-sm mb-1">{f.title}</h3>
                  <p className="text-xs text-[#594046] leading-relaxed">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Testimonials ─────────────────────────────────── */}
      <section className="py-16 md:py-20">
        <div className="max-w-5xl mx-auto px-4 md:px-8 text-center">
          <p className="text-[10px] font-bold text-[#ff4d8d] tracking-widest uppercase mb-1">● Câu chuyện tình yêu thật</p>
          <h2 className="text-2xl md:text-3xl font-bold text-[#2e1220] mb-8">Được yêu thích bởi các cặp đôi trên mọi miền</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {[
              {
                quote: '"Trang web kỷ niệm trên CoupleStory thật sự là món quà bất ngờ nhất mình từng nhận. Người yêu mình đã khóc khi mở link."',
                name: 'Minh & Linh',
                info: 'Kỷ niệm 1 năm · Hà Nội',
              },
              {
                quote: '"Chúng mình dùng mã QR từ CoupleStory in trên thiệp cưới. Khách mời quét là xem được hành trình 6 năm yêu nhau."',
                name: 'Chloe & Daniel',
                info: 'Ngày cưới · Hồ Chí Minh',
              },
            ].map(t => (
              <div key={t.name} className="bg-white rounded-2xl p-6 border border-[#f0e4e8] shadow-sm text-left">
                <div className="flex gap-0.5 mb-3">
                  {Array(5).fill(0).map((_, i) => <span key={i} className="text-amber-400 text-sm">★</span>)}
                </div>
                <p className="text-sm text-[#2e1220] leading-relaxed mb-4 italic">{t.quote}</p>
                <div>
                  <p className="font-bold text-sm text-[#2e1220]">{t.name}</p>
                  <p className="text-[11px] text-[#8d7076]">{t.info}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────── */}
      <section className="py-16 md:py-20">
        <div className="max-w-4xl mx-auto px-4 md:px-8">
          <div className="rounded-2xl bg-gradient-to-r from-[#ff4d8d] via-[#e63e7b] to-[#c026d3] p-8 md:p-12 text-center text-white shadow-xl relative overflow-hidden">
            <div className="absolute top-4 left-8 text-white/10 text-4xl select-none">♥</div>
            <div className="absolute bottom-4 right-8 text-white/10 text-5xl select-none">♥</div>
            <div className="relative z-10">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 text-xs font-bold mb-4">
                Chỉ cần 30 giây để bắt đầu ✨
              </div>
              <h2 className="text-2xl md:text-3xl font-bold mb-3">Sẵn sàng viết chương tiếp theo cùng nhau?</h2>
              <p className="text-sm text-white/85 max-w-xl mx-auto mb-6">
                Tạo website tình yêu cá nhân hóa ngay hôm nay. Miễn phí vĩnh viễn, riêng tư và đầy ắp kỷ niệm không bao giờ phai.
              </p>
              <Link to="/register" className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-white text-[#ff4d8d] font-bold shadow-[0_6px_20px_rgba(0,0,0,0.15)] hover:scale-105 active:scale-95 transition-all">
                <span className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>favorite</span>
                Tạo website tình yêu miễn phí
              </Link>
              <div className="flex flex-wrap items-center justify-center gap-3 mt-4 text-xs text-white/70">
                <span>✓ Không tải app</span>
                <span>✓ Dùng trên mọi thiết bị</span>
                <span>✓ 100% Riêng tư</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
