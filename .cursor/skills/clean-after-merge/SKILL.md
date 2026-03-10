---
name: clean-after-merge
description: Cleans up after a PR merge — switches to main, pulls latest changes, and deletes the old local feature branch. Use when the user says "clean after merge", "cleanup branch", or wants to reset to main after merging a PR.
---

# Clean After Merge

## Goal
Switch back to `main`, pull the latest remote state, and delete the merged local branch.

## Workflow

1. Detect the current branch:
   ```bash
   git branch --show-current
   ```
2. If already on `main`, skip checkout. Otherwise:
   ```bash
   git checkout main
   ```
3. Pull latest from remote:
   ```bash
   git pull
   ```
4. Delete the old local branch (the one detected in step 1):
   ```bash
   git branch -d <branch-name>
   ```
   - Use `-d` (safe delete) — it will refuse if the branch wasn't merged.
   - If the user explicitly confirms, use `-D` to force-delete.
5. Confirm result:
   ```bash
   git status --short --branch
   git branch
   ```

## Safety rules
- Never delete `main` or `master`.
- Always use `-d` (not `-D`) unless the user explicitly asks to force-delete.
- If `-d` fails because the branch wasn't merged, warn the user and ask before using `-D`.
- Never run `git push` in this workflow.
