export default function TemplateMinimalCouple() {
  return (
    <div className="min-h-screen">
<div>
  <div aria-label="Story reading progress" className="fixed top-0 left-0 right-0 h-[3px] bg-primary-container z-50 pointer-events-none transition-all duration-150" role="progressbar" /><main className="w-full bg-background relative z-10"><div className="flex flex-col w-full">
      <section className="relative w-full max-w-[1280px] mx-auto px-6 lg:px-12 pt-8 pb-20 overflow-hidden">
        <div className="absolute -top-32 -left-20 w-96 h-96 bg-primary-fixed/40 rounded-full blur-3xl pointer-events-none -z-10" />
        <div className="absolute top-1/3 -right-24 w-[30rem] h-[30rem] bg-secondary-container/30 rounded-full blur-3xl pointer-events-none -z-10" />
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between border-b-0 pb-6 mb-10 gap-4">
          <div className="flex items-center gap-3">
            <span className="px-3 py-1 bg-surface-container text-primary text-label-sm font-label-sm tracking-widest rounded-full uppercase">Issue No. 01</span>
            <span className="text-tertiary text-label-md font-label-md tracking-wider uppercase">Our Love Story</span>
          </div>
          <div className="flex items-center gap-2 text-on-surface-variant font-label-md text-label-md">
            <span className="material-symbols-outlined text-[16px] text-primary" style={{fontVariationSettings: '"FILL" 1'}}>favorite</span>
            <span>bao-long-an-nhien.couplestory.site</span>
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-6 flex flex-col gap-6 order-2 lg:order-1">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-surface-container-low text-primary rounded-full w-fit">
              <span className="material-symbols-outlined text-[15px]" style={{fontVariationSettings: '"FILL" 1'}}>arrow_back_ios_new</span>
              <span className="font-label-sm text-label-sm tracking-wide">14.02.2021 — MÃI MÃI VỀ SAU</span>
            </div>
            <div className="space-y-3">
              <h1 className="font-headline-xl text-headline-xl text-on-surface tracking-tight leading-tight">
                Bảo Long <br className="hidden sm:inline" />
                <span className="italic font-light text-tertiary">&amp;</span> An Nhiên
              </h1>
              <p className="font-title-md text-title-md text-primary italic font-normal">
                "Từ cái nhìn đầu tiên tại góc phố mùa thu..."
              </p>
            </div>
            <div className="p-6 sm:p-8 bg-surface-container-lowest rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 relative overflow-hidden">
              <div className="absolute right-0 top-0 translate-x-4 -translate-y-4 w-28 h-28 bg-surface-container rounded-full opacity-50 pointer-events-none" />
              <div className="flex flex-col gap-3 relative z-10">
                <span className="text-label-sm font-label-sm tracking-widest uppercase text-tertiary font-bold">Thời gian bên nhau</span>
                <div className="flex items-baseline gap-3 flex-wrap">
                  <span className="font-headline-xl text-headline-xl text-primary font-bold tracking-tighter" id="milestone-counter">1,000</span>
                  <span className="font-headline-md text-headline-md text-on-surface font-semibold tracking-wide">NGÀY YÊU NHAU</span>
                </div>
                <div className="grid grid-cols-3 gap-3 pt-4 mt-2">
                  <div className="flex flex-col p-3 rounded-DEFAULT bg-surface-container-low text-center">
                    <span className="font-headline-md text-headline-md text-on-surface font-bold">02</span>
                    <span className="font-label-sm text-label-sm text-on-surface-variant uppercase">Năm</span>
                  </div>
                  <div className="flex flex-col p-3 rounded-DEFAULT bg-surface-container-low text-center">
                    <span className="font-headline-md text-headline-md text-on-surface font-bold">08</span>
                    <span className="font-label-sm text-label-sm text-on-surface-variant uppercase">Tháng</span>
                  </div>
                  <div className="flex flex-col p-3 rounded-DEFAULT bg-surface-container-low text-center">
                    <span className="font-headline-md text-headline-md text-on-surface font-bold">24</span>
                    <span className="font-label-sm text-label-sm text-on-surface-variant uppercase">Ngày</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between p-3.5 px-5 bg-surface-container-lowest/90 backdrop-blur-md rounded-full shadow-sm text-on-surface">
              <div className="flex items-center gap-3 min-w-0">
                <button aria-label="Play or pause love soundtrack" className="w-10 h-10 rounded-full bg-primary-container text-on-primary flex items-center justify-center hover:scale-105 active:scale-95 transition-transform shrink-0" id="audio-toggle-btn">
                  <span className="material-symbols-outlined text-[20px]" id="audio-icon" style={{fontVariationSettings: '"FILL" 1'}}>play_arrow</span>
                </button>
                <div className="flex flex-col min-w-0">
                  <span className="font-title-md text-title-md truncate text-on-surface leading-tight">Until I Found You</span>
                  <span className="font-body-sm text-body-sm text-tertiary truncate leading-tight">Stephen Sanchez</span>
                </div>
              </div>
              <div className="hidden sm:flex items-center gap-2 w-32">
                <div className="h-1.5 w-full bg-surface-container-high rounded-full overflow-hidden">
                  <div className="h-full bg-primary-container rounded-full w-2/3 animate-pulse" />
                </div>
                <span className="font-label-sm text-label-sm text-on-surface-variant">02:45</span>
              </div>
              <div className="flex items-center gap-1 text-primary">
                <span className="material-symbols-outlined text-[18px]">graphic_eq</span>
              </div>
            </div>
          </div>
          <div className="lg:col-span-6 relative order-1 lg:order-2 flex justify-center">
            <div className="relative w-full max-w-[460px] aspect-[4/5] rounded-xl overflow-hidden shadow-xl bg-surface-container">
              <img alt="Bảo Long & An Nhiên" className="w-full h-full object-cover" data-alt="Intimate film photography of an East Asian couple, Bao Long and An Nhien, laughing warmly with foreheads touching in soft golden hour autumn sunlight, wearing minimalist cream cashmere sweaters against a blurred warm park backdrop." src="https://lh3.googleusercontent.com/aida-public/AB6AXuAz1lX_3cFtZKTFttUPAeW5_D0vEaX7yxgl8VdXYUC3hmhyD5ylF_EGX4ScGDz8kvF4t-MfK_--d6S63gYccZoNxgXxzW1tCv0UgmeGsz0VjZgAYjhdAKuL_cJleyzTwbNHlDRczAMyEuYpsJszz9gvIEmuXuUP2IQEbzrC9TjXSSDxEGOQGOHIF_LS59iVaYeICi-3WXZ4kKfuGsAxNNTCAv_NzUvI8pqqv-rEVniAFoHZrKKPbs31" />
              <div className="absolute inset-0 bg-gradient-to-t from-on-surface/40 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between text-on-primary">
                <div>
                  <p className="font-label-sm text-label-sm tracking-widest uppercase opacity-90">Hà Nội, Mùa Thu</p>
                  <p className="font-headline-md text-headline-md tracking-tight">Kỷ Niệm 1,000 Ngày</p>
                </div>
                <div className="w-12 h-12 rounded-full bg-surface-container-lowest/30 backdrop-blur-md flex items-center justify-center">
                  <span className="material-symbols-outlined text-white text-[24px]">favorite</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="w-full bg-surface-container-low/70 py-24 px-6 relative">
        <div className="max-w-[760px] mx-auto text-center relative flex flex-col items-center">
          <div className="w-16 h-16 rounded-full bg-surface-container flex items-center justify-center text-primary-container mb-6 shadow-sm">
            <span className="material-symbols-outlined text-[32px]" style={{fontVariationSettings: '"FILL" 1'}}>format_quote</span>
          </div>
          <span className="font-label-sm text-label-sm tracking-widest uppercase text-tertiary font-bold mb-2">Thư Tình Cho Em</span>
          <h2 className="font-headline-lg text-headline-lg text-on-surface mb-8">Chương đầu tiên của chúng mình</h2>
          <div className="relative p-8 sm:p-12 bg-surface-container-lowest rounded-xl shadow-sm space-y-6 text-left">
            <p className="font-body-lg text-body-lg text-on-surface leading-relaxed first-letter:font-headline-xl first-letter:text-headline-xl first-letter:text-primary first-letter:font-bold first-letter:float-left first-letter:mr-3 first-letter:leading-none">
              Gửi An Nhiên của anh,
            </p>
            <p className="font-body-lg text-body-lg text-on-surface-variant leading-relaxed">
              1,000 ngày qua cùng em là chuyến hành trình kỳ diệu nhất cuộc đời anh. Cảm ơn em vì đã luôn dịu dàng, luôn nắm chặt tay anh qua từng nẻo đường, những chiều cà phê ngắm mưa Tây Hồ và những chuyến đi không hồi kết.
            </p>
            <p className="font-body-lg text-body-lg text-on-surface-variant leading-relaxed">
              Thế giới ngoài kia có thể xô bồ, nhưng chỉ cần tựa đầu vào vai em, mọi ồn ào đều hoá thành bình yên. Cảm ơn em vì đã chọn cùng anh viết nên những trang sách rực rỡ nhất của thanh xuân.
            </p>
            <div className="pt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between border-t-0 gap-4">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-primary-container" />
                <span className="font-label-md text-label-md text-tertiary">Mãi yêu em, trọn vẹn từng khoảnh khắc</span>
              </div>
              <div className="text-right">
                <span className="font-headline-md text-headline-md text-primary font-serif italic">Bảo Long ♥ An Nhiên</span>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="w-full max-w-[1080px] mx-auto px-6 py-24">
        <div className="text-center max-w-xl mx-auto mb-16 space-y-2">
          <span className="px-3.5 py-1 bg-surface-container text-primary font-label-sm text-label-sm tracking-widest rounded-full uppercase">Cột Mốc Tình Yêu</span>
          <h2 className="font-headline-lg text-headline-lg text-on-surface">Dòng thời gian yêu thương</h2>
          <p className="font-body-md text-body-md text-on-surface-variant">Những viên gạch đầu tiên xây nên mái nhà hạnh phúc</p>
        </div>
        <div className="relative">
          <div className="absolute left-4 md:left-1/2 top-4 bottom-4 w-[2px] bg-secondary-container -translate-x-1/2" />
          <div className="space-y-16">
            <div className="relative flex flex-col md:flex-row items-start md:items-center gap-8 pl-12 md:pl-0">
              <div className="w-full md:w-1/2 md:text-right md:pr-12 space-y-2 order-2 md:order-1">
                <span className="inline-block px-3 py-1 bg-surface-container text-primary font-label-sm text-label-sm rounded-full">14 / 02 / 2021</span>
                <h3 className="font-headline-md text-headline-md text-on-surface">Lần Đầu Gặp Gỡ</h3>
                <p className="font-body-md text-body-md text-on-surface-variant">Quán cà phê sách ngập nắng Tây Hồ. Một cuốn sách rơi, một nụ cười chạm mắt, và câu chuyện của chúng mình bắt đầu từ tách latte ấm.</p>
              </div>
              <div className="absolute left-4 md:left-1/2 w-6 h-6 rounded-full bg-primary-container -translate-x-1/2 flex items-center justify-center shadow-md order-1 md:order-2">
                <div className="w-2.5 h-2.5 rounded-full bg-surface-container-lowest" />
              </div>
              <div className="w-full md:w-1/2 md:pl-12 order-3">
                <div className="w-full max-w-sm aspect-[4/3] rounded-lg overflow-hidden shadow-sm bg-surface-container">
                  <img alt="Lần đầu gặp gỡ" className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" data-alt="Cozy bookstore cafe bathed in warm morning sunlight overlooking West Lake Hanoi with vintage wooden bookshelves, ceramic coffee cups, and soft shadows." src="https://lh3.googleusercontent.com/aida-public/AB6AXuBzE2_3nzgyL-z3JFSdJUvKgI4keVmM9Hnp6w5VcGqEJ5d69W-q96L50wdWsrtaWHmFqQMDVbdhJOqa5t5AeZlBYzNfXbWzqvGzJuqzwRyHx4fPnz2AUqsoirj6tm8wDQGHaPuhC48QiqV_DnbHLm9Yx5T5j4HDhG5R3pLCqzw3pum6Z2N-7oXlc_RnFDbeVJ-gHYDYLRg45PBsOUjeZcByCkEmXH6Yp7l_Pkn6Ghg8AAZ2eVKaePor" />
                </div>
              </div>
            </div>
            <div className="relative flex flex-col md:flex-row items-start md:items-center gap-8 pl-12 md:pl-0">
              <div className="w-full md:w-1/2 md:pr-12 md:flex md:justify-end order-2 md:order-1">
                <div className="w-full max-w-sm aspect-[4/3] rounded-lg overflow-hidden shadow-sm bg-surface-container">
                  <img alt="Lời tỏ tình" className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" data-alt="Charming Hanoi Old Quarter street at dusk lit with warm festive Christmas fairy lights, festive storefronts, and romantic golden bokeh reflections on wet pavement." src="https://lh3.googleusercontent.com/aida-public/AB6AXuDcygzKDbpmLI0i4iFyjSSXgIkoCSTRbVysyiQSgQRlie3Gsu6Z66-gqdo0tKnU6gFvoNCqdfhjjiJZoqjDlcon_KXiyV0GbkEoE20d-9tR0-quKh5VkcJXyfh78YQg63lxz8yIj-hHMz8EKJyvnoMHMNxXHxWCkf6cOU-Hx6ndf0wXRrgCp0WKfp7-MBsCuhFyPkqbo87rnfl_IfHzcNFFk9UDKndlt8qvrDG0k6DPW97huNVd4DVE" />
                </div>
              </div>
              <div className="absolute left-4 md:left-1/2 w-6 h-6 rounded-full bg-primary-container -translate-x-1/2 flex items-center justify-center shadow-md order-1 md:order-2">
                <div className="w-2.5 h-2.5 rounded-full bg-surface-container-lowest" />
              </div>
              <div className="w-full md:w-1/2 md:pl-12 space-y-2 order-3">
                <span className="inline-block px-3 py-1 bg-surface-container text-primary font-label-sm text-label-sm rounded-full">24 / 12 / 2021</span>
                <h3 className="font-headline-md text-headline-md text-on-surface">Lời Tỏ Tình Dưới Đèn Giáng Sinh</h3>
                <p className="font-body-md text-body-md text-on-surface-variant">Giữa phố cổ rực rỡ ánh đèn và cái se lạnh của mùa đông, anh lấy hết can đảm nắm lấy tay em và hỏi: 'Cho anh cơ hội được chăm sóc em nhé?'</p>
              </div>
            </div>
            <div className="relative flex flex-col md:flex-row items-start md:items-center gap-8 pl-12 md:pl-0">
              <div className="w-full md:w-1/2 md:text-right md:pr-12 space-y-2 order-2 md:order-1">
                <span className="inline-block px-3 py-1 bg-surface-container text-primary font-label-sm text-label-sm rounded-full">15 / 08 / 2023</span>
                <h3 className="font-headline-md text-headline-md text-on-surface">Chuyến Đi Xa Đầu Tiên: Đà Lạt</h3>
                <p className="font-body-md text-body-md text-on-surface-variant">Những sáng sớm săn mây trong trẻo, cùng đèo nhau trên chiếc xe máy cũ qua những rặng thông và cùng thưởng thức ly sữa đậu nành nóng hổi.</p>
              </div>
              <div className="absolute left-4 md:left-1/2 w-6 h-6 rounded-full bg-primary-container -translate-x-1/2 flex items-center justify-center shadow-md order-1 md:order-2">
                <div className="w-2.5 h-2.5 rounded-full bg-surface-container-lowest" />
              </div>
              <div className="w-full md:w-1/2 md:pl-12 order-3">
                <div className="w-full max-w-sm aspect-[4/3] rounded-lg overflow-hidden shadow-sm bg-surface-container">
                  <img alt="Đà Lạt sương mù" className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" data-alt="Misty romantic Da Lat pine hill during early sunrise, delicate layer of white cloud fog over pine valley, dreamy soft pink and gold light." src="https://lh3.googleusercontent.com/aida-public/AB6AXuBDgf843dvX-B_ojWk-PloU0yzY-S0PZanTYykE43O88TcKSYXWFj3YlLIPOAnRKhtdO34IWXO67yr6wmdN4lC_0_uOuktjy7TfcHmdVU1MN8Md3wxOfZPh7K1BSK2Qs5LH7v5CyGKLFgvyDBWbvAEJpUsYtag_VkMKv8v_ARbxP4chPa8iopRAdU5kn3Cz-MHweA_nYVb2fDG_seh-dTT5OlZX7YAfs8iVpaAuBgjM7rg0Eq1tW6WU" />
                </div>
              </div>
            </div>
            <div className="relative flex flex-col md:flex-row items-start md:items-center gap-8 pl-12 md:pl-0">
              <div className="w-full md:w-1/2 md:pr-12 md:flex md:justify-end order-2 md:order-1">
                <div className="w-full max-w-sm aspect-[4/3] rounded-lg overflow-hidden shadow-sm bg-surface-container">
                  <img alt="Chiếc nhẫn hẹn ước" className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" data-alt="Close up aesthetic shot of couple holding hands gently showcasing an elegant solitaire diamond promise ring, natural warm daylight, romantic minimal style." src="https://lh3.googleusercontent.com/aida-public/AB6AXuC9oWLsx2M5yK6zY2HjoqLX74VtxGM154OUqQY4fTPgwGU7FqIMh588JxlPgeNbc_5f6gZdcu4T4N3a-hwH-bjpaoCaxN0BiFtQtI1h5zr4VNcoyAY4IREp0FgXYHXxOtSPt-0jF1DcEcemdcMsPuphaRc0S7gps9QtYuFMyHZmTFQB5-CH3aHGNJ9eMa4QgYqcO9XiEDn5dlrXur89tGtLF0yX7q9cx8eA5htavbTVKLbsFu_dOuoq" />
                </div>
              </div>
              <div className="absolute left-4 md:left-1/2 w-6 h-6 rounded-full bg-primary-container -translate-x-1/2 flex items-center justify-center shadow-md order-1 md:order-2">
                <div className="w-2.5 h-2.5 rounded-full bg-surface-container-lowest" />
              </div>
              <div className="w-full md:w-1/2 md:pl-12 space-y-2 order-3">
                <span className="inline-block px-3 py-1 bg-surface-container text-primary font-label-sm text-label-sm rounded-full">14 / 02 / 2024</span>
                <h3 className="font-headline-md text-headline-md text-on-surface">Kỷ Niệm 3 Năm &amp; Lời Hẹn Ước</h3>
                <p className="font-body-md text-body-md text-on-surface-variant">Tròn 3 năm ngày quen nhau, chiếc nhẫn đính hôn giản dị được trao đi như lời cam kết vững bền cho một tương lai dài rộng bên nhau.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="w-full bg-surface-container-low/50 py-24 px-6">
        <div className="max-w-[1280px] mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <span className="font-label-sm text-label-sm tracking-widest uppercase text-tertiary font-bold">Thư Viện Ảnh</span>
              <h2 className="font-headline-lg text-headline-lg text-on-surface">Khoảnh khắc đáng nhớ</h2>
            </div>
            <p className="font-body-md text-body-md text-on-surface-variant max-w-md">Những mảnh ghép nhỏ nuôi dưỡng tình yêu to lớn qua từng tháng năm ngọt ngào.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="group relative rounded-lg overflow-hidden bg-surface-container aspect-[4/5] shadow-sm hover:shadow-lg transition-all duration-300">
              <img alt="Buổi picnic cuối tuần" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" data-alt="Couple enjoying a relaxed afternoon picnic in a green meadow with canvas blanket, fresh strawberries, and rustic bread under gentle dappled shade." src="https://lh3.googleusercontent.com/aida-public/AB6AXuBzDx7Q8ADv6_F9UJPbiPfnmUw5Lb-HBW4NlAzZb26TAxIDJPxEF4nyUO5N5CWc1CRPKEHX2lmORYY1LSpEX2V2APxzCsl41Ch4f31jfusriINo2Qpg1H6HbUyIw2AohVod0DPp2Uej4ZoQ-3ElYNIs1nrx9E2_bine7R-3w5_oOx7DIyZdhL06I--xj7jAXOIUZZx_HdVMD8kJC43nrEqWVrHhRSeXSdEYlBEh52q89mFHhDFqPnrH" />
              <div className="absolute inset-0 bg-gradient-to-t from-on-surface/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6 text-on-primary">
                <span className="font-label-sm text-label-sm uppercase tracking-wider text-secondary-fixed">Mùa Hè 2022</span>
                <h4 className="font-title-lg text-title-lg">Buổi picnic bình yên</h4>
              </div>
            </div>
            <div className="group relative rounded-lg overflow-hidden bg-surface-container aspect-[4/5] shadow-sm hover:shadow-lg transition-all duration-300">
              <img alt="Hoàng hôn Phú Quốc 2023" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" data-alt="Sensual cinematic shot of a young couple silhouetted during breathtaking orange and magenta sunset on Phu Quoc beach with gentle ocean waves." src="https://lh3.googleusercontent.com/aida-public/AB6AXuB3-qBEu6KsID7SO9-hS-u4GmStU6e2WJRb5julqinQQ6SpyC6o4FwqAf0FwaAIJqyn09r8fuGWTKw3Cms1dxsC1_HVPz9wyfLyHaZjaxEmjZi98gWKqO4Fntz11CgtEdpjLcpMPR7kOW3zB6xJb-70MB81LmemY0SwooZyoh-A3vI63wCkcAapZ94fS6ahO__08o27ENTOe7PU7HhKCLlkr1f5cAX0lstmwwZfzfo014VW4YVgccSZ" />
              <div className="absolute inset-0 bg-gradient-to-t from-on-surface/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6 text-on-primary">
                <span className="font-label-sm text-label-sm uppercase tracking-wider text-secondary-fixed">Phú Quốc 2023</span>
                <h4 className="font-title-lg text-title-lg">Hoàng hôn biển lộng gió</h4>
              </div>
            </div>
            <div className="group relative rounded-lg overflow-hidden bg-surface-container aspect-[4/5] shadow-sm hover:shadow-lg transition-all duration-300">
              <img alt="Góc phố quen mùa lá bay" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" data-alt="Editorial candid of couple walking together through Hanoi autumn yellow leaves street Phan Dinh Phung, wearing matching minimalist coats." src="https://lh3.googleusercontent.com/aida-public/AB6AXuBaK_mCZq3xi8IzdR_XFIlTGXTRMH3X5Mi86ljSZz9JR_VWt0pe2WAZcx1CbXTVrJu-fZLE7p_8_Qc3Vdp3FUT4z8Z03osBF1qRxTbkYC9eMqBWujeo2Bp_c_zmmlvx8csJxvw9D9LcSz31Xccwu0f-jCEU-dzmD4pxY9HhU7_A7w40JleK--f3AGc51oiHMnEC-_1sSkTCFOuZBHy_FkmiY2837lV31T09gzwdsJggXCIju9PaWla0" />
              <div className="absolute inset-0 bg-gradient-to-t from-on-surface/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6 text-on-primary">
                <span className="font-label-sm text-label-sm uppercase tracking-wider text-secondary-fixed">Mùa Thu Hà Nội</span>
                <h4 className="font-title-lg text-title-lg">Góc phố quen mùa lá bay</h4>
              </div>
            </div>
            <div className="group relative rounded-lg overflow-hidden bg-surface-container aspect-[4/5] shadow-sm hover:shadow-lg transition-all duration-300">
              <img alt="Bữa tối ấm cúng" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" data-alt="Intimate candlelit anniversary dinner table with two wine glasses, artisanal pasta dishes, soft roses in vase, cozy aesthetic ambiance." src="https://lh3.googleusercontent.com/aida-public/AB6AXuDopoOZEBUvwLSEcgfByY7THz3tH_5mgZmQHT28jNPqi28x4L7G4NbxtMwbv4v79AlPeaecJsgyapBLHT7lqKOeuZewjuWimWZoxtfKggUPx2Vliaj7D4h6mwzrBvbER1fFQjy8-ntnGqY9e_lOmNAtdQIY-jFa_FR9sxLiDuYNfK1E-OqqrpevqXUrCIxRlhYKbVa5vLOqkgZtfN_Tpelvs3f4oKtZSnA4q6aa2fBUUh3vBcHsnLdK" />
              <div className="absolute inset-0 bg-gradient-to-t from-on-surface/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6 text-on-primary">
                <span className="font-label-sm text-label-sm uppercase tracking-wider text-secondary-fixed">Kỷ Niệm 2 Năm</span>
                <h4 className="font-title-lg text-title-lg">Bữa tối dưới ánh nến</h4>
              </div>
            </div>
            <div className="group relative rounded-lg overflow-hidden bg-surface-container aspect-[4/5] shadow-sm hover:shadow-lg transition-all duration-300">
              <img alt="Nắm chặt tay nhau" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" data-alt="Close up tender moment of two hands holding firmly while walking, cozy knitted sweater sleeves, soft morning sunbeams filter through." src="https://lh3.googleusercontent.com/aida-public/AB6AXuDGKJTMzGMOtW_OYME7CXZ7CHJ-rSfWRmlJircICl00za3_zVJy2yUzn1vlfuVA0h30oYGQDWrGEC_uTqPlUxRYsgN0suyDX0WCLjQQ-jRjCfe8nwr2KuRGRKUqqX7HwUg7d3OeG_xDRIp0uF78StmgTP-IF7BkxyDLMV-g4ElgjqZ-oHfEYsrXfht9A-t3thozbXE-3TGYFAK-sRxPNLYv0TR61Oh7Aw-p7WXqnGIk9oZWX_yUSlzD" />
              <div className="absolute inset-0 bg-gradient-to-t from-on-surface/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6 text-on-primary">
                <span className="font-label-sm text-label-sm uppercase tracking-wider text-secondary-fixed">Mỗi Ngày</span>
                <h4 className="font-title-lg text-title-lg">Nắm chặt tay nhau</h4>
              </div>
            </div>
            <div className="group relative rounded-lg overflow-hidden bg-surface-container aspect-[4/5] shadow-sm hover:shadow-lg transition-all duration-300">
              <img alt="Dưới cơn mưa rào" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" data-alt="Young couple laughing heartily under a clear umbrella during warm summer rain, sparkling rain drops, cinematic romantic vibe." src="https://lh3.googleusercontent.com/aida-public/AB6AXuDKiJdUxdqSQfbog02_g_T7BijWPupFgCAzeEmkbFk5sEG62eAOGXgx8-joN3XERpM762ubuM_bjF07laGtdvZ3H3hlKsR_St7f7RYrOP0Cszonu_RVVlqJWbsps8XE7QDwjoh9WPIQnLFEnolg1_jxxWrF0J2JJve0YdX2vUd7Uxa6G3XfRqh420aEE4w_XY1lEWF0FOmOFU6CqpE1HgB7MYDyLiA2FvLLehBiH4_BxonwYLBqPIKN" />
              <div className="absolute inset-0 bg-gradient-to-t from-on-surface/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6 text-on-primary">
                <span className="font-label-sm text-label-sm uppercase tracking-wider text-secondary-fixed">Mùa Hè</span>
                <h4 className="font-title-lg text-title-lg">Cùng em qua cơn mưa</h4>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="w-full max-w-[840px] mx-auto px-6 py-24">
        <div className="p-8 sm:p-12 rounded-xl bg-surface-container text-center space-y-4 mb-16 shadow-sm">
          <span className="material-symbols-outlined text-[36px] text-primary" style={{fontVariationSettings: '"FILL" 1'}}>favorite</span>
          <h3 className="font-headline-lg text-headline-lg text-on-surface">
            "Dù 1,000 ngày hay 10,000 ngày, tình yêu này vẫn vẹn nguyên như ngày đầu tiên."
          </h3>
          <p className="font-body-md text-body-md text-tertiary">Bảo Long &amp; An Nhiên — Viết tiếp câu chuyện chúng mình</p>
        </div>
        <div className="bg-surface-container-lowest p-8 sm:p-10 rounded-xl shadow-md">
          <div className="text-center space-y-2 mb-8">
            <h3 className="font-headline-md text-headline-md text-on-surface">Gửi Lời Chúc Yêu Thương</h3>
            <p className="font-body-sm text-body-sm text-on-surface-variant">Để lại đôi dòng ngọt ngào dành tặng cho Bảo Long &amp; An Nhiên nhé!</p>
          </div>
          <form className="space-y-4" id="wishing-form" onSubmit={(e) => e.preventDefault()}>
            <div>
              <label className="block font-label-md text-label-md text-on-surface mb-2" htmlFor="guest-name">Tên của bạn</label>
              <input className="w-full px-5 py-3 rounded-full bg-surface-container-low text-on-surface placeholder:text-outline focus:outline-none focus:ring-2 focus:ring-primary-container" id="guest-name" placeholder="Nhập tên hoặc biệt danh của bạn..." required type="text" />
            </div>
            <div>
              <label className="block font-label-md text-label-md text-on-surface mb-2" htmlFor="guest-message">Lời chúc ngọt ngào</label>
              <textarea className="w-full px-5 py-3 rounded-DEFAULT bg-surface-container-low text-on-surface placeholder:text-outline focus:outline-none focus:ring-2 focus:ring-primary-container resize-none" id="guest-message" placeholder="Gửi lời chúc ngọt ngào đến cặp đôi..." required rows={3} defaultValue={""} />
            </div>
            <button className="w-full py-3.5 px-6 rounded-full bg-primary-container text-on-primary font-title-md text-title-md flex items-center justify-center gap-2 hover:bg-primary transition-colors active:scale-98 shadow-sm" type="submit">
              <span className="material-symbols-outlined text-[20px]" style={{fontVariationSettings: '"FILL" 1'}}>favorite</span>
              <span>Gửi Lời Chúc Ngay</span>
            </button>
          </form>
          <div className="hidden mt-6 p-4 rounded-DEFAULT bg-surface-container-high text-on-surface flex items-center gap-3" id="wish-success">
            <span className="material-symbols-outlined text-primary text-[24px]" style={{fontVariationSettings: '"FILL" 1'}}>check_circle</span>
            <span className="font-body-sm text-body-sm">Cảm ơn bạn thật nhiều! Lời chúc đã được gửi gắm trọn vẹn đến cặp đôi ♥</span>
          </div>
          <div className="mt-10 pt-8 border-t-0 space-y-4">
            <span className="font-label-sm text-label-sm tracking-wider uppercase text-tertiary font-bold">Lời chúc gần đây</span>
            <div className="space-y-3" id="wishes-list">
              <div className="p-4 rounded-DEFAULT bg-surface-container-low flex flex-col gap-1">
                <div className="flex items-center justify-between">
                  <span className="font-title-md text-title-md text-on-surface font-semibold">Minh Châu (Bạn thân)</span>
                  <span className="font-label-sm text-label-sm text-tertiary">Vừa xong</span>
                </div>
                <p className="font-body-sm text-body-sm text-on-surface-variant">Ngưỡng mộ 1,000 ngày của hai bạn vô cùng! Chờ đợi thiệp cưới sớm nhất nha!</p>
              </div>
              <div className="p-4 rounded-DEFAULT bg-surface-container-low flex flex-col gap-1">
                <div className="flex items-center justify-between">
                  <span className="font-title-md text-title-md text-on-surface font-semibold">Hoàng Nam</span>
                  <span className="font-label-sm text-label-sm text-tertiary">2 giờ trước</span>
                </div>
                <p className="font-body-sm text-body-sm text-on-surface-variant">Chúc Long và Nhiên mãi ngọt ngào, hạnh phúc và luôn bao dung nhau như ngày đầu tiên!</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <footer className="w-full bg-surface-container-lowest py-16 px-6 text-center">
        <div className="max-w-md mx-auto flex flex-col items-center gap-4">
          <div className="flex items-center justify-center gap-3 text-primary">
            <span className="font-headline-md text-headline-md font-serif">BL</span>
            <span className="text-tertiary text-2xl font-light">∞</span>
            <span className="font-headline-md text-headline-md font-serif">AN</span>
          </div>
          <p className="font-body-sm text-body-sm text-on-surface-variant">
            Tình yêu là hành trình cùng nhau sẻ chia từng khoảnh khắc giản đơn.
          </p>
          <a className="inline-flex items-center gap-1.5 font-label-md text-label-md text-primary hover:underline" href="https://bao-long-an-nhien.couplestory.site">
            <span className="material-symbols-outlined text-[16px]">link</span>
            <span>bao-long-an-nhien.couplestory.site</span>
          </a>
          <div className="mt-4 pt-4 border-t-0 flex flex-col items-center gap-1">
            <span className="font-label-sm text-label-sm text-tertiary">Kỷ niệm 1,000 ngày yêu nhau — 14.02.2021 • 2024</span>
          </div>
        </div>
      </footer>
    </div></main><div className="fixed bottom-6 left-6 z-40"><button aria-label="Share our story" className="w-12 h-12 rounded-full bg-primary-container text-on-primary flex items-center justify-center shadow-[0px_10px_32px_-4px_rgba(61,31,45,0.18)] hover:scale-105 active:scale-95 transition-all duration-200" type="button"><span className="material-symbols-outlined text-[22px]">share</span></button></div><aside className="fixed bottom-6 right-6 z-40"><a className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-surface-container-lowest/85 backdrop-blur-md shadow-[0px_4px_20px_-2px_rgba(61,31,45,0.08)] hover:bg-surface-container-lowest transition-colors" href="https://couplestory.site" rel="noopener noreferrer" target="_blank"><span className="text-[12px] leading-none">💑</span><span className="font-label-sm text-label-sm text-secondary tracking-wide">Made with <span className="font-title-md text-label-sm text-on-surface">CoupleStory</span></span></a></aside>
</div>

    </div>
  );
}
