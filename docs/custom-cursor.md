# Custom Cursor

- `src/components/motion/CustomCursor.tsx` — dot (exact) + ring (eased), one rAF loop that sleeps when settled; mounted in `pages/Index.tsx`.
- `src/providers/CursorProvider.tsx`, `context/CursorContext.ts`, `hooks/useCursorPreference.ts` — on/off preference, persisted in `localStorage["portfolio-custom-cursor"]` (`"on"`/`"off"`, default on).
- `src/index.css` — styles. The native cursor is hidden only via `html.custom-cursor-active`, which is added on the first valid mouse move and removed on leave, blur, tab hide, disable and unmount. Inputs, textareas and contenteditable keep `cursor: text`.
- Navbar toggle (desktop controls, fine-pointer only), labels in `PersonalDataContext.ts` (`nav.enableCursor` / `nav.disableCursor`).

Active only when: `(hover: hover) and (pointer: fine)`, width >= 768px, no `prefers-reduced-motion`, preference on.

States (via delegation, so dynamic elements work): default, interactive (`a[href]`, button, select, summary, label[for], `[role=button]`, `[data-cursor]`), card (`data-cursor="card"`), text (cursor hidden, native I-beam), pressed.

Limitation: over plain (non-editable) text the custom cursor is shown, not the I-beam; selection still works.
