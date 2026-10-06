(function () {
  "use strict";
  const COPY = {
    pt: {
      title: "Controle Financeiro Mensal",
      intro:
        "Registre sua renda e acompanhe quanto ainda está disponível no mês.",
      income: "Renda",
      spent: "Gastos",
      balance: "Disponível",
      month: "Mês",
      setIncome: "Definir renda",
      addExpense: "Adicionar gasto",
      value: "Valor",
      category: "Tipo de gasto",
      saveIncome: "Salvar renda",
      saveExpense: "Registrar gasto",
      updateExpense: "Atualizar gasto",
      history: "Histórico do mês",
      empty: "Nenhum gasto registrado neste mês.",
      edit: "Editar",
      remove: "Excluir",
      export: "Exportar histórico",
      local: "Os dados ficam somente neste aparelho.",
      invalid: "Digite um valor válido.",
      choose: "Escolha o tipo de gasto.",
      confirm: "Excluir este gasto?",
      locked: "Ferramenta exclusiva para assinantes ativos",
      activate: "Ativar assinatura",
      back: "Voltar às ferramentas",
      comma: ",",
      categories: [
        ["housing", "🏠", "Moradia"],
        ["food", "🍽️", "Alimentação"],
        ["transport", "🚗", "Transporte"],
        ["health", "❤️", "Saúde"],
        ["education", "📚", "Educação"],
        ["debts", "💳", "Dívidas"],
        ["leisure", "🎉", "Lazer"],
        ["investment", "📈", "Investimentos"],
        ["other", "•••", "Outros"],
      ],
    },
    en: {
      title: "Monthly Finance Control",
      intro:
        "Record your income and track how much remains available during the month.",
      income: "Income",
      spent: "Expenses",
      balance: "Available",
      month: "Month",
      setIncome: "Set income",
      addExpense: "Add expense",
      value: "Amount",
      category: "Expense type",
      saveIncome: "Save income",
      saveExpense: "Record expense",
      updateExpense: "Update expense",
      history: "Monthly history",
      empty: "No expenses recorded this month.",
      edit: "Edit",
      remove: "Delete",
      export: "Export history",
      local: "Data stays only on this device.",
      invalid: "Enter a valid amount.",
      choose: "Choose an expense type.",
      confirm: "Delete this expense?",
      locked: "Active subscribers only",
      activate: "Activate subscription",
      back: "Back to tools",
      comma: ".",
      categories: [
        ["housing", "🏠", "Housing"],
        ["food", "🍽️", "Food"],
        ["transport", "🚗", "Transport"],
        ["health", "❤️", "Health"],
        ["education", "📚", "Education"],
        ["debts", "💳", "Debt"],
        ["leisure", "🎉", "Leisure"],
        ["investment", "📈", "Investments"],
        ["other", "•••", "Other"],
      ],
    },
    es: {
      title: "Control Financiero Mensual",
      intro:
        "Registra tus ingresos y controla cuánto queda disponible durante el mes.",
      income: "Ingresos",
      spent: "Gastos",
      balance: "Disponible",
      month: "Mes",
      setIncome: "Definir ingresos",
      addExpense: "Agregar gasto",
      value: "Valor",
      category: "Tipo de gasto",
      saveIncome: "Guardar ingresos",
      saveExpense: "Registrar gasto",
      updateExpense: "Actualizar gasto",
      history: "Historial del mes",
      empty: "No hay gastos registrados este mes.",
      edit: "Editar",
      remove: "Eliminar",
      export: "Exportar historial",
      local: "Los datos quedan solamente en este dispositivo.",
      invalid: "Introduce un valor válido.",
      choose: "Elige el tipo de gasto.",
      confirm: "¿Eliminar este gasto?",
      locked: "Herramienta exclusiva para suscriptores activos",
      activate: "Activar suscripción",
      back: "Volver a herramientas",
      comma: ",",
      categories: [
        ["housing", "🏠", "Vivienda"],
        ["food", "🍽️", "Alimentación"],
        ["transport", "🚗", "Transporte"],
        ["health", "❤️", "Salud"],
        ["education", "📚", "Educación"],
        ["debts", "💳", "Deudas"],
        ["leisure", "🎉", "Ocio"],
        ["investment", "📈", "Inversiones"],
        ["other", "•••", "Otros"],
      ],
    },
    ru: {
      title: "Ежемесячный финансовый контроль",
      intro: "Укажите доход и следите за остатком средств в течение месяца.",
      income: "Доход",
      spent: "Расходы",
      balance: "Остаток",
      month: "Месяц",
      setIncome: "Указать доход",
      addExpense: "Добавить расход",
      value: "Сумма",
      category: "Категория расхода",
      saveIncome: "Сохранить доход",
      saveExpense: "Записать расход",
      updateExpense: "Обновить расход",
      history: "История за месяц",
      empty: "В этом месяце расходов пока нет.",
      edit: "Изменить",
      remove: "Удалить",
      export: "Экспорт истории",
      local: "Данные хранятся только на этом устройстве.",
      invalid: "Введите корректную сумму.",
      choose: "Выберите категорию расхода.",
      confirm: "Удалить этот расход?",
      locked: "Только для активных подписчиков",
      activate: "Активировать подписку",
      back: "Назад к инструментам",
      comma: ",",
      categories: [
        ["housing", "🏠", "Жильё"],
        ["food", "🍽️", "Питание"],
        ["transport", "🚗", "Транспорт"],
        ["health", "❤️", "Здоровье"],
        ["education", "📚", "Образование"],
        ["debts", "💳", "Долги"],
        ["leisure", "🎉", "Досуг"],
        ["investment", "📈", "Инвестиции"],
        ["other", "•••", "Другое"],
      ],
    },
  };

  const TEXT = {
    pt: {
      title: "Controle de Gastos",
      lead: "Seu dinheiro, com clareza.",
      intro:
        "Registre entradas e saídas, planeje o mês e acompanhe suas escolhas. Um controle simples para você, seu casal ou sua família.",
      free: "Acesso básico",
      premium: "Assinatura ativa",
      basic:
        "Renda mensal, registro e edição de gastos por categoria e histórico neste aparelho.",
      full: "Planejamento, metas, parcelas, despesas recorrentes, relatórios, PDF e compartilhamento com até cinco pessoas, ativas ou inativas.",
      guest:
        "Convidados podem adicionar, editar e excluir registros. Não podem baixar PDF nem compartilhar este controle.",
      start: "Abrir meu controle",
      subscribe: "Ver opções de assinatura",
      about: "Como funciona",
      overview: "Visão geral",
      entries: "Lançamentos",
      plan: "Planejamento",
      reports: "Relatórios",
      currency: "Moeda",
      currencyHelp:
        "A moeda identifica os valores. Não faz conversão; mantenha uma moeda por mês.",
      pending: "A pagar",
      cash: "Saldo após pagamentos",
      forecast: "Saldo previsto",
      description: "Descrição",
      date: "Data / vencimento",
      paid: "Pago",
      unpaid: "A pagar",
      once: "Único",
      recurring: "Recorrente",
      installments: "Parcelado",
      count: "Número de meses / parcelas",
      scheduleHelp:
        "Recorrente: este valor em cada mês. Parcelado: valor total dividido entre as parcelas.",
      cancel: "Cancelar",
      status: "Situação",
      all: "Todos",
      search: "Buscar descrição",
      limit: "Limite por categoria",
      goal: "Meta de economia",
      target: "Valor da meta",
      saved: "Valor reservado",
      name: "Nome",
      save: "Salvar",
      emptyPlan: "Crie um limite ou uma meta para acompanhar seu planejamento.",
      remaining: "Restante",
      exceeded: "Acima do limite",
      distribution: "Gastos por categoria",
      comparison: "Últimos seis meses",
      how: "1. Defina a renda do mês. 2. Registre seus gastos. 3. Acompanhe o saldo e as contas a pagar. Com assinatura, planeje limites e metas.",
      local:
        "Registros pessoais salvos neste aparelho. O controle compartilhado é acessado pela seção abaixo.",
      error:
        "Não foi possível salvar. Verifique os campos ou o espaço disponível no aparelho.",
      months: "Meses",
      addIncome: "Adicionar à renda",
      replaceIncome: "Definir renda total",
      savedOk: "Salvo.",
      premiumOnly: "Esta função está disponível com assinatura ativa.",
      due: "Próximos vencimentos",
      noDue: "Nenhuma conta pendente neste mês.",
      total: "Total",
      confirm: "Excluir este registro?",
      basicHint:
        "O acesso básico continua disponível. Assine para usar planejamento, relatórios, PDF e compartilhar.",
      empty: "Nenhum lançamento neste mês.",
    },
    en: {
      title: "Expense Control",
      lead: "Your money, clearly.",
      intro:
        "Record income and expenses, plan your month and understand your choices. A simple tool for you, your partner or your family.",
      free: "Basic access",
      premium: "Active subscription",
      basic:
        "Monthly income, recording and editing categorized expenses, and history on this device.",
      full: "Planning, goals, installments, recurring expenses, reports, PDF and sharing with up to five people, subscribed or not.",
      guest:
        "Guests can add, edit and delete entries. They cannot download PDF or share this control.",
      start: "Open my control",
      subscribe: "View subscription options",
      about: "How it works",
      overview: "Overview",
      entries: "Entries",
      plan: "Planning",
      reports: "Reports",
      currency: "Currency",
      currencyHelp:
        "Currency labels amounts. It does not convert them; keep one currency per month.",
      pending: "To pay",
      cash: "Balance after payments",
      forecast: "Projected balance",
      description: "Description",
      date: "Date / due date",
      paid: "Paid",
      unpaid: "To pay",
      once: "One-time",
      recurring: "Recurring",
      installments: "Installments",
      count: "Number of months / installments",
      scheduleHelp:
        "Recurring: this amount each month. Installments: total amount divided across installments.",
      cancel: "Cancel",
      status: "Status",
      all: "All",
      search: "Search description",
      limit: "Category limit",
      goal: "Savings goal",
      target: "Goal amount",
      saved: "Amount set aside",
      name: "Name",
      save: "Save",
      emptyPlan: "Create a limit or a goal to track your plan.",
      remaining: "Remaining",
      exceeded: "Over budget",
      distribution: "Spending by category",
      comparison: "Last six months",
      how: "1. Set monthly income. 2. Record expenses. 3. Track your balance and bills. With a subscription, plan limits and goals.",
      local:
        "Personal entries saved on this device. Open shared controls in the section below.",
      error: "Could not save. Check the fields or available device storage.",
      months: "Months",
      addIncome: "Add to income",
      replaceIncome: "Set total income",
      savedOk: "Saved.",
      premiumOnly: "This feature requires an active subscription.",
      due: "Upcoming bills",
      noDue: "No pending bills this month.",
      total: "Total",
      confirm: "Delete this entry?",
      basicHint:
        "Basic access remains available. Subscribe for planning, reports, PDF and sharing.",
      empty: "No entries this month.",
    },
    es: {
      title: "Control de Gastos",
      lead: "Tu dinero, con claridad.",
      intro:
        "Registra ingresos y gastos, planifica el mes y entiende tus decisiones. Un control sencillo para ti, tu pareja o tu familia.",
      free: "Acceso básico",
      premium: "Suscripción activa",
      basic:
        "Ingresos mensuales, registro y edición de gastos por categoría e historial en este dispositivo.",
      full: "Planificación, metas, cuotas, gastos recurrentes, informes, PDF y acceso compartido con hasta cinco personas, suscritas o no.",
      guest:
        "Los invitados pueden agregar, editar y eliminar registros. No pueden descargar PDF ni compartir este control.",
      start: "Abrir mi control",
      subscribe: "Ver opciones de suscripción",
      about: "Cómo funciona",
      overview: "Vista general",
      entries: "Registros",
      plan: "Planificación",
      reports: "Informes",
      currency: "Moneda",
      currencyHelp:
        "La moneda identifica los importes. No los convierte; utiliza una moneda por mes.",
      pending: "Por pagar",
      cash: "Saldo tras los pagos",
      forecast: "Saldo previsto",
      description: "Descripción",
      date: "Fecha / vencimiento",
      paid: "Pagado",
      unpaid: "Por pagar",
      once: "Único",
      recurring: "Recurrente",
      installments: "Cuotas",
      count: "Número de meses / cuotas",
      scheduleHelp:
        "Recurrente: este importe cada mes. Cuotas: importe total dividido entre las cuotas.",
      cancel: "Cancelar",
      status: "Estado",
      all: "Todos",
      search: "Buscar descripción",
      limit: "Límite por categoría",
      goal: "Meta de ahorro",
      target: "Importe de la meta",
      saved: "Importe reservado",
      name: "Nombre",
      save: "Guardar",
      emptyPlan: "Crea un límite o una meta para seguir tu planificación.",
      remaining: "Restante",
      exceeded: "Límite superado",
      distribution: "Gastos por categoría",
      comparison: "Últimos seis meses",
      how: "1. Define los ingresos del mes. 2. Registra los gastos. 3. Sigue el saldo y las cuentas pendientes. Con suscripción, planifica límites y metas.",
      local:
        "Registros personales guardados en este dispositivo. Accede a los controles compartidos más abajo.",
      error:
        "No se pudo guardar. Revisa los campos o el espacio del dispositivo.",
      months: "Meses",
      addIncome: "Agregar a los ingresos",
      replaceIncome: "Definir ingresos totales",
      savedOk: "Guardado.",
      premiumOnly: "Esta función requiere una suscripción activa.",
      due: "Próximos vencimientos",
      noDue: "No hay cuentas pendientes este mes.",
      total: "Total",
      confirm: "¿Eliminar este registro?",
      basicHint:
        "El acceso básico sigue disponible. Suscríbete para planificación, informes, PDF y acceso compartido.",
      empty: "No hay registros este mes.",
    },
    ru: {
      title: "Учёт расходов",
      lead: "Ваши деньги — наглядно.",
      intro:
        "Записывайте доходы и расходы, планируйте месяц и следите за бюджетом. Удобный инструмент для вас, пары или семьи.",
      free: "Базовый доступ",
      premium: "Активная подписка",
      basic:
        "Доход за месяц, запись и изменение расходов по категориям, история на этом устройстве.",
      full: "Планирование, цели, рассрочка, регулярные расходы, отчёты, PDF и общий доступ для пяти человек с подпиской или без неё.",
      guest:
        "Участники могут добавлять, изменять и удалять записи. Скачивание PDF и предоставление доступа другим недоступны.",
      start: "Открыть мой учёт",
      subscribe: "Варианты подписки",
      about: "Как пользоваться",
      overview: "Обзор",
      entries: "Записи",
      plan: "Планирование",
      reports: "Отчёты",
      currency: "Валюта",
      currencyHelp:
        "Валюта обозначает суммы, но не конвертирует их. Используйте одну валюту на месяц.",
      pending: "К оплате",
      cash: "Остаток после оплат",
      forecast: "Прогноз остатка",
      description: "Описание",
      date: "Дата / срок оплаты",
      paid: "Оплачено",
      unpaid: "К оплате",
      once: "Разовый",
      recurring: "Регулярный",
      installments: "Рассрочка",
      count: "Число месяцев / платежей",
      scheduleHelp:
        "Регулярный: эта сумма каждый месяц. Рассрочка: общая сумма делится между платежами.",
      cancel: "Отмена",
      status: "Статус",
      all: "Все",
      search: "Поиск по описанию",
      limit: "Лимит категории",
      goal: "Цель накопления",
      target: "Сумма цели",
      saved: "Отложено",
      name: "Название",
      save: "Сохранить",
      emptyPlan: "Создайте лимит или цель для контроля плана.",
      remaining: "Осталось",
      exceeded: "Лимит превышен",
      distribution: "Расходы по категориям",
      comparison: "Последние шесть месяцев",
      how: "1. Укажите доход за месяц. 2. Записывайте расходы. 3. Следите за остатком и счетами. Подписка добавляет лимиты и цели.",
      local:
        "Личные записи хранятся на этом устройстве. Общий учёт доступен в разделе ниже.",
      error:
        "Не удалось сохранить. Проверьте поля и свободное место на устройстве.",
      months: "Месяцы",
      addIncome: "Добавить к доходу",
      replaceIncome: "Указать общий доход",
      savedOk: "Сохранено.",
      premiumOnly: "Эта функция доступна с активной подпиской.",
      due: "Ближайшие платежи",
      noDue: "В этом месяце нет неоплаченных счетов.",
      total: "Итого",
      confirm: "Удалить запись?",
      basicHint:
        "Базовый доступ остаётся доступным. Подписка добавляет планирование, отчёты, PDF и общий доступ.",
      empty: "В этом месяце записей нет.",
    },
  };
  const M = window.EduCashProFinanceModel;
  let options = {},
    month = "",
    tab = "overview",
    editing = "",
    filter = "",
    search = "",
    notice = "";
  const esc = (v) =>
    String(v ?? "").replace(
      /[&<>"']/g,
      (c) =>
        ({
          "&": "&amp;",
          "<": "&lt;",
          ">": "&gt;",
          '"': "&quot;",
          "'": "&#39;",
        })[c],
    );
  const t = () => TEXT[options.language] || TEXT.pt;
  const c = () => COPY[options.language] || COPY.pt;
  const currentMonth = () => {
    const d = new Date();
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
  };
  const storageKey = () =>
    `educashpro:monthly-finance:${options.session?.profile?.userId || options.session?.profile?.tgId || "local"}`;
  function read() {
    try {
      const v = JSON.parse(localStorage.getItem(storageKey()) || "{}");
      return v && typeof v === "object" && !Array.isArray(v) ? v : {};
    } catch {
      return {};
    }
  }
  function write(data) {
    try {
      localStorage.setItem(storageKey(), JSON.stringify(data));
      if (options.active) localStorage.setItem(storageKey() + ":pending", "1");
      if (options.active)
        window.EduCashProFinanceShare?.sync?.(data)?.catch?.(() => {});
      return true;
    } catch {
      notice = t().error;
      return false;
    }
  }
  const record = () => M.normalize(read()[month]);
  const currency = () => record().currency || "USD";
  const fmt = (v, cur = currency()) =>
    new Intl.NumberFormat(
      options.language === "pt" ? "pt-BR" : options.language,
      { style: "currency", currency: cur },
    ).format(Number(v || 0));
  const category = (id) =>
    c().categories.find((x) => x[0] === id) || c().categories.at(-1);
  const cats = () =>
    c()
      .categories.map(
        (x) => `<option value="${x[0]}">${esc(x[1] + " " + x[2])}</option>`,
      )
      .join("");
  const amountInput = (id, label, value = "", required = true) =>
    `<label>${esc(label)}<input id="${id}" type="text" inputmode="decimal" maxlength="20" value="${esc(value)}" ${required ? "required" : ""}></label>`;
  const premiumGate = () =>
    `<section class="financePanel"><h2>🔒 ${esc(t().premium)}</h2><p>${esc(t().full)}</p><button class="wideButton" data-subscribe>${esc(t().subscribe)}</button></section>`;
  function summary(r) {
    const sum = M.totals(r);
    return `<section class="financeSummary">${[
      [c().income, r.income],
      [c().spent, sum.spent],
      [t().forecast, sum.balance],
      [t().pending, sum.pending],
    ]
      .map(
        ([label, value]) =>
          `<article class="${value < 0 ? "negative" : ""}"><small>${esc(label)}</small><strong title="${esc(fmt(value))}">${esc(fmt(value))}</strong></article>`,
      )
      .join("")}</section>`;
  }
  function history(r, limited = false) {
    let rows = r.expenses.filter(
      (x) =>
        (!filter || x.category === filter) &&
        (!search ||
          String(x.description || category(x.category)[2])
            .toLocaleLowerCase()
            .includes(search.toLocaleLowerCase())),
    );
    if (limited) rows = rows.slice(0, 5);
    return rows.length
      ? rows
          .map(
            (x) =>
              `<article class="financeHistoryItem"><span>${category(x.category)[1]}</span><div><strong>${esc(x.description || category(x.category)[2])}</strong><small>${esc(category(x.category)[2])} · ${esc(x.date || new Date(x.createdAt).toLocaleDateString(options.language))}${x.installments ? " · " + x.installment + "/" + x.installments : ""}</small><small>${esc(x.paid === false ? t().unpaid : t().paid)}</small></div><b>${esc(fmt(x.amount))}</b><div class="financeRowActions"><button data-edit="${esc(x.id)}" aria-label="${esc(c().edit)}">✎</button><button data-remove="${esc(x.id)}" aria-label="${esc(c().remove)}">×</button>${x.paid === false ? `<button data-paid="${esc(x.id)}" aria-label="${esc(t().paid)}">✓</button>` : ""}</div></article>`,
          )
          .join("")
      : `<p class="empty">${esc(t().empty)}</p>`;
  }
  function renderIntroduction() {
    window.EduCashProApp?.rememberRoute?.("tools", "monthly-finance");
    const l = t();
    document.getElementById("content").innerHTML =
      `<main class="financeControl"><button class="textButton" id="financeBack">← ${esc(c().back)}</button><section class="financeWelcome"><span class="financeEyebrow">${esc(l.title)}</span><h1>${esc(l.lead)}</h1><p>${esc(l.intro)}</p><div class="financeAccessGrid"><article><h2>${esc(l.free)}</h2><p>${esc(l.basic)}</p></article><article class="financeAccessActive"><h2>${esc(l.premium)}</h2><p>${esc(l.full)}</p></article></div><p class="financeHint">👥 ${esc(l.guest)}</p><div class="financeWelcomeActions"><button id="financeStart" class="wideButton">${esc(l.start)} →</button>${options.active ? "" : `<button data-subscribe class="secondaryButton">${esc(l.subscribe)}</button>`}</div></section><section class="financePanel"><h2>${esc(l.about)}</h2><p>${esc(l.how)}</p></section><div id="financeSharedAccess"></div></main>`;
    document.getElementById("financeStart").onclick = () => renderPage();
    document.getElementById("financeBack").onclick = () => options.back?.();
    bindSubscribe();
    window.EduCashProFinanceShare?.bind?.({
      record: record(),
      month,
      categories: c().categories,
    });
  }
  function entryForm(r) {
    const x = r.expenses.find((x) => x.id === editing) || {};
    return `<section class="financePanel"><h2>${esc(editing ? c().edit : c().addExpense)}</h2><form id="financeExpenseForm" class="financeForm"><div class="financeFormGrid">${amountInput("expenseAmount", c().value, x.amount || "")}<label>${esc(c().category)}<select id="expenseCategory" required><option value="">—</option>${cats()}</select></label><label>${esc(t().description)}<input id="expenseDescription" maxlength="160" value="${esc(x.description || "")}"></label><label>${esc(t().date)}<input id="expenseDate" type="date" required value="${esc(x.date || M.dateInMonth(month, new Date().getDate()))}"></label><label>${esc(t().status)}<select id="expensePaid"><option value="true">${esc(t().paid)}</option><option value="false">${esc(t().unpaid)}</option></select></label>${options.active && !editing ? `<label>${esc(t().once + " / " + t().recurring)}<select id="expenseKind"><option value="once">${esc(t().once)}</option><option value="recurring">${esc(t().recurring)}</option><option value="installments">${esc(t().installments)}</option></select></label><label id="expenseCountLabel" hidden>${esc(t().count)}<input id="expenseCount" type="number" min="1" max="120" value="12"></label>` : ""}</div>${options.active && !editing ? `<p id="financeScheduleHelp" class="financeHint" hidden>${esc(t().scheduleHelp)}</p>` : ""}<div class="financeFormActions"><button class="wideButton" type="submit">${esc(editing ? c().updateExpense : c().saveExpense)}</button>${editing ? `<button type="button" id="cancelExpense" class="secondaryButton">${esc(t().cancel)}</button>` : ""}</div></form></section>`;
  }
  function overview(r) {
    const pending = r.expenses
      .filter((x) => x.paid === false)
      .sort((a, b) => String(a.date || "").localeCompare(String(b.date || "")))
      .slice(0, 5);
    return `${summary(r)}<div class="financeWelcomeActions"><button id="financeAdd" class="wideButton">＋ ${esc(c().addExpense)}</button></div><section class="financePanel"><h2>${esc(t().due)}</h2>${pending.length ? pending.map((x) => `<div class="financeMetric"><span>${esc(x.description || category(x.category)[2])}<small>${esc(x.date || "")}</small></span><b>${esc(fmt(x.amount))}</b></div>`).join("") : `<p>${esc(t().noDue)}</p>`}</section><section class="financePanel"><h2>${esc(c().history)}</h2>${history(r, true)}</section>`;
  }
  function planning(r) {
    if (!options.active) return premiumGate();
    const spent = Object.fromEntries(
      M.byCategory(r).map((x) => [x.id, x.amount]),
    );
    return `<section class="financePanel"><h2>${esc(t().limit)}</h2><form id="financeBudgetForm" class="financeForm"><div class="financeFormGrid"><label>${esc(c().category)}<select id="budgetCategory">${cats()}</select></label>${amountInput("budgetAmount", t().limit)}</div><button class="wideButton">${esc(t().save)}</button></form>${Object.entries(
      r.budgets,
    )
      .map(([id, value]) => {
        const use = spent[id] || 0;
        return `<div class="financeMetric"><span>${esc(category(id)[2])}<small>${esc(fmt(use))} / ${esc(fmt(value))}</small><progress max="${Number(value) || 1}" value="${Math.min(value, use)}"></progress></span><b class="${use > value ? "financeNegative" : ""}">${esc(use > value ? t().exceeded : t().remaining)}<small>${esc(fmt(Math.abs(value - use)))}</small></b><button data-budget-remove="${esc(id)}" aria-label="${esc(c().remove)}">×</button></div>`;
      })
      .join(
        "",
      )}</section><section class="financePanel"><h2>${esc(t().goal)}</h2><form id="financeGoalForm" class="financeForm"><label>${esc(t().name)}<input id="goalName" required maxlength="100"></label><div class="financeFormGrid">${amountInput("goalTarget", t().target)}${amountInput("goalSaved", t().saved, "0")}</div><button class="wideButton">${esc(t().save)}</button></form>${r.goals.map((g) => `<div class="financeMetric"><span>${esc(g.name)}<small>${esc(fmt(g.saved))} / ${esc(fmt(g.target))}</small><progress max="${g.target}" value="${Math.min(g.saved, g.target)}"></progress></span><button data-goal="${esc(g.id)}">✎</button><button data-goal-remove="${esc(g.id)}">×</button></div>`).join("")}</section>`;
  }
  function reports(r) {
    if (!options.active) return premiumGate();
    const sum = M.totals(r),
      cats = M.byCategory(r);
    const data = read();
    return `<section class="financePanel"><h2>${esc(t().distribution)}</h2>${cats.map((x) => `<div class="financeMetric"><span>${esc(category(x.id)[2])}<progress max="${sum.spent || 1}" value="${x.amount}"></progress></span><b>${esc(fmt(x.amount))}<small>${sum.spent ? Math.round((x.amount / sum.spent) * 100) : 0}%</small></b></div>`).join("") || `<p>${esc(t().empty)}</p>`}</section><section class="financePanel"><h2>${esc(t().comparison)}</h2>${Array.from(
      { length: 6 },
      (_, i) => M.shiftMonth(month, i - 5),
    )
      .map((key) => {
        const row = M.normalize(data[key]),
          s = M.totals(row);
        return `<div class="financeMetric"><span>${esc(key)}<small>${esc(row.currency || "USD")}</small></span><span>${esc(c().income)}<small>${esc(fmt(row.income, row.currency || "USD"))}</small></span><span>${esc(c().spent)}<small>${esc(fmt(s.spent, row.currency || "USD"))}</small></span></div>`;
      })
      .join("")}</section>`;
  }
  function renderPage() {
    window.EduCashProApp?.rememberRoute?.(
      "tools",
      `monthly-finance:${tab}:${month}`,
    );
    const r = record(),
      l = t();
    document.getElementById("content").innerHTML =
      `<main class="financeControl"><button id="financeBack" class="textButton">← ${esc(c().back)}</button><header class="financeHero"><span>💰</span><div><h1>${esc(l.title)}</h1><p>${esc(l.lead)}</p></div></header><button id="financeAbout" class="textButton">ⓘ ${esc(l.about)}</button><div class="financeToolbar"><label class="financeMonth">${esc(c().month)}<input id="financeMonth" type="month" value="${month}"></label><label class="financeMonth">${esc(l.currency)}<select id="financeCurrency">${["USD", "BRL", "EUR", "GBP", "RUB", "MXN", "ARS", "CLP", "COP", "PEN", "CAD", "AUD", "CHF", "JPY", "CNY", "INR"].map((cur) => `<option value="${cur}" ${cur === currency() ? "selected" : ""}>${cur}</option>`).join("")}</select></label></div><p class="financeHint">${esc(l.currencyHelp)}</p><nav class="financeTabs" aria-label="${esc(l.title)}">${["overview", "entries", "plan", "reports"].map((id) => `<button data-tab="${id}" aria-pressed="${tab === id}">${!options.active && ["plan", "reports"].includes(id) ? "🔒 " : ""}${esc(l[id])}</button>`).join("")}</nav><p id="financeNotice" role="status">${esc(notice)}</p>${tab === "overview" ? overview(r) : tab === "entries" ? `<details class="financePanel"><summary>${esc(c().setIncome)}</summary><form id="financeIncomeForm" class="financeForm">${amountInput("incomeAmount", c().income, r.income)}<label><select id="incomeOperation"><option value="set">${esc(l.replaceIncome)}</option><option value="add">${esc(l.addIncome)}</option></select></label><button class="wideButton">${esc(c().saveIncome)}</button></form></details>${entryForm(r)}<section class="financePanel"><h2>${esc(c().history)}</h2><div class="financeFormGrid"><label>${esc(l.search)}<input id="financeSearch" value="${esc(search)}" maxlength="160"></label><label>${esc(c().category)}<select id="financeFilter"><option value="">${esc(l.all)}</option>${cats()}</select></label></div><div id="financeHistoryList">${history(r)}</div></section>` : tab === "plan" ? planning(r) : reports(r)}<section class="financeShareFooter"><p class="financeHint">${esc(l.local)}</p><section class="financePremiumPanel"><h2>${esc(options.active ? l.premium : l.free)}</h2><p>${esc(options.active ? l.guest : l.basicHint)}</p><div class="financePremiumActions"><button id="financeShareAction">👥 ${esc(l.full)}</button><button id="financePdfAction">PDF</button></div></section><div id="financeSharedAccess"></div></section></main>`;
    bind(r);
    window.EduCashProFinanceShare?.bind?.({
      record: r,
      month,
      categories: c().categories,
    });
  }
  function bindSubscribe() {
    document
      .querySelectorAll("[data-subscribe]")
      .forEach((b) => (b.onclick = () => options.subscribe?.()));
  }
  function saveMonth(r) {
    const data = read();
    data[month] = r;
    if (write(data)) {
      notice = t().savedOk;
      renderPage();
    }
  }
  function bind(r) {
    bindSubscribe();
    document.getElementById("financeBack").onclick = () => options.back?.();
    document.getElementById("financeAbout").onclick = renderIntroduction;
    document.getElementById("financeMonth").onchange = (e) => {
      if (/^\d{4}-(0[1-9]|1[0-2])$/.test(e.target.value)) {
        month = e.target.value;
        editing = "";
        notice = "";
        renderPage();
      }
    };
    document.getElementById("financeCurrency").onchange = (e) => {
      r.currency = e.target.value;
      saveMonth(r);
    };
    document.querySelectorAll("[data-tab]").forEach(
      (b) =>
        (b.onclick = () => {
          tab = b.dataset.tab;
          notice = "";
          editing = "";
          renderPage();
        }),
    );
    document.getElementById("financeAdd")?.addEventListener("click", () => {
      tab = "entries";
      renderPage();
      document.getElementById("expenseAmount")?.focus();
    });
    bindRows(r);
    const income = document.getElementById("financeIncomeForm");
    if (income)
      income.onsubmit = (e) => {
        e.preventDefault();
        const v = M.parseAmount(document.getElementById("incomeAmount").value);
        if (!Number.isFinite(v)) return error();
        r.income =
          document.getElementById("incomeOperation").value === "add"
            ? Math.round((r.income + v) * 100) / 100
            : v;
        saveMonth(r);
      };
    const expense = document.getElementById("financeExpenseForm");
    if (expense) {
      const x = r.expenses.find((x) => x.id === editing);
      if (x) {
        document.getElementById("expenseCategory").value = x.category;
        document.getElementById("expensePaid").value = String(x.paid !== false);
      }
      document
        .getElementById("expenseKind")
        ?.addEventListener("change", (e) => {
          const visible = e.target.value !== "once";
          document.getElementById("expenseCountLabel").hidden = !visible;
          document.getElementById("financeScheduleHelp").hidden = !visible;
        });
      document
        .getElementById("cancelExpense")
        ?.addEventListener("click", () => {
          editing = "";
          renderPage();
        });
      expense.onsubmit = (e) => {
        e.preventDefault();
        const value = M.parseAmount(
            document.getElementById("expenseAmount").value,
          ),
          cat = document.getElementById("expenseCategory").value,
          date = document.getElementById("expenseDate").value;
        if (!(value > 0) || !cat || date.slice(0, 7) !== month) return error();
        const item = {
          id: editing || `${Date.now()}-${Math.random().toString(36).slice(2)}`,
          amount: value,
          category: cat,
          description: document
            .getElementById("expenseDescription")
            .value.trim(),
          date,
          paid: document.getElementById("expensePaid").value === "true",
          createdAt: x?.createdAt || Date.now(),
          updatedAt: Date.now(),
        };
        if (editing) {
          Object.assign(x, item);
          editing = "";
          saveMonth(r);
        } else {
          try {
            const kind = options.active
              ? document.getElementById("expenseKind")?.value || "once"
              : "once";
            const list = M.schedule(item, {
              month,
              kind,
              count: document.getElementById("expenseCount")?.value || 1,
              day: Number(date.slice(-2)),
            });
            const data = read();
            for (const row of list) {
              const rec = M.normalize(data[row.month]);
              rec.currency = rec.currency || currency();
              if (row.month !== month) row.item.paid = false;
              rec.expenses.unshift(row.item);
              data[row.month] = rec;
            }
            if (write(data)) {
              notice = t().savedOk;
              renderPage();
            }
          } catch {
            return error();
          }
        }
      };
    }
    const filterEl = document.getElementById("financeFilter"),
      searchEl = document.getElementById("financeSearch");
    if (filterEl) {
      filterEl.value = filter;
      const update = () => {
        filter = filterEl.value;
        search = searchEl.value;
        document.getElementById("financeHistoryList").innerHTML = history(r);
        bindRows(r);
      };
      filterEl.onchange = update;
      searchEl.oninput = update;
    }
    if (!options.active) return;
    document
      .getElementById("financeBudgetForm")
      ?.addEventListener("submit", (e) => {
        e.preventDefault();
        const v = M.parseAmount(document.getElementById("budgetAmount").value);
        if (!(v > 0)) return error();
        r.budgets[document.getElementById("budgetCategory").value] = v;
        saveMonth(r);
      });
    document
      .getElementById("financeGoalForm")
      ?.addEventListener("submit", (e) => {
        e.preventDefault();
        const target = M.parseAmount(
            document.getElementById("goalTarget").value,
          ),
          saved = M.parseAmount(document.getElementById("goalSaved").value),
          name = document.getElementById("goalName").value.trim();
        if (!(target > 0) || !Number.isFinite(saved) || !name) return error();
        r.goals.push({
          id: `${Date.now()}-${Math.random()}`,
          name,
          target,
          saved,
        });
        saveMonth(r);
      });
    document.querySelectorAll("[data-budget-remove]").forEach(
      (b) =>
        (b.onclick = () => {
          delete r.budgets[b.dataset.budgetRemove];
          saveMonth(r);
        }),
    );
    document.querySelectorAll("[data-goal-remove]").forEach(
      (b) =>
        (b.onclick = () => {
          if (confirm(t().confirm)) {
            r.goals = r.goals.filter((x) => x.id !== b.dataset.goalRemove);
            saveMonth(r);
          }
        }),
    );
    document.querySelectorAll("[data-goal]").forEach(
      (b) =>
        (b.onclick = () => {
          const g = r.goals.find((x) => x.id === b.dataset.goal);
          const input = prompt(t().saved, String(g.saved));
          if (input === null) return;
          const value = M.parseAmount(input);
          if (!Number.isFinite(value)) return error();
          g.saved = value;
          saveMonth(r);
        }),
    );
  }
  function bindRows(r) {
    document.querySelectorAll("[data-edit]").forEach(
      (b) =>
        (b.onclick = () => {
          editing = b.dataset.edit;
          tab = "entries";
          renderPage();
          document.getElementById("expenseAmount")?.focus();
        }),
    );
    document.querySelectorAll("[data-remove]").forEach(
      (b) =>
        (b.onclick = () => {
          if (confirm(t().confirm)) {
            r.expenses = r.expenses.filter((x) => x.id !== b.dataset.remove);
            saveMonth(r);
          }
        }),
    );
    document.querySelectorAll("[data-paid]").forEach(
      (b) =>
        (b.onclick = () => {
          const x = r.expenses.find((x) => x.id === b.dataset.paid);
          if (x) {
            x.paid = true;
            saveMonth(r);
          }
        }),
    );
  }
  function error() {
    notice = t().error;
    const node = document.getElementById("financeNotice");
    if (node) {
      node.textContent = notice;
      node.scrollIntoView({ block: "center", behavior: "smooth" });
    }
  }
  function render(args = {}) {
    options = {
      ...args,
      language: ["pt", "en", "es", "ru"].includes(args.language)
        ? args.language
        : "pt",
      active: args.active === true,
      session: args.session || {},
    };
    month = /^\d{4}-(0[1-9]|1[0-2])$/.test(args.month || "")
      ? args.month
      : currentMonth();
    tab = ["overview", "entries", "plan", "reports"].includes(args.screen)
      ? args.screen
      : "overview";
    editing = "";
    search = "";
    filter = "";
    notice = "";
    if (!args.sharedWorkspace) {
      if (args.screen && args.screen !== "intro") renderPage();
      else renderIntroduction();
    }
    const financeTicket = window.EduCashProNavigation?.stamp?.();
    const initialized = window.EduCashProFinanceShare?.init?.({
      ...options,
      read,
      hasPending: () => localStorage.getItem(storageKey() + ":pending") === "1",
      markSynced: () => localStorage.removeItem(storageKey() + ":pending"),
      hydrate: (months) => {
        const data = read();
        Object.assign(data, months);
        localStorage.setItem(storageKey(), JSON.stringify(data));
      },
      backToFinance: renderPage,
    }).catch?.(() => {});
    if (args.sharedWorkspace)
      return Promise.resolve(initialized).then(() => {
        if (
          window.EduCashProNavigation &&
          !window.EduCashProNavigation.isCurrent(financeTicket)
        )
          return;
        return window.EduCashProFinanceShare?.openViewer?.(
          args.sharedWorkspace,
          args.sharedMonth,
        );
      });
    return initialized;
  }
  window.EduCashProFinance = { render };
})();
