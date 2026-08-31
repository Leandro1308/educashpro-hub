(function () {
  "use strict";

  const content = document.getElementById("content");
  if (!content || typeof MutationObserver === "undefined") return;

  function normalize(value) {
    return String(value || "").trim().toLowerCase();
  }

  function isNoticeCard(card) {
    const strong = card.querySelector("strong");
    if (!strong) return false;
    const text = normalize(strong.textContent);
    return ["importante", "important", "важно"].includes(text);
  }

  function isFinalLesson() {
    const heading = Array.from(content.querySelectorAll(".sectionHead h2")).find((el) => {
      const text = normalize(el.textContent);
      return text.includes("22") && (text.includes("aula") || text.includes("lesson") || text.includes("lección") || text.includes("урок"));
    });
    if (!heading) return false;
    const text = normalize(heading.textContent);
    return /22\s*(de|of|из)\s*22/.test(text);
  }

  function applyRule() {
    const courseTitle = content.querySelector(".courseHero h2");
    if (!courseTitle || normalize(courseTitle.textContent) !== "educar para multiplicar") return;

    const finalLesson = isFinalLesson();
    content.querySelectorAll(".lessonCard").forEach((card) => {
      if (!isNoticeCard(card)) return;
      card.style.display = finalLesson ? "" : "none";
    });
  }

  new MutationObserver(() => applyRule()).observe(content, { childList: true, subtree: true });
  applyRule();
})();