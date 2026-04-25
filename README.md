# Mohammed Alroomi — Personal Portfolio Web Application

**Student:** Mohammed Alroomi · **ID:** 202250760  
**Course:** SWE 363 – Web Application Development · **KFUPM**  
**Assignment:** 4 – Final Portfolio

---

## 🌐 Live Demo

**[https://mohammedalroomi.github.io/202250760-MohammedAlroomi-assignment4/](https://mohammedalroomi.github.io/202250760-MohammedAlroomi-assignment4/)**

---

## 📋 Project Description

A complete, polished, and fully deployed personal portfolio web application built from scratch using HTML5, CSS3, and vanilla JavaScript — no frameworks. The portfolio showcases my background as a Software Engineering student at KFUPM, featuring real API integrations, interactive UI components, and responsive design that works on any screen size.

The project was developed incrementally across four assignments, with each iteration adding new features, refining the design, and improving code quality. This final version (Assignment 4) represents a production-ready web application.

### What's Inside

| Section | Description |
|---|---|
| **Hero** | Personalised greeting, site timer, inspirational quote widget (API) |
| **About** | Background, university info, and status |
| **Skills** | Animated skill bars for languages and tools |
| **Projects** | Filterable project cards with category, skill level, and sort controls |
| **Experience** | Work experience and achievements |
| **GitHub** | Live repos pulled from the GitHub API |
| **Contact** | Validated contact form with success/error feedback |

---

## ✨ Features

- 🌓 **Dark / Light Theme** — toggles instantly, persists across sessions via `localStorage`
- 🔍 **Project Filter & Sort** — filter by category and skill level, sort by name or date
- 💬 **Quote Widget** — fetches live inspirational quotes with a two-tier API fallback
- 📁 **GitHub Repos** — lazy-loads your public repos live from the GitHub REST API
- 🔒 **Login Simulation** — demonstrates sessionStorage-based state management
- 📊 **Animated Skill Bars** — fill on scroll using `IntersectionObserver`
- 📈 **Scroll Progress Bar** — reading progress indicator at the top of the page
- ⬆️ **Back to Top Button** — appears after scrolling 400px
- ⏱ **Site Timer** — real-time counter showing time spent on the page
- 📱 **Fully Responsive** — tested on mobile, tablet, and desktop

---

## 🚀 How to Run Locally

### Option 1 — Open directly (simplest)

```bash
# 1. Clone the repository
git clone https://github.com/MohammedAlroomi/202250760-MohammedAlroomi-assignment4.git

# 2. Navigate into the folder
cd 202250760-MohammedAlroomi-assignment4

# 3. Open index.html in your browser
open index.html          # macOS
start index.html         # Windows
xdg-open index.html      # Linux
```

### Option 2 — Use a local server (recommended)

Using a local server avoids any browser restrictions on local file access for the APIs.

**With VS Code Live Server:**
1. Install the [Live Server extension](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer)
2. Right-click `index.html` → **Open with Live Server**

**With Python:**
```bash
# Python 3
python -m http.server 8000
# Then open http://localhost:8000
```

**With Node.js:**
```bash
npx serve .
# Then open the URL shown in the terminal
```

### Requirements

- Any modern browser (Chrome, Firefox, Safari, Edge)
- Internet connection — required for the GitHub API and Quote API to load
- No build tools, no package installation needed

---

## 🗂 Project Structure

```
202250760-MohammedAlroomi-assignment4/
├── index.html                  # Main application — all sections
├── css/
│   └── styles.css              # All styles — custom properties, responsive design
├── js/
│   └── script.js               # All JavaScript — 16 documented functions
├── assets/
│   └── images/
│       ├── Project1.webp       # Data Science project thumbnail
│       ├── Project2.jpeg       # AI project thumbnail
│       └── Project3.jpeg       # Database project thumbnail
├── docs/
│   ├── ai-usage-report.md      # Full AI tool usage documentation
│   └── technical-documentation.md  # Architecture and technical details
├── presentation/
│   ├── slides.pdf              # 12-slide presentation deck
│   └── demo-video.mp4          # Video walkthrough (5–7 minutes)
├── README.md                   # This file
└── .gitignore
```

---

## 🏗 Technical Architecture

The application is built as a single-page application (SPA) using pure web fundamentals:

- **HTML5** — Semantic markup with accessibility attributes (`aria-label`, `role`, `alt`)
- **CSS3** — Design token system using custom properties (`--accent`, `--bg-primary`, etc.), Flexbox and Grid layouts, 3 responsive breakpoints (640px, 820px, 900px)
- **JavaScript (ES6+)** — 16 modular functions, each handling a single feature. Zero external dependencies.

### External APIs Used

| API | Purpose | Fallback |
|---|---|---|
| [GitHub REST API v3](https://docs.github.com/en/rest) | Fetch public repositories | Error message with retry |
| [Quotable API](https://quotable.io) | Inspirational quotes | AdviceSlip API → static message |

### Performance Optimisations

- Images use `loading="lazy"` to defer off-screen loads
- Script tag uses `defer` to avoid blocking HTML parsing
- Scroll events throttled with `requestAnimationFrame`
- GitHub repos section lazy-loaded with `IntersectionObserver`
- `dns-prefetch` hints for all external API domains
- Project1.webp compressed from 167KB → 38KB (77% reduction)

---

## 🤖 AI Tools Used

| Tool | Role |
|---|---|
| **Claude (Anthropic)** | Primary development assistant — code generation, debugging, architecture, and documentation |
| **ChatGPT (OpenAI)** | Concept understanding — API structures, CSS concepts, browser APIs |
| **GitHub Copilot** | Inline code completion — CSS patterns, event listener boilerplate |

> Full details, use cases, benefits, challenges, and responsible use practices are documented in [`docs/ai-usage-report.md`](docs/ai-usage-report.md)

---

## 🎬 Demo Video

> 📎 **[Watch the demo video here](#)** ← *(replace with your video link after upload)*

---

## 📄 Documentation

| Document | Description |
|---|---|
| [`docs/ai-usage-report.md`](docs/ai-usage-report.md) | Full AI tool usage log |
| [`docs/technical-documentation.md`](docs/technical-documentation.md) | Architecture and technical deep-dive |
| [`presentation/slides.pdf`](presentation/slides.pdf) | 12-slide presentation deck |

---

## 👤 Author

**Mohammed Alroomi**  
Software Engineering Student — KFUPM  
📧 mohammedalroomi@gmail.com  
🐙 [github.com/MohammedAlroomi](https://github.com/MohammedAlroomi)

---

*SWE 363 – Web Application Development · KFUPM · 2026*
