(function (root, factory) {
  const api = factory();
  if (typeof module === "object" && module.exports) module.exports = api;
  if (root) root.EduCashProMentalGames = api;
})(typeof window !== "undefined" ? window : globalThis, function () {
  "use strict";

  const CORE = {
    slidingNeighbors(blank, size) {
      const row = Math.floor(blank / size), col = blank % size, result = [];
      if (row > 0) result.push(blank - size);
      if (row < size - 1) result.push(blank + size);
      if (col > 0) result.push(blank - 1);
      if (col < size - 1) result.push(blank + 1);
      return result;
    },
    isSlidingSolved(board) {
      return board.every((value, index) => value === (index === board.length - 1 ? 0 : index + 1));
    },
    makeSliding(size, steps, random = Math.random) {
      const board = Array.from({ length: size * size }, (_, index) => index === size * size - 1 ? 0 : index + 1);
      let blank = board.length - 1, previous = -1;
      for (let move = 0; move < steps; move += 1) {
        let options = CORE.slidingNeighbors(blank, size).filter((index) => index !== previous);
        if (!options.length) options = CORE.slidingNeighbors(blank, size);
        const next = options[Math.floor(random() * options.length) % options.length];
        board[blank] = board[next]; board[next] = 0; previous = blank; blank = next;
      }
      if (CORE.isSlidingSolved(board)) {
        const next = CORE.slidingNeighbors(blank, size)[0];
        board[blank] = board[next]; board[next] = 0;
      }
      return board;
    },
    canSlide(board, size, tileIndex) {
      return CORE.slidingNeighbors(board.indexOf(0), size).includes(tileIndex);
    },
    pegValid(row, col) {
      return row >= 0 && row < 7 && col >= 0 && col < 7 && ((row >= 2 && row <= 4) || (col >= 2 && col <= 4));
    },
    makePegBoard() {
      return Array.from({ length: 49 }, (_, index) => CORE.pegValid(Math.floor(index / 7), index % 7) ? (index === 24 ? 0 : 1) : -1);
    },
    pegMoves(board, from) {
      if (board[from] !== 1) return [];
      const row = Math.floor(from / 7), col = from % 7;
      return [[-1, 0], [1, 0], [0, -1], [0, 1]].flatMap(([dr, dc]) => {
        const middleRow = row + dr, middleCol = col + dc, toRow = row + dr * 2, toCol = col + dc * 2;
        if (!CORE.pegValid(toRow, toCol)) return [];
        const middle = middleRow * 7 + middleCol, to = toRow * 7 + toCol;
        return board[middle] === 1 && board[to] === 0 ? [{ from, middle, to }] : [];
      });
    },
    allPegMoves(board) {
      return board.flatMap((value, index) => value === 1 ? CORE.pegMoves(board, index) : []);
    },
  };

  if (typeof document === "undefined") return CORE;

  const COPY = {
    pt: {
      catalog: "Jogos de raciocínio", catalogSub: "Desafios livres que funcionam no seu aparelho.", free: "ACESSO LIVRE", play: "Jogar agora", back: "Voltar", numeric: "Quebra-cabeça Numérico", numericDesc: "Coloque todas as peças em ordem movendo apenas as que estão ao lado do espaço vazio.", peg: "Resta-um", pegDesc: "Salte uma peça sobre outra até deixar o menor número possível no tabuleiro.", local: "Partidas e recordes ficam somente neste aparelho.", how: "Como jogar", numericRule: "Toque em uma peça vizinha ao espaço vazio. São permitidos movimentos para cima, baixo, esquerda e direita — nunca na diagonal. Toda partida é criada a partir da posição resolvida, por isso sempre tem solução.", pegRule: "Escolha uma peça e salte exatamente uma peça vizinha, na horizontal ou vertical, caindo em um espaço vazio. A peça saltada sai do tabuleiro. Movimentos diagonais não são permitidos.", size: "Tamanho", newGame: "Nova partida", restart: "Reiniciar", undo: "Desfazer", hint: "Mostrar jogadas", time: "Tempo", moves: "Movimentos", record: "Recorde", possible: "Jogadas possíveis destacadas", solved: "Você colocou tudo em ordem!", remaining: "Peças restantes", pegWin: "Excelente: restou apenas uma peça!", pegEnd: "Não há mais movimentos.", again: "Jogar novamente", subscribe: "Conheça o EduCashPro", edu: "Treine atenção, planejamento e raciocínio lógico.", noRecord: "—", best: "Melhor", share: "Compartilhar", shared: "Link copiado", centerWin: "Final perfeito: a última peça ficou no centro!"
    },
    en: {
      catalog: "Logic games", catalogSub: "Free challenges that run on your device.", free: "FREE ACCESS", play: "Play now", back: "Back", numeric: "Number Puzzle", numericDesc: "Put every tile in order by moving only tiles beside the empty space.", peg: "Peg Solitaire", pegDesc: "Jump one peg over another until as few as possible remain.", local: "Games and records stay on this device.", how: "How to play", numericRule: "Tap a tile next to the empty space. Moves can go up, down, left or right — never diagonally. Every game starts from the solved position, so it is always solvable.", pegRule: "Choose a peg and jump exactly one adjacent peg horizontally or vertically into an empty hole. The jumped peg is removed. Diagonal moves are not allowed.", size: "Size", newGame: "New game", restart: "Restart", undo: "Undo", hint: "Show moves", time: "Time", moves: "Moves", record: "Record", possible: "Possible moves highlighted", solved: "You put everything in order!", remaining: "Pegs left", pegWin: "Excellent: only one peg remains!", pegEnd: "No moves remain.", again: "Play again", subscribe: "Discover EduCashPro", edu: "Train attention, planning and logical thinking.", noRecord: "—", best: "Best", share: "Share", shared: "Link copied", centerWin: "Perfect finish: the final peg is in the center!"
    },
    es: {
      catalog: "Juegos de lógica", catalogSub: "Desafíos libres que funcionan en tu dispositivo.", free: "ACCESO LIBRE", play: "Jugar ahora", back: "Volver", numeric: "Rompecabezas Numérico", numericDesc: "Ordena todas las fichas moviendo solo las que están junto al espacio vacío.", peg: "Solitario de clavijas", pegDesc: "Salta una pieza sobre otra hasta dejar la menor cantidad posible.", local: "Las partidas y récords quedan solo en este dispositivo.", how: "Cómo jugar", numericRule: "Toca una ficha vecina al espacio vacío. Se permiten movimientos arriba, abajo, izquierda y derecha, nunca en diagonal. Cada partida nace de la posición resuelta, por eso siempre tiene solución.", pegRule: "Elige una pieza y salta exactamente una pieza vecina, horizontal o verticalmente, hasta un espacio vacío. La pieza saltada sale. No hay movimientos diagonales.", size: "Tamaño", newGame: "Nueva partida", restart: "Reiniciar", undo: "Deshacer", hint: "Mostrar jugadas", time: "Tiempo", moves: "Movimientos", record: "Récord", possible: "Jugadas posibles destacadas", solved: "¡Ordenaste todas las fichas!", remaining: "Piezas restantes", pegWin: "¡Excelente: queda una sola pieza!", pegEnd: "No quedan movimientos.", again: "Jugar de nuevo", subscribe: "Conoce EduCashPro", edu: "Entrena atención, planificación y pensamiento lógico.", noRecord: "—", best: "Mejor", share: "Compartir", shared: "Enlace copiado", centerWin: "¡Final perfecto: la última pieza quedó en el centro!"
    },
    ru: {
      catalog: "Логические игры", catalogSub: "Бесплатные задания прямо на вашем устройстве.", free: "СВОБОДНЫЙ ДОСТУП", play: "Играть", back: "Назад", numeric: "Числовая головоломка", numericDesc: "Расставьте плитки по порядку, двигая только соседние с пустой клеткой.", peg: "Пег-солитер", pegDesc: "Перепрыгивайте через фишки, пока их не останется как можно меньше.", local: "Игры и рекорды хранятся только на этом устройстве.", how: "Как играть", numericRule: "Нажмите плитку рядом с пустой клеткой. Двигаться можно вверх, вниз, влево и вправо, но не по диагонали. Каждая позиция получена из решённой, поэтому она всегда разрешима.", pegRule: "Выберите фишку и перепрыгните ровно через одну соседнюю фишку по горизонтали или вертикали в пустую лунку. Перепрыгнутая фишка удаляется. Диагонали запрещены.", size: "Размер", newGame: "Новая игра", restart: "Сначала", undo: "Отменить", hint: "Показать ходы", time: "Время", moves: "Ходы", record: "Рекорд", possible: "Возможные ходы выделены", solved: "Все плитки по порядку!", remaining: "Осталось фишек", pegWin: "Отлично: осталась одна фишка!", pegEnd: "Ходов больше нет.", again: "Ещё раз", subscribe: "Узнать об EduCashPro", edu: "Развивайте внимание, планирование и логику.", noRecord: "—", best: "Лучший", share: "Поделиться", shared: "Ссылка скопирована", centerWin: "Идеально: последняя фишка осталась в центре!"
    }
  };

  let session = null, context = { public: false, back: null }, timer = null;
  const $ = (selector) => document.querySelector(selector);
  const esc = (value) => String(value ?? "").replace(/[&<>"']/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[char]);
  function language(requested) {
    const value = String(requested || session?.profile?.language || navigator.language || "pt").slice(0, 2).toLowerCase();
    return COPY[value] ? value : "pt";
  }
  function text(key, lang) { return COPY[language(lang)][key] || COPY.pt[key] || key; }
  function content() { return $("#content"); }
  function stopTimer() { if (timer) clearInterval(timer); timer = null; }
  function seconds(value) { const minutes = Math.floor(value / 60); return `${String(minutes).padStart(2, "0")}:${String(value % 60).padStart(2, "0")}`; }
  function getStore(key, fallback) { try { return JSON.parse(localStorage.getItem(key)) ?? fallback; } catch { return fallback; } }
  function setStore(key, value) { try { localStorage.setItem(key, JSON.stringify(value)); } catch {} }
  function openUrl(url) {
    if (!url) return;
    const tg = window.Telegram?.WebApp;
    if (/^https:\/\/t\.me\//i.test(url) && tg?.openTelegramLink) tg.openTelegramLink(url);
    else if (tg?.openLink) tg.openLink(url); else window.open(url, "_blank", "noopener");
  }
  function gameUrl(game, lang) {
    const url = new URL(location.href); url.search = ""; url.searchParams.set("game", game); url.searchParams.set("lang", language(lang)); return url.toString();
  }
  async function share(game, lang, button) {
    const url = gameUrl(game, lang);
    try { await navigator.clipboard.writeText(url); button.textContent = `✓ ${text("shared", lang)}`; }
    catch { openUrl(`https://t.me/share/url?url=${encodeURIComponent(url)}`); }
  }
  function footer(lang) {
    return `<aside class="gameBrand"><span class="gameBrandMark">E</span><span><strong>EduCashPro</strong><small>${esc(text("edu", lang))}</small></span><button type="button" data-game-cta>${esc(text("subscribe", lang))}</button></aside>`;
  }
  function bindFooter() {
    $("[data-game-cta]")?.addEventListener("click", () => {
      window.EduCashProApp?.renderPresentation?.(() => renderCatalog(context));
    });
  }
  function goBack() {
    stopTimer();
    if (typeof context.back === "function") return context.back();
    return renderCatalog(context);
  }
  function shell(title, subtitle, inner, lang, game) {
    document.documentElement.lang = language(lang) === "pt" ? "pt-BR" : language(lang);
    content().innerHTML = `<main class="mentalGame"><button class="gameBack" type="button">← ${esc(text("back", lang))}</button><header class="gameHeader"><span class="eyebrow">${esc(text("free", lang))}</span><h1>${esc(title)}</h1>${subtitle ? `<p>${esc(subtitle)}</p>` : ""}</header>${inner}${footer(lang)}</main>`;
    $(".gameBack").onclick = game ? () => renderCatalog(context) : goBack;
    bindFooter(); window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function renderCatalog(options = {}) {
    stopTimer(); context = { ...context, ...options };
    const lang = language(options.lang);
    shell(text("catalog", lang), text("catalogSub", lang), `<section class="mentalGameGrid"><button class="mentalGameCard" data-open-game="sliding"><span class="gameArt slidingArt" aria-hidden="true"><i>1</i><i>2</i><i>3</i><i>4</i><i>5</i><i>6</i><i>7</i><i>8</i><i></i></span><span><strong>${esc(text("numeric", lang))}</strong><small>${esc(text("numericDesc", lang))}</small><b>${esc(text("play", lang))} →</b></span></button><button class="mentalGameCard" data-open-game="peg"><span class="gameArt pegArt" aria-hidden="true">●<br>● ● ●<br>● ○ ●<br>● ● ●</span><span><strong>${esc(text("peg", lang))}</strong><small>${esc(text("pegDesc", lang))}</small><b>${esc(text("play", lang))} →</b></span></button></section><p class="gameLocalNote">🔒 ${esc(text("local", lang))}</p>`, lang);
    document.querySelectorAll("[data-open-game]").forEach((button) => button.onclick = () => button.dataset.openGame === "sliding" ? renderSliding(lang) : renderPeg(lang));
  }

  function renderSliding(lang) {
    stopTimer();
    const savedSize = Math.min(9, Math.max(3, Number(getStore("educashpro:sliding-size", 3)) || 3));
    const state = { size: savedSize, board: [], initial: [], history: [], moves: 0, elapsed: 0, started: false, finished: false, hints: false };
    shell(text("numeric", lang), text("numericDesc", lang), `<section class="gameControls"><label>${esc(text("size", lang))}<select id="slideSize">${Array.from({ length: 7 }, (_, i) => i + 3).map((size) => `<option value="${size}" ${size === savedSize ? "selected" : ""}>${size} × ${size}</option>`).join("")}</select></label><button id="slideNew" class="gamePrimary" type="button">↻ ${esc(text("newGame", lang))}</button></section><section class="gameStats"><div><small>${esc(text("time", lang))}</small><strong id="slideTime">00:00</strong></div><div><small>${esc(text("moves", lang))}</small><strong id="slideMoves">0</strong></div><div><small>${esc(text("record", lang))}</small><strong id="slideRecord">${esc(text("noRecord", lang))}</strong></div></section><div id="slidingBoard" class="slidingBoard" role="grid" tabindex="0" aria-label="${esc(text("numeric", lang))}"></div><p id="slideMessage" class="gameMessage" aria-live="polite"></p><section class="gameActions"><button id="slideUndo" type="button">↶ ${esc(text("undo", lang))}</button><button id="slideHint" type="button">◎ ${esc(text("hint", lang))}</button><button id="slideShare" type="button">↗ ${esc(text("share", lang))}</button></section><details class="gameRules"><summary>${esc(text("how", lang))}</summary><p>${esc(text("numericRule", lang))}</p></details>`, lang, "sliding");
    const boardNode = $("#slidingBoard"), message = $("#slideMessage");
    function updateRecord() {
      const record = getStore(`educashpro:sliding-record:${state.size}`, null);
      $("#slideRecord").textContent = record ? `${seconds(record.time)} · ${record.moves}` : text("noRecord", lang);
    }
    function draw() {
      boardNode.style.setProperty("--game-size", state.size);
      const movable = new Set(CORE.slidingNeighbors(state.board.indexOf(0), state.size));
      const tileSize = Math.max(9, Math.min(38, Math.floor(126 / state.size)));
      boardNode.innerHTML = state.board.map((value, index) => value ? `<button type="button" role="gridcell" data-tile="${index}" class="slideTile ${state.hints && movable.has(index) ? "possible" : ""}" style="font-size:${tileSize}px" aria-label="${value}">${value}</button>` : `<span class="slideBlank" role="gridcell" aria-label="empty"></span>`).join("");
      boardNode.querySelectorAll("[data-tile]").forEach((button) => button.onclick = () => move(Number(button.dataset.tile)));
      $("#slideMoves").textContent = state.moves; $("#slideTime").textContent = seconds(state.elapsed); updateRecord();
    }
    function beginTimer() {
      if (state.started) return; state.started = true;
      timer = setInterval(() => { if (!state.finished) { state.elapsed += 1; $("#slideTime").textContent = seconds(state.elapsed); } }, 1000);
    }
    function move(index) {
      if (state.finished || !CORE.canSlide(state.board, state.size, index)) return;
      beginTimer(); state.history.push([...state.board]);
      const blank = state.board.indexOf(0); state.board[blank] = state.board[index]; state.board[index] = 0; state.moves += 1; state.hints = false; message.textContent = ""; draw();
      if (CORE.isSlidingSolved(state.board)) finish();
    }
    function finish() {
      state.finished = true; stopTimer();
      const key = `educashpro:sliding-record:${state.size}`, old = getStore(key, null);
      if (!old || state.elapsed < old.time || (state.elapsed === old.time && state.moves < old.moves)) setStore(key, { time: state.elapsed, moves: state.moves });
      message.innerHTML = `<strong>🏆 ${esc(text("solved", lang))}</strong><button id="slideAgain" class="gamePrimary" type="button">${esc(text("again", lang))}</button>`;
      $("#slideAgain").onclick = newGame; updateRecord();
    }
    function newGame() {
      stopTimer(); state.size = Number($("#slideSize").value); setStore("educashpro:sliding-size", state.size);
      state.board = CORE.makeSliding(state.size, Math.max(40, state.size * state.size * 5)); state.initial = [...state.board]; state.history = []; state.moves = 0; state.elapsed = 0; state.started = false; state.finished = false; state.hints = false; message.textContent = ""; draw();
    }
    $("#slideSize").onchange = newGame; $("#slideNew").onclick = newGame;
    $("#slideUndo").onclick = () => { if (!state.history.length || state.finished) return; state.board = state.history.pop(); state.moves = Math.max(0, state.moves - 1); state.hints = false; draw(); };
    $("#slideHint").onclick = () => { state.hints = !state.hints; message.textContent = state.hints ? text("possible", lang) : ""; draw(); };
    $("#slideShare").onclick = (event) => share("sliding", lang, event.currentTarget);
    boardNode.onkeydown = (event) => {
      const blank = state.board.indexOf(0), row = Math.floor(blank / state.size), col = blank % state.size;
      const map = { ArrowUp: row < state.size - 1 ? blank + state.size : -1, ArrowDown: row > 0 ? blank - state.size : -1, ArrowLeft: col < state.size - 1 ? blank + 1 : -1, ArrowRight: col > 0 ? blank - 1 : -1 };
      if (map[event.key] >= 0) { event.preventDefault(); move(map[event.key]); }
    };
    newGame();
  }

  function renderPeg(lang) {
    stopTimer();
    const state = { board: CORE.makePegBoard(), initial: [], history: [], selected: -1, elapsed: 0, moves: 0, started: false, finished: false, hints: true };
    state.initial = [...state.board];
    shell(text("peg", lang), text("pegDesc", lang), `<section class="gameStats"><div><small>${esc(text("time", lang))}</small><strong id="pegTime">00:00</strong></div><div><small>${esc(text("moves", lang))}</small><strong id="pegMoves">0</strong></div><div><small>${esc(text("remaining", lang))}</small><strong id="pegRemaining">32</strong></div></section><div id="pegBoard" class="pegBoard" role="grid" aria-label="${esc(text("peg", lang))}"></div><p id="pegMessage" class="gameMessage" aria-live="polite"></p><section class="gameActions"><button id="pegUndo" type="button">↶ ${esc(text("undo", lang))}</button><button id="pegRestart" type="button">↻ ${esc(text("restart", lang))}</button><button id="pegHint" type="button">◎ ${esc(text("hint", lang))}</button><button id="pegShare" type="button">↗ ${esc(text("share", lang))}</button></section><details class="gameRules"><summary>${esc(text("how", lang))}</summary><p>${esc(text("pegRule", lang))}</p></details><div id="pegBest" class="gameBest"></div>`, lang, "peg");
    const boardNode = $("#pegBoard"), message = $("#pegMessage");
    function beginTimer() { if (state.started) return; state.started = true; timer = setInterval(() => { if (!state.finished) { state.elapsed += 1; $("#pegTime").textContent = seconds(state.elapsed); } }, 1000); }
    function destinations() { return state.selected >= 0 ? new Set(CORE.pegMoves(state.board, state.selected).map((move) => move.to)) : new Set(); }
    function draw() {
      const targets = destinations(), allFrom = new Set(state.hints ? CORE.allPegMoves(state.board).map((move) => move.from) : []);
      boardNode.innerHTML = state.board.map((value, index) => value < 0 ? `<span class="pegOutside"></span>` : `<button type="button" role="gridcell" data-peg="${index}" class="pegHole ${value ? "filled" : "empty"} ${index === state.selected ? "selected" : ""} ${targets.has(index) ? "destination" : ""} ${allFrom.has(index) ? "possible" : ""}" aria-label="${value ? "peg" : "empty"}">${value ? `<i></i>` : ""}</button>`).join("");
      boardNode.querySelectorAll("[data-peg]").forEach((button) => button.onclick = () => choose(Number(button.dataset.peg)));
      const remaining = state.board.filter((value) => value === 1).length;
      $("#pegMoves").textContent = state.moves; $("#pegRemaining").textContent = remaining; $("#pegTime").textContent = seconds(state.elapsed);
      const best = getStore("educashpro:peg-record", null); $("#pegBest").textContent = `${text("best", lang)}: ${best ? `${best.remaining} · ${seconds(best.time)}` : text("noRecord", lang)}`;
    }
    function choose(index) {
      if (state.finished) return;
      if (state.board[index] === 1) { state.selected = state.selected === index ? -1 : index; draw(); return; }
      const move = CORE.pegMoves(state.board, state.selected).find((item) => item.to === index);
      if (!move) return;
      beginTimer(); state.history.push([...state.board]); state.board[move.from] = 0; state.board[move.middle] = 0; state.board[move.to] = 1; state.selected = -1; state.moves += 1; message.textContent = ""; draw();
      if (!CORE.allPegMoves(state.board).length) finish();
    }
    function finish() {
      state.finished = true; stopTimer(); const remaining = state.board.filter((value) => value === 1).length, centered = remaining === 1 && state.board[24] === 1;
      const old = getStore("educashpro:peg-record", null);
      if (!old || remaining < old.remaining || (remaining === old.remaining && state.elapsed < old.time)) setStore("educashpro:peg-record", { remaining, time: state.elapsed });
      message.innerHTML = `<strong>${remaining === 1 ? `🏆 ${esc(centered ? text("centerWin", lang) : text("pegWin", lang))}` : esc(text("pegEnd", lang))}</strong><button id="pegAgain" class="gamePrimary" type="button">${esc(text("again", lang))}</button>`;
      $("#pegAgain").onclick = restart; draw();
    }
    function restart() { stopTimer(); state.board = [...state.initial]; state.history = []; state.selected = -1; state.elapsed = 0; state.moves = 0; state.started = false; state.finished = false; message.textContent = ""; draw(); }
    $("#pegUndo").onclick = () => { if (!state.history.length) return; if (state.finished) { state.finished = false; } state.board = state.history.pop(); state.moves = Math.max(0, state.moves - 1); state.selected = -1; message.textContent = ""; draw(); };
    $("#pegRestart").onclick = restart; $("#pegHint").onclick = () => { state.hints = !state.hints; message.textContent = state.hints ? text("possible", lang) : ""; draw(); };
    $("#pegShare").onclick = (event) => share("peg", lang, event.currentTarget); draw();
  }

  async function bootPublic(params) {
    const game = params.get("game"), catalog = params.get("games");
    if (!game && !catalog) return false;
    const lang = language(params.get("lang")); context = { public: true, lang, back: () => {
      if (window.EduCashProApp?.renderPublicLanding) window.EduCashProApp.renderPublicLanding();
      else renderCatalog({ public: true, lang });
    } };
    $("#bottomNav")?.classList.add("hidden");
    if (game === "sliding") renderSliding(lang); else if (game === "peg") renderPeg(lang); else renderCatalog(context);
    return true;
  }

  return Object.assign(CORE, { setSession(value) { session = value; }, renderCatalog, renderSliding, renderPeg, bootPublic, text });
});
