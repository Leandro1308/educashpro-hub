(function(){
  "use strict";

  const IDS=["car-rush","air-defense","math-academy"];
  const META={
    "car-rush":{
      icon:"🏎️",
      title:{pt:"Corrida de Velocidade",en:"Speed Race",es:"Carrera de Velocidad",ru:"Скоростная гонка"},
      sub:{pt:"Desvie dos obstáculos enquanto a velocidade aumenta a cada 30 segundos.",en:"Dodge obstacles while speed increases every 30 seconds.",es:"Esquiva obstáculos mientras aumenta la velocidad cada 30 segundos.",ru:"Объезжайте препятствия: каждые 30 секунд скорость растёт."},
      badge:{pt:"PROCESSAMENTO LOCAL",en:"LOCAL PROCESSING",es:"PROCESAMIENTO LOCAL",ru:"ЛОКАЛЬНО"}
    },
    "air-defense":{
      icon:"✈️",
      title:{pt:"Defesa Aérea",en:"Air Defense",es:"Defensa Aérea",ru:"Воздушная оборона"},
      sub:{pt:"Escolha Nível 1 (defesa clássica) ou Nível 2 (combate aéreo).",en:"Choose Level 1 (classic defense) or Level 2 (air combat).",es:"Elige Nivel 1 (defensa clásica) o Nivel 2 (combate aéreo).",ru:"Выберите Уровень 1 (классическая защита) или Уровень 2 (воздушный бой)."},
      badge:{pt:"PROCESSAMENTO LOCAL",en:"LOCAL PROCESSING",es:"PROCESAMIENTO LOCAL",ru:"ЛОКАЛЬНО"}
    },
    "math-academy":{
      icon:"🧠",
      title:{pt:"Aprenda Matemática",en:"Learn Mathematics",es:"Aprende Matemáticas",ru:"Изучайте математику"},
      sub:{pt:"Leia, aprenda e pratique matemática e tabuada.",en:"Read, learn and practice mathematics and multiplication tables.",es:"Lee, aprende y practica matemáticas y tablas.",ru:"Читайте, изучайте и тренируйте математику и таблицу умножения."},
      badge:{pt:"EDUCATIVO",en:"LEARNING",es:"EDUCATIVO",ru:"ОБУЧЕНИЕ"}
    }
  };

  function lang(){
    try{
      const value=String(
        window.EduCashProGameSuite?.lang?.() ||
        window.__EDUCASHPRO_SESSION__?.profile?.language ||
        navigator.language ||
        "pt"
      ).slice(0,2).toLowerCase();
      return ["pt","en","es","ru"].includes(value)?value:"pt";
    }catch{return"pt"}
  }

  function esc(value){
    return String(value??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
  }

  function label(map){const l=lang();return map?.[l]||map?.pt||""}

  function card(id){
    const item=META[id],l=lang();
    if(id==="air-defense"){
      const level1=l==="en"?"Level 1":l==="es"?"Nivel 1":l==="ru"?"Уровень 1":"Nível 1",level2=l==="en"?"Level 2":l==="es"?"Nivel 2":l==="ru"?"Уровень 2":"Nível 2";
      return '<article class="gameCardV2 localCatalogBridgeCard" data-local-game-card="'+id+'" data-air-defense-card="1"><div class="gameCardArt">'+item.icon+'</div><h3>'+esc(label(item.title))+'</h3><p>'+esc(label(item.sub))+'</p><div class="gameBadges"><span class="gameBadge">'+(l==="en"?"FREE":l==="es"?"LIBRE":l==="ru"?"СВОБОДНО":"LIVRE")+'</span><span class="gameBadge premium">'+esc(label(item.badge))+'</span></div><div class="gameCardActions"><button class="gamePlayBtn" type="button" data-air-mode="level-1" data-air-direct="air-defense-level-1">✈️ '+esc(level1)+'</button><button class="gamePlayBtn" type="button" data-air-mode="level-2" data-air-direct="air-defense-level-2">🛩️ '+esc(level2)+'</button></div></article>';
    }
    return '<article class="gameCardV2 localCatalogBridgeCard" data-local-game-card="'+id+'">'+
      '<div class="gameCardArt">'+item.icon+'</div>'+
      '<h3>'+esc(label(item.title))+'</h3>'+
      '<p>'+esc(label(item.sub))+'</p>'+
      '<div class="gameBadges"><span class="gameBadge">'+(l==="en"?"FREE":l==="es"?"LIBRE":l==="ru"?"СВОБОДНО":"LIVRE")+'</span>'+
      '<span class="gameBadge premium">'+esc(label(item.badge))+'</span></div>'+
      '<div class="gameCardActions single"><button class="gamePlayBtn" type="button" data-play="'+id+'">'+
      (l==="en"?"Play":l==="es"?"Jugar":l==="ru"?"Играть":"Jogar")+
      '</button></div></article>';
  }

  function registerMeta(){
    const suite=window.EduCashProGameSuite;
    if(!suite)return;
    suite.GAME_META=suite.GAME_META||{};
    if(!suite.GAME_META["car-rush"])suite.GAME_META["car-rush"]=["🏎️","carRush","carRushSub"];
    if(!suite.GAME_META["air-defense"])suite.GAME_META["air-defense"]=["✈️","airDefense","airDefenseSub"];
    if(!suite.GAME_META["math-academy"])suite.GAME_META["math-academy"]=["🧠","mathAcademy","mathAcademySub"];
  }

  function ensure(){
    registerMeta();
    const grid=document.querySelector(".gameCatalogV2");
    if(!grid)return false;
    let changed=false;
    for(const id of IDS){
      if(id==="air-defense"&&grid.querySelector("[data-air-defense-card]"))continue;
      if(grid.querySelector('[data-play="'+id+'"]'))continue;
      grid.insertAdjacentHTML("beforeend",card(id));
      changed=true;
    }
    if(changed)grid.dataset.localGamesReady="1";
    return true;
  }

  function open(id){
    const arcade=window.EduCashProAdvancedGames;
    if(!arcade?.launch)return false;
    return arcade.launch(id,{lang:lang()});
  }

  document.addEventListener("click",event=>{
    const button=event.target?.closest?.("[data-play]");
    if(!button||!IDS.includes(button.dataset.play))return;
    event.preventDefault();event.stopPropagation();event.stopImmediatePropagation?.();open(button.dataset.play);
  },true);
  document.addEventListener("click",event=>{
    const button=event.target?.closest?.(".localCatalogBridgeCard [data-air-direct]");
    if(!button)return;
    event.preventDefault();
    window.EduCashProAdvancedGames?.launch?.(button.dataset.airDirect,{lang:lang()});
  });

  const observer=new MutationObserver(()=>queueMicrotask(ensure));
  observer.observe(document.documentElement,{childList:true,subtree:true});
  if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",ensure,{once:true});
  else ensure();

  window.EduCashProLocalCatalogBridge={ready:true,ensure,open,ids:IDS.slice()};
})();