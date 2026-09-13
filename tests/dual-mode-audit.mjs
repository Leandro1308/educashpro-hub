import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const read = (name) => readFile(path.join(root, name), "utf8");
const [index, adapter, webAuth] = await Promise.all([
  read("index.html"),
  read("platform-adapter.js"),
  read("platform-web-auth.js"),
]);

assert(index.includes("platform-adapter.js"), "Platform adapter must load before the application");
assert(index.includes("platform-web-auth.js"), "Platform Web auth client must be prepared");
assert(index.indexOf("platform-adapter.js") < index.indexOf("platform-web-auth.js"), "Platform adapter must load before Web auth");
assert(index.indexOf("platform-web-auth.js") < index.indexOf("app.js"), "Web auth client must load before app.js");
assert(adapter.includes('return tg?.initData?"telegram":"web"'), "Environment detection is missing");
assert(adapter.includes("educashpro:web-session"), "Independent web-session storage is missing");
assert(adapter.includes("educashpro:pending-referral"), "Web referral capture is missing");
assert(adapter.includes('params.get("ref")'), "Referral query parameter is missing");
assert(webAuth.includes("/api/platform-auth/challenge"), "TON proof challenge client is missing");
assert(webAuth.includes("setConnectRequestParameters"), "TON proof request preparation is missing");
assert(webAuth.includes("connectItems?.tonProof"), "TON proof response handling is missing");
assert(webAuth.includes("/api/platform-auth/from-telegram"), "Telegram to platform-session bridge client is missing");
assert(webAuth.includes("EduCashProPlatform"), "Web auth must use the platform adapter");

// This branch prepares identity/authentication only. It must not enable Web payments.
for (const source of [index, adapter, webAuth]) {
  assert(!source.includes("sendTransaction("), "Dual-mode preparation must not send TON transactions");
  assert(!source.includes("/api/ton/build-tx"), "Dual-mode preparation must not call payment transaction builder");
  assert(!source.includes("/api/webapp/pay"), "Dual-mode preparation must not call legacy payment endpoints");
}

console.log("EduCashPro dual-mode frontend audit: OK (authentication prepared; payments disabled)");
