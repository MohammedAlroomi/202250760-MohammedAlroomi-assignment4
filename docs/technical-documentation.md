# Technical Documentation

**Project:** Personal Portfolio Web Application  
**Student:** Mohammed Alroomi · 202250760  
**Course:** SWE 363 – Web Application Development · KFUPM  
**Assignment:** 4 – Final Portfolio

---

## 1. Project Overview

This is a single-page portfolio web application built with pure HTML5, CSS3, and vanilla JavaScript. It has no external frameworks or build tools — every feature is implemented from scratch using native browser APIs.

The application was developed across four assignments:
- **Assignment 1** — Static HTML structure and basic layout
- **Assignment 2** — CSS styling, responsive design, and theme system
- **Assignment 3** — JavaScript interactivity, API integrations, and state management
- **Assignment 4** — Innovation features, performance optimisation, and final polish

---

## 2. File Structure

```
index.html        — 656 lines  — Full SPA with 7 sections
css/styles.css    — 1555 lines — Complete design system
js/script.js      — 734 lines  — 16 documented JavaScript functions
assets/images/    — 3 images   — Compressed project thumbnails
docs/             — 2 files    — AI report + this document
presentation/     — 2 files    — PDF slides + demo video
```

---

## 3. Architecture

### 3.1 HTML Layer (`index.html`)

Semantic HTML5 is used throughout:

- `<nav>` for navigation
- `<section>` for each page section with unique `id` attributes
- `<article>` for project and repo cards
- `<form>` with `required` validation and ARIA labels
- All images have `alt` attributes and `loading="lazy"`
- Script loaded with `defer` to avoid render-blocking

### 3.2 CSS Layer (`css/styles.css`)

The stylesheet is built around a **CSS custom properties design token system**:

```css
:root {
  --accent:       #00d4aa;   /* Primary teal accent */
  --bg-primary:   #0d0d0f;   /* Dark background */
  --text-primary: #f0f0f4;   /* Primary text */
  /* ... */
}
```

This means the entire dark/light theme switch requires changing only one class on `<body>` — all colours update automatically.

**Responsive breakpoints:**

| Breakpoint | Target |
|---|---|
| `max-width: 900px` | Tablet landscape |
| `max-width: 820px` | Tablet portrait |
| `max-width: 640px` | Mobile |

### 3.3 JavaScript Layer (`js/script.js`)

All JavaScript is organised into 16 self-contained functions, each responsible for exactly one feature:

| Function | Responsibility |
|---|---|
| `setGreeting(name)` | Generates time-aware greeting text |
| `initPersonalisedGreeting()` | Wires name input to localStorage |
| `initTheme()` | Dark/light toggle with localStorage persistence |
| `applyTheme(theme)` | Applies theme class and updates button icon |
| `applyProjectState()` | Re-renders project grid from current filter state |
| `initProjectFilter()` | Category filter button click handlers |
| `initProjectSort()` | Sort dropdown change handler |
| `initSkillFilter()` | Skill level filter dropdown handler |
| `initNavbar()` | Sticky navbar scroll behaviour |
| `initHamburger()` | Mobile menu open/close |
| `initSmoothScroll()` | Smooth anchor scroll navigation |
| `initScrollAnimations()` | IntersectionObserver scroll-in animations |
| `initContactForm()` | Form validation and success/error states |
| `initQuoteWidget()` | Quotable API with AdviceSlip fallback |
| `escapeHTML(str)` | XSS-safe HTML string sanitisation |
| `buildRepoCard(repo)` | Builds a GitHub repo card DOM element |
| `initGitHubRepos()` | Lazy-loads repos via GitHub REST API |
| `initSiteTimer()` | Real-time on-page time counter |
| `initLoginSimulation()` | sessionStorage login/logout state |
| `initScrollProgressBar()` | Reading progress bar (Innovation 1) |
| `initSkillBars()` | Animated skill bars on scroll (Innovation 2) |
| `initBackToTop()` | Scroll-aware back-to-top button (Innovation 3) |

All functions are called inside `DOMContentLoaded` to ensure the DOM is ready before any manipulation.

---

## 4. Key Technical Decisions

### 4.1 Unified Project Filter State

Instead of reading DOM values on every filter change, all filter state is stored in a single object:

```javascript
const projectState = { category: 'all', skill: 'all', sort: 'default' };
```

Every filter change updates this object and calls `applyProjectState()`, which reads all three dimensions together. This prevents inconsistencies between filter controls.

### 4.2 API Fallback Chain

The quote widget uses a two-tier fallback to ensure the section never breaks:

```
Quotable API → success → display quote
            → fail    → AdviceSlip API → success → display advice
                                       → fail    → show static message
```

This pattern is applied to all API calls in the project.

### 4.3 IntersectionObserver for Performance

Two features use `IntersectionObserver` instead of scroll event listeners:
- **GitHub Repos** — the API is only called when the section enters the viewport
- **Skill Bars** — the fill animation only triggers when bars are visible

This avoids unnecessary network requests and CPU usage for visitors who don't scroll to those sections.

### 4.4 XSS Prevention

All data returned from the GitHub API is passed through `escapeHTML()` before being inserted into the DOM, preventing cross-site scripting attacks from malicious repository names or descriptions.

---

## 5. External APIs

### GitHub REST API v3
- **Endpoint:** `https://api.github.com/users/MohammedAlroomi/repos?sort=updated&per_page=6`
- **Auth:** None (public repos, unauthenticated)
- **Rate limit:** 60 requests/hour per IP (sufficient for a portfolio)
- **Error handling:** Shows a retry button if the request fails

### Quotable API
- **Endpoint:** `https://api.quotable.io/random`
- **Fallback:** `https://api.adviceslip.com/advice`
- **Error handling:** Shows a static motivational message if both fail

---

## 6. Performance Metrics

| Optimisation | Detail |
|---|---|
| Image lazy loading | All 3 project images use `loading="lazy"` |
| Script defer | `<script defer>` prevents render-blocking |
| DNS prefetch | `<link rel="dns-prefetch">` for all 3 API domains |
| Scroll throttling | `requestAnimationFrame` wraps all scroll handlers |
| Image compression | Project1.webp reduced from 167KB to 38KB (77%) |
| Lazy API loading | GitHub API only called when section is visible |

---

## 7. Browser Compatibility

Tested and confirmed working on:

| Browser | Version | Status |
|---|---|---|
| Chrome | 120+ | ✅ Full support |
| Firefox | 120+ | ✅ Full support |
| Safari | 17+ | ✅ Full support |
| Edge | 120+ | ✅ Full support |

All features used (`IntersectionObserver`, CSS custom properties, `fetch`, `localStorage`, `sessionStorage`) are supported in all modern browsers without polyfills.

---

## 8. Known Limitations

| Limitation | Reason | Future Fix |
|---|---|---|
| Contact form does not send emails | No backend or email service configured | Integrate EmailJS |
| Login is simulated | No real authentication backend | Add OAuth via GitHub |
| Projects are hardcoded in HTML | No CMS or database | Add a JSON data file or headless CMS |
| GitHub API rate-limited at 60 req/hr | Unauthenticated requests | Add a GitHub token via backend proxy |

---

## 9. Deployment

The application is deployed on **GitHub Pages** from the `main` branch root directory.

- **Live URL:** https://mohammedalroomi.github.io/202250760-MohammedAlroomi-assignment4/
- **Auto-deploys:** Every push to `main` triggers a new deployment
- **No build step required:** Pure static files, no compilation needed

---

*Mohammed Alroomi · 202250760 · SWE 363 · KFUPM · 2026*
