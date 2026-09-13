import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const read = (name) => readFile(path.join(root, name), "utf8");
const [index, adapter] = await Promise.all([read("index.html"), read("platform-adapter.js")]);

assert(index.includes("platform-adapter.js"), "Platform adapter must load before the application");
assert(index.indexOf("platform-adapter.js") < index.indexOf("app.js"), "Platform adapter must load before app.js");
assert(adapter.includes('return tg?.initData?"telegram":"web"'), "Environment detection is missing");
assert(adapter.includes("educashpro:web-session"), "Independent web-session storage is missing");
assert(adapter.includes("educashpro:pending-referral"), "Web referral capture is missing");
assert(adapter.includes('params.get("ref")'), "Referral query parameter is missing");

// This branch prepares identity/navigation only. It must not enable Web payments.
for (const source of [index, adapter]) {
  assert(!source.includes("sendTransaction("), "Dual-mode preparation must not send TON transactions");
  assert(!source.includes("/api/ton/build-tx"), "Dual-mode preparation must not call payment transaction builder");
  assert(!source.includes("/api/webapp/pay"), "Dual-mode preparation must not call legacy payment endpoints");
}

console.log("EduCashPro dual-mode frontend audit: OK (payments disabled)");
