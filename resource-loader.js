(function(){
  "use strict";

  const VERSION="20261008.7";
  const ASSET_TIMEOUT_MS=6000;
  const scripts=new Map();
  const styles=new Map();
  const prefetched=new Set();

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

  function prefetch(src,{external=false,as="script"}={}){
    const href=external?String(src):withVersion(src);
    const key=`${as}:${href}`;
    if(prefetched.has(key))return true;
    prefetched.add(key);
    const node=document.createElement("link");
    node.rel="prefetch";
    node.as=as;
    node.href=href;
    node.crossOrigin=external?"anonymous":"";
    document.head.appendChild(node);
    return true;
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

  let gamesPromise=null,gamesEnhancementPromise=null,toolsHubPromise=null,accountCenterPromise=null,coursesPromise=null,financePromise=null,financialToolsPromise=null,linksPromise=null,professionalPromise=null,helpPromise=null,marketPromise=null,qrPromise=null,qrScannerPromise=null;

  function loadGameEnhancements(){
    if(gamesEnhancementPromise)return gamesEnhancementPromise;
    gamesEnhancementPromise=(async()=>{
      await Promise.allSettled([
        style("./game-polish-v3.css"),style("./game-experience-v4.css"),style("./extra-games-v5.css"),
        style("./extra-games-fix-v6.css"),style("./falling-blocks-v7.css"),style("./color-lines-v8.css"),
        style("./educash-empire-v12.css")
      ]);
      await script("./local-arcade-core.js");
      await Promise.allSettled([
        script("./math-learning-game.js"),
        style("./book-quiz.css")
      ]);
      try{
        await script("./book-quiz-engine.js");
        await script("./book-quiz-business-21.js");
      }catch(error){console.warn("[EduCashPro] quiz de livro:",error?.message||error)}
      await script("./local-games-bootstrap-v13.js");
      try{await script("./game-local-storage-v8.js")}catch(_){}
      try{await script("./social-play.js")}catch(_){}
      for(const file of ["./game-polish-v3.js","./game-experience-v4.js","./extra-games-v5.js","./extra-games-fix-v6.js","./falling-blocks-v7.js","./color-lines-v8.js","./game-interaction-fix-v10.js","./educash-empire-v12.js"]){
        try{await script(file)}catch(error){console.warn("[EduCashPro] complemento de jogo ignorado:",file,error?.message||error)}
      }
      try{
        await script("./local-game-catalog-bridge.js");
        window.EduCashProLocalCatalogBridge?.ensure?.();
      }catch(_){}
      try{await script("./game-usage-limit-v14.js")}catch(_){}
      const value=currentSession();
      if(value){
        window.EduCashProMentalGames?.setSession?.(value);
        window.EduCashProGameSuite?.setSession?.(value);
      }
      return true;
    })().catch(error=>{gamesEnhancementPromise=null;console.warn("[EduCashPro] jogos complementares:",error?.message||error);return false});
    return gamesEnhancementPromise;
  }

  function loadGames(){
    if(window.EduCashProMentalGames?.renderCatalog){
      void loadGameEnhancements();
      return parallelStyles(["./local-games.css","./game-controls.css"]).then(()=>true);
    }
    if(gamesPromise) return gamesPromise;
    gamesPromise=(async()=>{
      // Mostra o catálogo principal primeiro. Jogos extras entram progressivamente.
      await parallelStyles(["./local-games.css","./game-controls.css"]);
      await series(["./mental-games.js","./game-suite.js"]);
      const value=currentSession();
      if(value){
        window.EduCashProMentalGames?.setSession?.(value);
        window.EduCashProGameSuite?.setSession?.(value);
      }
      void loadGameEnhancements();
      return true;
    })().catch(error=>{gamesPromise=null;throw error});
    return gamesPromise;
  }


  function loadCourses(){return coursesPromise||(coursesPromise=script("./technical-analysis-course.js").catch(error=>{coursesPromise=null;throw error}))}
  function loadToolsHub(){
    if(window.EduCashProLocal?.renderToolsHub)return Promise.resolve(true);
    return toolsHubPromise||(toolsHubPromise=script("./local-tools-and-games.js").then(()=>{
      const value=currentSession();
      if(value)window.EduCashProLocal?.setSession?.(value);
      return true;
    }).catch(error=>{toolsHubPromise=null;throw error}));
  }
  function loadAccountCenter(){
    if(window.EduCashProAccountCenter)return Promise.resolve(true);
    return accountCenterPromise||(accountCenterPromise=(async()=>{
      await script("./account-center.js");
      void script("./account-center-extras.js").catch(()=>{});
      return true;
    })().catch(error=>{accountCenterPromise=null;throw error}));
  }
  function loadFinance(){
    if(window.EduCashProFinance&&window.EduCashProFinanceShare)return Promise.resolve(true);
    return financePromise||(financePromise=(async()=>{
      await Promise.allSettled([style("./monthly-finance-control.css"),style("./tools-hub-v2.css")]);
      await script("./pdf-documents.js");
      await script("./monthly-finance-sharing.js");
      await script("./finance-model.js");
      await script("./monthly-finance-control.js");
      return true;
    })().catch(error=>{financePromise=null;throw error}));
  }
  function loadFinancialTools(){
    if(window.EduCashProFinancialTools)return Promise.resolve(true);
    return financialToolsPromise||(financialToolsPromise=(async()=>{
      await Promise.allSettled([style("./financial-tools-suite.css"),style("./tools-hub-v2.css"),style("./receivables.css"),style("./quotes.css")]);
      await script("./finance-model.js");
      await script("./receivables-model.js");
      await script("./pdf-documents.js");
      await script("./receivables.js");
      await script("./quotes-model.js");
      await script("./quotes.js");
      await script("./financial-tools-suite.js");
      return true;
    })().catch(error=>{financialToolsPromise=null;throw error}));
  }
  function loadLinks(){if(window.EduCashProLinks)return Promise.resolve(true);return linksPromise||(linksPromise=Promise.all([style("./link-campaigns.css"),script("./link-tools.js")]).then(()=>{const value=currentSession();if(value)window.EduCashProLinks?.setSession?.(value);return true}).catch(error=>{linksPromise=null;throw error}))}
  function loadProfessional(){
    if(window.EduCashProProfessional?.render)return Promise.resolve(true);
    return professionalPromise||(professionalPromise=(async()=>{
      await script("./professional-profile.js");
      const value=currentSession();
      if(value)window.EduCashProProfessional?.setSession?.(value);
      return true;
    })().catch(error=>{professionalPromise=null;throw error}));
  }
  function loadHelp(){if(window.EduCashProHelp)return Promise.resolve(true);return helpPromise||(helpPromise=script("./help-center.js").catch(error=>{helpPromise=null;throw error}))}
  function loadMarkets(){return marketPromise||(marketPromise=script("./market-learning-center.js?market=20261005.4").then(()=>{window.EduCashProAccess?.patchMarkets?.();return true}).catch(error=>{marketPromise=null;throw error}))}
  function loadQr(){return qrPromise||(qrPromise=script("https://cdn.jsdelivr.net/npm/qrcodejs@1.0.0/qrcode.min.js",{external:true}).catch(error=>{qrPromise=null;throw error}))}
  function loadQrScanner(){return qrScannerPromise||(qrScannerPromise=script("https://cdn.jsdelivr.net/npm/html5-qrcode@2.3.8/html5-qrcode.min.js",{external:true}).catch(error=>{qrScannerPromise=null;throw error}))}

  function idle(callback,timeout=1600){
    if("requestIdleCallback" in window) return window.requestIdleCallback(()=>callback(),{timeout});
    return window.setTimeout(callback,Math.min(timeout,700));
  }

  window.EDUCASHPRO_ASSET_VERSION=VERSION;
  window.EduCashProResources={version:VERSION,script,style,prefetch,loadGames,loadToolsHub,loadAccountCenter,loadCourses,loadFinance,loadFinancialTools,loadLinks,loadProfessional,loadHelp,loadMarkets,loadQr,loadQrScanner,idle};
})();

