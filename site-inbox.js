(function () {
  "use strict";
  const platform = window.EduCashProPlatform;
  if (!platform?.isWeb?.()) return;
  const API = "https://educashpro-all.onrender.com/api/platform-account/inbox/";
  const COPY = {
    pt: { title:"Mensagens e notificações", empty:"Sua caixa de mensagens está vazia.", unread:"novas mensagens", read:"Ler mensagem", remove:"Excluir mensagem", clear:"Limpar caixa de mensagens", confirmClear:"Apagar todas as mensagens da sua caixa?", close:"Fechar", back:"Voltar às mensagens", more:"Carregar mais", link:"Abrir link", loading:"Carregando…", error:"Não foi possível concluir. Tente novamente.", new:"Nova mensagem do EduCashPro", dismissed:"O card foi fechado. A mensagem continua na sua caixa.", login:"Entre na sua conta para ver as mensagens." },
    en: { title:"Messages and notifications", empty:"Your inbox is empty.", unread:"new messages", read:"Read message", remove:"Delete message", clear:"Clear inbox", confirmClear:"Delete all messages in your inbox?", close:"Close", back:"Back to messages", more:"Load more", link:"Open link", loading:"Loading…", error:"Could not complete. Please try again.", new:"New EduCashPro message", dismissed:"Card closed. The message remains in your inbox.", login:"Sign in to see your messages." },
    es: { title:"Mensajes y notificaciones", empty:"Tu buzón está vacío.", unread:"mensajes nuevos", read:"Leer mensaje", remove:"Eliminar mensaje", clear:"Vaciar buzón", confirmClear:"¿Eliminar todos los mensajes de tu buzón?", close:"Cerrar", back:"Volver a los mensajes", more:"Cargar más", link:"Abrir enlace", loading:"Cargando…", error:"No se pudo completar. Inténtalo de nuevo.", new:"Nuevo mensaje de EduCashPro", dismissed:"Tarjeta cerrada. El mensaje sigue en tu buzón.", login:"Entra en tu cuenta para ver los mensajes." },
    ru: { title:"Сообщения и уведомления", empty:"Входящих сообщений нет.", unread:"новых сообщений", read:"Прочитать", remove:"Удалить сообщение", clear:"Очистить входящие", confirmClear:"Удалить все входящие сообщения?", close:"Закрыть", back:"Назад к сообщениям", more:"Загрузить ещё", link:"Открыть ссылку", loading:"Загрузка…", error:"Не удалось выполнить. Попробуйте снова.", new:"Новое сообщение EduCashPro", dismissed:"Карточка закрыта. Сообщение остаётся во входящих.", login:"Войдите, чтобы просмотреть сообщения." },
  };
  let identity = "", layer = null, card = null, items = [], next = null, refreshing = null, unreadCount = 0;
  const session = () => platform.readWebSession?.();
  const language = () => window.EduCashProLocale?.resolve?.({session:session()}) || String(session()?.profile?.language || "pt").slice(0,2);
  const copy = () => COPY[language()] || COPY.pt;
  const esc = value => String(value ?? "").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
  function safeLink(value) { try { const url=new URL(value);return ["http:","https:"].includes(url.protocol)&&!url.username&&!url.password?url.href:""; } catch { return ""; } }
  function linkedText(text) {
    const regex=/https?:\/\/[^\s<>"']+/gi;let result="",offset=0;
    for(const match of String(text||"").matchAll(regex)) {
      const value=match[0].replace(/[.,!?]+$/, ""),url=safeLink(value);
      result+=esc(text.slice(offset,match.index));
      result+=url?`<a href="${esc(url)}" target="_blank" rel="noopener noreferrer">${esc(value)}</a>`:esc(value);
      result+=esc(match[0].slice(value.length));offset=match.index+match[0].length;
    }
    return result+esc(String(text||"").slice(offset));
  }
  function close(){layer?.remove();layer=null;}
  function syncIdentity(){
    const current=session();const key=current?.token?String(current.profile?.userId||current.token):"";
    if(key!==identity){lastSummaryAt=0;identity=key;close();card?.remove();card=null;items=[];next=null;unreadCount=0;document.getElementById("siteInboxButton")?.remove();}
    return Boolean(key);
  }
  async function api(action,body={}) {
    const current=session(), token=current?.token;if(!token)throw new Error("session_missing");
    if(String(current.profile?.userId||token)!==identity){syncIdentity();throw new Error("session_changed");}
    const controller=new AbortController(),timer=setTimeout(()=>controller.abort(),15000);
    try {
      const response=await fetch(API+action,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${token}`},body:JSON.stringify(body),cache:"no-store",signal:controller.signal});
      const data=await response.json();
      if(session()?.token!==token)throw new Error("session_changed");
      if(!response.ok||data.ok===false)throw new Error(data.reason||"inbox_failed");return data;
    } finally {clearTimeout(timer);}
  }
  function status(text){const el=layer?.querySelector("[data-inbox-status]");if(el)el.textContent=text;}
  function date(value){try{return new Date(value).toLocaleString(({pt:"pt-BR",en:"en-US",es:"es-ES",ru:"ru-RU"})[language()]||"pt-BR");}catch{return "";}}
  function styles(){
    if(document.getElementById("siteInboxStyle"))return;
    const s=document.createElement("style");s.id="siteInboxStyle";s.textContent=`
      .siteInboxButton{position:relative;flex:0 0 auto;width:42px;height:42px;border:1px solid #29435b;border-radius:13px;background:#102238;color:#fff;font-size:20px;cursor:pointer}
      .siteInboxBadge{position:absolute;right:-5px;top:-5px;min-width:18px;padding:2px 4px;box-sizing:border-box;border-radius:20px;background:#30e6a6;color:#061b15;font:bold 11px sans-serif}.siteInboxBadge[hidden]{display:none}
      .siteInboxLayer{position:fixed;inset:0;z-index:12500;background:rgba(1,7,15,.8);display:grid;place-items:end center;padding:14px}.siteInboxSheet{width:min(100%,680px);box-sizing:border-box;max-height:92vh;overflow:auto;border:1px solid #29435b;border-radius:22px;background:#0d1b2d;color:#fff;padding:20px}.siteInboxHead{display:flex;align-items:center;gap:12px;justify-content:space-between}.siteInboxHead h2{font-size:21px;margin:0}.siteInboxSheet button,.siteInboxCard button{cursor:pointer}.siteInboxClose{border:0;background:transparent;color:#fff;font-size:23px}.siteInboxActions{display:flex;gap:10px;flex-wrap:wrap;margin:15px 0}.siteInboxAction{padding:10px 13px;border:1px solid #29435b;border-radius:12px;background:#12243b;color:#30e6a6}.siteInboxRow{padding:14px;margin:12px 0;border:1px solid #29435b;border-radius:15px;background:#102238}.siteInboxRow.unread{border-color:#30e6a6}.siteInboxRow p,.siteInboxText{white-space:pre-wrap;overflow-wrap:anywhere;line-height:1.6}.siteInboxDate{color:#9db0c6;font-size:12px}.siteInboxText a,.siteInboxLink{color:#30e6a6;overflow-wrap:anywhere}.siteInboxLink{display:inline-block;margin:15px 0}.siteInboxCard{position:fixed;z-index:9500;top:80px;right:14px;width:min(340px,calc(100vw - 28px));box-sizing:border-box;padding:17px;border:1px solid #30e6a6;border-radius:18px;background:#102238;color:#fff;box-shadow:0 12px 35px #0008}.siteInboxCard p{overflow-wrap:anywhere;line-height:1.5}.siteInboxCard .siteInboxClose{float:right}.siteInboxStatus{color:#9db0c6;line-height:1.5}
    `;document.head.appendChild(s);
  }
  function mount(unread=unreadCount){
    if(!syncIdentity())return;styles();const top=document.querySelector(".topbar") || document.querySelector(".app > header");if(!top)return;
    let button=document.getElementById("siteInboxButton");
    if(!button){button=document.createElement("button");button.id="siteInboxButton";button.type="button";button.className="siteInboxButton";button.innerHTML='🔔<span class="siteInboxBadge" hidden></span>';button.onclick=()=>void open();top.appendChild(button);}
    button.title=copy().title;button.setAttribute("aria-label",`${copy().title}: ${unread} ${copy().unread}`);
    const badge=button.querySelector("span");badge.hidden=!unread;badge.textContent=unread>99?"99+":String(unread);
  }
  function showCard(message){
    if(!message){card?.remove();card=null;return;}
    if(card?.dataset.message===message.id)return;
    card?.remove();card=document.createElement("aside");card.className="siteInboxCard";card.dataset.message=message.id;
    card.innerHTML=`<button class="siteInboxClose" data-dismiss aria-label="${esc(copy().close)}">✕</button><strong>${esc(copy().new)}</strong><p>${esc(message.text.slice(0,180))}${message.text.length>180?"…":""}</p><button class="siteInboxAction" data-read>${esc(copy().read)}</button>`;
    document.body.appendChild(card);
    card.querySelector("[data-dismiss]").onclick=async()=>{const el=card;el.querySelector("[data-dismiss]").disabled=true;try{await api("update",{messageId:message.id,action:"dismiss"});el.remove();if(card===el)card=null;window.EduCashProApp?.toast?.(copy().dismissed);void refresh();}catch{el.querySelector("p").textContent=copy().error;el.querySelector("[data-dismiss]").disabled=false;}};
    card.querySelector("[data-read]").onclick=()=>void open(message);
  }
  let lastSummaryAt=0;
  async function refresh({cached=false}={}){
    if(!syncIdentity())return;
    if(refreshing)return refreshing;
    if(cached&&Date.now()-lastSummaryAt<300000)return;
    mount();refreshing=(async()=>{try{const result=await api("summary");if(!syncIdentity())return;lastSummaryAt=Date.now();unreadCount=result.unread;mount(result.unread);showCard(result.card);}catch{}finally{refreshing=null;}})();return refreshing;
  }
  function shell(){
    close();styles();layer=document.createElement("div");layer.className="siteInboxLayer";
    layer.innerHTML=`<section class="siteInboxSheet" role="dialog" aria-modal="true" aria-label="${esc(copy().title)}"><header class="siteInboxHead"><h2>🔔 ${esc(copy().title)}</h2><button class="siteInboxClose" data-inbox-close aria-label="${esc(copy().close)}">✕</button></header><div data-inbox-body></div><p class="siteInboxStatus" data-inbox-status role="status" aria-live="polite"></p></section>`;
    document.body.appendChild(layer);layer.querySelector("[data-inbox-close]").onclick=close;layer.onclick=e=>{if(e.target===layer)close();};
  }
  function renderList(){
    if(!layer)return;const body=layer.querySelector("[data-inbox-body]");
    body.innerHTML=`<div class="siteInboxActions"><button class="siteInboxAction" data-clear ${items.length?"":"disabled"}>${esc(copy().clear)}</button></div>${items.length?items.map(m=>`<article class="siteInboxRow ${m.read?"":"unread"}" data-message="${esc(m.id)}"><span class="siteInboxDate">${esc(date(m.createdAt))}</span><p>${esc(m.text.slice(0,180))}${m.text.length>180?"…":""}</p><div class="siteInboxActions"><button class="siteInboxAction" data-read>${esc(copy().read)}</button><button class="siteInboxAction" data-delete>${esc(copy().remove)}</button></div></article>`).join(""):`<p>${esc(copy().empty)}</p>`}${next?`<button class="siteInboxAction" data-more>${esc(copy().more)}</button>`:""}`;
    body.querySelectorAll("[data-message]").forEach(row=>{const message=items.find(m=>m.id===row.dataset.message);row.querySelector("[data-read]").onclick=()=>void read(message);row.querySelector("[data-delete]").onclick=()=>void remove(message);});
    body.querySelector("[data-clear]").onclick=async e=>{if(!confirm(copy().confirmClear))return;e.target.disabled=true;try{await api("clear");items=[];next=null;renderList();status("");void refresh();}catch{status(copy().error);e.target.disabled=false;}};
    body.querySelector("[data-more]")?.addEventListener("click",async e=>{e.target.disabled=true;try{const data=await api("list",{before:next});items.push(...data.items);next=data.next;renderList();}catch{status(copy().error);e.target.disabled=false;}});
  }
  async function loadList(){const data=await api("list");items=data.items;next=data.next;renderList();status("");}
  async function remove(message){
    try{await api("update",{messageId:message.id,action:"delete"});await loadList();void refresh();}catch{status(copy().error);}
  }
  async function read(message){
    if(!message||!layer)return;status(copy().loading);
    try{
      const result=await api("update",{messageId:message.id,action:"read"});
      if(!layer)return;
      if(!result.changed){await loadList();return;}
      message.read=true;void refresh();const url=safeLink(message.linkUrl);
      layer.querySelector("[data-inbox-body]").innerHTML=`<div class="siteInboxActions"><button class="siteInboxAction" data-back>${esc(copy().back)}</button><button class="siteInboxAction" data-delete>${esc(copy().remove)}</button></div><span class="siteInboxDate">${esc(date(message.createdAt))}</span><p class="siteInboxText">${linkedText(message.text)}</p>${url?`<a class="siteInboxLink" href="${esc(url)}" target="_blank" rel="noopener noreferrer">${esc(message.linkLabel||copy().link)}</a>`:""}`;
      layer.querySelector("[data-back]").onclick=()=>void loadList().catch(()=>status(copy().error));layer.querySelector("[data-delete]").onclick=()=>void remove(message);status("");
    }catch{status(copy().error);}
  }
  async function open(message){
    if(!syncIdentity()){window.EduCashProWebEntry?.openEmail?.();return;}
    document.querySelector(".webSiteMenuLayer")?.remove();document.querySelector(".accountCenterLayer")?.remove();document.body.classList.remove("webSiteMenuOpen");
    shell();status(copy().loading);try{if(message)await read(message);else await loadList();void refresh();}catch{status(copy().error);}
  }
  window.EduCashProInbox={open,refresh};
  window.addEventListener("educashpro:web-session-ready",()=>void refresh());
  document.addEventListener("visibilitychange",()=>{if(!document.hidden)void refresh({cached:true});});
  window.addEventListener("keydown",e=>{if(e.key==="Escape")close();});
  window.addEventListener("educashpro:app-ready",()=>void refresh({cached:true}));
  setTimeout(()=>void refresh(),1200);
  setInterval(()=>{if(!document.hidden)void refresh({cached:true});},300000);
})();
