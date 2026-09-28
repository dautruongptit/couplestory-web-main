import { Link } from 'react-router-dom';
import { usePlans } from '../hooks/usePlans';
import { formatPrice } from '../utils/formatPrice';

export default function CheckoutSuccess() {
  const { plans } = usePlans();
  const couple = plans.find(p => p.code === 'COUPLE');

  return (
    <div className="min-h-screen">
<div>
  <header className="fixed top-0 w-full z-50 bg-surface/85 backdrop-blur-xl shadow-[0_1px_8px_rgba(61,31,45,0.04)]"><div className="h-20 max-w-7xl mx-auto px-gutter flex items-center justify-between gap-space-md"><div className="flex items-center gap-space-md"><Link className="flex items-center gap-space-xs" data-path="checkout" to="/checkout"><span className="material-symbols-outlined text-primary text-[28px]">favorite</span><span className="font-headline-md text-headline-md text-primary tracking-tight">CoupleStory</span></Link><span className="hidden sm:inline-flex items-center gap-space-xs px-space-sm py-space-xs rounded-full bg-surface-container-high text-on-surface-variant font-label-sm text-label-sm"><span className="material-symbols-outlined text-primary text-[14px]">lock</span>Thanh toán bảo mật 256-bit SSL</span></div><nav className="hidden md:flex items-center gap-space-xs bg-surface-container-low p-space-xs rounded-full" data-active-classes="bg-primary text-on-primary rounded-full shadow-[0_2px_10px_rgba(185,10,90,0.2)]"><a className="px-space-md py-space-xs rounded-full text-on-surface-variant font-label-md text-label-md transition-colors hover:text-on-surface" data-path="cart-review" href="#">1. Đơn hàng</a><span className="material-symbols-outlined text-outline text-[16px]">chevron_right</span><Link className="px-space-md py-space-xs rounded-full text-on-surface-variant font-label-md text-label-md transition-colors hover:text-on-surface" data-path="checkout" to="/checkout">2. Thanh toán</Link><span className="material-symbols-outlined text-outline text-[16px]">chevron_right</span><a className="px-space-md py-space-xs rounded-full text-on-surface-variant font-label-md text-label-md transition-colors hover:text-on-surface" data-path="order-confirmation" href="#">3. Hoàn tất</a></nav><div className="flex items-center gap-space-sm"><div className="hidden sm:flex flex-col text-right"><span className="font-label-sm text-label-sm text-on-surface-variant">Hỗ trợ 24/7</span><span className="font-title-md text-title-md text-primary">cskh@couplestory.vn</span></div><div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center"><span className="material-symbols-outlined text-on-primary text-[18px]">person</span></div></div></div></header><main className="w-full pt-20 bg-surface min-h-[calc(100vh-140px)]"><div className="flex flex-col w-full">
      <div className="relative w-full max-w-7xl mx-auto px-gutter py-space-md overflow-hidden">
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[720px] h-[360px] bg-gradient-to-b from-primary/10 via-secondary-container/20 to-transparent blur-3xl pointer-events-none rounded-full" />
        <div className="absolute top-48 -right-24 w-80 h-80 bg-primary-fixed/20 blur-2xl pointer-events-none rounded-full" />
        <div className="absolute top-96 -left-20 w-72 h-72 bg-surface-container-highest/40 blur-2xl pointer-events-none rounded-full" />
        <div className="relative z-10 w-full mb-space-lg">
          <div className="bg-surface-container-lowest shadow-[0_4px_24px_rgba(61,31,45,0.04)] rounded-full px-space-md py-space-sm flex flex-wrap items-center justify-between gap-space-sm">
            <div className="flex items-center gap-space-md overflow-x-auto w-full md:w-auto py-space-xs">
              <div className="flex items-center gap-space-xs text-on-surface shrink-0">
                <span className="w-7 h-7 rounded-full bg-primary/15 text-primary flex items-center justify-center font-label-sm text-label-sm">
                  <span className="material-symbols-outlined text-[16px]" style={{fontVariationSettings: '"FILL" 1'}}>check</span>
                </span>
                <span className="font-label-md text-label-md font-medium text-on-surface">1. Chọn gói</span>
              </div>
              <span className="material-symbols-outlined text-outline-variant text-[18px] shrink-0">chevron_right</span>
              <div className="flex items-center gap-space-xs text-on-surface shrink-0">
                <span className="w-7 h-7 rounded-full bg-primary/15 text-primary flex items-center justify-center font-label-sm text-label-sm">
                  <span className="material-symbols-outlined text-[16px]" style={{fontVariationSettings: '"FILL" 1'}}>check</span>
                </span>
                <span className="font-label-md text-label-md font-medium text-on-surface">2. Thanh toán VietQR</span>
              </div>
              <span className="material-symbols-outlined text-outline-variant text-[18px] shrink-0">chevron_right</span>
              <div className="flex items-center gap-space-xs shrink-0">
                <span className="w-7 h-7 rounded-full bg-primary text-on-primary flex items-center justify-center shadow-[0_0_12px_rgba(185,10,90,0.45)]">
                  <span className="material-symbols-outlined text-[16px]">celebration</span>
                </span>
                <span className="font-label-md text-label-md font-bold text-primary">3. Kích hoạt &amp; Sẵn sàng</span>
              </div>
            </div>
            <div className="hidden lg:flex items-center gap-space-xs px-space-md py-1 bg-surface-container text-primary rounded-full">
              <span className="w-2 h-2 rounded-full bg-primary animate-ping" />
              <span className="font-label-sm text-label-sm font-semibold tracking-wide uppercase">Không gian đã trực tuyến</span>
            </div>
          </div>
        </div>
        <section className="relative z-10 text-center pt-space-xs pb-space-lg max-w-4xl mx-auto flex flex-col items-center">
          <div className="relative mb-space-sm">
            <div className="w-20 h-20 rounded-full bg-surface-container flex items-center justify-center shadow-[0_8px_30px_rgba(185,10,90,0.18)]">
              <div className="w-14 h-14 rounded-full bg-primary text-on-primary flex items-center justify-center shadow-inner">
                <span className="material-symbols-outlined text-[32px]" style={{fontVariationSettings: '"FILL" 1'}}>favorite</span>
              </div>
            </div>
            <span className="absolute -top-1 -right-3 text-primary animate-bounce">
              <span className="material-symbols-outlined text-[20px]" style={{fontVariationSettings: '"FILL" 1'}}>arrow_back_ios_new</span>
            </span>
            <span className="absolute -bottom-1 -left-3 text-tertiary">
              <span className="material-symbols-outlined text-[18px]" style={{fontVariationSettings: '"FILL" 1'}}>favorite</span>
            </span>
          </div>
          <div className="inline-flex items-center gap-space-xs px-space-md py-space-xs rounded-full bg-surface-container-high text-primary font-label-md text-label-md font-semibold mb-space-sm shadow-sm">
            <span className="material-symbols-outlined text-[16px]">verified</span>
            <span>Thanh toán thành công • Tài khoản đã kích hoạt 100%</span>
          </div>
          <h1 className="font-headline-xl text-headline-xl text-on-surface mb-space-sm tracking-tight leading-tight">
            Chúc mừng <span className="text-primary italic">Bảo Long &amp; An Nhiên!</span><br className="hidden sm:inline" />
            Ngôi nhà kỷ niệm của hai bạn đã chính thức khởi tạo.
          </h1>
          <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl leading-relaxed">
            Gói cước <strong className="text-on-surface font-semibold">Couple Vĩnh Viễn</strong> đã hoàn tất cấu hình. Hóa đơn điện tử <span className="font-semibold text-primary">#CS-VN-88329</span> cùng biên lai VietQR đã được gửi tức thời đến hòm thư của cả hai bạn.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-space-xs mt-space-sm">
            <span className="inline-flex items-center gap-1.5 px-space-sm py-1 rounded-full bg-surface-container-low text-on-surface-variant font-label-sm text-label-sm">
              <span className="material-symbols-outlined text-[14px] text-primary">mail</span>
              baolong@couplestory.site
            </span>
            <span className="text-outline-variant">•</span>
            <span className="inline-flex items-center gap-1.5 px-space-sm py-1 rounded-full bg-surface-container-low text-on-surface-variant font-label-sm text-label-sm">
              <span className="material-symbols-outlined text-[14px] text-primary">mail</span>
              annhien.design@gmail.com
            </span>
          </div>
        </section>
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-gutter mt-space-sm mb-space-xl">
          <div className="lg:col-span-7 flex flex-col gap-space-lg">
            <div className="bg-surface-container-lowest rounded-lg p-space-lg shadow-[0_4px_24px_rgba(61,31,45,0.05)] relative overflow-hidden">
              <div className="flex items-center justify-between pb-space-sm border-b border-surface-container">
                <div className="flex items-center gap-space-xs">
                  <span className="w-3 h-3 rounded-full bg-primary" />
                  <span className="font-title-md text-title-md text-on-surface">Không gian tình yêu trực tuyến của hai bạn</span>
                </div>
                <span className="px-space-sm py-0.5 rounded-full bg-surface-container font-label-sm text-label-sm text-primary font-bold uppercase tracking-wider">
                  Trạng thái: Hoạt động
                </span>
              </div>
              <div className="mt-space-md p-space-md rounded-DEFAULT bg-surface-container-low flex flex-col sm:flex-row items-center justify-between gap-space-md">
                <div className="flex items-center gap-space-sm min-w-0 w-full sm:w-auto">
                  <div className="w-10 h-10 rounded-full bg-surface-container-lowest flex items-center justify-center shrink-0 text-primary">
                    <span className="material-symbols-outlined text-[22px]">public</span>
                  </div>
                  <div className="min-w-0">
                    <div className="font-label-sm text-label-sm text-on-surface-variant flex items-center gap-1">
                      <span>Địa chỉ miền đôi (Subdomain)</span>
                      <span className="material-symbols-outlined text-[14px] text-primary">lock</span>
                      <span className="text-primary font-medium">Bảo mật SSL 256-bit</span>
                    </div>
                    <div className="font-title-md text-title-md text-primary font-semibold truncate tracking-tight" id="domain-url-text">
                      https://baolong-annhien.couplestory.site
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-space-xs w-full sm:w-auto justify-end shrink-0">
                  <button className="px-space-md py-space-xs rounded-full bg-surface-container-lowest hover:bg-surface-container text-on-surface font-label-md text-label-md flex items-center gap-1 shadow-sm transition-all duration-200" id="copy-btn" onClick={() => {}}>
                    <span className="material-symbols-outlined text-[16px] text-primary" id="copy-icon">content_copy</span>
                    <span id="copy-label">Sao chép</span>
                  </button>
                  <a className="px-space-md py-space-xs rounded-full bg-primary hover:bg-primary/90 text-on-primary font-label-md text-label-md flex items-center gap-1 shadow-sm transition-all duration-200" href="#" target="_blank">
                    <span>Truy cập</span>
                    <span className="material-symbols-outlined text-[16px]">open_in_new</span>
                  </a>
                </div>
              </div>
              <div className="mt-space-md grid grid-cols-1 sm:grid-cols-2 gap-space-md">
                <div className="p-space-md rounded-DEFAULT bg-surface-container-lowest flex items-center gap-space-sm shadow-[0_2px_12px_rgba(61,31,45,0.03)]">
                  <div className="flex -space-x-3 shrink-0">
                    <div className="w-12 h-12 rounded-full overflow-hidden shadow-sm bg-surface-container flex items-center justify-center text-primary font-bold font-title-md">
                      BL
                    </div>
                    <div className="w-12 h-12 rounded-full overflow-hidden shadow-sm bg-secondary-container flex items-center justify-center text-secondary font-bold font-title-md">
                      AN
                    </div>
                  </div>
                  <div className="min-w-0">
                    <p className="font-title-md text-title-md text-on-surface truncate">Bảo Long &amp; An Nhiên</p>
                    <div className="flex items-center gap-1 font-body-sm text-body-sm text-on-surface-variant">
                      <span className="w-2 h-2 rounded-full bg-primary" />
                      <span>Đồng quản lý P2P đã kết nối</span>
                    </div>
                  </div>
                </div>
                <div className="p-space-md rounded-DEFAULT bg-surface-container-lowest flex items-center justify-between gap-space-sm shadow-[0_2px_12px_rgba(61,31,45,0.03)]">
                  <div>
                    <div className="font-label-sm text-label-sm text-on-surface-variant">Mã PIN Kỷ Niệm (Mặc định)</div>
                    <div className="font-title-md text-title-md font-bold text-on-surface tracking-widest mt-0.5">0412</div>
                    <span className="font-body-sm text-body-sm text-primary">Chế độ riêng tư: Đang bật</span>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-surface-container flex items-center justify-center text-primary">
                    <span className="material-symbols-outlined text-[20px]">key</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-surface-container-lowest rounded-lg p-space-lg shadow-[0_4px_24px_rgba(61,31,45,0.05)]">
              <div className="flex items-center justify-between mb-space-md">
                <div>
                  <h2 className="font-title-lg text-title-lg text-on-surface">3 Bước bắt đầu lưu giữ kỷ niệm</h2>
                  <p className="font-body-sm text-body-sm text-on-surface-variant">Các thao tác gợi ý hàng đầu để hai bạn tùy biến trang chủ CoupleStory trong hôm nay</p>
                </div>
                <span className="hidden sm:inline-flex px-space-sm py-1 rounded-full bg-surface-container-high text-primary font-label-sm text-label-sm font-semibold">
                  Khởi đầu nhanh
                </span>
              </div>
              <div className="space-y-space-md">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-space-md rounded-DEFAULT bg-surface-container-low/60 hover:bg-surface-container-low transition-colors duration-200 gap-space-md">
                  <div className="flex items-start gap-space-md">
                    <div className="w-10 h-10 rounded-full bg-primary text-on-primary flex items-center justify-center font-bold font-title-md shrink-0 shadow-sm">
                      1
                    </div>
                    <div>
                      <div className="font-title-md text-title-md text-on-surface">Khám phá &amp; Chọn Mẫu Giao Diện</div>
                      <p className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">
                        Thử nghiệm template "Minimal Couple" thanh lịch hoặc "Eternal Love" với hiệu ứng timeline cuộn tuyết rơi.
                      </p>
                    </div>
                  </div>
                  <button className="shrink-0 w-full sm:w-auto px-space-md py-space-xs rounded-full bg-surface-container-lowest hover:bg-surface-container text-primary font-label-md text-label-md font-semibold shadow-sm transition-all duration-200 flex items-center justify-center gap-1">
                    <span>Vào Kho Giao Diện</span>
                    <span className="material-symbols-outlined text-[16px]">palette</span>
                  </button>
                </div>
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-space-md rounded-DEFAULT bg-surface-container-low/60 hover:bg-surface-container-low transition-colors duration-200 gap-space-md">
                  <div className="flex items-start gap-space-md">
                    <div className="w-10 h-10 rounded-full bg-secondary text-on-secondary flex items-center justify-center font-bold font-title-md shrink-0 shadow-sm">
                      2
                    </div>
                    <div>
                      <div className="font-title-md text-title-md text-on-surface">Mời An Nhiên gõ phím viết nhật ký chung</div>
                      <p className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">
                        Hệ thống đã gửi lời mời tự động qua email. Bạn có thể sao chép nhanh link mời đặc quyền quản trị viên.
                      </p>
                    </div>
                  </div>
                  <button className="shrink-0 w-full sm:w-auto px-space-md py-space-xs rounded-full bg-surface-container-lowest hover:bg-surface-container text-primary font-label-md text-label-md font-semibold shadow-sm transition-all duration-200 flex items-center justify-center gap-1" onClick={() => {}}>
                    <span>Gửi lời mời đồng quản trị</span>
                    <span className="material-symbols-outlined text-[16px]">send</span>
                  </button>
                </div>
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-space-md rounded-DEFAULT bg-surface-container-low/60 hover:bg-surface-container-low transition-colors duration-200 gap-space-md">
                  <div className="flex items-start gap-space-md">
                    <div className="w-10 h-10 rounded-full bg-tertiary text-on-tertiary flex items-center justify-center font-bold font-title-md shrink-0 shadow-sm">
                      3
                    </div>
                    <div>
                      <div className="font-title-md text-title-md text-on-surface">Tải trọn bộ QR Thiệp Cưới &amp; Kỷ Niệm 300 DPI</div>
                      <p className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">
                        Bộ vector QR cá nhân hóa in ấn trên thiệp mừng, album photobook hoặc khung ảnh kỷ niệm đặt tại bàn cưới.
                      </p>
                    </div>
                  </div>
                  <button className="shrink-0 w-full sm:w-auto px-space-md py-space-xs rounded-full bg-surface-container-lowest hover:bg-surface-container text-primary font-label-md text-label-md font-semibold shadow-sm transition-all duration-200 flex items-center justify-center gap-1">
                    <span>Tải trọn bộ QR (.ZIP)</span>
                    <span className="material-symbols-outlined text-[16px]">qr_code</span>
                  </button>
                </div>
              </div>
            </div>
            <div className="bg-surface-container-low rounded-lg p-space-md flex flex-col sm:flex-row items-center justify-between gap-space-md">
              <div className="flex items-center gap-space-md">
                <div className="w-11 h-11 rounded-full bg-surface-container-lowest text-primary flex items-center justify-center shadow-sm shrink-0">
                  <span className="material-symbols-outlined text-[24px]">receipt_long</span>
                </div>
                <div>
                  <div className="font-title-md text-title-md text-on-surface font-semibold">Hóa đơn điện tử VAT #CS-VN-88329</div>
                  <div className="font-body-sm text-body-sm text-on-surface-variant">MB Bank VietQR • {formatPrice(couple?.price ?? 69000)} • Vừa xong</div>
                </div>
              </div>
              <button className="shrink-0 w-full sm:w-auto px-space-md py-space-xs rounded-full bg-surface-container-lowest hover:bg-surface-container text-on-surface font-label-md text-label-md flex items-center justify-center gap-1.5 shadow-sm transition-colors duration-200">
                <span className="material-symbols-outlined text-[16px] text-primary">download</span>
                <span>Tải hóa đơn (PDF)</span>
              </button>
            </div>
          </div>
          <div className="lg:col-span-5 flex flex-col gap-space-lg">
            <div className="bg-surface-container-lowest rounded-lg p-space-lg shadow-[0_4px_24px_rgba(61,31,45,0.05)] relative">
              <div className="flex items-center justify-between gap-space-sm mb-space-md">
                <div>
                  <span className="font-label-sm text-label-sm uppercase tracking-wider text-primary font-bold">Gói dịch vụ kích hoạt</span>
                  <h3 className="font-headline-md text-headline-md text-on-surface">Gói COUPLE</h3>
                </div>
                <div className="text-right">
                  <span className="inline-block px-space-sm py-1 rounded-full bg-surface-container text-primary font-label-sm text-label-sm font-bold">
                    Trọn đời
                  </span>
                  <div className="font-title-lg text-title-lg text-primary font-extrabold mt-1">{formatPrice(couple?.price ?? 69000)}</div>
                </div>
              </div>
              <div className="p-space-md rounded-DEFAULT bg-surface-container-low mb-space-md">
                <div className="font-title-md text-title-md text-on-surface font-semibold mb-space-sm flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-primary text-[20px]">stars</span>
                  <span>Đặc quyền sở hữu của hai bạn:</span>
                </div>
                <ul className="space-y-space-sm font-body-sm text-body-sm text-on-surface">
                  <li className="flex items-start gap-space-xs">
                    <span className="material-symbols-outlined text-primary text-[18px] shrink-0" style={{fontVariationSettings: '"FILL" 1'}}>check_circle</span>
                    <span><strong className="font-medium">Quyền sở hữu trọn đời</strong> (Không phí gia hạn hàng năm)</span>
                  </li>
                  <li className="flex items-start gap-space-xs">
                    <span className="material-symbols-outlined text-primary text-[18px] shrink-0" style={{fontVariationSettings: '"FILL" 1'}}>check_circle</span>
                    <span><strong className="font-medium">2 Tài khoản đồng tác giả</strong> đồng bộ ảnh &amp; chữ ký thời gian thực</span>
                  </li>
                  <li className="flex items-start gap-space-xs">
                    <span className="material-symbols-outlined text-primary text-[18px] shrink-0" style={{fontVariationSettings: '"FILL" 1'}}>check_circle</span>
                    <span><strong className="font-medium">10+ Mẫu giao diện Public Story</strong> độc quyền dành cho lễ cưới &amp; nhật ký</span>
                  </li>
                  <li className="flex items-start gap-space-xs">
                    <span className="material-symbols-outlined text-primary text-[18px] shrink-0" style={{fontVariationSettings: '"FILL" 1'}}>check_circle</span>
                    <span><strong className="font-medium">Kho lưu trữ 500 ảnh HD + Video 4K</strong> máy chủ CDN tốc độ cao</span>
                  </li>
                  <li className="flex items-start gap-space-xs">
                    <span className="material-symbols-outlined text-primary text-[18px] shrink-0" style={{fontVariationSettings: '"FILL" 1'}}>check_circle</span>
                    <span><strong className="font-medium">Hộp thư tình bí mật tương lai</strong> hẹn giờ mở khóa vào các dịp kỷ niệm</span>
                  </li>
                  <li className="flex items-start gap-space-xs">
                    <span className="material-symbols-outlined text-primary text-[18px] shrink-0" style={{fontVariationSettings: '"FILL" 1'}}>check_circle</span>
                    <span><strong className="font-medium">Miễn phí tên miền phụ</strong> (Hỗ trợ trỏ tên miền .com riêng bất kỳ lúc nào)</span>
                  </li>
                </ul>
              </div>
              <div className="flex flex-col gap-space-sm">
                <a className="w-full py-3.5 px-space-lg rounded-full bg-primary hover:bg-primary/95 text-on-primary font-title-md text-title-md font-semibold text-center shadow-[0_4px_16px_rgba(185,10,90,0.3)] transition-transform duration-200 hover:scale-[1.01] flex items-center justify-center gap-space-xs" href="#">
                  <span>Bắt đầu Chỉnh Sửa Story Ngay</span>
                  <span className="text-[18px]">✍️</span>
                </a>
                <a className="w-full py-3 px-space-lg rounded-full bg-surface-container-lowest hover:bg-surface-container text-on-surface font-title-md text-title-md font-medium text-center shadow-sm transition-colors duration-200 flex items-center justify-center gap-space-xs" href="#">
                  <span className="material-symbols-outlined text-[18px] text-on-surface-variant">dashboard</span>
                  <span>Về Trang Dashboard Quản Lý</span>
                </a>
              </div>
            </div>
            <div className="bg-surface-container-low rounded-lg p-space-md">
              <div className="flex items-center gap-space-sm mb-space-sm">
                <div className="w-10 h-10 rounded-full bg-primary text-on-primary flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-[20px]">support_agent</span>
                </div>
                <div>
                  <h4 className="font-title-md text-title-md text-on-surface">Chuyên viên Hạnh phúc 24/7</h4>
                  <p className="font-body-sm text-body-sm text-on-surface-variant">Luôn sẵn sàng hỗ trợ Bảo Long &amp; An Nhiên</p>
                </div>
              </div>
              <p className="font-body-sm text-body-sm text-on-surface-variant mb-space-md">
                Cần hỗ trợ gắn nhạc nền yêu thích vào website hoặc căn chỉnh photobook? Đội ngũ thiết kế sẽ hỗ trợ hoàn toàn miễn phí.
              </p>
              <div className="grid grid-cols-2 gap-space-xs">
                <a className="py-space-xs px-space-sm rounded-full bg-surface-container-lowest hover:bg-surface-container text-primary font-label-md text-label-md font-semibold flex items-center justify-center gap-1 transition-colors" href="https://zalo.me" target="_blank">
                  <span className="material-symbols-outlined text-[16px]">chat</span>
                  <span>Chat Zalo VIP</span>
                </a>
                <a className="py-space-xs px-space-sm rounded-full bg-surface-container-lowest hover:bg-surface-container text-on-surface font-label-md text-label-md font-semibold flex items-center justify-center gap-1 transition-colors" href="tel:1900888999">
                  <span className="material-symbols-outlined text-[16px]">call</span>
                  <span>Hotline Cặp Đôi</span>
                </a>
              </div>
            </div>
            <div className="relative rounded-lg overflow-hidden h-44 shadow-[0_4px_20px_rgba(61,31,45,0.06)] bg-surface-container-lowest">
              <div className="w-full h-full bg-cover bg-center" data-alt="Warm editorial photo of an Asian couple holding hands with wedding rings on a sunny morning in a botanical garden, soft rose-toned romantic light, cinematic high contrast." style={{backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuCOTMABsWUqQn8RKi773gH1522S1pJh40U1gw8lEiikQ40DjhaTAOe2fRCLWzNo7wWlyxI85-7pvyhOhFe9O6D7y79B4xO00HiCnzSxFshtkkM19SZFv8hqye2nanyQxUjaFU21x4cT_NpD2SgnivKtTv2vaTKJ3_Nzxyyo8ZrSoi0JxQkz-8f2JlvWeZqy88PLiMU3rAJmUhVNLLVxhk3Stio9uZNbybwHJPp1DiQ04e_YECtJbubY")'}}>
                <div className="absolute inset-0 bg-gradient-to-t from-inverse-surface/80 via-inverse-surface/20 to-transparent flex flex-col justify-end p-space-md text-inverse-on-surface">
                  <span className="font-label-sm text-label-sm uppercase tracking-widest text-primary-fixed">Bảo Long • An Nhiên</span>
                  <p className="font-headline-md text-headline-md italic font-light">"Nơi từng khoảnh khắc trở thành vĩnh cửu."</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="relative z-10 w-full pt-space-md pb-space-sm border-t border-surface-container flex flex-col sm:flex-row items-center justify-between gap-space-md text-on-surface-variant font-body-sm text-body-sm">
          <div className="flex items-center gap-space-xs text-center sm:text-left">
            <span className="material-symbols-outlined text-primary text-[20px]">handshake</span>
            <span><strong>Cam kết CoupleStory:</strong> Đồng hành cùng tình yêu của hai bạn suốt chặng đường dài. Đổi gói &amp; hỗ trợ kỹ thuật trọn đời.</span>
          </div>
          <div className="flex items-center gap-space-md text-on-surface font-medium shrink-0">
            <span className="flex items-center gap-1">
              <span className="material-symbols-outlined text-primary text-[16px]">encrypted</span>
              Mã hóa 256-Bit
            </span>
            <span className="flex items-center gap-1">
              <span className="material-symbols-outlined text-primary text-[16px]">cloud_done</span>
              Đã sao lưu đám mây
            </span>
          </div>
        </div>
      </div>
    </div>
  </main><footer className="w-full bg-surface-container-low py-space-xl shadow-[0_-1px_12px_rgba(61,31,45,0.03)]"><div className="max-w-7xl mx-auto px-gutter flex flex-col md:flex-row items-center justify-between gap-space-lg"><div className="flex flex-col items-center md:items-start gap-space-xs text-center md:text-left"><div className="flex items-center gap-space-xs text-on-surface"><span className="material-symbols-outlined text-primary text-[20px]">verified_user</span><span className="font-title-md text-title-md">Chứng thực bảo mật giao dịch</span></div><p className="font-body-sm text-body-sm text-on-surface-variant">Toàn bộ dữ liệu thanh toán và kỷ niệm đôi lứa của bạn được mã hóa an toàn.</p></div><div className="flex flex-wrap items-center justify-center gap-space-sm"><div className="flex items-center gap-space-xs bg-surface-container-lowest px-space-md py-space-sm rounded-full shadow-[0_2px_8px_rgba(61,31,45,0.04)]"><span className="material-symbols-outlined text-primary text-[18px]">qr_code_2</span><span className="font-label-md text-label-md text-on-surface">VietQR</span></div><div className="flex items-center gap-space-xs bg-surface-container-lowest px-space-md py-space-sm rounded-full shadow-[0_2px_8px_rgba(61,31,45,0.04)]"><span className="material-symbols-outlined text-primary text-[18px]">account_balance_wallet</span><span className="font-label-md text-label-md text-on-surface">MoMo</span></div><div className="flex items-center gap-space-xs bg-surface-container-lowest px-space-md py-space-sm rounded-full shadow-[0_2px_8px_rgba(61,31,45,0.04)]"><span className="material-symbols-outlined text-primary text-[18px]">credit_card</span><span className="font-label-md text-label-md text-on-surface">Visa / Mastercard</span></div><div className="flex items-center gap-space-xs bg-surface-container-lowest px-space-md py-space-sm rounded-full shadow-[0_2px_8px_rgba(61,31,45,0.04)]"><span className="material-symbols-outlined text-primary text-[18px]">shield</span><span className="font-label-md text-label-md text-on-surface">PCI DSS</span></div></div></div><div className="max-w-7xl mx-auto px-gutter mt-space-lg pt-space-md border-t border-surface-container text-center"><p className="font-body-sm text-body-sm text-on-surface-variant">© 2025 CoupleStory Inc. Lưu giữ từng nhịp đập yêu thương. Mọi giao dịch đều được bảo hộ pháp lý.</p></div></footer>
</div>

    </div>
  );
}
