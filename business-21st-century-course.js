(function () {
  "use strict";

  const COURSE_ID = "negocio_seculo_xxi";
  const content = document.getElementById("content");

  function lang() {
    const value = String(document.documentElement.lang || "pt").toLowerCase();
    if (value.startsWith("en")) return "en";
    if (value.startsWith("es")) return "es";
    if (value.startsWith("ru")) return "ru";
    return "pt";
  }

  function escapeHtml(value) {
    return String(value ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);
  }

  const PT = {
    title: "Educar para Multiplicar",
    subtitle: "Ativos, negócios, redes e crescimento sustentável",
    intro: [
      "Este curso foi criado pelo EduCashPro para desenvolver uma compreensão prática sobre educação financeira, construção de ativos, empreendedorismo e marketing de rede. A proposta não é ensinar fórmulas de enriquecimento, mas mostrar como conhecimento, relacionamento, sistemas e liderança podem ser organizados para produzir valor ao longo do tempo.",
      "A ideia central é simples: antes de multiplicar resultados, é necessário multiplicar capacidade. Isso significa aprender a administrar dinheiro, desenvolver habilidades, criar processos, atender pessoas, formar relacionamentos e construir estruturas que não dependam exclusivamente de uma única hora de trabalho.",
      "Ao longo das aulas, você será convidado a observar sua própria realidade. Em vez de perguntar apenas quanto deseja ganhar, aprenderá a perguntar o que está construindo, quais competências possui, onde está sua dependência e quais sistemas podem ser desenvolvidos para ampliar sua capacidade de gerar valor.",
      "O marketing de rede aparece aqui como uma das formas possíveis de organização comercial baseada em produtos ou serviços reais, clientes, indicação, relacionamento, treinamento e desenvolvimento de equipe. Não é apresentado como garantia de renda nem como substituto de planejamento financeiro." 
    ],
    back: "Voltar para a Academy", next: "Próxima aula", prev: "Aula anterior", lesson: "Aula", of: "de", apply: "Aplicação prática", key: "Princípio EduCashPro", reflection: "Para refletir", warning: "Importante",
    disclaimer: "Conteúdo educacional. Nenhuma atividade empresarial ou de marketing de rede garante renda. Resultados dependem de produto ou serviço real, demanda, vendas, relacionamento, custos, liderança, execução e regras do negócio. Evite decisões baseadas em promessa de ganho e não contraia dívidas apenas para participar de uma oportunidade.",
    lessons: [
      {
        title: "A segurança financeira começa pela consciência",
        body: [
          "Muitas pessoas associam segurança financeira a ter um emprego, receber um salário ou possuir determinada quantidade de dinheiro. Esses elementos podem contribuir para estabilidade, mas não substituem consciência financeira. Se a pessoa não entende de onde vem sua renda, como gasta, quanto custa seu estilo de vida e quanto consegue reservar para construir patrimônio, ela permanece vulnerável mesmo quando ganha bem.",
          "Educação financeira começa quando o dinheiro deixa de ser apenas algo que entra e sai da conta e passa a ser observado como um fluxo. Você precisa saber quanto entra, quanto sai, o que é essencial, o que é desperdício, quais compromissos são recorrentes e quais decisões estão aumentando ou reduzindo sua capacidade futura.",
          "O primeiro nível de crescimento não é ganhar mais. É compreender melhor. Uma pessoa que aumenta a renda sem modificar comportamento pode apenas aumentar despesas. Por outro lado, quem aprende a administrar recursos cria espaço para investir em conhecimento, ferramentas, negócios ou ativos.",
          "Assumir responsabilidade financeira não significa controlar todos os acontecimentos externos. Significa desenvolver capacidade para responder melhor a eles."],
        key: "Controle financeiro não é controlar a economia; é conhecer seus números e aumentar sua capacidade de decisão.",
        apply: "Registre sua renda líquida mensal, despesas fixas, despesas variáveis, dívidas, reservas e valor disponível para construção de patrimônio. Não estime: use números reais.",
        reflection: "Se sua principal fonte de renda fosse interrompida por três meses, quais partes da sua vida financeira continuariam funcionando?"
      },
      {
        title: "A qualidade da renda importa tanto quanto a quantidade",
        body: [
          "Duas pessoas podem ganhar o mesmo valor e possuir realidades completamente diferentes. Uma pode depender de trabalhar todos os dias para receber; outra pode combinar trabalho, comissões, negócios e investimentos. O valor mensal é igual, mas a estrutura que produz esse dinheiro é diferente.",
          "Renda baseada exclusivamente em horas trabalhadas possui um limite natural: o tempo disponível. Ela pode ser excelente e necessária, mas é importante reconhecer sua dependência. Quando a renda depende da presença física ou mental constante, qualquer interrupção pode afetar diretamente o fluxo financeiro.",
          "A evolução financeira acontece quando a pessoa começa a construir mais de uma capacidade de geração de valor. Isso não exige abandonar o trabalho atual. Pode começar com uma habilidade comercial, um pequeno serviço, uma atividade digital, uma carteira de investimentos ou uma organização de vendas construída gradualmente.",
          "Diversificar renda não significa fazer dez coisas ao mesmo tempo. Significa reduzir dependência de uma única estrutura de geração de dinheiro."],
        key: "Não observe apenas quanto você ganha. Observe como esse dinheiro é produzido e o quanto essa fonte depende exclusivamente de você.",
        apply: "Classifique cada fonte de renda como: depende totalmente do meu tempo; depende parcialmente do meu tempo; ou pode continuar gerando valor sem minha presença constante.",
        reflection: "Qual fonte de renda você poderia começar a desenvolver sem abandonar a que já possui?"
      },
      {
        title: "Quatro estruturas de geração de renda",
        body: [
          "Para compreender crescimento financeiro, é útil observar quatro estruturas: emprego, trabalho autônomo, negócio organizado em sistemas e investimento. Nenhuma delas é automaticamente melhor. Cada uma possui vantagens, riscos, responsabilidades e exigências diferentes.",
          "No emprego, a pessoa troca conhecimento e tempo por remuneração dentro de uma organização. No trabalho autônomo, ela possui mais controle, mas frequentemente continua dependente da própria execução. No negócio estruturado, o desafio é criar processos, equipe, distribuição e gestão capazes de funcionar além de uma única pessoa. No investimento, o capital é alocado com expectativa de retorno, sempre acompanhado de risco.",
          "O erro é imaginar que mudar de atividade significa necessariamente mudar de estrutura. Um profissional pode abrir uma empresa e continuar completamente preso ao próprio trabalho. Pode ter CNPJ, funcionários e faturamento, mas se tudo parar quando ele se ausenta, ainda existe forte dependência pessoal.",
          "A pergunta relevante é: o que você está construindo além do seu esforço imediato?"],
        key: "Crescimento financeiro envolve migrar gradualmente de dependência exclusiva do esforço pessoal para estruturas mais organizadas de geração de valor.",
        apply: "Desenhe quatro quadrantes em uma folha e coloque suas fontes atuais de renda em emprego, autônomo, negócio/sistema e investimento.",
        reflection: "Em qual estrutura você está mais concentrado e qual gostaria de desenvolver nos próximos cinco anos?"
      },
      {
        title: "Ativo é aquilo que você constrói para produzir valor",
        body: [
          "No uso cotidiano da educação financeira, costuma-se chamar de ativo aquilo que possui potencial de gerar valor ou fluxo de caixa. Na contabilidade, o termo tem definição técnica própria. Para este curso, o mais importante é compreender a lógica econômica: você está acumulando apenas despesas ou também construindo coisas capazes de produzir valor no futuro?",
          "Um ativo financeiro pode produzir juros, dividendos ou valorização. Um imóvel pode produzir aluguel. Um negócio pode produzir resultado por meio de clientes, processos e equipe. Propriedade intelectual pode gerar receita por licenciamento. Uma rede comercial pode produzir valor quando existe atividade real, clientes, vendas, treinamento e retenção.",
          "Nem todo projeto é automaticamente um ativo. Um perfil em rede social sem audiência relevante, um grupo sem participação ou um negócio que só consome recursos não devem ser tratados como ativos simplesmente porque foram criados. O valor aparece quando existe capacidade real de gerar benefício econômico ou estratégico.",
          "A construção de ativos normalmente exige uma fase em que você trabalha mais do que recebe. A diferença é que parte desse esforço está sendo convertida em estrutura, conhecimento, reputação, base de clientes ou capital."],
        key: "A pergunta não é apenas 'quanto isto vale hoje?', mas 'que capacidade de produzir valor estou construindo aqui?'.",
        apply: "Liste cinco coisas que você possui ou está construindo e escreva ao lado como cada uma poderia produzir valor de maneira legítima.",
        reflection: "Seu tempo atual está sendo usado apenas para pagar o presente ou também para construir o futuro?"
      },
      {
        title: "O primeiro ativo é conhecimento aplicável",
        body: [
          "Conhecimento só se transforma em ativo pessoal quando altera sua capacidade de agir. Ler sobre vendas, comunicação ou finanças pode ampliar visão, mas o verdadeiro desenvolvimento ocorre quando você testa o conhecimento em situações reais, observa resultados e melhora sua execução.",
          "Negócios exigem habilidades que raramente são dominadas apenas pela teoria: conversar com pessoas, identificar necessidades, explicar valor, lidar com objeções, organizar contatos, acompanhar clientes, negociar, treinar e tomar decisões com informação incompleta.",
          "Por isso, a educação empresarial precisa combinar estudo e prática. Pequenas experiências, realizadas de maneira responsável, ensinam muito sobre mercado. Uma conversa com um cliente pode revelar mais sobre uma oferta do que horas tentando aperfeiçoá-la sozinho.",
          "O profissional que aprende continuamente aumenta sua capacidade de adaptação. Em ambientes econômicos e tecnológicos que mudam rápido, essa capacidade pode ser mais valiosa do que dominar uma única ferramenta."],
        key: "Conhecimento gera valor quando se transforma em habilidade observável.",
        apply: "Escolha uma habilidade entre vendas, comunicação, organização financeira, liderança ou marketing. Defina uma prática diária de 20 minutos durante sete dias.",
        reflection: "Qual conhecimento você já possui, mas ainda não transformou em comportamento?"
      },
      {
        title: "Desenvolvimento pessoal é infraestrutura do negócio",
        body: [
          "Empreender e construir uma rede expõem características pessoais que podem permanecer escondidas em outros contextos. Medo de rejeição, dificuldade de manter disciplina, necessidade de aprovação, ansiedade por resultado imediato e resistência a receber feedback começam a interferir diretamente na execução.",
          "Desenvolvimento pessoal não é repetir frases positivas. É aprender a reconhecer padrões de comportamento e criar respostas melhores. Significa conseguir ouvir um 'não' sem transformar a resposta em rejeição pessoal, manter consistência quando o entusiasmo diminui e aceitar correções sem abandonar o processo.",
          "Autoconfiança saudável nasce principalmente da competência. Quanto mais você pratica uma habilidade e percebe evolução, menos depende de motivação momentânea. Por isso, disciplina e aprendizagem são mais importantes do que entusiasmo constante.",
          "Uma organização cresce até o limite da capacidade de seus líderes de aprender, comunicar e desenvolver outras pessoas."],
        key: "Crescimento externo sustentável exige crescimento interno compatível.",
        apply: "Identifique um comportamento que hoje limita sua execução. Defina um gatilho, uma nova resposta e uma forma de acompanhar sua evolução por 30 dias.",
        reflection: "Qual dificuldade pessoal aparece repetidamente quando você tenta crescer?"
      },
      {
        title: "Relacionamentos são capital social",
        body: [
          "Nenhum negócio cresce isolado. Clientes, parceiros, fornecedores, mentores, colaboradores e pessoas que indicam oportunidades formam um conjunto de relações que pode ampliar acesso a conhecimento, confiança e mercado.",
          "Capital social não significa conhecer muita gente. Significa cultivar relações baseadas em respeito, reciprocidade e credibilidade. Uma pessoa que só procura os outros quando precisa vender alguma coisa enfraquece sua própria rede.",
          "Relacionamentos fortes são construídos antes da necessidade. Eles nascem de conversas, entregas consistentes, ajuda real e reputação. No marketing de rede, isso é especialmente importante porque confiança precede indicação.",
          "A qualidade da rede também influencia comportamento. Ambientes que valorizam estudo, ética e execução tendem a elevar o padrão de seus participantes."],
        key: "Rede forte é consequência de confiança acumulada, não de uma lista grande de contatos.",
        apply: "Escolha dez contatos importantes e registre quando foi sua última interação de valor com cada um. Retome duas relações sem tentar vender nada.",
        reflection: "As pessoas lembram de você apenas quando recebem uma oferta ou também quando recebem valor?"
      },
      {
        title: "Marketing de rede: produto, cliente e distribuição",
        body: [
          "Marketing de rede é um modelo de distribuição em que participantes independentes comercializam produtos ou serviços e podem desenvolver equipes de distribuição conforme as regras da empresa. A existência de rede não elimina a necessidade de produto, cliente e venda real.",
          "Um modelo sustentável precisa possuir algo que pessoas comprariam pelo valor recebido, e não apenas pelo direito de participar. Quando o foco deixa de ser produto ou serviço e passa a depender principalmente de entrada de novos participantes, o risco de distorção aumenta.",
          "Para o profissional, o marketing de rede pode funcionar como laboratório de habilidades comerciais: comunicação, indicação, atendimento, apresentação, acompanhamento, treinamento e liderança. Essas competências também são úteis em negócios tradicionais.",
          "A rede pode adquirir valor econômico quando existe base de clientes, atividade recorrente, pessoas treinadas, processos simples e capacidade de retenção. Apenas cadastrar nomes não constrói esse valor."],
        key: "Marketing de rede legítimo começa por valor real para clientes e só depois por expansão da distribuição.",
        apply: "Escolha qualquer empresa de venda direta que você conheça e responda: qual problema o produto resolve, quem compra sem participar da rede e por que o cliente recompra?",
        reflection: "Se a oportunidade de comissão desaparecesse, o produto ou serviço ainda teria compradores?"
      },
      {
        title: "A rede como sistema de distribuição",
        body: [
          "Uma pessoa possui limite de tempo e alcance. Uma rede organizada amplia distribuição porque várias pessoas aprendem a apresentar uma solução, atender clientes e ensinar outras a executar o processo.",
          "Esse crescimento não acontece pela multiplicação de discursos. A verdadeira expansão ocorre quando conhecimento e comportamento conseguem ser reproduzidos com qualidade. Se um processo só funciona nas mãos de uma pessoa extremamente talentosa, ele dificilmente será escalável.",
          "Por isso, simplicidade é estratégica. Scripts curtos, materiais claros, treinamento organizado e padrões de atendimento facilitam aprendizagem. A tecnologia pode ajudar a padronizar conteúdo e acompanhamento, mas deve servir às relações humanas.",
          "Quanto mais simples, ético e mensurável for o processo, maior a chance de outra pessoa aprender e repetir sem depender permanentemente de quem a convidou."],
        key: "Escala é a capacidade de repetir qualidade, não apenas aumentar quantidade.",
        apply: "Descreva em uma página o processo que uma nova pessoa deveria aprender na primeira semana. Retire tudo que não for essencial.",
        reflection: "Seu processo é ensinável ou depende da sua personalidade?"
      },
      {
        title: "Duplicação: aprender, aplicar, ensinar",
        body: [
          "Duplicação é frequentemente mal compreendida como simples cópia. No contexto de desenvolvimento de rede, ela é a capacidade de transformar uma prática funcional em algo que outras pessoas consigam compreender, executar e ensinar novamente.",
          "A sequência mais saudável é aprender, aplicar, medir e só depois ensinar. Quando alguém transmite um processo que nunca executou, tende a reproduzir teoria sem experiência. Quando executa, registra resultados e corrige, consegue ensinar com mais clareza.",
          "Duplicar também exige tolerar diferenças. Pessoas não terão a mesma personalidade, ritmo ou estilo. O objetivo é preservar princípios e processos essenciais, não fabricar cópias do líder.",
          "Uma boa duplicação reduz dependência. O sucesso do treinamento aparece quando o novo participante consegue caminhar sem precisar de autorização para cada passo."],
        key: "Duplicação é autonomia reproduzível.",
        apply: "Escolha uma tarefa que você domina e ensine a outra pessoa em três etapas: demonstre, acompanhe a execução e observe-a ensinar de volta.",
        reflection: "Você está formando pessoas independentes ou criando pessoas que sempre precisam de você?"
      },
      {
        title: "Liderança é desenvolver capacidade nos outros",
        body: [
          "Liderança não é ser o centro da rede. É aumentar a capacidade das pessoas que fazem parte dela. Um líder cria clareza, estabelece exemplo, oferece feedback e ajuda outros a assumir responsabilidade.",
          "Equipes frágeis dependem da energia de uma única pessoa. Quando esse líder se afasta, tudo diminui. Equipes maduras distribuem conhecimento, funções e liderança. Novas pessoas são treinadas para resolver problemas, não apenas para encaminhá-los ao topo.",
          "A liderança também exige coerência ética. Pressionar pessoas a comprar, ocultar riscos ou exagerar resultados pode gerar crescimento rápido no curto prazo e destruir confiança no longo prazo.",
          "O líder profissional mede sua influência pela evolução das pessoas, não apenas pelo tamanho da equipe."],
        key: "Liderar é tornar outras pessoas mais capazes.",
        apply: "Escolha uma pessoa e pergunte qual habilidade ela precisa dominar para depender menos de você. Crie um pequeno plano de desenvolvimento.",
        reflection: "Se você se ausentasse por um mês, sua equipe saberia o que fazer?"
      },
      {
        title: "Sistemas transformam esforço em organização",
        body: [
          "Sem sistema, cada venda, convite ou atendimento começa do zero. Isso consome energia e torna resultado difícil de repetir. Sistemas são sequências definidas de ações que ajudam a manter qualidade e reduzir improviso.",
          "Um sistema comercial pode incluir captação, qualificação, apresentação, acompanhamento, atendimento, pós-venda, treinamento e métricas. Não precisa ser sofisticado. Uma planilha bem organizada pode ser mais útil do que uma ferramenta cara mal utilizada.",
          "O sistema também protege memória. Quando o processo está documentado, a organização não depende de alguém lembrar de tudo. Isso facilita treinamento de novos participantes e permite identificar onde os resultados estão se perdendo.",
          "Com o tempo, automação pode assumir tarefas repetitivas, como lembretes, distribuição de conteúdo e organização de informações. O relacionamento, entretanto, continua exigindo atenção humana."],
        key: "O que é repetido deve ser documentado; o que é documentado pode ser melhorado; o que é estável pode ser automatizado.",
        apply: "Mapeie seu processo atual do primeiro contato ao pós-venda. Identifique uma etapa para documentar e uma etapa que poderia ser automatizada.",
        reflection: "Quais tarefas você repete toda semana sem possuir um processo definido?"
      },
      {
        title: "Produto real e cliente real vêm antes da rede",
        body: [
          "Uma oportunidade comercial só é sustentável se existe valor real sendo entregue. O primeiro teste é simples: alguém compraria o produto ou serviço mesmo que não pudesse receber comissão por indicá-lo?",
          "Produtos bons resolvem problemas, atendem desejos legítimos ou oferecem conveniência percebida pelo cliente. Preço, qualidade, recompra, atendimento e reputação precisam fazer sentido fora da narrativa de oportunidade.",
          "Isso protege o profissional de construir uma organização baseada apenas em entusiasmo. Redes sustentáveis possuem clientes reais, não apenas participantes consumindo para manter posição ou expectativa de ganho.",
          "Antes de aprender a recrutar, aprenda a compreender o cliente. Pergunte, escute, identifique necessidade e apresente solução sem pressão."],
        key: "O negócio começa no cliente, não no plano de remuneração.",
        apply: "Converse com três clientes ou potenciais clientes e faça perguntas sobre necessidade, experiência e percepção de valor. Não tente fechar a venda durante a pesquisa.",
        reflection: "Você consegue explicar por que alguém deveria comprar o produto sem mencionar a oportunidade de renda?"
      },
      {
        title: "Convidar sem pressionar",
        body: [
          "O convite é apenas a abertura de uma conversa. Seu objetivo não é convencer alguém em poucos segundos, mas verificar se existe interesse suficiente para uma apresentação mais completa.",
          "Convites eficientes são claros, breves e respeitam a autonomia da pessoa. Exageros, urgência artificial e promessas de ganhos podem aumentar curiosidade momentânea, mas comprometem confiança.",
          "A qualidade da prospecção melhora quando você para de tratar todos como candidatos. Pessoas possuem objetivos, momentos e necessidades diferentes. O papel do profissional é identificar compatibilidade, não forçar encaixe.",
          "Um 'não' pode significar não agora, não para esse produto, não para esse modelo ou simplesmente não. Respeitar a resposta preserva relacionamento."],
        key: "Convite profissional cria interesse e liberdade de escolha.",
        apply: "Escreva três convites: um para conhecer um produto, outro para conhecer uma oportunidade e outro para participar de uma apresentação. Limite cada um a duas frases.",
        reflection: "Seu convite desperta curiosidade ou cria pressão?"
      },
      {
        title: "Apresentar valor antes de falar de ganhos",
        body: [
          "Uma apresentação profissional explica o que é oferecido, para quem serve, qual problema resolve, como funciona e quais são os próximos passos. O plano de remuneração é apenas uma parte do modelo, não o centro de toda comunicação.",
          "Quando o discurso começa por grandes ganhos, a pessoa tende a avaliar a oportunidade como promessa financeira. Isso aumenta expectativas e pode atrair participantes que não possuem interesse real no produto, no cliente ou no trabalho necessário.",
          "Apresentações mais sustentáveis mostram primeiro produto, mercado, cliente, atividade necessária e custos. Depois explicam como a remuneração funciona, deixando claro que comissão depende de vendas e regras específicas.",
          "Clareza reduz frustração. Quem entra entendendo o processo tende a tomar decisões mais conscientes."],
        key: "Venda possibilidade com clareza, não fantasia com emoção.",
        apply: "Revise sua apresentação e retire qualquer frase que possa ser interpretada como garantia de renda. Acrescente produto, cliente, custos e trabalho necessário.",
        reflection: "Se uma pessoa assistir à sua apresentação, ela saberá exatamente o que terá de fazer?"
      },
      {
        title: "Acompanhamento é relacionamento, não perseguição",
        body: [
          "Poucas decisões importantes acontecem no primeiro contato. O acompanhamento existe para responder dúvidas, fornecer informação e permitir que a pessoa amadureça sua escolha.",
          "O problema surge quando follow-up se transforma em insistência. Mensagens diárias, pressão emocional ou culpa podem produzir uma adesão e destruir um relacionamento. O profissional precisa aprender a diferenciar interesse de evasão.",
          "Um bom acompanhamento possui contexto. Você registra o que a pessoa perguntou, o que valorizou e qual próximo passo combinou. Assim, cada conversa continua de onde a anterior terminou.",
          "Ferramentas podem lembrar você de acompanhar, mas a mensagem precisa respeitar a conversa real."],
        key: "Follow-up eficiente ajuda a decidir; não tenta cansar a pessoa até ela aceitar.",
        apply: "Crie uma rotina de acompanhamento com três momentos: confirmação após apresentação, resposta a dúvidas e contato final respeitoso.",
        reflection: "Você acompanha com propósito ou apenas pergunta repetidamente 'e aí, decidiu?'"
      },
      {
        title: "Treinamento simples produz mais que excesso de informação",
        body: [
          "Novos participantes costumam receber informação demais. Produtos, regras, ferramentas, técnicas, scripts e metas chegam ao mesmo tempo. O excesso pode gerar paralisia.",
          "Um bom treinamento organiza prioridades. Primeiro, a pessoa precisa compreender produto, cliente, ética e processo básico. Depois aprende prospecção, apresentação e acompanhamento. Liderança e automação entram à medida que existe atividade real para organizar.",
          "Treinamento também deve ser aplicável. Cada aula precisa terminar com uma ação observável. Isso permite medir aprendizagem pela execução, e não apenas pela quantidade de vídeos assistidos.",
          "A cultura de uma rede é construída pelo que é repetidamente ensinado e praticado."],
        key: "Treinar é reduzir complexidade até que a pessoa consiga agir com segurança.",
        apply: "Monte um roteiro de primeiros sete dias para um novo participante contendo no máximo uma habilidade principal por dia.",
        reflection: "Seu treinamento ajuda a agir ou apenas transfere informação?"
      },
      {
        title: "Automação deve ampliar eficiência sem destruir confiança",
        body: [
          "Automação é valiosa quando elimina tarefas repetitivas e reduz esquecimentos. Programar conteúdo, organizar contatos, enviar lembretes e distribuir materiais pode liberar tempo para atividades de maior valor.",
          "O risco aparece quando automação vira spam. Mensagens genéricas enviadas em massa podem aumentar volume e reduzir credibilidade. Pessoas percebem quando estão sendo tratadas apenas como números.",
          "A melhor automação ocorre nos bastidores: organização, segmentação, agendamento, métricas e preparação de materiais. Quanto mais sensível for a conversa, maior deve ser a presença humana.",
          "No EduCashPro, o princípio é: automatize o processo, não automatize a confiança."],
        key: "Tecnologia deve aumentar sua capacidade de servir, não aumentar sua capacidade de incomodar.",
        apply: "Liste suas tarefas semanais e marque quais são repetitivas, quais exigem julgamento e quais exigem relacionamento. Automatize apenas a primeira categoria inicialmente.",
        reflection: "Sua automação melhora a experiência da outra pessoa ou apenas economiza seu tempo?"
      },
      {
        title: "Como avaliar uma oportunidade com responsabilidade",
        body: [
          "Antes de participar de um negócio, investigue. Entusiasmo não substitui diligência. Avalie empresa, produto, demanda, preço, reputação, suporte, contrato, política de devolução, custos obrigatórios, exigências de compra e forma de remuneração.",
          "Observe especialmente de onde vem a receita. Modelos sustentáveis dependem de venda de produtos ou serviços para clientes. Estruturas focadas predominantemente em entrada de pessoas, taxas de adesão ou promessas de retorno exigem cautela redobrada.",
          "Também avalie compatibilidade pessoal. Um bom negócio para alguém pode não ser adequado para você. Produto, mercado, rotina, valores e tipo de relacionamento precisam fazer sentido.",
          "Decisão responsável inclui a possibilidade de dizer não, mesmo quando amigos ou líderes estão animados."],
        key: "Escolher bem é parte da construção do ativo.",
        apply: "Crie um checklist com pelo menos 15 itens e pesquise qualquer oportunidade antes de comprometer dinheiro ou reputação.",
        reflection: "Você escolheria essa empresa se não conhecesse ninguém nela?"
      },
      {
        title: "Métricas: o que não é medido vira opinião",
        body: [
          "Crescimento de rede pode parecer subjetivo quando tudo é avaliado por sensação. Métricas simples transformam percepção em informação. Quantos contatos qualificados foram feitos? Quantas apresentações? Quantos acompanhamentos? Quantos clientes? Qual taxa de recompra? Quantas pessoas treinadas continuam ativas?",
          "Métrica não serve para pressionar pessoas. Serve para entender processo. Se muitos aceitam apresentação e poucos compram, a oferta ou comunicação pode estar fraca. Se muitas pessoas entram e poucas permanecem, o problema pode estar no treinamento, expectativa ou valor entregue.",
          "Acompanhar poucos indicadores relevantes é melhor do que criar dezenas de números que ninguém usa. O objetivo é descobrir onde melhorar.",
          "Resultados financeiros são consequência tardia. Atividades e qualidade de processo são indicadores que você consegue ajustar mais cedo."],
        key: "Meça comportamento antes de cobrar resultado.",
        apply: "Escolha cinco indicadores semanais: contatos qualificados, apresentações, follow-ups, novos clientes e pessoas treinadas. Registre por quatro semanas.",
        reflection: "Você sabe exatamente qual etapa do seu processo precisa melhorar?"
      },
      {
        title: "Plano de 30 dias: construir antes de multiplicar",
        body: [
          "Os próximos 30 dias não devem ser usados para perseguir um número de renda. O objetivo é construir base: conhecimento, rotina, processo, atendimento e relacionamento. Quando a base melhora, a capacidade de resultado também melhora.",
          "Na primeira semana, organize produto, público, mensagem e lista de contatos. Na segunda, pratique convites e apresentações. Na terceira, melhore acompanhamento e atendimento. Na quarta, documente o que funcionou e comece a ensinar processos simples a outra pessoa.",
          "Reserve um momento semanal para revisar números e comportamento. Pergunte o que funcionou, o que não funcionou, o que precisa ser simplificado e qual habilidade mais limita seu avanço.",
          "Ao final do mês, você não deve apenas contar quantas pessoas entraram. Deve conseguir mostrar quais competências desenvolveu e quais sistemas começou a construir."],
        key: "Primeiro construa capacidade. Depois multiplique capacidade.",
        apply: "Defina metas de atividade para quatro semanas. Priorize ações que você controla: estudar, convidar, apresentar, acompanhar, atender, treinar e registrar.",
        reflection: "Qual ativo pessoal ou empresarial você conseguirá mostrar depois de 30 dias, mesmo que a renda ainda não tenha mudado?"
      },
      {
        title: "Multiplicação sustentável: pessoas, sistemas e propósito",
        body: [
          "Multiplicar não é apenas aumentar volume. É ampliar conhecimento, capacidade, clientes, processos, liderança e geração de valor sem perder qualidade. Crescimento que destrói confiança não é multiplicação sustentável.",
          "Uma organização madura possui pessoas que sabem aprender e ensinar, processos que podem ser repetidos, clientes que percebem valor e líderes que desenvolvem novos líderes. Essa combinação reduz dependência de uma única pessoa.",
          "O propósito também importa. Quem constrói apenas por expectativa de ganho tende a abandonar quando a recompensa demora. Quem compreende o valor que entrega, as habilidades que desenvolve e o futuro que está construindo possui uma motivação mais consistente.",
          "Educar para Multiplicar significa exatamente isso: transformar conhecimento em capacidade, capacidade em estrutura e estrutura em valor compartilhado."],
        key: "A melhor multiplicação é aquela em que mais pessoas se tornam capazes de gerar valor com autonomia e ética.",
        apply: "Escreva seu plano de 12 meses em quatro dimensões: educação financeira, habilidades, sistema comercial e liderança. Defina um indicador para cada uma.",
        reflection: "Você quer apenas aumentar sua renda ou está construindo algo que continua produzindo valor enquanto outras pessoas também crescem?"
      }
    ]
  };

  function translated(language) {
    if (language === "pt") return PT;
    const maps = {
      en: {title:"Educate to Multiply",subtitle:"Assets, business, networks and sustainable growth",back:"Back to Academy",next:"Next lesson",prev:"Previous lesson",lesson:"Lesson",of:"of",apply:"Practical application",key:"EduCashPro principle",reflection:"Reflect",warning:"Important",disclaimer:"Educational content. No business or network-marketing activity guarantees income. Results depend on a real product or service, demand, sales, relationships, costs, leadership, execution and business rules. Avoid decisions based on income promises and do not borrow money merely to join an opportunity."},
      es: {title:"Educar para Multiplicar",subtitle:"Activos, negocios, redes y crecimiento sostenible",back:"Volver a Academy",next:"Siguiente lección",prev:"Lección anterior",lesson:"Lección",of:"de",apply:"Aplicación práctica",key:"Principio EduCashPro",reflection:"Para reflexionar",warning:"Importante",disclaimer:"Contenido educativo. Ninguna actividad empresarial o de marketing de red garantiza ingresos. Los resultados dependen de producto o servicio real, demanda, ventas, relaciones, costos, liderazgo, ejecución y reglas del negocio. Evita decisiones basadas en promesas de ganancias y no te endeudes solo para participar."},
      ru: {title:"Обучайся, чтобы умножать",subtitle:"Активы, бизнес, сети и устойчивый рост",back:"Назад в Academy",next:"Следующий урок",prev:"Предыдущий урок",lesson:"Урок",of:"из",apply:"Практика",key:"Принцип EduCashPro",reflection:"Для размышления",warning:"Важно",disclaimer:"Образовательный материал. Бизнес и сетевой маркетинг не гарантируют доход. Результаты зависят от реального продукта или услуги, спроса, продаж, отношений, затрат, лидерства, исполнения и правил бизнеса. Не принимайте решения на основе обещаний дохода и не берите долг только ради участия."}
    };
    const m = maps[language] || maps.en;
    return {
      ...PT,
      ...m,
      intro: language === "en" ? ["This EduCashPro course develops a practical understanding of financial education, asset building, entrepreneurship and network marketing. It does not teach quick-rich formulas; it focuses on building knowledge, relationships, systems and leadership that can create value over time.","Before multiplying results, multiply capability: manage money, develop skills, create processes, serve customers, build relationships and form structures that do not depend on a single hour of work."] : language === "es" ? ["Este curso EduCashPro desarrolla una comprensión práctica de educación financiera, construcción de activos, emprendimiento y marketing de red. No enseña fórmulas de enriquecimiento rápido; se concentra en conocimiento, relaciones, sistemas y liderazgo.","Antes de multiplicar resultados, multiplica capacidad: administra dinero, desarrolla habilidades, crea procesos, atiende clientes y construye relaciones y estructuras."] : ["Этот курс EduCashPro посвящён финансовой грамотности, созданию активов, предпринимательству и сетевому маркетингу. Здесь нет формул быстрого обогащения: акцент сделан на знаниях, отношениях, системах и лидерстве.","Прежде чем умножать результаты, нужно умножить возможности: управлять деньгами, развивать навыки, создавать процессы, обслуживать клиентов и строить устойчивые структуры."],
      lessons: PT.lessons.map((item, i) => ({
        title: language === "en" ? ["Financial security starts with awareness","Income quality matters","Four income structures","Build assets that create value","Applied knowledge is the first asset","Personal development is business infrastructure","Relationships are social capital","Network marketing: product, customer and distribution","The network as a distribution system","Duplication: learn, apply, teach","Leadership develops capability in others","Systems turn effort into organization","Real product and real customers come first","Invite without pressure","Present value before earnings","Follow-up is relationship, not pursuit","Simple training beats information overload","Automation must preserve trust","Evaluate opportunities responsibly","Metrics turn opinions into information","30-day plan: build before multiplying","Sustainable multiplication: people, systems and purpose"][i] : language === "es" ? ["La seguridad financiera comienza con conciencia","La calidad del ingreso importa","Cuatro estructuras de ingresos","Construye activos que generen valor","El conocimiento aplicado es el primer activo","El desarrollo personal es infraestructura","Las relaciones son capital social","Marketing de red: producto, cliente y distribución","La red como sistema de distribución","Duplicación: aprender, aplicar, enseñar","Liderazgo es desarrollar capacidad","Los sistemas convierten esfuerzo en organización","Producto real y cliente real primero","Invitar sin presionar","Presenta valor antes que ganancias","Seguimiento es relación, no persecución","Entrenamiento simple vence al exceso","Automatiza sin destruir confianza","Evalúa oportunidades con responsabilidad","Métricas convierten opinión en información","Plan de 30 días: construir antes de multiplicar","Multiplicación sostenible: personas, sistemas y propósito"][i] : ["Финансовая безопасность начинается с осознанности","Важна не только сумма, но и качество дохода","Четыре структуры дохода","Создавайте активы, производящие ценность","Первый актив — применимые знания","Личностный рост — инфраструктура бизнеса","Отношения — социальный капитал","Сетевой маркетинг: продукт, клиент и дистрибуция","Сеть как система дистрибуции","Дублирование: учиться, применять, обучать","Лидерство развивает способности других","Системы превращают усилие в организацию","Сначала реальный продукт и реальный клиент","Приглашайте без давления","Сначала ценность, потом доход","Сопровождение — это отношения","Простое обучение лучше перегруза","Автоматизация должна сохранять доверие","Оценивайте возможности ответственно","Метрики превращают мнение в информацию","План на 30 дней: сначала строить","Устойчивое умножение: люди, системы и смысл"][i],
        body: language === "en" ? [item.body[0], item.body[2]] : language === "es" ? [item.body[0], item.body[2]] : [item.body[0], item.body[2]],
        key: item.key,
        apply: item.apply,
        reflection: item.reflection
      }))
    };
  }

  let current = 0;
  function getCopy() { return translated(lang()); }

  function goBack() {
    const learn = document.querySelector('#bottomNav button[data-view="learn"]');
    if (learn) learn.click();
  }

  function render(index) {
    const c = getCopy();
    current = Math.max(0, Math.min(c.lessons.length - 1, Number(index || 0)));
    const item = c.lessons[current];
    const intro = current === 0 ? `<article class="lessonCard">${c.intro.map((p) => `<p>${escapeHtml(p)}</p>`).join("")}</article>` : "";
    const body = item.body.map((p) => `<p>${escapeHtml(p)}</p>`).join("");
    content.innerHTML = `
      <button id="business21Back" class="textButton">← ${escapeHtml(c.back)}</button>
      <section class="courseHero">
        <span class="eyebrow">EDUCASHPRO • EXCLUSIVO PARA ASSINANTES</span>
        <h2>${escapeHtml(c.title)}</h2>
        <p>${escapeHtml(c.subtitle)}</p>
      </section>
      ${intro}
      <div class="sectionHead"><div><h2>${escapeHtml(c.lesson)} ${current + 1} ${escapeHtml(c.of)} ${c.lessons.length}</h2><p>${escapeHtml(item.title)}</p></div></div>
      <article class="lessonCard">
        <h3>${escapeHtml(item.title)}</h3>
        ${body}
        <div class="lessonCallout"><strong>${escapeHtml(c.key)}</strong><p>${escapeHtml(item.key)}</p></div>
        <div class="lessonCallout"><strong>${escapeHtml(c.apply)}</strong><p>${escapeHtml(item.apply)}</p></div>
        <div class="lessonCallout"><strong>${escapeHtml(c.reflection)}</strong><p>${escapeHtml(item.reflection)}</p></div>
      </article>
      <div class="cardActions" style="margin-top:16px">
        <button id="business21Prev" class="secondaryButton" ${current === 0 ? "disabled" : ""}>← ${escapeHtml(c.prev)}</button>
        <button id="business21Next" class="primaryButton" ${current === c.lessons.length - 1 ? "disabled" : ""}>${escapeHtml(c.next)} →</button>
      </div>
      <article class="lessonCard" style="margin-top:16px"><strong>${escapeHtml(c.warning)}</strong><p>${escapeHtml(c.disclaimer)}</p></article>
    `;
    document.getElementById("business21Back")?.addEventListener("click", goBack);
    document.getElementById("business21Prev")?.addEventListener("click", () => render(current - 1));
    document.getElementById("business21Next")?.addEventListener("click", () => render(current + 1));
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  document.addEventListener("click", (event) => {
    const button = event.target.closest(`[data-course="${COURSE_ID}"]`);
    if (!button) return;
    if (button.dataset.locked === "true") return;
    event.preventDefault();
    event.stopImmediatePropagation();
    render(0);
  }, true);
})();