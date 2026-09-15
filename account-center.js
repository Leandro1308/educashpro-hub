(function () {
  const API_BASE = "https://educashpro-all.onrender.com";
  const platform = window.EduCashProPlatform;
  const auth = window.EduCashProWebAuth;
  if (!platform?.isWeb?.() || !auth) return;

  let overview = null;
  let busy = false;

  const COPY = {
    pt: {
      button: "Minha conta",
      title: "Central EduCashPro",
      subtitle: "As mesmas funções da sua conta, no celular ou computador.",
      home: "Início",
      learn: "Aprender",
      explore: "Explorar",
      benefits: "Benefícios",
      publish: "Cadastrar projeto",
      affiliate: "Indicar EduCashPro",
      network: "Minha Rede",
      subscription: "Assinatura",
      agenda: "Agenda Profissional",
      projects: "Meus Projetos",
      language: "Idioma",
      preferences: "Preferências",
      settings: "Configurações",
      support: "Suporte",
      documents: "Sobre e Política de Uso",
      admin: "Admin",
      close: "Fechar",
      loading: "Carregando…",
      active: "Ativa",
      inactive: "Não ativa",
      validUntil: "Válida até",
      status: "Status",
      wallet: "Carteira",
      telegram: "Telegram",
      linked: "Vinculado",
      notLinked: "Não vinculado",
      approve: "Autorizar dispositivo",
      code: "Código de 6 dígitos",
      pairDevice: "Conectar otro dispositivo",
      pairDeviceTitle: "Autorizar nuevo dispositivo",
      pairDeviceText: "Introduce el código de 6 dígitos mostrado en el ordenador o móvil que deseas conectar a esta cuenta.",
      pairWorking: "Autorizando…",
      pairDevice: "Conectar outro dispositivo",
      pairDeviceTitle: "Autorizar novo dispositivo",
      pairDeviceText: "Digite o código de 6 dígitos exibido no computador ou celular que deseja conectar a esta conta.",
      pairWorking: "Autorizando…",
      networkTitle: "Minha Rede",
      directs: "Diretos ativos",
      unlocked: "Nível liberado",
      level: "Nível",
      next: "Próximo objetivo",
      missing: "Faltam {n} diretos ativos para liberar o Nível {l}.",
      allUnlocked: "Todos os 5 níveis estão liberados.",
      languageTitle: "Escolha o idioma",
      languageSaved: "Idioma atualizado.",
      preferencesTitle: "Preferências de comunicação",
      promotional: "Mensagens promocionais",
      promotionalHelp: "Controla a mesma preferência usada pelo Bot para comunicações promocionais.",
      enabled: "Ativadas",
      disabled: "Desativadas",
      enable: "Ativar mensagens promocionais",
      disable: "Desativar mensagens promocionais",
      preferencesSaved: "Preferência atualizada.",
      settingsTitle: "Configurações da conta",
      linkTelegram: "Vincular Telegram",
      adminTitle: "Administração",
      total: "Usuários",
      activeUsers: "Ativos",
      inactiveUsers: "Inativos",
      userMessages: "Mensagens dos usuários",
      readOnly: "Painel de consulta. Nenhuma função de pagamento ou ativação é executada aqui.",
      noPayment: "Pagamento e ativação continuam desativados nesta etapa.",
      error: "Não foi possível carregar agora.",
      authorized: "Dispositivo autorizado.",
      invalidCode: "Código inválido ou expirado.",
      accountStatus: "Conta EduCashPro",
      accountId: "ID interno",
      referral: "Código de indicação",
      webAccount: "Conta Web",
      connected: "Conectada",
      open: "Abrir",
    },
    en: {
      button: "My account",
      title: "EduCashPro Center",
      subtitle: "The same account features on mobile or desktop.",
      home: "Home",
      learn: "Learn",
      explore: "Explore",
      benefits: "Benefits",
      publish: "Submit project",
      affiliate: "Refer EduCashPro",
      network: "My Network",
      subscription: "Subscription",
      agenda: "Professional Schedule",
      projects: "My Projects",
      language: "Language",
      preferences: "Preferences",
      settings: "Settings",
      support: "Support",
      documents: "About and Usage Policy",
      admin: "Admin",
      close: "Close",
      loading: "Loading…",
      active: "Active",
      inactive: "Inactive",
      validUntil: "Valid until",
      status: "Status",
      wallet: "Wallet",
      telegram: "Telegram",
      linked: "Linked",
      notLinked: "Not linked",
      approve: "Authorize device",
      code: "6-digit code",
      pairDevice: "Connect another device",
      pairDeviceTitle: "Authorize new device",
      pairDeviceText: "Enter the 6-digit code shown on the computer or phone you want to connect to this account.",
      pairWorking: "Authorizing…",
      networkTitle: "My Network",
      directs: "Active direct referrals",
      unlocked: "Unlocked level",
      level: "Level",
      next: "Next goal",
      missing: "You need {n} more active direct referrals to unlock Level {l}.",
      allUnlocked: "All 5 levels are unlocked.",
      languageTitle: "Choose language",
      languageSaved: "Language updated.",
      preferencesTitle: "Communication preferences",
      promotional: "Promotional messages",
      promotionalHelp: "Controls the same preference used by the Bot for promotional communications.",
      enabled: "Enabled",
      disabled: "Disabled",
      enable: "Enable promotional messages",
      disable: "Disable promotional messages",
      preferencesSaved: "Preference updated.",
      settingsTitle: "Account settings",
      linkTelegram: "Link Telegram",
      adminTitle: "Administration",
      total: "Users",
      activeUsers: "Active",
      inactiveUsers: "Inactive",
      userMessages: "User messages",
      readOnly: "Read-only dashboard. No payment or subscription activation runs here.",
      noPayment: "Payment and activation remain disabled at this stage.",
      error: "Could not load right now.",
      authorized: "Device authorized.",
      invalidCode: "Invalid or expired code.",
      accountStatus: "EduCashPro account",
      accountId: "Internal ID",
      referral: "Referral code",
      webAccount: "Web account",
      connected: "Connected",
      open: "Open",
    },
    es: {
      button: "Mi cuenta",
      title: "Central EduCashPro",
      subtitle: "Las mismas funciones de tu cuenta en móvil u ordenador.",
      home: "Inicio",
      learn: "Aprender",
      explore: "Explorar",
      benefits: "Beneficios",
      publish: "Registrar proyecto",
      affiliate: "Indicar EduCashPro",
      network: "Mi Red",
      subscription: "Suscripción",
      agenda: "Agenda Profesional",
      projects: "Mis Proyectos",
      language: "Idioma",
      preferences: "Preferencias",
      settings: "Configuración",
      support: "Soporte",
      documents: "Acerca de y Política de Uso",
      admin: "Admin",
      close: "Cerrar",
      loading: "Cargando…",
      active: "Activa",
      inactive: "No activa",
      validUntil: "Válida hasta",
      status: "Estado",
      wallet: "Cartera",
      telegram: "Telegram",
      linked: "Vinculado",
      notLinked: "No vinculado",
      approve: "Autorizar dispositivo",
      code: "Código de 6 dígitos",
      networkTitle: "Mi Red",
      directs: "Directos activos",
      unlocked: "Nivel liberado",
      level: "Nivel",
      next: "Próximo objetivo",
      missing: "Faltan {n} directos activos para liberar el Nivel {l}.",
      allUnlocked: "Los 5 niveles están liberados.",
      languageTitle: "Elige el idioma",
      languageSaved: "Idioma actualizado.",
      preferencesTitle: "Preferencias de comunicación",
      promotional: "Mensajes promocionales",
      promotionalHelp: "Controla la misma preferencia utilizada por el Bot para comunicaciones promocionales.",
      enabled: "Activados",
      disabled: "Desactivados",
      enable: "Activar mensajes promocionales",
      disable: "Desactivar mensajes promocionales",
      preferencesSaved: "Preferencia actualizada.",
      settingsTitle: "Configuración de la cuenta",
      linkTelegram: "Vincular Telegram",
      adminTitle: "Administración",
      total: "Usuarios",
      activeUsers: "Activos",
      inactiveUsers: "Inactivos",
      userMessages: "Mensajes de usuarios",
      readOnly: "Panel de consulta. Aquí no se ejecutan pagos ni activaciones.",
      noPayment: "El pago y la activación siguen desactivados en esta etapa.",
      error: "No se pudo cargar ahora.",
      authorized: "Dispositivo autorizado.",
      invalidCode: "Código inválido o caducado.",
      accountStatus: "Cuenta EduCashPro",
      accountId: "ID interno",
      referral: "Código de referido",
      webAccount: "Cuenta Web",
      connected: "Conectada",
      open: "Abrir",
    },
    ru: {
      button: "Мой аккаунт",
      title: "Центр EduCashPro",
      subtitle: "Один и тот же аккаунт на телефоне и компьютере.",
      home: "Главная",
      learn: "Обучение",
      explore: "Обзор",
      benefits: "Преимущества",
      publish: "Добавить проект",
      affiliate: "Пригласить в EduCashPro",
      network: "Моя сеть",
      subscription: "Подписка",
      agenda: "Расписание",
      projects: "Мои проекты",
      language: "Язык",
      preferences: "Предпочтения",
      settings: "Настройки",
      support: "Поддержка",
      documents: "О сервисе и правила использования",
      admin: "Админ",
      close: "Закрыть",
      loading: "Загрузка…",
      active: "Активна",
      inactive: "Неактивна",
      validUntil: "Действует до",
      status: "Статус",
      wallet: "Кошелёк",
      telegram: "Telegram",
      linked: "Привязан",
      notLinked: "Не привязан",
      approve: "Разрешить устройство",
      code: "6-значный код",
      pairDevice: "Подключить другое устройство",
      pairDeviceTitle: "Разрешить новое устройство",
      pairDeviceText: "Введите 6-значный код с компьютера или телефона, который нужно подключить к этому аккаунту.",
      pairWorking: "Подтверждение…",
      networkTitle: "Моя сеть",
      directs: "Активные прямые",
      unlocked: "Открытый уровень",
      level: "Уровень",
      next: "Следующая цель",
      missing: "Нужно ещё {n} активных прямых для открытия уровня {l}.",
      allUnlocked: "Все 5 уровней открыты.",
      languageTitle: "Выберите язык",
      languageSaved: "Язык обновлён.",
      preferencesTitle: "Настройки сообщений",
      promotional: "Промо-сообщения",
      promotionalHelp: "Это та же настройка, которую использует бот для промо-сообщений.",
      enabled: "Включены",
      disabled: "Выключены",
      enable: "Включить промо-сообщения",
      disable: "Выключить промо-сообщения",
      preferencesSaved: "Настройка обновлена.",
      settingsTitle: "Настройки аккаунта",
      linkTelegram: "Привязать Telegram",
      adminTitle: "Администрирование",
      total: "Пользователи",
      activeUsers: "Активные",
      inactiveUsers: "Неактивные",
      userMessages: "Сообщения пользователей",
      readOnly: "Панель только для просмотра. Платежи и активации здесь не выполняются.",
      noPayment: "Платежи и активация на этом этапе остаются отключёнными.",
      error: "Сейчас не удалось загрузить.",
      authorized: "Устройство разрешено.",
      invalidCode: "Код недействителен или истёк.",
      accountStatus: "Аккаунт EduCashPro",
      accountId: "Внутренний ID",
      referral: "Реферальный код",
      webAccount: "Веб-аккаунт",
      connected: "Подключён",
      open: "Открыть",
    },
  };

  function session() {
    return platform.readWebSession?.() || null;
  }

  function lang() {
    const raw = String(session()?.profile?.language || navigator.language || "pt").toLowerCase();
    if (raw.startsWith("en")) return "en";
    if (raw.startsWith("es")) return "es";
    if (raw.startsWith("ru")) return "ru";
    return "pt";
  }

  function t(key) {
    return COPY[lang()]?.[key] || COPY.pt[key] || key;
  }

  function esc(value) {
    return String(value ?? "").replace(/[&<>"']/g, (char) => ({
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;",
    })[char]);
  }

  function formatDate(value) {
    if (!Number(value)) return "—";
    const seconds = Number(value);
    const ms = seconds >= 100000000000 ? seconds : seconds * 1000;
    try {
      const locale = lang() === "pt" ? "pt-BR" : lang();
      return new Intl.DateTimeFormat(locale, { dateStyle: "medium", timeStyle: "short" }).format(new Date(ms));
    } catch {
      return new Date(ms).toLocaleString();
    }
  }

  function replaceVars(text, vars) {
    let output = text;
    Object.entries(vars).forEach(([key, value]) => {
      output = output.replaceAll(`{${key}}`, String(value));
    });
    return output;
  }

  async function api(path, body = {}) {
    const token = session()?.token;
    if (!token) throw new Error("session_missing");
    const response = await fetch(`${API_BASE}${path}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
      cache: "no-store",
    });
    const data = await response.json().catch(() => ({}));
    if (!response.ok) throw new Error(data?.reason || `HTTP_${response.status}`);
    return data;
  }

  function styles() {
    if (document.getElementById("accountCenterStyles")) return;
    const style = document.createElement("style");
    style.id = "accountCenterStyles";
    style.textContent = `
      .accountCenterBtn{min-width:42px;height:42px;border:1px solid rgba(255,255,255,.1);border-radius:13px;background:#102238;color:#fff;font-size:20px;cursor:pointer}
      .accountCenterLayer{position:fixed;z-index:12000;inset:0;background:rgba(1,7,15,.72);backdrop-filter:blur(8px);display:grid;place-items:end center;padding:14px}
      .accountCenterSheet{width:min(100%,680px);max-height:90vh;overflow:auto;background:#0d1b2d;border:1px solid rgba(255,255,255,.1);border-radius:24px 24px 18px 18px;padding:18px;color:#f7fbff;box-shadow:0 25px 80px rgba(0,0,0,.5)}
      .accountCenterHead{display:flex;justify-content:space-between;gap:12px;align-items:flex-start}
      .accountCenterHead h2{margin:0;font-size:25px}.accountCenterHead p{margin:5px 0 0;color:#9db0c6}
      .accountCenterClose{border:0;background:transparent;color:#9db0c6;font-size:25px;cursor:pointer}
      .accountCenterGrid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:9px;margin-top:16px}
      .accountAction{min-height:88px;padding:14px;border:1px solid rgba(255,255,255,.09);border-radius:17px;background:#12243b;color:#f7fbff;text-align:left;cursor:pointer}
      .accountAction:hover{border-color:rgba(48,230,166,.35)}.accountAction span{font-size:24px}.accountAction b{display:block;margin-top:7px;font-size:14px}
      .accountAction.admin{border-color:rgba(48,230,166,.35)}
      .accountPanel{margin-top:14px;padding:16px;border-radius:18px;background:#102238}
      .accountPanel h3{margin:0 0 12px}.accountMetricGrid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:8px}
      .accountMetric{padding:12px;border-radius:13px;background:#081827;min-width:0}.accountMetric small{display:block;color:#9db0c6;margin-bottom:5px}.accountMetric b{font-size:17px;overflow-wrap:anywhere}
      .accountLevel{display:flex;justify-content:space-between;gap:10px;padding:10px 0;border-bottom:1px solid rgba(255,255,255,.07)}.accountLevel:last-child{border-bottom:0}
      .accountPrimary{width:100%;min-height:46px;border:0;border-radius:13px;background:#30e6a6;color:#061b15;font-weight:900;cursor:pointer}
      .accountSecondary{width:100%;min-height:44px;margin-top:8px;border:1px solid rgba(48,230,166,.25);border-radius:13px;background:transparent;color:#30e6a6;font-weight:800;cursor:pointer}
      .accountField{width:100%;box-sizing:border-box;min-height:44px;padding:0 12px;border:1px solid rgba(255,255,255,.12);border-radius:12px;background:#081827;color:#fff}
      .accountLangGrid{display:grid;grid-template-columns:repeat(2,1fr);gap:8px}.accountLangGrid button{min-height:45px;border:1px solid rgba(255,255,255,.1);border-radius:12px;background:#12243b;color:#fff;font-weight:800;cursor:pointer}
      .accountNote{color:#9db0c6;line-height:1.45;font-size:13px}.accountStatus{min-height:18px;margin-top:8px;color:#30e6a6;font-size:13px}
      .accountSwitchRow{display:flex;justify-content:space-between;align-items:center;gap:16px;padding:12px;border-radius:13px;background:#081827}.accountSwitchRow b{display:block}.accountSwitchRow small{display:block;color:#9db0c6;margin-top:4px;line-height:1.35}
      @media(max-width:430px){.accountCenterGrid{grid-template-columns:1fr 1fr}.accountCenterSheet{max-height:92vh;padding:16px}.accountAction{min-height:82px}}
    `;
    document.head.appendChild(style);
  }

  function close() {
    document.querySelector(".accountCenterLayer")?.remove();
  }

  function shell(inner = "") {
    styles();
    close();
    const layer = document.createElement("div");
    layer.className = "accountCenterLayer";
    layer.innerHTML = `
      <section class="accountCenterSheet">
        <div class="accountCenterHead">
          <div><h2>${esc(t("title"))}</h2><p>${esc(t("subtitle"))}</p></div>
          <button class="accountCenterClose" type="button" aria-label="${esc(t("close"))}">✕</button>
        </div>
        <div id="accountCenterBody">${inner}</div>
      </section>`;
    document.body.appendChild(layer);
    layer.querySelector(".accountCenterClose").onclick = close;
    layer.addEventListener("click", (event) => {
      if (event.target === layer) close();
    });
    return layer.querySelector("#accountCenterBody");
  }

  function nav(view) {
    close();
    const button = document.querySelector(`#bottomNav [data-view="${view}"]`);
    if (button) {
      button.click();
      return;
    }
    location.assign(`./index.html${view && view !== "home" ? `?view=${encodeURIComponent(view)}` : ""}`);
  }

  function page(url) {
    close();
    location.assign(url);
  }

  function affiliatePage() {
    const code=String(session()?.profile?.referralCode||"").trim().toUpperCase();
    const url=new URL("./affiliate.html",location.href);
    if(code)url.searchParams.set("ref",code);
    url.searchParams.set("lang",language());
    page(url.toString());
  }

  async function loadOverview(force = false) {
    if (overview && !force) return overview;
    overview = await api("/api/platform-account/overview");
    return overview;
  }

  function openDevicePairing() {
    const body = shell(`
      <div class="accountPanel">
        <h3>📱 ${esc(t("pairDeviceTitle"))}</h3>
        <p class="accountNote">${esc(t("pairDeviceText"))}</p>
        <label for="accountPairCode" class="accountNote"><b>${esc(t("code"))}</b></label>
        <input id="accountPairCode" class="accountField" type="text" inputmode="numeric" autocomplete="one-time-code" maxlength="6" pattern="[0-9]*" placeholder="${esc(t("code"))}">
        <button id="accountPairApprove" class="accountPrimary" type="button" style="margin-top:10px">${esc(t("approve"))}</button>
        <div id="accountPairStatus" class="accountStatus" role="status" aria-live="polite"></div>
      </div>`);
    const input = body.querySelector("#accountPairCode");
    const button = body.querySelector("#accountPairApprove");
    const status = body.querySelector("#accountPairStatus");
    const approve = async () => {
      const code = String(input?.value || "").replace(/\D/g, "").slice(0, 6);
      if (input) input.value = code;
      if (code.length !== 6) {
        if (status) status.textContent = t("invalidCode");
        input?.focus();
        return;
      }
      if (busy) return;
      busy = true;
      if (button) button.disabled = true;
      if (status) status.textContent = t("pairWorking");
      try {
        await auth.approveDevicePairing(code);
        if (status) status.textContent = t("authorized");
        if (input) input.value = "";
      } catch {
        if (status) status.textContent = t("invalidCode");
      } finally {
        busy = false;
        if (button) button.disabled = false;
      }
    };
    input?.addEventListener("input", () => { input.value = input.value.replace(/\D/g, "").slice(0, 6); });
    input?.addEventListener("keydown", (event) => { if (event.key === "Enter") void approve(); });
    button?.addEventListener("click", () => void approve());
    window.setTimeout(() => input?.focus(), 50);
  }

  async function openNetwork() {
    const body = shell(`<div class="accountPanel">${esc(t("loading"))}</div>`);
    try {
      const data = await api("/api/platform-account/network");
      const network = data.network || {};
      const rows = [1, 2, 3, 4, 5]
        .map((level) => `<div class="accountLevel"><span>${esc(t("level"))} ${level}</span><b>${Number(network.levels?.[level] || 0)}</b></div>`)
        .join("");
      const goal = network.allUnlocked
        ? t("allUnlocked")
        : replaceVars(t("missing"), { n: network.missingDirects || 0, l: network.nextLevel || "—" });
      body.innerHTML = `
        <div class="accountPanel">
          <h3>📊 ${esc(t("networkTitle"))}</h3>
          <div class="accountMetricGrid">
            <div class="accountMetric"><small>${esc(t("directs"))}</small><b>${Number(network.directsActive || 0)}</b></div>
            <div class="accountMetric"><small>${esc(t("unlocked"))}</small><b>${Number(network.unlockedDepth || 1)}</b></div>
          </div>
          <div style="margin-top:12px">${rows}</div>
          <p class="accountNote"><b>${esc(t("next"))}:</b> ${esc(goal)}</p>
        </div>`;
    } catch {
      body.innerHTML = `<div class="accountPanel">${esc(t("error"))}</div>`;
    }
  }

  async function openSubscription() {
    const body = shell(`<div class="accountPanel">${esc(t("loading"))}</div>`);
    try {
      const data = await loadOverview(true);
      const subscription = data.subscription || {};
      body.innerHTML = `
        <div class="accountPanel">
          <h3>💳 ${esc(t("subscription"))}</h3>
          <div class="accountMetricGrid">
            <div class="accountMetric"><small>${esc(t("status"))}</small><b>${esc(subscription.active ? t("active") : t("inactive"))}</b></div>
            <div class="accountMetric"><small>${esc(t("validUntil"))}</small><b>${esc(formatDate(subscription.activeUntil))}</b></div>
          </div>
          <p class="accountNote">${esc(t("readOnly"))}</p>
          <p class="accountNote">${esc(t("noPayment"))}</p>
        </div>`;
    } catch {
      body.innerHTML = `<div class="accountPanel">${esc(t("error"))}</div>`;
    }
  }

  async function openLanguage() {
    const body = shell(`
      <div class="accountPanel">
        <h3>🌐 ${esc(t("languageTitle"))}</h3>
        <div class="accountLangGrid">
          <button data-lang="pt">🇧🇷 Português</button>
          <button data-lang="en">🇺🇸 English</button>
          <button data-lang="es">🇪🇸 Español</button>
          <button data-lang="ru">🇷🇺 Русский</button>
        </div>
        <div id="accountLangStatus" class="accountStatus"></div>
      </div>`);

    body.querySelectorAll("[data-lang]").forEach((button) => {
      button.onclick = async () => {
        if (busy) return;
        busy = true;
        const status = body.querySelector("#accountLangStatus");
        try {
          const code = button.dataset.lang;
          await api("/api/platform-account/language", { language: code });
          const current = session();
          if (current?.profile) {
            current.profile.language = code;
            platform.writeWebSession?.(current);
          }
          overview = null;
          if (status) status.textContent = t("languageSaved");
          setTimeout(() => location.reload(), 450);
        } catch {
          if (status) status.textContent = t("error");
        } finally {
          busy = false;
        }
      };
    });
  }

  async function openPreferences() {
    const body = shell(`<div class="accountPanel">${esc(t("loading"))}</div>`);
    try {
      const data = await loadOverview(true);
      const enabled = data?.preferences?.promotional !== false;
      body.innerHTML = `
        <div class="accountPanel">
          <h3>🔔 ${esc(t("preferencesTitle"))}</h3>
          <div class="accountSwitchRow">
            <div>
              <b>${esc(t("promotional"))}</b>
              <small>${esc(t("promotionalHelp"))}</small>
            </div>
            <strong id="accountPreferenceState">${esc(enabled ? t("enabled") : t("disabled"))}</strong>
          </div>
          <button id="accountPreferenceToggle" class="accountPrimary" style="margin-top:10px" type="button">${esc(enabled ? t("disable") : t("enable"))}</button>
          <div id="accountPreferenceStatus" class="accountStatus"></div>
        </div>`;

      const toggle = body.querySelector("#accountPreferenceToggle");
      const state = body.querySelector("#accountPreferenceState");
      const status = body.querySelector("#accountPreferenceStatus");
      let currentValue = enabled;

      toggle?.addEventListener("click", async () => {
        if (busy) return;
        busy = true;
        toggle.disabled = true;
        try {
          const result = await api("/api/platform-account/preferences", { promotional: !currentValue });
          currentValue = result?.preferences?.promotional !== false;
          if (state) state.textContent = currentValue ? t("enabled") : t("disabled");
          toggle.textContent = currentValue ? t("disable") : t("enable");
          if (status) status.textContent = t("preferencesSaved");
          overview = null;
        } catch {
          if (status) status.textContent = t("error");
        } finally {
          toggle.disabled = false;
          busy = false;
        }
      });
    } catch {
      body.innerHTML = `<div class="accountPanel">${esc(t("error"))}</div>`;
    }
  }

  async function linkTelegram() {
    try {
      const data = await api("/api/platform-auth/telegram-link/start");
      if (data?.telegramUrl) location.href = data.telegramUrl;
    } catch {
      // Mantém a tela aberta; o usuário pode tentar novamente.
    }
  }

  async function openSettings() {
    const body = shell(`<div class="accountPanel">${esc(t("loading"))}</div>`);
    try {
      const data = await loadOverview(true);
      const account = data.account || {};
      body.innerHTML = `
        <div class="accountPanel">
          <h3>⚙️ ${esc(t("settingsTitle"))}</h3>
          <div class="accountMetricGrid">
            <div class="accountMetric"><small>${esc(t("wallet"))}</small><b>${esc(account.walletLinked ? t("linked") : t("notLinked"))}</b></div>
            <div class="accountMetric"><small>${esc(t("telegram"))}</small><b>${esc(account.telegramLinked ? t("linked") : t("notLinked"))}</b></div>
            <div class="accountMetric"><small>${esc(t("accountId"))}</small><b>${esc(account.userId || "—")}</b></div>
            <div class="accountMetric"><small>${esc(t("referral"))}</small><b>${esc(account.referralCode || "—")}</b></div>
          </div>
          ${!account.telegramLinked ? `<button id="accountLinkTelegram" class="accountSecondary" type="button">✈️ ${esc(t("linkTelegram"))}</button>` : ""}
          <button id="accountOpenPreferences" class="accountSecondary" type="button">🔔 ${esc(t("preferences"))}</button>
          <button id="accountOpenDocuments" class="accountSecondary" type="button">📄 ${esc(t("documents"))}</button>
          <div style="margin-top:14px">
            <input id="accountPairCode" class="accountField" inputmode="numeric" maxlength="6" placeholder="${esc(t("code"))}">
            <button id="accountPairApprove" class="accountPrimary" style="margin-top:8px" type="button">${esc(t("approve"))}</button>
            <div id="accountPairStatus" class="accountStatus"></div>
          </div>
        </div>`;

      body.querySelector("#accountLinkTelegram")?.addEventListener("click", linkTelegram);
      body.querySelector("#accountOpenPreferences")?.addEventListener("click", openPreferences);
      body.querySelector("#accountOpenDocuments")?.addEventListener("click", openDocuments);
      body.querySelector("#accountPairApprove")?.addEventListener("click", async () => {
        const input = body.querySelector("#accountPairCode");
        const status = body.querySelector("#accountPairStatus");
        const code = String(input?.value || "").replace(/\D/g, "").slice(0, 6);
        if (code.length !== 6) {
          if (status) status.textContent = t("invalidCode");
          return;
        }
        try {
          await auth.approveDevicePairing(code);
          if (status) status.textContent = t("authorized");
          if (input) input.value = "";
        } catch {
          if (status) status.textContent = t("invalidCode");
        }
      });
    } catch {
      body.innerHTML = `<div class="accountPanel">${esc(t("error"))}</div>`;
    }
  }

  async function openDocuments() {
    try {
      const data = await loadOverview();
      const url = String(data?.links?.documents || "").trim() || `${API_BASE}/webapp/documentos.html`;
      close();
      location.assign(url);
    } catch {
      close();
      location.assign(`${API_BASE}/webapp/documentos.html`);
    }
  }

  async function openAdmin() {
    const body = shell(`<div class="accountPanel">${esc(t("loading"))}</div>`);
    try {
      const data = await loadOverview(true);
      if (!data.permissions?.admin) {
        body.innerHTML = `<div class="accountPanel">${esc(t("error"))}</div>`;
        return;
      }
      const stats = data.adminStats || {};
      body.innerHTML = `
        <div class="accountPanel">
          <h3>🛠️ ${esc(t("adminTitle"))}</h3>
          <div class="accountMetricGrid">
            <div class="accountMetric"><small>${esc(t("total"))}</small><b>${Number(stats.total || 0)}</b></div>
            <div class="accountMetric"><small>${esc(t("activeUsers"))}</small><b>${Number(stats.active || 0)}</b></div>
            <div class="accountMetric"><small>${esc(t("inactiveUsers"))}</small><b>${Number(stats.inactive || 0)}</b></div>
          </div>
          <button id="accountAdminMessages" class="accountSecondary" type="button">📨 ${esc(t("userMessages"))}</button>
          <p class="accountNote">${esc(t("readOnly"))}</p>
        </div>`;
      body.querySelector("#accountAdminMessages")?.addEventListener("click", () => page("./support.html"));
    } catch {
      body.innerHTML = `<div class="accountPanel">${esc(t("error"))}</div>`;
    }
  }

  async function open() {
    const body = shell(`<div class="accountPanel">${esc(t("loading"))}</div>`);
    let data = null;
    try {
      data = await loadOverview(true);
    } catch {
      // A grade ainda oferece atalhos locais mesmo se a consulta falhar.
    }
    const admin = Boolean(data?.permissions?.admin);

    body.innerHTML = `
      ${data?.account ? `
        <div class="accountPanel">
          <h3>👤 ${esc(t("accountStatus"))}</h3>
          <div class="accountMetricGrid">
            <div class="accountMetric"><small>${esc(t("webAccount"))}</small><b>${esc(t("connected"))}</b></div>
            <div class="accountMetric"><small>${esc(t("referral"))}</small><b>${esc(data.account.referralCode || "—")}</b></div>
          </div>
        </div>` : ""}
      <div class="accountCenterGrid">
        <button class="accountAction" data-action="home"><span>🏠</span><b>${esc(t("home"))}</b></button>
        <button class="accountAction" data-action="learn"><span>📚</span><b>${esc(t("learn"))}</b></button>
        <button class="accountAction" data-action="explore"><span>🔎</span><b>${esc(t("explore"))}</b></button>
        <button class="accountAction" data-action="benefits"><span>🎁</span><b>${esc(t("benefits"))}</b></button>
        <button class="accountAction" data-action="publish"><span>🚀</span><b>${esc(t("publish"))}</b></button>
        <button class="accountAction" data-action="affiliate"><span>💰</span><b>${esc(t("affiliate"))}</b></button>
        <button class="accountAction" data-action="network"><span>📊</span><b>${esc(t("network"))}</b></button>
        <button class="accountAction" data-action="subscription"><span>💳</span><b>${esc(t("subscription"))}</b></button>
        <button class="accountAction" data-action="pair-device"><span>📱</span><b>${esc(t("pairDevice"))}</b></button>
        <button class="accountAction" data-action="agenda"><span>📅</span><b>${esc(t("agenda"))}</b></button>
        <button class="accountAction" data-action="projects"><span>🗂️</span><b>${esc(t("projects"))}</b></button>
        <button class="accountAction" data-action="language"><span>🌐</span><b>${esc(t("language"))}</b></button>
        <button class="accountAction" data-action="preferences"><span>🔔</span><b>${esc(t("preferences"))}</b></button>
        <button class="accountAction" data-action="settings"><span>⚙️</span><b>${esc(t("settings"))}</b></button>
        <button class="accountAction" data-action="support"><span>🆘</span><b>${esc(t("support"))}</b></button>
        <button class="accountAction" data-action="documents"><span>📄</span><b>${esc(t("documents"))}</b></button>
        ${admin ? `<button class="accountAction admin" data-action="admin"><span>🛠️</span><b>${esc(t("admin"))}</b></button>` : ""}
      </div>`;

    body.querySelectorAll("[data-action]").forEach((button) => {
      button.onclick = () => {
        switch (button.dataset.action) {
          case "home": nav("home"); break;
          case "learn": nav("learn"); break;
          case "explore": nav("explore"); break;
          case "benefits": nav("benefits"); break;
          case "publish": page("./publish.html"); break;
          case "affiliate": affiliatePage(); break;
          case "network": openNetwork(); break;
          case "subscription": openSubscription(); break;
          case "pair-device": openDevicePairing(); break;
          case "agenda": page("./agenda.html"); break;
          case "projects": nav("area"); break;
          case "language": openLanguage(); break;
          case "preferences": openPreferences(); break;
          case "settings": openSettings(); break;
          case "support": page("./support.html"); break;
          case "documents": openDocuments(); break;
          case "admin": openAdmin(); break;
        }
      };
    });
  }

  function install() {
    if (!session()?.token) return;
    styles();
    const topbar = document.querySelector(".topbar");
    if (!topbar || document.getElementById("accountCenterButton")) return;
    const button = document.createElement("button");
    button.id = "accountCenterButton";
    button.className = "accountCenterBtn";
    button.type = "button";
    button.title = t("button");
    button.setAttribute("aria-label", t("button"));
    button.textContent = "👤";
    button.onclick = open;
    const closeButton = document.getElementById("closeButton");
    topbar.insertBefore(button, closeButton || null);
  }

  const observer = new MutationObserver(install);
  observer.observe(document.documentElement, { childList: true, subtree: true });
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () => setTimeout(install, 100), { once: true });
  } else {
    setTimeout(install, 100);
  }
  window.addEventListener("educashpro:web-session-ready", () => setTimeout(install, 100));
  window.EduCashProAccountCenter = {
    open,
    openNetwork,
    openSubscription,
    openDevicePairing,
    openSettings,
    openLanguage,
    openPreferences,
  };
})();
