(function(){
  "use strict";
  if(window.EduCashProGameUsageLimit)return;

  const PLAY_MS=60*60*1000;
  const COOLDOWN_MS=8*60*60*1000;
  const PREFIX="ecp:game-usage:v1";
  const bridge=window.EduCashProGameBridge||(window.EduCashProGameBridge={session:null,catalogContext:{},currentGame:null});
  const MODE_GAMES=new Set(["math-space","sliding-puzzle","word-search","math-cross","peg-solitaire","block-grid","nut-sort","falling-blocks","color-lines","math-academy"]);
  let current=null,timer=0;

  const COPY={
    pt:{title:"Tempo gratuito concluído",body:"Você completou 1 hora de uso gratuito desta modalidade. Assinantes têm acesso ilimitado aos jogos.",monthly:"Assinar mensal",lifetime:"Assinar vitalício",small:"Você pode voltar a jogar esta modalidade depois de 8 horas.",remaining:"Tempo restante para liberar novamente"},
    en:{title:"Free play time completed",body:"You completed 1 hour of free use for this game mode. Subscribers have unlimited access to games.",monthly:"Monthly subscription",lifetime:"Lifetime subscription",small:"You can play this mode again after 8 hours.",remaining:"Time until this mode is available again"},
    es:{title:"Tiempo gratuito completado",body:"Completaste 1 hora de uso gratuito de esta modalidad. Los suscriptores tienen acceso ilimitado a los juegos.",monthly:"Suscripción mensual",lifetime:"Suscripción vitalicia",small:"Puedes volver a jugar esta modalidad después de 8 horas.",remaining:"Tiempo restante para volver a jugar"},
    ru:{title:"Бесплатное время завершено",body:"Вы использовали 1 час бесплатной игры в этом режиме. Подписчики получают неограниченный доступ к играм.",monthly:"Месячная подписка",lifetime:"Пожизненная подписка",small:"Вы сможете снова играть в этот режим через 8 часов.",remaining:"До повторного доступа осталось"}
  };

  function lang(requested){
    const raw=String(requested||bridge.session?.profile?.language||window.__EDUCASHPRO_SESSION__?.profile?.language||navigator.language||"pt").slice(0,2).toLowerCase();
    return COPY[raw]?raw:"pt";
  }
  function c(key,l){return COPY[lang(l)]?.[key]||COPY.pt[key]||key}
  function esc(value){return String(value??"").replace(/[&<>"']/g,ch=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[ch]))}
  function userKey(){
    const session=bridge.session||window.__EDUCASHPRO_SESSION__||window.EduCashProWebEntry?.getSession?.()||{};
    const p=session.profile||{};
    return String(p.userId||p.telegramId||p.tgId||session.user?.id||"device").replace(/[^a-zA-Z0-9_.-]/g,"_");
  }
  function active(){
    if(window.EduCashProAccess?.isActive?.()===true)return true;
    const session=bridge.session||window.__EDUCASHPRO_SESSION__||window.EduCashProWebEntry?.getSession?.();
    return session?.profile?.active===true||session?.profile?.isActive===true;
  }
  function storageKey(game,mode){return PREFIX+":"+userKey()+":"+String(game||"game")+":"+String(mode||"default")}
  function write(game,mode,value){try{localStorage.setItem(storageKey(game,mode),JSON.stringify(value))}catch{}}
  function read(game,mode){
    let value={usedMs:0,lockedUntil:0};
    try{value={...value,...JSON.parse(localStorage.getItem(storageKey(game,mode))||"{}")}}catch{}
    const now=Date.now();
    if(Number(value.lockedUntil||0)>0&&now>=Number(value.lockedUntil)){
      value={usedMs:0,lockedUntil:0};
      write(game,mode,value);
    }
    value.usedMs=Math.max(0,Number(value.usedMs||0));
    value.lockedUntil=Math.max(0,Number(value.lockedUntil||0));
    return value;
  }
  function format(ms){
    const total=Math.max(0,Math.ceil(ms/1000)),h=Math.floor(total/3600),m=Math.floor((total%3600)/60),s=total%60;
    return h?(h+"h "+String(m).padStart(2,"0")+"min"):(m+"min "+String(s).padStart(2,"0")+"s");
  }
  function openPlan(plan){
    try{sessionStorage.setItem("educashpro:preferred-subscription-plan",plan)}catch{}
    if(window.EduCashProApp?.openSubscription)return window.EduCashProApp.openSubscription({plan});
    if(window.EduCashProApp?.renderPresentation)return window.EduCashProApp.renderPresentation();
    const session=bridge.session||window.__EDUCASHPRO_SESSION__||{};
    const url=String(session.subscribeUrl||session.botUrl||"");
    if(url){
      if(window.Telegram?.WebApp?.openLink)return window.Telegram.WebApp.openLink(url);
      window.open(url,"_blank","noopener");
    }
  }
  function stop(){
    if(timer){clearInterval(timer);timer=0}
    if(current){
      const now=Date.now();
      if(!active()&&current.last&&document.visibilityState!=="hidden"){
        const state=read(current.game,current.mode);
        if(!state.lockedUntil){
          state.usedMs=Math.min(PLAY_MS,state.usedMs+Math.max(0,Math.min(2500,now-current.last)));
          write(current.game,current.mode,state);
        }
      }
    }
    current=null;
  }
  function showBlocked(game,mode,l){
    if(timer){clearInterval(timer);timer=0}
    current=null;
    window.EduCashProLocalArcade?.stop?.();
    const state=read(game,mode),remaining=Math.max(0,state.lockedUntil-Date.now());
    const target=document.getElementById("content");
    if(!target)return;
    target.innerHTML='<main class="gamePage ecpGameLimitPage"><section style="max-width:620px;margin:24px auto;padding:28px;border-radius:24px;background:#0d1b2d;border:1px solid rgba(48,230,166,.22);box-shadow:0 18px 45px rgba(0,0,0,.25);text-align:center"><div style="font-size:46px;margin-bottom:8px">⏱️</div><span class="eyebrow">EDUCASHPRO PLAY</span><h2 style="margin:8px 0 10px">'+esc(c("title",l))+'</h2><p style="color:#c7d4e4;line-height:1.55">'+esc(c("body",l))+'</p>'+(remaining?'<p style="font-weight:800">⌛ '+esc(c("remaining",l))+': '+esc(format(remaining))+'</p>':'')+'<div style="display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:10px;margin-top:20px"><button id="ecpLimitMonthly" class="wideButton" type="button">⚡ '+esc(c("monthly",l))+'</button><button id="ecpLimitLifetime" class="secondaryButton" type="button">♾️ '+esc(c("lifetime",l))+'</button></div><small style="display:block;margin-top:12px;color:#91a4b9;line-height:1.45">'+esc(c("small",l))+'</small><button id="ecpLimitBack" class="textButton" type="button" style="margin-top:18px">←</button></section></main>';
    document.getElementById("ecpLimitMonthly").onclick=()=>openPlan("monthly");
    document.getElementById("ecpLimitLifetime").onclick=()=>openPlan("lifetime");
    document.getElementById("ecpLimitBack").onclick=()=>window.EduCashProGameSuite?.renderCatalog?.(bridge.catalogContext||{});
    window.scrollTo({top:0,behavior:"smooth"});
  }
  function expire(){
    if(!current||active())return;
    const state=read(current.game,current.mode);
    state.usedMs=PLAY_MS;
    state.lockedUntil=Date.now()+COOLDOWN_MS;
    write(current.game,current.mode,state);
    const snapshot={...current};
    current=null;
    if(timer){clearInterval(timer);timer=0}
    showBlocked(snapshot.game,snapshot.mode,snapshot.lang);
  }
  function tick(){
    if(!current)return;
    if(active()){stop();return}
    const now=Date.now();
    if(document.visibilityState==="hidden"){current.last=now;return}
    const state=read(current.game,current.mode);
    if(state.lockedUntil&&now<state.lockedUntil){showBlocked(current.game,current.mode,current.lang);return}
    const delta=Math.max(0,Math.min(2500,now-current.last));
    current.last=now;
    state.usedMs+=delta;
    write(current.game,current.mode,state);
    if(state.usedMs>=PLAY_MS)expire();
  }
  function start(game,mode="default",l){
    game=String(game||bridge.currentGame||"game");
    mode=String(mode||"default");
    if(current&&current.game===game&&current.mode===mode)return true;
    if(active()){stop();return true}
    const state=read(game,mode);
    if(state.lockedUntil>Date.now()){showBlocked(game,mode,l);return false}
    if(state.usedMs>=PLAY_MS){
      state.lockedUntil=Date.now()+COOLDOWN_MS;
      write(game,mode,state);
      showBlocked(game,mode,l);
      return false;
    }
    stop();
    current={game,mode,lang:lang(l),last:Date.now()};
    timer=setInterval(tick,1000);
    return true;
  }
  function modeFromButton(button){
    if(button.matches("[data-level]"))return{game:bridge.currentGame,mode:button.dataset.level};
    if(button.matches("[data-v3-math-level]"))return{game:"math-space",mode:button.dataset.v3MathLevel};
    if(button.matches("[data-peg]"))return{game:"peg-solitaire",mode:button.dataset.peg};
    if(button.matches("[data-extra-level]"))return{game:bridge.currentGame,mode:button.dataset.extraLevel};
    if(button.matches("[data-falling-level]"))return{game:"falling-blocks",mode:button.dataset.fallingLevel};
    if(button.matches("[data-color-level]"))return{game:"color-lines",mode:button.dataset.colorLevel};
    if(button.matches(".maMode[data-mode]"))return{game:"math-academy",mode:button.dataset.mode};
    if(button.matches("[data-air-mode]"))return button.dataset.airMode==="level-2"?{game:"air-defense-2",mode:"default"}:{game:"air-defense",mode:"default"};
    return null;
  }

  document.addEventListener("click",event=>{
    const back=event.target?.closest?.(".gameBackLocal,.extraBack,.fallingBack,.colorLinesBack,.airBack,.empireBack,.gameCatalogBack");
    if(back){stop();return}
    const button=event.target?.closest?.("[data-level],[data-v3-math-level],[data-peg],[data-extra-level],[data-falling-level],[data-color-level],.maMode[data-mode],[data-air-mode]");
    if(button){
      const info=modeFromButton(button);
      if(info?.game&&!start(info.game,info.mode,lang())){
        event.preventDefault();event.stopPropagation();event.stopImmediatePropagation?.();
      }
      return;
    }
    const play=event.target?.closest?.("[data-play],[data-extra-play]");
    const id=play?.dataset?.play||play?.dataset?.extraPlay;
    if(id){
      bridge.currentGame=id;
      if(!MODE_GAMES.has(id)&&!start(id,"default",lang())){
        event.preventDefault();event.stopPropagation();event.stopImmediatePropagation?.();
      }
    }
  },true);

  function patchSuite(){
    const suite=window.EduCashProGameSuite;
    if(!suite||suite.__usageLimitPatched)return false;
    const original=suite.launchGame?.bind(suite);
    if(original){
      suite.launchGame=function(gameId,options={}){
        bridge.currentGame=gameId;
        const mode=options.level||options.difficulty||options.tournament?.difficulty||"";
        if(mode){
          if(!start(gameId,String(mode),options.lang))return false;
        }else if(!MODE_GAMES.has(gameId)){
          if(!start(gameId,"default",options.lang))return false;
        }
        return original(gameId,options);
      };
    }
    const oldCatalog=suite.renderCatalog?.bind(suite);
    if(oldCatalog)suite.renderCatalog=function(options={}){stop();return oldCatalog(options)};
    suite.__usageLimitPatched=true;
    return true;
  }
  patchSuite();
  const patchTimer=setInterval(()=>{if(patchSuite())clearInterval(patchTimer)},120);
  setTimeout(()=>clearInterval(patchTimer),12000);

  window.addEventListener("pagehide",stop);
  document.addEventListener("visibilitychange",()=>{if(current)current.last=Date.now()});
  window.EduCashProGameUsageLimit={start,stop,read,showBlocked,isModeGame:(id)=>MODE_GAMES.has(String(id||"")),playMs:PLAY_MS,cooldownMs:COOLDOWN_MS};
})();