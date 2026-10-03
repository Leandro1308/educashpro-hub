(function(){
  "use strict";
  if(window.EduCashProRuntime)return;

  const sessionListeners=new Set();
  const renderListeners=new Set();
  let current=window.__EDUCASHPRO_SESSION__||null;

  function setSession(value){
    if(!value)return;
    current=value;
    window.__EDUCASHPRO_SESSION__=value;
    for(const listener of sessionListeners){try{listener(value)}catch(_){}}
  }
  function onSession(listener){
    if(typeof listener!=="function")return()=>{};
    sessionListeners.add(listener);
    if(current)queueMicrotask(()=>{try{listener(current)}catch(_){}});
    return()=>sessionListeners.delete(listener);
  }
  function onRender(listener){
    if(typeof listener!=="function")return()=>{};
    renderListeners.add(listener);
    return()=>renderListeners.delete(listener);
  }
  function emitRender(){
    for(const listener of renderListeners){try{listener()}catch(_){}}
  }
  function idle(callback,timeout=1400){
    if("requestIdleCallback" in window)return requestIdleCallback(()=>callback(),{timeout});
    return setTimeout(callback,Math.min(timeout,650));
  }
  function toast(message){
    const node=document.getElementById("toast");
    if(!node)return;
    node.textContent=String(message||"");
    node.classList.add("show");
    setTimeout(()=>node.classList.remove("show"),2300);
  }

  window.addEventListener("educashpro:web-session-ready",()=>{
    const value=window.EduCashProPlatform?.readWebSession?.()||window.__EDUCASHPRO_SESSION__;
    if(value)setSession(value);
  });
  window.addEventListener("educashpro:render",emitRender);

  // Mantém apenas a API esperada por módulos antigos; não substitui fetch nem
  // MutationObserver e não captura cliques.
  window.EduCashProRuntime={get session(){return current},setSession,onSession,onRender,emitRender,idle,toast};
})();
