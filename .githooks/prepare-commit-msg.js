// Suggests a commit message from the branch name and staged changes.
// Only runs for plain `git commit` (no -m, merge, squash, amend).
const { execSync } = require("child_process");
const fs = require("fs");

const [msgFile, source] = process.argv.slice(2);
if (source && source !== "template") process.exit(0);

const git = (cmd) => execSync(`git ${cmd}`, { encoding: "utf8" }).trim();

let existing = fs.readFileSync(msgFile, "utf8");
if (existing.split(/\r?\n/).some((l) => l.trim() && !l.startsWith("#"))) process.exit(0);

const files = git("diff --cached --name-status")
  .split("\n")
  .filter(Boolean)
  .map((l) => {
    const [status, ...rest] = l.split("\t");
    return { status: status[0], file: rest[rest.length - 1] };
  });
if (!files.length) process.exit(0);

let prefix = "";
let branch = "";
try {
  branch = git("symbolic-ref --short HEAD");
} catch {
  // detached HEAD: no branch prefix
}
const m = branch.match(/^(?:feature|bugfix)\/([A-Z]{2,10})-(\d+)-/);
if (m) prefix = `[${m[1]}]-${m[2]} `;

const areaOf = (f) => {
  if (f.startsWith(".github/workflows/")) return "workflows";
  if (f.startsWith(".github/")) return "github config";
  const top = f.split("/")[0];
  return ["db", "srv", "app", "test", "bruno"].includes(top) ? top : f.includes("/") ? top : "root files";
};
const areas = [...new Set(files.map((f) => areaOf(f.file)))];

const statuses = new Set(files.map((f) => f.status));
let verb = "Update";
if (statuses.size === 1 && statuses.has("A")) verb = "Add";
else if (statuses.size === 1 && statuses.has("D")) verb = "Remove";

const lock = files.some((f) => f.file === "package-lock.json");
const note = lock ? "" : "\n# WARNING: package-lock.json not staged. Stage it if dependencies changed.";
const summary = `${verb} ${areas.slice(0, 3).join(", ")}${areas.length > 3 ? " and more" : ""}`;
const list = files.map((f) => `#   ${f.status} ${f.file}`).join("\n");

const suggestion = `${prefix}${summary}\n\n# Suggested message. Edit it. Title format: [ABCDE]-12345 <summary>\n# Staged:\n${list}${note}\n`;
fs.writeFileSync(msgFile, suggestion + existing);
