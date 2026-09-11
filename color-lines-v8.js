(function(){
  "use strict";

  const suite=window.EduCashProGameSuite;
  const bridge=window.EduCashProGameBridge||(window.EduCashProGameBridge={session:null,catalogContext:{},currentGame:null});
  if(!suite)return;

  const $=(selector,root=document)=>root.querySelector(selector);
  const $$=(selector,root=document)=>[...root.querySelectorAll(selector)];
  const content=()=>document.getElementById("content");
  const esc=value=>String(value??"").replace(/[&<>"']/g,char=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[char]));
  const lang=value=>suite.lang?.(value)||"pt";

  const COPY={
    pt:{colorLines:"Desafio das Cores",colorLinesSub:"Organize cada linha com uma única cor e deixe cada linha com uma cor diferente.",choose:"Escolha o nível",level:"Nível",freeAll:"6 NÍVEIS LIVRES",free:"LIVRE",play:"Jogar",how:"Como jogar",howText:"Toque em uma peça e depois em uma peça vizinha para trocar as duas de lugar. As peças só podem ser trocadas para cima, baixo, esquerda ou direita. O objetivo é deixar cada linha horizontal com uma única cor, sem repetir a cor em outra linha.",time:"Tempo",moves:"Movimentos",best:"Melhor",restart:"Reiniciar",newGame:"Embaralhar novamente",levels:"Níveis",solved:"Nível concluído!",again:"Jogar novamente",next:"Próximo nível",local:"Partida, progresso e recordes ficam somente neste aparelho.",selectNeighbor:"Agora toque em uma peça vizinha.",invalidNeighbor:"Escolha uma peça ao lado da selecionada.",board:"Tabuleiro de cores"},
    en:{colorLines:"Color Challenge",colorLinesSub:"Arrange each row in one color and make every row a different color.",choose:"Choose a level",level:"Level",freeAll:"6 FREE LEVELS",free:"FREE",play:"Play",how:"How to play",howText:"Tap one tile and then an adjacent tile to swap them. Tiles can only swap up, down, left or right. The goal is to make every horizontal row a single color, with no color repeated on another row.",time:"Time",moves:"Moves",best:"Best",restart:"Restart",newGame:"Shuffle again",levels:"Levels",solved:"Level complete!",again:"Play again",next:"Next level",local:"Game, progress and records stay on this device only.",selectNeighbor:"Now tap an adjacent tile.",invalidNeighbor:"Choose a tile next to the selected one.",board:"Color board"},
    es:{colorLines:"Desafío de Colores",colorLinesSub:"Organiza cada fila con un solo color y deja cada fila con un color diferente.",choose:"Elige el nivel",level:"Nivel",freeAll:"6 NIVELES LIBRES",free:"LIBRE",play:"Jugar",how:"Cómo jugar",howText:"Toca una ficha y después una ficha vecina para intercambiarlas. Solo se puede mover arriba, abajo, izquierda o derecha. El objetivo es dejar cada fila horizontal de un solo color, sin repetir el color en otra fila.",time:"Tiempo",moves:"Movimientos",best:"Mejor",restart:"Reiniciar",newGame:"Mezclar de nuevo",levels:"Niveles",solved:"¡Nivel completado!",again:"Jugar de nuevo",next:"Siguiente nivel",local:"La partida, el progreso y los récords quedan solo en este dispositivo.",selectNeighbor:"Ahora toca una ficha vecina.",invalidNeighbor:"Elige una ficha junto a la seleccionada.",board:"Tablero de colores"},
    ru:{colorLines:"Цветовой вызов",colorLinesSub:"Соберите каждый ряд из одного цвета, а каждый следующий ряд — из другого.",choose:"Выберите уровень",level:"Уровень",freeAll:"6 БЕСПЛАТНЫХ УРОВНЕЙ",free:"СВОБОДНО",play:"Играть",how:"Как играть",howText:"Нажмите одну плитку, затем соседнюю, чтобы поменять их местами. Разрешены обмены только вверх, вниз, влево и вправо. Цель — сделать каждый горизонтальный ряд одноцветным, без повторения цвета в другом ряду.",time:"Время",moves:"Ходы",best:"Лучший",restart:"Сначала",newGame:"Перемешать снова",levels:"Уровни",solved:"Уровень пройден!",again:"Ещё раз",next:"Следующий уровень",local:"Игра, прогресс и рекорды хранятся только на этом устройстве.",selectNeighbor:"Теперь выберите соседнюю плитку.",invalidNeighbor:"Выберите плитку рядом с отмеченной.",board:"Цветовое поле"}
  };

  const LEVELS=[
    {id:1,cols:4,rows:4,scramble:28},
    {id:2,cols:4,rows:6,scramble:56},
    {id:3,cols:5,rows:8,scramble:105},
    {id:4,cols:6,rows:12,scramble:220},
    {id:5,cols:7,rows:16,scramble:390},
    {id:6,cols:8,rows:20,scramble:650}
  ];

  const t=(key,l)=>COPY[lang(l)]?.[key]||COPY.pt[key]||key;
  const previousText=typeof suite.text==="function"?suite.text.bind(suite):null;
  suite.text=function(key,l){return COPY[lang(l)]?.[key]||previousText?.(key,l)||key};
  suite.GAME_META=suite.GAME_META||{};
  suite.GAME_META["color-lines"]=["🎨","colorLines","colorLinesSub"];

  function seconds(value){return `${String(Math.floor(value/60)).padStart(2,"0")}:${String(value%60).padStart(2,"0")}`}
  function recordKey(level){return `ecp:color-lines:v1:level:${level}:best`}
  function loadRecord(level){
    try{return JSON.parse(localStorage.getItem(recordKey(level))||"null")}catch{return null}
  }
  function saveRecord(level,moves,elapsed){
    const old=loadRecord(level);
    const next=!old||moves<Number(old.moves)||moves===Number(old.moves)&&elapsed<Number(old.elapsed)?{moves,elapsed}:old;
    try{localStorage.setItem(recordKey(level),JSON.stringify(next))}catch{}
    return next;
  }
  function palette(index){
    const hue=Math.round((index*137.508)%360);
    const saturation=68+(index%3)*7;
    const lightness=48+(index%4)*4;
    return `hsl(${hue} ${saturation}% ${lightness}%)`;
  }
  function isAdjacent(a,b,cols){
    if(a<0||b<0)return false;
    const ar=Math.floor(a/cols),ac=a%cols,br=Math.floor(b/cols),bc=b%cols;
    return Math.abs(ar-br)+Math.abs(ac-bc)===1;
  }
  function solved(board,rows,cols){
    const seen=new Set();
    for(let row=0;row<rows;row++){
      const first=board[row*cols];
      for(let col=1;col<cols;col++)if(board[row*cols+col]!==first)return false;
      seen.add(first);
    }
    return seen.size===rows;
  }
  function makeBoard(level){
    const board=[];
    for(let row=0;row<level.rows;row++)for(let col=0;col<level.cols;col++)board.push(row);
    let current=Math.floor(Math.random()*board.length),previous=-1;
    for(let step=0;step<level.scramble;step++){
      const row=Math.floor(current/level.cols),col=current%level.cols;
      let neighbors=[];
      if(row>0)neighbors.push(current-level.cols);
      if(row<level.rows-1)neighbors.push(current+level.cols);
      if(col>0)neighbors.push(current-1);
      if(col<level.cols-1)neighbors.push(current+1);
      if(neighbors.length>1)neighbors=neighbors.filter(index=>index!==previous);
      const next=neighbors[Math.floor(Math.random()*neighbors.length)];
      [board[current],board[next]]=[board[next],board[current]];
      previous=current;current=next;
    }
    if(solved(board,level.rows,level.cols)){
      const a=0,b=level.cols;
      [board[a],board[b]]=[board[b],board[a]];
    }
    return board;
  }

  function decorateCatalog(){
    const button=$("[data-play='color-lines']");
    const card=button?.closest(".gameCardV2");
    if(!card)return;
    const badges=$(".gameBadges",card);
    if(badges)badges.innerHTML=`<span class="gameBadge">${esc(t("freeAll",lang()))}</span>`;
  }

  function levelSelector(requested,tournament=null){
    const l=lang(requested);
    bridge.currentGame="color-lines";
    const tournamentLevel=tournament?mapTournamentLevel(tournament.difficulty):0;
    if(tournament&&tournamentLevel)return renderGame(tournamentLevel,l,tournament);
    content().innerHTML=`<main class="gamePage colorLinesPage"><button class="textButton colorLinesBack" type="button">←</button><section class="hero"><span class="eyebrow">🎨 ${esc(t("freeAll",l))}</span><h1>${esc(t("colorLines",l))}</h1><p>${esc(t("colorLinesSub",l))}</p></section><section class="colorLevelGrid">${LEVELS.map(level=>{const best=loadRecord(level.id);return `<button class="colorLevelCard" type="button" data-color-level="${level.id}"><span class="colorLevelNumber">${level.id}</span><strong>${esc(t("level",l))} ${level.id}</strong><small>${level.cols} × ${level.rows}</small><span>${esc(t("free",l))}${best?` · ${best.moves} ${esc(t("moves",l)).toLowerCase()} · ${seconds(best.elapsed)}`:""}</span></button>`}).join("")}</section><p class="gameLocalNote">📱 ${esc(t("local",l))}</p></main>`;
    $(".colorLinesBack")?.addEventListener("click",()=>suite.renderCatalog?.(bridge.catalogContext||{}));
    $$("[data-color-level]").forEach(button=>button.addEventListener("click",()=>renderGame(Number(button.dataset.colorLevel),l,null)));
    window.scrollTo({top:0,behavior:"auto"});
  }

  function mapTournamentLevel(value){
    const difficulty=String(value||"").toLowerCase();
    if(difficulty==="basic"||difficulty==="easy")return 1;
    if(difficulty==="medium")return 3;
    if(difficulty==="advanced"||difficulty==="hard")return 5;
    if(difficulty==="nerd")return 6;
    const numeric=Number(difficulty);
    return numeric>=1&&numeric<=6?numeric:3;
  }

  function renderGame(levelId,requested,tournament=null){
    const l=lang(requested),level=LEVELS.find(item=>item.id===Number(levelId))||LEVELS[0];
    bridge.currentGame="color-lines";
    let board=makeBoard(level),initial=[...board],selected=-1,moves=0,elapsed=0,finished=false,timer=null,started=false,timerStartedAt=0;

    content().innerHTML=`<main class="gamePage colorLinesPage playing"><button class="textButton colorLinesBack" type="button">←</button><section class="colorGameHeader"><div><span class="eyebrow">🎨 ${esc(t("level",l))} ${level.id} · ${level.cols} × ${level.rows}</span><h1>${esc(t("colorLines",l))}</h1></div><div class="colorStats"><span><small>${esc(t("time",l))}</small><b id="colorTime">00:00</b></span><span><small>${esc(t("moves",l))}</small><b id="colorMoves">0</b></span><span><small>${esc(t("best",l))}</small><b id="colorBest">—</b></span></div></section><div id="colorBoard" class="colorBoard" style="--color-cols:${level.cols}" role="grid" aria-label="${esc(t("board",l))}"></div><p id="colorMessage" class="gameMessage" aria-live="polite"></p><section class="gameActions colorGameActions"><button id="colorRestart" type="button">↻ ${esc(t("restart",l))}</button><button id="colorShuffle" type="button">⤨ ${esc(t("newGame",l))}</button></section><details class="gameRules"><summary>${esc(t("how",l))}</summary><p>${esc(t("howText",l))}</p></details><p class="gameLocalNote">📱 ${esc(t("local",l))}</p></main>`;

    const boardNode=$("#colorBoard"),message=$("#colorMessage"),timeNode=$("#colorTime"),movesNode=$("#colorMoves"),bestNode=$("#colorBest");
    function updateBest(){const best=loadRecord(level.id);bestNode.textContent=best?`${best.moves} · ${seconds(best.elapsed)}`:"—"}
    function startTimer(){
      if(started||finished)return;started=true;timerStartedAt=Date.now()-elapsed*1000;
      timer=setInterval(()=>{elapsed=Math.floor((Date.now()-timerStartedAt)/1000);if(timeNode)timeNode.textContent=seconds(elapsed)},1000);
    }
    function draw(){
      if(!boardNode)return;
      boardNode.innerHTML=board.map((color,index)=>`<button type="button" class="colorTile ${index===selected?"selected":""}" data-color-index="${index}" style="--tile-color:${palette(color)}" aria-label="${esc(t("board",l))}"></button>`).join("");
      movesNode.textContent=String(moves);updateBest();
      $$("[data-color-index]",boardNode).forEach(button=>button.addEventListener("click",()=>tap(Number(button.dataset.colorIndex))));
    }
    function tap(index){
      if(finished)return;
      if(selected<0){selected=index;message.textContent=t("selectNeighbor",l);draw();return}
      if(index===selected){selected=-1;message.textContent="";draw();return}
      if(!isAdjacent(selected,index,level.cols)){selected=index;message.textContent=t("invalidNeighbor",l);draw();return}
      startTimer();
      [board[selected],board[index]]=[board[index],board[selected]];
      selected=-1;moves++;message.textContent="";draw();
      if(solved(board,level.rows,level.cols))finish();
    }
    function reset(useInitial){
      clearInterval(timer);timer=null;started=false;finished=false;elapsed=0;timerStartedAt=0;moves=0;selected=-1;
      board=useInitial?[...initial]:makeBoard(level);if(!useInitial)initial=[...board];
      timeNode.textContent="00:00";message.textContent="";draw();
    }
    async function finish(){
      if(finished)return;finished=true;clearInterval(timer);timer=null;
      if(started&&timerStartedAt)elapsed=Math.max(elapsed,Math.floor((Date.now()-timerStartedAt)/1000));
      const best=saveRecord(level.id,moves,elapsed);
      const score=Math.max(100,100000-level.id*500-moves*25-elapsed*5);
      if(tournament){
        window.EduCashProSocial?.submitTournamentResult?.(tournament,{score,stats:{moves,level:level.id,durationMs:elapsed*1000}},{moves,level:level.id});
        return;
      }
      content().innerHTML=`<main class="gamePage colorLinesPage"><section class="hero"><span class="eyebrow">🎉 ${esc(t("solved",l))}</span><h1>${esc(t("level",l))} ${level.id}</h1><p>⏱ ${seconds(elapsed)} · 🔄 ${moves} ${esc(t("moves",l)).toLowerCase()}<br>${esc(t("best",l))}: ${best.moves} · ${seconds(best.elapsed)}</p></section><section class="gameActions colorFinishActions"><button id="colorAgain" class="wideButton">${esc(t("again",l))}</button>${level.id<LEVELS.length?`<button id="colorNext" class="secondaryButton">${esc(t("next",l))} →</button>`:""}<button id="colorLevels" class="secondaryButton">${esc(t("levels",l))}</button></section><p class="gameLocalNote">📱 ${esc(t("local",l))}</p></main>`;
      $("#colorAgain")?.addEventListener("click",()=>renderGame(level.id,l,null));
      $("#colorNext")?.addEventListener("click",()=>renderGame(level.id+1,l,null));
      $("#colorLevels")?.addEventListener("click",()=>levelSelector(l,null));
      window.scrollTo({top:0,behavior:"smooth"});
    }

    $(".colorLinesBack")?.addEventListener("click",()=>{clearInterval(timer);tournament?window.EduCashProSocial?.returnToTournament?.(tournament.code):levelSelector(l,null)});
    $("#colorRestart")?.addEventListener("click",()=>reset(true));
    $("#colorShuffle")?.addEventListener("click",()=>reset(false));
    draw();window.scrollTo({top:0,behavior:"auto"});
  }

  const previousLaunch=typeof suite.launchGame==="function"?suite.launchGame.bind(suite):null;
  suite.launchGame=function(gameId,options={}){
    if(gameId==="color-lines"){
      const l=lang(options.lang),tournament=options.tournament||null;
      const raw=tournament?.difficulty||options.level;
      if(raw)return renderGame(tournament?mapTournamentLevel(raw):Number(raw),l,tournament);
      return levelSelector(l,tournament);
    }
    return previousLaunch?.(gameId,options);
  };

  const observer=new MutationObserver(()=>queueMicrotask(decorateCatalog));
  observer.observe(document.documentElement,{childList:true,subtree:true});
  decorateCatalog();
  window.EduCashProColorLines={renderGame,levelSelector};
})();
