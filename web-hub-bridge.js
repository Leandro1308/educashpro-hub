(function () {
  const SESSION_KEY = "educashpro:web-session";
  const API_BASE = "https://educashpro-all.onrender.com";
  const WEB_SENTINEL = "__EDUCASHPRO_PLATFORM_WEB_SESSION_V1__";
  const nativeFetch = window.fetch.bind(window);
  const platform = window.EduCashProPlatform || null;

  function readStoredSession() {
    try {
      return JSON.parse(localStorage.getItem(SESSION_KEY) || "null");
    } catch {
      return null;
    }
  }

  function tokenPayload(token) {
    try {
      const body = String(token || "").split(".")[0];
      if (!body) return null;
      const normalized = body.replace(/-/g, "+").replace(/_/g, "/");
      const padded = normalized + "=".repeat((4 - (normalized.length % 4)) % 4);
      return JSON.parse(decodeURIComponent(escape(atob(padded))));
    } catch {
      return null;
    }
  }

  function validAppSession(session) {
    if (!session?.token) return false;
    const payload = tokenPayload(session.token);
    if (!payload?.sub || !String(payload.sub).startsWith("usr_")) return false;
    const exp = Number(payload.exp || 0);
    return Number.isFinite(exp) && exp > Math.floor(Date.now() / 1000) + 15;
  }

  function exposeWebInitData() {
    if (!window.Telegram) window.Telegram = {};
    if (!window.Telegram.WebApp) window.Telegram.WebApp = {};
    const tg = window.Telegram.WebApp;

    try {
      tg.initData = WEB_SENTINEL;
    } catch {}

    if (tg.initData !== WEB_SENTINEL) {
      try {
        Object.defineProperty(tg, "initData", {
          configurable: true,
          enumerable: true,
          get: () => WEB_SENTINEL,
        });
      } catch {}
    }

    try {
      tg.initDataUnsafe = tg.initDataUnsafe || {};
    } catch {}
  }

  function isHubSessionRequest(input, options) {
    const url = typeof input === "string" ? input : String(input?.url || "");
    if (!/\/api\/hub\/session(?:\?|$)/.test(url)) return false;

    const rawBody = options?.body;
    if (typeof rawBody !== "string") return false;
    try {
      return JSON.parse(rawBody)?.initData === WEB_SENTINEL;
    } catch {
      return false;
    }
  }

  function installHubSessionExchange(session) {
    window.fetch = async function (input, options = {}) {
      if (!isHubSessionRequest(input, options)) {
        return nativeFetch(input, options);
      }

      const response = await nativeFetch(`${API_BASE}/api/platform-auth/hub-session`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session.token}`,
        },
        body: "{}",
        cache: "no-store",
      });

      if (response.status === 401) {
        try { localStorage.removeItem(SESSION_KEY); } catch {}
      }

      return response;
    };
  }

  function reloadWhenLoginFinishes() {
    if (!platform?.writeWebSession) return;
    const originalWrite = platform.writeWebSession.bind(platform);
    let reloading = false;

    platform.writeWebSession = function (nextSession) {
      originalWrite(nextSession);
      if (!reloading && nextSession?.token) {
        reloading = true;
        window.setTimeout(() => location.reload(), 80);
      }
    };
  }

  const current = readStoredSession();

  if (validAppSession(current)) {
    exposeWebInitData();
    installHubSessionExchange(current);
    window.__EDUCASHPRO_WEB_HUB__ = {
      active: true,
      source: "platform_web_session",
      userId: current?.profile?.userId || tokenPayload(current.token)?.sub || null,
    };
    return;
  }

  if (current?.token) {
    try { localStorage.removeItem(SESSION_KEY); } catch {}
  }

  reloadWhenLoginFinishes();
  window.__EDUCASHPRO_WEB_HUB__ = { active: false };
})();
