---
name: sap-ui5
description: "SAP UI5 freestyle frontend rules: Hungarian notation, BaseController, sap.m.Table lists, i18n, formatter.js, manifest naming. Use when creating or changing app/**/*.js, app/**/*.xml, views, controllers, manifest.json, i18n, UI annotations."
metadata:
  version: "1"
---

# SAP UI5 Frontend Rules

Docs:
- Use latest stable UI5 LTS patch: >=1.136.14
- API: https://sapui5.hana.ondemand.com/1.136.14/#/api
- Samples/API: https://sapui5.hana.ondemand.com/#/api
- Getting started: https://sapui5.hana.ondemand.com/1.136.14/#/topic/8b49fc198bf04b2d9800fc37fecbb218
- Fiori floorplans: https://www.sap.com/design-system/fiori-design-web/v1-142/page-types/floorplans/when-to-use-which-floorplan

## Naming
- Hungarian notation for all JavaScript variables and object properties: prefix by type, o = object (oTable), s = string (sName), a = array (aItems), b = boolean (bBusy), i = integer (iCount), m = map (mFilters), fn = function (fnHandler). manifest.json keys are excluded from this rule.
- Functions: camelCase.
- manifest.json routes, views, targets: capital first letter.
- Variable declaration: `let`, never `var`.

## Frontend
- UI5 freestyle app. No Fiori extensions. XML views only.
- `BaseController.js` pattern for controller functions reused in multiple controllers.
- All lists/tables use `sap.m.Table`. Add a filter (sap.m.SearchField or sap.ui.comp.filterbar.FilterBar field) for every navigation property (association) and every field of type Edm.Date or Edm.DateTime defined on the entity in the backend srv/ metadata.
- Own UI annotations live in each `app/*` folder. They are projections on backend `srv/` services.
- Custom action/function: implement only in backend `srv/`. Never in `app/*`.
- All texts in i18n model language files.
- Every user-visible string in XML views (text, title, label, placeholder attributes) and JavaScript (MessageBox, MessageToast, error messages) uses a binding to the i18n model, e.g. {i18n>keyName}, or getResourceBundle().getText("keyName"). Hardcoded user-facing strings are not allowed. Keys are defined in the app/*/i18n/i18n.properties file of the same app folder.
- All formatters in separate `formatter.js` in each `app/*` folder.

## Testing
- No tests for UI5 controller functions.
