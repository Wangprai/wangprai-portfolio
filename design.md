# Portfolio Website Redesign — Design Specification

> **Project:** Wangprai Portfolio  
> **Purpose:** Redesign the UI/UX of the existing portfolio for a Software Engineer job application  
> **Source of truth:** The uploaded `wangprai-portfolio-main.zip`, the user's confirmed questionnaire answers, and the current implementation  
> **Working principle:** Analyze → Propose → Approve → Implement → Review

---

## 1. Project Objective

Redesign the existing personal portfolio into a polished, distinctive, recruiter-friendly portfolio that positions Wangprai primarily as a **Software Engineer**, with Frontend Development, Backend Development, and Full Stack Development as the leading technical focus areas. Data Science, AI, and Machine Learning remain supporting areas rather than the primary professional identity.

The redesign must feel **Creative & Modern Developer** and **Modern Tech & Futuristic**, while remaining authentic, personal, readable, performant, and appropriate for professional hiring decisions.

### Primary goals (ranked)

1. Job Application
2. Personal Branding
3. Professional Networking
4. Technical Showcase
5. Project Showcase

All five goals should be supported, but decisions should prioritize the job-application journey.

### Primary audiences (ranked)

1. Recruiters / HR
2. Technical Leads / Engineering Managers
3. General Visitors
4. Software Engineers / Developers
5. Potential Clients / Collaborators

A recruiter should be able to understand the candidate's positioning, experience, education, technical focus, projects, and contact options quickly.

---

## 2. Mandatory Workflow for the AI Agent

Do not immediately rewrite the project.

Use this workflow for the redesign:

1. **Analyze:** Inspect the current source code, running UI, routes, assets, content, dependencies, and existing behavior.
2. **Propose:** Present the proposed design direction, section structure, major interactions, and any implementation-impacting changes.
3. **Approve:** Wait for the user's approval before implementing changes that alter structure, routing, functionality, dependencies, or content.
4. **Implement:** Apply the approved design in focused, reviewable steps.
5. **Review:** Check visual consistency, responsive behavior, accessibility, performance, and regressions after implementation.

### Scope and preservation rules

- This is a **redesign of the existing website**, not a greenfield replacement.
- Preserve existing content, personal data, links, assets, and working functionality unless a change is explicitly approved.
- UI/layout/styling changes are the main scope.
- Do not silently change business logic, route behavior, data, contact destinations, resume content, or language content.
- Do not invent skills, proficiency levels, metrics, work achievements, clients, testimonials, certificates, project outcomes, or employment status.
- If information is missing or ambiguous, flag it and ask for approval rather than fabricating it.
- Improve wording only for clarity, grammar, concision, ordering, and presentation. Preserve the factual meaning.
- Inspect SEO as it currently exists and propose improvements while preserving URL structure and existing behavior unless approved.
- Keep the project maintainable and avoid unnecessary dependencies or abstractions.

---

## 3. Existing Project Audit (from uploaded source)

### Technology and build setup

The uploaded project currently uses:

- React `19.2.5`
- TypeScript `~6.0.2`
- Vite `^8.0.10`
- Tailwind CSS `^4.2.4` with `@tailwindcss/vite`
- React Router DOM `^7.15.0`
- Lucide React and React Icons
- Vercel deployment configuration

Existing scripts:

- `npm run dev`
- `npm run build`
- `npm run lint`
- `npm run preview`

**Do not migrate the framework or replace the build setup.** Continue with the existing React + TypeScript + Vite + Tailwind stack unless the user approves a change.

### Current structure

```text
src/
├── assets/
│   └── profile.png
├── components/
│   ├── About.tsx
│   ├── Contact.tsx
│   ├── Education.tsx
│   ├── Experience.tsx
│   ├── Footer.tsx
│   ├── Hero.tsx
│   ├── Navbar.tsx
│   ├── Projects.tsx
│   └── Skills.tsx
├── hooks/
│   └── usePersonalData.tsx
├── pages/
│   ├── Index.tsx
│   └── NotFound.tsx
├── App.css
├── App.tsx
├── index.css
└── main.tsx

public/
├── docs/
│   └── Wangprai_Resume-SE.pdf
├── favicon.svg
└── icons.svg
```

The page is currently a single-page scrolling portfolio at `/`, with a wildcard 404 route. `Index.tsx` composes Navbar, Hero, About, Education, Experience, Skills, Projects, Contact, and Footer.

### Existing behavior to preserve and review

- English and Thai content are implemented through `PersonalDataProvider` and `usePersonalData`.
- English is currently the initial language.
- The language switch updates the document's `lang` attribute and uses a short transition.
- Navbar has desktop navigation and a mobile menu.
- Resume PDF is included in `public/docs/`.
- Hero has anchors to Projects and Contact.
- Contact uses `mailto:` and `tel:` links; there is no contact form or form backend in the current implementation.
- Footer contains GitHub, LinkedIn, and Facebook links.
- Project cards currently show descriptions, technology tags, and only the links that exist for a project.
- About contains the profile photo and currently embeds certificate chips/tooltips.
- Education, Experience, Skills, and Projects are rendered as page sections.
- `NotFound.tsx` handles unknown routes.

### Specific issues noticed during source inspection

These are audit findings, not permission to change functionality without review:

1. The English translation data contains a `certificates` navigation label, but the current Navbar's `navItems` does not render a Certificates link.
2. Certificates are currently embedded inside About rather than implemented as a dedicated page section/component.
3. The Thai navigation translation does not currently define a `certificates` label.
4. The resume anchor in `Navbar.tsx` uses a Windows-style path (`\docs\Wangprai_Resume-SE.pdf`). Verify and correct the public URL path during implementation, with the intended file preserved.
5. The current theme tokens in `index.css` use a dark navy base and teal accent. The redesign questionnaire selected a dark purple/violet direction, so propose a new token palette rather than carrying the teal accent forward unchanged.
6. The current language selection is held in React state and is not persisted across reloads. The user's language preference should persist after the redesign.
7. The current source contains no theme toggle. A dark/light theme toggle is a confirmed redesign requirement.
8. The current `App.css` still contains Vite starter styles such as a centered `#root`, logo animation, and generic `.card` styles. Inspect whether these conflict with the redesigned layout and remove or replace only as part of the approved UI work.
9. `index.html` currently has a basic title and author metadata. Review SEO metadata and propose improvements without inventing claims.
10. No project thumbnail assets are present in the inspected source tree. Do not invent screenshots or use unrelated imagery as if it represented the actual projects. Propose visual treatments that work with available assets, and request real screenshots if needed.

---

## 4. Visual Direction

### Confirmed direction

- **Overall style:** Creative & Modern Developer
- **Visual theme:** Modern Tech & Futuristic
- **Color direction:** Dark Purple / Violet
- **Layout:** Single-page scrolling
- **Visual language:** Abstract 3D / visual elements, combined with other visual treatments as a hybrid
- **Navbar:** Minimal fixed navbar
- **Section layout:** Hybrid layout; choose the appropriate composition per section rather than forcing every section into one pattern
- **About placement:** Agent should propose the best placement/order based on recruiter UX and the actual content
- **Redesign style:** Flexible redesign, while preserving the authentic identity and content of the existing website
- **Motion style:** Modern and smooth
- **Visual assets:** Hybrid 3D and abstract visuals; the user specifically expressed interest in React Bits

### Design principles

- Use a distinctive purple/violet identity with restrained gradients, glows, depth, and abstract forms.
- Keep the interface professional and readable; futuristic styling must not make the portfolio look like a game UI or obscure the content.
- Use a clear visual hierarchy, consistent spacing, strong typography, and controlled contrast.
- Avoid excessive glassmorphism, excessive glow, dense decoration, and motion that competes with the content.
- Use Bento Grid or other modular layouts where they genuinely improve scanning and hierarchy; do not force every section into cards.
- Use abstract/3D visual elements selectively. Do not imply that decorative visuals are actual project screenshots or product interfaces.
- Follow the dedicated **React Bits Integration Strategy** section. React Bits is an explicitly requested visual resource: preview and propose concrete components for the Hero, text reveal, scroll reveal, cursor, and project-card interactions. Select only a small coherent set, verify compatibility/dependencies, and obtain approval before installation.
- Keep visual effects responsive and graceful on mobile and lower-powered devices.

### Background and color behavior

Use a hybrid background approach: combine suitable gradients, grid/glow details, clean dark surfaces, and selective section-specific animation. Do not apply every effect everywhere.

The selected primary visual direction is dark purple/violet. A light theme is also required (see Theme section). The light theme should be designed as a coordinated counterpart, not as a generic inversion.

---

## 4A. React Bits Integration Strategy

React Bits is an explicitly requested visual resource for this redesign, not merely an optional name to consider. Use it as a curated source of animated React components and backgrounds to help implement the selected Creative & Modern Developer / Modern Tech & Futuristic direction.

Official resources:
- Website and component catalog: https://reactbits.dev/
- Component documentation: https://reactbits.dev/components
- Installation guide: https://reactbits.dev/get-started/installation
- Source repository: https://github.com/DavidHDev/react-bits

React Bits provides component categories for Text Animations, Animations, Components, Micro Interactions, and Backgrounds. Components are provided in JavaScript or TypeScript variants and can be styled with CSS or Tailwind. The official installation guide supports installing source through the shadcn CLI or copying component source manually. The installed source belongs to this project and can be customized.

### 4A.1 Preferred implementation variant

- Prefer **TypeScript + Tailwind (TS-TW)** variants because the existing portfolio uses React + TypeScript + Tailwind CSS.
- The current project uses React 19, Vite 8, TypeScript 6, and Tailwind CSS 4. Do not assume every React Bits component or its dependencies are automatically compatible with every version. Verify the chosen component's source, peer dependencies, CSS assumptions, and build behavior against the actual project before installation.
- Prefer installing only the selected components, not the whole library.
- Follow the installation instructions on the individual component page. The current documented CLI form is:

```bash
npx shadcn@latest add @react-bits/ComponentName-TS-TW
```

Replace `ComponentName` with the exact component identifier and use the exact variant listed by its current documentation. If the project is not configured for the required CLI flow, assess the configuration impact first or copy the component source manually.
- Do not add a general-purpose animation framework or a large dependency solely because one React Bits component uses it. Check the component's declared dependencies and use the smallest suitable implementation.
- Keep installed React Bits components in a clearly organized location, for example `src/components/react-bits/` or the existing component structure if that is more consistent with the repository. Do not create duplicate component systems.

### 4A.2 Candidate component mapping

The following are **candidate components to preview**, not a requirement to use all of them. The agent must inspect the live demos and source, compare alternatives, and recommend a small coherent set for approval.

| Portfolio area / confirmed preference | React Bits candidates to evaluate | Intended treatment |
|---|---|---|
| Hero background — dark purple/violet, abstract 3D / hybrid background | **Soft Aurora**, **Aurora**, **Gradient Waves**, or **Dark Veil** | Use one restrained animated background treatment behind the Hero. Tune colors toward the approved violet palette. Keep headline and calls to action legible. Prefer a static CSS gradient fallback. |
| Hero headline / selected Text Reveal | **Split Text** or **Blur Text** | Apply a short entrance reveal to the main heading or one supporting line. Keep the real text in the DOM and readable if animation does not run. Avoid delaying first content visibility. |
| Section and card entrances / selected Scroll Reveal | **Scroll Reveal**, **Animated Content**, or **Fade Content** | Reveal selected sections or project cards on entering the viewport using restrained fade, blur, or stagger. Do not animate every element independently. |
| Desktop cursor / selected Interactive Cursor | **Glow Cursor**; evaluate **Pixel Trail** only if a more visible trail is justified | Use a subtle cursor glow or restrained trail on fine-pointer desktop devices only. Do not hide or replace the native cursor by default. Disable on touch and when reduced motion is requested. |
| Project-card hover / agent-proposed hover behavior | **Glare Hover**, **Magnet**, or **Electric Border** | Evaluate a soft hover highlight for project cards or a slight magnetic response for primary interactive elements. Avoid combining multiple strong effects on the same card. Preserve reliable clicking and focus behavior. |
| Small interactive details | Relevant items in **Micro Interactions**, only when they improve an existing control | Use only for existing UI interactions where the motion clarifies state. Keep native button, checkbox, switch, and link semantics. Prefer simple CSS transitions for ordinary controls. |

### 4A.3 Recommended starting direction

For the first design proposal, evaluate this restrained starting combination:

1. One Hero background: **Soft Aurora**, **Gradient Waves**, or **Dark Veil** (choose one after comparing the live demos and actual visual fit).
2. One heading treatment: **Split Text** or **Blur Text**.
3. One scroll-reveal approach: **Scroll Reveal**, **Animated Content**, or **Fade Content**.
4. One desktop cursor treatment: **Glow Cursor**, subject to performance and usability review.
5. At most one project-card hover treatment: **Glare Hover** or another clearly justified alternative.

This is a starting shortlist, not a fixed mandate. The Agent may recommend fewer components or CSS-only effects if that produces a better, faster, or more accessible result. Do not stack multiple animated backgrounds, cursor effects, text distortions, and card effects merely to demonstrate the library.

### 4A.4 React Bits and project visuals

- The source audit found no real project-thumbnail assets in the uploaded source tree. Do not use React Bits backgrounds or decorative effects as fake project screenshots.
- If actual screenshots or screen recordings are later supplied, the agent may evaluate React Bits' **Center Stage** tool to turn real captures into polished device/browser presentation assets. Do not create misleading product shots or imply that a decorative mockup is a real application screen.
- Keep project details and evidence factual. Decorative motion must never obscure the actual project description, technologies, contributions, or verified links.

### 4A.5 Accessibility and motion rules

- Respect `prefers-reduced-motion`. For reduced-motion users, render a static state or a simpler non-motion alternative.
- Keep all important content available in the DOM and readable without JavaScript animation.
- Do not make essential text appear only after a long animation, and do not hide headings while waiting for an animation to initialize.
- Do not rely on hover to reveal essential project information; all key content and actions must also be available by keyboard and touch.
- Keep native cursor behavior and pointer accuracy. Cursor effects must not intercept pointer events.
- Disable or simplify pointer-reactive effects for touch devices and coarse pointers.
- Provide stable layout dimensions so effects do not cause content shifts.
- Ensure visible focus states remain available even when hover effects are present.
- The user explicitly selected **No Sound**. Do not add React Bits Sound Lab assets, audio playback, sound effects, or sound-triggered interactions.

### 4A.6 Performance and implementation safeguards

Before adopting each React Bits component:

1. Inspect the current official component page, source code, required dependencies, CSS, and installation instructions.
2. Check compatibility with the actual React, TypeScript, Vite, and Tailwind versions in `package.json`.
3. Identify whether it uses Canvas, WebGL, shaders, continuous animation loops, global event listeners, or large dependencies.
4. Measure its impact on bundle size, startup, scroll performance, and lower-powered/mobile devices.
5. Lazy-load a heavy non-critical effect where appropriate; pause or reduce work when it is offscreen or not needed.
6. Provide a static fallback and clean up event listeners, animation frames, observers, and pointer handlers on unmount.
7. Verify dark and light theme colors. Do not assume a component's demo palette automatically fits both themes.
8. Test keyboard use, touch behavior, reduced motion, and production build output.

Do not install or implement a component before presenting its intended location, purpose, dependency impact, fallback, and reason for choosing it. Ask for approval before introducing material new dependencies or changing the project configuration.

### 4A.7 Agent deliverable before implementation

During the Analyze → Propose → Approve stage, provide a short React Bits implementation proposal with:

- Component name and official documentation/demo link.
- Target section and intended visual effect.
- Why it fits the confirmed design direction and questionnaire answers.
- Exact dependencies or configuration changes, if any.
- Accessibility and reduced-motion fallback.
- Performance considerations, including whether it is appropriate for mobile.
- Any alternative considered (including a lightweight CSS implementation).

Wait for approval before installing components or changing configuration. After approval, integrate components incrementally and review each one before adding the next.

---

## 5. Page Structure and Content Priorities

The site remains a single-page scrolling portfolio unless a routing change is proposed and approved.

### Required existing content areas

Preserve and redesign the existing content:

- Hero
- About Me
- Education
- Experience / Work History
- Technical Skills
- Projects
- Contact
- Footer

The user's selected section preferences also include:

- About Me
- Technical Skills
- Experience
- Featured Projects
- Education
- Certificates & Achievements
- Contact

The agent should reconcile the desired section list with the current implementation and present a proposed order. Do not remove any existing factual content merely to simplify the layout.

### Professional positioning

Primary positioning: **Software Engineer**.

Focus order:

1. Frontend Development
2. Backend Development
3. Full Stack Development
4. Software Architecture & Engineering
5. Data Science / AI / ML

Data Science, AI, and ML remain part of the candidate's background and projects, but the overall presentation should not position the candidate primarily as an AI Engineer.

### About Me

The user selected a personal storytelling approach. Use the real story and content already in the source:

- Computer Science graduate from Khon Kaen University
- Second-Class Honors
- Interest in Software Development, Data Science, and NLP
- Academic focus on Data Science, Machine Learning, and Deep Learning
- Thai Automatic Speech Recognition project
- Six-month Software Engineer internship/cooperative experience at Daikin Industries (Thailand) Ltd.
- Experience developing web applications and applying technical knowledge to practical work

Keep the tone natural, professional, and authentic. Improve readability and narrative flow without inventing personal motivations or achievements.

### Education

Keep Education as a dedicated section. Current source data:

- Bachelor of Science in Computer Science
- Second-Class Honors
- Khon Kaen University
- Graduated in 2025

Do not add dates beyond those currently verified in the source.

### Experience

Keep the real internship entry and its factual details. Current source lists:

- Role: Software Engineer Intern
- Company: Daikin Industries (Thailand) Ltd.
- Period: Apr 2025 — Oct 2025
- Website content control panel using PHP and Laravel
- Donut model fine-tuning for invoice scanning; reported accuracy improvement from 87% to 92%
- Internal web applications using TypeScript, React, ElysiaJS, Oracle, and PostgreSQL

Do not convert internship work into full-time employment or imply a current employment status. The user's work-status preference was to have the agent inspect and propose; do not assume “Open to Work” or “Currently Working.”

### Technical Skills

Preserve all current skill entries unless the user approves content edits. Current source groups:

- Languages: Python, JavaScript, TypeScript, Java (Basic), PHP, SQL
- Development Frameworks: React, Node.js, Express, Elysia.js (Bun), Tailwind CSS, FastAPI
- Data Analysis & AI Frameworks: NumPy, Pandas, Scikit-learn, Matplotlib, Seaborn, PyTorch
- Tools & Platforms: Git, Docker, Hugging Face, PostgreSQL, Oracle, JWT
- Currently Learning: Go, Next.js, NestJS

Do not invent proficiency percentages, skill ratings, or years of experience. The agent may propose a clearer visual grouping and emphasis based on the actual project and experience evidence.

### Projects

The current source includes five projects:

1. **Document Understanding Transformer (Donut model)**
   - Deep learning model for extracting structured information from document images.
   - Current technology tags: Python, PyTorch, Transformers, Hugging Face, Wandb.
2. **IOT Meeting Room Reservation**
   - Web application for meeting-room booking, real-time booking information, and IoT notifications.
   - Current technology tags: React, TypeScript, ElysiaJS, Ant Design, Oracle, Socket.io.
3. **DaikinThai Website**
   - Control panel for CRUD operations on website content such as images and text.
   - Current technology tags: PHP, Laravel, Bootstrap, MySQL.
4. **Automatic Speech Recognition for Thai (ASR model)**
   - Thai speech-to-text model fine-tuned from Wav2Vec2.
   - Existing links: GitHub and Hugging Face.
   - Current technology tags: Python, PyTorch, PyThaiNLP, Transformers, Hugging Face.
5. **Salary Growth in Data Science Career**
   - Data-analysis mini project examining dataset relationships, salary trends, job ranking, and initial ML experimentation.
   - Existing GitHub link.
   - Current technology tags: Python, Pandas, NumPy, Scikit-learn, Matplotlib, Seaborn.

Do not invent live demos, GitHub repositories, screenshots, features, metrics, or outcomes. For each project, show only the links that exist in the source or are verified later.

### Featured Projects

The user delegated the choice to the agent. Inspect the actual project content, quality, relevance to Software Engineer positioning, and available assets before deciding whether to show Featured Projects separately or use one unified project listing. Propose the selection and rationale for approval. Do not invent or silently remove projects.

### Certificates & Achievements

Current source includes two certificates:

- Super AI Engineer Season 5: AI Innovator — Artificial Intelligence Association of Thailand (AIAT), 2025
- Hackathon in Boot Camp Training — Data Universe, 2025

The user selected Certificates & Achievements as a desired content area. Current implementation embeds certificate chips and hover tooltips inside About. Propose a clear and accessible presentation, likely as a dedicated section if it improves scanning. Verify available evidence/assets before using certificate imagery. Do not fabricate certificate images or details.

### Contact

Preserve current contact methods and destinations:

- Email: `wangprai.jullapech@gmail.com`
- Phone: `+66845431757`
- GitHub: `https://github.com/Wangprai`
- LinkedIn: `https://www.linkedin.com/in/wangprai-jullapech-2483a9378/`
- Facebook: `https://www.facebook.com/B.Boszi14`

The current Contact section uses email and phone links; it does not have a backend-powered contact form. Do not add a form backend or change the contact flow without approval.

### Footer

Confirmed footer elements:

- Copyright with current year
- Name / logo
- Social icons
- Back-to-top control

Social links should use recognizable icons, accessible labels, and tooltips where appropriate. Do not add unrelated footer content without a clear reason.

---

## 6. Interaction and Motion

### Navbar

- Minimal fixed navbar.
- Keep navigation clear and compact.
- Preserve the mobile menu behavior and ensure it closes after navigation.
- Provide clear active/hover/focus states.
- Include language and theme controls in a way that does not overcrowd mobile navigation.
- Keep the resume action accessible and verify its URL.

### Hero

- Present the candidate's name, Software Engineer positioning, concise summary, and clear actions.
- English is the default language.
- The agent should decide whether an Intro appears based on UX, performance, and repeat visits; do not automatically show a blocking intro on every visit.
- Use text reveal selectively on key headings/hero/about content.
- Hero text must remain immediately readable and must not be hidden behind animation.

### Scroll and reveal

- Use scroll reveal for appropriate sections/cards as they enter the viewport.
- Use restrained fade/slide/stagger effects.
- Respect `prefers-reduced-motion`.
- Ensure content remains available when JavaScript animation is disabled or fails.

### Cursor

- Interactive cursor effects are allowed on desktop: subtle glow, trail, and hover changes.
- Do not impair clicks, text selection, or pointer accuracy.
- Do not hide the native cursor if doing so harms usability.
- Disable or simplify effects on touch devices and when reduced motion is requested.

### Project cards and modal

- Agent proposes project-card hover effects based on the approved layout, performance, and touch support.
- The user corrected the project detail preference to **Minimal Modal** (not full-screen modal).
- A project modal should show, where real data exists:
  - Thumbnail or screenshot
  - Project name
  - Short description
  - Technology stack
  - Key features / contribution
  - Demo and GitHub links, only when available
- Choose modal transitions based on continuity, performance, and accessibility.
- Ensure keyboard support, focus management, Escape-to-close, and sensible mobile behavior.

### Social links

Use icon-only social links where space is appropriate. Icons must be recognizable, have accessible labels, and show tooltips on hover/focus. Only show real, existing channels.

### Back to top

The user selected **Footer Only**. Place the Back-to-Top control in the Footer only, and scroll smoothly to the Hero/top. Ensure keyboard accessibility.

### Loading

The user delegated loading experience to the agent. Prefer no artificial delay. Add a loading state only if actual loading behavior requires it and it improves perceived performance. Do not add an intro/loading animation that makes a static portfolio wait unnecessarily.

### Sound

No background music and no sound effects.

---

## 7. Theme and Localization

### Theme toggle

- Dark theme is the primary/default visual direction.
- Provide a Dark + Light theme toggle.
- Persist the user's selected theme across reloads.
- Use a smooth but restrained transition.
- Ensure contrast and readability in both themes.
- Light theme should be designed deliberately to complement the purple/violet dark theme; adapt gradients, glows, borders, shadows, cards, and text rather than simply inverting colors.

### Language

- Support Thai and English throughout the site.
- English is the default language.
- Provide a clear language toggle.
- Persist the selected language across reloads.
- Preserve technical terms in English where appropriate.
- Keep Thai and English layouts equally polished, including text wrapping, line height, navigation, cards, and modal content.
- The user delegated URL language routing to the agent. Inspect the current React Router setup, SEO implications, and shareability before proposing URL-based locale routing. Do not change route structure without approval.
- Keep the existing translation content and ensure both language versions remain complete. Do not omit or invent translations.

---

## 8. Responsive Strategy

- Use a **Desktop First** design approach for the initial composition, then complete responsive adaptation.
- Use Tailwind CSS breakpoints consistently; inspect the existing Tailwind v4 setup before adding custom breakpoints.
- Perform a full responsive review across desktop, tablet, and mobile.
- Do not merely shrink the desktop layout. Recompose grids, typography, navigation, cards, modal layout, spacing, and decorative effects for smaller screens.
- Ensure no horizontal overflow, clipped content, inaccessible controls, or hover-only functionality on touch devices.
- Keep mobile performance and legibility as first-class requirements.

---

## 9. Accessibility and Performance

### Accessibility

- Use semantic HTML landmarks and heading order.
- Provide accessible names for icon-only controls.
- Ensure keyboard navigation and visible focus indicators.
- Ensure modal focus management and Escape-to-close behavior.
- Maintain sufficient contrast in both themes.
- Do not rely on color alone to communicate state.
- Respect `prefers-reduced-motion`.
- Keep content readable and usable without cursor effects or animation.
- Ensure touch targets are appropriately sized.

### Performance

The selected preference is a balance between performance and visual quality.

- Avoid heavy 3D scenes, large animation bundles, and unnecessary client-side work.
- Lazy-load non-critical imagery and heavy visual elements.
- Avoid layout shifts; reserve image dimensions.
- Prefer CSS effects or lightweight components when they achieve the intended result.
- Apply the dedicated React Bits selection, compatibility, approval, accessibility, and performance rules in Section 4A. Do not treat React Bits as a vague optional reference or install components indiscriminately.
- Do not delay first contentful display with decorative intros or artificial loading.
- Check production build output and runtime console after implementation.

---

## 10. SEO and Metadata

The user delegated SEO decisions to the agent.

- Audit current title, description, Open Graph metadata, canonical URL, favicon, and document language behavior.
- Propose improvements relevant to a personal Software Engineer portfolio.
- Preserve the existing public URL and route structure unless the user approves a change.
- Do not invent employment status, claims, job titles beyond the selected Software Engineer positioning, or project metrics.
- Ensure language handling is compatible with the final Thai/English strategy.
- Verify the deployed Vercel behavior after implementation if deployment access is available; do not claim verification without testing.

---

## 11. Agent-Proposed Decisions

For the following topics, the user explicitly delegated the decision to the agent. Inspect the real project and explain the recommendation before making consequential changes:

- Intro appearance and repeat-visit behavior
- Skills visualization (must reflect actual skills; no invented proficiency values)
- Project modal transition
- Project card hover effects
- Contact section treatment (preserve actual channels and behavior)
- Light theme visual system
- Language URL routing / SEO trade-offs
- Resume/CV presentation and access
- Work status (never assume current status or Open to Work)
- Experience layout
- Certificates/Awards placement
- Professional Summary placement or omission
- Technical Expertise / Core Competencies presentation
- Career Goals presentation
- Technical Workflow / Development Process presentation
- GitHub activity/statistics (inspect actual profile data; do not fabricate statistics)
- Featured Projects selection/layout
- Loading experience

For every delegated decision:
1. Inspect the current source and available real data.
2. Explain the proposed treatment and why it helps the primary audience.
3. Identify any content or behavior that would change.
4. Wait for approval when the change is consequential.
5. Do not fill missing data with placeholders that look factual.

---

## 12. Explicit Exclusions / Do Not Add

The user explicitly selected:

- No personal interests / hobbies section.
- No dedicated Soft Skills section.
- No testimonials / recommendations section.
- No blog / technical articles section.
- No sound effects or background music.

Also:

- Do not create a “Problem Solver” claim or other unsupported self-description.
- Do not add fake GitHub activity, fake project screenshots, fake testimonials, fake awards, or fabricated metrics.
- Do not assume employment status.
- Do not add a contact form backend.
- Do not make a full-screen project modal; use the corrected Minimal Modal preference.
- Do not make every section look identical; use the selected hybrid layout approach.
- Do not add motion solely for decoration if it harms performance or usability.

---

## 13. Content Accuracy Checklist

Before finalizing the redesign, verify that:

- [ ] Candidate positioning is Software Engineer.
- [ ] English is the default language; Thai is also fully supported.
- [ ] Existing personal name, education, internship, projects, skills, certificates, and contact details are preserved accurately.
- [ ] The internship remains identified as an internship and retains its actual dates.
- [ ] The Donut accuracy improvement is represented exactly as currently documented (87% to 92%) and not generalized beyond the source.
- [ ] No unsupported proficiency ratings or years of experience are added.
- [ ] No unsupported employment status is displayed.
- [ ] Project links are only shown when present and verified.
- [ ] Resume PDF remains accessible.
- [ ] No missing project images are replaced with misleading imagery.
- [ ] Thai and English content remain consistent.
- [ ] No prohibited/excluded sections are added.

---

## 14. Implementation Review Checklist

- [ ] `npm run build` passes.
- [ ] `npm run lint` passes, or any pre-existing failures are documented separately.
- [ ] Existing route `/` still works.
- [ ] Unknown routes still render an intentional 404 page.
- [ ] Resume link opens the actual PDF.
- [ ] Email and phone links work.
- [ ] GitHub, LinkedIn, and Facebook links remain correct.
- [ ] Language toggle works and persists.
- [ ] Theme toggle works and persists.
- [ ] Desktop navigation and mobile menu work.
- [ ] Project modal works with keyboard and touch.
- [ ] All sections are reachable and have correct anchor targets.
- [ ] Back-to-top is available in the Footer only.
- [ ] Reduced-motion preference is respected.
- [ ] Dark and light themes pass contrast/readability review.
- [ ] Desktop, tablet, and mobile layouts are reviewed.
- [ ] No horizontal overflow or major layout shift.
- [ ] No console errors or broken assets.
- [ ] SEO metadata is reviewed and any changes are documented.

---

## 15. Questionnaire Traceability and Unresolved Answers

This specification reflects the answers available from the questionnaire and the uploaded source. Some historical questionnaire responses were not present in the retrievable conversation context. They are intentionally **not guessed**.

Known unresolved/missing questionnaire responses after the latest recap:

- Q17
- Q28
- Q29–Q45

For those unanswered/unavailable topics, the agent must preserve current behavior by default, inspect the implementation, and propose a change for approval rather than treating an assumed preference as confirmed.

Selected answers explicitly reflected in this document include:

- Q1 B — Creative & Modern Developer
- Q2 C — Modern Tech & Futuristic
- Q3 C — Dark / Purple & Violet
- Q4 A — Single-page Scrolling
- Q5 C — Abstract 3D / Visual
- Q6 E — Hybrid
- Q7 B — Minimal Fixed Navbar
- Q8 E — Hybrid Layout
- Q9 — About Me, Technical Skills, Experience, Featured Projects, Education, Certificates & Achievements, Contact
- Q10 D — Agent Proposes
- Q11 A — Personal Storytelling (as recovered in the latest recap)
- Q12 E — Authentic & Personal; existing website, UI redesign only
- Q13 D — Flexible Redesign
- Q14 B — Modern & Smooth
- Q15 E — Hybrid 3D & Abstract Visuals; explicit interest in React Bits (see Section 4A for component shortlist, selection workflow, installation, accessibility, and performance requirements)
- Q16 C — React + Vite (as recovered in the latest recap; the uploaded source also confirms the current React + Vite stack)
- Q19 A — Analyze → Propose → Approve → Implement → Review
- Q20 D — Flexible
- Q21 B — Desktop First
- Q22 B — Tailwind Breakpoints
- Q23 B — Full Responsive Review
- Q24 B — Balanced Performance & Visual
- Q25 D — Agent Proposes
- Q26 D — Agent Proposes SEO; inspect and preserve URL structure unless approved
- Q27 B — Improve Content Presentation; no invented facts or achievements
- Q46 D — Agent Proposes Intro behavior
- Q47 E — Hybrid Background
- Q48 F — Agent Proposes Skills visualization
- Q49 A — Minimal Modal (corrected from the earlier C answer)
- Q50 E — Agent Proposes modal transition
- Q51 C — Interactive Cursor, desktop only with usability safeguards
- Q52 B — Scroll Reveal
- Q53 F — Agent Proposes project-card hover effects
- Q54 A — Icon Only for Social Links
- Q55 E — Agent Proposes Contact treatment
- Q56 C — Footer Only for Back to Top
- Q57 A, B, C, D — Copyright, Name/Logo, Social Icons, Back to Top
- Q58 B — Dark + Light Theme Toggle
- Q59 D — Agent Proposes Light Theme
- Q60 B — Text Reveal
- Q61 D — No Sound
- Q62 C — Thai + English
- Q63 A — English Default
- Q64 D — Agent Proposes URL language routing
- Q65 — Ranked: Job Application, Personal Branding, Professional Networking, Technical Showcase, Project Showcase
- Q66 — Ranked: Recruiter/HR, Technical Lead/Engineering Manager, General Visitors, Software Engineers/Developers, Potential Clients/Collaborators
- Q67 A — Software Engineer primary positioning
- Q68 — Ranked: Frontend, Backend, Full Stack, Software Architecture & Engineering, Data Science/AI/ML
- Q69 D — Agent Proposes Resume/CV
- Q70 D — Agent Proposes Work Status; do not assume status
- Q71 E — No Testimonials / Recommendations
- Q72 E — No Blog / Technical Articles
- Q73 D — Agent Proposes Experience layout
- Q74 A — Dedicated Education Section
- Q75 D — Agent Proposes Certifications/Awards
- Q76 B — Personal Storytelling for About Me
- Q77 E — No Personal Interests / Hobbies
- Q78 E — No Soft Skills Section
- Q79 D — Agent Proposes Professional Summary
- Q80 D — Agent Proposes Technical Expertise / Core Competencies
- Q81 D — Agent Proposes Career Goals
- Q82 D — Agent Proposes Technical Workflow / Development Process
- Q83 D — Agent Proposes GitHub Activity / Coding Statistics
- Q84 D — Agent Proposes Featured Projects
- Q85 D — Agent Proposes Loading Experience

**Important:** Q18 was recorded as option A, but its option label/details were not available in the retrieved context. Do not infer its meaning. Q17, Q28, and Q29–Q45 remain unresolved in the currently available recap and must not be silently assigned choices.
