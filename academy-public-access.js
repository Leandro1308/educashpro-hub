(function () {
  "use strict";

  // A Academy é pública. Apenas cursos marcados como subscriber continuam bloqueados.
  // Este patch impede o visitor-experience de bloquear a navegação da Academy inteira.
  const originalAddEventListener = EventTarget.prototype.addEventListener;

  EventTarget.prototype.addEventListener = function (type, listener, options) {
    const capture = options === true || (options && typeof options === "object" && options.capture === true);
    const isElement = this instanceof Element;
    const isLearnNav = isElement && this.matches?.('#bottomNav button[data-view="learn"]');
    const isAcademyCard = isElement && this.matches?.('[data-locked-experience="courses"]');

    // O visitor-experience usa listeners em capture para bloquear visitantes.
    // A área Academy e seu botão de navegação não devem ser bloqueados.
    if (type === "click" && capture && (isLearnNav || isAcademyCard)) return;
    return originalAddEventListener.call(this, type, listener, options);
  };

  function unlockAcademy() {
    const learnNav = document.querySelector('#bottomNav button[data-view="learn"]');
    if (learnNav) {
      learnNav.classList.remove("lockedExperience", "locked", "visitorLocked");
      learnNav.removeAttribute("data-visitor-locked");
      learnNav.setAttribute("aria-label", learnNav.textContent?.trim() || "Academy");
    }

    document.querySelectorAll('[data-locked-experience="courses"]').forEach((button) => {
      button.classList.remove("lockedExperience", "locked");
      button.removeAttribute("data-locked-experience");
      button.dataset.target = "learn";
      button.dataset.publicAcademy = "1";
      button.onclick = (event) => {
        event?.preventDefault?.();
        event?.stopPropagation?.();
        const nav = document.querySelector('#bottomNav button[data-view="learn"]');
        if (nav) nav.click();
      };
    });
  }

  const style = document.createElement("style");
  style.textContent = `
    [data-public-academy="1"]::after,
    #bottomNav button[data-view="learn"]::after { display:none !important; content:none !important; }
    [data-public-academy="1"] { opacity:1 !important; filter:none !important; }
  `;
  document.head.appendChild(style);

  const observer = new MutationObserver(() => queueMicrotask(unlockAcademy));
  observer.observe(document.documentElement, { childList: true, subtree: true, attributes: true, attributeFilter: ["class", "data-locked-experience"] });
  document.addEventListener("DOMContentLoaded", unlockAcademy);
  queueMicrotask(unlockAcademy);
})();
