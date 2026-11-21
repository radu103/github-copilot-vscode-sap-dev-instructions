# How to use the repository instructions

Purpose

- This repository contains developer guidance and rules stored in the `.github` folder. These files define mandatory practices, progress tracking, and project-specific conventions that must be followed before starting work.

Key files

- [AGENTS.md](AGENTS.md): entry point for Copilot and Claude Code. Lists skills, agents, prompts, global rules. [CLAUDE.md](CLAUDE.md) redirects to it.

Skills (`.github/skills/<name>/SKILL.md`)

| Skill | Use for |
|---|---|
| [sap-cap](.github/skills/sap-cap/SKILL.md) | `db/**/*.cds`, `srv/**` backend rules |
| [sap-ui5](.github/skills/sap-ui5/SKILL.md) | `app/**` frontend rules |
| [jest-testing](.github/skills/jest-testing/SKILL.md) | `test/**` testing rules |
| [bruno-collection](.github/skills/bruno-collection/SKILL.md) | `bruno/**` collection rules |
| [github-pr-workflows](.github/skills/github-pr-workflows/SKILL.md) | `.github/workflows/**` PR checks |
| [dependency-updates](.github/skills/dependency-updates/SKILL.md) | npm updates, Dependabot, `npm audit` |
| [caveman](.github/skills/caveman/SKILL.md) | terse response style |

Agents (`.github/agents/*.agent.md`)

| Agent | Role |
|---|---|
| [sap-btp-code-developer](.github/agents/sap-btp-code-developer.agent.md) | implements db, srv, app code |
| [sap-btp-code-reviewer](.github/agents/sap-btp-code-reviewer.agent.md) | read-only review, dependency upgrade table |
| [jest-tester](.github/agents/jest-tester.agent.md) | writes Jest tests |
| [cap-to-bruno](.github/agents/cap-to-bruno.agent.md) | Bruno collections from CDS services |
| [git-ops-agent](.github/agents/git-ops-agent.agent.md) | git and GitHub workflow |

Prompts (`.github/prompts/*.prompt.md`)

| Prompt | Does |
|---|---|
| [new-entity](.github/prompts/new-entity.prompt.md) | new CDS entity, types, CSV, service exposure |
| [new-service-action](.github/prompts/new-service-action.prompt.md) | custom action or function with handler |
| [new-ui5-list-app](.github/prompts/new-ui5-list-app.prompt.md) | UI5 list app |
| [write-tests](.github/prompts/write-tests.prompt.md) | Jest tests for handler or utils |
| [generate-bruno](.github/prompts/generate-bruno.prompt.md) | Bruno folder per CDS service file |
| [review-changes](.github/prompts/review-changes.prompt.md) | review changes against repo rules |
| [caveman](.github/prompts/caveman.prompt.md) | activate caveman voice |

How to use these instructions (quick guide)

1. Load the skill matching the files you change. Agents load skills themselves.
2. State the confirmation phrase exactly as written: "YES, MY WISE SAP DEVELOPMENT MASTER".
3. Plan short checklist and update it as you work.
4. Follow the skill rules for the area (CAP for backend, UI5 for frontend).
5. Ask for permission before adding new files or folders. If you need to change skills or agents, request approval first.

Notes and best practices

- Keep changes minimal and focused; the `.github` rules expect conservative edits and explicit approvals for policy changes.
- If you are unsure which rules apply to a change, open an issue or ask the repository maintainer.

If anything is unclear, ask and we'll update this README to make the workflow explicit.

---

## Pre-requirements

Needed for the `cap-to-bruno` agent (generates OpenAPI v3 YAML from CDS services):

1. Install Node.js (LTS) and npm.
2. Install the CDS development kit globally:

```bash
npm i -g @sap/cds-dk
```

3. Verify the install:

```bash
cds --version
```

4. Install project dependencies: `npm install`.

---

## Claude Code skills link

Claude Code reads skills from `.claude/skills`. Link it to `.github/skills` so both tools share one copy. On Windows, `mklink /J .claude\skills .github\skills` does it.

---

## Initializing the CodeGraph index

If `.codegraph/` does not exist, run:

```bash
npm i -g @colbymchenry/codegraph
codegraph install --yes
codegraph init -i
```

---

Generated to summarize and clarify the guidance in the `.github` folder.
