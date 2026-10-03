import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';

export default function AccountModal({ onClose }: { onClose: () => void }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [name, setName] = useState(user?.name || '');
  const [activeTab, setActiveTab] = useState<'general' | 'account'>('general');
  const [theme, setTheme] = useState<'system' | 'light' | 'dark'>('system');
  const [sessions, setSessions] = useState<any[]>([]);
  const [devices, setDevices] = useState<any[]>([]);
  const [loadingSessions, setLoadingSessions] = useState(true);
  const [saved, setSaved] = useState(false);

  // Lock background scroll when modal is open
  useEffect(() => {
    const originalStyle = window.getComputedStyle(document.body).overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = originalStyle;
    };
  }, []);

  useEffect(() => {
    if (activeTab === 'account') {
      import('@/services/api').then(({ apiClient }) => {
        Promise.all([
          apiClient.get('/auth/sessions').catch(() => []),
          apiClient.get('/users/devices').catch(() => [])
        ]).then(([sessionsData, devicesData]) => {
          setSessions(sessionsData || []);
          setDevices(devicesData || []);
          setLoadingSessions(false);
        });
      });
    }
  }, [activeTab]);

  const handleSaveProfile = () => {
    import('@/services/api').then(({ apiClient }) => {
      apiClient.put('/users/profile', { name }).then(() => {
        setSaved(true);
        setTimeout(() => setSaved(false), 2000);
      }).catch(console.error);
    });
  };

  const handleLogoutAll = () => {
    import('@/services/api').then(({ apiClient }) => {
      apiClient.delete('/auth/sessions').then(() => {
        logout(); onClose(); navigate('/');
      }).catch(console.error);
    });
  };

  const handleLogout = () => { logout(); onClose(); navigate('/'); };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-0 md:p-6 bg-black/50 backdrop-blur-sm" onClick={onClose}>
      <div 
        className="w-full md:w-[900px] h-full md:h-[85vh] bg-white text-[#2e1220] md:rounded-2xl shadow-2xl flex flex-col md:flex-row overflow-hidden relative"
        onClick={e => e.stopPropagation()}
        style={{ fontFamily: 'Inter, system-ui, sans-serif' }}
      >
        {/* Mobile Header */}
        <div className="md:hidden flex flex-col bg-[#faf7f8] border-b border-[#f0e4e8] shrink-0 sticky top-0 z-20">
          <div className="flex items-center justify-between px-4 py-3">
            <h2 className="text-lg font-bold text-[#2e1220]">Settings</h2>
            <button onClick={onClose} className="p-1.5 rounded-md transition-colors text-[#2e1220] hover:text-[#FF4D8D] hover:bg-[#FF4D8D]/10">
              <span className="material-symbols-outlined text-[20px]">close</span>
            </button>
          </div>
          <div className="flex gap-2 px-4 pb-1 overflow-x-auto scrollbar-hide">
            <button 
              onClick={() => setActiveTab('general')}
              className={`flex items-center gap-1.5 py-2 px-2 text-[13px] font-medium border-b-2 transition-colors whitespace-nowrap ${
                activeTab === 'general' ? 'border-[#FF4D8D] text-[#FF4D8D]' : 'border-transparent text-[#594046]'
              }`}
            >
              <span className="material-symbols-outlined text-[18px]">settings</span>
              <span>General</span>
            </button>
            <button 
              onClick={() => setActiveTab('account')}
              className={`flex items-center gap-1.5 py-2 px-2 text-[13px] font-medium border-b-2 transition-colors whitespace-nowrap ${
                activeTab === 'account' ? 'border-[#FF4D8D] text-[#FF4D8D]' : 'border-transparent text-[#594046]'
              }`}
            >
              <span className="material-symbols-outlined text-[18px]">person</span>
              <span>Account</span>
            </button>
          </div>
        </div>

        {/* Desktop Sidebar */}
        <div className="hidden md:flex w-64 bg-[#faf7f8] border-r border-[#f0e4e8] flex-col py-6 relative z-10">
          <div className="px-6 mb-4">
            <h2 className="text-xl font-bold text-[#2e1220] mb-6">Settings</h2>
          </div>
          <div className="flex flex-col gap-1 px-3">
            <button 
              onClick={() => setActiveTab('general')}
              className={`flex items-center gap-3 px-3 py-2 rounded-lg text-[14px] font-medium transition-colors ${
                activeTab === 'general' ? 'bg-[#FF4D8D]/10 text-[#FF4D8D]' : 'text-[#2e1220] hover:bg-[#f5eef1]'
              }`}
            >
              <span className="material-symbols-outlined text-[20px]">settings</span>
              <span>General</span>
            </button>
            <button 
              onClick={() => setActiveTab('account')}
              className={`flex items-center gap-3 px-3 py-2 rounded-lg text-[14px] font-medium transition-colors ${
                activeTab === 'account' ? 'bg-[#FF4D8D]/10 text-[#FF4D8D]' : 'text-[#2e1220] hover:bg-[#f5eef1]'
              }`}
            >
              <span className="material-symbols-outlined text-[20px]">person</span>
              <span>Account</span>
            </button>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 flex flex-col bg-white relative min-w-0">
          
          {/* Desktop Close Header (Sticky) */}
          <div className="hidden md:flex items-center justify-end px-4 py-4 sticky top-0 bg-white z-20">
            <button onClick={onClose} className="p-2 rounded-md transition-colors text-[#594046] hover:text-[#FF4D8D] hover:bg-[#FF4D8D]/10">
              <span className="material-symbols-outlined text-[22px]">close</span>
            </button>
          </div>

          {/* Scrollable Form Content */}
          <div className="flex-1 overflow-y-auto px-4 pb-4 md:px-10 md:pb-10">
          
          {activeTab === 'general' && (
            <>
              {/* Appearance Section */}
              <div className="mb-12">
                <h2 className="text-lg font-bold text-[#2e1220] mb-6">Appearance</h2>
                
                <div className="space-y-6">
                  <div className="flex items-center justify-between border-b border-[#f0e4e8] pb-6">
                    <p className="text-[14px] font-medium text-[#2e1220]">Theme</p>
                    <div className="flex items-center bg-[#faf7f8] p-1 rounded-lg border border-[#e1bec5]">
                      <button 
                        onClick={() => setTheme('system')}
                        className={`p-1.5 rounded-md flex items-center justify-center transition-colors ${theme === 'system' ? 'bg-white text-[#2e1220] shadow-sm' : 'text-[#594046] hover:text-[#2e1220]'}`}
                        title="System"
                      >
                        <span className="material-symbols-outlined text-[18px]">desktop_windows</span>
                      </button>
                      <button 
                        onClick={() => setTheme('light')}
                        className={`p-1.5 rounded-md flex items-center justify-center transition-colors ${theme === 'light' ? 'bg-white text-[#2e1220] shadow-sm' : 'text-[#594046] hover:text-[#2e1220]'}`}
                        title="Light"
                      >
                        <span className="material-symbols-outlined text-[18px]">light_mode</span>
                      </button>
                      <button 
                        onClick={() => setTheme('dark')}
                        className={`p-1.5 rounded-md flex items-center justify-center transition-colors ${theme === 'dark' ? 'bg-white text-[#2e1220] shadow-sm' : 'text-[#594046] hover:text-[#2e1220]'}`}
                        title="Dark"
                      >
                        <span className="material-symbols-outlined text-[18px]">dark_mode</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Language Section */}
              <div className="mb-12">
                <h2 className="text-lg font-bold text-[#2e1220] mb-6">Language</h2>
                
                <div className="space-y-6">
                  <div className="flex items-center justify-between border-b border-[#f0e4e8] pb-6">
                    <p className="text-[14px] font-medium text-[#2e1220]">Language</p>
                    <div className="relative w-48">
                      <select className="w-full bg-white border border-[#f0e4e8] rounded-md px-3 py-2 pr-8 text-[14px] text-[#2e1220] focus:outline-none focus:border-[#FF4D8D] transition-colors appearance-none cursor-pointer">
                        <option value="en">English</option>
                        <option value="vi">Tiếng Việt</option>
                      </select>
                      <span className="material-symbols-outlined absolute right-2 top-1/2 -translate-y-1/2 text-[18px] text-[#594046] pointer-events-none">
                        expand_more
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}

          {activeTab === 'account' && (
            <>
              {/* Profile Section */}
              <div className="mb-12">
                <h2 className="text-lg font-bold text-[#2e1220] mb-6">Profile</h2>
                
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-[14px] font-medium text-[#2e1220] mb-1">Profile photo</p>
                      <p className="text-[13px] text-[#594046]">PNG, JPEG, or WebP, up to 10MB.</p>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-[#FF4D8D] flex items-center justify-center text-[#2e1220] font-semibold cursor-pointer hover:bg-[#e63e7b] transition-colors shadow-[0_4px_16px_rgba(255,77,141,0.2)]">
                      {user?.name?.charAt(0).toUpperCase()}
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <p className="text-[14px] font-medium text-[#2e1220]">Full name</p>
                    <div className="w-64">
                      <input
                        type="text"
                        value={name}
                        onChange={e => setName(e.target.value)}
                        className="w-full bg-white border border-[#f0e4e8] rounded-md px-3 py-2 text-[14px] text-[#2e1220] focus:outline-none focus:border-[#FF4D8D] transition-colors"
                      />
                      <button onClick={handleSaveProfile} className="mt-2 px-3 py-1.5 bg-[#f5eef1] hover:bg-[#ffe0eb] text-[#b90a5a] text-[12px] font-medium rounded-md transition-colors">
                        {saved ? 'Đã lưu' : 'Lưu thay đổi'}
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Account Section */}
              <div className="mb-12">
                <h2 className="text-lg font-bold text-[#2e1220] mb-6">Account</h2>
                
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <p className="text-[14px] font-medium text-[#2e1220]">Log out of all devices</p>
                    <button onClick={handleLogout} className="px-4 py-1.5 bg-[#faf7f8] hover:bg-[#FF4D8D] hover:text-white hover:bg-[#FF4D8D] hover:border-[#FF4D8D] text-[#2e1220] text-[13px] font-medium rounded-md transition-colors border border-[#e1bec5]">
                      Log out
                    </button>
                  </div>

                  <div className="flex items-center justify-between">
                    <p className="text-[13px] text-[#594046]">To delete your account, please cancel your CoupleStory Pro subscription first.</p>
                    <button disabled className="px-4 py-1.5 bg-[#f5eef1] text-[#8d7076] text-[13px] font-medium rounded-md cursor-not-allowed border border-[#f0e4e8]">
                      Delete account
                    </button>
                  </div>
                </div>
              </div>

              {/* Login History Section */}
              <div className="mb-12">
                <h2 className="text-lg font-bold text-[#2e1220] mb-2">Login history</h2>
                <p className="text-[13px] text-[#594046] mb-6">
                  Danh sách các thiết bị và trình duyệt bạn đã từng sử dụng để đăng nhập vào tài khoản này.
                </p>
                
                <div className="w-full text-[13px]">
                  <div className="flex border-b border-[#f0e4e8] pb-2 text-[#594046] font-medium">
                    <div className="w-[40%]">Thiết bị</div>
                    <div className="w-[20%]">Nền tảng</div>
                    <div className="w-[20%]">Đăng nhập lần đầu</div>
                    <div className="w-[20%] text-right">Lần cuối hoạt động</div>
                  </div>
                  {devices.length === 0 ? (
                    <div className="py-4 text-[#8d7076]">Không có thiết bị cục bộ nào.</div>
                  ) : (
                    devices.map(d => (
                      <div key={d.id} className="flex py-3 border-b border-[#f0e4e8] text-[#2e1220]">
                        <div className="w-[40%] font-medium">{d.name}</div>
                        <div className="w-[20%]">{d.platform || 'Web'}</div>
                        <div className="w-[20%] text-[#594046]">{new Date(d.addedAt).toLocaleDateString('vi-VN')}</div>
                        <div className="w-[20%] text-right text-[#594046]">{d.lastSeenAt ? new Date(d.lastSeenAt).toLocaleDateString('vi-VN') : 'Mới đây'}</div>
                      </div>
                    ))
                  )}
                </div>
              </div>

              {/* Active Sessions Section */}
              <div className="mb-10">
                <h2 className="text-lg font-bold text-[#2e1220] mb-6">Active sessions</h2>
                
                <div className="w-full text-[13px]">
                  <div className="flex items-center justify-between py-4 border-b border-[#f0e4e8]">
                    <div>
                      <p className="text-[#2e1220] font-medium mb-1">Windows â€¢ Chrome</p>
                      <p className="text-[#594046]">Hanoi, Vietnam (Current session)</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-[#FF4D8D]"></span>
                      <span className="text-[#FF4D8D] font-medium">Active</span>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}

          </div>
        </div>
      </div>
    </div>
  );
}

