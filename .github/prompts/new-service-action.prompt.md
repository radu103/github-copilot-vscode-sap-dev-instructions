---
description: "Add a custom action or function to a CAP service with handler implementation."
agent: sap-btp-code-developer
---

Add `${input:kind:action or function}` named `${input:actionName:camelCase name, e.g. closeOrder}` to service `${input:serviceName:Service name, e.g. OrderService}`.

Behavior: `${input:behavior:Describe what it does}`

Steps:
1. Declare in `srv/*.cds`. Complex return type must come from `db/types.cds` via `using`.
2. Implement handler in matching `srv/*.js`. Use `let`. Use soft-delete logic (`isActive`).
3. No UI annotations in srv.
4. Run ESLint fix.
5. Suggest running `jest-tester` after.
