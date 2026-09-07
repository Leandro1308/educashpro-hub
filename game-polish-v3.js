(function(){
  "use strict";

  const suite=window.EduCashProGameSuite;
  const base=window.EduCashProMentalGames;
  const bridge=window.EduCashProGameBridge||(window.EduCashProGameBridge={session:null,catalogContext:{}});
  if(!suite||!base)return;

  const $=(s)=>document.querySelector(s);
  const content=()=>document.getElementById("content");
  const esc=(v)=>String(v??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[c]);
  const lang=(v)=>suite.lang?.(v)||"pt";
  const st=(key,l)=>suite.text?.(key,l)||key;
  const active=()=>suite.active?.()===true;

  const COPY={
    pt:{speed:"Velocidade",slow:"Lenta",normal:"Normal",fast:"Rápida",life:"Vidas",correct:"+2 vidas",wrong:"-1 vida",choose:"Escolha a resposta",manual:"Como jogar",manualTitle:"Como jogar o Math Cross",manualSteps:["Toque em um espaço vazio destacado.","Escolha um número disponível no banco.","Complete as contas na horizontal e na vertical.","Multiplicação e divisão são resolvidas antes de soma e subtração.","Quando terminar, toque em Conferir.","Todas as contas corretas concluem a fase."],playAgain:"Jogar novamente",levels:"Escolher nível"},
    en:{speed:"Speed",slow:"Slow",normal:"Normal",fast:"Fast",life:"Lives",correct:"+2 lives",wrong:"-1 life",choose:"Choose the answer",manual:"How to play",manualTitle:"How to play Math Cross",manualSteps:["Tap a highlighted empty space.","Choose an available number from the bank.","Complete equations horizontally and vertically.","Multiplication and division are solved before addition and subtraction.","When finished, tap Check.","Complete every equation correctly to finish the level."],playAgain:"Play again",levels:"Choose level"},
    es:{speed:"Velocidad",slow:"Lenta",normal:"Normal",fast:"Rápida",life:"Vidas",correct:"+2 vidas",wrong:"-1 vida",choose:"Elige la respuesta",manual:"Cómo jugar",manualTitle:"Cómo jugar Math Cross",manualSteps:["Toca un espacio vacío destacado.","Elige un número disponible del banco.","Completa las cuentas horizontal y verticalmente.","Multiplicación y división se resuelven antes que suma y resta.","Al terminar, toca Comprobar.","Completa correctamente todas las cuentas para superar el nivel."],playAgain:"Jugar de nuevo",levels:"Elegir nivel"},
    ru:{speed:"Скорость",slow:"Медленно",normal:"Обычно",fast:"Быстро",life:"Жизни",correct:"+2 жизни",wrong:"-1 жизнь",choose:"Выберите ответ",manual:"Как играть",manualTitle:"Как играть в Math Cross",manualSteps:["Нажмите выделенную пустую клетку.","Выберите число из банка.","Заполните выражения по горизонтали и вертикали.","Умножение и деление выполняются раньше сложения и вычитания.","После заполнения нажмите Проверить.","Все выражения должны быть решены правильно."],playAgain:"Ещё раз",levels:"Выбрать уровень"}
  };
  function c(key,l){return COPY[lang(l)]?.[key]||COPY.pt[key]||key}

  function xorshift(seed){let state=Number(seed)>>>0||1;return()=>{state^=state<<13;state>>>=0;state^=state>>>17;state>>>=0;state^=state<<5;state>>>=0;return state/4294967296}}
  function gcd(a,b){a=Math.abs(a);b=Math.abs(b);while(b)[a,b]=[b,a%b];return a||1}
  function fraction(n,d){if(!d)return String(n);if(d<0){n*=-1;d*=-1}const g=gcd(n,d);n/=g;d/=g;return d===1?String(n):`${n}/${d}`}
  function normalize(v){const raw=String(v??"").trim().replace(",",".").replace(/−/g,"-");const m=raw.match(/^(-?\d+)\/(\d+)$/);return m&&Number(m[2])?fraction(Number(m[1]),Number(m[2])):raw}
  function shuffle(items,random){const a=[...items];for(let i=a.length-1;i>0;i--){const j=Math.floor(random()*(i+1));[a[i],a[j]]=[a[j],a[i]]}return a}

  function makeQuestion(random,difficulty){
    const pick=n=>Math.floor(random()*n);
    if(difficulty==="basic"){
      const op=pick(4);
      if(op===0){const a=pick(11),b=pick(11);return[`${a} + ${b}`,String(a+b)]}
      if(op===1){const a=pick(11),b=pick(11),hi=Math.max(a,b),lo=Math.min(a,b);return[`${hi} − ${lo}`,String(hi-lo)]}
      if(op===2){const a=pick(11),b=pick(11);return[`${a} × ${b}`,String(a*b)]}
      const d=1+pick(10),q=pick(11);return[`${d*q} ÷ ${d}`,String(q)];
    }
    if(difficulty==="medium"){
      const op=pick(5);
      if(op===0){const a=10+pick(90),b=10+pick(90);return[`${a} + ${b}`,String(a+b)]}
      if(op===1){const a=20+pick(180),b=pick(a+1);return[`${a} − ${b}`,String(a-b)]}
      if(op===2){const a=2+pick(11),b=2+pick(11);return[`${a} × ${b}`,String(a*b)]}
      if(op===3){const d=2+pick(11),q=2+pick(15);return[`${d*q} ÷ ${d}`,String(q)]}
      const a=2+pick(18),b=2+pick(10),cc=2+pick(9);return[`${a} + ${b} × ${cc}`,String(a+b*cc)];
    }
    if(difficulty==="advanced"){
      const a=1+pick(8),b=2+pick(8),cc=1+pick(8),d=2+pick(8),op=pick(4);
      if(op===0)return[`${a}/${b} + ${cc}/${d}`,fraction(a*d+cc*b,b*d)];
      if(op===1)return[`${a}/${b} − ${cc}/${d}`,fraction(a*d-cc*b,b*d)];
      if(op===2)return[`${a}/${b} × ${cc}/${d}`,fraction(a*cc,b*d)];
      return[`${a}/${b} ÷ ${cc}/${d}`,fraction(a*d,b*cc)];
    }
    const kind=pick(5);
    if(kind===0){const r=2+pick(14);return[`√${r*r}`,String(r)]}
    if(kind===1){const a=2+pick(10),p=2+pick(2);return[`${a}${p===2?"²":"³"}`,String(a**p)]}
    if(kind===2){const pct=[10,20,25,50,75][pick(5)],base=4*(5+pick(21));return[`${pct}% de ${base}`,String(pct*base/100)]}
    if(kind===3){const x=1+pick(15),a=2+pick(6),b=pick(15),result=a*x+b;return[`${a}x + ${b} = ${result}`,String(x)]}
    const a=2+pick(8),b=2+pick(8);return[`${a}² + √${b*b}`,String(a*a+b)];
  }

  function makeChoices(correct,random){
    const right=normalize(correct),set=new Set([right]);
    const fm=right.match(/^(-?\d+)\/(\d+)$/);
    if(fm){
      const n=Number(fm[1]),d=Number(fm[2]);
      [fraction(n+1,d),fraction(n-1,d),fraction(n,d+1),fraction(n+2,d),fraction(n,d+2)].forEach(v=>set.add(normalize(v)));
    }else{
      const n=Number(right);
      if(Number.isFinite(n)){
        const offsets=[-3,-2,-1,1,2,3,4,-4];
        shuffle(offsets,random).forEach(o=>set.add(String(n+o)));
      }
    }
    while(set.size<4)set.add(String(Math.floor(random()*25)));
    return shuffle([...set].slice(0,4),random);
  }

  function beep(ok){
    if(localStorage.getItem("ecp:game:sound")==="off")return;
    try{const AC=window.AudioContext||window.webkitAudioContext,ctx=beep.ctx||(beep.ctx=new AC()),osc=ctx.createOscillator(),gain=ctx.createGain();osc.frequency.value=ok?700:190;gain.gain.value=.03;osc.connect(gain);gain.connect(ctx.destination);osc.start();osc.stop(ctx.currentTime+.07)}catch{}
  }

  function simpleModal(title,steps,l){
    document.querySelector(".ecpModal")?.remove();
    const node=document.createElement("div");node.className="ecpModal";
    node.innerHTML=`<section class="ecpModalCard"><div class="ecpModalIcon">📘</div><h2>${esc(title)}</h2><ol class="gameManualList">${steps.map(x=>`<li>${esc(x)}</li>`).join("")}</ol><div class="ecpModalActions"><button class="wideButton">${esc(st("back",l))}</button></div></section>`;
    document.body.appendChild(node);node.querySelector("button").onclick=()=>node.remove();node.onclick=e=>{if(e.target===node)node.remove()};
  }

  function mathLevelSelector(requested){
    const l=lang(requested),levels=["basic","medium","advanced","nerd"];
    content().innerHTML=`<main class="gamePage"><button class="textButton gameBackLocal" type="button">←</button><section class="hero"><span class="eyebrow">${esc(st("math",l))}</span><h1>${esc(st("chooseLevel",l))}</h1><p>${esc(st("mathSub",l))}</p></section><section class="levelGrid">${levels.map((level,i)=>{const locked=i>1&&!active();return`<button class="levelCard ${locked?"locked":""}" data-v3-math-level="${level}">${locked?'<span class="lock">🔒</span>':""}<strong>${esc(st(level,l))}</strong><small>${esc(i<2?st("free",l):st("premium",l))}</small></button>`}).join("")}</section></main>`;
    $(".gameBackLocal").onclick=()=>suite.renderCatalog?.(bridge.catalogContext||{});
    document.querySelectorAll("[data-v3-math-level]").forEach(btn=>btn.onclick=()=>{const level=btn.dataset.v3MathLevel;if(["advanced","nerd"].includes(level)&&!active())return suite.paywall?.(level,l);renderMath(level,l,null)});
    window.scrollTo({top:0,behavior:"smooth"});
  }

  function renderMath(level,requested,tournament){
    const l=lang(requested),seed=tournament?.seed||crypto.getRandomValues(new Uint32Array(1))[0]||1,random=xorshift(seed),startedAt=Date.now(),highKey=`ecp:math:high:${level}`;
    let lives=5,score=0,combo=0,bestCombo=0,hits=0,errors=0,misses=0,finished=false,paused=false,locked=false,question=null,choices=[],y=62,lastFrame=0,raf=0,events=[];
    let speed=localStorage.getItem("ecp:math:speed")||"normal";
    const maxSeconds=Number(tournament?.maxSeconds||0);

    content().innerHTML=`<main class="gamePage mathChoicePage"><button class="textButton gameBackLocal" type="button">←</button><section class="mathChoiceTop"><div class="mathChoiceTopRow"><span class="mathChoiceTitle">${esc(st("math",l))} · ${esc(st(level,l))}</span><div class="mathChoiceTools"><label class="mathSpeedWrap">${esc(c("speed",l))}<select id="mathSpeed"><option value="slow">${esc(c("slow",l))}</option><option value="normal">${esc(c("normal",l))}</option><option value="fast">${esc(c("fast",l))}</option></select></label><button id="mathSoundV3" class="mathChoiceIcon">${localStorage.getItem("ecp:game:sound")==="off"?"🔇":"🔊"}</button><button id="mathPauseV3" class="mathChoiceIcon">⏸</button></div></div></section><section id="mathChoiceArena" class="mathChoiceArena"><div class="mathChoiceHud"><span class="mathChoiceScore"><span>⭐ <b id="mathScoreV3">0</b></span><span>🔥 <b id="mathComboV3">x0</b></span></span><span id="mathLifeV3" class="mathLife">❤️ <b>5</b></span></div><div id="mathQuestionV3" class="mathChoiceQuestion"></div><div id="mathLaserV3" class="mathChoiceLaser"></div><div class="mathChoiceShip">🚀</div><div id="mathFeedbackV3" class="mathChoiceFeedback"></div><div id="mathOptionsV3" class="mathChoiceOptions"></div></section></main>`;
    $("#mathSpeed").value=speed;
    $(".gameBackLocal").onclick=()=>{cancelAnimationFrame(raf);if(tournament)window.EduCashProSocial?.returnToTournament?.(tournament.code);else suite.renderCatalog?.(bridge.catalogContext||{})};

    function hud(){$("#mathScoreV3").textContent=score;$("#mathComboV3").textContent=`x${combo}`;$("#mathLifeV3 b").textContent=lives}
    function feedback(msg){const el=$("#mathFeedbackV3");el.textContent=msg;el.classList.remove("show");void el.offsetWidth;el.classList.add("show")}
    function drawChoices(){const host=$("#mathOptionsV3");host.innerHTML=choices.map(v=>`<button class="mathChoiceOption" data-answer="${esc(v)}">${esc(v)}</button>`).join("");host.querySelectorAll("[data-answer]").forEach(btn=>btn.onclick=()=>choose(btn))}
    function nextQuestion(){if(finished)return;question=makeQuestion(random,level);choices=makeChoices(question[1],random);y=62;locked=false;$("#mathQuestionV3").textContent=`${question[0]} = ?`;$("#mathQuestionV3").style.top=`${y}px`;drawChoices()}
    function loseLife(kind,selected){errors+=kind==="wrong"?1:0;misses+=kind==="miss"?1:0;combo=0;lives=Math.max(0,lives-1);events.push(kind==="miss"?{miss:true}:{answer:selected});beep(false);hud();feedback(c("wrong",l));if(lives<=0){finish();return}setTimeout(nextQuestion,180)}
    function gainLife(){hits++;combo++;bestCombo=Math.max(bestCombo,combo);score+=10+Math.min(20,Math.max(0,combo-1)*2);lives+=2;events.push({answer:question[1]});beep(true);hud();const life=$("#mathLifeV3");life.classList.remove("bump");void life.offsetWidth;life.classList.add("bump");const laser=$("#mathLaserV3");laser.classList.remove("fire");void laser.offsetWidth;laser.classList.add("fire");feedback(c("correct",l));setTimeout(nextQuestion,220)}
    function choose(btn){if(locked||finished||paused)return;locked=true;const selected=normalize(btn.dataset.answer),right=normalize(question[1]);if(selected===right){btn.classList.add("good");gainLife()}else{btn.classList.add("bad");document.querySelectorAll(".mathChoiceOption").forEach(x=>{if(normalize(x.dataset.answer)===right)x.classList.add("good")});loseLife("wrong",selected)}}
    function frame(now){if(finished)return;if(!lastFrame)lastFrame=now;const dt=Math.min(50,now-lastFrame);lastFrame=now;if(maxSeconds&&Date.now()-startedAt>=maxSeconds*1000){finish();return}if(!paused&&!locked){const baseSpeed={basic:34,medium:44,advanced:41,nerd:47}[level]||40,factor={slow:.72,normal:1,fast:1.32}[speed]||1;y+=dt*(baseSpeed+Math.min(38,score/65))*factor/1000;$("#mathQuestionV3").style.top=`${y}px`;const arena=$("#mathChoiceArena");if(y>arena.clientHeight-205){locked=true;loseLife("miss")}}raf=requestAnimationFrame(frame)}
    async function finish(){if(finished)return;finished=true;cancelAnimationFrame(raf);const durationMs=Date.now()-startedAt,record=Math.max(Number(localStorage.getItem(highKey)||0),score);localStorage.setItem(highKey,String(record));const summary={score,durationMs,hits,errors:errors+misses,bestCombo,stage:events.length};if(tournament)return window.EduCashProSocial?.submitTournamentResult?.(tournament,{score,stats:summary},{events});if(active()){try{await suite.api?.("/api/games/history/save",{game:"math-space",difficulty:level,score,durationMs,hits,errors:errors+misses,bestCombo,stage:events.length})}catch{}}content().innerHTML=`<main class="gamePage"><section class="hero"><span class="eyebrow">${esc(st("gameOver",l))}</span><h1>⭐ ${score}</h1><p>${esc(st("record",l))}: <b>${record}</b> · ${esc(st("combo",l))}: x${bestCombo}</p></section><section class="socialActions"><button id="mathAgainV3" class="wideButton">${esc(c("playAgain",l))}</button><button id="mathLevelsV3" class="secondaryButton">${esc(c("levels",l))}</button></section></main>`;$("#mathAgainV3").onclick=()=>renderMath(level,l,null);$("#mathLevelsV3").onclick=()=>mathLevelSelector(l)}

    $("#mathSpeed").onchange=e=>{speed=e.target.value;localStorage.setItem("ecp:math:speed",speed)};
    $("#mathSoundV3").onclick=()=>{const off=localStorage.getItem("ecp:game:sound")==="off";localStorage.setItem("ecp:game:sound",off?"on":"off");$("#mathSoundV3").textContent=off?"🔊":"🔇"};
    $("#mathPauseV3").onclick=()=>{paused=!paused;$("#mathPauseV3").textContent=paused?"▶":"⏸";lastFrame=performance.now()};
    nextQuestion();hud();raf=requestAnimationFrame(frame);window.scrollTo({top:0,behavior:"smooth"});
  }

  const originalLaunch=suite.launchGame?.bind(suite);
  suite.launchGame=function(gameId,options={}){if(gameId==="math-space"){const l=lang(options.lang),level=options.tournament?.difficulty||options.level;return level?renderMath(level,l,options.tournament||null):mathLevelSelector(l)}return originalLaunch?.(gameId,options)};

  document.addEventListener("click",e=>{
    const play=e.target.closest?.('[data-play="math-space"]');
    if(play){e.preventDefault();e.stopImmediatePropagation();mathLevelSelector(lang());return}
    const hint=e.target.closest?.("#pegHint");
    if(hint){e.preventDefault();e.stopImmediatePropagation();const board=document.querySelector(".pegBoard");board?.classList.add("hinting");setTimeout(()=>board?.classList.remove("hinting"),1800)}
  },true);

  const originalBoot=base.bootPublic?.bind(base);
  base.bootPublic=async function(params){if(String(params?.get?.("game")||"")==="math-space"){mathLevelSelector(params.get("lang"));return true}return originalBoot?originalBoot(params):false};

  const WORD_COLORS=["#a7eed9","#acd8ff","#cabdff","#ffd1df","#ffe49e","#b9e6e3","#d9c8ff","#ffd9b6","#bde7b6","#c8d8ff"];
  function findWordPath(word,cells,size){
    const dirs=[[0,1],[1,0],[1,1],[1,-1],[0,-1],[-1,0],[-1,-1],[-1,1]];
    for(let r=0;r<size;r++)for(let col=0;col<size;col++)for(const[dr,dc]of dirs){const path=[];let ok=true;for(let i=0;i<word.length;i++){const rr=r+dr*i,cc=col+dc*i;if(rr<0||rr>=size||cc<0||cc>=size||cells[rr*size+cc]?.textContent!==word[i]){ok=false;break}path.push(cells[rr*size+cc])}if(ok)return path}
    return[];
  }
  function polishWords(){const board=document.querySelector(".wordBoard"),chips=[...document.querySelectorAll(".wordChip")];if(!board||!chips.length)return;const cells=[...board.querySelectorAll(".wordCell")],size=Math.round(Math.sqrt(cells.length));if(size*size!==cells.length)return;chips.forEach((chip,i)=>{const color=WORD_COLORS[i%WORD_COLORS.length],word=chip.textContent.trim();chip.style.setProperty("--word-color",color);if(!chip.classList.contains("done")){chip.style.color=color;return}chip.style.color="";findWordPath(word,cells,size).forEach(cell=>cell.style.setProperty("--word-color",color))})}

  function pegMoves(from,pegSet,cellSet,triangle){const[fr,fc]=from.split(",").map(Number),dirs=triangle?[[0,2],[0,-2],[2,0],[-2,0],[2,2],[-2,-2]]:[[0,2],[0,-2],[2,0],[-2,0]];return dirs.flatMap(([dr,dc])=>{const to=`${fr+dr},${fc+dc}`,mid=`${fr+dr/2},${fc+dc/2}`;return cellSet.has(to)&&pegSet.has(mid)&&!pegSet.has(to)?[to]:[]})}
  function polishPeg(){const board=document.querySelector(".pegBoard");if(!board)return;const holes=[...board.querySelectorAll("[data-hole]")],cellSet=new Set(holes.map(h=>h.dataset.hole)),pegSet=new Set(holes.filter(h=>h.classList.contains("peg")).map(h=>h.dataset.hole)),triangle=board.classList.contains("pegTriangle");holes.forEach(h=>{h.classList.remove("movable");if(!h.classList.contains("selected"))h.classList.remove("target")});holes.filter(h=>h.classList.contains("peg")).forEach(h=>{if(pegMoves(h.dataset.hole,pegSet,cellSet,triangle).length)h.classList.add("movable")});const selected=holes.find(h=>h.classList.contains("selected"));if(selected)pegMoves(selected.dataset.hole,pegSet,cellSet,triangle).forEach(to=>board.querySelector(`[data-hole="${to}"]`)?.classList.add("target"))}

  function polishSliding(){document.querySelectorAll(".crossBoard").forEach(shell=>{if(shell.querySelector("[data-slide]"))shell.classList.add("ecpSlidingShell")})}
  function polishCross(){const grid=document.querySelector(".crossGrid");if(!grid)return;const hero=grid.closest(".gamePage")?.querySelector(".hero");if(hero&&!hero.querySelector(".crossManualBtn")){const b=document.createElement("button");b.type="button";b.className="crossManualBtn";b.textContent=`📘 ${c("manual",lang())}`;b.onclick=()=>simpleModal(c("manualTitle",lang()),c("manualSteps",lang()),lang());hero.appendChild(b)}}
  function polish(){polishSliding();polishCross();polishWords();polishPeg()}
  const observer=new MutationObserver(()=>queueMicrotask(polish));observer.observe(document.documentElement,{childList:true,subtree:true});document.addEventListener("DOMContentLoaded",polish);polish();

  window.EduCashProGamePolishV3={renderMath,mathLevelSelector,polish};
})();
