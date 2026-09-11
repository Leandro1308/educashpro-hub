(function () {
  "use strict";

  let latestSession = window.EduCashProRuntime?.session || window.__EDUCASHPRO_SESSION__ || null;

  const COPY = {
    pt: { benefitTitle:"Benefícios exclusivos", benefitText:"Os benefícios e descontos de parceiros são recursos disponíveis para assinantes ativos do EduCashPro.", presentation:"Ver apresentação EduCashPro", subscribe:"Assinar agora", close:"Agora não", qrTitle:"Meu QR de assinante", qrSub:"Mostre este QR Code à empresa parceira para comprovar sua assinatura ativa.", showQr:"MOSTRAR QR" },
    en: { benefitTitle:"Exclusive benefits", benefitText:"Partner benefits and discounts are available to active EduCashPro subscribers.", presentation:"View EduCashPro presentation", subscribe:"Subscribe now", close:"Not now", qrTitle:"My subscriber QR", qrSub:"Show this QR Code to a partner business to prove your active membership.", showQr:"SHOW QR" },
    es: { benefitTitle:"Beneficios exclusivos", benefitText:"Los beneficios y descuentos de socios están disponibles para suscriptores activos de EduCashPro.", presentation:"Ver presentación EduCashPro", subscribe:"Suscribirme ahora", close:"Ahora no", qrTitle:"Mi QR de suscriptor", qrSub:"Muestra este QR a la empresa asociada para comprobar tu suscripción activa.", showQr:"MOSTRAR QR" },
    ru: { benefitTitle:"Эксклюзивные преимущества", benefitText:"Преимущества и скидки партнёров доступны активным подписчикам EduCashPro.", presentation:"О презентации EduCashPro", subscribe:"Оформить подписку", close:"Не сейчас", qrTitle:"Мой QR подписчика", qrSub:"Покажите QR партнёру для подтверждения активной подписки.", showQr:"ПОКАЗАТЬ QR" }
  };

  const esc = (value) => String(value ?? "").replace(/[&<>"']/g, (c) => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[c]);
  function language(){const value=String(latestSession?.profile?.language||navigator.language||"pt").slice(0,2).toLowerCase();return COPY[value]?value:"pt"}
  function c(key){return COPY[language()][key]||COPY.pt[key]}

  function openUrl(url){
    if(!url) return;
    const tg=window.Telegram?.WebApp;
    if(/^https:\/\/t\.me\//i.test(url)&&tg?.openTelegramLink) tg.openTelegramLink(url);
    else if(tg?.openLink) tg.openLink(url);
    else window.open(url,"_blank","noopener");
  }

  function benefitsGate(){
    document.querySelector(".ecpModal")?.remove();
    const node=document.createElement("div");
    node.className="ecpModal";
    node.innerHTML=`<section class="ecpModalCard"><div class="ecpModalIcon">🎁</div><h2>${esc(c("benefitTitle"))}</h2><p>${esc(c("benefitText"))}</p><div class="ecpModalActions"><button id="benefitPresentation" class="secondaryButton">${esc(c("presentation"))}</button><button id="benefitSubscribe" class="wideButton">${esc(c("subscribe"))}</button><button id="benefitClose" class="secondaryButton">${esc(c("close"))}</button></div></section>`;
    document.body.appendChild(node);
    node.addEventListener("click",event=>{if(event.target===node)node.remove()});
    node.querySelector("#benefitPresentation").onclick=()=>{node.remove();window.EduCashProApp?.renderPresentation?.()};
    node.querySelector("#benefitSubscribe").onclick=()=>{node.remove();openUrl(latestSession?.subscribeUrl||latestSession?.botUrl)};
    node.querySelector("#benefitClose").onclick=()=>node.remove();
  }

  function openMembershipProof(){
    const areaButton=document.querySelector('#bottomNav button[data-view="area"]');
    if(!areaButton) return;
    areaButton.click();
    let tries=0;
    const openProof=()=>{
      const proof=document.getElementById("membershipProof");
      if(proof){proof.click();return}
      if(tries++<12) setTimeout(openProof,90);
    };
    openProof();
  }

  function addInactiveBenefits(grid){
    if(document.getElementById("inactiveBenefitsQuick")) return;
    const button=document.createElement("button");
    button.id="inactiveBenefitsQuick";
    button.className="quickCard";
    button.innerHTML=`<span class="emoji">🎁</span><strong>${esc(c("benefitTitle"))}</strong><small>${esc(c("benefitText"))}</small><span class="freeAccessBadge" style="color:var(--gold)">🔒</span>`;
    button.onclick=benefitsGate;
    grid.appendChild(button);
  }

  function addQuickMembershipQr(intro){
    if(document.getElementById("quickMembershipQr")||!latestSession?.membershipCredential) return;
    const button=document.createElement("button");
    button.id="quickMembershipQr";
    button.className="membershipQuickAccess";
    button.innerHTML=`<span>🔳</span><span><strong>${esc(c("qrTitle"))}</strong><small>${esc(c("qrSub"))}</small><b>${esc(c("showQr"))} →</b></span>`;
    button.onclick=openMembershipProof;
    intro.parentNode?.insertBefore(button,intro);
  }

  function enhanceHome(){
    const intro=document.getElementById("openPresentation");
    if(!intro||!latestSession?.profile) return;
    const grid=intro.parentElement?.querySelector(".quickGrid");
    if(!grid) return;
    if(latestSession.profile.active===true) addQuickMembershipQr(intro);
    else addInactiveBenefits(grid);
  }

  if(window.EduCashProRuntime?.onSession){
    window.EduCashProRuntime.onSession(value=>{latestSession=value;enhanceHome()});
    window.EduCashProRuntime.onRender(enhanceHome);
  }else{
    window.addEventListener("educashpro:session",event=>{latestSession=event.detail;enhanceHome()});
    document.addEventListener("DOMContentLoaded",enhanceHome,{once:true});
  }

  window.EduCashProExperience={showBenefitsGate:benefitsGate,showMembershipQr:openMembershipProof};
})();
