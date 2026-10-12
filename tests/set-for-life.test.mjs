import assert from "node:assert/strict";
import fs from "node:fs/promises";
import vm from "node:vm";
const root=new URL("../",import.meta.url);
const prefix=await fs.access(new URL("src/hub/set-for-life-course.js",root)).then(()=>"src/hub/").catch(()=>"");
const read=path=>fs.readFile(new URL(prefix+path,root),"utf8");
const files=["book-quiz-engine-v4.js","set-for-life-part1.js","set-for-life-part2.js","set-for-life-part3.js","set-for-life-part4.js","set-for-life-en.js","set-for-life-es.js","set-for-life-ru.js","set-for-life-course.js"];
const sources=await Promise.all(files.map(read));
const values=new Map(),context={window:{},document:{getElementById:()=>null},navigator:{language:"pt"},localStorage:{getItem:k=>values.get(k)||null,setItem:(k,v)=>values.set(k,v),removeItem:k=>values.delete(k)},confirm:()=>true};
sources.forEach((src,i)=>vm.runInNewContext(src,context,{filename:files[i]}));
const B=context.window.EduCashProSetForLife;
assert.equal(B.available("pt"),true);
const results={};const base=context.window.EduCashProBookQuiz.register;
context.window.EduCashProBookQuiz.register=cfg=>{results[cfg.locale]=cfg;return base(cfg)};
for(const l of ["pt","en","es","ru"]){assert(B.available(l),"Missing translated Set for Life lessons "+l);B.build(l)}
const snapshots={};
for(const [lang,cfg] of Object.entries(results)){
 assert.equal(cfg.id,"set-for-life");assert.equal(cfg.chapters.length,15);assert.equal(cfg.questions.length,180);
 assert.equal(new Set(cfg.questions.map(q=>q.id)).size,180);
 assert.equal(cfg.questions.reduce((t,q)=>t+q.answer,0),270);
 const counters=[0,0,0,0];
 for(const ch of cfg.chapters){
  assert.equal(cfg.questions.filter(q=>q.chapter===ch.id).length,12);
  assert(ch.overview.length>80&&ch.title.length>5);
 }
 for(const q of cfg.questions){
  assert.equal(q.options.length,4);assert.equal(new Set(q.options).size,4);
  assert(q.optionComments.every(x=>x.length>90));
  assert(q.comment.length>300);assert(q.intro.length>35);
  assert(q.answer>=0&&q.answer<=3);counters[q.answer]++;
 }
 assert.deepEqual(counters,[45,45,45,45]);
 snapshots[lang]=cfg.questions.map(q=>q.id+":"+q.answer).join("|");
}
for(const l of ["en","es","ru"]){
 assert.equal(snapshots[l],snapshots.pt,"Answer mapping changed in "+l);
 assert(results[l].questions.filter((q,i)=>q.intro!==results.pt.questions[i].intro).length>=175,"Questions were not translated: "+l);
 assert(results[l].chapters[0].title!==results.pt.chapters[0].title);
}
const catalog=JSON.parse(await read("courses.json"));
const record=catalog.courses.find(c=>c.id==="set-for-life");
assert(record?.category==="free_courses"&&record.access==="free");
assert(["pt","en","es","ru"].every(l=>record.title[l]&&record.description[l]&&record.preview[l]?.length));
const app=await read("app.js"),loader=await read("resource-loader.js"),games=await read("game-suite.js");
assert(app.includes('courseId === "set-for-life"')&&app.includes("loadSetForLifeCourse"));
assert(loader.includes("function loadSetForLifeCourse")&&loader.includes('set-for-life-"+selected+".js"'));
assert(!games.includes("set-for-life"),"Book must never appear in Pastime");
for(const src of sources)assert(!src.includes("fetch(")&&!src.includes("/api/"),"Course must work offline");
assert(sources[0].includes("bookQuizConcepts")&&sources[0].includes("config.chapters.length")&&sources[0].includes("config.questions.length"));
const lessonTotal=context.window.EduCashProSetForLifeRaw.reduce((n,c)=>n+c.lessons.length,0);
assert.equal(lessonTotal,180);
console.log("Set for Life Academy: 15 modules, 180 questions x 4 locales, original chapter teaching, feedback, access and progress OK");
