import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';

export default function AccountMobile() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [name, setName] = useState(user?.name || '');
  const [devices, setDevices] = useState<any[]>([]);
  const [loadingSessions, setLoadingSessions] = useState(true);

  useEffect(() => {
    import('@/services/api').then(({ apiClient }) => {
      apiClient.get('/users/devices').catch(() => []).then(devicesData => {
        setDevices(devicesData || []);
        setLoadingSessions(false);
      });
    });
  }, []);

  const handleLogoutAll = () => {
    import('@/services/api').then(({ apiClient }) => {
      apiClient.delete('/auth/sessions').then(() => {
        logout(); navigate('/');
      }).catch(console.error);
    });
  };

  return (
    <div className="w-full min-h-screen bg-[#fcf8fa] text-[#2e1220] flex flex-col pb-24" style={{ fontFamily: "Inter, system-ui, sans-serif" }}>
      {/* Header */}
      <div className="flex items-center justify-between px-4 pt-6 pb-4 shrink-0">
        <button onClick={() => navigate(-1)} className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/50 text-[#2e1220] transition-colors">
          <span className="material-symbols-outlined text-[24px]">arrow_back_ios_new</span>
        </button>
        <h1 className="text-[20px] font-bold text-[#2e1220]">Settings</h1>
        <div className="w-8 h-8 rounded-full bg-[#b90a5a] text-white flex items-center justify-center font-bold text-[15px] shadow-sm">
          {user?.name?.charAt(0).toUpperCase()}
        </div>
      </div>

      

      <div className="flex-1 px-4 overflow-y-auto">
        {/* Account Tab Content */}
        <div className="flex flex-col gap-6">
          
          {/* Profile Space Card */}
          <div className="bg-white rounded-3xl p-4 pt-6 shadow-[0_4px_20px_rgba(255,77,141,0.05)] flex flex-col items-center relative">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#fff0f4] text-[#b90a5a] px-3 py-1 rounded-full text-[10px] font-bold tracking-wider flex items-center gap-1 uppercase shadow-sm">
              <span className="material-symbols-outlined text-[12px]">favorite</span>
              OUR PROFILE SPACE
            </div>
            
            <div className="relative mt-6 mb-6">
              <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-[#ffe0eb] to-[#f4ebee] border-4 border-white shadow-lg overflow-hidden flex items-center justify-center text-[#ff4d8d] text-3xl font-bold">
                {user?.name?.charAt(0).toUpperCase()}
              </div>
              <button className="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-[#ff4d8d] text-white flex items-center justify-center shadow-md border-2 border-white">
                <span className="material-symbols-outlined text-[16px]">photo_camera</span>
              </button>
            </div>

            <div className="w-full bg-[#fff5f8] rounded-2xl p-4 flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#ffe0eb] flex items-center justify-center text-[#ff4d8d]">
                  <span className="material-symbols-outlined text-[20px]">favorite</span>
                </div>
                <div>
                  <p className="text-[11px] font-semibold text-[#8d7076] uppercase tracking-wider mb-0.5">Paired With</p>
                  <p className="text-[15px] font-bold text-[#2e1220] flex items-center gap-1">
                    Huyen Truong <span className="text-[16px]">💕</span>
                  </p>
                </div>
              </div>
              <div className="bg-[#ff4d8d]/10 text-[#b90a5a] px-3 py-1.5 rounded-full text-[12px] font-bold">
                520 Days
              </div>
            </div>

            <div className="w-full flex flex-col gap-4 mb-6">
              <div>
                <label className="block text-[12px] font-bold text-[#594046] mb-1.5 ml-1">Full Name</label>
                <div className="relative">
                  <input type="text" value={name} onChange={e => setName(e.target.value)} className="w-full bg-[#fff5f8] text-[#2e1220] px-3 py-2 rounded-xl text-[12px] font-medium focus:outline-none" />
                  <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-[#8d7076] text-[18px]">edit</span>
                </div>
              </div>
              
              <div>
                <label className="block text-[12px] font-bold text-[#594046] mb-1.5 ml-1">Connected Email</label>
                <div className="relative">
                  <input type="text" readOnly value={user?.email || 'truongdau@gmail.com'} className="w-full bg-[#fff5f8] text-[#594046] px-3 py-2 rounded-xl text-[12px] focus:outline-none" />
                  <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-[#b90a5a] text-[20px]">verified</span>
                </div>
              </div>
            </div>

            <button className="w-full bg-[#ff4d8d] text-white py-2 rounded-full font-bold text-[12px] flex items-center justify-center gap-2 shadow-[0_8px_20px_rgba(255,77,141,0.25)] active:scale-[0.98] transition-transform">
              <span className="material-symbols-outlined text-[20px]">favorite</span>
              Save Changes
            </button>
          </div>

          {/* Active Sessions */}
          <div>
            <div className="flex items-center justify-between mb-4 px-1">
              <h2 className="text-[20px] font-bold text-[#2e1220] flex items-center gap-2">
                Active Sessions
                <span className="material-symbols-outlined text-[#b90a5a] text-[20px]">devices</span>
              </h2>
              <span className="bg-[#f4ebee] text-[#b90a5a] px-3 py-1 rounded-full text-[11px] font-bold">
                {devices.length || 3} Devices
              </span>
            </div>

            <div className="flex flex-col gap-3">
              {loadingSessions ? (
                <div className="bg-white rounded-2xl p-4 text-center text-[#8d7076] text-sm">Đang tải...</div>
              ) : devices.length === 0 ? (
                <div className="bg-white rounded-2xl p-4 text-center text-[#8d7076] text-sm">Chưa có phiên hoạt động.</div>
              ) : (
                devices.map((d, idx) => (
                  <div key={d.id || idx} className="bg-white rounded-2xl p-4 flex items-center gap-4 shadow-[0_2px_10px_rgba(255,77,141,0.03)]">
                    <div className="w-12 h-12 shrink-0 rounded-xl bg-[#fff0f4] flex items-center justify-center text-[#b90a5a]">
                      <span className="material-symbols-outlined text-[24px]">
                        {d.name?.toLowerCase().includes('mac') || d.name?.toLowerCase().includes('windows') ? 'laptop_mac' : 'smartphone'}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[15px] font-bold text-[#2e1220] truncate">{d.name || 'Unknown Device'}</p>
                      <p className="text-[12px] text-[#594046] mt-0.5 truncate">
                        {d.ipAddress || 'Unknown IP'} • {new Date(d.lastSeenAt || d.addedAt).toLocaleDateString('vi-VN')}
                      </p>
                    </div>
                    {idx === 0 ? (
                      <div className="flex items-center gap-1.5 shrink-0">
                        <span className="w-2 h-2 rounded-full bg-[#b90a5a]"></span>
                        <span className="text-[12px] font-bold text-[#b90a5a]">Current</span>
                      </div>
                    ) : (
                      <button className="w-10 h-10 shrink-0 rounded-full bg-[#fff5f8] flex items-center justify-center text-[#594046] hover:bg-[#ffe0eb] transition-colors">
                        <span className="material-symbols-outlined text-[20px]">logout</span>
                      </button>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>

          <button onClick={handleLogoutAll} className="w-full bg-[#f4ebee] text-[#594046] py-2 rounded-full font-bold text-[12px] flex items-center justify-center gap-2 active:scale-[0.98] transition-transform">
            <span className="material-symbols-outlined text-[20px]">power_settings_new</span>
            Log out of all devices
          </button>

          <button className="w-full text-[#b90a5a] py-2 font-bold text-[12px] flex items-center justify-center gap-1.5">
            <span className="material-symbols-outlined text-[16px]">heart_broken</span>
            Delete Account & Shared Couple Memory Space
          </button>
          
          <p className="text-center text-[#ff4d8d] text-[11px] font-semibold mt-2 opacity-80 pb-6">
            CoupleStory • Crafted with love for two hearts 💕
          </p>
        </div>

        {/* General Tab */}
        <div className="block">
           <div className="bg-white rounded-3xl p-4 pt-6 shadow-[0_4px_20px_rgba(255,77,141,0.05)]">
             <h2 className="text-[18px] font-bold text-[#2e1220] mb-4">Appearance</h2>
             <div className="flex items-center justify-between border-b border-[#f0e4e8] pb-4 mb-4">
               <span className="text-[14px] font-medium text-[#2e1220]">Theme</span>
               <span className="text-[14px] text-[#594046]">System</span>
             </div>
             <div className="flex items-center justify-between">
               <span className="text-[14px] font-medium text-[#2e1220]">Language</span>
               <span className="text-[14px] text-[#594046]">English</span>
             </div>
           </div>
        </div>

      </div>
    </div>
  );
}
