(function(){
  "use strict";

  const suite=window.EduCashProGameSuite;
  const bridge=window.EduCashProGameBridge||(window.EduCashProGameBridge={session:null,catalogContext:{},currentGame:null});
  if(!suite)return;

  const COPY={
    pt:{eyebrow:"MUITO ALÉM DOS JOGOS",title:"Você veio para jogar. Descubra tudo o que o EduCashPro pode oferecer.",body:"Educação financeira, Web3, ferramentas digitais, benefícios para assinantes e um Programa de Marketing de Rede opcional para assinantes ativos, com possibilidade de receber comissões quando houver assinaturas efetivamente realizadas conforme as regras do programa.",academy:"🎓 Academy",benefits:"🎁 Benefícios",tools:"🧰 Ferramentas",network:"🌐 Marketing de Rede",cta:"Conhecer o EduCashPro",disclaimer:"Participar do programa de afiliados é opcional. Não há promessa ou garantia de ganhos."},
    en:{eyebrow:"MUCH MORE THAN GAMES",title:"You came to play. Discover everything EduCashPro has to offer.",body:"Financial education, Web3, digital tools, subscriber benefits, and an optional Network Marketing Program for active subscribers, with the possibility of earning commissions when subscriptions are actually completed under the program rules.",academy:"🎓 Academy",benefits:"🎁 Benefits",tools:"🧰 Tools",network:"🌐 Network Marketing",cta:"Discover EduCashPro",disclaimer:"The affiliate program is optional. There is no promise or guarantee of earnings."},
    es:{eyebrow:"MUCHO MÁS QUE JUEGOS",title:"Viniste a jugar. Descubre todo lo que EduCashPro puede ofrecerte.",body:"Educación financiera, Web3, herramientas digitales, beneficios para suscriptores y un Programa de Marketing de Red opcional para suscriptores activos, con posibilidad de recibir comisiones cuando se realicen suscripciones efectivas conforme a las reglas del programa.",academy:"🎓 Academy",benefits:"🎁 Beneficios",tools:"🧰 Herramientas",network:"🌐 Marketing de Red",cta:"Conocer EduCashPro",disclaimer:"Participar en el programa de afiliados es opcional. No existe promesa ni garantía de ganancias."},
    ru:{eyebrow:"НАМНОГО БОЛЬШЕ, ЧЕМ ИГРЫ",title:"Вы пришли поиграть. Узнайте, что ещё предлагает EduCashPro.",body:"Финансовое образование, Web3, цифровые инструменты, преимущества для подписчиков и дополнительная программа сетевого маркетинга для активных подписчиков с возможностью получать комиссионные при фактически оформленных подписках в соответствии с правилами программы.",academy:"🎓 Academy",benefits:"🎁 Преимущества",tools:"🧰 Инструменты",network:"🌐 Сетевой маркетинг",cta:"Узнать об EduCashPro",disclaimer:"Участие в партнёрской программе добровольное. Доход не обещается и не гарантируется."}
  };

  function language(){
    const value=String(bridge.session?.profile?.language||navigator.language||"pt").slice(0,2).toLowerCase();
    return COPY[value]?value:"pt";
  }
  function t(key){const l=language();return COPY[l][key]||COPY.pt[key]||key}
  function esc(value){return String(value??"").replace(/[&<>"']/g,char=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[char]));}

  function openPresentation(){
    const app=window.EduCashProApp;
    if(app?.renderPresentation){
      return app.renderPresentation(()=>suite.renderCatalog?.(bridge.catalogContext||{}));
    }
    document.querySelector('#bottomNav button[data-view="learn"]')?.click();
  }

  function decorate(){
    const host=document.querySelector(".gameSuite");
    const grid=host?.querySelector(".gameCatalogV2");
    if(!host||!grid||host.dataset.promoDismissed==="1"||host.querySelector(".gamePromoCard"))return;

    const card=document.createElement("section");
    card.className="gamePromoCard";
    card.setAttribute("aria-label",t("title"));
    card.innerHTML=`<button class="gamePromoClose" type="button" aria-label="Fechar">×</button><span class="gamePromoEyebrow">✨ ${esc(t("eyebrow"))}</span><h2>${esc(t("title"))}</h2><p>${esc(t("body"))}</p><div class="gamePromoFeatures"><span>${esc(t("academy"))}</span><span>${esc(t("benefits"))}</span><span>${esc(t("tools"))}</span><span>${esc(t("network"))}</span></div><button class="gamePromoButton" type="button">${esc(t("cta"))} →</button><small class="gamePromoDisclaimer">${esc(t("disclaimer"))}</small>`;
    grid.parentElement.insertBefore(card,grid);

    card.querySelector(".gamePromoClose")?.addEventListener("click",()=>{
      host.dataset.promoDismissed="1";
      card.remove();
    });
    card.querySelector(".gamePromoButton")?.addEventListener("click",openPresentation);
  }

  const observer=new MutationObserver(()=>queueMicrotask(decorate));
  observer.observe(document.documentElement,{childList:true,subtree:true});
  document.addEventListener("DOMContentLoaded",decorate);
  decorate();
})();
