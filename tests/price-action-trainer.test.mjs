import assert from "node:assert/strict";
import {readFile} from "node:fs/promises";
import {runInNewContext} from "node:vm";
import {fileURLToPath} from "node:url";
import path from "node:path";

const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),"..");
const dataSource=await readFile(path.join(root,"price-action-data.js"),"utf8");
const trainerSource=await readFile(path.join(root,"price-action-trainer.js"),"utf8");
const marketSource=await readFile(path.join(root,"market-learning-center.js"),"utf8");
const loaderSource=await readFile(path.join(root,"resource-loader.js"),"utf8");

assert(loaderSource.includes("function loadPriceAction()"),"Trainer must be loaded on demand");
assert(loaderSource.includes('script("./price-action-data.js")'),"Offline dataset is missing from lazy loader");
assert(!trainerSource.includes("fetch(")&&!trainerSource.includes("/api/"),"Training must not require an API");
const exness=marketSource.indexOf('class="marketExnessInvite"');
const trainer=marketSource.indexOf('id="marketPriceAction"');
const academy=marketSource.indexOf('esc(copy.education)');
assert(exness>=0 && trainer>exness && academy>trainer,"Trainer must appear after Exness and before the courses");
assert(!marketSource.includes('src="./price-action-trainer.js"'),"Training must not eagerly load");

const store=new Map();
const host={
  innerHTML:"",isConnected:false,handlers:{},contains(){return true;},
  addEventListener(type,handler){this.handlers[type]=handler;}
};
const window={devicePixelRatio:1,addEventListener(){}};
const localStorage={getItem(key){return store.has(key)?store.get(key):null;},setItem(key,val){store.set(key,String(val));}};
const context={window,localStorage,document:{getElementById(){return host;}},requestAnimationFrame(){},console,Intl,Date,Math,JSON,Number,Set,String,Object};
runInNewContext(dataSource,context,{filename:"price-action-data.js"});
const dataset=window.EduCashProPriceActionData;
assert.equal(dataset.source,"Binance Spot Public Klines");
for(const pair of ["BTCUSDT","ETHUSDT"])for(const period of ["15m","1h"]){
  const bars=dataset.pairs[pair+"_"+period];
  assert(bars.length>=400,"Dataset too small: "+pair+" "+period);
  let previous=-Infinity;
  for(const bar of bars){
    const [timestamp,open,high,low,close]=bar;
    assert(timestamp>previous,"Candles must be strictly chronological");previous=timestamp;
    assert(high>=Math.max(open,close)&&low<=Math.min(open,close)&&low>0,"Invalid historical OHLC candle");
    assert(timestamp<Date.parse(dataset.snapshotUTC),"Training dataset contains unclosed candles");
  }
}
runInNewContext(trainerSource,context,{filename:"price-action-trainer.js"});
const api=window.EduCashProPriceAction;
assert.equal(typeof api.render,"function");
api.render({target:host,language:"pt"});
assert(host.innerHTML.includes("Entenda os candles"),"First lesson must render");
assert(host.innerHTML.includes("Bitcoin"),"Default asset must render");
function press(data,attribute) {
  const button={dataset:data,closest(){return this;},hasAttribute(name){return name===attribute;}};
  host.handlers.click({target:button});
}
press({paAnswer:"0"},"data-pa-answer");
assert(host.innerHTML.includes("Muito bem!"),"Correct answer must produce feedback");
assert(JSON.parse(store.get("educashpro:price-action:v1")).completed.includes(0),"Learning progress must be saved locally");
press({paMode:"train"},"none");
assert(host.innerHTML.includes("Patrimônio virtual"),"Practice mode must render");
press({paChoice:"buy"},"none");
press({},"data-pa-reveal");
assert(host.innerHTML.includes("Compra executada"),"A simulated spot buy should execute on the next candle");
press({paChoice:"sell"},"none");
press({},"data-pa-reveal");
assert(host.innerHTML.includes("Venda executada"),"Simulated spot sale must be possible after buying");
assert(host.innerHTML.includes("2/24"),"Two candles must have been revealed");
press({},"data-pa-new");
assert(host.innerHTML.includes("0/24"),"A new challenge must reset the reveal counter");
for(const lang of ["en","es","ru"]){
  api.render({target:host,language:lang});
  assert(host.innerHTML.includes(lang==="en"?"Virtual equity":lang==="es"?"Patrimonio virtual":"Виртуальный капитал"),"Missing localized simulator: "+lang);
}


// Integration: the historical trainer inherits the same 37 lessons as the Academy.
const courseSource=await readFile(path.join(root,"technical-analysis-course.js"),"utf8");
context.MutationObserver=class {observe(){} disconnect(){}};
runInNewContext(courseSource,context,{filename:"technical-analysis-course.js"});
const course=window.EDUCASHPRO_TECHNICAL_ANALYSIS_COURSE;
assert.equal(typeof course.getTrainerLessons,"function");
for(const lang of ["pt","en","es","ru"]){
  const lessons=course.getTrainerLessons(lang);
  assert.equal(lessons.length,37,"Full Academy content must be available: "+lang);
  assert(lessons.every(lesson=>lesson.title&&lesson.body&&lesson.confirmation&&lesson.commonError&&lesson.example&&lesson.figure.includes("<svg")),
    "Every course topic needs explanation, confirmation, mistake, example and visual figure");
}
press({paMode:"learn"},"none");
api.render({target:host,language:"pt"});
assert(host.innerHTML.includes("37"),"Lesson total must come from Academy");
assert(host.innerHTML.includes("O que a análise técnica realmente faz"),"Trainer must load original first concept");
assert(host.innerHTML.includes("Candles reais da Binance"),"Historical sample must be identified");
assert(host.innerHTML.includes("data-pa-overlay"),"Annotations must be controllable");
assert(host.innerHTML.includes("Figura esquemática do curso"),"Course diagram must be accessible");
host.handlers.change({target:{value:"32",matches(query){return query==="[data-pa-lesson]";}}});
assert(host.innerHTML.includes("XAUUSD"),"The gold lesson must be available");
assert(host.innerHTML.includes("Não são dados do ouro"),"Crypto candles must never be misrepresented as gold data");
host.handlers.change({target:{value:"1",matches(query){return query==="[data-pa-lesson]";}}});
assert(host.innerHTML.includes("Anatomia do candle"),"Lesson selector must navigate");
press({paAnswer:"0"},"data-pa-answer");
assert(host.innerHTML.includes("Muito bem!"),"Academy-based quiz should accept a correct response");
assert(JSON.parse(store.get("educashpro:price-action:v1")).completedV2.includes(1),"Full-course progress must be persisted separately");
host.handlers.change({target:{checked:false,matches(query){return query==="[data-pa-overlay]";}}});
assert(!host.innerHTML.includes("data-pa-overlay checked"),"Overlay checkbox must be toggleable");
press({paMode:"train"},"none");
assert(host.innerHTML.includes("Patrimônio virtual"),"Spot practice remains independent after integration");
console.log("37 Academy concepts, historical data, schematic figures, progress, four locales and spot practice OK");
