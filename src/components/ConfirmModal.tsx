import { useEffect, useRef } from 'react';

interface ConfirmModalProps {
  open: boolean;
  title: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  variant?: 'danger' | 'default';
  onConfirm: () => void;
  onCancel: () => void;
}

export default function ConfirmModal({
  open, title, message, confirmLabel = 'Xác nhận', cancelLabel = 'Hủy',
  variant = 'default', onConfirm, onCancel,
}: ConfirmModalProps) {
  const cancelRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (open) cancelRef.current?.focus();
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onCancel(); };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [open, onCancel]);

  if (!open) return null;

  const isDanger = variant === 'danger';

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center" onClick={onCancel}>
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
      <div
        className="relative bg-surface rounded-2xl shadow-2xl border border-outline-variant/30 w-full max-w-md mx-4 p-6 animate-in fade-in zoom-in-95 duration-200"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex items-start gap-4 mb-5">
          <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${isDanger ? 'bg-error/10' : 'bg-primary/10'}`}>
            <span className={`material-symbols-outlined text-xl ${isDanger ? 'text-error' : 'text-primary'}`}>
              {isDanger ? 'warning' : 'help'}
            </span>
          </div>
          <div>
            <h3 className="font-title-md text-on-surface font-semibold">{title}</h3>
            <p className="font-body-md text-on-surface-variant mt-1">{message}</p>
          </div>
        </div>
        <div className="flex items-center justify-end gap-3">
          <button
            ref={cancelRef}
            onClick={onCancel}
            className="px-5 py-2 rounded-full font-label-md text-on-surface-variant bg-surface-container hover:bg-surface-container-high transition-colors"
          >
            {cancelLabel}
          </button>
          <button
            onClick={onConfirm}
            className={`px-5 py-2 rounded-full font-label-md font-semibold transition-colors shadow-sm ${
              isDanger
                ? 'bg-error text-on-error hover:bg-error/90'
                : 'bg-primary text-on-primary hover:bg-primary/90'
            }`}
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
