import { Link } from 'react-router-dom';
import { usePlans } from '../hooks/usePlans';
import { formatPrice } from '../utils/formatPrice';

export default function Home() {
  const { plans } = usePlans();
  const free = plans.find(p => p.code === 'FREE');
  const pro = plans.find(p => p.code === 'PRO');
  const couple = plans.find(p => p.code === 'COUPLE');
  const proMax = plans.find(p => p.code === 'PRO_MAX');

  return (
    <div className="min-h-screen">
<div>
  <main className="w-full pt-16 bg-surface min-h-[calc(100vh-64px)]"><div className="flex flex-col w-full overflow-hidden">
      <section className="relative w-full pt-10 pb-20 md:pt-16 md:pb-32 px-margin-mobile md:px-margin max-w-7xl mx-auto flex flex-col items-center text-center">
        <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-[720px] h-[400px] bg-gradient-to-b from-surface-container via-surface-variant/30 to-transparent rounded-full blur-3xl pointer-events-none -z-10 opacity-70" />
        <div className="inline-flex items-center gap-space-xs px-space-md py-1.5 rounded-full bg-surface-container text-primary font-label-md text-label-md shadow-sm mb-space-md transition-transform hover:scale-105">
          <span className="text-primary-container text-base">✨</span>
          <span className="font-medium tracking-wide">Nền tảng kỷ niệm tình yêu số 1 Việt Nam</span>
        </div>
        <h1 className="font-headline-xl text-headline-xl text-on-surface max-w-4xl tracking-tight leading-tight mb-space-xs">
          Kể câu chuyện tình yêu của hai bạn
        </h1>
        <p className="font-headline-md text-headline-md text-primary-container italic font-normal tracking-wide mb-space-md">
          Your love story, beautifully told
        </p>
        <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl mx-auto mb-space-xl">
          Tạo trang web kỷ niệm riêng trên tên miền phụ <span className="text-primary font-medium bg-surface-container-high px-2 py-0.5 rounded-full">anh-em.couplestory.site</span> trong 5 phút. Tinh tế, lãng mạn &amp; trường tồn.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-space-md w-full max-w-md mb-space-lg">
          <Link className="w-full sm:w-auto inline-flex items-center justify-center font-label-md text-label-md text-on-primary bg-primary-container hover:bg-primary px-space-xl py-3.5 rounded-full shadow-[0_10px_28px_-4px_rgba(255,77,141,0.45)] hover:shadow-[0_14px_36px_-4px_rgba(255,77,141,0.6)] hover:scale-[1.02] active:scale-[0.98] transition-all font-semibold" data-path="template" to="/templates">
            Khám phá Template
          </Link>
          <Link className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 font-label-md text-label-md text-on-surface bg-surface-container-lowest hover:bg-surface-container border border-outline-variant/60 px-space-lg py-3.5 rounded-full shadow-sm hover:scale-[1.02] active:scale-[0.98] transition-all" data-path="demo" to="/s/eternal">
            <span>Xem Story Demo</span>
            <span className="material-symbols-outlined text-[18px] text-primary">arrow_outward</span>
          </Link>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-x-space-md gap-y-1 text-on-surface-variant font-label-md text-label-md mb-space-xl opacity-90">
          <span className="inline-flex items-center gap-1"><span className="material-symbols-outlined text-primary text-[18px]">check_circle</span> Miễn phí vĩnh viễn</span>
          <span className="hidden sm:inline text-outline-variant">•</span>
          <span className="inline-flex items-center gap-1"><span className="material-symbols-outlined text-primary text-[18px]">check_circle</span> Không cần thẻ tín dụng</span>
          <span className="hidden sm:inline text-outline-variant">•</span>
          <span className="inline-flex items-center gap-1"><span className="material-symbols-outlined text-primary text-[18px]">check_circle</span> Tạo trong 5 phút</span>
        </div>
        <div className="relative w-full max-w-5xl mt-6 px-4">
          <div className="absolute inset-x-12 bottom-0 h-44 bg-primary-container/20 blur-3xl rounded-full -z-10" />
          <div className="relative flex items-end justify-center gap-3 sm:gap-6 lg:gap-8 pt-4">
            <Link to="/templates" className="hidden sm:block w-48 md:w-60 lg:w-64 transform -rotate-6 hover:-rotate-2 transition-transform duration-500 rounded-3xl bg-surface-container-lowest p-2.5 shadow-[0_20px_40px_-10px_rgba(61,31,45,0.15)] shrink-0 block">
              <div className="rounded-2xl overflow-hidden bg-surface-container relative">
                <div className="h-80 md:h-96 relative flex flex-col justify-between p-4">
                  <img className="absolute inset-0 w-full h-full object-cover" data-alt="Tender aesthetic couple in pastel linen clothes walking hand in hand through a blooming cherry blossom garden in gentle morning sunlight with soft rosy tones." src="https://lh3.googleusercontent.com/aida-public/AB6AXuApcoxnNDSgE7aDS81eeAz0nPmtkK2TdIFMlfI42qXLqvpVEOW3ArzGlgyXeYl425MN6ey0dKp9w3F1rz3Vd48KXQ8M27a5vUS7BV0Iub6LoGUq1Ua5Y2oNyFzkAcdOynrYJqCSCHm4WE9TBKEFEDnv9Xz8FVV_roVlXM0CbRPNdOpKFIZ4_khil6d93jHE8quhu48fcKL8zG63mtjKZZe-xXbO07O2BZRN_e_pQvNeE5kBJmH5Qttq" />
                  <div className="absolute inset-0 bg-gradient-to-t from-on-background/80 via-transparent to-black/20" />
                  <div className="relative flex justify-between items-center text-on-primary">
                    <span className="font-label-sm text-label-sm bg-surface-container/30 backdrop-blur-md px-2.5 py-1 rounded-full uppercase tracking-wider">Pastel Dream</span>
                    <span className="material-symbols-outlined text-sm">favorite</span>
                  </div>
                  <div className="relative text-left text-on-primary">
                    <p className="font-label-sm text-label-sm text-tertiary-fixed font-light">Ngày bên nhau</p>
                    <h4 className="font-headline-md text-headline-md tracking-tight leading-none text-white">428 Ngày</h4>
                    <p className="font-body-sm text-body-sm text-surface-container-low truncate mt-1">Minh Quân &amp; Thảo Nhi</p></div></div></div></Link>
            <Link to="/s/eternal" className="w-64 sm:w-72 md:w-80 lg:w-96 z-20 transform -translate-y-4 hover:-translate-y-6 transition-transform duration-500 rounded-[2.5rem] bg-surface-container-lowest p-3 shadow-[0_30px_60px_-12px_rgba(185,10,90,0.28)] block">
              <div className="rounded-[2rem] overflow-hidden bg-surface-container relative">
                <div className="h-96 sm:h-[430px] md:h-[480px] relative flex flex-col justify-between p-5">
                  <img className="absolute inset-0 w-full h-full object-cover" data-alt="Romantic cinematic night portrait of a loving couple embracing on a rooftop terrace overlooking city lights, warm golden sparkles, wine glasses and deep plum rose tones." src="https://lh3.googleusercontent.com/aida-public/AB6AXuD0ZWp-nS6qgSgs110uDTJQNKI3FDPLNecgA-PARntX-PTQPAw8uqJemngqRGqpjFJLq_QODv6SA-IZvEzDCcC0FdDmoLn8AN3_yl4SIY0QsMwxO8hp2v97FGLKh7eG-Jf3SLvNlZZWphZa0exUrR9OYJ7vNP9uWXhecTCjQrvXrsXfOFChFDHC5fcRAnZAnUlYP9gHmqFnOSyyKbeDd19NfN0xHhrMFvbjH73ciZNKOmnw-frxoHfu" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1A0A12]/90 via-[#1A0A12]/30 to-[#1A0A12]/40" />
                  <div className="relative flex justify-between items-center text-on-primary">
                    <div className="flex items-center gap-1.5 bg-black/40 backdrop-blur-md px-3 py-1 rounded-full">
                      <span className="w-2 h-2 rounded-full bg-primary-container animate-pulse" />
                      <span className="font-label-sm text-label-sm tracking-wide">Eternal Love</span>
                    </div>
                    <div className="flex items-center gap-1 text-primary-fixed">
                      <span className="material-symbols-outlined text-sm" style={{fontVariationSettings: '"FILL" 1'}}>favorite</span>
                      <span className="font-label-sm text-label-sm font-semibold">1,000 Days</span>
                    </div>
                  </div>
                  <div className="relative text-center my-auto">
                    <div className="w-16 h-16 mx-auto rounded-full bg-surface-container/20 backdrop-blur-md flex items-center justify-center text-primary-container shadow-inner mb-2">
                      <span className="material-symbols-outlined text-3xl" style={{fontVariationSettings: '"FILL" 1'}}>favorite</span>
                    </div>
                    <p className="font-headline-md text-headline-md text-white font-medium">Bảo Long &amp; An Nhiên</p>
                    <p className="font-label-md text-label-md text-primary-fixed-dim italic">Kể từ 14.02.2023</p>
                  </div>
                  <div className="relative bg-surface-container-lowest/90 backdrop-blur-md rounded-2xl p-3.5 text-on-surface shadow-md">
                    <div className="grid grid-cols-4 gap-1 text-center divide-x divide-outline-variant/30">
                      <div>
                        <span className="font-headline-md text-headline-md text-primary-container leading-none block">02</span>
                        <span className="font-label-sm text-label-sm text-on-surface-variant uppercase">Năm</span>
                      </div>
                      <div>
                        <span className="font-headline-md text-headline-md text-primary-container leading-none block">08</span>
                        <span className="font-label-sm text-label-sm text-on-surface-variant uppercase">Tháng</span>
                      </div>
                      <div>
                        <span className="font-headline-md text-headline-md text-primary-container leading-none block">24</span>
                        <span className="font-label-sm text-label-sm text-on-surface-variant uppercase">Ngày</span>
                      </div>
                      <div>
                        <span className="font-headline-md text-headline-md text-primary-container leading-none block">18</span>
                        <span className="font-label-sm text-label-sm text-on-surface-variant uppercase">Giờ</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
            <Link to="/s/minimal" className="hidden sm:block w-48 md:w-60 lg:w-64 transform rotate-6 hover:rotate-2 transition-transform duration-500 rounded-3xl bg-surface-container-lowest p-2.5 shadow-[0_20px_40px_-10px_rgba(61,31,45,0.15)] shrink-0 block">
              <div className="rounded-2xl overflow-hidden bg-surface-container relative">
                <div className="h-80 md:h-96 relative flex flex-col justify-between p-4">
                  <img className="absolute inset-0 w-full h-full object-cover" data-alt="High-fashion black and white editorial photograph of a stylish young couple laughing under an umbrella in rain, clean editorial framing, minimal aesthetic." src="https://lh3.googleusercontent.com/aida-public/AB6AXuAyStGPyU2ayq3Go4g4xbbnG8SG_Ks3t1-uFevCP9ymXqSmmyIyBotXsGd9WpEhPYXMAdRxyZb_P_r5sRbaXqMDLpeUi2gphkMRZokYxelumEqkxT5j7koKXKiIAWfJZivnKJHkkDC-BxsXe48mPd_4qcOe8EnxB65BWOEpPAEDnUWtpviR-1vKZ5MXCbKwHMfKQXm-1B-OCxVJ_5VkpN5thlQKzwmFXzM0ACn7VWj0T5JiAQnNLjJW" />
                  <div className="absolute inset-0 bg-gradient-to-t from-on-background/85 via-transparent to-transparent" />
                  <div className="relative flex justify-between items-center text-on-primary">
                    <span className="font-label-sm text-label-sm bg-surface-container/30 backdrop-blur-md px-2.5 py-1 rounded-full uppercase tracking-wider">Minimal Mag</span>
                    <span className="material-symbols-outlined text-sm">bookmark</span>
                  </div>
                  <div className="relative text-left text-on-primary">
                    <p className="font-label-sm text-label-sm text-tertiary-fixed font-light">Issue Nº 04</p>
                    <h4 className="font-headline-md text-headline-md tracking-tight leading-none text-white">Our Journey</h4>
                    <p className="font-body-sm text-body-sm text-surface-container-low truncate mt-1">Đăng Khoa &amp; Thùy Trang</p></div></div></div></Link>
          </div>
        </div>
        <a className="mt-12 inline-flex flex-col items-center gap-1 text-on-surface-variant/70 hover:text-primary transition-colors animate-bounce" href="#stats-section">
          <span className="font-label-sm text-label-sm tracking-wider uppercase">Khám phá thêm</span>
          <span className="material-symbols-outlined text-xl">keyboard_arrow_down</span>
        </a>
      </section>
      <section className="w-full px-margin-mobile md:px-margin max-w-7xl mx-auto my-6" id="stats-section">
        <div className="bg-surface-container rounded-2xl p-space-lg md:p-space-xl shadow-sm">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-y-space-lg gap-x-space-md text-center">
            <div className="space-y-1">
              <p className="font-headline-lg text-headline-lg text-primary tracking-tight font-bold">5,000+</p>
              <p className="font-title-md text-title-md text-on-surface font-medium">Cặp đôi tin tưởng</p>
              <p className="font-body-sm text-body-sm text-on-surface-variant">Lưu giữ trang riêng</p>
            </div>
            <div className="space-y-1">
              <p className="font-headline-lg text-headline-lg text-primary tracking-tight font-bold">10+</p>
              <p className="font-title-md text-title-md text-on-surface font-medium">Template độc quyền</p>
              <p className="font-body-sm text-body-sm text-on-surface-variant">Thiết kế bởi Artist</p>
            </div>
            <div className="space-y-1">
              <div className="inline-flex items-center justify-center gap-1 text-primary">
                <span className="font-headline-lg text-headline-lg tracking-tight font-bold">4.9/5</span>
                <span className="material-symbols-outlined text-2xl" style={{fontVariationSettings: '"FILL" 1'}}>star</span>
              </div>
              <p className="font-title-md text-title-md text-on-surface font-medium">Điểm hài lòng</p>
              <p className="font-body-sm text-body-sm text-on-surface-variant">Đánh giá từ người dùng</p>
            </div>
            <div className="space-y-1">
              <p className="font-headline-lg text-headline-lg text-primary tracking-tight font-bold">99.9%</p>
              <p className="font-title-md text-title-md text-on-surface font-medium">Thời gian lưu giữ</p>
              <p className="font-body-sm text-body-sm text-on-surface-variant">Bảo mật &amp; trọn đời</p>
            </div>
          </div>
        </div>
      </section>
      <section className="w-full py-20 px-margin-mobile md:px-margin max-w-7xl mx-auto text-center">
        <div className="space-y-2 mb-space-xl">
          <span className="font-label-sm text-label-sm text-primary tracking-widest uppercase font-semibold bg-surface-container px-3 py-1 rounded-full">Quy trình</span>
          <h2 className="font-headline-xl text-headline-xl text-on-surface tracking-tight">Đơn giản như yêu nhau</h2>
          <p className="font-body-lg text-body-lg text-on-surface-variant max-w-xl mx-auto">Chỉ 3 bước thảnh thơi để có ngay trang web kỷ niệm đôi lãng mạn và tinh tế nhất</p>
        </div>
        <div className="relative grid grid-cols-1 md:grid-cols-3 gap-space-lg text-left">
          <div className="relative bg-surface-container-lowest rounded-2xl p-space-xl shadow-sm hover:shadow-md transition-shadow group">
            <div className="flex items-center justify-between mb-space-md">
              <span className="font-headline-xl text-headline-xl text-primary-fixed-dim/60 font-serif leading-none">01</span>
              <div className="w-12 h-12 rounded-full bg-surface-container flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                <span className="material-symbols-outlined text-2xl">style</span>
              </div>
            </div>
            <h3 className="font-title-lg text-title-lg text-on-surface mb-2 font-semibold">Chọn Template</h3>
            <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
              Lựa chọn từ bộ sưu tập phong cách lãng mạn đa dạng: tối giản thanh lịch, tạp chí thời trang hay scrapbook ấm cúng.
            </p>
          </div>
          <div className="relative bg-surface-container-lowest rounded-2xl p-space-xl shadow-sm hover:shadow-md transition-shadow group">
            <div className="flex items-center justify-between mb-space-md">
              <span className="font-headline-xl text-headline-xl text-primary-fixed-dim/60 font-serif leading-none">02</span>
              <div className="w-12 h-12 rounded-full bg-surface-container flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                <span className="material-symbols-outlined text-2xl">edit_note</span>
              </div>
            </div>
            <h3 className="font-title-lg text-title-lg text-on-surface mb-2 font-semibold">Kể câu chuyện</h3>
            <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
              Tải lên ảnh kỷ niệm, viết thư tình gửi người thương, đánh dấu mốc ngày đầu gặp gỡ và bài hát tình ca đặc biệt của cả hai.
            </p>
          </div>
          <div className="relative bg-surface-container-lowest rounded-2xl p-space-xl shadow-sm hover:shadow-md transition-shadow group">
            <div className="flex items-center justify-between mb-space-md">
              <span className="font-headline-xl text-headline-xl text-primary-fixed-dim/60 font-serif leading-none">03</span>
              <div className="w-12 h-12 rounded-full bg-surface-container flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                <span className="material-symbols-outlined text-2xl">share</span>
              </div>
            </div>
            <h3 className="font-title-lg text-title-lg text-on-surface mb-2 font-semibold">Chia sẻ riêng tư</h3>
            <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
              Nhận ngay tên miền phụ độc nhất. Cùng người ấy cài đặt mật khẩu riêng tư và cùng nhau cập nhật nhật ký mỗi ngày.
            </p>
          </div>
        </div>
      </section>
      <section className="w-full py-20 px-margin-mobile md:px-margin max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-space-xl gap-4">
          <div className="space-y-2">
            <span className="font-label-sm text-label-sm text-primary tracking-widest uppercase font-semibold bg-surface-container px-3 py-1 rounded-full">Bộ sưu tập mẫu</span>
            <h2 className="font-headline-xl text-headline-xl text-on-surface tracking-tight">Chọn phong cách của riêng bạn</h2>
            <p className="font-body-lg text-body-lg text-on-surface-variant max-w-xl">
              Đổi template bất kỳ lúc nào — toàn bộ hình ảnh và dữ liệu kỷ niệm không bao giờ mất.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2 overflow-x-auto pb-2">
            <button className="px-space-md py-1.5 rounded-full font-label-md text-label-md bg-primary-container text-on-primary font-medium shadow-sm" type="button">Tất cả</button>
            <button className="px-space-md py-1.5 rounded-full font-label-md text-label-md bg-surface-container hover:bg-surface-container-high text-on-surface-variant transition-colors" type="button">Romantic</button>
            <button className="px-space-md py-1.5 rounded-full font-label-md text-label-md bg-surface-container hover:bg-surface-container-high text-on-surface-variant transition-colors" type="button">Minimal Magazine</button>
            <button className="px-space-md py-1.5 rounded-full font-label-md text-label-md bg-surface-container hover:bg-surface-container-high text-on-surface-variant transition-colors" type="button">Scrapbook</button>
            <button className="px-space-md py-1.5 rounded-full font-label-md text-label-md bg-surface-container hover:bg-surface-container-high text-on-surface-variant transition-colors" type="button">Cinematic Dark</button>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-space-lg">
          <div className="group relative rounded-2xl overflow-hidden bg-surface-container-lowest shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col">
            <div className="relative aspect-[3/4] w-full overflow-hidden bg-surface-container">
              <img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" data-alt="Dark luxury romantic theme website preview for couples, deep burgundy tones, candlelight dinner photography, elegant serif headings, and love countdown widget." src="https://lh3.googleusercontent.com/aida-public/AB6AXuC0pHtF1hOak7OMJa1OgX-ZcvofSqnq0WbnDDIRf0sY-pTFZiWMCP8rrVTVHZn1Fo-vQf6eQ6j_g5r_qi822g3y49J9HxCfPvnFaqTnyhV-szDg_oVbP79OVT8JJSJ8_lfcP-0BZ7kS-9JHOiboHifoYUoQJfXpysDuIPeIYrlIA6u-jkVVh0K9lAqTS3N47d-DnmSVLEAfplqSD0AEvo-uSwy2mSG1fjHSMjRMMdtcsq3r76TH_hx7" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
              <span className="absolute top-4 left-4 font-label-sm text-label-sm bg-primary text-on-primary px-3 py-1 rounded-full font-semibold">GÓI COUPLE</span>
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-[2px] bg-black/20">
                <a className="px-space-lg py-2.5 bg-on-primary text-primary font-label-md text-label-md font-semibold rounded-full shadow-lg hover:scale-105 transition-transform" href="#">Xem trước mẫu</a>
              </div>
            </div>
            <div className="p-space-lg flex items-center justify-between">
              <div>
                <h3 className="font-title-lg text-title-lg text-on-surface font-semibold">Eternal Love</h3>
                <p className="font-body-sm text-body-sm text-on-surface-variant">Luxury editorial, quý phái &amp; nồng nàn</p>
              </div>
              <span className="material-symbols-outlined text-primary group-hover:translate-x-1 transition-transform">arrow_forward</span>
            </div>
          </div>
          <div className="group relative rounded-2xl overflow-hidden bg-surface-container-lowest shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col">
            <div className="relative aspect-[3/4] w-full overflow-hidden bg-surface-container">
              <img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" data-alt="Minimalist clean couple website design, large whitespace, black and white artistic candid photo of boyfriend and girlfriend, clean typography with soft pink accents." src="https://lh3.googleusercontent.com/aida-public/AB6AXuCC2EyudhMtc1YIjNsWV_1UqYv6fGlBx4vOheV8QM2xgFA8DVO635Jt8MUgOjLh5hYGa_lZ8etSvGy6yHLgos-ABCl3-J37El7EX4auVSzZaQ2G-dPwJtHbzWV12oy_GrVphQIOHayazMjPr22vaBgZU1IjS7-SpiDNV74ALy8n1SMKFR6v0M7hjTGai5Jd6sZ209fTAH3FZuW2Jr2RRNuLCI8D_bFiQYA6sSqLTl2pHNoyr_BqUAJd" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
              <span className="absolute top-4 left-4 font-label-sm text-label-sm bg-surface-container-high text-on-surface px-3 py-1 rounded-full font-semibold">MIỄN PHÍ</span>
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-[2px] bg-black/20">
                <a className="px-space-lg py-2.5 bg-on-primary text-primary font-label-md text-label-md font-semibold rounded-full shadow-lg hover:scale-105 transition-transform" href="#">Xem trước mẫu</a>
              </div>
            </div>
            <div className="p-space-lg flex items-center justify-between">
              <div>
                <h3 className="font-title-lg text-title-lg text-on-surface font-semibold">Minimal Couple</h3>
                <p className="font-body-sm text-body-sm text-on-surface-variant">Khoảng lặng tinh khôi phong cách tạp chí</p>
              </div>
              <span className="material-symbols-outlined text-primary group-hover:translate-x-1 transition-transform">arrow_forward</span>
            </div>
          </div>
          <div className="group relative rounded-2xl overflow-hidden bg-surface-container-lowest shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col">
            <div className="relative aspect-[3/4] w-full overflow-hidden bg-surface-container">
              <img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" data-alt="Scrapbook vintage style couple webpage with polaroid tape frames, hand-drawn rose floral doodles, warm pastel pink paper background and handwritten letter elements." src="https://lh3.googleusercontent.com/aida-public/AB6AXuDtpNeHNhjYBechpPMyIujhRmHm88245lvvUSgHjixd5--EyBghJ3w1i93PZR-aOgZyrGad5Pwf_5B5T6lmB3MFg-9hoZtAV8VhXyTqAUQnsOySFA-wj4a_6w7J7Ujvp-Yy8tJ72tFRvoMHMzNA3wcOZyFaHVuEMl-d7pj68AZbRPQAbrhzeffDOkB0tr9uC2sV3XwhRMWNDOLw14vy8eftHmxhmzb6Dq-E42tYZdWHkTG9_M_3cksD" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
              <span className="absolute top-4 left-4 font-label-sm text-label-sm bg-secondary text-on-secondary px-3 py-1 rounded-full font-semibold">VĨNH VIỄN</span>
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-[2px] bg-black/20">
                <a className="px-space-lg py-2.5 bg-on-primary text-primary font-label-md text-label-md font-semibold rounded-full shadow-lg hover:scale-105 transition-transform" href="#">Xem trước mẫu</a>
              </div>
            </div>
            <div className="p-space-lg flex items-center justify-between">
              <div>
                <h3 className="font-title-lg text-title-lg text-on-surface font-semibold">Sweet Memories</h3>
                <p className="font-body-sm text-body-sm text-on-surface-variant">Sổ lưu niệm Polaroid pastel mộc mạc</p>
              </div>
              <span className="material-symbols-outlined text-primary group-hover:translate-x-1 transition-transform">arrow_forward</span>
            </div>
          </div>
          <div className="group relative rounded-2xl overflow-hidden bg-surface-container-lowest shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col">
            <div className="relative aspect-[3/4] w-full overflow-hidden bg-surface-container">
              <img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" data-alt="Sunset golden hour beach photography on a couple website template, warm honey light, cinematic flares, elegant script calligraphy and heart timeline milestones." src="https://lh3.googleusercontent.com/aida-public/AB6AXuDP-5iocu2Onp-9wMHPXqHDgvykGcd5Sn_v7cg5jGKsPB0IUD3lYoAY0dVye5-diwlV35OHdsnNXPkrSNUS8yQTC79qgAoljdgVmy4DmLnXZYuo2snBMSgyBLKNRJ2Zc1pxO1lTaB6U4eXJJ2KQztKB71OKtoGWpRpCL9MMo7Feoc4TlpO2Pt3g3zOUzVLKJfjtW7cLeTQgnAzY6fMaNkYxxtkKLRelI-cWg3ST9r7NvPn2MSMrW25o" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
              <span className="absolute top-4 left-4 font-label-sm text-label-sm bg-primary-container text-on-primary px-3 py-1 rounded-full font-semibold">GÓI PRO MAX</span>
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-[2px] bg-black/20">
                <a className="px-space-lg py-2.5 bg-on-primary text-primary font-label-md text-label-md font-semibold rounded-full shadow-lg hover:scale-105 transition-transform" href="#">Xem trước mẫu</a>
              </div>
            </div>
            <div className="p-space-lg flex items-center justify-between">
              <div>
                <h3 className="font-title-lg text-title-lg text-on-surface font-semibold">Golden Hour</h3>
                <p className="font-body-sm text-body-sm text-on-surface-variant">Hoàng hôn điện ảnh, ấm áp &amp; rạng rỡ</p>
              </div>
              <span className="material-symbols-outlined text-primary group-hover:translate-x-1 transition-transform">arrow_forward</span>
            </div>
          </div>
          <div className="group relative rounded-2xl overflow-hidden bg-surface-container-lowest shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col">
            <div className="relative aspect-[3/4] w-full overflow-hidden bg-surface-container">
              <img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" data-alt="Poetic love letter template for couples, soft cream cotton paper texture, vintage dried rose petals, serif font love confessions and subtle wax seal stamps." src="https://lh3.googleusercontent.com/aida-public/AB6AXuAYWSlKm9mIOGnQeLxEvlFrBLvwmxHYxRE-HnP8vWCNEslqbuG280IKx5Gxf0C-xFl0flaKLNMZyF3n8s4M785MpB7hm0rmfl8fO_UoEgywBvCSXzTFedFiCu9tFyGNa_RjoWaRWd2XtYEk-Hm5x1m1pVPv2n_DMtQwKYC0YghXOy4LLF16li7xvVBhyXhEPPvkz79txbCO_NWhkmpp9fGKHe7_CgwU-TVxXeNzllpDpOzEp0fgqncE" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
              <span className="absolute top-4 left-4 font-label-sm text-label-sm bg-primary text-on-primary px-3 py-1 rounded-full font-semibold">GÓI COUPLE</span>
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-[2px] bg-black/20">
                <a className="px-space-lg py-2.5 bg-on-primary text-primary font-label-md text-label-md font-semibold rounded-full shadow-lg hover:scale-105 transition-transform" href="#">Xem trước mẫu</a>
              </div>
            </div>
            <div className="p-space-lg flex items-center justify-between">
              <div>
                <h3 className="font-title-lg text-title-lg text-on-surface font-semibold">Letter to You</h3>
                <p className="font-body-sm text-body-sm text-on-surface-variant">Thư tình sâu lắng trên nền giấy mộc</p>
              </div>
              <span className="material-symbols-outlined text-primary group-hover:translate-x-1 transition-transform">arrow_forward</span>
            </div>
          </div>
          <div className="group relative rounded-2xl overflow-hidden bg-surface-container-lowest shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col">
            <div className="relative aspect-[3/4] w-full overflow-hidden bg-surface-container">
              <img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" data-alt="Haute couture romance couple template set in European cafe Paris vibes, black and pink rose tones, classy editorial portraits and music player widget." src="https://lh3.googleusercontent.com/aida-public/AB6AXuBELsFoEKuBAdiwFqMbboE94JraMHO0ms7SpB-NTS3E3GBYO0VzBC1YFJw63aJB2kHwlNfGPvL9hM2LR6yFDOQctrTYME_LgZl-dhMEyrrkysw4VnzVSQIeBthzudZAk4uXBkKiDRwYu4nEeUoWI18pxcpzsVGy1P9Zqt7abZFLsYYigJB6rI5L6-r4l_RbshJj11B3vvngx-FPLYLWaTRhdk-6BKY3SgDKbLaGcrVHd-Xcr--v5lhn" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
              <span className="absolute top-4 left-4 font-label-sm text-label-sm bg-primary-container text-on-primary px-3 py-1 rounded-full font-semibold">GÓI PRO MAX</span>
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-[2px] bg-black/20">
                <a className="px-space-lg py-2.5 bg-on-primary text-primary font-label-md text-label-md font-semibold rounded-full shadow-lg hover:scale-105 transition-transform" href="#">Xem trước mẫu</a>
              </div>
            </div>
            <div className="p-space-lg flex items-center justify-between">
              <div>
                <h3 className="font-title-lg text-title-lg text-on-surface font-semibold">Paris Romance</h3>
                <p className="font-body-sm text-body-sm text-on-surface-variant">Lãng mạn đậm chất Paris cổ điển &amp; hiện đại</p>
              </div>
              <span className="material-symbols-outlined text-primary group-hover:translate-x-1 transition-transform">arrow_forward</span>
            </div>
          </div>
        </div>
        <div className="mt-space-xl text-center">
          <Link className="inline-flex items-center gap-2 font-title-md text-title-md text-primary font-semibold hover:gap-3 transition-all" data-path="template" to="/templates">
            <span>Xem tất cả 10 Template thiết kế sẵn</span>
            <span className="material-symbols-outlined text-lg">arrow_forward</span>
          </Link>
        </div>
      </section>
      <section className="w-full py-20 px-margin-mobile md:px-margin max-w-7xl mx-auto">
        <div className="bg-gradient-to-br from-surface-container via-surface-container-low to-surface-variant/40 rounded-3xl p-space-lg md:p-space-xl lg:p-20 shadow-sm relative overflow-hidden">
          <div className="absolute right-0 top-0 w-96 h-96 bg-primary-container/10 rounded-full blur-3xl pointer-events-none" />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-space-xl items-center">
            <div className="relative flex items-center justify-center py-6">
              <div className="relative w-full max-w-md bg-surface-container-lowest rounded-3xl p-5 shadow-xl">
                <div className="flex items-center justify-between pb-4 border-b border-outline-variant/40">
                  <div className="flex items-center gap-2">
                    <div className="flex -space-x-2">
                      <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-on-primary font-label-sm text-label-sm font-bold shadow ring-2 ring-surface-container-lowest">
                        A
                      </div>
                      <div className="w-8 h-8 rounded-full bg-primary-container flex items-center justify-center text-on-primary font-label-sm text-label-sm font-bold shadow ring-2 ring-surface-container-lowest">
                        E
                      </div>
                    </div>
                    <div>
                      <p className="font-label-md text-label-md text-on-surface font-semibold leading-none">Chung đôi: Anh &amp; Em</p>
                      <p className="font-label-sm text-label-sm text-primary flex items-center gap-1 mt-0.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary-container animate-pulse" /> Đồng bộ thời gian thực
                      </p>
                    </div>
                  </div>
                  <span className="material-symbols-outlined text-on-surface-variant text-xl">favorite</span>
                </div>
                <div className="py-4 space-y-3">
                  <div className="p-3 bg-surface-container-low rounded-xl">
                    <div className="flex items-center justify-between text-xs text-on-surface-variant mb-1">
                      <span className="font-medium">Love Letter mới nhất</span>
                      <span>10:42 PM</span>
                    </div>
                    <p className="font-body-sm text-body-sm text-on-surface italic line-clamp-2">
                      "Cảm ơn em vì đã cùng anh đi qua những ngày tháng bình yên nhất của tuổi trẻ..."
                    </p>
                  </div>
                  <div className="flex items-center gap-2 bg-surface-container-high/80 backdrop-blur-md px-3 py-1.5 rounded-full w-fit shadow-sm">
                    <div className="w-5 h-5 rounded-full bg-primary-container text-white flex items-center justify-center text-[10px] font-bold">E</div>
                    <span className="font-label-sm text-label-sm text-on-surface">Em đang thêm 3 ảnh kỷ niệm Đà Lạt...</span>
                  </div>
                  <div className="grid grid-cols-3 gap-2 pt-1">
                    <div className="aspect-square rounded-lg bg-surface-container overflow-hidden">
                      <img className="w-full h-full object-cover" data-alt="Candid cafe photo of boyfriend smiling while looking across the table at his girlfriend with soft warm coffee tones." src="https://lh3.googleusercontent.com/aida-public/AB6AXuB9YbBmcG7PI64M--JxIX0ZuL_2ktrPo9ctvHqFzgmkhtoY7VngvpnIpSQz_m3Z_YhHNFAF_QwtDdN77mRywYjLtYWeSxF-aZDT0AKAOh-KKG_w1aqXmi8aglqD0rJg9pAZH0BpmFW6D4AIgmYF_2NfAM-2CnWn6uIfnuc2KRgc4__wggdfwkhxZ9tiualy4-fl8GnZLu8fWMoriwkKu2ygDStjlV2_7GbkhGJGXN8xwzW3yyBU_Sx4" />
                    </div>
                    <div className="aspect-square rounded-lg bg-surface-container overflow-hidden">
                      <img className="w-full h-full object-cover" data-alt="Couples hands holding warm matcha cups on a wooden table with delicate love rings on fingers." src="https://lh3.googleusercontent.com/aida-public/AB6AXuAxgl-holroCIPKrmLx1PoF-5uaBJFFjDf-61pDScFWvy3uZ4I_pjVm2EwN8iRfJdlfvJ883VVPcozEJwYe1teBIG_xUD4GZy8vSJMZEH4ftKK54zC0arLP6YvZ12S_aX6j9HGdh7zSmGyaaYrvHPE1HKpTAS8gc25_xJVyQjRUnhXD2POBNbwDniOCooqNG4Wle9i4IfsgsWhD3oim2qb1owOQwEKmQEUFyeMI72Bf_RithtQ08rah" />
                    </div>
                    <div className="aspect-square rounded-lg bg-surface-container overflow-hidden relative flex items-center justify-center bg-primary-container/10">
                      <span className="font-label-md text-label-md text-primary font-bold">+12</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 bg-surface-container/90 backdrop-blur-md px-3 py-1.5 rounded-full w-fit ml-auto shadow-sm">
                    <span className="font-label-sm text-label-sm text-on-surface">Anh vừa cập nhật nhạc nền: Dẫu có lỗi lầm</span>
                    <div className="w-5 h-5 rounded-full bg-primary text-white flex items-center justify-center text-[10px] font-bold">A</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="space-y-space-md">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary-container text-on-primary font-label-sm text-label-sm font-semibold tracking-wide shadow-sm">
                <span>💑</span>
                <span>TÍNH NĂNG ĐỘC QUYỀN</span>
              </div>
              <h2 className="font-headline-xl text-headline-xl text-on-surface tracking-tight leading-tight">
                Cùng nhau tạo,<br /><span className="text-primary-container">cùng nhau kể</span>
              </h2>
              <p className="font-body-lg text-body-lg text-on-surface-variant">
                Không còn là trang web do một người đơn độc tạo ra. Với gói COUPLE, cả hai người đều có tài khoản riêng biệt để cùng nhau chăm sóc "ngôi nhà tình yêu số" mỗi ngày.
              </p>
              <ul className="space-y-3 pt-2">
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0 mt-0.5">
                    <span className="material-symbols-outlined text-[16px]">done</span>
                  </div>
                  <p className="font-body-md text-body-md text-on-surface">
                    <strong className="font-semibold text-primary">2 tài khoản cùng quản lý:</strong> Mỗi người tự cập nhật suy nghĩ, thêm ảnh và câu chuyện mà không cần chia sẻ mật khẩu.
                  </p>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0 mt-0.5">
                    <span className="material-symbols-outlined text-[16px]">done</span>
                  </div>
                  <p className="font-body-md text-body-md text-on-surface">
                    <strong className="font-semibold text-primary">Thông báo bất ngờ:</strong> Nhận thông báo ngọt ngào ngay khi đối phương vừa viết một bức thư tình bí mật.
                  </p>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0 mt-0.5">
                    <span className="material-symbols-outlined text-[16px]">done</span>
                  </div>
                  <p className="font-body-md text-body-md text-on-surface">
                    <strong className="font-semibold text-primary">Album ảnh bảo mật đôi bên:</strong> Dung lượng lưu trữ ảnh chất lượng gốc không giới hạn, mã hóa an toàn.
                  </p>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0 mt-0.5">
                    <span className="material-symbols-outlined text-[16px]">done</span>
                  </div>
                  <p className="font-body-md text-body-md text-on-surface">
                    <strong className="font-semibold text-primary">Quà tặng mở khóa theo ngày:</strong> Đặt lịch gửi thư hoặc quà bí mật chỉ mở khóa đúng dịp kỷ niệm 100 ngày, 1 năm hay ngày cầu hôn.
                  </p>
                </li>
              </ul>
              <div className="pt-space-sm">
                <Link className="inline-flex items-center gap-2 font-label-md text-label-md text-on-primary bg-primary-container hover:bg-primary px-space-xl py-3 rounded-full shadow-md hover:shadow-lg hover:scale-105 transition-all font-semibold" data-path="bang-gia" to="/pricing">
                  <span>Khám phá gói COUPLE</span>
                  <span>💑</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="w-full py-20 px-margin-mobile md:px-margin max-w-7xl mx-auto text-center">
        <div className="space-y-2 mb-space-xl">
          <span className="font-label-sm text-label-sm text-primary tracking-widest uppercase font-semibold bg-surface-container px-3 py-1 rounded-full">Bảng giá minh bạch</span>
          <h2 className="font-headline-xl text-headline-xl text-on-surface tracking-tight">Bắt đầu miễn phí, nâng cấp khi sẵn sàng</h2>
          <p className="font-body-lg text-body-lg text-on-surface-variant max-w-xl mx-auto">Chọn hành trình phù hợp với tình yêu của hai bạn, không có phí ẩn</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-space-md text-left items-stretch">
          <div className="bg-surface-container-lowest rounded-2xl p-space-lg shadow-sm flex flex-col justify-between">
            <div>
              <div className="mb-4">
                <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider font-semibold">Gói Miễn Phí</span>
                <h3 className="font-headline-md text-headline-md text-on-surface mt-1">{free?.name?.toUpperCase() ?? 'FREE'}</h3>
                <div className="mt-4 flex items-baseline gap-1">
                  <span className="font-headline-lg text-headline-lg text-on-surface font-bold">{formatPrice(free?.price ?? 0)}</span>
                  <span className="font-body-sm text-body-sm text-on-surface-variant">/ mãi mãi</span>
                </div>
                <p className="font-body-sm text-body-sm text-on-surface-variant mt-2">{free?.description ?? 'Miễn phí vĩnh viễn với các tính năng cơ bản'}</p>
              </div>
              <ul className="space-y-2.5 border-t border-outline-variant/30 pt-4 font-body-sm text-body-sm text-on-surface">
                <li className="flex items-center gap-2"><span className="material-symbols-outlined text-primary text-[18px]">check</span> 1 Trang Story kỷ niệm</li>
                <li className="flex items-center gap-2"><span className="material-symbols-outlined text-primary text-[18px]">check</span> Tên miền couplestory.site</li>
                <li className="flex items-center gap-2"><span className="material-symbols-outlined text-primary text-[18px]">check</span> Tải tối đa 20 ảnh</li>
                <li className="flex items-center gap-2 text-on-surface-variant/60 line-through"><span className="material-symbols-outlined text-[18px]">close</span> Hai tài khoản đồng sáng tạo</li>
              </ul>
            </div>
            <Link className="mt-space-lg w-full text-center py-2.5 rounded-full font-label-md text-label-md text-primary bg-surface-container hover:bg-surface-container-high transition-colors font-medium" data-path="dang-ky" to="/register">Bắt đầu ngay</Link>
          </div>
          <div className="bg-surface-container-lowest rounded-2xl p-space-lg shadow-sm flex flex-col justify-between">
            <div>
              <div className="mb-4">
                <span className="font-label-sm text-label-sm text-secondary uppercase tracking-wider font-semibold">Gói Pro</span>
                <h3 className="font-headline-md text-headline-md text-on-surface mt-1">{pro?.name?.toUpperCase() ?? 'PRO'}</h3>
                <div className="mt-4 flex items-baseline gap-1">
                  <span className="font-headline-lg text-headline-lg text-on-surface font-bold">{formatPrice(pro?.price ?? 49000)}</span>
                  <span className="font-body-sm text-body-sm text-on-surface-variant">/ trọn đời</span>
                </div>
                <p className="font-body-sm text-body-sm text-on-surface-variant mt-2">{pro?.description ?? 'Lưu giữ trang tình yêu trọn đời không hết hạn'}</p>
              </div>
              <ul className="space-y-2.5 border-t border-outline-variant/30 pt-4 font-body-sm text-body-sm text-on-surface">
                <li className="flex items-center gap-2"><span className="material-symbols-outlined text-primary text-[18px]">check</span> 1 Trang Story trọn đời</li>
                <li className="flex items-center gap-2"><span className="material-symbols-outlined text-primary text-[18px]">check</span> Tải ảnh chất lượng cao</li>
                <li className="flex items-center gap-2"><span className="material-symbols-outlined text-primary text-[18px]">check</span> Khóa mật khẩu riêng tư</li>
                <li className="flex items-center gap-2"><span className="material-symbols-outlined text-primary text-[18px]">check</span> Nhạc nền tự chọn</li>
              </ul>
            </div>
            <Link className="mt-space-lg w-full text-center py-2.5 rounded-full font-label-md text-label-md text-primary bg-surface-container hover:bg-surface-container-high transition-colors font-medium" data-path="bang-gia" to="/pricing">Chọn gói này</Link>
          </div>
          <div className="relative bg-surface-container-lowest rounded-2xl p-space-lg shadow-[0_16px_36px_-6px_rgba(255,77,141,0.25)] ring-2 ring-primary-container flex flex-col justify-between transform lg:-translate-y-2">
            <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-primary-container text-on-primary px-3 py-0.5 rounded-full font-label-sm text-label-sm font-semibold tracking-wide uppercase shadow">
              Khuyên dùng ⭐
            </div>
            <div>
              <div className="mb-4">
                <span className="font-label-sm text-label-sm text-primary uppercase tracking-wider font-semibold">Đồng Sáng Tạo</span>
                <h3 className="font-headline-md text-headline-md text-primary-container mt-1">{couple?.name?.toUpperCase() ?? 'COUPLE'}</h3>
                <div className="mt-4 flex items-baseline gap-1">
                  <span className="font-headline-lg text-headline-lg text-primary font-bold">{formatPrice(couple?.price ?? 69000)}</span>
                  <span className="font-body-sm text-body-sm text-on-surface-variant">/ trọn đời</span>
                </div>
                <p className="font-body-sm text-body-sm text-on-surface-variant mt-2">{couple?.description ?? 'Dành cho hai người muốn cùng vun đắp kỷ niệm'}</p>
              </div>
              <ul className="space-y-2.5 border-t border-outline-variant/30 pt-4 font-body-sm text-body-sm text-on-surface">
                <li className="flex items-center gap-2 font-medium text-primary"><span className="material-symbols-outlined text-primary text-[18px]">check_circle</span> 2 tài khoản cộng tác viên</li>
                <li className="flex items-center gap-2"><span className="material-symbols-outlined text-primary text-[18px]">check</span> Thông báo khi người ấy đăng thư</li>
                <li className="flex items-center gap-2"><span className="material-symbols-outlined text-primary text-[18px]">check</span> Mở khóa toàn bộ 10+ Template</li>
                <li className="flex items-center gap-2"><span className="material-symbols-outlined text-primary text-[18px]">check</span> Lưu trữ ảnh &amp; video không giới hạn</li>
              </ul>
            </div>
            <Link className="mt-space-lg w-full text-center py-2.5 rounded-full font-label-md text-label-md text-on-primary bg-primary-container hover:bg-primary transition-all shadow-md font-semibold" data-path="bang-gia" to="/pricing">Chọn gói COUPLE</Link>
          </div>
          <div className="bg-surface-container-lowest rounded-2xl p-space-lg shadow-sm flex flex-col justify-between">
            <div>
              <div className="mb-4">
                <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider font-semibold">Gói Nâng Cao</span>
                <h3 className="font-headline-md text-headline-md text-on-surface mt-1">{proMax?.name?.toUpperCase() ?? 'PRO MAX'}</h3>
                <div className="mt-4 flex items-baseline gap-1">
                  <span className="font-headline-lg text-headline-lg text-on-surface font-bold">{formatPrice(proMax?.price ?? 119000)}</span>
                  <span className="font-body-sm text-body-sm text-on-surface-variant">/ trọn đời</span>
                </div>
                <p className="font-body-sm text-body-sm text-on-surface-variant mt-2">{proMax?.description ?? 'Gắn tên miền riêng &amp; trải nghiệm cao cấp nhất'}</p>
              </div>
              <ul className="space-y-2.5 border-t border-outline-variant/30 pt-4 font-body-sm text-body-sm text-on-surface">
                <li className="flex items-center gap-2"><span className="material-symbols-outlined text-primary text-[18px]">check</span> Gắn tên miền tùy chỉnh (.com, .vn)</li>
                <li className="flex items-center gap-2"><span className="material-symbols-outlined text-primary text-[18px]">check</span> Tạo tối đa 3 câu chuyện khác nhau</li>
                <li className="flex items-center gap-2"><span className="material-symbols-outlined text-primary text-[18px]">check</span> Tính năng thiệp cưới điện tử</li>
                <li className="flex items-center gap-2"><span className="material-symbols-outlined text-primary text-[18px]">check</span> Hỗ trợ tùy biến riêng 1-1</li>
              </ul>
            </div>
            <Link className="mt-space-lg w-full text-center py-2.5 rounded-full font-label-md text-label-md text-primary bg-surface-container hover:bg-surface-container-high transition-colors font-medium" data-path="bang-gia" to="/pricing">Chọn gói PRO MAX</Link>
          </div>
        </div>
      </section>
      <section className="w-full py-20 px-margin-mobile md:px-margin max-w-7xl mx-auto">
        <div className="text-center space-y-2 mb-space-xl">
          <span className="font-label-sm text-label-sm text-primary tracking-widest uppercase font-semibold bg-surface-container px-3 py-1 rounded-full">Câu chuyện thật</span>
          <h2 className="font-headline-xl text-headline-xl text-on-surface tracking-tight">Hạnh phúc được viết nên tại CoupleStory</h2>
          <p className="font-body-lg text-body-lg text-on-surface-variant max-w-xl mx-auto">Cùng lắng nghe chia sẻ từ những cặp đôi đã biến kỷ niệm thành di sản số</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-space-lg">
          <div className="bg-surface-container-lowest rounded-2xl overflow-hidden shadow-sm flex flex-col">
            <div className="h-64 overflow-hidden relative">
              <img className="w-full h-full object-cover" data-alt="Charming outdoor picnic photoshoot of a Vietnamese couple smiling happily under sunlit autumn trees with vintage cameras and fruit baskets." src="https://lh3.googleusercontent.com/aida-public/AB6AXuBHq9P2qMn-H0nAJJHgAUCKKxcJpcTJF5UNztSn2ez74-E6NzKBXRQ1n-FiS-eiy0ki8GzxW18P3GCirCdmyLCjjDk7WxcZ7qpyhvysR9VAGwTHR2Gs7o-h_9vtngC1F3Xajnn2P5Il0dBcisJRNVw9RRAhC0_a-Rvnm_m_irdlIB7iowbwhbFe3catju_k8MODEr1QbgrxvCC0sldI0YIm0A1q9AX6wIK0O6b6CJU3QqcLT38e43iJ" />
              <div className="absolute bottom-3 left-3 bg-black/50 backdrop-blur-md px-3 py-1 rounded-full text-white font-label-sm text-label-sm">
                minh-linh.couplestory.site
              </div>
            </div>
            <div className="p-space-lg flex-1 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="font-title-lg text-title-lg text-on-surface font-semibold">Minh &amp; Linh</h3>
                  <span className="font-label-sm text-label-sm text-primary font-medium bg-surface-container px-2.5 py-0.5 rounded-full">1,200 ngày</span>
                </div>
                <p className="font-body-md text-body-md text-on-surface-variant italic">
                  "Kỷ niệm 3 năm bên nhau, mình bí mật làm trang này tặng người yêu. Đến phần phát bài hát đôi mình cùng nghe, Linh đã bật khóc vì xúc động."
                </p>
              </div>
              <div className="pt-4 mt-4 border-t border-outline-variant/30 flex items-center gap-1 text-primary">
                <span className="material-symbols-outlined text-sm" style={{fontVariationSettings: '"FILL" 1'}}>star</span>
                <span className="material-symbols-outlined text-sm" style={{fontVariationSettings: '"FILL" 1'}}>star</span>
                <span className="material-symbols-outlined text-sm" style={{fontVariationSettings: '"FILL" 1'}}>star</span>
                <span className="material-symbols-outlined text-sm" style={{fontVariationSettings: '"FILL" 1'}}>star</span>
                <span className="material-symbols-outlined text-sm" style={{fontVariationSettings: '"FILL" 1'}}>star</span>
              </div>
            </div>
          </div>
          <div className="bg-surface-container-lowest rounded-2xl overflow-hidden shadow-sm flex flex-col">
            <div className="h-64 overflow-hidden relative">
              <img className="w-full h-full object-cover" data-alt="Intimate pre-wedding photography of a Vietnamese bride and groom in modern minimalist wedding attire looking softly at each other in a stylish studio." src="https://lh3.googleusercontent.com/aida-public/AB6AXuAtKZGaUhOFtiymqtjBO4d4qWE_6MFJ9k_PbmKNr7zE3npOf93I2sPAYZZ857IHjQkEiDioMfQvGprVXXUO0hR2ltFeE5ZtiqAv9STLdY-StoFPCIVoGRX4cKJYb_0aaYCFaI5cTgNg9LATvuEIUPqSyybYiKNNL2iXZe0qgZkxoYcRNtpuJRHzcb8ZUqNb31Xb69gh6X_BE69rFmMMVD0bOwOGG-3feieIGn2LEdMlwQNI502mG3Z0" />
              <div className="absolute bottom-3 left-3 bg-black/50 backdrop-blur-md px-3 py-1 rounded-full text-white font-label-sm text-label-sm">
                tuan-ha.couplestory.site
              </div>
            </div>
            <div className="p-space-lg flex-1 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="font-title-lg text-title-lg text-on-surface font-semibold">Tuấn &amp; Hà</h3>
                  <span className="font-label-sm text-label-sm text-primary font-medium bg-surface-container px-2.5 py-0.5 rounded-full">5 năm bên nhau</span>
                </div>
                <p className="font-body-md text-body-md text-on-surface-variant italic">
                  "Tính năng hai người cùng đăng ảnh tiện lắm! Tụi mình dùng luôn đường link làm thiệp mời cưới online gửi bạn bè, ai cũng khen giao diện quá đẹp."
                </p>
              </div>
              <div className="pt-4 mt-4 border-t border-outline-variant/30 flex items-center gap-1 text-primary">
                <span className="material-symbols-outlined text-sm" style={{fontVariationSettings: '"FILL" 1'}}>star</span>
                <span className="material-symbols-outlined text-sm" style={{fontVariationSettings: '"FILL" 1'}}>star</span>
                <span className="material-symbols-outlined text-sm" style={{fontVariationSettings: '"FILL" 1'}}>star</span>
                <span className="material-symbols-outlined text-sm" style={{fontVariationSettings: '"FILL" 1'}}>star</span>
                <span className="material-symbols-outlined text-sm" style={{fontVariationSettings: '"FILL" 1'}}>star</span>
              </div>
            </div>
          </div>
          <div className="bg-surface-container-lowest rounded-2xl overflow-hidden shadow-sm flex flex-col">
            <div className="h-64 overflow-hidden relative">
              <img className="w-full h-full object-cover" data-alt="Young travelling couple holding hands on a viewpoint in Da Lat overlooking misty pine mountains during sunset with soft orange backlight." src="https://lh3.googleusercontent.com/aida-public/AB6AXuCdNyTtjCA55ZSSQ7iwpuNgojHzfdxllOoulO8Xgowz89pHKgH2qke6wVa1I46TBiUKwKP-Y_M_hEFJktkjanxzXNpcpJQQxOrIYwWLYjbZLOfcCm0VJj1rjM3Df66a-g-dwa98SrHBr12qbqD3dVFhbDcCG57GRGBx5-OnZO7sXmxXUZ9XG9i2RzOINNwanRS-MkHEpOYAH9SVbW7XB8V1YgctNImAlxsupL6Xlr7Zf9jZvVz45hnm" />
              <div className="absolute bottom-3 left-3 bg-black/50 backdrop-blur-md px-3 py-1 rounded-full text-white font-label-sm text-label-sm">
                hoang-trang.couplestory.site
              </div>
            </div>
            <div className="p-space-lg flex-1 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="font-title-lg text-title-lg text-on-surface font-semibold">Hoàng &amp; Trang</h3>
                  <span className="font-label-sm text-label-sm text-primary font-medium bg-surface-container px-2.5 py-0.5 rounded-full">Yêu xa 600 ngày</span>
                </div>
                <p className="font-body-md text-body-md text-on-surface-variant italic">
                  "Tụi mình yêu xa hai đầu đất nước, mỗi lần nhớ nhau lại vào trang viết vài dòng thư tình. Nhìn đồng hồ đếm ngày bên nhau thấy khoảng cách gần lại rất nhiều."
                </p>
              </div>
              <div className="pt-4 mt-4 border-t border-outline-variant/30 flex items-center gap-1 text-primary">
                <span className="material-symbols-outlined text-sm" style={{fontVariationSettings: '"FILL" 1'}}>star</span>
                <span className="material-symbols-outlined text-sm" style={{fontVariationSettings: '"FILL" 1'}}>star</span>
                <span className="material-symbols-outlined text-sm" style={{fontVariationSettings: '"FILL" 1'}}>star</span>
                <span className="material-symbols-outlined text-sm" style={{fontVariationSettings: '"FILL" 1'}}>star</span>
                <span className="material-symbols-outlined text-sm" style={{fontVariationSettings: '"FILL" 1'}}>star</span>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="w-full py-16 px-margin-mobile md:px-margin max-w-7xl mx-auto mb-16">
        <div className="rounded-3xl bg-gradient-to-r from-[#FF4D8D] to-[#C026D3] text-on-primary p-space-xl md:p-20 text-center relative overflow-hidden shadow-xl">
          <div className="absolute -left-16 -bottom-16 w-64 h-64 bg-white/10 rounded-full blur-2xl pointer-events-none" />
          <div className="absolute -right-16 -top-16 w-64 h-64 bg-white/10 rounded-full blur-2xl pointer-events-none" />
          <div className="relative max-w-3xl mx-auto space-y-space-md">
            <span className="text-3xl">💌</span>
            <h2 className="font-headline-xl text-headline-xl text-white tracking-tight leading-tight">
              Bắt đầu viết tiếp câu chuyện của hai bạn ngay hôm nay
            </h2>
            <p className="font-body-lg text-body-lg text-white/90 max-w-xl mx-auto">
              Chỉ mất 5 phút để có ngay trang web kỷ niệm đôi vĩnh cửu. Đong đầy cảm xúc, riêng tư và trọn vẹn.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-space-md pt-4">
              <Link className="w-full sm:w-auto inline-flex items-center justify-center font-label-md text-label-md text-primary bg-white hover:bg-surface-container-low px-space-xl py-3.5 rounded-full shadow-lg hover:scale-105 active:scale-95 transition-all font-bold" data-path="dang-ky" to="/register">
                Tạo Story Miễn Phí
              </Link>
              <Link className="w-full sm:w-auto inline-flex items-center justify-center font-label-md text-label-md text-white bg-white/20 hover:bg-white/30 backdrop-blur-md px-space-xl py-3.5 rounded-full transition-all" data-path="template" to="/templates">
                Khám phá Template
              </Link>
            </div>
            <p className="font-label-sm text-label-sm text-white/80 pt-2">
              Không cần cài đặt ứng dụng · Dễ dàng chia sẻ qua Messenger, Zalo, QR Code
            </p>
          </div>
        </div>
      </section>
    </div></main>
</div>

    </div>
  );
}
