(function(){
  const telegram=()=>window.Telegram?.WebApp||null;
  const params=new URL(window.location.href).searchParams;
  const webSessionKey="educashpro:web-session";
  const referralKey="educashpro:pending-referral";
  const WEB_SENTINEL="__EDUCASHPRO_PLATFORM_WEB_SESSION_V1__";
  function rawInitData(){return String(telegram()?.initData||"")}
  function isRealTelegramInitData(){const value=rawInitData();return Boolean(value&&value!==WEB_SENTINEL)}
  function environment(){return isRealTelegramInitData()?"telegram":"web"}
  function readWebSession(){try{return JSON.parse(localStorage.getItem(webSessionKey)||"null")}catch{return null}}
  function writeWebSession(session){if(!session){localStorage.removeItem(webSessionKey);return}localStorage.setItem(webSessionKey,JSON.stringify(session))}
  function captureReferral(){const value=String(params.get("ref")||params.get("r")||"").trim();if(value)localStorage.setItem(referralKey,value);return value||String(localStorage.getItem(referralKey)||"").trim()}
  function telegramInitData(){return isRealTelegramInitData()?rawInitData():""}
  function close(){const tg=telegram();if(environment()==="telegram"&&tg?.close)tg.close();else if(history.length>1)history.back()}
  window.EduCashProPlatform={environment,isTelegram:()=>environment()==="telegram",isWeb:()=>environment()==="web",telegramInitData,readWebSession,writeWebSession,pendingReferral:captureReferral,clearPendingReferral:()=>localStorage.removeItem(referralKey),close,webSentinel:WEB_SENTINEL};
  // Prefer HttpOnly session cookies when the API is hosted on this same
  // origin. The compatibility fallback leaves legacy bearer clients intact.
  const nativeFetch=window.fetch.bind(window);
  const technicalApi="https://educashpro-all.onrender.com";
  let cookieMode=false;
  const cookieReady=(async()=>{
    if(environment()!=="web"||location.protocol!=="https:")return false;
    const controller=new AbortController();
    const timeout=setTimeout(()=>controller.abort(),1800);
    try{
      const r=await nativeFetch(location.origin+"/api/platform-auth/cookie-capabilities",{
        cache:"no-store",credentials:"same-origin",signal:controller.signal
      });
      const data=r.ok?await r.json():null;
      cookieMode=Boolean(data?.ok&&data?.mode==="first-party-cookie");
    }catch{cookieMode=false;}finally{clearTimeout(timeout);}
    return cookieMode;
  })();
  window.fetch=async function(input,options={}){
    const raw=typeof input==="string"?input:input?.url;
    if(!raw)return nativeFetch(input,options);
    let target;try{target=new URL(raw,location.href)}catch{return nativeFetch(input,options)}
    if(!target.pathname.startsWith("/api/")||
      (target.origin!==technicalApi&&target.origin!==location.origin))
      return nativeFetch(input,options);
    if(!(await cookieReady))return nativeFetch(input,options);
    const rewritten=new URL(target.pathname+target.search+target.hash,location.origin);
    const headers=new Headers(options.headers||(input instanceof Request?input.headers:{}));
    if(rewritten.pathname.startsWith("/api/platform-auth/"))
      headers.set("X-EduCashPro-Cookie-Session","1");
    const opts={...options,headers,credentials:"same-origin"};
    return input instanceof Request
      ?nativeFetch(new Request(rewritten.toString(),input),opts)
      :nativeFetch(rewritten.toString(),opts);
  };
  void cookieReady.then(async enabled=>{
    if(!enabled)return;
    const saved=readWebSession();
    if(!saved?.token||String(saved.token).endsWith(".cookie-session"))return;
    try{
      const r=await nativeFetch(location.origin+"/api/platform-auth/session",{
        method:"POST",credentials:"same-origin",cache:"no-store",
        headers:{"Content-Type":"application/json",
          "X-EduCashPro-Cookie-Session":"1",
          "Authorization":"Bearer "+saved.token},
        body:"{}"
      });
      const data=r.ok?await r.json():null;
      if(data?.cookieSession&&String(data.token||"").endsWith(".cookie-session")&&
         readWebSession()?.token===saved.token)
        writeWebSession({...saved,token:data.token,profile:data.profile||saved.profile,
          validatedAt:Date.now(),storedAt:Number(saved.storedAt||0)||Date.now()});
    }catch{}
  }).catch(()=>{});
  captureReferral();
})();
