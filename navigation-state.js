(function () {
  const KEY = "educashpro:last-location:v2";
  const MAX_AGE_MS = 30 * 24 * 60 * 60 * 1000;
  const SAFE_PAGES = new Set([
    "/",
    "/index.html",
    "/agenda.html",
    "/affiliate.html",
    "/marketplace.html",
    "/publish.html",
    "/support.html",
  ]);

  let scrollTimer = 0;
  let restoring = false;
  let leavingForEntry = false;

  function normalizedPath(value) {
    try {
      const path = new URL(value || location.href, location.href).pathname || "/";
      if (path.endsWith("/")) return path === "/" ? "/" : path.replace(/\/+$/, "");
      return path;
    } catch {
      return "/";
    }
  }

  function isSafePath(path) {
    const value = normalizedPath(path);
    if (SAFE_PAGES.has(value)) return true;
    return value.endsWith("/index.html") ||
      value.endsWith("/agenda.html") ||
      value.endsWith("/affiliate.html") ||
      value.endsWith("/marketplace.html") ||
      value.endsWith("/publish.html") ||
      value.endsWith("/support.html");
  }

  function isEntryPath(path) {
    const value = normalizedPath(path);
    return value === "/" || value.endsWith("/index.html") || value.endsWith("/hub");
  }

  function hasIdentity() {
    try {
      if (window.__EDUCASHPRO_SESSION__?.token) return true;
      if (window.Telegram?.WebApp?.initData) return true;
      if (window.EduCashProPlatform?.readWebSession?.()?.token) return true;
    } catch {}
    return false;
  }

  function read() {
    try {
      const value = JSON.parse(localStorage.getItem(KEY) || "null");
      if (!value || !isSafePath(value.path)) return null;
      if (Date.now() - Number(value.savedAt || 0) > MAX_AGE_MS) return null;
      return {
        path: normalizedPath(value.path),
        search: String(value.search || "").slice(0, 1000),
        hash: String(value.hash || "").slice(0, 500),
        scrollY: Math.max(0, Number(value.scrollY || 0) || 0),
        savedAt: Number(value.savedAt || 0),
      };
    } catch {
      return null;
    }
  }

  function write({ scrollY = window.scrollY || 0 } = {}) {
    if (restoring || leavingForEntry || !isSafePath(location.pathname)) return;
    try {
      localStorage.setItem(KEY, JSON.stringify({
        path: normalizedPath(location.pathname),
        search: String(location.search || "").slice(0, 1000),
        hash: String(location.hash || "").slice(0, 500),
        scrollY: Math.max(0, Math.round(Number(scrollY || 0))),
        savedAt: Date.now(),
      }));
    } catch {}
  }

  function flush() {
    window.clearTimeout(scrollTimer);
    write();
  }

  function schedule() {
    window.clearTimeout(scrollTimer);
    scrollTimer = window.setTimeout(write, 160);
  }

  function restoreScroll() {
    const saved = read();
    if (!saved) return;
    if (normalizedPath(location.pathname) !== saved.path) return;
    if (String(location.search || "") !== saved.search) return;
    const y = Math.max(0, saved.scrollY);
    if (!y) return;
    window.requestAnimationFrame(() => {
      window.requestAnimationFrame(() => {
        window.scrollTo({ top: y, behavior: "auto" });
      });
    });
  }

  function hasExplicitEntryIntent() {
    const params = new URLSearchParams(location.search);
    return ["view", "course", "academy", "section", "ref", "start", "action", "agenda"]
      .some((key) => params.has(key));
  }

  function restoreLastPage() {
    if (restoring || !isEntryPath(location.pathname) || hasExplicitEntryIntent() || !hasIdentity()) {
      return false;
    }
    const saved = read();
    if (!saved || isEntryPath(saved.path)) return false;
    restoring = true;
    const target = new URL(location.href);
    target.pathname = saved.path;
    target.search = saved.search;
    target.hash = saved.hash;
    location.replace(target.toString());
    return true;
  }

  function markEntry() {
    restoring = false;
    leavingForEntry = true;
    try {
      const entry = new URL("./index.html", location.href);
      localStorage.setItem(KEY, JSON.stringify({
        path: normalizedPath(entry.pathname),
        search: "",
        hash: "",
        scrollY: 0,
        savedAt: Date.now(),
      }));
    } catch {}
  }

  const originalPushState = history.pushState?.bind(history);
  const originalReplaceState = history.replaceState?.bind(history);
  if (originalPushState) {
    history.pushState = function (...args) {
      const result = originalPushState(...args);
      write({ scrollY: 0 });
      return result;
    };
  }
  if (originalReplaceState) {
    history.replaceState = function (...args) {
      const result = originalReplaceState(...args);
      write();
      return result;
    };
  }

  document.addEventListener("click", (event) => {
    const target = event.target?.closest?.("a[href], #back, .back, .backButton, [data-educash-home]");
    if (!target) return;
    if (target.matches("#back, .back, .backButton, [data-educash-home]")) {
      markEntry();
      return;
    }
    try {
      const url = new URL(target.getAttribute("href"), location.href);
      if (url.origin === location.origin && isEntryPath(url.pathname)) markEntry();
    } catch {}
  }, true);

  window.addEventListener("scroll", schedule, { passive: true });
  window.addEventListener("pagehide", flush);
  window.addEventListener("beforeunload", flush);
  document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "hidden") flush();
  });

  window.EduCashProNavigationState = {
    read,
    write,
    flush,
    restoreScroll,
    restoreLastPage,
    markEntry,
    isEntryPath,
  };

  if (!isEntryPath(location.pathname)) {
    write();
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", restoreScroll, { once: true });
    } else {
      restoreScroll();
    }
  }
})();