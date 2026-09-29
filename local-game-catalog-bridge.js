(function(){
  "use strict";

  const IDS=["car-rush","air-defense","air-defense-2","math-academy"];
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
      sub:{pt:"Defesa clássica: destrua as bolinhas antes que atravessem a base.",en:"Classic defense: destroy the balls before they cross the base.",es:"Defensa clásica: destruye las bolas antes de que crucen la base.",ru:"Классическая защита: уничтожайте шары до линии базы."},
      badge:{pt:"PROCESSAMENTO LOCAL",en:"LOCAL PROCESSING",es:"PROCESAMIENTO LOCAL",ru:"ЛОКАЛЬНО"}
    },
    "air-defense-2":{
      icon:"🛩️",
      title:{pt:"Defesa Aérea 2",en:"Air Defense 2",es:"Defensa Aérea 2",ru:"Воздушная оборона 2"},
      sub:{pt:"Combate aéreo: desvie dos tiros e abata aviões inimigos.",en:"Air combat: dodge fire and destroy enemy aircraft.",es:"Combate aéreo: esquiva disparos y derriba aviones enemigos.",ru:"Воздушный бой: уклоняйтесь и сбивайте самолёты."},
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
    if(!suite.GAME_META["air-defense-2"])suite.GAME_META["air-defense-2"]=["🛩️","airDefense2","airDefense2Sub"];
    if(!suite.GAME_META["math-academy"])suite.GAME_META["math-academy"]=["🧠","mathAcademy","mathAcademySub"];
  }

  function ensure(){
    registerMeta();
    const grid=document.querySelector(".gameCatalogV2");
    if(!grid)return false;
    let changed=false;
    for(const id of IDS){
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
    const limiter=window.EduCashProGameUsageLimit;
    if(limiter&&!limiter.start(button.dataset.play,"default",lang())){event.preventDefault();event.stopPropagation();event.stopImmediatePropagation?.();return}
    event.preventDefault();event.stopPropagation();event.stopImmediatePropagation?.();open(button.dataset.play);
  },true);

  const observer=new MutationObserver(()=>queueMicrotask(ensure));
  observer.observe(document.documentElement,{childList:true,subtree:true});
  if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",ensure,{once:true});
  else ensure();

  window.EduCashProLocalCatalogBridge={ready:true,ensure,open,ids:IDS.slice()};
})();