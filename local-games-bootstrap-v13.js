(function(){
  "use strict";

  const VERSION="20260929.1";
  const IDS=["car-rush","air-defense","math-academy"];
  const COPY={
    pt:{
      carRush:"Corrida de Velocidade",carRushSub:"Desvie dos obstáculos enquanto a velocidade aumenta.",
      airDefense:"Defesa Aérea",airDefenseSub:"Escolha entre defesa clássica e combate aéreo contra aviões inimigos.",
      mathAcademy:"Aprenda Matemática",mathAcademySub:"Leia, aprenda e pratique matemática e tabuada.",
      play:"Jogar",free:"LIVRE",local:"PROCESSAMENTO LOCAL",learning:"EDUCATIVO"
    },
    en:{
      carRush:"Speed Race",carRushSub:"Dodge obstacles while speed keeps increasing.",
      airDefense:"Air Defense",airDefenseSub:"Choose classic defense or air combat against enemy aircraft.",
      mathAcademy:"Learn Mathematics",mathAcademySub:"Read, learn and practice mathematics and multiplication tables.",
      play:"Play",free:"FREE",local:"LOCAL PROCESSING",learning:"LEARNING"
    },
    es:{
      carRush:"Carrera de Velocidad",carRushSub:"Esquiva obstáculos mientras aumenta la velocidad.",
      airDefense:"Defensa Aérea",airDefenseSub:"Elige defensa clásica o combate aéreo contra aviones enemigos.",
      mathAcademy:"Aprende Matemáticas",mathAcademySub:"Lee, aprende y practica matemáticas y tablas.",
      play:"Jugar",free:"LIBRE",local:"PROCESAMIENTO LOCAL",learning:"EDUCATIVO"
    },
    ru:{
      carRush:"Скоростная гонка",carRushSub:"Объезжайте препятствия при растущей скорости.",
      airDefense:"Воздушная оборона",airDefenseSub:"Выберите классическую оборону или воздушный бой с самолётами.",
      mathAcademy:"Изучайте математику",mathAcademySub:"Читайте, изучайте и тренируйте математику и таблицу умножения.",
      play:"Играть",free:"СВОБОДНО",local:"ЛОКАЛЬНО",learning:"ОБУЧЕНИЕ"
    }
  };
  const META={
    "car-rush":["🏎️","carRush","carRushSub"],
    "air-defense":["✈️","airDefense","airDefenseSub"],
    "math-academy":["🧠","mathAcademy","mathAcademySub"]
  };

  let bootPromise=null;
  let observer=null;
  let pollTimer=0;

  function lang(requested){
    const raw=String(
      requested ||
      window.EduCashProGameSuite?.lang?.() ||
      window.__EDUCASHPRO_SESSION__?.profile?.language ||
      navigator.language ||
      "pt"
    ).slice(0,2).toLowerCase();
    return COPY[raw]?raw:"pt";
  }
  function text(key,requested){
    const l=lang(requested);
    return COPY[l]?.[key]||COPY.pt[key]||key;
  }
  function esc(value){
    return String(value??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
  }
  function withVersion(src){
    return src+(src.includes("?")?"&":"?")+"v="+encodeURIComponent(VERSION);
  }

  function loadScript(src){
    const normalized=src.replace(/^\.\//,"");
    const existing=[...document.scripts].find(node=>{
      try{return new URL(node.src,location.href).pathname.endsWith("/"+normalized)}catch{return false}
    });
    if(existing){
      if(existing.dataset.ecpLoaded==="1")return Promise.resolve(existing);
      return new Promise((resolve,reject)=>{
        let settled=false;
        const done=()=>{if(settled)return;settled=true;existing.dataset.ecpLoaded="1";resolve(existing)};
        const fail=()=>{if(settled)return;settled=true;reject(new Error("asset_failed:"+src))};
        existing.addEventListener("load",done,{once:true});
        existing.addEventListener("error",fail,{once:true});
        window.setTimeout(()=>{
          if(settled)return;
          // If the expected global/registration already exists, the script has
          // executed even when its original loader did not mark the element.
          const arcade=window.EduCashProLocalArcade;
          if(
            (normalized==="local-arcade-core.js"&&arcade) ||
            (normalized==="speed-race-game.js"&&arcade?.has?.("car-rush")) ||
            (normalized==="air-defense-game.js"&&arcade?.has?.("air-defense")) ||
            (normalized==="math-learning-game.js"&&arcade?.has?.("math-academy"))
          ) done();
        },80);
        window.setTimeout(fail,6000);
      });
    }
    return new Promise((resolve,reject)=>{
      const node=document.createElement("script");
      node.src=withVersion(src);
      node.async=true;
      node.dataset.ecpLocalBootstrap="1";
      node.onload=()=>{node.dataset.ecpLoaded="1";resolve(node)};
      node.onerror=()=>reject(new Error("asset_failed:"+src));
      document.head.appendChild(node);
    });
  }

  function registerMeta(){
    const suite=window.EduCashProGameSuite;
    if(!suite)return false;
    suite.GAME_META=suite.GAME_META||{};
    for(const id of IDS) suite.GAME_META[id]=META[id];

    if(!suite.__localGamesTextV13){
      suite.__localGamesTextV13=true;
      const previous=typeof suite.text==="function"?suite.text.bind(suite):null;
      suite.text=function(key,requested){
        const localized=COPY[lang(requested)]?.[key];
        return localized||previous?.(key,requested)||key;
      };
    }

    if(!suite.__localGamesLaunchV13){
      suite.__localGamesLaunchV13=true;
      const previous=typeof suite.launchGame==="function"?suite.launchGame.bind(suite):null;
      suite.launchGame=function(id,options={}){
        if(IDS.includes(id)){
          const arcade=window.EduCashProAdvancedGames;
          if(arcade?.launch)return arcade.launch(id,{lang:lang(options.lang)});
        }
        return previous?previous(id,options):undefined;
      };
    }
    return true;
  }

  function card(id){
    const [icon,titleKey,subKey]=META[id];
    const badge=id==="math-academy"?text("learning"):text("local");
    return '<article class="gameCardV2 directLocalGameCard" data-direct-local-card="'+id+'">'+
      '<div class="gameCardArt">'+icon+'</div>'+
      '<h3>'+esc(text(titleKey))+'</h3>'+
      '<p>'+esc(text(subKey))+'</p>'+
      '<div class="gameBadges"><span class="gameBadge">'+esc(text("free"))+'</span>'+
      '<span class="gameBadge premium">'+esc(badge)+'</span></div>'+
      '<div class="gameCardActions single"><button class="gamePlayBtn" data-play="'+id+'" type="button">'+esc(text("play"))+'</button></div>'+
      '</article>';
  }

  function ensureCards(){
    registerMeta();
    const grid=document.querySelector(".gameCatalogV2");
    if(!grid)return false;
    for(const id of IDS){
      if(!grid.querySelector('[data-play="'+id+'"]'))grid.insertAdjacentHTML("beforeend",card(id));
    }
    grid.dataset.directLocalGames="1";
    return true;
  }

  async function ensureModules(){
    const suite=window.EduCashProGameSuite;
    if(!suite)throw new Error("game_suite_not_ready");

    if(!window.EduCashProLocalArcade)await loadScript("./local-arcade-core.js");
    const arcade=window.EduCashProLocalArcade;
    if(!arcade)throw new Error("local_arcade_not_ready");

    if(!arcade.has?.("car-rush"))await loadScript("./speed-race-game.js");
    if(!arcade.has?.("air-defense"))await loadScript("./air-defense-game.js");
    if(!arcade.has?.("math-academy"))await loadScript("./math-learning-game.js");

    if(!window.EduCashProAdvancedGames?.launch)throw new Error("advanced_games_not_ready");
    return true;
  }

  async function boot(){
    if(bootPromise)return bootPromise;
    bootPromise=(async()=>{
      registerMeta();
      await ensureModules();
      registerMeta();
      ensureCards();
      window.dispatchEvent(new CustomEvent("educashpro:local-games-ready",{detail:{ids:IDS.slice(),version:VERSION}}));
      return true;
    })().catch(error=>{
      bootPromise=null;
      console.error("[EduCashPro] Falha no bootstrap dos jogos locais:",error);
      return false;
    });
    return bootPromise;
  }

  function watch(){
    if(!observer){
      observer=new MutationObserver(()=>{
        if(window.EduCashProGameSuite){
          void boot().then(()=>ensureCards());
        }
      });
      observer.observe(document.documentElement,{childList:true,subtree:true});
    }
    let attempts=0;
    const tick=()=>{
      attempts++;
      if(window.EduCashProGameSuite){
        void boot().then(()=>ensureCards());
        if(attempts>240){window.clearInterval(pollTimer);pollTimer=0}
      }
      if(attempts>480&&pollTimer){window.clearInterval(pollTimer);pollTimer=0}
    };
    tick();
    pollTimer=window.setInterval(tick,250);
  }

  document.addEventListener("click",event=>{
    const button=event.target?.closest?.("[data-play]");
    const id=button?.dataset?.play;
    if(!IDS.includes(id))return;
    event.preventDefault();
    event.stopPropagation();
    event.stopImmediatePropagation?.();
    void boot().then(ok=>{
      if(ok)window.EduCashProGameSuite?.launchGame?.(id,{lang:lang()});
    });
  },true);

  window.EduCashProLocalGamesBootstrapV13={
    version:VERSION,
    ids:IDS.slice(),
    boot,
    ensureCards,
    registerMeta
  };

  if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",watch,{once:true});
  else watch();
})();