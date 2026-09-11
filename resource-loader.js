(function(){
  "use strict";

  const VERSION="20260911.4";
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

  let gamesPromise=null,coursesPromise=null,financePromise=null,linksPromise=null,professionalPromise=null,helpPromise=null,marketPromise=null,qrPromise=null;

  function loadGames(){
    if(gamesPromise) return gamesPromise;
    gamesPromise=(async()=>{
      await parallelStyles([
        "./game-polish-v3.css","./game-experience-v4.css","./extra-games-v5.css","./extra-games-fix-v6.css","./falling-blocks-v7.css","./color-lines-v8.css","./game-promo-v9.css"
      ]);
      await series([
        "./mental-games.js","./game-suite.js","./game-local-storage-v8.js","./social-play.js","./game-polish-v3.js","./game-experience-v4.js","./extra-games-v5.js","./extra-games-fix-v6.js","./falling-blocks-v7.js","./color-lines-v8.js","./game-promo-v9.js","./game-interaction-fix-v10.js"
      ]);
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
  function loadFinance(){return financePromise||(financePromise=script("./monthly-finance-control.js").catch(error=>{financePromise=null;throw error}))}
  function loadLinks(){return linksPromise||(linksPromise=script("./link-tools.js").catch(error=>{linksPromise=null;throw error}))}
  function loadProfessional(){
    return professionalPromise||(professionalPromise=script("./professional-profile.js")
      .then(()=>{const value=currentSession();if(value)window.EduCashProProfessional?.setSession?.(value);return true})
      .catch(error=>{professionalPromise=null;throw error}));
  }
  function loadHelp(){return helpPromise||(helpPromise=script("./help-center.js").catch(error=>{helpPromise=null;throw error}))}
  function loadMarkets(){return marketPromise||(marketPromise=script("./market-learning-center.js").catch(error=>{marketPromise=null;throw error}))}
  function loadQr(){return qrPromise||(qrPromise=script("https://cdn.jsdelivr.net/npm/qrcodejs@1.0.0/qrcode.min.js",{external:true}).catch(error=>{qrPromise=null;throw error}))}

  function idle(callback,timeout=1600){
    if("requestIdleCallback" in window) return window.requestIdleCallback(()=>callback(),{timeout});
    return window.setTimeout(callback,Math.min(timeout,700));
  }

  window.EDUCASHPRO_ASSET_VERSION=VERSION;
  window.EduCashProResources={version:VERSION,script,style,loadGames,loadCourses,loadFinance,loadLinks,loadProfessional,loadHelp,loadMarkets,loadQr,idle};
})();
