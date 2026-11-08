(function () {
  "use strict";
  const messages = {
    pt: [
      "🚀 Conheça o EduCashPro!",
      "Uma plataforma de educação financeira com cursos, ferramentas de controle de gastos, investimentos, análise gráfica e empreendedorismo digital.",
      "💰 Indique e Ganhe!",
      "O EduCashPro também oferece um Programa de Afiliados em Marketing de Rede com 5 níveis, permitindo receber comissões por indicações e renovações de assinaturas, conforme as regras do programa.",
      "✅ Conheça a plataforma, explore suas ferramentas e descubra como funciona o Programa de Afiliados!",
      "👇 Acesse gratuitamente:"
    ],
    en: [
      "🚀 Discover EduCashPro!",
      "A financial education platform with courses, expense-tracking tools, investing, chart analysis, and digital entrepreneurship.",
      "💰 Refer and Earn!",
      "EduCashPro also offers a 5-level network marketing affiliate program with commissions on eligible referrals and subscription renewals, subject to program rules.",
      "✅ Explore the platform and its tools, and discover how the Affiliate Program works!",
      "👇 Get started for free:"
    ],
    es: [
      "🚀 ¡Conoce EduCashPro!",
      "Una plataforma de educación financiera con cursos, herramientas de control de gastos, inversiones, análisis de gráficos y emprendimiento digital.",
      "💰 ¡Recomienda y Gana!",
      "EduCashPro también ofrece un Programa de Afiliados de Marketing en Red de 5 niveles, con comisiones por referidos y renovaciones de suscripciones según las reglas del programa.",
      "✅ ¡Conoce la plataforma, explora sus herramientas y descubre cómo funciona el Programa de Afiliados!",
      "👇 Accede gratis:"
    ],
    ru: [
      "🚀 Познакомьтесь с EduCashPro!",
      "Платформа финансового образования с курсами, инструментами учёта расходов, инвестициями, анализом графиков и цифровым предпринимательством.",
      "💰 Рекомендуйте и получайте вознаграждения!",
      "EduCashPro также предлагает пятиуровневую партнёрскую программу сетевого маркетинга с комиссионными за приглашения и продления подписок согласно правилам программы.",
      "✅ Изучите платформу и её инструменты и узнайте, как работает партнёрская программа!",
      "👇 Бесплатный доступ:"
    ]
  };
  function locale(language) {
    const value = String(language || "pt").toLowerCase().split("-")[0];
    return Object.prototype.hasOwnProperty.call(messages, value) ? value : "pt";
  }
  function build(link, language) {
    const url = String(link || "").trim();
    if (!/^https:\/\/[^\s]+$/i.test(url)) return "";
    return [...messages[locale(language)], url].join("\n\n");
  }
  async function share(link, language) {
    const message = build(link, language);
    if (!message) return { status: "invalid" };
    if (typeof navigator.share === "function") {
      try {
        await navigator.share({ title: "EduCashPro", text: message });
        return { status: "shared" };
      } catch (error) {
        if (error && error.name === "AbortError") return { status: "cancelled" };
      }
    }
    try {
      if (!navigator.clipboard || typeof navigator.clipboard.writeText !== "function") throw Error("clipboard_unavailable");
      await navigator.clipboard.writeText(message);
      return { status: "copied" };
    } catch {
      // Compatibilidade com navegadores embarcados sem Clipboard API.
      const input = document.createElement("textarea");
      input.value = message;
      input.setAttribute("readonly", "");
      input.style.position = "fixed";
      input.style.opacity = "0";
      document.body.appendChild(input);
      input.select();
      let copied = false;
      try { copied = Boolean(document.execCommand("copy")); } catch {}
      input.remove();
      return { status: copied ? "copied" : "unavailable", message };
    }
  }
  window.EduCashProAffiliateShare = Object.freeze({ build, share });
})();
