import assert from "node:assert/strict";
import fs from "node:fs/promises";
import vm from "node:vm";
const root=new URL("../",import.meta.url);
const hubPrefix=await fs.access(new URL("src/hub/book-quiz-engine-v4.js",root)).then(()=>"src/hub/").catch(()=>"");
const read=path=>fs.readFile(new URL(hubPrefix+path,root),"utf8");
const paths=["book-quiz-engine-v4.js","book-quiz-content-part1.js","book-quiz-content-part2.js","book-quiz-content-part3.js","book-quiz-content-part4.js","book-quiz-content-en.js","book-quiz-content-es.js","book-quiz-content-ru.js","book-quiz-business-21-i18n.js"];
const sources=await Promise.all(paths.map(read));
const values=new Map();
const localStorage={getItem:key=>values.get(key)||null,setItem:(key,val)=>values.set(key,val),removeItem:key=>values.delete(key)};
const context={window:{},document:{getElementById:()=>null},navigator:{language:"pt-BR"},localStorage,confirm:()=>true};
const execute=(i)=>vm.runInNewContext(sources[i],context,{filename:paths[i]});
execute(0);
assert.equal(context.window.EduCashProBookQuiz.version,4);
for(let i=1;i<=8;i++)execute(i);
const records={};
const native=context.window.EduCashProBookQuiz.register;
context.window.EduCashProBookQuiz.register=(config)=>{records[config.locale]=config;return native(config)};
const B=context.window.EduCashProBookQuizBooks;
assert.deepEqual([...B.supported],["pt","en","es","ru"]);
for(const lang of ["pt","en","es","ru"]){
 assert.equal(B.available(lang),true,"Complete content missing in "+lang);
 assert.equal(B.build(lang),true,"Cannot register "+lang);
 assert(context.window.EduCashProBookQuiz.has("book-business-21",lang));
}
assert.equal(Object.keys(records).length,4);
const signatures={};
for(const [lang,c] of Object.entries(records)){
 assert.equal(c.id,"book-business-21");
 assert.equal(c.locale,lang);
 assert.equal(c.chapters.length,21);
 assert.equal(c.questions.length,252);
 assert.equal(new Set(c.questions.map(q=>q.id)).size,252);
 assert.equal(new Set(c.questions.map(q=>q.question)).size,252);
 assert.equal(new Set(c.chapters.map(ch=>ch.id)).size,21);
 assert(c.subtitle.includes("252"));
 assert.equal(c.questions.reduce((sum,q)=>sum+Number(q.answer),0),378);
 const counters=[0,0,0,0];
 for(const ch of c.chapters){
  assert(ch.title.length>3&&ch.overview.length>70,"Incomplete chapter "+ch.id+" in "+lang);
  assert.equal(c.questions.filter(q=>q.chapter===ch.id).length,12);
 }
 for(const q of c.questions){
  assert(q.intro.length>20,"Missing pre-question study: "+lang+" "+q.id);
  assert(q.question.length>15,"Missing question: "+lang+" "+q.id);
  assert.equal(q.options.length,4);
  assert.equal(new Set(q.options).size,4,"Duplicate concepts: "+lang+" "+q.id);
  assert(q.answer>=0&&q.answer<4&&Number.isInteger(q.answer));
  assert(q.options.every(o=>o.length>15),"Short option: "+lang+" "+q.id);
  assert.equal(q.optionComments.length,4);
  assert(q.optionComments.every(c=>c.length>100),"Missing alternative explanation: "+lang+" "+q.id);
  assert(q.comment.length>280,"Incomplete extended commentary: "+lang+" "+q.id);
  assert.equal(q.covers.length,1);
  assert.equal(q.covers[0],q.chapter);
  counters[q.answer]++;
 }
 assert.deepEqual(counters,[63,63,63,63],"Answer positions must remain balanced in "+lang);
 signatures[lang]=c.questions.map(q=>q.id+":"+q.answer).join("|");
}
for(const lang of ["en","es","ru"]){
 assert.equal(signatures[lang],signatures.pt,"Translations changed answer mapping in "+lang);
 const different=records[lang].questions.filter((q,i)=>q.question!==records.pt.questions[i].question).length;
 assert(different>230,"Language appears to be falling back to Portuguese: "+lang);
 assert(records[lang].chapters[0].title!==records.pt.chapters[0].title,"Untranslated chapter title "+lang);
}
assert(records.ru.chapters[8].title.startsWith("Актив 1"));
assert(records.en.chapters[8].title.startsWith("Asset 1"));
assert(records.es.chapters[8].title.startsWith("Activo 1"));
assert(sources[0].includes("bookQuizTeaching")&&sources[0].includes("bookQuizOtherTitle"));
assert(sources[0].includes("bookQuizReviewCard")&&sources[0].includes("localStorage"));
assert(!sources[0].includes("l!==\"pt\""),"Portuguese-only language notice must not remain");
assert(!sources[0].includes("fetch(")&&!sources[0].includes("/api/"),"Quiz must not contact API");
assert(!sources[8].includes("fetch(")&&!sources[8].includes("/api/"));

const academyApp=await read("app.js");
const academyLoader=await read("resource-loader.js");
const academyCatalog=JSON.parse(await read("courses.json"));
const freeCourse=academyCatalog.courses.find(c=>c.id==="book-business-21");
assert(freeCourse && freeCourse.access==="free" && freeCourse.category==="free_courses","Book course must be free in Academy");
assert(["pt","en","es","ru"].every(lang=>freeCourse.title[lang]&&freeCourse.description[lang]),"Course metadata must support every language");
assert(academyApp.includes('courseId === "book-business-21"')&&academyApp.includes('loadBookCourse?.(state.language)'),"Academy must launch the local course");
assert(academyApp.includes('new Set(["free_courses", "network_marketing", "financial_education", "telegram"])'),"Free courses must be an Academy learning path");
assert(academyLoader.includes("function loadBookCourse(")&&academyLoader.includes("book-quiz-engine-v4.js"),"Book course must load only in Academy");
assert(!academyLoader.includes("loadGames"),"Academy loader must not restore pastime games");
assert(sources[0].includes("bookQuizConcepts")&&sources[0].includes("conceptCards"),"12 concepts must be taught before quiz");
assert(!sources[0].includes('EDUCASHPRO · ${esc'),"Malformed green header must not render");

for(const file of ["book-quiz-engine-v4.js","book-quiz-business-21-i18n.js"]){
 assert(academyLoader.includes(file),"Academy resource loader missing "+file);
}
assert(academyLoader.includes('book-quiz-content-"+selected+".js"'),"Book course must load locale content dynamically");

values.set("educashpro:book-quiz:v3:book-business-21:chapter:3:device",JSON.stringify({version:3,index:1,score:1,answers:[{id:301,selected:2,correct:true}],completed:false}));
const saved=context.window.EduCashProBookQuiz.read("book-business-21",3);
assert.equal(saved.index,1);
assert.equal(saved.score,1);
console.log("Book quiz four languages: 21 chapters x 12 lessons x 4 languages; 1008 questions, all answer explanations, consistent correctness and local persistence: OK");

