import { Link } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
export default function TemplatesGallery() {
  const { isAuthenticated } = useAuth();
  return (
    <div className="min-h-screen">
<div>
  <main className="w-full pt-16 bg-surface min-h-[calc(100vh-64px)]"><div className="flex flex-col w-full">
      <div className="relative w-full overflow-hidden">
        <div className="absolute -top-32 -left-20 w-96 h-96 bg-secondary-container/40 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-12 -right-20 w-[30rem] h-[30rem] bg-primary-fixed/50 rounded-full blur-3xl pointer-events-none" />
        <section className="max-w-7xl mx-auto px-margin-mobile md:px-margin pt-space-xl pb-space-lg relative z-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-space-lg">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-space-xs px-space-md py-1 rounded-full bg-surface-container text-on-surface-variant font-label-sm text-label-sm uppercase tracking-wider mb-space-md shadow-sm">
                <span className="w-2 h-2 rounded-full bg-primary-container animate-pulse" />
                Được cập nhật hàng tháng
              </div>
              <h1 className="font-headline-xl text-headline-xl text-on-surface tracking-tight mb-space-sm">
                Kho Giao Diện Kỷ Niệm Tình Yêu
              </h1>
              <p className="font-body-lg text-body-lg text-on-surface-variant leading-relaxed">
                Khám phá các phong cách kể chuyện tình yêu tinh tế, từ tối giản thanh lịch đến dạ tiệc điện ảnh lãng mạn. Mỗi bản thiết kế là một tác phẩm nghệ thuật tôn vinh hành trình chung đôi.
              </p>
            </div>
            <div className="hidden lg:flex items-center gap-space-md bg-surface-container-low p-space-md rounded-lg shadow-sm">
              <div className="flex -space-x-3 items-center">
                <div className="w-10 h-10 rounded-full bg-tertiary-fixed flex items-center justify-center font-headline-md text-headline-md text-on-tertiary-container shadow-sm">&#x1F338;</div>
                <div className="w-10 h-10 rounded-full bg-primary-container flex items-center justify-center font-title-md text-title-md text-on-primary shadow-sm">&#x1F495;</div>
                <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-on-secondary shadow-sm">
                  <span className="material-symbols-outlined text-[20px]">palette</span>
                </div>
              </div>
              <div className="border-l-0 pl-space-xs">
                <p className="font-headline-md text-headline-md text-primary font-bold leading-none">26+</p>
                <p className="font-label-sm text-label-sm text-on-surface-variant mt-0.5">Mẫu giao diện tuyển chọn</p>
              </div>
            </div>
          </div>
          <div className="mt-space-xl bg-surface-container-lowest p-space-md md:p-space-lg rounded-lg shadow-sm space-y-space-md">
            <div className="flex flex-col md:flex-row gap-space-md items-center justify-between">
              <div className="relative w-full md:w-96">
                <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant text-[20px]">search</span>
                <input className="w-full pl-11 pr-4 py-3 bg-surface-container-low rounded-full font-body-md text-body-md text-on-surface placeholder:text-outline focus:outline-none focus:bg-surface-container transition-colors" placeholder="Tìm kiếm template theo tên, cảm xúc..." type="text" />
              </div>
              <div className="w-full md:w-auto flex items-center justify-between md:justify-end gap-space-md">
                <span className="font-label-md text-label-md text-on-surface-variant shrink-0">Sắp xếp theo:</span>
                <div className="relative inline-block w-full sm:w-auto">
                  <select className="w-full appearance-none bg-surface-container-low text-on-surface font-label-md text-label-md px-space-lg py-2.5 pr-10 rounded-full focus:outline-none cursor-pointer" defaultValue="Mới ra mắt">
                    <option>Mới ra mắt</option>
                    <option>Phổ biến nhất</option>
                    <option>Đánh giá cao (5.0 ⭐)</option>
                  </select>
                  <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-on-surface-variant text-[18px]">expand_more</span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-space-xs overflow-x-auto pb-1 pt-1 -mx-2 px-2 no-scrollbar">
              <button className="shrink-0 px-space-lg py-2 rounded-full font-label-md text-label-md bg-primary-container text-on-primary shadow-sm hover:scale-[1.02] transition-transform">
                Tất cả (26)
              </button>
              <button className="shrink-0 px-space-md py-2 rounded-full font-label-md text-label-md bg-surface-container-low text-on-surface-variant hover:text-primary-container hover:bg-surface-container transition-all">
                Tối giản / Editorial
              </button>
              <button className="shrink-0 px-space-md py-2 rounded-full font-label-md text-label-md bg-surface-container-low text-on-surface-variant hover:text-primary-container hover:bg-surface-container transition-all">
                Điện ảnh / Cinematic
              </button>
              <button className="shrink-0 px-space-md py-2 rounded-full font-label-md text-label-md bg-surface-container-low text-on-surface-variant hover:text-primary-container hover:bg-surface-container transition-all">
                Vintage Cổ Điển
              </button>
              <button className="shrink-0 px-space-md py-2 rounded-full font-label-md text-label-md bg-surface-container-low text-on-surface-variant hover:text-primary-container hover:bg-surface-container transition-all">
                Trẻ trung / Pastel
              </button>
              <button className="shrink-0 px-space-md py-2 rounded-full font-label-md text-label-md bg-surface-container-low text-on-surface-variant hover:text-primary-container hover:bg-surface-container transition-all">
                Kỷ niệm ngày cưới & RSVP
              </button>
            </div>
          </div>
        </section>
      </div>
      <section className="max-w-7xl mx-auto px-margin-mobile md:px-margin py-space-lg w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-space-lg">
          <article className="group bg-surface-container-lowest rounded-lg overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between">
            <div>
              <div className="relative w-full aspect-[4/3] overflow-hidden" style={{background: 'linear-gradient(180deg, #e8c8d8 0%, #f5dce8 40%, #fce4ec 100%)'}}>
                <img className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 opacity-60" data-alt="Dreamy romantic anniversary with starry mountain backdrop, floating hearts, soft pink and purple gradient sky, script typography '2 Years of Love', intimate couple silhouette against twilight glow." src="https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=800&q=80" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#fce4ec]/90 via-[#f8bbd0]/30 to-transparent" />
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                  <span className="text-4xl">&#x1F497;</span>
                  <p className="font-dancing text-3xl text-[#e91e8c] mt-2 drop-shadow-sm">2 Years of Love</p>
                  <p className="font-body-sm text-[#6d4c5e] mt-1 italic">C&#x1EA3;m &#x01A1;n v&#xEC; &#x111;&#xE3; c&#xF9;ng nhau...</p>
                </div>
                <div className="absolute top-4 left-4 flex items-center gap-2">
                  <span className="px-3 py-1 bg-[#fce4ec]/90 backdrop-blur-md text-[#e91e8c] rounded-full font-label-sm text-label-sm uppercase tracking-wider shadow-sm flex items-center gap-1">
                    <span className="material-symbols-outlined text-[14px]">auto_awesome</span>
                    M&#x1EDB;i
                  </span>
                  <span className="px-3 py-1 bg-surface-container-lowest/90 backdrop-blur-md text-on-surface rounded-full font-label-sm text-label-sm">
                    Miễn phí / G&#xF3;i Couple
                  </span>
                </div>
                <div className="absolute bottom-4 left-4 flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-[#f8bbd0] shadow-sm" />
                  <span className="font-label-sm text-label-sm text-white drop-shadow-sm">Dreamy Pink &amp; Starlight</span>
                </div>
              </div>
              <div className="p-space-lg">
                <div className="flex items-center justify-between gap-space-sm mb-space-xs">
                  <h2 className="font-headline-md text-headline-md text-on-surface">Romantic Anniversary</h2>
                  <div className="flex items-center gap-1 bg-surface-container-low px-2 py-1 rounded-full text-secondary">
                    <span className="material-symbols-outlined text-primary-container text-[16px]" style={{fontVariationSettings: '"FILL" 1'}}>star</span>
                    <span className="font-title-md text-title-md font-bold text-on-surface">4.9</span>
                    <span className="font-label-sm text-label-sm text-on-surface-variant">(67)</span>
                  </div>
                </div>
                <p className="font-body-sm text-body-sm text-on-surface-variant mb-space-md line-clamp-2">
                  Phong c&#xE1;ch l&#xE3;ng m&#x1EA1;n m&#x01A1; m&#x1ED9;ng v&#x1EDB;i hi&#x1EC7;u &#x1EE9;ng tr&#xE1;i tim bay, font ch&#x1EEF; vi&#x1EBF;t tay v&#xE0; b&#x1EA3;ng m&#xE0;u h&#x1ED3;ng pastel. Ho&#xE0;n h&#x1EA3;o cho k&#x1EF7; ni&#x1EC7;m ng&#xE0;y y&#xEA;u v&#xE0; l&#x1EDD;i t&#x1ECF; t&#xEC;nh ng&#x1ECD;t ng&#xE0;o.
                </p>
                <div className="flex flex-wrap gap-space-xs mb-space-lg">
                  <span className="px-2.5 py-1 rounded-md bg-surface-container-low font-label-sm text-label-sm text-on-surface-variant">Tr&#xE1;i tim bay</span>
                  <span className="px-2.5 py-1 rounded-md bg-surface-container-low font-label-sm text-label-sm text-on-surface-variant">Font vi&#x1EBF;t tay</span>
                  <span className="px-2.5 py-1 rounded-md bg-surface-container-low font-label-sm text-label-sm text-on-surface-variant">&#x110;&#x1EBF;m ng&#xE0;y y&#xEA;u</span>
                </div>
              </div>
            </div>
            <div className="px-space-lg pb-space-lg pt-0 flex items-center gap-space-sm">
              <Link className="w-1/2 py-2.5 rounded-full font-label-md text-label-md text-center bg-surface-container-low hover:bg-surface-container text-on-surface transition-colors flex items-center justify-center gap-1" to="/preview/romantic-anniversary">
                <span className="material-symbols-outlined text-[18px]">visibility</span>
                Xem Demo
              </Link>
              <Link className="w-1/2 py-2.5 rounded-full font-label-md text-label-md text-center bg-primary-container hover:bg-primary text-on-primary transition-all shadow-sm hover:scale-[1.02] flex items-center justify-center gap-1 font-semibold" to={isAuthenticated ? "/dashboard?applyTemplate=romantic-anniversary" : "/register"}>
                D&#xF9;ng M&#x1EA7;u N&#xE0;y
              </Link>
            </div>
          </article>
          <article className="group bg-surface-container-lowest rounded-lg overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between">
            <div>
              <div className="relative w-full aspect-[4/3] overflow-hidden" style={{background: 'linear-gradient(180deg, #FDF6EE 0%, #F5ECE0 50%, #FADDD1 100%)'}}>
                <img className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 opacity-50" data-alt="Warm cream wall with pinned polaroid photos, push pins, washi tape, handwritten notes, string lights at top, cozy romantic memory board aesthetic." src="https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?auto=format&fit=crop&w=800&q=80" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#FDF6EE]/90 via-[#F5ECE0]/30 to-transparent" />
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                  <span className="text-4xl">&#x1F4F7;</span>
                  <p style={{fontFamily: "'Caveat', cursive"}} className="text-3xl text-[#E07A5F] mt-2 drop-shadow-sm">Memory Wall</p>
                  <p className="font-body-sm text-[#5C4033] mt-1 italic">Ghim l&#x1EA1;i nh&#x1EEF;ng k&#x1EF7; ni&#x1EC7;m &#x111;&#x1EB9;p...</p>
                </div>
                <div className="absolute top-4 left-4 flex items-center gap-2">
                  <span className="px-3 py-1 bg-[#FADDD1]/90 backdrop-blur-md text-[#E07A5F] rounded-full font-label-sm text-label-sm uppercase tracking-wider shadow-sm flex items-center gap-1">
                    <span className="material-symbols-outlined text-[14px]">auto_awesome</span>
                    M&#x1EDB;i
                  </span>
                  <span className="px-3 py-1 bg-surface-container-lowest/90 backdrop-blur-md text-on-surface rounded-full font-label-sm text-label-sm">
                    Miễn phí / G&#xF3;i Couple
                  </span>
                </div>
                <div className="absolute bottom-4 left-4 flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-[#E07A5F] shadow-sm" />
                  <span className="font-label-sm text-label-sm text-white drop-shadow-sm">Cream &#x1EA4;m &amp; Terracotta</span>
                </div>
              </div>
              <div className="p-space-lg">
                <div className="flex items-center justify-between gap-space-sm mb-space-xs">
                  <h2 className="font-headline-md text-headline-md text-on-surface">Romantic Memory Wall</h2>
                  <div className="flex items-center gap-1 bg-surface-container-low px-2 py-1 rounded-full text-secondary">
                    <span className="material-symbols-outlined text-primary-container text-[16px]" style={{fontVariationSettings: '"FILL" 1'}}>star</span>
                    <span className="font-title-md text-title-md font-bold text-on-surface">4.8</span>
                    <span className="font-label-sm text-label-sm text-on-surface-variant">(53)</span>
                  </div>
                </div>
                <p className="font-body-sm text-body-sm text-on-surface-variant mb-space-md line-clamp-2">
                  B&#x1EE9;c t&#x01B0;&#x1EDD;ng k&#x1EF7; ni&#x1EC7;m v&#x1EDB;i &#x1EA3;nh polaroid &#x111;&#x01B0;&#x1EE3;c ghim, gi&#x1EA5;y nh&#x1EDB; d&#xE1;n, d&#xE2;y &#x111;&#xE8;n trang tr&#xED; v&#xE0; font ch&#x1EEF; vi&#x1EBF;t tay Caveat. Phong c&#xE1;ch scrapbook &#x1EA5;m &#xE1;p v&#xE0; &#x111;&#x1EA7;y c&#x1EA3;m x&#xFA;c.
                </p>
                <div className="flex flex-wrap gap-space-xs mb-space-lg">
                  <span className="px-2.5 py-1 rounded-md bg-surface-container-low font-label-sm text-label-sm text-on-surface-variant">&#x1EA2;nh Polaroid</span>
                  <span className="px-2.5 py-1 rounded-md bg-surface-container-low font-label-sm text-label-sm text-on-surface-variant">Washi Tape</span>
                  <span className="px-2.5 py-1 rounded-md bg-surface-container-low font-label-sm text-label-sm text-on-surface-variant">D&#xE2;y &#x111;&#xE8;n</span>
                </div>
              </div>
            </div>
            <div className="px-space-lg pb-space-lg pt-0 flex items-center gap-space-sm">
              <Link className="w-1/2 py-2.5 rounded-full font-label-md text-label-md text-center bg-surface-container-low hover:bg-surface-container text-on-surface transition-colors flex items-center justify-center gap-1" to="/preview/memory-wall">
                <span className="material-symbols-outlined text-[18px]">visibility</span>
                Xem Demo
              </Link>
              <Link className="w-1/2 py-2.5 rounded-full font-label-md text-label-md text-center bg-primary-container hover:bg-primary text-on-primary transition-all shadow-sm hover:scale-[1.02] flex items-center justify-center gap-1 font-semibold" to={isAuthenticated ? "/dashboard?applyTemplate=memory-wall" : "/register"}>
                D&#xF9;ng M&#x1EA7;u N&#xE0;y
              </Link>
            </div>
          </article>
          <article className="group bg-surface-container-lowest rounded-lg overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between">
            <div>
              <div className="relative w-full aspect-[4/3] bg-surface-container overflow-hidden">
                <img className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500" data-alt="Editorial couple magazine aesthetic with an Asian couple in stylish warm cream linen outfits standing in natural afternoon window light, laughing gently, modern minimalist typography overlay 'Chapter 04: Two Souls', quiet luxury and intimate fine-art romance." src="https://lh3.googleusercontent.com/aida-public/AB6AXuAyfffKx5Igx2OlKzPympaxCrfoqfS-HZzKTrC--uOZWQncltCWRw8rXk5pr0CsOKmXj1Qves505wW0iqqc8HGiq1jI3zNQ19p3JvkG3_nzYGDlLgfl7rG5_qhLQc6IrW04TEmibYIPwvxHRzfL3IkIsA7majLvQ696XJdgv181VPqlIS4kLMC0lgxM7fPwNndgiCAhAWAJYEyoQKXAWHtzl_CEC1hxpl2LGXLENcNT9YTAqkwd1HuX" />
                <div className="absolute inset-0 bg-gradient-to-t from-on-background/60 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />
                <div className="absolute top-4 left-4 flex items-center gap-2">
                  <span className="px-3 py-1 bg-primary-container text-on-primary rounded-full font-label-sm text-label-sm uppercase tracking-wider shadow-sm">
                    Phổ biến nhất
                  </span>
                  <span className="px-3 py-1 bg-surface-container-lowest/90 backdrop-blur-md text-on-surface rounded-full font-label-sm text-label-sm">
                    Miễn phí / Gói Couple
                  </span>
                </div>
                <div className="absolute bottom-4 left-4 flex items-center gap-2 text-on-primary">
                  <span className="w-3 h-3 rounded-full bg-[#f5ebe0] shadow-sm" />
                  <span className="font-label-sm text-label-sm text-surface-container-low">Tông Kem Ấm & Nude</span>
                </div>
              </div>
              <div className="p-space-lg">
                <div className="flex items-center justify-between gap-space-sm mb-space-xs">
                  <h2 className="font-headline-md text-headline-md text-on-surface">Minimal Couple</h2>
                  <div className="flex items-center gap-1 bg-surface-container-low px-2 py-1 rounded-full text-secondary">
                    <span className="material-symbols-outlined text-primary-container text-[16px]" style={{fontVariationSettings: '"FILL" 1'}}>star</span>
                    <span className="font-title-md text-title-md font-bold text-on-surface">4.9</span>
                    <span className="font-label-sm text-label-sm text-on-surface-variant">(142)</span>
                  </div>
                </div>
                <p className="font-body-sm text-body-sm text-on-surface-variant mb-space-md line-clamp-2">
                  Lấy cảm hứng từ tạp chí thời trang Kinfolk. Dành cho những cặp đôi yêu chuộng sự tinh khiết, khoảng trống thông thoáng và phông chữ thanh nhã.
                </p>
                <div className="flex flex-wrap gap-space-xs mb-space-lg">
                  <span className="px-2.5 py-1 rounded-md bg-surface-container-low font-label-sm text-label-sm text-on-surface-variant">Trình chiếu Polaroid</span>
                  <span className="px-2.5 py-1 rounded-md bg-surface-container-low font-label-sm text-label-sm text-on-surface-variant">Âm nhạc Lo-fi</span>
                  <span className="px-2.5 py-1 rounded-md bg-surface-container-low font-label-sm text-label-sm text-on-surface-variant">Đếm 1000 ngày</span>
                </div>
              </div>
            </div>
            <div className="px-space-lg pb-space-lg pt-0 flex items-center gap-space-sm">
              <Link className="w-1/2 py-2.5 rounded-full font-label-md text-label-md text-center bg-surface-container-low hover:bg-surface-container text-on-surface transition-colors flex items-center justify-center gap-1" to="/preview/minimal-couple">
                <span className="material-symbols-outlined text-[18px]">visibility</span>
                Xem Demo
              </Link>
              <Link className="w-1/2 py-2.5 rounded-full font-label-md text-label-md text-center bg-primary-container hover:bg-primary text-on-primary transition-all shadow-sm hover:scale-[1.02] flex items-center justify-center gap-1 font-semibold" to={isAuthenticated ? "/dashboard?applyTemplate=minimal-couple" : "/register"}>
                Dùng Mầu Này
              </Link>
            </div>
          </article>
          <article className="group bg-surface-container-lowest rounded-lg overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between">
            <div>
              <div className="relative w-full aspect-[4/3] bg-inverse-surface overflow-hidden">
                <img className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500" data-alt="Cinematic luxury dark romance portrait of an elegant young couple in a candlelit baroque ballroom, deep plum burgundy shadows, rich gold bokeh highlights, black evening dress and sharp tuxedo, editorial cinematic grain." src="https://lh3.googleusercontent.com/aida-public/AB6AXuA77T18JUaOZbMW1KNkSVPfZ8e8Z4X_q8vnHenBFNos975r0EStE7OIoU9E9l-StOSgE8QPrzJSjcyJ1YmaPYQBRI-BpE10_TXbOUtuzlKY_3f-ZJnEC_CUhiz6kXlsx_2kj8geGmQry2ClLYxhYTmrZDb8ywxND88jWCBQtc6H5YpxI19_Gl8pl_LnjXnP5pfiELr2yQXkX4stoOOtWAy497hsRsDcAAy90n_Jrny0ZgFvSopmPPu3" />
                <div className="absolute inset-0 bg-gradient-to-t from-on-background/70 via-transparent to-transparent opacity-70 group-hover:opacity-90 transition-opacity" />
                <div className="absolute top-4 left-4 flex items-center gap-2">
                  <span className="px-3 py-1 bg-tertiary-container text-on-tertiary rounded-full font-label-sm text-label-sm uppercase tracking-wider shadow-sm flex items-center gap-1">
                    <span className="material-symbols-outlined text-[14px]">workspace_premium</span>
                    VIP Khuyên Dùng
                  </span>
                  <span className="px-3 py-1 bg-surface-container-lowest/90 backdrop-blur-md text-on-surface rounded-full font-label-sm text-label-sm">
                    Couple Pro
                  </span>
                </div>
                <div className="absolute bottom-4 left-4 flex items-center gap-2 text-on-primary">
                  <span className="w-3 h-3 rounded-full bg-inverse-surface shadow-sm" />
                  <span className="font-label-sm text-label-sm text-surface-container-low">Màn Đêm Huyền Bí & Gold</span>
                </div>
              </div>
              <div className="p-space-lg">
                <div className="flex items-center justify-between gap-space-sm mb-space-xs">
                  <h2 className="font-headline-md text-headline-md text-on-surface">Eternal Love</h2>
                  <div className="flex items-center gap-1 bg-surface-container-low px-2 py-1 rounded-full text-secondary">
                    <span className="material-symbols-outlined text-primary-container text-[16px]" style={{fontVariationSettings: '"FILL" 1'}}>star</span>
                    <span className="font-title-md text-title-md font-bold text-on-surface">5.0</span>
                    <span className="font-label-sm text-label-sm text-on-surface-variant">(98)</span>
                  </div>
                </div>
                <p className="font-body-sm text-body-sm text-on-surface-variant mb-space-md line-clamp-2">
                  Phong cách dạ tiệc điện ảnh sâu lắng với hiệu ứng mờ ảo cao cấp. Tuyệt tác cho những câu chuyện tình yêu nồng nàn và trưởng thành.
                </p>
                <div className="flex flex-wrap gap-space-xs mb-space-lg">
                  <span className="px-2.5 py-1 rounded-md bg-surface-container-low font-label-sm text-label-sm text-on-surface-variant">Thước phim Cinematic</span>
                  <span className="px-2.5 py-1 rounded-md bg-surface-container-low font-label-sm text-label-sm text-on-surface-variant">Hiệu ứng Parallax</span>
                  <span className="px-2.5 py-1 rounded-md bg-surface-container-low font-label-sm text-label-sm text-on-surface-variant">Nhạc giao hưởng</span>
                </div>
              </div>
            </div>
            <div className="px-space-lg pb-space-lg pt-0 flex items-center gap-space-sm">
              <Link className="w-1/2 py-2.5 rounded-full font-label-md text-label-md text-center bg-surface-container-low hover:bg-surface-container text-on-surface transition-colors flex items-center justify-center gap-1" to="/preview/eternal-love">
                <span className="material-symbols-outlined text-[18px]">visibility</span>
                Xem Demo
              </Link>
              <Link className="w-1/2 py-2.5 rounded-full font-label-md text-label-md text-center bg-primary-container hover:bg-primary text-on-primary transition-all shadow-sm hover:scale-[1.02] flex items-center justify-center gap-1 font-semibold" to={isAuthenticated ? "/dashboard?applyTemplate=eternal-love" : "/register"}>
                Dùng Mầu Này
              </Link>
            </div>
          </article>
          <article className="group bg-surface-container-lowest rounded-lg overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between">
            <div>
              <div className="relative w-full aspect-[4/3] bg-surface-container overflow-hidden">
                <img className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500" data-alt="Vintage 35mm film photography of a young couple walking along the Seine in Paris in autumn, warm terracotta leaves, trench coats, soft lavender flowers in bicycle basket, nostalgic pastel hues and soft film grain." src="https://lh3.googleusercontent.com/aida-public/AB6AXuA3qjDK-27xfju7-_8h0C97DIYvKJFE6ZCGR5dYxaGo6DeZbQaXzpyp-72h0kALTBeGnzHNbnpfKHbWhfktmCnt9nuJ13rYNUVf8OR8vgez0wZCsNa30ByiLfdbDP_Qmjde-K3hWA_5YYM4CsUS0SAzmU1v1C6_SoDAXvh3MIlaiOSJBJvIrI9gpxYN8_s6BWH7GRevvNcOkBG0pJSc-SYko7y9lmnDXwIaeUvKSvOQpJzvMnD8U48R" />
                <div className="absolute inset-0 bg-gradient-to-t from-on-background/60 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />
                <div className="absolute top-4 left-4 flex items-center gap-2">
                  <span className="px-3 py-1 bg-surface-container-lowest/90 backdrop-blur-md text-on-surface rounded-full font-label-sm text-label-sm">
                    Vintage Pastel
                  </span>
                </div>
                <div className="absolute bottom-4 left-4 flex items-center gap-2 text-on-primary">
                  <span className="w-3 h-3 rounded-full bg-[#d8b4e2] shadow-sm" />
                  <span className="font-label-sm text-label-sm text-surface-container-low">Hoa Oải Hương & Nến Thơm</span>
                </div>
              </div>
              <div className="p-space-lg">
                <div className="flex items-center justify-between gap-space-sm mb-space-xs">
                  <h2 className="font-headline-md text-headline-md text-on-surface">Autumn Paris Romance</h2>
                  <div className="flex items-center gap-1 bg-surface-container-low px-2 py-1 rounded-full text-secondary">
                    <span className="material-symbols-outlined text-primary-container text-[16px]" style={{fontVariationSettings: '"FILL" 1'}}>star</span>
                    <span className="font-title-md text-title-md font-bold text-on-surface">4.8</span>
                    <span className="font-label-sm text-label-sm text-on-surface-variant">(86)</span>
                  </div>
                </div>
                <p className="font-body-sm text-body-sm text-on-surface-variant mb-space-md line-clamp-2">
                  Tái hiện chất thơ của những cuốn phim 35mm hoài niệm bên quán cà phê vỉa hè Paris và những chiều dạo bước rợp lá vàng bay.
                </p>
                <div className="flex flex-wrap gap-space-xs mb-space-lg">
                  <span className="px-2.5 py-1 rounded-md bg-surface-container-low font-label-sm text-label-sm text-on-surface-variant">Hiệu ứng Film Grain</span>
                  <span className="px-2.5 py-1 rounded-md bg-surface-container-low font-label-sm text-label-sm text-on-surface-variant">Nhật ký theo mùa</span>
                  <span className="px-2.5 py-1 rounded-md bg-surface-container-low font-label-sm text-label-sm text-on-surface-variant">Hộp thư tình</span>
                </div>
              </div>
            </div>
            <div className="px-space-lg pb-space-lg pt-0 flex items-center gap-space-sm">
              <Link className="w-1/2 py-2.5 rounded-full font-label-md text-label-md text-center bg-surface-container-low hover:bg-surface-container text-on-surface transition-colors flex items-center justify-center gap-1" to="/preview/autumn-paris">
                <span className="material-symbols-outlined text-[18px]">visibility</span>
                Xem Demo
              </Link>
              <Link className="w-1/2 py-2.5 rounded-full font-label-md text-label-md text-center bg-primary-container hover:bg-primary text-on-primary transition-all shadow-sm hover:scale-[1.02] flex items-center justify-center gap-1 font-semibold" to={isAuthenticated ? "/dashboard?applyTemplate=autumn-paris" : "/register"}>
                Dùng Mầu Này
              </Link>
            </div>
          </article>
          <article className="group bg-surface-container-lowest rounded-lg overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between">
            <div>
              <div className="relative w-full aspect-[4/3] bg-surface-container overflow-hidden">
                <img className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500" data-alt="Modern Scandinavian coastal romance showing lovers sitting peacefully on dunes overlooking a golden hour ocean, warm amber twilight glow, minimal clean lines, cozy blankets, soft pastel sunset palette with apricot and rose." src="https://lh3.googleusercontent.com/aida-public/AB6AXuAWY7tfCqnzKUI0Y94TKtMDAg1zS_uvSpcpx8ZgRgN4xHd-cGGT7lORTUeYRqwJTiYnAA1dLqZ6DszqtVbHT00CchxE5c_mI3dDzbdTORHcqfVr8sqK6KZ4lnghgz3PHuM-1PfO3KO3cTiz1FYThwXqhSi-Xymt2vVTTg6TiWg_jXU4-q34DBcwAUPHawtktHsbaqxYs5irgf2KUtXzqsjZeNt7faNLVO0bJFadVoGgZvJuSYEMv1nP" />
                <div className="absolute inset-0 bg-gradient-to-t from-on-background/60 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />
                <div className="absolute top-4 left-4 flex items-center gap-2">
                  <span className="px-3 py-1 bg-surface-container-lowest/90 backdrop-blur-md text-on-surface rounded-full font-label-sm text-label-sm">
                    Scandinavian Modern
                  </span>
                </div>
                <div className="absolute bottom-4 left-4 flex items-center gap-2 text-on-primary">
                  <span className="w-3 h-3 rounded-full bg-[#ffb5a7] shadow-sm" />
                  <span className="font-label-sm text-label-sm text-surface-container-low">Biển & Hoàng Hôn Ấm</span>
                </div>
              </div>
              <div className="p-space-lg">
                <div className="flex items-center justify-between gap-space-sm mb-space-xs">
                  <h2 className="font-headline-md text-headline-md text-on-surface">Sunset Horizon</h2>
                  <div className="flex items-center gap-1 bg-surface-container-low px-2 py-1 rounded-full text-secondary">
                    <span className="material-symbols-outlined text-primary-container text-[16px]" style={{fontVariationSettings: '"FILL" 1'}}>star</span>
                    <span className="font-title-md text-title-md font-bold text-on-surface">4.9</span>
                    <span className="font-label-sm text-label-sm text-on-surface-variant">(115)</span>
                  </div>
                </div>
                <p className="font-body-sm text-body-sm text-on-surface-variant mb-space-md line-clamp-2">
                  Dành cho những tâm hồn tự do và yêu biển cả. Bố cục phẳng tràn viền cùng bảng màu gradient hoàng hôn chuyển sắc êm ái.
                </p>
                <div className="flex flex-wrap gap-space-xs mb-space-lg">
                  <span className="px-2.5 py-1 rounded-md bg-surface-container-low font-label-sm text-label-sm text-on-surface-variant">Dòng thời gian chuyến đi</span>
                  <span className="px-2.5 py-1 rounded-md bg-surface-container-low font-label-sm text-label-sm text-on-surface-variant">Âm thanh sóng vỗ</span>
                  <span className="px-2.5 py-1 rounded-md bg-surface-container-low font-label-sm text-label-sm text-on-surface-variant">Bản đồ hẹn hò</span>
                </div>
              </div>
            </div>
            <div className="px-space-lg pb-space-lg pt-0 flex items-center gap-space-sm">
              <Link className="w-1/2 py-2.5 rounded-full font-label-md text-label-md text-center bg-surface-container-low hover:bg-surface-container text-on-surface transition-colors flex items-center justify-center gap-1" to="/preview/sunset-horizon">
                <span className="material-symbols-outlined text-[18px]">visibility</span>
                Xem Demo
              </Link>
              <Link className="w-1/2 py-2.5 rounded-full font-label-md text-label-md text-center bg-primary-container hover:bg-primary text-on-primary transition-all shadow-sm hover:scale-[1.02] flex items-center justify-center gap-1 font-semibold" to={isAuthenticated ? "/dashboard?applyTemplate=sunset-horizon" : "/register"}>
                Dùng Mầu Này
              </Link>
            </div>
          </article>
          <article className="group bg-surface-container-lowest rounded-lg overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between">
            <div>
              <div className="relative w-full aspect-[4/3] bg-surface-container overflow-hidden">
                <img className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500" data-alt="Playful scrapbook style couple memories, instant Polaroid photos pinned with cute stickers and washi tape on soft blush textured cork board, hand-drawn playful hearts and handwritten notes, bright cheerful romantic ambiance." src="https://lh3.googleusercontent.com/aida-public/AB6AXuCriEtK1gEP9yWnX35mz9tymj4ZJao7gd-faVskuvecelvfd7YTOroMS5cZpB9zcAC0lmo8oWSQafcpnyTz7PnNELFbuZ_sqoFAglOTWJbMK3M3JGc2Km04yio8yHYIG8rq2rfpI2rkdJOXpxt3dqMgZFOuvy1My5_57z505nqnfE80Pw6M_m-O49ZVUQu5sgyUMp1RY3lDJAnZIGUcgKHWpPa_87nZOEbvENnGZrR3h5JSrxR-LT_x" />
                <div className="absolute inset-0 bg-gradient-to-t from-on-background/60 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />
                <div className="absolute top-4 left-4 flex items-center gap-2">
                  <span className="px-3 py-1 bg-surface-container-lowest/90 backdrop-blur-md text-on-surface rounded-full font-label-sm text-label-sm">
                    Scrapbook Trẻ Trung
                  </span>
                </div>
                <div className="absolute bottom-4 left-4 flex items-center gap-2 text-on-primary">
                  <span className="w-3 h-3 rounded-full bg-secondary-container shadow-sm" />
                  <span className="font-label-sm text-label-sm text-surface-container-low">Polaroid Dán Tường & Sticker</span>
                </div>
              </div>
              <div className="p-space-lg">
                <div className="flex items-center justify-between gap-space-sm mb-space-xs">
                  <h2 className="font-headline-md text-headline-md text-on-surface">Sweet Polaroid Story</h2>
                  <div className="flex items-center gap-1 bg-surface-container-low px-2 py-1 rounded-full text-secondary">
                    <span className="material-symbols-outlined text-primary-container text-[16px]" style={{fontVariationSettings: '"FILL" 1'}}>star</span>
                    <span className="font-title-md text-title-md font-bold text-on-surface">4.7</span>
                    <span className="font-label-sm text-label-sm text-on-surface-variant">(178)</span>
                  </div>
                </div>
                <p className="font-body-sm text-body-sm text-on-surface-variant mb-space-md line-clamp-2">
                  Đậm chất Gen Z vui nhộn, cho phép kéo thả ảnh polaroid, dán sticker dài dẻ thương và ghi chú những điều ngốc nghếch chỉ 2 người hiểu.
                </p>
                <div className="flex flex-wrap gap-space-xs mb-space-lg">
                  <span className="px-2.5 py-1 rounded-md bg-surface-container-low font-label-sm text-label-sm text-on-surface-variant">Tương tác kéo thả ảnh</span>
                  <span className="px-2.5 py-1 rounded-md bg-surface-container-low font-label-sm text-label-sm text-on-surface-variant">Bộ sticker 200+</span>
                  <span className="px-2.5 py-1 rounded-md bg-surface-container-low font-label-sm text-label-sm text-on-surface-variant">Chữ viết tay custom</span>
                </div>
              </div>
            </div>
            <div className="px-space-lg pb-space-lg pt-0 flex items-center gap-space-sm">
              <Link className="w-1/2 py-2.5 rounded-full font-label-md text-label-md text-center bg-surface-container-low hover:bg-surface-container text-on-surface transition-colors flex items-center justify-center gap-1" to="/preview/sweet-polaroid">
                <span className="material-symbols-outlined text-[18px]">visibility</span>
                Xem Demo
              </Link>
              <Link className="w-1/2 py-2.5 rounded-full font-label-md text-label-md text-center bg-primary-container hover:bg-primary text-on-primary transition-all shadow-sm hover:scale-[1.02] flex items-center justify-center gap-1 font-semibold" to={isAuthenticated ? "/dashboard?applyTemplate=sweet-polaroid" : "/register"}>
                Dùng Mầu Này
              </Link>
            </div>
          </article>
          <article className="group bg-surface-container-lowest rounded-lg overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between">
            <div>
              <div className="relative w-full aspect-[4/3] bg-surface-container overflow-hidden">
                <img className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500" data-alt="Opulent royal wedding celebration theme with luxury white floral arches, delicate silk ribbons, bride in bespoke lace veil holding champagne glass, warm golden architectural lighting, stately and refined aesthetic." src="https://lh3.googleusercontent.com/aida-public/AB6AXuBiH-OcuHntbbQ8UvFH0-L6HS9n2rVLZPHKjzGTBTpbn1SycA2pJX2KbHqBoqu3gIKtJ3yBO8q2yYeXEmbw845-gFhwqE7Y_4XtPFvoNnWIUJot7VNzECMI-9WF3BpGjAliIsfuA3fonx1PF7525heaaD6hjtBivKzm3ODAPBYRcqVuzEkXAwGTei_1mKSifGJ6MVGz28gdfWY78z2YXK38m4CmD53busZrpmG91sEHX3XUaWCEpUKW" />
                <div className="absolute inset-0 bg-gradient-to-t from-on-background/60 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />
                <div className="absolute top-4 left-4 flex items-center gap-2">
                  <span className="px-3 py-1 bg-surface-container-lowest/90 backdrop-blur-md text-on-surface rounded-full font-label-sm text-label-sm">
                    Đám Cưới & RSVP
                  </span>
                </div>
                <div className="absolute bottom-4 left-4 flex items-center gap-2 text-on-primary">
                  <span className="w-3 h-3 rounded-full bg-tertiary-fixed shadow-sm" />
                  <span className="font-label-sm text-label-sm text-surface-container-low">Hoàng Gia Sang Trọng</span>
                </div>
              </div>
              <div className="p-space-lg">
                <div className="flex items-center justify-between gap-space-sm mb-space-xs">
                  <h2 className="font-headline-md text-headline-md text-on-surface">Royal Wedding Memoir</h2>
                  <div className="flex items-center gap-1 bg-surface-container-low px-2 py-1 rounded-full text-secondary">
                    <span className="material-symbols-outlined text-primary-container text-[16px]" style={{fontVariationSettings: '"FILL" 1'}}>star</span>
                    <span className="font-title-md text-title-md font-bold text-on-surface">5.0</span>
                    <span className="font-label-sm text-label-sm text-on-surface-variant">(64)</span>
                  </div>
                </div>
                <p className="font-body-sm text-body-sm text-on-surface-variant mb-space-md line-clamp-2">
                  Giải pháp toàn diện kết hợp website ngày cưới: thiếp điện tử tương tác, gửi lời chúc mừng trực tiếp và đồng bộ xác nhận khách tham dự (RSVP).
                </p>
                <div className="flex flex-wrap gap-space-xs mb-space-lg">
                  <span className="px-2.5 py-1 rounded-md bg-surface-container-low font-label-sm text-label-sm text-on-surface-variant">Mẫu thiệp online RSVP</span>
                  <span className="px-2.5 py-1 rounded-md bg-surface-container-low font-label-sm text-label-sm text-on-surface-variant">Sổ lưu bút ảo</span>
                  <span className="px-2.5 py-1 rounded-md bg-surface-container-low font-label-sm text-label-sm text-on-surface-variant">Mã QR mừng cưới</span>
                </div>
              </div>
            </div>
            <div className="px-space-lg pb-space-lg pt-0 flex items-center gap-space-sm">
              <Link className="w-1/2 py-2.5 rounded-full font-label-md text-label-md text-center bg-surface-container-low hover:bg-surface-container text-on-surface transition-colors flex items-center justify-center gap-1" to="/preview/royal-wedding">
                <span className="material-symbols-outlined text-[18px]">visibility</span>
                Xem Demo
              </Link>
              <Link className="w-1/2 py-2.5 rounded-full font-label-md text-label-md text-center bg-primary-container hover:bg-primary text-on-primary transition-all shadow-sm hover:scale-[1.02] flex items-center justify-center gap-1 font-semibold" to={isAuthenticated ? "/dashboard?applyTemplate=royal-wedding" : "/register"}>
                Dùng Mầu Này
              </Link>
            </div>
          </article>
        </div>
      </section>
      <section className="max-w-7xl mx-auto px-margin-mobile md:px-margin py-space-xl w-full">
        <div className="bg-surface-container-low rounded-xl p-space-lg md:p-space-xl shadow-sm">
          <div className="text-center max-w-2xl mx-auto mb-space-xl">
            <span className="font-label-md text-label-md text-primary-container font-semibold uppercase tracking-wider">Tiêu chuẩn kỹ thuật cao cấp</span>
            <h2 className="font-headline-lg text-headline-lg text-on-surface mt-space-xs mb-space-sm">
              Mỗi template đều hỗ trợ đầy đủ
            </h2>
            <p className="font-body-md text-body-md text-on-surface-variant">
              Dù bạn chọn phong cách nào, website tình yêu của hai bạn vẫn luôn hoàn hảo đến từng chi tiết và an toàn tuyệt đối.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-space-md">
            <div className="bg-surface-container-lowest p-space-lg rounded-lg shadow-sm flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-full bg-secondary-container flex items-center justify-center text-on-secondary-container mb-space-md">
                  <span className="material-symbols-outlined text-[24px]">devices</span>
                </div>
                <h3 className="font-title-lg text-title-lg text-on-surface mb-space-xs">Responsive 100%</h3>
                <p className="font-body-sm text-body-sm text-on-surface-variant">
                  Tối ưu hóa chuẩn xác trên cả iPhone, Android, iPad và màn hình máy tính lớn. Vuốt chạm mượt mà 120Hz.
                </p>
              </div>
              <div className="mt-space-md pt-space-xs">
                <span className="font-label-sm text-label-sm text-primary font-semibold">Tự động thích ứng thiết bị ✨</span>
              </div>
            </div>
            <div className="bg-surface-container-lowest p-space-lg rounded-lg shadow-sm flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-full bg-surface-variant flex items-center justify-center text-primary-container mb-space-md">
                  <span className="material-symbols-outlined text-[24px]">music_note</span>
                </div>
                <h3 className="font-title-lg text-title-lg text-on-surface mb-space-xs">Phát nhạc nền tùy chọn</h3>
                <p className="font-body-sm text-body-sm text-on-surface-variant">
                  Tích hợp danh sách bài hát gắn liền với kỷ niệm của 2 bạn từ Spotify, Apple Music hoặc tải file MP3 trực tiếp.
                </p>
              </div>
              <div className="mt-space-md pt-space-xs">
                <span className="font-label-sm text-label-sm text-primary font-semibold">Phát nhạc tự động êm dịu ✨</span>
              </div>
            </div>
            <div className="bg-surface-container-lowest p-space-lg rounded-lg shadow-sm flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-full bg-primary-fixed flex items-center justify-center text-on-primary-container mb-space-md">
                  <span className="material-symbols-outlined text-[24px]">lock</span>
                </div>
                <h3 className="font-title-lg text-title-lg text-on-surface mb-space-xs">Bảo mật riêng tư 2 lớp</h3>
                <p className="font-body-sm text-body-sm text-on-surface-variant">
                  Khóa bằng mật khẩu riêng hoặc chỉ mở khi quét mã QR bí mật. Quyền riêng tư về hình ảnh luôn là ưu tiên số 1.
                </p>
              </div>
              <div className="mt-space-md pt-space-xs">
                <span className="font-label-sm text-label-sm text-primary font-semibold">Mã hóa dữ liệu 256-bit ✨</span>
              </div>
            </div>
            <div className="bg-surface-container-lowest p-space-lg rounded-lg shadow-sm flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-full bg-tertiary-fixed flex items-center justify-center text-on-tertiary-container mb-space-md">
                  <span className="material-symbols-outlined text-[24px]">hourglass_top</span>
                </div>
                <h3 className="font-title-lg text-title-lg text-on-surface mb-space-xs">Bộ đếm thời gian thực</h3>
                <p className="font-body-sm text-body-sm text-on-surface-variant">
                  Chính xác từng ngày, giờ, phút, giây yêu nhau. Đi kèm tính năng đếm ngược đến các ngày kỷ niệm trọng đại kế tiếp.
                </p>
              </div>
              <div className="mt-space-md pt-space-xs">
                <span className="font-label-sm text-label-sm text-primary font-semibold">Nhắc nhở thông minh qua SMS ✨</span>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className="max-w-7xl mx-auto px-margin-mobile md:px-margin mb-space-xl w-full">
        <div className="relative overflow-hidden rounded-xl bg-inverse-surface text-inverse-on-surface p-space-lg md:p-space-xl">
          <div className="absolute -right-24 -bottom-24 w-80 h-80 bg-primary-container/30 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-space-xl">
            <div className="max-w-xl space-y-space-sm text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-space-md py-1 rounded-full bg-surface-container-highest/20 text-inverse-on-surface font-label-sm text-label-sm">
                <span className="material-symbols-outlined text-[16px] text-primary-container">design_services</span>
                Dịch vụ Thiết Kế Riêng
              </div>
              <h2 className="font-headline-lg text-headline-lg text-inverse-on-surface">
                Chưa tìm thấy mầu ưng ý?
              </h2>
              <p className="font-body-md text-body-md text-inverse-on-surface/80">
                Gửi câu chuyện, hình ảnh và ý tưởng màu sắc đặc trưng của bạn. Đội ngũ chuyên gia thiết kế CoupleStory sẽ đồng hành may đo một giao diện độc bản 1-1 chỉ dành riêng cho hai người.
              </p>
              <div className="flex items-center justify-center lg:justify-start gap-space-md pt-space-xs">
                <div className="flex -space-x-2">
                  <div className="w-8 h-8 rounded-full bg-secondary-container border-2 border-inverse-surface flex items-center justify-center text-xs font-bold text-on-secondary-container">TH</div>
                  <div className="w-8 h-8 rounded-full bg-primary-fixed border-2 border-inverse-surface flex items-center justify-center text-xs font-bold text-on-primary-fixed">MN</div>
                  <div className="w-8 h-8 rounded-full bg-tertiary-fixed border-2 border-inverse-surface flex items-center justify-center text-xs font-bold text-on-tertiary-fixed">QT</div>
                </div>
                <span className="font-label-sm text-label-sm text-inverse-on-surface/70">Hơn 500+ cặp đôi đã đặt thiết kế bespoke</span>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row items-center gap-space-md shrink-0 w-full sm:w-auto">
              <Link className="w-full sm:w-auto px-space-xl py-3.5 rounded-full font-label-md text-label-md text-on-primary bg-primary-container hover:bg-primary shadow-[0_4px_16px_rgba(255,77,141,0.35)] hover:shadow-[0_6px_20px_rgba(255,77,141,0.45)] hover:scale-[1.02] active:scale-[0.98] transition-all text-center font-medium" to="/#contact">
                Gửi yêu cầu tùy chỉnh 1-1
              </Link>
              <Link className="w-full sm:w-auto px-space-lg py-3.5 rounded-full font-label-md text-label-md text-inverse-on-surface bg-surface-container-highest/20 hover:bg-surface-container-highest/30 transition-colors text-center" to="/#contact">
                Trò chuyện với Designer
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div></main>
</div>

    </div>
  );
}
