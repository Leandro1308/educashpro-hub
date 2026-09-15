(function () {
  "use strict";

  const TRADINGVIEW_AFFILIATE = "https://br.tradingview.com/?aff_id=170669";
  const TRADINGVIEW_PRICING = "https://br.tradingview.com/pricing/?aff_id=170669";
  const EXNESS_AFFILIATE = "https://one.exnessonelink.com/a/93bgo7jpfo/?campaign=43340";
  const VIDEO_COURSE = "https://t.me/boost?c=3706880680";
  const BINANCE_MARKET_DATA = "https://data-api.binance.vision/api/v3/klines";
  const BINANCE_24H_DATA = "https://data-api.binance.vision/api/v3/ticker/24hr";
  const DIRECTION_CACHE_MS = 45000;
  const MARKET_STATE_KEY = "educashpro:market-selection:v1";
  const RESTRICTED = new Set(["chart", "technical", "pairs"]);
  const TIMEFRAMES = [
    { id: "1m", label: "1m", chart: "1", technical: "1m", market: "1m", aggregate: 1 },
    { id: "2m", label: "2m", chart: "2", technical: "2m", market: "1m", aggregate: 2 },
    { id: "3m", label: "3m", chart: "3", technical: "3m", market: "3m", aggregate: 1 },
    { id: "5m", label: "5m", chart: "5", technical: "5m", market: "5m", aggregate: 1 },
    { id: "10m", label: "10m", chart: "10", technical: "10m", market: "5m", aggregate: 2 },
    { id: "15m", label: "15m", chart: "15", technical: "15m", market: "15m", aggregate: 1 },
    { id: "30m", label: "30m", chart: "30", technical: "30m", market: "30m", aggregate: 1 },
    { id: "1h", label: "1h", chart: "60", technical: "1h", market: "1h", aggregate: 1 },
    { id: "2h", label: "2h", chart: "120", technical: "2h", market: "2h", aggregate: 1 },
    { id: "4h", label: "4h", chart: "240", technical: "4h", market: "4h", aggregate: 1 },
    { id: "1D", label: "D", chart: "D", technical: "1D", market: "1d", aggregate: 1 }
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
      pairs: "Pares Binance",
      pairsTitle: "Tendências dos principais pares USDT",
      pairsHelp: "Classificação calculada no período selecionado. Toque em um par para abri-lo no gráfico e no resumo.",
      sideways: "Lateralidade",
      noSideways: "Nenhum par lateral neste período.",
      pairsLoading: "Carregando os principais pares por volume e calculando tendências…",
      timeframe: "Período da análise",
      daily: "Diário",
      searchAsset: "Abrir qualquer ativo",
      searchPlaceholder: "Ex.: AVAXUSDT ou NASDAQ:AAPL",
      openAsset: "Abrir",
      searchHelp: "Este ativo será usado no gráfico e no resumo técnico, mesmo que não apareça na seleção de alta ou baixa.",
      fibTitle: "Rompeu? Fibo nela!",
      fibLoading: "Procurando rompimentos confirmados e calculando Fibonacci…",
      fibUnavailable: "A leitura automática de Fibonacci está disponível para pares da Binance.",
      fibNone: "Nenhum rompimento confirmado do canal nos 12 candles mais recentes.",
      fibBullish: "Rompimento de alta",
      fibBearish: "Rompimento de baixa",
      fibImpulse: "Impulso",
      fibCurrent: "Preço atual",
      fibInvalidation: "Invalidação",
      fibVolume: "Volume no rompimento",
      fibConfirmed: "Confirmado",
      fibModerate: "Sem expansão",
      fibLevels: "Retrações e extensões",
      fibEducational: "Leitura técnica educacional. Os níveis se ajustam ao ativo e período selecionados.",
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
      pairs: "Binance pairs", pairsTitle: "Trends for leading USDT pairs", pairsHelp: "Classification calculated for the selected timeframe. Tap a pair to open it in the chart and summary.", sideways: "Sideways", noSideways: "No sideways pair in this timeframe.", pairsLoading: "Loading leading pairs by volume and calculating trends…",
      timeframe: "Analysis timeframe",
      daily: "Daily",
      searchAsset: "Open any asset",
      searchPlaceholder: "E.g. AVAXUSDT or NASDAQ:AAPL",
      openAsset: "Open",
      searchHelp: "This asset will be used in both the chart and technical summary, even when it is not listed as trending up or down.",
      fibTitle: "Breakout? Apply Fibonacci!", fibLoading: "Scanning confirmed breakouts and calculating Fibonacci…", fibUnavailable: "Automatic Fibonacci analysis is available for Binance pairs.", fibNone: "No confirmed channel breakout in the latest 12 candles.", fibBullish: "Bullish breakout", fibBearish: "Bearish breakout", fibImpulse: "Impulse", fibCurrent: "Current price", fibInvalidation: "Invalidation", fibVolume: "Breakout volume", fibConfirmed: "Confirmed", fibModerate: "No expansion", fibLevels: "Retracements and extensions", fibEducational: "Educational technical reading. Levels adapt to the selected asset and timeframe.",
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
      pairs: "Pares Binance", pairsTitle: "Tendencias de los principales pares USDT", pairsHelp: "Clasificación calculada en el período seleccionado. Toca un par para abrirlo en el gráfico y el resumen.", sideways: "Lateralidad", noSideways: "No hay pares laterales en este período.", pairsLoading: "Cargando los principales pares por volumen y calculando tendencias…",
      timeframe: "Período del análisis",
      daily: "Diario",
      searchAsset: "Abrir cualquier activo",
      searchPlaceholder: "Ej.: AVAXUSDT o NASDAQ:AAPL",
      openAsset: "Abrir",
      searchHelp: "Este activo se utilizará en el gráfico y el resumen técnico, aunque no aparezca en la selección de alza o baja.",
      fibTitle: "¿Rompió? ¡Fibonacci!", fibLoading: "Buscando rupturas confirmadas y calculando Fibonacci…", fibUnavailable: "El análisis automático de Fibonacci está disponible para pares de Binance.", fibNone: "No hubo ruptura confirmada del canal en las últimas 12 velas.", fibBullish: "Ruptura alcista", fibBearish: "Ruptura bajista", fibImpulse: "Impulso", fibCurrent: "Precio actual", fibInvalidation: "Invalidación", fibVolume: "Volumen de ruptura", fibConfirmed: "Confirmado", fibModerate: "Sin expansión", fibLevels: "Retrocesos y extensiones", fibEducational: "Lectura técnica educativa. Los niveles se adaptan al activo y período seleccionados.",
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
      pairs: "Пары Binance", pairsTitle: "Тренды ведущих пар USDT", pairsHelp: "Классификация рассчитана для выбранного периода. Нажмите пару, чтобы открыть её на графике и в сводке.", sideways: "Боковой рынок", noSideways: "На этом периоде боковых пар нет.", pairsLoading: "Загрузка ведущих пар по объёму и расчёт трендов…",
      timeframe: "Период анализа",
      daily: "День",
      searchAsset: "Открыть любой актив",
      searchPlaceholder: "Напр.: AVAXUSDT или NASDAQ:AAPL",
      openAsset: "Открыть",
      searchHelp: "Этот актив будет использоваться на графике и в технической сводке, даже если его нет в списке роста или снижения.",
      fibTitle: "Пробой? Фибоначчи!", fibLoading: "Поиск подтверждённых пробоев и расчёт Фибоначчи…", fibUnavailable: "Автоматический анализ Фибоначчи доступен для пар Binance.", fibNone: "За последние 12 свечей подтверждённого пробоя канала нет.", fibBullish: "Пробой вверх", fibBearish: "Пробой вниз", fibImpulse: "Импульс", fibCurrent: "Текущая цена", fibInvalidation: "Отмена", fibVolume: "Объём пробоя", fibConfirmed: "Подтверждено", fibModerate: "Без роста", fibLevels: "Коррекции и расширения", fibEducational: "Учебный технический анализ. Уровни адаптируются к активу и периоду.",
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
        allow_symbol_change: false,
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
  let fibonacciRequestId = 0;
  let pairsRequestId = 0;
  const pairsCache = new Map();

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
      .marketSymbolPicker{display:grid;gap:8px;margin:0 0 12px;padding:12px;border:1px solid rgba(255,255,255,.09);border-radius:14px;background:#0a1728}.marketSymbolPicker>strong{font-size:12px;color:#f7fbff}.marketSymbolForm{display:grid;grid-template-columns:minmax(0,1fr) auto;gap:8px}.marketSymbolForm input{min-width:0;height:42px;padding:0 12px;border:1px solid rgba(255,255,255,.13);border-radius:10px;color:#f7fbff;background:#071322;font:700 13px inherit;text-transform:uppercase}.marketSymbolForm button{min-height:42px;padding:8px 14px;border:0;border-radius:10px;color:#071322;background:#30e6a6;font-size:12px;font-weight:950}.marketSymbolPicker small{color:#9db0c6;font-size:10px;line-height:1.45}
      .marketFibPanel{display:grid;gap:10px;margin:0 0 12px;padding:13px;border:1px solid rgba(255,200,92,.24);border-radius:15px;background:linear-gradient(145deg,#0a1728,#0b1421)}.marketFibHead{display:flex;align-items:center;justify-content:space-between;gap:8px}.marketFibHead strong{color:#ffc85c;font-size:14px}.marketFibHead span{color:#9db0c6;font-size:10px}.marketFibStatus{color:#b8c8da;font-size:11px;line-height:1.5}.marketFibMetrics{display:grid;grid-template-columns:repeat(2,1fr);gap:7px}.marketFibMetrics article,.marketFibLevels article{padding:8px;border:1px solid rgba(255,255,255,.07);border-radius:10px;background:#071322}.marketFibMetrics small,.marketFibLevels small{display:block;color:#9db0c6;font-size:9px}.marketFibMetrics b,.marketFibLevels b{display:block;margin-top:3px;color:#f7fbff;font-size:11px}.marketFibLevels{display:grid;grid-template-columns:repeat(3,1fr);gap:7px}.marketFibPanel.positive .marketFibHead strong{color:#30e6a6}.marketFibPanel.negative .marketFibHead strong{color:#ff7d89}.marketFibFoot{color:#7f93aa;font-size:9px;line-height:1.4}
      .marketPairsIntro{margin:0 0 12px;padding:12px;border:1px solid rgba(255,255,255,.08);border-radius:13px;background:#0a1728}.marketPairsIntro strong{display:block;font-size:14px}.marketPairsIntro small{display:block;margin-top:5px;color:#9db0c6;font-size:10px;line-height:1.45}.marketPairsGrid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:9px}.marketPairGroup{min-width:0;padding:10px;border:1px solid rgba(255,255,255,.07);border-radius:13px;background:#0d1b2d}.marketPairGroup h3{display:flex;justify-content:space-between;gap:8px;margin:0 0 9px;font-size:12px}.marketPairGroup.up h3{color:#30e6a6}.marketPairGroup.down h3{color:#ff7d89}.marketPairGroup.sideways h3{color:#ffc85c}.marketPairList{display:grid;gap:6px}.marketPairList button{min-height:36px;padding:7px 8px;border:1px solid rgba(255,255,255,.08);border-radius:9px;color:#f7fbff;background:#071322;font-size:10px;font-weight:850;text-align:left}.marketPairList button small{float:right;color:#9db0c6}.marketPairEmpty{color:#9db0c6;font-size:10px;line-height:1.4}
      .marketAnalysisSection.expanded .marketWidget{overflow:auto}.marketAnalysisSection.expanded .marketChartFrame{height:calc(100dvh - 315px);min-height:430px}.marketAnalysisSection.expanded .marketTechnicalFrame{height:calc(100dvh - 190px);min-height:430px}
      @media(max-width:560px){.marketDirectionColumns,.marketPairsGrid{grid-template-columns:1fr}.marketInstantMeter{grid-template-columns:repeat(2,1fr)}.marketChartFrame{height:68vh;min-height:500px}}
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
        saveMarketState();
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

  function saveMarketState() {
    try { sessionStorage.setItem(MARKET_STATE_KEY, JSON.stringify({ selectedAsset, selectedTimeframe })); } catch {}
  }

  function restoreMarketState() {
    try {
      const saved = JSON.parse(sessionStorage.getItem(MARKET_STATE_KEY) || "null");
      if (saved?.selectedAsset?.tv && saved?.selectedAsset?.label) selectedAsset = saved.selectedAsset;
      if (TIMEFRAMES.some((item) => item.id === saved?.selectedTimeframe)) selectedTimeframe = saved.selectedTimeframe;
    } catch {}
  }

  function normalizeTradingViewSymbol(value) {
    const raw = String(value || "").trim().toUpperCase().replace(/\s+/g, "");
    if (!raw) return null;
    if (raw.includes(":")) {
      const [exchange, ...parts] = raw.split(":");
      const symbol = parts.join(":").replace(/[\/-]/g, "");
      if (!exchange || !symbol) return null;
      return { api: exchange === "BINANCE" ? symbol : null, tv: `${exchange}:${symbol}`, label: symbol };
    }
    const symbol = raw.replace(/[\/-]/g, "");
    if (!symbol) return null;
    const metals = new Set(["XAUUSD", "XAGUSD"]);
    const forex = /^(EUR|GBP|USD|JPY|AUD|NZD|CAD|CHF)(EUR|GBP|USD|JPY|AUD|NZD|CAD|CHF)$/.test(symbol);
    const exchange = metals.has(symbol) ? "OANDA" : forex ? "FX" : "BINANCE";
    return { api: exchange === "BINANCE" ? symbol : null, tv: `${exchange}:${symbol}`, label: symbol };
  }

  function aggregateCandles(rows, factor) {
    const source = rows.map((row) => ({ time: Number(row[0]), open: Number(row[1]), high: Number(row[2]), low: Number(row[3]), close: Number(row[4]), volume: Number(row[5]) }));
    if (factor <= 1) return source;
    const result = [];
    for (let i = 0; i < source.length; i += factor) {
      const group = source.slice(i, i + factor);
      if (group.length < factor) continue;
      result.push({ time: group[0].time, open: group[0].open, high: Math.max(...group.map((c) => c.high)), low: Math.min(...group.map((c) => c.low)), close: group[group.length - 1].close, volume: group.reduce((sum, c) => sum + c.volume, 0) });
    }
    return result;
  }

  async function mapConcurrent(items, limit, mapper) {
    const results = new Array(items.length);
    let cursor = 0;
    async function worker() {
      while (cursor < items.length) {
        const index = cursor++;
        try { results[index] = await mapper(items[index]); } catch { results[index] = null; }
      }
    }
    await Promise.all(Array.from({ length: Math.min(limit, items.length) }, worker));
    return results.filter(Boolean);
  }

  async function leadingBinancePairs() {
    const response = await fetch(BINANCE_24H_DATA, { cache: "no-store" });
    if (!response.ok) throw new Error("pairs_market");
    const rows = await response.json();
    const excluded = new Set(["USDC", "FDUSD", "TUSD", "USDP", "DAI", "EUR", "TRY", "BRL"]);
    return (Array.isArray(rows) ? rows : [])
      .filter((row) => String(row.symbol || "").endsWith("USDT"))
      .map((row) => ({ symbol: String(row.symbol), base: String(row.symbol).slice(0, -4), volume: Number(row.quoteVolume || 0) }))
      .filter((row) => row.base && !excluded.has(row.base) && !/(UP|DOWN|BULL|BEAR)$/.test(row.base) && Number.isFinite(row.volume))
      .sort((a, b) => b.volume - a.volume)
      .slice(0, 36)
      .map((row) => ({ api: row.symbol, tv: `BINANCE:${row.symbol}`, label: `${row.base}/USDT` }));
  }

  async function pairDirectionAt(asset, timeframe) {
    const limit = Math.min(180, 60 * timeframe.aggregate);
    const response = await fetch(`${BINANCE_MARKET_DATA}?symbol=${encodeURIComponent(asset.api)}&interval=${encodeURIComponent(timeframe.market)}&limit=${limit}`, { cache: "no-store" });
    if (!response.ok) throw new Error("pair_direction");
    const rows = await response.json();
    const candles = aggregateCandles(rows, timeframe.aggregate);
    const normalized = candles.map((c) => [c.time, c.open, c.high, c.low, c.close, c.volume]);
    return readDirection(asset, normalized);
  }

  function pairList(items) {
    return items.map((item) => {
      const sign = item.bodyPct > 0 ? "+" : "";
      return `<button type="button" data-pair-asset="${esc(item.asset.api)}">${esc(item.asset.label)}<small>${sign}${item.bodyPct.toFixed(2)}%</small></button>`;
    }).join("");
  }

  function renderPairsResult(host, snapshot, copy) {
    const groups = [
      ["up", copy.up, snapshot.filter((item) => item.direction === "up"), copy.noUp],
      ["down", copy.down, snapshot.filter((item) => item.direction === "down"), copy.noDown],
      ["sideways", copy.sideways, snapshot.filter((item) => !item.direction), copy.noSideways]
    ];
    host.innerHTML = `${timeframeMarkup(copy)}<div class="marketPairsIntro"><strong>${esc(copy.pairsTitle)}</strong><small>${esc(copy.pairsHelp)}</small></div><div class="marketPairsGrid">${groups.map(([kind, title, items, empty]) => `<section class="marketPairGroup ${kind}"><h3><span>${kind === "up" ? "▲" : kind === "down" ? "▼" : "◆"} ${esc(title)}</span><span>${items.length}</span></h3><div class="marketPairList">${items.length ? pairList(items) : `<div class="marketPairEmpty">${esc(empty)}</div>`}</div></section>`).join("")}</div>`;
    bindTimeframes(host);
    host.querySelectorAll("[data-pair-asset]").forEach((button) => {
      button.onclick = () => {
        const reading = snapshot.find((item) => item.asset.api === button.dataset.pairAsset);
        if (!reading) return;
        selectedAsset = reading.asset;
        saveMarketState();
        loadWidget("chart");
      };
    });
  }

  async function loadPairs(force = false) {
    const host = document.getElementById("marketWidget");
    const copy = COPY[options.language] || COPY.pt;
    if (!host) return;
    if (!options.active) return lockedView("pairs");
    document.getElementById("marketExpand").hidden = false;
    const cacheKey = selectedTimeframe;
    const cached = pairsCache.get(cacheKey);
    if (!force && cached && Date.now() - cached.at < DIRECTION_CACHE_MS) {
      renderPairsResult(host, cached.items, copy);
      return;
    }
    host.style.height = "auto";
    host.innerHTML = `${timeframeMarkup(copy)}<div class="marketPairsIntro"><strong>${esc(copy.pairsTitle)}</strong><small>${esc(copy.pairsLoading)}</small></div>`;
    bindTimeframes(host);
    const requestId = ++pairsRequestId;
    try {
      const timeframe = TIMEFRAMES.find((item) => item.id === selectedTimeframe) || TIMEFRAMES[7];
      const assets = await leadingBinancePairs();
      const items = await mapConcurrent(assets, 6, (asset) => pairDirectionAt(asset, timeframe));
      if (requestId !== pairsRequestId || currentWidget !== "pairs") return;
      pairsCache.set(cacheKey, { at: Date.now(), items });
      renderPairsResult(host, items, copy);
    } catch {
      if (requestId === pairsRequestId && currentWidget === "pairs") host.innerHTML = `<div class="marketWidgetError">${esc(copy.error)}</div>`;
    }
  }

  function fibonacciBreakout(candles) {
    const lookback = 20;
    for (let i = candles.length - 1; i >= Math.max(lookback, candles.length - 12); i -= 1) {
      const channel = candles.slice(i - lookback, i);
      const candle = candles[i];
      const upper = Math.max(...channel.map((c) => c.high));
      const lower = Math.min(...channel.map((c) => c.low));
      const range = Math.max(0, candle.high - candle.low);
      const bodyShare = range ? Math.abs(candle.close - candle.open) / range : 0;
      const avgVolume = channel.reduce((sum, c) => sum + c.volume, 0) / channel.length;
      const direction = candle.close > upper ? "up" : candle.close < lower ? "down" : null;
      if (!direction || bodyShare < 0.25) continue;
      const after = candles.slice(i);
      const start = direction === "up" ? Math.min(...channel.map((c) => c.low)) : Math.max(...channel.map((c) => c.high));
      const end = direction === "up" ? Math.max(...after.map((c) => c.high)) : Math.min(...after.map((c) => c.low));
      const amplitude = Math.abs(end - start);
      if (!amplitude) continue;
      const value = (ratio) => direction === "up" ? end - amplitude * ratio : end + amplitude * ratio;
      return { direction, start, end, current: candles[candles.length - 1].close, invalidation: start, volumeConfirmed: candle.volume >= avgVolume * 1.1, levels: [["23,6%", value(.236)], ["38,2%", value(.382)], ["50%", value(.5)], ["61,8%", value(.618)], ["78,6%", value(.786)], ["127,2%", direction === "up" ? start + amplitude * 1.272 : start - amplitude * 1.272], ["161,8%", direction === "up" ? start + amplitude * 1.618 : start - amplitude * 1.618]] };
    }
    return null;
  }

  function price(value) {
    if (!Number.isFinite(value)) return "—";
    return value >= 1000 ? value.toLocaleString("en-US", { maximumFractionDigits: 2 }) : value >= 1 ? value.toFixed(4) : value.toPrecision(6);
  }

  function fibonacciMarkup(copy, result) {
    if (!result) return `<div class="marketFibStatus">${esc(copy.fibNone)}</div><div class="marketFibFoot">${esc(copy.fibEducational)}</div>`;
    const up = result.direction === "up";
    return `<div class="marketFibStatus"><b>${up ? "▲" : "▼"} ${esc(up ? copy.fibBullish : copy.fibBearish)}</b></div><div class="marketFibMetrics"><article><small>${esc(copy.fibImpulse)}</small><b>${price(result.start)} → ${price(result.end)}</b></article><article><small>${esc(copy.fibCurrent)}</small><b>${price(result.current)}</b></article><article><small>${esc(copy.fibInvalidation)}</small><b>${price(result.invalidation)}</b></article><article><small>${esc(copy.fibVolume)}</small><b>${esc(result.volumeConfirmed ? copy.fibConfirmed : copy.fibModerate)}</b></article></div><small>${esc(copy.fibLevels)}</small><div class="marketFibLevels">${result.levels.map(([label, value]) => `<article><small>${label}</small><b>${price(value)}</b></article>`).join("")}</div><div class="marketFibFoot">${esc(copy.fibEducational)}</div>`;
  }

  async function loadFibonacci(host) {
    const panel = host.querySelector("[data-market-fibonacci]");
    if (!panel) return;
    const copy = COPY[options.language] || COPY.pt;
    const asset = selectedAsset;
    if (!asset?.api || !String(asset.tv).startsWith("BINANCE:")) {
      panel.innerHTML = `<div class="marketFibHead"><strong>ϕ ${esc(copy.fibTitle)}</strong><span>${esc(selectedTimeframe)}</span></div><div class="marketFibStatus">${esc(copy.fibUnavailable)}</div>`;
      return;
    }
    const requestId = ++fibonacciRequestId;
    const timeframe = TIMEFRAMES.find((item) => item.id === selectedTimeframe) || TIMEFRAMES[7];
    panel.innerHTML = `<div class="marketFibHead"><strong>ϕ ${esc(copy.fibTitle)}</strong><span>${esc(asset.label)} · ${esc(selectedTimeframe)}</span></div><div class="marketFibStatus">${esc(copy.fibLoading)}</div>`;
    try {
      const limit = Math.min(500, 180 * timeframe.aggregate);
      const response = await fetch(`${BINANCE_MARKET_DATA}?symbol=${encodeURIComponent(asset.api)}&interval=${encodeURIComponent(timeframe.market)}&limit=${limit}`, { cache: "no-store" });
      if (!response.ok) throw new Error("fib_market");
      const rows = await response.json();
      const result = fibonacciBreakout(aggregateCandles(rows, timeframe.aggregate));
      if (requestId !== fibonacciRequestId || !panel.isConnected) return;
      panel.classList.toggle("positive", result?.direction === "up");
      panel.classList.toggle("negative", result?.direction === "down");
      panel.innerHTML = `<div class="marketFibHead"><strong>ϕ ${esc(copy.fibTitle)}</strong><span>${esc(asset.label)} · ${esc(selectedTimeframe)}</span></div>${fibonacciMarkup(copy, result)}`;
    } catch {
      if (requestId === fibonacciRequestId && panel.isConnected) panel.innerHTML = `<div class="marketFibHead"><strong>ϕ ${esc(copy.fibTitle)}</strong></div><div class="marketFibStatus">${esc(copy.error)}</div>`;
    }
  }

  function fibonacciPanelMarkup() {
    return `<section class="marketFibPanel" data-market-fibonacci></section>`;
  }

  function symbolPickerMarkup(copy) {
    return `<div class="marketSymbolPicker"><strong>⌕ ${esc(copy.searchAsset)}</strong><form class="marketSymbolForm" data-market-symbol-form><input name="symbol" value="${esc(selectedAsset?.label || "")}" placeholder="${esc(copy.searchPlaceholder)}" autocomplete="off" autocapitalize="characters" spellcheck="false"><button type="submit">${esc(copy.openAsset)}</button></form><small>${esc(copy.searchHelp)}</small></div>`;
  }

  function bindSymbolPicker(host) {
    const form = host.querySelector("[data-market-symbol-form]");
    if (!form) return;
    form.onsubmit = (event) => {
      event.preventDefault();
      const asset = normalizeTradingViewSymbol(new FormData(form).get("symbol"));
      if (!asset) return;
      selectedAsset = asset;
      saveMarketState();
      if (currentWidget === "technical") loadTechnical();
      else renderChart(directionSnapshot);
    };
  }

  function timeframeMarkup(copy) {
    return `<div class="marketTimeframePanel"><strong>${esc(copy.timeframe)}</strong><div class="marketTimeframes" role="group" aria-label="${esc(copy.timeframe)}">${TIMEFRAMES.map((item) => `<button type="button" data-timeframe="${item.id}" class="${item.id === selectedTimeframe ? "active" : ""}">${item.id === "1D" ? esc(copy.daily) : item.label}</button>`).join("")}</div></div>`;
  }

  function bindTimeframes(host) {
    host.querySelectorAll("[data-timeframe]").forEach((button) => {
      button.onclick = () => {
        const scrollTop = window.scrollY;
        selectedTimeframe = button.dataset.timeframe;
        saveMarketState();
        if (currentWidget === "technical") loadTechnical();
        else if (currentWidget === "pairs") loadPairs(false);
        else renderChart(directionSnapshot);
        window.requestAnimationFrame(() => window.requestAnimationFrame(() => window.scrollTo({ top: scrollTop, behavior: "auto" })));
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
    host.insertAdjacentHTML("beforeend", symbolPickerMarkup(copy));
    host.insertAdjacentHTML("beforeend", timeframeMarkup(copy));
    host.insertAdjacentHTML("beforeend", fibonacciPanelMarkup());
    host.appendChild(tradingViewContainer("marketChartFrame", WIDGETS.chart, selectedAsset?.tv || WIDGETS.chart.config.symbol));
    bindScanner(host, snapshot);
    bindSymbolPicker(host);
    bindTimeframes(host);
    loadFibonacci(host);
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
      if (!selectedAsset) selectedAsset = directional[0]?.asset || DIRECTION_SYMBOLS[0];
      saveMarketState();
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
    host.innerHTML = `<div class="marketDirectionPanel"><div class="marketDirectionTop"><strong>${esc(copy.selected)}: ${esc(selectedAsset?.label || "XAU/USD")}</strong></div><div class="marketDirectionStatus">${esc(copy.toolsSub)}</div></div>${symbolPickerMarkup(copy)}${timeframeMarkup(copy)}${fibonacciPanelMarkup()}`;
    host.appendChild(tradingViewContainer("marketTechnicalFrame", WIDGETS.technical, selectedAsset?.tv || WIDGETS.technical.config.symbol));
    bindSymbolPicker(host);
    bindTimeframes(host);
    loadFibonacci(host);
  }

  function loadWidget(kind) {
    const host = document.getElementById("marketWidget");
    if (!host) return;
    currentWidget = kind;
    document.querySelectorAll("[data-market-widget]").forEach((button) => button.classList.toggle("active", button.dataset.marketWidget === kind));
    if (RESTRICTED.has(kind) && !options.active) return lockedView(kind);
    if (kind === "technical") return loadTechnical();
    if (kind === "pairs") return loadPairs(false);
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
    window.__EDUCASHPRO_MARKETS_OPEN__ = true;
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
    restoreMarketState();
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
          <button data-market-widget="pairs">${options.active ? "" : "🔒 "}${esc(copy.pairs)}</button>
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
      window.__EDUCASHPRO_MARKETS_OPEN__ = false;
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
    document.querySelector("[data-own-course]").onclick = () => {
      window.__EDUCASHPRO_MARKETS_OPEN__ = false;
      options.openCourse?.("analise_tecnica_completa");
    };

    loadWidget("chart");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  window.EduCashProMarkets = { render };
})();
