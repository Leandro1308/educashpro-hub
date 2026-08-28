(function () {
  const tg = window.Telegram?.WebApp;
  if (!tg) return;

  let activationIntent = false;
  let activationTimer = null;

  function markActivationIntent() {
    activationIntent = true;
    if (activationTimer) window.clearTimeout(activationTimer);
    activationTimer = window.setTimeout(() => {
      activationIntent = false;
      activationTimer = null;
    }, 2500);
  }

  document.addEventListener("click", (event) => {
    const target = event.target?.closest?.(
      "#modalSubscribe, .visitorPartnerCta, .presentationSubscribe, #reactivate, .lockedButton"
    );
    if (target) markActivationIntent();
  }, true);

  const originalOpenTelegramLink = typeof tg.openTelegramLink === "function"
    ? tg.openTelegramLink.bind(tg)
    : null;

  if (originalOpenTelegramLink) {
    tg.openTelegramLink = function (url) {
      const shouldCloseMiniApp = activationIntent && /^https:\/\/t\.me\//i.test(String(url || ""));
      activationIntent = false;
      if (activationTimer) {
        window.clearTimeout(activationTimer);
        activationTimer = null;
      }

      const result = originalOpenTelegramLink(url);

      if (shouldCloseMiniApp) {
        window.setTimeout(() => {
          try { tg.close?.(); } catch {}
        }, 180);
      }

      return result;
    };
  }
})();
