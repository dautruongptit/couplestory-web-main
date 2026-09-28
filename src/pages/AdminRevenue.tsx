export default function AdminRevenue() {
  return (
    <>
<div className="pl-72 min-h-screen flex flex-col bg-background"><main className="w-full pt-20 px-space-lg py-space-lg flex-1"><div className="flex flex-col w-full">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-space-md mb-space-lg">
        <div className="flex items-center gap-space-xs text-on-surface-variant font-label-sm uppercase tracking-wider">
          <span className="hover:text-primary transition-colors cursor-pointer">ADMIN PORTAL</span>
          <span className="material-symbols-outlined text-[14px]">chevron_right</span>
          <span className="text-secondary font-semibold">TÀI CHÍNH &amp; DOANH THU</span>
          <span className="material-symbols-outlined text-[14px]">chevron_right</span>
          <span className="text-primary font-bold">GÓI CƯỚC &amp; ĐƠN HÀNG</span>
        </div>
        <div className="flex flex-wrap items-center gap-space-sm">
          <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-surface-container-high text-on-secondary-container">
            <span className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.7)]" />
            <span className="font-label-sm text-label-sm">Cổng TT: MoMo, VietQR, Stripe 100% Hoạt động</span>
          </div>
          <button className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-surface-container-lowest text-on-surface shadow-sm hover:bg-surface-container-high transition-colors font-label-md text-label-md" onClick={() => {}}>
            <span className="material-symbols-outlined text-[18px] text-primary">download</span>
            <span>Xuất báo cáo tài chính</span>
          </button>
          <button className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-primary-container text-on-primary font-label-md text-label-md shadow-md hover:scale-[1.02] transition-transform" onClick={() => {}}>
            <span className="material-symbols-outlined text-[18px]">add_circle</span>
            <span>Tạo đơn hàng hỗ trợ</span>
          </button>
        </div>
      </div>
      <div className="relative overflow-hidden rounded-xl bg-surface-container-low p-space-xl shadow-sm mb-space-xl">
        <div className="absolute -right-12 -top-12 w-96 h-96 rounded-full bg-primary-fixed/25 blur-3xl pointer-events-none" />
        <div className="absolute right-1/4 bottom-0 w-64 h-64 rounded-full bg-secondary-container/30 blur-2xl pointer-events-none" />
        <div className="relative z-10 flex flex-col xl:flex-row xl:items-end justify-between gap-space-lg">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-fixed text-on-primary-fixed mb-space-sm font-label-sm text-label-sm">
              <span className="material-symbols-outlined text-[16px]">monetization_on</span>
              <span>BÁO CÁO TÀI CHÍNH HỢP NHẤT COUPLESTORY</span>
            </div>
            <h1 className="font-headline-lg text-headline-lg text-on-surface tracking-tight mb-space-xs font-serif">
              Quản trị Gói cước &amp; Doanh thu Dịch vụ
            </h1>
            <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl leading-relaxed">
              Theo dõi dòng tiền đa kênh, tỷ lệ kích hoạt các gói kỷ niệm tình yêu, trạng thái đối soát tức thì từ các cổng thanh toán và cấu hình biểu phí gói trực tuyến.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-space-sm">
            <button className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-surface-container-lowest text-on-surface shadow-sm hover:shadow-md transition-all font-label-md text-label-md">
              <span className="material-symbols-outlined text-[18px] text-tertiary">tune</span>
              <span>Cấu hình Cổng thanh toán</span>
            </button>
            <button className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-surface-container-lowest text-on-surface shadow-sm hover:shadow-md transition-all font-label-md text-label-md">
              <span className="material-symbols-outlined text-[18px] text-primary">local_activity</span>
              <span>Tạo Voucher Valentine</span>
            </button>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-space-md mb-space-xl">
        <div className="rounded-lg bg-surface-container-lowest p-space-lg shadow-sm hover:shadow-md transition-all relative overflow-hidden group">
          <div className="flex items-center justify-between mb-space-sm">
            <span className="font-label-md text-label-md text-on-surface-variant">Doanh Thu Tháng Này</span>
            <div className="w-10 h-10 rounded-full bg-primary-fixed flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
              <span className="material-symbols-outlined text-[20px]">payments</span>
            </div>
          </div>
          <div className="font-headline-lg text-headline-lg text-on-surface font-bold tracking-tight mb-1">
            428.650.000<span className="text-title-md font-normal text-on-surface-variant ml-1">₫</span>
          </div>
          <div className="flex items-center gap-2 font-label-sm text-label-sm mb-space-sm">
            <span className="inline-flex items-center text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full font-bold">
              <span className="material-symbols-outlined text-[14px] mr-0.5">trending_up</span>+18.4%
            </span>
            <span className="text-outline">so với tháng trước</span>
          </div>
          <div className="pt-space-xs border-t-0 bg-surface-container-low/60 rounded-md p-2 flex justify-between items-center text-on-surface-variant font-label-sm">
            <span>Tích lũy năm 2025:</span>
            <span className="font-bold text-on-surface">2.18 Tỷ VNĐ</span>
          </div>
        </div>
        <div className="rounded-lg bg-surface-container-lowest p-space-lg shadow-sm hover:shadow-md transition-all relative overflow-hidden group">
          <div className="flex items-center justify-between mb-space-sm">
            <span className="font-label-md text-label-md text-on-surface-variant">Đơn Hàng Đã Thanh Toán</span>
            <div className="w-10 h-10 rounded-full bg-secondary-fixed flex items-center justify-center text-secondary group-hover:scale-110 transition-transform">
              <span className="material-symbols-outlined text-[20px]">verified</span>
            </div>
          </div>
          <div className="font-headline-lg text-headline-lg text-on-surface font-bold tracking-tight mb-1">
            1,420 <span className="text-title-md font-normal text-on-surface-variant">lượt</span>
          </div>
          <div className="flex items-center gap-2 font-label-sm text-label-sm mb-space-sm">
            <span className="inline-flex items-center text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full font-bold">
              <span className="material-symbols-outlined text-[14px] mr-0.5">done_all</span>98.6%
            </span>
            <span className="text-outline">thanh toán thành công</span>
          </div>
          <div className="pt-space-xs border-t-0 bg-surface-container-low/60 rounded-md p-2 flex justify-between items-center text-on-surface-variant font-label-sm">
            <span>Giá trị trung bình (AOV):</span>
            <span className="font-bold text-on-surface">301.800₫</span>
          </div>
        </div>
        <div className="rounded-lg bg-surface-container-lowest p-space-lg shadow-sm hover:shadow-md transition-all relative overflow-hidden group">
          <div className="flex items-center justify-between mb-space-xs">
            <span className="font-label-md text-label-md text-on-surface-variant">Gói Dịch Vụ Nổi Bật</span>
            <div className="w-10 h-10 rounded-full bg-tertiary-fixed flex items-center justify-center text-tertiary group-hover:scale-110 transition-transform">
              <span className="material-symbols-outlined text-[20px]">loyalty</span>
            </div>
          </div>
          <div className="font-title-lg text-title-lg text-primary font-bold tracking-tight mb-2 flex items-center gap-1.5">
            COUPLE (69k)
            <span className="px-2 py-0.5 rounded-full text-on-primary bg-primary text-[10px] uppercase font-bold">Best</span>
          </div>
          <div className="space-y-1.5 font-label-sm text-label-sm">
            <div className="flex justify-between items-center">
              <span className="text-on-surface-variant">Couple 69k</span>
              <span className="font-bold text-primary">62% doanh số</span>
            </div>
            <div className="w-full bg-surface-container h-1.5 rounded-full overflow-hidden flex">
              <div className="bg-primary h-full" style={{width: '62%'}} />
              <div className="bg-secondary h-full" style={{width: '26%'}} />
              <div className="bg-outline-variant h-full" style={{width: '12%'}} />
            </div>
            <div className="flex justify-between items-center text-outline text-[12px] pt-1">
              <span>Pro Max 26%</span>
              <span>Permanent 12%</span>
            </div>
          </div>
        </div>
        <div className="rounded-lg bg-surface-container-lowest p-space-lg shadow-sm hover:shadow-md transition-all relative overflow-hidden group">
          <div className="flex items-center justify-between mb-space-sm">
            <span className="font-label-md text-label-md text-on-surface-variant">Hoàn Tiền &amp; Tranh Chấp</span>
            <div className="w-10 h-10 rounded-full bg-error-container/40 flex items-center justify-center text-error group-hover:scale-110 transition-transform">
              <span className="material-symbols-outlined text-[20px]">security_update_warning</span>
            </div>
          </div>
          <div className="font-headline-lg text-headline-lg text-on-surface font-bold tracking-tight mb-1">
            3 <span className="text-title-md font-normal text-on-surface-variant">đơn</span>
          </div>
          <div className="flex items-center gap-2 font-label-sm text-label-sm mb-space-sm">
            <span className="inline-flex items-center text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full font-bold">
              0.21%
            </span>
            <span className="text-outline">rất thấp • an toàn</span>
          </div>
          <div className="pt-space-xs border-t-0 bg-surface-container-low/60 rounded-md p-2 flex justify-between items-center text-on-surface-variant font-label-sm">
            <span>Tổng giá trị hoàn:</span>
            <span className="font-semibold text-on-surface">897.000₫</span>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-lg mb-space-xl">
        <div className="lg:col-span-8 rounded-xl bg-surface-container-lowest p-space-lg shadow-sm flex flex-col justify-between">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-space-sm mb-space-lg">
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-title-lg text-title-lg font-bold text-on-surface">Biểu Đồ Dòng Tiền 30 Ngày Qua</h2>
                <span className="px-2.5 py-0.5 rounded-full bg-primary-fixed text-primary font-label-sm text-label-sm font-bold">Realtime</span>
              </div>
              <p className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">Doanh thu tăng vọt theo từng giai đoạn kỷ niệm và cuối tuần</p>
            </div>
            <div className="flex items-center gap-2">
              <button className="px-3 py-1.5 rounded-full bg-primary-container text-on-primary font-label-sm text-label-sm font-bold shadow-sm">Theo Ngày</button>
              <button className="px-3 py-1.5 rounded-full bg-surface-container-high text-on-secondary-container font-label-sm text-label-sm hover:bg-surface-variant transition-colors">Theo Tuần</button>
              <button className="px-3 py-1.5 rounded-full bg-surface-container-high text-on-secondary-container font-label-sm text-label-sm hover:bg-surface-variant transition-colors">Tháng Này</button>
            </div>
          </div>
          <div className="w-full relative h-64 flex flex-col justify-end">
            <svg className="w-full h-full overflow-visible" fill="none" preserveAspectRatio="none" viewBox="0 0 700 220">
              <defs>
                <linearGradient id="revenueGlow" x1={0} x2={0} y1={0} y2={1}>
                  <stop offset="0%" stopColor="#ff4d8d" stopOpacity="0.38" />
                  <stop offset="70%" stopColor="#ff4d8d" stopOpacity="0.05" />
                  <stop offset="100%" stopColor="#ffffff" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="lineStroke" x1={0} x2={1} y1={0} y2={0}>
                  <stop offset="0%" stopColor="#c27e97" />
                  <stop offset="50%" stopColor="#b90a5a" />
                  <stop offset="100%" stopColor="#ff4d8d" />
                </linearGradient>
              </defs>
              <line stroke="#fec8e4" strokeDasharray="4 4" strokeOpacity="0.35" strokeWidth={1} x1={0} x2={700} y1={20} y2={20} />
              <line stroke="#fec8e4" strokeDasharray="4 4" strokeOpacity="0.35" strokeWidth={1} x1={0} x2={700} y1={75} y2={75} />
              <line stroke="#fec8e4" strokeDasharray="4 4" strokeOpacity="0.35" strokeWidth={1} x1={0} x2={700} y1={135} y2={135} />
              <line stroke="#e1bec5" strokeOpacity="0.4" strokeWidth={1} x1={0} x2={700} y1={195} y2={195} />
              <path d="M0,175 C30,170 60,165 90,140 C120,115 150,150 180,135 C210,120 240,80 270,75 C300,70 330,120 360,110 C390,100 420,40 450,30 C480,20 510,75 540,65 C570,55 600,30 630,22 C660,15 680,25 700,18 L700,200 L0,200 Z" fill="url(#revenueGlow)" />
              <path d="M0,175 C30,170 60,165 90,140 C120,115 150,150 180,135 C210,120 240,80 270,75 C300,70 330,120 360,110 C390,100 420,40 450,30 C480,20 510,75 540,65 C570,55 600,30 630,22 C660,15 680,25 700,18" fill="none" stroke="url(#lineStroke)" strokeLinecap="round" strokeWidth="3.5" />
              <circle cx={450} cy={30} fill="#b90a5a" r={6} stroke="#ffffff" strokeWidth="2.5" />
              <circle cx={630} cy={22} fill="#ff4d8d" r={6} stroke="#ffffff" strokeWidth="2.5" />
            </svg>
            <div className="absolute left-[62%] top-3 -translate-x-1/2 bg-inverse-surface text-inverse-on-surface px-3 py-1.5 rounded-lg shadow-lg flex items-center gap-2 pointer-events-none">
              <span className="w-2 h-2 rounded-full bg-primary-container animate-ping" />
              <span className="font-label-sm text-label-sm">Đỉnh Valentine: <strong>32.850.000₫</strong> (108 đơn)</span>
            </div>
            <div className="flex justify-between items-center text-outline font-label-sm text-label-sm pt-3">
              <span>01 Tháng 2</span>
              <span>07 Tháng 2</span>
              <span className="text-primary font-bold">14 Tháng 2 (Valentine)</span>
              <span>21 Tháng 2</span>
              <span>28 Tháng 2</span>
              <span>Hôm nay</span>
            </div>
          </div>
        </div>
        <div className="lg:col-span-4 rounded-xl bg-surface-container-lowest p-space-lg shadow-sm flex flex-col justify-between">
          <div>
            <h2 className="font-title-lg text-title-lg font-bold text-on-surface mb-1">Phương Thức Thanh Toán</h2>
            <p className="font-body-sm text-body-sm text-on-surface-variant mb-space-md">Tỷ lệ thanh toán hoàn tất theo kênh đối soát</p>
            <div className="flex items-center justify-center my-space-sm relative">
              <svg className="w-36 h-36 -rotate-90 transform" viewBox="0 0 100 100">
                <circle cx={50} cy={50} fill="none" r={38} stroke="#ffe8ef" strokeWidth={12} />
                <circle cx={50} cy={50} fill="none" r={38} stroke="#ff4d8d" strokeDasharray="100.2 238.7" strokeDashoffset={0} strokeWidth={12} />
                <circle cx={50} cy={50} fill="none" r={38} stroke="#b90a5a" strokeDasharray="90.7 238.7" strokeDashoffset="-100.2" strokeWidth={12} />
                <circle cx={50} cy={50} fill="none" r={38} stroke="#884c63" strokeDasharray="35.8 238.7" strokeDashoffset="-190.9" strokeWidth={12} />
                <circle cx={50} cy={50} fill="none" r={38} stroke="#ecb7d3" strokeDasharray="12 238.7" strokeDashoffset="-226.7" strokeWidth={12} />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <span className="font-title-lg text-title-lg font-bold text-on-surface">1,420</span>
                <span className="font-label-sm text-label-sm text-on-surface-variant">Giao dịch</span>
              </div>
            </div>
            <div className="space-y-2 mt-space-sm">
              <div className="flex items-center justify-between p-2 rounded-lg bg-surface-container-low">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-primary-container" />
                  <span className="font-label-md text-label-md text-on-surface">Ví MoMo QR</span>
                </div>
                <span className="font-title-md text-title-md font-bold text-on-surface">42% <span className="text-label-sm font-normal text-outline">(180.0M)</span></span>
              </div>
              <div className="flex items-center justify-between p-2 rounded-lg bg-surface-container-low">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-primary" />
                  <span className="font-label-md text-label-md text-on-surface">Chuyển khoản VietQR</span>
                </div>
                <span className="font-title-md text-title-md font-bold text-on-surface">38% <span className="text-label-sm font-normal text-outline">(162.8M)</span></span>
              </div>
              <div className="flex items-center justify-between p-2 rounded-lg bg-surface-container-low">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-tertiary" />
                  <span className="font-label-md text-label-md text-on-surface">Thẻ Quốc tế (Stripe)</span>
                </div>
                <span className="font-title-md text-title-md font-bold text-on-surface">15% <span className="text-label-sm font-normal text-outline">(64.2M)</span></span>
              </div>
              <div className="flex items-center justify-between p-2 rounded-lg bg-surface-container-low">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-secondary-fixed-dim" />
                  <span className="font-label-md text-label-md text-on-surface">Apple Pay &amp; Khác</span>
                </div>
                <span className="font-title-md text-title-md font-bold text-on-surface">5% <span className="text-label-sm font-normal text-outline">(21.6M)</span></span>
              </div>
            </div>
          </div>
          <div className="mt-space-md p-space-sm rounded-lg bg-surface-container flex items-center justify-between">
            <span className="font-label-sm text-label-sm text-on-secondary-container">Tốc độ ghi nhận giao dịch tức thời</span>
            <span className="font-label-sm text-label-sm font-bold text-primary">~1.2 Giây</span>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-space-lg mb-space-xl">
        <div className="xl:col-span-8 flex flex-col">
          <div className="rounded-t-xl bg-surface-container-lowest p-space-md shadow-sm">
            <div className="flex flex-col md:flex-row items-center gap-space-sm justify-between">
              <div className="relative w-full md:w-80">
                <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-outline text-[18px]">search</span>
                <input className="w-full h-10 pl-10 pr-4 rounded-full bg-surface-container-low text-on-surface placeholder:text-outline font-body-sm text-body-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all" placeholder="Tìm #Mã đơn, email, tên cặp đôi..." type="text" />
              </div>
              <div className="flex flex-wrap items-center gap-2 w-full md:w-auto justify-end">
                <select className="h-10 px-3.5 rounded-full bg-surface-container-low text-on-surface font-label-sm text-label-sm focus:outline-none cursor-pointer">
                  <option>Tất cả gói cước</option>
                  <option>Couple (69k)</option>
                  <option>Pro Max (119k)</option>
                  <option>Pro (49k)</option>
                  <option>Trial (0đ)</option>
                </select>
                <select className="h-10 px-3.5 rounded-full bg-surface-container-low text-on-surface font-label-sm text-label-sm focus:outline-none cursor-pointer">
                  <option>Tất cả trạng thái</option>
                  <option>Thành công (Paid)</option>
                  <option>Đang chờ (Pending)</option>
                  <option>Thất bại (Failed)</option>
                  <option>Đã hoàn tiền (Refunded)</option>
                </select>
                <select className="h-10 px-3.5 rounded-full bg-surface-container-low text-on-surface font-label-sm text-label-sm focus:outline-none cursor-pointer">
                  <option>Tất cả cổng thanh toán</option>
                  <option>VietQR Pro</option>
                  <option>MoMo QR</option>
                  <option>Stripe Card</option>
                </select>
                <button className="h-10 w-10 flex items-center justify-center rounded-full bg-surface-container-high text-on-surface-variant hover:bg-surface-variant transition-colors" title="Lọc nâng cao">
                  <span className="material-symbols-outlined text-[18px]">filter_list</span>
                </button>
              </div>
            </div>
          </div>
          <div className="bg-surface-container-lowest overflow-x-auto shadow-sm">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-surface-container-low text-on-surface-variant font-label-sm text-label-sm uppercase tracking-wider">
                  <th className="py-3 px-4 w-10 text-center">
                    <input className="rounded accent-primary cursor-pointer" type="checkbox" />
                  </th>
                  <th className="py-3 px-4">Mã Đơn &amp; Thời Gian</th>
                  <th className="py-3 px-4">Cặp Đôi &amp; Story</th>
                  <th className="py-3 px-4">Gói &amp; Doanh Thu</th>
                  <th className="py-3 px-4">Cổng Thanh Toán</th>
                  <th className="py-3 px-4">Trạng Thái</th>
                  <th className="py-3 px-4 text-right">Thao Tác</th>
                </tr>
              </thead>
              <tbody className="font-body-sm text-body-sm text-on-surface">
                <tr className="hover:bg-surface-container-low/50 transition-colors group">
                  <td className="py-3.5 px-4 text-center">
                    <input className="rounded accent-primary cursor-pointer" type="checkbox" />
                  </td>
                  <td className="py-3.5 px-4">
                    <div className="font-title-md text-title-md font-bold text-on-surface flex items-center gap-1.5">
                      #CS-INV-9821
                      <span className="material-symbols-outlined text-[14px] text-outline cursor-pointer hover:text-primary" title="Sao chép">content_copy</span>
                    </div>
                    <div className="text-outline font-label-sm text-label-sm">18:42:10 • Hôm nay</div>
                  </td>
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-2.5">
                      <div className="flex -space-x-2 overflow-hidden">
                        <img className="inline-block h-7 w-7 rounded-full object-cover shadow-sm" data-alt="Chân dung bạn trai Việt Nam trẻ tuổi nụ cười ấm áp phong cách ảnh Polaroid studio ánh sáng dịu mắt" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDWo_O6AS1hFlK9b5y2-JzZtY2fiHOC4snQayfxjMDbOl6LoZaKRaOGUwQPEQXh-cXXwll9DmrYpYmi0t1QsTd6zDqrLIFn6kBxO0k-U-B7dTBoTsf--GTnQAJMkdjK5G5MgnEhuJbER4AL8yrA49QNG906aLKAbnnVbNMxK_INgl9tGFNVFDKOHyn5_4Ovz8Asm7NedTP8BPjZ0wtSgFTZgHVvXLX6S7R-oTqUzq78ptqA_esZ1pIN" />
                        <img className="inline-block h-7 w-7 rounded-full object-cover shadow-sm" data-alt="Chân dung cô bạn gái dịu dàng trang điểm nhẹ nhàng phong cách ảnh kỷ niệm thanh xuân đôi lứa" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDGVaYRlYTKaKYQg6UohB7o1QkTypXZbJfleZQLTg8XIy0Dbhs4vmcW8uVOlojjqlzecGKp3kZnNSHNn-nQuCALRQfvFvglbyorNW3UO2y3HJWO2EKTUBegmJg5Ainf1cqiByrjYt1nom_4-bRObR_1vv829nnrwzplq7neiQPQriY2udogsf35ky47BgexRpUwHXRx4UeSQpvjBqJSEFJqyUVzdO4CDf730Kz3R6UnksI56xwPaHYV" />
                      </div>
                      <div className="flex flex-col min-w-0">
                        <span className="font-title-md text-title-md font-semibold truncate max-w-[160px]">Bảo Long &amp; An Nhiên</span>
                        <a className="text-primary font-label-sm text-label-sm hover:underline truncate max-w-[160px]" href="#">longannhien.love</a>
                      </div>
                    </div>
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full font-label-sm text-label-sm font-bold bg-primary-fixed text-on-primary-fixed-variant">COUPLE</span>
                    <div className="font-bold text-on-surface mt-0.5">69.000₫</div>
                  </td>
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-emerald-500" />
                      <span className="font-semibold text-on-surface">VietQR Pro</span>
                    </div>
                    <div className="text-outline text-[12px]">Ref: VCB_882910394</div>
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full font-label-sm text-label-sm font-semibold bg-emerald-100 text-emerald-800">
                      <span className="material-symbols-outlined text-[14px]">check_circle</span>
                      Thành công
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <button className="p-1.5 rounded-full text-on-surface-variant hover:bg-surface-container-high hover:text-primary transition-colors" title="Xem chi tiết hóa đơn">
                        <span className="material-symbols-outlined text-[18px]">receipt</span>
                      </button>
                      <button className="p-1.5 rounded-full text-on-surface-variant hover:bg-surface-container-high hover:text-secondary transition-colors" title="Gửi lại email kích hoạt">
                        <span className="material-symbols-outlined text-[18px]">forward_to_inbox</span>
                      </button>
                      <button className="p-1.5 rounded-full text-on-surface-variant hover:bg-error-container hover:text-error transition-colors" title="Hoàn tiền / Điều chỉnh">
                        <span className="material-symbols-outlined text-[18px]">undo</span>
                      </button>
                    </div>
                  </td>
                </tr>
                <tr className="hover:bg-surface-container-low/50 transition-colors group">
                  <td className="py-3.5 px-4 text-center">
                    <input className="rounded accent-primary cursor-pointer" type="checkbox" />
                  </td>
                  <td className="py-3.5 px-4">
                    <div className="font-title-md text-title-md font-bold text-on-surface flex items-center gap-1.5">
                      #CS-INV-9820
                      <span className="material-symbols-outlined text-[14px] text-outline cursor-pointer hover:text-primary" title="Sao chép">content_copy</span>
                    </div>
                    <div className="text-outline font-label-sm text-label-sm">17:15:02 • Hôm nay</div>
                  </td>
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-2.5">
                      <div className="flex -space-x-2 overflow-hidden">
                        <img className="inline-block h-7 w-7 rounded-full object-cover shadow-sm" data-alt="Cặp đôi đang cười tươi hạnh phúc bên bãi biển hoàng hôn tông màu ấm áp rose gold" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAR4Ms269-Rkio1NVp5lZYXteF0IOgThJcVVpsEbhbhTvNp6knhckaG58u1AyEs_A99jtWID3kMNdeAIfYIikDn3K9tFcmV6guifpatpoOHKgvMRnGTwnQRZOWdHZZeNIWnA6ka11s1S2niEgSAHALJWkEcyx0xFvQorKru9zQ1qeiBVBwVyg1enbgxKKQ4t3Oe0Imu9t8SfSPbT0eH-e9iCN54Fyf4Js2EW2I9HO_CXLr4Nl4S0uKA" />
                        <img className="inline-block h-7 w-7 rounded-full object-cover shadow-sm" data-alt="Chi tiết góc chụp phong cách ảnh cưới film màu pastel dịu nhẹ" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCN6KQ_kBICn40OR1VlXmA-IJOjNOnGQ5UqfQ9CGOecUOj_cd8MPgAx_yb4_M5fWCmo6vbGSMqmKMec8IgE4PoAYVdPP0AaJOZgX9wfap4Ew2Oyw37Z3KW0aZDs8XBXe9w2p5UM63LXnKFDVCeZQ6xD_gmfhcjz9wI8EXpsmny-VJlbe3_FzpC3AdiLsFD8BkI4npeoqACJSyob0AI0hbBSF46RIoo3Q6UXUOqqfZgw9ctUsq0iMJFc" />
                      </div>
                      <div className="flex flex-col min-w-0">
                        <span className="font-title-md text-title-md font-semibold truncate max-w-[160px]">Tuấn Kiệt &amp; Thảo My</span>
                        <a className="text-primary font-label-sm text-label-sm hover:underline truncate max-w-[160px]" href="#">kietmy.story.site</a>
                      </div>
                    </div>
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full font-label-sm text-label-sm font-bold bg-secondary-fixed text-on-secondary-fixed-variant">PRO MAX</span>
                    <div className="font-bold text-on-surface mt-0.5">119.000₫</div>
                  </td>
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-pink-500" />
                      <span className="font-semibold text-on-surface">MoMo Wallet</span>
                    </div>
                    <div className="text-outline text-[12px]">Ref: MOMO_99182312</div>
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full font-label-sm text-label-sm font-semibold bg-emerald-100 text-emerald-800">
                      <span className="material-symbols-outlined text-[14px]">check_circle</span>
                      Thành công
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <button className="p-1.5 rounded-full text-on-surface-variant hover:bg-surface-container-high hover:text-primary transition-colors" title="Xem chi tiết hóa đơn">
                        <span className="material-symbols-outlined text-[18px]">receipt</span>
                      </button>
                      <button className="p-1.5 rounded-full text-on-surface-variant hover:bg-surface-container-high hover:text-secondary transition-colors" title="Gửi lại email kích hoạt">
                        <span className="material-symbols-outlined text-[18px]">forward_to_inbox</span>
                      </button>
                      <button className="p-1.5 rounded-full text-on-surface-variant hover:bg-error-container hover:text-error transition-colors" title="Hoàn tiền / Điều chỉnh">
                        <span className="material-symbols-outlined text-[18px]">undo</span>
                      </button>
                    </div>
                  </td>
                </tr>
                <tr className="hover:bg-surface-container-low/50 transition-colors group">
                  <td className="py-3.5 px-4 text-center">
                    <input className="rounded accent-primary cursor-pointer" type="checkbox" />
                  </td>
                  <td className="py-3.5 px-4">
                    <div className="font-title-md text-title-md font-bold text-on-surface flex items-center gap-1.5">
                      #CS-INV-9819
                      <span className="material-symbols-outlined text-[14px] text-outline cursor-pointer hover:text-primary" title="Sao chép">content_copy</span>
                    </div>
                    <div className="text-outline font-label-sm text-label-sm">16:50:41 • Hôm nay</div>
                  </td>
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded-full bg-surface-container-high flex items-center justify-center text-primary font-bold text-xs">
                        HG
                      </div>
                      <div className="flex flex-col min-w-0">
                        <span className="font-title-md text-title-md font-semibold truncate max-w-[160px]">Hoàng Gia &amp; Uyên Linh</span>
                        <a className="text-outline font-label-sm text-label-sm hover:underline truncate max-w-[160px]" href="#">gia-linh.online</a>
                      </div>
                    </div>
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full font-label-sm text-label-sm font-bold bg-primary-fixed text-on-primary-fixed-variant">COUPLE</span>
                    <div className="font-bold text-on-surface mt-0.5">69.000₫</div>
                  </td>
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
                      <span className="font-semibold text-on-surface">VietQR Chờ quét</span>
                    </div>
                    <div className="text-outline text-[12px]">Hết hạn sau 08:12</div>
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full font-label-sm text-label-sm font-semibold bg-amber-100 text-amber-900">
                      <span className="material-symbols-outlined text-[14px]">hourglass_top</span>
                      Đang xử lý
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <button className="p-1.5 rounded-full text-on-surface-variant hover:bg-surface-container-high hover:text-primary transition-colors" title="Đối soát nhanh">
                        <span className="material-symbols-outlined text-[18px]">sync</span>
                      </button>
                      <button className="p-1.5 rounded-full text-on-surface-variant hover:bg-surface-container-high hover:text-secondary transition-colors" title="Hỗ trợ thanh toán">
                        <span className="material-symbols-outlined text-[18px]">contact_support</span>
                      </button>
                    </div>
                  </td>
                </tr>
                <tr className="hover:bg-surface-container-low/50 transition-colors group">
                  <td className="py-3.5 px-4 text-center">
                    <input className="rounded accent-primary cursor-pointer" type="checkbox" />
                  </td>
                  <td className="py-3.5 px-4">
                    <div className="font-title-md text-title-md font-bold text-on-surface flex items-center gap-1.5">
                      #CS-INV-9818
                      <span className="material-symbols-outlined text-[14px] text-outline cursor-pointer hover:text-primary" title="Sao chép">content_copy</span>
                    </div>
                    <div className="text-outline font-label-sm text-label-sm">14:02:19 • Hôm nay</div>
                  </td>
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-2.5">
                      <div className="flex -space-x-2 overflow-hidden">
                        <img className="inline-block h-7 w-7 rounded-full object-cover shadow-sm" data-alt="Ảnh chân dung cặp đôi trẻ trung tươi cười cùng đeo nhẫn cặp xinh xắn phong cách studio tối giản" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAALOef_i_7y3ZAEHiSGRSUZdDzgPK5jqH5_wXmW3xTG2rr-aERje14M8ENUmEFUhMXQHVI4c4l3jXydh86d65U_trFBV5yA7kexHGGYRyQCMVn907FcTMdbdeNYxHimrZagnBLuwhl2l_c-XdUgocuOvDSdl-mHXwOLIpAluFohcJAWKuW1jSctSgyUqmO6iZ19n9oekPTB8s0Y2zJfPI0fGD_7-F5Mc8wp-1lOCYhx7dOLzaZRSWH" />
                      </div>
                      <div className="flex flex-col min-w-0">
                        <span className="font-title-md text-title-md font-semibold truncate max-w-[160px]">Khắc Duy &amp; Ánh Tuyết</span>
                        <a className="text-primary font-label-sm text-label-sm hover:underline truncate max-w-[160px]" href="#">duytuyet.story.site</a>
                      </div>
                    </div>
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full font-label-sm text-label-sm font-bold bg-surface-variant text-on-surface-variant">PRO</span>
                    <div className="font-bold text-on-surface mt-0.5">49.000₫</div>
                  </td>
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-blue-600" />
                      <span className="font-semibold text-on-surface">Stripe (Visa •• 4912)</span>
                    </div>
                    <div className="text-outline text-[12px]">Ref: ch_3NqkL4IE...</div>
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full font-label-sm text-label-sm font-semibold bg-emerald-100 text-emerald-800">
                      <span className="material-symbols-outlined text-[14px]">check_circle</span>
                      Thành công
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <button className="p-1.5 rounded-full text-on-surface-variant hover:bg-surface-container-high hover:text-primary transition-colors" title="Xem chi tiết hóa đơn">
                        <span className="material-symbols-outlined text-[18px]">receipt</span>
                      </button>
                      <button className="p-1.5 rounded-full text-on-surface-variant hover:bg-surface-container-high hover:text-secondary transition-colors" title="Xuất VAT điện tử">
                        <span className="material-symbols-outlined text-[18px]">description</span>
                      </button>
                    </div>
                  </td>
                </tr>
                <tr className="hover:bg-surface-container-low/50 transition-colors group">
                  <td className="py-3.5 px-4 text-center">
                    <input className="rounded accent-primary cursor-pointer" type="checkbox" />
                  </td>
                  <td className="py-3.5 px-4">
                    <div className="font-title-md text-title-md font-bold text-on-surface flex items-center gap-1.5">
                      #CS-INV-9817
                      <span className="material-symbols-outlined text-[14px] text-outline cursor-pointer hover:text-primary" title="Sao chép">content_copy</span>
                    </div>
                    <div className="text-outline font-label-sm text-label-sm">11:28:44 • Hôm nay</div>
                  </td>
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded-full bg-error-container/60 text-error flex items-center justify-center font-bold text-xs">
                        TN
                      </div>
                      <div className="flex flex-col min-w-0">
                        <span className="font-title-md text-title-md font-semibold truncate max-w-[160px]">Thành Nam &amp; Thu Hương</span>
                        <span className="text-outline font-label-sm text-label-sm">namhuong.story</span>
                      </div>
                    </div>
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full font-label-sm text-label-sm font-bold bg-secondary-fixed text-on-secondary-fixed-variant">PRO MAX</span>
                    <div className="font-bold text-on-surface mt-0.5">119.000₫</div>
                  </td>
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-rose-600" />
                      <span className="font-semibold text-on-surface">Stripe 3D-Secure</span>
                    </div>
                    <div className="text-error font-label-sm text-[12px]">Lỗi OTP xác thực ngân hàng</div>
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full font-label-sm text-label-sm font-semibold bg-rose-100 text-rose-800">
                      <span className="material-symbols-outlined text-[14px]">cancel</span>
                      Thất bại
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <button className="p-1.5 rounded-full text-on-surface-variant hover:bg-surface-container-high hover:text-primary transition-colors" title="Gửi link thanh toán lại">
                        <span className="material-symbols-outlined text-[18px]">send</span>
                      </button>
                      <button className="p-1.5 rounded-full text-on-surface-variant hover:bg-surface-container-high transition-colors" title="Lịch sử giao dịch">
                        <span className="material-symbols-outlined text-[18px]">history</span>
                      </button>
                    </div>
                  </td>
                </tr>
                <tr className="hover:bg-surface-container-low/50 transition-colors group">
                  <td className="py-3.5 px-4 text-center">
                    <input className="rounded accent-primary cursor-pointer" type="checkbox" />
                  </td>
                  <td className="py-3.5 px-4">
                    <div className="font-title-md text-title-md font-bold text-on-surface flex items-center gap-1.5">
                      #CS-INV-9816
                      <span className="material-symbols-outlined text-[14px] text-outline cursor-pointer hover:text-primary" title="Sao chép">content_copy</span>
                    </div>
                    <div className="text-outline font-label-sm text-label-sm">09:15:30 • Hôm qua</div>
                  </td>
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-2.5">
                      <div className="flex -space-x-2 overflow-hidden">
                        <img className="inline-block h-7 w-7 rounded-full object-cover shadow-sm" data-alt="Ảnh chụp tay hai bạn trẻ đeo nhẫn đính hôn tông màu lãng mạn điện ảnh ấm áp" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBZ1fkjsTnqRazrL5QBr-CIdLWJBPmAcm3X30IGzm5SpVCUV46PywSgL_AmCDTHZSqPL-fF5GhGCWyLk3q2Pl6c_Q_vBDSuvFhs7duP_5wDfPDepJCrqVRwgZ93184eq7CTyyQZQ_Vd39szhe7DXwA5Ya8dLWT1lAYEvJafJalwlg4nUJ9gcY-aGjNF6lVuDiHoWCJXRnnJ_s4DR_shf4JcEJZLy7hwanBWDUsZhTgSt1tXHnP5Uilj" />
                      </div>
                      <div className="flex flex-col min-w-0">
                        <span className="font-title-md text-title-md font-semibold truncate max-w-[160px]">Việt Anh &amp; Mai Ly</span>
                        <a className="text-outline font-label-sm text-label-sm truncate max-w-[160px]" href="#">vietanh-maily.com</a>
                      </div>
                    </div>
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full font-label-sm text-label-sm font-bold bg-primary-fixed text-on-primary-fixed-variant">COUPLE</span>
                    <div className="font-bold text-on-surface mt-0.5 line-through text-outline">69.000₫</div>
                  </td>
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-pink-500" />
                      <span className="font-semibold text-on-surface">MoMo Hoàn tiền</span>
                    </div>
                    <div className="text-outline text-[12px]">Lý do: Khách trùng đơn</div>
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full font-label-sm text-label-sm font-semibold bg-surface-container-highest text-on-surface-variant">
                      <span className="material-symbols-outlined text-[14px]">replay</span>
                      Đã hoàn tiền
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <button className="p-1.5 rounded-full text-on-surface-variant hover:bg-surface-container-high transition-colors" title="Xem chứng từ hoàn">
                        <span className="material-symbols-outlined text-[18px]">receipt_long</span>
                      </button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="rounded-b-xl bg-surface-container-lowest p-space-md shadow-sm flex flex-col sm:flex-row items-center justify-between gap-space-sm">
            <span className="font-label-sm text-label-sm text-on-surface-variant">
              Hiển thị <strong className="text-on-surface">1 - 6</strong> trên tổng số <strong className="text-on-surface">1,420</strong> đơn hàng đối soát
            </span>
            <div className="flex items-center gap-1.5">
              <button className="px-3 py-1.5 rounded-lg bg-surface-container text-on-surface-variant font-label-sm text-label-sm hover:bg-surface-container-high transition-colors disabled:opacity-50" disabled>
                Trước
              </button>
              <button className="w-8 h-8 rounded-lg bg-primary-container text-on-primary font-bold font-label-sm text-label-sm">1</button>
              <button className="w-8 h-8 rounded-lg bg-surface-container-low text-on-surface font-label-sm text-label-sm hover:bg-surface-container-high transition-colors">2</button>
              <button className="w-8 h-8 rounded-lg bg-surface-container-low text-on-surface font-label-sm text-label-sm hover:bg-surface-container-high transition-colors">3</button>
              <span className="px-1 text-outline">...</span>
              <button className="w-8 h-8 rounded-lg bg-surface-container-low text-on-surface font-label-sm text-label-sm hover:bg-surface-container-high transition-colors">71</button>
              <button className="px-3 py-1.5 rounded-lg bg-surface-container-low text-on-surface font-label-sm text-label-sm hover:bg-surface-container-high transition-colors">
                Sau
              </button>
            </div>
          </div>
        </div>
        <div className="xl:col-span-4 flex flex-col gap-space-lg">
          <div className="rounded-xl bg-surface-container-lowest p-space-lg shadow-sm">
            <div className="flex items-center justify-between mb-space-sm">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-primary text-[22px]">price_change</span>
                <h3 className="font-title-lg text-title-lg font-bold text-on-surface">Cấu Hình Gói &amp; Bảng Giá</h3>
              </div>
              <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-label-sm text-[11px] font-bold">Live</span>
            </div>
            <p className="font-body-sm text-body-sm text-on-surface-variant mb-space-md">Quản lý niêm yết giá bán công khai trên ứng dụng người dùng CoupleStory.</p>
            <div className="space-y-3">
              <div className="p-space-sm rounded-lg bg-surface-container-low flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-title-md text-title-md font-bold text-on-surface">Couple Standard</span>
                    <span className="px-1.5 py-0.2 rounded bg-primary-fixed text-primary text-[10px] font-bold">Hot</span>
                  </div>
                  <div className="font-label-sm text-label-sm text-outline">Lưu trữ không giới hạn • Nhạc nền</div>
                </div>
                <div className="text-right">
                  <span className="font-title-md text-title-md font-bold text-primary">69.000₫</span>
                  <div className="text-[11px] text-emerald-600 font-medium">Bật KM (-20%)</div>
                </div>
              </div>
              <div className="p-space-sm rounded-lg bg-surface-container-low flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-title-md text-title-md font-bold text-on-surface">Pro Max</span>
                    <span className="px-1.5 py-0.2 rounded bg-secondary-fixed text-secondary text-[10px] font-bold">VIP</span>
                  </div>
                  <div className="font-label-sm text-label-sm text-outline">Tên miền riêng .love/.site trọn đời</div>
                </div>
                <div className="text-right">
                  <span className="font-title-md text-title-md font-bold text-on-surface">119.000₫</span>
                  <div className="text-[11px] text-outline">Giá gốc</div>
                </div>
              </div>
              <div className="p-space-sm rounded-lg bg-surface-container-low flex items-center justify-between">
                <div>
                  <span className="font-title-md text-title-md font-bold text-on-surface">Pro</span>
                  <div className="font-label-sm text-label-sm text-outline">Lưu giữ trọn đời • Khóa mã PIN</div>
                </div>
                <div className="text-right">
                  <span className="font-title-md text-title-md font-bold text-on-surface">49.000₫</span>
                  <div className="text-[11px] text-outline">Giá gốc</div>
                </div>
              </div>
            </div>
            <button className="w-full mt-space-md py-2.5 rounded-full bg-surface-container-high text-primary font-label-md text-label-md font-bold hover:bg-primary hover:text-on-primary transition-all flex items-center justify-center gap-1.5" onClick={() => {}}>
              <span className="material-symbols-outlined text-[18px]">edit_note</span>
              <span>Chỉnh sửa bảng giá &amp; Voucher</span>
            </button>
          </div>
          <div className="rounded-xl bg-surface-container-lowest p-space-lg shadow-sm">
            <div className="flex items-center justify-between mb-space-sm">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-secondary text-[22px]">hub</span>
                <h3 className="font-title-lg text-title-lg font-bold text-on-surface">Tình Trạng Cổng Kết Nối</h3>
              </div>
              <span className="material-symbols-outlined text-outline text-[18px] hover:rotate-180 transition-transform cursor-pointer" title="Làm mới">refresh</span>
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-2.5 rounded-lg bg-surface-container-low">
                <div className="flex items-center gap-2.5">
                  <div className="w-3 h-3 rounded-full bg-emerald-500 ring-4 ring-emerald-100" />
                  <div>
                    <div className="font-title-md text-title-md font-semibold text-on-surface">MoMo Business API</div>
                    <div className="font-label-sm text-label-sm text-outline">Latency: 42ms • Uptime 100%</div>
                  </div>
                </div>
                <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-label-sm text-[11px] font-bold">Mượt mà</span>
              </div>
              <div className="flex items-center justify-between p-2.5 rounded-lg bg-surface-container-low">
                <div className="flex items-center gap-2.5">
                  <div className="w-3 h-3 rounded-full bg-emerald-500 ring-4 ring-emerald-100" />
                  <div>
                    <div className="font-title-md text-title-md font-semibold text-on-surface">VietQR (SeABank / VCB)</div>
                    <div className="font-label-sm text-label-sm text-outline">Webhook tức thời • Tự động mở story</div>
                  </div>
                </div>
                <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-label-sm text-[11px] font-bold">Hoạt động</span>
              </div>
              <div className="flex items-center justify-between p-2.5 rounded-lg bg-surface-container-low">
                <div className="flex items-center gap-2.5">
                  <div className="w-3 h-3 rounded-full bg-emerald-500 ring-4 ring-emerald-100" />
                  <div>
                    <div className="font-title-md text-title-md font-semibold text-on-surface">Stripe International</div>
                    <div className="font-label-sm text-label-sm text-outline">Visa/Mastercard/Apple Pay</div>
                  </div>
                </div>
                <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-label-sm text-[11px] font-bold">Bình thường</span>
              </div>
            </div>
          </div>
          <div className="rounded-xl bg-surface-container-low p-space-lg shadow-sm border border-outline-variant/30">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-primary-fixed text-primary flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-[20px]">account_balance_wallet</span>
              </div>
              <div>
                <span className="font-title-md text-title-md font-bold text-on-surface">Phiên Đối Soát Định Kỳ Kế Tiếp</span>
                <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">
                  Số dư sẵn sàng rút về tài khoản pháp nhân ngân hàng Vietcombank: <strong className="text-primary font-bold">142.500.000₫</strong>. Phiên giải ngân tự động diễn ra vào 08:00 sáng Thứ Hai tới.
                </p>
                <div className="mt-3 flex items-center gap-2">
                  <button className="px-3.5 py-1.5 rounded-full bg-surface-container-lowest text-primary font-label-sm text-label-sm font-bold shadow-sm hover:shadow transition-all" onClick={() => {}}>
                    Yêu cầu rút sớm
                  </button>
                  <button className="px-3 py-1.5 rounded-full text-secondary font-label-sm text-label-sm hover:underline">
                    Xem lịch sử đối soát
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div></main></div>

    </>
  );
}
