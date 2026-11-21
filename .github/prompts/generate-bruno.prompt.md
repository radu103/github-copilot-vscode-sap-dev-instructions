---
description: "Generate one Bruno collection folder (OpenAPI v3 YAML) per CDS service file."
agent: cap-to-bruno
---

Generate Bruno collections under `bruno/` for all CDS services exposed as OData APIs. One folder per `.cds` file.

Pre-requirement: `@sap/cds-dk` installed (`cds --version`).

Steps:
1. Per `.cds` file: folder `bruno/<cdsFileName>/` with one `<ServiceName>.openapi.yaml` per OData service in the file (OpenAPI v3 YAML).
2. Per folder: `opencollection.yml` with basic auth and placeholder credentials.
3. Report table: cds file | folder | services | files.
