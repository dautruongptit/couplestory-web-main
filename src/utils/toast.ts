let container: HTMLDivElement | null = null;

function getContainer() {
  if (!container || !document.body.contains(container)) {
    container = document.createElement('div');
    container.style.cssText = 'position:fixed;top:1rem;right:1rem;z-index:9999;display:flex;flex-direction:column;gap:0.5rem;pointer-events:none;';
    document.body.appendChild(container);
  }
  return container;
}

type ToastType = 'success' | 'error' | 'info';

const ICONS: Record<ToastType, string> = {
  success: '✓',
  error: '✕',
  info: 'ℹ',
};

const COLORS: Record<ToastType, { bg: string; border: string; text: string }> = {
  success: { bg: '#f0fdf4', border: '#86efac', text: '#166534' },
  error:   { bg: '#fef2f2', border: '#fca5a5', text: '#991b1b' },
  info:    { bg: '#eff6ff', border: '#93c5fd', text: '#1e40af' },
};

export function toast(message: string, type: ToastType = 'info', duration = 3000) {
  const c = getContainer();
  const el = document.createElement('div');
  const colors = COLORS[type];

  el.style.cssText = `
    pointer-events:auto;padding:0.75rem 1rem;border-radius:0.75rem;
    background:${colors.bg};border:1px solid ${colors.border};color:${colors.text};
    font-size:0.875rem;line-height:1.4;max-width:22rem;
    box-shadow:0 4px 12px rgba(0,0,0,0.1);
    display:flex;align-items:flex-start;gap:0.5rem;
    transform:translateX(120%);transition:transform 0.3s ease,opacity 0.3s ease;opacity:0;
  `;

  const icon = document.createElement('span');
  icon.style.cssText = 'font-weight:700;flex-shrink:0';
  icon.textContent = ICONS[type];
  const text = document.createElement('span');
  text.textContent = message;
  el.appendChild(icon);
  el.appendChild(text);
  c.appendChild(el);

  requestAnimationFrame(() => {
    el.style.transform = 'translateX(0)';
    el.style.opacity = '1';
  });

  const remove = () => {
    el.style.transform = 'translateX(120%)';
    el.style.opacity = '0';
    setTimeout(() => el.remove(), 300);
  };

  el.addEventListener('click', remove);
  setTimeout(remove, duration);
}
