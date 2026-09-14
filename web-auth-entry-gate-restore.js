(function(){
  const platform=window.EduCashProPlatform;
  const saved=window.__EDUCASHPRO_WEB_ENTRY_GATE__;
  if(!platform||!saved)return;
  if(typeof saved.isWeb==="function")platform.isWeb=saved.isWeb;
  if(typeof saved.isTelegram==="function")platform.isTelegram=saved.isTelegram;
  delete window.__EDUCASHPRO_WEB_ENTRY_GATE__;
})();
