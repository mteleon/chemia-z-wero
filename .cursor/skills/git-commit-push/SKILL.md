---
name: git-commit-push
description: Prepares and executes safe git commit and push workflow in this project. Use when the user asks for commit and push, creating a branch, resolving push readiness, or summarizing committed changes.
---

# Git Commit Push

## Goal
Run a consistent, safe `commit + push` flow for this repository.

## Workflow

1. Check repo state:
   - `git status --short --branch`
   - `git diff --staged`
   - `git diff`
   - `git log --oneline -10`
2. Stage only relevant files requested by user.
3. Commit with clear message (why-oriented, concise).
4. Push to current branch (`git push`) or set upstream for new branch (`git push -u origin HEAD`).
5. Confirm result with `git status --short --branch`.

## Required commit message format
- One short title line.
- Optional blank line.
- 1-2 lines of rationale.

## Safety rules
- Never commit `.env` or secrets.
- Never use destructive git commands (`reset --hard`, force push) unless explicitly requested.
- Do not amend commits unless user explicitly asks.
- If pre-commit or checks fail, fix and create a new commit.

## Common commands

```bash
git status --short --branch
git add <files>
git commit -m "$(cat <<'EOF'
Your commit title

Why this change was needed.
EOF
)"
git push
```
