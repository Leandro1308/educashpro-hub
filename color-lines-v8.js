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
    pt:{colorLines:"Desafio das Cores",colorLinesSub:"Deslize as peças usando o espaço vazio e organize cada linha por cor.",choose:"Escolha o nível",level:"Nível",freeAll:"6 NÍVEIS LIVRES",free:"LIVRE",play:"Jogar",how:"Como jogar",howText:"Toque em uma peça encostada no espaço vazio para deslizá-la. Os movimentos são apenas para cima, baixo, esquerda ou direita. Organize o tabuleiro para que cada linha tenha uma única cor, cada linha use uma cor diferente e o espaço vazio termine no canto inferior direito.",time:"Tempo",moves:"Movimentos",best:"Melhor",restart:"Reiniciar",newGame:"Embaralhar novamente",levels:"Níveis",solved:"Nível concluído!",again:"Jogar novamente",next:"Próximo nível",local:"Partida, progresso e recordes ficam somente neste aparelho.",invalidMove:"Só é possível mover uma peça que esteja ao lado do espaço vazio.",board:"Tabuleiro de cores",blank:"Espaço vazio"},
    en:{colorLines:"Color Challenge",colorLinesSub:"Slide tiles through the empty space and organize every row by color.",choose:"Choose a level",level:"Level",freeAll:"6 FREE LEVELS",free:"FREE",play:"Play",how:"How to play",howText:"Tap a tile beside the empty space to slide it. Moves are only up, down, left or right. Arrange the board so every row has a single color, every row uses a different color, and the empty space finishes in the bottom-right corner.",time:"Time",moves:"Moves",best:"Best",restart:"Restart",newGame:"Shuffle again",levels:"Levels",solved:"Level complete!",again:"Play again",next:"Next level",local:"Game, progress and records stay on this device only.",invalidMove:"You can only move a tile next to the empty space.",board:"Color board",blank:"Empty space"},
    es:{colorLines:"Desafío de Colores",colorLinesSub:"Desliza las fichas usando el espacio vacío y organiza cada fila por color.",choose:"Elige el nivel",level:"Nivel",freeAll:"6 NIVELES LIBRES",free:"LIBRE",play:"Jugar",how:"Cómo jugar",howText:"Toca una ficha junto al espacio vacío para deslizarla. Los movimientos son solo arriba, abajo, izquierda o derecha. Organiza el tablero para que cada fila tenga un solo color, cada fila use un color diferente y el espacio vacío termine en la esquina inferior derecha.",time:"Tiempo",moves:"Movimientos",best:"Mejor",restart:"Reiniciar",newGame:"Mezclar de nuevo",levels:"Niveles",solved:"¡Nivel completado!",again:"Jugar de nuevo",next:"Siguiente nivel",local:"La partida, el progreso y los récords quedan solo en este dispositivo.",invalidMove:"Solo puedes mover una ficha que esté junto al espacio vacío.",board:"Tablero de colores",blank:"Espacio vacío"},
    ru:{colorLines:"Цветовой вызов",colorLinesSub:"Передвигайте плитки через пустую клетку и соберите каждый ряд по цвету.",choose:"Выберите уровень",level:"Уровень",freeAll:"6 БЕСПЛАТНЫХ УРОВНЕЙ",free:"СВОБОДНО",play:"Играть",how:"Как играть",howText:"Нажмите плитку рядом с пустой клеткой, чтобы передвинуть её. Движение возможно только вверх, вниз, влево или вправо. Соберите каждый ряд из одного цвета, используйте разные цвета для разных рядов и оставьте пустую клетку в правом нижнем углу.",time:"Время",moves:"Ходы",best:"Лучший",restart:"Сначала",newGame:"Перемешать снова",levels:"Уровни",solved:"Уровень пройден!",again:"Ещё раз",next:"Следующий уровень",local:"Игра, прогресс и рекорды хранятся только на этом устройстве.",invalidMove:"Можно двигать только плитку рядом с пустой клеткой.",board:"Цветовое поле",blank:"Пустая клетка"}
  };

  const LEVELS=[
    {id:1,cols:4,rows:4,scramble:36},
    {id:2,cols:4,rows:6,scramble:72},
    {id:3,cols:5,rows:8,scramble:150},
    {id:4,cols:6,rows:12,scramble:320},
    {id:5,cols:7,rows:16,scramble:560},
    {id:6,cols:8,rows:20,scramble:900}
  ];

  const t=(key,l)=>COPY[lang(l)]?.[key]||COPY.pt[key]||key;
  const previousText=typeof suite.text==="function"?suite.text.bind(suite):null;
  suite.text=function(key,l){return COPY[lang(l)]?.[key]||previousText?.(key,l)||key};
  suite.GAME_META=suite.GAME_META||{};
  suite.GAME_META["color-lines"]=["🎨","colorLines","colorLinesSub"];

  function seconds(value){return `${String(Math.floor(value/60)).padStart(2,"0")}:${String(value%60).padStart(2,"0")}`}
  function recordKey(level){return `ecp:color-lines:v2:level:${level}:best`}
  function loadRecord(level){try{return JSON.parse(localStorage.getItem(recordKey(level))||"null")}catch{return null}}
  function saveRecord(level,moves,elapsed){
    const old=loadRecord(level);
    const next=!old||moves<Number(old.moves)||moves===Number(old.moves)&&elapsed<Number(old.elapsed)?{moves,elapsed}:old;
    try{localStorage.setItem(recordKey(level),JSON.stringify(next))}catch{}
    return next;
  }
  function palette(index){
    const hue=Math.round((index*137.508)%360),saturation=68+(index%3)*7,lightness=48+(index%4)*4;
    return `hsl(${hue} ${saturation}% ${lightness}%)`;
  }
  function neighbors(index,rows,cols){
    const row=Math.floor(index/cols),col=index%cols,result=[];
    if(row>0)result.push(index-cols);
    if(row<rows-1)result.push(index+cols);
    if(col>0)result.push(index-1);
    if(col<cols-1)result.push(index+1);
    return result;
  }
  function solvedBoard(level){
    const board=[];
    for(let row=0;row<level.rows;row++)for(let col=0;col<level.cols;col++)board.push(row);
    board[board.length-1]=null;
    return board;
  }
  function isSolved(board,level){
    const last=board.length-1;
    if(board[last]!==null)return false;
    const seen=new Set();
    for(let row=0;row<level.rows;row++){
      const start=row*level.cols,end=start+level.cols;
      const cells=board.slice(start,end);
      if(row===level.rows-1){
        if(cells[cells.length-1]!==null)return false;
        cells.pop();
      }
      if(!cells.length||cells.some(value=>value===null||value!==cells[0]))return false;
      if(seen.has(cells[0]))return false;
      seen.add(cells[0]);
    }
    return seen.size===level.rows;
  }
  function makeBoard(level){
    const board=solvedBoard(level);
    let blank=board.length-1,previous=-1;
    for(let step=0;step<level.scramble;step++){
      let options=neighbors(blank,level.rows,level.cols).filter(index=>index!==previous);
      if(!options.length)options=neighbors(blank,level.rows,level.cols);
      const next=options[Math.floor(Math.random()*options.length)];
      board[blank]=board[next];board[next]=null;
      previous=blank;blank=next;
    }
    if(isSolved(board,level)){
      const next=neighbors(blank,level.rows,level.cols)[0];
      board[blank]=board[next];board[next]=null;
    }
    return board;
  }

  function decorateCatalog(){
    const button=$("[data-play='color-lines']"),card=button?.closest(".gameCardV2");
    if(!card)return;
    const badges=$(".gameBadges",card);
    if(badges)badges.innerHTML=`<span class="gameBadge">${esc(t("freeAll",lang()))}</span>`;
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

  function renderGame(levelId,requested,tournament=null){
    const l=lang(requested),level=LEVELS.find(item=>item.id===Number(levelId))||LEVELS[0];
    bridge.currentGame="color-lines";
    let board=makeBoard(level),initial=[...board],moves=0,elapsed=0,finished=false,timer=null,started=false,timerStartedAt=0;

    content().innerHTML=`<main class="gamePage colorLinesPage playing"><button class="textButton colorLinesBack" type="button">←</button><section class="colorGameHeader"><div><span class="eyebrow">🎨 ${esc(t("level",l))} ${level.id} · ${level.cols} × ${level.rows}</span><h1>${esc(t("colorLines",l))}</h1></div><div class="colorStats"><span><small>${esc(t("time",l))}</small><b id="colorTime">00:00</b></span><span><small>${esc(t("moves",l))}</small><b id="colorMoves">0</b></span><span><small>${esc(t("best",l))}</small><b id="colorBest">—</b></span></div></section><div id="colorBoard" class="colorBoard" style="--color-cols:${level.cols}" role="grid" aria-label="${esc(t("board",l))}"></div><p id="colorMessage" class="gameMessage" aria-live="polite"></p><section class="gameActions colorGameActions"><button id="colorRestart" type="button">↻ ${esc(t("restart",l))}</button><button id="colorShuffle" type="button">⤨ ${esc(t("newGame",l))}</button></section><details class="gameRules"><summary>${esc(t("how",l))}</summary><p>${esc(t("howText",l))}</p></details><p class="gameLocalNote">📱 ${esc(t("local",l))}</p></main>`;

    const boardNode=$("#colorBoard"),message=$("#colorMessage"),timeNode=$("#colorTime"),movesNode=$("#colorMoves"),bestNode=$("#colorBest");
    function updateBest(){const best=loadRecord(level.id);bestNode.textContent=best?`${best.moves} · ${seconds(best.elapsed)}`:"—"}
    function startTimer(){
      if(started||finished)return;
      started=true;timerStartedAt=Date.now()-elapsed*1000;
      timer=setInterval(()=>{elapsed=Math.floor((Date.now()-timerStartedAt)/1000);if(timeNode)timeNode.textContent=seconds(elapsed)},1000);
    }
    function draw(){
      if(!boardNode)return;
      const blank=board.indexOf(null),movable=new Set(neighbors(blank,level.rows,level.cols));
      boardNode.innerHTML=board.map((color,index)=>color===null
        ?`<span class="colorTile colorBlank" role="gridcell" aria-label="${esc(t("blank",l))}"></span>`
        :`<button type="button" class="colorTile ${movable.has(index)?"movable":""}" data-color-index="${index}" style="--tile-color:${palette(color)}" aria-label="${esc(t("board",l))}"></button>`).join("");
      movesNode.textContent=String(moves);updateBest();
      $$("[data-color-index]",boardNode).forEach(button=>button.addEventListener("click",()=>tap(Number(button.dataset.colorIndex))));
    }
    function tap(index){
      if(finished)return;
      const blank=board.indexOf(null);
      if(!neighbors(blank,level.rows,level.cols).includes(index)){
        message.textContent=t("invalidMove",l);
        return;
      }
      startTimer();
      board[blank]=board[index];board[index]=null;
      moves++;message.textContent="";draw();
      if(isSolved(board,level))finish();
    }
    function reset(useInitial){
      clearInterval(timer);timer=null;started=false;finished=false;elapsed=0;timerStartedAt=0;moves=0;
      board=useInitial?[...initial]:makeBoard(level);if(!useInitial)initial=[...board];
      timeNode.textContent="00:00";message.textContent="";draw();
    }
    function finish(){
      if(finished)return;
      finished=true;clearInterval(timer);timer=null;
      if(started&&timerStartedAt)elapsed=Math.max(elapsed,Math.floor((Date.now()-timerStartedAt)/1000));
      const best=saveRecord(level.id,moves,elapsed),score=Math.max(100,100000-level.id*500-moves*25-elapsed*5);
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
      const l=lang(options.lang),tournament=options.tournament||null,raw=tournament?.difficulty||options.level;
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
