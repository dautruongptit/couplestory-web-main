import { Link } from 'react-router-dom';
import { usePlans } from '../hooks/usePlans';
import { formatPrice } from '../utils/formatPrice';

export default function Checkout() {
  const { plans } = usePlans();
  const couple = plans.find(p => p.code === 'COUPLE');
  const proMax = plans.find(p => p.code === 'PREMIUM');

  return (
    <div className="min-h-screen">
<div>
  <header className="fixed top-0 w-full z-50 bg-surface/85 backdrop-blur-xl shadow-[0_1px_8px_rgba(61,31,45,0.04)]"><div className="h-20 max-w-7xl mx-auto px-gutter flex items-center justify-between gap-space-md"><div className="flex items-center gap-space-md"><Link className="flex items-center gap-space-xs" data-path="checkout" to="/checkout"><span className="material-symbols-outlined text-primary text-[28px]">favorite</span><span className="font-headline-md text-headline-md text-primary tracking-tight">CoupleStory</span></Link><span className="hidden sm:inline-flex items-center gap-space-xs px-space-sm py-space-xs rounded-full bg-surface-container-high text-on-surface-variant font-label-sm text-label-sm"><span className="material-symbols-outlined text-primary text-[14px]">lock</span>Thanh toán bảo mật 256-bit SSL</span></div><nav className="hidden md:flex items-center gap-space-xs bg-surface-container-low p-space-xs rounded-full" data-active-classes="bg-primary text-on-primary rounded-full shadow-[0_2px_10px_rgba(185,10,90,0.2)]"><a className="px-space-md py-space-xs rounded-full text-on-surface-variant font-label-md text-label-md transition-colors hover:text-on-surface" data-path="cart-review" href="#">1. Đơn hàng</a><span className="material-symbols-outlined text-outline text-[16px]">chevron_right</span><Link aria-current="page" className="px-space-md py-space-xs font-label-md transition-colors bg-primary text-on-primary rounded-full shadow-[0_2px_10px_rgba(185,10,90,0.2)]" data-path="checkout" to="/checkout">2. Thanh toán</Link><span className="material-symbols-outlined text-outline text-[16px]">chevron_right</span><a className="px-space-md py-space-xs rounded-full text-on-surface-variant font-label-md text-label-md transition-colors hover:text-on-surface" data-path="order-confirmation" href="#">3. Hoàn tất</a></nav><div className="flex items-center gap-space-sm"><div className="hidden sm:flex flex-col text-right"><span className="font-label-sm text-label-sm text-on-surface-variant">Hỗ trợ 24/7</span><span className="font-title-md text-title-md text-primary">cskh@couplestory.vn</span></div><div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center"><span className="material-symbols-outlined text-on-primary text-[18px]">person</span></div></div></div></header><main className="w-full pt-20 bg-surface min-h-[calc(100vh-140px)]"><div className="flex flex-col w-full">
      <div className="relative w-full overflow-hidden">
        <div className="absolute -top-36 -left-36 w-96 h-96 rounded-full bg-primary-fixed blur-3xl opacity-50 pointer-events-none" />
        <div className="absolute top-1/3 -right-28 w-80 h-80 rounded-full bg-secondary-container blur-3xl opacity-40 pointer-events-none" />
        <div className="max-w-7xl mx-auto px-gutter py-space-md sm:py-space-lg flex flex-col gap-space-lg">
          <section className="flex flex-col items-center gap-space-md text-center">
            <div className="inline-flex flex-wrap items-center justify-center gap-space-xs px-space-md py-1.5 rounded-full bg-surface-container-high shadow-sm text-on-surface-variant font-label-sm text-label-sm">
              <span className="inline-flex items-center gap-1 text-primary font-semibold">
                <span className="material-symbols-outlined text-[15px]" style={{fontVariationSettings: '"FILL" 1'}}>verified</span>
                Mã hóa SSL 256-bit
              </span>
              <span className="opacity-40">•</span>
              <span className="inline-flex items-center gap-1">
                <span className="material-symbols-outlined text-primary text-[15px]">bolt</span>
                Kích hoạt tức thì trong 30 giây
              </span>
              <span className="opacity-40">•</span>
              <span className="inline-flex items-center gap-1">
                <span className="material-symbols-outlined text-primary text-[15px]">published_with_changes</span>
                Đổi gói &amp; hoàn tiền 7 ngày
              </span>
            </div>
            <div className="w-full max-w-2xl mt-1">
              <div className="grid grid-cols-3 gap-2 relative">
                <div className="flex flex-col items-center gap-1 group">
                  <div className="w-9 h-9 rounded-full bg-surface-container-high text-primary flex items-center justify-center shadow-sm">
                    <span className="material-symbols-outlined text-[18px]" style={{fontVariationSettings: '"FILL" 1'}}>check</span>
                  </div>
                  <span className="font-label-sm text-label-sm text-on-surface-variant font-medium">1. Chọn gói</span>
                  <span className="text-[11px] text-primary font-semibold">Đã hoàn thành</span>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <div className="w-9 h-9 rounded-full bg-primary text-on-primary flex items-center justify-center shadow-[0_4px_16px_rgba(185,10,90,0.35)] ring-4 ring-primary-fixed">
                    <span className="material-symbols-outlined text-[18px]">credit_card</span>
                  </div>
                  <span className="font-title-md text-title-md text-primary font-bold">2. Thanh toán</span>
                  <span className="text-[11px] text-primary font-medium flex items-center gap-0.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary animate-ping inline-block" />
                    Đang kích hoạt
                  </span>
                </div>
                <div className="flex flex-col items-center gap-1 opacity-70">
                  <div className="w-9 h-9 rounded-full bg-surface-container text-on-surface-variant flex items-center justify-center">
                    <span className="material-symbols-outlined text-[18px]">auto_stories</span>
                  </div>
                  <span className="font-label-sm text-label-sm text-on-surface-variant">3. Biên tập Story</span>
                  <span className="text-[11px] text-on-surface-variant">Sẵn sàng ngay</span>
                </div>
              </div>
            </div>
            <div className="max-w-3xl flex flex-col items-center gap-space-xs mt-2">
              <h1 className="font-headline-lg text-headline-lg text-on-surface leading-tight text-balance">
                Hoàn tất thanh toán để mở khóa không gian kỷ niệm <span className="italic text-primary">vĩnh cửu</span>
              </h1>
              <p className="font-body-md text-body-md text-on-surface-variant max-w-2xl">
                Chỉ một bước duy nhất để <span className="font-semibold text-primary">Bảo Long &amp; An Nhiên</span> cùng sở hữu ngôi nhà tình yêu trực tuyến vĩnh viễn với tên miền riêng và chứng chỉ lưu giữ trọn đời.
              </p>
            </div>
          </section>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-lg items-start">
            <div className="lg:col-span-7 flex flex-col gap-space-md">
              <div className="bg-surface-container-lowest rounded-lg p-space-md sm:p-space-lg shadow-[0_4px_24px_rgba(61,31,45,0.06)] flex flex-col gap-space-md">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-space-xs">
                    <span className="material-symbols-outlined text-primary text-[22px]" style={{fontVariationSettings: '"FILL" 1'}}>payments</span>
                    <h2 className="font-title-lg text-title-lg text-on-surface font-semibold">Chọn phương thức thanh toán</h2>
                  </div>
                  <span className="px-space-sm py-1 rounded-full bg-surface-container-high text-primary font-label-sm text-label-sm">
                    Xử lý mã hóa tự động
                  </span>
                </div>
                <div className="flex flex-col gap-space-sm" id="payment-methods-accordion">
                  <div className="rounded-DEFAULT bg-surface-container-low transition-all duration-200 overflow-hidden" id="method-card-vietqr">
                    <button className="w-full text-left p-space-md flex items-center justify-between gap-space-sm hover:bg-surface-container transition-colors" onClick={() => {}} type="button">
                      <div className="flex items-center gap-space-sm">
                        <span className="w-5 h-5 rounded-full bg-primary flex items-center justify-center text-on-primary">
                          <span className="w-2 h-2 rounded-full bg-white" />
                        </span>
                        <div className="flex flex-col">
                          <div className="flex items-center gap-space-xs">
                            <span className="font-title-md text-title-md text-on-surface font-bold">Chuyển khoản VietQR Pro 24/7</span>
                            <span className="px-2 py-0.5 rounded-full bg-primary text-on-primary text-[10px] font-semibold tracking-wide uppercase">Khuyên dùng</span>
                          </div>
                          <span className="font-body-sm text-body-sm text-on-surface-variant">Quét qua bất kỳ app ngân hàng nào • Kích hoạt sau 3 giây</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-1.5 shrink-0">
                        <div className="px-2 py-1 bg-surface-container-lowest rounded-md text-[11px] font-bold text-primary">VietQR</div>
                        <div className="px-2 py-1 bg-surface-container-lowest rounded-md text-[11px] font-bold text-on-surface-variant">MBBank</div>
                      </div>
                    </button>
                    <div className="px-space-md pb-space-md pt-space-xs flex flex-col gap-space-md" id="panel-vietqr">
                      <div className="flex items-center justify-between bg-surface-container-highest px-space-md py-space-xs rounded-full">
                        <div className="flex items-center gap-space-xs text-primary font-title-md text-title-md">
                          <span className="material-symbols-outlined text-[18px] animate-pulse">timer</span>
                          <span className="font-medium text-body-sm text-on-surface">Giữ phiên ưu đãi:</span>
                          <span className="font-bold text-primary tracking-wider" id="qr-countdown">12:22</span>
                        </div>
                        <span className="font-label-sm text-label-sm text-on-surface-variant">Trạng thái: Đang chờ quét</span>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-12 gap-space-md items-center bg-surface-container-lowest p-space-md rounded-DEFAULT shadow-sm">
                        <div className="sm:col-span-5 flex flex-col items-center justify-center gap-space-xs text-center">
                          <div className="relative p-2.5 bg-white rounded-lg shadow-sm group">
                            <svg className="w-44 h-44 text-on-surface" fill="currentColor" viewBox="0 0 160 160">
                              <rect fill="#b90a5a" height={40} rx={6} width={40} x={10} y={10} />
                              <rect fill="#ffffff" height={24} rx={3} width={24} x={18} y={18} />
                              <rect fill="#b90a5a" height={12} rx={2} width={12} x={24} y={24} />
                              <rect fill="#b90a5a" height={40} rx={6} width={40} x={110} y={10} />
                              <rect fill="#ffffff" height={24} rx={3} width={24} x={118} y={18} />
                              <rect fill="#b90a5a" height={12} rx={2} width={12} x={124} y={24} />
                              <rect fill="#b90a5a" height={40} rx={6} width={40} x={10} y={110} />
                              <rect fill="#ffffff" height={24} rx={3} width={24} x={18} y={118} />
                              <rect fill="#b90a5a" height={12} rx={2} width={12} x={24} y={124} />
                              <rect height={8} rx="1.5" width={8} x={58} y={12} />
                              <rect height={8} rx="1.5" width={16} x={70} y={12} />
                              <rect height={8} rx="1.5" width={8} x={90} y={12} />
                              <rect height={8} rx="1.5" width={20} x={58} y={24} />
                              <rect height={8} rx="1.5" width={14} x={84} y={24} />
                              <rect height={8} rx="1.5" width={10} x={58} y={36} />
                              <rect height={8} rx="1.5" width={24} x={74} y={36} />
                              <rect height={8} rx="1.5" width={14} x={12} y={58} />
                              <rect height={8} rx="1.5" width={18} x={32} y={58} />
                              <rect height={8} rx="1.5" width={26} x={12} y={72} />
                              <rect height={8} rx="1.5" width={16} x={12} y={86} />
                              <rect height={8} rx="1.5" width={16} x={34} y={86} />
                              <rect height={8} rx="1.5" width={16} x={112} y={58} />
                              <rect height={8} rx="1.5" width={14} x={134} y={58} />
                              <rect height={8} rx="1.5" width={28} x={112} y={72} />
                              <rect height={8} rx="1.5" width={12} x={112} y={86} />
                              <rect height={8} rx="1.5" width={18} x={130} y={86} />
                              <rect height={8} rx="1.5" width={24} x={58} y={112} />
                              <rect height={8} rx="1.5" width={10} x={88} y={112} />
                              <rect height={8} rx="1.5" width={14} x={104} y={112} />
                              <rect height={8} rx="1.5" width={24} x={124} y={112} />
                              <rect height={8} rx="1.5" width={14} x={58} y={126} />
                              <rect height={8} rx="1.5" width={20} x={78} y={126} />
                              <rect height={8} rx="1.5" width={12} x={104} y={126} />
                              <rect height={8} rx="1.5" width={26} x={122} y={126} />
                              <rect height={8} rx="1.5" width={30} x={58} y={140} />
                              <rect height={8} rx="1.5" width={14} x={94} y={140} />
                              <rect height={8} rx="1.5" width={34} x={114} y={140} />
                            </svg>
                            <div className="absolute inset-0 m-auto w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center">
                              <span className="material-symbols-outlined text-primary text-[20px]" style={{fontVariationSettings: '"FILL" 1'}}>favorite</span>
                            </div>
                          </div>
                          <div className="flex items-center gap-1 text-[11px] text-on-surface-variant font-medium">
                            <span className="w-2 h-2 rounded-full bg-primary animate-ping" />
                            Mã động cập nhật tự động
                          </div>
                        </div>
                        <div className="sm:col-span-7 flex flex-col gap-space-xs">
                          <div className="flex items-center justify-between p-space-xs px-space-sm bg-surface-container-low rounded-md">
                            <div>
                              <span className="text-[11px] text-on-surface-variant block">Số tiền chính xác</span>
                              <span className="font-headline-md text-headline-md text-primary font-bold">{formatPrice(couple?.price ?? 69000)}</span>
                            </div>
                            <button className="px-space-sm py-1 rounded-full bg-surface-container-highest text-primary font-label-sm text-label-sm flex items-center gap-1 hover:bg-primary hover:text-on-primary transition-all" onClick={() => {}} type="button">
                              <span className="material-symbols-outlined text-[14px]">content_copy</span>
                              Sao chép
                            </button>
                          </div>
                          <div className="flex items-center justify-between p-space-xs px-space-sm bg-surface-container rounded-md">
                            <div className="min-w-0 pr-2">
                              <span className="text-[11px] text-primary font-semibold block">Nội dung chuyển khoản (Bắt buộc)</span>
                              <span className="font-title-md text-title-md text-on-surface font-mono font-bold tracking-tight truncate block">COUPLESTORY BAOLONG 69K</span>
                            </div>
                            <button className="px-space-sm py-1 rounded-full bg-primary text-on-primary font-label-sm text-label-sm flex items-center gap-1 hover:opacity-90 transition-all shrink-0" onClick={() => {}} type="button">
                              <span className="material-symbols-outlined text-[14px]">content_copy</span>
                              Sao chép
                            </button>
                          </div>
                          <div className="grid grid-cols-2 gap-2 text-[12px] pt-1">
                            <div>
                              <span className="text-on-surface-variant block">Ngân hàng</span>
                              <span className="font-semibold text-on-surface">MB Bank (Quân Đội)</span>
                            </div>
                            <div>
                              <span className="text-on-surface-variant block">Số tài khoản</span>
                              <div className="flex items-center gap-1">
                                <span className="font-bold font-mono text-on-surface">0988 123 456</span>
                                <button className="text-primary hover:opacity-80" onClick={() => {}} type="button">
                                  <span className="material-symbols-outlined text-[14px]">content_copy</span>
                                </button>
                              </div>
                            </div>
                            <div className="col-span-2">
                              <span className="text-on-surface-variant block">Chủ tài khoản thụ hưởng</span>
                              <span className="font-bold text-on-surface">CONG TY CP COUPLESTORY VIET NAM</span>
                            </div>
                          </div>
                          <button className="mt-2 w-full py-2.5 rounded-full bg-primary text-on-primary font-label-md text-label-md font-semibold flex items-center justify-center gap-space-xs hover:bg-on-primary-fixed-variant transition-colors shadow-sm" id="btn-check-vietqr" onClick={() => {}} type="button">
                            <span className="material-symbols-outlined text-[18px]">autorenew</span>
                            <span>Đã chuyển khoản xong • Kiểm tra ngay</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="rounded-DEFAULT bg-surface-container-low transition-all duration-200 overflow-hidden" id="method-card-momo">
                    <button className="w-full text-left p-space-md flex items-center justify-between gap-space-sm hover:bg-surface-container transition-colors" onClick={() => {}} type="button">
                      <div className="flex items-center gap-space-sm">
                        <span className="w-5 h-5 rounded-full bg-outline-variant flex items-center justify-center" id="radio-dot-momo" />
                        <div className="flex flex-col">
                          <div className="flex items-center gap-space-xs">
                            <span className="font-title-md text-title-md text-on-surface font-semibold">Ví điện tử MoMo</span>
                            <span className="px-2 py-0.5 rounded-full bg-secondary-container text-on-secondary-container text-[11px] font-medium">Hoàn xu tới 10k</span>
                          </div>
                          <span className="font-body-sm text-body-sm text-on-surface-variant">Quét mã QR MoMo hoặc mở app thanh toán tức thời</span>
                        </div>
                      </div>
                      <div className="w-8 h-8 rounded-full bg-[#A50064]/10 flex items-center justify-center text-primary font-bold text-xs">
                        MoMo
                      </div>
                    </button>
                    <div className="hidden px-space-md pb-space-md pt-space-xs flex flex-col gap-space-sm" id="panel-momo">
                      <div className="bg-surface-container-lowest p-space-md rounded-DEFAULT flex flex-col sm:flex-row items-center gap-space-md">
                        <div className="w-32 h-32 bg-surface-container rounded-md flex items-center justify-center text-center p-2">
                          <span className="material-symbols-outlined text-primary text-[48px]">qr_code_scanner</span>
                        </div>
                        <div className="flex flex-col gap-2 flex-1">
                          <p className="font-body-sm text-body-sm text-on-surface">Mở ứng dụng <strong>MoMo</strong>, chọn "Quét Mã" và hướng camera về phía màn hình để thanh toán <strong>{formatPrice(couple?.price ?? 69000)}</strong>.</p>
                          <button className="w-fit px-space-md py-2 rounded-full bg-primary text-on-primary font-label-md text-label-md font-semibold hover:opacity-90" type="button">
                            Mở app MoMo trên điện thoại
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="rounded-DEFAULT bg-surface-container-low transition-all duration-200 overflow-hidden" id="method-card-card">
                    <button className="w-full text-left p-space-md flex items-center justify-between gap-space-sm hover:bg-surface-container transition-colors" onClick={() => {}} type="button">
                      <div className="flex items-center gap-space-sm">
                        <span className="w-5 h-5 rounded-full bg-outline-variant flex items-center justify-center" id="radio-dot-card" />
                        <div className="flex flex-col">
                          <span className="font-title-md text-title-md text-on-surface font-semibold">Thẻ Quốc tế (Visa / Mastercard / JCB)</span>
                          <span className="font-body-sm text-body-sm text-on-surface-variant">Hỗ trợ thẻ thanh toán quốc tế &amp; nội địa Napas</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-1 text-on-surface-variant">
                        <span className="material-symbols-outlined text-[20px]">credit_card</span>
                      </div>
                    </button>
                    <div className="hidden px-space-md pb-space-md pt-space-xs flex flex-col gap-space-sm" id="panel-card">
                      <div className="bg-surface-container-lowest p-space-md rounded-DEFAULT flex flex-col gap-space-sm">
                        <div className="flex flex-col gap-1">
                          <label className="font-label-md text-label-md text-on-surface font-semibold">Số thẻ</label>
                          <div className="relative">
                            <input className="w-full h-11 px-4 rounded-full bg-surface-container-low text-on-surface text-body-md focus:outline-none focus:bg-surface-container-lowest" placeholder="4123 4567 8901 2345" type="text" />
                            <span className="material-symbols-outlined absolute right-4 top-2.5 text-on-surface-variant text-[20px]">credit_card</span>
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-space-sm">
                          <div className="flex flex-col gap-1">
                            <label className="font-label-md text-label-md text-on-surface font-semibold">Hết hạn (MM/YY)</label>
                            <input className="w-full h-11 px-4 rounded-full bg-surface-container-low text-on-surface text-body-md focus:outline-none focus:bg-surface-container-lowest" placeholder="08/28" type="text" />
                          </div>
                          <div className="flex flex-col gap-1">
                            <label className="font-label-md text-label-md text-on-surface font-semibold">Mã bảo mật (CVC/CVV)</label>
                            <input className="w-full h-11 px-4 rounded-full bg-surface-container-low text-on-surface text-body-md focus:outline-none focus:bg-surface-container-lowest" maxLength={4} placeholder="•••" type="password" />
                          </div>
                        </div>
                        <div className="flex flex-col gap-1">
                          <label className="font-label-md text-label-md text-on-surface font-semibold">Tên in trên thẻ (không dấu)</label>
                          <input className="w-full h-11 px-4 rounded-full bg-surface-container-low text-on-surface text-body-md focus:outline-none focus:bg-surface-container-lowest uppercase" placeholder="NGUYEN BAO LONG" type="text" />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="rounded-DEFAULT bg-surface-container-low transition-all duration-200 overflow-hidden" id="method-card-digitalwallet">
                    <button className="w-full text-left p-space-md flex items-center justify-between gap-space-sm hover:bg-surface-container transition-colors" onClick={() => {}} type="button">
                      <div className="flex items-center gap-space-sm">
                        <span className="w-5 h-5 rounded-full bg-outline-variant flex items-center justify-center" id="radio-dot-digitalwallet" />
                        <div className="flex flex-col">
                          <span className="font-title-md text-title-md text-on-surface font-semibold">Apple Pay / Google Pay</span>
                          <span className="font-body-sm text-body-sm text-on-surface-variant">Chạm thanh toán sinh trắc học Face ID / Touch ID 1 giây</span>
                        </div>
                      </div>
                      <span className="material-symbols-outlined text-[20px] text-on-surface-variant">contactless</span>
                    </button>
                    <div className="hidden px-space-md pb-space-md pt-space-xs" id="panel-digitalwallet">
                      <div className="bg-surface-container-lowest p-space-md rounded-DEFAULT text-center flex flex-col items-center gap-2">
                        <p className="font-body-sm text-body-sm text-on-surface-variant">Thiết bị tương thích đã sẵn sàng kết nối qua Apple Pay.</p>
                        <button className="px-space-lg py-2.5 rounded-full bg-black text-white font-label-md text-label-md flex items-center gap-2" type="button">
                          <span>Pay with</span>
                          <span className="font-bold tracking-tight"> Pay</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="pt-space-xs">
                  <button className="flex items-center justify-between w-full p-space-sm px-space-md rounded-full bg-surface-container text-left text-on-surface hover:bg-surface-container-high transition-colors" onClick={() => {}} type="button">
                    <div className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-primary text-[18px]">receipt_long</span>
                      <span className="font-label-md text-label-md font-semibold">Yêu cầu xuất hóa đơn điện tử VAT (Dành cho sự kiện / lễ cưới)</span>
                    </div>
                    <span className="material-symbols-outlined text-[18px] transition-transform duration-200" id="vat-icon-chevron">expand_more</span>
                  </button>
                  <div className="hidden mt-space-sm p-space-md rounded-DEFAULT bg-surface-container-low flex flex-col gap-space-sm" id="vat-form-container">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-space-sm">
                      <div className="flex flex-col gap-1">
                        <label className="font-label-sm text-label-sm text-on-surface-variant">Mã số thuế doanh nghiệp / cá nhân</label>
                        <input className="w-full h-10 px-3 rounded-full bg-surface-container-lowest text-body-sm text-on-surface focus:outline-none" placeholder="0315xxxxxx" type="text" />
                      </div>
                      <div className="flex flex-col gap-1">
                        <label className="font-label-sm text-label-sm text-on-surface-variant">Tên công ty / đơn vị xuất hóa đơn</label>
                        <input className="w-full h-10 px-3 rounded-full bg-surface-container-lowest text-body-sm text-on-surface focus:outline-none" placeholder="Công ty TNHH..." type="text" />
                      </div>
                    </div>
                    <div className="flex flex-col gap-1">
                      <label className="font-label-sm text-label-sm text-on-surface-variant">Địa chỉ trụ sở theo đăng ký kinh doanh</label>
                      <input className="w-full h-10 px-3 rounded-full bg-surface-container-lowest text-body-sm text-on-surface focus:outline-none" placeholder="Số nhà, Tên phố, Phường/Xã, TP..." type="text" />
                    </div>
                    <div className="flex flex-col gap-1">
                      <label className="font-label-sm text-label-sm text-on-surface-variant">Email nhận hóa đơn điện tử (PDF/XML)</label>
                      <input className="w-full h-10 px-3 rounded-full bg-surface-container-lowest text-body-sm text-on-surface focus:outline-none" placeholder="baolong@gmail.com" type="email" />
                    </div>
                  </div>
                </div>
                <div className="pt-space-sm flex flex-wrap items-center justify-between gap-space-sm text-on-surface-variant">
                  <div className="flex items-center gap-1 font-label-sm text-label-sm">
                    <span className="material-symbols-outlined text-primary text-[16px]">lock_clock</span>
                    Bảo mật chuẩn PCI DSS Cấp 1
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="font-label-sm text-label-sm px-2 py-0.5 rounded bg-surface-container font-mono">NAPAS</span>
                    <span className="font-label-sm text-label-sm px-2 py-0.5 rounded bg-surface-container font-mono">VNPAY</span>
                    <span className="font-label-sm text-label-sm px-2 py-0.5 rounded bg-surface-container font-mono">SSL 256-BIT</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-between px-space-sm">
                <a className="inline-flex items-center gap-1 font-body-sm text-body-sm text-on-surface-variant hover:text-primary transition-colors" href="#">
                  <span className="material-symbols-outlined text-[16px]">arrow_back</span>
                  Quay lại trang xem xét các gói dịch vụ
                </a>
                <span className="font-body-sm text-body-sm text-on-surface-variant">Mã phiên: CS-VN-88329</span>
              </div>
            </div>
            <div className="lg:col-span-5 flex flex-col gap-space-md lg:sticky lg:top-24">
              <div className="bg-surface-container-lowest rounded-lg p-space-md sm:p-space-lg shadow-[0_6px_28px_rgba(61,31,45,0.07)] flex flex-col gap-space-md">
                <div className="flex items-center gap-space-sm p-space-sm bg-surface-container-low rounded-DEFAULT">
                  <div className="relative flex items-center shrink-0 pr-2">
                    <img className="w-12 h-12 rounded-full object-cover shadow-sm ring-2 ring-white" data-alt="Warm intimate candid photo of an Asian young man smiling softly with golden hour sunlight, soft pink hues, studio editorial romance" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBhjpqZsWgMWlMQDR6d00XoFDxfAvEf5NsCUXe5fYGC7OpBX8LJF9Wrpy6JABVxOSq00_x8V3r5ai1U4diYPSbYgL5CbaDsjQwTE1TK18o3JWq0UyK1r1fILkOmSzgSGB_Xf5dHWfXu_BflJXWRR_qbz_5fSiS1A3bAMe38lf-E8UgHgQPKacAntBH3tWGOfBYhGFLnljMSe5AKgkyX4DqnIrFW6cqBrp-1r2xIq16qZoVxKWZr5Oz3" />
                    <img className="w-12 h-12 rounded-full object-cover shadow-sm -ml-4 ring-2 ring-white" data-alt="Charming romantic portrait of an Asian young woman smiling sweetly with delicate floral tones and soft warm daylight, high editorial quality" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAVtvBWOMPnDIvWsPCSZeF-4KoOoOPkTbNt2381Q7uE52pTmrgFLGChbpF4I-nFBks4XFJRZdLJ7GHLjKKSilMstyZq-z0mpP0ZjoEOjQGf3DHslTrT08eG_dYP-vZMVsErv4qxSU8_r7D-GUtq6qEQ8TQwfS7TXahqxQU0B-m0aH8DJq28n7x_x3QOZJHRcWxIwf_Xg8ExgshK8W-iKnkoaizurU5mD9J1z0qvcJ-jhbImI4Whchf6" />
                    <div className="absolute -bottom-1 left-7 w-5 h-5 rounded-full bg-primary text-on-primary flex items-center justify-center shadow">
                      <span className="material-symbols-outlined text-[11px]" style={{fontVariationSettings: '"FILL" 1'}}>favorite</span>
                    </div>
                  </div>
                  <div className="flex flex-col min-w-0">
                    <div className="flex items-center gap-1">
                      <span className="font-title-md text-title-md text-on-surface font-bold truncate">Bảo Long &amp; An Nhiên</span>
                      <span className="material-symbols-outlined text-primary text-[15px]" style={{fontVariationSettings: '"FILL" 1'}}>verified</span>
                    </div>
                    <span className="font-mono text-[12px] text-primary truncate">baolong-annhien.couplestory.site</span>
                  </div>
                </div>
                <div className="flex items-start justify-between gap-space-sm">
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="font-headline-md text-headline-md text-on-surface font-semibold">Gói COUPLE</span>
                      <span className="px-2 py-0.5 rounded-full bg-primary text-on-primary text-[11px] font-semibold">Phổ biến nhất ❤️</span>
                    </div>
                    <p className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">
                      Thanh toán trọn đời • Quyền sở hữu &amp; lưu giữ mãi mãi
                    </p>
                  </div>
                  <div className="text-right shrink-0">
                    <span className="font-body-sm text-body-sm text-on-surface-variant line-through block">{formatPrice(proMax?.price ?? 119000)}</span>
                    <span className="font-title-lg text-title-lg text-primary font-bold">{formatPrice(couple?.price ?? 69000)}</span>
                  </div>
                </div>
                <div className="flex flex-col gap-2.5 py-space-xs">
                  <span className="font-label-sm text-label-sm text-on-surface-variant font-semibold tracking-wider uppercase">Đặc quyền kích hoạt ngay</span>
                  <ul className="flex flex-col gap-2 font-body-sm text-body-sm text-on-surface">
                    <li className="flex items-center gap-2">
                      <span className="w-5 h-5 rounded-full bg-surface-container-high text-primary flex items-center justify-center shrink-0">
                        <span className="material-symbols-outlined text-[13px]" style={{fontVariationSettings: '"FILL" 1'}}>done</span>
                      </span>
                      <span><strong>2 Tài khoản đồng quản trị</strong> (Cùng viết nhật ký thời gian thực)</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-5 h-5 rounded-full bg-surface-container-high text-primary flex items-center justify-center shrink-0">
                        <span className="material-symbols-outlined text-[13px]" style={{fontVariationSettings: '"FILL" 1'}}>done</span>
                      </span>
                      <span>Trọn bộ <strong>10+ Template cao cấp</strong> (Minimal &amp; Eternal Love)</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-5 h-5 rounded-full bg-surface-container-high text-primary flex items-center justify-center shrink-0">
                        <span className="material-symbols-outlined text-[13px]" style={{fontVariationSettings: '"FILL" 1'}}>done</span>
                      </span>
                      <span>Lưu trữ <strong>500 ảnh HD + 3 Video kỷ niệm</strong> không giới hạn</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-5 h-5 rounded-full bg-surface-container-high text-primary flex items-center justify-center shrink-0">
                        <span className="material-symbols-outlined text-[13px]" style={{fontVariationSettings: '"FILL" 1'}}>done</span>
                      </span>
                      <span><strong>Hộp thư tình bí mật</strong> (Mở khóa theo ngày hẹn ước tương lai)</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-5 h-5 rounded-full bg-surface-container-high text-primary flex items-center justify-center shrink-0">
                        <span className="material-symbols-outlined text-[13px]" style={{fontVariationSettings: '"FILL" 1'}}>done</span>
                      </span>
                      <span>Xuất file in ấn <strong>300 DPI &amp; QR khắc thiệp cưới</strong></span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-5 h-5 rounded-full bg-surface-container-high text-primary flex items-center justify-center shrink-0">
                        <span className="material-symbols-outlined text-[13px]" style={{fontVariationSettings: '"FILL" 1'}}>done</span>
                      </span>
                      <span>Bảo vệ mã PIN riêng tư &amp; Nhạc nền MP3 đôi lứa</span>
                    </li>
                  </ul>
                </div>
                <div className="flex flex-col gap-1.5 pt-space-xs">
                  <label className="font-label-sm text-label-sm text-on-surface-variant font-semibold">Mã ưu đãi / Quà tặng cưới</label>
                  <div className="flex items-center gap-2">
                    <div className="relative flex-1">
                      <input className="w-full h-10 px-4 rounded-full bg-surface-container-low text-on-surface font-mono text-body-sm font-semibold uppercase focus:outline-none focus:bg-surface-container" id="coupon-input" type="text" defaultValue="LOVEFOREVER" />
                      <span className="material-symbols-outlined absolute right-3 top-2.5 text-primary text-[18px]">check_circle</span>
                    </div>
                    <button className="px-space-md h-10 rounded-full bg-surface-container-high text-primary font-label-md text-label-md font-semibold hover:bg-primary hover:text-on-primary transition-all" onClick={() => {}} type="button">
                      Áp dụng
                    </button>
                  </div>
                  <span className="text-[12px] text-primary flex items-center gap-1 font-medium">
                    <span className="material-symbols-outlined text-[14px]">local_offer</span>
                    Mã <strong>LOVEFOREVER</strong>: Miễn phí tên miền vĩnh viễn
                  </span>
                </div>
                <div className="flex flex-col gap-2 pt-space-xs text-body-sm text-on-surface-variant">
                  <div className="flex justify-between">
                    <span>Giá niêm yết:</span>
                    <span className="text-on-surface font-medium">{formatPrice(proMax?.price ?? 119000)}</span>
                  </div>
                  <div className="flex justify-between text-primary">
                    <span>Ưu đãi cặp đôi mới (-40%):</span>
                    <span className="font-semibold">-200.000 đ</span>
                  </div>
                  <div className="flex justify-between text-primary">
                    <span>Ưu đãi mã LOVEFOREVER:</span>
                    <span className="font-semibold">-0 đ</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Thuế giá trị gia tăng (VAT 8%):</span>
                    <span className="text-on-surface font-medium">Đã bao gồm</span>
                  </div>
                  <div className="pt-space-sm mt-1 flex items-baseline justify-between bg-surface-container-low p-space-sm rounded-DEFAULT">
                    <div>
                      <span className="font-title-lg text-title-lg text-on-surface font-bold block">Tổng thanh toán:</span>
                      <span className="text-[11px] text-on-surface-variant">Thanh toán trọn đời • Không tự động gia hạn</span>
                    </div>
                    <div className="text-right">
                      <span className="font-headline-lg text-headline-lg text-primary font-bold">{formatPrice(couple?.price ?? 69000)}</span>
                    </div>
                  </div>
                </div>
                <button className="w-full py-3.5 px-space-lg rounded-full bg-primary text-on-primary font-title-md text-title-md font-bold flex items-center justify-center gap-2 hover:bg-on-primary-fixed-variant transition-all shadow-[0_6px_20px_rgba(185,10,90,0.3)] hover:scale-[1.01]" onClick={() => {}} type="button">
                  <span className="material-symbols-outlined text-[20px]" style={{fontVariationSettings: '"FILL" 1'}}>favorite</span>
                  <span>Kích hoạt Story Ngay Bây Giờ</span>
                </button>
                <div className="flex items-start gap-space-xs p-space-sm rounded-DEFAULT bg-surface-container-low">
                  <span className="material-symbols-outlined text-primary text-[22px] shrink-0" style={{fontVariationSettings: '"FILL" 1'}}>health_and_safety</span>
                  <div className="flex flex-col text-left">
                    <span className="font-label-md text-label-md text-on-surface font-bold">Cam kết an tâm tuyệt đối 100%</span>
                    <p className="font-body-sm text-body-sm text-on-surface-variant">
                      Nếu bạn và người ấy không hoàn toàn xúc động với trải nghiệm trang kỷ niệm, CoupleStory cam kết hoàn tiền 100% trong 7 ngày đầu tiên mà không cần bất kỳ lý do nào.
                    </p>
                  </div>
                </div>
                <div className="flex items-center justify-between text-body-sm text-on-surface-variant pt-1 px-1">
                  <span className="flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-primary inline-block" />
                    Tư vấn viên tình yêu online
                  </span>
                  <a className="text-primary font-semibold hover:underline flex items-center gap-0.5" href="#">
                    Chat Zalo 24/7
                    <span className="material-symbols-outlined text-[14px]">open_in_new</span>
                  </a>
                </div>
              </div>
              <div className="bg-surface-container-high rounded-DEFAULT p-space-md flex items-center gap-space-sm">
                <span className="material-symbols-outlined text-primary text-[28px] shrink-0">format_quote</span>
                <p className="font-body-sm text-body-sm text-on-surface italic">
                  “Chúng mình quét mã QR in trên thiệp cưới để bạn bè cùng ngắm hành trình 5 năm qua. Tuyệt đối xứng đáng từng đồng!”
                  <span className="not-italic block text-[12px] font-semibold text-primary mt-1">— Hoàng &amp; Mai Ly (Hà Nội)</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="fixed bottom-6 right-6 z-50 transform translate-y-20 opacity-0 transition-all duration-300 pointer-events-none flex items-center gap-2 px-space-md py-space-sm rounded-full bg-on-surface text-surface shadow-xl font-label-md text-label-md" id="toast-notify">
        <span className="material-symbols-outlined text-primary text-[18px]">check_circle</span>
        <span id="toast-text">Nội dung đã sao chép thành công</span>
      </div>
    </div>
  </main><footer className="w-full bg-surface-container-low py-space-xl shadow-[0_-1px_12px_rgba(61,31,45,0.03)]"><div className="max-w-7xl mx-auto px-gutter flex flex-col md:flex-row items-center justify-between gap-space-lg"><div className="flex flex-col items-center md:items-start gap-space-xs text-center md:text-left"><div className="flex items-center gap-space-xs text-on-surface"><span className="material-symbols-outlined text-primary text-[20px]">verified_user</span><span className="font-title-md text-title-md">Chứng thực bảo mật giao dịch</span></div><p className="font-body-sm text-body-sm text-on-surface-variant">Toàn bộ dữ liệu thanh toán và kỷ niệm đôi lứa của bạn được mã hóa an toàn.</p></div><div className="flex flex-wrap items-center justify-center gap-space-sm"><div className="flex items-center gap-space-xs bg-surface-container-lowest px-space-md py-space-sm rounded-full shadow-[0_2px_8px_rgba(61,31,45,0.04)]"><span className="material-symbols-outlined text-primary text-[18px]">qr_code_2</span><span className="font-label-md text-label-md text-on-surface">VietQR</span></div><div className="flex items-center gap-space-xs bg-surface-container-lowest px-space-md py-space-sm rounded-full shadow-[0_2px_8px_rgba(61,31,45,0.04)]"><span className="material-symbols-outlined text-primary text-[18px]">account_balance_wallet</span><span className="font-label-md text-label-md text-on-surface">MoMo</span></div><div className="flex items-center gap-space-xs bg-surface-container-lowest px-space-md py-space-sm rounded-full shadow-[0_2px_8px_rgba(61,31,45,0.04)]"><span className="material-symbols-outlined text-primary text-[18px]">credit_card</span><span className="font-label-md text-label-md text-on-surface">Visa / Mastercard</span></div><div className="flex items-center gap-space-xs bg-surface-container-lowest px-space-md py-space-sm rounded-full shadow-[0_2px_8px_rgba(61,31,45,0.04)]"><span className="material-symbols-outlined text-primary text-[18px]">shield</span><span className="font-label-md text-label-md text-on-surface">PCI DSS</span></div></div></div><div className="max-w-7xl mx-auto px-gutter mt-space-lg pt-space-md border-t border-surface-container text-center"><p className="font-body-sm text-body-sm text-on-surface-variant">© 2025 CoupleStory Inc. Lưu giữ từng nhịp đập yêu thương. Mọi giao dịch đều được bảo hộ pháp lý.</p></div></footer>
</div>

    </div>
  );
}
