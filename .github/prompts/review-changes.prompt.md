---
description: "Review current changes against SAP CAP, UI5, Jest and Bruno repo rules."
agent: sap-btp-code-reviewer
---

Review ${input:scope:Changed files or specific path, e.g. all uncommitted changes} against repo rules.

Output: table severity | file:line | rule | fix. End with PASS or FAIL.
