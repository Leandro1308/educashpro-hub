(function () {
  "use strict";
  const SUPPORTED = new Set(["pt", "en", "es", "ru"]);
  function normalize(value) { const code=String(value||"").trim().toLowerCase().slice(0,2);return SUPPORTED.has(code)?code:""; }
  const KEY="educashpro:language";
  function preference(){try{return normalize(localStorage.getItem(KEY))}catch{return ""}}
  function storedSession(){try{return JSON.parse(localStorage.getItem("educashpro:web-session")||"null")}catch{return null}}
  function resolve(options={}){
    const query=new URL(location.href).searchParams;
    const session=options.session||window.__EDUCASHPRO_SESSION__||storedSession();
    const candidates=[preference(),options.language,session?.profile?.language,session?.account?.language,query.get("lang"),window.Telegram?.WebApp?.initDataUnsafe?.user?.language_code,navigator.language,"pt"];
    for(const candidate of candidates){const code=normalize(candidate);if(code)return code}
    return "pt";
  }
  function apply(language){const code=normalize(language)||resolve();document.documentElement.lang=code==="pt"?"pt-BR":code;document.documentElement.dataset.educashproLanguage=code;return code}
  function choose(language){
    const code=normalize(language);if(!code)return;
    try{localStorage.setItem(KEY,code);const saved=storedSession();if(saved?.profile){saved.profile.language=code;localStorage.setItem("educashpro:web-session",JSON.stringify(saved));}}catch{}
    if(window.__EDUCASHPRO_SESSION__?.profile)window.__EDUCASHPRO_SESSION__.profile.language=code;
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
  window.EduCashProLocale={normalize,resolve,apply,choose,open,preference};apply(resolve());
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',mount,{once:true});else mount();
})();

