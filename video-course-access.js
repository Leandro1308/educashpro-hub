(function () {
  "use strict";

  const tg = window.Telegram?.WebApp;
  const apiBaseFromUrl = String(new URL(window.location.href).searchParams.get("api") || "").replace(/\/+$/, "");
  const API_BASE = /^https:\/\//i.test(apiBaseFromUrl) ? apiBaseFromUrl : "https://educashpro-all.onrender.com";
  const originalFetch = window.fetch.bind(window);
  let session = null;
  let enhancing = false;

  const COPY = {
    pt: {
      active: "▶ ASSISTIR AO CURSO COMPLETO EM VÍDEO",
      locked: "🔒 CURSO COMPLETO EM VÍDEO — EXCLUSIVO PARA ASSINANTES",
      note: "O curso em texto permanece gratuito. As videoaulas completas no grupo são um benefício exclusivo para assinantes ativos.",
      error: "Não foi possível abrir o grupo do curso agora. Verifique se o bot é administrador do grupo.",
    },
    en: {
      active: "▶ WATCH THE COMPLETE VIDEO COURSE",
      locked: "🔒 COMPLETE VIDEO COURSE — SUBSCRIBERS ONLY",
      note: "The written course remains free. Full video lessons in the group are an exclusive benefit for active subscribers.",
      error: "Unable to open the course group right now. Check that the bot is an administrator of the group.",
    },
    es: {
      active: "▶ VER EL CURSO COMPLETO EN VIDEO",
      locked: "🔒 CURSO COMPLETO EN VIDEO — EXCLUSIVO PARA SUSCRIPTORES",
      note: "El curso escrito sigue siendo gratuito. Las videoclases completas del grupo son un beneficio exclusivo para suscriptores activos.",
      error: "No fue posible abrir el grupo del curso. Verifica que el bot sea administrador del grupo.",
    },
    ru: {
      active: "▶ СМОТРЕТЬ ПОЛНЫЙ ВИДЕОКУРС",
      locked: "🔒 ПОЛНЫЙ ВИДЕОКУРС — ТОЛЬКО ДЛЯ ПОДПИСЧИКОВ",
      note: "Текстовый курс остаётся бесплатным. Полные видеоуроки в группе доступны только активным подписчикам.",
      error: "Не удалось открыть группу курса. Проверьте, что бот является администратором группы.",
    },
  };

  function language() {
    const value = String(session?.profile?.language || "pt").toLowerCase();
    return COPY[value] ? value : "pt";
  }
  function tr(key) { return COPY[language()][key] || COPY.pt[key]; }
  function isActive() { return session?.profile?.active === true; }

  function openTelegram(url) {
    if (!url) return;
    if (/^https:\/\/t\.me\//i.test(url) && tg?.openTelegramLink) return tg.openTelegramLink(url);
    if (tg?.openLink) return tg.openLink(url);
    window.open(url, "_blank", "noopener");
  }

  function openSubscription() {
    openTelegram(String(session?.subscribeUrl || session?.botUrl || ""));
  }

  function showError() {
    const toast = document.getElementById("toast");
    if (!toast) return;
    toast.textContent = tr("error");
    toast.classList.add("show");
    window.setTimeout(() => toast.classList.remove("show"), 3000);
  }

  async function openVideoCourse() {
    if (!isActive()) return openSubscription();
    try {
      const response = await originalFetch(`${API_BASE}/api/hub/video-course-access`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token: session?.token || "" }),
        cache: "no-store",
      });
      const data = await response.json().catch(() => null);
      if (response.status === 403) return openSubscription();
      if (!response.ok || !(data?.accessUrl || data?.inviteUrl)) throw new Error(data?.reason || "access");
      openTelegram(data.accessUrl || data.inviteUrl);
    } catch {
      showError();
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

  function enhanceVideoButtons() {
    document.querySelectorAll("[data-course-video]").forEach((button) => {
      const technical = button.closest(".technicalCourse");
      if (!technical) return;

      button.textContent = isActive() ? tr("active") : tr("locked");
      button.classList.toggle("lockedButton", !isActive());
      button.removeAttribute("data-course-video");
      button.setAttribute("data-video-course-controlled", "1");
      button.onclick = (event) => {
        event.preventDefault();
        event.stopImmediatePropagation();
        openVideoCourse();
      };

      const actions = button.closest(".coursePartnerActions") || button.parentElement;
      if (!isActive() && actions && !actions.querySelector(".videoSubscriberNote")) {
        const note = document.createElement("small");
        note.className = "videoSubscriberNote";
        note.textContent = tr("note");
        actions.appendChild(note);
      }
    });
  }

  function enhance() {
    if (enhancing) return;
    enhancing = true;
    try { enhanceVideoButtons(); }
    finally { enhancing = false; }
  }

  const observer = new MutationObserver(() => queueMicrotask(enhance));
  observer.observe(document.documentElement, { childList: true, subtree: true });
  queueMicrotask(enhance);
})();
