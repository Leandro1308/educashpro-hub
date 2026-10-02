
(function(){
  "use strict";

  /*
    EduCashPro local market-training suite.
    Educational adaptations inspired by the MIT-licensed open-source projects
    ChartDojo, CandleEdge and TheTradingGame by michaelsboost.
    Gameplay, progress and charts run entirely in the browser.
  */

  var EXNESS_URL="https://one.exnessonelink.com/a/93bgo7jpfo/?campaign=43340";
  var STORE="educashpro:market-training:v1";
  var bridge=window.EduCashProGameBridge||(window.EduCashProGameBridge={session:null,catalogContext:{},currentGame:null});
  var current={game:null,phase:0,score:0,answered:false};

  var COPY={
    pt:{
      play:"Jogar",free:"LIVRE",local:"100% LOCAL",training:"TREINO",
      chartDojo:"Chart Dojo",chartDojoSub:"Reconheça candles e formações em desafios rápidos de Price Action.",
      candleEdge:"CandleEdge",candleEdgeSub:"Treine estrutura de mercado, suportes, resistências e rompimentos.",
      tradingGame:"The Trading Game",tradingGameSub:"Leia o contexto do gráfico e revele os candles seguintes para conferir sua análise.",
      back:"Voltar aos jogos",start:"Começar treino",phase:"Fase",score:"Pontos",record:"Recorde",
      choose:"Qual leitura descreve melhor o gráfico?",next:"Próxima fase",finish:"Ver resultado",
      correct:"Correto",wrong:"Revise esta leitura",yourAnswer:"Sua resposta",rightAnswer:"Resposta esperada",
      result:"Treino concluído",again:"Jogar novamente",catalog:"Voltar ao catálogo",
      exEyebrow:"PRATIQUE TAMBÉM NO MERCADO",
      exTitle:"Continue praticando na Exness",
      exBody:"Você pode começar em uma conta demonstrativa ou, se decidir operar com capital real, abrir uma conta real e praticar com gestão de risco.",
      exCta:"CADASTRE-SE NA EXNESS",exContinue:"CONTINUAR JOGO",
      exDisclosure:"Operações com instrumentos financeiros envolvem risco de perdas.",
      doji:"Doji",hammer:"Martelo",shootingStar:"Estrela cadente",bullishEngulfing:"Engolfo de alta",bearishEngulfing:"Engolfo de baixa",insideBar:"Inside Bar",
      uptrend:"Tendência de alta",downtrend:"Tendência de baixa",range:"Lateralidade",breakout:"Rompimento",supportRejection:"Rejeição no suporte",resistanceRejection:"Rejeição na resistência",pullback:"Pullback / reteste",falseBreakout:"Falso rompimento",
      tipDoji:"Abertura e fechamento ficam muito próximos, mostrando equilíbrio temporário entre compradores e vendedores.",
      tipHammer:"O corpo fica na parte superior e a sombra inferior é longa, indicando rejeição de preços mais baixos.",
      tipShootingStar:"A sombra superior longa mostra rejeição de preços mais altos após uma tentativa de avanço.",
      tipBullishEngulfing:"O corpo comprador envolve o corpo vendedor anterior e mostra mudança de pressão no curto prazo.",
      tipBearishEngulfing:"O corpo vendedor envolve o corpo comprador anterior e sinaliza aumento da pressão vendedora.",
      tipInsideBar:"A máxima e a mínima ficam dentro da barra anterior, mostrando compressão.",
      tipUptrend:"Topos e fundos avançam de forma ascendente, mantendo a estrutura compradora.",
      tipDowntrend:"Topos e fundos descem progressivamente, mantendo a estrutura vendedora.",
      tipRange:"O preço oscila entre limites sem progressão direcional consistente.",
      tipBreakout:"O preço atravessa uma região importante e passa a negociar além dela.",
      tipSupportRejection:"O preço testa uma região inferior e reage para cima, rejeitando a continuidade da queda.",
      tipResistanceRejection:"O preço testa uma região superior e reage para baixo, rejeitando a continuidade da alta.",
      tipPullback:"Depois do impulso, o preço retorna à região rompida antes de tentar retomar o movimento.",
      tipFalseBreakout:"O preço ultrapassa o nível, não sustenta o movimento e volta rapidamente para dentro da estrutura."
    },
    en:{
      play:"Play",free:"FREE",local:"100% LOCAL",training:"TRAINING",
      chartDojo:"Chart Dojo",chartDojoSub:"Recognize candles and formations through quick Price Action challenges.",
      candleEdge:"CandleEdge",candleEdgeSub:"Practice market structure, support, resistance and breakouts.",
      tradingGame:"The Trading Game",tradingGameSub:"Read chart context and reveal the next candles to check your analysis.",
      back:"Back to games",start:"Start training",phase:"Stage",score:"Score",record:"Record",
      choose:"Which reading best describes the chart?",next:"Next stage",finish:"View result",
      correct:"Correct",wrong:"Review this reading",yourAnswer:"Your answer",rightAnswer:"Expected answer",
      result:"Training complete",again:"Play again",catalog:"Back to catalog",
      exEyebrow:"PRACTICE IN THE MARKET TOO",exTitle:"Keep practicing with Exness",
      exBody:"You can start with a Demo account or, if you decide to trade with real capital, open a real account and practice with risk management.",
      exCta:"SIGN UP WITH EXNESS",exContinue:"CONTINUE GAME",
      exDisclosure:"Trading financial instruments involves risk of loss.",
      doji:"Doji",hammer:"Hammer",shootingStar:"Shooting Star",bullishEngulfing:"Bullish Engulfing",bearishEngulfing:"Bearish Engulfing",insideBar:"Inside Bar",
      uptrend:"Uptrend",downtrend:"Downtrend",range:"Trading range",breakout:"Breakout",supportRejection:"Support rejection",resistanceRejection:"Resistance rejection",pullback:"Pullback / retest",falseBreakout:"False breakout",
      tipDoji:"Open and close are very close, showing temporary balance between buyers and sellers.",
      tipHammer:"The body sits near the top while a long lower wick shows rejection of lower prices.",
      tipShootingStar:"A long upper wick shows rejection of higher prices after an attempted advance.",
      tipBullishEngulfing:"The bullish body covers the previous bearish body, showing a short-term shift in pressure.",
      tipBearishEngulfing:"The bearish body covers the previous bullish body, showing stronger selling pressure.",
      tipInsideBar:"The high and low remain inside the previous bar, showing compression.",
      tipUptrend:"Highs and lows progress upward, maintaining bullish structure.",
      tipDowntrend:"Highs and lows move progressively lower, maintaining bearish structure.",
      tipRange:"Price oscillates between boundaries without consistent directional progress.",
      tipBreakout:"Price crosses an important area and begins trading beyond it.",
      tipSupportRejection:"Price tests a lower area and reacts upward, rejecting further decline.",
      tipResistanceRejection:"Price tests an upper area and reacts downward, rejecting further advance.",
      tipPullback:"After an impulse, price returns to the broken area before attempting continuation.",
      tipFalseBreakout:"Price crosses a level, fails to hold, and quickly returns inside the prior structure."
    },
    es:{
      play:"Jugar",free:"LIBRE",local:"100% LOCAL",training:"ENTRENAMIENTO",
      chartDojo:"Chart Dojo",chartDojoSub:"Reconoce velas y formaciones con desafíos rápidos de Price Action.",
      candleEdge:"CandleEdge",candleEdgeSub:"Practica estructura de mercado, soportes, resistencias y rompimientos.",
      tradingGame:"The Trading Game",tradingGameSub:"Lee el contexto del gráfico y revela las velas siguientes para comprobar tu análisis.",
      back:"Volver a juegos",start:"Comenzar entrenamiento",phase:"Fase",score:"Puntos",record:"Récord",
      choose:"¿Qué lectura describe mejor el gráfico?",next:"Siguiente fase",finish:"Ver resultado",
      correct:"Correcto",wrong:"Revisa esta lectura",yourAnswer:"Tu respuesta",rightAnswer:"Respuesta esperada",
      result:"Entrenamiento completado",again:"Jugar de nuevo",catalog:"Volver al catálogo",
      exEyebrow:"PRACTICA TAMBIÉN EN EL MERCADO",exTitle:"Sigue practicando en Exness",
      exBody:"Puedes comenzar con una cuenta Demo o, si decides operar con capital real, abrir una cuenta real y practicar con gestión de riesgo.",
      exCta:"REGÍSTRATE EN EXNESS",exContinue:"CONTINUAR JUEGO",
      exDisclosure:"Operar instrumentos financieros implica riesgo de pérdidas.",
      doji:"Doji",hammer:"Martillo",shootingStar:"Estrella fugaz",bullishEngulfing:"Envolvente alcista",bearishEngulfing:"Envolvente bajista",insideBar:"Inside Bar",
      uptrend:"Tendencia alcista",downtrend:"Tendencia bajista",range:"Lateralidad",breakout:"Rompimiento",supportRejection:"Rechazo en soporte",resistanceRejection:"Rechazo en resistencia",pullback:"Pullback / retesteo",falseBreakout:"Falso rompimiento",
      tipDoji:"Apertura y cierre quedan muy próximos, mostrando equilibrio temporal entre compradores y vendedores.",
      tipHammer:"El cuerpo queda arriba y una sombra inferior larga muestra rechazo de precios más bajos.",
      tipShootingStar:"Una sombra superior larga muestra rechazo de precios más altos después de un intento de avance.",
      tipBullishEngulfing:"El cuerpo alcista envuelve al cuerpo bajista anterior y muestra un cambio de presión a corto plazo.",
      tipBearishEngulfing:"El cuerpo bajista envuelve al cuerpo alcista anterior y muestra mayor presión vendedora.",
      tipInsideBar:"El máximo y el mínimo quedan dentro de la barra anterior, mostrando compresión.",
      tipUptrend:"Máximos y mínimos avanzan de forma ascendente, manteniendo la estructura alcista.",
      tipDowntrend:"Máximos y mínimos bajan progresivamente, manteniendo la estructura bajista.",
      tipRange:"El precio oscila entre límites sin progreso direccional consistente.",
      tipBreakout:"El precio atraviesa una zona importante y comienza a negociar más allá de ella.",
      tipSupportRejection:"El precio prueba una zona inferior y reacciona al alza, rechazando una caída mayor.",
      tipResistanceRejection:"El precio prueba una zona superior y reacciona a la baja, rechazando una subida mayor.",
      tipPullback:"Tras el impulso, el precio vuelve a la zona rota antes de intentar continuar.",
      tipFalseBreakout:"El precio supera un nivel, no logra sostenerse y vuelve rápidamente a la estructura previa."
    },
    ru:{
      play:"Играть",free:"СВОБОДНО",local:"100% ЛОКАЛЬНО",training:"ТРЕНИРОВКА",
      chartDojo:"Chart Dojo",chartDojoSub:"Распознавайте свечи и фигуры в коротких заданиях по Price Action.",
      candleEdge:"CandleEdge",candleEdgeSub:"Тренируйте структуру рынка, поддержку, сопротивление и пробои.",
      tradingGame:"The Trading Game",tradingGameSub:"Читайте контекст графика и открывайте следующие свечи, чтобы проверить анализ.",
      back:"Назад к играм",start:"Начать тренировку",phase:"Этап",score:"Очки",record:"Рекорд",
      choose:"Какое описание лучше всего соответствует графику?",next:"Следующий этап",finish:"Показать результат",
      correct:"Верно",wrong:"Пересмотрите чтение",yourAnswer:"Ваш ответ",rightAnswer:"Ожидаемый ответ",
      result:"Тренировка завершена",again:"Играть снова",catalog:"Назад в каталог",
      exEyebrow:"ПРАКТИКА НА РЫНКЕ",exTitle:"Продолжайте практику с Exness",
      exBody:"Можно начать с демо-счёта или, если вы решите использовать реальный капитал, открыть реальный счёт и соблюдать управление риском.",
      exCta:"ЗАРЕГИСТРИРОВАТЬСЯ В EXNESS",exContinue:"ПРОДОЛЖИТЬ ИГРУ",
      exDisclosure:"Торговля финансовыми инструментами связана с риском убытков.",
      doji:"Доджи",hammer:"Молот",shootingStar:"Падающая звезда",bullishEngulfing:"Бычье поглощение",bearishEngulfing:"Медвежье поглощение",insideBar:"Внутренний бар",
      uptrend:"Восходящий тренд",downtrend:"Нисходящий тренд",range:"Боковой диапазон",breakout:"Пробой",supportRejection:"Отбой от поддержки",resistanceRejection:"Отбой от сопротивления",pullback:"Откат / ретест",falseBreakout:"Ложный пробой",
      tipDoji:"Открытие и закрытие находятся рядом, показывая временный баланс покупателей и продавцов.",
      tipHammer:"Тело находится сверху, а длинная нижняя тень показывает отбой от более низких цен.",
      tipShootingStar:"Длинная верхняя тень показывает отбой от более высоких цен после попытки роста.",
      tipBullishEngulfing:"Бычье тело перекрывает предыдущее медвежье и показывает краткосрочную смену давления.",
      tipBearishEngulfing:"Медвежье тело перекрывает предыдущее бычье и показывает усиление давления продавцов.",
      tipInsideBar:"Максимум и минимум находятся внутри предыдущего бара, показывая сжатие.",
      tipUptrend:"Максимумы и минимумы последовательно растут, сохраняя бычью структуру.",
      tipDowntrend:"Максимумы и минимумы последовательно снижаются, сохраняя медвежью структуру.",
      tipRange:"Цена колеблется между границами без устойчивого направленного движения.",
      tipBreakout:"Цена проходит важную область и начинает торговаться за её пределами.",
      tipSupportRejection:"Цена тестирует нижнюю область и реагирует вверх, отвергая дальнейшее снижение.",
      tipResistanceRejection:"Цена тестирует верхнюю область и реагирует вниз, отвергая дальнейший рост.",
      tipPullback:"После импульса цена возвращается к пробитой области перед попыткой продолжения.",
      tipFalseBreakout:"Цена проходит уровень, не удерживается и быстро возвращается внутрь прежней структуры."
    }
  };

  var GAMES={
    "chart-dojo":{
      icon:"🥋",title:"chartDojo",sub:"chartDojoSub",
      scenarios:[
        {answer:"doji",tip:"tipDoji",candles:[[52,68,37,53],[54,63,42,55],[55,76,34,56]]},
        {answer:"hammer",tip:"tipHammer",candles:[[62,70,55,58],[58,62,24,59],[59,70,53,67]]},
        {answer:"shootingStar",tip:"tipShootingStar",candles:[[45,58,39,55],[56,88,52,54],[54,60,42,46]]},
        {answer:"bullishEngulfing",tip:"tipBullishEngulfing",candles:[[64,69,50,54],[52,72,48,70],[70,78,64,74]]},
        {answer:"bearishEngulfing",tip:"tipBearishEngulfing",candles:[[45,60,42,57],[60,64,38,41],[41,48,31,35]]},
        {answer:"insideBar",tip:"tipInsideBar",candles:[[44,78,35,69],[61,70,48,57],[57,66,50,63]]}
      ],
      options:["doji","hammer","shootingStar","bullishEngulfing","bearishEngulfing","insideBar"]
    },
    "candle-edge":{
      icon:"📐",title:"candleEdge",sub:"candleEdgeSub",
      scenarios:[
        {answer:"uptrend",tip:"tipUptrend",closes:[28,34,31,41,38,49,45,57,53,64,60,70]},
        {answer:"downtrend",tip:"tipDowntrend",closes:[72,66,69,59,62,51,55,44,48,37,40,31]},
        {answer:"range",tip:"tipRange",closes:[47,55,44,58,46,54,43,57,45,53,46,55]},
        {answer:"breakout",tip:"tipBreakout",closes:[42,48,45,50,46,49,47,51,50,62,68,72]},
        {answer:"supportRejection",tip:"tipSupportRejection",closes:[61,54,49,43,39,35,31,38,46,52,58,63]},
        {answer:"resistanceRejection",tip:"tipResistanceRejection",closes:[34,41,47,54,61,67,72,66,59,52,47,42]}
      ],
      options:["uptrend","downtrend","range","breakout","supportRejection","resistanceRejection"]
    },
    "trading-game":{
      icon:"📊",title:"tradingGame",sub:"tradingGameSub",
      scenarios:[
        {answer:"uptrend",tip:"tipUptrend",closes:[31,35,33,40,38,46,43,51,48,57,54,63,60,68],visible:10},
        {answer:"downtrend",tip:"tipDowntrend",closes:[69,64,67,59,62,54,57,48,51,43,46,37,40,33],visible:10},
        {answer:"range",tip:"tipRange",closes:[46,54,43,56,47,52,44,55,46,53,45,54,47,52],visible:10},
        {answer:"breakout",tip:"tipBreakout",closes:[43,49,45,50,46,51,47,50,48,52,64,70,73,76],visible:10},
        {answer:"pullback",tip:"tipPullback",closes:[31,39,46,54,61,67,64,59,55,58,63,69,73,77],visible:10},
        {answer:"falseBreakout",tip:"tipFalseBreakout",closes:[45,49,46,51,47,50,48,52,58,66,51,46,48,44],visible:10}
      ],
      options:["uptrend","downtrend","range","breakout","pullback","falseBreakout"]
    }
  };

  function lang(){
    var raw=String((bridge.session&&bridge.session.profile&&bridge.session.profile.language)||navigator.language||"pt").slice(0,2).toLowerCase();
    return COPY[raw]?raw:"pt";
  }
  function t(key){var l=lang();return COPY[l][key]||COPY.pt[key]||key}
  function esc(v){return String(v==null?"":v).replace(/[&<>"']/g,function(c){return{"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]})}
  function content(){return document.getElementById("content")}
  function active(){return !!(bridge.session&&bridge.session.profile&&bridge.session.profile.active===true)}
  function openUrl(url){
    try{
      var tg=window.Telegram&&window.Telegram.WebApp;
      if(tg&&tg.openLink)return tg.openLink(url);
    }catch(_){}
    window.open(url,"_blank","noopener");
  }
  function readStore(){
    try{return JSON.parse(localStorage.getItem(STORE)||"{}")||{}}catch(_){return{}}
  }
  function writeBest(game,score){
    var data=readStore();
    data[game]=Math.max(Number(data[game]||0),Number(score||0));
    try{localStorage.setItem(STORE,JSON.stringify(data))}catch(_){}
  }
  function best(game){return Number(readStore()[game]||0)}

  function candlesFromCloses(values){
    var out=[];
    for(var i=0;i<values.length;i++){
      var close=values[i],open=i?values[i-1]:close-2;
      var high=Math.max(open,close)+3+(i%3);
      var low=Math.min(open,close)-3-((i+1)%3);
      out.push([open,high,low,close]);
    }
    return out;
  }

  function chartSvg(candles,reveal){
    reveal=reveal==null?candles.length:Math.max(1,Math.min(reveal,candles.length));
    var shown=candles.slice(0,reveal),min=Infinity,max=-Infinity,i;
    for(i=0;i<shown.length;i++){min=Math.min(min,shown[i][2]);max=Math.max(max,shown[i][1])}
    var w=720,h=330,pad=34,usableW=w-pad*2,usableH=h-pad*2,step=usableW/Math.max(shown.length,1),bodyW=Math.max(10,step*.48);
    function y(v){return pad+(max-v)/(Math.max(1,max-min))*usableH}
    var grid="";
    for(i=1;i<6;i++){var gy=pad+(usableH/6)*i;grid+='<line x1="'+pad+'" y1="'+gy+'" x2="'+(w-pad)+'" y2="'+gy+'" stroke="#ffffff" stroke-opacity=".055"/>'}
    var bars="";
    for(i=0;i<shown.length;i++){
      var c=shown[i],x=pad+step*i+step/2,up=c[3]>=c[0],color=up?"#30e6a6":"#ff6b6b";
      var yo=y(c[0]),yc=y(c[3]),yh=y(c[1]),yl=y(c[2]),top=Math.min(yo,yc),height=Math.max(4,Math.abs(yc-yo));
      bars+='<line x1="'+x+'" y1="'+yh+'" x2="'+x+'" y2="'+yl+'" stroke="'+color+'" stroke-width="3"/>';
      bars+='<rect x="'+(x-bodyW/2)+'" y="'+top+'" width="'+bodyW+'" height="'+height+'" rx="2" fill="'+color+'"/>';
    }
    return '<svg viewBox="0 0 720 330" role="img" aria-label="chart"><defs><linearGradient id="mtbg" x1="0" y1="0" x2="0" y2="1"><stop stop-color="#0d1c2b"/><stop offset="1" stop-color="#04090f"/></linearGradient></defs><rect width="720" height="330" fill="url(#mtbg)"/>'+grid+bars+'</svg>';
  }

  function cardHtml(id){
    var g=GAMES[id];
    return '<article class="gameCardV2 marketTrainingCard" data-market-training-card="'+id+'">'+
      '<div class="gameCardArt">'+g.icon+'</div>'+
      '<h3>'+esc(t(g.title))+'</h3>'+
      '<p>'+esc(t(g.sub))+'</p>'+
      '<div class="gameBadges"><span class="gameBadge">'+esc(t("free"))+'</span><span class="gameBadge training">'+esc(t("local"))+'</span></div>'+
      '<div class="gameCardActions single"><button type="button" class="gamePlayBtn marketTrainingPlay" data-market-training-play="'+id+'">'+esc(t("play"))+'</button></div>'+
    '</article>';
  }

  function ensureCards(){
    var grid=document.querySelector(".gameCatalogV2");
    if(!grid)return false;
    var ids=["chart-dojo","candle-edge","trading-game"],missing=[];
    for(var i=0;i<ids.length;i++)if(!grid.querySelector('[data-market-training-card="'+ids[i]+'"]'))missing.push(ids[i]);
    if(!missing.length)return true;
    var holder=document.createElement("div");
    holder.innerHTML=missing.map(cardHtml).join("");
    var frag=document.createDocumentFragment();
    while(holder.firstChild)frag.appendChild(holder.firstChild);
    grid.insertBefore(frag,grid.firstChild);
    return true;
  }

  function catalog(){
    current={game:null,phase:0,score:0,answered:false};
    bridge.currentGame=null;
    var suite=window.EduCashProGameSuite;
    if(suite&&suite.renderCatalog)return suite.renderCatalog(bridge.catalogContext||{});
    document.querySelector('#bottomNav button[data-view="home"]')&&document.querySelector('#bottomNav button[data-view="home"]').click();
  }

  function intro(id){
    var g=GAMES[id]; if(!g)return;
    current={game:id,phase:0,score:0,answered:false};
    bridge.currentGame=id;
    document.getElementById("bottomNav")&&document.getElementById("bottomNav").classList.add("hidden");
    content().innerHTML='<main class="marketTrainer">'+
      '<div class="marketTrainerTop"><button type="button" class="marketTrainerBack">'+esc(t("back"))+'</button><span class="marketTrainerProgress">'+esc(t("record"))+': '+best(id)+'</span></div>'+
      '<section class="marketTrainerHero"><span class="eyebrow">'+esc(t("training"))+' · '+esc(t("local"))+'</span><h1>'+g.icon+' '+esc(t(g.title))+'</h1><p>'+esc(t(g.sub))+'</p><button type="button" class="marketTrainerStart">'+esc(t("start"))+'</button></section>'+
    '</main>';
    content().querySelector(".marketTrainerBack").onclick=catalog;
    content().querySelector(".marketTrainerStart").onclick=function(){renderPhase()};
    window.scrollTo(0,0);
  }

  function optionsFor(game,answer,phase){
    var opts=GAMES[game].options.slice();
    var start=opts.indexOf(answer);
    if(start<0)start=0;
    var selected=[answer];
    for(var i=1;i<opts.length&&selected.length<4;i++){
      var key=opts[(start+i+phase)%opts.length];
      if(selected.indexOf(key)<0)selected.push(key);
    }
    for(var j=selected.length-1;j>0;j--){var k=(phase+j*3)% (j+1),tmp=selected[j];selected[j]=selected[k];selected[k]=tmp}
    return selected;
  }

  function renderPhase(){
    var g=GAMES[current.game],scenario=g&&g.scenarios[current.phase];
    if(!g||!scenario)return result();
    current.answered=false;
    var candles=scenario.candles||candlesFromCloses(scenario.closes);
    var reveal=(current.game==="trading-game")?scenario.visible:null;
    var answers=optionsFor(current.game,scenario.answer,current.phase);
    content().innerHTML='<main class="marketTrainer">'+
      '<div class="marketTrainerTop"><button type="button" class="marketTrainerBack">'+esc(t("back"))+'</button><span class="marketTrainerProgress">'+esc(t("phase"))+' '+(current.phase+1)+' / '+g.scenarios.length+'</span></div>'+
      '<div class="marketScoreRow"><span class="marketScoreChip">⭐ '+esc(t("score"))+': '+current.score+'</span><span class="marketScoreChip">🏆 '+esc(t("record"))+': '+best(current.game)+'</span></div>'+
      '<section class="marketTrainerPanel"><h2>'+g.icon+' '+esc(t(g.title))+'</h2><div class="marketChartBox">'+chartSvg(candles,reveal)+'</div><p class="marketTrainerQuestion">'+esc(t("choose"))+'</p>'+
      '<div class="marketAnswers">'+answers.map(function(key){return '<button type="button" class="marketAnswer" data-answer="'+esc(key)+'">'+esc(t(key))+'</button>'}).join("")+'</div>'+
      '<div id="marketFeedback"></div></section></main>';
    content().querySelector(".marketTrainerBack").onclick=catalog;
    var buttons=content().querySelectorAll("[data-answer]");
    for(var i=0;i<buttons.length;i++)buttons[i].onclick=answer;
    window.scrollTo(0,0);
  }

  function answer(event){
    if(current.answered)return;
    current.answered=true;
    var g=GAMES[current.game],scenario=g.scenarios[current.phase],chosen=event.currentTarget.getAttribute("data-answer"),ok=chosen===scenario.answer;
    if(ok)current.score+=100;
    var buttons=content().querySelectorAll("[data-answer]");
    for(var i=0;i<buttons.length;i++){
      buttons[i].disabled=true;
      var key=buttons[i].getAttribute("data-answer");
      if(key===scenario.answer)buttons[i].classList.add("correct");
      else if(key===chosen)buttons[i].classList.add("wrong");
    }
    if(current.game==="trading-game"){
      var chart=content().querySelector(".marketChartBox");
      if(chart)chart.innerHTML=chartSvg(candlesFromCloses(scenario.closes),scenario.closes.length);
    }
    var last=current.phase>=g.scenarios.length-1;
    var fb=document.getElementById("marketFeedback");
    fb.innerHTML='<div class="marketFeedback"><strong>'+(ok?esc(t("correct")):esc(t("wrong")))+'</strong>'+
      (!ok?'<div>'+esc(t("yourAnswer"))+': '+esc(t(chosen))+' · '+esc(t("rightAnswer"))+': '+esc(t(scenario.answer))+'</div>':'')+
      '<div>'+esc(t(scenario.tip))+'</div></div>'+
      '<button type="button" class="marketNext">'+esc(t(last?"finish":"next"))+'</button>';
    fb.querySelector(".marketNext").onclick=function(){
      transition(function(){
        if(last)result();else{current.phase+=1;renderPhase()}
      });
    };
  }

  function transition(next){
    showExness(next);
  }

  function showExness(next){
    document.querySelector(".exnessTrainingOverlay")&&document.querySelector(".exnessTrainingOverlay").remove();
    var overlay=document.createElement("div");
    overlay.className="exnessTrainingOverlay";
    overlay.setAttribute("role","dialog");
    overlay.setAttribute("aria-modal","true");
    overlay.innerHTML='<section class="exnessTrainingCard"><div class="exnessTrainingBody">'+
      '<span class="exnessTrainingEyebrow">'+esc(t("exEyebrow"))+'</span><h2>'+esc(t("exTitle"))+'</h2><p>'+esc(t("exBody"))+'</p>'+
      '<div class="exnessTrainingActions"><button type="button" class="exnessTrainingCta">'+esc(t("exCta"))+'</button><button type="button" class="exnessTrainingContinue">'+esc(t("exContinue"))+'</button></div>'+
      '<small class="exnessTrainingDisclosure">'+esc(t("exDisclosure"))+'</small></div></section>';
    document.body.appendChild(overlay);
    overlay.querySelector(".exnessTrainingCta").onclick=function(){openUrl(EXNESS_URL)};
    overlay.querySelector(".exnessTrainingContinue").onclick=function(){overlay.remove();next()};
  }

  function result(){
    writeBest(current.game,current.score);
    var g=GAMES[current.game];
    content().innerHTML='<main class="marketTrainer"><section class="marketTrainerPanel marketTrainerResult"><div class="resultIcon">🏆</div><h2>'+esc(t("result"))+'</h2><p>'+esc(t(g.title))+' · '+esc(t("score"))+': <strong>'+current.score+'</strong> · '+esc(t("record"))+': <strong>'+best(current.game)+'</strong></p><button type="button" class="marketTrainerStart" data-again>'+esc(t("again"))+'</button><button type="button" class="marketTrainerBack" data-catalog style="width:100%;margin-top:9px">'+esc(t("catalog"))+'</button></section></main>';
    content().querySelector("[data-again]").onclick=function(){intro(current.game)};
    content().querySelector("[data-catalog]").onclick=catalog;
    window.scrollTo(0,0);
  }

  document.addEventListener("click",function(event){
    var button=event.target&&event.target.closest&&event.target.closest("[data-market-training-play]");
    if(!button)return;
    event.preventDefault();
    event.stopPropagation();
    event.stopImmediatePropagation&&event.stopImmediatePropagation();
    intro(button.getAttribute("data-market-training-play"));
  },true);

  var observer=new MutationObserver(function(){queueMicrotask(ensureCards)});
  observer.observe(document.documentElement,{childList:true,subtree:true});
  var tries=0,timer=setInterval(function(){
    tries+=1;
    ensureCards();
    if(tries>100)clearInterval(timer);
  },200);
  if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",ensureCards,{once:true});else ensureCards();

  window.EduCashProMarketTrainingGames={ensureCards:intro?ensureCards:ensureCards,open:intro,version:"2026.10.01.3"};
})();
