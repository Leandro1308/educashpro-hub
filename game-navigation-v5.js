(function(){
  "use strict";

  const bridge=window.EduCashProGameBridge||(window.EduCashProGameBridge={session:null,catalogContext:{},currentGame:null});
  const suite=()=>window.EduCashProGameSuite;
  let recovering=false;

  function currentLevelPage(){
    const grid=document.querySelector("main.gamePage .levelGrid");
    return grid?grid.closest("main.gamePage"):null;
  }

  function currentLanguage(){
    try{return suite()?.lang?.()||bridge.session?.profile?.language||"pt";}catch{return"pt";}
  }

  function hideLevelBlockers(){
    if(!currentLevelPage())return;
    const loading=document.getElementById("globalLoading");
    if(loading&&!loading.classList.contains("hidden"))loading.classList.add("hidden");
    document.documentElement.removeAttribute("aria-busy");
  }

  function inferGameId(page){
    const api=suite();
    if(!api||!page)return null;
    if(bridge.currentGame&&api.GAME_META?.[bridge.currentGame])return bridge.currentGame;

    const visible=String(page.querySelector(".eyebrow")?.textContent||"").trim().toLowerCase();
    if(!visible)return null;
    for(const [gameId,meta] of Object.entries(api.GAME_META||{})){
      const label=String(api.text?.(meta[1],currentLanguage())||"").trim().toLowerCase();
      if(label&&visible===label){bridge.currentGame=gameId;return gameId;}
    }
    return null;
  }

  function fallbackOpenLevel(level,page){
    const api=suite();
    if(!api||!page||!document.body.contains(page))return false;
    const gameId=inferGameId(page);
    if(!gameId)return false;

    const locked=(level==="advanced"||level==="nerd")&&!api.active?.();
    if(locked){api.paywall?.(level,currentLanguage());return true;}

    hideLevelBlockers();
    try{
      api.launchGame?.(gameId,{lang:currentLanguage(),level});
      return true;
    }catch(error){
      console.error("[EduCashPro] Falha ao abrir nível do jogo:",error);
      return false;
    }
  }

  function fallbackBack(page){
    const api=suite();
    if(!api||!page||!document.body.contains(page))return false;
    hideLevelBlockers();
    try{api.renderCatalog?.(bridge.catalogContext||{});return true;}
    catch(error){console.error("[EduCashPro] Falha ao voltar da seleção de nível:",error);return false;}
  }

  function recoverLevelPage(){
    if(recovering)return;
    const page=currentLevelPage();
    if(!page)return;
    recovering=true;
    hideLevelBlockers();
    page.classList.add("ecpLevelPageReady");
    page.querySelectorAll("[data-level]").forEach(button=>{
      button.disabled=false;
      button.type="button";
      button.setAttribute("role","button");
      button.setAttribute("tabindex","0");
    });
    recovering=false;
  }

  /*
   * Não intercepta o clique normal. O manipulador original do jogo recebe
   * prioridade. Só executamos o fallback se, após o clique, a mesma tela
   * continuar aberta. Isso evita bloquear o próprio evento do jogo.
   */
  document.addEventListener("click",event=>{
    const levelButton=event.target.closest?.("main.gamePage .levelGrid [data-level]");
    if(levelButton){
      const page=levelButton.closest("main.gamePage"),level=String(levelButton.dataset.level||"");
      window.setTimeout(()=>{
        if(currentLevelPage()===page&&document.body.contains(levelButton))fallbackOpenLevel(level,page);
      },0);
      return;
    }

    const back=event.target.closest?.("main.gamePage .gameBackLocal");
    if(back&&currentLevelPage()){
      const page=back.closest("main.gamePage");
      window.setTimeout(()=>{
        if(currentLevelPage()===page&&document.body.contains(back))fallbackBack(page);
      },0);
    }
  },false);

  /*
   * Proteção específica para WebViews móveis: se algum elemento transitório
   * ficar sobre a tela, detectamos o botão pelas coordenadas do toque.
   */
  window.addEventListener("pointerup",event=>{
    const page=currentLevelPage();
    if(!page)return;
    hideLevelBlockers();

    const direct=event.target.closest?.("[data-level],.gameBackLocal");
    if(direct)return;

    const controls=[...page.querySelectorAll("[data-level],.gameBackLocal")];
    const hit=controls.find(control=>{
      const rect=control.getBoundingClientRect();
      return event.clientX>=rect.left&&event.clientX<=rect.right&&event.clientY>=rect.top&&event.clientY<=rect.bottom;
    });
    if(!hit)return;

    if(hit.matches("[data-level]"))fallbackOpenLevel(String(hit.dataset.level||""),page);
    else fallbackBack(page);
  },true);

  document.addEventListener("keydown",event=>{
    if(event.key!=="Enter"&&event.key!==" ")return;
    const button=event.target.closest?.("main.gamePage .levelGrid [data-level]");
    if(!button)return;
    const page=button.closest("main.gamePage");
    window.setTimeout(()=>{if(currentLevelPage()===page)fallbackOpenLevel(String(button.dataset.level||""),page);},0);
  },false);

  const observer=new MutationObserver(()=>queueMicrotask(recoverLevelPage));
  observer.observe(document.documentElement,{childList:true,subtree:true,attributes:true,attributeFilter:["class"]});
  document.addEventListener("DOMContentLoaded",recoverLevelPage);
  window.addEventListener("pageshow",recoverLevelPage);
  recoverLevelPage();

  window.EduCashProGameNavigationV5={recover:recoverLevelPage};
})();
