---
name: github-pr-workflows
description: "GitHub Actions PR checks: PR title JIRA ID check for PRs to dev, Jest + MTAR build for PRs to qas and prod. Use when creating or changing .github/workflows, PR title rules, or CI for SAP BTP CAP projects."
metadata:
  version: "1"
---

# GitHub PR Workflows

Two separate workflows. Never merge them.

| Workflow file | Trigger (PR target) | Runs |
|---|---|---|
| `.github/workflows/pr-dev-title-check.yml` | `dev` | PR title check, source branch check |
| `.github/workflows/pr-qas-prod-test-build.yml` | `qas`, `prod` | Jest tests, MTAR build. Nothing else |

## PR title rule (dev)
- Format: `[ABCDE]-12345 <summary>`
- Regex: `^\[[A-Z]{2,10}\]-[0-9]+ .+$`
- If title does not match, fail job and print: `Invalid PR title. Expected format: [ABCDE]-12345 <summary>`.
- Triggers: `opened`, `reopened`, `edited`, `synchronize`. `edited` re-checks after title fix.
- Title passed via `env`, never inline `${{ }}` in `run`. Prevents script injection.

## Source branch rule (dev)
- Allowed: `feature/*` only.
- Any other source branch: fail job `Check PR title` with message `Source branch must match feature/*`.

## Job names
- The dev workflow defines a single job with id `check-pr-title` and `name: Check PR title`.
- The qas/prod jobs: id `jest` with `name: Jest tests`; id `mtar-build` with `name: MTAR build`.

## qas / prod rule
- Jest: `npm ci` then `npm test`. Tests come from `package.json` `scripts.test`.
- If `package.json` has no `scripts.test`, fail `jest` job with message `scripts.test missing in package.json`.
- If `mta.yaml` is missing at repo root, fail `mtar-build` job with message `mta.yaml missing at repo root`.
- MTAR: `npm install -g mbt` then `mbt build -t ./mta_archives`. Upload `*.mtar` artifact.
- No title check, no lint, no other jobs.
- Two parallel jobs: `jest`, `mtar-build`.

## Pre-requirements in the CAP project
- `package.json` has `scripts.test` running Jest.
- `mta.yaml` exists at repo root (generate: `cds add mta`).
- `package-lock.json` committed (needed by `npm ci`).

## Branch protection
- Add required status checks in rulesets: `Check PR title` on `dev`; `Jest tests` and `MTAR build` on `qas`, `prod`.
- To create rulesets, output the `gh api` commands that create them. Do not execute them. Do not assume any agent or skill beyond this document.

## Rules
- Pin actions to major version (`@v4`). Least-privilege `permissions: contents: read`.
- No secrets in workflow files.
- Node.js tooling only. Never Python.
