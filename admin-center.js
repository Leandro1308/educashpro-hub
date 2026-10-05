(function () {
  const API_BASE = "https://educashpro-all.onrender.com";
  const MANIFEST_URL = "https://go.educashpro.vip/tonconnect-manifest.json";
  const BOT_URL = "https://t.me/EduCashProBot";
  const platform = window.EduCashProPlatform;
  if (!platform?.isWeb?.()) return;

  let pollTimer = 0;
  let tonUi = null;

  function session() {
    return platform.readWebSession?.() || window.__EDUCASHPRO_SESSION__ || null;
  }

  function language() {
    const raw = String(session()?.profile?.language || navigator.language || "pt").toLowerCase();
    if (raw.startsWith("en")) return "en";
    if (raw.startsWith("es")) return "es";
    if (raw.startsWith("ru")) return "ru";
    return "pt";
  }

  const TEXT = {
    pt:{title:"Painel Administrativo",sub:"Gestão do EduCashPro no site. Esta área é invisível para usuários comuns.",overview:"Visão geral",users:"Usuários",active:"Ativos",inactive:"Inativos",communities:"Comunidades",benefits:"Benefícios",partners:"Parceiros",reviewers:"Avaliadores",support:"Mensagens e suporte",broadcast:"Enviar mensagem",channel:"Publicar no canal",invite:"Convite de parceiro",branding:"Identidade do aplicativo",contract:"Contrato V5",manual:"Manual do contrato",back:"Voltar ao painel",loading:"Carregando…",error:"Não foi possível concluir esta operação.",approve:"Aprovar",reject:"Reprovar",suspend:"Suspender",disable:"Desativar",remove:"Excluir",save:"Salvar",close:"Fechar",copy:"Copiar",copied:"Copiado",confirmDelete:"Esta ação é permanente. Deseja continuar?",noItems:"Nenhum registro encontrado.",status:"Status",open:"Abrir"},
    en:{title:"Administration",sub:"EduCashPro management on the website. This area is hidden from regular users.",overview:"Overview",users:"Users",active:"Active",inactive:"Inactive",communities:"Communities",benefits:"Benefits",partners:"Partners",reviewers:"Reviewers",support:"Messages and support",broadcast:"Send message",channel:"Publish to channel",invite:"Partner invite",branding:"App identity",contract:"V5 Contract",manual:"Contract manual",back:"Back to admin",loading:"Loading…",error:"Could not complete this operation.",approve:"Approve",reject:"Reject",suspend:"Suspend",disable:"Disable",remove:"Delete",save:"Save",close:"Close",copy:"Copy",copied:"Copied",confirmDelete:"This action is permanent. Continue?",noItems:"No records found.",status:"Status",open:"Open"},
    es:{title:"Administración",sub:"Gestión de EduCashPro en el sitio. Esta área está oculta para usuarios comunes.",overview:"Resumen",users:"Usuarios",active:"Activos",inactive:"Inactivos",communities:"Comunidades",benefits:"Beneficios",partners:"Socios",reviewers:"Revisores",support:"Mensajes y soporte",broadcast:"Enviar mensaje",channel:"Publicar en el canal",invite:"Invitación de socio",branding:"Identidad de la app",contract:"Contrato V5",manual:"Manual del contrato",back:"Volver al panel",loading:"Cargando…",error:"No se pudo completar la operación.",approve:"Aprobar",reject:"Rechazar",suspend:"Suspender",disable:"Desactivar",remove:"Eliminar",save:"Guardar",close:"Cerrar",copy:"Copiar",copied:"Copiado",confirmDelete:"Esta acción es permanente. ¿Continuar?",noItems:"No se encontraron registros.",status:"Estado",open:"Abrir"},
    ru:{title:"Администрирование",sub:"Управление EduCashPro на сайте. Этот раздел скрыт от обычных пользователей.",overview:"Обзор",users:"Пользователи",active:"Активные",inactive:"Неактивные",communities:"Сообщества",benefits:"Преимущества",partners:"Партнёры",reviewers:"Проверяющие",support:"Сообщения и поддержка",broadcast:"Отправить сообщение",channel:"Публикация в канал",invite:"Приглашение партнёра",branding:"Оформление приложения",contract:"Контракт V5",manual:"Руководство контракта",back:"Назад",loading:"Загрузка…",error:"Не удалось выполнить операцию.",approve:"Одобрить",reject:"Отклонить",suspend:"Приостановить",disable:"Отключить",remove:"Удалить",save:"Сохранить",close:"Закрыть",copy:"Копировать",copied:"Скопировано",confirmDelete:"Это действие необратимо. Продолжить?",noItems:"Записей нет.",status:"Статус",open:"Открыть"}
  };

  function t(key){return TEXT[language()]?.[key] || TEXT.pt[key] || key}
  function esc(value){return String(value ?? "").replace(/[&<>"']/g,(c)=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]))}
  function clearPoll(){if(pollTimer){clearTimeout(pollTimer);pollTimer=0}}
  function close(){clearPoll();tonUi=null;document.querySelector(".adminCenterLayer")?.remove()}

  async function api(path, body = {}) {
    const token = session()?.token;
    if (!token) throw new Error("session_missing");
    const response = await fetch(API_BASE + "/api/platform-admin" + path,{
      method:"POST",
      headers:{"Content-Type":"application/json",Authorization:"Bearer " + token},
      body:JSON.stringify(body),
      cache:"no-store"
    });
    const data = await response.json().catch(()=>({}));
    if(!response.ok) {
      const error = new Error(data?.message || data?.reason || ("HTTP_" + response.status));
      error.status=response.status;
      throw error;
    }
    return data;
  }

  function injectStyles(){
    if(document.getElementById("adminCenterStyles"))return;
    const style=document.createElement("style");
    style.id="adminCenterStyles";
    style.textContent=`
      .adminCenterLayer{position:fixed;z-index:13000;inset:0;display:grid;place-items:end center;padding:12px;background:rgba(1,7,15,.78);backdrop-filter:blur(9px)}
      .adminCenterSheet{width:min(100%,820px);max-height:92vh;overflow:auto;border:1px solid rgba(255,255,255,.1);border-radius:24px 24px 16px 16px;background:#0b192a;color:#f7fbff;padding:18px;box-shadow:0 28px 90px rgba(0,0,0,.52)}
      .adminHead{display:flex;align-items:flex-start;justify-content:space-between;gap:14px}.adminHead h2{margin:0;font-size:25px}.adminHead p{margin:5px 0 0;color:#9eb1c6;line-height:1.45}.adminClose{border:0;background:transparent;color:#9eb1c6;font-size:25px;cursor:pointer}
      .adminStats{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:9px;margin:16px 0}.adminMetric{padding:13px;border-radius:15px;background:#0f2339}.adminMetric small{display:block;color:#9eb1c6;margin-bottom:4px}.adminMetric b{font-size:20px}
      .adminGrid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:9px}.adminCard{min-height:105px;padding:14px;border:1px solid rgba(255,255,255,.09);border-radius:17px;background:#11263d;color:#fff;text-align:left;cursor:pointer}.adminCard:hover{border-color:rgba(48,230,166,.4)}.adminCard span{font-size:24px}.adminCard b{display:block;margin:8px 0 4px}.adminCard small{color:#9eb1c6;line-height:1.35}
      .adminPanel{margin-top:14px;padding:15px;border-radius:17px;background:#10233a}.adminPanel h3{margin:0 0 12px}.adminToolbar{display:flex;gap:8px;flex-wrap:wrap;margin:10px 0}.adminButton{min-height:42px;padding:0 13px;border:0;border-radius:12px;background:#30e6a6;color:#061b15;font-weight:900;cursor:pointer}.adminButton.secondary{border:1px solid rgba(48,230,166,.28);background:transparent;color:#30e6a6}.adminButton.danger{border:1px solid rgba(255,105,122,.35);background:rgba(255,105,122,.08);color:#ffb6c0}.adminButton:disabled{opacity:.55;cursor:not-allowed}
      .adminItem{padding:13px;margin-top:9px;border:1px solid rgba(255,255,255,.08);border-radius:14px;background:#091827}.adminItem h4{margin:0 0 5px}.adminItem p{margin:4px 0;color:#a7b7ca;line-height:1.4;overflow-wrap:anywhere}.adminTag{display:inline-block;padding:4px 8px;margin:3px 4px 3px 0;border-radius:999px;background:rgba(48,230,166,.1);color:#69f0bd;font-size:11px;font-weight:900}
      .adminField,.adminSelect,.adminText{width:100%;box-sizing:border-box;border:1px solid rgba(255,255,255,.12);border-radius:12px;background:#071523;color:#fff;font-size:16px}.adminField,.adminSelect{min-height:45px;padding:0 11px}.adminText{min-height:120px;padding:11px;resize:vertical}.adminLabel{display:block;margin:10px 0 5px;color:#cdd7e3;font-size:13px;font-weight:800}.adminStatus{min-height:20px;margin-top:9px;color:#6df1bf;font-size:13px}.adminError{color:#ff9fac}.adminChecks{display:flex;gap:10px;flex-wrap:wrap}.adminChecks label{display:flex;gap:6px;align-items:center;padding:8px 10px;border-radius:10px;background:#091827}
      .adminManualSection{margin-top:12px;padding-top:12px;border-top:1px solid rgba(255,255,255,.08)}.adminManualSection details{margin-top:7px;padding:9px 11px;border-radius:12px;background:#091827}.adminManualSection summary{cursor:pointer;font-weight:800}.adminManualSection p{color:#a7b7ca;line-height:1.45}
      @media(max-width:680px){.adminGrid{grid-template-columns:repeat(2,minmax(0,1fr))}.adminStats{grid-template-columns:repeat(2,minmax(0,1fr))}}
      @media(max-width:420px){.adminCenterSheet{padding:15px}.adminGrid{grid-template-columns:1fr 1fr}.adminCard{min-height:96px;padding:12px}.adminStats{grid-template-columns:1fr 1fr}}
    `;
    document.head.appendChild(style);
  }

  function shell(inner){
    injectStyles();close();
    const layer=document.createElement("div");layer.className="adminCenterLayer";
    layer.innerHTML=`<section class="adminCenterSheet"><div class="adminHead"><div><span class="adminTag">ADMIN</span><h2>${esc(t("title"))}</h2><p>${esc(t("sub"))}</p></div><button class="adminClose" type="button" aria-label="${esc(t("close"))}">✕</button></div><div id="adminBody">${inner||""}</div></section>`;
    document.body.appendChild(layer);
    layer.querySelector(".adminClose").addEventListener("click",close);
    layer.addEventListener("click",(event)=>{if(event.target===layer)close()});
    return layer.querySelector("#adminBody");
  }

  function backButton(){
    return `<button id="adminBack" class="adminButton secondary" type="button">← ${esc(t("back"))}</button>`;
  }
  function bindBack(body){body.querySelector("#adminBack")?.addEventListener("click",()=>void open())}

  async function open(){
    const body=shell(`<div class="adminPanel">${esc(t("loading"))}</div>`);
    try{
      const data=await api("/bootstrap");
      const u=data.stats?.users||{}, c=data.stats?.content||{};
      body.innerHTML=`
        <div class="adminStats">
          <div class="adminMetric"><small>${esc(t("users"))}</small><b>${Number(u.total||0)}</b></div>
          <div class="adminMetric"><small>${esc(t("active"))}</small><b>${Number(u.active||0)}</b></div>
          <div class="adminMetric"><small>${esc(t("inactive"))}</small><b>${Number(u.inactive||0)}</b></div>
          <div class="adminMetric"><small>${esc(t("communities"))}</small><b>${Number(c.communities||0)}</b></div>
          <div class="adminMetric"><small>${esc(t("benefits"))}</small><b>${Number(c.benefits||0)}</b></div>
          <div class="adminMetric"><small>${esc(t("partners"))}</small><b>${Number(c.partners||0)}</b></div>
        </div>
        <div class="adminGrid">
          <button class="adminCard" data-admin="support"><span>💬</span><b>${esc(t("support"))}</b><small>${Number(c.supportOpen||0)} pendentes</small></button>
          <button class="adminCard" data-admin="communities"><span>🌐</span><b>${esc(t("communities"))}</b><small>Moderar e remover</small></button>
          <button class="adminCard" data-admin="benefit-create"><span>➕</span><b>${esc(({pt:"Cadastrar benefício",en:"Create benefit",es:"Crear beneficio",ru:"Добавить преимущество"})[language()])}</b></button>
          <button class="adminCard" data-admin="benefits"><span>🎁</span><b>${esc(t("benefits"))}</b><small>Aprovar, desativar e excluir</small></button>
          <button class="adminCard" data-admin="partners"><span>🏪</span><b>${esc(t("partners"))}</b><small>Aprovar, suspender e excluir</small></button>
          <button class="adminCard" data-admin="reviewers"><span>🕵️</span><b>${esc(t("reviewers"))}</b><small>${Number(c.reviewers||0)} cadastrados</small></button>
          <button class="adminCard" data-admin="broadcast"><span>📣</span><b>${esc(t("broadcast"))}</b><small>Idioma e público-alvo</small></button>
          <button class="adminCard" data-admin="channel"><span>📢</span><b>${esc(t("channel"))}</b><small>Canal oficial de educação</small></button>
          <button class="adminCard" data-admin="invite"><span>🎟️</span><b>${esc(t("invite"))}</b><small>Convite vitalício de uso único</small></button>
          <button class="adminCard" data-admin="branding"><span>🎨</span><b>${esc(t("branding"))}</b><small>Ícone e identidade visual</small></button>
          <button class="adminCard" data-admin="contract"><span>⛓️</span><b>${esc(t("contract"))}</b><small>Estado e transações owner</small></button>
          <button class="adminCard" data-admin="manual"><span>📘</span><b>${esc(t("manual"))}</b><small>Funções do SubscriptionSplitV5</small></button>
        </div>`;
      body.querySelectorAll("[data-admin]").forEach((button)=>button.addEventListener("click",()=>{
        const key=button.dataset.admin;
        if(key==="support"){close();location.assign("./support.html");}
        else if(["communities","benefits","partners"].includes(key))void openContent(key);
        else if(key==="benefit-create")void openBenefitCreate();
        else if(key==="reviewers")void openReviewers();
        else if(key==="broadcast")void openBroadcast();
        else if(key==="channel")void openChannel();
        else if(key==="invite")void openInvite();
        else if(key==="branding"){close();window.EduCashProAccountCenter?.openAdminIcon?.()}
        else if(key==="contract")void openContract();
        else if(key==="manual")void openManual();
      }));
    }catch(error){
      body.innerHTML=`<div class="adminPanel adminError">${esc(t("error"))}<br><small>${esc(error.message)}</small></div>`;
    }
  }

  function openBenefitCreate(){
    const labels={pt:["Cadastrar benefício","Título","Descrição","Link","Categoria","Idioma"],en:["Create benefit","Title","Description","Link","Category","Language"],es:["Crear beneficio","Título","Descripción","Enlace","Categoría","Idioma"],ru:["Добавить преимущество","Название","Описание","Ссылка","Категория","Язык"]}[language()];
    const body=shell(`<div class="adminPanel"><h3>${esc(labels[0])}</h3><form id="adminBenefitForm">${["title","description","url","category"].map((name,i)=>`<label class="adminLabel">${esc(labels[i+1])}</label>${name==="description"?`<textarea class="adminText" name="${name}" required maxlength="800"></textarea>`:`<input class="adminField" name="${name}" ${name==="url"?'type="url"':'type="text"'} ${name==="category"?'':'required'} maxlength="${name==="title"?120:1000}">`}`).join("")}<label class="adminLabel">${esc(labels[5])}</label><select class="adminSelect" name="language">${["pt","en","es","ru","all"].map(l=>`<option>${l}</option>`).join("")}</select><button class="adminButton" type="submit">${esc(t("save"))}</button><p class="adminStatus" role="status"></p></form></div>`);
    body.querySelector("form").onsubmit=async e=>{e.preventDefault();const button=e.target.querySelector("button");button.disabled=true;try{await api("/benefits/create",Object.fromEntries(new FormData(e.target)));await openContent("benefits")}catch(error){body.querySelector(".adminStatus").textContent=error.message}finally{button.disabled=false}};
  }

  function itemTitle(kind,item){
    if(kind==="communities")return item.name||item.title||item.url||item.id;
    if(kind==="benefits")return item.title||item.providerName||item.id;
    return item.companyName||item.name||item.id;
  }

  function itemSubtitle(kind,item){
    if(kind==="communities")return [item.type,item.category,item.language,item.url].filter(Boolean).join(" · ");
    if(kind==="benefits")return [item.category,item.language,item.providerName].filter(Boolean).join(" · ");
    return [item.segment,item.city,item.state,item.contact].filter(Boolean).join(" · ");
  }

  function actionSet(kind){
    if(kind==="communities")return [["approve",t("approve")],["reject",t("reject")],["delete",t("remove")]];
    if(kind==="benefits")return [["approve",t("approve")],["reject",t("reject")],["disable",t("disable")],["delete",t("remove")]];
    return [["approve",t("approve")],["reject",t("reject")],["suspend",t("suspend")],["delete",t("remove")]];
  }

  async function openContent(kind){
    const body=shell(`${backButton()}<div class="adminPanel">${esc(t("loading"))}</div>`);bindBack(body);
    try{
      const data=await api("/content/list",{kind,limit:120});
      const items=data.items||[];
      body.querySelector(".adminPanel").innerHTML=`<h3>${esc(t(kind))}</h3>${items.length?items.map((item)=>`
        <article class="adminItem" data-item="${esc(item.id)}">
          <span class="adminTag">${esc(item.status||((item.active===false)?"inactive":"active"))}</span>
          <h4>${esc(itemTitle(kind,item))}</h4>
          <p>${esc(itemSubtitle(kind,item))}</p>
          <p>${esc(item.description||item.discountRules||"")}</p>
          <div class="adminToolbar">${actionSet(kind).map(([action,label])=>`<button class="adminButton ${action==="delete"?"danger":"secondary"}" data-action="${action}" type="button">${esc(label)}</button>`).join("")}</div>
        </article>`).join(""):`<p class="adminNote">${esc(t("noItems"))}</p>`}</div>`;
      body.querySelectorAll("[data-item]").forEach((card)=>{
        card.querySelectorAll("[data-action]").forEach((button)=>button.addEventListener("click",async()=>{
          const action=button.dataset.action;
          if(action==="delete"&&!confirm(t("confirmDelete")))return;
          button.disabled=true;
          try{
            await api("/content/action",{kind,action,id:card.dataset.item});
            await openContent(kind);
          }catch(error){button.disabled=false;alert(t("error")+" "+error.message)}
        }));
      });
    }catch(error){body.querySelector(".adminPanel").innerHTML=`<span class="adminError">${esc(t("error"))} ${esc(error.message)}</span>`}
  }

  async function openReviewers(){
    const body=shell(`${backButton()}<div class="adminPanel"><h3>🕵️ ${esc(t("reviewers"))}</h3><label class="adminLabel">Telegram ID</label><input id="reviewerId" class="adminField" inputmode="numeric"><div class="adminChecks" style="margin-top:10px">${["pt","en","es","ru"].map((l)=>`<label><input type="checkbox" value="${l}" checked> ${l.toUpperCase()}</label>`).join("")}</div><button id="reviewerAdd" class="adminButton" style="margin-top:10px" type="button">${esc(t("save"))}</button><div id="reviewerStatus" class="adminStatus"></div><div id="reviewerList"></div></div>`);bindBack(body);
    const list=body.querySelector("#reviewerList"), status=body.querySelector("#reviewerStatus");
    async function load(){
      const data=await api("/reviewers/list");
      list.innerHTML=(data.items||[]).map((item)=>`<article class="adminItem"><span class="adminTag">${item.active===false?"INATIVO":"ATIVO"}</span><h4>${esc(item.tgId)}</h4><p>${esc((item.languages||[]).join(", "))}</p><button class="adminButton danger" data-remove="${esc(item.tgId)}" type="button">${esc(t("remove"))}</button></article>`).join("")||`<p>${esc(t("noItems"))}</p>`;
      list.querySelectorAll("[data-remove]").forEach((button)=>button.addEventListener("click",async()=>{if(!confirm(t("confirmDelete")))return;await api("/reviewers/remove",{tgId:button.dataset.remove});await load()}));
    }
    body.querySelector("#reviewerAdd").addEventListener("click",async()=>{
      const tgId=body.querySelector("#reviewerId").value.replace(/\D/g,"");
      const languages=Array.from(body.querySelectorAll(".adminChecks input:checked")).map((el)=>el.value);
      status.textContent=t("loading");
      try{await api("/reviewers/add",{tgId,languages});body.querySelector("#reviewerId").value="";status.textContent="OK";await load()}catch(error){status.textContent=t("error")+" "+error.message}
    });
    try{await load()}catch(error){status.textContent=t("error")+" "+error.message}
  }

  async function openBroadcast(){
    const l=({pt:{destination:"Destino",site:"Caixa de mensagens do site",telegram:"Telegram",language:"Idioma",all:"Todos",audience:"Público",active:"Assinantes ativos",inactive:"Não assinantes / inativos",message:"Mensagem",link:"Link clicável (opcional)",linkLabel:"Texto do link (opcional)",count:"Contar destinatários",send:"Enviar",recipients:"destinatários",sent:"Mensagens entregues",confirm:"Confirmar o envio desta mensagem?",media:"Mídia (opcional)",copy:"Ou copiar mensagem do Telegram"},en:{destination:"Destination",site:"Website inbox",telegram:"Telegram",language:"Language",all:"All",audience:"Audience",active:"Active subscribers",inactive:"Non-subscribers / inactive",message:"Message",link:"Clickable link (optional)",linkLabel:"Link label (optional)",count:"Count recipients",send:"Send",recipients:"recipients",sent:"Messages delivered",confirm:"Send this message?",media:"Media (optional)",copy:"Or copy a Telegram message"},es:{destination:"Destino",site:"Buzón del sitio",telegram:"Telegram",language:"Idioma",all:"Todos",audience:"Público",active:"Suscriptores activos",inactive:"No suscriptores / inactivos",message:"Mensaje",link:"Enlace clicable (opcional)",linkLabel:"Texto del enlace (opcional)",count:"Contar destinatarios",send:"Enviar",recipients:"destinatarios",sent:"Mensajes entregados",confirm:"¿Enviar este mensaje?",media:"Multimedia (opcional)",copy:"O copiar mensaje de Telegram"},ru:{destination:"Куда отправить",site:"Входящие на сайте",telegram:"Telegram",language:"Язык",all:"Все",audience:"Аудитория",active:"Активные подписчики",inactive:"Без подписки / неактивные",message:"Сообщение",link:"Ссылка (необязательно)",linkLabel:"Текст ссылки (необязательно)",count:"Посчитать получателей",send:"Отправить",recipients:"получателей",sent:"Сообщений доставлено",confirm:"Отправить сообщение?",media:"Медиа (необязательно)",copy:"Или скопировать сообщение Telegram"}})[language()];
    const body=shell(`${backButton()}<div class="adminPanel"><h3>📣 ${esc(t("broadcast"))}</h3><label class="adminLabel">${esc(l.destination)}</label><select id="broadcastDestination" class="adminSelect"><option value="site">${esc(l.site)}</option><option value="telegram">${esc(l.telegram)}</option></select><label class="adminLabel">${esc(l.language)}</label><select id="broadcastLang" class="adminSelect"><option value="all">${esc(l.all)}</option><option value="pt">Português</option><option value="en">English</option><option value="es">Español</option><option value="ru">Русский</option></select><label class="adminLabel">${esc(l.audience)}</label><select id="broadcastAudience" class="adminSelect"><option value="all">${esc(l.all)}</option><option value="active">${esc(l.active)}</option><option value="inactive">${esc(l.inactive)}</option></select><label class="adminLabel">${esc(l.message)}</label><textarea id="broadcastText" class="adminText" maxlength="4000"></textarea><label class="adminLabel">${esc(l.link)}</label><input id="broadcastLinkUrl" class="adminField" type="url" placeholder="https://..."><label class="adminLabel">${esc(l.linkLabel)}</label><input id="broadcastLinkLabel" class="adminField" maxlength="120"><div id="broadcastTelegramMedia" hidden><label class="adminLabel">${esc(l.media)}</label><select id="broadcastMediaType" class="adminSelect"><option value="photo">Imagem / Photo</option><option value="video">Vídeo / Video</option><option value="audio">Áudio / Audio</option><option value="document">Documento / Document</option></select><input id="broadcastMediaUrl" class="adminField" type="url" placeholder="https://..."><label class="adminLabel">${esc(l.copy)}</label><input id="broadcastSourceChat" class="adminField" placeholder="@canal / ID"><input id="broadcastSourceMessage" class="adminField" type="number" min="1" placeholder="ID"></div><div class="adminToolbar"><button id="broadcastCount" class="adminButton secondary" type="button">${esc(l.count)}</button><button id="broadcastSend" class="adminButton" type="button">${esc(l.send)}</button></div><div id="broadcastStatus" class="adminStatus" role="status"></div></div>`);bindBack(body);
    const status=body.querySelector("#broadcastStatus"),destination=body.querySelector("#broadcastDestination");
    destination.onchange=()=>{body.querySelector("#broadcastTelegramMedia").hidden=destination.value!=="telegram";status.textContent="";};
    const filters=()=>({language:body.querySelector("#broadcastLang").value,audience:body.querySelector("#broadcastAudience").value});
    body.querySelector("#broadcastCount").onclick=async e=>{e.target.disabled=true;status.textContent=t("loading");try{const data=await api(destination.value==="site"?"/inbox/count":"/broadcast/count",filters());status.textContent=data.count+" "+l.recipients;}catch(error){status.textContent=t("error")+" "+error.message;}finally{e.target.disabled=false;}};
    body.querySelector("#broadcastSend").onclick=async e=>{
      let text=body.querySelector("#broadcastText").value.trim();const linkUrl=body.querySelector("#broadcastLinkUrl").value.trim(),linkLabel=body.querySelector("#broadcastLinkLabel").value.trim();
      const isSite=destination.value==="site";
      if(text.length<2&&(isSite||!body.querySelector("#broadcastMediaUrl").value&&!body.querySelector("#broadcastSourceChat").value))return;
      if(linkUrl){try{const url=new URL(linkUrl);if(!["https:","http:"].includes(url.protocol)||url.username||url.password)throw new Error();}catch{status.textContent=t("error")+" URL";return;}}
      if(!confirm(l.confirm))return;
      e.target.disabled=true;destination.disabled=true;status.textContent=t("loading");
      try{
        if(isSite){const data=await api("/inbox/send",{...filters(),text,linkUrl,linkLabel});status.textContent=`${l.sent}: ${data.sent}`;return;}
        if(linkUrl)text+=`\n\n<a href="${esc(linkUrl)}">${esc(linkLabel||linkUrl)}</a>`;
        const data=await api("/broadcast/start",{...filters(),text,mediaType:body.querySelector("#broadcastMediaType").value,mediaUrl:body.querySelector("#broadcastMediaUrl").value,sourceChatId:body.querySelector("#broadcastSourceChat").value,sourceMessageId:Number(body.querySelector("#broadcastSourceMessage").value||0)});
        const jobId=data.jobId;
        const check=async()=>{try{const result=await api("/broadcast/status",{jobId});const j=result.job;status.textContent=`${j.status} · ${j.processed||0} / ${j.sent||0} / ${j.failed||0}`;if(["completed","failed"].includes(j.status))return;pollTimer=setTimeout(check,1800);}catch(error){status.textContent=t("error")+" "+error.message;}};
        await check();
      }catch(error){status.textContent=t("error")+" "+error.message;}finally{e.target.disabled=false;destination.disabled=false;}
    };
  }

  async function openChannel(){
    const body=shell(`${backButton()}<div class="adminPanel"><h3>📢 ${esc(t("channel"))}</h3><label class="adminLabel">Texto / legenda</label><textarea id="channelText" class="adminText" maxlength="4096"></textarea><label class="adminLabel">Imagem (URL, opcional)</label><input id="channelImage" class="adminField" type="url"><label class="adminLabel">Texto do botão (opcional)</label><input id="channelButtonText" class="adminField"><label class="adminLabel">URL do botão (opcional)</label><input id="channelButtonUrl" class="adminField" type="url"><button id="channelPublish" class="adminButton" style="margin-top:12px" type="button">Publicar</button><div id="channelStatus" class="adminStatus"></div></div>`);bindBack(body);
    body.querySelector("#channelPublish").addEventListener("click",async()=>{
      const status=body.querySelector("#channelStatus");status.textContent=t("loading");
      try{
        const data=await api("/channel/publish",{text:body.querySelector("#channelText").value,imageUrl:body.querySelector("#channelImage").value,buttonText:body.querySelector("#channelButtonText").value,buttonUrl:body.querySelector("#channelButtonUrl").value});
        status.textContent="Publicado"+(data.messageId?" · #"+data.messageId:"");
      }catch(error){status.textContent=t("error")+" "+error.message}
    });
  }

  async function openInvite(){
    const body=shell(`${backButton()}<div class="adminPanel"><h3>🎟️ ${esc(t("invite"))}</h3><p>Gera um convite de uso único para parceiro vitalício, mantendo a mesma regra existente no bot.</p><button id="inviteCreate" class="adminButton" type="button">Gerar convite</button><div id="inviteResult" class="adminStatus"></div></div>`);bindBack(body);
    body.querySelector("#inviteCreate").addEventListener("click",async()=>{
      const result=body.querySelector("#inviteResult");result.textContent=t("loading");
      try{
        const data=await api("/partner-invite/create");
        const link=BOT_URL+"?start=partner_"+data.token;
        result.innerHTML=`<div class="adminItem"><p id="inviteLink">${esc(link)}</p><button id="inviteCopy" class="adminButton secondary" type="button">${esc(t("copy"))}</button></div>`;
        result.querySelector("#inviteCopy").addEventListener("click",async()=>{try{await navigator.clipboard.writeText(link);result.querySelector("#inviteCopy").textContent=t("copied")}catch{}});
      }catch(error){result.textContent=t("error")+" "+error.message}
    });
  }

  const CONTRACT_SCHEMA={
    setTreasury:{label:"Tesouraria",fields:[["newTreasury","Endereço da nova tesouraria","text"]]},
    setOwner:{label:"Transferir owner",fields:[["newOwner","Novo owner","text"]]},
    setPriceUsdt:{label:"Preço periódico",fields:[["newPriceUsdt","Preço em USDT","number"]]},
    setCycleDays:{label:"Ciclo em dias",fields:[["days","Dias","number"]]},
    setCycleSeconds:{label:"Ciclo em segundos",fields:[["seconds","Segundos","number"]]},
    setPaused:{label:"Pausar/reativar",fields:[["paused","Pausado","boolean"]]},
    setMyJettonWallet:{label:"Jetton Wallet do contrato",fields:[["newJettonWallet","Jetton Wallet","text"]]},
    setJettonTonValueTon:{label:"TON por transferência Jetton",fields:[["ton","TON","number"]]},
    recoverJettonUsdt:{label:"Recuperar USDT",fields:[["to","Destino","text"],["usdt","USDT","number"]]},
    recoverTon:{label:"Recuperar TON",fields:[["to","Destino","text"],["ton","TON","number"]]},
    setLifetimeUser:{label:"Definir vitalício",fields:[["user","Carteira do usuário","text"],["enabled","Ativo","boolean"]]},
    setLifetimePriceUsdt:{label:"Preço vitalício",fields:[["newPriceUsdt","Preço em USDT","number"]]},
    setRefundWindowSeconds:{label:"Janela de reembolso",fields:[["seconds","Segundos","number"]]},
    setRenewWindowSeconds:{label:"Janela de renovação",fields:[["seconds","Segundos","number"]]},
    setLifetimeManager:{label:"Lifetime Manager",fields:[["newManager","Endereço do manager","text"]]},
    grantLifetimeUser:{label:"Conceder vitalício",fields:[["user","Carteira do usuário","text"]]},
    setSplitSlot:{label:"Configurar split",fields:[["slot","Slot 1–5","number"],["wallet","Carteira","text"],["bps","BPS","number"]]},
    clearSplitSlot:{label:"Limpar split",fields:[["slot","Slot 1–5","number"]]},
    setQualificationEnabled:{label:"Qualificação",fields:[["enabled","Habilitada","boolean"]]},
    setLevelRequirement:{label:"Requisito de nível",fields:[["level","Nível 2–5","number"],["minDirects","Diretos mínimos","number"]]}
  };

  function renderContractFields(body,action){
    const target=body.querySelector("#contractFields");const spec=CONTRACT_SCHEMA[action];if(!target||!spec)return;
    target.innerHTML=spec.fields.map(([name,label,type])=>`<label class="adminLabel">${esc(label)}</label>${type==="boolean"?`<select class="adminSelect" data-contract-field="${name}" data-type="boolean"><option value="true">Sim</option><option value="false">Não</option></select>`:`<input class="adminField" data-contract-field="${name}" data-type="${type}" type="${type==="number"?"number":"text"}" step="any">`}`).join("");
  }

  async function openContract(){
    const body=shell(`${backButton()}<div class="adminPanel"><h3>⛓️ ${esc(t("contract"))}</h3><div id="contractState">${esc(t("loading"))}</div></div><div class="adminPanel"><h3>Carteira owner</h3><div id="adminTonConnect"></div><p class="adminNote">A sessão de administrador é validada pelo servidor. A transação só é construída e enviada se a carteira conectada também for o owner do contrato.</p></div><div class="adminPanel"><h3>Ação administrativa</h3><select id="contractAction" class="adminSelect">${Object.entries(CONTRACT_SCHEMA).map(([key,spec])=>`<option value="${key}">${esc(spec.label)}</option>`).join("")}</select><div id="contractFields"></div><button id="contractSend" class="adminButton" style="margin-top:12px" type="button">Construir e assinar</button><div id="contractStatus" class="adminStatus"></div></div>`);bindBack(body);
    const stateBox=body.querySelector("#contractState"), action=body.querySelector("#contractAction"), status=body.querySelector("#contractStatus");
    try{
      const data=await api("/contract/state");
      stateBox.innerHTML=`<div class="adminStats"><div class="adminMetric"><small>Preço</small><b>${data.currentPriceUsdt==null?"—":esc(data.currentPriceUsdt+" USDT")}</b></div><div class="adminMetric"><small>Ciclo</small><b>${esc(data.cycleSeconds??"—")}</b></div><div class="adminMetric"><small>Qualificação</small><b>${data.qualificationEnabled?"ON":"OFF"}</b></div></div><p><b>Owner:</b> ${esc(data.ownerFriendly||data.owner||"—")}</p><p><b>Tesouraria:</b> ${esc(data.treasuryFriendly||data.treasury||"—")}</p><p><b>Jetton Wallet:</b> ${data.myJettonWalletConfigured?"✅ configurada":"⚠️ revisar"}</p>`;
    }catch(error){stateBox.innerHTML=`<span class="adminError">${esc(t("error"))} ${esc(error.message)}</span>`}
    renderContractFields(body,action.value);
    action.addEventListener("change",()=>renderContractFields(body,action.value));
    try{
      if (!window.TON_CONNECT_UI?.TonConnectUI) await new Promise((resolve,reject)=>{
        const script=document.createElement("script");script.src="https://unpkg.com/@tonconnect/ui@3.0.0/dist/tonconnect-ui.min.js";script.onload=resolve;script.onerror=reject;document.head.appendChild(script);
      });
      tonUi=new window.TON_CONNECT_UI.TonConnectUI({manifestUrl:MANIFEST_URL,buttonRootId:"adminTonConnect"});
      tonUi.onModalStateChange?.(state=>{const layer=document.querySelector(".adminCenterLayer");if(layer)layer.style.visibility=state?.status==="opened"?"hidden":"visible"});
    }catch{}
    body.querySelector("#contractSend").addEventListener("click",async()=>{
      const wallet=tonUi?.account?.address||tonUi?.wallet?.account?.address||"";
      if(!wallet){status.textContent="Conecte a carteira owner.";return}
      const params={};
      body.querySelectorAll("[data-contract-field]").forEach((field)=>{
        const type=field.dataset.type;let value=field.value;
        if(type==="boolean")value=value==="true";
        else if(type==="number")value=Number(value);
        params[field.dataset.contractField]=value;
      });
      const label=CONTRACT_SCHEMA[action.value]?.label||action.value;
      if(!confirm("Confirmar a ação: "+label+"?"))return;
      status.textContent=t("loading");
      try{
        const data=await api("/contract/build",{owner:wallet,action:action.value,params});
        if(!data.tx)throw new Error("transaction_not_built");
        await tonUi.sendTransaction(data.tx);
        status.textContent="Transação enviada para confirmação na carteira.";
      }catch(error){status.textContent=t("error")+" "+error.message}
    });
  }

  async function openManual(){
    const body=shell(`${backButton()}<div class="adminPanel">${esc(t("loading"))}</div>`);bindBack(body);
    try{
      const data=await api("/manual"), manual=data.manual||{};
      body.querySelector(".adminPanel").innerHTML=`<h3>📘 ${esc(manual.title||t("manual"))}</h3><p>${esc(manual.subtitle||"")}</p>${(manual.notes||[]).map((note)=>`<p>• ${esc(note)}</p>`).join("")}${(manual.sections||[]).map((section)=>`<section class="adminManualSection"><h4>${esc(section.title)}</h4><p>${esc(section.description||"")}</p>${(section.items||[]).map((item)=>`<details><summary>${esc(item.name||"Função")} ${item.opcode?`· ${esc(item.opcode)}`:""}</summary><p><b>Acesso:</b> ${esc(item.access||"—")}</p><p>${esc(item.purpose||"")}</p><p><b>Uso:</b> ${esc(item.use||"")}</p></details>`).join("")}</section>`).join("")}</div>`;
    }catch(error){body.querySelector(".adminPanel").innerHTML=`<span class="adminError">${esc(t("error"))} ${esc(error.message)}</span>`}
  }

  window.EduCashProAdminCenter={open,close,openContent,openReviewers,openBroadcast,openChannel,openInvite,openContract,openManual};
})();
