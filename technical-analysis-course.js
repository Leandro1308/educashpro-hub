(function () {
  "use strict";

  const COURSE_ID = "analise_tecnica_completa";
  const EXNESS_URL = "https://one.exnessonelink.com/a/93bgo7jpfo/?campaign=43340";
  const VIDEO_COURSE_URL = "https://t.me/boost?c=3706880680";

  function normalizeLanguage(value) {
    const language = String(value || "pt").toLowerCase();
    return ["en", "es", "ru"].includes(language) ? language : "pt";
  }

  function escapeHtml(value) {
    return String(value || "").replace(/[&<>'"]/g, (char) => ({
      "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;",
    })[char]);
  }

  const I18N = {
    pt: {
      title: "Análise Técnica e Price Action",
      home: "<p>Curso visual e progressivo para compreender contexto, estrutura, tendências, suportes, resistências, rompimentos, padrões de continuação e reversão, entradas e gestão de risco. A leitura segue um princípio central: <b>contexto vem antes do setup</b>.</p><p>Cada figura é estudada separadamente, em um gráfico próprio. O objetivo não é decorar desenhos, mas reconhecer quando uma formação faz sentido, o que confirma a hipótese, onde ela deixa de ser válida e como treinar primeiro em conta demonstrativa.</p>",
      key: "Como identificar", confirm: "O que confirma", error: "Erro comum", example: "Exemplo de leitura", warning: "Atenção",
      partner: {
        eyebrow: "PRATIQUE COM RESPONSABILIDADE",
        title: "Cadastre-se e treine grátis",
        text: "Abra a plataforma da Exness pelo link do parceiro EduCashPro e pratique primeiro em conta demonstrativa.",
        button: "CADASTRAR E TREINAR GRÁTIS",
        videoText: "ASSISTIR AO CURSO COMPLETO EM VÍDEO",
        disclosure: "Link de parceiro. CFDs envolvem alto risco e podem gerar perdas. Conteúdo educacional; não constitui recomendação de investimento.",
        url: EXNESS_URL, videoUrl: VIDEO_COURSE_URL,
        floating: "TREINE GRÁTIS NA CONTA DEMO",
        close: "Fechar",
      },
    },
    en: {
      title: "Technical Analysis and Price Action",
      home: "<p>A visual, progressive course on context, structure, trends, support, resistance, breakouts, continuation and reversal patterns, entries and risk management. The core rule is simple: <b>context comes before the setup</b>.</p><p>Each figure is taught separately in its own chart. The goal is not to memorize shapes, but to understand confirmation, invalidation and responsible Demo practice.</p>",
      key: "How to identify", confirm: "What confirms it", error: "Common mistake", example: "Reading example", warning: "Warning",
      partner: { eyebrow:"PRACTICE RESPONSIBLY", title:"Sign up and practice free", text:"Open Exness through the EduCashPro partner link and practice first on a Demo account.", button:"SIGN UP AND PRACTICE FREE", videoText:"WATCH THE COMPLETE VIDEO COURSE", disclosure:"Partner link. CFDs carry a high risk of loss. Educational content only; not investment advice.", url:EXNESS_URL, videoUrl:VIDEO_COURSE_URL, floating:"PRACTICE FREE ON DEMO", close:"Close" },
    },
    es: {
      title: "Análisis Técnico y Price Action",
      home: "<p>Curso visual y progresivo sobre contexto, estructura, tendencias, soportes, resistencias, rompimientos, patrones de continuación y reversión, entradas y gestión de riesgo. La regla central es: <b>el contexto viene antes del setup</b>.</p><p>Cada figura se estudia por separado, en su propio gráfico. El objetivo no es memorizar dibujos, sino comprender confirmación, invalidación y práctica responsable en Demo.</p>",
      key: "Cómo identificar", confirm: "Qué lo confirma", error: "Error común", example: "Ejemplo de lectura", warning: "Atención",
      partner: { eyebrow:"PRACTICA CON RESPONSABILIDAD", title:"Regístrate y practica gratis", text:"Abre Exness mediante el enlace de socio de EduCashPro y practica primero en una cuenta Demo.", button:"REGISTRAR Y PRACTICAR GRATIS", videoText:"VER EL CURSO COMPLETO EN VIDEO", disclosure:"Enlace de socio. Los CFD implican alto riesgo de pérdida. Contenido educativo; no es asesoramiento de inversión.", url:EXNESS_URL, videoUrl:VIDEO_COURSE_URL, floating:"PRACTICA GRATIS EN DEMO", close:"Cerrar" },
    },
    ru: {
      title: "Технический анализ и Price Action",
      home: "<p>Последовательный визуальный курс по контексту, структуре, трендам, поддержке, сопротивлению, пробоям, моделям продолжения и разворота, входам и управлению риском. Главное правило: <b>контекст важнее сетапа</b>.</p><p>Каждая фигура изучается отдельно на собственном графике. Цель — понимать подтверждение, отмену сценария и сначала практиковаться на демо-счёте.</p>",
      key: "Как распознать", confirm: "Что подтверждает", error: "Типичная ошибка", example: "Пример чтения", warning: "Внимание",
      partner: { eyebrow:"ТРЕНИРУЙТЕСЬ ОТВЕТСТВЕННО", title:"Регистрация и бесплатная практика", text:"Откройте Exness по партнёрской ссылке EduCashPro и сначала практикуйтесь на демо-счёте.", button:"РЕГИСТРАЦИЯ И ДЕМО", videoText:"СМОТРЕТЬ ПОЛНЫЙ ВИДЕОКУРС", disclosure:"Партнёрская ссылка. CFD связаны с высоким риском потерь. Только образовательный материал.", url:EXNESS_URL, videoUrl:VIDEO_COURSE_URL, floating:"БЕСПЛАТНАЯ ДЕМО-ПРАКТИКА", close:"Закрыть" },
    },
  };

  const PT = [
    ["O que a análise técnica realmente faz","context","Análise técnica organiza evidências do preço para construir hipóteses. Ela não prevê com certeza. O trader observa contexto, localização, sinal, confirmação, invalidação e risco antes de agir.",["Leia primeiro o ambiente: tendência, canal, lateralidade ou transição.","Procure quem demonstrou controle nas barras recentes.","Defina antes da ordem onde a ideia deixa de fazer sentido."],"Contexto coerente + localização útil + sinal claro + confirmação.","Procurar um candle mágico sem entender o ambiente.","Em uma tendência de alta, uma retração até suporte pode ser melhor que comprar depois de uma vela já estendida."],
    ["Anatomia do candle","candle","Cada candle resume abertura, máxima, mínima e fechamento. O corpo mostra deslocamento entre abertura e fechamento; as sombras mostram preços testados durante o período.",["Cor indica direção do fechamento, não força absoluta.","Corpo amplo sugere deslocamento; sombra longa sugere teste e reação.","O mesmo candle muda de significado conforme a localização."],"Fechamento e reação das barras seguintes de acordo com a estrutura.","Operar apenas pelo nome ou formato do candle.","Um candle de rejeição em suporte é mais relevante quando a barra seguinte confirma acima de sua máxima."],
    ["Tendência de alta","uptrend","Uma tendência de alta é formada, em geral, por topos e fundos ascendentes. As correções são pausas dentro do movimento enquanto a estrutura compradora permanece protegida.",["Topos progressivamente mais altos.","Fundos progressivamente mais altos.","Canal ou linha de tendência podem ajudar a visualizar o ritmo."],"Retomada compradora depois da correção e preservação do último fundo relevante.","Vender só porque o preço parece alto.","Em tendência forte, resistências menores podem falhar e o preço continuar avançando."],
    ["Tendência de baixa","downtrend","Uma tendência de baixa apresenta, em geral, topos e fundos descendentes. Repique não significa automaticamente reversão: pode ser apenas correção.",["Topos mais baixos.","Fundos mais baixos.","Retomadas vendedoras após repiques."],"Perda de suporte com continuidade e preservação do último topo relevante.","Comprar só porque o preço caiu muito.","Em tendência forte de baixa, suportes menores podem falhar repetidamente."],
    ["Suporte","support","Suporte é uma região onde compradores anteriormente conseguiram reagir. Trate-o como zona, não como preço exato.",["Reações anteriores claras.","Origem de movimentos compradores.","Confluência com estrutura de período maior."],"Rejeição ou retomada compradora após teste da região.","Comprar automaticamente no primeiro toque.","O preço testa a zona, falha em fechar abaixo e forma reação compradora."],
    ["Resistência","resistance","Resistência é uma região onde vendedores anteriormente conseguiram reagir. Ela pode ser rompida, principalmente quando a pressão compradora é persistente.",["Reações anteriores de venda.","Topo relevante ou origem de queda.","Aproximação e comportamento do preço importam."],"Rejeição e continuidade vendedora, ou rompimento com aceitação acima para invalidar a resistência.","Vender automaticamente em qualquer linha horizontal.","Vários fechamentos próximos da resistência sem rejeição podem indicar pressão para rompimento."],
    ["Lateralidade ou Range","range","Na lateralidade, o preço alterna entre suporte e resistência sem progressão direcional consistente. O centro da faixa costuma oferecer menos vantagem do que os extremos.",["Limites superior e inferior reconhecíveis.","Múltiplas oscilações internas.","Falsos rompimentos são comuns."],"Rejeição nos extremos ou rompimento confirmado fora da faixa.","Aplicar estratégia de tendência no meio do range.","Em faixa clara, espere o preço chegar a um extremo ou romper com continuidade."],
    ["Rompimento","breakout","Rompimento ocorre quando o preço atravessa uma região importante. A qualidade depende de fechamento, deslocamento e continuidade, não apenas de uma sombra além da linha.",["Nível claro antes do rompimento.","Expansão do movimento.","Fechamento além da região."],"Follow-through: barras seguintes sustentam o novo lado da região.","Entrar em qualquer perfuração por sombra.","Resistência rompida com fechamento forte e continuidade pode virar região de apoio."],
    ["Falso rompimento","fakeout","No falso rompimento, o preço atravessa um nível, mas não consegue sustentar o movimento e retorna para dentro da estrutura.",["Rompimento sem continuidade.","Retorno rápido para dentro da faixa.","Rejeição do lado rompido."],"Fechamento de volta dentro da estrutura e movimento contrário consistente.","Antecipar a reversão antes de o mercado falhar de fato.","Preço rompe a máxima do range, falha e fecha novamente abaixo da resistência."],
    ["Pullback e reteste","pullback","Pullback é uma correção temporária contra a direção principal. Reteste ocorre quando o preço volta a uma região rompida para testar se ela mudou de função.",["Correção menor que o impulso dominante.","Retorno a nível rompido ou zona relevante.","Redução de força durante a correção pode favorecer retomada."],"Sinal e fechamento na direção do movimento principal.","Confundir qualquer correção com reversão.","Após romper resistência, o preço retorna à região e reage como suporte."],
    ["Canal de alta","bull_channel","Canal de alta organiza uma sequência de máximas e mínimas ascendentes entre duas linhas aproximadamente paralelas.",["Linha inferior pelos fundos ascendentes.","Linha paralela superior pelos topos.","Oscilações respeitando o ritmo."],"Continuidade dentro do canal; quebra é apenas alerta até a estrutura mudar.","Considerar toda quebra da linha como reversão.","Uma quebra do canal seguida de topo mais baixo e perda do fundo é mais relevante que a quebra isolada."],
    ["Canal de baixa","bear_channel","Canal de baixa organiza topos e fundos descendentes entre linhas aproximadamente paralelas.",["Linha superior pelos topos descendentes.","Linha inferior paralela pelos fundos.","Repique tende a encontrar oferta enquanto o canal permanece válido."],"Retomada vendedora dentro do canal; reversão exige mudança estrutural.","Comprar apenas porque o preço tocou a linha inferior.","Rompimento do canal para cima precisa de continuidade e mudança dos topos/fundos."],
    ["Bandeira de alta","bull_flag","Bandeira de alta é uma pausa ou pequena correção após um impulso comprador. A hipótese é de continuação, desde que a estrutura permaneça favorável.",["Mastro comprador forte.","Correção curta, muitas vezes inclinada para baixo.","Candles da correção menores que os do impulso."],"Rompimento para cima com fechamento e continuidade.","Comprar dentro da bandeira sem confirmação.","Impulso forte, canal corretivo curto e retomada acima da máxima da consolidação."],
    ["Bandeira de baixa","bear_flag","Bandeira de baixa é uma pausa ou repique após um impulso vendedor. A hipótese é de continuação da queda.",["Mastro vendedor forte.","Correção curta, muitas vezes inclinada para cima.","Repique sem força para mudar a estrutura."],"Rompimento para baixo com continuidade.","Vender depois de queda estendida sem esperar correção.","Queda forte, pequeno canal de alta e retomada vendedora abaixo da bandeira."],
    ["Triângulo ascendente","asc_triangle","Triângulo ascendente combina resistência aproximadamente horizontal com fundos ascendentes, mostrando compradores aceitando pagar preços cada vez maiores.",["Resistência horizontal.","Mínimas ascendentes.","Compressão progressiva."],"Rompimento da resistência com fechamento e continuidade.","Comprar só porque o desenho parece triangular.","Quanto mais o preço pressiona a resistência sem afastamento, maior a atenção ao rompimento."],
    ["Triângulo descendente","desc_triangle","Triângulo descendente combina suporte aproximadamente horizontal com topos descendentes, mostrando pressão vendedora crescente.",["Suporte horizontal.","Máximas descendentes.","Compressão em direção ao suporte."],"Rompimento do suporte com fechamento e continuidade.","Vender antes do suporte romper.","Pressão repetida sobre o suporte seguida de fechamento abaixo confirma melhor a hipótese."],
    ["Triângulo simétrico","sym_triangle","No triângulo simétrico, máximas descem e mínimas sobem. A formação mostra compressão; a direção só fica mais clara após o rompimento.",["Linhas convergentes.","Máximas menores e mínimas maiores.","Volatilidade comprimida."],"Rompimento de uma das laterais com aceitação fora da figura.","Adivinhar a direção antes do rompimento.","Espere o mercado mostrar qual lado venceu a compressão."],
    ["Cunha de alta","rising_wedge","A cunha de alta possui máximas e mínimas ascendentes, porém convergentes. O movimento pode perder momentum e terminar em rompimento para baixo.",["Duas linhas ascendentes convergentes.","Avanços progressivamente menores.","Perda de momentum."],"Rompimento da linha inferior e mudança estrutural.","Vender apenas porque identificou a cunha.","A quebra seguida de topo mais baixo aumenta a qualidade da leitura de reversão."],
    ["Cunha de baixa","falling_wedge","A cunha de baixa possui máximas e mínimas descendentes e convergentes. A pressão vendedora pode perder força e abrir espaço para rompimento para cima.",["Linhas descendentes convergentes.","Quedas progressivamente menores.","Perda de momentum vendedor."],"Rompimento da linha superior com continuidade.","Comprar antes do rompimento só porque a cunha apareceu.","Rompimento seguido de fundo mais alto fortalece a hipótese de reversão."],
    ["Topo duplo","double_top","Topo duplo ocorre quando o mercado testa duas vezes uma região de máxima e falha em continuar. O padrão só ganha qualidade quando o suporte entre os topos é perdido.",["Dois topos próximos da mesma região.","Vale intermediário formando linha de pescoço.","Segunda tentativa sem continuidade compradora."],"Rompimento da linha de pescoço com continuidade.","Vender no segundo topo antes de qualquer confirmação.","A perda do suporte entre os topos transforma a figura em hipótese de reversão mais objetiva."],
    ["Fundo duplo","double_bottom","Fundo duplo ocorre quando o preço testa duas vezes uma região de mínima e falha em continuar caindo. A confirmação vem pelo rompimento da resistência entre os fundos.",["Dois fundos próximos da mesma região.","Topo intermediário formando linha de pescoço.","Segunda tentativa de queda falha."],"Rompimento da linha de pescoço para cima.","Comprar apenas porque surgiu o segundo fundo.","A quebra da resistência entre os fundos confirma melhor a mudança de controle."],
    ["Topo triplo","triple_top","Topo triplo amplia a lógica do topo duplo: três testes de uma zona de resistência sem progresso sustentável.",["Três picos na mesma região.","Suporte/linha de pescoço entre as tentativas.","Falha repetida de continuidade."],"Perda do suporte da estrutura.","Vender no terceiro topo sem observar a linha de pescoço.","A repetição mostra resistência, mas a reversão precisa ser confirmada pela perda do suporte."],
    ["Fundo triplo","triple_bottom","Fundo triplo é formado por três testes de uma região de suporte. O mercado mostra dificuldade de continuar caindo.",["Três mínimos próximos.","Resistência intermediária identificável.","Falha repetida de continuidade vendedora."],"Rompimento da resistência da estrutura.","Comprar antes do rompimento porque o suporte segurou três vezes.","O rompimento da resistência confirma que compradores passaram a aceitar preços mais altos."],
    ["Ombro-Cabeça-Ombro","head_shoulders","O OCO é uma estrutura de reversão com três picos: ombro, cabeça mais alta e segundo ombro. A linha de pescoço conecta os fundos da formação.",["Ombro esquerdo.","Cabeça acima dos ombros.","Ombro direito e linha de pescoço."],"Rompimento da linha de pescoço com continuidade.","Vender enquanto o ombro direito ainda está se formando.","O padrão fica mais objetivo depois que o mercado perde a linha de pescoço."],
    ["Ombro-Cabeça-Ombro invertido","inv_head_shoulders","O OCO invertido é uma estrutura de reversão de baixa para alta com três vales: ombro, cabeça mais baixa e segundo ombro.",["Ombro esquerdo.","Cabeça abaixo dos ombros.","Ombro direito e linha de pescoço."],"Rompimento da linha de pescoço para cima.","Comprar antes de a resistência ser rompida.","O rompimento e o reteste da linha de pescoço podem oferecer confirmação adicional."],
    ["Topo arredondado","rounded_top","Topo arredondado mostra perda gradual de força compradora e transição para controle vendedor. É menos preciso que padrões com níveis muito claros.",["Curvatura progressiva no topo.","Impulsos de alta menores.","Perda gradual de momentum."],"Rompimento de suporte relevante e continuidade.","Tentar desenhar um arco perfeito em qualquer consolidação.","A estrutura importa mais que a estética da curva."],
    ["Fundo arredondado","rounded_bottom","Fundo arredondado mostra redução gradual da pressão vendedora e transição para controle comprador.",["Curvatura progressiva no fundo.","Quedas menores.","Recuperação gradual das máximas."],"Rompimento de resistência relevante.","Comprar só porque o preço parou de cair.","O fundo só ganha qualidade quando o mercado passa a romper resistências."],
    ["H1 e H2 em tendência de alta","h2","H1 e H2 representam a primeira e a segunda tentativa de retomada compradora durante uma correção em tendência de alta. A segunda entrada costuma ser mais clara porque o mercado já testou a correção duas vezes.",["Contexto de tendência de alta.","Correção ainda preserva estrutura.","Primeira e segunda tentativa de retomada."],"Barra de sinal e rompimento coerentes com a retomada da tendência.","Contar H1/H2 sem confirmar que ainda existe tendência.","O contexto é mais importante que o número do setup: se a tendência virou lateralidade, a contagem perde valor."],
    ["L1 e L2 em tendência de baixa","l2","L1 e L2 representam a primeira e a segunda tentativa de retomada vendedora durante um repique em tendência de baixa.",["Contexto de tendência de baixa.","Repique não rompe estrutura relevante.","Primeira e segunda tentativa de retomada vendedora."],"Sinal e rompimento para baixo dentro de contexto ainda vendedor.","Contar L1/L2 em uma tendência já esgotada ou lateral.","Quanto mais longa a correção, maior a necessidade de reavaliar se ainda existe tendência."],
    ["Clímax e exaustão","climax","Clímax é uma aceleração forte. Pode continuar por algum tempo, mas também aumenta a chance de pausa, correção ou reversão. Não é um sinal automático contra a tendência.",["Barras muito maiores que o normal.","Sequência acelerada perto de extremo.","Aumento de volatilidade."],"Falha de continuidade e mudança estrutural depois do clímax.","Operar contra um movimento forte só porque ele parece exagerado.","Primeiro espere o mercado mostrar que perdeu continuidade."],
    ["Movimento medido e alvo","measured_move","Movimentos medidos usam a dimensão de uma estrutura anterior como referência aproximada de projeção. É um alvo possível, não uma obrigação do mercado.",["Identifique impulso ou altura da formação.","Projete a medida a partir do rompimento.","Compare com suportes e resistências à frente."],"Mercado mantém direção e não encontra obstáculo estrutural mais próximo.","Tratar projeção como alvo garantido.","Se a projeção coincide com uma resistência importante, planeje gestão antes de chegar ao nível."],
    ["Múltiplos tempos: 1H → 5M → 1M","multi_tf","A leitura descendente organiza as decisões: 1H para direção e regiões; 5M para a formação; 1M apenas para refinar a entrada quando necessário.",["1H responde onde e para que lado.","5M responde qual formação está acontecendo.","1M responde onde executar com invalidação curta."],"Os períodos contam a mesma história e o risco permanece objetivo.","Usar o 1M isoladamente e reagir ao ruído.","Tendência de alta no 1H + pullback no 5M + micro rompimento no 1M cria uma leitura coerente."],
    ["XAUUSD: contexto e volatilidade","xau","O ouro pode apresentar movimentos rápidos e expansão de volatilidade. Marque níveis de períodos maiores, máxima e mínima anteriores e observe sessões e notícias antes de operar.",["Máxima e mínima do dia anterior.","Extremos das sessões.","Níveis estruturais no 1H e 5M."],"Formação técnica coerente em região relevante e risco ajustado à volatilidade.","Usar o mesmo lote de outros ativos sem verificar especificações.","No XAUUSD, um stop tecnicamente correto pode exigir posição menor quando a volatilidade aumenta."],
    ["Stop e invalidação","risk","O stop deve ficar onde a hipótese deixa de fazer sentido, e não onde a perda parece emocionalmente confortável.",["Defina a estrutura que invalida a ideia.","Considere volatilidade e spread.","Calcule o tamanho da posição depois de definir o stop."],"A posição respeita o risco máximo planejado antes da entrada.","Aumentar o stop depois que o preço se aproxima dele.","Primeiro vem o risco; depois, a quantidade."],
    ["Risco-retorno e tamanho da posição","risk_reward","Uma boa leitura só se transforma em operação quando existe risco controlado. Taxa de acerto e ganho médio precisam ser avaliados em conjunto.",["Risco financeiro definido por operação.","Stop técnico conhecido.","Alvo provável compatível com a estrutura."],"A operação tem regra de entrada, invalidação, alvo e tamanho antes do clique.","Aumentar lote para recuperar uma perda anterior.","Se o stop precisa dobrar, a posição deve ser reduzida para manter o mesmo risco financeiro."],
    ["Checklist antes da entrada","checklist","Antes de clicar, transforme a leitura em uma frase simples: contexto, localização, confirmação, invalidação e alvo.",["Qual é o ambiente?","Estou em região importante?","O sinal está a favor ou contra a força dominante?","Onde fico objetivamente errado?","O alvo provável compensa o risco?"],"Você consegue explicar a operação com clareza e aceitar o risco planejado.","Entrar e só depois decidir onde sair.","Se não consegue explicar a operação em uma frase simples, provavelmente ainda não está pronta."],
    ["Treino, backtest e conta Demo","demo","Aprender Price Action exige repetição. Use replay, gráficos históricos e conta Demo para separar erro de leitura, erro de execução e perda normal da estratégia.",["Estude muitos exemplos da mesma figura antes de misturar setups.","Registre contexto, entrada, stop, alvo e resultado.","Revise rompimentos que funcionaram e os que falharam."],"A regra é aplicada de forma consistente em uma amostra suficiente.","Mudar a regra a cada perda ou vitória.","Faça dezenas de operações simuladas antes de avaliar se uma leitura tem vantagem."],
  ];

  const OTHER_TITLES = {
    en: ["What technical analysis really does","Candle anatomy","Uptrend","Downtrend","Support","Resistance","Trading range","Breakout","False breakout","Pullback and retest","Bull channel","Bear channel","Bull flag","Bear flag","Ascending triangle","Descending triangle","Symmetrical triangle","Rising wedge","Falling wedge","Double top","Double bottom","Triple top","Triple bottom","Head and shoulders","Inverse head and shoulders","Rounded top","Rounded bottom","H1 and H2 in an uptrend","L1 and L2 in a downtrend","Climax and exhaustion","Measured move and target","Multiple timeframes: 1H → 5M → 1M","XAUUSD: context and volatility","Stop and invalidation","Risk-reward and position size","Pre-entry checklist","Practice, backtest and Demo"],
    es: ["Qué hace realmente el análisis técnico","Anatomía de la vela","Tendencia alcista","Tendencia bajista","Soporte","Resistencia","Lateralidad o rango","Rompimiento","Falso rompimiento","Pullback y retesteo","Canal alcista","Canal bajista","Bandera alcista","Bandera bajista","Triángulo ascendente","Triángulo descendente","Triángulo simétrico","Cuña ascendente","Cuña descendente","Doble techo","Doble suelo","Triple techo","Triple suelo","Hombro-Cabeza-Hombro","Hombro-Cabeza-Hombro invertido","Techo redondeado","Suelo redondeado","H1 y H2 en tendencia alcista","L1 y L2 en tendencia bajista","Clímax y agotamiento","Movimiento medido y objetivo","Múltiples temporalidades: 1H → 5M → 1M","XAUUSD: contexto y volatilidad","Stop e invalidación","Riesgo-retorno y tamaño","Checklist antes de entrar","Práctica, backtest y Demo"],
    ru: ["Что делает технический анализ","Строение свечи","Восходящий тренд","Нисходящий тренд","Поддержка","Сопротивление","Торговый диапазон","Пробой","Ложный пробой","Откат и ретест","Восходящий канал","Нисходящий канал","Бычий флаг","Медвежий флаг","Восходящий треугольник","Нисходящий треугольник","Симметричный треугольник","Восходящий клин","Нисходящий клин","Двойная вершина","Двойное дно","Тройная вершина","Тройное дно","Голова и плечи","Перевёрнутая голова и плечи","Закруглённая вершина","Закруглённое дно","H1 и H2 в восходящем тренде","L1 и L2 в нисходящем тренде","Кульминация и истощение","Измеренное движение и цель","Несколько таймфреймов: 1H → 5M → 1M","XAUUSD: контекст и волатильность","Стоп и отмена сценария","Риск-доходность и размер позиции","Чек-лист перед входом","Практика, бэктест и демо"],
  };

  function localizedLesson(base, index, language) {
    if (language === "pt") return base;
    const title = OTHER_TITLES[language]?.[index] || base[0];
    const copy = language === "en" ? {
      p:"Study this figure inside market context. A pattern is useful only when prior structure, location, confirmation and invalidation agree.",
      b:["Identify the structure before the signal.","Wait for a visible confirmation.","Define invalidation before the order."],
      c:"Confirmation must come from price behavior, not from the name of the pattern.",
      er:"Treating the figure as an automatic buy or sell command.",
      ex:"Use the chart to describe what price is doing before trying to predict the next move."
    } : language === "es" ? {
      p:"Estudia esta figura dentro del contexto. Un patrón solo es útil cuando estructura previa, ubicación, confirmación e invalidación son coherentes.",
      b:["Identifica la estructura antes de la señal.","Espera una confirmación visible.","Define la invalidación antes de la orden."],
      c:"La confirmación debe venir del comportamiento del precio, no del nombre del patrón.",
      er:"Tratar la figura como una orden automática de compra o venta.",
      ex:"Usa el gráfico para describir lo que hace el precio antes de intentar predecir."
    } : {
      p:"Изучайте фигуру только в контексте рынка. Модель полезна, когда структура, место, подтверждение и точка отмены согласованы.",
      b:["Сначала определите структуру.","Дождитесь видимого подтверждения.","До входа определите отмену сценария."],
      c:"Подтверждение должно исходить из поведения цены, а не из названия фигуры.",
      er:"Считать фигуру автоматическим сигналом покупки или продажи.",
      ex:"Сначала опишите, что делает цена, и только затем стройте сценарий."
    };
    return [title, base[1], copy.p, copy.b, copy.c, copy.er, copy.ex];
  }

  const SERIES = {
    context:[42,44,43,47,51,49,55,59,56,62,66,63,69,72,68,75,73,79], candle:[45,47,46,49,48,52,50,54,53,55,54,58,57,60,59,61,60,63],
    uptrend:[28,34,31,39,36,44,41,49,46,54,51,60,56,65,61,70,66,75], downtrend:[76,70,73,65,68,59,63,54,58,49,53,44,48,39,43,34,38,29],
    support:[55,49,44,47,51,46,43,48,54,58,53,48,44,49,56,62,67,71], resistance:[36,42,48,53,49,55,59,54,58,60,55,57,60,54,49,45,41,38],
    range:[45,52,48,55,49,53,47,54,50,56,49,52,46,54,48,55,50,53], breakout:[39,43,47,44,49,52,48,53,50,54,52,55,54,56,68,77,82,88],
    fakeout:[44,49,54,50,55,52,56,53,55,57,55,58,68,61,54,49,45,41], pullback:[32,38,45,52,59,65,61,57,54,58,64,70,76,82,79,86,91,95],
    bull_channel:[30,35,33,40,38,45,42,50,47,55,51,60,56,65,61,70,66,75], bear_channel:[75,70,72,65,67,59,62,54,57,49,52,44,48,39,43,34,38,30],
    bull_flag:[30,38,47,57,66,73,69,65,61,63,66,70,78,85,91,96,101,106], bear_flag:[104,96,87,78,70,62,66,70,73,69,65,60,53,46,39,33,28,23],
    asc_triangle:[40,55,47,56,50,57,52,58,54,59,56,60,58,61,70,77,84,90], desc_triangle:[80,65,72,64,68,63,66,62,64,61,63,60,62,59,50,43,36,30],
    sym_triangle:[42,68,48,64,51,61,54,59,56,58,57,58,57,60,69,78,84,90], rising_wedge:[35,49,43,56,50,63,57,68,63,72,68,75,72,76,69,61,52,43],
    falling_wedge:[78,64,70,57,63,51,57,46,52,42,48,39,44,37,44,52,61,70], double_top:[35,46,58,70,62,50,43,52,64,70,61,49,42,38,33,29,25,22],
    double_bottom:[72,60,48,36,44,55,62,53,42,36,45,58,65,70,76,82,88,93], triple_top:[34,45,58,69,61,49,57,68,60,48,56,69,58,46,39,34,29,24],
    triple_bottom:[75,62,49,37,46,58,49,38,47,59,50,37,46,58,67,75,83,90], head_shoulders:[35,45,58,51,44,55,75,62,48,56,66,57,47,42,37,32,28,24],
    inv_head_shoulders:[75,65,52,60,68,57,36,50,66,58,48,57,67,72,78,84,90,95], rounded_top:[40,46,53,60,66,71,74,76,75,72,68,62,55,48,42,36,31,27],
    rounded_bottom:[76,70,63,56,49,44,41,40,41,44,49,55,62,69,76,82,88,93], h2:[32,40,49,58,66,61,57,64,70,65,60,67,74,81,87,92,97,101],
    l2:[98,90,82,74,67,72,76,69,62,68,72,65,58,51,44,38,32,27], climax:[35,39,43,48,53,60,69,80,94,108,119,126,130,124,116,107,99,93],
    measured_move:[35,43,52,61,70,65,60,66,75,84,93,88,83,90,99,108,117,125], multi_tf:[34,42,50,47,56,64,60,69,77,73,82,90,84,93,99,96,104,110],
    xau:[48,55,50,62,57,70,63,76,69,84,74,89,80,95,85,101,92,108], risk:[45,49,47,52,50,55,53,58,56,61,59,64,62,67,65,70,68,73],
    risk_reward:[40,44,48,46,51,55,53,58,62,60,65,69,66,72,76,73,79,84], checklist:[44,48,46,51,49,54,52,57,55,60,58,63,61,66,64,69,67,72],
    demo:[35,39,37,42,40,45,43,48,46,51,49,54,52,57,55,60,58,63],
  };

  function chart(type, id, caption, language) {
    const values = SERIES[type] || SERIES.context;
    const W=720,H=360,left=42,top=34,plotH=250,step=35;
    const min=Math.min(...values)-8,max=Math.max(...values)+8;
    const y=(v)=>top+(max-v)*plotH/(max-min), x=(i)=>left+i*step;
    const candles=values.map((close,i)=>{
      const prev=i?values[i-1]:close-2, open=prev+((i%3)-1)*1.6, high=Math.max(open,close)+3+(i%2)*1.5, low=Math.min(open,close)-3-((i+1)%2)*1.5;
      const up=close>=open,color=up?"#16c784":"#ea3943",by=Math.min(y(open),y(close)),bh=Math.max(4,Math.abs(y(open)-y(close)));
      return `<line x1="${x(i)}" y1="${y(high)}" x2="${x(i)}" y2="${y(low)}" stroke="${color}" stroke-width="2"/><rect x="${x(i)-7}" y="${by}" width="14" height="${bh}" rx="2" fill="${color}"/>`;
    }).join("");
    const L=(x1,y1,x2,y2,c="#ffd43b",dash="")=>`<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${c}" stroke-width="3" ${dash?`stroke-dasharray="${dash}"`:""}/>`;
    const T=(tx,ty,text,c="#f8fafc",anchor="middle")=>`<text x="${tx}" y="${ty}" text-anchor="${anchor}" fill="${c}" font-family="system-ui,sans-serif" font-size="16" font-weight="700">${escapeHtml(text)}</text>`;
    const A=(x1,y1,x2,y2,c)=>`<path d="M${x1} ${y1} L${x2} ${y2} M${x2} ${y2} l-12 -5 M${x2} ${y2} l-5 -12" fill="none" stroke="${c}" stroke-width="4" stroke-linecap="round"/>`;
    const labels = language==="pt" ? {top:"TOPO",bottom:"FUNDO",support:"SUPORTE",res:"RESISTÊNCIA",break:"ROMPIMENTO",neck:"LINHA DE PESCOÇO",pull:"PULLBACK",shoulder:"OMBRO",head:"CABEÇA",climax:"CLÍMAX",target:"ALVO",entry:"ENTRADA",stop:"STOP",high:"MÁXIMA",low:"MÍNIMA",body:"CORPO"} :
      language==="es" ? {top:"TECHO",bottom:"SUELO",support:"SOPORTE",res:"RESISTENCIA",break:"ROMPIMIENTO",neck:"LÍNEA DE CUELLO",pull:"PULLBACK",shoulder:"HOMBRO",head:"CABEZA",climax:"CLÍMAX",target:"OBJETIVO",entry:"ENTRADA",stop:"STOP",high:"MÁXIMA",low:"MÍNIMA",body:"CUERPO"} :
      language==="ru" ? {top:"ВЕРШИНА",bottom:"ДНО",support:"ПОДДЕРЖКА",res:"СОПРОТИВЛЕНИЕ",break:"ПРОБОЙ",neck:"ЛИНИЯ ШЕИ",pull:"ОТКАТ",shoulder:"ПЛЕЧО",head:"ГОЛОВА",climax:"КУЛЬМИНАЦИЯ",target:"ЦЕЛЬ",entry:"ВХОД",stop:"СТОП",high:"МАКСИМУМ",low:"МИНИМУМ",body:"ТЕЛО"} :
      {top:"TOP",bottom:"BOTTOM",support:"SUPPORT",res:"RESISTANCE",break:"BREAKOUT",neck:"NECKLINE",pull:"PULLBACK",shoulder:"SHOULDER",head:"HEAD",climax:"CLIMAX",target:"TARGET",entry:"ENTRY",stop:"STOP",high:"HIGH",low:"LOW",body:"BODY"};
    let o="";
    if(type==="uptrend"){o=L(55,285,620,65,"#3b82f6")+L(80,325,645,105,"#3b82f6")+T(160,242,labels.bottom,"#22c55e")+T(305,188,labels.bottom,"#22c55e")+T(235,125,labels.top,"#ef4444")+T(455,86,labels.top,"#ef4444");}
    else if(type==="downtrend"){o=L(55,65,620,285,"#e5e7eb")+L(80,105,645,325,"#e5e7eb")+T(180,112,labels.top,"#ef4444")+T(340,170,labels.top,"#ef4444")+T(255,232,labels.bottom,"#22c55e")+T(475,292,labels.bottom,"#22c55e");}
    else if(type==="support"){o=`<rect x="30" y="${y(45)-14}" width="630" height="28" fill="#22c55e" opacity=".14" stroke="#22c55e"/>${L(30,y(45),660,y(45),"#22c55e","9 7")}${T(610,y(45)-18,labels.support,"#22c55e")}`;}
    else if(type==="resistance"){o=`<rect x="30" y="${y(59)-14}" width="630" height="28" fill="#ef4444" opacity=".14" stroke="#ef4444"/>${L(30,y(59),660,y(59),"#ef4444","9 7")}${T(610,y(59)-18,labels.res,"#ef4444")}`;}
    else if(type==="range"){o=`<rect x="30" y="${y(56)}" width="630" height="${y(46)-y(56)}" fill="#64748b" opacity=".10" stroke="#94a3b8"/>${L(30,y(56),660,y(56),"#ef4444")}${L(30,y(46),660,y(46),"#22c55e")}${T(610,y(56)-14,labels.res,"#ef4444")}${T(610,y(46)+26,labels.support,"#22c55e")}`;}
    else if(type==="breakout"){o=L(30,y(56),510,y(56),"#ef4444")+T(470,y(56)-14,labels.res,"#ef4444")+A(520,y(55),610,y(84),"#22c55e")+T(608,y(84)-12,labels.break,"#22c55e");}
    else if(type==="fakeout"){o=L(30,y(58),660,y(58),"#ef4444")+A(490,y(58),520,y(68),"#3b82f6")+A(535,y(66),585,y(50),"#ef4444")+T(540,y(70)-15,labels.break,"#facc15");}
    else if(type==="pullback"){o=L(80,300,630,70,"#3b82f6")+A(250,140,350,210,"#facc15")+T(355,225,labels.pull,"#facc15")+A(390,185,505,115,"#22c55e");}
    else if(type==="bull_channel"){o=L(45,305,640,90,"#3b82f6")+L(45,245,640,30,"#3b82f6");}
    else if(type==="bear_channel"){o=L(45,55,640,270,"#e5e7eb")+L(45,115,640,330,"#e5e7eb");}
    else if(type==="bull_flag"){o=L(280,125,470,175,"#facc15")+L(280,175,470,225,"#facc15")+A(470,175,600,85,"#22c55e");}
    else if(type==="bear_flag"){o=L(280,135,470,85,"#facc15")+L(280,190,470,140,"#facc15")+A(470,140,600,245,"#ef4444");}
    else if(type==="asc_triangle"){o=L(180,95,540,95,"#ef4444")+L(180,255,540,95,"#facc15")+A(540,95,620,55,"#22c55e");}
    else if(type==="desc_triangle"){o=L(180,255,540,255,"#22c55e")+L(180,95,540,255,"#facc15")+A(540,255,620,305,"#ef4444");}
    else if(type==="sym_triangle"){o=L(170,75,530,180,"#facc15")+L(170,285,530,180,"#facc15")+A(530,180,625,120,"#22c55e");}
    else if(type==="rising_wedge"){o=L(140,280,540,100,"#facc15")+L(140,230,540,70,"#facc15")+A(500,125,600,245,"#ef4444");}
    else if(type==="falling_wedge"){o=L(140,80,540,240,"#facc15")+L(140,130,540,270,"#facc15")+A(500,230,610,115,"#22c55e");}
    else if(type==="double_top"){o=L(225,235,425,235,"#f8fafc")+T(240,65,labels.top,"#ef4444")+T(390,65,labels.top,"#ef4444")+T(325,257,labels.neck,"#f8fafc")+A(425,235,570,305,"#ef4444");}
    else if(type==="double_bottom"){o=L(225,125,425,125,"#f8fafc")+T(240,305,labels.bottom,"#22c55e")+T(390,305,labels.bottom,"#22c55e")+T(325,105,labels.neck,"#f8fafc")+A(425,125,570,55,"#22c55e");}
    else if(type==="triple_top"){o=L(180,235,485,235,"#f8fafc")+T(210,62,labels.top,"#ef4444")+T(330,62,labels.top,"#ef4444")+T(450,62,labels.top,"#ef4444")+A(485,235,600,305,"#ef4444");}
    else if(type==="triple_bottom"){o=L(180,125,485,125,"#f8fafc")+T(210,310,labels.bottom,"#22c55e")+T(330,310,labels.bottom,"#22c55e")+T(450,310,labels.bottom,"#22c55e")+A(485,125,600,55,"#22c55e");}
    else if(type==="head_shoulders"){o=L(170,240,500,240,"#f8fafc")+T(220,115,labels.shoulder,"#facc15")+T(335,55,labels.head,"#facc15")+T(450,120,labels.shoulder,"#facc15")+A(500,240,610,305,"#ef4444");}
    else if(type==="inv_head_shoulders"){o=L(170,120,500,120,"#f8fafc")+T(220,280,labels.shoulder,"#facc15")+T(335,330,labels.head,"#facc15")+T(450,280,labels.shoulder,"#facc15")+A(500,120,610,55,"#22c55e");}
    else if(type==="rounded_top"){o=`<path d="M120 245 Q360 20 600 250" fill="none" stroke="#facc15" stroke-width="4"/>${L(370,245,620,245,"#ef4444")}${A(540,245,620,305,"#ef4444")}`;}
    else if(type==="rounded_bottom"){o=`<path d="M120 90 Q360 330 600 85" fill="none" stroke="#facc15" stroke-width="4"/>${L(370,105,620,105,"#22c55e")}${A(540,105,620,50,"#22c55e")}`;}
    else if(type==="h2"){o=T(340,210,"H1","#facc15")+T(445,185,"H2","#22c55e")+A(445,180,545,105,"#22c55e");}
    else if(type==="l2"){o=T(340,145,"L1","#facc15")+T(445,170,"L2","#ef4444")+A(445,175,545,255,"#ef4444");}
    else if(type==="climax"){o=`<rect x="350" y="35" width="250" height="260" fill="#f59e0b" opacity=".08" stroke="#f59e0b" stroke-dasharray="8 7"/>${T(485,55,labels.climax,"#facc15")}`;}
    else if(type==="measured_move"){o=L(145,270,300,105,"#22c55e")+L(390,250,545,85,"#22c55e","8 6")+A(545,85,620,45,"#22c55e");}
    else if(type==="multi_tf"){o=`<rect x="35" y="45" width="185" height="240" fill="#3b82f6" opacity=".10" stroke="#3b82f6"/><rect x="268" y="85" width="185" height="200" fill="#facc15" opacity=".08" stroke="#facc15"/><rect x="500" y="125" width="150" height="160" fill="#22c55e" opacity=".08" stroke="#22c55e"/>${T(125,72,"1H","#60a5fa")}${T(360,112,"5M","#facc15")}${T(575,152,"1M","#22c55e")}`;}
    else if(type==="xau"){o=L(30,y(values[5]),660,y(values[5]),"#facc15","8 6")+L(30,y(values[13]),660,y(values[13]),"#3b82f6","8 6")+T(610,y(values[5])-12,"PDL","#facc15")+T(610,y(values[13])-12,"PDH","#60a5fa");}
    else if(["risk","risk_reward","checklist","demo"].includes(type)){o=`<rect x="390" y="55" width="230" height="64" fill="#22c55e" opacity=".12" stroke="#22c55e"/><rect x="390" y="119" width="230" height="48" fill="#facc15" opacity=".12" stroke="#facc15"/><rect x="390" y="167" width="230" height="90" fill="#ef4444" opacity=".10" stroke="#ef4444"/>${T(505,92,labels.target,"#22c55e")}${T(505,150,labels.entry,"#facc15")}${T(505,215,labels.stop,"#ef4444")}`;}
    else if(type==="candle"){o=`<g>${L(170,55,170,275,"#f8fafc")}${L(130,115,210,115,"#94a3b8")}${T(225,120,labels.high,"#f8fafc","start")}${T(225,205,labels.body,"#22c55e","start")}${T(225,278,labels.low,"#f8fafc","start")}<rect x="145" y="145" width="50" height="85" fill="#16c784"/></g>`;}
    return `<figure class="taFigure taSingleFigure"><svg viewBox="0 0 ${W} ${H}" role="img" aria-label="${escapeHtml(caption)}" xmlns="http://www.w3.org/2000/svg"><defs><pattern id="grid${id}" width="40" height="40" patternUnits="userSpaceOnUse"><path d="M40 0H0V40" fill="none" stroke="#fff" stroke-opacity=".05"/></pattern><linearGradient id="bg${id}" x1="0" x2="0" y1="0" y2="1"><stop stop-color="#111827"/><stop offset="1" stop-color="#05070a"/></linearGradient></defs><rect width="720" height="360" rx="18" fill="url(#bg${id})"/><rect width="720" height="360" rx="18" fill="url(#grid${id})"/>${candles}${o}</svg><figcaption>${escapeHtml(caption)}</figcaption></figure>`;
  }

  function lessonBody(lesson, labels, index, language) {
    const [title,type,text,points,confirm,error,example]=lesson;
    return `${chart(type,index+1,title,language)}<p>${escapeHtml(text)}</p><h4>${escapeHtml(labels.key)}</h4><ul>${points.map((p)=>`<li>${escapeHtml(p)}</li>`).join("")}</ul><div class="taExample"><strong>${escapeHtml(labels.confirm)}</strong><p>${escapeHtml(confirm)}</p></div><div class="taWarning"><strong>${escapeHtml(labels.error)}</strong><p>${escapeHtml(error)}</p></div><div class="taExample"><strong>${escapeHtml(labels.example)}</strong><p>${escapeHtml(example)}</p></div>`;
  }

  function getCourseData(language="pt") {
    const lang=normalizeLanguage(language);
    window.__EDUCASHPRO_TA_LANGUAGE=lang;
    const labels=I18N[lang]||I18N.pt;
    const lessons=PT.map((base,index)=>localizedLesson(base,index,lang));
    return { id:COURSE_ID,title:labels.title,home:labels.home,theme:"exness",partner:labels.partner,chapters:lessons.map((lesson,index)=>({id:index+1,title:`${index+1}. ${lesson[0]}`})),lessons:lessons.map((lesson,index)=>({ch:index+1,part:1,totalParts:1,body:lessonBody(lesson,labels,index,lang)})),books:[] };
  }

  function injectTechnicalCourseEnhancements() {
    if (document.getElementById("taCourseEnhancementStyles")) return;
    const style=document.createElement("style");
    style.id="taCourseEnhancementStyles";
    style.textContent=`
      .taSingleFigure{margin:16px 0 20px}.taSingleFigure svg{display:block;width:100%;height:auto;border-radius:18px;box-shadow:0 14px 34px rgba(0,0,0,.28)}.taSingleFigure figcaption{font-size:13px;color:var(--muted,#94a3b8);margin-top:8px;text-align:center}
      .technicalCourse .coursePartnerCta{margin-top:24px}.technicalCourse .coursePartnerActions{display:grid;grid-template-columns:1fr;gap:10px}.technicalCourse .coursePartnerButton,.technicalCourse .courseVideoLink{width:100%;min-height:48px}
      .taFloatingBroker{position:fixed;left:12px;right:12px;bottom:76px;z-index:9999;display:flex;align-items:center;gap:10px;padding:10px 42px 10px 12px;background:rgba(7,17,31,.96);border:1px solid rgba(255,212,59,.45);border-radius:16px;box-shadow:0 16px 38px rgba(0,0,0,.42);backdrop-filter:blur(12px)}
      .taFloatingBroker button.taBrokerOpen{flex:1;background:transparent;border:0;color:#fff;text-align:left;font-weight:800;font-size:13px;line-height:1.2;padding:6px;cursor:pointer}.taFloatingBroker .taBrokerDot{width:34px;height:34px;border-radius:10px;display:grid;place-items:center;background:#ffd43b;color:#08111f;font-weight:900}.taFloatingBroker .taBrokerClose{position:absolute;right:8px;top:8px;width:28px;height:28px;border:0;border-radius:50%;background:rgba(255,255,255,.10);color:#fff;font-size:16px;cursor:pointer}
      @media (min-width:760px){.taFloatingBroker{left:auto;right:24px;width:360px;bottom:24px}}
    `;
    document.head.appendChild(style);
  }

  function syncFloatingBroker() {
    injectTechnicalCourseEnhancements();
    const isCourse=!!document.querySelector(".technicalCourse");
    let bar=document.getElementById("taFloatingBroker");
    if (!isCourse) { if(bar) bar.remove(); return; }
    if (sessionStorage.getItem("educashpro:ta-broker-closed")==="1") return;
    if (bar) return;
    const lang=normalizeLanguage(window.__EDUCASHPRO_TA_LANGUAGE || "pt");
    const p=I18N[lang]?.partner || I18N.pt.partner;
    bar=document.createElement("aside");
    bar.id="taFloatingBroker";
    bar.className="taFloatingBroker";
    bar.innerHTML=`<span class="taBrokerDot">↗</span><button type="button" class="taBrokerOpen">${escapeHtml(p.floating)}</button><button type="button" class="taBrokerClose" aria-label="${escapeHtml(p.close)}">✕</button>`;
    bar.querySelector(".taBrokerOpen").onclick=()=>{ try { window.Telegram?.WebApp?.openLink(EXNESS_URL); } catch { window.open(EXNESS_URL,"_blank","noopener"); } };
    bar.querySelector(".taBrokerClose").onclick=()=>{ sessionStorage.setItem("educashpro:ta-broker-closed","1"); bar.remove(); };
    document.body.appendChild(bar);
  }

  const observer=new MutationObserver(()=>syncFloatingBroker());
  window.addEventListener("DOMContentLoaded",()=>{injectTechnicalCourseEnhancements();observer.observe(document.body,{childList:true,subtree:true});syncFloatingBroker();},{once:true});

  window.EDUCASHPRO_TECHNICAL_ANALYSIS_COURSE={id:COURSE_ID,getCourseData};
})();