(function(){
  "use strict";

  const IDS=["math-academy"];
  const META={
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
    if(limiter&&limiter.isModeGame?.(button.dataset.play)!==true&&!limiter.start(button.dataset.play,"default",lang())){event.preventDefault();event.stopPropagation();event.stopImmediatePropagation?.();return}
    event.preventDefault();event.stopPropagation();event.stopImmediatePropagation?.();open(button.dataset.play);
  },true);

  const observer=new MutationObserver(()=>queueMicrotask(ensure));
  observer.observe(document.documentElement,{childList:true,subtree:true});
  if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",ensure,{once:true});
  else ensure();

  window.EduCashProLocalCatalogBridge={ready:true,ensure,open,ids:IDS.slice()};
})();