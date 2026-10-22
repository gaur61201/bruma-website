// Analytics events. Works with a cookieless script (Umami or Plausible) when one is loaded,
// and does nothing otherwise. Every event is also dispatched as a DOM event for testing.

type Props = Record<string, string | number | boolean>;

interface AnalyticsWindow extends Window {
  umami?: { track: (event: string, props?: Props) => void };
  plausible?: (event: string, options?: { props?: Props }) => void;
}

export type TrackEvent = 'whatsapp_click' | 'demo_submit' | 'calculator_used' | 'lang_switch' | 'printer_demo_used';

export function track(event: TrackEvent, props: Props = {}) {
  const w = window as AnalyticsWindow;
  try {
    if (typeof w.umami?.track === 'function') w.umami.track(event, props);
    else if (typeof w.plausible === 'function') w.plausible(event, { props });
  } catch {
    // Analytics must never break the page.
  }
  document.dispatchEvent(new CustomEvent('bruma:track', { detail: { event, props } }));
}

/** Clicks on any element with data-track="event" (and optional data-track-location) are tracked. */
export function initClickTracking() {
  document.addEventListener('click', (e) => {
    const el = (e.target as Element | null)?.closest<HTMLElement>('[data-track]');
    if (!el) return;
    const event = el.dataset.track as TrackEvent;
    const props: Props = { lang: document.documentElement.lang };
    if (el.dataset.trackLocation) props.location = el.dataset.trackLocation;
    track(event, props);
  });
}
