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
const [index,app,agenda,support,links,games,professional,loader,help,courses]=await Promise.all([
  read("index.html"),read("app.js"),read("agenda.js"),read("support.js"),read("link-tools.js"),
  read("game-suite.js"),read("professional-profile.js"),read("resource-loader.js"),read("help-center.js"),read("courses.json")
]);
const technicalCourse=await read("technical-analysis-course.js");
JSON.parse(courses);
assert(!games.includes('id="gameRaffle"'),"Raffle entry must not be visible");
assert(!index.includes('<script defer src="./game-suite.js'),"Games must be lazy-loaded");
assert(!index.includes('<script defer src="./technical-analysis-course.js'),"Courses must be lazy-loaded");
assert(loader.includes("loadGames")&&loader.includes("loadCourses"),"Resource loader is incomplete");
assert(!loader.includes("business-21st-century-course.js")&&!loader.includes("course-final-notice.js"),"Retired course patches are still loaded");
assert(!loader.includes("video-course-access.js"),"The free video course must not load a subscriber gate");
assert(app.includes('quickCard("professional"'),"Professional Profile is missing from active home");
assert(links.includes("integratedAgendaLink"),"Agenda and public page are not integrated");
assert(links.includes("page.affiliateUrl || page.officialUrl"),"Public user pages must preserve the affiliate destination");
assert(links.includes("page.affiliateUrl || page.officialUrl")&&links.includes("link.affiliateUrl || link.officialUrl"),"Public user pages must preserve affiliate attribution");
assert(index.includes("help-center.js")&&app.includes("renderBookReader"),"Help center or continuous reader is missing");
assert(app.includes("readerThemeDot")&&app.includes("educashpro:reader-theme"),"Reader theme toggle is missing");
assert(technicalCourse.includes("campaign=43340")&&!technicalCourse.includes("campaign=43335"),"Exness affiliate campaign is incorrect");
assert(technicalCourse.includes('button: "CURSO EM VÍDEO"')&&technicalCourse.includes("url: VIDEO_COURSE_URL, videoUrl: EXNESS_URL"),"Free video and Exness actions are not separated correctly");
assert(help.includes("Iscas digitais")&&help.includes("Lead magnets"),"Affiliate lead-magnet guidance is incomplete");
for(const language of ["pt:","en:","es:","ru:"])assert(help.includes(language),`Missing help translation: ${language}`);
assert(!courses.includes('"id": "negocio_seculo_xxi"')&&!courses.includes('"id": "apresentacao"'),"Retired duplicate courses remain in catalog");
assert(professional.includes('id="recommendedProfessionalAction"'),"Recommended action must have a contextual button");
assert(professional.includes('step("configureServices"')&&professional.includes('step("configureAppearance"'),"Professional setup steps are incomplete");
assert(app.includes('query.set("view", view)')&&agenda.includes('p.get("view")'),"Professional setup cannot open the requested agenda section");
for(const language of ["pt:","en:","es:","ru:"])assert(professional.includes(language),`Missing professional translation: ${language}`);
console.log("EduCashPro static audit: OK");
