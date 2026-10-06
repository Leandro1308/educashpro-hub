(function(){
  "use strict";
  const DAY=24*60*60*1000, KEY="educashpro:web-session";
  function payload(token){try{const body=String(token||"").split(".")[0].replace(/-/g,"+").replace(/_/g,"/");return JSON.parse(atob(body+"=".repeat((4-body.length%4)%4)));}catch{return null;}}
  function read(){try{return JSON.parse(localStorage.getItem(KEY)||"null");}catch{return null;}}
  function walletLinked(session){return session?.profile?.walletLinked===true;}
  function canResume(session,now=Date.now()){
    const data=payload(session?.token);
    if(!session?.profile?.userId||data?.sub!==session.profile.userId||!(Number(data.exp)*1000>now+15000))return false;
    if(walletLinked(session))return true;
    const authenticatedAt=Number(session.authenticatedAt||session.storedAt||0);
    return authenticatedAt>0&&now>=authenticatedAt&&now-authenticatedAt<DAY;
  }
  function validationDue(session,now=Date.now()){return now-Number(session?.validatedAt||session?.storedAt||0)>=DAY;}
  function reject(token){const current=read();if(current?.token!==token)return;localStorage.setItem(KEY,JSON.stringify({...current,token:null}));}
  window.EduCashProSessionPolicy={read,payload,walletLinked,canResume,validationDue,reject};
})();
