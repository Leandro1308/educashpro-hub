(function () {
  const tg = window.Telegram?.WebApp;
  const content = document.getElementById("content");
  const bottomNav = document.getElementById("bottomNav");
  const toast = document.getElementById("toast");
  const headerSubtitle = document.getElementById("headerSubtitle");
  const apiBaseFromUrl = String(new URL(window.location.href).searchParams.get("api") || "").replace(/\/+$/, "");
  const API_BASE = /^https:\/\//i.test(apiBaseFromUrl) ? apiBaseFromUrl : "";

  const state = {
    token: "",
    profile: null,
    affiliateLink: "",
    botUrl: "",
    language: "pt",
    view: "home",
    directoryPage: 1,
    directoryType: "",
    directoryData: null,
    benefits: null,
    projects: null,
    currentCourse: null,
    currentLesson: 0,
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
      all: "Todos", groups: "Grupos", channels: "Canais", bots: "Bots", pages: "Sites e páginas", access: "Acessar", rateAction: "Avaliar", noItems: "Nenhum item disponível.", previous: "Anterior", next: "Próxima", page: "Página", sample: "Você está vendo uma amostra. Reative para acessar o diretório completo.",
      benefitsTitle: "Clube de benefícios", benefitsDesc: "Vantagens selecionadas para os assinantes do EduCashPro.", unlock: "Reativar para liberar", openBenefit: "Acessar benefício",
      areaTitle: "Minha área", member: "Membro EduCashPro", affiliate: "Meu link de indicação", copy: "Copiar link", copied: "Link copiado", myProjects: "Meus projetos", noProjects: "Você ainda não cadastrou projetos.", openBot: "Abrir bot para gerenciar", expires: "A sessão expirou. Feche e abra novamente pelo bot.", telegramOnly: "Abra esta página pelo botão do EduCashPro dentro do Telegram.", error: "Não foi possível carregar. Tente novamente.", back: "Voltar", chapters: "Capítulos", lesson: "Aula", continue: "Continuar", books: "Livros recomendados", reactivate: "Reativar no bot", ratingPrompt: "Qual nota você dá?", ratingSaved: "Avaliação registrada!",
    },
    en: {
      subtitle: "Your universe in one place", loading: "Organizing your experience…", navHome: "Home", navLearn: "Learn", navExplore: "Explore", navBenefits: "Benefits", navArea: "My area", welcome: "Welcome", active: "Active subscription", inactive: "Inactive subscription", validUntil: "Valid until", heroActive: "Learn, discover opportunities and grow your digital presence.", heroInactive: "Explore EduCashPro and reactivate to unlock courses, benefits and full participation.", yourSpace: "Your space", yourSpaceSub: "Everything organized for you", courses: "Academy", coursesSub: "Courses and content", explore: "Explore", exploreSub: "Groups, channels, bots and pages", benefits: "Benefits", benefitsSub: "Exclusive advantages", tools: "Tools", toolsSub: "Calculators and challenges", projects: "My projects", projectsSub: "Track your publications", network: "Refer", networkSub: "Share your link", learnTitle: "EduCashPro Academy", learnDesc: "Organized, navigable learning without flooding the chat.", presentation: "Start here", presentationDesc: "Understand digital assets, Web3 and EduCashPro.", academy: "EduCashPro Academy", academyDesc: "Financial education, Telegram, Web3, network marketing and the new economy.", openCourse: "Open course", locked: "Active subscription required", toolsTitle: "Educational tools", interest: "Compound interest simulator", initial: "Initial value", monthly: "Monthly deposit", rate: "Monthly interest (%)", months: "Months", calculate: "Calculate", futureValue: "Projected value", quiz: "Financial challenge", quizQuestion: "Which option best represents an asset?", quizA: "A recurring expense", quizB: "Something that can generate value or income", quizC: "An impulse purchase", correct: "Great! You identified the concept.", wrong: "Almost. An asset can generate value or income.", exploreTitle: "Curated discovery", exploreDesc: "Choose a category and browse an organized list.", all: "All", groups: "Groups", channels: "Channels", bots: "Bots", pages: "Sites and pages", access: "Access", rateAction: "Rate", noItems: "No items available.", previous: "Previous", next: "Next", page: "Page", sample: "You are viewing a sample. Reactivate for the full directory.", benefitsTitle: "Benefits club", benefitsDesc: "Selected advantages for EduCashPro subscribers.", unlock: "Reactivate to unlock", openBenefit: "Access benefit", areaTitle: "My area", member: "EduCashPro member", affiliate: "My referral link", copy: "Copy link", copied: "Link copied", myProjects: "My projects", noProjects: "You have not submitted projects yet.", openBot: "Open bot to manage", expires: "Session expired. Close and reopen from the bot.", telegramOnly: "Open this page from the EduCashPro button inside Telegram.", error: "Unable to load. Please try again.", back: "Back", chapters: "Chapters", lesson: "Lesson", continue: "Continue", books: "Recommended books", reactivate: "Reactivate in bot", ratingPrompt: "What rating do you give?", ratingSaved: "Rating saved!",
    },
    es: {
      subtitle: "Tu universo en un solo lugar", loading: "Organizando tu experiencia…", navHome: "Inicio", navLearn: "Aprender", navExplore: "Explorar", navBenefits: "Beneficios", navArea: "Mi área", welcome: "Bienvenido", active: "Suscripción activa", inactive: "Suscripción inactiva", validUntil: "Válida hasta", heroActive: "Aprende, descubre oportunidades y desarrolla tu presencia digital.", heroInactive: "Explora EduCashPro y reactiva para liberar cursos, beneficios y participación completa.", yourSpace: "Tu espacio", yourSpaceSub: "Todo organizado para ti", courses: "Academy", coursesSub: "Cursos y contenidos", explore: "Explorar", exploreSub: "Grupos, canales, bots y páginas", benefits: "Beneficios", benefitsSub: "Ventajas exclusivas", tools: "Herramientas", toolsSub: "Calculadoras y desafíos", projects: "Mis proyectos", projectsSub: "Sigue tus publicaciones", network: "Invitar", networkSub: "Comparte tu enlace", learnTitle: "EduCashPro Academy", learnDesc: "Aprendizaje organizado y navegable sin llenar el chat.", presentation: "Empieza aquí", presentationDesc: "Comprende activos digitales, Web3 y EduCashPro.", academy: "EduCashPro Academy", academyDesc: "Educación financiera, Telegram, Web3, marketing de red y nueva economía.", openCourse: "Abrir curso", locked: "Requiere suscripción activa", toolsTitle: "Herramientas educativas", interest: "Simulador de interés compuesto", initial: "Valor inicial", monthly: "Aporte mensual", rate: "Interés mensual (%)", months: "Meses", calculate: "Calcular", futureValue: "Valor proyectado", quiz: "Desafío financiero", quizQuestion: "¿Qué opción representa mejor un activo?", quizA: "Un gasto recurrente", quizB: "Algo que puede generar valor o ingresos", quizC: "Una compra impulsiva", correct: "¡Muy bien! Identificaste el concepto.", wrong: "Casi. Un activo puede generar valor o ingresos.", exploreTitle: "Descubrimiento con curaduría", exploreDesc: "Elige una categoría y navega por una lista organizada.", all: "Todos", groups: "Grupos", channels: "Canales", bots: "Bots", pages: "Sitios y páginas", access: "Acceder", rateAction: "Evaluar", noItems: "No hay elementos disponibles.", previous: "Anterior", next: "Siguiente", page: "Página", sample: "Estás viendo una muestra. Reactiva para acceder al directorio completo.", benefitsTitle: "Club de beneficios", benefitsDesc: "Ventajas seleccionadas para suscriptores de EduCashPro.", unlock: "Reactiva para liberar", openBenefit: "Acceder al beneficio", areaTitle: "Mi área", member: "Miembro EduCashPro", affiliate: "Mi enlace de referido", copy: "Copiar enlace", copied: "Enlace copiado", myProjects: "Mis proyectos", noProjects: "Aún no registraste proyectos.", openBot: "Abrir bot para administrar", expires: "La sesión expiró. Cierra y abre nuevamente desde el bot.", telegramOnly: "Abre esta página desde el botón de EduCashPro dentro de Telegram.", error: "No fue posible cargar. Inténtalo de nuevo.", back: "Volver", chapters: "Capítulos", lesson: "Lección", continue: "Continuar", books: "Libros recomendados", reactivate: "Reactivar en el bot", ratingPrompt: "¿Qué nota das?", ratingSaved: "¡Evaluación registrada!",
    },
    ru: {
      subtitle: "Ваша вселенная в одном месте", loading: "Организуем ваш опыт…", navHome: "Главная", navLearn: "Учиться", navExplore: "Обзор", navBenefits: "Бонусы", navArea: "Мой раздел", welcome: "Добро пожаловать", active: "Подписка активна", inactive: "Подписка неактивна", validUntil: "Действует до", heroActive: "Учитесь, находите возможности и развивайте цифровое присутствие.", heroInactive: "Изучите EduCashPro и возобновите подписку, чтобы открыть курсы и преимущества.", yourSpace: "Ваше пространство", yourSpaceSub: "Всё организовано для вас", courses: "Academy", coursesSub: "Курсы и материалы", explore: "Обзор", exploreSub: "Группы, каналы, боты и страницы", benefits: "Преимущества", benefitsSub: "Эксклюзивные возможности", tools: "Инструменты", toolsSub: "Калькуляторы и задания", projects: "Мои проекты", projectsSub: "Следите за публикациями", network: "Пригласить", networkSub: "Поделиться ссылкой", learnTitle: "EduCashPro Academy", learnDesc: "Организованное обучение без множества сообщений в чате.", presentation: "Начните здесь", presentationDesc: "Цифровые активы, Web3 и EduCashPro.", academy: "EduCashPro Academy", academyDesc: "Финансовая грамотность, Telegram, Web3, сетевой маркетинг и новая экономика.", openCourse: "Открыть курс", locked: "Нужна активная подписка", toolsTitle: "Образовательные инструменты", interest: "Калькулятор сложного процента", initial: "Начальная сумма", monthly: "Ежемесячный взнос", rate: "Процент в месяц (%)", months: "Месяцы", calculate: "Рассчитать", futureValue: "Прогноз", quiz: "Финансовое задание", quizQuestion: "Что лучше всего описывает актив?", quizA: "Регулярный расход", quizB: "То, что может приносить ценность или доход", quizC: "Импульсивная покупка", correct: "Отлично! Вы определили понятие.", wrong: "Почти. Актив способен приносить ценность или доход.", exploreTitle: "Отобранные проекты", exploreDesc: "Выберите категорию и просматривайте удобный список.", all: "Все", groups: "Группы", channels: "Каналы", bots: "Боты", pages: "Сайты и страницы", access: "Открыть", rateAction: "Оценить", noItems: "Нет доступных элементов.", previous: "Назад", next: "Далее", page: "Страница", sample: "Вы видите образец. Возобновите подписку для полного каталога.", benefitsTitle: "Клуб преимуществ", benefitsDesc: "Отобранные преимущества для подписчиков EduCashPro.", unlock: "Возобновить", openBenefit: "Открыть преимущество", areaTitle: "Мой раздел", member: "Участник EduCashPro", affiliate: "Моя реферальная ссылка", copy: "Копировать", copied: "Ссылка скопирована", myProjects: "Мои проекты", noProjects: "У вас пока нет проектов.", openBot: "Открыть бот для управления", expires: "Сессия истекла. Закройте и откройте снова через бот.", telegramOnly: "Откройте страницу кнопкой EduCashPro внутри Telegram.", error: "Не удалось загрузить. Попробуйте снова.", back: "Назад", chapters: "Главы", lesson: "Урок", continue: "Продолжить", books: "Рекомендуемые книги", reactivate: "Возобновить в боте", ratingPrompt: "Какую оценку вы поставите?", ratingSaved: "Оценка сохранена!",
    },
  };

  function t(key) { return COPY[state.language]?.[key] || COPY.pt[key] || key; }
  function escapeHtml(value) { return String(value ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]); }
  function formatDate(epoch) { if (!epoch) return "—"; return new Date(Number(epoch) * 1000).toLocaleDateString(state.language === "pt" ? "pt-BR" : state.language); }
  function typeIcon(type) { return ({ group: "👥", channel: "📣", bot: "🤖", page: "🌐" })[type] || "✨"; }
  function showToast(message) { toast.textContent = message; toast.classList.add("show"); setTimeout(() => toast.classList.remove("show"), 2300); }
  function localKey(courseId) { return `educashpro:progress:${state.profile?.tgId || "guest"}:${courseId}`; }
  function getProgress(courseId) { return Math.max(0, Number(localStorage.getItem(localKey(courseId)) || 0)); }
  function saveProgress(courseId, index) { localStorage.setItem(localKey(courseId), String(Math.max(0, index))); }
  function openUrl(url) { if (!url) return; if (tg?.openLink) tg.openLink(url); else window.open(url, "_blank", "noopener"); }

  async function api(path, payload = {}) {
    const response = await fetch(`${API_BASE}${path}`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload), cache: "no-store" });
    const data = await response.json().catch(() => ({}));
    if (response.status === 401) throw new Error("SESSION");
    if (!response.ok) throw new Error(data.reason || "REQUEST");
    return data;
  }

  function updateNav() {
    bottomNav.querySelectorAll("button").forEach((button) => button.classList.toggle("active", button.dataset.view === state.view));
  }

  function setView(view) {
    state.view = view;
    updateNav();
    window.scrollTo({ top: 0, behavior: "smooth" });
    if (view === "home") renderHome();
    if (view === "learn") renderLearn();
    if (view === "explore") renderExplore();
    if (view === "benefits") renderBenefits();
    if (view === "area") renderArea();
  }

  function renderHome() {
    const p = state.profile;
    content.innerHTML = `
      <section class="hero">
        <span class="eyebrow">${escapeHtml(t("welcome"))}</span>
        <h1>${escapeHtml(p.firstName || "EduCashPro")}</h1>
        <p>${escapeHtml(p.active ? t("heroActive") : t("heroInactive"))}</p>
        <span class="statusPill ${p.active ? "" : "inactive"}">${p.active ? "●" : "○"} ${escapeHtml(p.active ? t("active") : t("inactive"))}</span>
      </section>
      <div class="sectionHead"><div><h2>${escapeHtml(t("yourSpace"))}</h2><p>${escapeHtml(t("yourSpaceSub"))}</p></div></div>
      <section class="quickGrid">
        ${quickCard("learn", "🎓", t("courses"), t("coursesSub"))}
        ${quickCard("explore", "🔎", t("explore"), t("exploreSub"))}
        ${quickCard("benefits", "🎁", t("benefits"), t("benefitsSub"))}
        ${quickCard("tools", "🧮", t("tools"), t("toolsSub"))}
        ${quickCard("area", "🚀", t("projects"), t("projectsSub"))}
        ${quickCard("share", "💰", t("network"), t("networkSub"))}
      </section>`;
    content.querySelectorAll("[data-target]").forEach((el) => el.onclick = () => {
      const target = el.dataset.target;
      if (target === "tools") renderTools(); else if (target === "share") copyAffiliate(); else setView(target);
    });
  }

  function quickCard(target, icon, title, sub) {
    return `<button class="quickCard" data-target="${target}"><span class="emoji">${icon}</span><strong>${escapeHtml(title)}</strong><small>${escapeHtml(sub)}</small></button>`;
  }

  function renderLearn() {
    const active = state.profile.active;
    content.innerHTML = `
      <section class="courseHero"><span class="eyebrow">ACADEMY</span><h2>${escapeHtml(t("learnTitle"))}</h2><p>${escapeHtml(t("learnDesc"))}</p></section>
      <div class="sectionHead"><div><h2>${escapeHtml(t("courses"))}</h2><p>${escapeHtml(t("continue"))}</p></div></div>
      <div class="cardList">
        ${courseCard("apresentacao", "🚀", t("presentation"), t("presentationDesc"), false)}
        ${courseCard("liberdade_financeira_assinantes", "🎓", t("academy"), t("academyDesc"), !active)}
      </div>
      <div class="sectionHead"><div><h2>${escapeHtml(t("toolsTitle"))}</h2></div></div>
      <button id="openTools" class="wideButton">🧮 ${escapeHtml(t("tools"))}</button>`;
    content.querySelectorAll("[data-course]").forEach((button) => button.onclick = () => {
      if (button.dataset.locked === "true") return openUrl(state.botUrl);
      openCourse(button.dataset.course);
    });
    document.getElementById("openTools").onclick = renderTools;
  }

  function courseCard(id, icon, title, description, locked) {
    const progress = getProgress(id);
    return `<article class="itemCard"><div class="itemTop"><div class="itemIcon">${icon}</div><div><h3>${escapeHtml(title)}</h3><p>${escapeHtml(description)}</p></div></div><div class="progressTrack"><span style="width:${Math.min(100, progress * 5)}%"></span></div><div class="cardActions"><button class="${locked ? "secondaryButton lockedButton" : "primaryButton"}" data-course="${id}" data-locked="${locked}">${escapeHtml(locked ? t("locked") : t("openCourse"))}</button><button class="secondaryButton" data-course="${id}" data-locked="${locked}">${escapeHtml(t("chapters"))}</button></div></article>`;
  }

  async function openCourse(courseId) {
    content.innerHTML = loadingCard();
    try {
      const data = await api("/api/hub/course", { token: state.token, courseId });
      state.currentCourse = data.course;
      state.currentLesson = Math.min(getProgress(courseId), Math.max(0, data.course.lessons.length - 1));
      renderCourseIndex();
    } catch (error) { handleError(error); }
  }

  function renderCourseIndex() {
    const course = state.currentCourse;
    const completed = getProgress(course.id);
    const percent = course.lessons.length ? Math.round((Math.min(completed + 1, course.lessons.length) / course.lessons.length) * 100) : 0;
    content.innerHTML = `<button id="courseBack" class="textButton">← ${escapeHtml(t("back"))}</button><section class="courseHero"><span class="eyebrow">${escapeHtml(t("chapters"))}</span><h2>${escapeHtml(course.title)}</h2><div class="lessonBody">${course.home}</div><div class="progressTrack"><span style="width:${percent}%"></span></div></section><div class="sectionHead"><div><h2>${escapeHtml(t("chapters"))}</h2></div></div><div class="cardList">${course.chapters.map((ch) => `<article class="chapter"><button data-chapter="${ch.id}"><span>${escapeHtml(ch.title)}</span><span>›</span></button></article>`).join("")}</div>${course.books?.length ? `<div class="sectionHead"><div><h2>${escapeHtml(t("books"))}</h2></div></div><div class="cardList">${course.books.map((book) => `<button class="secondaryButton" data-book="${escapeHtml(book.url)}">${escapeHtml(book.text)}</button>`).join("")}</div>` : ""}`;
    document.getElementById("courseBack").onclick = renderLearn;
    content.querySelectorAll("[data-chapter]").forEach((button) => button.onclick = () => {
      const index = course.lessons.findIndex((lesson) => Number(lesson.ch) === Number(button.dataset.chapter));
      if (index >= 0) renderLesson(index);
    });
    content.querySelectorAll("[data-book]").forEach((button) => button.onclick = () => openUrl(button.dataset.book));
  }

  function renderLesson(index) {
    const course = state.currentCourse;
    const lesson = course.lessons[index];
    if (!lesson) return renderCourseIndex();
    state.currentLesson = index;
    saveProgress(course.id, Math.max(getProgress(course.id), index));
    const chapter = course.chapters.find((item) => Number(item.id) === Number(lesson.ch));
    content.innerHTML = `<button id="lessonBack" class="textButton">← ${escapeHtml(t("chapters"))}</button><article class="itemCard lesson"><span class="eyebrow">${escapeHtml(t("lesson"))} ${lesson.part}/${lesson.totalParts}</span><h3>${escapeHtml(chapter?.title || course.title)}</h3><div class="lessonBody">${lesson.body}</div><div class="lessonNav"><button id="prevLesson" class="secondaryButton" ${index <= 0 ? "disabled" : ""}>← ${escapeHtml(t("previous"))}</button><button id="nextLesson" class="primaryButton" ${index >= course.lessons.length - 1 ? "disabled" : ""}>${escapeHtml(t("next"))} →</button></div></article>`;
    document.getElementById("lessonBack").onclick = renderCourseIndex;
    document.getElementById("prevLesson").onclick = () => renderLesson(index - 1);
    document.getElementById("nextLesson").onclick = () => renderLesson(index + 1);
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
      container.querySelectorAll("[data-rate]").forEach((button) => button.onclick = () => rateItem(button.dataset.rate));
      document.getElementById("prevPage").onclick = async () => { state.directoryPage -= 1; await loadDirectory(); };
      document.getElementById("nextPage").onclick = async () => { state.directoryPage += 1; await loadDirectory(); };
    } catch (error) { handleError(error, container); }
  }

  function directoryCard(item) {
    return `<article class="itemCard"><div class="itemTop"><div class="itemIcon">${typeIcon(item.type)}</div><div><h3>${escapeHtml(item.name)}</h3><p>${escapeHtml(item.description)}</p><div class="meta"><span class="chip">⭐ ${item.ratingCount ? `${item.ratingAvg} (${item.ratingCount})` : "—"}</span><span class="chip">${escapeHtml(item.category)}</span></div></div></div><div class="cardActions"><button class="primaryButton" data-access="${escapeHtml(item.url)}">🔗 ${escapeHtml(t("access"))}</button><button class="secondaryButton" data-rate="${item.id}">⭐ ${escapeHtml(t("rateAction"))}</button></div></article>`;
  }

  async function rateItem(communityId) {
    if (!state.profile.active) return openUrl(state.botUrl);
    const value = Number(window.prompt(`${t("ratingPrompt")} (1–5)`, "5"));
    if (!Number.isInteger(value) || value < 1 || value > 5) return;
    try { await api("/api/hub/rate", { token: state.token, communityId, rating: value }); showToast(t("ratingSaved")); await loadDirectory(); } catch (error) { handleError(error); }
  }

  async function renderBenefits() {
    content.innerHTML = `<section class="hero"><span class="eyebrow">CLUB</span><h1>${escapeHtml(t("benefitsTitle"))}</h1><p>${escapeHtml(t("benefitsDesc"))}</p></section><div id="benefitList" class="cardList" style="margin-top:14px">${loadingCard()}</div>`;
    const container = document.getElementById("benefitList");
    try {
      const data = state.benefits || await api("/api/hub/benefits", { token: state.token });
      state.benefits = data;
      container.innerHTML = data.items.length ? data.items.map((item) => `<article class="itemCard"><div class="itemTop"><div class="itemIcon">🎁</div><div><h3>${escapeHtml(item.title)}</h3><p>${escapeHtml(item.description)}</p><div class="meta"><span class="chip">${escapeHtml(item.category)}</span></div></div></div><div class="cardActions" style="grid-template-columns:1fr"><button class="${item.locked ? "secondaryButton lockedButton" : "primaryButton"}" data-benefit="${escapeHtml(item.url)}" data-locked="${item.locked}">${escapeHtml(item.locked ? t("unlock") : t("openBenefit"))}</button></div></article>`).join("") : `<div class="empty">${escapeHtml(t("noItems"))}</div>`;
      container.querySelectorAll("[data-benefit]").forEach((button) => button.onclick = () => button.dataset.locked === "true" ? openUrl(state.botUrl) : openUrl(button.dataset.benefit));
    } catch (error) { handleError(error, container); }
  }

  async function renderArea() {
    const p = state.profile;
    content.innerHTML = `<section class="profileCard"><div class="avatar">${escapeHtml((p.firstName || "E").slice(0, 1).toUpperCase())}</div><h2>${escapeHtml(p.firstName || t("member"))}</h2><p>${escapeHtml(t("member"))}</p><span class="statusPill ${p.active ? "" : "inactive"}">${escapeHtml(p.active ? t("active") : t("inactive"))}${p.activeUntil ? ` · ${escapeHtml(t("validUntil"))} ${formatDate(p.activeUntil)}` : ""}</span>${state.affiliateLink ? `<div class="affiliateBox">${escapeHtml(state.affiliateLink)}</div><button id="copyLink" class="wideButton" style="margin-top:10px">${escapeHtml(t("copy"))}</button>` : ""}</section><div class="sectionHead"><div><h2>${escapeHtml(t("myProjects"))}</h2></div><button id="manageProjects" class="textButton">${escapeHtml(t("openBot"))}</button></div><div id="projectList" class="cardList">${loadingCard()}</div>${!p.active ? `<button id="reactivate" class="wideButton" style="margin-top:16px">⚡ ${escapeHtml(t("reactivate"))}</button>` : ""}`;
    document.getElementById("copyLink")?.addEventListener("click", copyAffiliate);
    document.getElementById("manageProjects").onclick = () => openUrl(state.botUrl);
    document.getElementById("reactivate")?.addEventListener("click", () => openUrl(state.botUrl));
    const container = document.getElementById("projectList");
    try {
      const data = state.projects || await api("/api/hub/projects", { token: state.token });
      state.projects = data;
      container.innerHTML = data.items.length ? data.items.map((item) => `<article class="itemCard"><div class="itemTop"><div class="itemIcon">${typeIcon(item.type)}</div><div><h3>${escapeHtml(item.name)}</h3><p>${escapeHtml(item.description)}</p><div class="meta"><span class="chip">${escapeHtml(item.status)}</span><span class="chip">⭐ ${item.ratingAvg || "—"}</span></div></div></div>${item.url ? `<div class="cardActions" style="grid-template-columns:1fr"><button class="secondaryButton" data-project-url="${escapeHtml(item.url)}">${escapeHtml(t("access"))}</button></div>` : ""}</article>`).join("") : `<div class="empty">${escapeHtml(t("noProjects"))}</div>`;
      container.querySelectorAll("[data-project-url]").forEach((button) => button.onclick = () => openUrl(button.dataset.projectUrl));
    } catch (error) { handleError(error, container); }
  }

  function renderTools() {
    content.innerHTML = `<button id="toolsBack" class="textButton">← ${escapeHtml(t("back"))}</button><div class="sectionHead"><div><h2>${escapeHtml(t("toolsTitle"))}</h2></div></div><section class="toolGrid"><article class="toolCard"><h3>📈 ${escapeHtml(t("interest"))}</h3><div class="fieldGrid"><div class="field"><label>${escapeHtml(t("initial"))}</label><input id="initialValue" inputmode="decimal" value="1000"></div><div class="field"><label>${escapeHtml(t("monthly"))}</label><input id="monthlyValue" inputmode="decimal" value="100"></div><div class="field"><label>${escapeHtml(t("rate"))}</label><input id="rateValue" inputmode="decimal" value="1"></div><div class="field"><label>${escapeHtml(t("months"))}</label><input id="monthsValue" inputmode="numeric" value="24"></div></div><button id="calculateButton" class="wideButton" style="margin-top:12px">${escapeHtml(t("calculate"))}</button><div id="interestResult" class="resultBox hidden"></div></article><article class="toolCard"><h3>🧠 ${escapeHtml(t("quiz"))}</h3><p>${escapeHtml(t("quizQuestion"))}</p><button class="quizOption" data-answer="wrong">A. ${escapeHtml(t("quizA"))}</button><button class="quizOption" data-answer="correct">B. ${escapeHtml(t("quizB"))}</button><button class="quizOption" data-answer="wrong">C. ${escapeHtml(t("quizC"))}</button><div id="quizResult" class="resultBox hidden"></div></article></section>`;
    document.getElementById("toolsBack").onclick = () => setView("learn");
    document.getElementById("calculateButton").onclick = calculateInterest;
    content.querySelectorAll("[data-answer]").forEach((button) => button.onclick = () => { const result = document.getElementById("quizResult"); result.textContent = t(button.dataset.answer); result.classList.remove("hidden"); });
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

  function loadingCard() { return `<div class="empty"><div class="loader" style="margin:auto"><span></span></div></div>`; }
  function handleError(error, target = content) { const message = error?.message === "SESSION" ? t("expires") : t("error"); target.innerHTML = `<div class="empty error">${escapeHtml(message)}</div>`; }

  function applyLanguage() {
    document.documentElement.lang = state.language;
    headerSubtitle.textContent = t("subtitle");
    document.querySelectorAll("[data-i18n]").forEach((el) => { el.textContent = t(el.dataset.i18n); });
  }

  async function init() {
    tg?.ready?.();
    tg?.expand?.();
    document.getElementById("closeButton").onclick = () => tg?.close?.();
    bottomNav.querySelectorAll("button").forEach((button) => button.onclick = () => setView(button.dataset.view));

    if (!tg?.initData) {
      content.innerHTML = `<section class="splash"><div class="splashLogo">E</div><h1>EduCashPro</h1><p class="error">${escapeHtml(COPY.pt.telegramOnly)}</p></section>`;
      return;
    }

    try {
      const session = await api("/api/hub/session", { initData: tg.initData });
      state.token = session.token;
      state.profile = session.profile;
      state.affiliateLink = session.affiliateLink;
      state.botUrl = session.botUrl;
      state.language = session.profile.language || "pt";
      applyLanguage();
      bottomNav.classList.remove("hidden");
      renderHome();
    } catch (error) {
      content.innerHTML = `<section class="splash"><div class="splashLogo">E</div><h1>EduCashPro</h1><p class="error">${escapeHtml(error?.message === "SESSION" ? COPY.pt.telegramOnly : COPY.pt.error)}</p></section>`;
    }
  }

  document.addEventListener("DOMContentLoaded", init);
})();
