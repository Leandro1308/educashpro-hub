import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import vm from 'node:vm';
import { test } from 'node:test';

const source=readFileSync(new URL('../professional-profile.js',import.meta.url),'utf8');
for(const language of ['pt','en','es','ru'])test(`professional profile without scheduling: ${language}`,async()=>{
  const nodes=new Map(), requests=[], downloads=[];
  const node=id=>{if(!nodes.has(id))nodes.set(id,{innerHTML:'',classList:{add(){},remove(){}},addEventListener(){},appendChild(){}});return nodes.get(id)};
  const document={head:{appendChild(){}},getElementById:node,querySelectorAll:()=>[],createElement:()=>({click(){downloads.push(this.download)}})};
  const page={name:'Professional',bio:'Description',slug:'profile',profileImage:{url:'https://example.com/photo.png'},links:[{title:'Telegram',url:'https://t.me/profile'}]};
  const window={EduCashProNavigation:{stamp:()=>1,isCurrent:()=>true}};
  const ctx={window,document,localStorage:{getItem:()=>null},navigator:{},AbortController,Blob,URL:{createObjectURL:()=> 'blob:contact',revokeObjectURL(){}},setTimeout:()=>1,clearTimeout(){},fetch:async(url)=>{requests.push(url);return {ok:true,json:async()=>({page})}}};
  vm.runInNewContext(source,ctx);
  window.EduCashProProfessional.setSession({token:'session',profile:{language}});
  await window.EduCashProProfessional.render();
  assert.equal(requests.length,1);
  assert.ok(requests[0].endsWith('/api/hub/link-page'));
  assert.match(node('content').innerHTML,/100%/);
  assert.doesNotMatch(node('content').innerHTML,/configureAgenda|configureServices|manageProfessionalAgenda/);
  node('previewProfessional').onclick();
  assert.match(node('content').innerHTML,/Professional/);
  assert.match(node('content').innerHTML,/shareCard/);
  assert.match(node('content').innerHTML,/qrCard/);
  assert.doesNotMatch(node('content').innerHTML,/exportCalendar/);
  node('saveContact').onclick();
  assert.deepEqual(downloads,['Professional.vcf']);
});
