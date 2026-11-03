(function () {
  "use strict";
  const SOURCE = window.EduCashProPriceActionData;
  const PAIRS = ["BTCUSDT", "ETHUSDT"];
  const PERIODS = ["15m", "1h"];
  const SAVE_KEY = "educashpro:price-action:v1";
  const FEE_RATE = 0.001;
  const SLIPPAGE = 0.0005;
  const START_BALANCE = 1000;
  const LOCALES = { pt: "pt-BR", en: "en-US", es: "es-ES", ru: "ru-RU" };
  const TEXT = {
    pt: {
      title: "Treinador de Price Action", desc: "Aprenda a ler o preço e pratique decisões com criptomoedas históricas reais.",
      learn: "Aprender", train: "Treinar", pair: "Criptomoeda", period: "Período", historical: "Dados históricos da Binance Spot · exercício offline",
      lesson: "Lição", of: "de", question: "Verifique seu entendimento", correct: "Muito bem!", incorrect: "Ainda não. Observe a explicação e tente novamente.",
      previous: "Anterior", next: "Próxima lição", completed: "Lições concluídas",
      buy: "Comprar", sell: "Vender", wait: "Aguardar", continue: "Revelar próximo candle", newChallenge: "Novo desafio",
      choose: "Escolha comprar, vender ou aguardar; o próximo candle ainda está oculto.",
      capital: "Patrimônio virtual", cash: "Saldo USDT", holdings: "Cripto em carteira", trades: "Operações", step: "Candle",
      simulation: "Simulação à vista (spot): você só pode vender moedas compradas. Sem operações alavancadas.",
      costs: "Custos simulados: 0,10% de taxa e 0,05% de deslizamento por ordem. Execução na abertura do candle seguinte.",
      selected: "Sua decisão", done: "Fim deste cenário. Reveja o resultado ou comece outro desafio.",
      bought: "Compra executada na abertura do novo candle.", sold: "Venda executada na abertura do novo candle.", waited: "Você aguardou o próximo candle.",
      needCoins: "Para vender, primeiro compre criptomoedas.", needFunds: "Saldo insuficiente para comprar.",
      nextTip: "Compare a decisão com a direção do novo candle. Uma única vela não prova que uma estratégia funciona.",
      lessonHint: "Identifique a estrutura antes de decidir. Uma formação isolada não garante resultado.",
      price: "Fechamento", support: "Suporte", resistance: "Resistência",
      chartDescription: "Gráfico de velas históricas", provider: "Fonte: Binance · amostra capturada em 27/10/2026 (UTC). Nenhuma operação financeira é realizada.",
      resetWarning: "Resultados simulados não representam desempenho futuro nem recomendação de investimento.",
      lessons: [
        {title:"Entenda os candles",body:"Cada candle mostra abertura, máxima, mínima e fechamento. O corpo mostra a diferença entre abertura e fechamento; os pavios representam os extremos.",question:"O que representa o pavio superior?",answers:["O preço máximo alcançado","O volume total negociado","Uma garantia de reversão"],correct:0,why:"O pavio superior vai até a máxima registrada naquele período."},
        {title:"Tendências e estrutura",body:"Observe a sequência de topos e fundos. Topos e fundos ascendentes sugerem força compradora; descendentes sugerem força vendedora. Um movimento nunca é garantido.",question:"O que sugere uma sequência de fundos ascendentes?",answers:["Queda garantida","Possível força dos compradores","Ausência de volatilidade"],correct:1,why:"Fundos ascendentes podem indicar que compradores aceitam preços progressivamente maiores."},
        {title:"Suporte e resistência",body:"Suporte é uma região na qual o preço reagiu para cima anteriormente; resistência é uma região de reação para baixo. São áreas aproximadas, não linhas mágicas.",question:"Um suporte pode ser rompido?",answers:["Sim, sempre existe risco","Não, se tocado duas vezes","Somente em gráficos diários"],correct:0,why:"Qualquer suporte pode falhar. Por isso é importante definir o risco."},
        {title:"Rompimentos e armadilhas",body:"Um rompimento ocorre quando o preço atravessa uma estrutura. Ele pode continuar ou falhar. Aguarde contexto e confirmação; não confunda um pavio isolado com uma mudança definitiva.",question:"O preço cruzou a resistência por um instante. O que fazer?",answers:["Comprar obrigatoriamente","Esperar uma confirmação adequada","Aumentar a posição sem limite"],correct:1,why:"Aguardar confirmação ajuda a evitar decisões baseadas em falsos rompimentos."},
        {title:"Entrada, saída e espera",body:"Antes de comprar, pense no motivo da entrada, na situação que invalidaria a ideia e em como sair. Aguardar também é uma decisão válida.",question:"Qual destas é uma decisão válida?",answers:["Aguardar quando não há sinal claro","Comprar em todas as velas verdes","Nunca realizar lucros"],correct:0,why:"Evitar operações sem fundamento pode preservar capital."},
        {title:"Custos e risco",body:"Taxas, deslizamento e oscilações afetam o resultado. Na simulação à vista, comprar usa o saldo disponível e vender encerra a posição. Sem alavancagem.",question:"Uma venda pelo mesmo preço da compra gera lucro?",answers:["Sim, sempre","Não, porque existem custos","Somente se for Bitcoin"],correct:1,why:"Taxas e deslizamento podem transformar uma operação sem variação de preço em prejuízo."}
      ]
    },
    en: {
      title:"Price Action Trainer",desc:"Learn to read prices and practice decisions using real historical cryptocurrency candles.",
      learn:"Learn",train:"Practice",pair:"Crypto asset",period:"Interval",historical:"Binance Spot historical candles · offline exercise",
      lesson:"Lesson",of:"of",question:"Check your understanding",correct:"Well done!",incorrect:"Not quite. Review the explanation and try again.",
      previous:"Previous",next:"Next lesson",completed:"Lessons completed",buy:"Buy",sell:"Sell",wait:"Wait",continue:"Reveal next candle",newChallenge:"New challenge",
      choose:"Choose buy, sell or wait; the next candle remains hidden.",capital:"Virtual equity",cash:"USDT balance",holdings:"Crypto holdings",trades:"Trades",step:"Candle",
      simulation:"Spot simulation: you can only sell coins you have purchased. No leverage.",
      costs:"Simulated costs: 0.10% fee and 0.05% slippage per order. Filled at the next candle's open.",
      selected:"Your decision",done:"This scenario is over. Review your result or start another challenge.",
      bought:"Buy executed at the next candle's open.",sold:"Sell executed at the next candle's open.",waited:"You waited for the next candle.",
      needCoins:"Buy crypto before selling.",needFunds:"Not enough funds to buy.",nextTip:"Compare the choice with the new candle. One candle does not validate a trading strategy.",
      lessonHint:"Read market structure before making decisions. No pattern guarantees a result.",
      price:"Close",support:"Support",resistance:"Resistance",chartDescription:"Historical candlestick chart",
      provider:"Source: Binance · snapshot captured Oct 27, 2026 (UTC). No real orders are placed.",
      resetWarning:"Simulated performance does not predict future results or constitute investment advice.",
      lessons:[
        {title:"Understand candles",body:"Each candle shows open, high, low and close. The body spans the open and close; the wicks mark the highest and lowest prices.",question:"What does the upper wick reach?",answers:["The highest price","Total volume","A guaranteed reversal"],correct:0,why:"The top of the upper wick indicates the period's high."},
        {title:"Trends and structure",body:"Watch the sequence of highs and lows. Higher highs and lows can suggest buying strength; lower ones may suggest selling pressure. Nothing is guaranteed.",question:"What can higher lows suggest?",answers:["A guaranteed fall","Potential buyer strength","No volatility"],correct:1,why:"Higher lows suggest buyers are willing to transact at progressively higher levels."},
        {title:"Support and resistance",body:"Support is an area where price previously bounced up; resistance is an area where it previously turned down. These are approximate zones.",question:"Can support break?",answers:["Yes, there is always risk","No, after two touches","Only on daily charts"],correct:0,why:"Any support can fail. Always consider risk."},
        {title:"Breakouts and traps",body:"A breakout crosses a price structure, but may continue or fail. Look for confirmation instead of assuming any wick is a lasting breakout.",question:"Price briefly crossed resistance. Now what?",answers:["Always buy","Wait for adequate confirmation","Increase position without limit"],correct:1,why:"Waiting for confirmation can reduce decisions based on false breakouts."},
        {title:"Entry, exit and patience",body:"Before buying, define why you would enter, what invalidates the idea and how you would exit. Waiting is a valid decision.",question:"Which decision can be sensible?",answers:["Wait without a clear setup","Buy every green candle","Never take profits"],correct:0,why:"Avoiding unsupported trades can help preserve capital."},
        {title:"Costs and risk",body:"Fees, slippage and price swings all affect returns. In the spot simulation you buy with available funds and sell your holdings. No leverage.",question:"If you sell at the buy price, do you profit?",answers:["Always","No, trading costs apply","Only with Bitcoin"],correct:1,why:"Fees and slippage may cause a loss even when the quote did not move."}
      ]
    },
    es: {
      title:"Entrenador de Price Action",desc:"Aprende a interpretar precios y practica decisiones con velas históricas reales de criptomonedas.",
      learn:"Aprender",train:"Practicar",pair:"Criptomoneda",period:"Intervalo",historical:"Velas históricas Binance Spot · ejercicio sin conexión",
      lesson:"Lección",of:"de",question:"Comprueba lo aprendido",correct:"¡Muy bien!",incorrect:"Aún no. Revisa la explicación e inténtalo de nuevo.",
      previous:"Anterior",next:"Siguiente lección",completed:"Lecciones completadas",buy:"Comprar",sell:"Vender",wait:"Esperar",continue:"Revelar siguiente vela",newChallenge:"Nuevo desafío",
      choose:"Elige comprar, vender o esperar; la siguiente vela está oculta.",capital:"Patrimonio virtual",cash:"Saldo USDT",holdings:"Cripto en cartera",trades:"Operaciones",step:"Vela",
      simulation:"Simulación al contado: solo puedes vender monedas compradas. Sin apalancamiento.",
      costs:"Costos simulados: comisión del 0,10% y deslizamiento del 0,05% por orden. Ejecución en la apertura de la siguiente vela.",
      selected:"Tu decisión",done:"El escenario terminó. Revisa el resultado o inicia otro desafío.",
      bought:"Compra ejecutada en la siguiente apertura.",sold:"Venta ejecutada en la siguiente apertura.",waited:"Esperaste la siguiente vela.",
      needCoins:"Compra criptomonedas antes de vender.",needFunds:"Saldo insuficiente.",
      nextTip:"Compara tu decisión con la nueva vela. Una vela no valida una estrategia.",
      lessonHint:"Analiza la estructura antes de decidir. Ningún patrón garantiza resultados.",
      price:"Cierre",support:"Soporte",resistance:"Resistencia",chartDescription:"Gráfico de velas históricas",
      provider:"Fuente: Binance · muestra del 27/10/2026 (UTC). No se realizan operaciones reales.",
      resetWarning:"Los resultados simulados no predicen resultados futuros ni son asesoramiento financiero.",
      lessons:[
        {title:"Entender las velas",body:"Cada vela contiene apertura, máximo, mínimo y cierre. El cuerpo une apertura y cierre; las mechas muestran los extremos.",question:"¿Qué representa la mecha superior?",answers:["El precio máximo","El volumen total","Una reversión garantizada"],correct:0,why:"La punta superior de la mecha representa el máximo del período."},
        {title:"Tendencias y estructura",body:"Observa máximos y mínimos. Si ambos ascienden puede haber fuerza compradora; si bajan puede haber presión vendedora.",question:"¿Qué pueden indicar mínimos ascendentes?",answers:["Caída segura","Posible fuerza compradora","Ausencia de volatilidad"],correct:1,why:"Los compradores pueden estar aceptando precios cada vez más altos."},
        {title:"Soporte y resistencia",body:"Soporte es una zona donde el precio rebotó antes; resistencia es una zona donde antes cayó. Son regiones aproximadas.",question:"¿Puede romperse un soporte?",answers:["Sí, siempre existe riesgo","No, tras dos toques","Solo en gráficos diarios"],correct:0,why:"Todo soporte puede fallar: considera siempre el riesgo."},
        {title:"Rupturas y trampas",body:"Una ruptura atraviesa una estructura, pero también puede fallar. Busca confirmación antes de actuar por una mecha aislada.",question:"El precio superó brevemente la resistencia. ¿Qué hacer?",answers:["Comprar siempre","Esperar confirmación","Aumentar sin límite"],correct:1,why:"La confirmación ayuda a evitar trampas y rupturas falsas."},
        {title:"Entrada, salida y espera",body:"Antes de comprar, define el motivo, qué invalidaría la idea y cómo salir. Esperar también es válido.",question:"¿Qué decisión puede ser sensata?",answers:["Esperar sin señal clara","Comprar cada vela verde","Nunca tomar ganancias"],correct:0,why:"Evitar operaciones sin fundamento puede proteger el capital."},
        {title:"Costos y riesgo",body:"Comisiones, deslizamiento y oscilaciones afectan los resultados. La simulación es al contado y sin apalancamiento.",question:"¿Vender al mismo precio de compra da beneficio?",answers:["Siempre","No, hay costos","Solo con Bitcoin"],correct:1,why:"Las comisiones y el deslizamiento pueden generar pérdidas sin cambios de precio."}
      ]
    },
    ru: {
      title:"Тренажёр Price Action",desc:"Изучайте движения цены и тренируйтесь на реальных исторических свечах криптовалют.",
      learn:"Учиться",train:"Тренироваться",pair:"Криптовалюта",period:"Интервал",historical:"Исторические свечи Binance Spot · офлайн-упражнение",
      lesson:"Урок",of:"из",question:"Проверьте знания",correct:"Отлично!",incorrect:"Пока нет. Прочитайте объяснение и попробуйте снова.",
      previous:"Назад",next:"Следующий урок",completed:"Завершено уроков",buy:"Купить",sell:"Продать",wait:"Ждать",continue:"Показать следующую свечу",newChallenge:"Новое задание",
      choose:"Выберите покупку, продажу или ожидание. Следующая свеча скрыта.",capital:"Виртуальный капитал",cash:"Баланс USDT",holdings:"Криптоактивы",trades:"Сделки",step:"Свеча",
      simulation:"Спотовая симуляция: продавать можно только купленные монеты. Без кредитного плеча.",
      costs:"Условные расходы: комиссия 0,10% и проскальзывание 0,05% на сделку. Исполнение по открытию следующей свечи.",
      selected:"Ваш выбор",done:"Сценарий завершён. Изучите результат или начните новое задание.",
      bought:"Покупка выполнена на открытии следующей свечи.",sold:"Продажа выполнена на открытии следующей свечи.",waited:"Вы дождались следующей свечи.",
      needCoins:"Сначала купите криптовалюту.",needFunds:"Недостаточно средств.",
      nextTip:"Сравните решение с новой свечой. Одна свеча не доказывает эффективность стратегии.",
      lessonHint:"Сначала изучите структуру рынка. Ни один паттерн не гарантирует результат.",
      price:"Закрытие",support:"Поддержка",resistance:"Сопротивление",chartDescription:"График исторических свечей",
      provider:"Источник: Binance · снимок 27.10.2026 (UTC). Реальные сделки не совершаются.",
      resetWarning:"Результаты симуляции не предсказывают будущую доходность и не являются инвестиционной рекомендацией.",
      lessons:[
        {title:"Строение свечи",body:"Каждая свеча показывает открытие, максимум, минимум и закрытие. Тело — диапазон от открытия до закрытия; тени — ценовые экстремумы.",question:"Что показывает верхняя тень?",answers:["Максимальную цену","Общий объём","Гарантированный разворот"],correct:0,why:"Конец верхней тени соответствует максимуму периода."},
        {title:"Тренды и структура",body:"Следите за максимумами и минимумами. Их рост может говорить о силе покупателей; снижение — о давлении продавцов.",question:"Что могут означать растущие минимумы?",answers:["Гарантированное падение","Возможную силу покупателей","Отсутствие волатильности"],correct:1,why:"Покупатели могут соглашаться на всё более высокие цены."},
        {title:"Поддержка и сопротивление",body:"Поддержка — область прежних отскоков вверх, сопротивление — область прежних разворотов вниз. Это зоны, а не точные линии.",question:"Может ли поддержка пробиться?",answers:["Да, риск есть всегда","Нет, после двух касаний","Только на дневном графике"],correct:0,why:"Любая поддержка может не удержаться. Учитывайте риск."},
        {title:"Пробои и ловушки",body:"Пробой структуры может продолжиться или оказаться ложным. Не делайте вывод по одной тени без подтверждения.",question:"Цена ненадолго превысила сопротивление. Что делать?",answers:["Всегда покупать","Ждать подтверждения","Увеличивать позицию без лимита"],correct:1,why:"Подтверждение помогает избежать ложных пробоев."},
        {title:"Вход, выход, ожидание",body:"Перед покупкой продумайте причину входа, условия отмены идеи и выход. Ожидание — тоже решение.",question:"Какое решение допустимо?",answers:["Ждать без ясного сигнала","Покупать все зелёные свечи","Никогда не фиксировать прибыль"],correct:0,why:"Отказ от необоснованных сделок помогает сохранять капитал."},
        {title:"Издержки и риск",body:"Комиссии, проскальзывание и колебания влияют на прибыль. В симуляции нет кредитного плеча.",question:"Будет ли прибыль при продаже по цене покупки?",answers:["Всегда","Нет, есть издержки","Только с биткоином"],correct:1,why:"Комиссии и проскальзывание способны вызвать убыток даже без движения цены."}
      ]
    }
  };
  const state = {
    language:"pt",mode:"learn",pair:"BTCUSDT",period:"15m",lesson:0,answer:null,showGuide:true,
    index:120,endIndex:144,choice:"wait",cash:START_BALANCE,qty:0,tradeCount:0,steps:0,feedback:"",sessions:0
  };
  let host = null;
  function readStore() {
    try { const data = JSON.parse(localStorage.getItem(SAVE_KEY) || "{}"); return data && typeof data === "object" ? data : {}; }
    catch (_) { return {}; }
  }
  function store(partial) {
    try { localStorage.setItem(SAVE_KEY, JSON.stringify(Object.assign(readStore(), partial))); }
    catch (_) {}
  }
  function t() { return TEXT[state.language] || TEXT.pt; }
  function fmt(n, digits) {
    return new Intl.NumberFormat(LOCALES[state.language], {minimumFractionDigits:digits || 0,maximumFractionDigits:digits === undefined ? 2 : digits}).format(Number(n));
  }
  function escapeHtml(value) {
    return String(value).replace(/[&<>"']/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
  }
  function bars() {
    return SOURCE && SOURCE.pairs ? SOURCE.pairs[state.pair + "_" + state.period] : null;
  }
  function courseLessons() {
    const course=window.EDUCASHPRO_TECHNICAL_ANALYSIS_COURSE;
    if(course && typeof course.getTrainerLessons==="function") {
      const lessons=course.getTrainerLessons(state.language);
      if(Array.isArray(lessons) && lessons.length) return lessons;
    }
    return t().lessons;
  }
  function activeLesson() {
    const lessons=courseLessons();
    state.lesson=Math.min(Math.max(state.lesson,0),lessons.length-1);
    return lessons[state.lesson];
  }
  function guideText() {
    return ({
      pt:{choose:"Escolha o conceito",key:"O que observar",confirm:"O que confirma",error:"Erro comum",example:"Exemplo prático",
          illustration:"Figura esquemática do curso",figureHelp:"Figura ilustrativa: não representa a amostra histórica da Binance.",
          mark:"Mostrar marcações no gráfico",historicalNote:"Candles reais da Binance. Marcações didáticas não identificam nem confirmam automaticamente a figura.",
          question:"Qual evidência fortalece esta leitura?",noGuarantee:"O nome da figura, sozinho, garante o resultado.",
          gold:"Esta lição explica o ouro (XAUUSD), mas o gráfico histórico disponível é BTC/USDT ou ETH/USDT. Não são dados do ouro.",
          frames:"O curso usa 1H, 5M e 1M; aqui os históricos disponíveis são 1H e 15m. Não confunda as escalas."},
      en:{choose:"Choose a concept",key:"What to look for",confirm:"What confirms it",error:"Common mistake",example:"Practical example",
          illustration:"Course schematic",figureHelp:"Illustration only: these are not the actual Binance candles.",
          mark:"Show chart annotations",historicalNote:"Real Binance candles. Teaching guides neither detect nor confirm the complete pattern automatically.",
          question:"Which evidence strengthens this reading?",noGuarantee:"The pattern name alone guarantees the result.",
          gold:"This topic covers gold (XAUUSD); the available historical chart displays BTC/USDT or ETH/USDT, not gold.",
          frames:"The course uses 1H, 5M and 1M; this trainer has historical 1H and 15m only."},
      es:{choose:"Elige un concepto",key:"Qué observar",confirm:"Qué confirma",error:"Error común",example:"Ejemplo práctico",
          illustration:"Esquema del curso",figureHelp:"Ilustración: no representa las velas históricas de Binance.",
          mark:"Mostrar anotaciones",historicalNote:"Velas reales de Binance. Las marcas educativas no confirman automáticamente un patrón.",
          question:"¿Qué evidencia fortalece esta lectura?",noGuarantee:"El nombre del patrón garantiza por sí solo el resultado.",
          gold:"Este tema trata del oro (XAUUSD); el gráfico disponible es BTC/USDT o ETH/USDT, no oro.",
          frames:"El curso usa 1H, 5M y 1M; aquí solo están disponibles 1H y 15m."},
      ru:{choose:"Выберите тему",key:"На что смотреть",confirm:"Подтверждение",error:"Типичная ошибка",example:"Пример",
          illustration:"Схема из курса",figureHelp:"Это схема, а не реальные свечи Binance.",
          mark:"Показать разметку",historicalNote:"Реальные свечи Binance. Учебная разметка сама по себе не подтверждает фигуру.",
          question:"Что подтверждает такую интерпретацию?",noGuarantee:"Одно название фигуры гарантирует результат.",
          gold:"Тема об XAUUSD, но доступный график показывает BTC/USDT или ETH/USDT, не золото.",
          frames:"В курсе используются 1H, 5M и 1M; здесь доступны лишь 1H и 15m."}
    })[state.language] || guideTextForPt();
  }
  function guideTextForPt() {
    return {choose:"Escolha o conceito",key:"O que observar",confirm:"O que confirma",error:"Erro comum",
      example:"Exemplo prático",illustration:"Figura esquemática do curso",figureHelp:"Figura ilustrativa.",
      mark:"Mostrar marcações",historicalNote:"Candles históricos reais.",question:"O que confirma?",noGuarantee:"O nome da figura garante o resultado.",
      gold:"Este gráfico mostra criptomoedas, não ouro.",frames:"Aqui os períodos são 1H e 15m."};
  }
  function completed() {
    const lessons=courseLessons();
    if(lessons.length===t().lessons.length) {
      const legacy=readStore().completed;
      return Array.isArray(legacy)?legacy.filter(x=>Number.isInteger(x)&&x>=0&&x<lessons.length):[];
    }
    const saved=readStore();
    if(!Array.isArray(saved.completedV2) && Array.isArray(saved.completed)){
      const mapping=[1,2,4,7,35,34];
      const migrated=[...new Set(saved.completed.filter(x=>Number.isInteger(x)&&x>=0&&x<mapping.length).map(x=>mapping[x]))];
      store({completedV2:migrated});
      return migrated;
    }
    return Array.isArray(saved.completedV2)?saved.completedV2.filter(x=>Number.isInteger(x)&&x>=0&&x<lessons.length):[];
  }
  function equity() {
    const series = bars();
    return state.cash + state.qty * (series ? series[state.index][4] : 0);
  }
  function newChallenge() {
    const old = readStore(); const sessions = Number.isFinite(Number(old.sessions)) ? Math.min(1000000, Math.max(0, Number(old.sessions))) : 0;
    const series = bars();
    if (!series || series.length < 145) return;
    const usable = series.length - 120;
    state.index = 80 + ((sessions * 59 + (state.pair === "ETHUSDT" ? 43 : 0) + (state.period === "1h" ? 19 : 0)) % usable);
    state.endIndex = Math.min(series.length - 1, state.index + 24);
    state.cash = START_BALANCE; state.qty = 0; state.tradeCount = 0; state.steps = 0; state.choice = "wait";
    state.feedback = "";
    state.sessions = sessions + 1;
    store({sessions: state.sessions});
  }
  function chartIndex() {
    if(state.mode!=="learn") return state.index;
    const series=bars();
    if(!series || series.length<90) return Math.min(80,(series||[]).length-1);
    const lesson=activeLesson();
    const type=lesson?.type || "";
    // Janela estável, escolhida a partir dos candles já registrados. Não se fabricam preços.
    const available=series.length-88;
    const seed=state.lesson*37+(state.pair==="ETHUSDT"?23:0)+(state.period==="1h"?11:0);
    const target=88+(seed%available);
    if(!["uptrend","downtrend","bull_channel","bear_channel","breakout","fakeout"].includes(type)) return target;
    let best=target, bestScore=-Infinity;
    for(let end=88;end<series.length;end+=7){
      const start=end-34, first=series[start],last=series[end], movement=(last[4]-first[4]);
      const avgRange=series.slice(start,end+1).reduce((sum,c)=>sum+(c[2]-c[3]),0)/35||1;
      let score=type==="uptrend"||type==="bull_channel"?movement/avgRange:
                type==="downtrend"||type==="bear_channel"?-movement/avgRange:0;
      if(type==="breakout"||type==="fakeout"){
        const oldMax=Math.max(...series.slice(end-26,end-2).map(c=>c[2]));
        const oldMin=Math.min(...series.slice(end-26,end-2).map(c=>c[3]));
        score=type==="breakout" ? Math.max((last[4]-oldMax)/avgRange,(oldMin-last[4])/avgRange):
          Math.max(last[2]>oldMax?(oldMax-last[4])/avgRange:-9,last[3]<oldMin?(last[4]-oldMin)/avgRange:-9);
      }
      score-=Math.abs(end-target)*0.002;
      if(score>bestScore){bestScore=score;best=end;}
    }
    return best;
  }
  function view() {
    if (!host) return;
    const copy = t(); const series = bars();
    if (!series || !series.length) {
      host.textContent = "Historical data unavailable / Dados históricos indisponíveis.";
      return;
    }
    const lessons=courseLessons(), labels=guideText();
    const done = state.steps >= 24 || state.index >= state.endIndex;
    const tab = '<nav class="pa-tabs" aria-label="' + escapeHtml(copy.title) + '">' +
      ['learn','train'].map(name => '<button type="button" class="' + (state.mode === name ? "active" : "") + '" data-pa-mode="' + name + '" aria-pressed="' + (state.mode === name) + '">' + escapeHtml(copy[name]) + '</button>').join("") + '</nav>';
    const selectors = '<div class="pa-selectors"><label>' + escapeHtml(copy.pair) +
      '<select data-pa-pair><option value="BTCUSDT"' + (state.pair === "BTCUSDT" ? " selected" : "") + '>BTC/USDT</option><option value="ETHUSDT"' + (state.pair === "ETHUSDT" ? " selected" : "") + '>ETH/USDT</option></select></label>' +
      '<label>' + escapeHtml(copy.period) + '<select data-pa-period><option value="15m"' + (state.period === "15m" ? " selected" : "") + '>15m</option><option value="1h"' + (state.period === "1h" ? " selected" : "") + '>1h</option></select></label></div>';
    const i = chartIndex();
    const price = series[i][4];
    let detail = "";
    if (state.mode === "learn") {
      const lesson=activeLesson(), doneLessons=completed(), checked=state.answer!==null;
      const extended=Array.isArray(lesson.points);
      const question=extended?labels.question:lesson.question;
      const answers=extended?[lesson.confirmation,lesson.commonError,labels.noGuarantee]:lesson.answers;
      const correct=extended?0:lesson.correct;
      detail='<div class="pa-lessonhead"><span>'+escapeHtml(copy.lesson)+' '+(state.lesson+1)+' '+escapeHtml(copy.of)+' '+lessons.length+
        '</span><span>'+doneLessons.length+'/'+lessons.length+' '+escapeHtml(copy.completed)+'</span></div>'+
        '<label class="pa-topic-select">'+escapeHtml(labels.choose)+'<select data-pa-lesson>'+
        lessons.map((item,index)=>'<option value="'+index+'"'+(index===state.lesson?' selected':'')+'>'+escapeHtml((index+1)+'. '+item.title)+'</option>').join('')+
        '</select></label>'+
        '<h4>'+escapeHtml(lesson.title)+'</h4><p>'+escapeHtml(lesson.body)+'</p>'+
        (extended?'<h5 class="pa-topic-label">'+escapeHtml(labels.key)+'</h5><ul class="pa-keypoints">'+lesson.points.map(point=>'<li>'+escapeHtml(point)+'</li>').join('')+'</ul>'+
          '<div class="pa-explanation"><strong>'+escapeHtml(labels.confirm)+'</strong><p>'+escapeHtml(lesson.confirmation)+'</p></div>'+
          '<div class="pa-explanation pa-caution"><strong>'+escapeHtml(labels.error)+'</strong><p>'+escapeHtml(lesson.commonError)+'</p></div>'+
          '<div class="pa-explanation"><strong>'+escapeHtml(labels.example)+'</strong><p>'+escapeHtml(lesson.example)+'</p></div>'+
          (lesson.figure?'<details class="pa-figure" open><summary>'+escapeHtml(labels.illustration)+'</summary>'+lesson.figure+'<p>'+escapeHtml(labels.figureHelp)+'</p></details>':'')+
          (lesson.type==='xau'?'<p class="pa-hint">'+escapeHtml(labels.gold)+'</p>':'')+
          (lesson.type==='multi_tf'?'<p class="pa-hint">'+escapeHtml(labels.frames)+'</p>':'')
          :'')+
        '<p class="pa-hint">'+escapeHtml(copy.lessonHint)+'</p>'+
        '<div class="pa-question"><strong>'+escapeHtml(copy.question)+'</strong><p>'+escapeHtml(question)+'</p><div class="pa-answers">'+
        answers.map((answer,index)=>'<button type="button" data-pa-answer="'+index+'" class="'+(state.answer===index?'active':'')+'">'+escapeHtml(answer)+'</button>').join('')+
        '</div>'+(checked?'<div class="pa-feedback" role="status"><strong>'+escapeHtml(state.answer===correct?copy.correct:copy.incorrect)+'</strong> '+escapeHtml(extended?lesson.confirmation:lesson.why)+'</div>':'')+
        '</div><div class="pa-footactions"><button data-pa-prev type="button" '+(state.lesson===0?'disabled':'')+'>'+escapeHtml(copy.previous)+'</button><button type="button" data-pa-next '+(state.lesson===lessons.length-1?'disabled':'')+'>'+escapeHtml(copy.next)+'</button></div>';
    } else {
      const qty = state.qty, change = equity() - START_BALANCE;
      detail = '<div class="pa-metrics"><div><span>' + escapeHtml(copy.capital) + '</span><strong class="' + (change < 0 ? "negative" : "positive") + '">' + fmt(equity()) + ' USDT</strong></div>' +
        '<div><span>' + escapeHtml(copy.cash) + '</span><strong>' + fmt(state.cash) + '</strong></div>' +
        '<div><span>' + escapeHtml(copy.holdings) + '</span><strong>' + fmt(qty,6) + '</strong></div>' +
        '<div><span>' + escapeHtml(copy.step) + '</span><strong>' + state.steps + '/24</strong></div></div>' +
        '<p class="pa-hint">' + escapeHtml(copy.simulation) + '</p>' +
        (done ? '<p class="pa-feedback" role="status">' + escapeHtml(copy.done) + '</p>' :
        '<p>' + escapeHtml(copy.choose) + '</p><div class="pa-decisions">' +
          [['buy',copy.buy],['sell',copy.sell],['wait',copy.wait]].map(([val,label]) => '<button type="button" data-pa-choice="' + val + '" class="' + (state.choice === val ? "active " + val : "") + '" ' + (val === "sell" && state.qty <= 0 ? "disabled" : "") + '>' + escapeHtml(label) + '</button>').join("") +
          '</div><div class="pa-footactions"><span>' + escapeHtml(copy.selected) + ': <strong>' + escapeHtml(copy[state.choice]) + '</strong></span><button class="pa-primary" type="button" data-pa-reveal>' + escapeHtml(copy.continue) + '</button></div>') +
        (state.feedback ? '<div class="pa-feedback" role="status">' + escapeHtml(state.feedback) + '</div>' : "") +
        '<div class="pa-footactions"><small>' + escapeHtml(copy.costs) + '</small><button type="button" data-pa-new>' + escapeHtml(copy.newChallenge) + '</button></div>';
    }
    host.innerHTML = '<div class="pa-wrap"><header class="pa-heading"><div><h3>' + escapeHtml(copy.title) + '</h3><p>' + escapeHtml(copy.desc) + '</p></div><span class="pa-offline">OFFLINE</span></header>' +
      tab + selectors + (state.mode==='learn'?'<div class="pa-learning-context">'+escapeHtml(copy.lesson)+' '+(state.lesson+1)+'/'+lessons.length+': '+escapeHtml(activeLesson().title)+'</div>':'') + '<div class="pa-chart-top"><strong>' + (state.pair === "BTCUSDT" ? "Bitcoin" : "Ethereum") + ' / USDT</strong><span>' + escapeHtml(copy.price) + ': ' + fmt(price) + '</span></div>' +
      '<canvas class="pa-chart" height="230" role="img" aria-label="' + escapeHtml(copy.chartDescription) + '"></canvas>' +
      '<p class="pa-source">'+escapeHtml(copy.historical)+'</p>'+
      (state.mode==='learn'?'<div class="pa-chartguide"><label><input type="checkbox" data-pa-overlay '+(state.showGuide?'checked':'')+' /> '+escapeHtml(labels.mark)+'</label><small>'+escapeHtml(labels.historicalNote)+'</small></div>':'')+
      '<section class="pa-detail">' + detail + '</section><footer class="pa-legal">' + escapeHtml(copy.provider) + ' ' + escapeHtml(copy.resetWarning) + '</footer></div>';
    draw();
    requestAnimationFrame(draw);
  }
  function draw() {
    if (!host || !host.isConnected) return;
    const canvas = host.querySelector(".pa-chart"), series = bars();
    if (!canvas || !series) return;
    const end = chartIndex(), start = Math.max(0, end - 46), visible = series.slice(start, end + 1);
    const rect = canvas.getBoundingClientRect(), w = Math.max(270, Math.round(rect.width || 320)), h = 230;
    const dpr = Math.max(1, Math.min(3, window.devicePixelRatio || 1));
    canvas.width = Math.round(w * dpr); canvas.height = Math.round(h * dpr);
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.setTransform(dpr,0,0,dpr,0,0);
    const bg = "#0b1727"; ctx.fillStyle = bg; ctx.fillRect(0,0,w,h);
    const plotW = w - 70, top = 12, plotH = h - 42;
    let lo = Infinity, hi = -Infinity;
    visible.forEach(c => {lo = Math.min(lo,c[3]); hi = Math.max(hi,c[2]);});
    const pad = Math.max((hi-lo)*0.075,0.01); lo -= pad; hi += pad;
    const y = p => top + (hi-p)/(hi-lo)*plotH;
    ctx.strokeStyle="#294052";ctx.fillStyle="#a9c0d0";ctx.lineWidth=1;ctx.font="10px system-ui, sans-serif";
    for (let k=0;k<5;k++) {const price = lo + (hi-lo)*k/4, yy=y(price);ctx.globalAlpha=.6;ctx.beginPath();ctx.moveTo(10,yy);ctx.lineTo(w-52,yy);ctx.stroke();ctx.globalAlpha=1;ctx.fillText(fmt(price),w-48,yy+3);}
    const bw = plotW / visible.length;
    visible.forEach((c,j)=>{
      const green = c[4] >= c[1], color = green ? "#35d7aa" : "#ed7481", x = 10+(j+.5)*bw;
      ctx.strokeStyle=color;ctx.fillStyle=color;ctx.lineWidth=1.2;
      ctx.beginPath();ctx.moveTo(x,y(c[2]));ctx.lineTo(x,y(c[3]));ctx.stroke();
      const y1=y(Math.max(c[1],c[4])), y2=y(Math.min(c[1],c[4]));
      ctx.fillRect(x-Math.min(bw*.35,4.5),y1,Math.max(2,Math.min(bw*.7,9)),Math.max(1.3,y2-y1));
    });
    const last=visible[visible.length-1], lastY=y(last[4]);ctx.strokeStyle="#6ba9ff";ctx.setLineDash([4,5]);ctx.beginPath();ctx.moveTo(10,lastY);ctx.lineTo(w-52,lastY);ctx.stroke();ctx.setLineDash([]);
    const label = new Date(last[0]).toLocaleDateString(LOCALES[state.language],{day:"2-digit",month:"2-digit",year:"numeric"});
    ctx.fillStyle="#a9c0d0";ctx.font="10px system-ui, sans-serif";ctx.fillText(label+" UTC",12,h-9);
    if(state.mode==="learn" && state.showGuide) drawConceptGuide(ctx,visible,w,h,y,bw);
  }
  // Marcação sobre candles históricos verdadeiros. O esquema SVG, ao lado do texto,
  // ensina a geometria ideal; aqui só se destacam preços e pivôs observados.
  function drawConceptGuide(ctx,visible,w,h,y,bw) {
    const lesson=activeLesson(), type=lesson?.type || "";
    const left=10,right=w-60;
    const x=i=>left+(i+0.5)*bw;
    const upper=Math.max(...visible.slice(0,-2).map(c=>c[2]));
    const lower=Math.min(...visible.slice(0,-2).map(c=>c[3]));
    const mid=visible[visible.length-1][4];
    const captions=state.language==="pt"?["RES.","SUP."]:state.language==="es"?["RES.","SOP."]:state.language==="ru"?["СОПР.","ПОДД."]:["RES.","SUP."];
    function line(price,color,label){
      const yy=y(price);
      ctx.strokeStyle=color;ctx.fillStyle=color;ctx.lineWidth=1.5;ctx.setLineDash([5,4]);
      ctx.beginPath();ctx.moveTo(left,yy);ctx.lineTo(right,yy);ctx.stroke();ctx.setLineDash([]);
      ctx.font="bold 10px system-ui,sans-serif";
      ctx.fillText(label,right-35,Math.max(11,yy-5));
    }
    function segment(a,b,key,color){
      if(!a||!b)return;
      ctx.strokeStyle=color;ctx.lineWidth=2;ctx.setLineDash([]);
      ctx.beginPath();ctx.moveTo(x(a.i),y(a.price));ctx.lineTo(x(b.i),y(b.price));ctx.stroke();
      ctx.fillStyle=color;
      for(const p of [a,b]){ctx.beginPath();ctx.arc(x(p.i),y(p.price),3.4,0,Math.PI*2);ctx.fill();}
    }
    const peaks=[],valleys=[];
    for(let i=2;i<visible.length-2;i++){
      const c=visible[i],neighbors=visible.slice(i-2,i+3);
      if(neighbors.every(row=>c[2]>=row[2]))peaks.push({i,price:c[2]});
      if(neighbors.every(row=>c[3]<=row[3]))valleys.push({i,price:c[3]});
    }
    const horizontal=["context","support","resistance","range","breakout","fakeout","pullback","bull_flag","bear_flag",
      "asc_triangle","desc_triangle","sym_triangle","double_top","double_bottom","triple_top","triple_bottom",
      "head_shoulders","inv_head_shoulders","rounded_top","rounded_bottom","measured_move","xau"].includes(type);
    if(horizontal){
      if(type!=="support")line(upper,"#e9b46c",captions[0]);
      if(type!=="resistance")line(lower,"#35d7aa",captions[1]);
    }
    const structure=["uptrend","downtrend","bull_channel","bear_channel","bull_flag","bear_flag","asc_triangle",
      "desc_triangle","sym_triangle","rising_wedge","falling_wedge","double_top","double_bottom","triple_top",
      "triple_bottom","head_shoulders","inv_head_shoulders","rounded_top","rounded_bottom","h2","l2","pullback"].includes(type);
    if(structure){
      const p=peaks.slice(-3),v=valleys.slice(-3);
      if(p.length>=2)segment(p[0],p[p.length-1],"high","#f5c167");
      if(v.length>=2)segment(v[0],v[v.length-1],"low","#58ddba");
      if(["h2","l2","double_top","double_bottom","triple_top","triple_bottom","head_shoulders","inv_head_shoulders"].includes(type)){
        const points=["h2","double_bottom","triple_bottom","inv_head_shoulders"].includes(type)?v:p;
        ctx.fillStyle="#f5c167";ctx.font="bold 11px system-ui,sans-serif";
        points.forEach((point,i)=>ctx.fillText(String(i+1),x(point.i)+3,Math.max(15,y(point.price)-5)));
      }
    }
    if(type==="candle" || type==="climax"){
      let index=visible.length-1;
      if(type==="climax"){let max=-1;visible.forEach((c,i)=>{const body=Math.abs(c[4]-c[1]);if(body>max){max=body;index=i;}});}
      const bar=visible[index];
      ctx.strokeStyle="#ffd666";ctx.lineWidth=2;
      ctx.strokeRect(x(index)-Math.max(5,bw*.52),y(bar[2])-5,Math.max(10,bw*1.05),y(bar[3])-y(bar[2])+10);
    }
    if(["risk","risk_reward","checklist","demo"].includes(type)){
      const dist=Math.max((upper-lower)*.14,mid*.001);
      line(mid+dist,"#35d7aa",state.language==="pt"?"ALVO*":"TARGET*");
      line(mid-dist,"#ed7481","STOP*");
    }
  }

  function nextCandle() {
    const copy=t(), series=bars();
    if (!series || state.index>=state.endIndex || state.steps>=24) return;
    const next=series[state.index+1]; if (!next) return;
    let message=copy.waited;
    if(state.choice==="buy"){
      if(state.cash>0.01){
        const fill=next[1]*(1+SLIPPAGE);
        state.qty=state.cash/(fill*(1+FEE_RATE));
        state.cash=0;state.tradeCount++;message=copy.bought;
      } else message=copy.needFunds;
    } else if (state.choice==="sell"){
      if(state.qty>0){
        const fill=next[1]*(1-SLIPPAGE);
        state.cash+=state.qty*fill*(1-FEE_RATE);
        state.qty=0;state.tradeCount++;message=copy.sold;
      } else message=copy.needCoins;
    }
    state.index++;state.steps++;state.choice="wait";
    state.feedback=message + " " + copy.nextTip;
    view();
  }
  function onClick(event) {
    if(event.target?.closest?.("[data-pa-reload]")){window.location?.reload?.();return;}
    const btn=event.target.closest("button");if(!btn||!host.contains(btn))return;
    if(btn.dataset.paMode){state.mode=btn.dataset.paMode;state.answer=null;view();return;}
    if(btn.hasAttribute("data-pa-answer")){
      state.answer=Number(btn.dataset.paAnswer);
      const extended=Array.isArray(activeLesson().points);
      if(state.answer===(extended?0:activeLesson().correct)){
        const ids=new Set(completed());ids.add(state.lesson);
        store(extended?{completedV2:[...ids]}:{completed:[...ids]});
      }
      view();return;
    }
    if(btn.hasAttribute("data-pa-prev")){state.lesson=Math.max(0,state.lesson-1);state.answer=null;view();return;}
    if(btn.hasAttribute("data-pa-next")){state.lesson=Math.min(t().lessons.length-1,state.lesson+1);state.answer=null;view();return;}
    if(btn.dataset.paChoice){state.choice=btn.dataset.paChoice;view();return;}
    if(btn.hasAttribute("data-pa-reveal")){nextCandle();return;}
    if(btn.hasAttribute("data-pa-new")){newChallenge();view();}
  }
  function onChange(event) {
    if(event.target.matches("[data-pa-lesson]")){state.lesson=Math.min(Math.max(Number(event.target.value)||0,0),courseLessons().length-1);state.answer=null;view();return;}
    if(event.target.matches("[data-pa-overlay]")){state.showGuide=event.target.checked;view();return;}
    if(event.target.matches("[data-pa-pair]")){state.pair=PAIRS.includes(event.target.value)?event.target.value:"BTCUSDT";newChallenge();view();}
    if(event.target.matches("[data-pa-period]")){state.period=PERIODS.includes(event.target.value)?event.target.value:"15m";newChallenge();view();}
  }
  function render(args){
    const language=String(args && args.language || "pt").toLowerCase();
    state.language=TEXT[language]?language:"pt";
    const target=args && args.target ? args.target : document.getElementById("marketTrainerMount");
    if(!target)return;
    if(host!==target){host=target;host.addEventListener("click",onClick);host.addEventListener("change",onChange);}
    if(!state.sessions)newChallenge();
    view();
  }
  window.addEventListener("resize",()=>{if(host&&host.isConnected)draw();});
  window.EduCashProPriceAction={render};
})();
