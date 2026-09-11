(function(){
  "use strict";

  function openColorLines(event){
    const button=event.target?.closest?.('[data-play="color-lines"]');
    if(!button)return;
    const suite=window.EduCashProGameSuite;
    if(!suite?.launchGame)return;
    event.preventDefault();
    event.stopPropagation();
    event.stopImmediatePropagation?.();
    suite.launchGame("color-lines",{lang:suite.lang?.()||"pt"});
  }

  document.addEventListener("click",openColorLines,true);

  function hardenPromo(){
    const promo=document.querySelector(".gamePromoCard");
    const grid=document.querySelector(".gameCatalogV2");
    if(promo){promo.style.zIndex="0";promo.style.pointerEvents="auto";}
    if(grid){grid.style.position="relative";grid.style.zIndex="1";}
  }

  const observer=new MutationObserver(()=>queueMicrotask(hardenPromo));
  observer.observe(document.documentElement,{childList:true,subtree:true});
  hardenPromo();
})();
