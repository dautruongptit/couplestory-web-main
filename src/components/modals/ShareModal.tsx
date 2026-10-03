import type { ReactNode } from 'react';

interface Props { onClose?: () => void; children?: ReactNode; }

export default function ShareModal({ onClose }: Props) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm" onClick={onClose}>
      <div className="relative max-w-2xl w-full mx-4" onClick={e => e.stopPropagation()}>
<div>
  <header className="fixed top-0 left-0 right-0 z-40 bg-surface/85 backdrop-blur-xl shadow-[0_1px_8px_rgba(61,31,45,0.05)]"><div className="h-20 w-full px-margin flex items-center justify-between gap-space-lg"><div className="flex items-center gap-space-xl"><a className="flex items-center gap-space-xs group" data-path="dashboard" href="/home"><div className="w-10 h-10 rounded-full bg-primary-container flex items-center justify-center shadow-[0_4px_16px_rgba(185,10,90,0.2)]"><span className="material-symbols-outlined text-on-primary text-[22px]">favorite</span></div><span className="font-headline-md text-headline-md text-primary tracking-tight">CoupleStory</span></a><nav className="hidden lg:flex items-center gap-space-xs bg-surface-container-low p-space-xs rounded-full" data-active-classes="bg-surface-container-high text-primary font-semibold"><a className="px-space-md py-space-sm rounded-full text-on-surface-variant hover:text-on-surface hover:bg-surface-container transition-all font-label-md text-label-md" data-path="dashboard" href="/home">Dashboard</a><a aria-current="page" className="px-space-md py-space-sm rounded-full transition-all bg-surface-container-high text-primary font-semibold" data-path="story-editor" href="#">Story Editor</a><a className="px-space-md py-space-sm rounded-full text-on-surface-variant hover:text-on-surface hover:bg-surface-container transition-all font-label-md text-label-md" data-path="kho-giao-dien" href="#">Kho Giao Diện</a><a className="px-space-md py-space-sm rounded-full text-on-surface-variant hover:text-on-surface hover:bg-surface-container transition-all font-label-md text-label-md" data-path="bang-gia" href="/pricing">Bảng Giá</a></nav></div><div className="flex items-center gap-space-md"><div className="hidden sm:flex items-center -space-x-space-sm mr-space-xs"><div className="w-8 h-8 rounded-full bg-secondary-container flex items-center justify-center ring-2 ring-surface text-on-secondary-container font-label-sm text-label-sm font-bold">L</div><div className="w-8 h-8 rounded-full bg-tertiary-fixed flex items-center justify-center ring-2 ring-surface text-on-tertiary-fixed font-label-sm text-label-sm font-bold">M</div></div><button className="inline-flex items-center gap-space-xs px-space-md py-space-sm rounded-full bg-surface-container text-on-surface hover:bg-surface-container-high transition-all font-label-md text-label-md" onClick={() => {}} type="button"><span className="material-symbols-outlined text-[18px] text-tertiary">share</span><span className="hidden md:inline">Chia sẻ</span></button><button className="inline-flex items-center gap-space-xs px-space-lg py-space-sm rounded-full bg-primary-container text-on-primary hover:bg-primary transition-all font-label-md text-label-md shadow-[0_4px_16px_rgba(185,10,90,0.18)] hover:scale-[1.02]" onClick={() => {}} type="button"><span className="material-symbols-outlined text-[18px]">cloud_upload</span><span>Xuất Bản</span></button><div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center"><span className="material-symbols-outlined text-on-primary text-[18px]">person</span></div></div></div></header><main className="w-full pt-20 bg-surface min-h-[calc(100vh-80px)]"><div className="flex flex-col w-full relative min-h-screen">
      <div className="w-full px-margin py-space-xl opacity-40 blur-[2px] pointer-events-none select-none max-w-7xl mx-auto flex flex-col gap-space-lg">
        <div className="flex items-center justify-between pb-space-sm">
          <div className="flex items-center gap-space-sm">
            <span className="px-space-md py-space-xs rounded-full bg-primary-fixed text-on-primary-fixed-variant font-label-sm text-label-sm">Chương 04 • Kỷ Niệm Paris</span>
            <span className="text-on-surface-variant font-body-sm text-body-sm">Đã lưu nháp tự động 2 phút trước</span>
          </div>
          <div className="flex items-center gap-space-sm">
            <div className="flex items-center -space-x-space-xs">
              <div className="w-7 h-7 rounded-full bg-primary-container text-on-primary flex items-center justify-center font-label-sm text-label-sm">L</div>
              <div className="w-7 h-7 rounded-full bg-secondary-container text-on-secondary-container flex items-center justify-center font-label-sm text-label-sm">N</div>
            </div>
            <span className="text-on-surface-variant font-label-sm text-label-sm">Bảo Long &amp; An Nhiên đang cùng chỉnh sửa</span>
          </div>
        </div>
        <div className="rounded-lg bg-surface-container-low p-space-xl flex flex-col md:flex-row gap-space-xl shadow-sm">
          <div className="w-full md:w-1/3 aspect-[4/3] rounded-DEFAULT overflow-hidden bg-surface-container">
            <img className="w-full h-full object-cover" data-alt="Romantic shot of young Vietnamese couple laughing softly under an umbrella during gentle rain in Paris near Pont de Bir-Hakeim, cinematic natural lighting, soft blush and rose palette, vintage film tone." src="https://lh3.googleusercontent.com/aida-public/AB6AXuDRnPQ8do-m9_6mmZuVqCvTUoY4_kL045s60PU4JltrBQGKhudlewX0hjqqRX6j50MNOD4tQXGUhc9dJ5jKsCVDwfFiXP5WpUhlpojltK4-ueUNfBIEvFbdkJGK0Uc58-qz6ySN6OzOd8HMpfGZ4e6Ztk9rpehUDQjOicEooqucBfASyOaz2HymizpWYUCSxLfE-7cQQBxeidSLdoaAo2t0iMnBYc_wbYiDxSJq0AZsigvRYVBmPNjA" />
          </div>
          <div className="flex-1 flex flex-col justify-between">
            <div className="flex flex-col gap-space-xs">
              <h2 className="font-headline-lg text-headline-lg text-on-surface">Dưới Cơn Mưa Đầu Mùa Paris &amp; Chiếc Nhẫn Bất Ngờ</h2>
              <p className="font-body-md text-body-md text-on-surface-variant line-clamp-3">
                Chiều hôm ấy ở bờ sông Seine, khi ánh hoàng hôn nhạt dần sau tháp Eiffel và cơn mưa phùn bất chợt buông xuống, anh đã thì thầm lời hứa trọn đời...
              </p>
            </div>
            <div className="flex items-center gap-space-md pt-space-md">
              <div className="px-space-md py-space-xs rounded-full bg-surface-container-high text-primary font-label-sm text-label-sm flex items-center gap-space-xs">
                <span className="material-symbols-outlined text-[16px]">music_note</span> Until I Found You — Stephen Sanchez
              </div>
              <div className="text-tertiary font-label-sm text-label-sm">18 hình ảnh • 2 đoạn ghi âm bí mật</div>
            </div>
          </div>
        </div>
      </div>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-space-md md:p-space-lg bg-inverse-surface/60 backdrop-blur-md overflow-y-auto">
        <div className="relative w-full max-w-[960px] bg-surface-container-lowest rounded-lg shadow-2xl overflow-hidden flex flex-col my-auto transform transition-all duration-300" id="publish-modal-card">
          <div className="absolute -top-24 -right-24 w-80 h-80 rounded-full bg-gradient-to-br from-primary-fixed/60 via-secondary-container/40 to-transparent blur-3xl pointer-events-none" />
          <div className="absolute -bottom-20 -left-20 w-64 h-64 rounded-full bg-gradient-to-tr from-surface-container-highest/70 to-transparent blur-2xl pointer-events-none" />
          <div className="relative px-space-xl pt-space-xl pb-space-lg flex flex-col gap-space-sm bg-gradient-to-b from-surface-container-low/70 to-surface-container-lowest">
            <div className="flex items-center justify-between">
              <div className="inline-flex items-center gap-space-xs px-space-md py-space-xs rounded-full bg-primary-fixed text-primary font-label-sm text-label-sm shadow-sm">
                <span className="material-symbols-outlined text-[16px]">celebration</span>
                <span className="font-semibold tracking-wide uppercase">Xuất Bản Kỷ Niệm Thành Công</span>
              </div>
              <button className="w-10 h-10 rounded-full flex items-center justify-center bg-surface-container text-on-surface-variant hover:text-primary hover:bg-surface-container-high transition-all" onClick={() => {}} type="button">
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>
            <div className="flex flex-col gap-space-xs pr-space-xl">
              <h1 className="font-headline-lg text-headline-lg text-primary tracking-tight">
                Chia Sẻ Kỷ Niệm Của Hai Bạn
              </h1>
              <p className="font-body-md text-body-md text-on-surface-variant">
                Câu chuyện tình yêu của <strong className="text-primary font-semibold">Bảo Long &amp; An Nhiên</strong> đã sẵn sàng để lan tỏa hơi ấm ngọt ngào đến những người thân thương nhất.
              </p>
            </div>
            <div className="mt-space-xs p-space-md rounded-DEFAULT bg-surface-container-low flex flex-wrap items-center justify-between gap-space-sm">
              <div className="flex items-center gap-space-md">
                <div className="w-9 h-9 rounded-full bg-primary-container text-on-primary flex items-center justify-center shadow-sm">
                  <span className="material-symbols-outlined text-[18px]">favorite</span>
                </div>
                <div className="flex flex-col">
                  <span className="font-title-md text-title-md text-on-surface">Chương 04: Lời Ước Nguyện Cầu Bir-Hakeim</span>
                  <span className="font-label-sm text-label-sm text-on-surface-variant">Paris, Pháp • Đánh dấu 1,248 ngày đồng hành bên nhau</span>
                </div>
              </div>
              <div className="flex items-center gap-space-sm">
                <span className="inline-flex items-center gap-space-xs text-secondary font-label-sm text-label-sm">
                  <span className="material-symbols-outlined text-[15px]">graphic_eq</span> Audio đính kèm
                </span>
                <span className="inline-flex items-center gap-space-xs px-space-sm py-space-xs rounded-full bg-surface-container-high text-primary font-label-sm text-label-sm font-semibold">
                  <span className="w-2 h-2 rounded-full bg-primary animate-pulse" /> Sẵn sàng trực tuyến
                </span>
              </div>
            </div>
          </div>
          <div className="px-space-xl py-space-md grid grid-cols-1 lg:grid-cols-12 gap-space-lg">
            <div className="lg:col-span-7 flex flex-col gap-space-lg">
              <div className="flex flex-col gap-space-sm">
                <div className="flex items-center justify-between">
                  <span className="font-label-md text-label-md text-on-surface uppercase tracking-wider font-semibold">Quyền riêng tư &amp; Truy cập</span>
                  <span className="font-label-sm text-label-sm text-tertiary">Có thể thay đổi bất kỳ lúc nào</span>
                </div>
                <label className="group cursor-pointer p-space-md rounded-DEFAULT bg-surface-container-low hover:bg-surface-container transition-all flex items-start gap-space-md shadow-sm">
                  <input defaultChecked className="mt-1 w-4 h-4 accent-primary cursor-pointer" name="privacy-level" type="radio" />
                  <div className="flex-1 flex flex-col">
                    <div className="flex items-center gap-space-xs">
                      <span className="font-title-md text-title-md text-on-surface">Công khai cho mọi người</span>
                      <span className="px-space-xs py-0.5 rounded-full bg-primary-fixed text-primary font-label-sm text-label-sm font-bold">Đề xuất</span>
                    </div>
                    <p className="font-body-sm text-body-sm text-on-surface-variant mt-space-xs">
                      Bất kỳ ai có liên kết đều có thể đọc câu chuyện và gửi lời chúc phúc chúc mừng hai bạn.
                    </p>
                  </div>
                  <span className="material-symbols-outlined text-primary text-[20px]" style={{fontVariationSettings: '"FILL" 1'}}>public</span>
                </label>
                <label className="group cursor-pointer p-space-md rounded-DEFAULT bg-surface hover:bg-surface-container-low transition-all flex items-start gap-space-md">
                  <input className="mt-1 w-4 h-4 accent-primary cursor-pointer" name="privacy-level" type="radio" />
                  <div className="flex-1 flex flex-col">
                    <div className="flex items-center gap-space-xs">
                      <span className="font-title-md text-title-md text-on-surface">Bảo vệ bằng Mã PIN</span>
                      <span className="px-space-xs py-0.5 rounded bg-surface-container text-on-surface-variant font-label-sm text-label-sm font-mono">PIN: 0412</span>
                    </div>
                    <p className="font-body-sm text-body-sm text-on-surface-variant mt-space-xs">
                      Người xem cần nhập mật khẩu 4 chữ số bí mật (ngày kỷ niệm) của hai bạn để mở thiệp.
                    </p>
                  </div>
                  <span className="material-symbols-outlined text-on-surface-variant text-[20px]">key</span>
                </label>
                <label className="group cursor-pointer p-space-md rounded-DEFAULT bg-surface hover:bg-surface-container-low transition-all flex items-start gap-space-md">
                  <input className="mt-1 w-4 h-4 accent-primary cursor-pointer" name="privacy-level" type="radio" />
                  <div className="flex-1 flex flex-col">
                    <div className="flex items-center gap-space-xs">
                      <span className="font-title-md text-title-md text-on-surface">Chỉ hai đứa mình</span>
                    </div>
                    <p className="font-body-sm text-body-sm text-on-surface-variant mt-space-xs">
                      Kho tư liệu riêng tư. Chỉ tài khoản Bảo Long và An Nhiên mới có quyền xem album này.
                    </p>
                  </div>
                  <span className="material-symbols-outlined text-on-surface-variant text-[20px]">lock</span>
                </label>
              </div>
              <div className="flex flex-col gap-space-xs">
                <span className="font-label-md text-label-md text-on-surface uppercase tracking-wider font-semibold">Liên kết chia sẻ độc quyền</span>
                <div className="flex items-center gap-space-xs p-space-xs bg-surface-container-low rounded-full">
                  <div className="flex items-center gap-space-xs pl-space-md py-space-xs flex-1 min-w-0">
                    <span className="material-symbols-outlined text-[16px] text-tertiary">lock</span>
                    <input className="bg-transparent text-primary font-body-sm text-body-sm font-medium w-full outline-none truncate select-all" id="share-link-input" readOnly type="text" defaultValue="baolong-annhien.couplestory.site/paris-story" />
                  </div>
                  <button className="px-space-lg py-space-sm rounded-full bg-primary-container hover:bg-primary text-on-primary font-label-md text-label-md flex items-center gap-space-xs shrink-0 shadow-md transition-all" id="copy-btn" onClick={() => {}} type="button">
                    <span className="material-symbols-outlined text-[16px]">content_copy</span>
                    <span>Sao chép</span>
                  </button>
                </div>
                <div className="flex items-center justify-between px-space-xs">
                  <span className="font-label-sm text-label-sm text-on-surface-variant">Permalink hoạt động vĩnh viễn trên máy chủ</span>
                  <span className="font-label-sm text-label-sm text-secondary font-medium flex items-center gap-1">
                    <span className="material-symbols-outlined text-[14px]">verified</span> SSL bảo mật cao cấp
                  </span>
                </div>
              </div>
              <div className="flex flex-col gap-space-sm pt-space-xs">
                <span className="font-label-md text-label-md text-on-surface uppercase tracking-wider font-semibold">Tương tác từ bạn bè &amp; gia đình</span>
                <div className="p-space-md rounded-DEFAULT bg-surface-container-lowest shadow-sm flex items-center justify-between gap-space-md">
                  <div className="flex items-center gap-space-sm">
                    <div className="w-8 h-8 rounded-full bg-surface-container flex items-center justify-center text-primary">
                      <span className="material-symbols-outlined text-[18px]">favorite_border</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="font-title-md text-title-md text-on-surface">Thả tim &amp; Lời chúc phúc</span>
                      <span className="font-body-sm text-body-sm text-on-surface-variant">Cho phép khách mời để lại lời nhắn yêu thương trên trang</span>
                    </div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input defaultChecked className="sr-only peer" type="checkbox" />
                    <div className="w-11 h-6 bg-surface-variant peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-on-primary after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-container" />
                  </label>
                </div>
                <div className="p-space-md rounded-DEFAULT bg-surface-container-lowest shadow-sm flex items-center justify-between gap-space-md">
                  <div className="flex items-center gap-space-sm">
                    <div className="w-8 h-8 rounded-full bg-surface-container flex items-center justify-center text-secondary">
                      <span className="material-symbols-outlined text-[18px]">volume_up</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="font-title-md text-title-md text-on-surface">Nhạc nền tự động</span>
                      <span className="font-body-sm text-body-sm text-on-surface-variant">Tự phát giai điệu <span className="italic font-medium">Until I Found You</span> khi mở trang</span>
                    </div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input defaultChecked className="sr-only peer" type="checkbox" />
                    <div className="w-11 h-6 bg-surface-variant peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-on-primary after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-container" />
                  </label>
                </div>
              </div>
            </div>
            <div className="lg:col-span-5 bg-surface-container-low/60 p-space-lg rounded-DEFAULT flex flex-col justify-between gap-space-md shadow-sm">
              <div className="flex flex-col items-center text-center gap-space-sm">
                <span className="font-label-md text-label-md text-on-surface uppercase tracking-wider font-semibold">Mã QR Thiệp Mừng &amp; Kỷ Niệm</span>
                <div className="relative p-space-md bg-surface-container-lowest rounded-DEFAULT shadow-md flex items-center justify-center">
                  <div className="w-36 h-36 relative flex items-center justify-center bg-surface-container-lowest">
                    <svg className="w-full h-full text-on-surface fill-current" viewBox="0 0 140 140" xmlns="http://www.w3.org/2000/svg">
                      <path d="M10,10 h40 v40 h-40 z M16,16 v28 h28 v-28 z M22,22 h16 v16 h-16 z" />
                      <path d="M90,10 h40 v40 h-40 z M96,16 v28 h28 v-28 z M102,22 h16 v16 h-16 z" />
                      <path d="M10,90 h40 v40 h-40 z M16,96 v28 h28 v-28 z M22,102 h16 v16 h-16 z" />
                      <rect height={6} width={6} x={58} y={12} />
                      <rect height={6} width={14} x={68} y={12} />
                      <rect height={6} width={8} x={58} y={24} />
                      <rect height={8} width={8} x={74} y={24} />
                      <rect height={12} width={6} x={60} y={36} />
                      <rect height={6} width={10} x={72} y={38} />
                      <rect height={6} width={6} x={12} y={58} />
                      <rect height={6} width={14} x={24} y={58} />
                      <rect height={6} width={12} x={44} y={58} />
                      <rect height={6} width={18} x={86} y={58} />
                      <rect height={6} width={14} x={110} y={58} />
                      <rect height={6} width={10} x={12} y={70} />
                      <rect height={8} width={8} x={28} y={70} />
                      <rect height={6} width={6} x={42} y={72} />
                      <rect height={8} width={8} x={92} y={70} />
                      <rect height={6} width={14} x={112} y={70} />
                      <rect height={12} width={8} x={58} y={90} />
                      <rect height={6} width={12} x={72} y={92} />
                      <rect height={6} width={14} x={60} y={110} />
                      <rect height={14} width={6} x={80} y={108} />
                      <rect height={6} width={12} x={94} y={92} />
                      <rect height={12} width={14} x={112} y={92} />
                      <rect height={12} width={8} x={94} y={112} />
                      <rect height={8} width={18} x={110} y={118} />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-9 h-9 rounded-full bg-primary-container text-on-primary flex items-center justify-center shadow-lg transform hover:scale-110 transition-transform">
                        <span className="material-symbols-outlined text-[18px]">favorite</span>
                      </div>
                    </div>
                  </div>
                </div>
                <p className="font-body-sm text-body-sm text-on-surface-variant px-space-sm">
                  In trên thiệp cưới, lưu vào album hoặc đặt mã QR trên bàn tiệc kỷ niệm để bạn bè quét xem tức thì.
                </p>
                <div className="flex items-center gap-space-xs w-full pt-space-xs">
                  <button className="flex-1 py-space-sm px-space-xs rounded-full bg-surface-container hover:bg-surface-container-high text-on-surface font-label-md text-label-md flex items-center justify-center gap-space-xs transition-colors" type="button">
                    <span className="material-symbols-outlined text-[16px] text-primary">download</span>
                    <span>Tải ảnh QR (PNG)</span>
                  </button>
                  <button className="py-space-sm px-space-md rounded-full bg-surface-container hover:bg-surface-container-high text-on-surface font-label-md text-label-md flex items-center justify-center gap-space-xs transition-colors" title="Ghi vào thẻ chạm NFC kỷ niệm" type="button">
                    <span className="material-symbols-outlined text-[16px] text-tertiary">nfc</span>
                    <span>Thẻ NFC</span>
                  </button>
                </div>
              </div>
              <div className="flex flex-col gap-space-xs pt-space-xs">
                <span className="font-label-sm text-label-sm text-on-surface-variant font-medium text-center">Gửi nhanh qua ứng dụng</span>
                <div className="grid grid-cols-6 gap-space-xs justify-items-center">
                  <button className="w-10 h-10 rounded-full bg-surface-container-lowest hover:bg-primary-fixed flex items-center justify-center text-primary shadow-sm hover:scale-110 transition-all" title="Gửi qua Zalo" type="button">
                    <span className="font-bold text-[13px] tracking-tight">Zalo</span>
                  </button>
                  <button className="w-10 h-10 rounded-full bg-surface-container-lowest hover:bg-primary-fixed flex items-center justify-center text-primary shadow-sm hover:scale-110 transition-all" title="Gửi qua Messenger" type="button">
                    <span className="material-symbols-outlined text-[18px]">chat</span>
                  </button>
                  <button className="w-10 h-10 rounded-full bg-surface-container-lowest hover:bg-primary-fixed flex items-center justify-center text-primary shadow-sm hover:scale-110 transition-all" title="Chia sẻ Facebook" type="button">
                    <span className="material-symbols-outlined text-[18px]">auto_stories</span>
                  </button>
                  <button className="w-10 h-10 rounded-full bg-surface-container-lowest hover:bg-primary-fixed flex items-center justify-center text-primary shadow-sm hover:scale-110 transition-all" title="Instagram Direct" type="button">
                    <span className="material-symbols-outlined text-[18px]">photo_camera</span>
                  </button>
                  <button className="w-10 h-10 rounded-full bg-surface-container-lowest hover:bg-primary-fixed flex items-center justify-center text-primary shadow-sm hover:scale-110 transition-all" title="Tin nhắn SMS" type="button">
                    <span className="material-symbols-outlined text-[18px]">sms</span>
                  </button>
                  <button className="w-10 h-10 rounded-full bg-surface-container-lowest hover:bg-primary-fixed flex items-center justify-center text-primary shadow-sm hover:scale-110 transition-all" title="Sao chép mã nhúng thiệp" type="button">
                    <span className="material-symbols-outlined text-[18px]">code</span>
                  </button>
                </div>
              </div>
              <div className="p-space-sm rounded-DEFAULT bg-surface-container-lowest shadow-sm flex items-center gap-space-sm">
                <div className="w-14 h-14 rounded-DEFAULT overflow-hidden shrink-0 bg-surface-container">
                  <img className="w-full h-full object-cover" data-alt="Intimate close-up of Vietnamese couple holding hands on Pont des Arts in Paris, showing gold engagement ring in soft morning light, candid romantic aesthetic." src="https://lh3.googleusercontent.com/aida-public/AB6AXuCSQWjhnBIj0i5y8dBgdaUu61oLsf3-e8iMOI6t3udkzZwA_D18-GnhkP76pyhn49CRmMkr9DguZmc72X1kPLeDXfu2AOaJo_4jM94ddReCfoowi6st3qm9TLxkTFJ5Sq4DZNlDJbQuSBBDMnoUs2H5SPtjE1uZv_2FlBuiLY9VyQ2vkTarB8OTJH1tPmCJPYSK_ET8xm0lOMpJpegs3VeX3g_OkY_touEMorelx4eOVZAauiyZIrba" />
                </div>
                <div className="flex-1 min-w-0">
                  <span className="font-title-md text-title-md text-on-surface truncate block">Xem trước giao diện khách</span>
                  <p className="font-body-sm text-body-sm text-on-surface-variant truncate">Trình chiếu thiệp lật tương tác &amp; album nhạc</p>
                </div>
                <span className="material-symbols-outlined text-primary text-[20px]">visibility</span>
              </div>
            </div>
          </div>
          <div className="px-space-xl py-space-md bg-surface-container-low/40 flex flex-col sm:flex-row items-center justify-between gap-space-md">
            <div className="flex items-center gap-space-xs text-on-surface-variant">
              <span className="material-symbols-outlined text-[16px] text-primary">favorite</span>
              <span className="font-label-sm text-label-sm">
                Bảo Long &amp; An Nhiên • Paris, 2024 • Mã hóa bảo mật bởi CoupleStory Vault
              </span>
            </div>
            <div className="flex items-center gap-space-sm w-full sm:w-auto justify-end">
              <button className="px-space-lg py-space-sm rounded-full text-on-surface hover:bg-surface-container transition-all font-label-md text-label-md" onClick={() => {}} type="button">
                Quay lại Trình Soạn Thảo
              </button>
              <a className="px-space-xl py-space-sm rounded-full bg-primary-container text-on-primary hover:bg-primary transition-all font-label-md text-label-md shadow-lg shadow-primary/25 hover:shadow-primary/40 hover:scale-[1.02] flex items-center gap-space-xs" href="#" target="_blank">
                <span>Xem Trang Kỷ Niệm Ngay</span>
                <span className="material-symbols-outlined text-[18px]">north_east</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div></main><footer className="w-full bg-surface-container-low mt-space-xl"><div className="w-full px-margin py-space-xl flex flex-col md:flex-row items-center justify-between gap-space-md text-on-surface-variant"><div className="flex items-center gap-space-xs"><span className="material-symbols-outlined text-primary text-[20px]">favorite</span><span className="font-headline-md text-title-md text-on-surface">CoupleStory</span><span className="text-body-sm font-body-sm">— Nơi gìn giữ từng khoảnh khắc tình yêu</span></div><div className="flex items-center gap-space-lg text-label-sm font-label-sm"><a className="hover:text-primary transition-colors" data-path="kho-giao-dien" href="#">Kho Giao Diện</a><a className="hover:text-primary transition-colors" data-path="bang-gia" href="/pricing">Bảng Giá</a><a className="hover:text-primary transition-colors" data-path="dashboard" href="/home">Chính Sách Quyền Riêng Tư</a></div><div className="text-label-sm font-label-sm text-on-surface-variant">© 2025 CoupleStory SaaS. Thiết kế cho những đôi lứa hạnh phúc.</div></div></footer><div className="hidden fixed inset-0 z-50 flex items-center justify-center p-space-md bg-inverse-surface/40 backdrop-blur-sm" id="publish-share-modal"><div className="bg-surface-container-lowest rounded-xl max-w-lg w-full p-space-lg shadow-[0_20px_48px_-8px_rgba(26,10,18,0.16)] flex flex-col gap-space-lg"><div className="flex items-start justify-between"><div className="flex flex-col gap-space-xs"><span className="font-headline-md text-headline-md text-on-surface">Publish &amp; Share Story</span><p className="font-body-sm text-body-sm text-on-surface-variant">Sẵn sàng gửi gắm câu chuyện tình yêu của hai bạn đến người thân và bạn bè.</p></div><button className="w-8 h-8 rounded-full flex items-center justify-center bg-surface-container-low text-on-surface-variant hover:text-on-surface hover:bg-surface-container transition-all" onClick={() => {}} type="button"><span className="material-symbols-outlined text-[20px]">close</span></button></div><div className="flex flex-col gap-space-md"><div className="bg-surface-container-low p-space-md rounded-lg flex flex-col gap-space-xs"><span className="font-label-sm text-label-sm text-tertiary uppercase tracking-wider font-semibold">Liên kết công khai</span><div className="flex items-center gap-space-sm"><input className="w-full bg-surface-container-lowest text-on-surface font-body-sm text-body-sm px-space-md py-space-sm rounded-full outline-none" readOnly type="text" defaultValue="https://couplestory.app/stories/linh-minh-2025" /><button className="px-space-md py-space-sm rounded-full bg-primary-container text-on-primary font-label-md text-label-md flex items-center gap-space-xs shrink-0 hover:bg-primary transition-all" type="button"><span className="material-symbols-outlined text-[16px]">content_copy</span><span>Sao chép</span></button></div></div><div className="grid grid-cols-2 gap-space-sm"><div className="p-space-md rounded-lg bg-surface-container flex flex-col gap-space-xs"><div className="flex items-center gap-space-xs text-primary"><span className="material-symbols-outlined text-[18px]">lock_open</span><span className="font-label-md text-label-md font-semibold">Chế độ xem</span></div><span className="font-body-sm text-body-sm text-on-surface-variant">Ai có đường dẫn đều có thể xem thiệp &amp; kỷ niệm.</span></div><div className="p-space-md rounded-lg bg-surface-container flex flex-col gap-space-xs"><div className="flex items-center gap-space-xs text-primary"><span className="material-symbols-outlined text-[18px]">qr_code_2</span><span className="font-label-md text-label-md font-semibold">Mã QR Thiệp Cưới</span></div><span className="font-body-sm text-body-sm text-on-surface-variant">Sẵn sàng tải về để in ấn lên phong bao hoặc thiệp mời.</span></div></div></div><div className="flex items-center justify-end gap-space-sm pt-space-xs"><button className="px-space-md py-space-sm rounded-full text-on-surface-variant hover:text-on-surface hover:bg-surface-container font-label-md text-label-md transition-all" onClick={() => {}} type="button">Để sau</button><button className="px-space-lg py-space-sm rounded-full bg-primary text-on-primary font-label-md text-label-md shadow-[0_4px_16px_rgba(185,10,90,0.2)] hover:bg-primary-container transition-all" onClick={() => {}} type="button">Xác nhận Xuất Bản</button></div></div></div>
</div>

      </div>
    </div>
  );
}

