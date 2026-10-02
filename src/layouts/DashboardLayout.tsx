import { useState, useRef, useEffect } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { mockNotifications } from '@/data/notifications';

// --- Shared Components from Navbar ---

function NotificationPanel({ onClose }: { onClose: () => void }) {
  const [notifications, setNotifications] = useState(mockNotifications);
  const unread = notifications.filter(n => !n.read).length;
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) onClose();
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [onClose]);

  const markAllRead = () => setNotifications(ns => ns.map(n => ({ ...n, read: true })));
  const markRead = (id: string) => setNotifications(ns => ns.map(n => n.id === id ? { ...n, read: true } : n));

  return (
    <div ref={ref} className="absolute right-0 top-12 w-80 sm:w-96 bg-white rounded-2xl shadow-[0_8px_32px_rgba(61,31,45,0.15)] border border-[#ffe0eb] z-50 overflow-hidden">
      <div className="flex items-center justify-between px-4 py-3 border-b border-[#ffe0eb]">
        <div className="flex items-center gap-2">
          <h3 className="font-title-md text-title-md text-[#2e1220]">Thông báo</h3>
          {unread > 0 && (
            <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-[#ff4d8d] text-white text-[11px] font-bold">{unread}</span>
          )}
        </div>
        {unread > 0 && (
          <button onClick={markAllRead} className="text-label-sm text-label-sm text-[#ff4d8d] hover:underline font-medium">
            Đánh dấu tất cả đã đọc
          </button>
        )}
      </div>
      <div className="max-h-[400px] overflow-y-auto">
        {notifications.map(n => (
          <button key={n.id} onClick={() => markRead(n.id)} className={`w-full text-left px-4 py-3 flex gap-3 hover:bg-[#fff5f9] transition-colors border-b border-[#ffe0eb]/50 ${!n.read ? 'bg-[#fff0f4]' : ''}`}>
            <div className={`w-9 h-9 rounded-full flex-shrink-0 flex items-center justify-center ${!n.read ? 'bg-[#ff4d8d]' : 'bg-[#ffe8ef]'}`}>
              <span className={`material-symbols-outlined text-[18px] ${!n.read ? 'text-white' : 'text-[#ff4d8d]'}`} style={{ fontVariationSettings: "'FILL' 1" }}>{n.icon}</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className={`text-body-sm font-semibold text-[#2e1220] ${!n.read ? 'text-[#b90a5a]' : ''}`}>{n.title}</p>
              <p className="text-label-sm text-label-sm text-[#594046] mt-0.5 line-clamp-2">{n.message}</p>
              <p className="text-label-sm text-label-sm text-[#8d7076] mt-1">{n.time}</p>
            </div>
            {!n.read && <div className="w-2 h-2 rounded-full bg-[#ff4d8d] mt-1.5 flex-shrink-0" />}
          </button>
        ))}
      </div>
    </div>
  );
}

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

  const handleLogout = () => { logout(); navigate('/'); onClose(); };

  const menuItems = [
    { icon: 'dashboard', label: 'Dashboard', to: '/dashboard' },
    { icon: 'person', label: 'Tài khoản', to: '/account' },
    { icon: 'workspace_premium', label: 'Nâng cấp gói', to: '/dashboard/upgrade' },
    ...(isAdmin ? [{ icon: 'admin_panel_settings', label: 'Quản trị', to: '/admin/users' }] : []),
  ];

  return (
    <div ref={ref} className="absolute right-0 top-12 w-64 bg-white rounded-2xl shadow-[0_8px_32px_rgba(61,31,45,0.15)] border border-[#ffe0eb] z-50 overflow-hidden">
      <div className="px-4 py-4 bg-gradient-to-br from-[#fff0f4] to-[#ffe8ef] border-b border-[#ffe0eb]">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-[#ff4d8d] flex items-center justify-center flex-shrink-0">
            <span className="text-white font-bold text-[15px]">{user?.name?.charAt(0).toUpperCase()}</span>
          </div>
          <div className="min-w-0">
            <p className="font-title-md text-title-md text-[#2e1220] truncate">{user?.name}</p>
            <p className="text-label-sm text-label-sm text-[#594046] truncate">{user?.email}</p>
          </div>
        </div>
      </div>
      <div className="py-1">
        {menuItems.map(item => (
          <Link key={item.to + item.label} to={item.to} onClick={onClose} className="flex items-center gap-3 px-4 py-2.5 text-[#2e1220] hover:bg-[#fff5f9] hover:text-[#ff4d8d] transition-colors">
            <span className="material-symbols-outlined text-[20px] text-[#594046]">{item.icon}</span>
            <span className="text-body-md">{item.label}</span>
          </Link>
        ))}
      </div>
      <div className="border-t border-[#ffe0eb] py-1">
        <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-2.5 text-[#ba1a1a] hover:bg-[#ffdad6] transition-colors">
          <span className="material-symbols-outlined text-[20px]">logout</span>
          <span className="text-body-md font-medium">Đăng xuất</span>
        </button>
      </div>
    </div>
  );
}

// ── Dashboard Layout ───────────────────────────────────────

export function DashboardLayout() {
  const { user, isAdmin } = useAuth();
  const location = useLocation();
  const [showNotif, setShowNotif] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  const unreadCount = mockNotifications.filter(n => !n.read).length;

  const sidebarLinks = isAdmin ? [
    { to: '/admin/users', icon: 'group', label: 'Quản lý người dùng' },
    { to: '/admin/revenue', icon: 'payments', label: 'Doanh thu & Gói' },
    { to: '/dashboard', icon: 'home', label: 'Quay lại Dashboard' },
  ] : [
    { to: '/dashboard', icon: 'home', label: 'Dashboard' },
    { to: '/account', icon: 'person', label: 'Tài khoản' },
    { to: '/dashboard/upgrade', icon: 'workspace_premium', label: 'Nâng cấp' },
  ];

  return (
    <div className="min-h-screen bg-surface">
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 h-full w-[250px] bg-surface-container-low border-r border-outline-variant/50 z-50 flex flex-col justify-between p-space-md hidden md:flex">
        <div className="flex flex-col gap-space-lg">
          <Link to="/" className="px-space-xs py-space-sm flex items-center gap-space-xs hover:opacity-80 transition-opacity">
            <span className="font-headline-md text-primary-container tracking-tight">CoupleStory</span>
            <span className="material-symbols-outlined text-primary-container" style={{ fontVariationSettings: "'FILL' 1" }}>favorite</span>
          </Link>
          <nav className="flex flex-col gap-space-xs">
            {sidebarLinks.map(link => {
              const active = location.pathname.startsWith(link.to) && (link.to !== '/dashboard' || location.pathname === '/dashboard');
              return (
                <Link key={link.to} to={link.to}
                  className={`flex items-center gap-space-sm px-space-md py-space-sm rounded-r-full font-title-md transition-colors ${
                    active ? 'bg-surface-container text-primary-container border-l-[3px] border-primary-container' : 'text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface'
                  }`}>
                  <span className="material-symbols-outlined text-[20px]">{link.icon}</span>
                  <span>{link.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>
        <div className="flex flex-col gap-space-md">
          <Link to="/create" className="w-full flex items-center justify-center gap-space-xs py-space-sm px-space-md bg-primary-container text-on-primary rounded-full font-title-md hover:opacity-95 transition-opacity shadow-sm">
            <span className="material-symbols-outlined text-[18px]">add</span>
            <span>Tạo Story mới</span>
          </Link>
          <div className="flex items-center gap-space-sm p-space-sm rounded-DEFAULT bg-surface-container-lowest/60">
            <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center shrink-0">
              <span className="text-white text-[14px] font-bold">{user?.name?.charAt(0).toUpperCase()}</span>
            </div>
            <div className="flex flex-col min-w-0 flex-1">
              <span className="font-title-md text-on-surface truncate leading-tight text-[14px]">{user?.name}</span>
              <span className="font-body-sm text-on-surface-variant truncate leading-tight text-[11px]">
                {user?.plan === 'PREMIUM' ? 'PREMIUM' : user?.plan === 'COUPLE' ? 'COUPLE' : user?.plan === 'PLUS' ? 'PLUS' : 'FREE'}
              </span>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="md:pl-[250px] flex flex-col min-h-screen">
        {/* Header */}
        <header className="sticky top-0 h-16 bg-surface/80 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.04)] z-40 flex items-center justify-end px-space-lg gap-space-md border-b border-outline-variant/30">
          <div className="flex items-center gap-space-sm text-on-surface-variant">
            {/* Notifications */}
            <div className="relative">
              <button onClick={() => { setShowNotif(v => !v); setShowUserMenu(false); }} className="relative w-9 h-9 flex items-center justify-center rounded-full hover:bg-surface-container-high hover:text-primary transition-colors">
                <span className="material-symbols-outlined text-[20px]">notifications</span>
                {unreadCount > 0 && <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-[#ff4d8d] border-2 border-white rounded-full" />}
              </button>
              {showNotif && <NotificationPanel onClose={() => setShowNotif(false)} />}
            </div>
          </div>
          {/* User Menu */}
          <div className="relative">
            <button onClick={() => { setShowUserMenu(v => !v); setShowNotif(false); }} className="w-9 h-9 rounded-full bg-[#ff4d8d] flex items-center justify-center hover:scale-105 transition-transform shadow-sm">
              <span className="text-white text-[14px] font-bold">{user?.name?.charAt(0).toUpperCase()}</span>
            </button>
            {showUserMenu && <UserMenu onClose={() => setShowUserMenu(false)} />}
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 w-full bg-surface px-4 md:px-space-lg py-space-md">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
