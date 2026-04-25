# AI Usage Report

**Course:** SWE 363 – Web Application Development  
**Student:** Mohammed Alroomi — 202250760  
**Assignment:** Assignment 4 – Personal Portfolio Web Application  

---

## 1. Tools Used & Use Cases

Three AI tools were used during this assignment, each serving a distinct and deliberate role in the development workflow.

---

### 🤖 Claude (Anthropic) — Primary Development Assistant

Claude was the main AI tool used throughout all four assignments for hands-on development work.

| # | Use Case | Specific Example |
|---|---|---|
| 1 | **Code Generation** | Generated the full HTML semantic structure for the portfolio, including all sections (Hero, About, Skills, Projects, Experience, GitHub, Contact) with accessibility attributes like `aria-label` and `role` |
| 2 | **Feature Implementation** | Implemented the project filter system using a unified `projectState` object that manages category, skill level, and sort simultaneously — preventing filter conflicts |
| 3 | **Innovation Features** | Proposed and built 3 original features for Assignment 4: scroll progress bar (reading progress indicator), animated skill bars triggered by `IntersectionObserver`, and a scroll-aware back-to-top button |
| 4 | **Debugging** | Identified a critical bug where multiple scroll event listeners were being attached on every theme toggle — resolved by moving the listener outside the toggle function |
| 5 | **Performance Review** | Flagged unoptimized assets (Project1.webp at 167KB), suggested `loading="lazy"` on images, `defer` on scripts, `requestAnimationFrame` throttling for scroll events, and DNS prefetch for external APIs |
| 6 | **Code Review** | Reviewed JavaScript for missing null checks — caught 4 cases where `getElementById` would silently fail if an element wasn't present, causing uncaught runtime errors |
| 7 | **API Integration** | Built the GitHub Repos API integration with `IntersectionObserver`-based lazy loading, and the Quotable API quote widget with a two-tier fallback chain (Quotable → AdviceSlip → static message) |
| 8 | **Documentation** | Assisted in drafting the README, this AI usage report, and the technical documentation |

**How outputs were reviewed and modified:**  
Every suggestion from Claude was read line-by-line. Generic patterns were adapted — for example, a basic theme toggle was extended to persist state in `localStorage`, animate the toggle icon, and update ARIA attributes for accessibility. No Claude output was submitted unmodified.

---

### 💬 ChatGPT (OpenAI) — Concept Understanding

ChatGPT was used specifically to understand *why* certain approaches work, not to generate production code.

| # | Use Case | Specific Example |
|---|---|---|
| 1 | **Concept Explanation** | Used to understand the difference between `sessionStorage` and `localStorage` — specifically, which one clears on tab close and why that made `sessionStorage` the right choice for the login simulation |
| 2 | **API Structure** | Explained the GitHub REST API v3 response shape for `/users/:username/repos`, clarifying which fields (`name`, `description`, `html_url`, `language`, `stargazers_count`) were safe to access without optional chaining |
| 3 | **CSS Concepts** | Clarified how CSS `clamp()` works for fluid typography and why it's preferable to multiple breakpoints for font sizing alone |
| 4 | **IntersectionObserver** | Explained what the `threshold` option means — specifically that `0.3` means 30% of the element must be visible before the callback fires — helping fine-tune the skill bar animation timing |

**How outputs were reviewed and modified:**  
ChatGPT explanations were validated against MDN documentation before applying them. In one case, ChatGPT suggested a Quotable API endpoint that had changed — this was caught by testing manually and corrected before use.

---

### ⌨️ GitHub Copilot — Inline Code Completion

GitHub Copilot was used directly inside the code editor for real-time suggestions during active coding sessions.

| # | Use Case | Specific Example |
|---|---|---|
| 1 | **Repetitive CSS Patterns** | Autocompleted hover state rules, focus styles, and `@media` query blocks that follow consistent patterns across the stylesheet |
| 2 | **Event Listener Boilerplate** | Suggested `addEventListener` patterns with correct passive options (`{ passive: true }`) for scroll handlers, improving performance |
| 3 | **JavaScript Utility Functions** | Completed helper patterns such as debounce-style guards and `classList.toggle` chains when context made the intent clear |
| 4 | **Consistent Naming** | Helped maintain consistent variable naming by predicting names that matched existing conventions in the file (e.g., continuing `initTheme`, `initNavbar` naming for new `initSkillBars`, `initBackToTop`) |

**How outputs were reviewed and modified:**  
Copilot suggestions were accepted selectively — only when they matched exactly what was intended. Suggestions that added unnecessary complexity or deviated from the project's vanilla JS approach were rejected.

---

## 2. Benefits & Challenges

### ✅ Benefits

- **Development speed:** Claude reduced time spent on boilerplate significantly, allowing more focus on logic, UX decisions, and feature design.
- **Higher code quality:** AI-assisted code review surfaced real bugs (missing null checks, unthrottled scroll listeners, oversized images) that manual review might have missed.
- **Deeper understanding:** Using ChatGPT to understand concepts — rather than just copy solutions — meant that every feature implemented is one that can be explained and defended.
- **Consistent style:** GitHub Copilot helped maintain consistent naming conventions and code patterns across a growing codebase without constant manual reference.

### ⚠️ Challenges

- **Over-generation:** Claude occasionally generated more than needed — for example, suggesting a full React component when a small vanilla JS function was sufficient. Required deliberate trimming.
- **Outdated information:** ChatGPT once referenced a deprecated API endpoint. This reinforced the habit of always manually testing API calls before trusting AI-sourced documentation.
- **Context loss in long sessions:** Claude lost track of earlier architectural decisions in long conversations (e.g., forgetting the project is vanilla JS). Resolved by re-stating constraints at the start of each new session.
- **Copilot false confidence:** Copilot sometimes autocompleted incorrect logic that *looked* right syntactically but was semantically wrong. Each suggestion required conscious evaluation, not just Tab-acceptance.

---

## 3. Learning Outcomes

| Skill | What Was Learned |
|---|---|
| **CSS Design Systems** | How to use CSS custom properties to build a full design token system — one variable controls color everywhere, making dark/light mode a two-line change |
| **JavaScript State Management** | How to manage complex UI state (multi-dimensional filters) using a single plain JS object, without frameworks — a pattern directly transferable to React's `useState` |
| **API Resilience** | How to design API integrations that degrade gracefully — primary → fallback → static message — so no section ever appears broken to the user |
| **Performance Engineering** | Practical understanding of `IntersectionObserver`, `requestAnimationFrame`, `defer`, `loading="lazy"`, and image compression as a toolkit, not just buzzwords |
| **AI-Assisted Workflow** | The most valuable lesson: AI is most useful as a *reviewer and thought partner*, not a generator. The quality of output improves dramatically when you describe the problem clearly, evaluate the solution critically, and modify it for context — rather than accepting it blindly |

---

## 4. Responsible Use & Modifications

The following practices were maintained throughout the entire assignment to ensure academic integrity:

1. **Read before use:** Every AI-generated code block was read line-by-line and understood before being added to the project. Blocks that were not fully understood were not used.

2. **Always modify:** No AI output was submitted unchanged. Every suggestion was adapted to fit the project's specific context, naming conventions, and design decisions.

3. **Validate independently:** API suggestions from AI tools were verified against official documentation (GitHub API docs, MDN). Behavioral claims were verified by testing in the browser.

4. **Comment the why:** All non-obvious code in the project includes comments explaining *why* the approach was chosen — evidence that the logic is understood, not just copied.

5. **AI accelerates, not replaces:** Every feature in this portfolio — its logic, design, and integration — is something that can be fully explained and reproduced. AI helped build it faster; it did not build it instead.

---

*Mohammed Alroomi — 202250760 — SWE 363, KFUPM — Assignment 4, 2026*
