# Prompt-Powered Kickstart: Building a Beginner’s Toolkit for Angular (Standalone)

## 1) Title & Objective
**Technology chosen:** Angular (frontend framework)  
**Why Angular:** It’s an industry-standard framework for building modern web apps with TypeScript, strong tooling (Angular CLI), and structured patterns used in many companies.  
**End goal:** Create a **minimal runnable Angular app** that:
- Renders a clean “Hello Angular” UI
- Makes a **single public API call** (Quote of the Day)
- Shows loading + error states (basic professionalism)

---

## 2) Quick Summary of the Technology
**What is Angular?**  
Angular is a TypeScript-based web application framework for building single-page applications (SPAs). It provides components, routing, dependency injection, and powerful CLI tooling. :contentReference[oaicite:0]{index=0}

**Where is it used?**  
Enterprise dashboards, admin panels, fintech portals, internal tools, and large-scale web apps.

**Real-world example:**  
A company’s internal employee portal: authentication, navigation, dashboards, and data-driven UI.

---

## 3) System Requirements
**OS:** Linux / macOS / Windows  
**Tools required:**
- Node.js (use an LTS version) :contentReference[oaicite:1]{index=1}
- npm (bundled with Node)
- A code editor (VS Code recommended)
- Angular CLI (installed via npm) :contentReference[oaicite:2]{index=2}

---

## 4) Installation & Setup Instructions

### Step A — Install Node.js (LTS)
Download and install Node.js from the official site. :contentReference[oaicite:3]{index=3}

Verify:
```bash
node -v
npm -v
```

### Step B — Install Angular CLI

```bash
npm install -g @angular/cli
ng version
```

Angular CLI is the official command-line tool for scaffolding and running Angular apps. ([Angular][1])

### Step C — Create a New Angular App

```bash
ng new prompt-powered-kickstart-angular
cd prompt-powered-kickstart-angular
```

Angular’s official installation guide uses `ng new` to create a project. ([Angular][2])

### Step D — Run the Dev Server

```bash
ng serve
```

Then open: `http://localhost:4200/`
`ng serve` starts a development server with live reload. ([Angular][3])

### Step E — Git Workflow Requirement (Must Follow)
When making changes to the project:

1) After EVERY file change, immediately create a commit.
2) Use `git add <filename>` (do NOT use `git add .`).
3) Avoid “atomic commits” (do NOT bundle multiple files into one commit).  
   - One commit should typically include **only one file**.
   - If a change logically forces two files at once (rare), explain why in the commit message.

### Commit format
Use clear, professional commit messages in present tense:
- `chore: scaffold Angular project`
- `feat: provide HttpClient in bootstrap`
- `feat: add quote fetching logic`
- `style: add minimal UI layout`
- `docs: add toolkit guide and references`

### Example workflow (exact commands)
```bash
# After creating the project
git status
git add package.json
git commit -m "chore: scaffold Angular project"

git add angular.json
git commit -m "chore: add Angular workspace config"

git add src/main.ts
git commit -m "feat: provide HttpClient in bootstrap"

git add src/app/app.component.ts
git commit -m "feat: fetch quote on init with loading and error states"

git add src/app/app.component.html
git commit -m "feat: render hello UI with quote section"

git add src/app/app.component.css
git commit -m "style: add clean layout and button styles"

git add README.md
git commit -m "docs: add run instructions"
```

### Rules

* Always run `git status` before and after staging.
* Keep commits small and traceable.
* Never commit generated secrets or tokens.

---

## 5) Minimal Working Example (Hello Angular + Quote API)

### What the example does

* Shows a header: **Hello Angular**
* Fetches a random quote from a public API when the page loads
* Shows **Loading…** while fetching
* Shows a friendly error message if the request fails

### Files to update

Replace the contents of these files:

1. `src/main.ts`
2. `src/app/app.component.ts`
3. `src/app/app.component.html`
4. `src/app/app.component.css`

> Note: This project uses **standalone components**, which is the modern default style in newer Angular versions. ([Angular][4])

### Code: `src/main.ts`

```ts
import { bootstrapApplication } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';
import { AppComponent } from './app/app.component';

bootstrapApplication(AppComponent, {
  providers: [provideHttpClient()],
}).catch((err) => console.error(err));
```

### Code: `src/app/app.component.ts`

```ts
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

type QuoteResponse = {
  content: string;
  author: string;
};

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  title = 'Prompt-Powered Kickstart: Angular';

  loading = false;
  error: string | null = null;

  quote: { text: string; author: string } | null = null;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchQuote();
  }

  fetchQuote(): void {
    this.loading = true;
    this.error = null;

    // Public quotes API (no key required)
    const url = 'https://api.quotable.io/random';

    this.http.get<QuoteResponse>(url).subscribe({
      next: (res) => {
        this.quote = { text: res.content, author: res.author };
        this.loading = false;
      },
      error: () => {
        this.error = 'Could not load a quote right now. Please try again.';
        this.loading = false;
      },
    });
  }
}
```

### Code: `src/app/app.component.html`

```html
<div class="page">
  <header class="header">
    <div>
      <h1>Hello Angular 👋</h1>
      <p class="subtitle">A minimal standalone app + one API call.</p>
    </div>

    <button class="btn" (click)="fetchQuote()" [disabled]="loading">
      {{ loading ? 'Loading…' : 'New Quote' }}
    </button>
  </header>

  <main class="card">
    <p class="label">Quote of the moment</p>

    <p *ngIf="loading" class="muted">Fetching a fresh quote…</p>

    <p *ngIf="error" class="error">
      {{ error }}
    </p>

    <blockquote *ngIf="quote && !loading" class="quote">
      “{{ quote.text }}”
      <footer class="author">— {{ quote.author }}</footer>
    </blockquote>
  </main>

  <footer class="footer">
    <span class="muted">Built with Angular + HttpClient</span>
  </footer>
</div>
```

### Code: `src/app/app.component.css`

```css
.page {
  max-width: 880px;
  margin: 40px auto;
  padding: 0 16px;
  font-family: system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif;
}

.header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 16px;
  margin-bottom: 16px;
}

h1 {
  margin: 0;
  font-size: 28px;
  line-height: 1.2;
}

.subtitle {
  margin: 6px 0 0;
  color: #555;
}

.card {
  border: 1px solid #e6e6e6;
  border-radius: 14px;
  padding: 18px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.06);
}

.label {
  margin: 0 0 10px;
  font-size: 12px;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: #666;
}

.quote {
  margin: 0;
  font-size: 18px;
  line-height: 1.6;
}

.author {
  margin-top: 10px;
  font-size: 14px;
  color: #444;
}

.muted {
  color: #666;
}

.error {
  color: #b00020;
  background: #fff1f3;
  border: 1px solid #ffd2da;
  padding: 10px 12px;
  border-radius: 10px;
}

.btn {
  border: 1px solid #ddd;
  background: #111;
  color: #fff;
  padding: 10px 12px;
  border-radius: 12px;
  cursor: pointer;
  font-weight: 600;
}

.btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.footer {
  margin-top: 14px;
  font-size: 12px;
}
```

### Expected output

* Page shows **Hello Angular 👋**
* Quote appears after loading
* Clicking **New Quote** fetches another quote
* If the API fails, an error card is shown

---

## 6) AI Prompt Journal (GenAI Usage)

> Platform used: **ai.moringaschool.com** (Moringa AI).
> Notes: Prompts were refined based on errors and missing steps, and the final guide reflects what worked.

### Prompt 1

**Prompt used:**
“Explain Angular in beginner terms and show the simplest way to create and run a new Angular project using Angular CLI on Linux.”

**Curriculum link/reference:** Moringa AI → Prompt Engineering module/topic (internal course platform).
**Response summary (short):** It explained Angular + CLI workflow (`ng new`, `ng serve`).
**What I used:** The correct commands to scaffold and run the app.
**Evaluation:** Helpful for a clean starting path.

### Prompt 2

**Prompt used:**
“I’m using modern Angular with standalone components. Show how to make a minimal component that fetches data from a public API using HttpClient.”

**Curriculum link/reference:** Moringa AI → Prompt patterns: “Step-by-step learning + code example” (internal).
**Response summary (short):** Suggested using `provideHttpClient()` and subscribing to an HTTP GET call.
**What I used:** The `provideHttpClient()` setup and basic loading/error state.
**Evaluation:** Very helpful; reduced trial-and-error.

### Prompt 3

**Prompt used:**
“I got an error that HttpClient provider is missing. What’s the minimal fix in a standalone Angular app?”

**Curriculum link/reference:** Moringa AI → Debugging prompts (internal).
**Response summary (short):** Add `provideHttpClient()` in `bootstrapApplication`.
**What I used:** Updated `main.ts`.
**Evaluation:** Direct fix, saved time.

### Reflection (learning feedback)

GenAI sped up:

* Understanding Angular terms (components, CLI, standalone)
* Building a working example faster
* Debugging missing-provider issues with minimal changes

---

## 7) Common Issues & Fixes

### Issue A: `ng` command not found

**Cause:** Angular CLI not installed globally
**Fix:**

```bash
npm install -g @angular/cli
```

CLI overview: ([Angular][1])

### Issue B: Port already in use (4200)

**Cause:** Another process is using port 4200.
**Fix:**

```bash
ng serve --port 4201
```

`ng serve` docs: ([Angular][3])

### Issue C: `NullInjectorError: No provider for HttpClient`

**Cause:** HttpClient not provided in standalone bootstrapping
**Fix:** Add `provideHttpClient()` in `main.ts` (as shown in this toolkit).

### Issue D: API call fails (network/CORS)

**Fix:** Try again, switch networks, or use a different public API endpoint.

---

## 8) References

* Angular Installation guide (create a project with `ng new`) ([Angular][2])
* Angular CLI overview ([Angular][1])
* Serving Angular apps with `ng serve` ([Angular][3])
* Angular standalone components overview ([Angular][4])
* Node.js official download + LTS background ([Node.js][5])

[1]: https://angular.dev/tools/cli?utm_source=chatgpt.com "Angular CLI • Overview"
[2]: https://angular.dev/installation?utm_source=chatgpt.com "Installation"
[3]: https://angular.dev/tools/cli/serve?utm_source=chatgpt.com "Serving Angular apps for development"
[4]: https://v17.angular.io/guide/standalone-components?utm_source=chatgpt.com "Getting started with standalone components"
[5]: https://nodejs.org/en/download?utm_source=chatgpt.com "Download Node.js"
