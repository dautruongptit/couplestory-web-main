export default function ForgotPassword() {
  return (
    <div className="min-h-screen">
<main className="min-h-screen w-full flex flex-col justify-center"><div className="flex flex-col w-full">
    <div className="w-full min-h-[calc(100vh-2rem)] flex flex-col lg:flex-row shadow-2xl rounded-xl overflow-hidden my-4 max-w-[1400px] mx-auto">
      <div className="relative w-full lg:w-1/2 p-8 lg:p-16 flex flex-col justify-between overflow-hidden bg-gradient-to-b from-[#ff4d8d] via-[#5b1b3c] to-[#1a0a12] text-on-primary select-none">
        <div className="absolute inset-0 pointer-events-none opacity-40 mix-blend-screen">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <circle cx="15%" cy="20%" fill="#ffe4b5" opacity="0.9" r="1.5" />
            <circle cx="85%" cy="15%" fill="#ffd700" opacity="0.8" r={2} />
            <circle cx="35%" cy="35%" fill="#fff" opacity="0.7" r={1} />
            <circle cx="70%" cy="40%" fill="#ffe4b5" opacity="0.85" r="1.5" />
            <circle cx="20%" cy="65%" fill="#ffd700" opacity="0.6" r={2} />
            <circle cx="80%" cy="75%" fill="#fff" opacity="0.7" r={1} />
            <circle cx="50%" cy="85%" fill="#ffe4b5" opacity="0.75" r="1.5" />
            <circle cx="90%" cy="90%" fill="#ffd700" opacity="0.8" r={2} />
            <circle cx="10%" cy="92%" fill="#fff" opacity="0.6" r="1.5" />
            <path d="M 60 120 Q 62 125 67 127 Q 62 129 60 134 Q 58 129 53 127 Q 58 125 60 120 Z" fill="#ffd9e4" opacity="0.75" />
            <path d="M 420 280 Q 423 287 430 290 Q 423 293 420 300 Q 417 293 410 290 Q 417 287 420 280 Z" fill="#ffe8ef" opacity="0.8" />
            <path d="M 520 640 Q 522 645 527 647 Q 522 649 520 654 Q 518 649 513 647 Q 518 645 520 640 Z" fill="#ffd700" opacity="0.6" />
          </svg>
        </div>
        <div className="relative z-10 flex items-center justify-between">
          <a className="flex items-center gap-2.5 group" href="/">
            <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-primary-container group-hover:scale-105 transition-transform duration-300">
              <span className="material-symbols-outlined text-title-lg" style={{fontVariationSettings: '"FILL" 1'}}>favorite</span>
            </div>
            <span className="font-headline-md text-headline-md tracking-tight text-white flex items-center gap-1">
              CoupleStory
              <span className="text-primary-container text-body-sm">♥</span>
            </span>
          </a>
          <span className="font-label-sm text-label-sm tracking-widest uppercase text-white/60 bg-white/10 px-3 py-1 rounded-full backdrop-blur-sm">
            SaaS Private Archive
          </span>
        </div>
        <div className="relative z-10 my-auto py-10 lg:py-12 max-w-lg">
          <div className="relative mb-8 inline-flex items-center">
            <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-amber-300/20 via-pink-400/30 to-white/10 backdrop-blur-md p-1 shadow-xl flex items-center justify-center">
              <div className="w-full h-full rounded-full bg-[#3d1428]/80 flex items-center justify-center">
                <span className="material-symbols-outlined text-[#ffd700] text-[36px]" style={{fontVariationSettings: '"FILL" 1'}}>lock_person</span>
              </div>
            </div>
            <div className="-ml-4 w-12 h-12 rounded-full bg-[#ff4d8d]/30 backdrop-blur-md flex items-center justify-center text-white shadow-lg">
              <span className="material-symbols-outlined text-title-lg" style={{fontVariationSettings: '"FILL" 1'}}>favorite</span>
            </div>
            <div className="ml-4 px-3 py-1 rounded-full bg-white/15 backdrop-blur-sm text-label-sm font-label-sm text-rose-100 tracking-wide">
              Pont des Arts • Paris 2024
            </div>
          </div>
          <blockquote className="font-headline-xl text-headline-xl font-bold italic text-white tracking-tight leading-[1.2] mb-4 drop-shadow-md">
            “Kỷ niệm thì không bao giờ quên, và tài khoản của bạn cũng thế. Hãy để chúng mình giúp bạn tìm lại nhé.”
          </blockquote>
          <p className="font-headline-md text-headline-md text-[#ffd9e4]/90 italic font-normal tracking-wide mb-6">
            ∼ Love always finds a way home...
          </p>
          <div className="flex items-center gap-3 pt-2">
            <div className="flex -space-x-2">
              <div className="w-8 h-8 rounded-full bg-rose-200 shadow-md flex items-center justify-center text-on-surface text-label-sm font-title-md">
                A
              </div>
              <div className="w-8 h-8 rounded-full bg-primary-container shadow-md flex items-center justify-center text-white text-label-sm font-title-md">
                L
              </div>
            </div>
            <p className="font-body-sm text-body-sm text-white/80">
              Hơn <strong className="text-white font-title-md">34,000+</strong> cặp đôi đang lưu giữ chuyện tình
            </p>
          </div>
        </div>
        <div className="relative z-10 flex items-center gap-3 pt-6 text-white/70 bg-white/5 backdrop-blur-sm p-4 rounded-xl">
          <span className="material-symbols-outlined text-title-lg text-[#ffd700]" style={{fontVariationSettings: '"FILL" 1'}}>support_agent</span>
          <p className="font-body-sm text-body-sm leading-tight text-white/90">
            Đội ngũ hỗ trợ CoupleStory luôn sẵn sàng đồng hành cùng hai bạn 24/7 qua hotline &amp; chat riêng tư.
          </p>
        </div>
      </div>
      <div className="w-full lg:w-1/2 bg-[#fff5f9] p-8 lg:p-16 flex flex-col justify-between text-on-surface">
        <div className="flex items-center justify-between w-full">
          <a className="inline-flex items-center gap-2 font-label-md text-label-md text-secondary hover:text-primary transition-colors py-2 px-3 rounded-full hover:bg-surface-container" href="/login">
            <span className="material-symbols-outlined text-body-md">arrow_back</span>
            <span>Quay lại Đăng nhập</span>
          </a>
          <div className="flex items-center gap-1 font-label-sm text-label-sm text-on-surface-variant bg-surface-container-low px-3 py-1.5 rounded-full shadow-sm">
            <button className="font-bold text-primary px-1 hover:underline" type="button">VI</button>
            <span className="text-outline-variant">|</span>
            <button className="text-on-surface-variant hover:text-primary px-1 hover:underline" type="button">EN</button>
          </div>
        </div>
        <div className="w-full max-w-[440px] mx-auto my-auto py-8 flex flex-col gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-secondary-container text-on-secondary-container font-label-sm text-label-sm">
              <span className="material-symbols-outlined text-body-sm" style={{fontVariationSettings: '"FILL" 1'}}>shield</span>
              Bảo mật kỷ niệm lứa đôi
            </div>
            <h1 className="font-headline-lg text-headline-lg text-[#1a0a12] font-bold tracking-tight">
              Quên mật khẩu?
            </h1>
            <p className="font-body-md text-body-md text-on-surface-variant">
              Đừng lo lắng! Nhập địa chỉ email liên kết với tài khoản của bạn, CoupleStory sẽ gửi một liên kết đặt lại mật khẩu an toàn.
            </p>
          </div>
          <div className="flex p-1 bg-surface-container rounded-full text-label-sm font-label-sm">
            <button className="flex-1 py-1.5 rounded-full bg-surface-container-lowest text-primary shadow-sm font-title-md transition-all" id="tabInputBtn" onClick={() => {}}>
              Nhập Email
            </button>
            <button className="flex-1 py-1.5 rounded-full text-on-surface-variant hover:text-on-surface transition-all" id="tabSentBtn" onClick={() => {}}>
              Đã gửi thành công (Demo)
            </button>
          </div>
          <div className="space-y-5" id="stateForm">
            <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
              <div className="space-y-1.5">
                <label className="block font-label-md text-label-md text-[#3d1f2d]" htmlFor="email">
                  Địa chỉ email đã đăng ký
                </label>
                <div className="relative flex items-center">
                  <span className="absolute left-4 text-on-surface-variant material-symbols-outlined text-body-lg pointer-events-none">
                    mail
                  </span>
                  <input className="w-full h-12 pl-12 pr-4 bg-surface-container-lowest text-on-surface font-body-md text-body-md rounded-[12px] shadow-sm focus:outline-none focus:bg-white placeholder:text-outline-variant transition-all" id="email" name="email" placeholder="long.an@couplestory.site" required type="email" />
                </div>
                <p className="font-body-sm text-body-sm text-on-surface-variant">
                  Gợi ý: Email chung hoặc email của một trong hai bạn đã đăng ký tài khoản.
                </p>
              </div>
              <button className="w-full h-12 bg-primary-container hover:bg-primary text-on-primary font-title-md text-title-md rounded-full flex items-center justify-center gap-2 shadow-lg shadow-primary-container/30 transition-all hover:scale-[1.01] active:scale-[0.99]" type="submit">
                <span>Gửi link đặt lại mật khẩu</span>
                <span className="text-body-lg">✉️</span>
              </button>
            </form>
          </div>
          <div className="hidden space-y-4" id="stateSuccess">
            <div className="bg-surface-container-lowest p-6 rounded-[16px] shadow-md relative overflow-hidden">
              <div className="absolute -right-8 -top-8 w-24 h-24 bg-primary-container/10 rounded-full blur-xl pointer-events-none" />
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-secondary-container flex-shrink-0 flex items-center justify-center text-primary shadow-sm text-title-lg animate-bounce">
                  💌
                </div>
                <div className="space-y-1">
                  <span className="font-label-sm text-label-sm text-primary uppercase tracking-wider font-bold">Thư đã cất cánh</span>
                  <h2 className="font-title-lg text-title-lg text-on-surface font-bold">
                    Kiểm tra hòm thư của bạn!
                  </h2>
                </div>
              </div>
              <p className="mt-4 font-body-md text-body-md text-on-surface-variant leading-relaxed">
                Chúng mình đã gửi liên kết khôi phục tới <strong className="text-on-surface font-title-md">long.an@couplestory.site</strong>. Liên kết có hiệu lực trong vòng <span className="text-primary font-title-md">30 phút</span>.
              </p>
              <div className="mt-6 flex flex-col sm:flex-row items-center gap-3">
                <button className="w-full sm:w-auto flex-1 h-11 px-4 rounded-full bg-surface-container text-on-surface-variant font-label-md text-label-md flex items-center justify-center gap-1.5 opacity-75 cursor-not-allowed" disabled id="countdownBtn" type="button">
                  <span className="material-symbols-outlined text-body-sm">schedule</span>
                  <span id="countdownText">Gửi lại sau 54s</span>
                </button>
                <a className="w-full sm:w-auto flex-1 h-11 px-4 rounded-full bg-primary-container text-on-primary font-label-md text-label-md flex items-center justify-center gap-1.5 shadow-md hover:bg-primary transition-all" href="https://mail.google.com" rel="noopener noreferrer" target="_blank">
                  <span>Mở hòm thư Gmail</span>
                  <span className="material-symbols-outlined text-body-sm">arrow_forward</span>
                </a>
              </div>
              <p className="mt-4 text-center font-body-sm text-body-sm text-outline">
                Không thấy email? Hãy kiểm tra thư mục <em className="not-italic font-title-md text-on-surface-variant">Spam / Quảng cáo</em> nhé.
              </p>
            </div>
          </div>
        </div>
        <div className="w-full max-w-[440px] mx-auto text-center pt-4">
          <p className="font-body-md text-body-md text-on-surface-variant">
            Nhớ mật khẩu rồi? 
            <a className="font-title-md text-primary-container hover:text-primary transition-colors underline decoration-2 underline-offset-4" href="/login">
              Đăng nhập ngay
            </a>
          </p>
        </div>
      </div>
    </div>
  </div></main>

    </div>
  );
}
