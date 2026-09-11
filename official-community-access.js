(function () {
  "use strict";

  const tg=window.Telegram?.WebApp;
  const LEGACY_OFFICIAL_CHANNEL_URL="https://t.me/boost?c=3942997522";
  const OFFICIAL_CHANNEL_ACCESS_URL="https://t.me/+1mP5ad7vJH5lOGNh";
  const OFFICIAL_GROUP_URL="https://t.me/boost?c=3980981498";
  const API_BASE="https://educashpro-all.onrender.com";
  let session=window.EduCashProRuntime?.session||window.__EDUCASHPRO_SESSION__||null;
  let enhancing=false;

  const COPY={
    pt:{free:"ACESSO LIVRE",channelTitle:"Canal Oficial de Educação",channelText:"Conteúdos educativos gratuitos para assinantes e não assinantes.",channelButton:"📚 Entrar no canal gratuito",groupTitle:"Grupo Exclusivo para Assinantes",groupText:"Materiais prontos para divulgação e conteúdos exclusivos para assinantes ativos.",groupButton:"👥 Entrar no grupo exclusivo",subscribe:"⚡ Ativar assinatura",inviteError:"Não foi possível abrir o acesso agora."},
    en:{free:"FREE ACCESS",channelTitle:"Official Education Channel",channelText:"Free educational content for subscribers and visitors.",channelButton:"📚 Join free channel",groupTitle:"Subscribers-Only Group",groupText:"Ready-to-share materials and exclusive content for active subscribers.",groupButton:"👥 Join exclusive group",subscribe:"⚡ Activate subscription",inviteError:"Unable to open access right now."},
    es:{free:"ACCESO LIBRE",channelTitle:"Canal Oficial de Educación",channelText:"Contenido educativo gratuito para suscriptores y visitantes.",channelButton:"📚 Entrar al canal gratuito",groupTitle:"Grupo Exclusivo para Suscriptores",groupText:"Materiales listos para divulgar y contenido exclusivo para suscriptores activos.",groupButton:"👥 Entrar al grupo exclusivo",subscribe:"⚡ Activar suscripción",inviteError:"No fue posible abrir el acceso ahora."},
    ru:{free:"СВОБОДНЫЙ ДОСТУП",channelTitle:"Официальный образовательный канал",channelText:"Бесплатные образовательные материалы для подписчиков и гостей.",channelButton:"📚 Войти в бесплатный канал",groupTitle:"Эксклюзивная группа подписчиков",groupText:"Готовые материалы для публикации и эксклюзивный контент для активных подписчиков.",groupButton:"👥 Войти в закрытую группу",subscribe:"⚡ Активировать подписку",inviteError:"Сейчас не удалось открыть доступ."}
  };

  function language(){const value=String(session?.profile?.language||"pt").toLowerCase();return COPY[value]?value:"pt"}
  function tr(key){return COPY[language()][key]||COPY.pt[key]||key}
  function isActive(){return session?.profile?.active===true}

  function showAccessError(){
    const toast=document.getElementById("toast");
    if(!toast) return;
    toast.textContent=tr("inviteError");
    toast.classList.add("show");
    setTimeout(()=>toast.classList.remove("show"),2600);
  }

  function openTelegram(url){
    if(!url) return;
    try{
      if(/^https:\/\/t\.me\//i.test(url)&&tg?.openTelegramLink) return tg.openTelegramLink(url);
      if(tg?.openLink) return tg.openLink(url);
      window.open(url,"_blank","noopener");
    }catch{window.open(url,"_blank","noopener")}
  }

  function openSubscription(){openTelegram(String(session?.subscribeUrl||session?.botUrl||""))}

  async function requestAccess(path){
    if(!session?.token) throw new Error("session");
    const controller=new AbortController();
    const timer=setTimeout(()=>controller.abort(),8000);
    try{
      const response=await fetch(`${API_BASE}${path}`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({token:session.token}),cache:"no-store",signal:controller.signal});
      const data=await response.json().catch(()=>null);
      if(!response.ok||!(data?.accessUrl||data?.inviteUrl)) throw new Error(data?.reason||"access");
      return data.accessUrl||data.inviteUrl;
    }finally{clearTimeout(timer)}
  }

  function openOfficialChannel(event){event?.preventDefault?.();event?.stopPropagation?.();openTelegram(OFFICIAL_CHANNEL_ACCESS_URL)}

  async function openSubscriberGroup(){
    if(!session?.token) return;
    if(!isActive()) return openSubscription();
    try{openTelegram(await requestAccess("/api/hub/subscriber-group-invite"))}catch{showAccessError()}
  }

  function decorateOfficialArea(){
    document.querySelectorAll(`[data-official-url="${LEGACY_OFFICIAL_CHANNEL_URL}"]`).forEach(button=>{
      const card=button.closest(".itemCard");
      const title=card?.querySelector("h3");
      const text=card?.querySelector("p");
      if(title) title.textContent=tr("channelTitle");
      if(text) text.textContent=tr("channelText");
      button.textContent=tr("channelButton");
      button.dataset.officialDirectUrl=OFFICIAL_CHANNEL_ACCESS_URL;
      if(button.dataset.communityBound!=="1"){
        button.dataset.communityBound="1";
        button.addEventListener("click",event=>{event.preventDefault();event.stopImmediatePropagation();openOfficialChannel(event)},true);
      }
    });

    document.querySelectorAll(`[data-official-url="${OFFICIAL_GROUP_URL}"]`).forEach(button=>{
      const card=button.closest(".itemCard");
      const title=card?.querySelector("h3");
      const text=card?.querySelector("p");
      if(title) title.textContent=tr("groupTitle");
      if(text) text.textContent=tr("groupText");
      button.textContent=isActive()?tr("groupButton"):tr("subscribe");
      if(!isActive()) button.classList.add("secondaryButton"); else button.classList.remove("secondaryButton");
      if(button.dataset.communityBound!=="1"){
        button.dataset.communityBound="1";
        button.addEventListener("click",event=>{event.preventDefault();event.stopImmediatePropagation();openSubscriberGroup()},true);
      }
    });
  }

  function enhance(){
    if(enhancing) return;
    enhancing=true;
    try{decorateOfficialArea()}finally{enhancing=false}
  }

  if(window.EduCashProRuntime?.onSession){
    window.EduCashProRuntime.onSession(value=>{session=value;enhance()});
    window.EduCashProRuntime.onRender(enhance);
  }else{
    window.addEventListener("educashpro:session",event=>{session=event.detail;enhance()});
    document.addEventListener("DOMContentLoaded",enhance,{once:true});
  }
})();
