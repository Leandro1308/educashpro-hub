(function () {
  const tg = window.Telegram?.WebApp;
  const content = document.getElementById("content");
  const bottomNav = document.getElementById("bottomNav");
  const toast = document.getElementById("toast");
  const globalLoading = document.getElementById("globalLoading");
  const globalLoadingText = document.getElementById("globalLoadingText");
  const globalLoadingHint = document.getElementById("globalLoadingHint");
  const headerSubtitle = document.getElementById("headerSubtitle");
  const apiBaseFromUrl = String(new URL(window.location.href).searchParams.get("api") || "").replace(/\/+$/, "");
  const API_BASE = /^https:\/\//i.test(apiBaseFromUrl) ? apiBaseFromUrl : "https://educashpro-all.onrender.com";
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
  };

  const COPY = {
    pt: {
      subtitle: "Seu universo em um só lugar", loading: "Organizando sua experiência…",
      navHome: "Início", navLearn: "Aprender", navExplore: "Explorar", navBenefits: "Benefícios", navArea: "Minha área",
      welcome: "Bem-vindo", active: "Assinatura ativa", inactive: "Assinatura inativa", validUntil: "Válida até",
      heroActive: "Aprenda, descubra oportunidades e desenvolva sua presença digital.",
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
        ["🧰", "Ferramentas digitais", "Página de links, Link Inteligente, calculadoras, sorteadores e jogos no celular."],
        ["📅", "Organização profissional", "Agenda para atendimentos, reuniões, aulas, serviços e outros compromissos."],
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
      networkNote: "Não é promessa de ganhos. Os resultados dependem de assinaturas e renovações reais, qualificação e atuação individual.",
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
        ["🧰", "Digital tools", "Link page, Smart Link, calculators, randomizers and mobile games."],
        ["📅", "Professional organization", "A schedule for appointments, meetings, classes, services and other commitments."],
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
      networkNote: "This is not an earnings promise. Results depend on real subscriptions and renewals, qualification and individual effort.",
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
        ["🧰", "Herramientas digitales", "Página de enlaces, Enlace Inteligente, calculadoras, sorteos y juegos en el celular."],
        ["📅", "Organización profesional", "Agenda para citas, reuniones, clases, servicios y otros compromisos."],
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
      networkNote: "No es una promesa de ganancias. Los resultados dependen de suscripciones y renovaciones reales, calificación y actuación individual.",
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
        ["🧰", "Цифровые инструменты", "Страница ссылок, умная ссылка, калькуляторы, жеребьёвки и игры в телефоне."],
        ["📅", "Рабочая организация", "Расписание приёмов, встреч, занятий, услуг и других дел."],
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
      networkNote: "Это не обещание дохода. Результаты зависят от реальных подписок и продлений, квалификации и личной работы.",
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

  const AGENDA_COPY = {
    pt: { agenda: "Agenda Profissional", agendaSub: "Atendimentos, serviços, reuniões, aulas, visitas e compromissos" },
    en: { agenda: "Professional Schedule", agendaSub: "Appointments, services, meetings, classes, visits and commitments" },
    es: { agenda: "Agenda Profesional", agendaSub: "Atenciones, servicios, reuniones, clases, visitas y compromisos" },
    ru: { agenda: "Профессиональное расписание", agendaSub: "Приёмы, услуги, встречи, занятия, визиты и личные дела" },
  };

  function t(key) { return AGENDA_COPY[state.language]?.[key] || EXTRA_COPY[state.language]?.[key] || COPY[state.language]?.[key] || AGENDA_COPY.pt[key] || EXTRA_COPY.pt[key] || COPY.pt[key] || key; }
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
    if (!globalLoading || (!force && pendingApiRequests.size)) return;
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
  function openUrl(url) { if (!url) return; if (/^https:\/\/t\.me\//i.test(url) && tg?.openTelegramLink) tg.openTelegramLink(url); else if (tg?.openLink) tg.openLink(url); else window.open(url, "_blank", "noopener"); }

  function openSubscription() {
    const url = String(state.subscribeUrl || state.botUrl || "").trim();
    if (!url) return;

    if (/^https:\/\/t\.me\//i.test(url) && tg?.openTelegramLink) {
      tg.openTelegramLink(url);
      window.setTimeout(() => tg?.close?.(), 180);
      return;
    }

    openUrl(url);
  }

  function localized(value) { return value?.[state.language] || value?.pt || ""; }
  function catalogKey() { return "educashpro:courses:catalog:v1"; }
  function courseCacheKey(courseId) { return `educashpro:course-cache:${state.language}:${courseId}`; }

  const APP_BUILD_KEY = "educashpro:app-build";
  const APP_RELOAD_GUARD_KEY = "educashpro:reload-build";
  let updateCheckPromise = null;

  function clearPublishedContentCache() {
    try {
      Object.keys(localStorage).forEach((key) => {
        if (key === catalogKey() || key.startsWith("educashpro:course-cache:")) localStorage.removeItem(key);
      });
    } catch {}
  }

  async function checkForUpdates() {
    if (updateCheckPromise) return updateCheckPromise;
    updateCheckPromise = (async () => {
      const controller = new AbortController();
      const timeout = window.setTimeout(() => controller.abort(), 3500);
      try {
        const response = await fetch(`./version.json?fresh=${Date.now()}`, { cache: "no-store", signal: controller.signal });
        if (!response.ok) return false;
        const data = await response.json();
        const publishedBuild = String(data?.build || "").trim();
        if (!publishedBuild) return false;
        const currentBuild = String(localStorage.getItem(APP_BUILD_KEY) || "");
        const requestedBuild = String(new URL(window.location.href).searchParams.get("release") || "");
        const guardedBuild = String(sessionStorage.getItem(APP_RELOAD_GUARD_KEY) || "");
        localStorage.setItem(APP_BUILD_KEY, publishedBuild);
        if (!currentBuild || currentBuild === publishedBuild || requestedBuild === publishedBuild || guardedBuild === publishedBuild) return false;
        clearPublishedContentCache();
        sessionStorage.setItem(APP_RELOAD_GUARD_KEY, publishedBuild);
        const url = new URL(window.location.href);
        url.searchParams.set("release", publishedBuild);
        window.location.replace(url.toString());
        return true;
      } catch {
        return false;
      } finally {
        window.clearTimeout(timeout);
        window.setTimeout(() => { updateCheckPromise = null; }, 1000);
      }
    })();
    return updateCheckPromise;
  }

  async function loadCourseCatalog() {
    let cached = null;
    try {
      cached = JSON.parse(localStorage.getItem(catalogKey()) || "null");
      if (Array.isArray(cached?.courses)) state.courseCatalog = cached.courses;
    } catch {}
    try {
      const assetVersion = window.EDUCASHPRO_ASSET_VERSION || Date.now().toString(36);
      const response = await fetch(`./courses.json?fresh=${assetVersion}`, { cache: "no-store" });
      if (!response.ok) throw new Error("catalog");
      const data = await response.json();
      state.courseCatalog = Array.isArray(data?.courses) ? data.courses.sort((a, b) => Number(a.order) - Number(b.order)) : [];
      localStorage.setItem(catalogKey(), JSON.stringify({ savedAt: Date.now(), courses: state.courseCatalog }));
    } catch {
      if (!state.courseCatalog.length) state.courseCatalog = [];
    }
  }

  function subscribeNow() { openSubscription(); }
  function openAgenda(publicId = "") {
    const query = publicId ? `?agenda=${encodeURIComponent(publicId)}` : "";
    window.location.assign(`./agenda.html${query}`);
  }

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
  async function api(path, payload = {}) {
    const requestKey = path + JSON.stringify(payload);
    if (pendingApiRequests.has(requestKey)) return pendingApiRequests.get(requestKey);
    const request = (async () => {
      const controller = new AbortController();
      const timeout = window.setTimeout(() => controller.abort(), 12000);
      showGlobalLoading();
      try {
        const response = await fetch(`${API_BASE}${path}`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload), cache: "no-store", signal: controller.signal });
        const data = await response.json().catch(() => ({}));
        if (response.status === 401) throw new Error("SESSION");
        if (!response.ok) throw new Error(data.reason || "REQUEST");
        return data;
      } catch (error) {
        if (error?.name === "AbortError") throw new Error("TIMEOUT");
        throw error;
      } finally {
        window.clearTimeout(timeout);
        pendingApiRequests.delete(requestKey);
        if (!pendingApiRequests.size) hideGlobalLoading();
      }
    })();
    pendingApiRequests.set(requestKey, request);
    return request;
  }

  function updateNav() {
    bottomNav.querySelectorAll("button").forEach((button) => button.classList.toggle("active", button.dataset.view === state.view));
  }

  function setView(view) {
    if (!state.profile?.active && ["explore"].includes(view)) {
      const lockedId = view === "explore" ? "communities" : "courses";
      showLockedInfo(lockedExperience(lockedId));
      return;
    }
    state.view = view;
    updateNav();
    window.scrollTo({ top: 0, behavior: "smooth" });
    if (view === "home") return renderHome();
    if (view === "learn") return renderLearn();
    if (view === "explore") return renderExplore();
    if (view === "benefits") return renderBenefits();
    if (view === "area") return renderArea();
  }

  let navigationBusy = false;
  async function navigateFromFooter(button) {
    if (!button || navigationBusy) return;
    navigationBusy = true;
    showGlobalLoading();
    try {
      await Promise.resolve(setView(button.dataset.view));
    } catch (error) {
      handleError(error);
    } finally {
      navigationBusy = false;
      hideGlobalLoading();
    }
  }

  function renderHome() {
    const p = state.profile;
    const supportLabels = {
      pt: ["Fale com o administrador", "Relate problemas, falhas ou envie sugestões"],
      en: ["Contact the administrator", "Report problems, failures or send suggestions"],
      es: ["Hablar con el administrador", "Informa problemas, fallas o envía sugerencias"],
      ru: ["Связаться с администратором", "Сообщите о проблеме, ошибке или предложении"],
    };
    const supportLabel = supportLabels[state.language] || supportLabels.pt;
    const activeCards = `
      ${quickCard("learn", "🎓", t("continueLearning"), t("coursesSub"))}
      ${quickCard("explore", "🔎", t("explore"), t("exploreSub"))}
      ${quickCard("tools", "🧰", t("tools"), t("toolsSub"))}
      ${quickCard("benefits", "🎁", t("benefits"), t("benefitsSub"))}`;
    const inactiveCards = `
      ${quickCard("learn", "🎓", t("courses"), t("coursesSub"))}
      ${quickCard("tools", "🧰", t("tools"), t("toolsSub"))}
      ${quickCard("agenda", "📅", t("agenda"), t("agendaSub"))}
      ${quickCard("support", "💬", supportLabel[0], supportLabel[1])}`;
    content.innerHTML = `
      <section class="hero">
        <span class="eyebrow">${escapeHtml(t("welcome"))}</span>
        <h1>${escapeHtml(p.firstName || "EduCashPro")}</h1>
        <p>${escapeHtml(p.active ? t("heroActive") : t("heroInactive"))}</p>
        <span class="statusPill ${p.active ? "" : "inactive"}">${p.active ? "●" : "○"} ${escapeHtml(p.active ? t("active") : t("inactive"))}</span>
      </section>
      <button id="openPresentation" class="visitorIntro"><span class="visitorIntroIcon">✨</span><span><strong>${escapeHtml(presentationCopy("homeTitle"))}</strong><small>${escapeHtml(presentationCopy("homeText"))}</small><b>${escapeHtml(presentationCopy("homeButton"))} →</b></span></button>
      <div class="sectionHead"><div><h2>${escapeHtml(t("yourSpace"))}</h2><p>${escapeHtml(t("yourSpaceSub"))}</p></div></div>
      <section class="quickGrid">
        ${p.active ? activeCards : inactiveCards}
      </section>
      ${p.active ? "" : renderMembershipUpsell()}`;
    document.getElementById("openPresentation")?.addEventListener("click", renderPresentation);
    document.getElementById("homeSubscribe")?.addEventListener("click", renderPresentation);
    content.querySelectorAll("[data-target]").forEach((el) => el.onclick = () => {
      const target = el.dataset.target;
      if (target.startsWith("course:")) openCourse(target.split(":")[1]);
      else if (target === "tools") renderTools(); else if (target === "agenda") openAgenda(); else if (target === "support") location.assign(`./support.html?api=${encodeURIComponent(API_BASE)}`); else setView(target);
    });
    content.querySelectorAll("[data-locked-experience]").forEach((button) => button.onclick = () => showLockedInfo(lockedExperience(button.dataset.lockedExperience)));
  }

  function renderMembershipUpsell() {
    const copies = {
      pt: ["Experiência completa", "Cursos exclusivos, diretório, benefícios, parceiros e programa de indicação reunidos em uma única assinatura.", "Ver tudo que a assinatura libera"],
      en: ["Full experience", "Exclusive courses, directory, benefits, partners and the referral program included in one subscription.", "See everything the subscription unlocks"],
      es: ["Experiencia completa", "Cursos exclusivos, directorio, beneficios, socios y programa de recomendación reunidos en una sola suscripción.", "Ver todo lo que libera la suscripción"],
      ru: ["Полная версия", "Эксклюзивные курсы, каталог, преимущества, партнёры и реферальная программа в одной подписке.", "Посмотреть возможности подписки"],
    };
    const value = copies[state.language] || copies.pt;
    return `<section class="membershipUpsell"><span class="membershipUpsellIcon">✨</span><div><span class="eyebrow">EDUCASHPRO</span><h2>${escapeHtml(value[0])}</h2><p>${escapeHtml(value[1])}</p></div><button id="homeSubscribe" class="wideButton">⚡ ${escapeHtml(value[2])}</button></section>`;
  }

  function presentationPriceText() {
    const price = Number(state.planPriceUsdt || 12);
    const formattedPrice = Number.isInteger(price) ? String(price) : price.toFixed(2);
    const key = state.profile?.activeUntil ? "reactivate" : "subscribe";
    return String(presentationCopy(key)).replace("{price}", formattedPrice);
  }

  function renderPresentation() {
    const isActive = Boolean(state.profile?.active);
    const included = presentationCopy("included");
    const works = presentationCopy("works");
    const goals = presentationCopy("goals");
    state.view = "presentation";
    updateNav();
    window.scrollTo({ top: 0, behavior: "smooth" });
    content.innerHTML = `
      <button id="presentationBack" class="textButton presentationBack">← ${escapeHtml(presentationCopy("back"))}</button>
      <section class="presentationHero">
        <span class="eyebrow">${escapeHtml(presentationCopy("kicker"))}</span>
        <h1>${escapeHtml(presentationCopy("title"))}</h1>
        <p>${escapeHtml(presentationCopy("lead"))}</p>
        <div class="inviteRegistered">✅ ${escapeHtml(isActive ? presentationCopy("activeReady") : state.referrerId ? presentationCopy("invite") : presentationCopy("ready"))}</div>
        ${isActive ? "" : `<button class="wideButton presentationSubscribe">⚡ ${escapeHtml(presentationPriceText())}</button>`}
      </section>
      <section class="presentationSection">
        <h2>${escapeHtml(presentationCopy("includedTitle"))}</h2>
        <div class="presentationBenefits">${included.map(([icon, title, description]) => `<article><span>${icon}</span><div><h3>${escapeHtml(title)}</h3><p>${escapeHtml(description)}</p></div></article>`).join("")}</div>
      </section>
      <section class="presentationSection">
        <h2>${escapeHtml(featureCopy("topicsTitle"))}</h2>
        <div class="goalGrid">${featureCopy("topics").map((topic) => `<span>${escapeHtml(topic)}</span>`).join("")}</div>
      </section>
      <section class="presentationPair">
        <article><span>👨‍💻</span><h2>${escapeHtml(featureCopy("creatorTitle"))}</h2><p>${escapeHtml(featureCopy("creatorText"))}</p></article>
        <article><span>🔎</span><h2>${escapeHtml(featureCopy("directoryTitle"))}</h2><p>${escapeHtml(featureCopy("directoryText"))}</p></article>
      </section>
      <section class="presentationSection accessExplanation">
        <h2>${escapeHtml(presentationCopy("accessTitle"))}</h2>
        <p>${escapeHtml(presentationCopy("accessText"))}</p>
      </section>
      <section class="creatorReferralNotice">
        <span>🔗</span><div><h2>${escapeHtml(featureCopy("creatorReferralTitle"))}</h2><p>${escapeHtml(featureCopy("creatorReferralText"))}</p></div>
      </section>
      <section class="presentationSection">
        <h2>${escapeHtml(presentationCopy("worksTitle"))}</h2>
        <div class="presentationSteps">${works.map(([number, title, description]) => `<article><b>${escapeHtml(number)}</b><div><h3>${escapeHtml(title)}</h3><p>${escapeHtml(description)}</p></div></article>`).join("")}</div>
      </section>
      <section class="networkHighlight">
        <span>💰</span><h2>${escapeHtml(featureCopy("planTitle"))}</h2>
        <p>${escapeHtml(featureCopy("planIntro"))}</p>
        <div class="directCommission"><b>60%</b><span>${escapeHtml(featureCopy("direct"))}</span></div>
        <h3>${escapeHtml(featureCopy("renewalsTitle"))}</h3>
        <div class="planGrid">${featureCopy("renewals").map((item) => `<span>${escapeHtml(item)}</span>`).join("")}</div>
        <h3>${escapeHtml(featureCopy("qualificationsTitle"))}</h3>
        <div class="qualificationList">${featureCopy("qualifications").map((item) => `<span>✓ ${escapeHtml(item)}</span>`).join("")}</div>
        <p class="automaticPayment">💵 ${escapeHtml(featureCopy("automatic"))}</p>
        <small>⚠️ ${escapeHtml(presentationCopy("networkNote"))}</small>
      </section>
      <details class="presentationDetails">
        <summary>🔒 ${escapeHtml(featureCopy("inactiveTitle"))}</summary>
        <ul>${featureCopy("inactiveRules").map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>
      </details>
      <section class="presentationSection">
        <h2>${escapeHtml(presentationCopy("chooseTitle"))}</h2>
        <div class="goalGrid">${goals.map((goal) => `<span>${escapeHtml(goal)}</span>`).join("")}</div>
      </section>
      <section class="presentationFinal">
        <h2>${escapeHtml(presentationCopy("finalTitle"))}</h2>
        <p>${escapeHtml(presentationCopy(isActive ? "finalTextActive" : "finalText"))}</p>
        ${isActive ? "" : `<button class="wideButton presentationSubscribe">⚡ ${escapeHtml(presentationPriceText())}</button><small>${escapeHtml(presentationCopy("details"))}</small>`}
      </section>`;
    document.getElementById("presentationBack").onclick = () => setView("home");
    content.querySelectorAll(".presentationSubscribe").forEach((button) => button.onclick = subscribeNow);
  }

  function quickCard(target, icon, title, sub) {
    return `<button class="quickCard" data-target="${target}"><span class="emoji">${icon}</span><strong>${escapeHtml(title)}</strong><small>${escapeHtml(sub)}</small></button>`;
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

  function academyMenuCopy() {
    const copy = {
      pt: {
        choose: "Escolha uma área",
        chooseSub: "Conteúdos separados por assunto para você encontrar o que precisa.",
        categories: [
          ["introduction", "✨", "Comece por aqui", "Conheça o EduCashPro e os fundamentos da plataforma."],
          ["network_marketing", "🤝", "Afiliados e Marketing de Rede", "Produto, indicação, relacionamento, liderança e desenvolvimento de rede."],
          ["technical_analysis", "📈", "Análise Técnica", "Gráficos, Price Action, indicadores, XAUUSD, estratégias e risco."],
          ["financial_education", "💰", "Renda Extra, Finanças e Web3", "Educação financeira, nova economia e desenvolvimento de ativos digitais."],
          ["telegram", "✈️", "Telegram Profissional", "Grupos, canais, bots, segurança, crescimento e monetização responsável."],
          ["tools", "🧮", "Ferramentas", "Calculadoras, simuladores e recursos educativos."],
        ],
      },
      en: {
        choose: "Choose an area",
        chooseSub: "Content separated by topic so you can quickly find what you need.",
        categories: [
          ["introduction", "✨", "Start here", "Discover EduCashPro and the platform fundamentals."],
          ["network_marketing", "🤝", "Affiliates and Network Marketing", "Product, referrals, relationships, leadership and network development."],
          ["technical_analysis", "📈", "Technical Analysis", "Charts, Price Action, indicators, XAUUSD, strategies and risk."],
          ["financial_education", "💰", "Extra Income, Finance and Web3", "Financial education, the new economy and digital asset development."],
          ["telegram", "✈️", "Professional Telegram", "Groups, channels, bots, safety, growth and responsible monetization."],
          ["tools", "🧮", "Tools", "Calculators, simulators and educational resources."],
        ],
      },
      es: {
        choose: "Elige un área",
        chooseSub: "Contenidos separados por tema para encontrar rápidamente lo que necesitas.",
        categories: [
          ["introduction", "✨", "Empieza aquí", "Conoce EduCashPro y los fundamentos de la plataforma."],
          ["network_marketing", "🤝", "Afiliados y Marketing de Red", "Producto, referidos, relaciones, liderazgo y desarrollo de red."],
          ["technical_analysis", "📈", "Análisis Técnico", "Gráficos, Price Action, indicadores, XAUUSD, estrategias y riesgo."],
          ["financial_education", "💰", "Ingresos Extra, Finanzas y Web3", "Educación financiera, nueva economía y activos digitales."],
          ["telegram", "✈️", "Telegram Profesional", "Grupos, canales, bots, seguridad, crecimiento y monetización responsable."],
          ["tools", "🧮", "Herramientas", "Calculadoras, simuladores y recursos educativos."],
        ],
      },
      ru: {
        choose: "Выберите направление",
        chooseSub: "Материалы разделены по темам, чтобы быстро найти нужное.",
        categories: [
          ["introduction", "✨", "Начните здесь", "Познакомьтесь с EduCashPro и основами платформы."],
          ["network_marketing", "🤝", "Партнёрство и сетевой маркетинг", "Продукт, рекомендации, отношения, лидерство и развитие сети."],
          ["technical_analysis", "📈", "Технический анализ", "Графики, Price Action, индикаторы, XAUUSD, стратегии и риск."],
          ["financial_education", "💰", "Дополнительный доход, финансы и Web3", "Финансовая грамотность, новая экономика и цифровые активы."],
          ["telegram", "✈️", "Профессиональный Telegram", "Группы, каналы, боты, безопасность, рост и ответственная монетизация."],
          ["tools", "🧮", "Инструменты", "Калькуляторы, симуляторы и образовательные ресурсы."],
        ],
      },
    };
    return copy[state.language] || copy.pt;
  }

  function renderLearn() {
    const menu = academyMenuCopy();
    content.innerHTML = `
      <section class="courseHero"><span class="eyebrow">ACADEMY</span><h2>${escapeHtml(t("learnTitle"))}</h2><p>${escapeHtml(t("learnDesc"))}</p></section>
      <div class="sectionHead"><div><h2>${escapeHtml(menu.choose)}</h2><p>${escapeHtml(menu.chooseSub)}</p></div></div>
      <section class="quickGrid academyGrid">
        ${menu.categories.map(([id, icon, title, description]) => `<button class="quickCard academyCategoryCard" data-academy-category="${escapeHtml(id)}"><span class="emoji">${icon}</span><strong>${escapeHtml(title)}</strong><small>${escapeHtml(description)}</small></button>`).join("")}
      </section>`;
    content.querySelectorAll("[data-academy-category]").forEach((button) => button.onclick = () => {
      if (button.dataset.academyCategory === "tools") return renderTools();
      renderCourseCategory(button.dataset.academyCategory);
    });
  }

  function renderCourseCategory(category) {
    const active = state.profile.active;
    const menu = academyMenuCopy();
    const categoryCopy = menu.categories.find(([id]) => id === category);
    const visibleCourses = state.courseCatalog.filter((item) => item.category === category);
    content.innerHTML = `
      <button id="academyBack" class="textButton">← ${escapeHtml(t("back"))}</button>
      <section class="academyCategoryHero"><span>${categoryCopy?.[1] || "🎓"}</span><div><h2>${escapeHtml(categoryCopy?.[2] || t("courses"))}</h2><p>${escapeHtml(categoryCopy?.[3] || t("learnDesc"))}</p></div></section>
      <div class="sectionHead"><div><h2>${escapeHtml(t("courses"))}</h2><p>${escapeHtml(t("continue"))}</p></div></div>
      <div class="cardList">${visibleCourses.map((item) => courseCard(item, item.access === "subscriber" && !active)).join("") || `<div class="empty">${escapeHtml(t("noItems"))}</div>`}</div>`;
    document.getElementById("academyBack").onclick = renderLearn;
    content.querySelectorAll("[data-course]").forEach((button) => button.onclick = () => {
      const item = state.courseCatalog.find((course) => course.id === button.dataset.course);
      if (button.dataset.locked === "true") return showLockedInfo(item);
      if (item?.link) return openUrl(item.link);
      openCourse(button.dataset.course);
    });
  }

  function courseCard(item, locked) {
    const progress = getProgress(item.id);
    return `<article class="itemCard"><div class="itemTop"><div class="itemIcon">${item.icon || "🎓"}</div><div><h3>${escapeHtml(localized(item.title))}</h3><p>${escapeHtml(localized(item.description))}</p><div class="meta"><span class="chip">${escapeHtml(item.access === "free" ? t("freeCourse") : t("subscriberExperiences"))}</span></div></div></div><div class="progressTrack"><span style="width:${Math.min(100, progress * 6.67)}%"></span></div><div class="cardActions"><button class="${locked ? "secondaryButton lockedButton" : "primaryButton"}" data-course="${item.id}" data-locked="${locked}">${escapeHtml(locked ? t("locked") : t("openCourse"))}</button><button class="secondaryButton" data-course="${item.id}" data-locked="${locked}">${escapeHtml(t("chapters"))}</button></div></article>`;
  }

  async function openCourse(courseId) {
    content.innerHTML = loadingCard();
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
      const data = await api("/api/hub/course", { token: state.token, courseId });
      state.currentCourse = data.course;
      try { localStorage.setItem(courseCacheKey(courseId), JSON.stringify(data.course)); } catch {}
      state.currentLesson = Math.min(getProgress(courseId), Math.max(0, data.course.lessons.length - 1));
      renderCourseIndex();
    } catch (error) {
      try {
        const cached = JSON.parse(localStorage.getItem(courseCacheKey(courseId)) || "null");
        const meta = state.courseCatalog.find((item) => item.id === courseId);
        if (cached && (meta?.access === "free" || state.profile.active)) {
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
    const course = state.currentCourse;
    const courseMeta = state.courseCatalog.find((item) => item.id === course.id);
    const completed = getProgress(course.id);
    const percent = course.lessons.length ? Math.round((Math.min(completed + 1, course.lessons.length) / course.lessons.length) * 100) : 0;
    const visual = `<div class="courseVisual"><span>📚 ${escapeHtml(t("continueLearning"))}</span><span>✅ ${percent}%</span><span>💾 ${escapeHtml(t("catalogOffline"))}</span></div>`;
    const calculatorButton = course.id === "marketing_rede_educashpro" ? `<button id="openProjection" class="wideButton" style="margin-top:14px">📊 ${escapeHtml(t("projection"))}</button>` : "";
    const cover = courseMeta?.image ? `<img class="courseCover" src="${escapeHtml(freshAssetUrl(courseMeta.image))}" alt="${escapeHtml(course.title)}">` : "";
    const themeClass = course.theme === "exness" ? " technicalCourse" : "";
    content.innerHTML = `<div class="${themeClass.trim()}"><button id="courseBack" class="textButton">← ${escapeHtml(t("back"))}</button><section class="courseHero">${cover}<span class="eyebrow">${escapeHtml(t("chapters"))}</span><h2>${escapeHtml(course.title)}</h2><div class="lessonBody">${course.home}</div>${visual}<div class="progressTrack"><span style="width:${percent}%"></span></div>${calculatorButton}</section><div class="sectionHead"><div><h2>${escapeHtml(t("chapters"))}</h2></div></div><div class="cardList">${course.chapters.map((ch) => `<article class="chapter"><button data-chapter="${ch.id}"><span>${escapeHtml(ch.title)}</span><span>›</span></button></article>`).join("")}</div>${course.books?.length ? `<div class="sectionHead"><div><h2>${escapeHtml(t("books"))}</h2></div></div><div class="cardList">${course.books.map((book) => `<button class="secondaryButton" data-book="${escapeHtml(book.url)}">${escapeHtml(book.text)}</button>`).join("")}</div>` : ""}${renderCoursePartnerCta(course)}</div>`;
    document.getElementById("courseBack").onclick = renderLearn;
    content.querySelectorAll("[data-chapter]").forEach((button) => button.onclick = () => {
      const index = course.lessons.findIndex((lesson) => Number(lesson.ch) === Number(button.dataset.chapter));
      if (index >= 0) renderLesson(index);
    });
    content.querySelectorAll("[data-book]").forEach((button) => button.onclick = () => openUrl(button.dataset.book));
    document.getElementById("openProjection")?.addEventListener("click", renderNetworkProjection);
    bindCoursePartnerAction();
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

  async function renderExplore() {
    content.innerHTML = `<section class="hero"><span class="eyebrow">DISCOVERY</span><h1>${escapeHtml(t("exploreTitle"))}</h1><p>${escapeHtml(t("exploreDesc"))}</p></section>${filterBar()}<div id="directoryList">${loadingCard()}</div>`;
    bindFilters();
    await loadDirectory();
  }

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
    container.innerHTML = loadingCard();
    try {
      const data = await api("/api/hub/directory", { token: state.token, page: state.directoryPage, type: state.directoryType });
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

  function renderSubmissionForm(kind) {
    if (!state.profile?.active) return openSubscription();
    const title = fc(kind);
    const common = field("description", fc("description"), "textarea") + field("destinationUrl", fc("url"));
    const fields = kind === "project"
      ? field("name", fc("name")) + field("type", fc("type"), "select", true, [["group", "Grupo / Group"], ["channel", "Canal / Channel"], ["bot", "Bot"], ["page", "Site / Page"]]) + field("category", fc("category")) + common
      : kind === "benefit"
        ? field("name", fc("name")) + common
        : field("companyName", fc("company")) + field("segment", fc("segment"), "select", true, partnerSegmentOptions()) + common + field("discountRange", fc("discount")) + field("discountRules", fc("rules"), "textarea") + field("storeType", fc("storeType"), "select", true, [["physical", "Físico / Physical"], ["online", "Online"], ["both", "Ambos / Both"]]) + field("city", fc("city"), "input", false) + field("region", fc("region"), "input", false) + field("contact", fc("contact"), "input", false) + field("affiliateLink", fc("affiliate"), "input", false);
    content.innerHTML = `<button id="formBack" class="textButton">← ${escapeHtml(fc("back"))}</button><section class="hero"><span class="eyebrow">EDUCASHPRO</span><h1>${escapeHtml(title)}</h1><p>${escapeHtml(t("benefitsDesc"))}</p></section><section class="creatorReferralNotice compact"><span>🔗</span><div><h2>${escapeHtml(featureCopy("creatorReferralTitle"))}</h2><p>${escapeHtml(featureCopy("creatorReferralText"))}</p></div></section><form id="submissionForm" class="toolCard"><div class="fieldGrid">${fields}${field("language", fc("language"), "select", true, [["pt", "Português"], ["en", "English"], ["es", "Español"], ["ru", "Русский"]])}</div><button id="submitForm" class="wideButton" type="submit" style="margin-top:14px">${escapeHtml(fc("save"))}</button></form>`;
    document.getElementById("language").value = state.language;
    document.getElementById("formBack").onclick = kind === "project" ? renderArea : kind === "partner" ? renderPartnerStores : renderExclusiveBenefits;
    document.getElementById("submissionForm").onsubmit = async (event) => {
      event.preventDefault();
      const values = Object.fromEntries(Array.from(event.currentTarget.querySelectorAll("input,textarea,select")).map((el) => [el.id, el.value.trim()]));
      const button = document.getElementById("submitForm"); button.disabled = true; button.textContent = fc("saving");
      try { await api("/api/hub/submit", { token: state.token, kind, ...values }); state.projects = state.benefits = state.partners = null; showToast(fc("sent")); kind === "project" ? await renderArea() : kind === "partner" ? await renderPartnerStores() : await renderExclusiveBenefits(); }
      catch (error) { handleError(error); button.disabled = false; button.textContent = fc("save"); }
    };
  }

  async function removeOwnItem(kind, id) {
    if (!window.confirm(fc("confirmRemove"))) return;
    try { await api("/api/hub/delete", { token: state.token, kind, id }); state.projects = null; showToast(fc("removed")); await renderArea(); }
    catch { showToast(fc("deleteError")); }
  }

  async function renderBenefits() {
    content.innerHTML = `<section class="hero"><span class="eyebrow">CLUB</span><h1>${escapeHtml(t("benefitsTitle"))}</h1><p>${escapeHtml(t("benefitsDesc"))}</p></section><div class="sectionHead"><div><h2>${escapeHtml(t("yourSpace"))}</h2></div></div><section class="quickGrid">${quickCard("exclusive-benefits", "🎁", benefitNavigationCopy("exclusive"), benefitNavigationCopy("exclusiveSub"))}${quickCard("partner-stores", "🏪", benefitNavigationCopy("stores"), benefitNavigationCopy("storesSub"))}</section>`;
    content.querySelector('[data-target="exclusive-benefits"]').onclick = () => state.profile?.active ? renderExclusiveBenefits() : openSubscription();
    content.querySelector('[data-target="partner-stores"]').onclick = () => state.profile?.active ? renderPartnerStores() : openSubscription();
  }

  async function renderExclusiveBenefits() {
    state.view = "benefits";
    updateNav();
    window.scrollTo({ top: 0, behavior: "smooth" });
    content.innerHTML = `<button id="benefitsBack" class="textButton">← ${escapeHtml(t("back"))}</button><section class="hero"><span class="eyebrow">CLUB</span><h1>🎁 ${escapeHtml(benefitNavigationCopy("exclusive"))}</h1><p>${escapeHtml(benefitNavigationCopy("exclusiveSub"))}</p></section><article class="benefitOffer"><div><span>🎁</span><h2>${escapeHtml(featureCopy("offerBenefit"))}</h2><p>${escapeHtml(featureCopy("offerBenefitDesc"))}</p></div><button id="offerBenefit" class="secondaryButton">${escapeHtml(featureCopy("offerBenefit"))}</button></article><div id="benefitList" class="cardList" style="margin-top:14px">${loadingCard()}</div>`;
    document.getElementById("benefitsBack").onclick = renderBenefits;
    document.getElementById("offerBenefit").onclick = () => renderSubmissionForm("benefit");
    const container = document.getElementById("benefitList");
    try {
      const data = await api("/api/hub/benefits", { token: state.token });
      state.benefits = data;
      container.innerHTML = data.items.length ? data.items.map((item) => `<article class="itemCard benefitCard"><div class="itemTop"><div class="itemIcon">🎁</div><div><h3>${escapeHtml(item.title)}</h3><p>${escapeHtml(item.description)}</p><div class="meta"><span class="chip freeChip">✓ ${escapeHtml(featureCopy("freeBenefit"))}</span></div></div></div><div class="providerLine"><span>👤 <b>${escapeHtml(featureCopy("offeredBy"))}:</b> ${escapeHtml(item.offeredBy)}</span><span>🛡️ ${escapeHtml(featureCopy("reviewed"))}</span></div><div class="cardActions" style="grid-template-columns:1fr"><button class="${item.locked ? "secondaryButton lockedButton" : "primaryButton"}" data-benefit="${escapeHtml(item.url)}" data-locked="${item.locked}">${escapeHtml(item.locked ? t("unlock") : featureCopy("accessBenefit"))}</button></div></article>`).join("") : `<div class="empty">${escapeHtml(t("noItems"))}</div>`;
      container.querySelectorAll("[data-benefit]").forEach((button) => button.onclick = () => button.dataset.locked === "true" ? openSubscription() : openUrl(button.dataset.benefit));
    } catch (error) { handleError(error, container); }
  }

  async function renderPartnerStores({ segment = state.partnerSegment, page = state.partnerPage } = {}) {
    state.view = "benefits";
    state.partnerSegment = PARTNER_SEGMENTS.includes(segment) ? segment : "";
    state.partnerPage = Math.max(1, Number(page || 1));
    updateNav();
    window.scrollTo({ top: 0, behavior: "smooth" });
    const filters = [["", partnerSegmentLabel("all")], ...partnerSegmentOptions()]
      .map(([value, label]) => `<button class="filter ${state.partnerSegment === value ? "active" : ""}" data-partner-segment="${escapeHtml(value)}">${escapeHtml(label)}</button>`)
      .join("");
    content.innerHTML = `<button id="partnersBack" class="textButton">← ${escapeHtml(t("back"))}</button><section class="hero"><span class="eyebrow">CLUB</span><h1>🏪 ${escapeHtml(benefitNavigationCopy("stores"))}</h1><p>${escapeHtml(benefitNavigationCopy("storesSub"))}</p></section><article class="benefitOffer"><div><span>🏪</span><h2>${escapeHtml(featureCopy("registerPartner"))}</h2><p>${escapeHtml(featureCopy("partnersDesc"))}</p></div><button id="registerPartner" class="secondaryButton">${escapeHtml(featureCopy("registerPartner"))}</button></article><div class="filters" style="margin-top:14px">${filters}</div><div id="partnerList" class="cardList" style="margin-top:14px">${loadingCard()}</div>`;
    document.getElementById("partnersBack").onclick = renderBenefits;
    document.getElementById("registerPartner").onclick = () => renderSubmissionForm("partner");
    content.querySelectorAll("[data-partner-segment]").forEach((button) => {
      button.onclick = () => renderPartnerStores({ segment: button.dataset.partnerSegment, page: 1 });
    });
    const partnerContainer = document.getElementById("partnerList");
    try {
      const data = await api("/api/hub/partners", { token: state.token, segment: state.partnerSegment, page: state.partnerPage });
      state.partners = data;
      const cards = data.items.length ? data.items.map((item) => `<article class="itemCard partnerCard"><div class="itemTop"><div class="itemIcon">🤝</div><div><h3>${escapeHtml(item.companyName)}</h3><p>${escapeHtml(item.description)}</p><div class="meta"><span class="chip">${escapeHtml(partnerSegmentLabel(item.segment))}</span><span class="chip freeChip">🏷️ ${escapeHtml(item.discountRange)}</span></div></div></div><div class="providerLine"><span>📋 <b>${escapeHtml(featureCopy("rules"))}:</b> ${escapeHtml(item.discountRules)}</span><span>👤 ${escapeHtml(featureCopy("offeredBy"))}: ${escapeHtml(item.ownerName)}</span><span>🛡️ ${escapeHtml(featureCopy("reviewed"))}</span></div><div class="cardActions" style="grid-template-columns:1fr"><button class="${item.locked ? "secondaryButton lockedButton" : "primaryButton"}" data-partner="${escapeHtml(item.destinationUrl)}" data-locked="${item.locked}">📍 ${escapeHtml(item.locked ? t("unlock") : featureCopy("location"))}</button></div></article>`).join("") : `<div class="empty">${escapeHtml(t("noItems"))}</div>`;
      const pager = data.page > 1 || data.hasMore ? `<div class="pager"><button id="partnerPrev" ${data.page <= 1 ? "disabled" : ""}>← ${escapeHtml(t("previous"))}</button><span>${escapeHtml(t("page"))} ${data.page}</span><button id="partnerNext" ${!data.hasMore ? "disabled" : ""}>${escapeHtml(t("next"))} →</button></div>` : "";
      partnerContainer.innerHTML = cards + pager;
      partnerContainer.querySelectorAll("[data-partner]").forEach((button) => button.onclick = () => button.dataset.locked === "true" ? openSubscription() : openUrl(button.dataset.partner));
      document.getElementById("partnerPrev")?.addEventListener("click", () => renderPartnerStores({ segment: state.partnerSegment, page: data.page - 1 }));
      document.getElementById("partnerNext")?.addEventListener("click", () => renderPartnerStores({ segment: state.partnerSegment, page: data.page + 1 }));
    } catch (error) { handleError(error, partnerContainer); }
  }

  async function renderArea() {
    const p = state.profile;
    const areaLabels = ({
      pt: ["Minha assinatura", "Status, validade e divulgação", "Minhas ferramentas", "Recursos gratuitos para sua presença digital", "Comunidade e suporte", "Meus cadastros", "Projetos enviados para avaliação"],
      en: ["My subscription", "Status, validity and promotion", "My tools", "Free resources for your digital presence", "Community and support", "My submissions", "Projects submitted for review"],
      es: ["Mi suscripción", "Estado, vigencia y divulgación", "Mis herramientas", "Recursos gratuitos para tu presencia digital", "Comunidad y soporte", "Mis registros", "Proyectos enviados para evaluación"],
      ru: ["Моя подписка", "Статус, срок и продвижение", "Мои инструменты", "Бесплатные ресурсы для цифрового присутствия", "Сообщество и поддержка", "Мои заявки", "Проекты, отправленные на проверку"],
    })[state.language] || ["Minha assinatura", "Status, validade e divulgação", "Minhas ferramentas", "Recursos gratuitos para sua presença digital", "Comunidade e suporte", "Meus cadastros", "Projetos enviados para avaliação"];
    const linkPageTitle = window.EduCashProLinks?.text?.("pageTitle") || "Minha página de links";
    const linkPageSubtitle = window.EduCashProLinks?.text?.("pageCardSub") || "Reúna seus links em uma página personalizada";
    const smartLinkTitle = window.EduCashProLinks?.text?.("shortTitle") || "Link Inteligente";
    const smartLinkSubtitle = window.EduCashProLinks?.text?.("shortCardSub") || "Crie um endereço curto com sua chamada";
    content.innerHTML = `<section class="profileCard"><div class="avatar">${escapeHtml((p.firstName || "E").slice(0, 1).toUpperCase())}</div><h2>${escapeHtml(p.firstName || t("member"))}</h2><p>${escapeHtml(t("member"))}</p><span class="statusPill ${p.active ? "" : "inactive"}">${escapeHtml(p.active ? t("active") : t("inactive"))}${p.activeUntil ? ` · ${escapeHtml(t("validUntil"))} ${formatDate(p.activeUntil)}` : ""}</span>${p.active && state.affiliateLink ? `<div class="affiliateBox">${escapeHtml(state.affiliateLink)}</div><div class="cardActions"><button id="copyLink" class="secondaryButton">${escapeHtml(t("copy"))}</button><button id="affiliateQr" class="secondaryButton">🔳 ${escapeHtml(featureCopy("affiliateQr"))}</button></div>` : ""}${state.membershipCredential ? `<button id="membershipProof" class="wideButton" style="margin-top:10px">✅ ${escapeHtml(featureCopy("activeProof"))}</button>` : ""}</section><div class="sectionHead"><div><h2>${escapeHtml(t("tools"))}</h2><p>${escapeHtml(t("toolsSub"))}</p></div></div><section class="quickGrid"><button id="areaLinkPage" class="quickCard"><span class="emoji">🔗</span><strong>${escapeHtml(linkPageTitle)}</strong><small>${escapeHtml(linkPageSubtitle)}</small><span class="freeAccessBadge">${escapeHtml(window.EduCashProLinks?.text?.("free") || "ACESSO LIVRE")}</span></button><button id="areaSmartLink" class="quickCard"><span class="emoji">✂️</span><strong>${escapeHtml(smartLinkTitle)}</strong><small>${escapeHtml(smartLinkSubtitle)}</small><span class="freeAccessBadge">${escapeHtml(window.EduCashProLinks?.text?.("free") || "ACESSO LIVRE")}</span></button></section><div class="sectionHead"><div><h2>${escapeHtml(t("officialCommunity"))}</h2><p>${escapeHtml(t("officialCommunitySub"))}</p></div></div><div class="cardList"><article class="itemCard"><div class="itemTop"><div class="itemIcon">📢</div><div><h3>${escapeHtml(t("officialChannel"))}</h3><p>${escapeHtml(t("officialChannelSub"))}</p></div></div><div class="cardActions" style="grid-template-columns:1fr"><button class="primaryButton" data-official-url="${OFFICIAL_CHANNEL_URL}">${escapeHtml(t("openTelegram"))}</button></div></article><article class="itemCard"><div class="itemTop"><div class="itemIcon">👥</div><div><h3>${escapeHtml(t("officialGroup"))}</h3><p>${escapeHtml(t("officialGroupSub"))}</p></div></div><div class="cardActions" style="grid-template-columns:1fr"><button class="primaryButton" data-official-url="${OFFICIAL_GROUP_URL}">${escapeHtml(t("openTelegram"))}</button></div></article></div><div class="sectionHead"><div><h2>${escapeHtml(t("myProjects"))}</h2></div><button id="manageProjects" class="textButton">${escapeHtml(t("openBot"))}</button></div><div id="projectList" class="cardList">${loadingCard()}</div>${!p.active ? `<button id="reactivate" class="wideButton" style="margin-top:16px">⚡ ${escapeHtml(t("reactivate"))}</button>` : ""}`;
    const profileHeading = document.createElement("div");
    profileHeading.className = "sectionHead areaFirstHead";
    profileHeading.innerHTML = `<div><h2>${escapeHtml(areaLabels[0])}</h2><p>${escapeHtml(areaLabels[1])}</p></div>`;
    content.prepend(profileHeading);
    const sectionHeads = content.querySelectorAll(".sectionHead");
    if (sectionHeads[1]) sectionHeads[1].innerHTML = `<div><h2>${escapeHtml(areaLabels[2])}</h2><p>${escapeHtml(areaLabels[3])}</p></div>`;
    if (sectionHeads[2]) sectionHeads[2].querySelector("h2").textContent = areaLabels[4];
    if (sectionHeads[3]) {
      sectionHeads[3].querySelector("h2").textContent = areaLabels[5];
      const detail = document.createElement("p");
      detail.textContent = areaLabels[6];
      sectionHeads[3].querySelector("div")?.appendChild(detail);
    }
    document.getElementById("copyLink")?.addEventListener("click", copyAffiliate);
    document.getElementById("affiliateQr")?.addEventListener("click", () => renderQrScreen(state.affiliateLink, featureCopy("affiliateQr"), renderArea));
    document.getElementById("membershipProof")?.addEventListener("click", renderMembershipProof);
    document.getElementById("areaLinkPage")?.addEventListener("click", () => window.EduCashProLinks?.renderPageEditor?.());
    document.getElementById("areaSmartLink")?.addEventListener("click", () => window.EduCashProLinks?.renderShortener?.());
    document.getElementById("manageProjects").textContent = fc("project");
    document.getElementById("manageProjects").onclick = () => renderSubmissionForm("project");
    document.getElementById("reactivate")?.addEventListener("click", openSubscription);
    content.querySelectorAll("[data-official-url]").forEach((button) => button.onclick = () => openUrl(button.dataset.officialUrl));
    const container = document.getElementById("projectList");
    try {
      const data = state.projects || await api("/api/hub/projects", { token: state.token });
      state.projects = data;
      container.innerHTML = data.items.length ? data.items.map((item) => `<article class="itemCard"><div class="itemTop"><div class="itemIcon">${typeIcon(item.type)}</div><div><h3>${escapeHtml(item.name)}</h3><p>${escapeHtml(item.description)}</p><div class="meta"><span class="chip">${escapeHtml(item.status)}</span></div></div></div><div class="cardActions">${item.url ? `<button class="secondaryButton" data-project-url="${escapeHtml(item.url)}">${escapeHtml(t("access"))}</button>` : ""}<button class="secondaryButton" data-delete-kind="${escapeHtml(item.kind || "project")}" data-delete-id="${escapeHtml(item.id)}">🗑️ ${escapeHtml(fc("remove"))}</button></div></article>`).join("") : `<div class="empty">${escapeHtml(t("noProjects"))}</div>`;
      container.querySelectorAll("[data-project-url]").forEach((button) => button.onclick = () => openUrl(button.dataset.projectUrl));
      container.querySelectorAll("[data-delete-id]").forEach((button) => button.onclick = () => removeOwnItem(button.dataset.deleteKind, button.dataset.deleteId));
    } catch (error) { handleError(error, container); }
  }

  function renderTools() {
    if (window.EduCashProLocal?.renderToolsHub) return window.EduCashProLocal.renderToolsHub();
    renderNetworkProjection();
  }

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
    element.innerHTML = "";
    if (!window.QRCode) { element.textContent = text; return; }
    new window.QRCode(element, { text, width: 240, height: 240, colorDark: "#07111f", colorLight: "#ffffff", correctLevel: window.QRCode.CorrectLevel.M });
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

  function scanMembershipQr() {
    const scannerText = {
      pt: "Aponte a câmera para o QR Code do assinante",
      en: "Point the camera at the subscriber's QR Code",
      es: "Apunta la cámara al código QR del suscriptor",
      ru: "Наведите камеру на QR-код подписчика",
    }[state.language] || "Aponte a câmera para o QR Code do assinante";
    if (!tg?.showScanQrPopup) {
      showToast({ pt: "Leitor disponível dentro do Telegram.", en: "Scanner available inside Telegram.", es: "Lector disponible dentro de Telegram.", ru: "Сканер доступен внутри Telegram." }[state.language]);
      return;
    }
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
  }

  function renderMembershipProof() {
    const credential = state.membershipCredential;
    const payload = decodeCredential(credential);
    if (!credential || !payload) return;
    const verificationUrl = `${window.location.origin}${window.location.pathname}?credential=${encodeURIComponent(credential)}&lang=${encodeURIComponent(state.language)}`;
    const scanLabel = { pt: "Ler QR Code", en: "Scan QR Code", es: "Leer código QR", ru: "Сканировать QR-код" }[state.language];
    content.innerHTML = `<button id="proofBack" class="textButton">← ${escapeHtml(t("back"))}</button><section class="profileCard qrCard"><span class="statusPill ${Number(payload.validUntil) > Date.now() / 1000 ? "" : "inactive"}">${escapeHtml(Number(payload.validUntil) > Date.now() / 1000 ? featureCopy("credentialActive") : featureCopy("credentialExpired"))}</span><h2>${escapeHtml(payload.name)}</h2><p>${escapeHtml(featureCopy("credentialUpdated"))}: ${escapeHtml(formatDate(payload.issuedAt))}</p><p>${escapeHtml(featureCopy("credentialUntil"))}: <b>${escapeHtml(formatDate(payload.validUntil))}</b></p><div id="proofQr" class="qrCanvas"></div><div class="qrActions"><button id="scanMembershipQr" class="wideButton">📷 ${escapeHtml(scanLabel)}</button></div><p>${escapeHtml(featureCopy("proofHelp"))}</p></section>`;
    createQr(document.getElementById("proofQr"), verificationUrl);
    document.getElementById("proofBack").onclick = renderArea;
    document.getElementById("scanMembershipQr").onclick = scanMembershipQr;
  }

  async function verifyMembershipCredential(credential, language, embedded = false) {
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
    if (embedded) document.getElementById("verificationBack").onclick = renderArea;
  }

  function loadingCard() { return `<div class="empty"><div class="loader" style="margin:auto"><span></span></div></div>`; }
  function handleError(error, target = content) { const message = error?.message === "SESSION" ? t("expires") : t("error"); target.innerHTML = `<div class="empty error">${escapeHtml(message)}</div>`; }

  function applyLanguage() {
    document.documentElement.lang = state.language;
    headerSubtitle.textContent = t("subtitle");
    document.querySelectorAll("[data-i18n]").forEach((el) => { el.textContent = t(el.dataset.i18n); });
  }

  function renderPublicLanding() {
    const browserLanguage = String(navigator.language || "pt").slice(0, 2).toLowerCase();
    const copies = {
      pt: ["Conhecimento e oportunidades organizados dentro do Telegram.", "Cursos, ferramentas digitais, benefícios, projetos e uma comunidade para aprender e desenvolver sua presença online.", "Aprenda", "Conteúdos organizados por tema.", "Utilize", "Ferramentas gratuitas no celular.", "Aproveite", "Benefícios e parceiros avaliados.", "Entrar no canal gratuito", "Para acessar sua conta e todos os recursos, abra o Mini App pelo botão do EduCashPro no Telegram.", "Jogos gratuitos", "Treine atenção e raciocínio lógico."],
      en: ["Knowledge and opportunities organized inside Telegram.", "Courses, digital tools, benefits, projects and a community to learn and grow your online presence.", "Learn", "Content organized by topic.", "Use", "Free tools on your phone.", "Benefit", "Reviewed benefits and partners.", "Join the free channel", "To access your account and all features, open the Mini App from the EduCashPro button in Telegram.", "Free games", "Train attention and logical thinking."],
      es: ["Conocimiento y oportunidades organizados dentro de Telegram.", "Cursos, herramientas digitales, beneficios, proyectos y una comunidad para aprender y desarrollar tu presencia en línea.", "Aprende", "Contenido organizado por tema.", "Utiliza", "Herramientas gratuitas en tu celular.", "Aprovecha", "Beneficios y socios evaluados.", "Entrar al canal gratuito", "Para acceder a tu cuenta y todos los recursos, abre la Mini App desde el botón de EduCashPro en Telegram.", "Juegos gratuitos", "Entrena atención y pensamiento lógico."],
      ru: ["Знания и возможности в удобном пространстве Telegram.", "Курсы, цифровые инструменты, преимущества, проекты и сообщество для обучения и развития в интернете.", "Учитесь", "Материалы по темам.", "Используйте", "Бесплатные инструменты в телефоне.", "Получайте", "Проверенные преимущества и партнёры.", "Войти в бесплатный канал", "Чтобы открыть аккаунт и все функции, запустите Mini App кнопкой EduCashPro в Telegram.", "Бесплатные игры", "Развивайте внимание и логику."],
    };
    const value = copies[browserLanguage] || copies.pt;
    document.documentElement.lang = browserLanguage === "pt" ? "pt-BR" : browserLanguage;
    content.innerHTML = `<section class="publicWelcome">
      <div class="publicWelcomeMark"><span>E</span></div>
      <span class="eyebrow">EDUCASHPRO</span>
      <h1>${escapeHtml(value[0])}</h1>
      <p>${escapeHtml(value[1])}</p>
      <div class="publicWelcomeGrid">
        <article><span>🎓</span><strong>${escapeHtml(value[2])}</strong><small>${escapeHtml(value[3])}</small></article>
        <article><span>🧰</span><strong>${escapeHtml(value[4])}</strong><small>${escapeHtml(value[5])}</small></article>
        <article><span>🎁</span><strong>${escapeHtml(value[6])}</strong><small>${escapeHtml(value[7])}</small></article>
      </div>
      <a class="publicTelegramButton" href="https://t.me/+1mP5ad7vJH5lOGNh">📚 ${escapeHtml(value[8])}</a>
      <button id="publicGames" class="publicGamesButton" type="button">🎮 <span><strong>${escapeHtml(value[10])}</strong><small>${escapeHtml(value[11])}</small></span></button>
      <small class="publicWelcomeHint">${escapeHtml(value[9])}</small>
    </section>`;
    document.getElementById("publicGames")?.addEventListener("click", () => window.EduCashProMentalGames?.renderCatalog?.({ public: true, lang: browserLanguage, back: renderPublicLanding }));
    bottomNav.classList.add("hidden");
  }

  async function init() {
    window.__EDUCASHPRO_APP_STARTED__ = true;
    try {
      tg?.ready?.();
      tg?.expand?.();
      if (window.__EDUCASHPRO_BOOT__) window.__EDUCASHPRO_BOOT__.telegramReady = Boolean(tg);
    } catch (error) {
      console.error("[EduCashPro] Falha ao confirmar inicialização do aplicativo:", error);
    }
    const publicParams = new URL(window.location.href).searchParams;
    if (await window.EduCashProLinks?.bootPublic?.(publicParams)) return;
    if (!tg?.initData && await window.EduCashProMentalGames?.bootPublic?.(publicParams)) return;
    const credentialToVerify = publicParams.get("credential");
    if (credentialToVerify) { await verifyMembershipCredential(credentialToVerify, publicParams.get("lang")); return; }
    document.getElementById("closeButton").onclick = () => tg?.close?.();
    document.querySelectorAll("[data-close-modal]").forEach((button) => button.onclick = closeModal);
    bottomNav.querySelectorAll("button[data-view]").forEach((button) => {
      button.addEventListener("click", () => navigateFromFooter(button));
    });

    if (!tg?.initData) {
      renderPublicLanding();
      return;
    }

    try {
      const session = await api("/api/hub/session", { initData: tg.initData });
      state.token = session.token;
      state.profile = session.profile;
      state.affiliateLink = session.affiliateLink;
      state.subscribeUrl = session.subscribeUrl || session.botUrl;
      state.referrerId = String(session.referrerId || "");
      state.planPriceUsdt = Number(session.planPriceUsdt || 12);
      state.botUrl = session.botUrl;
      window.EduCashProMentalGames?.setSession?.(session);
      if (await window.EduCashProMentalGames?.bootPublic?.(publicParams)) return;
      const receivedCredential = String(session.membershipCredential || "");
      const cachedCredential = String(localStorage.getItem("educashpro:membership-credential") || "");
      const receivedPayload = decodeCredential(receivedCredential);
      const cachedPayload = decodeCredential(cachedCredential);
      if (receivedCredential && Number(receivedPayload?.validUntil || 0) !== Number(cachedPayload?.validUntil || 0)) localStorage.setItem("educashpro:membership-credential", receivedCredential);
      state.membershipCredential = Number(cachedPayload?.validUntil || 0) === Number(receivedPayload?.validUntil || 0) && cachedCredential ? cachedCredential : receivedCredential;
      state.language = session.profile.language || "pt";
      const startParam = String(tg?.initDataUnsafe?.start_param || publicParams.get("tgWebAppStartParam") || "");
      if (startParam.startsWith("agenda_")) {
        openAgenda(startParam.slice(7));
        return;
      }
      await loadCourseCatalog();
      applyLanguage();
      bottomNav.classList.remove("hidden");
      renderHome();
      checkForUpdates();
    } catch (error) {
      content.innerHTML = `<section class="splash"><div class="splashLogo">E</div><h1>EduCashPro</h1><p class="error">${escapeHtml(error?.message === "SESSION" ? COPY.pt.telegramOnly : COPY.pt.error)}</p></section>`;
    }
  }

  document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "visible") checkForUpdates();
  });
  window.addEventListener("focus", checkForUpdates);
  document.addEventListener("DOMContentLoaded", init);
  window.EduCashProApp = { renderNetworkProjection, renderPresentation, renderPublicLanding, scanMembershipQr };
})();
