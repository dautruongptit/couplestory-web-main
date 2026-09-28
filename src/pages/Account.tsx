import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';

export default function Account() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [name, setName] = useState(user?.name || '');
  const [saved, setSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-[#fff8f8]">
      {/* Top bar */}
      <header className="fixed top-0 left-0 right-0 h-16 bg-[#fff8f8]/95 backdrop-blur-xl border-b border-[#e1bec5]/50 z-50 flex items-center px-4 md:px-8 gap-4">
        <Link to="/dashboard" className="flex items-center gap-1.5 text-[#594046] hover:text-[#ff4d8d] transition-colors">
          <span className="material-symbols-outlined text-[20px]">arrow_back</span>
          <span className="text-label-md text-label-md">Dashboard</span>
        </Link>
        <div className="flex-1" />
        <Link to="/" className="flex items-center gap-2 font-headline-md text-headline-md text-[#ff4d8d]">
          <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>favorite</span>
          CoupleStory
        </Link>
      </header>

      <div className="pt-16 max-w-2xl mx-auto px-4 py-8">
        <h1 className="font-headline-lg text-headline-lg text-[#2e1220] mb-8">Tài khoản của tôi</h1>

        {/* Avatar section */}
        <div className="bg-white rounded-2xl p-6 shadow-[0_4px_20px_rgba(61,31,45,0.06)] mb-4">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#ff4d8d] to-[#b90a5a] flex items-center justify-center text-white text-2xl font-bold shadow-lg">
              {user?.name?.charAt(0).toUpperCase()}
            </div>
            <div>
              <p className="font-title-lg text-title-lg text-[#2e1220]">{user?.name}</p>
              <p className="text-body-sm text-[#594046]">{user?.email}</p>
              <span className={`inline-flex items-center gap-1 mt-1 px-2.5 py-0.5 rounded-full text-label-sm text-label-sm font-semibold ${
                user?.plan === 'premium' ? 'bg-[#ff4d8d] text-white' : 'bg-[#e1bec5] text-[#594046]'
              }`}>
                <span className="material-symbols-outlined text-[13px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                  {user?.plan === 'premium' ? 'workspace_premium' : 'person'}
                </span>
                {user?.plan === 'premium' ? 'Premium' : user?.plan === 'basic' ? 'Basic' : 'Free'}
              </span>
            </div>
          </div>

          <form onSubmit={handleSave} className="space-y-4">
            <div className="flex flex-col gap-1.5">
              <label className="font-label-md text-label-md text-[#2e1220] font-semibold">Tên hiển thị</label>
              <input
                type="text" value={name}
                onChange={e => setName(e.target.value)}
                className="w-full px-4 py-3 rounded-full border border-[#e1bec5] bg-[#fff8f8] text-[#2e1220] font-body-md focus:outline-none focus:border-[#ff4d8d] focus:ring-2 focus:ring-[#ff4d8d]/20 transition-all"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="font-label-md text-label-md text-[#2e1220] font-semibold">Email</label>
              <input
                type="email" value={user?.email || ''} disabled
                className="w-full px-4 py-3 rounded-full border border-[#e1bec5] bg-[#f5eef1] text-[#8d7076] font-body-md cursor-not-allowed"
              />
              <p className="text-label-sm text-label-sm text-[#8d7076] pl-2">Email không thể thay đổi</p>
            </div>

            <div className="flex gap-3 pt-2">
              <button type="submit"
                className={`px-6 py-2.5 rounded-full font-label-md font-semibold transition-all ${
                  saved
                    ? 'bg-green-500 text-white'
                    : 'bg-[#ff4d8d] text-white hover:bg-[#b90a5a] hover:scale-[1.02]'
                }`}>
                {saved ? (
                  <span className="flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-[16px]">check_circle</span>Đã lưu!
                  </span>
                ) : 'Lưu thay đổi'}
              </button>
            </div>
          </form>
        </div>

        {/* Plan info */}
        <div className="bg-white rounded-2xl p-6 shadow-[0_4px_20px_rgba(61,31,45,0.06)] mb-4">
          <h2 className="font-title-lg text-title-lg text-[#2e1220] mb-4">Gói dịch vụ</h2>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-body-md text-[#2e1220]">
                Gói hiện tại:{' '}
                <span className="font-semibold text-[#ff4d8d]">
                  {user?.plan === 'premium' ? 'Premium' : user?.plan === 'basic' ? 'Basic' : 'Free'}
                </span>
              </p>
              {user?.plan === 'free' && (
                <p className="text-body-sm text-[#594046] mt-1">Nâng cấp để mở khóa toàn bộ tính năng</p>
              )}
              {user?.plan === 'premium' && (
                <p className="text-body-sm text-[#594046] mt-1">Hết hạn: 24/12/2026</p>
              )}
            </div>
            {user?.plan !== 'premium' && (
              <Link to="/dashboard/upgrade"
                className="px-4 py-2 rounded-full bg-[#ff4d8d] text-white font-label-md font-semibold hover:bg-[#b90a5a] transition-all shadow-[0_4px_16px_rgba(255,77,141,0.3)]">
                Nâng cấp
              </Link>
            )}
          </div>
        </div>

        {/* Security */}
        <div className="bg-white rounded-2xl p-6 shadow-[0_4px_20px_rgba(61,31,45,0.06)] mb-4">
          <h2 className="font-title-lg text-title-lg text-[#2e1220] mb-4">Bảo mật</h2>
          <Link to="/forgot-password"
            className="flex items-center justify-between p-3 rounded-xl hover:bg-[#fff5f9] transition-colors group">
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-[#594046] text-[20px]">lock</span>
              <span className="text-body-md text-[#2e1220]">Đổi mật khẩu</span>
            </div>
            <span className="material-symbols-outlined text-[#8d7076] group-hover:text-[#ff4d8d] transition-colors">chevron_right</span>
          </Link>
        </div>

        {/* Danger zone */}
        <div className="bg-white rounded-2xl p-6 shadow-[0_4px_20px_rgba(61,31,45,0.06)] border border-[#ffdad6]">
          <h2 className="font-title-lg text-title-lg text-[#ba1a1a] mb-4">Vùng nguy hiểm</h2>
          <button onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2.5 rounded-full border border-[#ba1a1a] text-[#ba1a1a] font-label-md hover:bg-[#ffdad6] transition-all">
            <span className="material-symbols-outlined text-[18px]">logout</span>
            Đăng xuất
          </button>
        </div>
      </div>
    </div>
  );
}
