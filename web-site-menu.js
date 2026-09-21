(function(){
  "use strict";
  const platform=window.EduCashProPlatform;
  if(!platform?.isWeb?.())return;

  const COPY={
    pt:{menu:"Menu",title:"Menu EduCashPro",subtitle:"Recursos organizados por funcionalidade",close:"Fechar",login:"Entre na sua conta para acessar esta função.",groups:[
      ["Principal",[["home","🏠","Início"],["presentation","✨","Conheça o EduCashPro"],["install","📲","Adicionar à tela inicial"]]],
      ["Aprendizado",[["learn","🎓","Academy"],["marketing","🤝","Marketing e Afiliados"],["finance","💰","Educação Financeira"],["telegram-course","✈️","Telegram Profissional"]]],
      ["Ferramentas",[["tools","🧰","Ferramentas"],["games","🎮","Jogos gratuitos"],["agenda","📅","Agenda Profissional"],["link-page","🔗","Página de links"],["smart-link","✂️","Link Inteligente"]]],
      ["Negócios e oportunidades",[["marketplace","🏪","Clube de Benefícios"],["benefits","🎁","Recursos gratuitos"],["explore","🔎","Explorar projetos"],["publish","🚀","Publicar projeto"],["projects","🗂️","Meus projetos"]]],
      ["Conta e assinatura",[["account","👤","Minha conta"],["subscription","💳","Assinatura"],["credential","✅","Minha credencial e QR Code"],["scan","📷","Escanear credencial"],["pair","📱","Conectar outro dispositivo"]]],
      ["Programa de afiliados",[["affiliate","🔗","Meu link de afiliado"],["network","📊","Minha rede"]]],
      ["Ajuda e preferências",[["support","🆘","Suporte"],["language","🌐","Idioma"],["preferences","🔔","Notificações"],["documents","📄","Sobre e Política de Uso"]]],
      ["Telegram",[["telegram-app","✈️","Abrir App no Telegram"],["channel","📢","Canal oficial"],["group","👥","Grupo oficial"]]]
    ]},
    en:{menu:"Menu",title:"EduCashPro Menu",subtitle:"Features organized by purpose",close:"Close",login:"Sign in to access this feature.",groups:[
      ["Main",[["home","🏠","Home"],["presentation","✨","Discover EduCashPro"],["install","📲","Add to Home Screen"]]],["Learning",[["learn","🎓","Academy"],["marketing","🤝","Marketing and Affiliates"],["finance","💰","Financial Education"],["telegram-course","✈️","Professional Telegram"]]],["Tools",[["tools","🧰","Tools"],["games","🎮","Free games"],["agenda","📅","Professional Schedule"],["link-page","🔗","Links page"],["smart-link","✂️","Smart Link"]]],["Business and opportunities",[["marketplace","🏪","Benefits Club"],["benefits","🎁","Free resources"],["explore","🔎","Explore projects"],["publish","🚀","Publish project"],["projects","🗂️","My projects"]]],["Account and subscription",[["account","👤","My account"],["subscription","💳","Subscription"],["credential","✅","My credential and QR Code"],["scan","📷","Scan credential"],["pair","📱","Connect another device"]]],["Affiliate program",[["affiliate","🔗","My affiliate link"],["network","📊","My network"]]],["Help and preferences",[["support","🆘","Support"],["language","🌐","Language"],["preferences","🔔","Notifications"],["documents","📄","About and Usage Policy"]]],["Telegram",[["telegram-app","✈️","Open App in Telegram"],["channel","📢","Official channel"],["group","👥","Official group"]]]
    ]},
    es:{menu:"Menú",title:"Menú EduCashPro",subtitle:"Funciones organizadas por finalidad",close:"Cerrar",login:"Inicia sesión para acceder a esta función.",groups:[
      ["Principal",[["home","🏠","Inicio"],["presentation","✨","Conoce EduCashPro"],["install","📲","Añadir a la pantalla de inicio"]]],["Aprendizaje",[["learn","🎓","Academy"],["marketing","🤝","Marketing y Afiliados"],["finance","💰","Educación Financiera"],["telegram-course","✈️","Telegram Profesional"]]],["Herramientas",[["tools","🧰","Herramientas"],["games","🎮","Juegos gratuitos"],["agenda","📅","Agenda Profesional"],["link-page","🔗","Página de enlaces"],["smart-link","✂️","Enlace Inteligente"]]],["Negocios y oportunidades",[["marketplace","🏪","Club de Beneficios"],["benefits","🎁","Recursos gratuitos"],["explore","🔎","Explorar proyectos"],["publish","🚀","Publicar proyecto"],["projects","🗂️","Mis proyectos"]]],["Cuenta y suscripción",[["account","👤","Mi cuenta"],["subscription","💳","Suscripción"],["credential","✅","Mi credencial y QR"],["scan","📷","Escanear credencial"],["pair","📱","Conectar otro dispositivo"]]],["Programa de afiliados",[["affiliate","🔗","Mi enlace de afiliado"],["network","📊","Mi red"]]],["Ayuda y preferencias",[["support","🆘","Soporte"],["language","🌐","Idioma"],["preferences","🔔","Notificaciones"],["documents","📄","Acerca de y Política de Uso"]]],["Telegram",[["telegram-app","✈️","Abrir App en Telegram"],["channel","📢","Canal oficial"],["group","👥","Grupo oficial"]]]
    ]},
    ru:{menu:"Меню",title:"Меню EduCashPro",subtitle:"Функции по разделам",close:"Закрыть",login:"Войдите в аккаунт, чтобы открыть эту функцию.",groups:[
      ["Главное",[["home","🏠","Главная"],["presentation","✨","О EduCashPro"],["install","📲","Добавить на главный экран"]]],["Обучение",[["learn","🎓","Academy"],["marketing","🤝","Маркетинг и партнёры"],["finance","💰","Финансовое образование"],["telegram-course","✈️","Профессиональный Telegram"]]],["Инструменты",[["tools","🧰","Инструменты"],["games","🎮","Бесплатные игры"],["agenda","📅","Профессиональный календарь"],["link-page","🔗","Страница ссылок"],["smart-link","✂️","Умная ссылка"]]],["Бизнес и возможности",[["marketplace","🏪","Клуб преимуществ"],["benefits","🎁","Бесплатные ресурсы"],["explore","🔎","Проекты"],["publish","🚀","Добавить проект"],["projects","🗂️","Мои проекты"]]],["Аккаунт и подписка",[["account","👤","Мой аккаунт"],["subscription","💳","Подписка"],["credential","✅","Моя карта и QR-код"],["scan","📷","Сканировать карту"],["pair","📱","Подключить устройство"]]],["Партнёрская программа",[["affiliate","🔗","Мой партнёрский линк"],["network","📊","Моя сеть"]]],["Помощь и настройки",[["support","🆘","Поддержка"],["language","🌐","Язык"],["preferences","🔔","Уведомления"],["documents","📄","О сервисе и правила"]]],["Telegram",[["telegram-app","✈️","Открыть приложение в Telegram"],["channel","📢","Официальный канал"],["group","👥","Официальная группа"]]]
    ]}
  };
  function lang(){const canonical=window.EduCashProLocale?.resolve?.({session:session()});if(canonical)return canonical;const raw=String(document.documentElement.lang||navigator.language||"pt").toLowerCase();return raw.startsWith("en")?"en":raw.startsWith("es")?"es":raw.startsWith("ru")?"ru":"pt"}
  function copy(){return COPY[lang()]||COPY.pt}
  function esc(value){return String(value??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]))}
  function session(){return window.__EDUCASHPRO_SESSION__||window.EduCashProWebEntry?.getSession?.()||platform.readWebSession?.()}
  function referral(){return String(session()?.profile?.referralCode||new URL(location.href).searchParams.get("ref")||"").trim()}
  function internal(path){const url=new URL(path,location.href),ref=referral();if(ref)url.searchParams.set("ref",ref);url.searchParams.set("lang",lang());return url.toString()}
  function telegramApp(){const url=new URL("https://t.me/EduCashProBot"),ref=referral();url.searchParams.set("startapp",ref?`ref_${ref}`:"site");return url.toString()}
  function close(){document.querySelector(".webSiteMenuLayer")?.remove();document.body.classList.remove("webSiteMenuOpen")}
  function needSession(){if(session()?.token)return true;close();window.EduCashProWebEntry?.open?.();return false}
  function styles(){if(document.getElementById("webSiteMenuStyles"))return;const style=document.createElement("style");style.id="webSiteMenuStyles";style.textContent=`
    html.educashproWeb .growthQuickActions{display:none!important}
    html.educashproWeb #marketplaceButton,html.educashproWeb #closeButton,html.educashproWeb .topbar>.educashCrossNav{display:none!important}
    html.educashproWeb .topbar .brandcopy{margin-right:auto}
    .webSiteMenuButton{display:inline-flex;align-items:center;justify-content:center;gap:7px;min-height:44px;padding:0 15px;border:1px solid rgba(48,230,166,.34);border-radius:13px;background:#10243a;color:#f7fbff;font-weight:900;cursor:pointer}
    html.educashproWeb #accountCenterButton{width:auto;min-width:44px;padding:0 10px;gap:7px;white-space:nowrap;font-size:13px}
    html.educashproWeb #accountCenterButton .accountHeaderAvatar{display:grid;place-items:center;width:30px;height:30px;flex:0 0 30px;overflow:hidden;border-radius:50%;background:#18304b;font-size:17px}
    html.educashproWeb #accountCenterButton .accountHeaderAvatar img{width:100%;height:100%;object-fit:cover}
    .webContextBack{display:inline-flex;align-items:center;gap:7px;margin:0 0 14px;padding:8px 2px;border:0;background:transparent;color:#30e6a6;font:inherit;font-weight:900;cursor:pointer}
    .webSiteMenuLayer{position:fixed;z-index:15000;inset:0;display:flex;justify-content:flex-end;background:rgba(1,7,15,.68);backdrop-filter:blur(7px)}
    .webSiteMenuSheet{width:min(92vw,470px);height:100%;box-sizing:border-box;overflow:auto;padding:22px;background:#0b192a;border-left:1px solid rgba(255,255,255,.1);box-shadow:-20px 0 60px rgba(0,0,0,.38);color:#f7fbff}
    .webSiteMenuHead{position:sticky;top:-22px;z-index:2;display:flex;justify-content:space-between;gap:12px;padding:22px 0 15px;background:#0b192a;border-bottom:1px solid rgba(255,255,255,.08)}
    .webSiteMenuHead h2{margin:0;font-size:24px}.webSiteMenuHead p{margin:5px 0 0;color:#9fb2c8;font-size:13px}.webSiteMenuClose{width:42px;height:42px;border:0;border-radius:13px;background:#12243b;color:#b8c8da;font-size:21px;cursor:pointer}
    .webSiteMenuGroup{padding:18px 0;border-bottom:1px solid rgba(255,255,255,.08)}.webSiteMenuGroup h3{margin:0 0 10px;color:#30e6a6;font-size:12px;text-transform:uppercase;letter-spacing:.08em}
    .webSiteMenuGrid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:8px}.webSiteMenuItem{display:flex;align-items:center;gap:10px;min-height:58px;padding:10px;border:1px solid rgba(255,255,255,.08);border-radius:14px;background:#11243a;color:#f7fbff;text-align:left;text-decoration:none;cursor:pointer;box-sizing:border-box}.webSiteMenuItem:hover{border-color:rgba(48,230,166,.38);transform:translateY(-1px)}.webSiteMenuItem span{font-size:22px}.webSiteMenuItem b{font-size:13px;line-height:1.25}
    body.webSiteMenuOpen{overflow:hidden}
    @media(max-width:560px){.webSiteMenuButton{padding:0 11px}.webSiteMenuSheet{width:100%;padding:16px}.webSiteMenuHead{top:-16px;padding-top:16px}.webSiteMenuGrid{grid-template-columns:1fr}html.educashproWeb #accountCenterButton{width:44px;padding:0 6px}html.educashproWeb #accountCenterButton .accountHeaderLabel{display:none}}
  `;document.head.appendChild(style)}
  function open(){
    styles();close();const c=copy(),groups=c.groups.map(([title,items])=>[title,items.filter(([action])=>action!=="install"||!window.EduCashProPWA?.isInstalled?.())]);
    if(session()?.permissions?.admin===true)groups.push([lang()==="en"?"Administration":lang()==="es"?"Administración":lang()==="ru"?"Администрирование":"Administração",[["admin","🛠️",lang()==="en"?"Admin panel":lang()==="es"?"Panel administrativo":lang()==="ru"?"Панель администратора":"Painel administrativo"]]]);
    const layer=document.createElement("div");layer.className="webSiteMenuLayer";layer.innerHTML=`<aside class="webSiteMenuSheet" role="dialog" aria-modal="true" aria-label="${esc(c.title)}"><header class="webSiteMenuHead"><div><h2>☰ ${esc(c.title)}</h2><p>${esc(c.subtitle)}</p></div><button class="webSiteMenuClose" aria-label="${esc(c.close)}">✕</button></header>${groups.map(([title,items])=>`<section class="webSiteMenuGroup"><h3>${esc(title)}</h3><div class="webSiteMenuGrid">${items.map(([action,icon,label])=>`<button class="webSiteMenuItem" type="button" data-menu-action="${esc(action)}"><span>${icon}</span><b>${esc(label)}</b></button>`).join("")}</div></section>`).join("")}</aside>`;document.body.appendChild(layer);document.body.classList.add("webSiteMenuOpen");layer.querySelector(".webSiteMenuClose").onclick=close;layer.onclick=e=>{if(e.target===layer)close()};layer.querySelectorAll("[data-menu-action]").forEach(button=>button.onclick=()=>run(button.dataset.menuAction));layer.querySelector(".webSiteMenuClose")?.focus()}
  async function run(action){
    const app=window.EduCashProApp,account=window.EduCashProAccountCenter;
    if(action==="home"){close();app?.renderPublicLanding?.();return}
    if(action==="presentation"){close();app?.renderPresentation?.(app.renderPublicLanding);return}
    if(action==="install"){close();return window.EduCashProPWA?.install?.()}
    if(action==="marketplace"){location.assign(internal("./marketplace.html"));return}
    if(action==="games"){close();await window.EduCashProResources?.loadGames?.();window.EduCashProMentalGames?.renderCatalog?.({public:true,lang:lang(),back:app?.renderPublicLanding});return}
    if(action==="tools"){close();app?.renderTools?.();return}
    if(action==="scan"){close();app?.scanMembershipQr?.();return}
    if(action==="telegram-app"){location.assign(telegramApp());return}
    if(action==="channel"){location.assign("https://t.me/+1mP5ad7vJH5lOGNh");return}
    if(action==="group"){location.assign("https://t.me/EduCashProBot");return}
    if(["learn","marketing","finance","telegram-course","explore","benefits","agenda","link-page","smart-link","publish","projects","account","subscription","credential","pair","affiliate","network","support","language","preferences","documents"].includes(action)&&!needSession())return;
    close();
    if(action==="learn")return app?.renderLearn?.();
    if(action==="marketing")return app?.openAcademyCategory?.("network_marketing");
    if(action==="finance")return app?.openAcademyCategory?.("financial_education");
    if(action==="telegram-course")return app?.openAcademyCategory?.("telegram");
    if(action==="explore")return app?.renderExplore?.();
    if(action==="benefits")return app?.renderBenefits?.();
    if(action==="agenda")return app?.openAgenda?.();
    if(action==="link-page")return window.EduCashProLinks?.renderPageEditor?.();
    if(action==="smart-link")return window.EduCashProLinks?.renderShortener?.();
    if(action==="publish")return location.assign(internal("./publish.html"));
    if(action==="projects")return app?.renderArea?.();
    if(action==="account")return account?.open?.();
    if(action==="admin")return account?.openAdmin?.();
    if(action==="subscription")return account?.openSubscription?.();
    if(action==="credential")return app?.renderMembershipProof?.();
    if(action==="pair")return account?.openDevicePairing?.();
    if(action==="affiliate")return location.assign(internal("./affiliate.html"));
    if(action==="network")return account?.openNetwork?.();
    if(action==="support")return location.assign(internal("./support.html"));
    if(action==="language")return account?.openLanguage?.();
    if(action==="preferences")return account?.openPreferences?.();
    if(action==="documents")return account?.openDocuments?.();
  }
  function labelAccount(){
    const button=document.getElementById("accountCenterButton");if(!button)return;
    const labels={pt:"Minha conta",en:"My account",es:"Mi cuenta",ru:"Мой аккаунт"},label=labels[lang()]||labels.pt;
    const imageUrl=String(session()?.profile?.profileImage?.url||"");
    const signature=`${imageUrl}|${label}`;if(button.dataset.accountLabelSignature===signature)return;
    button.dataset.accountLabelSignature=signature;
    button.innerHTML=`<span class="accountHeaderAvatar">${imageUrl?`<img src="${esc(imageUrl)}" alt="">`:"👤"}</span><span class="accountHeaderLabel">${esc(label)}</span>`;
    button.title=label;button.setAttribute("aria-label",label);
  }
  function install(){
    styles();const topbar=document.querySelector(".topbar");if(!topbar)return;
    if(!document.getElementById("webSiteMenuButton")){const button=document.createElement("button");button.id="webSiteMenuButton";button.className="webSiteMenuButton";button.type="button";button.innerHTML=`☰ <span>${esc(copy().menu)}</span>`;button.onclick=open;topbar.insertBefore(button,document.getElementById("marketplaceButton")||null)}
    labelAccount();
    const content=document.getElementById("content");
    if(content&&!content.querySelector(".publicWelcome,.splash")&&!content.querySelector(".webContextBack,[id$='Back'],.gameBack,#formBack,#qrBack,#proofBack,#profilePhotoBack")){
      const back=document.createElement("button");back.className="webContextBack";back.type="button";back.textContent=`← ${lang()==="en"?"Back":lang()==="es"?"Volver":lang()==="ru"?"Назад":"Voltar"}`;back.onclick=()=>window.EduCashProApp?.renderPublicLanding?.();content.prepend(back);
    }
  }
  const observer=new MutationObserver(install);observer.observe(document.documentElement,{childList:true,subtree:true});
  if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",install,{once:true});else install();
  window.addEventListener("educashpro:web-session-ready",install);
  window.addEventListener("educashpro:subscription-synced",labelAccount);
  window.addEventListener("educashpro:profile-photo-updated",labelAccount);
  window.EduCashProSiteMenu={open,close};
})();
