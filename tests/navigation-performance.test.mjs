import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';

const pages=fs.readdirSync('.').filter(name=>name.endsWith('.html'));
for(const page of pages){
 const source=fs.readFileSync(page,'utf8');
 for(const match of source.matchAll(/<(?:script|link)\b[^>]*?(?:src|href)=["'](\.\/[^"']+)["']/g)){
  const path=match[1].split(/[?#]/)[0];
  assert(fs.existsSync(path),`${page}: missing ${path}`);
 }
}

// Resolve requests out of order to reproduce rapid filter/detail navigation.
const elements=new Map();
const element=id=>{
 if(!elements.has(id))elements.set(id,{value:'',innerHTML:'',classList:{add(){},remove(){},toggle(){}},disabled:false});
 return elements.get(id);
};
const pending=[];
const context={URL,URLSearchParams,AbortController,AbortSignal,setTimeout,clearTimeout,
 navigator:{language:'pt'},location:{href:'https://example.test/marketplace.html',search:''},
 history:{pushState(){}},localStorage:{getItem(){return null},setItem(){}},
 document:{getElementById:element,documentElement:{},querySelectorAll(){return []}},
 console:{error(){}},window:{scrollTo(){}},
 fetch(url,options){assert(options.signal,'Request must have a deadline');return new Promise(resolve=>pending.push({url,resolve:data=>resolve({ok:true,json:async()=>data})}));}};
context.window.EduCashProLocale={resolve:()=> 'pt'};
let source=fs.readFileSync('marketplace.js','utf8');
const start=source.indexOf('  applyCopy(); renderSegments(');
assert(start>0);
source=source.slice(0,start)+`  renderList=data=>window.lastList=data;
 showSkeleton=()=>{}; readCache=()=>null; writeCache=()=>{};
 closeReport=()=>{}; detailMarkup=item=>item.id;
 window.audit={loadCompanies,openCompany,closeDetail,state};
})();`;
vm.runInNewContext(source,context);
const api=context.window.audit;
const first=api.loadCompanies();
element('searchInput').value='new';
const second=api.loadCompanies();
assert.equal(pending.length,2,'Changed filters must not be dropped while loading');
pending[1].resolve({ok:true,items:[{id:'new'}]});await second;
pending[0].resolve({ok:true,items:[{id:'old'}]});await first;
assert.equal(context.window.lastList.items[0].id,'new','Old results must not replace current filters');
const a=api.openCompany('a'),b=api.openCompany('b');
pending[3].resolve({ok:true,item:{id:'b'}});await b;
pending[2].resolve({ok:true,item:{id:'a'}});await a;
assert.equal(element('companyDetail').innerHTML,'b');
const c=api.openCompany('c');api.closeDetail();
const afterClose=element('companyDetail').innerHTML;
pending[4].resolve({ok:true,item:{id:'c'}});await c;
assert.equal(element('companyDetail').innerHTML,afterClose,'Leaving detail invalidates pending rendering');

// MutationObserver must settle after normalizing its own status message.
const pairing=fs.readFileSync('device-pairing-ux.js','utf8');
const callback=pairing.match(/const statusObserver=new MutationObserver\(\(\)=>\{([\s\S]*?)\n    \}\);/)[1];
let writes=0,timers=0,value='authorized';
const status={get textContent(){return value},set textContent(v){writes++;value=v}};
const run=new Function('status','s','window','setOpened',callback);
for(let i=0;i<5;i++)run(status,key=>key==='approved'?'Device authorized.':'Invalid code.',{setTimeout(){timers++}},()=>{});
assert.equal(writes,1);assert.equal(timers,1);
console.log(`Navigation performance regression checks OK: ${pages.length} HTML entrypoints, filter races, detail races, observer convergence and request deadlines`);
