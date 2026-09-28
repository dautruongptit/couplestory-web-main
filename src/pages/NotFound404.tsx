export default function NotFound404() {
  return (
    <div className="min-h-screen">
<div>
  <header className="w-full py-space-lg px-gutter-mobile md:px-margin"><div className="max-w-7xl mx-auto flex items-center justify-between"><a className="flex items-center gap-space-xs text-on-surface hover:text-primary transition-colors" data-path="home" href="#"><span className="material-symbols-outlined text-primary text-[28px]">favorite</span><span className="font-headline-md text-headline-md tracking-tight font-serif">CoupleStory</span></a><nav className="flex items-center gap-space-md" data-active-classes="text-primary font-semibold"><a className="font-label-md text-label-md text-on-surface-variant hover:text-primary transition-colors" data-path="explore-templates" href="#">Templates</a><a className="font-label-md text-label-md text-on-surface-variant hover:text-primary transition-colors" data-path="home" href="#">Home</a></nav></div></header><main className="w-full flex-1 flex items-center justify-center px-gutter-mobile md:px-margin py-space-xl"><div className="flex flex-col w-full">
      <div className="relative w-full max-w-6xl mx-auto flex flex-col items-center justify-center">
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-96 h-96 sm:w-[540px] sm:h-[540px] bg-primary-fixed/30 rounded-full blur-3xl pointer-events-none -z-10" />
        <div className="absolute top-1/3 -left-20 w-72 h-72 bg-secondary-container/40 rounded-full blur-2xl pointer-events-none -z-10" />
        <div className="absolute top-1/4 -right-16 w-80 h-80 bg-tertiary-fixed/35 rounded-full blur-2xl pointer-events-none -z-10" />
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto relative px-space-sm sm:px-space-md">
          <div className="inline-flex items-center gap-space-xs px-space-md py-1.5 rounded-full bg-surface-container-high/80 backdrop-blur-md shadow-sm mb-space-lg">
            <span className="material-symbols-outlined text-primary text-[18px]" style={{fontVariationSettings: '"FILL" 1'}}>auto_awesome</span>
            <span className="font-label-md text-label-md text-on-surface-variant tracking-wider uppercase">Chương truyện chưa tìm thấy</span>
            <span className="w-1.5 h-1.5 rounded-full bg-primary/40 ml-1" />
          </div>
          <div className="relative flex items-center justify-center select-none mb-space-md">
            <div className="font-headline-xl text-[92px] sm:text-[140px] md:text-[170px] leading-none font-serif tracking-tight text-primary/15 font-bold">
              404
            </div>
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <svg className="w-44 h-44 sm:w-56 sm:h-56 text-primary drop-shadow-md" fill="none" viewBox="0 0 200 200">
                <path className="opacity-40 animate-pulse" d="M40 100 C 40 60, 95 60, 100 95 C 105 60, 160 60, 160 100 C 160 145, 100 175, 100 175 C 100 175, 40 145, 40 100 Z" stroke="currentColor" strokeDasharray="4 4" strokeWidth="1.75" />
                <path className="opacity-80" d="M55 100 C 55 72, 95 72, 100 98 C 105 72, 145 72, 145 100 C 145 136, 100 162, 100 162 C 100 162, 55 136, 55 100 Z" stroke="currentColor" strokeWidth="2.5" />
                <circle className="text-primary-container" cx={100} cy={98} fill="currentColor" r="4.5" />
                <circle className="opacity-70" cx={70} cy={85} fill="currentColor" r="2.5" />
                <circle className="opacity-70" cx={130} cy={85} fill="currentColor" r="2.5" />
                <circle className="text-primary" cx={100} cy={162} fill="currentColor" r="3.5" />
              </svg>
            </div>
            <div className="absolute -top-2 right-4 sm:right-10 px-3 py-1 rounded-full bg-surface-container-lowest/90 shadow-md backdrop-blur-sm text-secondary flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[15px] text-primary" style={{fontVariationSettings: '"FILL" 1'}}>favorite</span>
              <span className="font-label-sm text-label-sm font-semibold">Trang riêng tư</span>
            </div>
          </div>
          <h1 className="font-headline-lg text-headline-lg md:text-headline-xl text-on-surface font-serif tracking-tight mb-space-sm">
            Lạc mất dấu một kỷ niệm...
          </h1>
          <p className="font-body-lg text-body-lg text-on-surface-variant max-w-xl mx-auto leading-relaxed mb-space-xl">
            Trang web kỷ niệm hoặc đường dẫn bạn đang tìm kiếm hiện không tồn tại, đã được chuyển sang chế độ riêng tư của hai người, hoặc câu chuyện đã sang một chương mới rực rỡ hơn.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-space-sm sm:gap-space-md w-full max-w-md">
            <a className="w-full sm:w-auto px-7 py-3.5 rounded-full bg-primary-container hover:bg-primary text-on-primary font-label-md text-label-md transition-all duration-300 shadow-md hover:shadow-lg hover:-translate-y-0.5 flex items-center justify-center gap-2 group" data-path="home" href="#">
              <span className="material-symbols-outlined text-[19px] transition-transform group-hover:scale-110" style={{fontVariationSettings: '"FILL" 1'}}>favorite</span>
              <span>Về Trang Chủ CoupleStory</span>
            </a>
            <a className="w-full sm:w-auto px-6 py-3.5 rounded-full bg-surface-container-lowest hover:bg-surface-container-low text-on-surface font-label-md text-label-md transition-all duration-300 shadow-sm hover:shadow-md flex items-center justify-center gap-2" data-path="explore-templates" href="#">
              <span className="material-symbols-outlined text-[19px] text-secondary">style</span>
              <span>Khám Phá Mẫu Template</span>
            </a>
          </div>
          <div className="mt-space-md flex items-center gap-2">
            <a className="inline-flex items-center gap-1.5 font-body-sm text-body-sm text-secondary hover:text-primary transition-colors py-1" data-path="support" href="#">
              <span className="material-symbols-outlined text-[16px]">help_outline</span>
              <span>Cần tìm lại liên kết câu chuyện? Liên hệ hỗ trợ</span>
            </a>
          </div>
        </div>
        <div className="w-full mt-space-xl pt-space-lg">
          <div className="flex items-center justify-between mb-space-md px-1">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-primary-container" />
              <h2 className="font-title-lg text-title-lg text-on-surface font-semibold">
                Có thể bạn đang tìm kiếm?
              </h2>
            </div>
            <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider hidden sm:inline-block">Tuyển chọn gợi ý</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-space-md w-full">
            <div className="group p-space-md rounded-lg bg-surface-container-lowest hover:bg-surface-container-low transition-all duration-300 shadow-sm hover:shadow-md flex flex-col justify-between">
              <div>
                <div className="relative w-full h-44 rounded overflow-hidden mb-space-sm bg-surface-container">
                  <img className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" data-alt="A soft, warm romantic photograph of a happy couple walking on an ocean shore during golden hour sunset, cinematic lighting, editorial wedding magazine aesthetic with pale pink and blush champagne tones." src="https://lh3.googleusercontent.com/aida-public/AB6AXuDBWGphcylmAI-It6AUhtvL6EeDgKn_Hlf-jI5HB3CA80b9DS98um5_5L3Beqq3N4eJMJ3LS26p41mzlDkLVwbFaN6HaWc3pNcJibe1_C7LgUDHGnWLkkPVIvXnG8pkJwD9_Dt4F_JYDyKSwc9cbeeT-GWNhGm_sId7cPDluzOeWN2uiTzT8pYMkPgmnSHJzU4V5tzuYjzmshdx6ZOxTv9fhJbwdcl7wEv_aZjsp7_yEG_R_kc0AoJe" />
                  <div className="absolute top-2.5 right-2.5 bg-surface-container-lowest/85 backdrop-blur-sm px-2.5 py-1 rounded-full text-primary font-label-sm text-label-sm font-semibold flex items-center gap-1">
                    <span className="material-symbols-outlined text-[14px]">auto_stories</span>
                    <span>Editorial</span>
                  </div>
                </div>
                <h3 className="font-title-md text-title-md text-on-surface font-semibold group-hover:text-primary transition-colors">
                  Mẫu Minimal Couple
                </h3>
                <p className="font-body-sm text-body-sm text-on-surface-variant mt-1 leading-relaxed">
                  Phong cách tạp chí nghệ thuật, thanh lịch và ấm áp cho từng khoảnh khắc đời thường.
                </p>
              </div>
              <div className="mt-space-md pt-space-sm flex items-center justify-between">
                <span className="font-label-sm text-label-sm text-secondary font-medium">Bản trình diễn có sẵn</span>
                <a className="inline-flex items-center gap-1 font-label-md text-label-md text-primary font-semibold hover:underline" data-path="explore-templates" href="#">
                  <span>Xem bản demo</span>
                  <span className="material-symbols-outlined text-[16px] transition-transform group-hover:translate-x-1">arrow_forward</span>
                </a>
              </div>
            </div>
            <div className="group p-space-md rounded-lg bg-surface-container-lowest hover:bg-surface-container-low transition-all duration-300 shadow-sm hover:shadow-md flex flex-col justify-between">
              <div>
                <div className="relative w-full h-44 rounded overflow-hidden mb-space-sm bg-surface-container">
                  <img className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" data-alt="An intimate candlelit dinner setting for two on a balcony overlooking twilight city lights, soft ambient bokeh, deep rose and warm wine reflections, sophisticated romantic mood." src="https://lh3.googleusercontent.com/aida-public/AB6AXuCYaacrxQjpXrDaWEADUD1i_4Z9DGItfbnSpZfy0MF4c6s4gwvyLyue4BDwhot-N-xolpmtvTUzgg3zjBHr19aOmMC3mN7Sbx_bnfLTnLAnkrWAefWfrvr8nJiucn_3N296jFWRqm3QDKbV5kukKKwDBnrl9jOYZ9kLww1duCdYQ7Zjs-pNGIyjJZb2a06-6NXDXVqmLZrUFpvO3Z5OQphuzFN2nkHTF9FzHMqe48HFjk09XuzrgBLF" />
                  <div className="absolute top-2.5 right-2.5 bg-surface-container-lowest/85 backdrop-blur-sm px-2.5 py-1 rounded-full text-secondary font-label-sm text-label-sm font-semibold flex items-center gap-1">
                    <span className="material-symbols-outlined text-[14px]">movie</span>
                    <span>Cinema</span>
                  </div>
                </div>
                <h3 className="font-title-md text-title-md text-on-surface font-semibold group-hover:text-primary transition-colors">
                  Mẫu Eternal Love
                </h3>
                <p className="font-body-sm text-body-sm text-on-surface-variant mt-1 leading-relaxed">
                  Dạ tiệc điện ảnh với âm nhạc tùy biến, lưu giữ lời thề nguyền và tình yêu vĩnh cửu.
                </p>
              </div>
              <div className="mt-space-md pt-space-sm flex items-center justify-between">
                <span className="font-label-sm text-label-sm text-secondary font-medium">Được yêu thích nhất</span>
                <a className="inline-flex items-center gap-1 font-label-md text-label-md text-primary font-semibold hover:underline" data-path="explore-templates" href="#">
                  <span>Xem bản demo</span>
                  <span className="material-symbols-outlined text-[16px] transition-transform group-hover:translate-x-1">arrow_forward</span>
                </a>
              </div>
            </div>
            <div className="group p-space-md rounded-lg bg-surface-container-high/60 hover:bg-surface-container-high transition-all duration-300 shadow-sm hover:shadow-md flex flex-col justify-between relative overflow-hidden">
              <div className="absolute -bottom-8 -right-8 w-36 h-36 bg-primary-fixed/50 rounded-full blur-xl pointer-events-none" />
              <div>
                <div className="w-12 h-12 rounded-full bg-surface-container-lowest text-primary flex items-center justify-center shadow-sm mb-space-md">
                  <span className="material-symbols-outlined text-[26px]" style={{fontVariationSettings: '"FILL" 1'}}>draw</span>
                </div>
                <div className="inline-block px-2.5 py-0.5 rounded-full bg-secondary-container text-on-secondary-container font-label-sm text-label-sm font-semibold mb-2">
                  Dành cho hai bạn
                </div>
                <h3 className="font-title-md text-title-md text-on-surface font-semibold">
                  Bắt đầu viết nên câu chuyện của hai bạn
                </h3>
                <p className="font-body-sm text-body-sm text-on-surface-variant mt-1 leading-relaxed">
                  Tạo trang web kỷ niệm đôi, timeline tình yêu và thư tay trực tuyến riêng tư chỉ trong 3 phút.
                </p>
              </div>
              <div className="mt-space-md pt-space-sm">
                <a className="w-full py-2.5 px-4 rounded-full bg-primary-container text-on-primary font-label-md text-label-md font-semibold flex items-center justify-center gap-1.5 transition-all duration-300 shadow-sm hover:shadow hover:bg-primary" data-path="explore-templates" href="#">
                  <span>Bắt đầu miễn phí</span>
                  <span className="material-symbols-outlined text-[16px]">arrow_back_ios_new</span>
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-space-xl mb-space-sm max-w-xl mx-auto text-center px-space-md">
          <div className="p-space-md rounded-xl bg-surface-container-low/70 backdrop-blur-sm shadow-sm flex items-center justify-center gap-3">
            <span className="material-symbols-outlined text-primary text-[22px] shrink-0" style={{fontVariationSettings: '"FILL" 1'}}>favorite_border</span>
            <p className="font-body-md text-body-md text-on-surface-variant italic font-serif">
              “Dù đi lạc một trang web, đừng quên người bạn yêu đang chờ ở cuối con đường.”
            </p>
          </div>
        </div>
      </div>
    </div></main><footer className="w-full py-space-md px-gutter-mobile md:px-margin"><div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-space-sm text-center"><p className="font-body-sm text-body-sm text-on-surface-variant">© 2024 CoupleStory. Cherishing shared moments.</p><div className="flex items-center gap-space-md"><a className="font-body-sm text-body-sm text-on-surface-variant hover:text-on-surface transition-colors" data-path="support" href="#">Support</a><a className="font-body-sm text-body-sm text-on-surface-variant hover:text-on-surface transition-colors" data-path="privacy-policy" href="#">Privacy</a></div></div></footer>
</div>

    </div>
  );
}
