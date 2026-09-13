(function(){
  const tg=window.Telegram?.WebApp||null;
  const params=new URL(window.location.href).searchParams;
  const webSessionKey="educashpro:web-session";
  const referralKey="educashpro:pending-referral";
  function environment(){return tg?.initData?"telegram":"web"}
  function readWebSession(){try{return JSON.parse(localStorage.getItem(webSessionKey)||"null")}catch{return null}}
  function writeWebSession(session){if(!session){localStorage.removeItem(webSessionKey);return}localStorage.setItem(webSessionKey,JSON.stringify(session))}
  function captureReferral(){const value=String(params.get("ref")||params.get("r")||"").trim();if(value)localStorage.setItem(referralKey,value);return value||String(localStorage.getItem(referralKey)||"").trim()}
  function telegramInitData(){return String(tg?.initData||"")}
  function close(){if(tg?.close)tg.close();else if(history.length>1)history.back()}
  window.EduCashProPlatform={environment,isTelegram:()=>environment()==="telegram",isWeb:()=>environment()==="web",telegramInitData,readWebSession,writeWebSession,pendingReferral:captureReferral,clearPendingReferral:()=>localStorage.removeItem(referralKey),close};
  captureReferral();
})();
