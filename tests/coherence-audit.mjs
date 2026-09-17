import assert from "node:assert/strict";
import fs from "node:fs";

const read = (file) => fs.readFileSync(new URL(`../${file}`, import.meta.url), "utf8");
const locale = read("locale-resolver.js");
const app = read("app.js");
const menu = read("web-site-menu.js");
const webAuth = read("web-auth-entry.js");
const pairing = read("device-pairing-ux.js");
const index = read("index.html");

assert(locale.includes('localStorage.getItem("educashpro:web-session")'), "Idioma deve consultar a sessão Web persistida");
assert(locale.indexOf("session?.profile?.language") < locale.indexOf('query.get("lang")'), "Idioma da conta deve prevalecer sobre URL e navegador");
assert(app.includes("EduCashProLocale?.resolve"), "Página principal deve usar o resolvedor canônico de idioma");
assert(!app.includes('const browserLanguage = String(navigator.language || "pt")'), "Página principal não pode depender diretamente do idioma do navegador");
assert(app.includes("resolve?.({ language: state.profile?.language })"), "Visitante sem conta deve poder usar idioma da URL ou do navegador");
assert(menu.includes("EduCashProLocale?.resolve"), "Menu deve seguir o idioma canônico da conta");
assert(webAuth.includes("EduCashProLocale?.resolve"), "Entrada Web deve seguir o idioma canônico");
assert(pairing.includes("EduCashProLocale?.resolve"), "Pareamento deve seguir o idioma canônico");
assert(index.includes("locale-resolver.js"), "Resolvedor de idioma deve carregar antes da aplicação");
assert(app.includes("/api/platform-public/config"), "Apresentação deve consultar a configuração pública do contrato");
assert(app.includes("contractRules.direct"), "Comissão direta exibida deve vir da configuração vigente");
assert(!app.includes('<div class="directCommission"><b>60%</b>'), "Apresentação não pode fixar a comissão direta em 60%");

for (const page of ["affiliate.html", "marketplace.html", "publish.html", "agenda.html", "support.html"]) {
  assert(read(page).includes("locale-resolver.js"), `${page} deve carregar o idioma canônico`);
}

console.log("EduCashPro coherence audit: OK");
