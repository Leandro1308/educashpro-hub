(function () {
  "use strict";
  const SUPPORTED = new Set(["pt", "en", "es", "ru"]);
  function normalize(value) { const code=String(value||"").trim().toLowerCase().slice(0,2);return SUPPORTED.has(code)?code:""; }
  function storedSession(){try{return JSON.parse(localStorage.getItem("educashpro:web-session")||"null")}catch{return null}}
  function resolve(options={}){
    const query=new URL(location.href).searchParams;
    const session=options.session||window.__EDUCASHPRO_SESSION__||storedSession();
    const candidates=[options.language,session?.profile?.language,session?.account?.language,query.get("lang"),window.Telegram?.WebApp?.initDataUnsafe?.user?.language_code,navigator.language,"pt"];
    for(const candidate of candidates){const code=normalize(candidate);if(code)return code}
    return "pt";
  }
  function apply(language){const code=normalize(language)||resolve();document.documentElement.lang=code==="pt"?"pt-BR":code;document.documentElement.dataset.educashproLanguage=code;return code}
  window.EduCashProLocale={normalize,resolve,apply};apply(resolve());
})();
