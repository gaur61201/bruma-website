// Fade-and-rise on scroll for elements with .reveal. The CSS only hides them once the
// html element has the .js class, and never under prefers-reduced-motion.

export function initReveal() {
  const els = document.querySelectorAll<HTMLElement>('.reveal');
  if (!els.length) return;
  if (!('IntersectionObserver' in window)) {
    els.forEach((el) => el.classList.add('is-visible'));
    return;
  }
  const io = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        entry.target.classList.add('is-visible');
        io.unobserve(entry.target);
      }
    },
    { rootMargin: '0px 0px -8% 0px', threshold: 0.05 },
  );
  els.forEach((el) => io.observe(el));
}
