# Farm-Capta Zimbabwe

**Agricultural Verification and Financing Intelligence Platform for Zimbabwe.**

Our land, Our Agriculture, Our future.

This React proof of concept follows the Farm-Capta project proposal: verification and structured agricultural evidence come first, giving farmers credible profiles and lenders better information for assessment. Investor opportunities remain illustrative and separate from live financial activity.

## Run locally

```sh
npm install
npm run dev
```

Open the local URL shown by Vite (normally `http://127.0.0.1:5173`). On Windows PowerShell with script execution disabled, use `npm.cmd` instead of `npm`.

```sh
npm run build
npm run preview
npm test
```

The development and preview servers bind to localhost by default. For a deliberate local-network presentation, use `npm run dev -- --host 0.0.0.0`.

## Suggested presentation journey

1. Start on the public homepage: Farm-Capta’s value is credible agricultural evidence, not guaranteed financing.
2. Choose **Get started → Farmer**. Complete the onboarding steps with fictional information and sample files. Review the fields, give consent and submit. The profile becomes **Submitted**, not Verified.
3. Choose **Switch workspace → Admin**. Open Farm verification, inspect evidence, record a reason and a simulated decision.
4. Switch back to Farmer. See the updated status in Verification and the notification. Browse financing and check eligibility.
5. Switch to Lender. Filter farms, open a specific farm report, view shared evidence, review applications and advance them through permitted stages. Portfolio totals follow funded demo records.
6. Use the Business or Lender role to publish an update. Follow, comment, save and report it from another role; review reports as Admin.
7. Show Investor opportunities last. Save a farm, build a watchlist and set a local notification preference. No investment or payment action exists.

The seeded farmer has an existing input-finance application. The UI prevents duplicate active applications for the same product. To demonstrate a new submission, publish another suitable product from the Lender workspace or use a different eligible product.

## What is functional

- Five demo workspaces: farmer, agricultural business, lender, investor and admin.
- Addressable hash routes, browser back/forward, tab session persistence and complete mobile navigation.
- Validated onboarding with in-memory drafts, review/edit steps, separate consents and simulated review submission.
- Document selection, type/size checks, previews, removal, sharing preferences and admin document decisions.
- Farm discovery filters, selected-farm reports, public profiles and report export.
- Financing eligibility, application submission, duplicate prevention, assessment notes, permitted status transitions and derived portfolio exposure.
- Institution profiles and financing-product publication.
- Farm monitoring milestones; news articles; posts, comments, following and saved content.
- Role-aware local messaging, blocking, reporting and notifications.
- Admin verification, institution decisions, user suspension, content moderation and exportable local audit history.

## Demo data and privacy

Use **fictional information only**. No backend, external messages, live KYC checks, real authentication or financial transactions are connected.

Non-sensitive demo activity is stored under `farmcapta-demo-v2` in this browser’s local storage. A selected role is stored in session storage for the tab. Demo access is intentionally a labelled role simulation; production authentication and authorization must be supplied by a backend before real records are used.

Passwords and identity drafts stay in memory. Reviewers can inspect submitted identity and suitability answers within the same session; these summaries are never saved to local storage. Uploaded file contents and their metadata are excluded from persistent storage and clear on refresh. Drafts also clear on refresh; leaving a step or navigating to another screen in the same session preserves them. Returning to the public site through the workspace logout clears these sensitive session records. Changing a document’s sharing preference affects lender visibility immediately. Identity documents are excluded from lender and public views.

The browser itself is not a security boundary: these access rules demonstrate the intended UI and must also be enforced by a future server. Audit records are local demo history, not tamper-proof logs. The UI explains these limits.

To reset your local demo, remove only `farmcapta-demo-v2` from the browser’s local storage and reload.

## Verification

`npm test` runs dependency-free tests for document visibility, upload rejection, application-stage permissions, eligibility and persistence exclusions.

`tests/browser.mjs` contains browser journey checks. With Playwright available, run:

```sh
node tests/browser.mjs /absolute/path/to/playwright/index.mjs
```

The script uses installed Google Chrome, expects the dev server at port 5173, and writes ignored screenshots to `test-results/`. Set `TEST_URL` if the server uses another address. It checks desktop and mobile layouts, onboarding, filtering, document sharing, review decisions, application transitions, investor collections and moderation.

## Frontend structure

- `src/main.jsx`: public presentation, routing, demo session and workspace shell.
- `src/model.js`, `src/data.js`, `src/store.jsx`: fictional records, shared state and domain rules.
- `src/onboarding.jsx`, `src/farms.jsx`, `src/finance.jsx`: core verification and financing journeys.
- `src/community.jsx`, `src/admin.jsx`, `src/dashboard.jsx`: supporting workspaces.
- `src/ui.jsx`, `src/styles.css`: shared accessible controls and responsive visual system.

The UI uses lightweight CSS/SVG agricultural illustrations and progressive disclosure. System fonts keep the presentation independent of external font services. The dashboard is loaded separately. See [proposal alignment](docs/PROPOSAL_ALIGNMENT.md) for scope decisions.
