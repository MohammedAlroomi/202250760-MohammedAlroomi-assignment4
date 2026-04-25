# AI Usage Report

**Course:** SWE 363 – Web Application Development
**Student:** Mohammed Alroomi — 202250760
**Assignment:** Assignment 4 – Personal Portfolio Web Application

---

## 1. Tools Used & Use Cases

### Claude (Anthropic)
**Primary tool used throughout all four assignments.**

| Use Case | Description |
|---|---|
| Code Generation | Generated initial HTML structure, CSS layout patterns, and JavaScript feature functions (theme toggle, project filter, GitHub API integration, quote widget, login simulation) |
| Code Review & Debugging | Reviewed existing code for bugs, unused variables, and broken logic — particularly the filter state management and API fallback chain |
| Architecture Decisions | Suggested the single `projectState` object pattern for unified filter control, and the `IntersectionObserver` approach for lazy-loading the GitHub section |
| Innovation Features | Proposed and implemented the scroll progress bar, animated skill bars, and back-to-top button added in Assignment 4 |
| Documentation Support | Assisted in drafting README.md, this AI usage report, and technical-documentation.md |
| Performance Optimization | Identified opportunities to compress images, add `defer` to scripts, use `requestAnimationFrame` for scroll throttling, and add `loading="lazy"` to images |

### GitHub Copilot
| Use Case | Description |
|---|---|
| Inline Completion | Provided autocomplete suggestions while writing repetitive CSS rules (e.g., hover states, media queries) and JavaScript event listener patterns |
| Boilerplate Reduction | Suggested common patterns like `document.addEventListener('DOMContentLoaded', ...)` wrappers and `try/catch` blocks for API calls |

### ChatGPT (OpenAI)
| Use Case | Description |
|---|---|
| Concept Clarification | Used to understand how `IntersectionObserver` thresholds work and how `sessionStorage` differs from `localStorage` |
| API Response Structure | Helped decode the GitHub REST API and Quotable API JSON response shapes before writing the parsing logic |
| Alternative Approaches | Consulted for alternative ways to handle CSS theming (CSS variables vs. class swapping) before deciding on custom properties |

---

## 2. Benefits & Challenges

### Benefits

- **Speed:** Claude significantly reduced the time spent on boilerplate HTML and repetitive CSS, allowing more focus on logic and design decisions.
- **Quality:** Code review suggestions from Claude caught several issues — including missing `null` checks on `getElementById` calls and an unthrottled scroll event listener that would have hurt performance.
- **Learning acceleration:** Having an AI explain *why* a pattern is better (e.g., why `requestAnimationFrame` is preferred over raw `scroll` listeners) deepened understanding rather than just providing an answer.
- **Documentation:** Drafting structured markdown documentation was much faster with AI assistance, freeing time for actual development.

### Challenges

- **Over-generation:** Claude sometimes generated more code than needed, requiring careful trimming to avoid adding unnecessary complexity.
- **Hallucinated APIs:** ChatGPT once suggested a Quotable API endpoint that had been deprecated — requiring manual verification against the actual API documentation.
- **Context loss:** In long conversations, AI tools occasionally forgot earlier decisions (e.g., that the project uses vanilla JS, not React) and had to be corrected.
- **Blind trust risk:** Early in the project there was a temptation to accept AI code without fully reading it. This was corrected by establishing a habit of reviewing every suggestion line-by-line before applying it.

---

## 3. Learning Outcomes

- **CSS Custom Properties:** Learned how to build a complete design system using CSS variables, making theme switching a one-variable change rather than hunting for hardcoded colors across the stylesheet.
- **State Management without frameworks:** Gained a clear understanding of managing UI state using plain JavaScript objects, without relying on React or other libraries.
- **API Integration patterns:** Learned the importance of fallback chains — primary API → secondary API → static fallback — for resilient UI components that never break silently.
- **Performance fundamentals:** Understood practical performance techniques including `IntersectionObserver` for lazy loading, `requestAnimationFrame` for scroll events, `defer` for scripts, and image compression.
- **AI as a workflow tool:** Learned to treat AI as a thought partner and code reviewer, not a vending machine. The best results came from describing the problem clearly, evaluating the proposed solution critically, modifying it for the specific context, and understanding why it works — never just copy-pasting.

---

## 4. Responsible Use & Modifications

All AI-generated suggestions were treated as a starting point, not a final answer. The following practices were applied throughout:

1. **Line-by-line review:** Every block of AI-generated code was read in full before being added to the project, and comments were added to explain what it does and why.

2. **Modification before use:** Generic AI suggestions were adapted to fit the specific project context. For example, a generic theme-toggle snippet was modified to persist the user's preference in `localStorage` and update the toggle button icon dynamically.

3. **Manual testing:** Each feature was tested in the browser after implementation — not assumed to work because the AI said it would.

4. **No unmodified submission:** No AI output was submitted as-is. Every file in this repository reflects decisions made and understood by the student, with AI serving as an accelerator, not a replacement for learning.

5. **Transparency:** This report documents all AI tools used, the specific tasks they assisted with, and the limitations encountered — in full compliance with the SWE 363 academic integrity policy.

---

*This report was written by Mohammed Alroomi as part of Assignment 4 for SWE 363 at KFUPM.*
