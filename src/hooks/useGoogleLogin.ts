import { useCallback, useEffect, useRef } from 'react';

const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID as string | undefined;

declare global {
  interface Window {
    google?: {
      accounts: {
        id: {
          initialize: (config: any) => void;
          prompt: (callback?: (notification: any) => void) => void;
          renderButton: (element: HTMLElement, config: any) => void;
          cancel: () => void;
        };
      };
    };
  }
}

interface UseGoogleLoginOptions {
  onSuccess: (credential: string) => void;
  onError?: (error: string) => void;
}

export function useGoogleLogin({ onSuccess, onError }: UseGoogleLoginOptions) {
  const initialized = useRef(false);
  const callbackRef = useRef(onSuccess);
  const errorRef = useRef(onError);
  callbackRef.current = onSuccess;
  errorRef.current = onError;

  useEffect(() => {
    if (!GOOGLE_CLIENT_ID || initialized.current) return;

    const init = () => {
      if (!window.google?.accounts?.id) return;
      window.google.accounts.id.initialize({
        client_id: GOOGLE_CLIENT_ID,
        callback: (response: any) => {
          if (response.credential) {
            callbackRef.current(response.credential);
          } else {
            errorRef.current?.('Google Sign-In failed');
          }
        },
      });
      initialized.current = true;
    };

    if (window.google?.accounts?.id) {
      init();
    } else {
      const interval = setInterval(() => {
        if (window.google?.accounts?.id) {
          clearInterval(interval);
          init();
        }
      }, 100);
      return () => clearInterval(interval);
    }
  }, []);

  const triggerLogin = useCallback(() => {
    if (!GOOGLE_CLIENT_ID) {
      errorRef.current?.('Google Client ID chưa được cấu hình');
      return;
    }
    if (!window.google?.accounts?.id) {
      errorRef.current?.('Google SDK chưa tải xong');
      return;
    }
    window.google.accounts.id.prompt();
  }, []);

  return { triggerLogin, isAvailable: !!GOOGLE_CLIENT_ID };
}
