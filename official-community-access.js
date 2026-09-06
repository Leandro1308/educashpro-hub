(function () {
  const tg = window.Telegram?.WebApp;
  // Link antigo permanece apenas para localizar os botões já renderizados pelo app.
  const LEGACY_OFFICIAL_CHANNEL_URL = "https://t.me/boost?c=3942997522";
  // Link real de entrada no Canal Oficial. Não depende de API, bot admin ou geração de convite.
  const OFFICIAL_CHANNEL_ACCESS_URL = "https://t.me/+1mP5ad7vJH5lOGNh";
  const OFFICIAL_GROUP_URL = "https://t.me/boost?c=3980981498";
  const apiBaseFromUrl = String(new URL(window.location.href).searchParams.get("api") || "").replace(/\/+$/, "");
  const API_BASE = /^https:\/\//i.test(apiBaseFromUrl) ? apiBaseFromUrl : "https://educashpro-all.onrender.com";
  const originalFetch = window.fetch.bind(window);
  let session = null;
  let enhancing = false;

  const COPY = {
    pt: {
      free: "ACESSO LIVRE",
      channelTitle: "Canal Oficial de Educação",
      channelText: "Conteúdos educativos gratuitos para assinantes e não assinantes.",
      channelButton: "📚 Entrar no canal gratuito",
      groupTitle: "Grupo Exclusivo para Assinantes",
      groupText: "Materiais prontos para divulgação e conteúdos exclusivos para assinantes ativos.",
      groupButton: "👥 Entrar no grupo exclusivo",
      groupLocked: "🔒 Exclusivo para assinantes",
      subscribe: "⚡ Ativar assinatura",
      inviteError: "Não foi possível abrir o acesso agora.",
    },
    en: {
      free: "FREE ACCESS", channelTitle: "Official Education Channel", channelText: "Free educational content for subscribers and visitors.", channelButton: "📚 Join free channel", groupTitle: "Subscribers-Only Group", groupText: "Ready-to-share materials and exclusive content for active subscribers.", groupButton: "👥 Join exclusive group", groupLocked: "🔒 Subscribers only", subscribe: "⚡ Activate subscription", inviteError: "Unable to open access right now.",
    },
    es: {
      free: "ACCESO LIBRE", channelTitle: "Canal Oficial de Educación", channelText: "Contenido educativo gratuito para suscriptores y visitantes.", channelButton: "📚 Entrar al canal gratuito", groupTitle: "Grupo Exclusivo para Suscriptores", groupText: "Materiales listos para divulgar y contenido exclusivo para suscriptores activos.", groupButton: "👥 Entrar al grupo exclusivo", groupLocked: "🔒 Solo suscriptores", subscribe: "⚡ Activar suscripción", inviteError: "No fue posible abrir el acceso ahora.",
    },
    ru: {
      free: "СВОБОДНЫЙ ДОСТУП", channelTitle: "Официальный образовательный канал", channelText: "Бесплатные образовательные материалы для подписчиков и гостей.", channelButton: "📚 Войти в бесплатный канал", groupTitle: "Эксклюзивная группа подписчиков", groupText: "Готовые материалы для публикации и эксклюзивный контент для активных подписчиков.", groupButton: "👥 Войти в закрытую группу", groupLocked: "🔒 Только для подписчиков", subscribe: "⚡ Активировать подписку", inviteError: "Сейчас не удалось открыть доступ.",
    },
  };

  function language() {
    const value = String(session?.profile?.language || "pt").toLowerCase();
    return COPY[value] ? value : "pt";
  }
  function tr(key) { return COPY[language()][key] || COPY.pt[key] || key; }
  function isActive() { return session?.profile?.active === true; }
  function escapeHtml(value) { return String(value ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]); }

  function showAccessError() {
    const toast = document.getElementById("toast");
    if (!toast) return;
    toast.textContent = tr("inviteError");
    toast.classList.add("show");
    window.setTimeout(() => toast.classList.remove("show"), 3000);
  }

  function openTelegram(url) {
    if (!url) return;
    try {
      if (/^https:\/\/t\.me\//i.test(url) && tg?.openTelegramLink) return tg.openTelegramLink(url);
      if (tg?.openLink) return tg.openLink(url);
      window.open(url, "_blank", "noopener");
    } catch {
      window.open(url, "_blank", "noopener");
    }
  }

  function openSubscription() {
    openTelegram(String(session?.subscribeUrl || session?.botUrl || ""));
  }

  async function requestAccess(path) {
    if (!session?.token) throw new Error("session");
    const response = await originalFetch(`${API_BASE}${path}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token: session.token }),
      cache: "no-store",
    });
    const data = await response.json().catch(() => null);
    if (!response.ok || !(data?.accessUrl || data?.inviteUrl)) throw new Error(data?.reason || "access");
    return data.accessUrl || data.inviteUrl;
  }

  function openOfficialChannel(event) {
    event?.preventDefault?.();
    event?.stopPropagation?.();
    // O Canal Oficial é livre. Abrimos diretamente o convite fornecido pelo administrador.
    openTelegram(OFFICIAL_CHANNEL_ACCESS_URL);
  }

  async function openSubscriberGroup() {
    if (!session?.token) return;
    if (!isActive()) return openSubscription();
    try {
      openTelegram(await requestAccess("/api/hub/subscriber-group-invite"));
    } catch {
      showAccessError();
    }
  }

  window.fetch = async function (...args) {
    const response = await originalFetch(...args);
    try {
      const url = typeof args[0] === "string" ? args[0] : args[0]?.url || "";
      if (/\/api\/hub\/session$/.test(url)) {
        const data = await response.clone().json();
        if (data?.ok) {
          session = data;
          queueMicrotask(enhance);
        }
      }
    } catch {}
    return response;
  };

  function decorateOfficialArea() {
    document.querySelectorAll(`[data-official-url="${LEGACY_OFFICIAL_CHANNEL_URL}"]`).forEach((button) => {
      const card = button.closest(".itemCard");
      card?.querySelector("h3") && (card.querySelector("h3").textContent = tr("channelTitle"));
      card?.querySelector("p") && (card.querySelector("p").textContent = tr("channelText"));
      button.textContent = tr("channelButton");
      button.dataset.officialDirectUrl = OFFICIAL_CHANNEL_ACCESS_URL;
      if (button.dataset.communityBound !== "1") {
        button.dataset.communityBound = "1";
        button.addEventListener("click", (event) => {
          event.preventDefault();
          event.stopImmediatePropagation();
          openOfficialChannel(event);
        }, true);
      }
    });

    document.querySelectorAll(`[data-official-url="${OFFICIAL_GROUP_URL}"]`).forEach((button) => {
      const card = button.closest(".itemCard");
      card?.querySelector("h3") && (card.querySelector("h3").textContent = tr("groupTitle"));
      card?.querySelector("p") && (card.querySelector("p").textContent = tr("groupText"));
      button.textContent = isActive() ? tr("groupButton") : tr("subscribe");
      if (!isActive()) button.classList.add("secondaryButton");
      if (button.dataset.communityBound !== "1") {
        button.dataset.communityBound = "1";
        button.addEventListener("click", (event) => {
          event.preventDefault();
          event.stopImmediatePropagation();
          openSubscriberGroup();
        }, true);
      }
    });
  }

  function addFreeChannelToHome() {
    const content = document.getElementById("content");
    if (!content || document.getElementById("officialEducationFreeCard")) return;
    const presentation = content.querySelector("#openPresentation");
    const grid = presentation?.parentElement?.querySelector(".quickGrid");
    if (!grid) return;

    const card = document.createElement("button");
    card.id = "officialEducationFreeCard";
    card.type = "button";
    card.className = "quickCard officialEducationFreeCard";
    card.dataset.officialDirectUrl = OFFICIAL_CHANNEL_ACCESS_URL;
    card.innerHTML = `<span class="emoji">📚</span><strong>${escapeHtml(tr("channelTitle"))}</strong><small>${escapeHtml(tr("channelText"))}</small><span style="font-size:11px;font-weight:800;opacity:.8">${escapeHtml(tr("free"))}</span>`;
    card.addEventListener("click", openOfficialChannel);
    grid.prepend(card);
  }

  function enhance() {
    if (enhancing) return;
    enhancing = true;
    try {
      decorateOfficialArea();
    } finally {
      enhancing = false;
    }
  }

  const observer = new MutationObserver(() => queueMicrotask(enhance));
  observer.observe(document.documentElement, { childList: true, subtree: true });
  queueMicrotask(enhance);
})();
