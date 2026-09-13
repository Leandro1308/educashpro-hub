(function(){
  const platform=window.EduCashProPlatform;
  const auth=window.EduCashProWebAuth;
  if(!platform?.isTelegram?.()||!auth?.authenticateFromTelegram)return;

  async function connectTelegramSession(){
    try{
      const result=await auth.authenticateFromTelegram();
      window.EduCashProAccountSession=platform.readWebSession?.()||null;
      window.dispatchEvent(new CustomEvent("educashpro:platform-session-ready",{detail:{source:"telegram",profile:result?.profile||null}}));
      console.log("[EduCashPro] Mini App vinculado à identidade canônica",{userId:result?.profile?.userId||null});
    }catch(error){
      console.warn("[EduCashPro] sessão canônica do Mini App ainda não disponível",String(error?.message||error));
    }
  }

  if(document.readyState==="loading"){
    document.addEventListener("DOMContentLoaded",connectTelegramSession,{once:true});
  }else{
    connectTelegramSession();
  }
})();
