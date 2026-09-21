(function () {
  "use strict";

  const base = window.EduCashProMentalGames;
  if (!base) return;

  const bridge = window.EduCashProGameBridge = window.EduCashProGameBridge || {
    session: null,
    catalogContext: {},
    currentGame: null
  };

  const originalSetSession = typeof base.setSession === "function" ? base.setSession.bind(base) : null;
  const originalBootPublic = typeof base.bootPublic === "function" ? base.bootPublic.bind(base) : null;

  base.setSession = function (value) {
    bridge.session = value || null;
    originalSetSession?.(value);
  };

  const TXT = {
    pt: {
      title:"Jogos e desafios",sub:"Treine raciocínio, matemática e vocabulário. As partidas rodam no seu aparelho.",back:"Voltar",play:"Jogar",tournament:"Criar torneio",raffle:"Criar rifa",history:"Meu histórico",free:"LIVRE",premium:"ASSINANTE",local:"Processamento local",subscriber:"Exclusivo para assinantes",subscriberText:"Este nível faz parte dos recursos avançados do EduCashPro. Ative sua assinatura para desbloquear e continuar.",presentation:"Ver apresentação EduCashPro",subscribe:"Assinar agora",cancel:"Agora não",
      sliding:"Quebra-cabeça Numérico",slidingSub:"Organize as peças usando o espaço vazio.",peg:"Resta Um",pegSub:"Várias formas de tabuleiro, cores e jogadas válidas.",math:"Math Space",mathSub:"Resolva a conta antes que ela alcance sua nave.",words:"Caça-Palavras",wordsSub:"Encontre palavras escondidas em diferentes direções.",cross:"Math Cross",crossSub:"Complete cruzamentos de operações matemáticas.",
      basic:"Básico",medium:"Médio",advanced:"Avançado",nerd:"Nerd",chooseLevel:"Escolha o nível",lives:"Vidas",score:"Pontos",combo:"Combo",pause:"Pausar",resume:"Continuar",quit:"Sair",gameOver:"Fim da partida",again:"Jogar novamente",record:"Recorde",sound:"Som",shoot:"Disparar",answer:"Digite a resposta",historyEmpty:"Nenhuma partida sincronizada ainda.",syncNote:"Assinantes ativos podem sincronizar apenas o resumo final das partidas. Movimentos e animações não são enviados.",
      howPeg:"Salte uma peça sobre outra até um espaço vazio. A peça saltada sai do tabuleiro. Nos tabuleiros quadrados, as jogadas são horizontais ou verticais; no triangular, seguem os três eixos da malha.",remaining:"Restam",possible:"Mostrar jogadas",undo:"Desfazer",perfect:"Final perfeito!",noMoves:"Não há mais jogadas.",english:"Inglês — 33",european:"Europeu — 37",wiegleb:"Wiegleb — 45",diamond:"Diamante — 41",triangle:"Triangular — 15",
      findAll:"Encontre todas",firstCell:"Toque na primeira e depois na última letra da palavra.",found:"Encontradas",crossHelp:"Toque em um espaço verde e escolha um número do banco. Multiplicação e divisão têm prioridade sobre soma e subtração.",check:"Conferir",solved:"Resolvido!",tryAgain:"Ainda há respostas incorretas.",historyTitle:"Histórico sincronizado",moves:"jogadas"
    },
    en: {
      title:"Games and challenges",sub:"Train logic, math and vocabulary. Gameplay runs on your device.",back:"Back",play:"Play",tournament:"Create tournament",raffle:"Create raffle",history:"My history",free:"FREE",premium:"SUBSCRIBER",local:"Local processing",subscriber:"Subscribers only",subscriberText:"This level is part of EduCashPro advanced features. Activate your subscription to unlock it.",presentation:"View EduCashPro presentation",subscribe:"Subscribe now",cancel:"Not now",
      sliding:"Number Puzzle",slidingSub:"Put the tiles in order using the empty space.",peg:"Peg Solitaire",pegSub:"Multiple board shapes, colors and valid moves.",math:"Math Space",mathSub:"Solve the equation before it reaches your ship.",words:"Word Search",wordsSub:"Find hidden words in several directions.",cross:"Math Cross",crossSub:"Complete intersecting arithmetic equations.",
      basic:"Basic",medium:"Medium",advanced:"Advanced",nerd:"Nerd",chooseLevel:"Choose a level",lives:"Lives",score:"Score",combo:"Combo",pause:"Pause",resume:"Resume",quit:"Quit",gameOver:"Game over",again:"Play again",record:"Record",sound:"Sound",shoot:"Shoot",answer:"Enter the answer",historyEmpty:"No synced games yet.",syncNote:"Active subscribers can sync only the final game summary. Moves and animations are never sent.",
      howPeg:"Jump one peg over another into an empty hole. The jumped peg is removed. Square boards use horizontal or vertical moves; the triangle follows its three grid axes.",remaining:"Left",possible:"Show moves",undo:"Undo",perfect:"Perfect finish!",noMoves:"No moves remain.",english:"English — 33",european:"European — 37",wiegleb:"Wiegleb — 45",diamond:"Diamond — 41",triangle:"Triangular — 15",
      findAll:"Find them all",firstCell:"Tap the first and then the last letter of a word.",found:"Found",crossHelp:"Tap a green blank and choose a number from the bank. Multiplication and division come before addition and subtraction.",check:"Check",solved:"Solved!",tryAgain:"Some answers are still incorrect.",historyTitle:"Synced history",moves:"moves"
    },
    es: {
      title:"Juegos y desafíos",sub:"Entrena lógica, matemáticas y vocabulario. Las partidas se ejecutan en tu dispositivo.",back:"Volver",play:"Jugar",tournament:"Crear torneo",raffle:"Crear rifa",history:"Mi historial",free:"LIBRE",premium:"SUSCRIPTOR",local:"Procesamiento local",subscriber:"Solo suscriptores",subscriberText:"Este nivel forma parte de las funciones avanzadas de EduCashPro. Activa tu suscripción para desbloquearlo.",presentation:"Ver presentación EduCashPro",subscribe:"Suscribirme ahora",cancel:"Ahora no",
      sliding:"Rompecabezas Numérico",slidingSub:"Ordena las piezas usando el espacio vacío.",peg:"Solitario de clavijas",pegSub:"Varias formas, colores y jugadas válidas.",math:"Math Space",mathSub:"Resuelve la operación antes de que alcance tu nave.",words:"Sopa de Letras",wordsSub:"Encuentra palabras ocultas en distintas direcciones.",cross:"Math Cross",crossSub:"Completa cruces de operaciones matemáticas.",
      basic:"Básico",medium:"Medio",advanced:"Avanzado",nerd:"Nerd",chooseLevel:"Elige el nivel",lives:"Vidas",score:"Puntos",combo:"Combo",pause:"Pausa",resume:"Continuar",quit:"Salir",gameOver:"Fin de partida",again:"Jugar de nuevo",record:"Récord",sound:"Sonido",shoot:"Disparar",answer:"Escribe la respuesta",historyEmpty:"Aún no hay partidas sincronizadas.",syncNote:"Los suscriptores activos pueden sincronizar solo el resumen final. Los movimientos y animaciones no se envían.",
      howPeg:"Salta una pieza sobre otra hasta un espacio vacío. La pieza saltada se elimina. Los tableros cuadrados usan movimientos horizontales o verticales; el triangular sigue sus tres ejes.",remaining:"Quedan",possible:"Mostrar jugadas",undo:"Deshacer",perfect:"¡Final perfecto!",noMoves:"No quedan jugadas.",english:"Inglés — 33",european:"Europeo — 37",wiegleb:"Wiegleb — 45",diamond:"Diamante — 41",triangle:"Triangular — 15",
      findAll:"Encuéntralas todas",firstCell:"Toca la primera y luego la última letra de la palabra.",found:"Encontradas",crossHelp:"Toca un espacio verde y elige un número del banco. Multiplicación y división tienen prioridad.",check:"Comprobar",solved:"¡Resuelto!",tryAgain:"Todavía hay respuestas incorrectas.",historyTitle:"Historial sincronizado",moves:"jugadas"
    },
    ru: {
      title:"Игры и задания",sub:"Тренируйте логику, математику и словарный запас. Игра работает на устройстве.",back:"Назад",play:"Играть",tournament:"Создать турнир",raffle:"Создать розыгрыш",history:"Моя история",free:"СВОБОДНО",premium:"ПОДПИСКА",local:"Локальная обработка",subscriber:"Только для подписчиков",subscriberText:"Этот уровень относится к расширенным функциям EduCashPro. Активируйте подписку, чтобы открыть его.",presentation:"О презентации EduCashPro",subscribe:"Оформить подписку",cancel:"Не сейчас",
      sliding:"Числовая головоломка",slidingSub:"Расставьте плитки по порядку через пустую клетку.",peg:"Пег-солитер",pegSub:"Разные формы доски, цвета и допустимые ходы.",math:"Math Space",mathSub:"Решите пример до того, как он достигнет корабля.",words:"Поиск слов",wordsSub:"Найдите скрытые слова в разных направлениях.",cross:"Math Cross",crossSub:"Заполните пересекающиеся арифметические выражения.",
      basic:"Базовый",medium:"Средний",advanced:"Продвинутый",nerd:"Nerd",chooseLevel:"Выберите уровень",lives:"Жизни",score:"Очки",combo:"Комбо",pause:"Пауза",resume:"Продолжить",quit:"Выйти",gameOver:"Игра окончена",again:"Ещё раз",record:"Рекорд",sound:"Звук",shoot:"Выстрел",answer:"Введите ответ",historyEmpty:"Синхронизированных игр пока нет.",syncNote:"Активные подписчики синхронизируют только итог игры. Ходы и анимации не отправляются.",
      howPeg:"Перепрыгните одной фишкой через другую в пустую лунку. Перепрыгнутая фишка удаляется. На квадратных досках ходы горизонтальные/вертикальные, на треугольной — по трём осям.",remaining:"Осталось",possible:"Показать ходы",undo:"Отменить",perfect:"Идеальный финал!",noMoves:"Ходов больше нет.",english:"Английская — 33",european:"Европейская — 37",wiegleb:"Виглеб — 45",diamond:"Ромб — 41",triangle:"Треугольная — 15",
      findAll:"Найдите все",firstCell:"Нажмите первую, затем последнюю букву слова.",found:"Найдено",crossHelp:"Нажмите зелёную клетку и выберите число. Умножение и деление выполняются раньше сложения и вычитания.",check:"Проверить",solved:"Решено!",tryAgain:"Есть неверные ответы.",historyTitle:"Синхронизированная история",moves:"ходов"
    }
  };

  const GAME_META = {
    "math-space": ["🚀", "math", "mathSub"],
    "peg-solitaire": ["🔵", "peg", "pegSub"],
    "sliding-puzzle": ["🔢", "sliding", "slidingSub"],
    "word-search": ["🔎", "words", "wordsSub"],
    "math-cross": ["➕", "cross", "crossSub"]
  };

  const $ = (selector) => document.querySelector(selector);
  const content = () => document.getElementById("content");
  const esc = (value) => String(value ?? "").replace(/[&<>"']/g, (c) => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[c]);
  let raf = 0;

  function language(requested) {
    const value = String(requested || bridge.session?.profile?.language || navigator.language || "pt").slice(0,2).toLowerCase();
    return TXT[value] ? value : "pt";
  }
  function text(key, requested) { return TXT[language(requested)][key] || TXT.pt[key] || key; }
  function active() { return bridge.session?.profile?.active === true; }
  function stopMotion() { if (raf) cancelAnimationFrame(raf); raf = 0; }
  function top() { window.scrollTo({top:0,behavior:"smooth"}); }
  function apiBase() {
    return "https://educashpro-all.onrender.com";
  }
  function openUrl(url) {
    if (!url) return;
    const tg = window.Telegram?.WebApp;
    if (/^https:\/\/t\.me\//i.test(url) && tg?.openTelegramLink) tg.openTelegramLink(url);
    else if (tg?.openLink) tg.openLink(url);
    else window.open(url,"_blank","noopener");
  }

  async function refreshSession() {
    const initData = String(window.Telegram?.WebApp?.initData || "");
    if (!initData) return false;
    try {
      const response = await fetch(`${apiBase()}/api/hub/session`, {
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify({initData})
      });
      const session = await response.json();
      if (!response.ok || !session?.ok || !session?.token) return false;
      bridge.session = session;
      base.setSession?.(session);
      return true;
    } catch { return false; }
  }

  async function api(path, body, canRefresh = true) {
    const response = await fetch(`${apiBase()}${path}`, {
      method:"POST",
      headers:{"Content-Type":"application/json"},
      body:JSON.stringify({token:bridge.session?.token || "", ...body})
    });
    const data = await response.json().catch(() => ({ok:false,reason:"invalid_response"}));
    if (response.status === 401 && canRefresh && await refreshSession()) return api(path,body,false);
    if (!response.ok || data?.ok === false) {
      const error = new Error(data?.reason || `HTTP_${response.status}`);
      error.data = data;
      throw error;
    }
    return data;
  }

  function modal(icon,title,description,actions) {
    document.querySelector(".ecpModal")?.remove();
    const node = document.createElement("div");
    node.className = "ecpModal";
    node.innerHTML = `<section class="ecpModalCard"><div class="ecpModalIcon">${icon}</div><h2>${esc(title)}</h2><p>${esc(description)}</p><div class="ecpModalActions">${actions.map((a,i)=>`<button data-modal-action="${i}" class="${a.primary?"wideButton":"secondaryButton"}">${esc(a.label)}</button>`).join("")}</div></section>`;
    document.body.appendChild(node);
    node.addEventListener("click", (event) => { if (event.target === node) node.remove(); });
    actions.forEach((action,index) => node.querySelector(`[data-modal-action="${index}"]`)?.addEventListener("click", () => {
      if (action.close !== false) node.remove();
      action.run?.();
    }));
  }

  function paywall(level, requested) {
    modal("🔒", `${text("subscriber",requested)} — ${text(level,requested)}`, text("subscriberText",requested), [
      {label:text("presentation",requested),run:()=>window.EduCashProApp?.renderPresentation?.()},
      {label:text("subscribe",requested),primary:true,run:()=>openUrl(bridge.session?.subscribeUrl || bridge.session?.botUrl)},
      {label:text("cancel",requested)}
    ]);
  }

  function backButton() { return `<button class="textButton gameBackLocal" type="button">←</button>`; }
  function bindBack(fn) { $(".gameBackLocal")?.addEventListener("click", () => { stopMotion(); fn(); }); }

  async function saveHistory(game,difficulty,summary) {
    if (!active() || !bridge.session?.token) return;
    try {
      await api("/api/games/history/save", {
        game,difficulty,score:summary.score,durationMs:summary.durationMs,hits:summary.hits,
        errors:summary.errors,bestCombo:summary.bestCombo,stage:summary.stage
      });
    } catch {}
  }

  function gameCard(gameId, requested) {
    const [icon,nameKey,subKey] = GAME_META[gameId];
    return `<article class="gameCardV2"><div class="gameCardArt">${icon}</div><h3>${esc(text(nameKey,requested))}</h3><p>${esc(text(subKey,requested))}</p><div class="gameBadges"><span class="gameBadge">${esc(text("free",requested))}</span><span class="gameBadge premium">${esc(text("premium",requested))}</span></div><div class="gameCardActions"><button class="gamePlayBtn" data-play="${gameId}">${esc(text("play",requested))}</button><button class="gameTournamentBtn" data-tournament="${gameId}">🏆 ${esc(text("tournament",requested))}</button></div></article>`;
  }

  function renderCatalog(options={}) {
    stopMotion();
    bridge.catalogContext = {...bridge.catalogContext,...options};
    bridge.currentGame = null;
    const requested = language(options.lang);
    document.getElementById("bottomNav")?.classList.add("hidden");
    content().innerHTML = `<main class="gameSuite"><div class="gameSuiteHeader"><div><span class="eyebrow">EDUCASHPRO PLAY</span><h1>🎮 ${esc(text("title",requested))}</h1><p>${esc(text("sub",requested))}</p></div>${bridge.catalogContext.back?`<button class="textButton gameCatalogBack">← ${esc(text("back",requested))}</button>`:""}</div><section class="gameCatalogV2">${Object.keys(GAME_META).map(id=>gameCard(id,requested)).join("")}</section><section class="socialActions"><button id="gameHistory" class="secondaryButton">☁️ ${esc(text("history",requested))}</button></section><p class="notice">📱 ${esc(text("local",requested))}. ${esc(text("syncNote",requested))}</p></main>`;
    $(".gameCatalogBack")?.addEventListener("click",()=>bridge.catalogContext.back?.());
    document.querySelectorAll("[data-play]").forEach(button=>button.addEventListener("click",()=>launchGame(button.dataset.play,{lang:requested})));
    document.querySelectorAll("[data-tournament]").forEach(button=>button.addEventListener("click",()=>window.EduCashProSocial?.openTournament?.(button.dataset.tournament,{lang:requested})));
    $("#gameHistory")?.addEventListener("click",()=>active()?renderHistory(requested):paywall("advanced",requested));
    top();
  }

  async function renderHistory(requested) {
    content().innerHTML = `<main class="gamePage">${backButton()}<section class="hero"><span class="eyebrow">CLOUD</span><h1>☁️ ${esc(text("historyTitle",requested))}</h1><p>${esc(text("syncNote",requested))}</p></section><div id="historyList" class="cardList"><div class="empty">•••</div></div></main>`;
    bindBack(()=>renderCatalog(bridge.catalogContext));
    try {
      const data = await api("/api/games/history/list",{});
      $("#historyList").innerHTML = data.items?.length ? data.items.map(row=>{
        const meta = GAME_META[row.game] || ["🎮","title",""];
        return `<article class="itemCard"><div class="itemTop"><div class="itemIcon">${meta[0]}</div><div><h3>${esc(text(meta[1],requested))}</h3><p>${esc(text(row.difficulty,requested))} · ${esc(new Date(row.finishedAt).toLocaleDateString())}</p></div></div><div class="meta"><span class="chip">⭐ ${Number(row.score||0)}</span><span class="chip">⏱ ${Math.round(Number(row.durationMs||0)/1000)}s</span>${row.bestCombo?`<span class="chip">🔥 x${row.bestCombo}</span>`:""}</div></article>`;
      }).join("") : `<div class="empty">${esc(text("historyEmpty",requested))}</div>`;
    } catch { $("#historyList").innerHTML = `<div class="empty">${esc(text("historyEmpty",requested))}</div>`; }
  }

  function levelSelector(gameId,requested,onPick,options={}) {
    const levels=["basic","medium","advanced","nerd"];
    content().innerHTML = `<main class="gamePage">${backButton()}<section class="hero"><span class="eyebrow">${esc(text(GAME_META[gameId][1],requested))}</span><h1>${esc(text("chooseLevel",requested))}</h1><p>${esc(text(GAME_META[gameId][2],requested))}</p></section><section class="levelGrid">${levels.map((level,index)=>{const locked=index>1&&!active()&&!options.tournament;return `<button class="levelCard ${locked?"locked":""}" data-level="${level}">${locked?`<span class="lock">🔒</span>`:""}<strong>${esc(text(level,requested))}</strong><small>${esc(index<2?text("free",requested):text("premium",requested))}</small></button>`}).join("")}</section></main>`;
    bindBack(()=>renderCatalog(bridge.catalogContext));
    document.querySelectorAll("[data-level]").forEach(button=>button.onclick=()=>{
      const index=levels.indexOf(button.dataset.level);
      if(index>1&&!active()&&!options.tournament)return paywall(button.dataset.level,requested);
      onPick(button.dataset.level);
    });
    top();
  }

  function xorshift(seed) {
    let state = Number(seed)>>>0 || 1;
    return () => {
      state ^= state << 13; state >>>= 0;
      state ^= state >>> 17; state >>>= 0;
      state ^= state << 5; state >>>= 0;
      return state / 4294967296;
    };
  }
  function gcd(a,b){a=Math.abs(a);b=Math.abs(b);while(b)[a,b]=[b,a%b];return a||1}
  function fraction(n,d){if(d<0){n*=-1;d*=-1}const g=gcd(n,d);n/=g;d/=g;return d===1?String(n):`${n}/${d}`}
  function normalizeAnswer(value){const raw=String(value??"").trim().replace(",",".").replace(/−/g,"-");const match=raw.match(/^(-?\d+)\/(\d+)$/);return match&&Number(match[2])?fraction(Number(match[1]),Number(match[2])):raw}

  function makeMathQuestion(random,difficulty) {
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
      const a=2+pick(18),b=2+pick(10),c=2+pick(9);return[`${a} + ${b} × ${c}`,String(a+b*c)];
    }
    if(difficulty==="advanced"){
      const a=1+pick(8),b=2+pick(8),c=1+pick(8),d=2+pick(8),op=pick(4);
      if(op===0)return[`${a}/${b} + ${c}/${d}`,fraction(a*d+c*b,b*d)];
      if(op===1)return[`${a}/${b} − ${c}/${d}`,fraction(a*d-c*b,b*d)];
      if(op===2)return[`${a}/${b} × ${c}/${d}`,fraction(a*c,b*d)];
      return[`${a}/${b} ÷ ${c}/${d}`,fraction(a*d,b*c)];
    }
    const kind=pick(5);
    if(kind===0){const r=2+pick(14);return[`√${r*r}`,String(r)]}
    if(kind===1){const a=2+pick(10),p=2+pick(2);return[`${a}${p===2?"²":"³"}`,String(a**p)]}
    if(kind===2){const pct=[10,20,25,50,75][pick(5)],base=4*(5+pick(21));return[`${pct}% de ${base}`,String(pct*base/100)]}
    if(kind===3){const x=1+pick(15),a=2+pick(6),b=pick(15),result=a*x+b;return[`${a}x + ${b} = ${result}`,String(x)]}
    const a=2+pick(8),b=2+pick(8);return[`${a}² + √${b*b}`,String(a*a+b)];
  }

  function beep(type) {
    if(localStorage.getItem("ecp:game:sound")==="off")return;
    try{
      const Audio=window.AudioContext||window.webkitAudioContext;
      const ctx=beep.ctx||(beep.ctx=new Audio());
      const oscillator=ctx.createOscillator(),gain=ctx.createGain();
      oscillator.frequency.value=type==="ok"?720:type==="bad"?180:420;
      gain.gain.value=.035;
      oscillator.connect(gain);gain.connect(ctx.destination);oscillator.start();oscillator.stop(ctx.currentTime+.08);
    }catch{}
  }

  function renderMath(level,requested,tournament) {
    stopMotion(); bridge.currentGame="math-space";
    const seed=tournament?.seed || crypto.getRandomValues(new Uint32Array(1))[0] || 1;
    const random=xorshift(seed),startedAt=Date.now(),maxSeconds=Number(tournament?.maxSeconds||0),highKey=`ecp:math:high:${level}`;
    let lives=5,score=0,combo=0,bestCombo=0,hits=0,errors=0,misses=0,answer="",paused=false,transitioning=false,finished=false,question=null,questionStarted=0,events=[];

    content().innerHTML=`<main class="gamePage">${backButton()}<div class="gameTopline"><span class="eyebrow">${esc(text("math",requested))} · ${esc(text(level,requested))}</span><div class="gameStats"><button id="mathSound" class="gameStat">${localStorage.getItem("ecp:game:sound")==="off"?"🔇":"🔊"}</button><button id="mathPause" class="gameStat">⏸</button></div></div><section id="mathArena" class="mathArena"><div class="mathStars"></div><div class="mathHud"><span><strong id="mathScore">0</strong> · <span id="mathCombo">x0</span></span><span id="mathLives" class="mathLives">❤️❤️❤️❤️❤️</span></div><div id="mathQuestion" class="mathQuestion"></div><div id="mathLaser" class="mathLaser"></div><div class="mathShip">🚀</div><div class="mathControls"><div id="mathAnswer" class="mathAnswer">${esc(text("answer",requested))}</div><div class="mathKeypad">${[1,2,3,4,5,6,7,8,9,0,"/","-"].map(key=>`<button data-key="${key}">${key}</button>`).join("")}<button class="dangerKey" data-key="back">⌫</button><button class="dangerKey" data-key="clear">C</button><button class="shoot" data-key="shoot">🚀 ${esc(text("shoot",requested))}</button></div></div></section></main>`;
    bindBack(()=>tournament?window.EduCashProSocial?.returnToTournament?.(tournament.code):renderCatalog(bridge.catalogContext));
    const arena=$("#mathArena"),questionEl=$("#mathQuestion");

    function updateHud(){
      $("#mathScore").textContent=score;
      $("#mathCombo").textContent=`x${combo}`;
      $("#mathLives").textContent="❤️".repeat(Math.max(0,lives))+"♡".repeat(Math.max(0,5-lives));
      $("#mathAnswer").textContent=answer||text("answer",requested);
    }
    function nextQuestion(){
      if(finished)return;
      question=makeMathQuestion(random,level);
      questionEl.textContent=`${question[0]} = ?`;
      questionEl.style.top="70px";
      questionStarted=performance.now();
      answer="";transitioning=false;updateHud();
      if(!raf)raf=requestAnimationFrame(frame);
    }
    function consume(kind){
      if(finished||transitioning||!question)return;
      transitioning=true;
      if(kind==="ok"){
        hits++;combo++;bestCombo=Math.max(bestCombo,combo);score+=10+Math.min(20,Math.max(0,combo-1)*2);events.push({answer:question[1]});beep("ok");
        const laser=$("#mathLaser");laser.classList.remove("fire");void laser.offsetWidth;laser.classList.add("fire");
      }else if(kind==="wrong"){
        errors++;combo=0;lives--;events.push({answer});beep("bad");
      }else{
        misses++;combo=0;lives--;events.push({miss:true});beep("bad");
      }
      updateHud();
      if(lives<=0){finish();return;}
      setTimeout(nextQuestion,kind==="ok"?180:110);
    }
    function frame(now){
      raf=0;
      if(finished)return;
      if(!paused&&maxSeconds&&Date.now()-startedAt>=maxSeconds*1000){finish();return;}
      if(!paused&&!transitioning){
        const baseSpeed={basic:36,medium:48,advanced:44,nerd:50}[level]||40;
        const speed=baseSpeed+Math.min(42,score/55);
        const y=70+(now-questionStarted)*speed/1000;
        questionEl.style.top=`${y}px`;
        if(y>arena.clientHeight-235){consume("miss");return;}
      }
      raf=requestAnimationFrame(frame);
    }
    async function finish(){
      if(finished)return;
      finished=true;stopMotion();
      const durationMs=Date.now()-startedAt,record=Math.max(Number(localStorage.getItem(highKey)||0),score);
      localStorage.setItem(highKey,String(record));
      const summary={score,durationMs,hits,errors:errors+misses,bestCombo,stage:events.length};
      if(tournament)return window.EduCashProSocial?.submitTournamentResult?.(tournament,{score,stats:summary},{events});
      await saveHistory("math-space",level,summary);
      content().innerHTML=`<main class="gamePage"><section class="hero"><span class="eyebrow">${esc(text("gameOver",requested))}</span><h1>⭐ ${score}</h1><p>${esc(text("record",requested))}: <b>${record}</b> · ${esc(text("combo",requested))}: x${bestCombo}</p></section><section class="socialActions"><button id="mathAgain" class="wideButton">${esc(text("again",requested))}</button><button id="mathLevels" class="secondaryButton">${esc(text("chooseLevel",requested))}</button></section></main>`;
      $("#mathAgain").onclick=()=>renderMath(level,requested);
      $("#mathLevels").onclick=()=>levelSelector("math-space",requested,next=>renderMath(next,requested));
    }

    document.querySelectorAll("[data-key]").forEach(button=>button.onclick=()=>{
      if(transitioning||finished)return;
      const key=button.dataset.key;
      if(key==="back")answer=answer.slice(0,-1);
      else if(key==="clear")answer="";
      else if(key==="shoot"){
        if(!answer||!question)return;
        consume(normalizeAnswer(answer)===normalizeAnswer(question[1])?"ok":"wrong");
        return;
      }else if(answer.length<8)answer+=key;
      updateHud();
    });
    $("#mathSound").onclick=()=>{
      const off=localStorage.getItem("ecp:game:sound")==="off";
      localStorage.setItem("ecp:game:sound",off?"on":"off");
      $("#mathSound").textContent=off?"🔊":"🔇";
    };
    $("#mathPause").onclick=()=>{
      paused=!paused;
      $("#mathPause").textContent=paused?"▶":"⏸";
      if(paused){
        arena.insertAdjacentHTML("beforeend",`<div id="mathPauseOverlay" class="mathPauseOverlay"><h2>${esc(text("pause",requested))}</h2><button id="mathResume" class="wideButton">${esc(text("resume",requested))}</button><button id="mathQuit" class="secondaryButton">${esc(text("quit",requested))}</button></div>`);
        $("#mathResume").onclick=()=>$("#mathPause").click();
        $("#mathQuit").onclick=()=>tournament?window.EduCashProSocial?.returnToTournament?.(tournament.code):renderCatalog(bridge.catalogContext);
      }else{
        $("#mathPauseOverlay")?.remove();
        questionStarted=performance.now();
      }
    };
    nextQuestion();top();
  }

  const PEG_VARIANTS=[
    {id:"english",key:"english",free:true,color:"#30e6a6"},
    {id:"european",key:"european",free:true,color:"#4a8cff"},
    {id:"wiegleb",key:"wiegleb",free:false,color:"#ffc85c"},
    {id:"diamond",key:"diamond",free:false,color:"#ff7aa8"},
    {id:"triangle",key:"triangle",free:false,color:"#a88cff"}
  ];

  function squareVariant(type){
    const coords=[];let size=7;
    if(type==="english"){
      for(let r=0;r<7;r++)for(let c=0;c<7;c++)if((r>=2&&r<=4)||(c>=2&&c<=4))coords.push([r,c]);
    }else if(type==="european"){
      [3,5,7,7,7,5,3].forEach((len,r)=>{const start=(7-len)/2;for(let c=start;c<start+len;c++)coords.push([r,c]);});
    }else if(type==="wiegleb"){
      size=9;for(let r=0;r<9;r++)for(let c=0;c<9;c++)if((r>=3&&r<=5)||(c>=3&&c<=5))coords.push([r,c]);
    }else if(type==="diamond"){
      size=9;for(let r=0;r<9;r++){const len=1+2*(r<=4?r:8-r),start=(9-len)/2;for(let c=start;c<start+len;c++)coords.push([r,c]);}
    }
    return{size,coords};
  }

  function renderPegMenu(requested,tournament){
    content().innerHTML=`<main class="gamePage">${backButton()}<section class="hero"><span class="eyebrow">${esc(text("peg",requested))}</span><h1>🔵 ${esc(text("peg",requested))}</h1><p>${esc(text("howPeg",requested))}</p></section><section class="pegVariantGrid">${PEG_VARIANTS.map(variant=>`<button class="pegVariant" data-peg="${variant.id}" style="border-color:${variant.color}55"><span style="color:${variant.color};font-size:25px">●</span><strong>${esc(text(variant.key,requested))}${!variant.free&&!active()&&!tournament?" 🔒":""}</strong><small>${esc(variant.free?text("free",requested):text("premium",requested))}</small></button>`).join("")}</section></main>`;
    bindBack(()=>renderCatalog(bridge.catalogContext));
    document.querySelectorAll("[data-peg]").forEach(button=>button.onclick=()=>{
      const variant=PEG_VARIANTS.find(row=>row.id===button.dataset.peg);
      if(!variant.free&&!active()&&!tournament)return paywall("advanced",requested);
      renderPeg(variant.id,requested,tournament);
    });
    top();
  }

  function renderPeg(type,requested,tournament){
    stopMotion();bridge.currentGame="peg-solitaire";
    const variant=PEG_VARIANTS.find(row=>row.id===type)||PEG_VARIANTS[0],startedAt=Date.now(),history=[];
    let selected=null,cells=new Set(),pegs=new Set(),size=7;
    if(type==="triangle"){
      for(let r=0;r<5;r++)for(let c=0;c<=r;c++)cells.add(`${r},${c}`);
      pegs=new Set(cells);pegs.delete("0,0");
    }else{
      const data=squareVariant(type);size=data.size;cells=new Set(data.coords.map(([r,c])=>`${r},${c}`));pegs=new Set(cells);pegs.delete(type==="wiegleb"||type==="diamond"?"4,4":"3,3");
    }
    const initial=pegs.size;
    function movesFrom(from){
      if(!pegs.has(from))return[];
      const[fr,fc]=from.split(",").map(Number);
      const dirs=type==="triangle"?[[0,2],[0,-2],[2,0],[-2,0],[2,2],[-2,-2]]:[[0,2],[0,-2],[2,0],[-2,0]];
      return dirs.flatMap(([dr,dc])=>{const to=`${fr+dr},${fc+dc}`,middle=`${fr+dr/2},${fc+dc/2}`;return cells.has(to)&&pegs.has(middle)&&!pegs.has(to)?[{from,middle,to}]:[];});
    }
    function allMoves(){return[...pegs].flatMap(movesFrom)}
    function boardHtml(){
      if(type==="triangle")return`<div class="pegBoard pegTriangle" style="--peg:${variant.color}">${[...cells].map(key=>{const[r,c]=key.split(",").map(Number),column=5-r+c*2;return`<button class="pegHole ${pegs.has(key)?"peg":""} ${selected===key?"selected":""}" data-hole="${key}" style="grid-row:${r+1};grid-column:${column}"></button>`}).join("")}</div>`;
      let html=`<div class="pegBoard" style="--peg:${variant.color};grid-template-columns:repeat(${size},38px)">`;
      for(let r=0;r<size;r++)for(let c=0;c<size;c++){const key=`${r},${c}`;html+=cells.has(key)?`<button class="pegHole ${pegs.has(key)?"peg":""} ${selected===key?"selected":""}" data-hole="${key}"></button>`:`<span class="pegVoid"></span>`;}
      return html+"</div>";
    }
    function draw(){
      content().innerHTML=`<main class="gamePage">${backButton()}<div class="gameTopline"><span class="eyebrow">${esc(text(variant.key,requested))}</span><div class="gameStats"><span class="gameStat">${esc(text("remaining",requested))}: <b>${pegs.size}</b></span><span class="gameStat">${history.length} ${esc(text("moves",requested))}</span></div></div><div>${boardHtml()}</div><section class="socialActions"><button id="pegHint" class="secondaryButton">💡 ${esc(text("possible",requested))}</button><button id="pegUndo" class="secondaryButton" ${history.length?"":"disabled"}>↶ ${esc(text("undo",requested))}</button></section></main>`;
      bindBack(()=>tournament?window.EduCashProSocial?.returnToTournament?.(tournament.code):renderPegMenu(requested));
      document.querySelectorAll("[data-hole]").forEach(button=>button.onclick=()=>clickHole(button.dataset.hole));
      $("#pegUndo").onclick=undo;
      $("#pegHint").onclick=()=>{document.querySelectorAll(".pegHole.target").forEach(node=>node.classList.remove("target"));allMoves().forEach(move=>document.querySelector(`[data-hole="${move.to}"]`)?.classList.add("target"));};
    }
    function clickHole(key){
      if(pegs.has(key)){selected=key;draw();return;}
      if(!selected)return;
      const move=movesFrom(selected).find(row=>row.to===key);
      if(!move){selected=null;draw();return;}
      history.push(move);pegs.delete(move.from);pegs.delete(move.middle);pegs.add(move.to);selected=null;draw();
      if(!allMoves().length)finish();
    }
    function undo(){const move=history.pop();if(!move)return;pegs.add(move.from);pegs.add(move.middle);pegs.delete(move.to);selected=null;draw();}
    async function finish(){
      const remaining=pegs.size,score=(initial-remaining)*100+(remaining===1?1000:0),durationMs=Date.now()-startedAt;
      if(tournament)return window.EduCashProSocial?.submitTournamentResult?.(tournament,{score,stats:{remaining,moves:history.length}},{variant:type,moves:history.map(move=>({from:move.from,to:move.to}))});
      await saveHistory("peg-solitaire",variant.free?"basic":"advanced",{score,durationMs,hits:history.length,errors:remaining,bestCombo:0,stage:history.length});
      setTimeout(()=>modal(remaining===1?"🏆":"🔵",remaining===1?text("perfect",requested):text("noMoves",requested),`${text("remaining",requested)}: ${remaining} · ${text("score",requested)}: ${score}`,[{label:text("again",requested),primary:true,run:()=>renderPeg(type,requested)},{label:text("back",requested),run:()=>renderPegMenu(requested)}]),100);
    }
    draw();top();
  }

  function makeSliding(size,steps,random){
    const board=Array.from({length:size*size},(_,index)=>index===size*size-1?0:index+1);let blank=board.length-1,previous=-1;
    for(let i=0;i<steps;i++){
      const row=Math.floor(blank/size),column=blank%size;let choices=[];
      if(row>0)choices.push(blank-size);if(row<size-1)choices.push(blank+size);if(column>0)choices.push(blank-1);if(column<size-1)choices.push(blank+1);
      const filtered=choices.filter(value=>value!==previous);if(filtered.length)choices=filtered;
      const next=choices[Math.floor(random()*choices.length)%choices.length];board[blank]=board[next];board[next]=0;previous=blank;blank=next;
    }
    return board;
  }

  function renderSliding(requested,tournament,level="medium"){
    const size={basic:3,medium:4,advanced:5,nerd:5}[level]||4,random=xorshift(tournament?.seed||crypto.getRandomValues(new Uint32Array(1))[0]||1),board=makeSliding(size,size*size*14,random),startedAt=Date.now();let moves=0;
    function neighbors(blank){const row=Math.floor(blank/size),column=blank%size,result=[];if(row>0)result.push(blank-size);if(row<size-1)result.push(blank+size);if(column>0)result.push(blank-1);if(column<size-1)result.push(blank+1);return result}
    function solved(){return board.every((value,index)=>value===(index===board.length-1?0:index+1))}
    function draw(){
      content().innerHTML=`<main class="gamePage">${backButton()}<section class="hero"><span class="eyebrow">${esc(text("sliding",requested))} · ${size}×${size}</span><h1>🔢 ${esc(text("sliding",requested))}</h1><p>${esc(text("slidingSub",requested))}</p></section><div class="crossBoard"><div style="display:grid;grid-template-columns:repeat(${size},minmax(45px,70px));gap:5px;justify-content:center">${board.map((value,index)=>`<button data-slide="${index}" style="aspect-ratio:1;border:0;border-radius:12px;background:${value?"#fff3bd":"transparent"};font-weight:900;font-size:20px">${value||""}</button>`).join("")}</div></div><div class="gameStats"><span class="gameStat"><b>${moves}</b> ${esc(text("moves",requested))}</span></div></main>`;
      bindBack(()=>tournament?window.EduCashProSocial?.returnToTournament?.(tournament.code):renderCatalog(bridge.catalogContext));
      document.querySelectorAll("[data-slide]").forEach(button=>button.onclick=()=>{const index=Number(button.dataset.slide),blank=board.indexOf(0);if(!neighbors(blank).includes(index))return;board[blank]=board[index];board[index]=0;moves++;if(solved())finish();else draw();});
    }
    async function finish(){
      const durationMs=Date.now()-startedAt,score=Math.max(100,10000-moves*20-Math.floor(durationMs/1000)*5);
      if(tournament)return window.EduCashProSocial?.submitTournamentResult?.(tournament,{score,stats:{moves,size}},{moves});
      await saveHistory("sliding-puzzle",level,{score,durationMs,hits:moves,errors:0,bestCombo:0,stage:size});
      modal("🏆",text("solved",requested),`${text("score",requested)}: ${score} · ${moves} ${text("moves",requested)}`,[{label:text("again",requested),primary:true,run:()=>renderSliding(requested,null,level)},{label:text("back",requested),run:()=>renderCatalog(bridge.catalogContext)}]);
    }
    draw();top();
  }

  const WORDS={
    pt:["PLANETA","ENERGIA","FUTURO","ESCOLA","AMIZADE","CIENCIA","DINHEIRO","VIAGEM","CULTURA","HISTORIA","NATUREZA","TECNOLOGIA"],
    en:["PLANET","ENERGY","FUTURE","SCHOOL","FRIEND","SCIENCE","MONEY","TRAVEL","CULTURE","HISTORY","NATURE","TECHNOLOGY"],
    es:["PLANETA","ENERGIA","FUTURO","ESCUELA","AMISTAD","CIENCIA","DINERO","VIAJE","CULTURA","HISTORIA","NATURALEZA","TECNOLOGIA"],
    ru:["ПЛАНЕТА","ЭНЕРГИЯ","БУДУЩЕЕ","ШКОЛА","ДРУЖБА","НАУКА","ДЕНЬГИ","ПОЕЗДКА","КУЛЬТУРА","ИСТОРИЯ","ПРИРОДА","ТЕХНОЛОГИЯ"]
  };

  function shuffle(items,random){const copy=[...items];for(let i=copy.length-1;i>0;i--){const j=Math.floor(random()*(i+1));[copy[i],copy[j]]=[copy[j],copy[i]];}return copy;}

  function renderWordSearch(level,requested,tournament){
    const currentLanguage=language(requested),size={basic:8,medium:10,advanced:11,nerd:12}[level]||10,count={basic:5,medium:7,advanced:9,nerd:10}[level]||7;
    const random=xorshift(tournament?.seed||crypto.getRandomValues(new Uint32Array(1))[0]||1),all=(WORDS[currentLanguage]||WORDS.pt).map(word=>word.normalize("NFD").replace(/[\u0300-\u036f]/g,"").toUpperCase()).filter(word=>word.length<=size),targets=shuffle(all,random).slice(0,Math.min(count,all.length)),grid=Array.from({length:size},()=>Array(size).fill("")),directions=[[0,1],[1,0],[1,1],[1,-1]],positions={};
    const letters=currentLanguage==="ru"?"АБВГДЕЖЗИКЛМНОПРСТУФХЦЧШЫЭЮЯ":"ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    targets.forEach(word=>{
      for(let tries=0;tries<250;tries++){
        const[dr,dc]=directions[Math.floor(random()*directions.length)],row=Math.floor(random()*size),column=Math.floor(random()*size),endRow=row+dr*(word.length-1),endColumn=column+dc*(word.length-1);
        if(endRow<0||endRow>=size||endColumn<0||endColumn>=size)continue;
        let valid=true;for(let i=0;i<word.length;i++){const current=grid[row+dr*i][column+dc*i];if(current&&current!==word[i]){valid=false;break}}
        if(!valid)continue;
        positions[word]=[];for(let i=0;i<word.length;i++){grid[row+dr*i][column+dc*i]=word[i];positions[word].push(`${row+dr*i},${column+dc*i}`);}break;
      }
    });
    const actualTargets=targets.filter(word=>positions[word]?.length===word.length);
    for(let row=0;row<size;row++)for(let column=0;column<size;column++)if(!grid[row][column])grid[row][column]=letters[Math.floor(random()*letters.length)];
    let first=null,found=new Set(),startedAt=Date.now();
    function draw(){
      content().innerHTML=`<main class="gamePage">${backButton()}<section class="hero"><span class="eyebrow">${esc(text("words",requested))} · ${esc(text(level,requested))}</span><h1>🔎 ${esc(text("findAll",requested))}</h1><p>${esc(text("firstCell",requested))}</p></section><div class="wordList">${actualTargets.map(word=>`<span class="wordChip ${found.has(word)?"done":""}">${esc(word)}</span>`).join("")}</div><div class="wordBoard" style="grid-template-columns:repeat(${size},1fr)">${grid.flatMap((row,rowIndex)=>row.map((letter,columnIndex)=>{const key=`${rowIndex},${columnIndex}`,isFound=[...found].some(word=>positions[word]?.includes(key));return`<button class="wordCell ${first===key?"first":""} ${isFound?"found":""}" data-word-cell="${key}">${esc(letter)}</button>`;})).join("")}</div><div class="gameStats"><span class="gameStat">${esc(text("found",requested))}: <b>${found.size}/${actualTargets.length}</b></span></div></main>`;
      bindBack(()=>tournament?window.EduCashProSocial?.returnToTournament?.(tournament.code):levelSelector("word-search",requested,next=>renderWordSearch(next,requested)));
      document.querySelectorAll("[data-word-cell]").forEach(button=>button.onclick=()=>pick(button.dataset.wordCell));
    }
    function pick(key){
      if(!first){first=key;draw();return;}
      const[startRow,startColumn]=first.split(",").map(Number),[endRow,endColumn]=key.split(",").map(Number),dr=endRow-startRow,dc=endColumn-startColumn,steps=Math.max(Math.abs(dr),Math.abs(dc));
      if(!(dr===0||dc===0||Math.abs(dr)===Math.abs(dc))||!steps){first=null;draw();return;}
      const stepRow=dr/steps,stepColumn=dc/steps;let word="";
      for(let i=0;i<=steps;i++)word+=grid[startRow+stepRow*i]?.[startColumn+stepColumn*i]||"";
      const reverse=[...word].reverse().join(""),match=actualTargets.find(target=>!found.has(target)&&(target===word||target===reverse));
      if(match){found.add(match);beep("ok");}
      first=null;if(found.size===actualTargets.length)finish();else draw();
    }
    async function finish(){
      const durationMs=Date.now()-startedAt,score=actualTargets.length*100+Math.max(0,1000-Math.floor(durationMs/1000)*5);
      if(tournament)return window.EduCashProSocial?.submitTournamentResult?.(tournament,{score,stats:{found:found.size,total:actualTargets.length}},{found:[...found]});
      await saveHistory("word-search",level,{score,durationMs,hits:found.size,errors:0,bestCombo:0,stage:actualTargets.length});
      modal("🏆",text("solved",requested),`${text("score",requested)}: ${score}`,[{label:text("again",requested),primary:true,run:()=>renderWordSearch(level,requested)},{label:text("back",requested),run:()=>renderCatalog(bridge.catalogContext)}]);
    }
    draw();top();
  }

  function applyOp(a,op,b){return op==="+"?a+b:op==="-"?a-b:op==="×"?a*b:a/b}
  function evaluate3(a,op1,b,op2,c){
    const high=op=>op==="×"||op==="÷";
    if(high(op1)&&high(op2))return applyOp(applyOp(a,op1,b),op2,c);
    if(high(op1))return applyOp(applyOp(a,op1,b),op2,c);
    if(high(op2))return applyOp(a,op1,applyOp(b,op2,c));
    return applyOp(applyOp(a,op1,b),op2,c);
  }
  function makeCross(level,random){
    const operators=level==="basic"?["+"]:level==="medium"?["+","-"]:level==="advanced"?["+","-","×"]:["+","-","×","÷"];
    for(let tries=0;tries<400;tries++){
      const max=level==="basic"?9:level==="medium"?15:20,matrix=Array.from({length:9},()=>1+Math.floor(random()*max)),ops=Array.from({length:12},()=>operators[Math.floor(random()*operators.length)]);
      const rowResults=[evaluate3(matrix[0],ops[0],matrix[1],ops[1],matrix[2]),evaluate3(matrix[3],ops[2],matrix[4],ops[3],matrix[5]),evaluate3(matrix[6],ops[4],matrix[7],ops[5],matrix[8])];
      const colResults=[evaluate3(matrix[0],ops[6],matrix[3],ops[7],matrix[6]),evaluate3(matrix[1],ops[8],matrix[4],ops[9],matrix[7]),evaluate3(matrix[2],ops[10],matrix[5],ops[11],matrix[8])];
      if([...rowResults,...colResults].every(Number.isInteger))return{matrix,ops,rowResults,colResults};
    }
    return makeCross("basic",random);
  }

  function renderCross(level,requested,tournament){
    const random=xorshift(tournament?.seed||crypto.getRandomValues(new Uint32Array(1))[0]||1),puzzle=makeCross(level,random),hiddenCount={basic:2,medium:3,advanced:4,nerd:5}[level],hidden=shuffle([...Array(9).keys()],random).slice(0,hiddenCount),fills={},startedAt=Date.now();let selected=null;
    const bank=shuffle([...hidden.map(index=>puzzle.matrix[index]),...Array.from({length:Math.max(2,hiddenCount-1)},()=>1+Math.floor(random()*20))],random);
    function blank(index){return hidden.includes(index)?`<button class="crossTile blank" data-blank="${index}">${fills[index]??"?"}</button>`:`<span class="crossTile">${puzzle.matrix[index]}</span>`}
    function op(value){return`<span class="crossTile operator">${esc(value)}</span>`}
    function empty(){return`<span class="crossTile operator"></span>`}
    function draw(){
      const grid=[];
      grid.push(blank(0),op(puzzle.ops[0]),blank(1),op(puzzle.ops[1]),blank(2),op("="),op(puzzle.rowResults[0]));
      grid.push(op(puzzle.ops[6]),empty(),op(puzzle.ops[8]),empty(),op(puzzle.ops[10]),empty(),empty());
      grid.push(blank(3),op(puzzle.ops[2]),blank(4),op(puzzle.ops[3]),blank(5),op("="),op(puzzle.rowResults[1]));
      grid.push(op(puzzle.ops[7]),empty(),op(puzzle.ops[9]),empty(),op(puzzle.ops[11]),empty(),empty());
      grid.push(blank(6),op(puzzle.ops[4]),blank(7),op(puzzle.ops[5]),blank(8),op("="),op(puzzle.rowResults[2]));
      grid.push(op("="),empty(),op("="),empty(),op("="),empty(),empty());
      grid.push(op(puzzle.colResults[0]),empty(),op(puzzle.colResults[1]),empty(),op(puzzle.colResults[2]),empty(),empty());
      content().innerHTML=`<main class="gamePage">${backButton()}<section class="hero"><span class="eyebrow">${esc(text("cross",requested))} · ${esc(text(level,requested))}</span><h1>➕ ${esc(text("cross",requested))}</h1><p>${esc(text("crossHelp",requested))}</p></section><div class="crossBoard"><div class="crossGrid">${grid.join("")}</div></div><div class="crossBank">${bank.map((value,index)=>`<button data-bank="${index}" data-value="${value}">${value}</button>`).join("")}</div><button id="crossCheck" class="wideButton">${esc(text("check",requested))}</button></main>`;
      bindBack(()=>tournament?window.EduCashProSocial?.returnToTournament?.(tournament.code):levelSelector("math-cross",requested,next=>renderCross(next,requested)));
      document.querySelectorAll("[data-blank]").forEach(button=>button.onclick=()=>{selected=Number(button.dataset.blank);document.querySelectorAll("[data-blank]").forEach(node=>node.style.outline="");button.style.outline="3px solid #30e6a6";});
      document.querySelectorAll("[data-bank]").forEach(button=>button.onclick=()=>{if(selected===null)return;fills[selected]=Number(button.dataset.value);draw();});
      $("#crossCheck").onclick=check;
    }
    async function check(){
      const ok=hidden.every(index=>Number(fills[index])===puzzle.matrix[index]);
      if(!ok)return modal("🧩",text("tryAgain",requested),text("crossHelp",requested),[{label:text("back",requested),primary:true}]);
      const durationMs=Date.now()-startedAt,score=hidden.length*250+Math.max(0,1000-Math.floor(durationMs/1000)*5);
      if(tournament)return window.EduCashProSocial?.submitTournamentResult?.(tournament,{score,stats:{filled:hidden.length}},{fills});
      await saveHistory("math-cross",level,{score,durationMs,hits:hidden.length,errors:0,bestCombo:0,stage:hidden.length});
      modal("🏆",text("solved",requested),`${text("score",requested)}: ${score}`,[{label:text("again",requested),primary:true,run:()=>renderCross(level,requested)},{label:text("back",requested),run:()=>renderCatalog(bridge.catalogContext)}]);
    }
    draw();top();
  }

  function tournamentPegVariant(level){return{basic:"english",medium:"european",advanced:"wiegleb",nerd:"triangle"}[level]||"english"}

  function launchGame(gameId,options={}){
    const requested=language(options.lang),tournament=options.tournament||null,level=tournament?.difficulty||options.level;
    bridge.currentGame=gameId;
    if(gameId==="math-space")return level?renderMath(level,requested,tournament):levelSelector(gameId,requested,next=>renderMath(next,requested));
    if(gameId==="peg-solitaire")return tournament?renderPeg(tournamentPegVariant(level),requested,tournament):renderPegMenu(requested);
    if(gameId==="sliding-puzzle")return level?renderSliding(requested,tournament,level):levelSelector(gameId,requested,next=>renderSliding(requested,null,next));
    if(gameId==="word-search")return level?renderWordSearch(level,requested,tournament):levelSelector(gameId,requested,next=>renderWordSearch(next,requested));
    if(gameId==="math-cross")return level?renderCross(level,requested,tournament):levelSelector(gameId,requested,next=>renderCross(next,requested));
    renderCatalog(bridge.catalogContext);
  }

  base.bootPublic=async function(params){
    const game=String(params?.get?.("game")||"");
    if(GAME_META[game]){launchGame(game,{lang:params.get("lang")});return true;}
    return originalBootPublic?originalBootPublic(params):false;
  };
  base.renderCatalog=renderCatalog;

  window.EduCashProGameSuite={renderCatalog,launchGame,renderHistory,paywall,text,api,active,lang:language,GAME_META};
})();
