import { useEffect, useState } from 'react';
import { apiClient } from '@/services/api';
import { toast } from '@/utils/toast';
import { formatPrice } from '@/utils/formatPrice';
import type { Order } from '@/types';

export default function AdminOrders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [armed, setArmed] = useState<string | null>(null);

  const load = () =>
    apiClient.get('/admin/orders?status=PENDING')
      .then(setOrders)
      .catch(() => toast('Không tải được danh sách đơn', 'error'))
      .finally(() => setLoading(false));

  useEffect(() => { load(); }, []);

  const confirm = async (id: string) => {
    if (armed !== id) {
      setArmed(id);
      return;
    }
    try {
      await apiClient.post(`/admin/orders/${id}/confirm`, {});
      toast('Đã xác nhận thanh toán', 'success');
      setArmed(null);
      load();
    } catch (error: any) {
      toast(error?.message || 'Không xác nhận được', 'error');
    }
  };

  const describe = (o: Order) =>
    o.type === 'UPGRADE' ? `Nâng cấp ${o.planCode}` : `Gia hạn ${o.renewTerm === '3M' ? '3 tháng' : '1 năm'}`;

  return (
    <main className="w-full bg-[#faf7f8] min-h-screen px-4 md:px-6 py-6">
      <h1 className="font-headline-lg text-on-surface mb-1">Đơn hàng chờ xác nhận</h1>
      <p className="font-body-md text-on-surface-variant mb-space-lg">
        Đối chiếu nội dung chuyển khoản với mã đơn, rồi xác nhận. Xác nhận sẽ nâng gói hoặc gia hạn website ngay.
      </p>

      {loading && <p>Đang tải...</p>}
      {!loading && orders.length === 0 && <p className="text-on-surface-variant">Không có đơn nào đang chờ.</p>}

      {/* Mobile card view */}
      {orders.length > 0 && (
        <div className="flex flex-col gap-3 lg:hidden">
          {orders.map(o => (
            <div key={o.id} className="rounded-xl bg-surface-container-lowest shadow-sm p-4 space-y-2">
              <p className="font-title-md text-on-surface truncate">{o.userEmail}</p>
              <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-on-surface-variant">
                <span>{describe(o)}</span>
                <span className="font-semibold text-on-surface">{formatPrice(o.amount)}</span>
              </div>
              <p className="font-mono text-xs text-on-surface-variant">{o.transferCode}</p>
              <p className="text-xs text-on-surface-variant">{new Date(o.createdAt).toLocaleString('vi-VN')}</p>
              <button
                type="button"
                onClick={() => confirm(o.id)}
                className={`w-full mt-1 px-4 py-2 rounded-full font-label-md ${armed === o.id ? 'bg-error text-on-error' : 'bg-primary text-on-primary'}`}
              >
                {armed === o.id ? 'Bấm lần nữa để xác nhận' : 'Đã nhận tiền'}
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Desktop table view */}
      {orders.length > 0 && (
        <div className="hidden lg:block overflow-x-auto rounded-lg bg-surface-container-lowest shadow-sm">
          <table className="w-full text-left">
            <thead className="bg-surface-container-low font-label-md text-on-surface-variant">
              <tr>
                <th className="p-3">Người dùng</th>
                <th className="p-3">Nội dung</th>
                <th className="p-3">Số tiền</th>
                <th className="p-3">Mã chuyển khoản</th>
                <th className="p-3">Tạo lúc</th>
                <th className="p-3" />
              </tr>
            </thead>
            <tbody>
              {orders.map(o => (
                <tr key={o.id} className="border-t border-outline-variant/20">
                  <td className="p-3">{o.userEmail}</td>
                  <td className="p-3">{describe(o)}</td>
                  <td className="p-3">{formatPrice(o.amount)}</td>
                  <td className="p-3 font-mono">{o.transferCode}</td>
                  <td className="p-3">{new Date(o.createdAt).toLocaleString('vi-VN')}</td>
                  <td className="p-3 text-right">
                    <button
                      type="button"
                      onClick={() => confirm(o.id)}
                      className={`px-4 py-1.5 rounded-full font-label-md ${armed === o.id ? 'bg-error text-on-error' : 'bg-primary text-on-primary'}`}
                    >
                      {armed === o.id ? 'Bấm lần nữa để xác nhận' : 'Đã nhận tiền'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </main>
  );
}
