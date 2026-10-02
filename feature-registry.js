(function () {
  const features = [
    { id:"academy", group:"learn", access:"mixed", icon:"🎓", label:{pt:"Academy",en:"Academy",es:"Academy",ru:"Academy"} },
    { id:"technical", group:"learn", access:"free", icon:"📈", label:{pt:"Bolsa, Análise Técnica e Price Action",en:"Markets, Technical Analysis and Price Action",es:"Bolsa, Análisis Técnico y Price Action",ru:"Рынки, теханализ и Price Action"} },
    { id:"financial", group:"learn", access:"mixed", icon:"💰", label:{pt:"Educação Financeira e Negócios",en:"Financial Education and Business",es:"Educación Financiera y Negocios",ru:"Финансовое образование и бизнес"} },
    { id:"telegram", group:"learn", access:"subscriber", icon:"✈️", label:{pt:"Telegram Profissional",en:"Professional Telegram",es:"Telegram Profesional",ru:"Профессиональный Telegram"} },
    { id:"tools", group:"tools", access:"mixed", icon:"🧰", label:{pt:"Ferramentas",en:"Tools",es:"Herramientas",ru:"Инструменты"} },
    { id:"finance-control", group:"tools", access:"subscriber", icon:"📒", label:{pt:"Controle Financeiro Mensal",en:"Monthly Finance Control",es:"Control Financiero Mensual",ru:"Ежемесячный финансовый контроль"} },
    { id:"games", group:"play", access:"mixed", icon:"🎮", label:{pt:"Jogos e desafios",en:"Games and challenges",es:"Juegos y desafíos",ru:"Игры и задания"} },
    { id:"explore", group:"discover", access:"mixed", icon:"🔎", label:{pt:"Explorar projetos",en:"Explore projects",es:"Explorar proyectos",ru:"Каталог проектов"} },
    { id:"benefits", group:"benefits", access:"mixed", icon:"🎁", label:{pt:"Benefícios",en:"Benefits",es:"Beneficios",ru:"Преимущества"} },
    { id:"marketplace", group:"benefits", access:"free", icon:"🏪", label:{pt:"Empresas parceiras",en:"Partner businesses",es:"Empresas asociadas",ru:"Партнёрские компании"} },
    { id:"professional", group:"business", access:"account", icon:"💼", label:{pt:"Perfil Profissional",en:"Professional Profile",es:"Perfil Profesional",ru:"Профессиональный профиль"} },
    { id:"links", group:"business", access:"account", icon:"🔗", label:{pt:"Página de Links",en:"Link Page",es:"Página de Enlaces",ru:"Страница ссылок"} },
    { id:"agenda", group:"business", access:"account", icon:"📅", label:{pt:"Agenda Profissional",en:"Professional Schedule",es:"Agenda Profesional",ru:"Профессиональный календарь"} },
    { id:"smart-link", group:"business", access:"account", icon:"✂️", label:{pt:"Link Inteligente",en:"Smart Link",es:"Enlace Inteligente",ru:"Умная ссылка"} },
    { id:"credential", group:"account", access:"account", icon:"🔳", label:{pt:"Credencial e QR Code",en:"Credential and QR Code",es:"Credencial y QR",ru:"Карта и QR-код"} },
    { id:"affiliate", group:"account", access:"active", icon:"🤝", label:{pt:"Programa de Afiliados",en:"Affiliate Program",es:"Programa de Afiliados",ru:"Партнёрская программа"} },
    { id:"network", group:"account", access:"account", icon:"📊", label:{pt:"Minha Rede",en:"My Network",es:"Mi Red",ru:"Моя сеть"} },
    { id:"subscription", group:"account", access:"account", icon:"💳", label:{pt:"Assinatura",en:"Subscription",es:"Suscripción",ru:"Подписка"} },
    { id:"support", group:"account", access:"account", icon:"💬", label:{pt:"Suporte",en:"Support",es:"Soporte",ru:"Поддержка"} },
    { id:"admin", group:"admin", access:"admin", icon:"🛠️", label:{pt:"Administração",en:"Administration",es:"Administración",ru:"Администрирование"} },
  ];

  const groups = {
    learn:{pt:"Aprenda",en:"Learn",es:"Aprende",ru:"Обучение"},
    tools:{pt:"Ferramentas",en:"Tools",es:"Herramientas",ru:"Инструменты"},
    play:{pt:"Jogos",en:"Games",es:"Juegos",ru:"Игры"},
    discover:{pt:"Explore",en:"Explore",es:"Explora",ru:"Каталог"},
    benefits:{pt:"Benefícios",en:"Benefits",es:"Beneficios",ru:"Преимущества"},
    business:{pt:"Construa sua presença",en:"Build your presence",es:"Construye tu presencia",ru:"Профессиональное присутствие"},
    account:{pt:"Sua conta",en:"Your account",es:"Tu cuenta",ru:"Ваш аккаунт"},
    admin:{pt:"Administração",en:"Administration",es:"Administración",ru:"Администрирование"},
  };

  function locale(value) {
    const raw = String(value || window.__EDUCASHPRO_SESSION__?.profile?.language || navigator.language || "pt").toLowerCase();
    if (raw.startsWith("en")) return "en";
    if (raw.startsWith("es")) return "es";
    if (raw.startsWith("ru")) return "ru";
    return "pt";
  }

  function localize(value, language) {
    if (!value || typeof value !== "object") return String(value || "");
    const lang = locale(language);
    return String(value[lang] || value.pt || Object.values(value)[0] || "");
  }

  function list(group) {
    return features.filter((item) => !group || item.group === group);
  }

  function get(id) {
    return features.find((item) => item.id === id) || null;
  }

  function canUse(feature, context = {}) {
    const item = typeof feature === "string" ? get(feature) : feature;
    if (!item) return false;
    if (item.access === "free" || item.access === "mixed") return true;
    if (item.access === "admin") return context.admin === true;
    if (item.access === "active" || item.access === "subscriber") return context.active === true;
    return context.account === true;
  }

  function badge(feature, language) {
    const item = typeof feature === "string" ? get(feature) : feature;
    const lang = locale(language);
    const copy = {
      pt:{free:"LIVRE",mixed:"LIVRE + ASSINANTE",subscriber:"ASSINANTE",active:"ASSINANTE ATIVO",account:"CONTA",admin:"ADMIN"},
      en:{free:"FREE",mixed:"FREE + SUBSCRIBER",subscriber:"SUBSCRIBER",active:"ACTIVE SUBSCRIBER",account:"ACCOUNT",admin:"ADMIN"},
      es:{free:"LIBRE",mixed:"LIBRE + SUSCRIPTOR",subscriber:"SUSCRIPTOR",active:"SUSCRIPTOR ACTIVO",account:"CUENTA",admin:"ADMIN"},
      ru:{free:"БЕСПЛАТНО",mixed:"БЕСПЛАТНО + ПОДПИСКА",subscriber:"ПОДПИСКА",active:"АКТИВНАЯ ПОДПИСКА",account:"АККАУНТ",admin:"ADMIN"},
    };
    return copy[lang]?.[item?.access] || String(item?.access || "");
  }

  window.EduCashProFeatures = {
    all: features,
    groups,
    list,
    get,
    canUse,
    label: (feature, language) => localize((typeof feature === "string" ? get(feature) : feature)?.label, language),
    groupLabel: (group, language) => localize(groups[group], language),
    badge,
  };
})();