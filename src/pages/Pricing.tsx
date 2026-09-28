import { usePlans } from '../hooks/usePlans';
import { formatPrice } from '../utils/formatPrice';

export default function Pricing() {
  const { plans, loading } = usePlans();
  const free = plans.find(p => p.code === 'FREE');
  const pro = plans.find(p => p.code === 'PRO');
  const couple = plans.find(p => p.code === 'COUPLE');
  const proMax = plans.find(p => p.code === 'PRO_MAX');

  return (
    <div className="min-h-screen">
<div>
  <main className="w-full pt-16 bg-surface min-h-[calc(100vh-64px)]"><div className="flex flex-col w-full">
      <link href="https://fonts.googleapis.com" rel="preconnect" />
      <link crossOrigin="anonymous" href="https://fonts.gstatic.com" rel="preconnect" />
      <link href="https://fonts.googleapis.com/css2?family=Dancing+Script:wght@600;700&display=swap" rel="stylesheet" />
      <style dangerouslySetInnerHTML={{__html: "\n    .font-romantic {\n      font-family: 'Dancing Script', cursive;\n    }\n  " }} />
      <section className="relative w-full overflow-hidden bg-gradient-to-b from-surface via-surface-container-low to-surface pt-12 pb-16 lg:pt-16 lg:pb-24">
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-primary-container/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-48 right-12 w-80 h-80 bg-secondary-container/40 rounded-full blur-2xl pointer-events-none" />
        <div className="max-w-[1280px] mx-auto px-margin-mobile md:px-space-xl lg:px-margin relative z-10 flex flex-col items-center text-center">
          <div className="inline-flex items-center gap-space-xs px-space-md py-1.5 rounded-full bg-surface-container border border-surface-variant shadow-sm mb-space-md animate-fade-in">
            <span className="text-primary-container font-label-md text-label-md">✨ BẢNG GIÁ MINH BẠCH · KHÔNG PHÍ ẨN</span>
          </div>
          <h1 className="font-headline-xl text-headline-xl text-on-surface max-w-4xl tracking-tight mb-space-xs leading-tight">
            Đầu tư cho kỷ niệm tình yêu vĩnh cửu
          </h1>
          <p className="font-romantic text-2xl lg:text-[28px] text-primary-container font-bold mb-space-md tracking-wide">
            “Tình yêu là vô giá, và nơi lưu giữ cũng phải thật xứng đáng”
          </p>
          <p className="font-body-lg text-body-lg text-on-secondary-container max-w-2xl mb-space-lg leading-relaxed">
            Bắt đầu miễn phí vĩnh viễn. Nâng cấp bất cứ lúc nào để mở khóa thêm tính năng cho hành trình của hai bạn.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-space-sm sm:gap-space-md mb-space-lg">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-surface-container-lowest shadow-sm text-on-surface font-label-md text-label-md">
              <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center font-bold text-xs">✓</span>
              <span>Đổi gói hoặc huỷ bất cứ lúc nào</span>
            </div>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-surface-container-lowest shadow-sm text-on-surface font-label-md text-label-md">
              <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center font-bold text-xs">✓</span>
              <span>Bảo mật dữ liệu &amp; mã hóa 256-bit</span>
            </div>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-surface-container-lowest shadow-sm text-on-surface font-label-md text-label-md">
              <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center font-bold text-xs">✓</span>
              <span>Hỗ trợ đồng hành 24/7</span>
            </div>
          </div>
          <div className="inline-flex items-center gap-2 px-space-md py-space-xs rounded-full bg-surface-container-high/80 text-on-surface-variant font-label-sm text-label-sm backdrop-blur-sm">
            <span className="text-base select-none">💡</span>
            <span>Lưu ý: Giá tính theo từng Story riêng biệt · Một tài khoản lưu tối đa 3 Story</span>
          </div>
        </div>
      </section>
      <section className="w-full pb-20 lg:pb-28">
        <div className="max-w-[1280px] mx-auto px-margin-mobile md:px-space-xl lg:px-margin">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-gutter items-stretch">
            <div className="flex flex-col justify-between rounded-lg bg-surface-container-lowest p-space-lg shadow-sm hover:shadow-md transition-all duration-300">
              <div>
                <div className="inline-flex items-center px-3 py-1 rounded-full bg-[#FFE4EF] text-[#FF4D8D] font-label-sm text-label-sm mb-space-md">
                  MIỄN PHÍ
                </div>
                <div className="flex items-baseline gap-1 mb-1">
                  <span className="font-headline-lg text-headline-lg text-on-surface font-bold">{formatPrice(free?.price ?? 0)}</span>
                  <span className="font-body-sm text-body-sm text-on-secondary-container">/ mãi mãi</span>
                </div>
                <p className="font-body-sm text-body-sm text-on-secondary-container min-h-[44px] mb-space-lg">
                  {free?.description ?? 'Miễn phí vĩnh viễn với các tính năng cơ bản để bắt đầu câu chuyện tình yêu.'}
                </p>
                <div className="w-full h-px bg-surface-container mb-space-md" />
                <ul className="flex flex-col gap-space-sm mb-space-lg font-body-sm text-body-sm text-on-surface">
                  <li className="flex items-start gap-2">
                    <span className="material-symbols-outlined text-primary-container text-[18px] shrink-0">check_circle</span>
                    <span>1 Trang web kỷ niệm</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="material-symbols-outlined text-primary-container text-[18px] shrink-0">check_circle</span>
                    <span>Tên miền con .couplestory.site</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="material-symbols-outlined text-primary-container text-[18px] shrink-0">check_circle</span>
                    <span>Tải tối đa 20 hình ảnh</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="material-symbols-outlined text-primary-container text-[18px] shrink-0">check_circle</span>
                    <span>1 tài khoản quản lý</span>
                  </li>
                  <li className="flex items-start gap-2 text-on-surface-variant">
                    <span className="material-symbols-outlined text-outline-variant text-[18px] shrink-0">info</span>
                    <span>Watermark chân trang</span>
                  </li>
                </ul>
              </div>
              <a className="w-full inline-flex items-center justify-center px-4 py-3 rounded-full font-label-md text-label-md text-primary-container bg-surface-container-low hover:bg-surface-container transition-colors duration-150" href="#">
                Bắt đầu miễn phí
              </a>
            </div>
            <div className="flex flex-col justify-between rounded-lg bg-surface-container-lowest p-space-lg shadow-sm hover:shadow-md transition-all duration-300">
              <div>
                <div className="inline-flex items-center px-3 py-1 rounded-full bg-[#E8F4FF] text-[#1D4ED8] font-label-sm text-label-sm mb-space-md">
                  TRỌN ĐỜI
                </div>
                <div className="flex items-baseline gap-1 mb-1">
                  <span className="font-headline-lg text-headline-lg text-on-surface font-bold">{formatPrice(pro?.price ?? 49000)}</span>
                  <span className="font-body-sm text-body-sm text-on-secondary-container">/ trọn đời</span>
                </div>
                <p className="font-body-sm text-body-sm text-on-secondary-container min-h-[44px] mb-space-lg">
                  {pro?.description ?? 'Lưu giữ kỷ niệm vĩnh viễn không bao giờ hết hạn hay phát sinh chi phí.'}
                </p>
                <div className="w-full h-px bg-surface-container mb-space-md" />
                <ul className="flex flex-col gap-space-sm mb-space-lg font-body-sm text-body-sm text-on-surface">
                  <li className="flex items-start gap-2">
                    <span className="material-symbols-outlined text-primary-container text-[18px] shrink-0">check_circle</span>
                    <span className="font-semibold">Lưu trữ VĨNH VIỄN</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="material-symbols-outlined text-primary-container text-[18px] shrink-0">check_circle</span>
                    <span>Tải lên tới 100 ảnh HD</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="material-symbols-outlined text-primary-container text-[18px] shrink-0">check_circle</span>
                    <span>Khóa mật khẩu riêng tư</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="material-symbols-outlined text-primary-container text-[18px] shrink-0">check_circle</span>
                    <span>Nhạc nền tùy chọn lãng mạn</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="material-symbols-outlined text-primary-container text-[18px] shrink-0">check_circle</span>
                    <span>Không watermark thương hiệu</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="material-symbols-outlined text-primary-container text-[18px] shrink-0">check_circle</span>
                    <span>1 tài khoản quản lý</span>
                  </li>
                </ul>
              </div>
              <a className="w-full inline-flex items-center justify-center px-4 py-3 rounded-full font-label-md text-label-md text-primary-container bg-surface-container-low hover:bg-surface-container transition-colors duration-150" href="#">
                Chọn gói {pro?.name ?? 'Pro'}
              </a>
            </div>
            <div className="relative flex flex-col justify-between rounded-lg bg-surface-container-lowest p-space-lg shadow-[0_16px_40px_rgba(255,77,141,0.22)] lg:-translate-y-2 lg:scale-[1.03] z-20 overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-primary-container via-purple-500 to-primary-container" />
              <div>
                <div className="flex items-center justify-between gap-2 mb-space-md">
                  <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-gradient-to-r from-primary-container to-fuchsia-600 text-on-tertiary font-label-sm text-label-sm shadow-sm">
                    <span>PHỔ BIẾN NHẤT 💑</span>
                  </div>
                  <span className="font-romantic text-primary-container text-lg font-bold">Khuyên dùng</span>
                </div>
                <div className="flex items-baseline gap-1 mb-1">
                  <span className="font-headline-lg text-headline-lg text-on-surface font-bold">{formatPrice(couple?.price ?? 69000)}</span>
                  <span className="font-body-sm text-body-sm text-on-secondary-container">/ trọn đời</span>
                </div>
                <p className="font-body-sm text-body-sm text-on-secondary-container min-h-[44px] mb-space-lg">
                  {couple?.description ?? 'Dành cho hai người muốn cùng vun đắp và đồng chỉnh sửa không gian tình yêu.'}
                </p>
                <div className="w-full h-px bg-primary-container/20 mb-space-md" />
                <ul className="flex flex-col gap-space-sm mb-space-lg font-body-sm text-body-sm text-on-surface">
                  <li className="flex items-start gap-2 bg-surface-container-low/70 p-2 rounded-lg">
                    <span className="material-symbols-outlined text-primary-container text-[18px] shrink-0 font-bold">supervisor_account</span>
                    <span className="font-bold text-primary">2 TÀI KHOẢN ĐỒNG QUẢN LÝ</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="material-symbols-outlined text-primary-container text-[18px] shrink-0">check_circle</span>
                    <span>Thông báo ngọt ngào tức thì khi người yêu sửa bài</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="material-symbols-outlined text-primary-container text-[18px] shrink-0">check_circle</span>
                    <span>Mở khóa toàn bộ 10+ Template cao cấp</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="material-symbols-outlined text-primary-container text-[18px] shrink-0">check_circle</span>
                    <span>Lưu trữ tới 500 ảnh HD &amp; 3 Video ngắn</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="material-symbols-outlined text-primary-container text-[18px] shrink-0">check_circle</span>
                    <span>Quà tặng đếm ngược hẹn ước &amp; Hộp thư bí mật</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="material-symbols-outlined text-primary-container text-[18px] shrink-0">check_circle</span>
                    <span>Xuất file PDF in ấn &amp; QR khắc thiệp cưới</span>
                  </li>
                </ul>
              </div>
              <a className="w-full inline-flex items-center justify-center px-4 py-3 rounded-full font-label-md text-label-md font-bold text-on-tertiary bg-primary-container shadow-[0_4px_20px_rgba(255,77,141,0.4)] hover:bg-[#e63e7b] hover:scale-[1.02] active:scale-[0.98] transition-all duration-150" href="#">
                Chọn gói COUPLE 💑
              </a>
            </div>
            <div className="flex flex-col justify-between rounded-lg bg-surface-container-lowest p-space-lg shadow-sm hover:shadow-md transition-all duration-300">
              <div>
                <div className="inline-flex items-center px-3 py-1 rounded-full bg-[#FFF7E4] text-[#D97706] font-label-sm text-label-sm mb-space-md font-semibold">
                  ⭐ ĐẲNG CẤP PRO MAX
                </div>
                <div className="flex items-baseline gap-1 mb-1">
                  <span className="font-headline-lg text-headline-lg text-on-surface font-bold">{formatPrice(proMax?.price ?? 119000)}</span>
                  <span className="font-body-sm text-body-sm text-on-secondary-container">/ trọn đời</span>
                </div>
                <p className="font-body-sm text-body-sm text-on-secondary-container min-h-[44px] mb-space-lg">
                  {proMax?.description ?? 'Trải nghiệm sang trọng đỉnh cao với tên miền riêng và thiệp cưới online.'}
                </p>
                <div className="w-full h-px bg-surface-container mb-space-md" />
                <ul className="flex flex-col gap-space-sm mb-space-lg font-body-sm text-body-sm text-on-surface">
                  <li className="flex items-start gap-2">
                    <span className="material-symbols-outlined text-amber-500 text-[18px] shrink-0">check_circle</span>
                    <span className="font-semibold">Mọi quyền lợi của gói COUPLE</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="material-symbols-outlined text-amber-500 text-[18px] shrink-0">check_circle</span>
                    <span>Gắn TÊN MIỀN RIÊNG (.com, .vn, .love)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="material-symbols-outlined text-amber-500 text-[18px] shrink-0">check_circle</span>
                    <span>Dung lượng ảnh &amp; video KHÔNG GIỚI HẠN</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="material-symbols-outlined text-amber-500 text-[18px] shrink-0">check_circle</span>
                    <span>Tạo tối đa 3 câu chuyện khác nhau</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="material-symbols-outlined text-amber-500 text-[18px] shrink-0">check_circle</span>
                    <span>Thiệp cưới điện tử + RSVP khách mời</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="material-symbols-outlined text-amber-500 text-[18px] shrink-0">check_circle</span>
                    <span>Tùy biến riêng 1-1 bởi Designer</span>
                  </li>
                </ul>
              </div>
              <a className="w-full inline-flex items-center justify-center px-4 py-3 rounded-full font-label-md text-label-md text-amber-800 bg-amber-50 hover:bg-amber-100 transition-colors duration-150" href="#">
                Chọn gói PRO MAX ⭐
              </a>
            </div>
          </div>
        </div>
      </section>
      <section className="w-full py-16 bg-surface-container-low/60">
        <div className="max-w-[1280px] mx-auto px-margin-mobile md:px-space-xl lg:px-margin">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="font-headline-lg text-headline-lg text-on-surface font-bold mb-2">
              So sánh chi tiết tính năng giữa các gói
            </h2>
            <p className="font-body-md text-body-md text-on-secondary-container">
              Mọi điều bạn cần biết để chọn lựa gói lưu giữ kỷ niệm hoàn hảo nhất cho câu chuyện của hai bạn
            </p>
          </div>
          <div className="w-full overflow-x-auto rounded-lg shadow-sm bg-surface-container-lowest">
            <table className="w-full text-left border-collapse min-w-[760px]">
              <thead>
                <tr className="bg-surface-container-high/40">
                  <th className="p-4 sm:p-5 w-2/5 font-title-md text-title-md text-on-surface">Tính năng chính</th>
                  <th className="p-4 sm:p-5 w-3/20 text-center font-title-md text-title-md text-on-surface">{free?.name ?? 'Free'}</th>
                  <th className="p-4 sm:p-5 w-3/20 text-center font-title-md text-title-md text-on-surface">{pro?.name ?? 'Pro'}</th>
                  <th className="p-4 sm:p-5 w-1/5 text-center font-title-md text-title-md text-primary bg-primary-container/10 rounded-t-lg">
                    <span className="inline-block px-2 py-0.5 rounded-full bg-primary-container text-on-tertiary text-xs mr-1">HOT</span>
                    {couple?.name ?? 'Couple'}
                  </th>
                  <th className="p-4 sm:p-5 w-3/20 text-center font-title-md text-title-md text-amber-700">{proMax?.name ?? 'Pro Max'}</th>
                </tr>
              </thead>
              <tbody className="font-body-sm text-body-sm text-on-surface divide-y divide-surface-container">
                <tr className="bg-surface-container-low font-semibold text-primary">
                  <td className="py-3 px-5 font-title-md text-title-md" colSpan={5}>
                    🌐 THÔNG TIN &amp; LƯU TRỮ
                  </td>
                </tr>
                <tr className="hover:bg-surface/50">
                  <td className="p-4 pl-6 text-on-surface font-medium">Thời gian lưu trữ</td>
                  <td className="p-4 text-center text-on-surface-variant">Trọn đời</td>
                  <td className="p-4 text-center font-semibold text-on-surface">Trọn đời</td>
                  <td className="p-4 text-center font-semibold text-primary-container bg-primary-container/5">Trọn đời</td>
                  <td className="p-4 text-center font-semibold text-on-surface">Trọn đời</td>
                </tr>
                <tr className="hover:bg-surface/50">
                  <td className="p-4 pl-6 text-on-surface font-medium">Số lượng Story tạo lập</td>
                  <td className="p-4 text-center text-on-surface-variant">1 Story</td>
                  <td className="p-4 text-center text-on-surface">1 Story</td>
                  <td className="p-4 text-center font-semibold text-primary bg-primary-container/5">1 Story</td>
                  <td className="p-4 text-center text-amber-700 font-semibold">Tối đa 3 Story</td>
                </tr>
                <tr className="hover:bg-surface/50">
                  <td className="p-4 pl-6 text-on-surface font-medium">Tên miền con (.couplestory.site)</td>
                  <td className="p-4 text-center text-emerald-600 font-bold">Có</td>
                  <td className="p-4 text-center text-emerald-600 font-bold">Có</td>
                  <td className="p-4 text-center text-emerald-600 font-bold bg-primary-container/5">Có</td>
                  <td className="p-4 text-center text-emerald-600 font-bold">Có</td>
                </tr>
                <tr className="hover:bg-surface/50">
                  <td className="p-4 pl-6 text-on-surface font-medium">Hỗ trợ Tên miền riêng (.com, .vn, .love)</td>
                  <td className="p-4 text-center text-outline-variant font-bold">✗</td>
                  <td className="p-4 text-center text-outline-variant font-bold">✗</td>
                  <td className="p-4 text-center text-outline-variant font-bold bg-primary-container/5">✗</td>
                  <td className="p-4 text-center text-amber-700 font-semibold">Có (Bao gồm SSL)</td>
                </tr>
                <tr className="hover:bg-surface/50">
                  <td className="p-4 pl-6 text-on-surface font-medium">Xóa Watermark thương hiệu CoupleStory</td>
                  <td className="p-4 text-center text-outline-variant font-bold">✗</td>
                  <td className="p-4 text-center text-emerald-600 font-bold">Có</td>
                  <td className="p-4 text-center text-emerald-600 font-bold bg-primary-container/5">Có</td>
                  <td className="p-4 text-center text-emerald-600 font-bold">Có</td>
                </tr>
                <tr className="bg-surface-container-low font-semibold text-primary">
                  <td className="py-3 px-5 font-title-md text-title-md" colSpan={5}>
                    📸 HÌNH ẢNH &amp; NỘI DUNG
                  </td>
                </tr>
                <tr className="hover:bg-surface/50">
                  <td className="p-4 pl-6 text-on-surface font-medium">Số lượng ảnh tải lên</td>
                  <td className="p-4 text-center text-on-surface-variant">20 ảnh</td>
                  <td className="p-4 text-center text-on-surface">100 ảnh HD</td>
                  <td className="p-4 text-center font-semibold text-primary bg-primary-container/5">500 ảnh HD</td>
                  <td className="p-4 text-center text-amber-700 font-bold">Không giới hạn</td>
                </tr>
                <tr className="hover:bg-surface/50">
                  <td className="p-4 pl-6 text-on-surface font-medium">Tải lên Video ngắn kỷ niệm</td>
                  <td className="p-4 text-center text-outline-variant font-bold">✗</td>
                  <td className="p-4 text-center text-outline-variant font-bold">✗</td>
                  <td className="p-4 text-center font-semibold text-on-surface bg-primary-container/5">Có (3 video)</td>
                  <td className="p-4 text-center text-amber-700 font-bold">Không giới hạn</td>
                </tr>
                <tr className="hover:bg-surface/50">
                  <td className="p-4 pl-6 text-on-surface font-medium">Nhạc nền lãng mạn tùy chọn</td>
                  <td className="p-4 text-center text-on-surface-variant">1 bài mẫu</td>
                  <td className="p-4 text-center text-on-surface">Chọn tự do</td>
                  <td className="p-4 text-center font-semibold text-on-surface bg-primary-container/5">Chọn tự do + Upload MP3</td>
                  <td className="p-4 text-center text-on-surface">Kho nhạc VIP + Upload</td>
                </tr>
                <tr className="hover:bg-surface/50">
                  <td className="p-4 pl-6 text-on-surface font-medium">Thư viện giao diện (Template)</td>
                  <td className="p-4 text-center text-on-surface-variant">2 mẫu cơ bản</td>
                  <td className="p-4 text-center text-on-surface">5 mẫu phong phú</td>
                  <td className="p-4 text-center font-semibold text-primary bg-primary-container/5">Toàn bộ 10+ mẫu cao cấp</td>
                  <td className="p-4 text-center text-amber-700 font-semibold">Toàn bộ + Mẫu độc quyền</td>
                </tr>
                <tr className="bg-surface-container-low font-semibold text-primary">
                  <td className="py-3 px-5 font-title-md text-title-md" colSpan={5}>
                    💑 TÍNH NĂNG ĐỒNG SÁNG TẠO (COUPLE EXCLUSIVE)
                  </td>
                </tr>
                <tr className="hover:bg-surface/50">
                  <td className="p-4 pl-6 text-on-surface font-medium">Số người đồng quản lý</td>
                  <td className="p-4 text-center text-on-surface-variant">1 người</td>
                  <td className="p-4 text-center text-on-surface-variant">1 người</td>
                  <td className="p-4 text-center font-bold text-primary bg-primary-container/5">2 người (Tài khoản riêng)</td>
                  <td className="p-4 text-center font-bold text-on-surface">2 người (Tài khoản riêng)</td>
                </tr>
                <tr className="hover:bg-surface/50">
                  <td className="p-4 pl-6 text-on-surface font-medium">Thông báo khi người thương sửa bài</td>
                  <td className="p-4 text-center text-outline-variant font-bold">✗</td>
                  <td className="p-4 text-center text-outline-variant font-bold">✗</td>
                  <td className="p-4 text-center font-semibold text-emerald-600 bg-primary-container/5">Có (Realtime)</td>
                  <td className="p-4 text-center font-semibold text-emerald-600">Có (Realtime)</td>
                </tr>
                <tr className="hover:bg-surface/50">
                  <td className="p-4 pl-6 text-on-surface font-medium">Hộp thư tình bí mật (Love Capsule)</td>
                  <td className="p-4 text-center text-outline-variant font-bold">✗</td>
                  <td className="p-4 text-center text-outline-variant font-bold">✗</td>
                  <td className="p-4 text-center font-semibold text-on-surface bg-primary-container/5">Có (Mở theo ngày hẹn)</td>
                  <td className="p-4 text-center font-semibold text-on-surface">Có (Mở theo ngày hẹn)</td>
                </tr>
                <tr className="hover:bg-surface/50">
                  <td className="p-4 pl-6 text-on-surface font-medium">Sổ lưu bút &amp; Lời chúc bạn bè</td>
                  <td className="p-4 text-center text-on-surface-variant">Tối đa 10 lời chúc</td>
                  <td className="p-4 text-center text-on-surface">Tối đa 50 lời chúc</td>
                  <td className="p-4 text-center font-semibold text-on-surface bg-primary-container/5">Không giới hạn + Duyệt lời chúc</td>
                  <td className="p-4 text-center text-amber-700 font-semibold">Không giới hạn + Hiệu ứng VIP</td>
                </tr>
                <tr className="bg-surface-container-low font-semibold text-primary">
                  <td className="py-3 px-5 font-title-md text-title-md" colSpan={5}>
                    🛡️ BẢO MẬT &amp; HỖ TRỢ
                  </td>
                </tr>
                <tr className="hover:bg-surface/50">
                  <td className="p-4 pl-6 text-on-surface font-medium">Mã hóa dữ liệu 256-bit</td>
                  <td className="p-4 text-center text-emerald-600 font-bold">Có</td>
                  <td className="p-4 text-center text-emerald-600 font-bold">Có</td>
                  <td className="p-4 text-center text-emerald-600 font-bold bg-primary-container/5">Có</td>
                  <td className="p-4 text-center text-emerald-600 font-bold">Có</td>
                </tr>
                <tr className="hover:bg-surface/50">
                  <td className="p-4 pl-6 text-on-surface font-medium">Khóa mật khẩu Story riêng tư</td>
                  <td className="p-4 text-center text-outline-variant font-bold">✗</td>
                  <td className="p-4 text-center text-emerald-600 font-bold">Có</td>
                  <td className="p-4 text-center text-emerald-600 font-bold bg-primary-container/5">Có</td>
                  <td className="p-4 text-center text-emerald-600 font-bold">Có</td>
                </tr>
                <tr className="hover:bg-surface/50">
                  <td className="p-4 pl-6 text-on-surface font-medium">Xuất file in ấn kỷ niệm (PDF)</td>
                  <td className="p-4 text-center text-outline-variant font-bold">✗</td>
                  <td className="p-4 text-center text-outline-variant font-bold">✗</td>
                  <td className="p-4 text-center font-semibold text-emerald-600 bg-primary-container/5">Có</td>
                  <td className="p-4 text-center font-semibold text-amber-700">Có (Bản in cao cấp)</td>
                </tr>
                <tr className="hover:bg-surface/50">
                  <td className="p-4 pl-6 text-on-surface font-medium">Kênh hỗ trợ kỹ thuật</td>
                  <td className="p-4 text-center text-on-surface-variant">Email cộng đồng</td>
                  <td className="p-4 text-center text-on-surface">Email ưu tiên</td>
                  <td className="p-4 text-center font-bold text-primary bg-primary-container/5">Chat riêng 24/7</td>
                  <td className="p-4 text-center text-amber-700 font-bold">Chuyên viên 1-1</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>
      <section className="w-full py-20 bg-surface">
        <div className="max-w-[880px] mx-auto px-margin-mobile md:px-space-xl">
          <div className="text-center mb-12">
            <h2 className="font-headline-lg text-headline-lg text-on-surface font-bold mb-2">
              Câu hỏi thường gặp về Bảng giá
            </h2>
            <p className="font-body-md text-body-md text-on-secondary-container">
              Giải đáp rõ ràng mọi băn khoăn của bạn trước khi bắt đầu hành trình
            </p>
          </div>
          <div className="flex flex-col gap-4">
            <div className="faq-item rounded-lg bg-surface-container-lowest p-6 shadow-sm transition-all duration-200 cursor-pointer" onClick={() => {}}>
              <div className="flex items-center justify-between gap-4">
                <h3 className="font-title-lg text-title-lg text-on-surface font-semibold text-left">
                  Gói COUPLE có nghĩa là cả hai người đều phải trả tiền không?
                </h3>
                <span className="faq-icon material-symbols-outlined text-primary-container transition-transform duration-200 shrink-0">add</span>
              </div>
              <div className="faq-answer hidden pt-4 text-on-secondary-container font-body-md text-body-md leading-relaxed">
                Hoàn toàn <strong>KHÔNG</strong>! Chỉ một người đứng ra đăng ký và thanh toán (Owner). Sau khi mua gói COUPLE, bạn chỉ cần nhập email của người yêu để gửi lời mời. Người thương của bạn sẽ có tài khoản riêng hoàn toàn miễn phí và cùng bạn chăm sóc trang web tình yêu.
              </div>
            </div>
            <div className="faq-item rounded-lg bg-surface-container-lowest p-6 shadow-sm transition-all duration-200 cursor-pointer" onClick={() => {}}>
              <div className="flex items-center justify-between gap-4">
                <h3 className="font-title-lg text-title-lg text-on-surface font-semibold text-left">
                  Chi phí các gói trả phí là thanh toán trọn đời hay phải gia hạn hàng tháng?
                </h3>
                <span className="faq-icon material-symbols-outlined text-primary-container transition-transform duration-200 shrink-0">add</span>
              </div>
              <div className="faq-answer hidden pt-4 text-on-secondary-container font-body-md text-body-md leading-relaxed">
                Tất cả các gói trả phí của CoupleStory đều là phí <strong>MỘT LẦN DUY NHẤT</strong>. Bạn không bao giờ phải lo lắng về việc bị trừ tiền định kỳ mỗi tháng hay năm. Trang web kỷ niệm của hai bạn sẽ tồn tại vĩnh viễn trên internet.
              </div>
            </div>
            <div className="faq-item rounded-lg bg-surface-container-lowest p-6 shadow-sm transition-all duration-200 cursor-pointer" onClick={() => {}}>
              <div className="flex items-center justify-between gap-4">
                <h3 className="font-title-lg text-title-lg text-on-surface font-semibold text-left">
                  Nếu tôi muốn nâng cấp từ gói Free thì dữ liệu có bị mất không?
                </h3>
                <span className="faq-icon material-symbols-outlined text-primary-container transition-transform duration-200 shrink-0">add</span>
              </div>
              <div className="faq-answer hidden pt-4 text-on-secondary-container font-body-md text-body-md leading-relaxed">
                Hoàn toàn <strong>KHÔNG</strong>! Mọi dữ liệu ảnh, lời thư tình và các mốc thời gian của bạn được giữ nguyên khi nâng cấp. Bạn chỉ cần chọn gói mới và thanh toán, tất cả nội dung sẽ được chuyển sang gói mới ngay lập tức mà không mất bất kỳ ký ức nào.
              </div>
            </div>
            <div className="faq-item rounded-lg bg-surface-container-lowest p-6 shadow-sm transition-all duration-200 cursor-pointer" onClick={() => {}}>
              <div className="flex items-center justify-between gap-4">
                <h3 className="font-title-lg text-title-lg text-on-surface font-semibold text-left">
                  Mình có thể đổi Template sau khi đã xuất bản trang web không?
                </h3>
                <span className="faq-icon material-symbols-outlined text-primary-container transition-transform duration-200 shrink-0">add</span>
              </div>
              <div className="faq-answer hidden pt-4 text-on-secondary-container font-body-md text-body-md leading-relaxed">
                Có chứ! Bạn có thể đổi sang bất kỳ mẫu giao diện nào bất kỳ lúc nào chỉ bằng một cú nhấp chuột. Mọi ảnh, văn bản, ngày tháng đều tự động thích ứng với template mới mà không cần biên tập lại từ đầu.
              </div>
            </div>
            <div className="faq-item rounded-lg bg-surface-container-lowest p-6 shadow-sm transition-all duration-200 cursor-pointer" onClick={() => {}}>
              <div className="flex items-center justify-between gap-4">
                <h3 className="font-title-lg text-title-lg text-on-surface font-semibold text-left">
                  Người ngoài có xem được trang web kỷ niệm của hai bạn không?
                </h3>
                <span className="faq-icon material-symbols-outlined text-primary-container transition-transform duration-200 shrink-0">add</span>
              </div>
              <div className="faq-answer hidden pt-4 text-on-secondary-container font-body-md text-body-md leading-relaxed">
                Trang web chỉ hiển thị cho những ai có đường link trực tiếp. Ngoài ra từ gói Pro trở lên, bạn có thể cài đặt <strong>Mật khẩu bảo vệ trang web</strong> để chỉ những người có mật mã mới được phép truy cập.
              </div>
            </div>
            <div className="faq-item rounded-lg bg-surface-container-lowest p-6 shadow-sm transition-all duration-200 cursor-pointer" onClick={() => {}}>
              <div className="flex items-center justify-between gap-4">
                <h3 className="font-title-lg text-title-lg text-on-surface font-semibold text-left">
                  Làm thế nào để gắn Tên miền riêng (ví dụ: longannhien.com) ở gói PRO MAX?
                </h3>
                <span className="faq-icon material-symbols-outlined text-primary-container transition-transform duration-200 shrink-0">add</span>
              </div>
              <div className="faq-answer hidden pt-4 text-on-secondary-container font-body-md text-body-md leading-relaxed">
                Đội ngũ kỹ thuật của CoupleStory sẽ hỗ trợ cấu hình trọn gói từ đăng ký tên miền đến cài đặt chứng chỉ bảo mật SSL miễn phí. Bạn chỉ cần chọn tên miền ưng ý, chúng mình sẽ làm phần còn lại.
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="w-full pb-20 pt-4">
        <div className="max-w-[1280px] mx-auto px-margin-mobile md:px-space-xl lg:px-margin">
          <div className="relative overflow-hidden rounded-xl bg-gradient-to-r from-[#FF4D8D] via-[#C026D3] to-[#7C3AED] p-8 md:p-14 text-center text-on-tertiary shadow-xl">
            <div className="absolute top-4 left-8 text-white/20 text-3xl font-romantic select-none">♥</div>
            <div className="absolute bottom-6 right-12 text-white/20 text-5xl font-romantic select-none">♥</div>
            <div className="absolute top-1/2 left-10 -translate-y-1/2 text-white/10 text-6xl font-romantic select-none">✨</div>
            <div className="relative z-10 max-w-3xl mx-auto flex flex-col items-center">
              <h2 className="font-headline-xl text-headline-xl font-bold mb-4 tracking-tight leading-tight">
                Sẵn sàng lưu giữ khoảnh khắc ngọt ngào của hai bạn?
              </h2>
              <p className="font-body-lg text-body-lg text-white/90 mb-8 max-w-xl">
                Tham gia cùng hơn 5,000+ cặp đôi hạnh phúc trên khắp Việt Nam ngay hôm nay.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto mb-6">
                <a className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-3.5 rounded-full font-label-md text-label-md font-bold text-primary-container bg-surface shadow-[0_6px_20px_rgba(0,0,0,0.18)] hover:scale-105 active:scale-95 transition-all duration-150" href="#">
                  Bắt đầu 7 ngày miễn phí
                </a>
                <a className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-3.5 rounded-full font-label-md text-label-md font-semibold text-on-tertiary bg-white/10 hover:bg-white/20 transition-all duration-150 backdrop-blur-sm" href="#">
                  Khám phá 10+ Template
                </a>
              </div>
              <p className="font-body-sm text-body-sm text-white/80">
                Không cần thẻ tín dụng · Tạo trang web chỉ trong 5 phút
              </p>
            </div>
          </div>
        </div>
      </section>
    </div></main>
</div>

    </div>
  );
}
