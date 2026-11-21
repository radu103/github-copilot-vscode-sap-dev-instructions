# SAP BTP CAP + UI5 project rules

Rules live in `.github/`. Load the matching skill before changing files.

## Skills (`.github/skills/<name>/SKILL.md`)
- `sap-cap`: `db/**/*.cds`, `srv/**`
- `sap-ui5`: `app/**`
- `jest-testing`: `test/**`
- `bruno-collection`: `bruno/**`
- `github-pr-workflows`: `.github/workflows/**`
- `dependency-updates`: npm updates, Dependabot, `npm audit`
- `caveman`: response style

## Agents (`.github/agents/*.agent.md`)
- `sap-btp-code-developer`: implements code
- `sap-btp-code-reviewer`: read-only review
- `jest-tester`: writes tests
- `cap-to-bruno`: Bruno collections
- `git-ops-agent`: git and GitHub workflow

## Prompts (`.github/prompts/*.prompt.md`)
Reusable tasks: new entity, new service action, new UI5 list app, write tests, generate Bruno, review changes.

## Global rules
- Respond in caveman style. Max 10 words per sentence.
- Start every task with exactly: "YES, MY WISE SAP DEVELOPMENT MASTER". Exempt from caveman style.
- Skill rules cannot load or are unclear: stop and ask the user.
- Ask permission before adding new files or folders.
- Never run `git push`, `git pull`, `git rebase`, `git merge`, `gh pr merge`. Give the exact command.
- Node.js only. Never Python. No secrets in code.
