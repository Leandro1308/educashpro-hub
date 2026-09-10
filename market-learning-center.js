(function () {
  "use strict";

  const TRADINGVIEW_AFFILIATE = "https://br.tradingview.com/?aff_id=170669";
  const TRADINGVIEW_PRICING = "https://br.tradingview.com/pricing/?aff_id=170669";
  const EXNESS_AFFILIATE = "https://one.exnessonelink.com/a/93bgo7jpfo/?campaign=43340";
  const VIDEO_COURSE = "https://t.me/boost?c=3706880680";
  const RESTRICTED = new Set(["chart", "technical"]);

  const COPY = {
    pt: { title: "Mercados, Análise e Formação", intro: "Dados atuais, formação gratuita e ferramentas para estudar antes de praticar.", tools: "Analisar o mercado", toolsSub: "Escolha uma ferramenta. Os dados são carregados somente quando você abrir.", chart: "Gráfico avançado", technical: "Resumo técnico", heatmap: "Mapa de calor Forex", calendar: "Calendário econômico", overview: "Visão dos mercados", loading: "Carregando dados de mercado…", error: "Não foi possível carregar esta ferramenta agora.", locked: "Recurso exclusivo para assinantes ativos", lockedText: "Ative sua assinatura para utilizar o gráfico avançado com média móvel de 20 períodos e o resumo técnico.", subscribe: "Ativar assinatura", expand: "Expandir", shrink: "Fechar tela ampliada", ma20: "Média móvel simples de 20 períodos configurada", education: "Formação gratuita", educationSub: "Cursos e conteúdos selecionados pelo EduCashPro.", ownCourse: "Curso EduCashPro de Price Action", ownCourseText: "Estrutura, tendências, ranges, rompimentos, reversões, XAUUSD e gestão de risco.", openCourse: "Abrir curso", video: "Curso em vídeo", videoText: "Aulas em vídeo com acesso livre para assinantes e não assinantes.", watch: "Assistir", binance: "Cripto, blockchain, Web3, segurança, trading e gestão de risco em vários idiomas.", study: "Estudar gratuitamente", partners: "Plataformas para analisar e praticar", partnersSub: "Os botões abaixo usam links de parceiro do EduCashPro.", tradingView: "Abrir TradingView", tradingViewText: "Use a plataforma completa para gráficos, indicadores, listas e alertas.", plans: "Conhecer planos", exness: "Praticar na Exness", exnessText: "Abra sua conta pelo link do parceiro e comece pela conta demonstrativa.", register: "Abrir Exness", back: "Voltar à Academy", source: "Dados e gráficos fornecidos pela TradingView." },
    en: { title: "Markets, Analysis and Training", intro: "Current data, free training and tools to study before practicing.", tools: "Analyze the market", toolsSub: "Choose a tool. Market data loads only when you open it.", chart: "Advanced chart", technical: "Technical summary", heatmap: "Forex heatmap", calendar: "Economic calendar", overview: "Market overview", loading: "Loading market data…", error: "This tool could not be loaded right now.", locked: "Active subscribers only", lockedText: "Activate your subscription to use the advanced chart with a 20-period moving average and the technical summary.", subscribe: "Activate subscription", expand: "Expand", shrink: "Close expanded view", ma20: "20-period simple moving average configured", education: "Free training", educationSub: "Courses and content selected by EduCashPro.", ownCourse: "EduCashPro Price Action Course", ownCourseText: "Structure, trends, ranges, breakouts, reversals, XAUUSD and risk management.", openCourse: "Open course", video: "Video course", videoText: "Free video lessons for subscribers and non-subscribers.", watch: "Watch", binance: "Crypto, blockchain, Web3, security, trading and risk management in several languages.", study: "Study for free", partners: "Platforms for analysis and practice", partnersSub: "The buttons below use EduCashPro partner links.", tradingView: "Open TradingView", tradingViewText: "Use the complete platform for charts, indicators, watchlists and alerts.", plans: "View plans", exness: "Practice with Exness", exnessText: "Open an account through the partner link and begin with a Demo account.", register: "Open Exness", back: "Back to Academy", source: "Data and charts provided by TradingView." },
    es: { title: "Mercados, Análisis y Formación", intro: "Datos actuales, formación gratuita y herramientas para estudiar antes de practicar.", tools: "Analizar el mercado", toolsSub: "Elige una herramienta. Los datos se cargan solamente cuando la abres.", chart: "Gráfico avanzado", technical: "Resumen técnico", heatmap: "Mapa de calor Forex", calendar: "Calendario económico", overview: "Visión de mercados", loading: "Cargando datos del mercado…", error: "No fue posible cargar esta herramienta.", locked: "Recurso exclusivo para suscriptores activos", lockedText: "Activa tu suscripción para utilizar el gráfico avanzado con media móvil de 20 períodos y el resumen técnico.", subscribe: "Activar suscripción", expand: "Ampliar", shrink: "Cerrar vista ampliada", ma20: "Media móvil simple de 20 períodos configurada", education: "Formación gratuita", educationSub: "Cursos y contenidos seleccionados por EduCashPro.", ownCourse: "Curso EduCashPro de Price Action", ownCourseText: "Estructura, tendencias, rangos, rompimientos, reversiones, XAUUSD y gestión de riesgo.", openCourse: "Abrir curso", video: "Curso en video", videoText: "Clases en video gratuitas para suscriptores y no suscriptores.", watch: "Ver", binance: "Cripto, blockchain, Web3, seguridad, trading y gestión de riesgo en varios idiomas.", study: "Estudiar gratis", partners: "Plataformas para analizar y practicar", partnersSub: "Los botones utilizan enlaces de socio de EduCashPro.", tradingView: "Abrir TradingView", tradingViewText: "Usa la plataforma completa para gráficos, indicadores, listas y alertas.", plans: "Conocer planes", exness: "Practicar en Exness", exnessText: "Abre una cuenta mediante el enlace de socio y comienza con una cuenta Demo.", register: "Abrir Exness", back: "Volver a Academy", source: "Datos y gráficos proporcionados por TradingView." },
    ru: { title: "Рынки, анализ и обучение", intro: "Актуальные данные, бесплатное обучение и инструменты для подготовки к практике.", tools: "Анализ рынка", toolsSub: "Выберите инструмент. Данные загрузятся только после открытия.", chart: "Расширенный график", technical: "Техническая сводка", heatmap: "Тепловая карта Forex", calendar: "Экономический календарь", overview: "Обзор рынков", loading: "Загрузка рыночных данных…", error: "Не удалось загрузить инструмент.", locked: "Только для активных подписчиков", lockedText: "Активируйте подписку, чтобы использовать расширенный график со скользящей средней за 20 периодов и техническую сводку.", subscribe: "Активировать подписку", expand: "Развернуть", shrink: "Закрыть большой экран", ma20: "Простая скользящая средняя за 20 периодов настроена", education: "Бесплатное обучение", educationSub: "Курсы и материалы, отобранные EduCashPro.", ownCourse: "Курс EduCashPro по Price Action", ownCourseText: "Структура, тренды, диапазоны, пробои, развороты, XAUUSD и управление риском.", openCourse: "Открыть курс", video: "Видеокурс", videoText: "Бесплатные видеоуроки для подписчиков и остальных пользователей.", watch: "Смотреть", binance: "Криптовалюты, блокчейн, Web3, безопасность, торговля и управление риском.", study: "Учиться бесплатно", partners: "Платформы для анализа и практики", partnersSub: "Кнопки используют партнёрские ссылки EduCashPro.", tradingView: "Открыть TradingView", tradingViewText: "Полная платформа для графиков, индикаторов, списков и уведомлений.", plans: "Посмотреть планы", exness: "Практика в Exness", exnessText: "Откройте счёт по партнёрской ссылке и начните с демо-счёта.", register: "Открыть Exness", back: "Назад в Academy", source: "Данные и графики предоставлены TradingView." }
  };

  const LOCALE = { pt: "br", en: "en", es: "es", ru: "ru" };
  COPY.pt.lockedText = "Ative sua assinatura para utilizar o gráfico avançado e o resumo técnico.";
  COPY.en.lockedText = "Activate your subscription to use the advanced chart and the technical summary.";
  COPY.es.lockedText = "Activa tu suscripción para utilizar el gráfico avanzado y el resumen técnico.";
  COPY.ru.lockedText = "Активируйте подписку, чтобы использовать расширенный график и техническую сводку.";
  COPY.pt.binanceWeb3 = "Acessar Binance Web3";
  COPY.en.binanceWeb3 = "Access Binance Web3";
  COPY.es.binanceWeb3 = "Acceder a Binance Web3";
  COPY.ru.binanceWeb3 = "Открыть Binance Web3";
  const BINANCE_AFFILIATE = "https://web3.binance.com/m/referral?ref=IYN019BM";
  const COURSES = [{ icon: "₿", name: "Binance Academy", key: "binance", url: "https://academy.binance.com/", affiliateUrl: BINANCE_AFFILIATE }];
  const WIDGETS = {
    chart: { src: "https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js", height: 720, config: { autosize: true, symbol: "OANDA:XAUUSD", interval: "60", timezone: "Etc/UTC", theme: "dark", style: "1", allow_symbol_change: true, calendar: false, studies: ["STD;Moving Average"], studies_overrides: { "moving average.length": 20, "moving average.plot.color": "#ffcc33", "moving average.plot.linewidth": 2 }, support_host: "https://www.tradingview.com" } },
    technical: { src: "https://s3.tradingview.com/external-embedding/embed-widget-technical-analysis.js", height: 560, config: { interval: "1h", width: "100%", isTransparent: true, height: "100%", symbol: "OANDA:XAUUSD", showIntervalTabs: true, displayMode: "single", colorTheme: "dark" } },
    heatmap: { src: "https://s3.tradingview.com/external-embedding/embed-widget-forex-heat-map.js", height: 620, config: { width: "100%", height: "100%", currencies: ["EUR", "USD", "JPY", "GBP", "CHF", "AUD", "CAD", "NZD", "CNY"], isTransparent: true, colorTheme: "dark" } },
    calendar: { src: "https://s3.tradingview.com/external-embedding/embed-widget-events.js", height: 560, config: { colorTheme: "dark", isTransparent: true, width: "100%", height: "100%", importanceFilter: "0,1", countryFilter: "us,br,eu,gb,jp" } },
    overview: { src: "https://s3.tradingview.com/external-embedding/embed-widget-market-overview.js", height: 620, config: { colorTheme: "dark", dateRange: "1D", showChart: true, width: "100%", height: "100%", isTransparent: true, showSymbolLogo: true, tabs: [{ title: "Markets", symbols: [{ s: "FOREXCOM:SPXUSD", d: "S&P 500" }, { s: "BMFBOVESPA:IBOV", d: "Ibovespa" }, { s: "OANDA:XAUUSD", d: "Gold" }, { s: "BITSTAMP:BTCUSD", d: "Bitcoin" }, { s: "FX_IDC:EURUSD", d: "EUR/USD" }] }] } }
  };

  let options = null;
  let currentWidget = "heatmap";
  const esc = (value) => String(value || "").replace(/[&<>'"]/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;" })[char]);

  function open(url) {
    if (options?.openUrl) return options.openUrl(url);
    try { window.Telegram?.WebApp?.openLink(url); } catch { window.open(url, "_blank", "noopener"); }
  }

  function lockedView(kind) {
    const host = document.getElementById("marketWidget");
    const copy = COPY[options.language] || COPY.pt;
    host.style.height = "auto";
    host.innerHTML = `<div class="marketLocked"><span>🔒</span><h3>${esc(copy.locked)}</h3><p>${esc(copy.lockedText)}</p><button id="marketSubscribe">${esc(copy.subscribe)}</button></div>`;
    document.getElementById("marketSubscribe").onclick = () => options.subscribe?.();
    document.getElementById("marketExpand").hidden = true;
    document.getElementById("marketStudyNote").textContent = "";
  }

  function loadWidget(kind) {
    const host = document.getElementById("marketWidget");
    if (!host) return;
    currentWidget = kind;
    const copy = COPY[options.language] || COPY.pt;
    document.querySelectorAll("[data-market-widget]").forEach((button) => button.classList.toggle("active", button.dataset.marketWidget === kind));
    document.getElementById("marketStudyNote").textContent = "";
    if (RESTRICTED.has(kind) && !options.active) return lockedView(kind);
    const item = WIDGETS[kind] || WIDGETS.heatmap;
    document.getElementById("marketExpand").hidden = false;
    host.style.height = `${item.height}px`;
    host.innerHTML = `<div class="marketWidgetLoading">${esc(copy.loading)}</div>`;
    const container = document.createElement("div");
    container.className = "tradingview-widget-container";
    container.style.height = "100%";
    const inner = document.createElement("div");
    inner.className = "tradingview-widget-container__widget";
    inner.style.height = "calc(100% - 24px)";
    container.appendChild(inner);
    const source = document.createElement("div");
    source.className = "marketWidgetSource";
    source.textContent = copy.source;
    container.appendChild(source);
    const script = document.createElement("script");
    script.src = item.src;
    script.async = true;
    script.textContent = JSON.stringify({ ...item.config, locale: LOCALE[options.language] || "en" });
    script.onerror = () => { host.innerHTML = `<div class="marketWidgetError">${esc(copy.error)}</div>`; };
    container.appendChild(script);
    host.replaceChildren(container);
  }

  function toggleExpand() {
    const section = document.getElementById("marketAnalysisSection");
    const button = document.getElementById("marketExpand");
    const copy = COPY[options.language] || COPY.pt;
    const expanded = section.classList.toggle("expanded");
    button.textContent = expanded ? `✕ ${copy.shrink}` : `⛶ ${copy.expand}`;
    document.body.classList.toggle("marketExpandedOpen", expanded);
    if (expanded) document.getElementById("marketWidget").style.height = "calc(100dvh - 170px)";
    else loadWidget(currentWidget);
  }

  function render(args = {}) {
    options = { language: ["pt", "en", "es", "ru"].includes(args.language) ? args.language : "pt", active: args.active === true, back: args.back, openCourse: args.openCourse, openUrl: args.openUrl, subscribe: args.subscribe };
    const copy = COPY[options.language];
    const target = document.getElementById("content");
    if (!target) return;
    target.innerHTML = `<div class="marketCenter"><button id="marketBack" class="textButton">← ${esc(copy.back)}</button><section class="marketHero"><span>📊</span><div><h1>${esc(copy.title)}</h1><p>${esc(copy.intro)}</p></div></section><section id="marketAnalysisSection" class="marketSection marketAnalysisSection"><header><div><h2>${esc(copy.tools)}</h2><p>${esc(copy.toolsSub)}</p><small id="marketStudyNote" class="marketStudyNote"></small></div><button id="marketExpand" class="marketExpand" type="button">⛶ ${esc(copy.expand)}</button></header><div class="marketTabs"><button data-market-widget="chart">${options.active ? "" : "🔒 "}${esc(copy.chart)}</button><button data-market-widget="technical">${options.active ? "" : "🔒 "}${esc(copy.technical)}</button><button data-market-widget="heatmap">${esc(copy.heatmap)}</button><button data-market-widget="calendar">${esc(copy.calendar)}</button><button data-market-widget="overview">${esc(copy.overview)}</button></div><div id="marketWidget" class="marketWidget"></div></section><section class="marketSection"><header><h2>${esc(copy.education)}</h2><p>${esc(copy.educationSub)}</p></header><div class="marketCourseGrid"><article class="marketCourse featured"><span>📈</span><div><h3>${esc(copy.ownCourse)}</h3><p>${esc(copy.ownCourseText)}</p><button data-own-course>${esc(copy.openCourse)}</button></div></article><article class="marketCourse"><span>▶️</span><div><h3>${esc(copy.video)}</h3><p>${esc(copy.videoText)}</p><button data-url="${VIDEO_COURSE}">${esc(copy.watch)}</button></div></article>${COURSES.map((course) => `<article class="marketCourse"><span>${course.icon}</span><div><h3>${esc(course.name)}</h3><p>${esc(copy[course.key])}</p><button data-url="${esc(course.url)}">${esc(copy.study)}</button>${course.affiliateUrl ? `<button data-url="${esc(course.affiliateUrl)}">${esc(copy.binanceWeb3)}</button>` : ""}</div></article>`).join("")}</div></section><section class="marketSection"><header><h2>${esc(copy.partners)}</h2><p>${esc(copy.partnersSub)}</p></header><div class="marketPartnerGrid"><article class="marketPartner tradingview"><span>TV</span><div><h3>${esc(copy.tradingView)}</h3><p>${esc(copy.tradingViewText)}</p><div><button data-url="${TRADINGVIEW_AFFILIATE}">${esc(copy.tradingView)}</button><button class="secondary" data-url="${TRADINGVIEW_PRICING}">${esc(copy.plans)}</button></div></div></article><article class="marketPartner exness"><span>↗</span><div><h3>${esc(copy.exness)}</h3><p>${esc(copy.exnessText)}</p><button data-url="${EXNESS_AFFILIATE}">${esc(copy.register)}</button></div></article></div></section></div>`;
    document.getElementById("marketBack").onclick = () => {
      document.body.classList.remove("marketExpandedOpen");
      options.back?.();
    };
    document.getElementById("marketExpand").onclick = toggleExpand;
    document.querySelectorAll("[data-market-widget]").forEach((button) => button.onclick = () => loadWidget(button.dataset.marketWidget));
    document.querySelectorAll("[data-url]").forEach((button) => button.onclick = () => open(button.dataset.url));
    document.querySelector("[data-own-course]").onclick = () => options.openCourse?.("analise_tecnica_completa");
    loadWidget(options.active ? "chart" : "heatmap");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  window.EduCashProMarkets = { render };
})();
