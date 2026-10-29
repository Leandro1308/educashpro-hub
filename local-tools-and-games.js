(function () {
  "use strict";

  const COPY = {
    pt: {
      qrTitle: "Gerador de QR Code", qrSub: "Transforme seu link em QR Code e baixe a imagem.",

      tools: "Ferramentas", toolsSub: "Controle financeiro, cálculos, documentos informativos e utilidades.", free: "ACESSO LIVRE", trial30: "30 DIAS GRÁTIS",

      affiliateCalc: "Simulador do programa de afiliados", affiliateCalcSub: "Simule os cinco níveis e os critérios de desbloqueio.",
      finance: "Controle Financeiro Mensal", financeSub: "Registre renda e gastos e acompanhe o saldo do mês.",
      limited: "ACESSO LIMITADO", unlimited: "ILIMITADO",
      financeGroup: "Controle e organização", financeGroupSub: "Registre, acompanhe e organize suas finanças.",
      businessGroup: "Negócios e cálculos", businessGroupSub: "Ferramentas para precificação, metas e análise.",
      utilityGroup: "Utilidades", utilityGroupSub: "Recursos práticos do EduCashPro.",
      receivables: "Contas a Receber", receivablesSub: "Acompanhe clientes, valores e vencimentos.",
      quote: "Orçamento Informativo", quoteSub: "Crie uma proposta de valores sem emitir fatura.",
      salePrice: "Preço de Venda", salePriceSub: "Calcule preço, lucro e margem a partir dos custos.",
      breakEven: "Ponto de Equilíbrio", breakEvenSub: "Descubra quanto precisa vender para cobrir custos.",
      revenueGoal: "Meta de Faturamento", revenueGoalSub: "Transforme sua meta de lucro em meta de vendas.",
      roi: "ROI", roiSub: "Calcule o retorno percentual de um investimento.",
      compound: "Juros Compostos Avançados", compoundSub: "Simule aportes, retiradas, taxa e prazo.",
    },
    en: {
      qrTitle: "QR Code Generator", qrSub: "Turn your link into a QR code and download the image.",

      tools: "Tools", toolsSub: "Financial tracking, calculations, informative documents and utilities.", free: "FREE ACCESS", trial30: "30 DAYS FREE",

      affiliateCalc: "Affiliate program simulator", affiliateCalcSub: "Simulate five levels and unlock requirements.",
      finance: "Monthly Finance Control", financeSub: "Record income and expenses and track the monthly balance.",
      limited: "LIMITED ACCESS", unlimited: "UNLIMITED",
      financeGroup: "Tracking and organization", financeGroupSub: "Record, track and organize your finances.",
      businessGroup: "Business and calculations", businessGroupSub: "Tools for pricing, goals and analysis.",
      utilityGroup: "Utilities", utilityGroupSub: "Practical EduCashPro resources.",
      receivables: "Accounts Receivable", receivablesSub: "Track customers, amounts and due dates.",
      quote: "Informative Quote", quoteSub: "Create a pricing proposal without issuing an invoice.",
      salePrice: "Sale Price", salePriceSub: "Calculate price, profit and margin from costs.",
      breakEven: "Break-even Point", breakEvenSub: "Find how much you need to sell to cover costs.",
      revenueGoal: "Revenue Goal", revenueGoalSub: "Turn your profit goal into a sales target.",
      roi: "ROI", roiSub: "Calculate percentage return on an investment.",
      compound: "Advanced Compound Interest", compoundSub: "Simulate contributions, withdrawals, rate and term.",
    },
    es: {
      qrTitle: "Generador de QR", qrSub: "Convierte tu enlace en un código QR y descarga la imagen.",

      tools: "Herramientas", toolsSub: "Control financiero, cálculos, documentos informativos y utilidades.", free: "ACCESO LIBRE", trial30: "30 DÍAS GRATIS",

      affiliateCalc: "Simulador del programa de afiliados", affiliateCalcSub: "Simula cinco niveles y los requisitos de desbloqueo.",
      finance: "Control Financiero Mensual", financeSub: "Registra ingresos y gastos y controla el saldo del mes.",
      limited: "ACCESO LIMITADO", unlimited: "ILIMITADO",
      financeGroup: "Control y organización", financeGroupSub: "Registra, controla y organiza tus finanzas.",
      businessGroup: "Negocios y cálculos", businessGroupSub: "Herramientas para precios, metas y análisis.",
      utilityGroup: "Utilidades", utilityGroupSub: "Recursos prácticos de EduCashPro.",
      receivables: "Cuentas por Cobrar", receivablesSub: "Controla clientes, valores y vencimientos.",
      quote: "Presupuesto Informativo", quoteSub: "Crea una propuesta de valores sin emitir factura.",
      salePrice: "Precio de Venta", salePriceSub: "Calcula precio, beneficio y margen desde los costos.",
      breakEven: "Punto de Equilibrio", breakEvenSub: "Descubre cuánto debes vender para cubrir costos.",
      revenueGoal: "Meta de Facturación", revenueGoalSub: "Convierte tu meta de beneficio en meta de ventas.",
      roi: "ROI", roiSub: "Calcula el retorno porcentual de una inversión.",
      compound: "Interés Compuesto Avanzado", compoundSub: "Simula aportes, retiros, tasa y plazo.",
    },
    ru: {
      qrTitle: "Генератор QR-кода", qrSub: "Создайте QR-код из ссылки и скачайте изображение.",

      tools: "Инструменты", toolsSub: "Финансовый учёт, расчёты, информационные документы и утилиты.", free: "СВОБОДНЫЙ ДОСТУП", trial30: "30 ДНЕЙ БЕСПЛАТНО",

      affiliateCalc: "Симулятор партнёрской программы", affiliateCalcSub: "Пять уровней и условия их открытия.",
      finance: "Ежемесячный финансовый контроль", financeSub: "Записывайте доходы и расходы и следите за остатком.",
      limited: "ОГРАНИЧЕННЫЙ ДОСТУП", unlimited: "БЕЗ ОГРАНИЧЕНИЙ",
      financeGroup: "Учёт и организация", financeGroupSub: "Записывайте и контролируйте свои финансы.",
      businessGroup: "Бизнес и расчёты", businessGroupSub: "Инструменты для цены, целей и анализа.",
      utilityGroup: "Утилиты", utilityGroupSub: "Практические ресурсы EduCashPro.",
      receivables: "Дебиторская задолженность", receivablesSub: "Контролируйте клиентов, суммы и сроки.",
      quote: "Информационная смета", quoteSub: "Создайте предложение стоимости без выставления счёта.",
      salePrice: "Цена продажи", salePriceSub: "Рассчитайте цену, прибыль и маржу.",
      breakEven: "Точка безубыточности", breakEvenSub: "Узнайте объём продаж для покрытия расходов.",
      revenueGoal: "Цель по выручке", revenueGoalSub: "Преобразуйте цель прибыли в цель продаж.",
      roi: "ROI", roiSub: "Рассчитайте доходность инвестиции.",
      compound: "Сложные проценты", compoundSub: "Смоделируйте пополнения, снятия, ставку и срок.",
    },
  };

  let session = null;

  function currentSession() {
    return session || window.__EDUCASHPRO_SESSION__ || window.EduCashProWebEntry?.getSession?.() || {};
  }
  function language() {
    const lang = String(currentSession()?.profile?.language || "pt").slice(0,2).toLowerCase();
    return COPY[lang] ? lang : "pt";
  }
  function tr(key) { return COPY[language()][key] || COPY.pt[key] || key; }
  function esc(value) { return String(value ?? "").replace(/[&<>"']/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[char]); }
  function content() { return document.getElementById("content"); }
  function home() { document.querySelector('#bottomNav button[data-view="home"]')?.click(); }

  async function financeApi(path, payload = {}) {
    const activeSession = currentSession();
    const token = String(activeSession?.token || "").trim();
    if (!token || !/^\/api\/personal-finance\/[a-z-]+$/.test(path)) throw Error("session_expired");
    const cookieSession = token.endsWith(".cookie-session");
    const endpoint = (cookieSession ? window.location.origin : "https://educashpro-all.onrender.com") + path;
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type":"application/json",
        "Authorization":cookieSession ? "Bearer cookie-session" : "Bearer " + token
      },
      body: JSON.stringify(payload),
      cache: "no-store",
      credentials: cookieSession ? "same-origin" : "omit"
    });
    const data = await response.json().catch(() => ({}));
    if (!response.ok || data.ok === false) throw Error(data.reason || "finance_unavailable");
    return data;
  }

  function subscriptionCard() {
    return window.EduCashProApp?.openSubscription?.();
  }

  async function openFinanceControl(route="monthly-finance") {
    window.EduCashProApp?.rememberRoute?.("tools",route);
    const ticket=window.EduCashProNavigation?.stamp?.();
    const parts=route.split(":");
    content().innerHTML=`<main class="toolsHubPage"><button class="textButton" id="toolLoadBack">←</button><section class="toolsHubHero"><h1>💰 ${esc(tr("finance"))}</h1><p>${esc(tr("financeSub"))}</p><div class="empty">•••</div></section></main>`;
    document.getElementById("toolLoadBack").onclick=renderToolsHub;
    await window.EduCashProResources?.loadFinance?.();
    if(window.EduCashProNavigation && !window.EduCashProNavigation.isCurrent(ticket))return;
    const activeSession = currentSession();
    return window.EduCashProFinance?.render?.({
      language: language(),
      session: activeSession,
      active: activeSession?.profile?.active === true,
      back: renderToolsHub,
      subscribe: subscriptionCard,
      api: financeApi,
      screen: parts[1] || "intro",
      month: parts[2],
      sharedWorkspace: parts[1] === "shared" ? parts[2] : "",
      sharedMonth: parts[3]
    });
  }

  async function openFinancialTool(id) {
    window.EduCashProApp?.rememberRoute?.("tools",id);
    const ticket=window.EduCashProNavigation?.stamp?.();
    content().innerHTML=`<main class="toolsHubPage"><button class="textButton" id="toolLoadBack">←</button><section class="toolsHubHero"><div class="empty">•••</div></section></main>`;
    document.getElementById("toolLoadBack").onclick=renderToolsHub;
    await window.EduCashProResources?.loadFinancialTools?.();
    const activeSession = currentSession();
    if(window.EduCashProNavigation && !window.EduCashProNavigation.isCurrent(ticket))return;
    window.EduCashProFinancialTools?.open?.(id, {
      language: language(),
      session: activeSession,
      active: activeSession?.profile?.active === true,
      back: renderToolsHub,
      subscribe: subscriptionCard
    });
  }

  async function openQrGenerator() {
    window.EduCashProApp?.rememberRoute?.("tools","qr-code");
    const ticket=window.EduCashProNavigation?.stamp?.();
    content().innerHTML=`<main class="toolsHubPage"><button class="textButton" id="toolLoadBack">←</button><section class="toolsHubHero"><h1>▦ ${esc(tr("qrTitle"))}</h1><p>${esc(tr("qrSub"))}</p><div class="empty">•••</div></section></main>`;
    document.getElementById("toolLoadBack").onclick=renderToolsHub;
    try {
      await Promise.all([
        window.EduCashProResources.style("./qr-generator.css"),
        window.EduCashProResources.script("./vendor/qrcode.min.js")
      ]);
      await window.EduCashProResources.script("./qr-generator.js");
      if(window.EduCashProNavigation && !window.EduCashProNavigation.isCurrent(ticket))return;
      window.EduCashProQrGenerator.render({language:language(),back:renderToolsHub});
    } catch(error) {
      if(window.EduCashProNavigation && !window.EduCashProNavigation.isCurrent(ticket))return;
      renderToolsHub();
      console.warn("[EduCashPro] QR:",error?.message||error);
    }
  }

  function toolCard(id, icon, title, description, access, accessClass = "free") {
    return `<button class="toolsMenuCard" data-tool-id="${esc(id)}"><span class="toolsMenuIcon">${icon}</span><strong>${esc(title)}</strong><small>${esc(description)}</small><span class="toolsAccess"><span class="${esc(accessClass)}">${esc(access)}</span></span></button>`;
  }

  function toolsSection(title, description, cards) {
    return `<section class="toolsCategory"><header class="toolsCategoryHead"><div><h2>${esc(title)}</h2><p>${esc(description)}</p></div></header><div class="toolsMenuGrid">${cards.join("")}</div></section>`;
  }

  function renderToolsHub() {
    window.EduCashProApp?.rememberRoute?.("tools");
    window.EduCashProResources?.style?.("./tools-hub-v2.css").catch?.(()=>{});
    const active = currentSession()?.profile?.active === true;
    const access = active ? tr("unlimited") : tr("limited");
    const accessClass = active ? "unlimited" : "limited";
    const financeCards = [
      toolCard("monthly-finance","💰",tr("finance"),tr("financeSub"),tr("trial30"),"free"),
      toolCard("receivables","📥",tr("receivables"),tr("receivablesSub"),access,accessClass),
      toolCard("quote","📄",tr("quote"),tr("quoteSub"),access,accessClass)
    ];
    const businessCards = [
      toolCard("affiliate","🌐",tr("affiliateCalc"),tr("affiliateCalcSub"),tr("free"),"free")
    ];
    const utilityCards = [
      toolCard("link-page","🔗",window.EduCashProLinks?.text?.("pageTitle") || "Minha página de links",window.EduCashProLinks?.text?.("pageCardSub") || "Reúna seus links em uma página",tr("free"),"free"),
      toolCard("smart-link","✂️",window.EduCashProLinks?.text?.("shortTitle") || "Link Inteligente",window.EduCashProLinks?.text?.("shortCardSub") || "Crie links curtos com sua chamada",tr("free"),"free"),
      toolCard("qr-code","▦",tr("qrTitle"),tr("qrSub"),tr("free"),"free"),
    ];
    content().innerHTML = `<main class="toolsHubPage"><button id="toolsHubBack" class="textButton">←</button><section class="toolsHubHero"><span class="eyebrow">EDUCASHPRO</span><h1>🧰 ${esc(tr("tools"))}</h1><p>${esc(tr("toolsSub"))}</p></section>${toolsSection(tr("financeGroup"),tr("financeGroupSub"),financeCards)}${toolsSection(tr("businessGroup"),tr("businessGroupSub"),businessCards)}${toolsSection(tr("utilityGroup"),tr("utilityGroupSub"),utilityCards)}</main>`;
    document.getElementById("toolsHubBack").onclick = home;
    content().querySelectorAll("[data-tool-id]").forEach(button => button.onclick = () => {
      void Promise.resolve(openTool(button.dataset.toolId)).catch(error=>console.warn("[EduCashPro] tool navigation:",error?.message||error));
    });
  }

  const TOOL_ACCESS = {"pt": ["Sem assinatura ativa", "Com assinatura ativa", "Assinar mensal", "Ir para a ferramenta", [["Renda mensal, gastos por categoria, edição e histórico neste aparelho.", "Planejamento, metas, parcelas, recorrências, relatórios, PDF e compartilhamento com até cinco pessoas. Convidados podem editar, mas não baixar PDF nem compartilhar."], ["Até 10 contas salvas, descrição, cliente, vencimento e registro do recebimento completo.", "Contas ilimitadas, recebimentos parciais, parcelas, recorrências, relatórios, PDF, CSV e backup."], ["Até 3 orçamentos salvos, edição, prévia e PDF.", "Orçamentos ilimitados, logo, modelos, descontos, duplicação, reutilização de clientes e itens e backup."], ["Página personalizada com até 3 links, foto e endereço curto escolhido por você.", "Até 20 links, personalização visual e campanhas com estatísticas opcionais de cliques e localização."], ["Até 3 links inteligentes com endereço curto e chamada para o destino.", "Até 20 links inteligentes e campanhas com estatísticas opcionais de cliques e localização."]]], "en": ["Without an active subscription", "With an active subscription", "Subscribe monthly", "Go to the tool", [["Monthly income, expenses by category, editing and history on this device.", "Planning, goals, installments, recurring expenses, reports, PDF and sharing with up to five people. Guests may edit, but cannot download PDF or share."], ["Up to 10 saved accounts, description, customer, due date and full payment recording.", "Unlimited accounts, partial payments, installments, recurring accounts, reports, PDF, CSV and backups."], ["Up to 3 saved quotes, editing, preview and PDF.", "Unlimited quotes, logo, templates, discounts, duplication, reusable customers and items, and backups."], ["A personalized page with up to 3 links, a photo and your chosen short address.", "Up to 20 links, visual customization and campaigns with optional click and location statistics."], ["Up to 3 smart links with a short address and a destination call to action.", "Up to 20 smart links and campaigns with optional click and location statistics."]]], "es": ["Sin suscripción activa", "Con suscripción activa", "Suscribirse al mensual", "Ir a la herramienta", [["Ingresos mensuales, gastos por categoría, edición e historial en este dispositivo.", "Planificación, metas, cuotas, gastos recurrentes, informes, PDF y acceso compartido con hasta cinco personas. Los invitados pueden editar, pero no descargar PDF ni compartir."], ["Hasta 10 cuentas guardadas, descripción, cliente, vencimiento y registro del cobro completo.", "Cuentas ilimitadas, cobros parciales, cuotas, recurrencias, informes, PDF, CSV y copias de seguridad."], ["Hasta 3 presupuestos guardados, edición, vista previa y PDF.", "Presupuestos ilimitados, logo, modelos, descuentos, duplicación, clientes y conceptos reutilizables y copias de seguridad."], ["Página personalizada con hasta 3 enlaces, foto y dirección corta elegida por ti.", "Hasta 20 enlaces, personalización visual y campañas con estadísticas opcionales de clics y ubicación."], ["Hasta 3 enlaces inteligentes con dirección corta y llamada al destino.", "Hasta 20 enlaces inteligentes y campañas con estadísticas opcionales de clics y ubicación."]]], "ru": ["Без активной подписки", "С активной подпиской", "Оформить месячную подписку", "Перейти к инструменту", [["Ежемесячный доход, расходы по категориям, редактирование и история на этом устройстве.", "Планирование, цели, рассрочки, регулярные расходы, отчёты, PDF и совместный доступ для пяти человек. Гости могут редактировать, но не скачивать PDF и не делиться доступом."], ["До 10 сохранённых счетов, описание, клиент, срок оплаты и запись полной оплаты.", "Неограниченные счета, частичные оплаты, рассрочки, повторения, отчёты, PDF, CSV и резервные копии."], ["До 3 сохранённых смет, редактирование, просмотр и PDF.", "Неограниченные сметы, логотип, шаблоны, скидки, дублирование, сохранённые клиенты и позиции, резервные копии."], ["Персональная страница с 3 ссылками, фотографией и выбранным коротким адресом.", "До 20 ссылок, оформление и кампании с необязательной статистикой кликов и местоположения."], ["До 3 умных ссылок с коротким адресом и переходом к назначению.", "До 20 умных ссылок и кампании с необязательной статистикой кликов и местоположения."]]]};
  const ACCESS_TOOLS = ["monthly-finance", "receivables", "quote", "link-page", "smart-link"];
  function renderToolAccess(id) {
    const labels=TOOL_ACCESS[language()] || TOOL_ACCESS.pt;
    const detail=labels[4][ACCESS_TOOLS.indexOf(id)];
    const title=({"link-page": {pt:"Minha página de links",en:"My link page",es:"Mi página de enlaces",ru:"Моя страница ссылок"},"smart-link":{pt:"Link Inteligente",en:"Smart Link",es:"Enlace Inteligente",ru:"Умная ссылка"}})[id]?.[language()] || tr(({"monthly-finance":"finance",receivables:"receivables",quote:"quote","link-page":"tools","smart-link":"tools"})[id]);
    window.EduCashProApp?.rememberRoute?.("tools",id);
    content().innerHTML=`<main class="toolsHubPage"><button class="textButton" id="accessBack">← ${esc(({pt:"Voltar",en:"Back",es:"Volver",ru:"Назад"})[language()])}</button><section class="toolsHubHero"><h1>${esc(title)}</h1><article><h2>${esc(labels[0])}</h2><p>${esc(detail[0])}</p></article><article><h2>${esc(labels[1])}</h2><p>${esc(detail[1])}</p></article><div style="display:grid;gap:12px;grid-template-columns:repeat(auto-fit,minmax(min(100%,220px),1fr))"><button class="wideButton" id="accessSubscribe">${esc(labels[2])}</button><button class="secondaryButton" id="accessContinue">${esc(labels[3])}</button></div></section></main>`;
    document.getElementById("accessBack").onclick=renderToolsHub;
    document.getElementById("accessSubscribe").onclick=subscriptionCard;
    document.getElementById("accessContinue").onclick=()=>openTool(id,true);
  }

  async function openTool(id, skipAccess=false){
    if(id!=='link-page')return window.EduCashProApp?.renderTools?.();

    const task=openToolImpl(id,skipAccess);
    const ticket=window.EduCashProNavigation?.stamp?.();
    try { return await task; } catch(error) {
      if(window.EduCashProNavigation && !window.EduCashProNavigation.isCurrent(ticket))return;
      console.warn("[EduCashPro] tool:",error?.message||error);
      if(document.getElementById("toolLoadBack"))renderToolsHub();
    }
  }

  async function openToolImpl(id, skipAccess=false){
    if(!skipAccess && id !== "monthly-finance" && ACCESS_TOOLS.includes(id) && currentSession()?.profile?.active !== true && window.EduCashProAccess?.isActive?.() !== true)return renderToolAccess(id);
    if(skipAccess && id === "monthly-finance")return openFinanceControl("monthly-finance:overview");
    if(id.startsWith("monthly-finance"))return openFinanceControl(id);
    if(["receivables","quote"].includes(id))return openFinancialTool(id);
    if(id==="qr-code")return openQrGenerator();
    if(id==="affiliate")return openAffiliateCalculator();
    if(["games","randomizers","analysis"].includes(id))return window.EduCashProApp?.openMarkets?.();
    if(["link-page","smart-link"].includes(id)){
      window.EduCashProApp?.rememberRoute?.("tools",id);
      const ticket=window.EduCashProNavigation?.stamp?.();
      content().innerHTML=`<main class="toolsHubPage"><button class="textButton" id="toolLoadBack">←</button><section class="toolsHubHero"><div class="empty">•••</div></section></main>`;
      document.getElementById("toolLoadBack").onclick=renderToolsHub;
      await window.EduCashProResources?.loadLinks?.();
      if(window.EduCashProNavigation && !window.EduCashProNavigation.isCurrent(ticket))return;
      const action=id==="link-page"?window.EduCashProLinks?.renderPageEditor:window.EduCashProLinks?.renderShortener;
      return action?.({back:renderToolsHub});
    }
    return renderToolsHub();
  }

  function enhanceHome() {
    const intro = document.getElementById("openPresentation");
    const grid = intro?.parentElement?.querySelector(".quickGrid");
    if (!grid) return;
    grid.querySelectorAll('[data-target="tools"], [data-visitor-tools="1"]').forEach((button) => {
      button.classList.remove("lockedExperience");
      button.dataset.localToolsReady = "1";
      button.onclick = () => window.EduCashProApp?.renderTools?.();
    });
  }

  const observer = new MutationObserver(() => queueMicrotask(enhanceHome));
  observer.observe(document.documentElement, { childList: true, subtree: true });
  document.addEventListener("DOMContentLoaded", enhanceHome);

  window.EduCashProLocal = { renderToolsHub, openTool, setSession(value){session=value||session;queueMicrotask(enhanceHome)} };
})();


