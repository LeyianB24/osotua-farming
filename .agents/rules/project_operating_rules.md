# Project Operating Rules

## Core Principle
Every request follows the same three-part pattern by default:
1. **Assume a role relevant to the task** (Senior PM, Product Designer, Security Engineer, Senior Engineer, etc.)
2. **Pause before acting** — ask clarifying questions, audit, or diagnose before writing/changing code
3. **Define the output** — exact sections, exact format, no guessing, no filler

---

## Standing Rules for this Repo
- **Attribution**: Every project built under this workflow is a Bezalel Technologies product. Include attribution in the footer (and README) crediting Bezalel Technologies with a link to https://www.bezalel.website/ — e.g. `"Built by [Bezalel Technologies](https://www.bezalel.website/)"`. Match existing footer/credits patterns.
- **Precision**: Do NOT shotgun changes. Do NOT refactor unrelated code. Do NOT fix things not asked about.
- **Stability**: Behaviour must remain identical unless explicitly asked for a change. No new dependencies without asking. No renaming public APIs without asking.
- **Clarity**: If a requirement, cause, or fix is ambiguous, flag it rather than inventing an answer.
- **Reviewability**: Give a summary of every non-trivial change so the user can review diffs.
- **Explicit Cleanliness**: If something is genuinely clean / has no issues, say so explicitly rather than staying silent.

---

## Phase 0 — New Project Bootstrap (Run in order before code is written)

### 0a. Write a Full PRD
- **Role**: Senior Product Manager
- **Action**: Ask up to 5 clarifying questions about target user, must-have vs nice-to-have scope, technical constraints, and what "done" looks like. **STOP and wait for answers.**
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

### 0b. Full UI & UX Design Brief
- **Role**: Senior Product Designer
- **Action**: Using the PRD, produce a complete design brief before code is written. Deliberate choices with justifications.
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
  - **Step 5**: Once cause is confirmed, write minimal fix, explain why it works, and provide exact verification instructions.

### 1b. Find Security Gaps (Run before deploy)
- **Role**: Application Security Engineer
- **Audit Scope**: Authentication & session handling, authorization gaps, exposed secrets/tokens, injection risks (SQL, NoSQL, command, XSS), unprotected API routes, input validation/sanitization, rate limiting/brute force protection, IDOR, CORS/headers/cookies, dependencies, data leaks in logs/errors.
- **Output Format**: Findings ranked by severity (Critical / High / Medium / Low) with File & line, Exploit scenario, and Exact code fix. State explicitly if any category is clean. **STOP and wait for approval before editing code.**

### 1c. E2E Test the App (Playwright)
- **Steps**:
  1. Configure Playwright (local + CI, retries, traces, screenshots).
  2. List critical user journeys for approval **BEFORE** writing tests.
  3. Write happy path + realistic failure states for approved journeys.
  4. Use resilient selectors (`role`, `data-testid`).
  5. Create auth fixture.
  6. Add isolated test data seeding and cleanup.
  7. Add npm scripts (`test:e2e`, `test:e2e:ui`, `test:e2e:ci`).
  8. Add CI workflow on PR.

### 1d. Clean Up & Refactor Dead Code
- **Phase 1 (Audit)**: Make ZERO changes. Present table of unused files, imports, deps, env vars, commented-out blocks, duplicated logic, oversized files. Include risk level and flag items with <90% confidence. **STOP and wait for approval.**
- **Phase 2 (Execute)**: Delete approved items, extract duplicated logic into shared utils, split oversized files. Keep behavior identical.

### 1e. Write Clean Git Commits
- Group by intent, atomic commits, Conventional Commits format (`type(scope): summary` + body explaining WHY + `BREAKING CHANGE:` if needed), ensure repo builds at every commit, output exact git commands.

### 1f. Turn a Task Into a Reusable Skill
- Output format: Name, Description (precise trigger/anti-trigger), Instructions, Rules and constraints, Output format template, Worked example, Failure modes.
