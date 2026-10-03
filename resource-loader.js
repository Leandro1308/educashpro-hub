(function(){
  "use strict";

  const VERSION="20261002.9";
  const ASSET_TIMEOUT_MS=8000;
  const scripts=new Map();
  const styles=new Map();

  function withVersion(src){
    const separator=String(src).includes("?")?"&":"?";
    return `${src}${separator}v=${encodeURIComponent(VERSION)}`;
  }

  function script(src,{external=false}={}){
    const key=`script:${src}`;
    if(scripts.has(key)) return scripts.get(key);
    const promise=new Promise((resolve,reject)=>{
      const node=document.createElement("script");
      const timer=window.setTimeout(()=>{
        node.remove();
        reject(new Error(`asset_timeout:${src}`));
      },ASSET_TIMEOUT_MS);
      node.src=external?src:withVersion(src);
      node.async=true;
      node.defer=false;
      node.onload=()=>{window.clearTimeout(timer);resolve(node)};
      node.onerror=()=>{window.clearTimeout(timer);node.remove();reject(new Error(`asset_failed:${src}`))};
      document.head.appendChild(node);
    }).catch(error=>{scripts.delete(key);throw error});
    scripts.set(key,promise);
    return promise;
  }

  function style(href){
    const key=`style:${href}`;
    if(styles.has(key)) return styles.get(key);
    const promise=new Promise((resolve,reject)=>{
      const node=document.createElement("link");
      const timer=window.setTimeout(()=>{
        node.remove();
        reject(new Error(`style_timeout:${href}`));
      },ASSET_TIMEOUT_MS);
      node.rel="stylesheet";
      node.href=withVersion(href);
      node.onload=()=>{window.clearTimeout(timer);resolve(node)};
      node.onerror=()=>{window.clearTimeout(timer);node.remove();reject(new Error(`style_failed:${href}`))};
      document.head.appendChild(node);
    }).catch(error=>{styles.delete(key);throw error});
    styles.set(key,promise);
    return promise;
  }

  async function series(files){for(const file of files) await script(file)}
  async function parallelStyles(files){await Promise.all(files.map(style))}
  function currentSession(){return window.__EDUCASHPRO_SESSION__||window.EduCashProRuntime?.session||null}

  let gamesPromise=null,toolsHubPromise=null,accountCenterPromise=null,coursesPromise=null,financePromise=null,financialToolsPromise=null,linksPromise=null,professionalPromise=null,helpPromise=null,marketPromise=null,qrPromise=null,qrScannerPromise=null;

  function loadGames(){
    if(window.EduCashProMentalGames?.renderCatalog && window.EduCashProAdvancedGames?.launch && window.EduCashProLocalCatalogBridge?.ready) return Promise.resolve(true);
    if(gamesPromise) return gamesPromise;
    gamesPromise=(async()=>{
      // O catálogo é o núcleo. Nenhum complemento visual ou jogo extra pode impedir sua abertura.
      await Promise.allSettled([
        style("./game-polish-v3.css"),style("./game-experience-v4.css"),style("./extra-games-v5.css"),
        style("./extra-games-fix-v6.css"),style("./falling-blocks-v7.css"),style("./color-lines-v8.css"),
        style("./educash-empire-v12.css")
      ]);
      await series(["./mental-games.js","./game-suite.js"]);
      await series(["./local-arcade-core.js","./speed-race-game.js","./air-defense-game.js","./math-learning-game.js"]);
      await script("./local-games-bootstrap-v13.js");
      const optional=[
        "./game-local-storage-v8.js","./social-play.js","./game-polish-v3.js","./game-experience-v4.js",
        "./extra-games-v5.js","./extra-games-fix-v6.js","./falling-blocks-v7.js","./color-lines-v8.js",
        "./game-interaction-fix-v10.js","./educash-empire-v12.js"
      ];
      for(const file of optional){
        try{await script(file)}catch(error){console.warn("[EduCashPro] complemento de jogo ignorado:",file,error?.message||error)}
      }
      await script("./local-game-catalog-bridge.js");
      window.EduCashProLocalCatalogBridge?.ensure?.();
      await script("./game-usage-limit-v14.js");
      const value=currentSession();
      if(value){
        window.EduCashProMentalGames?.setSession?.(value);
        window.EduCashProGameSuite?.setSession?.(value);
      }
      return true;
    })().catch(error=>{gamesPromise=null;throw error});
    return gamesPromise;
  }


  function loadCourses(){return coursesPromise||(coursesPromise=script("./technical-analysis-course.js").catch(error=>{coursesPromise=null;throw error}))}
  function loadToolsHub(){
    if(window.EduCashProLocal?.renderToolsHub)return Promise.resolve(true);
    return toolsHubPromise||(toolsHubPromise=script("./local-tools-and-games.js").then(()=>true).catch(error=>{toolsHubPromise=null;throw error}));
  }
  function loadAccountCenter(){
    if(window.EduCashProAccountCenter)return Promise.resolve(true);
    return accountCenterPromise||(accountCenterPromise=(async()=>{
      await script("./account-center.js");
      try{await script("./account-center-extras.js")}catch(_){}
      return true;
    })().catch(error=>{accountCenterPromise=null;throw error}));
  }
  function loadFinance(){
    if(window.EduCashProFinance&&window.EduCashProFinanceShare)return Promise.resolve(true);
    return financePromise||(financePromise=(async()=>{
      await Promise.allSettled([style("./monthly-finance-control.css"),style("./tools-hub-v2.css")]);
      await script("./monthly-finance-sharing.js");
      await script("./monthly-finance-control.js");
      return true;
    })().catch(error=>{financePromise=null;throw error}));
  }
  function loadFinancialTools(){
    if(window.EduCashProFinancialTools)return Promise.resolve(true);
    return financialToolsPromise||(financialToolsPromise=(async()=>{
      await Promise.allSettled([style("./financial-tools-suite.css"),style("./tools-hub-v2.css")]);
      await script("./financial-tools-suite.js");
      return true;
    })().catch(error=>{financialToolsPromise=null;throw error}));
  }
  function loadLinks(){if(window.EduCashProLinks)return Promise.resolve(true);return linksPromise||(linksPromise=script("./link-tools.js").then(()=>{const value=currentSession();if(value)window.EduCashProLinks?.setSession?.(value);return true}).catch(error=>{linksPromise=null;throw error}))}
  function loadProfessional(){
    return professionalPromise||(professionalPromise=(async()=>{
      await loadLinks();
      await script("./professional-profile.js");
      const value=currentSession();
      if(value)window.EduCashProProfessional?.setSession?.(value);
      return true;
    })().catch(error=>{professionalPromise=null;throw error}));
  }
  function loadHelp(){if(window.EduCashProHelp)return Promise.resolve(true);return helpPromise||(helpPromise=script("./help-center.js").catch(error=>{helpPromise=null;throw error}))}
  function loadMarkets(){return marketPromise||(marketPromise=script("./market-learning-center.js").catch(error=>{marketPromise=null;throw error}))}
  function loadQr(){return qrPromise||(qrPromise=script("https://cdn.jsdelivr.net/npm/qrcodejs@1.0.0/qrcode.min.js",{external:true}).catch(error=>{qrPromise=null;throw error}))}
  function loadQrScanner(){return qrScannerPromise||(qrScannerPromise=script("https://cdn.jsdelivr.net/npm/html5-qrcode@2.3.8/html5-qrcode.min.js",{external:true}).catch(error=>{qrScannerPromise=null;throw error}))}

  function idle(callback,timeout=1600){
    if("requestIdleCallback" in window) return window.requestIdleCallback(()=>callback(),{timeout});
    return window.setTimeout(callback,Math.min(timeout,700));
  }

  window.EDUCASHPRO_ASSET_VERSION=VERSION;
  window.EduCashProResources={version:VERSION,script,style,loadGames,loadToolsHub,loadAccountCenter,loadCourses,loadFinance,loadFinancialTools,loadLinks,loadProfessional,loadHelp,loadMarkets,loadQr,loadQrScanner,idle};
})();
