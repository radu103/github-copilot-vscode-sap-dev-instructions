---
name: jest-testing
description: "Jest testing rules for SAP CAP projects: test/ folder layout, min 3 tests per custom service or utils function. Use when creating or changing files under test/, or writing unit tests for srv handlers and utils."
metadata:
  version: "1"
---

# Jest Testing Rules

- Use Jest. Tests live in `test/` and subfolders (per `srv` and other UI apps).
- Each custom service or utils function: at least 3 meaningful tests (happy path, edge case, error/invalid input).
- Test only utils and service implementation functions.
- No tests for UI5 controller functions.
- JavaScript/Node.js only. Never Python.
- Variable declaration: `let`, never `var`. camelCase names.
- Test ids: UUID v4 strings (stored as `String(36)`).
- Mock `cds` / db access where needed. Do not depend on managed fields (`createdAt`, `createdBy`, `modifiedAt`, `modifiedBy`).
