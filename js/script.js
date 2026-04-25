/**
 * script.js – Mohammed Alroomi Portfolio
 * SWE 363 | KFUPM | 2026
 * Assignment 4 – Final Portfolio
 *
 * Features built across Assignments 1–4:
 *  A. API Integration
 *     1. Inspirational Quotes  — api.quotable.io with adviceslip fallback
 *     2. GitHub Repositories   — api.github.com (lazy-loaded via IntersectionObserver)
 *
 *  B. Complex Logic
 *     3. Filter + Skill Level + Sort — unified state drives all three simultaneously
 *     4. Contact form extra validation — already present, preserved
 *     5. Skill-level conditional content — Beginner / Intermediate / Advanced
 *     6. Site timer — counts seconds the visitor has spent on the page
 *
 *  C. State Management
 *     7. Dark / Light theme toggle   — persisted in localStorage
 *     8. Visitor name greeting       — persisted in localStorage
 *     9. Login / Logout simulation   — persisted in sessionStorage; reveals private panel
 *    10. Filter / sort / skill state — in-memory; reapplied on every interaction
 *
 *  D. Performance
 *    11. GitHub section lazy-loaded (IntersectionObserver — only fetches when in view)
 *    12. Scroll handler throttled with requestAnimationFrame
 *    13. Images have loading="lazy" + decoding="async" (set in HTML)
 *    14. Script loaded with defer (set in HTML)
 *    15. DNS prefetch hints for external APIs (set in HTML)
 */

/* ============================================================
   1. TIME-BASED GREETING
   ============================================================ */
function setGreeting(name) {
  const greetingEl = document.getElementById('greeting');
  if (!greetingEl) return;

  const hour = new Date().getHours();
  let timeGreeting;

  if      (hour >= 5  && hour < 12) timeGreeting = '☀️ Good morning';
  else if (hour >= 12 && hour < 17) timeGreeting = '🌤️ Good afternoon';
  else if (hour >= 17 && hour < 21) timeGreeting = '🌆 Good evening';
  else                               timeGreeting = '🌙 Good night';

  greetingEl.textContent = name ? `${timeGreeting}, ${name}!` : timeGreeting;
}

/* ============================================================
   2. PERSONALISED GREETING INPUT
      Saves name to localStorage so it persists across page loads.
   ============================================================ */
/* Reads the visitor's saved name from localStorage, populates the input
   field, updates the greeting text, and watches for live changes. */
function initPersonalisedGreeting() {
  const input    = document.getElementById('visitorName');
  const clearBtn = document.getElementById('greetingClear');
  if (!input) return;

  const savedName = localStorage.getItem('visitorName') || '';
  if (savedName) {
    input.value = savedName;
    setGreeting(savedName);
  }

  input.addEventListener('input', () => {
    const name = input.value.trim();
    setGreeting(name);
    name
      ? localStorage.setItem('visitorName', name)
      : localStorage.removeItem('visitorName');
  });

  clearBtn?.addEventListener('click', () => {
    input.value = '';
    setGreeting('');
    localStorage.removeItem('visitorName');
    input.focus();
  });
}

/* ============================================================
   3. DARK / LIGHT THEME TOGGLE
      Preference saved to localStorage.
   ============================================================ */
/* Initialises the dark/light theme by reading the saved preference from
   localStorage and attaching the toggle button click handler. */
function initTheme() {
  const toggle    = document.getElementById('themeToggle');
  const themeIcon = toggle?.querySelector('.theme-icon');

  const saved = localStorage.getItem('theme') || 'dark';
  applyTheme(saved);

  toggle?.addEventListener('click', () => {
    const isDark = document.body.classList.contains('dark-theme');
    applyTheme(isDark ? 'light' : 'dark');
  });

  /* Applies the given theme ('dark' or 'light') to the document and
     updates the toggle button icon accordingly. */
  function applyTheme(theme) {
    document.body.classList.remove('dark-theme', 'light-theme');
    document.body.classList.add(theme + '-theme');
    localStorage.setItem('theme', theme);
    if (themeIcon) themeIcon.textContent = theme === 'dark' ? '☀️' : '🌙';
  }
}

/* ============================================================
   4. PROJECT STATE — unified store for category, skill level, and sort
      applyProjectState() is the single function that reads all three
      dimensions and updates the DOM accordingly.
   ============================================================ */
const projectState = {
  category: 'all',   // 'all' | 'data-science' | 'ai' | 'database'
  skill:    'all',   // 'all' | 'beginner' | 'intermediate' | 'advanced'
  sort:     'default' // 'default' | 'name-asc' | 'name-desc' | 'date-asc' | 'date-desc'
};

/**
 * Reads projectState and:
 *   1. Shows / hides each card based on category AND skill level
 *   2. Re-orders visible cards inside the grid based on sort value
 *   3. Toggles the empty-state message
 */
/* Reads the current projectState (category, skill, sort) and re-renders
   the project grid, showing only cards that match all active filters. */
function applyProjectState() {
  const cards      = Array.from(document.querySelectorAll('.project-card'));
  const grid       = document.getElementById('projectsGrid');
  const emptyState = document.getElementById('emptyState');

  // ── Step 1: Filter ──────────────────────────────────────────
  const visible = [];
  cards.forEach(card => {
    const catMatch   = projectState.category === 'all' || card.dataset.category === projectState.category;
    const skillMatch = projectState.skill    === 'all' || card.dataset.level    === projectState.skill;
    const show       = catMatch && skillMatch;
    card.classList.toggle('hidden', !show);
    if (show) visible.push(card);
  });

  // ── Step 2: Empty state ─────────────────────────────────────
  if (emptyState) emptyState.hidden = visible.length > 0;

  // ── Step 3: Sort visible cards ──────────────────────────────
  if (projectState.sort !== 'default' && grid && visible.length > 1) {
    visible.sort((a, b) => {
      switch (projectState.sort) {
        case 'name-asc':
          return (a.dataset.name || '').localeCompare(b.dataset.name || '');
        case 'name-desc':
          return (b.dataset.name || '').localeCompare(a.dataset.name || '');
        case 'date-asc':
          return new Date(a.dataset.date || 0) - new Date(b.dataset.date || 0);
        case 'date-desc':
          return new Date(b.dataset.date || 0) - new Date(a.dataset.date || 0);
        default:
          return 0;
      }
    });
    // Re-append in sorted order without full re-render
    visible.forEach(card => grid.appendChild(card));
  }
}

/* ── Category filter buttons ── */
function initProjectFilter() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  if (!filterBtns.length) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      projectState.category = btn.dataset.filter;
      applyProjectState();
    });
  });
}

/* ── COMPLEX LOGIC: Sort select ── */
function initProjectSort() {
  const sortSelect = document.getElementById('sortSelect');
  if (!sortSelect) return;

  sortSelect.addEventListener('change', () => {
    projectState.sort = sortSelect.value;
    applyProjectState();
  });
}

/* ── COMPLEX LOGIC: Skill-level filter ──
   Shows different project sets depending on user's experience level.
   Works simultaneously with the category filter — a card is visible
   only if it matches BOTH the active category AND the active skill level.
   ────────────────────────────────────────────────────────────────────── */
/* Sets up the skill-level filter dropdown and wires its change event
   to update projectState and re-apply the project filter. */
function initSkillFilter() {
  const skillBtns = document.querySelectorAll('.skill-btn');
  if (!skillBtns.length) return;

  skillBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      skillBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      projectState.skill = btn.dataset.skill;
      applyProjectState();
    });
  });
}

/* ============================================================
   5. NAVBAR SCROLL BEHAVIOUR
      Throttled with requestAnimationFrame for performance.
   ============================================================ */
/* Adds a 'scrolled' class to the navbar when the page scrolls past 50px,
   triggering the compact/sticky navbar styles. */
function initNavbar() {
  const navbar = document.getElementById('navbar');
  if (!navbar) return;

  let ticking = false;

  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        navbar.style.boxShadow = window.scrollY > 60
          ? '0 2px 24px rgba(0,0,0,0.3)'
          : 'none';
        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });
}

/* ============================================================
   6. HAMBURGER MOBILE MENU
   ============================================================ */
function initHamburger() {
  const hamburger = document.getElementById('hamburger');
  const navLinks  = document.querySelector('.nav-links');
  if (!hamburger || !navLinks) return;

  hamburger.addEventListener('click', () => navLinks.classList.toggle('open'));
  navLinks.querySelectorAll('a').forEach(link =>
    link.addEventListener('click', () => navLinks.classList.remove('open'))
  );
}

/* ============================================================
   7. SMOOTH SCROLLING
   ============================================================ */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });
}

/* ============================================================
   8. SCROLL FADE-IN ANIMATIONS
   ============================================================ */
function initScrollAnimations() {
  const targets = document.querySelectorAll(
    '.project-card, .about-grid, .contact-wrapper, .section-title, .exp-card, .achievement-badge, .skills-category'
  );

  targets.forEach(el => el.classList.add('fade-in'));

  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  targets.forEach(el => observer.observe(el));
}

/* ============================================================
   9. CONTACT FORM VALIDATION
      Multi-step checks: required → format → length
   ============================================================ */
/* Attaches a submit handler to the contact form. Validates all fields,
   shows inline error messages, and displays a success banner on pass. */
function initContactForm() {
  const form       = document.getElementById('contactForm');
  const nameInput  = document.getElementById('name');
  const emailInput = document.getElementById('email');
  const msgInput   = document.getElementById('message');
  const nameError  = document.getElementById('nameError');
  const emailError = document.getElementById('emailError');
  const msgError   = document.getElementById('messageError');
  const successBox = document.getElementById('formSuccess');

  if (!form) return;

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  /* Validates name (non-empty), email (regex), and message (min 10 chars).
     Returns true only if all three pass; otherwise shows error messages. */
  function validate() {
    let valid = true;

    // Name: required
    if (!nameInput.value.trim()) {
      nameError.textContent = 'Please enter your name.';
      valid = false;
    } else {
      nameError.textContent = '';
    }

    // Email: required + format check
    if (!emailInput.value.trim()) {
      emailError.textContent = 'Please enter your email address.';
      valid = false;
    } else if (!emailRegex.test(emailInput.value.trim())) {
      emailError.textContent = 'Please enter a valid email address.';
      valid = false;
    } else {
      emailError.textContent = '';
    }

    // Message: required + minimum length
    if (!msgInput.value.trim()) {
      msgError.textContent = 'Please enter a message.';
      valid = false;
    } else if (msgInput.value.trim().length < 10) {
      msgError.textContent = 'Message must be at least 10 characters.';
      valid = false;
    } else {
      msgError.textContent = '';
    }

    return valid;
  }

  form.addEventListener('submit', e => {
    e.preventDefault();
    if (validate()) {
      successBox.classList.add('visible');
      form.reset();
      setTimeout(() => successBox.classList.remove('visible'), 5000);
    }
  });

  // Validate individual fields on blur for instant feedback
  [nameInput, emailInput, msgInput].forEach(input =>
    input.addEventListener('blur', validate)
  );
}

/* ============================================================
   10. API INTEGRATION — INSPIRATIONAL QUOTES
       Primary:  api.quotable.io/quotes/random  (author + text)
       Fallback: api.adviceslip.com/advice       (text only)
       Shows loading state, error message, and a refresh button.
   ============================================================ */
async function fetchQuote() {
  const textEl     = document.getElementById('quoteText');
  const authorEl   = document.getElementById('quoteAuthor');
  const errorEl    = document.getElementById('quoteError');
  const refreshBtn = document.getElementById('quoteRefresh');

  if (!textEl) return;

  // Show loading state
  textEl.style.opacity = '0.4';
  textEl.textContent   = 'Loading…';
  if (authorEl)   authorEl.textContent = '';
  if (errorEl)    errorEl.hidden = true;
  if (refreshBtn) refreshBtn.disabled  = true;

  try {
    // Attempt primary source — quotable.io (includes author attribution)
    const res = await fetch('https://api.quotable.io/quotes/random', { cache: 'no-cache' });

    if (res.ok) {
      const data = await res.json();
      // API returns an array with one item
      const item  = Array.isArray(data) ? data[0] : data;
      textEl.textContent  = `"${item.content}"`;
      if (authorEl) authorEl.textContent = `— ${item.author}`;

    } else {
      // Primary unavailable — fall back to adviceslip
      throw new Error('quotable unavailable');
    }

  } catch {
    // Fallback to advice slip API
    try {
      const res  = await fetch('https://api.adviceslip.com/advice', { cache: 'no-cache' });
      if (!res.ok) throw new Error('both APIs failed');
      const data = await res.json();
      textEl.textContent  = `"${data.slip.advice}"`;
      if (authorEl) authorEl.textContent = '';

    } catch {
      // Both APIs failed — show user-friendly error
      textEl.textContent = '';
      if (errorEl) errorEl.hidden = false;
    }
  } finally {
    textEl.style.opacity = '1';
    if (refreshBtn) refreshBtn.disabled = false;
  }
}

/* Fetches an inspirational quote from the Quotable API. Falls back to
   AdviceSlip if the primary call fails, then shows a static message. */
function initQuoteWidget() {
  const refreshBtn = document.getElementById('quoteRefresh');
  fetchQuote();  // Load on page open
  refreshBtn?.addEventListener('click', fetchQuote);
}

/* ============================================================
   11. API INTEGRATION — GITHUB REPOSITORIES
       Fetches the 6 most-recently-updated public repos.
       Lazy-loaded: the API call only fires when the GitHub
       section scrolls into view, saving bandwidth for visitors
       who never reach that section.
   ============================================================ */

/** Maps programming language names to their canonical dot colours */
const LANG_COLORS = {
  JavaScript: '#f1e05a', TypeScript: '#3178c6', Python:  '#3572A5',
  HTML:       '#e34c26', CSS:        '#563d7c', Java:    '#b07219',
  'C++':      '#f34b7d', C:          '#555555', Ruby:    '#701516',
  Go:         '#00ADD8', Rust:       '#dea584', Swift:   '#fa7343',
  Kotlin:     '#A97BFF', PHP:        '#4F5D95', Shell:   '#89e051',
  Jupyter:    '#DA5B0B', R:          '#198CE7'
};

/** Safely escapes HTML to prevent XSS when inserting API data */
function escapeHTML(str) {
  const el = document.createElement('div');
  el.textContent = String(str);
  return el.innerHTML;
}

/** Builds a single repo card DOM element from a GitHub repo object */
function buildRepoCard(repo) {
  const card = document.createElement('div');
  card.className = 'github-repo-card fade-in';

  const updated   = new Date(repo.updated_at);
  const dateLabel = updated.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
  const langColor = LANG_COLORS[repo.language] || '#9090a0';

  card.innerHTML = `
    <div class="repo-header">
      <span class="repo-folder-icon">📁</span>
      <a class="repo-name"
         href="${escapeHTML(repo.html_url)}"
         target="_blank"
         rel="noopener noreferrer"
         title="Open ${escapeHTML(repo.name)} on GitHub">
        ${escapeHTML(repo.name)}
      </a>
      ${repo.fork ? '<span class="repo-badge repo-fork">Fork</span>' : ''}
    </div>
    <p class="repo-desc">${escapeHTML(repo.description || 'No description provided.')}</p>
    <div class="repo-footer">
      ${repo.language ? `
        <span class="repo-lang">
          <span class="lang-dot" style="background:${langColor};" aria-hidden="true"></span>
          ${escapeHTML(repo.language)}
        </span>
      ` : ''}
      <span class="repo-stat" title="Stars">⭐ ${repo.stargazers_count}</span>
      <span class="repo-stat" title="Forks">🍴 ${repo.forks_count}</span>
      <span class="repo-updated">${dateLabel}</span>
    </div>
  `;

  return card;
}

/** Fetches repos and populates the grid */
async function fetchGitHubRepos() {
  const grid       = document.getElementById('githubReposGrid');
  const loading    = document.getElementById('githubLoading');
  const errorEl    = document.getElementById('githubError');
  const footerLink = document.getElementById('githubFooterLink');

  if (!grid) return;

  try {
    const res = await fetch(
      'https://api.github.com/users/MohammedAlroomi/repos?sort=updated&per_page=6&type=public',
      { headers: { 'Accept': 'application/vnd.github.v3+json' } }
    );

    if (!res.ok) throw new Error(`GitHub API responded with ${res.status}`);

    const repos = await res.json();

    // Remove the loading indicator
    loading?.remove();

    if (!Array.isArray(repos) || repos.length === 0) {
      grid.innerHTML = '<p class="no-repos">No public repositories found.</p>';
      return;
    }

    // Insert repo cards into the grid
    const observer = new IntersectionObserver(
      entries => entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      }),
      { threshold: 0.1 }
    );

    repos.forEach(repo => {
      const card = buildRepoCard(repo);
      grid.appendChild(card);
      observer.observe(card);  // Animate each card as it enters view
    });

    // Show "View All" link once data is loaded
    if (footerLink) footerLink.hidden = false;

  } catch (err) {
    console.error('[GitHub API]', err);
    loading?.remove();
    if (errorEl) errorEl.hidden = false;
  }
}

/**
 * Sets up an IntersectionObserver on the GitHub section.
 * The API call only fires when the section enters the viewport —
 * this avoids an unnecessary network request for visitors who
 * don't scroll that far (a small but meaningful perf win).
 */
/* Uses IntersectionObserver to lazy-load the GitHub repos section.
   Fetches public repos from the GitHub REST API and renders repo cards. */
function initGitHubRepos() {
  const section = document.getElementById('github');
  if (!section) return;

  const sectionObserver = new IntersectionObserver(
    (entries, obs) => {
      if (entries[0].isIntersecting) {
        fetchGitHubRepos();
        obs.disconnect();  // Fetch once, then stop observing
      }
    },
    { threshold: 0.05 }
  );

  sectionObserver.observe(section);
}

/* ============================================================
   12. COMPLEX LOGIC — SITE TIMER
       Increments every second and displays a human-readable
       elapsed time (0s → 59s → 1m 00s → …).
       Demonstrates a timer/counter as required by the brief.
   ============================================================ */
/* Starts a real-time counter that shows how long the visitor has been
   on the page. Updates every second using requestAnimationFrame. */
function initSiteTimer() {
  const display = document.getElementById('timerDisplay');
  if (!display) return;

  const startTime = Date.now();

  function tick() {
    const elapsed = Math.floor((Date.now() - startTime) / 1000);
    const mins    = Math.floor(elapsed / 60);
    const secs    = elapsed % 60;

    display.textContent = mins > 0
      ? `${mins}m ${String(secs).padStart(2, '0')}s`
      : `${elapsed}s`;
  }

  tick();
  setInterval(tick, 1000);
}

/* ============================================================
   13. STATE MANAGEMENT — LOGIN / LOGOUT SIMULATION
       Saves login state to sessionStorage so it persists across
       page refreshes within the same browser tab.
       On login:
         • Adds .logged-in to body (used by CSS for hero padding)
         • Shows the welcome bar with the visitor's name
         • Reveals the private-panel section
       On logout:
         • All of the above is reversed
   ============================================================ */
/* Simulates a login/logout flow using sessionStorage. Persists the
   visitor's name across the session and shows a personalised welcome bar. */
function initLoginSimulation() {
  const loginBtn     = document.getElementById('loginBtn');
  const loginLabel   = document.getElementById('loginLabel');
  const loginIcon    = document.getElementById('loginIcon');
  const welcomeBar   = document.getElementById('userWelcomeBar');
  const welcomeName  = document.getElementById('welcomeName');
  const dismissBtn   = document.getElementById('welcomeBarDismiss');
  const privatePanel = document.getElementById('privateSection');

  if (!loginBtn) return;

  // ── Restore session on page load ──────────────────────────
  if (sessionStorage.getItem('loggedIn') === 'true') {
    applyLogin(sessionStorage.getItem('loginName') || 'Visitor');
  }

  // ── Login / Logout toggle ─────────────────────────────────
  loginBtn.addEventListener('click', () => {
    if (sessionStorage.getItem('loggedIn') === 'true') {
      logout();
    } else {
      // Use the visitor name they typed, or a generic default
      const name = (document.getElementById('visitorName')?.value.trim()) || 'Visitor';
      sessionStorage.setItem('loggedIn', 'true');
      sessionStorage.setItem('loginName', name);
      applyLogin(name);
    }
  });

  // Dismiss button in the welcome bar also triggers logout
  dismissBtn?.addEventListener('click', logout);

  // ── Helpers ───────────────────────────────────────────────
  function applyLogin(name) {
    document.body.classList.add('logged-in');
    if (loginLabel)   loginLabel.textContent   = 'Logout';
    if (loginIcon)    loginIcon.textContent    = '🔒';
    if (welcomeName)  welcomeName.textContent  = name;
    if (welcomeBar)   welcomeBar.hidden        = false;
    if (privatePanel) privatePanel.hidden      = false;
  }

  /* Clears the login session state from sessionStorage, hides the
     welcome bar, and resets the login button to its logged-out state. */
  function logout() {
    sessionStorage.removeItem('loggedIn');
    sessionStorage.removeItem('loginName');
    document.body.classList.remove('logged-in');
    if (loginLabel)   loginLabel.textContent   = 'Login';
    if (loginIcon)    loginIcon.textContent    = '🔓';
    if (welcomeBar)   welcomeBar.hidden        = true;
    if (privatePanel) privatePanel.hidden      = true;
  }
}

/* ============================================================
   INIT — Run everything once the DOM is fully parsed.
          (Script is loaded with defer, so DOMContentLoaded
           fires immediately after defer scripts execute.)
   ============================================================ */
/* ============================================================
   INNOVATION 1: SCROLL PROGRESS BAR
   Updates the width of the fixed bar at the top of the page
   as the user scrolls — gives a clear sense of reading progress.
   ============================================================ */
/* INNOVATION 1: Calculates scroll progress as a percentage and updates
   the width of the fixed progress bar at the top of the page. */
function initScrollProgressBar() {
  const bar = document.getElementById('scrollProgressBar');
  if (!bar) return;

  window.addEventListener('scroll', () => {
    const scrollTop    = window.scrollY;
    const docHeight    = document.documentElement.scrollHeight - window.innerHeight;
    const progress     = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    bar.style.width    = progress + '%';
  }, { passive: true });
}

/* ============================================================
   INNOVATION 2: ANIMATED SKILL BARS
   Uses IntersectionObserver to trigger a smooth fill animation
   only when the skills section enters the viewport.
   ============================================================ */
/* INNOVATION 2: Observes each skill bar with IntersectionObserver and
   animates its width from 0% to the target value when it enters the viewport. */
function initSkillBars() {
  const fills = document.querySelectorAll('.skill-bar-fill');
  if (!fills.length) return;

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const fill      = entry.target;
        const targetW   = fill.dataset.width || '0';
        fill.style.width = targetW + '%';
        observer.unobserve(fill);   // Animate once, then stop watching
      }
    });
  }, { threshold: 0.3 });

  fills.forEach(fill => observer.observe(fill));
}

/* ============================================================
   INNOVATION 3: BACK TO TOP BUTTON
   Appears after the user scrolls 400px and smoothly scrolls
   back to the top of the page when clicked.
   ============================================================ */
/* INNOVATION 3: Shows a floating back-to-top button after the user
   scrolls 400px, and smoothly scrolls to the top when clicked. */
function initBackToTop() {
  const btn = document.getElementById('backToTop');
  if (!btn) return;

  window.addEventListener('scroll', () => {
    btn.hidden = window.scrollY < 400;
  }, { passive: true });

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

document.addEventListener('DOMContentLoaded', () => {

  /* ── Core features (carried over from Assignment 2) ── */
  setGreeting();               // Time-based greeting (no name yet)
  initPersonalisedGreeting();  // Name input + localStorage
  initTheme();                 // Theme toggle + localStorage
  initProjectFilter();         // Category filter (now uses unified state)
  initNavbar();                // Navbar scroll shadow (throttled via rAF)
  initHamburger();             // Mobile hamburger menu
  initSmoothScroll();          // Smooth anchor scrolling
  initScrollAnimations();      // Fade-in on scroll
  initContactForm();           // Form validation (multi-step)

  /* ── Features refined and finalized in Assignment 4 ── */
  initProjectSort();           // Sort dropdown — works with filter
  initSkillFilter();           // Skill-level filter — works with category + sort
  initSiteTimer();             // Real-time on-page counter
  initLoginSimulation();       // Login / logout state management
  initQuoteWidget();           // Inspirational quotes API
  initGitHubRepos();           // GitHub repos API (lazy-loaded)

  /* ── Innovation features added in Assignment 4 ── */
  initScrollProgressBar();     // Reading progress bar at top of page
  initSkillBars();             // Animated skill bars on scroll
  initBackToTop();             // Back-to-top floating button

  console.log('%c Mohammed Alroomi | Portfolio', 'color: #00d4aa; font-size: 14px; font-weight: bold;');
  console.log('%c Assignment 4 – Final Portfolio | SWE 363 | KFUPM', 'color: #9090a0;');
});
