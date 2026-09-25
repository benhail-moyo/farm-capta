Run `npm install` and `npm run dev`. Build with `npm run build`.

Farm locations use an on-demand OpenStreetMap tile map with a marker, zoom/pan controls, and a larger-map link. Internet access is required for tiles. Initial coordinates in `src/data/farms.js` are illustrative demo locations, visibly labelled in the map dialog.

Sign in with the Farmer demo role, open **My Farm → Edit Profile**, and enter latitude/longitude to replace the demo marker. Farm edits are saved in browser local storage and shared across public and dashboard views on that device.

Report/detail buttons, filters, downloads, saved-item removal, review decisions, and local forms are interactive. Applications, messages, user/institution/product changes are labelled local drafts; document selection is session-only. There is no server submission, authentication management, or file-upload service in this prototype.

Browser smoke checks: `node tests/smoke.mjs` with Playwright available. Set `PLAYWRIGHT_MODULE` to a Playwright module URL if installed outside the project and optionally `BROWSER_PATH` to a Chromium/Edge executable. Checks cover marker coordinates and validation, dialogs, GPS persistence, role navigation, mobile layout, drafts, and downloads.
