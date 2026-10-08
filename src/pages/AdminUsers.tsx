import { useCallback, useEffect, useState } from 'react';
import { apiClient } from '@/services/api';
import { toast } from '@/utils/toast';
import { useAuth } from '@/context/AuthContext';

type AdminUser = {
  id: string;
  email: string;
  displayName: string | null;
  avatarUrl: string | null;
  planType: string;
  status: string;
  emailVerified: boolean;
  roles: string[];
  google: boolean;
  storyCount: number;
  successfulLoginCount: number;
  failedLoginCount: number;
  lastLoginAt: string | null;
  createdAt: string | null;
};

type PageResult = { items: AdminUser[]; total: number; page: number; size: number; totalPages: number };
type Stats = { total: number; active: number; locked: number; stories: number };

const PLANS = ['FREE', 'PLUS', 'COUPLE', 'PREMIUM'];
const PAGE_SIZE = 20;

const PLAN_STYLE: Record<string, string> = {
  FREE: 'bg-gray-100 text-gray-600',
  PLUS: 'bg-sky-50 text-sky-600',
  COUPLE: 'bg-[#ffe4ec] text-[#b90a5a]',
  PREMIUM: 'bg-gradient-to-r from-[#b5179e] to-[#7c3aed] text-white',
};

function formatDate(value: string | null) {
  if (!value) return '—';
  return new Date(value).toLocaleDateString('vi-VN');
}

function formatDateTime(value: string | null) {
  if (!value) return 'Chưa đăng nhập';
  return new Date(value).toLocaleString('vi-VN', { dateStyle: 'short', timeStyle: 'short' });
}

function Avatar({ user }: { user: AdminUser }) {
  const label = (user.displayName || user.email).charAt(0).toUpperCase();
  if (user.avatarUrl) {
    return <img src={user.avatarUrl} alt="" className="w-10 h-10 rounded-full object-cover shrink-0" />;
  }
  return (
    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#ff4d8d] to-[#b90a5a] text-white font-bold flex items-center justify-center shrink-0">
      {label}
    </div>
  );
}

export default function AdminUsers() {
  const { user: me } = useAuth();
  const [search, setSearch] = useState('');
  const [query, setQuery] = useState('');
  const [status, setStatus] = useState('');
  const [plan, setPlan] = useState('');
  const [page, setPage] = useState(0);
  const [data, setData] = useState<PageResult | null>(null);
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);
  const [busyId, setBusyId] = useState<string | null>(null);
  const [armed, setArmed] = useState<string | null>(null);

  useEffect(() => {
    const t = setTimeout(() => { setQuery(search.trim()); setPage(0); }, 350);
    return () => clearTimeout(t);
  }, [search]);

  const loadStats = useCallback(() => {
    apiClient.get('/admin/users/stats').then(setStats).catch(() => {});
  }, []);

  const load = useCallback(() => {
    setLoading(true);
    const params = new URLSearchParams({ q: query, status, plan, page: String(page), size: String(PAGE_SIZE) });
    apiClient.get(`/admin/users?${params}`)
      .then(setData)
      .catch(() => toast('Không tải được danh sách người dùng', 'error'))
      .finally(() => setLoading(false));
  }, [query, status, plan, page]);

  useEffect(() => { load(); }, [load]);
  useEffect(() => { loadStats(); }, [loadStats]);

  const replaceUser = (updated: AdminUser) =>
    setData(d => d && { ...d, items: d.items.map(u => (u.id === updated.id ? updated : u)) });

  const toggleLock = async (u: AdminUser) => {
    const next = u.status === 'ACTIVE' ? 'LOCKED' : 'ACTIVE';
    if (next === 'LOCKED' && armed !== u.id) {
      setArmed(u.id);
      return;
    }
    setBusyId(u.id);
    try {
      const updated = await apiClient.put(`/admin/users/${u.id}/status`, { status: next });
      replaceUser(updated);
      loadStats();
      toast(next === 'LOCKED' ? 'Đã khóa tài khoản' : 'Đã mở khóa tài khoản', 'success');
    } catch (error: any) {
      toast(error?.message || 'Không cập nhật được trạng thái', 'error');
    } finally {
      setBusyId(null);
      setArmed(null);
    }
  };

  const changePlan = async (u: AdminUser, planType: string) => {
    if (planType === u.planType) return;
    setBusyId(u.id);
    try {
      const updated = await apiClient.put(`/admin/users/${u.id}/plan-type`, { planType });
      replaceUser(updated);
      toast(`Đã đổi gói sang ${planType}`, 'success');
    } catch (error: any) {
      toast(error?.message || 'Không đổi được gói', 'error');
    } finally {
      setBusyId(null);
    }
  };

  const resetFilters = () => { setSearch(''); setStatus(''); setPlan(''); setPage(0); };

  const items = data?.items ?? [];
  const isSelf = (u: AdminUser) => u.id === me?.id;

  const statusBadge = (u: AdminUser) => (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold ${
      u.status === 'ACTIVE' ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-600'
    }`}>
      <span className={`w-1.5 h-1.5 rounded-full ${u.status === 'ACTIVE' ? 'bg-emerald-500' : 'bg-red-500'}`} />
      {u.status === 'ACTIVE' ? 'Hoạt động' : 'Đã khóa'}
    </span>
  );

  const planSelect = (u: AdminUser) => (
    <select
      value={u.planType}
      disabled={busyId === u.id}
      onChange={e => changePlan(u, e.target.value)}
      className={`appearance-none cursor-pointer px-3 py-1 rounded-full text-[11px] font-bold outline-none disabled:opacity-50 ${PLAN_STYLE[u.planType] ?? PLAN_STYLE.FREE}`}
    >
      {PLANS.map(p => <option key={p} value={p} className="text-gray-800 bg-white">{p}</option>)}
    </select>
  );

  const lockButton = (u: AdminUser, full = false) => {
    if (isSelf(u)) {
      return <span className="text-[11px] text-[#8d7076] italic">Tài khoản của bạn</span>;
    }
    const locking = u.status === 'ACTIVE';
    const confirming = armed === u.id;
    return (
      <button
        type="button"
        disabled={busyId === u.id}
        onClick={() => toggleLock(u)}
        onBlur={() => armed === u.id && setArmed(null)}
        className={`${full ? 'w-full' : ''} inline-flex items-center justify-center gap-1 px-3 py-1.5 rounded-full text-[12px] font-bold transition-colors disabled:opacity-50 ${
          confirming ? 'bg-red-600 text-white'
            : locking ? 'bg-[#fff0f4] text-[#b90a5a] hover:bg-[#ffe0eb]'
            : 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100'
        }`}
      >
        <span className="material-symbols-outlined text-[16px]">{locking ? 'lock' : 'lock_open'}</span>
        {confirming ? 'Bấm lần nữa để khóa' : locking ? 'Khóa' : 'Mở khóa'}
      </button>
    );
  };

  const statCards = [
    { label: 'Tổng người dùng', value: stats?.total, icon: 'group', tone: 'text-[#b90a5a] bg-[#ffe4ec]' },
    { label: 'Đang hoạt động', value: stats?.active, icon: 'verified_user', tone: 'text-emerald-600 bg-emerald-50' },
    { label: 'Đã khóa', value: stats?.locked, icon: 'block', tone: 'text-red-600 bg-red-50' },
    { label: 'Tổng câu chuyện', value: stats?.stories, icon: 'auto_stories', tone: 'text-[#7c3aed] bg-[#f3e8ff]' },
  ];

  return (
    <main className="w-full min-h-screen px-4 md:px-6 py-6">
      <div className="flex items-center gap-1.5 text-xs text-[#8d7076] mb-2">
        <span>Admin</span>
        <span className="material-symbols-outlined text-[14px]">chevron_right</span>
        <span className="text-[#ff4d8d] font-medium">Người dùng</span>
      </div>
      <h1 className="text-2xl md:text-[28px] font-bold text-[#2e1220] mb-1">Quản lý người dùng</h1>
      <p className="text-sm text-[#594046] mb-6">Tìm kiếm, đổi gói và khóa/mở khóa tài khoản. Khóa tài khoản sẽ đăng xuất người dùng khỏi mọi thiết bị.</p>

      <div className="grid grid-cols-2 xl:grid-cols-4 gap-3 md:gap-4 mb-6">
        {statCards.map(c => (
          <div key={c.label} className="bg-white rounded-[20px] border border-[#fff0f4] shadow-[0_4px_20px_rgba(255,77,141,0.06)] p-4 flex items-center gap-3">
            <div className={`w-11 h-11 rounded-2xl flex items-center justify-center shrink-0 ${c.tone}`}>
              <span className="material-symbols-outlined text-[22px]">{c.icon}</span>
            </div>
            <div className="min-w-0">
              <p className="text-[11px] font-semibold text-[#8d7076] uppercase tracking-wide truncate">{c.label}</p>
              <p className="text-xl font-bold text-[#2e1220]">{c.value === undefined ? '…' : c.value.toLocaleString('vi-VN')}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-[20px] border border-[#fff0f4] shadow-[0_4px_20px_rgba(255,77,141,0.06)] p-3 md:p-4 mb-4 flex flex-col md:flex-row gap-3">
        <div className="flex-1 flex items-center gap-2 px-4 py-2.5 rounded-full bg-[#fff5f8] border border-rose-50 focus-within:border-rose-200">
          <span className="material-symbols-outlined text-[18px] text-[#8d7076]">search</span>
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Tìm theo email hoặc tên..."
            className="flex-1 bg-transparent outline-none text-sm text-[#2e1220] placeholder:text-[#8d7076]"
          />
        </div>
        <div className="flex gap-2">
          <select value={status} onChange={e => { setStatus(e.target.value); setPage(0); }}
            className="flex-1 md:flex-none px-4 py-2.5 rounded-full bg-[#fff5f8] border border-rose-50 text-sm font-medium text-[#2e1220] outline-none cursor-pointer">
            <option value="">Mọi trạng thái</option>
            <option value="ACTIVE">Hoạt động</option>
            <option value="LOCKED">Đã khóa</option>
          </select>
          <select value={plan} onChange={e => { setPlan(e.target.value); setPage(0); }}
            className="flex-1 md:flex-none px-4 py-2.5 rounded-full bg-[#fff5f8] border border-rose-50 text-sm font-medium text-[#2e1220] outline-none cursor-pointer">
            <option value="">Mọi gói</option>
            {PLANS.map(p => <option key={p} value={p}>{p}</option>)}
          </select>
          {(search || status || plan) && (
            <button onClick={resetFilters} className="px-3 rounded-full text-[#8d7076] hover:text-[#b90a5a] hover:bg-[#fff0f4]" title="Đặt lại bộ lọc">
              <span className="material-symbols-outlined text-[20px]">restart_alt</span>
            </button>
          )}
        </div>
      </div>

      {loading && !data && <p className="text-sm text-[#8d7076] py-8 text-center">Đang tải...</p>}
      {!loading && items.length === 0 && (
        <div className="bg-white rounded-[20px] border border-[#fff0f4] py-12 text-center text-sm text-[#8d7076]">
          Không có người dùng phù hợp.
        </div>
      )}

      {/* Mobile cards */}
      {items.length > 0 && (
        <div className={`flex flex-col gap-3 lg:hidden ${loading ? 'opacity-60' : ''}`}>
          {items.map(u => (
            <div key={u.id} className="bg-white rounded-[20px] border border-[#fff0f4] shadow-sm p-4">
              <div className="flex items-center gap-3 mb-3">
                <Avatar user={u} />
                <div className="min-w-0 flex-1">
                  <p className="font-bold text-[#2e1220] truncate">{u.displayName || '—'}</p>
                  <p className="text-xs text-[#8d7076] truncate">{u.email}</p>
                </div>
                {statusBadge(u)}
              </div>
              <div className="flex flex-wrap items-center gap-2 text-[11px] text-[#594046] mb-3">
                {planSelect(u)}
                {u.roles.includes('ADMIN') && <span className="px-2 py-1 rounded-full bg-[#f3e8ff] text-[#7c3aed] font-bold">ADMIN</span>}
                <span>{u.storyCount} câu chuyện</span>
                <span>•</span>
                <span>Tham gia {formatDate(u.createdAt)}</span>
              </div>
              <p className="text-[11px] text-[#8d7076] mb-3">Đăng nhập gần nhất: {formatDateTime(u.lastLoginAt)}</p>
              {lockButton(u, true)}
            </div>
          ))}
        </div>
      )}

      {/* Desktop table */}
      {items.length > 0 && (
        <div className={`hidden lg:block bg-white rounded-[20px] border border-[#fff0f4] shadow-[0_4px_20px_rgba(255,77,141,0.06)] overflow-hidden ${loading ? 'opacity-60' : ''}`}>
          <table className="w-full text-left text-sm">
            <thead className="bg-[#fff5f8] text-[11px] font-bold uppercase tracking-wider text-[#8d7076]">
              <tr>
                <th className="py-3 pl-5 pr-3">Người dùng</th>
                <th className="py-3 px-3">Gói</th>
                <th className="py-3 px-3">Câu chuyện</th>
                <th className="py-3 px-3">Đăng nhập gần nhất</th>
                <th className="py-3 px-3">Tham gia</th>
                <th className="py-3 px-3">Trạng thái</th>
                <th className="py-3 pr-5 pl-3 text-right">Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {items.map(u => (
                <tr key={u.id} className="border-t border-[#fff0f4] hover:bg-[#fffafc]">
                  <td className="py-3 pl-5 pr-3">
                    <div className="flex items-center gap-3">
                      <Avatar user={u} />
                      <div className="min-w-0">
                        <div className="flex items-center gap-1.5">
                          <span className="font-semibold text-[#2e1220] truncate">{u.displayName || '—'}</span>
                          {u.roles.includes('ADMIN') && <span className="px-1.5 py-0.5 rounded bg-[#f3e8ff] text-[#7c3aed] text-[10px] font-bold">ADMIN</span>}
                        </div>
                        <div className="flex items-center gap-1 text-xs text-[#8d7076]">
                          <span className="truncate">{u.email}</span>
                          {u.google && <span className="text-[10px] font-semibold text-sky-600">• Google</span>}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-3">{planSelect(u)}</td>
                  <td className="py-3 px-3 text-[#2e1220] font-medium">{u.storyCount}</td>
                  <td className="py-3 px-3 text-[#594046]">
                    <div>{formatDateTime(u.lastLoginAt)}</div>
                    {u.failedLoginCount > 0 && <div className="text-[11px] text-red-500">{u.failedLoginCount} lần sai mật khẩu</div>}
                  </td>
                  <td className="py-3 px-3 text-[#594046]">{formatDate(u.createdAt)}</td>
                  <td className="py-3 px-3">{statusBadge(u)}</td>
                  <td className="py-3 pr-5 pl-3 text-right">{lockButton(u)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {data && data.totalPages > 1 && (
        <div className="flex items-center justify-between mt-4 text-sm text-[#594046]">
          <span>
            {data.page * data.size + 1}–{Math.min((data.page + 1) * data.size, data.total)} / {data.total.toLocaleString('vi-VN')}
          </span>
          <div className="flex gap-2">
            <button disabled={page === 0} onClick={() => setPage(p => p - 1)}
              className="w-9 h-9 rounded-full bg-white border border-[#fff0f4] flex items-center justify-center disabled:opacity-40 hover:bg-[#fff0f4]">
              <span className="material-symbols-outlined text-[18px]">chevron_left</span>
            </button>
            <span className="px-3 flex items-center font-semibold">{page + 1} / {data.totalPages}</span>
            <button disabled={page + 1 >= data.totalPages} onClick={() => setPage(p => p + 1)}
              className="w-9 h-9 rounded-full bg-white border border-[#fff0f4] flex items-center justify-center disabled:opacity-40 hover:bg-[#fff0f4]">
              <span className="material-symbols-outlined text-[18px]">chevron_right</span>
            </button>
          </div>
        </div>
      )}
    </main>
  );
}
