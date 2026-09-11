(function(){
  "use strict";

  if(window.EduCashProRuntime) return;

  const NativeMutationObserver=window.MutationObserver;
  const nativeFetch=window.fetch.bind(window);
  const sessionListeners=new Set();
  const renderListeners=new Set();
  let session=null;
  let renderQueued=false;

  function fire(target,name,detail){
    try{target.dispatchEvent(new CustomEvent(name,{detail}));}catch{}
  }

  function setSession(value){
    if(!value?.ok || !value?.profile) return;
    session=value;
    window.__EDUCASHPRO_SESSION__=value;
    for(const listener of sessionListeners){try{listener(value)}catch{}}
    fire(window,"educashpro:session",value);
  }

  function emitRender(){
    if(renderQueued) return;
    renderQueued=true;
    const run=()=>{
      renderQueued=false;
      for(const listener of renderListeners){try{listener()}catch{}}
      fire(window,"educashpro:render",{at:Date.now()});
    };
    if(typeof requestAnimationFrame==="function") requestAnimationFrame(run);
    else setTimeout(run,16);
  }

  if(NativeMutationObserver){
    window.MutationObserver=class EduCashProMutationObserver{
      constructor(callback){
        this.callback=callback;
        this.records=[];
        this.scheduled=false;
        this.native=new NativeMutationObserver((records,observer)=>{
          this.records.push(...records);
          if(this.scheduled) return;
          this.scheduled=true;
          const flush=()=>{
            this.scheduled=false;
            const batch=this.records.splice(0);
            if(!batch.length) return;
            try{this.callback(batch,observer)}catch(error){console.error("[EduCashPro] observer:",error)}
          };
          if(typeof requestAnimationFrame==="function") requestAnimationFrame(flush);
          else setTimeout(flush,16);
        });
      }
      observe(){return this.native.observe.apply(this.native,arguments)}
      disconnect(){this.records.length=0;this.scheduled=false;return this.native.disconnect()}
      takeRecords(){return this.records.splice(0).concat(this.native.takeRecords())}
    };
  }

  window.fetch=async function(input,init){
    const response=await nativeFetch(input,init);
    try{
      const url=typeof input==="string"?input:String(input?.url||"");
      if(/\/api\/hub\/session(?:\?|$)/.test(url)){
        response.clone().json().then(setSession).catch(()=>{});
      }else if(/(?:^|\/)version\.json(?:\?|$)/.test(url)){
        const data=await response.clone().json().catch(()=>null);
        const build=String(data?.build||"").trim();
        if(build) localStorage.setItem("educashpro:app-build",build);
      }
    }catch{}
    return response;
  };

  function onSession(listener){
    if(typeof listener!=="function") return ()=>{};
    sessionListeners.add(listener);
    if(session) queueMicrotask(()=>{try{listener(session)}catch{}});
    return ()=>sessionListeners.delete(listener);
  }

  function onRender(listener){
    if(typeof listener!=="function") return ()=>{};
    renderListeners.add(listener);
    return ()=>renderListeners.delete(listener);
  }

  function idle(callback,timeout=1400){
    if("requestIdleCallback" in window) return requestIdleCallback(()=>callback(),{timeout});
    return setTimeout(callback,Math.min(timeout,650));
  }

  function toast(message){
    const node=document.getElementById("toast");
    if(!node) return;
    node.textContent=message;
    node.classList.add("show");
    setTimeout(()=>node.classList.remove("show"),2600);
  }

  function loadingText(){
    const code=String(session?.profile?.language||navigator.language||"pt").toLowerCase();
    if(code.startsWith("en")) return "Loading…";
    if(code.startsWith("es")) return "Cargando…";
    if(code.startsWith("ru")) return "Загрузка…";
    return "Carregando…";
  }

  function loadErrorText(){
    const code=String(session?.profile?.language||navigator.language||"pt").toLowerCase();
    if(code.startsWith("en")) return "This feature could not be loaded. Please try again.";
    if(code.startsWith("es")) return "No fue posible cargar este recurso. Inténtalo de nuevo.";
    if(code.startsWith("ru")) return "Не удалось загрузить этот раздел. Попробуйте ещё раз.";
    return "Não foi possível carregar este recurso. Tente novamente.";
  }

  async function lazyReplay(eventTarget,loader,ready){
    if(eventTarget?.dataset?.ecpLoading==="1") return;
    if(typeof ready==="function" && ready()) return;
    if(typeof loader!=="function") return;

    const button=eventTarget?.closest?.("button,a")||eventTarget;
    if(!button) return;
    button.dataset.ecpLoading="1";
    const previous=button.innerHTML;
    button.setAttribute("aria-busy","true");
    button.innerHTML=`<span aria-hidden="true">⏳</span> <strong>${loadingText()}</strong>`;
    try{
      await loader();
      button.innerHTML=previous;
      button.removeAttribute("aria-busy");
      delete button.dataset.ecpLoading;
      setTimeout(()=>button.click(),0);
    }catch(error){
      console.error("[EduCashPro] lazy feature:",error);
      button.innerHTML=previous;
      button.removeAttribute("aria-busy");
      delete button.dataset.ecpLoading;
      toast(loadErrorText());
    }
  }

  document.addEventListener("click",(event)=>{
    const target=event.target?.closest?.("button,a");
    if(!target) return;
    const resources=window.EduCashProResources;
    if(!resources) return;

    let loader=null;
    let ready=null;
    const toolEmoji=target.querySelector?.(".emoji")?.textContent||"";
    const insideTools=!!document.getElementById("toolsHubBack");

    if(target.id==="linkPageTool"||target.id==="smartLinkTool"||target.id==="areaLinkPage"||target.id==="areaSmartLink"){
      loader=()=>resources.loadLinks?.();
      ready=()=>!!window.EduCashProLinks;
    }else if(target.id==="financeTool"){
      loader=()=>resources.loadFinance?.();
      ready=()=>!!window.EduCashProFinance;
    }else if(insideTools&&toolEmoji.includes("🎮")){
      loader=()=>resources.loadGames?.();
      ready=()=>!!window.EduCashProMentalGames;
    }else if(target.id==="openHelpCenter"){
      loader=()=>resources.loadHelp?.();
      ready=()=>!!window.EduCashProHelp;
    }else if(target.dataset?.target==="professional"){
      loader=()=>resources.loadProfessional?.();
      ready=()=>!!window.EduCashProProfessional;
    }else if(target.dataset?.academyCategory==="technical_analysis"){
      loader=()=>resources.loadMarkets?.();
      ready=()=>!!window.EduCashProMarkets;
    }else if(target.id==="membershipProof"&&!window.QRCode){
      loader=()=>resources.loadQr?.();
      ready=()=>!!window.QRCode;
    }

    if(loader&&ready&&!ready()){
      event.preventDefault();
      event.stopImmediatePropagation();
      lazyReplay(target,loader,ready);
    }
  },true);

  window.addEventListener("unhandledrejection",(event)=>{
    const message=String(event?.reason?.message||event?.reason||"");
    if(/asset_(?:failed|timeout)|style_(?:failed|timeout)/i.test(message)){
      event.preventDefault?.();
      toast(loadErrorText());
    }
  });

  document.addEventListener("DOMContentLoaded",()=>{
    const content=document.getElementById("content");
    if(content&&NativeMutationObserver){
      const observer=new NativeMutationObserver(emitRender);
      observer.observe(content,{childList:true,subtree:true});
    }
    emitRender();
  },{once:true});

  window.EduCashProRuntime={get session(){return session},setSession,onSession,onRender,emitRender,idle,toast};
})();
