(function(){
  "use strict";

  const COPY={
    pt:"Voltar",en:"Back",es:"Volver",ru:"Назад"
  };

  function language(){
    const value=String(window.EduCashProRuntime?.session?.profile?.language||navigator.language||"pt").slice(0,2).toLowerCase();
    return COPY[value]?value:"pt";
  }

  function goBack(){
    if(window.EduCashProApp?.renderHome)return window.EduCashProApp.renderHome();
    document.querySelector('#bottomNav button[data-view="home"]')?.click();
  }

  function decorate(){
    const hero=document.querySelector(".academyMainHero");
    if(!hero)return;
    if(document.getElementById("academyMainBack"))return;
    const button=document.createElement("button");
    button.id="academyMainBack";
    button.type="button";
    button.className="textButton";
    button.textContent=`← ${COPY[language()]}`;
    button.style.marginBottom="10px";
    button.addEventListener("click",goBack);
    hero.parentElement?.insertBefore(button,hero);
  }

  const observer=new MutationObserver(()=>queueMicrotask(decorate));
  observer.observe(document.documentElement,{childList:true,subtree:true});
  document.addEventListener("DOMContentLoaded",decorate);
  decorate();
})();
