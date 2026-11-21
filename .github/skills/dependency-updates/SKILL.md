---
name: dependency-updates
description: "Update npm dependencies in SAP CAP projects: @sap/cds-dk, prettier, axios, eslint, and every package flagged by Dependabot security alerts (found with gh). Use when updating dependencies, fixing vulnerabilities, or handling Dependabot alerts."
metadata:
  version: "1"
---

# Dependency Updates

Node.js tooling only. Never Python. Work on a `feature/*` or `bugfix/*` branch, never directly on `dev`, `qas`, `prod`.

## Scope
1. Always check: `@sap/cds-dk`, `prettier`, `axios`, `eslint` (plus `@eslint/js`, `globals` together with `eslint`).
2. Plus every package with an open Dependabot security alert (see below) or a `critical`/`high` `npm audit` finding.
3. Update only these packages. Leave all other dependencies unchanged.
4. Package not in `package.json` (direct) and not in alerts: skip, state it briefly.

## Find Dependabot security alerts
- Open alerts: `gh api "repos/{owner}/{repo}/dependabot/alerts?state=open&per_page=100" --paginate --jq '.[] | [.number, .security_advisory.severity, .dependency.package.name, .dependency.scope, .security_vulnerability.first_patched_version.identifier, .dependency.manifest_path] | @tsv'`
- Open Dependabot PRs: `gh pr list --author "app/dependabot" --state open`
- If `gh` is not authenticated or lacks access (403/404): report the exact error. Continue with the fixed list only.
- Alert with no patched version: do not update. List it in the summary as unresolved.
- Alert package is transitive: do not add it to `package.json` on your own. Use `npm update <pkg>`. If it stays vulnerable, ask the user before adding an `overrides` entry.

## Check critical issues first
- `npm audit --json` and `npm audit --omit=dev`. Read severity counts.
- `npm audit --audit-level=high` : non-zero exit means high or critical issues exist.
- `npm audit fix --dry-run` : preview safe fixes. Never apply with `--force`.
- `npx npm-check-updates` (no `-u`) : preview upgrades. Apply only in-scope packages: `npx npm-check-updates -u --filter <pkg1>,<pkg2>` then `npm install`.
- Add every `critical` and `high` package from audit to the update list, even if not in Dependabot alerts.
- Critical issue with no non-breaking fix: stop and ask the user before major bump.

## Steps
0. Upgrade table first: run the checks above, then output the possible upgrade table (package | current | latest | severity | alert | risk patch/minor/major). Apply nothing until the user confirms which rows to update.
1. List outdated: `npm outdated --json`. Compare with alert list and audit result.
2. Check release notes for major bumps. Major version change: ask the user before applying.
3. `@sap/cds-dk`: update the dev dependency, keep `@sap/cds` compatible. Check the major version matches `@sap/cds` per https://cap.cloud.sap/docs/releases/.
4. Apply: `npm install <pkg>@<version>` per package. Commit `package.json` and `package-lock.json` together.
5. Check `npm audit` output: `npm audit --omit=dev` then `npm audit`. Report remaining items.
6. Validate in order, run each once:
   - `npm run prettier:fix` then `npm run prettier:check`
   - `npm run lint`
   - `npm test` if `scripts.test` exists
7. A validation fails after an update: fix only if caused by the update. Otherwise report it. Do not revert unrelated code.

## Rules
- Keep `package-lock.json` committed and in sync. Use `npm install`, never edit lock file by hand.
- Keep semver range style already used in `package.json` (for example `^`).
- Never run `npm audit fix --force`.
- Never run `git push`, `git pull`, `git rebase`, `git merge`, `gh pr merge`. Give the exact command. User runs it.
- PR title to `dev` follows skill `github-pr-workflows` (`[ABCDE]-12345 <summary>`).
- Do not touch `.github/workflows/**` or `mta.yaml` unless the user asks.

## Summary output
Table: package, old version, new version, reason (fixed list / alert number + severity), status. Then list unresolved alerts and failed checks.
