(function () {
  "use strict";

  const COPY = {
    pt: {
      games: "Jogos e entretenimento", gamesSub: "Jogos organizados por categoria", open: "Abrir jogo",
      gamesTitle: "Catálogo de jogos", gamesDesc: "Escolha uma categoria e abra o jogo na plataforma do responsável.",
      all: "Todos", empty: "Nenhum jogo disponível nesta categoria.", external: "Conteúdo operado por terceiros.",
      tools: "Ferramentas", toolsSub: "Simulador de afiliados e sorteadores locais", free: "ACESSO LIVRE",
      drawTitle: "Sorteadores locais", drawDesc: "Os dados ficam somente neste aparelho e não são enviados ao EduCashPro.",
      names: "Sortear nomes", numbers: "Sortear número", teams: "Formar equipes", listLabel: "Um nome por linha",
      min: "Número inicial", max: "Número final", teamCount: "Quantidade de equipes", winners: "Quantidade de vencedores",
      draw: "Sortear", clear: "Limpar", result: "Resultado", invalid: "Preencha os dados corretamente.",
      helpTitle: "Como usar os sorteadores",
      helpNames: "Sortear nomes: escreva um nome por linha, informe quantos vencedores deseja e toque em Sortear. Nomes repetidos são considerados apenas uma vez.",
      helpNumbers: "Sortear número: informe o menor e o maior número permitidos. O resultado será escolhido aleatoriamente dentro desse intervalo.",
      helpTeams: "Formar equipes: escreva um nome por linha, informe quantas equipes deseja e toque em Sortear. Os participantes serão embaralhados e distribuídos entre as equipes.",
      closeHelp: "Fechar explicação",
      presentationCta: "✨ Descubra o EduCashPro",
      affiliateCalc: "Simulador do programa de afiliados", affiliateCalcSub: "Simule os cinco níveis e os critérios de desbloqueio.",
    },
    en: {
      games: "Games and entertainment", gamesSub: "Games organized by category", open: "Open game",
      gamesTitle: "Game catalog", gamesDesc: "Choose a category and open the game on its provider's platform.",
      all: "All", empty: "No games available in this category.", external: "Third-party content.",
      tools: "Tools", toolsSub: "Affiliate simulator and local randomizers", free: "FREE ACCESS",
      drawTitle: "Local randomizers", drawDesc: "Data stays on this device and is not sent to EduCashPro.",
      names: "Draw names", numbers: "Draw number", teams: "Create teams", listLabel: "One name per line",
      min: "Starting number", max: "Ending number", teamCount: "Number of teams", winners: "Number of winners",
      draw: "Draw", clear: "Clear", result: "Result", invalid: "Enter valid data.",
      helpTitle: "How to use the randomizers",
      helpNames: "Draw names: enter one name per line, choose the number of winners and tap Draw. Duplicate names are counted only once.",
      helpNumbers: "Draw number: enter the lowest and highest allowed numbers. One result will be randomly selected within that range.",
      helpTeams: "Create teams: enter one name per line, choose the number of teams and tap Draw. Participants are shuffled and distributed among the teams.",
      closeHelp: "Close instructions",
      presentationCta: "✨ Discover EduCashPro",
      affiliateCalc: "Affiliate program simulator", affiliateCalcSub: "Simulate five levels and unlock requirements.",
    },
    es: {
      games: "Juegos y entretenimiento", gamesSub: "Juegos organizados por categoría", open: "Abrir juego",
      gamesTitle: "Catálogo de juegos", gamesDesc: "Elige una categoría y abre el juego en la plataforma del responsable.",
      all: "Todos", empty: "No hay juegos disponibles en esta categoría.", external: "Contenido operado por terceros.",
      tools: "Herramientas", toolsSub: "Simulador de afiliados y sorteadores locales", free: "ACCESO LIBRE",
      drawTitle: "Sorteadores locales", drawDesc: "Los datos quedan en este dispositivo y no se envían a EduCashPro.",
      names: "Sortear nombres", numbers: "Sortear número", teams: "Formar equipos", listLabel: "Un nombre por línea",
      min: "Número inicial", max: "Número final", teamCount: "Cantidad de equipos", winners: "Cantidad de ganadores",
      draw: "Sortear", clear: "Limpiar", result: "Resultado", invalid: "Completa los datos correctamente.",
      helpTitle: "Cómo usar los sorteadores",
      helpNames: "Sortear nombres: escribe un nombre por línea, indica cuántos ganadores deseas y toca Sortear. Los nombres repetidos se consideran una sola vez.",
      helpNumbers: "Sortear número: indica el número menor y el mayor permitidos. El resultado se elegirá aleatoriamente dentro de ese intervalo.",
      helpTeams: "Formar equipos: escribe un nombre por línea, indica cuántos equipos deseas y toca Sortear. Los participantes se mezclarán y distribuirán entre los equipos.",
      closeHelp: "Cerrar explicación",
      presentationCta: "✨ Descubre EduCashPro",
      affiliateCalc: "Simulador del programa de afiliados", affiliateCalcSub: "Simula cinco niveles y los requisitos de desbloqueo.",
    },
    ru: {
      games: "Игры и развлечения", gamesSub: "Игры по категориям", open: "Открыть игру",
      gamesTitle: "Каталог игр", gamesDesc: "Выберите категорию и откройте игру на платформе владельца.",
      all: "Все", empty: "В этой категории пока нет игр.", external: "Контент стороннего поставщика.",
      tools: "Инструменты", toolsSub: "Партнёрский симулятор и локальная жеребьёвка", free: "СВОБОДНЫЙ ДОСТУП",
      drawTitle: "Локальная жеребьёвка", drawDesc: "Данные остаются на устройстве и не отправляются в EduCashPro.",
      names: "Выбрать имена", numbers: "Случайное число", teams: "Создать команды", listLabel: "Одно имя в строке",
      min: "Начальное число", max: "Конечное число", teamCount: "Количество команд", winners: "Количество победителей",
      draw: "Выбрать", clear: "Очистить", result: "Результат", invalid: "Введите корректные данные.",
      helpTitle: "Как пользоваться жеребьёвкой",
      helpNames: "Выбор имён: введите по одному имени в строке, укажите число победителей и нажмите кнопку выбора. Повторяющиеся имена учитываются один раз.",
      helpNumbers: "Случайное число: укажите минимальное и максимальное значения. Результат будет случайно выбран в этом диапазоне.",
      helpTeams: "Создание команд: введите по одному имени в строке, укажите количество команд и нажмите кнопку выбора. Участники будут перемешаны и распределены по командам.",
      closeHelp: "Закрыть инструкцию",
      presentationCta: "✨ Откройте EduCashPro",
      affiliateCalc: "Симулятор партнёрской программы", affiliateCalcSub: "Пять уровней и условия их открытия.",
    },
  };

  let session = null;
  let games = [];
  const originalFetch = window.fetch.bind(window);

  function language() {
    const lang = String(session?.profile?.language || "pt").toLowerCase();
    return COPY[lang] ? lang : "pt";
  }
  function tr(key) { return COPY[language()][key] || COPY.pt[key] || key; }
  function esc(value) { return String(value ?? "").replace(/[&<>"']/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[char]); }
  function content() { return document.getElementById("content"); }
  function openUrl(url) {
    const tg = window.Telegram?.WebApp;
    if (/^https:\/\/t\.me\//i.test(url) && tg?.openTelegramLink) return tg.openTelegramLink(url);
    if (tg?.openLink) return tg.openLink(url);
    window.open(url, "_blank", "noopener");
  }
  function home() { document.querySelector('#bottomNav button[data-view="home"]')?.click(); }
  function learn() { document.querySelector('#bottomNav button[data-view="learn"]')?.click(); }

  window.fetch = async function (...args) {
    const response = await originalFetch(...args);
    try {
      const url = typeof args[0] === "string" ? args[0] : args[0]?.url || "";
      if (/\/api\/hub\/session$/.test(url)) {
        const data = await response.clone().json();
        if (data?.ok) { session = data; queueMicrotask(enhanceHome); }
      }
    } catch {}
    return response;
  };

  async function loadGames() {
    if (games.length) return games;
    try {
      const response = await originalFetch(`./games.json?fresh=${window.EDUCASHPRO_ASSET_VERSION || Date.now()}`, { cache: "no-store" });
      const data = await response.json();
      games = Array.isArray(data?.games) ? data.games.filter((game) => game?.name && /^https:\/\//i.test(game?.url || "")) : [];
    } catch { games = []; }
    return games;
  }

  function gameText(value) { return value?.[language()] || value?.pt || value || ""; }

  async function renderGames(category = "") {
    const target = content();
    if (!target) return;
    target.innerHTML = `<button id="gamesBack" class="textButton">←</button><section class="hero"><span class="eyebrow">DISCOVERY</span><h1>🎮 ${esc(tr("gamesTitle"))}</h1><p>${esc(tr("gamesDesc"))}</p></section><div id="gameCatalog"><div class="empty">•••</div></div>`;
    document.getElementById("gamesBack").onclick = home;
    const items = await loadGames();
    const categories = [...new Set(items.map((item) => gameText(item.category)).filter(Boolean))];
    const visible = category ? items.filter((item) => gameText(item.category) === category) : items;
    document.getElementById("gameCatalog").innerHTML = `<div class="filters"><button class="filter ${category ? "" : "active"}" data-game-category="">${esc(tr("all"))}</button>${categories.map((item) => `<button class="filter ${item === category ? "active" : ""}" data-game-category="${esc(item)}">${esc(item)}</button>`).join("")}</div><div class="gameGrid">${visible.length ? visible.map((item) => `<article class="gameCard">${item.image ? `<img src="${esc(item.image)}" alt="" loading="lazy" referrerpolicy="no-referrer">` : `<div class="gamePlaceholder">🎮</div>`}<div><span class="chip">${esc(gameText(item.category))}</span><h3>${esc(gameText(item.name))}</h3><p>${esc(gameText(item.description))}</p><small>${esc(tr("external"))}</small><button class="primaryButton" data-game-url="${esc(item.url)}">${esc(tr("open"))}</button></div></article>`).join("") : `<div class="empty">${esc(tr("empty"))}</div>`}</div>`;
    target.querySelectorAll("[data-game-category]").forEach((button) => button.onclick = () => renderGames(button.dataset.gameCategory));
    target.querySelectorAll("[data-game-url]").forEach((button) => button.onclick = () => openUrl(button.dataset.gameUrl));
  }

  function uniqueNames(value) {
    return [...new Set(String(value || "").split(/\r?\n/).map((name) => name.trim()).filter(Boolean))];
  }
  function shuffle(list) {
    const result = [...list];
    for (let index = result.length - 1; index > 0; index -= 1) {
      const swap = crypto.getRandomValues(new Uint32Array(1))[0] % (index + 1);
      [result[index], result[swap]] = [result[swap], result[index]];
    }
    return result;
  }
  function showResult(html) {
    const result = document.getElementById("localDrawResult");
    result.innerHTML = html;
    result.classList.remove("hidden");
  }

  function renderRandomizers() {
    content().innerHTML = `<button id="drawBack" class="textButton">←</button><section class="hero"><span class="eyebrow">${esc(tr("free"))}</span><h1>🎲 ${esc(tr("drawTitle"))}</h1><p>${esc(tr("drawDesc"))}</p></section><div id="drawHelpOverlay" class="drawHelpOverlay" role="dialog" aria-modal="true" aria-labelledby="drawHelpTitle"><section class="drawHelpCard"><button id="closeDrawHelp" class="drawHelpClose" type="button" aria-label="${esc(tr("closeHelp"))}">✕</button><span class="drawHelpIcon">🎲</span><h2 id="drawHelpTitle">${esc(tr("helpTitle"))}</h2><article><strong>👥 ${esc(tr("names"))}</strong><p>${esc(tr("helpNames"))}</p></article><article><strong>🔢 ${esc(tr("numbers"))}</strong><p>${esc(tr("helpNumbers"))}</p></article><article><strong>🤝 ${esc(tr("teams"))}</strong><p>${esc(tr("helpTeams"))}</p></article><button id="drawPresentationCta" class="drawPresentationCta" type="button">${esc(tr("presentationCta"))}</button></section></div><article class="toolCard"><div class="drawTabs"><button class="filter active" data-draw-tab="names">${esc(tr("names"))}</button><button class="filter" data-draw-tab="numbers">${esc(tr("numbers"))}</button><button class="filter" data-draw-tab="teams">${esc(tr("teams"))}</button></div><div id="drawFields"></div><button id="runDraw" class="wideButton">${esc(tr("draw"))}</button><button id="clearDraw" class="secondaryButton drawClear">${esc(tr("clear"))}</button><div id="localDrawResult" class="resultBox hidden"></div></article>`;
    document.getElementById("drawBack").onclick = home;
    document.getElementById("closeDrawHelp").onclick = () => document.getElementById("drawHelpOverlay")?.remove();
    document.getElementById("drawPresentationCta").onclick = () => window.EduCashProApp?.renderPresentation?.();
    let mode = "names";
    const fields = () => {
      const node = document.getElementById("drawFields");
      if (mode === "numbers") node.innerHTML = `<div class="fieldGrid"><div class="field"><label>${esc(tr("min"))}</label><input id="drawMin" inputmode="numeric" value="1"></div><div class="field"><label>${esc(tr("max"))}</label><input id="drawMax" inputmode="numeric" value="100"></div></div>`;
      else node.innerHTML = `<div class="field"><label>${esc(tr("listLabel"))}</label><textarea id="drawNames" rows="9"></textarea></div><div class="field"><label>${esc(mode === "teams" ? tr("teamCount") : tr("winners"))}</label><input id="drawCount" inputmode="numeric" value="${mode === "teams" ? 2 : 1}"></div>`;
      document.getElementById("localDrawResult").classList.add("hidden");
    };
    document.querySelectorAll("[data-draw-tab]").forEach((button) => button.onclick = () => {
      mode = button.dataset.drawTab;
      document.querySelectorAll("[data-draw-tab]").forEach((item) => item.classList.toggle("active", item === button));
      fields();
    });
    document.getElementById("runDraw").onclick = () => {
      if (mode === "numbers") {
        const min = Math.ceil(Number(document.getElementById("drawMin").value));
        const max = Math.floor(Number(document.getElementById("drawMax").value));
        if (!Number.isFinite(min) || !Number.isFinite(max) || max < min) return showResult(esc(tr("invalid")));
        const range = max - min + 1;
        const number = min + (crypto.getRandomValues(new Uint32Array(1))[0] % range);
        return showResult(`<strong class="drawNumber">${number}</strong>`);
      }
      const names = shuffle(uniqueNames(document.getElementById("drawNames").value));
      const count = Math.trunc(Number(document.getElementById("drawCount").value));
      if (!names.length || count < 1 || (mode === "names" && count > names.length) || (mode === "teams" && count > names.length)) return showResult(esc(tr("invalid")));
      if (mode === "names") return showResult(`<ol>${names.slice(0, count).map((name) => `<li>${esc(name)}</li>`).join("")}</ol>`);
      const teams = Array.from({ length: count }, () => []);
      names.forEach((name, index) => teams[index % count].push(name));
      showResult(teams.map((team, index) => `<section class="drawTeam"><strong>${esc(tr("teams"))} ${index + 1}</strong><p>${team.map(esc).join(", ")}</p></section>`).join(""));
    };
    document.getElementById("clearDraw").onclick = () => { fields(); };
    fields();
  }

  function openAffiliateCalculator() {
    if (window.EduCashProApp?.renderNetworkProjection) return window.EduCashProApp.renderNetworkProjection();
    learn();
  }

  function renderToolsHub() {
    const active = session?.profile?.active === true;
    content().innerHTML = `<button id="toolsHubBack" class="textButton">←</button><section class="hero"><span class="eyebrow">EDUCASHPRO</span><h1>🧰 ${esc(tr("tools"))}</h1><p>${esc(tr("toolsSub"))}</p></section><section class="quickGrid">${active ? `<button class="quickCard" id="affiliateTool"><span class="emoji">📊</span><strong>${esc(tr("affiliateCalc"))}</strong><small>${esc(tr("affiliateCalcSub"))}</small></button>` : ""}<button class="quickCard" id="randomizerTool"><span class="emoji">🎲</span><strong>${esc(tr("drawTitle"))}</strong><small>${esc(tr("drawDesc"))}</small><span class="freeAccessBadge">${esc(tr("free"))}</span></button></section>`;
    document.getElementById("toolsHubBack").onclick = home;
    document.getElementById("randomizerTool").onclick = renderRandomizers;
    document.getElementById("affiliateTool")?.addEventListener("click", openAffiliateCalculator);
  }

  function enhanceHome() {
    const intro = document.getElementById("openPresentation");
    const grid = intro?.parentElement?.querySelector(".quickGrid");
    if (!grid) return;
    grid.querySelectorAll('[data-target="tools"], [data-visitor-tools="1"]').forEach((button) => {
      button.classList.remove("lockedExperience");
      button.dataset.localToolsReady = "1";
      button.onclick = renderToolsHub;
    });
    if (!grid.querySelector("[data-games-card]")) {
      const button = document.createElement("button");
      button.className = "quickCard";
      button.dataset.gamesCard = "1";
      button.innerHTML = `<span class="emoji">🎮</span><strong>${esc(tr("games"))}</strong><small>${esc(tr("gamesSub"))}</small></button>`;
      button.onclick = () => renderGames();
      grid.appendChild(button);
    }
  }

  const observer = new MutationObserver(() => queueMicrotask(enhanceHome));
  observer.observe(document.documentElement, { childList: true, subtree: true });
  document.addEventListener("DOMContentLoaded", enhanceHome);

  window.EduCashProLocal = { renderGames, renderRandomizers, renderToolsHub };
})();
