(function(){
  "use strict";

  const EXTRA_IDS=new Set(["block-grid","nut-sort"]);
  const suite=window.EduCashProGameSuite;
  if(!suite)return;

  function currentLang(){
    try{return suite.lang?.()||"pt"}catch{return"pt"}
  }

  function cleanupDuplicateCards(){
    document.querySelectorAll(".gameCatalogV2 .extraGameCard").forEach(card=>{
      if(card.querySelector("[data-extra-play]"))card.remove();
    });
  }

  // Os cards principais são criados pelo catálogo central. Esta ponte garante
  // que os dois jogos extras usem o lançador específico, sem depender do
  // manipulador antigo do catálogo.
  document.addEventListener("click",function(event){
    const button=event.target.closest?.("[data-play],[data-extra-play]");
    if(!button)return;
    const gameId=button.dataset.play||button.dataset.extraPlay;
    if(!EXTRA_IDS.has(gameId))return;
    event.preventDefault();
    event.stopImmediatePropagation();
    suite.launchGame?.(gameId,{lang:currentLang()});
  },true);

  // Mantém apenas uma cópia de cada card. O módulo anterior ainda possui uma
  // rotina de compatibilidade que pode inserir cards adicionais.
  const originalRenderCatalog=typeof suite.renderCatalog==="function"?suite.renderCatalog.bind(suite):null;
  if(originalRenderCatalog&&!suite.__extraGamesCatalogFix){
    suite.__extraGamesCatalogFix=true;
    suite.renderCatalog=function(){
      const result=originalRenderCatalog.apply(null,arguments);
      requestAnimationFrame(cleanupDuplicateCards);
      return result;
    };
  }

  requestAnimationFrame(cleanupDuplicateCards);
})();
