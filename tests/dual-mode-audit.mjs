import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),"..");
const read=name=>readFile(path.join(root,name),"utf8");
const [index,adapter,webAuth]=await Promise.all([read("index.html"),read("platform-adapter.js"),read("platform-web-auth.js")]);

assert(index.includes("platform-adapter.js"),"Platform adapter must load");
assert(index.includes("platform-web-auth.js"),"Platform auth client must load");
assert(index.indexOf("platform-adapter.js")<index.indexOf("platform-web-auth.js"),"Adapter must load before auth");
assert(index.indexOf("platform-web-auth.js")<index.indexOf('src="./app.js'),"Auth helper must load before the EduCashPro app");
assert(adapter.includes("WEB_SENTINEL")&&adapter.includes("isRealTelegramInitData")&&adapter.includes('return isRealTelegramInitData()?"telegram":"web"'),"Environment detection is missing");
assert(adapter.includes("educashpro:web-session"),"Web session storage is missing");
assert(adapter.includes("educashpro:pending-referral"),"Referral capture storage is missing");
assert(webAuth.includes("/api/platform-auth/challenge"),"Auth challenge client is missing");
assert(webAuth.includes("setConnectRequestParameters"),"TON proof request is missing");
assert(webAuth.includes("connectItems?.tonProof"),"TON proof response handling is missing");
assert(webAuth.includes("/api/platform-auth/from-telegram"),"Telegram platform-session bridge is missing");
assert(webAuth.includes("/api/platform-auth/link-telegram"),"Authenticated Telegram linking client is missing");
assert(webAuth.includes("Authorization:`Bearer ${session.token}`"),"Telegram linking must use the stored EduCashPro session");

for(const source of [index,adapter,webAuth]){
  assert(!source.includes("sendTransaction("),"Dual-mode preparation must not send TON transactions");
  assert(!source.includes("/api/ton/build-tx"),"Dual-mode preparation must not build payments");
  assert(!source.includes("/api/webapp/pay"),"Dual-mode preparation must not call legacy payments");
}

console.log("EduCashPro dual-mode frontend audit: OK (payments disabled)");
