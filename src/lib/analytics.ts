/** Client-side GA4 event helper — no-op until gtag is loaded. */

export type AnalyticsParams = Record<string, string | number | boolean | undefined>;

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

function pageLang(): 'en' | 'ml' {
  const lang = document.documentElement.lang || '';
  return lang.toLowerCase().startsWith('ml') ? 'ml' : 'en';
}

export function trackEvent(eventName: string, params: AnalyticsParams = {}): void {
  if (typeof window === 'undefined' || typeof window.gtag !== 'function') return;

  const cleaned: Record<string, string | number | boolean> = {};
  for (const [key, value] of Object.entries(params)) {
    if (value !== undefined) cleaned[key] = value;
  }

  window.gtag('event', eventName, {
    ...cleaned,
    page_path: window.location.pathname,
    lang: pageLang(),
  });
}
