---
name: git-commit-push-pr
description: Runs a safe end-to-end Git workflow for this repository: check status, commit relevant files, push branch, and create a GitHub pull request. Use when the user asks to "commit and open PR", "utworz PR", or wants one-pass commit/push/PR execution.
---

# Git Commit Push PR

## Goal
Run a consistent, safe `commit + push + pull request` flow for this repository.

## Workflow

1. Inspect repository state:
   - `git status --short --branch`
   - `git diff --staged`
   - `git diff`
   - `git log --oneline -10`
2. Stage only files relevant to the user request.
3. Commit with a concise, why-oriented message.
4. Push branch:
   - existing upstream: `git push`
   - new branch: `git push -u origin HEAD`
5. Prepare PR context:
   - verify upstream and branch sync
   - `git log --oneline main..HEAD`
   - `git diff --stat main...HEAD`
6. Create PR with `gh pr create` using:
   - clear title
   - `## Summary` (1-3 bullets)
   - `## Test plan` (checkbox list)
7. Confirm final state with:
   - PR URL
   - `git status --short --branch`

## Required commit message format
- One short title line.
- Optional blank line.
- 1-2 rationale lines.

## Required PR body format

```markdown
## Summary
- ...

## Test plan
- [ ] ...
```

## Safety rules
- Never commit `.env` or secret files.
- Never use destructive git commands (`reset --hard`, force push) unless explicitly requested.
- Do not amend commits unless explicitly requested.
- If hooks fail, fix and create a new commit.
- Do not include unrelated local changes in commit/PR.

## Common commands

```bash
git status --short --branch
git add <files>
git commit -m "$(cat <<'EOF'
Commit title

Why this change was needed.
EOF
)"
git push
gh pr create --title "PR title" --body "$(cat <<'EOF'
## Summary
- ...

## Test plan
- [ ] ...
EOF
)"
```
