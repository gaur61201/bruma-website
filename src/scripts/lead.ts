// Lead tracking: ?src= (QR code or link source) and ?rep= (sales rep) are kept in
// sessionStorage for the whole visit and sent with the demo form.

const KEYS = { src: 'bruma_src', rep: 'bruma_rep' } as const;
const SAFE = /^[\w.-]{1,64}$/;

const storage = {
  get(key: string) {
    try {
      return sessionStorage.getItem(key) ?? '';
    } catch {
      return '';
    }
  },
  set(key: string, value: string) {
    try {
      sessionStorage.setItem(key, value);
    } catch {
      // Private mode or storage blocked: nothing to keep.
    }
  },
};

export function captureLeadParams() {
  const params = new URLSearchParams(window.location.search);
  for (const name of ['src', 'rep'] as const) {
    const value = params.get(name)?.trim();
    if (value && SAFE.test(value)) storage.set(KEYS[name], value);
  }
}

export const getLeadParams = () => ({ src: storage.get(KEYS.src), rep: storage.get(KEYS.rep) });

export { storage };
