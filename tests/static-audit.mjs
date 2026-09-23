import assert from "node:assert/strict";
import { readFile, readdir } from "node:fs/promises";
import { execFileSync } from "node:child_process";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),"..");
const read=name=>readFile(path.join(root,name),"utf8");
const files=await readdir(root);
const javascriptFiles=files.filter(name=>name.endsWith(".js"));
for(const file of javascriptFiles){
  const source=await read(file);
  execFileSync(process.execPath,["--check",path.join(root,file)],{stdio:"pipe"});
  assert(!source.includes('searchParams.get("api")'),`Public API override found in ${file}`);
}
const [index,app,agenda,support,links,games,professional,loader,help,courses,accountCenter,webAuthEntry,webSiteMenu,style,serviceWorker,pwaInstall,versionFile]=await Promise.all([
  read("index.html"),read("app.js"),read("agenda.js"),read("support.js"),read("link-tools.js"),
  read("game-suite.js"),read("professional-profile.js"),read("resource-loader.js"),read("help-center.js"),read("courses.json"),read("account-center.js"),read("web-auth-entry.js"),read("web-site-menu.js"),read("style.css"),read("sw.js"),read("pwa-install.js"),read("version.json")
]);
const technicalCourse=await read("technical-analysis-course.js");
const marketCenter=await read("market-learning-center.js");
const financeControl=await read("monthly-finance-control.js");
const localTools=await read("local-tools-and-games.js");
const affiliatePage=await read("affiliate.js");
const publishedBuild=String(JSON.parse(versionFile)?.build||"").trim();
const buildParts=publishedBuild.split(".");
const assetBuild=buildParts.length===4?`${buildParts[0]}${buildParts[1]}${buildParts[2]}.${buildParts[3]}`:publishedBuild.replace(/\./g,"");
assert(publishedBuild,"Published build is missing");
assert(app.includes(`APP_RUNTIME_BUILD = "${publishedBuild}"`),"App runtime build is not synchronized with version.json");
assert(index.includes(`__EDUCASHPRO_PAGE_BUILD__="${publishedBuild}"`),"HTML bootstrap build is not synchronized with version.json");
assert(loader.includes(`const VERSION="${assetBuild}"`),"Lazy asset version is not synchronized with version.json");
const localAssetVersions=[...index.matchAll(/\.\/[^"'?]+\.(?:js|css|webmanifest)\?v=([^"'&<>\s]+)/g)].map(match=>match[1]);
assert(localAssetVersions.length>0&&localAssetVersions.every(version=>version===assetBuild),"Index contains mixed local asset versions");
assert(serviceWorker.includes(`BUILD="${publishedBuild}"`)&&serviceWorker.includes("client.navigate")&&serviceWorker.includes('cache:"no-store"'),"Service worker does not force fresh clients and core assets");
assert(pwaInstall.includes('updateViaCache:"none"')&&pwaInstall.includes("registration.update()"),"PWA registration does not explicitly refresh the service worker");
JSON.parse(courses);
assert(!games.includes('id="gameRaffle"'),"Raffle entry must not be visible");
assert(!index.includes('<script defer src="./game-suite.js'),"Games must be lazy-loaded");
assert(!index.includes('<script defer src="./technical-analysis-course.js'),"Courses must be lazy-loaded");
assert(loader.includes("loadGames")&&loader.includes("loadCourses")&&loader.includes("loadFinance"),"Resource loader is incomplete");
assert(!loader.includes("business-21st-century-course.js")&&!loader.includes("course-final-notice.js"),"Retired course patches are still loaded");
assert(!loader.includes("video-course-access.js"),"The free video course must not load a subscriber gate");
assert(app.includes('quickCard("professional"'),"Professional Profile is missing from active home");
assert(links.includes("integratedAgendaLink"),"Agenda and public page are not integrated");
assert(links.includes("page.affiliateUrl || page.officialUrl"),"Public user pages must preserve the affiliate destination");
assert(links.includes("page.affiliateUrl || page.officialUrl")&&links.includes("link.affiliateUrl || link.officialUrl"),"Public user pages must preserve affiliate attribution");
assert(loader.includes("help-center.js")&&loader.includes("loadHelp")&&app.includes("renderBookReader"),"Help center or continuous reader is missing");
assert(app.includes("readerThemeDot")&&app.includes("educashpro:reader-theme"),"Reader theme toggle is missing");
assert(technicalCourse.includes("campaign=43340")&&!technicalCourse.includes("campaign=43335"),"Exness affiliate campaign is incorrect");
assert(technicalCourse.includes('button: "CURSO EM VÍDEO"')&&technicalCourse.includes("url: VIDEO_COURSE_URL, videoUrl: EXNESS_URL"),"Free video and Exness actions are not separated correctly");
assert(loader.includes("market-learning-center.js")&&loader.includes("loadMarkets")&&app.includes("EduCashProMarkets"),"Markets learning center is not connected");
assert(index.includes("resource-loader.js")&&loader.includes('script("./market-learning-center.js")')&&loader.includes('script("./help-center.js")'),"Complementary modules must use the non-blocking resource loader");
assert(!index.includes('src="./market-learning-center.js'),"Markets center must not race the lazy loader with an eager script");
assert(marketCenter.includes("aff_id=170669")&&marketCenter.includes("campaign=43340"),"Partner attribution is missing from the markets center");
assert(marketCenter.includes("https://academy.binance.com/")&&marketCenter.includes("https://web3.binance.com/m/referral?ref=IYN019BM"),"Binance Academy or Binance Web3 affiliate access is missing");
assert(!marketCenter.includes("babypips.com")&&!marketCenter.includes("ig.com/en/learn-to-trade"),"Non-partner course links must not be displayed");
assert(marketCenter.includes("embed-widget-advanced-chart.js")&&marketCenter.includes("embed-widget-events.js")&&marketCenter.includes("embed-widget-forex-heat-map.js")&&marketCenter.includes("embed-widget-market-overview.js"),"TradingView widgets are incomplete");
assert(app.includes("Bolsa de Valores, Análise Técnica e Price Action")&&marketCenter.includes("Bolsa de Valores, Análise Técnica e Price Action"),"Stock market, technical analysis and Price Action entry is missing");
assert(technicalCourse.includes('title: "Análise Técnica e Price Action"'),"Technical Analysis and Price Action course is missing");
assert(marketCenter.includes('new Set(["chart", "technical"])')&&app.includes("window.EduCashProAccess?.isActive?.() === true || state.profile?.active === true"),"Premium market tools are not restricted to active subscribers");
assert(loader.includes("monthly-finance-control.js")&&links.includes("page.affiliateUrl || page.officialUrl"),"The finance tool or user affiliate attribution is incomplete");
assert(financeControl.includes("educashpro:monthly-finance:")&&financeControl.includes("financeKeypad")&&financeControl.includes("exportHistory"),"Monthly finance history is incomplete");
assert(financeControl.includes("editExpense")&&financeControl.includes("removeExpense")&&financeControl.includes("localStorage"),"Finance history management is incomplete");
for(const language of ["pt:","en:","es:","ru:"])assert(financeControl.includes(language),`Missing finance translation: ${language}`);
assert(help.includes("Iscas digitais")&&help.includes("Lead magnets"),"Affiliate lead-magnet guidance is incomplete");
for(const language of ["pt:","en:","es:","ru:"])assert(help.includes(language),`Missing help translation: ${language}`);
assert(!courses.includes('"id": "negocio_seculo_xxi"')&&!courses.includes('"id": "apresentacao"'),"Retired duplicate courses remain in catalog");
assert(professional.includes('id="recommendedProfessionalAction"'),"Recommended action must have a contextual button");
assert(professional.includes('step("configureServices"')&&professional.includes('step("configureAppearance"'),"Professional setup steps are incomplete");
assert(app.includes('query.set("view", view)')&&agenda.includes('p.get("view")'),"Professional setup cannot open the requested agenda section");
for(const language of ["pt:","en:","es:","ru:"])assert(professional.includes(language),`Missing professional translation: ${language}`);

assert(index.includes("account-center.js"),"Web account center is not loaded");
assert(accountCenter.includes("/api/platform-account/overview")&&accountCenter.includes("/api/platform-account/network"),"Account overview or network parity is missing");
assert(accountCenter.includes("/api/platform-account/preferences")&&accountCenter.includes("openPreferences"),"Bot notification preferences are not available on the Web account");
assert(accountCenter.includes('data-action="subscription"')&&accountCenter.includes('data-action="pair-device"')&&accountCenter.includes('data-action="documents"')&&webSiteMenu.includes('action==="benefits"')&&webSiteMenu.includes('action==="explore"'),"Account and site menu parity shortcuts are incomplete");
assert(!accountCenter.includes("/api/ton/build-tx")&&!accountCenter.includes("sendTransaction("),"Account center must not initiate subscription payments");
for(const language of ["pt:","en:","es:","ru:"])assert(accountCenter.includes(language),`Missing account center translation: ${language}`);

console.log("EduCashPro static audit: OK");


const crossPlatformNav=await read("cross-platform-nav.js");
for(const page of ["index.html","agenda.html","affiliate.html","marketplace.html","publish.html","support.html"]){
  const source=await read(page);
  assert(source.includes("cross-platform-nav.js"),`Cross-platform navigation missing from ${page}`);
}
assert(crossPlatformNav.includes("EduCashProBot")&&crossPlatformNav.includes("go.educashpro.vip"),"Site and bot cross-navigation is incomplete");
assert(crossPlatformNav.includes("searchParams.set(\"ref\"")&&crossPlatformNav.includes("ref_"),"Cross-navigation must preserve affiliate attribution");
assert(crossPlatformNav.includes("ensureBack")&&crossPlatformNav.includes("decorateInternalLinks"),"Back-button or internal-link normalization is missing");

assert(crossPlatformNav.includes("link.textContent !== value.icon"),"Cross-platform navigation must be idempotent and must not create a mutation loop");

assert(app.includes("async function renderLearn()")&&app.includes("syncExternalSession()"),"Academy must synchronize the Web session before opening learning paths");
assert(app.includes("const active = state.profile?.active === true"),"Academy categories must not crash while the Web session is being restored");
assert(app.includes("if (!state.courseCatalog.length) await loadCourseCatalog()"),"Academy must load its course catalog in both Web and Telegram modes");
assert(app.includes("setSession")&&webAuthEntry.includes("EduCashProApp?.setSession?.(state.session)"),"Web authentication must share the subscription session with the Academy");

assert(app.includes("async function openAcademyCategory(category)")&&app.includes('new Set(["network_marketing", "financial_education", "telegram"])'),"The three Academy learning paths must use the central route");
assert(app.includes('closest?.("[data-academy-category]")')&&app.includes("void openAcademyCategory(category)"),"Academy cards need a delegated click handler that survives later modules");
assert(app.includes("setSession, openAcademyCategory, rememberRoute"),"The Academy category route must be available in both Web and Telegram modes");

assert(affiliatePage.includes('setLink("",contextReferral())')&&affiliatePage.includes("copyCurrentLink")&&affiliatePage.includes("shareCurrentLink"),"Affiliate link must be actionable before status APIs finish");
assert(affiliatePage.includes("location.origin")&&affiliatePage.includes("/?ref="),"Affiliate page must generate the canonical website referral URL");
assert(affiliatePage.includes("AbortController")&&affiliatePage.includes("12000"),"Affiliate status requests must not load forever");
assert(app.includes("personalReferralLink")&&!app.includes("p.active && state.affiliateLink"),"The personal link must remain visible while the subscriber is inactive");
assert(webAuthEntry.includes("location.origin")&&webAuthEntry.includes("/?ref="),"Web account must generate the canonical root referral URL");
assert(accountCenter.includes("affiliatePage()")&&accountCenter.includes('url.searchParams.set("ref",code)'),"Account Center must send the personal referral code to the affiliate page");

assert(app.includes("hubSessionReady")&&app.includes("const hubToken = state.hubSessionReady ? state.token"),"Web authentication must not overwrite the Hub token used by course APIs");
assert(app.includes("source.subscription?.active")&&app.includes("normalizeProfile(session.profile)"),"Subscription activity must be normalized across Web and Telegram profiles");
assert(webAuthEntry.includes("window.__EDUCASHPRO_WEB_HUB__?.active")&&webAuthEntry.includes("authenticatedLanding&&!member"),"Web authentication must not redraw the selected Hub view");
assert(app.includes("rememberRoute(view")&&app.includes('publicParams.get("academy")')&&app.includes('publicParams.get("course")'),"Selected navigation and learning routes must survive reloads and tab changes");

assert(accountCenter.includes('data-action="pair-device"')&&accountCenter.includes("openDevicePairing")&&accountCenter.includes("approveDevicePairing(code)"),"Logged-in mobile account must expose device pairing approval");
assert(webAuthEntry.includes("resolvePairExpiry")&&webAuthEntry.includes("webPairCountdown")&&webAuthEntry.includes("setInterval(updatePairCountdown"),"Device pairing must show a live server-based expiration countdown");

assert(accountCenter.includes("openDevicePairing")&&accountCenter.includes("approveDevicePairing"),"Device pairing must remain available in the authenticated account center");

assert(index.includes('classList.add(initData?"educashproTelegram":"educashproWeb")'),"The site and Telegram Mini App must receive separate layout classes");
assert(style.includes("html.educashproWeb #app")&&style.includes("@media (min-width:900px)"),"Desktop web layout must expand responsively");
assert(!style.includes("html.educashproTelegram #app"),"Desktop expansion must not change the Telegram Mini App layout");

assert(app.includes('id="publicMarketplace"')&&app.includes('href="./marketplace.html"'),"Marketplace must have a prominent public homepage button");
assert(app.includes('id="publicTelegramApp"')&&app.includes('searchParams.set("startapp"'),"Homepage must open the Telegram App and preserve referral attribution");
assert(app.includes('id="publicCredentialQr"'),"Website must show the subscriber credential when one is available");
assert(app.includes("openWebMembershipScanner")&&app.includes("Html5QrcodeScanner"),"Website scanner must use the browser camera");
assert(app.includes("crypto.subtle.verify")&&app.includes('featureCopy("credentialUntil")'),"Scanned credential must verify signature and show validity");
assert(loader.includes("loadQrScanner")&&loader.includes("html5-qrcode@2.3.8"),"QR scanner library must load on demand");

assert(index.includes("web-site-menu.js"),"The organized website menu must be loaded");
assert(webSiteMenu.includes("if(!platform?.isWeb?.())return"),"The organized menu must not alter Telegram Mini App");
for(const group of ["Principal","Aprendizado","Ferramentas","Negócios e oportunidades","Conta e assinatura","Programa de afiliados","Ajuda e preferências","Telegram"])assert(webSiteMenu.includes(group),`Missing website menu group: ${group}`);
assert(webSiteMenu.includes("html.educashproWeb .growthQuickActions{display:none!important}"),"Duplicate top shortcuts must be removed on the website");
assert(webSiteMenu.includes("publicMarketplace")===false&&webSiteMenu.includes('action==="marketplace"'),"Marketplace must have a functional menu destination");
assert(app.includes("renderTools, renderExplore, renderBenefits")&&app.includes("renderMembershipProof"),"Website menu routes must be exposed by the app");

assert(app.includes("function subscriptionDestination()")&&app.includes('"https://t.me/EduCashProBot"'),"Presentation subscription must always have a Telegram destination");
assert(app.includes('url.searchParams.set("start", referral ? `ref_${referral}` : "subscribe")'),"Subscription fallback must preserve affiliate attribution");
assert(app.includes("window.location.assign(url)")&&!app.includes('window.open(url, "_blank", "noopener")'),"Website subscription must use a direct navigation that is not blocked as a popup");
assert(app.includes("content.querySelectorAll(\".presentationSubscribe\")")&&app.includes("button.onclick = subscribeNow"),"Every presentation subscription button must be wired");
assert(index.includes('class="areaHeart"')&&style.includes(".areaHeart"),"My Area heart must use a stable colored icon");
assert(!app.includes("navigationBusy")&&app.includes("void loadAreaProjects(container)"),"Footer navigation or My Area still contains a blocking path");
