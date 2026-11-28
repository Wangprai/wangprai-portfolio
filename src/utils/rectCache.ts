/**
 * Cached `getBoundingClientRect()` for pointer-driven effects.
 *
 * Reading layout in pointer handlers, or interleaved with style writes inside
 * rAF loops, forces synchronous style + layout. An element's position only
 * changes when the page scrolls, the viewport or element resizes, or something
 * re-lays it out, so the rect is cached and refreshed:
 *  - after any scroll (capture, so inner scrollers count) or window resize,
 *  - when a ResizeObserver reports the element changed size,
 *  - after MAX_AGE_MS, which covers what no event reports (transform
 *    transitions such as hover lifts, entrance animations, font-load shifts).
 */
const MAX_AGE_MS = 250;

let epoch = 0;
let users = 0;
const bump = () => {
  epoch++;
};

let resizeObserver: ResizeObserver | null = null;
const invalidators = new Map<Element, Set<() => void>>();

const observeSize = (el: Element, invalidate: () => void) => {
  if (typeof ResizeObserver === "undefined") return;
  if (!resizeObserver) {
    resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) invalidators.get(entry.target)?.forEach((fn) => fn());
    });
  }
  let set = invalidators.get(el);
  if (!set) {
    set = new Set();
    invalidators.set(el, set);
    resizeObserver.observe(el);
  }
  set.add(invalidate);
};

const unobserveSize = (el: Element, invalidate: () => void) => {
  const set = invalidators.get(el);
  if (!set) return;
  set.delete(invalidate);
  if (set.size === 0) {
    invalidators.delete(el);
    resizeObserver?.unobserve(el);
  }
  if (invalidators.size === 0) {
    resizeObserver?.disconnect();
    resizeObserver = null;
  }
};

export type RectCache = {
  /** The element's viewport rect, re-measured only when it may have changed. */
  get: () => DOMRect;
  dispose: () => void;
};

export const createRectCache = (el: Element): RectCache => {
  if (users++ === 0) {
    window.addEventListener("scroll", bump, { passive: true, capture: true });
    window.addEventListener("resize", bump, { passive: true });
  }

  let rect: DOMRect | null = null;
  let seenEpoch = -1;
  let measuredAt = 0;
  const invalidate = () => {
    rect = null;
  };
  observeSize(el, invalidate);

  let disposed = false;
  return {
    get: () => {
      const now = performance.now();
      if (!rect || seenEpoch !== epoch || now - measuredAt > MAX_AGE_MS) {
        rect = el.getBoundingClientRect();
        seenEpoch = epoch;
        measuredAt = now;
      }
      return rect;
    },
    dispose: () => {
      if (disposed) return;
      disposed = true;
      unobserveSize(el, invalidate);
      if (--users === 0) {
        window.removeEventListener("scroll", bump, { capture: true });
        window.removeEventListener("resize", bump);
      }
    },
  };
};
