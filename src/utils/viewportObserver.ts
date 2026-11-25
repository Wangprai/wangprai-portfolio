type VisibilityCallback = (visible: boolean) => void;

const callbacks = new Map<Element, VisibilityCallback>();
let sharedObserver: IntersectionObserver | null = null;

const getObserver = (): IntersectionObserver | null => {
  if (typeof IntersectionObserver === "undefined") return null;
  if (!sharedObserver) {
    sharedObserver = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          callbacks.get(entry.target)?.(entry.isIntersecting);
        }
      },
      { rootMargin: "80px 0px" }
    );
  }
  return sharedObserver;
};

/**
 * Subscribe an element to a single shared viewport IntersectionObserver.
 * Automatically disconnects the observer when no elements remain observed.
 */
export const observeViewport = (el: Element, onChange: VisibilityCallback): (() => void) => {
  const observer = getObserver();
  if (!observer) {
    onChange(true);
    return () => {};
  }

  callbacks.set(el, onChange);
  observer.observe(el);

  return () => {
    callbacks.delete(el);
    sharedObserver?.unobserve(el);
    if (callbacks.size === 0 && sharedObserver) {
      sharedObserver.disconnect();
      sharedObserver = null;
    }
  };
};

/**
 * Toggles `data-offscreen="true" | "false"` directly on the DOM node so CSS
 * infinite animations pause when scrolled out of view with zero React re-renders.
 */
export const observeOffscreenPause = (el: HTMLElement): (() => void) => {
  const unobserve = observeViewport(el, (visible) => {
    el.dataset.offscreen = visible ? "false" : "true";
  });

  return () => {
    unobserve();
    delete el.dataset.offscreen;
  };
};
