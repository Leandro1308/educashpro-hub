(function () {
  "use strict";

  function isAcademyHomeCard(target) {
    return target?.closest?.('[data-locked-experience="courses"], [data-target="learn"], [data-public-academy="1"]');
  }

  function learnNav() {
    return document.querySelector('#bottomNav button[data-view="learn"]');
  }

  function makeAcademyLookPublic() {
    const nav = learnNav();
    nav?.classList.remove("lockedExperience", "locked", "visitorLocked");
    nav?.removeAttribute("data-visitor-locked");

    document.querySelectorAll('[data-locked-experience="courses"], [data-public-academy="1"]').forEach((button) => {
      button.classList.remove("lockedExperience", "locked", "lockedButton");
      button.dataset.publicAcademy = "1";
    });
  }

  // O visitor-experience intercepta o clique da Academy no próprio botão em capture.
  // Tratamos o clique antes dele, no document, e chamamos diretamente o handler normal do app.
  document.addEventListener("click", function (event) {
    const academyCard = isAcademyHomeCard(event.target);
    const nav = event.target?.closest?.('#bottomNav button[data-view="learn"]');
    if (!academyCard && !nav) return;

    const learn = learnNav();
    if (!learn || typeof learn.onclick !== "function") return;

    event.preventDefault();
    event.stopPropagation();
    event.stopImmediatePropagation();

    learn.onclick.call(learn, event);
  }, true);

  const style = document.createElement("style");
  style.textContent = `
    [data-public-academy="1"]::after,
    #bottomNav button[data-view="learn"]::after { display:none !important; content:none !important; }
    [data-public-academy="1"] { opacity:1 !important; filter:none !important; }
  `;
  document.head.appendChild(style);

  const observer = new MutationObserver(() => queueMicrotask(makeAcademyLookPublic));
  observer.observe(document.documentElement, { childList: true, subtree: true });
  window.addEventListener("load", makeAcademyLookPublic);
  document.addEventListener("DOMContentLoaded", makeAcademyLookPublic);
  queueMicrotask(makeAcademyLookPublic);
})();
