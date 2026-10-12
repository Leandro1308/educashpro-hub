import assert from "node:assert/strict";
import fs from "node:fs/promises";
import vm from "node:vm";
const root=new URL("../",import.meta.url);
const mount=await fs.access(new URL("src/hub/contextual-guide.js",root)).then(()=>"src/hub/").catch(()=>"");
const read=name=>fs.readFile(new URL(mount+name,root),"utf8");
const [guide,manual,pt,en,es,ru,registry,app,loader,tools,html,agenda,marketplace,affiliate,support,publish]=await Promise.all([
 "contextual-guide.js","support-manual.js","contextual-guides-pt.js","contextual-guides-en.js",
 "contextual-guides-es.js","contextual-guides-ru.js","feature-registry.js",
 "app.js","resource-loader.js","local-tools-and-games.js",
 "index.html","agenda.html","marketplace.html","affiliate.html","support.html","publish.html"
].map(read));
const window={};
for(const source of [manual,pt,en,es,ru])vm.runInNewContext(source,{window});
const localizations=window.EduCashProGuideTranslations;
assert(localizations,"Contextual guide translations not loaded");
const keys=Object.keys(localizations.pt);
assert.equal(keys.length,43);
for(const lang of ["pt","en","es","ru"]){
 const docs=localizations[lang];
 assert(docs,"Guide language missing: "+lang);
 assert.deepEqual(Object.keys(docs),keys,"Guide list differs: "+lang);
 for(const [id,entry] of Object.entries(docs)){
   assert.equal(entry.length,4,lang+" "+id);
   assert(entry[0].length>=5&&entry[1].length>=20,lang+" "+id+" missing title/description");
   assert(Array.isArray(entry[2])&&entry[2].length>=4,lang+" "+id+" lacks beginner steps");
   assert(entry[2].every(step=>step.length>=20),lang+" "+id+" missing meaningful instructions");
   assert(entry[3].length>=15,lang+" "+id+" missing closing information");
 }
 const articles=window.EduCashProSupportManual.articles(lang);
 assert.equal(articles.length,15,lang+" manual coverage");
 assert(articles.every(x=>x.steps.length>=4&&x.title),lang+" old manual must remain intact");
}
const listeners={};const document={addEventListener:(n,fn)=>{listeners[n]=fn},documentElement:{lang:"pt"},body:null};
const sandbox={window,document,navigator:{language:"pt-BR"},location:{pathname:"/app/",href:"https://test.example/app/"},Element:class{},setTimeout:()=>0};
vm.runInNewContext(guide,sandbox);
const guides=window.EduCashProContextGuide;assert(guides?.open && guides?.close);
const registryIDs=[...registry.matchAll(/\{ id:"([^"]+)", group:/g)].map(x=>x[1]);
assert(registryIDs.length>=20);
for(const id of registryIDs){assert(guides.available(id),"Registry function has no guide: "+id)}
for(const id of ["book-business-21","set-for-life","free_courses","receivables","quote","qr-code","smart-link","link-page","affiliate-calc","math-space","peg-solitaire","sliding-puzzle","word-search","math-academy","agenda-team","agenda-finance","market-chart","market-technical","market-calendar","market-fibonacci","company-register","project-register","wallet"]){
 assert(guides.available(id),"Public function has no instructions: "+id);
}
for(const path of [html,agenda,marketplace,affiliate,support,publish]){
 assert(path.includes("contextual-guide.js"),"Entry point missing guided cards");
 assert(path.includes("contextual-guide.css"),"Entry point missing guide styling");
}
assert(guide.includes('document.addEventListener("click"')&&guide.includes("ecpGuideSteps")&&guide.includes("ecpContextGuideButton"));
assert(!guide.includes("fetch(")&&!guide.includes("/api/"),"Guidance must not call Render APIs");
assert(app.includes("renderCourseCategory")&&loader.includes("loadBookCourse"),"Guide update cannot remove the Academy course");
assert(tools.includes('toolCard("receivables"')&&tools.includes('toolCard("quote"'),"Financial tools must remain intact");
assert(en.length>5000&&es.length>5000&&ru.length>5000,"Guide translations must be static assets");
console.log("EduCashPro guide audit OK:",registryIDs.length,"features;",keys.length,"detailed guides x 4 languages and 15 legacy help articles x 4; every entrypoint wired");
