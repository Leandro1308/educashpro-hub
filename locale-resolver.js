(function () {
  "use strict";
  const SUPPORTED = new Set(["en", "pt", "es", "ru"]);
  const DEFAULT = "en";
  const KEY = "educashpro:language";

  function normalize(value) {
    const code = String(value || "").trim().toLowerCase().split(/[-_]/)[0];
    return SUPPORTED.has(code) ? code : "";
  }

  function preference() {
    try { return normalize(localStorage.getItem(KEY)); } catch { return ""; }
  }

  function storedSession() {
    try { return JSON.parse(localStorage.getItem("educashpro:web-session") || "null"); } catch { return null; }
  }

  function telegramLanguage(url) {
    const user = window.Telegram?.WebApp?.initDataUnsafe?.user;
    if (user?.language_code) return user.language_code;

    // Telegram launch data is available before the asynchronously loaded SDK.
    // Use it only for locale detection. Authentication still validates initData.
    const hash = new URLSearchParams(url.hash.slice(1));
    const launchData = hash.get("tgWebAppData") || url.searchParams.get("tgWebAppData");
    try {
      const rawUser = new URLSearchParams(launchData || "").get("user");
      return JSON.parse(rawUser || "null")?.language_code;
    } catch { return undefined; }
  }

  function resolve(options = {}) {
    const url = new URL(location.href);
    const session = options.session || window.__EDUCASHPRO_SESSION__ || storedSession();
    const preferred = preference() || normalize(options.language) ||
      normalize(session?.profile?.language) || normalize(session?.account?.language) ||
      normalize(url.searchParams.get("lang"));
    if (preferred) return preferred;

    const detected = telegramLanguage(url) || navigator.language || navigator.languages?.[0];
    return normalize(detected) || DEFAULT;
  }

  function apply(language) {
    const code = normalize(language) || resolve();
    document.documentElement.lang = code === "pt" ? "pt-BR" : code;
    document.documentElement.dataset.educashproLanguage = code;
    return code;
  }

  const STARTUP = {
    en: ["Education, business, and digital tools", "Close", "Growth and promotion", "Affiliate Program", "Getting things ready…", "Loading…", "Please wait a moment", "The app is available. Refresh if a feature is still syncing.", "Refresh"],
    pt: ["Educação, negócios e ferramentas digitais", "Fechar", "Crescimento e divulgação", "Programa de Afiliados", "Organizando sua experiência…", "Carregando…", "Aguarde um instante", "A página foi liberada. Tente novamente se algum recurso ainda estiver sincronizando.", "Atualizar"],
    es: ["Educación, negocios y herramientas digitales", "Cerrar", "Crecimiento y promoción", "Programa de Afiliados", "Preparando todo…", "Cargando…", "Espera un momento", "La aplicación está disponible. Actualiza si alguna función sigue sincronizándose.", "Actualizar"],
    ru: ["Образование, бизнес и цифровые инструменты", "Закрыть", "Рост и продвижение", "Партнёрская программа", "Подготовка приложения…", "Загрузка…", "Пожалуйста, подождите", "Приложение доступно. Обновите страницу, если синхронизация ещё продолжается.", "Обновить"]
  };

  function localizeStartup(root = document) {
    const copy = STARTUP[document.documentElement.dataset.educashproLanguage] || STARTUP.en;
    root?.querySelectorAll("[data-locale-startup]").forEach(element => {
      const value = copy[Number(element.dataset.localeStartup)];
      if (element.hasAttribute("aria-label")) element.setAttribute("aria-label", value);
      else element.textContent = value;
    });
  }

  function remember(language) {
    const code = normalize(language);
    if (!code) return "";
    try { localStorage.setItem(KEY, code); } catch {}
    return code;
  }

  function choose(language){
    const code=remember(language);if(!code)return;
    apply(code);
    window.EduCashProApp?.flushRememberedRoute?.();
    const url=new URL(location.href);url.searchParams.set("lang",code);location.replace(url.toString());
  }
  function open(){mount();setTimeout(()=>{document.getElementById("ecpLanguageMenu").hidden=false;document.getElementById("ecpLanguageToggle").setAttribute("aria-expanded","true");document.querySelector('#ecpLanguageMenu [data-language="'+resolve()+'"]')?.focus();},0);}

  function mount(){
    if(!document.body||document.getElementById("ecpLanguageControl"))return;
    const code=resolve(),labels={pt:"Alterar idioma",en:"Change language",es:"Cambiar idioma",ru:"Изменить язык"};
    const style=document.createElement("style");style.textContent=`body{padding-top:52px!important}#ecpLanguageControl{position:fixed;inset:0 0 auto;z-index:2147483000;height:52px;box-sizing:border-box;display:flex;justify-content:flex-end;align-items:center;padding:6px 16px;background:#081422;border-bottom:1px solid #263a4c;color:#f5f9ff;font:600 14px system-ui}#ecpLanguageControl button{font:inherit;color:inherit;cursor:pointer;min-height:38px;background:#14283b;border:1px solid #345067;border-radius:10px;padding:6px 14px}#ecpLanguageMenu{position:absolute;right:12px;top:48px;padding:8px;background:#0c1e30;border:1px solid #345067;border-radius:12px;box-shadow:0 8px 30px #0008;min-width:190px}#ecpLanguageMenu[hidden]{display:none!important}#ecpLanguageMenu button{display:block;width:100%;text-align:left;margin:4px 0}#ecpLanguageMenu button[aria-pressed=true]{border-color:#29dfb0;color:#29dfb0}`;
    document.head.append(style);
    const control=document.createElement("div");control.id="ecpLanguageControl";
    control.innerHTML='<button id="ecpLanguageToggle" aria-haspopup="true" aria-label="'+labels[code]+'" aria-expanded="false">🌐 '+code.toUpperCase()+'</button><div id="ecpLanguageMenu" hidden aria-label="'+labels[code]+'">'+Object.entries({pt:"Português",en:"English",es:"Español",ru:"Русский"}).map(([value,label])=>'<button data-language="'+value+'" aria-pressed="'+(value===code)+'">'+label+'</button>').join('')+'</div>';
    const header=document.querySelector('.topbar');
    if(header){header.insertBefore(control,document.getElementById('closeButton'));const inline=document.createElement('style');inline.textContent='body{padding-top:0!important}.topbar{position:sticky!important;top:0!important;z-index:2147483000!important}#ecpLanguageControl{position:relative;inset:auto;height:auto;padding:0;background:transparent;border:0;flex-shrink:0}#ecpLanguageControl button{padding:6px 9px;white-space:nowrap}#ecpLanguageMenu{top:44px;right:0}.topbar .brandcopy{min-width:0;flex:1}';document.head.append(inline);}else document.body.prepend(control);
    const toggle=control.querySelector('#ecpLanguageToggle'),menu=control.querySelector('#ecpLanguageMenu');
    toggle.onclick=()=>{menu.hidden=!menu.hidden;toggle.setAttribute('aria-expanded',String(!menu.hidden));};
    menu.querySelectorAll('[data-language]').forEach(button=>button.onclick=()=>choose(button.dataset.language));
    document.addEventListener('click',event=>{if(!control.contains(event.target)){menu.hidden=true;toggle.setAttribute('aria-expanded','false');}});
    document.addEventListener('keydown',event=>{if(event.key==='Escape'){menu.hidden=true;toggle.focus();}});
  }
  window.EduCashProLocale={normalize,resolve,apply,choose,open,preference,remember,localizeStartup};apply(resolve());
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',mount,{once:true});else mount();
})();

