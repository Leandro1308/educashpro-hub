(function () {
  let tg = window.Telegram?.WebApp;
  const content = document.getElementById("content");
  const bottomNav = document.getElementById("bottomNav");
  const toast = document.getElementById("toast");
  const globalLoading = document.getElementById("globalLoading");
  const globalLoadingText = document.getElementById("globalLoadingText");
  const globalLoadingHint = document.getElementById("globalLoadingHint");
  const headerSubtitle = document.getElementById("headerSubtitle");
  // Never forward Telegram initData to an API selected through a public URL.
  const API_BASE = "https://educashpro-all.onrender.com";
  const OFFICIAL_CHANNEL_URL = "https://t.me/boost?c=3942997522";
  const OFFICIAL_GROUP_URL = "https://t.me/boost?c=3980981498";
  const MEMBERSHIP_PUBLIC_KEY_B64 = "MFkwEwYHKoZIzj0CAQYIKoZIzj0DAQcDQgAEeIVIbmPd6xtE6PECnwl9SdqUThN0MGYDulK88/0vzgDJIRFiU53leJ9hLflBm4fSwvbEGUIniofTmHgWylwAPA==";

  const state = {
    token: "",
    profile: null,
    affiliateLink: "",
    subscribeUrl: "",
    referrerId: "",
    planPriceUsdt: 12,
    botUrl: "",
    language: "pt",
    view: "home",
    directoryPage: 1,
    directoryType: "",
    directoryData: null,
    benefits: null,
    partners: null,
    partnerSegment: "",
    partnerPage: 1,
    membershipCredential: "",
    projects: null,
    currentCourse: null,
    currentLesson: 0,
    courseCatalog: [],
    hubSessionReady: false,
    contractConfig: { joinPercent: 60, renewalPercents: [30, 20, 10, 5, 5], levelRequirements: { 2: 5, 3: 10, 4: 15, 5: 20 }, qualificationEnabled: true, source: "fallback" },
  };
  let activeBookScrollHandler = null;
  let webQrScanner = null;
  let initPromise = null;
  let lateTelegramRetryBound = false;
  let hubBootstrapPromise = null;
  async function resolveTelegramRuntime(){
    if(window.__EDUCASHPRO_TELEGRAM_HINT__&&!window.Telegram?.WebApp){
      const sdk=window.__EDUCASHPRO_TELEGRAM_SDK_PROMISE__;
      if(sdk){
        await Promise.race([
          Promise.resolve(sdk).catch(()=>false),
          new Promise(resolve=>window.setTimeout(resolve,900))
        ]);
      }
    }
    tg=window.Telegram?.WebApp;
    window.__EDUCASHPRO_SYNC_TELEGRAM__?.();
    return tg;
  }
  function markAppReady(source="app"){
    window.__EDUCASHPRO_APP_STARTED__=true;
    window.__EDUCASHPRO_APP_READY__=true;
    if(window.__EDUCASHPRO_BOOT__){
      window.__EDUCASHPRO_BOOT__.initStarted=true;
      window.__EDUCASHPRO_BOOT__.appReady=true;
      window.__EDUCASHPRO_BOOT__.readyAt=Date.now();
      window.__EDUCASHPRO_BOOT__.readySource=source;
    }
    try{window.dispatchEvent(new CustomEvent("educashpro:app-ready",{detail:{source}}))}catch{}
  }
  function bindLateTelegramRetry(){
    if(lateTelegramRetryBound||!window.__EDUCASHPRO_TELEGRAM_HINT__)return;
    lateTelegramRetryBound=true;
    window.addEventListener("educashpro:telegram-sdk-ready",()=>{
      tg=window.Telegram?.WebApp;
      window.__EDUCASHPRO_SYNC_TELEGRAM__?.();
      if(!tg?.initData||state.hubSessionReady)return;
      const pending=initPromise;
      if(pending){
        Promise.resolve(pending).finally(()=>{
          if(!state.hubSessionReady&&window.Telegram?.WebApp?.initData)void init();
        });
        return;
      }
      void init();
    });
  }
  function stopBookTracking(){if(activeBookScrollHandler){removeEventListener("scroll",activeBookScrollHandler);activeBookScrollHandler=null}}

  const COPY = {
    pt: {
      subtitle: "Educação, negócios e ferramentas digitais", loading: "Organizando sua experiência…",
      navHome: "Início", navLearn: "Aprender", navExplore: "Explorar", navBenefits: "Benefícios", navArea: "Minha área",
      welcome: "Bem-vindo", active: "Assinatura ativa", inactive: "Assinatura inativa", validUntil: "Válida até",
      heroActive: "Divulgue seu trabalho, organize atendimentos e desenvolva sua presença digital.",
      heroInactive: "Explore o EduCashPro e reative para liberar cursos, benefícios e participação completa.",
      yourSpace: "Seu espaço", yourSpaceSub: "Tudo organizado para você",
      courses: "Academy", coursesSub: "Cursos e conteúdos", explore: "Explorar", exploreSub: "Grupos, canais, bots e páginas",
      benefits: "Benefícios", benefitsSub: "Vantagens exclusivas", tools: "Ferramentas", toolsSub: "Calculadoras e desafios",
      projects: "Meus projetos", projectsSub: "Acompanhe suas publicações", network: "Indicar", networkSub: "Compartilhe seu link",
      learnTitle: "EduCashPro Academy", learnDesc: "Aprendizado organizado, navegável e sem excesso de mensagens no chat.",
      presentation: "Comece por aqui", presentationDesc: "Entenda ativos digitais, Web3 e a proposta do EduCashPro.",
      academy: "EduCashPro Academy", academyDesc: "Educação financeira, Telegram, Web3, marketing de rede e nova economia.",
      openCourse: "Abrir curso", locked: "Requer assinatura ativa", toolsTitle: "Ferramentas educativas",
      interest: "Simulador de juros compostos", initial: "Valor inicial", monthly: "Aporte mensal", rate: "Juros ao mês (%)", months: "Meses", calculate: "Calcular", futureValue: "Valor projetado",
      quiz: "Desafio financeiro", quizQuestion: "Qual opção representa melhor um ativo?", quizA: "Uma despesa recorrente", quizB: "Algo que pode gerar valor ou renda", quizC: "Uma compra feita por impulso", correct: "Muito bem! Você identificou o conceito.", wrong: "Quase. Ativo é algo capaz de gerar valor ou renda.",
      exploreTitle: "Descoberta com curadoria", exploreDesc: "Escolha uma categoria e navegue por uma lista organizada.",
      all: "Todos", groups: "Grupos", channels: "Canais", bots: "Bots", pages: "Sites e páginas", access: "Acessar", noItems: "Nenhum item disponível.", previous: "Anterior", next: "Próxima", page: "Página", sample: "Você está vendo uma amostra. Reative para acessar o diretório completo.",
      benefitsTitle: "Clube de benefícios", benefitsDesc: "Vantagens selecionadas para os assinantes do EduCashPro.", unlock: "Reativar para liberar", openBenefit: "Acessar benefício",
      areaTitle: "Minha área", member: "Membro EduCashPro", affiliate: "Meu link de indicação", copy: "Copiar link", copied: "Link copiado", myProjects: "Meus projetos", noProjects: "Você ainda não cadastrou projetos.", openBot: "Abrir bot para gerenciar", officialCommunity: "Comunidade oficial", officialCommunitySub: "Acompanhe novidades e participe da comunidade EduCashPro.", officialChannel: "Canal Oficial EduCashPro", officialChannelSub: "Avisos, novidades e conteúdos oficiais.", officialGroup: "Grupo Oficial EduCashPro", officialGroupSub: "Converse e participe da comunidade.", openTelegram: "Abrir no Telegram", expires: "A sessão expirou. Feche e abra novamente pelo bot.", telegramOnly: "Abra esta página pelo botão do EduCashPro dentro do Telegram.", error: "Não foi possível carregar. Tente novamente.", back: "Voltar", chapters: "Capítulos", lesson: "Aula", continue: "Continuar", books: "Livros recomendados", reactivate: "Reativar no bot",
    },
    en: {
      subtitle: "Your universe in one place", loading: "Organizing your experience…", navHome: "Home", navLearn: "Learn", navExplore: "Explore", navBenefits: "Benefits", navArea: "My area", welcome: "Welcome", active: "Active subscription", inactive: "Inactive subscription", validUntil: "Valid until", heroActive: "Learn, discover opportunities and grow your digital presence.", heroInactive: "Explore EduCashPro and reactivate to unlock courses, benefits and full participation.", yourSpace: "Your space", yourSpaceSub: "Everything organized for you", courses: "Academy", coursesSub: "Courses and content", explore: "Explore", exploreSub: "Groups, channels, bots and pages", benefits: "Benefits", benefitsSub: "Exclusive advantages", tools: "Tools", toolsSub: "Calculators and challenges", projects: "My projects", projectsSub: "Track your publications", network: "Refer", networkSub: "Share your link", learnTitle: "EduCashPro Academy", learnDesc: "Organized, navigable learning without flooding the chat.", presentation: "Start here", presentationDesc: "Understand digital assets, Web3 and EduCashPro.", academy: "EduCashPro Academy", academyDesc: "Financial education, Telegram, Web3, network marketing and the new economy.", openCourse: "Open course", locked: "Active subscription required", toolsTitle: "Educational tools", interest: "Compound interest simulator", initial: "Initial value", monthly: "Monthly deposit", rate: "Monthly interest (%)", months: "Months", calculate: "Calculate", futureValue: "Projected value", quiz: "Financial challenge", quizQuestion: "Which option best represents an asset?", quizA: "A recurring expense", quizB: "Something that can generate value or income", quizC: "An impulse purchase", correct: "Great! You identified the concept.", wrong: "Almost. An asset can generate value or income.", exploreTitle: "Curated discovery", exploreDesc: "Choose a category and browse an organized list.", all: "All", groups: "Groups", channels: "Channels", bots: "Bots", pages: "Sites and pages", access: "Access", noItems: "No items available.", previous: "Previous", next: "Next", page: "Page", sample: "You are viewing a sample. Reactivate for the full directory.", benefitsTitle: "Benefits club", benefitsDesc: "Selected advantages for EduCashPro subscribers.", unlock: "Reactivate to unlock", openBenefit: "Access benefit", areaTitle: "My area", member: "EduCashPro member", affiliate: "My referral link", copy: "Copy link", copied: "Link copied", myProjects: "My projects", noProjects: "You have not submitted projects yet.", openBot: "Open bot to manage", officialCommunity: "Official community", officialCommunitySub: "Follow updates and join the EduCashPro community.", officialChannel: "Official EduCashPro Channel", officialChannelSub: "Official notices, news and content.", officialGroup: "Official EduCashPro Group", officialGroupSub: "Chat and take part in the community.", openTelegram: "Open in Telegram", expires: "Session expired. Close and reopen from the bot.", telegramOnly: "Open this page from the EduCashPro button inside Telegram.", error: "Unable to load. Please try again.", back: "Back", chapters: "Chapters", lesson: "Lesson", continue: "Continue", books: "Recommended books", reactivate: "Reactivate in bot",
    },
    es: {
      subtitle: "Tu universo en un solo lugar", loading: "Organizando tu experiencia…", navHome: "Inicio", navLearn: "Aprender", navExplore: "Explorar", navBenefits: "Beneficios", navArea: "Mi área", welcome: "Bienvenido", active: "Suscripción activa", inactive: "Suscripción inactiva", validUntil: "Válida hasta", heroActive: "Aprende, descubre oportunidades y desarrolla tu presencia digital.", heroInactive: "Explora EduCashPro y reactiva para liberar cursos, beneficios y participación completa.", yourSpace: "Tu espacio", yourSpaceSub: "Todo organizado para ti", courses: "Academy", coursesSub: "Cursos y contenidos", explore: "Explorar", exploreSub: "Grupos, canales, bots y páginas", benefits: "Beneficios", benefitsSub: "Ventajas exclusivas", tools: "Herramientas", toolsSub: "Calculadoras y desafíos", projects: "Mis proyectos", projectsSub: "Sigue tus publicaciones", network: "Invitar", networkSub: "Comparte tu enlace", learnTitle: "EduCashPro Academy", learnDesc: "Aprendizaje organizado y navegable sin llenar el chat.", presentation: "Empieza aquí", presentationDesc: "Comprende activos digitales, Web3 y EduCashPro.", academy: "EduCashPro Academy", academyDesc: "Educación financiera, Telegram, Web3, marketing de red y nueva economía.", openCourse: "Abrir curso", locked: "Requiere suscripción activa", toolsTitle: "Herramientas educativas", interest: "Simulador de interés compuesto", initial: "Valor inicial", monthly: "Aporte mensual", rate: "Interés mensual (%)", months: "Meses", calculate: "Calcular", futureValue: "Valor proyectado", quiz: "Desafío financiero", quizQuestion: "¿Qué opción representa mejor un activo?", quizA: "Un gasto recurrente", quizB: "Algo que puede generar valor o ingresos", quizC: "Una compra impulsiva", correct: "¡Muy bien! Identificaste el concepto.", wrong: "Casi. Un activo puede generar valor o ingresos.", exploreTitle: "Descubrimiento con curaduría", exploreDesc: "Elige una categoría y navega por una lista organizada.", all: "Todos", groups: "Grupos", channels: "Canales", bots: "Bots", pages: "Sitios y páginas", access: "Acceder", noItems: "No hay elementos disponibles.", previous: "Anterior", next: "Siguiente", page: "Página", sample: "Estás viendo una muestra. Reactiva para acceder al directorio completo.", benefitsTitle: "Club de beneficios", benefitsDesc: "Ventajas seleccionadas para suscriptores de EduCashPro.", unlock: "Reactiva para liberar", openBenefit: "Acceder al beneficio", areaTitle: "Mi área", member: "Miembro EduCashPro", affiliate: "Mi enlace de referido", copy: "Copiar enlace", copied: "Enlace copiado", myProjects: "Mis proyectos", noProjects: "Aún no registraste proyectos.", openBot: "Abrir bot para administrar", officialCommunity: "Comunidad oficial", officialCommunitySub: "Sigue las novedades y participa en la comunidad EduCashPro.", officialChannel: "Canal Oficial EduCashPro", officialChannelSub: "Avisos, novedades y contenidos oficiales.", officialGroup: "Grupo Oficial EduCashPro", officialGroupSub: "Conversa y participa en la comunidad.", openTelegram: "Abrir en Telegram", expires: "La sesión expiró. Cierra y abre nuevamente desde el bot.", telegramOnly: "Abre esta página desde el botón de EduCashPro dentro de Telegram.", error: "No fue posible cargar. Inténtalo de nuevo.", back: "Volver", chapters: "Capítulos", lesson: "Lección", continue: "Continuar", books: "Libros recomendados", reactivate: "Reactivar en el bot",
    },
    ru: {
      subtitle: "Ваша вселенная в одном месте", loading: "Организуем ваш опыт…", navHome: "Главная", navLearn: "Учиться", navExplore: "Обзор", navBenefits: "Бонусы", navArea: "Мой раздел", welcome: "Добро пожаловать", active: "Подписка активна", inactive: "Подписка неактивна", validUntil: "Действует до", heroActive: "Учитесь, находите возможности и развивайте цифровое присутствие.", heroInactive: "Изучите EduCashPro и возобновите подписку, чтобы открыть курсы и преимущества.", yourSpace: "Ваше пространство", yourSpaceSub: "Всё организовано для вас", courses: "Academy", coursesSub: "Курсы и материалы", explore: "Обзор", exploreSub: "Группы, каналы, боты и страницы", benefits: "Преимущества", benefitsSub: "Эксклюзивные возможности", tools: "Инструменты", toolsSub: "Калькуляторы и задания", projects: "Мои проекты", projectsSub: "Следите за публикациями", network: "Пригласить", networkSub: "Поделиться ссылкой", learnTitle: "EduCashPro Academy", learnDesc: "Организованное обучение без множества сообщений в чате.", presentation: "Начните здесь", presentationDesc: "Цифровые активы, Web3 и EduCashPro.", academy: "EduCashPro Academy", academyDesc: "Финансовая грамотность, Telegram, Web3, сетевой маркетинг и новая экономика.", openCourse: "Открыть курс", locked: "Нужна активная подписка", toolsTitle: "Образовательные инструменты", interest: "Калькулятор сложного процента", initial: "Начальная сумма", monthly: "Ежемесячный взнос", rate: "Процент в месяц (%)", months: "Месяцы", calculate: "Рассчитать", futureValue: "Прогноз", quiz: "Финансовое задание", quizQuestion: "Что лучше всего описывает актив?", quizA: "Регулярный расход", quizB: "То, что может приносить ценность или доход", quizC: "Импульсивная покупка", correct: "Отлично! Вы определили понятие.", wrong: "Почти. Актив способен приносить ценность или доход.", exploreTitle: "Отобранные проекты", exploreDesc: "Выберите категорию и просматривайте удобный список.", all: "Все", groups: "Группы", channels: "Каналы", bots: "Боты", pages: "Сайты и страницы", access: "Открыть", noItems: "Нет доступных элементов.", previous: "Назад", next: "Далее", page: "Страница", sample: "Вы видите образец. Возобновите подписку для полного каталога.", benefitsTitle: "Клуб преимуществ", benefitsDesc: "Отобранные преимущества для подписчиков EduCashPro.", unlock: "Возобновить", openBenefit: "Открыть преимущество", areaTitle: "Мой раздел", member: "Участник EduCashPro", affiliate: "Моя реферальная ссылка", copy: "Копировать", copied: "Ссылка скопирована", myProjects: "Мои проекты", noProjects: "У вас пока нет проектов.", openBot: "Открыть бот для управления", officialCommunity: "Официальное сообщество", officialCommunitySub: "Следите за новостями и участвуйте в сообществе EduCashPro.", officialChannel: "Официальный канал EduCashPro", officialChannelSub: "Официальные объявления, новости и материалы.", officialGroup: "Официальная группа EduCashPro", officialGroupSub: "Общайтесь и участвуйте в сообществе.", openTelegram: "Открыть в Telegram", expires: "Сессия истекла. Закройте и откройте снова через бот.", telegramOnly: "Откройте страницу кнопкой EduCashPro внутри Telegram.", error: "Не удалось загрузить. Попробуйте снова.", back: "Назад", chapters: "Главы", lesson: "Урок", continue: "Продолжить", books: "Рекомендуемые книги", reactivate: "Возобновить в боте",
    },
  };

  const FORM_COPY = {
    pt: { back: "Voltar", save: "Enviar para avaliação", saving: "Enviando…", sent: "Cadastro enviado para avaliação.", remove: "Excluir", confirmRemove: "Deseja excluir este cadastro definitivamente?", removed: "Cadastro excluído.", required: "Preencha todos os campos obrigatórios.", project: "Cadastrar projeto", benefit: "Oferecer benefício gratuito", partner: "Cadastrar parceiro", name: "Nome", description: "Descrição", url: "Link completo (https://)", type: "Tipo", category: "Categoria", language: "Idioma", company: "Nome da empresa", segment: "Segmento", discount: "Faixa de desconto", rules: "Regras do desconto", storeType: "Atendimento", city: "Cidade", region: "Estado/Região", contact: "Contato", affiliate: "Link de afiliado ou grupo exclusivo (opcional)", deleteError: "Não foi possível excluir." },
    en: { back: "Back", save: "Submit for review", saving: "Submitting…", sent: "Submission sent for review.", remove: "Delete", confirmRemove: "Permanently delete this submission?", removed: "Submission deleted.", required: "Complete all required fields.", project: "Submit project", benefit: "Offer a free benefit", partner: "Register partner", name: "Name", description: "Description", url: "Full link (https://)", type: "Type", category: "Category", language: "Language", company: "Company name", segment: "Segment", discount: "Discount range", rules: "Discount rules", storeType: "Service type", city: "City", region: "State/Region", contact: "Contact", affiliate: "Affiliate or exclusive group link (optional)", deleteError: "Unable to delete." },
    es: { back: "Volver", save: "Enviar para evaluación", saving: "Enviando…", sent: "Registro enviado para evaluación.", remove: "Eliminar", confirmRemove: "¿Eliminar este registro definitivamente?", removed: "Registro eliminado.", required: "Completa todos los campos obligatorios.", project: "Registrar proyecto", benefit: "Ofrecer beneficio gratuito", partner: "Registrar socio", name: "Nombre", description: "Descripción", url: "Enlace completo (https://)", type: "Tipo", category: "Categoría", language: "Idioma", company: "Nombre de la empresa", segment: "Segmento", discount: "Rango de descuento", rules: "Reglas del descuento", storeType: "Atención", city: "Ciudad", region: "Estado/Región", contact: "Contacto", affiliate: "Enlace de afiliado o grupo exclusivo (opcional)", deleteError: "No fue posible eliminar." },
    ru: { back: "Назад", save: "Отправить на проверку", saving: "Отправка…", sent: "Заявка отправлена на проверку.", remove: "Удалить", confirmRemove: "Удалить эту заявку навсегда?", removed: "Заявка удалена.", required: "Заполните все обязательные поля.", project: "Добавить проект", benefit: "Предложить бесплатное преимущество", partner: "Добавить партнёра", name: "Название", description: "Описание", url: "Полная ссылка (https://)", type: "Тип", category: "Категория", language: "Язык", company: "Название компании", segment: "Сегмент", discount: "Размер скидки", rules: "Правила скидки", storeType: "Формат обслуживания", city: "Город", region: "Регион", contact: "Контакт", affiliate: "Партнёрская ссылка или закрытая группа (необязательно)", deleteError: "Не удалось удалить." },
  };
  const fc = (key) => (FORM_COPY[state.language] || FORM_COPY.pt)[key] || FORM_COPY.pt[key] || key;
  const PARTNER_SEGMENTS = ["pharmacy", "clinic", "physiotherapy", "gym", "dental", "laboratory", "nutrition", "psychology", "beauty", "education", "restaurants", "retail", "services", "technology", "other"];
  const PARTNER_SEGMENT_COPY = {
    pt: { all: "Todos", pharmacy: "Farmácias", clinic: "Clínicas", physiotherapy: "Fisioterapia", gym: "Academias", dental: "Odontologia", laboratory: "Laboratórios", nutrition: "Nutrição", psychology: "Psicologia", beauty: "Beleza e estética", education: "Educação", restaurants: "Alimentação", retail: "Comércio", services: "Serviços", technology: "Tecnologia", other: "Outros" },
    en: { all: "All", pharmacy: "Pharmacies", clinic: "Clinics", physiotherapy: "Physiotherapy", gym: "Gyms", dental: "Dental", laboratory: "Laboratories", nutrition: "Nutrition", psychology: "Psychology", beauty: "Beauty & wellness", education: "Education", restaurants: "Food & dining", retail: "Retail", services: "Services", technology: "Technology", other: "Other" },
    es: { all: "Todos", pharmacy: "Farmacias", clinic: "Clínicas", physiotherapy: "Fisioterapia", gym: "Gimnasios", dental: "Odontología", laboratory: "Laboratorios", nutrition: "Nutrición", psychology: "Psicología", beauty: "Belleza y estética", education: "Educación", restaurants: "Alimentación", retail: "Comercio", services: "Servicios", technology: "Tecnología", other: "Otros" },
    ru: { all: "Все", pharmacy: "Аптеки", clinic: "Клиники", physiotherapy: "Физиотерапия", gym: "Спортзалы", dental: "Стоматология", laboratory: "Лаборатории", nutrition: "Питание", psychology: "Психология", beauty: "Красота и уход", education: "Образование", restaurants: "Питание", retail: "Торговля", services: "Услуги", technology: "Технологии", other: "Другое" },
  };
  const partnerSegmentLabel = (segment) => (PARTNER_SEGMENT_COPY[state.language] || PARTNER_SEGMENT_COPY.pt)[segment] || PARTNER_SEGMENT_COPY.pt[segment] || segment;
  const partnerSegmentOptions = () => PARTNER_SEGMENTS.map((segment) => [segment, partnerSegmentLabel(segment)]);

  const EXTRA_COPY = {
    pt: {
      discoverPlatform: "Conheça o EduCashPro", freeCourse: "Curso gratuito", subscriberExperiences: "Experiências exclusivas", subscriberExperiencesSub: "Toque para descobrir o que assinantes aprendem e utilizam.", subscribe: "Assinar", close: "Agora não", whatYouLearn: "O que você vai aprender", catalogOffline: "Catálogo salvo no celular", projection: "Calculadora de projeção", projectionDesc: "Simule cenários com as regras atuais do EduCashPro.", price: "Valor da assinatura (USDT)", newDirect: "Novas adesões diretas", activeDirect: "Diretos ativos", levelMembers: "Renovações no nível", projectedDirect: "Adesões diretas", projectedRenewals: "Renovações liberadas", projectedLocked: "Projeção bloqueada", projectedTotal: "Projeção total", levelsUnlocked: "Níveis liberados", projectionDisclaimer: "Simulação educacional, não promessa de ganhos. Resultados dependem de vendas e renovações reais, assinatura ativa, qualificação, atuação individual e regras vigentes.", lockedGroups: "Comunidades profissionais", lockedGroupsDesc: "Descubra grupos e comunidades selecionados para aprendizado, negócios e desenvolvimento.", lockedBots: "Bots e ferramentas", lockedBotsDesc: "Conheça automações, bots e recursos que ajudam a produzir e trabalhar melhor.", lockedChannels: "Canais e oportunidades", lockedChannelsDesc: "Acesse canais organizados com conteúdo, projetos e oportunidades digitais.", lockedBenefits: "Benefícios do assinante", lockedBenefitsDesc: "Tenha acesso às vantagens e parcerias disponibilizadas aos membros ativos.", continueLearning: "Continuar aprendendo"
    },
    en: {
      discoverPlatform: "Discover EduCashPro", freeCourse: "Free course", subscriberExperiences: "Exclusive experiences", subscriberExperiencesSub: "Tap to discover what subscribers learn and use.", subscribe: "Subscribe", close: "Not now", whatYouLearn: "What you will learn", catalogOffline: "Catalog saved on your phone", projection: "Projection calculator", projectionDesc: "Simulate scenarios using the current EduCashPro rules.", price: "Subscription price (USDT)", newDirect: "New direct subscriptions", activeDirect: "Active direct referrals", levelMembers: "Renewals at level", projectedDirect: "Direct subscriptions", projectedRenewals: "Eligible renewals", projectedLocked: "Locked projection", projectedTotal: "Total projection", levelsUnlocked: "Unlocked levels", projectionDisclaimer: "Educational simulation, not an earnings promise. Results depend on real sales and renewals, active subscription, qualification, individual effort and current rules.", lockedGroups: "Professional communities", lockedGroupsDesc: "Discover selected groups and communities for learning, business and development.", lockedBots: "Bots and tools", lockedBotsDesc: "Discover automation, bots and resources that help people produce and work better.", lockedChannels: "Channels and opportunities", lockedChannelsDesc: "Access organized channels with content, projects and digital opportunities.", lockedBenefits: "Subscriber benefits", lockedBenefitsDesc: "Access advantages and partnerships made available to active members.", continueLearning: "Continue learning"
    },
    es: {
      discoverPlatform: "Conoce EduCashPro", freeCourse: "Curso gratuito", subscriberExperiences: "Experiencias exclusivas", subscriberExperiencesSub: "Toca para descubrir lo que aprenden y utilizan los suscriptores.", subscribe: "Suscribirme", close: "Ahora no", whatYouLearn: "Lo que vas a aprender", catalogOffline: "Catálogo guardado en el celular", projection: "Calculadora de proyección", projectionDesc: "Simula escenarios con las reglas actuales de EduCashPro.", price: "Valor de la suscripción (USDT)", newDirect: "Nuevas adhesiones directas", activeDirect: "Directos activos", levelMembers: "Renovaciones en el nivel", projectedDirect: "Adhesiones directas", projectedRenewals: "Renovaciones liberadas", projectedLocked: "Proyección bloqueada", projectedTotal: "Proyección total", levelsUnlocked: "Niveles liberados", projectionDisclaimer: "Simulación educativa, no promesa de ganancias. Los resultados dependen de ventas y renovaciones reales, suscripción activa, calificación, esfuerzo individual y reglas vigentes.", lockedGroups: "Comunidades profesionales", lockedGroupsDesc: "Descubre grupos y comunidades seleccionados para aprendizaje, negocios y desarrollo.", lockedBots: "Bots y herramientas", lockedBotsDesc: "Conoce automatizaciones, bots y recursos para producir y trabajar mejor.", lockedChannels: "Canales y oportunidades", lockedChannelsDesc: "Accede a canales organizados con contenidos, proyectos y oportunidades digitales.", lockedBenefits: "Beneficios del suscriptor", lockedBenefitsDesc: "Accede a ventajas y alianzas disponibles para miembros activos.", continueLearning: "Continuar aprendiendo"
    },
    ru: {
      discoverPlatform: "Познакомиться с EduCashPro", freeCourse: "Бесплатный курс", subscriberExperiences: "Эксклюзивные возможности", subscriberExperiencesSub: "Нажмите, чтобы узнать, чему учатся и чем пользуются подписчики.", subscribe: "Подписаться", close: "Не сейчас", whatYouLearn: "Чему вы научитесь", catalogOffline: "Каталог сохранён на телефоне", projection: "Калькулятор прогноза", projectionDesc: "Моделируйте сценарии по текущим правилам EduCashPro.", price: "Стоимость подписки (USDT)", newDirect: "Новые прямые подписки", activeDirect: "Активные прямые", levelMembers: "Продления на уровне", projectedDirect: "Прямые подписки", projectedRenewals: "Доступные продления", projectedLocked: "Заблокированный прогноз", projectedTotal: "Общий прогноз", levelsUnlocked: "Открытые уровни", projectionDisclaimer: "Учебная симуляция, а не обещание дохода. Результаты зависят от реальных продаж и продлений, активной подписки, квалификации, личной работы и действующих правил.", lockedGroups: "Профессиональные сообщества", lockedGroupsDesc: "Откройте отобранные группы и сообщества для обучения, бизнеса и развития.", lockedBots: "Боты и инструменты", lockedBotsDesc: "Изучите автоматизацию, ботов и ресурсы для более эффективной работы.", lockedChannels: "Каналы и возможности", lockedChannelsDesc: "Получите доступ к каналам с контентом, проектами и цифровыми возможностями.", lockedBenefits: "Преимущества подписчика", lockedBenefitsDesc: "Используйте преимущества и партнёрства для активных участников.", continueLearning: "Продолжить обучение"
    }
  };

  const PRESENTATION_COPY = {
    pt: {
      homeTitle: "APRESENTAÇÃO EDUCASHPRO",
      homeText: "Veja rapidamente o que você recebe, como funciona e por que tudo acontece dentro do Telegram.",
      homeButton: "ABRIR APRESENTAÇÃO",
      back: "Voltar",
      kicker: "Direto ao ponto",
      title: "Mais conhecimento, oportunidades e presença digital em um só lugar.",
      lead: "O EduCashPro organiza cursos, ferramentas, benefícios e projetos para você aprender, desenvolver e aproveitar melhor o Telegram.",
      invite: "Seu convite está registrado. Ao assinar, o vínculo correto será preservado.",
      ready: "Seu acesso está pronto para ser ativado.",
      activeReady: "Sua assinatura está ativa. Conheça todos os recursos e possibilidades do EduCashPro.",
      includedTitle: "O que você encontra",
      included: [
        ["🎓", "Aprendizado prático", "Educação financeira, Telegram, marketing de rede e habilidades digitais."],
        ["🔎", "Descoberta organizada", "Grupos, canais, bots, páginas e projetos selecionados."],
        ["🧰", "Ferramentas digitais", "Página de links, Link Inteligente, calculadoras e ferramentas financeiras no celular."],
        ["🎁", "Benefícios exclusivos", "Vantagens e parcerias disponibilizadas aos assinantes ativos."],
        ["❤️", "Minha Área", "Assinatura, credencial, suporte, comunidade, links e projetos reunidos no mesmo espaço."],
      ],
      worksTitle: "Como funciona",
      works: [
        ["1", "Ative sua assinatura", "Tenha acesso à experiência completa do EduCashPro."],
        ["2", "Aprenda e utilize", "Escolha cursos, ferramentas, projetos e benefícios de acordo com seu objetivo."],
        ["3", "Compartilhe seu link", "Como assinante ativo, você recebe um link pessoal para apresentar o EduCashPro."],
      ],
      networkTitle: "Um benefício que também pode gerar renda",
      networkText: "O assinante ativo pode receber 60% sobre novas assinaturas diretas e participar das renovações em até cinco níveis, conforme atividade, qualificações e regras vigentes.",
      chooseTitle: "O que você quer desenvolver?",
      goals: ["💰 Renda extra", "📱 Telegram profissional", "🎓 Novas habilidades", "🚀 Projeto digital"],
      finalTitle: "Comece pelo que faz sentido para você",
      finalText: "Ative sua assinatura e encontre tudo organizado em uma única experiência dentro do Telegram.",
      finalTextActive: "Sua experiência completa já está liberada. Use a apresentação sempre que quiser conhecer melhor ou explicar o EduCashPro.",
      subscribe: "Assinar por {price} USDT",
      reactivate: "Reativar por {price} USDT",
      details: "Pagamento e ativação são concluídos com segurança pelo bot do EduCashPro.",
      accessTitle: "Recursos públicos e recursos da assinatura",
      accessText: "A apresentação, o canal educacional e algumas ferramentas podem ser acessados gratuitamente. Cursos completos, diretório, benefícios, parceiros e participação no programa de indicação dependem das regras de acesso e de assinatura ativa.",
    },
    en: {
      homeTitle: "EDUCASHPRO PRESENTATION",
      homeText: "Quickly see what you get, how it works and why everything happens inside Telegram.",
      homeButton: "OPEN PRESENTATION",
      back: "Back",
      kicker: "Straight to the point",
      title: "Knowledge, opportunities and digital presence in one place.",
      lead: "EduCashPro organizes courses, tools, benefits and projects so you can learn, develop and make better use of Telegram.",
      invite: "Your invitation is registered. The correct referral will be preserved when you subscribe.",
      ready: "Your access is ready to be activated.",
      activeReady: "Your subscription is active. Discover all EduCashPro resources and possibilities.",
      includedTitle: "What you will find",
      included: [
        ["🎓", "Practical learning", "Financial education, Telegram, network marketing and digital skills."],
        ["🔎", "Organized discovery", "Selected groups, channels, bots, pages and projects."],
        ["🧰", "Digital tools", "Link page, Smart Link, calculators and finance tools on mobile."],
        ["🎁", "Exclusive benefits", "Advantages and partnerships available to active subscribers."],
        ["❤️", "My Area", "Subscription, credential, support, community, links and projects in one place."],
      ],
      worksTitle: "How it works",
      works: [
        ["1", "Activate your subscription", "Access the complete EduCashPro experience."],
        ["2", "Learn and use", "Choose courses, tools, projects and benefits according to your goal."],
        ["3", "Share your link", "As an active subscriber, you receive a personal link to introduce EduCashPro."],
      ],
      networkTitle: "A benefit that can also generate income",
      networkText: "Active subscribers may receive 60% on new direct subscriptions and participate in renewals through up to five levels, subject to activity, qualifications and current rules.",
      chooseTitle: "What do you want to develop?",
      goals: ["💰 Extra income", "📱 Professional Telegram", "🎓 New skills", "🚀 Digital project"],
      finalTitle: "Start with what makes sense for you",
      finalText: "Activate your subscription and find everything organized in one Telegram experience.",
      finalTextActive: "Your complete experience is already unlocked. Revisit this presentation whenever you want to understand or introduce EduCashPro.",
      subscribe: "Subscribe for {price} USDT",
      reactivate: "Reactivate for {price} USDT",
      details: "Payment and activation are securely completed through the EduCashPro bot.",
      accessTitle: "Public and subscription resources",
      accessText: "The presentation, educational channel and some tools are available for free. Full courses, directory, benefits, partners and referral-program participation follow access rules and require an active subscription.",
    },
    es: {
      homeTitle: "PRESENTACIÓN EDUCASHPRO",
      homeText: "Descubre rápidamente qué recibes, cómo funciona y por qué todo sucede dentro de Telegram.",
      homeButton: "ABRIR PRESENTACIÓN",
      back: "Volver",
      kicker: "Directo al punto",
      title: "Conocimiento, oportunidades y presencia digital en un solo lugar.",
      lead: "EduCashPro organiza cursos, herramientas, beneficios y proyectos para que aprendas, te desarrolles y aproveches mejor Telegram.",
      invite: "Tu invitación está registrada. Al suscribirte se conservará la referencia correcta.",
      ready: "Tu acceso está listo para ser activado.",
      activeReady: "Tu suscripción está activa. Conoce todos los recursos y posibilidades de EduCashPro.",
      includedTitle: "Lo que encontrarás",
      included: [
        ["🎓", "Aprendizaje práctico", "Educación financiera, Telegram, marketing de red y habilidades digitales."],
        ["🔎", "Descubrimiento organizado", "Grupos, canales, bots, páginas y proyectos seleccionados."],
        ["🧰", "Herramientas digitales", "Página de enlaces, Enlace Inteligente, calculadoras y herramientas financieras en el celular."],
        ["🎁", "Beneficios exclusivos", "Ventajas y alianzas disponibles para suscriptores activos."],
        ["❤️", "Mi Área", "Suscripción, credencial, soporte, comunidad, enlaces y proyectos en un solo espacio."],
      ],
      worksTitle: "Cómo funciona",
      works: [
        ["1", "Activa tu suscripción", "Accede a la experiencia completa de EduCashPro."],
        ["2", "Aprende y utiliza", "Elige cursos, herramientas, proyectos y beneficios según tu objetivo."],
        ["3", "Comparte tu enlace", "Como suscriptor activo, recibes un enlace personal para presentar EduCashPro."],
      ],
      networkTitle: "Un beneficio que también puede generar ingresos",
      networkText: "El suscriptor activo puede recibir el 60% de nuevas suscripciones directas y participar en renovaciones de hasta cinco niveles, según actividad, calificaciones y reglas vigentes.",
      chooseTitle: "¿Qué quieres desarrollar?",
      goals: ["💰 Ingresos extra", "📱 Telegram profesional", "🎓 Nuevas habilidades", "🚀 Proyecto digital"],
      finalTitle: "Empieza por lo que tiene sentido para ti",
      finalText: "Activa tu suscripción y encuentra todo organizado en una única experiencia dentro de Telegram.",
      finalTextActive: "Tu experiencia completa ya está habilitada. Consulta esta presentación cuando quieras conocer o presentar mejor EduCashPro.",
      subscribe: "Suscribirme por {price} USDT",
      reactivate: "Reactivar por {price} USDT",
      details: "El pago y la activación se completan de forma segura mediante el bot de EduCashPro.",
      accessTitle: "Recursos públicos y recursos de la suscripción",
      accessText: "La presentación, el canal educativo y algunas herramientas tienen acceso gratuito. Los cursos completos, el directorio, los beneficios, los socios y la participación en el programa de recomendación dependen de las reglas de acceso y de una suscripción activa.",
    },
    ru: {
      homeTitle: "ПРЕЗЕНТАЦИЯ EDUCASHPRO",
      homeText: "Быстро узнайте, что вы получите, как всё работает и почему сервис находится внутри Telegram.",
      homeButton: "ОТКРЫТЬ ПРЕЗЕНТАЦИЮ",
      back: "Назад",
      kicker: "Коротко и по делу",
      title: "Знания, возможности и цифровое присутствие в одном месте.",
      lead: "EduCashPro объединяет курсы, инструменты, преимущества и проекты, чтобы вы могли учиться, развиваться и эффективнее использовать Telegram.",
      invite: "Ваше приглашение зарегистрировано. При подписке правильная реферальная связь сохранится.",
      ready: "Ваш доступ готов к активации.",
      activeReady: "Ваша подписка активна. Познакомьтесь со всеми ресурсами и возможностями EduCashPro.",
      includedTitle: "Что вы найдёте",
      included: [
        ["🎓", "Практическое обучение", "Финансовая грамотность, Telegram, сетевой маркетинг и цифровые навыки."],
        ["🔎", "Удобный каталог", "Отобранные группы, каналы, боты, страницы и проекты."],
        ["🧰", "Цифровые инструменты", "Страница ссылок, умная ссылка, калькуляторы и финансовые инструменты в телефоне."],
        ["🎁", "Эксклюзивные преимущества", "Преимущества и партнёрства для активных подписчиков."],
        ["❤️", "Мой раздел", "Подписка, подтверждение, поддержка, сообщество, ссылки и проекты в одном месте."],
      ],
      worksTitle: "Как это работает",
      works: [
        ["1", "Активируйте подписку", "Получите доступ ко всем возможностям EduCashPro."],
        ["2", "Учитесь и используйте", "Выбирайте курсы, инструменты, проекты и преимущества под свою цель."],
        ["3", "Делитесь своей ссылкой", "Активный подписчик получает личную ссылку для знакомства с EduCashPro."],
      ],
      networkTitle: "Преимущество, которое также может приносить доход",
      networkText: "Активный подписчик может получать 60% от новых прямых подписок и участвовать в продлениях до пяти уровней при соблюдении требований активности, квалификации и действующих правил.",
      chooseTitle: "Что вы хотите развивать?",
      goals: ["💰 Дополнительный доход", "📱 Профессиональный Telegram", "🎓 Новые навыки", "🚀 Цифровой проект"],
      finalTitle: "Начните с того, что важно именно вам",
      finalText: "Активируйте подписку и получите всё необходимое в едином пространстве Telegram.",
      finalTextActive: "Все возможности уже доступны. Возвращайтесь к презентации, чтобы лучше узнать EduCashPro или рассказать о нём другим.",
      subscribe: "Подписаться за {price} USDT",
      reactivate: "Возобновить за {price} USDT",
      details: "Оплата и активация безопасно выполняются через бот EduCashPro.",
      accessTitle: "Открытые возможности и ресурсы подписки",
      accessText: "Презентация, образовательный канал и некоторые инструменты доступны бесплатно. Полные курсы, каталог, преимущества, партнёры и участие в реферальной программе требуют активной подписки и соблюдения правил доступа.",
    },
  };

  const FEATURE_COPY = {
    pt: {
      topicsTitle: "Conteúdo para aprender e aplicar",
      topics: ["💰 Educação financeira", "🌐 Web3 e Blockchain", "💵 USDT, carteiras e exchanges", "🤖 IA aplicada aos negócios", "📱 Telegram, grupos, canais e bots", "🚀 Empreendedorismo e marketing digital"],
      creatorTitle: "Para quem cria",
      creatorText: "Assinantes podem cadastrar grupos, canais, bots, sites e páginas para avaliação. Projetos aprovados entram no diretório e alcançam usuários interessados.",
      directoryTitle: "Diretório com curadoria",
      directoryText: "Os projetos são organizados por tipo, categoria e idioma. A proposta é conectar conhecimento, ferramentas e oportunidades sem encher o chat com mensagens.",
      planTitle: "Plano de ganhos do assinante ativo",
      planIntro: "O programa de indicação é um benefício opcional. Enquanto a assinatura estiver ativa, pessoas que assinarem pelo link válido são vinculadas à rede. O produto principal continua sendo a experiência EduCashPro.",
      direct: "da primeira assinatura de cada indicado direto válido",
      renewalsTitle: "Renovações da rede",
      renewals: ["Nível 1 · 30%", "Nível 2 · 20%", "Nível 3 · 10%", "Nível 4 · 5%", "Nível 5 · 5%"],
      qualificationsTitle: "Qualificação para liberar níveis",
      qualifications: ["Nível 1 · liberado", "Nível 2 · 5 diretos ativos", "Nível 3 · 10 diretos ativos", "Nível 4 · 15 diretos ativos", "Nível 5 · 20 diretos ativos"],
      automatic: "As comissões elegíveis são distribuídas em USDT diretamente para as carteiras conectadas, sem solicitação de saque.",
      inactiveTitle: "Se a assinatura ficar inativa",
      inactiveRules: ["Não recebe novas comissões durante a inatividade.", "A rede já construída permanece vinculada.", "Novas pessoas que entrarem durante a inatividade não serão adicionadas à rede, nem posteriormente.", "Valores do período inativo não acumulam nem são pagos retroativamente.", "Após reativar, volta a participar dos resultados futuros da rede preservada."],
      profitTitle: "Calculadora de margem e markup",
      profitDesc: "Descubra o lucro bruto, a margem sobre a venda e o markup sobre o custo.",
      cost: "Custo de compra", sale: "Preço de venda", currency: "Moeda", gross: "Lucro bruto", margin: "Margem de lucro", markup: "Markup sobre o custo", calculateMargin: "Calcular margem", invalidMargin: "Informe custo e preço de venda maiores que zero.",
      offerBenefit: "Oferecer benefício gratuito",
      offerBenefitDesc: "Cadastre uma vantagem que o usuário receba sem pagar nada a você. A publicação depende de avaliação do EduCashPro.",
      creatorReferralTitle: "Sua divulgação também apresenta o EduCashPro",
      creatorReferralText: "Nas páginas públicas criadas ou compartilhadas pelo EduCashPro, um convite discreto para assinar acompanha o conteúdo e preserva sua identificação de origem. Para receber comissões, sua assinatura precisa estar ativa no momento da adesão ou renovação, conforme as regras do programa.",
      freeBenefit: "Benefício gratuito", offeredBy: "Oferecido por", reviewed: "Avaliado e autorizado pelo EduCashPro", accessBenefit: "Acessar benefício", partnersTitle: "Parceiros com desconto", partnersDesc: "Empresas avaliadas que oferecem descontos aos assinantes ativos.", registerPartner: "Cadastrar parceiro", discount: "Desconto", rules: "Regras", location: "Abrir localização ou site", activeProof: "Comprovar assinatura", affiliateQr: "QR Code do meu link", createQr: "Criar QR Code", downloadQr: "Baixar QR Code", credentialUpdated: "Assinatura renovada em", credentialUntil: "Válida até", credentialActive: "ASSINATURA ATIVA", credentialExpired: "ASSINATURA VENCIDA", authentic: "Credencial autêntica do EduCashPro", invalidCredential: "Credencial inválida ou alterada", proofHelp: "Mostre este QR Code ao parceiro. A validação não consulta Render nem MongoDB.",
    },
    en: {
      topicsTitle: "Content to learn and apply",
      topics: ["💰 Financial education", "🌐 Web3 and Blockchain", "💵 USDT, wallets and exchanges", "🤖 AI applied to business", "📱 Telegram, groups, channels and bots", "🚀 Entrepreneurship and digital marketing"],
      creatorTitle: "For creators", creatorText: "Subscribers can submit groups, channels, bots, websites and pages for review. Approved projects enter the directory and reach interested users.",
      directoryTitle: "Curated directory", directoryText: "Projects are organized by type, category and language, connecting knowledge, tools and opportunities without flooding the chat.",
      planTitle: "Active subscriber earnings plan", planIntro: "The referral program is optional. While the subscription is active, people subscribing through the valid link are linked to the network. The EduCashPro experience remains the main product.",
      direct: "of the first subscription from each valid direct referral", renewalsTitle: "Network renewals", renewals: ["Level 1 · 30%", "Level 2 · 20%", "Level 3 · 10%", "Level 4 · 5%", "Level 5 · 5%"],
      qualificationsTitle: "Qualifications to unlock levels", qualifications: ["Level 1 · unlocked", "Level 2 · 5 active directs", "Level 3 · 10 active directs", "Level 4 · 15 active directs", "Level 5 · 20 active directs"],
      automatic: "Eligible commissions are distributed in USDT directly to connected wallets, with no withdrawal request.",
      inactiveTitle: "If the subscription becomes inactive", inactiveRules: ["No new commissions are received during inactivity.", "The existing network remains linked.", "People joining during inactivity are not added to the network, either then or later.", "Amounts from the inactive period do not accumulate or receive retroactive payment.", "After reactivation, future participation from the preserved network resumes."],
      profitTitle: "Margin and markup calculator", profitDesc: "Calculate gross profit, sales margin and markup over cost.", cost: "Purchase cost", sale: "Sale price", currency: "Currency", gross: "Gross profit", margin: "Profit margin", markup: "Markup over cost", calculateMargin: "Calculate margin", invalidMargin: "Enter cost and sale price greater than zero.",
      offerBenefit: "Offer a free benefit", offerBenefitDesc: "Submit an advantage users receive without paying you. Publication requires EduCashPro review.", creatorReferralTitle: "Your promotion also introduces EduCashPro", creatorReferralText: "On public pages created or shared through EduCashPro, a discreet subscription invitation follows the content and preserves your source identification. To receive commissions, your subscription must be active when the subscription or renewal occurs, under program rules.", freeBenefit: "Free benefit", offeredBy: "Offered by", reviewed: "Reviewed and authorized by EduCashPro", accessBenefit: "Access benefit", partnersTitle: "Discount partners", partnersDesc: "Reviewed companies offering discounts to active subscribers.", registerPartner: "Register partner", discount: "Discount", rules: "Rules", location: "Open location or website", activeProof: "Prove subscription", affiliateQr: "My referral QR Code", createQr: "Create QR Code", downloadQr: "Download QR Code", credentialUpdated: "Subscription renewed on", credentialUntil: "Valid until", credentialActive: "ACTIVE SUBSCRIPTION", credentialExpired: "EXPIRED SUBSCRIPTION", authentic: "Authentic EduCashPro credential", invalidCredential: "Invalid or altered credential", proofHelp: "Show this QR Code to the partner. Validation does not query Render or MongoDB.",
    },
    es: {
      topicsTitle: "Contenido para aprender y aplicar",
      topics: ["💰 Educación financiera", "🌐 Web3 y Blockchain", "💵 USDT, billeteras y exchanges", "🤖 IA aplicada a los negocios", "📱 Telegram, grupos, canales y bots", "🚀 Emprendimiento y marketing digital"],
      creatorTitle: "Para creadores", creatorText: "Los suscriptores pueden registrar grupos, canales, bots, sitios y páginas para evaluación. Los proyectos aprobados ingresan al directorio.",
      directoryTitle: "Directorio con curaduría", directoryText: "Los proyectos se organizan por tipo, categoría e idioma para conectar conocimientos, herramientas y oportunidades sin llenar el chat.",
      planTitle: "Plan de ganancias del suscriptor activo", planIntro: "El programa de recomendación es opcional. Mientras la suscripción esté activa, quienes se suscriban mediante el enlace válido quedan vinculados a la red. La experiencia EduCashPro sigue siendo el producto principal.",
      direct: "de la primera suscripción de cada referido directo válido", renewalsTitle: "Renovaciones de la red", renewals: ["Nivel 1 · 30%", "Nivel 2 · 20%", "Nivel 3 · 10%", "Nivel 4 · 5%", "Nivel 5 · 5%"],
      qualificationsTitle: "Calificación para liberar niveles", qualifications: ["Nivel 1 · liberado", "Nivel 2 · 5 directos activos", "Nivel 3 · 10 directos activos", "Nivel 4 · 15 directos activos", "Nivel 5 · 20 directos activos"],
      automatic: "Las comisiones elegibles se distribuyen en USDT directamente a las billeteras conectadas, sin solicitud de retiro.",
      inactiveTitle: "Si la suscripción queda inactiva", inactiveRules: ["No recibe nuevas comisiones durante la inactividad.", "La red ya construida permanece vinculada.", "Quienes ingresen durante la inactividad no se agregan a la red, ni entonces ni posteriormente.", "Los valores del período inactivo no se acumulan ni se pagan retroactivamente.", "Después de reactivar, vuelve a participar en resultados futuros de la red preservada."],
      profitTitle: "Calculadora de margen y markup", profitDesc: "Calcula el beneficio bruto, el margen sobre la venta y el markup sobre el costo.", cost: "Costo de compra", sale: "Precio de venta", currency: "Moneda", gross: "Beneficio bruto", margin: "Margen de beneficio", markup: "Markup sobre el costo", calculateMargin: "Calcular margen", invalidMargin: "Introduce costo y precio de venta mayores que cero.",
      offerBenefit: "Ofrecer beneficio gratuito", offerBenefitDesc: "Registra una ventaja que el usuario reciba sin pagarte. La publicación requiere evaluación de EduCashPro.", creatorReferralTitle: "Tu divulgación también presenta EduCashPro", creatorReferralText: "En las páginas públicas creadas o compartidas mediante EduCashPro, una invitación discreta para suscribirse acompaña el contenido y conserva tu identificación de origen. Para recibir comisiones, tu suscripción debe estar activa cuando ocurra la suscripción o renovación, conforme a las reglas del programa.", freeBenefit: "Beneficio gratuito", offeredBy: "Ofrecido por", reviewed: "Evaluado y autorizado por EduCashPro", accessBenefit: "Acceder al beneficio", partnersTitle: "Socios con descuento", partnersDesc: "Empresas evaluadas que ofrecen descuentos a suscriptores activos.", registerPartner: "Registrar socio", discount: "Descuento", rules: "Reglas", location: "Abrir ubicación o sitio", activeProof: "Comprobar suscripción", affiliateQr: "QR de mi enlace", createQr: "Crear QR", downloadQr: "Descargar QR", credentialUpdated: "Suscripción renovada el", credentialUntil: "Válida hasta", credentialActive: "SUSCRIPCIÓN ACTIVA", credentialExpired: "SUSCRIPCIÓN VENCIDA", authentic: "Credencial auténtica de EduCashPro", invalidCredential: "Credencial inválida o alterada", proofHelp: "Muestra este QR al socio. La validación no consulta Render ni MongoDB.",
    },
    ru: {
      topicsTitle: "Материалы для обучения и применения",
      topics: ["💰 Финансовая грамотность", "🌐 Web3 и Blockchain", "💵 USDT, кошельки и биржи", "🤖 ИИ для бизнеса", "📱 Telegram, группы, каналы и боты", "🚀 Предпринимательство и цифровой маркетинг"],
      creatorTitle: "Для авторов", creatorText: "Подписчики могут отправлять группы, каналы, ботов, сайты и страницы на проверку. Одобренные проекты попадают в каталог.",
      directoryTitle: "Проверенный каталог", directoryText: "Проекты организованы по типу, категории и языку, чтобы объединять знания, инструменты и возможности без лишних сообщений.",
      planTitle: "План вознаграждений активного подписчика", planIntro: "Реферальная программа является дополнительной возможностью. Пока подписка активна, пользователи, оформившие подписку по действующей ссылке, привязываются к сети. Главный продукт — экосистема EduCashPro.",
      direct: "от первой подписки каждого действительного прямого участника", renewalsTitle: "Продления сети", renewals: ["Уровень 1 · 30%", "Уровень 2 · 20%", "Уровень 3 · 10%", "Уровень 4 · 5%", "Уровень 5 · 5%"],
      qualificationsTitle: "Условия открытия уровней", qualifications: ["Уровень 1 · открыт", "Уровень 2 · 5 активных прямых", "Уровень 3 · 10 активных прямых", "Уровень 4 · 15 активных прямых", "Уровень 5 · 20 активных прямых"],
      automatic: "Доступные комиссионные распределяются в USDT прямо на подключённые кошельки без запроса на вывод.",
      inactiveTitle: "Если подписка неактивна", inactiveRules: ["Во время неактивности новые комиссионные не начисляются.", "Ранее созданная сеть остаётся привязанной.", "Новые пользователи периода неактивности не добавляются в сеть ни тогда, ни позднее.", "Суммы этого периода не накапливаются и не выплачиваются задним числом.", "После повторной активации возобновляется участие в будущих результатах сохранённой сети."],
      profitTitle: "Калькулятор маржи и наценки", profitDesc: "Рассчитайте валовую прибыль, маржу продаж и наценку к себестоимости.", cost: "Закупочная стоимость", sale: "Цена продажи", currency: "Валюта", gross: "Валовая прибыль", margin: "Маржа прибыли", markup: "Наценка к себестоимости", calculateMargin: "Рассчитать", invalidMargin: "Введите стоимость и цену продажи больше нуля.",
      offerBenefit: "Предложить бесплатное преимущество", offerBenefitDesc: "Добавьте преимущество, которое пользователь получает без оплаты вам. Публикация требует проверки EduCashPro.", creatorReferralTitle: "Ваша публикация также знакомит с EduCashPro", creatorReferralText: "На открытых страницах, созданных или опубликованных через EduCashPro, вместе с материалом показывается ненавязчивое приглашение оформить подписку и сохраняется идентификатор источника. Для получения комиссионных подписка должна быть активна в момент оформления или продления согласно правилам программы.", freeBenefit: "Бесплатное преимущество", offeredBy: "Предлагает", reviewed: "Проверено и разрешено EduCashPro", accessBenefit: "Открыть преимущество", partnersTitle: "Партнёры со скидками", partnersDesc: "Проверенные компании со скидками для активных подписчиков.", registerPartner: "Добавить партнёра", discount: "Скидка", rules: "Правила", location: "Открыть адрес или сайт", activeProof: "Подтвердить подписку", affiliateQr: "QR моей ссылки", createQr: "Создать QR", downloadQr: "Скачать QR", credentialUpdated: "Подписка продлена", credentialUntil: "Действует до", credentialActive: "ПОДПИСКА АКТИВНА", credentialExpired: "ПОДПИСКА ИСТЕКЛА", authentic: "Подлинная учётная запись EduCashPro", invalidCredential: "Недействительная или изменённая учётная запись", proofHelp: "Покажите QR партнёру. Проверка не обращается к Render или MongoDB.",
    },
  };


  function t(key) { return EXTRA_COPY[state.language]?.[key] || COPY[state.language]?.[key] || EXTRA_COPY.pt[key] || COPY.pt[key] || key; }
  function presentationCopy(key) { return PRESENTATION_COPY[state.language]?.[key] ?? PRESENTATION_COPY.pt[key] ?? key; }
  function featureCopy(key) { return FEATURE_COPY[state.language]?.[key] ?? FEATURE_COPY.pt[key] ?? key; }
  function benefitNavigationCopy(key) {
    const copy = {
      pt: { exclusive: "Benefícios Exclusivos", exclusiveSub: "Vantagens gratuitas e oportunidades aprovadas.", stores: "Lojas Parceiras", storesSub: "Empresas, descontos e condições para assinantes." },
      en: { exclusive: "Exclusive Benefits", exclusiveSub: "Approved free advantages and opportunities.", stores: "Partner Stores", storesSub: "Companies, discounts and subscriber conditions." },
      es: { exclusive: "Beneficios Exclusivos", exclusiveSub: "Ventajas gratuitas y oportunidades aprobadas.", stores: "Tiendas Asociadas", storesSub: "Empresas, descuentos y condiciones para suscriptores." },
      ru: { exclusive: "Эксклюзивные преимущества", exclusiveSub: "Одобренные бесплатные возможности.", stores: "Магазины-партнёры", storesSub: "Компании, скидки и условия для подписчиков." },
    };
    return copy[state.language]?.[key] || copy.pt[key] || key;
  }
  function escapeHtml(value) { return String(value ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]); }
  function formatDate(epoch) { if (!epoch) return "—"; return new Date(Number(epoch) * 1000).toLocaleDateString(state.language === "pt" ? "pt-BR" : state.language); }
  function typeIcon(type) { return ({ group: "👥", channel: "📣", bot: "🤖", page: "🌐" })[type] || "✨"; }
  function showToast(message) { toast.textContent = message; toast.classList.add("show"); setTimeout(() => toast.classList.remove("show"), 2300); }
  let loadingFailsafe = 0;
  let activeBlockingApiRequests = 0;
  function showGlobalLoading(message = t("loading")) {
    if (!globalLoading) return;
    globalLoadingText.textContent = message || t("loading");
    globalLoadingHint.textContent = ({ pt: "Aguarde um instante", en: "Please wait a moment", es: "Espera un momento", ru: "Пожалуйста, подождите" })[state.language] || "Aguarde um instante";
    globalLoading.classList.remove("hidden");
    document.documentElement.setAttribute("aria-busy", "true");
    window.clearTimeout(loadingFailsafe);
    loadingFailsafe = window.setTimeout(() => hideGlobalLoading(true), 15000);
  }
  function hideGlobalLoading(force = false) {
    if (!globalLoading || (!force && activeBlockingApiRequests > 0)) return;
    window.clearTimeout(loadingFailsafe);
    globalLoading.classList.add("hidden");
    document.documentElement.removeAttribute("aria-busy");
  }
  function freshAssetUrl(url) {
    const value = String(url || "");
    if (!value || /^(?:https?:|data:|blob:)/i.test(value)) return value;
    const separator = value.includes("?") ? "&" : "?";
    return `${value}${separator}fresh=${encodeURIComponent(window.EDUCASHPRO_ASSET_VERSION || Date.now().toString(36))}`;
  }
  function localKey(courseId) { return `educashpro:progress:${state.profile?.tgId || "guest"}:${courseId}`; }
  function getProgress(courseId) { return Math.max(0, Number(localStorage.getItem(localKey(courseId)) || 0)); }
  function saveProgress(courseId, index) { localStorage.setItem(localKey(courseId), String(Math.max(0, index))); }
  function openUrl(url) { if (!url) return false; if (/^https:\/\/t\.me\//i.test(url) && tg?.openTelegramLink) tg.openTelegramLink(url); else if (tg?.openLink) tg.openLink(url); else window.location.assign(url); return true; }

  function subscriptionDestination() {
    const configured = String(state.subscribeUrl || state.botUrl || "").trim();
    if (configured) return configured;
    const params = new URL(window.location.href).searchParams;
    const referral = String(state.referrerId || state.profile?.referralCode || window.EduCashProPlatform?.pendingReferral?.() || params.get("ref") || params.get("r") || "").trim();
    const url = new URL("https://t.me/EduCashProBot");
    url.searchParams.set("start", referral ? `ref_${referral}` : "subscribe");
    return url.toString();
  }

  function openSubscription() {
    if (window.EduCashProPlatform?.isWeb?.() && window.EduCashProWebCheckout) return window.EduCashProWebCheckout.open();
    const url = subscriptionDestination();
    if (/^https:\/\/t\.me\//i.test(url) && tg?.openTelegramLink) {
      tg.openTelegramLink(url);
      window.setTimeout(() => tg?.close?.(), 180);
      return true;
    }
    return openUrl(url);
  }

  function localized(value) { return value?.[state.language] || value?.pt || ""; }
  function catalogKey() { return "educashpro:courses:catalog:v1"; }
  function courseCacheKey(courseId) { return `educashpro:course-cache:${state.language}:${courseId}`; }

  const APP_BUILD_KEY = "educashpro:app-build";
  const APP_RUNTIME_BUILD = "2026.10.28.13";
  let updateCheckPromise = null;

  function clearPublishedContentCache() {
    try {
      Object.keys(localStorage).forEach((key) => {
        if (key === catalogKey() || key.startsWith("educashpro:course-cache:")) localStorage.removeItem(key);
      });
    } catch {}
  }

  async function checkForUpdates() {
    if (window.__EDUCASHPRO_MARKETS_OPEN__ === true) return false;
    if (updateCheckPromise) return updateCheckPromise;
    updateCheckPromise = (async () => {
      const controller = new AbortController();
      const timeout = window.setTimeout(() => controller.abort(), 3000);
      try {
        const response = await fetch(`./version.json?fresh=${Date.now()}`, { cache: "no-store", signal: controller.signal });
        if (!response.ok) return false;
        const data = await response.json();
        const publishedBuild = String(data?.build || "").trim();
        if (!publishedBuild) return false;
        localStorage.setItem(APP_BUILD_KEY, publishedBuild);
        if (publishedBuild === APP_RUNTIME_BUILD) return false;
        clearPublishedContentCache();
        window.dispatchEvent(new CustomEvent("educashpro:update-ready", { detail: { build: publishedBuild, runtime: APP_RUNTIME_BUILD } }));
        // Nunca reinicia a navegação durante o uso. O próximo acesso recebe o novo build.
        return true;
      } catch {
        return false;
      } finally {
        window.clearTimeout(timeout);
        window.setTimeout(() => { updateCheckPromise = null; }, 5000);
      }
    })();
    return updateCheckPromise;
  }

  function hydrateCourseCatalogFromCache() {
    try {
      const cached = JSON.parse(localStorage.getItem(catalogKey()) || "null");
      if (Array.isArray(cached?.courses)) state.courseCatalog = cached.courses;
    } catch {}
    return state.courseCatalog;
  }

  async function loadCourseCatalog() {
    hydrateCourseCatalogFromCache();
    try {
      const assetVersion = window.EDUCASHPRO_ASSET_VERSION || APP_RUNTIME_BUILD;
      const response = await fetch(`./courses.json?v=${encodeURIComponent(assetVersion)}`, { cache: "default" });
      if (!response.ok) throw new Error("catalog");
      const data = await response.json();
      state.courseCatalog = Array.isArray(data?.courses) ? data.courses.sort((a, b) => Number(a.order) - Number(b.order)) : [];
      localStorage.setItem(catalogKey(), JSON.stringify({ savedAt: Date.now(), courses: state.courseCatalog }));
    } catch {
      if (!state.courseCatalog.length) state.courseCatalog = [];
    }
    return state.courseCatalog;
  }

  function refreshCourseCatalogLater() {
    const run = () => void loadCourseCatalog();
    if (window.EduCashProResources?.idle) window.EduCashProResources.idle(run, 1200);
    else window.setTimeout(run, 900);
  }

  function personalReferralLink(profile, fallback = "") {
    const code = String(profile?.referralCode || "").trim().toUpperCase();
    return code ? `${window.location.origin}/?ref=${encodeURIComponent(code)}` : String(fallback || "");
  }

  function normalizeProfile(profile, current = null) {
    const source = profile || {};
    const activeValue = source.active ?? source.isActive ?? source.subscription?.active ?? current?.active ?? current?.isActive ?? false;
    const activeUntil = source.activeUntil ?? source.subscription?.activeUntil ?? current?.activeUntil ?? null;
    return { ...(current || {}), ...source, active: activeValue === true, isActive: activeValue === true, activeUntil };
  }

  function syncExternalSession(session = null) {
    const externalSession = session || window.__EDUCASHPRO_SESSION__ || window.EduCashProWebEntry?.getSession?.();
    if (!externalSession?.profile) return null;
    const hubToken = state.hubSessionReady ? state.token : "";
    state.token = hubToken || externalSession.token || state.token;
    state.profile = normalizeProfile(externalSession.profile, state.profile);
    state.affiliateLink = personalReferralLink(state.profile, externalSession.affiliateLink || state.affiliateLink);
    state.subscribeUrl = externalSession.subscribeUrl || externalSession.server?.subscribeUrl || externalSession.botUrl || state.subscribeUrl;
    state.referrerId = String(externalSession.referrerId || state.referrerId || "");
    state.planPriceUsdt = Number(externalSession.planPriceUsdt || state.planPriceUsdt || 12);
    state.botUrl = externalSession.botUrl || state.botUrl;
    state.language = window.EduCashProLocale.resolve({language:state.profile.language});
    state.profile.language = state.language;
    state.membershipCredential = externalSession.membershipCredential || state.membershipCredential || String(localStorage.getItem("educashpro:membership-credential") || "");
    const effectiveSession = { ...externalSession, token: state.token, profile: state.profile, affiliateLink: state.affiliateLink };
    window.__EDUCASHPRO_SESSION__ = effectiveSession;
    window.EduCashProProfessional?.setSession?.(effectiveSession);
    window.EduCashProLinks?.setSession?.(effectiveSession);
    window.EduCashProHelp?.setSession?.(effectiveSession);
    return effectiveSession;
  }

  function acceptHubSession(session) {
    if (!session?.token || !session?.profile) return null;
    state.token = session.token;
    state.hubSessionReady = true;
    state.profile = normalizeProfile(session.profile, state.profile);
    state.affiliateLink = personalReferralLink(state.profile, session.affiliateLink || state.affiliateLink);
    state.subscribeUrl = session.subscribeUrl || session.botUrl || state.subscribeUrl;
    state.referrerId = String(session.referrerId || state.referrerId || "");
    state.planPriceUsdt = Number(session.planPriceUsdt || state.planPriceUsdt || 12);
    state.botUrl = session.botUrl || state.botUrl;
    state.language = window.EduCashProLocale.resolve({language:state.profile.language});
    state.profile.language = state.language;
    state.membershipCredential = session.membershipCredential || state.membershipCredential || String(localStorage.getItem("educashpro:membership-credential") || "");
    const effectiveSession = { ...session, token: state.token, profile: state.profile, affiliateLink: state.affiliateLink };
    window.__EDUCASHPRO_SESSION__ = effectiveSession;
    window.EduCashProRuntime?.setSession?.(effectiveSession);
    window.EduCashProProfessional?.setSession?.(effectiveSession);
    window.EduCashProLinks?.setSession?.(effectiveSession);
    window.EduCashProHelp?.setSession?.(effectiveSession);
    return effectiveSession;
  }

  function refreshHubSessionInBackground() {
    if (state.hubSessionReady) return Promise.resolve(window.__EDUCASHPRO_SESSION__ || null);
    if (hubBootstrapPromise) return hubBootstrapPromise;
    const runtime = window.Telegram?.WebApp || tg;
    if (runtime && runtime !== tg) tg = runtime;
    const initData = String(runtime?.initData || "");
    if (!initData) return Promise.resolve(null);
    hubBootstrapPromise = api("/api/hub/session", { initData }, { blocking: false, timeoutMs: 6000 })
      .then((session) => acceptHubSession(session))
      .catch((error) => {
        console.warn("[EduCashPro] Hub session em segundo plano:", error?.message || error);
        return null;
      })
      .finally(() => { hubBootstrapPromise = null; });
    return hubBootstrapPromise;
  }

  function clearSession() {
    state.token = "";
    state.profile = null;
    state.affiliateLink = "";
    state.referrerId = "";
    state.hubSessionReady = false;
    window.__EDUCASHPRO_SESSION__ = null;
    bottomNav?.classList.add("hidden");
    return true;
  }

  async function setSession(session) {
    if (!syncExternalSession(session)) return false;
    if (!state.courseCatalog.length) hydrateCourseCatalogFromCache();
    applyLanguage();
    refreshCourseCatalogLater();
    if (window.__EDUCASHPRO_WEB_HUB__?.active && !state.hubSessionReady) void refreshHubSessionInBackground();
    return true;
  }

  function subscribeNow() { openSubscription(); }

  function showLockedInfo(item) {
    const modal = document.getElementById("accessModal");
    document.getElementById("modalIcon").textContent = item.icon || "🔒";
    document.getElementById("modalTitle").textContent = localized(item.title) || item.title || t("locked");
    document.getElementById("modalDescription").textContent = localized(item.description) || item.description || t("locked");
    const points = Array.isArray(item.preview?.[state.language]) ? item.preview[state.language] : Array.isArray(item.preview?.pt) ? item.preview.pt : [];
    document.getElementById("modalLearning").innerHTML = points.map((point) => `<li>${escapeHtml(point)}</li>`).join("");
    document.getElementById("modalSubscribe").textContent = `⚡ ${t("subscribe")}`;
    document.querySelector(".modalCancel").textContent = t("close");
    document.getElementById("modalSubscribe").onclick = subscribeNow;
    modal.classList.remove("hidden");
  }

  function closeModal() { document.getElementById("accessModal").classList.add("hidden"); }

  const pendingApiRequests = new Map();
  let hubSessionRefreshPromise = null;

  async function renewHubSession() {
    if (hubSessionRefreshPromise) return hubSessionRefreshPromise;
    hubSessionRefreshPromise = (async () => {
      const initData = String(tg?.initData || "");
      if (!initData) throw new Error("SESSION");
      const response = await fetch(`${API_BASE}/api/hub/session`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ initData }),
        cache: "no-store",
      });
      const session = await response.json().catch(() => ({}));
      if (!response.ok || !session?.token) throw new Error(session?.reason || "SESSION");
      state.token = session.token;
      state.hubSessionReady = true;
      syncExternalSession(session);
      if (session.membershipCredential) {
        state.membershipCredential = session.membershipCredential;
        localStorage.setItem("educashpro:membership-credential", session.membershipCredential);
      }
      return session;
    })();
    try { return await hubSessionRefreshPromise; }
    finally { hubSessionRefreshPromise = null; }
  }

  async function api(path, payload = {}, options = {}) {
    const requestKey = path + JSON.stringify(payload);
    if (pendingApiRequests.has(requestKey)) return pendingApiRequests.get(requestKey);
    const blocking = options.blocking === true;
    const request = (async () => {
      const controller = new AbortController();
      const timeoutMs = Math.max(2500, Math.min(30000, Number(options.timeoutMs || (path === "/api/hub/session" ? 6000 : 15000)) || 15000));
      const timeout = window.setTimeout(() => controller.abort(), timeoutMs);
      if (blocking) {
        activeBlockingApiRequests += 1;
        showGlobalLoading();
      }
      try {
        let response = await fetch(`${API_BASE}${path}`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload), cache: "no-store", signal: controller.signal });
        let data = await response.json().catch(() => ({}));
        if (response.status === 401 && path !== "/api/hub/session" && Object.prototype.hasOwnProperty.call(payload, "token")) {
          await renewHubSession();
          response = await fetch(`${API_BASE}${path}`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...payload, token: state.token }), cache: "no-store", signal: controller.signal });
          data = await response.json().catch(() => ({}));
        }
        if (response.status === 401) throw new Error("SESSION");
        if (!response.ok) throw new Error(data.reason || "REQUEST");
        return data;
      } catch (error) {
        if (error?.name === "AbortError") throw new Error("TIMEOUT");
        throw error;
      } finally {
        window.clearTimeout(timeout);
        pendingApiRequests.delete(requestKey);
        if (blocking) {
          activeBlockingApiRequests = Math.max(0, activeBlockingApiRequests - 1);
          if (!activeBlockingApiRequests) hideGlobalLoading(true);
        }
      }
    })();
    pendingApiRequests.set(requestKey, request);
    return request;
  }

  function updateNav() {
    bottomNav.classList.toggle("hidden",!state.profile?.userId&&!state.profile?.tgId);
    bottomNav.querySelectorAll("button").forEach((button) => button.classList.toggle("active", button.dataset.view === (state.view === "analysis" ? "practice" : state.view)));
  }

  const LAST_ROUTE_KEY = "educashpro:last-route:v1";
  const RESTORABLE_VIEWS = new Set(["practice","home", "learn", "explore", "benefits", "area", "tools", "course", "analysis", "presentation"]);
  let currentRouteDetail = "";
  let routeScrollTimer = null;

  function readRememberedRoute() {
    try {
      const route = JSON.parse(localStorage.getItem(LAST_ROUTE_KEY) || "null");
      const view = String(route?.view || "");
      const detail = String(route?.detail || "").slice(0, 160);
      const scrollY = Math.max(0, Number(route?.scrollY || 0) || 0);
      return RESTORABLE_VIEWS.has(view) ? { view, detail, scrollY } : null;
    } catch {
      return null;
    }
  }

  function rememberRoute(view, detail = "") {
    try {
      state.view = view;
      currentRouteDetail = String(detail || "").slice(0, 160);
      if (RESTORABLE_VIEWS.has(view)) {
        localStorage.setItem(LAST_ROUTE_KEY, JSON.stringify({ view, detail: currentRouteDetail, scrollY: 0 }));
      }
      const url = new URL(window.location.href);
      if (view && view !== "home") url.searchParams.set("view", view);
      else url.searchParams.delete("view");
      url.searchParams.delete("academy");
      url.searchParams.delete("course");
      url.searchParams.delete("section");
      if (view === "learn" && detail) url.searchParams.set("academy", detail);
      if (view === "course" && detail) url.searchParams.set("course", detail);
      if (view === "benefits" && detail) url.searchParams.set("section", detail);
      if(window.EduCashProNavigation)window.EduCashProNavigation.record({view,detail:currentRouteDetail});
      else history.replaceState({ view, detail }, "", url.toString());
    } catch {}
  }

  function flushRememberedRoute() {
    if (!RESTORABLE_VIEWS.has(state.view)) return;
    window.clearTimeout(routeScrollTimer);
    try {
      localStorage.setItem(LAST_ROUTE_KEY, JSON.stringify({
        view: state.view,
        detail: currentRouteDetail,
        scrollY: Math.max(0, Math.round(window.scrollY || 0)),
      }));
    } catch {}
    window.EduCashProNavigationState?.write?.();
  }

  function rememberCurrentScroll() {
    if (!RESTORABLE_VIEWS.has(state.view)) return;
    window.clearTimeout(routeScrollTimer);
    routeScrollTimer = window.setTimeout(flushRememberedRoute, 180);
  }

  function restoreRememberedScroll(route) {
    const y = Math.max(0, Number(route?.scrollY || 0) || 0);
    if (!y) return;
    window.requestAnimationFrame(() => window.requestAnimationFrame(() => window.scrollTo({ top: y, behavior: "auto" })));
  }

  async function restoreRoute(route) {
    if(route?.view!=="presentation"&&!requireProductAccount())return false;
    if(route && (['benefits','explore','games','randomizers'].includes(route.view)||(route.view==='tools'&&route.detail&&!['link-page','page'].includes(route.detail))))return renderHome();
    if(route?.view==='analysis')return openLiveMarkets();if(route?.view==='practice'||route?.view==='price-action')return openMarkets();
    if(route?.view==='area'&&route?.detail==='group')return window.EduCashProProduct.group(productContext());
    const restoreTicket=window.EduCashProNavigation?.stamp?.();
    if (!route || !RESTORABLE_VIEWS.has(route.view)) return false;
    if (route.view === "course" && route.detail) {
      const [id,mode]=route.detail.split(":");
      await openCourse(id);
      if(mode === "reader" && state.currentCourse?.id === id)renderBookReader();
      restoreRememberedScroll(route);
      return true;
    }
    if (route.view === "analysis" || (route.view === "learn" && route.detail === "technical_analysis")) {
      await openMarkets();
      restoreRememberedScroll(route);
      return true;
    }
    if (route.view === "learn" && ["free_courses", "network_marketing", "financial_education", "business", "telegram"].includes(route.detail)) {
      await openAcademyCategory(route.detail);
      restoreRememberedScroll(route);
      return true;
    }
    if (route.view === "benefits" && route.detail === "exclusive-benefits") {
      await renderExclusiveBenefits();
      restoreRememberedScroll(route);
      return true;
    }
    if (route.view === "benefits" && route.detail === "partner-stores") {
      await renderPartnerStores();
      restoreRememberedScroll(route);
      return true;
    }
    if (route.view === "presentation") {
      renderPresentation();
      restoreRememberedScroll(route);
      return true;
    }
    if (route.view === "area" && ["professional", "links", "smart-link"].includes(route.detail)) {
      if (route.detail === "professional") await openAreaProfessional();
      else await openAreaLinks(route.detail === "smart-link" ? "short" : "page");
      restoreRememberedScroll(route);
      return true;
    }
    if(route.view === "area" && ["account","subscription","network","pair","language","preferences","documents"].includes(route.detail)){
      const method={account:"open",subscription:"openSubscription",network:"openNetwork",pair:"openDevicePairing",language:"openLanguage",preferences:"openPreferences",documents:"openDocuments"}[route.detail];
      rememberRoute("area",route.detail);
      await openAccountCenter(method);
      return true;
    }
    if(route.view === "area" && route.detail === "photo"){renderProfilePhotoEditor();return true;}
    if(route.view === "area" && route.detail === "membership"){await renderMembershipProof();return true;}
    if(["area","benefits"].includes(route.view) && route.detail?.startsWith("form-")){renderSubmissionForm(route.detail.slice(5));return true;}
    if(route.view === "tools"){
      if(route.detail){
        await window.EduCashProResources?.loadToolsHub?.();
        if(window.EduCashProNavigation && !window.EduCashProNavigation.isCurrent(restoreTicket))return false;
        await window.EduCashProLocal?.openTool?.(route.detail);
      }else await renderTools();
      restoreRememberedScroll(route);
      return true;
    }
    await Promise.resolve(setView(route.view));
    restoreRememberedScroll(route);
    return true;
  }

  async function resumeAuthenticatedExperience(options = {}) {
    if (!state.profile) return false;
    document.getElementById("bottomNav")?.classList.remove("hidden");
    document.querySelector(".growthQuickActions")?.classList.remove("hidden");

    const restoreNavigation = options.restoreNavigation !== false;
    const restoreRemembered = options.restoreRemembered !== false;
    const params = new URL(window.location.href).searchParams;
    const hasExplicitRoute = ["course","academy","view","section"].some((key)=>params.has(key));
    if (restoreNavigation && !hasExplicitRoute && window.EduCashProNavigationState?.restoreLastPage?.()) return true;
    const requestedCourse = String(params.get("course") || "");
    const requestedAcademy = String(params.get("academy") || "");
    const requestedView = String(params.get("view") || "");
    const requestedSection = String(params.get("section") || "");

    const deferRoute=(task)=>{
      const run=()=>Promise.resolve().then(task).catch(error=>handleError(error));
      if(window.requestAnimationFrame)window.requestAnimationFrame(()=>window.setTimeout(run,0));
      else window.setTimeout(run,0);
    };
    if (requestedCourse) { renderLearn(); deferRoute(()=>restoreRoute({view:"course",detail:requestedCourse})); }
    else if (requestedView === "analysis" || requestedView === "games" || requestedView === "tools" && ["games","randomizers"].includes(params.get("tool")) || requestedAcademy === "technical_analysis") { deferRoute(()=>openLiveMarkets()); }
    else if (["free_courses", "network_marketing", "financial_education", "telegram"].includes(requestedAcademy)) { renderLearn(); deferRoute(()=>openAcademyCategory(requestedAcademy)); }
    else if (requestedView === "benefits" && requestedSection === "exclusive-benefits") { renderBenefits(); deferRoute(()=>renderExclusiveBenefits()); }
    else if (requestedView === "benefits" && requestedSection === "partner-stores") window.location.assign("./marketplace.html");
    else if (requestedView === "benefits" && requestedSection === "company-register") renderSubmissionForm("partner");
    else if(requestedView === "area" && params.get("panel")) { renderArea(); deferRoute(()=>restoreRoute({view:"area",detail:params.get("panel")})); }
    else if (requestedView === "tools") { void renderTools(); if(params.get("tool"))deferRoute(()=>restoreRoute({view:"tools",detail:params.get("tool")||""})); }
    else if (requestedView === "presentation") renderPresentation();
    else if (["learn", "practice", "tools", "area"].includes(requestedView)) await Promise.resolve(setView(requestedView));
    else {
      const rememberedRoute = restoreRemembered ? readRememberedRoute() : null;
      if (rememberedRoute) {
        if(["area","learn","benefits"].includes(rememberedRoute.view))setView(rememberedRoute.view);
        else renderHome();
        deferRoute(()=>restoreRoute(rememberedRoute));
      } else renderHome();
    }
    return true;
  }

  function requireProductAccount(){
    syncExternalSession();
    const hasIdentity=Boolean(state.token&&(state.profile?.userId||state.profile?.tgId));
    const web=window.EduCashProPlatform?.isWeb?.();
    const saved=web?window.EduCashProPlatform.readWebSession?.():null;
    const canResume=!web||Boolean(saved?.token&&saved?.profile?.userId&&!window.EduCashProWebEntry?.requiresReauth?.()&&(!window.EduCashProSessionPolicy?.canResume||window.EduCashProSessionPolicy.canResume(saved)));
    if(hasIdentity&&canResume)return true;
    window.EduCashProWebEntry?.open?.();
    return false;
  }

  function setView(view){if(!['home','presentation'].includes(view)&&!requireProductAccount())return;stopBookTracking();if(view==='analysis')return openLiveMarkets();if(view==='practice')return openMarkets();if(view==='explore'||view==='benefits')view='home';state.view=view;rememberRoute(view);updateNav();window.scrollTo({top:0,behavior:'smooth'});if(view==='learn')return renderLearn();if(view==='tools')return renderTools();if(view==='area')return renderArea();if(view==='presentation')return renderPresentation();return state.profile?renderHome():renderPublicLanding();}

  function navigateFromFooter(button) {
    if (!button) return;
    // A navegação inferior nunca pode ficar presa a uma requisição anterior.
    hideGlobalLoading(true);
    try {
      Promise.resolve(setView(button.dataset.view)).catch((error) => handleError(error));
    } catch (error) {
      handleError(error);
    }
  }

  function renderHome(){if(!requireProductAccount())return;state.view='home';rememberRoute('home');updateNav();return window.EduCashProProduct.home(productContext());}

  function renderMembershipUpsell(){return '';}

  function presentationPriceText() {
    const price = Number(state.planPriceUsdt || 12);
    const formattedPrice = Number.isInteger(price) ? String(price) : price.toFixed(2);
    const key = state.profile?.activeUntil ? "reactivate" : "subscribe";
    return String(presentationCopy(key)).replace("{price}", formattedPrice);
  }

  async function loadPublicContractConfig() {
    try {
      const response = await fetch(`${API_BASE}/api/platform-public/config`, { cache: "no-store" });
      const data = await response.json();
      if (!response.ok || data?.ok !== true) return state.contractConfig;
      state.contractConfig = {
        joinPercent: Number(data.joinPercent ?? 60),
        renewalPercents: Array.isArray(data.renewalPercents) ? data.renewalPercents.map(Number) : state.contractConfig.renewalPercents,
        levelRequirements: data.levelRequirements || state.contractConfig.levelRequirements,
        qualificationEnabled: data.qualificationEnabled !== false,
        source: data.source || "contract",
      };
      if (Number(data.priceUsdt || 0) > 0) state.planPriceUsdt = Number(data.priceUsdt);
    } catch {}
    return state.contractConfig;
  }

  function currentContractRules() {
    const config = state.contractConfig || {};
    const renewals = featureCopy("renewals").map((item, index) => {
      const label = String(item).split("·")[0].trim();
      return `${label} · ${Number(config.renewalPercents?.[index] ?? [30, 20, 10, 5, 5][index])}%`;
    });
    const qualifications = featureCopy("qualifications").map((item, index) => {
      if (index === 0) return item;
      const label = String(item).split("·")[0].trim();
      const required = Number(config.levelRequirements?.[index + 1] ?? [0, 5, 10, 15, 20][index]);
      const suffix = state.language === "en" ? "active directs" : state.language === "es" ? "directos activos" : state.language === "ru" ? "активных прямых" : "diretos ativos";
      return `${label} · ${required} ${suffix}`;
    });
    return { direct: Number(config.joinPercent ?? 60), renewals, qualifications };
  }

  function renderPresentation(){state.view='presentation';rememberRoute('presentation');updateNav();return window.EduCashProProduct.presentation(productContext());}

  function quickCard(target, icon, title, sub, featureId = "") {
    const feature = featureId ? window.EduCashProFeatures?.get?.(featureId) : null;
    const badge = feature ? window.EduCashProFeatures?.badge?.(feature, state.language) : "";
    return `<button class="quickCard" data-target="${target}"><span class="emoji">${icon}</span>${badge ? `<span class="accessPill access-${escapeHtml(feature.access)}">${escapeHtml(badge)}</span>` : ""}<strong>${escapeHtml(title)}</strong><small>${escapeHtml(sub)}</small></button>`;
  }

  function lockedExperienceCard(id, icon, title, sub) {
    return `<button class="quickCard lockedExperience" data-locked-experience="${id}"><span class="emoji">${icon}</span><strong>${escapeHtml(title)}</strong><small>${escapeHtml(sub)}</small></button>`;
  }

  function lockedExperience(id) {
    const map = {
      communities: { icon: "👥", title: t("lockedGroups"), description: t("lockedGroupsDesc"), preview: { [state.language]: [t("exploreSub"), t("subscriberExperiences")] } },
      bots: { icon: "🤖", title: t("lockedBots"), description: t("lockedBotsDesc"), preview: { [state.language]: [t("toolsSub"), t("continueLearning"), t("subscriberExperiences")] } },
      channels: { icon: "📣", title: t("lockedChannels"), description: t("lockedChannelsDesc"), preview: { [state.language]: [t("exploreSub"), t("officialCommunity"), t("subscriberExperiences")] } },
      courses: { icon: "🎓", title: t("courses"), description: t("learnDesc"), preview: { [state.language]: state.courseCatalog.filter((item) => item.access === "subscriber").slice(0, 4).map((item) => localized(item.title)) } },
      benefits: { icon: "🎁", title: t("lockedBenefits"), description: t("lockedBenefitsDesc"), preview: { [state.language]: [t("benefitsDesc"), t("subscriberExperiences"), t("continueLearning")] } },
    };
    return map[id];
  }

  function academyMenuCopy(){const c=window.EduCashProProduct.copy(state.language);return {choose:c.learn,chooseSub:c.learnSub,categories:[['financial_education','💰',c.finance,c.learnSub],['business','📘',c.business,c.learnSub],['technical_analysis','📈',c.technical,c.learnSub]]};}

  async function renderLearn(){if(!requireProductAccount())return;stopBookTracking();state.view='learn';rememberRoute('learn');syncExternalSession();updateNav();if(!state.courseCatalog.length)hydrateCourseCatalogFromCache();window.EduCashProProduct.learn(productContext());refreshCourseCatalogLater();}

  async function openLiveMarkets() {if(!requireProductAccount())return;
    stopBookTracking();
    syncExternalSession();
    state.view = "analysis";
    rememberRoute("analysis");
    const marketTicket=window.EduCashProNavigation?.stamp?.();
    const current=()=>!window.EduCashProNavigation||window.EduCashProNavigation.isCurrent(marketTicket);
    updateNav();
    content.innerHTML = navigationShell("📈", window.EduCashProFeatures?.label?.("technical", state.language) || "Profissão Trader: Como Ganhar na Bolsa de Valores");
    // Verification continues independently; it must not hold the public analysis screen.
    const accessPromise=Promise.resolve().then(()=>window.EduCashProAccess?.refresh?.()).catch(()=>null);
    let rendered=false,lastActive=null;
    const renderMarkets=()=>{
      if(!current())return;
      const access=window.EduCashProAccess?.snapshot?.();
      const active=access?.known?access.active===true:state.profile?.active===true;
      if(rendered&&active===lastActive)return;
      lastActive=active;rendered=true;
      return window.EduCashProMarkets?.render?.({language:state.language,active,back:openMarkets,openCourse,openUrl,subscribe:subscribeNow,openLearningCenter:()=>void openPriceActionCenter("analysis")});
    };
    void accessPromise.then(access=>{
      if(!current()||access?.known!==true)return;
      state.profile=normalizeProfile({...state.profile,active:access.active===true,isActive:access.active===true,activeUntil:access.activeUntil||null},state.profile);
      const session=window.__EDUCASHPRO_SESSION__||{};
      window.__EDUCASHPRO_SESSION__={...session,profile:state.profile};
      if(rendered)renderMarkets();
    }).catch(()=>{});
    try{
      await window.EduCashProResources?.loadMarkets?.();
      return renderMarkets();
    }catch(error){if(current())handleError(error);}
  }

async function openMarkets(){if(!requireProductAccount())return;stopBookTracking();state.view='practice';rememberRoute('practice');syncExternalSession();updateNav();return window.EduCashProProduct.practice(productContext());}

  async function openAcademyCategory(category) {
    const supported = new Set(["free_courses", "network_marketing", "financial_education", "telegram"]);
    if (!supported.has(category)) return false;
    try {
      await renderCourseCategory(category);
      return true;
    } catch (error) {
      console.error("[EduCashPro] Falha ao abrir trilha da Academy:", category, error);
      handleError(error);
      return false;
    }
  }

  async function renderCourseCategory(category, options = {}) {if(!requireProductAccount())return;
    syncExternalSession();
    state.view = "learn";
    rememberRoute("learn", category);
    updateNav();
    if (!state.courseCatalog.length) hydrateCourseCatalogFromCache();
    const active = state.profile?.active === true;
    const menu = academyMenuCopy();
    const categoryCopy = menu.categories.find(([id]) => id === category);
    const visibleCourses=state.courseCatalog.filter(item=>category==='business'?(item.category==='network_marketing'||item.id==='book-business-21'):category==='financial_education'?(item.category==='financial_education'||item.id==='set-for-life'):item.category===category);
    const loadingCatalog = !state.courseCatalog.length && options.refresh !== false;
    content.innerHTML = `
      <button id="academyBack" class="textButton">← ${escapeHtml(t("back"))}</button>
      <section class="academyCategoryHero"><span>${categoryCopy?.[1] || "🎓"}</span><div><h2>${escapeHtml(categoryCopy?.[2] || t("courses"))}</h2><p>${escapeHtml(categoryCopy?.[3] || t("learnDesc"))}</p></div></section>
      <div class="sectionHead"><div><h2>${escapeHtml(t("courses"))}</h2><p>${escapeHtml(t("continue"))}</p></div></div>
      <div class="cardList">${visibleCourses.map((item) => courseCard(item, item.access === "subscriber" && !active)).join("") || (loadingCatalog ? loadingCard() : `<div class="empty">${escapeHtml(t("noItems"))}</div>`)}</div>`;
    document.getElementById("academyBack").onclick = renderLearn;
    content.querySelectorAll("[data-course]").forEach((button) => button.onclick = () => {
      const item = state.courseCatalog.find((course) => course.id === button.dataset.course);
      if (button.dataset.locked === "true") return showLockedInfo(item);
      if (item?.link) return openUrl(item.link);
      openCourse(button.dataset.course);
    });
    if (loadingCatalog) {
      void loadCourseCatalog().then(() => {
        if (state.view === "learn" && currentRouteDetail === category) void renderCourseCategory(category, { refresh:false });
      });
    }
  }

  function courseCard(item, locked) {
    const percent=Math.max(0,Math.min(100,Number(localStorage.getItem(`educashpro:course-percent:${item.id}`)||0)));
    const label=percent>0?t("continueLearning"):t("openCourse");
    return `<article class="itemCard"><div class="itemTop"><div class="itemIcon">${item.icon || "🎓"}</div><div><h3>${escapeHtml(localized(item.title))}</h3><p>${escapeHtml(localized(item.description))}</p><div class="meta"><span class="chip">${escapeHtml(item.access === "free" ? t("freeCourse") : t("subscriberExperiences"))}</span><span class="chip">${percent}%</span></div></div></div><div class="progressTrack"><span style="width:${percent}%"></span></div><div class="cardActions" style="grid-template-columns:1fr"><button class="${locked ? "secondaryButton lockedButton" : "primaryButton"}" data-course="${item.id}" data-locked="${locked}">${escapeHtml(locked ? t("locked") : label)}</button></div></article>`;
  }

  async function openCourse(courseId) {if(!requireProductAccount())return;
    syncExternalSession();
    state.view = "course";
    rememberRoute("course", courseId);
    updateNav();
    const courseTicket=window.EduCashProNavigation?.stamp?.();
    content.innerHTML = navigationShell("🎓", t("courses"));
    if (courseId === "set-for-life") {
      try {
        await window.EduCashProResources?.loadSetForLifeCourse?.(state.language);
        if(window.EduCashProNavigation && !window.EduCashProNavigation.isCurrent(courseTicket))return;
        const back=()=>void renderCourseCategory("free_courses");
        if(window.EduCashProBookQuiz?.launch?.("set-for-life",{lang:state.language,back})!==true)throw new Error("set_for_life_not_registered");
      } catch(error) {
        if(window.EduCashProNavigation && !window.EduCashProNavigation.isCurrent(courseTicket))return;
        handleError(error);
      }
      return;
    }
    if (courseId === "book-business-21") {
      try {
        await window.EduCashProResources?.loadBookCourse?.(state.language);
        if(window.EduCashProNavigation && !window.EduCashProNavigation.isCurrent(courseTicket))return;
        const back=()=>void renderCourseCategory("free_courses");
        if(window.EduCashProBookQuiz?.launch?.("book-business-21",{lang:state.language,back})!==true)throw new Error("book_course_not_registered");
      } catch(error) {
        if(window.EduCashProNavigation && !window.EduCashProNavigation.isCurrent(courseTicket))return;
        handleError(error);
      }
      return;
    }
    await window.EduCashProResources?.loadCourses?.();
    if(window.EduCashProNavigation && !window.EduCashProNavigation.isCurrent(courseTicket))return;
    try {
      const localTechnicalCourse = window.EDUCASHPRO_TECHNICAL_ANALYSIS_COURSE;
      if (courseId === localTechnicalCourse?.id) {
        const course = localTechnicalCourse.getCourseData(state.language);
        state.currentCourse = course;
        try { localStorage.setItem(courseCacheKey(courseId), JSON.stringify(course)); } catch {}
        state.currentLesson = Math.min(getProgress(courseId), Math.max(0, course.lessons.length - 1));
        renderCourseIndex();
        return;
      }
      const data = await api("/api/hub/course", { token: state.token, courseId }, { blocking:false });
      if(window.EduCashProNavigation && !window.EduCashProNavigation.isCurrent(courseTicket))return;
      state.currentCourse = data.course;
      try { localStorage.setItem(courseCacheKey(courseId), JSON.stringify(data.course)); } catch {}
      state.currentLesson = Math.min(getProgress(courseId), Math.max(0, data.course.lessons.length - 1));
      renderCourseIndex();
    } catch (error) {
      if(window.EduCashProNavigation && !window.EduCashProNavigation.isCurrent(courseTicket))return;
      try {
        const cached = JSON.parse(localStorage.getItem(courseCacheKey(courseId)) || "null");
        const meta = state.courseCatalog.find((item) => item.id === courseId);
        if (cached && (meta?.access === "free" || state.profile?.active === true)) {
          state.currentCourse = cached;
          state.currentLesson = Math.min(getProgress(courseId), Math.max(0, cached.lessons.length - 1));
          renderCourseIndex();
          return;
        }
      } catch {}
      handleError(error);
    }
  }

  function renderCourseIndex() {
    stopBookTracking();
    const course = state.currentCourse;
    rememberRoute("course",course.id);
    const courseMeta = state.courseCatalog.find((item) => item.id === course.id);
    const completed = getProgress(course.id), storedPercent = Math.max(0,Math.min(100,Number(localStorage.getItem(`educashpro:course-percent:${course.id}`)||0)));
    const percent = storedPercent;
    const visual = `<div class="courseVisual"><span>📚 ${escapeHtml(t("continueLearning"))}</span><span>✅ ${percent}%</span><span>💾 ${escapeHtml(t("catalogOffline"))}</span></div>`;
    const calculatorButton = course.id === "marketing_rede_educashpro" ? `<button id="openProjection" class="wideButton" style="margin-top:14px">📊 ${escapeHtml(t("projection"))}</button>` : "";
    const cover = courseMeta?.image ? `<img class="courseCover" src="${escapeHtml(freshAssetUrl(courseMeta.image))}" alt="${escapeHtml(course.title)}">` : "";
    const themeClass = course.theme === "exness" ? " technicalCourse" : "";
    const readerCopy={pt:["Leitura contínua","Começar leitura","Continuar leitura"],en:["Continuous reading","Start reading","Continue reading"],es:["Lectura continua","Comenzar lectura","Continuar lectura"],ru:["Непрерывное чтение","Начать чтение","Продолжить чтение"]}[state.language]||["Leitura contínua","Começar leitura","Continuar leitura"];
    content.innerHTML = `<div class="${themeClass.trim()}"><button id="courseBack" class="textButton">← ${escapeHtml(t("back"))}</button><section class="courseHero">${cover}<span class="eyebrow">${escapeHtml(readerCopy[0])}</span><h2>${escapeHtml(course.title)}</h2><div class="lessonBody">${course.home}</div>${visual}<div class="progressTrack"><span style="width:${percent}%"></span><button id="openBookReader" class="wideButton bookStart">${escapeHtml(percent?readerCopy[2]:readerCopy[1])} →</button>${calculatorButton}</section><div class="sectionHead"><div><h2>${escapeHtml(t("chapters"))}</h2></div></div><div class="cardList">${course.chapters.map((ch) => `<article class="chapter"><button data-reader-chapter="${ch.id}"><span>${escapeHtml(ch.title)}</span><span>›</span></button></article>`).join("")}</div>${course.books?.length ? `<div class="sectionHead"><div><h2>${escapeHtml(t("books"))}</h2></div></div><div class="cardList">${course.books.map((book) => `<button class="secondaryButton" data-book="${escapeHtml(book.url)}">${escapeHtml(book.text)}</button>`).join("")}</div>` : ""}${renderCoursePartnerCta(course)}</div>`;
    document.getElementById("courseBack").onclick = course.id === "analise_tecnica_completa" ? openMarkets : renderLearn;
    document.getElementById("openBookReader").onclick=()=>renderBookReader(completed);
    content.querySelectorAll("[data-reader-chapter]").forEach((button) => button.onclick = () => renderBookReader(Math.max(0,course.lessons.findIndex(lesson=>Number(lesson.ch)===Number(button.dataset.readerChapter)))));
    content.querySelectorAll("[data-book]").forEach((button) => button.onclick = () => openUrl(button.dataset.book));
    document.getElementById("openProjection")?.addEventListener("click", renderNetworkProjection);
    bindCoursePartnerAction();
  }

  function renderBookReader(startIndex=0){
    const course=state.currentCourse;if(!course)return renderLearn();
    rememberRoute("course",`${course.id}:reader`);
    const copy={pt:{contents:"Sumário",back:"Sobre o curso",smaller:"Diminuir texto",larger:"Aumentar texto",finished:"Fim da formação",next:"Voltar às trilhas",light:"Usar página branca",dark:"Usar página preta"},en:{contents:"Contents",back:"About the course",smaller:"Smaller text",larger:"Larger text",finished:"End of course",next:"Back to paths",light:"Use white page",dark:"Use black page"},es:{contents:"Contenido",back:"Sobre el curso",smaller:"Reducir texto",larger:"Aumentar texto",finished:"Fin de la formación",next:"Volver a las rutas",light:"Usar página blanca",dark:"Usar página negra"},ru:{contents:"Содержание",back:"О курсе",smaller:"Уменьшить текст",larger:"Увеличить текст",finished:"Конец курса",next:"К направлениям",light:"Белая страница",dark:"Чёрная страница"}}[state.language];
    const grouped=course.chapters.map(ch=>({chapter:ch,lessons:course.lessons.map((lesson,index)=>({...lesson,index})).filter(lesson=>Number(lesson.ch)===Number(ch.id))})).filter(group=>group.lessons.length);
    const fontSize=Math.max(15,Math.min(23,Number(localStorage.getItem("educashpro:reader-font")||18)));
    const readerTheme=localStorage.getItem("educashpro:reader-theme")==="dark"?"dark":"light";
    const sections=grouped.map(group=>`<section class="bookChapter" id="book-chapter-${group.chapter.id}" data-book-index="${group.lessons[0].index}"><span class="bookChapterLabel">${escapeHtml(t("chapters"))} ${escapeHtml(group.chapter.id)}</span><h2>${escapeHtml(String(group.chapter.title).replace(/^\s*\d+[.)-]?\s*/,""))}</h2>${group.lessons.map(lesson=>`<div class="lessonBody">${cleanLessonBody(lesson.body,group.chapter.title)}</div>`).join("")}</section>`).join("");
    content.innerHTML=`<div class="bookReader ${readerTheme}" style="--reader-font:${fontSize}px"><header class="bookReaderBar"><button id="bookBack" aria-label="${escapeHtml(copy.back)}">←</button><strong>${escapeHtml(course.title)}</strong><button id="readerTheme" class="readerThemeDot" aria-label="${escapeHtml(readerTheme==="dark"?copy.light:copy.dark)}" title="${escapeHtml(readerTheme==="dark"?copy.light:copy.dark)}"></button><span id="bookProgress">0%</span></header><details class="bookContents"><summary>☰ ${escapeHtml(copy.contents)}</summary><nav>${grouped.map(group=>`<button data-book-target="book-chapter-${group.chapter.id}">${escapeHtml(group.chapter.title)}</button>`).join("")}</nav></details><div class="bookFontControls"><button id="readerSmaller" class="secondaryButton" aria-label="${escapeHtml(copy.smaller)}">A−</button><button id="readerLarger" class="secondaryButton" aria-label="${escapeHtml(copy.larger)}">A+</button></div><article class="bookPage">${sections}<footer class="bookEnd"><b>✓ ${escapeHtml(copy.finished)}</b><button id="bookFinish" class="wideButton">${escapeHtml(copy.next)}</button></footer></article></div>`;
    const setFont=value=>{const next=Math.max(15,Math.min(23,value));localStorage.setItem("educashpro:reader-font",String(next));document.querySelector(".bookReader")?.style.setProperty("--reader-font",`${next}px`)};
    document.getElementById("bookBack").onclick=renderCourseIndex;document.getElementById("readerSmaller").onclick=()=>setFont(Number(localStorage.getItem("educashpro:reader-font")||fontSize)-1);document.getElementById("readerLarger").onclick=()=>setFont(Number(localStorage.getItem("educashpro:reader-font")||fontSize)+1);document.getElementById("bookFinish").onclick=course.id === "analise_tecnica_completa" ? openMarkets : renderLearn;
    document.getElementById("readerTheme").onclick=()=>{const reader=document.querySelector(".bookReader"),dark=!reader.classList.contains("dark");reader.classList.toggle("dark",dark);reader.classList.toggle("light",!dark);localStorage.setItem("educashpro:reader-theme",dark?"dark":"light");const button=document.getElementById("readerTheme"),label=dark?copy.light:copy.dark;button.setAttribute("aria-label",label);button.title=label};
    document.querySelectorAll("[data-book-target]").forEach(button=>button.onclick=()=>{document.getElementById(button.dataset.bookTarget)?.scrollIntoView({behavior:"smooth"});document.querySelector(".bookContents")?.removeAttribute("open")});
    const chapters=[...document.querySelectorAll(".bookChapter")],update=()=>{const root=document.documentElement,max=Math.max(1,root.scrollHeight-innerHeight),percent=Math.max(0,Math.min(100,Math.round(scrollY/max*100)));localStorage.setItem(`educashpro:course-percent:${course.id}`,String(percent));document.getElementById("bookProgress").textContent=`${percent}%`;let current=0;chapters.forEach(section=>{if(section.getBoundingClientRect().top<innerHeight*.45)current=Number(section.dataset.bookIndex||0)});saveProgress(course.id,current)};
    activeBookScrollHandler=update;addEventListener("scroll",activeBookScrollHandler,{passive:true});requestAnimationFrame(()=>{const lesson=course.lessons[Math.max(0,Math.min(course.lessons.length-1,Number(startIndex)||0))];document.getElementById(`book-chapter-${lesson?.ch}`)?.scrollIntoView();update()});
  }

  function bindCoursePartnerAction() {
    document.querySelectorAll("[data-course-partner]").forEach((button) => button.onclick = () => openUrl(button.dataset.coursePartner));
    document.querySelectorAll("[data-course-video]").forEach((button) => button.onclick = () => openUrl(button.dataset.courseVideo));
  }

  function renderCoursePartnerCta(course) {
    const partner = course?.partner;
    if (!partner?.url) return "";
    const videoLink = partner.videoUrl && partner.videoText ? `<button class="courseVideoLink" type="button" data-course-video="${escapeHtml(partner.videoUrl)}">▶ ${escapeHtml(partner.videoText)}</button>` : "";
    return `<footer class="coursePartnerCta"><span>${escapeHtml(partner.eyebrow)}</span><h3>${escapeHtml(partner.title)}</h3><p>${escapeHtml(partner.text)}</p><div class="coursePartnerActions"><button class="coursePartnerButton" data-course-partner="${escapeHtml(partner.url)}">${escapeHtml(partner.button)}</button>${videoLink}</div><small>${escapeHtml(partner.disclosure)}</small></footer>`;
  }

  function cleanLessonBody(html, visibleTitle = "") {
    const wrapper = document.createElement("div");
    wrapper.innerHTML = String(html || "");
    wrapper.querySelectorAll(".lessonExercise").forEach((node) => node.remove());
    const firstHeading = wrapper.querySelector("h1, h2, h3, h4");
    const normalize = (value) => String(value || "").replace(/^\s*\d+[.)-]?\s*/, "").trim().toLocaleLowerCase();
    if (firstHeading && normalize(firstHeading.textContent) === normalize(visibleTitle)) firstHeading.remove();
    return wrapper.innerHTML;
  }

  function renderLesson(index) {
    const course = state.currentCourse;
    const lesson = course.lessons[index];
    if (!lesson) return renderCourseIndex();
    state.currentLesson = index;
    saveProgress(course.id, Math.max(getProgress(course.id), index));
    const chapter = course.chapters.find((item) => Number(item.id) === Number(lesson.ch));
    const visibleTitle = chapter?.title || course.title;
    const lessonBody = cleanLessonBody(lesson.body, visibleTitle);
    const themeClass = course.theme === "exness" ? "technicalCourse" : "";
    content.innerHTML = `<div class="${themeClass}"><button id="lessonBack" class="textButton">← ${escapeHtml(t("chapters"))}</button><article class="itemCard lesson"><span class="eyebrow">${escapeHtml(t("lesson"))} ${lesson.part}/${lesson.totalParts}</span><h3>${escapeHtml(visibleTitle)}</h3><div class="lessonBody">${lessonBody}</div><div class="lessonNav"><button id="prevLesson" class="secondaryButton" ${index <= 0 ? "disabled" : ""}>← ${escapeHtml(t("previous"))}</button><button id="nextLesson" class="primaryButton" ${index >= course.lessons.length - 1 ? "disabled" : ""}>${escapeHtml(t("next"))} →</button></div></article>${renderCoursePartnerCta(course)}</div>`;
    document.getElementById("lessonBack").onclick = renderCourseIndex;
    document.getElementById("prevLesson").onclick = () => renderLesson(index - 1);
    document.getElementById("nextLesson").onclick = () => renderLesson(index + 1);
    bindCoursePartnerAction();
  }

  function renderNetworkProjection() {
    rememberRoute("tools","affiliate");
    const saved = (() => { try { return JSON.parse(localStorage.getItem("educashpro:network-projection") || "{}"); } catch { return {}; } })();
    const levelFields = [1, 2, 3, 4, 5].map((level) => `<div class="field"><label>${escapeHtml(t("levelMembers"))} ${level}</label><input id="level${level}" inputmode="numeric" value="${Math.max(0, Number(saved[`level${level}`] || 0))}"></div>`).join("");
    content.innerHTML = `<button id="projectionBack" class="textButton">← ${escapeHtml(t("back"))}</button><section class="courseHero"><span class="eyebrow">EDUCASHPRO</span><h2>📊 ${escapeHtml(t("projection"))}</h2><p>${escapeHtml(t("projectionDesc"))}</p></section><article class="toolCard" style="margin-top:14px"><div class="fieldGrid"><div class="field"><label>${escapeHtml(t("price"))}</label><input id="projectionPrice" inputmode="decimal" value="${Number(saved.price || state.planPriceUsdt || 12)}"></div><div class="field"><label>${escapeHtml(t("newDirect"))}</label><input id="newDirect" inputmode="numeric" value="${Math.max(0, Number(saved.newDirect || 0))}"></div><div class="field"><label>${escapeHtml(t("activeDirect"))}</label><input id="activeDirect" inputmode="numeric" value="${Math.max(0, Number(saved.activeDirect || 0))}"></div>${levelFields}</div><button id="calculateProjection" class="wideButton" style="margin-top:14px">${escapeHtml(t("calculate"))}</button><div id="projectionResult" class="resultBox hidden"></div><div class="disclaimer">⚠️ ${escapeHtml(t("projectionDisclaimer"))}</div></article>`;
    document.getElementById("projectionBack").onclick = state.currentCourse ? renderCourseIndex : renderTools;
    document.getElementById("calculateProjection").onclick = calculateNetworkProjection;
  }

  function calculateNetworkProjection() {
    const read = (id) => Math.max(0, Number(String(document.getElementById(id).value || "0").replace(",", ".")) || 0);
    const data = { price: read("projectionPrice"), newDirect: Math.trunc(read("newDirect")), activeDirect: Math.trunc(read("activeDirect")) };
    for (let level = 1; level <= 5; level += 1) data[`level${level}`] = Math.trunc(read(`level${level}`));
    localStorage.setItem("educashpro:network-projection", JSON.stringify(data));
    const rates = [0.30, 0.20, 0.10, 0.05, 0.05];
    const required = [0, 5, 10, 15, 20];
    const directValue = data.newDirect * data.price * 0.60;
    let renewalValue = 0;
    let lockedValue = 0;
    const unlocked = [];
    rates.forEach((rate, index) => {
      const value = data[`level${index + 1}`] * data.price * rate;
      if (data.activeDirect >= required[index]) { renewalValue += value; unlocked.push(index + 1); }
      else lockedValue += value;
    });
    const format = (value) => `${value.toFixed(2)} USDT`;
    const result = document.getElementById("projectionResult");
    result.innerHTML = `<div class="projectionSummary"><div class="projectionRow"><span>${escapeHtml(t("projectedDirect"))}</span><strong>${format(directValue)}</strong></div><div class="projectionRow"><span>${escapeHtml(t("projectedRenewals"))}</span><strong>${format(renewalValue)}</strong></div><div class="projectionRow"><span>${escapeHtml(t("projectedLocked"))}</span><strong>${format(lockedValue)}</strong></div><div class="projectionRow"><span>${escapeHtml(t("projectedTotal"))}</span><strong>${format(directValue + renewalValue)}</strong></div><div class="projectionRow"><span>${escapeHtml(t("levelsUnlocked"))}</span><strong>${unlocked.join(", ") || "—"}</strong></div></div>`;
    result.classList.remove("hidden");
  }

  async function renderExplore(){return renderHome();}

  function filterBar() {
    const filters = [["", t("all")], ["group", t("groups")], ["channel", t("channels")], ["bot", t("bots")], ["page", t("pages")]];
    return `<div class="filters">${filters.map(([value, label]) => `<button class="filter ${state.directoryType === value ? "active" : ""}" data-type="${value}">${escapeHtml(label)}</button>`).join("")}</div>`;
  }

  function bindFilters() {
    content.querySelectorAll("[data-type]").forEach((button) => button.onclick = async () => {
      state.directoryType = button.dataset.type;
      state.directoryPage = 1;
      content.querySelectorAll("[data-type]").forEach((b) => b.classList.toggle("active", b === button));
      await loadDirectory();
    });
  }

  async function loadDirectory() {
    const container = document.getElementById("directoryList");
    if(!container)return;
    const directoryTicket=window.EduCashProNavigation?.stamp?.();
    container.innerHTML = loadingCard();
    try {
      const data = await api("/api/hub/directory", { token: state.token, page: state.directoryPage, type: state.directoryType }, { blocking:false });
      if(!container.isConnected || (window.EduCashProNavigation && !window.EduCashProNavigation.isCurrent(directoryTicket)))return;
      state.directoryData = data;
      container.innerHTML = `${data.sample ? `<div class="notice">${escapeHtml(t("sample"))}</div>` : ""}<div class="cardList" style="margin-top:12px">${data.items.length ? data.items.map(directoryCard).join("") : `<div class="empty">${escapeHtml(t("noItems"))}</div>`}</div><div class="pager"><button id="prevPage" ${data.page <= 1 ? "disabled" : ""}>← ${escapeHtml(t("previous"))}</button><span>${escapeHtml(t("page"))} ${data.page}</span><button id="nextPage" ${!data.hasMore ? "disabled" : ""}>${escapeHtml(t("next"))} →</button></div>`;
      container.querySelectorAll("[data-access]").forEach((button) => button.onclick = () => openUrl(button.dataset.access));
      document.getElementById("prevPage").onclick = async () => { state.directoryPage -= 1; await loadDirectory(); };
      document.getElementById("nextPage").onclick = async () => { state.directoryPage += 1; await loadDirectory(); };
    } catch (error) { handleError(error, container); }
  }

  function directoryCard(item) {
    return `<article class="itemCard"><div class="itemTop"><div class="itemIcon">${typeIcon(item.type)}</div><div><h3>${escapeHtml(item.name)}</h3><p>${escapeHtml(item.description)}</p><div class="meta"><span class="chip">${escapeHtml(item.category)}</span></div></div></div><div class="cardActions" style="grid-template-columns:1fr"><button class="primaryButton" data-access="${escapeHtml(item.url)}">🔗 ${escapeHtml(t("access"))}</button></div></article>`;
  }

  function field(id, label, kind = "input", required = true, options = []) {
    if (kind === "select") return `<div class="field fullField"><label for="${id}">${escapeHtml(label)}${required ? " *" : ""}</label><select id="${id}">${options.map(([value, text]) => `<option value="${value}">${escapeHtml(text)}</option>`).join("")}</select></div>`;
    if (kind === "textarea") return `<div class="field fullField"><label for="${id}">${escapeHtml(label)}${required ? " *" : ""}</label><textarea id="${id}" rows="4" ${required ? "required" : ""}></textarea></div>`;
    return `<div class="field fullField"><label for="${id}">${escapeHtml(label)}${required ? " *" : ""}</label><input id="${id}" ${id.toLowerCase().includes("url") || id === "affiliateLink" ? 'inputmode="url"' : ""} ${required ? "required" : ""}></div>`;
  }

  function renderSubmissionForm(){return renderHome();}

  async function removeOwnItem(kind, id) {
    if (!window.confirm(fc("confirmRemove"))) return;
    try { await api("/api/hub/delete", { token: state.token, kind, id }); state.projects = null; showToast(fc("removed")); await renderArea(); }
    catch { showToast(fc("deleteError")); }
  }

  async function renderBenefits(){return renderHome();}

  async function renderExclusiveBenefits(){return renderHome();}

  function renderPartnerStores(){return renderHome();}

  async function openAreaLinks(kind = "page") {
    if(kind!=="page")return renderTools();
    try {
      rememberRoute("area", kind === "short" ? "smart-link" : "links");
      content.innerHTML = navigationShell(kind === "short" ? "✂️" : "🔗", kind === "short" ? localizedNavTitle("smart") : localizedNavTitle("links"));
      const ticket=window.EduCashProNavigation?.stamp?.();
      await window.EduCashProResources?.loadLinks?.();
      if(window.EduCashProNavigation && !window.EduCashProNavigation.isCurrent(ticket))return;
      const effectiveSession = syncExternalSession() || window.__EDUCASHPRO_SESSION__ || window.EduCashProWebEntry?.getSession?.();
      window.EduCashProLinks?.setSession?.(effectiveSession);
      const action = kind === "short" ? window.EduCashProLinks?.renderShortener : window.EduCashProLinks?.renderPageEditor;
      if (typeof action !== "function") throw new Error("links_unavailable");
      action({ back: renderArea });
    } catch (error) { handleError(error); }
  }

  async function openAreaProfessional(){return renderTools();}

  async function openAccountCenter(method){
    if(method==="openLanguage")return window.EduCashProLocale.open();
    try{
      content.innerHTML = navigationShell("👤", localizedNavTitle("account"));
      const ticket=window.EduCashProNavigation?.stamp?.();
      await window.EduCashProResources?.loadAccountCenter?.();
      if(window.EduCashProNavigation && !window.EduCashProNavigation.isCurrent(ticket))return;
      return window.EduCashProAccountCenter?.[method]?.();
    }catch(error){
      console.warn("[EduCashPro] account center:",error?.message||error);
      return undefined;
    }
  }

  function renderArea(){if(!requireProductAccount())return;state.view='area';hideGlobalLoading(true);rememberRoute('area');syncExternalSession();updateNav();return window.EduCashProProduct.area(productContext());}

  async function loadAreaProjects(container) {
    if (!container) return;
    try {
      const data = state.projects || await api("/api/hub/projects", { token: state.token }, { blocking: false });
      state.projects = data;
      if (!container.isConnected) return;
      container.innerHTML = data.items.length ? data.items.map((item) => `<article class="itemCard"><div class="itemTop"><div class="itemIcon">${typeIcon(item.type)}</div><div><h3>${escapeHtml(item.name)}</h3><p>${escapeHtml(item.description)}</p><div class="meta"><span class="chip">${escapeHtml(item.status)}</span></div></div></div><div class="cardActions">${item.url ? `<button class="secondaryButton" data-project-url="${escapeHtml(item.url)}">${escapeHtml(t("access"))}</button>` : ""}<button class="secondaryButton" data-delete-kind="${escapeHtml(item.kind || "project")}" data-delete-id="${escapeHtml(item.id)}">🗑️ ${escapeHtml(fc("remove"))}</button></div></article>`).join("") : `<div class="empty">${escapeHtml(t("noProjects"))}</div>`;
      container.querySelectorAll("[data-project-url]").forEach((button) => button.onclick = () => openUrl(button.dataset.projectUrl));
      container.querySelectorAll("[data-delete-id]").forEach((button) => button.onclick = () => removeOwnItem(button.dataset.deleteKind, button.dataset.deleteId));
    } catch (error) {
      if (container.isConnected) handleError(error, container);
    }
  }

  async function renderTools(){if(!requireProductAccount())return;state.view='tools';rememberRoute('tools');updateNav();syncExternalSession();if(!state.profile?.userId&&!state.profile?.tgId)return window.EduCashProWebEntry?.open?.();const ticket=window.EduCashProNavigation?.stamp?.();content.innerHTML=navigationShell('🔗',window.EduCashProProduct.copy(state.language).links);try{await window.EduCashProResources.loadLinks();if(window.EduCashProNavigation&&!window.EduCashProNavigation.isCurrent(ticket))return;window.EduCashProLinks.setSession({token:state.token,profile:state.profile});return window.EduCashProLinks.renderPageEditor({back:renderHome})}catch(error){handleError(error)}}

  function calculateProfitMargin() {
    const read = (id) => Number(String(document.getElementById(id).value || "0").replace(",", "."));
    const cost = read("costValue");
    const sale = read("saleValue");
    const currency = document.getElementById("marginCurrency").value;
    const result = document.getElementById("marginResult");
    if (!(cost > 0) || !(sale > 0)) {
      result.textContent = featureCopy("invalidMargin");
      result.classList.remove("hidden");
      return;
    }
    localStorage.setItem("educashpro:profit-margin", JSON.stringify({ cost, sale, currency }));
    const gross = sale - cost;
    const margin = (gross / sale) * 100;
    const markup = (gross / cost) * 100;
    const money = (value) => {
      if (currency === "USDT") return `${value.toFixed(2)} USDT`;
      return new Intl.NumberFormat(state.language === "pt" ? "pt-BR" : state.language, { style: "currency", currency }).format(value);
    };
    result.innerHTML = `<div class="projectionSummary"><div class="projectionRow"><span>${escapeHtml(featureCopy("cost"))}</span><strong>${escapeHtml(money(cost))}</strong></div><div class="projectionRow"><span>${escapeHtml(featureCopy("sale"))}</span><strong>${escapeHtml(money(sale))}</strong></div><div class="projectionRow"><span>${escapeHtml(featureCopy("gross"))}</span><strong>${escapeHtml(money(gross))}</strong></div><div class="projectionRow"><span>${escapeHtml(featureCopy("margin"))}</span><strong>${margin.toFixed(2)}%</strong></div><div class="projectionRow"><span>${escapeHtml(featureCopy("markup"))}</span><strong>${markup.toFixed(2)}%</strong></div></div>`;
    result.classList.remove("hidden");
  }

  function calculateInterest() {
    const principal = Number(document.getElementById("initialValue").value.replace(",", ".")) || 0;
    const monthly = Number(document.getElementById("monthlyValue").value.replace(",", ".")) || 0;
    const rate = (Number(document.getElementById("rateValue").value.replace(",", ".")) || 0) / 100;
    const months = Math.max(0, Math.trunc(Number(document.getElementById("monthsValue").value) || 0));
    let total = principal;
    for (let i = 0; i < months; i += 1) total = total * (1 + rate) + monthly;
    const result = document.getElementById("interestResult");
    result.textContent = `${t("futureValue")}: ${new Intl.NumberFormat(state.language === "pt" ? "pt-BR" : state.language, { style: "currency", currency: "USD" }).format(total)}`;
    result.classList.remove("hidden");
  }

  async function copyAffiliate() {
    if (!state.affiliateLink) return;
    try { await navigator.clipboard.writeText(state.affiliateLink); showToast(t("copied")); } catch { openUrl(state.affiliateLink); }
  }

  function base64UrlBytes(value) {
    const base64 = String(value || "").replace(/-/g, "+").replace(/_/g, "/").padEnd(Math.ceil(String(value || "").length / 4) * 4, "=");
    return Uint8Array.from(atob(base64), (char) => char.charCodeAt(0));
  }

  function decodeCredential(value) {
    try {
      const [body] = String(value || "").split(".");
      return JSON.parse(new TextDecoder().decode(base64UrlBytes(body)));
    } catch { return null; }
  }

  function createQr(element, text) {
    if (!element) return;
    element.innerHTML = "";
    if (!window.QRCode) { element.textContent = text; return; }
    new window.QRCode(element, { text, width: 240, height: 240, colorDark: "#07111f", colorLight: "#ffffff", correctLevel: window.QRCode.CorrectLevel.M });
  }

  function validProfilePhoto(file) {
    const imageType = /^image\//i.test(String(file?.type || ""));
    const imageExtension = /\.(?:avif|bmp|gif|heic|heif|jpe?g|png|tiff?|webp)$/i.test(String(file?.name || ""));
    return Boolean(file && (imageType || imageExtension) && file.size > 0 && file.size <= 20 * 1024 * 1024);
  }

  function optimizedCloudinaryUrl(value) {
    const url = String(value || "");
    return url.includes("/image/upload/")
      ? url.replace("/image/upload/", "/image/upload/f_auto,q_auto,w_640,h_640,c_fill,g_auto/")
      : url;
  }

  function canvasBlob(canvas, type, quality) {
    return new Promise((resolve) => canvas.toBlob(resolve, type, quality));
  }

  async function normalizeProfilePhoto(file) {
    if (!validProfilePhoto(file)) throw new Error("INVALID_PROFILE_IMAGE");
    const sourceUrl = URL.createObjectURL(file);
    const image = new Image();
    image.decoding = "async";
    try {
      await new Promise((resolve, reject) => {
        image.onload = resolve;
        image.onerror = () => reject(new Error("UNSUPPORTED_PROFILE_IMAGE"));
        image.src = sourceUrl;
      });
      const width = Number(image.naturalWidth || image.width || 0);
      const height = Number(image.naturalHeight || image.height || 0);
      if (!width || !height) throw new Error("UNSUPPORTED_PROFILE_IMAGE");

      const maxSide = 1280;
      const scale = Math.min(1, maxSide / Math.max(width, height));
      const canvas = document.createElement("canvas");
      canvas.width = Math.max(1, Math.round(width * scale));
      canvas.height = Math.max(1, Math.round(height * scale));
      const context = canvas.getContext("2d", { alpha: true });
      if (!context) throw new Error("UNSUPPORTED_PROFILE_IMAGE");
      context.drawImage(image, 0, 0, canvas.width, canvas.height);

      let blob = await canvasBlob(canvas, "image/webp", 0.84);
      let filename = "profile.webp";
      if (!blob) {
        blob = await canvasBlob(canvas, "image/jpeg", 0.86);
        filename = "profile.jpg";
      }
      if (!blob) throw new Error("UNSUPPORTED_PROFILE_IMAGE");
      return { blob, filename };
    } finally {
      URL.revokeObjectURL(sourceUrl);
    }
  }

  async function uploadProfilePhoto(file) {
    const normalized = await normalizeProfilePhoto(file);
    const sign = await profilePhotoSignature();
    const form = new FormData();
    form.append("file", normalized.blob, normalized.filename);
    form.append("api_key", sign.apiKey);
    form.append("timestamp", String(sign.timestamp));
    form.append("folder", sign.folder);
    form.append("signature", sign.signature);
    const controller = new AbortController();
    const timeout = window.setTimeout(() => controller.abort(), 45000);
    try {
      const response = await fetch(`https://api.cloudinary.com/v1_1/${encodeURIComponent(sign.cloudName)}/image/upload`, { method: "POST", body: form, signal: controller.signal });
      const data = await response.json().catch(() => ({}));
      if (!response.ok || !data.secure_url || !data.public_id) {
        const error = new Error(data?.error?.message || "PROFILE_IMAGE_UPLOAD_FAILED");
        error.status = response.status;
        throw error;
      }
      return { url: optimizedCloudinaryUrl(data.secure_url), publicId: data.public_id };
    } catch (error) {
      if (error?.name === "AbortError") throw new Error("PROFILE_IMAGE_TIMEOUT");
      throw error;
    } finally {
      window.clearTimeout(timeout);
    }
  }

  function profilePhotoErrorMessage(error, copy) {
    const reason = String(error?.message || error || "");
    if (/INVALID_PROFILE_IMAGE|UNSUPPORTED_PROFILE_IMAGE/i.test(reason)) return copy[7];
    if (/SESSION|invalid_session|session_expired|telegram_link_required/i.test(reason)) return copy[8];
    if (/image_upload_not_configured/i.test(reason)) return copy[9];
    if (/TIMEOUT|Failed to fetch|Load failed|NetworkError|network request failed/i.test(reason)) return copy[6];
    return copy[10];
  }

  function platformWebPhotoSession() {
    if (window.EduCashProPlatform?.environment?.() !== "web") return null;
    const session = window.EduCashProPlatform?.readWebSession?.();
    return session?.token ? session : null;
  }

  async function platformProfilePhotoApi(path, payload = {}) {
    let session = platformWebPhotoSession();
    if (!session?.token) throw new Error("invalid_session");
    const send = async () => {
      const response = await fetch(`${API_BASE}${path}`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${session.token}` },
        body: JSON.stringify(payload),
        cache: "no-store",
      });
      const data = await response.json().catch(() => ({}));
      return { response, data };
    };
    let result = await send();
    if (result.response.status === 401) {
      session = await window.EduCashProWebAuth?.validateStoredSession?.().catch(() => null);
      if (!session?.token) throw new Error("invalid_session");
      result = await send();
    }
    if (!result.response.ok || result.data?.ok === false) {
      throw new Error(result.data?.reason || "REQUEST");
    }
    return result.data;
  }

  async function profilePhotoSignature() {
    return platformWebPhotoSession()
      ? platformProfilePhotoApi("/api/platform-account/profile-photo/signature")
      : api("/api/hub/link-page/media-signature", { token: state.token });
  }

  async function saveProfilePhoto(profileImage) {
    return platformWebPhotoSession()
      ? platformProfilePhotoApi("/api/platform-account/profile-photo/save", { profileImage })
      : api("/api/hub/profile-photo/save", { token: state.token, profileImage });
  }

  function updateLocalProfileImage(profileImage) {
    state.profile = { ...(state.profile || {}), profileImage: profileImage || null };
    if (window.__EDUCASHPRO_SESSION__) window.__EDUCASHPRO_SESSION__ = { ...window.__EDUCASHPRO_SESSION__, profile: state.profile };
    const currentWebSession = window.EduCashProWebEntry?.getSession?.();
    if (currentWebSession?.profile) currentWebSession.profile = { ...currentWebSession.profile, profileImage: profileImage || null };
    try {
      const stored = JSON.parse(localStorage.getItem("educashpro:web-session") || "null");
      if (stored?.profile) localStorage.setItem("educashpro:web-session", JSON.stringify({ ...stored, profile: { ...stored.profile, profileImage: profileImage || null } }));
    } catch {}
    window.dispatchEvent(new CustomEvent("educashpro:profile-photo-updated", { detail: { profileImage: profileImage || null } }));
  }

  function renderProfilePhotoEditor(backAction = renderArea) {
    rememberRoute("area","photo");
    syncExternalSession();
    const copy = {
      pt: ["Foto do perfil", "Esta foto aparecerá no seu perfil EduCashPro no site e no mini app.", "Escolher foto", "Salvar foto", "Remover foto", "Salvando…", "Não foi possível enviar a foto. Verifique sua conexão e tente novamente.", "Escolha uma imagem válida de até 20 MB.", "Sua sessão expirou. Entre novamente e tente salvar a foto.", "O serviço de imagens ainda não está configurado. Tente novamente mais tarde.", "Não foi possível salvar a foto. Tente outra imagem ou tente novamente."],
      en: ["Profile photo", "This photo will appear in your EduCashPro profile on the website and mini app.", "Choose photo", "Save photo", "Remove photo", "Saving…", "The photo could not be uploaded. Check your connection and try again.", "Choose a valid image up to 20 MB.", "Your session has expired. Sign in again and try to save the photo.", "The image service is not configured yet. Try again later.", "The photo could not be saved. Try another image or try again."],
      es: ["Foto de perfil", "Esta foto aparecerá en tu perfil EduCashPro en el sitio y mini app.", "Elegir foto", "Guardar foto", "Eliminar foto", "Guardando…", "No se pudo enviar la foto. Comprueba tu conexión e inténtalo de nuevo.", "Elige una imagen válida de hasta 20 MB.", "Tu sesión ha caducado. Inicia sesión de nuevo e intenta guardar la foto.", "El servicio de imágenes aún no está configurado. Inténtalo más tarde.", "No se pudo guardar la foto. Prueba con otra imagen o inténtalo de nuevo."],
      ru: ["Фото профиля", "Фото появится в профиле EduCashPro на сайте и в мини-приложении.", "Выбрать фото", "Сохранить", "Удалить", "Сохранение…", "Не удалось загрузить фото. Проверьте соединение и повторите попытку.", "Выберите допустимое изображение размером до 20 МБ.", "Срок сеанса истёк. Войдите снова и сохраните фото.", "Сервис изображений ещё не настроен. Повторите попытку позже.", "Не удалось сохранить фото. Выберите другое изображение или повторите попытку."],
    }[state.language] || [];
    const current = String(state.profile?.profileImage?.url || "");
    const returnTo = typeof backAction === "function" ? backAction : renderArea;
    content.innerHTML = `<button id="profilePhotoBack" class="textButton">← ${escapeHtml(t("back"))}</button><section class="profileCard profilePhotoEditor"><h1>📷 ${escapeHtml(copy[0])}</h1><p>${escapeHtml(copy[1])}</p><div id="profilePhotoPreview" class="profilePhotoPreview">${current ? `<img src="${escapeHtml(current)}" alt="">` : `<span>${escapeHtml((state.profile?.firstName || "E").slice(0,1).toUpperCase())}</span>`}</div><label class="secondaryButton profilePhotoChoose">${escapeHtml(copy[2])}<input id="profilePhotoInput" type="file" accept="image/*,.heic,.heif,.avif,.tif,.tiff" hidden></label><button id="saveProfilePhoto" class="wideButton" disabled>${escapeHtml(copy[3])}</button>${current ? `<button id="removeProfilePhoto" class="secondaryButton">${escapeHtml(copy[4])}</button>` : ""}<div id="profilePhotoStatus" class="accountStatus" role="status"></div></section>`;
    document.getElementById("profilePhotoBack").onclick = returnTo;
    const input = document.getElementById("profilePhotoInput");
    const preview = document.getElementById("profilePhotoPreview");
    const save = document.getElementById("saveProfilePhoto");
    input.onchange = () => {
      const file = input.files?.[0];
      const status = document.getElementById("profilePhotoStatus");
      if (input.previewUrl) URL.revokeObjectURL(input.previewUrl);
      if (!validProfilePhoto(file)) {
        input.selectedFile = null;
        save.disabled = true;
        status.textContent = copy[7];
        return;
      }
      input.selectedFile = file;
      input.previewUrl = URL.createObjectURL(file);
      preview.innerHTML = `<img src="${escapeHtml(input.previewUrl)}" alt="">`;
      status.textContent = "";
      save.disabled = false;
    };
    save.onclick = async () => {
      const status = document.getElementById("profilePhotoStatus");
      const photoTicket=window.EduCashProNavigation?.stamp?.();
      try {
        save.disabled = true; save.textContent = copy[5];
        const profileImage = await uploadProfilePhoto(input.selectedFile);
        await saveProfilePhoto(profileImage);
        updateLocalProfileImage(profileImage);
        if(window.EduCashProNavigation && !window.EduCashProNavigation.isCurrent(photoTicket))return;
        renderArea();
      } catch (error) {
        console.error("[EduCashPro] Falha ao salvar foto do perfil:", error?.message || error);
        status.textContent = profilePhotoErrorMessage(error, copy);
        save.disabled = false;
        save.textContent = copy[3];
      }
    };
    document.getElementById("removeProfilePhoto")?.addEventListener("click", async () => {
      const status = document.getElementById("profilePhotoStatus");
      try {
        await saveProfilePhoto(null);
        updateLocalProfileImage(null);
        renderArea();
      } catch (error) { status.textContent = profilePhotoErrorMessage(error, copy); }
    });
  }

  function currentMembershipCredential() {
    syncExternalSession();
    const credential = String(
      state.membershipCredential
      || window.__EDUCASHPRO_SESSION__?.membershipCredential
      || window.EduCashProWebEntry?.getSession?.()?.membershipCredential
      || localStorage.getItem("educashpro:membership-credential")
      || ""
    );
    if (decodeCredential(credential)) state.membershipCredential = credential;
    return decodeCredential(credential) ? credential : "";
  }

  async function refreshMembershipCredential() {
    if (platformWebPhotoSession()) {
      let credential = "";
      try {
        await window.EduCashProAccess?.refresh?.();
        syncExternalSession();
        credential = currentMembershipCredential();
      } catch {}
      return credential;
    }
    let credential = currentMembershipCredential();
    if (credential) return credential;
    if (!tg?.initData) return "";
    try {
      if (window.__EDUCASHPRO_WEB_HUB__?.active) {
        await new Promise((resolve) => window.setTimeout(resolve, 450));
      }
      const session = await api("/api/hub/session", { initData: tg.initData }, { blocking: window.__EDUCASHPRO_FAST_RENDERED__ !== true });
      syncExternalSession(session);
      credential = currentMembershipCredential();
      if (credential) localStorage.setItem("educashpro:membership-credential", credential);
    } catch {}
    return credential;
  }

  function downloadQr(container, filename) {
    const canvas = container.querySelector("canvas");
    const image = container.querySelector("img");
    const href = canvas?.toDataURL("image/png") || image?.src;
    if (!href) return;
    const link = document.createElement("a"); link.href = href; link.download = filename; link.click();
  }

  function renderQrScreen(value, title, backAction) {
    content.innerHTML = `<button id="qrBack" class="textButton">← ${escapeHtml(t("back"))}</button><section class="profileCard qrCard"><h2>${escapeHtml(title)}</h2><div id="qrCanvas" class="qrCanvas"></div><p>${escapeHtml(value)}</p><button id="downloadQr" class="wideButton">⬇️ ${escapeHtml(featureCopy("downloadQr"))}</button></section>`;
    const container = document.getElementById("qrCanvas"); createQr(container, value);
    document.getElementById("qrBack").onclick = backAction;
    document.getElementById("downloadQr").onclick = () => downloadQr(container, "educashpro-qrcode.png");
  }

  async function openWebMembershipScanner() {
    const copies = {
      pt: ["Verificar credencial", "Aponte a câmera para o QR Code apresentado pelo assinante.", "Voltar", "Não foi possível abrir a câmera. Verifique a permissão do navegador."],
      en: ["Verify credential", "Point the camera at the QR Code shown by the subscriber.", "Back", "The camera could not be opened. Check the browser permission."],
      es: ["Verificar credencial", "Apunta la cámara al QR mostrado por el suscriptor.", "Volver", "No se pudo abrir la cámara. Comprueba el permiso del navegador."],
      ru: ["Проверить карту", "Наведите камеру на QR-код подписчика.", "Назад", "Не удалось открыть камеру. Проверьте разрешение браузера."],
    };
    const copy = copies[state.language] || copies.pt;
    content.innerHTML = `<button id="webScannerBack" class="textButton">← ${escapeHtml(copy[2])}</button><section class="profileCard scannerCard"><h1>📷 ${escapeHtml(copy[0])}</h1><p>${escapeHtml(copy[1])}</p><div id="webQrReader"></div><div id="webQrStatus" class="accountStatus" role="status"></div></section>`;
    const back = async () => { try { await webQrScanner?.clear?.(); } catch {} webQrScanner = null; renderPublicLanding(); };
    document.getElementById("webScannerBack").onclick = () => void back();
    try {
      await window.EduCashProResources?.loadQrScanner?.();
      if (!window.Html5QrcodeScanner) throw new Error("scanner_unavailable");
      const config = { fps:10, qrbox:{width:250,height:250}, rememberLastUsedCamera:true };
      if (window.Html5QrcodeScanType) config.supportedScanTypes=[window.Html5QrcodeScanType.SCAN_TYPE_CAMERA];
      webQrScanner = new window.Html5QrcodeScanner("webQrReader", config, false);
      webQrScanner.render(async (value) => {
        try {
          const scanned = new URL(String(value || ""));
          const scannedCredential = scanned.searchParams.get("credential");
          if (!scannedCredential) throw new Error("credential_missing");
          const language = scanned.searchParams.get("lang") || state.language;
          try { await webQrScanner?.clear?.(); } catch {}
          webQrScanner = null;
          await verifyMembershipCredential(scannedCredential, language, true, renderPublicLanding);
        } catch {
          const status = document.getElementById("webQrStatus");
          if (status) status.textContent = featureCopy("invalidCredential");
        }
      }, () => {});
    } catch {
      const status = document.getElementById("webQrStatus");
      if (status) status.textContent = copy[3];
    }
  }

  function scanMembershipQr() {
    const scannerText = {
      pt: "Aponte a câmera para o QR Code do assinante",
      en: "Point the camera at the subscriber's QR Code",
      es: "Apunta la cámara al código QR del suscriptor",
      ru: "Наведите камеру на QR-код подписчика",
    }[state.language] || "Aponte a câmera para o QR Code do assinante";
    const initData = String(tg?.initData || "");
    const isNativeTelegram = Boolean(initData && initData !== "__EDUCASHPRO_PLATFORM_WEB_SESSION_V1__");
    if (!isNativeTelegram || !tg?.showScanQrPopup) {
      void openWebMembershipScanner();
      return;
    }
    try {
      tg.showScanQrPopup({ text: scannerText }, (value) => {
        try {
          const scanned = new URL(String(value || ""));
          const credential = scanned.searchParams.get("credential");
          if (!credential) return false;
          tg.closeScanQrPopup?.();
          verifyMembershipCredential(credential, scanned.searchParams.get("lang") || state.language, true);
          return true;
        } catch {
          showToast(featureCopy("invalidCredential"));
          return false;
        }
      });
    } catch {
      void openWebMembershipScanner();
    }
  }

  async function renderMembershipProof(backAction = renderArea) {
    rememberRoute("area","membership");
    const proofTicket=window.EduCashProNavigation?.stamp?.();
    const returnTo = typeof backAction === "function" ? backAction : renderArea;
    const credential = await refreshMembershipCredential();
    if(window.EduCashProNavigation && !window.EduCashProNavigation.isCurrent(proofTicket))return;
    const payload = decodeCredential(credential);
    if (!credential || !payload) {
      const unavailable = {
        pt: ["Credencial indisponível", "Não foi possível carregar seu QR Code agora. Atualize a credencial e tente novamente.", "Tentar novamente"],
        en: ["Credential unavailable", "Your QR Code could not be loaded right now. Refresh the credential and try again.", "Try again"],
        es: ["Credencial no disponible", "No se pudo cargar tu código QR ahora. Actualiza la credencial e inténtalo de nuevo.", "Intentar de nuevo"],
        ru: ["Карта недоступна", "Не удалось загрузить QR-код. Обновите данные и попробуйте снова.", "Попробовать снова"],
      }[state.language] || ["Credencial indisponível", "Não foi possível carregar seu QR Code agora.", "Tentar novamente"];
      content.innerHTML = `<button id="proofBack" class="textButton">← ${escapeHtml(t("back"))}</button><section class="profileCard verificationCard"><div class="verificationIcon">⚠️</div><h1>${escapeHtml(unavailable[0])}</h1><p>${escapeHtml(unavailable[1])}</p><button id="proofRetry" class="wideButton">↻ ${escapeHtml(unavailable[2])}</button></section>`;
      document.getElementById("proofBack").onclick = returnTo;
      document.getElementById("proofRetry").onclick = () => void renderMembershipProof(returnTo);
      return;
    }
    const verificationUrl = `${window.location.origin}${window.location.pathname}?credential=${encodeURIComponent(credential)}&lang=${encodeURIComponent(state.language)}`;
    const scanLabel = { pt: "Ler QR Code", en: "Scan QR Code", es: "Leer código QR", ru: "Сканировать QR-код" }[state.language];
    content.innerHTML = `<button id="proofBack" class="textButton">← ${escapeHtml(t("back"))}</button><section class="profileCard qrCard"><span class="statusPill ${Number(payload.validUntil) > Date.now() / 1000 ? "" : "inactive"}">${escapeHtml(Number(payload.validUntil) > Date.now() / 1000 ? featureCopy("credentialActive") : featureCopy("credentialExpired"))}</span><h2>${escapeHtml(payload.name)}</h2><p>${escapeHtml(featureCopy("credentialUpdated"))}: ${escapeHtml(formatDate(payload.issuedAt))}</p><p>${escapeHtml(featureCopy("credentialUntil"))}: <b>${escapeHtml(formatDate(payload.validUntil))}</b></p><div id="proofQr" class="qrCanvas"></div><div class="qrActions"><button id="scanMembershipQr" class="wideButton">📷 ${escapeHtml(scanLabel)}</button></div><p>${escapeHtml(featureCopy("proofHelp"))}</p></section>`;
    await window.EduCashProResources?.loadQr?.().catch(() => null);
    createQr(document.getElementById("proofQr"), verificationUrl);
    document.getElementById("proofBack").onclick = returnTo;
    document.getElementById("scanMembershipQr").onclick = scanMembershipQr;
  }

  async function verifyMembershipCredential(credential, language, embedded = false, backAction = null) {
    state.language = ["pt", "en", "es", "ru"].includes(language) ? language : "pt";
    applyLanguage();
    const parts = String(credential || "").split(".");
    const payload = decodeCredential(credential);
    let authentic = false;
    try {
      const key = await crypto.subtle.importKey("spki", Uint8Array.from(atob(MEMBERSHIP_PUBLIC_KEY_B64), (c) => c.charCodeAt(0)), { name: "ECDSA", namedCurve: "P-256" }, false, ["verify"]);
      authentic = await crypto.subtle.verify({ name: "ECDSA", hash: "SHA-256" }, key, base64UrlBytes(parts[1]), new TextEncoder().encode(parts[0]));
    } catch { authentic = false; }
    const active = authentic && Number(payload?.validUntil || 0) > Date.now() / 1000;
    if (!embedded) {
      document.getElementById("closeButton").classList.add("hidden");
      bottomNav.classList.add("hidden");
    }
    const back = embedded ? `<button id="verificationBack" class="textButton">← ${escapeHtml(t("back"))}</button>` : "";
    content.innerHTML = `${back}<section class="profileCard verificationCard"><div class="verificationIcon">${authentic ? active ? "✅" : "❌" : "⚠️"}</div><h1>${escapeHtml(authentic ? active ? featureCopy("credentialActive") : featureCopy("credentialExpired") : featureCopy("invalidCredential"))}</h1>${authentic ? `<h2>${escapeHtml(payload.name)}</h2><p>${escapeHtml(featureCopy("credentialUpdated"))}: ${escapeHtml(formatDate(payload.issuedAt))}</p><p>${escapeHtml(featureCopy("credentialUntil"))}: <b>${escapeHtml(formatDate(payload.validUntil))}</b></p><div class="providerLine"><span>🛡️ ${escapeHtml(featureCopy("authentic"))}</span></div>` : ""}</section>`;
    if (embedded) document.getElementById("verificationBack").onclick = typeof backAction === "function" ? backAction : renderArea;
  }

  function loadingCard() { return `<div class="empty"><div class="loader" style="margin:auto"><span></span></div></div>`; }
  function localizedNavTitle(kind) {
    const labels = {
      pt:{professional:"Perfil Profissional",links:"Página de links",smart:"Link Inteligente",account:"Minha conta"},
      en:{professional:"Professional Profile",links:"Link page",smart:"Smart Link",account:"My account"},
      es:{professional:"Perfil Profesional",links:"Página de enlaces",smart:"Enlace Inteligente",account:"Mi cuenta"},
      ru:{professional:"Профессиональный профиль",links:"Страница ссылок",smart:"Умная ссылка",account:"Мой аккаунт"}
    };
    return labels[state.language]?.[kind] || labels.pt[kind] || "EduCashPro";
  }
  function navigationShell(icon, title) {
    hideGlobalLoading(true);
    return `<section class="hero navigationShell"><span class="eyebrow">EDUCASHPRO</span><h1>${escapeHtml(icon)} ${escapeHtml(title)}</h1><p>${escapeHtml(t("loading"))}</p></section><div class="empty"><div class="loader" style="margin:auto"><span></span></div></div>`;
  }
  function scheduleNavigationWarmup(){const r=window.EduCashProResources;if(!r)return;for(const src of ['./link-tools.js','./account-center.js'])r.prefetch?.(src);}
  function handleError(error, target = content) { const message = error?.message === "SESSION" ? t("expires") : t("error"); target.innerHTML = `<div class="empty error">${escapeHtml(message)}</div>`; }

  function applyLanguage() {
    state.language = window.EduCashProLocale.resolve({language:state.language});
    if (window.EduCashProLocale?.apply) window.EduCashProLocale.apply(state.language);
    else document.documentElement.lang = state.language;
    headerSubtitle.textContent = t("subtitle");window.EduCashProProduct.applyLanguage(state.language);
    document.querySelectorAll("[data-i18n]").forEach((el) => { el.textContent = t(el.dataset.i18n); });
  }

  function renderPublicLanding(){syncExternalSession();state.language=window.EduCashProLocale?.resolve?.({language:state.profile?.language})||window.EduCashProProduct.locale(navigator.language);applyLanguage();state.view='presentation';window.EduCashProProduct.landing(productContext());bottomNav.classList.toggle('hidden',!state.profile);markAppReady('public-landing');}

  async function runInit() {
    window.__EDUCASHPRO_INIT_STARTED__ = true;
    if(window.__EDUCASHPRO_BOOT__)window.__EDUCASHPRO_BOOT__.initStarted=true;
    bindLateTelegramRetry();
    await resolveTelegramRuntime();
    try {
      tg?.ready?.();
      tg?.expand?.();
      if (window.__EDUCASHPRO_BOOT__) window.__EDUCASHPRO_BOOT__.telegramReady = Boolean(tg);
    } catch (error) {
      console.error("[EduCashPro] Falha ao confirmar inicialização do aplicativo:", error);
    }
    const publicParams = new URL(window.location.href).searchParams;
    if(window.__EDUCASHPRO_TELEGRAM_HINT__&&!tg?.initData){
      renderPublicLanding();
      return;
    }
    if (publicParams.get("page") || publicParams.get("go")) await window.EduCashProResources?.loadLinks?.();
    if (await window.EduCashProLinks?.bootPublic?.(publicParams)) { markAppReady("public-link"); return; }
    const credentialToVerify = publicParams.get("credential");
    if (credentialToVerify) { await verifyMembershipCredential(credentialToVerify, publicParams.get("lang")); markAppReady("credential"); return; }
    document.getElementById("closeButton").onclick = () => tg?.close?.();
    document.querySelectorAll("[data-close-modal]").forEach((button) => button.onclick = closeModal);
    if (bottomNav.dataset.navigationBound !== "1") {
      bottomNav.dataset.navigationBound = "1";
      bottomNav.querySelectorAll("button[data-view]").forEach((button) => {
        button.onclick = (event) => {
          event?.preventDefault?.();
          navigateFromFooter(button);
        };
      });
    }

    if (window.__EDUCASHPRO_WEB_HUB__?.active) {
      const cachedSession = window.EduCashProPlatform?.readWebSession?.();
      if (cachedSession?.profile?.userId) {
        try { syncExternalSession(cachedSession); }
        catch (error) {
          console.warn("[EduCashPro] sessão local:", error?.message || error);
          state.profile = normalizeProfile(cachedSession.profile || {});
        }
        window.__EDUCASHPRO_FAST_RENDERED__ = true;
        try {
          const resumed = await resumeAuthenticatedExperience({restoreNavigation:false});
          if (!resumed || content.querySelector(".splash")) renderHome();
        } catch (error) {
          console.warn("[EduCashPro] restauração local:", error?.message || error);
          renderHome();
        }
        markAppReady("web-cached-shell");
        scheduleNavigationWarmup();
        void refreshHubSessionInBackground();
        return;
      }
    }

    if (!tg?.initData) {
      renderPublicLanding();
      if(publicParams.get("view")==="presentation"||publicParams.has("ref")||publicParams.has("r"))renderPresentation();
      return;
    }

    // A primeira tela nunca depende do backend. A sessão do Telegram é sincronizada depois.
    renderPublicLanding();

    const initTicket=window.EduCashProNavigation?.stamp?.();
    try {
      const session = await api("/api/hub/session", { initData: tg.initData }, { blocking: false, timeoutMs: 6000 });
      acceptHubSession(session);
      if(window.EduCashProNavigation?.current?.() && !window.EduCashProNavigation.isCurrent(initTicket)){applyLanguage();bottomNav.classList.remove("hidden");markAppReady("session-only");return;}
      if (window.__EDUCASHPRO_FAST_RENDERED__ === true && window.__EDUCASHPRO_WEB_HUB__?.active) {
        hydrateCourseCatalogFromCache();
        applyLanguage();
        bottomNav.classList.remove("hidden");
        refreshCourseCatalogLater();
        markAppReady("web-hub-session");
        window.EduCashProResources?.idle?.(() => void checkForUpdates(), 9000);
        return;
      }
      const receivedCredential = String(session.membershipCredential || "");
      const cachedCredential = String(localStorage.getItem("educashpro:membership-credential") || "");
      const receivedPayload = decodeCredential(receivedCredential);
      const cachedPayload = decodeCredential(cachedCredential);
      if (receivedCredential && Number(receivedPayload?.validUntil || 0) !== Number(cachedPayload?.validUntil || 0)) localStorage.setItem("educashpro:membership-credential", receivedCredential);
      state.membershipCredential = Number(cachedPayload?.validUntil || 0) === Number(receivedPayload?.validUntil || 0) && cachedCredential ? cachedCredential : receivedCredential;
      state.language = window.EduCashProLocale.resolve({language:session.profile.language});
      state.profile.language = state.language;
      const startParam = String(tg?.initDataUnsafe?.start_param || publicParams.get("tgWebAppStartParam") || "");
      hydrateCourseCatalogFromCache();
      applyLanguage();
      bottomNav.classList.remove("hidden");
      refreshCourseCatalogLater();
      const hasExplicitRoute = ["course","academy","view","section"].some((key)=>publicParams.has(key));
      if (!hasExplicitRoute && window.EduCashProNavigationState?.restoreLastPage?.()) { markAppReady("navigation-restore"); return; }
      const requestedCourse = String(publicParams.get("course") || "");
      const requestedAcademy = String(publicParams.get("academy") || "");
      const requestedView = String(publicParams.get("view") || "");
      const requestedSection = String(publicParams.get("section") || "");
      if (requestedCourse) await restoreRoute({view:"course",detail:requestedCourse});
      else if (requestedView === "analysis" || requestedView === "games" || requestedView === "tools" && ["games","randomizers"].includes(publicParams.get("tool")) || requestedAcademy === "technical_analysis") await openLiveMarkets();
      else if (["free_courses", "network_marketing", "financial_education", "telegram"].includes(requestedAcademy)) await openAcademyCategory(requestedAcademy);
      else if (requestedView === "benefits" && requestedSection === "exclusive-benefits") await renderExclusiveBenefits();
      else if (requestedView === "benefits" && requestedSection === "partner-stores") location.assign("./marketplace.html");
      else if (requestedView === "benefits" && requestedSection === "company-register") renderSubmissionForm("partner");
      else if(requestedView === "area" && publicParams.get("panel"))await restoreRoute({view:"area",detail:publicParams.get("panel")});
      else if (requestedView === "tools") await restoreRoute({view:"tools",detail:publicParams.get("tool")||""});
      else if (requestedView === "presentation") renderPresentation();
      else if (["learn", "practice", "explore", "benefits", "area"].includes(requestedView)) await Promise.resolve(setView(requestedView));
      else {
        const rememberedRoute = readRememberedRoute();
        if (rememberedRoute) await restoreRoute(rememberedRoute);
        else renderHome();
      }
      markAppReady("authenticated-session");
      scheduleNavigationWarmup();
      window.setTimeout(() => window.EduCashProProfessional?.maybeOnboard?.(), 450);
      if (window.EduCashProResources?.idle) window.EduCashProResources.idle(() => void checkForUpdates(), 9000);
      else window.setTimeout(() => void checkForUpdates(), 9000);
    } catch (error) {
      console.error("[EduCashPro] Sessão inicial:", error);
      if (!window.__EDUCASHPRO_APP_READY__) renderPublicLanding();
      showToast(error?.message === "SESSION" ? COPY.pt.telegramOnly : t("error"));
    }
  }

  function init() {
    if (initPromise) return initPromise;
    initPromise = runInit()
      .catch((error) => {
        console.error("[EduCashPro] Inicialização:", error);
        if (!window.__EDUCASHPRO_APP_READY__) {
          try { renderPublicLanding(); }
          catch {
            const loadingText = document.getElementById("loadingText");
            if (loadingText) loadingText.textContent = t("error");
          }
        }
      })
      .finally(() => { initPromise = null; });
    return initPromise;
  }

  document.addEventListener("click", (event) => {
    const button = event.target?.closest?.("[data-academy-category]");
    const category = button?.dataset?.academyCategory;
    if (!["free_courses", "network_marketing", "financial_education", "telegram"].includes(category)) return;
    event.preventDefault();
    event.stopImmediatePropagation();
    void openAcademyCategory(category);
  }, true);

  // Atualizações são verificadas na inicialização, sem trocar a tela atual
  // quando o usuário volta ao app, muda de aba ou desbloqueia o aparelho.
  window.addEventListener("scroll", rememberCurrentScroll, { passive: true });
  window.addEventListener("pagehide", flushRememberedRoute);
  window.addEventListener("beforeunload", flushRememberedRoute);
  document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "hidden") flushRememberedRoute();
  });
function productContext(){
  const profile=state.profile,language=state.language;
  const ctx={root:content,language,profile,session:{token:state.token,profile},open:openUrl,
    entry:()=>window.EduCashProWebEntry?.open?.(),home:()=>profile?renderHome():renderPublicLanding(),learn:renderLearn,practice:openMarkets,links:renderTools,area:renderArea,presentation:renderPresentation,subscribe:openSubscription,
    finance:()=>renderCourseCategory('financial_education'),business:()=>renderCourseCategory('business'),technical:()=>openCourse('analise_tecnica_completa'),
    subscription:()=>openAccountCenter('openSubscription'),network:()=>openAccountCenter('openNetwork'),settings:()=>openAccountCenter('openSettings')};
  ctx.market=openLiveMarkets;ctx.language=language;ctx.languageAction=()=>window.EduCashProLocale.open();
  ctx.program=()=>{const u=new URL('./affiliate.html',location.href);u.searchParams.set('lang',language);const ref=profile?.referralCode||window.EduCashProPlatform?.pendingReferral?.();if(ref)u.searchParams.set('ref',ref);openUrl(u.toString())};
  ctx.help=()=>window.EduCashProProduct.help(productContext());ctx.channel=()=>openUrl('https://t.me/+1mP5ad7vJH5lOGNh');ctx.group=()=>window.EduCashProProduct.group(ctx);
  ctx.telegram=()=>{const code=window.EduCashProPlatform?.pendingReferral?.()||'';const u=new URL('https://t.me/EduCashProBot');if(code)u.searchParams.set('start','ref_'+code);openUrl(u.toString())};
  return ctx;
}
  window.EduCashProApp = { renderNetworkProjection, renderPresentation, renderPublicLanding, scanMembershipQr, renderMembershipProof, renderProfilePhotoEditor, renderHome, renderLearn, renderTools, renderExplore, renderBenefits, renderArea, renderSubmissionForm, openMarkets, openSubscription, setView, setSession, clearSession, openAcademyCategory, rememberRoute, readRememberedRoute, restoreRoute, resumeAuthenticatedExperience, flushRememberedRoute };
  window.EduCashProNavigation?.configure?.(restoreRoute);
  window.addEventListener("educashpro:web-hub-ready",()=>{
    tg=window.Telegram?.WebApp||tg;
    void refreshHubSessionInBackground();
  });
  window.addEventListener("educashpro:web-session-ready",()=>{
    if (content.querySelector(".splash") && state.profile) {
      void resumeAuthenticatedExperience({restoreNavigation:false}).catch(()=>renderHome());
    }
    scheduleNavigationWarmup();
  });
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init, { once: true });
  else init();
})();





