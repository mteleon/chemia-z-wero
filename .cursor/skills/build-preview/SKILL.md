---
name: build-preview
description: Builds the site and starts the preview server for local testing. Use when the user says "build", "preview", "odśwież localhost", "build i preview", or wants to see the site at localhost.
---

# Build and Preview

## Goal

Build the production bundle and serve it locally so the user can preview changes in the browser.

## Workflow

1. Run build from the project root:
   ```bash
   npm run build
   ```
   - Wait for completion (typically ~10 s).
   - If build fails, report the error; do not start preview.

2. Start the preview server:
   ```bash
   npm run preview
   ```
   - Preview serves the contents of `dist/` from the previous build.
   - Default port is 4173; if busy, Vite tries 4174, 4175, etc.
   - Run in background so the process stays active.

3. Tell the user the URL (e.g. `http://localhost:4173/` or the port Vite chose).

## Notes

- Build runs prebuild scripts (favicon, sitemap). No need to run them separately.
- For hot-reload during development, use `npm run dev` instead — that is a different workflow.
- If the user only says "odśwież localhost", a rebuild is needed so the preview serves the latest changes.
