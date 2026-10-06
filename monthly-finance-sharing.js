(function () {
  "use strict";

  const COPY = {
    pt: {
      share: "Compartilhar controle", pdf: "Baixar PDF", lockedShare: "Compartilhar é exclusivo para assinantes",
      lockedPdf: "PDF exclusivo para assinantes", subscribe: "Assinar mensal", title: "Compartilhamento do controle",
      intro: "Assinantes ativos podem compartilhar este controle com até 5 pessoas. Os convidados podem adicionar, editar e excluir lançamentos no controle compartilhado.",
      activate: "Ativar compartilhamento", activateText: "Ao ativar, seu histórico local é copiado para um espaço compartilhado e passa a ser sincronizado automaticamente.",
      invite: "Convidar por e-mail", inviteButton: "Adicionar pessoa", placeholder: "email@exemplo.com",
      guest: "Não assinante", subscribers: "Assinantes", remove: "Remover", none: "Nenhuma pessoa adicionada.",
      pending: "Acesso pendente até a pessoa entrar no EduCashPro com este e-mail.", active: "Compartilhamento ativo",
      sharedWithMe: "Compartilhado comigo", open: "Abrir", owner: "Controle de", back: "Voltar ao meu controle",
      month: "Mês", income: "Renda", spent: "Gastos", balance: "Disponível", history: "Histórico do mês",
      empty: "Nenhum gasto registrado neste mês.", invalidEmail: "Digite um e-mail válido.", added: "Pessoa adicionada ao compartilhamento.",
      already: "Este e-mail já foi adicionado.", guestLimit: "Este controle já atingiu o limite de 5 pessoas.",
      subscriberLimit: "Este controle já atingiu o limite de 5 pessoas.", ownerInactive: "Compartilhamento pausado porque a assinatura do proprietário está inativa.",
      collaboratorInactive: "Esta vaga é destinada a assinante. Reative sua assinatura para acessar.", error: "Não foi possível sincronizar agora.",
      pdfPreparing: "Preparando PDF…", pdfFallback: "O download direto não carregou. Abrimos a impressão; escolha Salvar como PDF.",
      report: "Relatório Financeiro Mensal", category: "Categoria", value: "Valor", date: "Data", total: "Total", generated: "Gerado em",
      categories: [["housing","Moradia"],["food","Alimentação"],["transport","Transporte"],["health","Saúde"],["education","Educação"],["debts","Dívidas"],["leisure","Lazer"],["investment","Investimentos"],["other","Outros"]]
    },
    en: {
      share: "Share control", pdf: "Download PDF", lockedShare: "Sharing is for subscribers only", lockedPdf: "PDF is for subscribers only",
      subscribe: "Subscribe monthly", title: "Share finance control", intro: "Active subscribers can share this control with up to 5 people. Guests can add, edit and delete entries in the shared control.",
      activate: "Enable sharing", activateText: "When enabled, your local history is copied to a shared space and synchronized automatically.",
      invite: "Invite by email", inviteButton: "Add person", placeholder: "email@example.com", guest: "Non-subscriber", subscribers: "Subscribers",
      remove: "Remove", none: "No one added yet.", pending: "Access is pending until the person signs in to EduCashPro with this email.", active: "Sharing active",
      sharedWithMe: "Shared with me", open: "Open", owner: "Control by", back: "Back to my control", month: "Month", income: "Income", spent: "Expenses",
      balance: "Available", history: "Monthly history", empty: "No expenses recorded this month.", invalidEmail: "Enter a valid email.", added: "Person added to sharing.",
      already: "This email has already been added.", guestLimit: "This control has reached the 5-person limit.", subscriberLimit: "This control has reached the 5-person limit.",
      ownerInactive: "Sharing is paused because the owner's subscription is inactive.", collaboratorInactive: "This slot is for a subscriber. Reactivate your subscription to access it.",
      error: "Could not synchronize now.", pdfPreparing: "Preparing PDF…", pdfFallback: "Direct download did not load. We opened the print view; choose Save as PDF.",
      report: "Monthly Financial Report", category: "Category", value: "Amount", date: "Date", total: "Total", generated: "Generated on",
      categories: [["housing","Housing"],["food","Food"],["transport","Transport"],["health","Health"],["education","Education"],["debts","Debt"],["leisure","Leisure"],["investment","Investments"],["other","Other"]]
    },
    es: {
      share: "Compartir control", pdf: "Descargar PDF", lockedShare: "Compartir es exclusivo para suscriptores", lockedPdf: "PDF exclusivo para suscriptores",
      subscribe: "Suscripción mensual", title: "Compartir el control", intro: "Los suscriptores activos pueden compartir este control con hasta 5 personas. Los invitados pueden agregar, editar y eliminar registros.",
      activate: "Activar uso compartido", activateText: "Al activarlo, tu historial local se copia a un espacio compartido y se sincroniza automáticamente.",
      invite: "Invitar por correo", inviteButton: "Agregar persona", placeholder: "email@ejemplo.com", guest: "No suscriptor", subscribers: "Suscriptores",
      remove: "Eliminar", none: "Aún no se agregó a nadie.", pending: "El acceso queda pendiente hasta que la persona entre en EduCashPro con este correo.", active: "Uso compartido activo",
      sharedWithMe: "Compartido conmigo", open: "Abrir", owner: "Control de", back: "Volver a mi control", month: "Mes", income: "Ingresos", spent: "Gastos",
      balance: "Disponible", history: "Historial del mes", empty: "No hay gastos registrados este mes.", invalidEmail: "Introduce un correo válido.", added: "Persona agregada al uso compartido.",
      already: "Este correo ya fue agregado.", guestLimit: "Este control alcanzó el límite de 5 personas.", subscriberLimit: "Este control alcanzó el límite de 5 personas.",
      ownerInactive: "El uso compartido está pausado porque la suscripción del propietario está inactiva.", collaboratorInactive: "Esta plaza es para un suscriptor. Reactiva tu suscripción para acceder.",
      error: "No fue posible sincronizar ahora.", pdfPreparing: "Preparando PDF…", pdfFallback: "No se cargó la descarga directa. Abrimos la impresión; elige Guardar como PDF.",
      report: "Informe Financiero Mensual", category: "Categoría", value: "Valor", date: "Fecha", total: "Total", generated: "Generado el",
      categories: [["housing","Vivienda"],["food","Alimentación"],["transport","Transporte"],["health","Salud"],["education","Educación"],["debts","Deudas"],["leisure","Ocio"],["investment","Inversiones"],["other","Otros"]]
    },
    ru: {
      share: "Поделиться контролем", pdf: "Скачать PDF", lockedShare: "Совместный доступ только для подписчиков", lockedPdf: "PDF только для подписчиков",
      subscribe: "Оформить подписку", title: "Совместный финансовый контроль", intro: "Активный подписчик может поделиться этим контролем с 5 людьми. Приглашённые пользователи могут добавлять, изменять и удалять записи.",
      activate: "Включить совместный доступ", activateText: "После включения локальная история копируется в общее пространство и синхронизируется автоматически.",
      invite: "Пригласить по e-mail", inviteButton: "Добавить", placeholder: "email@example.com", guest: "Без подписки", subscribers: "Подписчики",
      remove: "Удалить", none: "Участники пока не добавлены.", pending: "Доступ появится после входа в EduCashPro с этим e-mail.", active: "Совместный доступ активен",
      sharedWithMe: "Доступные мне", open: "Открыть", owner: "Контроль:", back: "Назад к моему контролю", month: "Месяц", income: "Доход", spent: "Расходы",
      balance: "Остаток", history: "История за месяц", empty: "В этом месяце расходов пока нет.", invalidEmail: "Введите корректный e-mail.", added: "Пользователь добавлен.",
      already: "Этот e-mail уже добавлен.", guestLimit: "Достигнут лимит в 5 участников.", subscriberLimit: "Достигнут лимит в 5 участников.",
      ownerInactive: "Совместный доступ приостановлен: подписка владельца не активна.", collaboratorInactive: "Это место предназначено для подписчика. Возобновите подписку.",
      error: "Не удалось синхронизировать данные.", pdfPreparing: "Подготовка PDF…", pdfFallback: "Прямая загрузка недоступна. Открыта печать; выберите Сохранить как PDF.",
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
  const totals = (record) => { const spent = (record?.expenses || []).reduce((sum, item) => sum + Number(item.amount || 0), 0); return { spent, balance: Number(record?.income || 0) - spent }; };
  const categoryName = (id) => { const source = lastCategories.length ? lastCategories.map((item) => [item[0], item[2]]) : c().categories; return source.find((item) => item[0] === id)?.[1] || id; };

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

  async function api(path, payload = {}) { if (typeof options?.api !== "function") throw new Error("cloud_unavailable"); return options.api(path, payload); }
  function errorText(reason) {
    const copy = c();
    const map = { already_invited: copy.already, guest_limit_reached: copy.guestLimit, subscriber_limit_reached: copy.subscriberLimit, member_limit_reached: copy.subscriberLimit, invalid_email: copy.invalidEmail, sharing_owner_inactive: copy.ownerInactive, active_subscription_required: copy.lockedShare };
    return map[String(reason || "")] || copy.error;
  }

  async function refresh() {
    if (!options?.session?.profile?.userId || typeof options?.api !== "function") { workspaces = []; ownerWorkspace = null; return; }
    try { const result = await api("/api/monthly-finance/list", {}); workspaces = Array.isArray(result?.workspaces) ? result.workspaces : []; ownerWorkspace = workspaces.find((item) => item.role === "owner") || null; }
    catch { workspaces = []; ownerWorkspace = null; }
  }

  let syncReady=false, syncing=false, queuedData=null, syncError="";
  const conflictCopy={pt:"O controle foi atualizado por outra pessoa. Seus registros locais foram preservados. Abra o controle compartilhado para conferir antes de tentar novamente.",en:"Someone else updated this control. Your local entries were kept. Open the shared control and review it before trying again.",es:"Otra persona actualizó este control. Tus registros locales se conservaron. Abre el control compartido y revísalo antes de volver a intentarlo.",ru:"Другой участник обновил учёт. Локальные записи сохранены. Откройте общий учёт и проверьте изменения перед повторной попыткой."};
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
      const result=await api("/api/monthly-finance/share/sync",{workspaceId:ownerWorkspace.workspaceId,months:data,expectedUpdatedAt:ownerWorkspace.updatedAt});
      ownerWorkspace.updatedAt=result.updatedAt;
      if(!queuedData)options.markSynced?.();syncError="";
    }catch(error){
      syncReady=false;
      const message=String(error?.message||'').includes('sharing_conflict')?conflictCopy[options.language]:c().error;
      syncError=message;
      const node=document.getElementById("financeNotice");if(node)node.textContent=message;
      else window.alert(message);
    }finally{syncing=false;if(queuedData&&syncReady)void flushSync();}
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
    if(syncError){const node=document.getElementById("financeNotice");if(node)node.textContent=syncError;const root=document.getElementById("financeSharedAccess");if(root&&ownerWorkspace){const button=document.createElement("button");button.className="wideButton";button.textContent=c().open;button.onclick=()=>openViewer(ownerWorkspace.workspaceId,lastMonth);root.appendChild(button);}}
  }

  async function init(args = {}) {
    window.clearTimeout(syncTimer);queuedData=null;syncReady=false;
    options = args;
    const startingData=JSON.stringify(options.read?.()||{});
    await refresh();
    if (options?.active && options?.session?.profile?.userId && !ownerWorkspace && typeof options?.api === "function") {
      try {
        await api("/api/monthly-finance/share/create", { months: options.read?.() || {} });
        options.markSynced?.();
        await refresh();
      } catch (error) {
        console.log("[EduCashPro] finance cloud init:", error);
      }
    }
    if(options.active && ownerWorkspace?.workspaceId){
      try{const data=await api("/api/monthly-finance/owner-data",{workspaceId:ownerWorkspace.workspaceId});if(JSON.stringify(options.read?.()||{})!==startingData || options.hasPending?.()){syncError=conflictCopy[options.language];syncReady=false;}else{options.hydrate?.(data.months || {});ownerWorkspace.updatedAt=data.updatedAt;syncReady=true;syncError="";}}
      catch{syncReady=false;}
    }
    bind({});
  }

  async function createWorkspace() {
    const status = document.getElementById("financeShareStatus");
    try { const result = await api("/api/monthly-finance/share/create", { months: options.read?.() || {} }); ownerWorkspace = result.workspace || null; await refresh(); if (status) status.textContent = c().active; openManager(); }
    catch (error) { if (status) status.textContent = errorText(error?.message); }
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
            <p id="financeShareStatus" class="financeMessage"></p>
          </section>
        ` : `
          <section class="financeShareSetup financeSharePrimary">
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

    const history = (record.expenses || []).length
      ? record.expenses.map((item) => `<article class="financeHistoryItem"><span>${esc(categories.find((cat) => cat[0] === item.category)?.[1] || "•")}</span><div><strong>${esc(item.description || categoryName(item.category))}</strong><small>${new Date(item.createdAt).toLocaleDateString(options.language === "pt" ? "pt-BR" : options.language)}</small></div><b>${fmt(item.amount)}</b>${workspace.canEdit ? `<button data-shared-edit="${esc(item.id)}" aria-label="${esc(labels.edit)}">✎</button><button data-shared-remove="${esc(item.id)}" aria-label="${esc(labels.remove)}">×</button>` : ""}</article>`).join("")
      : `<div class="empty">${esc(copy.empty)}</div>`;

    document.getElementById("content").innerHTML = `
      <main id="financeSharedWorkspaceRoot" data-workspace-id="${esc(workspaceId)}" class="financeControl financeSharedViewer">
        <button id="financeViewerBack" class="textButton">← ${esc(copy.back)}</button>
        <header class="financeHero"><span>👥</span><div><h1>${esc(labels.shared)}</h1><p>${esc(labels.editable)}</p></div></header>
        <section class="financeSharedToolbar"><button id="financeSharedRefresh">↻ ${esc(labels.refresh)}</button>${workspace.role === "owner" ? `<button id="financeViewerPdf">📄 ${esc(copy.pdf)}</button>` : ""}</section>
        <label class="financeMonth"><span>${esc(copy.month)}</span><input id="financeViewerMonth" type="month" value="${esc(month)}"></label>
        <section class="financeSummary"><article><small>${esc(copy.income)}</small><strong>${fmt(record.income)}</strong></article><article><small>${esc(copy.spent)}</small><strong>${fmt(sum.spent)}</strong></article><article class="${sum.balance < 0 ? "negative" : ""}"><small>${esc(copy.balance)}</small><strong>${fmt(sum.balance)}</strong></article></section>
        ${workspace.canEdit ? `
          <section class="financeSharedEntry">
            <div class="financeSharedFormBlock"><h3>＋ ${esc(labels.setIncome)}</h3><div class="financeSharedFormRow"><input id="sharedIncomeValue" type="number" min="0" step="0.01" inputmode="decimal" value="${Number(record.income || 0)}"><button id="sharedIncomeSave" class="wideButton">${esc(labels.saveIncome)}</button></div></div>
            <div class="financeSharedFormBlock"><h3>− ${esc(labels.addExpense)}</h3><div class="financeSharedExpenseGrid"><input id="sharedExpenseValue" type="number" min="0" step="0.01" inputmode="decimal" placeholder="${esc(labels.amount)}"><select id="sharedExpenseCategory"><option value="">${esc(labels.category)}</option>${categories.map((cat) => `<option value="${esc(cat[0])}">${esc(cat[1] + " " + cat[2])}</option>`).join("")}</select><input id="sharedExpenseDescription" maxlength="160" placeholder="${esc(entryLabels.description)}" aria-label="${esc(entryLabels.description)}"><input id="sharedExpenseDate" type="date" aria-label="${esc(entryLabels.date)}" value="${month}-01"><select id="sharedExpensePaid" aria-label="${esc(entryLabels.paid)}"><option value="true">${esc(entryLabels.paid)}</option><option value="false">${esc(entryLabels.pending)}</option></select></div><button id="sharedExpenseSave" class="wideButton">${esc(labels.saveExpense)}</button><button id="sharedExpenseCancel" class="textButton hidden" type="button">×</button><p id="sharedExpenseMessage" class="financeMessage"></p></div>
          </section>
        ` : ""}
        <section class="financeHistory"><header><div><h2>${esc(copy.history)}</h2><small>☁️ ${esc(copy.active)}</small></div></header>${history}</section>
      </main>`;

    document.getElementById("financeViewerBack").onclick = () => options.backToFinance?.();
    document.getElementById("financeSharedRefresh").onclick = () => openViewer(workspaceId, month);
    document.getElementById("financeViewerPdf")?.addEventListener("click", () => exportPdf(record, month, workspace.ownerName || "", workspace));
    document.getElementById("financeViewerMonth").onchange = (event) => openViewer(workspaceId, event.target.value || month);

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
      if(!date || date.slice(0,7)!==month){message.textContent=labels.invalid;return;}
      if (editingId) {
        await api("/api/monthly-finance/expense", { workspaceId, month, action: "update", expenseId: editingId, amount, category, description, date, paid });
      } else {
        await api("/api/monthly-finance/expense", { workspaceId, month, action: "add", expense: { amount, category, description, date, paid, createdAt: Date.now() } });
      }
      openViewer(workspaceId, month);
    };

    document.querySelectorAll("[data-shared-edit]").forEach((button) => {
      button.onclick = () => {
        const item = (record.expenses || []).find((entry) => entry.id === button.dataset.sharedEdit);
        if (!item) return;
        editingId = item.id;
        valueInput.value = item.amount;
        categoryInput.value = item.category;
        document.getElementById("sharedExpenseDescription").value=item.description || "";
        document.getElementById("sharedExpenseDate").value=item.date || month+"-01";
        document.getElementById("sharedExpensePaid").value=String(item.paid !== false);
        saveButton.textContent = labels.updateExpense;
        cancelButton.classList.remove("hidden");
        valueInput.scrollIntoView({ behavior: "smooth", block: "center" });
      };
    });

    cancelButton.onclick = () => {
      editingId = "";
      valueInput.value = "";
      categoryInput.value = "";
      document.getElementById("sharedExpenseDescription").value="";
      document.getElementById("sharedExpenseDate").value=month+"-01";
      document.getElementById("sharedExpensePaid").value="true";
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
    const copy = c(); const sum = totals(record);
    const labels={pt:{paid:"Pago",pending:"A pagar"},en:{paid:"Paid",pending:"To pay"},es:{paid:"Pagado",pending:"Por pagar"},ru:{paid:"Оплачено",pending:"К оплате"}}[options.language];
    const rows = (record.expenses || []).map((item) => `<tr><td style="padding:7px;border-bottom:1px solid #ddd">${esc(new Date((item.date || "").length ? item.date+"T12:00:00" : item.createdAt).toLocaleDateString(options.language === "pt" ? "pt-BR" : options.language))}</td><td style="padding:7px;border-bottom:1px solid #ddd">${esc(item.description || categoryName(item.category))}<br><small>${esc(categoryName(item.category))} · ${esc(item.paid === false ? labels.pending : labels.paid)}</small></td><td style="padding:7px;border-bottom:1px solid #ddd;text-align:right">${esc(fmt(item.amount))}</td></tr>`).join("");
    return `<div style="font-family:Arial,sans-serif;color:#142033;background:#fff;padding:24px"><h1 style="margin:0 0 6px;font-size:24px">${esc(copy.report)}</h1><p style="margin:0 0 18px;color:#667">${ownerName ? `${esc(copy.owner)} ${esc(ownerName)} • ` : ""}${esc(month)}</p><table style="width:100%;border-collapse:collapse;margin-bottom:20px"><tr><td style="padding:10px;border:1px solid #ddd"><b>${esc(copy.income)}</b><br>${esc(fmt(record.income))}</td><td style="padding:10px;border:1px solid #ddd"><b>${esc(copy.spent)}</b><br>${esc(fmt(sum.spent))}</td><td style="padding:10px;border:1px solid #ddd"><b>${esc(copy.balance)}</b><br>${esc(fmt(sum.balance))}</td></tr></table><table style="width:100%;border-collapse:collapse;font-size:12px"><thead><tr><th style="text-align:left;padding:7px">${esc(copy.date)}</th><th style="text-align:left;padding:7px">${esc(copy.category)}</th><th style="text-align:right;padding:7px">${esc(copy.value)}</th></tr></thead><tbody>${rows || `<tr><td colspan="3" style="padding:12px">${esc(copy.empty)}</td></tr>`}</tbody><tfoot><tr><td colspan="2" style="padding:8px;border-top:2px solid #222"><b>${esc(copy.total)}</b></td><td style="padding:8px;border-top:2px solid #222;text-align:right"><b>${esc(fmt(sum.spent))}</b></td></tr></tfoot></table><p style="margin-top:24px;font-size:10px;color:#777">${esc(copy.generated)} ${esc(new Date().toLocaleString(options.language === "pt" ? "pt-BR" : options.language))} • EduCashPro</p></div>`;
  }

  function loadPdf() {
    if (window.html2pdf) return Promise.resolve(window.html2pdf);
    if (window.__EDUCASHPRO_HTML2PDF__) return window.__EDUCASHPRO_HTML2PDF__;
    window.__EDUCASHPRO_HTML2PDF__ = new Promise((resolve, reject) => { const script = document.createElement("script"); script.src = "https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js"; script.onload = () => window.html2pdf ? resolve(window.html2pdf) : reject(new Error("pdf_library_missing")); script.onerror = () => reject(new Error("pdf_library_failed")); document.head.appendChild(script); });
    return window.__EDUCASHPRO_HTML2PDF__;
  }

  async function exportPdf(record, month, ownerName = "", workspace = null) {
    const shared = workspace || (document.getElementById("financeSharedWorkspaceRoot") ? viewedWorkspace : null);
    if(shared && (shared.role !== "owner" || shared.canExportPdf !== true)) return;
    if (!options?.active) return options?.subscribe?.();
    const copy = c(); const button = document.getElementById("financeViewerPdf") || document.getElementById("financePdfAction"); const original = button?.textContent || "";
    if (button) { button.disabled = true; button.textContent = copy.pdfPreparing; }
    const html = reportHtml(record, month, ownerName); const holder = document.createElement("div"); holder.style.cssText = "position:fixed;left:-10000px;top:0;width:760px;background:#fff"; holder.innerHTML = html; document.body.appendChild(holder);
    try { const html2pdf = await loadPdf(); await html2pdf().set({ margin: 10, filename: `educashpro-financas-${month}.pdf`, image: { type: "jpeg", quality: 0.96 }, html2canvas: { scale: 2, useCORS: true }, jsPDF: { unit: "mm", format: "a4", orientation: "portrait" } }).from(holder.firstElementChild).save(); }
    catch (error) { const win = window.open("", "_blank", "noopener,noreferrer"); if (win) { win.document.open(); win.document.write(`<!doctype html><html><head><meta charset="utf-8"><title>EduCashPro</title></head><body>${html}<script>setTimeout(()=>window.print(),250)<\/script></body></html>`); win.document.close(); } window.alert(copy.pdfFallback); }
    finally { holder.remove(); if (button) { button.disabled = false; button.textContent = original; } }
  }

  window.EduCashProFinanceShare = { init, bind, sync, openManager, openViewer, exportPdf };
})();

