(function(){
  "use strict";

  function schedule(task,delay){
    const run=()=>{
      try{task()}catch(error){console.error("[EduCashPro] idle feature:",error)}
    };
    if("requestIdleCallback" in window){
      return requestIdleCallback(run,{timeout:Math.max(1200,delay||1800)});
    }
    return setTimeout(run,Math.max(700,delay||1800));
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

  function boot(){
    // Nada pesado disputa rede/CPU com a abertura da Home.
    // Recursos funcionais grandes continuam sob demanda pelo resource-loader.
    schedule(()=>load("./navigation-state.js"),900);
    schedule(()=>load("./cross-platform-nav.js"),1800);
    schedule(()=>load("./telegram-account-bridge.js"),2400);

    schedule(()=>load("./visitor-experience.js"),3200);
    schedule(()=>load("./subscription-coherence.js"),4000);
    schedule(()=>load("./growth-entry-v10.js"),4800);
    schedule(()=>load("./telegram-link-ui.js"),5800);
    schedule(()=>load("./official-channel-ui.js"),6800);
    schedule(()=>load("./referral-channel-links.js"),7800);
    schedule(()=>load("./academy-back-v10.js"),8600);
    schedule(()=>load("./pwa-install.js"),9400);
    schedule(()=>load("./presentation-en-us.js"),10400);
    schedule(()=>load("./experience-enhancements.js"),11800);
    schedule(()=>load("./official-community-access.js"),13200);
    schedule(()=>load("./privacy-ui.js"),14800);
    schedule(()=>{if(isAdmin())load("./admin-center.js")},17000);
  }

  if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",boot,{once:true});
  else boot();
})();
