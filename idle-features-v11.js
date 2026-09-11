(function(){
  "use strict";

  function schedule(task,delay){
    const run=()=>{
      try{task()}catch(error){console.error("[EduCashPro] idle feature:",error)}
    };
    if("requestIdleCallback" in window){
      return requestIdleCallback(run,{timeout:Math.max(800,delay||1200)});
    }
    return setTimeout(run,Math.max(250,Math.min(delay||700,1400)));
  }

  function load(src){
    const resources=window.EduCashProResources;
    if(!resources?.script) return Promise.resolve(false);
    return resources.script(src).catch(error=>{
      console.error(`[EduCashPro] recurso complementar ${src}:`,error);
      return false;
    });
  }

  document.addEventListener("DOMContentLoaded",()=>{
    // Complementos pequenos entram somente quando o navegador estiver ocioso.
    // Recursos funcionais maiores permanecem 100% sob demanda.
    schedule(()=>load("./presentation-en-us.js"),800);
    schedule(()=>load("./experience-enhancements.js"),1050);
    schedule(()=>load("./official-community-access.js"),1300);
    schedule(()=>load("./privacy-ui.js"),1550);
  },{once:true});
})();
