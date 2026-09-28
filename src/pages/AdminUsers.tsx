export default function AdminUsers() {
  return (
    <>
<div className="pl-72 min-h-screen flex flex-col bg-background"><main className="w-full pt-20 px-space-lg py-space-lg flex-1"><div className="flex flex-col w-full space-y-8">
      <div className="flex flex-col xl:flex-row xl:items-end justify-between gap-6 pb-2">
        <div className="flex flex-col space-y-3">
          <nav className="flex items-center gap-2 font-label-sm text-label-sm text-outline uppercase tracking-wider">
            <span className="hover:text-primary transition-colors cursor-pointer">Admin</span>
            <span className="material-symbols-outlined text-[14px]">chevron_right</span>
            <span className="hover:text-primary transition-colors cursor-pointer">Quản lý dữ liệu</span>
            <span className="material-symbols-outlined text-[14px]">chevron_right</span>
            <span className="text-primary font-semibold">Người dùng &amp; Stories</span>
          </nav>
          <div className="flex flex-wrap items-center gap-3">
            <h1 className="font-headline-lg text-headline-lg text-on-surface tracking-tight">
              Quản lý Người dùng &amp; Câu chuyện Tình yêu
            </h1>
            <div className="flex items-center gap-2 px-3 py-1 bg-surface-container rounded-full shadow-sm">
              <span className="w-2 h-2 rounded-full bg-primary-container" />
              <span className="font-label-sm text-label-sm text-on-secondary-container font-medium">5,420 Stories • 10,840 Thành viên</span>
            </div>
          </div>
          <p className="font-body-md text-body-md text-on-surface-variant max-w-3xl">
            Theo dõi, kiểm duyệt nội dung, điều phối quyền hạn phòng kỷ niệm và bảo đảm không gian lưu trữ an toàn, tinh tế cho các cặp đôi trên toàn hệ thống.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-3 shrink-0">
          <button className="group flex items-center gap-2 px-5 py-2.5 rounded-full bg-surface-container-lowest text-secondary font-label-md text-label-md shadow-sm hover:bg-surface-container-high transition-all" type="button">
            <span className="material-symbols-outlined text-[18px] text-outline group-hover:text-primary transition-colors">download</span>
            <span>Xuất báo cáo</span>
          </button>
          <button className="group flex items-center gap-2 px-5 py-2.5 rounded-full bg-surface-container text-on-secondary-container font-label-md text-label-md shadow-sm hover:bg-surface-container-high transition-all" type="button">
            <span className="material-symbols-outlined text-[18px] text-primary transition-transform group-hover:scale-110">campaign</span>
            <span>Gửi thông báo hệ thống</span>
          </button>
          <button className="flex items-center gap-2 px-6 py-2.5 rounded-full bg-primary-container text-on-primary font-label-md text-label-md shadow-md hover:shadow-lg hover:opacity-95 transition-all" type="button">
            <span className="material-symbols-outlined text-[18px]">favorite</span>
            <span>+ Tạo Story hỗ trợ cặp đôi</span>
          </button>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">
        <div className="relative overflow-hidden bg-surface-container-lowest rounded-lg p-6 shadow-sm flex flex-col justify-between">
          <div className="flex items-start justify-between">
            <div className="flex flex-col">
              <span className="font-label-sm text-label-sm text-outline uppercase tracking-wider">Tổng số Story kích hoạt</span>
              <div className="flex items-baseline gap-2 mt-2">
                <span className="font-headline-lg text-headline-lg text-on-surface font-bold tracking-tight">5,420</span>
                <span className="inline-flex items-center gap-0.5 text-xs font-semibold px-2 py-0.5 rounded-full bg-surface-container text-primary font-label-sm">
                  <span className="material-symbols-outlined text-[12px]">trending_up</span> +12.8%
                </span>
              </div>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-surface-container flex items-center justify-center text-primary shadow-sm">
              <span className="material-symbols-outlined text-[24px]">auto_stories</span>
            </div>
          </div>
          <div className="mt-4 pt-3 flex items-center justify-between text-on-surface-variant font-body-sm text-body-sm">
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-primary-container" />
              4,150 không gian đang công khai
            </span>
            <span className="font-label-sm text-label-sm text-primary">76.5%</span>
          </div>
        </div>
        <div className="relative overflow-hidden bg-surface-container-lowest rounded-lg p-6 shadow-sm flex flex-col justify-between">
          <div className="flex items-start justify-between">
            <div className="flex flex-col">
              <span className="font-label-sm text-label-sm text-outline uppercase tracking-wider">Đồng quản lý (Co-presence)</span>
              <div className="flex items-baseline gap-2 mt-2">
                <span className="font-headline-lg text-headline-lg text-on-surface font-bold tracking-tight">3,890</span>
                <span className="font-label-sm text-label-sm text-on-secondary-container px-2 py-0.5 rounded-full bg-surface-container">71.8% tỷ lệ đôi</span>
              </div>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-surface-container flex items-center justify-center text-primary-container shadow-sm">
              <span className="material-symbols-outlined text-[24px]">group</span>
            </div>
          </div>
          <div className="mt-4 pt-3 flex items-center justify-between text-on-surface-variant font-body-sm text-body-sm">
            <span className="truncate">Hai thành viên cùng xác thực email</span>
            <span className="font-label-sm text-label-sm text-primary-container">Ổn định</span>
          </div>
        </div>
        <div className="relative overflow-hidden bg-surface-container-lowest rounded-lg p-6 shadow-sm flex flex-col justify-between">
          <div className="flex items-start justify-between">
            <div className="flex flex-col">
              <span className="font-label-sm text-label-sm text-outline uppercase tracking-wider">Lưu trữ ảnh &amp; Kỷ niệm</span>
              <div className="flex items-baseline gap-2 mt-2">
                <span className="font-headline-lg text-headline-lg text-on-surface font-bold tracking-tight">2.84 TB</span>
                <span className="font-label-sm text-label-sm text-outline">/ 10 TB</span>
              </div>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-surface-container flex items-center justify-center text-secondary shadow-sm">
              <span className="material-symbols-outlined text-[24px]">cloud_sync</span>
            </div>
          </div>
          <div className="mt-4 pt-3 flex flex-col gap-1.5">
            <div className="w-full bg-surface-container h-1.5 rounded-full overflow-hidden">
              <div className="bg-primary-container h-full rounded-full" style={{width: '28.4%'}} />
            </div>
            <div className="flex items-center justify-between text-on-surface-variant font-body-sm text-body-sm pt-1">
              <span>1.2M ảnh kỷ niệm</span>
              <span>45.2k video</span>
            </div>
          </div>
        </div>
        <div className="relative overflow-hidden bg-surface-container-lowest rounded-lg p-6 shadow-sm flex flex-col justify-between">
          <div className="flex items-start justify-between">
            <div className="flex flex-col">
              <span className="font-label-sm text-label-sm text-outline uppercase tracking-wider">Kiểm duyệt &amp; Yêu cầu</span>
              <div className="flex items-baseline gap-2 mt-2">
                <span className="font-headline-lg text-headline-lg text-on-surface font-bold tracking-tight">14</span>
                <span className="font-label-sm text-label-sm px-2 py-0.5 rounded-full bg-surface-container text-on-tertiary-container font-medium">Cần xử lý</span>
              </div>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-surface-container flex items-center justify-center text-primary shadow-sm">
              <span className="material-symbols-outlined text-[24px]">verified_user</span>
            </div>
          </div>
          <div className="mt-4 pt-3 flex items-center justify-between text-on-surface-variant font-body-sm text-body-sm">
            <span className="truncate">3 tên miền riêng • 11 ảnh cần duyệt</span>
            <button className="font-label-sm text-label-sm text-primary hover:underline font-semibold">Xem ngay</button>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-start">
        <div className="xl:col-span-9 flex flex-col space-y-4">
          <div className="bg-surface-container-lowest rounded-lg p-5 shadow-sm flex flex-col gap-4">
            <div className="flex flex-col md:flex-row items-center gap-3">
              <div className="relative flex-1 w-full">
                <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline text-[20px]">search</span>
                <input className="w-full h-11 pl-11 pr-4 bg-surface-container-low rounded-full font-body-sm text-body-sm text-on-surface placeholder:text-outline focus:outline-none focus:ring-2 focus:ring-primary-container/30 transition-all" placeholder="Tìm kiếm theo tên cặp đôi, email, subdomain (vd: baolong-annhien), mã Story #CS..." type="text" />
              </div>
              <div className="flex items-center gap-2 self-end md:self-auto shrink-0">
                <button className="p-2.5 rounded-full bg-surface-container text-primary hover:bg-surface-container-high transition-colors" title="Chuyển sang chế độ Danh sách" type="button">
                  <span className="material-symbols-outlined text-[20px]">format_list_bulleted</span>
                </button>
                <button className="p-2.5 rounded-full bg-surface-container-lowest text-outline hover:text-on-surface hover:bg-surface-container transition-colors" title="Chuyển sang chế độ Lưới thẻ" type="button">
                  <span className="material-symbols-outlined text-[20px]">grid_view</span>
                </button>
                <button className="flex items-center gap-1.5 px-3 py-2 rounded-full text-outline hover:text-error hover:bg-surface-container transition-colors font-label-sm text-label-sm" type="button">
                  <span className="material-symbols-outlined text-[16px]">restart_alt</span>
                  <span>Đặt lại</span>
                </button>
              </div>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
              <div className="flex flex-col gap-1">
                <label className="font-label-sm text-label-sm text-on-surface-variant font-medium">Gói dịch vụ</label>
                <div className="relative">
                  <select className="w-full appearance-none h-10 px-3 pr-8 bg-surface-container-low rounded-full font-body-sm text-body-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-primary-container/20 cursor-pointer">
                    <option selected>Tất cả gói</option>
                    <option>Couple VIP (Trọn đời)</option>
                    <option>Pro Custom Domain</option>
                    <option>Permanent Studio</option>
                    <option>Trial 7 ngày</option>
                  </select>
                  <span className="material-symbols-outlined pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-outline text-[18px]">expand_more</span>
                </div>
              </div>
              <div className="flex flex-col gap-1">
                <label className="font-label-sm text-label-sm text-on-surface-variant font-medium">Trạng thái Story</label>
                <div className="relative">
                  <select className="w-full appearance-none h-10 px-3 pr-8 bg-surface-container-low rounded-full font-body-sm text-body-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-primary-container/20 cursor-pointer">
                    <option selected>Tất cả trạng thái</option>
                    <option>Công khai (Active)</option>
                    <option>Chờ duyệt DNS Domain</option>
                    <option>Đã khoá riêng tư (PIN)</option>
                    <option>Tạm dừng / Hết hạn</option>
                    <option>Cần duyệt nội dung</option>
                  </select>
                  <span className="material-symbols-outlined pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-outline text-[18px]">expand_more</span>
                </div>
              </div>
              <div className="flex flex-col gap-1">
                <label className="font-label-sm text-label-sm text-on-surface-variant font-medium">Mẫu Template</label>
                <div className="relative">
                  <select className="w-full appearance-none h-10 px-3 pr-8 bg-surface-container-low rounded-full font-body-sm text-body-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-primary-container/20 cursor-pointer">
                    <option selected>Tất cả template</option>
                    <option>Eternal Love</option>
                    <option>Minimal Couple</option>
                    <option>Sweet Polaroid</option>
                    <option>Sunset Horizon</option>
                    <option>Royal Wedding</option>
                  </select>
                  <span className="material-symbols-outlined pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-outline text-[18px]">expand_more</span>
                </div>
              </div>
              <div className="flex flex-col gap-1">
                <label className="font-label-sm text-label-sm text-on-surface-variant font-medium">Thời gian khởi tạo</label>
                <div className="relative">
                  <select className="w-full appearance-none h-10 px-3 pr-8 bg-surface-container-low rounded-full font-body-sm text-body-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-primary-container/20 cursor-pointer">
                    <option>Toàn thời gian</option>
                    <option selected>30 ngày qua</option>
                    <option>7 ngày gần nhất</option>
                    <option>Hôm nay</option>
                  </select>
                  <span className="material-symbols-outlined pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-outline text-[18px]">expand_more</span>
                </div>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-between px-5 py-3 bg-surface-container rounded-lg shadow-sm" id="bulk-bar">
            <div className="flex items-center gap-3">
              <input className="w-4 h-4 rounded text-primary-container bg-surface-container-lowest focus:ring-0 cursor-pointer" id="select-all" type="checkbox" />
              <span className="font-label-sm text-label-sm text-on-secondary-container font-semibold">Đã chọn 1 hàng</span>
              <span className="w-1 h-1 rounded-full bg-outline" />
              <span className="font-body-sm text-body-sm text-on-surface-variant">Áp dụng thao tác đồng loạt:</span>
            </div>
            <div className="flex items-center gap-2">
              <button className="px-3 py-1.5 rounded-full bg-surface-container-lowest text-secondary font-label-sm text-label-sm hover:bg-primary-fixed transition-colors" type="button">
                Gửi email chúc mừng
              </button>
              <button className="px-3 py-1.5 rounded-full bg-surface-container-lowest text-secondary font-label-sm text-label-sm hover:bg-primary-fixed transition-colors" type="button">
                Nâng cấp gói
              </button>
              <button className="px-3 py-1.5 rounded-full bg-surface-container-lowest text-error font-label-sm text-label-sm hover:bg-error-container transition-colors" type="button">
                Tạm ngưng
              </button>
            </div>
          </div>
          <div className="bg-surface-container-lowest rounded-lg shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-surface-container-low font-label-sm text-label-sm text-outline uppercase tracking-wider">
                    <th className="py-4 pl-6 pr-3 w-10">
                      <span className="sr-only">Select</span>
                    </th>
                    <th className="py-4 px-3 min-w-[240px]">Tên Cặp Đôi &amp; Story ID</th>
                    <th className="py-4 px-3 min-w-[220px]">Thành viên &amp; Kết nối</th>
                    <th className="py-4 px-3 min-w-[170px]">Gói &amp; Giao diện</th>
                    <th className="py-4 px-3 min-w-[180px]">Thông số kỷ niệm</th>
                    <th className="py-4 px-3 min-w-[140px]">Trạng thái</th>
                    <th className="py-4 pr-6 pl-3 text-right min-w-[120px]">Thao tác</th>
                  </tr>
                </thead>
                <tbody className="divide-y-0 text-on-surface font-body-sm text-body-sm">
                  <tr className="hover:bg-surface-container-low/60 transition-colors group">
                    <td className="py-4 pl-6 pr-3 align-middle">
                      <input defaultChecked className="w-4 h-4 rounded text-primary-container bg-surface-container-low focus:ring-0 cursor-pointer" type="checkbox" />
                    </td>
                    <td className="py-4 px-3 align-middle">
                      <div className="flex items-center gap-3">
                        <div className="relative flex shrink-0 items-center -space-x-2">
                          <img className="w-10 h-10 rounded-full object-cover shadow-sm ring-2 ring-surface-container-lowest" data-alt="Intimate romantic portrait of a young Vietnamese man smiling warmly in soft natural sunlight with warm rose tones" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDVptUANssX4fs8BwcQzh10GHUYKZtddTczu-5h22Bw-L9MiLctNZ4dVovpYTKmz3oh3MCg1vrVz1MHr4vDupU8IulZys1-kk8HCheZsRBWmOfYBRZlnry7Du61ORVxprcqhXN1x2T_0XMJlEw4dKfWkOTKnTfXUqaovFc8FehEvtgJziynt97owKPKQOrNW62-v5LJo5cMAeB_joz-GxqySEpQmDvsuFs-qtpZG-BWba3MxGqa1LZv" />
                          <img className="w-10 h-10 rounded-full object-cover shadow-sm ring-2 ring-surface-container-lowest" data-alt="Charming romantic portrait of an elegant young Asian woman with delicate flowers in hair bathed in golden pink light" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBzcdJ0JXArJj1jjLQpyx46L7F0fQiczey216KhPp5N3UmWFOBr1-m0NYuqT4igdBenML2YtrjnKYa6d8ZdHk87q_DV05lwqHv3x12XrUZwUcFkdO86T5Vt1t-iOii86yxCUM_G0GKLXoWibe3d4LxjTogbLhi-r3FyWrezcutjOeJTQ8bV5RmHUQb5RbnIBjhq1xsC-UwO6GE5pTn3KiIzkgNnlf_ILgPK6zZILEC_-5LUJwt5QOzy" />
                          <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-primary-container ring-2 ring-surface-container-lowest" title="Cả hai đang trực tuyến" />
                        </div>
                        <div className="flex flex-col min-w-0">
                          <span className="font-title-md text-title-md text-on-surface font-bold truncate">Bảo Long &amp; An Nhiên</span>
                          <div className="flex items-center gap-1.5 mt-0.5">
                            <span className="font-label-sm text-label-sm text-primary font-semibold">#CS-ST-8891</span>
                            <span className="text-outline text-[12px]">•</span>
                            <a className="font-label-sm text-label-sm text-secondary hover:text-primary flex items-center gap-0.5 truncate" href="#">
                              <span>baolong-annhien</span>
                              <span className="material-symbols-outlined text-[13px]">open_in_new</span>
                            </a>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-3 align-middle">
                      <div className="flex flex-col space-y-1">
                        <div className="flex items-center gap-1.5 text-xs text-on-surface truncate">
                          <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                          <span className="truncate font-medium">baolong.nguyen@gmail.com</span>
                          <span className="text-outline text-[10px] uppercase font-bold">(Chủ)</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-xs text-on-surface-variant truncate">
                          <span className="w-1.5 h-1.5 rounded-full bg-secondary shrink-0" />
                          <span className="truncate">annhien.do@outlook.com</span>
                          <span className="text-outline text-[10px] uppercase">(Đồng hành)</span>
                        </div>
                        <div className="inline-flex items-center gap-1 text-[11px] font-semibold text-primary">
                          <span className="material-symbols-outlined text-[14px]">link</span>
                          <span>Đã ghép đôi hoàn tất</span>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-3 align-middle">
                      <div className="flex flex-col space-y-1">
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-surface-container font-label-sm text-label-sm text-primary font-bold w-fit">
                          <span className="material-symbols-outlined text-[13px]">diamond</span>
                          <span>COUPLE</span>
                        </span>
                        <span className="text-on-surface-variant font-label-sm text-label-sm flex items-center gap-1">
                          <span className="material-symbols-outlined text-[14px] text-outline">palette</span>
                          <span>Eternal Love</span>
                        </span>
                      </div>
                    </td>
                    <td className="py-4 px-3 align-middle">
                      <div className="flex flex-col text-xs text-on-surface-variant space-y-0.5">
                        <span className="font-semibold text-on-surface text-sm text-primary">1,000 ngày yêu</span>
                        <span className="text-outline">428 ảnh • 12 mốc son • 142 lời chúc</span>
                        <span className="text-[11px] text-outline font-medium">Dung lượng: 480 MB</span>
                      </div>
                    </td>
                    <td className="py-4 px-3 align-middle">
                      <div className="flex flex-col space-y-1">
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-surface-container text-on-secondary-container font-label-sm text-label-sm font-semibold w-fit">
                          <span className="w-1.5 h-1.5 rounded-full bg-primary-container" />
                          <span>Công khai (Mã PIN)</span>
                        </span>
                        <span className="text-[11px] text-outline">Tạo 14/02/2024</span>
                      </div>
                    </td>
                    <td className="py-4 pr-6 pl-3 align-middle text-right">
                      <div className="flex items-center justify-end gap-1">
                        <button className="p-1.5 text-outline hover:text-primary hover:bg-surface-container rounded-full transition-colors" title="Xem Story trực tiếp">
                          <span className="material-symbols-outlined text-[18px]">visibility</span>
                        </button>
                        <button className="p-1.5 text-outline hover:text-on-surface hover:bg-surface-container rounded-full transition-colors" title="Quản lý thành viên">
                          <span className="material-symbols-outlined text-[18px]">edit</span>
                        </button>
                        <button className="p-1.5 text-outline hover:text-primary hover:bg-surface-container rounded-full transition-colors" title="Nâng cấp quyền riêng tư">
                          <span className="material-symbols-outlined text-[18px]">auto_awesome</span>
                        </button>
                        <button className="p-1.5 text-outline hover:text-on-surface hover:bg-surface-container rounded-full transition-colors" title="Tùy chọn khác">
                          <span className="material-symbols-outlined text-[18px]">more_vert</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                  <tr className="hover:bg-surface-container-low/60 transition-colors group">
                    <td className="py-4 pl-6 pr-3 align-middle">
                      <input className="w-4 h-4 rounded text-primary-container bg-surface-container-low focus:ring-0 cursor-pointer" type="checkbox" />
                    </td>
                    <td className="py-4 px-3 align-middle">
                      <div className="flex items-center gap-3">
                        <div className="relative flex shrink-0 items-center -space-x-2">
                          <img className="w-10 h-10 rounded-full object-cover shadow-sm ring-2 ring-surface-container-lowest" data-alt="Sophisticated cinematic portrait of a handsome Vietnamese groom wearing modern black suit in studio setting" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCZMvLdm4Lf63XInwwCKKSR9HsDgop_UQ2n3jHtlt26wHLfDzHtopBlTU0SERwszuZ6spo0yehWAwzKyNA_b6YPaiXA6VVhzzJDd_eqbE4aCnT1Uxrtcmrwg6Tep3hpqcydH09x1maummjcv1grQp2_3HstKcYhkMX4uNntqP2JAx-TgHITHjoxJfbcSAEBpg7oTgY6n4J3c6Y3zy2XqffmzEPUSSp8kuLxy2gVz3U4aSzqeoPHRHYw" />
                          <img className="w-10 h-10 rounded-full object-cover shadow-sm ring-2 ring-surface-container-lowest" data-alt="Radiant editorial portrait of a cheerful Vietnamese bride holding gentle white roses with dreamy pink background" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCWEeqvkg4cppka-XATGbH7ahLPRQ8R-iFvoGtBuNb1NSU_JRGZRJSO-qNERHcFpWI6JLrEzuDHpCLevzLekHu2Kja0bbTyCsEv51d7MRek8_SEpE1IfLSVPMKQS0mDB5XrlEURTfRzxe_c-D6xahlBnLWc0FdAIgHeUJMJIarTTPjPzAbmi9kVIc1RGY3Xy43_sGOeTuNDtQfSfM95AHjQiBUChI3jHpNAulJYkZAhkxKw21esQzHT" />
                        </div>
                        <div className="flex flex-col min-w-0">
                          <span className="font-title-md text-title-md text-on-surface font-bold truncate">Hoàng Nam &amp; Mai Chi</span>
                          <div className="flex items-center gap-1.5 mt-0.5">
                            <span className="font-label-sm text-label-sm text-primary font-semibold">#CS-ST-7430</span>
                            <span className="text-outline text-[12px]">•</span>
                            <a className="font-label-sm text-label-sm text-secondary hover:text-primary flex items-center gap-0.5 truncate font-semibold" href="#">
                              <span>nam-chi.love</span>
                              <span className="material-symbols-outlined text-[13px]">language</span>
                            </a>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-3 align-middle">
                      <div className="flex flex-col space-y-1">
                        <div className="flex items-center gap-1.5 text-xs text-on-surface truncate">
                          <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                          <span className="truncate font-medium">hoangnam.media@gmail.com</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-xs text-on-surface-variant truncate">
                          <span className="w-1.5 h-1.5 rounded-full bg-secondary shrink-0" />
                          <span className="truncate">maichi.artist@gmail.com</span>
                        </div>
                        <div className="inline-flex items-center gap-1 text-[11px] font-semibold text-primary">
                          <span className="material-symbols-outlined text-[14px]">link</span>
                          <span>Đã ghép đôi hoàn tất</span>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-3 align-middle">
                      <div className="flex flex-col space-y-1">
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-surface-container font-label-sm text-label-sm text-secondary font-bold w-fit">
                          <span className="material-symbols-outlined text-[13px]">verified</span>
                          <span>PRO MAX</span>
                        </span>
                        <span className="text-on-surface-variant font-label-sm text-label-sm flex items-center gap-1">
                          <span className="material-symbols-outlined text-[14px] text-outline">palette</span>
                          <span>Minimal Couple</span>
                        </span>
                      </div>
                    </td>
                    <td className="py-4 px-3 align-middle">
                      <div className="flex flex-col text-xs text-on-surface-variant space-y-0.5">
                        <span className="font-semibold text-on-surface text-sm">520 ngày yêu</span>
                        <span className="text-outline">680 ảnh • 24 cột mốc</span>
                        <span className="text-[11px] text-outline font-medium">Dung lượng: 1.1 GB</span>
                      </div>
                    </td>
                    <td className="py-4 px-3 align-middle">
                      <div className="flex flex-col space-y-1">
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-surface-container text-on-secondary-container font-label-sm text-label-sm font-semibold w-fit">
                          <span className="w-1.5 h-1.5 rounded-full bg-secondary" />
                          <span>Tên miền riêng</span>
                        </span>
                        <span className="text-[11px] text-outline">Sửa 10:14 hôm nay</span>
                      </div>
                    </td>
                    <td className="py-4 pr-6 pl-3 align-middle text-right">
                      <div className="flex items-center justify-end gap-1">
                        <button className="p-1.5 text-outline hover:text-primary hover:bg-surface-container rounded-full transition-colors" title="Xem Story trực tiếp">
                          <span className="material-symbols-outlined text-[18px]">visibility</span>
                        </button>
                        <button className="p-1.5 text-outline hover:text-on-surface hover:bg-surface-container rounded-full transition-colors" title="Chỉnh sửa cấu hình">
                          <span className="material-symbols-outlined text-[18px]">edit</span>
                        </button>
                        <button className="p-1.5 text-outline hover:text-on-surface hover:bg-surface-container rounded-full transition-colors" title="Tùy chọn khác">
                          <span className="material-symbols-outlined text-[18px]">more_vert</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                  <tr className="hover:bg-surface-container-low/60 transition-colors group">
                    <td className="py-4 pl-6 pr-3 align-middle">
                      <input className="w-4 h-4 rounded text-primary-container bg-surface-container-low focus:ring-0 cursor-pointer" type="checkbox" />
                    </td>
                    <td className="py-4 px-3 align-middle">
                      <div className="flex items-center gap-3">
                        <div className="relative flex shrink-0 items-center -space-x-2">
                          <img className="w-10 h-10 rounded-full object-cover shadow-sm ring-2 ring-surface-container-lowest" data-alt="Portrait of youthful Vietnamese boy laughing outdoors in soft morning light with modern casual styling" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAc6JuDPGW1Ugg3pIkJfXOCh4RQki1xh2sUUVvniJSR2lok-Vok5tWFMEYUoZufXdEsNvys2YaRX7gCJcfVIdW_wJmqCGynoyz8P1q5nu0xsx9nyy3zOGNXoMsp7uxAQsLrd6Zmpg9F7YqxVXQb2lRskRU5KnTrWRC8QJhA09OHEIZUPoJX8267rTtrQDBa1BUyoiNAbj5a0Xfxfiox9aNG-q3lKjJmR04mhVgEl4QZOICJEd48u5xC" />
                          <img className="w-10 h-10 rounded-full object-cover shadow-sm ring-2 ring-surface-container-lowest" data-alt="Warm aesthetic portrait of young Vietnamese girl with gentle natural smile holding coffee cup in cozy cafe" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBqCCOBBIUIkEGBYFHHkxfwz7UpR-eOgxCHmii-9vmnn_AetZl9VcIrqbc-ZkSxDBd5nnLllWXYYXi-MyGVEVapgVPx7L43PyVit7w-HJOIc6JSYYfPQqMICOpH9d7DlI9uGYJos8OYQcFPbMIE5tbE0NV9RqcgU9_Lmo1F7LeVnodxPT76Ofc6aSz_d7tJugOmMfJu1qixma5HX6ha7LY-rlBOcwJnbNIUd0gCQ0uwXj6Cb20YJzY-" />
                        </div>
                        <div className="flex flex-col min-w-0">
                          <span className="font-title-md text-title-md text-on-surface font-bold truncate">Minh Khôi &amp; Thuỳ Linh</span>
                          <div className="flex items-center gap-1.5 mt-0.5">
                            <span className="font-label-sm text-label-sm text-primary font-semibold">#CS-ST-6102</span>
                            <span className="text-outline text-[12px]">•</span>
                            <a className="font-label-sm text-label-sm text-secondary hover:text-primary flex items-center gap-0.5 truncate" href="#">
                              <span>khoi-linh.love</span>
                              <span className="material-symbols-outlined text-[13px]">open_in_new</span>
                            </a>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-3 align-middle">
                      <div className="flex flex-col space-y-1">
                        <div className="flex items-center gap-1.5 text-xs text-on-surface truncate">
                          <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                          <span className="truncate font-medium">khoi.minh99@gmail.com</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-xs text-outline italic truncate">
                          <span className="w-1.5 h-1.5 rounded-full bg-outline shrink-0" />
                          <span>Chưa xác nhận email đối phương</span>
                        </div>
                        <div className="inline-flex items-center gap-1 text-[11px] font-semibold text-outline">
                          <span className="material-symbols-outlined text-[14px]">hourglass_top</span>
                          <span>Đang chờ ghép cặp</span>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-3 align-middle">
                      <div className="flex flex-col space-y-1">
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-surface-container-high font-label-sm text-label-sm text-on-surface-variant font-medium w-fit">
                          <span className="material-symbols-outlined text-[13px]">schedule</span>
                          <span>FREE</span>
                        </span>
                        <span className="text-on-surface-variant font-label-sm text-label-sm flex items-center gap-1">
                          <span className="material-symbols-outlined text-[14px] text-outline">palette</span>
                          <span>Sweet Polaroid</span>
                        </span>
                      </div>
                    </td>
                    <td className="py-4 px-3 align-middle">
                      <div className="flex flex-col text-xs text-on-surface-variant space-y-0.5">
                        <span className="font-semibold text-on-surface text-sm">99 ngày yêu</span>
                        <span className="text-outline">64 ảnh • 4 mốc kỷ niệm</span>
                        <span className="text-[11px] text-outline font-medium">Dung lượng: 92 MB</span>
                      </div>
                    </td>
                    <td className="py-4 px-3 align-middle">
                      <div className="flex flex-col space-y-1">
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-surface-container text-primary font-label-sm text-label-sm font-semibold w-fit">
                          <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                          <span>Sắp hết hạn Trial</span>
                        </span>
                        <span className="text-[11px] text-outline">Tạo 7 ngày trước</span>
                      </div>
                    </td>
                    <td className="py-4 pr-6 pl-3 align-middle text-right">
                      <div className="flex items-center justify-end gap-1">
                        <button className="p-1.5 text-outline hover:text-primary hover:bg-surface-container rounded-full transition-colors" title="Gửi nhắc nhở nâng cấp">
                          <span className="material-symbols-outlined text-[18px]">forward_to_inbox</span>
                        </button>
                        <button className="p-1.5 text-outline hover:text-on-surface hover:bg-surface-container rounded-full transition-colors" title="Chỉnh sửa">
                          <span className="material-symbols-outlined text-[18px]">edit</span>
                        </button>
                        <button className="p-1.5 text-outline hover:text-on-surface hover:bg-surface-container rounded-full transition-colors" title="Tùy chọn khác">
                          <span className="material-symbols-outlined text-[18px]">more_vert</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                  <tr className="hover:bg-surface-container-low/60 transition-colors group">
                    <td className="py-4 pl-6 pr-3 align-middle">
                      <input className="w-4 h-4 rounded text-primary-container bg-surface-container-low focus:ring-0 cursor-pointer" type="checkbox" />
                    </td>
                    <td className="py-4 px-3 align-middle">
                      <div className="flex items-center gap-3">
                        <div className="relative flex shrink-0 items-center -space-x-2">
                          <img className="w-10 h-10 rounded-full object-cover shadow-sm ring-2 ring-surface-container-lowest" data-alt="Chic modern portrait of a stylish Vietnamese couple embracing playfully in an editorial fashion photography style" src="https://lh3.googleusercontent.com/aida-public/AB6AXuA4qlqGGJMjuEHRnEWfi6CB01wz23KDTDIDGXVTytZpqNv9xz-Rz6tWaNM-isRsLY1FAyo8JIlKr_d7Fif2Ry9UAq4FD1UluLwUomfwHf0g4F-jopJPweymgkLCVt6IMATLskcsQef0VsFzv3OgHNfJOs2JwYqkCq892dwWmTy_RIHJT81C0EoiOr7VsMdOC6G09cdV5O_Pxcq3pya9f-QdhMdaUuvfCrZ0cxcK7-pT3OwsAb_pxgJP" />
                          <div className="w-10 h-10 rounded-full bg-surface-container flex items-center justify-center text-primary font-bold text-xs ring-2 ring-surface-container-lowest">
                            DA
                          </div>
                        </div>
                        <div className="flex flex-col min-w-0">
                          <span className="font-title-md text-title-md text-on-surface font-bold truncate">Tuấn Anh &amp; Diệp Anh</span>
                          <div className="flex items-center gap-1.5 mt-0.5">
                            <span className="font-label-sm text-label-sm text-primary font-semibold">#CS-ST-4519</span>
                            <span className="text-outline text-[12px]">•</span>
                            <span className="font-label-sm text-label-sm text-outline truncate flex items-center gap-0.5">
                              <span className="material-symbols-outlined text-[12px]">lock</span>
                              <span>Riêng tư (Chỉ 2 người)</span>
                            </span>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-3 align-middle">
                      <div className="flex flex-col space-y-1">
                        <div className="flex items-center gap-1.5 text-xs text-on-surface truncate">
                          <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                          <span className="truncate font-medium">tuananh.dev@gmail.com</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-xs text-on-surface-variant truncate">
                          <span className="w-1.5 h-1.5 rounded-full bg-secondary shrink-0" />
                          <span className="truncate">diepanh.design@gmail.com</span>
                        </div>
                        <div className="inline-flex items-center gap-1 text-[11px] font-semibold text-primary">
                          <span className="material-symbols-outlined text-[14px]">link</span>
                          <span>Đã ghép đôi hoàn tất</span>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-3 align-middle">
                      <div className="flex flex-col space-y-1">
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-surface-container font-label-sm text-label-sm text-on-secondary-container font-bold w-fit">
                          <span className="material-symbols-outlined text-[13px]">all_inclusive</span>
                          <span>PRO</span>
                        </span>
                        <span className="text-on-surface-variant font-label-sm text-label-sm flex items-center gap-1">
                          <span className="material-symbols-outlined text-[14px] text-outline">palette</span>
                          <span>Sunset Horizon</span>
                        </span>
                      </div>
                    </td>
                    <td className="py-4 px-3 align-middle">
                      <div className="flex flex-col text-xs text-on-surface-variant space-y-0.5">
                        <span className="font-semibold text-on-surface text-sm">3 năm gắn bó</span>
                        <span className="text-outline">1,240 ảnh • 8 video</span>
                        <span className="text-[11px] text-outline font-medium">Dung lượng: 2.3 GB</span>
                      </div>
                    </td>
                    <td className="py-4 px-3 align-middle">
                      <div className="flex flex-col space-y-1">
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-surface-container font-label-sm text-label-sm text-on-secondary-container font-semibold w-fit">
                          <span className="material-symbols-outlined text-[12px]">lock</span>
                          <span>Khóa bảo mật riêng</span>
                        </span>
                        <span className="text-[11px] text-outline">Đã mã hóa 2 lớp</span>
                      </div>
                    </td>
                    <td className="py-4 pr-6 pl-3 align-middle text-right">
                      <div className="flex items-center justify-end gap-1">
                        <button className="p-1.5 text-outline hover:text-primary hover:bg-surface-container rounded-full transition-colors" title="Mở khóa khẩn cấp">
                          <span className="material-symbols-outlined text-[18px]">key</span>
                        </button>
                        <button className="p-1.5 text-outline hover:text-on-surface hover:bg-surface-container rounded-full transition-colors" title="Chỉnh sửa tài khoản">
                          <span className="material-symbols-outlined text-[18px]">edit</span>
                        </button>
                        <button className="p-1.5 text-outline hover:text-on-surface hover:bg-surface-container rounded-full transition-colors" title="Tùy chọn khác">
                          <span className="material-symbols-outlined text-[18px]">more_vert</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                  <tr className="hover:bg-surface-container-low/60 transition-colors group">
                    <td className="py-4 pl-6 pr-3 align-middle">
                      <input className="w-4 h-4 rounded text-primary-container bg-surface-container-low focus:ring-0 cursor-pointer" type="checkbox" />
                    </td>
                    <td className="py-4 px-3 align-middle">
                      <div className="flex items-center gap-3">
                        <div className="relative flex shrink-0 items-center -space-x-2">
                          <img className="w-10 h-10 rounded-full object-cover shadow-sm ring-2 ring-surface-container-lowest" data-alt="Charming outdoor candid portrait of a stylish Vietnamese couple laughing together under autumn golden maple leaves" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDExLiCJknkVS7Rh1lmlp1dshvl5pb3BMSC6PuYGbknsh7rBEH9tZ6FJRtTZ77YajDpU3WJj_WWOj9kiKPWEtiM1rS2Bi_kxrSsStdPzycU_aC1p-xM--NTDltMSctWdMtnjnJ9nY1Bs0ccHM5GGlgZ6lPEHSIHHvPxdtypADBAlIxEh5PIOEnKllMs3ZszgGLT3uhXK1i5u0jsL4vTsqqhsbdVAOCO0NbA6fVchYvDgEVcLcEtn1A8" />
                          <div className="w-10 h-10 rounded-full bg-surface-container-high flex items-center justify-center text-primary font-bold text-xs ring-2 ring-surface-container-lowest">
                            NH
                          </div>
                        </div>
                        <div className="flex flex-col min-w-0">
                          <span className="font-title-md text-title-md text-on-surface font-bold truncate">Quốc Bảo &amp; Ngọc Hân</span>
                          <div className="flex items-center gap-1.5 mt-0.5">
                            <span className="font-label-sm text-label-sm text-primary font-semibold">#CS-ST-9021</span>
                            <span className="text-outline text-[12px]">•</span>
                            <span className="font-label-sm text-label-sm text-primary underline truncate flex items-center gap-0.5">
                              <span>quocbao-ngochan.site</span>
                            </span>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-3 align-middle">
                      <div className="flex flex-col space-y-1">
                        <div className="flex items-center gap-1.5 text-xs text-on-surface truncate">
                          <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                          <span className="truncate font-medium">quocbao.ceo@fpt.vn</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-xs text-on-surface-variant truncate">
                          <span className="w-1.5 h-1.5 rounded-full bg-secondary shrink-0" />
                          <span className="truncate">ngochan.vtv@gmail.com</span>
                        </div>
                        <div className="inline-flex items-center gap-1 text-[11px] font-semibold text-primary">
                          <span className="material-symbols-outlined text-[14px]">link</span>
                          <span>Đã ghép đôi hoàn tất</span>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-3 align-middle">
                      <div className="flex flex-col space-y-1">
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-surface-container font-label-sm text-label-sm text-secondary font-bold w-fit">
                          <span className="material-symbols-outlined text-[13px]">domain_verification</span>
                          <span>PRO MAX</span>
                        </span>
                        <span className="text-on-surface-variant font-label-sm text-label-sm flex items-center gap-1">
                          <span className="material-symbols-outlined text-[14px] text-outline">palette</span>
                          <span>Royal Wedding</span>
                        </span>
                      </div>
                    </td>
                    <td className="py-4 px-3 align-middle">
                      <div className="flex flex-col text-xs text-on-surface-variant space-y-0.5">
                        <span className="font-semibold text-on-surface text-sm">Chuẩn bị lễ cưới</span>
                        <span className="text-outline">320 ảnh album • 82 lời chúc</span>
                        <span className="text-[11px] text-outline font-medium">Dung lượng: 890 MB</span>
                      </div>
                    </td>
                    <td className="py-4 px-3 align-middle">
                      <div className="flex flex-col space-y-1">
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-surface-container font-label-sm text-label-sm text-on-secondary-container font-semibold w-fit">
                          <span className="material-symbols-outlined text-[12px]">dns</span>
                          <span>Chờ duyệt DNS CNAME</span>
                        </span>
                        <span className="text-[11px] text-outline">Gửi 2 giờ trước</span>
                      </div>
                    </td>
                    <td className="py-4 pr-6 pl-3 align-middle text-right">
                      <div className="flex items-center justify-end gap-1">
                        <button className="px-2.5 py-1 rounded-full bg-primary-container text-on-primary font-label-sm text-label-sm hover:opacity-90 transition-opacity" title="Kích hoạt tên miền CNAME ngay">
                          Duyệt DNS
                        </button>
                        <button className="p-1.5 text-outline hover:text-on-surface hover:bg-surface-container rounded-full transition-colors" title="Tùy chọn khác">
                          <span className="material-symbols-outlined text-[18px]">more_vert</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                  <tr className="hover:bg-surface-container-low/60 transition-colors group">
                    <td className="py-4 pl-6 pr-3 align-middle">
                      <input className="w-4 h-4 rounded text-primary-container bg-surface-container-low focus:ring-0 cursor-pointer" type="checkbox" />
                    </td>
                    <td className="py-4 px-3 align-middle">
                      <div className="flex items-center gap-3">
                        <div className="relative flex shrink-0 items-center -space-x-2">
                          <div className="w-10 h-10 rounded-full bg-surface-container flex items-center justify-center text-primary font-bold text-xs ring-2 ring-surface-container-lowest">
                            DM
                          </div>
                          <div className="w-10 h-10 rounded-full bg-surface-container-high flex items-center justify-center text-secondary font-bold text-xs ring-2 ring-surface-container-lowest">
                            PV
                          </div>
                        </div>
                        <div className="flex flex-col min-w-0">
                          <span className="font-title-md text-title-md text-on-surface font-bold truncate">Đức Minh &amp; Phương Vy</span>
                          <div className="flex items-center gap-1.5 mt-0.5">
                            <span className="font-label-sm text-label-sm text-primary font-semibold">#CS-ST-2184</span>
                            <span className="text-outline text-[12px]">•</span>
                            <a className="font-label-sm text-label-sm text-secondary hover:text-primary flex items-center gap-0.5 truncate" href="#">
                              <span>minh-vy.love</span>
                              <span className="material-symbols-outlined text-[13px]">open_in_new</span>
                            </a>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-3 align-middle">
                      <div className="flex flex-col space-y-1">
                        <div className="flex items-center gap-1.5 text-xs text-on-surface truncate">
                          <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                          <span className="truncate font-medium">ducminh.arc@gmail.com</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-xs text-on-surface-variant truncate">
                          <span className="w-1.5 h-1.5 rounded-full bg-secondary shrink-0" />
                          <span className="truncate">phuongvy.mkt@gmail.com</span>
                        </div>
                        <div className="inline-flex items-center gap-1 text-[11px] font-semibold text-primary">
                          <span className="material-symbols-outlined text-[14px]">link</span>
                          <span>Đã ghép đôi hoàn tất</span>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-3 align-middle">
                      <div className="flex flex-col space-y-1">
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-surface-container font-label-sm text-label-sm text-primary font-bold w-fit">
                          <span className="material-symbols-outlined text-[13px]">favorite</span>
                          <span>COUPLE</span>
                        </span>
                        <span className="text-on-surface-variant font-label-sm text-label-sm flex items-center gap-1">
                          <span className="material-symbols-outlined text-[14px] text-outline">palette</span>
                          <span>Minimal Couple</span>
                        </span>
                      </div>
                    </td>
                    <td className="py-4 px-3 align-middle">
                      <div className="flex flex-col text-xs text-on-surface-variant space-y-0.5">
                        <span className="font-semibold text-on-surface text-sm">365 ngày</span>
                        <span className="text-outline">190 ảnh • 9 cột mốc</span>
                        <span className="text-[11px] text-outline font-medium">Dung lượng: 310 MB</span>
                      </div>
                    </td>
                    <td className="py-4 px-3 align-middle">
                      <div className="flex flex-col space-y-1">
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-surface-container text-primary font-label-sm text-label-sm font-semibold w-fit">
                          <span className="material-symbols-outlined text-[12px]">warning</span>
                          <span>Duyệt ảnh bìa</span>
                        </span>
                        <span className="text-[11px] text-outline">Báo cáo vi phạm</span>
                      </div>
                    </td>
                    <td className="py-4 pr-6 pl-3 align-middle text-right">
                      <div className="flex items-center justify-end gap-1">
                        <button className="p-1.5 text-primary hover:bg-surface-container rounded-full transition-colors" title="Kiểm duyệt hình ảnh">
                          <span className="material-symbols-outlined text-[18px]">verified</span>
                        </button>
                        <button className="p-1.5 text-outline hover:text-on-surface hover:bg-surface-container rounded-full transition-colors" title="Chỉnh sửa">
                          <span className="material-symbols-outlined text-[18px]">edit</span>
                        </button>
                        <button className="p-1.5 text-outline hover:text-on-surface hover:bg-surface-container rounded-full transition-colors" title="Tùy chọn khác">
                          <span className="material-symbols-outlined text-[18px]">more_vert</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 px-6 py-4 bg-surface-container-low/40">
              <div className="font-body-sm text-body-sm text-on-surface-variant">
                Hiển thị <span className="font-semibold text-on-surface">1 - 6</span> trên tổng số <span className="font-semibold text-on-surface">5,420</span> Story tình yêu
              </div>
              <div className="flex items-center gap-1.5">
                <button className="w-9 h-9 flex items-center justify-center rounded-full bg-surface-container-lowest text-outline hover:text-on-surface hover:bg-surface-container transition-colors disabled:opacity-40" disabled>
                  <span className="material-symbols-outlined text-[18px]">chevron_left</span>
                </button>
                <button className="w-9 h-9 flex items-center justify-center rounded-full bg-primary-container text-on-primary font-label-sm text-label-sm font-semibold shadow-sm">
                  1
                </button>
                <button className="w-9 h-9 flex items-center justify-center rounded-full bg-surface-container-lowest text-on-surface hover:bg-surface-container transition-colors font-label-sm text-label-sm">
                  2
                </button>
                <button className="w-9 h-9 flex items-center justify-center rounded-full bg-surface-container-lowest text-on-surface hover:bg-surface-container transition-colors font-label-sm text-label-sm">
                  3
                </button>
                <span className="px-2 text-outline font-label-sm text-label-sm">...</span>
                <button className="w-9 h-9 flex items-center justify-center rounded-full bg-surface-container-lowest text-on-surface hover:bg-surface-container transition-colors font-label-sm text-label-sm">
                  904
                </button>
                <button className="w-9 h-9 flex items-center justify-center rounded-full bg-surface-container-lowest text-on-surface hover:bg-surface-container transition-colors">
                  <span className="material-symbols-outlined text-[18px]">chevron_right</span>
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="xl:col-span-3 flex flex-col space-y-6">
          <div className="bg-surface-container-lowest rounded-lg p-6 shadow-sm flex flex-col space-y-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-primary-container" />
                <h3 className="font-title-lg text-title-lg text-on-surface font-bold">Thịnh hành tuần này</h3>
              </div>
              <span className="font-label-sm text-label-sm text-outline">Real-time</span>
            </div>
            <p className="font-body-sm text-body-sm text-on-surface-variant">
              Tỷ lệ chọn mẫu giao diện kỷ niệm của các cặp đôi đăng ký mới trong 7 ngày qua.
            </p>
            <div className="flex flex-col space-y-4">
              <div className="flex flex-col space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-on-surface flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-primary" />
                    Eternal Love (Cinematic)
                  </span>
                  <span className="font-bold text-primary">44%</span>
                </div>
                <div className="w-full bg-surface-container h-2 rounded-full overflow-hidden">
                  <div className="bg-primary h-full rounded-full" style={{width: '44%'}} />
                </div>
              </div>
              <div className="flex flex-col space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-on-surface flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-secondary" />
                    Minimal Couple
                  </span>
                  <span className="font-bold text-secondary">32%</span>
                </div>
                <div className="w-full bg-surface-container h-2 rounded-full overflow-hidden">
                  <div className="bg-secondary h-full rounded-full" style={{width: '32%'}} />
                </div>
              </div>
              <div className="flex flex-col space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-on-surface flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-tertiary" />
                    Sunset Horizon
                  </span>
                  <span className="font-bold text-tertiary">14%</span>
                </div>
                <div className="w-full bg-surface-container h-2 rounded-full overflow-hidden">
                  <div className="bg-tertiary h-full rounded-full" style={{width: '14%'}} />
                </div>
              </div>
              <div className="flex flex-col space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-on-surface flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-outline" />
                    Các template khác
                  </span>
                  <span className="font-bold text-outline">10%</span>
                </div>
                <div className="w-full bg-surface-container h-2 rounded-full overflow-hidden">
                  <div className="bg-outline h-full rounded-full" style={{width: '10%'}} />
                </div>
              </div>
            </div>
            <div className="pt-2">
              <a className="w-full flex items-center justify-center gap-2 py-2.5 rounded-full bg-surface-container text-primary font-label-md text-label-md hover:bg-surface-container-high transition-colors" href="#">
                <span>Quản lý Kho Giao diện</span>
                <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
              </a>
            </div>
          </div>
          <div className="relative overflow-hidden rounded-lg p-6 bg-surface-container shadow-sm flex flex-col justify-between">
            <div className="relative z-10 flex flex-col space-y-3">
              <div className="w-10 h-10 rounded-full bg-surface-container-lowest flex items-center justify-center text-primary shadow-sm">
                <span className="material-symbols-outlined text-[20px]">security</span>
              </div>
              <h4 className="font-title-lg text-title-lg text-on-surface font-bold">
                Kiểm duyệt An toàn Không gian Tình yêu
              </h4>
              <p className="font-body-sm text-body-sm text-on-surface-variant">
                Thuật toán AI đã tự động phân tích 1,420 hình ảnh kỷ niệm mới tải lên trong ngày hôm nay. Không phát hiện nội dung độc hại.
              </p>
            </div>
            <div className="relative z-10 mt-5 pt-4 flex items-center justify-between">
              <span className="font-label-sm text-label-sm text-primary font-bold flex items-center gap-1">
                <span className="material-symbols-outlined text-[16px]">check_circle</span>
                AI Safety 99.9%
              </span>
              <button className="font-label-sm text-label-sm text-on-secondary-container hover:underline">
                Xem nhật ký quét
              </button>
            </div>
          </div>
          <div className="bg-surface-container-lowest rounded-lg p-5 shadow-sm flex flex-col space-y-3">
            <span className="font-label-sm text-label-sm text-outline uppercase tracking-wider">Hỗ trợ đối tác &amp; Khách hàng</span>
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-surface-container flex items-center justify-center text-primary shrink-0">
                <span className="material-symbols-outlined text-[18px]">support_agent</span>
              </div>
              <div className="flex flex-col min-w-0">
                <span className="font-title-md text-title-md text-on-surface font-semibold truncate">Hotline VIP Trợ lý</span>
                <span className="font-body-sm text-body-sm text-outline-variant truncate">Hỗ trợ setup domain riêng &amp; story</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div></main></div>

    </>
  );
}
