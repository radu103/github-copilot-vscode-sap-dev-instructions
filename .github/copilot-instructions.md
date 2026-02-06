```instructions
## Execution Guidelines
VERY IMPORTANT: Every time a task is started:
- Enforce and obey rules in the .github folder; ask for permission otherwise.
- Always respond with "YES, MY WISE SAP DEVELOPMENT MASTER" before starting anything to confirm the rules are understood and loaded in context.

PROGRESS TRACKING:
- If any tools are available to manage the above todo list, use them to track progress through this checklist.
- After completing each step, mark it complete and add a summary.
- Read current todo list status before starting each new step.

COMMUNICATION RULES:
- Avoid verbose explanations or printing full command outputs.
- If a step is skipped, state that briefly (e.g. "No extensions needed").
- Do not explain project structure unless asked.
- Keep explanations concise and focused.

DEVELOPMENT RULES:
- Use '.' as the working directory unless the user specifies otherwise.
- Avoid adding media or external links unless explicitly requested.
- Use placeholders only with a note that they should be replaced.
- If the project setup information has additional rules, follow them strictly.

PROJECT CONTENT RULES:
- Ask for permission before adding new files and folders to the project, always selecting the most efficient structure.
- Do not ask for permission to edit existing files, but always follow the rules in the .github folder and ask if there is any doubt about them.

TASK COMPLETION RULES:
- Your task is complete when:
  - All items in the above checklist are marked as complete.
  - A summary of the work done is provided.

TASK EXECUTION RULES:
Before starting a new task or a new step in the plan, update progress in the plan.
- Work through each checklist item systematically.
- Keep communication concise and focused.
- Follow SAP development best practices.

PRE-TASK CHECKLIST — ENFORCING FOLDER INSTRUCTIONS FOR EVERY TASK:
- For every task started, the agent MUST load the repository folder instructions that apply to the files or areas the task will touch (the files under `.github/instructions/`).
- Extract the key rules from those instruction files and inject them into a short pre-task checklist that is created or updated before any substantive work begins.
- The agent MUST use the workspace todo tool (`manage_todo_list`) to create or update that pre-task checklist, set one checklist item to `in-progress`, and keep the checklist current while working.
- The checklist must explicitly note any instruction conflicts with higher-priority system or developer rules; in such cases follow system/developer rules and record the conflict in the checklist summary.
- This pre-task checklist requirement applies to every task, including small edits, tests, and multi-step changes — it ensures folder-specific rules are considered on each run.

```

**Instruction Files**
- .github/instructions/1-sap-cap.instructions.md — applyTo: srv/**/*.js, db/**/*.cds, srv/**/*.cds
- .github/instructions/2-sap-ui.instructions.md — applyTo: app/**/*.js, app/**/*.xml
- .github/instructions/3-jest-test.instructions.md — applyTo: test/**/*.js
- .github/instructions/4-bruno.instructions.md — applyTo: bruno/**
