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
    schedule(()=>load("./presentation-en-us.js"),700);
    schedule(()=>load("./experience-enhancements.js"),900);
    schedule(()=>load("./official-community-access.js"),1100);
    schedule(()=>load("./privacy-ui.js"),1350);

    // Pré-aquece somente recursos pequenos e muito usados, e apenas quando a
    // conexão não sinaliza economia de dados. Recursos pesados continuam sob demanda.
    schedule(()=>{
      const connection=navigator.connection||navigator.mozConnection||navigator.webkitConnection;
      const saveData=connection?.saveData===true;
      const slow=/^(slow-2g|2g)$/i.test(String(connection?.effectiveType||""));
      if(saveData||slow) return;
      window.EduCashProResources?.loadLinks?.().catch(()=>{});
    },2200);
  },{once:true});
})();
