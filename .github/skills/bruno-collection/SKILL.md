---
name: bruno-collection
description: "Bruno API collection rules: OpenAPI v3 YAML only, opencollection.yml, basic auth. Use when creating or changing anything under bruno/, or generating API collections for CDS OData services."
metadata:
  version: "1"
---

# Bruno Collection Rules

- Use only OpenAPI v3 YAML format for API definitions. The only other allowed file per folder is `opencollection.yml` (OpenCollection format, not OpenAPI).
- Auth docs: https://docs.usebruno.com/auth/basic
- opencollection.yml docs: https://docs.usebruno.com/opencollection-yaml/samples
- All files live under `bruno/`.
- One separate collection folder per `.cds` file: `bruno/<basename>/`, where `<basename>` is the `.cds` file name without the `.cds` extension (e.g. `srv/schema.cds` produces `bruno/schema/`). Never share a folder between `.cds` files.
- Each folder holds one `<ServiceName>.openapi.yaml` per OData service in that file, plus its own `opencollection.yml` (OpenCollection format).
- Generate each OpenAPI file by running exactly `npx cds compile srv --service <ServiceName> --to openapi` and save the output as `bruno/<basename>/<ServiceName>.openapi.yaml`. Never Python.
- If the compile command fails or produces no output, do not write or hand-author an OpenAPI file. Report the command error and stop for that service. If a `.cds` file defines no OData services, create only its `opencollection.yml` and report that no OpenAPI files were generated.
- Services are annotated `@requires: 'authenticated-user'`, so every collection needs auth configured (basic).
- Configure basic auth in each `opencollection.yml` using Bruno environment variables for the username and password (e.g. `{{username}}` and `{{password}}`). Never write literal credentials into any file under `bruno/`.
