import { useState, useRef, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';

// ── Notification Panel ─────────────────────────────────────
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
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-[#ffe0eb]">
        <div className="flex items-center gap-2">
          <h3 className="font-title-md text-title-md text-[#2e1220]">Thông báo</h3>
          {unread > 0 && (
            <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-[#ff4d8d] text-white text-[11px] font-bold">{unread}</span>
          )}
        </div>
        <button
          onClick={markAllRead}
          disabled={unread === 0}
          className={`text-label-sm text-label-sm font-medium ${unread > 0 ? 'text-[#ff4d8d] hover:underline' : 'text-gray-400 cursor-not-allowed'}`}
        >
          Đánh dấu tất cả đã đọc
        </button>
      </div>

      {/* List */}
      <div className="max-h-[400px] overflow-y-auto">
        {loading ? (
          <div className="p-4 text-center text-sm text-[#8d7076]">Đang tải...</div>
        ) : notifications.length === 0 ? (
          <div className="p-4 text-center text-sm text-[#8d7076]">Không có thông báo nào</div>
        ) : (
          notifications.map(n => (
            <button
              key={n.id}
              onClick={() => markRead(n.id)}
              className={`w-full text-left px-4 py-3 flex gap-3 hover:bg-[#fff5f9] transition-colors border-b border-[#ffe0eb]/50 ${!n.read ? 'bg-[#fff0f4]' : ''}`}
            >
              <div className={`w-9 h-9 rounded-full flex-shrink-0 flex items-center justify-center ${!n.read ? 'bg-[#ff4d8d]' : 'bg-[#ffe8ef]'}`}>
                <span className={`material-symbols-outlined text-[18px] ${!n.read ? 'text-white' : 'text-[#ff4d8d]'}`}
                  style={{ fontVariationSettings: "'FILL' 1" }}>
                  {getIcon(n.type)}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <p className={`text-body-sm font-semibold text-[#2e1220] ${!n.read ? 'text-[#b90a5a]' : ''}`}>{n.title}</p>
                <p className="text-label-sm text-label-sm text-[#594046] mt-0.5 line-clamp-2">{n.content}</p>
                <p className="text-label-sm text-label-sm text-[#8d7076] mt-1">{formatTime(n.createdAt)}</p>
              </div>
              {!n.read && <div className="w-2 h-2 rounded-full bg-[#ff4d8d] mt-1.5 flex-shrink-0" />}
            </button>
          ))
        )}
      </div>

      <div className="px-4 py-3 text-center border-t border-[#ffe0eb]">
        <Link to="/notifications" onClick={onClose} className="text-label-md text-label-md text-[#ff4d8d] hover:underline font-medium">Xem tất cả thông báo</Link>
      </div>
    </div>
  );
}

// ── User Menu Dropdown ─────────────────────────────────────
function UserMenu({ onClose }: { onClose: () => void }) {
  const { user, logout, isAdmin } = useAuth();
  const navigate = useNavigate();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) onClose();
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [onClose]);

  const handleLogout = () => {
    logout();
    navigate('/');
    onClose();
  };

  const menuItems = [
    { icon: 'home', label: 'Home', to: '/home' },
    { icon: 'person', label: 'Tài khoản', to: '/account' },
    { icon: 'photo_album', label: 'Story của tôi', to: '/home' },
    { icon: 'workspace_premium', label: 'Nâng cấp gói', to: '/home/upgrade' },
    ...(isAdmin ? [{ icon: 'admin_panel_settings', label: 'Quản trị', to: '/admin/users' }] : []),
  ];

  return (
    <div ref={ref} className="absolute right-0 top-12 w-64 bg-white rounded-2xl shadow-[0_8px_32px_rgba(61,31,45,0.15)] border border-[#ffe0eb] z-50 overflow-hidden">
      {/* User info */}
      <div className="px-4 py-4 bg-gradient-to-br from-[#fff0f4] to-[#ffe8ef] border-b border-[#ffe0eb]">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-[#ff4d8d] flex items-center justify-center flex-shrink-0">
            <span className="text-white font-bold text-[15px]">
              {user?.name?.charAt(0).toUpperCase()}
            </span>
          </div>
          <div className="min-w-0">
            <p className="font-title-md text-title-md text-[#2e1220] truncate">{user?.name}</p>
            <p className="text-label-sm text-label-sm text-[#594046] truncate">{user?.email}</p>
          </div>
        </div>
        <div className="mt-2">
          <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-label-sm text-label-sm font-semibold ${
            user?.plan === 'premium' ? 'bg-[#ff4d8d] text-white' :
            user?.plan === 'basic' ? 'bg-[#fec8e4] text-[#7c516a]' :
            'bg-[#e1bec5] text-[#594046]'
          }`}>
            <span className="material-symbols-outlined text-[13px]" style={{ fontVariationSettings: "'FILL' 1" }}>
              {user?.plan === 'premium' ? 'workspace_premium' : 'person'}
            </span>
            {user?.plan === 'premium' ? 'Premium' : user?.plan === 'basic' ? 'Basic' : 'Free'}
          </span>
        </div>
      </div>

      {/* Menu items */}
      <div className="py-1">
        {menuItems.map(item => (
          <Link
            key={item.to + item.label}
            to={item.to}
            onClick={onClose}
            className="flex items-center gap-3 px-4 py-2.5 text-[#2e1220] hover:bg-[#fff5f9] hover:text-[#ff4d8d] transition-colors"
          >
            <span className="material-symbols-outlined text-[20px] text-[#594046]">{item.icon}</span>
            <span className="text-body-md">{item.label}</span>
          </Link>
        ))}
      </div>

      {/* Divider + Logout */}
      <div className="border-t border-[#ffe0eb] py-1">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-2.5 text-[#ba1a1a] hover:bg-[#ffdad6] transition-colors"
        >
          <span className="material-symbols-outlined text-[20px]">logout</span>
          <span className="text-body-md font-medium">Đăng xuất</span>
        </button>
      </div>
    </div>
  );
}

// ── Mobile Menu ────────────────────────────────────────────
function MobileMenu({
  isOpen, onClose, isAuthenticated
}: { isOpen: boolean; onClose: () => void; isAuthenticated: boolean }) {
  const { logout } = useAuth();
  const navigate = useNavigate();

  if (!isOpen) return null;

  const handleLogout = () => { logout(); navigate('/'); onClose(); };

  return (
    <div className="fixed inset-0 z-40" onClick={onClose}>
      <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" />
      <div
        className="absolute top-0 left-0 bottom-0 w-72 bg-white shadow-2xl flex flex-col"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-5 h-16 border-b border-[#ffe0eb]">
          <Link to={isAuthenticated ? '/home' : '/'} onClick={onClose} className="flex items-center gap-2 text-[#ff4d8d] font-headline-md text-headline-md">
            <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>favorite</span>
            CoupleStory
          </Link>
          <button onClick={onClose} className="p-2 rounded-full hover:bg-[#ffe8ef] transition-colors">
            <span className="material-symbols-outlined text-[20px] text-[#594046]">close</span>
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto py-4">
          {[
            { to: '/', label: 'Trang chủ', icon: 'home' },
            { to: '/templates', label: 'Kho template', icon: 'grid_view' },
            { to: '/pricing', label: 'Bảng giá', icon: 'payments' },
            { to: '/templates', label: 'Kho giao diện', icon: 'grid_view' },
          ].map(item => (
            <Link key={item.to} to={item.to} onClick={onClose}
              className="flex items-center gap-3 px-5 py-3 text-[#2e1220] hover:bg-[#fff5f9] hover:text-[#ff4d8d] transition-colors">
              <span className="material-symbols-outlined text-[20px] text-[#594046]">{item.icon}</span>
              <span className="font-body-md">{item.label}</span>
            </Link>
          ))}

          {isAuthenticated && (
            <>
              <div className="my-2 mx-5 border-t border-[#ffe0eb]" />
              {[
                { to: '/home', label: 'Home', icon: 'home' },
                { to: '/account', label: 'Tài khoản', icon: 'person' },
                { to: '/home/upgrade', label: 'Nâng cấp gói', icon: 'workspace_premium' },
              ].map(item => (
                <Link key={item.to} to={item.to} onClick={onClose}
                  className="flex items-center gap-3 px-5 py-3 text-[#2e1220] hover:bg-[#fff5f9] hover:text-[#ff4d8d] transition-colors">
                  <span className="material-symbols-outlined text-[20px] text-[#594046]">{item.icon}</span>
                  <span className="font-body-md">{item.label}</span>
                </Link>
              ))}
            </>
          )}
        </nav>

        <div className="border-t border-[#ffe0eb] p-4 space-y-2">
          {isAuthenticated ? (
            <button onClick={handleLogout}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-full border border-[#ba1a1a] text-[#ba1a1a] font-label-md hover:bg-[#ffdad6] transition-all">
              <span className="material-symbols-outlined text-[18px]">logout</span>Đăng xuất
            </button>
          ) : (
            <>
              <Link to="/register" onClick={onClose}
                className="w-full flex items-center justify-center py-3 rounded-full bg-[#ff4d8d] text-white font-label-md font-semibold shadow-[0_4px_16px_rgba(255,77,141,0.35)]">
                Bắt đầu miễn phí
              </Link>
              <Link to="/login" onClick={onClose}
                className="w-full flex items-center justify-center py-3 rounded-full border border-[#e1bec5] text-[#594046] font-label-md hover:bg-[#ffe8ef] transition-all">
                Đăng nhập
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

// ── Main Navbar ────────────────────────────────────────────
export default function Navbar() {
  const { user, isAuthenticated } = useAuth();
  const location = useLocation();
  const [showNotif, setShowNotif] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const [unreadCount, setUnreadCount] = useState(0);

  // Fetch unread notifications count
  useEffect(() => {
    const fetchUnread = () => {
      if (isAuthenticated) {
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
  }, [isAuthenticated]);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handler);
    return () => window.removeEventListener('scroll', handler);
  }, []);

  // Close menus on route change
  useEffect(() => {
    setShowNotif(false);
    setShowUserMenu(false);
    setShowMobileMenu(false);
  }, [location]);

  const navLinks = [
    { to: '/#features', label: 'Tính năng' },
    { to: '/templates', label: 'Kho giao diện' },
    { to: '/pricing', label: 'Bảng giá' },
    { to: '/s/eternal', label: 'Xem demo' },
  ];

  const isActive = (to: string) => location.pathname === to;

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-[#fff8f8]/95 backdrop-blur-xl shadow-[0_4px_20px_-2px_rgba(61,31,45,0.08)]' : 'bg-[#fff8f8]/85 backdrop-blur-xl'
      } border-b border-[#e1bec5]/50`}>
        <div className="h-16 max-w-7xl mx-auto px-4 md:px-8 flex items-center justify-between gap-4">

          {/* Logo */}
          <Link to={isAuthenticated ? '/home' : '/'} className="flex items-center gap-2 font-headline-md text-headline-md text-[#ff4d8d] tracking-tight shrink-0">
            <span className="material-symbols-outlined text-[22px]" style={{ fontVariationSettings: "'FILL' 1" }}>favorite</span>
            <span className="font-bold">CoupleStory</span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map(({ to, label }) => (
              <Link key={to} to={to}
                className={`px-4 py-1.5 rounded-full font-label-md text-label-md transition-all ${
                  isActive(to)
                    ? 'bg-[#ffe8ef] text-[#ff4d8d] font-semibold'
                    : 'text-[#594046] hover:text-[#ff4d8d] hover:bg-[#fff0f4]'
                }`}>
                {label}
              </Link>
            ))}
          </nav>

          {/* Right side */}
          <div className="flex items-center gap-2 shrink-0">

            {isAuthenticated ? (
              <>
                {/* Notification bell */}
                <div className="relative">
                  <button
                    onClick={() => { setShowNotif(v => !v); setShowUserMenu(false); }}
                    className="relative w-9 h-9 flex items-center justify-center rounded-full hover:bg-[#ffe8ef] text-[#594046] hover:text-[#ff4d8d] transition-colors"
                  >
                    <span className="material-symbols-outlined text-[20px]">notifications</span>
                    {unreadCount > 0 && (
                      <span className="absolute top-0 -right-1 w-4 h-4 bg-[#ff4d8d] text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                        {unreadCount > 99 ? '99+' : unreadCount}
                      </span>
                    )}
                  </button>
                  {showNotif && <NotificationPanel onClose={() => setShowNotif(false)} setUnreadCount={setUnreadCount} />}
                </div>

                {/* User avatar + menu */}
                <div className="relative">
                  <button
                    onClick={() => { setShowUserMenu(v => !v); setShowNotif(false); }}
                    className="flex items-center gap-2 pl-1 pr-3 py-1 rounded-full hover:bg-[#ffe8ef] transition-colors group"
                  >
                    <div className="w-7 h-7 rounded-full bg-[#ff4d8d] flex items-center justify-center">
                      <span className="text-white text-[13px] font-bold">
                        {user?.name?.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <span className="hidden sm:block text-label-md text-label-md text-[#2e1220] max-w-[100px] truncate">
                      {user?.name?.split(' ')[0]}
                    </span>
                    <span className="material-symbols-outlined text-[16px] text-[#594046]">expand_more</span>
                  </button>
                  {showUserMenu && <UserMenu onClose={() => setShowUserMenu(false)} />}
                </div>
              </>
            ) : (
              <>
                <Link to="/login"
                  className="hidden sm:inline-flex items-center px-4 py-2 rounded-full font-label-md text-label-md text-[#594046] hover:text-[#ff4d8d] hover:bg-[#ffe8ef] transition-all">
                  Đăng nhập
                </Link>
                <Link to="/register"
                  className="inline-flex items-center px-4 sm:px-5 py-2 rounded-full bg-gradient-to-r from-[#ff4d8d] to-[#e63e7b] text-white font-label-md text-label-md font-semibold shadow-[0_4px_16px_rgba(255,77,141,0.35)] hover:shadow-[0_6px_20px_rgba(255,77,141,0.45)] hover:scale-[1.02] active:scale-[0.98] transition-all">
                  <span className="hidden sm:inline">Bắt đầu miễn phí</span>
                  <span className="sm:hidden">Đăng ký</span>
                </Link>
              </>
            )}

            {/* Mobile hamburger */}
            <button
              onClick={() => setShowMobileMenu(true)}
              className="lg:hidden w-9 h-9 flex items-center justify-center rounded-full hover:bg-[#ffe8ef] text-[#594046] transition-colors"
            >
              <span className="material-symbols-outlined text-[22px]">menu</span>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <MobileMenu
        isOpen={showMobileMenu}
        onClose={() => setShowMobileMenu(false)}
        isAuthenticated={isAuthenticated}
      />
    </>
  );
}

