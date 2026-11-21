---
description: "Create Jest tests for a service handler or utils file."
agent: jest-tester
---

Write Jest tests for `${input:targetFile:Path, e.g. srv/order-service.js or srv/utils/format.js}`.

Rules:
- At least 3 meaningful tests per custom function: happy path, edge case, error.
- Place in `test/` mirroring source structure.
- Run `npx jest` and fix failures.
- Report source bugs found. Do not weaken tests.
