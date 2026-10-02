import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import type { ReactNode } from 'react';
import { apiClient } from '../services/api';

// ── Types ──────────────────────────────────────────────────
export interface User {
  id: string;
  name: string;
  email: string;
  roles: string[];
  plan?: string;
}

interface AuthContextValue {
  user: User | null;
  loading: boolean;
  isAuthenticated: boolean;
  isAdmin: boolean;
  login: (email: string, password: string) => Promise<{ ok: boolean; error?: string }>;
  googleLogin: (credential: string) => Promise<{ ok: boolean; error?: string }>;
  logout: () => Promise<void>;
  refreshUser: () => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<{ ok: boolean; error?: string }>;
}

// ── Context ────────────────────────────────────────────────
const AuthContext = createContext<AuthContextValue | null>(null);

function parseUser(res: any, fallbackEmail?: string): User {
  return {
    id: res.id,
    name: res.name || (fallbackEmail ?? res.email)?.split('@')[0] || '',
    email: res.email,
    roles: res.roles || ['USER'],
    plan: res.plan || 'FREE',
  };
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    try {
      const saved = localStorage.getItem('cs_user');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });
  const [loading, setLoading] = useState(true);

  const syncUser = useCallback((u: User | null) => {
    setUser(u);
    if (u) {
      localStorage.setItem('cs_user', JSON.stringify(u));
    } else {
      localStorage.removeItem('cs_user');
    }
  }, []);

  useEffect(() => {
    let cancelled = false;
    fetch('/api/auth/me', { credentials: 'include', headers: { 'Accept': 'application/json' } })
      .then(res => res.ok ? res.json() : null)
      .then(data => {
        if (!cancelled) syncUser(data ? parseUser(data) : null);
      })
      .catch(() => {
        if (!cancelled) syncUser(null);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => { cancelled = true; };
  }, [syncUser]);

  const refreshUser = useCallback(async () => {
    try {
      const res = await fetch('/api/auth/me', { credentials: 'include', headers: { 'Accept': 'application/json' } });
      if (res.ok) syncUser(parseUser(await res.json()));
    } catch {
      // keep the current user if the refresh fails
    }
  }, [syncUser]);

  const login = async (email: string, password: string) => {
    try {
      const res = await apiClient.post('/auth/login', { email, password });
      syncUser(parseUser(res, email));
      return { ok: true };
    } catch (err: any) {
      return { ok: false, error: err.message || 'Email hoặc mật khẩu không đúng.' };
    }
  };

  const googleLogin = async (credential: string) => {
    try {
      const res = await apiClient.post('/auth/google', { credential });
      syncUser(parseUser(res));
      return { ok: true };
    } catch (err: any) {
      return { ok: false, error: err.message || 'Đăng nhập Google thất bại.' };
    }
  };

  const register = async (name: string, email: string, password: string) => {
    try {
      await apiClient.post('/auth/register', { name, email, password });
      return await login(email, password);
    } catch (err: any) {
      return { ok: false, error: err.message || 'Lỗi đăng ký. Vui lòng thử lại.' };
    }
  };

  const logout = async () => {
    try {
      await apiClient.post('/auth/logout');
    } catch (e) {
      console.warn("Logout endpoint error", e);
    } finally {
      syncUser(null);
    }
  };

  const isAdmin = !!user?.roles?.includes('ADMIN');

  return (
    <AuthContext.Provider value={{ user, loading, isAuthenticated: !!user, isAdmin, login, googleLogin, logout, refreshUser, register }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside <AuthProvider>');
  return ctx;
}
