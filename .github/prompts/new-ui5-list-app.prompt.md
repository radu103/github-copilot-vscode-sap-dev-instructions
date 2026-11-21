---
description: "Create UI5 freestyle list app with sap.m.Table, filters, i18n and formatter."
agent: sap-btp-code-developer
---

Create UI5 freestyle app `${input:appName:App folder name, e.g. orders}` for entity `${input:entityName:Service entity, e.g. Orders}` of service `${input:serviceName:e.g. OrderService}`.

Steps:
1. Folder `app/${input:appName}/`. XML views only.
2. List view: `sap.m.Table` with filters for all associations and own date fields.
3. `BaseController.js` for shared controller functions.
4. All texts in i18n files.
5. `formatter.js` for all formatters.
6. UI annotations in the app folder as projections on the srv service.
7. manifest.json routes, views, targets: capital first letter.
8. Hungarian notation for variables. camelCase functions. `let`.
9. No controller tests.
