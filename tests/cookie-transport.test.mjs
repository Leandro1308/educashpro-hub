import assert from "node:assert/strict";
import fs from "node:fs";
import vm from "node:vm";

const code=fs.readFileSync(new URL("../platform-adapter.js",import.meta.url),"utf8");
async function simulate(available) {
  const calls=[];
  const storage=new Map();
  const location={origin:"https://go.educashpro.vip",protocol:"https:",href:"https://go.educashpro.vip/app/"};
  const fakeFetch=async (url,options={})=>{
    const target=String(url?.url||url);
    calls.push({url:target,headers:options.headers,credentials:options.credentials});
    if(target.endsWith("/api/platform-auth/cookie-capabilities"))
      return {ok:available,json:async()=>({ok:available,mode:available?"first-party-cookie":"unsupported"})};
    return {ok:true,json:async()=>({ok:true,token:"eyJzdWIiOiJ1c3JfdGVzdCJ9.cookie-session",profile:{userId:"usr_test"}})};
  };
  const win={location,fetch:fakeFetch,Telegram:null};
  const context={window:win,location,URL,AbortController,Headers,Request,
    setTimeout,clearTimeout,history:{length:0,back(){}},
    localStorage:{getItem:k=>storage.get(k)||null,setItem:(k,v)=>storage.set(k,v),removeItem:k=>storage.delete(k)},
  };
  vm.runInNewContext(code,context);
  const response=await win.fetch("https://educashpro-all.onrender.com/api/platform-auth/session",{
    method:"POST",headers:{Authorization:"Bearer example"},body:"{}"
  });
  assert.equal(response.ok,true);
  return {calls,enabled:available};
}
const yes=await simulate(true);
const auth=yes.calls.find(x=>x.url.endsWith("/api/platform-auth/session"));
assert(auth.url.startsWith("https://go.educashpro.vip/"));
assert.equal(auth.credentials,"same-origin");
assert.equal(auth.headers.get("X-EduCashPro-Cookie-Session"),"1");
const no=await simulate(false);
const old=no.calls.find(x=>x.url.endsWith("/api/platform-auth/session"));
assert(old.url.startsWith("https://educashpro-all.onrender.com/"));
console.log("First-party API transport and legacy fallback: OK");
