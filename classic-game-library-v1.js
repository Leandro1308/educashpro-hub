(function(){
  "use strict";
  if(window.EduCashProClassicGamesV1)return;

  const suite=window.EduCashProGameSuite;
  const bridge=window.EduCashProGameBridge||(window.EduCashProGameBridge={session:null,catalogContext:{},currentGame:null});
  if(!suite)return;

  const COPY={
    pt:{play:"Jogar",free:"LIVRE",local:"LOCAL / OFFLINE",back:"Voltar aos jogos",section:"Clássicos offline",sub:"Jogos leves carregados somente quando você abre.",snake:"Snake",g2048:"2048",minesweeper:"Campo Minado",memory:"Jogo da Memória",breakout:"Quebra-Blocos",flappy:"Flappy",whack:"Acerte a Toupeira"},
    en:{play:"Play",free:"FREE",local:"LOCAL / OFFLINE",back:"Back to games",section:"Offline classics",sub:"Lightweight games loaded only when you open them.",snake:"Snake",g2048:"2048",minesweeper:"Minesweeper",memory:"Memory Match",breakout:"Breakout",flappy:"Flappy",whack:"Whack-a-Mole"},
    es:{play:"Jugar",free:"LIBRE",local:"LOCAL / OFFLINE",back:"Volver a juegos",section:"Clásicos offline",sub:"Juegos ligeros que se cargan solo al abrirlos.",snake:"Snake",g2048:"2048",minesweeper:"Buscaminas",memory:"Memoria",breakout:"Rompebloques",flappy:"Flappy",whack:"Golpea al Topo"},
    ru:{play:"Играть",free:"СВОБОДНО",local:"ЛОКАЛЬНО / ОФЛАЙН",back:"Назад к играм",section:"Офлайн-классика",sub:"Лёгкие игры загружаются только при открытии.",snake:"Змейка",g2048:"2048",minesweeper:"Сапёр",memory:"Память",breakout:"Арканоид",flappy:"Flappy",whack:"Ударь крота"}
  };
  const META={
    snake:["🐍","snake"],"2048":["🔢","g2048"],minesweeper:["💣","minesweeper"],memory:["🃏","memory"],breakout:["🧱","breakout"],flappy:["🐦","flappy"],"whack-a-mole":["🎯","whack"]
  };

  const lang=()=>{const raw=String(bridge.session?.profile?.language||window.__EDUCASHPRO_SESSION__?.profile?.language||navigator.language||"pt").slice(0,2).toLowerCase();return COPY[raw]?raw:"pt"};
  const t=k=>COPY[lang()]?.[k]||COPY.pt[k]||k;
  const esc=v=>String(v??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
  const content=()=>document.getElementById("content");
  let catalog=null;

  function ensureStyles(){
    if(document.getElementById("classicGameStyles"))return;
    const s=document.createElement("style");s.id="classicGameStyles";s.textContent=
      '.classicLibraryHead{grid-column:1/-1;margin:8px 0 0;padding:14px 2px 2px}.classicLibraryHead h2{margin:0 0 4px;font-size:20px}.classicLibraryHead p{margin:0;color:#91a4b9;font-size:13px}.classicGameFramePage{min-height:70vh}.classicGameToolbar{display:flex;align-items:center;justify-content:space-between;gap:12px;margin-bottom:12px}.classicGameToolbar span{font-size:12px;font-weight:900;color:#30e6a6}.classicGameFrame{display:block;width:100%;height:calc(100vh - 190px);min-height:560px;border:1px solid rgba(255,255,255,.1);border-radius:18px;background:#07111f}.classicGameCard .gameBadge.offline{color:#30e6a6}@media(max-width:640px){.classicGameFrame{height:calc(100vh - 155px);min-height:520px;border-radius:12px}.classicGameToolbar{position:sticky;top:0;z-index:3;background:#07111f;padding:6px 0}}';
    document.head.appendChild(s);
  }

  async function manifest(){
    if(catalog)return catalog;
    try{catalog=await window.EduCashProResources?.loadGameLibraryCatalog?.();}catch(_){catalog={games:[]}}
    return catalog;
  }

  function card(game){
    const m=META[game.id]||["🎮",game.id];
    return '<article class="gameCardV2 classicGameCard" data-classic-card="'+esc(game.id)+'">'+
      '<div class="gameCardArt">'+m[0]+'</div><h3>'+esc(t(m[1]))+'</h3>'+
      '<p>'+esc(game.description?.[lang()]||game.description?.pt||"")+'</p>'+
      '<div class="gameBadges"><span class="gameBadge">'+esc(t("free"))+'</span><span class="gameBadge offline">'+esc(t("local"))+'</span></div>'+
      '<div class="gameCardActions single"><button type="button" class="gamePlayBtn" data-classic-play="'+esc(game.id)+'">'+esc(t("play"))+'</button></div></article>';
  }

  async function decorate(){
    ensureStyles();
    const grid=document.querySelector(".gameSuite .gameCatalogV2");
    if(!grid||grid.dataset.classicLibrary==="1")return;
    const data=await manifest();
    const ready=(data.games||[]).filter(g=>g.status==="ready"&&g.access==="free"&&g.entry&&META[g.id]);
    if(!ready.length)return;
    grid.dataset.classicLibrary="1";
    grid.insertAdjacentHTML("beforeend",'<div class="classicLibraryHead"><h2>🎮 '+esc(t("section"))+'</h2><p>'+esc(t("sub"))+'</p></div>'+ready.map(card).join(""));
  }

  async function open(id){
    const data=await manifest(),game=(data.games||[]).find(g=>g.id===id&&g.status==="ready"&&g.entry);
    if(!game)return;
    ensureStyles();
    bridge.currentGame=id;
    document.getElementById("bottomNav")?.classList.add("hidden");
    const src=new URL(game.entry,location.href);src.searchParams.set("lang",lang());src.searchParams.set("v",String(game.packageVersion||"1"));
    content().innerHTML='<main class="classicGameFramePage"><div class="classicGameToolbar"><button type="button" class="textButton" data-classic-back>← '+esc(t("back"))+'</button><span>✓ '+esc(t("local"))+'</span></div><iframe class="classicGameFrame" title="'+esc(t((META[id]||[])[1]||id))+'" src="'+esc(src.toString())+'" allow="autoplay; fullscreen"></iframe></main>';
    content().querySelector("[data-classic-back]").onclick=back;
    window.scrollTo(0,0);
  }

  function back(){bridge.currentGame=null;suite.renderCatalog?.(bridge.catalogContext||{})}

  const previous=suite.renderCatalog?.bind(suite);
  if(previous)suite.renderCatalog=function(options={}){const out=previous(options);queueMicrotask(decorate);setTimeout(decorate,50);return out};

  document.addEventListener("click",e=>{const b=e.target?.closest?.("[data-classic-play]");if(!b)return;e.preventDefault();e.stopPropagation();open(b.dataset.classicPlay)},true);
  window.addEventListener("message",e=>{if(e.origin===location.origin&&e.data?.type==="educashpro:classic-back")back()});
  window.EduCashProClassicGamesV1={decorate,open,back};
})();