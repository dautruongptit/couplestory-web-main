import { useState, useRef, useEffect } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';

// ── User Popup Menu (Rose Theme) ─────────────────────────────────
function UserPopupMenu({ onClose, user, planLabel, onLogout, onOpenAccount }: {
  onClose: () => void;
  user: any;
  planLabel: string;
  onLogout: () => void;
  onOpenAccount: () => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) onClose();
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [onClose]);

  const menuItems = [
    { icon: 'workspace_premium', label: 'Nâng cấp gói', to: '/home/upgrade' },
    { icon: 'tune', label: 'Tùy chỉnh', action: 'account' },
    { icon: 'person', label: 'Hồ sơ', action: 'account' },
    { icon: 'settings', label: 'Cài đặt', action: 'account' },
  ];

  return (
    <div
      ref={ref}
      className="absolute left-2 right-2 bottom-[64px] z-[60] rounded-2xl overflow-hidden shadow-[0_8px_32px_rgba(46,18,32,0.1)] bg-white border border-[#f0e4e8]"
    >
      {/* Top: User info */}
      <div className="px-4 py-3 flex items-center gap-3 border-b border-[#f0e4e8]">
        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#ff4d8d] to-[#b90a5a] flex items-center justify-center shrink-0 ring-2 ring-[#ffe0eb]">
          <span className="text-white text-[14px] font-bold">{user?.name?.charAt(0).toUpperCase()}</span>
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-[13px] font-semibold text-[#2e1220] truncate">{user?.name}</p>
          <p className="text-[11px] text-[#594046] truncate">{planLabel}</p>
        </div>
        <button onClick={onClose} className="p-1 rounded-lg hover:bg-[#f5eef1] text-[#594046] transition-colors">
          <span className="material-symbols-outlined text-[18px]">close</span>
        </button>
      </div>

      {/* Menu items */}
      <div className="py-1.5">
        {menuItems.map(item => (
          <button
            key={item.label}
            onClick={() => { 
              if (item.action === 'account') {
                onOpenAccount();
              } else if (item.to) {
                navigate(item.to); 
              }
              onClose(); 
            }}
            className="w-full flex items-center gap-3 px-4 py-2.5 text-[13px] text-[#2e1220] hover:bg-[#f5eef1] transition-colors font-medium"
          >
            <span className="material-symbols-outlined text-[18px] text-[#8d7076]">{item.icon}</span>
            <span className="flex-1 text-left">{item.label}</span>
          </button>
        ))}
      </div>

      {/* Divider */}
      <div className="mx-4 border-t border-[#f0e4e8]" />

      {/* Help + Logout */}
      <div className="py-1.5">
        <button
          onClick={() => { onClose(); }}
          className="w-full flex items-center gap-3 px-4 py-2.5 text-[13px] text-[#2e1220] hover:bg-[#f5eef1] transition-colors font-medium"
        >
          <span className="material-symbols-outlined text-[18px] text-[#8d7076]">help_outline</span>
          <span className="flex-1 text-left">Trợ giúp</span>
          <span className="material-symbols-outlined text-[16px] text-[#8d7076]">chevron_right</span>
        </button>
        <button
          onClick={() => { onLogout(); onClose(); }}
          className="w-full flex items-center gap-3 px-4 py-2.5 text-[13px] text-[#2e1220] hover:bg-[#fff0f4] hover:text-[#b90a5a] transition-colors font-medium group"
        >
          <span className="material-symbols-outlined text-[18px] text-[#8d7076] group-hover:text-[#b90a5a]">logout</span>
          <span className="flex-1 text-left">Đăng xuất</span>
        </button>
      </div>
    </div>
  );
}

function NotificationPanel({ onClose, setUnreadCount }: { onClose: () => void; setUnreadCount: React.Dispatch<React.SetStateAction<number>> }) {
  const [notifications, setNotifications] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const unread = notifications.filter(n => !n.read).length;
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) onClose();
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [onClose]);

  useEffect(() => {
    import('@/services/api').then(({ apiClient }) => {
      apiClient.get('/notifications').then((data: any[]) => {
        setNotifications(data);
        setLoading(false);
      }).catch(err => {
        console.error('Failed to fetch notifications', err);
        setLoading(false);
      });
    });
  }, []);

  const markAllRead = () => {
    setNotifications(ns => ns.map(n => ({ ...n, read: true })));
    setUnreadCount(0);
    import('@/services/api').then(({ apiClient }) => {
      apiClient.put('/notifications/read-all', {}).then(() => {
        window.dispatchEvent(new Event('notifications_updated'));
      }).catch(console.error);
    });
  };

  const markRead = (id: string) => {
    setNotifications(ns => {
      const target = ns.find(n => n.id === id);
      if (target && !target.read) {
        setUnreadCount(prev => Math.max(0, prev - 1));
      }
      return ns.map(n => n.id === id ? { ...n, read: true } : n);
    });
    import('@/services/api').then(({ apiClient }) => {
      apiClient.put(`/notifications/${id}/read`, {}).then(() => {
        window.dispatchEvent(new Event('notifications_updated'));
      }).catch(console.error);
    });
  };

  const getIcon = (type: string) => {
    switch(type) {
      case 'SYSTEM': return 'security';
      case 'PAYMENT': return 'payments';
      case 'STORY': return 'auto_stories';
      default: return 'notifications';
    }
  };

  const formatTime = (isoString: string) => {
    if (!isoString) return 'Vừa xong';
    const date = new Date(isoString);
    return new Intl.DateTimeFormat('vi-VN', { hour: '2-digit', minute: '2-digit', day: '2-digit', month: '2-digit' }).format(date);
  };

  return (
    <div ref={ref} className="absolute right-0 top-12 w-80 sm:w-96 bg-white rounded-2xl shadow-[0_8px_32px_rgba(61,31,45,0.15)] border border-[#ffe0eb] z-50 overflow-hidden">
      <div className="flex items-center justify-between px-4 py-3 border-b border-[#ffe0eb]">
        <div className="flex items-center gap-2">
          <h3 className="font-semibold text-[#2e1220]">Thông báo</h3>
          {unread > 0 && (
            <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-[#ff4d8d] text-white text-[11px] font-bold">{unread}</span>
          )}
        </div>
        <button
          onClick={markAllRead}
          disabled={unread === 0}
          className={`text-xs font-medium ${unread > 0 ? 'text-[#ff4d8d] hover:underline' : 'text-gray-400 cursor-not-allowed'}`}
        >
          Đánh dấu tất cả đã đọc
        </button>
      </div>
      <div className="max-h-[400px] overflow-y-auto">
        {loading ? (
          <div className="p-4 text-center text-sm text-[#8d7076]">Đang tải...</div>
        ) : notifications.length === 0 ? (
          <div className="p-4 text-center text-sm text-[#8d7076]">Không có thông báo nào</div>
        ) : (
          notifications.map(n => (
            <button key={n.id} onClick={() => markRead(n.id)} className={`w-full text-left px-4 py-3 flex gap-3 hover:bg-[#fff5f9] transition-colors border-b border-[#ffe0eb]/50 ${!n.read ? 'bg-[#fff0f4]' : ''}`}>
              <div className={`w-9 h-9 rounded-full flex-shrink-0 flex items-center justify-center ${!n.read ? 'bg-[#ff4d8d]' : 'bg-[#ffe8ef]'}`}>
                <span className={`material-symbols-outlined text-[18px] ${!n.read ? 'text-white' : 'text-[#ff4d8d]'}`} style={{ fontVariationSettings: "'FILL' 1" }}>{getIcon(n.type)}</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className={`text-sm font-semibold text-[#2e1220] ${!n.read ? 'text-[#b90a5a]' : ''}`}>{n.title}</p>
                <p className="text-xs text-[#594046] mt-0.5 line-clamp-2">{n.content}</p>
                <p className="text-xs text-[#8d7076] mt-1">{formatTime(n.createdAt)}</p>
              </div>
              {!n.read && <div className="w-2 h-2 rounded-full bg-[#ff4d8d] mt-1.5 flex-shrink-0" />}
            </button>
          ))
        )}
      </div>
      <div className="px-4 py-3 text-center border-t border-[#ffe0eb]">
        <Link to="/notifications" onClick={onClose} className="text-xs text-[#ff4d8d] hover:underline font-medium">Xem tất cả thông báo</Link>
      </div>
    </div>
  );
}

import AccountModal from '@/components/AccountModal';

const SIDEBAR_W = 'w-[240px]';
const SIDEBAR_ML = 'md:ml-[240px]';

export function DashboardLayout() {
  const { user, isAdmin, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [showNotif, setShowNotif] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [showUserPopup, setShowUserPopup] = useState(false);
  const [showAccountModal, setShowAccountModal] = useState(false);

  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => { setMobileOpen(false); }, [location]);

  // Fetch unread notifications count
  useEffect(() => {
    const fetchUnread = () => {
      if (user) {
        import('@/services/api').then(({ apiClient }) => {
          apiClient.get('/notifications/unread-count')
            .then((count: any) => setUnreadCount(count))
            .catch(console.error);
        });
      }
    };
    fetchUnread();
    window.addEventListener('notifications_updated', fetchUnread);
    return () => window.removeEventListener('notifications_updated', fetchUnread);
  }, [user]);

  const handleLogout = () => { logout(); navigate('/'); };

  const navItems: Array<{ to: string, icon: string, label: string, badge?: "count" | "new" }> = isAdmin ? [
    { to: '/admin/users', icon: 'group', label: 'Người dùng' },
    { to: '/admin/revenue', icon: 'payments', label: 'Doanh thu' },
    { to: '/admin/orders', icon: 'receipt_long', label: 'Đơn hàng' },
    { to: '/admin/music', icon: 'library_music', label: 'Thư viện nhạc' },
    { to: '/home', icon: 'home', label: 'Home' },
    { to: '/', icon: 'storefront', label: 'Trang giới thiệu' },
  ] : [
    { to: '/home', icon: 'home', label: 'Home' },
    { to: '/home#stories', icon: 'auto_stories', label: 'My Stories', badge: 'count' as const },
    { to: '/home/templates', icon: 'palette', label: 'Templates' },
    { to: '/', icon: 'storefront', label: 'Trang giới thiệu' },
  ];

  const isActive = (to: string) => {
    if (to === '/home' || to === '/') return location.pathname === to;
    return location.pathname.startsWith(to);
  };

  const planCode = user?.plan ?? 'FREE';
  const planLabel = planCode === 'PREMIUM' ? 'Premium' : planCode === 'COUPLE' ? 'Couple' : planCode === 'PLUS' ? 'Plus' : 'Free Plan';

  const sidebarContent = (
    <>
      {/* Logo */}
      <div className="px-5 pt-5 pb-2">
        <Link to="/home" className="flex items-center gap-2 font-headline-md text-headline-md text-[#ff4d8d] tracking-tight shrink-0">
          <span className="material-symbols-outlined text-[22px]" style={{ fontVariationSettings: "'FILL' 1" }}>favorite</span>
          <span className="font-bold">CoupleStory</span>
        </Link>
        <p className="text-[11px] text-[#8d7076] mt-0.5 pl-1">Where moments become love stories ✨</p>
      </div>

      {/* Create button */}
      <div className="px-4 mt-2 mb-4">
        <Link
          to="/create"
          className="w-full flex items-center justify-center gap-1.5 py-2 rounded-full bg-gradient-to-r from-[#ff4d8d] to-[#a855f7] text-white font-semibold text-[12px] shadow-[0_4px_16px_rgba(168,85,247,0.35)] hover:shadow-[0_6px_20px_rgba(168,85,247,0.45)] hover:scale-[1.02] active:scale-[0.98] transition-all"
        >
          <span className="material-symbols-outlined text-[18px]">add</span>
          Create New
        </Link>
      </div>

      {/* Nav */}
      <nav className="flex-1 flex flex-col gap-0.5 px-3">
        {navItems.map(item => {
          const active = isActive(item.to);
          return (
            <Link
              key={item.to + item.label}
              to={item.to}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                active
                  ? 'bg-[#fff0f4] text-[#ff4d8d]'
                  : 'text-[#594046] hover:bg-[#fff5f9] hover:text-[#2e1220]'
              }`}
            >
              <span className={`material-symbols-outlined text-[20px] ${active ? 'text-[#ff4d8d]' : 'text-[#8d7076]'}`}
                style={active ? { fontVariationSettings: "'FILL' 1" } : undefined}>
                {item.icon}
              </span>
              <span className="flex-1">{item.label}</span>
              {item.badge === 'count' && (
                <span className="inline-flex items-center justify-center min-w-[20px] h-5 px-1.5 rounded-full bg-[#ff4d8d] text-white text-[11px] font-bold">1</span>
              )}
              {item.badge === 'new' && (
                <span className="inline-flex items-center justify-center px-2 h-5 rounded-full bg-[#f3e8ff] text-[#9333ea] text-[11px] font-semibold">New</span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Bottom */}
      <div className="px-3 pb-4 flex flex-col gap-2 mt-auto relative">

        {/* User popup menu */}
        {showUserPopup && (
          <UserPopupMenu
            onClose={() => setShowUserPopup(false)}
            user={user}
            planLabel={planLabel}
            onLogout={handleLogout}
            onOpenAccount={() => setShowAccountModal(true)}
          />
        )}

        {/* User button */}
          <button
            onClick={() => setShowUserPopup(v => !v)}
            className="flex items-center gap-2 mx-1 px-3 py-3 bg-[#fff0f4] border border-[#ffe4ec] hover:border-[#ffcce0] rounded-[16px] transition-colors w-full text-left"
          >
            <div className="w-8 h-8 rounded-full bg-[#ffcce0] text-[#ff4d8d] flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-[16px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
            </div>
            <div className="flex-1 min-w-0 flex flex-col justify-center">
              <p className="text-[13px] font-bold text-[#2e1220] truncate leading-tight">{user?.name || 'Trường Đậu'}</p>
              <p className="text-[11px] font-semibold text-[#ff4d8d] truncate leading-tight mt-0.5">{planLabel}</p>
            </div>
            <div className="px-2 py-1 rounded-full bg-[#ffe4ec] text-[#2e1220] text-[10px] font-bold">
              Upgrade
            </div>
          </button>
      </div>
    </>
  );

  return (
    <div className="min-h-screen bg-[#faf7f8]">
      {/* Desktop sidebar */}
      <aside className={`fixed left-0 top-0 h-full ${SIDEBAR_W} bg-white border-r border-[#f0e4e8] z-50 hidden md:flex flex-col`}>
        {sidebarContent}
      </aside>

      {/* Mobile sidebar overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 md:hidden" onClick={() => setMobileOpen(false)}>
          <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" />
          <aside className={`absolute left-0 top-0 h-full ${SIDEBAR_W} bg-white flex flex-col shadow-2xl`} onClick={e => e.stopPropagation()}>
            {sidebarContent}
          </aside>
        </div>
      )}

      {/* Main content */}
      <div className={`${SIDEBAR_ML} flex flex-col min-h-screen`}>
        {/* Top bar */}
        <header className="sticky top-0 h-14 bg-white/80 backdrop-blur-xl z-40 flex items-center justify-between px-4 md:px-6 border-b border-[#f0e4e8]/60">
          {/* Mobile: hamburger for admin, logo for users (users navigate with the bottom tab bar) */}
          {isAdmin ? (
            <button onClick={() => setMobileOpen(true)} className="md:hidden w-9 h-9 flex items-center justify-center rounded-xl hover:bg-[#fff5f9] text-[#594046]">
              <span className="material-symbols-outlined text-[22px]">menu</span>
            </button>
          ) : (
            <Link to="/home" className="md:hidden flex items-center gap-1.5 text-[#ff4d8d] font-bold text-lg tracking-tight">
              <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>favorite</span>
              CoupleStory
            </Link>
          )}

          {/* Together counter */}
          <div className="hidden md:flex items-center gap-2 text-[12px] font-medium text-[#594046]">
              <span>Studio</span>
              <span className="material-symbols-outlined text-[14px]">chevron_right</span>
              <span className="text-[#ff4d8d]">Workspace</span>
            </div>

            {/* Search Bar Center */}
            <div className="hidden md:flex flex-1 max-w-md mx-6">
              <div className="flex w-full items-center gap-2 px-4 py-2 rounded-full bg-[#fff5f8] border border-rose-50 focus-within:border-rose-200 transition-colors">
                <span className="material-symbols-outlined text-[16px] text-gray-400">search</span>
                <input type="text" placeholder="Search memories, cards..." className="bg-transparent outline-none flex-1 text-[13px] text-[#2e1220] placeholder:text-gray-400" />
              </div>
            </div>

          <div className="flex items-center gap-2">
            
              {/* Favorites */}
              <button className="w-9 h-9 flex items-center justify-center rounded-xl hover:bg-[#fff5f9] text-[#8d7076] transition-colors">
                <span className="material-symbols-outlined text-[20px]">favorite_border</span>
              </button>


            {/* Notifications */}
            <div className="relative">
              <button onClick={() => setShowNotif(v => !v)} className="relative w-9 h-9 flex items-center justify-center rounded-xl hover:bg-[#fff5f9] text-[#8d7076] transition-colors">
                <span className="material-symbols-outlined text-[20px]">notifications</span>
                {unreadCount > 0 && (
                  <span className="absolute top-0 -right-1 w-4 h-4 bg-[#ff4d8d] text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                    {unreadCount > 99 ? '99+' : unreadCount}
                  </span>
                )}
              </button>
              {showNotif && <NotificationPanel onClose={() => setShowNotif(false)} setUnreadCount={setUnreadCount} />}
            </div>

            {/* User avatar */}
            <button onClick={() => setShowAccountModal(true)} className="w-8 h-8 rounded-full bg-gradient-to-br from-[#ff4d8d] to-[#b90a5a] flex items-center justify-center hover:scale-105 transition-transform shadow-sm">
              <span className="text-white text-[13px] font-bold">{user?.name?.charAt(0).toUpperCase()}</span>
            </button>
          </div>
        </header>

        {/* Page content */}
        <main className={`flex-1 w-full ${isAdmin ? '' : 'pb-24 md:pb-0'}`}>
          <Outlet />
        </main>
      </div>

      {!isAdmin && (
        <nav className="md:hidden fixed bottom-0 inset-x-0 z-40 h-16 bg-white/95 backdrop-blur-xl border-t border-[#ffd6e6] flex items-end justify-around px-2 pb-[env(safe-area-inset-bottom)]">
          {([
            { label: 'Trang chủ', icon: 'home', to: '/home', active: location.pathname === '/home' && location.hash !== '#stories' },
            { label: 'Story', icon: 'auto_stories', to: '/home#stories', active: location.pathname === '/home' && location.hash === '#stories' },
          ]).map(tab => (
            <Link key={tab.label} to={tab.to} className={`flex-1 flex flex-col items-center gap-0.5 pb-2 pt-1 text-[11px] font-medium ${tab.active ? 'text-[#ff4d8d]' : 'text-[#8d7076]'}`}>
              <span className="material-symbols-outlined text-[24px]" style={tab.active ? { fontVariationSettings: "'FILL' 1" } : undefined}>{tab.icon}</span>
              {tab.label}
            </Link>
          ))}
          <Link to="/create" aria-label="Tạo mới" className="flex-1 flex justify-center">
            <span className="-mt-6 w-14 h-14 rounded-full bg-gradient-to-br from-[#ff4d8d] to-[#a855f7] text-white flex items-center justify-center shadow-[0_6px_18px_rgba(168,85,247,0.45)] border-4 border-white">
              <span className="material-symbols-outlined text-[28px]">add</span>
            </span>
          </Link>
          <Link to="/home/templates" className={`flex-1 flex flex-col items-center gap-0.5 pb-2 pt-1 text-[11px] font-medium ${location.pathname === '/home/templates' ? 'text-[#ff4d8d]' : 'text-[#8d7076]'}`}>
            <span className="material-symbols-outlined text-[24px]" style={location.pathname === '/home/templates' ? { fontVariationSettings: "'FILL' 1" } : undefined}>palette</span>
            Mẫu
          </Link>
          <Link to="/home/account" className={`flex-1 flex flex-col items-center gap-0.5 pb-2 pt-1 text-[11px] font-medium ${location.pathname === '/home/account' ? 'text-[#ff4d8d]' : 'text-[#8d7076]'}`}>
              <span className="material-symbols-outlined text-[24px]" style={location.pathname === '/home/account' ? { fontVariationSettings: "'FILL' 1" } : undefined}>person</span>
              Cá nhân
            </Link>
        </nav>
      )}

      {showAccountModal && <AccountModal onClose={() => setShowAccountModal(false)} />}
    </div>
  );
}

