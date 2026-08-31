(function () {
  "use strict";

  function makeLearnNavPublic() {
    const current = document.querySelector('#bottomNav button[data-view="learn"]');
    if (!current || current.dataset.publicFixed === "1") return current;

    const clone = current.cloneNode(true);
    const appHandler = current.onclick;
    clone.dataset.publicFixed = "1";
    clone.classList.remove("lockedExperience", "locked", "visitorLocked");
    clone.removeAttribute("data-visitor-locked");
    clone.onclick = appHandler || null;
    current.replaceWith(clone);
    return clone;
  }

  function makeAcademyCardPublic() {
    const learnNav = makeLearnNavPublic();
    if (!learnNav) return;

    document.querySelectorAll('[data-locked-experience="courses"], [data-public-academy="1"]').forEach((current) => {
      if (current.dataset.publicFixed === "1") return;
      const clone = current.cloneNode(true);
      clone.dataset.publicFixed = "1";
      clone.dataset.publicAcademy = "1";
      clone.dataset.target = "learn";
      clone.removeAttribute("data-locked-experience");
      clone.removeAttribute("data-visitor-modal");
      clone.classList.remove("lockedExperience", "locked", "lockedButton");
      clone.onclick = function (event) {
        event.preventDefault();
        event.stopPropagation();
        const nav = makeLearnNavPublic();
        if (typeof nav?.onclick === "function") nav.onclick.call(nav, event);
        else nav?.click();
      };
      current.replaceWith(clone);
    });
  }

  function repair() {
    makeLearnNavPublic();
    makeAcademyCardPublic();
  }

  const observer = new MutationObserver(() => queueMicrotask(repair));
  observer.observe(document.documentElement, { childList: true, subtree: true });
  window.addEventListener("load", repair);
  document.addEventListener("DOMContentLoaded", repair);
  queueMicrotask(repair);
})();