import { usePlans } from '../hooks/usePlans';
import { formatPrice } from '../utils/formatPrice';

export default function DashboardUpgrade() {
  const { plans } = usePlans();
  const couple = plans.find(p => p.code === 'COUPLE');
  const proMax = plans.find(p => p.code === 'PRO_MAX');

  return (
    <>
<main className="w-full pt-16 bg-surface min-h-screen px-space-lg py-space-md"><div className="flex flex-col w-full">
    <div className="max-w-[1280px] w-full mx-auto space-y-space-lg pb-space-xl">
      <section className="relative overflow-hidden rounded-lg bg-gradient-to-r from-primary via-primary-container to-tertiary text-on-primary shadow-xl p-space-md lg:p-space-lg">
        <div className="absolute -right-12 -bottom-16 w-64 h-64 rounded-full bg-surface-container-highest/20 blur-3xl pointer-events-none" />
        <div className="absolute left-1/3 -top-12 w-48 h-48 rounded-full bg-primary-fixed/20 blur-2xl pointer-events-none" />
        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-space-lg">
          <div className="flex items-start gap-space-md max-w-3xl">
            <div className="w-12 h-12 rounded-full bg-surface-container-lowest/20 backdrop-blur-md flex items-center justify-center shrink-0 shadow-sm">
              <span className="material-symbols-outlined text-on-primary text-[28px]" style={{fontVariationSettings: '"FILL" 1'}}>alarm</span>
            </div>
            <div className="space-y-space-xs">
              <div className="inline-flex items-center gap-2 px-space-sm py-0.5 rounded-full bg-surface-container-lowest/25 backdrop-blur-sm text-on-primary text-label-sm uppercase tracking-wider font-label-sm">
                <span className="w-2 h-2 rounded-full bg-surface-container-lowest animate-ping" />
                Cảnh báo gia hạn khẩn cấp
              </div>
              <h2 className="font-headline-md text-headline-md text-on-primary font-semibold leading-tight">
                Story “Mùa Hè Năm Ấy - Đà Lạt” sẽ hết hạn dùng thử sau 23 giờ 45 phút!
              </h2>
              <p className="font-body-md text-on-primary/90 text-body-md leading-relaxed">
                Đừng để những thước phim kỷ niệm bị gián đoạn. Nâng cấp lên gói <strong className="font-semibold text-surface-container-lowest underline decoration-surface-container-lowest/50">PRO</strong> hoặc <strong className="font-semibold text-surface-container-lowest underline decoration-surface-container-lowest/50">COUPLE</strong> ngay hôm nay để giữ trọn vẹn tên miền riêng, 142 ảnh kỷ niệm và 86 lời chúc vô giá của bạn bè.
              </p>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row lg:flex-col items-center lg:items-end justify-between gap-space-md shrink-0 bg-surface-container-lowest/15 backdrop-blur-md p-space-md rounded-DEFAULT">
            <div className="flex items-center gap-space-xs text-center" id="countdown-wrapper">
              <div className="flex flex-col items-center bg-surface-container-lowest/25 px-space-sm py-space-xs rounded-DEFAULT min-w-[56px]">
                <span className="font-headline-md text-headline-md text-on-primary font-bold" id="timer-hours">23</span>
                <span className="font-label-sm text-label-sm text-on-primary/80 uppercase">Giờ</span>
              </div>
              <span className="font-headline-md text-headline-md text-on-primary/70">:</span>
              <div className="flex flex-col items-center bg-surface-container-lowest/25 px-space-sm py-space-xs rounded-DEFAULT min-w-[56px]">
                <span className="font-headline-md text-headline-md text-on-primary font-bold" id="timer-minutes">41</span>
                <span className="font-label-sm text-label-sm text-on-primary/80 uppercase">Phút</span>
              </div>
              <span className="font-headline-md text-headline-md text-on-primary/70">:</span>
              <div className="flex flex-col items-center bg-surface-container-lowest/25 px-space-sm py-space-xs rounded-DEFAULT min-w-[56px]">
                <span className="font-headline-md text-headline-md text-on-primary font-bold" id="timer-seconds">47</span>
                <span className="font-label-sm text-label-sm text-on-primary/80 uppercase">Giây</span>
              </div>
            </div>
            <button className="w-full sm:w-auto px-space-lg py-space-sm rounded-full bg-surface-container-lowest text-primary font-title-md hover:bg-surface-container-low transition-all duration-300 shadow-md hover:shadow-lg flex items-center justify-center gap-2 group">
              <span className="material-symbols-outlined text-[20px] text-primary group-hover:scale-110 transition-transform">bolt</span>
              <span>Nâng cấp ngay • Giảm 20%</span>
            </button>
          </div>
        </div>
      </section>
      <section className="grid grid-cols-1 md:grid-cols-3 gap-space-md">
        <div className="bg-surface-container-lowest p-space-lg rounded-lg shadow-sm hover:shadow-md transition-shadow relative overflow-hidden flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="font-label-md text-label-md text-on-surface-variant font-medium">Story Hoạt Động</span>
            <span className="w-9 h-9 rounded-full bg-surface-container-high flex items-center justify-center text-primary">
              <span className="material-symbols-outlined text-[20px]">auto_stories</span>
            </span>
          </div>
          <div className="mt-space-md">
            <div className="flex items-baseline gap-2">
              <span className="font-headline-xl text-headline-xl font-bold text-on-surface">2</span>
              <span className="font-title-lg text-title-lg text-on-surface-variant">/ 3 Slot</span>
            </div>
            <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">1 vĩnh viễn • 1 sắp khoá sau 23h</p>
          </div>
          <div className="mt-space-md w-full bg-surface-container rounded-full h-2 overflow-hidden flex">
            <div className="bg-primary h-full w-1/3" title="Bảo Long & An Nhiên (VIP)" />
            <div className="bg-error h-full w-1/3 animate-pulse" title="Mùa Hè Năm Ấy (Hết hạn)" />
            <div className="bg-outline-variant/30 h-full w-1/3" title="Còn trống" />
          </div>
        </div>
        <div className="bg-surface-container-lowest p-space-lg rounded-lg shadow-sm hover:shadow-md transition-shadow flex items-center justify-between">
          <div className="flex flex-col justify-between h-full">
            <div>
              <span className="font-label-md text-label-md text-on-surface-variant font-medium">Lưu Trữ Ảnh &amp; Video</span>
              <div className="flex items-baseline gap-1 mt-space-sm">
                <span className="font-headline-xl text-headline-xl font-bold text-on-surface">85</span>
                <span className="font-title-lg text-title-lg text-error font-semibold">%</span>
              </div>
              <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">4.25 GB / 5.0 GB đã sử dụng</p>
            </div>
            <span className="inline-flex items-center gap-1 font-label-sm text-label-sm text-error bg-error-container/30 px-space-xs py-0.5 rounded-full w-fit">
              <span className="material-symbols-outlined text-[14px]">warning</span>
              Cần thêm dung lượng
            </span>
          </div>
          <div className="relative w-24 h-24 shrink-0 flex items-center justify-center">
            <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
              <path className="text-surface-container" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="3.5" />
              <path className="text-primary-container" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeDasharray="85, 100" strokeLinecap="round" strokeWidth="3.5" />
            </svg>
            <span className="absolute font-title-md text-title-md text-on-surface font-semibold">85%</span>
          </div>
        </div>
        <div className="bg-surface-container-lowest p-space-lg rounded-lg shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="font-label-md text-label-md text-on-surface-variant font-medium">Lượt Xem &amp; Chúc Mừng</span>
            <span className="w-9 h-9 rounded-full bg-surface-container-high flex items-center justify-center text-primary">
              <span className="material-symbols-outlined text-[20px]" style={{fontVariationSettings: '"FILL" 1'}}>favorite</span>
            </span>
          </div>
          <div className="mt-space-md">
            <div className="flex items-baseline gap-2">
              <span className="font-headline-xl text-headline-xl font-bold text-on-surface">1,420</span>
              <span className="font-label-md text-label-md text-primary font-medium flex items-center">
                <span className="material-symbols-outlined text-[16px]">trending_up</span> +38 hôm nay
              </span>
            </div>
            <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">86 lời chúc ngọt ngào được lưu lại</p>
          </div>
          <div className="mt-space-md h-6 w-full flex items-end gap-1">
            <span className="bg-primary/20 hover:bg-primary transition-colors h-2 flex-1 rounded-t-sm" />
            <span className="bg-primary/20 hover:bg-primary transition-colors h-3 flex-1 rounded-t-sm" />
            <span className="bg-primary/30 hover:bg-primary transition-colors h-4 flex-1 rounded-t-sm" />
            <span className="bg-primary/40 hover:bg-primary transition-colors h-3.5 flex-1 rounded-t-sm" />
            <span className="bg-primary/50 hover:bg-primary transition-colors h-5 flex-1 rounded-t-sm" />
            <span className="bg-primary-container hover:bg-primary transition-colors h-6 flex-1 rounded-t-sm" />
            <span className="bg-primary hover:bg-primary-container transition-colors h-full flex-1 rounded-t-sm" />
          </div>
        </div>
      </section>
      <section className="space-y-space-md">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-headline-md text-headline-md text-on-surface font-semibold">Story của bạn</h3>
            <p className="font-body-sm text-body-sm text-on-surface-variant">Quản lý không gian kỷ niệm và trạng thái tên miền</p>
          </div>
          <div className="flex items-center gap-space-xs text-label-md font-label-md text-on-surface-variant">
            <span className="w-2.5 h-2.5 rounded-full bg-primary-container" /> Hoạt động
            <span className="w-2.5 h-2.5 rounded-full bg-error ml-2" /> Sắp hết hạn
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-space-lg">
          <article className="bg-surface-container-lowest rounded-lg p-space-md sm:p-space-lg shadow-sm hover:shadow-md transition-all flex flex-col justify-between gap-space-md group">
            <div className="flex gap-space-md">
              <div className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-DEFAULT overflow-hidden shrink-0 shadow-inner">
                <img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" data-alt="A cinematic sunlit medium shot of a chic Asian couple holding hands and laughing softly in an aesthetic café in Hanoi, styled with soft plum and rose gold hues, warm vintage film grain, high dynamic range, dreamy modern editorial wedding photography." src="https://lh3.googleusercontent.com/aida-public/AB6AXuDh3yGud5wim_R-RMP7PuTjek--_NL2whgoBWinvu0ithVSC_l4hkOrEYXgAeUYoQLzw9MihRYrfkmdK4bqb4KLm62olWedmvnptetQlTzMUExpRJCYR4VdEFtIvhGWUmiqc9Sa7PkU8mWYP8W6KF1fWtJhumrFIY3f10XhgJSZTprNRFuWO1Gh-nyMOwlWAuNt7nIs539cmpb-R594IIvBLwTewRrFb8WSVgdCUTrA1UDxNrR5zlrm" />
                <div className="absolute top-2 left-2 px-space-xs py-0.5 rounded-full bg-surface-container-lowest/90 backdrop-blur-sm text-primary font-label-sm text-label-sm flex items-center gap-1 shadow-sm">
                  <span className="material-symbols-outlined text-[14px]" style={{fontVariationSettings: '"FILL" 1'}}>verified</span> VIP
                </div>
              </div>
              <div className="flex flex-col justify-between flex-1 min-w-0">
                <div>
                  <div className="flex items-center justify-between gap-2">
                    <h4 className="font-title-lg text-title-lg text-on-surface font-bold truncate">Bảo Long &amp; An Nhiên</h4>
                    <span className="px-space-sm py-0.5 rounded-full bg-surface-container text-primary font-label-sm text-label-sm shrink-0">Vĩnh Viễn</span>
                  </div>
                  <p className="font-body-sm text-body-sm text-on-surface-variant truncate mt-1">bao-long-an-nhien.couplestory.site</p>
                  <div className="flex items-center gap-space-sm mt-space-sm text-on-surface-variant font-body-sm text-body-sm">
                    <span className="flex items-center gap-1"><span className="material-symbols-outlined text-[16px]">photo_library</span> 348 ảnh</span>
                    <span className="flex items-center gap-1"><span className="material-symbols-outlined text-[16px]">music_note</span> Nhạc nền</span>
                  </div>
                </div>
                <div className="flex items-center gap-space-xs mt-space-sm">
                  <a className="px-space-md py-1.5 rounded-full bg-surface-container-low hover:bg-surface-container-high text-on-surface font-title-md text-label-md transition-colors flex items-center gap-1" href="#">
                    <span className="material-symbols-outlined text-[16px]">edit</span> Chỉnh sửa
                  </a>
                  <a className="px-space-md py-1.5 rounded-full bg-surface-container-lowest hover:bg-surface-container-low text-primary font-title-md text-label-md transition-colors flex items-center gap-1" href="#">
                    <span className="material-symbols-outlined text-[16px]">open_in_new</span> Xem trực tiếp
                  </a>
                </div>
              </div>
            </div>
            <div className="pt-space-xs flex items-center justify-between text-on-surface-variant font-body-sm text-body-sm bg-surface-container-low/40 px-space-md py-space-xs rounded-DEFAULT">
              <span>Khởi tạo: 14/02/2023</span>
              <span className="text-primary font-medium flex items-center gap-1">
                <span className="material-symbols-outlined text-[16px]">lock_open</span> Không giới hạn lượt xem
              </span>
            </div>
          </article>
          <article className="bg-surface-container-lowest rounded-lg p-space-md sm:p-space-lg shadow-md hover:shadow-xl transition-all flex flex-col justify-between gap-space-md relative overflow-hidden bg-gradient-to-br from-surface-container-lowest via-surface-container-lowest to-surface-container-high/40">
            <div className="flex gap-space-md">
              <div className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-DEFAULT overflow-hidden shrink-0 shadow-inner">
                <img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" data-alt="Intimate film photograph of a young couple embracing during golden hour amidst the pine hills of Da Lat Vietnam, morning fog, cozy wool sweaters, gentle pastel pink atmospheric haze, nostalgic cinematic composition, fine art photography." src="https://lh3.googleusercontent.com/aida-public/AB6AXuAoW-21fS2U8Ga6TAP0exPTUaku7DfsmEyQo9Tu2weXlUpx0U4ntccn97QhYzjcDifPZ-lcVghRVdg6jibwtCtEdip6z5oLsfKstC4Uf6SZGwpHXgMT_KwCJGOsLAj3nUTtxBbiGWqmCXGOfWxU7uYa7l4BpApkLK51dp5QyhCZyUqxm6zEZwA85EcPp4q00YTCr2BVB-SfBUqOI0aTxY105eGGv8PHWh-_V8O06gpWkEQrzh0A-Dhl" />
                <div className="absolute inset-0 bg-error/10 pointer-events-none" />
                <div className="absolute top-2 left-2 px-space-xs py-0.5 rounded-full bg-error text-on-error font-label-sm text-label-sm flex items-center gap-1 shadow-sm">
                  <span className="material-symbols-outlined text-[14px]">timer</span> CÒN 23 GIỜ
                </div>
              </div>
              <div className="flex flex-col justify-between flex-1 min-w-0">
                <div>
                  <div className="flex items-center justify-between gap-2">
                    <h4 className="font-title-lg text-title-lg text-on-surface font-bold truncate">Mùa Hè Năm Ấy - Đà Lạt</h4>
                    <span className="px-space-sm py-0.5 rounded-full bg-error-container text-on-error-container font-label-sm text-label-sm font-semibold shrink-0 animate-pulse">Free</span>
                  </div>
                  <p className="font-body-sm text-body-sm text-error font-medium truncate mt-1">mua-he-nam-ay.couplestory.site</p>
                  <div className="flex items-center gap-space-sm mt-space-sm text-on-surface-variant font-body-sm text-body-sm">
                    <span className="flex items-center gap-1 text-error font-medium">
                      <span className="material-symbols-outlined text-[16px]">lock_clock</span> Sắp bị khoá link công khai
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-space-xs mt-space-sm flex-wrap">
                  <button className="px-space-md py-1.5 rounded-full bg-primary text-on-primary font-title-md text-label-md hover:bg-surface-tint transition-all shadow-sm flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-[16px]">upgrade</span> Nâng cấp khẩn cấp
                  </button>
                  <button className="px-space-md py-1.5 rounded-full bg-surface-container-high text-on-secondary-container font-title-md text-label-md hover:bg-surface-container transition-colors flex items-center gap-1">
                    <span>Gia hạn gói</span>
                  </button>
                </div>
              </div>
            </div>
            <div className="pt-space-xs flex items-center justify-between text-body-sm font-body-sm bg-error-container/30 px-space-md py-space-xs rounded-DEFAULT text-on-error-container">
              <span className="flex items-center gap-1 font-medium">
                <span className="material-symbols-outlined text-[16px] text-error">info</span> Dữ liệu &amp; lời chúc sẽ bị đóng băng sau khi hết hạn
              </span>
              <span className="font-bold underline cursor-pointer">Bảo lưu ngay</span>
            </div>
          </article>
        </div>
      </section>
      <section className="bg-surface-container-lowest rounded-lg p-space-lg lg:p-space-xl shadow-sm space-y-space-lg">
        <div className="text-center max-w-2xl mx-auto space-y-space-xs">
          <span className="px-space-sm py-1 rounded-full bg-surface-container text-primary font-label-md text-label-md font-semibold">Bảng nâng cấp đặc quyền</span>
          <h3 className="font-headline-lg text-headline-lg text-on-surface font-bold">Giữ mãi từng khoảnh khắc chung đôi</h3>
          <p className="font-body-md text-body-md text-on-surface-variant">Chọn gói giải pháp phù hợp nhất để giữ cho trang Story của bạn luôn toả sáng, mượt mà và an toàn trọn đời.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-space-md lg:gap-space-lg items-stretch">
          <div className="bg-surface-container-low rounded-lg p-space-lg flex flex-col justify-between space-y-space-md opacity-85">
            <div className="space-y-space-sm">
              <span className="font-title-md text-title-md text-on-surface-variant font-semibold">Gói Miễn Phí (Free)</span>
              <div className="flex items-baseline gap-1">
                <span className="font-headline-lg text-headline-lg text-on-surface font-bold">0đ</span>
                <span className="font-body-sm text-body-sm text-on-surface-variant">/ 7 ngày</span>
              </div>
              <p className="font-body-sm text-body-sm text-error font-medium">Trạng thái: Sắp hết hạn (Còn &lt; 24h)</p>
              <ul className="space-y-space-xs pt-space-md text-body-sm font-body-sm text-on-surface-variant">
                <li className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-outline text-[18px]">check</span> Giới hạn tối đa 10 ảnh
                </li>
                <li className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-outline text-[18px]">check</span> Subdomain ngắn hạn có quảng cáo
                </li>
                <li className="flex items-center gap-2 text-outline">
                  <span className="material-symbols-outlined text-[18px]">close</span> Tên miền riêng độc quyền
                </li>
                <li className="flex items-center gap-2 text-outline">
                  <span className="material-symbols-outlined text-[18px]">close</span> Lưu trữ ảnh gốc HD &amp; video 4K
                </li>
                <li className="flex items-center gap-2 text-outline">
                  <span className="material-symbols-outlined text-[18px]">close</span> Hỗ trợ mã PIN bảo mật riêng tư
                </li>
              </ul>
            </div>
            <button className="w-full py-space-sm rounded-full bg-outline-variant/50 text-on-surface-variant font-title-md cursor-not-allowed text-center" disabled>
              Gói hiện tại (Sắp kết thúc)
            </button>
          </div>
          <div className="bg-surface-container-lowest rounded-lg p-space-lg shadow-xl flex flex-col justify-between space-y-space-md relative overflow-hidden bg-gradient-to-b from-surface-container-lowest via-surface-container-lowest to-surface-container-high/20">
            <div className="absolute top-0 right-0 bg-primary text-on-primary text-label-sm font-label-sm px-space-md py-1 rounded-bl-DEFAULT font-bold uppercase tracking-wider shadow-sm">
              Phổ biến nhất
            </div>
            <div className="space-y-space-sm">
              <span className="font-title-md text-title-md text-primary font-bold flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[20px]" style={{fontVariationSettings: '"FILL" 1'}}>favorite</span>
                Couple
              </span>
              <div className="flex items-baseline gap-1.5">
                <span className="font-headline-lg text-headline-lg text-primary font-bold">{formatPrice(couple?.price ?? 69000)}</span>
                <span className="font-body-sm text-body-sm text-on-surface-variant">/ Trọn đời</span>
              </div>
              <p className="font-body-sm text-body-sm text-on-surface-variant">{couple?.description ?? 'Lưu giữ trọn vẹn kỷ niệm không bao giờ phai mờ.'}</p>
              <ul className="space-y-space-xs pt-space-md text-body-sm font-body-sm text-on-surface">
                <li className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary text-[18px]" style={{fontVariationSettings: '"FILL" 1'}}>check_circle</span>
                  <strong>Lưu trữ trọn đời</strong> không lo hết hạn
                </li>
                <li className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary text-[18px]" style={{fontVariationSettings: '"FILL" 1'}}>check_circle</span>
                  Không giới hạn số lượng ảnh tải lên
                </li>
                <li className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary text-[18px]" style={{fontVariationSettings: '"FILL" 1'}}>check_circle</span>
                  Nhạc nền tự chọn &amp; hiệu ứng lãng mạn
                </li>
                <li className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary text-[18px]" style={{fontVariationSettings: '"FILL" 1'}}>check_circle</span>
                  Tùy chỉnh đếm ngày yêu nhau (D-Day)
                </li>
                <li className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary text-[18px]" style={{fontVariationSettings: '"FILL" 1'}}>check_circle</span>
                  Không có quảng cáo CoupleStory
                </li>
              </ul>
            </div>
            <button className="w-full py-space-sm rounded-full bg-primary text-on-primary font-title-md hover:bg-surface-tint transition-all duration-200 shadow-md hover:shadow-lg flex items-center justify-center gap-2">
              <span>Nâng cấp Couple</span>
              <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
            </button>
          </div>
          <div className="bg-surface-container-low rounded-lg p-space-lg flex flex-col justify-between space-y-space-md hover:shadow-md transition-shadow">
            <div className="space-y-space-sm">
              <span className="font-title-md text-title-md text-tertiary font-bold flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[20px]">diamond</span> Pro Max
              </span>
              <div className="flex items-baseline gap-1.5">
                <span className="font-headline-lg text-headline-lg text-on-surface font-bold">{formatPrice(proMax?.price ?? 119000)}</span>
                <span className="font-body-sm text-body-sm text-on-surface-variant">/ Trọn đời</span>
              </div>
              <p className="font-body-sm text-body-sm text-on-surface-variant">{proMax?.description ?? 'Đỉnh cao độc bản với tên miền riêng tự chọn.'}</p>
              <ul className="space-y-space-xs pt-space-md text-body-sm font-body-sm text-on-surface">
                <li className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary text-[18px]">check_circle</span>
                  Tất cả tính năng của gói <strong>Couple</strong>
                </li>
                <li className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary text-[18px]">check_circle</span>
                  Tặng miễn phí tên miền riêng <strong>.love / .site</strong>
                </li>
                <li className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary text-[18px]">check_circle</span>
                  Bảo mật mã PIN khách mời riêng tư
                </li>
                <li className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary text-[18px]">check_circle</span>
                  Hộp thư chúc mừng xuất file PDF kỷ yếu
                </li>
                <li className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary text-[18px]">check_circle</span>
                  Ưu tiên hỗ trợ riêng 1-on-1 từ đội ngũ
                </li>
              </ul>
            </div>
            <button className="w-full py-space-sm rounded-full bg-surface-container-highest text-on-surface font-title-md hover:bg-primary hover:text-on-primary transition-all duration-200">
              Nâng cấp Pro Max
            </button>
          </div>
        </div>
      </section>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-space-lg">
        <section className="lg:col-span-2 bg-surface-container-lowest rounded-lg p-space-lg shadow-sm space-y-space-md">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-space-xs">
              <span className="material-symbols-outlined text-primary text-[24px]">mark_chat_read</span>
              <h3 className="font-headline-md text-headline-md text-on-surface font-semibold">Lời chúc &amp; Hoạt động gần đây</h3>
            </div>
            <a className="font-label-md text-label-md text-primary font-medium hover:underline" href="#">Xem tất cả 86 lời chúc</a>
          </div>
          <div className="space-y-space-sm">
            <div className="flex items-start gap-space-sm p-space-sm rounded-DEFAULT bg-surface-container-low/60 hover:bg-surface-container-low transition-colors">
              <div className="w-10 h-10 rounded-full bg-primary-fixed flex items-center justify-center shrink-0 font-title-md text-on-primary-fixed font-bold">
                TH
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <span className="font-title-md text-title-md text-on-surface font-semibold">Thanh Hằng &amp; Quốc Anh</span>
                  <span className="font-body-sm text-body-sm text-on-surface-variant">10 phút trước</span>
                </div>
                <p className="font-body-md text-body-md text-on-surface mt-1 leading-snug">
                  “Nhìn bộ ảnh Đà Lạt của hai bạn mê quá chừng! Chúc tình yêu của Long và Nhiên luôn bình yên và ấm áp như thế này nhé ♥”
                </p>
                <div className="flex items-center gap-space-sm mt-2 text-label-sm font-label-sm text-on-surface-variant">
                  <span>Gửi tại: <em>Mùa Hè Năm Ấy - Đà Lạt</em></span>
                  <span>•</span>
                  <span className="text-error font-medium">Sắp không thể truy cập nếu chưa gia hạn</span>
                </div>
              </div>
            </div>
            <div className="flex items-start gap-space-sm p-space-sm rounded-DEFAULT bg-surface-container-low/60 hover:bg-surface-container-low transition-colors">
              <div className="w-10 h-10 rounded-full bg-secondary-container flex items-center justify-center shrink-0 font-title-md text-on-secondary-container font-bold">
                MD
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <span className="font-title-md text-title-md text-on-surface font-semibold">Minh Đức (Hội bạn thân)</span>
                  <span className="font-body-sm text-body-sm text-on-surface-variant">2 giờ trước</span>
                </div>
                <p className="font-body-md text-body-md text-on-surface mt-1 leading-snug">
                  “Trang web thiết kế đẹp và lãng mạn quá đôi bạn ơi. Khi nào cưới nhớ làm một trang hoành tráng để hội anh em cùng vào quẩy nhé!”
                </p>
                <div className="flex items-center gap-space-sm mt-2 text-label-sm font-label-sm text-on-surface-variant">
                  <span>Gửi tại: <em>Bảo Long &amp; An Nhiên</em></span>
                  <span>•</span>
                  <span className="text-primary font-medium">Đã lưu trữ an toàn</span>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="bg-surface-container-lowest rounded-lg p-space-lg shadow-sm flex flex-col justify-between space-y-space-md">
          <div className="space-y-space-sm">
            <div className="w-12 h-12 rounded-full bg-surface-container flex items-center justify-center text-primary">
              <span className="material-symbols-outlined text-[26px]">support_agent</span>
            </div>
            <h3 className="font-headline-md text-headline-md text-on-surface font-semibold">Hỗ trợ riêng cho bạn</h3>
            <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
              Bạn cần trợ giúp cấu hình tên miền riêng, chuyển dữ liệu ảnh hoặc gặp khó khăn khi thanh toán nâng cấp? Chuyên viên CSKH CoupleStory sẵn sàng 24/7.
            </p>
            <div className="p-space-sm rounded-DEFAULT bg-surface-container-low flex items-center gap-space-sm mt-space-sm">
              <div className="w-3 h-3 rounded-full bg-primary-container animate-pulse" />
              <div className="text-body-sm font-body-sm">
                <span className="font-semibold text-on-surface">Khánh Linh (CSKH VIP)</span>
                <p className="text-on-surface-variant text-[12px]">Đang trực tuyến • Phản hồi trong 2 phút</p>
              </div>
            </div>
          </div>
          <div className="space-y-space-xs pt-space-sm">
            <a className="w-full py-space-sm rounded-full bg-surface-container-high hover:bg-surface-container text-on-surface font-title-md flex items-center justify-center gap-2 transition-colors" href="#">
              <span className="material-symbols-outlined text-[18px]">chat</span> Nhắn tin Zalo / Messenger
            </a>
            <a className="w-full py-space-sm rounded-full bg-surface-container-lowest hover:bg-surface-container-low text-on-surface-variant font-title-md flex items-center justify-center gap-2 transition-colors text-center text-label-md" href="tel:19008899">
              <span className="material-symbols-outlined text-[16px]">call</span> Hotline: 1900 8899 (Miễn cước)
            </a>
          </div>
        </section>
      </div>
    </div>
  </div>
</main>

    </>
  );
}
