(function () {
  "use strict";

  const TRADINGVIEW_AFFILIATE = "https://br.tradingview.com/?aff_id=170669";
  const TRADINGVIEW_PRICING = "https://br.tradingview.com/pricing/?aff_id=170669";
  const EXNESS_AFFILIATE = "https://one.exnessonelink.com/a/93bgo7jpfo/?campaign=43340";
  const VIDEO_COURSE = "https://t.me/boost?c=3706880680";
  const BINANCE_MARKET_DATA = "https://data-api.binance.vision/api/v3/klines";
  const DIRECTION_CACHE_MS = 45000;
  const RESTRICTED = new Set(["chart", "technical"]);
  const TIMEFRAMES = [
    { id: "1m", label: "1m", chart: "1", technical: "1m" },
    { id: "2m", label: "2m", chart: "2", technical: "2m" },
    { id: "3m", label: "3m", chart: "3", technical: "3m" },
    { id: "5m", label: "5m", chart: "5", technical: "5m" },
    { id: "10m", label: "10m", chart: "10", technical: "10m" },
    { id: "15m", label: "15m", chart: "15", technical: "15m" },
    { id: "30m", label: "30m", chart: "30", technical: "30m" },
    { id: "1h", label: "1h", chart: "60", technical: "1h" },
    { id: "2h", label: "2h", chart: "120", technical: "2h" },
    { id: "4h", label: "4h", chart: "240", technical: "4h" },
    { id: "1D", label: "D", chart: "D", technical: "1D" }
  ];

  const DIRECTION_SYMBOLS = [
    ["BTCUSDT", "BINANCE:BTCUSDT", "BTC/USDT"],
    ["ETHUSDT", "BINANCE:ETHUSDT", "ETH/USDT"],
    ["BNBUSDT", "BINANCE:BNBUSDT", "BNB/USDT"],
    ["SOLUSDT", "BINANCE:SOLUSDT", "SOL/USDT"],
    ["XRPUSDT", "BINANCE:XRPUSDT", "XRP/USDT"],
    ["ADAUSDT", "BINANCE:ADAUSDT", "ADA/USDT"],
    ["DOGEUSDT", "BINANCE:DOGEUSDT", "DOGE/USDT"],
    ["TRXUSDT", "BINANCE:TRXUSDT", "TRX/USDT"],
    ["AVAXUSDT", "BINANCE:AVAXUSDT", "AVAX/USDT"],
    ["LINKUSDT", "BINANCE:LINKUSDT", "LINK/USDT"],
    ["DOTUSDT", "BINANCE:DOTUSDT", "DOT/USDT"],
    ["LTCUSDT", "BINANCE:LTCUSDT", "LTC/USDT"]
  ].map(([api, tv, label]) => ({ api, tv, label }));

  const COPY = {
    pt: {
      title: "Mercados, Análise e Formação",
      intro: "Gráfico e resumo técnico com todos os períodos disponíveis, além da seleção de tendências em 1 hora.",
      tools: "Análise de mercado",
      toolsSub: "O filtro de ativos usa 1H e oculta os laterais. No gráfico e no resumo, escolha livremente entre todos os minutos e períodos disponíveis.",
      chart: "Gráfico",
      technical: "Resumo técnico",
      timeframe: "Período da análise",
      daily: "Diário",
      loading: "Carregando dados de mercado…",
      error: "Não foi possível carregar esta ferramenta agora.",
      locked: "Recurso exclusivo para assinantes ativos",
      lockedText: "Ative sua assinatura para utilizar o gráfico, a seleção direcional em 1H e o resumo técnico em todos os períodos disponíveis.",
      subscribe: "Ativar assinatura",
      expand: "Expandir",
      shrink: "Fechar tela ampliada",
      up: "Em alta",
      down: "Em baixa",
      noUp: "Nenhum ativo com alta clara neste momento.",
      noDown: "Nenhum ativo com baixa clara neste momento.",
      scannerLoading: "Analisando a direção dos candles de 1 hora…",
      scannerError: "A seleção automática de ativos não respondeu. O gráfico continua disponível.",
      refresh: "Atualizar",
      selected: "Ativo selecionado",
      candle: "Candle",
      pressure: "Pressão",
      body: "Corpo",
      ema: "EMA 9/21",
      bullish: "Alta",
      bearish: "Baixa",
      buyers: "Compradora",
      sellers: "Vendedora",
      alignedUp: "Alinhada ↑",
      alignedDown: "Alinhada ↓",
      mixed: "Mista",
      lateralNote: "Filtro 1H: candle atual + alinhamento e inclinação das EMA 9/21. Laterais não aparecem.",
      source: "Gráfico e resumo: TradingView. Seleção direcional de criptoativos: dados públicos da Binance.",
      education: "Formação gratuita",
      educationSub: "Cursos e conteúdos selecionados pelo EduCashPro.",
      ownCourse: "Curso EduCashPro de Price Action",
      ownCourseText: "Estrutura, tendências, ranges, rompimentos, reversões, XAUUSD e gestão de risco.",
      openCourse: "Abrir curso",
      video: "Curso em vídeo",
      videoText: "Aulas em vídeo com acesso livre para assinantes e não assinantes.",
      watch: "Assistir",
      binance: "Cripto, blockchain, Web3, segurança, trading e gestão de risco em vários idiomas.",
      study: "Estudar gratuitamente",
      binanceWeb3: "Acessar Binance Web3",
      partners: "Plataformas para analisar e praticar",
      partnersSub: "Os botões abaixo usam links de parceiro do EduCashPro.",
      tradingView: "Abrir TradingView",
      tradingViewText: "Use a plataforma completa para gráficos, indicadores, listas e alertas.",
      plans: "Conhecer planos",
      exness: "Praticar na Exness",
      exnessText: "Abra sua conta pelo link do parceiro e comece pela conta demonstrativa.",
      register: "Abrir Exness",
      back: "Voltar à Academy"
    },
    en: {
      title: "Markets, Analysis and Training",
      intro: "Chart and technical summary with all available timeframes, plus one-hour trend selection.",
      tools: "Market analysis",
      toolsSub: "The asset filter uses 1H and hides sideways markets. In the chart and summary, freely choose any available minute or timeframe.",
      chart: "Chart",
      technical: "Technical summary",
      timeframe: "Analysis timeframe",
      daily: "Daily",
      loading: "Loading market data…",
      error: "This tool could not be loaded right now.",
      locked: "Active subscribers only",
      lockedText: "Activate your subscription to use the chart, 1H directional selection and technical summary across all available timeframes.",
      subscribe: "Activate subscription",
      expand: "Expand",
      shrink: "Close expanded view",
      up: "Trending up",
      down: "Trending down",
      noUp: "No asset has a clear bullish direction right now.",
      noDown: "No asset has a clear bearish direction right now.",
      scannerLoading: "Reading one-hour candle direction…",
      scannerError: "Automatic asset selection did not respond. The chart is still available.",
      refresh: "Refresh",
      selected: "Selected asset",
      candle: "Candle",
      pressure: "Pressure",
      body: "Body",
      ema: "EMA 9/21",
      bullish: "Bullish",
      bearish: "Bearish",
      buyers: "Buyers",
      sellers: "Sellers",
      alignedUp: "Aligned ↑",
      alignedDown: "Aligned ↓",
      mixed: "Mixed",
      lateralNote: "1H filter: current candle + EMA 9/21 alignment and slope. Sideways assets are hidden.",
      source: "Chart and summary: TradingView. Crypto directional selection: Binance public data.",
      education: "Free training",
      educationSub: "Courses and content selected by EduCashPro.",
      ownCourse: "EduCashPro Price Action Course",
      ownCourseText: "Structure, trends, ranges, breakouts, reversals, XAUUSD and risk management.",
      openCourse: "Open course",
      video: "Video course",
      videoText: "Free video lessons for subscribers and non-subscribers.",
      watch: "Watch",
      binance: "Crypto, blockchain, Web3, security, trading and risk management in several languages.",
      study: "Study for free",
      binanceWeb3: "Access Binance Web3",
      partners: "Platforms for analysis and practice",
      partnersSub: "The buttons below use EduCashPro partner links.",
      tradingView: "Open TradingView",
      tradingViewText: "Use the complete platform for charts, indicators, watchlists and alerts.",
      plans: "View plans",
      exness: "Practice with Exness",
      exnessText: "Open an account through the partner link and begin with a Demo account.",
      register: "Open Exness",
      back: "Back to Academy"
    },
    es: {
      title: "Mercados, Análisis y Formación",
      intro: "Gráfico y resumen técnico con todos los períodos disponibles, además de selección de tendencias en una hora.",
      tools: "Análisis de mercado",
      toolsSub: "El filtro de activos usa 1H y oculta los laterales. En el gráfico y el resumen, elige libremente todos los minutos y períodos disponibles.",
      chart: "Gráfico",
      technical: "Resumen técnico",
      timeframe: "Período del análisis",
      daily: "Diario",
      loading: "Cargando datos del mercado…",
      error: "No fue posible cargar esta herramienta.",
      locked: "Recurso exclusivo para suscriptores activos",
      lockedText: "Activa tu suscripción para utilizar el gráfico, la selección direccional en 1H y el resumen técnico en todos los períodos disponibles.",
      subscribe: "Activar suscripción",
      expand: "Ampliar",
      shrink: "Cerrar vista ampliada",
      up: "En alza",
      down: "En baja",
      noUp: "No hay activos con una dirección alcista clara ahora.",
      noDown: "No hay activos con una dirección bajista clara ahora.",
      scannerLoading: "Analizando la dirección de las velas de una hora…",
      scannerError: "La selección automática de activos no respondió. El gráfico sigue disponible.",
      refresh: "Actualizar",
      selected: "Activo seleccionado",
      candle: "Vela",
      pressure: "Presión",
      body: "Cuerpo",
      ema: "EMA 9/21",
      bullish: "Alza",
      bearish: "Baja",
      buyers: "Compradora",
      sellers: "Vendedora",
      alignedUp: "Alineada ↑",
      alignedDown: "Alineada ↓",
      mixed: "Mixta",
      lateralNote: "Filtro 1H: vela actual + alineación e inclinación de EMA 9/21. Los laterales se ocultan.",
      source: "Gráfico y resumen: TradingView. Selección direccional de criptoactivos: datos públicos de Binance.",
      education: "Formación gratuita",
      educationSub: "Cursos y contenidos seleccionados por EduCashPro.",
      ownCourse: "Curso EduCashPro de Price Action",
      ownCourseText: "Estructura, tendencias, rangos, rompimientos, reversiones, XAUUSD y gestión de riesgo.",
      openCourse: "Abrir curso",
      video: "Curso en video",
      videoText: "Clases en video gratuitas para suscriptores y no suscriptores.",
      watch: "Ver",
      binance: "Cripto, blockchain, Web3, seguridad, trading y gestión de riesgo en varios idiomas.",
      study: "Estudiar gratis",
      binanceWeb3: "Acceder a Binance Web3",
      partners: "Plataformas para analizar y practicar",
      partnersSub: "Los botones utilizan enlaces de socio de EduCashPro.",
      tradingView: "Abrir TradingView",
      tradingViewText: "Usa la plataforma completa para gráficos, indicadores, listas y alertas.",
      plans: "Conocer planes",
      exness: "Practicar en Exness",
      exnessText: "Abre una cuenta mediante el enlace de socio y comienza con una cuenta Demo.",
      register: "Abrir Exness",
      back: "Volver a Academy"
    },
    ru: {
      title: "Рынки, анализ и обучение",
      intro: "График и техническая сводка со всеми доступными периодами, а также часовой отбор трендов.",
      tools: "Анализ рынка",
      toolsSub: "Фильтр активов использует 1H и скрывает боковой рынок. На графике и в сводке доступны все поддерживаемые минуты и периоды.",
      chart: "График",
      technical: "Техническая сводка",
      timeframe: "Период анализа",
      daily: "День",
      loading: "Загрузка рыночных данных…",
      error: "Не удалось загрузить инструмент.",
      locked: "Только для активных подписчиков",
      lockedText: "Активируйте подписку для графика, направленного отбора 1H и технической сводки на всех доступных периодах.",
      subscribe: "Активировать подписку",
      expand: "Развернуть",
      shrink: "Закрыть большой экран",
      up: "Рост",
      down: "Снижение",
      noUp: "Сейчас нет активов с явным направлением вверх.",
      noDown: "Сейчас нет активов с явным направлением вниз.",
      scannerLoading: "Анализ направления часовых свечей…",
      scannerError: "Автоматический отбор активов не ответил. График остается доступен.",
      refresh: "Обновить",
      selected: "Выбранный актив",
      candle: "Свеча",
      pressure: "Давление",
      body: "Тело",
      ema: "EMA 9/21",
      bullish: "Рост",
      bearish: "Снижение",
      buyers: "Покупатели",
      sellers: "Продавцы",
      alignedUp: "Вверх ↑",
      alignedDown: "Вниз ↓",
      mixed: "Смешано",
      lateralNote: "Фильтр 1H: текущая свеча + расположение и наклон EMA 9/21. Боковые активы скрыты.",
      source: "График и сводка: TradingView. Направленный отбор криптоактивов: публичные данные Binance.",
      education: "Бесплатное обучение",
      educationSub: "Курсы и материалы, отобранные EduCashPro.",
      ownCourse: "Курс EduCashPro по Price Action",
      ownCourseText: "Структура, тренды, диапазоны, пробои, развороты, XAUUSD и управление риском.",
      openCourse: "Открыть курс",
      video: "Видеокурс",
      videoText: "Бесплатные видеоуроки для подписчиков и остальных пользователей.",
      watch: "Смотреть",
      binance: "Криптовалюты, блокчейн, Web3, безопасность, торговля и управление риском.",
      study: "Учиться бесплатно",
      binanceWeb3: "Открыть Binance Web3",
      partners: "Платформы для анализа и практики",
      partnersSub: "Кнопки используют партнёрские ссылки EduCashPro.",
      tradingView: "Открыть TradingView",
      tradingViewText: "Полная платформа для графиков, индикаторов, списков и уведомлений.",
      plans: "Посмотреть планы",
      exness: "Практика в Exness",
      exnessText: "Откройте счёт по партнёрской ссылке и начните с демо-счёта.",
      register: "Открыть Exness",
      back: "Назад в Academy"
    }
  };

  const LOCALE = { pt: "br", en: "en", es: "es", ru: "ru" };
  const BINANCE_AFFILIATE = "https://web3.binance.com/m/referral?ref=IYN019BM";
  const COURSES = [{ icon: "₿", name: "Binance Academy", key: "binance", url: "https://academy.binance.com/", affiliateUrl: BINANCE_AFFILIATE }];

  const WIDGETS = {
    chart: {
      src: "https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js",
      height: 720,
      config: {
        autosize: true,
        symbol: "OANDA:XAUUSD",
        interval: "60",
        timezone: "Etc/UTC",
        theme: "dark",
        style: "1",
        allow_symbol_change: true,
        calendar: false,
        studies: ["STD;Moving Average"],
        studies_overrides: {
          "moving average.length": 20,
          "moving average.plot.color": "#ffcc33",
          "moving average.plot.linewidth": 2
        },
        support_host: "https://www.tradingview.com"
      }
    },
    technical: {
      src: "https://s3.tradingview.com/external-embedding/embed-widget-technical-analysis.js",
      height: 560,
      config: {
        interval: "1h",
        width: "100%",
        isTransparent: true,
        height: "100%",
        symbol: "OANDA:XAUUSD",
        showIntervalTabs: false,
        displayMode: "single",
        colorTheme: "dark"
      }
    }
  };

  let options = null;
  let currentWidget = "chart";
  let selectedAsset = null;
  let selectedTimeframe = "1h";
  let directionSnapshot = [];
  let directionSnapshotAt = 0;
  let scanRequestId = 0;

  const esc = (value) => String(value || "").replace(/[&<>'"]/g, (char) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;"
  })[char]);

  function ensureStyles() {
    if (document.getElementById("marketDirectionStyles")) return;
    const style = document.createElement("style");
    style.id = "marketDirectionStyles";
    style.textContent = `
      .marketDirectionPanel{display:grid;gap:12px;margin-bottom:12px;padding:12px;border:1px solid rgba(255,255,255,.09);border-radius:16px;background:#0a1728}
      .marketDirectionTop{display:flex;align-items:center;justify-content:space-between;gap:10px}
      .marketDirectionTop strong{font-size:14px}.marketDirectionTop button{min-height:34px;padding:6px 10px;border:1px solid rgba(48,230,166,.35);border-radius:10px;color:#30e6a6;background:rgba(48,230,166,.08);font-size:11px;font-weight:900}
      .marketDirectionStatus{color:#9db0c6;font-size:11px;line-height:1.4}
      .marketDirectionColumns{display:grid;grid-template-columns:1fr 1fr;gap:9px}.marketDirectionGroup{min-width:0;padding:10px;border:1px solid rgba(255,255,255,.07);border-radius:13px;background:#0d1b2d}
      .marketDirectionGroup h3{display:flex;align-items:center;justify-content:space-between;gap:8px;margin:0 0 8px;font-size:13px}.marketDirectionGroup.up h3{color:#30e6a6}.marketDirectionGroup.down h3{color:#ff7d89}
      .marketDirectionAssets{display:flex;flex-wrap:wrap;gap:6px}.marketDirectionAssets button{min-height:34px;padding:6px 8px;border:1px solid rgba(255,255,255,.09);border-radius:10px;color:#f7fbff;background:#071322;font-size:11px;font-weight:850}
      .marketDirectionAssets button.active{border-color:#ffc85c;box-shadow:inset 0 0 0 1px #ffc85c}.marketDirectionAssets button small{display:block;margin-top:2px;color:#9db0c6;font-size:9px}
      .marketDirectionEmpty{margin:0;color:#9db0c6;font-size:11px;line-height:1.45}
      .marketInstantMeter{display:grid;grid-template-columns:repeat(4,1fr);gap:7px}.marketInstantMeter article{min-width:0;padding:9px 7px;border:1px solid rgba(255,255,255,.07);border-radius:11px;background:#071322;text-align:center}
      .marketInstantMeter small{display:block;color:#9db0c6;font-size:9px}.marketInstantMeter b{display:block;overflow:hidden;margin-top:3px;text-overflow:ellipsis;font-size:11px;white-space:nowrap}.marketInstantMeter .positive{color:#30e6a6}.marketInstantMeter .negative{color:#ff7d89}
      .marketDirectionFoot{color:#9db0c6;font-size:10px;line-height:1.45}.marketChartFrame{height:720px;overflow:hidden;border-radius:15px}.marketTechnicalFrame{height:560px;overflow:hidden;border-radius:15px}
      .marketTimeframePanel{display:grid;gap:8px;margin:0 0 12px}.marketTimeframePanel>strong{font-size:12px;color:#b8c8da}.marketTimeframes{display:flex;gap:7px;overflow-x:auto;padding:2px 1px 7px;scrollbar-width:thin;-webkit-overflow-scrolling:touch}.marketTimeframes button{flex:0 0 auto;min-width:48px;min-height:38px;padding:7px 10px;border:1px solid rgba(255,255,255,.11);border-radius:10px;color:#b8c8da;background:#071322;font-size:12px;font-weight:900}.marketTimeframes button.active{border-color:#30e6a6;color:#071322;background:#30e6a6}.marketTimeframes button[data-timeframe="1D"]{min-width:72px}
      .marketAnalysisSection.expanded .marketWidget{overflow:auto}.marketAnalysisSection.expanded .marketChartFrame{height:calc(100dvh - 315px);min-height:430px}.marketAnalysisSection.expanded .marketTechnicalFrame{height:calc(100dvh - 190px);min-height:430px}
      @media(max-width:560px){.marketDirectionColumns{grid-template-columns:1fr}.marketInstantMeter{grid-template-columns:repeat(2,1fr)}.marketChartFrame{height:68vh;min-height:500px}}
    `;
    document.head.appendChild(style);
  }

  function open(url) {
    if (options?.openUrl) return options.openUrl(url);
    try { window.Telegram?.WebApp?.openLink(url); } catch { window.open(url, "_blank", "noopener"); }
  }

  function ema(values, period) {
    if (!values.length) return 0;
    const multiplier = 2 / (period + 1);
    let value = values[0];
    for (let i = 1; i < values.length; i += 1) value = (values[i] * multiplier) + (value * (1 - multiplier));
    return value;
  }

  function clamp(value, min, max) {
    return Math.max(min, Math.min(max, value));
  }

  function readDirection(asset, rows) {
    const candles = rows.map((row) => ({
      open: Number(row[1]),
      high: Number(row[2]),
      low: Number(row[3]),
      close: Number(row[4]),
      volume: Number(row[5])
    })).filter((candle) => [candle.open, candle.high, candle.low, candle.close].every(Number.isFinite));

    if (candles.length < 22) throw new Error("insufficient_candles");

    const current = candles[candles.length - 1];
    const closes = candles.map((candle) => candle.close);
    const ema9 = ema(closes, 9);
    const ema21 = ema(closes, 21);
    const prevEma9 = ema(closes.slice(0, -1), 9);
    const range = Math.max(0, current.high - current.low);
    const body = current.close - current.open;
    const bodyPct = current.open ? (body / current.open) * 100 : 0;
    const bodyShare = range ? Math.abs(body) / range : 0;
    const closePressure = range ? ((current.close - current.low) / range) * 100 : 50;
    const momentumBase = candles[candles.length - 4]?.close || current.open;
    const momentum3 = momentumBase ? ((current.close - momentumBase) / momentumBase) * 100 : 0;
    const recent = candles.slice(-12);
    const avgRangePct = recent.reduce((sum, candle) => sum + (candle.open ? ((candle.high - candle.low) / candle.open) * 100 : 0), 0) / recent.length;
    const minBody = Math.max(0.05, avgRangePct * 0.08);

    const alignedUp = current.close > ema9 && ema9 > ema21 && ema9 > prevEma9;
    const alignedDown = current.close < ema9 && ema9 < ema21 && ema9 < prevEma9;
    const directionalBody = bodyShare >= 0.22;

    let direction = null;
    if (bodyPct > minBody && alignedUp && momentum3 > 0 && directionalBody) direction = "up";
    if (bodyPct < -minBody && alignedDown && momentum3 < 0 && directionalBody) direction = "down";

    return {
      asset,
      direction,
      bodyPct,
      bodyShare: clamp(bodyShare * 100, 0, 100),
      closePressure: clamp(closePressure, 0, 100),
      emaState: alignedUp ? "up" : alignedDown ? "down" : "mixed",
      momentum3
    };
  }

  async function fetchDirection(asset) {
    const url = `${BINANCE_MARKET_DATA}?symbol=${encodeURIComponent(asset.api)}&interval=1h&limit=30`;
    const response = await fetch(url, { cache: "no-store" });
    if (!response.ok) throw new Error(`market_${response.status}`);
    const rows = await response.json();
    if (!Array.isArray(rows)) throw new Error("invalid_market_data");
    return readDirection(asset, rows);
  }

  async function scanDirections(force = false) {
    const now = Date.now();
    if (!force && directionSnapshot.length && (now - directionSnapshotAt) < DIRECTION_CACHE_MS) return directionSnapshot;
    const requestId = ++scanRequestId;
    const results = await Promise.allSettled(DIRECTION_SYMBOLS.map(fetchDirection));
    if (requestId !== scanRequestId) return directionSnapshot;

    const parsed = results.filter((result) => result.status === "fulfilled").map((result) => result.value);
    directionSnapshot = parsed;
    directionSnapshotAt = Date.now();
    return directionSnapshot;
  }

  function selectedReading(snapshot) {
    if (!selectedAsset) return null;
    return snapshot.find((item) => item.asset.api === selectedAsset.api) || null;
  }

  function sortedDirectional(snapshot, direction) {
    return snapshot
      .filter((item) => item.direction === direction)
      .sort((a, b) => Math.abs(b.bodyPct) - Math.abs(a.bodyPct));
  }

  function assetButtons(items) {
    return items.map((item) => {
      const active = selectedAsset?.api === item.asset.api ? " active" : "";
      const arrow = item.direction === "up" ? "▲" : "▼";
      const sign = item.bodyPct > 0 ? "+" : "";
      return `<button type="button" class="${active.trim()}" data-direction-asset="${esc(item.asset.api)}">${arrow} ${esc(item.asset.label)}<small>${sign}${item.bodyPct.toFixed(2)}%</small></button>`;
    }).join("");
  }

  function instantMeter(item, copy) {
    if (!item) return "";
    const candleUp = item.bodyPct >= 0;
    const pressureUp = item.closePressure >= 50;
    const emaText = item.emaState === "up" ? copy.alignedUp : item.emaState === "down" ? copy.alignedDown : copy.mixed;
    const bodySign = item.bodyPct > 0 ? "+" : "";
    return `<div class="marketInstantMeter" aria-label="${esc(copy.selected)}">
      <article><small>${esc(copy.candle)}</small><b class="${candleUp ? "positive" : "negative"}">${candleUp ? "▲ " + esc(copy.bullish) : "▼ " + esc(copy.bearish)}</b></article>
      <article><small>${esc(copy.body)}</small><b class="${candleUp ? "positive" : "negative"}">${bodySign}${item.bodyPct.toFixed(2)}%</b></article>
      <article><small>${esc(copy.pressure)}</small><b class="${pressureUp ? "positive" : "negative"}">${Math.round(pressureUp ? item.closePressure : (100 - item.closePressure))}% ${esc(pressureUp ? copy.buyers : copy.sellers)}</b></article>
      <article><small>${esc(copy.ema)}</small><b class="${item.emaState === "up" ? "positive" : item.emaState === "down" ? "negative" : ""}">${esc(emaText)}</b></article>
    </div>`;
  }

  function scannerMarkup(snapshot, copy, error = false) {
    const up = sortedDirectional(snapshot, "up");
    const down = sortedDirectional(snapshot, "down");
    const reading = selectedReading(snapshot);
    return `<div class="marketDirectionPanel">
      <div class="marketDirectionTop"><strong>⚡ ${esc(copy.selected)}: ${esc(selectedAsset?.label || "—")}</strong><button id="marketDirectionRefresh" type="button">↻ ${esc(copy.refresh)}</button></div>
      <div class="marketDirectionStatus">${error ? esc(copy.scannerError) : esc(copy.lateralNote)}</div>
      <div class="marketDirectionColumns">
        <section class="marketDirectionGroup up"><h3><span>▲ ${esc(copy.up)}</span><small>${up.length}</small></h3><div class="marketDirectionAssets">${up.length ? assetButtons(up) : `<p class="marketDirectionEmpty">${esc(copy.noUp)}</p>`}</div></section>
        <section class="marketDirectionGroup down"><h3><span>▼ ${esc(copy.down)}</span><small>${down.length}</small></h3><div class="marketDirectionAssets">${down.length ? assetButtons(down) : `<p class="marketDirectionEmpty">${esc(copy.noDown)}</p>`}</div></section>
      </div>
      ${instantMeter(reading, copy)}
      <div class="marketDirectionFoot">${esc(copy.source)}</div>
    </div>`;
  }

  function bindScanner(host, snapshot) {
    host.querySelectorAll("[data-direction-asset]").forEach((button) => {
      button.onclick = () => {
        const reading = snapshot.find((item) => item.asset.api === button.dataset.directionAsset);
        if (!reading) return;
        selectedAsset = reading.asset;
        renderChart(snapshot);
      };
    });
    const refresh = host.querySelector("#marketDirectionRefresh");
    if (refresh) refresh.onclick = () => loadChart(true);
  }

  function tradingViewContainer(frameClass, item, symbol) {
    const copy = COPY[options.language] || COPY.pt;
    const frame = document.createElement("div");
    frame.className = frameClass;
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
    script.textContent = JSON.stringify({
      ...item.config,
      symbol: symbol || item.config.symbol,
      interval: currentInterval(item === WIDGETS.technical ? "technical" : "chart"),
      locale: LOCALE[options.language] || "en"
    });
    script.onerror = () => {
      frame.innerHTML = `<div class="marketWidgetError">${esc(copy.error)}</div>`;
    };
    container.appendChild(script);
    frame.appendChild(container);
    return frame;
  }

  function currentInterval(kind) {
    const timeframe = TIMEFRAMES.find((item) => item.id === selectedTimeframe) || TIMEFRAMES[7];
    return timeframe[kind];
  }

  function timeframeMarkup(copy) {
    return `<div class="marketTimeframePanel"><strong>${esc(copy.timeframe)}</strong><div class="marketTimeframes" role="group" aria-label="${esc(copy.timeframe)}">${TIMEFRAMES.map((item) => `<button type="button" data-timeframe="${item.id}" class="${item.id === selectedTimeframe ? "active" : ""}">${item.id === "1D" ? esc(copy.daily) : item.label}</button>`).join("")}</div></div>`;
  }

  function bindTimeframes(host) {
    host.querySelectorAll("[data-timeframe]").forEach((button) => {
      button.onclick = () => {
        selectedTimeframe = button.dataset.timeframe;
        if (currentWidget === "technical") loadTechnical();
        else renderChart(directionSnapshot);
      };
    });
  }

  function lockedView(kind) {
    const host = document.getElementById("marketWidget");
    const copy = COPY[options.language] || COPY.pt;
    host.style.height = "auto";
    host.innerHTML = `<div class="marketLocked"><span>🔒</span><h3>${esc(copy.locked)}</h3><p>${esc(copy.lockedText)}</p><button id="marketSubscribe">${esc(copy.subscribe)}</button></div>`;
    document.getElementById("marketSubscribe").onclick = () => options.subscribe?.();
    document.getElementById("marketExpand").hidden = true;
  }

  function renderChart(snapshot, error = false) {
    const host = document.getElementById("marketWidget");
    if (!host || currentWidget !== "chart") return;
    const copy = COPY[options.language] || COPY.pt;
    host.style.height = "auto";
    host.innerHTML = scannerMarkup(snapshot, copy, error);
    host.insertAdjacentHTML("beforeend", timeframeMarkup(copy));
    host.appendChild(tradingViewContainer("marketChartFrame", WIDGETS.chart, selectedAsset?.tv || WIDGETS.chart.config.symbol));
    bindScanner(host, snapshot);
    bindTimeframes(host);
  }

  async function loadChart(force = false) {
    const host = document.getElementById("marketWidget");
    const copy = COPY[options.language] || COPY.pt;
    if (!host) return;
    if (!options.active) return lockedView("chart");
    document.getElementById("marketExpand").hidden = false;
    host.style.height = "auto";
    host.innerHTML = `<div class="marketDirectionPanel"><div class="marketDirectionStatus">${esc(copy.scannerLoading)}</div></div><div class="marketChartFrame"><div class="marketWidgetLoading">${esc(copy.loading)}</div></div>`;

    try {
      const snapshot = await scanDirections(force);
      const directional = [...sortedDirectional(snapshot, "up"), ...sortedDirectional(snapshot, "down")];
      if (!selectedAsset || !directional.some((item) => item.asset.api === selectedAsset.api)) {
        selectedAsset = directional[0]?.asset || selectedAsset || DIRECTION_SYMBOLS[0];
      }
      renderChart(snapshot, false);
    } catch {
      selectedAsset = selectedAsset || DIRECTION_SYMBOLS[0];
      renderChart(directionSnapshot, true);
    }
  }

  function loadTechnical() {
    const host = document.getElementById("marketWidget");
    const copy = COPY[options.language] || COPY.pt;
    if (!host) return;
    if (!options.active) return lockedView("technical");
    document.getElementById("marketExpand").hidden = false;
    host.style.height = "auto";
    host.innerHTML = `<div class="marketDirectionPanel"><div class="marketDirectionTop"><strong>${esc(copy.selected)}: ${esc(selectedAsset?.label || "XAU/USD")}</strong></div><div class="marketDirectionStatus">${esc(copy.toolsSub)}</div></div>${timeframeMarkup(copy)}`;
    host.appendChild(tradingViewContainer("marketTechnicalFrame", WIDGETS.technical, selectedAsset?.tv || WIDGETS.technical.config.symbol));
    bindTimeframes(host);
  }

  function loadWidget(kind) {
    const host = document.getElementById("marketWidget");
    if (!host) return;
    currentWidget = kind;
    document.querySelectorAll("[data-market-widget]").forEach((button) => button.classList.toggle("active", button.dataset.marketWidget === kind));
    if (RESTRICTED.has(kind) && !options.active) return lockedView(kind);
    if (kind === "technical") return loadTechnical();
    return loadChart(false);
  }

  function toggleExpand() {
    const section = document.getElementById("marketAnalysisSection");
    const button = document.getElementById("marketExpand");
    const copy = COPY[options.language] || COPY.pt;
    const expanded = section.classList.toggle("expanded");
    button.textContent = expanded ? `✕ ${copy.shrink}` : `⛶ ${copy.expand}`;
    document.body.classList.toggle("marketExpandedOpen", expanded);
  }

  function render(args = {}) {
    options = {
      language: ["pt", "en", "es", "ru"].includes(args.language) ? args.language : "pt",
      active: args.active === true,
      back: args.back,
      openCourse: args.openCourse,
      openUrl: args.openUrl,
      subscribe: args.subscribe
    };
    ensureStyles();
    currentWidget = "chart";
    selectedAsset = null;
    selectedTimeframe = "1h";
    const copy = COPY[options.language];
    const target = document.getElementById("content");
    if (!target) return;

    target.innerHTML = `<div class="marketCenter">
      <button id="marketBack" class="textButton">← ${esc(copy.back)}</button>
      <section class="marketHero"><span>📊</span><div><h1>${esc(copy.title)}</h1><p>${esc(copy.intro)}</p></div></section>
      <section id="marketAnalysisSection" class="marketSection marketAnalysisSection">
        <header><div><h2>${esc(copy.tools)}</h2><p>${esc(copy.toolsSub)}</p></div><button id="marketExpand" class="marketExpand" type="button">⛶ ${esc(copy.expand)}</button></header>
        <div class="marketTabs">
          <button data-market-widget="chart">${options.active ? "" : "🔒 "}${esc(copy.chart)}</button>
          <button data-market-widget="technical">${options.active ? "" : "🔒 "}${esc(copy.technical)}</button>
        </div>
        <div id="marketWidget" class="marketWidget"></div>
      </section>
      <section class="marketSection">
        <header><h2>${esc(copy.education)}</h2><p>${esc(copy.educationSub)}</p></header>
        <div class="marketCourseGrid">
          <article class="marketCourse featured"><span>📈</span><div><h3>${esc(copy.ownCourse)}</h3><p>${esc(copy.ownCourseText)}</p><button data-own-course>${esc(copy.openCourse)}</button></div></article>
          <article class="marketCourse"><span>▶️</span><div><h3>${esc(copy.video)}</h3><p>${esc(copy.videoText)}</p><button data-url="${VIDEO_COURSE}">${esc(copy.watch)}</button></div></article>
          ${COURSES.map((course) => `<article class="marketCourse"><span>${course.icon}</span><div><h3>${esc(course.name)}</h3><p>${esc(copy[course.key])}</p><button data-url="${esc(course.url)}">${esc(copy.study)}</button>${course.affiliateUrl ? `<button data-url="${esc(course.affiliateUrl)}">${esc(copy.binanceWeb3)}</button>` : ""}</div></article>`).join("")}
        </div>
      </section>
      <section class="marketSection">
        <header><h2>${esc(copy.partners)}</h2><p>${esc(copy.partnersSub)}</p></header>
        <div class="marketPartnerGrid">
          <article class="marketPartner tradingview"><span>TV</span><div><h3>${esc(copy.tradingView)}</h3><p>${esc(copy.tradingViewText)}</p><div><button data-url="${TRADINGVIEW_AFFILIATE}">${esc(copy.tradingView)}</button><button class="secondary" data-url="${TRADINGVIEW_PRICING}">${esc(copy.plans)}</button></div></div></article>
          <article class="marketPartner exness"><span>↗</span><div><h3>${esc(copy.exness)}</h3><p>${esc(copy.exnessText)}</p><button data-url="${EXNESS_AFFILIATE}">${esc(copy.register)}</button></div></article>
        </div>
      </section>
    </div>`;

    document.getElementById("marketBack").onclick = () => {
      document.body.classList.remove("marketExpandedOpen");
      options.back?.();
    };
    document.getElementById("marketExpand").onclick = toggleExpand;
    document.querySelectorAll("[data-market-widget]").forEach((button) => {
      button.onclick = () => loadWidget(button.dataset.marketWidget);
    });
    document.querySelectorAll("[data-url]").forEach((button) => {
      button.onclick = () => open(button.dataset.url);
    });
    document.querySelector("[data-own-course]").onclick = () => options.openCourse?.("analise_tecnica_completa");

    loadWidget("chart");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  window.EduCashProMarkets = { render };
})();
