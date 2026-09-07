(function(){
  "use strict";

  const suite=window.EduCashProGameSuite;
  const base=window.EduCashProMentalGames;
  const bridge=window.EduCashProGameBridge||(window.EduCashProGameBridge={session:null,catalogContext:{},currentGame:null});
  if(!suite)return;

  const $=(s,r=document)=>r.querySelector(s);
  const content=()=>document.getElementById("content");
  const esc=v=>String(v??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
  const lang=v=>suite.lang?.(v)||"pt";
  const active=()=>suite.active?.()===true;

  const COPY={
    pt:{title:"Blocos em Queda",sub:"Mova, gire e complete linhas antes que os blocos alcancem o topo.",choose:"Escolha o nível",easy:"Fácil",medium:"Médio",hard:"Difícil",nerd:"Nerd",free:"LIVRE",subscriber:"ASSINANTE",score:"Pontos",lines:"Linhas",record:"Recorde",next:"Próxima",how:"Como jogar",restart:"Reiniciar",levels:"Níveis",again:"Jogar novamente",over:"Fim da partida",help:"Os blocos descem automaticamente. Use ◀ e ▶ para mover, ↻ para girar, ▼ para descer uma casa e ⤓ para encaixar imediatamente. Complete uma linha inteira para fazê-la desaparecer. A partida termina quando uma nova peça não consegue entrar no topo."},
    en:{title:"Falling Blocks",sub:"Move, rotate and clear lines before the blocks reach the top.",choose:"Choose a level",easy:"Easy",medium:"Medium",hard:"Hard",nerd:"Nerd",free:"FREE",subscriber:"SUBSCRIBER",score:"Score",lines:"Lines",record:"Record",next:"Next",how:"How to play",restart:"Restart",levels:"Levels",again:"Play again",over:"Game over",help:"Blocks fall automatically. Use ◀ and ▶ to move, ↻ to rotate, ▼ to move down one row and ⤓ to drop instantly. Complete a full row to clear it. The game ends when a new piece cannot enter from the top."},
    es:{title:"Bloques en Caída",sub:"Mueve, gira y completa líneas antes de que los bloques lleguen arriba.",choose:"Elige el nivel",easy:"Fácil",medium:"Medio",hard:"Difícil",nerd:"Nerd",free:"LIBRE",subscriber:"SUSCRIPTOR",score:"Puntos",lines:"Líneas",record:"Récord",next:"Siguiente",how:"Cómo jugar",restart:"Reiniciar",levels:"Niveles",again:"Jugar de nuevo",over:"Fin de partida",help:"Los bloques caen automáticamente. Usa ◀ y ▶ para mover, ↻ para girar, ▼ para bajar una fila y ⤓ para encajar al instante. Completa una fila entera para eliminarla. La partida termina cuando una nueva pieza ya no puede entrar por arriba."},
    ru:{title:"Падающие блоки",sub:"Двигайте, вращайте и очищайте линии, пока блоки не достигли верха.",choose:"Выберите уровень",easy:"Лёгкий",medium:"Средний",hard:"Сложный",nerd:"Nerd",free:"СВОБОДНО",subscriber:"ПОДПИСКА",score:"Очки",lines:"Линии",record:"Рекорд",next:"Следующая",how:"Как играть",restart:"Сначала",levels:"Уровни",again:"Ещё раз",over:"Игра окончена",help:"Блоки падают автоматически. ◀ и ▶ двигают фигуру, ↻ вращает, ▼ опускает на одну клетку, ⤓ сразу ставит вниз. Полный ряд исчезает. Игра заканчивается, когда новая фигура не помещается сверху."}
  };
  const t=(k,l)=>COPY[lang(l)]?.[k]||COPY.pt[k]||k;

  const previousText=typeof suite.text==="function"?suite.text.bind(suite):null;
  suite.text=function(key,l){
    if(key==="fallBlocks")return t("title",l);
    if(key==="fallBlocksSub")return t("sub",l);
    return previousText?previousText(key,l):key;
  };
  suite.GAME_META=suite.GAME_META||{};
  suite.GAME_META["block-grid"]=["🧩","fallBlocks","fallBlocksSub"];

  const ROWS=18,COLS=10;
  const COLORS={I:"cyan",J:"blue",L:"amber",O:"yellow",S:"mint",T:"lilac",Z:"coral"};
  const SHAPES={
    I:[[0,0],[0,1],[0,2],[0,3]],
    J:[[0,0],[1,0],[1,1],[1,2]],
    L:[[0,2],[1,0],[1,1],[1,2]],
    O:[[0,0],[0,1],[1,0],[1,1]],
    S:[[0,1],[0,2],[1,0],[1,1]],
    T:[[0,1],[1,0],[1,1],[1,2]],
    Z:[[0,0],[0,1],[1,1],[1,2]]
  };
  const LEVELS={
    easy:{speed:850,pool:["I","J","L","O","T"]},
    medium:{speed:650,pool:["I","J","L","O","S","T","Z"]},
    hard:{speed:460,pool:["I","J","L","O","S","T","Z"]},
    nerd:{speed:300,pool:["I","J","L","O","S","T","Z"]}
  };

  function normalizeLevel(v){return v==="basic"?"easy":v==="advanced"?"hard":v||"medium"}
  function showPaywall(l){suite.paywall?.("nerd",l)}
  function backCatalog(){suite.renderCatalog?.(bridge.catalogContext||{})}
  function randomPiece(level){
    const pool=LEVELS[level].pool;
    const type=pool[Math.floor(Math.random()*pool.length)];
    return{type,color:COLORS[type],cells:SHAPES[type].map(p=>[...p]),x:Math.floor(COLS/2)-2,y:0};
  }
  function rotateCells(cells){
    const turned=cells.map(([r,c])=>[c,-r]);
    const minR=Math.min(...turned.map(p=>p[0])),minC=Math.min(...turned.map(p=>p[1]));
    return turned.map(([r,c])=>[r-minR,c-minC]);
  }

  function selector(l,tournament){
    bridge.currentGame="block-grid";
    const levels=["easy","medium","hard","nerd"];
    content().innerHTML=`<main class="gamePage fallingGamePage"><button class="textButton fallingBack" type="button">←</button><section class="hero"><span class="eyebrow">${esc(t("title",l))}</span><h1>${esc(t("choose",l))}</h1><p>${esc(t("sub",l))}</p></section><section class="levelGrid">${levels.map(level=>{const locked=level==="nerd"&&!active()&&!tournament;return`<button class="levelCard ${locked?"locked":""}" data-falling-level="${level}" type="button">${locked?'<span class="lock">🔒</span>':""}<strong>${esc(t(level,l))}</strong><small>${esc(level==="nerd"?t("subscriber",l):t("free",l))}</small></button>`}).join("")}</section></main>`;
    $(".fallingBack")?.addEventListener("click",backCatalog);
    document.querySelectorAll("[data-falling-level]").forEach(btn=>btn.addEventListener("click",()=>{
      const level=btn.dataset.fallingLevel;
      if(level==="nerd"&&!active()&&!tournament)return showPaywall(l);
      renderGame(level,l,tournament);
    }));
    window.scrollTo({top:0,behavior:"auto"});
  }

  function renderGame(level,l,tournament){
    bridge.currentGame="block-grid";
    const board=Array.from({length:ROWS},()=>Array(COLS).fill(""));
    const highKey=`ecp:falling-blocks:${level}:high`;
    const maxSeconds=Number(tournament?.maxSeconds||0);
    const startedAt=Date.now();
    let current=randomPiece(level),next=randomPiece(level),score=0,lines=0,pieces=0,dropTimer=null,finished=false;

    function collides(piece,cells=piece.cells,x=piece.x,y=piece.y){
      return cells.some(([r,c])=>{
        const rr=y+r,cc=x+c;
        return cc<0||cc>=COLS||rr>=ROWS||(rr>=0&&board[rr][cc]);
      });
    }
    function ghostY(){let y=current.y;while(!collides(current,current.cells,current.x,y+1))y++;return y}
    function move(dx,dy){
      if(finished)return false;
      if(!collides(current,current.cells,current.x+dx,current.y+dy)){current.x+=dx;current.y+=dy;draw();return true}
      return false;
    }
    function rotate(){
      if(finished||current.type==="O")return;
      const cells=rotateCells(current.cells);
      const kicks=[0,-1,1,-2,2];
      for(const kick of kicks){if(!collides(current,cells,current.x+kick,current.y)){current.cells=cells;current.x+=kick;draw();return}}
    }
    function clearLines(){
      let cleared=0;
      for(let r=ROWS-1;r>=0;r--){
        if(board[r].every(Boolean)){board.splice(r,1);board.unshift(Array(COLS).fill(""));cleared++;r++}
      }
      if(cleared){
        lines+=cleared;
        const points=[0,100,300,500,800][cleared]||1000;
        score+=points;
      }
    }
    function lock(){
      current.cells.forEach(([r,c])=>{const rr=current.y+r,cc=current.x+c;if(rr>=0&&rr<ROWS&&cc>=0&&cc<COLS)board[rr][cc]=current.color});
      pieces++;
      clearLines();
      current=next;next=randomPiece(level);current.x=Math.floor(COLS/2)-2;current.y=0;
      if(collides(current))finish();else draw();
    }
    function down(){if(!move(0,1))lock()}
    function hardDrop(){if(finished)return;let bonus=0;while(!collides(current,current.cells,current.x,current.y+1)){current.y++;bonus++}score+=Math.min(bonus,20);lock()}
    function renderCells(){
      const view=board.map(row=>row.slice());
      const gy=ghostY();
      current.cells.forEach(([r,c])=>{const rr=gy+r,cc=current.x+c;if(rr>=0&&rr<ROWS&&cc>=0&&cc<COLS&&!view[rr][cc])view[rr][cc]="ghost"});
      current.cells.forEach(([r,c])=>{const rr=current.y+r,cc=current.x+c;if(rr>=0&&rr<ROWS&&cc>=0&&cc<COLS)view[rr][cc]=current.color});
      return view.flat().map(v=>`<span class="fallCell ${v?`filled ${v}`:""}"></span>`).join("");
    }
    function nextPreview(){
      const cells=next.cells,maxR=Math.max(...cells.map(p=>p[0])),maxC=Math.max(...cells.map(p=>p[1]));
      return`<span class="fallNextShape" style="--nr:${maxR+1};--nc:${maxC+1}">${cells.map(([r,c])=>`<i class="fallMini ${next.color}" style="grid-row:${r+1};grid-column:${c+1}"></i>`).join("")}</span>`;
    }
    function draw(){
      if(finished)return;
      content().innerHTML=`<main class="gamePage fallingGamePage playing"><button class="textButton fallingBack" type="button">←</button><div class="fallingHeader"><div><span class="eyebrow">${esc(t("title",l))} · ${esc(t(level,l))}</span></div><div class="fallingStats"><span>⭐ <b>${score}</b><small>${esc(t("score",l))}</small></span><span>▤ <b>${lines}</b><small>${esc(t("lines",l))}</small></span><span class="nextStat"><b>${nextPreview()}</b><small>${esc(t("next",l))}</small></span></div></div><section class="fallBoard" aria-label="${esc(t("title",l))}">${renderCells()}</section><section class="fallControls" aria-label="Controles"><button type="button" data-fall-action="left">◀</button><button type="button" data-fall-action="rotate">↻</button><button type="button" data-fall-action="down">▼</button><button type="button" data-fall-action="right">▶</button><button type="button" data-fall-action="drop">⤓</button></section><div class="fallActions"><button id="fallHow" class="secondaryButton">📘 ${esc(t("how",l))}</button><button id="fallRestart" class="secondaryButton">↻ ${esc(t("restart",l))}</button></div></main>`;
      $(".fallingBack")?.addEventListener("click",()=>{clearInterval(dropTimer);tournament?window.EduCashProSocial?.returnToTournament?.(tournament.code):selector(l,null)});
      document.querySelectorAll("[data-fall-action]").forEach(btn=>btn.addEventListener("click",()=>{
        const a=btn.dataset.fallAction;
        if(a==="left")move(-1,0);else if(a==="right")move(1,0);else if(a==="rotate")rotate();else if(a==="down")down();else if(a==="drop")hardDrop();
      }));
      $("#fallHow")?.addEventListener("click",()=>alert(t("help",l)));
      $("#fallRestart")?.addEventListener("click",()=>{clearInterval(dropTimer);renderGame(level,l,tournament)});
    }
    function finish(){
      if(finished)return;finished=true;clearInterval(dropTimer);
      const durationMs=Date.now()-startedAt;
      const record=Math.max(Number(localStorage.getItem(highKey)||0),score);localStorage.setItem(highKey,String(record));
      if(tournament){window.EduCashProSocial?.submitTournamentResult?.(tournament,{score,stats:{lines,pieces,durationMs}},{lines,pieces});return}
      content().innerHTML=`<main class="gamePage fallingGamePage"><section class="hero"><span class="eyebrow">${esc(t("over",l))}</span><h1>⭐ ${score}</h1><p>${esc(t("lines",l))}: <b>${lines}</b> · ${esc(t("record",l))}: <b>${record}</b></p></section><div class="fallActions"><button id="fallAgain" class="wideButton">${esc(t("again",l))}</button><button id="fallLevels" class="secondaryButton">${esc(t("levels",l))}</button></div></main>`;
      $("#fallAgain").onclick=()=>renderGame(level,l,null);$("#fallLevels").onclick=()=>selector(l,null);
    }

    draw();
    dropTimer=setInterval(()=>{
      if(finished)return;
      if(maxSeconds&&Date.now()-startedAt>=maxSeconds*1000){finish();return}
      down();
    },LEVELS[level].speed);
    window.scrollTo({top:0,behavior:"auto"});
  }

  const previousLaunch=typeof suite.launchGame==="function"?suite.launchGame.bind(suite):null;
  suite.launchGame=function(gameId,options={}){
    if(gameId==="block-grid"){
      const l=lang(options.lang),tournament=options.tournament||null,raw=tournament?.difficulty||options.level;
      const level=normalizeLevel(raw);
      if(level==="nerd"&&!active()&&!tournament)return showPaywall(l);
      return raw?renderGame(level,l,tournament):selector(l,tournament);
    }
    return previousLaunch?previousLaunch(gameId,options):undefined;
  };

  function relabelCard(){
    document.querySelectorAll('[data-play="block-grid"],[data-extra-play="block-grid"]').forEach(button=>{
      const card=button.closest("article");if(!card)return;
      const h=card.querySelector("h3"),p=card.querySelector("p");
      if(h)h.textContent=t("title");if(p)p.textContent=t("sub");
    });
  }
  const previousCatalog=typeof suite.renderCatalog==="function"?suite.renderCatalog.bind(suite):null;
  if(previousCatalog){suite.renderCatalog=function(){const result=previousCatalog.apply(null,arguments);queueMicrotask(relabelCard);setTimeout(relabelCard,40);return result}}
  setTimeout(relabelCard,0);

  if(base&&typeof base.bootPublic==="function"){
    const prevBoot=base.bootPublic.bind(base);
    base.bootPublic=async function(params){
      if(String(params?.get?.("game")||"")==="block-grid"){suite.launchGame("block-grid",{lang:params.get("lang")});return true}
      return prevBoot(params);
    };
  }

  window.EduCashProFallingBlocksV7={renderGame,selector};
})();
