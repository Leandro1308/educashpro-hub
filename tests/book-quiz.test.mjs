import assert from "node:assert/strict";
import fs from "node:fs/promises";
import vm from "node:vm";
const root=new URL("../",import.meta.url);
const hubPrefix=await fs.access(new URL("src/hub/book-quiz-engine-v3.js",root)).then(()=>"src/hub/").catch(()=>"");
const read=path=>fs.readFile(new URL(hubPrefix+path,root),"utf8");
const sources=await Promise.all([
 read("book-quiz-engine-v3.js"),
 read("book-quiz-content-part1.js"),
 read("book-quiz-content-part2.js"),
 read("book-quiz-content-part3.js"),
 read("book-quiz-content-part4.js"),
 read("book-quiz-business-21.js"),
 read("game-suite.js")
]);
const [engine,...other]=sources;
const registry={current:null};
const values=new Map();
const localStorage={getItem:key=>values.get(key)||null,setItem:(key,v)=>values.set(key,v),removeItem:key=>values.delete(key)};
const context={window:{},document:{getElementById:()=>null},navigator:{language:"pt-BR"},localStorage,confirm:()=>true};
vm.runInNewContext(engine,context,{filename:"book-quiz-engine-v3.js"});
const originalRegister=context.window.EduCashProBookQuiz.register;
context.window.EduCashProBookQuiz.register=config=>(registry.current=config,originalRegister(config));
for(let index=1;index<=4;index++)vm.runInNewContext(sources[index],context,{filename:"book-quiz-content-part"+index+".js"});
vm.runInNewContext(sources[5],context,{filename:"book-quiz-business-21.js"});
const config=registry.current;
assert(config,"Book quiz must register");
assert.equal(context.window.EduCashProBookQuiz.version,3,"Game must use v3 engine");
assert.equal(config.id,"book-business-21");
assert.equal(config.chapters.length,21,"Book has 21 chapters");
assert.equal(config.questions.length,252,"12 questions must exist for each of 21 chapters");
assert.equal(new Set(config.questions.map(q=>q.id)).size,252,"Question ids must be distinct");
assert.equal(new Set(config.questions.map(q=>q.question)).size,252,"Question wording must not repeat");
assert.deepEqual([...config.chapters.map(c=>c.id)],[...Array.from({length:21},(_,i)=>i+1)]);
const principles=new Set(context.window.EduCashProBookQuizChapters.flatMap(c=>c.lessons.map(l=>l[2])));
assert.equal(principles.size,252,"Each lesson must teach its own distinct principle");
for(const ch of config.chapters){
 assert(ch.overview.length>200,"Chapter "+ch.id+" needs meaningful prior summary");
 assert.equal(config.questions.filter(q=>q.chapter===ch.id).length,12,"Chapter "+ch.id+" needs twelve questions");
}
const distribution=[0,0,0,0];
for(const q of config.questions){
 assert(q.intro.length>25,"Question "+q.id+" needs an introductory situation");
 assert(q.question.length>20,"Question "+q.id+" needs meaningful wording");
 assert.equal(q.options.length,4,"Every question has four answers");
 assert.equal(new Set(q.options).size,4,"Options must teach different principles");
 assert(Number.isInteger(q.answer)&&q.answer>=0&&q.answer<4);
 assert.equal(q.optionComments.length,4,"Every answer is explained");
 assert(q.comment.length>=350,"Correct answer must be explained in depth");
 for(const option of q.options)assert(principles.has(option),"Every alternative must derive from an actual lesson principle");
 for(const comment of q.optionComments)assert(comment.length>=125,"Every option needs substantive commentary");
 assert.deepEqual([...q.covers],[q.chapter],"Question must have accurate chapter coverage");
 distribution[q.answer]++;
}
assert.deepEqual(distribution,[63,63,63,63],"Correct answers should not favor a fixed letter");
assert(engine.includes("bookQuizTeaching")&&engine.includes("q.intro"),"Show concept and situation before question");
assert(engine.includes("bookQuizExplainer")&&engine.includes("bookQuizOtherTitle"),"Teach correct and alternative principles after answering");
assert(engine.includes("bookQuizReviewCard")&&engine.includes("a.selected"),"Completed chapter must support mistake review");
assert(engine.includes("book-quiz:v3:")&&engine.includes("localStorage"),"Save chapter progress locally with separate schema");
assert(!engine.includes("fetch(")&&!engine.includes("/api/"),"Gameplay may not contact Render or MongoDB");
for(let i=1;i<=4;i++)assert(!sources[i].includes("fetch("),"Source data must be static");
for(const file of ["book-quiz-engine-v3.js","book-quiz-content-part1.js","book-quiz-content-part2.js","book-quiz-content-part3.js","book-quiz-content-part4.js","book-quiz-business-21.js","book-quiz-v3.css"]){
 assert(sources[6].includes("./"+file),"Passatempo must load "+file);
}
values.set("educashpro:book-quiz:v3:book-business-21:chapter:3:device",JSON.stringify({version:3,index:1,score:1,answers:[{id:301,selected:2,correct:true}],completed:false}));
const resumed=context.window.EduCashProBookQuiz.read("book-business-21",3);
assert.equal(resumed.index,1);assert.equal(resumed.score,1);assert.equal(resumed.completed,false);
console.log("Book quiz: 21 chapters, 252 unique questions, fully commented four-way answers, local progress and mistake review: OK");
