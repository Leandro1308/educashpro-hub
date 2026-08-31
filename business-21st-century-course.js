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

  const COPY = {
    pt: {
      title: "Construindo Ativos no Século XXI",
      subtitle: "Educação financeira, empreendedorismo e marketing de rede",
      intro: "Curso exclusivo para assinantes, desenvolvido a partir dos conceitos estudados em O Negócio do Século XXI, de Robert T. Kiyosaki com John Fleming e Kim Kiyosaki. O conteúdo foi reorganizado em linguagem própria, prática e atual, sem reproduzir o livro. A proposta central é compreender que crescimento financeiro depende menos de promessas de renda e mais da construção de ativos, habilidades, sistemas, relacionamentos e liderança.",
      source: "Referência de estudo: Robert T. Kiyosaki, John Fleming e Kim Kiyosaki — O Negócio do Século XXI.",
      back: "Voltar para a Academy", next: "Próxima aula", prev: "Aula anterior", lesson: "Aula", of: "de", apply: "Aplicação prática", key: "Ideia central", warning: "Importante",
      disclaimer: "Conteúdo educacional. Marketing de rede não garante renda. Resultados dependem de produto ou serviço real, mercado, vendas, relacionamento, liderança, execução, custos e regras do negócio. Não contraia dívidas para participar de uma oportunidade.",
      lessons: [
        ["Assuma o controle do seu futuro financeiro","A primeira mudança é de responsabilidade: parar de tratar salário, empresa ou economia como únicas fontes de segurança. Educação financeira começa quando você entende de onde vem sua renda, para onde ela vai e o que está construindo com ela.","O objetivo não é abandonar um emprego, mas reduzir dependência de uma única fonte de renda e desenvolver capacidade de decisão.","Liste suas fontes de renda atuais e marque quais dependem diretamente das suas horas de trabalho."],
        ["Os quatro modos de gerar renda","Uma forma útil de analisar a renda é separar quem trabalha como empregado, quem trabalha por conta própria, quem constrói sistemas de negócio e quem utiliza capital em investimentos. Cada posição exige habilidades e responsabilidades diferentes.","Ganhar mais não significa automaticamente mudar de modelo. Um autônomo muito bem pago ainda pode depender totalmente da própria presença.","Pergunte: se eu parar de trabalhar por 30 dias, quais rendas continuam existindo?"],
        ["Mentalidade empreendedora","Empreender significa identificar problemas, criar valor e assumir responsabilidade pela execução. Não é apenas abrir uma empresa. A mudança começa quando a pessoa deixa de esperar condições perfeitas e passa a aprender, testar, medir e corrigir.","Empreendedorismo combina iniciativa com disciplina. Coragem sem análise vira imprudência; análise sem ação vira paralisia.","Escolha um problema real que você saiba ajudar a resolver e escreva uma solução simples em uma frase."],
        ["Renda é diferente de ativo","O livro enfatiza uma distinção importante: renda do trabalho é limitada pelo tempo, enquanto um ativo ou sistema produtivo pode continuar gerando valor além de uma única hora trabalhada. Em educação financeira, é importante também distinguir esse uso popular do conceito de ativo da definição contábil formal.","O foco estratégico não deve ser apenas quanto entra neste mês, mas o que está sendo construído para produzir valor no futuro.","Faça duas colunas: renda gerada pelo seu esforço direto e estruturas que podem continuar produzindo valor."],
        ["Ativo 1 — Educação empresarial real","Construir um negócio exige habilidades que dificilmente aparecem apenas na teoria: comunicação, vendas, apresentação, negociação, organização, acompanhamento, solução de problemas e leitura de pessoas.","A experiência prática funciona como laboratório. O objetivo é aprender com pequenas ações repetidas, não esperar domínio completo antes de começar.","Escolha uma habilidade comercial que hoje limita você e pratique-a deliberadamente durante sete dias."],
        ["Ativo 2 — Desenvolvimento pessoal","O crescimento de um negócio frequentemente expõe medos, inseguranças e hábitos. Aprender a lidar com rejeição, disciplina, consistência, comunicação e autoconfiança faz parte da construção do próprio ativo.","Desenvolvimento pessoal não substitui estratégia, mas amplia a capacidade de executá-la.","Identifique uma situação comercial que você evita e defina uma ação pequena para enfrentá-la nesta semana."],
        ["Ativo 3 — Ambiente e relacionamentos","Pessoas próximas influenciam padrões de comportamento, expectativas e decisões. Um ambiente de aprendizado, responsabilidade e metas compartilhadas pode acelerar desenvolvimento profissional.","Rede de apoio não significa concordância automática. Bons relacionamentos também oferecem feedback, responsabilidade e perspectivas diferentes.","Liste três pessoas com quem você pode trocar aprendizado de negócios de maneira construtiva."],
        ["Ativo 4 — O poder da rede","Uma rede amplia distribuição. Uma pessoa possui limites de tempo e alcance; várias pessoas capacitadas conseguem atender, comunicar e ensinar em escala maior. O valor, porém, depende de relações reais, clientes, atividade e confiança.","Uma lista de nomes não é um ativo. Uma rede ativa, treinada, ética e capaz de gerar valor pode se tornar parte de uma organização comercial.","Desenhe sua rede atual em três grupos: clientes, parceiros potenciais e pessoas que podem indicar outras pessoas."],
        ["Ativo 5 — Duplicação e escalabilidade","No marketing de rede, processos simples tendem a ser mais duplicáveis que técnicas dependentes de um vendedor excepcional. O sistema precisa poder ser aprendido e repetido por pessoas comuns com treinamento adequado.","Escala não é copiar mensagens em massa. É transformar boas práticas em processos simples, mensuráveis e ensináveis.","Escreva seu processo em quatro etapas: convidar, apresentar, acompanhar e treinar. Reduza cada etapa ao essencial."],
        ["Ativo 6 — Liderança","Liderança não é controlar pessoas. É criar clareza, exemplo, confiança, desenvolvimento e responsabilidade. Uma rede cresce de maneira mais sustentável quando novos membros aprendem a liderar outros, e não apenas a depender de quem os indicou.","Liderança é o elo que transforma indivíduos em equipe e processo em cultura.","Escolha uma pessoa da sua rede e ajude-a a dominar uma habilidade específica, em vez de fazer por ela."],
        ["Ativo 7 — Sistemas que produzem valor","A construção de riqueza empresarial depende de sistemas: aquisição de clientes, atendimento, acompanhamento, treinamento, comunicação e gestão. Um bom sistema reduz improviso e dependência de uma única pessoa.","Tecnologia e automação podem apoiar o sistema, mas não substituem confiança e relacionamento humano.","Escolha uma tarefa repetitiva do seu processo e documente como executá-la de forma padronizada."],
        ["Ativo 8 — Propósito e visão","Metas financeiras são mais sustentáveis quando conectadas a um motivo claro. O livro associa grandes sonhos à disposição para aprender, mudar e persistir. A visão orienta decisões, mas precisa ser traduzida em ações mensuráveis.","Sonho sem plano vira desejo; plano sem propósito tende a perder energia.","Defina uma meta de 12 meses e escreva por que ela importa, qual habilidade precisa desenvolver e qual primeira ação executará."],
        ["Escolha com sabedoria","Antes de participar de qualquer empresa de venda direta ou marketing de rede, pesquise. Avalie produto ou serviço, demanda real, preços, reputação, suporte, contrato, custos, política de cancelamento, plano de remuneração e se a receita depende de vendas legítimas.","Não escolha uma empresa apenas por histórias de grandes ganhos. Produto real, clientes e sustentabilidade importam mais que promessa.","Crie um checklist com pelo menos dez critérios e só tome decisão depois de verificar cada um."],
        ["Você não precisa ser um vendedor nato","Uma rede sustentável depende mais de comunicação, ensino, acompanhamento e formação de equipe do que de uma pessoa capaz de vender tudo sozinha. Habilidades básicas podem ser treinadas e duplicadas.","O objetivo é formar pessoas competentes, não criar dependência de um único líder ou vendedor.","Pratique uma apresentação de dois minutos explicando valor, público e próximo passo sem usar promessa de renda."],
        ["Convidar, apresentar, acompanhar e treinar","A construção de rede pode ser organizada em quatro movimentos simples. Convidar abre a conversa; apresentar explica a proposta; acompanhar respeita o tempo de decisão; treinar ajuda quem entrou a executar o processo com autonomia.","Ferramentas podem ajudar na apresentação e no treinamento, mas conexão humana, escuta e confiança continuam sendo tarefas centrais.","Crie um roteiro curto para cada uma das quatro etapas e elimine qualquer pressão, exagero ou promessa."],
        ["Plano de 30 dias — aprender, aplicar, ensinar e duplicar","O fechamento do curso transforma conceitos em rotina. Escolha poucas ações, acompanhe números simples e melhore semanalmente. Uma rede cresce pela repetição consistente de comportamentos éticos e ensináveis.","A sequência mais útil é: aprender, aplicar, medir, corrigir, ensinar e duplicar. Crescimento sustentável vem de processo, não de pressa.","Nos próximos 30 dias, defina metas semanais de contatos qualificados, apresentações, acompanhamentos, clientes atendidos e pessoas treinadas. Revise os resultados sem prometer ganhos."],
      ],
    },
    en: {
      title: "Building Assets in the 21st Century", subtitle: "Financial education, entrepreneurship and network marketing", intro: "Subscriber-only course developed from concepts studied in The Business of the 21st Century by Robert T. Kiyosaki with John Fleming and Kim Kiyosaki. The material is reorganized in original, practical language and does not reproduce the book. The core idea is to focus on building assets, skills, systems, relationships and leadership rather than income promises.", source: "Study reference: Robert T. Kiyosaki, John Fleming and Kim Kiyosaki — The Business of the 21st Century.", back:"Back to Academy",next:"Next lesson",prev:"Previous lesson",lesson:"Lesson",of:"of",apply:"Practical application",key:"Core idea",warning:"Important",disclaimer:"Educational content. Network marketing does not guarantee income. Results depend on a real product or service, market, sales, relationships, leadership, execution, costs and business rules. Do not borrow money to join an opportunity.", lessons: [
        ["Take control of your financial future","Financial education starts by understanding where income comes from, where it goes and what you are building with it.","The goal is not to quit a job, but to reduce dependence on a single source and improve decision-making.","List your income sources and mark which ones depend directly on your hours."],
        ["Four ways of generating income","Compare employment, self-employment, business systems and investing. Each model requires different skills, risks and responsibilities.","Higher income does not automatically mean a different model; a highly paid self-employed person may still depend entirely on personal presence.","Ask what income would continue if you stopped working for 30 days."],
        ["Entrepreneurial mindset","Entrepreneurship is identifying problems, creating value and taking responsibility for execution through learning, testing and adjustment.","Courage without analysis is recklessness; analysis without action becomes paralysis.","Choose one real problem you can help solve and describe your solution in one sentence."],
        ["Income is different from an asset","Work income is tied to time, while productive assets or systems can continue creating value. Keep the popular cash-flow use of asset distinct from formal accounting definitions.","Ask not only what you earn this month, but what you are building for the future.","Separate direct-work income from structures that may continue producing value."],
        ["Asset 1 — Real-world business education","Business skills include communication, sales, presentation, negotiation, organization, follow-up and problem solving.","Practice is a laboratory; do not wait for perfect mastery before learning through small actions.","Pick one commercial skill and practice it deliberately for seven days."],
        ["Asset 2 — Personal development","Business growth exposes fear, rejection, discipline and communication habits. Personal development increases your ability to execute strategy.","Mindset does not replace strategy, but it can strengthen execution.","Identify one business situation you avoid and take one small action this week."],
        ["Asset 3 — Environment and relationships","A learning-oriented environment can improve standards, feedback and accountability.","Supportive relationships are not blind agreement; they can challenge and develop you.","List three people with whom you can exchange constructive business learning."],
        ["Asset 4 — The power of a network","A network expands distribution beyond one person's time, but its value depends on real activity, customers, competence and trust.","A contact list alone is not an asset. An active, trained and ethical organization can become economically valuable.","Map customers, potential partners and referral sources."],
        ["Asset 5 — Duplication and scalability","Simple processes duplicate better than techniques that require an exceptional salesperson.","Scale is not mass messaging; it is making good practices simple, measurable and teachable.","Write four steps: invite, present, follow up and train."],
        ["Asset 6 — Leadership","Leadership creates clarity, example, trust, development and accountability. Sustainable teams develop new leaders.","Leadership connects individuals, systems and culture.","Help one person master a skill instead of doing the task for them."],
        ["Asset 7 — Systems that create value","Customer acquisition, service, follow-up, training and communication should become documented systems.","Technology can support systems but cannot replace trust and human connection.","Document one recurring task as a simple repeatable process."],
        ["Asset 8 — Purpose and vision","Financial goals become more durable when connected to meaningful reasons and measurable action.","A dream without a plan is a wish; a plan without purpose loses energy.","Define a 12-month goal, why it matters and the first action."],
        ["Choose wisely","Research product, real demand, pricing, reputation, contracts, costs, cancellation terms, support and compensation before joining a direct-selling company.","Do not choose mainly because of large-income stories. Real customers and sustainable value matter more.","Build a ten-point due-diligence checklist."],
        ["You do not need to be a born salesperson","Communication, teaching, follow-up and team development are more duplicable than relying on one superstar seller.","Build competent people rather than dependency on one leader.","Practice a two-minute value presentation with no income claims."],
        ["Invite, present, follow up and train","These four movements organize relationship-based growth while preserving respect for the other person's decision.","Tools can help presentations and training; human listening and trust remain essential.","Create a short ethical script for each of the four stages."],
        ["30-day plan — learn, apply, teach and duplicate","Use a few measurable actions, review them weekly and improve the process instead of chasing fast results.","Learn, apply, measure, correct, teach and duplicate.","Track qualified contacts, presentations, follow-ups, customers served and people trained for 30 days."],
      ],
    },
    es: {
      title:"Construyendo Activos en el Siglo XXI",subtitle:"Educación financiera, emprendimiento y marketing de red",intro:"Curso exclusivo para suscriptores desarrollado a partir de conceptos estudiados en El negocio del siglo XXI, de Robert T. Kiyosaki con John Fleming y Kim Kiyosaki. El contenido está reorganizado con lenguaje propio y práctico, sin reproducir el libro.",source:"Referencia de estudio: Robert T. Kiyosaki, John Fleming y Kim Kiyosaki — El negocio del siglo XXI.",back:"Volver a Academy",next:"Siguiente lección",prev:"Lección anterior",lesson:"Lección",of:"de",apply:"Aplicación práctica",key:"Idea central",warning:"Importante",disclaimer:"Contenido educativo. El marketing de red no garantiza ingresos. Los resultados dependen de producto o servicio real, mercado, ventas, relaciones, liderazgo, ejecución, costos y reglas del negocio. No se endeude para participar.", lessons: [
        ["Toma el control de tu futuro financiero","La educación financiera comienza al comprender de dónde viene el dinero, adónde va y qué estás construyendo con él.","El objetivo no es abandonar un empleo, sino reducir la dependencia de una sola fuente.","Enumera tus fuentes de ingresos y marca cuáles dependen de tus horas."],
        ["Cuatro formas de generar ingresos","Compara empleo, trabajo por cuenta propia, sistemas empresariales e inversión.","Ganar más no significa necesariamente cambiar de modelo.","Pregunta qué ingresos seguirían si dejaras de trabajar 30 días."],
        ["Mentalidad emprendedora","Emprender es identificar problemas, crear valor y responsabilizarse por la ejecución.","Valor sin análisis es imprudencia; análisis sin acción es parálisis.","Elige un problema real y escribe una solución en una frase."],
        ["Ingreso no es lo mismo que activo","El ingreso laboral depende del tiempo; un activo o sistema productivo puede seguir creando valor.","Distingue el uso popular de activo de la definición contable formal.","Separa ingresos directos de estructuras que pueden producir valor."],
        ["Activo 1 — Educación empresarial real","Comunicación, ventas, presentación, negociación y seguimiento se desarrollan con práctica.","La experiencia funciona como laboratorio.","Practica una habilidad comercial durante siete días."],
        ["Activo 2 — Desarrollo personal","El negocio revela miedos, hábitos y capacidad para manejar el rechazo.","El desarrollo personal fortalece la ejecución, no sustituye la estrategia.","Enfrenta una situación comercial que sueles evitar."],
        ["Activo 3 — Entorno y relaciones","Un entorno de aprendizaje mejora estándares, apoyo y responsabilidad.","Buenas relaciones también ofrecen crítica útil.","Elige tres personas para intercambiar aprendizaje empresarial."],
        ["Activo 4 — El poder de la red","Una red amplía la distribución, pero su valor depende de clientes, actividad, formación y confianza.","Una lista de nombres no es un activo.","Organiza tu red en clientes, socios potenciales y fuentes de recomendación."],
        ["Activo 5 — Duplicación y escala","Los procesos simples se duplican mejor que las técnicas que dependen de vendedores excepcionales.","Escalar es hacer el proceso enseñable y medible.","Resume tu proceso en invitar, presentar, seguir y entrenar."],
        ["Activo 6 — Liderazgo","Liderar es crear claridad, ejemplo, confianza y desarrollo de nuevas personas.","Una red sana forma nuevos líderes.","Ayuda a una persona a dominar una habilidad."],
        ["Activo 7 — Sistemas que crean valor","Adquisición de clientes, servicio, seguimiento y formación deben convertirse en sistemas.","La automatización ayuda, pero no sustituye la confianza.","Documenta una tarea repetitiva."],
        ["Activo 8 — Propósito y visión","Las metas financieras se sostienen mejor cuando tienen un motivo claro y acciones medibles.","Sueño sin plan es deseo.","Define una meta de 12 meses y la primera acción."],
        ["Elige con sabiduría","Investiga producto, demanda, precio, reputación, contrato, costos, soporte y plan de compensación.","No elijas por historias de grandes ganancias.","Crea una lista de diez criterios de evaluación."],
        ["No necesitas ser un vendedor nato","Comunicación, enseñanza, seguimiento y formación de equipo pueden aprenderse y duplicarse.","Forma personas competentes, no dependientes.","Practica una presentación de dos minutos sin promesas de ingresos."],
        ["Invitar, presentar, acompañar y entrenar","Estas cuatro etapas organizan un crecimiento basado en relaciones.","La tecnología ayuda, pero la escucha y la confianza son humanas.","Crea un guion ético para cada etapa."],
        ["Plan de 30 días — aprender, aplicar, enseñar y duplicar","Mide pocas acciones y mejora cada semana.","Aprender, aplicar, medir, corregir, enseñar y duplicar.","Registra contactos cualificados, presentaciones, seguimientos, clientes y personas entrenadas durante 30 días."],
      ],
    },
    ru: {
      title:"Создание активов в XXI веке",subtitle:"Финансовая грамотность, предпринимательство и сетевой маркетинг",intro:"Эксклюзивный курс для подписчиков, созданный на основе изучения идей книги Роберта Т. Кийосаки, Джона Флеминга и Ким Кийосаки «Бизнес XXI века». Материал изложен заново и не воспроизводит книгу.",source:"Учебный источник: Robert T. Kiyosaki, John Fleming, Kim Kiyosaki — The Business of the 21st Century.",back:"Назад в Academy",next:"Следующий урок",prev:"Предыдущий урок",lesson:"Урок",of:"из",apply:"Практика",key:"Главная идея",warning:"Важно",disclaimer:"Образовательный материал. Сетевой маркетинг не гарантирует доход. Результат зависит от реального продукта или услуги, рынка, продаж, отношений, лидерства, исполнения, расходов и правил бизнеса. Не берите долг ради участия.", lessons: [
        ["Возьмите ответственность за финансовое будущее","Финансовая грамотность начинается с понимания источников дохода, расходов и того, что вы создаёте на будущее.","Цель не в том, чтобы немедленно увольняться, а в снижении зависимости от одного источника.","Перечислите доходы и отметьте те, что полностью зависят от ваших часов."],
        ["Четыре способа получения дохода","Сравните работу по найму, самозанятость, бизнес-системы и инвестирование.","Высокий доход не всегда означает независимую систему.","Определите, что продолжит приносить доход после 30 дней без работы."],
        ["Предпринимательское мышление","Предпринимательство — это поиск проблем, создание ценности и ответственность за исполнение.","Смелость без анализа опасна, анализ без действия бесполезен.","Выберите реальную проблему и сформулируйте решение одним предложением."],
        ["Доход и актив — не одно и то же","Трудовой доход связан со временем, а продуктивный актив или система может продолжать создавать ценность.","Отличайте популярное понятие актива по денежному потоку от бухгалтерского определения.","Разделите доход от личной работы и системы, создающие ценность."],
        ["Актив 1 — Реальное бизнес-образование","Коммуникация, продажи, презентация, переговоры и сопровождение развиваются практикой.","Практика — лаборатория бизнеса.","Тренируйте один коммерческий навык семь дней."],
        ["Актив 2 — Личностное развитие","Бизнес выявляет страхи, привычки, дисциплину и реакцию на отказ.","Личностный рост усиливает стратегию, но не заменяет её.","Сделайте маленький шаг в ситуации, которую обычно избегаете."],
        ["Актив 3 — Окружение и отношения","Развивающее окружение повышает стандарты, качество обратной связи и ответственность.","Поддержка не означает постоянное согласие.","Выберите трёх людей для обмена бизнес-знаниями."],
        ["Актив 4 — Сила сети","Сеть расширяет дистрибуцию, но её ценность зависит от клиентов, активности, обучения и доверия.","Список контактов сам по себе не является активом.","Разделите сеть на клиентов, потенциальных партнёров и источники рекомендаций."],
        ["Актив 5 — Дублирование и масштаб","Простые процессы легче повторять, чем талант одного выдающегося продавца.","Масштаб — это обучаемый и измеримый процесс.","Запишите четыре шага: приглашение, презентация, сопровождение, обучение."],
        ["Актив 6 — Лидерство","Лидер создаёт ясность, пример, доверие и развивает новых лидеров.","Устойчивая сеть не должна зависеть от одного человека.","Помогите одному человеку освоить конкретный навык."],
        ["Актив 7 — Системы создания ценности","Привлечение клиентов, обслуживание, сопровождение и обучение должны становиться системами.","Автоматизация помогает, но не заменяет доверие.","Опишите один повторяющийся процесс."],
        ["Актив 8 — Цель и видение","Финансовые цели устойчивее, когда связаны со смыслом и измеримыми действиями.","Мечта без плана остаётся желанием.","Определите цель на 12 месяцев и первый шаг."],
        ["Выбирайте осознанно","Проверяйте продукт, спрос, цену, репутацию, договор, расходы, возвраты, поддержку и систему вознаграждения.","Не выбирайте компанию только по историям о больших доходах.","Создайте чек-лист из десяти критериев."],
        ["Не нужно быть прирождённым продавцом","Коммуникация, обучение, сопровождение и развитие команды можно освоить и повторить.","Развивайте самостоятельных людей.","Сделайте двухминутную презентацию без обещаний дохода."],
        ["Приглашать, презентовать, сопровождать и обучать","Четыре этапа помогают выстроить рост через отношения.","Инструменты помогают, но доверие и слушание остаются человеческими.","Создайте этичный сценарий для каждого этапа."],
        ["План на 30 дней — учиться, применять, обучать и дублировать","Измеряйте несколько действий и улучшайте процесс каждую неделю.","Учиться, применять, измерять, корректировать, обучать и дублировать.","30 дней отслеживайте качественные контакты, презентации, сопровождение, клиентов и обученных людей."],
      ],
    },
  };

  let current = 0;

  function getCopy() { return COPY[lang()] || COPY.pt; }

  function goBack() {
    const learn = document.querySelector('#bottomNav button[data-view="learn"]');
    if (learn) learn.click();
  }

  function render(index) {
    const c = getCopy();
    current = Math.max(0, Math.min(c.lessons.length - 1, Number(index || 0)));
    const item = c.lessons[current];
    content.innerHTML = `
      <button id="business21Back" class="textButton">← ${escapeHtml(c.back)}</button>
      <section class="courseHero">
        <span class="eyebrow">EXCLUSIVO PARA ASSINANTES</span>
        <h2>${escapeHtml(c.title)}</h2>
        <p>${escapeHtml(c.subtitle)}</p>
      </section>
      ${current === 0 ? `<article class="lessonCard"><p>${escapeHtml(c.intro)}</p><p><small>${escapeHtml(c.source)}</small></p></article>` : ""}
      <div class="sectionHead"><div><h2>${escapeHtml(c.lesson)} ${current + 1} ${escapeHtml(c.of)} ${c.lessons.length}</h2><p>${escapeHtml(item[0])}</p></div></div>
      <article class="lessonCard">
        <h3>${escapeHtml(item[0])}</h3>
        <p>${escapeHtml(item[1])}</p>
        <div class="lessonCallout"><strong>${escapeHtml(c.key)}</strong><p>${escapeHtml(item[2])}</p></div>
        <div class="lessonCallout"><strong>${escapeHtml(c.apply)}</strong><p>${escapeHtml(item[3])}</p></div>
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
