---
name: sap-cap
description: "SAP CAP backend rules: CDS db model, srv services, naming, associations, soft-delete, types.cds, CSV data. Use when creating or changing db/*.cds, srv/*.cds, srv/*.js, entities, services, actions, functions, or CSV seed data."
metadata:
  version: "1"
---

# SAP CAP Rules

Docs:
- Node.js services: https://cap.cloud.sap/docs/node.js/
- CDS CDL: https://cap.cloud.sap/docs/cds/cdl
- Guides: https://cap.cloud.sap/docs/guides/

## Tools
- JavaScript/Node.js only. Never Python.
- ESLint validation and fixes. Husky runs `lint:fix` on committed files.
- Variable declaration: `let`, never `var`.

## Naming
- camelCase for all variables and properties.
- Capitalized names for services and entities.
- Entity names singular. Never plural in db and services.

## Database model (db/*.cds)
- No `UUID` type. Use `String(36)`. No deterministic ids. Do not create lookup entities or fields that map one UUID to another identifier. Use the entity's `ID` key directly. Every association targets the `ID` key of an existing entity. The referenceID field is `String(36)` and must match that key type exactly.
- All entities use `cuid` aspect.
- All entities use `managed` aspect.
- Association = two fields: `referenceID` of type `String(36)` + association on that field.
- For many-to-many relationships, create a junction entity (singular name) with two associations, each built from a `String(36)` referenceID field and an association on that field.- No compositions. No `Composition of` / `composition of`.
- For parent-child ownership, model the child as a separate entity with a `parentID` field of type `String(36)` and an association to the parent. Enforce cascade behavior in the srv service handlers, not with compositions.
- All types live in `types.cds`. Reuse them.
- Entities in separate files by main relationship domain.
- Define enums as `type Status : Integer enum { open = 0; closed = 1; };` in `db/types.cds`.
- `isActive` boolean + soft-delete always. Hard-delete is never allowed. All entities use soft-delete via `isActive = false`.
- cuid ids = UUID v4 strings for data, migration, tests. Stored as `String(36)`.
- Generated CSV must NOT include `createdAt`, `createdBy`, `modifiedAt`, `modifiedBy`.

## Backend services (srv/*)
- Reuse all entities and types from `db/*`.
- All services in `srv/` folder.
- All services include model associations.
- No compositions.
- No UI annotations in srv services.
- Every service annotated `@requires: 'authenticated-user'`.
- If a service must be publicly accessible, do not remove or change the `@requires` annotation on your own. Ask the user to confirm the exception first.
- Never `@odata.draft.enabled`.
- Actions/functions that return a structured type (any type with more than one field, or any entity projection) must reference a type declared in `db/types.cds` using `using`. Scalar returns do not need a type.

## Testing
- Write tests only for functions in `srv/lib/*.js` and for the handler functions in `srv/*.js`. See skill `jest-testing`.
