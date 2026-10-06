(function () {
  "use strict";

  const COPY = {
    pt: {
      qrTitle: "Gerador de QR Code", qrSub: "Transforme seu link em QR Code e baixe a imagem.",
      games: "Jogos e entretenimento", gamesSub: "Jogos organizados por categoria", open: "Abrir jogo",
      gamesTitle: "Catálogo de jogos", gamesDesc: "Escolha uma categoria e abra o jogo na plataforma do responsável.",
      all: "Todos", empty: "Nenhum jogo disponível nesta categoria.", external: "Conteúdo operado por terceiros.",
      tools: "Ferramentas", toolsSub: "Controle financeiro, cálculos, documentos informativos e utilidades.", free: "ACESSO LIVRE",
      drawTitle: "Sorteadores locais", drawDesc: "Os dados ficam somente neste aparelho e não são enviados ao EduCashPro.",
      raffleTitle: "Criar rifa / sorteio", raffleSub: "Crie uma rifa por números, compartilhe o link e acompanhe as inscrições.", subscriber: "ASSINANTE",
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
      finance: "Controle Financeiro Mensal", financeSub: "Registre renda e gastos e acompanhe o saldo do mês.",
      limited: "ACESSO LIMITADO", unlimited: "ILIMITADO",
      financeGroup: "Controle e organização", financeGroupSub: "Registre, acompanhe e organize suas finanças.",
      businessGroup: "Negócios e cálculos", businessGroupSub: "Ferramentas para precificação, metas e análise.",
      utilityGroup: "Utilidades", utilityGroupSub: "Recursos práticos do EduCashPro.",
      receivables: "Contas a Receber", receivablesSub: "Acompanhe clientes, valores e vencimentos.",
      quote: "Orçamento Informativo", quoteSub: "Crie uma proposta de valores sem emitir fatura.",
      salePrice: "Preço de Venda", salePriceSub: "Calcule preço, lucro e margem a partir dos custos.",
      breakEven: "Ponto de Equilíbrio", breakEvenSub: "Descubra quanto precisa vender para cobrir custos.",
      revenueGoal: "Meta de Faturamento", revenueGoalSub: "Transforme sua meta de lucro em meta de vendas.",
      roi: "ROI", roiSub: "Calcule o retorno percentual de um investimento.",
      compound: "Juros Compostos Avançados", compoundSub: "Simule aportes, retiradas, taxa e prazo.",
    },
    en: {
      qrTitle: "QR Code Generator", qrSub: "Turn your link into a QR code and download the image.",
      games: "Games and entertainment", gamesSub: "Games organized by category", open: "Open game",
      gamesTitle: "Game catalog", gamesDesc: "Choose a category and open the game on its provider's platform.",
      all: "All", empty: "No games available in this category.", external: "Third-party content.",
      tools: "Tools", toolsSub: "Financial tracking, calculations, informative documents and utilities.", free: "FREE ACCESS",
      drawTitle: "Local randomizers", drawDesc: "Data stays on this device and is not sent to EduCashPro.",
      raffleTitle: "Create raffle / draw", raffleSub: "Create a number raffle, share its link and track entries.", subscriber: "SUBSCRIBER",
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
      finance: "Monthly Finance Control", financeSub: "Record income and expenses and track the monthly balance.",
      limited: "LIMITED ACCESS", unlimited: "UNLIMITED",
      financeGroup: "Tracking and organization", financeGroupSub: "Record, track and organize your finances.",
      businessGroup: "Business and calculations", businessGroupSub: "Tools for pricing, goals and analysis.",
      utilityGroup: "Utilities", utilityGroupSub: "Practical EduCashPro resources.",
      receivables: "Accounts Receivable", receivablesSub: "Track customers, amounts and due dates.",
      quote: "Informative Quote", quoteSub: "Create a pricing proposal without issuing an invoice.",
      salePrice: "Sale Price", salePriceSub: "Calculate price, profit and margin from costs.",
      breakEven: "Break-even Point", breakEvenSub: "Find how much you need to sell to cover costs.",
      revenueGoal: "Revenue Goal", revenueGoalSub: "Turn your profit goal into a sales target.",
      roi: "ROI", roiSub: "Calculate percentage return on an investment.",
      compound: "Advanced Compound Interest", compoundSub: "Simulate contributions, withdrawals, rate and term.",
    },
    es: {
      qrTitle: "Generador de QR", qrSub: "Convierte tu enlace en un código QR y descarga la imagen.",
      games: "Juegos y entretenimiento", gamesSub: "Juegos organizados por categoría", open: "Abrir juego",
      gamesTitle: "Catálogo de juegos", gamesDesc: "Elige una categoría y abre el juego en la plataforma del responsable.",
      all: "Todos", empty: "No hay juegos disponibles en esta categoría.", external: "Contenido operado por terceros.",
      tools: "Herramientas", toolsSub: "Control financiero, cálculos, documentos informativos y utilidades.", free: "ACCESO LIBRE",
      drawTitle: "Sorteadores locales", drawDesc: "Los datos quedan en este dispositivo y no se envían a EduCashPro.",
      raffleTitle: "Crear rifa / sorteo", raffleSub: "Crea una rifa por números, comparte el enlace y controla las inscripciones.", subscriber: "SUSCRIPTOR",
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
      finance: "Control Financiero Mensual", financeSub: "Registra ingresos y gastos y controla el saldo del mes.",
      limited: "ACCESO LIMITADO", unlimited: "ILIMITADO",
      financeGroup: "Control y organización", financeGroupSub: "Registra, controla y organiza tus finanzas.",
      businessGroup: "Negocios y cálculos", businessGroupSub: "Herramientas para precios, metas y análisis.",
      utilityGroup: "Utilidades", utilityGroupSub: "Recursos prácticos de EduCashPro.",
      receivables: "Cuentas por Cobrar", receivablesSub: "Controla clientes, valores y vencimientos.",
      quote: "Presupuesto Informativo", quoteSub: "Crea una propuesta de valores sin emitir factura.",
      salePrice: "Precio de Venta", salePriceSub: "Calcula precio, beneficio y margen desde los costos.",
      breakEven: "Punto de Equilibrio", breakEvenSub: "Descubre cuánto debes vender para cubrir costos.",
      revenueGoal: "Meta de Facturación", revenueGoalSub: "Convierte tu meta de beneficio en meta de ventas.",
      roi: "ROI", roiSub: "Calcula el retorno porcentual de una inversión.",
      compound: "Interés Compuesto Avanzado", compoundSub: "Simula aportes, retiros, tasa y plazo.",
    },
    ru: {
      qrTitle: "Генератор QR-кода", qrSub: "Создайте QR-код из ссылки и скачайте изображение.",
      games: "Игры и развлечения", gamesSub: "Игры по категориям", open: "Открыть игру",
      gamesTitle: "Каталог игр", gamesDesc: "Выберите категорию и откройте игру на платформе владельца.",
      all: "Все", empty: "В этой категории пока нет игр.", external: "Контент стороннего поставщика.",
      tools: "Инструменты", toolsSub: "Финансовый учёт, расчёты, информационные документы и утилиты.", free: "СВОБОДНЫЙ ДОСТУП",
      drawTitle: "Локальная жеребьёвка", drawDesc: "Данные остаются на устройстве и не отправляются в EduCashPro.",
      raffleTitle: "Создать розыгрыш", raffleSub: "Создайте розыгрыш по номерам, поделитесь ссылкой и следите за заявками.", subscriber: "ПОДПИСКА",
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
      finance: "Ежемесячный финансовый контроль", financeSub: "Записывайте доходы и расходы и следите за остатком.",
      limited: "ОГРАНИЧЕННЫЙ ДОСТУП", unlimited: "БЕЗ ОГРАНИЧЕНИЙ",
      financeGroup: "Учёт и организация", financeGroupSub: "Записывайте и контролируйте свои финансы.",
      businessGroup: "Бизнес и расчёты", businessGroupSub: "Инструменты для цены, целей и анализа.",
      utilityGroup: "Утилиты", utilityGroupSub: "Практические ресурсы EduCashPro.",
      receivables: "Дебиторская задолженность", receivablesSub: "Контролируйте клиентов, суммы и сроки.",
      quote: "Информационная смета", quoteSub: "Создайте предложение стоимости без выставления счёта.",
      salePrice: "Цена продажи", salePriceSub: "Рассчитайте цену, прибыль и маржу.",
      breakEven: "Точка безубыточности", breakEvenSub: "Узнайте объём продаж для покрытия расходов.",
      revenueGoal: "Цель по выручке", revenueGoalSub: "Преобразуйте цель прибыли в цель продаж.",
      roi: "ROI", roiSub: "Рассчитайте доходность инвестиции.",
      compound: "Сложные проценты", compoundSub: "Смоделируйте пополнения, снятия, ставку и срок.",
    },
  };

  let session = null;
  let games = [];
  const originalFetch = window.fetch.bind(window);

  function currentSession() {
    return session || window.__EDUCASHPRO_SESSION__ || window.EduCashProWebEntry?.getSession?.() || {};
  }
  function language() {
    const lang = String(currentSession()?.profile?.language || "pt").slice(0,2).toLowerCase();
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
        if (data?.ok) { session = data; window.EduCashProMentalGames?.setSession?.(data); queueMicrotask(enhanceHome); }
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
    window.EduCashProApp?.rememberRoute?.("tools", "games");
    const ticket=window.EduCashProNavigation?.stamp?.();
    await window.EduCashProResources?.loadGames?.();
    if(window.EduCashProNavigation && !window.EduCashProNavigation.isCurrent(ticket))return;
    if (window.EduCashProMentalGames?.renderCatalog) {
      return window.EduCashProMentalGames.renderCatalog({ back: renderToolsHub, lang: language() });
    }
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
    window.EduCashProApp?.rememberRoute?.("tools","randomizers");
    content().innerHTML = `<button id="drawBack" class="textButton">←</button><section class="hero"><span class="eyebrow">${esc(tr("free"))}</span><h1>🎲 ${esc(tr("drawTitle"))}</h1><p>${esc(tr("drawDesc"))}</p></section><button id="openRaffleCreator" class="quickCard"><span class="emoji">🎟️</span><strong>${esc(tr("raffleTitle"))}</strong><small>${esc(tr("raffleSub"))}</small><span class="freeAccessBadge">${esc(tr("subscriber"))}</span></button><div id="drawHelpOverlay" class="drawHelpOverlay" role="dialog" aria-modal="true" aria-labelledby="drawHelpTitle"><section class="drawHelpCard"><button id="closeDrawHelp" class="drawHelpClose" type="button" aria-label="${esc(tr("closeHelp"))}">✕</button><span class="drawHelpIcon">🎲</span><h2 id="drawHelpTitle">${esc(tr("helpTitle"))}</h2><article><strong>👥 ${esc(tr("names"))}</strong><p>${esc(tr("helpNames"))}</p></article><article><strong>🔢 ${esc(tr("numbers"))}</strong><p>${esc(tr("helpNumbers"))}</p></article><article><strong>🤝 ${esc(tr("teams"))}</strong><p>${esc(tr("helpTeams"))}</p></article><button id="drawPresentationCta" class="drawPresentationCta" type="button">${esc(tr("presentationCta"))}</button></section></div><article class="toolCard"><div class="drawTabs"><button class="filter active" data-draw-tab="names">${esc(tr("names"))}</button><button class="filter" data-draw-tab="numbers">${esc(tr("numbers"))}</button><button class="filter" data-draw-tab="teams">${esc(tr("teams"))}</button></div><div id="drawFields"></div><button id="runDraw" class="wideButton">${esc(tr("draw"))}</button><button id="clearDraw" class="secondaryButton drawClear">${esc(tr("clear"))}</button><div id="localDrawResult" class="resultBox hidden"></div></article>`;
    document.getElementById("drawBack").onclick = home;
    document.getElementById("closeDrawHelp").onclick = () => document.getElementById("drawHelpOverlay")?.remove();
    document.getElementById("drawPresentationCta").onclick = () => window.EduCashProApp?.renderPresentation?.();
    document.getElementById("openRaffleCreator").onclick = async () => {
      try {
        await window.EduCashProResources?.loadGames?.();
        window.EduCashProSocial?.openRaffle?.({ lang: language(), back: renderRandomizers });
      } catch (error) {
        console.error("[EduCashPro] Falha ao abrir sorteio:", error);
      }
    };
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

  async function platformApi(path, payload = {}) {
    const activeSession = currentSession();
    const token = String(activeSession?.token || window.EduCashProPlatform?.readWebSession?.()?.token || "");
    const response = await originalFetch(path, {
      method: "POST",
      headers: { "Content-Type": "application/json", ...(token ? { Authorization: `Bearer ${token}` } : {}) },
      body: JSON.stringify(payload),
      cache: "no-store"
    });
    const data = await response.json().catch(() => ({}));
    if (!response.ok || data?.ok === false) throw new Error(data?.reason || (response.status === 401 ? "session_expired" : "request_failed"));
    return data;
  }

  function subscriptionCard() {
    return window.EduCashProApp?.openSubscription?.();
  }

  async function openFinanceControl(route="monthly-finance") {
    window.EduCashProApp?.rememberRoute?.("tools",route);
    const ticket=window.EduCashProNavigation?.stamp?.();
    const parts=route.split(":");
    await window.EduCashProResources?.loadFinance?.();
    if(window.EduCashProNavigation && !window.EduCashProNavigation.isCurrent(ticket))return;
    const activeSession = currentSession();
    return window.EduCashProFinance?.render?.({
      language: language(),
      session: activeSession,
      active: activeSession?.profile?.active === true,
      back: renderToolsHub,
      subscribe: subscriptionCard,
      api: platformApi,
      screen: parts[1] || "intro",
      month: parts[2],
      sharedWorkspace: parts[1] === "shared" ? parts[2] : "",
      sharedMonth: parts[3]
    });
  }

  async function openFinancialTool(id) {
    window.EduCashProApp?.rememberRoute?.("tools",id);
    const ticket=window.EduCashProNavigation?.stamp?.();
    await window.EduCashProResources?.loadFinancialTools?.();
    const activeSession = currentSession();
    if(window.EduCashProNavigation && !window.EduCashProNavigation.isCurrent(ticket))return;
    window.EduCashProFinancialTools?.open?.(id, {
      language: language(),
      session: activeSession,
      active: activeSession?.profile?.active === true,
      back: renderToolsHub,
      subscribe: subscriptionCard
    });
  }

  async function openQrGenerator() {
    window.EduCashProApp?.rememberRoute?.("tools","qr-code");
    const ticket=window.EduCashProNavigation?.stamp?.();
    try {
      await Promise.all([
        window.EduCashProResources.style("./qr-generator.css"),
        window.EduCashProResources.script("./vendor/qrcode.min.js")
      ]);
      await window.EduCashProResources.script("./qr-generator.js");
      if(window.EduCashProNavigation && !window.EduCashProNavigation.isCurrent(ticket))return;
      window.EduCashProQrGenerator.render({language:language(),back:renderToolsHub});
    } catch(error) {
      if(window.EduCashProNavigation && !window.EduCashProNavigation.isCurrent(ticket))return;
      renderToolsHub();
      console.warn("[EduCashPro] QR:",error?.message||error);
    }
  }

  function toolCard(id, icon, title, description, access, accessClass = "free") {
    return `<button class="toolsMenuCard" data-tool-id="${esc(id)}"><span class="toolsMenuIcon">${icon}</span><strong>${esc(title)}</strong><small>${esc(description)}</small><span class="toolsAccess"><span class="${esc(accessClass)}">${esc(access)}</span></span></button>`;
  }

  function toolsSection(title, description, cards) {
    return `<section class="toolsCategory"><header class="toolsCategoryHead"><div><h2>${esc(title)}</h2><p>${esc(description)}</p></div></header><div class="toolsMenuGrid">${cards.join("")}</div></section>`;
  }

  function renderToolsHub() {
    window.EduCashProApp?.rememberRoute?.("tools");
    window.EduCashProResources?.style?.("./tools-hub-v2.css").catch?.(()=>{});
    const active = currentSession()?.profile?.active === true;
    const access = active ? tr("unlimited") : tr("limited");
    const accessClass = active ? "unlimited" : "limited";
    const financeCards = [
      toolCard("monthly-finance","💰",tr("finance"),tr("financeSub"),tr("free"),"free"),
      toolCard("receivables","📥",tr("receivables"),tr("receivablesSub"),access,accessClass),
      toolCard("quote","📄",tr("quote"),tr("quoteSub"),access,accessClass)
    ];
    const businessCards = [
      toolCard("affiliate","🌐",tr("affiliateCalc"),tr("affiliateCalcSub"),tr("free"),"free")
    ];
    const utilityCards = [
      toolCard("link-page","🔗",window.EduCashProLinks?.text?.("pageTitle") || "Minha página de links",window.EduCashProLinks?.text?.("pageCardSub") || "Reúna seus links em uma página",tr("free"),"free"),
      toolCard("smart-link","✂️",window.EduCashProLinks?.text?.("shortTitle") || "Link Inteligente",window.EduCashProLinks?.text?.("shortCardSub") || "Crie links curtos com sua chamada",tr("free"),"free"),
      toolCard("qr-code","▦",tr("qrTitle"),tr("qrSub"),tr("free"),"free"),
      toolCard("randomizers","🎲",tr("drawTitle"),tr("drawDesc"),tr("free"),"free"),
      toolCard("games","🎮",tr("games"),tr("gamesSub"),tr("free"),"free")
    ];
    content().innerHTML = `<main class="toolsHubPage"><button id="toolsHubBack" class="textButton">←</button><section class="toolsHubHero"><span class="eyebrow">EDUCASHPRO</span><h1>🧰 ${esc(tr("tools"))}</h1><p>${esc(tr("toolsSub"))}</p></section>${toolsSection(tr("financeGroup"),tr("financeGroupSub"),financeCards)}${toolsSection(tr("businessGroup"),tr("businessGroupSub"),businessCards)}${toolsSection(tr("utilityGroup"),tr("utilityGroupSub"),utilityCards)}</main>`;
    document.getElementById("toolsHubBack").onclick = home;
    content().querySelectorAll("[data-tool-id]").forEach(button => button.onclick = () => {
      void Promise.resolve(openTool(button.dataset.toolId)).catch(error=>console.warn("[EduCashPro] tool navigation:",error?.message||error));
    });
  }

  async function openTool(id){
    if(id.startsWith("monthly-finance"))return openFinanceControl(id);
    if(["receivables","quote"].includes(id))return openFinancialTool(id);
    if(id==="qr-code")return openQrGenerator();
    if(id==="affiliate")return openAffiliateCalculator();
    if(id==="randomizers")return renderRandomizers();
    if(id==="games")return renderGames();
    if(["link-page","smart-link"].includes(id)){
      window.EduCashProApp?.rememberRoute?.("tools",id);
      const ticket=window.EduCashProNavigation?.stamp?.();
      await window.EduCashProResources?.loadLinks?.();
      if(window.EduCashProNavigation && !window.EduCashProNavigation.isCurrent(ticket))return;
      const action=id==="link-page"?window.EduCashProLinks?.renderPageEditor:window.EduCashProLinks?.renderShortener;
      return action?.({back:renderToolsHub});
    }
    return renderToolsHub();
  }

  function enhanceHome() {
    const intro = document.getElementById("openPresentation");
    const grid = intro?.parentElement?.querySelector(".quickGrid");
    if (!grid) return;
    grid.querySelectorAll('[data-target="tools"], [data-visitor-tools="1"]').forEach((button) => {
      button.classList.remove("lockedExperience");
      button.dataset.localToolsReady = "1";
      button.onclick = () => window.EduCashProApp?.renderTools?.();
    });
  }

  const observer = new MutationObserver(() => queueMicrotask(enhanceHome));
  observer.observe(document.documentElement, { childList: true, subtree: true });
  document.addEventListener("DOMContentLoaded", enhanceHome);

  window.EduCashProLocal = { renderGames, renderRandomizers, renderToolsHub, openTool };
})();

