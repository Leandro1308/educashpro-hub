(function(){
  "use strict";

  function schedule(task,delay){
    const run=()=>{
      try{task()}catch(error){console.error("[EduCashPro] idle feature:",error)}
    };
    if("requestIdleCallback" in window){
      return requestIdleCallback(run,{timeout:Math.max(600,delay||900)});
    }
    return setTimeout(run,Math.max(180,Math.min(delay||600,1400)));
  }

  function load(src){
    const resources=window.EduCashProResources;
    if(!resources?.script) return Promise.resolve(false);
    return resources.script(src).catch(error=>{
      console.error(`[EduCashPro] recurso complementar ${src}:`,error);
      return false;
    });
  }

  function isAdmin(){
    const profile=window.__EDUCASHPRO_SESSION__?.profile||window.EduCashProWebEntry?.getSession?.()?.profile||{};
    return profile?.isAdmin===true||String(profile?.role||"").toLowerCase()==="admin";
  }

  document.addEventListener("DOMContentLoaded",()=>{
    // A primeira tela fica livre. Complementos entram somente depois do conteúdo principal.
    schedule(()=>load("./visitor-experience.js"),220);
    schedule(()=>load("./subscription-coherence.js"),360);
    schedule(()=>load("./growth-entry-v10.js"),320);
    schedule(()=>load("./telegram-link-ui.js"),480);
    schedule(()=>load("./official-channel-ui.js"),620);
    schedule(()=>load("./referral-channel-links.js"),760);
    schedule(()=>window.EduCashProResources?.loadAccountCenter?.(),900);
    schedule(()=>load("./pwa-install.js"),980);
    schedule(()=>load("./academy-back-v10.js"),1100);
    schedule(()=>load("./presentation-en-us.js"),1250);
    schedule(()=>load("./experience-enhancements.js"),1450);
    schedule(()=>load("./official-community-access.js"),1650);
    schedule(()=>load("./privacy-ui.js"),1850);
    schedule(()=>{if(isAdmin())load("./admin-center.js")},2200);
  },{once:true});
})();