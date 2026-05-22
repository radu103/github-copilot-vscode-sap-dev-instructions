---
applyTo: "srv/**/*.js, db/**/*.cds, srv/**/*.cds"
---

## Programming language and tools

- SAP CAP Framework documentation
- Docs for services: https://cap.cloud.sap/docs/node.js/
- Docs for SAP CAP CDS: https://cap.cloud.sap/docs/cds/cdl
- Docs for SAP CAP: https://cap.cloud.sap/docs/guides/
- JavaScript implementation for services and the UI5 freestyle app
- UI5 XML views only
- ESLint validation and fixes
- Enforce and obey rules in the .github folder; ask for permission otherwise.
- Use Husky to run lint:fix on committed files.
- Never use Python to solve anything; use JavaScript/Node.js tools.

## Naming conventions

- Always use camelCase for all names of variables and properties.
- Use capitalized names for services and entities.
- For variable declaration use `let` instead of `var`

## Database model rules

- Do not use UUID; use String(36) instead. No deterministic ids and no UIID-MAPPING but always consistent references.
- All entities use the cuid aspect.
- All entities use the managed aspect.
- All entity names are always as singular, never plural in db and services.
- Generated CSV data must not import managed fields : `createdAt`, `createdBy`, `modifiedAt`, `modifiedBy`
- Associations are defined using two fields: referenceID of type String(36) and the association on that reference field.
- Do not use compositions. No `Composition of` or `composition of` usage.
- All types are in the types.cds file and are reused.
- Entities are in separate files based on the main relationship domain.
- Use Integer enums with text names.
- Use an isActive boolean property and always use soft-delete logic; only hard-delete from persisted data in case of user roles.
- Data IDs marked as cuid always generate UUID v4 strings for data/migration and testing purposes, but the database model uses String(36) to store them.
  
## Backend rules

- Reuse all entities and types from the db/* folder.
- All services are in the srv folder.
- All services include model associations.
- Do not use compositions.
- No UI annotations in srv/* services.
- All services are annotated with "@requires: 'authenticated-user'".
- Never use @odata.draft.enabled.
- CAP service actions and functions that return complex types must use types created in db/types.cds and reused with using.

## Backend testing

- Test only utils and service implementation functions.
