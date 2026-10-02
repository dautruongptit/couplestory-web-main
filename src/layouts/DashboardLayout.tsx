import { useState, useRef, useEffect } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { mockNotifications } from '@/data/notifications';

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
          <h3 className="font-semibold text-[#2e1220]">Thông báo</h3>
          {unread > 0 && (
            <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-[#ff4d8d] text-white text-[11px] font-bold">{unread}</span>
          )}
        </div>
        {unread > 0 && (
          <button onClick={markAllRead} className="text-xs text-[#ff4d8d] hover:underline font-medium">Đánh dấu tất cả đã đọc</button>
        )}
      </div>
      <div className="max-h-[400px] overflow-y-auto">
        {notifications.map(n => (
          <button key={n.id} onClick={() => markRead(n.id)} className={`w-full text-left px-4 py-3 flex gap-3 hover:bg-[#fff5f9] transition-colors border-b border-[#ffe0eb]/50 ${!n.read ? 'bg-[#fff0f4]' : ''}`}>
            <div className={`w-9 h-9 rounded-full flex-shrink-0 flex items-center justify-center ${!n.read ? 'bg-[#ff4d8d]' : 'bg-[#ffe8ef]'}`}>
              <span className={`material-symbols-outlined text-[18px] ${!n.read ? 'text-white' : 'text-[#ff4d8d]'}`} style={{ fontVariationSettings: "'FILL' 1" }}>{n.icon}</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className={`text-sm font-semibold text-[#2e1220] ${!n.read ? 'text-[#b90a5a]' : ''}`}>{n.title}</p>
              <p className="text-xs text-[#594046] mt-0.5 line-clamp-2">{n.message}</p>
              <p className="text-xs text-[#8d7076] mt-1">{n.time}</p>
            </div>
            {!n.read && <div className="w-2 h-2 rounded-full bg-[#ff4d8d] mt-1.5 flex-shrink-0" />}
          </button>
        ))}
      </div>
    </div>
  );
}

const SIDEBAR_W = 'w-[240px]';
const SIDEBAR_ML = 'md:ml-[240px]';

export function DashboardLayout() {
  const { user, isAdmin, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [showNotif, setShowNotif] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const unreadCount = mockNotifications.filter(n => !n.read).length;

  useEffect(() => { setMobileOpen(false); }, [location]);

  const handleLogout = () => { logout(); navigate('/'); };

  const navItems = isAdmin ? [
    { to: '/admin/users', icon: 'group', label: 'Người dùng' },
    { to: '/admin/revenue', icon: 'payments', label: 'Doanh thu' },
    { to: '/admin/orders', icon: 'receipt_long', label: 'Đơn hàng' },
    { to: '/admin/music', icon: 'library_music', label: 'Thư viện nhạc' },
    { to: '/dashboard', icon: 'home', label: 'Dashboard' },
  ] : [
    { to: '/dashboard', icon: 'home', label: 'Home' },
    { to: '/dashboard/stories', icon: 'auto_stories', label: 'My Stories', badge: 'count' as const },
    { to: '/dashboard/love-cards', icon: 'favorite', label: 'Love Cards', badge: 'new' as const },
    { to: '/templates', icon: 'dashboard', label: 'Templates' },
    { to: '/dashboard/gallery', icon: 'photo_library', label: 'Photo Gallery' },
    { to: '/account', icon: 'person', label: 'Profile' },
  ];

  const isActive = (to: string) => {
    if (to === '/dashboard') return location.pathname === '/dashboard';
    return location.pathname.startsWith(to);
  };

  const planCode = user?.plan ?? 'FREE';
  const planLabel = planCode === 'PREMIUM' ? 'Premium' : planCode === 'COUPLE' ? 'Couple' : planCode === 'PLUS' ? 'Plus' : 'Free Plan';

  const sidebarContent = (
    <>
      {/* Logo */}
      <div className="px-5 pt-5 pb-2">
        <Link to="/" className="flex items-center gap-2">
          <span className="material-symbols-outlined text-[#ff4d8d] text-[24px]" style={{ fontVariationSettings: "'FILL' 1" }}>favorite</span>
          <span className="text-[#ff4d8d] font-bold text-lg tracking-tight">CoupleStory</span>
        </Link>
        <p className="text-[11px] text-[#8d7076] mt-0.5 pl-1">Where moments become love stories ✨</p>
      </div>

      {/* Create button */}
      <div className="px-4 mt-2 mb-4">
        <Link
          to="/create"
          className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-gradient-to-r from-[#ff4d8d] to-[#e63e7b] text-white font-semibold text-sm shadow-[0_4px_16px_rgba(255,77,141,0.35)] hover:shadow-[0_6px_20px_rgba(255,77,141,0.45)] hover:scale-[1.02] active:scale-[0.98] transition-all"
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
      <div className="px-3 pb-4 flex flex-col gap-2 mt-auto">
        {planCode !== 'PREMIUM' && (
          <Link to="/dashboard/upgrade" className="flex items-center gap-2.5 mx-1 px-3 py-2.5 rounded-xl bg-gradient-to-r from-[#fff0f4] to-[#ffe8ef] hover:from-[#ffe8ef] hover:to-[#ffd6e6] transition-all">
            <span className="material-symbols-outlined text-[#ff4d8d] text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>diamond</span>
            <span className="flex-1 text-sm font-semibold text-[#2e1220]">Nâng cấp</span>
            <span className="px-2 py-0.5 rounded-full bg-[#ff4d8d] text-white text-[10px] font-bold">-30%</span>
          </Link>
        )}

        <Link to="/account" className="flex items-center gap-2.5 mx-1 px-3 py-2 rounded-xl hover:bg-[#fff5f9] transition-colors">
          <span className="material-symbols-outlined text-[20px] text-[#8d7076]">settings</span>
          <span className="text-sm text-[#594046]">Cài đặt</span>
        </Link>

        <div className="flex items-center gap-2.5 mx-1 px-3 py-2 border-t border-[#ffe0eb]">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#ff4d8d] to-[#b90a5a] flex items-center justify-center shrink-0">
            <span className="text-white text-[13px] font-bold">{user?.name?.charAt(0).toUpperCase()}</span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-[#2e1220] truncate leading-tight">{user?.name}</p>
            <p className="text-[11px] text-[#8d7076] truncate leading-tight">{planLabel}</p>
          </div>
          <button onClick={handleLogout} className="p-1.5 rounded-lg hover:bg-[#ffdad6] text-[#8d7076] hover:text-[#ba1a1a] transition-colors" title="Đăng xuất">
            <span className="material-symbols-outlined text-[18px]">logout</span>
          </button>
        </div>
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
          {/* Mobile hamburger */}
          <button onClick={() => setMobileOpen(true)} className="md:hidden w-9 h-9 flex items-center justify-center rounded-xl hover:bg-[#fff5f9] text-[#594046]">
            <span className="material-symbols-outlined text-[22px]">menu</span>
          </button>

          {/* Together counter */}
          <div className="hidden md:flex items-center gap-1.5 text-sm text-[#8d7076]">
            <span className="material-symbols-outlined text-[#ff4d8d] text-[16px]" style={{ fontVariationSettings: "'FILL' 1" }}>favorite</span>
            <span>Yêu nhau mỗi ngày</span>
          </div>

          <div className="flex items-center gap-2">
            {/* Search */}
            <button className="w-9 h-9 flex items-center justify-center rounded-xl hover:bg-[#fff5f9] text-[#8d7076] transition-colors">
              <span className="material-symbols-outlined text-[20px]">search</span>
            </button>

            {/* Notifications */}
            <div className="relative">
              <button onClick={() => setShowNotif(v => !v)} className="relative w-9 h-9 flex items-center justify-center rounded-xl hover:bg-[#fff5f9] text-[#8d7076] transition-colors">
                <span className="material-symbols-outlined text-[20px]">notifications</span>
                {unreadCount > 0 && <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-[#ff4d8d] border-2 border-white rounded-full" />}
              </button>
              {showNotif && <NotificationPanel onClose={() => setShowNotif(false)} />}
            </div>

            {/* User avatar */}
            <Link to="/account" className="w-8 h-8 rounded-full bg-gradient-to-br from-[#ff4d8d] to-[#b90a5a] flex items-center justify-center hover:scale-105 transition-transform shadow-sm">
              <span className="text-white text-[13px] font-bold">{user?.name?.charAt(0).toUpperCase()}</span>
            </Link>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 w-full">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
