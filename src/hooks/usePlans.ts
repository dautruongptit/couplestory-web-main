import { useEffect, useState } from 'react';
import { apiClient } from '../services/api';
import type { Plan } from '../types';

let cachedPlans: Plan[] | null = null;

export function usePlans() {
  const [plans, setPlans] = useState<Plan[]>(cachedPlans ?? []);
  const [loading, setLoading] = useState(!cachedPlans);

  useEffect(() => {
    if (cachedPlans) return;
    apiClient.get('/plans').then((data: Plan[]) => {
      cachedPlans = data;
      setPlans(data);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, []);

  return { plans, loading };
}
