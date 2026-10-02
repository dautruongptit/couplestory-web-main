import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiClient } from '@/services/api';
import { toast } from '@/utils/toast';
import { formatPrice } from '@/utils/formatPrice';

const TERMS = [
  { code: '3M', label: '3 tháng', price: 19000 },
  { code: '1Y', label: '1 năm', price: 29000 },
] as const;

export default function RenewModal({ storyId, onClose }: { storyId: string; onClose: () => void }) {
  const navigate = useNavigate();
  const [busy, setBusy] = useState(false);

  const renew = async (term: string) => {
    setBusy(true);
    try {
      const order = await apiClient.post('/orders', { type: 'RENEW', storyId, term });
      navigate(`/orders/${order.id}`);
    } catch (error: any) {
      toast(error?.message || 'Không tạo được đơn gia hạn', 'error');
      setBusy(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-surface rounded-3xl shadow-2xl w-full max-w-sm p-6 flex flex-col gap-3">
        <div className="flex items-start justify-between">
          <div>
            <h2 className="font-headline-md text-on-surface">Gia hạn website</h2>
            <p className="font-body-sm text-on-surface-variant mt-1">Chọn thời gian gia hạn thêm cho website này.</p>
          </div>
          <button onClick={onClose} className="w-9 h-9 rounded-full bg-surface-container flex items-center justify-center">
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>
        {TERMS.map(t => (
          <button
            key={t.code}
            type="button"
            disabled={busy}
            onClick={() => renew(t.code)}
            className="flex items-center justify-between px-4 py-3 rounded-2xl border border-outline-variant/40 hover:border-primary disabled:opacity-50"
          >
            <span className="font-title-md text-on-surface">{t.label}</span>
            <span className="font-title-md text-primary">{formatPrice(t.price)}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
