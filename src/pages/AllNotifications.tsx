import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

function AllNotifications() {
  const [notifications, setNotifications] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const unread = notifications.filter(n => !n.read).length;
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    import('@/services/api').then(({ apiClient }) => {
      apiClient.get('/notifications')
        .then((data: any[]) => {
          setNotifications(data);
          setLoading(false);
        })
        .catch(err => {
          console.error('Failed to fetch notifications', err);
          setLoading(false);
        });
    });
  }, []);

  const markAllRead = () => {
    setNotifications(ns => ns.map(n => ({ ...n, read: true })));
    import('@/services/api').then(({ apiClient }) => {
      apiClient.put('/notifications/read-all', {}).then(() => {
        window.dispatchEvent(new Event('notifications_updated'));
      }).catch(console.error);
    });
  };

  const markRead = (id: string) => {
    setNotifications(ns => ns.map(n => n.id === id ? { ...n, read: true } : n));
    import('@/services/api').then(({ apiClient }) => {
      apiClient.put(`/notifications/${id}/read`, {}).then(() => {
        window.dispatchEvent(new Event('notifications_updated'));
      }).catch(console.error);
    });
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'SYSTEM': return 'security';
      case 'PAYMENT': return 'payments';
      case 'STORY': return 'auto_stories';
      default: return 'notifications';
    }
  };

  const formatTime = (isoString: string) => {
    if (!isoString) return 'Vừa xong';
    const date = new Date(isoString);
    return new Intl.DateTimeFormat('vi-VN', {
      hour: '2-digit', minute: '2-digit', day: '2-digit', month: '2-digit'
    }).format(date);
  };

  return (
    <div className="max-w-4xl mx-auto py-8" ref={ref}>
      <header className="flex items-center justify-between mb-4 px-4">
        <h2 className="text-2xl font-bold text-[#2e1220]">Tất cả thông báo</h2>
        <button
          onClick={markAllRead}
          disabled={unread === 0}
          className={`text-sm font-medium ${unread > 0 ? 'text-[#ff4d8d] hover:underline' : 'text-gray-400 cursor-not-allowed'}`}
        >
          Đánh dấu tất cả đã đọc
        </button>
      </header>

      {loading ? (
        <p className="text-center text-[#8d7076]">Đang tải...</p>
      ) : notifications.length === 0 ? (
        <p className="text-center text-[#8d7076]">Không có thông báo nào</p>
      ) : (
        <ul className="space-y-2">
          {notifications.map(n => (
            <li key={n.id} className={`flex items-start gap-3 p-4 rounded-lg ${!n.read ? 'bg-[#fff0f4]' : ''}`}>
              <div className={`w-9 h-9 rounded-full flex items-center justify-center ${!n.read ? 'bg-[#ff4d8d]' : 'bg-[#ffe8ef]'}`}>
                <span className={`material-symbols-outlined text-[18px] ${!n.read ? 'text-white' : 'text-[#ff4d8d]'}`} style={{ fontVariationSettings: "'FILL' 1" }}>{getIcon(n.type)}</span>
              </div>
              <div className="flex-1">
                <p className={`font-semibold ${!n.read ? 'text-[#b90a5a]' : 'text-[#2e1220]'}`}>{n.title}</p>
                <p className="text-sm text-[#594046] mt-0.5 line-clamp-2">{n.content}</p>
                <p className="text-xs text-[#8d7076] mt-1">{formatTime(n.createdAt)}</p>
              </div>
              {!n.read && (
                <button onClick={() => markRead(n.id)} className="text-xs text-[#ff4d8d] underline">Đánh dấu đã đọc</button>
              )}
            </li>
          ))}
        </ul>
      )}

      <div className="mt-6 text-center">
        <Link to="/home" className="text-[#ff4d8d] hover:underline">← Quay lại Dashboard</Link>
      </div>
    </div>
  );
}

export default AllNotifications;
