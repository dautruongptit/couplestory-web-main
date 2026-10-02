import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';

type Tab = 'profile' | 'security' | 'billing';

export default function Account() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [tab, setTab] = useState<Tab>('profile');
  const [name, setName] = useState(user?.name || '');
  const [saved, setSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleLogout = () => { logout(); navigate('/'); };

  const planCode = user?.plan ?? 'FREE';
  const planLabel = planCode === 'PREMIUM' ? 'PREMIUM' : planCode === 'COUPLE' ? 'COUPLE' : planCode === 'PLUS' ? 'PLUS' : 'FREE';

  const tabs: { id: Tab; icon: string; label: string }[] = [
    { id: 'profile', icon: 'person', label: 'Hồ sơ chung' },
    { id: 'security', icon: 'lock', label: 'Mật khẩu & Bảo mật' },
    { id: 'billing', icon: 'receipt_long', label: 'Lịch sử thanh toán' },
  ];

  return (
    <div className="px-4 md:px-6 py-6 max-w-[900px] mx-auto">
      {/* Breadcrumb */}
      <div className="flex items-center gap-1.5 text-xs text-[#8d7076] mb-4">
        <Link to="/dashboard" className="hover:text-[#ff4d8d] transition-colors">Cài đặt</Link>
        <span>›</span>
        <span className="text-[#ff4d8d] font-medium">Hồ sơ</span>
      </div>

      <h1 className="text-2xl font-bold text-[#2e1220] mb-1">Cài đặt tài khoản</h1>
      <p className="text-sm text-[#594046] mb-6">Quản lý thông tin cá nhân, bảo mật và gói dịch vụ của bạn.</p>

      {/* Tabs */}
      <div className="flex gap-1 border-b border-[#f0e4e8] mb-6 overflow-x-auto scrollbar-hide -mx-4 px-4 md:mx-0 md:px-0">
        {tabs.map(t => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`flex items-center gap-1.5 px-3 sm:px-4 py-2.5 text-sm font-medium border-b-2 transition-colors whitespace-nowrap shrink-0 ${
              tab === t.id
                ? 'border-[#ff4d8d] text-[#ff4d8d]'
                : 'border-transparent text-[#594046] hover:text-[#2e1220] hover:border-[#e1bec5]'
            }`}
          >
            <span className="material-symbols-outlined text-[18px]">{t.icon}</span>
            <span className="hidden sm:inline">{t.label}</span>
            <span className="sm:hidden">{t.id === 'profile' ? 'Hồ sơ' : t.id === 'security' ? 'Bảo mật' : 'Thanh toán'}</span>
          </button>
        ))}
      </div>

      {/* Profile tab */}
      {tab === 'profile' && (
        <div className="space-y-5">
          {/* Personal info card */}
          <div className="bg-white rounded-2xl border border-[#f0e4e8] p-6 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-bold text-[#2e1220]">Thông tin cá nhân</h2>
            </div>

            {/* Avatar */}
            <div className="flex flex-col sm:flex-row items-center gap-4 mb-6 p-4 rounded-xl bg-[#faf7f8] border border-[#f0e4e8]">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#ff4d8d] to-[#b90a5a] flex items-center justify-center shadow-lg shrink-0">
                <span className="text-white text-2xl font-bold">{user?.name?.charAt(0).toUpperCase()}</span>
              </div>
              <div className="flex-1 text-center sm:text-left">
                <p className="font-semibold text-[#2e1220] text-sm">Ảnh đại diện</p>
                <p className="text-xs text-[#8d7076] mb-2">JPG, PNG hoặc WEBP. Tối đa 5MB.</p>
                <div className="flex gap-2 justify-center sm:justify-start">
                  <button className="px-3 py-1.5 rounded-lg bg-[#fff0f4] text-[#ff4d8d] text-xs font-semibold hover:bg-[#ffe8ef] transition-colors flex items-center gap-1">
                    <span className="material-symbols-outlined text-[14px]">upload</span>
                    Đổi ảnh
                  </button>
                  <button className="px-3 py-1.5 rounded-lg text-[#8d7076] text-xs font-medium hover:bg-[#f5eef1] transition-colors">
                    Xóa
                  </button>
                </div>
              </div>
            </div>

            {/* Plan badge */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 mb-6 p-3 rounded-xl bg-[#fff5f9] border border-[#ffe0eb]">
              <span className="material-symbols-outlined text-[#ff4d8d] text-[20px] hidden sm:block" style={{ fontVariationSettings: "'FILL' 1" }}>favorite</span>
              <div className="flex-1">
                <p className="text-sm">
                  <span className="text-[#594046]">Gói hiện tại: </span>
                  <span className="font-bold text-[#ff4d8d]">{planLabel}</span>
                  <span className="ml-2 px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700 text-[10px] font-bold">Đang dùng</span>
                </p>
                <p className="text-xs text-[#8d7076] mt-0.5">Đang sử dụng gói cơ bản. Nâng cấp để mở khóa thêm tính năng.</p>
              </div>
              {planCode !== 'PREMIUM' && (
                <Link to="/dashboard/upgrade" className="text-[#ff4d8d] text-sm font-semibold hover:underline whitespace-nowrap">
                  Nâng cấp →
                </Link>
              )}
            </div>

            {/* Form */}
            <form onSubmit={handleSave} className="space-y-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-semibold text-[#2e1220]">Họ tên <span className="text-[#ff4d8d]">*</span></label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 material-symbols-outlined text-[18px] text-[#8d7076]">person</span>
                  <input
                    type="text"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    className="w-full h-11 pl-10 pr-4 rounded-xl border border-[#e1bec5] bg-white text-sm text-[#2e1220] focus:outline-none focus:border-[#ff4d8d] focus:ring-2 focus:ring-[#ff4d8d]/20 transition-all"
                    placeholder="Nhập họ tên"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-semibold text-[#2e1220]">Email <span className="text-[#ff4d8d]">*</span></label>
                  <span className="flex items-center gap-1 text-[10px] font-semibold text-emerald-600">
                    <span className="material-symbols-outlined text-[12px]">verified</span>
                    Đã xác minh
                  </span>
                </div>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 material-symbols-outlined text-[18px] text-[#8d7076]">mail</span>
                  <input
                    type="email"
                    value={user?.email || ''}
                    disabled
                    className="w-full h-11 pl-10 pr-10 rounded-xl border border-[#e1bec5] bg-[#faf7f8] text-sm text-[#8d7076] cursor-not-allowed"
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 material-symbols-outlined text-[16px] text-[#8d7076]">lock</span>
                </div>
                <p className="text-[11px] text-[#8d7076] flex items-center gap-1">
                  <span className="material-symbols-outlined text-[12px]">info</span>
                  Email không thể thay đổi vì lý do bảo mật.
                </p>
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="submit"
                  className={`px-6 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                    saved
                      ? 'bg-emerald-500 text-white'
                      : 'bg-gradient-to-r from-[#ff4d8d] to-[#e63e7b] text-white hover:shadow-lg shadow-md'
                  }`}
                >
                  {saved ? (
                    <span className="flex items-center gap-1.5">
                      <span className="material-symbols-outlined text-[16px]">check_circle</span>
                      Đã lưu!
                    </span>
                  ) : (
                    <span className="flex items-center gap-1.5">
                      <span className="material-symbols-outlined text-[16px]">save</span>
                      Lưu thay đổi
                    </span>
                  )}
                </button>
                <button type="button" className="px-5 py-2.5 rounded-xl text-sm font-medium text-[#594046] hover:bg-[#f5eef1] transition-colors">
                  Hủy
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Security tab */}
      {tab === 'security' && (
        <div className="space-y-5">
          <div className="bg-white rounded-2xl border border-[#f0e4e8] p-6 shadow-sm">
            <h2 className="text-lg font-bold text-[#2e1220] mb-4">Mật khẩu</h2>
            <Link to="/forgot-password" className="flex items-center justify-between p-4 rounded-xl bg-[#faf7f8] border border-[#f0e4e8] hover:bg-[#fff5f9] transition-colors group">
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-[20px] text-[#594046]">lock</span>
                <div>
                  <p className="text-sm font-semibold text-[#2e1220]">Đổi mật khẩu</p>
                  <p className="text-xs text-[#8d7076]">Cập nhật mật khẩu đăng nhập</p>
                </div>
              </div>
              <span className="material-symbols-outlined text-[#8d7076] group-hover:text-[#ff4d8d] transition-colors">chevron_right</span>
            </Link>
          </div>

          <div className="bg-white rounded-2xl border border-[#ffdad6] p-6 shadow-sm">
            <h2 className="text-lg font-bold text-[#ba1a1a] mb-4">Vùng nguy hiểm</h2>
            <button onClick={handleLogout} className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-[#ba1a1a] text-[#ba1a1a] text-sm font-semibold hover:bg-[#ffdad6] transition-all">
              <span className="material-symbols-outlined text-[18px]">logout</span>
              Đăng xuất
            </button>
          </div>
        </div>
      )}

      {/* Billing tab */}
      {tab === 'billing' && (
        <div className="bg-white rounded-2xl border border-[#f0e4e8] p-6 shadow-sm">
          <h2 className="text-lg font-bold text-[#2e1220] mb-4">Lịch sử thanh toán</h2>
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <span className="material-symbols-outlined text-[40px] text-[#e1bec5] mb-3">receipt_long</span>
            <p className="text-sm text-[#594046]">Chưa có giao dịch nào.</p>
            {planCode === 'FREE' && (
              <Link to="/dashboard/upgrade" className="mt-3 text-sm text-[#ff4d8d] font-semibold hover:underline">
                Nâng cấp gói để bắt đầu →
              </Link>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
