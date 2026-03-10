---
name: preview
description: Starts local preview with Vercel so Vercel Toolbar is available, and opens the preview in Google Chrome. Use when the user says "preview", "build i preview", wants localhost preview, or asks for Vercel/Toolbar preview.
---

# Preview

## Goal

Start a local preview through Vercel (`vercel dev`) so the user can test the app with Vercel behavior and Toolbar, then open it in Google Chrome.

## Workflow

1. If the user explicitly asks for a build, run build from the project root first:
   ```bash
   npm run build
   ```
   - Wait for completion.
   - If build fails, report the error and stop.

2. Start Vercel local preview from the project root:
   ```bash
   npx vercel dev --yes --listen 3000
   ```
   - Run in background so the process stays active.
   - Read terminal output and capture the final URL from `Ready! Available at ...`.
   - If port `3000` is busy, Vercel may start on `3001+`; always use the URL printed by Vercel.

3. Always open preview in Google Chrome:
   ```bash
   open -a "Google Chrome" "<resolved_preview_url>"
   ```
   - Use the exact URL from step 2.

4. Tell the user which URL was opened and confirm that preview is running.

## Notes

- `vercel dev` requires logged-in Vercel CLI credentials (`vercel login`) and linked project.
- Keep existing unrelated terminals/processes intact unless the user asks to clean them.
