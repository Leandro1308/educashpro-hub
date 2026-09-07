(function () {
  "use strict";

  const API_BASE = "https://educashpro-all.onrender.com";
  let session = null;
  const COPY = {
    pt:{back:"Voltar",eyebrow:"NEGÓCIO DIGITAL",title:"Perfil Profissional",lead:"Sua página, serviços, agenda e cartão digital organizados em um só lugar.",loading:"Organizando seu perfil…",error:"Não foi possível carregar seu perfil.",setup:"Progresso da configuração",page:"Página profissional",pageReady:"Página publicada",pageMissing:"Crie sua página e reúna seus contatos",agenda:"Agenda e serviços",agendaReady:"Agenda configurada",agendaMissing:"Configure serviços e horários",photo:"Foto profissional",links:"Links de contato",services:"Serviços",appointments:"Compromissos",editPage:"Editar página",openAgenda:"Gerenciar agenda",preview:"Ver cartão digital",card:"Cartão digital",share:"Compartilhar",qr:"QR Code",contact:"Salvar contato",calendar:"Exportar agenda",noCalendar:"Não há compromissos para exportar.",exported:"Arquivo de calendário criado.",theme:"Aparência do cartão",green:"Verde",blue:"Azul",purple:"Roxo",next:"Próximo passo recomendado",nextPage:"Publique sua página profissional.",nextAgenda:"Cadastre seus serviços e ative a agenda.",nextShare:"Seu perfil está pronto. Compartilhe o cartão digital.",freeNote:"O Perfil Profissional completo faz parte da assinatura ativa.",publicPage:"Abrir página pública",notSet:"Ainda não configurado"},
    en:{back:"Back",eyebrow:"DIGITAL BUSINESS",title:"Professional Profile",lead:"Your page, services, schedule and digital card in one place.",loading:"Organizing your profile…",error:"Unable to load your profile.",setup:"Setup progress",page:"Professional page",pageReady:"Page published",pageMissing:"Create your page and gather your contacts",agenda:"Schedule and services",agendaReady:"Schedule configured",agendaMissing:"Set up services and availability",photo:"Professional photo",links:"Contact links",services:"Services",appointments:"Appointments",editPage:"Edit page",openAgenda:"Manage schedule",preview:"View digital card",card:"Digital card",share:"Share",qr:"QR Code",contact:"Save contact",calendar:"Export schedule",noCalendar:"There are no appointments to export.",exported:"Calendar file created.",theme:"Card appearance",green:"Green",blue:"Blue",purple:"Purple",next:"Recommended next step",nextPage:"Publish your professional page.",nextAgenda:"Add services and activate your schedule.",nextShare:"Your profile is ready. Share your digital card.",freeNote:"The complete Professional Profile is included with an active subscription.",publicPage:"Open public page",notSet:"Not configured yet"},
    es:{back:"Volver",eyebrow:"NEGOCIO DIGITAL",title:"Perfil Profesional",lead:"Tu página, servicios, agenda y tarjeta digital en un solo lugar.",loading:"Organizando tu perfil…",error:"No fue posible cargar tu perfil.",setup:"Progreso de configuración",page:"Página profesional",pageReady:"Página publicada",pageMissing:"Crea tu página y reúne tus contactos",agenda:"Agenda y servicios",agendaReady:"Agenda configurada",agendaMissing:"Configura servicios y horarios",photo:"Foto profesional",links:"Enlaces de contacto",services:"Servicios",appointments:"Citas",editPage:"Editar página",openAgenda:"Administrar agenda",preview:"Ver tarjeta digital",card:"Tarjeta digital",share:"Compartir",qr:"Código QR",contact:"Guardar contacto",calendar:"Exportar agenda",noCalendar:"No hay citas para exportar.",exported:"Archivo de calendario creado.",theme:"Apariencia de la tarjeta",green:"Verde",blue:"Azul",purple:"Morado",next:"Siguiente paso recomendado",nextPage:"Publica tu página profesional.",nextAgenda:"Registra servicios y activa la agenda.",nextShare:"Tu perfil está listo. Comparte tu tarjeta digital.",freeNote:"El Perfil Profesional completo forma parte de la suscripción activa.",publicPage:"Abrir página pública",notSet:"Aún no configurado"},
    ru:{back:"Назад",eyebrow:"ЦИФРОВОЙ БИЗНЕС",title:"Профессиональный профиль",lead:"Страница, услуги, запись и цифровая визитка в одном месте.",loading:"Подготовка профиля…",error:"Не удалось загрузить профиль.",setup:"Готовность профиля",page:"Профессиональная страница",pageReady:"Страница опубликована",pageMissing:"Создайте страницу с контактами",agenda:"Запись и услуги",agendaReady:"Запись настроена",agendaMissing:"Добавьте услуги и расписание",photo:"Фото",links:"Контактные ссылки",services:"Услуги",appointments:"Записи",editPage:"Изменить страницу",openAgenda:"Управлять записью",preview:"Открыть визитку",card:"Цифровая визитка",share:"Поделиться",qr:"QR-код",contact:"Сохранить контакт",calendar:"Экспорт календаря",noCalendar:"Нет записей для экспорта.",exported:"Файл календаря создан.",theme:"Оформление визитки",green:"Зелёный",blue:"Синий",purple:"Фиолетовый",next:"Рекомендуемый шаг",nextPage:"Опубликуйте профессиональную страницу.",nextAgenda:"Добавьте услуги и включите запись.",nextShare:"Профиль готов. Поделитесь визиткой.",freeNote:"Полный профиль доступен при активной подписке.",publicPage:"Открыть публичную страницу",notSet:"Не настроено"}
  };
  const esc = value => String(value ?? "").replace(/[&<>"']/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
  const lang = () => ["pt","en","es","ru"].includes(session?.profile?.language) ? session.profile.language : "pt";
  const t = key => COPY[lang()][key] || COPY.pt[key] || key;
  const content = () => document.getElementById("content");

  function injectStyles() {
    if (document.getElementById("professionalProfileStyles")) return;
    const style = document.createElement("style");
    style.id = "professionalProfileStyles";
    style.textContent = `
      .professionalProgress{height:10px;background:#15263a;border-radius:99px;overflow:hidden;margin:12px 0}.professionalProgress span{display:block;height:100%;background:linear-gradient(90deg,#30e6a6,#73f5ca);border-radius:inherit}
      .professionalStats{display:grid;grid-template-columns:repeat(3,1fr);gap:9px;margin:14px 0}.professionalStat{padding:14px 8px;border:1px solid rgba(255,255,255,.09);border-radius:16px;text-align:center;background:rgba(255,255,255,.035)}.professionalStat strong{display:block;font-size:24px}.professionalStat small{color:#9db0c6}
      .professionalChecklist{display:grid;gap:9px}.professionalCheck{display:flex;align-items:center;gap:11px;padding:12px;border-radius:15px;background:rgba(255,255,255,.04)}.professionalCheck>span{font-size:22px}.professionalCheck strong,.professionalCheck small{display:block}.professionalCheck small{color:#9db0c6;margin-top:3px}
      .digitalCard{--accent:#30e6a6;position:relative;overflow:hidden;border:1px solid color-mix(in srgb,var(--accent) 45%,transparent);background:linear-gradient(145deg,#0d1e31,#07111f);border-radius:24px;padding:24px;text-align:center}.digitalCard.blue{--accent:#54a8ff}.digitalCard.purple{--accent:#b58cff}.digitalAvatar{width:88px;height:88px;margin:auto;border-radius:50%;object-fit:cover;border:3px solid var(--accent);display:grid;place-items:center;background:#15263a;font-size:34px}.digitalCard h2{margin:13px 0 5px}.digitalCard p{color:#b7c7d8}.digitalServices{display:flex;gap:7px;flex-wrap:wrap;justify-content:center;margin:14px 0}.digitalServices span{font-size:12px;padding:7px 10px;border-radius:99px;background:rgba(255,255,255,.08)}.profileActions{display:grid;grid-template-columns:1fr 1fr;gap:9px}.profileActions .wideButton{grid-column:1/-1}.themePicker{display:flex;gap:8px}.themePicker button{flex:1}.themePicker button.active{outline:2px solid #30e6a6}.professionalNext{border-left:4px solid #30e6a6}
    `;
    document.head.appendChild(style);
  }

  async function api(path, body = {}) {
    if (!session?.token) throw new Error("session");
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 12000);
    try {
      const response = await fetch(API_BASE + path, {method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({token:session.token,...body}),cache:"no-store",signal:controller.signal});
      const data = await response.json().catch(() => ({}));
      if (!response.ok || data.ok === false) throw new Error(data.reason || "request");
      return data;
    } finally { clearTimeout(timer); }
  }

  function pageUrl(page) { return page?.slug ? `https://go.educashpro.vip/?page=${encodeURIComponent(page.slug)}` : ""; }
  function agendaUrl(agenda) { return agenda?.publicId && session?.botUrl ? `${session.botUrl}?startapp=agenda_${agenda.publicId}` : ""; }
  function download(name, type, value) { const a=document.createElement("a");a.href=URL.createObjectURL(new Blob([value],{type}));a.download=name;a.click();setTimeout(()=>URL.revokeObjectURL(a.href),1000); }
  function toast(message){const node=document.getElementById("toast");if(!node)return;node.textContent=message;node.classList.add("show");setTimeout(()=>node.classList.remove("show"),2200)}
  function openUrl(url){const tg=window.Telegram?.WebApp;if(/^https:\/\/t\.me\//i.test(url)&&tg?.openTelegramLink)tg.openTelegramLink(url);else if(tg?.openLink)tg.openLink(url);else window.open(url,"_blank","noopener")}

  function exportVcard(page, agenda) {
    const name=page?.name || agenda?.displayName || session?.profile?.firstName || "EduCashPro";
    const telegram=agenda?.telegramContact || "";
    const note=page?.bio || agenda?.description || "";
    download(`${name.replace(/[^a-z0-9]+/gi,"-")}.vcf`,"text/vcard;charset=utf-8",["BEGIN:VCARD","VERSION:3.0",`FN:${name}`,telegram?`URL:${telegram}`:"",pageUrl(page)?`URL:${pageUrl(page)}`:"",`NOTE:${note.replace(/\n/g," ")}`,"END:VCARD"].filter(Boolean).join("\r\n"));
  }
  function icsDate(value){return new Date(value).toISOString().replace(/[-:]/g,"").replace(/\.\d{3}Z$/,"Z")}
  function exportCalendar(items) {
    if(!items.length)return toast(t("noCalendar"));
    const events=items.filter(x=>x.startsAt&&x.status!=="cancelled").map(x=>["BEGIN:VEVENT",`UID:${x.id}@educashpro.vip`,`DTSTAMP:${icsDate(Date.now())}`,`DTSTART:${icsDate(x.startsAt)}`,`SUMMARY:${String(x.serviceName||t("appointments")).replace(/[\n,;]/g," ")} - ${String(x.clientName||"").replace(/[\n,;]/g," ")}`,"END:VEVENT"].join("\r\n"));
    download("agenda-educashpro.ics","text/calendar;charset=utf-8",["BEGIN:VCALENDAR","VERSION:2.0","PRODID:-//EduCashPro//Agenda//PT",...events,"END:VCALENDAR"].join("\r\n"));toast(t("exported"));
  }
  function showQr(url,title){
    content().innerHTML=`<button id="proQrBack" class="textButton">← ${esc(t("back"))}</button><section class="profileCard qrCard"><h2>${esc(title)}</h2><div id="proQrHost" class="qrCanvas"></div><p>${esc(url)}</p></section>`;
    document.getElementById("proQrBack").onclick=render;
    const host=document.getElementById("proQrHost");if(window.QRCode)new QRCode(host,{text:url,width:240,height:240,colorDark:"#07111f",colorLight:"#fff"});else host.textContent=url;
  }
  async function share(url,title){if(navigator.share)try{return await navigator.share({title,url})}catch{};try{await navigator.clipboard.writeText(url);toast(t("share"))}catch{openUrl(url)}}

  function renderCard(page, data) {
    const agenda=data?.access?.agenda || null, services=data?.services || [], appointments=data?.appointments || [];
    const name=page?.name || agenda?.displayName || session?.profile?.firstName || "EduCashPro";
    const bio=page?.bio || agenda?.description || t("notSet");
    const url=pageUrl(page) || agendaUrl(agenda);
    const theme=localStorage.getItem("ecp:professional-theme") || "green";
    content().innerHTML=`<button id="cardBack" class="textButton">← ${esc(t("back"))}</button><section class="digitalCard ${esc(theme)}"><div class="digitalAvatar">${page?.profileImage?.url?`<img class="digitalAvatar" src="${esc(page.profileImage.url)}" alt="">`:"💼"}</div><h2>${esc(name)}</h2><p>${esc(bio)}</p><div class="digitalServices">${services.slice(0,6).map(s=>`<span>${esc(s.name)}</span>`).join("")}</div><div class="profileActions">${url?`<button id="shareCard" class="wideButton">↗ ${esc(t("share"))}</button><button id="qrCard" class="secondaryButton">▦ ${esc(t("qr"))}</button>`:""}<button id="saveContact" class="secondaryButton">👤 ${esc(t("contact"))}</button><button id="exportCalendar" class="secondaryButton">📅 ${esc(t("calendar"))}</button></div></section><section class="profileCard"><h3>${esc(t("theme"))}</h3><div class="themePicker">${["green","blue","purple"].map(x=>`<button class="secondaryButton ${theme===x?"active":""}" data-theme="${x}">${esc(t(x))}</button>`).join("")}</div></section>`;
    document.getElementById("cardBack").onclick=render;document.getElementById("shareCard")?.addEventListener("click",()=>share(url,name));document.getElementById("qrCard")?.addEventListener("click",()=>showQr(url,name));document.getElementById("saveContact").onclick=()=>exportVcard(page,agenda);document.getElementById("exportCalendar").onclick=()=>exportCalendar(appointments);
    document.querySelectorAll("[data-theme]").forEach(button=>button.onclick=()=>{localStorage.setItem("ecp:professional-theme",button.dataset.theme);renderCard(page,data)});
  }

  async function render() {
    injectStyles();
    document.getElementById("bottomNav")?.classList.add("hidden");
    content().innerHTML=`<section class="splash"><div class="splashLogo">💼</div><p>${esc(t("loading"))}</p><div class="loader"><span></span></div></section>`;
    try {
      const [pageResult, agendaResult]=await Promise.all([api("/api/hub/link-page").catch(()=>({page:null})),api("/api/agenda/bootstrap",{appointmentOffset:0,appointmentLimit:100}).catch(()=>({access:null,services:[],appointments:[]}))]);
      const page=pageResult.page || null, agenda=agendaResult.access?.agenda || null, services=agendaResult.services || [], appointments=agendaResult.appointments || [];
      const checks=[!!page,!!page?.profileImage,(page?.links||[]).length>0,!!agenda,services.length>0], done=checks.filter(Boolean).length, percent=Math.round(done/checks.length*100);
      const next=!page?t("nextPage"):!agenda||!services.length?t("nextAgenda"):t("nextShare");
      content().innerHTML=`<button id="professionalBack" class="textButton">← ${esc(t("back"))}</button><section class="hero"><span class="eyebrow">${esc(t("eyebrow"))}</span><h1>💼 ${esc(t("title"))}</h1><p>${esc(t("lead"))}</p></section><section class="profileCard"><div class="sectionHead"><div><h2>${esc(t("setup"))}</h2></div><strong>${percent}%</strong></div><div class="professionalProgress"><span style="width:${percent}%"></span></div><div class="professionalChecklist"><div class="professionalCheck"><span>${page?"✅":"○"}</span><div><strong>${esc(t("page"))}</strong><small>${esc(page?t("pageReady"):t("pageMissing"))}</small></div></div><div class="professionalCheck"><span>${agenda&&services.length?"✅":"○"}</span><div><strong>${esc(t("agenda"))}</strong><small>${esc(agenda&&services.length?t("agendaReady"):t("agendaMissing"))}</small></div></div></div></section><section class="professionalStats"><div class="professionalStat"><strong>${(page?.links||[]).length}</strong><small>${esc(t("links"))}</small></div><div class="professionalStat"><strong>${services.length}</strong><small>${esc(t("services"))}</small></div><div class="professionalStat"><strong>${agendaResult.appointmentTotal||appointments.length}</strong><small>${esc(t("appointments"))}</small></div></section><section class="notice professionalNext"><b>${esc(t("next"))}</b><br>${esc(next)}</section><section class="profileActions"><button id="editProfessionalPage" class="wideButton">🌐 ${esc(t("editPage"))}</button><button id="manageProfessionalAgenda" class="secondaryButton">📅 ${esc(t("openAgenda"))}</button><button id="previewProfessional" class="secondaryButton">💳 ${esc(t("preview"))}</button>${pageUrl(page)?`<button id="openPublicProfessional" class="secondaryButton">↗ ${esc(t("publicPage"))}</button>`:""}</section>`;
      document.getElementById("professionalBack").onclick=()=>{document.getElementById("bottomNav")?.classList.remove("hidden");window.EduCashProApp?.renderHome?.()};document.getElementById("editProfessionalPage").onclick=()=>window.EduCashProLinks?.renderPageEditor?.();document.getElementById("manageProfessionalAgenda").onclick=()=>window.EduCashProApp?.openAgenda?.();document.getElementById("previewProfessional").onclick=()=>renderCard(page,agendaResult);document.getElementById("openPublicProfessional")?.addEventListener("click",()=>openUrl(pageUrl(page)));
    } catch { content().innerHTML=`<button id="professionalBack" class="textButton">← ${esc(t("back"))}</button><div class="empty error">${esc(t("error"))}</div>`;document.getElementById("professionalBack").onclick=()=>window.EduCashProApp?.renderHome?.(); }
  }

  function maybeOnboard(){
    const key=`ecp:onboarding:${session?.profile?.tgId||"guest"}:v1`;
    if(!session||localStorage.getItem(key))return;
    const choices={
      pt:[["🌐","Divulgar meus links","page"],["📅","Organizar atendimentos","agenda"],["🎓","Aprender","learn"],["🎁","Encontrar benefícios","benefits"],["💼","Divulgar meu negócio","professional"]],
      en:[["🌐","Share my links","page"],["📅","Organize appointments","agenda"],["🎓","Learn","learn"],["🎁","Find benefits","benefits"],["💼","Promote my business","professional"]],
      es:[["🌐","Divulgar mis enlaces","page"],["📅","Organizar citas","agenda"],["🎓","Aprender","learn"],["🎁","Encontrar beneficios","benefits"],["💼","Divulgar mi negocio","professional"]],
      ru:[["🌐","Поделиться ссылками","page"],["📅","Организовать запись","agenda"],["🎓","Учиться","learn"],["🎁","Найти преимущества","benefits"],["💼","Продвигать бизнес","professional"]]
    };
    const headings={pt:["O que você deseja fazer primeiro?","Escolha um objetivo. Você poderá acessar os outros recursos depois."],en:["What would you like to do first?","Choose a goal. All other resources remain available."],es:["¿Qué deseas hacer primero?","Elige un objetivo. Los demás recursos seguirán disponibles."],ru:["Что вы хотите сделать сначала?","Выберите цель. Остальные функции останутся доступны."]}[lang()];
    const node=document.createElement("div");node.className="ecpModal professionalOnboarding";node.innerHTML=`<section class="ecpModalCard"><div class="ecpModalIcon">✨</div><h2>${esc(headings[0])}</h2><p>${esc(headings[1])}</p><div class="professionalChecklist">${choices[lang()].map(x=>`<button class="professionalCheck secondaryButton" data-goal="${x[2]}"><span>${x[0]}</span><strong>${esc(x[1])}</strong></button>`).join("")}</div></section>`;document.body.appendChild(node);
    node.querySelectorAll("[data-goal]").forEach(button=>button.onclick=()=>{localStorage.setItem(key,button.dataset.goal);node.remove();const goal=button.dataset.goal;if(goal==="page")window.EduCashProLinks?.renderPageEditor?.();else if(goal==="agenda")window.EduCashProApp?.openAgenda?.();else if(goal==="professional")render();else document.querySelector(`#bottomNav [data-view="${goal}"]`)?.click()});
  }

  window.EduCashProProfessional={setSession(value){session=value},render,maybeOnboard};
})();
