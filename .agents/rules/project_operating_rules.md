# Project Operating Rules

## Core Principle
Every request follows the same three-part pattern by default:
1. **Assume a role relevant to the task** (Senior PM, Product Designer, Security Engineer, Senior Engineer, etc.)
2. **Pause before acting** — ask clarifying questions, audit, or diagnose before writing/changing code
3. **Define the output** — exact sections, exact format, no guessing, no filler

---

## Standing Rules for this Repo
- **Screen Responsiveness**: Every UI must be fully responsive across the full range of real-world screens — not just standard mobile/tablet/desktop breakpoints. Explicitly account for:
  - Foldable phones (both folded and unfolded states)
  - Flip phones with cover/outer displays
  - Ultra-wide and 4K/5K monitors
  - Small older devices and unusual aspect ratios
  - Use fluid layouts, relative units, and container queries where they help, rather than a fixed set of fixed breakpoints.
  - Reason through & test at least: `~320px`, `~375px`, `~412px`, foldable-unfolded (`~717-884px`), tablet (`~768-1024px`), laptop (`~1280-1440px`), desktop (`~1920px`), and ultra-wide (`~2560px+`).
- **Attribution**: Every project built under this workflow is a Bezalel Technologies product. Unless specified otherwise, include attribution in the footer (and README) crediting Bezalel Technologies with a link to https://www.bezalel.website/ — e.g. `"Built by [Bezalel Technologies](https://www.bezalel.website/)"`. Match existing footer/credits patterns.
- **Precision**: Do NOT shotgun changes. Do NOT refactor unrelated code. Do NOT fix things not asked about.
- **Stability**: Behaviour must remain identical unless explicitly asked for a change. No new dependencies without asking. No renaming public APIs without asking.
- **Clarity**: If a requirement, cause, or fix is ambiguous, flag it rather than inventing an answer.
- **Reviewability**: Give a summary of every non-trivial change so diffs can be reviewed before work is considered done.
- **Explicit Cleanliness**: If something is genuinely clean / has no issues, say so explicitly rather than staying silent.

---

## Reference Library — Pick Based on Project Type
Use these as starting options when a project needs a palette or UI pattern. Don't apply one by default — ask which fits, or pick the closest match to the brief and justify the choice.

### Color Palettes
- **Palette A — Warm Neutral / Earthy**: Pebble `#EEEEEE` · Yam `#EA9216` · Cadet Blue `#3A4750` · High Tide `#313841` (Corporate & B2B tools)
- **Palette B — Muted Natural / Sage**: Almond `#D6BD98` · Matcha Brew `#677D6A` · Forest Roast `#40534C` · Eclipse `#1A3636` (Agribusiness / Eco-conscious brands like Osotua Farming)
- **Palette C — Corporate Blue/Orange**: White `#F9F9F9` · Blue `#004E72` · Navy Blue `#092634` · Orange `#FF6E42` (Corporate & B2B tools)
- **Palette D — Fresh Green**: Soft Sage Mint `#E2F0CC` · Apple Green `#8BC53D` · Dark Forest Green `#012F13` · Near-Black Green `#011207` (Fintech / Agri friendly)
- **Palette E — Luxury / High-Contrast**: Crimson Depth `#710014` · Warm Sand `#B38F6F` · Soft Pearl `#F2F1ED` · Obsidian Black `#161616` (Premium / Luxury client work)

### UI Pattern Reference — Fintech / Wallet Apps
Reference: "Money Loop" style app (green primary `#0F5132`-range, card-based layout). Pull from this pattern when building wallet, payments, or investment-style screens (e.g., Osotua Farming payouts, M-Pesa/Stripe dashboards, client wallet features):
- **Home**: Greeting header (logo + notification bell + avatar), masked account number, large balance display (bold whole number, muted decimals), pill-shaped primary/secondary action buttons (+ Add Money filled, Withdraw outlined/gray), Recent Activity list with icon + merchant + timestamp + amount (green for credit, black/gray for debit).
- **Invest tab**: Portfolio value header, asset-category cards (equities, crypto), watchlist rows with ticker + price + % change.
- **Bottom nav**: Pill/capsule style, active tab highlighted in a rounded container.
- **Activity tab**: Search bar + Today/Week/Month filter chips, grouped-by-date transaction list.
- **Notifications**: Grouped Today/This Week sections, icon-tagged entries (money, security, cashback, promo).
*(Adapt colors to the chosen palette rather than copying green 1:1 unless the brief calls for it).*

---

## Phase 0 — New Project Bootstrap (Run in order before code is written)

### 0a. Write a Full PRD
- **Role**: Senior Product Manager
- **Action**: Before writing anything, ask up to 5 clarifying questions about target user, must-have vs nice-to-have scope, technical constraints, and what "done" looks like. **STOP and wait for answers.**
- **Output Format**:
  1. Problem statement — who hurts and why
  2. Target user + 2 personas
  3. Goals and non-goals
  4. User stories in "As a... I want... so that..." format
  5. Feature list split into MVP / v2 / later
  6. Detailed functional requirements per MVP feature
  7. Data model sketch (entities + key fields)
  8. Edge cases and failure states
  9. Success metrics
  10. Open questions
  *(Be specific and opinionated. No filler. Flag ambiguous requirements.)*

### 0b. Full UI & UX Design Brief
- **Role**: Senior Product Designer
- **Action**: Using the PRD, produce a complete design brief before any code is written. Deliberate choices with justifications.
- **Output Format**:
  1. Design principles — 3 rules this product's UI must obey
  2. Visual direction — mood, references, what to avoid
  3. Design tokens — color palette with hex + usage, type scale, spacing scale, radius, shadows
  4. Screen inventory — every screen with its purpose
  5. User flows — step by step for each core journey
  6. Per-screen layout — sections, hierarchy, primary action, components used
  7. Component library — every reusable component with its variants and states
  8. States — empty, loading, error, success, offline for each key screen
  9. Responsive behaviour — mobile, tablet, desktop
  10. Accessibility — contrast ratios, focus order, keyboard nav, ARIA needs

---

## Phase 1 — During Development (Use as needed)

### 1a. Debug an Error Fast
- **Protocol**:
  - **Step 1**: Restate the problem in own words to ensure alignment.
  - **Step 2**: List 3-5 most likely root causes, ranked by probability, with reasoning.
  - **Step 3**: For each cause, give the single fastest way to confirm or eliminate it (log line, check, one-line test).
  - **Step 4**: **STOP and wait for user's results.**
  - **Step 5**: Once confirmed, write minimal fix, explain why it works, and provide exact verification instructions. Do not shotgun changes or refactor unrelated code.

### 1b. Find Security Gaps (Run before deploy, not after)
- **Role**: Application Security Engineer
- **Audit Scope**: Authentication and session handling, authorization gaps, hardcoded secrets/keys/tokens, injection risks (SQL, NoSQL, command, XSS), unprotected/unvalidated API routes, missing input validation/sanitization, rate limiting/brute force, IDOR/BOLA, CORS/security headers/cookies, dependencies, sensitive data in logs/errors, CSRF, file uploads, path traversal, SSRF, password reset, weak JWT secrets, payment tampering, source maps in prod.
- **Output Format**: Findings ranked by severity (Critical / High / Medium / Low) with File & line, Exploit scenario, and Exact code fix. State explicitly if any category is clean. **STOP and wait for approval before modifying code.**

### 1c. E2E Test the App (Playwright)
- **Steps**:
  1. Install & configure Playwright (local + CI, retries, traces on failure, screenshots).
  2. Identify critical user journeys and list for approval **BEFORE** writing tests.
  3. Write tests covering happy path + realistic failure states.
  4. Use resilient selectors (`role`, `data-testid`). Add missing `data-testid` where needed.
  5. Create auth fixture.
  6. Add test data seeding and cleanup.
  7. Add npm scripts (`test:e2e`, `test:e2e:ui`, `test:e2e:ci`).
  8. Add CI workflow. Explain how to run and flag un-testable journeys.

### 1d. Clean Up & Refactor Dead Code
- **Phase 1 (Audit)**: Make ZERO changes. Present table: Category | File/Location | Risk Level | Evidence. Flag anything with <90% confidence. **STOP and wait for approval.**
- **Phase 2 (Execute)**: Delete approved items, extract duplicated logic into shared utils, split oversized files along clear responsibility lines. Behaviour must remain identical.

### 1e. Write Clean Git Commits
- **Steps**:
  1. Summarise what changed and why, grouped by intent.
  2. Split work into atomic commits.
  3. Conventional Commits format (`type(scope): imperative summary under 60 chars`, blank line, body with WHY and tradeoffs, `BREAKING CHANGE:` if needed).
  4. Order commits so repo builds and tests pass at each step.
  5. Output exact git commands to run in sequence.

### 1f. Turn a Task Into a Reusable Skill
- **Deliverables**:
  1. Name — short, action-oriented
  2. Description — precise trigger & anti-trigger conditions
  3. Instructions — numbered, step-by-step for a model with zero prior context
  4. Rules and constraints — hard requirements and anti-patterns
  5. Output format — exact result template
  6. Worked example — full input-to-output example
  7. Failure modes — 3-5 failure modes and mitigations

### 1g. Full SEO Audit & Fix
- **Role**: Senior Technical SEO Engineer
- **PHASE 1 — AUDIT (Make zero changes)**:
  - Check 16 items with evidence: Sitemap.xml, Robots.txt, Meta titles, Meta descriptions, Noindex tags, H1 tags, Heading hierarchy, Canonical tags, Schema markup (JSON-LD), Internal links, Broken links, Image optimization & alt text, URL slugs, HTTPS/mixed content, Open Graph & Twitter Cards, Core Web Vitals (LCP, INP/FID, CLS).
  - Present findings table: `Category | Page/File | Issue | Severity | Evidence`. Flag items with <90% confidence. Propose realistic backlink strategy.
  - **STOP and wait for approval.**
- **PHASE 2 — EXECUTE (Only after approval)**:
  - Fix approved items adhering to strict rules (no broken URLs without 301, preserve copy meaning, no new dependencies without permission).
