---
applyTo: "app/**/*.js, app/**/*.xml"
---

# SAP UI5 Frontend Rules
- Use the latest stable SAP UI5 LTS version patch: >=1.136.14
- Getting started help for SAP UI5: https://sapui5.hana.ondemand.com/1.71.73/#/topic/8b49fc198bf04b2d9800fc37fecbb218
- Cross-check with SAP UI5 samples: https://sapui5.hana.ondemand.com/#/api
- SAP UI5 API Documentation: https://sapui5.hana.ondemand.com/1.136.14/#/api
- SAP Fiori floorplans for common types of pages: https://www.sap.com/design-system/fiori-design-web/v1-142/page-types/floorplans/when-to-use-which-floorplan

## Naming conventions

- Always use Hungarian notation for all names of variables and properties.
- For functions, use the camelCase notation.
- For routes, views, and targets in manifest.json, use a capital first letter.

## Frontend rules

- Use a UI5 freestyle application, not Fiori extensions.
- Always use the BaseController.js pattern for reusable controller functions when needed in multiple controllers
- All lists/tables are of type sap.m.Table with filters for all associations and own date fields.
- Own app UI annotations live in each ui app/* folder and are projections on backend srv/ services.
- When a custom action or function is needed, the implementation is made only on backend srv/ services, not in ui app/*.
- All texts are maintained in i18n model language files.

## Frontend testing rules

- No tests for UI5 controller functions.