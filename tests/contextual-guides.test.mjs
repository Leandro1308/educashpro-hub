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
assert.equal(keys.length,36);
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
 assert.equal(articles.length,14,lang+" manual coverage");
 assert(articles.every(x=>x.steps.length>=4&&x.title),lang+" old manual must remain intact");
}
const listeners={};const document={addEventListener:(n,fn)=>{listeners[n]=fn},documentElement:{lang:"pt"},body:null};
const sandbox={window,document,navigator:{language:"pt-BR"},location:{pathname:"/app/",href:"https://test.example/app/"},Element:class{},setTimeout:()=>0};
vm.runInNewContext(guide,sandbox);
const guides=window.EduCashProContextGuide;assert(guides?.open && guides?.close);
const registryIDs=[...registry.matchAll(/\{ id:"([^"]+)", group:/g)].map(x=>x[1]);
assert(registryIDs.includes("technical") && !registryIDs.includes("games"));
for(const id of registryIDs){assert(guides.available(id),"Registry function has no guide: "+id)}
for(const id of ["book-business-21","set-for-life","free_courses","receivables","quote","qr-code","smart-link","link-page","affiliate-calc","agenda-team","agenda-finance","market-chart","market-technical","market-calendar","market-fibonacci","company-register","project-register","wallet"]){
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
console.log("EduCashPro guide audit OK:",registryIDs.length,"features;",keys.length,"detailed guides x 4 languages and 14 help articles x 4; every entrypoint wired");

 
// Regression: navigating between functions must not create a modal.
class FakeElement {
 constructor(tag="div"){
  this.tagName=tag.toUpperCase();this.id="";this.hidden=false;this.dataset={};
  this.children=new Map();this.attributes={};this._html="";this.removed=false;
 }
 set innerHTML(value){this._html=value;this.children.clear()}
 get innerHTML(){return this._html}
 querySelector(selector){
  if(!this.children.has(selector))this.children.set(selector,new FakeElement("button"));
  return this.children.get(selector);
 }
 setAttribute(k,v){this.attributes[k]=String(v)}
 remove(){this.removed=true;mounted.delete(this.id)}
 closest(){return null}
}
const mounted=new Map();
const listeners2=new Map();
let localLanguage="pt",assetRequests=0;
const fakeBody={appendChild(el){mounted.set(el.id,el);return el}};
const fakeDocument={
 body:fakeBody,documentElement:{lang:"pt"},
 createElement:tag=>new FakeElement(tag),
 getElementById:id=>mounted.get(id)||null,
 addEventListener:(type,fn)=>listeners2.set(type,fn)
};
const fakeWindow={
 EduCashProLocale:{resolve:()=>localLanguage},
 EduCashProResources:{script:()=>{assetRequests++;return Promise.resolve(true)}}
};
const fakeStorage={getItem:()=>null,removeItem:()=>{},setItem:()=>{}};
const synthetic={window:fakeWindow,document:fakeDocument,navigator:{language:"pt-BR"},sessionStorage:fakeStorage,Element:FakeElement,location:{pathname:"/app/",href:"https://go.educashpro.vip/app/"},setTimeout:fn=>(fn(),1)};
vm.runInNewContext(guide,synthetic,{filename:"contextual-guide.js"});
listeners2.get("DOMContentLoaded")();
assert(!mounted.has("ecpGuideOverlay"),"A tutorial must not appear when the page loads");
let launcher=mounted.get("ecpContextGuideLauncher");
assert(launcher&&launcher.hidden,"The help button should not cover the public home page");
class ToolTarget extends FakeElement{
 constructor(id){super("button");this.dataset.toolId=id}
 closest(selector){return selector.includes("[data-tool-id]")?this:null}
}
listeners2.get("click")({target:new ToolTarget("receivables")});
launcher=mounted.get("ecpContextGuideLauncher");
assert.equal(launcher.hidden,false,"Each tool must show a small How to Use button");
assert(!mounted.has("ecpGuideOverlay"),"Clicking a tool must NOT automatically open instructions");
assert.equal(assetRequests,0,"Translated content should load only when the user asks for help");
const howTo=launcher.querySelector("#ecpContextGuideButton");
assert(howTo.textContent.includes("Como usar"),"The compact label must be visible in Portuguese");
howTo.onclick();
assert(mounted.has("ecpGuideOverlay"),"Help must open only when the user presses the button");
fakeWindow.EduCashProContextGuide.close();
assert(!mounted.has("ecpGuideOverlay"),"The instructional card must be closable without navigating away");
assert.equal(launcher.hidden,false,"Help remains available after closing the tutorial");
launcher.querySelector("#ecpContextGuideDismiss").onclick();
assert.equal(launcher.hidden,true,"The X must dismiss the small button on this function");
assert(!mounted.has("ecpGuideOverlay"),"The X must also close any open tutorial");
listeners2.get("click")({target:new ToolTarget("qr-code")});
assert.equal(launcher.hidden,false,"The help button must return on another function");
assert(!mounted.has("ecpGuideOverlay"),"Switching tools must remain free of automatic cards");
localLanguage="en";
listeners2.get("click")({target:new ToolTarget("smart-link")});
assert(howTo.textContent.includes("How to use"),"Help control must follow the selected language");
fakeWindow.EduCashProContextGuide.close();
for(const page of ["/agenda.html","/marketplace.html","/affiliate.html","/publish.html","/support.html"]){
 const pageMounted=new Map(),pageListeners=new Map();
 const pageDocument={body:{appendChild:el=>pageMounted.set(el.id,el)},documentElement:{lang:"pt"},createElement:t=>new FakeElement(t),getElementById:id=>pageMounted.get(id)||null,addEventListener:(type,fn)=>pageListeners.set(type,fn)};
 const target={window:{EduCashProLocale:{resolve:()=>"pt"}},document:pageDocument,navigator:{language:"pt-BR"},sessionStorage:fakeStorage,Element:FakeElement,location:{pathname:page,href:"https://example.com"+page},setTimeout:fn=>(fn(),1)};
 vm.runInNewContext(guide,target);
 pageListeners.get("DOMContentLoaded")();
 assert(pageMounted.get("ecpContextGuideLauncher")?.hidden===false, "Standalone page must show the compact button: "+page);
 assert(!pageMounted.has("ecpGuideOverlay"),"Standalone page must not show tutorial automatically: "+page);
}
console.log("Contextual tutorial interactions: on-demand, dismiss X, feature switches, independent pages and four-language button: OK");
