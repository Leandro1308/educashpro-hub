(function(){
  "use strict";

  const VERSION="20261025.2";
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

  let toolsHubPromise=null,accountCenterPromise=null,coursesPromise=null,financePromise=null,financialToolsPromise=null,linksPromise=null,professionalPromise=null,helpPromise=null,marketPromise=null,qrPromise=null,qrScannerPromise=null;

  let trainerPromise=null;
  function loadPriceAction(){
    if(window.EduCashProPriceAction?.render)return Promise.resolve(true);
    return trainerPromise||(trainerPromise=(async()=>{
      await Promise.all([style("./price-action-trainer.css"),script("./price-action-data.js")]);
      await script("./price-action-trainer.js");
      if(!window.EduCashProPriceAction?.render)throw new Error("trainer_module_unavailable");
      return true;
    })().catch(error=>{trainerPromise=null;throw error}));
  }

  const bookLanguageLoads=new Map();
  function loadBookCourse(lang="pt"){
    const selected=["pt","en","es","ru"].includes(String(lang).slice(0,2).toLowerCase())?String(lang).slice(0,2).toLowerCase():"pt";
    if(bookLanguageLoads.has(selected))return bookLanguageLoads.get(selected);
    const task=(async()=>{
      await Promise.all([style("./book-quiz.css"),style("./book-quiz-v3.css"),script("./book-quiz-engine-v4.js")]);
      if(selected==="pt")await Promise.all([
        script("./book-quiz-content-part1.js"),
        script("./book-quiz-content-part2.js"),
        script("./book-quiz-content-part3.js"),
        script("./book-quiz-content-part4.js")
      ]);
      else await script("./book-quiz-content-"+selected+".js");
      await script("./book-quiz-business-21-i18n.js");
      window.EduCashProBookQuizBooks?.build?.(selected);
      if(!window.EduCashProBookQuiz?.has?.("book-business-21",selected))throw new Error("book_course_locale_unavailable_"+selected);
      return true;
    })().catch(error=>{bookLanguageLoads.delete(selected);throw error});
    bookLanguageLoads.set(selected,task);
    return task;
  }
  const setForLifeLanguageLoads=new Map();
  function loadSetForLifeCourse(lang="pt"){
    const selected=["pt","en","es","ru"].includes(String(lang).slice(0,2).toLowerCase())?String(lang).slice(0,2).toLowerCase():"pt";
    if(setForLifeLanguageLoads.has(selected))return setForLifeLanguageLoads.get(selected);
    const task=(async()=>{
      await Promise.all([style("./book-quiz.css"),style("./book-quiz-v3.css"),script("./book-quiz-engine-v4.js")]);
      if(selected==="pt")await Promise.all([
        script("./set-for-life-part1.js"),
        script("./set-for-life-part2.js"),
        script("./set-for-life-part3.js"),
        script("./set-for-life-part4.js")
      ]);
      else await script("./set-for-life-"+selected+".js");
      await script("./set-for-life-course.js");
      window.EduCashProSetForLife?.build?.(selected);
      if(!window.EduCashProBookQuiz?.has?.("set-for-life",selected))throw new Error("set_for_life_locale_unavailable_"+selected);
      return true;
    })().catch(error=>{setForLifeLanguageLoads.delete(selected);throw error});
    setForLifeLanguageLoads.set(selected,task);return task;
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
  window.EduCashProResources={version:VERSION,script,style,prefetch,loadToolsHub,loadAccountCenter,loadCourses,loadBookCourse,loadSetForLifeCourse,loadFinance,loadFinancialTools,loadLinks,loadProfessional,loadHelp,loadMarkets,loadPriceAction,loadQr,loadQrScanner,idle};
})();



