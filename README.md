# How to use the repository instructions

Purpose

- This repository contains developer guidance and rules stored in the `.github` folder. These files define mandatory practices, progress tracking, and project-specific conventions that must be followed before starting work.

Key files

- [.github/copilot-instructions.md](.github/copilot-instructions.md): primary execution guidelines and mandatory start phrase.
- [.github/skills/sap-cap/SKILL.md](.github/skills/sap-cap/SKILL.md): backend (SAP CAP) rules and conventions.
- [.github/skills/sap-ui5/SKILL.md](.github/skills/sap-ui5/SKILL.md): frontend (UI5) rules.
- [.github/skills/jest-testing/SKILL.md](.github/skills/jest-testing/SKILL.md): testing rules.
- [.github/skills/bruno-collection/SKILL.md](.github/skills/bruno-collection/SKILL.md): Bruno collection rules.
- [.github/skills/github-pr-workflows/SKILL.md](.github/skills/github-pr-workflows/SKILL.md): PR check workflows.
- [.github/agents/](.github/agents): developer, reviewer, jest-tester, cap-to-bruno, git-ops agents.

How to use these instructions (quick guide)

1. Read the `.github` files listed above before beginning any task.
2. Before starting work, comply with the primary requirement in copilot-instructions.md: state the confirmation phrase exactly as written: "YES, MY WISE SAP DEVELOPMENT MASTER".
3. Use the repository's progress/todo system to plan and track work. Update the todo list at the start of each task and mark items completed when done.
4. Follow the language-specific rules in the corresponding file (for example, use the SAP CAP rules for backend work and the UI5 rules for frontend work).
5. Ask for permission before adding new top-level files or folders. If you need to change the rules in `.github`, request approval first.

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

## Initializing the CodeGraph index

If `.codegraph/` does not exist, run:

```bash
npm i -g @colbymchenry/codegraph
codegraph install --yes
codegraph init -i
```

---

Generated to summarize and clarify the guidance in the `.github` folder.
