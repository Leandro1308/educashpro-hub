(function () {
  "use strict";

  const COURSE_ID = "analise_tecnica_completa";
  const EXNESS_URL = "https://one.exnessonelink.com/a/93bgo7jpfo/?campaign=43340";

  function normalizeLanguage(value) {
    const language = String(value || "pt").toLowerCase();
    return ["en", "es", "ru"].includes(language) ? language : "pt";
  }

  function escapeHtml(value) {
    return String(value || "").replace(/[&<>'"]/g, (char) => ({
      "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;",
    })[char]);
  }

  const FIGURE_PRICES = [
    [32,34,33,38,43,47,45,50,56,61,58,64,69,66,72,77,74,80,77,83],
    [42,46,44,49,45,52,48,55,51,58,54,61,57,65,60,68,63,71,67,74],
    [45,52,49,58,53,61,57,64,59,69,65,72,68,76,71,80,75,78,73,82],
    [28,35,42,39,48,55,51,62,58,69,64,73,68,62,55,49,43,38,34,31],
    [50,63,57,70,61,73,66,75,64,72,60,68,55,65,52,62,49,59,47,56],
    [30,35,42,39,47,53,49,59,55,64,60,69,64,74,70,79,74,84,79,88],
    [26,34,43,51,46,41,49,58,67,62,56,64,73,82,77,71,79,88,84,92],
    [30,45,57,68,64,59,61,63,62,65,66,64,67,72,78,85,82,88,93,96],
    [77,73,75,69,66,70,63,58,61,54,48,52,45,39,43,35,30,34,27,31],
    [31,36,42,49,55,61,58,63,68,72,69,75,80,77,84,88,85,91,94,97],
    [43,48,53,58,62,67,63,70,74,78,75,80,84,87,83,88,91,89,93,96],
    [33,37,42,48,53,59,55,62,67,73,69,76,81,78,85,89,86,92,95,98],
    [58,65,61,70,76,68,82,73,88,79,91,84,76,87,71,83,68,79,64,75],
    [46,48,47,49,48,50,49,51,50,52,51,53,52,54,68,82,73,76,71,74],
    [40,44,49,54,59,56,62,67,64,70,74,71,77,82,78,85,88,84,91,94],
    [35,41,47,53,50,57,63,59,67,72,68,76,81,78,86,90,87,93,96,94],
    [34,38,43,49,54,60,57,64,70,76,72,79,84,81,88,92,89,94,96,98],
    [30,37,43,50,56,52,61,68,64,73,79,75,84,89,85,92,95,91,97,99],
    [29,37,45,54,62,58,55,57,60,64,69,75,82,88,84,90,94,91,96,99],
    [44,49,46,53,57,55,61,66,63,70,68,74,79,76,82,86,83,89,92,95],
    [37,42,48,45,53,59,56,64,69,66,74,79,76,84,88,85,91,94,90,96],
  ];

  function chart(kind = "trend", chapter = 1, caption = "") {
    const values = FIGURE_PRICES[(chapter - 1) % FIGURE_PRICES.length];
    const W = 640, H = 300, left = 28, top = 24, plotH = 220, step = 28;
    const min = Math.min(...values) - 8, max = Math.max(...values) + 8;
    const y = (value) => top + (max - value) * plotH / (max - min);
    const closePoints = values.map((value, i) => `${left + i * step},${y(value)}`).join(" ");
    const ema = (period) => {
      const k = 2 / (period + 1); let current = values[0];
      return values.map((value, i) => { current = i ? value * k + current * (1 - k) : value; return `${left + i * step},${y(current)}`; }).join(" ");
    };
    const candles = values.map((close, i) => {
      const open = i ? values[i - 1] + ((i % 3) - 1) * 2 : close - 3;
      const high = Math.max(open, close) + 3 + (i % 2) * 2;
      const low = Math.min(open, close) - 3 - ((i + 1) % 3);
      const x = left + i * step, up = close >= open, color = up ? "#20c985" : "#ef4655";
      const bodyY = Math.min(y(open), y(close)), bodyH = Math.max(3, Math.abs(y(open) - y(close)));
      return `<line x1="${x}" y1="${y(high)}" x2="${x}" y2="${y(low)}" stroke="${color}" stroke-width="2"/><rect x="${x - 6}" y="${bodyY}" width="12" height="${bodyH}" rx="1.5" fill="${color}"/>`;
    }).join("");
    const line = (x1, y1, x2, y2, color = "#ffde02", dash = "") => `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${color}" stroke-width="3" ${dash ? `stroke-dasharray="${dash}"` : ""}/>`;
    let overlay = "";
    if ([1,4,6,7,12,19,21].includes(chapter)) overlay = `<polyline points="${closePoints}" fill="none" stroke="#46a6ff" stroke-width="4" stroke-linejoin="round" opacity=".78"/><path d="M72 230 L185 130 L165 135 M185 130 L180 151 M205 145 L275 205 L261 198 M275 205 L270 186 M300 190 L430 75 L407 82 M430 75 L424 98" fill="none" stroke="#ffde02" stroke-width="5"/>`;
    if ([2,3].includes(chapter)) overlay = `<g opacity=".95">${line(118,50,118,238,"#f8f9fa")}${line(86,112,150,112,"#f8f9fa")}${line(282,72,282,236,"#f8f9fa")}${line(250,145,314,145,"#f8f9fa")}<circle cx="118" cy="112" r="36" fill="none" stroke="#ffde02" stroke-width="3"/><circle cx="282" cy="145" r="36" fill="none" stroke="#ffde02" stroke-width="3"/></g>`;
    if ([5,14].includes(chapter)) overlay = `<rect x="20" y="58" width="570" height="38" fill="#ef4655" opacity=".14" stroke="#ef4655" stroke-width="2"/><rect x="20" y="208" width="570" height="38" fill="#20c985" opacity=".14" stroke="#20c985" stroke-width="2"/>${line(20,77,590,77,"#ef4655","10 8")}${line(20,227,590,227,"#20c985","10 8")}`;
    if (chapter === 8) overlay = `<path d="M180 207 L285 100 L390 207 Z" fill="#20c985" opacity=".16" stroke="#20c985" stroke-width="3"/><path d="M395 105 L490 128 L395 180 Z" fill="#ffde02" opacity=".16" stroke="#ffde02" stroke-width="3"/>`;
    if ([9,11,20].includes(chapter)) overlay = `<g opacity=".75">${values.map((v,i)=>`<rect x="${left+i*step-6}" y="${250-(i%5)*8}" width="12" height="${22+(i%5)*8}" fill="#41d9dc"/>`).join("")}</g><polyline points="${ema(5)}" fill="none" stroke="#ffde02" stroke-width="4"/><polyline points="${ema(10)}" fill="none" stroke="#a870ff" stroke-width="4"/>`;
    if (chapter === 10) overlay = `<polyline points="${ema(4)}" fill="none" stroke="#ffde02" stroke-width="5"/><polyline points="${ema(9)}" fill="none" stroke="#61a8ff" stroke-width="5"/><circle cx="365" cy="${y(values[12])}" r="16" fill="none" stroke="#fff" stroke-width="3"/>`;
    if ([13,15,16,17,18].includes(chapter)) overlay = `<rect x="344" y="44" width="236" height="62" fill="#20c985" opacity=".17" stroke="#20c985" stroke-width="2"/><rect x="344" y="106" width="236" height="32" fill="#ffde02" opacity=".18" stroke="#ffde02" stroke-width="2"/><rect x="344" y="138" width="236" height="72" fill="#ef4655" opacity=".15" stroke="#ef4655" stroke-width="2"/>${line(330,106,590,106,"#20c985")}${line(330,138,590,138,"#ffde02")}${line(330,210,590,210,"#ef4655")}`;
    return `<figure class="taFigure"><svg viewBox="0 0 ${W} ${H}" role="img" aria-label="${escapeHtml(caption)}" xmlns="http://www.w3.org/2000/svg"><defs><pattern id="grid${chapter}" width="40" height="40" patternUnits="userSpaceOnUse"><path d="M40 0H0V40" fill="none" stroke="#ffffff" stroke-opacity=".055"/></pattern><linearGradient id="fade${chapter}" x1="0" x2="0" y1="0" y2="1"><stop stop-color="#101923"/><stop offset="1" stop-color="#080b0f"/></linearGradient></defs><rect width="640" height="300" rx="18" fill="url(#fade${chapter})"/><rect width="640" height="300" rx="18" fill="url(#grid${chapter})"/>${candles}${overlay}<g fill="#9ba8b8" font-family="system-ui,sans-serif" font-size="12"><text x="596" y="45">H</text><text x="596" y="148">M</text><text x="596" y="242">L</text></g></svg><figcaption>${escapeHtml(caption)}</figcaption></figure>`;
  }

  function lessonBody(lesson, labels) {
    const paragraphs = lesson.p.map((text) => `<p>${escapeHtml(text)}</p>`).join("");
    const bullets = lesson.b?.length
      ? `<h4>${escapeHtml(labels.keyPoints)}</h4><ul>${lesson.b.map((text) => `<li>${escapeHtml(text)}</li>`).join("")}</ul>`
      : "";
    const example = lesson.e
      ? `<div class="taExample"><strong>${escapeHtml(labels.example)}</strong><p>${escapeHtml(lesson.e)}</p></div>`
      : "";
    const warning = lesson.w
      ? `<div class="taWarning"><strong>${escapeHtml(labels.warning)}</strong><p>${escapeHtml(lesson.w)}</p></div>`
      : "";
    return `${chart(lesson.v, lesson.index, lesson.t)}${paragraphs}${bullets}${example}${warning}`;
  }

  const DATA = {
    pt: {
      title: "Análise Técnica Completa",
      home: "<p>Uma formação progressiva para compreender o gráfico, reconhecer contextos e transformar observações em decisões com risco controlado. O curso parte dos fundamentos e chega à análise do XAUUSD, às estratégias, ao backtest e ao plano de operação em conta demonstrativa.</p><p>Análise técnica trabalha com probabilidades, não com certezas. Nenhum candle, indicador ou padrão garante resultado. O objetivo é aprender a construir cenários, definir previamente onde a ideia deixa de ser válida e proteger o capital.</p>",
      labels: { keyPoints: "Pontos essenciais", example: "Exemplo", warning: "Atenção" },
      partner: {
        eyebrow: "PRATIQUE COM RESPONSABILIDADE",
        title: "Teste primeiro em uma conta demonstrativa",
        text: "Abra a plataforma da Exness pelo link do parceiro EduCashPro. O cadastro e a verificação acontecem diretamente no ambiente seguro da Exness.",
        button: "CADASTRE-SE",
        disclosure: "Link de parceiro. CFDs envolvem alto risco e podem gerar perdas. Este conteúdo é educacional e não constitui recomendação de investimento.",
        url: EXNESS_URL,
      },
      lessons: [
        { t: "O que a análise técnica realmente faz", v: "trend", p: ["Análise técnica estuda preço, tempo e, quando disponível, volume. Ela não tenta adivinhar o futuro; organiza evidências para construir cenários mais prováveis e definir uma resposta caso o mercado faça algo diferente.", "O gráfico resume decisões de compradores e vendedores. A leitura se torna útil quando contexto, ponto de entrada, invalidação, objetivo e tamanho da posição são definidos antes da ordem."], b: ["Probabilidade substitui certeza.", "Contexto vale mais que um sinal isolado.", "Risco é definido antes do possível lucro."], e: "Em tendência de alta, uma retração até uma região defendida pode oferecer melhor relação risco-retorno do que comprar depois de uma vela já muito estendida.", w: "Não confunda análise com previsão garantida. Mesmo uma leitura tecnicamente correta pode terminar em stop." },
        { t: "Gráfico, preço e períodos", v: "candle", p: ["Cada candle reúne abertura, máxima, mínima e fechamento de um intervalo. No gráfico de 5 minutos, cada candle resume cinco minutos; no de 1 hora, resume sessenta. O mesmo ativo pode parecer comprador em um período e vendedor em outro.", "Períodos maiores mostram estrutura e direção; períodos menores mostram detalhes da execução. A escolha deve acompanhar o tempo que a operação pretende permanecer aberta."], b: ["Use 1h para contexto, 5min para montagem e 1min para precisão apenas quando necessário.", "Espere o fechamento do candle para confirmar informações dependentes do fechamento.", "Mantenha fuso horário e sessão da plataforma conhecidos."], e: "Uma queda no 1 minuto pode ser apenas uma retração pequena dentro de uma tendência de alta no gráfico de 1 hora.", w: "Trocar de período até encontrar um sinal favorável cria viés de confirmação." },
        { t: "Anatomia dos candles", v: "candle", p: ["O corpo mostra a distância entre abertura e fechamento. As sombras mostram preços visitados e rejeitados durante o período. Corpo amplo sugere deslocamento; sombra longa sugere reação, mas nenhum formato deve ser lido fora do local onde apareceu.", "Um candle de rejeição em suporte tem significado diferente do mesmo candle no meio de uma lateralização. A confirmação pode vir pela ruptura da máxima ou mínima, pelo fechamento seguinte e pela estrutura ao redor."], b: ["Cor informa direção do fechamento, não força absoluta.", "Sombras revelam teste e reação.", "Localização e sequência dão sentido ao padrão."], e: "Um pin bar comprador após varrer um fundo relevante ganha força se o candle seguinte fechar acima de sua máxima.", w: "Memorizar nomes de candles sem estudar contexto produz muitos sinais falsos." },
        { t: "Estrutura: tendência e lateralização", v: "trend", p: ["Tendência de alta apresenta, de forma geral, topos e fundos ascendentes; tendência de baixa apresenta topos e fundos descendentes. Quando o preço alterna dentro de limites sem progressão, existe lateralização.", "A estrutura muda quando um ponto relevante é rompido e o mercado passa a aceitar preços do outro lado. Uma única perfuração por sombra pode ser apenas varredura; fechamentos e continuidade ajudam a avaliar aceitação."], b: ["Marque os últimos impulsos e retrações visíveis.", "Diferencie rompimento estrutural de ruído interno.", "Não aplique estratégia de tendência em faixa estreita."], e: "Após romper o último fundo ascendente e falhar na retomada, uma tendência de alta pode estar entrando em transição.", w: "Topo ou fundo só é relevante quando gerou deslocamento perceptível." },
        { t: "Suporte, resistência e zonas", v: "range", p: ["Suporte é uma região onde a demanda anteriormente superou a oferta; resistência é onde a oferta superou a demanda. São áreas, não linhas perfeitamente exatas, porque ordens ficam distribuídas em diferentes preços.", "Priorize regiões com reação clara, múltiplos testes espaçados, origem de impulso ou coincidência com estrutura maior. Quanto mais vezes uma zona é tocada sem afastamento, maior pode ser seu desgaste."], b: ["Marque zonas no período maior.", "Refine a entrada no período menor.", "Observe aproximação, rejeição e aceitação."], e: "Se o preço chega lentamente a uma resistência e começa a fechar acima dela, a chance de rompimento pode ser maior do que após uma rejeição rápida.", w: "Encher o gráfico de linhas torna qualquer movimento aparentemente previsível." },
        { t: "Linhas de tendência e canais", v: "trend", p: ["Uma linha de tendência conecta fundos ascendentes numa alta ou topos descendentes numa baixa. Ela representa ritmo, não uma barreira infalível. Um canal adiciona uma linha paralela para observar a amplitude do movimento.", "Dê preferência a pontos claros e não force a linha para atravessar corpos apenas para ajustar uma narrativa. A quebra da linha é alerta de perda de ritmo; a estrutura confirma ou rejeita uma reversão."], b: ["Dois pontos desenham; o terceiro ajuda a validar.", "Inclinação excessiva tende a ser menos sustentável.", "Combine linha com estrutura horizontal."], e: "A quebra de uma linha de alta, seguida de topo mais baixo e rompimento do fundo, é mais relevante que a quebra isolada.", w: "Linha de tendência não substitui stop nem análise estrutural." },
        { t: "Price Action e leitura da sequência", v: "candle", p: ["Price Action é a leitura do comportamento do preço por estrutura, deslocamento, retração, rejeição e fechamento. O foco não está em um candle mágico, mas na relação entre movimentos consecutivos.", "Impulsos fortes e retrações fracas favorecem continuidade. Impulsos que perdem alcance, sombras contra a direção e rompimentos sem continuidade podem indicar exaustão ou equilíbrio."], b: ["Compare amplitude dos impulsos.", "Observe profundidade e velocidade das retrações.", "Leia reação ao chegar em uma zona importante."], e: "Numa alta, candles compradores amplos seguidos de uma retração lenta e curta mostram controle comprador enquanto o último fundo permanecer protegido.", w: "Entrar somente pela cor do candle ignora estrutura, localização e risco." },
        { t: "Padrões de candles e gráficos", v: "candle", p: ["Engolfo, pin bar, inside bar e doji descrevem comportamentos locais. Triângulos, bandeiras, canais e ombro-cabeça-ombro descrevem organização do preço em uma área maior. Eles servem como hipóteses, não como ordens automáticas.", "Valide um padrão pela tendência anterior, região, volume, forma do rompimento e espaço até o próximo obstáculo. O alvo projetado nunca elimina a necessidade de gerenciamento."], b: ["Espere confirmação coerente com o padrão.", "Avalie o espaço livre antes da entrada.", "Descarte formações deformadas ou no meio do ruído."], e: "Uma bandeira após impulso comprador é mais consistente quando retrai com candles menores e rompe a favor do impulso com fechamento.", w: "Dar nome a qualquer desenho aumenta a subjetividade e reduz a qualidade do teste." },
        { t: "Volume, volatilidade e liquidez", v: "indicator", p: ["Volume mostra atividade negociada quando a fonte fornece volume real; no Forex e em muitos CFDs, pode ser volume de ticks. Volatilidade mede quanto o preço se desloca. Liquidez representa facilidade de execução e concentração de ordens.", "Rompimentos acompanhados de expansão de atividade e alcance tendem a merecer mais atenção. Máximas, mínimas, números redondos e extremos de sessão podem concentrar stops e provocar movimentos rápidos."], b: ["Saiba qual tipo de volume a plataforma mostra.", "Adapte stop e lote à volatilidade.", "Evite perseguir o preço depois de uma expansão extrema."], e: "No XAUUSD, uma varredura da máxima da sessão seguida de retorno e fechamento abaixo pode sinalizar rejeição, desde que a estrutura confirme.", w: "Liquidez não significa que o mercado obrigatoriamente reverterá após atingir um nível." },
        { t: "Médias móveis: EMA 9 e EMA 20", v: "indicator", p: ["A EMA dá maior peso aos preços recentes. A EMA 9 reage mais rápido; a EMA 20 representa um ritmo um pouco mais amplo. Alinhamento e inclinação ajudam a visualizar tendência, enquanto cruzamentos sozinhos chegam atrasados e falham em lateralizações.", "Use as médias como filtro e área dinâmica, não como gatilho único. Preço, estrutura e fechamento precisam concordar. Médias planas e cruzamentos repetidos indicam ausência de direção."], b: ["EMA 9 acima da EMA 20 favorece contexto comprador quando ambas sobem.", "Procure retração organizada, não entrada estendida.", "Teste regras em conta Demo antes de confiar nelas."], e: "Em alta no 5min, o preço recua às médias, preserva o fundo e fecha novamente acima da EMA 9: isso pode formar um cenário, não uma garantia.", w: "O cruzamento é alerta, não ordem. Defina invalidação pela estrutura." },
        { t: "RSI, MACD e ATR", v: "indicator", p: ["RSI mede velocidade relativa do movimento; sobrecompra não obriga queda e sobrevenda não obriga alta. MACD compara médias e ajuda a observar direção e momentum. ATR mede amplitude média e auxilia no ajuste do stop e da expectativa de movimento.", "Indicadores derivam do preço e não enxergam o futuro. Escolha poucos, com funções diferentes, para evitar várias versões da mesma informação."], b: ["Use RSI para contexto e divergência com confirmação.", "Use MACD para momentum, não como botão de entrada.", "Use ATR para adequar distância e tamanho da posição."], e: "Um stop de distância fixa pode ser inadequado quando o ATR dobra após uma notícia; reduzir a posição mantém o risco financeiro controlado.", w: "Adicionar indicadores até todos concordarem costuma gerar entradas atrasadas." },
        { t: "Análise em múltiplos períodos", v: "trend", p: ["A análise descendente começa no período maior e termina no menor. No 1h, identifique estrutura, zonas e direção. No 5min, espere o preço chegar ao local planejado e formar o cenário. No 1min, refine a execução sem contrariar o plano maior.", "Cada período deve responder a uma pergunta específica. Se o período menor ficar confuso, a entrada pode ser tomada no 5min com risco ajustado ou simplesmente descartada."], b: ["1h: onde e para que lado?", "5min: qual formação confirma?", "1min: onde executar com invalidação objetiva?"], e: "O 1h está comprador e o 5min retrai ao suporte; no 1min surge quebra de microestrutura para cima. As três informações formam confluência.", w: "Usar o 1min sem direção maior aumenta exposição ao ruído." },
        { t: "XAUUSD: características do ouro", v: "risk", p: ["XAUUSD representa o preço do ouro em dólares e costuma reagir a juros, dólar, inflação, risco geopolítico e expectativas de política monetária. Sua volatilidade pode aumentar rapidamente, com spreads e execução diferentes entre sessões e notícias.", "O ouro exige cuidado com tamanho da posição. Um movimento aparentemente pequeno em dólares pode representar impacto financeiro relevante conforme o contrato da corretora. Consulte especificações, tamanho do lote e valor do ponto na própria plataforma."], b: ["Observe máxima e mínima do dia anterior.", "Marque abertura e extremos das principais sessões.", "Confira calendário econômico antes de operar."], e: "Antes de uma divulgação importante dos Estados Unidos, o XAUUSD pode reduzir liquidez e depois expandir violentamente em ambas as direções.", w: "Nunca reutilize automaticamente o mesmo lote de outro ativo no ouro." },
        { t: "Sessões, notícias, spread e execução", v: "range", p: ["A atividade muda ao longo do dia. A sobreposição entre Londres e Nova York frequentemente aumenta liquidez e movimento, enquanto horários de transição podem apresentar spread maior. Notícias de alto impacto podem gerar gaps, slippage e rejeição de preço.", "Spread é a diferença entre compra e venda; slippage é a diferença entre o preço solicitado e o executado. Ambos fazem parte do custo real e precisam ser registrados no backtest e no diário."], b: ["Evite entrada segundos antes de notícia relevante.", "Verifique spread antes de enviar ordem.", "Não alargue o stop após a entrada para fugir da perda."], e: "Uma estratégia rentável em candles pode deixar de ser rentável quando spread e slippage são ignorados.", w: "Stop reduz risco, mas não garante execução exatamente no preço em mercados rápidos." },
        { t: "Ordens e construção da entrada", v: "risk", p: ["Ordem a mercado busca execução imediata; ordem limitada procura preço melhor; ordem stop entra após rompimento. A escolha deve corresponder à lógica da estratégia e não à ansiedade do operador.", "Uma entrada completa contém contexto, gatilho, preço, stop, alvo, tamanho e condição de cancelamento. Se algum item não estiver claro, ainda não existe plano executável."], b: ["Mercado: confirmação imediata com possível slippage.", "Limitada: preço planejado sem garantia de execução.", "Stop: confirmação por rompimento com risco de falso rompimento."], e: "Uma buy limit em suporte deve ser cancelada se a estrutura se deteriorar antes de o preço chegar.", w: "Ordem pendente esquecida pode ser acionada num contexto que já não existe." },
        { t: "Confluência sem excesso de sinais", v: "indicator", p: ["Confluência é a reunião de evidências independentes: estrutura maior, zona, comportamento do preço, momento da sessão e risco favorável. Cinco indicadores derivados do mesmo preço não representam cinco confirmações independentes.", "Crie uma lista curta de requisitos obrigatórios e opcionais. Isso reduz decisões emocionais e permite comparar operações no diário."], b: ["Direção do período maior.", "Localização relevante.", "Gatilho visível e invalidação próxima.", "Espaço suficiente até o alvo."], e: "Tendência de alta no 1h, suporte no 5min e quebra de microtopo no 1min são evidências diferentes e coerentes.", w: "Exigir confirmação demais pode atrasar a entrada; use regras definidas e testadas." },
        { t: "Stop-loss, alvo e gestão da posição", v: "risk", p: ["O stop deve ficar onde a hipótese técnica deixa de ser válida, acrescido de margem coerente com a volatilidade. O alvo deve considerar estrutura, liquidez e relação risco-retorno. A distância do stop determina o tamanho da posição, e não o contrário.", "Mover para breakeven, realizar parcial ou usar trailing stop precisa fazer parte de uma regra testada. Alterar a gestão no meio da operação por medo distorce resultados."], b: ["Stop técnico antes do cálculo do lote.", "Alvo realista antes da ordem.", "Regra de saída definida para cenários favoráveis e adversos."], e: "Se o stop precisa ser duas vezes maior por causa da volatilidade, o lote deve ser aproximadamente reduzido pela metade para manter o risco.", w: "Stop mental não protege quando o operador congela ou perde conexão." },
        { t: "Risco, lote e relação risco-retorno", v: "risk", p: ["Risco por operação é a parcela do capital aceita como perda caso o stop seja atingido. Para iniciantes, percentuais pequenos tornam a sequência de aprendizado mais resistente. O cálculo depende do saldo, percentual de risco, distância do stop e valor do ponto.", "Relação 1:2 significa arriscar uma unidade para buscar duas, mas não garante vantagem. Taxa de acerto e ganho médio precisam ser avaliados em conjunto. Uma estratégia pode acertar menos e ainda ser positiva se ganhos superarem perdas."], b: ["Risco financeiro = saldo × percentual.", "Lote = risco financeiro ÷ custo do stop.", "Limite diário impede escalada emocional."], e: "Com saldo de 1.000 e risco de 0,5%, a perda planejada é 5. O lote deve fazer o stop técnico equivaler aproximadamente a esse valor.", w: "Nunca aumente o lote para recuperar uma perda anterior." },
        { t: "Três estratégias estruturadas", v: "trend", p: ["Continuação de tendência: contexto direcional, retração a zona ou médias e retomada confirmada. Rompimento: compressão, nível claro, fechamento além da área e possível reteste. Reversão: extremo relevante, falha de continuidade e mudança de estrutura.", "Escolha uma estratégia por vez e descreva regras objetivas. Misturar critérios de várias estratégias impede saber o que realmente funciona."], b: ["Defina mercado e horário.", "Especifique todos os gatilhos e filtros.", "Registre também os sinais descartados."], e: "No início, teste apenas retração em tendência com EMA 9/20 durante uma sessão definida por pelo menos 30 ocorrências.", w: "Reversão contra tendência costuma exigir confirmação mais forte e risco menor." },
        { t: "Backtest, Demo e diário", v: "indicator", p: ["Backtest aplica regras a dados anteriores sem escolher apenas exemplos bonitos. Depois, o teste em Demo observa execução, spread e comportamento em tempo real. Só uma amostra suficiente permite estimar taxa de acerto, payoff, sequência de perdas e drawdown.", "O diário deve guardar imagem antes e depois, motivo, horário, risco, custos, resultado em unidades de risco e estado emocional. A revisão procura padrões de execução, não culpados."], b: ["Use no mínimo dezenas de ocorrências comparáveis.", "Não altere regras no meio da amostra.", "Separe erro operacional de perda normal da estratégia."], e: "Uma perda seguindo todas as regras é custo estatístico; uma vitória violando regras pode reforçar um hábito perigoso.", w: "Resultado positivo em poucos trades pode ser acaso." },
        { t: "Psicologia e plano operacional", v: "risk", p: ["Disciplina é facilitar a execução correta por meio de regras, limites e rotina. Medo, euforia e desejo de recuperar perdas crescem quando o risco é alto ou o plano é vago. Reduzir lote e número de decisões melhora clareza.", "O plano final deve definir ativos, sessões, estratégia, filtros, risco, limite diário, processo de registro e condições para não operar. Comece em Demo e só considere capital real depois de consistência operacional e compreensão integral dos riscos."], b: ["Checklist antes, durante e depois.", "Parada obrigatória no limite diário.", "Revisão semanal baseada em dados.", "Nenhuma migração automática da Demo para conta real."], e: "Plano inicial: XAUUSD, Londres/Nova York, contexto 1h, montagem 5min, entrada 1min, uma estratégia, risco simulado de 0,5% e máximo de duas perdas no dia.", w: "Consistência não elimina perdas. Ela impede que uma perda planejada se transforme em dano descontrolado." },
      ],
    },
    en: {
      title: "Complete Technical Analysis",
      home: "<p>A progressive course for reading charts, recognizing market conditions and turning observations into decisions with controlled risk. It covers foundations, XAUUSD, strategies, backtesting and a Demo-account operating plan.</p><p>Technical analysis works with probabilities, not certainty. No candle, indicator or pattern guarantees a result. Always define invalidation and protect capital.</p>",
      labels: { keyPoints: "Key points", example: "Example", warning: "Warning" },
      partner: { eyebrow: "PRACTICE RESPONSIBLY", title: "Start with a Demo account", text: "Open Exness through the EduCashPro partner link. Registration and verification take place directly in Exness's secure environment.", button: "SIGN UP", disclosure: "Partner link. CFDs carry a high risk of loss. Educational content only; not investment advice.", url: EXNESS_URL },
      lessons: [
        ["What technical analysis really does","Technical analysis studies price, time and available volume to build scenarios, not guaranteed predictions.","Context, entry, invalidation, target and position size must be known before an order.","Probability replaces certainty|Context matters more than one signal|Risk comes before reward","A pullback into defended support may offer better risk than chasing an extended candle.","A valid setup can still reach its stop.","trend"],
        ["Charts, price and timeframes","A candle contains open, high, low and close for a selected interval. Different timeframes reveal different parts of the same auction.","Use higher periods for direction and lower periods for execution detail.","1h for context, 5m for setup, 1m only for precision|Wait for candle close when the rule depends on it|Know platform time and sessions","A 1-minute decline can be a small pullback inside a 1-hour uptrend.","Do not change timeframes until one agrees with your bias.","candle"],
        ["Candle anatomy","Bodies show the open-to-close move; wicks show prices tested during the period. Shape only gains meaning from location and sequence.","Confirmation can come from the next close, a break of the candle extreme and surrounding structure.","Color is not absolute strength|Wicks show tests and reactions|Location gives meaning","A bullish rejection after sweeping support is stronger if the next candle closes above its high.","Memorized candle names without context create false signals.","candle"],
        ["Structure: trend and range","Higher highs and higher lows describe an uptrend; lower highs and lower lows describe a downtrend. Repeated movement between boundaries is a range.","A meaningful structural change needs a relevant break and acceptance, not only a wick.","Mark visible impulses and pullbacks|Separate structural breaks from internal noise|Match the strategy to the environment","Breaking the last protected higher low and failing to recover may signal transition.","A swing matters when it produced visible displacement.","trend"],
        ["Support, resistance and zones","Support and resistance are areas where supply-demand balance changed before. Treat them as zones rather than perfect lines.","Prioritize clear reactions, impulse origins and higher-timeframe agreement; repeated weak touches may consume a level.","Mark on the higher timeframe|Refine on the lower timeframe|Read approach, rejection and acceptance","Slow acceptance above resistance differs from immediate rejection.","Too many lines make every move look predictable.","range"],
        ["Trendlines and channels","Trendlines describe the rhythm of rising lows or falling highs; a parallel line creates a channel.","A line break warns about lost rhythm, while structure decides whether a reversal is confirmed.","Two points draw, a third helps validate|Steep lines are less sustainable|Combine diagonal and horizontal structure","Line break plus lower high and lower-low break is stronger than a line break alone.","Never force a line through price to support a story.","trend"],
        ["Price Action","Price Action reads structure, displacement, pullback, rejection and closes as a sequence rather than searching for a magic candle.","Strong impulses with shallow, slow pullbacks favor continuation; fading reach and failed breaks may show balance.","Compare impulse size|Measure pullback depth and speed|Read reactions at planned zones","Large bullish candles followed by a controlled pullback show buyer control while structure holds.","Candle color alone is not an entry rule.","candle"],
        ["Candle and chart patterns","Engulfing bars, pin bars, inside bars, flags, triangles and head-and-shoulders are hypotheses that need context.","Validate prior trend, location, breakout quality, available space and costs.","Wait for coherent confirmation|Check space to the next obstacle|Reject distorted patterns","A flag is clearer when the correction is smaller than the impulse and breaks with a close.","A named shape is not automatically tradable.","candle"],
        ["Volume, volatility and liquidity","Volume shows activity; in many CFDs it may be tick volume. Volatility describes range, and liquidity affects execution.","Session highs, lows and round numbers may hold clustered orders and produce fast sweeps.","Know the volume source|Adapt stop and size to volatility|Do not chase expansion","A sweep of a session high followed by acceptance below may show rejection when structure confirms.","A liquidity touch does not guarantee reversal.","indicator"],
        ["EMA 9 and EMA 20","The faster EMA 9 and slower EMA 20 help visualize recent rhythm. Alignment and slope matter more than a crossover alone.","Use them as filters or dynamic areas with structure; flat, repeatedly crossing averages indicate range.","Rising 9 above rising 20 supports bullish context|Prefer an organized pullback|Test in Demo","Price pulls back into the EMAs, holds structure and closes back above EMA 9.","A crossover is an alert, not an order.","indicator"],
        ["RSI, MACD and ATR","RSI measures relative speed, MACD helps observe momentum, and ATR measures average range.","Indicators derive from price. Use a small set with different functions.","Overbought is not an automatic sell|MACD is not an entry button|ATR helps normalize risk","When ATR doubles, a wider technical stop requires a smaller position.","Stacking similar indicators delays decisions.","indicator"],
        ["Multiple-timeframe analysis","Start with 1h structure and zones, use 5m for the setup, and use 1m only to refine an objective entry.","Each timeframe must answer a defined question; discard the trade when the picture does not align.","1h: where and which direction?|5m: what setup confirms?|1m: where is execution invalidated?","Bullish 1h, 5m pullback to support and 1m microstructure break create confluence.","The 1m chart without context amplifies noise.","trend"],
        ["XAUUSD characteristics","Gold reacts to rates, the dollar, inflation, geopolitical risk and monetary-policy expectations. Volatility can change abruptly.","Check contract size, point value and symbol specifications on the broker platform before sizing.","Mark previous-day high and low|Track session extremes|Check the economic calendar","US data can trigger rapid expansion in both directions.","Never reuse another asset's lot size automatically on gold.","risk"],
        ["Sessions, news, spread and execution","Liquidity changes through the day. London-New York overlap can be active; major news can increase spread and slippage.","Spread and slippage are real strategy costs and belong in testing and journaling.","Avoid seconds before high-impact news|Check spread before entry|Do not widen a stop from fear","A candle-profitable strategy may fail after realistic costs.","Stops cannot guarantee the exact fill price in fast markets.","range"],
        ["Orders and entry construction","Market, limit and stop orders serve different logic. Choose by strategy, not urgency.","A complete entry defines context, trigger, price, stop, target, size and cancellation condition.","Market: immediate with slippage risk|Limit: planned price without fill guarantee|Stop: breakout confirmation with false-break risk","Cancel a support limit order when structure deteriorates before price arrives.","Forgotten pending orders may trigger in an obsolete context.","risk"],
        ["Confluence","Confluence combines independent evidence: higher-timeframe structure, location, price behavior, session and favorable risk.","Build a short checklist. Multiple indicators derived from the same price are not independent confirmations.","Direction|Relevant location|Visible trigger and invalidation|Room to target","1h trend, 5m support and 1m structure shift are different coherent inputs.","Too many confirmations can make entries late.","indicator"],
        ["Stop, target and management","Place the stop where the thesis is invalid, adjusted for volatility. Set a realistic target from structure and liquidity.","Breakeven, partial exits and trailing require tested rules; position size adapts to stop distance.","Technical stop first|Target before order|Rules for favorable and adverse paths","Twice the stop distance generally requires about half the size for equal money risk.","A mental stop may fail under stress or disconnection.","risk"],
        ["Risk, size and reward","Risk per trade is the accepted account loss at the stop. Small percentages protect the learning process.","Evaluate win rate together with average win/loss. A 1:2 target does not create an edge by itself.","Money risk = balance × percentage|Size = money risk ÷ stop cost|Use a daily loss limit","On 1,000 with 0.5% risk, planned loss is 5; size the technical stop near that amount.","Never increase size to recover a loss.","risk"],
        ["Three structured strategies","Trend continuation uses direction, pullback and resumption. Breakout uses compression, close and retest. Reversal requires failure and structural change.","Test one rule set at a time and record rejected signals too.","Define market and session|Specify every trigger|Keep one strategy per sample","Test EMA 9/20 trend pullbacks for at least 30 comparable occurrences.","Countertrend reversals need stronger confirmation.","trend"],
        ["Backtest, Demo and journal","Backtest without cherry-picking, then use Demo to observe execution, spread and behavior. Record screenshots, risk, costs and result in R.","Use enough comparable samples to estimate win rate, payoff, losing sequences and drawdown before judging a rule.","Use dozens of comparable samples|Do not change rules mid-sample|Separate execution error from normal loss","A rule-following loss is statistical cost; a rule-breaking win can reinforce dangerous behavior.","A short winning streak may be luck.","indicator"],
        ["Psychology and operating plan","Discipline comes from clear rules, small risk, decision limits and a repeatable routine. Fear and revenge trading grow when size is excessive or the plan is vague.","Define instrument, session, strategy, filters, risk, daily limit, journal and no-trade conditions. Real funds are never an automatic next step after Demo.","Use a before-during-after checklist|Stop at the daily loss limit|Review weekly with data|Do not rush from Demo to real funds","Initial plan: XAUUSD, 1h context, 5m setup, 1m refinement, one tested strategy and a maximum daily loss.","Consistency never eliminates losses; it prevents a planned loss from becoming uncontrolled damage.","risk"],
      ],
    },
  };

  function translateCompact(source, language) {
    const dictionaries = {
      es: {
        title: "Análisis Técnico Completo",
        home: "<p>Formación progresiva para leer gráficos, reconocer contextos y convertir observaciones en decisiones con riesgo controlado. Incluye fundamentos, XAUUSD, estrategias, backtest y plan en cuenta Demo.</p><p>El análisis técnico trabaja con probabilidades. Ninguna vela, indicador o patrón garantiza resultados.</p>",
        labels: { keyPoints: "Puntos esenciales", example: "Ejemplo", warning: "Atención" },
        partner: { eyebrow: "PRACTICA CON RESPONSABILIDAD", title: "Comienza con una cuenta Demo", text: "Abre Exness mediante el enlace de socio de EduCashPro. El registro y la verificación ocurren directamente en el entorno seguro de Exness.", button: "REGÍSTRATE", disclosure: "Enlace de socio. Los CFD implican alto riesgo de pérdida. Contenido educativo; no es asesoramiento de inversión.", url: EXNESS_URL },
      },
      ru: {
        title: "Полный курс технического анализа",
        home: "<p>Последовательный курс по чтению графика, определению рыночного контекста и принятию решений с контролируемым риском. Включает основы, XAUUSD, стратегии, бэктест и план работы на демо-счёте.</p><p>Технический анализ основан на вероятностях. Ни одна свеча, фигура или индикатор не гарантирует результат.</p>",
        labels: { keyPoints: "Главное", example: "Пример", warning: "Внимание" },
        partner: { eyebrow: "ТРЕНИРУЙТЕСЬ ОТВЕТСТВЕННО", title: "Начните с демо-счёта", text: "Откройте Exness по партнёрской ссылке EduCashPro. Регистрация и проверка проходят непосредственно в защищённой среде Exness.", button: "ЗАРЕГИСТРИРОВАТЬСЯ", disclosure: "Партнёрская ссылка. CFD связаны с высоким риском потерь. Материал носит образовательный характер и не является инвестиционной рекомендацией.", url: EXNESS_URL },
      },
    };
    const translated = dictionaries[language];
    const lessonTitles = language === "es"
      ? ["Qué hace realmente el análisis técnico","Gráficos, precio y temporalidades","Anatomía de las velas","Estructura: tendencia y rango","Soporte, resistencia y zonas","Líneas de tendencia y canales","Price Action","Patrones de velas y gráficos","Volumen, volatilidad y liquidez","EMA 9 y EMA 20","RSI, MACD y ATR","Análisis multitemporal","Características del XAUUSD","Sesiones, noticias, spread y ejecución","Órdenes y construcción de la entrada","Confluencia","Stop, objetivo y gestión","Riesgo, tamaño y retorno","Tres estrategias estructuradas","Backtest, Demo y diario","Psicología y plan operativo"]
      : ["Что делает технический анализ","График, цена и таймфреймы","Строение свечи","Структура: тренд и диапазон","Поддержка, сопротивление и зоны","Линии тренда и каналы","Price Action","Свечные и графические модели","Объём, волатильность и ликвидность","EMA 9 и EMA 20","RSI, MACD и ATR","Анализ нескольких таймфреймов","Особенности XAUUSD","Сессии, новости, спред и исполнение","Ордера и построение входа","Совпадение факторов","Стоп, цель и управление","Риск, объём и доходность","Три структурированные стратегии","Бэктест, демо и дневник","Психология и торговый план"];
    const common = language === "es"
      ? {
          p1: "Estudia este tema junto con estructura, ubicación, volatilidad y riesgo. Una señal aislada no constituye una operación completa.",
          p2: "Define antes de entrar el escenario, la invalidación, el objetivo y el tamaño. Registra el resultado para comprobar la regla con una muestra suficiente.",
          b: ["Usa contexto de 1h.", "Confirma la formación en 5min.", "Utiliza 1min solo para refinar la ejecución.", "Practica primero en Demo."],
          e: "Una lectura válida reúne dirección, zona relevante, confirmación visible y una relación riesgo-retorno compatible con el plan.",
          w: "No conviertas una probabilidad en promesa ni aumentes el lote para recuperar pérdidas.",
        }
      : {
          p1: "Изучайте тему вместе со структурой, расположением цены, волатильностью и риском. Отдельный сигнал не является полной торговой идеей.",
          p2: "До входа определите сценарий, точку отмены, цель и размер позиции. Записывайте результат и проверяйте правило на достаточной выборке.",
          b: ["Контекст на 1ч.", "Формирование на 5м.", "1м только для уточнения входа.", "Сначала практика на демо-счёте."],
          e: "Качественный сценарий объединяет направление, значимую зону, видимое подтверждение и допустимое соотношение риска и прибыли.",
          w: "Не превращайте вероятность в обещание и не увеличивайте объём ради возврата потерь.",
        };
    return {
      ...translated,
      lessons: source.lessons.map((lesson, index) => ({
        t: lessonTitles[index],
        v: lesson[6],
        p: index === 11 || index === 12 || index === 13
          ? [common.p1, language === "es" ? "En XAUUSD verifica las especificaciones del contrato, los horarios, las noticias de alto impacto, el spread y el valor del punto antes de calcular la posición." : "Для XAUUSD до расчёта позиции проверьте спецификацию контракта, расписание, важные новости, спред и стоимость пункта."]
          : [common.p1, common.p2],
        b: common.b,
        e: common.e,
        w: common.w,
      })),
    };
  }

  DATA.es = translateCompact(DATA.en, "es");
  DATA.ru = translateCompact(DATA.en, "ru");

  function normalizeLessons(pack) {
    return pack.lessons.map((lesson) => Array.isArray(lesson) ? {
      t: lesson[0], p: [lesson[1], lesson[2]], b: lesson[3].split("|"), e: lesson[4], w: lesson[5], v: lesson[6],
    } : lesson);
  }

  function getCourseData(language = "pt") {
    const lang = normalizeLanguage(language);
    const pack = DATA[lang] || DATA.pt;
    const lessons = normalizeLessons(pack);
    return {
      id: COURSE_ID,
      title: pack.title,
      home: pack.home,
      theme: "exness",
      partner: pack.partner,
      chapters: lessons.map((lesson, index) => ({ id: index + 1, title: `${index + 1}. ${lesson.t}` })),
      lessons: lessons.map((lesson, index) => ({ ch: index + 1, part: 1, totalParts: 1, body: lessonBody({ ...lesson, index: index + 1 }, pack.labels) })),
      books: [],
    };
  }

  window.EDUCASHPRO_TECHNICAL_ANALYSIS_COURSE = { id: COURSE_ID, getCourseData };
})();
