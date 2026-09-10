(function () {
  "use strict";

  const COPY = {
    pt: { title: "Controle Financeiro Mensal", intro: "Registre sua renda e acompanhe quanto ainda está disponível no mês.", income: "Renda", spent: "Gastos", balance: "Disponível", month: "Mês", setIncome: "Definir renda", addExpense: "Adicionar gasto", value: "Valor", category: "Tipo de gasto", saveIncome: "Salvar renda", saveExpense: "Registrar gasto", updateExpense: "Atualizar gasto", history: "Histórico do mês", empty: "Nenhum gasto registrado neste mês.", edit: "Editar", remove: "Excluir", export: "Exportar histórico", local: "Os dados ficam somente neste aparelho.", invalid: "Digite um valor válido.", choose: "Escolha o tipo de gasto.", confirm: "Excluir este gasto?", locked: "Ferramenta exclusiva para assinantes ativos", activate: "Ativar assinatura", back: "Voltar às ferramentas", comma: ",", categories: [["housing","🏠","Moradia"],["food","🍽️","Alimentação"],["transport","🚗","Transporte"],["health","❤️","Saúde"],["education","📚","Educação"],["debts","💳","Dívidas"],["leisure","🎉","Lazer"],["investment","📈","Investimentos"],["other","•••","Outros"]] },
    en: { title: "Monthly Finance Control", intro: "Record your income and track how much remains available during the month.", income: "Income", spent: "Expenses", balance: "Available", month: "Month", setIncome: "Set income", addExpense: "Add expense", value: "Amount", category: "Expense type", saveIncome: "Save income", saveExpense: "Record expense", updateExpense: "Update expense", history: "Monthly history", empty: "No expenses recorded this month.", edit: "Edit", remove: "Delete", export: "Export history", local: "Data stays only on this device.", invalid: "Enter a valid amount.", choose: "Choose an expense type.", confirm: "Delete this expense?", locked: "Active subscribers only", activate: "Activate subscription", back: "Back to tools", comma: ".", categories: [["housing","🏠","Housing"],["food","🍽️","Food"],["transport","🚗","Transport"],["health","❤️","Health"],["education","📚","Education"],["debts","💳","Debt"],["leisure","🎉","Leisure"],["investment","📈","Investments"],["other","•••","Other"]] },
    es: { title: "Control Financiero Mensual", intro: "Registra tus ingresos y controla cuánto queda disponible durante el mes.", income: "Ingresos", spent: "Gastos", balance: "Disponible", month: "Mes", setIncome: "Definir ingresos", addExpense: "Agregar gasto", value: "Valor", category: "Tipo de gasto", saveIncome: "Guardar ingresos", saveExpense: "Registrar gasto", updateExpense: "Actualizar gasto", history: "Historial del mes", empty: "No hay gastos registrados este mes.", edit: "Editar", remove: "Eliminar", export: "Exportar historial", local: "Los datos quedan solamente en este dispositivo.", invalid: "Introduce un valor válido.", choose: "Elige el tipo de gasto.", confirm: "¿Eliminar este gasto?", locked: "Herramienta exclusiva para suscriptores activos", activate: "Activar suscripción", back: "Volver a herramientas", comma: ",", categories: [["housing","🏠","Vivienda"],["food","🍽️","Alimentación"],["transport","🚗","Transporte"],["health","❤️","Salud"],["education","📚","Educación"],["debts","💳","Deudas"],["leisure","🎉","Ocio"],["investment","📈","Inversiones"],["other","•••","Otros"]] },
    ru: { title: "Ежемесячный финансовый контроль", intro: "Укажите доход и следите за остатком средств в течение месяца.", income: "Доход", spent: "Расходы", balance: "Остаток", month: "Месяц", setIncome: "Указать доход", addExpense: "Добавить расход", value: "Сумма", category: "Категория расхода", saveIncome: "Сохранить доход", saveExpense: "Записать расход", updateExpense: "Обновить расход", history: "История за месяц", empty: "В этом месяце расходов пока нет.", edit: "Изменить", remove: "Удалить", export: "Экспорт истории", local: "Данные хранятся только на этом устройстве.", invalid: "Введите корректную сумму.", choose: "Выберите категорию расхода.", confirm: "Удалить этот расход?", locked: "Только для активных подписчиков", activate: "Активировать подписку", back: "Назад к инструментам", comma: ",", categories: [["housing","🏠","Жильё"],["food","🍽️","Питание"],["transport","🚗","Транспорт"],["health","❤️","Здоровье"],["education","📚","Образование"],["debts","💳","Долги"],["leisure","🎉","Досуг"],["investment","📈","Инвестиции"],["other","•••","Другое"]] }
  };

  let options = null;
  const currentMonth = () => {
    const today = new Date();
    return `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}`;
  };
  let month = currentMonth();
  let mode = "expense";
  let buffer = "0";
  let selectedCategory = "";
  let editingId = "";

  const esc = (value) => String(value ?? "").replace(/[&<>"']/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[char]);
  const copy = () => COPY[options.language] || COPY.pt;
  const storageKey = () => `educashpro:monthly-finance:${options.session?.profile?.tgId || "local"}`;
  const amount = () => Math.round((Number(buffer.replace(",", ".")) || 0) * 100) / 100;
  const format = (value) => new Intl.NumberFormat(options.language === "pt" ? "pt-BR" : options.language, { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(Number(value || 0));
  const category = (id) => copy().categories.find((item) => item[0] === id) || copy().categories.at(-1);

  function read() {
    try { const value = JSON.parse(localStorage.getItem(storageKey()) || "{}"); return value && typeof value === "object" ? value : {}; }
    catch { return {}; }
  }

  function write(data) { localStorage.setItem(storageKey(), JSON.stringify(data)); }
  function monthData(data) { return data[month] || { income: 0, expenses: [] }; }
  function totals(record) { const spent = record.expenses.reduce((sum, item) => sum + Number(item.amount || 0), 0); return { spent, balance: Number(record.income || 0) - spent }; }

  function syncEntry() {
    const c = copy();
    const value = document.getElementById("financeEntryValue");
    if (value) value.textContent = format(amount());
    document.querySelectorAll("[data-finance-category]").forEach((button) => button.classList.toggle("active", button.dataset.financeCategory === selectedCategory));
    document.querySelectorAll("[data-finance-mode]").forEach((button) => button.classList.toggle("active", button.dataset.financeMode === mode));
    const categories = document.getElementById("financeCategories");
    if (categories) categories.hidden = mode === "income";
    const save = document.getElementById("financeSave");
    if (save) save.textContent = mode === "income" ? c.saveIncome : editingId ? c.updateExpense : c.saveExpense;
    const message = document.getElementById("financeMessage");
    if (message) message.textContent = "";
  }

  function keypad(key) {
    if (/^\d$/.test(key)) buffer = buffer === "0" ? key : `${buffer}${key}`;
    else if (key === "decimal" && !/[.,]/.test(buffer)) buffer += copy().comma;
    else if (key === "back") buffer = buffer.length > 1 ? buffer.slice(0, -1) : "0";
    syncEntry();
  }

  function saveEntry() {
    const c = copy();
    const value = amount();
    const message = document.getElementById("financeMessage");
    if (!(value > 0)) { message.textContent = c.invalid; return; }
    const data = read();
    const record = monthData(data);
    if (mode === "income") record.income = value;
    else {
      if (!selectedCategory) { message.textContent = c.choose; return; }
      if (editingId) {
        const item = record.expenses.find((expense) => expense.id === editingId);
        if (item) { item.amount = value; item.category = selectedCategory; item.updatedAt = Date.now(); }
      } else record.expenses.unshift({ id: `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`, amount: value, category: selectedCategory, createdAt: Date.now() });
    }
    data[month] = record;
    write(data);
    buffer = "0"; selectedCategory = ""; editingId = ""; mode = "expense";
    renderPage();
  }

  function editExpense(id) {
    const item = monthData(read()).expenses.find((expense) => expense.id === id);
    if (!item) return;
    mode = "expense"; editingId = id; selectedCategory = item.category; buffer = String(item.amount).replace(".", copy().comma);
    syncEntry();
    document.getElementById("financeEntry")?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function removeExpense(id) {
    if (!window.confirm(copy().confirm)) return;
    const data = read();
    const record = monthData(data);
    record.expenses = record.expenses.filter((item) => item.id !== id);
    data[month] = record;
    write(data);
    renderPage();
  }

  function exportHistory() {
    const c = copy();
    const record = monthData(read());
    const rows = [[c.month, c.category, c.value], ...record.expenses.map((item) => [month, category(item.category)[2], String(item.amount)])];
    const csv = rows.map((row) => row.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(";")).join("\n");
    const url = URL.createObjectURL(new Blob(["\ufeff", csv], { type: "text/csv;charset=utf-8" }));
    const link = document.createElement("a");
    link.href = url; link.download = `educashpro-financas-${month}.csv`; link.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }

  function renderLocked() {
    const c = copy();
    document.getElementById("content").innerHTML = `<button id="financeBack" class="textButton">← ${esc(c.back)}</button><section class="financeLocked"><span>🔒</span><h1>${esc(c.locked)}</h1><button id="financeActivate">${esc(c.activate)}</button></section>`;
    document.getElementById("financeBack").onclick = () => options.back?.();
    document.getElementById("financeActivate").onclick = () => options.subscribe?.();
  }

  function renderPage() {
    const c = copy();
    const data = read();
    const record = monthData(data);
    const sum = totals(record);
    const percent = record.income > 0 ? Math.min(100, (sum.spent / record.income) * 100) : 0;
    const history = record.expenses.length ? record.expenses.map((item) => { const cat = category(item.category); return `<article class="financeHistoryItem"><span>${cat[1]}</span><div><strong>${esc(cat[2])}</strong><small>${new Date(item.createdAt).toLocaleDateString(options.language === "pt" ? "pt-BR" : options.language)}</small></div><b>${format(item.amount)}</b><button data-finance-edit="${esc(item.id)}" aria-label="${esc(c.edit)}">✎</button><button data-finance-remove="${esc(item.id)}" aria-label="${esc(c.remove)}">×</button></article>`; }).join("") : `<div class="empty">${esc(c.empty)}</div>`;
    document.getElementById("content").innerHTML = `<main class="financeControl"><button id="financeBack" class="textButton">← ${esc(c.back)}</button><header class="financeHero"><span>💰</span><div><h1>${esc(c.title)}</h1><p>${esc(c.intro)}</p></div></header><label class="financeMonth"><span>${esc(c.month)}</span><input id="financeMonth" type="month" value="${month}"></label><section class="financeSummary"><article><small>${esc(c.income)}</small><strong>${format(record.income)}</strong></article><article><small>${esc(c.spent)}</small><strong>${format(sum.spent)}</strong></article><article class="${sum.balance < 0 ? "negative" : ""}"><small>${esc(c.balance)}</small><strong>${format(sum.balance)}</strong></article></section><div class="financeProgress"><span style="width:${percent}%"></span></div><section id="financeEntry" class="financeEntry"><div class="financeMode"><button data-finance-mode="income">＋ ${esc(c.setIncome)}</button><button class="active" data-finance-mode="expense">− ${esc(c.addExpense)}</button></div><small>${esc(c.value)}</small><output id="financeEntryValue">${format(amount())}</output><div id="financeCategories" class="financeCategories"><b>${esc(c.category)}</b>${c.categories.map((item) => `<button data-finance-category="${item[0]}"><span>${item[1]}</span><small>${esc(item[2])}</small></button>`).join("")}</div><div class="financeKeypad">${["1","2","3","4","5","6","7","8","9","decimal","0","back"].map((key) => `<button data-finance-key="${key}">${key === "decimal" ? c.comma : key === "back" ? "⌫" : key}</button>`).join("")}</div><button id="financeSave" class="wideButton">${esc(c.saveExpense)}</button><p id="financeMessage" class="financeMessage"></p></section><section class="financeHistory"><header><div><h2>${esc(c.history)}</h2><small>${esc(c.local)}</small></div><button id="financeExport">⇩ ${esc(c.export)}</button></header>${history}</section></main>`;
    document.getElementById("financeBack").onclick = () => options.back?.();
    document.getElementById("financeMonth").onchange = (event) => { month = event.target.value || month; buffer = "0"; selectedCategory = ""; editingId = ""; renderPage(); };
    document.querySelectorAll("[data-finance-mode]").forEach((button) => button.onclick = () => { mode = button.dataset.financeMode; editingId = ""; buffer = mode === "income" && record.income ? String(record.income).replace(".", c.comma) : "0"; selectedCategory = ""; syncEntry(); });
    document.querySelectorAll("[data-finance-key]").forEach((button) => button.onclick = () => keypad(button.dataset.financeKey));
    document.querySelectorAll("[data-finance-category]").forEach((button) => button.onclick = () => { selectedCategory = button.dataset.financeCategory; syncEntry(); });
    document.querySelectorAll("[data-finance-edit]").forEach((button) => button.onclick = () => editExpense(button.dataset.financeEdit));
    document.querySelectorAll("[data-finance-remove]").forEach((button) => button.onclick = () => removeExpense(button.dataset.financeRemove));
    document.getElementById("financeSave").onclick = saveEntry;
    document.getElementById("financeExport").onclick = exportHistory;
    syncEntry();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function render(args = {}) {
    options = { language: ["pt", "en", "es", "ru"].includes(args.language) ? args.language : "pt", session: args.session || {}, active: args.active === true, back: args.back, subscribe: args.subscribe };
    if (!options.active) return renderLocked();
    month = currentMonth(); mode = "expense"; buffer = "0"; selectedCategory = ""; editingId = "";
    renderPage();
  }

  window.EduCashProFinance = { render };
})();
