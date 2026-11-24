# AGENTS.md — Portfolio Redesign

## 1. Project Overview

This repository contains Wangprai's existing personal portfolio website.

The goal is to redesign the existing website's UI/UX to present Wangprai primarily as a **Software Engineer**, with Frontend, Backend, and Full Stack Development as the main technical focus areas.

The file `design.md` is the primary design specification and source of truth for this redesign.

**Before doing any work, read `design.md` completely.**

If any instruction in this file conflicts with `design.md`, follow `design.md`. If requirements are ambiguous or missing, ask the user rather than making assumptions.

## 2. Mandatory Workflow

Always follow this workflow:

**Analyze → Propose → Approve → Implement → Review**

### Analyze

- Inspect the existing source code, project structure, routes, assets, dependencies, content, and current behavior.
- Inspect the running website when possible.
- Understand existing components before proposing replacements.
- Identify potential issues and implementation risks.

### Propose

Present a clear implementation plan before changing code.

Include:

- Proposed design and layout.
- Components and files that may be affected.
- Interactions and behavior changes.
- Dependencies or configuration changes.
- Responsive, accessibility, and performance considerations.
- React Bits components being considered, with official documentation/demo links.

### Approve

**Never begin implementation before the user explicitly approves the proposed plan.**

This applies especially to:

- Page or section structure changes.
- Routing changes.
- Functionality or behavior changes.
- Content changes.
- New dependencies.
- Configuration changes.
- React Bits installation.

### Implement

- Work in small, focused, reviewable steps.
- Avoid rewriting the entire project at once.
- Keep changes limited to the approved scope.
- Do not silently introduce additional features or modifications.

### Review

After each approved implementation step:

- Inspect the changed code.
- Check visual consistency.
- Test desktop, tablet, and mobile layouts.
- Check accessibility and performance.
- Check browser console and runtime behavior.
- Check for regressions in existing functionality.
- Report what changed and what still needs attention.

## 3. Project Preservation Rules

This is an existing project redesign, not a greenfield replacement.

Preserve:

- React + TypeScript + Vite + Tailwind CSS.
- Existing application architecture.
- Existing routes and route behavior.
- Existing personal information and factual content.
- Existing project information and verified links.
- Existing Thai and English translations.
- Existing contact destinations.
- Existing resume PDF and other valid assets.
- Existing functionality unless explicitly approved for modification.

Do not:

- Migrate frameworks or replace the build setup.
- Rewrite business logic unnecessarily.
- Remove existing content without approval.
- Invent achievements, skills, proficiency levels, statistics, metrics, clients, testimonials, certificates, or project outcomes.
- Assume employment status or add an Open to Work label.
- Create fake project screenshots or GitHub statistics.
- Add a contact form backend.
- Add excluded sections listed in `design.md`.

When information is missing, report it and ask the user.

## 4. Design Direction

Follow the confirmed direction in `design.md`:

- Creative & Modern Developer.
- Modern Tech & Futuristic.
- Dark Purple / Violet as the primary visual identity.
- Dark and Light themes.
- Single-page scrolling portfolio.
- Minimal fixed navigation.
- Hybrid section layouts.
- Abstract and visual elements used selectively.
- Modern, smooth interactions.
- Professional, readable, authentic, and recruiter-friendly presentation.

Prioritize recruiter experience and clear Software Engineer positioning.

Do not force every section into the same layout or use decorative effects that reduce readability.

## 5. React Bits Guidelines

React Bits is an explicitly requested resource for this redesign.

Official resources:

- https://reactbits.dev/
- https://reactbits.dev/components
- https://reactbits.dev/get-started/installation
- https://github.com/DavidHDev/react-bits

Rules:

- Prefer TypeScript + Tailwind variants.
- Verify compatibility with the actual React, TypeScript, Vite, and Tailwind versions.
- Inspect component source, dependencies, CSS assumptions, and performance impact.
- Install only selected components, never the entire library unnecessarily.
- Do not install or implement components before user approval.
- Prefer CSS or lightweight alternatives when they provide a better result.

Candidate effects are described in `design.md`, including:

- Hero background.
- Text reveal.
- Scroll reveal.
- Desktop cursor effects.
- Project card hover effects.

Respect reduced motion, touch devices, keyboard accessibility, and mobile performance.

**Do not add sound, music, or sound effects.**

## 6. Content and Interaction Requirements

Follow the content, section, localization, theme, and interaction requirements in `design.md`.

Important confirmed requirements:

- Software Engineer is the primary professional identity.
- English is the default language; Thai must also be supported.
- Language selection must persist.
- Dark is the default theme; Light theme must also be supported.
- Theme selection must persist.
- Project details use a Minimal Modal, not a full-screen modal.
- Back-to-top appears in the Footer only.
- Preserve existing email, phone, GitHub, LinkedIn, and Facebook destinations.
- Preserve the real internship dates and details.
- Preserve the Donut accuracy improvement as 87% to 92%.
- Only show project links that actually exist and are verified.

Do not add:

- Personal interests or hobbies section.
- Dedicated soft skills section.
- Testimonials.
- Blog or technical articles.
- Problem Solver claims.
- Sound or music.

For unresolved questionnaire answers, preserve current behavior by default and ask before making assumptions.

## 7. Technical and Quality Requirements

- Use the existing project conventions.
- Avoid unnecessary dependencies and abstractions.
- Keep components maintainable and reusable where appropriate.
- Use semantic HTML.
- Maintain keyboard accessibility and visible focus states.
- Respect `prefers-reduced-motion`.
- Ensure both themes have sufficient contrast.
- Prevent horizontal overflow and layout shifts.
- Ensure all important content remains readable without animations.
- Review desktop, tablet, and mobile layouts.
- Do not claim a test passed unless it was actually executed.

After implementation, run and review:

```bash
npm run build
npm run lint
```

If an error already existed before the changes, distinguish it from newly introduced errors.

## 8. Communication Rules

- Communicate with the user before consequential changes.
- Explain technical decisions in clear language.
- Show which files will be affected before implementation.
- Ask one focused question when clarification is necessary.
- Do not overwhelm the user with unrelated suggestions.
- Do not proceed to the next implementation phase without approval.
- Report completed work, test results, and remaining issues honestly.

## 9. Final Rule

**The user is the decision-maker. The AI Agent is responsible for analyzing, proposing, implementing approved changes, and reviewing the results.**

Never treat a design preference or an agent recommendation as permission to modify the project.

Always use `design.md` as the primary reference for the portfolio redesign.
