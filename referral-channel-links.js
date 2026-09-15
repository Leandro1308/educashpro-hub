(function(){
  const platform=window.EduCashProPlatform;
  if(!platform?.isWeb?.())return;

  const BOT_USERNAME="EduCashProBot";

  function session(){return platform.readWebSession?.()||null}
  function language(){const raw=String(session()?.profile?.language||navigator.language||"pt").toLowerCase();if(raw.startsWith("en"))return"en";if(raw.startsWith("es"))return"es";if(raw.startsWith("ru"))return"ru";return"pt"}
  const copy={
    pt:{site:"Compartilhar pelo site",telegram:"Compartilhar pelo Telegram",copy:"Copiar",copied:"Copiado",hint:"Os dois links usam o mesmo código de indicação e apontam para a mesma conta patrocinadora."},
    en:{site:"Share website link",telegram:"Share Telegram link",copy:"Copy",copied:"Copied",hint:"Both links use the same referral code and point to the same sponsor account."},
    es:{site:"Compartir por el sitio",telegram:"Compartir por Telegram",copy:"Copiar",copied:"Copiado",hint:"Ambos enlaces usan el mismo código de referido y apuntan a la misma cuenta patrocinadora."},
    ru:{site:"Поделиться ссылкой сайта",telegram:"Поделиться через Telegram",copy:"Копировать",copied:"Скопировано",hint:"Обе ссылки используют один реферальный код и ведут к одному аккаунту спонсора."}
  };
  function t(key){return copy[language()]?.[key]||copy.pt[key]||key}

  async function copyValue(value,button){
    try{await navigator.clipboard.writeText(value)}catch{}
    if(button){const old=button.textContent;button.textContent=t("copied");setTimeout(()=>{if(button.isConnected)button.textContent=old},1200)}
  }

  function render(){
    const profile=session()?.profile;
    const code=String(profile?.referralCode||"").trim().toUpperCase();
    if(!profile?.userId||!code)return;
    const legacyCard=[...document.querySelectorAll(".webMemberCard")].find(node=>node.querySelector("#webReferralCopy"));
    if(!legacyCard||legacyCard.dataset.channelLinks==="1")return;
    legacyCard.dataset.channelLinks="1";

    const siteUrl=`${location.origin}/?ref=${encodeURIComponent(code)}`;
    const telegramUrl=`https://t.me/${BOT_USERNAME}?start=ref_${encodeURIComponent(code)}`;
    legacyCard.innerHTML=`<h2>${legacyCard.querySelector("h2")?.textContent||"Seu link de indicação"}</h2><p style="margin-bottom:12px">${t("hint")}</p><div class="webReferralChannels"><div style="margin-bottom:12px"><small style="display:block;color:#9db0c6;margin-bottom:6px">🌐 ${t("site")}</small><div class="webCopyRow"><input id="webSiteReferral" value="${siteUrl}" readonly><button id="webSiteReferralCopy" type="button">${t("copy")}</button></div></div><div><small style="display:block;color:#9db0c6;margin-bottom:6px">✈️ ${t("telegram")}</small><div class="webCopyRow"><input id="webTelegramReferral" value="${telegramUrl}" readonly><button id="webTelegramReferralCopy" type="button">${t("copy")}</button></div></div></div>`;
    const siteButton=legacyCard.querySelector("#webSiteReferralCopy");
    const telegramButton=legacyCard.querySelector("#webTelegramReferralCopy");
    siteButton?.addEventListener("click",()=>copyValue(siteUrl,siteButton));
    telegramButton?.addEventListener("click",()=>copyValue(telegramUrl,telegramButton));
  }

  const observer=new MutationObserver(render);
  observer.observe(document.documentElement,{childList:true,subtree:true});
  if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",()=>setTimeout(render,150),{once:true});else setTimeout(render,150);
})();
