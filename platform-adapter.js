(function(){
  const tg=window.Telegram?.WebApp||null;
  const params=new URL(window.location.href).searchParams;
  const webSessionKey="educashpro:web-session";
  const referralKey="educashpro:pending-referral";
  const WEB_SENTINEL="__EDUCASHPRO_PLATFORM_WEB_SESSION_V1__";
  function rawInitData(){return String(tg?.initData||"")}
  function isRealTelegramInitData(){const value=rawInitData();return Boolean(value&&value!==WEB_SENTINEL)}
  function environment(){return isRealTelegramInitData()?"telegram":"web"}
  function readWebSession(){try{return JSON.parse(localStorage.getItem(webSessionKey)||"null")}catch{return null}}
  function writeWebSession(session){if(!session){localStorage.removeItem(webSessionKey);return}localStorage.setItem(webSessionKey,JSON.stringify(session))}
  function captureReferral(){const value=String(params.get("ref")||params.get("r")||"").trim();if(value)localStorage.setItem(referralKey,value);return value||String(localStorage.getItem(referralKey)||"").trim()}
  function telegramInitData(){return isRealTelegramInitData()?rawInitData():""}
  function close(){if(environment()==="telegram"&&tg?.close)tg.close();else if(history.length>1)history.back()}
  window.EduCashProPlatform={environment,isTelegram:()=>environment()==="telegram",isWeb:()=>environment()==="web",telegramInitData,readWebSession,writeWebSession,pendingReferral:captureReferral,clearPendingReferral:()=>localStorage.removeItem(referralKey),close,webSentinel:WEB_SENTINEL};
  captureReferral();
})();
