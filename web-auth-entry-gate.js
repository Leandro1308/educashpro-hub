(function(){
  const platform=window.EduCashProPlatform;
  if(!window.__EDUCASHPRO_WEB_HUB__?.active||!platform)return;
  window.__EDUCASHPRO_WEB_ENTRY_GATE__={
    isWeb:platform.isWeb,
    isTelegram:platform.isTelegram,
  };
  platform.isWeb=()=>false;
  platform.isTelegram=()=>false;
})();
