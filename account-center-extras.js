(function(){
  const platform=window.EduCashProPlatform;
  if(!platform?.isWeb?.())return;
  const API_BASE="https://educashpro-all.onrender.com";

  const COPY={
    pt:{channel:"Avisos oficiais",share:"Compartilhar EduCashPro",site:"Link do site",telegram:"Link do Telegram",copy:"Copiar",copied:"Copiado",channelError:"Canal oficial indisponível agora."},
    en:{channel:"Official updates",share:"Share EduCashPro",site:"Website link",telegram:"Telegram link",copy:"Copy",copied:"Copied",channelError:"Official channel is unavailable right now."},
    es:{channel:"Avisos oficiales",share:"Compartir EduCashPro",site:"Enlace del sitio",telegram:"Enlace de Telegram",copy:"Copiar",copied:"Copiado",channelError:"El canal oficial no está disponible ahora."},
    ru:{channel:"Официальные новости",share:"Поделиться EduCashPro",site:"Ссылка сайта",telegram:"Ссылка Telegram",copy:"Копировать",copied:"Скопировано",channelError:"Официальный канал сейчас недоступен."}
  };
  function session(){return platform.readWebSession?.()||null}
  function lang(){const raw=String(session()?.profile?.language||navigator.language||"pt").toLowerCase();if(raw.startsWith("en"))return"en";if(raw.startsWith("es"))return"es";if(raw.startsWith("ru"))return"ru";return"pt"}
  function t(k){return COPY[lang()]?.[k]||COPY.pt[k]||k}
  function esc(v){return String(v??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]))}
  async function post(path){const token=session()?.token;if(!token)throw new Error("session_missing");const r=await fetch(`${API_BASE}${path}`,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${token}`},body:"{}",cache:"no-store"});const d=await r.json().catch(()=>({}));if(!r.ok)throw new Error(d?.reason||"request_failed");return d}
  async function copy(value,button){try{await navigator.clipboard.writeText(value)}catch{}if(button){const old=button.textContent;button.textContent=t("copied");setTimeout(()=>{if(button.isConnected)button.textContent=old},1000)}}

  async function openChannel(){try{const data=await post("/api/platform-auth/official-channel");if(data?.channelUrl)location.href=data.channelUrl}catch{alert(t("channelError"))}}

  async function showShare(grid){let panel=document.getElementById("accountSharePanel");if(panel){panel.remove();return}try{const data=await post("/api/platform-account/overview");const links=data?.links||{};panel=document.createElement("div");panel.id="accountSharePanel";panel.className="accountPanel";panel.style.gridColumn="1 / -1";panel.innerHTML=`<h3>🔗 ${esc(t("share"))}</h3>${links.webReferral?`<small style="display:block;color:#9db0c6;margin:8px 0 5px">${esc(t("site"))}</small><div class="webCopyRow"><input value="${esc(links.webReferral)}" readonly><button id="copyWebRef" type="button">${esc(t("copy"))}</button></div>`:""}${links.telegramReferral?`<small style="display:block;color:#9db0c6;margin:12px 0 5px">${esc(t("telegram"))}</small><div class="webCopyRow"><input value="${esc(links.telegramReferral)}" readonly><button id="copyTelegramRef" type="button">${esc(t("copy"))}</button></div>`:""}`;grid.parentElement?.appendChild(panel);panel.querySelector("#copyWebRef")?.addEventListener("click",e=>copy(links.webReferral,e.currentTarget));panel.querySelector("#copyTelegramRef")?.addEventListener("click",e=>copy(links.telegramReferral,e.currentTarget))}catch{}}

  function patch(){const grid=document.querySelector(".accountCenterGrid");if(!grid||grid.dataset.extras==="1")return;grid.dataset.extras="1";const share=document.createElement("button");share.className="accountAction";share.type="button";share.innerHTML=`<span>🔗</span><b>${esc(t("share"))}</b>`;share.onclick=()=>showShare(grid);const channel=document.createElement("button");channel.className="accountAction";channel.type="button";channel.innerHTML=`<span>📢</span><b>${esc(t("channel"))}</b>`;channel.onclick=openChannel;grid.append(share,channel)}

  const observer=new MutationObserver(patch);observer.observe(document.documentElement,{childList:true,subtree:true});if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",patch,{once:true});else patch();
})();
