import { usePlans } from '../hooks/usePlans';
import { formatPrice } from '../utils/formatPrice';

export default function PricingMobile() {
  const { plans } = usePlans();
  const free = plans.find(p => p.code === 'FREE');
  const pro = plans.find(p => p.code === 'PRO');
  const couple = plans.find(p => p.code === 'COUPLE');
  const proMax = plans.find(p => p.code === 'PRO_MAX');

  return (
    <>
<div>
  <main className="flex flex-col relative w-full pt-16 bg-surface min-h-screen"><div className="flex flex-col w-full">
      {/* 1. MOBILE HERO */}
      <section className="px-gutter-mobile pt-space-md pb-space-lg flex flex-col items-center text-center relative overflow-hidden">
        {/* Ambient glowing backdrop effect */}
        <div className="absolute -top-12 -left-12 w-48 h-48 rounded-full bg-primary/10 blur-3xl pointer-events-none" />
        <div className="absolute top-20 -right-12 w-52 h-52 rounded-full bg-secondary-container/40 blur-3xl pointer-events-none" />
        {/* Badge */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface-container-high text-on-surface-variant font-label-sm text-label-sm shadow-sm mb-space-sm">
          <span className="text-primary text-[13px]">✨</span>
          <span className="tracking-wide">BẢNG GIÁ MINH BẠCH</span>
        </div>
        {/* Headline & Dancing Script Accent */}
        <h2 className="font-headline-xl-mobile text-headline-xl-mobile text-on-surface font-black tracking-tight mt-1 mb-2">
          Đầu tư cho kỷ niệm tình yêu vĩnh cửu
        </h2>
        <p className="italic text-primary font-headline-md text-[20px] leading-relaxed mb-space-md opacity-90" style={{fontFamily: '"Playfair Display", serif'}}>
          “Your love story, beautifully told”
        </p>
        {/* Couple visual snippet */}
        <div className="w-full flex items-center justify-center mb-space-md">
          <div className="relative flex items-center">
            <div className="w-12 h-12 rounded-full overflow-hidden shadow-md">
              <img className="w-full h-full object-cover" data-alt="Intimate romantic portrait of a young Asian woman looking lovingly at her partner, soft warm golden hour light, cinematic 35mm tone, gentle pink and blush palette" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBYtue9BKb9SXmCavORBmgiA-uoMKsnv2fZFNgRPHTZP4AbOUTzQiclrHKtyoU0yzSwqjdMuj49JDV-DdEt-WxBQswQ7zeL_k1wagm1EMqo_-HQiIKUQxVyvWg-izF95jZwKOg_-kZ59oZskuUApABNs1B8a__BAzw6sb9nHVBM7qKAOhB1tGzczmWGHONNIvgSNAqgJ1UK-n5Puss_5gF2s7et7qgo70Rmlni6zw4km2Uty4_rBz81" />
            </div>
            <div className="w-12 h-12 rounded-full overflow-hidden shadow-md -ml-3">
              <img className="w-full h-full object-cover" data-alt="Warm aesthetic close-up of a stylish young Asian man smiling tenderly outdoor cafe setting, natural gentle morning sunshine, filmic blush rose tones" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDTv_RbLwVQ76EG_1_yRw1v3kKJ1hoy8PQoRzcgQSZU3RYUqEtF9AWkiRqrPj_KKcpaNbntMsE7urzRyLMMfOk_t5L7dxE0nHeqg0BalnUkh7Uwmz-MwoxjhUqIqI0AWn31ahmeFyzeI7fQueCk2TXS-NjBcaKBGfFZVC3KG9O0V6-2D3CV6k_aynxHOKynsiikOxZZcKXEZ2nFn5E6d7Q1BnlrG3TjaMwIWUkHlK3eVxa8plZWpl8x" />
            </div>
            <div className="w-7 h-7 rounded-full bg-primary-container text-on-primary flex items-center justify-center -ml-2 shadow-sm">
              <span className="material-symbols-outlined text-[15px]" style={{fontVariationSettings: '"FILL" 1'}}>favorite</span>
            </div>
          </div>
        </div>
        {/* Trust Highlights */}
        <div className="flex flex-wrap justify-center items-center gap-1.5 w-full mb-space-sm">
          <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-surface-container-low text-on-surface-variant font-label-sm text-label-sm shadow-sm">
            <span className="material-symbols-outlined text-primary text-[14px]">check_circle</span>
            <span>Không phí ẩn</span>
          </div>
          <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-surface-container-low text-on-surface-variant font-label-sm text-label-sm shadow-sm">
            <span className="material-symbols-outlined text-primary text-[14px]">all_inclusive</span>
            <span>Thanh toán trọn đời</span>
          </div>
          <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-surface-container-low text-on-surface-variant font-label-sm text-label-sm shadow-sm">
            <span className="material-symbols-outlined text-primary text-[14px]">verified_user</span>
            <span>Mã hoá 256-bit</span>
          </div>
        </div>
        {/* Story limit note */}
        <div className="w-full max-w-sm mt-space-xs p-2.5 rounded-DEFAULT bg-surface-container-high/80 text-on-surface-variant font-body-sm text-body-sm flex items-center justify-center gap-1.5 shadow-sm">
          <span className="text-[14px]">💡</span>
          <span>Giá tính theo từng Story · Tối đa 3 Story/tài khoản</span>
        </div>
      </section>
      {/* 2. PRICING CARDS */}
      <section className="px-gutter-mobile flex flex-col gap-space-md mb-space-xl">
        {/* PLAN 1: FREE */}
        <div className="p-space-md rounded-lg bg-surface-container-lowest shadow-md flex flex-col justify-between transition-all">
          <div className="flex justify-between items-start mb-space-sm">
            <div>
              <span className="font-label-sm text-label-sm tracking-wider uppercase text-on-surface-variant">Khởi đầu êm đềm</span>
              <h3 className="font-headline-md text-headline-md text-on-surface mt-0.5">{free?.name ?? 'Free'}</h3>
            </div>
            <span className="px-2.5 py-1 rounded-full bg-surface-container text-on-surface-variant font-label-sm text-label-sm">Trọn đời</span>
          </div>
          <div className="flex items-baseline gap-1 my-space-xs">
            <span className="font-headline-xl-mobile text-headline-xl-mobile font-bold text-on-surface">{formatPrice(free?.price ?? 0)}</span>
            <span className="font-body-sm text-body-sm text-on-surface-variant">/ miễn phí trọn đời</span>
          </div>
          <p className="font-body-sm text-body-sm text-on-surface-variant mb-space-md">{free?.description ?? ''}</p>
          <div className="flex flex-col gap-2 pt-space-xs mb-space-lg">
            <div className="flex items-center gap-2 text-on-surface font-body-sm text-body-sm">
              <span className="material-symbols-outlined text-primary text-[18px]">done</span>
              <span>1 Story tình yêu tiêu chuẩn</span>
            </div>
            <div className="flex items-center gap-2 text-on-surface font-body-sm text-body-sm">
              <span className="material-symbols-outlined text-primary text-[18px]">done</span>
              <span>Tải lên tối đa 30 bức ảnh</span>
            </div>
            <div className="flex items-center gap-2 text-on-surface-variant font-body-sm text-body-sm opacity-60">
              <span className="material-symbols-outlined text-[18px]">close</span>
              <span>Chưa hỗ trợ mời người yêu cùng sửa</span>
            </div>
          </div>
          <button className="w-full py-3 rounded-full bg-surface-container-high text-on-surface font-label-md text-label-md hover:bg-surface-container transition-transform active:scale-95 shadow-sm">
            Bắt đầu miễn phí
          </button>
        </div>
        {/* PLAN 2: PRO */}
        <div className="p-space-md rounded-lg bg-surface-container-lowest shadow-md flex flex-col justify-between transition-all">
          <div className="flex justify-between items-start mb-space-sm">
            <div>
              <span className="font-label-sm text-label-sm tracking-wider uppercase text-on-surface-variant">Lưu giữ bền lâu</span>
              <h3 className="font-headline-md text-headline-md text-on-surface mt-0.5">{pro?.name ?? 'Pro'}</h3>
            </div>
            <span className="px-2.5 py-1 rounded-full bg-surface-container-high text-primary font-label-sm text-label-sm font-semibold">Trọn đời</span>
          </div>
          <div className="flex items-baseline gap-1 my-space-xs">
            <span className="font-headline-xl-mobile text-headline-xl-mobile font-bold text-on-surface">{formatPrice(pro?.price ?? 0)}</span>
            <span className="font-body-sm text-body-sm text-on-surface-variant">/ trọn đời</span>
          </div>
          <p className="font-body-sm text-body-sm text-on-surface-variant mb-space-md">{pro?.description ?? ''}</p>
          <div className="flex flex-col gap-2 pt-space-xs mb-space-lg">
            <div className="flex items-center gap-2 text-on-surface font-body-sm text-body-sm">
              <span className="material-symbols-outlined text-primary text-[18px]">done</span>
              <span>Lưu giữ vĩnh viễn không hết hạn</span>
            </div>
            <div className="flex items-center gap-2 text-on-surface font-body-sm text-body-sm">
              <span className="material-symbols-outlined text-primary text-[18px]">done</span>
              <span>Không giới hạn hình ảnh &amp; video ngắn</span>
            </div>
            <div className="flex items-center gap-2 text-on-surface font-body-sm text-body-sm">
              <span className="material-symbols-outlined text-primary text-[18px]">done</span>
              <span>Bảo mật mã PIN bảo vệ không gian riêng</span>
            </div>
            <div className="flex items-center gap-2 text-on-surface-variant font-body-sm text-body-sm opacity-60">
              <span className="material-symbols-outlined text-[18px]">close</span>
              <span>Không có chế độ đồng chỉnh sửa cặp đôi</span>
            </div>
          </div>
          <button className="w-full py-3 rounded-full bg-surface-container-high text-on-surface font-label-md text-label-md hover:bg-surface-variant transition-transform active:scale-95 shadow-sm">
            Chọn gói Pro
          </button>
        </div>
        {/* PLAN 3: COUPLE (FEATURED) */}
        <div className="relative p-space-md rounded-lg bg-surface-container-lowest shadow-xl flex flex-col justify-between overflow-hidden">
          {/* Glow ambient backdrop */}
          <div className="absolute -top-10 -right-10 w-36 h-36 rounded-full bg-primary/20 blur-2xl pointer-events-none" />
          {/* Top banner ribbon inside card */}
          <div className="flex justify-between items-center mb-space-sm relative z-10">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary text-on-primary font-label-sm text-label-sm font-bold shadow-md">
              <span>PHỔ BIẾN NHẤT</span>
              <span>💑</span>
            </div>
            <span className="font-label-sm text-label-sm text-primary font-semibold tracking-wide">Khuyên Dùng Cho 2 Người</span>
          </div>
          <div className="relative z-10">
            <div className="flex items-center gap-2 mt-1">
              <h3 className="font-headline-md text-headline-md text-on-surface">{couple?.name ?? 'Couple'}</h3>
              <span className="text-[20px]">💑</span>
            </div>
            <div className="flex items-baseline gap-1 my-space-xs">
              <span className="font-headline-xl-mobile text-headline-xl-mobile font-bold text-primary">{formatPrice(couple?.price ?? 0)}</span>
              <span className="font-body-sm text-body-sm text-on-surface-variant">/ trọn đời</span>
            </div>
            <p className="font-body-sm text-body-sm text-on-surface-variant mb-space-md">{couple?.description ?? ''}</p>
            {/* Couple perk highlight box */}
            <div className="p-3 rounded-DEFAULT bg-surface-container mb-space-md flex flex-col gap-1.5">
              <div className="flex items-center gap-2 text-primary font-title-md text-title-md">
                <span className="material-symbols-outlined text-[20px]" style={{fontVariationSettings: '"FILL" 1'}}>diversity_1</span>
                <span>Đặc quyền Đồng Hành (Co-presence)</span>
              </div>
              <p className="font-body-sm text-body-sm text-on-secondary-container">
                Hai tài khoản liên kết chặt chẽ: Thấy người yêu đang xem trang, cùng thả tim và để lại lời nhắn bí mật.
              </p>
            </div>
            <div className="flex flex-col gap-2.5 mb-space-lg">
              <div className="flex items-start gap-2 text-on-surface font-body-sm text-body-sm">
                <span className="material-symbols-outlined text-primary text-[20px] shrink-0">check_circle</span>
                <span><strong>2 Tài khoản cùng quản trị:</strong> Cả hai đều có quyền chỉnh sửa nội dung song song.</span>
              </div>
              <div className="flex items-start gap-2 text-on-surface font-body-sm text-body-sm">
                <span className="material-symbols-outlined text-primary text-[20px] shrink-0">check_circle</span>
                <span><strong>Dual-presence Live:</strong> Hiển thị chấm sáng và vị trí khi nửa kia đang mở Story.</span>
              </div>
              <div className="flex items-start gap-2 text-on-surface font-body-sm text-body-sm">
                <span className="material-symbols-outlined text-primary text-[20px] shrink-0">check_circle</span>
                <span><strong>Timeline Cột mốc tình yêu:</strong> Đếm ngày yêu, nhắc hẹn hò và lưu khoảnh khắc kỷ niệm.</span>
              </div>
              <div className="flex items-start gap-2 text-on-surface font-body-sm text-body-sm">
                <span className="material-symbols-outlined text-primary text-[20px] shrink-0">check_circle</span>
                <span><strong>Bảo mật riêng tư 2 lớp:</strong> Khoá vân tay &amp; mật khẩu phòng riêng chỉ 2 người biết.</span>
              </div>
            </div>
            <button className="w-full py-3.5 rounded-full bg-primary-container text-on-primary font-title-md text-title-md hover:bg-primary transition-all active:scale-95 shadow-lg flex items-center justify-center gap-2">
              <span>Chọn gói COUPLE</span>
              <span className="material-symbols-outlined text-[18px]">favorite</span>
            </button>
          </div>
        </div>
        {/* PLAN 4: PRO MAX */}
        <div className="p-space-md rounded-lg bg-surface-container-lowest shadow-md flex flex-col justify-between transition-all">
          <div className="flex justify-between items-start mb-space-sm">
            <div>
              <div className="flex items-center gap-1.5">
                <h3 className="font-headline-md text-headline-md text-on-surface">{proMax?.name ?? 'Pro Max'}</h3>
                <span className="px-2 py-0.5 rounded-full bg-secondary-container text-on-secondary-container font-label-sm text-label-sm font-bold">VIP ⭐</span>
              </div>
              <span className="font-label-sm text-label-sm tracking-wider uppercase text-on-surface-variant mt-0.5 block">Tuyệt tác cá nhân hóa</span>
            </div>
            <span className="px-2.5 py-1 rounded-full bg-surface-container text-on-surface-variant font-label-sm text-label-sm">Độc quyền</span>
          </div>
          <div className="flex items-baseline gap-1 my-space-xs">
            <span className="font-headline-xl-mobile text-headline-xl-mobile font-bold text-on-surface">{formatPrice(proMax?.price ?? 0)}</span>
            <span className="font-body-sm text-body-sm text-on-surface-variant">/ trọn đời</span>
          </div>
          <p className="font-body-sm text-body-sm text-on-surface-variant mb-space-md">{proMax?.description ?? ''}</p>
          <div className="flex flex-col gap-2 pt-space-xs mb-space-lg">
            <div className="flex items-center gap-2 text-on-surface font-body-sm text-body-sm">
              <span className="material-symbols-outlined text-primary text-[18px]">done</span>
              <span>Bao gồm toàn bộ tính năng gói COUPLE</span>
            </div>
            <div className="flex items-center gap-2 text-on-surface font-body-sm text-body-sm">
              <span className="material-symbols-outlined text-primary text-[18px]">done</span>
              <span>Gắn tên miền riêng tùy chỉnh (Custom Domain)</span>
            </div>
            <div className="flex items-center gap-2 text-on-surface font-body-sm text-body-sm">
              <span className="material-symbols-outlined text-primary text-[18px]">done</span>
              <span>Xóa hoàn toàn biểu tượng/branding CoupleStory</span>
            </div>
            <div className="flex items-center gap-2 text-on-surface font-body-sm text-body-sm">
              <span className="material-symbols-outlined text-primary text-[18px]">done</span>
              <span>Hỗ trợ xuất bản cuốn Photobook PDF cao cấp</span>
            </div>
          </div>
          <button className="w-full py-3 rounded-full bg-surface-container-high text-on-surface font-label-md text-label-md hover:bg-surface-variant transition-transform active:scale-95 shadow-sm">
            Chọn gói PRO MAX
          </button>
        </div>
      </section>
      {/* 3. MOBILE FEATURE COMPARISON (Tabbed Segmented View) */}
      <section className="px-gutter-mobile mb-space-xl flex flex-col">
        <div className="text-center mb-space-md">
          <span className="font-label-sm text-label-sm uppercase tracking-widest text-primary font-bold">SO SÁNH CHI TIẾT</span>
          <h3 className="font-headline-lg-mobile text-headline-lg-mobile text-on-surface font-bold mt-1">
            Tại sao gói COUPLE là lựa chọn lý tưởng?
          </h3>
          <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">Được thiết kế tỉ mỉ để tình yêu của hai bạn có một tổ ấm số đích thực.</p>
        </div>
        {/* Segmented Tab Bar */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none w-full" id="pricing-tabs-container">
          <button className="px-3.5 py-1.5 rounded-full bg-primary text-on-primary font-label-sm text-label-sm shrink-0 transition-all shadow-sm" id="tab-btn-all" onClick={() => {}}>Tất cả</button>
          <button className="px-3.5 py-1.5 rounded-full bg-surface-container text-on-surface-variant font-label-sm text-label-sm shrink-0 transition-all" id="tab-btn-storage" onClick={() => {}}>Lưu trữ</button>
          <button className="px-3.5 py-1.5 rounded-full bg-surface-container text-on-surface-variant font-label-sm text-label-sm shrink-0 transition-all" id="tab-btn-photos" onClick={() => {}}>Hình ảnh</button>
          <button className="px-3.5 py-1.5 rounded-full bg-surface-container text-on-surface-variant font-label-sm text-label-sm shrink-0 transition-all" id="tab-btn-couple" onClick={() => {}}>💑 COUPLE</button>
          <button className="px-3.5 py-1.5 rounded-full bg-surface-container text-on-surface-variant font-label-sm text-label-sm shrink-0 transition-all" id="tab-btn-security" onClick={() => {}}>Bảo mật</button>
        </div>
        {/* Tab Panels Container */}
        <div className="mt-space-sm flex flex-col gap-2.5">
          {/* Feature Item 1: Co-editing */}
          <div className="tab-item p-space-md rounded-DEFAULT bg-surface-container-lowest shadow-sm flex flex-col gap-2" data-cat="all couple">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <span className="w-8 h-8 rounded-full bg-secondary-container text-on-secondary-container flex items-center justify-center">
                  <span className="material-symbols-outlined text-[16px]">group</span>
                </span>
                <span className="font-title-md text-title-md text-on-surface">Đồng chỉnh sửa 2 người</span>
              </div>
              <span className="px-2 py-0.5 rounded-full bg-primary-container text-on-primary font-label-sm text-label-sm font-semibold">💑 COUPLE &amp; PRO MAX</span>
            </div>
            <p className="font-body-sm text-body-sm text-on-surface-variant">
              Cả bạn và người yêu đều có tài khoản riêng, cùng đăng ảnh, ghi nhật ký hẹn hò theo thời gian thực mà không cần chia sẻ mật mã cá nhân.
            </p>
          </div>
          {/* Feature Item 2: Storage */}
          <div className="tab-item p-space-md rounded-DEFAULT bg-surface-container-lowest shadow-sm flex flex-col gap-2" data-cat="all storage">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <span className="w-8 h-8 rounded-full bg-surface-container-high text-on-surface-variant flex items-center justify-center">
                  <span className="material-symbols-outlined text-[16px]">cloud_sync</span>
                </span>
                <span className="font-title-md text-title-md text-on-surface">Thời gian lưu giữ</span>
              </div>
              <span className="font-label-sm text-label-sm text-primary font-bold">Vĩnh Viễn</span>
            </div>
            <p className="font-body-sm text-body-sm text-on-surface-variant">
              Chỉ trả phí một lần, sở hữu trọn đời. Không bao giờ phát sinh phí duy trì máy chủ hàng tháng.
            </p>
          </div>
          {/* Feature Item 3: Photos & Videos */}
          <div className="tab-item p-space-md rounded-DEFAULT bg-surface-container-lowest shadow-sm flex flex-col gap-2" data-cat="all photos">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <span className="w-8 h-8 rounded-full bg-surface-container-high text-on-surface-variant flex items-center justify-center">
                  <span className="material-symbols-outlined text-[16px]">photo_library</span>
                </span>
                <span className="font-title-md text-title-md text-on-surface">Dung lượng hình ảnh</span>
              </div>
              <span className="font-label-sm text-label-sm text-on-surface-variant">Không giới hạn (Gói 49k+)</span>
            </div>
            <p className="font-body-sm text-body-sm text-on-surface-variant">
              Hình ảnh lưu trữ giữ nguyên độ sắc nét gốc để bạn có thể xem lại rõ từng nụ cười năm xưa trên mọi thiết bị di động hay máy tính.
            </p>
          </div>
          {/* Feature Item 4: Security */}
          <div className="tab-item p-space-md rounded-DEFAULT bg-surface-container-lowest shadow-sm flex flex-col gap-2" data-cat="all security">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <span className="w-8 h-8 rounded-full bg-surface-container-high text-on-surface-variant flex items-center justify-center">
                  <span className="material-symbols-outlined text-[16px]">lock</span>
                </span>
                <span className="font-title-md text-title-md text-on-surface">Khóa bảo mật riêng tư</span>
              </div>
              <span className="font-label-sm text-label-sm text-primary font-bold">256-bit AES</span>
            </div>
            <p className="font-body-sm text-body-sm text-on-surface-variant">
              Đặt mật mã số hoặc đường link bí mật. Chỉ những ai bạn gửi link và nhập đúng mã mới có thể ghé thăm căn phòng kỷ niệm.
            </p>
          </div>
          {/* Feature Item 5: Custom Domain */}
          <div className="tab-item p-space-md rounded-DEFAULT bg-surface-container-lowest shadow-sm flex flex-col gap-2" data-cat="all couple">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <span className="w-8 h-8 rounded-full bg-surface-container-high text-on-surface-variant flex items-center justify-center">
                  <span className="material-symbols-outlined text-[16px]">link</span>
                </span>
                <span className="font-title-md text-title-md text-on-surface">Tên miền &amp; Xoá Logo</span>
              </div>
              <span className="font-label-sm text-label-sm text-secondary font-bold">Gói PRO MAX</span>
            </div>
            <p className="font-body-sm text-body-sm text-on-surface-variant">
              Dành trọn vẹn sự chú ý cho câu chuyện tình yêu với địa chỉ web mang tên hai người.
            </p>
          </div>
        </div>
      </section>
      {/* 4. FAQ ACCORDION */}
      <section className="px-gutter-mobile mb-space-xl flex flex-col">
        <div className="text-center mb-space-md">
          <span className="font-label-sm text-label-sm uppercase tracking-widest text-primary font-bold">GIẢI ĐÁP THẮC MẮC</span>
          <h3 className="font-headline-lg-mobile text-headline-lg-mobile text-on-surface font-bold mt-1">
            Câu hỏi thường gặp
          </h3>
        </div>
        <div className="flex flex-col gap-2.5">
          {/* FAQ 1 */}
          <details className="group p-space-md rounded-lg bg-surface-container-lowest shadow-sm transition-all">
            <summary className="flex justify-between items-center cursor-pointer list-none gap-2 font-title-md text-title-md text-on-surface select-none">
              <span>Gói COUPLE có phải 2 người đều trả tiền không?</span>
              <span className="material-symbols-outlined text-primary text-[22px] transition-transform duration-200 group-open:rotate-180 shrink-0">expand_more</span>
            </summary>
            <div className="pt-3 font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
              <strong>Không cần ạ!</strong> Chỉ cần 1 trong hai bạn thanh toán trọn đời ({formatPrice(couple?.price ?? 0)}). Sau đó, bạn chỉ việc nhập email của người yêu để gửi lời mời liên kết. Nửa kia sẽ được kích hoạt quyền đồng sở hữu ngay lập tức mà không tốn thêm bất kỳ chi phí nào.
            </div>
          </details>
          {/* FAQ 2 */}
          <details className="group p-space-md rounded-lg bg-surface-container-lowest shadow-sm transition-all">
            <summary className="flex justify-between items-center cursor-pointer list-none gap-2 font-title-md text-title-md text-on-surface select-none">
              <span>Phí thanh toán trọn đời hay thu định kỳ hàng tháng?</span>
              <span className="material-symbols-outlined text-primary text-[22px] transition-transform duration-200 group-open:rotate-180 shrink-0">expand_more</span>
            </summary>
            <div className="pt-3 font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
              Toàn bộ các gói trả phí của CoupleStory (Pro, COUPLE, PRO MAX) đều là <strong>thanh toán trọn đời</strong>. Bạn không phải lo lắng về việc gia hạn định kỳ hay mất đi kỷ nguyên tình cảm của mình vì quên đóng phí.
            </div>
          </details>
          {/* FAQ 3 */}
          <details className="group p-space-md rounded-lg bg-surface-container-lowest shadow-sm transition-all">
            <summary className="flex justify-between items-center cursor-pointer list-none gap-2 font-title-md text-title-md text-on-surface select-none">
              <span>Hết hạn 7 ngày dùng thử Trial có bị mất ảnh không?</span>
              <span className="material-symbols-outlined text-primary text-[22px] transition-transform duration-200 group-open:rotate-180 shrink-0">expand_more</span>
            </summary>
            <div className="pt-3 font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
              Khi hết 7 ngày dùng thử, trang Story sẽ tạm thời bị khóa hiển thị công khai nhưng <strong>toàn bộ hình ảnh, nhật ký của hai bạn vẫn được lưu an toàn</strong> trong hệ thống thêm 30 ngày. Bất kỳ lúc nào bạn nâng cấp lên gói chính thức, Story sẽ mở lại vẹn nguyên.
            </div>
          </details>
          {/* FAQ 4 */}
          <details className="group p-space-md rounded-lg bg-surface-container-lowest shadow-sm transition-all">
            <summary className="flex justify-between items-center cursor-pointer list-none gap-2 font-title-md text-title-md text-on-surface select-none">
              <span>Sau này muốn đổi Template khác có mất dữ liệu không?</span>
              <span className="material-symbols-outlined text-primary text-[22px] transition-transform duration-200 group-open:rotate-180 shrink-0">expand_more</span>
            </summary>
            <div className="pt-3 font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
              Hoàn toàn không mất dữ liệu. Bạn có thể tự do thay đổi giao diện, màu sắc, font chữ hay đổi sang các mẫu template mới ra mắt trong kho ứng dụng bất kỳ lúc nào với chỉ 1 cú chạm.
            </div>
          </details>
          {/* FAQ 5 */}
          <details className="group p-space-md rounded-lg bg-surface-container-lowest shadow-sm transition-all">
            <summary className="flex justify-between items-center cursor-pointer list-none gap-2 font-title-md text-title-md text-on-surface select-none">
              <span>Cài mật khẩu bảo mật phòng riêng thế nào?</span>
              <span className="material-symbols-outlined text-primary text-[22px] transition-transform duration-200 group-open:rotate-180 shrink-0">expand_more</span>
            </summary>
            <div className="pt-3 font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
              Trong bảng điều khiển Story, bạn vào mục <em>Cài đặt bảo mật</em> để kích hoạt: Khóa bằng mã số bí mật (ví dụ ngày sinh nhật hoặc ngày hẹn hò đầu tiên) hoặc giới hạn chỉ cho phép xem khi đăng nhập tài khoản của hai bạn.
            </div>
          </details>
        </div>
      </section>
      {/* 5. MOBILE FINAL CTA BANNER */}
      <section className="px-gutter-mobile pb-space-lg">
        <div className="p-space-lg rounded-xl bg-gradient-to-br from-primary via-primary-container to-secondary text-on-primary shadow-xl relative overflow-hidden flex flex-col items-center text-center">
          {/* Decorative heart SVG background pattern */}
          <div className="absolute -bottom-8 -right-8 w-40 h-40 opacity-15 pointer-events-none">
            <svg className="w-full h-full" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
          </div>
          {/* Visual mini couple snippet inside CTA */}
          <div className="w-14 h-14 rounded-full overflow-hidden shadow-lg mb-space-sm">
            <img className="w-full h-full object-cover" data-alt="Tender moment of a couple embracing with soft joyful expressions, pink romantic pastel backdrop, studio aesthetic, delicate editorial mood" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAsTUSU1_mZG4cK8oNKUZ9ZVUkYw4ZU8BFL2gWv9CWqnUbKyud1D-xLilx_XZHjpE1nSwLJ2USp1lWtH872VNinkblSrDW5GQnxBLgHJJY7bz70U7-qPwq_W7lKf5iBuOctDjL1XnIP8uDVW8dsQeII4nJj3A9K8va4oB6YUwwBEWMEJYnh6U8j_zQGdk70tC1B6SOAGUvIbYsV7xdmSZ2wcOFyoMp6ohfHXWyIVH5hmXu6FtbDnQ_a" />
          </div>
          <h3 className="font-headline-lg-mobile text-headline-lg-mobile font-bold tracking-tight mb-space-xs text-on-primary">
            Viết nên câu chuyện của riêng hai bạn
          </h3>
          <p className="font-body-md text-body-md opacity-90 mb-space-lg max-w-xs">
            Bắt đầu miễn phí hôm nay. Chỉ mất 3 phút để tạo nên không gian ngập tràn yêu thương.
          </p>
          <div className="w-full flex flex-col gap-2.5">
            <button className="w-full py-3.5 rounded-full bg-surface-container-lowest text-primary font-title-md text-title-md hover:bg-surface transition-transform active:scale-95 shadow-md flex items-center justify-center gap-2">
              <span>Tạo Story miễn phí</span>
              <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
            </button>
            <button className="w-full py-3 rounded-full bg-surface-container-lowest/20 hover:bg-surface-container-lowest/30 text-on-primary font-label-md text-label-md transition-all active:scale-95">
              Xem Template Mẫu
            </button>
          </div>
        </div>
      </section>
      {/* Interactive script for segmented comparison control */}
    </div></main>
</div>

    </>
  );
}
