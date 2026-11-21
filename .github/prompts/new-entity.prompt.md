---
description: "Create a new CDS entity with types, CSV sample data and service exposure."
agent: sap-btp-code-developer
---

Create new entity `${input:entityName:Singular capitalized name, e.g. Customer}` in domain `${input:domain:Domain file name, e.g. sales}`.

Fields: `${input:fields:Comma list, e.g. name String, status Integer enum, categoryID association to Category}`

Steps:
1. Add entity in `db/${input:domain}.cds`. Use `cuid`, `managed`, `isActive`.
2. Add or reuse types in `db/types.cds`.
3. Associations: `referenceID` String(36) + association.
4. Expose in existing service in `srv/`. Add `@requires: 'authenticated-user'` if new service.
5. Create CSV sample data in `db/data/`. No managed fields. UUID v4 ids.
6. Run ESLint fix on changed files.
