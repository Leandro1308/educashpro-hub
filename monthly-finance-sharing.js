(function () {
  "use strict";

  const COPY = {
    pt: {
      share: "Compartilhar controle", pdf: "Baixar PDF", lockedShare: "Compartilhar é exclusivo para assinantes",
      lockedPdf: "PDF exclusivo para assinantes", subscribe: "Assinar mensal", title: "Compartilhamento do controle",
      intro: "Assinantes ativos podem compartilhar este controle com até 5 pessoas. Os convidados podem adicionar, editar e excluir lançamentos no controle compartilhado.",
      activate: "Ativar compartilhamento", activateText: "Um novo espaço compartilhado começa vazio; seus registros pessoais permanecem privados neste aparelho.",
      invite: "Convidar por e-mail", inviteButton: "Adicionar pessoa", placeholder: "email@exemplo.com",
      guest: "Não assinante", subscribers: "Assinantes", remove: "Remover", none: "Nenhuma pessoa adicionada.",
      pending: "Acesso pendente até a pessoa entrar no EduCashPro com este e-mail.", active: "Compartilhamento ativo",
      sharedWithMe: "Compartilhado comigo", open: "Abrir", owner: "Controle de", back: "Voltar ao meu controle",
      month: "Mês", income: "Renda", spent: "Gastos", balance: "Disponível", history: "Histórico do mês",
      empty: "Nenhum gasto registrado neste mês.", invalidEmail: "Digite um e-mail válido.", added: "Pessoa adicionada ao compartilhamento.",
      already: "Este e-mail já foi adicionado.", guestLimit: "Este controle já atingiu o limite de 5 pessoas.",
      subscriberLimit: "Este controle já atingiu o limite de 5 pessoas.", ownerInactive: "Compartilhamento pausado porque a assinatura do proprietário está inativa.",
      collaboratorInactive: "Esta vaga é destinada a assinante. Reative sua assinatura para acessar.", error: "Não foi possível sincronizar agora.",
      pdfPreparing: "Preparando PDF…", pdfFallback: "O download automático não foi concluído. Use a opção de impressão e escolha Salvar como PDF.", pdfPrint: "Imprimir / salvar como PDF", pdfClose: "Voltar ao controle", pdfBlocked: "O navegador bloqueou a janela. Permita pop-ups para abrir a impressão.",
      report: "Relatório Financeiro Mensal", category: "Categoria", value: "Valor", date: "Data", total: "Total", generated: "Gerado em",
      categories: [["housing","Moradia"],["food","Alimentação"],["transport","Transporte"],["health","Saúde"],["education","Educação"],["debts","Dívidas"],["leisure","Lazer"],["investment","Investimentos"],["other","Outros"]]
    },
    en: {
      share: "Share control", pdf: "Download PDF", lockedShare: "Sharing is for subscribers only", lockedPdf: "PDF is for subscribers only",
      subscribe: "Subscribe monthly", title: "Share finance control", intro: "Active subscribers can share this control with up to 5 people. Guests can add, edit and delete entries in the shared control.",
      activate: "Enable sharing", activateText: "A new shared space starts empty; personal entries remain private on this device.",
      invite: "Invite by email", inviteButton: "Add person", placeholder: "email@example.com", guest: "Non-subscriber", subscribers: "Subscribers",
      remove: "Remove", none: "No one added yet.", pending: "Access is pending until the person signs in to EduCashPro with this email.", active: "Sharing active",
      sharedWithMe: "Shared with me", open: "Open", owner: "Control by", back: "Back to my control", month: "Month", income: "Income", spent: "Expenses",
      balance: "Available", history: "Monthly history", empty: "No expenses recorded this month.", invalidEmail: "Enter a valid email.", added: "Person added to sharing.",
      already: "This email has already been added.", guestLimit: "This control has reached the 5-person limit.", subscriberLimit: "This control has reached the 5-person limit.",
      ownerInactive: "Sharing is paused because the owner's subscription is inactive.", collaboratorInactive: "This slot is for a subscriber. Reactivate your subscription to access it.",
      error: "Could not synchronize now.", pdfPreparing: "Preparing PDF…", pdfFallback: "Automatic download could not finish. Use Print and choose Save as PDF.", pdfPrint: "Print / save as PDF", pdfClose: "Back to control", pdfBlocked: "Your browser blocked the new window. Allow pop-ups to print.",
      report: "Monthly Financial Report", category: "Category", value: "Amount", date: "Date", total: "Total", generated: "Generated on",
      categories: [["housing","Housing"],["food","Food"],["transport","Transport"],["health","Health"],["education","Education"],["debts","Debt"],["leisure","Leisure"],["investment","Investments"],["other","Other"]]
    },
    es: {
      share: "Compartir control", pdf: "Descargar PDF", lockedShare: "Compartir es exclusivo para suscriptores", lockedPdf: "PDF exclusivo para suscriptores",
      subscribe: "Suscripción mensual", title: "Compartir el control", intro: "Los suscriptores activos pueden compartir este control con hasta 5 personas. Los invitados pueden agregar, editar y eliminar registros.",
      activate: "Activar uso compartido", activateText: "Un nuevo espacio compartido empieza vacío; los registros personales permanecen privados en este dispositivo.",
      invite: "Invitar por correo", inviteButton: "Agregar persona", placeholder: "email@ejemplo.com", guest: "No suscriptor", subscribers: "Suscriptores",
      remove: "Eliminar", none: "Aún no se agregó a nadie.", pending: "El acceso queda pendiente hasta que la persona entre en EduCashPro con este correo.", active: "Uso compartido activo",
      sharedWithMe: "Compartido conmigo", open: "Abrir", owner: "Control de", back: "Volver a mi control", month: "Mes", income: "Ingresos", spent: "Gastos",
      balance: "Disponible", history: "Historial del mes", empty: "No hay gastos registrados este mes.", invalidEmail: "Introduce un correo válido.", added: "Persona agregada al uso compartido.",
      already: "Este correo ya fue agregado.", guestLimit: "Este control alcanzó el límite de 5 personas.", subscriberLimit: "Este control alcanzó el límite de 5 personas.",
      ownerInactive: "El uso compartido está pausado porque la suscripción del propietario está inactiva.", collaboratorInactive: "Esta plaza es para un suscriptor. Reactiva tu suscripción para acceder.",
      error: "No fue posible sincronizar ahora.", pdfPreparing: "Preparando PDF…", pdfFallback: "La descarga automática no se completó. Usa Imprimir y elige Guardar como PDF.", pdfPrint: "Imprimir / guardar como PDF", pdfClose: "Volver al control", pdfBlocked: "El navegador bloqueó la ventana. Permite ventanas emergentes para imprimir.",
      report: "Informe Financiero Mensual", category: "Categoría", value: "Valor", date: "Fecha", total: "Total", generated: "Generado el",
      categories: [["housing","Vivienda"],["food","Alimentación"],["transport","Transporte"],["health","Salud"],["education","Educación"],["debts","Deudas"],["leisure","Ocio"],["investment","Inversiones"],["other","Otros"]]
    },
    ru: {
      share: "Поделиться контролем", pdf: "Скачать PDF", lockedShare: "Совместный доступ только для подписчиков", lockedPdf: "PDF только для подписчиков",
      subscribe: "Оформить подписку", title: "Совместный финансовый контроль", intro: "Активный подписчик может поделиться этим контролем с 5 людьми. Приглашённые пользователи могут добавлять, изменять и удалять записи.",
      activate: "Включить совместный доступ", activateText: "Новое общее пространство пусто; личные записи остаются на этом устройстве.",
      invite: "Пригласить по e-mail", inviteButton: "Добавить", placeholder: "email@example.com", guest: "Без подписки", subscribers: "Подписчики",
      remove: "Удалить", none: "Участники пока не добавлены.", pending: "Доступ появится после входа в EduCashPro с этим e-mail.", active: "Совместный доступ активен",
      sharedWithMe: "Доступные мне", open: "Открыть", owner: "Контроль:", back: "Назад к моему контролю", month: "Месяц", income: "Доход", spent: "Расходы",
      balance: "Остаток", history: "История за месяц", empty: "В этом месяце расходов пока нет.", invalidEmail: "Введите корректный e-mail.", added: "Пользователь добавлен.",
      already: "Этот e-mail уже добавлен.", guestLimit: "Достигнут лимит в 5 участников.", subscriberLimit: "Достигнут лимит в 5 участников.",
      ownerInactive: "Совместный доступ приостановлен: подписка владельца не активна.", collaboratorInactive: "Это место предназначено для подписчика. Возобновите подписку.",
      error: "Не удалось синхронизировать данные.", pdfPreparing: "Подготовка PDF…", pdfFallback: "Автоматическая загрузка не удалась. Используйте печать и выберите сохранение в PDF.", pdfPrint: "Печать / сохранить PDF", pdfClose: "Вернуться к учёту", pdfBlocked: "Браузер заблокировал окно. Разрешите всплывающие окна для печати.",
      report: "Ежемесячный финансовый отчёт", category: "Категория", value: "Сумма", date: "Дата", total: "Итого", generated: "Создано",
      categories: [["housing","Жильё"],["food","Питание"],["transport","Транспорт"],["health","Здоровье"],["education","Образование"],["debts","Долги"],["leisure","Досуг"],["investment","Инвестиции"],["other","Другое"]]
    }
  };

  let options = null;
  let workspaces = [];
  let ownerWorkspace = null;
  let lastRecord = { income: 0, expenses: [] };
  let lastMonth = "";
  let displayCurrency = "USD";
  let lastCategories = [];
  let syncTimer = null;
  let viewedWorkspace = null;

  const esc = (value) => String(value ?? "").replace(/[&<>"']/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[char]);
  const c = () => COPY[options?.language] || COPY.pt;
  const fmt = (value) => new Intl.NumberFormat(options?.language === "pt" ? "pt-BR" : options?.language || "en", { style: "currency", currency: displayCurrency, minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(Number(value || 0));
  const totals = (record) => {
    const cents = value => Math.round(Number(value || 0) * 100);
    const expenses = Array.isArray(record?.expenses) ? record.expenses : [];
    const all = expenses.reduce((sum, item) => sum + cents(item.amount), 0);
    const paid = expenses.filter(item => item.paid !== false).reduce((sum, item) => sum + cents(item.amount), 0);
    return {spent:all/100,paid:paid/100,pending:(all-paid)/100,balance:(cents(record?.income)-all)/100,cash:(cents(record?.income)-paid)/100};
  };
  const categoryName = (id) => { const source = lastCategories.length ? lastCategories.map((item) => [item[0], item[2]]) : c().categories; return source.find((item) => item[0] === id)?.[1] || id; };

  const PAYER_COPY={
    pt:{currency:"Moeda",currencyHelp:"A moeda identifica os valores; não faz conversão.",legacy:"Este controle foi criado antes da separação e pode conter gastos pessoais. Revise os lançamentos e as pessoas com acesso.",payer:"Quem pagou?",unknown:"Não informado",paid:"Gastos pagos",pending:"A pagar",cash:"Saldo após pagamentos",forecast:"Saldo previsto",byPerson:"Pagamentos por pessoa"},
    en:{currency:"Currency",currencyHelp:"Currency labels amounts; it does not convert them.",legacy:"This shared control predates the separation and may contain personal expenses. Review its entries and participants.",payer:"Who paid?",unknown:"Not specified",paid:"Paid expenses",pending:"To pay",cash:"Balance after payments",forecast:"Projected balance",byPerson:"Payments by person"},
    es:{currency:"Moneda",currencyHelp:"La moneda identifica los importes; no los convierte.",legacy:"Este control compartido es anterior a la separación y puede contener gastos personales. Revisa sus registros y participantes.",payer:"¿Quién pagó?",unknown:"Sin indicar",paid:"Gastos pagados",pending:"Por pagar",cash:"Saldo tras pagos",forecast:"Saldo previsto",byPerson:"Pagos por persona"},
    ru:{currency:"Валюта",currencyHelp:"Валюта обозначает суммы, но не конвертирует их.",legacy:"Этот общий учёт создан до разделения и может содержать личные расходы. Проверьте записи и участников.",payer:"Кто оплатил?",unknown:"Не указано",paid:"Оплачено",pending:"К оплате",cash:"Остаток после оплаты",forecast:"Прогноз остатка",byPerson:"Платежи по участникам"}
  };
  const payerCopy=()=>PAYER_COPY[options?.language] || PAYER_COPY.pt;
  function payerTotals(record){
    const groups=new Map();
    for(const item of record?.expenses || []){
      if(item.paid === false)continue;
      const key=item.payerUserId || "";
      const row=groups.get(key) || {name:item.payerName || payerCopy().unknown,cents:0};
      row.cents+=Math.round(Number(item.amount || 0)*100);groups.set(key,row);
    }
    return [...groups.values()];
  }
  function showPremiumCard(kind = "share") {
    const copy = c();
    const labels = {
      pt: { title: "Função exclusiva para assinante ativo", text: kind === "pdf" ? "Baixar o relatório em PDF é uma função disponível para assinantes ativos." : "Compartilhar o Controle Financeiro é uma função disponível para assinantes ativos.", action: "Ver opções de assinatura", close: "Agora não" },
      en: { title: "Active subscriber feature", text: kind === "pdf" ? "Downloading the PDF report is available to active subscribers." : "Sharing Monthly Finance Control is available to active subscribers.", action: "View subscription options", close: "Not now" },
      es: { title: "Función exclusiva para suscriptor activo", text: kind === "pdf" ? "Descargar el informe en PDF está disponible para suscriptores activos." : "Compartir el Control Financiero está disponible para suscriptores activos.", action: "Ver opciones de suscripción", close: "Ahora no" },
      ru: { title: "Функция активной подписки", text: kind === "pdf" ? "Скачивание PDF-отчёта доступно активным подписчикам." : "Совместный доступ к финансовому контролю доступен активным подписчикам.", action: "Варианты подписки", close: "Не сейчас" }
    }[options?.language] || null;
    const layer = document.createElement("div");
    layer.className = "finHelpOverlay financePremiumGate";
    layer.innerHTML = `<section class="finHelpCard"><button class="finHelpClose" type="button">✕</button><h2>🔒 ${esc(labels.title)}</h2><p>${esc(labels.text)}</p><button class="wideButton" id="financePremiumSubscribe">${esc(labels.action)}</button><button class="secondaryButton" id="financePremiumClose">${esc(labels.close)}</button></section>`;
    document.body.appendChild(layer);
    const close = () => layer.remove();
    layer.querySelector(".finHelpClose").onclick = close;
    layer.querySelector("#financePremiumClose").onclick = close;
    layer.querySelector("#financePremiumSubscribe").onclick = () => { close(); options?.subscribe?.(); };
    layer.onclick = (event) => { if (event.target === layer) close(); };
  }

  const ERROR_COPY = {
    pt: {
      SESSION: "Sua sessão expirou. Entre novamente no EduCashPro e tente outra vez.",
      verified_email_required: "Confirme seu e-mail cadastrado no EduCashPro antes de compartilhar o controle.",
      finance_payload_too_large: "O histórico é grande demais para sincronizar de uma só vez. Seus registros locais foram preservados.",
      TIMEOUT: "A conexão demorou a responder. Verifique a internet e tente novamente.",
      cookie_session_required: "Entre novamente no EduCashPro para autorizar o compartilhamento.",
      monthly_finance_share_failed: "Não foi possível criar o controle compartilhado no servidor. Seus dados locais continuam salvos.",
      monthly_finance_list_failed: "Não foi possível consultar seus compartilhamentos. Tente novamente.",
      sharing_conflict: "Este controle foi alterado por outra pessoa. Seus dados locais foram mantidos; confira o histórico antes de sincronizar.",
    },
    en: {
      SESSION: "Your session expired. Sign in to EduCashPro again and retry.",
      verified_email_required: "Verify your registered EduCashPro email before sharing this control.",
      finance_payload_too_large: "Your history is too large to synchronize at once. Local entries were preserved.",
      TIMEOUT: "The request took too long. Check your connection and retry.",
      cookie_session_required: "Sign in to EduCashPro again to authorize sharing.",
      monthly_finance_share_failed: "The server could not create your shared control. Local data remains saved.",
      monthly_finance_list_failed: "Your shared controls could not be loaded. Try again.",
      sharing_conflict: "Another person changed this control. Your local entries remain saved; review changes before syncing.",
    },
    es: {
      SESSION: "Tu sesión caducó. Inicia sesión de nuevo en EduCashPro y vuelve a intentarlo.",
      verified_email_required: "Verifica tu correo registrado en EduCashPro antes de compartir este control.",
      finance_payload_too_large: "Tu historial es demasiado grande para sincronizarlo de una vez. Se conservaron los datos locales.",
      TIMEOUT: "La solicitud tardó demasiado. Comprueba tu conexión e inténtalo de nuevo.",
      cookie_session_required: "Inicia sesión de nuevo en EduCashPro para autorizar el uso compartido.",
      monthly_finance_share_failed: "El servidor no pudo crear el control compartido. Tus datos locales siguen guardados.",
      monthly_finance_list_failed: "No se pudieron consultar tus controles compartidos. Inténtalo de nuevo.",
      sharing_conflict: "Otra persona modificó este control. Tus datos locales están guardados; revisa antes de sincronizar.",
    },
    ru: {
      SESSION: "Срок сеанса истёк. Войдите в EduCashPro снова и повторите попытку.",
      verified_email_required: "Подтвердите адрес электронной почты EduCashPro, прежде чем делиться учётом.",
      finance_payload_too_large: "История слишком велика для одной синхронизации. Локальные записи сохранены.",
      TIMEOUT: "Сервер отвечает слишком долго. Проверьте соединение и повторите попытку.",
      cookie_session_required: "Войдите в EduCashPro снова, чтобы разрешить общий доступ.",
      monthly_finance_share_failed: "Сервер не смог создать общий учёт. Локальные данные сохранены.",
      monthly_finance_list_failed: "Не удалось получить общие учёты. Повторите попытку.",
      sharing_conflict: "Другой участник изменил учёт. Локальные записи сохранены; проверьте изменения перед синхронизацией.",
    }
  };

  async function api(path, payload = {}) { if (typeof options?.api !== "function") throw new Error("cloud_unavailable"); return options.api(path, payload); }
  function errorText(reason) {
    const copy = c();
    const map = { already_invited: copy.already, guest_limit_reached: copy.guestLimit, subscriber_limit_reached: copy.subscriberLimit, member_limit_reached: copy.subscriberLimit, invalid_email: copy.invalidEmail, sharing_owner_inactive: copy.ownerInactive, active_subscription_required: copy.lockedShare };
    const key = String(reason || "").trim();
    if (key === "session_expired" || key === "invalid_session") return (ERROR_COPY[options?.language] || ERROR_COPY.pt).SESSION;
    return map[key] || (ERROR_COPY[options?.language] || ERROR_COPY.pt)[key] || copy.error;
  }

  async function refresh() {
    if (!options?.session?.profile?.userId || typeof options?.api !== "function") {
      workspaces = []; ownerWorkspace = null;
      return false;
    }
    try {
      const result = await api("/api/monthly-finance/list", {});
      workspaces = Array.isArray(result?.workspaces) ? result.workspaces : [];
      ownerWorkspace = workspaces.find((item) => item.role === "owner") || null;
      syncError = "";
      return true;
    } catch (error) {
      // Do not erase a workspace just created by the user if a subsequent
      // refresh fails. Preserve local data and show the actual reason.
      syncError = errorText(error?.message);
      return false;
    }
  }

  let syncReady=false, syncing=false, queuedData=null, syncError="";
  const conflictCopy={
    pt:"Seu controle pessoal e o compartilhado têm registros diferentes. Seus gastos locais estão preservados. Toque em 'Unificar controles' para conferir e atualizar sem perder lançamentos.",
    en:"Your personal and shared controls contain different entries. Local expenses are safe. Tap Merge controls to reconcile them without losing entries.",
    es:"Tus controles personal y compartido tienen registros distintos. Los gastos locales están protegidos. Pulsa Unificar controles para conciliarlos.",
    ru:"Личные и общие записи различаются. Локальные расходы сохранены. Нажмите «Объединить учёт», чтобы согласовать изменения."
  };
  async function sync(data) {
    if(!options?.active||!ownerWorkspace?.workspaceId||!syncReady)return;
    queuedData=JSON.parse(JSON.stringify(data||options.read?.()||{}));
    window.clearTimeout(syncTimer);
    syncTimer=window.setTimeout(flushSync,500);
  }
  async function flushSync(){
    if(syncing||!queuedData||!syncReady)return;
    syncing=true;
    const data=queuedData;queuedData=null;
    try{
      const result=await api("/api/monthly-finance/share/sync",{workspaceId:ownerWorkspace.workspaceId,months:data,expectedUpdatedAt:ownerWorkspace.updatedAt,expectedRevision:Number(ownerWorkspace.revision||0)});
      ownerWorkspace.updatedAt=result.updatedAt;
      ownerWorkspace.revision=Number(result.revision||ownerWorkspace.revision||0);
      if(!queuedData){
        options.markSynced?.();
        options.saveBaseline?.(signature(data));
      }
      syncError="";
    }catch(error){
      syncReady=false;
      const message=String(error?.message||'').includes('sharing_conflict')?conflictCopy[options.language]:c().error;
      syncError=message;
      const node=document.getElementById("financeNotice");if(node)node.textContent=message;
      const root=document.getElementById("financeSharedAccess");
      if(root && ownerWorkspace && options?.active && !root.querySelector?.("[data-finance-reconcile]")){
        root.insertAdjacentHTML("beforeend",reconciliationPanel());
        wireReconciliation(root);
      }
      else if(!node)window.alert(message);
    }finally{syncing=false;if(queuedData&&syncReady)void flushSync();}
  }

  // Shared records are server-authoritative. Keep the visible ledger fresh
  // on focus and at a modest interval; never erase an unfinished form.
  let viewerPoll = null;
  let viewerFocus = null;
  let viewerVisibility = null;
  let viewerDirty = false;
  let viewerRevision = "";
  let viewerRefreshing = false;
  function stopViewerPoll() {
    if (viewerPoll) window.clearInterval(viewerPoll);
    if (viewerFocus) window.removeEventListener?.("focus", viewerFocus);
    if (viewerVisibility) document.removeEventListener?.("visibilitychange", viewerVisibility);
    viewerPoll = viewerFocus = viewerVisibility = null;
  }
  function startViewerPoll(workspaceId, month, revision) {
    stopViewerPoll();
    viewerDirty = false;
    viewerRevision = String(revision ?? "");
    const check = async () => {
      const root = document.getElementById("financeSharedWorkspaceRoot");
      if (!root || root.dataset.workspaceId !== workspaceId) {
        stopViewerPoll();
        return;
      }
      if (document.hidden || viewerDirty || viewerRefreshing) return;
      viewerRefreshing = true;
      try {
        const fresh = await api("/api/monthly-finance/month", { workspaceId, month });
        const next = String(fresh.workspace?.revision ?? fresh.workspace?.updatedAt ?? "");
        if (next && next !== viewerRevision) await openViewer(workspaceId, month);
      } catch (error) {
        const status = document.getElementById("financeViewerSyncStatus");
        if (status) status.textContent = errorText(error?.message);
      } finally {
        viewerRefreshing = false;
      }
    };
    viewerPoll = window.setInterval(check, 15000);
    viewerFocus = () => { if (!document.hidden) void check(); };
    viewerVisibility = () => { if (!document.hidden) void check(); };
    window.addEventListener?.("focus", viewerFocus);
    document.addEventListener?.("visibilitychange", viewerVisibility);
  }

  function renderSharedAccess() {
    const root = document.getElementById("financeSharedAccess");
    if (!root) return;
    const copy = c();
    const labels = {
      pt: { mine: "Meu controle compartilhado", together: "Controle do casal/família", open: "Abrir controle compartilhado" },
      en: { mine: "My shared control", together: "Couple/family control", open: "Open shared control" },
      es: { mine: "Mi control compartido", together: "Control de pareja/familia", open: "Abrir control compartido" },
      ru: { mine: "Мой общий контроль", together: "Контроль пары/семьи", open: "Открыть общий контроль" }
    }[options?.language] || { mine: "Meu controle compartilhado", together: "Controle do casal/família", open: "Abrir controle compartilhado" };

    const cards = workspaces.filter((item) => item.role === "owner" || item.role === "member");
    if (!cards.length) {
      root.innerHTML = "";
      return;
    }

    root.innerHTML = `<section class="financeSharedInvites financeSharedProminent"><h3>👥 ${esc(labels.together)}</h3>${cards.map((item) => `<button data-open-shared="${esc(item.workspaceId)}" class="${item.canOpen ? "" : "paused"}"><span>👥</span><div><strong>${esc(item.role === "owner" ? labels.mine : copy.owner + " " + (item.ownerName || "EduCashPro"))}</strong><small>${esc(item.canOpen ? labels.open : errorText(item.pausedReason))}</small></div></button>`).join("")}</section>`;
    root.querySelectorAll("[data-open-shared]").forEach((button) => {
      button.onclick = () => openViewer(button.dataset.openShared);
    });
  }

  function bind({ record, month, categories } = {}) {
    displayCurrency = record?.currency || displayCurrency; lastRecord = record || lastRecord; lastMonth = month || lastMonth; lastCategories = Array.isArray(categories) ? categories : lastCategories;
    const share = document.getElementById("financeShareAction");
    const pdf = document.getElementById("financePdfAction");
    if (share) { share.textContent = `${options?.active ? "👥" : "🔒"} ${options?.active ? c().share : c().lockedShare}`; share.classList.toggle("locked", !options?.active); share.onclick = () => options?.active ? openManager() : showPremiumCard("share"); }
    if (pdf) { pdf.textContent = `${options?.active ? "📄" : "🔒"} ${options?.active ? c().pdf : c().lockedPdf}`; pdf.classList.toggle("locked", !options?.active); pdf.onclick = () => options?.active ? exportPdf(lastRecord, lastMonth, "") : showPremiumCard("pdf"); }
    renderSharedAccess();
    if(syncError){
      const node=document.getElementById("financeNotice");
      if(node)node.textContent=syncError;
    }
  }

  // Cloud snapshots must never replace local expenses silently. A server
  // workspace may be stale, empty, or created in a previous browser session.
  function hasRecordedFinances(months) {
    return Object.values(months || {}).some((row) =>
      Number(row?.income || 0) !== 0 ||
      (Array.isArray(row?.expenses) && row.expenses.length > 0) ||
      (Array.isArray(row?.goals) && row.goals.length > 0) ||
      Object.keys(row?.budgets || {}).length > 0
    );
  }
  function meaningfulMonths(months = {}) {
    return Object.fromEntries(
      Object.entries(months).sort(([a], [b]) => a.localeCompare(b)).filter(([, record]) =>
        Number(record?.income || 0) !== 0 ||
        (Array.isArray(record?.expenses) && record.expenses.length > 0) ||
        (Array.isArray(record?.goals) && record.goals.length > 0) ||
        Object.keys(record?.budgets || {}).length > 0
      ).map(([key, record]) => [key, {
        income: Number(record.income || 0),
        currency: String(record.currency || "USD"),
        expenses: (record.expenses || []).map((e) => ({
          id: String(e.id || ""),
          amount: Number(e.amount || 0),
          category: String(e.category || ""),
          description: String(e.description || ""),
          date: String(e.date || ""),
          paid: e.paid !== false,
          kind: String(e.kind || "once"),
          installment: Number(e.installment || 0),
          installments: Number(e.installments || 0),
          createdAt: Number(e.createdAt || 0),
          updatedAt: Number(e.updatedAt || 0)
        })).sort((x,y) => x.id.localeCompare(y.id)),
        goals: record.goals || [],
        budgets: record.budgets || {},
      }])
    );
  }
  // Compact two-hash snapshot of the exact financial fields we reconcile.
  // This makes it possible to distinguish an unsaved local change from a
  // newer guest edit without duplicating private records in localStorage.
  function signature(months={}) {
    const value=JSON.stringify(meaningfulMonths(months));
    let a=2166136261,b=5381;
    for(let i=0;i<value.length;i++){
      const ch=value.charCodeAt(i);
      a=Math.imul(a^ch,16777619);
      b=Math.imul(b,33)^ch;
    }
    return value.length+":"+(a>>>0).toString(16)+":"+(b>>>0).toString(16);
  }

  // Explicit reconciliation, not a blind cloud overwrite. Each distinct
  // expense ID survives; for an ID changed on both devices, the most
  // recently edited copy wins. The owner chooses their local monthly income
  // when confirming a reconciliation; cloud-only months and collaborators'
  // unique expenses are preserved.
  function reconcileFinanceMonths(local = {}, cloud = {}) {
    const keys = [...new Set([...Object.keys(cloud || {}), ...Object.keys(local || {})])]
      .filter(key => /^\d{4}-(0[1-9]|1[0-2])$/.test(key)).sort();
    if (keys.length > 12) throw new Error("finance_month_limit");
    const result = {}, changes = [];
    let addedExpenses = 0, cloudOnlyExpenses = 0, conflicts = 0;
    for (const key of keys) {
      const own = local[key] || {}, remote = cloud[key] || {};
      const localHasData = hasRecordedFinances({ [key]: own });
      const remoteHasData = hasRecordedFinances({ [key]: remote });
      const ownAmount = Number(own.income || 0);
      const remoteAmount = Number(remote.income || 0);
      // Keep nonzero local income when explicitly confirmed by the owner.
      // Preserve remote income for months with no local recorded data.
      const income = ownAmount > 0 || !remoteHasData ? ownAmount : remoteAmount;
      const items = new Map();
      for (const expense of remote.expenses || []) if(expense && expense.id) items.set(String(expense.id),{...expense});
      for (const expense of own.expenses || []) {
        if(!expense || !expense.id) continue;
        const id = String(expense.id), previous = items.get(id);
        if(!previous) {
          addedExpenses++;
          items.set(id,{...expense});
        }else{
          const localTime=Number(expense.updatedAt||expense.createdAt||0);
          const remoteTime=Number(previous.updatedAt||previous.createdAt||0);
          if(JSON.stringify(expense)!==JSON.stringify(previous))conflicts++;
          if(localTime>=remoteTime)items.set(id,{...previous,...expense});
        }
      }
      for(const expense of remote.expenses || [])if(expense && expense.id && !(own.expenses || []).some(e=>String(e?.id)===String(expense.id)))cloudOnlyExpenses++;
      const goals = new Map();
      for(const goal of remote.goals || [])if(goal?.id)goals.set(String(goal.id),{...goal});
      for(const goal of own.goals || [])if(goal?.id)goals.set(String(goal.id),{...goals.get(String(goal.id)),...goal});
      const budgets={...(remote.budgets||{}),...(own.budgets||{})};
      // Match server limits before sending. Its sanitizer truncates beyond
      // these bounds; abort instead of silently dropping people's records.
      if(items.size>1000 || goals.size>100 || Object.keys(budgets).length>100)
        throw new Error("finance_entry_limit");
      const chosenCurrency=localHasData ? (own.currency||remote.currency||"USD") : (remote.currency||own.currency||"USD");
      result[key] = {
        income,currency:chosenCurrency,
        expenses:[...items.values()],
        budgets,
        goals:[...goals.values()],
      };
      if(localHasData && remoteHasData && ownAmount!==remoteAmount) {
        changes.push({month:key,local:ownAmount,cloud:remoteAmount,currency:chosenCurrency});
      }
    }
    return {months:result,changes,addedExpenses,cloudOnlyExpenses,conflicts};
  }

  const RECONCILE_COPY={
    pt:{title:"Unificar meus registros com o controle compartilhado",action:"🔄 Unificar controles",details:"Seu controle pessoal e o compartilhado têm informações diferentes. Unifique para levar seus gastos locais ao compartilhado, mantendo também os lançamentos das outras pessoas.",confirm:"Deseja unificar os controles? Os gastos exclusivos de cada lado serão preservados. A renda do seu controle pessoal terá prioridade nos meses divergentes.",success:"Controles unificados. Os registros já estão disponíveis para os participantes.",failed:"Não foi possível unificar agora. Seus dados locais continuam preservados.",entryLimit:"Existem mais registros do que o compartilhamento suporta neste mês. Nenhum lançamento foi apagado. Revise o histórico antes de unificar.",limit:"Há mais de 12 meses de histórico. Não foi feita nenhuma alteração; revise o período antes de unificar.",backup:"Não foi possível guardar uma cópia de segurança no aparelho. Nenhum dado foi alterado."},
    en:{title:"Merge my entries with the shared control",action:"🔄 Merge controls",details:"Your personal and shared records differ. Merge to include local expenses while keeping other people's entries.",confirm:"Merge now? Expenses unique to either control will be preserved. Your local income takes priority in months with different values.",success:"Controls merged. All participants can view the updated entries.",failed:"Unable to merge right now. Local data is safe.",entryLimit:"The shared workspace cannot hold all entries for this month. Nothing was deleted. Review your history before merging.",limit:"There are more than 12 months. No changes were made; review the period first.",backup:"Could not create a local backup. No data was changed."},
    es:{title:"Unificar mis registros con el control compartido",action:"🔄 Unificar controles",details:"Tus registros personales y compartidos son diferentes. Unifica para incluir los gastos locales conservando los registros de otras personas.",confirm:"¿Unificar? Se conservarán los gastos de ambos controles. Tus ingresos locales tendrán prioridad en los meses con diferencias.",success:"Controles unificados. Los participantes ya pueden ver los registros.",failed:"No se pudo unificar. Los datos locales están protegidos.",entryLimit:"El espacio compartido no admite todos los registros de este mes. No se borró nada. Revisa el historial antes de unificar.",limit:"Hay más de 12 meses. No se realizó ningún cambio.",backup:"No se pudo guardar una copia de seguridad. No se cambiaron los datos."},
    ru:{title:"Объединить личные и общие записи",action:"🔄 Объединить учёт",details:"Личные и общие данные расходятся. Объединение сохранит уникальные расходы каждого участника.",confirm:"Объединить записи? Уникальные расходы сохранятся, а личный доход будет приоритетным при различиях.",success:"Данные объединены и доступны участникам.",failed:"Не удалось объединить данные. Локальные записи сохранены.",entryLimit:"В общем учёте недостаточно места для всех записей за месяц. Ничего не удалено. Проверьте историю перед объединением.",limit:"Записано более 12 месяцев. Изменения не внесены.",backup:"Не удалось создать резервную копию. Данные не изменены."}
  };
  const reconcileCopy=()=>RECONCILE_COPY[options?.language]||RECONCILE_COPY.pt;

  function showReconcileError(error,node){
    const copy=reconcileCopy();
    const msg=String(error?.message||"");
    const message=msg.includes("finance_entry_limit")?copy.entryLimit:
      msg.includes("finance_month_limit")?copy.limit:
      msg.includes("finance_local_changed")?(conflictCopy[options?.language]||conflictCopy.pt):
      msg.includes("finance_backup_failed")?copy.backup:
      (msg.includes("sharing_conflict")?conflictCopy[options?.language]||conflictCopy.pt:
      errorText(msg)||copy.failed);
    syncError=message;
    const target=node||document.getElementById("financeNotice")||document.getElementById("financeShareStatus");
    if(target)target.textContent=message;
  }

  async function reconcileWithCloud(button=null) {
    if(!options?.active||!ownerWorkspace?.workspaceId)return;
    if(button?.disabled)return;
    if(button)button.disabled=true;
    const target=document.getElementById("financeNotice")||document.getElementById("financeShareStatus");
    try {
      const preview=await api("/api/monthly-finance/owner-data",{workspaceId:ownerWorkspace.workspaceId});
      const local=options.read?.()||{};
      const localRevision=JSON.stringify(local);
      const calculation=reconcileFinanceMonths(local,preview.months||{});
      const labels=reconcileCopy();
      const differingIncomes=calculation.changes.map(x=>x.month+": "+x.cloud+" → "+x.local+" "+x.currency).join("\n");
      const countLabel={
        pt:"Gastos exclusivos que serão preservados: ",en:"Unique expenses preserved: ",
        es:"Gastos exclusivos que se conservarán: ",ru:"Уникальные расходы: "
      }[options?.language]||"Gastos exclusivos: ";
      const countSuffix={
        pt:" locais e ",en:" local and ",es:" locales y ",ru:" локальных и "
      }[options?.language]||" locais e ";
      const decisionText=labels.confirm+"\n\n"+(differingIncomes||"")+"\n"+
        countLabel+calculation.addedExpenses+countSuffix+calculation.cloudOnlyExpenses+" compartilhados.";
      if(!window.confirm(decisionText))return;
      if(JSON.stringify(options.read?.()||{})!==localRevision)
        throw new Error("finance_local_changed");
      // An additional device-local snapshot allows recovery even if
      // cloud CAS succeeds but the following local write fails.
      if(!options.saveBackup?.(local,preview.months||{}))throw new Error("finance_backup_failed");
      const response=await api("/api/monthly-finance/share/sync",{
        workspaceId:ownerWorkspace.workspaceId,
        months:calculation.months,
        expectedUpdatedAt:preview.updatedAt,
        expectedRevision:Number(preview.revision||0),
      });
      ownerWorkspace.updatedAt=response.updatedAt;
      ownerWorkspace.revision=Number(response.revision||ownerWorkspace.revision||0);
      if(JSON.stringify(options.read?.()||{})!==localRevision)
        throw new Error("finance_local_changed");
      options.hydrate?.(calculation.months,true);
      options.markSynced?.();
      options.saveBaseline?.(signature(calculation.months));
      syncReady=true;syncError="";queuedData=null;
      options.clearNotice?.();
      if(target)target.textContent=labels.success;
      if (typeof options.onOwnerWorkspace === "function") options.onOwnerWorkspace(ownerWorkspace.workspaceId);
      else options.backToFinance?.();
    }catch(error){
      showReconcileError(error,target);
    }finally{if(button?.isConnected)button.disabled=false;}
  }

  function reconciliationPanel() {
    const labels=reconcileCopy();
    return `<section class="financePanel financeReconcilePanel" role="status">
      <h3>${esc(labels.title)}</h3><p>${esc(labels.details)}</p>
      <button type="button" class="wideButton" data-finance-reconcile>${esc(labels.action)}</button>
    </section>`;
  }

  function wireReconciliation(root) {
    root?.querySelectorAll?.("[data-finance-reconcile]").forEach(button=>{
      button.onclick=()=>reconcileWithCloud(button);
    });
  }

  async function init(args = {}) {
    window.clearTimeout(syncTimer);
    queuedData=null;syncReady=false;
    options=args;
    await refresh();
    bind({});
  }

  async function createWorkspace() {
    const status = document.getElementById("financeShareStatus");
    const button = document.getElementById("financeShareCreate");
    if (button?.disabled) return;
    if (button) button.disabled = true;
    if (status) { status.textContent = ""; status.setAttribute("role", "status"); }
    try {
      const result = await api("/api/monthly-finance/share/create", {});
      if (!result?.workspace?.workspaceId) throw new Error("monthly_finance_share_failed");
      ownerWorkspace = result.workspace;

      // Preserve the successful creation response if the list API is
      // temporarily unavailable. It remains safe to retry reading later.
      const created = ownerWorkspace;
      const fresh = await refresh();
      if (!fresh) ownerWorkspace = created;
      syncError = fresh ? "" : syncError;
      openManager();
    } catch (error) {
      if (status) status.textContent = errorText(error?.message);
    } finally {
      if (button?.isConnected) button.disabled = false;
    }
  }

  function openManager() {
    const copy = c();
    if (!options?.active) return options?.subscribe?.();

    const labels = {
      pt: { find: "Localizar pessoa", confirm: "COMPARTILHAR COM ESTA PESSOA", found: "Conta EduCashPro encontrada", notFound: "Nenhuma conta EduCashPro foi encontrada com este e-mail. Peça à pessoa para criar o acesso gratuito com esse mesmo e-mail e tente novamente.", subscriber: "Assinante ativo", guest: "Conta gratuita / não assinante", openShared: "ABRIR CONTROLE COMPARTILHADO", members: "Pessoas com acesso", editable: "Todos os participantes podem adicionar, editar e excluir gastos neste controle." },
      en: { find: "Find person", confirm: "SHARE WITH THIS PERSON", found: "EduCashPro account found", notFound: "No EduCashPro account was found with this email. Ask the person to create free access with the same email and try again.", subscriber: "Active subscriber", guest: "Free account / non-subscriber", openShared: "OPEN SHARED CONTROL", members: "People with access", editable: "All participants can add, edit and delete expenses in this control." },
      es: { find: "Localizar persona", confirm: "COMPARTIR CON ESTA PERSONA", found: "Cuenta EduCashPro encontrada", notFound: "No se encontró una cuenta EduCashPro con este correo. Pide a la persona que cree el acceso gratuito con el mismo correo e inténtalo de nuevo.", subscriber: "Suscriptor activo", guest: "Cuenta gratuita / no suscriptor", openShared: "ABRIR CONTROL COMPARTIDO", members: "Personas con acceso", editable: "Todos los participantes pueden agregar, editar y eliminar gastos en este control." },
      ru: { find: "Найти пользователя", confirm: "ПОДЕЛИТЬСЯ С ЭТИМ ПОЛЬЗОВАТЕЛЕМ", found: "Аккаунт EduCashPro найден", notFound: "Аккаунт EduCashPro с таким e-mail не найден. Попросите пользователя создать бесплатный доступ с этим e-mail и повторите попытку.", subscriber: "Активный подписчик", guest: "Бесплатный аккаунт / без подписки", openShared: "ОТКРЫТЬ ОБЩИЙ КОНТРОЛЬ", members: "Участники", editable: "Все участники могут добавлять, изменять и удалять расходы." }
    }[options?.language] || null;

    const members = ownerWorkspace?.members || [];
    const memberCount = members.length;

    document.getElementById("content").innerHTML = `
      <main class="financeControl financeSharePage">
        <button id="financeShareBack" class="textButton">← ${esc(copy.back)}</button>
        <header class="financeHero"><span>👥</span><div><h1>${esc(copy.title)}</h1><p>${esc(labels.editable)}</p></div></header>
        ${!ownerWorkspace ? `
          <section class="financeShareSetup">
            <h2>${esc(copy.activate)}</h2><p>${esc(copy.activateText)}</p>
            <button id="financeShareCreate" class="wideButton">👥 ${esc(copy.activate)}</button>
            <p id="financeShareStatus" class="financeMessage" role="status">${esc(syncError)}</p>
          </section>
        ` : `
          <section class="financeShareSetup financeSharePrimary">
            ${ownerWorkspace.legacyShared ? `<p class="financeHint" role="status">${esc(payerCopy().legacy)}</p>` : ""}
            ${syncError ? `<p class="financeMessage" role="status">${esc(syncError)}</p>` : ""}
            <button id="financeOpenShared" class="wideButton">👥 ${esc(labels.openShared)}</button>
            <div class="financeShareLimits"><article><small>${esc(labels.members)}</small><strong>${memberCount} / 5</strong></article></div>
            <h2>${esc(copy.invite)}</h2>
            <form id="financeLookupForm" class="financeInviteForm">
              <input id="financeInviteEmail" type="email" autocomplete="email" maxlength="254" placeholder="${esc(copy.placeholder)}" required>
              <button class="wideButton" type="submit">🔎 ${esc(labels.find)}</button>
            </form>
            <div id="financeResolvedPerson"></div>
            <p id="financeShareStatus" class="financeMessage"></p>
          </section>
          <section class="financeHistory financeMembers">
            <header><div><h2>${esc(labels.members)}</h2><small>${esc(labels.editable)}</small></div></header>
            ${members.length ? members.map((member) => `<article class="financeMember"><span>${member.slotType === "subscriber" ? "💎" : "👤"}</span><div><strong>${esc(member.displayName || member.email)}</strong><small>${esc(member.email)} • ${esc(member.slotType === "subscriber" ? labels.subscriber : labels.guest)}</small></div><button data-remove-member="${esc(member.email)}">${esc(copy.remove)}</button></article>`).join("") : `<div class="empty">${esc(copy.none)}</div>`}
          </section>
        `}
      </main>`;

    document.getElementById("financeShareBack").onclick = () => options.backToFinance?.();
    document.getElementById("financeShareCreate")?.addEventListener("click", createWorkspace);
    document.getElementById("financeOpenShared")?.addEventListener("click", () => openViewer(ownerWorkspace.workspaceId));

    const lookupForm = document.getElementById("financeLookupForm");
    if (lookupForm && ownerWorkspace) {
      lookupForm.onsubmit = async (event) => {
        event.preventDefault();
        const status = document.getElementById("financeShareStatus");
        const resultBox = document.getElementById("financeResolvedPerson");
        const email = String(document.getElementById("financeInviteEmail").value || "").trim().toLowerCase();
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/u.test(email)) {
          status.textContent = copy.invalidEmail;
          return;
        }

        const button = lookupForm.querySelector("button");
        button.disabled = true;
        status.textContent = "";
        resultBox.innerHTML = "";
        try {
          const result = await api("/api/monthly-finance/share/resolve", { workspaceId: ownerWorkspace.workspaceId, email });
          const person = result.person || {};
          resultBox.innerHTML = `<article class="financeResolvedPerson"><span>✅</span><div><small>${esc(labels.found)}</small><strong>${esc(person.displayName || email)}</strong><p>${esc(email)} • ${esc(person.active ? labels.subscriber : labels.guest)}</p></div><button id="financeConfirmPerson" class="wideButton">${esc(labels.confirm)}</button></article>`;
          document.getElementById("financeConfirmPerson").onclick = async () => {
            const confirmButton = document.getElementById("financeConfirmPerson");
            confirmButton.disabled = true;
            try {
              await api("/api/monthly-finance/share/invite", { workspaceId: ownerWorkspace.workspaceId, email });
              await refresh();
              openManager();
            } catch (error) {
              status.textContent = errorText(error?.message);
              confirmButton.disabled = false;
            }
          };
        } catch (error) {
          status.textContent = String(error?.message || "") === "user_not_found" ? labels.notFound : errorText(error?.message);
        } finally {
          button.disabled = false;
        }
      };
    }

    document.querySelectorAll("[data-remove-member]").forEach((button) => {
      button.onclick = async () => {
        try {
          await api("/api/monthly-finance/share/remove", { workspaceId: ownerWorkspace.workspaceId, email: button.dataset.removeMember });
          await refresh();
          openManager();
        } catch (error) {
          window.alert(errorText(error?.message));
        }
      };
    });
    guardSharedActions();
  }

  async function openViewer(workspaceId, month = lastMonth || new Date().toISOString().slice(0, 7)) {
    const copy = c();
    const labels = {
      pt: { shared: "Controle compartilhado", editable: "Você e as pessoas autorizadas podem lançar e editar gastos.", refresh: "Atualizar", setIncome: "Definir renda", addExpense: "Adicionar gasto", amount: "Valor", category: "Categoria", saveIncome: "Salvar renda", saveExpense: "Registrar gasto", updateExpense: "Atualizar gasto", edit: "Editar", remove: "Excluir", confirm: "Excluir este gasto?", invalid: "Digite um valor válido.", choose: "Escolha uma categoria." },
      en: { shared: "Shared finance control", editable: "You and authorized people can add and edit expenses.", refresh: "Refresh", setIncome: "Set income", addExpense: "Add expense", amount: "Amount", category: "Category", saveIncome: "Save income", saveExpense: "Record expense", updateExpense: "Update expense", edit: "Edit", remove: "Delete", confirm: "Delete this expense?", invalid: "Enter a valid amount.", choose: "Choose a category." },
      es: { shared: "Control financiero compartido", editable: "Tú y las personas autorizadas pueden agregar y editar gastos.", refresh: "Actualizar", setIncome: "Definir ingresos", addExpense: "Agregar gasto", amount: "Valor", category: "Categoría", saveIncome: "Guardar ingresos", saveExpense: "Registrar gasto", updateExpense: "Actualizar gasto", edit: "Editar", remove: "Eliminar", confirm: "¿Eliminar este gasto?", invalid: "Introduce un valor válido.", choose: "Elige una categoría." },
      ru: { shared: "Совместный финансовый контроль", editable: "Вы и приглашённые пользователи можете добавлять и изменять расходы.", refresh: "Обновить", setIncome: "Указать доход", addExpense: "Добавить расход", amount: "Сумма", category: "Категория", saveIncome: "Сохранить доход", saveExpense: "Добавить расход", updateExpense: "Обновить расход", edit: "Изменить", remove: "Удалить", confirm: "Удалить этот расход?", invalid: "Введите корректную сумму.", choose: "Выберите категорию." }
    }[options?.language] || null;

    window.EduCashProApp?.rememberRoute?.("tools",`monthly-finance:shared:${workspaceId}:${month}`);
    const viewerTicket=window.EduCashProNavigation?.stamp?.();
    let result;
    try {
      result = await api("/api/monthly-finance/month", { workspaceId, month });
    } catch (error) {
      window.alert(errorText(error?.message));
      return;
    }

    if(window.EduCashProNavigation && !window.EduCashProNavigation.isCurrent(viewerTicket))return;
    const entryLabels={pt:{description:"Descrição",date:"Data / vencimento",paid:"Pago",pending:"A pagar"},en:{description:"Description",date:"Date / due date",paid:"Paid",pending:"To pay"},es:{description:"Descripción",date:"Fecha / vencimiento",paid:"Pagado",pending:"Por pagar"},ru:{description:"Описание",date:"Дата / срок оплаты",paid:"Оплачено",pending:"К оплате"}}[options.language];
    const workspace = result.workspace || {};
    viewedWorkspace = workspace;
    const record = result.record || { income: 0, expenses: [] };
    displayCurrency = record.currency || "USD";
    const sum = totals(record);
    const categories = lastCategories.length ? lastCategories : [
      ["housing","🏠",categoryName("housing")],["food","🍽️",categoryName("food")],["transport","🚗",categoryName("transport")],["health","❤️",categoryName("health")],["education","📚",categoryName("education")],["debts","💳",categoryName("debts")],["leisure","🎉",categoryName("leisure")],["investment","📈",categoryName("investment")],["other","•••",categoryName("other")]
    ];

    const detail=payerCopy();
    const people=workspace.participants || [];
    const personRows=payerTotals(record);
    const history = (record.expenses || []).length
      ? record.expenses.map((item) => `<article class="financeHistoryItem"><span>${esc(categories.find((cat) => cat[0] === item.category)?.[1] || "•")}</span><div><strong>${esc(item.description || categoryName(item.category))}</strong><small>${esc(item.date || "")} · ${esc(item.paid === false ? entryLabels.pending : entryLabels.paid)} · ${esc(detail.payer)} ${esc(item.payerName || detail.unknown)}</small></div><b>${fmt(item.amount)}</b>${workspace.canEdit ? `<button data-shared-edit="${esc(item.id)}" aria-label="${esc(labels.edit)}">✎</button><button data-shared-remove="${esc(item.id)}" aria-label="${esc(labels.remove)}">×</button>` : ""}</article>`).join("")
      : `<div class="empty">${esc(copy.empty)}</div>`;

    stopViewerPoll();
    document.getElementById("content").innerHTML = `
      <main id="financeSharedWorkspaceRoot" data-workspace-id="${esc(workspaceId)}" class="financeControl financeSharedViewer">
        <button id="financeViewerBack" class="textButton">← ${esc(copy.back)}</button>
        <header class="financeHero"><span>👥</span><div><h1>${esc(labels.shared)}</h1><p>${esc(labels.editable)}</p></div></header>
        <section class="financeSharedToolbar"><button id="financeSharedRefresh">↻ ${esc(labels.refresh)}</button>${workspace.role === "owner" ? `<button id="financeViewerPdf">📄 ${esc(copy.pdf)}</button>` : ""}</section>
        <p id="financeViewerSyncStatus" class="financeMessage" role="status" aria-live="polite"></p>
        <label class="financeMonth"><span>${esc(copy.month)}</span><input id="financeViewerMonth" type="month" value="${esc(month)}"></label><label class="financeMonth"><span>${esc(detail.currency)}</span><select id="financeSharedCurrency" ${workspace.canEdit ? "" : "disabled"}>${["USD","BRL","EUR","GBP","RUB","MXN","ARS","CLP","COP","PEN","CAD","AUD","CHF","JPY","CNY","INR"].map(cur=>`<option value="${cur}" ${cur===displayCurrency ? "selected" : ""}>${cur}</option>`).join("")}</select></label><p class="financeHint">${esc(detail.currencyHelp)}</p>
        <section class="financeSummary">${[[copy.income,record.income],[detail.paid,sum.paid],[detail.pending,sum.pending],[detail.cash,sum.cash],[detail.forecast,sum.balance]].map(([label,value])=>`<article><small>${esc(label)}</small><strong>${fmt(value)}</strong></article>`).join("")}</section><section class="financePanel"><h2>${esc(detail.byPerson)}</h2>${personRows.map(row=>`<p>${esc(row.name)}: <strong>${fmt(row.cents/100)}</strong></p>`).join("") || `<p>${esc(copy.empty)}</p>`}</section>
        ${workspace.canEdit ? `
          <section class="financeSharedEntry">
            <div class="financeSharedFormBlock"><h3>＋ ${esc(labels.setIncome)}</h3><div class="financeSharedFormRow"><input id="sharedIncomeValue" type="number" min="0" step="0.01" inputmode="decimal" value="${Number(record.income || 0)}"><button id="sharedIncomeSave" class="wideButton">${esc(labels.saveIncome)}</button></div></div>
            <div class="financeSharedFormBlock"><h3>− ${esc(labels.addExpense)}</h3><div class="financeSharedExpenseGrid"><input id="sharedExpenseValue" type="number" min="0" step="0.01" inputmode="decimal" placeholder="${esc(labels.amount)}"><select id="sharedExpenseCategory"><option value="">${esc(labels.category)}</option>${categories.map((cat) => `<option value="${esc(cat[0])}">${esc(cat[1] + " " + cat[2])}</option>`).join("")}</select><input id="sharedExpenseDescription" maxlength="160" placeholder="${esc(entryLabels.description)}" aria-label="${esc(entryLabels.description)}"><input id="sharedExpenseDate" type="date" aria-label="${esc(entryLabels.date)}" value="${month}-01"><label>${esc(detail.payer)}<select id="sharedExpensePayer"><option value="">${esc(detail.unknown)}</option>${people.map(person=>`<option value="${esc(person.userId)}">${esc(person.displayName)}</option>`).join("")}</select></label><select id="sharedExpensePaid" aria-label="${esc(entryLabels.paid)}"><option value="true">${esc(entryLabels.paid)}</option><option value="false">${esc(entryLabels.pending)}</option></select></div><button id="sharedExpenseSave" class="wideButton">${esc(labels.saveExpense)}</button><button id="sharedExpenseCancel" class="textButton hidden" type="button">×</button><p id="sharedExpenseMessage" class="financeMessage"></p></div>
          </section>
        ` : ""}
        <section class="financeHistory"><header><div><h2>${esc(copy.history)}</h2><small>☁️ ${esc(copy.active)}</small></div></header>${history}</section>
      </main>`;

    document.getElementById("financeViewerBack").onclick = () => { stopViewerPoll(); options.backToFinance?.(); };
    document.getElementById("financeSharedRefresh").onclick = () => openViewer(workspaceId, month);
    document.getElementById("financeViewerPdf")?.addEventListener("click", async () => { try { const latest=await api("/api/monthly-finance/month",{workspaceId,month}); await exportPdf(latest.record,month,latest.workspace.ownerName || "",latest.workspace); } catch(error) { window.alert(errorText(error?.message)); } });
    document.getElementById("financeViewerMonth").onchange = (event) => openViewer(workspaceId, event.target.value || month);
    document.getElementById("financeSharedCurrency").onchange = async (event) => { try { await api("/api/monthly-finance/currency",{workspaceId,month,currency:event.target.value}); await openViewer(workspaceId,month); } catch(error) { window.alert(errorText(error?.message)); await openViewer(workspaceId,month); } };
    startViewerPoll(workspaceId, month, workspace.revision ?? workspace.updatedAt);
    const editor = document.querySelector(".financeSharedEntry");
    editor?.addEventListener("input", () => { viewerDirty = true; });
    editor?.addEventListener("change", () => { viewerDirty = true; });

    if (!workspace.canEdit) return;

    document.getElementById("sharedIncomeSave").onclick = async () => {
      const income = Number(document.getElementById("sharedIncomeValue").value || 0);
      if (!(income >= 0)) return;
      await api("/api/monthly-finance/income", { workspaceId, month, income });
      openViewer(workspaceId, month);
    };

    let editingId = "";
    const saveButton = document.getElementById("sharedExpenseSave");
    const cancelButton = document.getElementById("sharedExpenseCancel");
    const valueInput = document.getElementById("sharedExpenseValue");
    const categoryInput = document.getElementById("sharedExpenseCategory");
    const message = document.getElementById("sharedExpenseMessage");

    saveButton.onclick = async () => {
      const amount = Number(valueInput.value || 0);
      const category = String(categoryInput.value || "");
      if (!(amount > 0)) { message.textContent = labels.invalid; return; }
      if (!category) { message.textContent = labels.choose; return; }
      const description=document.getElementById("sharedExpenseDescription").value.trim();
      const date=document.getElementById("sharedExpenseDate").value;
      const paid=document.getElementById("sharedExpensePaid").value === "true";
      const payerUserId=document.getElementById("sharedExpensePayer").value;
      if(!date || date.slice(0,7)!==month){message.textContent=labels.invalid;return;}
      if (editingId) {
        await api("/api/monthly-finance/expense", { workspaceId, month, action: "update", expenseId: editingId, amount, category, description, date, paid, payerUserId });
      } else {
        await api("/api/monthly-finance/expense", { workspaceId, month, action: "add", expense: { amount, category, description, date, paid, payerUserId, createdAt: Date.now() } });
      }
      openViewer(workspaceId, month);
    };

    document.querySelectorAll("[data-shared-edit]").forEach((button) => {
      button.onclick = () => {
        const item = (record.expenses || []).find((entry) => entry.id === button.dataset.sharedEdit);
        if (!item) return;
        editingId = item.id;
        viewerDirty = true;
        valueInput.value = item.amount;
        categoryInput.value = item.category;
        document.getElementById("sharedExpenseDescription").value=item.description || "";
        document.getElementById("sharedExpenseDate").value=item.date || month+"-01";
        document.getElementById("sharedExpensePaid").value=String(item.paid !== false);
        document.getElementById("sharedExpensePayer").value=item.payerUserId || "";
        saveButton.textContent = labels.updateExpense;
        cancelButton.classList.remove("hidden");
        valueInput.scrollIntoView({ behavior: "smooth", block: "center" });
      };
    });

    cancelButton.onclick = () => {
      editingId = "";
      viewerDirty = false;
      valueInput.value = "";
      categoryInput.value = "";
      document.getElementById("sharedExpenseDescription").value="";
      document.getElementById("sharedExpenseDate").value=month+"-01";
      document.getElementById("sharedExpensePaid").value="true";
      document.getElementById("sharedExpensePayer").value="";
      saveButton.textContent = labels.saveExpense;
      cancelButton.classList.add("hidden");
      message.textContent = "";
    };

    document.querySelectorAll("[data-shared-remove]").forEach((button) => {
      button.onclick = async () => {
        if (!window.confirm(labels.confirm)) return;
        await api("/api/monthly-finance/expense", { workspaceId, month, action: "remove", expenseId: button.dataset.sharedRemove });
        openViewer(workspaceId, month);
      };
    });
    guardSharedActions();
  }

  function guardSharedActions(){
    document.querySelectorAll("#financeSharedWorkspaceRoot button").forEach(button=>{
      const action=button.onclick;if(!action)return;
      button.onclick=async event=>{button.disabled=true;try{await action(event);}catch(error){window.alert(String(error?.message||"").includes("sharing_conflict")?conflictCopy[options.language]:c().error);}finally{button.disabled=false;}};
    });
  }

  function reportHtml(record, month, ownerName = "") {
    displayCurrency = record.currency || "USD";
    const copy = c(); const sum = totals(record); const detail = payerCopy();
    const labels={pt:{paid:"Pago",pending:"A pagar"},en:{paid:"Paid",pending:"To pay"},es:{paid:"Pagado",pending:"Por pagar"},ru:{paid:"Оплачено",pending:"К оплате"}}[options.language];
    const rows = (record.expenses || []).map((item) => `<tr><td style="padding:7px;border-bottom:1px solid #ddd">${esc(new Date((item.date || "").length ? item.date+"T12:00:00" : item.createdAt).toLocaleDateString(options.language === "pt" ? "pt-BR" : options.language))}</td><td style="padding:7px;border-bottom:1px solid #ddd">${esc(item.description || categoryName(item.category))}<br><small>${esc(categoryName(item.category))} · ${esc(item.paid === false ? labels.pending : labels.paid)}${ownerName ? ` · ${esc(detail.payer)} ${esc(item.payerName || detail.unknown)}` : ""}</small></td><td style="padding:7px;border-bottom:1px solid #ddd;text-align:right">${esc(fmt(item.amount))}</td></tr>`).join("");
    return `<div style="font-family:Arial,sans-serif;color:#142033;background:#fff;padding:24px"><header style="border-bottom:3px solid #17a889;padding-bottom:14px;margin-bottom:16px"><strong style="font-size:22px;letter-spacing:.3px;color:#067f67">EduCashPro</strong><p style="margin:4px 0 0;font-size:12px;color:#5b7385">${esc(copy.report)}</p></header><h1 style="margin:0 0 6px;font-size:24px">${esc(copy.report)}</h1><p style="margin:0 0 18px;color:#667">${ownerName ? `${esc(copy.owner)} ${esc(ownerName)} • ` : ""}${esc(month)}</p><table style="width:100%;border-collapse:collapse;margin-bottom:20px"><tr><td style="padding:10px;border:1px solid #ddd"><b>${esc(copy.income)}</b><br>${esc(fmt(record.income))}</td><td style="padding:10px;border:1px solid #ddd"><b>${esc(detail.paid)}</b><br>${esc(fmt(sum.paid))}</td><td style="padding:10px;border:1px solid #ddd"><b>${esc(detail.pending)}</b><br>${esc(fmt(sum.pending))}</td><td style="padding:10px;border:1px solid #ddd"><b>${esc(detail.cash)}</b><br>${esc(fmt(sum.cash))}</td><td style="padding:10px;border:1px solid #ddd"><b>${esc(detail.forecast)}</b><br>${esc(fmt(sum.balance))}</td></tr></table><table style="width:100%;border-collapse:collapse;font-size:12px"><thead><tr><th style="text-align:left;padding:7px">${esc(copy.date)}</th><th style="text-align:left;padding:7px">${esc(copy.category)}</th><th style="text-align:right;padding:7px">${esc(copy.value)}</th></tr></thead><tbody>${rows || `<tr><td colspan="3" style="padding:12px">${esc(copy.empty)}</td></tr>`}</tbody><tfoot><tr><td colspan="2" style="padding:8px;border-top:2px solid #222"><b>${esc(copy.total)}</b></td><td style="padding:8px;border-top:2px solid #222;text-align:right"><b>${esc(fmt(sum.spent))}</b></td></tr></tfoot></table>${ownerName ? `<h2>${esc(detail.byPerson)}</h2>${payerTotals(record).map(row => `<p>${esc(row.name)}: ${esc(fmt(row.cents/100))}</p>`).join("")}` : ""}<p style="margin-top:24px;font-size:10px;color:#777">${esc(copy.generated)} ${esc(new Date().toLocaleString(options.language === "pt" ? "pt-BR" : options.language))} • EduCashPro</p></div>`;
  }

  function printablePdfFallback(html) {
    document.querySelector(".financePrintFallback")?.remove();
    const layer = document.createElement("div");
    layer.className = "finHelpOverlay financePrintFallback";
    const copy = c();
    layer.innerHTML = `<section class="finHelpCard" role="dialog" aria-modal="true"><h2>EduCashPro · PDF</h2><p>${esc(copy.pdfFallback)}</p><button type="button" class="wideButton" id="financePrintPdf">${esc(copy.pdfPrint)}</button><button type="button" class="secondaryButton" id="financePrintClose">${esc(copy.pdfClose)}</button><p id="financePrintStatus" role="status"></p></section>`;
    document.body.appendChild(layer);
    layer.querySelector("#financePrintClose").onclick = () => layer.remove();
    layer.querySelector("#financePrintPdf").onclick = () => {
      // Open the printable report synchronously from a second user gesture:
      // Safari blocks windows opened only after asynchronous PDF generation.
      const win = window.open("", "_blank");
      if (!win) {
        layer.querySelector("#financePrintStatus").textContent = copy.pdfBlocked;
        return;
      }
      try {
        win.opener = null;
        win.document.open();
        win.document.write(`<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>EduCashPro · PDF</title></head><body>${html}<script>window.addEventListener('load',()=>setTimeout(()=>window.print(),250))<\/script></body></html>`);
        win.document.close();
        layer.remove();
      } catch {
        layer.querySelector("#financePrintStatus").textContent = copy.pdfBlocked;
      }
    };
  }

  function selectedMonthPdfRecord(record, month, shared) {
    if (shared || typeof options?.read !== "function") return record || { income: 0, expenses: [] };
    const stored = options.read() || {};
    if (Object.prototype.hasOwnProperty.call(stored, month)) {
      // Never rely on a stale object captured by a previous UI render.
      // Read the same account/month key used by the live control.
      const current = stored[month] || {};
      return {
        ...current,
        income: Number(current.income || 0),
        expenses: Array.isArray(current.expenses) ? current.expenses : []
      };
    }
    return record || { income: 0, expenses: [] };
  }

  function warnEmptyMonthPdf(month, record, shared) {
    if (shared || (record.expenses || []).length || typeof options?.read !== "function")
      return true;
    const stored = options.read() || {};
    const otherMonths = Object.entries(stored)
      .filter(([key, data]) =>
        key !== month && /^\d{4}-\d{2}$/.test(key) &&
        Array.isArray(data?.expenses) && data.expenses.length > 0
      );
    if (!otherMonths.length) return true;
    const total = otherMonths.reduce((sum, [,data]) => sum + data.expenses.length, 0);
    const messages = {
      pt: `O relatório de ${month} não contém gastos. Existem ${total} gastos registrados em outros meses. Para incluí-los, volte e selecione o mês correspondente. Deseja baixar somente ${month} mesmo assim?`,
      en: `The report for ${month} has no expenses, but ${total} expenses are saved in other months. To include them, select their month first. Download only ${month} anyway?`,
      es: `El informe de ${month} no contiene gastos, pero hay ${total} gastos guardados en otros meses. Selecciona el mes correspondiente para incluirlos. ¿Descargar solo ${month}?`,
      ru: `В отчёте за ${month} нет расходов, но в других месяцах сохранено ${total} записей. Выберите соответствующий месяц, чтобы включить их. Скачать только ${month}?`
    };
    return window.confirm(messages[options.language] || messages.pt);
  }

  async function exportPdf(record, month, ownerName = "", workspace = null) {
    const shared = workspace || (document.getElementById("financeSharedWorkspaceRoot") ? viewedWorkspace : null);
    if (shared && (shared.role !== "owner" || shared.canExportPdf !== true)) return;
    if (!options?.active) return options?.subscribe?.();
    if (!window.EduCashProPdf?.exportHtml || !window.EduCashProPdf?.footerHtml)
      throw new Error("finance_pdf_unavailable");
    const current = selectedMonthPdfRecord(record, month, shared);
    if (!warnEmptyMonthPdf(month, current, shared)) return;
    const copy = c();
    const button = document.getElementById("financeViewerPdf") || document.getElementById("financePdfAction");
    const original = button?.textContent || "";
    if (button) { button.disabled = true; button.textContent = copy.pdfPreparing; }
    const html = `<div>${reportHtml(current, month, ownerName)}${window.EduCashProPdf.footerHtml({session:options?.session,language:options?.language})}</div>`;
    try {
      await window.EduCashProPdf.exportHtml(html, {
        filename: `educashpro-financas-${month}.pdf`,
        session: options?.session,
        language: options?.language,
        // Telegram WebViews do not consistently honor synthetic <a download>.
        // Prefer the operating system's file-share sheet when available.
        share: window.EduCashProPlatform?.isTelegram?.() === true
      });
    } catch (error) {
      console.warn("[EduCashPro] Monthly finance PDF:", error?.message || error);
      printablePdfFallback(html);
    } finally {
      if (button) { button.disabled = false; button.textContent = original; }
    }
  }

  window.EduCashProFinanceShare = { init, bind, sync, openManager, openViewer, exportPdf };
})();

