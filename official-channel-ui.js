(function(){
  const platform=window.EduCashProPlatform;
  if(!platform?.isWeb?.())return;

  const API_BASE="https://educashpro-all.onrender.com";
  let loading=false;

  function session(){return platform.readWebSession?.()||null}
  function language(){const raw=String(session()?.profile?.language||navigator.language||"pt").toLowerCase();if(raw.startsWith("en"))return"en";if(raw.startsWith("es"))return"es";if(raw.startsWith("ru"))return"ru";return"pt"}
  const copy={
    pt:{title:"Avisos oficiais",body:"Entre no Canal Oficial do EduCashPro para receber comunicados importantes, inclusive mudanças de acesso entre Telegram e site.",button:"Entrar no Canal Oficial",opening:"Abrindo canal…",error:"Canal indisponível no momento."},
    en:{title:"Official updates",body:"Join the official EduCashPro channel for important notices, including access changes between Telegram and the website.",button:"Join Official Channel",opening:"Opening channel…",error:"Channel is unavailable right now."},
    es:{title:"Avisos oficiales",body:"Únete al canal oficial de EduCashPro para recibir avisos importantes, incluidos cambios de acceso entre Telegram y el sitio web.",button:"Entrar al Canal Oficial",opening:"Abriendo canal…",error:"El canal no está disponible ahora."},
    ru:{title:"Официальные уведомления",body:"Вступите в официальный канал EduCashPro, чтобы получать важные сообщения, включая изменения доступа между Telegram и сайтом.",button:"Открыть официальный канал",opening:"Открываем канал…",error:"Канал сейчас недоступен."}
  };
  function t(key){return copy[language()]?.[key]||copy.pt[key]||key}

  async function openOfficialChannel(button,status){
    if(loading)return;
    const current=session();
    if(!current?.token)return;
    loading=true;
    button.disabled=true;
    status.textContent=t("opening");
    try{
      const response=await fetch(`${API_BASE}/api/platform-auth/official-channel`,{
        method:"POST",
        headers:{"Content-Type":"application/json",Authorization:`Bearer ${current.token}`},
        body:"{}",
      });
      const data=await response.json().catch(()=>({}));
      if(!response.ok||!data?.channelUrl)throw new Error(data?.reason||"channel_unavailable");
      location.href=data.channelUrl;
    }catch{
      status.textContent=t("error");
      button.disabled=false;
      loading=false;
    }
  }

  function render(){
    const member=document.querySelector(".webMember");
    if(!member||!session()?.profile?.userId||document.getElementById("webOfficialChannelCard"))return;
    const card=document.createElement("div");
    card.id="webOfficialChannelCard";
    card.className="webMemberCard";
    card.innerHTML=`<h2>📢 ${t("title")}</h2><p>${t("body")}</p><button id="webOfficialChannelButton" class="webAuthSecondary" type="button">${t("button")}</button><div id="webOfficialChannelStatus" class="webPairStatus"></div>`;
    const resources=[...member.querySelectorAll(".webMemberCard")].find(node=>node.querySelector("#webOpenPresentation"));
    if(resources)member.insertBefore(card,resources);else member.appendChild(card);
    const button=card.querySelector("#webOfficialChannelButton");
    const status=card.querySelector("#webOfficialChannelStatus");
    button?.addEventListener("click",()=>openOfficialChannel(button,status));
  }

  const observer=new MutationObserver(render);
  observer.observe(document.documentElement,{childList:true,subtree:true});
  if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",()=>setTimeout(render,120),{once:true});else setTimeout(render,120);
})();
