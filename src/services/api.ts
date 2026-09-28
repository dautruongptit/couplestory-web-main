export const BASE_URL = '/api';

export const apiClient = {
  async get(url: string) {
    const res = await fetch(`${BASE_URL}${url}`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Accept': 'application/json',
      },
    });
    return handleResponse(res);
  },

  async post(url: string, data?: any) {
    const res = await fetch(`${BASE_URL}${url}`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: data ? JSON.stringify(data) : undefined,
    });
    return handleResponse(res);
  },

  async put(url: string, data?: any) {
    const res = await fetch(`${BASE_URL}${url}`, {
      method: 'PUT',
      credentials: 'include',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: data ? JSON.stringify(data) : undefined,
    });
    return handleResponse(res);
  },

  async delete(url: string) {
    const res = await fetch(`${BASE_URL}${url}`, {
      method: 'DELETE',
      credentials: 'include',
      headers: {
        'Accept': 'application/json',
      },
    });
    return handleResponse(res);
  },
  
  async postFormData(url: string, formData: FormData) {
    const res = await fetch(`${BASE_URL}${url}`, {
      method: 'POST',
      credentials: 'include',
      body: formData,
      // Do NOT set Content-Type header here, the browser sets it automatically with the boundary
    });
    return handleResponse(res);
  }
};

async function handleResponse(res: Response) {
  if (!res.ok) {
    let message = res.statusText;
    try {
      const errorData = await res.json();
      message = errorData.message || message;
    } catch {
      try {
        message = await res.text() || message;
      } catch {
        // keep default
      }
    }

    // 401 only ever means "no valid session" (see WebSecurityConfig's
    // AuthenticationEntryPoint) - never "forbidden" (that's 403, handled by the caller
    // like any other error). Clear stale client-side auth state and send the user back
    // to login instead of leaving them looking at a generic error with no way back.
    if (res.status === 401) {
      try {
        localStorage.removeItem('cs_user');
      } catch {
        // ignore storage access issues (e.g. private browsing)
      }
      if (typeof window !== 'undefined' && window.location.pathname !== '/login') {
        window.location.href = '/login';
      }
    }

    throw new Error(message);
  }
  
  // Return text if empty or not json, otherwise parse JSON
  const text = await res.text();
  if (!text) return null;
  try {
    return JSON.parse(text);
  } catch {
    return text; // It was just a plain string
  }
}
