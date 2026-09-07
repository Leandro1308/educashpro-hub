import assert from "node:assert/strict";
import { readFile, readdir } from "node:fs/promises";
import { execFileSync } from "node:child_process";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),"..");
const read=name=>readFile(path.join(root,name),"utf8");
const files=await readdir(root);
for(const file of files.filter(name=>name.endsWith(".js"))){
  execFileSync(process.execPath,["--check",path.join(root,file)],{stdio:"pipe"});
}
const [index,app,agenda,support,links,games,professional,loader]=await Promise.all([
  read("index.html"),read("app.js"),read("agenda.js"),read("support.js"),read("link-tools.js"),
  read("game-suite.js"),read("professional-profile.js"),read("resource-loader.js")
]);
for(const source of [app,agenda,support,links,games,professional]){
  assert(!source.includes('searchParams.get("api")'),"Public API override must not exist");
}
assert(!games.includes('id="gameRaffle"'),"Raffle entry must not be visible");
assert(!index.includes('<script defer src="./game-suite.js'),"Games must be lazy-loaded");
assert(!index.includes('<script defer src="./technical-analysis-course.js'),"Courses must be lazy-loaded");
assert(loader.includes("loadGames")&&loader.includes("loadCourses"),"Resource loader is incomplete");
assert(app.includes('quickCard("professional"'),"Professional Profile is missing from active home");
assert(links.includes("integratedAgendaLink"),"Agenda and public page are not integrated");
assert(professional.includes('id="recommendedProfessionalAction"'),"Recommended action must have a contextual button");
assert(professional.includes('step("configureServices"')&&professional.includes('step("configureAppearance"'),"Professional setup steps are incomplete");
assert(app.includes('query.set("view", view)')&&agenda.includes('p.get("view")'),"Professional setup cannot open the requested agenda section");
for(const language of ["pt:","en:","es:","ru:"])assert(professional.includes(language),`Missing professional translation: ${language}`);
console.log("EduCashPro static audit: OK");
