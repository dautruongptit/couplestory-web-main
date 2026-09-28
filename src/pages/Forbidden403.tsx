import { Link } from 'react-router-dom';

export default function Forbidden403() {
  return (
    <div className="min-h-screen">
<div>
  <header className="w-full py-space-md px-gutter md:px-margin flex items-center justify-between bg-surface/80 backdrop-blur-xl shadow-[0_1px_8px_rgba(61,31,45,0.03)]"><div className="flex items-center gap-space-sm"><div className="w-8 h-8 rounded-full bg-surface-container-high flex items-center justify-center text-primary"><span className="material-symbols-outlined text-[18px]">favorite</span></div><span className="font-headline-md text-headline-md text-on-surface tracking-tight">CoupleStory</span><span className="px-space-xs py-0.5 rounded-full bg-surface-container text-secondary font-label-sm text-label-sm uppercase tracking-wider ml-space-xs">Admin Vault</span></div><div className="flex items-center gap-space-sm"><div className="flex items-center gap-space-xs px-space-md py-space-xs rounded-full bg-surface-container-low text-secondary font-label-md text-label-md"><span className="material-symbols-outlined text-[16px] text-primary">lock</span><span className="hidden sm:inline">Protected Access</span></div><div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center"><span className="material-symbols-outlined text-on-primary text-[18px]">person</span></div></div></header><main className="flex-1 w-full max-w-7xl mx-auto px-gutter md:px-margin flex flex-col justify-center items-center py-space-xl"><div className="flex flex-col w-full items-center justify-center relative">
      <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[720px] h-[340px] bg-gradient-to-b from-primary/15 via-tertiary-fixed-dim/10 to-transparent rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute top-1/3 -right-20 w-80 h-80 bg-secondary-container/40 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-10 -left-20 w-96 h-96 bg-primary-fixed/30 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="w-full max-w-4xl flex flex-col items-center">
        <div className="w-full flex flex-col sm:flex-row items-center justify-between gap-space-sm px-space-md py-space-xs bg-surface-container-low/90 backdrop-blur-md rounded-full shadow-sm mb-space-lg">
          <div className="flex items-center gap-space-xs">
            <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-primary/10 text-primary">
              <span className="material-symbols-outlined text-[14px]">shield</span>
            </span>
            <span className="font-label-sm text-label-sm uppercase tracking-widest text-primary font-bold">Administrative Area • Restricted Access</span>
          </div>
          <div className="flex items-center gap-space-md font-label-sm text-label-sm text-secondary">
            <span className="flex items-center gap-1 font-mono text-[11px]">
              <span className="w-1.5 h-1.5 rounded-full bg-error animate-pulse" />
              IP: 14.162.**.**
            </span>
            <span className="text-outline-variant font-mono">/</span>
            <span className="font-mono text-[11px]">Session #CS-SEC-9842</span>
            <span className="hidden md:inline-flex items-center gap-1 text-[11px] text-on-surface-variant">
              <span className="material-symbols-outlined text-[13px]">schedule</span>
              <span id="live-time-ticker">21:22:59 GMT+7</span>
            </span>
          </div>
        </div>
        <div className="relative w-full flex flex-col items-center justify-center py-space-sm">
          <div className="relative select-none flex items-center justify-center">
            <span className="font-headline-xl text-[96px] md:text-[144px] leading-none font-bold text-surface-container-high/70 tracking-tighter mix-blend-multiply drop-shadow-sm">
              403
            </span>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative group">
                <div className="absolute -inset-3 bg-gradient-to-tr from-primary via-primary-container to-tertiary-fixed-dim rounded-full blur-md opacity-30 group-hover:opacity-50 transition-all duration-700" />
                <div className="relative w-24 h-24 md:w-28 md:h-28 rounded-3xl bg-inverse-surface text-inverse-on-surface p-space-sm flex flex-col items-center justify-center shadow-xl">
                  <svg className="absolute inset-0 w-full h-full opacity-20 pointer-events-none p-2" fill="none" stroke="currentColor" viewBox="0 0 100 100">
                    <circle cx={50} cy={50} r={42} strokeDasharray="3 3" strokeWidth="1.2" />
                    <path d="M50 15 V 30 M50 70 V 85 M15 50 H 30 M70 50 H 85" strokeWidth="1.2" />
                    <circle cx={50} cy={50} r={28} strokeWidth={1} />
                  </svg>
                  <div className="relative flex items-center justify-center">
                    <span className="material-symbols-outlined text-[44px] md:text-[50px] text-primary-fixed-dim" style={{fontVariationSettings: '"FILL" 1'}}>
                      lock
                    </span>
                    <span className="material-symbols-outlined text-[20px] text-primary-container absolute -bottom-1 -right-1 bg-inverse-surface rounded-full p-0.5" style={{fontVariationSettings: '"FILL" 1'}}>
                      favorite
                    </span>
                  </div>
                  <span className="font-label-sm text-[9px] uppercase tracking-wider text-tertiary-fixed-dim mt-1 font-mono">
                    Vault Gate
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-2 inline-flex items-center gap-space-xs px-space-md py-1 rounded-full bg-error-container text-on-error-container font-label-sm text-label-sm shadow-sm">
            <span className="material-symbols-outlined text-[16px] text-error">gpp_bad</span>
            <span className="font-semibold tracking-wide">MÃ LỖI: HTTP 403 FORBIDDEN • ACCESS DENIED</span>
          </div>
          <div className="text-center max-w-2xl mt-space-md">
            <h1 className="font-headline-lg text-headline-lg text-on-surface tracking-tight">
              Khu Vực Quản Trị Tối Mật
            </h1>
            <p className="font-body-md text-body-md text-secondary mt-space-xs leading-relaxed">
              Tài khoản hiện tại của bạn (<span className="font-mono text-[13px] px-2 py-0.5 rounded-full bg-surface-container-high text-on-surface font-semibold">user@couplestory.site</span> • Vai trò: <span className="text-primary font-semibold">Standard Member</span>) chưa được phân quyền điều hành hệ thống. Mọi tương tác trái thẩm quyền đều được lưu trữ nhật ký an ninh tự động nhằm bảo vệ trọn vẹn quyền riêng tư cho các cặp đôi.
            </p>
          </div>
        </div>
        <div className="w-full mt-space-md bg-inverse-surface text-inverse-on-surface rounded-lg p-space-lg shadow-xl relative overflow-hidden">
          <div className="absolute -right-12 -top-12 w-36 h-36 rounded-full bg-primary/20 blur-2xl pointer-events-none" />
          <div className="flex items-center justify-between pb-space-sm mb-space-md text-surface-variant/80">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-error inline-block" />
              <span className="w-3 h-3 rounded-full bg-tertiary-container inline-block" />
              <span className="w-3 h-3 rounded-full bg-outline inline-block" />
              <span className="ml-space-xs font-mono text-[12px] text-tertiary-fixed uppercase tracking-wider font-semibold">
                Security Gateway • Inspection Trace
              </span>
            </div>
            <span className="font-mono text-[11px] px-2 py-0.5 rounded bg-on-secondary-fixed text-primary-fixed-dim">
              WAF-Vault v2.4 (Strict)
            </span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-space-sm font-mono text-[13px]">
            <div className="p-space-sm rounded bg-on-secondary-fixed/50 flex flex-col gap-1">
              <span className="text-outline-variant text-[11px] uppercase font-sans font-semibold tracking-wider">Mã yêu cầu (Request ID)</span>
              <div className="flex items-center justify-between">
                <span className="text-primary-fixed-dim font-bold">REQ-403-ADM-77894A</span>
                <button className="text-tertiary-fixed hover:text-white transition-colors" onClick={() => {}} title="Sao chép">
                  <span className="material-symbols-outlined text-[16px]">content_copy</span>
                </button>
              </div>
            </div>
            <div className="p-space-sm rounded bg-on-secondary-fixed/50 flex flex-col gap-1">
              <span className="text-outline-variant text-[11px] uppercase font-sans font-semibold tracking-wider">Tài nguyên được bảo vệ</span>
              <span className="text-surface-bright font-medium truncate">/admin/system-settings &amp; /couple-vaults</span>
            </div>
            <div className="p-space-sm rounded bg-on-secondary-fixed/50 flex flex-col gap-1">
              <span className="text-outline-variant text-[11px] uppercase font-sans font-semibold tracking-wider">Cấp bậc yêu cầu (Required Role)</span>
              <span className="text-tertiary-fixed-dim font-bold">ROLE_SUPERADMIN / SECURITY_AUDITOR</span>
            </div>
            <div className="p-space-sm rounded bg-on-secondary-fixed/50 flex flex-col gap-1">
              <span className="text-outline-variant text-[11px] uppercase font-sans font-semibold tracking-wider">Tình trạng giám sát</span>
              <div className="flex items-center gap-1.5 text-error-container">
                <span className="material-symbols-outlined text-[16px]">block</span>
                <span className="font-medium text-[12px]">Request Terminated • Access Policy Enforced</span>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-space-lg w-full flex flex-col sm:flex-row items-center justify-center gap-space-md">
          <Link className="w-full sm:w-auto inline-flex items-center justify-center gap-space-xs px-space-lg py-3 rounded-full bg-primary text-on-primary font-label-md text-label-md shadow-md hover:bg-primary/90 hover:scale-[1.02] transition-all" to="/dashboard">
            <span className="material-symbols-outlined text-[18px]">favorite</span>
            <span>Về Bảng Điều Khiển Cá Nhân</span>
          </Link>
          <Link className="w-full sm:w-auto inline-flex items-center justify-center gap-space-xs px-space-lg py-3 rounded-full bg-surface-container text-on-surface font-label-md text-label-md shadow-sm hover:bg-surface-container-high transition-all" to="/admin/login">
            <span className="material-symbols-outlined text-[18px]">admin_panel_settings</span>
            <span>Đăng Nhập Với Tài Khoản Quản Trị</span>
          </Link>
          <button className="w-full sm:w-auto inline-flex items-center justify-center gap-space-xs px-space-md py-3 rounded-full bg-transparent text-secondary hover:text-primary font-label-md text-label-md transition-colors" onClick={() => {}}>
            <span className="material-symbols-outlined text-[18px]">contact_support</span>
            <span>Yêu Cầu Cấp Quyền IT</span>
          </button>
        </div>
        <div className="mt-space-xl pt-space-md w-full max-w-2xl text-center">
          <div className="inline-flex items-center gap-space-xs px-space-md py-1 rounded-full bg-surface-container-low text-secondary font-label-sm text-label-sm mb-space-xs">
            <span className="material-symbols-outlined text-[14px] text-primary">verified_user</span>
            <span>Kiến Trúc Zero-Trust • Tiêu Chuẩn Mã Hoá Kỷ Niệm AES-256</span>
          </div>
          <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
            CoupleStory tôn trọng và bảo vệ tuyệt đối không gian lưu giữ khoảnh khắc của các cặp đôi. Nếu bạn cho rằng đây là một sự nhầm lẫn về phân quyền trong ca trực, xin vui lòng gửi phản hồi tới
            <a className="text-primary hover:underline font-semibold" href="mailto:security@couplestory.site">security@couplestory.site</a>.
          </p>
        </div>
      </div>
      <div className="hidden fixed inset-0 z-50 flex items-center justify-center p-space-md bg-inverse-surface/60 backdrop-blur-sm" id="ticket-modal">
        <div className="w-full max-w-lg bg-surface-container-lowest rounded-lg p-space-lg shadow-2xl relative flex flex-col gap-space-md">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-space-xs">
              <div className="w-8 h-8 rounded-full bg-surface-container-high flex items-center justify-center text-primary">
                <span className="material-symbols-outlined text-[18px]">key</span>
              </div>
              <h3 className="font-title-lg text-title-lg text-on-surface">Yêu Cầu Cấp Quyền Quản Trị</h3>
            </div>
            <button className="w-8 h-8 rounded-full hover:bg-surface-container flex items-center justify-center text-secondary" onClick={() => {}}>
              <span className="material-symbols-outlined text-[20px]">close</span>
            </button>
          </div>
          <p className="font-body-sm text-body-sm text-secondary">
            Phiếu yêu cầu sẽ được chuyển tiếp kèm mã định danh kiểm toán tới Trưởng bộ phận An ninh Thông tin.
          </p>
          <form className="flex flex-col gap-space-sm" onSubmit={(e) => e.preventDefault()}>
            <div>
              <label className="block font-label-md text-label-md text-on-surface mb-1">Mã tham chiếu lỗi (Auto-filled)</label>
              <input className="w-full px-space-md py-2 rounded-full bg-surface-container text-on-surface font-mono text-[13px] outline-none" readOnly type="text" defaultValue="REQ-403-ADM-77894A" />
            </div>
            <div>
              <label className="block font-label-md text-label-md text-on-surface mb-1">Email người gửi</label>
              <input className="w-full px-space-md py-2 rounded-full bg-surface-container-low text-on-surface font-body-md text-body-md outline-none focus:bg-surface-container-lowest focus:shadow-sm" type="email" defaultValue="user@couplestory.site" />
            </div>
            <div>
              <label className="block font-label-md text-label-md text-on-surface mb-1">Lý do truy cập &amp; Phân hệ yêu cầu</label>
              <textarea className="w-full p-space-sm rounded-lg bg-surface-container-low text-on-surface font-body-md text-body-md outline-none focus:bg-surface-container-lowest focus:shadow-sm" placeholder="Mô tả công việc phân công cần can thiệp tại phân hệ Quản trị..." required rows={3} defaultValue={""} />
            </div>
            <div className="flex items-center justify-end gap-space-sm mt-space-xs">
              <button className="px-space-md py-2 rounded-full bg-surface-container text-secondary font-label-md text-label-md hover:bg-surface-container-high transition-colors" onClick={() => {}} type="button">
                Hủy Bỏ
              </button>
              <button className="px-space-lg py-2 rounded-full bg-primary text-on-primary font-label-md text-label-md hover:bg-primary/90 transition-colors" type="submit">
                Gửi Phiếu Yêu Cầu
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </main><footer className="w-full py-space-md px-gutter md:px-margin text-center bg-transparent"><div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-space-sm text-on-surface-variant font-label-sm text-label-sm"><span>CoupleStory • Curated Milestones &amp; Archival Platform</span><div className="flex items-center gap-space-md"><a className="text-on-surface-variant hover:text-primary transition-colors" href="#">Security Operations</a><a className="text-on-surface-variant hover:text-primary transition-colors" href="#">Support Gateway</a></div></div></footer>
</div>

    </div>
  );
}
