import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { apiClient } from '@/services/api';
import { toast } from '@/utils/toast';
import { useAuth } from '@/context/AuthContext';
import { formatPrice } from '@/utils/formatPrice';
import type { Order } from '@/types';

const TERM_LABEL = { '3M': '3 tháng', '1Y': '1 năm' } as const;

function CopyRow({ label, value }: { label: string; value: string }) {
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      toast('Đã sao chép', 'success');
    } catch {
      toast('Không sao chép được', 'error');
    }
  };
  return (
    <div className="flex items-center justify-between gap-3 py-2 border-b border-outline-variant/20 last:border-0">
      <div className="min-w-0">
        <p className="font-label-sm text-on-surface-variant">{label}</p>
        <p className="font-mono text-on-surface break-all">{value}</p>
      </div>
      <button type="button" onClick={copy} className="shrink-0 w-9 h-9 rounded-full bg-surface-container hover:bg-surface-container-high flex items-center justify-center">
        <span className="material-symbols-outlined text-[18px]">content_copy</span>
      </button>
    </div>
  );
}

export default function OrderPayment() {
  const { orderId } = useParams();
  const { refreshUser } = useAuth();
  const [order, setOrder] = useState<Order | null>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    let cancelled = false;
    const load = () =>
      apiClient.get(`/orders/${orderId}`)
        .then((o: Order) => {
          if (cancelled) return;
          setOrder(prev => {
            if (prev?.status === 'PENDING' && o.status === 'PAID') refreshUser();
            return o;
          });
        })
        .catch(() => { if (!cancelled) setFailed(true); });

    load();
    const timer = setInterval(() => { load(); }, 8000);
    return () => { cancelled = true; clearInterval(timer); };
  }, [orderId, refreshUser]);

  const cancel = async () => {
    try {
      setOrder(await apiClient.post(`/orders/${orderId}/cancel`, {}));
    } catch (error: any) {
      toast(error?.message || 'Không hủy được đơn', 'error');
    }
  };

  if (failed) return <div className="min-h-screen flex items-center justify-center">Không tìm thấy đơn hàng.</div>;
  if (!order) return <div className="min-h-screen flex items-center justify-center">Đang tải...</div>;

  const title = order.type === 'UPGRADE'
    ? `Nâng cấp lên gói ${order.planCode}`
    : `Gia hạn website ${order.renewTerm ? TERM_LABEL[order.renewTerm] : ''}`;
  const configured = !!order.accountNumber;

  return (
    <main className="min-h-screen bg-surface flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-lg bg-surface-container-lowest rounded-3xl shadow-xl p-8 flex flex-col gap-5">
        <div>
          <p className="font-label-sm text-primary uppercase tracking-widest">Đơn hàng</p>
          <h1 className="font-headline-md text-on-surface mt-1">{title}</h1>
          <p className="font-headline-lg text-primary font-bold mt-2">{formatPrice(order.amount)}</p>
        </div>

        {order.status === 'PAID' && (
          <div className="rounded-xl bg-primary-container/15 p-4 text-on-surface">
            <p className="font-title-md flex items-center gap-2">
              <span className="material-symbols-outlined text-primary">check_circle</span> Thanh toán đã được xác nhận
            </p>
            <p className="font-body-sm text-on-surface-variant mt-1">
              {order.type === 'UPGRADE' ? 'Gói của bạn đã được nâng cấp.' : 'Website của bạn đã được gia hạn.'}
            </p>
          </div>
        )}

        {order.status === 'CANCELLED' && (
          <div className="rounded-xl bg-surface-container p-4 text-on-surface-variant">Đơn hàng đã được hủy.</div>
        )}

        {order.status === 'PENDING' && (
          <>
            <div>
              <h2 className="font-title-md text-on-surface mb-1">Chuyển khoản ngân hàng</h2>
              {configured ? (
                <div className="rounded-xl bg-surface-container px-4 py-1">
                  {order.bankName && <CopyRow label="Ngân hàng" value={order.bankName} />}
                  <CopyRow label="Số tài khoản" value={order.accountNumber!} />
                  {order.accountName && <CopyRow label="Chủ tài khoản" value={order.accountName} />}
                  <CopyRow label="Số tiền" value={String(order.amount)} />
                  <CopyRow label="Nội dung chuyển khoản (bắt buộc)" value={order.transferCode} />
                </div>
              ) : (
                <div className="rounded-xl bg-surface-container px-4 py-3">
                  <p className="font-body-sm text-on-surface-variant">
                    Thông tin tài khoản nhận tiền chưa được cấu hình. Vui lòng liên hệ quản trị viên và gửi kèm mã đơn:
                  </p>
                  <CopyRow label="Mã đơn" value={order.transferCode} />
                </div>
              )}
            </div>
            <p className="font-body-sm text-on-surface-variant">
              Sau khi chuyển khoản, quản trị viên sẽ xác nhận. Trang này tự cập nhật khi đơn được xác nhận.
            </p>
            <button type="button" onClick={cancel} className="self-start font-label-md text-on-surface-variant hover:text-error">
              Hủy đơn hàng
            </button>
          </>
        )}

        <Link to="/home" className="font-label-md text-primary hover:underline">Về trang quản lý</Link>
      </div>
    </main>
  );
}

