(function () {
  const COPY = {
    pt: {
      title: "Explore o EduCashPro",
      lead: "As mesmas áreas ficam disponíveis no celular e no computador. Entre na sua conta para usar os recursos pessoais.",
      presentation: "Conheça o EduCashPro", presentationSub: "Apresentação e visão geral da plataforma.",
      academy: "Academy", academySub: "Cursos e conteúdos organizados.",
      explore: "Explorar", exploreSub: "Grupos, canais, bots e páginas.",
      benefits: "Benefícios", benefitsSub: "Vantagens e empresas parceiras.",
      agenda: "Agenda Profissional", agendaSub: "Serviços, clientes e compromissos.",
      marketplace: "Marketplace", marketplaceSub: "Pesquise empresas e parceiros.",
      affiliate: "Meu Link", affiliateSub: "Acesse seu link de indicação.",
      publish: "Publicar", publishSub: "Divulgue seu projeto no EduCashPro.",
      support: "Suporte", supportSub: "Fale com a administração.",
      login: "Entre na sua conta para abrir este recurso.",
    },
    en: {
      title: "Explore EduCashPro", lead: "The same areas are available on mobile and desktop. Sign in to use personal features.",
      presentation: "Discover EduCashPro", presentationSub: "Platform overview and presentation.", academy: "Academy", academySub: "Organized courses and content.", explore: "Explore", exploreSub: "Groups, channels, bots and pages.", benefits: "Benefits", benefitsSub: "Advantages and partner businesses.", agenda: "Professional Schedule", agendaSub: "Services, clients and appointments.", marketplace: "Marketplace", marketplaceSub: "Search businesses and partners.", affiliate: "My Link", affiliateSub: "Access your referral link.", publish: "Publish", publishSub: "Share your project on EduCashPro.", support: "Support", supportSub: "Contact the administration.", login: "Sign in to open this feature.",
    },
    es: {
      title: "Explora EduCashPro", lead: "Las mismas áreas están disponibles en móvil y ordenador. Entra en tu cuenta para usar los recursos personales.",
      presentation: "Conoce EduCashPro", presentationSub: "Presentación general de la plataforma.", academy: "Academy", academySub: "Cursos y contenidos organizados.", explore: "Explorar", exploreSub: "Grupos, canales, bots y páginas.", benefits: "Beneficios", benefitsSub: "Ventajas y empresas asociadas.", agenda: "Agenda Profesional", agendaSub: "Servicios, clientes y compromisos.", marketplace: "Marketplace", marketplaceSub: "Busca empresas y socios.", affiliate: "Mi Enlace", affiliateSub: "Accede a tu enlace de referido.", publish: "Publicar", publishSub: "Divulga tu proyecto en EduCashPro.", support: "Soporte", supportSub: "Habla con la administración.", login: "Entra en tu cuenta para abrir este recurso.",
    },
    ru: {
      title: "Возможности EduCashPro", lead: "Одни и те же разделы доступны на телефоне и компьютере. Войдите в аккаунт для личных функций.",
      presentation: "О EduCashPro", presentationSub: "Обзор платформы.", academy: "Academy", academySub: "Курсы и материалы.", explore: "Обзор", exploreSub: "Группы, каналы, боты и страницы.", benefits: "Преимущества", benefitsSub: "Партнёры и специальные условия.", agenda: "Профессиональное расписание", agendaSub: "Услуги, клиенты и записи.", marketplace: "Marketplace", marketplaceSub: "Компании и партнёры.", affiliate: "Моя ссылка", affiliateSub: "Ваша реферальная ссылка.", publish: "Опубликовать", publishSub: "Разместить проект в EduCashPro.", support: "Поддержка", supportSub: "Связаться с администрацией.", login: "Войдите в аккаунт, чтобы открыть этот раздел.",
    },
  };

  function language() {
    const raw = String(navigator.language || "pt").toLowerCase();
    if (raw.startsWith("en")) return "en";
    if (raw.startsWith("es")) return "es";
    if (raw.startsWith("ru")) return "ru";
    return "pt";
  }

  function t(key) { return COPY[language()]?.[key] || COPY.pt[key] || key; }
  function esc(value) { return String(value ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]); }

  function injectStyle() {
    if (document.getElementById("webPublicParityStyle")) return;
    const style = document.createElement("style");
    style.id = "webPublicParityStyle";
    style.textContent = `
      .publicParity{margin-top:18px;text-align:left}.publicParity h2{margin:0 0 6px;font-size:22px}.publicParity>p{margin:0 0 14px;color:#9db0c6;line-height:1.45}.publicParityGrid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:10px}.publicParityCard{min-height:108px;padding:14px;border:1px solid rgba(255,255,255,.09);border-radius:17px;background:#102238;color:#f7fbff;text-decoration:none;text-align:left;cursor:pointer}.publicParityCard span{font-size:24px}.publicParityCard b{display:block;margin-top:7px;font-size:14px}.publicParityCard small{display:block;margin-top:4px;color:#9db0c6;line-height:1.35}.publicParityCard.public{border-color:rgba(48,230,166,.28)}.publicParityHint{min-height:20px;margin-top:10px;color:#30e6a6;font-size:12px;font-weight:700}@media(max-width:430px){.publicParityGrid{grid-template-columns:1fr 1fr}.publicParityCard{min-height:104px;padding:13px}}
    `;
    document.head.appendChild(style);
  }

  function askLogin() {
    const hint = document.getElementById("publicParityHint");
    if (hint) hint.textContent = t("login");
    const login = document.getElementById("webLoginButton");
    if (login) {
      login.scrollIntoView({ behavior: "smooth", block: "center" });
      window.setTimeout(() => login.click(), 220);
      return;
    }
    window.EduCashProWebEntry?.open?.();
  }

  function card(icon, key, subKey, action, isPublic = false) {
    return `<button type="button" class="publicParityCard${isPublic ? " public" : ""}" data-parity-action="${esc(action)}"><span>${icon}</span><b>${esc(t(key))}</b><small>${esc(t(subKey))}</small></button>`;
  }

  function render() {
    const landing = document.querySelector(".publicWelcome");
    if (!landing || document.getElementById("publicParity")) return;
    if (window.__EDUCASHPRO_WEB_HUB__?.active) return;

    injectStyle();
    const section = document.createElement("section");
    section.id = "publicParity";
    section.className = "publicParity";
    section.innerHTML = `
      <h2>${esc(t("title"))}</h2>
      <p>${esc(t("lead"))}</p>
      <div class="publicParityGrid">
        ${card("📘", "presentation", "presentationSub", "presentation", true)}
        ${card("🎓", "academy", "academySub", "login")}
        ${card("🔎", "explore", "exploreSub", "login")}
        ${card("🎁", "benefits", "benefitsSub", "login")}
        ${card("📅", "agenda", "agendaSub", "login")}
        ${card("🏪", "marketplace", "marketplaceSub", "marketplace", true)}
        ${card("🔗", "affiliate", "affiliateSub", "login")}
        ${card("➕", "publish", "publishSub", "login")}
        ${card("🆘", "support", "supportSub", "login")}
      </div>
      <div id="publicParityHint" class="publicParityHint"></div>
    `;

    const hint = landing.querySelector(".publicWelcomeHint");
    landing.insertBefore(section, hint || null);

    section.querySelectorAll("[data-parity-action]").forEach((button) => {
      button.addEventListener("click", () => {
        const action = button.dataset.parityAction;
        if (action === "presentation") {
          window.EduCashProApp?.renderPresentation?.();
          return;
        }
        if (action === "marketplace") {
          location.assign("./marketplace.html");
          return;
        }
        askLogin();
      });
    });
  }

  const observer = new MutationObserver(() => queueMicrotask(render));
  observer.observe(document.documentElement, { childList: true, subtree: true });
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", render, { once: true });
  else render();
})();
