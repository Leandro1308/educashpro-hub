(function(){
  "use strict";
  let deferredPrompt=null;

  const COPY={
    pt:{title:"Tenha o EduCashPro no seu celular",subtitle:"Acesse mais rápido, como um aplicativo, direto pela tela inicial.",install:"Adicionar à tela inicial",close:"Agora não",installed:"O EduCashPro já está na sua tela inicial.",iosTitle:"Adicionar no iPhone ou iPad",iosBody:"No navegador, toque em Compartilhar e escolha “Adicionar à Tela de Início”. Depois confirme em “Adicionar”.",iosHint:"Se essa opção não aparecer, abra o EduCashPro no Safari e repita o processo.",manualTitle:"Adicionar o EduCashPro",manualBody:"Abra o menu do navegador e escolha “Instalar app” ou “Adicionar à tela inicial”.",success:"EduCashPro instalado com sucesso."},
    en:{title:"Keep EduCashPro on your phone",subtitle:"Open it faster, like an app, directly from your Home Screen.",install:"Add to Home Screen",close:"Not now",installed:"EduCashPro is already on your Home Screen.",iosTitle:"Add on iPhone or iPad",iosBody:"In your browser, tap Share and choose “Add to Home Screen”. Then confirm by tapping “Add”.",iosHint:"If you do not see that option, open EduCashPro in Safari and try again.",manualTitle:"Add EduCashPro",manualBody:"Open your browser menu and choose “Install app” or “Add to Home Screen”.",success:"EduCashPro installed successfully."},
    es:{title:"Ten EduCashPro en tu celular",subtitle:"Accede más rápido, como una app, directamente desde la pantalla de inicio.",install:"Añadir a la pantalla de inicio",close:"Ahora no",installed:"EduCashPro ya está en tu pantalla de inicio.",iosTitle:"Añadir en iPhone o iPad",iosBody:"En el navegador, toca Compartir y elige “Añadir a pantalla de inicio”. Después confirma en “Añadir”.",iosHint:"Si no aparece esa opción, abre EduCashPro en Safari e inténtalo de nuevo.",manualTitle:"Añadir EduCashPro",manualBody:"Abre el menú del navegador y elige “Instalar app” o “Añadir a la pantalla de inicio”.",success:"EduCashPro se instaló correctamente."},
    ru:{title:"Добавьте EduCashPro на телефон",subtitle:"Открывайте сервис быстрее — как приложение с главного экрана.",install:"Добавить на главный экран",close:"Не сейчас",installed:"EduCashPro уже добавлен на главный экран.",iosTitle:"Добавить на iPhone или iPad",iosBody:"В браузере нажмите «Поделиться» и выберите «На экран Домой», затем подтвердите добавление.",iosHint:"Если пункта нет, откройте EduCashPro в Safari и повторите.",manualTitle:"Добавить EduCashPro",manualBody:"Откройте меню браузера и выберите «Установить приложение» или «Добавить на главный экран».",success:"EduCashPro успешно установлен."}
  };

  function lang(){
    const canonical=window.EduCashProLocale?.resolve?.();
    if(canonical&&COPY[canonical])return canonical;
    const raw=String(document.documentElement.lang||navigator.language||"pt").toLowerCase();
    return raw.startsWith("en")?"en":raw.startsWith("es")?"es":raw.startsWith("ru")?"ru":"pt";
  }
  function copy(){return COPY[lang()]||COPY.pt}
  function isInstalled(){
    return window.matchMedia?.("(display-mode: standalone)")?.matches===true||
      window.navigator.standalone===true||
      document.referrer.startsWith("android-app://");
  }
  function isIOS(){
    return /iphone|ipad|ipod/i.test(navigator.userAgent)||
      (navigator.platform==="MacIntel"&&navigator.maxTouchPoints>1);
  }
  function toast(message){
    const el=document.getElementById("toast");
    if(el){
      el.textContent=message;
      el.classList.add("show");
      window.setTimeout(()=>el.classList.remove("show"),3200);
      return;
    }
    alert(message);
  }
  function ensureStyles(){
    if(document.getElementById("educashPwaStyles"))return;
    const style=document.createElement("style");
    style.id="educashPwaStyles";
    style.textContent=`
      .educashPwaLayer{position:fixed;z-index:17000;inset:0;display:grid;place-items:end center;padding:18px;box-sizing:border-box;background:rgba(1,7,15,.72);backdrop-filter:blur(7px)}
      .educashPwaCard{position:relative;width:min(100%,460px);box-sizing:border-box;padding:22px;border:1px solid rgba(48,230,166,.28);border-radius:24px;background:#0b192a;color:#f7fbff;box-shadow:0 24px 80px rgba(0,0,0,.48)}
      .educashPwaTop{display:flex;align-items:center;gap:14px;padding-right:36px}.educashPwaIcon{width:68px;height:68px;border-radius:18px;object-fit:cover;box-shadow:0 8px 28px rgba(48,230,166,.18)}
      .educashPwaCard h2{margin:0;font-size:21px;line-height:1.15}.educashPwaCard p{margin:12px 0 0;color:#b8c8da;line-height:1.5;font-size:14px}.educashPwaHint{font-size:12px!important;color:#8fa5bd!important}
      .educashPwaX{position:absolute;right:14px;top:14px;width:38px;height:38px;border:0;border-radius:12px;background:#12243b;color:#c7d5e5;font-size:19px;cursor:pointer}
      .educashPwaActions{display:grid;gap:9px;margin-top:18px}.educashPwaPrimary,.educashPwaSecondary{min-height:48px;border-radius:14px;font:inherit;font-weight:900;cursor:pointer}
      .educashPwaPrimary{border:0;background:linear-gradient(135deg,#30e6a6,#8fffd7);color:#05131a}.educashPwaSecondary{border:1px solid rgba(255,255,255,.1);background:#11243a;color:#f7fbff}
      @media(min-width:650px){.educashPwaLayer{place-items:center}}
    `;
    document.head.appendChild(style);
  }
  function modal({title,body,hint,primary=false}){
    ensureStyles();
    document.querySelector(".educashPwaLayer")?.remove();
    const c=copy();
    const layer=document.createElement("div");
    layer.className="educashPwaLayer";
    layer.innerHTML=`<section class="educashPwaCard" role="dialog" aria-modal="true" aria-labelledby="educashPwaTitle">
      <button class="educashPwaX" type="button" aria-label="${c.close}">✕</button>
      <div class="educashPwaTop"><img class="educashPwaIcon" src="./assets/icons/educashpro-192.png" alt=""><h2 id="educashPwaTitle">${title}</h2></div>
      <p>${body}</p>
      ${hint?`<p class="educashPwaHint">${hint}</p>`:""}
      <div class="educashPwaActions">
        ${primary?`<button class="educashPwaPrimary" type="button" data-pwa-primary>${c.install}</button>`:""}
        <button class="educashPwaSecondary" type="button" data-pwa-close>${c.close}</button>
      </div>
    </section>`;
    document.body.appendChild(layer);
    const close=()=>layer.remove();
    layer.querySelector(".educashPwaX").onclick=close;
    layer.querySelector("[data-pwa-close]").onclick=close;
    layer.onclick=e=>{if(e.target===layer)close()};
    if(primary)layer.querySelector("[data-pwa-primary]").onclick=async()=>{close();await promptInstall()};
  }
  async function promptInstall(){
    const c=copy();
    if(isInstalled()){toast(c.installed);return}
    if(deferredPrompt){
      const prompt=deferredPrompt;
      deferredPrompt=null;
      prompt.prompt();
      try{await prompt.userChoice}catch(_){}
      return;
    }
    if(isIOS()){modal({title:c.iosTitle,body:c.iosBody,hint:c.iosHint});return}
    modal({title:c.manualTitle,body:c.manualBody});
  }
  async function install(){
    const c=copy();
    if(isInstalled()){toast(c.installed);return}
    if(deferredPrompt){await promptInstall();return}
    if(isIOS()){modal({title:c.iosTitle,body:c.iosBody,hint:c.iosHint});return}
    modal({title:c.title,body:c.subtitle,primary:true});
  }

  window.addEventListener("beforeinstallprompt",event=>{
    event.preventDefault();
    deferredPrompt=event;
    window.dispatchEvent(new CustomEvent("educashpro:pwa-install-ready"));
  });
  window.addEventListener("appinstalled",()=>{
    deferredPrompt=null;
    document.querySelector(".educashPwaLayer")?.remove();
    toast(copy().success);
    window.dispatchEvent(new CustomEvent("educashpro:pwa-installed"));
  });
  if("serviceWorker" in navigator&&location.protocol==="https:"){
    window.addEventListener("load",()=>navigator.serviceWorker.register("./sw.js",{scope:"./"}).catch(error=>console.warn("[EduCashPro] Service Worker:",error)),{once:true});
  }
  window.EduCashProPWA={install,isInstalled,canPrompt:()=>Boolean(deferredPrompt)};
})();
