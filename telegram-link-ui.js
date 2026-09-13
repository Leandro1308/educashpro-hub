(function(){
  const platform=window.EduCashProPlatform;
  const auth=window.EduCashProWebAuth;
  if(!platform?.isWeb?.()||!auth)return;

  const API_BASE="https://educashpro-all.onrender.com";
  let checking=false;
  let lastLinked=false;

  function session(){return platform.readWebSession?.()||null}
  function language(){const raw=String(session()?.profile?.language||navigator.language||"pt").toLowerCase();if(raw.startsWith("en"))return"en";if(raw.startsWith("es"))return"es";if(raw.startsWith("ru"))return"ru";return"pt"}
  const copy={
    pt:{title:"Telegram",linked:"Vinculado à sua conta",body:"Vincule seu Telegram para usar o Bot e o Mini App com a mesma conta EduCashPro.",button:"Vincular Telegram",opening:"Abrindo Telegram…",error:"Não foi possível gerar o vínculo agora. Tente novamente."},
    en:{title:"Telegram",linked:"Linked to your account",body:"Link Telegram to use the Bot and Mini App with the same EduCashPro account.",button:"Link Telegram",opening:"Opening Telegram…",error:"Could not create the link right now. Please try again."},
    es:{title:"Telegram",linked:"Vinculado a tu cuenta",body:"Vincula Telegram para usar el Bot y la Mini App con la misma cuenta EduCashPro.",button:"Vincular Telegram",opening:"Abriendo Telegram…",error:"No fue posible generar el vínculo. Inténtalo de nuevo."},
    ru:{title:"Telegram",linked:"Привязан к аккаунту",body:"Привяжите Telegram, чтобы использовать бота и Mini App с тем же аккаунтом EduCashPro.",button:"Привязать Telegram",opening:"Открываем Telegram…",error:"Сейчас не удалось создать привязку. Попробуйте ещё раз."}
  };
  function t(key){return copy[language()]?.[key]||copy.pt[key]||key}

  async function beginLink(button,status){
    const current=session();
    if(!current?.token)return;
    button.disabled=true;
    if(status)status.textContent=t("opening");
    try{
      const response=await fetch(`${API_BASE}/api/platform-auth/telegram-link/start`,{
        method:"POST",
        headers:{"Content-Type":"application/json",Authorization:`Bearer ${current.token}`},
        body:"{}",
      });
      const data=await response.json().catch(()=>({}));
      if(!response.ok||!data?.telegramUrl)throw new Error(data?.reason||"telegram_link_failed");
      location.href=data.telegramUrl;
    }catch(error){
      if(status)status.textContent=t("error");
      button.disabled=false;
    }
  }

  function render(){
    const member=document.querySelector(".webMember");
    const current=session();
    if(!member||!current?.profile?.userId)return;
    if(document.getElementById("webTelegramLinkCard"))return;

    lastLinked=current.profile.telegramLinked===true;
    if(lastLinked)return;

    const card=document.createElement("div");
    card.id="webTelegramLinkCard";
    card.className="webMemberCard";
    card.innerHTML=`<h2>✈️ ${t("title")}</h2><p>${t("body")}</p><button id="webTelegramLinkButton" class="webAuthButton" type="button">${t("button")}</button><div id="webTelegramLinkStatus" class="webPairStatus"></div>`;

    const referral=[...member.querySelectorAll(".webMemberCard")].find(node=>node.querySelector("#webReferralCopy"));
    if(referral)member.insertBefore(card,referral);else member.appendChild(card);

    const button=card.querySelector("#webTelegramLinkButton");
    const status=card.querySelector("#webTelegramLinkStatus");
    button?.addEventListener("click",()=>beginLink(button,status));
  }

  async function refreshAfterTelegram(){
    if(checking||!session()?.token)return;
    checking=true;
    try{
      const updated=await auth.validateStoredSession();
      const linked=updated?.profile?.telegramLinked===true;
      if(linked&&!lastLinked){location.reload();return}
      lastLinked=linked;
    }catch{}finally{checking=false}
  }

  const observer=new MutationObserver(render);
  observer.observe(document.documentElement,{childList:true,subtree:true});
  if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",()=>setTimeout(render,100),{once:true});else setTimeout(render,100);
  document.addEventListener("visibilitychange",()=>{if(document.visibilityState==="visible")setTimeout(refreshAfterTelegram,300)});
  window.addEventListener("focus",()=>setTimeout(refreshAfterTelegram,300));
})();
