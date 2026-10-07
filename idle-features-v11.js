(function(){
  "use strict";

  function schedule(task,delay){
    const run=()=>{try{task()}catch(error){console.error("[EduCashPro] idle feature:",error)}};
    if("requestIdleCallback" in window)return requestIdleCallback(run,{timeout:Math.max(900,delay||1200)});
    return setTimeout(run,Math.max(300,delay||900));
  }
  function load(src){
    const resources=window.EduCashProResources;
    if(!resources?.script)return Promise.resolve(false);
    return resources.script(src).catch(error=>{console.error(`[EduCashPro] recurso complementar ${src}:`,error);return false});
  }
  function prefetch(src){
    try{return window.EduCashProResources?.prefetch?.(src)||false}catch{return false}
  }
  function profile(){
    return window.__EDUCASHPRO_SESSION__?.profile||window.EduCashProWebEntry?.getSession?.()?.profile||{};
  }
  function boot(){
    // Executa apenas o mínimo. O restante é pré-buscado sem criar observers,
    // timers ou interceptadores de fetch antes de o usuário precisar deles.
    schedule(()=>load("./navigation-state.js"),300);
    schedule(()=>load("./cross-platform-nav.js"),550);
    schedule(()=>prefetch("./professional-profile.js"),750);
    schedule(()=>prefetch("./link-tools.js"),900);
    schedule(()=>prefetch("./local-tools-and-games.js"),1050);
    schedule(()=>prefetch("./account-center.js"),1200);
    schedule(()=>load("./subscription-coherence.js"),1600);
    schedule(()=>prefetch("./technical-analysis-course.js"),2100);
    schedule(()=>prefetch("./market-learning-center.js?market=20261005.4"),2300);
    schedule(()=>prefetch("./visitor-experience.js"),2600);
    schedule(()=>prefetch("./growth-entry-v10.js"),2900);
    schedule(()=>prefetch("./telegram-link-ui.js"),3200);
    schedule(()=>prefetch("./official-channel-ui.js"),3500);
    schedule(()=>prefetch("./referral-channel-links.js"),3800);
    schedule(()=>prefetch("./presentation-en-us.js"),4100);
    schedule(()=>prefetch("./privacy-ui.js"),4400);
    schedule(()=>{if(profile()?.isAdmin===true||String(profile()?.role||"").toLowerCase()==="admin")prefetch("./admin-center.js")},4800);
    schedule(()=>load("./pwa-install.js"),7000);
  }
  if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",boot,{once:true});else boot();
})();
