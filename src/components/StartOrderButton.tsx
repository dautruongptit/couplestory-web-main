import { useState, type ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiClient } from '@/services/api';
import { toast } from '@/utils/toast';
import { useAuth } from '@/context/AuthContext';
import { canUsePackage } from '@/data/templatePackages';
import type { PackageCode } from '@/types';

export default function StartOrderButton({ planCode, className, children }: { planCode: PackageCode; className?: string; children: ReactNode }) {
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();
  const [busy, setBusy] = useState(false);

  const start = async () => {
    if (!isAuthenticated) {
      navigate('/register');
      return;
    }
    if (canUsePackage(user?.plan, planCode)) {
      toast('Bạn đang dùng gói này hoặc gói cao hơn', 'success');
      return;
    }
    setBusy(true);
    try {
      const order = await apiClient.post('/orders', { type: 'UPGRADE', planCode });
      navigate(`/orders/${order.id}`);
    } catch (error: any) {
      toast(error?.message || 'Không tạo được đơn hàng', 'error');
    } finally {
      setBusy(false);
    }
  };

  return (
    <button type="button" disabled={busy} onClick={start} className={className}>
      {children}
    </button>
  );
}
