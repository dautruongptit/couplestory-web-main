import { useEffect, useState } from 'react';
import { apiClient } from '../services/api';
import type { Template } from '../types';

let cachedTemplates: Template[] | null = null;
let inFlight: Promise<Template[]> | null = null;

function loadTemplates(): Promise<Template[]> {
  if (!inFlight) {
    inFlight = apiClient.get('/templates').then((data: Template[]) => {
      cachedTemplates = data;
      return data;
    }).finally(() => { inFlight = null; });
  }
  return inFlight;
}

export function useTemplates() {
  const [templates, setTemplates] = useState<Template[]>(cachedTemplates ?? []);
  const [loading, setLoading] = useState(!cachedTemplates);

  useEffect(() => {
    if (cachedTemplates) return;
    loadTemplates().then(setTemplates).catch(() => {}).finally(() => setLoading(false));
  }, []);

  return { templates, loading };
}
