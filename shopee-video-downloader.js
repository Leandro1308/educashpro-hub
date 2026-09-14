(function () {
  "use strict";

  const API_BASE = "https://educashpro-all.onrender.com";
  const COPY = {
    pt: {
      back: "Voltar às ferramentas", eyebrow: "FERRAMENTA PARA AFILIADOS", title: "Baixar vídeo da Shopee",
      intro: "Cole o link de um produto ou vídeo público da Shopee. O arquivo é entregue diretamente pela origem ao seu aparelho.",
      label: "Link da Shopee", placeholder: "https://shopee.com.br/...", find: "Localizar vídeo", finding: "Localizando o vídeo…",
      freeUsage: "Downloads gratuitos: {used} de {limit} utilizados", dailyUsage: "Downloads hoje: {used} de {limit}",
      remaining: "{count} disponíveis", reset: "O limite diário é renovado à meia-noite UTC.",
      disabled: "Esta ferramenta está temporariamente desativada.", freeLimit: "Você utilizou seus downloads gratuitos.",
      dailyLimit: "Você atingiu o limite de hoje. O acesso será renovado automaticamente amanhã.", subscribe: "Ativar assinatura e continuar",
      result: "Vídeo localizado", available: "VÍDEO DISPONÍVEL PARA DOWNLOAD", preview: "Prévia do vídeo localizado", download: "Baixar vídeo", source: "Abrir produto na Shopee", newSearch: "Localizar outro vídeo",
      mobileHint: "Se o vídeo abrir no player do celular, use Compartilhar e escolha Salvar vídeo ou Salvar em Arquivos.",
      invalid: "Cole um link válido da Shopee.", notFound: "Não foi possível localizar um vídeo reproduzível nesse link.",
      sourceUnavailable: "A Shopee não respondeu agora. Aguarde um instante e tente novamente.", error: "Não foi possível concluir. Tente novamente.",
      referralTitle: "Indique o EduCashPro", referralText: "Compartilhe esta ferramenta usando seu link pessoal. Comissões seguem as regras vigentes do Programa de Afiliados e exigem assinatura ativa.",
      copy: "Copiar meu link", copied: "Link copiado", share: "Compartilhar",
      admin: "Configuração do Admin", enabled: "Ferramenta ativa", freeLimitLabel: "Downloads gratuitos por conta", dailyLimitLabel: "Limite diário do assinante",
      save: "Salvar configuração", saved: "Configuração salva.", directNote: "O EduCashPro localiza o endereço da mídia, mas não armazena nem retransmite o arquivo de vídeo.",
    },
    en: {
      back: "Back to tools", eyebrow: "AFFILIATE TOOL", title: "Download Shopee video",
      intro: "Paste a Shopee product or public video link. The file is delivered directly from the source to your device.",
      label: "Shopee link", placeholder: "https://shopee.com/...", find: "Find video", finding: "Finding the video…",
      freeUsage: "Free downloads: {used} of {limit} used", dailyUsage: "Downloads today: {used} of {limit}",
      remaining: "{count} available", reset: "The daily limit resets at midnight UTC.",
      disabled: "This tool is temporarily disabled.", freeLimit: "You have used all free downloads.",
      dailyLimit: "You reached today's limit. Access will reset automatically tomorrow.", subscribe: "Activate subscription and continue",
      result: "Video found", available: "VIDEO AVAILABLE TO DOWNLOAD", preview: "Preview of the located video", download: "Download video", source: "Open product on Shopee", newSearch: "Find another video",
      mobileHint: "If the video opens in your phone's player, use Share and choose Save Video or Save to Files.",
      invalid: "Paste a valid Shopee link.", notFound: "No playable video could be found at this link.",
      sourceUnavailable: "Shopee is not responding right now. Wait a moment and try again.", error: "Unable to complete the request. Try again.",
      referralTitle: "Refer EduCashPro", referralText: "Share this tool with your personal link. Commissions follow the current Affiliate Program rules and require an active subscription.",
      copy: "Copy my link", copied: "Link copied", share: "Share",
      admin: "Admin settings", enabled: "Tool enabled", freeLimitLabel: "Free downloads per account", dailyLimitLabel: "Subscriber daily limit",
      save: "Save settings", saved: "Settings saved.", directNote: "EduCashPro resolves the media address but does not store or relay the video file.",
    },
    es: {
      back: "Volver a herramientas", eyebrow: "HERRAMIENTA PARA AFILIADOS", title: "Descargar video de Shopee",
      intro: "Pega el enlace de un producto o video público de Shopee. El archivo llega directamente desde el origen a tu dispositivo.",
      label: "Enlace de Shopee", placeholder: "https://shopee.com/...", find: "Localizar video", finding: "Localizando el video…",
      freeUsage: "Descargas gratuitas: {used} de {limit} utilizadas", dailyUsage: "Descargas hoy: {used} de {limit}",
      remaining: "{count} disponibles", reset: "El límite diario se renueva a medianoche UTC.",
      disabled: "Esta herramienta está temporalmente desactivada.", freeLimit: "Ya utilizaste tus descargas gratuitas.",
      dailyLimit: "Alcanzaste el límite de hoy. El acceso se renovará automáticamente mañana.", subscribe: "Activar suscripción y continuar",
      result: "Video localizado", available: "VIDEO DISPONIBLE PARA DESCARGAR", preview: "Vista previa del video localizado", download: "Descargar video", source: "Abrir producto en Shopee", newSearch: "Localizar otro video",
      mobileHint: "Si el video se abre en el reproductor del teléfono, usa Compartir y elige Guardar video o Guardar en Archivos.",
      invalid: "Pega un enlace válido de Shopee.", notFound: "No fue posible localizar un video reproducible en este enlace.",
      sourceUnavailable: "Shopee no responde ahora. Espera un momento e inténtalo de nuevo.", error: "No fue posible completar la solicitud. Inténtalo de nuevo.",
      referralTitle: "Recomienda EduCashPro", referralText: "Comparte esta herramienta con tu enlace personal. Las comisiones siguen las reglas vigentes del Programa de Afiliados y requieren suscripción activa.",
      copy: "Copiar mi enlace", copied: "Enlace copiado", share: "Compartir",
      admin: "Configuración del Admin", enabled: "Herramienta activa", freeLimitLabel: "Descargas gratuitas por cuenta", dailyLimitLabel: "Límite diario del suscriptor",
      save: "Guardar configuración", saved: "Configuración guardada.", directNote: "EduCashPro localiza la dirección del medio, pero no almacena ni retransmite el archivo de video.",
    },
    ru: {
      back: "Назад к инструментам", eyebrow: "ИНСТРУМЕНТ ДЛЯ ПАРТНЁРОВ", title: "Скачать видео Shopee",
      intro: "Вставьте ссылку на товар или публичное видео Shopee. Файл загружается на устройство напрямую из источника.",
      label: "Ссылка Shopee", placeholder: "https://shopee.com/...", find: "Найти видео", finding: "Ищем видео…",
      freeUsage: "Бесплатные загрузки: использовано {used} из {limit}", dailyUsage: "Загрузки сегодня: {used} из {limit}",
      remaining: "Доступно: {count}", reset: "Дневной лимит обновляется в полночь UTC.",
      disabled: "Инструмент временно отключён.", freeLimit: "Бесплатные загрузки закончились.",
      dailyLimit: "Дневной лимит исчерпан. Доступ обновится автоматически завтра.", subscribe: "Активировать подписку",
      result: "Видео найдено", available: "ВИДЕО ДОСТУПНО ДЛЯ СКАЧИВАНИЯ", preview: "Предпросмотр найденного видео", download: "Скачать видео", source: "Открыть товар в Shopee", newSearch: "Найти другое видео",
      mobileHint: "Если видео открылось в проигрывателе телефона, нажмите «Поделиться» и выберите сохранение видео или файла.",
      invalid: "Вставьте корректную ссылку Shopee.", notFound: "По этой ссылке не удалось найти доступное для воспроизведения видео.",
      sourceUnavailable: "Shopee сейчас не отвечает. Подождите немного и повторите попытку.", error: "Не удалось выполнить запрос. Попробуйте снова.",
      referralTitle: "Рекомендуйте EduCashPro", referralText: "Поделитесь инструментом по личной ссылке. Комиссии начисляются по действующим правилам партнёрской программы при активной подписке.",
      copy: "Копировать мою ссылку", copied: "Ссылка скопирована", share: "Поделиться",
      admin: "Настройки администратора", enabled: "Инструмент включён", freeLimitLabel: "Бесплатных загрузок на аккаунт", dailyLimitLabel: "Дневной лимит подписчика",
      save: "Сохранить настройки", saved: "Настройки сохранены.", directNote: "EduCashPro находит адрес медиафайла, но не хранит и не передаёт сам видеофайл.",
    },
  };

  let context = {};
  let status = null;
  const lang = () => COPY[context.language] ? context.language : "pt";
  const tr = (key, values = {}) => Object.entries(values).reduce((text, [name, value]) => text.replaceAll(`{${name}}`, String(value)), COPY[lang()][key] || COPY.pt[key] || key);
  const esc = (value) => String(value ?? "").replace(/[&<>"']/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[char]);
  const content = () => document.getElementById("content");
  function visitorId() {
    const key = "educashpro:shopee-visitor-id";
    let value = String(localStorage.getItem(key) || "");
    if (!/^[a-f0-9-]{20,80}$/i.test(value)) {
      value = crypto.randomUUID ? crypto.randomUUID() : `${Date.now().toString(16)}-${Math.random().toString(16).slice(2)}-${Math.random().toString(16).slice(2)}`;
      localStorage.setItem(key, value);
    }
    return value;
  }

  async function api(path, payload = {}) {
    const controller = new AbortController();
    const timeout = window.setTimeout(() => controller.abort(), 28_000);
    try {
      const response = await fetch(`${API_BASE}${path}`, {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token: context.session?.token, visitorId: visitorId(), ...payload }), cache: "no-store", signal: controller.signal,
      });
      const data = await response.json().catch(() => ({}));
      if (!response.ok) { const error = new Error(data.reason || "request_failed"); error.data = data; throw error; }
      return data;
    } finally { window.clearTimeout(timeout); }
  }

  function openUrl(url) {
    const tg = window.Telegram?.WebApp;
    if (tg?.openLink) return tg.openLink(url, { try_instant_view: false });
    window.open(url, "_blank", "noopener,noreferrer");
  }

  function usageHtml(usage, active) {
    if (!usage) return "";
    const label = active ? tr("dailyUsage", usage) : tr("freeUsage", usage);
    return `<div class="shopeeUsage"><div><strong>${esc(label)}</strong><small>${esc(tr("remaining", { count: usage.remaining }))}</small></div><span>${usage.used}/${usage.limit}</span></div><div class="shopeeUsageBar"><i style="width:${usage.limit ? Math.min(100, usage.used / usage.limit * 100) : 100}%"></i></div>${active ? `<small class="shopeeReset">${esc(tr("reset"))}</small>` : ""}`;
  }

  function adminHtml(data) {
    if (!data?.admin) return "";
    const cfg = data.config;
    return `<details class="shopeeAdmin"><summary>⚙️ ${esc(tr("admin"))}</summary><div class="shopeeAdminBody"><label class="shopeeToggle"><input id="shopeeEnabled" type="checkbox" ${cfg.enabled ? "checked" : ""}><span>${esc(tr("enabled"))}</span></label><label>${esc(tr("freeLimitLabel"))}<input id="shopeeFreeLimit" type="number" min="0" max="20" value="${cfg.freeLimit}"></label><label>${esc(tr("dailyLimitLabel"))}<input id="shopeeDailyLimit" type="number" min="1" max="200" value="${cfg.dailySubscriberLimit}"></label><button id="saveShopeeSettings" class="secondaryButton">${esc(tr("save"))}</button><p id="shopeeAdminMessage" class="hidden"></p></div></details>`;
  }

  function bindAdmin() {
    document.getElementById("saveShopeeSettings")?.addEventListener("click", async () => {
      const button = document.getElementById("saveShopeeSettings");
      button.disabled = true;
      try {
        const data = await api("/api/media/shopee/admin/settings", {
          enabled: document.getElementById("shopeeEnabled").checked,
          freeLimit: Number(document.getElementById("shopeeFreeLimit").value),
          dailySubscriberLimit: Number(document.getElementById("shopeeDailyLimit").value),
        });
        status.config = data.config;
        const message = document.getElementById("shopeeAdminMessage");
        message.textContent = tr("saved"); message.classList.remove("hidden");
      } catch { alert(tr("error")); }
      finally { button.disabled = false; }
    });
  }

  function subscribe() {
    if (context.session?.subscribeUrl) return openUrl(context.session.subscribeUrl);
    window.EduCashProApp?.renderPresentation?.(render);
  }

  function referralHtml() {
    const link = context.session?.affiliateLink;
    if (!link) return "";
    return `<section class="shopeeReferral"><span>🔗</span><div><h3>${esc(tr("referralTitle"))}</h3><p>${esc(tr("referralText"))}</p><div class="cardActions"><button id="copyShopeeReferral" class="secondaryButton">${esc(tr("copy"))}</button><button id="shareShopeeReferral" class="secondaryButton">${esc(tr("share"))}</button></div></div></section>`;
  }

  function bindReferral() {
    const link = context.session?.affiliateLink;
    document.getElementById("copyShopeeReferral")?.addEventListener("click", async (event) => {
      try { await navigator.clipboard.writeText(link); event.currentTarget.textContent = tr("copied"); } catch { openUrl(link); }
    });
    document.getElementById("shareShopeeReferral")?.addEventListener("click", () => {
      if (navigator.share) return navigator.share({ title: "EduCashPro", text: tr("referralTitle"), url: link }).catch(() => {});
      openUrl(`https://t.me/share/url?url=${encodeURIComponent(link)}&text=${encodeURIComponent(tr("referralTitle"))}`);
    });
  }

  function renderMain() {
    const locked = !status.config.enabled || status.usage.remaining <= 0;
    const lockText = !status.config.enabled ? tr("disabled") : status.active ? tr("dailyLimit") : tr("freeLimit");
    content().innerHTML = `<main class="shopeeDownloader"><button id="shopeeBack" class="textButton">← ${esc(tr("back"))}</button><section class="hero shopeeHero"><span class="eyebrow">${esc(tr("eyebrow"))}</span><div class="shopeeTitleIcon">🛍️</div><h1>${esc(tr("title"))}</h1><p>${esc(tr("intro"))}</p></section><section class="toolCard shopeeTool">${usageHtml(status.usage, status.active)}${locked ? `<div class="shopeeLocked"><span>🔒</span><strong>${esc(lockText)}</strong>${!status.active && status.config.enabled ? `<button id="shopeeSubscribe" class="wideButton">⚡ ${esc(tr("subscribe"))}</button>` : ""}</div>` : `<form id="shopeeForm"><label>${esc(tr("label"))}<input id="shopeeUrl" type="url" inputmode="url" autocomplete="url" placeholder="${esc(tr("placeholder"))}" required></label><button id="shopeeFind" class="wideButton" type="submit">🔎 ${esc(tr("find"))}</button><p id="shopeeError" class="shopeeError hidden"></p></form>`}<p class="shopeeDirectNote">☁️ ${esc(tr("directNote"))}</p></section>${referralHtml()}${adminHtml(status)}</main>`;
    document.getElementById("shopeeBack").onclick = context.back;
    document.getElementById("shopeeSubscribe")?.addEventListener("click", subscribe);
    document.getElementById("shopeeForm")?.addEventListener("submit", resolveVideo);
    bindReferral(); bindAdmin();
  }

  function errorMessage(reason) {
    if (["invalid_url", "unsupported_url"].includes(reason)) return tr("invalid");
    if (reason === "video_not_found") return tr("notFound");
    if (["source_rate_limited", "source_unavailable", "redirect_failed", "too_many_redirects"].includes(reason)) return tr("sourceUnavailable");
    if (reason === "free_limit_reached") return tr("freeLimit");
    if (reason === "daily_limit_reached") return tr("dailyLimit");
    if (reason === "feature_disabled") return tr("disabled");
    return tr("error");
  }

  async function resolveVideo(event) {
    event.preventDefault();
    const input = document.getElementById("shopeeUrl");
    const button = document.getElementById("shopeeFind");
    const errorBox = document.getElementById("shopeeError");
    const url = input.value.trim();
    if (!/^https:\/\//i.test(url) || !/shopee|shope\.ee|shp\.ee/i.test(url)) { errorBox.textContent = tr("invalid"); errorBox.classList.remove("hidden"); return; }
    button.disabled = true; button.textContent = tr("finding"); errorBox.classList.add("hidden");
    try {
      const data = await api("/api/media/shopee/resolve", { url });
      status.usage = data.usage;
      renderResult(data.media);
    } catch (error) {
      if (error.data?.usage) {
        status.usage = error.data.usage; renderMain();
        const visibleError = document.getElementById("shopeeError");
        if (visibleError) { visibleError.textContent = errorMessage(error.message); visibleError.classList.remove("hidden"); }
        else if (!status.active) document.getElementById("shopeeSubscribe")?.focus();
        return;
      }
      errorBox.textContent = errorMessage(error.message); errorBox.classList.remove("hidden");
      button.disabled = false; button.textContent = `🔎 ${tr("find")}`;
    }
  }

  function filename(title) {
    const base = String(title || "video-shopee").normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/gi, "-").replace(/^-|-$/g, "").slice(0, 70);
    return `${base || "video-shopee"}.mp4`;
  }

  function startDownload(media) {
    const anchor = document.createElement("a");
    anchor.href = media.videoUrl; anchor.target = "_blank"; anchor.rel = "noopener noreferrer"; anchor.download = filename(media.title);
    document.body.appendChild(anchor); anchor.click(); anchor.remove();
  }

  function renderResult(media) {
    content().innerHTML = `<main class="shopeeDownloader"><button id="shopeeBack" class="textButton">← ${esc(tr("back"))}</button><section class="hero shopeeHero"><span class="eyebrow">${esc(tr("result"))}</span><h1>✅ ${esc(media.title || tr("result"))}</h1></section><section class="toolCard shopeeResult"><div class="shopeeAvailable">✓ ${esc(tr("available"))}</div><video class="shopeeVideoPreview" controls playsinline preload="metadata" ${media.thumbnail ? `poster="${esc(media.thumbnail)}"` : ""} src="${esc(media.videoUrl)}" aria-label="${esc(tr("preview"))}"></video><button id="downloadShopeeVideo" class="wideButton">⬇️ ${esc(tr("download"))}</button><p>${esc(tr("mobileHint"))}</p><div class="cardActions"><button id="openShopeeSource" class="secondaryButton">🛍️ ${esc(tr("source"))}</button><button id="newShopeeSearch" class="secondaryButton">↻ ${esc(tr("newSearch"))}</button></div>${usageHtml(status.usage, status.active)}</section>${referralHtml()}</main>`;
    document.getElementById("shopeeBack").onclick = context.back;
    document.getElementById("downloadShopeeVideo").onclick = () => startDownload(media);
    document.getElementById("openShopeeSource").onclick = () => openUrl(media.sourceUrl);
    document.getElementById("newShopeeSearch").onclick = renderMain;
    bindReferral(); window.scrollTo({ top: 0, behavior: "smooth" });
  }

  async function render(options = {}) {
    context = { session: options.session || context.session || window.__EDUCASHPRO_SESSION__, language: options.language || options.session?.profile?.language || context.language || "pt", back: options.back || context.back || (() => history.back()) };
    content().innerHTML = `<main class="shopeeDownloader"><button id="shopeeBack" class="textButton">← ${esc(tr("back"))}</button><section class="hero shopeeHero"><div class="shopeeTitleIcon">🛍️</div><h1>${esc(tr("title"))}</h1><p>${esc(tr("finding"))}</p></section></main>`;
    document.getElementById("shopeeBack").onclick = context.back;
    try { status = await api("/api/media/shopee/status"); renderMain(); }
    catch { content().querySelector(".shopeeHero p").textContent = tr("error"); }
  }

  window.EduCashProShopeeVideo = { render };
})();
