(function () {
  "use strict";

  const SITE_URL = "https://go.educashpro.vip/";
  const BOT_URL = "https://t.me/EduCashProBot";
  const LAST_ROUTE_KEY = "educashpro:last-route:v1";
  const platform = window.EduCashProPlatform;

  function language() {
    const value = String(document.documentElement.lang || navigator.language || "pt").toLowerCase();
    if (value.startsWith("en")) return "en";
    if (value.startsWith("es")) return "es";
    if (value.startsWith("ru")) return "ru";
    return "pt";
  }

  const copy = {
    pt: { bot: "Abrir bot", site: "Abrir site", back: "Voltar ao EduCashPro" },
    en: { bot: "Open bot", site: "Open website", back: "Back to EduCashPro" },
    es: { bot: "Abrir bot", site: "Abrir sitio", back: "Volver a EduCashPro" },
    ru: { bot: "Открыть бот", site: "Открыть сайт", back: "Вернуться в EduCashPro" },
  };

  function session() {
    if (window.__EDUCASHPRO_SESSION__?.profile) return window.__EDUCASHPRO_SESSION__;
    if (window.EduCashProWebEntry?.getSession?.()?.profile) return window.EduCashProWebEntry.getSession();
    try { return JSON.parse(localStorage.getItem("educashpro:web-session") || "null"); } catch { return null; }
  }

  function cleanReferral(value) {
    const result = String(value || "").trim();
    return /^[a-z0-9_-]{2,80}$/i.test(result) ? result : "";
  }

  function referral() {
    const params = new URL(location.href).searchParams;
    const direct = cleanReferral(params.get("ref") || params.get("r"));
    const own = cleanReferral(session()?.profile?.referralCode);
    const pending = cleanReferral(platform?.pendingReferral?.());
    return direct || own || pending;
  }

  function isTelegram() {
    if (platform?.isTelegram) return platform.isTelegram();
    const data = String(window.Telegram?.WebApp?.initData || "");
    return Boolean(data && data !== "__EDUCASHPRO_PLATFORM_WEB_SESSION_V1__");
  }

  function destination() {
    const code = referral();
    if (isTelegram()) {
      const url = new URL(SITE_URL);
      if (code) url.searchParams.set("ref", code);
      return { url: url.toString(), label: copy[language()].site, icon: "🌐" };
    }
    const url = new URL(BOT_URL);
    if (code) url.searchParams.set("start", `ref_${code}`);
    return { url: url.toString(), label: copy[language()].bot, icon: "✈️" };
  }

  function addStyles() {
    if (document.getElementById("educashCrossNavStyles")) return;
    const style = document.createElement("style");
    style.id = "educashCrossNavStyles";
    style.textContent = ".educashCrossNav{display:inline-flex;align-items:center;justify-content:center;min-width:44px;min-height:44px;border:1px solid rgba(116,169,219,.22);border-radius:14px;background:#102239;color:#f7fbff;text-decoration:none;font-size:20px;font-weight:800;box-sizing:border-box}.educashCrossNav:focus-visible{outline:3px solid #30e6a6;outline-offset:2px}.educashFallbackBack{position:fixed;left:16px;top:calc(12px + env(safe-area-inset-top));z-index:80;padding:10px 14px;border-radius:14px;background:#102239;color:#30e6a6;text-decoration:none;font-weight:800;box-shadow:0 8px 28px rgba(0,0,0,.28)}";
    document.head.appendChild(style);
  }

  function decorateInternalLinks() {
    const code = referral();
    if (!code) return;
    document.querySelectorAll("a[href]").forEach((link) => {
      const raw = link.getAttribute("href");
      if (!raw || raw.startsWith("#") || raw.startsWith("mailto:") || raw.startsWith("tel:")) return;
      let url;
      try { url = new URL(raw, location.href); } catch { return; }
      if (url.origin !== location.origin || !/\.html$|\/$/.test(url.pathname)) return;
      if (!url.searchParams.has("ref")) url.searchParams.set("ref", code);
      link.href = url.toString();
    });
  }

  function ensureBack() {
    if (location.pathname === "/" || /\/index\.html$/.test(location.pathname)) return;
    if (document.querySelector('[aria-label*="Voltar" i], .back, .backButton, #back')) return;
    const link = document.createElement("a");
    link.className = "educashFallbackBack";
    link.href = rememberedIndexUrl();
    link.setAttribute("aria-label", copy[language()].back);
    link.textContent = `← ${copy[language()].back}`;
    document.body.prepend(link);
  }

  function rememberedIndexUrl() {
    const url = new URL("./index.html", location.href);
    try {
      const route = JSON.parse(localStorage.getItem(LAST_ROUTE_KEY) || "null");
      const view = String(route?.view || "");
      const detail = String(route?.detail || "");
      if (view && view !== "home") url.searchParams.set("view", view);
      if (view === "learn" && detail) url.searchParams.set("academy", detail);
      if (view === "course" && detail) url.searchParams.set("course", detail);
      if (view === "benefits" && detail) url.searchParams.set("section", detail);
    } catch {}
    const code = referral();
    if (code) url.searchParams.set("ref", code);
    return url.toString();
  }

  function render() {
    addStyles();
    decorateInternalLinks();
    ensureBack();
    const target = document.querySelector(".topbar, .marketHeader, body > .app > header, body > header");
    if (!target) return;
    const value = destination();
    let link = document.getElementById("educashCrossPlatform");
    if (!link) {
      link = document.createElement("a");
      link.id = "educashCrossPlatform";
      link.className = "educashCrossNav";
      const close = target.querySelector("#closeButton, #close");
      target.insertBefore(link, close || null);
    }
    link.href = value.url;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    link.title = value.label;
    link.setAttribute("aria-label", value.label);
    link.dataset.label = value.label;
    if (link.textContent !== value.icon) link.textContent = value.icon;
    const affiliateLabel = document.getElementById("affiliateQuickLabel");
    if (affiliateLabel && !isTelegram() && !session()?.profile) {
      const label = language() === "pt" ? "Programa de Afiliados" : language() === "es" ? "Programa de Afiliados" : language() === "ru" ? "Партнёрская программа" : "Affiliate Program";
      if (affiliateLabel.textContent !== label) affiliateLabel.textContent = label;
    }
    const close = target.querySelector("#closeButton, #close");
    if (close && !isTelegram()) close.hidden = true;
  }

  const observer = new MutationObserver(() => render());
  function boot() { render(); observer.observe(document.body, { childList: true, subtree: true }); }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot, { once: true });
  else boot();
})();
