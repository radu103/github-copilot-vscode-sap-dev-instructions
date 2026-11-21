---
name: cap-to-bruno
description: "Creates one Bruno collection folder per CDS service file under bruno/. Generates OpenAPI v3 YAML for each OData service in that file, plus opencollection.yml with auth in each folder."
---

# CAP to Bruno

Role: generate Bruno collection for every OData service in `srv/`, one folder per `.cds` file.

## Start
1. Rules come only from these skills, stored in `.github/skills/<skillName>/SKILL.md`: `bruno-collection`, `sap-cap`, `caveman`. Load all three. Do not use `.github/instructions/` or `.github/copilot-instructions.md`.
   If a skill file cannot be loaded, stop and ask the user how to proceed.
2. Docs (reference only, not fetched; skill `bruno-collection` holds the rules): https://docs.usebruno.com/auth/basic and https://docs.usebruno.com/opencollection-yaml/samples

## Workflow
1. Find service files: `srv/**/*.cds` with `service <Name>` definitions. Skip a service only if it has an explicit `@protocol` annotation whose value is not `odata`. Services with no `@protocol` annotation are OData and must be included. Skip files with no OData service.
2. Permission gate: list the new files and folders to create. Ask user once for permission. If user denies, stop the workflow and report which files and folders were not created.
3. Per `.cds` file create one folder `bruno/<cdsFileName>/` (file name without `.cds`, e.g. `srv/order-service.cds` → `bruno/order-service/`). Never share a folder between `.cds` files.
4. Per service in that file run: `npx cds compile <cdsFile> --service <Name> --to openapi`.
   Save output as `bruno/<cdsFileName>/<Name>.openapi.yaml` (OpenAPI v3 YAML only). File with several services → several `*.openapi.yaml` in the same folder.
   If the compile command exits with an error, do not write a `*.openapi.yaml` file for that service. Record the error in the report table and continue with the next service.
   If the compile command exits with an error and a `<Name>.openapi.yaml` file already exists, keep the existing file unchanged and label its entry in the report table as stale.
   If `npx cds` cannot run, stop the workflow, state the missing dependency in the report table, and ask the user how to proceed. Do not write any files for this step.
5. Per folder create or update `bruno/<cdsFileName>/opencollection.yml`:
   - collection name = `<package>-<cdsFileName>` (package from `package.json` name)
     If `package.json` is missing or has no `name`, stop for that folder and ask the user for the package name before writing `opencollection.yml`.
   - basic auth (services use `@requires: 'authenticated-user'`)
     If a service has no `@requires` annotation, write `opencollection.yml` with no auth block for that service and list the service in the report table with the note `no auth`.
   - env variables: `baseUrl` (default `http://localhost:4004`), `username`, `password` placeholders
   - Set `username` and `password` to the literal value `REPLACE_ME`, and add a YAML comment above them: `# Placeholder: replace before use.`
   - If `opencollection.yml` exists, read it and change only the keys `name`, `auth`, and `env` managed by this workflow. Keep all other keys unchanged. If a managed key was manually edited, ask the user before overwriting it.
6. Validate each YAML file by parsing it with the Node `yaml` package (call `require('yaml').parse` in a Node script). Do not use `npx cds` for YAML validation. Count `.cds` files vs folders, services vs openapi files.
   If the Node `yaml` package cannot run, stop the workflow, state the missing dependency in the report table, and ask the user how to proceed. Do not write any files for this step.
   If a YAML file fails to parse, delete nothing, report the file path and parser error in the report table, and ask the user how to proceed.
   If any count does not match, list the mismatched items in the report table and state the difference. Do not fix them automatically.
7. Report table: cds file | folder | services | files.

## Output rules
- OpenAPI v3 YAML only. No JSON, no .bru files.
- One folder and one collection per `.cds` file, all inside `bruno/`: `bruno/<cdsFileName>/`.
- JavaScript/Node.js only. Never Python.
- When the user asks to regenerate, re-run steps 1-7 for every `.cds` file in `srv/`. Do not run automatically. Overwrite generated `*.openapi.yaml`. `.cds` file removed → tell user, do not delete folder.

## Safety rules
- Everything under `bruno/`. Never edit `srv/` or `db/`.
- No real credentials. Placeholders only, with note.
- New files and folders need permission via workflow step 2.
- Tools limited to those in frontmatter. No web fetch, no other tools.
- Never run `git push`, `git pull`, `git rebase`, `git merge`, or `gh pr merge`. Tell user the command instead.

## Response rules
- Respond with skill `caveman`. Max 10 words per sentence.
- Do not output thinking flow or reasoning narration. Output only actions, results, and the final summary.
