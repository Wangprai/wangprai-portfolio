import React, { useEffect, useRef } from 'react';

export type SpotlightShape = 'circle' | 'beam';

export type SpotlightCardProps = React.HTMLAttributes<HTMLDivElement> & {
  spotlightColor?: string;
  intensity?: number;
  spotlightSize?: number;
  softness?: number;
  shape?: SpotlightShape;
  borderGlow?: number;
  proximity?: number;
  smoothing?: number;
  ambient?: boolean;
  flare?: boolean;
  grain?: number;
  theme?: 'dark' | 'light';
};

type Palette = { surface: string; border: string; shadow: string; light: string; fill: number; edge: number };

type Settings = {
  shape: SpotlightShape;
  fill: string;
  edge: string;
  size: number;
  intensity: number;
  borderGlow: number;
  proximity: number;
  smoothing: number;
  ambient: boolean;
  flare: boolean;
  grain: number;
};

const THEMES: Record<'dark' | 'light', Palette> = {
  dark: {
    surface: 'hsl(var(--card) / 0.78)',
    border: 'hsl(var(--border) / 0.85)',
    shadow: '0 20px 44px -24px rgba(5, 3, 18, 0.7)',
    light: '#a78bfa',
    fill: 1,
    edge: 1
  },
  light: {
    surface: 'hsl(var(--card) / 0.92)',
    border: 'hsl(var(--border) / 0.9)',
    shadow: '0 1px 2px rgba(45, 27, 105, 0.04), 0 16px 36px -22px rgba(76, 29, 149, 0.16)',
    light: '#7c3aed',
    fill: 0.32,
    edge: 0.75
  }
};

const SHAPES: SpotlightShape[] = ['circle', 'beam'];

const NOISE =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")";

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));

const falloffCache = new Map<string, string>();

const falloff = (color: string, softness: number) => {
  const soft = clamp(softness, 0, 1);
  const key = `${color}|${soft}`;
  const cached = falloffCache.get(key);
  if (cached) return cached;

  const core = (1 - soft) ** 1.5 * 0.85;
  const stop = (alpha: number, at: number) =>
    `color-mix(in srgb, ${color} ${(alpha * 100).toFixed(2)}%, transparent) ${(at * 100).toFixed(2)}%`;
  const list = [stop(1, 0)];
  for (let i = 0; i <= 14; i++) {
    const t = core + ((1 - core) * i) / 14;
    const g = (t - core) / (1 - core);
    const smooth = 1 - g * g * (3 - 2 * g);
    const glow = Math.exp(-4.6 * g * g) * (1 - g ** 6);
    list.push(stop(smooth + (glow - smooth) * soft, t));
  }
  const result = list.join(', ');
  if (falloffCache.size > 64) falloffCache.clear();
  falloffCache.set(key, result);
  return result;
};

type CardEntry = {
  root: HTMLDivElement;
  visible: boolean;
  isActive: () => boolean;
  onPointerMove: (x: number, y: number, target: EventTarget | null) => void;
  onPointerOut: () => void;
  onPointerUp: (pointerType: string) => void;
  onScroll: () => void;
  onVisibilityChange: () => void;
  onVisibleChange: (visible: boolean) => void;
};

const cardRegistry = new Set<CardEntry>();
const sharedPointer = { x: 0, y: 0, active: false, target: null as EventTarget | null };
let sharedNotifyRaf = 0;
let pendingMove = false;
let pendingScroll = false;
let sharedObserver: IntersectionObserver | null = null;
const entryByElement = new WeakMap<Element, CardEntry>();
let detachShared: (() => void) | null = null;

const flushSharedEvents = () => {
  sharedNotifyRaf = 0;
  const doMove = pendingMove;
  const doScroll = pendingScroll;
  pendingMove = false;
  pendingScroll = false;
  if (document.hidden) return;

  for (const entry of cardRegistry) {
    if (doMove) {
      if (
        entry.visible ||
        entry.isActive() ||
        (sharedPointer.target instanceof Node && entry.root.contains(sharedPointer.target))
      ) {
        entry.onPointerMove(sharedPointer.x, sharedPointer.y, sharedPointer.target);
      }
    } else if (doScroll) {
      if (entry.visible || entry.isActive()) {
        entry.onScroll();
      }
    }
  }
};

const scheduleSharedFlush = () => {
  if (!sharedNotifyRaf && !document.hidden) {
    sharedNotifyRaf = requestAnimationFrame(flushSharedEvents);
  }
};

const attachShared = () => {
  if (typeof IntersectionObserver !== 'undefined') {
    sharedObserver = new IntersectionObserver(
      entries => {
        for (const ioEntry of entries) {
          const card = entryByElement.get(ioEntry.target);
          if (!card) continue;
          card.visible = ioEntry.isIntersecting;
          card.onVisibleChange(ioEntry.isIntersecting);
        }
      },
      { rootMargin: '160px 0px' }
    );
  }

  const onMove = (event: PointerEvent) => {
    sharedPointer.x = event.clientX;
    sharedPointer.y = event.clientY;
    sharedPointer.active = true;
    sharedPointer.target = event.target;
    pendingMove = true;
    scheduleSharedFlush();
  };

  const onOut = (event: PointerEvent) => {
    if (event.relatedTarget) return;
    sharedPointer.active = false;
    sharedPointer.target = null;
    for (const entry of cardRegistry) {
      if (entry.visible || entry.isActive()) entry.onPointerOut();
    }
  };

  const onUp = (event: PointerEvent) => {
    if (event.pointerType !== 'mouse') sharedPointer.active = false;
    for (const entry of cardRegistry) {
      if (entry.visible || entry.isActive()) entry.onPointerUp(event.pointerType);
    }
  };

  const onScroll = () => {
    if (!sharedPointer.active) {
      let anyActive = false;
      for (const entry of cardRegistry) {
        if (entry.isActive()) {
          anyActive = true;
          break;
        }
      }
      if (!anyActive) return;
    }
    pendingScroll = true;
    scheduleSharedFlush();
  };

  const onVisibility = () => {
    for (const entry of cardRegistry) {
      entry.onVisibilityChange();
    }
  };

  window.addEventListener('pointermove', onMove, { passive: true });
  window.addEventListener('pointerup', onUp, { passive: true });
  window.addEventListener('pointercancel', onUp, { passive: true });
  window.addEventListener('scroll', onScroll, { capture: true, passive: true });
  document.addEventListener('pointerout', onOut, { passive: true });
  document.addEventListener('visibilitychange', onVisibility);

  return () => {
    if (sharedNotifyRaf) {
      cancelAnimationFrame(sharedNotifyRaf);
      sharedNotifyRaf = 0;
    }
    pendingMove = false;
    pendingScroll = false;
    sharedObserver?.disconnect();
    sharedObserver = null;
    window.removeEventListener('pointermove', onMove);
    window.removeEventListener('pointerup', onUp);
    window.removeEventListener('pointercancel', onUp);
    window.removeEventListener('scroll', onScroll, { capture: true });
    document.removeEventListener('pointerout', onOut);
    document.removeEventListener('visibilitychange', onVisibility);
  };
};

const CARD =
  'relative isolate overflow-hidden rounded-2xl [background-color:var(--spotlight-card-surface)] [box-shadow:var(--spotlight-card-shadow)]';

const SpotlightCard = ({
  children,
  className = '',
  style,
  spotlightColor,
  intensity = 0.15,
  spotlightSize = 240,
  softness = 0.7,
  shape = 'circle',
  borderGlow = 0.6,
  proximity = 80,
  smoothing = 0.3,
  ambient = false,
  flare = true,
  grain = 0,
  theme = 'dark',
  ...rest
}: SpotlightCardProps) => {
  const rootRef = useRef<HTMLDivElement>(null);
  const lightRef = useRef<HTMLSpanElement>(null);
  const grainRef = useRef<HTMLSpanElement>(null);
  const edgeRef = useRef<HTMLSpanElement>(null);
  const wakeRef = useRef<(() => void) | null>(null);
  const palette = THEMES[theme] ?? THEMES.dark;
  const color = spotlightColor ?? palette.light;
  const form = SHAPES.includes(shape) ? shape : 'circle';
  const fillStops = falloff(color, softness);
  const edgeStops = falloff(color, 1);
  const clampedSize = Math.max(20, spotlightSize);
  const clampedIntensity = clamp(intensity, 0, 1) * palette.fill;
  const clampedBorderGlow = clamp(borderGlow, 0, 1) * palette.edge;
  const clampedProximity = Math.max(0, proximity);
  const clampedSmoothing = clamp(smoothing, 0, 1);
  const clampedGrain = clamp(grain, 0, 1);

  const settingsRef = useRef<Settings>({
    shape: form,
    fill: fillStops,
    edge: edgeStops,
    size: clampedSize,
    intensity: clampedIntensity,
    borderGlow: clampedBorderGlow,
    proximity: clampedProximity,
    smoothing: clampedSmoothing,
    ambient,
    flare,
    grain: clampedGrain
  });

  useEffect(() => {
    settingsRef.current = {
      shape: form,
      fill: fillStops,
      edge: edgeStops,
      size: clampedSize,
      intensity: clampedIntensity,
      borderGlow: clampedBorderGlow,
      proximity: clampedProximity,
      smoothing: clampedSmoothing,
      ambient,
      flare,
      grain: clampedGrain
    };
    wakeRef.current?.();
  }, [
    form,
    fillStops,
    edgeStops,
    clampedSize,
    clampedIntensity,
    clampedBorderGlow,
    clampedProximity,
    clampedSmoothing,
    ambient,
    flare,
    clampedGrain
  ]);

  useEffect(() => {
    const root = rootRef.current;
    const light = lightRef.current;
    const edge = edgeRef.current;
    if (!root || !light || !edge) return undefined;

    const motionQuery = window.matchMedia?.('(prefers-reduced-motion: reduce)');
    let reduce = motionQuery?.matches ?? false;
    const state = {
      x: 0,
      y: 0,
      presence: 0,
      flare: 0,
      time: Math.random() * 60,
      pressed: false,
      visible: typeof IntersectionObserver === 'undefined'
    };
    const pointer = { x: sharedPointer.x, y: sharedPointer.y, active: sharedPointer.active };
    const drawn = {
      light: '',
      edge: '',
      noise: '',
      lightOpacity: '0',
      edgeOpacity: '0',
      noiseOpacity: '0'
    };
    let focus: Element | null = null;
    let raf = 0;
    let last = 0;
    let alive = true;

    const gradient = (s: Settings, size: number, x: number, y: number, stops: string) => {
      if (s.shape === 'beam') {
        const reach = Math.max(size * 0.6, y + size * 0.55);
        return `radial-gradient(${(size * 0.55).toFixed(1)}px ${reach.toFixed(1)}px at ${x.toFixed(1)}px 0px, ${stops})`;
      }
      return `radial-gradient(circle ${size.toFixed(1)}px at ${x.toFixed(1)}px ${y.toFixed(1)}px, ${stops})`;
    };

    const paint = (s: Settings) => {
      const boost = 1 + 0.7 * state.flare;
      const lightAlpha = Math.min(1, state.presence * s.intensity * boost);
      const edgeAlpha = Math.min(1, state.presence * s.borderGlow * boost);
      const lightOp = lightAlpha === 0 ? '0' : lightAlpha.toFixed(4);
      const edgeOp = edgeAlpha === 0 ? '0' : edgeAlpha.toFixed(4);

      if (lightAlpha > 0 || edgeAlpha > 0) {
        const size = s.size * (1 + 0.2 * state.flare);
        if (lightAlpha > 0) {
          const fill = gradient(s, size, state.x, state.y, s.fill);
          if (fill !== drawn.light) {
            drawn.light = fill;
            light.style.background = fill;
          }
        }
        if (edgeAlpha > 0) {
          const rim = gradient(s, size * 0.6, state.x, s.shape === 'beam' ? 0 : state.y, s.edge);
          if (rim !== drawn.edge) {
            drawn.edge = rim;
            edge.style.background = rim;
          }
        }
      }

      if (lightOp !== drawn.lightOpacity) {
        drawn.lightOpacity = lightOp;
        light.style.opacity = lightOp;
      }
      if (edgeOp !== drawn.edgeOpacity) {
        drawn.edgeOpacity = edgeOp;
        edge.style.opacity = edgeOp;
      }

      const noise = grainRef.current;
      if (noise) {
        const noiseAlpha = state.presence * s.grain;
        const noiseOp = noiseAlpha === 0 ? '0' : noiseAlpha.toFixed(4);
        if (noiseAlpha > 0) {
          const size = s.size * (1 + 0.2 * state.flare);
          const grainy = gradient(s, size, state.x, state.y, '#000 0%, transparent 100%');
          if (grainy !== drawn.noise) {
            drawn.noise = grainy;
            noise.style.webkitMaskImage = grainy;
            noise.style.maskImage = grainy;
          }
        }
        if (noiseOp !== drawn.noiseOpacity) {
          drawn.noiseOpacity = noiseOp;
          noise.style.opacity = noiseOp;
        }
      }
    };

    const tick = (now: number) => {
      raf = 0;
      if (!alive || document.hidden) return;
      const s = settingsRef.current;
      if (!state.visible && state.presence === 0 && state.flare === 0 && !focus) return;

      const dt = Math.min(0.05, Math.max(0.001, (now - last) / 1000));
      last = now;
      const rect = root.getBoundingClientRect();
      let tx = state.x;
      let ty = state.y;
      let target = 0;
      if (focus && root.contains(focus)) {
        const box = focus.getBoundingClientRect();
        tx = box.left + box.width / 2 - rect.left;
        ty = box.top + box.height / 2 - rect.top;
        target = 1;
      } else if (pointer.active && state.visible) {
        tx = pointer.x - rect.left;
        ty = pointer.y - rect.top;
        const gap = Math.hypot(Math.max(0, -tx, tx - rect.width), Math.max(0, -ty, ty - rect.height));
        if (gap === 0) target = 1;
        else if (s.proximity > 0) target = Math.max(0, 1 - gap / s.proximity) ** 2;
      }
      if (target < 0.6 && s.ambient && state.visible) {
        if (!reduce) state.time += dt;
        const drift = 0.6 - target;
        tx += (rect.width * (0.5 + 0.34 * Math.sin(state.time * 0.43)) - tx) * (drift / 0.6);
        ty += (rect.height * (0.5 + 0.3 * Math.sin(state.time * 0.61 + 1.3)) - ty) * (drift / 0.6);
        target = 0.6;
      }
      if (state.presence < 0.02 && target > 0 && !s.ambient) {
        state.x = tx;
        state.y = ty;
      }
      const follow = reduce || s.smoothing === 0 ? 1 : 1 - Math.exp(-dt / (0.015 + s.smoothing * 0.22));
      state.x += (tx - state.x) * follow;
      state.y += (ty - state.y) * follow;
      const fade = reduce ? 1 : 1 - Math.exp(-dt / (target > state.presence ? 0.1 : 0.32));
      state.presence += (target - state.presence) * fade;
      if (Math.abs(target - state.presence) < 0.002) state.presence = target;
      const press = state.pressed && s.flare && !reduce ? 1 : 0;
      state.flare += (press - state.flare) * (1 - Math.exp(-dt / (press ? 0.05 : 0.28)));
      if (Math.abs(press - state.flare) < 0.002) state.flare = press;
      paint(s);
      const moving =
        state.presence > 0 && (Math.abs(tx - state.x) > 0.1 || Math.abs(ty - state.y) > 0.1);
      const settled = !moving && state.presence === target && state.flare === press;
      if (!settled || (s.ambient && state.visible && !reduce)) raf = requestAnimationFrame(tick);
    };

    const wake = () => {
      if (raf || !alive || document.hidden) return;
      if (!state.visible && state.presence === 0 && state.flare === 0 && !focus) return;
      last = performance.now();
      raf = requestAnimationFrame(tick);
    };
    wakeRef.current = wake;

    const onDown = (event: PointerEvent) => {
      pointer.x = event.clientX;
      pointer.y = event.clientY;
      pointer.active = true;
      sharedPointer.x = event.clientX;
      sharedPointer.y = event.clientY;
      sharedPointer.active = true;
      state.pressed = true;
      wake();
    };
    const onFocusIn = (event: FocusEvent) => {
      if (!(event.target instanceof Element) || !event.target.matches(':focus-visible')) return;
      focus = event.target;
      wake();
    };
    const onFocusOut = (event: FocusEvent) => {
      if (root.contains(event.relatedTarget as Node | null)) return;
      focus = null;
      wake();
    };
    const onMotionChange = (event: MediaQueryListEvent) => {
      reduce = event.matches;
      wake();
    };

    const entry: CardEntry = {
      root,
      visible: state.visible,
      isActive: () => state.presence > 0 || state.flare > 0 || focus !== null || settingsRef.current.ambient,
      onPointerMove: (x, y, target) => {
        pointer.x = x;
        pointer.y = y;
        pointer.active = true;
        if (state.presence > 0 || settingsRef.current.proximity > 0 || root.contains(target as Node | null)) {
          wake();
        }
      },
      onPointerOut: () => {
        pointer.active = false;
        wake();
      },
      onPointerUp: pointerType => {
        if (pointerType !== 'mouse') pointer.active = false;
        if (!state.pressed && pointerType === 'mouse') return;
        state.pressed = false;
        wake();
      },
      onScroll: () => {
        if (sharedPointer.active) {
          pointer.x = sharedPointer.x;
          pointer.y = sharedPointer.y;
          pointer.active = true;
        }
        if (pointer.active || state.presence > 0) wake();
      },
      onVisibilityChange: () => {
        if (!document.hidden && (state.visible || state.presence > 0 || state.flare > 0)) {
          wake();
        }
      },
      onVisibleChange: nextVisible => {
        state.visible = nextVisible;
        if (nextVisible) {
          if (sharedPointer.active) {
            pointer.x = sharedPointer.x;
            pointer.y = sharedPointer.y;
            pointer.active = true;
          }
          if (pointer.active || settingsRef.current.ambient || focus) wake();
        } else if (state.presence > 0 || state.flare > 0) {
          wake();
        }
      }
    };

    if (!detachShared) detachShared = attachShared();
    cardRegistry.add(entry);
    entryByElement.set(root, entry);
    sharedObserver?.observe(root);
    root.addEventListener('pointerdown', onDown, { passive: true });
    root.addEventListener('focusin', onFocusIn);
    root.addEventListener('focusout', onFocusOut);
    motionQuery?.addEventListener?.('change', onMotionChange);
    if (settingsRef.current.ambient) wake();

    return () => {
      alive = false;
      cancelAnimationFrame(raf);
      sharedObserver?.unobserve(root);
      entryByElement.delete(root);
      cardRegistry.delete(entry);
      if (!cardRegistry.size && detachShared) {
        detachShared();
        detachShared = null;
      }
      root.removeEventListener('pointerdown', onDown);
      root.removeEventListener('focusin', onFocusIn);
      root.removeEventListener('focusout', onFocusOut);
      motionQuery?.removeEventListener?.('change', onMotionChange);
      wakeRef.current = null;
    };
  }, []);

  return (
    <div
      ref={rootRef}
      className={`${CARD}${className ? ` ${className}` : ''}`}
      style={
        {
          '--spotlight-card-surface': palette.surface,
          '--spotlight-card-border': palette.border,
          '--spotlight-card-shadow': palette.shadow,
          ...style
        } as React.CSSProperties
      }
      {...rest}
    >
      <span
        ref={lightRef}
        className="pointer-events-none absolute inset-0 -z-10 rounded-[inherit] opacity-0"
        aria-hidden="true"
      />
      {clampedGrain > 0 && (
        <span
          ref={grainRef}
          className="pointer-events-none absolute inset-0 -z-10 rounded-[inherit] bg-[length:160px_160px] opacity-0 mix-blend-overlay"
          style={{ backgroundImage: NOISE }}
          aria-hidden="true"
        />
      )}
      {children}
      <span
        className="pointer-events-none absolute inset-0 z-[1] rounded-[inherit] p-px [background:var(--spotlight-card-border)] [-webkit-mask:linear-gradient(#000_0_0)_content-box,linear-gradient(#000_0_0)] [-webkit-mask-composite:xor] [mask:linear-gradient(#000_0_0)_content-box_exclude,linear-gradient(#000_0_0)]"
        aria-hidden="true"
      />
      <span
        ref={edgeRef}
        className="pointer-events-none absolute inset-0 z-[1] rounded-[inherit] p-px opacity-0 [-webkit-mask:linear-gradient(#000_0_0)_content-box,linear-gradient(#000_0_0)] [-webkit-mask-composite:xor] [mask:linear-gradient(#000_0_0)_content-box_exclude,linear-gradient(#000_0_0)]"
        aria-hidden="true"
      />
    </div>
  );
};

export default SpotlightCard;
