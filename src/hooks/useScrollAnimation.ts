import { useRef } from 'react';

interface UseScrollAnimationOptions {
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
}

// 🔒 SAFE NO-OP HOOK (always visible)
export function useScrollAnimation<T extends HTMLElement = HTMLDivElement>(
  _options: UseScrollAnimationOptions = {}
) {
  const ref = useRef<T>(null);
  return { ref, isInView: true };
}

// 🔒 SAFE GROUP HOOK (all visible)
export function useScrollAnimationGroup(count: number) {
  return {
    setRef: () => () => {},
    inViewStates: new Array(count).fill(true),
  };
}

