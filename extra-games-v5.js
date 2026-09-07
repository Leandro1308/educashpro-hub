(function(){
  "use strict";
  const suite=window.EduCashProGameSuite;
  const base=window.EduCashProMentalGames;
  const bridge=window.EduCashProGameBridge||(window.EduCashProGameBridge={session:null,catalogContext:{},currentGame:null});
  if(!suite||!base)return;

  const $=(s,r=document)=>r.querySelector(s);
  const $$=(s,r=document)=>[...r.querySelectorAll(s)];
  const content=()=>document.getElementById("content");
  const esc=v=>String(v??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
  const getLang=v=>suite.lang?.(v)||"pt";
  const isActive=()=>suite.active?.()===true;
  const fmtTime=seconds=>`${String(Math.floor(seconds/60)).padStart(2,"0")}:${String(seconds%60).padStart(2,"0")}`;
  const cloneStacks=stacks=>stacks.map(s=>[...s]);

  const COPY={
    pt:{blockGrid:"Blocos 8×8",blockGridSub:"Encaixe peças, complete linhas e colunas e aumente sua pontuação.",nutSort:"Porcas & Cores",nutSortSub:"Organize as porcas para deixar cada haste com apenas uma cor.",play:"Jogar",tournament:"Criar torneio",free3:"FÁCIL · MÉDIO · DIFÍCIL LIVRES",nerdOnly:"NERD ASSINANTE",choose:"Escolha o nível",easy:"Fácil",medium:"Médio",hard:"Difícil",nerd:"Nerd",free:"LIVRE",subscriber:"ASSINANTE",how:"Como jogar",blockHow:"Escolha uma das três peças e depois toque no tabuleiro para posicioná-la. Linhas ou colunas completas desaparecem e valem pontos. A partida termina quando nenhuma peça restante couber.",nutHow:"Toque em uma haste para selecionar a porca do topo e depois toque em outra haste. A jogada é válida quando a haste está vazia ou tem no topo uma porca da mesma cor. Organize todas as cores para vencer.",score:"Pontos",record:"Recorde",moves:"Jogadas",lines:"Linhas",time:"Tempo",restart:"Reiniciar",undo:"Desfazer",hint:"Dica",gameOver:"Fim da partida",solved:"Desafio concluído!",again:"Jogar novamente",levels:"Níveis",selected:"Peça selecionada",invalid:"Essa peça não cabe aí.",noMove:"Nenhuma peça restante cabe no tabuleiro.",tipBlock:"Toque em uma peça abaixo e depois em uma casa do tabuleiro.",tipNut:"Selecione uma haste e escolha o destino."},
    en:{blockGrid:"Blocks 8×8",blockGridSub:"Place pieces, complete rows and columns, and build your score.",nutSort:"Nuts & Colors",nutSortSub:"Sort the nuts so each bolt contains a single color.",play:"Play",tournament:"Create tournament",free3:"EASY · MEDIUM · HARD FREE",nerdOnly:"NERD SUBSCRIBER",choose:"Choose a level",easy:"Easy",medium:"Medium",hard:"Hard",nerd:"Nerd",free:"FREE",subscriber:"SUBSCRIBER",how:"How to play",blockHow:"Choose one of the three pieces, then tap the board to place it. Complete rows or columns to clear them and score points. The game ends when none of the remaining pieces fit.",nutHow:"Tap a bolt to select its top nut, then tap another bolt. A move is valid when the target is empty or its top nut has the same color. Sort every color to win.",score:"Score",record:"Record",moves:"Moves",lines:"Lines",time:"Time",restart:"Restart",undo:"Undo",hint:"Hint",gameOver:"Game over",solved:"Challenge complete!",again:"Play again",levels:"Levels",selected:"Selected piece",invalid:"That piece does not fit there.",noMove:"None of the remaining pieces fit on the board.",tipBlock:"Tap a piece below, then tap a board cell.",tipNut:"Select a bolt and choose its destination."},
    es:{blockGrid:"Bloques 8×8",blockGridSub:"Coloca piezas, completa filas y columnas y aumenta tu puntuación.",nutSort:"Tuercas y Colores",nutSortSub:"Ordena las tuercas para que cada perno tenga un solo color.",play:"Jugar",tournament:"Crear torneo",free3:"FÁCIL · MEDIO · DIFÍCIL LIBRES",nerdOnly:"NERD SUSCRIPTOR",choose:"Elige el nivel",easy:"Fácil",medium:"Medio",hard:"Difícil",nerd:"Nerd",free:"LIBRE",subscriber:"SUSCRIPTOR",how:"Cómo jugar",blockHow:"Elige una de las tres piezas y toca el tablero para colocarla. Las filas o columnas completas desaparecen y dan puntos. La partida termina cuando ninguna pieza restante cabe.",nutHow:"Toca un perno para seleccionar la tuerca superior y luego otro perno. El movimiento es válido si el destino está vacío o tiene arriba una tuerca del mismo color. Ordena todos los colores para ganar.",score:"Puntos",record:"Récord",moves:"Movimientos",lines:"Líneas",time:"Tiempo",restart:"Reiniciar",undo:"Deshacer",hint:"Pista",gameOver:"Fin de partida",solved:"¡Desafío completado!",again:"Jugar de nuevo",levels:"Niveles",selected:"Pieza seleccionada",invalid:"Esa pieza no cabe ahí.",noMove:"Ninguna de las piezas restantes cabe en el tablero.",tipBlock:"Toca una pieza y después una casilla del tablero.",tipNut:"Selecciona un perno y elige el destino."},
    ru:{blockGrid:"Блоки 8×8",blockGridSub:"Размещайте фигуры, заполняйте ряды и столбцы и набирайте очки.",nutSort:"Гайки и цвета",nutSortSub:"Разложите гайки так, чтобы на каждом стержне был только один цвет.",play:"Играть",tournament:"Создать турнир",free3:"ЛЁГКИЙ · СРЕДНИЙ · СЛОЖНЫЙ — СВОБОДНО",nerdOnly:"NERD — ПОДПИСКА",choose:"Выберите уровень",easy:"Лёгкий",medium:"Средний",hard:"Сложный",nerd:"Nerd",free:"СВОБОДНО",subscriber:"ПОДПИСКА",how:"Как играть",blockHow:"Выберите одну из трёх фигур и нажмите на поле, чтобы разместить её. Полные ряды и столбцы исчезают и дают очки. Игра заканчивается, когда ни одна оставшаяся фигура не помещается.",nutHow:"Нажмите на стержень, чтобы выбрать верхнюю гайку, затем выберите другой стержень. Ход разрешён, если место пустое или сверху гайка того же цвета. Разложите все цвета, чтобы победить.",score:"Очки",record:"Рекорд",moves:"Ходы",lines:"Линии",time:"Время",restart:"Сначала",undo:"Отменить",hint:"Подсказка",gameOver:"Игра окончена",solved:"Задание выполнено!",again:"Ещё раз",levels:"Уровни",selected:"Фигура выбрана",invalid:"Эта фигура здесь не помещается.",noMove:"Оставшиеся фигуры больше не помещаются.",tipBlock:"Выберите фигуру, затем клетку поля.",tipNut:"Выберите стержень и место назначения."}
  };
  const t=(key,l)=>COPY[getLang(l)]?.[key]||COPY.pt[key]||key;
  const originalText=suite.text?.bind(suite);
  suite.text=function(key,l){return COPY[getLang(l)]?.[key]||originalText?.(key,l)||key};
  suite.GAME_META["block-grid"]=["🧱","blockGrid","blockGridSub"];
  suite.GAME_META["nut-sort"]=["🔩","nutSort","nutSortSub"];

  function stopTimer(timer){if(timer)clearInterval(timer)}
  function showPaywall(l){suite.paywall?.("nerd",l)}
  function backCatalog(){suite.renderCatalog?.(bridge.catalogContext||{})}
  function normalizeLevel(level){return level==="basic"?"easy":level==="advanced"?"hard":level||"medium"}

  function levelSelector(gameId,l,tournament){
    const levels=["easy","medium","hard","nerd"];
    bridge.currentGame=gameId;
    content().innerHTML=`<main class="gamePage extraGamePage"><button class="textButton extraBack" type="button">←</button><section class="hero"><span class="eyebrow">${esc(gameId==="block-grid"?t("blockGrid",l):t("nutSort",l))}</span><h1>${esc(t("choose",l))}</h1><p>${esc(gameId==="block-grid"?t("blockGridSub",l):t("nutSortSub",l))}</p></section><section class="levelGrid extraLevelGrid">${levels.map(level=>{const locked=level==="nerd"&&!isActive()&&!tournament;return`<button class="levelCard ${locked?"locked":""}" data-extra-level="${level}">${locked?'<span class="lock">🔒</span>':""}<strong>${esc(t(level,l))}</strong><small>${esc(level==="nerd"?t("subscriber",l):t("free",l))}</small></button>`}).join("")}</section></main>`;
    $(".extraBack")?.addEventListener("click",backCatalog);
    $$('[data-extra-level]').forEach(btn=>btn.addEventListener("click",()=>{const level=btn.dataset.extraLevel;if(level==="nerd"&&!isActive()&&!tournament)return showPaywall(l);gameId==="block-grid"?renderBlock(level,l,tournament):renderNutSort(level,l,tournament)}));
    window.scrollTo({top:0,behavior:"auto"});
  }

  const BLOCK_COLORS=["mint","blue","amber","lilac","coral"];
  const SHAPES={
    easy:[[[0,0]],[[0,0],[0,1]],[[0,0],[1,0]],[[0,0],[0,1],[1,0]],[[0,0],[0,1],[1,0],[1,1]],[[0,0],[0,1],[0,2]]],
    medium:[[[0,0],[0,1],[0,2],[0,3]],[[0,0],[1,0],[2,0]],[[0,0],[0,1],[1,1],[1,2]],[[0,1],[1,0],[1,1],[1,2]],[[0,0],[1,0],[2,0],[2,1]],[[0,0],[0,1],[1,0],[1,1]]],
    hard:[[[0,0],[0,1],[0,2],[1,0],[2,0]],[[0,0],[0,1],[0,2],[1,1],[2,1]],[[0,0],[0,1],[0,2],[1,0],[1,1],[1,2]],[[0,0],[0,1],[0,2],[0,3],[0,4]],[[0,0],[1,0],[2,0],[3,0]],[[0,0],[0,1],[0,2],[1,0],[1,1],[1,2],[2,0],[2,1],[2,2]]],
    nerd:[[[0,0],[0,1],[0,2],[1,0],[2,0],[2,1]],[[0,0],[0,1],[1,1],[2,1],[2,2]],[[0,0],[0,1],[0,2],[1,2],[2,2],[2,1]],[[0,0],[1,0],[1,1],[2,1],[2,2]],[[0,0],[0,1],[0,2],[0,3],[1,0],[1,3]],[[0,0],[0,1],[0,2],[1,0],[1,1],[1,2],[2,1]]]
  };
  function randomInt(n){return Math.floor(Math.random()*n)}
  function rotate(shape){const turned=shape.map(([r,c])=>[c,-r]),minR=Math.min(...turned.map(x=>x[0])),minC=Math.min(...turned.map(x=>x[1]));return turned.map(([r,c])=>[r-minR,c-minC])}
  function randomShape(level){let shape=SHAPES[level][randomInt(SHAPES[level].length)].map(p=>[...p]);for(let i=0,n=randomInt(4);i<n;i++)shape=rotate(shape);return shape}
  function pieceHtml(piece,index,selected,l){if(!piece)return`<div class="blockPieceSlot used"></div>`;const maxR=Math.max(...piece.shape.map(p=>p[0])),maxC=Math.max(...piece.shape.map(p=>p[1]));return`<button class="blockPieceSlot ${selected===index?"selected":""}" data-piece-index="${index}" type="button" aria-label="${esc(t("selected",l))}"><span class="blockPiecePreview" style="--pr:${maxR+1};--pc:${maxC+1}">${piece.shape.map(([r,c])=>`<i class="blockMini ${piece.color}" style="grid-row:${r+1};grid-column:${c+1}"></i>`).join("")}</span></button>`}

  function renderBlock(level,l,tournament){
    bridge.currentGame="block-grid";
    const size=8,board=Array(64).fill(""),startedAt=Date.now(),prefill={easy:0,medium:5,hard:9,nerd:13}[level]||0,maxSeconds=Number(tournament?.maxSeconds||0),highKey=`ecp:block-grid:${level}:high`;
    let pieces=[],selected=0,score=0,moves=0,lines=0,seconds=0,timer=null,finished=false,toastTimer=null;
    for(let i=0;i<prefill;i++){let idx=randomInt(64),guard=0;while(board[idx]&&guard++<100)idx=randomInt(64);board[idx]=BLOCK_COLORS[randomInt(BLOCK_COLORS.length)]}
    function newPieces(){pieces=Array.from({length:3},()=>({shape:randomShape(level),color:BLOCK_COLORS[randomInt(BLOCK_COLORS.length)]}));selected=0}
    function canPlace(shape,r,c){return shape.every(([dr,dc])=>r+dr<size&&c+dc<size&&!board[(r+dr)*size+(c+dc)])}
    function anyFit(piece){if(!piece)return false;for(let r=0;r<size;r++)for(let c=0;c<size;c++)if(canPlace(piece.shape,r,c))return true;return false}
    function clearLines(){const rows=[],cols=[];for(let r=0;r<size;r++)if(Array.from({length:size},(_,c)=>board[r*size+c]).every(Boolean))rows.push(r);for(let c=0;c<size;c++)if(Array.from({length:size},(_,r)=>board[r*size+c]).every(Boolean))cols.push(c);const remove=new Set();rows.forEach(r=>{for(let c=0;c<size;c++)remove.add(r*size+c)});cols.forEach(c=>{for(let r=0;r<size;r++)remove.add(r*size+c)});remove.forEach(i=>board[i]="");const count=rows.length+cols.length;if(count){lines+=count;score+=count*20+Math.max(0,count-1)*15}}
    function showToast(msg){const node=$("#blockToast");if(!node)return;node.textContent=msg;node.classList.add("show");clearTimeout(toastTimer);toastTimer=setTimeout(()=>node.classList.remove("show"),950)}
    function place(r,c){if(finished)return;const piece=pieces[selected];if(!piece||!canPlace(piece.shape,r,c)){showToast(t("invalid",l));return}piece.shape.forEach(([dr,dc])=>board[(r+dr)*size+(c+dc)]=piece.color);score+=piece.shape.length;moves++;clearLines();pieces[selected]=null;if(!pieces.some(Boolean))newPieces();else selected=pieces.findIndex(Boolean);draw();if(!pieces.filter(Boolean).some(anyFit))finish(t("noMove",l))}
    function draw(){
      content().innerHTML=`<main class="gamePage extraGamePage blockGamePage"><button class="textButton extraBack" type="button">←</button><div class="extraGameTop"><div><span class="eyebrow">${esc(t("blockGrid",l))} · ${esc(t(level,l))}</span><p>${esc(t("tipBlock",l))}</p></div><div class="extraStats"><span>⭐ <b>${score}</b></span><span>⏱ <b id="blockTime">${fmtTime(seconds)}</b></span><span>↗ <b>${moves}</b></span></div></div><section class="blockBoard">${board.map((cell,i)=>`<button type="button" class="blockCell ${cell?`filled ${cell}`:""}" data-block-cell="${i}"></button>`).join("")}</section><div id="blockToast" class="extraGameToast"></div><section class="blockTray">${pieces.map((p,i)=>pieceHtml(p,i,selected,l)).join("")}</section><div class="extraActions"><button id="blockHow" class="secondaryButton">📘 ${esc(t("how",l))}</button><button id="blockRestart" class="secondaryButton">↻ ${esc(t("restart",l))}</button></div></main>`;
      $(".extraBack")?.addEventListener("click",()=>{stopTimer(timer);tournament?window.EduCashProSocial?.returnToTournament?.(tournament.code):levelSelector("block-grid",l,null)});
      $$('[data-piece-index]').forEach(btn=>btn.addEventListener("click",()=>{selected=Number(btn.dataset.pieceIndex);draw()}));
      $$('[data-block-cell]').forEach(btn=>btn.addEventListener("click",()=>{const i=Number(btn.dataset.blockCell);place(Math.floor(i/size),i%size)}));
      $("#blockHow")?.addEventListener("click",()=>alert(t("blockHow",l)));
      $("#blockRestart")?.addEventListener("click",()=>{stopTimer(timer);renderBlock(level,l,tournament)});
    }
    function finish(reason){if(finished)return;finished=true;stopTimer(timer);const durationMs=Date.now()-startedAt,record=Math.max(Number(localStorage.getItem(highKey)||0),score);localStorage.setItem(highKey,String(record));if(tournament){window.EduCashProSocial?.submitTournamentResult?.(tournament,{score,stats:{moves,lines,durationMs}},{moves,lines});return}content().innerHTML=`<main class="gamePage extraGamePage"><section class="hero"><span class="eyebrow">${esc(t("gameOver",l))}</span><h1>⭐ ${score}</h1><p>${esc(reason||"")}<br>${esc(t("record",l))}: <b>${record}</b> · ${esc(t("lines",l))}: ${lines} · ${esc(t("moves",l))}: ${moves}</p></section><div class="extraActions"><button id="blockAgain" class="wideButton">${esc(t("again",l))}</button><button id="blockLevels" class="secondaryButton">${esc(t("levels",l))}</button></div></main>`;$("#blockAgain").onclick=()=>renderBlock(level,l,null);$("#blockLevels").onclick=()=>levelSelector("block-grid",l,null)}
    newPieces();draw();timer=setInterval(()=>{seconds=Math.floor((Date.now()-startedAt)/1000);const el=$("#blockTime");if(el)el.textContent=fmtTime(seconds);if(maxSeconds&&seconds>=maxSeconds)finish()},1000);window.scrollTo({top:0,behavior:"auto"});
  }

  const NUT_COLORS=["mint","blue","amber","coral","lilac","cyan"],NUT_ICONS=["●","◆","▲","♥","✦","✚"];
  function makeNutPuzzle(level){
    const cfg={easy:{colors:3,cap:4,empty:1,steps:14},medium:{colors:4,cap:4,empty:2,steps:24},hard:{colors:5,cap:4,empty:2,steps:38},nerd:{colors:6,cap:5,empty:2,steps:58}}[level];
    const stacks=Array.from({length:cfg.colors},(_,c)=>Array(cfg.cap).fill(c)).concat(Array.from({length:cfg.empty},()=>[]));
    for(let step=0;step<cfg.steps;step++){
      const candidates=[];
      for(let d=0;d<stacks.length;d++){const dest=stacks[d];if(!dest.length)continue;const color=dest.at(-1),under=dest.at(-2);if(dest.length>1&&under!==color)continue;for(let s=0;s<stacks.length;s++){if(s===d||stacks[s].length>=cfg.cap)continue;const top=stacks[s].at(-1),mixed=stacks[s].length&&top!==color?2:stacks[s].length?1:0;candidates.push({d,s,mixed})}}
      if(!candidates.length)break;const max=Math.max(...candidates.map(c=>c.mixed)),best=candidates.filter(x=>x.mixed===max),move=best[randomInt(best.length)];stacks[move.s].push(stacks[move.d].pop());
    }
    return{stacks,cfg};
  }
  function renderNutSort(level,l,tournament){
    bridge.currentGame="nut-sort";
    const generated=makeNutPuzzle(level),cap=generated.cfg.cap,initial=cloneStacks(generated.stacks),startedAt=Date.now(),maxSeconds=Number(tournament?.maxSeconds||0);
    let stacks=cloneStacks(initial),selected=null,moves=0,seconds=0,timer=null,finished=false,history=[];
    const uniform=s=>s.length&&s.every(v=>v===s[0]);
    const solved=()=>stacks.every(s=>!s.length||(s.length===cap&&uniform(s)));
    function valid(from,to){if(from===to||!stacks[from]?.length||stacks[to].length>=cap)return false;const color=stacks[from].at(-1),top=stacks[to].at(-1);return top===undefined||top===color}
    function move(from,to){if(!valid(from,to))return false;const color=stacks[from].pop();stacks[to].push(color);history.push({from,to,color});moves++;selected=null;draw();if(solved())finish();return true}
    function hint(){const candidates=[];for(let f=0;f<stacks.length;f++)for(let to=0;to<stacks.length;to++)if(valid(f,to)){const color=stacks[f].at(-1),top=stacks[to].at(-1),value=top===color?3:stacks[to].length===0?1:0;if(!(uniform(stacks[f])&&stacks[f].length===cap&&stacks[to].length===0))candidates.push({f,to,value})}if(!candidates.length)return;const best=Math.max(...candidates.map(x=>x.value)),pick=candidates.find(x=>x.value===best);selected=pick.f;draw();const target=$(`[data-bolt="${pick.to}"]`);target?.classList.add("hintTarget");setTimeout(()=>target?.classList.remove("hintTarget"),1500)}
    function clickBolt(index){if(finished)return;if(selected===null){if(stacks[index].length){selected=index;draw()}return}if(index===selected){selected=null;draw();return}if(!move(selected,index)){if(stacks[index].length){selected=index;draw()}else{const target=$(`[data-bolt="${index}"]`);target?.classList.add("shake");setTimeout(()=>target?.classList.remove("shake"),400)}}}
    function undo(){const last=history.pop();if(!last)return;const color=stacks[last.to].pop();stacks[last.from].push(color);moves=Math.max(0,moves-1);selected=null;draw()}
    function draw(){
      content().innerHTML=`<main class="gamePage extraGamePage nutGamePage"><button class="textButton extraBack" type="button">←</button><div class="extraGameTop"><div><span class="eyebrow">${esc(t("nutSort",l))} · ${esc(t(level,l))}</span><p>${esc(t("tipNut",l))}</p></div><div class="extraStats"><span>↗ <b>${moves}</b></span><span>⏱ <b id="nutTime">${fmtTime(seconds)}</b></span></div></div><section class="nutBoard">${stacks.map((stack,i)=>`<button type="button" class="nutBolt ${selected===i?"selected":""}" data-bolt="${i}"><span class="nutCap"></span><span class="nutRod"></span><span class="nutStack">${stack.map(color=>`<i class="nutPiece ${NUT_COLORS[color]}"><b>${NUT_ICONS[color]}</b></i>`).join("")}</span><span class="nutBase"></span></button>`).join("")}</section><div class="extraActions"><button id="nutUndo" class="secondaryButton" ${history.length?"":"disabled"}>↶ ${esc(t("undo",l))}</button><button id="nutHint" class="secondaryButton">💡 ${esc(t("hint",l))}</button><button id="nutRestart" class="secondaryButton">↻ ${esc(t("restart",l))}</button><button id="nutHow" class="secondaryButton">📘 ${esc(t("how",l))}</button></div></main>`;
      $(".extraBack")?.addEventListener("click",()=>{stopTimer(timer);tournament?window.EduCashProSocial?.returnToTournament?.(tournament.code):levelSelector("nut-sort",l,null)});
      $$('[data-bolt]').forEach(btn=>btn.addEventListener("click",()=>clickBolt(Number(btn.dataset.bolt))));
      $("#nutUndo")?.addEventListener("click",undo);$("#nutHint")?.addEventListener("click",hint);$("#nutRestart")?.addEventListener("click",()=>{stacks=cloneStacks(initial);selected=null;moves=0;history=[];draw()});$("#nutHow")?.addEventListener("click",()=>alert(t("nutHow",l)));
    }
    function finish(){if(finished)return;finished=true;stopTimer(timer);const durationMs=Date.now()-startedAt,baseScore={easy:3000,medium:5000,hard:7000,nerd:10000}[level],score=Math.max(100,baseScore-moves*35-seconds*4);if(tournament){window.EduCashProSocial?.submitTournamentResult?.(tournament,{score,stats:{moves,durationMs}},{moves});return}content().innerHTML=`<main class="gamePage extraGamePage"><section class="hero"><span class="eyebrow">${esc(t("solved",l))}</span><h1>🏆 ${score}</h1><p>${esc(t("moves",l))}: <b>${moves}</b> · ${esc(t("time",l))}: <b>${fmtTime(seconds)}</b></p></section><div class="extraActions"><button id="nutAgain" class="wideButton">${esc(t("again",l))}</button><button id="nutLevels" class="secondaryButton">${esc(t("levels",l))}</button></div></main>`;$("#nutAgain").onclick=()=>renderNutSort(level,l,null);$("#nutLevels").onclick=()=>levelSelector("nut-sort",l,null)}
    draw();timer=setInterval(()=>{seconds=Math.floor((Date.now()-startedAt)/1000);const el=$("#nutTime");if(el)el.textContent=fmtTime(seconds);if(maxSeconds&&seconds>=maxSeconds)finish()},1000);window.scrollTo({top:0,behavior:"auto"});
  }

  function card(gameId,l){const block=gameId==="block-grid";return`<article class="gameCardV2 extraGameCard"><div class="gameCardArt">${block?"🧱":"🔩"}</div><h3>${esc(t(block?"blockGrid":"nutSort",l))}</h3><p>${esc(t(block?"blockGridSub":"nutSortSub",l))}</p><div class="gameBadges"><span class="gameBadge">${esc(t("free3",l))}</span><span class="gameBadge premium">${esc(t("nerdOnly",l))}</span></div><div class="gameCardActions"><button class="gamePlayBtn" data-extra-play="${gameId}">${esc(t("play",l))}</button><button class="gameTournamentBtn" data-extra-tournament="${gameId}">🏆 ${esc(t("tournament",l))}</button></div></article>`}
  function decorateCatalog(){const grid=$(".gameSuite .gameCatalogV2");if(!grid||grid.dataset.extraGames==="1")return;grid.dataset.extraGames="1";const l=getLang();grid.insertAdjacentHTML("beforeend",card("block-grid",l)+card("nut-sort",l))}

  const oldLaunch=suite.launchGame.bind(suite);
  suite.launchGame=function(gameId,options={}){if(gameId==="block-grid"||gameId==="nut-sort"){const l=getLang(options.lang),tournament=options.tournament||null,raw=tournament?.difficulty||options.level,level=normalizeLevel(raw);if(level==="nerd"&&!isActive()&&!tournament)return showPaywall(l);return raw?(gameId==="block-grid"?renderBlock(level,l,tournament):renderNutSort(level,l,tournament)):levelSelector(gameId,l,tournament)}return oldLaunch(gameId,options)};

  document.addEventListener("click",event=>{const play=event.target.closest?.("[data-extra-play]");if(play){event.preventDefault();suite.launchGame(play.dataset.extraPlay,{lang:getLang()});return}const tournament=event.target.closest?.("[data-extra-tournament]");if(tournament){event.preventDefault();window.EduCashProSocial?.openTournament?.(tournament.dataset.extraTournament,{lang:getLang()})}});
  const observer=new MutationObserver(decorateCatalog),host=content();if(host)observer.observe(host,{childList:true});decorateCatalog();
  const oldBoot=base.bootPublic?.bind(base);base.bootPublic=async function(params){const game=String(params?.get?.("game")||"");if(game==="block-grid"||game==="nut-sort"){suite.launchGame(game,{lang:params.get("lang")});return true}return oldBoot?oldBoot(params):false};
  window.EduCashProExtraGamesV5={renderBlock,renderNutSort,levelSelector};
})();