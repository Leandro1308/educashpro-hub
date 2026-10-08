import { spawn, execFileSync } from "node:child_process";
import readline from "node:readline";

const detectors = [
  ["telegram_bot_token", /\b\d{6,12}:[A-Za-z0-9_-]{35,}\b/],
  ["credentialed_mongodb_uri", /mongodb(?:\+srv)?:\/\/[^\s"'<>:]+:[^\s"'<>@]+@/i],
  ["private_key_block", /-----BEGIN (?:RSA |EC |OPENSSH |ENCRYPTED )?PRIVATE KEY-----/],
  ["github_personal_token", /\bgh[pousr]_[A-Za-z0-9_]{28,}\b/],
  ["render_api_token", /\brnd_[A-Za-z0-9]{28,}\b/],
  ["api_secret_key", /\bsk-(?:proj-)?[A-Za-z0-9_-]{35,}\b/],
];
const hits = new Set();
let currentCommit = "", currentFile = "";
const child = spawn("git", ["log", "--all", "--no-ext-diff", "--format=COMMIT:%H",
  "--patch", "--", ".", ":(exclude)package-lock.json"], { stdio:["ignore","pipe","inherit"] });
for await (const line of readline.createInterface({input:child.stdout,crlfDelay:Infinity})) {
  if (line.startsWith("COMMIT:")) currentCommit=line.slice(7).trim().slice(0,12);
  else if (line.startsWith("+++ b/")) currentFile=line.slice(6).trim().slice(0,160);
  else if (line.startsWith("+")&&!line.startsWith("+++")) {
    const added=line.slice(1);
    for (const [kind,pattern] of detectors)
      if (pattern.test(added)) hits.add(kind+" | "+currentCommit+" | "+currentFile);
  }
}
const code = await new Promise(resolve=>child.on("close",resolve));
if(code!==0)throw Error("git_log_failed");
const tracked=execFileSync("git",["ls-files","-z"],{encoding:"utf8"}).split("\0").filter(Boolean);
for(const name of tracked){
  if (/(^|\/)(?:\.env(?:\.[^/]+)?|id_rsa|id_ed25519|[^/]+\.(?:pem|p12|pfx))$/i.test(name)
      && !name.endsWith(".env.example")) hits.add("tracked_credential_file | current | "+name.slice(0,160));
}
if(hits.size){
  console.error("Security history findings (names only; no secret values):");
  for(const line of hits) console.error(" - "+line);
  process.exitCode=1;
} else console.log("Tracked files and committed patch history: no high-confidence secrets detected");
