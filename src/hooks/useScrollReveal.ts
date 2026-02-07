import { useEffect, useRef } from 'react';

/**
 * Lightweight scroll reveal hook using IntersectionObserver.
 * On mobile (<768px), content is always visible immediately.
 * On desktop, applies a fade-in + translateY reveal when entering viewport.
 */
export function useScrollReveal<T extends HTMLElement = HTMLDivElement>() {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Mobile: always visible, no animation
    const isMobile = window.matchMedia('(max-width: 768px)').matches;
    if (isMobile) {
      el.style.opacity = '1';
      el.style.transform = 'none';
      return;
    }

    // Set initial hidden state
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.8s ease-out, transform 0.8s ease-out';

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.style.opacity = '1';
          el.style.transform = 'translateY(0)';
          observer.unobserve(el);
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(el);

    return () => observer.disconnect();
  }, []);

  return ref;
}
