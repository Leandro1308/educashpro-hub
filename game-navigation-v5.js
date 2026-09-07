(function(){
  "use strict";

  const bridge=window.EduCashProGameBridge||(window.EduCashProGameBridge={session:null,catalogContext:{},currentGame:null});
  const suite=()=>window.EduCashProGameSuite;

  function hideStaleLoading(){
    const loading=document.getElementById("globalLoading");
    if(loading)loading.classList.add("hidden");
  }

  function currentLevelPage(){
    const grid=document.querySelector("main.gamePage .levelGrid");
    return grid?grid.closest("main.gamePage"):null;
  }

  function currentLanguage(){
    try{return suite()?.lang?.()||bridge.session?.profile?.language||"pt";}catch{return"pt";}
  }

  function openLevel(level){
    const api=suite();
    const page=currentLevelPage();
    if(!api||!page)return false;
    const gameId=bridge.currentGame;
    if(!gameId||!api.GAME_META?.[gameId])return false;

    const locked=(level==="advanced"||level==="nerd")&&!api.active?.();
    if(locked){
      api.paywall?.(level,currentLanguage());
      return true;
    }

    hideStaleLoading();
    api.launchGame?.(gameId,{lang:currentLanguage(),level});
    return true;
  }

  function goBackFromLevelPage(){
    const api=suite();
    if(!api||!currentLevelPage())return false;
    hideStaleLoading();
    api.renderCatalog?.(bridge.catalogContext||{});
    return true;
  }

  function recoverLevelPage(){
    const page=currentLevelPage();
    if(!page)return;
    hideStaleLoading();
    page.classList.add("ecpLevelPageReady");
    page.querySelectorAll("[data-level]").forEach(button=>{
      button.disabled=false;
      button.setAttribute("role","button");
      button.setAttribute("tabindex","0");
    });
  }

  document.addEventListener("click",event=>{
    const levelButton=event.target.closest?.("main.gamePage .levelGrid [data-level]");
    if(levelButton){
      event.preventDefault();
      event.stopImmediatePropagation();
      openLevel(String(levelButton.dataset.level||""));
      return;
    }

    const back=event.target.closest?.("main.gamePage .gameBackLocal");
    if(back&&currentLevelPage()){
      event.preventDefault();
      event.stopImmediatePropagation();
      goBackFromLevelPage();
    }
  },true);

  document.addEventListener("keydown",event=>{
    if(event.key!=="Enter"&&event.key!==" ")return;
    const levelButton=event.target.closest?.("main.gamePage .levelGrid [data-level]");
    if(!levelButton)return;
    event.preventDefault();
    openLevel(String(levelButton.dataset.level||""));
  },true);

  const observer=new MutationObserver(()=>queueMicrotask(recoverLevelPage));
  observer.observe(document.documentElement,{childList:true,subtree:true});
  document.addEventListener("DOMContentLoaded",recoverLevelPage);
  window.addEventListener("pageshow",recoverLevelPage);
  recoverLevelPage();

  window.EduCashProGameNavigationV5={recover:recoverLevelPage};
})();
