(function(){
  "use strict";

  const previousFetch=window.fetch.bind(window);
  const bridge=window.EduCashProGameBridge||(window.EduCashProGameBridge={session:null,catalogContext:{},currentGame:null});
  const STORE_PREFIX="ecp:game-history:v2";

  function userKey(){
    const profile=bridge.session?.profile||{};
    return String(profile.telegramId||profile.tgId||profile.userId||bridge.session?.user?.id||"device");
  }
  function storageKey(){return `${STORE_PREFIX}:${userKey()}`}
  function readHistory(){try{const value=JSON.parse(localStorage.getItem(storageKey())||"[]");return Array.isArray(value)?value:[]}catch{return[]}}
  function writeHistory(items){try{localStorage.setItem(storageKey(),JSON.stringify(items.slice(0,60)))}catch{}}
  function response(data){return new Response(JSON.stringify(data),{status:200,headers:{"Content-Type":"application/json"}})}
  function bodyOf(options){try{return JSON.parse(options?.body||"{}")}catch{return{}}}

  window.fetch=async function(input,options){
    const url=typeof input==="string"?input:input?.url||"";
    if(/\/api\/games\/history\/save(?:\?|$)/.test(url)){
      const body=bodyOf(options);
      const history=readHistory();
      history.unshift({
        id:`local-${Date.now()}-${Math.random().toString(36).slice(2,8)}`,
        game:String(body.game||""),difficulty:String(body.difficulty||""),score:Number(body.score||0),durationMs:Number(body.durationMs||0),hits:Number(body.hits||0),errors:Number(body.errors||0),bestCombo:Number(body.bestCombo||0),stage:Number(body.stage||0),finishedAt:new Date().toISOString(),local:true
      });
      writeHistory(history);
      return response({ok:true,local:true});
    }
    if(/\/api\/games\/history\/list(?:\?|$)/.test(url))return response({ok:true,items:readHistory(),local:true});
    return previousFetch(input,options);
  };

  const COPY={
    pt:{history:"Histórico local",historyTitle:"Histórico deste aparelho",historyEmpty:"Nenhuma partida local registrada ainda.",syncNote:"Partidas, recordes e histórico de jogos ficam neste aparelho. O jogo normal não envia resultados ao Render nem ao MongoDB."},
    en:{history:"Local history",historyTitle:"History on this device",historyEmpty:"No local games recorded yet.",syncNote:"Games, records and game history stay on this device. Normal gameplay does not send results to Render or MongoDB."},
    es:{history:"Historial local",historyTitle:"Historial de este dispositivo",historyEmpty:"Todavía no hay partidas locales registradas.",syncNote:"Las partidas, récords y el historial quedan en este dispositivo. El juego normal no envía resultados a Render ni MongoDB."},
    ru:{history:"Локальная история",historyTitle:"История на этом устройстве",historyEmpty:"Локальных игр пока нет.",syncNote:"Игры, рекорды и история хранятся на этом устройстве. Обычная игра не отправляет результаты в Render или MongoDB."}
  };

  const suite=window.EduCashProGameSuite;
  if(suite){
    const oldText=typeof suite.text==="function"?suite.text.bind(suite):null;
    const oldLang=typeof suite.lang==="function"?suite.lang.bind(suite):value=>String(value||"pt").slice(0,2).toLowerCase();
    suite.text=function(key,l){const language=oldLang(l);return COPY[language]?.[key]||oldText?.(key,l)||key};
  }
})();
