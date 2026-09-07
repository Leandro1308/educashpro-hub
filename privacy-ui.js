(function () {
  "use strict";

  const replacements = new Map([
    ["Mostre este QR Code ao parceiro. A validação não consulta Render nem MongoDB.", "Mostre este QR Code ao parceiro para confirmar sua assinatura EduCashPro."],
    ["Show this QR Code to the partner. Validation does not query Render or MongoDB.", "Show this QR Code to the partner to confirm your EduCashPro membership."],
    ["Muestra este QR al socio. La validación no consulta Render ni MongoDB.", "Muestra este QR al socio para confirmar tu suscripción a EduCashPro."],
    ["Покажите QR партнёру. Проверка не обращается к Render или MongoDB.", "Покажите QR партнёру для подтверждения подписки EduCashPro."],

    ["Treine raciocínio, matemática e vocabulário. As partidas rodam no seu aparelho.", "Treine raciocínio, matemática e vocabulário."],
    ["Train logic, math and vocabulary. Gameplay runs on your device.", "Train logic, math and vocabulary."],
    ["Entrena lógica, matemáticas y vocabulario. Las partidas se ejecutan en tu dispositivo.", "Entrena lógica, matemáticas y vocabulario."],
    ["Тренируйте логику, математику и словарный запас. Игра работает на устройстве.", "Тренируйте логику, математику и словарный запас."],

    ["Processamento local", "DESAFIOS"],
    ["Local processing", "CHALLENGES"],
    ["Procesamiento local", "DESAFÍOS"],
    ["Локальная обработка", "ЗАДАНИЯ"],

    ["Nenhuma partida sincronizada ainda.", "Você ainda não tem partidas salvas."],
    ["No synced games yet.", "You do not have saved games yet."],
    ["Aún no hay partidas sincronizadas.", "Todavía no tienes partidas guardadas."],
    ["Синхронизированных игр пока нет.", "Сохранённых игр пока нет."],

    ["Assinantes ativos podem sincronizar apenas o resumo final das partidas. Movimentos e animações não são enviados.", "Assinantes ativos podem guardar os resultados recentes de suas partidas."],
    ["Active subscribers can sync only the final game summary. Moves and animations are never sent.", "Active subscribers can keep their recent game results."],
    ["Los suscriptores activos pueden sincronizar solo el resumen final. Los movimientos y animaciones no se envían.", "Los suscriptores activos pueden guardar los resultados recientes de sus partidas."],
    ["Активные подписчики синхронизируют только итог игры. Ходы и анимации не отправляются.", "Активные подписчики могут сохранять последние результаты игр."],

    ["Histórico sincronizado", "Histórico de partidas"],
    ["Synced history", "Game history"],
    ["Historial sincronizado", "Historial de partidas"],
    ["Синхронизированная история", "История игр"],

    ["Os dados ficam somente neste aparelho e não são enviados ao EduCashPro.", "Use os sorteadores para nomes, números e equipes."],
    ["Data stays on this device and is not sent to EduCashPro.", "Use the randomizers for names, numbers and teams."],
    ["Los datos quedan en este dispositivo y no se envían a EduCashPro.", "Usa los sorteadores para nombres, números y equipos."],
    ["Данные остаются на устройстве и не отправляются в EduCashPro.", "Используйте жеребьёвку для имён, чисел и команд."],

    ["Partidas e recordes ficam somente neste aparelho.", "Acompanhe suas partidas e recordes."],
    ["Games and records stay on this device.", "Track your games and records."],
    ["Las partidas y récords quedan solo en este dispositivo.", "Sigue tus partidas y récords."],
    ["Игры и рекорды хранятся только на этом устройстве.", "Следите за играми и рекордами."],

    ["Desafios livres que funcionam no seu aparelho.", "Desafios para treinar raciocínio e planejamento."],
    ["Free challenges that run on your device.", "Challenges to train logic and planning."],
    ["Desafíos libres que funcionan en tu dispositivo.", "Desafíos para entrenar lógica y planificación."],
    ["Бесплатные задания прямо на вашем устройстве.", "Задания для тренировки логики и планирования."]
  ]);

  const blocked = /\b(Render|MongoDB|GitHub|Cloudinary|Redis|Node\.js|Express|Telegraf|backend|frontend|endpoint|deploy|repository|reposit[oó]rio|localStorage)\b/i;

  function cleanText(value) {
    const exact = replacements.get(value);
    if (exact !== undefined) return exact;
    if (!blocked.test(value)) return value;

    const parts = String(value).split(/(?<=[.!?])\s+/);
    const safe = parts.filter((part) => !blocked.test(part)).join(" ").trim();
    return safe;
  }

  function cleanNode(root) {
    if (!root) return;
    if (root.nodeType === Node.TEXT_NODE) {
      const parent = root.parentElement;
      if (!parent || /^(SCRIPT|STYLE|NOSCRIPT|TEMPLATE)$/i.test(parent.tagName)) return;
      const original = root.nodeValue || "";
      const cleaned = cleanText(original);
      if (cleaned !== original) root.nodeValue = cleaned;
      return;
    }

    if (root.nodeType !== Node.ELEMENT_NODE && root.nodeType !== Node.DOCUMENT_FRAGMENT_NODE) return;
    if (root.nodeType === Node.ELEMENT_NODE && /^(SCRIPT|STYLE|NOSCRIPT|TEMPLATE)$/i.test(root.tagName)) return;

    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
    const nodes = [];
    while (walker.nextNode()) nodes.push(walker.currentNode);
    nodes.forEach(cleanNode);
  }

  function run() { cleanNode(document.body); }

  const observer = new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      if (mutation.type === "characterData") cleanNode(mutation.target);
      mutation.addedNodes?.forEach(cleanNode);
    }
  });

  document.addEventListener("DOMContentLoaded", () => {
    run();
    observer.observe(document.body, { childList: true, subtree: true, characterData: true });
  });
})();
